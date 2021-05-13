---
title: Introduction
columns: two
layout: commonTwo.hbs
description: Introduction to Particle Asset Tracking Solutions
---

# Introduction to Asset Tracking

## Tracking System

The Particle Asset Tracking System is an integrated, customizable, hardware, firmware, and cloud-based system with GNSS (GPS) and cellular connectivity.

### Hardware

The [Tracker One](/datasheets/asset-tracking/tracker-one/) is a complete system with a waterproof IP67-rated enclosure.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

The [Tracker SoM](/datasheets/asset-tracking/tracker-som-datasheet/) system-on-a-module is inside the Tracker One, but can also be purchased separately so you can reflow solder it to your own custom base board for the ultimate in flexibility.

![SoM](/assets/images/t523-som.svg)

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
- Tracker Edge firmware on Tracker One can be used without modification. You can use the firmware off-the-shelf and [customize it from the Particle console](/tutorials/device-cloud/console/#product-settings), with no writing of device firmware necessary at all.
- Easily upgrade to new versions of Tracker Edge firmware from the console and release it to your fleet with [just a few clicks](/tutorials/device-cloud/console/#using-off-the-shelf-releases).

### Semi-custom Firmware

- You can use the [Particle Edge reference firmware](/tutorials/asset-tracking/tracker-edge-firmware/) as a base and add your own code to extend it quickly and easily.
- Designed to make it easy to upgrade the base firmware while keeping your customizations in place.
- Add external sensors via the Tracker One M8 connector without opening the case.

### Tracker Carrier Board

- The circuit board in the Tracker One will be available separately for semi-custom designs.
- Use your own enclosure or modify the Tracker One enclosure to fit your needs. The Tracker One enclosure design is open-source.
- Optionally add an expansion daughter board using a JST PHR-8 for internal access to the same signals as the Tracker One M8 connector.

### Fully Custom

- Reflow solder the Tracker SoM onto your own custom base board with the features you need for your product.
- Design your board and enclosure together to fit your needs.
- Best option if you need external antennas for both cellular and GNSS.

## Find Out More

![Docs Menu](/assets/images/tracker/docs-menu.png)

Most of the documentation can be found in the [Tutorials](/tutorials/asset-tracking/introduction/), [Reference](/reference/asset-tracking/tracker-edge-firmware/), and [Datasheets](/datasheets/asset-tracking/tracker-som-datasheet/) sections.

### Tutorials

In the **Asset Tracking** section in Tutorials:

- [Setup guide](/tutorials/asset-tracking/setup/) 
- [Introduction to Tracker Edge firmware](/tutorials/asset-tracking/tracker-edge-firmware/)
- [Evaluation Board Tutorials](/tutorials/asset-tracking/tracker-eval-tutorials/) 
- [Expanding the Tracker One](/tutorials/asset-tracking/tracker-one-expansion/) using the external M8 connector
- [Introduction to CAN Bus](/tutorials/asset-tracking/can-bus/)

Want to add temperature, pressure, and humidity data to your location publishes using the Tracker Evaluation Board? Check out this example of using a BME280 temperature, pressure, and humidity sensor connected by I2C to [add data to location publishes](/tutorials/asset-tracking/tracker-eval-tutorials/#i2c-expansion-example).


And other tutorial resources:

- The map view and settings are described in the [Console Documentation](/tutorials/device-cloud/console/#asset-tracker-features).
- Cellular carriers for the Tracker SoM can be found in the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/).

### Reference

- The [Device OS Firmware API](/reference/device-os/firmware/) reference includes information specific to the Tracker SoM, such as the difference in [GPIO](/cards/firmware/input-output/input-output/). The new [POSIX Filesystem](/cards/firmware/file-system/file-system/) is documented there as well.
- The [Particle Cloud API Reference](/reference/device-cloud/api/) includes information about [Tracking events](/reference/device-cloud/api/#asset-tracking-events) as well as a reference for the [Tracker Cloud API](/reference/device-cloud/api/#asset-tracking).
- The [Tracker Edge Firmware Reference](/reference/asset-tracking/tracker-edge-firmware/) describes the Tracker Edge reference firmware API used to write device firmware. It allows for customizing the on-device code to access custom sensors and run your own code on the device.
- The [Pin Info](/reference/hardware/pin-info/?m=table&sort=num) page includes more information on the available pins on the Tracker SoM.

### Datasheets

Here you'll find detailed technical specifications for the:

- [Tracker SoM](/datasheets/asset-tracking/tracker-som-datasheet/)
- [Tracker SoM Evaluation Board](/datasheets/asset-tracking/tracker-som-eval-board/), for getting started with the Tracker SoM
- [Tracker One](/datasheets/asset-tracking/tracker-one/), ready-to-go and fully assembled with an IP67-rated enclosure

If you're building a carrier board you'll probably want to use the Eagle CAD Tracker SoM footprint in the [Hardware Libraries](https://github.com/particle-iot/hardware-libraries). You can also import this into other CAD programs.

### Known Issues and Errata

- [Known Issues and Errata](https://support.particle.io/hc/en-us/articles/360050288874)


## Models


{{!-- BEGIN do not edit content below, it is automatically generated e6d392c0-777e-11eb-9439-0242ac130002 --}}

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


{{!-- END do not edit content above, it is automatically generated e6d392c0-777e-11eb-9439-0242ac130002 --}}
