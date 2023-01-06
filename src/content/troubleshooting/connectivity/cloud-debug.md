---
title: Cloud Debug
layout: commonTwo.hbs
description: Tool for debugging cloud connection issues
includeDefinitions: [api-helper, api-helper-usb, webdfu, zip, usb-serial]
---

# Cloud Debug

**In most cases, using the [Particle Web Device Doctor](/tools/doctor/) will be easier than using Cloud Debug directly.**

## Automatic installation

- The tool below will install cloud debug and Device OS.
- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers.
- For additional tips, see the [Device Restore](/tools/device-restore/device-restore-usb/) page.

### Setup

- Connect your Particle device by USB to your computer.
- Or, for some Android phones, use an USB OTG adapter between the Particle device and your phone.
- Optionally put the device in DFU mode (blinking yellow) by holding down MODE and tapping RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release. If you do not do this, the tool will attempt to do this for you.

{{> cloud-debug-install}}

After the status LED stops blinking magenta (red and blue at the same time), you can view the results, below.

### Manual installation

If you prefer to install manually or do not have a compatible browser or computer, you can follow the manual installation instructions on the [Cloud Debug GitHub](https://github.com/particle-iot/cloud-debug) page.

## Viewing the results

If you are using a Chrome browser you can monitor the output here by connecting to your device using the web serial debug monitor:

{{> usb-serial-console}}

Otherwise, you can use the Particle CLI command:

```
particle serial monitor
```
