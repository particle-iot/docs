---
title: B Series Evaluation Board
layout: datasheet.hbs
columns: two
order: 3
---
# B Series Evaluation Board

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/b-series-eval-board.pdf"}}
{{/unless}}

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
| 5 | **Battery switch** | Controls power between the LiPo connector and the charge controller |
| 6 | **SoM power switch** | Controls 3V3 power to the SoM |
| 7 | **u-blox USB port**  | This USB port connects directly to the u-blox module for firmware updates.|
| 8 | **Ethernet connector** | RJ45 connector for twisted pair Ethernet, 10 or 100 Mbit/sec. |
| 9 | **PoE connector** | Connect for the Particle PoE adapter for power-over-Ethernet |
| 10 | **Cellular antenna** | Connector for an external SMA connected cellular antenna. |
| 11 | **Bluetooth/mesh antenna** | Connector for an external SMA connected antenna for Bluetooth and mesh networking. |
| 12 | **TF/SD Card** | MicroSD card slot. |
| 13 | **Nano SIM** | Nano 4FF SIM card slot. |
| 14 | **User LED** | Connected to pin D7. | 
| 15 | **Reset Button** |This is same as the RESET button on the Boron. |
| 16 | **RGB LED** | System status indicator RGB LED. |
| 17 | **Mode Button** | This is the same as the MODE button on the Boron. |
| 18 | **Expansion Connector** | Allows easy access to SoM IO pins. |
| 19 | **Grove Analog Port** | Connects to Seeed Studio Grove analog and digital boards.|
| 20 | **Grove I2C Port** | Connects to Seeed Studio Grove I2C boards.|
| 21 | **NFC Antenna** | U.FL connector for an NFC antenna (optional) |
| 22 | **Jumpers J12** | Enable or disable various features on the evaluation board. |
| 23 | **SoM connector** | M.2 connector for the Boron SoM |
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
| SIM | SIM_DATA | SOM5 |  |
| | SIM_CLK | SOM4 |  |
| | SIM_RST | SOM3 | ??  |
| | SIM_VCC | SOM2 |  |
| D7 LED | USER | PWM3 | D7 |
| | SOM6 | SOM6 | ?? |
| | GND | GND | GND |

**TODO:** The evaluation board lists SOM3 as SIM\_RST but the B series data sheet has SOM6 as SIM\_RST and SOM3 is NFC1, figure out which is right

By default, the external SIM card cannot be used. There are four jumpers on the B Series SoM that need to be changed in order to disable the onboard MFF2 SMD SIM.

![SIM](/assets/images/b-series/b-series-sim.png)


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
| D1 | SCL | BQ24195\_SDA | PMIC |
 

### Power Jumpers

| Jumper | Name |
| :---: | :---: |
| J5 | SOM_VCC | 
| J31 | SOM\_3V3 | 

## 60-pin Connector

| B Series Pin | SoM Pin | | SoM Pin | B Series Pin |
| :---: | :---: | --- | :---: | :---: |
| D31 | SOM6 | | NC |  |
| D30 | SOM5 | | PWM3 | D7 |
| NFC2 | SOM4 | | PWM2 | D6 |
| NFC1 | SOM3 | | PWM1 | D5 |
| u-blox VBUS | SOM2 | | PWM0 | D4 |
| | BLUE | | GPIO1 | GPIO1 | D23 |
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





| PINS | FUNCTION | DESCRIPTION|
|:-----|:--------:|:-----------|
| VIN  | POWER    | This pin can be used as an input or output. As an input, supply 5VDC to 12VDC to power the Electron. When the Electron is powered via the USB port, this pin will output a voltage of approximately 4.8VDC due to a reverse polarity protection series Schottky diode between VUSB and VIN. When used as an output, the max load on VIN is 1Amp.	|
| VUSB | POWER    | This is connected to the VUSB power pin of the USB port. |
| LiPo | POWER    | This is connected to the +LiPo connector.				|
| PMID | POWER    | This is connected to the PMID pin of the PMIC.			|
| 3V3  | POWER    | This is the output of the 3V3 regulator on the E series		|
| GND  | POWER    | Common GND pin. 											|
| VDDA | POWER    | This is the input to the analog block of the STM32.		|
| VBAT | POWER    | Supply to the internal RTC, backup registers and SRAM when 3V3 is not present (1.65 to 3.6VDC).	|
| RED  | IO       | Red pin of the RGB LED. (PA1)
| GRN  | IO       | Green pin of the RGB LED. (PA2)
| BLU  | IO       | Blue pin of the RGB LED. (PA3)
| RST  | I        | Active-low reset input.
| MODE | IO       | Connected to the MODE button input.
| STAT | O        | Connected to the charge status pin of the PMIC.
| TX   | IO       | Primarily used as UART TX, but can also be used as a digital GPIO or PWM.|
| RX   | IO       | Primarily used as UART RX, but can also be used as a digital GPIO or PWM.|
| WKP  | IO       | Active-high wakeup pin, wakes the module from sleep/standby modes. When not used as a WAKEUP, this pin can also be used as a digital GPIO, ADC input or PWM. Can be referred to as A7 when used as an ADC.|
| DAC  | IO       | 12-bit Digital-to-Analog (D/A) output (0-4095), referred to as DAC or DAC1 in software. Can also be used as a digital GPIO or ADC. Can be referred to as A6 when used as an ADC.|
| A0-A5| IO       | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs. A6 and A7 are code convenience mappings, which means pins are not actually labeled as such but you may use code like analogRead(A7). A6 maps to the DAC pin and A7 maps to the WKP pin. A3 is also a second DAC output used as DAC2 or A3 in software. A4 and A5 can also be used as PWM outputs.|
| B0-B5| IO       | B0 and B1 are digital only while B2, B3, B4, B5 are 12-bit A/D inputs as well as digital GPIOs. B0, B1, B2, B3 can also be used as PWM outputs.|
| C0-C5| IO       | Digital only GPIO. C4 and C5 can also be used as PWM outputs.
| D0-D7| IO       | Digital only GPIO. D0, D1, D2, D3 can also be used as PWM outputs.|

## Basic Setup

The basic setup for the B series to be operational is shown below:

<div align=center><img src="/assets/images/e-series/illustrations/e0-dev-setup.png"></div>

Plug the antenna into the uFL connector. Remember never to power up the Electron or this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.

To power the board you can either use the barrel jack connector or the E series USB port. If you are planning to power the board without the LiPo battery, remember that the power supply should be able to source **at least 2A @5VDC.**

**VDDA/VBAT selector switch:** 

The dip switches should be flipped individually to the ON position if you want to power the VDDA and VBAT pins via the on board 3V3 supply. If you want to connect a different source, simply flip the switch to the OFF position and connect a suitable supply using the respective header pins.

**SMA Connector:** The evaluation kit comes with a solderable u.Fl to SMA adapter. You can optionally solder it on to the board and connect a different cellular antenna of your choice. 

<div align=center><img src="/assets/images/e-series/illustrations/e0-dev-sma.png"></div>


**Sensor Ports:** 

There are two 4-pin connectors available for you to plug in Grove compatible sensors. CONN1 exposes two analog pins (A0 and A1) while CONN2 exposes the I2C pins (D0 and D1).

**JTAG/SWD connector:** 

We have included a standard 20 pin JTAG/SWD connector footprint. You can use this port to gain direct access to the onboard microcontroller. 

<div align=center><img src="/assets/images/e-series/illustrations/e0-dev-jtag.png"></div>

## Evaluation Board Schematics

### PMIC

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-pmic.png"></div>

### Fuel Gauge

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-fuel.png" class="small"></div>

### 3.3V Regulator


<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-3v3-reg.png" class="small"></div>


### Ethernet

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-ethernet.png"></div>


### SD Card

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-sdcard.png" class="small"></div>


### SIM

<div align=center><img src="/assets/images/b-series/b-series-eval-schematic-sim.png" class="small"></div>


