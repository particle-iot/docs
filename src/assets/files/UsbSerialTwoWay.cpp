#include "Particle.h"

SerialLogHandler logHandler;

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

const std::chrono::milliseconds logPeriod = 5s;
unsigned long lastLog;
int counter;

const size_t BUF_SIZE = 128;
char buf[BUF_SIZE];
size_t bufOffset = 0;

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

    while (Serial.available())
    {
        char c = (char)Serial.read();
        if (c == '\r' || c == '\n')
        {
            if (bufOffset > 0)
            {
                buf[bufOffset] = 0;
                Log.info("received %s", buf);
            }
            bufOffset = 0;
        }
        else
        {
            if ((bufOffset + 1) < (BUF_SIZE - 1))
            {
                buf[bufOffset++] = c;
            }
        }
    }
}
