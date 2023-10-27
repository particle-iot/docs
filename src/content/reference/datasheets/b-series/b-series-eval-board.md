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

With the jumpers installed, it will use the secondary SPI (SPI1) and pin D5 as the chip select.

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


## Expansion header

{{imageOverlay src="/assets/images/m2eval_nRF52.svg" alt="Expansion header" }}

{{!-- BEGIN do not edit content below, it is automatically generated 3c7bdf46-c2a2-4b04-aeb1-222b761e036b --}}

#### 1 GND
|   | Details |
| :--- | :--- |
| Pin Number | 1 |
| Pin Name | GND |
| Description | Ground. |
#### 2 VCC
|   | Details |
| :--- | :--- |
| Pin Number | 2 |
| Pin Name | VCC |
| Description | System power, 3.6V - 4.3V for cellular modem |
#### 3 GND
|   | Details |
| :--- | :--- |
| Pin Number | 3 |
| Pin Name | GND |
| Description | Ground. |
#### 4 VCC
|   | Details |
| :--- | :--- |
| Pin Number | 4 |
| Pin Name | VCC |
| Description | System power, 3.6V - 4.3V for cellular modem |
#### 5 GND
|   | Details |
| :--- | :--- |
| Pin Number | 5 |
| Pin Name | GND |
| Description | Ground. |
#### 6 VCC
|   | Details |
| :--- | :--- |
| Pin Number | 6 |
| Pin Name | VCC |
| Description | System power, 3.6V - 4.3V for cellular modem |
#### 7 GND
|   | Details |
| :--- | :--- |
| Pin Number | 7 |
| Pin Name | GND |
| Description | Ground. |
#### 8 3V3
|   | Details |
| :--- | :--- |
| Pin Number | 8 |
| Pin Name | 3V3 |
| Description | System power, 3.3V at 500 mA for MCU |
#### 9 GND
|   | Details |
| :--- | :--- |
| Pin Number | 9 |
| Pin Name | GND |
| Description | Ground. |
#### 10 SOM10
|   | Details |
| :--- | :--- |
| Pin Number | 10 |
| Pin Name | SOM10 |
| Description | Not currently used, leave unconnected. |
#### 11 SOM6
|   | Details |
| :--- | :--- |
| Pin Number | 11 |
| Pin Name | SOM6 |
| Pin Alternate Name | NFC1 |
| Description | NFC Antenna 1. This connection is in parallel to the U.FL connector on the eval board. |
#### 12 SOM11
|   | Details |
| :--- | :--- |
| Pin Number | 12 |
| Pin Name | SOM11 |
| Description | Not currently used, leave unconnected. |
#### 13 SOM7
|   | Details |
| :--- | :--- |
| Pin Number | 13 |
| Pin Name | SOM7 |
| Pin Alternate Name | NFC2 |
| Description | NFC Antenna 2. This connection is in parallel to the U.FL connector on the eval board. NFC2 is the center pin. |
#### 14 SCL
|   | Details |
| :--- | :--- |
| Pin Number | 14 |
| Pin Name | SCL |
| Pin Alternate Name | D1 |
| Description | I2C SCL, GPIO, PMIC and fuel fauge via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| I2C interface | SCL. Use Wire object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 15 A0
|   | Details |
| :--- | :--- |
| Pin Number | 15 |
| Pin Name | A0 |
| Pin Alternate Name | D19 |
| Description | A0 Analog in, GPIO, PWM |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 16 SDA
|   | Details |
| :--- | :--- |
| Pin Number | 16 |
| Pin Name | SDA |
| Pin Alternate Name | D0 |
| Description | I2C SDA, GPIO, PMIC and fuel fauge via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| I2C interface | SDA. Use Wire object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 17 A1
|   | Details |
| :--- | :--- |
| Pin Number | 17 |
| Pin Name | A1 |
| Pin Alternate Name | D18 |
| Description | A1 Analog in, GPIO, PWM |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 18 MODE
|   | Details |
| :--- | :--- |
| Pin Number | 18 |
| Pin Name | MODE |
| Pin Alternate Name | D20 |
| Description | MODE button, has internal pull-up |
#### 19 A2
|   | Details |
| :--- | :--- |
| Pin Number | 19 |
| Pin Name | A2 |
| Pin Alternate Name | D17 |
| Description | A2 Analog in, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 20 /RESET
|   | Details |
| :--- | :--- |
| Pin Number | 20 |
| Pin Name | /RESET |
| Pin Alternate Name | RST |
| Description | Hardware reset, active low. |
#### 21 A3
|   | Details |
| :--- | :--- |
| Pin Number | 21 |
| Pin Name | A3 |
| Pin Alternate Name | D16 |
| Description | A3 Analog in, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 22 TX
|   | Details |
| :--- | :--- |
| Pin Number | 22 |
| Pin Name | TX |
| Pin Alternate Name | D9 |
| Description | Serial TX, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| UART serial | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 23 GND
|   | Details |
| :--- | :--- |
| Pin Number | 23 |
| Pin Name | GND |
| Description | Ground. |
#### 24 RX
|   | Details |
| :--- | :--- |
| Pin Number | 24 |
| Pin Name | RX |
| Pin Alternate Name | D10 |
| Description | Serial RX, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| UART serial | RX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 25 A4
|   | Details |
| :--- | :--- |
| Pin Number | 25 |
| Pin Name | A4 |
| Pin Alternate Name | D15 |
| Description | A4 Analog in, GPIO, PMIC and fuel gauge interrupt via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 26 CTS
|   | Details |
| :--- | :--- |
| Pin Number | 26 |
| Pin Name | CTS |
| Pin Alternate Name | D3 |
| Description | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL, SD card SPI SD_MO via jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| UART serial | CTS. Use Serial1 object. |
| SPI interface | MOSI. Use SPI1 object. |
| I2C interface | SCL. Use Wire1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 27 A5
|   | Details |
| :--- | :--- |
| Pin Number | 27 |
| Pin Name | A5 |
| Pin Alternate Name | D14 |
| Description | A5 Analog in, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 28 RTS
|   | Details |
| :--- | :--- |
| Pin Number | 28 |
| Pin Name | RTS |
| Pin Alternate Name | D2 |
| Description | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA, SD card SPI SD_CK via jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| UART serial | RTS. Use Serial1 object. |
| SPI interface | SCK. Use SPI1 object. |
| I2C interface | SDA. Use Wire1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 29 A6
|   | Details |
| :--- | :--- |
| Pin Number | 29 |
| Pin Name | A6 |
| Description | A6 Analog in, PWM, GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 30 SOM0
|   | Details |
| :--- | :--- |
| Pin Number | 30 |
| Pin Name | SOM0 |
| Pin Alternate Name | CELL USBD+ |
| Description | Cellular Modem USB Data+. Also connected to CELLULAR_USB micro B connector with jumper on J13. |
| Input is 5V Tolerant | Yes |
#### 31 A7
|   | Details |
| :--- | :--- |
| Pin Number | 31 |
| Pin Name | A7 |
| Description | A7 Analog in, GPIO, Ethernet Reset |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogRead | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 32 SOM1
|   | Details |
| :--- | :--- |
| Pin Number | 32 |
| Pin Name | SOM1 |
| Pin Alternate Name | CELL USBD- |
| Description | Cellular Modem USB Data-. Also connected to CELLULAR_USB micro B connector with jumper on J13. |
| Input is 5V Tolerant | Yes |
#### 33 GND
|   | Details |
| :--- | :--- |
| Pin Number | 33 |
| Pin Name | GND |
| Description | Ground. |
#### 34 CS
|   | Details |
| :--- | :--- |
| Pin Number | 34 |
| Pin Name | CS |
| Pin Alternate Name | D8 |
| Description | GPIO, SPI SS, Ethernet CS via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 35 SOM14
|   | Details |
| :--- | :--- |
| Pin Number | 35 |
| Pin Name | SOM14 |
| Description | M.2 pin 51. Not currently used, leave unconnected. |
#### 36 MISO
|   | Details |
| :--- | :--- |
| Pin Number | 36 |
| Pin Name | MISO |
| Pin Alternate Name | D11 |
| Description | SPI MISO, GPIO, Ethernet via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| SPI interface | MISO. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 37 SOM15
|   | Details |
| :--- | :--- |
| Pin Number | 37 |
| Pin Name | SOM15 |
| Description | M.2 pin 53. Not currently used, leave unconnected. |
#### 38 MOSI
|   | Details |
| :--- | :--- |
| Pin Number | 38 |
| Pin Name | MOSI |
| Pin Alternate Name | D12 |
| Description | SPI MOSI, GPIO, Ethernet via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| SPI interface | MOSI. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 39 SOM16
|   | Details |
| :--- | :--- |
| Pin Number | 39 |
| Pin Name | SOM16 |
| Description | M.2 pin 55. Not currently used, leave unconnected. |
#### 40 SCK
|   | Details |
| :--- | :--- |
| Pin Number | 40 |
| Pin Name | SCK |
| Pin Alternate Name | D13 |
| Description | SPI SCK, GPIO, Ethernet via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| SPI interface | SCK. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 41 SOM17
|   | Details |
| :--- | :--- |
| Pin Number | 41 |
| Pin Name | SOM17 |
| Description | M.2 pin 57. Not currently used, leave unconnected. |
#### 42 GND
|   | Details |
| :--- | :--- |
| Pin Number | 42 |
| Pin Name | GND |
| Description | Ground. |
#### 43 SOM18
|   | Details |
| :--- | :--- |
| Pin Number | 43 |
| Pin Name | SOM18 |
| Description | M.2 pin 59. Not currently used, leave unconnected. |
#### 44 SOM12
|   | Details |
| :--- | :--- |
| Pin Number | 44 |
| Pin Name | SOM12 |
| Description | M.2 pin 58. Not currently used, leave unconnected. |
#### 45 R
|   | Details |
| :--- | :--- |
| Pin Number | 45 |
| Pin Name | R |
| Pin Alternate Name | RGBR |
| Description | RGB LED Red |
#### 46 SOM13
|   | Details |
| :--- | :--- |
| Pin Number | 46 |
| Pin Name | SOM13 |
| Description | M.2 pin 60. Not currently used, leave unconnected. |
#### 47 G
|   | Details |
| :--- | :--- |
| Pin Number | 47 |
| Pin Name | G |
| Pin Alternate Name | RGBG |
| Description | RGB LED Green |
#### 48 GPIO0
|   | Details |
| :--- | :--- |
| Pin Number | 48 |
| Pin Name | GPIO0 |
| Pin Alternate Name | D22 |
| Description | GPIO, Ethernet INT via jumper on J13 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 49 B
|   | Details |
| :--- | :--- |
| Pin Number | 49 |
| Pin Name | B |
| Pin Alternate Name | RGBB |
| Description | RGB LED Blue |
#### 50 GPIO1
|   | Details |
| :--- | :--- |
| Pin Number | 50 |
| Pin Name | GPIO1 |
| Pin Alternate Name | D23 |
| Description | GPIO |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 51 SOM5
|   | Details |
| :--- | :--- |
| Pin Number | 51 |
| Pin Name | SOM5 |
| Pin Alternate Name | SIM_VCC |
| Description | Leave unconnected. External SIM support is not available on B SoM. |
#### 52 PWM0
|   | Details |
| :--- | :--- |
| Pin Number | 52 |
| Pin Name | PWM0 |
| Pin Alternate Name | D4 |
| Description | SPI1 MISO, PWM, GPIO, SD card SPI SD_MI via jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. |
| SPI interface | MISO. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 53 SOM6
|   | Details |
| :--- | :--- |
| Pin Number | 53 |
| Pin Name | SOM6 |
| Pin Alternate Name | SIM_RST |
| Description | Leave unconnected. External SIM support is not available on B SoM. |
#### 54 PWM1
|   | Details |
| :--- | :--- |
| Pin Number | 54 |
| Pin Name | PWM1 |
| Pin Alternate Name | D5 |
| Description | PWM, GPIO, SD card SPI SD_CS via jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 55 SOM7
|   | Details |
| :--- | :--- |
| Pin Number | 55 |
| Pin Name | SOM7 |
| Pin Alternate Name | SIM_CLK |
| Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. |
#### 56 PWM2
|   | Details |
| :--- | :--- |
| Pin Number | 56 |
| Pin Name | PWM2 |
| Pin Alternate Name | D6 |
| Description | PWM, GPIO, SD card SPI SD_DET via jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogWrite (PWM) | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 57 SOM8
|   | Details |
| :--- | :--- |
| Pin Number | 57 |
| Pin Name | SOM8 |
| Pin Alternate Name | SIM_DATA |
| Description | Leave unconnected. External SIM support is not available on B SoM. |
#### 58 PWM3
|   | Details |
| :--- | :--- |
| Pin Number | 58 |
| Pin Name | PWM3 |
| Pin Alternate Name | D7 |
| Description | PWM, GPIO, Blue LED via USER_D7 jumper J12 |
| Supports digitalRead | Yes |
| Supports digitalWrite | Yes |
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. |
| Internal pull-up or pull-down resistance | 13K |
#### 59 GND
|   | Details |
| :--- | :--- |
| Pin Number | 59 |
| Pin Name | GND |
| Description | Ground. |
#### 60 SOM9
|   | Details |
| :--- | :--- |
| Pin Number | 60 |
| Pin Name | SOM9 |
| Description | M.2 pin 75. Not currently used, leave unconnected. |


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
