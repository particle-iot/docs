---
title: Tracker Eval Board Tutorials
columns: two
layout: tutorials.hbs
order: 40
description: Adding features to the Tracker Evaluation Board
---

# Tracker Eval Board Tutorials

This section has information on prototyping with the Tracker Evaluation board experiment and add new features, with an eye toward being able to easily migrate to the Tracker One, Tracker Carrier Board, or Tracker SoM for production.

## I2C Sensor Example

One of the best ways to expand the Tracker One is using I2C, since that interface makes it possible to add multiple external peripherals off the single M8 connector. You can use the same techniques on the Tracker SoM Evaluation Board and Tracker SoM.

For this example we'll add temperature, pressure, and humidity information to location publishes using the Tracker SoM Evaluation Board.

We'll also use the [SparkFun Qwiic](/community/qwiic/) line of products for easy prototyping. For production you'd probably make your own custom board with the sensor on it, instead.

With the Evaluation board you'll need the [Qwiic connector to prototyping wires](https://www.sparkfun.com/products/14425) or the [cable assortment](https://www.sparkfun.com/products/15081) that includes it.

![Qwiic to wires](/assets/images/qwiic/qwiic-wires.jpg)

And you'll need a sensor, in this case a [SparkFun Atmospheric Sensor Breakout - BME280 (Qwiic)](https://www.sparkfun.com/products/15440).

- Connect the following wires to the Tracker SoM Evaluation Board expansion connector:

| Color  | Pin     | Purpose |
| :----- | :------ | :--- |
| Blue   | MCU_RX  | SDA (I2C data) |
| Yellow | MCU_TX  | SCL (I2C clock) |
| Red    | 3V3     | Power 3.3V |
| Black  | GND     | Ground |

![BME280](/assets/images/tracker/bme280.jpg)

Instead of using D0/D1 for I2C like on other Particle devices, in this case we'll be using the multi-function port pins `MCU_RX` and `MCU_TX` instead. On the Tracker SoM the TX and RX pins can be reconfigured to be `Wire3` instead of `Serial1`, allowing a single set of pins to be GPIO, serial, or I2C on the M8 connector.

- Start with the base Tracker Edge firmware
- Add and copy the **Adafruit_BME280_RK** library into the project:

```bash
$ particle library add Adafruit_BME280_RK
$ particle library copy Adafruit_BME280_RK
```

- Here's the source:

```cpp
#include "Particle.h"

#include "tracker_config.h"
#include "tracker.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

PRODUCT_ID(PLATFORM_ID);
PRODUCT_VERSION(1);

SerialLogHandler logHandler(115200, LOG_LEVEL_TRACE, {
    { "app.tinygps++", LOG_LEVEL_INFO },
    { "app.ubloxgps",  LOG_LEVEL_INFO },
    { "ncp.at", LOG_LEVEL_INFO },
    { "net.ppp.client", LOG_LEVEL_INFO },
});

#include "Adafruit_BME280.h"

Tracker tracker;

// Temperature, pressure, and humidity sensor
Adafruit_BME280 bme(Wire3);
bool hasSensor = false;

void locationGenerationCallback(JSONWriter &writer, LocationPoint &point, const void *context); // Forward declaration

void setup()
{
    // waitFor(Serial.isConnected, 10000);
    // delay(2000);

    tracker.init();

    // Disable Serial1 and enable Wire3 (I2C) on the multi-function pins 
    Serial1.end();
    Wire3.begin();

    // Initialize the BME280 sensor (I2C)
    hasSensor = bme.begin(0x77);
    Log.info("hasSensor=%d", hasSensor);

    tracker.location.regLocGenCallback(locationGenerationCallback);


    Particle.connect();
}

void loop()
{
    tracker.loop();
}

void locationGenerationCallback(JSONWriter &writer, 
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

```

Most of it is boilerplate, but looking in more closely:

- Include the library header for the sensor and add any global variables it requires:

```
#include "Adafruit_BME280.h"
Adafruit_BME280 bme(Wire3);
bool hasSensor = false;
```

- Disable `Serial1` and enable `Wire3` on the multi-function pins.

```cpp
Serial1.end();
Wire3.begin();
```

- Initialize the sensor, in this case a BME280 on Wire3 using address 0x77.

```cpp
hasSensor = bme.begin(0x77);
Log.info("hasSensor=%d", hasSensor);
```

- In our location callback, add the temperature, pressure, and humidity data.

```cpp
void locationGenerationCallback(JSONWriter &writer, 
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
```

- Now you can see the extra data in the `loc` event!

```json
{
    "cmd":"loc"
    "time":1593091308
    "loc":
    {
        "lck":1
        "time":1593091309
        "lat":42.469732
        "lon":-75.064801
        "alt":324.11
        "hd":222.95
        "h_acc":6.8
        "v_acc":9.2
        "cell":42.3
        "batt":72.2
        "temp":24.92
        "pres":973.39
        "hum":42.46
    },
    "trig":
    [
        "time"
    ],
    "req_id":2
}
```
