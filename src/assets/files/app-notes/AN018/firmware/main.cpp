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

#include "MCP23008-RK.h"
#include "Sparkfun_ADS1015_Arduino_Library.h"

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

// MCP23008: 
// GP0, GP1, GP2: Available on header
// GP3: Controls 12V boost, HIGH = boost on
// GP4 - GP7: Not exposed
MCP23008 gpio(Wire3, 0x20);

const uint8_t LEVEL_PIN = 3;

// ADS1015
// AN0, AIN1, AIN2: Available on header
// AN3: Connected to level sensor
ADS1015 adc;

// Log level to debug serial this often if non-zero
unsigned long debugLevelMillis = 0;
const std::chrono::milliseconds debugLevelPeriod = 2s;



int readLevel();
void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    // Uncomment to make it easier to see the serial logs at startup
    // waitFor(Serial.isConnected, 15000);
    // delay(1000);

    Tracker::instance().init();

    // Callback to add key press information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Turn on CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);

    // Wait for power to stabilize
    delay(250);

    gpio.begin();

    gpio.pinMode(0, OUTPUT);
    gpio.digitalWrite(0, HIGH);

    gpio.pinMode(LEVEL_PIN, OUTPUT);
    gpio.digitalWrite(LEVEL_PIN, HIGH);

    bool bResult = adc.begin(ADS1015_ADDRESS_GND, Wire3);
    if (!bResult) {
        Log.error("ADC initialization failed");
    }

    // Set gain to PGA1: FSR = +/-4.096V
    // This parameter expresses the full-scale range of the ADC scaling. 
    // Do not apply more than VDD + 0.3 V to the analog inputs of the device.
    // (This means 3.3V will be approximately 1652)
    adc.setGain(ADS1015_CONFIG_PGA_1);
    
    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();

    if (debugLevelPeriod.count() != 0 && millis() - debugLevelMillis >= debugLevelPeriod.count()) {
        debugLevelMillis = millis();

        int level = readLevel();

        Log.info("level=%d", level);
    }

}

int readLevel() {
    // Turn on boost converter
    gpio.digitalWrite(LEVEL_PIN, HIGH);

    delay(10);

    int16_t level = adc.getSingleEnded(3);

    gpio.digitalWrite(LEVEL_PIN, LOW);

    return (int) level;
}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    writer.name("level").value(readLevel());
}



