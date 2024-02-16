---
title: Device protection
columns: two
layout: commonTwo.hbs
description: Device protection
---

# {{title}}

Device protection protects your Particle devices from malicious access at the device. While the Particle cloud protects
your devices from remote attackers, device protection can help protect against attackers who have physical
access to your device.

Device protection:

- Prevents SWD/JTAG debugger access including flash programming and flash read-out
- Prevents local flashing of user firmware or Device OS by USB or BLE
- Disables control of the device locally by USB or BLE

Additionally, the Particle Cloud will prevent flashing unauthorized firmware on protected devices, including flashing ad-hoc applications, downgrading Device OS to versions prior to 6.0, and flashing product firmware versions that are not protected, even with valid access tokens.


## Upgrade process

Device protection is enabled for your organization as part of your enterprise plan contract.

{{step-diagram op="start"}}
```json
{
    "width": 450,
    "steps": [
        {
            "title": "Device protection enabled in the cloud"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Product firmware targeting Device OS 6.x released to devices"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Device receives and applies update"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Device is protected!"
        }
    ]
}
```
{{step-diagram op="end"}}

- Build a version of your product firmware that targets Device OS 6.0.0 or later. This is required to enable device protection.

- Release this version to a subset of your fleet using [device groups](/getting-started/console/device-groups/), or to your entire fleet.

- The new firmware will be flashed to your devices using [intelligent OTA](/getting-started/cloud/ota-updates/#intelligent-firmware-releases), then reboot.

- The device will apply the upgrade to the 6.x version of Device OS that your firmware targets, then reboot and connect to the Particle cloud.

- Once these conditions are met device protection will be enabled on the device!

You can see the device protection status in the [Particle console](https://console.particle.io/) in the device vitals for individual product devices, and in the fleet health reports.

Once device protection is enabled, there is no way to turn it back off! We recommend using a separate product for software development so you can still access local flashing and the SWD/JTAG debugger for devices in that product during development.

