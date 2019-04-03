---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
---

# Introduction to Cellular

## Devices

Particle has a wide variety of devices to suit many applications!

| Device | Region | 2G | 3G | LTE | Form Factor | 
| --- | --- | :---: | :---: | :---: | --- |
| Boron 2G/3G | World<sup>1</sup> | &check; | &check; | &nbsp; | Feather | 
| Boron LTE | US<sup>2</sup> | &nbsp; | &nbsp; | M1 | Feather | 
| B402 SoM | US<sup>3</sup> | &nbsp; | &nbsp; | M1 | M.2 SoM | 
| Electron 2G (G350) | World<sup>4</sup> | &check; | &nbsp; | &nbsp; | Pins | 
| Electron 3G (U260) | Americas<sup>5</sup> | &check; | &check; | &nbsp; | Pins | 
| Electron 3G (U270) | Europe, Asia, Africa<sup>6</sup> | &check; | &check; | &nbsp; | Pins | 
| Electron Global (U201) | World<sup>7</sup> | &check; | &check; | &nbsp; | Pins | 
| Electron LTE (E402) | US<sup>8</sup> | &nbsp; | &nbsp; | M1  | Pins  | 
| E Series 2G/3G (E310) | World<sup>9</sup> | &check; | &check; | &nbsp; | SMD Module | 
| E Series LTE (E402) | World<sup>10</sup> |  &nbsp; | &nbsp; | M1 | SMD Module | 

### I'm building a new product

If you building a new product you should design around the Boron or B Series SoM. This 3rd-generation line of products is based on a newer processor architecture.


While we have no immediately places to cease production of existing Electron and E Series boards, it's still best to concentrate on the newer devices.

### What are prototyping devices?

Prototyping devices are available in single quantities and have male pins on the bottom that can be plugged into a solderless breadboard (included with kits). They are ideal for one-of-a-kind designs, tinkering, and prototyping.

Additionally, the Boron uses the Adafruit Feather form-factor, allowing it to use a wide variety of Adafruit FeatherWing displays, sensors, and expansion boards.

Prototyping devices include:

| Device | Description | 
| --- | --- |
| Boron | Gen 3 prototyping device. Recommended for new designs. |
| Electron | Gen 2 prototyping device. |

You can still use these devices for small-scale or large-scale production. They can be inserted into a socket on your custom circuit board, and can be purchased in tray quantities.

### What are production devices?

Mass-production devices are intended to be used as scale, and only with a custom circuit board for your product.

Prototyping devices include:

| Device | Description | 
| --- | --- |
| B Series SoM | Gen 3 module fits into M.2 NGFF connector |
| E Series | Gen 2 SMD module soldered to your board |




## Cellular Carriers

The Particle SIM supports many carriers around the world. The [list of carriers](/tutorials/cellular-connectivity/cellular-carriers/) is the complete list, however it's important to note that there are three different Particle SIM cards that support a different set of carriers:

- Electron and E Series
- Boron 2G/3G
- Boron LTE, B Series LTE, E Series LTE, and Electron LTE 


### SIM cards

There are two different kinds of SIM cards, depending on the device.

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 


| Device | Nano SIM Card | MFF2 SMD SIM | 
| --- | :---: | :---: | 
| Boron 2G/3G | &check; | &check; |
| Boron LTE | &check; | &check; |
| B402 LTE SoM | <sup>1</sup> | &check; |
| Electron 2G (G350) | &check; | &nbsp; |
| Electron 3G (U260) | &check; | &nbsp; |
| Electron 3G (U270) |  &check; | &nbsp; |
| Electron Global (U201) | &check; | &nbsp; |
| Electron LTE (E402) | &nbsp; | &check; |
| E Series 2G/3G (E310) | &nbsp; | &check; |
| E Series LTE (E402) | &nbsp; | &check; |

<sup>1</sup>The B402 SoM includes a MFF2 embedded SIM card on the SoM. It is possible to order it without the SIM and put your own SIM or SIM card card holder on your base board. Minimum order quantities apply.


### Roaming

Most Particle SIM cards support world-wide roaming. However there may be limitations based on the radio on the device.

| Device | Roaming |
| --- |  --- | 
| Boron 2G/3G | World | 
| Boron LTE | US<sup>1</sup> |
| B402 LTE SoM | US |
| Electron 2G (G350) | World<sup>2</sup> |
| Electron 3G (U260) | Americas, Australia |
| Electron 3G (U270) | Europe, Asia, Africa |
| Electron Global (U201) | World |
| Electron LTE (E402) | US |
| E Series 2G/3G (E310) | World |
| E Series LTE (E402) | US |

<sup>1</sup>The Boron LTE can be used with a 3rd-party SIM card in areas outside of the United States. This is not officially supported, but has been known to work.

<sup>2</sup>The Electron 2G cannot be used in locations that no longer have 2G service. Some countries include: Australia, Japan, Korea, and Singapore. In the United States, 2G services is only available on T-Mobile, and only through the end of xxx.


### 3rd-party SIM cards


| Device | 3rd-party SIM supported |
| --- | :---: |
| Boron 2G/3G | &check; |
| Boron LTE | &check; |
| Electron 2G (G350) | &check; |
| Electron 3G (U260) | &check; |
| Electron 3G (U270) |  &check; |
| Electron Global (U201) | &check; |


## 4G LTE

There are three main varieties of LTE service:

- LTE Cat 1 is what's used by your mobile phone. It's different than the IoT variations supported by Particle devices.
- LTE Cat M1 is a version of LTE that is used for relatively low data rate, low-cost, and low-power applications. The Particle LTE devices support LTE Cat M1. 
- LTE Cat NB1 is a different low-cost and low-power version of LTE, with even lower data rates. While Particle LTE device hardware can support NB1, it is not officially supported at this time.


### LTE Cat M1

In the United States, Particle devices use LTE Cat M1 on the AT&T network. 

In all locations that AT&T supports LTE on their own network (not roaming), LTE Cat M1 should also be supported. 


## 2G and 3G Sunset

Carriers around the world periodically shut down older networks to reallocate the frequencies and tower space to new technologies like LTE and 5G.

The list below is not complete; you should check with the carrier in your area to be sure of sunset, decommissioning, or shutdown dates.

### In the United States

AT&T already deactivated their 2G network at the end of 2016. Electron 2G devices can only use T-Mobile at this time.

AT&T's 3G shutdown should occur at the end of 2019. After 2019, the Electron U260 and E Series E310 will only connect to T-Mobile in the United States.

T-Mobile will begin to reallocate 3G spectrum in March 2020 so there could be reduced coverage. T-Mobile will deactivate their 2G network at the end of 2020.

The Boron 2G/3G only connects to T-Mobile in the United States already (it cannot connect to AT&T using the built-in MFF2 Particle SIM).

In the United States we strongly recommend using LTE Cat M1. AT&T has committed to supporting the LTE network at least through the end of 2027.

| After | Event | Electron 2G | Electron 3G | E Series 2G/3G | Boron 2G/3G
| --- | --- | :--: | :--: | :--: | :--: |
| End of 2016 | AT&T ended 2G service | T-Mobile | Both | Both | T-Mobile |
| End of 2019 | AT&T ends 3G service | T-Mobile | T-Mobile | T-Mobile | T-Mobile | 
| End of 2020 | T-Mobile ends 2G service | &nbsp; | T-Mobile | T-Mobile | T-Mobile | 




### In Europe

In some European countries, they're phasing out 3G and instead keeping 2G, 4G, and LTE networks. All of the Particle 3G cellular devices can also connect to 2G networks, so compatibility will be maintained.

### In Australia

In Australia, there is no longer 2G service on any carrier and the Electron 2G cannot be used.

The Electron and E Series use Telstra in Australia. They intend to shut down their 3G network at [the end of 2020](https://www.arnnet.com.au/article/610472/telstra-flags-3g-network-shutdown-early-2020/). At that point, the Electron can only be used with a 3rd-party SIM card and the E Series will no longer work.

The Boron 2G/3G uses Vodafone in Australia. They have not announced a 3G shutdown date.

### In Canada

The Electron and E Series use Rogers in Canada:

- 2G service on Rogers will end at the end of 2020. The Electron 2G will no longer operate after that date with the Particle SIM card. Since Bell Mobility and Tellus also will have decommissioned their 2G networks by then, there are few alternatives for 2G service in Canada.
- 3G service on Rogers will end at the end of 2025.

The Boron 2G/3G uses Telus in Canada:

- 2G services on Telus has already ended.
- 3G service on Telus will end at the end of 2025.


### Countries that no longer have 2G

- Australia 
- Japan
- Korea
- Singapore
- Taiwan


| Device |
| --- |  
| Boron 2G/3G | 
| Boron LTE | 
| B402 LTE SoM | 
| Electron 2G (G350) | 
| Electron 3G (U260) | 
| Electron 3G (U270) |  
| Electron Global (U201) | 
| Electron LTE (E402) |
| E Series 2G/3G (E310) | 
| E Series LTE (E402) |
