---
title: Antennas
layout: datasheet.hbs
columns: two
order: 70
description: Information about antennas and certification
---

This page includes information on antennas for:

- [Cellular](#cellular)
- [Wi-Fi](#wi-fi)
- [Bluetooth LE (BLE)](#bluetooth-le-ble-)
- [NFC Tag](#nfc)
- [GNSS (Satellite Navigation)](#gnss-satellite-navigation-)

## Cellular

The following cellular antennas are available:

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x1]| ANTCW2EA | Tracker, B Series, E Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-lte-4-7dbi) |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x50] | ANTCW2TY | Tracker, B Series, E Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x1] | ANTELEC | Electron and E Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-antenna-1) |
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x50] | ANTELEC50 | Electron and E Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) |

### Compatible devices (Cellular)

The following devices have a cellular modem. The Tracker One includes a cellular antenna within the enclosure. All other devices require an antenna connected to the U.FL connector on the module.

| Device | SKU  | Included | Antenna | Alternate |
| :----- | :--- | :--------: | :------: | :--------: | 
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check;<sup>1</sup> | &nbsp; |
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check;<sup>1</sup> | &nbsp; | &nbsp; |
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | ANTCW2EA | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | ANTCW2EA | &nbsp; |
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | ANTCW2EA | &nbsp; |
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &nbsp; | ANTCW2EA | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523NKIT | &check; | ANTCW2EA | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &nbsp; | ANTCW2EA | &nbsp; |
| B Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &check; | ANTCW2EA | &nbsp; |
| B Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &nbsp; | ANTCW2EA | &nbsp; |
| B Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &check; | ANTCW2EA | &nbsp; |
| B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY| &nbsp; | ANTCW2EA | &nbsp; |
| Boron 2G/3G Global Starter Kit, [x1] | BRN310KIT | &check; | ANT-FLXU | &nbsp; |
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | &check; | ANT-FLXU | &nbsp; |
| Boron LTE CAT-M1 (NorAm) Starter Kit, [x1]| BRN402KIT | &check; | ANT-FLXU | &nbsp; |
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | &nbsp; | ANT-FLXU | &nbsp; |
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT | &check; | ANTELEC | &nbsp; |
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 | &nbsp; | ANTELEC | &nbsp; |
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT |  &check; | ANTELEC | &nbsp; |
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 | &nbsp; | ANTELEC | &nbsp; |
| E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | E310KIT | &check; | ANTELEC | ANTCW2EA<sup>2</sup> |
| E Series 2G/3G (Global - E310), [x1] | E310MOD1 | &check; | ANTELEC | ANTCW2EA<sup>2</sup> |
| E Series 2G/3G (Global - E310), Tray [x50] | E310TRAY50 | &nbsp; | ANTELEC | ANTCW2EA<sup>2</sup> |
| E Series 2G/3G (Global - E313), Tray [x50] | E313TY |  &nbsp; | ANTELEC | ANTCW2EA<sup>2</sup> |
| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | E402KIT | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> |
| E Series LTE CAT-M1 (NorAm), [x1] | E402MOD1 | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> |
| E Series LTE CAT-M1 (NorAm), Tray [x50] | E402TRAY50 | &nbsp; | ANT-FLXU | ANTCW2EA<sup>2</sup> |
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> |
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY | &nbsp; | ANT-FLXU | ANTCW2EA<sup>2</sup> |

<sup>1</sup>The Tracker One includes a custom antenna designed for optimal performance with the Tracker One. 

<sup>2</sup>This device originally shipped with one antenna (ANTELEC or ANT-FLXU) however the ANTCW2EA is listed as an alternative. The ANTCW2EA (or ANTCW2TY) is recommended as most new designs will use this antenna and using this antenna will reduce the number of SKUs you need to stock when building a product at tray quantities.


### Not compatible (Cellular)

These devices do not have a cellular modem and therefore do not need a cellular antenna.

| Device | SKU  |
| :----- | :--- |
| Argon [x1] | ARGN-H |
| Argon, Tray [x50] | ARGNTRAY50 |
| P1 Wi-Fi Module, Cut tape [x10] | P1MOD10 |
| P1 Wi-Fi Module, Reel [x500] | P1REEL |
| Photon with Headers, [x1] | PHOTONH |
| Photon with Headers, Tray [x50] | PHNTRAYH |
| Photon without Headers, Tray [x50] | PHNTRAYNOH |
| P0 Wi-Fi Module, Reel [x1000] | P0REEL |
	
### Certification and antenna substitution

Full certification of a device typically involves three different certifications:

1. **Unintentional radiator**. This is a certification that your completed device does not emit extraneous radiation that would affect other devices. This is almost always required, but is the least expensive and easiest test to complete. In the United States, this is FCC 47 CFR Part 15 Subpart B. A test lab performs the measurements and you sign a Suppliers Declaration of Conformity (SDoC).

2. **Intentional radiator**. This test is more involved and requires testing the power output in each band the transmitters are capable of using. In the United States, this is FCC 47 CRF Part 15, Subpart A. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again.

3. [PTCRB](https://www.ptcrb.com/). This is a certification for cellular devices in the United States. If you use a similar antenna to the one Particle used during its tests, you may be able to avoid having to perform this certification again. 

In the United States [this document from the FCC](https://apps.fcc.gov/kdb/GetAttachment.html?id=zVUUifMY6Doa%2BO3Sg0Nygw%3D%3D&desc=996369%20D04%20Module%20Integration%20Guide%20V01&tracking_number=44637) provides a great deal of information about the various certifications. The process is similar in Canada (IC). In the European Union you will need to have a test lab perform similar tests, but there isn't the equivalent of an FCC or IC identification number for the EU.

In order to avoid having to complete steps 2 and 3 again, a substitute antenna must:

1. Be of the same type.
2. Have equal or lesser gain in all bands.
3. Similar in-band and out-of-band characteristics.

All Particle cellular devices include a trace-style PCB or flex monopole antenna, which are considered to be the same type. A different type of antenna is a dipole antenna ("duck antenna"), which would require recertification.

The equal or lesser gain in all bands test is why you can't substitute the ANTCW2EA (Particle cellular antenna) for the ANT-FLXU (Taoglas FXUB63) on the Boron, even though it works quite well. The ANTCW2EA has higher gain in some bands, so using it would require recertification. For example, ANTCW2EA has 1.42 dBi gain vs. 1.0 dBi in Band 13, the 700 MHz band.

[This guide may be helpful](https://linxtechnologies.com/wp/blog-post/antenna-fcc-certification/) in understanding this.

### Prototyping with other antennas

For prototyping and personal use you may be able to use different cellular antennas.

All Particle cellular devices have a U.FL antenna connector. Most cellular antennas have a SMA connector, so you'll need an adapter. At Adafruit, you can get [this adapter](https://www.adafruit.com/product/851). At SparkFun [this adapter](https://www.sparkfun.com/products/9145). At Amazon [this adapter](https://www.amazon.com/gp/product/B01AJQ33Y4/ref=ppx_yo_dt_b_search_asin_title).

[This antenna from Amazon](https://www.amazon.com/Eightwood-Antenna-Magnetic-Connector-2100Mhz/dp/B010EU5C1W/ref=pd_ybh_a_77) is about 4" long, has a magnetic mount, and a 3 meter cable. It is helpful in improving reception in fringe areas. Or for more gain, a [12" antenna](https://www.wilsonamplifiers.com/12-inch-magnet-mount-antenna-12ft-sma-male-311125/).

### Cellular boosters and micro cells

Cellular boosters like the [weBoost](https://www.amazon.com/weBoost-472120-Signal-Booster-Carriers/dp/B081BM99M9/ref=sr_1_4) generally work with all Particle cellular devices, assuming there is at least some faint, compatible signal available. For example, with the Boron 2G/3G in the United States, if you only have a weak T-Mobile signal they can be helpful. If you have no T-Mobile service at all in your area, they will not help.

Cellular micro/pico/femto cells that use the Internet to connect to a specific carrier generally do not work. For example, the AT&T MicroCell does not work with the Electron and E Series, even though they can use AT&T in the United States. The reason is that the Particle devices are roaming on AT&T, and the MicroCell product does not allow access to roaming cellular devices.


## Wi-Fi

The Particle 2.4 GHz W-Fi antenna is available in the [retail](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) and wholesale stores. Note: The same external antenna model is used for Wi-Fi and BLE.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |

### Compatible devices (Wi-Fi)

| Device | SKU  | Built-In Antenna | External Compatible | External Included |
| :----- | :--- | :--------: | :------: | :------: |
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &nbsp; | &check; | &check;<sup>1</sup> |
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &nbsp; | &check; | &check;<sup>1</sup> |
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &nbsp; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &nbsp; | &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &nbsp; | &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &nbsp; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523NKIT | &nbsp; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &nbsp; | &check; | &nbsp; |
| Argon [x1] | ARGN-H |  &nbsp; | &check; | &check;<sup>2</sup> |
| Argon, Tray [x50] | ARGNTRAY50 | &nbsp; | &check; | &nbsp;<sup>2</sup> |
| P1 Wi-Fi Module, Cut tape [x10] | P1MOD10 | &check; | &check;<sup>3</sup> | &nbsp; |
| P1 Wi-Fi Module, Reel [x500] | P1REEL | &check; | &check;<sup>3</sup> | &nbsp; |
| Photon with Headers, [x1] | PHOTONH | &check; | &check;<sup>3</sup> | &nbsp; |
| Photon with Headers, Tray [x50] | PHNTRAYH | &check; | &check;<sup>3</sup> | &nbsp; |
| Photon without Headers, Tray [x50] | PHNTRAYNOH | &check; | &check;<sup>3</sup> | &nbsp; |
| P0 Wi-Fi Module, Reel [x1000] | P0REEL | &nbsp; | &check; | &nbsp; |

<sup>1</sup>The Tracker One includes a Wi-Fi antenna inside the case, however it's a different antenna than the Particle 2.4 GHz Antenna. Note that the Wi-Fi on the Tracker One is only for Wi-Fi geolocation and cannot be used for data communication.

<sup>2</sup>The Argon [x1] includes ANT-FLXV2. The Argon Tray [x50] do not include a Wi-Fi antenna but are compatible and certified with with ANT-FLXV2 (and ANT-FLXV2-50).

<sup>3</sup>The Photon and P1 are certified with the built-in chip or trace antenna and also with the following external antenna:

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| Dipole antenna | LumenRadio | 104-1001 | 2.15dBi |

[This antenna from Adafruit](https://www.adafruit.com/product/944) is compatible and can be substituted when an external dipole ("duck") antenna is desired on the Photon and P1 while using the existing Particle certification. Note that a [RP-SMA to U.FL adapter](https://www.adafruit.com/product/852) is required to use this antenna.

### Not compatible (Wi-Fi)

These devices do not have a Wi-Fi modem and therefore do not need a Wi-Fi antenna.

| Device | SKU  |
| :----- | :--- |
| B Series LTE CAT-M1 (NorAm), [x1] | B402MEA |
| B Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | 
| B Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | 
| B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY| 
| Boron 2G/3G Global Starter Kit, [x1] | BRN310KIT |
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | =
| Boron LTE CAT-M1 (NorAm) Starter Kit, [x1]| BRN402KIT | 
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | 
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT |
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 |
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT |
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 |
| E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | E310KIT |
| E Series 2G/3G (Global - E310), [x1] | E310MOD1 |
| E Series 2G/3G (Global - E310), Tray [x50] | E310TRAY50 | 
| E Series 2G/3G (Global - E313), Tray [x50] | E313TY | 
| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | E402KIT | 
| E Series LTE CAT-M1 (NorAm), [x1] | E402MOD1 |
| E Series LTE CAT-M1 (NorAm), Tray [x50] | E402TRAY50 |
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA |
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY |


## Bluetooth LE (BLE)

Particle Gen 3 devices support BLE for short-distance communication. Most devices include a built-in chip antenna, and can optionally use an external antenna. 

The exception is the B Series SoM, which does not have a chip antenna on the SoM and requires an external antenna if BLE is to be used. Use of BLE on the B Series SoM is optional.

The Particle 2.4 GHz BLE antenna is available in the [retail](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) and wholesale stores. Note: The same external antenna model is used for Wi-Fi and BLE.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |


### Compatible devices (BLE)

These devices include Bluetooth LE (BLE) capabilities.

| Device | SKU  | Chip Antenna | External Compatible | External Included |
| :----- | :--- | :--------: | :------: | :------: |
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &check;<sup>1</sup> |
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &check;<sup>1</sup> |
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA | &check; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA | &check; | &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT | &check; | &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY | &check; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523NKIT | &check; | &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY | &check; | &check; | &nbsp; |
| Argon [x1] | ARGN-H |  &check; | &check; | &nbsp; |
| Argon, Tray [x50] | ARGNTRAY50 | &check; | &check; | &nbsp; |
| B Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &nbsp; | &check; | &check; |
| B Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &nbsp; | &check; | &nbsp; |
| B Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &nbsp; | &check; | &check; |
| B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY| &nbsp; | &check; | &nbsp; |
| Boron 2G/3G Global Starter Kit, [x1] | BRN310KIT | &check; | &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 | &check; | &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm) Starter Kit, [x1]| BRN402KIT | &check; | &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 | &check; | &check; | &nbsp; |
	
<sup>1</sup>The Tracker One includes an BLE antenna inside the case, however it's a different antenna than the Particle 2.4 GHz Antenna (ANT-FLXV2). A separate antenna is used because the Tracker SoM is mounted on the bottom side of the Tracker Carrier Board, so signals to the chip antenna would be adversely affected.

### Not compatible (BLE)

These devices do not have a BLE radio and therefore do not need a BLE antenna.

| Device | SKU  |
| :----- | :--- |
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT |
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 |
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT |
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 |
| E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | E310KIT |
| E Series 2G/3G (Global - E310), [x1] | E310MOD1 |
| E Series 2G/3G (Global - E310), Tray [x50] | E310TRAY50 | 
| E Series 2G/3G (Global - E313), Tray [x50] | E313TY | 
| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | E402KIT | 
| E Series LTE CAT-M1 (NorAm), [x1] | E402MOD1 |
| E Series LTE CAT-M1 (NorAm), Tray [x50] | E402TRAY50 |
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA |
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY |
| P1 Wi-Fi Module, Cut tape [x10] | P1MOD10 |
| P1 Wi-Fi Module, Reel [x500] | P1REEL |
| Photon with Headers, [x1] | PHOTONH |
| Photon with Headers, Tray [x50] | PHNTRAYH |
| Photon without Headers, Tray [x50] | PHNTRAYNOH |
| P0 Wi-Fi Module, Reel [x1000] | P0REEL |

	

## NFC

Particle Gen 3 devices can optionally be used in NFC tag mode. This can only be ready by a device such as a smartphone app; it cannot read tags.

The Particle NFC Antenna is available in the [retail](https://store.particle.io/products/nfc-antenna) and wholesale stores. 

| Antenna | SKU  | Links |
| :------ | :--- | :---- | 
| Particle NFC Antenna, [x1] | ANT-NFC | [Datasheet](/assets/datasheets/ANT-NFC.pdf) &#124; [Retail Store](https://store.particle.io/products/nfc-antenna) |


### Compatible devices (NFC)

These devices have NFC tag capabilities. Only the Tracker One has a built-in NFC antenna, all other devices require an external NFC antenna to use the NFC tag feature. If you are not using NFC tag you do not need to add the antenna.

| Device | SKU  | Compatible | Included |
| :----- | :--- |:----- | :--------: | :------: |
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &check;<sup>1</sup> |
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &check;<sup>1</sup> |
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA |  &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA |   &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT |  &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY |   &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523NKIT |  &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY |  &check; | &nbsp; |
| Argon [x1] | ARGN-H |   &check; | &nbsp; |
| Argon, Tray [x50] | ARGNTRAY50 |  &check; | &nbsp; |
| B Series LTE CAT-M1 (NorAm), [x1] | B402MEA |   &check; | &nbsp; |
| B Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY |   &check; | &nbsp; |
| B Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA |  &check; | &nbsp; |
| B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY |   &check; | &nbsp; |
| Boron 2G/3G Global Starter Kit, [x1] | BRN310KIT |  &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm), [x1] | BRN402 |   &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm) Starter Kit, [x1]| BRN402KIT |  &check; | &nbsp; |
| Boron LTE CAT-M1 (NorAm), Tray [x50] | BRN402TRAY50 |  &check; | &nbsp; |
	
<sup>1</sup>The Tracker One includes an NFC antenna inside the case, however it's a different antenna than the Particle NFC Antenna (ANT-NFC).

    
### Not compatible (NFC)

These devices do not have an NFC radio and therefore do not need a NFC antenna.

| Device | SKU  |
| :----- | :--- |
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT |
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 |
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT |
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 |
| E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | E310KIT |
| E Series 2G/3G (Global - E310), [x1] | E310MOD1 |
| E Series 2G/3G (Global - E310), Tray [x50] | E310TRAY50 | 
| E Series 2G/3G (Global - E313), Tray [x50] | E313TY | 
| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | E402KIT | 
| E Series LTE CAT-M1 (NorAm), [x1] | E402MOD1 |
| E Series LTE CAT-M1 (NorAm), Tray [x50] | E402TRAY50 |
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA |
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY |
| P1 Wi-Fi Module, Cut tape [x10] | P1MOD10 |
| P1 Wi-Fi Module, Reel [x500] | P1REEL |
| Photon with Headers, [x1] | PHOTONH |
| Photon with Headers, Tray [x50] | PHNTRAYH |
| Photon without Headers, Tray [x50] | PHNTRAYNOH |
| P0 Wi-Fi Module, Reel [x1000] | P0REEL |
	

## GNSS (Satellite Navigation)

The Tracker One includes a Cirocomm T0004 antenna on the Tracker Carrier Board.

As the GNSS system is receive-only (no transmitter), you can use any GNSS compatible antenna without affecting the certification. Different GNSS systems use different frequencies. Many antennas are tuned to the United States GPS system, however you can also get multi-GNSS antennas that are compatible with other systems. All of these systems offer coverage world-wide.

| System   | Owner | 
| :------- | :--- |
| GPS      | United States |
| GLOSNASS | Russia |
| BeiDou   | China |
| Galileo  | European Space Agency |

Some antenna options include from Adafruit [this antenna](https://www.adafruit.com/product/960) and [this adapter](https://www.adafruit.com/product/851). At SparkFun [this antenna](https://www.sparkfun.com/products/14986) and [this adapter](https://www.sparkfun.com/products/9145). At Amazon [this antenna](https://www.amazon.com/gp/product/B00LXRQY9A/ref=ppx_yo_dt_b_search_asin_title) and [this adapter](https://www.amazon.com/gp/product/B01AJQ33Y4/ref=ppx_yo_dt_b_search_asin_title).

The following devices have GNSS capabilities:

| Device | SKU  | Compatible | Antenna Included |
| :----- | :--- | :-----: | :--------: |
| Tracker One LTE M1 (NorAm), [x1] | ONE402MEA | &check; | &check; |
| Tracker One LTE CAT1/3G/2G (Europe), [x1] | ONE523MEA | &check; | &check; |
| Tracker SoM LTE M1 (NorAm), [x1] | T402MEA |  &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | T523MEA |   &check; | &nbsp; |
| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | T402MKIT |  &check; | &check; |
| Tracker SoM LTE M1 (NorAm), Tray [x50] | T402MTY |   &check; | &nbsp; |
| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | T523NKIT |  &check; | &check; |
| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | T523MTY |  &check; | &nbsp; |

The discontinued Electron AssetTracker v2 and v1 included both an on-board GNSS antenna as well as a U.FL connector for an external GNSS antenna. These devices are no longer sold.

No other devices have GNSS capabilities.




