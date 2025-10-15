#include "Particle.h"

SerialLogHandler logHandler(LOG_LEVEL_INFO);

SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

const pin_t hatUartControlPin = A0;

void setup() {
    // Enable the UART connection to the M-HAT
    pinMode(hatUartControlPin, OUTPUT);
    digitalWrite(hatUartControlPin, HIGH); 

    // Enable Cellular
    Cellular.on();
    Cellular.connect();

    // Bind Tether interface to Serial1 @ 921600 baudrate with default settings (8n1 + RTS/CTS flow control)
    Tether.bind(TetherSerialConfig().baudrate(921600).serial(Serial1));
    
    // Turn on Tether interface and bring it up
    Tether.on();
    Tether.connect();
}

void loop() {
}
