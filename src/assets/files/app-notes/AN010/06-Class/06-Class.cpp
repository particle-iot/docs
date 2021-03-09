// 06-Class State Machine Example

// Public domain (CC0) 
// Can be used in open or closed-source commercial projects and derivative works without attribution.


#include "Particle.h"

#include "MainStateMachine.h"

// This example uses threading enabled and SEMI_AUTOMATIC mode
SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

// Using Serial1 (RX/TX) for debugging logs and an external TTL serial to USB (FT232) converter
// is useful when testing sleep modes. Sleep causes USB serial to disconnect, and you will often
// lose the debug logs immediately after wake. With an external USB serial converter, your
// serial terminal stays connected so you get all log messages. If you don't have one, you can
// comment out the Serial1LogHandler and uncomment the SerialLogHandler to use USB.
Serial1LogHandler logHandler(115200);
// SerialLogHandler logHandler;

MainStateMachine mainStateMachine;


void setup() {
    mainStateMachine.setup();
}

void loop() {
    mainStateMachine.loop();
}