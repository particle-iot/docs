---
title: Sensors
columns: two
layout: commonTwo.hbs
description: Cloud connected sensors
---

# {{title}}

{{section-nav}}

In this section, we'll make a fleet of temperature sensors and discuss other kinds of sensors you may be interested.

{{content-nav}}

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudLed, and paste the contents CloudLed.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="CloudLed2" default-file="src/CloudLed2.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

## Explaining the code


### In the console

I've opened [console.particle.io](https://console.particle.io/), then my product (Chivalrous Pink Borons), the product device list, then my device (wombat_magnetic). 

{{imageOverlay src="/assets/images/getting-started-guide/temperature-console.png" class="no-darken"}}


### USB serial debug log

```
0000011748 [system] INFO: Cloud connected
0000011752 [app] INFO: failed to get reading try=1 result=-1
0000012755 [app] INFO: published {"temp":27.5822,"humid":28.1407}
```

If you switch the event detail view in the console from **Pretty** to **Raw** you'll see the same data as the USB serial debug log.

{{imageOverlay src="/assets/images/getting-started-guide/temperature-console-raw.png" class="no-darken"}}

## Using libraries

Use **Particle: Install library**  to install the **sht3x-i2c** library.

{{imageOverlay src="/assets/images/getting-started-guide/temperature-install-library.png" class="no-darken"}}

You can find libraries using [Library search](/reference/device-os/libraries/search/). There are a large number of community libraries available. These were written or ported by community members and may vary in quality and support, however they will typically be a good starting point. Many of the popular libraries are high-quality and suitable even for use in commercial projects.

If you get a red squiggle for the `#include` statement with this error, make sure you have done **Particle: Configure project for device**. The include files may not show up until you do this. If you opened a folder in Workbench when **Particle: Import Project** was required, this error can also occur.

{{imageOverlay src="/assets/images/getting-started-guide/library-include-not-found.png" class="no-darken"}}


## Other kinds of sensors

Particle devices work with many kinds of sensors. Most sensors that work with Arduino also work with Particle devices. They can connect by a number of technologies.

[I2C](/hardware/expansion/about-i2c/) is a popular bus topology for short distances for connecting sensors and small displays. [Qwiic](/hardware/expansion/qwiic/) and STEMMA-QT use a standardized connector for 3.3V I2C to connect devices without loose wires, soldering, etc..

[UART serial](/hardware/expansion/about-serial/) is another popular sensor connection method. Particle devices run at 3.3V so you may need a level shifter for 5V or RS232C, which use higher voltages. Gen 3 devices have a limited number of available serial ports.

[Modbus](/hardware/expansion/about-modbus/) requires additional interface hardware, but is a common way to attach multiple sensors to a single UART serial port. It's common in industrial settings.

[CAN bus](/hardware/tracker/projects/tracker-can/) is a standard typically used in automotive and some industrial monitoring. Only the Tracker One has built-in support for CAN, but other devices can add it with interface hardware.

[Bluetooth LE (BLE)](/reference/device-os/bluetooth-le/) is a standard for wirelessly connected sensors. There are standard for things like heart rate sensors that are generally compatible, but some devices use a proprietary protocol that may not be easily supported.

[SPI](/reference/device-os/api/spi/) is a short-range connection method that is generally much faster than I2C but requires more pins. It's often used to connect high-speed chips like CAN controllers, external analog-to-digital converters, etc..

USB sensors are generally incompatible with Particle devices. Those sensors requires a USB host port, and the USB port on Particle devices cannot be a USB host. 

## Temperature sensors

There are many options for temperature sensors on Particle devices:

A thermistor is a variable resistance semiconductor that connects to an analog pin of your Particle device, along with an additional resistor. The Tracker One includes on on the carrier board. 

Other analog temperature sensors like the TMP36 also connect to an analog pin, but include additional circuitry for better linearity, which results in more accurate readings.

I2C temperature sensors like the SHT3x in this section, TMP112, and the DS75, use digital communication over I2C. In some cases, you can connect a limited number of sensors to a single I2C bus. The BME280 (and others) measure temperature, atmospheric pressure, and relative humidity.

Proprietary protocol digital sensors like the DHT11, DHT22, and SHT11 are not recommended. They are not compatible with Gen 4 devices like the P2, Photon 2, and M-SoM, and can be unreliable on Gen 3 devices.

1Wire sensors including the popular DS18B20, allow many sensors to be connected to a single bus. They are not recommended, however, because Gen 4 devices require an 1Wire-to-I2C bridge chip to implement 1Wire; software implementations are not compatible with these devices.

## Sensor compatibility

In addition to having a compatible interface (like I2C), sensors must be the correct voltage.

All Particle devices run at 3.3V. Most sensors are compatible with this, but some require 5V. Gen 3 and Gen 4 devices are not 5V tolerant so sensors that have a 5V digital output should never be used.

Except for the simplest of sensors, you will probably want to select one with a compatible library. You can use [Library search](/reference/device-os/libraries/search/) to search for a Particle library for the chip. 

In many cases, if an Arduino library is available, you can easily port it. Libraries from Sparkfun and Adafruit generally work with little or no modification, and other [common library porting issues](/getting-started/device-os/firmware-libraries/#common-issues-with-porting-libraries) are easily resolved.

Some sensors intended for use with a Raspberry Pi can work, but since the driver library architecture is completely different, it may be difficult to make it work properly.


## Next steps

This section only describes the device-side part and sending the data to the cloud. After that, you might:

- Store the data in a database
- Display it on a dashboard
- Analyze it

{{section-nav}}
