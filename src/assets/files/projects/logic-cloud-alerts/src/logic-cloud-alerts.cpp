#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

// How often to check our imaginary temperature and humidity sensor
const std::chrono::milliseconds sensorCheckPeriod = 60s;
unsigned long sensorCheckLast = 0;

// This is the name of the event to publish
const char *eventName = "testCloudSensor";

// Forward declarations
void readSensor(double &temp, double &hum);

char jsonBuffer[particle::protocol::MAX_EVENT_DATA_LENGTH + 1];

void setup() {
}

void loop() {
    if (Particle.connected()) {
        if (sensorCheckLast == 0 || millis() - sensorCheckLast >= sensorCheckPeriod.count()) {
            sensorCheckLast = millis();
            
            double temp, hum;
            readSensor(temp, hum);

            // Publish
            memset(jsonBuffer, 0, sizeof(jsonBuffer));
            JSONBufferWriter writer(jsonBuffer, sizeof(jsonBuffer) - 1);

            writer.beginObject();
            writer.name("temp").value(temp);
            writer.name("hum").value(hum);
            writer.endObject();            

            Particle.publish(eventName, jsonBuffer);
            Log.info("publish %s %s", eventName, jsonBuffer);
        }
    }
}

// This is just a helper function to making fake random values
static void randomValue(double min, double max, double &value) {
    double delta = (double)((rand() % 100) - 50) / 10.0;
    value += delta;
    if (value < min) {
        value = min;
    }
    if (value > max) {
        value = max;
    }
}

void readSensor(double &temp, double &hum) {
    static double lastTemp = (double)(rand() % 50);
    static double lastHum = (double)(rand() % 50) + 10.0;

    // In a real application, you'd read the sensor here, but we just return random-ish values here

    // temp (temperature in degrees C), between 0 and 50
    randomValue(0, 50, lastTemp);    
    temp = lastTemp;

    // hum (humidity % RH), between 10 and 90
    randomValue(10, 90, lastHum);    
    hum = lastHum;
}

