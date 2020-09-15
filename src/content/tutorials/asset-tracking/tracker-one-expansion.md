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
    

<sup>1</sup>MCU GPIO is limited to 3.3V maximum.

<sup>2</sup>CAN Bus specifications can be found in the [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications). CAN Bus termination is provided on the carrier board.

<sup>3</sup>6.0 to 30 VDC at 2A when using the M8 connector. 6.0 - 90 VDC at 2A when connecting directly to the board.

<sup>4</sup>5V, 400 mA maximum. Controlled by the `CAN_PWR` GPIO.

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.


## Interface Details

### Power (in)

While the picture above includes both USB-C and M8 cables, it's also possible to power the Tracker One from the M8 connector. In this case, supply 6.0 to 30 VDC at 2 A.

### Power (out) 

There is an optional 5V 400 mA power output (`CAN 5V`) that is controlled by the `CAN_PWR` GPIO. It is available in all power modes (battery, USB, and VIN); there is an on-board boost converter to produce 5V from the 3.7V LiPo battery.

If you are building an expansion device that is battery or USB powered, you can use `CAN 5V` to power your expansion device, eliminating the need to add a separate power supply. Note that this is limited to 400 mA at 5V and the Tracker SoM GPIO are limited to 3.3V, so you may need to add a 3.3V regulator on your expansion board to convert `CAN 5V` to 3.3V.

### CAN

A CAN BUS interface is provided. The two differential CAN bus signals are provided (CAN+ and CAN-).

### Multi-function pins

There are three multi-function pins:

| M8 Pin | Function   | Function  | Function  | 
| :----: | :-------   | :-------  | :-------  | 
| 3      | Analog A3  |           | GPIO D3   | 
| 4      | Serial1 RX | Wire3 SDA | GPIO D8   | 
| 5      | Serial1 TX | Wire3 SCL | GPIO D9   | 

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

The M8 (8mm) 8-pin connector is standard, however it's not common. Some other connectors like M12 are more common, however, the 12mm connector would have required a taller enclosure to fit the larger connector. To simplify designs, Particle will provide a M8 female-to-wires cable, similar to this. 

![M8 cable](/assets/images/at-som/m8-cable.jpg)

Additional information can be found in the [M8 Accessories Datasheet](/datasheets/asset-tracking/tracker-m8-accessories/).

The common use case will be to include a cable gland in your expansion enclosure, pass the wires through the gland, and terminate them on your custom expansion board.

You'd typically connect those wires to your custom expansion board using one of several methods:

- Terminate with pins in a PHR-8 to mate with a B8B-PH on your expansion board
- Terminate with screw terminals on your board
- Terminate by soldering the wires to your board

The following cables will be available:

| SKU          | Description |
| :----------- | :--- |
| ONEM8CABEA   | Tracker One M8 Accessory Cable (Straight), (x1) |
| ONEM8CABTY   | Tracker One M8 Accessory Cable (Straight), (x40) |
| ONEM8CABRAEA | Tracker One M8 Accessory Cable (Right Angle) |
| ONEM8CABRATY | Tracker One M8 Accessory Cable (Right Angle), (x40) |
| ONEM8CONNEA  | Tracker One M8 Connector (Straight) |
| ONEM8CONNTY  | Tracker One M8 Connector (Straight), (x40) |

The color code is as follows:

| M8 Pin | Function  | Color          |
| :----: | :-------- | :------------- |
| 1      | CAN_P     | Yellow         | 
| 2      | VIN       | Red            |
| 3      | A3        | White          | 
| 4      | TX_SDA_D8 | Green          | 
| 5      | TX_SCL_D9 | Brown          | 
| 6      | CAN_5V    | Orange         | 
| 7      | CAN_N     | Blue           | 
| 8      | GND       | Black          | 

### With the Tracker One Carrier Board

Inside the Tracker One is the Carrier Board. It can be purchased separately in case you want to use the Tracker One features in your own enclosure. The design for the Tracker One enclosure is open-source and can be modified to fit your needs. The Carrier Board has a B8B-PH 8-pin connector on the board, and a short cable that attaches to the M8 8-pin IP67 connector mounted on the side of the enclosure.

![Carrier Board](/assets/images/at-som/b8b-ph-labeled.png)

| Label | Description |
| :---: | :--- |
| 1     | M8 Connector |
| 2     | B8B-PH Connector |

When expanding on the Tracker One Carrier Board, you may prefer to connect your expansion device to the B8B-PH connector on the board directly, especially if you are putting your expansion board an the enclosure with your Tracker One Carrier Board using a PHR-8 to PHR-8 cable. This can be easily assembled or purchased and is inexpensive.

![PHR-8 to PHR-8](/assets/images/at-som/phr-8.jpg)

## Application Notes

| App Note | 3.3V  | Qwiic | GPIO  | 5V I2C | DAC   | ADC   | Boost | Description |
| :------- | :---: | :---: | :---: | :---:  | :---: | :---: | :---: | :-----------|
| [AN012](https://github.com/particle-iot/app-notes/tree/master/AN012-Tracker-1Wire) | &check; | &check; | &check; | | | | | 1-Wire (DS18B20) | 
| [AN013](https://github.com/particle-iot/app-notes/tree/master/AN013-Tracker-GPIO) | &check; | &check; | &check; | | | | | GPIO (3.3v or 5V) | 
| [AN015](https://github.com/particle-iot/app-notes/tree/master/AN015-Tracker-Breakout) | &check; | &check; | | | | | | Breakout Board |
| [AN016](https://github.com/particle-iot/app-notes/tree/master/AN016-Tracker-Keypad-LCD) | &check; | | | &check; | &check; | | | Keypad and LEDs |
| [AN018](https://github.com/particle-iot/app-notes/tree/master/AN018-Tracker-Level) | &check; | | &check; | | | &check; | &check; | Tank Level Sensor |
| [AN020](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) | | | | | | | &check; | 4-20mA single |
| [AN021](https://github.com/particle-iot/app-notes/tree/master/AN021-Tracker-4-20mA-Quad) | &check; | | | | | &check; | &check; | 4-20mA quad |
| [AN022](https://github.com/particle-iot/app-notes/tree/master/AN022-Tracker-SHT3x-Temperature-Humidity) | &check; | | | &check; | | | | SHT3x Temperature/Humidity |


### M8 Breakout Board

The [AN015 Tracker Breakout](https://github.com/particle-iot/app-notes/tree/master/AN015-Tracker-Breakout) application note shows how to build a simple breakout board to help prototype using the Tracker One M8 connector.

![M8 breakout board](/assets/images/tracker/m8-breakout.jpg)

### Adding GPIO using the M8

The [AN013 Tracker GPIO](https://github.com/particle-iot/app-notes/tree/master/AN013-Tracker-GPIO) shows:

- Expanding the Tracker One using the M8 connector.
- Interfacing with 5V I2C devices (optional).
- Adding a MCP23008 to add 8 GPIO. Can be configured as 3.3V or 5V GPIO at board assembly time.

The Tracker One M8 connector only has three available pins for GPIO, and two of them are shared with serial and I2C. By using an external MCP23008 I2C GPIO interface, you can add many more GPIO pins.

The nRF52840 MCU GPIO is 3.3V only, and is not 5V tolerant. You can use the techniques in this application note to interface with 5V GPIO with true 5V logic levels.

The MCP23008 allows the pins to be configured for input, input pull-up, or output. In input mode the pins are high-impedance (Hi-Z) so you can use that to implement open-collector style output as well.

![GPIO board](/assets/images/tracker/gpio-board.jpg)

### 1-Wire (DS18B20) and using 5V I2C

The [AN012 Tracker 1-Wire](https://github.com/particle-iot/app-notes/tree/master/AN012-Tracker-1Wire) shows:

- Expanding the Tracker One using the M8 connector
- Interfacing with 5V I2C devices
- Using the DS2482-100 I2C to 1-Wire interface to efficiently add 1-Wire devices
- Using the DS18B20 temperature sensors
- Adding custom data to your location publishes

![1-Wire board](/assets/images/tracker/1-wire-board.jpg)

### Tank Level Sensor

The [AN018 Tracker Tank Level Sensor](https://github.com/particle-iot/app-notes/tree/master/AN018-Tracker-Level) shows:

- Adding additional GPIO (adds 3 ports of 3.3V GPIO using a MCP23008)
- Adding additional ADC (adds 3 ADC inputs, 3.3V using an ADS1015 12-bit ADC)
- Support for a tank level sensor (240-33 ohm, common in the US)
- 12V boost converter, for powering low-power 12V sensors (needed for tank sensor)

![Tank Level Sensor](/assets/images/tracker/tank-level.jpg)

### Keypad and LCD

The [AN016 Tracker Keypad LCD](https://github.com/particle-iot/app-notes/tree/master/AN016-Tracker-Keypad-LCD) shows:

- Using a MAX7360 to read matrix keypads and drive LEDs
- Using a character LCD display with an I2C interface
- Interfacing to 5V I2C devices
- Using an I2C DAC (digital to analog converter), used to handle the contrast for the LCD
- Implementing cloud-configurable settings (contrast)
- Adding data to location events (keypad digits)
- Showing GNSS lock and cloud connection status with custom LEDs

You probably won't want to build one of these as-is, but you may want to use some of the techniques in your own designs.

![Keypad and LCD](/assets/images/tracker/keypad-lcd.jpg)

### Thermocouple (prototype to making your own board)

The [AN019 Tracker Prototype to Board](https://github.com/particle-iot/app-notes/tree/master/AN019-Tracker-Prototype) application note demonstrates how start prototyping with off-the-shelf I2C sensors and the Tracker SoM Evaluation Board and migrate to using a custom board for the Tracker One M8 Connector. While this specific example is for a thermocouple sensor, the techniques can be used with any sensor.

![Thermocouple Board](/assets/images/tracker/thermocouple-board.png)

### 4-20 mA Current Loop Sensors

These two app notes, [AN020 Tracker 4-20mA Sensor Single](https://github.com/particle-iot/app-notes/tree/master/AN020-Tracker-4-20mA) and [AN021 Tracker 4-20mA Sensor Quad](https://github.com/particle-iot/app-notes/tree/master/AN021-Tracker-4-20mA-Quad) show how to connect a 4-20 mA current loop sensor to the Tracker One M8 port.

The single port design can be powered by the built-in LiPo battery or USB and uses the built-in ADC on the nRF52840, available on the M8 connector. It includes a boost converter to 24VDC for the 4-20mA current loop. It includes over-current protection, limiting the 4-20mA loop to 30 mA.

![4-20mA Single](/assets/images/tracker/420mA-single.jpg)

The quad port design requires an external 12V power supply, but this power supply can also power the Tracker One. It includes a boost converter to 24VDC for the 4-20mA current loop and separate current limiters for each current loop. It uses an external I2C ADC connected to the M8 connector.

![4-20mA Quad](/assets/images/tracker/420mA-quad.jpg)

### SHT3x Temperature and Humidity Sensor (5V I2C)

[AN022 Tracker SHT3x Temperature/Humidity](https://github.com/particle-iot/app-notes/tree/master/AN022-Tracker-SHT3x-Temperature-Humidity) shows how to connect 5V I2C devices including the SHT30 and SHT31 temperature and humidity sensors to the Tracker One M8 connector and add data to location publishes. The board design should be compatible with all 5V I2C peripherals.

![SHT30](/assets/images/tracker/SHT30.jpg)


 