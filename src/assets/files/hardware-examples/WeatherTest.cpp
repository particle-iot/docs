#include "Particle.h"

SerialLogHandler logHandler;

void subscriptionHandler(const char *event, const char *data);

SYSTEM_THREAD(ENABLED);

const char *EVENT_NAME = "GetWeatherData";

enum {
    STATE_WAIT_FOR_CONNECTED,
    STATE_WAIT_TO_PUBLISH,
    STATE_IDLE
};
int state = STATE_WAIT_FOR_CONNECTED;
unsigned long stateTime;

void setup() {
    // {{{PARTICLE_DEVICE_ID}}}/{{{PARTICLE_EVENT_NAME}}}
    String subscriptionName = String::format("%s/%s/", System.deviceID().c_str(), EVENT_NAME);
    Particle.subscribe(subscriptionName, subscriptionHandler, MY_DEVICES);
    Log.info("subscribing to %s", subscriptionName.c_str());

}

void loop() {
    switch(state) {
        case STATE_WAIT_FOR_CONNECTED:
            if (Particle.connected()) {
                state = STATE_WAIT_TO_PUBLISH;
                stateTime = millis();
            }
            break;

        case STATE_WAIT_TO_PUBLISH:
            if (millis() - stateTime >= 5000) {
                Particle.publish(EVENT_NAME, "", PRIVATE);
                state = STATE_IDLE;
            }
            break;

        case STATE_IDLE:
            break;
    }
}


void subscriptionHandler(const char *event, const char *data) {
    JSONValue outerObj = JSONValue::parseCopy(data);

    JSONObjectIterator iter(outerObj);
    while(iter.next()) {
        if (iter.value().isArray()) {
            JSONArrayIterator iter2(iter.value());
            int index = 0;
            while(iter2.next()) {
                JSONObjectIterator iter3(iter2.value());
                while(iter3.next()) {
                    Log.info("%s index=%d key=%s value=%s", 
                        (const char *) iter.name(),
                        index,
                        (const char *) iter3.name(), 
                        (const char *) iter3.value().toString());
                }
                index++;
            }
        }
        else {
            Log.info("key=%s value=%s", 
                (const char *) iter.name(), 
                (const char *) iter.value().toString());
        }
    }
}

