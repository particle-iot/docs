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
| A2 / D17 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] |
| A3 / D16 | ADC_3 | &nbsp; | SPI1 (MOSI) | &nbsp; | &check; | PB[4] |
| A4 / D15 | ADC_4 | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | PB[5] |
| A5 / D14 | ADC_5 | &nbsp; | SPI1 (SCK) | &nbsp; | &nbsp; | PB[6] |
| D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &check; | PA[24] |
| D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &check; | PA[23] |
| D2 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RTS)  | &nbsp; | PA[14] |
| D3 | &nbsp; | &nbsp; | &nbsp; | Serial1 (CTS)  | &nbsp; | PA[15] |
| D4 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | &check; | PB[21] |
| D5 | &nbsp; | &nbsp; | SPI1 (SS) | &nbsp; | &nbsp; | PB[29] |
| D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[30] |
| D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[31] |
| D8 / WKP | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PB[19] |
| MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PB[18] |
| RX / D10 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RX)  | &check; | PA[13] |
| SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &check; | PB[20] |
| TX / D9 | &nbsp; | &nbsp; | &nbsp; | Serial1 (TX) | &check; | PA[12] |


{{!-- END do not edit content above, it is automatically generated  --}}

### ADC (analog to digital converter)

{{imageOverlay src="/assets/images/sulu/sulu-pinout-adc.svg" alt="Pinout ADC" class="full-width"}}

Sulu supports 6 ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated c76560c5-effb-4708-97a6-f21573263797 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | ADC_0 | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | ADC_1 | PB[2] |
| A2 / D17 | A2 Analog in, GPIO, PWM | ADC_2 | PB[7] |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | ADC_3 | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | ADC_4 | PB[5] |
| A5 / D14 | A5 Analog in, SPI1 SCK, GPIO | ADC_5 | PB[6] |


{{!-- END do not edit content above, it is automatically generated  --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits


### UART serial

{{imageOverlay src="/assets/images/sulu/sulu-pinout-serial.svg" alt="Pinout serial" class="full-width"}}

Sulu supports one UART serial interface. 

{{!-- BEGIN do not edit content below, it is automatically generated 230fb891-7a16-4ccc-b5f0-4398c84303b8 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D2 | D2 GPIO, Serial RTS flow control (optional) | Serial1 (RTS)  | PA[14] |
| D3 | D3 GPIO, Serial1 CTS flow control (optional) | Serial1 (CTS)  | PA[15] |
| RX / D10 | Serial RX, PWM, GPIO | Serial1 (RX)  | PA[13] |
| TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | Serial1 (TX) | PA[12] |


{{!-- END do not edit content above, it is automatically generated  --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO

#### UART serial vs. Photon 2

{{!-- imageOverlay src="/assets/images/sulu/sulu-photon2-serial-comparison.svg" alt="Serial comparison" class="full-width" --}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both Sulu and Photon 2. On Sulu only, `Serial1` optionally supports hardware flow control. On the Photon 2 only, there are additional UART serial ports `Serial2` and `Serial3`.

{{!-- BEGIN do not edit content below, it is automatically generated 5fdfbe77-2ae3-406f-b4e0-e6aafb8ae948 --}}

| Photon 2 Pin Name | Photon 2 Serial | Sulu Pin Name | Sulu Serial |
| :--- | :--- | :--- | :--- |
| SCK / D17 | Serial3 (RTS) | SCK / D13 | &nbsp; |
| MOSI / D15 | Serial3 (TX) | MOSI / D12 | &nbsp; |
| MISO / D16 | Serial3 (RX) | MISO / D11 | &nbsp; |
| RX / D9 | Serial1 (RX)  | RX / D10 | Serial1 (RX)  |
| TX / D8 | Serial1 (TX) | TX / D9 | Serial1 (TX) |
| D2 | Serial2 (RTS) | D2 | Serial1 (RTS)  |
| D3 | Serial2 (CTS) | D3 | Serial1 (CTS)  |
| D4 | Serial2 (TX) | D4 | &nbsp; |
| D5 | Serial2 (RX) | D5 | &nbsp; |
| D10 / WKP | Serial3 (CTS) | D8 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### SPI

Sulu supports two SPI (serial peripheral interconnect) ports.

{{imageOverlay src="/assets/images/sulu/sulu-pinout-spi.svg" alt="Pinout ADC" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 8db4f1d9-7b1d-4806-b83d-fb515a59d15c --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | SPI1 (MOSI) | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | SPI1 (MISO) | PB[5] |
| A5 / D14 | A5 Analog in, SPI1 SCK, GPIO | SPI1 (SCK) | PB[6] |
| D4 | D4 GPIO, SPI SS, PWM, I2S WS | SPI (SS) | PB[21] |
| D5 | D5 GPIO, SPI1 SS | SPI1 (SS) | PB[29] |
| MISO / D11 | SPI MISO, D11 GPIO, PWM, I2S TX | SPI (MISO) | PB[19] |
| MOSI / D12 | SPI MOSI, D12 GPIO, PWM | SPI (MOSI) | PB[18] |
| SCK / D13 | D13 GPIO, SPI SCK, PWM, I2S CLK | SPI (SCK) | PB[20] |


{{!-- END do not edit content above, it is automatically generated --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- The primary SPI port has a maximum speed of 50 MHz and supports both SPI master and SPI slave modes
- The secondary SPI port (`SPI1`) has a maximum speed of 25 MHz and only supports SPI master mode

#### SPI vs. Boron

{{!-- imageOverlay src="/assets/images/sulu/sulu-boron-spi-comparison.svg" alt="SPI comparison" class="full-width" --}}

Both Sulu and the Boron support two SPI interfaces, however `SPI1` (secondary SPI port) is on different pins.

{{!-- BEGIN do not edit content below, it is automatically generated 74e90cd9-f151-4393-86a2-fdd6ca70c4ca --}}

| Boron Pin Name | Boron SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A3 / D16 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| A4 / D15 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| A5 / D14 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (SCK) | D2 | &nbsp; |
| D3 | SPI1 (MOSI) | D3 | &nbsp; |
| D4 | SPI1 (MISO) | D4 | SPI (SS) |
| D5 | &nbsp; | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}

#### SPI vs. Photon 2

{{!-- imageOverlay src="/assets/images/sulu/sulu-photon2-spi-comparison.svg" alt="SPI comparison" class="full-width" --}}

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
| Pins                | D2 - D5 | A2 - A5 |
| Hardware peripheral | RTL872x SPI0 | RTL872x SPI1 |
{{!-- END shared-blurb --}}

Additionally, `SPI1` is on different pins.


{{!-- BEGIN do not edit content below, it is automatically generated 6b9bbf34-54df-4cbb-bf2f-8dda881901e4 --}}

| Photon 2 Pin Name | Photon 2 SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| S4 / D19 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| S3 / D18 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D17 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D15 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D16 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (MOSI) | D2 | &nbsp; |
| D3 | SPI1 (MISO) | D3 | &nbsp; |
| D4 | SPI1 (SCK) | D4 | SPI (SS) |
| D5 | SPI1 (SS) | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}

### I2C

{{imageOverlay src="/assets/images/sulu/sulu-pinout-i2c.svg" alt="Pinout I2C" class="full-width"}}

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
- The PMIC and Fuel Gauge are on a separate, dedicated I2C interface and do not affect `Wire`.

### PWM

{{imageOverlay src="/assets/images/sulu/sulu-pinout-pwm.svg" alt="Pinout PWM" class="full-width"}}

Sulu supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 420ef473-badc-4833-b341-1771f7a8699e --}}

| Pin Name | Description | Timer | MCU |
| :--- | :--- | :--- | :--- |
| A2 / D17 | A2 Analog in, GPIO, PWM | &nbsp; | PB[7] |
| A3 / D16 | A3 Analog in, SPI1 MOSI, GPIO, PWM | &nbsp; | PB[4] |
| A4 / D15 | A4 Analog in, SPI1 MISO, GPIO, PWM | &nbsp; | PB[5] |
| D0 | I2C SDA, GPIO, PWM | &nbsp; | PA[24] |
| D1 | I2C SCL, GPIO, PWM | &nbsp; | PA[23] |
| D4 | D4 GPIO, SPI SS, PWM, I2S WS | &nbsp; | PB[21] |
| MISO / D11 | SPI MISO, D11 GPIO, PWM, I2S TX | &nbsp; | PB[19] |
| MOSI / D12 | SPI MOSI, D12 GPIO, PWM | &nbsp; | PB[18] |
| RX / D10 | Serial RX, PWM, GPIO | &nbsp; | PA[13] |
| SCK / D13 | D13 GPIO, SPI SCK, PWM, I2S CLK | &nbsp; | PB[20] |
| TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | &nbsp; | PA[12] |


{{!-- END do not edit content above, it is automatically generated --}}

- PWM that share the same timer (`PMW2` for example) must share the same frequency but can have different duty cycles.
- Pin `D7` (PWM0) share a timer with the RGB LED and you should not change its frequency but it can have a different duty cycle.

#### PWM vs. Boron

{{!-- imageOverlay src="/assets/images/sulu/sulu-boron-pwm-comparison.svg" alt="PWM comparison" class="full-width" --}}

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
| TX / D09 | &nbsp; | TX / D9 | &check; |
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

#### PWM vs. Photon 2

{{!-- imageOverlay src="/assets/images/sulu/sulu-photon2-pwm-comparison.svg" alt="PWM comparison" class="full-width" --}}


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
| TX / D8 | &nbsp; | TX / D9 | &check; |
| D0 / A3 | &nbsp; | D0 | &check; |
| D1 / A4 | &check; | D1 | &check; |
| D4 | &nbsp; | D4 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}


### CAN (controller area network)

Sulu does not support CAN.

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.

### PDM 

{{imageOverlay src="/assets/images/sulu/sulu-pinout-pdm.svg" alt="Pinout PDM" class="full-width"}}

Pulse density modulation digital microphones can be used with the [Microphone_PDM](https://github.com/particle-iot/Microphone_PDM) library 
and Sulu, but only on specific pins.

{{!-- BEGIN do not edit content below, it is automatically generated e9d285b3-09e4-47f2-b040-a45f719a9bde --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | CLK | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | DAT | PB[2] |


{{!-- END do not edit content above, it is automatically generated--}}


### I2S (Sound)

{{imageOverlay src="/assets/images/sulu/sulu-pinout-i2s.svg" alt="Pinout I2S" class="full-width"}}

The Sulu hardware supports I2S (sound), but there is no support for it in Device OS. It should be possible to implement in a third-party library from user firmware, but there is no publicly available library available at this time.

{{!-- BEGIN do not edit content below, it is automatically generated 6489e45c-ce6e-41be-840b-c94c85124702 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D4 | D4 GPIO, SPI SS, PWM, I2S WS | I2S WS | PB[21] |
| MISO / D11 | SPI MISO, D11 GPIO, PWM, I2S TX | I2S TX | PB[19] |
| SCK / D13 | D13 GPIO, SPI SCK, PWM, I2S CLK | I2S CLK | PB[20] |
| TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | I2S MCLK | PA[12] |


{{!-- END do not edit content above, it is automatically generated--}}

### BLE (Bluetooth LE)

BLE Central and BLE Peripheral modes are supported on Sulu.

BLE long range (coded PHY) is not supported on Sulu.

### PMIC and Fuel Gauge

Sulu contains the bq24195 PMIC and MAX17043 fuel gauge. They are on a dedicated I2C interface and will not interfere with the `Wire` interface on `D0` and `D1`.

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

{{imageOverlay src="/assets/images/sulu/sulu-pinout-boot.svg" alt="Pinout Boot" class="full-width"}}

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated db6531b6-9387-4e7c-b2f9-779c8423b2cf --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 23 | D7 | Low at boot triggers MCU boot mode. | PB[31] |


{{!-- END do not edit content above, it is automatically generated --}}

`TX` is a boot mode pin on the Photon 2, P2, and M-SoM, but not on Sulu.

#### Boot mode pins vs. Photon 2

{{!-- imageOverlay src="/assets/images/sulu/sulu-photon2-boot-comparison.svg" alt="ADC comparison" class="full-width" --}}

While the D7 pin is common between Sulu and Photon 2 as a boot pin, there are fewer restrictions on Sulu.

{{!-- BEGIN do not edit content below, it is automatically generated 5baa3b30-adfa-4fbb-a77c-0cacd12bb039 --}}

| Photon 2 Pin Name | Photon 2 Boot | Sulu Pin Name | Sulu Boot |
| :--- | :--- | :--- | :--- |
| TX / D8 | Low at boot triggers ISP flash download | TX / D9 | &nbsp; |
| D6 | SWCLK. 40K pull-down at boot. | D6 | &nbsp; |
| D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | D7 | Low at boot triggers MCU boot mode. |


{{!-- END do not edit content above, it is automatically generated --}}

### Interrupts

All pins can be used for interrupts on Sulu.

There is a limit of 8 pin interrupts on the Boron; this limitation does not exist on Sulu.

### Sleep


Sulu can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

Sulu can only wake from `HIBERNATE` sleep mode certain pins, `RISING`, `FALLING`, or `CHANGE`. 

Pin D10 `WKP` is the same module pin location as the Argon pin D8, which is also the WKP pin. 

{{imageOverlay src="/assets/images/sulu/sulu-pinout-hibernate.svg" alt="Pinout Boot" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated f1da1b65-7e6c-4611-ba44-b9273c40c9da --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 14 | RX / D10 | Serial RX, PWM, GPIO | Pin can wake from HIBERNATE sleep | PA[13] |
| 15 | TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
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

{{!-- BEGIN do not edit content below, it is automatically generated c95d8236-be6f-492a-a5d6-40adf1a6acc7 --}}


#### 1 RST

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hardware reset. Pull low to reset; can leave unconnected in normal operation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">CHIP_EN</td></tr>
</tbody>
</table>

#### 2 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Regulated 3.3V DC output, maximum load 1000 mA</td></tr>
</tbody>
</table>

#### 3 MODE

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MODE</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">MODE button, has internal pull-up</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[11]</td></tr>
</tbody>
</table>

#### 4 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 5 A0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A0 Analog in, PDM CLK, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[1]</td></tr>
</tbody>
</table>

#### 6 A1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A1 Analog in, PDM DAT, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[2]</td></tr>
</tbody>
</table>

#### 7 A2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A2 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[7]</td></tr>
</tbody>
</table>

#### 8 A3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A3 Analog in, SPI1 MOSI, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">42K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[4]</td></tr>
</tbody>
</table>

#### 9 A4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A4 Analog in, SPI1 MISO, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[5]</td></tr>
</tbody>
</table>

#### 10 A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, SPI1 SCK, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">22K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[6]</td></tr>
</tbody>
</table>

#### 11 SCK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D13 GPIO, SPI SCK, PWM, I2S CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[20]</td></tr>
</tbody>
</table>

#### 12 MOSI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MOSI, D12 GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[18]</td></tr>
</tbody>
</table>

#### 13 MISO

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MISO, D11 GPIO, PWM, I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[19]</td></tr>
</tbody>
</table>

#### 14 RX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial RX, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[13]</td></tr>
</tbody>
</table>

#### 15 TX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, PWM, GPIO, I2S MCLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S MCLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[12]</td></tr>
</tbody>
</table>

#### 16 D0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SDA, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[24]</td></tr>
</tbody>
</table>

#### 17 D1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SCL, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[23]</td></tr>
</tbody>
</table>

#### 18 D2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D2 GPIO, Serial RTS flow control (optional)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[14]</td></tr>
</tbody>
</table>

#### 19 D3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D3 GPIO, Serial1 CTS flow control (optional)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">CTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[15]</td></tr>
</tbody>
</table>

#### 20 D4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D4 GPIO, SPI SS, PWM, I2S WS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S WS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[21]</td></tr>
</tbody>
</table>

#### 21 D5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">21</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D5 GPIO, SPI1 SS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[29]</td></tr>
</tbody>
</table>

#### 22 D6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[30]</td></tr>
</tbody>
</table>

#### 23 D7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Signal used at boot</td><td class="" style="text-align: left; ">Low at boot triggers MCU boot mode.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[31]</td></tr>
</tbody>
</table>

#### 24 D8

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">24</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">WKP</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, WKP</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[20]</td></tr>
</tbody>
</table>

#### 25 VUSB

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">25</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VUSB</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 26 EN

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">26</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">EN</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.</td></tr>
</tbody>
</table>

#### 27 LI+

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">LI+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Connected to JST PH LiPo battery connector. 3.7V in or out.</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}

