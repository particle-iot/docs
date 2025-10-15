#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#include "Grove_Temperature_And_Humidity_Sensor.h"
#include "TemperatureHumidityValidatorRK.h"

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

// Library: Grove_Temperature_And_Humidity_Sensor
DHT tempSensor(A1);

// Library: TemperatureHumidityValidatorRK
TemperatureHumidityValidator validator;

// Sample the temperature sensor every 2 seconds. This is done so the outlier values can be filtered out easily.
const unsigned long CHECK_PERIOD_MS = 2000;
unsigned long lastCheck = 0;

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration


void setup()
{
    Tracker::instance().init();
    
    // Callback to add key press information to the location publish
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);

    // Initialize temperature sensor
    tempSensor.begin();

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();

    if (millis() - lastCheck >= CHECK_PERIOD_MS) {
        lastCheck = millis();

        validator.addSample(tempSensor.getTempCelcius(), tempSensor.getHumidity());

        // Log.info("tempC=%f tempF=%f humidity=%f", validator.getTemperatureC(), validator.getTemperatureF(), validator.getHumidity());
    }
}


void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    float tempC = validator.getTemperatureC();
    if (!isnan(tempC)) {
        writer.name("temp").value(tempC, 2);
    }

    float hum = validator.getHumidity();
    if (!isnan(hum)) {
        writer.name("hum").value(hum, 1);
    }

}
