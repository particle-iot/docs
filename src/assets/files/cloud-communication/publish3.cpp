#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
SYSTEM_THREAD(ENABLED);

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
            snprintf(buf, sizeof(buf), 
                "{\"a\":%d,\"b\":%.3f,\"c\":%s,\"d\":\"%s\"}", 
                a, b, (c ? "true" : "false"), d.c_str());
            Particle.publish(eventName, buf);

            Log.info("published %s", buf);
        }
    }
}
