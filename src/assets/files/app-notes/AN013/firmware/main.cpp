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

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_INFO, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

// When using the M8 connector, use Wire3 (not Wire)
MCP23008 gpio(Wire3, 0);

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

unsigned long lastGP0 = 0;


void setup()
{      
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    // Initialize the tracker
    Tracker::instance().init();

    // If using the M8 connector, turn on the CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
    delay(500);

    // Initialize the MCP23008 library (I2C GPIO Expander)
	gpio.begin();

    // Set all pins to input pull-up mode. Note: The MCP23008 does not support pull down mode.
    for(uint16_t pin = 0; pin < MCP23008::NUM_PINS; pin++) {
        gpio.pinMode(pin, INPUT_PULLUP);
    }

    // Callback to add temperature information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Connect to the Particle cloud now, since we use SEMI_AUTOMATIC mode
    Particle.connect();
}

void loop()
{
    // Always call the tracker and ds loop functions on every loop call
    Tracker::instance().loop();
   
    if (gpio.digitalRead(MCP23008::PIN_0) == 0 && millis() - lastGP0 > 2000) {
        lastGP0 = millis();

        // Connect GP0 to a push button to GND. When the button is pressed, the location will be published
        Log.info("triggered publish by GP0");
        Tracker::instance().location.triggerLocPub();
    } 

    // For outputs, use:
    // gpio.pinMode(MCP23008::PIN_1, OUTPUT);
    // gpio.digitalWrite(MCP23008::PIN_1, HIGH);
}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    // This is all pins in a bitmask. GP0 is bit 0x01, GP7 is bit 0x80.
    uint8_t pinState = gpio.readAllPins();

    writer.name("pins").value(pinState);

    Log.info("pinState=0x%x", pinState);
}
