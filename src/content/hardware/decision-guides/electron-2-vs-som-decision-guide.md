---
title: Electron 2 vs. SoM decision guide
layout: commonTwo.hbs
columns: two
description: Deciding between the Electron 2 and B-SoM or M-SoM devices
---

# {{title}}

{{migration-guide type="question" leftImg="/assets/images/electron-2/electron-2-rendering.png" rightImg="/assets/images/b-series/b-series-top.png"}}

<p class="attribution">Pictures are not the same scale</p>


## Basic differences

|      | Electron 2 | B-SoM | M-SoM | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| [Form factor](#form-factor) | [Feather](#feather) | [M.2 SoM](#m2-som) | M.2 SoM | Feather |
| Cellular | &check; | &check; | &check; | |
| Wi-Fi | | | &check; | &check; |
| Breadboard compatible | &check; | | | &check; |
| Base board | Optional | Required | Required | Optional |
| [MCU](#mcu-differences) | nRF52840 | nRF5240 | RTL8722DM | RTL8721DM |
| Maximum application | 256 KB | 256 KB | 2048 KB | 2048 KB |
| Available RAM | 80 KB | 80 KB | 3072 KB | 3072 KB |
| USB connector | On module | On base board<sup>1</sup> |On base board<sup>1</sup> | On module |
| RGB LED | On module | On base board<sup>1</sup> | On base board<sup>1</sup> | On module |
| Reset and mode buttons | On module | On base board<sup>1</sup> | On base board<sup>1</sup> | On module |
| Li-Po battery connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | On module |
| PMIC | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | |
| Fuel gauge | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | |
| Cellular antenna | External (U.FL) | External (U.FL) | External (U.FL) | | |
| Wi-Fi antenna | | | Chip or External (U.FL) | Chip or External (U.FL) |
| BLE antenna | Chip or External (U.FL) | External (U.FL) or <sup>2</sup> | External (U.FL) | Chip or External (U.FL) |
| NFC antenna | External (U.FL) | On base board<sup>2</sup> | | |
| SWD debug connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | On module |

- <sup>1</sup> Optional but recommended on base board
- <sup>2</sup> Optional on base board, can be omitted if not needed

## Connectivity differences

|      | ELC504EM | ELC524EM | B504 | B404X | B524 | M404 | M524 | PHN2 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Line | Electron 2 | Electron 2 | B-SoM | B-SoM | B-SoM | M-SoM | M-SoM | P2 |
| Form-factor | [Feather](#feather) | Feather | [M.2 SoM](#m2-som) | M.2 SoM | M.2 SoM | M.2 SoM | M.2 SoM | Feather | 
| [Region](#cellular-bands-and-regions) | [Americas](#americas) | [EMEAA](#emeaa) | [NorAm](#noram) | Americas |  EMEAA | NorAm | EMEAA | All |
| [LTE](#cellular-technologies) | Cat 1 bis | Cat 1 bis | Cat 1 | Cat M1 | Cat 1 | Cat M1 | Cat 1 | |
| 3G | | | &check; | | &check; | | &check; | |
| 2G | | | | | &check; | | &check; | |
| Wi-Fi | | | | | | &check; | &check; | &check; |
| [GNSS](#gnss) | | | &check; | | | &check; | &check; | |
| Cellular modem | EG800Q-NA | EG800Q-EU | EG91-NAX | R510 | EG91-E | BG95-M5 | EG91-EX | |
| Cellular manufacturer | Quectel | Quectel | Quectel | u-blox | Quectel | Quectel | Quectel | |
| [MCU](#mcu-differences) | nRF52840 | nRF52840 | nRF52840 | nRF52840 | nRF52840 | RTL8722DM | RTL8722DM | RTL8721DM |
| Power consumption | Low | Low | Low | Lowest | Low | High | Highest | Medium |

## Cellular bands and regions

### Cellular bands

There are a large number of cellular bands available, and are generally divided into bands used in the Americas,
and bands used in Europe, Middle East, Africa, and Asia (EMEAA). These are popular LTE bands, and there is 
very little overlap.

| Region    | 1     | 2     | 3     | 4     | 5     | 7     | 8     | 12    | 13    | 20    | 28    | 66    |
| :-------  | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Frequency | 2100  | 1900  | 1800  | 1700  | 850   | 2600  | 900   | 700   | 700   | 800   | 700   | 1700  |
| NorAm     |       |&check;|       |&check;|&check;|               |&check;|&check;|               |&check;|
| EMEAA     |&check;|       |&check;|       |&check;|&check;|&check;|               |&check;|&check;|       |
 
To make things more complicated, South America uses a mix of Americas and EMEAA frequencies, depending on 
the country. There are also many more bands than these; Japan and China use a large number of less common bands.

It's important to note that not every cellular tower will carry every frequency used in a country. Additionally,
lower frequencies can travel longer distances so often 700 and 850 MHz are used in rural areas so the towers
can be farther apart.

While this table shows LTE frequencies and bands, similar divisions also apply to 2G and 3G.

### NorAm

NorAm devices are intended for use in North America: United States, Canada, and Mexico. 

In most cases, these are LTE Cat M1 devices, and are only officially supported in these three countries.

{{collapse op="start" label="Show NorAm SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated bfde3ce5-1f90-40fe-9bba-481cdc5b89bd --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### Americas

The ELC504EM uses LTE Cat 1 with Americas frequencies, which is more widely supported outside of NorAm. 

The complication is in South America, where a number of countries use EMEAA frequencies instead of Americas frequencies.


{{collapse op="start" label="Show Americas SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated be8173dc-011c-4719-ae3e-9bba199849a8 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | In development |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### EMEAA

The ELC524EM uses LTE Cat 1 with EMEAA frequencies, which is compatible in most of Europe, Middle East, Africa, and 
Africa, as well as some countries in South America.

The ELC524EM only supports LTE Cat 1 and does not support 2G/3G fallback, as the B524 and M524 do. This can be a problem
in some countries, particularly in Africa, that have not fully deployed 4G/LTE.


{{collapse op="start" label="Show EMEAA SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 6a8ccfd8-0058-481f-bcd3-2a78b88a3e82 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | In development |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | In development |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}



## Cellular technologies

### LTE Cat 1

LTE Cat 1 is the same technology used for 4G/LTE mobile phone data, and is the most commonly deployed technology in
most of the world.


{{collapse op="start" label="Show LTE Cat 1 SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 4cffddb7-1c7e-4ddb-a8a9-098c947fe543 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | GA |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | GA |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | GA |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | GA |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | NRND |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | GA |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### LTE Cat 1 bis

LTE Cat 1 bis is a simplified version of LTE Cat 1 intended for IoT applications. It uses a single antenna, is intended
for low-power devices, and the simplifications make the radio less expensive. It's fully compatible with LTE Cat 1, however,
and does not require any tower-side changes, making it available anywhere LTE Cat 1 (4G) is available. It also has the
same maximum data rate as LTE Cat 1.



{{collapse op="start" label="Show LTE Cat 1 bis SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated e31c7f1f-7d9a-4fac-8490-e3256845d215 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | In development |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | In development |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | In development |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### LTE Cat M1

LTE Cat M1 is subset of 4G/LTE intended for low-power and low-cost IoT devices. It's widely deployed in the United States,
Canada, and Mexico (NorAm). There is limited coverage in Europe, though it is available in the United Kingdom and Australia.

If you are deploying a low-power device in the United States, this can be a good choice. Additional large-scale deployments
of LTE Cat M1 are less likely with the adoption of LTE Cat 1 bis instead.

{{collapse op="start" label="Show LTE Cat M1 SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 521a2be9-7d36-4cf9-9996-1b59720d07b8 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |
| E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NRND |
| E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NRND |
| E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NRND |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | GA |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | In development |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | GA |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | GA |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | In development |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | GA |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NRND |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | GA |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | GA |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### 2G/3G

The older 2G and 3G technologies are being phased out ("sunset") around the world. The shutdown is already complete in the United States,
Australia, and Japan, and will occur soon in Canada.

Additionally, 3G requires more power than 4G/LTE. 2G requires even more than 3G.

The phase-out or sunset of 2G and 3G varies by country in carrier.

In most of Europe, 3G has been or will be phased out first, leaving 2G services.

In many other areas, 2G was or will be phased out first, leaving 3G.

Particle devices with cellular modems with only 2G and 3G have already been deprecated. The [LTE Cat 1](#lte-cat-1)
devices above can also 2G/3G fallback.

### Other technologies

#### 5G

Only the Tachyon device supports 5G.

For IoT use-cases, 5G generally unnecessary as 4G/LTE data rates are sufficient, and no carriers have a plan to sunset
4G/LTE at this time.


#### LTE higher Cat

The Tachyon supports up to LTE Cat 14, which is much faster than LTE Cat 1. Not all towers support the highest Cat speeds,
but all are backward compatible to LTE Cat 1.

This is different than LTE Cat M1 or LTE Cat NB1 which requires specific support for those technologies.

#### LTE Cat NB1

LTE Cat NB1 is a variation intended for IoT devices, however the data rate is so low that it does not support the ability 
to do OTA flashing of firmware, and is not supported on any Particle devices.

It's more common in Europe, but still not widely deployed and large-scale deployments are unlikely with the adoption of
LTE Cat 1 bis instead.

## Form factor

### Feather

The Electron 2, Boron, and Photon 2 comply with the  
[Adafruit Feather specification](https://learn.adafruit.com/adafruit-feather/feather-specification).
 
All Feather devices have pins on the bottom that plug into a breadboard or baseboard. There are a large number 
of available base boards off-the-shelf that implement features such as sensors, displays, relays, etc., 
eliminating the need for a custom-designed board in some cases.

{{imageOverlay src="/assets/images/boron/boron-dimensions.png" alt="Feather dimensions"}}

The [Feather page](/hardware/expansion/feather/) includes examples of Feather accessories.

![Feather](/assets/images/gps-display-featherwing.jpg)

{{collapse op="start" label="Show Feather SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated c7f6eddb-bbdf-41c9-99e3-69a9f90a834a --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | NRND |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | In development |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | In development |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | In development |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | In development |
| PHN2KIT | Photon 2, Kit [x1] | GA |
| PHN2MEA | Photon 2 [x1] | GA |
| PHN2MTY | Photon 2, Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}



### M.2 SoM

The Particle M.2 SoM allows each swapping between modules and the screw-down module is 
generally vibration-resistant. 

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="M.2 dimensions"}}

The SoM does not include features like USB, RGB LED, buttons, and a power supply on the module itself;
you are expected to include this on the base board, which is required.

The Particle M.2 module is not compatible with computer-based M.2 sockets that are used for
NVMe, PCI Express (PCIe), etc. and requires a base board specifically designed for Particle M.2.

While a custom board is generally required, there are some off-the-shelf options such as:

| Board | B-SoM compatible | M-SoM compatible |
| :--- | :---: | :---: |
| [Particle M.2 breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/) | &check; | &check; |
| [Mikroe Gen 3 SoM shield](/hardware/expansion/mikroe/#gen-3-som-shield) | &check; | |

{{collapse op="start" label="Show M.2 SoM SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated f13e8e51-ccb7-4e3c-bac1-4a7d4457b55b --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


## MCU differences

Across these devices there are two different MCU used. While software can generally be compiled for each 
platform, each platform has differences in amount of available RAM and maximum application size.

### nRF52840 (Gen 3)

- Best for low-power applications
- Limited RAM and flash size
- ARM Cortex M4F CPU, 64 MHz
- 80 KB RAM available to user applications
- 256 KB maximum application size

{{collapse op="start" label="Show nRF52840 SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated a4b614a6-b9c8-44c3-921e-548c45280ab7 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | NRND |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | GA |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | In development |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | In development |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | In development |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | In development |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | In development |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | GA |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | GA |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | GA |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | GA |
| P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | GA |
| P2REEL | P2 Wi-Fi Module, Reel [x600] | GA |
| PHN2KIT | Photon 2, Kit [x1] | GA |
| PHN2MEA | Photon 2 [x1] | GA |
| PHN2MTY | Photon 2, Tray [x50] | GA |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NRND |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | GA |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | GA |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | GA |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | NRND |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | GA |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### RTL8721DM/RTL8722DM (Gen 4)

- Best for computation, such as machine learning applications such as inferencing
- Larger RAM and flash size
- ARM Cortex M33 CPU, 200 MHz
- 3072 KB RAM available to user applications
- 2048 KB maximum application size

{{collapse op="start" label="Show RTL872x SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 280bbf98-939d-41db-b3b8-a64042687b30 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | GA |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | GA |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | GA |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | GA |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | In development |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### Electron 2 and Photon 2 interoperability

Between the Electron 2 and Photon 2, there are differences in the pins used for PWM, and some
differences in other ports. These can sometimes be worked around easily, but sometimes not. For example,
it's not possible use SPI1 interchangeably between the Electron 2 and Photon 2 because they're on different pins.

#### Electron 2 pinout
{{imageOverlay src="/assets/images/electron-2/electron-2-pinout.svg" alt="Pinout" class="full-width"}}

#### Photon 2 pinout

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Pinout Diagram" class="full-width"}}


## GNSS

GNSS (GPS) is a geolocation technology using satellites. It's generally only viable outdoors.

Several Particle devices include built-in GNSS technology in the cellular modem module. Using it 
requires an external antenna and the antenna must have a clear view of the sky for proper 
operation.

Even if the cellular module you have selected does not contain GNSS it can easily be added with
an external module connected by serial, I2C, or SPI.

{{collapse op="start" label="Show cellular modem GNSS SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated f13e8e51-ccb7-4e3c-bac1-4a7d4457b55b --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


## Certification

If you are using the certified Particle antenna you generally will not have to do intentional
radiator testing, which is the most complicated and most common certification test.

You will, however, have to do unintentional radiator testing, and it must be repeated for
all modules if you swap between different modules based on region or required connectivity. 
This is the least expensive and easiest certification, however.
