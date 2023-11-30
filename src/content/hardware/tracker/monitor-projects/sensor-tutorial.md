---
title: Sensor tutorial - Monitor One
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper, api-helper-config, api-helper-extras, api-helper-json, api-helper-projects, api-helper-tracker, codemirror, zip]
---


# {{title}}

This is an example of how to:

- Create a custom Monitor One expansion card
- Add features to Monitor Edge to support additional sensors
- Add a configuration panel to the Particle console

While the specific implementation, using one or more DS18B20 1-Wire temperature sensors and a DS2482-100 I2C to 1-Wire bridge 
may not be what you need for your project, the general concepts apply to many types of sensors and other things you may
want to interface using a Monitor One expansion card.

To use the interactive tools in this tutorial you must log into your Particle account.

{{> sso}}

It's highly recommended that you create a new product to run this tutorial. It can be difficult to completely remove 
a custom configuration from both the cloud and devices, and will result in a warning every time you make a change in the 
console after removing the custom configuration schema from a product.

{{> tracker-select-product options="platform=26,monitor,name=monitor"}}

## About 1-Wire

The 1-Wire protocol uses a single signaling wire for sensing, and in some cases also uses the same wire for power, making it 
possible to connect many sensors to a single bus using only two wires (signal+power, ground) or three wires (signal, power, ground).
You can connect large numbers of sensors over fairly long wires, up to tens of meters, sometimes longer.

Unlike I2C, which has fixed 7-bit addresses, 1-Wire has a unique 64-bit address assigned at the factory. Every sensor 
manufactured has a unique ID, and thus can be connected to a single bus and individually addressed without hardware configuration.

While it's possible to implement 1-Wire in software only on the Tracker SoM, using an I2C to 1-Wire bridge chip (DS2482-100) 
greatly simplifies the software and provides fully asynchronous operation. 

## Creating a board


### Design

The design files for Eagle CAD can be found in a zip file [here](/assets/files/projects/monitor-one-sensor-hardware.zip).

It's based on the [Monitor One prototype card](https://github.com/particle-iot/monitor-one) design, but without the PTH prototyping area. It also has different switches for the RESET and MODE buttons (optional), and of course the circuitry for the DS2482-100.

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

You can order a board from a service like [OshPark](https://oshpark.com). This board was ordered from [JLCPCB](https://jlcpcb.com).

This board is simple enough to pick-and-place the components by hand.

The example was built using solder paste applied with a stencil, but the pads are big enough that you could just use a dispenser tip instead of a stencil.

The example was reflowed using an inexpensive T962 reflow oven, but could be soldered using a hot air rework gun or even a soldering iron because the smallest parts is SOIC-8 with exposed leads. The 0603 capacitor and qwiic I2C connector might be a little difficult to solder with a soldering iron.

{{imageOverlay src="/assets/images/monitor-one-sensor/board.jpeg" alt="Assembled board"}}

{{imageOverlay src="/assets/images/monitor-one-sensor/in-place.jpeg" alt="Assembled board"}}

Note: the images above show resistors next to the DS2482-100, which were accidentally copied and pasted into the first revision of the board. The I2C pull-ups are on the Monitor One base board and should not be added to the I2C bus on the expansion card and the Eagle CAD files above do not have these resistors.

### Testing

Whenever you have a custom board, it's always useful to have test firmware specifically for making sure your hardware works.

{{> project-browser project="monitor-one-sensor-test" default-file="src/MonitorOneTest1.cpp" height="400" flash="true"}}


This test firmware implements an I2C scanner, to determine which I2C devices are on the bus. There should be four devices on the I2C bus. 
The ADP8866 and STS31 are on the Monitor One base board, and the DS2482 and 24CW640 are located on the expansion card.

```
0002240000 [app] INFO: Starting I2C scan...
0002240010 [app] INFO: DS2482 I2C to 1-Wire found (I2C address 0x18)
0002240017 [app] INFO: ADP8866 User LED driver found (I2C address 0x27)
0002240033 [app] INFO: STS31 temperature sensor found (I2C address 0x4a)
0002240036 [app] INFO: 24CW640 EEPROM found (I2C address 0x50)
```

It tests the EEPROM contents. In this case, the chip was new and erased.

```
0002240063 [app] INFO: eeprom appears to be erased (first 64 bytes are 0xff)
```

It also implements a 1-Wire scanner, assuming the DS2482 is found.

```
0002240066 [app] INFO: DeviceReset status=1
0002240066 [app] INFO: deviceReset=1
0002240069 [app] INFO: 1WireReset status=1
0002240144 [app] INFO: SearchBus status=1 deviceCount=1
0002240144 [app] INFO: Found 1 devices
0002240147 [app] INFO: 1WireReset status=1
0002240903 [app] INFO: ConvertT status=1
0002240906 [app] INFO: 1WireReset status=1
0002240951 [app] INFO: ReadScratchpad completed status=1
0002240951 [app] INFO: GetTemperatureForList status=1
0002240952 [app] INFO: got temperatures!
0002240953 [app] INFO: 970000080b049928 valid=1 C=23.187500 F=73.737503
```


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

