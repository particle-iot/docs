// StructuredSubscription.cpp

// particle publish subscriptionTest '{"a":1234, "b":"testing!"}'

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

// System thread defaults to on in 6.2.0 and later and this line is not required
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED);
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

void mySubscriptionHandler(CloudEvent event);   


void setup() {
    // Use structured data for sending JSON data to the device from the cloud.
    SubscribeOptions subscribeOptions;
    subscribeOptions.structured(true);

    Particle.subscribe("subscriptionTest", mySubscriptionHandler, subscribeOptions);
}

void loop() {    
}

void mySubscriptionHandler(CloudEvent event) {
    // EventData is the same as particle::Variant
    EventData data = event.dataStructured();

    Log.info("mySubscriptionHandler json: %s", data.toJSON().c_str());

    if (data.has("a")) {
        Log.info("a=%d", data.get("a").toInt());
    }

    if (data.has("b")) {
        Log.info("b=%s", data.get("b").toString().c_str());
    }
}

