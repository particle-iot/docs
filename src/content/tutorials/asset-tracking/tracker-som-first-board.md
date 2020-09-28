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

Features from the Tracker Carrier Board/Tracker One:

- GNSS LED<sup>1</sup>
- Thermistor<sup>1</sup>
- USER<sup>1</sup> button
- B8B-PH connector for connecting to an M8 connector (optional)
- 10-pin SWD/JTAG debug connector<sup>2</sup>
- SPI FRAM<sup>2</sup>

<sup>1</sup>Can be disabled by cutting a trace or re-enabled with a solder bridge
<sup>2</sup>Not populated on the Tracker One

Other features:

- CAN termination enable jumper
- Ability to add a mezzanine card for expansion including all ports, GPIO, CAN, and power options
- Optional GNSS/RTC backup battery (CR1220) with DIP switch to enable/disable
- GNSS and cellular USB connectors (optional)

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
| 11 | VIN Power Input, 6 - 18 VDC |
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

