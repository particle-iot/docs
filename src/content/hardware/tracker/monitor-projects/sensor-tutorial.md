---
title: Sensor tutorial - Monitor One
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-projects,api-helper-tracker,zip]
---

# {{title}}

This is an example of how to:

- Create a custom Monitor One expansion card
- Add features to Monitor Edge to support additional sensors
- Add a configuration panel to the Particle console

While the specific implementation, using one or more DS18B20 1-Wire temperature sensors and a DS2482-100 I2C to 1-Wire bridge 
may not be what you need for your project, the general concepts apply to many types of sensors and other things you may
want to interface using a Monitor One expansion card.

## About 1-Wire

The 1-Wire protocol uses a single signaling wire for sensing, and in some cases also uses the same wire for power, making it 
possible to connect many sensors to a single bus using only two wires (signal+power, ground) or three wires (signal, power, ground).
You can connect large numbers of sensors over fairly long wires, up to tens of meters, sometimes longer.

Unlike I2C, which has fixed 7-bit addresses, 1-Wire has a unique 64-bit address assigned at the factory. Every sensor 
manufactured has a unique ID, and thus can be connected to a single bus and individually addressed without hardware configuration.


## Creating a board


### Design

The design files for Eagle CAD can be found in a zip file [here](/assets/files/projects/monitor-one-sensor-hardware.zip).

#### Schematic 
{{imageOverlay src="/assets/files/projects/monitor-one-sensor-hardware/mon-one-exp-1wire_p1.png" large="/assets/files/projects/monitor-one-sensor-hardware/mon-one-exp-1wire_p1.svg" alt="Schematic"}}

#### Board layout

{{imageOverlay src="/assets/files/projects/monitor-one-sensor-hardware/mon-one-exp-1wire_brd.png" large="/assets/files/projects/monitor-one-sensor-hardware/mon-one-exp-1wire_brd.svg" alt="Board layout"}}


### BoM

| Quan | Description | Example part | Price |
| :---: | :--- | :--- | ---: |
| 2 | SWITCH TACTILE SPST-NO 50MA 12V | [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) | $0.21|
| 1 | CONN HEADER SMD R/A 8POS 2MM | [JST S8B-PH-SM4-TB](https://www.digikey.com/en/products/detail/jst-sales-america-inc/S8B-PH-SM4-TB/926661) | $0.95| 
| 1 | CONN HEADER SMD 4POS 1MM | [JST BM04B-SRSS-TB](https://www.digikey.com/en/products/detail/jst-sales-america-inc/BM04B-SRSS-TB/926696) | $0.62 |
| 1 | TERM BLK 4POS SIDE ENT 3.5MM PCB | [On Shore OSTTE040161](https://www.digikey.com/en/products/detail/on-shore-technology-inc/OSTTE040161/614586) | $1.20 |
| 1 | IC I2C TO 1WIRE BRIDGE 8SOIC | [DS2482S-100+T&R](https://www.digikey.com/en/products/detail/analog-devices-inc-maxim-integrated/DS2482S-100-T-R/1197436) | $2.76 |
| 1 | IC EEPROM 64KBIT I2C 1MHZ 8SOIC | [Microchip 24CW640T-I/SN](https://www.digikey.com/en/products/detail/microchip-technology/24CW640T-I-SN/8594950) | $0.45 |
| 1 | CAP CER 0.1UF 25V X7R 0603 | [Samsung CL10B104KA8NNNC](https://www.digikey.com/product-detail/en/samsung-electro-mechanics/CL10B104KA8NNNC/1276-1006-1-ND/3889092) | |
| 1 | Male header pins 0.1" | [Sullins PRPC040SAAN-RC](https://www.digikey.com/product-detail/en/PRPC040SAAN-RC/S1011EC-40-ND/2775214) | |


### Assembly

This board is simple enough to pick-and-place by hand.

The example was built using solder paste applied with a stencil, but the pads are big enough that you could just use a dispenser tip instead of a stencil.

The example was reflowed using an inexpensive T962 reflow oven, but could be soldered using a hot air rework gun or even a soldering iron because the smallest parts of SOIC-8 with exposed leads.

{{imageOverlay src="/assets/images/monitor-one-sensor/board.jpeg" alt="Assembled board"}}

{{imageOverlay src="/assets/images/monitor-one-sensor/in-place.jpeg" alt="Assembled board"}}

Note: the images above show resistors next to the DS2482-100, which were accidentally copied and pasted into the first revision of the board. The I2C pull-ups are on the Monitor One base board and should not be added to the I2C bus on the expansion card and the Eagle CAD files above do not have these resistors.

### Testing



{{> project-browser project="monitor-one-sensor-test" default-file="src/MonitorOneTest1.cpp" height="400" flash="true"}}


## Monitor Edge firmware

This example project is based on Monitor Edge v2. It illustrates several concepts:

- Waking up briefly without establishing a cloud connection to poll sensors
- Publishing data on a set interval, or in an alarm condition
- Setting alarm values using a control panel and configuration synchronized from the cloud


## Configuration schema

The configuration schema adds an additional panel for "Sensors". It contains settings for multiple sensors, each including:

- Name
- 1-Wire hex ID (filled in automatically when scanning)
- Low temperature limit
- High temperature limit
- Hysteresis

