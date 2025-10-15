/*
 * Copyright (c) 2020 Particle Industries, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

// Library: MCP_CAN_RK
#include "mcp_can.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.can", LOG_LEVEL_INFO },
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

// Various OBD-II (CAN) constants
const uint8_t SERVICE_CURRENT_DATA = 0x01; // also known as mode 1

// These are the CAN IDs (11-bit) for OBD-II requests to the primary ECU 
// and the CAN ID for the response. 
const uint32_t OBD_CAN_REQUEST_ID      = 0x7DF;
const uint32_t OBD_CAN_REPLY_ID        = 0x7E8;

// Note: SAE PID codes are 8 bits. Proprietary ones are 16 bits.
const uint8_t PID_ENGINE_RPM          = 0x0C;
const uint8_t PID_VEHICLE_SPEED       = 0x0D;

// This is the request we make by OBD-II. It's always the same and requests the engine RPM.
byte obdRequest[8] = {0x02, SERVICE_CURRENT_DATA, PID_ENGINE_RPM, 0xcc, 0xcc, 0xcc, 0xcc, 0xcc};

// How often to request the data by CAN in milliseconds
unsigned long requestLastMillis = 0;
const unsigned long requestPeriod = 100; // in milliseconds (10 times per second)

// Various engine stats that we maintain
int lastRPM = 0;
int numSamples = 0;
int offSamples = 0;
int idleSamples = 0;
int nonIdleSamples = 0;
int nonIdleSum = 0;
int nonIdleMin = 0;
int nonIdleMax = 0;

// We log to debug serial more frequently than publishing, but not at every request since that
// will generate too much data.
unsigned long lastEngineLog = 0;
const unsigned long engineLogPeriod = 2000; // How often to log to Logger (debug serial), 0 = disable

// When cloud connected and lastRPM > idleRPM, publish location more frequently,
// based on fastPubishPeriod if non-zero. These variables are cloud synchronized.
unsigned long lastFastPublish = 0;

// Configuration settings, synchronized with the cloud
int fastPublishPeriod = 0;
int idleRPM = 1600;

// Object for the CAN library. Note: The Tracker SoM has the CAN chip connected to SPI1 not SPI!
MCP_CAN canInterface(CAN_CS, SPI1);   

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    // Uncomment to make it easier to see the serial logs at startup
    // waitFor(Serial.isConnected, 15000);
    // delay(1000);

    // Initialize tracker stuff
    Tracker::instance().init();

    // Callback to add key press information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Set up configuration settings
    static ConfigObject engineDesc("engine", {
        ConfigInt("idle", &idleRPM, 0, 10000),
        ConfigInt("fastpub", &fastPublishPeriod, 0, 3600000),
    });
    Tracker::instance().configService.registerModule(engineDesc);

    Log.info("idleRPM=%d fastPublishPeriod=%d", idleRPM, fastPublishPeriod);

    // Turn on CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);

    // Set STBY low to enable transmitter and high-speed receiver
    pinMode(CAN_STBY, OUTPUT);
    digitalWrite(CAN_STBY, LOW);

    // Enable the CAN interrupt pin as an input just in case
    pinMode(CAN_INT, INPUT);

    // Hardware reset the CAN controller. Not really necessary, but doesn't hurt.
    pinMode(CAN_RST, OUTPUT);
    digitalWrite(CAN_RST, LOW);
    delay(100);
    digitalWrite(CAN_RST, HIGH);

    // Most vehicles use 500 kbit/sec for OBD-II 
    // Make sure the last parameter is MCP_20MHZ; this is dependent on the crystal
    // connected to the CAN chip and it's 20 MHz on the Tracker SoM.
    byte status = canInterface.begin(MCP_SIDL, CAN_500KBPS, MCP_20MHZ);
    if(status == CAN_OK) {
        Log.info("CAN initialization succeeded");
    }
    else {
        Log.error("CAN initialization failed %d", status);
    }

    // Change to normal mode to allow messages to be transmitted. If you don't do this,
    // the CAN chip will be in loopback mode.
    canInterface.setMode(MCP_MODE_NORMAL);   

    // Connect to the cloud!
    Particle.connect();
}

void loop()
{
    // Must call this on every loop
    Tracker::instance().loop();

    // Handle received CAN data
    if (!digitalRead(CAN_INT)) {
        long unsigned int rxId;
        unsigned char len = 0;
        unsigned char rxBuf[8];

        canInterface.readMsgBufID(&rxId, &len, rxBuf);      // Read data: len = data length, buf = data byte(s)
        
        if ((rxId & 0x80000000) == 0x00000000) {
            // Standard frame 

            // Log.info("%.3lx: %02x %02x %02x %02x %02x %02x ", rxId, rxBuf[0], rxBuf[1], rxBuf[2], rxBuf[3], rxBuf[4],rxBuf[5]  );            
            if (rxId == OBD_CAN_REPLY_ID && rxBuf[0] == 0x04 && rxBuf[1] == 0x41 && rxBuf[2] == PID_ENGINE_RPM) {
                lastRPM = (rxBuf[3] << 8) | rxBuf[4];
                lastRPM /= 4;

                // Log.info("rpm=%d", lastRPM);

                // We don't process the RPM here, it's done below (with an explanation why)
            }
        }

    }


    if (millis() - requestLastMillis >= requestPeriod) {
        requestLastMillis = millis();
        
        // Log the last RPM information. We do this here because it simplifies the logic
        // for when the send failed (vehicle off)
        numSamples++;
        if (lastRPM == 0) {
            // Engine was off or send failed
            offSamples++;
        }
        else
        if (lastRPM < idleRPM) {
            // The engine is idling, store that as a separate counter
            idleSamples++;
        }
        else {
            // Engine was faster than idle. Note the min, max, and mean.
            nonIdleSamples++;
            nonIdleSum += lastRPM;

            if (lastRPM < nonIdleMin || nonIdleMin == 0) {
                nonIdleMin = lastRPM;
            }
            if (lastRPM > nonIdleMax) {
                nonIdleMax = lastRPM;
            }
        }


        // Clear lastRPM so if the transmission fails we can record it as off on the
        // next check
        lastRPM = 0;

        // This flag prevents the error log from overflowing from thousands of error
        // messages when the vehicle is off
        static bool errorFlag = false;

        // Send a request for engine RPM via OBD-II (CAN)
        byte sndStat = canInterface.sendMsgBuf(OBD_CAN_REQUEST_ID, 0, 8, obdRequest);
        if(sndStat == CAN_OK) {
            errorFlag = false;
        }
        else {
            if (!errorFlag) {
                Log.error("Error Sending Message %d", sndStat);
                errorFlag = true;
            }
        }

    }

    // Print engine info to the serial log to help with debugging
    if (engineLogPeriod != 0 && millis() - lastEngineLog >= engineLogPeriod) {
        lastEngineLog = millis();

        int nonIdleMean = nonIdleSamples ? (nonIdleSum / nonIdleSamples) : 0;

        Log.info("engineOff=%d engineIdle=%d engineNonIdle=%d engineMin=%d engineMean=%d engine<Max=%d",
            (int)(offSamples * requestPeriod / 1000),
            (int)(idleSamples * requestPeriod / 1000),
            (int)(nonIdleSamples * requestPeriod / 1000),
            nonIdleMin, nonIdleMean, nonIdleMax
        );
    }

    // idleRPM is a setting configured from the cloud side 
    if (Particle.connected() && lastRPM >= idleRPM) {
        // If connected to the cloud and not off or at idle speed, we may want to speed up
        // publishing. This is done by settings engine.fastpub (integer) to a non-zero
        // value, the number of milliseconds between publishes. 
        if (fastPublishPeriod > 0 && millis() - lastFastPublish >= (unsigned long) fastPublishPeriod) {
            lastFastPublish = millis();

            Log.info("manual publish lastRPM=%d idleRPM=%d period=%d", lastRPM, idleRPM, fastPublishPeriod);
            Tracker::instance().location.triggerLocPub();
        }
    }

}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    int nonIdleMean = nonIdleSamples ? (nonIdleSum / nonIdleSamples) : 0;
  
    // Add our engine stats to the location event

    writer.name("engineOff").value((int)(offSamples * requestPeriod / 1000));
    writer.name("engineIdle").value((int)(idleSamples * requestPeriod / 1000));
    writer.name("engineNonIdle").value((int)(nonIdleSamples * requestPeriod / 1000));
    writer.name("engineMin").value(nonIdleMin);
    writer.name("engineMean").value(nonIdleMean);
    writer.name("engineMax").value(nonIdleMax);

    numSamples = 0;
    offSamples = 0;
    idleSamples = 0;
    nonIdleSamples = 0;
    nonIdleSum = 0;
    nonIdleMin = 0;
    nonIdleMax = 0;
}

