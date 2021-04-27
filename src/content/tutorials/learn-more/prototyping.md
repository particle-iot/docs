---
title: Prototyping
order: 50
shared: true
columns: two
layout: tutorials.hbs
description: Prototyping new designs
---

# Prototyping


## Sparkfun Qwiicc and Adafruit STEMMA QT

One convenient way to connect sensors and small displays is using I2C, the Inter-Integrated Circuit bus also known as I<sup>2</sup>C, pronounced "eye squared see," or sometimes IIC. This bus uses two bi-directional data lines (SDA and SCL), and often includes power (either 3.3V or 5V) and ground. You can connect multiple sensors to a single I2C bus, with some limitations, depending on the sensor. It's also easy to daisy-chain sensors, connecting multiple sensors to a single bus, one after the other.

Sparkfun created a standard for using I2C at 3.3V with a small, standardized connector, and created dozens of boards to this standard called Qwiic. Adafruit has joined them making compatible boards and connectors under the STEMMA QT name.
 
The [Qwiic](/community/qwiic/) page in the documentation has more information on various options available.


## ncd nodeLynk I2C

[Ncd](https://ncd.io) created a similar concept using I2C running at 5V, using a slightly larger connector called [nodeLynk I2C](https://ncd.io/nodelynk-i2c/). These are incompatible with the Sparkfun Qwiic and Adafruit STEMMA QT devices, but may be useful in some cases. 

The ncd shields for Particle Gen 3 devices have the necessary I2C level shifting as the Argon and Boron do not support 5V I2C on the SDA/SCL pins, but the shield has the necessary conversion. Do not attempt to connect 5V I2C directly to D0 and D1 using direct wires as you will damage the Argon or Boron!

Also, ncd has a large selection of relay boards for Particle devices.

## Grove

[Seeed Studio](https://www.seeedstudio.com/) has the [Grove](https://www.seeedstudio.com/category/Grove-c-1003.html) line of expansion boards. They all have the same four-pin connectors, however, there is different functionality depending on which port you are connected to:

- Analog input (ADC)
- Digital GPIO
- I2C
- Serial

Some evaluation boards, including the E Series and B Series SoM, include Grove connectors.

## Breadboards

One common method of prototyping is to use solderless breadboards. 

## Mikroe

[MikroElektronika](https://www.mikroe.com/) has a collection of base boards and small accessory boards, Click, that connect by the mikroeBUS. 

The mikroeBUS includes I2C, SPI, serial, analog input (ADC), GPIO, PWM, and interrupts. A click shield available for Particle Gen 3 Feather (Argon, Boron) devices, as well as one for the B Series SoM. 

The [Mikroe community page](/community/mikroe/) has more information.



