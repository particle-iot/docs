---
title: Flash dump
layout: no-nav.hbs
description: Save device flash over USB
includeDefinitions: [api-helper, api-helper-usb, flash-dump-usb, webdfu, zip]
---

This tool can download the main MCU flash memory, external flash memory (on Gen 3 devices), or the DCT (configuration flash) to a file on your computer. You will rarely need to do this unless directed to do so by support.

- This tool is experimental, and may not work properly.
- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- If you get an USB device not selected error on Windows, you may have a [Windows device driver issue](https://github.com/rickkas7/particle_notes/tree/master/fixing-windows-10-serial-drivers) that is hard, but not impossible, to fix.
- If you get an USB device not selected error on Linux, you may need a udev rule. Download [99-particle.rules](/assets/files/50-particle.rules) and copy it to /etc/udev/rules.d and reboot.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.
- After **Download complete!** you can disconnect or reset the device to exit DFU mode.

{{> flash-dump-usb}}
