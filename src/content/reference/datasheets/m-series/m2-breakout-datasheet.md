---
title: M.2 breakout board
columns: two
layout: commonTwo.hbs
description: M.2 breakout board
---

# {{title}}

The M.2 breakout board is a convenient way to prototype with the B-SoM and M-SoM modules.

## Block diagram



## Board features

{{imageOverlay src="/assets/images/m-series/M.2-breakout-labeled.png" alt="Board features" class="full-width no-darken"}}

| Label | Description |
| :--- | :--- |
|  1 | MCU USB-C (use this one) |
|  2 | SWD debugging connector |
|  3 | Cellular modem USB-C (not normally used) |
|  4 | LiPo battery power switch |
|  5 | LiPo battery connector (3-pin, with temperature sensor) |
|  6 | DC power switch |
|  7 | DC power barrel connector, 5-12 VDC (5.5mm x 2.1mm, center positive) |
|  8 | QWIIC (3.3V I2C connector) |
|  9 | Grove expansion connector |
| 10 | U.FL to SMA connectors |
| 11 | Spare M.2 SoM screws |
| 12 | NFC U.FL connector (B-SoM only, not available on M-SoM) |
| 13 | Expansion connector |
| 14 | D7 User LED (blue) |
| 15 | RESET button |
| 16 | RGB status LED |
| 17 | MODE button |
| 18 | Prototyping area |
| 19 | M.2 SoM socket for B-SoM or M-SoM |
| 20 | Power module |
| 21 | Adafruit Feather connector (for accessories) |
| 22 | Feather connector jumpers |
| 23 | Feather connector jumpers |
| 24 | VUSB jumper (only used on B-SoM) |
| 25 | LiPo temperature sensor bypass jumper (TS) |




### Powering the board

The M.2 breakout can be powered by:

| Num  | Description |
| :---: | :--- |
| 1 | USB-C ("MCU USB") |
| 5 | LiPo battery (3.7V LiPo with 3-pin JST-PH connector)
| 7 | VIN barrel connector 5-12 VDC (5.5mm x 2.1mm, center positive) |

- There are two USB C connectors on the breakout board, be sure to use connector 1 "MCU USB".
- The B524/B523 may require additional software settings in the PMIC when powering by USB due to the higher current requirements of 2G/3G. The B404X/B404/B402 (LTE Cat M1) can be powered by USB without a battery.
- When powering by VIN (barrel connector), 5-12 VDC is recommended, but up to 17 VDC can be supplied.
- Minimum power requirements are 5VDC @500mA (when the LiPo battery) or 5VDC @2000mA (without LiPo battery).
- If purchasing a LiPo battery from a 3rd-party supplier, beware as the polarity of the JST-PH connector is not standardized and may be reversed. Permanent damage to the breakout board can occur if powered by reverse polarity on the JST connector. See the [battery guide](/hardware/power/batteries/) for additional information.


### Jumpers (22)


### Jumpers (23)


## Basic setup

The basic setup for the B-SoM or M-SoM to be operational is shown below:

- Plug the cellular antenna into the U.FL connector labeled **CELL** on the SoM. Remember never to power up this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.
- If you are going to use BLE, connect the 2.4 GHz antenna (the smaller one) to the **BT** U.FL connector on the SoM.
- Connect power the USB (1) or a LiPo battery (2).
- Turn on the appropriate power switches (4, 6).

### Using the PMIC and fuel gauge (recommended)

There is support for bq24195 PMIC and MAX17043 fuel gauge in Device OS so you don't need to add any additional configuration.

| PMIC | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| PM\_INT | P0.05 | A6 | 45 |
| PM\_SDA | P1.13 | D0 | 22 |
| PM\_SCL | P1.15 | D1 | 20 |

It requires these jumpers, which should be installed at the factory:

- ADC6 to PM\_INT
- SDA to PM\_SDA
- SCL to PM\_SCL

If you are not using the PMIC be sure to remove the jumper if you need use pin A6 as an analog input or GPIO.

### Using ethernet

The M.2 breakout board does not contain Ethernet like the previous B-Series Eval board. You can, however, add it using the Adafruit Feather connector.

### Using Qwiic (8)



### Using the Grove connector (9)

| J11 | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| GND | | | |
| 3V3 | | | |
| ADC2 | P0.28 | A2 | 35 |
| ADC1 | P0.04 | A1 | 33 |



## Expansion header

### Expansion header - B-SoM

{{imageOverlay src="/assets/images/m2eval_nRF52.svg" alt="Expansion header" }}

### Expansion header - M-SoM

{{imageOverlay src="/assets/images/m2eval_rtl.svg" alt="Expansion header" }}


{{!-- B SoM eval board 3c7bdf46-c2a2-4b04-aeb1-222b761e036b --}}


## Schematics

To be provided at a later date.

---

## Mechanical specifications

### Dimensions and weight

To be provided at a later date.


## Revision history

| Revision | Date       | Author | Comments |
|:---------|:---------- |:-------|:---------|
| pre      | 2024-03-18 | RK     | Initial Release (based on board v0.2 20240315) |
