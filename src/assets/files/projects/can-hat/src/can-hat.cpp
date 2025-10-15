#include "Particle.h"

#include "mcp_can.h"

SYSTEM_MODE(AUTOMATIC);
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO); // LOG_LEVEL_TRACE

// Generic setup for CAN controller hat on Muon
// A6 = Expansion connector pin 24, GPIO8 (CE0)
const pin_t CAN_CS_PIN = A6;

// Interrupt is optional. This board has it connected to expansion connector pin 22 (GPIO25).
// This maps to Muon pin D22. If not used, set to PIN_INVALID which will cause the
// MCP2515 to be polled.
const pin_t CAN_INT_PIN = D22; // Can also be PIN_INVALID

const byte CAN_SPEED = CAN_500KBPS;
const byte CAN_CLOCK = MCP_12MHz;

MCP_CAN canInterface(CAN_CS_PIN);

// Constants for the engine speed demo
// Various OBD-II (CAN) constants
const uint8_t SERVICE_CURRENT_DATA = 0x01; // also known as mode 1

// These are the CAN IDs (11-bit) for OBD-II requests to the primary ECU
// and the CAN ID for the response.
const uint32_t OBD_CAN_REQUEST_ID = 0x7DF;
const uint32_t OBD_CAN_REPLY_ID = 0x7E8;

// Note: SAE PID codes are 8 bits. Proprietary ones are 16 bits.
const uint8_t PID_ENGINE_RPM = 0x0C;
const uint8_t PID_VEHICLE_SPEED = 0x0D;

// This is the request we make by OBD-II. It's always the same and requests the engine RPM.
byte obdRequest[8] = {0x02, SERVICE_CURRENT_DATA, PID_ENGINE_RPM, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc};

// How often to request the data by CAN
unsigned long requestLastMillis = 0;
const std::chrono::milliseconds requestPeriod = 100ms; // in milliseconds (10 times per second)

// How often to log to serial debug log
unsigned long lastEngineLog = 0;
const std::chrono::milliseconds engineLogPeriod = 2s; // How often to log to Logger (debug serial), 0 = disable

int lastRPM = 0;

void setup()
{
    // This does not need to be set every time as it's saved in configuration flash,
    // however it's included here in case your Muon does not have it set, as the
    // expansion hat interface is power powered unless 3V3_AUX is enabled.

    // Also note: if this is the first time this has been set, you will need
    // to reboot again for the power to be enabled!
    // If you get this error there's either a problem with your CAN board,
    // or the power wasn't enabled.
    // 0000004881 [mcp_can] INFO: Entering Configuration Mode Failure...
    // 0000004914 [app] ERROR: CAN begin failed

    SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
    powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
    System.setPowerConfiguration(powerConfig);

    // To see log messages at early initialization, uncomment this
    waitFor(Serial.isConnected, 10000);
    delay(2000);

    if (canInterface.begin(MCP_RX_ANY, CAN_SPEED, CAN_CLOCK) != CAN_OK)
    {
        Log.error("CAN begin failed");
    }

    // Set NORMAL mode
    if (canInterface.setMode(MCP_MODE_NORMAL) != MCP2515_OK)
    {
        Log.error("CAN setMode failed");
    }

    if (CAN_INT_PIN != PIN_INVALID)
    {
        pinMode(CAN_INT_PIN, INPUT);
    }

    byte status = canInterface.getCANStatus();
    Log.info("CAN status %d", (int)status);
}

void loop()
{

    if (CAN_INT_PIN == PIN_INVALID || !digitalRead(CAN_INT_PIN))
    {
        long unsigned int rxId;
        unsigned char len = 0;
        unsigned char rxBuf[8];

        byte res = canInterface.readMsgBufID(&rxId, &len, rxBuf); // Read data: len = data length, buf = data byte(s)
        if (res == CAN_OK)
        {
            // If running without interrupts, res will be CAN_NOMSG if there is no message
            lastRPM = 0;

            if ((rxId & 0x80000000) == 0x00000000)
            {
                // Standard frame

                // Log.info("%.3lx: %02x %02x %02x %02x %02x %02x ", rxId, rxBuf[0], rxBuf[1], rxBuf[2], rxBuf[3], rxBuf[4],rxBuf[5]  );
                if (rxId == OBD_CAN_REPLY_ID && rxBuf[0] == 0x04 && rxBuf[1] == 0x41 && rxBuf[2] == PID_ENGINE_RPM)
                {
                    lastRPM = (rxBuf[3] << 8) | rxBuf[4];
                    lastRPM /= 4;

                    // Log.info("rpm=%d", lastRPM);

                    // We don't process the RPM here, it's done below (with an explanation why)
                }
            }
        }
    }

    // Print engine info to the serial log to help with debugging
    if (engineLogPeriod.count() > 0 && millis() - lastEngineLog >= engineLogPeriod.count())
    {
        lastEngineLog = millis();

        Log.info("engineRPM %d", lastRPM);
    }

    if (millis() - requestLastMillis >= requestPeriod.count())
    {
        requestLastMillis = millis();

        // This flag prevents the error log from overflowing from thousands of error
        // messages when the vehicle is off
        static bool errorFlag = false;

        // Send a request for engine RPM via OBD-II (CAN)
        byte sndStat = canInterface.sendMsgBuf(OBD_CAN_REQUEST_ID, 0, 8, obdRequest);
        if (sndStat == CAN_OK)
        {
            errorFlag = false;
        }
        else
        {
            // Clear lastRPM so if the transmission fails we can record it as off on the next check
            lastRPM = 0;

            if (!errorFlag)
            {
                Log.error("Error sending message %d", sndStat);
                errorFlag = true;
            }
        }
    }
}
