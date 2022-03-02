---
title: Photon 2 from Photon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Photon to Photon 2
---

# Photon 2 from Argon Migration Guide

**Preliminary pre-release version 2022-03-02**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon2-photon-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

The Photon 2 is a development module with a microcontroller and Wi-Fi networking. The form-factor is similar to the Argon (Adafruit Feather), but
the Photon 2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications. 

It is intended to replace both the Photon and Argon modules. It contains the same module as the P2, making it easier to migrate from a pin-based development module to a SMD mass-production module if desired.

| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| User application size | 1024 KB (1 MB) | 128 KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | 2 MB |
| | | | |
| MCU | RTL8721DM | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | |
| RAM<sup>2</sup> | 512 KB | 128 KB | 256 KB |
| Flash<sup>3</sup> | 16 MB | 1 MB | 1 MB | 
| Hardware FPU | &check; | | &check; |
| Secure Boot | &check; | | |
| Trust Zone | &check; | | |
| | | | |
| Wi-Fi | 802.11 a/b/g/n | 802.11 b/g/n | 802.11 b/g/n |
| &nbsp;&nbsp;2.4 GHz | &check; | &check; | &check; |
| &nbsp;&nbsp;5 GHz | &check; | | |
| Bluetooth | BLE 5.0 | | BLE 5.0 |
| Antenna | Shared for Wi-Fi and BLE | Wi-Fi only | Separate Wi-Fi and BLE antennas |
| | Built-in PCB antenna (Wi-Fi & BLE) | Built-in PCB antenna (Wi-Fi) | Built-in chip antenna (BLE) |
| | | | Required external antenna (Wi-Fi) |
| | Optional external (Wi-Fi & BLE)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (BLE)<sup>4</sup> |
| | | | |
| Peripherals | USB 2.0 | USB 1.1 | USB 1.1 |
| Digital GPIO | 20 | 24 | 20 |
| Analog (ADC) | 6 | 13 | 6 |
| Analog (DAC) |  | 2 |  |
| UART | 3 | 2 | 1 |
| SPI | 2 | 2 | 2 |
| PWM | 6 | 12 | 8 |
| I2C | 1 | 1 | 1 |
| CAN |  | 1 |  |
| I2S |  | 1 | 1 |
| JTAG | | &check; | |
| SWD | &check; | &check; | &check; |

<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup> Total RAM; amount available to user applications is smaller.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.

There are two Photon 2 migration guides, depending on what you are migrating from:

- [From Photon](/datasheets/wi-fi/photon-2-photon-migration-guide/)
- [From Argon](/datasheets/wi-fi/photon-2-argon-migration-guide/)


## Hardware 

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the Photon 2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### SPI

Both the Photon and Photon 2 have two SPI ports, however the pins are different for both `SPI` and `SPI1`.

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Photon Pin Name | Photon SPI | Photon 2 Pin Name | Photon 2 SPI |
| :--- | :--- | :--- | :--- |
| A2 | SPI (SS) | A2 / D17 | &nbsp; |
| A3 | SPI (SCK) | D0 / A3 | &nbsp; |
| A4 | SPI (MISO) | D1 / A4 | &nbsp; |
| A5 | SPI (MOSI) | A5 / D14 | SPI (SS) |
| D2 | SPI1 (MOSI) | D2 | SPI1 (SCK) |
| D3 | SPI1 (MISO) | D3 | SPI1 (MOSI) |
| D4 | SPI1 (SCK) | D4 | SPI1 (MISO) |
| D5 | SPI1 (SS) | D5 / WKP | SPI1 (SS) |
| | | MISO / D11 | SPI (MISO) |
| | | MOSI / D12 | SPI (MOSI) |
| | | SCK / D13 | SPI (SCK) |
| WKP / A7 | &nbsp; | D5 / WKP | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}


#### SPI - Gen 2 devices (including Photon)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - Photon 2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the Photon and Photon 2. There is no hardware flow control on this port on the Photon or Photon 2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

| Photon Pin Name | Photon Serial | Photon 2 Pin Name | Photon 2 Serial |
| :--- | :--- | :--- | :--- |
| | | D16 | Serial3 (RX) |
| D2 | &nbsp; | D2 | Serial2 (RTS) |
| D3 | &nbsp; | D3 | Serial2 (TX) |
| D4 | &nbsp; | D4 | Serial2 (RX) |
| D5 | &nbsp; | D5 / WKP | Serial2 (CTS) |
| | | MISO / D11 | Serial3 (CTS) |
| | | MOSI / D12 | Serial3 (RTS) |
| RGBB | Serial2 (RX) | | |
| RGBG | Serial2 (TX) | | |
| RX | Serial1 (RX) | RX / D10 | Serial1 (RX)  |
| | | SCK / D13 | Serial3 (TX) |
| TX | Serial1 (TX) | TX / D9 | Serial1 (TX) |
| WKP / A7 | &nbsp; | D5 / WKP | Serial2 (CTS) |


{{!-- END do not edit content above, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

|      | Photon    | Photon 2 |
| :--- | :---: | :---: |
| Buffer size | 64 bytes | 2048 bytes |
| 7-bit mode | &check; | &check; |
| 8-bit mode | &check; | &check; |
| 9-bit mode | &check; | |
| 1 stop bit | &check; | &check; |
| 2 stop bits | &check; | &check; |
| No parity | &check; | &check; |
| Even parity | &check; | &check; |
| Odd parity | &check; | &check; |
| Break detection | &check; | |
| LIN bus support | &check; | |
| Half duplex | &check; | |
| CTS/RTS flow control |  | &check;<sup>1</sup> |

<sup>1</sup>CTS/RTS flow control only on Serial2. It is optional.

### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the Photon 2:

{{!-- BEGIN do not edit content below, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

| Photon Pin Name | Photon ADC | Photon 2 Pin Name | Photon 2 ADC |
| :--- | :--- | :--- | :--- |
| A0 | &check; | A0 / D19 | &check; |
| A1 | &check; | A1 / D18 | &check; |
| A2 | &check; | A2 / D17 | &check; |
| A3 | &check; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |
| DAC / A6 | &check; | | |
| WKP / A7 | &check; | D5 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

On the Photon 2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, Photon 2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for Photon 2 pin D1 (hardware pin 35), which has the alias A4.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the Photon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Photon Pin Name | Photon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A2 | &nbsp; | A2 / D17 | &check; |
| A3 | &nbsp; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| D0 | &check; | D0 / A3 | &check; |
| D1 | &check; | D1 / A4 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &check; |
| D4 | &nbsp; | D4 | &check; |
| RX | &check; | RX / D10 | &nbsp; |
| TX | &check; | TX / D9 | &nbsp; |
| WKP / A7 | &check; | D5 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}


### Digital to analog converter (DAC)

The Photon supports DAC one A3 and A6 (DAC). There is no DAC on the Photon 2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Photon Pin Name | Photon DAC | Photon 2 Pin Name | Photon 2 DAC |
| :--- | :--- | :--- | :--- |
| A3 | &check; | D0 / A3 | &nbsp; |
| DAC / A6 | &check; | | |


{{!-- END do not edit content above, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}



### WKP (A7)

|      | Photon    | Photon 2 |
| :--- | :---: | :---: |
| Module Pin | 30 | 30 |
| Pin Name | WKP | WKP |
| | A7 | D11 |
| Analog Input | &check; | |
| PWM | &check; | |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the Photon 2 and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (Controller Area Network)

The Photon supports CAN on pins D1 and D2. There is no CAN on the Photon 2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}

| Photon Pin Name | Photon CAN | Photon 2 Pin Name | Photon 2 CAN |
| :--- | :--- | :--- | :--- |
| D1 | &check; | D1 / A4 | &nbsp; |
| D2 | &check; | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

The Photon theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the Photon 2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

| Photon Pin Name | Photon I2S | Photon 2 Pin Name | Photon 2 I2S |
| :--- | :--- | :--- | :--- |
| D2 | I2S3_SD | D2 | &nbsp; |
| D4 | I2S3_SCK | D4 | &nbsp; |
| D5 | I2S3_WS | D5 / WKP | &nbsp; |
| SETUP | I2S3_MCK | | |


{{!-- END do not edit content above, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the Photon 2.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset, is not available on the Photon 2. This also prevents system usage of retained memory, including session resumption on reset.

On Gen 2 and Gen 3 devices, retained memory is 3068 bytes. 

The flash file system can be used for data storage on the Photon 2, however care must be taken to avoid excessive wear of the flash for frequently changing data.


### Photon Bottom

The Photon 2 has components on both sides of the board, like the Argon. It is not available without the mounted headers, and cannot be reflowed directly to a base board like the Photon without headers.

The Photon 2 does not have the solder pads for the RGB LED and SETUP/MODE button on the bottom. The RGB LED can be directed in software to other pins on the Photon 2. The SETUP/MODE button is avaiable on the header pins on the Photon 2.

### Classic Adapter

![Classic Adapter](/assets/images/accessories/classic-adapter.png)

The [Particle classic adapter](/datasheets/accessories/gen3-accessories/#classic-adapter) can be used to plug a Photon 2 into a socket that is intended to support an Electron. It can also fit in a Photon socket, however pins will hang past the socket, so there must not be anything in the way, or anything that would short the overhanging pins. 

There are many pin limitations, and in particular the classic adapter does not work if you need to use SPI.


{{!-- BEGIN do not edit content below, it is automatically generated 0339ca50-9a3e-11ec-b909-0242ac120002 --}}

| Electron Pin Name | Electron Description | Photon 2 Pin Name | Photon 2 Description |
| :--- | :--- | :--- | :--- |
| 3V3 | Regulated 3.3V DC output, maximum load 800 mA. Cannot be used as a power input. | 3V3 | Regulated 3.3V DC output, maximum load 500 mA |
| A0 | A0 Analog in, GPIO | A0 / D19 | A0 Analog in, GPIO |
| A1 | A1 Analog in, GPIO | A1 / D18 | A1 Analog in, GPIO |
| A2 | A2 Analog in, GPIO, SPI SS | A2 / D17 | A2 Analog in, GPIO, PWM. |
| A3 | A3 True analog out, analog in, GPIO. | D16 | D16 GPIO, Serial3 RX. Was A3 on Argon. |
| A4 | A4 Analog in, GPIO, SPI MISO. | D15 | D15 GPIO, Was A4 on Argon. |
| A5 | A5 Analog in, GPIO, SPI MOSI. | A5 / D14 | A5 Analog in, PWM, SPI SS, GPIO |
| B0 | B0, GPIO, PWM | | Not Connected |
| B1 | B1, GPIO, PWM | | Not Connected |
| B2 | B2, analog in, GPIO, PWM | | Not Connected |
| B3 | B3, analog in, GPIO, PWM | | Not Connected |
| B4 | B4 Analog in, GPIO | | Not Connected |
| B5 | B5 Analog in, GPIO | MISO / D11 | SPI MISO, D11 GPIO, Serial3 CTS |
| C0 | Serial5 RX (received data), GPIO. | | Not Connected |
| C1 | Serial5 TX (trasmitted data), SPI2 MOSI, GPIO. | | Not Connected |
| C2 | Serial4 RX (received data), SPI2 MISO, GPIO. | | Not Connected |
| C3 | Serial4 TX (transmitted data), SPI2 SCK, GPIO. | | Not Connected |
| C4 | I2C, CAN TX, GPIO. | | Not Connected |
| C5 | I2C, CAN RX, GPIO. | D8 | GPIO, PWM, SWDIO |
| D0 | D0 GPIO, I2C SDA | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In |
| D1 | D0 GPIO, I2C SCL, CAN TX | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| D2 | D2 GPIO, SPI1 MOSI, CAN RX | D2 | D2 GPIO, Serial2 RTS, SPI1 SCK. |
| D3 | D3 GPIO, SPI1 MISO | D3 | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI. |
| D4 | D4 GPIO, SPI1 SCK | D4 | D4 GPIO, PWM, Serial2 RX, SPI1 MISO. |
| D5 | D5 GPIO, SPI1 SS | D5 / WKP | GPIO D5, Serial2 CTS, SPI1 SS. |
| D6 | D6 GPIO, SWCLK | D6 | D6 GPIO, SWCLK. |
| D7 | D7 GPIO, Blue LED, SWDIO | D7 | D7 GPIO. Blue LED. |
| DAC / A6 | DAC/A6 True analog out, analog in, GPIO. | SCK / D13 | SPI SCK, D13 GPIO, Serial3 TX |
| | Not Connected | EN | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up. |
| GND | Ground. You only need to use one of the Photon ground pins. | GND | Ground. |
| | Not Connected | LI+ | Connected to JST PH LiPo battery connector. 3.7V in or out. |
| | Not Connected | MODE | MODE button, has internal pull-up |
| RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. |
| RX | Serial1 RX (received data), GPIO, PWM. | RX / D10 | Serial1 RX (received data), GPIO |
| TX | Serial1 TX (transmitted data), GPIO, PWM. | TX / D9 | Serial1 TX (transmitted data), GPIO |
| VBAT | Battery for internal real-time clock, jumpered to 3V3. | | Not Connected |
| VIN | Power in 3.9V to 12 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum. | VUSB | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. |
| WKP / A7 | WKP/A7 Wakeup (active high), analog in, GPIO. | MOSI / D12 | SPI MOSI, D12 GPIO, Serial3 RTS |


{{!-- END do not edit content above, it is automatically generated --}}


### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### 3V3
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | 3V3 | 3V3|
| Description | Regulated 3.3V DC output, maximum load 100 mA. Or input 3.0V to 3.6V. | Regulated 3.3V DC output, maximum load 500 mA|
#### A0
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A0 | A0|
| Pin Alternate Name | n/a | D19|
| Description | A0 Analog in, GPIO | A0 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### A1
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A1 | A1|
| Pin Alternate Name | n/a | D18|
| Description | A1 Analog in, GPIO | A1 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### A2
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A2|
| Pin Alternate Name | n/a | D17|
| Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, GPIO, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### A3
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A3 | D0|
| Pin Alternate Name | n/a | A3|
| Description | A3 True analog out, analog in, GPIO. | D0 GPIO, PWM, I2C SDA, A3 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (DAC) | Yes | No|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SCK. Use SPI object. | n/a|
| I2C interface | n/a | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
#### A4
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A4 | D1|
| Pin Alternate Name | n/a | A4|
| Description | A4 Analog in, GPIO, SPI. | D1 GPIO, PWM, I2C SCL, A4 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MISO. Use SPI object. | n/a|
| I2C interface | n/a | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### A5
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A5 | A5|
| Pin Alternate Name | n/a | D14|
| Description | A5 Analog in, GPIO, SPI. | A5 Analog in, PWM, SPI SS, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MOSI. Use SPI object. | SS. Use SPI object. Can use any GPIO for SS/CS.|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### D0
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D0 | D0|
| Pin Alternate Name | n/a | A3|
| Description | D0 GPIO, I2C | D0 GPIO, PWM, I2C SDA, A3 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### D1
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D1 | D1|
| Pin Alternate Name | n/a | A4|
| Description | D0 GPIO, I2C, CAN | D1 GPIO, PWM, I2C SCL, A4 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes|
| CAN interface | CAN2_TX | n/a|
| Input is 5V Tolerant | Yes | No|
#### D15
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | D15|
| Description | Leave unconnected | D15 GPIO, Was A4 on Argon.|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| Supports attachInterrupt | n/a | Yes|
#### D16
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | D16|
| Description | Leave unconnected | D16 GPIO, Serial3 RX. Was A3 on Argon.|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| UART serial | n/a | RX. Use Serial3 object.|
| Supports attachInterrupt | n/a | Yes|
#### D2
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D2 | D2|
| Description | D2 GPIO, SPI1, CAN | D2 GPIO, Serial2 RTS, SPI1 SCK.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No|
| UART serial | n/a | RTS. Use Serial2 object. Flow control optional.|
| SPI interface | MOSI. Use SPI1 object. | SCK. Use SPI1 object.|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| CAN interface | CAN2_RX | n/a|
| I2S interface | I2S3_SD | n/a|
| Input is 5V Tolerant | Yes | No|
#### D3
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D3|
| Description | D3 GPIO, SPI1 | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes|
| UART serial | n/a | TX. Use Serial2 object.|
| SPI interface | MISO. Use SPI1 object. | MOSI. Use SPI1 object.|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a|
#### D4
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D4|
| Description | D4 GPIO, SPI1 | D4 GPIO, PWM, Serial2 RX, SPI1 MISO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| UART serial | n/a | RX. Use Serial2 object.|
| SPI interface | SCK. Use SPI1 object. | MISO. Use SPI1 object.|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| I2S interface | I2S3_SCK | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDO. Floating at boot. | n/a|
#### D5
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D5|
| Pin Alternate Name | n/a | WKP|
| Description | D5 GPIO, SPI1 | GPIO D5, Serial2 CTS, SPI1 SS.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional.|
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any GPIO for SPI SS/CS.|
| Supports attachInterrupt | Yes | Yes|
| I2S interface | I2S3_WS | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a|
#### D6
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D6|
| Description | D6 GPIO | D6 GPIO, SWCLK.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a|
| SWD interface | SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot.|
#### D7
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7|
| Description | D7 GPIO, Blue LED | D7 GPIO. Blue LED.|
| Supports digitalRead | Yes. But the on-board LED will light when 3.3V is supplied on this pin as well. | Yes|
| Supports digitalWrite | Yes. Note that this controls the on-board blue LED. | Yes|
| Supports attachInterrupt | Yes | Yes|
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a|
| SWD interface | SWDIO. 40K pull-up at boot. | n/a|
#### DAC
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | DAC | NC|
| Pin Alternate Name | A6 | n/a|
| Description | DAC/A6 True analog out, analog in, GPIO. | Leave unconnected|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogRead | Yes | n/a|
| Supports analogWrite (DAC) | Yes | n/a|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | n/a|
#### EN
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | EN|
| Description | Leave unconnected | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | GND | GND|
| Description | Ground. You only need to use one of the Photon ground pins. | Ground.|
#### LI+
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | LI+|
| Description | Leave unconnected | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | MISO|
| Pin Alternate Name | n/a | D11|
| Description | Leave unconnected | SPI MISO, D11 GPIO, Serial3 CTS|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional.|
| SPI interface | n/a | MISO. Use SPI object.|
| Supports attachInterrupt | n/a | Yes|
#### MODE
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | MODE|
| Description | Leave unconnected | MODE button, has internal pull-up|
#### MOSI
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | MOSI|
| Pin Alternate Name | n/a | D12|
| Description | Leave unconnected | SPI MOSI, D12 GPIO, Serial3 RTS|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| UART serial | n/a | RTS. Use Serial3 object. Flow control optional.|
| SPI interface | n/a | MOSI. Use SPI object.|
| Supports attachInterrupt | n/a | Yes|
#### RGBB
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBB | NC|
| Description | RGB LED Blue | Leave unconnected|
| UART serial | RX. Use Serial2 object. | n/a|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### RGBG
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBG | NC|
| Description | RGB LED Green | Leave unconnected|
| UART serial | TX. Use Serial2 object. | n/a|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### RGBR
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBR | NC|
| Description | RGB LED Red | Leave unconnected|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### RST
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### RX
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX|
| Pin Alternate Name | n/a | D10|
| Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | RX. Use Serial1 object. | RX. Use Serial1 object.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### SCK
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | SCK|
| Pin Alternate Name | n/a | D13|
| Description | Leave unconnected | SPI SCK, D13 GPIO, Serial3 TX|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| UART serial | n/a | TX. Use Serial3 object.|
| SPI interface | n/a | SCK. Use SPI object.|
| Supports attachInterrupt | n/a | Yes|
#### SETUP
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | SETUP | NC|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN. | Leave unconnected|
| I2S interface | I2S3_MCK | n/a|
#### TX
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | TX | TX|
| Pin Alternate Name | n/a | D9|
| Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | TX. Use Serial1 object. | TX. Use Serial1 object.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### USBDATA-
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | USBDATA- | NC|
| Description | USB Data- | Leave unconnected|
| Input is 5V Tolerant | Yes | n/a|
#### USBDATA+
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | USBDATA+ | NC|
| Description | USB Data+ | Leave unconnected|
| Input is 5V Tolerant | Yes | n/a|
#### VBAT
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | VBAT | NC|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | Leave unconnected|
#### VIN
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | VIN | NC|
| Description | Power in 3.6V to 5.5 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum. | Leave unconnected|
#### VUSB
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | VUSB|
| Description | Leave unconnected | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | n/a | Yes|
#### WKP
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | WKP | D5|
| Pin Alternate Name | A7 | WKP|
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | GPIO D5, Serial2 CTS, SPI1 SS.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | n/a|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional.|
| SPI interface | n/a | SS. Use SPI1 object. Can use any GPIO for SPI SS/CS.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software

### Wi-Fi Configuration

The Photon 2 and Argon utilize BLE for configuration of Wi-Fi rather than the SoftAP approach taken with the P1. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | &check; | |
| BLE | &check; | | &check; |

### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID


## Version History

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-03-02 | RK | Pre-release |
