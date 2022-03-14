---
title: E404X migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the E Series E402/E404 to E404X
---

# E404X Migration Guide

**Preliminary pre-release version 2022-03-14**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release migration guide and the contents are subject to change.
{{box op="end"}}


This guide assists in the transition from the E Series E402/E404 to the E404X.


## Software Differences

### User firmware binary size

One major advantage of the E404X is that user firmware binaries can be up to 256 Kbytes, instead of 128 Kbytes on Gen 2 devices including the E Series.

### Flash file system

On the E404X and Gen 3 devices, there is a flash file system (2 MB) for storing user data. This is not available on Gen 2 devices.

### Combined and resumable OTA

On the E404X and Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.


### Sleep Modes

- In general, the E404X will use less power in all modes.
- In `HIBERNATE` mode, the RTC (real time clock) does not run on the E404X, so you cannot wake by time from `HIBERNATE` mode (formerly known as `SLEEP_MODE_DEEP`).
- However, you can wake by time from `ULTRA_LOW_POWER` mode, and it uses less power than the E Series`HIBERNATE` mode.
- On Gen 2 devices, you can only wake from `HIBERNATE` with a rising signal on `WKP` (A7). The E404X can wake from `HIBERNATE` on any pin, rising or falling.
- On Gen 2 (STM32F205) devices, if you try to go into `HIBERNATE` mode with WKP already high, the device will go into sleep and will not wake up by time or pin change, essentially rendering it unable to wake until reset manually. This problem does not occur on the E404X and Gen 3 devices.

### RTC (Real-time clock)

- The E Series module has the ability to use an external lithium coin cell or supercap to power the RTC when the MCU is unpowered. This feature does not exist on the E404X.
- The RTC on the E404X s is not really a real-time clock. It's basically just a counter, and some advanced wakeup features are not possible on the E404X and Gen 3 devices. These features were not enabled by Device OS on Gen 2 devices, either, so this is generally not an issue.
- On the E404X and Gen 3 devices, in `HIBERNATE` sleep mode the RTC does not run, so it is not possible to wake by time, and the system clock will not be set until you connect to the cloud again. `ULTRA_LOW_POWER` is recommended instead.


## Hardware differences

### MCU

The microcontroller is different in E Series and E404X:

| Measure | E Series | E404X |
| :--- | :---: | :---: |
| MCU | STM32F205 | nRF52840 |
| Manufacturer | ST Microelectronics | Nordic Semiconductor |
| Processor | ARM Cortex M3 | ARM Cortex M4F |
| Speed | 120 MHz | 64 MHz |
| RAM | 128 KB | 256 KB | 
| Flash (MCU) | 1 MB | 1 MB |
| Flash (external) | &nbsp; | 4 MB<sup>1</sup> |
| Hardware floating point | &nbsp; | &check; |

- <sup>1</sup>Most of this space is reserved by the system and only a portion if it is available to user applications as a flash file system.
- Not all RAM is available to user applications. The Device OS firmware uses a portion of it.

### BLE (Bluetooth LE)

- Bluetooth LE (BLE 5.0) is supported on the E404X but not E Series (Gen 2).


### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for the E404X and Gen 3 (nRF52840). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### Pins no longer available for GPIO

| Pin | Pin Name | Reason |
| :---: | :--- | :--- | 
| 28 | B5 | NC on E404X |
| 29 | B4 | NC on E404X |
| 35 | D7 | SWD debugging SWDIO |
| 36 | D6 | SWD debugging SWDCLK | 
| 38 | D4 | SWD debugging SWO |
| 39 | D3 | NC on E404X |


You will need to use different pins if you are currently using these pins.

### SPI

- On the E404X, there are only two SPI ports `SPI` (A pins) and `SPI1` (C pins)
- E Series `SPI1` on the D pins does not exist on the E404X. 
- E Series `SPI2` on the C pins is `SPI1` on the E404X


The following are all SPI-related pins on the E Series and E404X:

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Pin | E Series Pin Name | E Series SPI | E404X Pin Name | E404X SPI |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A5 | SPI (MOSI) | A5 | SPI (MOSI) | 
| 22 | A4 | SPI (MISO) | A4 | SPI (MISO) | 
| 23 | A3 | SPI (SCK) | A3 | SPI (SCK) | 
| 24 | A2 | SPI (SS) | A2 | SPI (SS) | 
| 37 | D5 | SPI1 (SS) | D5 | SPI1 (SS) | 
| 38 | D4 | SPI1 (SCK) | SWO | &nbsp; | 
| 39 | D3 | SPI1 (MISO) | NC | &nbsp; | 
| 40 | D2 | SPI1 (MOSI) | D2 | &nbsp; | 
| 46 | C3 | SPI2 (SCK) | C3 | SPI1 (SCK) | 
| 47 | C2 | SPI2 (MISO) | C2 | SPI1 (MISO) | 
| 48 | C1 | SPI2 (MOSI) | C1 | SPI1 (MOSI) | 


{{!-- END do not edit content above, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

The following SPI data rates are available:

| | E Series SPI | E Series SPI1 | E404X SPI & SPI1 |
| :--- | :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz | 32 MHz |
| Default rate | 15 MHz | 15 MHz | 16 MHz |
| Clock | 60 MHz | 30 MHz | 64 MHz | 

- Available clock divisors: 2, 4 (default), 8, 16, 32, 64, 128, 256
- On the E404X, `SPI_MODE_SLAVE` is only supported on `SPI1` and is limited to 8 MHz

### I2C

- On the E Series, only one of `Wire` and `Wire1` can be used at the same time. Both I2C ports be used at the same time on the E404X.

{{!-- BEGIN do not edit content below, it is automatically generated e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05 --}}

| Pin | E Series Pin Name | E Series I2C | E404X Pin Name | E404X I2C |
| :---: | :--- | :--- | :--- | :--- |
| 41 | D1 | Wire (SCL) | D1 | Wire (SCL) | 
| 42 | D0 | Wire (SDA) | D0 | Wire (SDA) | 
| 44 | C5 | Wire1 (SCL) | C5 | Wire1 (SCL) | 
| 45 | C4 | Wire1 (SDA) | C4 | Wire1 (SDA) | 


{{!-- END do not edit content above, it is automatically generated e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05 --}}


### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the E Series and E404X. There is no hardware flow control on this port on E Series, but it can be enabled on the E404X on pins D0 (CTS) and D1 (RTS).

The E Series has additional serial ports `Serial2`, `Serial4`, and `Serial5`. These are not available on the E404X.


|      | E Series  | E404X |
| :--- | :---: | :---: |
| Buffer size | 64 bytes | configurable<sup>1</sup> |
| 7-bit mode | &check; |  |
| 8-bit mode | &check; | &check; |
| 9-bit mode | &check; | |
| Half duplex | &check; | |
| LIN bus | &check; | |
| CTS/RTS flow control |  | &check;<sup>2</sup> |

<sup>1</sup>Default buffer size is 64 bytes but you can configure a larger buffer if desired, limited by available RAM.

<sup>2</sup>CTS/RTS flow control optional on `Serial1`.


{{!-- BEGIN do not edit content below, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

| Pin | E Series Pin Name | E Series Serial | E404X Pin Name | E404X Serial |
| :---: | :--- | :--- | :--- | :--- |
| 16 | TX | Serial1 (TX) | TX | Serial1 (TX) | 
| 17 | RX | Serial1 (RX) | RX | Serial1 (RX) | 
| 41 | D1 | &nbsp; | D1 | Serial1 (CTS) | 
| 42 | D0 | &nbsp; | D0 | Serial1 (RTS) | 
| 46 | C3 | USART4_TX | C3 | &nbsp; | 
| 47 | C2 | USART4_RX | C2 | &nbsp; | 
| 48 | C1 | USART5_TX | C1 | &nbsp; | 
| 49 | C0 | USART5_RX | C0 | &nbsp; | 
| 52 | RGBB | Serial2 (RX) | RGBB | &nbsp; | 
| 53 | RGBG | Serial2 (TX) | RGBG | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

#### Baud rate support

| Baud Rate | E Series | E404X |
| ------: | :-----: | :---: |
|    1200 | &check; | &check; |
|    2400 | &check; | &check; |
|    4800 | &check; | &check; |
|    9600 | &check; | &check; |
|   19200 | &check; | &check; |
|   28800 | &nbsp;  | &check; |
|   38400 | &check; | &check; |
|   57600 | &check; | &check; |
|   76800 | &nbsp;  | &check; |
|  115200 | &check; | &check; |
|  230400 | &check; | &check; |
|  250000 | &nbsp;  | &check; |
|  460800 | &nbsp;  | &check; |
|  921600 | &nbsp; | &check; |
| 1000000 | &nbsp;  | &check; |

#### Serial configurations

| Constant | Description | E Series | E404X |
| :--- | :--- | :---: | :---: |
| SERIAL_8N1 | 8 data bits, no parity, 1 stop bit (default) | &check; | &check; |
| SERIAL_8N2 | 8 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8E1 | 8 data bits, even parity, 1 stop bit | &check; | &check; |
| SERIAL_8E2 | 8 data bits, even parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8O1 | 8 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_8O2 | 8 data bits, odd parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_9N1 | 9 data bits, no parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_9N2 | 9 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_7O1 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7O2 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E1 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E2 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| LIN_MASTER_13B | 8 data bits, no parity, 1 stop bit, LIN Master mode with 13-bit break generation | &check; | &nbsp; |
| LIN_SLAVE_10B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 10-bit break detection | &check; | &nbsp; |
| LIN_SLAVE_11B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 11-bit break detection | &check; | &nbsp; |

- Using an I2C or SPI UART like the SC16IS750 is also a good way to add support for other bit length, parity, and stop bit options on Gen 3 devices.


### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the E404X:

{{!-- BEGIN do not edit content below, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

| Pin | E Series Pin Name | E Series ADC | E404X Pin Name | E404X ADC |
| :---: | :--- | :--- | :--- | :--- |
| 19 | WKP / A7 | &check; | A7 / WKP | &check; | 
| 20 | DAC / A6 | &check; | A6 | &check; | 
| 21 | A5 | &check; | A5 | &check; | 
| 22 | A4 | &check; | A4 | &check; | 
| 23 | A3 | &check; | A3 | &check; | 
| 24 | A2 | &check; | A2 | &check; | 
| 25 | A1 | &check; | A1 | &check; | 
| 26 | A0 | &check; | A0 | &check; | 
| 28 | B5 | &check; | NC | &nbsp; | 
| 29 | B4 | &check; | NC | &nbsp; | 
| 30 | B3 | &check; | B3 | &nbsp; | 
| 31 | B2 | &check; | B2 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

If additional ADC ports are needed, an external I2C and SPI ADC can be added to your base board.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the E Series and E404X.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Pin | E Series Pin Name | E Series PWM | E404X Pin Name | E404X PWM |
| :---: | :--- | :--- | :--- | :--- |
| 16 | TX | &check; | TX | &check; | 
| 17 | RX | &check; | RX | &check; | 
| 19 | WKP / A7 | &check; | A7 / WKP | &nbsp; | 
| 21 | A5 | &check; | A5 | &check; | 
| 22 | A4 | &check; | A4 | &check; | 
| 23 | A3 | &nbsp; | A3 | &check; | 
| 24 | A2 | &nbsp; | A2 | &check; | 
| 30 | B3 | &check; | B3 | &check; | 
| 31 | B2 | &check; | B2 | &check; | 
| 32 | B1 | &check; | B1 | &nbsp; | 
| 33 | B0 | &check; | B0 | &nbsp; | 
| 39 | D3 | &check; | NC | &nbsp; | 
| 40 | D2 | &check; | D2 | &check; | 
| 41 | D1 | &check; | D1 | &check; | 
| 42 | D0 | &check; | D0 | &check; | 
| 44 | C5 | &check; | C5 | &nbsp; | 
| 45 | C4 | &check; | C4 | &nbsp; | 
| 49 | C0 | &nbsp; | C0 | &check; | 


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

- PWM on the same timer (such as TIM3 or PMM3) must share the same frequency, but can have different duty cycles.
- E404X pin B2 uses PWM0 which is used by the RGB LED. You can have a different duty cycle but should not change the frequency if you are using the RGB LED.


### Digital to analog converter (DAC)

The E Series supports DAC one A3 and A6 (DAC). There is no DAC on the E404X or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.


{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Pin | E Series Pin Name | E Series DAC | E404X Pin Name | E404X DAC |
| :---: | :--- | :--- | :--- | :--- |
| 20 | DAC / A6 | &check; | A6 | &nbsp; | 
| 23 | A3 | &check; | A3 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}



### WKP (A7)

|              | E Series    | E404X |
| :----------- | :---------: | :---: |
| Module Pin   | 30          | 30 |
| Pin Name     | WKP         | WKP |
|              | A7          | A7 |
| Analog Input | &check;     | &check; |
| PWM          | &check;     |  |

On Gen 2 devices (STM32), only the WKP pin rising can wake from HIBERNATE sleep mode. 

This restriction does not exist on the E404X and Gen 3 devices; any pin can be used to wake from all sleep modes, rising or falling.

### CAN (Controller Area Network)

The E series supported CAN on pins D1/D2 or C4/C5. There is no CAN on the E404X or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the E404X.


{{!-- BEGIN do not edit content below, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}

| Pin | E Series Pin Name | E Series CAN | E404X Pin Name | E404X CAN |
| :---: | :--- | :--- | :--- | :--- |
| 40 | D2 | CAN2_RX | D2 | &nbsp; | 
| 41 | D1 | CAN2_TX | D1 | &nbsp; | 
| 44 | C5 | CAN1_RX | C5 | &nbsp; | 
| 45 | C4 | CAN1_TX | C4 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

- The E Series theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.
- I2S is available on Gen 3 devices including the P404X on any GPIO pins using a 3rd-party library.


### Interrupts

There are many limitations for interrupts on the E Series (STM32F205). All pins can be used for interrupts on the E404X Gen 3 devices, however you can only attach interrupts to 8 pins at a time.

### SWD

Unlike the E Series module, the E404X SWD pins are dedicated and cannot be used for GPIO.

{{!-- BEGIN do not edit content below, it is automatically generated b90ca6ee-1877-4f05-a3bd-b073d768e54d --}}

| Pin | E Series Pin Name | E Series SWD | E404X Pin Name | E404X SWD |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D7 | SWDIO | SWDIO | SWDIO | 
| 36 | D6 | SWCLK | SWDCLK | SWCLK | 
| 38 | D4 | &nbsp; | SWO | SWO | 


{{!-- END do not edit content above, it is automatically generated b90ca6ee-1877-4f05-a3bd-b073d768e54d --}}

### JTAG

The E404X does not support full JTAG. Some pins are shared with SWD; the E404X SWD pins are dedicated and cannot be used for GPIO.

Pin D5 (module pin 37), however, is available for GPIO as it is not NC and not used by SWD.

{{!-- BEGIN do not edit content below, it is automatically generated 2767a61d-eba6-4720-8c91-869be322880f --}}

| Pin | E Series Pin Name | E Series JTAG | E404X Pin Name | E404X JTAG |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D7 | JTAG TMS | SWDIO | &nbsp; | 
| 36 | D6 | JTAG TCK | SWDCLK | &nbsp; | 
| 37 | D5 | JTAG TDI | D5 | &nbsp; | 
| 38 | D4 | JTAG TDO | SWO | &nbsp; | 
| 39 | D3 | JTAG RST | NC | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated 2767a61d-eba6-4720-8c91-869be322880f --}}

### USB

The following USB feature differences exist:

| USB Feature | E Series | E404X |
| :--- | :---: | :---: |
| Secondary USB serial emulation `USBSerial1` | &check; | |
| USB keyboard emulation | &check; | |
| USB mouse emulation | &check; | |


### Pin functions removed

The following pins were used on the E Series but are not available on the E404X. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 10 | VDDA | Power input for ADC. Normally connected to 3V3. Must always be within 300 mV of 3V3. |
| 11 | VBAT | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. |
| 28 | B5 | B5 Analog in, GPIO |
| 29 | B4 | B4 Analog in, GPIO |
| 39 | D3 | D3 GPIO, SPI1 |


{{!-- END do not edit content above, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

### Pin functions added

No pin functions have been added to previously unused (NC) pins.


### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}



{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software


### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID

Since the E404X uses the same MCU as Gen 3 devices (Boron, B Series SoM, Tracker SoM), most libraries intended for those platforms will work with no changes or minimal changes.


## Version History

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-01-25 | RK | Pre-release |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
