---
title: Introduction
columns: two
layout: commonTwo.hbs
description: Introduction to Particle cellular devices and cellular standards
---

# Introduction to Cellular Devices

Particle has a wide variety of cellular devices to suit many applications. There's a handy table at the end to help you device what's the best device for your application, but some explanation is in order first as there are a number of decisions to make!


## Form Factor

### Boron

![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | GA | |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | GA | |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| BRN404KIT | Boron LTE CAT-M1 (NorAm) Starter Kit, [x1] | NORAM | R410 | GA | |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | NRND-US | BRN314TRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | NRND | BRN314KIT|
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | BRN404|
| BRN402KIT | Boron LTE CAT-M1 (NorAm) Starter Kit, [x1] | NORAM | R410 | NRND | BRN404KIT|
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | BRN404TRAY50|


{{!-- END do not edit content above, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}





### B Series SoM

![B Series](/assets/images/b-series/b-series-top.png)

The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

One of the benefits is that many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

| Feature | Boron | B Series SoM | SoM Base Board | Tracker SoM |
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


{{!-- BEGIN do not edit content below, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| B404MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| B404MTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E | GA | |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E | GA | |
| B402MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | B404MEA|
| B402MTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | B404MTY|
| B523MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E | NRND | B524MEA|
| B523MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E | NRND | B524MTY|


{{!-- END do not edit content above, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}



### Tracker SoM

![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Hardware watchdog


{{!-- BEGIN do not edit content below, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ONE404MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC | GA | |
| ONE404MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC | GA | |
| ONE404MTY-NB | Tracker One LTE M1 (NorAm), no battery, Bulk [x40] | NORAM | BG96-MC | GA | |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | GA | |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX | GA | |
| ONE524MTY-NB | Tracker One CAT1/3G/2G (Europe), no battery, Bulk [x40] | EMEAA | EG91-EX | GA | |
| T404MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC | GA | |
| T404MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC | GA | |
| T404MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC | GA | |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | GA | |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX | GA | |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX | GA | |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC | NRND | ONE404MEA|
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC | NRND | ONE404MTY|
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | NRND | ONE524MEA|
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX | NRND | ONE524MTY|
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC | NRND | T404MEA|
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC | NRND | T404MKIT|
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC | NRND | T404MTY|
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | NRND | T524MEA|
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX | NRND | T524MKIT|
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX | NRND | T524MTY|


{{!-- END do not edit content above, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}


### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is the 2nd-generation cellular device in a prototyping form factor. It is designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board.


![Electron Breadboard](/assets/images/phototransistor-electron.jpg)



{{!-- BEGIN do not edit content below, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | GA | |
| ELC404TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | NRND | ELC314TY|
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | ELC404EA|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | ELC404TY|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 | Discontinued | ELC314TY|
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 | Discontinued | ELC314TY|


{{!-- END do not edit content above, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}


### E Series (SMD)

![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series module is a 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.


| Feature | Electron | E Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |




{{!-- BEGIN do not edit content below, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | U201 | GA | |
| E314MOD1 | E Series 2G/3G (Global - E314), [x1] | Global | U201 | GA | |
| E314TRAY50 | E Series 2G/3G (Global - E314), Tray [x50] | Global | U201 | GA | |
| E404KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 | GA | |
| E404MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| E404TRAY50 | E Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| E310TRAY50 | E Series 2G/3G (Global - E310), Tray [x50] | Global | U201 | NRND-US | |
| E313TY | E Series 2G/3G (Global - E313), Tray [x50] | Global | U201 | NRND-US | |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | U201 | NRND | E314KIT|
| E310MOD1 | E Series 2G/3G (Global - E310), [x1] | Global | U201 | NRND | E314MOD1|
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 | NRND | E404KIT|
| E402MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | E404MOD1|
| E402TRAY50 | E Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | E404TRAY50|
| E313EA | E Series 2G/3G (Global - E313), [x1] | Global | U201 | Discontinued | |


{{!-- END do not edit content above, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}


## Cellular Carriers

The Particle SIM supports many carriers around the world. The [list of mobile carriers](/tutorials/cellular-connectivity/cellular-carriers/) is the complete list, however it's important to note that different Particle SIM cards that support a different set of carriers, which may also vary depending on the device.

- Boron 2G/3G EtherSIM BRN304 
- Boron 2G/3G BRN302
- B Series B524 EtherSIM (LTE Cat 1 Europe, Australia, and New Zealand)
- B Series B523 (LTE Cat 1 Europe)
- LTE Cat M1 EtherSIM (Boron LTE, B Series B404, E Series LTE E404, and Electron LTE ELC404)
- LTE Cat M1 (Boron LTE, B Series B402, E Series LTE, and Electron LTE)
- Electron ELC314 and E Series E314 EtherSIM
- Electron 2G (G350), Electron 3G (U260 and U270), and E Series 2G/3G E310


### SIM cards

There are two different kinds of SIM cards, depending on the device.

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 


| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN314 BRN310 | &check; | &check; |
| Boron LTE  | BRN404 BRN402 | &check; | &check; |
| B Series B402 SoM (Cat M1) | B404 B402 | &nbsp; | &check; |
| B Series B523 SoM (Cat 1) | B524 B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T404 T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC314 | &check; | &nbsp; |
| Electron LTE (Cat M1) | ELC404 ELC402 | &nbsp; | &check; |
| E Series 2G/3G | E314 E310 | &nbsp; | &check; |
| E Series LTE (Cat M1) | E404 E402 | &nbsp; | &check; |


### Roaming

Non-LTE Particle SIM cards support world-wide roaming. However there may be limitations based on the radio on the device.

| Device | Model | Roaming | LTE | 3G | 2G | Bands |
| --- | :--- |  --- | --- | --- | --- | --- |
| Boron 2G/3G | BRN314 BRN310 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Boron LTE (Cat M1) | BRN404 BRN402 | US, CA, MX<sup>1</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B Series B402 SoM (LTE Cat M1) | B404 B402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B Series B524 SoM (LTE Cat 1) | B524 | Europe, AU, NZ | Cat 1 | &check; |&check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| B Series B523 SoM (LTE Cat 1) | B523 | Europe | Cat 1 | &check; |&check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Tracker SoM (LTE Cat M1) | T404 T402 | US, CA, MX<sup>5</sup> | Cat M1 | &nbsp; | &nbsp; | LTE Cat M1<sup>6</sup> |
| Tracker SoM (LTE Cat 1/2G/3G) | T524 | Europe, AU, NZ | Cat 1 | &check; | &check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | Europe | Cat 1 | &check; | &check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Electron 2G | G350 | World<sup>2</sup> | | | &check; | 850, 900, 1800, 1900 |
| Electron 3G | U260 | Americas, AU, NZ<sup>3</sup> | | &check; | &check; | 850, 1900 |
| Electron 3G | U270 | Europe, Asia, Africa<sup>4</sup> | | &check; | &check; | 900, 1800, 2100 |
| Electron Global | ELC314 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Electron LTE (Cat M1) | ELC404 ELC402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| E Series 2G/3G | E314 E310 | World | | &check; | &check;| 850, 900, 1800, 1900, 2100 |
| E Series LTE (Cat M1) | E404 E402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |


<sup>1</sup>The Boron LTE can be used with a 3rd-party SIM card in areas outside of the United States, Canada, and Mexico at this time. This is not officially supported, but has been known to work.

<sup>2</sup>The Electron 2G cannot be used in locations that no longer have 2G service. Some countries include: Australia, Japan, Korea, Singapore, and Taiwan. In the United States, 2G services is only available on T-Mobile, and only through the end of 2020. In some other countries, including Switzerland and New Zealand, the Electron 2G can only be used with a 3rd-party SIM card, not with the included Particle SIM card. 

<sup>3</sup>The U260 model supports 850/1900 MHz for both 3G (UMTS/HSPA) and 2G (GPRS/EDGE). These are the frequencies typically used in the Americas, but there are exceptions. 

For example, in Australia, we recommend the U260 because the carrier used by the Particle SIM, Telstra uses 850 MHz. However, if you are using a 3rd-party SIM from Optus, you'll need the U270 because Optus uses 900/2100 MHz.

In New Zealand, we previously recommended the U270 as Two Degrees was the carrier. We've switched to Spark, however, which uses 850 MHz and thus the U260 is now recommended for New Zealand, like Australia. If you've purchased a U270 for use in New Zealand and are stuck at blinking green (connecting to cellular), technical support can switch your SIM back to Two Degrees so you can use the U270.

In Uruguay, the carrier used by the Particle SIM, Movistar, uses 1900 MHz so the U260 Americas model is the correct one. If you're using an Antel 3rd-party SIM, however, that uses 2100 MHz you you'll nee the U270 model, instead.

<sup>4</sup>The U270 model supports 900/2100 MHz for 3G (UMTS/HSPA) and 900/1800 MHz for 2G (GPRS/EDGE). It is typically used in Europe, Asia, and Africa. It is used by some carriers in South America (with a 3rd-party SIM card).

<sup>5</sup>The B Series B402, E Series LTE, and Electron LTE cannot be used outside of the United States, Canada, and Mexico at this time. 

<sup>6</sup>For LTE Cat M1 bands, see [LTE Cat M1](#lte-cat-m1) below.

<sup>7</sup>The Quectel EG91-E modem supports European LTE bands (700, 700, 900, 1800, 2100, and 2600), as well as HSPA/WCDMA 3G (900, 2100) and GSM 2G (900, 1800). See [the datasheet](/datasheets/boron/b523-datasheet/#4g-lte-cellular-characteristics-for-eg91-e) for more information.

### 3rd-party SIM cards

Some Particle devices are compatible with [3rd-party SIM cards](https://support.particle.io/hc/en-us/articles/360039741113/). 

| Device | Model | 3rd-party SIM compatible |
| --- | :--- | :---: |
| Boron 2G/3G | BRN314 BRN310 | &check; |
| Boron LTE (Cat M1) | BRN404 BRN402 | &check; |
| B Series B4xx SoM (LTE Cat M1) | B404 B402 | &nbsp; |
| B Series B5xx SoM (LTE Cat 1) | B524 B523 | &nbsp; |
| Tracker SoM (LTE Cat M1 and 2G) | T404 T402 | &nbsp; | 
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | 
| Electron 2G | G350 | &check; |
| Electron 3G Americas | U260 | &check; |
| Electron 3G Europe/Asia/Africa | U270 |  &check; |
| Electron Global | ELC314 | &check; |
| Electron LTE (Cat M1) | ELC402 |&nbsp; |
| E Series 2G/3G | E310 | &nbsp; |
| E Series LTE (Cat M1) | E402 | &nbsp; |

There are limitations on using 3rd-party SIM cards in large product deployments. If you think you will need to use a 3rd-party SIM you should [contact sales](https://particle.io/sales/) for additional information.

## 4G LTE

There are three main varieties of LTE service:

- LTE Cat 1 is what's used by your mobile phone, and the B Series B524/B523 SoM. It's different than the IoT variation (LTE Cat M1).
- LTE Cat M1 is a version of LTE that is used for relatively low data rate, low-cost, and low-power applications. Particle LTE devices like the Boron LTE, E Series LTE (E404/E402), Electron LTE (ELC404/ELC402), and B Series B404/B402 SoM, support LTE Cat M1. 
- LTE Cat NB1 ("NB IoT") is a different low-cost and low-power version of LTE, with even lower data rates. While Particle LTE device hardware can support NB1, it is not officially supported at this time.

At this time, Particle is unable to provide worldwide roaming for LTE Cat M1 devices using the Particle SIM and they can only be used in the United States, Canada, and Mexico.

LTE Cat 1 provides greater compatibility with carriers, but is a more expensive module and uses more power. 

B Series B523 SoM is LTE Cat 1 with 2G/3G fallback, and is only compatible with European networks at this time. The Quectel EG91-E module on this device also supports 3G and 2G fallback. Note that the EG91-E is too large to fit in the Boron (Adafruit Feather), Electron, or E Series module, so it will only be available in the M.2 SoM form-factor.

The Tracker SoM T523 is also LTE Cat 1 with 2G/3G fallback, with a Quectel EG91-EX module, and will support the EMEAA region when released.

### LTE Cat M1

The following devices use LTE Cat M1:

| Device | Model | 
| --- | :--- | 
| Boron LTE (Cat M1) | BRN404 BRN402 |
| B Series B402 SoM (LTE Cat M1) | B404 B402 |
| Electron LTE (Cat M1) | ELC404 ELC402 |
| E Series LTE (Cat M1) | E404 E402 | 


In the United States, Particle devices use LTE Cat M1 on the AT&T network. In all locations that AT&T supports LTE on their own network (not roaming and not a partner carrier), LTE Cat M1 should also be supported. 

In Mexico, AT&T Mexico is used for LTE Cat M1.

In Canada, any of Rogers, Telus, or Bell is used for LTE Cat M1.

| Frequency | Band | R402    | BG96    | AT&T US | AT&T MX | Rogers CA<sup>2</sup> | Telus CA<sup>2</sup> | Bell CA<sup>2</sup> |
| :--- | :---      | :---:   | :---:   | :---:   | :---:   | :---:                 | :---:                | :-----------------: |
|  700 | 12        | &check; | &check; | &check; |         | &check; | &check; | &check; |  
|  700 | 13        | &nbsp;  | &check; |         |         |         | &check; | &check; |
|  700 | 17        | &check; | &nbsp;  |         |         |         | &check; | &check; |
|  700 | 28        | &check; | &check; |         |         |         |         |         |  
|  700 | 29        | &check; | &nbsp;  |         |         |         | &check; | &check; |
|  800 | 20        | &check; | &check; |         |         |         |         |         |
|  850 | 26        | &check; | &check; |         |         |         |         |         |
|  850 | 18        | &check; | &check; |         |         |         |         |         |
|  850 |  5        | &check; | &check; |         |         |         | &check; | &check; |
|  850 | 19        | &check; | &check; |         |         |         |         |         |
|  900 |  8        | &check; | &check; |         |         |         |         |         |
| 1700 |  4        | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 
| 1800 |  3        | &check; | &check; |         |         |         |         |         |
| 1900 |  2        | &check; | &check; | &check; |         |         | &check; | &check; | 
| 1900 | 25        | &check; | &check; |         |         |         |         |         |
| 1900 | 39        | &check; | &nbsp;  |         |         |         |         |         |
| 2100 |  1        | &check; | &check; |         |         |         |         |         |
| 2600 |  7        | &nbsp;  | &nbsp;  |         |         | &check; | &check; | &check; | 

<sup>2</sup>The Canadian bands are for all types of LTE. Not all are used for LTE Cat M1. In particular, band 7 (2600 MHz) is only used for LTE Cat 1, not LTE Cat M1.

## LTE Cat 1

LTE Cat 1 is most similar to phone LTE, and should work in all areas with LTE phone data coverage, subject to region and carrier compatibility.

The following devices use LTE Cat 1:

| Device | Model | Modem | Region |
| --- | :---: | :---: | :--- |
| B Series B524 SoM (LTE Cat 1 with 2G/3G fallback) | B524 | EG91-E | Europe, AU, NZ |
| B Series B523 SoM (LTE Cat 1 with 2G/3G fallback) | B523 | EG91-E | Europe |
| Tracker SoM (LTE Cat 1 with 2G/3G fallback) | T524 | EG91-EX | Europe, AU, NZ |
| Tracker SoM (LTE Cat 1 with 2G/3G fallback) | T523 | EG91-EX | Europe |

The following bands are supported:

| Frequency | Band | EG91-E | EG91-EX |
| :--- | :--- | :---: | :---: | 
|  700 | 28  | &nbsp;  | &check; | 
|  700 | 28A | &check; | &nbsp;  |
|  800 | 20  | &check; | &check; |
|  900 |  8  | &check; | &check; |
| 1800 |  3  | &check; | &check; | 
| 2100 |  1  | &check; | &check; |
| 2600 |  7  | &check; | &check; |

Additional countries in the EMEAA region may work with the B524 and T524, but are not officially supported at this time. 

## 2G and 3G Sunset

Carriers around the world periodically shut down older networks to reallocate the frequencies and tower space to new technologies like LTE and 5G.

The list below is not complete; you should check with the carrier in your area to be sure of sunset, decommissioning, or shutdown dates.


### United States

AT&T deactivated their 2G network at the end of 2016. Electron 2G devices can only use T-Mobile at this time.

AT&T's 3G shutdown should occur in [February 2022](https://www.att.com/esupport/article.html#!/wireless/KM1324171?gsi=0pwb92). After this occurs, the Electron U260, Electron E313, and E Series E310 will only connect to T-Mobile in the United States.

T-Mobile will begin to reallocate 3G spectrum in March 2020 so there could be reduced coverage, and will eliminate all 3G coverage by October 1, 2021.

T-Mobile will deactivate their 2G network on December 31, 2022. At this point, all 2G/3G devices will cease to work in the United States.

The Boron 2G/3G only connects to T-Mobile in the United States already (it cannot connect to AT&T using the built-in MFF2 Particle SIM).

In the United States we strongly recommend using LTE Cat M1. AT&T has committed to supporting the LTE network at least through the end of 2027.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G | LTE Cat M1 |
| --- | --- | :--: | :--: | :--: | :--: | :---: |
| End of 2016 | AT&T ended 2G service | T-Mobile | Both | Both | T-Mobile | AT&T |
| February 2022 | AT&T ends 3G service | T-Mobile | T-Mobile | T-Mobile | T-Mobile |  AT&T |
| End of 2022 | T-Mobile ends 2G service | None | None | None | None | AT&T |


### Europe

In some European countries, they're phasing out 3G and instead keeping 2G and LTE networks. All of the Particle 3G cellular devices can also connect to 2G networks, so compatibility will be maintained.

For example, in Norway, Telenor is shutting down their 3G network at the end of 2020, but keeping their 2G network running until the end of 2025.


### Australia

In Australia, there is no longer 2G service on any carrier and the Electron 2G cannot be used.

The Electron and E Series use Telstra in Australia. They intend to shut down their 3G network at [mid 2024](https://www.digitalmatter.com/About-Us/News/Telstra-Announces-3G-Shutdown). At that point, the Electron can only be used with a 3rd-party SIM card and the E Series will no longer work.

The Boron 2G/3G uses Vodafone in Australia. They have not announced a 3G shutdown date.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G
| --- | --- | :--: | :--: | :--: | :--: |
| End of 2016 | Telstra ended 2G service | &nbsp;| &check; | &check; | &check; |
| April 2019 | Telstra sends 2100 MHz 3G service | &nbsp;| &check; | &check; | &check; |
| Mid 2024 | Telstra ends 850 MHz 3G service | &nbsp; | <sup>1</sup> | &nbsp; | &check; | 

<sup>1</sup>Can use only with a 3rd-party SIM card.

The B Series SoM B524 and Tracker SoM T524 are officially supported in Australia and New Zealand and provide LTE Cat 1 support with 3G fallback.

### Canada

The Electron and E Series use Rogers in Canada:

- 2G service on Rogers will end at the end of 2020. The Electron 2G will no longer operate after that date with the Particle SIM card. Since Bell Mobility and Tellus also will have decommissioned their 2G networks by then, there are few alternatives for 2G service in Canada.
- 3G service on Rogers will end at the end of 2025.

The Boron 2G/3G uses Telus in Canada:

- 2G services on Telus has already ended.
- 3G service on Telus will end at the end of 2025.

By the end of 2025, Rogers, Telus, and Bell will have ended all 2G and 3G service, at which point the 2G/3G SKUs will no longer be able to connect. The LTE Cat M1 SKUs are recommended for use in North America for this reason.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G
| --- | --- | :--: | :--: | :--: | :--: |
| End of 2020 | Rogers ends 2G service (850 MHz) | &nbsp;| &check; | &check; | &check; |
| End of 2025 | Rogers, Telus, and Bell end 3G service | &nbsp; | &nbsp; | &nbsp; | &nbsp; | 

### Limited 2G

These countries cannot use 2G (Electron 2G) with the included Particle SIM card. They can only use a 3rd-party SIM card:

- New Zealand
- Switzerland

These countries have a scheduled end to 2G service when using the Particle SIM card:

| Country | 2G End Date | 
| --- | :---: |
| Canada | End of 2020 |
| United States (AT&T) | End of 2020 |


### No 2G

These countries cannot use the Electron 2G at all:

- Australia 
- Japan
- Korea
- Singapore
- Taiwan

## Does this device work in this country?

This is a harder question to answer than you might think, as there are a number of factors.

### Are you an enterprise customer?

If you are an enterprise customer, or plan to be one in the future, you will likely want to take a conservative approach and use only the Particle recommended SKUs for regions and avoid the devices that are NRND (not recommended for new designs).

The [Carrier List by Region](/tutorials/cellular-connectivity/cellular-carriers/?tab=FindDevice&showCarriers=true&showNRND=false&regionCountryRadio=region&region=United%20States%2C%20Canada%2C%20and%20Mexico) is a good place to start. In this section you can find the recommended models.

If you need compatibility in two different countries, you can also find that information here. For example, if you need to work both the [United States and in the United Kingdom](/tutorials/cellular-connectivity/cellular-carriers/?tab=FindDevice&showCarriers=true&showNRND=false&regionCountryRadio=country&country=United%20States%2CUnited%20Kingdom) you will likely need two different SKUs, and this page shows which ones you should use.

If you are an individual developer or hobbyist, you may be able to use some devices that would not be recommended for enterprise, as detailed below.

### Radio compatibility

The cellular modems all support a specific set of bands. The bands used vary by country, carrier, and technology (2G, 3G, LTE Cat 1, LTE Cat M1). There is currently no truly global SKU that supports all bands and all technologies. 

While the Boron 2G/3G (BRN314 and BRN310) and E Series (E314 and E310) are global 2G/3G, they do not support LTE Cat M1. This can be an issue in the United States, where 2G and 3G service will end after 2022, at which point 2G/3G SKUs will no longer work in the United States. This is why the LTE Cat M1 variations (Boron BRN404 and BRN402, E Series E404 and E402) are recommended in the United States.

The B Series SoM (B524, B523) and Tracker SoM (T524, T523, ONE524, ONE523) offer LTE Cat 1, 3G, and 2G, however the cellular modem (EG91-E or EG91-EX) only support the frequencies used in the EMEAA (Europe, Middle East, Africa, and Asia) region. These devices will not work at all in the United States, however there are different SKUs for the United States, Canada, and Mexico (B404, B402, T404, T402, ONE404, ONE402).

Also note that the LTE Cat 1 EtherSIM models (B524, T524, ONE524) are only officially supported (for enterprise use) in Europe, Australia, and New Zealand. The earlier models (B523, T523, and ONE523) are only officially supported in Europe. However, for individual developers, you will likely be able to use these devices in much of the EMEAA region, subject to the remaining constraints below.


### Carrier and band compatibility

Additionally, the variation of the Particle SIM in a device will determine which carriers are supported. In general, particularly in Europe, the EtherSIM variations (B524, BRN314) will offer many more carriers than the earlier versions (B523, BRN310). 

If you know the device you are interested in and the country, you can find detailed carrier information on the [country details page](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails).

For example, the [B524 country details page for Germany](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Germany&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) shows the details including which cellular bands are supported by which carriers. From this table you can see that Telekom uses bands B32 and B38, however the EG91-E cellular modem does not support these bands. However, there are many other bands supported, both on Telekom and other carriers, so coverage will likely be good.

For comparison, using the [B524 in Brazil](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Brazil&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) is not recommended. The reason is that 850 MHz (band B5) is commonly used to provide service in rural areas because the signals travel a longer distance. The higher frequencies (1800, 2100, and 2600 MHz) are more commonly used in urban areas, thus it is likely that the B524 will not work in many areas of Brazil.

Likewise, even though Japan is part of the EMEAA region, the [B524 in Japan](http://localhost:8080/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Japan&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) is not recommended because so many of the bands used in Japan are not supported by the EG91-E.

In the United States, LTE Cat M1 EtherSIM devices (Boron BRN404, B Series B404, Tracker T404 and ONE404, E Series E404, Electron ELC404) are a special case. The [country details for the United States](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=United%20States&device=Tracker%20T404%2FONE404%20LTE%20M1%20(NorAm%29%20EtherSIM) do not list T-Mobile as supported. The reason is that T-Mobile officially only supports LTE Cat NB1, which is different and not supported by Particle devices. However, many areas of the United States have unofficial T-Mobile LTE Cat M1 service, not advertised by T-Mobile. EtherSIM LTE Cat M1 devices will connect to T-Mobile or AT&T, whichever has a stronger signal. (Pre-2021 LTE Cat M1 devices cannot connect to T-Mobile at all with the built-in Particle SIM on those devices.)


### Third-party SIMs

Some devices, most notably the Boron, allow the use of a third-party SIM card. See [3rd-party SIM cards](/tutorials/cellular-connectivity/introduction/#3rd-party-sim-cards) for a full list. Third-party SIM cards are not recommended for enterprise use. Additionally, once you exceed the limits of the free plan, the price based on devices and data operations is the same whether you are using the Particle SIM or a 3rd-party SIM, so it's often not cost-effective.

There may also be issues with certification and carrier approval as described below.


### Certification

Some countries may require certification that has not been completed for all Particle devices.

For example, since the LTE Cat M1 devices are intended for use in North America only, they only have FCC (United States) and IC (Canada) certification. While they may work in limited circumstances in Europe, they have not undergone EU certification. 

The B524, T524, ONE524, etc. have all undergone EU certification as they are intended for use in Europe, however they are not certified for the US and Canada. Also they will not work, because of band compatibility.

There may also be country-specific certifications that may not have been completed, for example SK in South Korea and MIC in Japan. There are others. A full list of certifications is available on the [certifications page](/datasheets/certifications/certification/).

In addition to the Particle device being certified, the cellular modem may not be certified in some countries. For example, the EG91-E and EG91-EX were not certified by Quetel for use in China, because other modem models are recommended for use in China, as there are also band compatibility issues with the EG91.

### Permanent roaming

All Particle SIM devices are considered to be roaming from the local operator's point-of-view. In some countries, local carriers may ban devices that are believed to be permanently roaming. This can happen without notice and the time limit may vary.

The following countries are at risk for permanent roaming restrictions:

- Brazil
- China
- India
- Russia
- Singapore
- Turkey
- UAE

### Carrier certification

This is mainly an issue with LTE Cat M1 devices in the United States. Both AT&T and Verizon require device manufacturers to test and obtain a certification for their devices to connect to their LTE Cat M1 networks. Particle has completed this process for AT&T, which then involves Particle uploading the IMEI numbers for all certified devices to AT&T so they will not be blocked from the network.

Since Particle SIMs do not have support for Verizon, this process has not been completed for Verizon. The requirement for carrier certification and IMEI registration still applies, however, so if you are using a Verizon SIM or a 3rd-party SIM that supports Verizon (such as Hologram) you will still be banned from the Verizon LTE Cat M1 network, typically after a few days of use.

### IMEI registration

Some countries may have a requirement to register the IMEI of mobile devices, including both mobile phones and IoT devices. For example, Turkey and Indonesia. This may be waived for roaming devices (such as Particle devices), or it may apply to all devices, depending on the country.

### LTE Cat M1 outside of the North America

In addition to the other requirements, LTE Cat M1 devices may require additional software configuration of the cellular modem.

The SARA-R410M cellular modem in the Boron LTE (BRN404) is configured for North American frequencies only. When used outside of this region, you may need to set the mobile network operator profile (AT+UMNOPROF) and/or specific band support (particularly in Europe) in order to connect.

### 2G/3G Sunset 

Certain countries and carriers are phasing out 2G and 3G service. This is a particularly immediate concern in the United States, which will no longer have any 2G or 3G service after 2022. 

The section [2G and 3G sunset](/tutorials/cellular-connectivity/introduction/#2g-and-3g-sunset), above, has more details.

## Summary


| Device | Model | Modem | Region | 2G | 3G | LTE | Generation | SIM | Form Factor | 
| --- | :--- | :--- | --- | :---: | :---: | :---: | :---: | :---: | --- |
| Boron 2G/3G | BRN314 BRN310 | U201 | World | &check; | &check; | &nbsp; | Gen3 | Both | Feather | 
| Boron LTE (Cat M1) | BRN404 BRN402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 |  Both | Feather | 
| B Series SoM (LTE Cat M1) | B404 B402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B Series SoM (LTE Cat 1) | B524 | EG91-E | Europe, AU, NZ | &nbsp; | &nbsp; | Cat 1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B Series SoM (LTE Cat 1) | B523 | EG91-E | Europe | &nbsp; | &nbsp; | Cat 1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| Tracker SoM (LTE Cat M1) | T404 T402 | BG96-MC | US, CA, MX<sup>5</sup> | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | SMD Module | 
| Tracker SoM (LTE Cat 1/2G/3G) | T524 | EG91-EX | Europe, AU, NZ | &check; | &check; | Cat 1 | Gen3 | MFF2<sup>1</sup> | SMD Module |
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | EG91-EX | Europe | &check; | &check; | Cat 1 | Gen3 | MFF2<sup>1</sup> | SMD Module |
| Electron 2G | E350 | G350 | World| &check; | &nbsp; | &nbsp; | Gen2 | Card | Pins | 
| Electron 3G | E260 | U260 | Americas| &check; | &check; | &nbsp; | Gen2 | Card |Pins | 
| Electron 3G | E270 | U270 | Europe, Asia, Africa | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron Global | ELC314 | U201 | World | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron LTE (Cat M1) | ELC404 ELC402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1  | Gen2 | MFF2<sup>1</sup> | Pins  | 
| E Series 2G/3G | E310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | MFF2<sup>1</sup> | SMD Module | 
| E Series LTE (Cat M1) | E404 E402 | R410 | World |  &nbsp; | &nbsp; | Cat M1 | Gen2 | MFF2<sup>1</sup> | SMD Module | 

<sup>1</sup> MFF2 SMD Particle SIM card. It's soldered to the board and is not reprogrammable.
