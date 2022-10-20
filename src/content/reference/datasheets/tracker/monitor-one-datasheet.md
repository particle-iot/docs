---
title: Monitor One Datasheet
columns: two
layout: commonTwo.hbs
description: Monitor One Datasheet
---

# Monitor One Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/monitor-one-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

**Preliminary pre-release version 2022-10-19**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release datasheet and the contents are subject to change.
{{box op="end"}}



| | Tracker SoM | Tracker M | Tracker One | Monitor One |
| :--- | :---: | :---: | :---: | :---: |
| Style | SMD Module | Module | All-in-one | All-in-one |
| Enclosure | - | - | Included | Included |
| MCU | nRF52840 | RTL8721DM | nRF52840 | nRF52840 |
| Base board | Your design | Included | Included | Included |
| Expansion connector | Your design | 8-pin | M8 8-pin | Multiple options |
| GNSS Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| Cellular Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| USB Connector | Your design | Micro B | USB C | USB C |
| System RGB LED | Your design | Included | Included | Included |
| SETUP and MODE buttons | Your design | On board | Inside Enclosure | Inside Enclosure |
| External power | 3.9 - 17 VDC | 6 - 90 VDC | 6 - 30 VDC | 6 - 90 VDC |
| SPI | &check; | ??? | | Expansion card |
| I2C | &check; | ??? | M8 | Expansion card |
| Serial | &check; | ??? | M8 | Expansion card |
| External user button | n/a | n/a | | &check; |
| User RGB LEDs | | | | 2 |
| Temperature sensor | Your design | &check; | &check; | &check; |
| Battery temperature sensor | n/a | ??? | n/a | &check; |
| Controlling charging by temperature | Your design | ??? | In software | In hardware |

<sup>1</sup>On the Tracker One, the M8 can be configured for GPIO, I2C (SDA and SCL), or Serial (RX and TX) on two pins.

<sup>2</sup>Both internal and external GNSS and cellular antennas are supported, however the antenna style must be decided in advance as there in no software antenna switch.


## Internal connectors

- LiPo Battery connector (3-pin JST-PH, for battery with thermistor
- MCU USB (Micro B, vertical)
- User LED 1 and User LED 2
- User Button (externally accessible)
- RGB Status LED
- GNSS Antenna (internal) 
- GNSS Antenna connector U.FL
- Cellular antenna
- Cellular antenna connector U.FL
- SWD debugging connector
- VIN connector (JST-PH, 2 pin)
- Expansion card area


## Monitor One vs. Tracker One

### GPIO Pins

| Pin   | Monitor One | Tracker One |
| :---: | :---: | :---: |
| A0    | I2C SDA<sup>1</sup | Internal Thermistor |
| A1    | I2C SCL<sup>1</sup | User Button (not accessible) |
| A2    | External Button | GNSS lock indicator |
| A3    | Battery Temperature | M8 Analog in, GPIO |
| A4    | Analog in, GPIO, PWM, SPI MOSI<sup>1</sup> | Not available |
| A5    | Analog in, GPIO, PWM, SPI MISO<sup>1</sup> | Not available |
| A6    | Analog in, GPIO, PWM, SPI SCK<sup>1</sup> | Not available |
| A7    | Analog in, GPIO, PWM, SPI SS, WKP | Not available |
| TX    | Serial TX or GPIO<sup>1</sup> | MCU serial TX, GPIO D8, Wire3 SCL |
| RX    | Serial RX or GPIO<sup>1</sup> | MCU serial RX, GPIO D9, Wire3 SDA |

<sup>1</sup>Available on expansion card connector (internal)

- On the Monitor One, the expansion card connector allows the use the I2C, Serial, and SPI at the same time
- On the Tracker One, you must choose between using the M8 for either serial or I2C. SPI is not available.

## Expansion card interface

Unlike the Tracker One, the Tracker M is designed for expansion, with easy-to-use expansion headers and an enclosure with sufficient space inside for an expansion card, and for additional expansion connector through the wall of enclosure.

- Expansion card size: 2" x 3.5"
- Connector: 24-pin 0.1" headers (two, one on each long side)
- Attachment: 4 screw holes to standoffs

Pre-built expansion cards will be available, including a prototyping breadboard expansion card. You can also design and fabricate your own.



