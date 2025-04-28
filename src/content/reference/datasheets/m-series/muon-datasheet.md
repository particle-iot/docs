---
title: Muon datasheet
columns: two
layout: commonTwo.hbs
description: Muon datasheet
---

# Muon datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/muon-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

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

## Setup

It's strongly recommended that you initially set up your Muon using [setup.particle.io](https://setup.particle.io). In addition to
updating the Device OS software and activating your SIM card, it also enables `3V3_AUX` power.

{{box op="start" cssClass="boxed warningBox"}}
Muon features such as Ethernet, LoRA, QWIIC, and power on the 40-pin HAT connector default to off unless enabled during setup.
{{box op="end"}}

See [Power](#power), below, for additional information, including:

- Power adapter requirements
- How to enable `3V3_AUX` power when manually setting up devices, or when doing fleet setup

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

If you are migrating to the M-SoM from another Particle device, see also the following migration guide:

- [Muon from Argon or Boron](/hardware/migration-guides/muon-boron-migration-guide/)

### Features

{{imageOverlay src="/assets/images/m-series/muon-labeled-v1.0.png" alt="Features labeled" class="full-width"}}

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
| 16 | PoE HAT connector |

#### Feature (Bottom)

{{imageOverlay src="/assets/images/m-series/muon-bottom-labeled-v1.0.png" alt="Features labeled" class="full-width"}}

| Label | Feature |
| :---: | :--- |
|  20   | Expansion connector power jumper (J15) |
|  21   | Power module (PM-BAT) |


### Expansion connector

The Muon has a 40-pin (2x20) male header pin expansion connector on the top of the board, allowing the use of many 
Raspberry Pi-compatible "HAT" expansion cards that sit on top of the Muon. 

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
- Expansion card (HAT)
- PoE (with appropriate adapter)

#### USB-C cable warning

{{!-- BEGIN shared-blurb c3d00a89-9f50-4d63-bf29-c07645b09e8f --}}
You must use an actual USB-C port or USB-C power adapter to power the Muon by USB.

**A USB-A to USB-C cable will not power the Muon or charge the battery**

The reason is that the Muon uses USB-C PD to change the USB port voltage to 9V and request enough
current to power the Muon. 

When using a USB-2 or USB-3 port with USB-A to USB-C adapter cable, the USB port voltage cannot
be changed and the port will not be able to power the Muon.

Also beware of some wall adapters that have a USB-C cable, but do not support USB-C PD. Some
of these are advertised as Raspberry Pi power adapters, which only support 5V and cannot be used
to power the Muon.

See [Muon USB Power](/troubleshooting/guides/device-troubleshooting/muon-usb-power/) for more information.
{{!-- END shared-blurb --}}

#### Expansion and peripheral power

The onboard peripherals including Ethernet, the LoRa radio, QWIIC, and the expansion HAT connector are powered by the
3V3_AUX power supply.

If you use [setup.particle.io](https://setup.particle.io/) to set up your Muon, 3V3_AUX will be set up
automatically. 

If you want to do it manually, the see the section [Firmware settings](#firmware-settings), below, 
for the sample code and the technical reasons why it is necessary.


#### Expansion card power

A jumper located on the bottom side of the Muon selects the direction of expansion card (HAT) 5V power (label 20, above).

- Connecting `5V_IN` and center pin: Expansion card powers the Muon (typically from PoE) 
- Connecting `5V_OUT` and center pin: The Muon powers expansion card (from USB-C, USB, or LiPo)

{{imageOverlay src="/assets/images/m-series/muon-5v-jumper.jpg" alt="5V Jumper"}}

#### PoE power

The Muon itself does not contain PoE (power over Ethernet, IEEE 802.3af/at) circuitry. It does, however, have a Raspberry Pi 5-compatible
4 pin header located next to the Ethernet jack (label 16, above). 

This allows a PoE HAT to get power from the Ethernet jack, convert it to 5VDC 2A (minimum), and supply it to the Muon via the expansion connection 5V.

This is one such adapter, made by [Waveshare](https://www.waveshare.com/product/raspberry-pi/hats/interface-power/poe-hat-g.htm).

![PoE HAT](/assets/images/m-series/waveshare-poe-hat.png)

Be sure the J15 jumper is connecting pins 1 & 2 to allow the expansion connector 5V to power the Muon.

**Make sure you get a PoE adapter for the Raspberry Pi 5**

On all Raspberry Pi models with PoE support, there is a 4-pin plug next to the RJ45 Ethernet jack. However,
on the Raspberry Pi 5 the Ethernet jack was moved to the other side of the board. This is the location where
the Ethernet jack is on the Muon, as well.

If your PoE adapter has the 4-pin power jack is next to the 40-pin expansion header, you have the wrong adapter 
and it will not fit on the Muon.

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

### Approved Antennas


### Certified cellular antennas

The M-SoM is certified with the following cellular antenna:

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


| Parameter | 700/850/900 | 1700/1800/1900 | 2100 | 2400 | 2600 | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Peak gain | | | | | | | |
| PARANTCW1EA | 2.8 | 5.3 | 5.3 | 5.3 | 5.3 | dBi |
{{!-- END shared-blurb --}}


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

- GNSS support will be added in a future version of Device OS. A [user firmware library](https://github.com/particle-iot/particle-som-gnss) is available now for the M404.
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
| 0x28 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x61 | KG200Z LoRaWAN radio |
| 0x69 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
{{!-- END shared-blurb --}}


## Pin information


### Pinout diagram

The Muon has 40-pin expansion connector mounted on the top of the board.

- 2x20 pins
- 0.1" (2.54mm) pitch in both directions
- Male header pins on top of the board
- Generally compatible with Raspberry Pi expansion connector

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Pinout" class="full-width"}}

<p class="attribution">The red columns are the Raspberry Pi pin names. The gray columns are the schematic net names.</p>

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
| D6 | 12 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] | GPIO18 (PCM_CLK) |
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
| 12 | D6 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] | GPIO18 (PCM_CLK) |
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
| GPIO18 (PCM_CLK) | D6 | 12 | I2S CLK | Wire1 (SCL) | &nbsp; | &nbsp; | &check; | PB[20] |
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
| 12 | D6 | &check; | PB[20] | &nbsp; | GPIO18 (PCM_CLK) |
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
| D8 | I/O Expander INT | 48 | M2_D8/IOEX_INT |
| D22 | I/O Expander Reset | 62 | M2_D22 |
| D23 | I/O Expander CS | 64 | M2_D23_IOEX_CS |
| D7 | 3V3_AUX and 5V power enable | 72 | D7_AUX_POWER_EN |


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

The LoRaWAN radio is normally communicated to via I2C. There is a GPIO controlled switch that 
connects the MCU Serial1 port to either the expansion connector (the default state), or to
the LoRaWAN radio. The latter is only used for reprogramming the radio software from the main MCU.


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
| 12 | D6 | D6 GPIO, PWM, I2S CLK | Wire1 (SCL) | 70 | PB[20] | GPIO18 (PCM_CLK) |


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
| 0x28 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x61 | KG200Z LoRaWAN radio |
| 0x69 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
{{!-- END shared-blurb --}}




### PWM

{{imageOverlay src="/assets/images/m-series/muon-pwm.svg" alt="GPIO pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 0e2ce92a-0155-43c6-b496-e30bafeb33e4 --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | 36 | PA[12] | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | 38 | PA[13] | GPIO15 (RXD) |
| 12 | D6 | D6 GPIO, PWM, I2S CLK | 70 | PB[20] | GPIO18 (PCM_CLK) |
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
| 12 | D6 | D6 GPIO, PWM, I2S CLK | 70 | PB[20] | GPIO18 (PCM_CLK) |
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
| 12 | D6 | D6 GPIO, PWM, I2S CLK | CLK | 70 | PB[20] | GPIO18 (PCM_CLK) |
| 35 | D26 | D26 GPIO, I2S WS | PCM_FS | 59 | PA[4] | GPIO19 (PCM_FS) |
| 38 | D21 | D21 GPIO, I2S RX | PCM_DIN | 17 | PA[0] | GPIO20 (PCM_DIN) |
| 40 | D20 | D20 GPIO, I2S TX | PCM_DOUT | 19 | PA[1] | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

PDM cannot be used on Muon expansion cards as the M-SoM PDM pins (A2, A3) are used for internal peripherals and are not available on the expansion connector.


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

The Muon/M-SoM can only wake from `HIBERNATE` sleep mode on on certain pins, `RISING`, `FALLING`, or `CHANGE`.

The Muon/M-SoM preserves the state of outputs during `STOP` or `ULTRA_LOW_POWER` sleep mode. In `HIBERNATE`, outputs are high-impedance.

{{!-- BEGIN do not edit content below, it is automatically generated 2629e77b-eb69-4f63-8f0e-011032c72782 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Pin can wake from HIBERNATE sleep | 36 | PA[12] |
| 10 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Pin can wake from HIBERNATE sleep | 38 | PA[13] |
| 11 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Pin can wake from HIBERNATE sleep | 42 | PA[14] |
| 36 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Pin can wake from HIBERNATE sleep | 40 | PA[15] |


{{!-- END do not edit content above, it is automatically generated  --}}

Most pins can use `INPUT_PULLUP` or `INPUT_PULLDOWN` in sleep modes. The exception is `HIBERNATE` sleep mode where pin D21 can only use an external hardware pull-up or pull down. These pins also cannot be used to wake from hibernate sleep mode.

{{!-- BEGIN do not edit content below, it is automatically generated ecbef542-699d-4e47-bf18-b4568b48c0c7 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 38 | D21 | D21 GPIO, I2S RX | No internal pull up or pull down in HIBERNATE sleep mode. | 17 | PA[0] |


{{!-- END do not edit content above, it is automatically generated  --}}





## Firmware settings

{{!-- BEGIN shared-blurb 634b391d-826b-47e1-b680-fba6e5ee22dc --}}
Devices using the [Particle Power Module](/hardware/power/pm-bat-datasheet/) include a `3V3_AUX` power output
that can be controlled by a GPIO. On the M.2 SoM breakout board, this powers the Feather connector. On the Muon,
it powers the Ethernet port, LoRaWAN module, 40-pin expansion HAT connector, and QWIIC connector.

The main reason for this is that until the PMIC is configured, the input current with no battery
connected is limited to 100 mA. This is insufficient for the M-SoM to boot when 
using a peripheral that requires a lot of current, like the WIZnet W5500 Ethernet module. The 
system power manager prevents turning on `3V3_AUX` until after the PMIC is configured
and the PMIC has negotiated a higher current from the USB host (if powered by USB).

This setting is persistent and only needs to be set once. In fact, the PMIC initialization
normally occurs before user firmware is run. This is also necessary because if you are using Ethernet
and enter safe mode (breathing magenta), it's necessary to enable `3V3_AUX` so if you are using
Ethernet, you can still get OTA updates while in safe mode.

After changing the auxiliary power configuration you must reset the device.
{{!-- END shared-blurb --}}

The following code can be used to enable Ethernet on the M.2 SoM breakout board. This only needs to be done
once and the device must be reset after configuration for the changes to take effect.  It requires Device OS 5.9.0 or later.

```cpp
// Enable 3V3_AUX
SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
System.setPowerConfiguration(powerConfig);

// Enable Ethernet
if_wiznet_pin_remap remap = {};
remap.base.type = IF_WIZNET_DRIVER_SPECIFIC_PIN_REMAP;

System.enableFeature(FEATURE_ETHERNET_DETECTION);
remap.cs_pin = D5;
remap.reset_pin = PIN_INVALID;
remap.int_pin = PIN_INVALID;
auto ret = if_request(nullptr, IF_REQ_DRIVER_SPECIFIC, &remap, sizeof(remap), nullptr);
```

If you are not using Ethernet and wish to manage the 3V3_AUX power manually from your firmware,
you can set the `auxiliaryPowerControlPin` to `PIN_INVALID` and reset the device. It will then no longer
turn on at boot.

```cpp
// Manual management of 3V3_AUX
SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
powerConfig.auxiliaryPowerControlPin(PIN_INVALID).interruptPin(A7);
System.setPowerConfiguration(powerConfig);
```

To control `3V3_AUX` manually from your firmware, use `pinMode(D7, OUTPUT)` in `setup()`. Use
`digitalWrite(D7, 1)` to turn `3V3_AUX` on and `digitalWrite(D7, 0)` to turn it off.

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
- Raspberry Pi HATs
- Dupont wires or ribbon cables to a solderless breadboard
- A custom expansion card that sits on top of the Muon

### Raspberry Pi HATs

The Muon can be used with some Raspberry Pi expansion cards ("HATs") that sit on top of a Raspberry Pi. Note, however, that are limitations:

- Since the Muon is not a Raspberry Pi, even though the hardware fits, there may not be suitable software to use it.
- The Pi HAT cannot be used to power the Muon.
- Some pins have limitations.

See [Muon HATs](/hardware/muon-hats/muon-hats/) for more information.


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
| 12 | GPIO18 (PCM_CLK) | D6 | D6 GPIO, PWM, I2S CLK | &nbsp; | &nbsp; | Wire1 (SCL) | I2S CLK |
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

The expansion card is intended to be 65mm x 56mm and connects to the Muon using a 40-pin female socket (0.1" pitch, 2x20). The expansion card has a female socket on the bottom that mates with the male header pins on the top of the Muon. It's a "HAT" configuration.

The sample design uses a PTH (through-hole) female socket for strength and to make it easier to assemble with SMD components on the top of the expansion card, but you can use a SMD header reflowed to bottom instead if you prefer.



#### Muon expansion interface 

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Pinout" class="full-width"}}


### Expansion card full pin details

This section is very long; you can [skip over it](#schematics) if desired.

{{!-- BEGIN do not edit content below, it is automatically generated 7bdb0f44-3eb6-4e4a-89bb-14c9bb159cbd --}}


#### 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">3.3V power to expansion card</td></tr>
</tbody>
</table>

#### 5V

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">5V</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">5V power to expansion card</td></tr>
</tbody>
</table>

#### A0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A0 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">42K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[4]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">23</td></tr>
</tbody>
</table>

#### A1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A1 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI2 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[5]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">33</td></tr>
</tbody>
</table>

#### A2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A2 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI2 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">22K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[6]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">35</td></tr>
</tbody>
</table>

#### A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, PWM, GPIO, shared with pin 53</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SWD interface</td><td class="" style="text-align: left; ">SWCLK. 40K pull-down at boot.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Signal used at boot</td><td class="" style="text-align: left; ">SWCLK. 40K pull-down at boot.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[3]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">43</td></tr>
</tbody>
</table>

#### A6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D29</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A6 Analog in, GPIO, PWM, M.2 eval PMIC INT</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[7]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">45</td></tr>
</tbody>
</table>

#### D0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D0 GPIO, I2C SDA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[0]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">22</td></tr>
</tbody>
</table>

#### D1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D1 GPIO, I2C SCL</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[31]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">20</td></tr>
</tbody>
</table>

#### D2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D2 GPIO, Serial RTS flow control (optional), SPI1 SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[14]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">42</td></tr>
</tbody>
</table>

#### D3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">CTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[15]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">40</td></tr>
</tbody>
</table>

#### D4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D4 GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[18]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">66</td></tr>
</tbody>
</table>

#### D5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D5 GPIO, PWM, I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[19]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">68</td></tr>
</tbody>
</table>

#### D6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D6 GPIO, PWM, I2S CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire1 object. Use 1.5K to 10K external pull-up resistor.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PB[20]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">70</td></tr>
</tbody>
</table>

#### D20

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D20 GPIO, I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[1]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">19</td></tr>
</tbody>
</table>

#### D21

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D21</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D21 GPIO, I2S RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">22K. No internal pull up or pull down in HIBERNATE sleep mode.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[0]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">17</td></tr>
</tbody>
</table>

#### D22

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D22 GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[9]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">62</td></tr>
</tbody>
</table>

#### D24

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D24</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D24 GPIO, Serial2 TX, do not pull down at boot</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial2 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">42K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Signal used at boot</td><td class="" style="text-align: left; ">Low at boot triggers ISP flash download</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[7]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">58</td></tr>
</tbody>
</table>

#### D25

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D25</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO25, Serial2 RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RX. Use Serial2 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">42K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Signal used at boot</td><td class="" style="text-align: left; ">Goes high at boot</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[8]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">60</td></tr>
</tbody>
</table>

#### D26

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D26</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D26 GPIO, I2S WS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S WS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">???</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[4]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">59</td></tr>
</tbody>
</table>

#### D27

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">42K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SWD interface</td><td class="" style="text-align: left; ">SWDIO. 40K pull-up at boot.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Signal used at boot</td><td class="" style="text-align: left; ">SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[27]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">55</td></tr>
</tbody>
</table>

#### GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground</td></tr>
</tbody>
</table>

#### IOEX_PA0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">IOEX_PA0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### IOEX_PB7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">IOEX_PB7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### MISO

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D11 GPIO, PWM, SPI MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[17]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">50</td></tr>
</tbody>
</table>

#### MOSI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D12 GPIO, PWM, SPI MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[16]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">52</td></tr>
</tbody>
</table>

#### NC27

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC27</td></tr>
</tbody>
</table>

#### NC28

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC28</td></tr>
</tbody>
</table>

#### RX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial RX, PWM, GPIO, SPI1 MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[13]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">38</td></tr>
</tbody>
</table>

#### SCK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D13 GPIO, SPI SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[18]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">54</td></tr>
</tbody>
</table>

#### TX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S MCLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">2.1K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">PA[12]</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">36</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}


## Mechanical specifications

### Dimensions and Weight

Overall dimensions are 56mm x 84.8mm (2.2" x 3.34").

{{imageOverlay src="/assets/images/m-series/muon-dims.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>

- Weight: 50g (with SoM and thumbscrew)
- Height: 20mm


## Schematics

### Schematics page 2
{{imageOverlay src="/assets/images/m-series/muon_v1.0_p2.svg" alt="Schematics" class="full-width"}}

### Schematics page 3
{{imageOverlay src="/assets/images/m-series/muon_v1.0_p3.svg" alt="Schematics" class="full-width"}}

### Schematics page 4
{{imageOverlay src="/assets/images/m-series/muon_v1.0_p4.svg" alt="Schematics" class="full-width"}}

### Schematics page 5
{{imageOverlay src="/assets/images/m-series/muon_v1.0_p5.svg" alt="Schematics" class="full-width"}}

### Schematics page 6
{{imageOverlay src="/assets/images/m-series/muon_v1.0_p6.svg" alt="Schematics" class="full-width"}}




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

### RoHS

- [RoHS 3.0 Test Report](/assets/pdfs/muon-rohs.pdf)


### MUON404 - Country compatibility


{{!-- BEGIN do not edit content below, it is automatically generated 291c6e45-3647-412b-8e38-47d29d5b4a83 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | M404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | M404 | M1 | AT&T, Telcel |
| United States | M404 | M1 | AT&T, T-Mobile (USA), Verizon<sup>7</sup> |


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
| Albania | M524 | 2G, 3G, 4G | Eagle, Telekom, Vodafone |
| Algeria | M524 | 2G, 3G, 4G | Mobilis, Ooredoo |
| Aruba | M524 | 2G, 3G, 4G | Setar |
| Australia | M524 | 4G | Optus, Telstra, Vodafone |
| Austria | M524 | 2G, 3G, 4G | 3 (Drei), A1, T-Mobile |
| Bahrain | M524 | 2G, 4G | Zain |
| Bangladesh | M524 | 2G, 3G, 4G | Bangalink, GrameenPhone |
| Belarus | M524 | 2G, 3G, 4G | A1 |
| Belgium | M524 | 2G, 3G, 4G | Base, Orange, Proximus |
| Bosnia and Herzegovina | M524 | 2G, 3G | BH Telecom, HT Eronet |
| Botswana | M524 | 2G, 3G, 4G | BeMobile |
| Brunei | M524 | 3G, 4G | DST |
| Bulgaria | M524 | 2G, 3G | A1, Telenor, Vivacom |
| Burkina Faso | M524 | 2G, 3G, 4G | Orange |
| Cabo Verde | M524 | 2G, 3G, 4G | CVMóvel, Unitel T+ |
| Cambodia | M524 | 2G, 3G | Metfone |
| Chad | M524 | 2G, 3G, 4G | Airtel |
| Chile | M524 | 3G, 4G | Claro, Entel, Movistar |
| Congo (Brazzaville) | M524 | 2G, 3G, 4G | Airtel |
| Congo (Kinshasa) | M524 | 2G, 3G, 4G | Airtel |
| Côte d'Ivoire | M524 | 2G, 3G | MTN |
| Croatia | M524 | 2G, 3G, 4G | Hrvatski Telekom, Tele2 |
| Cyprus | M524 | 2G, 3G, 4G | Cytamobile-Vodafone, MTN, PrimeTel |
| Czechia | M524 | 2G, 4G | O2, T-Mobile, Vodafone |
| Denmark | M524 | 2G, 3G, 4G | 3 (Tre), TDC, Telenor, Telia |
| Egypt | M524 | 2G, 3G, 4G | Etisalat, Orange |
| Estonia | M524 | 2G, 3G, 4G | Elisa, Tele2, Telia |
| eSwatini | M524 | 2G, 3G, 4G | MTN |
| Ethiopia | M524 | 2G, 3G, 4G | Ethio Telecom |
| Faroe Islands | M524 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | M524 | 2G, 4G | DNA, Elisa, Telia |
| France | M524 | 2G, 3G, 4G | Bouygues, Free Mobile, Orange, SFR |
| French Guiana | M524 | 2G, 3G | Digicel |
| Gabon | M524 | 2G, 3G, 4G | Airtel |
| Germany | M524 | 2G, 3G, 4G | O2, Telekom, Vodafone |
| Ghana | M524 | 2G, 3G, 4G | AirtelTigo, MTN, Vodafone |
| Gibraltar | M524 | 2G, 3G, 4G | Gibtel |
| Greece | M524 | 2G, 4G | Cosmote, Vodafone, Wind |
| Guinea | M524 | 2G, 3G, 4G | MTN |
| Guinea-Bissau | M524 | 2G, 3G, 4G | MTN |
| Guyana | M524 | 2G | Digicel |
| Hong Kong | M524 | 2G, 3G, 4G | CMHK, CSL, SmarTone |
| Hungary | M524 | 2G, 3G, 4G | Magyar Telekom, Telenor, Vodafone |
| Iceland | M524 | 2G, 3G, 4G | Nova, Siminn, Vodafone |
| Indonesia | M524 | 2G, 3G, 4G | Indosat, Telkomsel, XL Axiata |
| Ireland | M524 | 2G, 3G, 4G | 3 (Tre), Meteor, O2, Vodafone |
| Israel | M524 | 2G, 3G, 4G | Hot Mobile, Orange, Pelephone |
| Italy | M524 | 2G, 3G, 4G | TIM, Vodafone, Wind |
| Jordan | M524 | 2G, 3G, 4G | Zain |
| Kazakhstan | M524 | 2G, 3G, 4G | Beeline, K-Cell |
| Kenya | M524 | 2G, 3G, 4G | Airtel |
| Kuwait | M524 | 2G, 3G, 4G | Viva, Zain |
| Latvia | M524 | 2G, 3G, 4G | Bite, LMT, Tele2 |
| Liechtenstein | M524 | 2G, 3G, 4G | Mobilkom, Orange |
| Lithuania | M524 | 2G, 3G, 4G | Bite, Omnitel, Tele2 |
| Luxembourg | M524 | 2G, 3G, 4G | Orange, POST, Tango |
| Macao | M524 | 3G, 4G | CTM |
| Madagascar | M524 | 2G, 3G, 4G | Airtel |
| Malawi | M524 | 2G, 3G, 4G | Airtel |
| Malaysia | M524 | 2G, 3G, 4G | Celcom, DiGi, Maxis |
| Malta | M524 | 2G, 3G, 4G | Go Mobile, Vodafone |
| Moldova | M524 | 2G, 3G, 4G | Moldcell, Orange |
| Mongolia | M524 | 2G, 3G | Mobicom, Unitel |
| Montenegro | M524 | 2G, 3G, 4G | Mtel, T-Mobile, Telenor |
| Morocco | M524 | 2G, 3G, 4G | Inwi, Medi Telecom |
| Mozambique | M524 | 2G, 3G, 4G | Vodacom |
| Myanmar | M524 | 2G, 3G | MPT, Telenor |
| Namibia | M524 | 2G, 3G, 4G | Telecom Namibia |
| Netherlands | M524 | 2G, 3G, 4G | KPN, T-Mobile, Vodafone |
| New Zealand | M524 | 2G, 3G, 4G | 2degrees, Spark, Vodafone |
| Nigeria | M524 | 2G, 3G, 4G | 9mobile, Airtel, Glo, MTN |
| Norway | M524 | 2G, 3G, 4G | TDC, Telenor, Telia |
| Pakistan | M524 | 2G, 3G, 4G | Mobilink, Telenor, Ufone, Warid |
| Palestine | M524 | 2G, 3G | Jawwal |
| Papua New Guinea | M524 | 2G, 3G | bmobile |
| Poland | M524 | 2G, 3G, 4G | Orange, Play, Plus, T-Mobile |
| Portugal | M524 | 2G, 3G, 4G | NOS, TMN, Vodafone |
| Qatar | M524 | 2G, 3G, 4G | Ooredoo, Vodafone |
| Romania | M524 | 2G, 3G, 4G | Orange, Telekom Romania, Vodafone |
| Rwanda | M524 | 2G, 3G | Airtel, MTN |
| Serbia | M524 | 2G, 3G, 4G | Telenor, VIP |
| Seychelles | M524 | 2G, 3G, 4G | Airtel |
| Sint Maarten | M524 | 2G, 3G | TelCell |
| Slovakia | M524 | 2G, 4G | O2, Orange, Telekom |
| Slovenia | M524 | 2G, 3G, 4G | A1, Mobitel |
| South Africa | M524 | 2G, 3G, 4G | Cell C, MTN, Vodacom |
| South Korea | M524 | 3G, 4G | KT, LG U+, SK Telecom |
| South Sudan | M524 | 2G, 3G | MTN |
| Spain | M524 | 2G, 3G, 4G | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | M524 | 2G, 3G, 4G | Dialog, Mobitel |
| Suriname | M524 | 2G, 3G | Telesur |
| Sweden | M524 | 2G, 3G, 4G | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | M524 | 3G, 4G | Salt, Sunrise, Swisscom |
| Taiwan | M524 | 3G, 4G | Chunghwa, FarEasTone, T Star, Taiwan Mobile |
| Tanzania | M524 | 2G, 3G, 4G | Airtel |
| Thailand | M524 | 2G, 3G, 4G | AIS, DTAC, True Move |
| Tunisia | M524 | 2G, 3G, 4G | Orange Tunisie, Tunisie Telecom |
| Uganda | M524 | 2G, 3G, 4G | Africell, Airtel, MTN |
| United Kingdom | M524 | 2G, 3G, 4G | 3, EE, Manx, O2, Sure, Vodafone |
| Vietnam | M524 | 2G, 3G, 4G | MobiFone, Viettel, Vinaphone |
| Zambia | M524 | 2G, 3G, 4G | Airtel |


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

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | GA | |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | GA | |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


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
|          | 2024-09-24 | RK | Removed concurrent GNSS warning, added link to library |
|   1      | 2024-10-08 | RK | Update for schematic v1.0 |
|   2      | 2024-10-22 | RK | Public release|
|   3      | 2025-01-02 | RK | Wrong pin listed for the power manager interrupt pin; it is A7, not A6 |
|   4      | 2025-02-11 | RK | Added height and weight |
