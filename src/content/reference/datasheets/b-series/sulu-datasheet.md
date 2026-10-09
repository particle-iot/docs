---
title: Sulu datasheet
layout: commonTwo.hbs
columns: two
description: Sulu datasheet and migration guide tables
---

# Sulu datasheet (preliminary)

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and is subject to change.
{{box op="end"}}


## Overview

The Sulu is a global LTE CAT 1 bis module that supports cellular, Wi-Fi, and Bluetooth LE (BLE). It is based on the Realtek RTL8722DM
(same as the M-SoM) and contains built-in battery charging circuitry in a convenient Feather form-factor that be 
be used in prototyping breadboards or in production designs.

- Feather form-factor, like the Boron or Photon 2
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Quectel EG800Q-GL LTE Cat 1 bis (global) cellular modem

Unlike the Boron 404X (LTE Cat M1), the EG800Q-GL LTE Cat 1 bis module can connect to 4G LTE cellular networks worldwide.

### Comparison

|  | Sulu | Boron 404X | Photon 2 | B504e | M404 | M524 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Form factor | Feather | Feather | Feather | M.2 SoM | M.2 SoM | M.2 SoM |
| Cellular modem | Quectel EG800Q-GL | u-blox SARA-R510S | None | Quectel EG91-NAX | Quectel BG95-M5 | Quectel EG91-EX |
| Cellular region | Global | NorAm | N/A | Americas | NorAm | EMEAA |
| Cellular technology | LTE Cat 1 bis | LTE Cat M1 | None | LTE Cat 1 with 3G fallback | LTE Cat M1 | LTE Cat 1 with 2G/3G fallback |
| Wi-Fi supported | Yes (2.4 GHz and 5 GHz) | No | Yes (2.4 GHz and 5 GHz) | No | Yes (2.4 GHz and 5 GHz) | Yes (2.4 GHz and 5 GHz) |
| Generation | Gen 4 | Gen 3 | Gen 4 | Gen 3 | Gen 4 | Gen 4 |
| MCU | RTL8722DM | nRF52840 | RTL8721DM | nRF52840 | RTL8722DM | RTL8722DM |
| MCU processor speed | 200 MHz Cortex-M33 | 64 MHz Cortex-M4F | 200 MHz Cortex-M33 | 64 MHz Cortex-M4F | 200 MHz Cortex-M33 | 200 MHz Cortex-M33 |
| User RAM available | 3072 KB | ~80 KB | 3072 KB | ~80 KB | 3072 KB | 3072 KB |
| Maximum user application size | 2048 KB | 256 KB | 2048 KB | 256 KB | 2048 KB | 2048 KB |
| Li-Po battery connector | Yes | Yes | Yes | No | No | No |
| RGB status LED | Yes | Yes | Yes | No<sup>1</sup> | No<sup>1</sup> | No<sup>1</sup> |
| MODE and RESET buttons | Yes | Yes | Yes | No<sup>1</sup> | No<sup>1</sup> | No<sup>1</sup> |
| USB connector | USB-C | Micro-B | Micro-B | No<sup>1</sup> | No<sup>1</sup> | No<sup>1</sup> |
| BLE support | Yes | Yes | Yes | Yes | Yes | Yes |
| NFC tag support | No | Yes | No | Yes | No | No |
| GNSS support | No | No | No | Yes | Yes | Yes | 
| SIM | e-sim | MFF2 or 4FF | None | e-sim | MFF2 | MFF2 | 
| On-board antennas | None | BLE PCB antenna | Wi-Fi/BLE PCB antenna | None | None | None |

- <sup>1</sup> not included on the M.2 SoM module, typically included on your base board.

Cellular Region:
- NorAm: United States, Canada, and Mexico. 
- Americas: North, Central, and South America (not all countries supported). 
- EMEAA: Europe, Middle East, Africa, and Asia (not all countries supported).
- See [Country comparison](#country-comparison) below for additional information.

SIM:
- e-sim: Electronic SIM included. Cannot be programmed with arbitrary 3rd-party profiles on these devices.
- MFF2: SMD SIM included, cannot be changed.
- 4FF: Plastic nano SIM card, can be used with 3rd-party SIM cards


### MCU

{{!-- BEGIN shared-blurb f8fe3056-dfdd-46b2-9743-207930877f29 --}}
The Realtek RTL8722DM is in the same family as the P2 and Photon 2 modules (RTL8721DM), but has additional GPIO.

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - U.FL connector for external antenna
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8722DM MCU
  - ARM Cortex M33 CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 3072 KB (3 MB) of RAM available to user applications
- 8 MB flash file system
- FCC (United States), ISED (Canada), and CE (European Union) certified
{{!-- END shared-blurb --}}

### Block diagram

{{imageOverlay src="/assets/images/sulu/sulu-block-diagram.png" alt="Block diagram" class="full-width"}}

### Migration guides

## Power

## Antennas

- Sulu includes two U.FL connectors for external antennas:
  - Cellular 
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE

- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.

## Approved Antennas

### Certified cellular antennas

Sulu is certified with the following cellular antenna:

{{!-- BEGIN shared-blurb c04616f7-eede-439f-9dee-d5c9aa1bf53f --}}
| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |

Single quantity units and developer kits include a PARANTCW1EA antenna. Tray quantities of the do not include antennas.

| Dimension | Value | Unit |
| :--- | ---: | :---: |
| Length | 116.0 | mm |
| Width | 27.0 | mm |
| Thickness | 0.2 | mm |
| Cable Length | 189.5 | mm |

| Parameter       | 617-960     | 1156 - 1496 | 1520 - 1660.5 | 1710 - 2700 | 3330 - 4200 | 4200 - 5925 |
| :-------------- | :---------- | :---------- | :------------ | :---------- | :---------- | :---------- |
| V.S.W.R.        | ≤ 3.5       | ≤ 3.0       | ≤ 2.0         | ≤ 2.0       | ≤ 1.5       | ≤ 2.0       |
| Peak Gain       | 2.8 dBi     | 2.4 dBi     | 3.9 dBi       | 5.3 dBi     | 5.6 dBi     | 7.9 dBi     |
| Eff % (max/avg) | 71/62       | 55/53       | 68/62         | 85/70       | 76/71       | 69/62       |

{{!-- END shared-blurb --}}

### Certified Wi-Fi/BLE antennas

Sulu is certified for use with the same antennas as the P2/Photon 2. The same antenna is shared for Wi-Fi and BLE. Unlike the P2/Photon 2, the external antenna is required for Wi-Fi and BLE and Sulu does not include a built-in trace antenna on the module.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x1] | PARANTWM1EA | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/particle-p2-photon2-wi-fi-antenna-2-4-5ghz)  |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x50] |PARANTWM1TY | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTWM1EA antenna. Tray quantities of the M-SoM do not include antennas.

{{!-- BEGIN shared-blurb adf4fb35-acf2-464b-8080-15e05f79006b --}}
{{box op="start" cssClass="boxed warningBox"}}
Do not use the Argon Wi-Fi/BLE antenna (ANT-FLXV2) on the P2, Photon 2, or M-SoM. The Argon antenna does not 
work with 5 GHz and this will result in poor Wi-Fi performance on the P2, Photon 2, and M-SoM.
{{box op="end"}}
{{!-- END shared-blurb --}}

### General Antenna Guidance

- The antenna placement needs to follow some basic rules, as any antenna is sensitive to its environment. Mount the antenna at least 10mm from metal components or surfaces, ideally 20mm for best radiation efficiency, and try to maintain a minimum of three directions free from obstructions to be able to operate effectively.
- Needs tuning with actual product enclosure and all components.
 
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

On the RTL872x devices, all PWM pins and the RGB LED share the same PWM timer and must share the same PWM frequency, though each pin can have a separate duty cycle.

#### PWM vs. Boron

{{!-- imageOverlay src="/assets/images/sulu/sulu-boron-pwm-comparison.svg" alt="PWM comparison" class="full-width" --}}

The pins that support PWM are different on the Boron (and Argon) and Sulu.

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

The pins that support PWM are different on the Photon and Sulu.

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

| Name       | MCU    | Description |
| :--------- | :----- | :---------- |
| PMIC_SDA   | PB[0]  | SDA for PMIC/Fuel Gauge |
| PMIC_SCL   | PA[31] | SCL for PMIC/Fuel Gauge |
| LOW_BAT_UC | PA[21] | PMIC and Fuel Gauge interrupt |


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


## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated f82eeab1-470c-4c25-a505-3057c080fc1d --}}

| Country | Technologies | Carriers |
| :--- | :--- | :--- |
| Albania | 4G | Eagle, Telekom, Vodafone |
| Algeria | 4G | Mobilis, Ooredoo |
| Anguilla | 4G | Flow |
| Antigua and Barbuda | 4G | Flow |
| Argentina | 4G | Claro, Movistar, Personal |
| Armenia | 4G | Ucom |
| Aruba | 4G | Setar |
| Australia | 4G | Optus, Telstra, Vodafone |
| Austria | 4G | 3 (Drei), A1, T-Mobile |
| Azerbaijan | 4G | Azercell, Bakcell, NAR Mobile |
| Bahamas | 4G | Aliv, BTC Bahamas |
| Bahrain | 4G | Zain |
| Bangladesh | 4G | Bangalink, GrameenPhone |
| Barbados | 4G | Flow |
| Belarus | 4G | A1 |
| Belgium | 4G | Base, Orange, Proximus |
| Bolivia | 4G | Viva |
| Botswana | 4G | BeMobile |
| Brunei | 4G | DST |
| Bulgaria | 4G | A1, Telenor, Vivacom |
| Burkina Faso | 4G | Orange |
| Cabo Verde | 4G | CVMóvel, Unitel T+ |
| Cambodia | 4G | Metfone |
| Canada | 4G | Bell Mobility, Rogers Wireless, Telus, Videotron |
| Cayman Islands | 4G | Flow |
| Chad | 4G | Airtel |
| Chile | 4G | Claro, Entel, Movistar |
| Colombia | 4G | Movistar, Tigo |
| Congo (Brazzaville) | 4G | Airtel |
| Congo (Kinshasa) | 4G | Airtel |
| Costa Rica | 4G | Movistar |
| Côte d'Ivoire | 4G | MTN |
| Croatia | 4G | Hrvatski Telekom, Tele2 |
| Cyprus | 4G | Cytamobile-Vodafone, MTN, PrimeTel |
| Czechia | 4G | O2, T-Mobile, Vodafone |
| Denmark | 4G | 3 (Tre), TDC, Telenor, Telia |
| Dominica | 4G | Flow |
| Dominican Republic | 4G | Altice Dominicana, Claro, Viva |
| Ecuador | 4G | Claro, Movistar |
| Egypt | 4G | Etisalat, Orange |
| El Salvador | 4G | Claro, Telefonica |
| Estonia | 4G | Elisa, Tele2, Telia |
| eSwatini | 4G | MTN |
| Faroe Islands | 4G | Faroese Telecom, Vodafone |
| Finland | 4G | DNA, Elisa, Telia |
| France | 4G | Bouygues, Free Mobile, Orange, SFR |
| Gabon | 4G | Airtel |
| Georgia | 4G | Beeline, Geocell |
| Germany | 4G | O2, Telekom, Vodafone |
| Ghana | 4G | MTN, Vodafone |
| Gibraltar | 4G | Gibtel |
| Greece | 4G | Cosmote, Vodafone, Wind |
| Guadeloupe | 4G | Orange |
| Guatemala | 4G | Claro, Movistar |
| Guernsey | 4G | Sure |
| Guinea | 4G | MTN |
| Guinea-Bissau | 4G | MTN |
| Guyana | 4G | Digicel |
| Honduras | 4G | Claro, Tigo |
| Hong Kong | 4G | CMHK, CSL, SmarTone |
| Hungary | 4G | Magyar Telekom, Telenor, Vodafone |
| Iceland | 4G | Nova, Siminn, Vodafone |
| Indonesia | 4G | Indosat, Telkomsel, XL Axiata |
| Ireland | 4G | 3 (Tre), Meteor, O2, Vodafone |
| Isle of Man | 4G | Manx Telecom, Sure |
| Israel | 4G | Hot Mobile, Orange, Pelephone |
| Italy | 4G | TIM, Vodafone, Wind |
| Jamaica | 4G | Digicel, Flow |
| Japan | 4G | KDDI, NTT DoCoMo, Softbank |
| Jersey | 4G | Jersey Telecom, Sure |
| Jordan | 4G | Zain |
| Kazakhstan | 4G | Beeline, K-Cell |
| Kenya | 4G | Airtel |
| Kuwait | 4G | Viva, Zain |
| Kyrgyzstan | 4G | Beeline |
| Latvia | 4G | Bite, LMT, Tele2 |
| Liechtenstein | 4G | Mobilkom, Orange |
| Lithuania | 4G | Bite, Omnitel, Tele2 |
| Luxembourg | 4G | Orange, POST, Tango |
| Madagascar | 4G | Airtel |
| Malawi | 4G | Airtel |
| Malaysia | 4G | Celcom, DiGi, Maxis |
| Malta | 4G | Go Mobile, Vodafone |
| Mexico | 4G | AT&T, Telcel |
| Moldova | 4G | Moldcell, Orange |
| Mongolia | 4G | Mobicom, Unitel |
| Montenegro | 4G | Mtel, T-Mobile, Telenor |
| Morocco | 4G | Inwi, Medi Telecom |
| Mozambique | 4G | Vodacom |
| Myanmar | 4G | MPT, Telenor |
| Namibia | 4G | Telecom Namibia |
| Netherlands | 4G | KPN, T-Mobile, Vodafone |
| New Zealand | 4G | 2degrees, Spark, Vodafone |
| Nicaragua | 4G | Movistar |
| Nigeria | 4G | Airtel, MTN |
| North Macedonia | 4G | Vip operator |
| Norway | 4G | TDC, Telenor, Telia |
| Pakistan | 4G | Jazz, Telenor, Ufone |
| Panama | 4G | Movistar |
| Paraguay | 4G | Claro, Personal, Tigo, Vox |
| Peru | 4G | Claro, Entel, Movistar |
| Philippines | 4G | Globe, Smart |
| Poland | 4G | Orange, Play, Plus, T-Mobile |
| Portugal | 4G | NOS, TMN, Vodafone |
| Puerto Rico | 4G | Claro |
| Qatar | 4G | Ooredoo, Vodafone |
| Romania | 4G | Orange, Telekom Romania, Vodafone |
| Saint Kitts and Nevis | 4G | Flow |
| Saint Lucia | 4G | Flow |
| Saint Vincent and the Grenadines | 4G | Flow |
| Serbia | 4G | Telenor, VIP |
| Seychelles | 4G | Airtel |
| Slovakia | 4G | O2, Orange, Telekom |
| Slovenia | 4G | A1, Mobitel |
| South Africa | 4G | MTN, Vodacom |
| South Korea | 4G | KT, LG U+, SK Telecom |
| Spain | 4G | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | 4G | Dialog, Mobitel |
| Sweden | 4G | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | 4G | Salt, Sunrise |
| Taiwan | 4G | Chunghwa, FarEasTone, T Star, Taiwan Mobile |
| Tajikistan | 4G | Beeline, Tcell |
| Tanzania | 4G | Airtel |
| Thailand | 4G | AIS, DTAC, True Move |
| Trinidad and Tobago | 4G | Digicel, TSTT |
| Tunisia | 4G | Orange Tunisie, Tunisie Telecom |
| Turks and Caicos Islands | 4G | Flow |
| Uganda | 4G | Africell, Airtel, MTN |
| Ukraine | 4G | Kyivstar, Life, MTS |
| United Kingdom | 4G | 3, EE, O2, Vodafone |
| United States | 4G | Alaska Wireless, AT&T, T-Mobile (USA), Verizon<sup>7</sup> |
| Uruguay | 4G | Antel, Claro, Movistar |
| Uzbekistan | 4G | Beeline |
| Venezuela | 4G | Movistar |
| Vietnam | 4G | MobiFone, Viettel, Vinaphone |
| Virgin Islands (British) | 4G | CCT, Flow |
| Virgin Islands (U.S.) | 4G | T-Mobile (USA) |
| Zambia | 4G | Airtel |


{{!-- END do not edit content above, it is automatically generated  --}}


### Country comparison

{{!-- BEGIN do not edit content below, it is automatically generated 896ba802-bdd8-4f9e-8f06-6d82af2289cd --}}

| Country | Sulu | BRN404X | B504e | M404 | M524 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Afghanistan | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Albania | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Algeria | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Anguilla | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Antigua and Barbuda | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Argentina | ✅ | ❓ | ❓ | ❓ | ❓ |
| Armenia | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Aruba | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Australia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Austria | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Azerbaijan | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Bahamas | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Bahrain | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Bangladesh | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Barbados | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Belarus | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Belgium | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Belize | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Bolivia | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Bosnia and Herzegovina | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Botswana | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Brunei | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Bulgaria | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Burkina Faso | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Cabo Verde | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Cambodia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Canada | ✅ | ✅ | ✅ | ✅ | &nbsp; |
| Cayman Islands | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Chad | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Chile | ✅ | &nbsp; | ❓ | &nbsp; | ✅ |
| Colombia | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Congo (Brazzaville) | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Congo (Kinshasa) | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Costa Rica | ✅ | &nbsp; | ❓ | &nbsp; | ❓ |
| Côte d'Ivoire | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Croatia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Cyprus | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Czechia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Denmark | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Dominica | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Dominican Republic | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Ecuador | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Egypt | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| El Salvador | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Estonia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| eSwatini | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Ethiopia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Faroe Islands | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Finland | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| France | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| French Guiana | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Gabon | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Georgia | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Germany | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Ghana | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Gibraltar | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Greece | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Guadeloupe | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Guatemala | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Guernsey | ✅ | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Guinea | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Guinea-Bissau | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Guyana | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Haiti | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Honduras | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Hong Kong | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Hungary | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Iceland | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Indonesia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Ireland | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Isle of Man | ✅ | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Israel | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Italy | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Jamaica | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Japan | ✅ | ❓ | &nbsp; | ❓ | ❓ |
| Jersey | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Jordan | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Kazakhstan | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Kenya | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Kuwait | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Kyrgyzstan | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Latvia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Liechtenstein | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Lithuania | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Luxembourg | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Macao | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Madagascar | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Malawi | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Malaysia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Malta | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Mexico | ✅ | ✅ | ✅ | ✅ | &nbsp; |
| Moldova | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Mongolia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Montenegro | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Morocco | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Mozambique | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Myanmar | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Namibia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Netherlands | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| New Zealand | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Nicaragua | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Nigeria | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| North Macedonia | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Norway | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Pakistan | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Palestine | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Panama | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Papua New Guinea | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Paraguay | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Peru | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Philippines | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Poland | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Portugal | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Puerto Rico | ✅ | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Qatar | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Romania | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Rwanda | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Saint Kitts and Nevis | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Saint Lucia | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Saint Vincent and the Grenadines | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Serbia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Seychelles | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Sint Maarten | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Slovakia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Slovenia | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| South Africa | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| South Korea | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| South Sudan | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Spain | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Sri Lanka | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Suriname | &nbsp; | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Sweden | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Switzerland | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Taiwan | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Tajikistan | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Tanzania | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Thailand | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| Trinidad and Tobago | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Tunisia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Turks and Caicos Islands | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Uganda | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Ukraine | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| United Kingdom | ✅ | ❓ | &nbsp; | ❓ | ✅ |
| United States | ✅ | ✅ | ✅ | ✅ | &nbsp; |
| Uruguay | ✅ | &nbsp; | ❓ | &nbsp; | ❓ |
| Uzbekistan | ✅ | &nbsp; | &nbsp; | &nbsp; | ❓ |
| Venezuela | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Vietnam | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |
| Virgin Islands (British) | ✅ | &nbsp; | ❓ | &nbsp; | ❓ |
| Virgin Islands (U.S.) | ✅ | &nbsp; | ❓ | &nbsp; | &nbsp; |
| Zambia | ✅ | &nbsp; | &nbsp; | &nbsp; | ✅ |


{{!-- END do not edit content above, it is automatically generated  --}}

✅ Recommended and supported<br/>
❓ Not officially supported, but may work

## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2026-10-07 | RK | Initial version |
