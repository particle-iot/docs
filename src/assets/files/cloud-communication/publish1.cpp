#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;

// Forward declarations (functions used before they're implemented)
int getSensor();

// This is the event name to publish
const char *eventName = "testEvent";

// This is how often to publish (30s = every 30 seconds)
// Other useful units include min for minutes and h for hours.
std::chrono::milliseconds publishPeriod = 30s;

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

        // The event data is string but we just send our value as
        // a ASCII formatted decimal number
        String eventData = String::format("%d", getSensor());

        // Make sure we're cloud connected before publishing
        if (Particle.connected())
        {
            Particle.publish(eventName, eventData);

            Log.info("published %s", eventData.c_str());
        }
        else
        {
            Log.info("not cloud connected %s", eventData.c_str());
        }
    }
}

int getSensor()
{
    // To make this tutorial function without actually
    // requiring a sensor, we just return a random
    // value from 0 - 4095 like you'd get from an
    // analogRead() call
    return rand() % 4096;
}
