// JsonSubscription.cpp

// This doesn't work because it's coming in as a string, not JSON!

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
    Particle.subscribe("subscriptionTest", mySubscriptionHandler);
}

void loop() {    
}

void mySubscriptionHandler(CloudEvent event) {
    Log.info("mySubscriptionHandler called contentType=%d string=%s", (int)event.contentType(), event.dataString().c_str());

    // EventData is the same as particle::Variant
    EventData data = particle::Variant::fromJSON(event.dataString().c_str());

    Log.info("json: %s", data.toJSON().c_str());

    if (data.has("a") && data.get("a").isInt()) {
        Log.info("a=%d", data.get("a").toInt());
    }

    if (data.has("b") && data.get("b").isString()) {
        Log.info("b=%s", data.get("b").toString().c_str());
    }


}

