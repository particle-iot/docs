/*
 * Copyright (c) 2020 Particle Industries, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#include "MAX7360-RK.h"
#include "MAX47x6-RK.h"
#include "AMCLCD-RK.h"


#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

// MAX7360 Keypad and LCD driver, connected by I2C
MAX7360 keyDriver(0x38, Wire3);
MAX7360KeyMappingPhone keyMapper;

// MAX4706 DAC for contrast control
MAX47x6 dac(MAX47x6::Model::MAX4706, 0x60, Wire3);

// Orient Displays AMC1602 16x2 character LCD connected by I2C
AMCLCD_Model_AMC1602 lcdModel;
AMCLCD lcd(lcdModel, 0x3C, Wire3);

// Constants for what LEDs are connected to which PORT on the MAX7360
static const uint8_t PORT_LED_RED = 0;
static const uint8_t PORT_LED_YELLOW = 1;
static const uint8_t PORT_LED_GREEN = 2;
static const uint8_t PORT_LED_BACKLIGHT = 3;

// The current state of the cloud and GNSS lock LEDs
bool wasConnected = false;
bool wasGnssLocked = false;

// Buffer for keypad presses
char keyBuf[17];
size_t keyOffset = 0;
unsigned long keyLastMillis = 0;
const std::chrono::milliseconds keyExpireTime = 5s;

// Update the GNSS information on the LCD every 2 seconds
unsigned long lockCheckMillis = 0;
const std::chrono::milliseconds locCheckTime = 2s;

// This buffer is used to hold the GNSS location (top line of the LCD)
char gnssBuf[17];

// This is set from the cloud configuration service
int contrast = 24; 
int lastContrast = contrast;

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    Tracker::instance().init();

	// Turn on CAN power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);

    // Set up configuration settings
    static ConfigObject contrastDesc("lcdkeypad", {
        ConfigInt("contrast", &contrast, 0, 255),
    });
    Tracker::instance().configService.registerModule(contrastDesc);

    // Callback to add key press information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Set up MAX7306 keypad/LCD driver
	keyDriver.withKeyMapping(&keyMapper);
	keyDriver.begin();

	// Reset default power-on register settings
	keyDriver.resetRegisterDefaults();

	// The power-on default is inexplicably to use COL2 - COL7 and GPO.
	// Disable GPO on the COL pins so the 4x3 key matrix will work on COL2.
	keyDriver.setGpoEnable(MAX7360::REG_GPO_DISABLED);

	// Only generate key down events, not key up
	keyDriver.setConfigurationEnableKeyRelease(false);

	// Enable PWM and constant current drivers
	keyDriver.setConfigEnableGpio();

	// Set PORT0 (red), PORT1 (green), PORT2 (blue), PORT3 (LCD backlight) to output mode
	keyDriver.setGpioInputOutputMode(0b1111);
	
	// Turn on PORT3 (LCD backlight)
	keyDriver.setPortPwmRatio(PORT_LED_BACKLIGHT, 255);

    // Both keyBuf and gnssBuf are used to set the LCD contents.
    // They're normally filled with 16 spaces and null-terminated.
    memset(keyBuf, ' ', sizeof(keyBuf) - 1);
    keyBuf[sizeof(keyBuf) - 1] = 0;

    memset(gnssBuf, ' ', sizeof(gnssBuf) - 1);
    gnssBuf[sizeof(gnssBuf) - 1] = 0;

    // Initialize the DAC used for LCD contrast
	dac.begin();
	dac.updateSettings(MAX47x6::VREF_VDD, MAX47x6::GAIN_1X, (uint8_t)contrast, false);

    // Initialize the character LCD display. This takes about 10 milliseconds!
	lcd.begin();

	Log.info("setup complete");

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();

	MAX7360Key key = keyDriver.readKeyFIFO();
	if (!key.isEmpty()) {
		Log.info("rawKey=0x%02x readable=%c", key.getRawKey(), key.getMappedKey());

        if (keyOffset == 0) {
            // If keyOffset = 0, clear the entire buffer. This is how the buffer is
            // reset after the 5 second timeout when you start typing keys again.
            memset(keyBuf, ' ', sizeof(keyBuf) - 1);
        }

        if (keyOffset == (sizeof(keyBuf) - 1)) {
            // Buffer is full, make room
            memmove(keyBuf, &keyBuf[1], keyOffset - 1);
            keyOffset--;
        }
        keyBuf[keyOffset++] = key.getMappedKey();
        keyLastMillis = millis();
        lcd.setPosition(0, 1);
        lcd.print(keyBuf);
	}
    if (keyBuf[0] != ' ' && (millis() - keyLastMillis) >= keyExpireTime.count() ) {
        // Time expired, clear displayed keys next time buttons are pressed
        keyOffset = 0;
    }

    // Update location on LCD 
    if (millis() - lockCheckMillis >= locCheckTime.count()) {
        lockCheckMillis = millis();
        
        memset(gnssBuf, ' ', sizeof(gnssBuf) - 1);
        
        LocationPoint point;

        Tracker::instance().locationService.getLocation(point);
        if (point.locked) {
            snprintf(gnssBuf, sizeof(gnssBuf), "%.4f,%.4f", point.latitude, point.longitude);
        }

        lcd.setPosition(0, 0);
        lcd.print(gnssBuf);
    }

    // Red LED = GNSS fix status (on = has fix)
    LocationStatus locStatus;
    Tracker::instance().locationService.getStatus(locStatus);
    if (wasGnssLocked != locStatus.locked) {
        wasGnssLocked = locStatus.locked;
        keyDriver.setPortPwmRatio(PORT_LED_RED, wasGnssLocked ? 255 : 0);
    }

    // Green LED = cloud connection state (on = cloud connected)
    bool connected = Particle.connected();
    if (wasConnected != connected) {
        wasConnected = connected;
        keyDriver.setPortPwmRatio(PORT_LED_GREEN, wasConnected ? 255 : 0);
    }

    if (lastContrast != contrast) {
        Log.info("contrast updated to %d", contrast);
        lastContrast = contrast;
    	dac.updateSettings(MAX47x6::VREF_VDD, MAX47x6::GAIN_1X, (uint8_t)contrast, false);
    }
}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    // keyBuf is always 16 characters long filled with spaces and null terminated for updating the LCD.
    // Make a copy of it so the string will only contain the keys with no trailing spaces.
    char keysCopy[sizeof(keyBuf)];
    strcpy(keysCopy, keyBuf);
    char *cp = strchr(keysCopy, ' ');
    if (cp) {
        *cp = 0;
    }
    writer.name("keys").value(keysCopy);
}

