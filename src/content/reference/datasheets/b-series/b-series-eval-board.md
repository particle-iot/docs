---
title: B Series Evaluation Board
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle B Series SoM evaluation board
---
# B Series Evaluation board

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/b-series-eval-board.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

This is a simple breakout board for Particle's B series of cellular IoT modules. It breaks out all of its pins via easy to use headers. The board features a redundant USB port, connector for the LiPo battery, a barrel jack power connector, buttons, RGB LED, and charge status LED.

The Eagle CAD design files, Gerber files, and bill of materials can be found in the [SoM eval board GitHub repository](https://github.com/particle-iot/som-eval-board).

## Block diagram

![Block Diagram](/assets/images/b-series/b-series-eval-block.png)


## Description

{{!-- BEGIN shared-blurb 19f889d4-a5c9-11ec-b909-0242ac120002 --}}
{{imageOverlay src="/assets/images/b-series/b-series-eval-labeled.png" alt="Ports Diagram" class="full-width"}}

| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
| 1 | **External Power** | 5-12 VDC. Minimum power requirements are 5VDC @500mA (when the LiPo battery) or 5VDC @2000mA (without LiPo battery). | 
| 2 | **LiPo Battery connector**| Plug in the LiPo battery here.|
| 3 |  **SoM USB port**       | This is the module's main USB port that connects to the microcontroller.|
| 4 | **JTAG connector**        | This can plug directly into the Particle debugger ribbon cable.|
| 5 | **Battery switch** | Controls power between the LiPo connector and the charge controller. |
| 6 | **SoM power switch** | Controls 3V3 power to the SoM |
| 7 | **u-blox USB port**  | This USB port connects directly to the u-blox module for firmware updates.|
| 8 | **Ethernet connector** | RJ45 connector for twisted pair Ethernet, 10 or 100 Mbit/sec. |
| 9 | **PoE connector** | Connect for the Particle PoE adapter for power-over-Ethernet. |
| 10 | **Cellular antenna** | Connector for an external SMA connected cellular antenna. |
| 11 | **Bluetooth antenna** | Connector for an external SMA connected antenna for Bluetooth networking. |
| 12 | **TF/SD Card** | MicroSD card slot. |
| 13 | **User LED** | Blue LED connected to pin D7. | 
| 14 | **Reset Button** |This is same as the RESET button on the Boron. |
| 15 | **RGB LED** | System status indicator RGB LED. |
| 16 | **Mode Button** | This is the same as the MODE button on the Boron. |
| 17 | **Expansion Connector** | Allows easy access to SoM IO pins. |
| 18 | **Grove Analog Port** | Connects to Seeed Studio Grove analog and digital boards.|
| 19 | **Grove I2C Port** | Connects to Seeed Studio Grove I2C boards.|
| 20 | **NFC Antenna** | U.FL connector for an NFC antenna (optional). |
| 21 | **Jumpers J12** | Enable or disable various features on the evaluation board. |
| 22 | **SoM connector** | M.2 connector for the B Series SoM. |
| 23 | **Jumpers J13** | Enable or disable various features on the evaluation board. |
| 24 | **Power Jumpers** | Enable or disable power from the evaluation board. |
| 25 | **Charge LED** | Indicate LiPo is charging. | 
{{!-- END shared-blurb --}}

### Jumpers J12

These pins are intended to be connected across using removable two-pin jumpers to connect features on the board to standard ports.

| Feature | Feature Pin | SoM Pin | B Series Pin |
| :---: | :---: | :---: | :---: |
| MicroSD | SD_MI | MISO | MISO |
| | SD_CK | SCK | SCK |
| | SD_MO | MOSI | MOSI |
| | SD_CS1 | PWM1 | D5 |
| | SD_DECT | PWM2 | D6 |
| D7 LED | USER | PWM3 | D7 |
| | GND | GND | GND |

### Jumpers J13

These pins are intended to be connected across using removable two-pin jumpers to connect features on the board to standard ports.

| B Series Pin | SoM Pin | Feature Pin | Feature |
| :---: | :---: | :---: | :---: |
| | UB\_USB\_N | UB\_USB\_N | u-blox USB | 
| | UB\_USB\_P | UB\_USB\_N | | 
| | USB\_DET | UB\_VBUS |  |  | 
| D8 | CS | ETH\_CS | Ethernet |
| SCK | SCK | ETH\_CLK | |
| MISO | MISO | ETH\_MISO | |
| MOSI | MOSI | ETH\_MOSI | |
| D22 | GPIO0 | ETH\_INT | |
| A6 | ADC6 | PM\_INT | Fuel Gauge & PMIC |
| D0 | SDA | PM\_SDA | PMIC |
| D1 | SCL | PM\_SCL | PMIC |
 
For more information about Ethernet, see the application note [AN037 Ethernet](/hardware/ethernet/ethernet/).

---

### Power jumpers

| Jumper | Name |
| :---: | :---: |
| J5 | SOM_VCC | 
| J31 | SOM\_3V3 | 

### Expansion connector

| B Series Pin | SoM Pin | | SoM Pin | B Series Pin |
| :---: | :---: | --- | :---: | :---: |
|  | SOM9 | | NC |  |
| SIM_DATA | SOM8 | | PWM3 | D7 |
| SIM_CLK | SOM7 | | PWM2 | D6 |
| SIM_RST | SOM6 | | PWM1 | D5 |
| SIM_VCC | SOM5 | | PWM0 | D4 |
| | BLUE | | GPIO1 | D23 |
| | GREEN | | GPIO0 | D22 |
| | RED | | NC | | 
| | NC | | NC | | 
| | NC | | GND | | 
| | NC | | SCK | D13 | 
| | NC | | MOSI | D12 | 
| | NC | | MISO | D11| 
| | GND | | CS | D8 | 
| A7/D20 | ADC7 | | NC | | 
| A6/D21 | ADC6 | | NC | |
| A5/D14 | ADC5 | | RTS | D2 | 
| A4/D15 | ADC4 | | CTS | D3 |
| | GND | | RX | RX/D10 |
| A3/D16 | ADC3 | | TX | TX/D9 | 
| A2/D17 | ADC2 | | RESET | |
| A1/D18 | ADC1 | | MODE | |
| A0/D19 | ADC0 | | SDA | D0 |
| | GND | | SCL | D1 |
| | GND | | NC | | 
| | GND | | NC | | 
| | GND | | VCC | | 
| | GND | | VCC | | 
| | GND | | VCC | | 

---

### PWM Differences

On the B Series SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 2: Pins A0, A1, A6, and A7.
- Group 1: Pins D4, D5, and D6.
- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

On Gen 3 Feather devices (Argon, Boron, Xenon), pins A0, A1, A2, A3, D2, D3, D4, D5, D6, D7, and D8 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 3: Pins D2, D3, A4, and A5.

- Group 2: Pins A0, A1, A2, and A3.

- Group 1: Pins D4, D5, D6, and D8.

- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

These rules also apply to tone() (square wave with 50% duty cycle), however since each group must share the same frequency you can only generate two different simultaneous tones of different frequencies on the B Series SoM. You cannot generate tone on group 0.

## Basic setup

The basic setup for the B series to be operational is shown below:

- Plug the cellular antenna into the U.FL connector labeled **CELL** on the SoM. Remember never to power up this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.
- If you are going to use mobile app setup or BLE, connect the 2.4 GHz antenna (the smaller one) to the **BT** U.FL connector on the SoM.
- Connect power the USB (3) or a LiPo battery (4).
- Turn on the appropriate power switches (5).

### Using the PMIC and fuel gauge (recommended)

There is support for bq24195 PMIC and MAX17043 fuel gauge in Device OS so you don't need to add any additional configuration.

| PMIC | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| PM\_INT | P0.05 | A6 | 45 |
| PM\_SDA | P1.13 | D0 | 22 |
| PM\_SCL | P1.15 | D1 | 20 |

It requires these jumpers, which should be installed at the factory:

- ADC6 to PM\_INT
- SDA to PM\_SDA
- SCL to PM\_SCL


### Using the MicroSD card

To use the MicroSD card, you must add the jumpers for the SD_ pins.

You will normally use this with the [SdFat](https://build.particle.io/libs/SdFat/1.0.16/tab/SdFat.h) library.

With the jumpers installed, it will use the secondary SPI (SPI1) and pin D5 as the chip select.

| Micro SD | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| SD\_MISO | P1.08 | D4 / PWM0 / SPI1 MISO | 66 |
| SD\_SCK | P1.02 | D2 / RTS / SPI1 SCK | 42 |
| SD\_MOSI | P1.01 | D3 / CTS / SPI1 MOSI | 40 |
| SD\_CS | P1.10 | D5 / PWM1 | 68 |
| SD\_DET | P1.11 | D6 / PWM2 | 70 |

---

### Using ethernet

To use Ethernet, you must add the jumpers:

- CS to ETH\_CS
- SCK to ETH\_SCK
- MISO to ETH\_MISO
- MOSI to ETH\_MOSI
- GPIO0 to ETH\_INT

With the jumpers installed, it will use the primary SPI and pins D8 as the chip select and D22 as the interrupt pin.

| W5500 | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| ETH\_CS | P1.03 | D8 | 48 |
| ETH\_MISO | P1.14 | D11 / SPI MISO | 50 |
| ETH\_SCK | P1.15 | D13 / SPI SCK | 54 |
| ETH\_MOSI | P1.13 | D12 / SPI MOSI | 52 |
| RST_N | P0.02 | A7 (D20) | 47 |
| ETH\_INT | P0.24 | D22 | 62 |


### Using the Grove connectors

| J11 | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| GND | | | |
| 3V3 | | | |
| ADC2 | P0.28 | A2 | 35 |
| ADC1 | P0.04 | A1 | 33 |

| J10 | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| GND | | | |
| 3V3 | | | |
| SDA | P1.13 | D0 | 22 |
| SCL | P1.15 | D1 | 20 |



## Evaluation board schematics

### PMIC

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-pmic.png"></div>


### Fuel gauge

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-fuel.png" class="small"></div>

---

### 3.3V Regulator

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-3v3-reg.png" class="small"></div>


### Ethernet

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-ethernet.png"></div>


### SD Card

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-sdcard.png" class="small"></div>

---

## Mechanical specifications

### Dimensions and weight

| Parameter | Value |
| --- | --- |
| Width | 91 mm |
| Length | 142.5 mm |
| Thickness | 15.5 mm | 
| Weight | 71.8 grams (including PoE module) |


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 001      | 29 Apr 2019 | RK | Initial Release |
| 002      | 21 Jan 2020 | RK | Remove mesh |
| 003      |  3 Feb 2020 | RK | Correct pins for SD card |
| 004      | 20 Jul 2022 | RK | Correct pins for SD and Ethernet SPI, which are SPI not SPI1 |
| 005      |  9 Sep 2022 | RK | Correct length |
| 006      | 19 Jan 2023 | RK | Correct pins for SD card for version 1.2 board |
