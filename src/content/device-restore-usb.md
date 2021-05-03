---
title: Device Restore USB
layout: no-nav.hbs
description: Device restore over USB from a browser
includeDefinitions: [api-helper, api-helper-usb, webdfu, zip]
---

# Device Restore over USB

This experimental tool works like [`particle update`](/reference/developer-tools/cli/#particle-update) in the Particle CLI, except it works from your browser (no software install required) and it can upgrade or downgrade to different versions of Device OS. It works with both Gen 2 and Gen 3 devices. 

There is also a version that implements [Device Restore over JTAG](/device-restore-jtag/) that works with the Particle debugger. It can restore devices that do not have a working bootloader (Dim D7 on Gen 2 devices) or have been completely erased.

**Important caveats:**

- This tool is experimental, and may not work properly.
- It updates Device OS, the bootloader, soft device (on Gen 3), and Tinker (or Tracker Edge for Tracker devices) using DFU mode (blinking yellow).
- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers.
- If you get an USB device not selected error on Windows, you may have a [Windows device driver issue](https://github.com/rickkas7/particle_notes/tree/master/fixing-windows-10-serial-drivers) that is hard, but not impossible, to fix.
- If you get an USB device not selected error on Linux, you may need a udev rule. Download [99-particle.rules](/assets/files50-particle.rules) and copy it to /etc/udev/rules.d and reboot.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.

## Setup

- Connect your Particle device by USB to your computer.
- Or, for some Android phones, use an USB OTG adapter between the Particle device and your phone.

## Restore!

{{> usb-restore-device}}

## Special Notes for Downgrading

{{blurb name="downgrade"}}
