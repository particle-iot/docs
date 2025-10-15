#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

const pin_t WATCHDOG_PIN = D6;
const std::chrono::milliseconds WATCHDOG_PERIOD = 2min;

void serviceWatchdog();

void setup() {
    System.enableFeature(FEATURE_RESET_INFO);
    pinMode(WATCHDOG_PIN, OUTPUT);

    // Uncomment to make it easier to see the serial logs at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    if (System.resetReason() == RESET_REASON_PIN_RESET) {
        Log.info("RESET_REASON_PIN_RESET: either RESET or hardware watchdog");
    }
}

void loop() {
    // Call this from every loop(). Also call it from any place where you are blocking
    // for an extended period of time.
    serviceWatchdog();
}


void serviceWatchdog() {
    static unsigned long lastWatchdogMillis = 0;

    if (millis() - lastWatchdogMillis >= WATCHDOG_PERIOD.count()) {
        lastWatchdogMillis = millis();

        // Log.info("service watchdog");

        // Actual minimum high period is 100 ns but there is no nanosecond delay
        // in Device OS. 1 microsecond is still a very short period of time so
        // blocking should not be an issue here as it only happens once every
        // 2 minutes.
        digitalWrite(WATCHDOG_PIN, HIGH);
        delayMicroseconds(1);
        digitalWrite(WATCHDOG_PIN, LOW);
    }
}
