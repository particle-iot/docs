#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
SYSTEM_MODE(SEMI_AUTOMATIC);

#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(PLATFORM_ID);
#endif
PRODUCT_VERSION(1);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

#include "Adafruit_BME280.h"


// Temperature, pressure, and humidity sensor
Adafruit_BME280 bme(Wire3);
bool hasSensor = false;

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    // waitFor(Serial.isConnected, 10000);
    // delay(2000);

    Tracker::instance().init();

    // Disable Serial1 and enable Wire3 (I2C) on the multi-function pins 
    Serial1.end();
    Wire3.begin();

    // Initialize the BME280 sensor (I2C)
    hasSensor = bme.begin(0x77);
    Log.info("hasSensor=%d", hasSensor);

    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);


    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();
}

void myLocationGenerationCallback(JSONWriter &writer, 
    LocationPoint &point, const void *context)
{
    if (hasSensor) {
        writer.name("temp").value(bme.readTemperature(), 2); // degrees C
        writer.name("pres").value(bme.readPressure() / 100.0, 2); // hPA
        writer.name("hum").value(bme.readHumidity(), 2); // Relative humidity %        
    }
    else {
        Log.info("no sensor");
    }
}
