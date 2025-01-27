// BinaryWithJson.cpp

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
const size_t dataSize = 2048;

void readSensors(float &a, int &b);
void publishSensors();

void setup() {
}

void loop() {
    if (Particle.connected()) {
        if (!event.isSending() && ((lastPublish == 0) || (millis() - lastPublish >= publishPeriod.count())))  {
            lastPublish = millis();

            publishSensors();
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

void readSensors(float &a, int &b) {
    a = ((float)rand()) / (float)INT_MAX;
    b = rand();
}


void publishSensors() {
    
    char *data = new char[dataSize];
    if (!data) {
        Log.error("out of memory dataSize=%u", dataSize);
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


    Particle.publish(event);

    Log.info("publishing %s", obj.toJSON().c_str());
}

// Example data:
// {"a":{"_type":"buffer","_data":"XyNWMDt/opBDEOo3dVmCd5KBryT1kxkS/vViaxZE59YN1JoBenQgbxTUwYTfrq3/ITvrpuVOCy+M09BY7U68cQ=="}}


// 2048 byte data
// {"a":{"_type":"buffer","_data":"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"}}

