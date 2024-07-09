---
title: Muon datasheet
columns: two
layout: commonTwo.hbs
description: Muon datasheet
---

# Muon datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary overview of the Muon. A full datasheet will be released at a later date.
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

### Features

{{imageOverlay src="/assets/images/m-series/muon-labeled.png" alt="Features labeled" class="full-width"}}

| Label | Feature |
| :---: | :--- |
|  1 | M SoM |
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

## Expansion card

The Muon can be expanded in several ways:

- Qwiic or Stemma-QT I2C peripherals
- Dupont wires or ribbon cables to a solderless breadboard
- A custom expansion card that sits on top of the Muon

### Custom expansion cards

{{imageOverlay src="/assets/images/m-series/muon-dims2.png" alt="Expansion card dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>

The expansion card is intended to be 65mm x 56mm and connects to the Muon using a 40-pin female socket (0.1" pitch, 2x20). The expansion card has a female socket on the bottom that mates with the male header pins on the top of the Muon. It's a "hat" configuration.

The sample design uses a PTH (through-hole) female socket for strength and to make it easier to assemble with SMD components on the top of the expansion card, but you can use a SMD header reflowed to bottom instead if you prefer.


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
