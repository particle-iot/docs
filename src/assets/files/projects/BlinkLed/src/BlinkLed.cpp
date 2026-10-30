#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const pin_t ledPin = D7;

bool ledState = false;

void setup()
{
    pinMode(ledPin, OUTPUT);
}

void loop()
{
    ledState = !ledState;
    digitalWrite(ledPin, ledState);
    Log.info("led state=%d", ledState);

    delay(1000); // milliseconds
}
