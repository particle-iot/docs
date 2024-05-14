#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);
SYSTEM_THREAD(ENABLED);
SerialLogHandler logHandler(LOG_LEVEL_INFO);

PRODUCT_VERSION(4);

const std::chrono::milliseconds firstPublishDelay = 10s;
const std::chrono::milliseconds publishInterval = 5min;
unsigned long lastPublish = 0;

void publishData();

void setup() {
    Particle.connect();
}

void loop() {
    if (Particle.connected()) {
        if (lastPublish == 0) {
            lastPublish = millis() + firstPublishDelay.count() - publishInterval.count();
        }
        else
        if (millis() - lastPublish >= publishInterval.count()) {
            lastPublish = millis();
            publishData();
        }        
    }
}

// This is just a placeholder so you don't need an actual temperature sensor
int readTemperature() {
    static float lastTemperature = 21.0;
    
    lastTemperature += (float) (rand() % 30) / 10 - 1.5;

    return lastTemperature;
}

void publishData() {
    char buf[128];

    memset(buf, 0, sizeof(buf));
    JSONBufferWriter writer(buf, sizeof(buf) - 1);

    writer.beginObject();
    writer.name("t").value(readTemperature());
    writer.name("v").value(__system_product_version);
    writer.endObject();

    Particle.publish("tempmon", buf);
    Log.info(buf);
}




