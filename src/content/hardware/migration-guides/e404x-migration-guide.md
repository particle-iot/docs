---
title: E404X migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the E Series E402/E404 to E404X
---

# E404X migration guide

This guide assists in the transition from the E Series E402/E404 to the E404X.


## Software differences

### User firmware binary size

One major advantage of the E404X is that user firmware binaries can be up to 256 Kbytes, instead of 128 Kbytes on Gen 2 devices including the E Series.

### Flash file system

On the E404X and Gen 3 devices, there is a flash file system (2 MB) for storing user data. This is not available on Gen 2 devices.

### Combined and resumable OTA

On the E404X and Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Increased API field limits

The maximum size of a variable, function parameter, or publish is 1024 bytes on the E404X vs. 864 bytes on other E Series models.

| API Field | E Series | E404X |
| :--- | :---: | :---: |
| Variable Key | 64 | 64 |
| Variable Data | 864 | 1024 |
| Function Key | 64 | 64 |
| Function Argument | 864 | 1024  |
| Publish/Subscribe Event Name | 64 | 64 |
| Publish/Subscribe Event Data | 864 | 1024 |


### Sleep modes

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

### B0 and B1 should not be used as wake sources

| Pin | Pin Name |
| :---: | :--- |
| 33 | B0 |
| 32 | B1 |

- Pins B0 and B1 should not be used as GPIO wake sources.
- In ULP sleep mode, when used as an input B0 and B1 should be held at the same logic level even if not used as a wake source.
- On other devices these pins are used as NFC and the circuitry which protects the MCU from surge voltage can cause leakage voltage between these pins when used as GPIO in both operating and sleep modes.

### Beware of leakage current

If you have circuitry that can disconnect the nRF52840 MCU 3V3 power, beware of situations where current can leak into GPIO pins from an external supply.

For example, if you have 3V3 disconnect circuitry but have pull-ups to non-disconnected power, when MCU 3V3 is powered down current can flow into the GPIO causing the MCU to not fully power down. This can prevent the MCU from resetting when power is reapplied. It will also cause excess power consumption when powered down.

### SPI

- On the E404X, there are only two SPI ports `SPI` (A pins) and `SPI1` (C pins)
- E Series `SPI1` on the D pins does not exist on the E404X. 
- E Series `SPI2` on the C pins is `SPI1` on the E404X


The following are all SPI-related pins on the E Series and E404X:

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Pin | E-Series Pin Name | E-Series SPI | E404X Pin Name | E404X SPI |
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

- There is one available I2C port on the E404X.

{{!-- BEGIN do not edit content below, it is automatically generated e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05 --}}

| Pin | E-Series Pin Name | E-Series I2C | E404X Pin Name | E404X I2C |
| :---: | :--- | :--- | :--- | :--- |
| 41 | D1 | Wire (SCL) | D1 | Wire (SCL) |
| 42 | D0 | Wire (SDA) | D0 | Wire (SDA) |
| 44 | C5 | Wire1 (SCL) | C5 | &nbsp; |
| 45 | C4 | Wire1 (SDA) | C4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated e6a3ce62-dfb5-4926-a1b4-5f2fd5048d05 --}}

- On the E Series (other than the E404X), `Wire` and `Wire1` are the same I2C peripheral and you can only use one at a time, so effectively it only has one I2C port. 
- On the E Series (other than the E404X), the built-in pull-up on SDA and SCL is approximately 40K and an external pull-up is required.
- On the E404X, the built-in pull-up on SDA and SCL is approximately 13K. An external pull-up is recommended. 
- On the E404X, GPIO is 3.3V and is not 5V tolerant. Connecting to a 5V I2C bus requires level shifting.
- On the E404X, external pull-ups should only be connected to the MCU 3V3 supply. Pulling up to an external supply can cause leakage current into the GPIO pins of the nRF52840 which can prevent it from resetting properly.

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

| Pin | E-Series Pin Name | E-Series Serial | E404X Pin Name | E404X Serial |
| :---: | :--- | :--- | :--- | :--- |
| 16 | TX | Serial1 (TX) | TX | Serial1 (TX) |
| 17 | RX | Serial1 (RX) | RX | Serial1 (RX) |
| 41 | D1 | &nbsp; | D1 | Serial1 (CTS) |
| 42 | D0 | &nbsp; | D0 | Serial1 (RTS) |
| 46 | C3 | Serial4 TX | C3 | &nbsp; |
| 47 | C2 | Serial4 RX | C2 | &nbsp; |
| 48 | C1 | Serial5_TX | C1 | &nbsp; |
| 49 | C0 | Serial5_RX | C0 | &nbsp; |
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

| Pin | E-Series Pin Name | E-Series ADC | E404X Pin Name | E404X ADC |
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

| Pin | E-Series Pin Name | E-Series PWM | E404X Pin Name | E404X PWM | E404X Hardware Timer |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 16 | TX | &check; | TX | &check; | PWM2 |
| 17 | RX | &check; | RX | &check; | PWM2 |
| 19 | WKP / A7 | &check; | A7 / WKP | &nbsp; | &nbsp; |
| 20 | DAC / A6 | &nbsp; | A6 | &check; | PWM3 |
| 21 | A5 | &check; | A5 | &check; | PWM3 |
| 22 | A4 | &check; | A4 | &check; | PWM3 |
| 23 | A3 | &nbsp; | A3 | &check; | PWM1 |
| 30 | B3 | &check; | B3 | &check; | PWM2 |
| 31 | B2 | &check; | B2 | &check; | PWM2 |
| 32 | B1 | &check; | B1 | &nbsp; | &nbsp; |
| 33 | B0 | &check; | B0 | &nbsp; | &nbsp; |
| 39 | D3 | &check; | NC | &nbsp; | &nbsp; |
| 40 | D2 | &check; | D2 | &check; | PWM1 |
| 41 | D1 | &check; | D1 | &check; | PWM1 |
| 42 | D0 | &check; | D0 | &check; | PWM1 |
| 44 | C5 | &check; | C5 | &check; | PWM0 |
| 45 | C4 | &check; | C4 | &check; | PWM3 |
| 49 | C0 | &nbsp; | C0 | &check; | PWM1 |


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

PWM on the same timer group (such as TIM3 or PWM3) must share the same frequency, but can have different duty cycles.

On the E404X, the following groups are defined. Each group must share the same frequency and resolution, but individual pins in the group can have a different duty cycle. Group 0 is shared with the RGB LED and must use the default resolution of 8 bits (0-255) and frequency of 500 Hz, but can have its own duty cycle.

{{!-- BEGIN do not edit content below, it is automatically generated 4d3ada5a-494c-469b-b6ee-6b4ec53bc3d3 --}}

- Group 0: C5, RGBB, RGBG, RGBR
- Group 1: A3, C0, D0, D1, D2
- Group 2: B2, B3, RX, TX
- Group 3: A4, A5, A6, C4


{{!-- END do not edit content above, it is automatically generated --}}

### Digital to analog converter (DAC)

The E Series supports DAC one A3 and A6 (DAC). There is no DAC on the E404X or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.


{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Pin | E-Series Pin Name | E-Series DAC | E404X Pin Name | E404X DAC |
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

This restriction does not exist on the E404X and Gen 3 devices; any pin except B0 and B1 can be used to wake from all sleep modes, rising or falling.


### CAN (controller area network)

The E series supported CAN on pins D1/D2 or C4/C5. There is no CAN on the E404X or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the E404X.


{{!-- BEGIN do not edit content below, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}

| Pin | E-Series Pin Name | E-Series CAN | E404X Pin Name | E404X CAN |
| :---: | :--- | :--- | :--- | :--- |
| 40 | D2 | CAN2_RX | D2 | &nbsp; |
| 41 | D1 | CAN2_TX | D1 | &nbsp; |
| 44 | C5 | CAN1_RX | C5 | &nbsp; |
| 45 | C4 | CAN1_TX | C4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

- The E Series theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.
- I2S is available on Gen 3 devices including the E404X on any GPIO pins using a 3rd-party library.


### Interrupts

There are many limitations for interrupts on the E Series (STM32F205). All pins can be used for interrupts on the E404X Gen 3 devices, however you can only attach interrupts to 8 pins at a time.

### SWD

Unlike the E Series module, the E404X SWD pins are dedicated and cannot be used for GPIO.

{{!-- BEGIN do not edit content below, it is automatically generated b90ca6ee-1877-4f05-a3bd-b073d768e54d --}}

| Pin | E-Series Pin Name | E-Series SWD | E404X Pin Name | E404X SWD |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D7 | SWDIO | SWDIO | SWDIO |
| 36 | D6 | SWCLK | SWDCLK | SWCLK |
| 38 | D4 | &nbsp; | SWO | SWO |


{{!-- END do not edit content above, it is automatically generated b90ca6ee-1877-4f05-a3bd-b073d768e54d --}}

### JTAG

The E404X does not support full JTAG. Some pins are shared with SWD; the E404X SWD pins are dedicated and cannot be used for GPIO.

Pin D5 (module pin 37), however, is available for GPIO as it is not NC and not used by SWD.

{{!-- BEGIN do not edit content below, it is automatically generated 2767a61d-eba6-4720-8c91-869be322880f --}}

| Pin | E-Series Pin Name | E-Series JTAG | E404X Pin Name | E404X JTAG |
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

{{imageOverlay src="/assets/images/e404x-pinout.svg" alt="E404X Pinout Diagram" class="full-width"}}

{{imageOverlay src="/assets/images/e-series-pinout.svg" alt="E Series Pinout Diagram" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### Module Pin 1 (VIN)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | VIN|
| Description | Power in 3.9V to 12 VDC.|
#### Module Pin 2 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 3 (VBUS)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | VBUS|
| Description | Connect to VBUS power pin on the USB port|
#### Module Pin 4 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 5 (LIPO)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | LIPO|
| Description | Connect to + pin on the LiPo battery, 4.2V maximum|
#### Module Pin 6 (NC)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Do not connect to anything|
#### Module Pin 7 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 8 (PMID)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | PMID | PMID |
| ∆ | Description | Connected to the PMID pin of the PMIC | Connected to the PMID pin of the PMIC. Leave unconnected. |
#### Module Pin 9 (3V3)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | 3V3|
| Description | Regulated 3.3V DC output, maximum load 800 mA. Cannot be used as a power input.|
#### Module Pin 10 (VDDA / NC)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | VDDA | NC |
| ∆ | Description | Power input for ADC. Normally connected to 3V3. Must always be within 300 mV of 3V3. | Do not connect to anything |
#### Module Pin 11 (VBAT / NC)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | VBAT | NC |
| ∆ | Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | Do not connect to anything |
#### Module Pin 12 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 13 (USBDATA+)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | USBDATA+ | USBDATA+ |
| ∆ | Description | USB Data+ | USB Data+. Cannot be used as GPIO. |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### Module Pin 14 (USBDATA-)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | USBDATA- | USBDATA- |
| ∆ | Description | USB Data- | USB Data-. Cannot be used as GPIO. |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### Module Pin 15 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 16 (TX)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO D8, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 17 (RX)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RX | RX |
| ∆ | Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO D9, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### Module Pin 18 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 19 (WKP / A7)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | WKP | A7 |
| ∆ | Pin Alternate Name | A7 | WKP |
| ∆ | Description | WKP/A7 Wakeup (active high), analog in, GPIO. | A7 analog in, WKP (wakeup), GPIO D17. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 20 (DAC / A6)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | DAC | A6 |
| ∆ | Pin Alternate Name | A6 | n/a |
| ∆ | Description | DAC/A6 True analog out, analog in, GPIO. | A6 analog in, PWM, GPIO D16. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (DAC) | Yes | No |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
#### Module Pin 21 (A5)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| ∆ | Description | A5 Analog in, GPIO, SPI MOSI. | A5 Analog in, GPIO D15, SPI MOSI, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 22 (A4)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A4 | A4 |
| ∆ | Description | A4 Analog in, GPIO, SPI MISO. | A4 Analog in, GPIO D14, SPI MISO, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 23 (A3)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A3 | A3 |
| ∆ | Description | A3 True analog out, analog in, GPIO. | A3 analog in, GPIO D13, SPI SCK, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (DAC) | Yes | No |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
#### Module Pin 24 (A2)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| ∆ | Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, GPIO D12, SPI SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. |
| ∆ | Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 25 (A1)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| ∆ | Description | A1 Analog in, GPIO | A1 Analog in, GPIO D11 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 26 (A0)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| ∆ | Description | A0 Analog in, GPIO | A0 Analog in, GPIO D10 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 27 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 28 (B5 / NC)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | B5 | NC |
| ∆ | Description | B5 Analog in, GPIO | Do not connect to anything |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | Supports analogRead | Yes | n/a |
| ∆ | Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler. | n/a |
| ∆ | Internal pull resistance | 40K | n/a |
| ∆ | Input is 5V Tolerant | Yes | n/a |
#### Module Pin 29 (B4 / NC)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | B4 | NC |
| ∆ | Description | B4 Analog in, GPIO | Do not connect to anything |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | Supports analogRead | Yes | n/a |
| ∆ | Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | n/a |
| ∆ | Internal pull resistance | 40K | n/a |
| ∆ | Input is 5V Tolerant | Yes | n/a |
#### Module Pin 30 (B3)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | B3 | B3 |
| ∆ | Description | B3, analog in, GPIO, PWM | B3, GPIO D21, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 31 (B2)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | B2 | B2 |
| ∆ | Description | B2, analog in, GPIO, PWM | B2, GPIO D20, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 32 (B1)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | B1 | B1 |
| ∆ | Description | B1, GPIO, PWM | B1, GPIO D19 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 33 (B0)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | B0 | B0 |
| ∆ | Description | B0, GPIO, PWM | B0, GPIO D18 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 34 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 35 (D7 / SWDIO)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D7 | SWDIO |
| ∆ | Description | D7 GPIO | SWDIO for JTAG/SWD debugger. Internal pull-up. Not GPIO. |
| ∆ | Supports digitalRead | Yes | No |
| ∆ | Supports digitalWrite | Yes | No |
| ∆ | Supports attachInterrupt | No. Shared with BAT_INT_PC13 | No |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | n/a |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a |
| ∆ | SWD interface | SWDIO. 40K pull-up at boot. | SWDIO |
| ∆ | Signal used at boot | JTAG TMS/SWDIO. 40K pull-up at boot. | JTAG SWDIO. 40K pull-up at boot. |
#### Module Pin 36 (D6 / SWDCLK)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D6 | SWDCLK |
| ∆ | Description | D6 GPIO | SWCLK for JTAG/SWD debugger. Internal pull-down. Not GPIO. |
| ∆ | Supports digitalRead | Yes | No |
| ∆ | Supports digitalWrite | Yes | No |
| ∆ | Supports attachInterrupt | Yes | No |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | n/a |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a |
| ∆ | SWD interface | SWCLK. 40K pull-down at boot. | SWCLK |
| ∆ | Signal used at boot | JTAG TCK/SWCLK. 40K pull-down at boot. | JTAG SWCLK. 40K pull-down at boot. |
#### Module Pin 37 (D5)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | D5 GPIO, SPI1 | D5 GPIO, SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| ∆ | Supports attachInterrupt | Yes | Yes. You can only have 8 active interrupt pins. |
| ∆ | I2S interface | I2S3_WS | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG TDI. 40K pull-up at boot. | n/a |
#### Module Pin 38 (D4 / SWO)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D4 | SWO |
| ∆ | Description | D4 GPIO, SPI1 | SWO for JTAG/SWD debugger. Not GPIO. |
| ∆ | Supports digitalRead | Yes | No |
| ∆ | Supports digitalWrite | Yes | No |
| ∆ | SPI interface | SCK. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | No |
| ∆ | I2S interface | I2S3_SD | n/a |
| ∆ | Internal pull resistance | 40K | n/a |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDO. Floating at boot. | n/a |
| ∆ | SWD interface | n/a | SWO |
| ∆ | Signal used at boot | JTAG TDO. Floating at boot. | JTAG SWO. |
#### Module Pin 39 (D3 / NC)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D3 | NC |
| ∆ | Description | D3 GPIO, SPI1 | Do not connect to anything |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | n/a |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | n/a |
| ∆ | SPI interface | MISO. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | n/a |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | n/a |
| ∆ | Input is 5V Tolerant | Yes | n/a |
| ∆ | JTAG interface | JTAG RST. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG RST. 40K pull-up at boot. | n/a |
#### Module Pin 40 (D2)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | D2 GPIO, SPI1, CAN | D2 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes |
| ∆ | SPI interface | MOSI. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN2_RX | n/a |
| ∆ | I2S interface | I2S3_SD | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 41 (D1)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | D0 GPIO, I2C, CAN | D0 GPIO, I2C Wire SCL, Serial1 RTS, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | UART serial | n/a | CTS flow control (optional). Use Serial1 object. |
| ∆ | I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN2_TX | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 42 (D0)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | D0 GPIO, I2C | D0 GPIO, I2C Wire SDA, Serial1 CTS, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | UART serial | n/a | RTS flow control (optional). Use Serial1 object. |
| ∆ | I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 43 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 44 (C5)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C5 | C5 |
| ∆ | Description | I2C, CAN, GPIO. | GPIO D29, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | Timer is shared with RGB LED; duty cycle can be set but not frequency. |
| ∆ | Supports tone | Yes | No |
| ∆ | I2C interface | SCL. Use Wire1 object. You can only use Wire or Wire1, not both! | n/a |
| ∆ | Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN1_RX | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 45 (C4)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C4 | C4 |
| ∆ | Description | I2C, CAN, GPIO. | GPIO D28, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | I2C interface | SDA. Use Wire1 object. You can only use Wire or Wire1, not both! | n/a |
| ∆ | Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN1_TX | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 46 (C3)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C3 | C3 |
| ∆ | Description | Serial4 TX (transmitted data), SPI2, GPIO. | SPI1 SCK, GPIO D27. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | TX. Use Serial4 object. | n/a |
| ∆ | SPI interface | SCK. Use SPI2 object. | SCK. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 47 (C2)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C2 | C2 |
| ∆ | Description | Serial4 RX (received data), SPI2, GPIO. | SPI1 MISO, GPIO D26. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | RX. Use Serial4 object. | n/a |
| ∆ | SPI interface | MISO. Use SPI2 object. | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 48 (C1)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C1 | C1 |
| ∆ | Description | Serial5 TX (trasmitted data), SPI2, GPIO. | SPI1 MOSI, GPIO D25. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | TX. Use Serial5 object. | n/a |
| ∆ | SPI interface | MOSI. Use SPI2 object. | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 49 (C0)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | C0 | C0 |
| ∆ | Description | Serial5 RX (received data), GPIO. | GPIO D24, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | RX. Use Serial5 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### Module Pin 50 (NC)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Do not connect to anything|
#### Module Pin 51 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 52 (RGBB)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RGBB | RGBB |
| &nbsp; | Description | RGB LED Blue | RGB LED Blue |
| ∆ | UART serial | RX. Use Serial2 object. | n/a |
#### Module Pin 53 (RGBG)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RGBG | RGBG |
| &nbsp; | Description | RGB LED Green | RGB LED Green |
| ∆ | UART serial | TX. Use Serial2 object. | n/a |
#### Module Pin 54 (RGBR)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | RGBR|
| Description | RGB LED Red|
#### Module Pin 55 (MODE)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MODE | MODE |
| &nbsp; | Description | MODE button, has internal pull-up. Pin number constant is BTN. | MODE button, has internal pull-up. Pin number constant is BTN. |
| ∆ | I2S interface | I2S3_MCK | n/a |
#### Module Pin 56 (RESET)
|   |   | E-Series | E404X |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RESET | RESET |
| ∆ | Pin Alternate Name | RST | n/a |
| &nbsp; | Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset. Pull low to reset; can leave unconnected in normal operation. |
#### Module Pin 57 (STAT)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | STAT|
| Description | Charge status output from the PMIC.|
#### Module Pin 58 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 59 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 60 (GND)
| | Unchanged between E-Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software


### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID

Since the E404X uses the same MCU as Gen 3 devices (Boron, B Series SoM, Tracker SoM), most libraries intended for those platforms will work with no changes or minimal changes.


## Version history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-01-25 | RK | Pre-release |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
|     | 2022-05-06 | RK | Wire1 is not exposed on C4/C5 |
|     | 2022-07-28 | RK | Update PWM assignments |
|     | 2022-09-12 | RK | Added notes about I2C pull-ups and leakage current |
