---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
description: Introduction to Particle Asset Tracking Solutions
---

# Introduction to Asset Tracking

The Particle Asset Tracking System is a customizable hardware, firmware, and cloud-based system with GNSS (GPS) and cellular connectivity.

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

<div align="center"> <a href="/assets/images/at-som/at-som-block-diagram.png" target="_blank"> <img src="/assets/images/at-som/at-som-block-diagram.png" class="full-width"></a></div> 


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
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

## Customizable

### Fully off-the-shelf

- Tracker One hardware is designed to be used without modification. It's fully assembled and ready to go.
- Tracker Edge firmware on Tracker One can be used without modification. You can use the firmware off-the-shelf and customize it from the Particle console, with no writing of device firmware necessary at all.

### Semi-custom firmware

- You can use the Particle Edge reference firmware as a base and add your own code to extend it quickly and easily.
- Designed to make it easy to upgrade the base firmware while keeping your customizations in place.
- Add external sensors via the Tracker One M8 connector without opening the case.

### Tracker Carrier Board

- The circuit board in the Tracker One will be available separately for semi-custom designs.
- Use your own enclosure or modify the Tracker One enclosure to fit your needs. The Tracker One enclosure design is open-source.
- Optionally an expansion daughter board using a JST PHR-8 for internal access to the same signals as the Tracker One M8 connector.

### Fully Custom

- Reflow solder the Tracker SoM onto your own custom base board with the features you need for your product.
- Design your board and enclosure together to fit your needs.
- Best option if you need external antennas for both cellular and GNSS.

## Models

| SKU     | Description | Packaging |
| :---    | :--- | :--- |
| | Tracker One 523 (Europe) | |
| ONE523M | Tracker One LTE CAT1/3G/2G (Europe), [x1] | Each |
| | Tracker One 402 (North America) | |
| ONE402M | Tracker One LTE M1/2G (NorAm), [x1]	| Each |
| | Tracker SoM T523 (Europe) | |
| T523MEA  | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | Each |
| T523MTY  | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | Tray (50) |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] |	Each |
| | Tracker SoM T402 (North America) | |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1]	| Each |
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50]	| Tray (50) |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]	| Each |

