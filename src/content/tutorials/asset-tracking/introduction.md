---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
description: Introduction to Particle Asset Tracking Solutions
---

# Introduction to Asset Tracking

The Particle Asset Tracking System is a hardware, firmware, and cloud-based system with GNSS (GPS) and cellular connectivity.

### Hardware

The [Tracker One](/datasheets/asset-tracking/tracker-one/) is a complete system with a waterproof IP67-rated enclosure.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

The [Tracker SoM](/datasheets/asset-tracking/tracker-som-datasheet/) system-on-a-module is inside the Tracker One, but can also be purchased separately so you can reflow solder it to your own custom base board for the ultimate in flexibility.

![SoM](/assets/images/at-som/at-som-bg96.png)

Features include:

- LTE Cat 1 (EMEAA) or LTE Cat M1 (North America) cellular modem
- GNSS (supports GPS, SBAS, QZSS, GLONASS, BeiDou, and Galileo) with up to 1.8m accuracy and untethered dead-reckoning 
- Support for CAN bus and 5V power for CAN devices
- Built-in Inertial Measurement Unit (IMU)

<div align="center" class="full-width"> <a href="/assets/images/at-som/at-som-block-diagram.png" target="_blank"> <img src="/assets/images/at-som/at-som-block-diagram.png" ></a></div> 


### Cloud Stack

![Cloud Stack](/assets/images/at-som/at-cloud.png)

The Particle Asset Tracking system builds upon the Particle cloud foundation of device management and events, adding two new major services:

- The Configuration Service allows for fleet-wide and per-device configuration stored into the cloud and automatically synchronized with devices.
- The Location Service receives geolocation and other data from devices and stores it in a database.

### Firmware Stack

![Firmware Stack](/assets/images/at-som/at-firmware.png)

One difference from other Particle devices is that the Tracker One firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Tracker One firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications.


**TODO:** Something with these tables. Maybe don't include here, just leave in datasheet. Maybe combine in some way.

| SKU     | Description | Packaging |
| :---    | :--- | :--- |
| ONE402M | Tracker One LTE M1/2G (NorAm), [x1]	| Each |
| ONE523M | Tracker One LTE CAT1/3G/2G (Europe), [x1] | Each |
| TCAR	  | Tracker Carrier Board, [x1]	| Each |

| SKU  | Description | Packaging |
| :--- | :--- | :--- |
| | T523 Family (Europe) | |
| T523MEA  | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | Each |
| T523MTY  | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | Tray (50) |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] |	Each |
| | T402 Family (North America) | |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1]	| Each |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50]	| Tray (50) |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]	| Each |

