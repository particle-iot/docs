#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;

// This is the event name to publish
const char *eventName = "testEvent";

// This is how often to publish (30s = every 30 seconds)
// Other useful units include min for minutes and h for hours.
std::chrono::milliseconds publishPeriod = 15s;

// This keeps track of the last time we published
unsigned long lastPublishMs;

void setup()
{
}

void loop()
{
    // Check to see if it's time to publish
    if (millis() - lastPublishMs >= publishPeriod.count())
    {
        lastPublishMs = millis();

        // Make sure we're cloud connected before publishing
        if (Particle.connected())
        {
            int a = rand() % 10000;
            float b = ((float)rand()) / 100.0;
            bool c = (bool)(rand() % 2);
            String d(String::format("testing %d", rand() % 1000));

            char buf[256];
            JSONBufferWriter writer(buf, sizeof(buf));
            writer.beginObject();
                writer.name("a").value(a);
                writer.name("b").value(b, 3);
                writer.name("c").value(c);
                writer.name("d").value(d);
            writer.endObject();
            writer.buffer()[std::min(writer.bufferSize(), writer.dataSize())] = 0;

            Particle.publish(eventName, buf);

            Log.info("published %s", buf);
        }
    }
}
