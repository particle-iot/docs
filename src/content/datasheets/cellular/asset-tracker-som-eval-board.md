---
title: Asset Tracker SoM Evaluation Board
layout: datasheet.hbs
columns: two
order: 5
description: Datasheet for the Particle Asset Tracker SoM evaluation board
---

# Asset Tracker SoM Evaluation Board

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/asset-tracker-som-eval-board.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

This is a breakout board for Particle's Asset Tracker SoM. The Asset Tracker Cellular GNSS module is a castellated system-on-a-module that can either be reflow soldered to your own custom base board, or can be used in this evaluation board or the carrier board.

**TODO: Create repo and update URL**
The Eagle CAD design files, Gerber files, and bill of materials can be found in the [SoM eval board Github repository](https://github.com/particle-iot/som-eval-board).

## Block Diagram

**TODO: New block diagram**
![Block Diagram](/assets/images/b-series/b-series-eval-block.png)


## Description

**TODO: New graphic**

<div align=center><img src="/assets/images/b-series/b-series-eval-labeled.png"></div>


**TODO: New list**

| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
|  1 | GNSS USB | u-blox GNSS USB connection | 
|  2 | CELL USB | Quectel cellular modem USB connection |
|  3 | JTAG | JTAG/SWD debugging connector for nRF52 MCU |
|  4 | NFC | NFC antenna connection for NFC tag feature |
|  5 | MODE | MODE button | 
|  6 | RGB | RGB status LED |
|  7 | RESET | RESET button |
|  8 | MCU_USB | nRF52 MCU USB for debugging. Can also power the SoM. |
|  9 | STAT LED | Charge status indicator. |
| 10 | J9 | STAT LED jumper. Normally installed, remove to disable STAT LED. |
| 11 | 3V3 LED | Power LED, indicates 3.3V supply is enabled. |
| 12 | J8 | 3V3 LED jumper. Normally installed, remove to disable 3V3 LED. | 
| 13 | VIN | External power 5-12 VDC |
| 14 | LiPo | JST-PH connector for LiPo battery |
| 15 | S4 | Battery switch |
| 16 | S6 | SoM power switch |
| 17 | | Expansion connector |
| 18 | J10 | Grove connector (A0, A1) |
| 19 | J11 | Grove connector (A2, A3) |
| 20 | S5 | RTC battery switch |
| 21 | RTC battery | Optional battery |
| 22 | J4 | CAN data connection and 3.3V power output |
| 23 | J5 | JTAG power jumper. Install to allow the MCU to be powered by the JTAG port. |


### Expansion Connector

| Left Description | Left |  | Right | Right Description |
| ---: | :---: | :---: | :---: | :--- |
| Ground | GND | | GND | Ground |
| PMIC power out | PMID | | LI+ | LiPo battery |
| PMIC thermistor | TS | | VBUS | nRF52 USB power |
| 3.3V Out | 3V3 | | STAT | PMIC charge status |
| Unused | SOM44 | | VIN | Power input 5-12V |
| Ground | GND | | GND | Ground |
| A4, D4, SPI MOSI | A4 | | A0 | A0, D0, Wire SDA |
| A5, D5, SPI MISO | A5 | | A1 | A1, D1, Wire SCL |
| A6, D6, Serial1 CTS | A6 | | A2 | A2, D2, SPI SS |
| A7, D7, Serial1 RTS | A7 | | A3 | A3, D3, SPI SCK |
| Unused | SOM37 | | SOM59 | Unused |
| Unused | SOM36 | | SOM60 | Unused |
| Unused | SOM35 | | SOM61 | Unused |
| Unused | SOM34 | | SOM62 | Unused |
| 3.3V Out | 3V3 | | 3V3 | 3.3V Out |
| Ground | GND | | AGND | Analog Ground |
| RESET button | RESET | | MCU_RX | Serial1 RX, GPIO D9 |
| MODE button | MODE | | MCU_TX | Serial1 TX, GPIO D8 |
| RGB Status LED Red | R | | RTC_BAT | RTC battery |
| RGB Status LED Green | G | | RTC_BTN | RTC wake button |
| | | | | |
| RGB Status LED Blue | B | | SOM76 | Unused |
| NFC Tag Antenna | NFC1 | | SOM77 | Unused |
| NFC Tag Antenna | NFC2 | | SOM78 | Unused |
| Unused | SOM21 | | SOM79 | Unused |
| Unused | SOM20 | | SOM80 | Unused |
| Unused | SOM19 | | SOM81 | Unused |
| Unused | SOM18 | | SOM82 | Unused |
| 3.3V Out | 3V3 | | 3V3 | 3.3V Out |
| ESP32 Serial RX | WIFI_RXD | | NC |
| ESP32 Serial TX | WIFI_TXD | | CELL_RX | Cellular serial RX |
| ESP32 boot mode | WIFI_BOOT | | CELL_TX | Cellular serial TX |
| ESP32 enable | WIFI_EN | | CELL_RI | Cellular ring indicator | 
| Unused | SOM9 | | GNSS_TIME_PULSE | GNSS time pulse or fix indicator |
| Ground | GND | | GND | Ground |


## Basic Setup

**TODO: Update this as necessary**

The basic setup for the B series to be operational is shown below:

- Plug the cellular antenna into the U.FL connector labeled **CELL** on the SoM. Remember never to power up this board without the antenna being connected. There is potential to damage the transmitter of the u-blox module if no antenna is connected.
- If you are going to use mobile app setup or BLE, connect the 2.4 GHz antenna (the smaller one) to the **BT** U.FL connector on the SoM.
- Connect power the USB (3) or a LiPo battery (4).
- Turn on the appropriate power switches (5).



## Evaluation Board Schematics

**TODO: Add schematics**

---

## Mechanical specifications

### Dimensions and weight

**TODO: Update this**

| Parameter | Value |
| --- | --- |
| Width |  |
| Length | |
| Thickness | | 
| Weight |  |


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 31 Mar 2020 | RK | Preview Release |

