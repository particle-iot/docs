---
title: Gen 2 cellular migration
columns: two
layout: commonTwo.hbs
description: Learn more about migrating from Gen 2 to Gen 3 cellular devices
---

# {{title}}

This document has information on migrating designs based on the Gen 2 cellular devices (Electron, E-Series) to Gen 3 cellular devices (Boron, B-Series SoM, Tracker SoM). There are not pin-compatible replacements to make this migration, and there are some necessary hardware tradeoffs and design changes that may be required for some features. However, there are also several advantages of migrating to the latest generation of cellular devices.

## Gen 2 overview


### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is a 2nd-generation device designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board.

#### Peripherals and GPIO - Electron

{{pin-table platform="Electron"}}

- Wire (D0 and D1) and Wire1 (C4 and D5) connect to the same I2C peripheral and only one can be used at a time.

#### SKUs - Electron

{{!-- BEGIN do not edit content below, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 |  | NRND | B524MTY|
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | &check; | NRND | |
| ASSET2GV2 | Asset Tracker 2G | Global | G350 |  | Deprecated | |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | U260 |  | Deprecated | |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | U270 |  | Deprecated | |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | U260 |  | Deprecated | BRN404XKIT|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 |  | Deprecated | BRN404XTRAY50|
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | U270 |  | Deprecated | B524MEA|
| E350KIT | Electron 2G Kit (Global) | Global | G350 |  | Deprecated | B524MEA|
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 |  | Deprecated | B524MTY|
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | Deprecated | BRN404XTRAY50|
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | U260 |  | Deprecated | |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | U270 |  | Deprecated | |


{{!-- END do not edit content above, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}

### E-Series

![E-Series](/assets/images/e-series/illustrations/e0-top.png)

The E-Series module is a 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E-Series, you can easily move from prototyping to mass production with the same software.

Though the form-factor is different than the Electron, they are nearly identically electrically, and the same software binaries can be used on both the Electron and E-Series.

#### Peripherals and GPIO - E-Series

{{pin-table platform="E-Series"}}

- Wire (D0/D1) and Wire1 (C4/D5) connect to the same I2C peripheral and only one can be used at a time.

#### SKUs - E-Series


{{!-- BEGIN do not edit content below, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R510 | &check; | GA | |
| E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | U201 |  | NRND | E314KIT|
| E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | U201 | &check; | NRND | |
| E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | Global | U201 | &check; | NRND | |
| E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 |  | NRND | |
| E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | NRND | E404XTRAY50|
| E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | R410 | &check; | NRND | |
| E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R410 | &check; | NRND | |
| E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Global | U201 |  | Deprecated | |
| E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Global | U201 |  | Deprecated | |
| E313EA | E-Series 2G/3G (Global - E313), [x1] | Global | U201 |  | Deprecated | |
| E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Global | U201 | &check; | Deprecated | |
| E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | |
| E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | E404XTRAY50|
| E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | Global | U201 |  | End of life | |


{{!-- END do not edit content above, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}


### Feature comparison - Gen 2

| Feature | Electron | E-Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |



#### Antennas - Gen 2

There are antenna differences between some Gen 2 and Gen 3 models, and a different antenna may be required.

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x1] | ANTELEC | Electron and E-Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-antenna-1) |
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x50] | ANTELEC50 | Electron and E-Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) |
| Tracker One Cellular Antenna | | Tracker One | [Datasheet](/assets/pdfs/tracker-one-ant-cellular.pdf) |

- The Electron 2G/3G cellular antenna (ANTELEC) should not be used with LTE (Cat 1 or Cat M1) devices. Not only is it not certified, but is not compatible with all of the necessary bands for use with LTE.

## Gen 3 overview

### Boron

![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

#### Country compatibility - Boron

- The Boron 2G/3G Global (BRN314) can be used world-wide, however it is not recommended for the United States. In April 2024, all 2G/3G cellular operators will have shut down their 2G and 3G cellular networks and this device will no longer be able to connect.
- The Boron LTE Cat M1 (BRN404) is only recommended for use in the United States, Canada, and Mexico. 

#### Peripherals and GPIO - Boron

{{pin-table platform="Boron"}}


#### SKUs - Boron

{{!-- BEGIN do not edit content below, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R510 | &check; | GA | |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R510 | &check; | GA | |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | NRND | BRN404XTRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 |  | Deprecated | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 |  | Deprecated | |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | &check; | Deprecated | |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | &check; | Deprecated | |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | R410 |  | Deprecated | |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | &check; | Deprecated | BRN404XKIT|
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R410 | &check; | Deprecated | BRN404XKIT|
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | BRN404XTRAY50|
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R510 | &check; | Deprecated | BRN404XKIT|


{{!-- END do not edit content above, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}


### B-Series SoM

![B-Series](/assets/images/b-series/b-series-top.png)

The B-Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

- [B-Series SoM First Board](/hardware/som/som-first-board/) is a simple SoM base board powered by USB only, no battery support.

- [AN001 Basic SoM Design](/hardware/som/basic-som-design/) is a simple SoM base board. Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes: RGB LED, bq24195 PMIC, MAX17043 Fuel Gauge, USB Connector, LiPo Connector (JST-PH), and M.2 SoM Connector.

Even though the B-Series SoM is more difficult to prototype with than the Boron, the B-Series module is designed for enterprise deployment and production at scale. The larger width of the module allows for a wider selection of cellular modems, which is why there's LTE Cat 1 (with 2G/3G fallback) for the B-Series SoM but not for the Boron. The Quectel EG91-E modem is physically too wide to fit in the Boron (Adafruit feather) form-factor.

#### Country compatibility - B-Series SoM

- The B-Series SoM LTE Cat M1 (B404) is only recommended for use in the United States, Canada, and Mexico. 
- The B-Series LTE Cat 1 with 2G/3G fallback (B524) is only recommended in Europe, Australia, and New Zealand.
- The B-Series SoM B524 only supports EMEAA cellular frequencies and thus it cannot connect in most locations in the Americas. It does not work at all in the United States.

#### Peripherals and GPIO - B-Series SoM

{{pin-table platform="B4xx SoM"}}


#### SKUs - B-Series SoM

{{!-- BEGIN do not edit content below, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R510 | &check; | GA | |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | R510 | &check; | GA | |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | EG91-NAX |  | GA | |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | EG91-NAX |  | GA | |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | EG91-E | &check; | GA | |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-E | &check; | GA | |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | NRND | B404XMTY|
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E |  | NRND | B524MTY|
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | B404XMEA|
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | Deprecated | B404XMTY|
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R410 | &check; | Deprecated | B404XMEA|
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | EG91-NAX | &check; | Deprecated | B504EMEA|
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | EG91-NAX | &check; | Deprecated | B504EMTY|
| B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E |  | Deprecated | B524MEA|


{{!-- END do not edit content above, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


### Tracker SoM

![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Hardware watchdog
- Wi-Fi (geolocation only, no Wi-Fi network support)

In addition to using the Tracker One assembled module, the following application note can help with creating your first board that uses the bare Tracker SoM module.

- [AN025 Tracker SoM First Board](/hardware/tracker/tracker-som/tracker-som-first-board/) contains the Eagle CAD files for creating your first Tracker SoM base board design.

#### Country compatibility - Tracker SoM

- The Tracker SoM LTE Cat M1 (T404) is only recommended for use in the United States, Canada, and Mexico. 
- The Tracker LTE Cat 1 with 2G/3G fallback (T524) is only recommended in selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.
- The Tracker SoM T524 only supports EMEAA cellular frequencies and thus it cannot connect in most locations in the Americas. It does not work at all in the United States.

#### Peripherals and GPIO - Tracker SoM

{{pin-table platform="Tracker SoM"}}

- Analog and digital pins (A0 and D0 for example) are the same physical pin on the Tracker SoM.
- Wire (D0/D1) and Wire3 (TX/RX) connect to the same I2C peripheral and only one can be used at a time. This feature is mainly because TX/RX are exposed on the M8 connector on the Tracker One, and this allows the port to be switched between I2C and UART serial modes.

#### SKUs - Tracker SoM

{{!-- BEGIN do not edit content below, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | &check; | GA | |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | EG91-EX | &check; | GA | |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | BG96-MC | &check; | GA | |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | BG96-MC | &check; | GA | |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX |  | GA | ONE524MEA|
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX |  | GA | ONE524MTY|
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | &check; | GA | |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | EG91-EX | &check; | GA | |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | BG96-MC | &check; | GA | |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | BG96-MC | &check; | GA | |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | BG96-MC | &check; | GA | |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | &check; | GA | |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | EG91-EX | &check; | GA | |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-EX | &check; | GA | |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | &check; | In development | |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC |  | NRND | T404MTY|
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX |  | NRND | T524MKIT|
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC |  | Deprecated | ONE404MEA|
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC |  | Deprecated | ONE404MTY|
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC |  | Deprecated | T404MEA|
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC |  | Deprecated | T404MKIT|
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX |  | Deprecated | T524MEA|
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX |  | Deprecated | T524MTY|


{{!-- END do not edit content above, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.

### Feature comparison - Gen 3

| Feature | Boron | B-Series SoM | SoM Base Board | Tracker SoM |
| --- | :---: | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |&check; | 
| MFF2 SMD Particle SIM | &check; | &check; | &nbsp; |&check; | 
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional | Optional |
| Status LED | &check; | &nbsp; | Optional | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional | Optional |
| Battery Connector | &check; | &nbsp; | Optional | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional | &check; | 

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

#### Antennas - Gen 3

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x1]| ANTCW2EA | Tracker, B-Series, E-Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-lte-4-7dbi) |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x50] | ANTCW2TY | Tracker, B-Series, E-Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|


## Software differences

{{!-- BEGIN shared-blurb e5b77a80-8a7a-4bd6-a7b6-8685fb87ed43 --}}
### User firmware binary size

One major advantage of Gen 3 devices is that user firmware binaries in Device OS 3.1.0 and later can be up to 256 Kbytes, instead of 128 Kbytes in earlier version of Device OS and on Gen 2 devices. The larger firmware binary support will not be added to Gen 2 in the future, and will only be available on Gen 3 devices.

### Flash file system

There is a flash file system (2 MB except on the Tracker which is 4 MB) for storing user data, on Gen 3 devices only.

### Combined and resumable OTA

On Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Asset OTA

[Asset OTA](/getting-started/cloud/ota-updates/#asset-ota) (available in Device OS 5.5.0 and later), makes it possible to include bundled assets in an OTA software update that can be delivered to other processors and components in your product. 

{{!-- END shared-blurb --}}



## Hardware differences

{{!-- BEGIN shared-blurb a9c89833-bb97-4788-ae9a-99d3974a2d89 --}}

### MCU

The microcontroller is different in Gen 2 vs. Gen 3 devices:

| Measure | Gen 2 | Gen 3 |
| :--- | :---: | :---: |
| MCU | STM32F205 | nRF52840 |
| Manufacturer | ST Microelectronics | Nordic Semiconductor |
| Processor | ARM Cortex M3 | ARM Cortex M4F |
| Speed | 120 MHz | 64 MHz |
| RAM | 128 KB | 256 KB | 
| Flash (MCU) | 1 MB | 1 MB |
| Flash (external) | &nbsp; | 4 MB<sup>1</sup> |
| Hardware floating point | &nbsp; | &check; |

- <sup>1</sup>8 MB on the Tracker SoM. Most of this space is reserved by the system and only a portion if it is available to user applications as a flash file system.
- Not all RAM is available to user applications. The Device OS firmware uses a portion of it.

{{!-- END shared-blurb --}}

### BLE (Bluetooth LE)

- Bluetooth LE (BLE 5.0) is supported on the B-Series SoM and Gen 3 devices but not Gen 2.

### NFC tag

- NFC tag mode is supported on Gen 3 devices but not Gen 2.

### GPIO

There are fewer available GPIO pins on Gen 3 devices. If you need a large number of GPIO pins, an external GPIO expander connected by I2C or SPI is a good option.

The [MCP23008](https://github.com/rickkas7/MCP23008-RK) is an 8-port GPIO expander that connects to I2C and works well with Gen 3 devices. You can connect up to 8 of them to a single I2C interface. the [MCP23017](https://github.com/rickkas7/MCP23017-RK) has 16-ports, and you can also connect 8 of them, for a total of 128 GPIO ports.

The application note [AN013 Tracker GPIO](/hardware/tracker/projects/tracker-gpio/) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well. The techniques work on other Gen 3 devices as well.


### 5V tolerance

The other difference in the GPIO between Gen 2 and Gen 3 is with 5V tolerance. While both devices are 3.3V devices and only will drive 3.3V, the I/O pins on Gen 2 devices (with the exception of A3 and A6) are 5V tolerant. This allows a Gen 2 device to connect to some 5V peripherals directly.

**You must not connect 5V peripherals to a Gen 3 device.** This includes GPIO, ports (serial, I2C, SPI), and ADC. 

Interfacing with 5V peripherals can be done with a level shifter, a MOSFET, or a 5V GPIO expander.

### Serial (UART)

{{!-- BEGIN shared-blurb f1cc7f9f-ad76-4621-a1f8-cf4b1fa395c8 --}}

There are more UART ports on the Gen 2 devices than Gen 3. If you need more hardware serial ports, the best option is to use the [SC16IS740](https://github.com/rickkas7/SC16IS740RK) or its relatives like the SC16IS750. These devices connect by I2C or SPI, and you can add multiple ports this way.

#### Serial baud rates

| Baud Rate | Gen 2 | Gen 3 |
| ------: | :---: | :---: |
|    1200 | &check; | &check; |
|    2400 | &check; | &check; |
|    4800 | &check; | &check; |
|    9600 | &check; | &check; |
|   19200 | &check; | &check; |
|   28800 | &nbsp;  | &check; |
|   38400 | &check; | &check; |
|   57600 | &check; | &check; |
|   76800 | &nbsp;  | &check; |
|  115200 | &check; | &check; |
|  230400 | &check; | &check; |
|  250000 | &nbsp;  | &check; |
|  460800 | &nbsp;  | &check; |
|  921600 | &nbsp;  | &check; |
| 1000000 | &nbsp;  | &check; |

#### Serial configurations

| Constant | Description | Gen 2 | Gen 3 |
| :--- | :--- | :---: | :---: |
| SERIAL_8N1 | 8 data bits, no parity, 1 stop bit (default) | &check; | &check; |
| SERIAL_8N2 | 8 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8E1 | 8 data bits, even parity, 1 stop bit | &check; | &check; |
| SERIAL_8E2 | 8 data bits, even parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8O1 | 8 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_8O2 | 8 data bits, odd parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_9N1 | 9 data bits, no parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_9N2 | 9 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_7O1 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7O2 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E1 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E2 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| LIN_MASTER_13B | 8 data bits, no parity, 1 stop bit, LIN Master mode with 13-bit break generation | &check; | &nbsp; |
| LIN_SLAVE_10B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 10-bit break detection | &check; | &nbsp; |
| LIN_SLAVE_11B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 11-bit break detection | &check; | &nbsp; |

- Using an I2C or SPI UART like the SC16IS750 is also a good way to add support for other bit length, parity, and stop bit options on Gen 3 devices.

{{!-- END shared-blurb --}}



### PWM (pulse width modulation)

{{!-- BEGIN shared-blurb 2fd8bba2-0bda-44c3-822d-0fb0ad30118e --}}

| Dimension | PARANTCW1EA | PARANTC41EA | ANTCW2EA | ANT-FLXU | ANTELEC | 
| :--- | :---: | :---: | :---: | :---: | :---: |
| Tray SKU | PARANTCW1TY | PARANTC41TY | ANTCW2TY | ANT-FLXU-50 | ANTELEC50 |
| Length | 116mm | 122.1mm | 97.0mm | 96.0mm | 80.0mm |
| Width | 27mm | 12.8mm | 21.0mm | 21.0mm | 20.0mm |
| Thickness | 0.2mm | 0.2mm | 0.2mm | 0.2mm | 0.2mm |
| Cable Length | 189.5mm | 183mm | 160mm | 150mm | 164mm |

PARANTC41EA/PARANTC41TY are slightly longer than ANTCW2EA/ANTCW2TY. The antenna can be bent when being placed inside an enclosure. There are a couple restrictions to ensure good performance:

- Do not bend more the 90 degrees. Right angle turns are acceptable, but do not fold the antenna over on itself.
- The antenna should not be creased when it is bent into position. A crease can damage the internal structure of the antenna.
- The antenna should always be affixed along its entire length. Do not affix a portion of the antenna and leave a portion free floating.
- All portions of the antenna should maintain proper spacing from electronics, grounded metal, or active metal.
    - Recommended: 12mm
    - Minimum: 8mm
- Ideally when placing the antenna it should not have a bend in it, but following the above guidelines, there should be minimal performance degradation.

{{!-- END shared-blurb --}}


#### PWM - Gen 3

On Gen 3 devices, the PWM frequency is from 5 Hz to `analogWriteMaxFrequency(pin)` (default is 500 Hz).

On Gen 3 Feather devices (Boron), pins A0, A1, A2, A3, A4, A5, D2, D3, D4, D5, D6, D7, and D8 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 3: Pins D2, D3, A4, and A5.
- Group 2: Pins A0, A1, A2, and A3.
- Group 1: Pins D4, D5, D6, and D8.
- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

On the Boron SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 2: Pins A0, A1, A6, and A7.
- Group 1: Pins D4, D5, and D6.
- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

On the Tracker SoM, pins D0 - D9 can be used for PWM. Note that pins A0 - A7 are the same physical pin as D0 - D7. D8 is shared with TX (Serial1) and D9 is shared with RX (Serial1). When used for PWM, pins are assigned a PWM group. Each group must share the same frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 3: RGB LED
- Group 2: D8 (TX), D9 (RX)
- Group 1: D4, D5, D6, D7
- Group 1: D0, D1, D2, D3

It is also possible to add an external PWM driver such as the PCA9685 which adds 16 outputs via I2C. You can add 62 of these to a single I2C bus for 992 PWM outputs! The [Adafruit_PWMServoDriver](/reference/device-os/libraries/a/Adafruit_PWMServoDriver/) library supports this chip on all Particle devices.


### Interrupts

{{!-- BEGIN shared-blurb 0ad42255-7fdf-47d2-af7a-0e4dcff59790 --}}

#### Interrupts - Gen 2

Not supported on the Electron/E series (you can't use attachInterrupt on these pins):

  - D0, A5 (shared with MODE button)
  - D7 (shared with BATT_INT_PC13)
  - C1 (shared with RXD_UC)
  - C2 (shared with RI_UC)

No restrictions on the Electron/E-Series (all of these can be used at the same time):

  - D5, D6

Shared on the Electron/E-Series (only one pin for each bullet item can be used at the same time):

  - D1, A4, B1
  - D2, A0, A3
  - D3, DAC
  - D4, A1
  - A2, C0
  - A7 (WKP), B2, B4
  - B0, C5
  - B3, B5
  - C3, TX
  - C4, RX

{{!-- END shared-blurb --}}

#### Interrupts - Gen 3

There is a limit of 8 pins with interrupt handlers, however the selection of pins is not restricted.



### DAC

- Gen 2 devices have two DAC (digital-to-analog converter), on pins A3 and A6. 

- Gen 3 devices do not have built-in DAC, however they can easily be added by I2C or SPI.

### I2C

- On Gen 2, Wire (D0/D1) and Wire1 (C4/D5) connect to the same I2C peripheral and only one can be used at a time.
- On the Boron, there is only one available I2C interface (D0/D1).
- On the B-Series SoM, there are two available independent I2C interfaces (D0/D1 and D2/D3).
- On the Tracker SoM, Wire (D0/D1) and Wire3 (TX/RX) connect to the same I2C peripheral and only one can be used at a time. This feature is mainly because TX/RX are exposed on the M8 connector on the Tracker One, and this allows the port to be switched between I2C and UART serial modes.

### SPI

- Gen 2 devices have two SPI ports.
- The Boron and B-Series SoM have two SPI ports.
- The Tracker SoM only has one available SPI port.
- In most cases, you can share a single SPI bus with many peripherals.

{{!-- BEGIN shared-blurb 28cd19b2-4f01-444b-8189-ba6191e6ebdd --}}

### Sleep modes

- In general, Gen 3 devices use less power in all modes.
- In `HIBERNATE` mode, the RTC (real time clock) does not run on Gen 3 devices, so you cannot wake by time from `HIBERNATE` mode (formerly known as `SLEEP_MODE_DEEP`).
- However, you can wake by time from `ULTRA_LOW_POWER` mode, and it uses less power than the Gen 2 `HIBERNATE` mode.
- On Gen 2 devices, you can only wake from `HIBERNATE` with a rising signal on `WKP` (A7). Gen 3 devices can wake from `HIBERNATE` on any pin, rising or falling.
- On Gen 2 (STM32F205) devices, if you try to go into `HIBERNATE` mode with WKP already high, the device will go into sleep and will not wake up by time or pin change, essentially rendering it unable to wake until reset manually. This problem does not occur on Gen 3 devices.

### RTC (Real-time clock)

- The E-Series module has the ability to use an external lithium coin cell or supercap to power the RTC when the MCU is unpowered. This feature is difficult to access on the Electron (requires removing a resistor on the module) and does not exist on Gen 3 devices.
- The RTC on Gen 3 devices is not really a real-time clock. It's basically just a counter, and some advanced wakeup features are not possible on Gen 3 devices. These features were not enabled by Device OS on Gen 2 devices, either, so this is generally not an issue.
- On Gen 3 devices, in `HIBERNATE` sleep mode the RTC does not run, so it is not possible to wake by time, and the system clock will not be set until you connect to the cloud again. `ULTRA_LOW_POWER` is recommended instead.
- The Tracker SoM has a separate real-time clock and watchdog (AM1805) chip allowing it to wake from `HIBERNATE` based on time.

{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 585f8962-e24a-4de2-8bbc-a45a02439350 --}}

### SWD/JTAG

- Gen 2 devices support SWD on D6 and D7, and full JTAG on D3, D4, D5, D6, and D7.
- Gen 3 devices only support SWD, and do so via a dedicated debug connector.
- The Boron has the debug connector on top of the module.
- The B-Series SoM has SWD on pads on the bottom of the SoM. The evaluation board connects to these with pogo pins and breaks out to the same 2x5 connector that is on the Boron.

#### JTAG pin warning - Gen 2

On Gen 2 devices, beware when using pins D3, D5, D6, and D7 as OUTPUT controlling external devices. After reset, these pins will be briefly taken over for JTAG/SWD, before being restored to the default high-impedance INPUT state during boot.

- D3, D5, and D7 are pulled high with a pull-up
- D6 is pulled low with a pull-down
- D4 is left floating

The brief change in state (especially when connected to a MOSFET that can be triggered by the pull-up or pull-down) may cause issues when using these pins in certain circuits. Using STARTUP will not prevent this! 

This is not an issue with Gen 3 devices that have dedicated SWD pins.

If you are relying on this behavior for external circuits, you should instead use a hardware pull-up or pull-down on Gen 3 devices. The pins default to high-impedance state, and this means they will stay in this state when in the bootloader, DFU mode, and safe mode.

{{!-- END shared-blurb --}}

### PMIC and fuel gauge

The Electron, E-Series, Boron, and Tracker SoM all include the PMIC (bq24195) and battery fuel gauge (MAX17043) on the module itself.

On the B-Series SoM, the PMIC and fuel gauge are optional. For example, if you are powering by an external power supply and not using a battery, you can omit the components entirely.

### USB differences

- Gen 2 devices can emulate a USB mouse or keyboard over the USB port. This feature is not available on Gen 3.
- Gen 2 devices can support two separate USB serial emulation streams over the USB port. Gen 3 devices only support the normal `Serial` interface.

## Cellular differences

### Carriers


{{!-- BEGIN do not edit content below, it is automatically generated 0c8fb8e4-0420-11ec-9a03-0242ac130003 --}}

| Country | Carrier | Gen 2 | BRN314 | B524/T524 | LTE Cat M1 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| Afghanistan | MTN | &nbsp; | &check; | &nbsp; | &nbsp; |
| Afghanistan | Roshan | &check; | &nbsp; | &nbsp; | &nbsp; |
| Albania | Eagle | &nbsp; | &check; | &check; | &nbsp; |
| Albania | Telekom | &nbsp; | &check; | &check; | &nbsp; |
| Albania | Vodafone | &nbsp; | &check; | &check; | &nbsp; |
| Algeria | Mobilis | &check; | &check; | &check; | &nbsp; |
| Algeria | Ooredoo | &nbsp; | &check; | &check; | &nbsp; |
| Anguilla | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Antigua and Barbuda | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Argentina | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| Argentina | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Argentina | Personal | &nbsp; | &check; | &nbsp; | &nbsp; |
| Armenia | Beeline | &nbsp; | &check; | &nbsp; | &nbsp; |
| Armenia | Ucom | &nbsp; | &check; | &nbsp; | &nbsp; |
| Aruba | Setar | &check; | &check; | &check; | &nbsp; |
| Austria | 3 (Drei) | &check; | &check; | &check; | &nbsp; |
| Austria | A1 | &check; | &check; | &check; | &nbsp; |
| Austria | T-Mobile | &check; | &check; | &check; | &nbsp; |
| Azerbaijan | Azercell | &nbsp; | &check; | &nbsp; | &nbsp; |
| Azerbaijan | Bakcell | &check; | &check; | &nbsp; | &nbsp; |
| Azerbaijan | NAR Mobile | &nbsp; | &check; | &nbsp; | &nbsp; |
| Bahamas | Aliv | &check; | &check; | &nbsp; | &nbsp; |
| Bahamas | BTC Bahamas | &check; | &check; | &nbsp; | &nbsp; |
| Bahrain | Batelco | &check; | &nbsp; | &nbsp; | &nbsp; |
| Bahrain | Zain | &nbsp; | &check; | &check; | &nbsp; |
| Bangladesh | Bangalink | &nbsp; | &check; | &check; | &nbsp; |
| Bangladesh | GrameenPhone | &check; | &check; | &check; | &nbsp; |
| Barbados | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Belarus | A1 | &check; | &check; | &check; | &nbsp; |
| Belarus | MTS | &check; | &nbsp; | &nbsp; | &nbsp; |
| Belgium | Base | &check; | &check; | &check; | &nbsp; |
| Belgium | Mobistar | &check; | &nbsp; | &nbsp; | &nbsp; |
| Belgium | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Belgium | Proximus | &check; | &check; | &check; | &nbsp; |
| Belize | Smart | &nbsp; | &check; | &nbsp; | &nbsp; |
| Bermuda | CellOne | &check; | &nbsp; | &nbsp; | &nbsp; |
| Bolivia | Tigo | &check; | &nbsp; | &nbsp; | &nbsp; |
| Bolivia | Viva | &check; | &check; | &nbsp; | &nbsp; |
| Bosnia and Herzegovina | BH Telecom | &check; | &check; | &check; | &nbsp; |
| Bosnia and Herzegovina | HT Eronet | &nbsp; | &check; | &check; | &nbsp; |
| Botswana | BeMobile | &check; | &nbsp; | &check; | &nbsp; |
| Brazil | Vivo | &check; | &nbsp; | &nbsp; | &nbsp; |
| Brunei | DST | &nbsp; | &check; | &check; | &nbsp; |
| Bulgaria | A1 | &check; | &check; | &check; | &nbsp; |
| Bulgaria | Telenor | &check; | &check; | &check; | &nbsp; |
| Bulgaria | Vivacom | &check; | &check; | &check; | &nbsp; |
| Burkina Faso | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Cabo Verde | CVMóvel | &check; | &nbsp; | &check; | &nbsp; |
| Cabo Verde | Unitel T+ | &nbsp; | &nbsp; | &check; | &nbsp; |
| Cambodia | Metfone | &nbsp; | &check; | &check; | &nbsp; |
| Cameroon | MTN | &check; | &nbsp; | &nbsp; | &nbsp; |
| Canada | Bell Mobility | &check; | <sup>NRND</sup> | &nbsp; | &check; |
| Canada | Rogers Wireless | &check; | <sup>NRND</sup> | &nbsp; | &check; |
| Canada | Telus | &check; | <sup>NRND</sup> | &nbsp; | &check; |
| Canada | Videotron | &nbsp; | <sup>NRND</sup> | &nbsp; | &nbsp; |
| Cayman Islands | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Chad | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Chile | Claro | &nbsp; | &check; | &check; | &nbsp; |
| Chile | Entel | &nbsp; | &check; | &check; | &nbsp; |
| Chile | Movistar | &check; | &check; | &check; | &nbsp; |
| China | China Mobile | &check; | &nbsp; | &nbsp; | &nbsp; |
| China | China Unicom | &check; | &nbsp; | &nbsp; | &nbsp; |
| Colombia | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Colombia | Tigo | &nbsp; | &check; | &nbsp; | &nbsp; |
| Congo (Brazzaville) | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Congo (Brazzaville) | MTN | &check; | &nbsp; | &nbsp; | &nbsp; |
| Congo (Kinshasa) | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Costa Rica | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Côte d'Ivoire | MTN | &check; | &check; | &check; | &nbsp; |
| Croatia | Croatian Telecom | &check; | &nbsp; | &nbsp; | &nbsp; |
| Croatia | Hrvatski Telekom | &nbsp; | &check; | &check; | &nbsp; |
| Croatia | Tele2 | &check; | &check; | &check; | &nbsp; |
| Croatia | VIPnet | &check; | &nbsp; | &nbsp; | &nbsp; |
| Curaçao | Digicel | &check; | &nbsp; | &nbsp; | &nbsp; |
| Curaçao | UTS | &check; | &nbsp; | &nbsp; | &nbsp; |
| Cyprus | Cytamobile-Vodafone | &check; | &check; | &check; | &nbsp; |
| Cyprus | MTN | &nbsp; | &check; | &check; | &nbsp; |
| Cyprus | PrimeTel | &check; | &check; | &check; | &nbsp; |
| Czechia | O2 | &check; | &check; | &check; | &nbsp; |
| Czechia | T-Mobile | &check; | &check; | &check; | &nbsp; |
| Czechia | Vodafone | &check; | &check; | &check; | &nbsp; |
| Denmark | 3 (Tre) | &check; | &check; | &check; | &nbsp; |
| Denmark | TDC | &nbsp; | &check; | &check; | &nbsp; |
| Denmark | Telenor | &check; | &check; | &check; | &nbsp; |
| Denmark | Telia | &check; | &check; | &check; | &nbsp; |
| Dominica | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Dominican Republic | Altice Dominicana | &nbsp; | &check; | &nbsp; | &nbsp; |
| Dominican Republic | Claro | &check; | &check; | &nbsp; | &nbsp; |
| Dominican Republic | Viva | &check; | &check; | &nbsp; | &nbsp; |
| Ecuador | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| Ecuador | Movistar | &nbsp; | &check; | &nbsp; | &nbsp; |
| Ecuador | Otecel | &check; | &nbsp; | &nbsp; | &nbsp; |
| Egypt | Etisalat | &nbsp; | &check; | &check; | &nbsp; |
| Egypt | Orange | &check; | &check; | &check; | &nbsp; |
| El Salvador | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| El Salvador | Telefonica | &check; | &check; | &nbsp; | &nbsp; |
| Estonia | Elisa | &nbsp; | &check; | &check; | &nbsp; |
| Estonia | Tele2 | &check; | &check; | &check; | &nbsp; |
| Estonia | Telia | &check; | &check; | &check; | &nbsp; |
| eSwatini | MTN | &check; | &check; | &check; | &nbsp; |
| Ethiopia | Ethio Telecom | &nbsp; | &check; | &check; | &nbsp; |
| Faroe Islands | Faroese Telecom | &nbsp; | &check; | &check; | &nbsp; |
| Faroe Islands | Vodafone | &nbsp; | &check; | &check; | &nbsp; |
| Finland | DNA | &check; | &check; | &check; | &nbsp; |
| Finland | Elisa | &nbsp; | &check; | &check; | &nbsp; |
| Finland | Telia | &check; | &check; | &check; | &nbsp; |
| France | Bouygues | &check; | &check; | &check; | &nbsp; |
| France | Free Mobile | &nbsp; | &check; | &check; | &nbsp; |
| France | Orange | &check; | &check; | &check; | &nbsp; |
| France | SFR | &check; | &check; | &check; | &nbsp; |
| French Guiana | Digicel | &nbsp; | &check; | &check; | &nbsp; |
| Gabon | Airtel | &check; | &check; | &check; | &nbsp; |
| Georgia | Beeline | &check; | &check; | &nbsp; | &nbsp; |
| Georgia | Geocell | &nbsp; | &check; | &nbsp; | &nbsp; |
| Germany | O2 | &check; | &check; | &check; | &nbsp; |
| Germany | Telekom | &check; | &check; | &check; | &nbsp; |
| Germany | Vodafone | &check; | &check; | &check; | &nbsp; |
| Ghana | AirtelTigo | &nbsp; | &check; | &check; | &nbsp; |
| Ghana | MTN | &nbsp; | &check; | &check; | &nbsp; |
| Ghana | Vodafone | &check; | &check; | &check; | &nbsp; |
| Gibraltar | Gibtel | &check; | &check; | &check; | &nbsp; |
| Greece | Cosmote | &check; | &check; | &check; | &nbsp; |
| Greece | Vodafone | &check; | &check; | &check; | &nbsp; |
| Greece | Wind | &check; | &check; | &check; | &nbsp; |
| Greenland | Tele | &check; | &nbsp; | &nbsp; | &nbsp; |
| Grenada | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Guadeloupe | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Guatemala | Claro | &check; | &check; | &nbsp; | &nbsp; |
| Guatemala | Movistar | &nbsp; | &check; | &nbsp; | &nbsp; |
| Guinea | MTN | &nbsp; | &check; | &check; | &nbsp; |
| Guinea-Bissau | MTN | &check; | &check; | &check; | &nbsp; |
| Guyana | Digicel | &check; | &check; | &check; | &nbsp; |
| Haiti | Digicel | &check; | &check; | &check; | &nbsp; |
| Honduras | Claro | &check; | &check; | &nbsp; | &nbsp; |
| Honduras | Tigo | &check; | &check; | &nbsp; | &nbsp; |
| Hong Kong | CMHK | &check; | &check; | &check; | &nbsp; |
| Hong Kong | CSL | &nbsp; | &check; | &check; | &nbsp; |
| Hong Kong | SmarTone | &check; | &check; | &check; | &nbsp; |
| Hungary | Magyar Telekom | &check; | &check; | &check; | &nbsp; |
| Hungary | Telenor | &check; | &check; | &check; | &nbsp; |
| Hungary | Vodafone | &check; | &check; | &check; | &nbsp; |
| Iceland | Nova | &check; | &check; | &check; | &nbsp; |
| Iceland | Siminn | &check; | &check; | &check; | &nbsp; |
| Iceland | Vodafone | &check; | &check; | &check; | &nbsp; |
| Indonesia | Indosat | &nbsp; | &check; | &check; | &nbsp; |
| Indonesia | Telkomsel | &check; | &check; | &check; | &nbsp; |
| Indonesia | XL Axiata | &nbsp; | &check; | &check; | &nbsp; |
| Ireland | 3 (Tre) | &check; | &check; | &check; | &nbsp; |
| Ireland | Meteor | &nbsp; | &check; | &check; | &nbsp; |
| Ireland | O2 | &nbsp; | &check; | &check; | &nbsp; |
| Ireland | Vodafone | &check; | &check; | &check; | &nbsp; |
| Israel | Cellcom | &check; | &nbsp; | &nbsp; | &nbsp; |
| Israel | Hot Mobile | &check; | &check; | &check; | &nbsp; |
| Israel | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Israel | Partner | &check; | &nbsp; | &nbsp; | &nbsp; |
| Israel | Pelephone | &nbsp; | &check; | &check; | &nbsp; |
| Italy | TIM | &check; | &check; | &check; | &nbsp; |
| Italy | Vodafone | &check; | &check; | &check; | &nbsp; |
| Italy | Wind | &check; | &check; | &check; | &nbsp; |
| Jamaica | Digicel | &check; | &check; | &nbsp; | &nbsp; |
| Jamaica | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Japan | NTT DoCoMo | &check; | &check; | &nbsp; | &nbsp; |
| Japan | Softbank | &nbsp; | &check; | &nbsp; | &nbsp; |
| Jersey | Airtel-Vodafone | &check; | &nbsp; | &nbsp; | &nbsp; |
| Jersey | Jersey Telecom | &check; | &nbsp; | &nbsp; | &nbsp; |
| Jordan | Zain | &nbsp; | &check; | &check; | &nbsp; |
| Kazakhstan | Beeline | &check; | &check; | &check; | &nbsp; |
| Kazakhstan | K-Cell | &nbsp; | &check; | &check; | &nbsp; |
| Kenya | Airtel | &check; | &check; | &check; | &nbsp; |
| Kuwait | Viva | &nbsp; | &check; | &check; | &nbsp; |
| Kuwait | Wataniya | &check; | &nbsp; | &nbsp; | &nbsp; |
| Kuwait | Zain | &check; | &check; | &check; | &nbsp; |
| Kyrgyzstan | Beeline | &nbsp; | &check; | &nbsp; | &nbsp; |
| Latvia | Bite | &nbsp; | &check; | &check; | &nbsp; |
| Latvia | LMT | &check; | &check; | &check; | &nbsp; |
| Latvia | Tele2 | &check; | &check; | &check; | &nbsp; |
| Liechtenstein | Mobilkom | &check; | &check; | &check; | &nbsp; |
| Liechtenstein | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Lithuania | Bite | &nbsp; | &check; | &check; | &nbsp; |
| Lithuania | Omnitel | &check; | &check; | &check; | &nbsp; |
| Lithuania | Tele2 | &check; | &check; | &check; | &nbsp; |
| Luxembourg | Orange | &check; | &check; | &check; | &nbsp; |
| Luxembourg | POST | &check; | &check; | &check; | &nbsp; |
| Luxembourg | Tango | &check; | &check; | &check; | &nbsp; |
| Macao | CTM | &nbsp; | &nbsp; | &check; | &nbsp; |
| Madagascar | Airtel | &check; | &nbsp; | &check; | &nbsp; |
| Malawi | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Malaysia | Celcom | &check; | &check; | &check; | &nbsp; |
| Malaysia | DiGi | &check; | &check; | &check; | &nbsp; |
| Malaysia | Maxis | &nbsp; | &check; | &check; | &nbsp; |
| Malta | Go Mobile | &check; | &check; | &check; | &nbsp; |
| Malta | Vodafone | &check; | &check; | &check; | &nbsp; |
| Mexico | AT&T | &check; | <sup>NRND</sup> | &nbsp; | &check; |
| Mexico | Movistar | &check; | &nbsp; | &nbsp; | &nbsp; |
| Mexico | Telcel | &nbsp; | <sup>NRND</sup> | &nbsp; | &check; |
| Moldova | Moldcell | &nbsp; | &check; | &check; | &nbsp; |
| Moldova | Orange | &check; | &check; | &check; | &nbsp; |
| Mongolia | Mobicom | &nbsp; | &check; | &check; | &nbsp; |
| Mongolia | Unitel | &check; | &check; | &check; | &nbsp; |
| Montenegro | Mtel | &check; | &check; | &check; | &nbsp; |
| Montenegro | T-Mobile | &check; | &check; | &check; | &nbsp; |
| Montenegro | Telenor | &nbsp; | &check; | &check; | &nbsp; |
| Montserrat | Flow | &check; | &nbsp; | &nbsp; | &nbsp; |
| Morocco | Inwi | &check; | &nbsp; | &check; | &nbsp; |
| Morocco | Medi Telecom | &nbsp; | &nbsp; | &check; | &nbsp; |
| Mozambique | Vodacom | &check; | &check; | &check; | &nbsp; |
| Myanmar | MPT | &nbsp; | &check; | &check; | &nbsp; |
| Myanmar | Telenor | &nbsp; | &check; | &check; | &nbsp; |
| Namibia | Telecom Namibia | &nbsp; | &check; | &check; | &nbsp; |
| Netherlands | KPN | &check; | &check; | &check; | &nbsp; |
| Netherlands | T-Mobile | &check; | &check; | &check; | &nbsp; |
| Netherlands | Vodafone | &check; | &check; | &check; | &nbsp; |
| New Zealand | 2degrees | &check; | <sup>NRND</sup> | &check; | &nbsp; |
| New Zealand | Spark | &check; | <sup>NRND</sup> | &check; | &nbsp; |
| New Zealand | Vodafone | &check; | <sup>NRND</sup> | &check; | &nbsp; |
| Nicaragua | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Niger | Celtel | &check; | &nbsp; | &nbsp; | &nbsp; |
| Nigeria | 9mobile | &nbsp; | &check; | &check; | &nbsp; |
| Nigeria | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Nigeria | Celtel Nigeria | &check; | &nbsp; | &nbsp; | &nbsp; |
| Nigeria | Etisalat | &check; | &nbsp; | &nbsp; | &nbsp; |
| Nigeria | Glo | &nbsp; | &check; | &check; | &nbsp; |
| Nigeria | MTN | &check; | &check; | &check; | &nbsp; |
| North Macedonia | T-Mobile | &check; | &nbsp; | &nbsp; | &nbsp; |
| North Macedonia | Vip operator | &check; | &nbsp; | &nbsp; | &nbsp; |
| Norway | Network Norway | &check; | &nbsp; | &nbsp; | &nbsp; |
| Norway | TDC | &nbsp; | &check; | &check; | &nbsp; |
| Norway | Telenor | &check; | &check; | &check; | &nbsp; |
| Norway | Telia | &check; | &check; | &check; | &nbsp; |
| Pakistan | Mobilink | &check; | &check; | &check; | &nbsp; |
| Pakistan | Telenor | &nbsp; | &check; | &check; | &nbsp; |
| Pakistan | Ufone | &nbsp; | &check; | &check; | &nbsp; |
| Pakistan | Warid | &nbsp; | &check; | &check; | &nbsp; |
| Palestine | Jawwal | &nbsp; | &check; | &check; | &nbsp; |
| Panama | Digicel | &nbsp; | &check; | &nbsp; | &nbsp; |
| Panama | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Papua New Guinea | bmobile | &nbsp; | &check; | &check; | &nbsp; |
| Paraguay | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| Paraguay | Personal | &nbsp; | &check; | &nbsp; | &nbsp; |
| Paraguay | Tigo | &nbsp; | &check; | &nbsp; | &nbsp; |
| Paraguay | Vox | &nbsp; | &check; | &nbsp; | &nbsp; |
| Peru | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| Peru | Entel | &nbsp; | &check; | &nbsp; | &nbsp; |
| Peru | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Philippines | Globe | &check; | &check; | &nbsp; | &nbsp; |
| Philippines | Smart | &check; | &check; | &nbsp; | &nbsp; |
| Poland | Era | &check; | &nbsp; | &nbsp; | &nbsp; |
| Poland | Orange | &check; | &check; | &check; | &nbsp; |
| Poland | Play | &check; | &check; | &check; | &nbsp; |
| Poland | Plus | &nbsp; | &check; | &check; | &nbsp; |
| Poland | T-Mobile | &nbsp; | &check; | &check; | &nbsp; |
| Portugal | NOS | &check; | &check; | &check; | &nbsp; |
| Portugal | TMN | &check; | &check; | &check; | &nbsp; |
| Portugal | Vodafone | &check; | &check; | &check; | &nbsp; |
| Qatar | Ooredoo | &check; | &check; | &check; | &nbsp; |
| Qatar | Vodafone | &check; | &check; | &check; | &nbsp; |
| Réunion | SFR | &check; | &nbsp; | &nbsp; | &nbsp; |
| Romania | Orange | &check; | &check; | &check; | &nbsp; |
| Romania | Telekom Romania | &nbsp; | &check; | &check; | &nbsp; |
| Romania | Vodafone | &check; | &check; | &check; | &nbsp; |
| Russia | Beeline | &check; | &nbsp; | &nbsp; | &nbsp; |
| Russia | MTS | &check; | &nbsp; | &nbsp; | &nbsp; |
| Rwanda | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Rwanda | MTN | &check; | &check; | &check; | &nbsp; |
| Saint Kitts and Nevis | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Saint Lucia | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Saint Vincent and the Grenadines | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Serbia | Telenor | &check; | &check; | &check; | &nbsp; |
| Serbia | VIP | &check; | &check; | &check; | &nbsp; |
| Seychelles | Airtel | &check; | &nbsp; | &check; | &nbsp; |
| Singapore | SingTel | &check; | &nbsp; | &nbsp; | &nbsp; |
| Singapore | StarHub | &check; | &nbsp; | &nbsp; | &nbsp; |
| Sint Maarten | TelCell | &nbsp; | &check; | &check; | &nbsp; |
| Slovakia | O2 | &check; | &check; | &check; | &nbsp; |
| Slovakia | Orange | &check; | &check; | &check; | &nbsp; |
| Slovakia | T-Mobile | &check; | &nbsp; | &nbsp; | &nbsp; |
| Slovakia | Telekom | &nbsp; | &check; | &check; | &nbsp; |
| Slovenia | A1 | &nbsp; | &check; | &check; | &nbsp; |
| Slovenia | Mobitel | &check; | &check; | &check; | &nbsp; |
| Slovenia | SI Mobil | &check; | &nbsp; | &nbsp; | &nbsp; |
| South Africa | Cell C | &nbsp; | &check; | &check; | &nbsp; |
| South Africa | MTN | &check; | &check; | &check; | &nbsp; |
| South Africa | Vodacom | &check; | &check; | &check; | &nbsp; |
| South Korea | KT | &check; | &check; | &check; | &nbsp; |
| South Korea | SK Telecom | &check; | &check; | &check; | &nbsp; |
| South Sudan | MTN | &nbsp; | &check; | &check; | &nbsp; |
| Spain | Orange | &nbsp; | &check; | &check; | &nbsp; |
| Spain | Telefonica | &check; | &check; | &check; | &nbsp; |
| Spain | Vodafone | &nbsp; | &check; | &check; | &nbsp; |
| Spain | Yoigo | &nbsp; | &check; | &check; | &nbsp; |
| Sri Lanka | Dialog | &check; | &check; | &check; | &nbsp; |
| Sri Lanka | Mobitel | &nbsp; | &check; | &check; | &nbsp; |
| Suriname | Digicel | &check; | &nbsp; | &nbsp; | &nbsp; |
| Suriname | Telesur | &nbsp; | &check; | &check; | &nbsp; |
| Sweden | 3 (Tre) | &check; | &check; | &check; | &nbsp; |
| Sweden | Tele2 | &check; | &check; | &check; | &nbsp; |
| Sweden | Telenor | &check; | &check; | &check; | &nbsp; |
| Sweden | Telia | &nbsp; | &check; | &check; | &nbsp; |
| Switzerland | Salt | &check; | &check; | &check; | &nbsp; |
| Switzerland | Sunrise | &check; | &check; | &check; | &nbsp; |
| Switzerland | Swisscom | &nbsp; | &check; | &check; | &nbsp; |
| Taiwan | Chunghwa | &nbsp; | &check; | &check; | &nbsp; |
| Taiwan | FarEasTone | &nbsp; | &check; | &check; | &nbsp; |
| Taiwan | T Star | &check; | &check; | &check; | &nbsp; |
| Taiwan | Taiwan Mobile | &check; | &check; | &check; | &nbsp; |
| Tajikistan | Beeline | &nbsp; | &check; | &nbsp; | &nbsp; |
| Tajikistan | Tcell | &nbsp; | &check; | &nbsp; | &nbsp; |
| Tanzania | Airtel | &check; | &check; | &check; | &nbsp; |
| Tanzania | Vodacom | &check; | &nbsp; | &nbsp; | &nbsp; |
| Thailand | AIS | &nbsp; | &check; | &check; | &nbsp; |
| Thailand | DTAC | &check; | &check; | &check; | &nbsp; |
| Thailand | True Move | &check; | &check; | &check; | &nbsp; |
| Trinidad and Tobago | Digicel | &check; | &check; | &nbsp; | &nbsp; |
| Trinidad and Tobago | TSTT | &check; | &check; | &nbsp; | &nbsp; |
| Tunisia | Orange Tunisie | &check; | &check; | &check; | &nbsp; |
| Tunisia | Tunisie Telecom | &nbsp; | &check; | &check; | &nbsp; |
| Turks and Caicos Islands | Flow | &nbsp; | &check; | &nbsp; | &nbsp; |
| Uganda | Africell | &nbsp; | &check; | &check; | &nbsp; |
| Uganda | Airtel | &nbsp; | &check; | &check; | &nbsp; |
| Uganda | MTN | &check; | &check; | &check; | &nbsp; |
| Ukraine | Kyivstar | &check; | &check; | &nbsp; | &nbsp; |
| Ukraine | Life | &nbsp; | &check; | &nbsp; | &nbsp; |
| Ukraine | MTS | &nbsp; | &check; | &nbsp; | &nbsp; |
| United Arab Emirates | du | &check; | &nbsp; | &nbsp; | &nbsp; |
| United Arab Emirates | Etisalat | &check; | &nbsp; | &nbsp; | &nbsp; |
| United Kingdom | 3 | &check; | &check; | &check; | &nbsp; |
| United Kingdom | EE | &nbsp; | &check; | &check; | &nbsp; |
| United Kingdom | O2 | &check; | &check; | &check; | &nbsp; |
| United Kingdom | Vodafone | &check; | &check; | &check; | &nbsp; |
| United States | AT&T | &nbsp; | &nbsp; | &nbsp; | &check; |
| United States | T-Mobile (USA) | &nbsp; | &nbsp; | &nbsp; | &check; |
| Uruguay | Antel | &nbsp; | &check; | &nbsp; | &nbsp; |
| Uruguay | Claro | &nbsp; | &check; | &nbsp; | &nbsp; |
| Uruguay | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Uzbekistan | Beeline | &nbsp; | &check; | &nbsp; | &nbsp; |
| Venezuela | Movistar | &check; | &check; | &nbsp; | &nbsp; |
| Vietnam | MobiFone | &nbsp; | &check; | &check; | &nbsp; |
| Vietnam | Viettel | &check; | &check; | &check; | &nbsp; |
| Vietnam | Vinaphone | &check; | &check; | &check; | &nbsp; |
| Virgin Islands (British) | CCT | &nbsp; | &check; | &nbsp; | &nbsp; |
| Virgin Islands (British) | Flow | &check; | &check; | &nbsp; | &nbsp; |
| Yemen | MTN Yemen | &check; | &nbsp; | &nbsp; | &nbsp; |
| Zambia | Airtel | &nbsp; | &check; | &check; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}



### SIM cards

There are two different kinds of SIM cards, depending on the device:

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 


| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN314 BRN310 | &check; | &check; |
| Boron LTE  | BRN404 BRN402 | &check; | &check; |
| B-Series B402 SoM (Cat M1) | B404 B402 | &nbsp; | &check; |
| B-Series B523 SoM (Cat 1) | B524 B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T404 T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC314 | &check; | &nbsp; |
| Electron LTE (Cat M1) | ELC404 ELC402 | &nbsp; | &check; |
| E-Series 2G/3G | E314 E310 | &nbsp; | &check; |
| E-Series LTE (Cat M1) | E404 E402 | &nbsp; | &check; |

- Devices that do not have a nano SIM card socket (4FF) cannot be used with a 3rd-party SIM card. 
- 3rd-party SIM cards are not recommended for product deployments at scale.
