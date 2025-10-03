---
title: Electron 2 vs. SoM decision guide
layout: commonTwo.hbs
columns: two
description: Deciding between the Electron 2 and B-SoM or M-SoM devices
---

# {{title}}

{{migration-guide type="question" leftImg="/assets/images/electron-2/electron-2-rendering.png" rightImg="/assets/images/b-series/b-series-top.png" rightStyle="transform: matrix(0.82, 0, 0, 0.82, 0, -4);"}}



## Basic differences

|      | Electron 2 | B-SoM | M-SoM | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| [Form factor](#form-factor) | [Feather](#feather) | [M.2 SoM](#m-2-som) | M.2 SoM | Feather |
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
| Cellular antenna | External<sup>3</sup> | External<sup>3</sup> | External<sup>3</sup> | | |
| Wi-Fi antenna | | | Internal or External<sup>3</sup> | Internal or External<sup>3</sup> |
| BLE antenna | Internal or External<sup>3</sup> | External<sup>3</sup> or <sup>2</sup> | External<sup>3</sup> | Internal or External<sup>3</sup> |
| NFC antenna | External<sup>3</sup> | On base board<sup>2</sup> | | |
| SWD debug connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | On module |

- <sup>1</sup> Optional but recommended on base board
- <sup>2</sup> Optional on base board, can be omitted if not needed
- <sup>3</sup> External antenna connection via U.FL connector

## Connectivity differences

|      | ELC504EM | ELC524EM | B504 | B404X | B524 | M404 | M524 | PHN2 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Line | Electron 2 | Electron 2 | B-SoM | B-SoM | B-SoM | M-SoM | M-SoM | P2 |
| Form-factor | [Feather](#feather) | Feather | [M.2 SoM](#m-2-som) | M.2 SoM | M.2 SoM | M.2 SoM | M.2 SoM | Feather | 
| [Region](#cellular-bands-and-regions) | [Americas](#americas) | [EMEAA](#emeaa) | [NorAm](#noram) | Americas |  EMEAA | NorAm | EMEAA | All |
| [LTE](#cellular-technologies) | Cat 1 bis | Cat 1 bis | Cat 1 | Cat M1 | Cat 1 | Cat M1 | Cat 1 | |
| 3G | | | &check; | | &check; | | &check; | |
| 2G | | | | | &check; | | &check; | |
| Wi-Fi | | | | | | &check; | &check; | &check; |
| [GNSS](#gnss) | | | &check; | | | &check; | &check; | |
| Cellular modem | EG800Q-NA | EG800Q-EU | EG91-NAX | R510 | EG91-E | BG95-M5 | EG91-EX | |
| Cellular manufacturer | Quectel | Quectel | Quectel | u-blox | Quectel | Quectel | Quectel | |
| [MCU](#mcu-differences) | nRF52840 | nRF52840 | nRF52840 | nRF52840 | nRF52840 | RTL8722DM | RTL8722DM | RTL8721DM |
| Power consumption | Low | Low | Low | Low | Low | High | Highest | Medium |

## Cellular bands and regions

### Cellular bands

There are a large number of cellular bands available, and are generally divided into bands used in the Americas,
and bands used in Europe, Middle East, Africa, and Asia (EMEAA). These are popular LTE bands, and there is 
very little overlap.

| Region    | 1     | 2     | 3     | 4     | 5     | 7     | 8     | 12    | 13    | 20    | 28    | 66    |
| :-------  | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Frequency | 2100  | 1900  | 1800  | 1700  | 850   | 2600  | 900   | 700   | 700   | 800   | 700   | 1700  |
| NorAm     |       |&check;|       |&check;|&check;|       |       |&check;|&check;|       |       |&check;|
| EMEAA     |&check;|       |&check;|       |&check;|&check;|&check;|       |       |&check;|&check;|       |
 
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
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | GA |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | NRND |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### Americas

The ELC504EM uses LTE Cat 1 with Americas frequencies, which is more widely supported outside of NorAm. 

The complication is in South America, where a number of countries use EMEAA frequencies instead of Americas frequencies.


{{collapse op="start" label="Show Americas SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated be8173dc-011c-4719-ae3e-9bba199849a8 --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | GA |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | In development |


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
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | In development |
| [M524MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | GA |
| [M524MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}



## Cellular technologies

### LTE Cat 1

LTE Cat 1 is the same technology used for 4G/LTE mobile phone data, and is the most commonly deployed technology in
most of the world.


{{collapse op="start" label="Show LTE Cat 1 SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 4cffddb7-1c7e-4ddb-a8a9-098c947fe543 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | americas | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | noram | GA |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | emeaa | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | emeaa | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M524MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [M524MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [MON524E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | emeaa | GA |
| [MUON524](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | global | GA |
| [MUON524EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | global | GA |
| [ONE523MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe), [x1] | emeaa | GA |
| [ONE523MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | emeaa | GA |
| [ONE524MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [ONE524MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | emeaa | GA |
| [T523MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | emeaa | NRND |
| [T524MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [T524MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | emeaa | GA |
| [T524MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### LTE Cat 1 bis

LTE Cat 1 bis is a simplified version of LTE Cat 1 intended for IoT applications. It uses a single antenna, is intended
for low-power devices, and the simplifications make the radio less expensive. It's fully compatible with LTE Cat 1, however,
and does not require any tower-side changes, making it available anywhere LTE Cat 1 (4G) is available. It also has the
same maximum data rate as LTE Cat 1.

{{collapse op="start" label="Show LTE Cat 1 bis SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated e31c7f1f-7d9a-4fac-8490-e3256845d215 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | americas | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | americas | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | emeaa | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | emeaa | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}

The Particle devices with LTE Cat 1 bis cellular modems do not support 2G/3G fallback. For a comparison of cellular technologies 
used by country, see [Country compatibility](#country-compatibility), below.

### LTE Cat M1

LTE Cat M1 is subset of 4G/LTE intended for low-power and low-cost IoT devices. It's widely deployed in the United States,
Canada, and Mexico (NorAm). There is limited coverage in Europe, though it is available in the United Kingdom and Australia
on a subset of the available carriers.

If you are deploying a low-power device in the United States, this can be a good choice, however the difference in power
consumption between LTE Cat M1 and LTE Cat 1 bis is not very large.

Additional large-scale deployments of LTE Cat M1 in other countries are less likely with the adoption of LTE Cat 1 bis instead.

{{collapse op="start" label="Show LTE Cat M1 SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated 521a2be9-7d36-4cf9-9996-1b59720d07b8 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | noram | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | NRND |
| [BRN404XKIT](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | noram | GA |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | GA |
| [E402KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | noram | NRND |
| [E402TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), Tray [x50] | noram | NRND |
| [E404KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | noram | NRND |
| [E404MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE-M (NorAm, EtherSIM), [x1] | noram | NRND |
| [E404XTRAY50](/reference/datasheets/e-series/e404x-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [M404MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), [x1] | global | GA |
| [M404MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | global | GA |
| [M635EMEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [M635MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [MON404E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | noram | GA |
| [MON404E02C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | noram | In development |
| [MUON404](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | global | GA |
| [MUON404EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | global | GA |
| [MUON635](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | global | In development |
| [MUON635EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [ONE404MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | noram | GA |
| [ONE404MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | noram | GA |
| [T402MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm), Tray [x50] | noram | NRND |
| [T404MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | noram | GA |
| [T404MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | noram | GA |
| [T404MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | noram | GA |


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

For additional information, see the [2G/3G sunset](/reference/discontinued/cellular/2g-3g-sunset/) page.

### Other technologies

#### 5G

Only the Tachyon device supports 5G.

For IoT use-cases, 5G generally unnecessary as 4G/LTE data rates are sufficient, and no carriers have a plan to sunset
4G/LTE at this time.


#### LTE higher Cat

The Tachyon supports up to LTE Cat 14, which is much faster than LTE Cat 1. Not all towers support the highest Cat speeds,
but all are backward compatible to LTE Cat 1.

This is different than LTE Cat M1 or LTE Cat NB1 which requires specific support for those technologies by the carrier.

#### LTE Cat NB1

LTE Cat NB1 is a variation intended for IoT devices, however the data rate is so low that it does not support the ability 
to do OTA flashing of firmware, and is not supported on any Particle devices.

It's more common in Europe, but still not widely deployed and large-scale deployments are unlikely with the adoption of
LTE Cat 1 bis instead.

## Form factor

### Feather

The Electron 2, Boron, and Photon 2 comply with the [Adafruit Feather specification](https://learn.adafruit.com/adafruit-feather/feather-specification).
 
All Feather devices have pins on the bottom that plug into a breadboard, baseboard, doubler, or tripler. There are a large number 
of available base boards off-the-shelf that implement features such as sensors, displays, relays, etc., 
eliminating the need for a custom-designed board in some cases.

{{imageOverlay src="/assets/images/electron-2/electron-2-dimensions.png" alt="Feather dimensions"}}

{{!-- BEGIN shared-blurb 6e4375b2-8981-4e75-8572-82a138fc2a46 --}}
| Dimension | mm | inches |
| :--- | ---: | ---: |
| Width | 22.86 | 0.9 |
| Length | 50.80 | 2.0 |
| Spacing between rows of pins | 20.32 | 0.8 |
| Spacing between pins | 2.54 | 0.1 | 
| Width between holes | 17.78 | 0.7 |
| Length between holes | 45.72 | 1.8 | 
{{!-- END shared-blurb --}}


The [Feather page](/hardware/expansion/feather/) includes examples of Feather accessories.

![Feather](/assets/images/gps-display-featherwing.jpg)

{{collapse op="start" label="Show Feather SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated c7f6eddb-bbdf-41c9-99e3-69a9f90a834a --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | NRND |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | GA |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | americas | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | americas | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | emeaa | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | emeaa | In development |
| [PHN2KIT](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2, Kit [x1] | global | GA |
| [PHN2MEA](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2 [x1] | global | GA |
| [PHN2MTY](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2, Tray [x50] | global | GA |


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

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | noram | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | americas | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | noram | GA |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | emeaa | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | emeaa | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M404MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), [x1] | global | GA |
| [M404MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | global | GA |
| [M524MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [M524MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M635EMEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [M635MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |


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

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | noram | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | americas | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | noram | GA |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | emeaa | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | emeaa | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | NRND |
| [BRN404XKIT](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | noram | GA |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | noram | GA |
| [E404XTRAY50](/reference/datasheets/e-series/e404x-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | americas | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | americas | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | emeaa | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | emeaa | In development |
| [MON404E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | noram | GA |
| [MON404E02C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | noram | In development |
| [MON524E01C01KIT](/reference/datasheets/tracker/monitor-one-datasheet/) | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | emeaa | GA |
| [ONE404MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | noram | GA |
| [ONE404MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | noram | GA |
| [ONE523MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe), [x1] | emeaa | GA |
| [ONE523MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | emeaa | GA |
| [ONE524MEA](/reference/datasheets/tracker/tracker-one/) | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [ONE524MTY](/reference/datasheets/tracker/tracker-one/) | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | emeaa | GA |
| [P2MOD10](/reference/datasheets/wi-fi/p2-datasheet/) | P2 Wi-Fi Module, Cut tape [x10] | global | GA |
| [P2REEL](/reference/datasheets/wi-fi/p2-datasheet/) | P2 Wi-Fi Module, Reel [x600] | global | GA |
| [PHN2KIT](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2, Kit [x1] | global | GA |
| [PHN2MEA](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2 [x1] | global | GA |
| [PHN2MTY](/reference/datasheets/wi-fi/photon-2-datasheet/) | Photon 2, Tray [x50] | global | GA |
| [T402MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm), Tray [x50] | noram | NRND |
| [T404MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | noram | GA |
| [T404MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | noram | GA |
| [T404MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [T523MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | emeaa | NRND |
| [T524MEA](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [T524MKIT](/reference/datasheets/tracker/tracker-som-eval-board/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | emeaa | GA |
| [T524MTY](/reference/datasheets/tracker/tracker-som-datasheet/) | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |


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

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [M404MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), [x1] | global | GA |
| [M404MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | global | GA |
| [M524MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [M524MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M635EMEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [M635MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [MUON404](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | global | GA |
| [MUON404EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | global | GA |
| [MUON524](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | global | GA |
| [MUON524EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | global | GA |
| [MUON635](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | global | In development |
| [MUON635EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}


### Electron 2 and Photon 2 interoperability

Between the Electron 2 and Photon 2, there are differences in the pins used for PWM, and some
differences in other ports. These can sometimes be worked around easily, but sometimes not. For example,
it's not possible use SPI1 interchangeably between the Electron 2 and Photon 2 because they're on different pins.

#### Electron 2 pinout
{{imageOverlay src="/assets/images/electron-2/electron-2-pinout.svg" alt="Electron 2 Pinout" class="full-width"}}

#### Photon 2 pinout

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Photon 2 Pinout" class="full-width"}}

## GPIO

There are sigificantly more GPIO on M.2 SoM modules than on the Electron 2/Boron (Feather). If you have
an application that requires significant GPIO and do not want to use a GPIO expander, the M.2 SoM will
be a better choice.

#### M-SoM pinout

{{imageOverlay src="/assets/images/msom.svg" alt="M-SoM Pinout" class="full-width"}}

## Custom designs

If you have a custom design that requires a specialized power supply, a battery of a different
chemistry, etc., then using the M.2 SoM will be preferable since the PMIC and fuel gauge
features are not on the SoM and can be swapped for other components on your base board.

## GNSS

GNSS (GPS) is a geolocation technology using satellites. It's generally only viable outdoors.

Several Particle devices include built-in GNSS technology in the cellular modem module. Using it 
requires an external antenna and the antenna must have a clear view of the sky for proper 
operation.

Even if the cellular module you have selected does not contain GNSS it can easily be added with
an external module connected by serial, I2C, or SPI.

{{collapse op="start" label="Show cellular modem GNSS SKUs"}}
{{!-- BEGIN do not edit content below, it is automatically generated f13e8e51-ccb7-4e3c-bac1-4a7d4457b55b --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :---: | :--- |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | noram | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | noram | GA |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | americas | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | noram | GA |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | emeaa | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | emeaa | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M404MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), [x1] | global | GA |
| [M404MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | global | GA |
| [M524MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | emeaa | GA |
| [M524MTY](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | emeaa | GA |
| [M635EMEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |
| [M635MEA](/reference/datasheets/m-series/msom-datasheet/) | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | global | In development |


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}

## e-sim

The Electron 2 and B504e have a Particle e-sim. Other devices have a Particle MFF2 EtherSIM.

At this time, the carriers installed on the e-sim are the same as the Particle MFF2 (SMD) EtherSIM, and the e-sim is not user programmable.

The e-sim provides a path to future updates to the SIM without having to modify the hardware, however.


## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated 936be9f3-0894-4b5f-88cd-3b22ebf42fc0 --}}

<table>
<thead>
<tr><td></td><td colspan="2" style="" >ELC504EM (NorAm)</td><td width="6px;">&nbsp;</td><td colspan="2" style="" >ELC524EM (Europe)</td><td width="6px;">&nbsp;</td><td colspan="2" style="" >B504e (Americas)</td><td width="6px;">&nbsp;</td><td colspan="2" style="" >M404 (NorAm)</td><td width="6px;">&nbsp;</td><td colspan="2" style="" >M534 (EMEAA)</td></tr>
<tr><th>Country</th><th>Rec</th><th>Technologies</th><th>&nbsp;</th><th>Rec</th><th>Technologies</th><th>&nbsp;</th><th>Rec</th><th>Technologies</th><th>&nbsp;</th><th>Rec</th><th>Technologies</th><th>&nbsp;</th><th>Rec</th><th>Technologies</th></tr>
</thead>
<tbody>
<tr><td>Afghanistan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G</td></tr>
<tr><td>Albania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Algeria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Anguilla</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Antigua and Barbuda</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Argentina</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td></tr>
<tr><td>Armenia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Aruba</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Australia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td></tr>
<tr><td>Austria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Azerbaijan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Bahamas</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Bahrain</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G</td></tr>
<tr><td>Bangladesh</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Barbados</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Belarus</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Belgium</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Belize</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Bolivia</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Bosnia and Herzegovina</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 2G</td></tr>
<tr><td>Botswana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Brazil</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Brunei</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td></tr>
<tr><td>Bulgaria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Burkina Faso</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Cabo Verde</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Cambodia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Canada</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td><td>&nbsp;</td><td>✅</td><td>M1</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Cayman Islands</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Chad</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Chile</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G, 3G</td></tr>
<tr><td>Colombia</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Congo (Brazzaville)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Congo (Kinshasa)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Costa Rica</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td></tr>
<tr><td>Côte d'Ivoire</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Croatia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Cyprus</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Czechia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G</td></tr>
<tr><td>Denmark</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G, 2G</td></tr>
<tr><td>Dominica</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Dominican Republic</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G, 3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Ecuador</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Egypt</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>El Salvador</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Estonia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>eSwatini</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Ethiopia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Faroe Islands</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Finland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G</td></tr>
<tr><td>France</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>French Guiana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Gabon</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Georgia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Germany</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Ghana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Gibraltar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Greece</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G</td></tr>
<tr><td>Guadeloupe</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Guatemala</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Guinea</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Guinea-Bissau</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Guyana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G</td></tr>
<tr><td>Haiti</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G</td></tr>
<tr><td>Honduras</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Hong Kong</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G, 2G, 3G</td></tr>
<tr><td>Hungary</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G, 3G</td></tr>
<tr><td>Iceland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G, 2G</td></tr>
<tr><td>India</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Indonesia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Ireland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G, 2G, 3G</td></tr>
<tr><td>Israel</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Italy</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G, 3G</td></tr>
<tr><td>Jamaica</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G, 3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G</td></tr>
<tr><td>Japan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G, 3G</td></tr>
<tr><td>Jersey</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 2G, 4G</td></tr>
<tr><td>Jordan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Kazakhstan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Kenya</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Kuwait</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Kyrgyzstan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G</td></tr>
<tr><td>Latvia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Liechtenstein</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Lithuania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Luxembourg</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Macao</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td></tr>
<tr><td>Madagascar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Malawi</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Malaysia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G, 3G</td></tr>
<tr><td>Malta</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Mexico</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td><td>&nbsp;</td><td>✅</td><td>M1</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Moldova</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Mongolia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Montenegro</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Morocco</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Mozambique</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Myanmar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Namibia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Netherlands</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G, 3G</td></tr>
<tr><td>New Zealand</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G, 2G</td></tr>
<tr><td>Nicaragua</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Nigeria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>North Macedonia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Norway</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Pakistan</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Palestine</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Panama</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Papua New Guinea</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Paraguay</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Peru</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Philippines</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Poland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Portugal</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Qatar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Romania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Russia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Rwanda</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Saint Kitts and Nevis</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Saint Lucia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Saint Vincent and the Grenadines</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Serbia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Seychelles</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Singapore</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Sint Maarten</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Slovakia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 4G</td></tr>
<tr><td>Slovenia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>South Africa</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>South Korea</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td></tr>
<tr><td>South Sudan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Spain</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Sri Lanka</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Suriname</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G</td></tr>
<tr><td>Sweden</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Switzerland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td></tr>
<tr><td>Taiwan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G</td></tr>
<tr><td>Tajikistan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Tanzania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Thailand</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G, 2G</td></tr>
<tr><td>Trinidad and Tobago</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Tunisia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Turks and Caicos Islands</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Uganda</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
<tr><td>Ukraine</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>United Kingdom</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 4G, 2G</td></tr>
<tr><td>United States</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>4G</td><td>&nbsp;</td><td>✅</td><td>M1</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Uruguay</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G, 3G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G</td></tr>
<tr><td>Uzbekistan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G, 4G</td></tr>
<tr><td>Venezuela</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>3G, 4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Vietnam</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3G, 2G, 4G</td></tr>
<tr><td>Virgin Islands (British)</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>2G, 3G</td></tr>
<tr><td>Virgin Islands (U.S.)</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td>Zambia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>4G</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2G, 3G, 4G</td></tr>
</tbody>
</table>
<table><tbody><tr><td style="text-align: center;">✅</td><td>Recommended and supported</td></tr><tr><td style="text-align: center;">❓</td><td>Not officially supported, but is likely to work</td></tr><tr><td style="text-align: center;"><sup>1</sup></td><td>Permanent roaming restrictions may apply</td></tr></tbody></table>


{{!-- END do not edit content above, it is automatically generated --}}



## Certification

If you are using the certified Particle antenna you generally will not have to do intentional
radiator testing, which is the most complicated and most common certification test.

You will, however, have to do unintentional radiator testing, and it must be repeated for
all modules if you swap between different modules based on region or required connectivity. 
This is the least expensive and easiest certification, however.


## Additional information

- [Electron 2 datasheet](/reference/datasheets/e-series/electron-2-datasheet/)
- [Electron 2 from Boron migration guide](/hardware/migration-guides/electron-2-boron-migration-guide/) 
- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B504 datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524/B523 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [M-SoM datasheet](/reference/datasheets/m-series/msom-datasheet/)
- [Cellular carrier list](/reference/cellular/cellular-carriers/)
