---
title: P2 migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the P1 to P2
---

# P2 Migration Guide

**Preliminary pre-release version 2021-10-28**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}



|      | P1    | P2 |
| :--- | :---: | :---: |
| User application size | 128 KB | 1024 KB (1 MB) |
| Flash file system<sup>1</sup> |  | 2 MB |
| Wi-Fi | 802.11b/g/n | 802.11a/b/g/n Wi-Fi |
| | 2.4 GHz | 2.4 GHz &amp; 5 GHz |
| BLE | | &check;<sup>2</sup> |
| MCU | STM32F205RGY6 | RTL8721DM |
|  | ST Microelectronics | Realtek Semiconductor |
| ARM CPU | Cortex M3 | Cortex M4F |
|  | 120 MHz | 200 MHz |
| Hardware FPU | | &check; |
| Secure Boot | | &check; |

<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup>Wi-Fi and BLE share the same antenna (trace or external), using an internal coexistence mechanism.


## Hardware 

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the P2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### Pins A3 and A4

Pins A3 (module pin 22) and A4 (module pin 21) do not exist on the P2. You will need to use different pins if you are currently using these pins.

### SPI

Both the P1 and P2 have two SPI ports, however the pins are different for `SPI` (primary SPI).

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI SCK  | A3 | D20/S2 |
| SPI MISO | A4 | D19/S1 |
| SPI MOSI | A5 | D18/S0 |

For secondary SPI (`SPI1`) the pins are the same:

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI1 SCK  | D4 | D4 |
| SPI1 MISO | D3 | D4 |
| SPI1 MOSI | D2 | D4 |

**TODO: Check SPI speeds**


### Serial (UART)

|      | P1    | P2 |
| :--- | :---: | :---: |
| Buffer size | 64 bytes | 2048 bytes |
| Break detection | &check; | |
| LIN bus support | &check; | |
| Half duplex | &check; | |

**TODO: check baud rates, bit support, stop bits, parity support**


The primary UART serial (`Serial1`) is on the TX and RX pins on both the P1 and P2. There is no hardware flow control on this port on the P1 or P2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

|      | P1    | P2 |
| :--- | :---: | :---: |
| Serial2 TX  | RGB Blue | D4 |
| Serial2 RX  | RGB Green | D5 |
| Serial2 CTS |  | D3 |
| Serial2 RTS |  | D2 |




### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the P2:

|      | P1    | P2 |
| :--- | :---: | :---: |
| A0 | &check; | &check; |
| A1 | &check; | &check; |
| A2 | &check; | &check; |
| A3 | &check; | no pin |
| A4 | &check; | no pin |
| A5 | &check; | &check; |
| P1S0 | &check; | digital only |
| P1S2 | &check; | digital only |
| P1S3 | &check; | digital only |
| P1S5 | &check; | digital only |

### PWM (Pulse-width modulation)

The pins that support PWM are different on the P1 and P2.

**TODO: Add table of PWM pins**

### Digital to analog converter (DAC)

The P1 supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.

### CAN (Controller Area Network)

The P1 supports CAN on pins D1 and D2. There is no CAN on the P2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the P2.

### I2S (Sound)

The P1 theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the P2.

### Pin functions removed

The following pins served P1-specific uses and are NC on the P2. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 7 | WL_REG_ON | BCM43362 Debugging Pin. |
| 16 | WL_JTAG_TDI | BCM43362 Debugging Pin. |
| 17 | WL_JTAG_TCK | BCM43362 Debugging Pin. |
| 18 | WL_JTAG_TRSTN | BCM43362 Debugging Pin. |
| 19 | WL_JTAG_TMS | BCM43362 Debugging Pin. |
| 20 | WL_JTAG_TDO | BCM43362 Debugging Pin. |
| 21 | A4 | A4 Analog in, GPIO, SPI. |
| 22 | A3 | A3 True analog out, analog in, GPIO. |
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
