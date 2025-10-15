#include "Particle.h"

// The following line is optional, but it allows your code to run
// even when not cloud connected
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// This allows for USB serial debug logs
SerialLogHandler logHandler;


#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(PLATFORM_ID);
#endif
PRODUCT_VERSION(1);

// Forward declarations (functions used before they're implemented)
int getSensor();
int setColor(String cmd);
int publishEvent(String cmd);
void subscribeHandler(const char *event, const char *data);

unsigned long colorSetTime = 0;
std::chrono::milliseconds colorExpirationTime = 10s;

// Forward declarations (functions used before they're implemented)

void setup()
{
    Particle.subscribe("tAAzf9hy_subscribeTest", subscribeHandler);
    Particle.variable("sensor", getSensor);
    Particle.function("setColor", setColor);
    Particle.function("publishEvent", publishEvent);
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

int getSensor()
{
    // To make this tutorial function without actually
    // requiring a sensor, we just return a random
    // value from 0 - 4095 like you'd get from an
    // analogRead() call
    int result = rand() % 4096;

    Log.info("getSensor returning %d", result);

    return result;
}


int setColor(String cmd)
{
    int result = 0;

    Log.info("setColor %s", cmd.c_str());

    int red, green, blue;
    if (sscanf(cmd, "%d,%d,%d", &red, &green, &blue) == 3)
    {
        // Override the status LED color temporarily
        RGB.control(true);
        RGB.color(red, green, blue);
        colorSetTime = millis();

        Log.info("red=%d green=%d blue=%d", red, green, blue);
        result = 1;
    }
    else {
        Log.info("not red,green,blue");
    }
    return result;
}

int publishEvent(String cmd) 
{
    Log.info("publishEvent %s", cmd);
    Particle.publish(cmd);
    return 0;
}

void subscribeHandler(const char *event, const char *data)
{
    Log.info("subscribeHandler event=%s data=%s", event, data);
}

