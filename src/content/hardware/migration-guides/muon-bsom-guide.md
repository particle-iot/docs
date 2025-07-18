---
title: Muon with B-SoM guide
columns: two
layout: commonTwo.hbs
description: Guide for using the Muon with the B-SoM
---

# Muon datasheet

## Overview

The Muon is a developer kit with additional peripherals for easy prototyping:

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

It is typically used with the M-SoM, but can be used with the B-SoM with some limitations.

### B-SoM

The B-SoM includes only cellular (not Wi-Fi or satellite). It uses the same M.2 NGFF socket as the M-SoM, though there are some minor differences because of the use of different MCUs (Realtek RTL8722 in M-SoM and Nordic nRF52840 in B-SoM).

- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B504 datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)

{{!-- BEGIN do not edit content below, it is automatically generated 90b7bedb-725d-410a-b299-a217829b336c --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | GA |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |


{{!-- END do not edit content above, it is automatically generated --}}

![B-SoM](/assets/images/b-series/b404x-iso.png)

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

Be sure the J15 jumper is connecting pins 1 & 2 to allow the expansion connector 5V to power the Muon.

**Make sure you get a PoE adapter for the Raspberry Pi 5**

On all Raspberry Pi models with PoE support, there is a 4-pin plug next to the RJ45 Ethernet jack. However,
on the Raspberry Pi 5 the Ethernet jack was moved to the other side of the board. This is the location where
the Ethernet jack is on the Muon, as well.

If your PoE adapter has the 4-pin power jack is next to the 40-pin expansion header, you have the wrong adapter 
and it will not fit on the Muon.

Not all PoE HATs for the Raspberry Pi 5 fit! The [Waveshare (G)](https://www.waveshare.com/product/raspberry-pi/hats/interface-power/poe-hat-g.htm) does not fit as there are components on the bottom that interfere when seated flush against the Muon. Some PoE HATs include optional header extensions should allow them to fit.


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

See the datasheet for the particular B-SoM you will be using.

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

The Muon

Muon has a Particle-standard 10-pin 2x5 SWD debugging connector. This interface can be used to debug your code or reprogram your bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" class="small"></div>

On the M-SoM, SWD is shared with GPIO pins  so by default once user firmware boots, SWD is no longer available. 

On the B-SoM, SWD is on separate pins and continues to run by default.

## Pin information


### Pinout diagram

The Muon has 40-pin expansion connector mounted on the top of the board.

- 2x20 pins
- 0.1" (2.54mm) pitch in both directions
- Male header pins on top of the board
- Generally compatible with Raspberry Pi expansion connector

{{imageOverlay src="/assets/images/muon-b/muon-b-desc.svg" alt="Pinout" class="full-width"}}

<p class="attribution">The red columns are the Raspberry Pi pin names. The gray columns are the schematic net names.</p>

### Pin function by Particle pin name

{{!-- BEGIN do not edit content below, it is automatically generated b62524a7-55e8-4791-b0fb-0c4631361046 --}}

| Pin Name | Module Pin |   |   |   |   | PWM | MCU | Raspberry Pi |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| A0 / D19 | 29 | ADC1 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.03 | GPIO5 |
| A1 / D18 | 31 | ADC2 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.04 | GPIO6 |
| A2 / D17 | 26 | ADC4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.28 | GPIO7 (CE1) |
| A5 / D14 | 13 | ADC7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.31 | GPIO27 |
| A6 / D29 | 24 | ADC3 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.05 | GPIO8 (CE0) |
| D0 | 3 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | P0.26 | GPIO2 (SDA) |
| D1 | 5 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | P0.27 | GPIO3 (SCL) |
| D2 | 11 | &nbsp; | Wire1 (SDA) | SPI1 (SCK) | Serial1 RTS | &nbsp; | P1.02 | GPIO17 |
| D3 | 36 | &nbsp; | Wire1 (SCL) | SPI1 (MOSI) | Serial1 CTS | &nbsp; | P1.01 | GPIO16 |
| D4 | 33 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | P1.08 | GPIO13 (PWM1) |
| D5 | 32 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | P1.10 | GPIO12 (PWM0) |
| D6 | 12 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.11 | GPIO18 (PCM_CLK) |
| D22 | 22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.24 | GPIO25 |
| MISO / D11 | 21 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; | P1.14 | GPIO9 (MISO) |
| MOSI / D12 | 19 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; | P1.13 | GPIO10 (MOSI) |
| NFC1 | 38 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.09 | GPIO20 (PCM_DIN) |
| NFC2 | 40 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.10 | GPIO21 (PCM_DOUT) |
| RX / D10 | 10 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | &nbsp; | P0.08 | GPIO15 (RXD) |
| SCK / D13 | 23 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | P1.15 | GPIO11 (SCLK) |
| TX / D9 | 8 | I2S MCLK | &nbsp; | &nbsp; | Serial1 TX | &nbsp; | P0.06 | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin function by pin number


{{!-- BEGIN do not edit content below, it is automatically generated 5010b500-f223-4d90-9248-6c69813167ca --}}

| Module Pin | Pin Name |   |   |   |   | PWM | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| 3 | D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | P0.26 | GPIO2 (SDA) |
| 5 | D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | P0.27 | GPIO3 (SCL) |
| 7 | IOEX_PA0 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO4 (GPCKL0) |
| 8 | TX / D9 | I2S MCLK | &nbsp; | &nbsp; | Serial1 TX | &nbsp; | P0.06 | GPIO14 (TXD) |
| 10 | RX / D10 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | &nbsp; | P0.08 | GPIO15 (RXD) |
| 11 | D2 | &nbsp; | Wire1 (SDA) | SPI1 (SCK) | Serial1 RTS | &nbsp; | P1.02 | GPIO17 |
| 12 | D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.11 | GPIO18 (PCM_CLK) |
| 13 | A5 / D14 | ADC7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.31 | GPIO27 |
| 15 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO22 |
| 16 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO23 |
| 18 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO24 |
| 19 | MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; | P1.13 | GPIO10 (MOSI) |
| 21 | MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; | P1.14 | GPIO9 (MISO) |
| 22 | D22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.24 | GPIO25 |
| 23 | SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | P1.15 | GPIO11 (SCLK) |
| 24 | A6 / D29 | ADC3 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.05 | GPIO8 (CE0) |
| 26 | A2 / D17 | ADC4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.28 | GPIO7 (CE1) |
| 27 | NC27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO0 (ID_SD) |
| 28 | NC28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO1 (ID_SC) |
| 29 | A0 / D19 | ADC1 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.03 | GPIO5 |
| 31 | A1 / D18 | ADC2 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.04 | GPIO6 |
| 32 | D5 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | P1.10 | GPIO12 (PWM0) |
| 33 | D4 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | P1.08 | GPIO13 (PWM1) |
| 35 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO19 (PCM_FS) |
| 36 | D3 | &nbsp; | Wire1 (SCL) | SPI1 (MOSI) | Serial1 CTS | &nbsp; | P1.01 | GPIO16 |
| 37 | IOEX_PB7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | GPIO26 |
| 38 | NFC1 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.09 | GPIO20 (PCM_DIN) |
| 40 | NFC2 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.10 | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin function by Raspberry Pi GPIO Number

{{!-- BEGIN do not edit content below, it is automatically generated 15e7c51d-1b86-4618-b5ac-06e155344875 --}}

| Raspberry Pi | Pin Name | Module Pin |   |   |   |   | PWM | MCU |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| GPIO0 (ID_SD) | NC27 | 27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO1 (ID_SC) | NC28 | 28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO2 (SDA) | D0 | 3 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | P0.26 |
| GPIO3 (SCL) | D1 | 5 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | P0.27 |
| GPIO4 (GPCKL0) | IOEX_PA0 | 7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO5 | A0 / D19 | 29 | ADC1 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.03 |
| GPIO6 | A1 / D18 | 31 | ADC2 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.04 |
| GPIO7 (CE1) | A2 / D17 | 26 | ADC4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.28 |
| GPIO8 (CE0) | A6 / D29 | 24 | ADC3 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.05 |
| GPIO9 (MISO) | MISO / D11 | 21 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; | P1.14 |
| GPIO10 (MOSI) | MOSI / D12 | 19 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; | P1.13 |
| GPIO11 (SCLK) | SCK / D13 | 23 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | P1.15 |
| GPIO12 (PWM0) | D5 | 32 | I2S TX | &nbsp; | &nbsp; | &nbsp; | &check; | P1.10 |
| GPIO13 (PWM1) | D4 | 33 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | P1.08 |
| GPIO14 (TXD) | TX / D9 | 8 | I2S MCLK | &nbsp; | &nbsp; | Serial1 TX | &nbsp; | P0.06 |
| GPIO15 (RXD) | RX / D10 | 10 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | &nbsp; | P0.08 |
| GPIO16 | D3 | 36 | &nbsp; | Wire1 (SCL) | SPI1 (MOSI) | Serial1 CTS | &nbsp; | P1.01 |
| GPIO17 | D2 | 11 | &nbsp; | Wire1 (SDA) | SPI1 (SCK) | Serial1 RTS | &nbsp; | P1.02 |
| GPIO18 (PCM_CLK) | D6 | 12 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.11 |
| GPIO19 (PCM_FS) | NC | 35 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO20 (PCM_DIN) | NFC1 | 38 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.09 |
| GPIO21 (PCM_DOUT) | NFC2 | 40 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.10 |
| GPIO22 | NC | 15 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO23 | NC | 16 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO24 | NC | 18 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO25 | D22 | 22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.24 |
| GPIO26 | IOEX_PB7 | 37 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| GPIO27 | A5 / D14 | 13 | ADC7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.31 |


{{!-- END do not edit content above, it is automatically generated--}}




### GPIO (Digital I/O)

{{imageOverlay src="/assets/images/muon-b/muon-b-gpio.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 092baa41-ca38-486d-a0c6-81f5d0faf00a --}}

| Pin | Muon (B-SoM) Pin Name | Muon (B-SoM) GPIO | MCU | Special boot function | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 7 | IOEX_PA0 | &check; | &nbsp; | &nbsp; | GPIO4 (GPCKL0) |
| 8 | TX / D9 | &check; | P0.06 | &nbsp; | GPIO14 (TXD) |
| 10 | RX / D10 | &check; | P0.08 | &nbsp; | GPIO15 (RXD) |
| 11 | D2 | &check; | P1.02 | &nbsp; | GPIO17 |
| 12 | D6 | &check; | P1.11 | &nbsp; | GPIO18 (PCM_CLK) |
| 24 | A6 / D29 | &check; | P0.05 | &nbsp; | GPIO8 (CE0) |
| 26 | A2 / D17 | &check; | P0.28 | &nbsp; | GPIO7 (CE1) |
| 29 | A0 / D19 | &check; | P0.03 | &nbsp; | GPIO5 |
| 31 | A1 / D18 | &check; | P0.04 | &nbsp; | GPIO6 |
| 32 | D5 | &check; | P1.10 | &nbsp; | GPIO12 (PWM0) |
| 33 | D4 | &check; | P1.08 | &nbsp; | GPIO13 (PWM1) |
| 36 | D3 | &check; | P1.01 | &nbsp; | GPIO16 |
| 37 | IOEX_PB7 | &check; | &nbsp; | &nbsp; | GPIO26 |


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

{{imageOverlay src="/assets/images/muon-b/muon-b-adc.svg" alt="GPIO pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 888855dd-978a-4d0b-a83c-e77b29313f8c --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | A5 Analog in, GPIO | ADC7 | 43 | P0.31 | GPIO27 |
| 24 | A6 / D29 | A6 Analog in, PWM, GPIO | ADC3 | 45 | P0.05 | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | ADC4 | 35 | P0.28 | GPIO7 (CE1) |
| 29 | A0 / D19 | A0 Analog in, GPIO, PWM | ADC1 | 23 | P0.03 | GPIO5 |
| 31 | A1 / D18 | A1 Analog in, GPIO, PWM | ADC2 | 33 | P0.04 | GPIO6 |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits


### UART serial

{{imageOverlay src="/assets/images/muon-b/muon-b-uart.svg" alt="UART pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated b4fc214b-56a2-4284-87ed-3fd8591700ef --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 8 | TX / D9 | Serial TX, GPIO | Serial1 TX | 36 | P0.06 | GPIO14 (TXD) |
| 10 | RX / D10 | Serial RX, GPIO | Serial1 RX | 38 | P0.08 | GPIO15 (RXD) |
| 11 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Serial1 RTS | 42 | P1.02 | GPIO17 |
| 36 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Serial1 CTS | 40 | P1.01 | GPIO16 |


{{!-- END do not edit content above, it is automatically generated--}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO

On the Muon, `Serial1` is available on the expansion connector. If Serial1 is not needed on these pins, they can be used as GPIO.

If using an expansion card that requires UART serial, generally the following pins are used on standard Raspberry Pi expansion cards. These cards generally do not support hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated 0d045a42-7718-4d52-9c07-ee8e8a371d61--}}
{{!-- END do not edit content above, it is automatically generated--}}

The LoRaWAN radio is normally communicated to via I2C. There is a GPIO controlled switch that 
connects the MCU Serial1 port to either the expansion connector (the default state), or to
the LoRaWAN radio. The latter is only used for reprogramming the radio software from the main MCU.


### SPI

{{imageOverlay src="/assets/images/muon-b/muon-b-spi.svg" alt="UART pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 26c36465-9c55-4ff0-94fe-e169780a2313 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | MOSI / D12 | SPI MOSI, GPIO | MOSI | 52 | P1.13 | GPIO10 (MOSI) |
| 21 | MISO / D11 | SPI MISO, GPIO | MISO | 50 | P1.14 | GPIO9 (MISO) |
| 23 | SCK / D13 | SPI SCK, GPIO | SCLK | 54 | P1.15 | GPIO11 (SCLK) |
| 24 | A6 / D29 | A6 Analog in, PWM, GPIO | CE0 | 45 | P0.05 | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | CE1 | 35 | P0.28 | GPIO7 (CE1) |


{{!-- END do not edit content above, it is automatically generated--}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- Any pins can be used as the SPI chip select, however certain pins are generally used for Raspberry Pi expansion cards.
- Multiple devices can generally share a single SPI port
- The expansion connector SPI pins are connected to `SPI`. 

If using an expansion card that requires SPI, generally the following pins are used. The pins `CE0` and `CE1` are generally used for SPI chip select on standard Raspberry Pi expansion cards.

{{!-- BEGIN do not edit content below, it is automatically generated 26c36465-9c55-4ff0-94fe-e169780a2313 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | MOSI / D12 | SPI MOSI, GPIO | MOSI | 52 | P1.13 | GPIO10 (MOSI) |
| 21 | MISO / D11 | SPI MISO, GPIO | MISO | 50 | P1.14 | GPIO9 (MISO) |
| 23 | SCK / D13 | SPI SCK, GPIO | SCLK | 54 | P1.15 | GPIO11 (SCLK) |
| 24 | A6 / D29 | A6 Analog in, PWM, GPIO | CE0 | 45 | P0.05 | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | CE1 | 35 | P0.28 | GPIO7 (CE1) |


{{!-- END do not edit content above, it is automatically generated--}}

Expansion cards GPIO10 (MOSI), GPIO9 (MISO), and GPIO11(SCLK) can only be used for SPI. They cannot be used as GPIO because the SPI bus is used for internal peripherals on the Muon. You can, however, use GPIO8 (CE0) and GPIO7 (CE1) as GPIO if not using them for SPI.

### I2C

{{imageOverlay src="/assets/images/muon-b/muon-b-i2c.svg" alt="I2C pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 99d9e532-cd94-47e0-9cbe-6c7cac67cec1 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | D0 | D0 GPIO, I2C SDA | Wire (SDA) | 22 | P0.26 | GPIO2 (SDA) |
| 5 | D1 | D1 GPIO, I2C SCL | Wire (SCL) | 20 | P0.27 | GPIO3 (SCL) |
| 11 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Wire1 (SDA) | 42 | P1.02 | GPIO17 |
| 36 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Wire1 (SCL) | 40 | P1.01 | GPIO16 |


{{!-- END do not edit content above, it is automatically generated--}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz

On the Muon, `Wire` is available on the expansion connector on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 4ba67c3e-e62c-4e88-8990-9e04556af9ae --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | D0 | D0 GPIO, I2C SDA | SDA | 22 | P0.26 | GPIO2 (SDA) |
| 5 | D1 | D1 GPIO, I2C SCL | SCL | 20 | P0.27 | GPIO3 (SCL) |


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

{{imageOverlay src="/assets/images/muon-b/muon-b-pwm.svg" alt="UART pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated f04456f7-b881-4f83-b055-a447cdc9860f --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 12 | D6 | PWM, GPIO | 70 | P1.11 | GPIO18 (PCM_CLK) |
| 24 | A6 / D29 | A6 Analog in, PWM, GPIO | 45 | P0.05 | GPIO8 (CE0) |
| 29 | A0 / D19 | A0 Analog in, GPIO, PWM | 23 | P0.03 | GPIO5 |
| 31 | A1 / D18 | A1 Analog in, GPIO, PWM | 33 | P0.04 | GPIO6 |
| 32 | D5 | PWM, GPIO | 68 | P1.10 | GPIO12 (PWM0) |
| 33 | D4 | SPI1 MISO, PWM, GPIO | 66 | P1.08 | GPIO13 (PWM1) |


{{!-- END do not edit content above, it is automatically generated--}}

- All available PWM pins on the M-SoM share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


If using an expansion card that requires PWM, generally the following pins are used on standard Raspberry Pi expansion cards. Note that only two of them, D4 and D5, are supported as PWM on the B-SoM. 

{{!-- BEGIN do not edit content below, it is automatically generated 35de6ee0-7880-4d24-bb76-5b7dffbf0e1d --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | A5 Analog in, GPIO | PWM1 | 43 | P0.31 | GPIO27 |
| 32 | D5 | PWM, GPIO | PWM0 | 68 | P1.10 | GPIO12 (PWM0) |
| 33 | D4 | SPI1 MISO, PWM, GPIO | PWM1 | 66 | P1.08 | GPIO13 (PWM1) |
| 35 | NC | NC on B-SoM (D26, I2S WS on M-SoM) | GPIO19 | 59 | &nbsp; | GPIO19 (PCM_FS) |


{{!-- END do not edit content above, it is automatically generated--}}


### I2S

Because the PCM_FS pin (Pi GPIO19) is NC on the B-SoM, it is not possible to use I2S (sound) with standard Raspberry Pi I2S expansion cards.

PDM cannot be used on Muon expansion cards as the M-SoM PDM pins (A2, A3) are used for internal peripherals and are not available on the expansion connector.


### BLE (Bluetooth LE)

BLE 5.3 BLE Central Mode and BLE Peripheral Mode are supported. 

Full-speed BLE modes such as A2DP used for BLE audio are not supported.

BLE requires a 2.4 GHz antenna on the B-SoM; there is no built-in chip antenna for BLE.


### NFC

The B-SoM supports NFC tag mode. Note, however, that two of the GPIO on the Pi expansion connector are shared with NFC:


{{!-- BEGIN do not edit content below, it is automatically generated ceeeee7e-0e48-44bc-a05a-3ed8bf1c5183 --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 38 | NFC1 | NFC Antenna 1 (can be reconfigured as GPIO NFC_PIN1) | 17 | P0.09 | GPIO20 (PCM_DIN) |
| 40 | NFC2 | NFC Antenna 2 (can be reconfigured as GPIO NFC_PIN2) | 19 | P0.10 | GPIO21 (PCM_DOUT) |


{{!-- END do not edit content above, it is automatically generated--}}

If you wish to use these pins as GPIO you disable NFC in the UICR bytes of the nRF52840. This will allow the MCU to 
use the NFC pins (NFC1 and NFC2) as GPIO.

A [library and instructions](https://github.com/rickkas7/NFC_UICR_RK/) are available for doing so.


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
{{!-- BEGIN do not edit content below, it is automatically generated 909134fe-3b87-420c-975c-1fb626404e91 --}}

| Pin | Pi Pin Name | Pin Name | Description | Serial | SPI | I2C | I2S |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 3V3 power | 3V3 | 3.3V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 2 | 5V power | 5V | 5V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 3 | GPIO2 (SDA) | D0 | D0 GPIO, I2C SDA | &nbsp; | &nbsp; | Wire (SDA) | &nbsp; |
| 4 | 5V power | 5V | 5V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 5 | GPIO3 (SCL) | D1 | D1 GPIO, I2C SCL | &nbsp; | &nbsp; | Wire (SCL) | &nbsp; |
| 6 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 7 | GPIO4 (GPCKL0) | IOEX_PA0 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 8 | GPIO14 (TXD) | TX / D9 | Serial TX, GPIO | Serial1 TX | &nbsp; | &nbsp; | I2S MCLK |
| 9 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 10 | GPIO15 (RXD) | RX / D10 | Serial RX, GPIO | Serial1 RX | &nbsp; | &nbsp; | &nbsp; |
| 11 | GPIO17 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Serial1 RTS | SPI1 (SCK) | Wire1 (SDA) | &nbsp; |
| 12 | GPIO18 (PCM_CLK) | D6 | PWM, GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 13 | GPIO27 | A5 / D14 | A5 Analog in, GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 14 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 15 | GPIO22 | NC | NC on B-SoM (D27, SWDIO on M-SoM) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 16 | GPIO23 | NC | NC on B-SoM (D24, Serial2 TX on M-SoM) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 17 | 3V3 power | 3V3 | 3.3V power to expansion card | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 18 | GPIO24 | NC | NC on B-SoM (GPIO25, Serial2 RX on M-SoM) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 19 | GPIO10 (MOSI) | MOSI / D12 | SPI MOSI, GPIO | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; |
| 20 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 21 | GPIO9 (MISO) | MISO / D11 | SPI MISO, GPIO | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; |
| 22 | GPIO25 | D22 | D22 GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 23 | GPIO11 (SCLK) | SCK / D13 | SPI SCK, GPIO | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; |
| 24 | GPIO8 (CE0) | A6 / D29 | A6 Analog in, PWM, GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 25 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 26 | GPIO7 (CE1) | A2 / D17 | A2 Analog in, GPIO | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 27 | GPIO0 (ID_SD) | NC27 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 28 | GPIO1 (ID_SC) | NC28 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 29 | GPIO5 | A0 / D19 | A0 Analog in, GPIO, PWM | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 30 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 31 | GPIO6 | A1 / D18 | A1 Analog in, GPIO, PWM | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 32 | GPIO12 (PWM0) | D5 | PWM, GPIO | &nbsp; | &nbsp; | &nbsp; | I2S TX |
| 33 | GPIO13 (PWM1) | D4 | SPI1 MISO, PWM, GPIO | &nbsp; | SPI1 (MISO) | &nbsp; | &nbsp; |
| 34 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 35 | GPIO19 (PCM_FS) | NC | NC on B-SoM (D26, I2S WS on M-SoM) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 36 | GPIO16 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Serial1 CTS | SPI1 (MOSI) | Wire1 (SCL) | &nbsp; |
| 37 | GPIO26 | IOEX_PB7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 38 | GPIO20 (PCM_DIN) | NFC1 | NFC Antenna 1 (can be reconfigured as GPIO NFC_PIN1) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 39 | Ground | GND | Ground | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 40 | GPIO21 (PCM_DOUT) | NFC2 | NFC Antenna 2 (can be reconfigured as GPIO NFC_PIN2) | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


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

{{collapse op="start" label="Show pin details"}}

{{!-- BEGIN do not edit content below, it is automatically generated bfd8304c-f598-4d4c-8b8d-9d60114f27b0 --}}


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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.03</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.04</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">33</td></tr>
</tbody>
</table>

#### A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.31</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">43</td></tr>
</tbody>
</table>

#### D0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D0 GPIO, I2C SDA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.26</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">20</td></tr>
</tbody>
</table>

#### D2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.02</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">42</td></tr>
</tbody>
</table>

#### D6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">70</td></tr>
</tbody>
</table>

#### D22

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">D22 GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.24</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">62</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.28</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">35</td></tr>
</tbody>
</table>

#### A6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D29</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A6 Analog in, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.05</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">45</td></tr>
</tbody>
</table>

#### D3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">CTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.01</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">40</td></tr>
</tbody>
</table>

#### D4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MISO, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.08</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">66</td></tr>
</tbody>
</table>

#### D5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">68</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MISO, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.14</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MOSI, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">52</td></tr>
</tbody>
</table>

#### NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NC on B-SoM (D27, SWDIO on M-SoM)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">55</td></tr>
</tbody>
</table>

#### NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NC on B-SoM (D24, Serial2 TX on M-SoM)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">58</td></tr>
</tbody>
</table>

#### NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NC on B-SoM (GPIO25, Serial2 RX on M-SoM)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">60</td></tr>
</tbody>
</table>

#### NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NC on B-SoM (D26, I2S WS on M-SoM)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">59</td></tr>
</tbody>
</table>

#### NFC1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NFC1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 1 (can be reconfigured as GPIO NFC_PIN1)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.09</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">17</td></tr>
</tbody>
</table>

#### NFC2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NFC2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 2 (can be reconfigured as GPIO NFC_PIN2)</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">19</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial RX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.08</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI SCK, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.15</td></tr>
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
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2S interface</td><td class="" style="text-align: left; ">I2S MCLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.06</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">36</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}


## Mechanical specifications

### Dimensions and Weight

Overall dimensions are 56mm x 84.8mm (2.2" x 3.34").

{{imageOverlay src="/assets/images/m-series/muon-dims.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>

- Weight: 50g (with SoM and thumbscrew)
- Height: 20mm

### 3D models

A 3D model of the Muon is available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/Muon).

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



---
## Ordering information

The Muon cannot be ordered with the B-SoM directly, but you can order the Muon carrier board or kit and the B-SoM separately:

{{!-- BEGIN do not edit content below, it is automatically generated 5f2c9b3c-f2c5-4371-8c3f-7cb5bc267f43 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| MUONCB | Muon Carrier Board (Dev Board only) | GA |
| MUONCBKIT | Muon Carrier Board Kit | GA |


{{!-- END do not edit content above, it is automatically generated  --}}

{{!-- BEGIN do not edit content below, it is automatically generated 90b7bedb-725d-410a-b299-a217829b336c --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | GA |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |


{{!-- END do not edit content above, it is automatically generated --}}




## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2025-07-18 | RK | Preliminary version |
