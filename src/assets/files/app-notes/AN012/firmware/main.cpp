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

#include "DS2482-RK.h"

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
DS2482 ds(Wire3, 0);

const std::chrono::milliseconds checkPeriod = 10s;
unsigned long checkLast = 0;
DS2482DeviceListStatic<10> deviceList;
bool haveTemperatures = false;
bool doScan = true;

int scanFunction(String cmd); // forward declaration
void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration



void setup()
{      
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    // waitFor(Serial.isConnected, 15000);
    // delay(1000);

    // Initialize the tracker
    Tracker::instance().init();

    // If using the M8 connector, turn on the CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
    delay(500);

    // Initialize the DS2482 I2C to 1-wire interface
	ds.setup();
    doScan = true;

    // Callback to add temperature information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Particle function to rescan the 1-Wire bus
    Particle.function("scan", scanFunction);

    // Connect to the Particle cloud now, since we use SEMI_AUTOMATIC mode
    Particle.connect();
}

void loop()
{
    // Always call the tracker and ds loop functions on every loop call
    Tracker::instance().loop();
    ds.loop();

    if (doScan) {
        doScan = false;

        // Reset the DS2482 and scan the 1-wire bus. This is asynchronous.
        DS2482DeviceReset::run(ds, [](DS2482DeviceReset&, int status) {
            Log.info("deviceReset=%d", status);
            DS2482SearchBusCommand::run(ds, deviceList, [](DS2482SearchBusCommand &obj, int status) {

                if (status != DS2482Command::RESULT_DONE) {
                    Log.error("DS2482SearchBusCommand status=%d", status);
                    return;
                }

                Log.info("Found %u devices", deviceList.getDeviceCount());

                // Force a temperature scan now
                checkLast = millis() - checkPeriod.count();
            });
        });

    }

    if (millis() - checkLast >= checkPeriod.count()) {
        checkLast = millis();

		if (deviceList.getDeviceCount() > 0) {
            // Get the temperatures from the devices. This is asynchronous.
			DS2482GetTemperatureForListCommand::run(ds, deviceList, [](DS2482GetTemperatureForListCommand&, int status, DS2482DeviceList &deviceList) {
				if (status != DS2482Command::RESULT_DONE) {
					Log.error("DS2482GetTemperatureForListCommand status=%d", status);
					return;
				}

				Log.info("got temperatures!");

				for(size_t ii = 0; ii < deviceList.getDeviceCount(); ii++) {
					Log.info("%s valid=%d C=%.2f F=%.2f",
							deviceList.getAddressByIndex(ii).toString().c_str(),
							deviceList.getDeviceByIndex(ii).getValid(),
							deviceList.getDeviceByIndex(ii).getTemperatureC(),
							deviceList.getDeviceByIndex(ii).getTemperatureF());
				}

                haveTemperatures = true;
			});
		}
		else {
			Log.info("no devices found");
            haveTemperatures = false;
            doScan = true;
		}


    }
}

int scanFunction(String cmd) {
    Log.info("scan function called");
    doScan = true;
    return 0;
}

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    if (haveTemperatures) {
        for(size_t ii = 0; ii < deviceList.getDeviceCount(); ii++) {
            if (deviceList.getDeviceByIndex(ii).getValid()) {
                writer.name(deviceList.getAddressByIndex(ii).toString().c_str());
                writer.value(deviceList.getDeviceByIndex(ii).getTemperatureC(), 2);
            }
        }
    }
    else {
        Log.info("no temperature");
    }
}
