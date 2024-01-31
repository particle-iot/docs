---
title: WebUSB errors
columns: two
layout: commonTwo.hbs
description: WebUSB errors
---

# {{title}}

The browser and USB-based tools are often the best way to restore known good device firmware and set up devices.

- Chrome, Opera, and Edge browsers are supported on computers. The tools do not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 or 11 on supported browsers.
- Some tools will work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers. This requires a USB OTG cable or adapter.
- Browser-based tools do not work on iOS (iPhone or iPad).

| Browser | Required version |
| :--- | :--- |
| Chrome | 61 |
| Edge | 79 |
| Opera | 48 |


## Troubleshooting

### Windows

- If you get an USB device not selected error on Windows 10, or devices do not appear, see [Troubleshooting Windows 10 device drivers](/troubleshooting/guides/build-tools-troubleshooting/win10-device-drivers/).


### Linux

- If you get an USB device not selected error on Linux, you may need a udev rule. Download [99-particle.rules](/assets/files/50-particle.rules) and copy it to /etc/udev/rules.d and reboot.

## Very old Device OS

Some operations that use USB control requests to communicate with a device have a minimum required version of Device OS:

- Gen 3 (Argon, Boron): Device OS 0.9.0 or later
- Gen 2 (E Series, Electron, P1, Photon): Device OS 0.8.0 or later

All version of newer devices such as the B Series SoM, Tracker SoM, and P2, have full support for USB control requests.

The best option is to put the device into DFU mode (blinking yellow) manually by holding down MODE (or SETUP), tapping RESET, and continue holding down MODE until the status LED blinks yellow, then release.

Then use [Device Restore USB](/tools/device-restore/device-restore-usb/) to upgrade Device OS on the device.




