#ifndef __MAINSTATEMACHINE_H
#define __MAINSTATEMACHINE_H

// Public domain (CC0) 
// Can be used in open or closed-source commercial projects and derivative works without attribution.

#include "Particle.h"

class MainStateMachine {
public:
    MainStateMachine();
    virtual ~MainStateMachine();

    void setup();
    void loop();

    MainStateMachine &withConnectMaxTime(std::chrono::milliseconds connectMaxTime) { this->connectMaxTime = connectMaxTime; return *this;};

    MainStateMachine &withSleepTime(std::chrono::seconds sleepTime) { this->sleepTime = sleepTime; return *this;};

    MainStateMachine &withPublishMaxTime(std::chrono::milliseconds publishMaxTime) { this->publishMaxTime = publishMaxTime; return *this;};

protected:
    void stateWaitConnected();
    void statePublish();
    void statePublishWait();
    void stateSleep();

    unsigned long stateTime;
    
	std::function<void(MainStateMachine&)> stateHandler = 0;

    // The publishFuture is used to find out when the publish completes, asynchronously
    particle::Future<bool> publishFuture;

    // A buffer to hold the JSON data we publish.
    char publishData[256];

    // This is the maximum amount of time to wait for the cloud to be connected in
    // milliseconds. This should be at least 5 minutes. If you set this limit shorter,
    // on Gen 2 devices the modem may not get power cycled which may help with reconnection.
    std::chrono::milliseconds connectMaxTime = 6min;

    // How long to sleep
    std::chrono::seconds sleepTime = 1min;

    // Maximum time to wait for publish to complete. It normally takes 20 seconds for Particle.publish
    // to succeed or time out, but if cellular needs to reconnect, it could take longer, typically
    // 80 seconds. This timeout should be longer than that and is just a safety net in case something
    // goes wrong.
    std::chrono::milliseconds publishMaxTime = 3min;
};

#endif /* __MAINSTATEMACHINE_H */
