---
title: Device Restore USB (Old)
layout: commonTwo.hbs
description: Device restore over USB from a browser
includeDefinitions: [api-helper, api-helper-usb, webdfu, zip]
---

# {{{title}}}

{{note op="start" type="note"}}
This is the old version of Device Restore USB. It will be deprecated in the near future.

Using the [new version of Device Restore USB](/tools/device-restore/device-restore-usb/) is recommended.
{{note op="end"}}

This experimental tool works like [`particle update`](/reference/developer-tools/cli/#particle-update) in the Particle CLI, except it works from your browser (no software install required). It works with both Gen 2 and Gen 3 devices. 

There is also a version that implements [Device Restore over JTAG](/tools/device-restore/device-restore-jtag/) that works with the Particle debugger. It can restore devices that do not have a working bootloader (Dim D7 on Gen 2 devices) or have been completely erased.

**Important caveats:**

- This tool is experimental, and may not work properly.
- It updates Device OS, the bootloader, soft device (on Gen 3), and Tinker (or Tracker Edge for Tracker devices) using DFU mode (blinking yellow).
- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers.
- If you get an USB device not selected error on Windows, you may have a [Windows device driver issue](https://github.com/rickkas7/particle_notes/tree/master/fixing-windows-10-serial-drivers) that is hard, but not impossible, to fix.
- If you get an USB device not selected error on Linux, you may need a udev rule. Download [99-particle.rules](/assets/files/50-particle.rules) and copy it to /etc/udev/rules.d and reboot.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.

## Setup

- Connect your Particle device by USB to your computer.
- Or, for some Android phones, use an USB OTG adapter between the Particle device and your phone.

## Restore!

{{> usb-restore-device}}

---

## Special notes for downgrading

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac120002 --}}
**Boron LTE BRN402 and B Series SoM B402**

If you are downgrading a Boron LTE (BRN402) or B Series SoM B402 from Device OS 2.0.0 or later, to 1.5.1 or earlier, you must first install 1.5.2, allow the device to boot and connect to cellular before downgrading again to an earlier version. The reason is that 2.0.0 and later use a higher baud rate for the cellular modem, and on the SARA-R410M only, this setting is persistent. Older versions of Device OS assume the modem is using the default of 115200 and will fail to communicate with the modem since it will be using 460800. Device OS 1.5.2 uses 115200, however it knows it can be 460800 and will try resetting the baud rate if it can't communicate with the modem.
{{!-- END shared-blurb --}}