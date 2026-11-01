---
title: Sensors
columns: two
layout: commonTwo.hbs
description: Cloud connected sensors
---

# {{title}}

{{section-nav}}

In this section, we'll make a fleet of temperature sensors.

{{content-nav}}

This section only describes the device-side part and sending the data to the cloud. After that, you might:
- Store the data in a database
- Display it on a dashboard
- Analyze it

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudLed, and paste the contents CloudLed.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="CloudLed2" default-file="src/CloudLed2.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

## Explaining the code

## Using libraries


## Other kinds of sensors

Particle devices work with many kinds of sensors. Most sensors that work with Arduino also work with Particle devices. They can connect by a number of technologies.

[I2C](/hardware/expansion/about-i2c/) is a popular bus topology for short distances for connecting sensors and small displays. [Qwiic](/hardware/expansion/qwiic/) and STEMMA-QT use a standardized connector for 3.3V I2C to connect devices without loose wires, soldering, etc..

[UART serial](/hardware/expansion/about-serial/) is another popular sensor connection method. Particle devices run at 3.3V so you may need a level shifter for 5V or RS232C, which use higher voltages. Gen 3 devices have a limited number of available serial ports.

[Modbus](/hardware/expansion/about-modbus/) requires additional interface hardware, but is a common way to attach multiple sensors to a single UART serial port. It's common in industrial settings.

[CAN bus](/hardware/tracker/projects/tracker-can/) is a standard typically used in automotive and some industrial monitoring. Only the Tracker One has built-in support for CAN, but other devices can add it with interface hardware.

[Bluetooth LE (BLE)](/reference/device-os/bluetooth-le/) is a standard for wirelessly connected sensors. There are standard for things like heart rate sensors that are generally compatible, but some devices use a proprietary protocol that may not be easily supported.

[SPI](/reference/device-os/api/spi/) is a short-range connection method that is generally much faster than I2C but requires more pins. It's often used to connect high-speed chips like CAN controllers, external analog-to-digital converters, etc..

USB sensors are generally incompatible with Particle devices. Those sensors requires a USB host port, and the USB port on Particle devices cannot be a USB host. 

{{section-nav}}

