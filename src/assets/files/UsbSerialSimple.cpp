#include "Particle.h"

SerialLogHandler logHandler;

SYSTEM_THREAD(ENABLED);

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
