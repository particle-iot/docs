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

// This is how often to read the sensor (every 1 second)
std::chrono::milliseconds sensorCheckPeriod = 1s;

// This keeps track of the last time we published
unsigned long lastSensorCheckMs;

// The is is the variable where the sensor value is stored.
int sensor;

void setup()
{
    Particle.variable("sensor", sensor);
}

void loop()
{
    // Check to see if it's time to publish
    if (millis() - lastSensorCheckMs >= sensorCheckPeriod.count())
    {
        lastSensorCheckMs = millis();

        sensor = getSensor();
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
