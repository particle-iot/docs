
#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

#include "Sparkfun_ADS1015_Arduino_Library.h"
#include "Sensor_4_20mA_RK.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

PRODUCT_ID(TRACKER_PRODUCT_ID);
PRODUCT_VERSION(TRACKER_PRODUCT_VERSION);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.gps.nmea", LOG_LEVEL_INFO },
    { "app.gps.ubx",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

const size_t NUM_SENSOR_CONFIG = 2;
SensorConfig sensorConfig[NUM_SENSOR_CONFIG] = {
    { 100, "sen1" },
    { 101, "sen2", 0, 100, false }
};
Sensor_4_20mA sensor;

void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration


void setup()
{
    // Uncomment to make it easier to see the serial logs at startup
    // waitFor(Serial.isConnected, 15000);
    // delay(1000);

    Tracker::instance().init();

    // Callback to add temperature information to the location publish
    Tracker::instance().location.regLocGenCallback(locationGenerationCallback);

    // If using the M8 connector, turn on the CAN_5V power
    pinMode(CAN_PWR, OUTPUT);
    digitalWrite(CAN_PWR, HIGH);
    delay(500);

    Wire3.begin();

    sensor
        .withADS1015(100, ADS1015_CONFIG_PGA_16, 318, 1602, ADS1015_ADDRESS_GND, Wire3)
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


void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context)
{
    sensor.writeJSON(writer);
}



