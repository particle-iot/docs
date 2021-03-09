#include "Particle.h"

SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler;

// How often to publish a value
const std::chrono::milliseconds publishPeriod = 30s;

// The event name to publish with
const char *eventName = "sheetTest1";

unsigned long lastPublish;
int counter = 0;

void publishTest();

void setup() {
}

void loop() {
    if (Particle.connected()) {
        if (millis() - lastPublish >= publishPeriod.count()) {
            lastPublish = millis();

            publishTest();
        }
    }
}

void publishTest() {
    char buf[128];

    snprintf(buf, sizeof(buf), "[%d,%d]", ++counter, rand());

    Particle.publish(eventName, buf, PRIVATE);
    Log.info("published: %s", buf);
}  
