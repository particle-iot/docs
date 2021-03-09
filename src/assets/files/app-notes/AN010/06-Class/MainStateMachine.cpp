// Public domain (CC0) 
// Can be used in open or closed-source commercial projects and derivative works without attribution.

#include "MainStateMachine.h"


static Logger log("app.msm");


MainStateMachine::MainStateMachine() {

}

MainStateMachine::~MainStateMachine() {

}

void MainStateMachine::setup() {
    log.info("MainStateMachine::setup()");

    Cellular.on();
    Particle.connect();
    stateTime = millis();
    stateHandler = &MainStateMachine::stateWaitConnected;
}

void MainStateMachine::loop() {
    if (stateHandler) {
        stateHandler(*this);
    }
}

void MainStateMachine::stateWaitConnected() {
    // Wait for the connection to the Particle cloud to complete
    if (Particle.connected()) {
        log.info("connected to the cloud in %lu ms", millis() - stateTime);
        stateHandler = &MainStateMachine::statePublish; 
        stateTime = millis(); 
    }
    else
    if (millis() - stateTime >= connectMaxTime.count()) {
        // Took too long to connect, go to sleep
        log.info("failed to connect, going to sleep");
        stateHandler = &MainStateMachine::stateSleep;
    }
}

void MainStateMachine::statePublish() {
    // This is just a placeholder for code that you're write for your actual situation
    int a0 = analogRead(A0);

    // Create a simple JSON string with the value of A0
    snprintf(publishData, sizeof(publishData), "{\"a0\":%d}", a0);

    log.info("about to publish %s", publishData);

    publishFuture = Particle.publish("sensorTest", publishData, PRIVATE | WITH_ACK);
    stateHandler = &MainStateMachine::stateSleep;;
    stateTime = millis();
}


void MainStateMachine::statePublishWait() {
    // When checking the future, the isDone() indicates that the future has been resolved, 
    // basically this means that Particle.publish would have returned.
    if (publishFuture.isDone()) {
        // isSucceeded() is whether the publish succeeded or not, which is basically the
        // boolean return value from Particle.publish.
        if (publishFuture.isSucceeded()) {
            log.info("successfully published %s", publishData);
            stateHandler = &MainStateMachine::stateSleep;
        }
        else {
            log.info("failed to publish, will discard sample");
            stateHandler = &MainStateMachine::stateSleep;
        }
    }
    else 
    if (millis() - stateTime >= publishMaxTime.count()) {
        log.info("failed to publish, timed out, will discard sample");
        stateHandler = &MainStateMachine::stateSleep;
    }

}

void MainStateMachine::stateSleep() {
    log.info("going to sleep for %ld seconds", (long) sleepTime.count());

    // This is the equivalent to:
    // System.sleep(WKP, RISING, SLEEP_NETWORK_STANDBY);

    SystemSleepConfiguration config;
    config.mode(SystemSleepMode::STOP)
        .gpio(WKP, RISING)
        .duration(sleepTime)
        .network(NETWORK_INTERFACE_CELLULAR);

    SystemSleepResult result = System.sleep(config);

    log.info("woke from sleep");

    stateHandler = &MainStateMachine::stateWaitConnected;
    stateTime = millis();
}
