---
title: M8 Temperature/Humidity
layout: datasheet.hbs
columns: two
order: 22
description: Datasheet for Tracker One M8 Temperature/Humidity Sensor
---

# Tracker M8 Temperature/Humidity<sup>(001)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/m8-temperature-humidity.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

![M8 Sensor Temperature/Humidity](/assets/images/tracker/m8-temp-humidity.png)

The M8 Temperature/Humidity sensor provides an easy way to measure temperature and humidity with the Tracker One. It connects to the M8 connector on the outside of the Tracker One.

- IP 67 waterproof rating
- Durable, weatherproof, metal casing
- ±0.5°C temperature accuracy
- ±2% relative humidity accuracy
- Temperature range -22°C to 80°C
- 120 cm. (47.25 inch) cable
- The Tracker One preserves its IP67 waterproof rating with the M8 connector in use

### Details

The sensor (in the metal case) is a weatherproof [Sensiron SHT-31D](https://www.sensirion.com/en/environmental-sensors/humidity-sensors/digital-humidity-sensors-for-various-applications/), I2C temperature and humidity sensor.

The sensor is powered by the CAN_PWR output on the M8 connector. It can be powered down when not sensing temperature to reduce power consumption, if desired.

The cable assembly contains a 3.3V voltage regulator, as the I2C interface on the Tracker One is limited to 3.3V. 


### Diagram

{{imageOverlay src="/assets/images/tracker/m8-temp-humidity-diagram.png" alt="Diagram" class="full-width"}}

### Firmware Library

The [Particle sht3x-i2c library](https://github.com/particle-iot/sht3x-i2c) can be used to communicate with this sensor from user firmware.

- I2C address: 0x44
- I2C maximum speed: 400 MHz
- Tracker One interface: `Wire3`

The [M8 Temperature/Humidity Sensor Tutorial](/tutorials/asset-tracking/m8-temperature-humidity) includes additional information for using the library and this sensor.

### Ordering Information

| SKU  | Description |
| :--- | :--- |
| M8TEMPHUMIEA | M8 Temperature and humidity sensor, (x1) |
| M8TEMPHUMITY | M8 Temperature and humidity sensor, (x40) |


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 001      | 2021 Mar 01 | RK | First release |
