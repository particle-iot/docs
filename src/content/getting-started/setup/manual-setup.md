---
title: Manual setup
columns: two
layout: commonTwo.hbs
description: Manual setup
includeDefinitions: [api-helper, api-helper-extras]
---

# {{title}}

We highly recommend using the [web-based setup](https://setup.particle.io/) as it is automatic and significantly easier to use, however you can also use the following steps to set up your device manually.

Note that these instructions are intended to be used to set up individual developer devices, not product fleets, though there are some common steps.

## Prerequisites 

- Manual setup requires a Windows, Linux, or Mac computer. It cannot be completed on a phone, tablet, or Chromebook.

- You must install the [Particle CLI](/getting-started/developer-tools/cli/).

- You must have a free Particle account. Sign in or sign up here:

{{> sso }}

- The setup process will configure your device by USB, so you will need an appropriate USB cable to connect your device to your computer.

{{collapse op="start" label="Show device cable types" indent="32px"}}

{{!-- BEGIN do not edit content below, it is automatically generated 58997959-6743-4757-8081-18a46c2f6abf --}}

| SKU | Description | USB Cable |
| :--- | :--- | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Micro B |
| ARG-LDKT | Argon Leak Detection Kit [x1] | Micro B |
| ARG-STRTKT | Argon Starter Kit [x1] | Micro B |
| ARGN-H | Argon [x1] | Micro B |
| ARGNKIT | Argon, Starter Kit  [x1] | Micro B |
| ASSET2GV2 | Asset Tracker 2G | Micro B |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Micro B |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Micro B |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Micro B |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Micro B |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Micro B |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Micro B |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Micro B |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Micro B |
| E350KIT | Electron 2G Kit (Global) | Micro B |
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | Micro B |
| E404KIT | E Series LTE CAT-M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Micro B |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | USB-C |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | USB-C |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | USB-C |
| ONE404XMEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | USB-C |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | USB-C |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | USB-C |
| ONE524XMEA | Tracker One CAT1/3G/2G (Europe, EtherSIM), [x1] | USB-C |
| PHN2KIT | Photon 2, Kit [x1] | Micro B |
| PHN2MEA | Photon 2, [x1] | Micro B |
| PHOTONH | Photon with Headers, [x1] | Micro B |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | Micro B |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | Micro B |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Micro B |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Micro B |
| SPKBTTN | Internet Button, [x1] | Micro B |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | USB-C |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| T404XMKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | Micro B |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | Micro B |
| T524XMKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | Micro B |


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}


- Cellular devices with a 2G/3G or LTE/2G/3G cellular modem require a battery.

{{collapse op="start" label="Show device battery requirement" indent="32px"}}


{{!-- BEGIN do not edit content below, it is automatically generated 4db96e4d-e7bd-4f43-a5dc-2c1db07fd338 --}}

| SKU | Description | Battery Required |
| :--- | :--- | :---: |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | &nbsp; |
| ARG-LDKT | Argon Leak Detection Kit [x1] | &nbsp; |
| ARG-STRTKT | Argon Starter Kit [x1] | &nbsp; |
| ARGN-H | Argon [x1] | &nbsp; |
| ARGNKIT | Argon, Starter Kit  [x1] | &nbsp; |
| ASSET2GV2 | Asset Tracker 2G | &check; |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | &check; |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | &check; |
| B402MEA | B Series LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| B404MEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| B404XMEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| B523MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | &check; |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | &check; |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | &check; |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | &check; |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | &nbsp; |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | &nbsp; |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | &nbsp; |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | &nbsp; |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | &check; |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | &check; |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | &check; |
| E310MOD1 | E Series 2G/3G (Global - E310), [x1] | &check; |
| E313EA | E Series 2G/3G (Global - E313), [x1] | &check; |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | &check; |
| E314MOD1 | E Series 2G/3G (Global - E314), [x1] | &check; |
| E350KIT | Electron 2G Kit (Global) | &check; |
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | &nbsp; |
| E402MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| E404KIT | E Series LTE CAT-M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | &nbsp; |
| E404MOD1 | E Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | &nbsp; |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| ONE404XMEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | &check; |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| ONE524XMEA | Tracker One CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| PHN2KIT | Photon 2, Kit [x1] | &nbsp; |
| PHN2MEA | Photon 2, [x1] | &nbsp; |
| PHOTONH | Photon with Headers, [x1] | &nbsp; |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | &nbsp; |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | &nbsp; |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | &check; |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | &check; |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | &nbsp; |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | &nbsp; |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | &nbsp; |
| T404XMEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| T404XMKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | &nbsp; |
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | &check; |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | &check; |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | &check; |
| T524XMEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| T524XMKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | &check; |


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}

## Create a product

Particle devices can be used in a product, or as sandbox developer devices. Even if you are not planning on creating a commercial product, using a product makes it possible to:

- Use Device Vitals to get connectivity and battery information about your devices remotely
- Flash code on wake from sleep
- Allow controlled access to your devices by other users, if desired
- Group devices


## Add your device to your product

## Claim your device

## Configure Wi-Fi

## Test your device
