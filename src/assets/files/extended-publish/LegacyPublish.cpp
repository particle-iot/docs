// LegacyPublish.cpp

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

// System thread defaults to on in 6.2.0 and later and this line is not required
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED);
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const std::chrono::milliseconds publishPeriod = 2min;
unsigned long lastPublish;

void readSensors(float &a, int &b);
void publishSensors();

void setup() {
}

void loop() {
    if (Particle.connected() && ((lastPublish == 0) || (millis() - lastPublish >= publishPeriod.count()))) {
        lastPublish = millis();

        publishSensors();
    }
}


void readSensors(float &a, int &b) {
    a = ((float)rand()) / (float)INT_MAX;
    b = rand();
}

void publishSensors() {
    float a;
    int b;
    readSensors(a, b);

    char buf[256];
    memset(buf, 0, sizeof(buf));
    JSONBufferWriter writer(buf, sizeof(buf) - 1);

    writer.beginObject();
    writer.name("a").value(a);
    writer.name("b").value(b);
    writer.endObject();

    Log.info("publishing %s", buf);

    bool bResult = Particle.publish("publish-test", buf);
    if (bResult) {
        Log.info("publish succeeded");
    }
    else {
        Log.info("publish failed");
    }
}
