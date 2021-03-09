#include "AB1805_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

// This is the maximum amount of time to allow for connecting to cloud. If this time is
// exceeded, do a deep power down. This should not be less than 10 minutes. 11 minutes
// is a reasonable value to use.
const std::chrono::milliseconds connectMaxTime = 11min;

// This is the address in the 256-byte RTC RAM where we store a demonstration counter
// value. This doesn't serve much purpose, other than showing how to use RTC RAM.
const size_t counterRamAddr = 0;

const uint32_t COUNTER_MAGIC = 0x3939671e;
typedef struct {
    uint32_t    magic;
    int         counter;
} CounterData;

AB1805 ab1805(Wire);
int outOfMemory = -1;
bool cloudConnected = false;
uint64_t cloudConnectStarted = 0;
bool doPublish = false;
bool doSleep = false;
bool doWaitForTime = false;

void outOfMemoryHandler(system_event_t event, int param);

void setup() {
    // Enabling an out of memory handler is a good safety tip. If we run out of
    // memory a System.reset() is done.
    System.on(out_of_memory, outOfMemoryHandler);
    
    // Optional: Enable to make it easier to see debug USB serial messages at startup
    waitFor(Serial.isConnected, 15000);
    delay(1000);

    // The sample board has D8 connected to FOUT for wake interrupts
    ab1805.withFOUT(D8).setup();

    // Note whether the RTC is set before calling resetConfig() as this will make
    // isRTCSet return false.
    bool rtcSet = ab1805.isRTCSet();

    // Reset the AB1805 configuration to default values
    ab1805.resetConfig();
    
    // If using the supercap, enable trickle charging here. 
    // Do not enable this for the AB1805-Li example!
    ab1805.setTrickle(AB1805::REG_TRICKLE_DIODE_0_3 | AB1805::REG_TRICKLE_ROUT_3K);
    
    // Enable periodic wake-up once per hour
    // `REG_TIMER_CTRL_RPT_MIN` tm_sec, tm_min match (once per hour)
    struct tm wakeTime = {0};
    wakeTime.tm_sec = 0;
    wakeTime.tm_min = 50;
    ab1805.repeatingInterrupt(&wakeTime, AB1805::REG_TIMER_CTRL_RPT_MIN);

    // Enable watchdog
    ab1805.setWDT(AB1805::WATCHDOG_MAX_SECONDS);

    // The wakeReason is set during setup() so it's safe to call it after resetConfig.
    AB1805::WakeReason wakeReason = ab1805.getWakeReason();
    if (wakeReason == AB1805::WakeReason::DEEP_POWER_DOWN) {
        Log.info("woke from DEEP_POWER_DOWN");
    }
    else
    if (wakeReason == AB1805::WakeReason::ALARM) {
        // We were wakened by the alarm
        Log.info("woke by alarm (periodic interrupt)");
        doPublish = true;

        // Connect to the Particle cloud
        Particle.connect();
    }
    else
    if (!rtcSet) {
        // RTC has not been set, get time from the cloud
        Log.info("RTC not set yet, getting time from cloud");
        doWaitForTime = true;

        // Connect to the Particle cloud
        Particle.connect();
    }
    else {
        // Just go to sleep
        doSleep = true;
    }

}


void loop() {
    // Be sure to call ab1805.loop() on every call to loop()
    ab1805.loop();

    if (doSleep) {
        // Be sure to stop the watchdog timer before going to sleep!
        ab1805.stopWDT();

        // The delay is only so the Log.info will go out by serial. It's not
        // necessary for the functioning of sleep itself.
        Log.info("going to sleep");
        delay(100);

        SystemSleepConfiguration config;
        config.mode(SystemSleepMode::HIBERNATE)
            .gpio(D8, FALLING);
        System.sleep(config);

        // This should never be reached
        System.reset();
    }

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
        if (doPublish) {
            doPublish = false;
            doSleep = true;

            // Increment a value stored in the RTC non-volatile RAM
            CounterData counterData;
            ab1805.get(counterRamAddr, counterData);
            if (counterData.magic != COUNTER_MAGIC) {
                // Initialize the CounterData structure on first use
                counterData.magic = COUNTER_MAGIC;
                counterData.counter = 0;
            }
            counterData.counter++;
            ab1805.put(counterRamAddr, counterData);

            Particle.publish("testPublish", String(counterData.counter), PRIVATE);
            Log.info("publish counter=%d", counterData.counter);
        }
        if (doWaitForTime && ab1805.isRTCSet()) {
            // We're waiting for the time and we've gotten it. Go to sleep
            doWaitForTime = false;
            doSleep = true;
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


/*
0000003112 [app.ab1805] INFO: wake reason = ALARM
0000003115 [app.ab1805] INFO: getRtcAsTm 2020-10-20 13:50:03
0000003116 [app.ab1805] INFO: set system clock from RTC Tue Oct 20 13:50:03 2020
0000003124 [app.ab1805] INFO: setWDT 0
0000003128 [app.ab1805] INFO: alarm (first) current (second)
00005000000100
6903501320102002
0000003132 [app.ab1805] INFO: setWDT 124
0000003133 [app] INFO: woke by alarm (periodic interrupt)
0000003135 [system.nm] INFO: State changed: DISABLED -> IFACE_DOWN
0000003136 [system.nm] INFO: State changed: IFACE_DOWN -> IFACE_REQUEST_UP
0000003137 [system.nm] INFO: State changed: IFACE_REQUEST_UP -> IFACE_UP
0000014516 [ncp.client] INFO: Using internal SIM card
0000015606 [gsm0710muxer] INFO: Starting GSM07.10 muxer
0000015607 [gsm0710muxer] INFO: Openning mux channel 0
0000015607 [gsm0710muxer] INFO: GSM07.10 muxer thread started
0000015610 [gsm0710muxer] INFO: Openning mux channel 1
0000015735 [gsm0710muxer] INFO: Openning mux channel 2
0000018150 [system.nm] INFO: State changed: IFACE_UP -> IFACE_LINK_UP
0000018152 [system.nm] INFO: State changed: IFACE_LINK_UP -> IP_CONFIGURED
0000018153 [system] INFO: Cloud: connecting
0000018155 [system] INFO: Cloud socket connected
0000018155 [comm.protocol.handshake] INFO: Establish secure connection
0000018364 [comm.protocol.handshake] INFO: Skipping HELLO message
0000018467 [comm.protocol] INFO: Checksum has not changed; not sending application DESCRIBE
0000018467 [comm.protocol] INFO: Checksum has not changed; not sending subscriptions
0000018925 [system] INFO: Cloud connected
0000018925 [app] INFO: cloud connected in 18925 ms
0000018931 [app] INFO: publish counter=2
0000018931 [app.ab1805] INFO: setWDT 0
0000018932 [app] INFO: going to sleep
0000019035 [system.nm] INFO: State changed: IP_CONFIGURED -> IFACE_UP
0000019036 [system.nm] INFO: State changed: IFACE_UP -> IFACE_REQUEST_DOWN
0000019037 [system.nm] INFO: State changed: IFACE_REQUEST_DOWN -> IFACE_DOWN
0000019038 [system] INFO: Cloud: disconnecting
0000019038 [system] INFO: Cloud: disconnected
0000019042 [system.nm] INFO: State changed: IFACE_DOWN -> DISABLED
0000019265 [gsm0710muxer] INFO: Stopping GSM07.10 muxer
0000019265 [gsm0710muxer] INFO: Gracefully stopping GSM07.10 muxer
0000019266 [gsm0710muxer] INFO: Closing all muxed channels
0000019266 [gsm0710muxer] INFO: Closing mux channel 1
0000019267 [gsm0710muxer] INFO: Closing mux channel 2
0000019267 [gsm0710muxer] INFO: Muxed channel 3 already closed
0000019268 [gsm0710muxer] INFO: Muxed channel 4 already closed
0000019269 [gsm0710muxer] INFO: GSM07.10 muxer thread exiting
0000019270 [gsm0710muxer] INFO: GSM07.10 muxer stopped
*/