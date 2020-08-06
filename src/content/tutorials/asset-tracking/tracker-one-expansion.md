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

<sup>3</sup>4.5 to 30 VDC when using the M8 connector. 4.5 - 105 VDC when connecting directly to the board.

<sup>4</sup>5V, 400 mA maximum. Controlled by the `CAN_PWR` GPIO.

![M8 connector](/assets/images/at-som/M8-connector.png)

View as looking into the M8 connector on the outside of the enclosure.


## Interface Details

### Power (in)

While the picture above includes both USB-C and M8 cables, it's also possible to power the Tracker One from the M8 connector. In this case, supply 4.5 to 30 VDC at 10 watts.

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

The M8 (8mm) 8-pin connector is standard, however it's not common. Some other connectors like M12 are more common, however, the 12mm connector would have required a taller enclosure to fit the larger connector. To simplify designs, Particle will provide a M8 female-to-wires cable, similar to this. This is for illustration only and the design may vary in the future.

![M8 cable](/assets/images/at-som/m8-cable.jpg)

The common use case will be to include a cable gland in your expansion enclosure, pass the wires through the gland, and terminate them on your custom expansion board.

You'd typically connect those wires to your custom expansion board using one of several methods:

- Terminate with pins in a PHR-8 to mate with a B8B-PH on your expansion board
- Terminate with screw terminals on your board
- Terminate by soldering the wires to your board

### With the Tracker One Carrier Board

Inside the Tracker One is the Carrier Board. It can be purchased separately in case you want to use the Tracker One features in your own enclosure. The design for the Tracker One enclosure is open-source and can be modified to fit your needs. The Carrier Board has a B8B-PH 8-pin connector on the board, and a short cable that attaches to the M8 8-pin IP67 connector mounted on the side of the enclosure.

![Carrier Board](/assets/images/at-som/carrier-b8b-ph.png)

When expanding on the Tracker One Carrier Board, you may prefer to connect your expansion device to the B8B-PH connector on the board directly, especially if you are putting your expansion board an the enclosure with your Tracker One Carrier Board using a PHR-8 to PHR-8 cable. This can be easily assembled or purchased and is inexpensive.

![PHR-8 to PHR-8](/assets/images/at-som/phr-8.jpg)

## Application Notes

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





