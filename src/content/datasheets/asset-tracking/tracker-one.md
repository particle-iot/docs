---
title: Tracker One
layout: datasheet.hbs
columns: two
order: 6
description: Datasheet for the Particle One Enclosure and Carrier Board
---

# Tracker One<sup>(pre2)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/tracker-one.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

**This is a preliminary datasheet and is subject to change**

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

The Tracker One is a ready-to-go Tracker SoM carrier board with optional weatherproof enclosure.

- **Ready to go** with IP67-rated enclosure.
- **GNSS Antenna Onboard:** convenient high-gain GNSS antenna for easy access to GNSS signals.
- **Flexible Power Supply:** easily add asset tracking to most devices. A wide 4.5-30V power supply copes with most power delivery systems. Also accepts 5V supply via USB-C. LiPo battery connector, charge LED, backup battery for GPS and battery-backed RTC. Supports up to 105V when connecting directly to the carrier board.
- **High-precision Thermistor** with accuracy to 1%.
- **Extensible:** IP67-rated M8 connector includes CAN Bus, UART, GPIO, and power for simple expansion.
- **USB-C** for flashing, debugging and power with higher charging rates than Micro-USB or for use without an internal battery.
- **RGB LED** for use as both a user-configurable device as well as Particle status information.
- **Backup Battery** for RTC and GNSS.
- **32 Kbyte SPI FRAM:** MB85RS256 ferroelectric RAM for non-volatile data storage.

![Top and Bottom](/assets/images/at-som/carrier-top-bottom.png)


## Block Diagram

![Block Diagram](/assets/images/at-som/at-carrier-block-diagram.png) 

## Description

<div align=center><img src="/assets/images/at-som/at-som-carrier-labeled.png"></div>

| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
|  1 | J1 | Power and I/O connector | 
|  2 | | RTC Battery |
|  3 | | LiPo Connector |
|  4 | | MCU USB-C |
|  5 | | RGB Status LED|
|  6 | USER | User Button |
|  7 | GNSS LED | GNSS Status LED |
|  8 | RESET | RESET Button |
|  9 | MODE | MODE button |
| 10 | CHRG | LiPo charge status LED | 
| 11 | | NFC |
| 12 | | JTAG/SWD debugging connector for nRF52 MCU |
| 13 | GNSS USB | u-blox GNSS USB connection (Micro USB) |
| 14 | | GNSS Antenna |
| 15 | | LiPo Battery |
| 16 | | Tracker SoM (on back side) |


### Power and I/O Connector (M8)

| M8 Pin | Function   | Function  | Function  | I/O |
| :----: | :-------   | :-------  | :-------  | :--- |
| 1      | VIN<sup>3</sup> |      |           | I |
| 2      | GND        |           |           |   |         
| 3      | CAN 5V<sup>4</sup> |   | CAN_PWR   | O |
| 4      | CAN+       |           |           | IO<sup>2</sup> |
| 5      | CAN-       |           |           | IO<sup>2</sup> |
| 6      | Serial1 TX | Wire2 SCL | GPIO D9   | IO<sup>1</sup> |
| 7      | Serial1 RX | Wire2 SDA | GPIO D8   | IO<sup>1</sup> |
| 8      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> |

This connector attaches to the IP67 M8 connector, accessible from the outside of the enclosure.

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>4.5 to 30 VDC when using the M8 connector. 4.5 - 105 VDC when connecting directly to the board.

<sup>4</sup>5V, 500 mA maximum. Controlled by the CAN_PWR GPIO.

### Additional Peripherals

| Signal | Device OS | Description |
| :---: | :---: | :---
| THERM | A0 | NTC Thermistor |
| USER | A1 | USER button | 
| GNSS_LOCK | A2 | GNSS lock indicator |
| GPIO1 | A3 | GPIO on power and I/O connector |
| FRAM_CS | A7 | Chip select for MB85RS256 SPI FRAM | 
| MCU TX | TX | MCU serial TX or GPIO D9 | 
| MCU RX | RX | MCU serial RX or GPIO D8 | 


### Powering the Tracker Carrier Board

There are several options for powering the evaluation board:

The **MCU USB** connector (USB-C). If using a laptop with a 500 mA USB port, you should also use the LiPo battery. With a 2A tablet charger, you can power only by USB.

The **VIN** connector (5-30 VDC). This is useful with an external power supply.

The **LiPo** connector. This is typically used with a LiPo battery.

### USB connectors

There are two USB connectors on the carrier board, however you most commonly will only use the **MCU USB** connector.

The **MCU USB** connector is connected to the nRF52 MCU and can be used for Serial debugging, flashing code, and setup by USB. It can also power the AssetTracker SoM. If using a laptop with a 500 mA USB port, you should also use the LiPo battery. With a 2A tablet charger, you can power only by USB.

The **GNSS USB** connector is connected to the u-blox NEO-M8U GNSS. It can be used for firmware upgrades or with the u-blox u-center application.

### LED Indicators

The **RGB LED** default behavior is to display cellular signal quality: 

- Red blinking: Attempting to connect to the cellular network
- Red: poor cellular signal
- Yellow: average cellular signal
- Green: good cellular signal

It will fast blink when connecting to the cellular network, and slow blink when connecting to the Particle cloud. This behavior can be overridden by custom application firmware.


The **CHRG** LED indicates the charge status:

- Off: Not charging or no power
- On: Charging
- Blinking: Charge fault
- Flickering: No battery

The **GNSS** LED indicates the GNSS fix status:

- Blinking (1 Hz): Attempting to get a GNSS fix
- On: Has a GNSS fix.


## Basic Setup

Will be provided at a later date.

## Evaluation Board Schematics

Will be provided at a later date.

---

## Mechanical specifications

### Dimensions and weight

| Parameter                        | Value | Units |
| :------------------------------- | ----: | :---- |
| Width                            |    88 | mm    |
| Length (case only)               |   145 | mm    |
| Length (including M8 connector)  |   154 | mm    |
| Thickness                        |    36 | mm    |
| Weight                           |       | g     |

Weight will be provided at a later date.


## Ordering Information

| SKU     | Description | Packaging |
| :---    | :--- | :--- |
| ONE402M | Tracker One LTE M1/2G (NorAm), [x1]	| Each |
| ONE523M | Tracker One LTE CAT1/3G/2G (Europe), [x1] | Each |
| TCAR	  | Tracker Carrier Board, [x1]	| Each |

## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre1     | 20 Apr 2020 | RK | Preview Release1 |
| pre2     | 12 May 2020 | RK | Added partial dimensions |

