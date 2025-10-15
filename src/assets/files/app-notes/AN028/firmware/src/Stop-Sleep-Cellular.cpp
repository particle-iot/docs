// Stop mode sleep (pin + time) with SLEEP_NETWORK_STANDBY Cellular Example
// This example is best with short sleep times, under 15 minutes or if you want to be able
// to publish very quickly after waking up.
// It also shows how to handle firmware updates in this mode.

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
// for your product
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

// How often to publish device diagnostics (vitals). If you set this 
// equal to the sleep period they'll be sent on every connection, or you can set
// it higher to save data. For example, if you set it to 24 * 60 * 60 it would
// only publish once per day. 
const std::chrono::seconds diagnosticPublishTime = 10min;

// How often to check for firmware updates. This requires disconnecting
// from the cloud and reconnecting, so you don't want to do it too often. For 
// non-product firmware you might want to set this to 0 (never check).
const std::chrono::seconds firmwareUpdateCheckTime = 30min;


// These are the states in the finite state machine, handled in loop()
enum State {
    STATE_WAIT_CONNECTED = 0,
    STATE_READ_SENSOR,
    STATE_PUBLISH,
    STATE_PUBLISH_WAIT,
    STATE_SLEEP,
    STATE_DISCONNECT_WAIT,
    STATE_CONNECT_WAIT,
    STATE_CLOUD_WAIT,
    STATE_FIRMWARE_UPDATE,
};
State state = STATE_WAIT_CONNECTED;
unsigned long stateTime;
bool firmwareUpdateInProgress = false;
long lastFirmwareUpdateCheck = 0;
long lastDiagnosticsPublish = 0;
char publishData[256];
particle::Future<bool> publishFuture;

void firmwareUpdateHandler(system_event_t event, int param); // forward declaration

void setup() {
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
            // Wait for the connection to the Particle cloud to complete (at boot)
 
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms", millis() - stateTime);
                state = STATE_READ_SENSOR; 
                stateTime = millis(); 
            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                // Took too long to connect, go to sleep
                Log.info("failed to connect, going to sleep");
                state = STATE_SLEEP;
            }
            break;

        case STATE_READ_SENSOR:
            {
                // This is just a placeholder for code that you're write for your actual situation
                int a0 = analogRead(A0);

                // Create a simple JSON string with the value of A0
                snprintf(publishData, sizeof(publishData), "{\"a0\":%d}", a0);
            }

            state = STATE_PUBLISH;
            stateTime = millis();
            break;

        case STATE_PUBLISH:
            if (Particle.connected()) {
                // In this example, we use a Future. The publishFuture is a global variable declared:
                // particle::Future<bool> publishFuture;
                // The important difference is that even though we use the WITH_ACK flag, this does
                // not block! We return immediately and can check the result later. This is important
                // because otherwise the publish can end up blocking longer than our timeout and
                // we would never go to sleep on failure.                
                publishFuture = Particle.publish("sensorTest", publishData, PRIVATE | WITH_ACK);
                state = STATE_PUBLISH_WAIT;
                stateTime = millis();

            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                Log.info("failed to connect, going to sleep and discarding sample");
                state = STATE_SLEEP;
            }
            break;

        case STATE_PUBLISH_WAIT:
            // When checking the future, the isDone() indicates that the future has been resolved, 
            // basically this means that Particle.publish would have returned.
            if (publishFuture.isDone()) {
                // isSucceeded() is whether the publish succeeded or not, which is basically the
                // boolean return value from Particle.publish.
                if (publishFuture.isSucceeded()) {
                    Log.info("successfully published %s", publishData);
                    state = STATE_SLEEP;
                }
                else {
                    Log.info("failed to publish, will discard sample");
                    state = STATE_SLEEP;
                }
            }
            else 
            if (millis() - stateTime >= publishMaxTime.count()) {
                Log.info("failed to publish, timed out, will discard sample");
                state = STATE_SLEEP;
            }
            break;

        case STATE_SLEEP:
            if (Time.isValid() && Particle.connected()) {
                // If we fail to connect and timeout we can get into this state. However,
                // these two checks only work
                if (lastFirmwareUpdateCheck && firmwareUpdateCheckTime.count() && 
                    Time.now() > (lastFirmwareUpdateCheck + firmwareUpdateCheckTime.count())) {
                    // Do a firmware update check
                    Log.info("starting firmware update check");
                    Particle.disconnect();
                    state = STATE_DISCONNECT_WAIT;
                    break;
                }
                if (lastDiagnosticsPublish && diagnosticPublishTime.count() && 
                    Time.now() > (lastDiagnosticsPublish + diagnosticPublishTime.count())) {
                    Log.info("publishing device vitals");
                    Particle.publishVitals(0);
                    lastDiagnosticsPublish = Time.now();
                }
            }
            {
                SystemSleepConfiguration config;
                config.mode(SystemSleepMode::STOP)
                    .duration(sleepTime)
                    .network(NETWORK_INTERFACE_CELLULAR, SystemSleepNetworkFlag::INACTIVE_STANDBY);
                SystemSleepResult result = System.sleep(config);
            }

            Log.info("woke from sleep");

            // Publish after waking up           
            state = STATE_READ_SENSOR;
            stateTime = millis();
            break; 

        case STATE_DISCONNECT_WAIT:
            // In order to check for a software update we have to disconnect from the Particle
            // cloud, then reconnect. The disconnect is done in STATE_SLEEP if it's time to check
            // for an update. Note that this only disconnects from the cloud, not cellular,
            // so it only takes a few seconds and not much data (just a session resume).
            // 
            // In this state, we wait until disconnected, then reconnect and go into STATE_CONNECT_WAIT.
            if (!Particle.connected()) {
                Log.info("reconnecting to the cloud");
                Particle.connect();
                state = STATE_CONNECT_WAIT;
                stateTime = millis(); 
            }
            break;

        case STATE_CONNECT_WAIT:
            // Wait for the connection to the Particle cloud to complete
            if (Particle.connected()) {
                Log.info("connected to the cloud in %lu ms, checking for updates", millis() - stateTime);
                state = STATE_CLOUD_WAIT; 
                stateTime = millis(); 

                // Note: Updates both times because connecting to the cloud will also send diagnostic data
                lastFirmwareUpdateCheck = lastDiagnosticsPublish = Time.now();
            }
            else
            if (millis() - stateTime >= connectMaxTime.count()) {
                // Took too long to connect, go to sleep
                Log.info("failed to connect, going to sleep");
                state = STATE_SLEEP;
            }
            break;

        case STATE_CLOUD_WAIT:
            // firmwareUpdateInProgress is set from the system event handler function firmwareUpdateHandler.
            // With system thread enabled, updates are downloaded in the background while user firmware
            // continues to run, so we need to make sure we don't go to sleep while downloading.
            if (firmwareUpdateInProgress) {
                Log.info("firmware update detected");
                state = STATE_FIRMWARE_UPDATE;
                stateTime = millis();
            }
            else
            if (millis() - stateTime >= cloudMinTime.count()) {
                Log.info("no update detected, going to sleep");
                state = STATE_SLEEP;
            }
            break;

        case STATE_FIRMWARE_UPDATE:
            // An update is in progress. Stay awake until complete or a timeout occurs.
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

    if (lastFirmwareUpdateCheck == 0 && Time.isValid()) {
        lastFirmwareUpdateCheck = Time.now();
    }
    if (lastDiagnosticsPublish == 0 && Time.isValid()) {
        lastDiagnosticsPublish = Time.now();
    }

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
