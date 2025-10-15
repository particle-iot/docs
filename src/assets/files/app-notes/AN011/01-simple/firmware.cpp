#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

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
