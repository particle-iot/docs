#include "Particle.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

const pin_t directionPin = A3;

int gLastBitRate = 0;

#include "SerialPassthrough.h"

SerialPassthrough serialPassthrough;



void setup() 
{
    serialPassthrough.setup();

    // This firmware does not require a cloud connection, but if you can enable
    // it by uncommenting the next line:
    // Particle.connect();
}

void loop()
{
    serialPassthrough.loop();
}