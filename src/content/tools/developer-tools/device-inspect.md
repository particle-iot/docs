---
title: Device Inspect
layout: commonTwo.hbs
description: Device firmware inspection tool
includeDefinitions: [api-helper, api-helper-extras, api-helper-usb, api-helper-json, codemirror, usb-serial]
---

# {{title}}

{{> sso}}

The Device Inspect tool examines the firmware on your device to validate the Device OS 
system dependencies, as well as other associated dependencies like the bootloader,
soft device, and network coprocessor (if present). If your device has unmet dependencies
it will go into safe mode (breathing magenta, red and blue at the same time) to download
the missing dependencies OTA.

Your Particle device must be connected by USB to your computer and in listening mode
(blinking dark blue). If it's in another mode, hold down MODE (SETUP on Photon) until 
the status LED blinks dark blue. 

This tool only works on Chrome (version 89 or newer) on Windows 10, Mac, Linux, or Chromebook. 
If you are using a different browser, you can use the Particle CLI and the `particle serial inspect` 
command instead.

{{> device-inspect}}

## From the event log

Devices report their Device OS version information via the `spark/status/safe-mode` event. Copy and paste 
the raw JSON data (be sure to use the **Raw** button) and paste it in the box below to decode 
the data. This can be used to determine if the device went into safe mode because of a missing dependency.

{{> device-inspect-json}}

## Module version helper tool

You can use the [module version helper tool](/tools/developer-tools/module-version/) to examine the dependencies and compare between differenet versions of Device OS.

