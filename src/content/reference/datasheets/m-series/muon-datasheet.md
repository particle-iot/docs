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

The Muon is a developer kit based on the M SoM with additional peripherals for easy prototyping.

- LoRaWAN module (Quectel KG200Z, 862 – 928 MHz)
- 96-pin expansion connector
- Temperature sensor (TMP112A)
- Configuration EEPROM (24CW640T)
- Real-time clock and watchdog chip (AM1805)
- Reset and mode buttons
- RGB status LED
- Power input options
  - USB-C
  - VIN (6-12 VDC)
  - LiPo battery with temperature sensor (3-pin JST-PH)

### M SoM

The Muon contains a Particle M SoM that the following functional units:
 
- M.2 SoM form-factor, like the B Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - Quectel BG95-M5 LTE Cat M1 (North America)
  - Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)


### MCU

The Realtek RTL8722DM is in the same family as the P2 and Photon 2 modules (RTL8721DM), but has additional GPIO.

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - U.FL connector for external antenna
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8722DM MCU
  - ARM Cortex M33 CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 3072 KB (3 MB) of RAM available to user applications
- 2 MB flash file system
- FCC (United States), ISED (Canada), and CE (European Union) certified

### Block diagram

{{imageOverlay src="/assets/images/m-series/muon-block-diagram.png" alt="Block diagram" class="full-width"}}

### Device families

| | Cellular Only | Cellular & Wi-Fi | Wi-Fi Only |
| :--- | :---: | :---: | :---: |
| Developer devices | Boron | Muon | Photon 2 |
| Production module | B SoM | M SoM | P2 |
