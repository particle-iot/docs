// Wake Publish Sleep Cellular Example

// Public domain (CC0) 
// Can be used in open or closed-source commercial projects and derivative works without attribution.

// Tested with Device OS 1.4.4
// - Electron U260
// - Boron LTE

#include "Particle.h"

// This example uses threading enabled and SEMI_AUTOMATIC mode
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

// If you are using a product, uncomment these lines and set the correct product ID and version
// for your product. 
// #ifndef SYSTEM_VERSION_v400ALPHA1
// PRODUCT_ID(8761);
// #endif
// PRODUCT_VERSION(4);

// Using Serial1 (RX/TX) for debugging logs and an external TTL serial to USB (FT232) converter
// is useful when testing sleep modes. Sleep causes USB serial to disconnect, and you will often
// lose the debug logs immediately after wake. With an external USB serial converter, your
// serial terminal stays connected so you get all log messages. If you don't have one, you can
// comment out the Serial1LogHandler and uncomment the SerialLogHandler to use USB.
Serial1LogHandler logHandler(115200);
// SerialLogHandler logHandler;

// This is the maximum amount of time to wait for the cloud to be connected in
// milliseconds. This should be at least 5 minutes. If you set this limit shorter,
// on Gen 2 devices the modem may not get power cycled which may help with reconnection.
const std::chrono::milliseconds connectMaxTime = 6min;

// This is the minimum amount of time to stay connected to the cloud. You can set this
// to zero and the device will sleep as fast as possible, however you may not get 
// firmware updates and device diagnostics won't go out all of the time. Setting this
// to 10 seconds is typically a good value to use for getting updates.
const std::chrono::milliseconds cloudMinTime = 10s;

// How long to sleep
const std::chrono::seconds sleepTime = 1min;

// Maximum time to wait for publish to complete. It normally takes 20 seconds for Particle.publish
// to succeed or time out, but if cellular needs to reconnect, it could take longer, typically
// 80 seconds. This timeout should be longer than that and is just a safety net in case something
// goes wrong.
const std::chrono::milliseconds publishMaxTime = 3min;

// Maximum amount of time to wait for a user firmware download in milliseconds
// before giving up and just going back to sleep
const std::chrono::milliseconds firmwareUpdateMaxTime = 5min;

// These are the states in the finite state machine, handled in loop()
enum State {
    STATE_WAIT_CONNECTED = 0,
    STATE_PUBLISH,
    STATE_PRE_SLEEP,
    STATE_SLEEP,
    STATE_FIRMWARE_UPDATE
};
State state = STATE_WAIT_CONNECTED;
unsigned long stateTime;
bool firmwareUpdateInProgress = false;

void readSensorAndPublish(); // forward declaration
void firmwareUpdateHandler(system_event_t event, int param); // forward declaration

void setup() {
    /*
    FuelGauge fuel;
    if (fuel.getSoC() < 15) {
        // If battery is too low, don't try to connect to cellular, just go back into
        // sleep mode.
        Log.info("low battery, going to sleep immediately");
        state = STATE_SLEEP;
        return;
    }
    */

    System.on(firmware_update, firmwareUpdateHandler);

    // It's only necessary to turn cellular on and connect to the cloud. Stepping up
    // one layer at a time with Cellular.connect() and wait for Cellular.ready() can
    // be done but there's little advantage to doing so.
    Cellular.on();
    Particle.connect();
    stateTime = millis();
}

void loop() {
    switch(state) {
        case STATE_WAIT_CONNECTED:
            // Wait for the connection to the Particle cloud to complete
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms", millis() - stateTime);
                state = STATE_PUBLISH; 
                stateTime = millis(); 
            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                // Took too long to connect, go to sleep
                Log.info("failed to connect, going to sleep");
                state = STATE_SLEEP;
            }
            break;

        case STATE_PUBLISH:
            readSensorAndPublish();

            if (millis() - stateTime < cloudMinTime.count()) {
                Log.info("waiting %lu ms before sleeping", cloudMinTime.count() - (millis() - stateTime));
                state = STATE_PRE_SLEEP;
            }
            else {
                state = STATE_SLEEP;
            }
            break;

        case STATE_PRE_SLEEP:
            // This delay is used to make sure firmware updates can start and diagnostics go out
            // It can be eliminated by setting cloudMinTime to 0 and sleep will occur as quickly
            // as possible. 
            if (millis() - stateTime >= cloudMinTime.count()) {
                state = STATE_SLEEP;
            }
            break;

        case STATE_SLEEP:
            if (firmwareUpdateInProgress) {
                Log.info("firmware update detected");
                state = STATE_FIRMWARE_UPDATE;
                stateTime = millis();
                break;
            }

            Log.info("going to sleep for %ld seconds", (long) sleepTime.count());
            
#if HAL_PLATFORM_NRF52840
            // Gen 3 (nRF52840) does not suppport SLEEP_MODE_DEEP with a time in seconds
            // to wake up. This code uses stop mode sleep instead. 
            System.sleep(WKP, RISING, sleepTime);
            System.reset();
#else
            System.sleep(SLEEP_MODE_DEEP, sleepTime);
            // This is never reached; when the device wakes from sleep it will start over 
            // with setup()
#endif
            break; 

        case STATE_FIRMWARE_UPDATE:
            if (!firmwareUpdateInProgress) {
                Log.info("firmware update completed");
                state = STATE_SLEEP;
            }
            else
            if (millis() - stateTime >= firmwareUpdateMaxTime.count()) {
                Log.info("firmware update timed out");
                state = STATE_SLEEP;
            }
            break;
    }
}

void readSensorAndPublish() {
    // This is just a placeholder for code that you're write for your actual situation
    int a0 = analogRead(A0);

    // Create a simple JSON string with the value of A0
    char buf[256];
    snprintf(buf, sizeof(buf), "{\"a0\":%d}", a0);

    bool result = Particle.publish("sensorTest", buf, PRIVATE | WITH_ACK);

    Log.info("published %s (result=%d)", buf, result);
}

void firmwareUpdateHandler(system_event_t event, int param) {
    switch(param) {
        case firmware_update_begin:
            firmwareUpdateInProgress = true;
            break;

        case firmware_update_complete:
        case (int)firmware_update_failed:
            firmwareUpdateInProgress = false;
            break;
    }
}
