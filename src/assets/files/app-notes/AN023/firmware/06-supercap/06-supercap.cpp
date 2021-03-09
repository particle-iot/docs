#include "AB1805_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(MANUAL);

SerialLogHandler logHandler;

AB1805 ab1805(Wire);

const std::chrono::milliseconds chargeReportingPeriod = 60s;
unsigned long lastChargeReport = 0;
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

    // Check status of supercap before enabling charging
    Log.info("VBAT %s BREF", (ab1805.isVBATAboveBREF() ? "above" : "below"));
    
    // Enable trickle charging
    ab1805.setTrickle(AB1805::REG_TRICKLE_DIODE_0_3 | AB1805::REG_TRICKLE_ROUT_3K);
    
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

    if (millis() - lastChargeReport >= chargeReportingPeriod.count()) {
        lastChargeReport = millis();

        Log.info("VBAT %s BREF", (ab1805.isVBATAboveBREF() ? "above" : "below"));
    }

}

void buttonHandler(system_event_t event, int data) {
    buttonPressed = true;
}

/*

0000007909 [app] INFO: VBAT below BREF
0000060002 [app] INFO: VBAT above BREF
*/