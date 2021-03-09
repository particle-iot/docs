#include "AB1805_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

AB1805 ab1805(Wire);

bool buttonPressed = false;

void buttonHandler(system_event_t event, int data);

void setup() {
    System.on(button_click, buttonHandler);
    
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    ab1805.withFOUT(D8).setup();

    AB1805::WakeReason wakeReason = ab1805.getWakeReason();
    if (wakeReason == AB1805::WakeReason::DEEP_POWER_DOWN) {
        Log.info("woke from DEEP_POWER_DOWN");
    }

    ab1805.resetConfig();
    
    //ab1805.setWDT(AB1805::WATCHDOG_MAX_SECONDS);
}


void loop() {
    ab1805.loop();

    if (buttonPressed) {
        buttonPressed = false;

        Log.info("deep power down");
        delay(1000);

        ab1805.deepPowerDown(30);
    }

}

void buttonHandler(system_event_t event, int data) {
    buttonPressed = true;
}

