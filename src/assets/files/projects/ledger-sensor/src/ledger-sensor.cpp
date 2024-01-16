#include "Particle.h"

SYSTEM_MODE(AUTOMATIC);
SYSTEM_THREAD(ENABLED);

SerialLogHandler logHandler(LOG_LEVEL_INFO);

Ledger sensors;

const std::chrono::milliseconds sensorCheckPeriod = 5min;
unsigned long sensorCheckLast = 0;
int sensorValue = 0;

void setup() {
    sensors = Particle.ledger("sensors");
}

void loop() {
    if (Particle.connected()) {
        if (sensorCheckLast == 0 || millis() - sensorCheckLast >= sensorCheckPeriod.count()) {
            sensorCheckLast = millis();

            // In a real application, you'd read the sensor here, but we'll just set a random 12-bit value
            sensorValue = rand() % 4096;

            // Save the value to the ledger
            Variant data;
            data.set("sensor", sensorValue);
            if (Time.isValid()) {
                data.set("time", Time.format(TIME_FORMAT_ISO8601_FULL));
            }
            sensors.set(data);
            Log.info("set ledger sensor=%d", sensorValue);
        }
    }
}


