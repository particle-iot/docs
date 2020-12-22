---
title: Tracker SoM First Board
columns: two
layout: tutorials.hbs
order: 45
description: A simple demonstration board for the Tracker SoM
---

# Tracker SoM First Board

This tutorial shows how to make a simple base board for the Tracker SoM that has a number of features from the Tracker Carrier Board (used in the Tracker One), however can easily be modified to fit your needs. 


Standard features:

- SETUP and MODE buttons
- RGB status LED
- Charge LED
- MCU USB connector
- NFC antenna connector

Features from the Tracker Carrier Board/Tracker One (all are optional):

- GNSS LED
- Thermistor
- USER button
- B8B-PH connector for connecting to an M8 connector
- 10-pin SWD/JTAG debug connector
- SPI FRAM

Other features:

- CAN termination enable jumper
- Ability to add a mezzanine card for expansion including all ports, GPIO, CAN, and power options
- Optional GNSS/RTC backup battery (CR1220) with DIP switch to enable/disable
- GNSS and cellular USB connectors (optional)
- Fits in an off-the-shelf IP67 weather-resistant enclosure
- Simple two-layer board is inexpensive to fabricate and can be developed in the free version of Eagle CAD



## Board Diagram

{{imageOverlay src="/assets/images/at-som/fb-labeled.png" alt="Board Diagram" class="full-width"}}

| Item | Description |
| ---: | :--- |
|  1 | SWD/JTAG 10-pin debug connector |
|  2 | NFC Antenna U.FL |
|  3 | USER button (A1) |
|  4 | RGB Status LED |
|  5 | RESET button |
|  6 | GNSS LED, blue (A2) |
|  7 | MODE button |
|  8 | Charge LED, orange |
|  9 | GNSS/RTC battery, CR1220 |
| 10 | LiPo battery connector, JST-PH |
| 11 | VIN Power Input, 3.9 - 17 VDC |
| 12 | GNSS/RTC battery switch |
| 13 | Trace jumpers for A0, A1, A2 |
| 14 | CAN Termination jumper (0.1") |
| 15 | B8B-PH connector to M8 connector |
| 16 | MCU USB (Micro B) | 
| 17 | Expansion Connector Left |
| 18 | Expansion Connector Right |
| 19 | GNSS USB (Micro B) |
| 20 | SPI FRAM |
| 21 | Cellular USB (Micro B) |
| 22 | Thermistor |
| 23 | Tracker SoM |

In enclosure:

{{imageOverlay src="/assets/images/at-som/fb-enclosure.jpg" alt="With mezzanine" class="full-width"}}


With mezzanine expansion board installed:

{{imageOverlay src="/assets/images/at-som/fb-with-mez.jpg" alt="With mezzanine" class="full-width"}}


## Schematic and Board Layout

{{imageOverlay src="/assets/images/at-som/fb-schematic.png" alt="Schematic" class="full-width"}}

{{imageOverlay src="/assets/images/at-som/fb-board-layout.png" alt="Board Layout" class="full-width"}}

The Eagle CAD files can be found in the [Github repository](https://github.com/particle-iot/app-notes/tree/master/AN025-Tracker-SoM-First-Board) for this project. The eagle directory contains:

| Filename | Contents |
| :--- | :--- |
| TrackerBase2.brd | Board layout file for Eagle CAD |
| TrackerBase2.sch | Schematic file for Eagle CAD |
| TrackerBase2v2.zip | Gerber files used to produce the board at JLCPCB |
| TrackerBase2.cam | The CAM file used to generate the Gerber files |
| TrackerBase2.lbr | Eagle library file with all of the components used in TrackerBase2 |
| TracerBaseExp2.brd | Board layout file for the mezzanine card |
| TracerBaseExp2.src | Schematic file for the mezzanine card |


### BoM (Bill of Materials)

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 1 | CN1 | CONN HEADER VERT 2POS 2MM | [JST B2B-PH-K-S(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B2B-PH-K-S-LF-SN/455-1704-ND/926611) | $0.17 |
| 2 | C1, C2 | CAP CER 47PF 100V C0G/NP0 0603 | [Murata Electronics GCM1885C2A470FA16D](https://www.digikey.com/product-detail/en/murata-electronics/GCM1885C2A470FA16D/490-16408-1-ND/7363390) | $0.22 |
| 1 | D1 | LED ORANGE CLEAR 0603 SMD | [Lite-On LTST-C193KFKT-5A](https://www.digikey.com/product-detail/en/lite-on-inc/LTST-C193KFKT-5A/160-1829-1-ND/2356249) | $0.41 | 
| 1 | D2 | LED BLUE CLEAR 0603 SMD | [Lite-On LTST-C193TBKT-5A](https://www.digikey.com/product-detail/en/lite-on-inc/LTST-C193TBKT-5A/160-1827-1-ND/2355044) | $0.47 | 
| 2 | D3, D4 | TVS DIODE 22V 38V SOT23-3 | [ON Semi MMBZ27VCLT1G](https://www.digikey.com/product-detail/en/on-semiconductor/MMBZ27VCLT1G/MMBZ27VCLT1GOSCT-ND/964555) | $0.20 |
| 3 | J1, J4, J7 | CONN RCPT USB2.0 MICRO B SMD R/A | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 
| 1 | J2 | CONN UMCC JACK STR 50OHM SMD | [TE AMP 1909763-1](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/1909763-1/A118077CT-ND/4729711) | $0.50 |
| 1 | J3 | CONN HEADER SMD 10POS 1.27MM| [Samtec FTSH-105-01-F-DV-K](https://www.digikey.com/product-detail/en/FTSH-105-01-F-DV-K/SAM8796-ND/2649974) | $2.90 |
| 1 | J8 | TERM BLOCK 2POS 45DEG 3.5MM PCB | [Phoenix Contact 1988956](https://www.digikey.com/product-detail/en/phoenix-contact/1988956/277-1779-ND/950907) | $0.48 | 
| 2 | JP1, JP2 | CONN HDR 10POS 0.1 TIN PCB | [Sullins PPTC101LFBN-RC](https://www.digikey.com/product-detail/en/sullins-connector-solutions/PPTC101LFBN-RC/S7008-ND/810149) | $0.65 |
| 1 | JP3 | Male header pins 0.1" | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | | 
| 1 | LED1 | RGB LED 4PLCC | [Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) | $0.19 |
| 3 | R1 - R3 | RES SMD 1K OHM 0.5% 1/5W 0603  | [Panasonic ERJ-PB3D1001V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PB3D1001V/P20283CT-ND/6214538) | | 
| 1 | R4 | RES SMD 10K OHM 5% 1/4W 0603 | [Panasonic ERJ-PA3J103V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PA3J103V/P10KBZCT-ND/5036237) | |
| 1 | R5 | RES SMD 270 OHM 5% 1/10W 0603 | [Panasonic ERJ-3GEYJ271V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3GEYJ271V/P270GCT-ND/134766) | |
| 2 | R6, R10 | RES SMD 100 OHM 5% 1/10W 0603 | [Panasonic ERJ-3GEYJ101V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3GEYJ101V/P100GCT-ND/134714) | |
| 1 | R7 | RES SMD 120 OHM 1% 1/10W 0603  | [Panasonic ERJ-3EKF1200V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF1200V/P120HCT-ND/1746726) | | 
| 1 | R8 | RES SMD 100K OHM 1% 1/10W 0603 | [Panasonic](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF1003V/P100KHCT-ND/198110) | | 
| 1 | R9 | THERM NTC 100KOHM 4200K 0603 | [Panasonic ERT-J1VR104FM](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERT-J1VR104FM/P122067CT-ND/7069667) | | 
| 3 | S1 - S3 | 4.5mm tactile switch | [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) | $0.20 |
| 1 | S4 | SWITCH ROCKER DIP DPDT 150MA 30V| [Grayhill 76SD01T](https://www.digikey.com/en/products/detail/grayhill-inc/76SD01T/2680736) | $3.84 |
| 1 | U1 | Tracker SoM T402 or T523 | | |
| 1 | U2 | IC FRAM 256K SPI 33MHZ 8SOP | [Fujitsu MB85RS256BPNF-G-JNERE1](https://www.digikey.com/product-detail/en/fujitsu-electronics-america-inc/MB85RS256BPNF-G-JNERE1/865-1251-1-ND/4022686) | $3.75 |
| 1 | U$4 | BATTERY HOLDER COIN 12.5MM SMD | [Keystone 1056TR ](https://www.digikey.com/product-detail/en/keystone-electronics/1056/36-1056-ND/2020198) | $1.09 |
| 1 | | BOX ABS GRAY/CLR 4.94"L X 3.36"W | [Hammond RP1135C](https://www.digikey.com/product-detail/en/hammond-manufacturing/RP1135C/HM5789-ND/2570603) | $10.48 |


For the M8 connection, you can choose one (or none) of the following:

| Quantity | Part | Description | Example | Cost | 
| :---: | :--- | :--- | :--- | ---: | 
| 1 | J5 | Conn SMD 8 position 2.00mm | [JST B8B-PH-SM4-TB(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B8B-PH-SM4-TB-LF-SN/455-1740-1-ND/926837) | $1.00 |
|   | J6 | Male Header Pins (8x0.1") | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | |
| 1 | J6 | Screw Terminal Block 8x0.1" PTH | [On Shore OSTVN08A150](https://www.digikey.com/product-detail/en/on-shore-technology-inc/OSTVN08A150/ED10566-ND/1588868) | $2.36 | 


### Board Design Notes

#### RGB Status LED

![Switch and LED](/assets/images/at-som/fb-switch-led.png)

We recommend including the RGB status LED as it is very difficult to see what the device is doing without it. 

Device OS assumes a common anode RGB LED. This design uses a [Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) which is inexpensive and easily procured.

This design includes 1K current limiting resistors. These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. If you want maximum brightness you should use the calculated values, 33 ohm on red, and 66 ohm on green and blue.

This design also includes the orange charge LED (recommended) and the blue GNSS fix LED connected to A1/D1 (optional). While the charge LED is connected to the PMIC directly, the GNSS LED is connected to a GPIO. 

#### Buttons

The RESET and MODE buttons are highly recommended as well. Even if you don't include the buttons, having a way to trigger them, such as by test points, is beneficial.

The MODE line must have a 10K pull-up resistor to 3V3, but the RESET button does not need one.

This design also includes the USER button from the Tracker Carrier Board/Tracker One, connected to pin A1/D1. If you want to use this pin for GPIO instead of the button, you can cut a trace jumper or not populate the button. It does not require a pull-up resistor. There is a 100 ohm series resistor in case code drives A1 high as an output and the button is pressed. The series resistor limits the current and prevent a direct short but is small enough to overcome the 13K software-enabled pull-up. For your own designs, feel free to eliminate this.

This design uses an [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) which is a 4.5mm SMD tactile button switch. It's much larger than the switch on the Boron but much easier to manipulate with your fingers. 

You may want to use a smaller switch on your boards to save space.

#### USB Connectors

A MCU USB connector is highly recommended for software updates, serial debugging, and low-level operations like resetting keys.

Because this board is designed to be installed in an enclosure, right-angle connectors are used because the sides of the board are blocked by the enclosure. 

There are three connectors:

| Connector | Description |
| :--- | :--- |
| MCU USB | Connected to the nRF52840 MCU. Highly recommended. |
| GNSS USB | Connected to the u-blox NEO-M8 GNSS |
| CELL USB | Connected to the Quectel cellular modem |

This design uses a [GCT USB3131-30-0230-A](https://www.digikey.com/product-detail/en/gct/USB3131-30-0230-A/2073-USB3131-30-0230-ACT-ND/9859713) USB Micro B, through hole, for the USB connector. This provides additional stability since they're right-angle and also makes it easy to not populate the GNSS and CELL USB connectors and solder them in later if needed.

#### Tracker One Options

![Carrier Board Options](/assets/images/at-som/fb-carrier-board-options.png)

This board includes three features from the Tracker One/Tracker Carrier Board:

- Thermistor (A0)
- USER button (A1)
- GNSS LED (A2)

All are connected by normally closed trace jumpers (SJ1 - SJ3). If you want to use these pins are GPIO and disable the feature, cut the trace between the two pads. You can re-enable it later by adding a drop of solder.

The [thermistor](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERT-J1VR104FM/P122067CT-ND/7069667) is a 100K&ohm;, 4200&deg;K NTC thermistor. The Tracker Edge firmware includes library to read it. You can modify the setup code to use a different type of thermistor if desired.

The USER button pulls A1 to ground when pressed. It's normally configured as INPUT_PULLUP when used. The 100 ohm series resistor prevents a direct short if A1 is accidentally configured as OUTPUT HIGH and the button pressed.

The GNSS blue LED is connected to pin A2. There's a 100 ohm current-limiting resistor and the GPIO is connected to the cathode, so the LED will be turned on for OUTPUT LOW.

#### RTC and GNSS battery

![Battery Switch](/assets/images/at-som/fb-bat-switch.png)

This board contains an optional CR1220 lithium coin cell battery to power the GNSS battery backup for ephemeris and almanac data, and for RTC backup. This is optional.

The DPDT DIP switch is necessary because without the battery the GNSS_BAT must be connected to 3V3 but RTC_BAT must be connected to GND. In your own design, you can omit the DIP switch and just make the preferred connections, eliminating the switch.

#### SPI FRAM

This design includes a space for an optional SPI FRAM (ferroelectric non-volatile RAM). This allows for storage of data that is maintained when the power is removed. Unlike flash memory, FRAM has significantly faster writes and does not have wear limits. It's ideal for small amounts of frequently changing data.

One such FRAM is the Fujitsu Electronics America, Inc. [MB85RS256BPNF-G-JNERE1](https://www.digikey.com/product-detail/en/fujitsu-electronics-america-inc/MB85RS256BPNF-G-JNERE1/865-1251-1-ND/4022686), 32 Kbytes, in an 8-SOP package. Retail single-unit cost is $3.75. There are larger and smaller FRAM available that are compatible.

Note that this an SPI FRAM. There is also a nearly identical I2C FRAM (MB85RC256, note the "C" for I2C) and that is not compatible with this design. The SPI CS line is A7/D7.

#### CAN interface

![CAN Interface](/assets/images/at-som/fb-can.png)

The CAN interface has two capacitors and two TVS diodes for protection. 

| Quantity | Part | Description | Example | Cost |
| :---: | :--- | :--- | :--- | ---: |
| 2 | C1, C2 | CAP CER 47PF 100V C0G/NP0 0603 | [Murata Electronics GCM1885C2A470FA16D](https://www.digikey.com/product-detail/en/murata-electronics/GCM1885C2A470FA16D/490-16408-1-ND/7363390) | $0.22 |
| 2 | D3, D4 | TVS DIODE 22V 38V SOT23-3 | [ON Semi MMBZ27VCLT1G](https://www.digikey.com/product-detail/en/on-semiconductor/MMBZ27VCLT1G/MMBZ27VCLT1GOSCT-ND/964555) | $0.20 |

Additionally, header JP3 (two male header pins, 0.1"), are connected to a 120 ohm CAN termination resistor. Including the two-pin jumper enables the 120 ohm CAN termination.

#### Tracker SoM Footprint

This design uses the device "TRACKER-SOM-SKIP-NC". This is the standard Tracker SoM device, symbol and footprint "TRACKER-SOM" except it removes all of NC pins and pads where there are two or more adjacent NC.

While you can route a single 0.006" trace between the pads on the Tracker SoM base board, if you knock out all of the spaces where there is more than one adjacent NC pad, the are great wide swaths in which to route traces, which is very handy on a two-layer board. There is more than enough solder to keep the SoM in place without those pads.


#### Mezzanine Board

![Mezzanine Board](/assets/images/at-som/fb-mez.jpg)

The mezzanine board will be discussed in a future application note, however as a bit of background:


![Mezzanine Board Layout](/assets/images/at-som/fb-mez-board-layout.png)

- Board size: 3" x 1.5"
- Base board has 2x 10-pin female headers
- Mezzanine board has 2x 10-pin male headers on the bottom of the board
- Optional 10mm standoffs to securely fasten the boards together
- Access to all ports (I2C, SPI, Serial, CAN) and GPIO
- Access to all power supplies (3V3, CAN_5V, VIN, Li+)

Left Connector:

| Pin  | Description |
| :--- | :--- |
| TX | Serial TX, Wire3 SCL, or GPIO D8 |
| RX | Serial RX, Wire3 SDA, or GPIO D9 |
| CAN_5V | 5V 400 mA, controlled by CAN_PWR |
| CAN_P | CAN+, CANP, or CANH |
| CAN_N | CAN-, CANN, or CANL |
| NC | |
| A3 | A3, D3, Serial1 RTS |
| A2 | A2, D2, Serial1 CTS, GNSS lock indicator |
| A1 | A1, D1, Wire SCL, USER button |
| A0 | A0, D0, Wire SDA, Thermistor |

Right Connector:

| Pin  | Description |
| :--- | :--- |
| A7 | A7, D7, SS, WKP |
| A6 | A6, D6, SPI SCK |
| A5 | A5, D5, SPI MISO |
| A4 | A4, D4, SPI MOSI |
| NC | |
| NC | |
| 3V3 | 3.3V. Output from 3.3V regulator on Tracker SoM |
| VIN | Connected to VIN directly. Can be used to supply Tracker power 3.9 - 17 VDC. |
| LI+ | Connected to LiPo battery+ directly. |
| GND | Ground |

## Assembly

This is the board that I received from [JLCPCB](https://jlcpcb.com). I've also ordered many boards from [OshPark](https://oshpark.com).

![Board](/assets/images/at-som/fb-assembly-1.jpg)

The components on this board had big enough pads that you can apply solder paste with the syringe tip, however there are so many pads on the Tracker SoM you will almost certainly want a stencil. I ordered mine with my board from JLCPCB, but if you order a board from OshPark you can get the stencil separately from [Osh Stencils](https://oshstencils.com). 

These little plastic guides from Osh Stencils make it easy to keep the stencil flat.

![Stencil Guide](/assets/images/at-som/fb-assembly-2.jpg)

Stencil in place:

![Stencil Guide](/assets/images/at-som/fb-assembly-3.jpg)

This board came out pretty clean, but sometimes you'll get some excess solder paste if the stencil didn't stay perfectly flat and stationary. It's a good idea to clean this up; I use a small dental-style scraper tool for this.

These inexpensive digital microscopes are ideal for assembling boards. I prefer this style with the integrated display vs. the ones that connect to a laptop. There's generally less lag with these, which makes it possible to do assembly and adjustment under the microscope while looking at the screen.

![Microscope](/assets/images/som-first-board/microscope.jpg)

I prefer to use low-temperature lead-free solder paste, in this case Sn42/Bi57/Ag1 with a melting point 137°C (278°F).

![Microscope](/assets/images/som-first-board/solder-paste.jpg)

Here's the board cleaned up and ready for parts.

![Solder Paste](/assets/images/at-som/fb-assembly-4.jpg)

This board uses 0603-sized components that are easily placed by hand. I use these two tools, but some prefer tweezers over forceps. 

![Tools](/assets/images/som-first-board/tools.jpg)

### Reflow

I used an inexpensive [T962 reflow oven](https://www.amazon.com/SMTHouse-Infrared-Soldering-Machine-Automatic/dp/B0152FTXN2/ref=sxts_sxwds-bia) to build this board. It's not the most accurate and there are some hot and cold zones, but works fine here.

![Reflow Oven](/assets/images/som-first-board/reflow.jpg)

The Sn42/Bi57/Ag1 low-temperature solder paste can be reflowed using Wave 1. 

### Add the PTH components

The first component I added was the power input connector, J8. I selected the [Phoenix Contact 1988956](https://www.digikey.com/product-detail/en/phoenix-contact/1988956/277-1779-ND/950907) because the 45&deg; design make it easy to both connect wires and use the screw terminals while inside the enclosure with the cover removed.

![Power Input](/assets/images/at-som/fb-assembly-5.jpg)

With this, I connected the power to a bench supply and it booted up! Now add the rest:

- LiPo battery connector (JST-PH)
- GNSS/RTC battery DIP switch
- MCU USB
- CELL and GNSS USB (optional - can add later if needed)
- 2x 10-pin female headers for mezzanine card
- 2-pin male header for CAN termination jumper

That should be it!

A future update to this tutorial will include some power and antenna options.

## Other Designs

The Tracker SoM Evaluation board and Carrier Board (the board in the Tracker One) are open-source and the Eagle CAD design files are available in the [Tracker Hardware Github repository](https://github.com/particle-iot/tracker-hardware).
