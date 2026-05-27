---
title: Sulu project notes
layout: commonTwo.hbs
columns: two
description: Sulu datasheet and migration guide tables
---

# Sulu project notes

- Based on pinmap v0.1 (2026-05-27)
- Preliminary draft, subject to change
- Do not share externally

This document includes a number of diagrams and tables that will be included in the datasheet once finalized.

## Pins and button definitions

### Pinout diagram

{{imageOverlay src="/assets/images/sulu/sulu-pinout.svg" alt="Pinout" class="full-width"}}

### GPIO and port listing

{{!-- BEGIN do not edit content below, it is automatically generated 96e7f64a-8089-4ee3-9e31-3906270428cb --}}

| Pin Name |   |   |   |   | PWM | MCU |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| A0 / D19 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A1 / D18 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A2 / D17 | ADC_2 | &nbsp; | SPI1 (SS) | &nbsp; | &check; | PB[7] |
| A3 / D16 | ADC_3 | &nbsp; | SPI1 (MOSI) | &nbsp; | &check; | PB[4] |
| A4 / D15 | ADC_4 | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | PB[5] |
| A5 / D14 | ADC_5 | &nbsp; | SPI1 (SCK) | &nbsp; | &nbsp; | PB[6] |
| D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &check; | PA[24] |
| D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &check; | PA[23] |
| D2 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RTS)  | &nbsp; | PA[14] |
| D3 | &nbsp; | &nbsp; | &nbsp; | Serial1 (CTS)  | &nbsp; | PA[15] |
| D4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[21] |
| D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[29] |
| D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[30] |
| D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[31] |
| D8 / WKP | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PB[19] |
| MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PB[18] |
| RX / D10 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RX)  | &check; | PA[13] |
| SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &check; | PB[20] |
| TX / D09 | &nbsp; | &nbsp; | &nbsp; | Serial1 (TX) | &check; | PA[12] |


{{!-- END do not edit content above, it is automatically generated  --}}

### ADC (analog to digital converter)

Sulu supports 6 ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated c76560c5-effb-4708-97a6-f21573263797 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | ADC_0 | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | ADC_1 | PB[2] |
| A2 / D17 | A2 Analog in, SPI1 SS, GPIO, PWM | ADC_2 | PB[7] |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | ADC_3 | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | ADC_4 | PB[5] |
| A5 / D14 | A5 Analog in, SPI1 SCK, GPIO | ADC_5 | PB[6] |


{{!-- END do not edit content above, it is automatically generated  --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits


### UART serial

Sulu supports one UART serial interface. 

{{!-- BEGIN do not edit content below, it is automatically generated 230fb891-7a16-4ccc-b5f0-4398c84303b8 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D2 | D2 GPIO, Serial RTS flow control (optional) | Serial1 (RTS)  | PA[14] |
| D3 | D3 GPIO, Serial1 CTS flow control (optional) | Serial1 (CTS)  | PA[15] |
| RX / D10 | Serial RX, PWM, GPIO | Serial1 (RX)  | PA[13] |
| TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | Serial1 (TX) | PA[12] |


{{!-- END do not edit content above, it is automatically generated  --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO

#### UART serial vs. Photon 2

The Photon 2 supports additional UART interfaces `Serial2` and `Serial3`. These are not supported on Sulu.

### SPI

Sulu supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated 8db4f1d9-7b1d-4806-b83d-fb515a59d15c --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A2 / D17 | A2 Analog in, SPI1 SS, GPIO, PWM | SPI1 (SS) | PB[7] |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | SPI1 (MOSI) | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | SPI1 (MISO) | PB[5] |
| A5 / D14 | A5 Analog in, SPI1 SCK, GPIO | SPI1 (SCK) | PB[6] |
| MISO / D11 | SPI MISO, D5 GPIO, PWM, I2S TX | SPI (MISO) | PB[19] |
| MOSI / D12 | SPI MOSI, D12 GPIO, PWM | SPI (MOSI) | PB[18] |
| SCK / D13 | D13 GPIO, SPI SLK, PWM, I2S CLK | SPI (SCK) | PB[20] |


{{!-- END do not edit content above, it is automatically generated --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- The primary SPI port has a maximum speed of 50 MHz and supports both SPI master and SPI slave modes
- The secondary SPI port (`SPI1`) has a maximum speed of 25 MHz and only supports SPI master mode

#### SPI vs. Boron

{{imageOverlay src="/assets/images/sulu/sulu-boron-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

Both Sulu and the Boron support two SPI interfaces, however `SPI1` (secondary SPI port) is on different pins.

{{!-- BEGIN do not edit content below, it is automatically generated 74e90cd9-f151-4393-86a2-fdd6ca70c4ca --}}

| Boron Pin Name | Boron SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A2 / D17 | &nbsp; | A2 / D17 | SPI1 (SS) |
| A3 / D16 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| A4 / D15 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| A5 / D14 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (SCK) | D2 | &nbsp; |
| D3 | SPI1 (MOSI) | D3 | &nbsp; |
| D4 | SPI1 (MISO) | D4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

#### SPI vs. Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

Both Sulu and the Photon 2 support two SPI interfaces, however there are important differences.

{{!-- BEGIN shared-blurb 01d93dfc-5739-4690-b8e2-4c1e5a35bd75 --}}
|                     | Photon 2 | Sulu |
| :------------------ | :--- | :--- |
| `SPI`               | 25 MHz | 50 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | | &check; |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |
|                     | | |
| `SPI1`              | 50 MHz | 25 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | &check; | |
| Hardware peripheral | RTL872x SPI0 | RTL872x SPI1 |
{{!-- END shared-blurb --}}

Additionally, `SPI1` is on different pins.


{{!-- BEGIN do not edit content below, it is automatically generated 6b9bbf34-54df-4cbb-bf2f-8dda881901e4 --}}

| Photon 2 Pin Name | Photon 2 SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A2 / D13 | &nbsp; | A2 / D17 | SPI1 (SS) |
| A5 / D14 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| S4 / D19 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| S3 / D18 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D17 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D15 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D16 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (MOSI) | D2 | &nbsp; |
| D3 | SPI1 (MISO) | D3 | &nbsp; |
| D4 | SPI1 (SCK) | D4 | &nbsp; |
| D5 | SPI1 (SS) | D5 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### I2C

Sulu supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated 529ff47f-b3ba-467b-8eb6-c95f5b0c3821 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D0 | I2C SDA, GPIO, PWM | Wire (SDA) | PA[24] |
| D1 | I2C SCL, GPIO, PWM | Wire (SCL) | PA[23] |


{{!-- END do not edit content above, it is automatically generated --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are recommended for I2C as the internal pull-up is 13K.
- If not using I2C, pins D0 and D1 can be used as GPIO or analog input.

### PWM

Sulu supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 420ef473-badc-4833-b341-1771f7a8699e --}}

| Pin Name | Description | Timer | MCU |
| :--- | :--- | :--- | :--- |
| A2 / D17 | A2 Analog in, SPI1 SS, GPIO, PWM | &nbsp; | PB[7] |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | &nbsp; | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | &nbsp; | PB[5] |
| D0 | I2C SDA, GPIO, PWM | &nbsp; | PA[24] |
| D1 | I2C SCL, GPIO, PWM | &nbsp; | PA[23] |
| D4 | D4 GPIO, PWM, I2S WS | &nbsp; | PB[21] |
| MISO / D11 | SPI MISO, D5 GPIO, PWM, I2S TX | &nbsp; | PB[19] |
| MOSI / D12 | SPI MOSI, D12 GPIO, PWM | &nbsp; | PB[18] |
| RX / D10 | Serial RX, PWM, GPIO | &nbsp; | PA[13] |
| SCK / D13 | D13 GPIO, SPI SLK, PWM, I2S CLK | &nbsp; | PB[20] |
| TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}

- PWM that share the same timer (`PMW2` for example) must share the same frequency but can have different duty cycles.
- Pin `D7` (PWM0) share a timer with the RGB LED and you should not change its frequency but it can have a different duty cycle.
- PWM pins vary greatly between devices, see migration guides for more information.

### CAN (controller area network)

Sulu does not support CAN.

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.

### PDM 

Pulse density modulation digital microphones can be used with the [Microphone_PDM](https://github.com/particle-iot/Microphone_PDM) library 
and Sulu, but only on specific pins. The Argon and Boron can use any pins for PDM (with the same library).

{{!-- BEGIN do not edit content below, it is automatically generated e9d285b3-09e4-47f2-b040-a45f719a9bde --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | CLK | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | DAT | PB[2] |


{{!-- END do not edit content above, it is automatically generated--}}


```



39c69dbe-1354-4b67-8f20-ae279d6f45d5

5baa3b30-adfa-4fbb-a77c-0cacd12bb039

cbc8d7de-f76a-47e5-abe0-4cd2c086d36a

9b7f8b8e-d2fe-4003-b33d-f56bf4005356

d9705340-416c-419f-b045-780a558d87c3

e7ba7ebd-fb1f-496f-828b-490807aaa991

ef9bf033-5ae7-4896-82cb-92e8fa23077f

3d2171fa-5d98-4ddf-a5b8-a9c8f281177b

97dbda7d-3614-4f56-a750-a6599b1b3ec4
```


### I2S (Sound)

The Sulu hardware supports I2S (sound), but there is no support for it in Device OS. It should be possible to implement in a third-party library from user firmware, but there is no publicly available library available at this time.

{{!-- BEGIN do not edit content below, it is automatically generated 6489e45c-ce6e-41be-840b-c94c85124702 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D4 | D4 GPIO, PWM, I2S WS | I2S WS | PB[21] |
| MISO / D11 | SPI MISO, D5 GPIO, PWM, I2S TX | I2S TX | PB[19] |
| SCK / D13 | D13 GPIO, SPI SLK, PWM, I2S CLK | I2S CLK | PB[20] |
| TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | I2S MCLK | PA[12] |


{{!-- END do not edit content above, it is automatically generated--}}

### BLE (Bluetooth LE)

BLE Central and BLE Peripheral modes are supported on Sulu.

BLE long range (coded PHY) is not supported on Sulu.

### SWD

Sulu has a dedicated 10 pin debug connector that exposes the SWD interface of the RTL872x. This interface can be used to debug your code or reprogram your Boron bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

Unlike the Photon 2, SWD pins are not shared with GPIO.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" ></div>

#### SWD vs. Photon 2

{{!-- BEGIN do not edit content below, it is automatically generated 39c69dbe-1354-4b67-8f20-ae279d6f45d5 --}}

| Photon 2 Pin Name | Photon 2 SWD | Sulu Pin Name | Sulu SWD |
| :--- | :--- | :--- | :--- |
| D6 | SWCLK | D6 | &nbsp; |
| D7 | SWDIO | D7 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated db6531b6-9387-4e7c-b2f9-779c8423b2cf --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 23 | D7 | Low at boot triggers MCU boot mode. | PB[31] |


{{!-- END do not edit content above, it is automatically generated --}}

#### Boot mode pins vs. Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-boot-comparison.svg" alt="ADC comparison" class="full-width"}}

While the D7 pin is common between Sulu and Photon 2 as a boot pin, there are fewer restrictions on Sulu.

{{!-- BEGIN do not edit content below, it is automatically generated 5baa3b30-adfa-4fbb-a77c-0cacd12bb039 --}}

| Photon 2 Pin Name | Photon 2 Boot | Sulu Pin Name | Sulu Boot |
| :--- | :--- | :--- | :--- |
| TX / D8 | Low at boot triggers ISP flash download | TX / D09 | &nbsp; |
| D6 | SWCLK. 40K pull-down at boot. | D6 | &nbsp; |
| D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | D7 | Low at boot triggers MCU boot mode. |


{{!-- END do not edit content above, it is automatically generated --}}

### Interrupts

All pins can be used for interrupts on Gen 3 devices and the Photon 2.

There is a limit of 8 pin interrupts on the Boron; this limitation does not exist on Sulu.

### Sleep

The Photon 2 can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

Sulu can only wake from `HIBERNATE` sleep mode certain pins, `RISING`, `FALLING`, or `CHANGE`. 

Pin D10 `WKP` is the same module pin location as the Argon pin D8, which is also the WKP pin. 

{{!-- BEGIN do not edit content below, it is automatically generated f1da1b65-7e6c-4611-ba44-b9273c40c9da --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 14 | RX / D10 | Serial RX, PWM, GPIO | Pin can wake from HIBERNATE sleep | PA[13] |
| 15 | TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
| 18 | D2 | D2 GPIO, Serial RTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[14] |
| 19 | D3 | D3 GPIO, Serial1 CTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[15] |
| 24 | D8 / WKP | GPIO, WKP | Pin can wake from HIBERNATE sleep | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Internal pull-up or pull-down

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`. The pull-up or pull-down resistance varies by pin.


### Retained memory

Sulu has limited support for retained memory, also referred to as Backup RAM or SRAM, in Device OS 5.3.1 and later.

{{!-- BEGIN shared-blurb f960cc9c-6e25-4205-adf9-03bfd50b9da7 --}}
Retained memory is preserved on RTL872x devices in the following cases:

| Case | Saved |
| :--- | :--- |
| When entering sleep modes | 5.3.1 and later |
| OTA firmware updates | 5.3.1 and later |
| `System.backupRamSync()` | 5.3.1 and later |
| `System.reset()` | Not saved |
| Reset button or reset pin | Not saved  |
| Every 10 seconds | 5.3.1 to 5.8.0 only |

Calling [`System.backupRamSync()`](/reference/device-os/api/system-calls/backupramsync/) will manually save the contents of retained memory to a dedicated flash page on the RTL872x processor and will be restored after the device is reset. You should avoid saving the data extremely frequently as it is slower than RAM and will cause flash wear and is relatively slow to execute.

Prior to Device OS 5.3.1, retained memory is not supported on RTL872x devices. The flash file system can be used, or you can use an external chip such as an I2C or SPI FRAM.

Retained memory is 3068 bytes. 
{{!-- END shared-blurb --}}

### NFC tag

Sulu does not have NFC Tag support. 


---


### Complete module pin details

{{collapse op="start" label="Show pin details"}}

{{!-- BEGIN do not edit content below, it is automatically generated xxx-c95d8236-be6f-492a-a5d6-40adf1a6acc7 --}}
{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}




## Sulu from Boron

{{migration-guide leftImg="/assets/images/boron/boron-top.png" leftStyle="transform: matrix(0.92, 0, 0, 0.92, 0, 7);" rightImg="/assets/images/electron-2/electron-2-rendering.png"}}


### SPI - Sulu from Boron
{{imageOverlay src="/assets/images/sulu/sulu-boron-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 74e90cd9-f151-4393-86a2-fdd6ca70c4ca --}}

| Boron Pin Name | Boron SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A2 / D17 | &nbsp; | A2 / D17 | SPI1 (SS) |
| A3 / D16 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| A4 / D15 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| A5 / D14 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (SCK) | D2 | &nbsp; |
| D3 | SPI1 (MOSI) | D3 | &nbsp; |
| D4 | SPI1 (MISO) | D4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

#### SPI - Gen 3 devices (including Boron)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 32 MHz | 32 MHz |
| Default rate | 16 MHz | 16 MHz |
| Clock | 64 MHz | 64 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256
- Default divisor is 4

#### SPI - Sulu

| | SPI1 | SPI0 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |


### Serial (UART) - Sulu from Boron

{{imageOverlay src="/assets/images/sulu/sulu-boron-serial-comparison.svg" alt="Serial comparison" class="full-width"}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both Sulu and Boron. It optionally supports hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated 8671f442-6d5f-468b-a0c2-a11870f7228d --}}

| Boron Pin Name | Boron Serial | Sulu Pin Name | Sulu Serial |
| :--- | :--- | :--- | :--- |
| RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| TX / D09 | Serial1 TX | TX / D09 | Serial1 (TX) |
| D2 | Serial1 RTS | D2 | Serial1 (RTS)  |
| D3 | Serial1 CTS | D3 | Serial1 (CTS)  |


{{!-- END do not edit content above, it is automatically generated --}}

|      | Boron    | Sulu |
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

Supported Baud Rates:

| Baud Rate | Argon | P2 |
| ---: | :---: | :---|
| 110     | | &check; |
| 300     | | &check; |
| 600     | | &check; |
| 1200    | &check; | &check; |
| 2400    | &check; | &check;|
| 4800    | &check; | &check;|
| 9600    | | &check; |
| 14400   | | &check; |
| 19200   | &check; | &check; |
| 28800   | &check; | &check; |
| 38400   | &check; | &check; |
| 57600   | &check; | &check; |
| 76800   | &check; | &check; |
| 115200  | &check; | &check; |
| 128000  | | &check; |
| 153600  | | &check; |
| 230400  | &check; | &check; |
| 250000  | &check; | |
| 380400 | | &check; |
| 460800  | &check; | &check; |
| 500000  | | &check; |
| 921600  | &check; | &check; |
| 1000000 | &check; | &check; |
| 1382400 | | &check; |
| 1444400 | | &check; |
| 1500000 | | &check; |
| 1843200 | | &check; |
| 2000000 | | &check; |
| 2100000 | | &check; |
| 2764800 | | &check; |
| 3000000 | | &check; |
| 3250000 | | &check; |
| 3692300 | | &check; |
| 3750000 | | &check; |
| 4000000 | | &check; |
| 6000000 | | &check; |


### Analog input (ADC) - Sulu from Boron

{{imageOverlay src="/assets/images/sulu/sulu-boron-adc-comparison.svg" alt="ADC comparison" class="full-width"}}

For analog to digital conversion (ADC) using `analogRead()`.

- Pin A0, A1, A2, A3, A4, and A5 are analog inputs on both the Boron and Sulu.
- The `setADCSampleTime()` function is not supported on Sulu.

{{!-- BEGIN do not edit content below, it is automatically generated 60b8d1d9-a3b4-431a-a028-c0f7c0bdda3a --}}

| Boron Pin Name | Boron ADC | Sulu Pin Name | Sulu ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}


### PWM (Pulse-width modulation) - Sulu from Boron

{{imageOverlay src="/assets/images/sulu/sulu-boron-pwm-comparison.svg" alt="ADC comparison" class="full-width"}}

The pins that support PWM are different on the Argon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 6026dd9c-e783-4ada-a1ed-850c5cddcd0b --}}

| Boron Pin Name | Boron PWM | Sulu Pin Name | Sulu PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &nbsp; |
| A1 / D18 | &check; | A1 / D18 | &nbsp; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &nbsp; |
| SCK / D13 | &nbsp; | SCK / D13 | &check; |
| MOSI / D12 | &nbsp; | MOSI / D12 | &check; |
| MISO / D11 | &nbsp; | MISO / D11 | &check; |
| RX / D10 | &nbsp; | RX / D10 | &check; |
| TX / D09 | &nbsp; | TX / D09 | &check; |
| D0 | &nbsp; | D0 | &check; |
| D1 | &nbsp; | D1 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 | &nbsp; |
| D6 | &check; | D6 | &nbsp; |
| D7 | &check; | D7 | &nbsp; |
| D8 / WKP | &check; | D8 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on Sulu share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### PDM - Sulu from Boron

Pulse density modulation digital microphones can be used with the [Microphone_PDM](https://github.com/particle-iot/Microphone_PDM) library 
and Sulu, but only on specific pins. The Boron can use any pins for PDM (with the same library).

{{!-- BEGIN do not edit content below, it is automatically generated e9d285b3-09e4-47f2-b040-a45f719a9bde --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | CLK | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | DAT | PB[2] |


{{!-- END do not edit content above, it is automatically generated--}}


```
cbc8d7de-f76a-47e5-abe0-4cd2c086d36a

9b7f8b8e-d2fe-4003-b33d-f56bf4005356

d9705340-416c-419f-b045-780a558d87c3

e7ba7ebd-fb1f-496f-828b-490807aaa991

ef9bf033-5ae7-4896-82cb-92e8fa23077f

3d2171fa-5d98-4ddf-a5b8-a9c8f281177b

97dbda7d-3614-4f56-a750-a6599b1b3ec4
```


### I2S (Sound) - Sulu from Boron


{{!-- BEGIN do not edit content below, it is automatically generated 6489e45c-ce6e-41be-840b-c94c85124702 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D4 | D4 GPIO, PWM, I2S WS | I2S WS | PB[21] |
| MISO / D11 | SPI MISO, D5 GPIO, PWM, I2S TX | I2S TX | PB[19] |
| SCK / D13 | D13 GPIO, SPI SLK, PWM, I2S CLK | I2S CLK | PB[20] |
| TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | I2S MCLK | PA[12] |


{{!-- END do not edit content above, it is automatically generated--}}

The Argon supports I2S (sound) input and output with a third-party library.

There is no software support for I2S on Sulu, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.

### BLE (Bluetooth LE) - Sulu from Boron

BLE Central and BLE Peripheral modes are supported on Sulu and the Boron.

BLE long range (coded PHY) is not supported on Sulu but is supported on the Boron.


### Boot mode pins - Sulu from Boron

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated db6531b6-9387-4e7c-b2f9-779c8423b2cf --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 23 | D7 | Low at boot triggers MCU boot mode. | PB[31] |


{{!-- END do not edit content above, it is automatically generated --}}


### Interrupts - Sulu from Boron

All pins can be used for interrupts on Gen 3 devices and Sulu.

There is a limit of 8 pin interrupts on the Boron; this limitation does not exist on Sulu.

### Sleep - Sulu from Boron

Sulu can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

Sulu can only wake from `HIBERNATE` sleep mode certain pins, `RISING`, `FALLING`, or `CHANGE`. 

Pin D8 `WKP` is the same module pin location as the Boron pin D8, which is also the WKP pin. 

{{!-- BEGIN do not edit content below, it is automatically generated f1da1b65-7e6c-4611-ba44-b9273c40c9da --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 14 | RX / D10 | Serial RX, PWM, GPIO | Pin can wake from HIBERNATE sleep | PA[13] |
| 15 | TX / D09 | Serial TX, PWM, GPIO, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
| 18 | D2 | D2 GPIO, Serial RTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[14] |
| 19 | D3 | D3 GPIO, Serial1 CTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[15] |
| 24 | D8 / WKP | GPIO, WKP | Pin can wake from HIBERNATE sleep | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Internal pull-up or pull-down - Sulu from Boron

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

- On Sulu, the internal pull varies based on the pin.
- On the Boron (Gen 3), the internal pull is approximately 13K.


### Retained memory - Sulu from Boron

Sulu has limited support for retained memory, also referred to as Backup RAM or SRAM, in Device OS 5.3.1 and later.

{{!-- BEGIN shared-blurb f960cc9c-6e25-4205-adf9-03bfd50b9da7 --}}
Retained memory is preserved on RTL872x devices in the following cases:

| Case | Saved |
| :--- | :--- |
| When entering sleep modes | 5.3.1 and later |
| OTA firmware updates | 5.3.1 and later |
| `System.backupRamSync()` | 5.3.1 and later |
| `System.reset()` | Not saved |
| Reset button or reset pin | Not saved  |
| Every 10 seconds | 5.3.1 to 5.8.0 only |

Calling [`System.backupRamSync()`](/reference/device-os/api/system-calls/backupramsync/) will manually save the contents of retained memory to a dedicated flash page on the RTL872x processor and will be restored after the device is reset. You should avoid saving the data extremely frequently as it is slower than RAM and will cause flash wear and is relatively slow to execute.

Prior to Device OS 5.3.1, retained memory is not supported on RTL872x devices. The flash file system can be used, or you can use an external chip such as an I2C or SPI FRAM.

Retained memory is 3068 bytes. 
{{!-- END shared-blurb --}}

### NFC tag - Sulu from Boron

Sulu does not have NFC Tag support. Gen 3 devices including the Boron do have support for NFC Tag.


### Full module pin comparison - Sulu from Boron

{{!-- BEGIN do not edit content below, it is automatically generated xxx-ec636e6d-5401-4cf4-8ff9-27354ec41508 --}}
{{!-- END do not edit content above, it is automatically generated --}}


## Sulu from Photon 2


{{migration-guide leftImg="/assets/images/photon2-rendering.png" leftStyle="transform: matrix(0.92, 0, 0, 0.92, 0, 7);" rightImg="/assets/images/electron-2/electron-2-rendering.png"}}



### SPI - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

Both Sulu and the Photon 2 support two SPI interfaces, however there are important differences.

{{!-- BEGIN shared-blurb 01d93dfc-5739-4690-b8e2-4c1e5a35bd75 --}}
|                     | Photon 2 | Sulu |
| :------------------ | :--- | :--- |
| `SPI`               | 25 MHz | 50 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | | &check; |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |
|                     | | |
| `SPI1`              | 50 MHz | 25 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | &check; | |
| Hardware peripheral | RTL872x SPI0 | RTL872x SPI1 |
{{!-- END shared-blurb --}}

Additionally, `SPI1` is on different pins.


{{!-- BEGIN do not edit content below, it is automatically generated 6b9bbf34-54df-4cbb-bf2f-8dda881901e4 --}}

| Photon 2 Pin Name | Photon 2 SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A2 / D13 | &nbsp; | A2 / D17 | SPI1 (SS) |
| A5 / D14 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| S4 / D19 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| S3 / D18 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D17 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D15 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D16 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (MOSI) | D2 | &nbsp; |
| D3 | SPI1 (MISO) | D3 | &nbsp; |
| D4 | SPI1 (SCK) | D4 | &nbsp; |
| D5 | SPI1 (SS) | D5 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Serial (UART) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-serial-comparison.svg" alt="Serial comparison" class="full-width"}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both Sulu and Boron. It optionally supports hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated 5fdfbe77-2ae3-406f-b4e0-e6aafb8ae948 --}}

| Photon 2 Pin Name | Photon 2 Serial | Sulu Pin Name | Sulu Serial |
| :--- | :--- | :--- | :--- |
| SCK / D17 | Serial3 (RTS) | SCK / D13 | &nbsp; |
| MOSI / D15 | Serial3 (TX) | MOSI / D12 | &nbsp; |
| MISO / D16 | Serial3 (RX) | MISO / D11 | &nbsp; |
| RX / D9 | Serial1 (RX)  | RX / D10 | Serial1 (RX)  |
| TX / D8 | Serial1 (TX) | TX / D09 | Serial1 (TX) |
| D2 | Serial2 (RTS) | D2 | Serial1 (RTS)  |
| D3 | Serial2 (CTS) | D3 | Serial1 (CTS)  |
| D4 | Serial2 (TX) | D4 | &nbsp; |
| D5 | Serial2 (RX) | D5 | &nbsp; |
| D10 / WKP | Serial3 (CTS) | D8 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Analog input (ADC) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-adc-comparison.svg" alt="Serial comparison" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 28c6f04f-66e8-4b64-87d0-4f6cf18e9228 --}}

| Photon 2 Pin Name | Photon 2 ADC | Sulu Pin Name | Sulu ADC |
| :--- | :--- | :--- | :--- |
| A0 / D11 | &check; | A0 / D19 | &check; |
| A1 / D12 | &check; | A1 / D18 | &check; |
| A2 / D13 | &check; | A2 / D17 | &check; |
| A5 / D14 | &check; | A3 / D16 | &check; |
| S4 / D19 | &nbsp; | A4 / D15 | &check; |
| S3 / D18 | &nbsp; | A5 / D14 | &check; |
| D0 / A3 | &check; | D0 | &nbsp; |
| D1 / A4 | &check; | D1 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### PWM (Pulse-width modulation) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-pwm-comparison.svg" alt="ADC comparison" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 817332fa-3736-4879-a091-256b97e9d5c1 --}}

| Photon 2 Pin Name | Photon 2 PWM | Sulu Pin Name | Sulu PWM |
| :--- | :--- | :--- | :--- |
| A2 / D13 | &check; | A2 / D17 | &check; |
| A5 / D14 | &check; | A3 / D16 | &check; |
| S4 / D19 | &nbsp; | A4 / D15 | &check; |
| SCK / D17 | &nbsp; | SCK / D13 | &check; |
| MOSI / D15 | &check; | MOSI / D12 | &check; |
| MISO / D16 | &check; | MISO / D11 | &check; |
| RX / D9 | &nbsp; | RX / D10 | &check; |
| TX / D8 | &nbsp; | TX / D09 | &check; |
| D0 / A3 | &nbsp; | D0 | &check; |
| D1 / A4 | &check; | D1 | &check; |
| D4 | &nbsp; | D4 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}

### Boot mode pins - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-boot-comparison.svg" alt="ADC comparison" class="full-width"}}

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated 5baa3b30-adfa-4fbb-a77c-0cacd12bb039 --}}

| Photon 2 Pin Name | Photon 2 Boot | Sulu Pin Name | Sulu Boot |
| :--- | :--- | :--- | :--- |
| TX / D8 | Low at boot triggers ISP flash download | TX / D09 | &nbsp; |
| D6 | SWCLK. 40K pull-down at boot. | D6 | &nbsp; |
| D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | D7 | Low at boot triggers MCU boot mode. |


{{!-- END do not edit content above, it is automatically generated --}}


### SWD - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-swd-comparison.svg" alt="ADC comparison" class="full-width"}}

Sulu has dedicated pins for SWD debugging, available on the 10-pin debug connector on the top of the device. The Photon 2 also has this connector, but the pins are shared with GPIO pins.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" ></div>


{{!-- BEGIN do not edit content below, it is automatically generated 39c69dbe-1354-4b67-8f20-ae279d6f45d5 --}}

| Photon 2 Pin Name | Photon 2 SWD | Sulu Pin Name | Sulu SWD |
| :--- | :--- | :--- | :--- |
| D6 | SWCLK | D6 | &nbsp; |
| D7 | SWDIO | D7 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Full module pin comparison - Sulu from Photon 2

{{!-- BEGIN do not edit content below, it is automatically generated xxx-9fb77145-edd4-4f0a-815a-fb1994390006 --}}
{{!-- END do not edit content above, it is automatically generated --}}
