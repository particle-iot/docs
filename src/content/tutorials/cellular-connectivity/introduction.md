---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
description: Introduction to Particle cellular devices and cellular standards
---

# Introduction to Cellular Devices

Particle has a wide variety of cellular devices to suit many applications. There's a handy table at the end to help you device what's the best device for your application, but some explanation is in order first as there are a number of decisions to make!


## Form Factor

### Boron

![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

| Device | Model | Region |
| --- | :---: | :--- |
| Boron 2G/3G | BRN310 | Worldwide |
| Boron LTE (Cat M1) | BRN402 | United States, Canada, and Mexico |


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

| Device | Model | Region |
| --- | :---: | :--- |
| B Series B402 SoM (LTE Cat M1) | B402 | United States, Canada, and Mexico |
| B Series B523 SoM (LTE Cat 1) | B523 | Europe |

### Tracker SoM

![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Hardware watchdog

| Device | Model | Region | 
| --- | :---: | :--- |
| Tracker SoM 502 (LTE Cat M1) | T402 | North America |
| Tracker SoM 523 SoM (LTE Cat 1 with 2G/3G fallback) | T523 | EMEAA |


### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is the 2nd-generation cellular device in a prototyping form factor. It is designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board.


![Electron Breadboard](/assets/images/phototransistor-electron.jpg)


| Device | Model | Region |
| --- | :---: | :--- |
| Electron 2G | G350 | Worldwide |
| Electron 3G Americas | U260 | Americas, Australia, New Zealand |
| Electron 3G Europe/Asia/Africa | U270 |  Europe, Asia, and Africa |
| Electron Global | ELC310 | Worldwide |
| Electron LTE (Cat M1) | ELC402 | United States, Canada, Mexico |

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



| Device | Model | Region |
| --- | :---: | :--- |
| E Series 2G/3G | E310 | Worldwide |
| E Series LTE (Cat M1) | E402 | United States, Canada, and Mexico |

## Cellular Carriers

The Particle SIM supports many carriers around the world. The [list of mobile carriers](/tutorials/cellular-connectivity/cellular-carriers/) is the complete list, however it's important to note that there are  different Particle SIM cards that support a different set of carriers:

- Electron 2G, Electron 3G, and E Series 2G/3G (E310)
- Boron 2G/3G
- B Series B523 (LTE Cat 1 Europe)
- LTE Cat M1 (Boron LTE, B Series B402, E Series LTE, and Electron LTE)


### SIM cards

There are two different kinds of SIM cards, depending on the device.

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 


| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN310 | &check; | &check; |
| Boron LTE  | BRN402 | &check; | &check; |
| B Series B402 SoM (Cat M1) | B402 | &nbsp; | &check; |
| B Series B523 SoM (Cat 1) | B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T523 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC310 | &check; | &nbsp; |
| Electron LTE (Cat M1) | ELC402 | &nbsp; | &check; |
| E Series 2G/3G | E310 | &nbsp; | &check; |
| E Series LTE (Cat M1) | E402 | &nbsp; | &check; |


### Roaming

Non-LTE Particle SIM cards support world-wide roaming. However there may be limitations based on the radio on the device.

| Device | Model | Roaming | LTE | 3G | 2G | Bands |
| --- | :--- |  --- | --- | --- | --- | --- |
| Boron 2G/3G | BRN310 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Boron LTE (Cat M1) | BRN402 | US, Canada, Mexico<sup>1</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B Series B402 SoM (LTE Cat M1) | B402 | US, Canada, Mexico<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| B Series B523 SoM (LTE Cat 1) | B523 | Europe | Cat 1 | &check; |&check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Tracker SoM (LTE Cat M1) | T402 | US, Canada, Mexico<sup>5</sup> | Cat M1 | &nbsp; | &nbsp; | LTE Cat M1<sup>6</sup> |
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | Europe | Cat 1 | &check; | &check; | 700, 800, 900, 1800, 2100, 2600<sup>7</sup> |
| Electron 2G | G350 | World<sup>2</sup> | | | &check; | 850, 900, 1800, 1900 |
| Electron 3G | U260 | Americas, Australia, New Zealand<sup>3</sup> | | &check; | &check; | 850, 1900 |
| Electron 3G | U270 | Europe, Asia, Africa<sup>4</sup> | | &check; | &check; | 900, 1800, 2100 |
| Electron Global | ELC310 | World | | &check; | &check; | 850, 900, 1800, 1900, 2100 |
| Electron LTE (Cat M1) | ELC402 | US, Canada, Mexico<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |
| E Series 2G/3G | E310 | World | | &check; | &check;| 850, 900, 1800, 1900, 2100 |
| E Series LTE (Cat M1) | E402 | US, Canada, Mexico<sup>5</sup> | Cat M1 | | | LTE Cat M1<sup>6</sup> |


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
| Boron 2G/3G | BRN310 | &check; |
| Boron LTE (Cat M1) | BRN402 | &check; |
| B Series B402 SoM (LTE Cat M1) | B402 | &nbsp; |
| B Series B523 SoM (LTE Cat 1) | B523 | &nbsp; |
| Tracker SoM (LTE Cat M1 and 2G) | T402 | &nbsp; | 
| Tracker SoM (LTE Cat 1 and 2G/3G) | T523 | &nbsp; | 
| Electron 2G | G350 | &check; |
| Electron 3G Americas | U260 | &check; |
| Electron 3G Europe/Asia/Africa | U270 |  &check; |
| Electron Global | ELC310 | &check; |
| Electron LTE (Cat M1) | ELC402 |&nbsp; |
| E Series 2G/3G | E310 | &nbsp; |
| E Series LTE (Cat M1) | E402 | &nbsp; |

There are limitations on using 3rd-party SIM cards in large product deployments. If you think you will need to use a 3rd-party SIM you should [contact sales](https://particle.io/sales/) for additional information.

## 4G LTE

There are three main varieties of LTE service:

- LTE Cat 1 is what's used by your mobile phone, and the B Series B523 SoM. It's different than the IoT variation (LTE Cat M1).
- LTE Cat M1 is a version of LTE that is used for relatively low data rate, low-cost, and low-power applications. Particle LTE devices like the Boron LTE, E Series LTE (E402), Electron LTE (ELC402), and B Series B402 SoM, support LTE Cat M1. 
- LTE Cat NB1 is a different low-cost and low-power version of LTE, with even lower data rates. While Particle LTE device hardware can support NB1, it is not officially supported at this time.

At this time, Particle is unable to provide worldwide roaming for LTE Cat M1 devices using the Particle SIM and they can only be used in the United States, Canada, and Mexico.

LTE Cat 1 provides greater compatibility with carriers, but is a more expensive module and uses more power. 

B Series B523 SoM is LTE Cat 1 with 2G/3G fallback, and is only compatible with European networks at this time. The Quectel EG91-E module on this device also supports 3G and 2G fallback. Note that the EG91-E is too large to fit in the Boron (Adafruit Feather), Electron, or E Series module, so it will only be available in the M.2 SoM form-factor.

The Tracker SoM T523 is also LTE Cat 1 with 2G/3G fallback, with a Quectel EG91-EX module, and will support the EMEAA region when released.

### LTE Cat M1

The following devices use LTE Cat M1:

| Device | Model | 
| --- | :--- | 
| Boron LTE (Cat M1) | BRN402 |
| B Series B402 SoM (LTE Cat M1) | B402 |
| Electron LTE (Cat M1) | ELC402 |
| E Series LTE (Cat M1) | E402 | 


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
| B Series B523 SoM (LTE Cat 1 with 2G/3G fallback) | B523 | EG91-E | Europe |
| Tracker SoM (LTE Cat 1 with 2G/3G fallback) | T523 | EG91-EX | EMEAA |

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


## 2G and 3G Sunset

Carriers around the world periodically shut down older networks to reallocate the frequencies and tower space to new technologies like LTE and 5G.

The list below is not complete; you should check with the carrier in your area to be sure of sunset, decommissioning, or shutdown dates.


### United States

AT&T deactivated their 2G network at the end of 2016. Electron 2G devices can only use T-Mobile at this time.

AT&T's 3G shutdown should occur in [early 2022](https://www.att.com/esupport/article.html#!/wireless/KM1324171?gsi=0pwb92). After this occurs, the Electron U260 and E Series E310 will only connect to T-Mobile in the United States.

T-Mobile will begin to reallocate 3G spectrum in March 2020 so there could be reduced coverage. T-Mobile will deactivate their 2G network at the end of 2020.

The Boron 2G/3G only connects to T-Mobile in the United States already (it cannot connect to AT&T using the built-in MFF2 Particle SIM).

In the United States we strongly recommend using LTE Cat M1. AT&T has committed to supporting the LTE network at least through the end of 2027.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G | LTE Cat M1 |
| --- | --- | :--: | :--: | :--: | :--: | :---: |
| End of 2016 | AT&T ended 2G service | T-Mobile | Both | Both | T-Mobile | AT&T |
| End of 2020 | T-Mobile ends 2G service | &nbsp; | T-Mobile | T-Mobile | T-Mobile |  AT&T |
| Early 2022 | AT&T ends 3G service | T-Mobile | T-Mobile | T-Mobile | T-Mobile |  AT&T |


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


### Canada

The Electron and E Series use Rogers in Canada:

- 2G service on Rogers will end at the end of 2020. The Electron 2G will no longer operate after that date with the Particle SIM card. Since Bell Mobility and Tellus also will have decommissioned their 2G networks by then, there are few alternatives for 2G service in Canada.
- 3G service on Rogers will end at the end of 2025.

The Boron 2G/3G uses Telus in Canada:

- 2G services on Telus has already ended.
- 3G service on Telus will end at the end of 2025.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G
| --- | --- | :--: | :--: | :--: | :--: |
| End of 2020 | Rogers ends 2G service | &nbsp;| &check; | &check; | &check; |
| End of 2025 | Rogers and Telus end 3G service | &nbsp; | &nbsp; | &nbsp; | &nbsp; | 

### Limited 2G

These countries cannot use 2G (Electron 2G) with the included Particle SIM card. They can only use a 3rd-party SIM card:

- New Zealand
- Switzerland

These countries have a scheduled end to 2G service when using the Particle SIM card:

| Country | 2G End Date | 
| --- | :---: |
| Canada | End of 2020 |
| United States | End of 2020 |


### No 2G

These countries cannot use the Electron 2G at all:

- Australia 
- Japan
- Korea
- Singapore
- Taiwan


## Summary


| Device | Model | Modem | Region | 2G | 3G | LTE | Generation | SIM | Form Factor | 
| --- | :--- | :--- | --- | :---: | :---: | :---: | :---: | :---: | --- |
| Boron 2G/3G | BRN310 | U201 | World | &check; | &check; | &nbsp; | Gen3 | Both | Feather | 
| Boron LTE (Cat M1) | BRN402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | Cat M1 | Gen3 |  Both | Feather | 
| B Series SoM (LTE Cat M1) | B402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| B Series SoM (LTE Cat 1) | B523 | EG91-E | Europe | &nbsp; | &nbsp; | Cat 1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| Tracker SoM (LTE Cat M1) | T402 | BG96-MC | US, Canada, Mexico<sup>5</sup> | &nbsp; | &nbsp; | Cat M1 | Gen3 | MFF2<sup>1</sup> | SMD Module | 
| Tracker SoM (LTE Cat 1/2G/3G) | T523 | EG91-EX | EMEAA | &check; | &check; | Cat 1 | Gen3 | MFF2<sup>1</sup> | SMD Module |
| Electron 2G | E350 | G350 | World| &check; | &nbsp; | &nbsp; | Gen2 | Card | Pins | 
| Electron 3G | E260 | U260 | Americas| &check; | &check; | &nbsp; | Gen2 | Card |Pins | 
| Electron 3G | E270 | U270 | Europe, Asia, Africa | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron Global | ELC310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron LTE (Cat M1) | ELC402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | Cat M1  | Gen2 | MFF2<sup>1</sup> | Pins  | 
| E Series 2G/3G | E310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | MFF2<sup>1</sup> | SMD Module | 
| E Series LTE (Cat M1) | E402 | R410 | World |  &nbsp; | &nbsp; | Cat M1 | Gen2 | MFF2<sup>1</sup> | SMD Module | 

<sup>1</sup> MFF2 SMD Particle SIM card. It's soldered to the board and is not reprogrammable.
