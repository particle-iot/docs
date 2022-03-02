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

There are two Photon 2 migration guides, depending on what you are migrating from:

- [From Photon](/datasheets/wi-fi/photon-2-photon-migration-guide/)
- [From Argon](/datasheets/wi-fi/photon-2-argon-migration-guide/)

**TODO: Update this!**

The Particle P2 module is the next generation Wi-Fi module from Particle. It is footprint compatible with our prior module, the P1, but is built on an upgraded chipset, supporting advanced features such as 5 GHz Wi-Fi, a 200MHz CPU, and built-in Bluetooth BLE 5.0.

| Feature | P2 | P1 | Argon |
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
| Digital GPIO | 22 | 24 | 20 |
| Analog (ADC) | 4 | 13 | 6 |
| Analog (DAC) |  | 2 |  |
| UART | 1 | 2 | 1 |
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


## Hardware 

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the P2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### SPI

Both the Photon and Photon 2 have two SPI ports, however the pins are different for both `SPI` and `SPI1`.

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI SCK  | A3 | D20 / S2 |
| SPI MISO | A4 | D19 / S1 |
| SPI MOSI | A5 | D18 / S0 |

The following are all SPI-related pins on the P1 and P2:

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
| | | D5 | SPI1 (SS) |
| | | MISO / D11 | SPI (MISO) |
| | | MOSI / D12 | SPI (MOSI) |
| | | SCK / D13 | SPI (SCK) |
| WKP / A7 | &nbsp; | D5 / WKP | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}


#### SPI - Gen 2 devices (including P1)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - P2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the P1 and P2. There is no hardware flow control on this port on the P1 or P2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

| Photon Pin Name | Photon Serial | Photon 2 Pin Name | Photon 2 Serial |
| :--- | :--- | :--- | :--- |
| | | D16 | Serial3 (RX) |
| D2 | &nbsp; | D2 | Serial2 (RTS) |
| D3 | &nbsp; | D3 | Serial2 (TX) |
| D4 | &nbsp; | D4 | Serial2 (RX) |
| | | MISO / D11 | Serial3 (CTS) |
| | | MOSI / D12 | Serial3 (RTS) |
| | | RGBB | Serial2 (RX) |
| | | RGBG | Serial2 (TX) |
| RX | Serial1 (RX) | RX / D10 | Serial1 (RX)  |
| | | SCK / D13 | Serial3 (TX) |
| TX | Serial1 (TX) | TX / D9 | Serial1 (TX) |
| WKP / A7 | &nbsp; | D5 / WKP | Serial2 (CTS) |


{{!-- END do not edit content above, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

|      | P1    | P2 |
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

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the P2:

{{!-- BEGIN do not edit content below, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

| Photon Pin Name | Photon ADC | Photon 2 Pin Name | Photon 2 ADC |
| :--- | :--- | :--- | :--- |
| A0 | &check; | A0 / D19 | &check; |
| A1 | &check; | A1 / D18 | &check; |
| A2 | &check; | A2 / D17 | &check; |
| A3 | &check; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| | | DAC / A6 | &check; |
| WKP / A7 | &check; | D5 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

On the P2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, P2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for P2 pin D1 (hardware pin 35), which has the alias A4.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the P1 and P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Photon Pin Name | Photon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A2 | &nbsp; | A2 / D17 | &check; |
| A3 | &nbsp; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| | | D0 | &check; |
| | | D1 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &check; |
| D4 | &nbsp; | D4 | &check; |
| RX | &check; | RX / D10 | &nbsp; |
| TX | &check; | TX / D9 | &nbsp; |
| WKP / A7 | &check; | D5 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}


### Digital to analog converter (DAC)

The P1 supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Photon Pin Name | Photon DAC | Photon 2 Pin Name | Photon 2 DAC |
| :--- | :--- | :--- | :--- |
| A3 | &check; | D0 / A3 | &nbsp; |
| | | DAC / A6 | &check; |


{{!-- END do not edit content above, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}



### WKP (A7)

|      | P1    | P2 |
| :--- | :---: | :---: |
| Module Pin | 30 | 30 |
| Pin Name | WKP | WKP |
| | A7 | D11 |
| Analog Input | &check; | |
| PWM | &check; | |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the P2 and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (Controller Area Network)

The P1 supports CAN on pins D1 and D2. There is no CAN on the P2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the P2.


{{!-- BEGIN do not edit content below, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}

| Photon Pin Name | Photon CAN | Photon 2 Pin Name | Photon 2 CAN |
| :--- | :--- | :--- | :--- |
| | | D1 | &check; |
| D2 | &check; | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

The P1 theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

| Photon Pin Name | Photon I2S | Photon 2 Pin Name | Photon 2 I2S |
| :--- | :--- | :--- | :--- |
| D2 | I2S3_SD | D2 | &nbsp; |
| D4 | I2S3_SCK | D4 | &nbsp; |
| | | D5 | I2S3_WS |
| | | SETUP | I2S3_MCK |


{{!-- END do not edit content above, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the P2.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset, is not available on the P2. This also prevents system usage of retained memory, including session resumption on reset.

On Gen 2 and Gen 3 devices, retained memory is 3068 bytes. 

The flash file system can be used for data storage on the P2, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### Pin functions removed

The following pins served P1-specific uses and are NC on the P2. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 27 | RGBR | RGB LED Red |
| 28 | RGBG | RGB LED Green |
| 29 | RGBB | RGB LED Blue |
| 30 | USBDATA- | USB Data- |
| 31 | USBDATA+ | USB Data+ |


{{!-- END do not edit content above, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

### Pin functions added

The following pins were NC on the P1 but are used on the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 21 | D5 / WKP | GPIO D5, Serial2 CTS, SPI1 SS. |
| 25 | EN | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up. |


{{!-- END do not edit content above, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

### Classic Adapter



### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### Module Pin 1
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | VIN | RST|
| Description | Power in 3.6V to 5.5 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum. | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### Module Pin 2
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | GND | 3V3|
| Description | Ground. You only need to use one of the Photon ground pins. | Regulated 3.3V DC output, maximum load 500 mA|
#### Module Pin 3
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | TX | MODE|
| Description | Serial1 TX (transmitted data), GPIO, PWM. | MODE button, has internal pull-up|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogWrite (PWM) | Yes | n/a|
| Supports tone | Yes | n/a|
| UART serial | TX. Use Serial1 object. | n/a|
| Supports attachInterrupt | Yes | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 4
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RX | GND|
| Description | Serial1 RX (received data), GPIO, PWM. | Ground.|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogWrite (PWM) | Yes | n/a|
| Supports tone | Yes | n/a|
| UART serial | RX. Use Serial1 object. | n/a|
| Supports attachInterrupt | Yes | n/a|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 5
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | WKP | A0|
| Pin Alternate Name | A7 | D19|
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | A0 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 6
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | DAC | A1|
| Pin Alternate Name | A6 | D18|
| Description | DAC/A6 True analog out, analog in, GPIO. | A1 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (DAC) | Yes | No|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes|
#### Module Pin 7
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A5 | A2|
| Pin Alternate Name | n/a | D17|
| Description | A5 Analog in, GPIO, SPI. | A2 Analog in, GPIO, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MOSI. Use SPI object. | n/a|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 8
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A4 | D16|
| Description | A4 Analog in, GPIO, SPI. | D16 GPIO, Serial3 RX. Was A3 on Argon.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No|
| UART serial | n/a | RX. Use Serial3 object.|
| SPI interface | MISO. Use SPI object. | n/a|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 9
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A3 | D15|
| Description | A3 True analog out, analog in, GPIO. | D15 GPIO, Was A4 on Argon.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (DAC) | Yes | No|
| SPI interface | SCK. Use SPI object. | n/a|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
#### Module Pin 10
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A5|
| Pin Alternate Name | n/a | D14|
| Description | A2 Analog in, GPIO, SPI SS | A5 Analog in, PWM, SPI SS, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | SS. Use SPI object. Can use any GPIO for SS/CS.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 11
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A1 | SCK|
| Pin Alternate Name | n/a | D13|
| Description | A1 Analog in, GPIO | SPI SCK, D13 GPIO, Serial3 TX|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| UART serial | n/a | TX. Use Serial3 object.|
| SPI interface | n/a | SCK. Use SPI object.|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 12
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A0 | MOSI|
| Pin Alternate Name | n/a | D12|
| Description | A0 Analog in, GPIO | SPI MOSI, D12 GPIO, Serial3 RTS|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| UART serial | n/a | RTS. Use Serial3 object. Flow control optional.|
| SPI interface | n/a | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 13
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D0 | MISO|
| Pin Alternate Name | n/a | D11|
| Description | D0 GPIO, I2C | SPI MISO, D11 GPIO, Serial3 CTS|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional.|
| SPI interface | n/a | MISO. Use SPI object.|
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | n/a|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 14
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D1 | RX|
| Pin Alternate Name | n/a | D10|
| Description | D0 GPIO, I2C, CAN | Serial1 RX (received data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | n/a | RX. Use Serial1 object.|
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | n/a|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes|
| CAN interface | CAN2_TX | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 15
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D2 | TX|
| Pin Alternate Name | n/a | D9|
| Description | D2 GPIO, SPI1, CAN | Serial1 TX (transmitted data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No|
| UART serial | n/a | TX. Use Serial1 object.|
| SPI interface | MOSI. Use SPI1 object. | n/a|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| CAN interface | CAN2_RX | n/a|
| I2S interface | I2S3_SD | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 16
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D0|
| Pin Alternate Name | n/a | A3|
| Description | D3 GPIO, SPI1 | D0 GPIO, PWM, I2C SDA, A3 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MISO. Use SPI1 object. | n/a|
| I2C interface | n/a | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a|
#### Module Pin 17
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D1|
| Pin Alternate Name | n/a | A4|
| Description | D4 GPIO, SPI1 | D1 GPIO, PWM, I2C SCL, A4 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SCK. Use SPI1 object. | n/a|
| I2C interface | n/a | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| I2S interface | I2S3_SCK | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDO. Floating at boot. | n/a|
#### Module Pin 18
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D2|
| Description | D5 GPIO, SPI1 | D2 GPIO, Serial2 RTS, SPI1 SCK.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | RTS. Use Serial2 object. Flow control optional.|
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SCK. Use SPI1 object.|
| Supports attachInterrupt | Yes | Yes|
| I2S interface | I2S3_WS | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a|
#### Module Pin 19
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D3|
| Description | D6 GPIO | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| UART serial | n/a | TX. Use Serial2 object.|
| SPI interface | n/a | MOSI. Use SPI1 object.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a|
| SWD interface | SWCLK. 40K pull-down at boot. | n/a|
#### Module Pin 20
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D4|
| Description | D7 GPIO, Blue LED | D4 GPIO, PWM, Serial2 RX, SPI1 MISO.|
| Supports digitalRead | Yes. But the on-board LED will light when 3.3V is supplied on this pin as well. | Yes|
| Supports digitalWrite | Yes. Note that this controls the on-board blue LED. | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| UART serial | n/a | RX. Use Serial2 object.|
| SPI interface | n/a | MISO. Use SPI1 object.|
| Supports attachInterrupt | Yes | Yes|
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a|
| SWD interface | SWDIO. 40K pull-up at boot. | n/a|
#### Module Pin 21
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | GND | D5|
| Pin Alternate Name | n/a | WKP|
| Description | Ground. You only need to use one of the Photon ground pins. | GPIO D5, Serial2 CTS, SPI1 SS.|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional.|
| SPI interface | n/a | SS. Use SPI1 object. Can use any GPIO for SPI SS/CS.|
| Supports attachInterrupt | n/a | Yes|
#### Module Pin 22
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | VBAT | D6|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | D6 GPIO, SWCLK.|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| Supports attachInterrupt | n/a | Yes|
| SWD interface | n/a | SWCLK. 40K pull-down at boot.|
#### Module Pin 23
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RST | D7|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | D7 GPIO. Blue LED.|
| Supports digitalRead | n/a | Yes|
| Supports digitalWrite | n/a | Yes|
| Supports attachInterrupt | n/a | Yes|
#### Module Pin 24
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | 3V3 | VUSB|
| Description | Regulated 3.3V DC output, maximum load 100 mA. Or input 3.0V to 3.6V. | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | n/a | Yes|
#### Module Pin 25
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | NC | EN|
| Description | Leave unconnected | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### Module Pin 26
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | SETUP | LI+|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN. | Connected to JST PH LiPo battery connector. 3.7V in or out.|
| I2S interface | I2S3_MCK | n/a|
#### Module Pin 27
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBR | NC|
| Description | RGB LED Red | Leave unconnected|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### Module Pin 28
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBG | NC|
| Description | RGB LED Green | Leave unconnected|
| UART serial | TX. Use Serial2 object. | n/a|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### Module Pin 29
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RGBB | NC|
| Description | RGB LED Blue | Leave unconnected|
| UART serial | RX. Use Serial2 object. | n/a|
| Input is 5V Tolerant | No, if LED is connected. | n/a|
#### Module Pin 30
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | USBDATA- | NC|
| Description | USB Data- | Leave unconnected|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 31
| | Photon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | USBDATA+ | NC|
| Description | USB Data+ | Leave unconnected|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 32 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 33 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 34 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 35 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 36 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 37 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 38 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 39 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 40 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 41 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 42 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 43 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 44 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 45 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 46 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 47 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 48 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 49 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 50 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 51 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 52 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 53 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 54 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 55 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 56 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 57 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 58 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 59 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 60 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 61 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 62 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 63 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 64 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 65 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 66 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 67 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 68 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 69 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 70 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 71 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 72 (NC)
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software

### Wi-Fi Configuration

The P2 and Argon utilize BLE for configuration of Wi-Fi rather than the SoftAP approach taken with the P1. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

| Feature | P2 | P1 | Argon |
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
