// 02 Linear - Not using a state machine

// Public domain (CC0) 
// Can be used in open or closed-source commercial projects and derivative works without attribution.

#include "Particle.h"

// This example uses threading enabled and SEMI_AUTOMATIC mode
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

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

// How long to sleep
const std::chrono::seconds sleepTime = 1min;

// Maximum time to wait for publish to complete. It normally takes 20 seconds for Particle.publish
// to succeed or time out, but if cellular needs to reconnect, it could take longer, typically
// 80 seconds. This timeout should be longer than that and is just a safety net in case something
// goes wrong.
const std::chrono::milliseconds publishMaxTime = 3min;

// The publishFuture is used to find out when the publish completes, asynchronously
particle::Future<bool> publishFuture;

// A buffer to hold the JSON data we publish.
char publishData[256];

void setup() {
    Cellular.on();
    Particle.connect();
}

void loop() {
    unsigned long startTime = millis();

    // Wait until connected, or timed out
    while(!Particle.connected() && ((millis() - startTime) < connectMaxTime.count())) {
        delay(1);
    }

    if (Particle.connected()) {
        Log.info("connected to the cloud in %lu ms", millis() - startTime);

        // This is just a placeholder for code that you're write for your actual situation
        int a0 = analogRead(A0);

        // Create a simple JSON string with the value of A0
        snprintf(publishData, sizeof(publishData), "{\"a0\":%d}", a0);
        
        unsigned long publishStartTime = millis();

        Log.info("about to publish %s", publishData);
        
        publishFuture = Particle.publish("sensorTest", publishData, PRIVATE | WITH_ACK);
        while(!publishFuture.isDone() && ((millis() - publishStartTime) < publishMaxTime.count())) {
            delay(1);
        }

        if (publishFuture.isDone()) {
            // isSucceeded() is whether the publish succeeded or not, which is basically the
            // boolean return value from Particle.publish.
            if (publishFuture.isSucceeded()) {
                Log.info("successfully published %s", publishData);
            }
            else {
                Log.info("failed to publish, will discard sample");
            }
        }
        else {
            Log.info("failed to publish, timed out, will discard sample");
        }
    }

    Log.info("going to sleep for %ld seconds", (long) sleepTime.count());

    // This is the equivalent to:
    // System.sleep(WKP, RISING, SLEEP_NETWORK_STANDBY);

    SystemSleepConfiguration config;
    config.mode(SystemSleepMode::STOP)
        .gpio(WKP, RISING)
        .duration(sleepTime)
        .network(NETWORK_INTERFACE_CELLULAR);

    SystemSleepResult result = System.sleep(config);

    Log.info("woke from sleep");

}

