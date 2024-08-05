---
title: Muon datasheet
columns: two
layout: commonTwo.hbs
description: Muon datasheet
---

# Muon datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and changes are likely before release.
{{box op="end"}}


## Overview

The Muon is a developer kit based on the M-SoM with additional peripherals for easy prototyping.

- LoRaWAN module (Quectel KG200Z, 862 – 928 MHz)
- Expansion connector
- Temperature sensor (TMP112A)
- Real-time clock and watchdog chip (AM1805)
- Ethernet (WIZnet W5500)
- Reset and mode buttons
- RGB status LED
- Power input options
  - USB-C
  - VIN (6-12 VDC)
  - LiPo battery with temperature sensor (3-pin JST-PH)

{{imageOverlay src="/assets/images/m-series/muon-rendering-top.png" alt="Rendering Top" class="full-width"}}


### M-SoM

The Muon contains a Particle M-SoM that the following functional units:
 
- M.2 SoM form-factor, like the B-Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - M404: Quectel BG95-M5 LTE Cat M1/2G (Global)
  - M524: Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)
  - M635: Quectel BG95-S5 LTE Cat M1/2G (Global with satellite)

The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations. See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.


### MCU

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

### Block diagram

{{imageOverlay src="/assets/images/m-series/muon-block-diagram.png" alt="Block diagram" class="full-width"}}

### Device families

| | Cellular Only | Cellular & Wi-Fi | Wi-Fi Only |
| :--- | :---: | :---: | :---: |
| Developer devices | Boron | Muon | Photon 2 |
| Production module | B-SoM | M-SoM | P2 |

### Migration guides

If you are migrating to the M-SoM from another Particle device, see also the following migration guides:

- [Muon from Argon or Boron](/hardware/migration-guides/muon-boron-migration-guide/)

*Additional guides will be added at a later date*

### Features

{{imageOverlay src="/assets/images/m-series/muon-labeled.png" alt="Features labeled" class="full-width"}}

| Label | Feature |
| :---: | :--- |
|  1 | M-SoM |
|  2 | Expansion connector |
|  3 | USB-C |
|  4 | USB Power LED ("PD") |
|  5 | Charge LED ("CHG") |
|  6 | VIN (6-12 VDC) |
|  7 | LiPo battery connector (3-pin) |
|  8 | SWD/JTAG debugging connector |
|  9 | Ethernet RJ-45 connector |
| 10 | LoRaWAN antenna |
| 11 | LoRaWAN status LED |
| 12 | QWIIC (3.3V I2C) connector |
| 13 | RESET button | 
| 14 | RGB status LED |
| 15 | MODE button |

### Dimensions

Overall dimensions are 56mm x 85mm (2.2" x 3.35").

{{imageOverlay src="/assets/images/m-series/muon-dims.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>

### Expansion connector

The Muon has a 40-pin (2x20) male header pin expansion connector on the top of the board, allowing the use of many 
Raspberry Pi-compatible "hat" expansion cards that sit on top of the Muon. 

The expansion connector includes:

- GPIO
- I2C
- SPI
- UART serial
- PWM (pulse-width modulation)
- 3.3V power
- 5V power

All GPIO and ports are 3.3V only and are not 5V tolerant.

### Power

Power can be supplied to Muon by:

- USB-C
- VIN (6 - 12 VDC, via screw terminals)
- LiPo battery (via 3-pin JST battery connector)

The Muon cannot be powered from the expansion connector or internally by PoE.

#### LiPo battery connector

The Muon has a 3-pin JST-PH (2mm pitch) battery connector that is the same as the Monitor One for connection to a 3.7V LiPo battery pack 
with an integrated temperature sensor (10K NTC thermistor).

Some other Particle devices have a 3.7V LiPo battery without a temperature sensor using 2-pin JST-PH connector. This battery is not compatible and cannot be used with the Muon. A temperature sensor or equivalent resistance is required for proper operation; replacing the connector is not sufficient to use a battery without a temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>


If purchasing a battery from a 3rd-party supplier, verify the polarity as the polarity is not standardized even for batteries using a JST-PH connector.

### RF

- The M-SoM includes three U.FL connectors for external antennas:
  - Cellular 
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE
  - GNSS (GPS)
- The Muon adds an additional U.FL connector for LoRaWAN antenna.
- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.
- GNSS features are limited M404 as the cellular modem cannot do cellular communication and GNSS at the same time.

### Approved Antennas


### Certified cellular antennas

The M-SoM is certified with the following cellular antenna:

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | M404, M524, M635 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | M404, M524, M635 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTCW1EA antenna. Tray quantities of the M-SoM do not include antennas.


| Dimension | Value | Unit |
| :--- | ---: | :---: |
| Length | 116.0 | mm |
| Width | 27.0 | mm |
| Thickness | 0.2 | mm |
| Cable Length | 189.5 | mm |


| Parameter | 700/850/900 | 1700/1800/1900 | 2100 | 2400 | 2600 | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Peak gain | | | | | | | |
| PARANTCW1EA | 2.8 | 5.3 | 5.3 | 5.3 | 5.3 | dBi |


### Certified Wi-Fi/BLE antennas

The M-SoM is certified for use with the same antennas as the P2/Photon 2. The same antenna is shared for Wi-Fi and BLE. Unlike the P2/Photon 2, the external antenna is required for Wi-Fi and BLE and the M-SoM does not include a built-in trace antenna on the module.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x1] | PARANTWM1EA | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/particle-p2-photon2-wi-fi-antenna-2-4-5ghz)  |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x50] |PARANTWM1TY | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTWM1EA antenna. Tray quantities of the M-SoM do not include antennas.

### Certified GNSS antennas

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTGN1EA antenna. Tray quantities of the M-SoM do not include antennas. If not using the GNSS feature, the antenna can be omitted from your design.

- GNSS features are limited on the M404 and M635 as the cellular modem cannot do cellular communication and GNSS at the same time.
- GNSS support will be added in a future version of Device OS.
- Feature such of high-precision, dead-reckoning, and high updates rates will require an external GNSS chip.

### Certified LoRa antennas

To be provided at a later date.


#### General Antenna Guidance

- The antenna placement needs to follow some basic rules, as any antenna is sensitive to its environment. Mount the antenna at least 10mm from metal components or surfaces, ideally 20mm for best radiation efficiency, and try to maintain a minimum of three directions free from obstructions to be able to operate effectively.
- Needs tuning with actual product enclosure and all components.
 

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 20 (max) | I/O |
| Analog (ADC) | 7 (max) | I |
| UART | 2 | I/O |
| SPI  | 2 | I/O |
| I2C  | 1 | I/O |
| USB  | 1 | I/O |
| PWM  | 10 (max) | O |

**Note:** All GPIOs are only rated at 3.3VDC max.

### JTAG and SWD 

Muon has a Particle-standard 10-pin 2x5 SWD debugging connector. This interface can be used to debug your code or reprogram your bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" class="small"></div>

SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840). Using a Debug build in Particle workbench will allow SWD to continue to run, but you will not be able to use pins A5, A6, or D27 as GPIO or ADC.

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | SWCLK | PB[3] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWO (Serial Wire Output) is not supported on the RTL8722DM.
- Pins 43 and 53 are shared 

{{!-- BEGIN shared-blurb b22140c5-a3b4-4295-bd72-ae892dc637cf --}}
| I2C Address | Peripheral |
| :--- | :--- |
| 0x08 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x68 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
|      | LoRaWAN radio |
{{!-- END shared-blurb --}}


## Pin information

### Pinout diagram

The Muon has 40-pin expansion connector mounted on the top of the board.

- 2x20 pins
- 0.1" (2.54mm) pitch in both directions
- Male header pins on top of the board
- Generally compatible with Raspberry Pi expansion connector

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Pinout" class="full-width"}}


### Pin function by Particle pin name

{{!-- BEGIN do not edit content below, it is automatically generated 4c12540b-20a8-4d2b-a070-0237af5223e3 --}}

| Pin Name | Module Pin |   |   |   |   | PWM | MCU | Raspberry Pi |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| A0 / D19 | 29 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[4] | GPIO5 |
| A1 / D18 | 31 | ADC_1 | &nbsp; | SPI2 (MISO) | &nbsp; | &check; | PB[5] | GPIO6 |
| A2 / D17 | 26 | ADC_2 | &nbsp; | SPI2 (SCK) | &nbsp; | &nbsp; | PB[6] | GPIO7 (CE1) |
| A5 / D14 | 13 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] | GPIO27 |
| A6 / D29 | 24 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] | GPIO8 (CE0) |
| D0 | 3 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | PB[0] | GPIO2 (SDA) |
| D1 | 5 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | PA[31] | GPIO3 (SCL) |
| D2 | 11 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | &nbsp; | PA[14] | GPIO17 |
| D3 | 36 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | &nbsp; | PA[15] | GPIO16 |
| D4 | 33 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[18] | GPIO13 (PWM1) |
| D5 | 32 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | PB[19] | GPIO12 (PWM0) |
| D6 | 12 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] | &nbsp; |
| D20 | 40 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] | GPIO21 (PCM_DOUT) |
| D21 | 38 | I2S RX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] | GPIO20 (PCM_DIN) |
| D22 | 22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] | GPIO25 |
| D24 | 16 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | &nbsp; | PA[7] | GPIO23 |
| D25 | 18 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | &nbsp; | PA[8] | GPIO24 |
| D26 | 35 | I2S WS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] | GPIO19 (PCM_FS) |
| D27 | 15 | &nbsp; | SWDIO | &nbsp; | &nbsp; | &nbsp; | PA[27] | GPIO22 |
| MISO / D11 | 21 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PA[17] | GPIO9 (MISO) |
| MOSI / D12 | 19 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PA[16] | GPIO10 (MOSI) |
| RX / D10 | 10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | &check; | PA[13] | GPIO15 (RXD) |
| SCK / D13 | 23 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | PA[18] | GPIO11 (SCLK) |
| TX / D9 | 8 | I2S MCLK | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | &check; | PA[12] | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin function by pin number


{{!-- BEGIN do not edit content below, it is automatically generated 5e824205-fd34-4c55-b256-be28273fdaf2 --}}

| Module Pin | Pin Name |   |   |   |   | PWM | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| 3 | D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | PB[0] | GPIO2 (SDA) |
| 5 | D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | PA[31] | GPIO3 (SCL) |
| 7 | IOEX_PA0 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO4 (GPCKL0) |
| 8 | TX / D9 | I2S MCLK | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | &check; | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | &check; | PA[13] | GPIO15 (RXD) |
| 11 | D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | &nbsp; | PA[14] | GPIO17 |
| 12 | D6 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] | &nbsp; |
| 13 | A5 / D14 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] | GPIO27 |
| 15 | D27 | &nbsp; | SWDIO | &nbsp; | &nbsp; | &nbsp; | PA[27] | GPIO22 |
| 16 | D24 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | &nbsp; | PA[7] | GPIO23 |
| 18 | D25 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | &nbsp; | PA[8] | GPIO24 |
| 19 | MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PA[16] | GPIO10 (MOSI) |
| 21 | MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PA[17] | GPIO9 (MISO) |
| 22 | D22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] | GPIO25 |
| 23 | SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | PA[18] | GPIO11 (SCLK) |
| 24 | A6 / D29 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] | GPIO8 (CE0) |
| 26 | A2 / D17 | ADC_2 | &nbsp; | SPI2 (SCK) | &nbsp; | &nbsp; | PB[6] | GPIO7 (CE1) |
| 27 | NC27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO0 (ID_SD) |
| 28 | NC28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO1 (ID_SC) |
| 29 | A0 / D19 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[4] | GPIO5 |
| 31 | A1 / D18 | ADC_1 | &nbsp; | SPI2 (MISO) | &nbsp; | &check; | PB[5] | GPIO6 |
| 32 | D5 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | PB[19] | GPIO12 (PWM0) |
| 33 | D4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[18] | GPIO13 (PWM1) |
| 35 | D26 | I2S WS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] | GPIO19 (PCM_FS) |
| 36 | D3 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | &nbsp; | PA[15] | GPIO16 |
| 37 | IOEX_PB7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO26 |
| 38 | D21 | I2S RX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] | GPIO20 (PCM_DIN) |
| 40 | D20 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin function by Raspberry Pi GPIO Number

{{!-- BEGIN do not edit content below, it is automatically generated 07ff48d2-f1ec-418c-be98-5f5e0d808dc0 --}}

| Raspberry Pi | Pin Name | Module Pin |   |   |   |   | PWM | MCU |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| &nbsp; | D6 | 12 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] |
| GPIO0 (ID_SD) | NC27 | 27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO1 (ID_SC) | NC28 | 28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO2 (SDA) | D0 | 3 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | PB[0] |
| GPIO3 (SCL) | D1 | 5 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | PA[31] |
| GPIO4 (GPCKL0) | IOEX_PA0 | 7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO5 | A0 / D19 | 29 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[4] |
| GPIO6 | A1 / D18 | 31 | ADC_1 | &nbsp; | SPI2 (MISO) | &nbsp; | &check; | PB[5] |
| GPIO7 (CE1) | A2 / D17 | 26 | ADC_2 | &nbsp; | SPI2 (SCK) | &nbsp; | &nbsp; | PB[6] |
| GPIO8 (CE0) | A6 / D29 | 24 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] |
| GPIO9 (MISO) | MISO / D11 | 21 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PA[17] |
| GPIO10 (MOSI) | MOSI / D12 | 19 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PA[16] |
| GPIO11 (SCLK) | SCK / D13 | 23 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | PA[18] |
| GPIO12 (PWM0) | D5 | 32 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | PB[19] |
| GPIO13 (PWM1) | D4 | 33 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[18] |
| GPIO14 (TXD) | TX / D9 | 8 | I2S MCLK | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | &check; | PA[12] |
| GPIO15 (RXD) | RX / D10 | 10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | &check; | PA[13] |
| GPIO16 | D3 | 36 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | &nbsp; | PA[15] |
| GPIO17 | D2 | 11 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | &nbsp; | PA[14] |
| GPIO19 (PCM_FS) | D26 | 35 | I2S WS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| GPIO20 (PCM_DIN) | D21 | 38 | I2S RX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| GPIO21 (PCM_DOUT) | D20 | 40 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| GPIO22 | D27 | 15 | &nbsp; | SWDIO | &nbsp; | &nbsp; | &nbsp; | PA[27] |
| GPIO23 | D24 | 16 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | &nbsp; | PA[7] |
| GPIO24 | D25 | 18 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | &nbsp; | PA[8] |
| GPIO25 | D22 | 22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| GPIO26 | IOEX_PB7 | 37 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO27 | A5 / D14 | 13 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] |


{{!-- END do not edit content above, it is automatically generated--}}




### GPIO (Digital I/O)

{{imageOverlay src="/assets/images/m-series/muon-gpio.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 2f265258-147d-4139-8a20-d85d1d137af5 --}}

| Pin | Muon Pin Name | Muon GPIO | MCU | Special boot function | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 7 | IOEX_PA0 | &check; | &nbsp; | &nbsp; | GPIO4 (GPCKL0) |
| 8 | TX / D9 | &check; | PA[12] | &nbsp; | GPIO14 (TXD) |
| 10 | RX / D10 | &check; | PA[13] | &nbsp; | GPIO15 (RXD) |
| 11 | D2 | &check; | PA[14] | &nbsp; | GPIO17 |
| 12 | D6 | &check; | PB[20] | &nbsp; | &nbsp; |
| 16 | D24 | &check; | PA[7] | Low at boot triggers ISP flash download | GPIO23 |
| 18 | D25 | &check; | PA[8] | Goes high at boot | GPIO24 |
| 24 | A6 / D29 | &check; | PB[7] | &nbsp; | GPIO8 (CE0) |
| 26 | A2 / D17 | &check; | PB[6] | &nbsp; | GPIO7 (CE1) |
| 29 | A0 / D19 | &check; | PB[4] | &nbsp; | GPIO5 |
| 31 | A1 / D18 | &check; | PB[5] | &nbsp; | GPIO6 |
| 32 | D5 | &check; | PB[19] | &nbsp; | GPIO12 (PWM0) |
| 33 | D4 | &check; | PB[18] | &nbsp; | GPIO13 (PWM1) |
| 35 | D26 | &check; | PA[4] | &nbsp; | GPIO19 (PCM_FS) |
| 36 | D3 | &check; | PA[15] | &nbsp; | GPIO16 |
| 37 | IOEX_PB7 | &check; | &nbsp; | &nbsp; | GPIO26 |
| 38 | D21 | &check; | PA[0] | &nbsp; | GPIO20 (PCM_DIN) |
| 40 | D20 | &check; | PA[1] | &nbsp; | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

- All GPIO are 3.3V only and are not 5V tolerant

Certain GPIO will change state at boot, or cause the MCU to enter a special mode. See the [boot mode pins](#boot-mode-pins) section, below, for more information.

The following M.2 SoM pins are used for internal functions on the Muon and are not available on the expansion connector and cannot be used as GPIO:

| Pin Name | Description | M2 Pin | Net |
| :--- | :--- | :--- | :--- |
| A3 | Ethernet CS | 37 | ETH_CS |
| A4 | Ethernet interrupt | 39 | ETH_INT |
| A7 | PMIC interrupt | 47 | M2_ADC7/PMIC_INT |
| D5 | I/O Expander CS | 68 | M2_D5 |
| D8 | I/O Expander INT | 48 | M2_D8/IOEX_INT |
| D22 | I/O Expander Reset | 62 | M2_D22 |
| D23 | 3V3_AUX and 5V power enable | 64 | M2_D23_3V3_AUX_EN |


### ADC (Analog to Digital Converter)

{{imageOverlay src="/assets/images/m-series/muon-adc.svg" alt="ADC pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated cb3c6480-361d-4437-8cc3-6422e4c04d74 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | ADC_6 | 43 | PB[3] | GPIO27 |
| 24 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | ADC_3 | 45 | PB[7] | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | ADC_2 | 35 | PB[6] | GPIO7 (CE1) |
| 29 | A0 / D19 | A0 Analog in, GPIO, PWM | ADC_0 | 23 | PB[4] | GPIO5 |
| 31 | A1 / D18 | A1 Analog in, GPIO, PWM | ADC_1 | 33 | PB[5] | GPIO6 |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits
- SoM pin 45 (A6) on the M-SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A6 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at hoot by the MCU.

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M-SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}

### UART serial

{{imageOverlay src="/assets/images/m-series/muon-uart.svg" alt="UART pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated a2d6df45-4f77-45d8-8280-f73c14add2e7 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Serial1 (TX) | 36 | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Serial1 (RX)  | 38 | PA[13] | GPIO15 (RXD) |
| 11 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Serial1 (RTS)  | 42 | PA[14] | GPIO17 |
| 16 | D24 | D24 GPIO, Serial2 TX, do not pull down at boot | Serial2 (TX)  | 58 | PA[7] | GPIO23 |
| 18 | D25 | GPIO25, Serial2 RX | Serial2 (RX)  | 60 | PA[8] | GPIO24 |
| 36 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Serial1 (CTS)  | 40 | PA[15] | GPIO16 |


{{!-- END do not edit content above, it is automatically generated--}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- Supported baud rates: 110, 300, 600, 1200, 9600, 14400, 19200, 28800, 38400, 57600, 76800, 115200, 128000, 153600, 230400, 500000, 921600, 1000000, 1382400, 1444400, 1500000, 1843200, 2000000, 2100000, 2764800, 3000000, 3250000, 3692300, 3750000, 4000000, 6000000


On the Muon, `Serial1` is available on the expansion connector. If Serial1 is not needed on these pins, they can be used as GPIO.

If using an expansion card that requires UART serial, generally the following pins are used on standard Raspberry Pi expansion cards. These cards generally do not support hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated eefd3c21-afb4-4412-b457-accaf0fa2413 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | TXD | 36 | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | RXD | 38 | PA[13] | GPIO15 (RXD) |


{{!-- END do not edit content above, it is automatically generated--}}




### SPI

{{imageOverlay src="/assets/images/m-series/muon-spi.svg" alt="SPI pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 3fd13fdc-0a2d-41aa-9a26-3afd196022bd --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | SPI1 (MOSI) | 36 | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | SPI1 (MISO) | 38 | PA[13] | GPIO15 (RXD) |
| 11 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | SPI1 (SCK) | 42 | PA[14] | GPIO17 |
| 19 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | SPI (MOSI) | 52 | PA[16] | GPIO10 (MOSI) |
| 21 | MISO / D11 | D11 GPIO, PWM, SPI MISO | SPI (MISO) | 50 | PA[17] | GPIO9 (MISO) |
| 23 | SCK / D13 | D13 GPIO, SPI SCK | SPI (SCK) | 54 | PA[18] | GPIO11 (SCLK) |
| 26 | A2 / D17 | A2 Analog in, GPIO | SPI2 (SCK) | 35 | PB[6] | GPIO7 (CE1) |
| 31 | A1 / D18 | A1 Analog in, GPIO, PWM | SPI2 (MISO) | 33 | PB[5] | GPIO6 |
| 36 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | SPI1 (SS) | 40 | PA[15] | GPIO16 |


{{!-- END do not edit content above, it is automatically generated--}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- Any pins can be used as the SPI chip select, however certain pins are generally used for Raspberry Pi expansion cards.
- Multiple devices can generally share a single SPI port
- The expansion connector SPI pins are connected to `SPI`. 

If using an expansion card that requires SPI, generally the following pins are used. The pins `CE0` and `CE1` are generally used for SPI chip select on standard Raspberry Pi expansion cards.

{{!-- BEGIN do not edit content below, it is automatically generated e09ec63f-a037-4dac-b8ca-8038186e5515 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | MOSI | 52 | PA[16] | GPIO10 (MOSI) |
| 21 | MISO / D11 | D11 GPIO, PWM, SPI MISO | MISO | 50 | PA[17] | GPIO9 (MISO) |
| 23 | SCK / D13 | D13 GPIO, SPI SCK | SCLK | 54 | PA[18] | GPIO11 (SCLK) |
| 24 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | CE0 | 45 | PB[7] | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | CE1 | 35 | PB[6] | GPIO7 (CE1) |


{{!-- END do not edit content above, it is automatically generated--}}

Expansion cards GPIO10 (MOSI), GPIO9 (MISO), and GPIO11(SCLK) can only be used for SPI. They cannot be used as GPIO because the SPI bus is used for internal peripherals on the Muon. You can, however, use GPIO8 (CE0) and GPIO7 (CE1) as GPIO if not using them for SPI.

### I2C

{{imageOverlay src="/assets/images/m-series/muon-i2c.svg" alt="GPIO pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated e9702f86-0377-4b10-a451-c4ebebd36177 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | D0 | D0 GPIO, I2C SDA | Wire (SDA) | 22 | PB[0] | GPIO2 (SDA) |
| 5 | D1 | D1 GPIO, I2C SCL | Wire (SCL) | 20 | PA[31] | GPIO3 (SCL) |
| 12 | D6 | D6 GPIO, PWM, I2S CLK | Wire1 (SCL) | 70 | PB[20] | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz

On the Muon, `Wire` is available on the expansion connector on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 8b0e89b2-549c-47a2-bb14-bfb86825687b --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | D0 | D0 GPIO, I2C SDA | SDA | 22 | PB[0] | GPIO2 (SDA) |
| 5 | D1 | D1 GPIO, I2C SCL | SCL | 20 | PA[31] | GPIO3 (SCL) |


{{!-- END do not edit content above, it is automatically generated--}}

Raspberry Pi GPIO2 and GPIO3 can only be used as I2C, not as GPIO, This is because the I2C is also used for peripherals on the Muon. You cannot use these I2C addresses on expansion cards as they will conflict with built-in peripherals.

{{!-- BEGIN shared-blurb b22140c5-a3b4-4295-bd72-ae892dc637cf --}}
| I2C Address | Peripheral |
| :--- | :--- |
| 0x08 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x68 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
|      | LoRaWAN radio |
{{!-- END shared-blurb --}}




### PWM

{{imageOverlay src="/assets/images/m-series/muon-pwm.svg" alt="GPIO pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 0e2ce92a-0155-43c6-b496-e30bafeb33e4 --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | 36 | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | 38 | PA[13] | GPIO15 (RXD) |
| 12 | D6 | D6 GPIO, PWM, I2S CLK | 70 | PB[20] | &nbsp; |
| 13 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | 43 | PB[3] | GPIO27 |
| 19 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | 52 | PA[16] | GPIO10 (MOSI) |
| 21 | MISO / D11 | D11 GPIO, PWM, SPI MISO | 50 | PA[17] | GPIO9 (MISO) |
| 24 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | 45 | PB[7] | GPIO8 (CE0) |
| 29 | A0 / D19 | A0 Analog in, GPIO, PWM | 23 | PB[4] | GPIO5 |
| 31 | A1 / D18 | A1 Analog in, GPIO, PWM | 33 | PB[5] | GPIO6 |
| 32 | D5 | D5 GPIO, PWM, I2S TX | 68 | PB[19] | GPIO12 (PWM0) |
| 33 | D4 | D4 GPIO, PWM | 66 | PB[18] | GPIO13 (PWM1) |


{{!-- END do not edit content above, it is automatically generated--}}

- All available PWM pins on the M-SoM share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


If using an expansion card that requires PWM, generally the following pins are used on standard Raspberry Pi expansion cards.

{{!-- BEGIN do not edit content below, it is automatically generated a5166ee1-a72a-401d-ae99-6e1ebf2a7082 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | PWM1 | 43 | PB[3] | GPIO27 |
| 32 | D5 | D5 GPIO, PWM, I2S TX | PWM0 | 68 | PB[19] | GPIO12 (PWM0) |
| 33 | D4 | D4 GPIO, PWM | PWM1 | 66 | PB[18] | GPIO13 (PWM1) |
| 35 | D26 | D26 GPIO, I2S WS | GPIO19 | 59 | PA[4] | GPIO19 (PCM_FS) |


{{!-- END do not edit content above, it is automatically generated--}}





### I2S

{{imageOverlay src="/assets/images/m-series/muon-i2s.svg" alt="GPIO pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 1fbd4565-425c-4e5f-9136-130f4558d675 --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | 36 | PA[12] | GPIO14 (TXD) |
| 12 | D6 | D6 GPIO, PWM, I2S CLK | 70 | PB[20] | &nbsp; |
| 32 | D5 | D5 GPIO, PWM, I2S TX | 68 | PB[19] | GPIO12 (PWM0) |
| 35 | D26 | D26 GPIO, I2S WS | 59 | PA[4] | GPIO19 (PCM_FS) |
| 38 | D21 | D21 GPIO, I2S RX | 17 | PA[0] | GPIO20 (PCM_DIN) |
| 40 | D20 | D20 GPIO, I2S TX | 19 | PA[1] | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

- Note that this is I2S ("sound") not I2C.
- Only I2S, not raw PCM frames, are supported. 
- A third party library is required for I2S; it is not built into Device OS.
- PDM is not available on the Muon, but an I2S microphone can be used instead of a PDM microphone.

The Muon is only compatible with Raspberry Pi expansion cards that support I2S on the PCM pins, not cards that use raw PCM frames. Generally the following pins are used on standard Raspberry Pi expansion cards that use I2S:

{{!-- BEGIN do not edit content below, it is automatically generated 258144bf-ccd6-430f-be0d-9a0867b8b015 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 35 | D26 | D26 GPIO, I2S WS | PCM_FS | 59 | PA[4] | GPIO19 (PCM_FS) |
| 38 | D21 | D21 GPIO, I2S RX | PCM_DIN | 17 | PA[0] | GPIO20 (PCM_DIN) |
| 40 | D20 | D20 GPIO, I2S TX | PCM_DOUT | 19 | PA[1] | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

PDM cannot be used on Muon expansion cards as the M-SoM PDM pins (A2, A3) are used for internal peripherals and are not availble on the expansion connector.


### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated c9e7a163-b53c-4c4f-81ff-f84ec7344a0c --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | SWCLK. 40K pull-down at boot. | 43 | PB[3] | GPIO27 |
| 15 | D27 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | 55 | PA[27] | GPIO22 |
| 16 | D24 | Low at boot triggers ISP flash download | 58 | PA[7] | GPIO23 |
| 18 | D25 | Goes high at boot | 60 | PA[8] | GPIO24 |


{{!-- END do not edit content above, it is automatically generated --}}

### BLE (Bluetooth LE)

If you wish to use Wi-Fi on the M-SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.

BLE 5.3 BLE Central Mode and BLE Peripheral Mode are supported. 

Full-speed BLE modes such as A2DP used for BLE audio are not supported.

Wi-Fi and BLE share the same antenna so you do not need to include a separate antenna to use both.

### Sleep

The Muon/M-SoM can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The Muon/M-SoM can only wake from `HIBERNATE` sleep mode on pin A7 (WKP), `RISING`, `FALLING`, or `CHANGE`.

The Muon/M-SoM preserves the state of outputs during `STOP` or `ULTRA_LOW_POWER` sleep mode. In `HIBERNATE`, outputs are high-impedance.

Most pins can use `INPUT_PULLUP` or `INPUT_PULLDOWN` in sleep modes. The exception is `HIBERNATE` sleep mode where pin D21 can only use an external hardware pull-up or pull down.

{{!-- BEGIN do not edit content below, it is automatically generated 2629e77b-eb69-4f63-8f0e-011032c72782 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 38 | D21 | D21 GPIO, I2S RX | No internal pull up or pull down in HIBERNATE sleep mode. | 17 | PA[0] |


{{!-- END do not edit content above, it is automatically generated  --}}

## I/O expander

A MCP23S17 GPIO expander is present on the Muon board for internal use. It is connected to primary SPI along with Ethernet (W5500). 

- IOEX CS: D8
- IOEX RESET: D22

The following are connected to the I/O Expander:

| Port | Net  | Description |
| :--- | :--- | :--- |
| INTA | `D2_D8/IOEX_INT` | Interrupt output to MCU |
| CS   | `M2_D23/IOEX_CS` | SPI chip select from MCU | 
| GPA0 | `IOEX_PA0` | Expansion connector GPIO |
| GPA1 | `RTC_INT` | FOUT/IRQ from AB1805 |
| GPA2 | `TEMP_ALERT` | TMP112 temperature sensor alert |
| GPA3 | `PD_ALERT` | STUSB4500 USB-C PD alert interrupt |
| GPA4 | `PD_ATTACH` | STUSB4500 USB-C PD attach interrupt  |
| GPA5 | `IOEX_PA5` |  |
| GPA6 | `IOEX_PA6` |  |
| GPA7 | `LORA_ALERT` | KG200Z LoRa alert interrupt |
| GPB0 | `LORA_BOOT` | KG200Z LoRa boot mode select |
| GPB1 | `LORA_BUS_SEL` | KG200Z LoRa I2C/UART interface select |
| GPB2 | `LORA_RST` | KG200Z LoRa reset |
| GPB3 | `IOEX_PB3` | |
| GPB4 | `PD_RST` | STUSB4500 USB-C PD reset |
| GPB5 | `ETHERNET_RESET` | W5500 Ethernet reset |
| GPB6 | `IOEX_PB6` |  |
| GPB7 | `IOEX_PB7` | Expansion connector GPIO |

## Expansion card

The Muon can be expanded in several ways:

- Qwiic or Stemma-QT I2C peripherals
- Raspberry Pi hats
- Dupont wires or ribbon cables to a solderless breadboard
- A custom expansion card that sits on top of the Muon

### Raspberry Pi hats

The Muon can be used with some Raspberry Pi expansion cards ("hats") that sit on top of a Raspberry Pi. Note, however, that are limitations:

- Since the Muon is not a Raspberry Pi, even though the hardware fits, there may not be suitable software to use it.
- The Pi hat cannot be used to power the Muon.
- Some pins have limitations.


#### Pi hat connection pins 
{{!-- BEGIN do not edit content below, it is automatically generated 547410e9-fa4c-4166-9b92-4d365b9a8471 --}}

| Pin | Pi Pin Name | Pin Name | Description | Serial | SPI | I2C | I2S |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 3V3 power | 3V3 | 3.3V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 2 | 5V power | 5V | 5V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 3 | GPIO2 (SDA) | D0 | D0 GPIO, I2C SDA | &nbsp; | &nbsp; | Wire (SDA) | &nbsp; |
| 4 | 5V power | 5V | 5V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 5 | GPIO3 (SCL) | D1 | D1 GPIO, I2C SCL | &nbsp; | &nbsp; | Wire (SCL) | &nbsp; |
| 6 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 7 | GPIO4 (GPCKL0) | IOEX_PA0 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 8 | GPIO14 (TXD) | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Serial1 (TX) | SPI1 (MOSI) | &nbsp; | I2S MCLK |
| 9 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 10 | GPIO15 (RXD) | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Serial1 (RX)  | SPI1 (MISO) | &nbsp; | &nbsp; |
| 11 | GPIO17 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Serial1 (RTS)  | SPI1 (SCK) | &nbsp; | &nbsp; |
| 13 | GPIO27 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 14 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 15 | GPIO22 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 16 | GPIO23 | D24 | D24 GPIO, Serial2 TX, do not pull down at boot | Serial2 (TX)  | &nbsp; | &nbsp; | &nbsp; |
| 17 | 3V3 power | 3V3 | 3.3V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 18 | GPIO24 | D25 | GPIO25, Serial2 RX | Serial2 (RX)  | &nbsp; | &nbsp; | &nbsp; |
| 19 | GPIO10 (MOSI) | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; |
| 20 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 21 | GPIO9 (MISO) | MISO / D11 | D11 GPIO, PWM, SPI MISO | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; |
| 22 | GPIO25 | D22 | D22 GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 23 | GPIO11 (SCLK) | SCK / D13 | D13 GPIO, SPI SCK | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; |
| 24 | GPIO8 (CE0) | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 25 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 26 | GPIO7 (CE1) | A2 / D17 | A2 Analog in, GPIO | &nbsp; | SPI2 (SCK) | &nbsp; | &nbsp; |
| 27 | GPIO0 (ID_SD) | NC27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 28 | GPIO1 (ID_SC) | NC28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 29 | GPIO5 | A0 / D19 | A0 Analog in, GPIO, PWM | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 30 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 31 | GPIO6 | A1 / D18 | A1 Analog in, GPIO, PWM | &nbsp; | SPI2 (MISO) | &nbsp; | &nbsp; |
| 32 | GPIO12 (PWM0) | D5 | D5 GPIO, PWM, I2S TX | &nbsp; | &nbsp; | &nbsp; | I2S TX |
| 33 | GPIO13 (PWM1) | D4 | D4 GPIO, PWM | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 34 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 35 | GPIO19 (PCM_FS) | D26 | D26 GPIO, I2S WS | &nbsp; | &nbsp; | &nbsp; | I2S WS |
| 36 | GPIO16 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Serial1 (CTS)  | SPI1 (SS) | &nbsp; | &nbsp; |
| 37 | GPIO26 | IOEX_PB7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 38 | GPIO20 (PCM_DIN) | D21 | D21 GPIO, I2S RX | &nbsp; | &nbsp; | &nbsp; | I2S RX |
| 39 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 40 | GPIO21 (PCM_DOUT) | D20 | D20 GPIO, I2S TX | &nbsp; | &nbsp; | &nbsp; | I2S TX |


{{!-- END do not edit content above, it is automatically generated --}}

Of note:

- Pi pin 27 (GPIO0, ID_SD) and pin 28 (GPIO1, ID_SC) are NC and cannot be used. They are normally used for a Pi boot ROM, which isn't applicable to the Muon.
- Pi pin 3 (GPIO2, SDA) and pin 5 (GPIO3, SCL) can only be used for I2C and not GPIO, as the I2C port is shared with the Muon.
- Pi pin 19 (GPIO10, MOSI), pin 21 (GPIO9, MISO), and pin 23 (GPIO11, SCLK) can only be used for SPI and not GPIO, as the SPI port is shared with the Muon
- Pi pin 7 (GPIO4) and pin 37 (GPIO26) are connected to the I/O expander, not directly to the MCU, so there may be limitations.
- See also [boot mode pins](#boot-mode-pins), above, for other pins with special functions to be aware of.




### Custom expansion cards

{{imageOverlay src="/assets/images/m-series/muon-dims2.png" alt="Expansion card dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>

The expansion card is intended to be 65mm x 56mm and connects to the Muon using a 40-pin female socket (0.1" pitch, 2x20). The expansion card has a female socket on the bottom that mates with the male header pins on the top of the Muon. It's a "hat" configuration.

The sample design uses a PTH (through-hole) female socket for strength and to make it easier to assemble with SMD components on the top of the expansion card, but you can use a SMD header reflowed to bottom instead if you prefer.



#### Muon expansion interface 

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Pinout" class="full-width"}}


{{!-- 
Expansion card full pin details

BEGIN do not edit content below, it is automatically generated 7bdb0f44-3eb6-4e4a-89bb-14c9bb159cbd 

--}}



## Mechanical specifications

### Dimensions and Weight

To be provided at a later date.


### Mechanical drawing

To be provided at a later date.



## Schematics

**To be provided at a later date**


## Product Handling

### ESD Precautions
The M-SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an M-SoM without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the Particle M-SoM. ESD precautions should be implemented on the application board where the M-SoM is mounted. Failure to observe these precautions can result in severe damage to the M-SoM!

### Connectors

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The M.2 edge connector is static sensitive and should be handled carefully. The M.2 connector is not designed for repeated removal and insertion of the module.



---

## Default settings

The M-SoM comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.

---

## FCC ISED CE Warnings and End Product Labeling Requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:

* Contains FCC ID: xxx

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.


**Outdoor Use (US)**

To be compliant to FCC §15.407(a) the EIRP is not allowed to exceed 125 mW
(21 dBm) at any elevation angle above 30° (measured from the horizon) when operated as an
outdoor access point in U-NII-1 band, 5.150-5.250 GHz. 


---

**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:

 * Contains transmitter module ISED: 20127-M524
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.


**Outdoor use (CA)**

- Operation in the band 5150–5250 MHz is only for indoor use to reduce the potential for harmful
interference to co-channel mobile satellite systems;
- Operation in the 5600-5650 MHz band is not allowed in Canada. High-power radars are allocated
as primary users (i.e., priority users) of the bands 5250-5350 MHz and 5650-5850 MHz and that
these radars could cause interference and/or damage to LE-LAN devices.

---

- Le dispositif de fonctionnement dans la bande 5150-5250 MHz est réservé à une utilisation en
intérieur pour réduire le risque d'interférences nuisibles à la co-canal systèmes mobiles par
satellite
- Opération dans la bande 5600-5650 MHz n'est pas autorisée au Canada. Haute puissance radars
sont désignés comme utilisateurs principaux (c.-àutilisateurs prioritaires) des bandes 5250-5350
MHz et 5650-5850 MHz et que ces radars pourraient causer des interférences et / ou des
dommages à dispositifs LAN-EL.


### European Union (CE)

We, Particle Industries,Inc, declare under our sole responsibility that the product, P2, to which this declaration relates, is in conformity with RED Directive 2014/53/EU and (EU) 2015/863 RoHS Directive 2011/65/EU (Recast).

The full text of the EU declaration of conformity is available at the followingInternet address: 
[https://www.particle.io/](https://www.particle.io/)

Radiation Exposure Statement: This equipment complies with radiation exposure limits set forth for an uncontrolled environment.

The operating frequency bands and the maximum transmitted power limit are listed below:
- BLE 2402-2480MHz 10dBm
- Wi-Fi 2.4GHz band 2412-2484MHz 20dBm
- Wi-Fi 5GHz band 5180-5825MHz 23dBm

### United Kingdom

UKCA Conformity:

Radio Equipment Regulations 2017 (S.I. 2017/1206)

### Outdoor use (world)

This device is restricted to indoor use when operating in the 5150 to 5350
MHz frequency range. This restriction applies in: AT, BE, BG, CH, CY, CZ, DE,
DK, EE, EL, ES, FI, FR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO,
SE, SI, SK, TR, UA, UK(NI).

---



### MUON404 - Country compatibility


{{!-- BEGIN do not edit content below, it is automatically generated 291c6e45-3647-412b-8e38-47d29d5b4a83 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | M404 | 2G, M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | M404 | 2G, M1 | AT&T, Telcel |
| United States | M404 | 2G, M1 | Alaska Wireless, AT&T, T-Mobile (USA), Verizon<sup>7</sup> |


{{!-- END do not edit content above, it is automatically generated  --}}

The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations. See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.

### MUON404 - Certified bands

| Technology | Band | FCC | CE |
| :--- | :--- | :---: | :---: |
| 2G | 850 MHz | &check; | &nbsp; |
| 2G | 900 MHz | &nbsp; | &nbsp; |
| 2G | 1800 MHz | &nbsp; | &nbsp; |
| 2G | 1900 MHz | &check; | &nbsp; |
| LTE Cat M1 | B1 (2100 MHz) | | &check;|
| LTE Cat M1 | B2 (1900 MHz) | &check; | |
| LTE Cat M1 | B3 (1800 MHz) | | &check;|
| LTE Cat M1 | B4 (1700 MHz) | &check;| |
| LTE Cat M1 | B5 (850 MHz) | &check;| |
| LTE Cat M1 | B8 (900 MHz) | | &check;|
| LTE Cat M1 | B12 (700 MHz) | &check;| |
| LTE Cat M1 | B13 (700 MHz) | &check;| |
| LTE Cat M1 | B20 (800 MHz) | | &check;|
| LTE Cat M1 | B25 (1900 MHz) | &check;| |
| LTE Cat M1 | B26 (850 MHz) | &check;| |
| LTE Cat M1 | B28 (700 MHz) | | &check;|
| LTE Cat M1 | B66 (2100 MHz) | &check;| |



### MUON524 - Country compatibility


{{!-- BEGIN do not edit content below, it is automatically generated da2ba229-df4a-4df6-a0a5-d74444b8d5c1 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Albania | M524 | 2G, 3G, Cat1 | ALBtelecom, Telekom, Vodafone |
| Algeria | M524 | 2G, 3G, Cat1 | Mobilis, Ooredoo |
| Aruba | M524 | 2G, 3G, Cat1 | Setar |
| Australia | M524 | 3G, Cat1 | Optus, Telstra, Vodafone |
| Austria | M524 | 2G, 3G, Cat1 | 3 (Drei), A1, T-Mobile |
| Bahrain | M524 | 2G, 3G, Cat1 | Zain |
| Bangladesh | M524 | 2G, 3G, Cat1 | Bangalink, GrameenPhone |
| Belarus | M524 | 2G, 3G, Cat1 | A1 |
| Belgium | M524 | 2G, 3G, Cat1 | Base, Orange, Proximus |
| Bosnia and Herzegovina | M524 | 2G, 3G | BH Telecom, HT Eronet |
| Botswana | M524 | 2G, 3G, Cat1 | BeMobile |
| Brunei | M524 | 3G, Cat1 | DST |
| Bulgaria | M524 | 2G, 3G | A1, Telenor, Vivacom |
| Burkina Faso | M524 | 2G, 3G, Cat1 | Orange |
| Cabo Verde | M524 | 2G, 3G, Cat1 | CVMóvel, Unitel T+ |
| Cambodia | M524 | 2G, 3G | Metfone |
| Chad | M524 | 2G, 3G, Cat1 | Airtel |
| Chile | M524 | 2G, 3G, Cat1 | Claro, Entel, Movistar |
| Congo (Brazzaville) | M524 | 2G, 3G, Cat1 | Airtel |
| Congo (Kinshasa) | M524 | 2G, 3G, Cat1 | Airtel |
| Côte d'Ivoire | M524 | 2G, 3G, Cat1 | MTN |
| Croatia | M524 | 2G, 3G, Cat1 | Hrvatski Telekom, Tele2 |
| Cyprus | M524 | 2G, 3G, Cat1 | Cytamobile-Vodafone, MTN, PrimeTel |
| Czechia | M524 | 2G, Cat1 | O2, T-Mobile, Vodafone |
| Denmark | M524 | 2G, 3G, Cat1 | 3 (Tre), TDC, Telenor, Telia |
| Egypt | M524 | 2G, 3G, Cat1 | Etisalat, Orange |
| Estonia | M524 | 2G, 3G, Cat1 | Elisa, Tele2, Telia |
| eSwatini | M524 | 2G, 3G, Cat1 | MTN |
| Ethiopia | M524 | 2G, 3G, Cat1 | Ethio Telecom |
| Faroe Islands | M524 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | M524 | 2G, 3G, Cat1 | DNA, Elisa, Telia |
| France | M524 | 2G, 3G, Cat1 | Bouygues, Free Mobile, Orange, SFR |
| French Guiana | M524 | 2G, 3G | Digicel |
| Gabon | M524 | 2G, 3G, Cat1 | Airtel |
| Germany | M524 | 2G, 3G, Cat1 | O2, Telekom, Vodafone |
| Ghana | M524 | 2G, 3G, Cat1 | AirtelTigo, MTN, Vodafone |
| Gibraltar | M524 | 2G, 3G, Cat1 | Gibtel |
| Greece | M524 | 2G, Cat1 | Cosmote, Vodafone, Wind |
| Guinea | M524 | 2G, 3G, Cat1 | MTN |
| Guinea-Bissau | M524 | 2G, 3G, Cat1 | MTN |
| Guyana | M524 | 2G | Digicel |
| Hong Kong | M524 | 2G, 3G, Cat1 | CMHK, CSL, SmarTone |
| Hungary | M524 | 2G, 3G, Cat1 | Magyar Telekom, Telenor, Vodafone |
| Iceland | M524 | 2G, 3G, Cat1 | Nova, Siminn, Vodafone |
| Indonesia | M524 | 2G, 3G, Cat1 | Indosat, Telkomsel, XL Axiata |
| Ireland | M524 | 2G, 3G, Cat1 | 3 (Tre), Meteor, O2, Vodafone |
| Israel | M524 | 2G, 3G, Cat1 | Hot Mobile, Orange, Pelephone |
| Italy | M524 | 2G, 3G, Cat1 | TIM, Vodafone, Wind |
| Jordan | M524 | 2G, 3G, Cat1 | Zain |
| Kazakhstan | M524 | 2G, 3G, Cat1 | Beeline, K-Cell |
| Kenya | M524 | 2G, 3G, Cat1 | Airtel |
| Kuwait | M524 | 2G, 3G, Cat1 | Viva, Zain |
| Latvia | M524 | 2G, 3G, Cat1 | Bite, LMT, Tele2 |
| Liechtenstein | M524 | 2G, 3G, Cat1 | Mobilkom, Orange |
| Lithuania | M524 | 2G, 3G, Cat1 | Bite, Omnitel, Tele2 |
| Luxembourg | M524 | 2G, 3G, Cat1 | Orange, POST, Tango |
| Macao | M524 | 2G, 3G, Cat1 | CTM |
| Madagascar | M524 | 2G, 3G, Cat1 | Airtel |
| Malawi | M524 | 2G, 3G, Cat1 | Airtel |
| Malaysia | M524 | 2G, 3G, Cat1 | Celcom, DiGi, Maxis |
| Malta | M524 | 2G, 3G, Cat1 | Go Mobile, Vodafone |
| Moldova | M524 | 2G, 3G, Cat1 | Moldcell, Orange |
| Mongolia | M524 | 2G, 3G | Mobicom, Unitel |
| Montenegro | M524 | 2G, 3G, Cat1 | Mtel, T-Mobile, Telenor |
| Morocco | M524 | 2G, 3G, Cat1 | Inwi, Medi Telecom |
| Mozambique | M524 | 2G, 3G, Cat1 | Vodacom |
| Myanmar | M524 | 2G, 3G, Cat1 | MPT, Telenor |
| Namibia | M524 | 2G, 3G, Cat1 | Telecom Namibia |
| Netherlands | M524 | 2G, 3G, Cat1 | KPN, T-Mobile, Vodafone |
| New Zealand | M524 | 2G, 3G, Cat1 | 2degrees, Spark, Vodafone |
| Nigeria | M524 | 2G, 3G, Cat1 | 9mobile, Airtel, Glo, MTN |
| Norway | M524 | 2G, 3G, Cat1 | TDC, Telenor, Telia |
| Pakistan | M524 | 2G, 3G, Cat1 | Mobilink, Telenor, Ufone, Warid |
| Palestine | M524 | 2G, 3G | Jawwal |
| Papua New Guinea | M524 | 2G, 3G | bmobile |
| Poland | M524 | 2G, 3G, Cat1 | Orange, Play, Plus, T-Mobile |
| Portugal | M524 | 2G, 3G, Cat1 | NOS, TMN, Vodafone |
| Qatar | M524 | 2G, 3G, Cat1 | Ooredoo, Vodafone |
| Romania | M524 | 2G, 3G, Cat1 | Orange, Telekom Romania, Vodafone |
| Rwanda | M524 | 2G, 3G, Cat1 | Airtel, MTN |
| Serbia | M524 | 2G, 3G, Cat1 | Telenor, VIP |
| Seychelles | M524 | 2G, 3G, Cat1 | Airtel |
| Sint Maarten | M524 | 2G, 3G, Cat1 | TelCell |
| Slovakia | M524 | 2G, 3G, Cat1 | O2, Orange, Telekom |
| Slovenia | M524 | 2G, 3G, Cat1 | A1, Mobitel |
| South Africa | M524 | 2G, 3G, Cat1 | Cell C, MTN, Vodacom |
| South Korea | M524 | 3G, Cat1 | KT, LG U+, SK Telecom |
| South Sudan | M524 | 2G, 3G, Cat1 | MTN |
| Spain | M524 | 2G, 3G, Cat1 | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | M524 | 2G, 3G, Cat1 | Dialog, Mobitel |
| Suriname | M524 | 2G, 3G | Telesur |
| Sweden | M524 | 2G, 3G, Cat1 | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | M524 | 3G, Cat1 | Salt, Sunrise, Swisscom |
| Taiwan | M524 | 3G, Cat1 | Chunghwa, FarEasTone, T Star, Taiwan Mobile |
| Tanzania | M524 | 2G, 3G, Cat1 | Airtel |
| Thailand | M524 | 2G, 3G, Cat1 | AIS, DTAC, True Move |
| Tunisia | M524 | 2G, 3G, Cat1 | Orange Tunisie, Tunisie Telecom |
| Uganda | M524 | 2G, 3G, Cat1 | Africell, Airtel, MTN |
| United Kingdom | M524 | 2G, 3G, Cat1 | 3, EE, Manx, O2, Sure, Vodafone |
| Vietnam | M524 | 2G, 3G, Cat1 | MobiFone, Viettel, Vinaphone |
| Zambia | M524 | 2G, 3G, Cat1 | Airtel |


{{!-- END do not edit content above, it is automatically generated  --}}

### MUON524 - Certified bands

| Technology | Band | CE |
| :--- | :--- | :---: |
| 2G | 900 MHz | &check; |
| 2G | 1800 MHz | &check; |
| 3G | B1 (2100 MHz) | &check;|
| 3G | B8 (900 MHz) | &check;|
| LTE Cat 1 | B1 (2100 MHz) | &check;|
| LTE Cat 1 | B3 (1800 MHz) | &check;|
| LTE Cat 1 | B7 (2600 MHz) | &check;|
| LTE Cat 1 | B8 (900 MHz) | &check;|
| LTE Cat 1 | B20 (800 MHz) | &check;|
| LTE Cat 1 | B28 (700 MHz) | &check;|



### MUON635 - Country compatibility

Global, country list to be provided a later date.




---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated f4a91103-4428-4732-a1bc-83784f9bf207 --}}

| SKU | Description | Region  | Modem | EtherSIM| Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | In development | |
| MUON404KIT | Muon LTE M1/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | In development | |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | In development | |
| MUON524KIT | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | In development | |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |
| MUON635KIT | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-02-05 | RK | Preliminary version (schematic 0.02 20240203R6) |
|          | 2024-04-22 | RK | Update for schematic 0.3 |
|          | 2024-04-24 | RK | Update for schematic 0.3R2 |
|          | 2024-04-24 | RK | Expansion card interface updates |
|          | 2024-05-08 | RK | Update for schematic 0.4R2 |
|          | 2024-05-14 | RK | Update for schematic 0.4R4 |
|          | 2024-05-20 | RK | Update diagrams 0.4R4 |
|          | 2024-08-04 | RK | Pinmap 0.05 |


## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated f4a91103-4428-4732-a1bc-83784f9bf207 --}}

| SKU | Description | Region  | Modem | EtherSIM| Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | In development | |
| MUON404KIT | Muon LTE M1/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | In development | |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | In development | |
| MUON524KIT | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | In development | |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |
| MUON635KIT | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.
