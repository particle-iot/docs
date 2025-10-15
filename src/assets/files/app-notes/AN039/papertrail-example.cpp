#include "RemoteLogRK.h"
#include "DeviceNameHelperRK.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

// Temporary log storage in retained memory
retained uint8_t remoteLogBuf[2560];
RemoteLog remoteLog(remoteLogBuf, sizeof(remoteLogBuf));

// Make sure you update to the host and port of your Papertrail logging instance!
// Actually could be any UDP syslog server, not just Solarwinds Papertrail.
const char *LOG_HOST = "logsXXX.papertrailapp.com";
const uint16_t LOG_PORT = 39999;

// Where to store the device name in EEPROM
const int EEPROM_OFFSET = 0;

SerialLogHandler serialLog;

void setup() {
    // For testing, you can wait for the serial port to be connected so you see 
    // more log messages on USB serial
    // waitFor(Serial.isConnected, 10000);

    // This example uses DeviceNameHelperEEPROM but any subclass can be used
    DeviceNameHelperEEPROM::instance().setup(EEPROM_OFFSET);

    // Create a new remote log syslog over UDP logging server for Papertrail.
    RemoteLogSyslogUDP *logServer = new RemoteLogSyslogUDP(LOG_HOST, LOG_PORT);

    // Since neither RemoteLogRK nor DeviceNameHelperRK libraries know about each 
    // other, this bit of boilerplate code is needed to hook the two together. 
    // You can use any DeviceNameHelper subclass, such as DeviceNameHelperFile
    // or DeviceNameHelperRetained here instead.
    logServer->withDeviceNameCallback([](String &deviceName) {
        if (DeviceNameHelperEEPROM::instance().hasName()) {
            deviceName = DeviceNameHelperEEPROM::instance().getName();
            return true;
        }
        else {
            return false;
        }
    });

    // Finish setting up remoteLog   
    remoteLog.withServer(logServer);
    remoteLog.setup();
}

void loop() {
    DeviceNameHelperRetained::instance().loop();
    remoteLog.loop();

    // This just generates some logs for testing purposes
    {
        static unsigned long lastLog = 0;
        static int counter = 0;

        if (millis() - lastLog >= 10000) {
            lastLog = millis();
            Log.info("counter=%d memory=%lu", ++counter, System.freeMemory());
        }
    }
}
