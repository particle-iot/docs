---
title: Lookup Tools
layout: commonTwo.hbs
description: Device and SIM lookup tools
includeDefinitions: [api-helper, api-helper-extras, api-helper-usb, usb-serial]
---

# {{title}}

{{> sso}}



## Identify device over USB

Your Particle device must be connected by USB to your computer and in listening mode
(blinking dark blue). If it's in another mode, hold down MODE (SETUP on Photon) until 
the status LED blinks dark blue. 

The identify tool only works on Chrome (version 89 or newer) on Windows 10, Mac, Linux, or Chromebook. 
If you are using a different browser, you can use the Particle CLI and the `particle identify` 
command instead.

{{> usb-identify}}

## Serial number lookup

Look up a device from its Particle serial number. It's encoded in the data-matrix code on the product label, and also printed under it on the label. It's a mix of letters and numbers of varying length.

{{> device-lookup serial="1"}}

Tip: A wireless USB 2D barcode scanner such as [this one](https://www.amazon.com/gp/product/B06XQ2HP8T/) work great for scanning Particle serial number stickers. Just position the cursor in the serial number field above and click the trigger. The scanner emulates a USB keyboard and will type the serial number into the box. (This tool will ignore the mobile secret if that's included in the data matrix code.)


## Older tools

There were previously tools for looking up a device ID or ICCID here, however you 
should use the [feature built into the console](/getting-started/console/console/#search) instead.

{{collapse op="start" label="Show older information"}}

**Device ID lookup**

Look up a device from its Device ID (24-character hex) in your account, products, or organization products.

{{> device-lookup}}

**SIM ICCID lookup**

Look up a SIM ICCID in your account, products, or organization products. A SIM ICCID is 19 to 21 digits beginning with 89. This tool can only look up Particle SIMs and will not locate 3rd-party SIM cards in a Particle device.

{{> iccid-lookup}}

{{collapse op="end"}}
