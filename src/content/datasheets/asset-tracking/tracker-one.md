---
title: Tracker One
layout: datasheet.hbs
columns: two
order: 6
description: Datasheet for the Particle One Enclosure and Carrier Board
---

# Tracker One<sup>(011)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/tracker-one.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

![Tracker One](/assets/images/t-one.svg)

The Tracker One is a ready-to-go Tracker SoM carrier board with optional weatherproof enclosure.

- **Ready to go** with IP67-rated enclosure.
- **GNSS Antenna Onboard:** convenient high-gain GNSS antenna for easy access to GNSS signals.
- **Flexible Power Supply:** easily add asset tracking to most devices. A wide 6-30V power supply copes with most power delivery systems. Also accepts 5V supply via USB-C. LiPo battery connector with charge LED. Supports up to 90V when connecting directly to the carrier board.
- **High-precision Thermistor** with accuracy to 1%.
- **Extensible:** IP67-rated M8 connector includes CAN Bus, UART, GPIO, and power for simple expansion.
- **USB-C** for flashing, debugging and power with higher charging rates than Micro-USB.
- **RGB LED** for use as both a user-configurable device as well as Particle status information.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)


## Block Diagram

{{imageOverlay src="/assets/images/at-som/at-carrier-block-diagram.png" alt="Block Diagram" class="full-width"}}

---

## Description

{{imageOverlay src="/assets/images/at-som/tracker-open-labeled.png" alt="Labeled Diagram" class="full-width"}}


| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
|  1 | | GNSS Antenna |
|  2 | | Wi-Fi Antenna (mounted on side of case) |
|  3 | | NFC Antenna (mounted on lid) <sup>1</sup> |
|  4 | | Power and I/O connector (B8B-PH) |  
|  5 | | BLE Antenna (mounted on side of case) |
|  6 | | LiPo Connector |
|  7 | | M8 8-pin male connector (mounted on side of case) |
|  8 | | USB-C<sup>2</sup> |
|  9 | | NFC connector (connects to NFC antenna on lid) |
| 10 | | RGB Status LED |
| 11 | GNSS LED | GNSS Status LED |
| 12 | CHRG | LiPo charge status LED | 
| 13 | USER | User Button |
| 14 | RESET | RESET Button |
| 15 | MODE | MODE button |
| 16 | | Cellular Antenna  (mounted on side of case) |
| 17 | | USB-C switch<sup>3</sup> |
| 18 | | Thermistor |
| 19 | | JTAG connector (not populated)<sup>4</sup> |

---

<sup>1</sup>When disassembling the Tracker One, be careful when removing the lid. The NFC antenna and LiPo battery are mounted on the lid, and the NFC antenna cable is short. Carefully remove the NFC U.FL connector before fully removing the lid of the case. Reconnect to (9).

<sup>2</sup>The USB-C connector is normally connected to the nRF52840 MCU. It can be connected to the GNSS module by using the USB-C switch (17).

<sup>3</sup>The normal state is 1-4 OFF and 5-6 ON to connect the USB to the nRF52840. To connect the USB-C to the u-blox GNSS, turn 1-4 ON and 5-6 OFF. Disconnect the USB-C and the LiPo battery before changing the switch settings.

<sup>4</sup>The JTAG connector is not populated at the factory. The connector is a [Samtec FTSH-105-01-F-DV-K](https://www.digikey.com/product-detail/en/FTSH-105-01-F-DV-K/SAM8796-ND/2649974) 10 position (2x5), 1.27mm pitch.


---

### Power and I/O Connector (M8)

| M8 Pin | Function   | Function  | Function  | I/O | Color |
| :----: | :-------   | :-------  | :-------  | :--- | :--- |
| 1      | CAN_P      |           |           | IO<sup>2</sup> | Yellow |
| 2      | VIN<sup>3</sup> |      |           | I | Red |
| 3      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> | White | 
| 4      | Serial1 RX | Wire3 SDA | GPIO D8   | IO<sup>1</sup> | Green |
| 5      | Serial1 TX | Wire3 SCL | GPIO D9   | IO<sup>1</sup> | Brown |
| 6      | CAN_5V<sup>4</sup> |   | CAN_PWR   | O | Orange | 
| 7      | CAN_N      |           |           | IO<sup>2</sup> | Blue |
| 8      | GND        |           |           |   | Black | 


The IP67 M8, 8-pin, male pins with threaded barrel connector is accessible from the outside of the enclosure. 

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.

Note: Version 003 and earlier of this datasheet had a different pin numbering for M8 connector that didn't match the connector manufacturer's numbering. Only the numbering has changed; the function of the pin at a given location is unchanged and the change should not affect existing designs.

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>6.0 to 30 VDC at 2A when using the M8 connector. 6.0 - 90 VDC at 2A when connecting directly to the board.

<sup>4</sup>5V, 400 mA maximum. Controlled by the CAN_PWR GPIO.

Additional information on M8 cables and connectors can be found in the [M8 Accessories Datasheet](/datasheets/asset-tracking/tracker-m8-accessories/).

---

### Carrier Board Power and I/O Connector

The connector on the carrier board itself is is a [JST B8B-PH-SM4-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B8B-PH-SM4-TB-LF-SN/455-1740-1-ND/926837), 8-position, 2mm pitch, male pins, shrouded. The mating connector is the [JST PHR-8](https://www.digikey.com/product-detail/en/jst-sales-america-inc/PHR-8/455-1189-ND/608630). The female sockets are available plain, with leads, and in pre-manufactured ribbon cable formats.

| PHR-8 Pin | M8 Pin | Function  | Color          | 
| :-------: | :----: | :-------- | :------------- | 
| 1         | 2      | VIN       | Red            | 
| 2         | 1      | CAN_P     | Yellow         |  
| 3         | 7      | CAN_N     | Blue           |  
| 4         | 6      | CAN_5V    | Orange         |  
| 5         | 5      | TX_SCL_D9 | Brown          |  
| 6         | 4      | TX_SDA_D8 | Green          |  
| 7         | 3      | A3        | White          |  
| 8         | 8      | GND       | Black          |  


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

The **VIN** connector (6 to 30 VDC at 2A on the M8 connector, or 6 to 90 VDC at 2A to the B8B-PH connector on the board). This is useful with an external power supply.

The **LiPo** connector. This is typically used with a LiPo battery.

### USB connector

There is a single USB C connector on the carrier board. On the Tracker One, this exits the enclosure and is IP67 rated.

A set of DIP switches on the carrier board allow this port to be connected to either the MCU (normal) or u-blox GNSS (for firmware updates). The normal state is 1-4 OFF and 5-6 ON to connect the USB to the nRF52840. To connect the USB-C to the u-blox GNSS, turn 1-4 ON and 5-6 OFF. Disconnect the USB-C and the LiPo battery before changing the switch settings.

### LED Indicators

The **RGB LED** default behavior is:

- Red breathing: Attempting to connect to the cellular network
- Yellow breathing: Connecting to the cloud, weaker cellular signal
- Green breathing: Connecting to the cloud, good cellular signal
- Yellow solid: Connected to the cloud, weaker cellular signal
- Green solid: Connected to the cloud, good cellular signal

Alternatively the LED can be configured to the typical Particle color scheme (blinking green, blinking cyan, breathing cyan) via device or cloud configuration. Custom device firmware can provide other color schemes if desired.


The **CHRG** LED indicates the charge status:

- Off: Not charging or no power
- On: Charging
- Blinking: Charge fault
- Flickering: No battery

The **GNSS** LED indicates the GNSS fix status:

- Off: GNSS is powered off.
- Blinking (1 Hz): Attempting to get a GNSS fix
- On: Has a GNSS fix.

## Antennas

| Antenna | Location |
| :------ | :------- |
| GNSS | Carrier Board (faces top of case) |
| Wi-Fi | Left Side |
| BLE | Left Side |
| NFC | Top |
| Cellular | Right Side |

![Tracker One Antennas](/assets/images/at-som/tracker-one-antennas.png)

As the GNSS antenna faces the top of the case, you also want the top of the case facing the sky to the greatest extent possible. You will likely be be unable to get a GNSS lock with the top facing down.

---
## Tracker One Schematics

Will be provided at a later date.

---

## Peripheral Details

### Thermistor

The Tracker Carrier Board contains a 100K NTC thermistor, connected to A0. It is a [Panasonic ERT-J1VR104FM](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERT-J1VR104FM/P122067CT-ND/7069667) connected high-side.

![Thermistor](/assets/images/at-som/thermistor.png)

It can be read using the [getTemperature()](/reference/asset-tracking/tracker-edge-firmware/#gettemperature-) API. Note that this is the temperature on the board, within the enclosure, and will typically be several degrees warmer than the ambient temperature.

## Design Files

The Tracker Carrier Board in the Tracker One is open-source and the Eagle CAD design files are available in Github:

[https://github.com/particle-iot/tracker-hardware](https://github.com/particle-iot/tracker-hardware)


## Mechanical specifications

### Operating Temperature

| Parameter                        | Minimum | Maximum | Units |
| :------------------------------- | ---: | ---: | :---- |
| Operating temperature | -10 | 60 | &deg;C |
| Battery charging enabled | 0 | 50 | &deg;C |


### Dimensions and weight

| Parameter                        | Value | Units |
| :------------------------------- | ----: | :---- |
| Width                            |    88 | mm    |
| Length (case only)               |   146 | mm    |
| Length (including M8 connector)  |   154 | mm    |
| Thickness                        |    33 | mm    |
| Weight                           |   290 | g     |

Case Dimensions (mm):

{{imageOverlay src="/assets/images/at-som/tracker-one-case-dimensions.png" alt="Case Dimensions"}}

Bottom:

{{imageOverlay src="/assets/images/at-som/tracker-one-case-bottom.png" alt="Case Bottom"}}

Maximum Carrier Board Dimensions (mm):

{{imageOverlay src="/assets/images/at-som/tracker-one-case-dimensions.png" alt="Carrier Board Dimensions"}}

Note: The Tracker Carrier Board has a smaller bottom tab to provide space for the M8 connector.

---

### Power consumption (Tracker One 402)

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>startup</sub> |  |  |  | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> |  |  |  | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cloud_idle</sub> | | | | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cloud_pub</sub> |  |  |  | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 911 | 1140 | 1530 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 920 | 1120 | 1480 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 919 | 1130 | 1500 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | 136 | 1190 | 2880 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 772 | 1180 | 1790 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 993 | 1120 | 1510 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 11.2 | 17.3 | 116 | mA |
| STOP mode sleep, IMU wake-up | I<sub>stop_imu</sub> | 850 | 1150 | 1590 | uA |
| STOP mode sleep, CAN wake-up | I<sub>stop_can</sub> | 981 | 1200 | 1600 | uA |
| STOP mode sleep, GPS wake-up | I<sub>stop_gps</sub> | 29.3 | 36.1 | 50.2 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> |  | 201 | 552 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> |  | 190 | 593 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> |  | 188 | 558 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> | | 270 | 2150 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> | | 258 | 990 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 638 | 842 | 1200 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> | 13.9 | 16.9 | 86.0 | mA |
| ULP mode sleep, IMU wake-up | I<sub>imu_imu</sub> | | 225 | 642 | uA |
| ULP mode sleep, CAN wake-up | I<sub>can_can</sub> | 75.3 | 270 | 631 | uA |
| ULP mode sleep, GPS wake-up | I<sub>ulp_gps</sub> | 28.0 | 35.3 | 49.5 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | | 161 | 564 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | | 151 | 557  | uA |
| HIBERNATE mode sleep, external RTC wake-up | I<sub>hib_extrtc</sub> | | 151 | 562 | uA |
| HIBERNATE mode sleep, IMU wake-up | I<sub>hib_imu</sub> | | 185 | 669 | uA |
| HIBERNATE mode sleep, CAN wake-up | I<sub>hib_can</sub> | | 230 | 636 | uA |

---

### Power consumption (Tracker One 523)

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>startup</sub> | 24.2 | 132 | 689 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 51.2 | 112 | 594 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cloud_idle</sub> |  50.9 | 60.2 | 197 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cloud_pub</sub> | 57.2 | 173 | 702  | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 778 | 1010 | 1390 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 740 | 995 | 1390 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 758 | 993 | 1420 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | | 1050 | 2500 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 521 | 1050 | 1920 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 729 | 995 | 1390 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 19.2 | 21.5 | 151 | mA |
| STOP mode sleep, IMU wake-up | I<sub>stop_imu</sub> | 741 | 1020 | 1460 | uA |
| STOP mode sleep, CAN wake-up | I<sub>stop_can</sub> | 884 | 1080 | 1490 | uA |
| STOP mode sleep, GPS wake-up | I<sub>stop_gps</sub> | 28.0 | 34.8 | 49.0 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> |  | 172 | 556 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> |  | 165 | 526 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> |  | 164 | 561 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> |  | 228 | 1810 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> | | 231 | 1100 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 503 | 731 | 1169 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> | 18.6 | 20.9 | 212 | mA |
| ULP mode sleep, IMU wake-up | I<sub>imu_imu</sub> | | 194 | 534 | uA |
| ULP mode sleep, CAN wake-up | I<sub>can_can</sub> | 45.1 | 247 | 609 | uA |
| ULP mode sleep, GPS wake-up | I<sub>ulp_gps</sub> | 27.4 | 33.9 | 48.0 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | | 148 | 519 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | | 141 | 515  | uA |
| HIBERNATE mode sleep, external RTC wake-up | I<sub>hib_extrtc</sub> | | 140 | 525 | uA |
| HIBERNATE mode sleep, IMU wake-up | I<sub>hib_imu</sub> | | 178 | 544  | uA |
| HIBERNATE mode sleep, CAN wake-up | I<sub>hib_can</sub> | | 222 | 608  | uA |



---

## Product Handling

### ESD Precautions
The Tracker SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the module!

### Battery Warning

**CAUTION**

RISK OF EXPLOSION IF BATTERY IS REPLACED BY AN INCORRECT TYPE.
DISPOSE OF USED BATTERIES ACCORDING TO THE INSTRUCTIONS.

### Disposal

![WEEE](/assets/images/weee.png)

This device must be treated as Waste Electrical & Electronic Equipment (WEEE) when disposed of.

Any WEEE marked waste products must not be mixed with general household waste, but kept separate for the treatment, recovery and recycling of the materials used. For proper treatment, recovery and recycling; please take all WEEE marked waste to your Local Authority Civic waste site, where it will be accepted free of charge. If all consumers dispose of Waste Electrical & Electronic Equipment correctly, they will be helping to save valuable resources and preventing any potential negative effects upon human health and the environment of any hazardous materials that the waste may contain.


## Ordering Information

| SKU     | Description | Packaging |
| :---    | :--- | :--- |
| ONE402M | Tracker One LTE M1 (NorAm), [x1]	| Each |
| ONE523M | Tracker One LTE CAT1/3G/2G (Europe), [x1] | Each |
| TCAR	  | Tracker Carrier Board, [x1]	| Each |


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre1     | 2020 Apr 20 | RK | Preview Release1 |
| pre2     | 2020 May 12 | RK | Added partial dimensions |
| 001      | 2020 Jun 29 | RK | First release |
| 002      | 2020 Jun 30 | RK | CAN 5V is limited to 400 mA, not 500 mA |
| 003      | 2020 Jul 16 | RK | Corrected M8 pinouts |
| 004      | 2020 Aug 06 | RK | Corrected M8 pin numbering |
| 005      | 2020 Aug 09 | RK | Updated VIN voltages |
| 006      | 2020 Aug 10 | RK | Updated carrier board diagram |
| 007      | 2020 Sep 01 | RK | Added antenna diagram |
| 008      | 2020 Sep 08 | RK | Corrected USB connector description |
| 009      | 2020 Sep 25 | RK | Add battery warning |
| 010      | 2020 Oct 14 | RK | Add temperature range |
| 011      | 2020 Nov 05 | RK | Add power usage |
