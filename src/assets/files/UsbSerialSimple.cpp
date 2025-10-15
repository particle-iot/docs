#include "Particle.h"

SerialLogHandler logHandler;

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

const std::chrono::milliseconds logPeriod = 5s;
unsigned long lastLog;
int counter;

void setup()
{
}

void loop()
{
    if (Network.listening())
    {
        // If we are in listening mode (blinking dark blue), don't
        // output by USB serial, because it can conflict with
        // serial commands.
        return;
    }

    if (millis() - lastLog >= logPeriod.count())
    {
        lastLog = millis();

        Log.info("counter=%d", ++counter);
    }
}
