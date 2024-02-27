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

{{imageOverlay src="/assets/images/b-series/b-series-eval-block.png" alt="Block Diagram" class="full-width"}}


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

{{box op="start" cssClass="boxed warningBox"}}
Particle devices are certified for use only with specific cellular antennas that connect to the U.FL connector on the 
module. Using an alternate antenna via the SMA connector (11) will require a lengthy and expensive recertification process.
{{box op="end"}}


### Powering the board

The B Series Eval Board can be powered by:

| Num  | Description |
| :---: | :--- |
| 1 | VIN barrel connector 5-12 VDC (5.5mm x 2.1mm, center positive) |
| 2 | LiPo battery (3.7V LiPo with JST-PH connector)
| 3 | USB Micro B ("SOM USB") |

- There are two USB Micro B connectors on the eval board, be sure to use connector 3 "SOM USB".
- The B524/B523 require a LiPo battery when powering by USB due to the higher current requirements of 2G/3G. The B404X/B404/B402 (LTE Cat M1) can be powered by USB without a battery.
- When powering by VIN (barrel connector), 5-12 VDC is recommended, but up to 17 VDC can be supplied.
- Minimum power requirements are 5VDC @500mA (when the LiPo battery) or 5VDC @2000mA (without LiPo battery).
- If purchasing a LiPo battery from a 3rd-party supplier, beware as the polarity of the JST-PH connector is not standardized and may be reversed. Permanent damage to the eval board can occur if powered by reverse polarity on the JST connector. See the [battery guide](/hardware/power/batteries/) for additional information.


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

If you are not using the PMIC be sure to remove the jumper if you need use pin A6 as an analog input or GPIO.

### Power consumption

We do not recommend using the B Series eval board for power consumption measurements. It's impossible to completely disconnect the Wiznet W5500 Ethernet interface without removing the chip from the board. This will result in significantly higher power consumption measurements than you would have in most applications.

### Using the MicroSD card

To use the MicroSD card, you must add the jumpers for the SD_ pins.

You will normally use this with the [SdFat](https://build.particle.io/libs/SdFat/1.0.16/tab/SdFat.h) library.

With the jumpers installed, it will use the secondary SPI (SPI1) and pin D5 as the chip select. You cannot use D2, D3, D4, D5, and D6 as GPIO for your own (non-SD card) use.

| Micro SD | nRF52 Pin | SoM Pin | SoM Pin Number |
| :---: | :---: |  :---: |  :---: | 
| SD\_MISO | P1.08 | D4 / PWM0 / SPI1 MISO | 66 |
| SD\_SCK | P1.02 | D2 / RTS / SPI1 SCK | 42 |
| SD\_MOSI | P1.01 | D3 / CTS / SPI1 MOSI | 40 |
| SD\_CS | P1.10 | D5 / PWM1 | 68 |
| SD\_DET | P1.11 | D6 / PWM2 | 70 |

Note that SD\_DET (D6 / PWM2) is an output. It's pulled high with a 47K resistor and driven low by a mechanical switch when a SD card is inserted. Be sure to remove the jumper if you are using D6 as regular GPIO.

---

### Using ethernet

To use Ethernet, you must add the jumpers:

- CS to ETH\_CS
- SCK to ETH\_SCK
- MISO to ETH\_MISO
- MOSI to ETH\_MOSI
- GPIO0 to ETH\_INT

With the jumpers installed, it will use the primary SPI and pins D8 as the chip select and D22 as the interrupt pin. You cannot use pins D8, D20, D22, or primary SPI (MISO, MOSI, SCK) as GPIO for your own (non-Ethernet) use. You can share SPI with other SPI peripherals that have libraries that correctly implement SPI transactions.

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


## Expansion header

{{imageOverlay src="/assets/images/m2eval_nRF52.svg" alt="Expansion header" }}

{{!-- BEGIN do not edit content below, it is automatically generated 3c7bdf46-c2a2-4b04-aeb1-222b761e036b --}}


#### 1 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 2 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power, 3.6V - 4.3V for cellular modem</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">2</td></tr>
</tbody>
</table>

#### 3 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 4 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power, 3.6V - 4.3V for cellular modem</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">2</td></tr>
</tbody>
</table>

#### 5 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 6 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power, 3.6V - 4.3V for cellular modem</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">2</td></tr>
</tbody>
</table>

#### 7 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 8 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power, 3.3V at 500 mA for MCU</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">8</td></tr>
</tbody>
</table>

#### 9 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 10 SOM10

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">14</td></tr>
</tbody>
</table>

#### 11 SOM6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">NFC1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 1. This connection is in parallel to the U.FL connector on the eval board.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.09</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">17</td></tr>
</tbody>
</table>

#### 12 SOM11

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">18</td></tr>
</tbody>
</table>

#### 13 SOM7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">NFC2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 2. This connection is in parallel to the U.FL connector on the eval board. NFC2 is the center pin.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">19</td></tr>
</tbody>
</table>

#### 14 SCL

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCL</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SCL, GPIO, PMIC and fuel fauge via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">20</td></tr>
</tbody>
</table>

#### 15 A0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">15</td></tr>
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

#### 16 SDA

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SDA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SDA, GPIO, PMIC and fuel fauge via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.26</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">22</td></tr>
</tbody>
</table>

#### 17 A1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">17</td></tr>
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

#### 18 MODE

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MODE</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">MODE button, has internal pull-up</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">32</td></tr>
</tbody>
</table>

#### 19 A2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">19</td></tr>
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

#### 20 /RESET

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">/RESET</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hardware reset, active low.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">34</td></tr>
</tbody>
</table>

#### 21 A3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">21</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A3 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.29</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">37</td></tr>
</tbody>
</table>

#### 22 TX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.06</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">36</td></tr>
</tbody>
</table>

#### 23 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 24 RX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">24</td></tr>
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

#### 25 A4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">25</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A4 Analog in, GPIO, PMIC and fuel gauge interrupt via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.30</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">41</td></tr>
</tbody>
</table>

#### 26 CTS

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">26</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">CTS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL, SD card SPI SD_MO via jumper J12</td></tr>
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

#### 27 A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.31</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">43</td></tr>
</tbody>
</table>

#### 28 RTS

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">28</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RTS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA, SD card SPI SD_CK via jumper J12</td></tr>
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

#### 29 A6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">29</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A6</td></tr>
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

#### 30 SOM0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">30</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">CELL USBD+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Cellular Modem USB Data+. Also connected to CELLULAR_USB micro B connector with jumper on J13.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">44</td></tr>
</tbody>
</table>

#### 31 A7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">31</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A7 Analog in, GPIO, Ethernet Reset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.02</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">47</td></tr>
</tbody>
</table>

#### 32 SOM1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">32</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">CELL USBD-</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Cellular Modem USB Data-. Also connected to CELLULAR_USB micro B connector with jumper on J13.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">46</td></tr>
</tbody>
</table>

#### 33 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">33</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 34 CS

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">34</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">CS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, SPI SS, Ethernet CS via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.03</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">48</td></tr>
</tbody>
</table>

#### 35 SOM14

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">35</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 51. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">51</td></tr>
</tbody>
</table>

#### 36 MISO

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">36</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MISO, GPIO, Ethernet via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">50</td></tr>
</tbody>
</table>

#### 37 SOM15

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">37</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 53. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">53</td></tr>
</tbody>
</table>

#### 38 MOSI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">38</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MOSI, GPIO, Ethernet via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">52</td></tr>
</tbody>
</table>

#### 39 SOM16

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">39</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 55. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">55</td></tr>
</tbody>
</table>

#### 40 SCK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">40</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI SCK, GPIO, Ethernet via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">54</td></tr>
</tbody>
</table>

#### 41 SOM17

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">41</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 57. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">57</td></tr>
</tbody>
</table>

#### 42 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">42</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 43 SOM18

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">43</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 59. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">59</td></tr>
</tbody>
</table>

#### 44 SOM12

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">44</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 58. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">58</td></tr>
</tbody>
</table>

#### 45 R

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">45</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">R</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">RGBR</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Red</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">61</td></tr>
</tbody>
</table>

#### 46 SOM13

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">46</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 60. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">60</td></tr>
</tbody>
</table>

#### 47 G

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">47</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">G</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">RGBG</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Green</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">63</td></tr>
</tbody>
</table>

#### 48 GPIO0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">48</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GPIO0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, Ethernet INT via jumper on J13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.24</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">62</td></tr>
</tbody>
</table>

#### 49 B

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">49</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">B</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">RGBB</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Blue</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">65</td></tr>
</tbody>
</table>

#### 50 GPIO1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">50</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GPIO1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.09</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">64</td></tr>
</tbody>
</table>

#### 51 SOM5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">51</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">SIM_VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected. External SIM support is not available on B-SoM.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">67</td></tr>
</tbody>
</table>

#### 52 PWM0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">52</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">PWM0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MISO, PWM, GPIO, SD card SPI SD_MI via jumper J12</td></tr>
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

#### 53 SOM6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">53</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">SIM_RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected. External SIM support is not available on B-SoM.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">69</td></tr>
</tbody>
</table>

#### 54 PWM1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">54</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">PWM1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO, SD card SPI SD_CS via jumper J12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">68</td></tr>
</tbody>
</table>

#### 55 SOM7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">55</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">SIM_CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected, 1.8V/3V SIM Clock Output from R410M.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">71</td></tr>
</tbody>
</table>

#### 56 PWM2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">56</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">PWM2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO, SD card SPI SD_DET via jumper J12</td></tr>
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

#### 57 SOM8

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">57</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">SIM_DATA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected. External SIM support is not available on B-SoM.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">73</td></tr>
</tbody>
</table>

#### 58 PWM3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">58</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">PWM3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO, Blue LED via USER_D7 jumper J12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">72</td></tr>
</tbody>
</table>

#### 59 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">59</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">1</td></tr>
</tbody>
</table>

#### 60 SOM9

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">60</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SOM9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">M.2 pin 75. Not currently used, leave unconnected.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">M.2 connector pin number</td><td class="" style="text-align: left; ">75</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}


## Evaluation board schematics

### Page 1

{{imageOverlay src="/assets/images/m2-eval/1.2/p1.png" large="/assets/images/m2-eval/1.2/p1.svg" alt="Schematic Page 1"}}

### Page 2

{{imageOverlay src="/assets/images/m2-eval/1.2/p2.png" large="/assets/images/m2-eval/1.2/p2.svg" alt="Schematic Page 2"}}

### Page 3

{{imageOverlay src="/assets/images/m2-eval/1.2/p3.png" large="/assets/images/m2-eval/1.2/p3.svg" alt="Schematic Page 3"}}

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
| 007      | 26 Oct 2023 | RK | Updated pin diagrams |
