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

// Library: SparkFun_MCP9600_Arduino_Library
#include "SparkFun_MCP9600.h"

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

MCP9600 tempSensor;

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration


void setup()
{
    Tracker::instance().init();

    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

	// Turn on CAN power (needed when using M8 connector only)
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);

    // Set the multi-function pins for use the I2C instead of serial or GPIO
    Wire3.begin();
    Wire3.setClock(100000);

    // Initialize the MCP9600 I2C thermocouple library
    tempSensor.begin(0x60, Wire3); 

    if(tempSensor.isConnected() && tempSensor.checkDeviceID()) {
        Log.info("temp sensor good");
    }
    else {
        Log.error("temp sensor init failed");
    }

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();

    // This is just to print data to the USB serial debug log so you don't have to
    // wait for a location publish. Also handy for touching the thermocouple
    // to see the temperature change.
    static unsigned long lastLog = 0;
    if (millis() - lastLog >= 2000) {
        lastLog = millis();

        if(tempSensor.available()) {
            Log.info("thermocouple=%.2f ambient=%.2f", tempSensor.getThermocoupleTemp(), tempSensor.getAmbientTemp());
        }
    }
}

void myLocationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context)
{
    if (tempSensor.available()) {
        // Add "thermocouple" with a value of degrees C to the location publish event
        // This shows up in the Custom Data section of the device details
        writer.name("thermocouple").value(tempSensor.getThermocoupleTemp(), 2); // degrees C
    }
    else {
        Log.info("no sensor");
    }
}
