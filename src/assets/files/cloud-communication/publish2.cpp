#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;

// Forward declarations (functions used before they're implemented)
void getSensor(float &temperatureC, float &humidity);

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

        // Get temperature and humidity values
        float temperatureC, humidity;
        getSensor(temperatureC, humidity);

        // Make a comma-separated output of both values. Each
        // value is a floating point number with 1 decimal place
        // %f is a floating point number and the .1 is one
        // decimal place in the float.
        String eventData = String::format("%.1f,%.1f",
                                          temperatureC, humidity);

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

void getSensor(float &temperatureC, float &humidity)
{
    // Return a random temperature from -20 to +40 C
    // and a humidity from 0 to 100 just for testing
    // purposes. You would normally get it from your
    // sensor hardware here.
    temperatureC = (float)(rand() % 600) / 10 - 20;
    humidity = (float)(rand() % 1010) / 10;
}
