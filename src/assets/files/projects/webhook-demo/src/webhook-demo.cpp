#include "Particle.h"

SerialLogHandler logHandler;
SYSTEM_THREAD(ENABLED);


const char *eventName = "webhookDemo01";

const std::chrono::milliseconds publishInterval = 5min;
unsigned long lastPublishMillis = -publishInterval.count();

float readTemperature();
void publishSensorData();

void setup() 
{

}

void loop() 
{
    if (Particle.connected() && millis() - lastPublishMillis >= publishInterval.count()) {
        lastPublishMillis = millis();

        publishSensorData();
    }
}

float readTemperatureC() 
{
    // This code doesn't actually read the temperature, it just returns a random number,
    // but you could easily put the code to read an actual sensor here.
    static float lastTemperatureC = -100;

    if (lastTemperatureC != -100) {
        lastTemperatureC += (float) ((rand() % 6) - 3);
    }
    else {
        lastTemperatureC = (float) (rand() % 40);
    }
    return lastTemperatureC;
}

void publishSensorData()
{
    char publishDataBuf[particle::protocol::MAX_EVENT_DATA_LENGTH + 1];

    JSONBufferWriter writer(publishDataBuf, sizeof(publishDataBuf) - 1);

    float temperatureC = readTemperatureC();

    writer.beginObject();
    writer.name("t").value(temperatureC);
    writer.endObject();
    writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;

    Particle.publish(eventName, publishDataBuf);
}