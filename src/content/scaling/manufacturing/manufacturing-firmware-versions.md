---
title: Manufacturing Firmware Versions
columns: two
layout: commonTwo.hbs
description: Manufacturing Firmware Versions
---

# {{title}}

All Particle devices ship with Particle Device OS software, including Device OS, bootloader, and the Tinker application. 

| Device | Version | Last Updated | Notes |
| :--- | :--- | :--- | :--- |
| B Series SoM B404 NORAM EtherSIM | 2.3.0 | 2022-06-01 | Minimum required version |
| B Series SoM B524 EMEAA EtherSIM | 2.2.0 | 2021-12-21 | |
| Boron BRN404 NORAM EtherSIM | 2.2.0 | 2021-12-21 | |
| Boron BRN314 EtherSIM | 2.2.0 | 2021-12-21 | |
| E Series E314 EtherSIM | 2.2.0 | 2021-12-21 | |
| E Series E404 NORAM EtherSIM | 2.2.0 | 2021-12-21 | | 
| Electron ELC314 EtherSIM | 2.2.0 | 2021-12-21 | |
| Electron ELC404 NORAM EtherSIM | 2.2.0 | 2021-12-21 | |
| Tracker T404, T524, ONE404, ONE524 | 3.1.0 | 2021-11-04 | Tracker Edge v16 |
| B Series SoM B523 EMEAA  | 2.0.1 | 2020-12-17 | |
| Boron BRN402 NORAM | 1.4.4 | 2020-01-08 |
| Boron BRN310 | 1.4.4 | 2020-01-08 |
| Argon | 1.4.4 | 2020-01-08 |
| B Series SoM B402 NORAM | 1.4.2 | 2019-10-24 | |
| P1 | 1.2.1 | 2019-08-15 |
| Photon, P0 | 1.2.1 | 2019-08-15 |

## Questions and Answers

### What if I want to use a newer version of Device OS?

It is recommended that you use the latest Long Term Support (LTS) version, if that version is greater than or equal to the factory version. For most devices (except the Tracker), this is Device OS 2.3.0.

Because the Tracker was released after 2.x LTS, and required major changes to Device OS, Device OS 3.1.0 or later is recommended.

Each user firmware binary targets a particular version of Device OS. If the version of Device OS on the device is less than the version targeted, the device will be upgraded OTA.

It's also possible to flash both Device OS and your user firmware during your manufacturing process, either by USB or by SWD/JTAG.

### Does upgrading Device OS require recertification?
 
Upgrading the Device OS version does not require recertification for FCC, IC, CE, etc..

### What if I'm currently targeting an older version of Device OS?

If devices from the factory have been upgraded to a newer version of Device OS, we recommend that you update your firmware to target that version and test for compatibility.

### What if I can't upgrade the firmware?

It is sometimes possible to use an firmware binary that targets an older version of Device OS on a newer version. However you should always thoroughly test the combination to make sure your firmware operates correctly. This should only be done as a last resort.

### Can I downgrade the device?

We generally do not recommend downgrading Device OS on the device. In some cases, changes are required for updated hardware, and older versions cannot be used at all.

If you are flashing OTA, it is generally impractical to downgrade a device. Flashing firmware that targets an older version of Device OS does not downgrade Device OS.

It is technically possible to downgrade a device by USB or SWD/JTAG, but make sure the upgrade was not required for hardware compatibility before doing so. Upgrading your firmware is the recommended path instead of downgrading Device OS.


### Can I get a specific Device OS version loaded on my devices?

No, it is not possible to order a specific version from the factory.

