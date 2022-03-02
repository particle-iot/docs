---
title: Photon 2 from Argon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Argon to Photon 2
---

# Photon 2 from Argon Migration Guide

**Preliminary pre-release version 2022-03-02**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon2-argon-migration-guide.pdf"}}
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
| NFC Tag |  | | External antenna required |
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

### Antennas

The Argon requires an external Wi-Fi antenna, and has a built-in chip antenna for BLE. It can optionally use an external chip antenna.

The Photon 2 has a built-in trace antenna that is shared by Wi-Fi and BLE. It can optionally use an external 2.4 GHz antenna for both Wi-Fi and BLE.

### SPI

Pins for both `SPI` and `SPI1` are unchanged between the Argon and Photon 2.

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Argon Pin Name | Argon SPI | Photon 2 Pin Name | Photon 2 SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | SPI (SS) | A5 / D14 | SPI (SS) |
| D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| D3 | SPI1 (MOSI) | D3 | SPI1 (MOSI) |
| D4 | SPI1 (MISO) | D4 | SPI1 (MISO) |
| D5 | &nbsp; | D5 / WKP | SPI1 (SS) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |


{{!-- END do not edit content above, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

- Any available GPIO can be used for SS/CS (chip select) pins.
- Each SPI device must have a unique CS pin.
- The Argon supports SPI slave mode only on `SPI1` (D pins).

#### SPI - Gen 3 devices (including Argon)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 32 MHz | 32 MHz |
| Default rate | 16 MHz | 16 MHz |
| Clock | 64 MHz | 64 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256
- Default divisor is 4

#### SPI - Photon 2

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the Photon 2 and Argon. There is no hardware flow control on this port on the Photon 2 or Argon.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

There is a third UART serial (`Serial3`) on the Photon 2 that also supports optional CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

| Argon Pin Name | Argon Serial | Photon 2 Pin Name | Photon 2 Serial |
| :--- | :--- | :--- | :--- |
| A3 / D16 | &nbsp; | D16 | Serial3 (RX) |
| D2 | Serial1 RTS | D2 | Serial2 (RTS) |
| D3 | Serial1 CTS | D3 | Serial2 (TX) |
| D4 | &nbsp; | D4 | Serial2 (RX) |
| D5 | &nbsp; | D5 / WKP | Serial2 (CTS) |
| MISO / D11 | &nbsp; | MISO / D11 | Serial3 (CTS) |
| MOSI / D12 | &nbsp; | MOSI / D12 | Serial3 (RTS) |
| RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| SCK / D13 | &nbsp; | SCK / D13 | Serial3 (TX) |
| TX / D09 | Serial1 TX | TX / D9 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

|      | Argon    | Photon 2 |
| :--- | :------: | :---: |
| Buffer size | 64 bytes<sup>2</sup> | 2048 bytes |
| 7-bit mode |  | &check; |
| 8-bit mode | &check; | &check; |
| 1 stop bit | &check; | &check; |
| 2 stop bits |  | &check; |
| No parity | &check; | &check; |
| Even parity | &check; | &check; |
| Odd parity |  | &check; |
| CTS/RTS flow control |  | &check;<sup>1</sup> |

<sup>1</sup>CTS/RTS flow control only on `Serial2` and `Serial3`. It is optional.

<sup>2</sup>On the Argon, the buffer be resized larger in Device OS 3.2.0 and later.

### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`.

- Pin A0, A1, A2, and A5 are analog inputs on both the Argon and Photon 2.
- Pins A3 and A4 are only analog inputs on the Argon.
- Pins D0 and D1 can also be used as analog inputs on the Photon 2. 

{{!-- BEGIN do not edit content below, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

| Argon Pin Name | Argon ADC | Photon 2 Pin Name | Photon 2 ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | D16 | &nbsp; |
| A4 / D15 | &check; | D15 | &nbsp; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}


### PWM (Pulse-width modulation)

The pins that support PWM are different on the Argon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Argon Pin Name | Argon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &nbsp; |
| A1 / D18 | &check; | A1 / D18 | &nbsp; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | D16 | &nbsp; |
| A4 / D15 | &check; | D15 | &nbsp; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &check; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 / WKP | &nbsp; |
| D6 | &check; | D6 | &nbsp; |
| D7 | &check; | D7 | &nbsp; |
| D8 | &check; | D8 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

### CAN (Controller Area Network)

Neither the Argon nor the Photon 2 support CAN.

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.


### I2S (Sound)

The Argon supports I2S (sound) input and output with a third-party library.

There is no software support for I2S on the Photon 2, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.

### Interrupts

All pins can be used for interrupts on Gen 3 devices and the Photon 2.

There is a limit of 8 pin interrupts on the Argon; this limitation does not exist on the Photon 2.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset, is not available on the Photon 2. This also prevents system usage of retained memory, including session resumption on reset.

On Gen 2 and Gen 3 devices, retained memory is 3068 bytes. 

The flash file system can be used for data storage on the Photon 2, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### USB

The Photon 2 has a USB C connector, like the Tracker One and Tracker Eval Board.

The Argon has a Micro USB B connector.


### Full module pin comparison

{{imageOverlay src="/assets/images/argon/argon-pinout.png" alt="Argon Pinout Diagram" class="full-width"}}

{{imageOverlay src="/assets/images/photon-2-pinout.png" alt="Photon 2 Pinout Diagram" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### 3V3
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | 3V3 | 3V3|
| Description | Regulated 3.3V DC output, maximum load 1000 mA | Regulated 3.3V DC output, maximum load 500 mA|
#### A0
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A0 | A0|
| Pin Alternate Name | D19 | D19|
| Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### A1
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A1 | A1|
| Pin Alternate Name | D18 | D18|
| Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### A2
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A2|
| Pin Alternate Name | D17 | D17|
| Description | A2 Analog in, GPIO, PWM | A2 Analog in, GPIO, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### A3
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A3 | D16|
| Pin Alternate Name | D16 | n/a|
| Description | A3 Analog in, GPIO, PWM | D16 GPIO, Serial3 RX. Was A3 on Argon.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No|
| UART serial | n/a | RX. Use Serial3 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### A4
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A4 | D15|
| Pin Alternate Name | D15 | n/a|
| Description | A4 Analog in, GPIO, PWM | D15 GPIO, Was A4 on Argon.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### A5
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A5 | A5|
| Pin Alternate Name | D14 | D14|
| Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, PWM, SPI SS, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | SS. Use SPI object. Can use any GPIO for SS/CS.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D0
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D0 | D0|
| Pin Alternate Name | n/a | A3|
| Description | I2C SDA, GPIO | D0 GPIO, PWM, I2C SDA, A3 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D1
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D1 | D1|
| Pin Alternate Name | n/a | A4|
| Description | I2C SCL, GPIO | D1 GPIO, PWM, I2C SCL, A4 Analog In|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | No | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D2
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D2 | D2|
| Description | SPI1 SCK, Wire1 SDA, Serial1 RTS, PWM, GPIO | D2 GPIO, Serial2 RTS, SPI1 SCK.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No|
| UART serial | Options RTS hardware flow control for Serial1 | RTS. Use Serial2 object. Flow control optional.|
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object.|
| I2C interface | SDA. Use Wire1 object. | n/a|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D3
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D3|
| Description | SPI1 MOSI, Wire1 SCL, Serial1 CTS, PWM, GPIO | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes|
| UART serial | Options CTS hardware flow control for Serial1 | TX. Use Serial2 object.|
| SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object.|
| I2C interface | SCL. Use Wire1 object. | n/a|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D4
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D4|
| Description | SPI1 MISO, PWM, GPIO | D4 GPIO, PWM, Serial2 RX, SPI1 MISO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes|
| UART serial | n/a | RX. Use Serial2 object.|
| SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D5
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D5|
| Pin Alternate Name | n/a | WKP|
| Description | PWM, GPIO | GPIO D5, Serial2 CTS, SPI1 SS.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No|
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional.|
| SPI interface | n/a | SS. Use SPI1 object. Can use any GPIO for SPI SS/CS.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D6
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D6|
| Description | PWM, GPIO | D6 GPIO, SWCLK.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
| SWD interface | n/a | SWCLK. 40K pull-down at boot.|
#### D7
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7|
| Description | PWM, GPIO | D7 GPIO. Blue LED.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### D8
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D8 | D8|
| Description | GPIO, PWM | GPIO, PWM, SWDIO|
| Supports digitalRead | Yes | Yes.|
| Supports digitalWrite | Yes | Yes.|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
| SWD interface | n/a | SWDIO. 40K pull-up at boot.|
#### EN
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### LI+
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MISO | MISO|
| Pin Alternate Name | D11 | D11|
| Description | SPI MISO, GPIO | SPI MISO, D11 GPIO, Serial3 CTS|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional.|
| SPI interface | MISO. Use SPI object. | MISO. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### MODE
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MODE | MODE|
| Pin Alternate Name | D20 | n/a|
| Description | MODE button, has internal pull-up | MODE button, has internal pull-up|
#### MOSI
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MOSI | MOSI|
| Pin Alternate Name | D12 | D12|
| Description | SPI MOSI, GPIO | SPI MOSI, D12 GPIO, Serial3 RTS|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | RTS. Use Serial3 object. Flow control optional.|
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### RST
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### RX
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX|
| Pin Alternate Name | D10 | D10|
| Description | Serial RX, GPIO | Serial1 RX (received data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | RX Use Serial1 object. | RX. Use Serial1 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### SCK
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | SCK | SCK|
| Pin Alternate Name | D13 | D13|
| Description | SPI SCK, GPIO | SPI SCK, D13 GPIO, Serial3 TX|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | TX. Use Serial3 object.|
| SPI interface | SCK. Use SPI object. | SCK. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### TX
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | TX | TX|
| Pin Alternate Name | D09 | D9|
| Description | Serial TX, GPIO | Serial1 TX (transmitted data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | TX Use Serial1 object. | TX. Use Serial1 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### VUSB
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software

### Wi-Fi Configuration

The Photon 2 and Argon utilize BLE for configuration of Wi-Fi. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration. A React Native reference will be provided to simplify Wi-Fi setup.

Neither the Photon 2 nor Argon use the Wi-Fi based setup (SoftAP) that is used on the Photon and P1.

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
