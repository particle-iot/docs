#include "Particle.h"

SerialLogHandler logHandler(LOG_LEVEL_INFO);

SYSTEM_MODE(SEMI_AUTOMATIC);

SYSTEM_THREAD(ENABLED);

void setup() {
    // waitUntil(Serial.isConnected);
    // Enable Cellular
    Cellular.on();
    Cellular.connect();

    // Bind Tether interface to Serial1 @ 921600 baudrate with default settings (8n1 + RTS/CTS flow control)
    Tether.bind(TetherSerialConfig().baudrate(921600).serial(Serial1));

    // Without flow control, use this instead:
    // Tether.bind(TetherSerialConfig().baudrate(921600).config(SERIAL_8N1).serial(Serial1));

    // Turn on Tether interface and bring it up
    Tether.on();
    Tether.connect();
}

void loop() {
}
