#include "Particle.h"

#include "DeviceInfoLedger.h"

SYSTEM_MODE(SEMI_AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

retained uint8_t retainedLogs[2048];


void setup() {
    // The next line is for debugging and waits for USB serial debug to connect for 10 seconds so you can see more early log messages
    // waitFor(Serial.isConnected, 10000);

    // This sets up remote configuration
    DeviceConfigLedger::instance()
        .withConfigDefaultLedgerName("device-info-defaults")
        .withConfigDeviceLedgerName("device-info-config")
        .setup();

    // This sets up the device information in ledger
    DeviceInfoLedger::instance()
        .withInfoLedgerName("device-info")
        .withRetainedBuffer(retainedLogs, sizeof(retainedLogs))
        .setup(); 

    // Using SYSTEM_MODE(SEMI_AUTOMATIC) and calling Particle.connect() after calling setup() for DeviceInfoLedger
    // is recommended to avoid getting new connection information in the last run log.
    Particle.connect();

}

void loop() {
    DeviceInfoLedger::instance().loop();
}