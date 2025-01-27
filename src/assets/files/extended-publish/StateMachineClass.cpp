// StateMachineClass.cpp

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

// System thread defaults to on in 6.2.0 and later and this line is not required
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED);
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);


class SensorPublish {
public:
    void loop();

    void readSensors(float &a, int &b);

protected:
    void start();
    void send();
    void waitSend();
    void waitCompletion();

    std::function<void(SensorPublish&)> stateHandler = &SensorPublish::start;
    std::chrono::milliseconds publishPeriod = 2min;
    unsigned long lastPublish = 0;
    unsigned long stateTime = 0;
    CloudEvent event;
    size_t dataSize = 64;
};
SensorPublish sensorPublish;

void SensorPublish::loop() {
    stateHandler(*this);
}

void SensorPublish::start() {
    if (Particle.connected() && ((lastPublish == 0) || (millis() - lastPublish >= publishPeriod.count()))) {
        lastPublish = millis();
        stateHandler = &SensorPublish::send;
        return;
    }

}
void SensorPublish::send() {

    char *data = new char[dataSize];
    if (!data) {
        Log.error("out of memory dataSize=%u", dataSize);
        stateHandler = &SensorPublish::start;
        return;
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

    Log.info("preparing to publish %s", obj.toJSON().c_str());

    stateTime = 0;
    waitSend();
}

void SensorPublish::waitSend() {

    if (stateTime != 0 && millis() - stateTime < 5000) {
        // Check if we can publish every 5 seconds when rate limited
        stateHandler = &SensorPublish::waitSend;
        return;
    }
    stateTime = millis();

    size_t eventDataSize = event.size();

    if (!CloudEvent::canPublish(eventDataSize)) {
        Log.info("deferring publish of %u bytes", eventDataSize);
        stateHandler = &SensorPublish::waitSend;
        return;
    }

    if (!Particle.publish(event)) {
        Log.error("published failed immediately, discarding");
        stateHandler = &SensorPublish::start;
        return;
    }

    stateHandler = &SensorPublish::waitCompletion;
}
    

void SensorPublish::waitCompletion() {
    if (event.isSent()) {
        Log.info("publish succeeded");
        stateHandler = &SensorPublish::start;
        return;
    }
    if (!event.isOk()) {
        Log.info("publish failed error=%d", event.error());
        stateHandler = &SensorPublish::start;
        return;
    }
}

void SensorPublish::readSensors(float &a, int &b) {
    a = ((float)rand()) / (float)INT_MAX;
    b = rand();
}


void setup() {
}

void loop() {
    sensorPublish.loop();    
}
