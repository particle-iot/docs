---
title: P2 migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the P1 to P2
---

# P2 Migration Guide

**Preliminary pre-release version 2022-02-25**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

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
| Analog (ADC) | 6 | 13 | 6 |
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

Both the P1 and P2 have two SPI ports, however the pins are different for `SPI` (primary SPI).

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI SCK  | A3 | D20 / S2 |
| SPI MISO | A4 | D19 / S1 |
| SPI MOSI | A5 | D18 / S0 |

The following are all SPI-related pins on the P1 and P2:

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Pin | P1 Pin Name | P1 SPI | P2 Pin Name | P2 SPI |
| :---: | :--- | :--- | :--- | :--- |
| | A4 | SPI (MISO) | NC | &nbsp; |
| | A3 | SPI (SCK) | NC | &nbsp; |
| | A5 | SPI (MOSI) | A5 / D14 | &nbsp; |
| | P1S0 | &nbsp; | S0 / D15 | SPI (MOSI) |
| | P1S1 | &nbsp; | S1 / D16 | SPI (MISO) |
| | P1S2 | &nbsp; | S2 / D17 | SPI (SCK) |
| | P1S3 | &nbsp; | S3 / D18 | SPI (SS) |
| | D2 | SPI1 (MOSI) | D2 | SPI1 (MOSI) |
| | A2 | SPI (SS) | A2 / D13 | &nbsp; |
| | D3 | SPI1 (MISO) | D3 | SPI1 (MISO) |
| | D4 | SPI1 (SCK) | D4 | SPI1 (SCK) |
| | D5 | SPI1 (SS) | D5 | SPI1 (SS) |


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

| Pin | P1 Pin Name | P1 Serial | P2 Pin Name | P2 Serial |
| :---: | :--- | :--- | :--- | :--- |
| | RGBB | Serial2 (RX) | RGBB | &nbsp; |
| | RGBG | Serial2 (TX) | RGBG | &nbsp; |
| | D2 | &nbsp; | D2 | Serial2 (RTS) |
| | D3 | &nbsp; | D3 | Serial2 (CTS) |
| | D4 | &nbsp; | D4 | Serial2 (TX) |
| | D5 | &nbsp; | D5 | Serial2 (RX) |
| | RX | Serial1 (RX) | RX / D9 | Serial1 (RX)  |
| | TX | Serial1 (TX) | TX / D8 | Serial1 (TX) |


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

| Pin | P1 Pin Name | P1 ADC | P2 Pin Name | P2 ADC |
| :---: | :--- | :--- | :--- | :--- |
| | A4 | &check; | NC | &nbsp; |
| | A3 | &check; | NC | &nbsp; |
| | A5 | &check; | A5 / D14 | &check; |
| | DAC / A6 | &check; | NC | &nbsp; |
| | WKP / A7 | &check; | D10 / WKP | &nbsp; |
| | D1 | &nbsp; | D1 / A4 | &check; |
| | D0 | &nbsp; | D0 / A3 | &check; |
| | P1S0 | &check; | S0 / D15 | &nbsp; |
| | P1S1 | &check; | S1 / D16 | &nbsp; |
| | P1S2 | &check; | S2 / D17 | &nbsp; |
| | A1 | &check; | A1 / D12 | &check; |
| | P1S3 | &check; | S3 / D18 | &nbsp; |
| | P1S5 | &check; | S5 / D20 | &nbsp; |
| | A2 | &check; | A2 / D13 | &check; |
| | A0 | &check; | A0 / D11 | &check; |


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

On the P2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, P2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for P2 pin D1 (hardware pin 35), which has the alias A4.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the P1 and P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Pin | P1 Pin Name | P1 PWM | P2 Pin Name | P2 PWM |
| :---: | :--- | :--- | :--- | :--- |
| | A4 | &check; | NC | &nbsp; |
| | A5 | &check; | A5 / D14 | &check; |
| | WKP / A7 | &check; | D10 / WKP | &nbsp; |
| | P1S6 | &check; | S6 / D21 | &nbsp; |
| | D1 | &check; | D1 / A4 | &check; |
| | D0 | &check; | D0 / A3 | &check; |
| | P1S0 | &check; | S0 / D15 | &check; |
| | P1S1 | &check; | S1 / D16 | &check; |
| | D2 | &check; | D2 | &nbsp; |
| | A2 | &nbsp; | A2 / D13 | &check; |
| | D3 | &check; | D3 | &nbsp; |
| | RX | &check; | RX / D9 | &nbsp; |
| | TX | &check; | TX / D8 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}


### Digital to analog converter (DAC)

The P1 supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Pin | P1 Pin Name | P1 DAC | P2 Pin Name | P2 DAC |
| :---: | :--- | :--- | :--- | :--- |
| | A3 | &check; | NC | &nbsp; |
| | DAC / A6 | &check; | NC | &nbsp; |


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

| Pin | P1 Pin Name | P1 CAN | P2 Pin Name | P2 CAN |
| :---: | :--- | :--- | :--- | :--- |
| | D1 | &check; | D1 / A4 | &nbsp; |
| | D2 | &check; | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

The P1 theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

| Pin | P1 Pin Name | P1 I2S | P2 Pin Name | P2 I2S |
| :---: | :--- | :--- | :--- | :--- |
| | D2 | I2S3_SD | D2 | &nbsp; |
| | SETUP | I2S3_MCK | SETUP | &nbsp; |
| | D4 | I2S3_SCK | D4 | &nbsp; |
| | D5 | I2S3_WS | D5 | &nbsp; |


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
| 16 | WL_JTAG_TDI | BCM43362 Debugging Pin. |
| 17 | WL_JTAG_TCK | BCM43362 Debugging Pin. |
| 18 | WL_JTAG_TRSTN | BCM43362 Debugging Pin. |
| 19 | WL_JTAG_TMS | BCM43362 Debugging Pin. |
| 20 | WL_JTAG_TDO | BCM43362 Debugging Pin. |
| 21 | A4 | A4 Analog in, GPIO, SPI. |
| 22 | A3 | A3 True analog out, analog in, GPIO. |
| 24 | DAC / A6 | DAC/A6 True analog out, analog in, GPIO. |
| 38 | VBAT | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. |
| 38 | VBAT_MICRO | Battery for internal real-time clock. |
| 56 | BTCX_STATUS | Coexistence signal: Bluetooth status and TX/RX direction. |
| 57 | BTCX_RF_ACTIVE | Coexistence signal: Bluetooth is active. |
| 58 | BTCX_TXCONF | Output giving Bluetooth permission to TX. |
| 60 | WL_SLEEP_CLK | BCM43362 Debugging Pin |


{{!-- END do not edit content above, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

### Pin functions added

The following pins were NC on the P1 but are used on the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 12 | VBAT_MEAS | Battery voltage measurement (optional). |


{{!-- END do not edit content above, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}



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
| pre | 2021-11-04 | RK | Pre-release |
|     | 2022-02-08 | RK | Corrected D pin aliases for A5 and S0-S6 |
|     | 2022-02-25 | RK | Changed D pin aliases for D9 - D22, A5 is not SPI MOSI, Serial2 TX and RX were reversed |
