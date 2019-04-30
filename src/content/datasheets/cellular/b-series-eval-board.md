---
title: B Series Evaluation Board
layout: datasheet.hbs
columns: two
order: 3
---
# B Series Evaluation Board

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/b-series-eval-board.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

This is a simple breakout board for Particle's B series of cellular IoT modules. It breaks out all of its pins via easy to use headers. The board features a redundant USB port, connector for the LiPo battery, a barrel jack power connector, buttons, RGB LED, and charge status LED.

## Block Diagram

![Block Diagram](/assets/images/b-series/b-series-eval-block.png)


## Description

<div align=center><img src="/assets/images/b-series/b-series-eval-labeled.png"></div>

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
| 11 | **Bluetooth/mesh antenna** | Connector for an external SMA connected antenna for Bluetooth and mesh networking. |
| 12 | **TF/SD Card** | MicroSD card slot. |
| 13 | **Nano SIM** | Nano 4FF SIM card slot. |
| 14 | **User LED** | Blue LED connected to pin D7. | 
| 15 | **Reset Button** |This is same as the RESET button on the Boron. |
| 16 | **RGB LED** | System status indicator RGB LED. |
| 17 | **Mode Button** | This is the same as the MODE button on the Boron. |
| 18 | **Expansion Connector** | Allows easy access to SoM IO pins. |
| 19 | **Grove Analog Port** | Connects to Seeed Studio Grove analog and digital boards.|
| 20 | **Grove I2C Port** | Connects to Seeed Studio Grove I2C boards.|
| 21 | **NFC Antenna** | U.FL connector for an NFC antenna (optional). |
| 22 | **Jumpers J12** | Enable or disable various features on the evaluation board. |
| 23 | **SoM connector** | M.2 connector for the Boron SoM. |
| 24 | **Jumpers J13** | Enable or disable various features on the evaluation board. |
| 25 | **Power Jumpers** | Enable or disable power from the evaluation board. |
| 26 | **PMIC** | Power management IC (bq24195) and charge controller. |
| 27 | **Charge LED** | Indicate LiPo is charging. | 


### Jumpers J12

These pins are intended to be connected across using removable two-pin jumpers to connect features on the board to standard ports.

| Feature | Feature Pin | SoM Pin | B Series Pin |
| :---: | :---: | :---: | :---: |
| MicroSD | TF_MI | MISO | MISO |
| | TF_CK | SCK | SCK |
| | TF_MO | MOSI | MOSI |
| | TF_CS | GPIO1 | D23 |
| | TF_DET | PWM2 | D6 |
| SIM | SIM_DATA | SOM8 |  |
| | SIM_CLK | SOM7 |  |
| | SIM_RST | SOM6 |  |
| | SIM_VCC | SOM5 |  |
| D7 LED | USER | PWM3 | D7 |
| | SOM9 | SOM9 |  |
| | GND | GND | GND |

While there is an external SIM card connector and jumpers on the evaluation board, the B Series B402 SoM does not support using a 3rd-party SIM card.

---

### Jumpers J13

These pins are intended to be connected across using removable two-pin jumpers to connect features on the board to standard ports.

| B Series Pin | SoM Pin | Feature Pin | Feature |
| :---: | :---: | :---: | :---: |
| | UB\_USB\_N | UB\_USB\_N | u-blox USB | 
| | UB\_USB\_P | UB\_USB\_N | | 
| | USB\_DET | UB\_VBUS |  |  | 
| D8 | CS | W5500_CS | Ethernet |
| SCK | SCK | W5500_CLK | |
| MISO | MISO | W5500_MISO | |
| MOSI | MOSI | W5500_MOSI | |
| D22 | GPIO0 | W5500_INT | |
| A6 | ADC6 | FUEL\_INT | Fuel Gauge |
| D0 | SDA | BQ24195\_SDA | PMIC |
| D1 | SCL | BQ24195\_SCL | PMIC |
 

### Power Jumpers

| Jumper | Name |
| :---: | :---: |
| J5 | SOM_VCC | 
| J31 | SOM\_3V3 | 

### Expansion Connector

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

### PWM Differences

On the Boron SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
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

## Basic Setup

The basic setup for the B series to be operational is shown below:

<div align=center><img src="/assets/images/b-series/b-series-eval-setup.png"></div>

- Plug the antenna into the uFL connector (1). Remember never to power up this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.
- Make sure jumpers J5 and J31 are installed (2).
- Connect power the USB (3) or a LiPo battery (4).
- Turn on the power switches (5).

### Using the PMIC and Fuel Gauge (recommended)

To use the bq24195 PMIC and MAX17043 fuel gauge you must add the jumpers:

- ADC6 to FUEL_INT
- SDA to BQ24195_SDA
- SCL to BQ24195_SCL

There is support for it in Device OS so you don't need to add any additional configuration.

---

### Using the MicroSD Card

To use the MicroSD card, you must add the jumpers:

- TF_MI to MISO
- TF_CK to SCK
- TF_MO to MOSI
- TF_CS to GPIO1
- TF_DET to PWM2 (optional)

You will normally use this with the [SdFat](https://build.particle.io/libs/SdFat/1.0.16/tab/SdFat.h) library.

With the jumpers installed, it will use the primary SPI and pin D23 as the chip select.

### Using Ethernet

To use Ethernet, you must add the jumpers:

- CS to W5500_CS
- SCK to W5500_CLK
- MISO to W5500_MISO
- MOSI to W5500_MOSI
- GPIO0 to W5500_INT

With the jumpers installed, it will use the primary SPI and pins D8 as the chip select and D22 as the interrupt pin.


## Evaluation Board Schematics

### PMIC

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-pmic.png"></div>

### Fuel Gauge

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-fuel.png" class="small"></div>

---

### 3.3V Regulator

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-3v3-reg.png" class="small"></div>


### Ethernet

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-ethernet.png"></div>


### SD Card

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-sdcard.png" class="small"></div>

---

### SIM

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-sim.png" class="small"></div>


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 001      | 29 Apr 2019 | RK | Initial Release |

