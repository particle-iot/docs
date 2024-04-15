---
title: PM-BAT power module datasheet
columns: two
layout: commonTwo.hbs
description: PM-BAT power module (battery + PMIC + fuel gauge) datasheet
---

# Power module datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet for review only. Changes are likely before release.
{{box op="end"}}

## Overview

The Particle PM-BAT power module is a small module that contains:

- 5V to 17VDC input
- 3.3V regulated output for MCU (2A)
- 3.9V output for cellular modem (2A)
- bq24195 PMIC (power management and charge controller)
- MAX17043 fuel gauge (LiPo battery charge sensor)

It can either be:

- A castellated module intended to be reflow soldered to your M.2 SoM base board
- A module with male pins on the bottom that can be plugged into a socket on your M.2 SoM base board

The [PM-DC](/hardware/power/pm-dc-datasheet/) power module is also available if you do not need 
battery support and want to power from an external DC source.

## Block diagram

{{imageOverlay src="/assets/images/power-module/pm-bat-block-diagram.png" alt="Dimensions" class="full-width"}}


## Dimensions

{{imageOverlay src="/assets/images/power-module/power-module-dimensions.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in mm</p>

- Module is 35mm x 22.86mm (1.38" x 0.9")
- Pins and castellated holes are 2.54mm (0.1") apart

## Pinout

{{imageOverlay src="/assets/images/power-module/pm-bat-pinout.svg" alt="Pinout" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated f7d89d7b-2988-4b97-842d-f28f2c6fc767 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 1 | 3V3 | Power output 3.3V |
| 2 | 3V3_AUX | Power output 3.3V, controllable |
| 3 | 5V | Power output 5V (not available on this module) |
| 4 | 5V | Power output 5V (not available on this module) |
| 5 | VCC | Power output 3.9V 2A for cellular modem |
| 6 | VCC | Power output 3.9V 2A for cellular modem |
| 7 | EN_AUX | Enable 33_AUX (has 100K pull-down to default off) |
| 8 | REGN | PMIC REGN output used for temperature sensor |
| 9 | GND | Ground |
| 10 | GND | Ground |
| 11 | VIN | Power in 5V - 17V |
| 12 | VIN | Power in 5V - 17V |
| 13 | CHG | Charge indicator output |
| 14 | SCL | I2C SCL. No internal pull on power module. |
| 15 | SDA | I2C SDA. No internal pull on power module. |
| 16 | /FUEL_INT | PMIC and FUEL_INT interrupt output open drain. Connect to SoM D22. |
| 17 | TS | LiPo battery temperature sensor (NTC thermistor) |
| 18 | VBAT | LiPo battery connection 3.7V |
| 19 | VBAT | LiPo battery connection 3.7V |
| 20 | VBAT | LiPo battery connection 3.7V |
| 21 | GND | Ground |
| 22 | GND | Ground |
| 23 | /RST | MCU reset button, active low. |
| 24 | PG | Power good output. Open drain, is pulled low on failure of either regulator. |
| 25 | ENABLE | Power output enable. Has internal pull-up to VSYS, pull to GND to disable power outputs. |


{{!-- END do not edit content above, it is automatically generated  --}}

`3V3_AUX` is powered by `3V3` via a load switch (TPS22918). It can supply up to the full 2A of `3V3`. It defaults to off due to a pull-down resistor on the pin. Pull to `3V3` to enable the `3V3_AUX` output.

The I2C connection is required; the module will not operate correctly without configuration by I2C to 
adjust the input current limit and other settings.

{{!-- 
Typical application
imageOverlay src="/assets/images/power-module/power-module-example.svg" alt="Typical usage" class="full-width"
--}}

## Land pattern (SMD)

{{imageOverlay src="/assets/images/power-module/power-module-land.png" alt="Land pattern" class="full-width" }}

<p class="attribution">Dimensions in mm</p>


## Pin layout

{{imageOverlay src="/assets/images/power-module/power-module-pin.png" alt="Pin pattern" class="full-width"}}

<p class="attribution">Dimensions in mm</p>

- Male header pins are 0.1" spacing, 12 or 13 pins per side
- Two rows, spaced 0.8" (20.32mm) apart

The mating header is available from a large number of suppliers in both PTH and SMD styles.

| Style | Manufacturer | Model | Example |
| :--- | :--- | :---- | :--- |
| PTH (12) | Sullins | PPTC121LFBN-RC | [Digikey](https://www.digikey.com/product-detail/en/sullins-connector-solutions/PPTC121LFBN-RC/S6100-ND/807231) |
| PTH (13) | Sullins | PPTC131LFBN-RC | [Digikey](https://www.digikey.com/en/products/detail/sullins-connector-solutions/PPTC131LFBN-RC/810151) |
| SMD (12) | Sullins | NPTC121KFXC-RC | [Digikey](https://www.digikey.com/product-detail/en/sullins-connector-solutions/NPTC121KFXC-RC/S5604-ND/776062) |
| SMD (13) | Sullins | NPTC131KFXC-RC | [Digikey](https://www.digikey.com/en/products/detail/sullins-connector-solutions/NPTC131KFXC-RC/776063) |

## Schematic 

{{imageOverlay src="/assets/images/power-module/pm-bat-schematic.svg" alt="Module schematic" class="full-width"}}

## Ordering information

To be provided at a later date.


## Version history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-02-27 | RK | Initial version |
|          | 2024-02-28 | RK | Added plug-in version |
|          | 2024-03-12 | RK | Updated to v2, dimensions changed |
|          | 2024-04-08 | RK | Updated to v4, pin changes |
