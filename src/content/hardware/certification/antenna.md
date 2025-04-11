---
title: Antennas
layout: commonTwo.hbs
columns: two
description: Information about antennas and certification
---

# {{title}}

This page includes information on antennas for:

- [Cellular](#cellular)
- [Wi-Fi](#wi-fi)
- [Bluetooth LE (BLE)](#bluetooth-le-ble-)
- [NFC Tag](#nfc)
- [GNSS (Satellite Navigation)](#gnss-satellite-navigation-)

## Cellular

{{box op="start" cssClass="boxed warningBox"}}
Particle devices are certified for use only with the designated antennas specified below. The use of alternative antennas with our modules could necessitate a recertification process. To fully understand the potential consequences of using a non-certified antenna, Particle strongly advises seeking consultation with a qualified RF expert.
{{box op="end"}}

The following cellular antennas are available:

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | M404, M524 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | M404, M524 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE-CAT M1 cell antenna, [x1] | PARANTC41EA | B404X, BRN404X | [Datasheet](/assets/datasheets/PARANTC41.pdf) &#124; [Retail Store](https://store.particle.io/products/wide-band-lte-cat-m1-cell-antenna-x1) |
| Wide band LTE-CAT M1 cell antenna, [x50] | PARANTC41TY | B404X, BRN404X | [Datasheet](/assets/datasheets/PARANTC41.pdf) |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x1]| ANTCW2EA | Tracker, B-Series<sup>1</sup>, E-Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-lte-4-7dbi) |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x50] | ANTCW2TY | Tracker, B-Series<sup>1</sup>, E-Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E-Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x1] | ANTELEC | Electron and E-Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-antenna-1) |
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x50] | ANTELEC50 | Electron and E-Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) |
| Monitor One Cellular Antenna | | KIT-PD-MonitorOne-4G-V03 | [Datasheet](/assets/pdfs/PD-MonitorOne-4G-V03.pdf) |
| Tracker One Cellular Antenna | | Tracker One | [Datasheet](/assets/pdfs/tracker-one-ant-cellular.pdf) |

### Cellular antenna substitution

The PARANTCW1EA, PARANTC41EA, ANTCW2EA, ANT-FLXU are generally compatible across all 2G, 3G, LTE Cat 1, and LTE Cat M1 devices. However, if you use an antenna that is not the antenna that the device was certified with, the device will require recertification. In the United States, this is FCC intentional radiator certification (FCC Part 15, Subpart C), which is the more complicated and expensive of the certifications as it checks the performance in each of the cellular bands.

**Particle recommends you use a Particle antenna that has already been certified for the device.**

In the United States, you can generally substitute an antenna that is of the same type and equal or lesser gain, both total and in all bands. We still recommend using the certified antenna, as you will need FCC permissive change approval to substitute an antenna with equal or lesser gain. For more information, see the  [certification guide](/hardware/certification/certification/#fcc-united-states-rf-certifications).

- If the device is certified with PARANTCW1EA, other antennas have lower gain, but this will result in lower performance
- If the device is certified with PARANTC41EA, substituting ANTCW2EA requires recertification because ANTCW2EA has higher gain in the high frequency bands
- If the device is certified with ANTCW2EA, substituting PARANTC41EA requires recertification because PARANTC41EA has higher gain in the low frequency bands
- If the device is certified with both PARANTC41EA and ANT-FLXU (including the B404X and BRN404X), then substituting ANTCW2EA still requires recertification because of the peak and average gain in the 2600 MHz band.

Note that the ANT-ELEC should not be used with any LTE Cat 1 or LTE Cat M1 device because it does not support some bands used by LTE.


| Parameter | 700/850/900 | 1700/1800/1900 | 2100 | 2400 | 2600 | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Peak gain | | | | | | | |
| PARANTCW1EA | 2.8 | 5.3 | 5.3 | 5.3 | 5.3 | dBi |
| PARANTC41EA | 2.46 | 3.86 | 3.86 |3.86 |3.86 | dBi |
| ANTCW2EA | 1.42 | 3.77 | 4.62 | 4.71 | 4.66 | dBi |
| ANT-FLXU | 1 | 3.5 | 5 | 5 | 4.5|  dBi |
|  | | | | | | | |
| Average gain | | | | | | | |
| PARANTC41EA | 1 | 0.98 | 0.98 | 0.98 | 0.98 | dB |
| ANTCW2EA | -2.98 | -1.9 | -2.65 | -2.1 | -2.2 | dB |
| ANT-FLXU | -3 | -2 | -2.5 | -2 | -2 | dB |


### Cellular antenna dimensions

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

### Compatible devices (cellular)

The following devices have a cellular modem. The Tracker One includes a cellular antenna within the enclosure. All other devices require an antenna connected to the U.FL connector on the module.

{{!-- BEGIN do not edit content below, it is automatically generated 95bdb290-775f-11eb-9439-0242ac130002 --}}

| Device | SKU  | Included | Antenna | Alternate | Lifecycle |
| :----- | :--- | :--------: | :------: | :--------: | :-------: |
| Asset Tracker 2G | ASSET2GV2 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Asset Tracker 3G (Americas/Aus) | ASSET3G260V2 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Asset Tracker 3G (Eur/Asia/Afr) | ASSET3G270V2 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | B504MEA | &check; | PARANTCW1EA | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | B504MTY | &nbsp; | PARANTCW1TY | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | B504EMEA | &check; | PARANTCW1EA | &nbsp; | GA|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | B504EMTY | &nbsp; | PARANTCW1TY | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | B524MEA | &check; | ANTCW2EA | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | B524MTY | &nbsp; | ANTCW2TY | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY | &nbsp; | ANTCW2TY | &nbsp; | NRND|
| B-Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &nbsp; | ANTCW2TY | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404XMEA | &check; | PARANTC41EA | ANT-FLXU<sup>3</sup> | GA|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404MTY | &nbsp; | ANTCW2TY | &nbsp; | NRND|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404XMTY | &nbsp; | PARANTC41TY | ANT-FLXU-50<sup>3</sup> | GA|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN310KIT | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN314KIT | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN310TRAY50 | &nbsp; | ANT-FLXU-50 | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN314TRAY50 | &nbsp; | ANT-FLXU-50 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404KIT | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404XKIT | &check; | PARANTC41EA | ANT-FLXU<sup>3</sup> | GA|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | BRN404TRAY50 | &nbsp; | ANT-FLXU-50 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | BRN402-AQKT | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404 | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404X | &check; | PARANTC41EA | ANT-FLXU<sup>3</sup> | GA|
| Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | BRN402KIT | &check; | ANT-FLXU | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | &nbsp; | ANT-FLXU-50 | &nbsp; | NRND|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN404XTRAY50 | &nbsp; | PARANTC41TY | ANT-FLXU-50<sup>3</sup> | GA|
| E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | E310KIT | &check; | ANTELEC | ANTCW2EA<sup>2</sup> | NRND|
| E-Series 2G/3G (Global - E310), [x1] | E310MOD1 | &check; | ANTELEC | ANTCW2EA<sup>2</sup> | Deprecated|
| E-Series 2G/3G (Global - E310), Tray [x50] | E310TRAY50 | &nbsp; | ANTELEC50 | ANTCW2TY<sup>2</sup> | Deprecated|
| E-Series 2G/3G (Global - E313), [x1] | E313EA | &check; | ANTELEC | ANTCW2EA<sup>2</sup> | Deprecated|
| E-Series 2G/3G (Global - E313), Tray [x50] | E313TRAY50 | &nbsp; | ANTELEC50 | ANTCW2TY<sup>2</sup> | End of life|
| E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | E314KIT | &check; | ANTELEC | ANTCW2EA<sup>2</sup> | NRND|
| E-Series 2G/3G (Global - E314), [x1] | E314MOD1 | &check; | ANTELEC | ANTCW2EA<sup>2</sup> | Deprecated|
| E-Series 2G/3G (Global - E314), Tray [x50] | E314TRAY50 | &nbsp; | ANTELEC50 | ANTCW2TY<sup>2</sup> | NRND|
| E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | E404TRAY50 | &nbsp; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | Deprecated|
| E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | E404XTRAY50 | &nbsp; | ANT-FLXU-50 | PARANTC41TY<sup>2</sup> | GA|
| E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | E402KIT | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | NRND|
| E-Series LTE CAT-M1 (NorAm), [x1] | E402MOD1 | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | Deprecated|
| E-Series LTE CAT-M1 (NorAm), Tray [x50] | E402TRAY50 | &check; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | NRND|
| E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | E404KIT | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | NRND|
| E-Series LTE-M (NorAm, EtherSIM), [x1] | E404MOD1 | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | NRND|
| Electron 2 LTE CAT-1 bis (Europe), [x1] | ELC524EMEA | &check; | PARANTCW1EA | ANT-FLXU<sup>3</sup> | In development|
| Electron 2 LTE CAT-1 bis (Europe), [x50] | ELC524EMTY | &check; | PARANTCW1TY | ANT-FLXU-50<sup>3</sup> | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x1] | ELC504EMEA | &check; | PARANTCW1EA | ANT-FLXU<sup>3</sup> | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x50] | ELC504EMTY | &check; | PARANTCW1TY | ANT-FLXU-50<sup>3</sup> | In development|
| Electron 2G (Global), Tray [x50] | E350TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | Deprecated|
| Electron 2G Kit (Global) | E350KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | Deprecated|
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | NRND|
| Electron 2G/3G (Global - U201) , Tray [x50] | ELC314TY | &nbsp; | ANT-FLXU-50 | &nbsp; | NRND|
| Electron 3G (Americas/Aus) Sensor Kit, [x1] | SNSRKIT3G260 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | SNSRKIT3G270 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | ELC404TY | &nbsp; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | Deprecated|
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | Deprecated|
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY | &nbsp; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | Deprecated|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | M524MEA | &check; | PARANTCW1EA | &nbsp; | GA|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | M524MTY | &nbsp; | PARANTCW1TY | &nbsp; | GA|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635EMEA | &check; | PARANTCW1EA | &nbsp; | In development|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635MEA | &check; | PARANTCW1EA | &nbsp; | In development|
| M-Series LTE-M/2G (Global, EtherSIM), [x1] | M404MEA | &check; | PARANTCW1EA | &nbsp; | GA|
| M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | M404MTY | &nbsp; | PARANTCW1TY | &nbsp; | GA|
| Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON524E01C01KIT | &check; | 1 | &nbsp; | GA|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | MON404E02C01KIT | &check; | 1 | &nbsp; | In development|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON404E01C01KIT | &check; | 1 | &nbsp; | GA|
| Muon Carrier Board - Beta Sample | MUONCB-BETA | &nbsp; | PARANTCW1EA | &nbsp; | Deprecated|
| Muon Carrier Board (Dev Board only) | MUONCB | &nbsp; | PARANTCW1EA | &nbsp; | GA|
| Muon Carrier Board Kit | MUONCBKIT | &nbsp; | PARANTCW1EA | &nbsp; | GA|
| Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | MUON524 | &check; | PARANTCW1EA | &nbsp; | GA|
| Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | MUON524EA | &check; | PARANTCW1EA | &nbsp; | GA|
| Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | MUON635 | &check; | PARANTCW1EA | &nbsp; | In development|
| Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | MUON635EA | &check; | PARANTCW1EA | &nbsp; | In development|
| Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | MUON404 | &check; | PARANTCW1EA | &nbsp; | GA|
| Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | MUON404EA | &check; | PARANTCW1EA | &nbsp; | GA|
| Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | ONE524MTY | &check; | 1 | &nbsp; | GA|
| Tracker One CAT1/3G/2G (Europe), Bulk [x40] | ONE523MTY | &check; | 1 | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | ONE524MEA | &check; | 1 | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | 1 | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), [x1] | ONE404MEA | &check; | 1 | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | ONE404MTY | &check; | 1 | &nbsp; | GA|
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | 1 | &nbsp; | Deprecated|
| Tracker One LTE M1 (NorAm), Bulk [x40] | ONE402MTY | &check; | 1 | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | T524MKIT | &check; | ANTCW2EA | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | T524MEA | &check; | ANTCW2EA | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | T524MTY | &check; | ANTCW2TY | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523MKIT | &check; | ANTCW2EA | &nbsp; | NRND|
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &nbsp; | ANTCW2TY | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | T404MKIT | &check; | ANTCW2EA | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | T404MEA | &check; | ANTCW2EA | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | T404MTY | &nbsp; | ANTCW2TY | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | ANTCW2EA | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &nbsp; | ANTCW2TY | &nbsp; | NRND|


{{!-- END do not edit content above, it is automatically generated 95bdb290-775f-11eb-9439-0242ac130002 --}}

<sup>1</sup>The Tracker One includes a custom antenna designed for optimal performance with the Tracker One. 

<sup>2</sup> This device originally shipped with one antenna (ANTELEC or ANT-FLXU) however the ANTCW2EA is listed as an alternative. The ANTCW2EA (or ANTCW2TY) is recommended as most new designs will use this antenna and using this antenna will reduce the number of SKUs you need to stock when building a product at tray quantities.

<sup>3</sup> The B404X and BRN404X ship with the PARANTC41EA which has the best performance in LTE Cat M1 bands most commonly used in North America, including B12 and B13. It is also certified with ANT-FLXU which can be used as an alternative antenna.



### Not compatible (cellular)

These devices do not have a cellular modem and therefore do not need a cellular antenna.

{{!-- BEGIN do not edit content below, it is automatically generated 57d69268-776d-11eb-9439-0242ac130002 --}}

| Family | SKUs |
| :----- | :--- |
| Argon | ARG-AQKT, ARG-LDKT, ARG-STRTKT, ARGN-H, ARGNKIT, ARGNTRAY50|
| Photon | PHNTRAYH, PHNTRAYNOH, PHOTONH, PHOTONKIT, PHOTONNOH|
| P-Series | P0MOD10, P0REEL, P1MOD10, P1REEL, P2MOD10, P2REEL, PHN2EDGEKIT, PHN2KIT, PHN2MEA, PHN2MTY|


{{!-- END do not edit content above, it is automatically generated 57d69268-776d-11eb-9439-0242ac130002 --}}

	
### Certification and antenna substitution

Full certification of a device typically involves three different certifications:

1. **Unintentional radiator**. This is a certification that your completed device does not emit extraneous radiation that would affect other devices. This is almost always required, but is the least expensive and easiest test to complete. In the United States, this is FCC 47 CFR Part 15 Subpart B. A test lab performs the measurements and you sign a Suppliers Declaration of Conformity (SDoC).

2. **Intentional radiator**. This test is more involved and requires testing the power output in each band the transmitters are capable of using. In the United States, this is FCC 47 CRF Part 15, Subpart C. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again.

3. [PTCRB](https://www.ptcrb.com/). This is a certification for cellular devices in the United States. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again. 

In the United States [this document from the FCC](https://apps.fcc.gov/kdb/GetAttachment.html?id=bNCiEdkFEKnHsZF9GHCNdg%3D%3D&desc=996369%20D04%20Module%20Integration%20Guide%20V02&tracking_number=44637) provides a great deal of information about the various certifications. The process is similar in Canada (ISED, formerly known as IC). In the European Union you will need to have a test lab perform similar tests, but there isn't the equivalent of an FCC or ISED identification number for the EU.

In order to avoid having to complete steps 2 and 3 again, a substitute antenna must:

1. Be of the same type.
2. Have equal or lesser gain in all bands.
3. Similar in-band and out-of-band characteristics.

All Particle cellular devices include a trace-style PCB or flex antenna, which are considered to be the same type.

The equal or lesser gain in all bands test is why you can't substitute the ANTCW2EA (Particle cellular antenna) for the ANT-FLXU (Taoglas FXUB63) on the Boron, even though it works quite well. The ANTCW2EA has higher gain in some bands, so using it would require recertification. For example, ANTCW2EA has 1.42 dBi gain vs. 1.0 dBi in Band 13, the 700 MHz band.

[This guide may be helpful](https://linxtechnologies.com/wp/blog-post/antenna-fcc-certification/) in understanding this.

### Prototyping with other antennas

For prototyping and personal use you may be able to use different cellular antennas.

All Particle cellular devices have a U.FL antenna connector. Most cellular antennas have a SMA connector, so you'll need an adapter. At Adafruit, you can get [this adapter](https://www.adafruit.com/product/851). At SparkFun [this adapter](https://www.sparkfun.com/products/9145). At Amazon [this adapter](https://www.amazon.com/gp/product/B01AJQ33Y4/ref=ppx_yo_dt_b_search_asin_title).

[This antenna from Amazon](https://www.amazon.com/Eightwood-Antenna-Magnetic-Connector-2100Mhz/dp/B010EU5C1W/ref=pd_ybh_a_77) is about 4" long, has a magnetic mount, and a 3 meter cable. It is helpful in improving reception in fringe areas. Or for more gain, a [12" antenna](https://www.wilsonamplifiers.com/12-inch-magnet-mount-antenna-12ft-sma-male-311125/).

### Cellular boosters and micro cells

Cellular boosters like the [weBoost](https://www.amazon.com/weBoost-472120-Signal-Booster-Carriers/dp/B081BM99M9/ref=sr_1_4) generally work with all Particle cellular devices, assuming there is at least some faint, compatible signal available. For example, with the Boron 2G/3G in the United States, if you only have a weak T-Mobile signal they can be helpful. If you have no T-Mobile service at all in your area, they will not help.

Cellular micro/pico/femto cells that use the Internet to connect to a specific carrier generally do not work. For example, the AT&T MicroCell does not work with the Electron and E-Series, even though they can use AT&T in the United States. The reason is that the Particle devices are roaming on AT&T, and the MicroCell product does not allow access to roaming cellular devices.


## Wi-Fi

The Particle 2.4 GHz Wi-Fi antenna is available in the [retail](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) and wholesale stores. Note: The same external antenna model is used for Wi-Fi and BLE.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x1] | PARANTWM1EA | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/particle-p2-photon2-wi-fi-antenna-2-4-5ghz)  |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x50] |PARANTWM1TY | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |
| Tracker One Wi-Fi Antenna | | [Datasheet](/assets/pdfs/tracker-one-ant-wifi.pdf) |


{{!-- BEGIN shared-blurb adf4fb35-acf2-464b-8080-15e05f79006b --}}
{{box op="start" cssClass="boxed warningBox"}}
Do not use the Argon Wi-Fi/BLE antenna (ANT-FLXV2) on the P2, Photon 2, or M-SoM. The Argon antenna does not 
work with 5 GHz and this will result in poor Wi-Fi performance on the P2, Photon 2, and M-SoM.
{{box op="end"}}
{{!-- END shared-blurb --}}


### Compatible devices (Wi-Fi)


{{!-- BEGIN do not edit content below, it is automatically generated 04ed49fe-7766-11eb-9439-0242ac130002 --}}

| Device | SKU  | Built-In Antenna | External Compatible | External Included | Lifecycle |
| :----- | :--- | :--------: | :------: | :------: | :-------: |
| Argon [x1] | ARGN-H | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Argon Air Quality Monitor Kit [x1] | ARG-AQKT | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Argon Leak Detection Kit [x1] | ARG-LDKT | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Argon Starter Kit [x1] | ARG-STRTKT | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Argon, Starter Kit  [x1] | ARGNKIT | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Argon, Tray [x50] | ARGNTRAY50 | &nbsp; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Edge ML Kit for Photon 2 (Photon 2 included) | PHN2EDGEKIT | trace | 4 | &nbsp; | Deprecated|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | M524MEA | &nbsp; | PARANTWM1EA | &check; | GA|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | M524MTY | &nbsp; | PARANTWM1TY | &nbsp; | GA|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635EMEA | &nbsp; | PARANTWM1EA | &check; | In development|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635MEA | &nbsp; | PARANTWM1EA | &check; | In development|
| M-Series LTE-M/2G (Global, EtherSIM), [x1] | M404MEA | &nbsp; | PARANTWM1EA | &check; | GA|
| M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | M404MTY | &nbsp; | PARANTWM1TY | &nbsp; | GA|
| Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON524E01C01KIT | 1 | &nbsp; | &nbsp; | GA|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | MON404E02C01KIT | 1 | &nbsp; | &nbsp; | In development|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON404E01C01KIT | 1 | &nbsp; | &nbsp; | GA|
| Muon Carrier Board - Beta Sample | MUONCB-BETA | &nbsp; | PARANTWM1EA | &nbsp; | Deprecated|
| Muon Carrier Board (Dev Board only) | MUONCB | &nbsp; | PARANTWM1EA | &nbsp; | GA|
| Muon Carrier Board Kit | MUONCBKIT | &nbsp; | PARANTWM1EA | &nbsp; | GA|
| Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | MUON524 | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | MUON524EA | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | MUON635 | &nbsp; | PARANTWM1EA | &check; | In development|
| Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | MUON635EA | &nbsp; | PARANTWM1EA | &check; | In development|
| Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | MUON404 | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | MUON404EA | &nbsp; | PARANTWM1EA | &check; | GA|
| P0 Wi-Fi Module, Cut tape [x10] | P0MOD10 | &nbsp; | true | &nbsp; | Deprecated|
| P0 Wi-Fi Module, Reel [x2000] | P0REEL | &nbsp; | true | &nbsp; | Deprecated|
| P1 Wi-Fi Module, Cut tape [x10] | P1MOD10 | trace | 3 | &nbsp; | Deprecated|
| P1 Wi-Fi Module, Reel [x500] | P1REEL | trace | 3 | &nbsp; | NRND|
| P2 Wi-Fi Module, Cut tape [x10] | P2MOD10 | trace | 4 | &nbsp; | GA|
| P2 Wi-Fi Module, Reel [x600] | P2REEL | trace | 4 | &nbsp; | GA|
| Photon 2 [x1] | PHN2MEA | trace | 4 | &nbsp; | GA|
| Photon 2, Kit [x1] | PHN2KIT | trace | 4 | &nbsp; | GA|
| Photon 2, Tray [x50] | PHN2MTY | trace | 4 | &nbsp; | GA|
| Photon with Headers Starter Kit, [x1] | PHOTONKIT | chip | 3 | &nbsp; | Deprecated|
| Photon with Headers, [x1] | PHOTONH | chip | 3 | &nbsp; | Deprecated|
| Photon with Headers, Tray [x50] | PHNTRAYH | chip | 3 | &nbsp; | NRND|
| Photon without Headers, Dev board Kit [x1] | PHOTONNOH | chip | 3 | &nbsp; | Deprecated|
| Photon without Headers, Tray [x50] | PHNTRAYNOH | chip | 3 | &nbsp; | Deprecated|
| Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | ONE524MTY | 1 | &nbsp; | &nbsp; | GA|
| Tracker One CAT1/3G/2G (Europe), Bulk [x40] | ONE523MTY | 1 | &nbsp; | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | ONE524MEA | 1 | &nbsp; | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | 1 | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), [x1] | ONE404MEA | 1 | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | ONE404MTY | 1 | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | 1 | &nbsp; | &nbsp; | Deprecated|
| Tracker One LTE M1 (NorAm), Bulk [x40] | ONE402MTY | 1 | &nbsp; | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | T524MKIT | &nbsp; | ANT-FLXV2 | &check; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | T524MEA | &nbsp; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | T524MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523MKIT | &nbsp; | ANT-FLXV2 | &check; | NRND|
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &nbsp; | ANT-FLXV2 | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | T404MKIT | &nbsp; | ANT-FLXV2 | &check; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | T404MEA | &nbsp; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | T404MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &nbsp; | ANT-FLXV2 | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | NRND|


{{!-- END do not edit content above, it is automatically generated 04ed49fe-7766-11eb-9439-0242ac130002 --}}

<sup>1</sup>The Tracker One includes a Wi-Fi antenna inside the case, however it's a different antenna than the Particle 2.4 GHz Antenna. Note that the Wi-Fi on the Tracker One is only for Wi-Fi geolocation and cannot be used for data communication.

<sup>2</sup>The Argon [x1] includes ANT-FLXV2. The Argon Tray [x50] do not include a Wi-Fi antenna but are compatible and certified with with ANT-FLXV2 (and ANT-FLXV2-50).

<sup>3</sup>The Photon and P1 are certified with the built-in chip or trace antenna and also with the following external antenna:

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| Dipole antenna | LumenRadio | 104-1001 | 2.15dBi |

[This antenna from Adafruit](https://www.adafruit.com/product/944) is compatible and can be substituted when an external dipole ("duck") antenna is desired on the Photon and P1 while using the existing Particle certification. Note that a [RP-SMA to U.FL adapter](https://www.adafruit.com/product/852) is required to use this antenna.

<sup>4</sup>The P2 and Photon 2 certified with the built-in trace antenna, and also the PARANTWM1EA and PARANTWM1TY external antennas. The antenna is used for both Wi-Fi (2.4 GHz and 5 GHz) as well as BLE (2.4 GHz).

### Not compatible (Wi-Fi)

These devices do not have a Wi-Fi modem and therefore do not need a Wi-Fi antenna.

{{!-- BEGIN do not edit content below, it is automatically generated cee24faa-776d-11eb-9439-0242ac130002 --}}

| Family | SKUs |
| :----- | :--- |
| B-Series SoM | B402MEA, B402MTY, B404MEA, B404MTY, B404XMEA, B404XMTY, B504EMEA, B504EMTY, B504MEA, B504MTY, B523MEA, B523MTY, B524MEA, B524MTY|
| Boron | BRN310KIT, BRN310TRAY50, BRN314KIT, BRN314TRAY50, BRN402, BRN402-AQKT, BRN402KIT, BRN402TRAY50, BRN404, BRN404KIT, BRN404TRAY50, BRN404X, BRN404XKIT, BRN404XTRAY50|
| E-Series | E310KIT, E310MOD1, E310TRAY50, E313EA, E314KIT, E314MOD1, E314TRAY50, E402KIT, E402MOD1, E402TRAY50, E404KIT, E404MOD1, E404TRAY50, E404XTRAY50|
| Electron 2 | ELC504EMEA, ELC504EMTY, ELC524EMEA, ELC524EMTY|
| Electron | ASSET2GV2, ASSET3G260V2, ASSET3G270V2, E260KIT, E260TRAY50, E270KIT, E270TRAY50, E350KIT, E350TRAY50, ELC314TY, ELC402EA, ELC402TY, ELC404TY, SNSRKIT3G260, SNSRKIT3G270|


{{!-- END do not edit content above, it is automatically generated cee24faa-776d-11eb-9439-0242ac130002 --}}


## Bluetooth LE (BLE)

Particle Gen 3 devices support BLE for short-distance communication. Most devices include a built-in chip antenna, and can optionally use an external antenna. 

The exception is the B-Series SoM, which does not have a chip antenna on the SoM and requires an external antenna if BLE is to be used. Use of BLE on the B-Series SoM is optional.

The Particle 2.4 GHz BLE antenna is available in the [retail](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) and wholesale stores. Note: The same external antenna model is used for Wi-Fi and BLE.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |
| Tracker One BLE Antenna | | [Datasheet](/assets/pdfs/tracker-one-ant-ble.pdf) |

The P2 and Photon 2 share its antenna between Wi-Fi and BLE and does not require a separate BLE antenna. The P2 includes an internal trace antenna. An external dual-band antenna can be connected to the U.FL connector and selcted in software. This will require additional certification with your external antenna.

The M-SoM shares its antenna between Wi-Fi and BLE, but does not include a built-in trace antenna. An external antenna is required to use BLE or Wi-Fi.

### Compatible devices (BLE)

These devices include Bluetooth LE (BLE) capabilities.



{{!-- BEGIN do not edit content below, it is automatically generated 54f1ecbe-7768-11eb-9439-0242ac130002 --}}

| Device | SKU  | Built-In Antenna | External Compatible | External Included | Lifecycle |
| :----- | :--- | :--------: | :------: | :------: | :-------: |
| Argon [x1] | ARGN-H | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Argon Air Quality Monitor Kit [x1] | ARG-AQKT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Argon Leak Detection Kit [x1] | ARG-LDKT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Argon Starter Kit [x1] | ARG-STRTKT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Argon, Starter Kit  [x1] | ARGNKIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Argon, Tray [x50] | ARGNTRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | B504MEA | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | B504MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | B504EMEA | &nbsp; | ANT-FLXV2 | &check; | GA|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | B504EMTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | B524MEA | &nbsp; | ANT-FLXV2 | &check; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | B524MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | NRND|
| B-Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| B-Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404MEA | &nbsp; | ANT-FLXV2 | &check; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404XMEA | &nbsp; | ANT-FLXV2 | &check; | GA|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404MTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | NRND|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404XMTY | &nbsp; | ANT-FLXV2-50 | &nbsp; | GA|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN310KIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN314KIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN310TRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN314TRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404KIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404XKIT | &check; | ANT-FLXV2 | &nbsp; | GA|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | BRN404TRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | BRN402-AQKT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404 | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404X | &check; | ANT-FLXV2 | &nbsp; | GA|
| Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | BRN402KIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | NRND|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN404XTRAY50 | &check; | ANT-FLXV2-50 | &nbsp; | GA|
| Edge ML Kit for Photon 2 (Photon 2 included) | PHN2EDGEKIT | &check; | 4 | &nbsp; | Deprecated|
| Electron 2 LTE CAT-1 bis (Europe), [x1] | ELC524EMEA | &check; | ANT-FLXV2 | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (Europe), [x50] | ELC524EMTY | &check; | ANT-FLXV2-50 | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x1] | ELC504EMEA | &check; | ANT-FLXV2 | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x50] | ELC504EMTY | &check; | ANT-FLXV2-50 | &nbsp; | In development|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | M524MEA | &nbsp; | PARANTWM1EA | &check; | GA|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | M524MTY | &nbsp; | PARANTWM1TY | &nbsp; | GA|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635EMEA | &nbsp; | PARANTWM1EA | &check; | In development|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635MEA | &nbsp; | PARANTWM1EA | &check; | In development|
| M-Series LTE-M/2G (Global, EtherSIM), [x1] | M404MEA | &nbsp; | PARANTWM1EA | &check; | GA|
| M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | M404MTY | &nbsp; | PARANTWM1TY | &nbsp; | GA|
| Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON524E01C01KIT | &check; | &nbsp; | &nbsp; | GA|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | MON404E02C01KIT | &check; | &nbsp; | &nbsp; | In development|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON404E01C01KIT | &check; | &nbsp; | &nbsp; | GA|
| Muon Carrier Board - Beta Sample | MUONCB-BETA | &nbsp; | PARANTWM1EA | &nbsp; | Deprecated|
| Muon Carrier Board (Dev Board only) | MUONCB | &nbsp; | PARANTWM1EA | &nbsp; | GA|
| Muon Carrier Board Kit | MUONCBKIT | &nbsp; | PARANTWM1EA | &nbsp; | GA|
| Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | MUON524 | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | MUON524EA | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | MUON635 | &nbsp; | PARANTWM1EA | &check; | In development|
| Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | MUON635EA | &nbsp; | PARANTWM1EA | &check; | In development|
| Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | MUON404 | &nbsp; | PARANTWM1EA | &check; | GA|
| Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | MUON404EA | &nbsp; | PARANTWM1EA | &check; | GA|
| P2 Wi-Fi Module, Cut tape [x10] | P2MOD10 | &check; | 4 | &nbsp; | GA|
| P2 Wi-Fi Module, Reel [x600] | P2REEL | &check; | 4 | &nbsp; | GA|
| Photon 2 [x1] | PHN2MEA | &check; | 4 | &nbsp; | GA|
| Photon 2, Kit [x1] | PHN2KIT | &check; | 4 | &nbsp; | GA|
| Photon 2, Tray [x50] | PHN2MTY | &check; | 4 | &nbsp; | GA|
| Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | ONE524MTY | &check; | &nbsp; | &nbsp; | GA|
| Tracker One CAT1/3G/2G (Europe), Bulk [x40] | ONE523MTY | &check; | &nbsp; | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | ONE524MEA | &check; | &nbsp; | &nbsp; | GA|
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), [x1] | ONE404MEA | &check; | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | ONE404MTY | &check; | &nbsp; | &nbsp; | GA|
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &nbsp; | &nbsp; | Deprecated|
| Tracker One LTE M1 (NorAm), Bulk [x40] | ONE402MTY | &check; | &nbsp; | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | T524MKIT | &check; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | T524MEA | &check; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | T524MTY | &check; | ANT-FLXV2-50 | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523MKIT | &check; | ANT-FLXV2 | &nbsp; | NRND|
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &check; | ANT-FLXV2-50 | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | T404MKIT | &check; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | T404MEA | &check; | ANT-FLXV2 | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | T404MTY | &check; | ANT-FLXV2-50 | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | ANT-FLXV2 | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &check; | ANT-FLXV2-50 | &nbsp; | NRND|


{{!-- END do not edit content above, it is automatically generated 54f1ecbe-7768-11eb-9439-0242ac130002 --}}

	
<sup>1</sup>The Tracker One includes an BLE antenna inside the case, however it's a different antenna than the Particle 2.4 GHz Antenna (ANT-FLXV2). A separate antenna is used because the Tracker SoM is mounted on the bottom side of the Tracker Carrier Board, so signals to the chip antenna would be adversely affected.

<sup>4</sup>The P2 and Photon 2 certified with the built-in trace antenna, and also the PARANTWM1EA and PARANTWM1TY external antennas. The antenna is used for both Wi-Fi (2.4 GHz and 5 GHz) as well as BLE (2.4 GHz).

### Not compatible (BLE)

These devices do not have a BLE radio and therefore do not need a BLE antenna.

{{!-- BEGIN do not edit content below, it is automatically generated 2cf3e112-776e-11eb-9439-0242ac130002 --}}

| Family | SKUs |
| :----- | :--- |
| E-Series | E310KIT, E310MOD1, E310TRAY50, E313EA, E314KIT, E314MOD1, E314TRAY50, E402KIT, E402MOD1, E402TRAY50, E404KIT, E404MOD1, E404TRAY50, E404XTRAY50|
| Electron | ASSET2GV2, ASSET3G260V2, ASSET3G270V2, E260KIT, E260TRAY50, E270KIT, E270TRAY50, E350KIT, E350TRAY50, ELC314TY, ELC402EA, ELC402TY, ELC404TY, SNSRKIT3G260, SNSRKIT3G270|
| Photon | PHNTRAYH, PHNTRAYNOH, PHOTONH, PHOTONKIT, PHOTONNOH|
| P-Series | P0MOD10, P0REEL, P1MOD10, P1REEL|


{{!-- END do not edit content above, it is automatically generated 2cf3e112-776e-11eb-9439-0242ac130002 --}}

	

## NFC

Particle Gen 3 devices can optionally be used in NFC tag mode. This can only be read by a device such as a smartphone app; it cannot read tags.

The Particle NFC Antenna is available in the [retail](https://store.particle.io/products/nfc-antenna) and wholesale stores. 

| Antenna | SKU  | Links |
| :------ | :--- | :---- | 
| Particle NFC Antenna, [x1] | ANT-NFC | [Datasheet](/assets/datasheets/ANT-NFC.pdf) &#124; [Retail Store](https://store.particle.io/products/nfc-antenna) |
| Tracker One NFC Antenna | | [Datasheet](/assets/pdfs/tracker-one-ant-nfc.pdf) |

The P2, Photon 2, and M-SoM do not support NFC.

### Compatible devices (NFC)

These devices have NFC tag capabilities. Only the Tracker One has a built-in NFC antenna, all other devices require an external NFC antenna to use the NFC tag feature. If you are not using NFC tag you do not need to add the antenna.


{{!-- BEGIN do not edit content below, it is automatically generated 2b1c34c8-776b-11eb-9439-0242ac130002 --}}

| Device | SKU  | Compatible | Included | Lifecycle |
| :----- | :--- | :--------: | :------: | :-------: |
| Argon [x1] | ARGN-H | &check; | &nbsp; | Deprecated|
| Argon Air Quality Monitor Kit [x1] | ARG-AQKT | &check; | &nbsp; | Deprecated|
| Argon Leak Detection Kit [x1] | ARG-LDKT | &check; | &nbsp; | Deprecated|
| Argon Starter Kit [x1] | ARG-STRTKT | &check; | &nbsp; | Deprecated|
| Argon, Starter Kit  [x1] | ARGNKIT | &check; | &nbsp; | Deprecated|
| Argon, Tray [x50] | ARGNTRAY50 | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | B504MEA | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | B504MTY | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | B504EMEA | &check; | &nbsp; | GA|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | B504EMTY | &check; | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | B524MEA | &check; | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | B524MTY | &check; | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY | &check; | &nbsp; | NRND|
| B-Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &check; | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404MEA | &check; | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404XMEA | &check; | &nbsp; | GA|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404MTY | &check; | &nbsp; | NRND|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404XMTY | &check; | &nbsp; | GA|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN310KIT | &check; | &nbsp; | Deprecated|
| Boron 2G/3G (Global) Starter Kit, [x1] | BRN314KIT | &check; | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN310TRAY50 | &check; | &nbsp; | Deprecated|
| Boron 2G/3G (Global), Tray [x50] | BRN314TRAY50 | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404KIT | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | BRN404XKIT | &check; | &nbsp; | GA|
| Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | BRN404TRAY50 | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | BRN402-AQKT | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404 | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), [x1] | BRN404X | &check; | &nbsp; | GA|
| Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | BRN402KIT | &check; | &nbsp; | Deprecated|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | &check; | &nbsp; | NRND|
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN404XTRAY50 | &check; | &nbsp; | GA|
| Electron 2 LTE CAT-1 bis (Europe), [x1] | ELC524EMEA | &check; | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (Europe), [x50] | ELC524EMTY | &check; | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x1] | ELC504EMEA | &check; | &nbsp; | In development|
| Electron 2 LTE CAT-1 bis (NorAm), [x50] | ELC504EMTY | &check; | &nbsp; | In development|
| Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | ONE524MTY | &check; | &check; | GA|
| Tracker One CAT1/3G/2G (Europe), Bulk [x40] | ONE523MTY | &check; | &check; | GA|
| Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | ONE524MEA | &check; | &check; | GA|
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), [x1] | ONE404MEA | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | ONE404MTY | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &check; | Deprecated|
| Tracker One LTE M1 (NorAm), Bulk [x40] | ONE402MTY | &check; | &check; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | T524MKIT | &check; | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | T524MEA | &check; | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | T524MTY | &check; | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523MKIT | &check; | &nbsp; | NRND|
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | T404MKIT | &check; | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | T404MEA | &check; | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | T404MTY | &check; | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &check; | &nbsp; | NRND|


{{!-- END do not edit content above, it is automatically generated 2b1c34c8-776b-11eb-9439-0242ac130002 --}}

<sup>1</sup>The Tracker One includes an NFC antenna inside the case, however it's a different antenna than the Particle NFC Antenna (ANT-NFC).

    
### Not compatible (NFC)

These devices do not have an NFC radio and therefore do not need a NFC antenna.

{{!-- BEGIN do not edit content below, it is automatically generated 6b9301fa-776e-11eb-9439-0242ac130002 --}}

| Family | SKUs |
| :----- | :--- |
| Tracker | MON404E01C01KIT, MON404E02C01KIT, MON524E01C01KIT|
| M-Series SoM | M404MEA, M404MTY, M524MEA, M524MTY, M635EMEA, M635MEA, MUON404, MUON404EA, MUON524, MUON524EA, MUON635, MUON635EA|
| E-Series | E310KIT, E310MOD1, E310TRAY50, E313EA, E314KIT, E314MOD1, E314TRAY50, E402KIT, E402MOD1, E402TRAY50, E404KIT, E404MOD1, E404TRAY50, E404XTRAY50|
| Electron | ASSET2GV2, ASSET3G260V2, ASSET3G270V2, E260KIT, E260TRAY50, E270KIT, E270TRAY50, E350KIT, E350TRAY50, ELC314TY, ELC402EA, ELC402TY, ELC404TY, SNSRKIT3G260, SNSRKIT3G270|
| Photon | PHNTRAYH, PHNTRAYNOH, PHOTONH, PHOTONKIT, PHOTONNOH|
| P-Series | P0MOD10, P0REEL, P1MOD10, P1REEL, P2MOD10, P2REEL, PHN2EDGEKIT, PHN2KIT, PHN2MEA, PHN2MTY|


{{!-- END do not edit content above, it is automatically generated 6b9301fa-776e-11eb-9439-0242ac130002 --}}


## GNSS (Satellite Navigation)

The Tracker One includes a [Cirocomm PA035AQ0004](http://www.cirocomm.com/en-global/products_ciro/detail/PA035AQ0004) (T0004, 35x35mm) GPS/GLOSNASS antenna on the Tracker Carrier Board.

The M-SoM can use this GNSS antenna. Single unit quantites (M404MEA, M524MEA) include a GNSS antenna. It's not included in tray quantities.

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

As the GNSS system is receive-only (no transmitter), you can use any GNSS compatible antenna without affecting the certification. Different GNSS systems use different frequencies. Many antennas are tuned to the United States GPS system, however you can also get multi-GNSS antennas that are compatible with other systems. All of these systems offer coverage world-wide.

| System   | Owner | 
| :------- | :--- |
| GPS      | United States |
| GLOSNASS | Russia |
| BeiDou   | China |
| Galileo  | European Space Agency |

Some antenna options include from Adafruit [this antenna](https://www.adafruit.com/product/960) and [this adapter](https://www.adafruit.com/product/851). At SparkFun [this antenna](https://www.sparkfun.com/products/14986) and [this adapter](https://www.sparkfun.com/products/9145). At Amazon [this antenna](https://www.amazon.com/gp/product/B00LXRQY9A/ref=ppx_yo_dt_b_search_asin_title) and [this adapter](https://www.amazon.com/gp/product/B01AJQ33Y4/ref=ppx_yo_dt_b_search_asin_title).

The following devices have GNSS capabilities:

{{!-- BEGIN do not edit content below, it is automatically generated dd897350-776b-11eb-9439-0242ac130002 --}}

| Device | SKU  | Compatible | Included | Lifecycle |
| :----- | :--- | :--------: | :------: | :-------: |
| Asset Tracker 2G | ASSET2GV2 | &check; | &check; | Deprecated|
| Asset Tracker 3G (Americas/Aus) | ASSET3G260V2 | &check; | &check; | Deprecated|
| Asset Tracker 3G (Eur/Asia/Afr) | ASSET3G270V2 | &check; | &check; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | B504MEA | &check; | &check; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | B504MTY | &check; | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | B504EMEA | &check; | &check; | GA|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | B504EMTY | &check; | &nbsp; | GA|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | M524MEA | &check; | &check; | GA|
| M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | M524MTY | &check; | &nbsp; | GA|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635EMEA | &check; | &check; | In development|
| M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | M635MEA | &check; | &check; | In development|
| M-Series LTE-M/2G (Global, EtherSIM), [x1] | M404MEA | &check; | &check; | GA|
| M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | M404MTY | &check; | &nbsp; | GA|
| Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON524E01C01KIT | &check; | &check; | GA|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | MON404E02C01KIT | &check; | &check; | In development|
| Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | MON404E01C01KIT | &check; | &check; | GA|
| Muon Carrier Board - Beta Sample | MUONCB-BETA | &check; | &nbsp; | Deprecated|
| Muon Carrier Board (Dev Board only) | MUONCB | &check; | &nbsp; | GA|
| Muon Carrier Board Kit | MUONCBKIT | &check; | &nbsp; | GA|
| Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | MUON524 | &check; | &check; | GA|
| Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | MUON524EA | &check; | &check; | GA|
| Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | MUON635 | &check; | &check; | In development|
| Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | MUON635EA | &check; | &check; | In development|
| Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | MUON404 | &check; | &check; | GA|
| Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | MUON404EA | &check; | &check; | GA|
| Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | ONE524MTY | &check; | &check; | GA|
| Tracker One CAT1/3G/2G (Europe), Bulk [x40] | ONE523MTY | &check; | &check; | GA|
| Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | ONE524MEA | &check; | &check; | GA|
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), [x1] | ONE404MEA | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | ONE404MTY | &check; | &check; | GA|
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &check; | Deprecated|
| Tracker One LTE M1 (NorAm), Bulk [x40] | ONE402MTY | &check; | &check; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | T524MKIT | &check; | &check; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | T524MEA | &check; | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | T524MTY | &check; | &nbsp; | GA|
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523MKIT | &check; | &check; | NRND|
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | T404MKIT | &check; | &check; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | T404MEA | &check; | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | T404MTY | &check; | &nbsp; | GA|
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | &check; | Deprecated|
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | &nbsp; | Deprecated|
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &check; | &nbsp; | NRND|


{{!-- END do not edit content above, it is automatically generated dd897350-776b-11eb-9439-0242ac130002 --}}


The discontinued Electron AssetTracker v2 and v1 included both an on-board GNSS antenna as well as a U.FL connector for an external GNSS antenna. These devices are no longer sold.

No other devices have GNSS capabilities.
