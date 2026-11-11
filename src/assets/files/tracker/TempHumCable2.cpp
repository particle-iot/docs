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

#include "sht3x-i2c.h" // Include file for temperature sensor

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

#if TRACKER_PRODUCT_NEEDED
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif // TRACKER_PRODUCT_NEEDED
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

STARTUP(
    Tracker::startup();
);

/*
 * Workaround for a Device OS 6.5.0 USB CDC panic (SOS 10, "panic, assert_failed").
 * Revert to pre-6.5.0 behavior.
 */
class ThrottledSerialLogHandler: public SerialLogHandler {
public:
    explicit ThrottledSerialLogHandler(LogLevel level = LOG_LEVEL_INFO, LogCategoryFilters filters = {}) :
            SerialLogHandler(level, filters) {
    }

    explicit ThrottledSerialLogHandler(int baud, LogLevel level = LOG_LEVEL_INFO, LogCategoryFilters filters = {}) :
            SerialLogHandler(baud, level, filters) {
    }

    virtual void write(const char *data, size_t size) override {
        for (size_t i = 0; i < size; i++) {
            Serial.write((uint8_t)data[i]);
        }
    }
};

ThrottledSerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

Sht3xi2c sensor(Wire3, 0x44); // M8 temperature/humidity sensor

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    Tracker::instance().init();

    // Enable CAN power for the M8 connector, which also powers the temperature sensor
    Tracker::instance().enableIoCanPower(true);

    // Register a location callback so we can add temperature and humidity information
    // to location publishes
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Initialize the M8 Wire3 port to I2C mode (instead of GPIO or serial)
    sensor.begin(CLOCK_SPEED_400KHZ);
}

void loop()
{
    Tracker::instance().loop();
}

// Callback function registered using regLocGenCallback to add additional parameters to the loc event
void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    double temp, humid;

    int err = sensor.single_shot(&temp, &humid, SHT31_ACCURACY_MEDIUM);

    if (err == 0)
    {
        writer.name("sh31_temp").value(temp);
        writer.name("sh31_humid").value(humid);

        Log.info("temp=%.2lf hum=%.2lf", temp, humid);
    }
    else {
        Log.info("no sensor err=%d", err);
    }
}
