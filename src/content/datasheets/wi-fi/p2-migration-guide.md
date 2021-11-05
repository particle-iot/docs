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
| Digital GPIO | 24 | 23 |
| Analog (ADC) | 13 | 4 |
| Analog (DAC) | 2 | O |
| SPI | 2 | 2 |
| PWM | 12 | 7 |
| I2C | 1 | 1 |
| CAN | 1 | 0 |
| I2S | 1 | 0 |
| USB | 1 | 1 |

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

The following are all SPI-related pins on the P1 and P2:

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Pin | P1 Pin Name | P1 SPI | P2 Pin Name | P2 SPI |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A4 | SPI (MISO) | NC | &nbsp; | 
| 22 | A3 | SPI (SCK) | NC | &nbsp; | 
| 23 | A5 | SPI (MOSI) | A5 | SPI (MOSI) | 
| 40 | P1S0 | &nbsp; | S0 | SPI (MOSI) | 
| 41 | P1S1 | &nbsp; | S1 | SPI (MISO) | 
| 42 | P1S2 | &nbsp; | S2 | SPI (SCK) | 
| 45 | D2 | SPI1 (MOSI) | D2 | SPI1 (MOSI) | 
| 49 | A2 | SPI (SS) | A2 | &nbsp; | 
| 51 | D3 | SPI1 (MISO) | D3 | SPI1 (MISO) | 
| 52 | D4 | SPI1 (SCK) | D4 | SPI1 (SCK) | 
| 53 | D5 | SPI1 (SS) | D5 | SPI1 (SS) | 


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
| 31 | RGBB | Serial2 (RX) | RGBB | &nbsp; | 
| 32 | RGBG | Serial2 (TX) | RGBG | &nbsp; | 
| 45 | D2 | &nbsp; | D2 | Serial2 (RTS) | 
| 51 | D3 | &nbsp; | D3 | Serial2 (CTS) | 
| 52 | D4 | &nbsp; | D4 | Serial2 (RX) | 
| 53 | D5 | &nbsp; | D5 | Serial2 (TX) | 
| 63 | RX | Serial1 (RX) | RX | Serial1 (RX)  | 
| 64 | TX | Serial1 (TX) | TX | Serial1 (TX) | 


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
| 21 | A4 | &check; | NC | &nbsp; | 
| 22 | A3 | &check; | NC | &nbsp; | 
| 23 | A5 | &check; | A5 | &check; | 
| 24 | DAC | &check; | D8 | &nbsp; | 
| 30 | WKP | &check; | D11 | &nbsp; | 
| 40 | P1S0 | &check; | S0 | &nbsp; | 
| 41 | P1S1 | &check; | S1 | &nbsp; | 
| 42 | P1S2 | &check; | S2 | &nbsp; | 
| 43 | A1 | &check; | A1 | &check; | 
| 44 | P1S3 | &check; | S3 | &nbsp; | 
| 48 | P1S5 | &check; | S5 | &nbsp; | 
| 49 | A2 | &check; | A2 | &check; | 
| 50 | A0 | &check; | A0 | &check; | 


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}


### PWM (Pulse-width modulation)

The pins that support PWM are different on the P1 and P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Pin | P1 Pin Name | P1 PWM | P2 Pin Name | P2 PWM |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A4 | &check; | NC | &nbsp; | 
| 23 | A5 | &check; | A5 | &check; | 
| 24 | DAC | &nbsp; | D8 | &check; | 
| 30 | WKP | &check; | D11 | &nbsp; | 
| 33 | P1S6 | &check; | S6 | &nbsp; | 
| 35 | D1 | &check; | D1 | &check; | 
| 36 | D0 | &check; | D0 | &check; | 
| 40 | P1S0 | &check; | S0 | &check; | 
| 41 | P1S1 | &check; | S1 | &check; | 
| 45 | D2 | &check; | D2 | &nbsp; | 
| 49 | A2 | &nbsp; | A2 | &check; | 
| 51 | D3 | &check; | D3 | &nbsp; | 
| 63 | RX | &check; | RX | &nbsp; | 
| 64 | TX | &check; | TX | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}


### Digital to analog converter (DAC)

The P1 supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Pin | P1 Pin Name | P1 DAC | P2 Pin Name | P2 DAC |
| :---: | :--- | :--- | :--- | :--- |
| 22 | A3 | &check; | NC | &nbsp; | 
| 24 | DAC | &check; | D8 | &nbsp; | 


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
| 35 | D1 | &check; | D1 | &nbsp; | 
| 45 | D2 | &check; | D2 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

The P1 theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

| Pin | P1 Pin Name | P1 I2S | P2 Pin Name | P2 I2S |
| :---: | :--- | :--- | :--- | :--- |
| 45 | D2 | I2S3_SD | D2 | &nbsp; | 
| 46 | SETUP | I2S3_MCK | SETUP | &nbsp; | 
| 52 | D4 | I2S3_SCK | D4 | &nbsp; | 
| 53 | D5 | I2S3_WS | D5 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}




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

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### Module Pin 1 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 2
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT_WL | 3V3_RF|
| Description | Battery for BCM43362. | 3.3V power to RF module|
#### Module Pin 3
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT_WL | 3V3_RF|
| Description | Battery for BCM43362. | 3.3V power to RF module|
#### Module Pin 4 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 5
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VDDIO_3V3_WL | 3V3_IO|
| Description | Regulated 3.3V DC power input for BCM43362. | 3.3V power to MCU IO.|
#### Module Pin 6 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 7
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_REG_ON | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 8 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 9 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 10 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 11 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 12
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | NC | VBAT_MEAS|
| Description | No connection. Do not connect anything to this pin. | Battery voltage measurement (optional).|
#### Module Pin 13 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 14 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 15 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 16
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TDI | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 17
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TCK | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 18
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TRSTN | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 19
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TMS | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 20
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TDO | NC|
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin.|
#### Module Pin 21
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A4 | NC|
| Description | A4 Analog in, GPIO, SPI. | No connection. Do not connect anything to this pin.|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogRead | Yes | n/a|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | n/a|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | n/a|
| SPI interface | MISO. Use SPI object. | n/a|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | n/a|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 22
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A3 | NC|
| Description | A3 True analog out, analog in, GPIO. | No connection. Do not connect anything to this pin.|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogRead | Yes | n/a|
| Supports analogWrite (DAC) | Yes | n/a|
| SPI interface | SCK. Use SPI object. | n/a|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | n/a|
#### Module Pin 23 (A5)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A5 | A5|
| Pin Alternate Name | n/a | D17|
| Description | A5 Analog in, GPIO, SPI. | A5 Analog in, GPIO, PWM, SPI.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object.|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 24
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | DAC | D8|
| Pin Alternate Name | A6 | n/a|
| Description | DAC/A6 True analog out, analog in, GPIO. | GPIO, PWM. (Was DAC/A6 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (DAC) | Yes | No|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | Yes|
#### Module Pin 25 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 26 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 27 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 28 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 29 (RGBR)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBR | RGBR|
| Description | RGB LED Red | RGB LED Red|
| Supports attachInterrupt | n/a | Yes|
| Input is 5V Tolerant | No, if LED is connected. | No|
#### Module Pin 30
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WKP | D11|
| Pin Alternate Name | A7 | WKP|
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | GPIO. (Was WKP/A7 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | n/a|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 31 (RGBB)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBB | RGBB|
| Description | RGB LED Blue | RGB LED Blue|
| UART serial | RX. Use Serial2 object. | n/a|
| Supports attachInterrupt | n/a | Yes|
| Input is 5V Tolerant | No, if LED is connected. | No|
#### Module Pin 32 (RGBG)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBG | RGBG|
| Description | RGB LED Green | RGB LED Green|
| UART serial | TX. Use Serial2 object. | n/a|
| Supports attachInterrupt | n/a | Yes|
| Input is 5V Tolerant | No, if LED is connected. | No|
#### Module Pin 33
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S6 | S6|
| Pin Alternate Name | n/a | D24|
| Description | P1S6 GPIO | S6 GPIO. (Was P1S6/TESTMODE on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes | Yes|
#### Module Pin 34 (RST)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### Module Pin 35 (D1)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D1 | D1|
| Description | D0 GPIO, I2C, CAN | D1 GPIO, PWM, I2C|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes|
| CAN interface | CAN2_TX | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 36 (D0)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D0 | D0|
| Description | D0 GPIO, I2C | D0 GPIO, PWM, I2C|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | No | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 37 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 38
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT | NC|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | No connection. Do not connect anything to this pin.|
#### Module Pin 39 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 40
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S0 | S0|
| Pin Alternate Name | n/a | D18|
| Description | P1S0 Analog in, GPIO, PWM. | S0 GPIO, PWM, SPI. (Was P1S0 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes. | Yes|
| SPI interface | n/a | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 41
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S1 | S1|
| Pin Alternate Name | n/a | D19|
| Description | P1S1 Analog in, GPIO, PWM. | S1 GPIO, PWM, SPI. (Was P1S1 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes. | Yes|
| SPI interface | n/a | MISO. Use SPI object.|
| Supports attachInterrupt | Yes. P1S1 and P1S5 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 42
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S2 | S2|
| Pin Alternate Name | n/a | D20|
| Description | P1S2 Analog in, GPIO | S2 GPIO, SPI. (Was P1S2 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| SPI interface | n/a | SCK. Use SPI object.|
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 43 (A1)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A1 | A1|
| Pin Alternate Name | n/a | D13|
| Description | A1 Analog in, GPIO | A1 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 44
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S3 | S3|
| Pin Alternate Name | n/a | D21|
| Description | P1S3 Analog in, GPIO | S3 GPIO. (Was P1S3 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 45 (D2)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D2 | D2|
| Description | D2 GPIO, SPI1, CAN | D2 GPIO, Serial2, SPI1|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No|
| UART serial | n/a | RTS. Use Serial2 object. Flow control optional.|
| SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object.|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| CAN interface | CAN2_RX | n/a|
| I2S interface | I2S3_SD | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 46 (SETUP)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | SETUP | SETUP|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN. | SETUP button, has internal pull-up. Pin number constant is BTN.|
| Supports attachInterrupt | n/a | Yes|
| I2S interface | I2S3_MCK | n/a|
#### Module Pin 47
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S4 | S4|
| Pin Alternate Name | n/a | D22|
| Description | P1S4 GPIO | S4 GPIO. (Was P1S4 on P1.)|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports attachInterrupt | Yes. D7 and P1S4 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 48
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S5 | S5|
| Pin Alternate Name | n/a | D23|
| Description | P1S5 Analog in, GPIO | S5 GPIO. (Was P1S5 on P1.)|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports attachInterrupt | Yes. P1S1 and P1S5 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 49 (A2)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A2|
| Pin Alternate Name | n/a | D14|
| Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, PWM, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 50 (A0)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A0 | A0|
| Pin Alternate Name | n/a | D0|
| Description | A0 Analog in, GPIO | A0 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 51 (D3)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D3|
| Description | D3 GPIO, SPI1 | D3 GPIO, Serial2, SPI1|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No|
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional.|
| SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object.|
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a|
#### Module Pin 52 (D4)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D4|
| Description | D4 GPIO, SPI1 | D4 GPIO, Serial2, SPI1|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | RX. Use Serial2 object.|
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object.|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes|
| I2S interface | I2S3_SCK | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDO. Floating at boot. | n/a|
#### Module Pin 53 (D5)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D5|
| Description | D5 GPIO, SPI1 | D5 GPIO, Serial2, SPI1|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | n/a | TX. Use Serial2 object.|
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however.|
| Supports attachInterrupt | Yes | Yes|
| I2S interface | I2S3_WS | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a|
#### Module Pin 54 (D7)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7|
| Description | D7 GPIO | D7 GPIO|
| Supports digitalRead | Yes. | Yes.|
| Supports digitalWrite | Yes. On the Photon this is the blue D7 LED. | Yes. On the Photon this is the blue D7 LED.|
| Supports attachInterrupt | Yes. D7 and P1S4 share the same interrupt handler. | Yes|
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a|
| SWD interface | SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot.|
#### Module Pin 55 (D6)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D6|
| Description | D6 GPIO | D6 GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a|
| SWD interface | SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot.|
#### Module Pin 56
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_STATUS | NC|
| Description | Coexistence signal: Bluetooth status and TX/RX direction. | No connection. Do not connect anything to this pin.|
#### Module Pin 57
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_RF_ACTIVE | NC|
| Description | Coexistence signal: Bluetooth is active. | No connection. Do not connect anything to this pin.|
#### Module Pin 58
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_TXCONF | NC|
| Description | Output giving Bluetooth permission to TX. | No connection. Do not connect anything to this pin.|
#### Module Pin 59 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 60
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_SLEEP_CLK | NC|
| Description | BCM43362 Debugging Pin | No connection. Do not connect anything to this pin.|
#### Module Pin 61 (USBDATA+)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 62 (USBDATA-)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 63 (RX)
| | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX|
| Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| UART serial | RX. Use Serial1 object. | RX. Use Serial1 object.|
| Supports attachInterrupt | Yes | Yes|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 64 (TX)
| | P1 | P2 |
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
#### Module Pin 65 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 66 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 67 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 68 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 69 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 70 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 71 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 72 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}
