
#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#include "Sensor_4_20mA_RK.h"


#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(TRACKER_PRODUCT_ID);
#endif
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

const size_t NUM_SENSOR_CONFIG = 1;
SensorConfig sensorConfig[NUM_SENSOR_CONFIG] = {
    { A3, "temp", 0, 100, false }
};
Sensor_4_20mA sensor;

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration


void setup()
{
    Tracker::instance().init();

    // Callback to add temperature information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    sensor
        .withNativeADC()
        .withConfig(sensorConfig, NUM_SENSOR_CONFIG)
        .init();

    Particle.connect();
}

void loop()
{
     Tracker::instance().loop();

     static unsigned long lastReport = 0;
     if (millis() - lastReport >= 2000) {
        lastReport = millis();

        for(size_t ii = 0; ii < NUM_SENSOR_CONFIG; ii++) {
            SensorValue value = sensor.readPinValue(sensorConfig[ii].virtualPin);

            Log.info("%s: value=%.3f mA=%.3f adcValue=%d", sensorConfig[ii].name, value.value, value.mA, value.adcValue);
        }
     }
}



void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    sensor.writeJSON(writer);
}



