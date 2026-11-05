#include "Particle.h"

#include "sht3x-i2c.h"

PRODUCT_VERSION(2);

#ifndef SYSTEM_VERSION_v400ALPHA1
// For Gen 2 devices or any device using less than Device OS 4.0.0, you need to specify the product ID in the firmware as well.
PRODUCT_ID(1234);
#endif

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler(LOG_LEVEL_INFO);

Sht3xi2c sensor(Wire, 0x44);
bool sensorStarted = false;

const char *eventName = "temperatureSensorTest";

unsigned long lastSensorCheck = 0;
const std::chrono::milliseconds sensorCheckPeriod = 15min;

bool checkSensor(JSONWriter &writer);
bool i2cscan(TwoWire &wire);


void setup()
{
}

void loop()
{
    if (Particle.connected()) {
        if (lastSensorCheck == 0 || millis() - lastSensorCheck >= sensorCheckPeriod.count()) {
            lastSensorCheck = millis();

            char buf[256];
            JSONBufferWriter writer(buf, sizeof(buf) - 1);

            writer.beginObject();
            bool checkResult = checkSensor(writer);
            writer.endObject();

            writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;

            if (checkResult) {
                Particle.publish(eventName, buf);
                Log.info("published %s", buf);
            }
        }
    }
}

bool checkSensor(JSONWriter &writer) 
{
    double temp, humid;

    if (!sensorStarted) {
        sensor.begin(CLOCK_SPEED_400KHZ);
        sensor.start_periodic();

        sensorStarted = true;
    }

    for(int tries = 1; tries <= 3; tries++) {
        int err = sensor.get_reading(&temp, &humid);
        if (err == 0)
        {
            // Log.info("temp=%.2lf hum=%.2lf", temp, humid);

            writer.name("temp").value(temp);
            writer.name("humid").value(humid);

            return true;
        }

        Log.info("failed to get reading try=%d result=%d", tries, err);
        delay(1000);
    }

    sensorStarted = false;
    i2cscan(Wire);

    return false;
}

// This is for debugging only
bool i2cscan(TwoWire &wire) {
    bool bFound = false;

	Log.info("Scanning I2C bus...");

	int numDevices = 0;

	// Address 0x79 to 0x7f are reserved, don't scan them
	for(byte address = 1; address < 0x78; address++) {
		wire.beginTransmission(address);
		byte error = wire.endTransmission();

		if (error == 0) {
			const char *deviceName = NULL;

			switch(address) {
                case 0x44:
                    deviceName = "SHT3x temperature sensor (default address)";
                    break;

                case 0x45:
                    deviceName = "SHT3x termperature sensor (alternate address)";
                    break;

                case 0x48:
                    deviceName = "TMP112A temperature sensor";
                    break;

                case 0x76:
                    deviceName = "BME280 temperature and humidity sensor";
                    break;
			}
			if (deviceName != NULL) {
				Log.info("%s found at address 0x%02x", deviceName, address);
                bFound = true;
			}
			else {
				Log.info("Unknown I2C device found at address 0x%02x", address);
			}

			numDevices++;
		}
		else if (error == 4) {
			Log.info("Unknown I2C error at address 0x%2x", address);
		}
	}

	Log.info("%d I2C devices found", numDevices);

    return bFound;
}
