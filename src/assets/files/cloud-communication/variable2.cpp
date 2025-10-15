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

void setup()
{
    Particle.variable("sensor", getSensor);
}

void loop()
{
}

int getSensor()
{
    // To make this tutorial function without actually
    // requiring a sensor, we just return a random
    // value from 0 - 4095 like you'd get from an
    // analogRead() call
    return rand() % 4096;
}
