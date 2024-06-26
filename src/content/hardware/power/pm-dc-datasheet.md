---
title: PM-DC power module datasheet
columns: two
layout: commonTwo.hbs
description: PM-DC power module (DC input, no battery) datasheet
---

# PM-DC power module datasheet

## Overview

The Particle PM-DC power module is a small module that contains:

- 5 - 24VDC input
- 3.3V regulated output for MCU (1A)
- 4.0V output for cellular modem (2.5A)

It can either be:

- A castellated module intended to be reflow soldered to your M.2 SoM base board
- A module with male pins on the bottom that can be plugged into a socket on your M.2 SoM base board

The [PM-BAT](/hardware/power/pm-bat-datasheet/) power module is also available if you would like
support for a LiPo battery as well as DC input.


## Block diagram

{{imageOverlay src="/assets/images/power-module/pm-dc-block-diagram.png" alt="Dimensions" class="full-width"}}


## Dimensions

{{imageOverlay src="/assets/images/power-module/power-module-dimensions.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in mm</p>

- Module is 35mm x 22.86mm (1.38" x 0.9")
- Pins and castellated holes are 2.54mm (0.1") apart

## Pinout

{{imageOverlay src="/assets/images/power-module/pm-dc-pinout.svg" alt="Pinout" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated cccd005a-023b-4ae4-90a6-41a6764199bf --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 1 | 3V3 | Power output 3.3V |
| 2 | 3V3_AUX | Power output 3.3V, controllable |
| 3 | 5V | Power output 5V (not available on this module) |
| 4 | 5V | Power output 5V (not available on this module) |
| 5 | VCC | Power output 3.9V 2A for cellular modem |
| 6 | VCC | Power output 3.9V 2A for cellular modem |
| 7 | EN_AUX | Enable 33_AUX (has 100K pull-down to default off) |
| 8 | NC | Leave unconnected |
| 9 | GND | Ground |
| 10 | GND | Ground |
| 11 | VIN | Power in (4V - 40V) |
| 12 | VIN | Power in (4V - 40V) |
| 13 | NC | Leave unconnected (charge indicator on PM-BAT) |
| 14 | NC | Leave unconnected (SCL on PM-BAT) |
| 15 | NC | Leave unconnected (SDA on PM-BAT) |
| 16 | NC | Leave unconnected (FUEL_INT on PM-BAT) |
| 17 | NC | Leave unconnected (temperature sensor on PM-BAT) |
| 18 | NC | Leave unconnected (VBAT on PM-BAT) |
| 19 | NC | Leave unconnected (VBAT on PM-BAT) |
| 20 | NC | Leave unconnected (VBAT on PM-BAT) |
| 21 | GND | Ground |
| 22 | GND | Ground |
| 23 | NC | Leave unconnected (MCU reset on PM-BAT) |
| 24 | NC | Leave unconnected (power good on PM-BAT) |
| 25 | ENABLE | Power output enable. Has internal pull-up to VSYS, pull to GND to disable power outputs. |


{{!-- END do not edit content above, it is automatically generated  --}}

`3V3_AUX` is powered by `3V3` via a load switch (TPS22918). It can supply up to the full 2A of `3V3`. It defaults to off due to a pull-down resistor on the pin. Pull to `3V3` to enable the `3V3_AUX` output.

If your base board is designed for the PM-BAT power module, you can substitute the PM-DC and the PM-DC power module will function properly, but
features such as power management, battery input, charge LED, etc. will not be available, of course.

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

{{imageOverlay src="/assets/images/power-module/pm-dc-schematic.svg" alt="Module schematic" class="full-width"}}

---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated ce788a12-7fda-4377-adc4-cd86329af29c --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| PMDCH1EA | Particle Power Module, DC, with Header | In development |
| PMDCH1TY | Particle Power Module, DC, with Header | In development |
| PMDCNH1EA | Particle Power Module, DC, No Header | In development |
| PMDCNH1TY | Particle Power Module, DC, No Header | In development |


{{!-- END do not edit content above, it is automatically generated --}}




## Version history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-04-15 | RK | Pre-release |
| 001      | 2024-06-27 | RK | Initial version |
