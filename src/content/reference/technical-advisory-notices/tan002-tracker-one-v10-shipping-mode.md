---
title: TAN002 - Tracker One v1.0 Shipping Mode
layout: commonTwo.hbs
columns: two
---

# {{{title}}} 

 _Shipping mode issue impacting Tracker One v1.0 devices manufactured before August 31, 2020._

Published: May 4, 2021

## Issue summary

Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020.

If there is leakage current on the GPIO, Serial, or I2C pins to the Nordic MCU at the time when shipping mode is entered, the MCU can enter an unusual state where it cannot be woken from shipping mode by applying power to the USB or M8 connector as documented. If this occurs, the only way to wake the device is to fully disconnect the Li-Po battery, which requires opening the sealed Tracker One enclosure.

Devices that do not use the onboard M8 connector connector or shipping mode are not affected by this issue and are not at risk.

## Products affected

* Tracker One LTE M1 (NorAm) (ONE402MEA) v1.0
* Tracker One LTE CAT1/3G/2G (Europe) (ONE523MEA) v1.0

All v1.0 devices were manufactured prior to August 31, 2020 (week 36). The manufacturing date of a device can be identified with the following procedure: 

* Plug in a USB cable while monitoring the print on the CLI while the device is initializing Tracker Edge.
* A v1.0 device will be model = 0002 and variant = 0002, while a V1.1 device will be model = 0002 and variant = 0003, see picture below for a V1.0 device.

![variant.png](/assets/images/support/variant.png)

 If you are having trouble determining your device's variant, please contact [Particle support](https://support.particle.io) and they can check the manufacturing logs based on your Tracker's Device ID or Serial Number.

## Issue mitigation

If you are not using the M8 connector to expand Tracker One or are not configuring your devices into Shipping Mode you will not be affected by this and no other mitigations are required.

If you are using the M8 connector, the easiest mitigation is to disconnect the M8 connector to your peripheral device before entering shipping mode. You can reconnect it after safely in sleeping mode if desired, or leave it disconnected during shipping.

This issue has been corrected in a subsequent revision of Tracker One (v1.1), expected in October 2020\. 
