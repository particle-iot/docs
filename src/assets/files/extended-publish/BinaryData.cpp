// BinaryData.cpp

#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);

// System thread defaults to on in 6.2.0 and later and this line is not required
#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif

SerialLogHandler logHandler(LOG_LEVEL_INFO);

const std::chrono::milliseconds publishPeriod = 2min;
unsigned long lastPublish;
CloudEvent event;
const size_t dataSize = 2048;

void publishData();

void setup() {
}

void loop() {
    if (Particle.connected()) {
        if (!event.isSending() && ((lastPublish == 0) || (millis() - lastPublish >= publishPeriod.count())))  {
            lastPublish = millis();

            publishData();
        }
    }
    
    if (event.isSent()) {
        Log.info("publish succeeded");
        event.clear();
    }
    else 
    if (!event.isOk()) {
        Log.info("publish failed error=%d", event.error());
        event.clear();
    }
}


void publishData() {
    
    char *data = new char[dataSize];
    if (!data) {
        Log.error("out of memory dataSize=%u", dataSize);
        return;
    }

    for(size_t ii = 0; ii < dataSize; ii++) {
        data[ii] = (char) rand();
    }

    event.name("publish-test");
    event.data(data, dataSize, ContentType::BINARY);
    delete[] data;

    Particle.publish(event);

    Log.info("publishing binary data");
}

// Example data:
// data:application/octet-stream;base64,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
