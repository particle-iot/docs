#include "AB1805_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

AB1805 ab1805(Wire);

void setup() {
    ab1805.setup();

    // Reset the AB1805 configuration to default values
    ab1805.resetConfig();

    // Enable watchdog
    ab1805.setWDT(AB1805::WATCHDOG_MAX_SECONDS);

    // Connect to the Particle cloud
    Particle.connect();
}


void loop() {
    // Be sure to call ab1805.loop() on every call to loop()
    ab1805.loop();
}
