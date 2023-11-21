---
title: Tracker SoM first board
layout: commonTwo.hbs
columns: two
---
# {{title}}

This tutorial shows how to make a simple base board for the Tracker SoM that has a number of features from the Tracker Carrier Board (used in the Tracker One), however can easily be modified to fit your needs. 

The full tutorial can be found in [the documentation](/hardware/tracker/tracker-som/tracker-som-first-board/). 

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN025.zip).

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

{{note op="start" type="note"}}
First board and basic design examples are intended to be easily hand-assembled on inexpensive 
2-layer circuit boards using easily available parts. They are not intended to be reference examples of best 
practices for electronic design.
{{note op="end"}}


## Board diagram

![Labeled](/assets/images/app-notes/AN025/fb-labeled.png)

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

![Enclosure](/assets/images/app-notes/AN025/fb-enclosure.jpg)


With mezzanine expansion board installed:

![With mezzanine](/assets/images/app-notes/AN025/fb-with-mez.jpg)

For information on production soldering and stencils, see [AN036 LCC Module SMT](/scaling/manufacturing/lcc-module-smt/) for information about SMT processes for LCC (Leadless Chip Carrier) devices such as the Tracker SoM.
