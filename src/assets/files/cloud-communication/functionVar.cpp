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
int setColor(String cmd);

// This is how often to read the sensor (every 1 second)
std::chrono::milliseconds sensorCheckPeriod = 1s;

// This keeps track of the last time we published
unsigned long lastSensorCheckMs;

// The is is the variable where the sensor value is stored.
int sensor;

unsigned long colorSetTime = 0;
std::chrono::milliseconds colorExpirationTime = 10s;

// Forward declarations (functions used before they're implemented)

void setup()
{
    Particle.variable("sensor", sensor);
    Particle.function("setColor", setColor);
}

void loop()
{
    // Check to see if it's time to publish
    if (millis() - lastSensorCheckMs >= sensorCheckPeriod.count())
    {
        lastSensorCheckMs = millis();

        sensor = getSensor();
    }
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
    return rand() % 4096;
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
