#include "AB1805_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

// This is the maximum amount of time to allow for connecting to cloud. If this time is
// exceeded, do a deep power down. This should not be less than 10 minutes. 11 minutes
// is a reasonable value to use.
const std::chrono::milliseconds connectMaxTime = 11min;

AB1805 ab1805(Wire);
int outOfMemory = -1;
bool cloudConnected = false;
uint64_t cloudConnectStarted = 0;

void outOfMemoryHandler(system_event_t event, int param);

void setup() {
    // Enabling an out of memory handler is a good safety tip. If we run out of
    // memory a System.reset() is done.
    System.on(out_of_memory, outOfMemoryHandler);
    
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    // Make sure you set up the AB1805 library from setup()!
    ab1805.setup();

    // This is how to check if we did a deep power down (optional)
    AB1805::WakeReason wakeReason = ab1805.getWakeReason();
    if (wakeReason == AB1805::WakeReason::DEEP_POWER_DOWN) {
        Log.info("woke from DEEP_POWER_DOWN");
    }

    // Reset the AB1805 configuration to default values
    ab1805.resetConfig();
    
    // If using the supercap, enable trickle charging here. 
    // Do not enable this for the AB1805-Li example!
    // ab1805.setTrickle(AB1805::REG_TRICKLE_DIODE_0_3 | AB1805::REG_TRICKLE_ROUT_3K);
    
    // Enable watchdog
    ab1805.setWDT(AB1805::WATCHDOG_MAX_SECONDS);

    // Connect to the Particle cloud
    Particle.connect();
}


void loop() {
    // Be sure to call ab1805.loop() on every call to loop()
    ab1805.loop();

    if (outOfMemory >= 0) {
        // An out of memory condition occurred - reset device.
        Log.info("out of memory occurred size=%d", outOfMemory);
        delay(100);

        System.reset();
    }

    // Monitor the cloud connection state and do a deep power down if a 
    // failure to connect exceeds connectMaxTime (typically 11 minutes).
    if (Particle.connected()) {
        if (!cloudConnected) {
            cloudConnected = true;
            uint32_t elapsed = (uint32_t)(System.millis() - cloudConnectStarted);
            Log.info("cloud connected in %lu ms", elapsed);
        }
    }
    else {
        if (cloudConnected) {
            cloudConnected = false;
            cloudConnectStarted = System.millis();
            Log.info("lost cloud connection");
        }
        uint32_t elapsed = (uint32_t)(System.millis() - cloudConnectStarted);
        if (elapsed > connectMaxTime.count()) {
            Log.info("failed to connect to cloud, doing deep reset");
            delay(100);
            ab1805.deepPowerDown();
        }
    }
}

void outOfMemoryHandler(system_event_t event, int param) {
    outOfMemory = param;
}
