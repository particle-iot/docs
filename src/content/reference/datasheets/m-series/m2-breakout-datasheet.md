---
title: M.2 breakout board
columns: two
layout: commonTwo.hbs
description: M.2 breakout board
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet based on pre-release version of the hardware. Changes are expected.
{{box op="end"}}

The M.2 breakout board is a convenient way to prototype with the B-SoM and M-SoM modules.

## Block diagram

{{imageOverlay src="/assets/images/m-series/M.2-block-diagram.png" alt="Block diagram" class="full-width"}}


## Board features

{{imageOverlay src="/assets/images/m-series/M.2-breakout-labeled.png" alt="Board features" class="full-width no-darken"}}

| Label | Description |
| :--- | :--- |
|  1 | MCU USB-C (use this one) |
|  2 | SWD debugging connector |
|  3 | Cellular modem USB-C (not normally used) |
|  4 | LiPo battery power switch |
|  5 | LiPo battery connector (3-pin, with temperature sensor) |
|  6 | DC power switch |
|  7 | DC power barrel connector, 5-12 VDC (5.5mm x 2.1mm, center positive) |
|  8 | QWIIC (3.3V I2C connector) |
|  9 | Grove expansion connector |
| 10 | U.FL to SMA connectors |
| 11 | Spare M.2 SoM screws |
| 12 | NFC U.FL connector (B-SoM only, not available on M-SoM) |
| 13 | Expansion connector |
| 14 | D7 User LED (blue) |
| 15 | RESET button |
| 16 | RGB status LED |
| 17 | MODE button |
| 18 | Prototyping area |
| 19 | M.2 SoM socket for B-SoM or M-SoM |
| 20 | Power module |
| 21 | Adafruit Feather connector (for accessories) |
| 22 | Feather connector jumpers |
| 23 | Feather connector jumpers |
| 24 | VUSB jumper (only used on B-SoM) |
| 25 | LiPo charge LED (yellow) |
| 26 | LiPo temperature sensor bypass jumper (TS) |
| 27 | Power LED (red) |
| 28 | Power LED disable (cut trace to disable, can reenable with solder) |



### Powering the board

The M.2 breakout can be powered by:

| Num  | Description |
| :---: | :--- |
| 1 | USB-C ("MCU USB") |
| 5 | LiPo battery (3.7V LiPo with 3-pin JST-PH connector)
| 7 | VIN barrel connector 5-12 VDC (5.5mm x 2.1mm, center positive) |

- There are two USB C connectors on the breakout board, be sure to use connector 1 "MCU USB".
- When powering by VIN (barrel connector), 5-12 VDC is recommended, but up to 17 VDC can be supplied.
- Minimum power requirements are 5VDC @500mA (when the LiPo battery) or 5VDC @2000mA (without LiPo battery).
- If purchasing a LiPo battery from a 3rd-party supplier, beware as the polarity of the JST-PH connector is not standardized and may be reversed. Permanent damage to the breakout board can occur if powered by reverse polarity on the JST connector. See the [battery guide](/hardware/power/batteries/) for additional information.


#### LiPo connector

Note that the M.2 breakout board includes a 3-pin JST-PH connector (left), not the 2-pin JST-PH connector on some other Particle devices (right). The TS pin is expected to be connected to a 10K NTC thermistor in the battery pack.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" alt="Battery connector" class="small"/></div>

<p class="attribution">Looking at the exposed end of the connector attached to the battery</p>

## Setup

The basic setup for the B-SoM or M-SoM to be operational is shown below:

- Plug the cellular antenna into the U.FL connector labeled **CELL** on the SoM. Remember never to power up this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.
- If you are going to use BLE, connect the 2.4 GHz antenna (the smaller one) to the **BT** U.FL connector on the SoM.
- Connect power the USB (1) or a LiPo battery (2).
- Turn on the appropriate power switches (4, 6).

## Onboard peripherals

### Qwiic (8)

The SparkFun Qwiic system provides an easy way to expand and test various sensors, input devices, and displays. Multiple peripherals can be daisy-chained to a single port. The Adafruit Stemma QT are compatible with Qwiic and can be mixed and matched as well.

For more information, see [Qwiic](/hardware/expansion/qwiic/).

### Grove connector (9)

Additionally, Grove system of sensors and peripherals from Seeed Systems is another easy way to add peripheral devices. The M.2 breakout board has one Grove connectors connected to pins A1 and A2 that can be used as GPIO or analog inputs. This port cannot be used with I2C or Serial Grove peripherals.

| J11 | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| GND | | |
| 3V3 | | |
| ADC2 | A2 | 35 |
| ADC1 | A1 | 33 |

### Feather connector (21)

The Feather connector can be used for Adafruit FeatherWings, such as displays, sensors, and Ethernet. You cannot plug a Feather MCU into this socket!

### Feather pin mapping - M-SoM

{{imageOverlay src="/assets/images/m-series/m2breakout_feather_msom.svg" alt="Expansion header" }}

### Feather pin mapping - B-SoM

{{imageOverlay src="/assets/images/m-series/m2breakout_feather_bsom.svg" alt="Expansion header" }}


### Jumpers (22)

These jumpers connect the Feather A pin side to the M.2 connector. They can also be used to remap pins by using jumper wires instead of solid jumpers.

### Jumpers (23)

These jumpers connect the Feather D pin side to the M.2 connector. They can also be used to remap pins by using jumper wires instead of solid jumpers.


### Power module

The M.2 breakout board comes with the [PMIC power module](/hardware/power/power-module-datasheet/) that includes the bq24195 PMIC and MAX17043 fuel gauge chips. 

The following pins are used by the power module.

| Power module | SoM Pin | SoM Pin Number |
| :---: |  :---: |  :---: | 
| FUEL\_INT | A6 | 45 |
| SDA | D0 | 22 |
| SCL | D1 | 20 |
| Power enable | D23 / GPIO1 | 50 |
| Power status | D4 / PWM0 | 52 |


### Using ethernet

The M.2 breakout board does not contain Ethernet like the previous B-Series Eval board. You can, however, add it using the [Adafruit Ethernet FeatherWing](https://www.adafruit.com/product/3201) in the Feather socket.

Be sure to connect the nRESET and nINTERRUPT pins (on the small header on the short side) to pins D3 and D4 with jumper wires. These are required for proper operation.

The default mapping for the B-SoM and the original B-SoM eval board is listed below, but you may want to use [Ethernet pin remapping](/reference/device-os/api/ethernet/ethernet/#pin-configuration-ethernet) to reassign the pins.

| Particle Pin | M.2 Pin | Ethernet Pin |
| :---: | :---: | :--- |
| D8 | CS | ETH\_CS |
| A7 | RESERVED | ETH\_RESET |
| SCK | SCK | ETH\_CLK |
| MISO | MISO | ETH\_MISO |
| MOSI | MOSI | ETH\_MOSI |
| D22 | GPIO0 | ETH\_INT |



### Using SD card

The M.2 breakout board does not contain a Micro SD card socket as the previous B-Series Eval board did. You can, however, add it using the Adafruit Feather connector.

The [Adalogger FeatherWing - RTC + SD Add-on For All Feather Boards](https://www.adafruit.com/product/2922) contains a Micro SD card socket. 

| SD Card Pin | Feather Pin | Description |
| :--- | :--- | :--- |
| SCK | SCK | SPI Clock |
| MOSI | MOSI | Data (MCU to SD card) |
| MISO | MISO | Data (SD card to MCU) |
| SDCS | D5 | Chip select |

It is also possible to cut the a trace jumper for SDCS and use a different pin for SDCS. Note that this will use `SPI` (primary SPI) but the B-Series Eval board use `SPI1` so your SD card initialization code will be different.

See the [Adafruit tutorial](https://learn.adafruit.com/adafruit-adalogger-featherwing/using-the-sd-card) for additional information.


## Expansion header


### Expansion header - M-SoM

{{imageOverlay src="/assets/images/m-series/m2breakout_msom.svg" alt="Expansion header M-SoM" }}

### Expansion header - B-SoM

{{imageOverlay src="/assets/images/m-series/m2breakout_bsom.svg" alt="Expansion header B-SoM" }}


### Full pin listing

[Skip past this section](#schematics) (the full pin listing is long)

{{!-- BEGIN do not edit content below, it is automatically generated 9ea389b4-0c66-4b3e-9c95-9e31e1fa6f00 --}}

#### Module Pin 1 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 1|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 2 (VCC)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 2|
| Pin Name | VCC|
| Description | Cellular modem power. Typically 3.9V, can be 3.6V to 4.2V|
#### Module Pin 3 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 3|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 4 (VCC)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 4|
| Pin Name | VCC|
| Description | Cellular modem power. Typically 3.9V, can be 3.6V to 4.2V|
#### Module Pin 5 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 5|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 6 (VCC)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 6|
| Pin Name | VCC|
| Description | Cellular modem power. Typically 3.9V, can be 3.6V to 4.2V|
#### Module Pin 7 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 8 (3V3)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 8|
| Pin Name | 3V3|
| Description | 3.3V used to power MCU|
#### Module Pin 9 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 9|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 10 (SOM10)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 10|
| Pin Name | SOM10|
| Description | Not currently used, leave unconnected.|
#### Module Pin 11 (SOM6 / D21)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 11 | 11 |
| ∆ | Pin Name | SOM6 | D21 |
| ∆ | Pin Alternate Name | NFC1 | n/a |
| ∆ | Description | NFC Antenna 1. | D21 GPIO. Is NFC1 on B-SoM. |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### Module Pin 12 (SOM11 / GNSS_TX)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 12 | 12 |
| ∆ | Pin Name | SOM11 | GNSS_TX |
| ∆ | Description | Not currently used, leave unconnected. | Cellular modem GNSS UART TX |
#### Module Pin 13 (SOM7 / D20)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 13 | 13 |
| ∆ | Pin Name | SOM7 | D20 |
| ∆ | Pin Alternate Name | NFC2 | n/a |
| ∆ | Description | NFC Antenna 2. NFC2 is the center pin. | D20 GPIO. Is NFC2 on B-SoM. |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 14 (D1)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 14 | 14 |
| &nbsp; | Pin Name | D1 | D1 |
| &nbsp; | Pin Alternate Name | D1 | D1 |
| &nbsp; | Description | I2C SCL. Cannot be used as GPIO. | I2C SCL. Cannot be used as GPIO. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 15 (A0)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 15 | 15 |
| &nbsp; | Pin Name | A0 | A0 |
| &nbsp; | Pin Alternate Name | D19 | D19 |
| &nbsp; | Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 42K |
#### Module Pin 16 (D0)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 16 | 16 |
| &nbsp; | Pin Name | D0 | D0 |
| &nbsp; | Pin Alternate Name | D0 | D0 |
| &nbsp; | Description | I2C SDA. Cannot be used as GPIO. | I2C SDA. Cannot be used as GPIO. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 17 (A1)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 17 | 17 |
| &nbsp; | Pin Name | A1 | A1 |
| &nbsp; | Pin Alternate Name | D18 | D18 |
| &nbsp; | Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 18 (MODE)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 18 | 18 |
| &nbsp; | Pin Name | MODE | MODE |
| &nbsp; | Pin Alternate Name | D20 | D20 |
| ∆ | Description | MODE button, has internal pull-up | MODE button. Pin number constant is BTN. External pull-up required! |
| ∆ | Supports attachInterrupt | n/a | Yes |
#### Module Pin 19 (A2)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 19 | 19 |
| &nbsp; | Pin Name | A2 | A2 |
| &nbsp; | Pin Alternate Name | D17 | D17 |
| &nbsp; | Description | A2 Analog in, GPIO | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 22K |
#### Module Pin 20 (RST)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 20 | 20 |
| &nbsp; | Pin Name | RST | RST |
| ∆ | Description | Hardware reset, active low. | Hardware reset, active low. External pull-up required. |
#### Module Pin 21 (A3)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 21 | 21 |
| &nbsp; | Pin Name | A3 | A3 |
| &nbsp; | Pin Alternate Name | D16 | D16 |
| &nbsp; | Description | A3 Analog in, GPIO | A3 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 22 (TX)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 22 | 22 |
| &nbsp; | Pin Name | TX | TX |
| &nbsp; | Pin Alternate Name | D9 | D9 |
| ∆ | Description | Serial TX, GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 23 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 23|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 24 (RX)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 24 | 24 |
| &nbsp; | Pin Name | RX | RX |
| &nbsp; | Pin Alternate Name | D10 | D10 |
| ∆ | Description | Serial RX, GPIO | Serial RX, PWM, GPIO, SPI1 MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 25 (A4)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 25 | 25 |
| &nbsp; | Pin Name | A4 | A4 |
| &nbsp; | Pin Alternate Name | D15 | D15 |
| &nbsp; | Description | A4 Analog in, GPIO | A4 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 26 (D3)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 26 | 26 |
| &nbsp; | Pin Name | D3 | D3 |
| &nbsp; | Pin Alternate Name | CTS | CTS |
| ∆ | Description | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | UART serial | CTS. Use Serial1 object. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | SS. Use SPI1 object. |
| &nbsp; | I2C interface | SCL. Use Wire1 object. | SCL. Use Wire1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 27 (A5)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 27 | 27 |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO | A5 Analog in, PWM, GPIO, shared with pin 53 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 28 (D2)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 28 | 28 |
| &nbsp; | Pin Name | D2 | D2 |
| &nbsp; | Pin Alternate Name | RTS | RTS |
| ∆ | Description | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | UART serial | RTS. Use Serial1 object. | RTS. Use Serial1 object. |
| &nbsp; | SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| &nbsp; | I2C interface | SDA. Use Wire1 object. | SDA. Use Wire1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 29 (A6)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 29 | 29 |
| &nbsp; | Pin Name | A6 | A6 |
| ∆ | Pin Alternate Name | D16 | D29 |
| ∆ | Description | A6 Analog in, PWM, GPIO | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 30 (SOM0 / CELL USBD+)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 30 | 30 |
| ∆ | Pin Name | SOM0 | CELL USBD+ |
| &nbsp; | Pin Alternate Name | CELL USBD+ | CELL USBD+ |
| ∆ | Description | Cellular Modem USB Data+. | Cellular Modem USB Data+ |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### Module Pin 31 (A7)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 31 | 31 |
| &nbsp; | Pin Name | A7 | A7 |
| ∆ | Pin Alternate Name | D17 | WKP |
| ∆ | Description | A7 Analog in, GPIO | A7 Analog In, WKP, GPIO D28 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 32 (SOM1 / CELL USBD-)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 32 | 32 |
| ∆ | Pin Name | SOM1 | CELL USBD- |
| &nbsp; | Pin Alternate Name | CELL USBD- | CELL USBD- |
| ∆ | Description | Cellular Modem USB Data-. | Cellular Modem USB Data- |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### Module Pin 33 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 33|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 34 (D8)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 34 | 34 |
| &nbsp; | Pin Name | D8 | D8 |
| ∆ | Pin Alternate Name | CS | D8 |
| ∆ | Description | GPIO, SPI SS | D8 GPIO, SPI SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | Default SS for SPI. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 35 (SOM14)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 35|
| Pin Name | SOM14|
| Description | M.2 pin 51. Not currently used, leave unconnected.|
#### Module Pin 36 (MISO)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 36 | 36 |
| &nbsp; | Pin Name | MISO | MISO |
| &nbsp; | Pin Alternate Name | D11 | D11 |
| ∆ | Description | SPI MISO, GPIO | D11 GPIO, PWM, SPI MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 37 (SOM15 / A5)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 37 | 37 |
| ∆ | Pin Name | SOM15 | A5 |
| ∆ | Pin Alternate Name | n/a | D14 |
| ∆ | Description | M.2 pin 53. Not currently used, leave unconnected. | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 38 (MOSI)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 38 | 38 |
| &nbsp; | Pin Name | MOSI | MOSI |
| &nbsp; | Pin Alternate Name | D12 | D12 |
| ∆ | Description | SPI MOSI, GPIO | D12 GPIO, PWM, SPI MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 39 (SOM16 / D27)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 39 | 39 |
| ∆ | Pin Name | SOM16 | D27 |
| ∆ | Description | M.2 pin 55. Not currently used, leave unconnected. | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | SWD interface | n/a | SWDIO. 40K pull-up at boot. |
| ∆ | Signal used at boot | n/a | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### Module Pin 40 (SCK)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 40 | 40 |
| &nbsp; | Pin Name | SCK | SCK |
| &nbsp; | Pin Alternate Name | D13 | D13 |
| ∆ | Description | SPI SCK, GPIO | D13 GPIO, SPI SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 41 (SOM17)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 41|
| Pin Name | SOM17|
| Description | M.2 pin 57. Not currently used, leave unconnected.|
#### Module Pin 42 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 42|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 43 (SOM18 / D26)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 43 | 43 |
| ∆ | Pin Name | SOM18 | D26 |
| ∆ | Description | M.2 pin 59. Not currently used, leave unconnected. | D26 GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 44 (SOM12 / D24)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 44 | 44 |
| ∆ | Pin Name | SOM12 | D24 |
| ∆ | Description | M.2 pin 58. Not currently used, leave unconnected. | D24 GPIO, Serial2 TX, do not pull down at boot |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | UART serial | n/a | TX. Use Serial2 object. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### Module Pin 45 (RGBR)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 45 | 45 |
| &nbsp; | Pin Name | RGBR | RGBR |
| ∆ | Pin Alternate Name | n/a | RGBR |
| &nbsp; | Description | RGB LED Red | RGB LED Red |
| ∆ | Signal used at boot | n/a | Low at boot triggers trap mode |
#### Module Pin 46 (SOM13 / D25)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 46 | 46 |
| ∆ | Pin Name | SOM13 | D25 |
| ∆ | Description | M.2 pin 60. Not currently used, leave unconnected. | GPIO25, Serial2 RX |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | UART serial | n/a | RX. Use Serial2 object. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | Signal used at boot | n/a | Goes high at boot |
#### Module Pin 47 (RGBG)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 47 | 47 |
| &nbsp; | Pin Name | RGBG | RGBG |
| ∆ | Pin Alternate Name | n/a | RGBG |
| &nbsp; | Description | RGB LED Green | RGB LED Green |
#### Module Pin 48 (D22)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 48 | 48 |
| &nbsp; | Pin Name | D22 | D22 |
| ∆ | Pin Alternate Name | GPIO0 | D22 |
| ∆ | Description | GPIO D22 | D22 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 49 (RGBB)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 49 | 49 |
| &nbsp; | Pin Name | RGBB | RGBB |
| ∆ | Pin Alternate Name | n/a | RGBB |
| &nbsp; | Description | RGB LED Blue | RGB LED Blue |
#### Module Pin 50 (D23)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 50 | 50 |
| &nbsp; | Pin Name | D23 | D23 |
| ∆ | Pin Alternate Name | GPIO1 | D23 |
| ∆ | Description | GPIO D23 | D23 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 51 (SOM5)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 51 | 51 |
| &nbsp; | Pin Name | SOM5 | SOM5 |
| &nbsp; | Pin Alternate Name | SIM_VCC | SIM_VCC |
| ∆ | Description | Leave unconnected. External SIM support is not available on B-SoM. | Leave unconnected, 1.8V/3V SIM Supply Output from R410M. |
#### Module Pin 52 (D4)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 52 | 52 |
| &nbsp; | Pin Name | D4 | D4 |
| &nbsp; | Pin Alternate Name | PWM0 | PWM0 |
| ∆ | Description | SPI1 MISO, PWM, GPIO D4 | D4 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| &nbsp; | SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 53 (SOM6)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 53 | 53 |
| &nbsp; | Pin Name | SOM6 | SOM6 |
| &nbsp; | Pin Alternate Name | SIM_RST | SIM_RST |
| ∆ | Description | Leave unconnected. External SIM support is not available on B-SoM. | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
#### Module Pin 54 (D5)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 54 | 54 |
| &nbsp; | Pin Name | D5 | D5 |
| &nbsp; | Pin Alternate Name | PWM1 | PWM1 |
| ∆ | Description | PWM, GPIO D5 | D5 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 55 (SOM7 / SOM8)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 55 | 55 |
| ∆ | Pin Name | SOM7 | SOM8 |
| &nbsp; | Pin Alternate Name | SIM_CLK | SIM_CLK |
| ∆ | Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
#### Module Pin 56 (D6)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 56 | 56 |
| &nbsp; | Pin Name | D6 | D6 |
| &nbsp; | Pin Alternate Name | PWM2 | PWM2 |
| ∆ | Description | PWM, GPIO D6 | D6 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 57 (SOM8 / SIM_DATA)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 57 | 57 |
| ∆ | Pin Name | SOM8 | SIM_DATA |
| &nbsp; | Pin Alternate Name | SIM_DATA | SIM_DATA |
| ∆ | Description | Leave unconnected. External SIM support is not available on B-SoM. | Leave unconnected, 1.8V/3V SIM Data I/O of cellular modem with internal 4.7 k pull-up. |
#### Module Pin 58 (D7)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 58 | 58 |
| &nbsp; | Pin Name | D7 | D7 |
| &nbsp; | Pin Alternate Name | PWM3 | PWM3 |
| ∆ | Description | PWM, GPIO D7, Blue LED | D7 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 59 (GND)
| | Unchanged between B-SoM and M-SoM |
| :--- | :--- |
| Pin Number | 59|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 60 (SOM9 / SOM8)
|   |   | B-SoM | M-SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 60 | 60 |
| ∆ | Pin Name | SOM9 | SOM8 |
| ∆ | Pin Alternate Name | n/a | CELL_RI |
| ∆ | Description | M.2 pin 75. Not currently used, leave unconnected. | CELL_RI, ring indicator output, leave unconnected. |


{{!-- END do not edit content above, it is automatically generated  --}}


## Schematics

To be provided at a later date.

---

## Mechanical specifications

### Dimensions and weight

To be provided at a later date.


## Revision history

| Revision | Date       | Author | Comments |
|:---------|:---------- |:-------|:---------|
| pre      | 2024-03-18 | RK     | Initial Release (based on board v0.2 20240315) |
