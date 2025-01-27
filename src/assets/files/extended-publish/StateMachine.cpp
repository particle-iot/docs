// StateMachine.cpp

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

// System thread defaults to on in 6.2.0 and later and this line is not required
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED);
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const std::chrono::milliseconds publishPeriod = 2min;
unsigned long lastPublish;
CloudEvent event;
const size_t dataSize = 64;

enum class State {
    START,
    SEND,
    WAIT_COMPLETION,
};
State state = State::START;

void readSensors(float &a, int &b);
bool publishSensors();

void setup() {
}

void loop() {
    switch(state) {
        case State::START:
            if (Particle.connected() && ((lastPublish == 0) || (millis() - lastPublish >= publishPeriod.count()))) {
                lastPublish = millis();
                state = State::SEND;
            }
            break;

        case State::SEND:
            state = State::START;            
            if (publishSensors()) {
                state = State::WAIT_COMPLETION;
            }
            break;

        case State::WAIT_COMPLETION:
            if (event.isSent()) {
                Log.info("publish succeeded");
                state = State::START;            
            }
            else 
            if (!event.isOk()) {
                Log.info("publish failed error=%d", event.error());
                state = State::START;            
            }
            break;        
    }
    
}

void readSensors(float &a, int &b) {
    a = ((float)rand()) / (float)INT_MAX;
    b = rand();
}


bool publishSensors() {
    
    char *data = new char[dataSize];
    if (!data) {
        Log.error("out of memory dataSize=%u", dataSize);
        return false;
    }

    for(size_t ii = 0; ii < dataSize; ii++) {
        data[ii] = (char) rand();
    }

    float a;
    int b;
    readSensors(a, b);

    Variant obj;
    obj.set("a", a);
    obj.set("b", b);
    obj.set("c", Buffer(data, dataSize));

    event.name("publish-test");
    event.data(obj);
    delete[] data;

    Log.info("publishing %s", obj.toJSON().c_str());

    return Particle.publish(event);
}

