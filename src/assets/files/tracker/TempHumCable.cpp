#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"
#include "sht3x-i2c.h"

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

Sht3xi2c sensor(Wire3, 0x44);

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    Tracker::instance().init();

    // Register a location callback so we can add temperature and humidity information
    // to location publishes
    Tracker::instance().location.regLocGenCallback(myLocationGenerationCallback);
    
    // Turn on 5V output on M8 connector
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
    delay(500);

    sensor.begin(CLOCK_SPEED_400KHZ);
    sensor.start_periodic();

    Particle.connect();
}

void loop()
{
    Tracker::instance().loop();
}

void myLocationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    double temp, humid;

    int err = sensor.get_reading(&temp, &humid);
    if (err == 0)
    {
        writer.name("sh31_temp").value(temp);
        writer.name("sh31_humid").value(humid);

        Log.info("temp=%.2lf hum=%.2lf", temp, humid);
    }
    else {
        Log.info("no sensor err=%d", err);
    }
}
