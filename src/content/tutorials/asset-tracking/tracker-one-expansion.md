---
title: Tracker One Expansion
columns: two
layout: tutorials.hbs
order: 45
description: Adding features to the Tracker One
---

# Tracker One Expansion


## Tracker One M8 Connector

The Tracker One can be expanded without opening the case by using the M8 connector.

![Expansion Port](/assets/images/at-som/expansion-highlight.png)

This connector can be used while maintaining the IP67 rating.

The 8-pin connector has these signals:

| M8 Pin | Function   | Function  | Function  | I/O |
| :----: | :-------   | :-------  | :-------  | :--- |
| 1      | VIN<sup>3</sup> |      |           | I |
| 2      | GND        |           |           |   |         
| 3      | CAN 5V<sup>4</sup> |   | CAN_PWR   | O |
| 4      | CAN+       |           |           | IO<sup>2</sup> |
| 5      | CAN-       |           |           | IO<sup>2</sup> |
| 6      | Serial1 TX | Wire3 SCL | GPIO D9   | IO<sup>1</sup> |
| 7      | Serial1 RX | Wire3 SDA | GPIO D8   | IO<sup>1</sup> |
| 8      | Analog A3  |           | GPIO D3   | IO<sup>1</sup> |

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>4.5 to 30 VDC when using the M8 connector. 4.5 - 105 VDC when connecting directly to the board.

<sup>4</sup>5V, 500 mA maximum. Controlled by the `CAN_PWR` GPIO.

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.


## Interface Details

### Power (in)

While the picture above includes both USB-C and M8 cables, it's also possible to power the Tracker One from the M8 connector. In this case, supply 4.5 to 30 VDC at 10 watts.

### Power (out) 

There is an optional 5V 500 mA power output (`CAN 5V`) that is controlled by the `CAN_PWR` GPIO. It is available in all power modes (battery, USB, and VIN); there is an on-board boost converter to produce 5V from the 3.7V LiPo battery.

If you are building an expansion device that is battery or USB powered, you can use `CAN 5V` to power your expansion device, eliminating the need to add a separate power supply. Note that this is limited to 500mA at 5V and the Tracker SoM GPIO are limited to 3.3V, so you may need to add a 3.3V regulator on your expansion board to convert `CAN 5V` to 3.3V.

### CAN

A CAN BUS interface is provided. The two differential CAN bus signals are provided (CAN+ and CAN-).

### Multi-function pins

There are three multi-function pins:

| M8 Pin | Function   | Function  | Function  | 
| :----: | :-------   | :-------  | :-------  | 
| 6      | Serial1 TX | Wire3 SCL | GPIO D9   | 
| 7      | Serial1 RX | Wire3 SDA | GPIO D8   | 
| 8      | Analog A3  |           | GPIO D3   | 

For example: If you are using `Serial1`, you cannot use `Wire3` (I2C) and can only use one other GPIO (`D3`). 

If you are using `Wire3` (I2C), you can't use `Serial1` or `D8` or `D9`.

If you aren't using `Wire3` or `Serial1`, you can use all three pins as GPIO, or use `D8` and `D9` as GPIO and `A3` as analog input (ADC).

If you are in need of more ports, the best solution is to use the multi-function pins as I2C, and include an I2C expander on your expansion board. Some things you can add using I2C:

- More GPIO using a MCP23008 (8-port) or MCP23017 (16-port)
- ADCs (like the MCP3021 single port)
- PWM (pulse-width modulation output) using a PCA9685 (16-channel) for servos or LEDs
- Temperature, humidity, and pressure sensors
- Displays (LED, OLED, LCD, etc.)
- Serial UART (SC16IS740)
- FRAM non-volatile data storage

Note that Serial, I2C, GPIO, and ADC on the Tracker SoM can only be used at 3.3V maximum. The pins are **not** 5V tolerant!

### Connecting Your Expansion Device

The M8 (8mm) 8-pin connector is standard, however it's not common. Some other connectors like M12 are more common, however, the 12mm connector would have required a taller enclosure to fit the larger connector. To simplify designs, Particle will provide a M8 female-to-wires cable, similar to this. This is for illustration only and the design may vary in the future.

![M8 cable](/assets/images/at-som/M8-cable.jpg)

The common use case will be to include a cable gland in your expansion enclosure, pass the wires through the gland, and terminate them on your custom expansion board.

You'd typically connect those wires to your custom expansion board using one of several methods:

- Terminate with pins in a PHR-8 to mate with a B8B-PH on your expansion board
- Terminate with screw terminals on your board
- Terminate by soldering the wires to your board



