---
title: Power module datasheet
columns: two
layout: commonTwo.hbs
description: Power module datasheet
---

# Power module datasheet}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet for review only. Changes are likely before release.
{{box op="end"}}

## Overview

The Particle power module is a small castellated module intended to be reflow soldered to your M.2 SoM base board. It contains:

- bq24195 PMIC (charge controller and regulator)
- MAX17043 fuel gauge (LiPo battery charge sensor)
- 3.3V regulator for MCU (2A)
- 3.7V regulator for cellular modem (2A)
- 5V to 17VDC input


## Block diagram

{{imageOverlay src="/assets/images/power-module/power-module-block-diagram.png" alt="Dimensions" class="full-width"}}


## Dimensions

{{imageOverlay src="/assets/images/power-module/power-module-dimensions.png" alt="Dimensions" class="full-width"}}


## Pinout

{{imageOverlay src="/assets/images/power-module/power-module-pinout.svg" alt="Pinout" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated f7d89d7b-2988-4b97-842d-f28f2c6fc767 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 1 | 3V3 | Power output 3.3V |
| 2 | 3V3 | Power output 3.3V |
| 3 | 5V | Power output 5V (not available on PMIC power module) |
| 4 | 5V | Power output 5V (not available on PMIC power module) |
| 5 | VCC | Power output 3.7V for cellular modem |
| 6 | VCC | Power output 3.7V for cellular modem |
| 7 | NC | Leave unconnected |
| 8 | NC | Leave unconnected |
| 9 | GND | Ground |
| 10 | GND | Ground |
| 11 | VIN | Power in (6V - 17V on PMIC power module) |
| 12 | VIN | Power in (6V - 17V on PMIC power module) |
| 13 | SCL | I2C SCL. No internal pull. |
| 14 | SDA | I2C SDA. No internal pull. |
| 15 | INT | PMIC_INT interrupt output. Connect to SoM D22. |
| 16 | TS | LiPo battery temperature sensor (NTC thermistor) |
| 17 | VBAT | LiPo battery connection 3.7V |
| 18 | VBAT | LiPo battery connection 3.7V |
| 19 | VBAT | LiPo battery connection 3.7V |
| 20 | GND | Ground |
| 21 | GND | Ground |
| 22 | NC | Leave unconnected |
| 23 | PG | Power good output. Open drain, is pulled low on failure of either regulator. |
| 24 | EN | Power output enable. Has internal pull-up to VSYS, pull to GND to disable power outputs. |


{{!-- END do not edit content above, it is automatically generated  --}}


## Typical application

{{imageOverlay src="/assets/images/power-module/power-module-example.svg" alt="Typical usage" class="full-width"}}


## Land pattern

{{imageOverlay src="/assets/images/power-module/power-land.png" alt="Land pattern" class="full-width"}}

## Schematic 

{{imageOverlay src="/assets/images/power-module/power-module-schematic.svg" alt="Module schematic" class="full-width"}}

## Ordering information

To be provided at a later date.
