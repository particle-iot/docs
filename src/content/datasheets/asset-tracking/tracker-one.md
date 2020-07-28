---
title: Tracker One
layout: datasheet.hbs
columns: two
order: 6
description: Datasheet for the Particle One Enclosure and Carrier Board
---

# Tracker One<sup>(003)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/tracker-one.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

![Tracker One](/assets/images/t-one.svg)

The Tracker One is a ready-to-go Tracker SoM carrier board with optional weatherproof enclosure.

- **Ready to go** with IP67-rated enclosure.
- **GNSS Antenna Onboard:** convenient high-gain GNSS antenna for easy access to GNSS signals.
- **Flexible Power Supply:** easily add asset tracking to most devices. A wide 4.5-30V power supply copes with most power delivery systems. Also accepts 5V supply via USB-C. LiPo battery connector, charge LED, backup battery for GPS and battery-backed RTC. Supports up to 105V when connecting directly to the carrier board.
- **High-precision Thermistor** with accuracy to 1%.
- **Extensible:** IP67-rated M8 connector includes CAN Bus, UART, GPIO, and power for simple expansion.
- **USB-C** for flashing, debugging and power with higher charging rates than Micro-USB or for use without an internal battery.
- **RGB LED** for use as both a user-configurable device as well as Particle status information.
- **Backup Battery** for RTC and GNSS.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

![Top and Bottom](/assets/images/at-som/carrier-top-bottom.png)


## Block Diagram

![Block Diagram](/assets/images/at-som/at-carrier-block-diagram.png) 

## Description

<div align="center"><img src="/assets/images/at-som/at-som-carrier-labeled.png" class="full-width" /></div>

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

---

### Power and I/O Connector (M8)

| M8 Pin | Function   | Function  | Function  | I/O |
| :----: | :-------   | :-------  | :-------  | :--- |
| 1      | VIN<sup>3</sup> |      |           | I |
| 2      | CAN_H      |           |           | IO<sup>2</sup> |
| 3      | CAN_L      |           |           | IO<sup>2</sup> |
| 4      | CAN_5V<sup>4</sup> |   | CAN_PWR   | O |
| 5      | Serial1 TX | Wire3 SCL | GPIO D9   | IO<sup>1</sup> |
| 6      | Serial1 RX | Wire3 SDA | GPIO D8   | IO<sup>1</sup> |
| 7      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> |
| 8      | GND        |           |           |   |         

The IP67 M8, 8-pin, male pins with threaded barrel connector is accessible from the outside of the enclosure. 

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>4.5 to 30 VDC when using the M8 connector. 4.5 - 105 VDC when connecting directly to the board.

<sup>4</sup>5V, 400 mA maximum. Controlled by the CAN_PWR GPIO.

The connector on the carrier board itself is is a [JST B8B-PH-SM4-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B8B-PH-SM4-TB-LF-SN/455-1740-1-ND/926837), 8-position, 2mm pitch, male pins, shrouded. The mating connector is the [JST PHR-8](https://www.digikey.com/product-detail/en/jst-sales-america-inc/PHR-8/455-1189-ND/608630). The female sockets are available plain, with leads, and in pre-manufactured ribbon cable formats.


---

### Additional Peripherals

| Signal | Device OS | Description |
| :---: | :---: | :---
| THERM | A0 | NTC Thermistor |
| USER | A1 | USER button | 
| GNSS_LOCK | A2 | GNSS lock indicator |
| GPIO1 | A3 | GPIO on power and I/O connector |
| MCU TX | TX | MCU serial TX, GPIO D9, Wire3 SCL | 
| MCU RX | RX | MCU serial RX, GPIO D8, Wire3 SDA | 

Note: While the USER button exists inside the Tracker One, the Tracker One is a sealed unit and opening it will void the warranty and may affect certifications, thus it is not practical to use. It can be used with the Tracker Carrier Board.

---


### Powering the Tracker Carrier Board

There are several options for powering the carrier board:

The **MCU USB** connector (USB-C). If using a laptop with a USB-A to USB-C cable and a 500 mA USB port, you should also use the LiPo battery. With an true USB-C port and cable, or a 2A tablet charger, you can power only by USB.

The **VIN** connector (5-30 VDC on the M8 connector, or 4.5 to 105 VDC to the B8B-PH connector on the board). This is useful with an external power supply.

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

It will fast blink when connecting to the cellular network, and slow blink when connecting to the Particle cloud. 

Alternatively the LED can be configured to the typical Particle color scheme (blinking green, blinking cyan, breathing cyan) via device or cloud configuration. Custom device firmware can provide other color schemes if desired.


The **CHRG** LED indicates the charge status:

- Off: Not charging or no power
- On: Charging
- Blinking: Charge fault
- Flickering: No battery

The **GNSS** LED indicates the GNSS fix status:

- Blinking (1 Hz): Attempting to get a GNSS fix
- On: Has a GNSS fix.


## Tracker One Schematics

Will be provided at a later date.

---

## Peripheral Details

### Thermistor

The Tracker Carrier Board contains a 100K NTC thermistor, connected to A0. It is a [Panasonic ERT-J1VR104FM](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERT-J1VR104FM/P122067CT-ND/7069667) connected high-side.

![Thermistor](/assets/images/at-som/thermistor.png)

It can be read using the [getTemperature()](/reference/asset-tracking/tracker-edge-firmware/#gettemperature-) API.

## Mechanical specifications

### Dimensions and weight

| Parameter                        | Value | Units |
| :------------------------------- | ----: | :---- |
| Width                            |    88 | mm    |
| Length (case only)               |   146 | mm    |
| Length (including M8 connector)  |   154 | mm    |
| Thickness                        |    33 | mm    |
| Weight                           |       | g     |

Weight will be provided at a later date.

Case Dimensions (mm):

![Case Dimensions](/assets/images/at-som/tracker-one-case-dimensions.png)

Bottom:

![Case Bottom](/assets/images/at-som/tracker-one-case-bottom.png)

Maximum Carrier Board Dimensions (mm):

![Carrier Board Dimensions](/assets/images/at-som/tracker-carrier-dimensions.png)

Note: The Tracker Carrier Board has a smaller bottom tab to provide space for the M8 connector.

---

## Product Handling

### ESD Precautions
The Tracker SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the module!

### Disposal

![WEEE](/assets/images/weee.png)

This device must be treated as Waste Electrical & Electronic Equipment (WEEE) when disposed of.

Any WEEE marked waste products must not be mixed with general household waste, but kept separate for the treatment, recovery and recycling of the materials used. For proper treatment, recovery and recycling; please take all WEEE marked waste to your Local Authority Civic waste site, where it will be accepted free of charge. If all consumers dispose of Waste Electrical & Electronic Equipment correctly, they will be helping to save valuable resources and preventing any potential negative effects upon human health and the environment of any hazardous materials that the waste may contain.


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
| 001      | 29 Jun 2020 | RK | First release |
| 002      | 30 Jun 2020 | RK | CAN 5V is limited to 400 mA, not 500 mA |
| 003      | 16 Jul 2020 | RK | Corrected M8 pinouts |
