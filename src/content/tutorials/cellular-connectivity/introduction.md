---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
---

# Introduction to Cellular Devices

Particle has a wide variety of cellular devices to suit many applications. There's a handy table at the end to help you device what's the best device for your application, but some explanation is in order first as there are a number of decisions to make!


## Form Factor

### Boron

![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

### B Series SoM

![B Series](/assets/images/b-series/b-series-top.png)

The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

One of the benefits is that many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

| Feature | Boron | B Series SoM | SoM Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |
| MFF2 SMD Particle SIM | &check; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional |

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.


### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is the 2nd-generation cellular device in a prototyping form factor. It is designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board.


![Electron Breadboard](/assets/images/phototransistor-electron.jpg)

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

## Cellular Carriers

The Particle SIM supports many carriers around the world. The [list of mobile carriers](/tutorials/cellular-connectivity/cellular-carriers/) is the complete list, however it's important to note that there are three different Particle SIM cards that support a different set of carriers:

- Electron 2G, Electron 3G, and E Series 2G/3G (E310)
- Boron 2G/3G
- LTE Cat M1 (Boron LTE, B Series LTE, E Series LTE, and Electron LTE)


### SIM cards

There are two different kinds of SIM cards, depending on the device.

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 


| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN310 | &check; | &check; |
| Boron LTE | BRN402 | &check; | &check; |
| B Series LTE Cat M1 SoM | B402 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC310 | &check; | &nbsp; |
| Electron LTE Cat M1 | ELC402 | &nbsp; | &check; |
| E Series 2G/3G | E310 | &nbsp; | &check; |
| E Series LTE Cat M1 | E402 | &nbsp; | &check; |


### Roaming

Non-LTE Particle SIM cards support world-wide roaming. However there may be limitations based on the radio on the device.

| Device | Model | Roaming | Bands |
| --- | :--- |  --- | --- |
| Boron 2G/3G | BRN310 | World | 850, 900, 1800, 1900, 2100 |
| Boron LTE | BRN402 | US, Canada, Mexico<sup>1</sup> | LTE<sup>6</sup> |
| B Series LTE Cat M1 SoM | B402 | US, Canada, Mexico<sup>5</sup>  | LTE<sup>6</sup> |
| Electron 2G | G350 | | World<sup>2</sup> | 850, 900, 1800, 1900 |
| Electron 3G | U260 | Americas, Australia, New Zealand<sup>3</sup> | 850, 1900 |
| Electron 3G | U270 | Europe, Asia, Africa<sup>4</sup> | 900, 1800, 2100 |
| Electron Global | ELC310 | World | 850, 900, 1800, 1900, 2100 |
| Electron LTE Cat M1 | ELC402 | US, Canada, Mexico<sup>5</sup>  | LTE<sup>6</sup> |
| E Series 2G/3G | E310 | World | 850, 900, 1800, 1900, 2100 |
| E Series LTE Cat M1 | E402 | US, Canada, Mexico<sup>5</sup>  | LTE<sup>6</sup> |

<sup>1</sup>The Boron LTE can be used with a 3rd-party SIM card in areas outside of the United States, Canada, and Mexico at this time. This is not officially supported, but has been known to work.

<sup>2</sup>The Electron 2G cannot be used in locations that no longer have 2G service. Some countries include: Australia, Japan, Korea, Singapore, and Taiwan. In the United States, 2G services is only available on T-Mobile, and only through the end of 2020. In some other countries, including Switzerland and New Zealand, the Electron 2G can only be used with a 3rd-party SIM card, not with the included Particle SIM card. 

<sup>3</sup>The U260 model supports 850/1900 MHz for both 3G (UMTS/HSPA) and 2G (GPRS/EDGE). These are the frequencies typically used in the Americas, but there are exceptions. 

For example, in Australia, we recommend the U260 because the carrier used by the Particle SIM, Telstra uses 850 MHz. However, if you are using a 3rd-party SIM from Optus, you'll need the U270 because Optus uses 900/2100 MHz.

In New Zealand, we previously recommended the U270 as Two Degrees was the carrier. We've switched to Spark, however, which uses 850 MHz and thus the U260 is now recommended for New Zealand, like Australia. If you've purchased a U270 for use in New Zealand and are stuck at blinking green (connecting to cellular), technical support can switch your SIM back to Two Degrees so you can use the U270.

In Uruguay, the carrier used by the Particle SIM, Movistar, uses 1900 MHz so the U260 Americas model is the correct one. If you're using an Ancel 3rd-party SIM, however, that uses 2100 MHz you you'll nee the U270 model, instead.

<sup>4</sup>The U270 model supports 900/2100 MHz for 3G (UMTS/HSPA) and 900/1800 MHz for 2G (GPRS/EDGE). It is typically used in Europe, Asia, and Africa. It is used by some carriers in South America (with a 3rd-party SIM card).

<sup>5</sup>The B Series LTE, E Series LTE, and Electron LTE cannot be used outside of the United States, Canada, and Mexico at this time. 

<sup>6</sup>The u-blox SARA-R410M-02B modem supports the following LTE cellular bands:


| Parameter | Value |
| --- | --- |
| LTE FDD Bands | Band 12 (700 MHz) |
| | Band 17 (700 MHz)  |
| | Band 28 (700 MHz)  |
| | Band 13 (750 MHz)  |
| | Band 20 (800 MHz)  |
| | Band 26 (850 MHz)  |
| | Band 18 (850 MHz)  |
| | Band 5 (850 MHz) |
| | Band 19 (850 MHz)  |
| | Band 8 (900 MHz)  |
| | Band 4 (1700 MHz) |
| | Band 3 (1800 MHz)  |
| | Band 2 (1900 MHz) |
| | Band 25 (1900 MHz)  |
| | Band 1 (2100 MHz)  |
| LTE TDD bands | Band 39 (1900 MHz) | 



### 3rd-party SIM cards

Some Particle devices support [3rd-party SIM cards](https://docs.particle.io/support/particle-devices-faq/electron-3rdparty-sims/). These can provide service in locations where the Particle SIM is not supported, for example.

| Device | Model | 3rd-party SIM supported |
| --- | :--- | :---: |
| Boron 2G/3G | BRN310 | &check; |
| Boron LTE | BRN402 | &check; |
| B Series LTE Cat M1 SoM | B402 | &nbsp; |
| Electron 2G | G350 | &check; |
| Electron 3G Americas | U260 | &check; |
| Electron 3G Europe/Asia/Africa | U270 |  &check; |
| Electron Global | ELC310 | &check; |
| Electron LTE Cat M1 | ELC402 |&nbsp; |
| E Series 2G/3G | E310 | &nbsp; |
| E Series LTE Cat M1 | E402 | &nbsp; |

There are limitations on using 3rd-party SIM cards in large product deployments. If you think you will need to use a 3rd-party SIM you should [contact sales](https://particle.io/sales/) for additional information.

## 4G LTE

There are three main varieties of LTE service:

- LTE Cat 1 is what's used by your mobile phone. It's different than the IoT variations supported by Particle devices.
- LTE Cat M1 is a version of LTE that is used for relatively low data rate, low-cost, and low-power applications. Particle LTE devices support LTE Cat M1. 
- LTE Cat NB1 is a different low-cost and low-power version of LTE, with even lower data rates. While Particle LTE device hardware can support NB1, it is not officially supported at this time.

At this time, Particle is unable to provide worldwide roaming for LTE devices using the Particle SIM and they can only be used in the United States. 

### LTE Cat M1

In the United States, Particle devices use LTE Cat M1 on the AT&T network. 

In all locations that AT&T supports LTE on their own network (not roaming), LTE Cat M1 should also be supported. Note that this does not include 4G areas, which on the AT&T network are HSPA+, not actually LTE.


## 2G and 3G Sunset

Carriers around the world periodically shut down older networks to reallocate the frequencies and tower space to new technologies like LTE and 5G.

The list below is not complete; you should check with the carrier in your area to be sure of sunset, decommissioning, or shutdown dates.


### United States

AT&T deactivated their 2G network at the end of 2016. Electron 2G devices can only use T-Mobile at this time.

AT&T's 3G shutdown should occur in [early 2022](https://www.att.com/esupport/article.html#!/wireless/KM1324171?gsi=0pwb92). After this occurs, the Electron U260 and E Series E310 will only connect to T-Mobile in the United States.

T-Mobile will begin to reallocate 3G spectrum in March 2020 so there could be reduced coverage. T-Mobile will deactivate their 2G network at the end of 2020.

The Boron 2G/3G only connects to T-Mobile in the United States already (it cannot connect to AT&T using the built-in MFF2 Particle SIM).

In the United States we strongly recommend using LTE Cat M1. AT&T has committed to supporting the LTE network at least through the end of 2027.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G | LTE |
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
| Boron LTE | BRN402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | M1 | Gen3 |  Both | Feather | 
| B Series Cat M1 SoM | B402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | M1 | Gen3 | MFF2<sup>1</sup> | M.2 SoM | 
| Electron 2G | E350 | G350 | World| &check; | &nbsp; | &nbsp; | Gen2 | Card | Pins | 
| Electron 3G | E260 | U260 | Americas| &check; | &check; | &nbsp; | Gen2 | Card |Pins | 
| Electron 3G | E270 | U270 | Europe, Asia, Africa | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron Global | ELC310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | Card | Pins | 
| Electron LTE Cat M1 | ELC402 | R410 | US, Canada, Mexico | &nbsp; | &nbsp; | M1  | Gen2 | MFF2<sup>1</sup> | Pins  | 
| E Series 2G/3G | E310 | U201 | World | &check; | &check; | &nbsp; | Gen2 | MFF2<sup>1</sup> | SMD Module | 
| E Series LTE Cat M1 | E402 | R410 | World |  &nbsp; | &nbsp; | M1 | Gen2 | MFF2<sup>1</sup> | SMD Module | 

<sup>1</sup> MFF2 SMD Particle SIM card. It's soldered to the board and is not reprogrammable.