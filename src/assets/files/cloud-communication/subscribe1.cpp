#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;

unsigned long colorSetTime = 0;
std::chrono::milliseconds colorExpirationTime = 10s;

// Forward declarations (functions used before they're implemented)
void setColor(const char *event, const char *data);

void setup()
{
    Particle.subscribe("setColorEvent", setColor);
}

void loop()
{
    if (colorSetTime != 0 && millis() - colorSetTime >= colorExpirationTime.count())
    {
        // Revert back to system color scheme
        RGB.control(false);
        colorSetTime = 0;
        Log.info("reverted to normal color scheme");
    }
}

void setColor(const char *event, const char *data)
{
    Log.info("setColor %s", data);

    int red, green, blue;
    if (sscanf(data, "%u,%u,%u", &red, &green, &blue) == 3)
    {
        // Override the status LED color temporarily
        RGB.control(true);
        RGB.color(red, green, blue);
        colorSetTime = millis();
    }
}
