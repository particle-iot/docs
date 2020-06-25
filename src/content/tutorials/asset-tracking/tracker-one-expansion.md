---
title: Tracker One Expansion
columns: two
layout: tutorials.hbs
order: 40
description: Adding features to the Tracker One
---

# Tracker One Expansion

The Tracker One can be expanded without opening the case by using the M8 connector.

![Expansion Port](/assets/images/at-som/expansion-highlight.png)

This connector can be used while maintaining the IP67 rating.

The 8-pin connector has these signals:

| M8 Pin | Function   | Function  | Function  | I/O |
| :----: | :-------   | :-------  | :-------  | :--- |
| 1      | VIN<sup>3</sup> |      |           | I |
| 2      | GND        |           |           |   |         
| 3      | CAN 5V<sup>4</sup> |   | CAN_PWR   | O |
| 4      | CAN+       |           |           | IO<sup>2</sup> |
| 5      | CAN-       |           |           | IO<sup>2</sup> |
| 6      | Serial1 TX | Wire3 SCL | GPIO D9   | IO<sup>1</sup> |
| 7      | Serial1 RX | Wire3 SDA | GPIO D8   | IO<sup>1</sup> |
| 8      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> |

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>4.5 to 30 VDC when using the M8 connector. 4.5 - 105 VDC when connecting directly to the board.

<sup>4</sup>5V, 500 mA maximum. Controlled by the CAN_PWR GPIO.

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.

### M8 cable

The M8 (8mm) 8-pin connector is standard, however it's not common. Some other connectors like M12 are more common, however, the 12mm connector would have required a taller enclosure to fit the larger connector. To simplify designs, Particle will provide a M8 female-to-wires cable, similar to this. This is for illustration only and the design may vary in the future.

![M8 cable](/assets/images/at-som/M8-cable.jpg)

The common use case will be to include a cable gland in your expansion enclosure, pass the wires through the gland, and terminate them on your custom expansion board.

## Interface Details

### Power (in)

While the picture above includes both USB-C and M8 cables, it's also possible to power the Tracker One from the M8 connector. In this case, supply 4.5 to 30 VDC at 10 watts.

### Power (out) 

There is an optional 5V 500 mA power output (`CAN 5V`) that is controlled by the `CAN_PWR` GPIO. It is available in all power modes (battery, USB, and VIN); there is an on-board boost converter to produce 5V from the 3.7V LiPo battery.

If you are building an expansion device that is battery or USB powered, you can use `CAN 5V` to power your expansion device, eliminating the need to add a separate power supply. Note that this is limited to 500mA at 5V and the Tracker SoM GPIO are limited to 3.3V, so you may need to add a 3.3V regulator on your expansion board to convert `CAN 5V` to 3.3V.

### CAN

A CAN BUS interface is provided. The two differential CAN bus signals are provided (CAN+ and CAN-).

### Multi-function pins

There are three multi-function pins:

| M8 Pin | Function   | Function  | Function  | 
| :----: | :-------   | :-------  | :-------  | 
| 6      | Serial1 TX | Wire3 SCL | GPIO D9   | 
| 7      | Serial1 RX | Wire3 SDA | GPIO D8   | 
| 8      | Analog A3  |           | GPIO D3   | 

For example: If you are using Serial, you cannot use Wire (I2C) and can only use one other GPIO (D3). 

If you are using Wire (I2C), you can't use Serial or D8 or D9.

If you aren't using Wire or Serial, you can use all three pins as GPIO, or use D8 and D9 as GPIO and A3 as analog input (ADC).

If you are in need of more ports, the best solution is to use the multi-function pins as I2C, and include an I2C expander on your expansion board. Some things you can add using I2C:

- More GPIO using a MCP23008 (8-port) or MCP23017 (16-port)
- ADCs (like the MCP3021 single port)
- PWM (pulse-width modulation output) using a PCA9685 (16-channel) for servos or LEDs
- Temperature, humidity, and pressure sensors
- Displays (LED, OLED, LCD, etc.)
- Serial UART (SC16IS740)
- FRAM non-volatile data storage

Note that Serial, I2C, GPIO, and ADC on the Tracker SoM can only be used at 3.3V maximum. The inputs are not 5V tolerant!


## I2C Expansion Example

One of the best ways to expand the Tracker One is using I2C, since that interface makes it possible to add multiple external peripherals off the single M8 connector. 

For this example we'll add temperature, pressure, and humidity information to location publishes.

We'll use the Tracker SoM Evaluation Board as it makes prototyping much easier. We'll also use the [SparkFun Qwiic](/community/qwiic/) line of products for easy prototyping. For production you'd probably make your own custom board with the sensor on it, instead.

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

PRODUCT_ID(24);
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
