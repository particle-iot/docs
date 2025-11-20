---
title: Device Restore USB
layout: commonTwo.hbs
description: Device restore over USB from a browser
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-protobuf, api-helper-usb, api-helper-extras, debug-log, webdfu, zip]
---

# Device restore over USB

This tool works like [`particle update`](/reference/developer-tools/cli/#particle-update) in the Particle CLI, except it works from your browser (no software install required). It works with Gen 2, Gen 3, and Gen 4 devices. It cannot be used for Tachyon.

{{> device-setup-usb mode="restore"}}

---

## Additional details

- Chrome, Opera, and Edge browsers are supported on computers. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 or 11 on supported browsers.
- It can update Device OS, the bootloader, soft device (on Gen 3), Tinker (or Tracker Edge for Tracker devices), and the NCP (network co-processor) on the Tracker using DFU mode (blinking yellow). 
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers. This requires a USB OTG cable or adapter.
- It does not work on iOS (iPhone or iPad).
- If you get an USB device not selected error on Windows, you may have a [Windows device driver issue](https://github.com/rickkas7/particle_notes/tree/master/fixing-windows-10-serial-drivers) that is hard, but not impossible, to fix.
- If you get an USB device not selected error on Linux, you may need a udev rule. Download [99-particle.rules](/assets/files/50-particle.rules) and copy it to /etc/udev/rules.d and reboot.
- There is also a version that implements [Device Restore over JTAG](/tools/device-restore/device-restore-jtag/) that works with the Particle debugger. It can restore devices that do not have a working bootloader (Dim D7 on Gen 2 devices) or have been completely erased.
- For a short period of time, the [old version of Device Restore USB](/tools/device-restore/device-restore-usb-old/) will be available in addition to this newer version, however the old version will be deprecated.
- There are [persistent settings](/reference/device-os/api/persistent-settings/persistent-settings/) that are not cleared by this tool.

## Special notes for downgrading

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac120002 --}}
**Boron LTE BRN402 and B-Series SoM B402**

If you are downgrading a Boron LTE (BRN402) or B-Series SoM B402 from Device OS 2.0.0 or later, to 1.5.1 or earlier, you must first install 1.5.2, allow the device to boot and connect to cellular before downgrading again to an earlier version. The reason is that 2.0.0 and later use a higher baud rate for the cellular modem, and on the SARA-R410M only, this setting is persistent. Older versions of Device OS assume the modem is using the default of 115200 and will fail to communicate with the modem since it will be using 460800. Device OS 1.5.2 uses 115200, however it knows it can be 460800 and will try resetting the baud rate if it can't communicate with the modem.
{{!-- END shared-blurb --}}

