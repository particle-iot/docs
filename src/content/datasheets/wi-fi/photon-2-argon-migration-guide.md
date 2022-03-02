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

### Pins A3, A4, and DAC (A6)

Pins A3 (module pin 22), A4 (module pin 21), DAC/A6 (module pin 24) do not exist on the P2 and are NC.

You will need to use different pins if you are currently using these pins.

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

#### SPI - P2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the P1 and P2. There is no hardware flow control on this port on the P1 or P2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

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
| A3 / D16 | &check; | D0 / A3 | &check; |
| A4 / D15 | &check; | D1 / A4 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| A4 / D15 | &check; | D15 | &nbsp; |
| A3 / D16 | &check; | D16 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}


### PWM (Pulse-width modulation)

The pins that support PWM are different on the Argon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Argon Pin Name | Argon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &nbsp; |
| A1 / D18 | &check; | A1 / D18 | &nbsp; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | D0 / A3 | &check; |
| A4 / D15 | &check; | D1 / A4 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| A4 / D15 | &check; | D15 | &nbsp; |
| A3 / D16 | &check; | D16 | &nbsp; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &check; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 / WKP | &nbsp; |
| D6 | &check; | D6 | &nbsp; |
| D7 | &check; | D7 | &nbsp; |
| D8 | &check; | D8 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}


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


{{!-- END do not edit content above, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

### Pin functions added

The following pins were NC on the P1 but are used on the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |


{{!-- END do not edit content above, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### Module Pin 1 (RST)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### Module Pin 2 (3V3)
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | 3V3 | 3V3|
| Description | Regulated 3.3V DC output, maximum load 1000 mA | Regulated 3.3V DC output, maximum load 500 mA|
#### Module Pin 3 (MODE)
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MODE | MODE|
| Pin Alternate Name | D20 | n/a|
| Description | MODE button, has internal pull-up | MODE button, has internal pull-up|
#### Module Pin 4 (GND)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 5 (A0)
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
#### Module Pin 6 (A1)
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
#### Module Pin 7 (A2)
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
#### Module Pin 8
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
#### Module Pin 9
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
#### Module Pin 10 (A5)
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
#### Module Pin 11 (SCK)
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
#### Module Pin 12 (MOSI)
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
#### Module Pin 13 (MISO)
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
#### Module Pin 14 (RX)
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX|
| Pin Alternate Name | D10 | D10|
| Description | Serial RX, GPIO | Serial1 RX (received data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | RX Use Serial1 object. | RX. Use Serial1 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### Module Pin 15 (TX)
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | TX | TX|
| Pin Alternate Name | D09 | D9|
| Description | Serial TX, GPIO | Serial1 TX (transmitted data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | TX Use Serial1 object. | TX. Use Serial1 object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### Module Pin 16 (D0)
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
#### Module Pin 17 (D1)
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
#### Module Pin 18 (D2)
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
#### Module Pin 19 (D3)
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
#### Module Pin 20 (D4)
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
#### Module Pin 21 (D5)
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
#### Module Pin 22 (D6)
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
#### Module Pin 23 (D7)
| | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7|
| Description | PWM, GPIO | D7 GPIO. Blue LED.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | No|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes|
#### Module Pin 24 (VUSB)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### Module Pin 25 (EN)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### Module Pin 26 (LI+)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### Module Pin 27 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 28 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 29 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 30 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 31 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 32 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 33 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 34 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 35 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 36 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 37 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 38 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 39 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 40 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 41 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 42 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 43 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 44 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 45 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 46 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 47 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 48 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 49 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 50 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 51 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 52 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 53 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 54 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 55 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 56 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 57 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 58 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 59 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 60 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 61 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 62 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 63 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 64 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 65 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 66 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 67 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 68 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 69 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 70 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 71 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 72 (NC)
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software

### Wi-Fi Configuration

The Photon 2 and Argon utilize BLE for configuration of Wi-Fi. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration. A React Native reference will be provided to simplify Wi-Fi setup.

Neither the Photon 2 nor Argon use the Wi-Fi based setup (SoftAP) that is used on the Photon and P1.

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
