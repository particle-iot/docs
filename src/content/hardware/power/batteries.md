---
title: Batteries
shared: true
columns: two
layout: commonTwo.hbs
description: Learn more about the Li-Po (lithium ion polymer) battery on some Particle IoT devices
---

# Batteries

[Designing on Particle](/getting-started/getting-started/#designing-on-particle-videos) is a series of video tutorials that center best practices across the Particle platform. 
This video covers best-practices for battery powered devices including using sleep modes, power management (PMIC) and fuel gauge chip use, and using watchdog timers as a fail-safe.

{{youtube "https://www.youtube.com/embed/gyUrgB_wSu0"}}

A number of Particle devices can use a [Lithium Ion Polymer battery](https://en.wikipedia.org/wiki/Lithium_polymer_battery) (LiPo):

- Argon (Gen 3 Wi-Fi)
- Boron (Gen 3 Cellular)
- Xenon (Gen 3 Mesh) (discontinued)
- B-Series SoM (Gen 3 Cellular, if you include the connector on your board)
- Electron (Gen 2 Cellular)
- E-Series (Gen 2 Cellular, if you include the connector on your board)
- Photon Power Shield (adapter for Gen 2 Wi-Fi Photon) (discontinued)

The Particle 1,800mAh lithium-polymer (Li-Po) battery is compliant with all international safety and transportation standards.

**Model Number**: ZN-103450  
**Ratings**: 3.7V DC, 1,800mAh, 7.4Wh  
**Manufacturer**: ZHAONENG BATTERY INDUSTRIAL CO., LTD. (Shenzhen, China)  
**Test Reports**: 
- [IEC62133](/assets/pdfs/new-certs/battery/zn-103450-iec621331.pdf)
- [Material Safety Data Sheet, MSDS](/assets/pdfs/ZN-103450-MSDS.pdf)

![Particle Battery](/assets/images/battery/particle-battery.jpg)

- JST-PH 2-position 2mm connector 
- 3.7V (nominal)
- With internal protection over/under current protection 
- Does not include a thermal sensor

Adafruit sells larger (and smaller) 3.7V LiPo batteries that are compatible with the Particle devices. They have a matching JST-PH connector wired the same way as Particle device.

- [1200 mAh $9.95](https://www.adafruit.com/product/258)
- [2000 mAh $ 12.50](https://www.adafruit.com/product/2011)
- [2200 mAh cylinderical $9.95](https://www.adafruit.com/product/1781)
- [2500 mAh $ 14.95](https://www.adafruit.com/product/328)
- [4400 mAh $19.95](https://www.adafruit.com/product/354)
- [6600 mAh $29.50](https://www.adafruit.com/product/353)

Sparkfun does as well.

- [2000 mAh $12.95](https://www.sparkfun.com/products/13855)
- [6000 mAh $29.95](https://www.sparkfun.com/products/13856)

We recommend those two sources because they are known to carry good quality batteries and the JST-PH connector is wired the same as Particle batteries. 

Unfortunately there is no standard for polarity, and a large number of batteries you find on Amazon, eBay, and AliExpress will be wired reverse polarity.

Particle devices must use batteries wired like this: With the key facing down and the wires toward you, the red is on the right.

![Close-Up](/assets/images/battery/close-up.jpg)

We do not recommend wiring multiple batteries in parallel. The Fuel Gauge (battery monitor) is only designed for a single cell, and in the case of failure of one battery, excess current can flow into the defective battery, causing damage or even fire. 

### 2-pin vs. 3-pin

Some devices including the M.2 breakout board and Muon include a 3-pin JST-PH connector. The battery pack includes an integrated 10K NTC thermistor which prevents charging when the battery temperature is too low or too high.

Some devices include the Tracker One and Monitor One also control charging, but do so in software using a temperature sensor in the enclosure
instead of using a battery pack temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" alt="Battery connector" class="small"/></div>

<p class="attribution">Looking at the exposed end of the connector attached to the battery</p>


{{!-- BEGIN do not edit content below, it is automatically generated 993e47b6-c085-45bf-908b-238bb6c323b8 --}}

| SKU | Description | USB connector | Battery Connector | Lifecycle |
| :--- | :--- | :---: | :---: | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | micro-b | 2-pin | Deprecated |
| ARG-LDKT | Argon Leak Detection Kit [x1] | micro-b | 2-pin | Deprecated |
| ARG-STRTKT | Argon Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [ARGN-H](/reference/datasheets/wi-fi/argon-datasheet/) | Argon [x1] | micro-b | 2-pin | Deprecated |
| [ARGNKIT](/reference/datasheets/wi-fi/argon-datasheet/) | Argon, Starter Kit  [x1] | micro-b | 2-pin | Deprecated |
| [ARGNTRAY50](/reference/datasheets/wi-fi/argon-datasheet/) | Argon, Tray [x50] | micro-b | 2-pin | Deprecated |
| ASSET2GV2 | Asset Tracker 2G | micro-b | 2-pin | Deprecated |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | micro-b | 2-pin | Deprecated |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | micro-b | 2-pin | Deprecated |
| [B402MEA](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE CAT-M1 (NorAm), [x1] | &nbsp; | 2-pin | Deprecated |
| [B402MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE CAT-M1 (NorAm), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [B404MEA](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | Deprecated |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | &nbsp; | 2-pin | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | &nbsp; | 2-pin | GA |
| [B504MEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | Deprecated |
| [B504MTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | &nbsp; | 2-pin | Deprecated |
| [B523MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe) [x1] | &nbsp; | 2-pin | Deprecated |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | &nbsp; | 2-pin | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | &nbsp; | 2-pin | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [BRN310KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN310TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN314KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN314TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN402](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN402KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | NRND |
| [BRN404](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| [BRN404KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [BRN404TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN404X](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | GA |
| [BRN404XKIT](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | micro-b | 2-pin | GA |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | GA |
| [E260KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [E260TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus), Tray [x50] | micro-b | 2-pin | Deprecated |
| [E270KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [E270TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA), Tray [x50] | micro-b | 2-pin | NRND |
| [E310KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E310MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), [x1] | &nbsp; | 2-pin | Deprecated |
| [E310TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [E313EA](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), [x1] | &nbsp; | 2-pin | Deprecated |
| [E313TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), Tray [x50] | &nbsp; | 2-pin | End of life |
| [E314KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E314MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), [x1] | &nbsp; | 2-pin | Deprecated |
| [E314TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), Tray [x50] | &nbsp; | 2-pin | NRND |
| [E350KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G Kit (Global) | micro-b | 2-pin | Deprecated |
| [E350TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [E402KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E402MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), [x1] | &nbsp; | 2-pin | Deprecated |
| [E402TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), Tray [x50] | &nbsp; | 2-pin | NRND |
| [E404KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E404MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | NRND |
| [E404TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [E404XTRAY50](/reference/datasheets/e-series/e404x-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [ELC314TY](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Global - U201) , Tray [x50] | micro-b | 2-pin | NRND |
| [ELC402EA](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| [ELC402TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | Deprecated |
| [ELC404TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | micro-b | 2-pin | Deprecated |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | c | 3-pin | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | c | 3-pin | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | c | 3-pin | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | c | 3-pin | In development |
| [M2BREAKOUT](/reference/datasheets/m-series/m2-breakout-datasheet/) | Particle M.2 SoM Breakout Board [x1] | c | 3-pin | GA |
| [M2EVAL](/reference/datasheets/b-series/b-series-eval-board/) | Particle M.2 SoM Evaluation Board [x1] | micro-b | 2-pin | GA |
| MHAT | M-HAT | c | 3-pin | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | c | 3-pin | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | c | 3-pin | In development |
| [MUON404](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON404EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON524](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON524EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON635](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | c | 3-pin | In development |
| [MUON635EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | c | 3-pin | In development |
| MUONCB | Muon Carrier Board (Dev Board only) | c | 3-pin | GA |
| MUONCB-BETA | Muon Carrier Board - Beta Sample | c | 3-pin | Deprecated |
| MUONCBKIT | Muon Carrier Board Kit | c | 3-pin | GA |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | micro-b | 2-pin | Deprecated |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | micro-b | 2-pin | Deprecated |
| XENNTRAY50 | Xenon [x50] | micro-b | 2-pin | End of life |


{{!-- END do not edit content above, it is automatically generated --}}


### 3100 mAh cylindrical

The M.2 breakout board and Muon include a 3-pin JST-PH connector (left), not the 2-pin JST-PH connector on some other Particle devices (right). The TS pin is expected to be connected to a 10K NTC thermistor in the battery pack. The TS jumper (26) must be installed for normal operation with a temperature sensor.

The included battery is a 3100 mAh 3.7V LiPo battery with temperature sensor. [Battery datasheet](/assets/pdfs/ZN18650-3100mAh-V04.pdf).

![Cylindrical battery](/assets/images/battery-cylindrical.jpg)



### Reversing polarity

If you buy batteries with the reverse polarity, it is possible to swap the pins. This video shows how to do it. Make sure you never connect a reverse polarity battery to a device is there is no reverse voltage protection and you will permanently damage the device.

<video width="720" height="480" controls>
  <source src="/assets/images/battery/swap-pins.mp4" type="video/mp4">
</video>

### Wiring a new connector

Another alternative if your battery does not already have a JST-PH connector is to wire the connector yourself.

Connector Housing:

- JST Sales America Inc.
- Model: PHR-2
- Description: 2 Position Rectangular Housing Connector Receptacle Natural 0.079" (2.00mm)
- [Digi-Key 455-1165-ND](https://www.digikey.com/product-detail/en/jst-sales-america-inc/PHR-2/455-1165-ND/608607)

Pins:

- Model: SPH-002T-P0.5L
- Description: Socket Contact Tin 24-28 AWG Crimp
- [Digi-Key 455-2148-1-ND](https://www.digikey.com/product-detail/en/jst-sales-america-inc/SPH-002T-P0.5L/455-2148-1-ND/1634657)

You need a crimping tool to successfully make the connection. It's not really practical to try to squeeze the connector with pliers or try to solder it, because the tolerance for getting the connector into the housing is small.

The official JST crimper is really expensive (US$1500)! Fortunately, this [$22.99 tool from Amazon](https://www.amazon.com/gp/product/B00YGLKBSK/ref=ppx_yo_dt_b_search_asin_title) works fine with this connector.

IWISS Crimping Tools Works on Mini Connectors XH2.0mm XH2.54mm XH3.96mm Dupont D-Sub Terminals JST Pin Crimper SN-01BM Crimping Tools for Crimper Plier for AWG 28-20 （0.08-0.5mm2）

This video shows how to use the crimper:

<video width="720" height="480" controls>
  <source src="/assets/images/battery/crimper.mp4" type="video/mp4">
</video>

### Battery options

Compatible LiPo batteries come not only in different capacities, but also different shapes and sizes. For example, here's a thin 2800 mAh vs. the Particle 1800 mAh. 

![Comparison with Particle battery](/assets/images/battery/comparison.jpg)

Likewise, both of these are 5000 mAh batteries, but one is thin and larger, and the other is approximately twice the thickness but smaller.

![Large batteries, top view](/assets/images/battery/large-top.jpg)
![Large batteries, side view](/assets/images/battery/large-side.jpg)

All of the non-Particle batteries were purchased from Amazon, and I had to reverse the polarity on the JST-PH connector.

Note that many drone and RC car and aircraft batteries have a different connector and some have wires that are too large to fit into a JST-PH pin, so check carefully before trying to use one of those.
