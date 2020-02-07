---
title: Batteries
order: 40
shared: true
columns: two
layout: tutorials.hbs
description: Learn more about the Li-Po (lithium ion polymer) battery on some Particle IoT devices
---

# Batteries

A number of Particle devices can use a [Lithium Ion Polymer battery](https://en.wikipedia.org/wiki/Lithium_polymer_battery) (LiPo):

- Argon (Gen 3 Wi-Fi)
- Boron (Gen 3 Cellular)
- Xenon (Gen 3 Mesh)
- B Series SoM (Gen 3 Cellular, if you include the connector on your board)
- Electron (Gen 2 Cellular)
- E Series (Gen 2 Cellular, if you include the connector on your board)
- Photon Power Shield (adapter for Gen 2 Wi-Fi Photon)

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

