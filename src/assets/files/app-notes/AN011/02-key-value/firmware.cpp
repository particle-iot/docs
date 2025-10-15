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
char buf[256];

const char *colorNames[] = {
    "white", "silver", "gray", "black", "red", "maroon", "yellow", "olive", "lime", "green", "aqua", "teal", "blue", "navy", "fuchsia", "purple"
};

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
    JSONBufferWriter writer(buf, sizeof(buf) - 1);

    // This just picks a random color name from the table above. It's just
    // to illustrate adding a string to the JSON as well as numbers.
    size_t numColors = sizeof(colorNames) / sizeof(colorNames[0]);
    const char *colorName = colorNames[rand() % numColors];

    writer.beginObject();
    writer.name("counter").value(++counter);
    writer.name("a").value(rand());
    writer.name("color").value(colorName);
    writer.endObject();
    writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;

    Particle.publish(eventName, buf, PRIVATE);
    Log.info("published: %s", buf);
}  
