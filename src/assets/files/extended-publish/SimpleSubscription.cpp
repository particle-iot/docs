// SimpleSubscription.cpp

// particle publish "subscriptionTest" "abcd"

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
    Log.info("mySubscriptionHandler %s", event.dataString().c_str());
}

