---
title: Cellular overview
columns: two
layout: commonTwo.hbs
description: Introduction to Particle cellular devices and cellular standards
---

# {{title}}

Particle has a wide variety of cellular devices to suit many applications. There's a handy table at the end to help you device what's the best device for your application, but some explanation is in order first as there are a number of decisions to make!


## Form factor

### Boron

{{!-- BEGIN shared-blurb 33f29de8-9bab-11ec-b909-0242ac120002 --}}
![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

- Includes a built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- Can be powered by USB, rechargeable LiPo battery, or an external power supply (3.9 - 12 VDC).
{{!-- END shared-blurb --}}

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R510 | &check; | GA | |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R510 | &check; | GA | |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R510 | &check; | GA | |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | NRND | BRN404XTRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 |  | Deprecated | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 |  | Deprecated | |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | &check; | Deprecated | |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | &check; | Deprecated | |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | BRN404X|
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | R410 |  | Deprecated | |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | &check; | Deprecated | BRN404X|
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R410 | &check; | Deprecated | BRN404XKIT|
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | BRN404XTRAY50|


{{!-- END do not edit content above, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}





### B-Series SoM

![B-Series](/assets/images/b-series/b-series-top.png)

{{!-- BEGIN shared-blurb b69a2546-9baa-11ec-b909-0242ac120002 --}}
The B-Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

Many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

Additionally, the extra width vs. the Boron (Adafruit Feather) form-factor makes it possible to include a LTE Cat 1 with 2G/3G fallback cellular modem, such as the Quectel EG91-E on the B524. This modem is too wide to fit on a Boron.

| Feature | Boron | B-Series SoM | SoM Base Board | Tracker SoM |
| --- | :---: | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |&check; | 
| MFF2 SMD Particle SIM<sup>2</sup> | &check; | &check; | &nbsp; |&check; | 
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional | Optional |
| Status LED | &check; | &nbsp; | Optional | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional | Optional |
| Battery Connector | &check; | &nbsp; | Optional | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional | &check; | 

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

<sup>2</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 97fa98d2-9baa-11ec-b909-0242ac120002 --}}
The available models include:

| Model | Region | EtherSIM | Bands | Lifecycle | Replacement |
| :--- | :--- | :---: | :--- | :--- | :--- | 
| B404X | United States, Canada, Mexico | &check; | LTE Cat M1 | Coming soon | |
| B524 | EMEAA | &check; | LTE Cat M1 | GA | |
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Last buy | Use B404X instead |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Deprecated | Use B404X instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Deprecated | Use B524 instead |

- The B404X, B404, and B402 cannot be used in Central or South America.
- The B524 can be used in selected countries in Europe, Middle East, Africa, and Asia (EMEAA), including Australia and New Zealand.
- The B524 and B523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

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



### Tracker SoM and Tracker One

{{!-- BEGIN shared-blurb 875eaa26-9bab-11ec-b909-0242ac120002 --}}
![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- PMIC and fuel gauge chips (charger and battery level sensor)
- Hardware watchdog
{{!-- END shared-blurb --}}

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


### Monitor One

![Monitor One](/assets/images/monitor-one/monitor-one-closed.jpg)

The Monitor One is based on the Tracker SoM but includes a rugged enclosure with multiple mounting options and room for expansion cards within the enclosure.

- **Ready to go** with rugged IP67-rated enclosure with room inside for an expansion card.
- **Flexible power supply** to easily add asset tracking to most devices with a 6 - 30 VDC power input and a large 18650 LiPo battery pack.
- **Internal or external antennas** for cellular and GNSS.
- **Temperature sensors** on the carrier board, and also a battery pack temperature sensor.
- **Expansion card connector** to allow for custom application specific hardware.
- **RGB LED** for system status, and two user RGB LEDs for your own use, visible from outside the enclosure.
- **User button**, waterproof and accessible from outside the enclosure.


### E-Series (SMD)

{{!-- BEGIN shared-blurb 58d445bc-9bab-11ec-b909-0242ac120002 --}}
![E-Series](/assets/images/e-series/illustrations/e0-top.png)

The E-Series modules are generally 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E-Series, you can easily move from prototyping to mass production with the same software.

- The E310, E313, and E314 are deprecated due to the end-of-life of the u-blox SARA-U201 cellular modem module.
- The E402 and E404 has been replaced by the E404X. Note, however, that this is not a drop-in replacement as there are significant differences between these two modules. See the [E404X migration guide](/hardware/migration-guides/e404x-migration-guide/) for more information.
- New designs should use the B-Series M.2 SoM instead of the E-Series form-factor.

| Feature | Electron | E-Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM<sup>1</sup> | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |

<sup>1</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}


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



### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is the 2nd-generation cellular device in a prototyping form factor. It is designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board. This model is not recommended for new designs (NRND) and many variations have been discontinued as certain chips and modem modules no longer being sold.


![Electron Breadboard](/assets/images/phototransistor-electron.jpg)



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


## By region


{{!-- BEGIN do not edit content below, it is automatically generated 921d1b74-0130-49e9-9322-3da75e405e4e --}}

| Region | SKU | Description | Modem | EtherSIM | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| Americas | ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | U260 | &nbsp; | 2 | Deprecated | &nbsp; |
| Americas | B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | EG91-NAX | &nbsp; | 3 | GA | &nbsp; |
| Americas | E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | U260 | &nbsp; | 2 | Deprecated | BRN404XKIT |
| Americas | E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | U260 | &nbsp; | 2 | Deprecated | BRN404XTRAY50 |
| Americas | ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | EG800Q-NA | &check; | 3 | In development | &nbsp; |
| Americas | ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | EG800Q-NA | &check; | 3 | In development | &nbsp; |
| Americas | SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | U260 | &nbsp; | 2 | Deprecated | &nbsp; |
| EMEAA | ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | U270 | &nbsp; | 2 | Deprecated | &nbsp; |
| EMEAA | B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | EG91-E | &nbsp; | 3 | Deprecated | B524MEA |
| EMEAA | B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EG91-E | &nbsp; | 3 | NRND | B524MTY |
| EMEAA | B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EG91-E | &check; | 3 | GA | &nbsp; |
| EMEAA | B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EG91-E | &check; | 3 | GA | &nbsp; |
| EMEAA | E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | U270 | &nbsp; | 2 | Deprecated | B524MEA |
| EMEAA | E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | U270 | &nbsp; | 2 | NRND | B524MTY |
| EMEAA | ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | EG800Q-EU | &check; | 3 | In development | &nbsp; |
| EMEAA | ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | EG800Q-EU | &check; | 3 | In development | &nbsp; |
| EMEAA | M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EG91-EX | &check; | 4 | GA | &nbsp; |
| EMEAA | M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EG91-EX | &check; | 4 | GA | &nbsp; |
| EMEAA | MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EG91-EX | &check; | 3 | GA | &nbsp; |
| EMEAA | ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EG91-EX | &nbsp; | 3 | GA | ONE524MEA |
| EMEAA | ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EG91-EX | &nbsp; | 3 | GA | ONE524MTY |
| EMEAA | ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EG91-EX | &check; | 3 | GA | &nbsp; |
| EMEAA | ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EG91-EX | &check; | 3 | GA | &nbsp; |
| EMEAA | SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | U270 | &nbsp; | 2 | Deprecated | &nbsp; |
| EMEAA | T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EG91-EX | &nbsp; | 3 | Deprecated | T524MEA |
| EMEAA | T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EG91-EX | &nbsp; | 3 | NRND | T524MKIT |
| EMEAA | T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EG91-EX | &nbsp; | 3 | Deprecated | T524MTY |
| EMEAA | T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EG91-EX | &check; | 3 | GA | &nbsp; |
| EMEAA | T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EG91-EX | &check; | 3 | GA | &nbsp; |
| EMEAA | T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EG91-EX | &check; | 3 | GA | &nbsp; |
| Global | ASSET2GV2 | Asset Tracker 2G | G350 | &nbsp; | 2 | Deprecated | &nbsp; |
| Global | BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | U201 | &nbsp; | 3 | Deprecated | &nbsp; |
| Global | BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | U201 | &nbsp; | 3 | Deprecated | &nbsp; |
| Global | BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | U201 | &check; | 3 | Deprecated | &nbsp; |
| Global | BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | U201 | &check; | 3 | Deprecated | &nbsp; |
| Global | E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | U201 | &nbsp; | 2 | NRND | E314KIT |
| Global | E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | U201 | &nbsp; | 2 | Deprecated | &nbsp; |
| Global | E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | U201 | &nbsp; | 2 | Deprecated | &nbsp; |
| Global | E313EA | E-Series 2G/3G (Global - E313), [x1] | U201 | &nbsp; | 2 | Deprecated | &nbsp; |
| Global | E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | U201 | &nbsp; | 2 | End of life | &nbsp; |
| Global | E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | U201 | &check; | 2 | NRND | &nbsp; |
| Global | E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | U201 | &check; | 2 | Deprecated | &nbsp; |
| Global | E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | U201 | &check; | 2 | NRND | &nbsp; |
| Global | E350KIT | Electron 2G Kit (Global) | G350 | &nbsp; | 2 | Deprecated | B524MEA |
| Global | E350TRAY50 | Electron 2G (Global), Tray [x50] | G350 | &nbsp; | 2 | Deprecated | B524MTY |
| Global | ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | U201 | &check; | 2 | NRND | &nbsp; |
| Global | M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | BG95-M5 | &check; | 4 | GA | &nbsp; |
| Global | M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | BG95-M5 | &check; | 4 | GA | &nbsp; |
| Global | M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | BG95-S5 | &nbsp; | 4 | In development | &nbsp; |
| Global | M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | BG95-S5 | &check; | 4 | In development | &nbsp; |
| Global | MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | BG95-M5 | &check; | 4 | GA | &nbsp; |
| Global | MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | BG95-M5 | &check; | 4 | GA | &nbsp; |
| Global | MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | EG91-EX | &check; | 4 | GA | &nbsp; |
| Global | MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | EG91-EX | &check; | 4 | GA | &nbsp; |
| Global | MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | BG95-S5 | &check; | 4 | In development | &nbsp; |
| Global | MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | BG95-S5 | &check; | 4 | In development | &nbsp; |
| NORAM | B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | R410 | &nbsp; | 3 | Deprecated | B404XMEA |
| NORAM | B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | R410 | &nbsp; | 3 | Deprecated | B404XMTY |
| NORAM | B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | R410 | &check; | 3 | Deprecated | B404XMEA |
| NORAM | B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | R410 | &check; | 3 | NRND | B404XMTY |
| NORAM | B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | EG91-NAX | &nbsp; | 3 | GA | &nbsp; |
| NORAM | B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | EG91-NAX | &check; | 3 | Deprecated | B504EMEA |
| NORAM | B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | EG91-NAX | &check; | 3 | Deprecated | B504EMTY |
| NORAM | BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | R410 | &nbsp; | 3 | Deprecated | BRN404X |
| NORAM | BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | R410 | &nbsp; | 3 | Deprecated | &nbsp; |
| NORAM | BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | R410 | &nbsp; | 3 | Deprecated | BRN404XKIT |
| NORAM | BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | R410 | &nbsp; | 3 | NRND | BRN404XTRAY50 |
| NORAM | BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | R410 | &check; | 3 | Deprecated | BRN404X |
| NORAM | BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | R410 | &check; | 3 | Deprecated | BRN404XKIT |
| NORAM | BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | R410 | &check; | 3 | Deprecated | BRN404XTRAY50 |
| NORAM | BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | R410 | &nbsp; | 2 | NRND | &nbsp; |
| NORAM | E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | R410 | &nbsp; | 2 | Deprecated | &nbsp; |
| NORAM | E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | R410 | &nbsp; | 2 | NRND | E404XTRAY50 |
| NORAM | E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | R410 | &check; | 2 | NRND | &nbsp; |
| NORAM | E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | R410 | &check; | 2 | NRND | &nbsp; |
| NORAM | E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | R410 | &check; | 2 | Deprecated | E404XTRAY50 |
| NORAM | E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | R510 | &check; | 3 | GA | &nbsp; |
| NORAM | ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | R410 | &nbsp; | 2 | Deprecated | BRN404XKIT |
| NORAM | ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | R410 | &nbsp; | 2 | Deprecated | BRN404XTRAY50 |
| NORAM | ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | R410 | &check; | 2 | Deprecated | &nbsp; |
| NORAM | MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | BG96-MC | &check; | 3 | GA | &nbsp; |
| NORAM | MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | BG96-MC | &check; | 3 | In development | &nbsp; |
| NORAM | ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | BG96-MC | &nbsp; | 3 | Deprecated | ONE404MEA |
| NORAM | ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | BG96-MC | &nbsp; | 3 | Deprecated | ONE404MTY |
| NORAM | ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | BG96-MC | &check; | 3 | GA | &nbsp; |
| NORAM | ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | BG96-MC | &check; | 3 | GA | &nbsp; |
| NORAM | T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | BG96-MC | &nbsp; | 3 | Deprecated | T404MEA |
| NORAM | T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | BG96-MC | &nbsp; | 3 | Deprecated | T404MKIT |
| NORAM | T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | BG96-MC | &nbsp; | 3 | NRND | T404MTY |
| NORAM | T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | BG96-MC | &check; | 3 | GA | &nbsp; |
| NORAM | T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | BG96-MC | &check; | 3 | GA | &nbsp; |
| NORAM | T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | BG96-MC | &check; | 3 | GA | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 921d1b74-0130-49e9-9322-3da75e405e4e --}}

- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.
- Global 2G/3G devices should not be used in the United States because of the [2G/3G sunset](/getting-started/hardware/cellular-overview/#united-states).


## By modem

This table lists all SKUs, sorted by the type of cellular modem in the device.

{{!-- BEGIN do not edit content below, it is automatically generated a85479cf-355b-45c8-9062-db69f037bfea --}}

| Modem | SKU | Description | Region | EtherSIM | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :---: | :---: | :--- | :--- |
| BG95-M5 | M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | &check; | 4 | GA | &nbsp; |
| BG95-M5 | M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | &check; | 4 | GA | &nbsp; |
| BG95-M5 | MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | &check; | 4 | GA | &nbsp; |
| BG95-M5 | MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | &check; | 4 | GA | &nbsp; |
| BG95-S5 | M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &nbsp; | 4 | In development | &nbsp; |
| BG95-S5 | M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &check; | 4 | In development | &nbsp; |
| BG95-S5 | MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | &check; | 4 | In development | &nbsp; |
| BG95-S5 | MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &check; | 4 | In development | &nbsp; |
| BG96-MC | MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| BG96-MC | MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | 3 | In development | &nbsp; |
| BG96-MC | ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | &nbsp; | 3 | Deprecated | ONE404MEA |
| BG96-MC | ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | &nbsp; | 3 | Deprecated | ONE404MTY |
| BG96-MC | ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| BG96-MC | ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | &check; | 3 | GA | &nbsp; |
| BG96-MC | T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | &nbsp; | 3 | Deprecated | T404MEA |
| BG96-MC | T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | &nbsp; | 3 | Deprecated | T404MKIT |
| BG96-MC | T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | &nbsp; | 3 | NRND | T404MTY |
| BG96-MC | T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| BG96-MC | T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| BG96-MC | T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 3 | GA | &nbsp; |
| EG800Q-EU | ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | EMEAA | &check; | 3 | In development | &nbsp; |
| EG800Q-EU | ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | EMEAA | &check; | 3 | In development | &nbsp; |
| EG800Q-NA | ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | Americas | &check; | 3 | In development | &nbsp; |
| EG800Q-NA | ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | Americas | &check; | 3 | In development | &nbsp; |
| EG91-E | B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | &nbsp; | 3 | Deprecated | B524MEA |
| EG91-E | B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | &nbsp; | 3 | NRND | B524MTY |
| EG91-E | B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-E | B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | 4 | GA | &nbsp; |
| EG91-EX | M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | 4 | GA | &nbsp; |
| EG91-EX | MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | &check; | 4 | GA | &nbsp; |
| EG91-EX | MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | &check; | 4 | GA | &nbsp; |
| EG91-EX | ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | &nbsp; | 3 | GA | ONE524MEA |
| EG91-EX | ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | &nbsp; | 3 | GA | ONE524MTY |
| EG91-EX | ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | &nbsp; | 3 | Deprecated | T524MEA |
| EG91-EX | T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | &nbsp; | 3 | NRND | T524MKIT |
| EG91-EX | T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | &nbsp; | 3 | Deprecated | T524MTY |
| EG91-EX | T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-EX | T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | 3 | GA | &nbsp; |
| EG91-NAX | B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | &nbsp; | 3 | GA | &nbsp; |
| EG91-NAX | B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | &nbsp; | 3 | GA | &nbsp; |
| EG91-NAX | B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | &check; | 3 | Deprecated | B504EMEA |
| EG91-NAX | B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | &check; | 3 | Deprecated | B504EMTY |
| G350 | ASSET2GV2 | Asset Tracker 2G | Global | &nbsp; | 2 | Deprecated | &nbsp; |
| G350 | E350KIT | Electron 2G Kit (Global) | Global | &nbsp; | 2 | Deprecated | B524MEA |
| G350 | E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | &nbsp; | 2 | Deprecated | B524MTY |
| R410 | B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | 3 | Deprecated | B404XMEA |
| R410 | B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | 3 | Deprecated | B404XMTY |
| R410 | B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | 3 | Deprecated | B404XMEA |
| R410 | B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 3 | NRND | B404XMTY |
| R410 | BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | 3 | Deprecated | BRN404X |
| R410 | BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | &nbsp; | 3 | Deprecated | &nbsp; |
| R410 | BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | &nbsp; | 3 | Deprecated | BRN404XKIT |
| R410 | BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | 3 | NRND | BRN404XTRAY50 |
| R410 | BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | 3 | Deprecated | BRN404X |
| R410 | BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | 3 | Deprecated | BRN404XKIT |
| R410 | BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 3 | Deprecated | BRN404XTRAY50 |
| R410 | E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | &nbsp; | 2 | NRND | &nbsp; |
| R410 | E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | 2 | Deprecated | &nbsp; |
| R410 | E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | 2 | NRND | E404XTRAY50 |
| R410 | E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &check; | 2 | NRND | &nbsp; |
| R410 | E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | 2 | NRND | &nbsp; |
| R410 | E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 2 | Deprecated | E404XTRAY50 |
| R410 | ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | 2 | Deprecated | BRN404XKIT |
| R410 | ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | 2 | Deprecated | BRN404XTRAY50 |
| R410 | ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 2 | Deprecated | &nbsp; |
| R510 | B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| R510 | B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 3 | GA | &nbsp; |
| R510 | BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| R510 | BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | 3 | GA | &nbsp; |
| R510 | BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &check; | 3 | GA | &nbsp; |
| R510 | E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | 3 | GA | &nbsp; |
| U201 | BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &nbsp; | 3 | Deprecated | &nbsp; |
| U201 | BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &nbsp; | 3 | Deprecated | &nbsp; |
| U201 | BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &check; | 3 | Deprecated | &nbsp; |
| U201 | BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &check; | 3 | Deprecated | &nbsp; |
| U201 | E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | &nbsp; | 2 | NRND | E314KIT |
| U201 | E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Global | &nbsp; | 2 | Deprecated | &nbsp; |
| U201 | E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Global | &nbsp; | 2 | Deprecated | &nbsp; |
| U201 | E313EA | E-Series 2G/3G (Global - E313), [x1] | Global | &nbsp; | 2 | Deprecated | &nbsp; |
| U201 | E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | Global | &nbsp; | 2 | End of life | &nbsp; |
| U201 | E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | &check; | 2 | NRND | &nbsp; |
| U201 | E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Global | &check; | 2 | Deprecated | &nbsp; |
| U201 | E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | Global | &check; | 2 | NRND | &nbsp; |
| U201 | ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | &check; | 2 | NRND | &nbsp; |
| U260 | ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | &nbsp; | 2 | Deprecated | &nbsp; |
| U260 | E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | &nbsp; | 2 | Deprecated | BRN404XKIT |
| U260 | E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | &nbsp; | 2 | Deprecated | BRN404XTRAY50 |
| U260 | SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | &nbsp; | 2 | Deprecated | &nbsp; |
| U270 | ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | &nbsp; | 2 | Deprecated | &nbsp; |
| U270 | E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | &nbsp; | 2 | Deprecated | B524MEA |
| U270 | E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | &nbsp; | 2 | NRND | B524MTY |
| U270 | SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | &nbsp; | 2 | Deprecated | &nbsp; |


{{!-- END do not edit content above, it is automatically generated a85479cf-355b-45c8-9062-db69f037bfea --}}

## By SIM

This table lists SKUs by the type of SIM. There are four possible Particle SIM cards:

- EtherSIM is used in all current devices and upcoming devices
- Type KA is used in all non-EtherSIM LTE Cat M1 devices: Boron LTE BRN402, B-Series SoM B402, Tracker SoM T402, Tracker One ONE402, E-Series LTE E402, Electron LTE ELC402
- Type KV is used in the Boron 2G/3G BRN310, B-Series SoM B523, Tracker SoM T523, Tracker One ONE523
- Type T is used in the E-Series E310 and Electron (U260, U270, G350)


{{!-- BEGIN do not edit content below, it is automatically generated 8747e7eb-420e-425e-882c-e10117b77620 --}}

| SIM | SKU | Description | Region | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| EtherSIM | B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R410 | 3 | Deprecated | B404XMEA |
| EtherSIM | B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | 3 | NRND | B404XMTY |
| EtherSIM | B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | EG91-NAX | 3 | Deprecated | B504EMEA |
| EtherSIM | B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | EG91-NAX | 3 | Deprecated | B504EMTY |
| EtherSIM | B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | EG91-E | 3 | GA | &nbsp; |
| EtherSIM | B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-E | 3 | GA | &nbsp; |
| EtherSIM | BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | 3 | Deprecated | &nbsp; |
| EtherSIM | BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | 3 | Deprecated | &nbsp; |
| EtherSIM | BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | 3 | Deprecated | BRN404X |
| EtherSIM | BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R410 | 3 | Deprecated | BRN404XKIT |
| EtherSIM | BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | 3 | Deprecated | BRN404XTRAY50 |
| EtherSIM | BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | U201 | 2 | NRND | &nbsp; |
| EtherSIM | E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Global | U201 | 2 | Deprecated | &nbsp; |
| EtherSIM | E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | Global | U201 | 2 | NRND | &nbsp; |
| EtherSIM | E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | R410 | 2 | NRND | &nbsp; |
| EtherSIM | E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R410 | 2 | NRND | &nbsp; |
| EtherSIM | E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | 2 | Deprecated | E404XTRAY50 |
| EtherSIM | E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R510 | 3 | GA | &nbsp; |
| EtherSIM | ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | 2 | NRND | &nbsp; |
| EtherSIM | ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | 2 | Deprecated | &nbsp; |
| EtherSIM | ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | Americas | EG800Q-NA | 3 | In development | &nbsp; |
| EtherSIM | ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | Americas | EG800Q-NA | 3 | In development | &nbsp; |
| EtherSIM | ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | EMEAA | EG800Q-EU | 3 | In development | &nbsp; |
| EtherSIM | ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | EMEAA | EG800Q-EU | 3 | In development | &nbsp; |
| EtherSIM | M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | BG95-M5 | 4 | GA | &nbsp; |
| EtherSIM | M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | BG95-M5 | 4 | GA | &nbsp; |
| EtherSIM | M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | 4 | GA | &nbsp; |
| EtherSIM | M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-EX | 4 | GA | &nbsp; |
| EtherSIM | M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | 4 | In development | &nbsp; |
| EtherSIM | MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | 3 | In development | &nbsp; |
| EtherSIM | MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM | MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | BG95-M5 | 4 | GA | &nbsp; |
| EtherSIM | MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | 4 | GA | &nbsp; |
| EtherSIM | MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | EG91-EX | 4 | GA | &nbsp; |
| EtherSIM | MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | 4 | GA | &nbsp; |
| EtherSIM | MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | BG95-S5 | 4 | In development | &nbsp; |
| EtherSIM | MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | 4 | In development | &nbsp; |
| EtherSIM | ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM | ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM | T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | BG96-MC | 3 | GA | &nbsp; |
| EtherSIM | T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM | T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM | T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-EX | 3 | GA | &nbsp; |
| EtherSIM+ | B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | EG91-NAX | 3 | GA | &nbsp; |
| EtherSIM+ | B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | EG91-NAX | 3 | GA | &nbsp; |
| EtherSIM+ | M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | 4 | In development | &nbsp; |
| Type KA | B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | 3 | Deprecated | B404XMEA |
| Type KA | B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | 3 | Deprecated | B404XMTY |
| Type KA | BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | 3 | Deprecated | BRN404X |
| Type KA | BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | R410 | 3 | Deprecated | &nbsp; |
| Type KA | BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | R410 | 3 | Deprecated | BRN404XKIT |
| Type KA | BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | 3 | NRND | BRN404XTRAY50 |
| Type KA | E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 | 2 | NRND | &nbsp; |
| Type KA | E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | 2 | Deprecated | &nbsp; |
| Type KA | E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | 2 | NRND | E404XTRAY50 |
| Type KA | ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | 2 | Deprecated | BRN404XKIT |
| Type KA | ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | 2 | Deprecated | BRN404XTRAY50 |
| Type KA | ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC | 3 | Deprecated | ONE404MEA |
| Type KA | ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC | 3 | Deprecated | ONE404MTY |
| Type KA | T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC | 3 | Deprecated | T404MEA |
| Type KA | T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC | 3 | Deprecated | T404MKIT |
| Type KA | T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC | 3 | NRND | T404MTY |
| Type KV | B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E | 3 | Deprecated | B524MEA |
| Type KV | B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E | 3 | NRND | B524MTY |
| Type KV | BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | 3 | Deprecated | &nbsp; |
| Type KV | BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | 3 | Deprecated | &nbsp; |
| Type KV | E313EA | E-Series 2G/3G (Global - E313), [x1] | Global | U201 | 2 | Deprecated | &nbsp; |
| Type KV | E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | Global | U201 | 2 | End of life | &nbsp; |
| Type KV | ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | 3 | GA | ONE524MEA |
| Type KV | ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX | 3 | GA | ONE524MTY |
| Type KV | T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | 3 | Deprecated | T524MEA |
| Type KV | T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX | 3 | NRND | T524MKIT |
| Type KV | T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX | 3 | Deprecated | T524MTY |
| Type T | ASSET2GV2 | Asset Tracker 2G | Global | G350 | 2 | Deprecated | &nbsp; |
| Type T | ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | U260 | 2 | Deprecated | &nbsp; |
| Type T | ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | U270 | 2 | Deprecated | &nbsp; |
| Type T | E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | U260 | 2 | Deprecated | BRN404XKIT |
| Type T | E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 | 2 | Deprecated | BRN404XTRAY50 |
| Type T | E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | U270 | 2 | Deprecated | B524MEA |
| Type T | E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 | 2 | NRND | B524MTY |
| Type T | E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | U201 | 2 | NRND | E314KIT |
| Type T | E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Global | U201 | 2 | Deprecated | &nbsp; |
| Type T | E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Global | U201 | 2 | Deprecated | &nbsp; |
| Type T | E350KIT | Electron 2G Kit (Global) | Global | G350 | 2 | Deprecated | B524MEA |
| Type T | E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | 2 | Deprecated | B524MTY |
| Type T | SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | U260 | 2 | Deprecated | &nbsp; |
| Type T | SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | U270 | 2 | Deprecated | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 8747e7eb-420e-425e-882c-e10117b77620 --}}

## Cellular carriers

The Particle SIM supports many carriers around the world. The [list of mobile carriers](/reference/cellular/cellular-carriers/) is the complete list, however it's important to note that different Particle SIM cards that support a different set of carriers, which may also vary depending on the device.

- Boron 2G/3G EtherSIM BRN314 
- Boron 2G/3G BRN310
- B-Series B524 EtherSIM (LTE Cat 1 Europe, Australia, and New Zealand)
- B-Series B523 (LTE Cat 1 Europe)
- LTE Cat M1 EtherSIM (Boron LTE, B-Series B404X/B404, E-Series LTE E404X/E404, and Electron LTE ELC404)
- LTE Cat M1 (Boron LTE, B-Series B402, E-Series LTE, and Electron LTE)
- Electron ELC314 and E-Series E314 EtherSIM
- Electron 2G (G350), Electron 3G (U260 and U270), and E-Series 2G/3G E310


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
| B-Series B402 SoM (Cat M1) | B404X B404 B402 | &nbsp; | &check; |
| B-Series B523 SoM (Cat 1) | B524 B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T404 T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC314 | &check; | &nbsp; |
| Electron LTE (Cat M1) | ELC404 ELC402 | &nbsp; | &check; |
| E-Series 2G/3G | E314 E310 | &nbsp; | &check; |
| E-Series LTE (Cat M1) | E404X E404 E402 | &nbsp; | &check; |


### Roaming

Non-LTE Particle SIM cards support world-wide roaming. However there may be limitations based on the radio on the device.

| Device | Model | Roaming | LTE | 3G | 2G | Bands |
| --- | :--- |  --- | --- | --- | --- | --- |
| Boron 2G/3G | BRN314 BRN310 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Boron LTE (Cat M1) | BRN404 BRN402 | US, CA, MX<sup>1</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B-Series B402 SoM (LTE Cat M1) | B404X B404 B402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B-Series B524 SoM (LTE Cat 1) | B524 | Europe, AU, NZ | Cat 1 | &check; |&check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| B-Series B523 SoM (LTE Cat 1) | B523 | Europe | Cat 1 | &check; |&check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Tracker SoM (LTE Cat M1) | T404 T402 | US, CA, MX<sup>5</sup> | Cat M1 | &nbsp; | &nbsp; | LTE Cat M1<sup>6</sup> |
| Tracker SoM (LTE Cat 1/2G/3G) | T524 | Europe, AU, NZ | Cat 1 | &check; | &check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | Europe | Cat 1 | &check; | &check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Electron 2G | G350 | World<sup>2</sup> | | | &check; | 850, 900, 1800, 1900 |
| Electron 3G | U260 | Americas, AU, NZ<sup>3</sup> | | &check; | &check; | 850, 1900 |
| Electron 3G | U270 | Europe, Asia, Africa<sup>4</sup> | | &check; | &check; | 900, 1800, 2100 |
| Electron Global | ELC314 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Electron LTE (Cat M1) | ELC404 ELC402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| E-Series 2G/3G | E314 E310 | World | | &check; | &check;| 850, 900, 1800, 1900, 2100 |
| E-Series LTE (Cat M1) | E404X E404 E402 | US, CA, MX<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |


<sup>1</sup>The Boron LTE can be used with a 3rd-party SIM card in areas outside of the United States, Canada, and Mexico at this time. This is not officially supported, but has been known to work.

<sup>2</sup>The Electron 2G cannot be used in locations that no longer have 2G service. Some countries include: Australia, Japan, Korea, Singapore, Switzerland, and Taiwan. In the United States, 2G services is only available on T-Mobile, and only through the end of 2020. In some other countries, including New Zealand, the Electron 2G can only be used with a 3rd-party SIM card, not with the included Particle SIM card. 

<sup>3</sup>The U260 model supports 850/1900 MHz for both 3G (UMTS/HSPA) and 2G (GPRS/EDGE). These are the frequencies typically used in the Americas, but there are exceptions. 

For example, in Australia, we recommend the U260 because the carrier used by the Particle SIM, Telstra uses 850 MHz. However, if you are using a 3rd-party SIM from Optus, you'll need the U270 because Optus uses 900/2100 MHz.

In New Zealand, we previously recommended the U270 as Two Degrees was the carrier. We've switched to Spark, however, which uses 850 MHz and thus the U260 is now recommended for New Zealand, like Australia. If you've purchased a U270 for use in New Zealand and are stuck at blinking green (connecting to cellular), technical support can switch your SIM back to Two Degrees so you can use the U270.

In Uruguay, the carrier used by the Particle SIM, Movistar, uses 1900 MHz so the U260 Americas model is the correct one. If you're using an Antel 3rd-party SIM, however, that uses 2100 MHz you you'll nee the U270 model, instead.

<sup>4</sup>The U270 model supports 900/2100 MHz for 3G (UMTS/HSPA) and 900/1800 MHz for 2G (GPRS/EDGE). It is typically used in Europe, Asia, and Africa. It is used by some carriers in South America (with a 3rd-party SIM card).

<sup>5</sup>The B-Series B402, E-Series LTE, and Electron LTE cannot be used outside of the United States, Canada, and Mexico at this time. 

<sup>6</sup>For LTE Cat M1 bands, see [LTE Cat M1](#lte-cat-m1) below.

<sup>7</sup>The Quectel EG91-E modem supports European LTE bands (700, 700, 900, 1800, 2100, and 2600), as well as HSPA/WCDMA 3G (900, 2100) and GSM 2G (900, 1800). See [the datasheet](/reference/datasheets/b-series/b524-b523-datasheet/#4g-lte-cellular-characteristics-for-eg91-e) for more information.

### 3rd-party SIM cards

Some Particle devices are compatible with [3rd-party SIM cards](/troubleshooting/guides/connectivity-troubleshooting/using-3rd-party-sim-cards/). 


{{!-- BEGIN do not edit content below, it is automatically generated 5299a764-88fa-11ec-a8a3-0242ac120002 --}}

| SKU | Description | Region | EtherSIM | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | R410 | 3 | NRND | BRN404XTRAY50 |
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | &nbsp; | U270 | 2 | NRND | B524MTY |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | &check; | U201 | 2 | NRND | &nbsp; |
| ASSET2GV2 | Asset Tracker 2G | Global | &nbsp; | G350 | 2 | Deprecated | &nbsp; |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | &nbsp; | U260 | 2 | Deprecated | &nbsp; |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | &nbsp; | U270 | 2 | Deprecated | &nbsp; |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &nbsp; | U201 | 3 | Deprecated | &nbsp; |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &nbsp; | U201 | 3 | Deprecated | &nbsp; |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &check; | U201 | 3 | Deprecated | &nbsp; |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &check; | U201 | 3 | Deprecated | &nbsp; |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | BRN404X |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | &nbsp; |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | BRN404XKIT |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | R410 | 3 | Deprecated | BRN404X |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | R410 | 3 | Deprecated | BRN404XKIT |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R410 | 3 | Deprecated | BRN404XTRAY50 |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | &nbsp; | U260 | 2 | Deprecated | BRN404XKIT |
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | &nbsp; | U260 | 2 | Deprecated | BRN404XTRAY50 |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | &nbsp; | U270 | 2 | Deprecated | B524MEA |
| E350KIT | Electron 2G Kit (Global) | Global | &nbsp; | G350 | 2 | Deprecated | B524MEA |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | &nbsp; | G350 | 2 | Deprecated | B524MTY |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | &nbsp; | U260 | 2 | Deprecated | &nbsp; |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | &nbsp; | U270 | 2 | Deprecated | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

There are limitations on using 3rd-party SIM cards in large product deployments. If you think you will need to use a 3rd-party SIM you should [contact sales](https://particle.io/sales/) for additional information.

## Cellular technologies

### 2G

2G, or EDGE, is the oldest technology. It's typically fast enough for IoT applications, even if it seems painfully slow for mobile phone data. One disadvantage for IoT is that connecting to a 2G tower uses the most power and can take longer than LTE.

2G generally uses 850 MHz/1900 MHz in the Americas and 900 MHz/1800 MHz in EMEAA.

Some countries decommissioned 2G first (Australia, AT&T in the United States) to free up frequencies for LTE.

The following long-discontinued SKU is 2G only and can no longer be used in areas that do not have 2G service, such as Australia and Japan.

{{!-- BEGIN do not edit content below, it is automatically generated 8d85e976-88f2-11ec-a8a3-0242ac120002 --}}

| SKU | Description | Region | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| ASSET2GV2 | Asset Tracker 2G | Global | G350 | 2 | Deprecated | &nbsp; |
| E350KIT | Electron 2G Kit (Global) | Global | G350 | 2 | Deprecated | B524MEA |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | 2 | Deprecated | B524MTY |


{{!-- END do not edit content above, it is automatically generated --}}


### 3G

3G, or HSPA, is the next generation of mobile technology.

Some countries, primarily in Europe, decommissioned 3G first, keeping 2G and LTE active instead. T-Mobile in the United States decommissioned 3G before 2G as well.

| Device | Model | 
| --- | :--- | 
| Boron LTE (Cat M1) | BRN404 BRN402 |
| B-Series B402 SoM (LTE Cat M1) | B404X B404 B402 |
| Electron LTE (Cat M1) | ELC404 ELC402 |
| E-Series LTE (Cat M1) | E404X E404 E402 | 

The following SKUs are 2G/3G only and should not be deployed in the United States.

{{!-- BEGIN do not edit content below, it is automatically generated 84f9efae-88f3-11ec-a8a3-0242ac120002 --}}

| SKU | Description | Region | EtherSIM | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | &nbsp; | U270 | 2 | NRND | B524MTY |
| E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | &nbsp; | U201 | 2 | NRND | E314KIT |
| E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | &check; | U201 | 2 | NRND | &nbsp; |
| E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | Global | &check; | U201 | 2 | NRND | &nbsp; |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | &check; | U201 | 2 | NRND | &nbsp; |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | &nbsp; | U260 | 2 | Deprecated | &nbsp; |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | &nbsp; | U270 | 2 | Deprecated | &nbsp; |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &nbsp; | U201 | 3 | Deprecated | &nbsp; |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &nbsp; | U201 | 3 | Deprecated | &nbsp; |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &check; | U201 | 3 | Deprecated | &nbsp; |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | &check; | U201 | 3 | Deprecated | &nbsp; |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | &nbsp; | U260 | 2 | Deprecated | BRN404XKIT |
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | &nbsp; | U260 | 2 | Deprecated | BRN404XTRAY50 |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | &nbsp; | U270 | 2 | Deprecated | B524MEA |
| E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Global | &nbsp; | U201 | 2 | Deprecated | &nbsp; |
| E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Global | &nbsp; | U201 | 2 | Deprecated | &nbsp; |
| E313EA | E-Series 2G/3G (Global - E313), [x1] | Global | &nbsp; | U201 | 2 | Deprecated | &nbsp; |
| E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Global | &check; | U201 | 2 | Deprecated | &nbsp; |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | &nbsp; | U260 | 2 | Deprecated | &nbsp; |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | &nbsp; | U270 | 2 | Deprecated | &nbsp; |
| E313TRAY50 | E-Series 2G/3G (Global - E313), Tray [x50] | Global | &nbsp; | U201 | 2 | End of life | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### CDMA

Particle devices have never supported CDMA. It's a different technology that requires a different type of cellular modem. The Verizon 3G CDMA network in the United States is one of the larger ones, however that network is shutting down at the end of December 2022.

### 4G LTE

There are three main varieties of LTE service. The terms 4G, LTE, and 4G LTE are often used interchangeably. 

- LTE Cat 1 is what's used by your mobile phone, and the B-Series B524/B523 SoM. It's different than the IoT variation (LTE Cat M1).
- LTE Cat M1 is a version of LTE that is used for relatively low data rate, low-cost, and low-power applications. Particle LTE devices like the Boron LTE, E-Series LTE (E404/E402), Electron LTE (ELC404/ELC402), and B-Series B404/B402 SoM, support LTE Cat M1. 
- LTE Cat NB1 ("NB IoT") is a different low-cost and low-power version of LTE, with even lower data rates. While Particle LTE device hardware can support NB1, it is not officially supported at this time.


### LTE Cat M1

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

Only the bands used in North America are enabled in the R410 cellular modem by default. This speeds to connection process.

Note that since LTE Cat M1 SKUs are only supported in North America, they do not have CE certifications. Thus they cannot be legally used in the EU or other countries that require EU certification for local use.

The following SKUs have LTE Cat M1 cellular modems:

{{!-- BEGIN do not edit content below, it is automatically generated 2b701cb4-88f4-11ec-a8a3-0242ac120002 --}}

| SKU | Description | Region | EtherSIM | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R510 | 3 | GA | &nbsp; |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | &check; | BG95-M5 | 4 | GA | &nbsp; |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | &check; | BG95-M5 | 4 | GA | &nbsp; |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | &check; | BG95-M5 | 4 | GA | &nbsp; |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | &check; | BG95-M5 | 4 | GA | &nbsp; |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | BG96-MC | 3 | GA | &nbsp; |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &nbsp; | BG95-S5 | 4 | In development | &nbsp; |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &check; | BG95-S5 | 4 | In development | &nbsp; |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | BG96-MC | 3 | In development | &nbsp; |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | &check; | BG95-S5 | 4 | In development | &nbsp; |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | &check; | BG95-S5 | 4 | In development | &nbsp; |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R410 | 3 | NRND | B404XMTY |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | R410 | 3 | NRND | BRN404XTRAY50 |
| E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | &nbsp; | R410 | 2 | NRND | &nbsp; |
| E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | R410 | 2 | NRND | E404XTRAY50 |
| E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &check; | R410 | 2 | NRND | &nbsp; |
| E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | R410 | 2 | NRND | &nbsp; |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | &nbsp; | BG96-MC | 3 | NRND | T404MTY |
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | B404XMEA |
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | R410 | 3 | Deprecated | B404XMTY |
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | &check; | R410 | 3 | Deprecated | B404XMEA |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | BRN404X |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | &nbsp; |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | &nbsp; | R410 | 3 | Deprecated | BRN404XKIT |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &check; | R410 | 3 | Deprecated | BRN404X |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &check; | R410 | 3 | Deprecated | BRN404XKIT |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R410 | 3 | Deprecated | BRN404XTRAY50 |
| E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | R410 | 2 | Deprecated | &nbsp; |
| E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R410 | 2 | Deprecated | E404XTRAY50 |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | R410 | 2 | Deprecated | BRN404XKIT |
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | R410 | 2 | Deprecated | BRN404XTRAY50 |
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &check; | R410 | 2 | Deprecated | &nbsp; |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | &nbsp; | BG96-MC | 3 | Deprecated | ONE404MEA |
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | &nbsp; | BG96-MC | 3 | Deprecated | ONE404MTY |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | &nbsp; | BG96-MC | 3 | Deprecated | T404MEA |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | &nbsp; | BG96-MC | 3 | Deprecated | T404MKIT |


{{!-- END do not edit content above, it is automatically generated --}}


### LTE Cat 1

LTE Cat 1 is most similar to phone LTE, and should work in all areas with LTE phone data coverage, subject to region and carrier compatibility. No carriers have announced shutdowns of their 4G LTE networks at this time. Even with rollout of 5G in some areas, most carriers will be supporting both 4G and 5G concurrently.

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

Additional countries in the EMEAA region may work with the B524 and T524, but are not officially supported at this time. See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.

There will not be versions of the Boron or Electron with the EG91-E LTE Cat 1 cellular modem because the module is physically too large to fit.

The following SKU have LTE Cat 1 cellular modems:

{{!-- BEGIN do not edit content below, it is automatically generated 42193f40-88f4-11ec-a8a3-0242ac120002 --}}

| SKU | Description | Region | EtherSIM | Modem | Gen | Lifecycle | Replacement |
| :--- | :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | &nbsp; | EG91-NAX | 3 | GA | &nbsp; |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | &nbsp; | EG91-NAX | 3 | GA | &nbsp; |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | &check; | EG91-E | 3 | GA | &nbsp; |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | EG91-E | 3 | GA | &nbsp; |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | EG91-EX | 4 | GA | &nbsp; |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | EG91-EX | 4 | GA | &nbsp; |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | &check; | EG91-EX | 4 | GA | &nbsp; |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | &check; | EG91-EX | 4 | GA | &nbsp; |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | &nbsp; | EG91-EX | 3 | GA | ONE524MEA |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | &nbsp; | EG91-EX | 3 | GA | ONE524MTY |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &check; | EG91-EX | 3 | GA | &nbsp; |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | Americas | &check; | EG800Q-NA | 3 | In development | &nbsp; |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | Americas | &check; | EG800Q-NA | 3 | In development | &nbsp; |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | EMEAA | &check; | EG800Q-EU | 3 | In development | &nbsp; |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | EMEAA | &check; | EG800Q-EU | 3 | In development | &nbsp; |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | &nbsp; | EG91-E | 3 | NRND | B524MTY |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | &nbsp; | EG91-EX | 3 | NRND | T524MKIT |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | &check; | EG91-NAX | 3 | Deprecated | B504EMEA |
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | &check; | EG91-NAX | 3 | Deprecated | B504EMTY |
| B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | &nbsp; | EG91-E | 3 | Deprecated | B524MEA |
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | &nbsp; | EG91-EX | 3 | Deprecated | T524MEA |
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | &nbsp; | EG91-EX | 3 | Deprecated | T524MTY |


{{!-- END do not edit content above, it is automatically generated --}}

### LTE Cat 2 and up

There exists LTE Cat 2 up to LTE Cat 18, but they are not supported by any Particle devices.

LTE Cat 2 through LTE Cat 5 are the same technology as LTE Cat 1 (3GPP Rel 8), just faster. Since Particle devices don't even use the bandwidth available in LTE Cat 1 at this time, there is no advantage of the faster Cat values.

All cell towers that support LTE support LTE Cat 1. 

### 5G

There are currently no Particle devices that support 5G technologies, however most carriers plan to support both 4G LTE and 5G for the foreseeable future.

One of the primary advantages of 5G mid-band and high-band (millimeter wave) are very high data rates. This is not really an advantage for IoT devices, which generally use small amounts of data.

Additionally, one of the reasons for 2G and 3G shutdowns was to free up frequencies for use with 4G LTE. Because 5G added a very large number of new bands, the need to reuse the older frequencies is not as great as it was in the past. Low-band 5G does overlap with 4G, but is not significantly faster than 4G LTE in that band, which lessens the need to sunset 4G.

## 2G and 3G Sunset

Carriers around the world periodically shut down older networks to reallocate the frequencies and tower space to new technologies like LTE and 5G.

The list below is not complete; you should check with the carrier in your area to be sure of sunset, decommissioning, or shutdown dates.


### United States

For an overview of the status of the 2G/3G sunset in the United States, see the [April 2022 Particle blog post](https://www.particle.io/blog/april-2022-3g-sunset-status/).

AT&T deactivated their 2G network at the end of 2016. Electron 2G devices can only use T-Mobile at this time.

AT&T's 3G shutdown will occur on **February 22, 2022**. After this occurs, the Electron U260, Electron E313, and E-Series E310 will only connect to T-Mobile in the United States.

T-Mobile began to reallocate 3G spectrum in March 2020 so there could be reduced coverage, and will eliminate all 3G coverage by July 1, 2022, leaving only 2G.

T-Mobile will deactivate their 2G network in April 2024, at which point 2G/3G devices will cease to work in the United States. This was originally scheduled for end of 2022 and is unlikely to be extended again.

The Boron 2G/3G only connects to T-Mobile in the United States already (it cannot connect to AT&T using the built-in MFF2 Particle SIM).

In the United States we strongly recommend using LTE Cat M1. AT&T has committed to supporting the LTE network at least through the end of 2027.

| After | Event | Electron 2G | Electron 3G | E-Series 2G/3G | Boron 2G/3G | LTE Cat M1 |
| --- | --- | :--: | :--: | :--: | :--: | :---: |
| End of 2016 | AT&T ended 2G service | T-Mobile | Both | Both | T-Mobile | AT&T |
| February 22, 2022 | AT&T ends 3G service | T-Mobile | T-Mobile | T-Mobile | T-Mobile |  AT&T |
| July 1, 2022 | T-Mobile ends 3G service | T-Mobile 2G | T-Mobile 2G | T-Mobile 2G | T-Mobile 2G |  AT&T |
| Not yet announced | T-Mobile ends 2G service | None | None | None | None | AT&T |


### Europe

In some European countries, they're phasing out 3G and instead keeping 2G and LTE networks. All of the Particle 3G cellular devices can also connect to 2G networks, so compatibility will be maintained.

For example, in Norway, Telenor shut down their 3G network at the end of 2020, but keeping their 2G network running until the end of 2025. In Germany, Telekom shut down their 3G network June 30, 2021 but will also keep 2G until end of 2025.

Some countries, such as Switzerland, have shut down their 2G networks first leaving 3G. Swisscom intends to shut down their 3G network in 2025 and only provide LTE service with no 2G or 3G.

### Australia

In Australia, there is no longer 2G service on any carrier and the Electron 2G cannot be used.

| Date | Description |
| :--- | :--- |
| End of 2016 | End of all 2G service in Australia |
| 2019-04 | Vodafone ending 3G service on 2100 MHz (900 MHz still available) |
| 2023-12 | Vodafone ending 3G service |
| 2024-06 | Telstra ending 3G service |
| 2024-09 | Optus ending 3G service |

**Starting in December 2023 there will be dwinding 3G service in Australia. By September 2024 there will be no 2G or 3G service.**

The recommended models for Australia are the B-Series SoM B524, Tracker SoM T524, and Tracker One ONE524, which support LTE Cat 1 with 2G/3G fallback and will continue to work in Australia on all three carriers.

### New Zealand

| Date | Description |
| :--- | :--- |
| 2012-07-31 | Spark ends 2G service |
| 2018-03-31 | 2degrees ends 2G service |
| End of 2024 | Vodafone will end 3G service |
| During 2025 | Vodafone ending 2G service |
| Late 2025 | 2Degrees will end 3G service |
| End of 2025 | Spark ending 3G service |

**Starting at the end of 2024 there will be dwinding 3G service in New Zealand. By the end of 2025 there will be no 2G or 3G service.**

The recommended models for New Zealand are the B-Series SoM B524, Tracker SoM T524, and Tracker One ONE524, which support LTE Cat 1 with 2G/3G fallback and will continue to work in New Zealand on all three carriers.


### Canada

The Electron and E-Series use Rogers in Canada:

- 2G service on Rogers will end at the end of 2020. The Electron 2G will no longer operate after that date with the Particle SIM card. Since Bell Mobility and Tellus also will have decommissioned their 2G networks by then, there are few alternatives for 2G service in Canada.
- 3G service on Rogers will end at the end of 2025.

The Boron 2G/3G uses Telus in Canada:

- 2G services on Telus has already ended.
- 3G service on Telus will end at the end of 2025.

By the end of 2025, Rogers, Telus, and Bell will have ended all 2G and 3G service, at which point the 2G/3G SKUs will no longer be able to connect. The LTE Cat M1 SKUs are recommended for use in North America for this reason.

| After | Event | Electron 2G | Electron 3G | E-Series 2G/3G | Boron 2G/3G
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

While the Boron 2G/3G (BRN314 and BRN310) and E-Series (E314 and E310) are global 2G/3G, they do not support LTE Cat M1. This can be an issue in the United States, where 2G and 3G service will end after 2022, at which point 2G/3G SKUs will no longer work in the United States. This is why the LTE Cat M1 variations (Boron BRN404X, BRN404 and BRN402, E-Series E404X, E404 and E402) are recommended in the United States.

The B-Series SoM (B524, B523) and Tracker SoM (T524, T523, ONE524, ONE523) offer LTE Cat 1, 3G, and 2G, however the cellular modem (EG91-E or EG91-EX) only support the frequencies used in the EMEAA (Europe, Middle East, Africa, and Asia) region. These devices will not work at all in the United States, however there are different SKUs for the United States, Canada, and Mexico (B404X, B404, B402, T404, T402, ONE404, ONE402).

Also note that the LTE Cat 1 EtherSIM models (B524, T524, ONE524) are only officially supported (for enterprise use) in Europe, Australia, and New Zealand. The earlier models (B523, T523, and ONE523) are only officially supported in Europe. However, for individual developers, you will likely be able to use these devices in much of the EMEAA region, subject to the remaining constraints below.


### Carrier and band compatibility

Additionally, the variation of the Particle SIM in a device will determine which carriers are supported. In general, particularly in Europe, the EtherSIM variations (B524, BRN314) will offer many more carriers than the earlier versions (B523, BRN310). 

If you know the device you are interested in and the country, you can find detailed carrier information on the [country details page](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails).

For example, the [B524 country details page for Germany](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Germany&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) shows the details including which cellular bands are supported by which carriers. From this table you can see that Telekom uses bands B32 and B38, however the EG91-E cellular modem does not support these bands. However, there are many other bands supported, both on Telekom and other carriers, so coverage will likely be good.

For comparison, using the [B524 in Brazil](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Brazil&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) is not recommended. The reason is that 850 MHz (band B5) is commonly used to provide service in rural areas because the signals travel a longer distance. The higher frequencies (1800, 2100, and 2600 MHz) are more commonly used in urban areas, thus it is likely that the B524 will not work in many areas of Brazil.

Likewise, even though Japan is part of the EMEAA region, the [B524 in Japan](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=Japan&device=B%20Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(Europe%29%20EtherSIM) is not recommended because so many of the bands used in Japan are not supported by the EG91-E.

In the United States, LTE Cat M1 EtherSIM devices (Boron BRNR404X/BRN404, B-Series B404X/B404, Tracker T404 and ONE404, E-Series E404X/E404, Electron ELC404) are a special case. The [country details for the United States](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails&country=United%20States&device=Tracker%20T404%2FONE404%20LTE%20M1%20(NorAm%29%20EtherSIM) do not list T-Mobile as supported. The reason is that T-Mobile officially only supports LTE Cat NB1, which is different and not supported by Particle devices. However, many areas of the United States have unofficial T-Mobile LTE Cat M1 service, not advertised by T-Mobile. EtherSIM LTE Cat M1 devices will connect to T-Mobile or AT&T, whichever has a stronger signal. (Pre-2021 LTE Cat M1 devices cannot connect to T-Mobile at all with the built-in Particle SIM on those devices.)


### Third-party SIMs

Some devices, most notably the Boron, allow the use of a third-party SIM card. See [3rd-party SIM cards](/getting-started/hardware/cellular-overview/#3rd-party-sim-cards) for a full list. Third-party SIM cards are not recommended for enterprise use. Additionally, once you exceed the limits of the free plan, the price based on devices and data operations is the same whether you are using the Particle SIM or a 3rd-party SIM, so it's often not cost-effective.

There may also be issues with certification and carrier approval as described below.


### Certification

Some countries may require certification that has not been completed for all Particle devices.

For example, since the LTE Cat M1 devices are intended for use in North America only, they only have FCC (United States) and IC (Canada) certification. While they may work in limited circumstances in Europe, they have not undergone EU certification. 

The B524, T524, ONE524, etc. have all undergone EU certification as they are intended for use in Europe, however they are not certified for the US and Canada. Also they will not work, because of band compatibility.

There may also be country-specific certifications that may not have been completed, for example SK in South Korea and MIC in Japan. There are others. A full list of certifications is available on the [certifications page](/hardware/certification/certification/).

In addition to the Particle device being certified, the cellular modem may not be certified in some countries. For example, the EG91-E and EG91-EX were not certified by Quetel for use in China, because other modem models are recommended for use in China, as there are also band compatibility issues with the EG91.

### Permanent roaming

All Particle SIM devices are considered to be roaming from the local operator's point-of-view. In some countries, local carriers may ban devices that are believed to be permanently roaming. This can happen without notice and the time limit may vary.

The following countries are at risk for permanent roaming restrictions:

- Brazil
- China
- India
- Oman
- Russia
- Singapore
- Turkey
- UAE

You may be able to connect temporarily, for example doing setup of new devices to be used elsewhere. However you should not use devices regularly in these countries as the devices will likely be blocked and will then be unusable. Basic or enterprise deployments must not be made in areas with roaming restrictions.

### Carrier certification

This is mainly an issue with LTE Cat M1 devices in the United States. Both AT&T and Verizon require device manufacturers to test and obtain a certification for their devices to connect to their LTE Cat M1 networks. Particle has completed this process for AT&T, which then involves Particle uploading the IMEI numbers for all certified devices to AT&T so they will not be blocked from the network.

Since Particle SIMs do not have support for Verizon, this process has not been completed for Verizon. The requirement for carrier certification and IMEI registration still applies, however, so if you are using a Verizon SIM or a 3rd-party SIM that supports Verizon (such as Hologram) you will still be banned from the Verizon LTE Cat M1 network, typically after a few days of use.

### IMEI registration

Some countries may have a requirement to register the IMEI of mobile devices, including both mobile phones and IoT devices. For example, Turkey and Indonesia. This may be waived for roaming devices (such as Particle devices), or it may apply to all devices, depending on the country.

### LTE Cat M1 outside of the North America

In addition to the other requirements, LTE Cat M1 devices may require additional software configuration of the cellular modem.

The SARA-R410M cellular modem in the Boron LTE (BRN404) is configured for North American frequencies only. When used outside of this region, you may need to set the mobile network operator profile (AT+UMNOPROF) and/or specific band support (particularly in Europe) in order to connect. Same for the SARA-R510S in the BRN404X.

### 2G/3G Sunset 

Certain countries and carriers are phasing out 2G and 3G service. This is a particularly immediate concern in the United States, which will no longer have any 2G or 3G service after 2022. 

The section [2G and 3G sunset](/getting-started/hardware/cellular-overview/#2g-and-3g-sunset), above, has more details.

## Summary


| Device | Model | Modem | Region | 2G | 3G | LTE | Generation | SIM | Form Factor | 
| --- | :--- | :--- | --- | :---: | :---: | :---: | :---: | :---: | --- |
| Boron 2G/3G | BRN314 BRN310 | U201 | World | &check; | &check; | &nbsp; | Gen3 | Both | Feather | 
| Boron LTE (Cat M1) | BRN404X | R510 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 |  Both | Feather | 
| Boron LTE (Cat M1) | BRN404 BRN402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 |  Both | Feather | 
| B-Series SoM (LTE Cat M1) | B404X  | R510 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B-Series SoM (LTE Cat M1) | B404 B402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B-Series SoM (LTE Cat 1) | B524 | EG91-E | Europe, AU, NZ | &nbsp; | &nbsp; | Cat 1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B-Series SoM (LTE Cat 1) | B523 | EG91-E | Europe | &nbsp; | &nbsp; | Cat 1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| Tracker SoM (LTE Cat M1) | T404 T402 | BG96-MC | US, CA, MX<sup>5</sup> | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | SMD Module | 
| Tracker SoM (LTE Cat 1/2G/3G) | T524 | EG91-EX | Europe, AU, NZ | &check; | &check; | Cat 1 | Gen3 | MFF2<sup>1</sup> | SMD Module |
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | EG91-EX | Europe | &check; | &check; | Cat 1 | Gen3 | MFF2<sup>1</sup> | SMD Module |
| Electron 2G | E350 | G350 | World| &check; | &nbsp; | &nbsp; | Gen2 | Card | Pins | 
| Electron 3G | E260 | U260 | Americas| &check; | &check; | &nbsp; | Gen2 | Card |Pins | 
| Electron 3G | E270 | U270 | Europe, Asia, Africa | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron Global | ELC314 | U201 | World | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron LTE (Cat M1) | ELC404 ELC402 | R410 | US, CA, MX | &nbsp; | &nbsp; | Cat M1  | Gen2 | MFF2<sup>1</sup> | Pins  | 
| E-Series 2G/3G | E310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | MFF2<sup>1</sup> | SMD Module | 
| E-Series LTE (Cat M1) | E404X | R510 | US, CA, MX |  &nbsp; | &nbsp; | Cat M1 | Gen2 | MFF2<sup>1</sup> | SMD Module | 
| E-Series LTE (Cat M1) | E404 E402 | R410 | US, CA, MX |  &nbsp; | &nbsp; | Cat M1 | Gen2 | MFF2<sup>1</sup> | SMD Module | 

<sup>1</sup> MFF2 SMD Particle SIM card. It's soldered to the board and is not reprogrammable.
