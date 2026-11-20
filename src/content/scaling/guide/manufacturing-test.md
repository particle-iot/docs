---
title: Manfacturing Test
columns: two
layout: commonTwo.hbs
description: Testing devices during manufacturing
guide-custom-images: default
---

# {{title}}

{{section-nav}}

{{content-nav}}

## Manufacturing test

A common step is to run specialized firmware designed to test all of the feature of your hardware, without requiring a cloud connection.

## Flash firmware and Device OS

### Using Particle Workbench

During development, you will probably use [Particle Workbench](/getting-started/developer-tools/workbench/) for flashing code and Device OS 
to your development devices. While this can be done for small batches, it's not usually done at scale.

### Using SWD/JTAG

Many contract manufacturers prefer to use SWD/JTAG. The main advantage is that a single self-contained .hex file can contain bootloader(s), Device OS, 
and user firmware. The machine doing the flashing can be a dedicated machine with no Internet connection, sometimes a requirement during manufacturing.

It's also extremely fast; a Gen 3 device such as the B-SoM can have the bootloader, softdevice, Device OS, and user firmware flashed in around 4 seconds
using the Segger J/LINK.

### Using the Particle CLI

The Particle CLI can be used to flash Device OS and user firmware to devices one at a time over USB (DFU and CDC).

### Using Device OS Flashing Utility

The [Device OS Flashing Utility](https://github.com/particle-iot/device-os-flash-util) is an internal tool that is available to the public. It can flash 
Device OS and user firmware to devices over USB (DFU and CDC), as well as SWD/JTAG using OpenOCD. It also can flash multiple devices at the same time.


## Onboard your device to the Particle platform

If you did not import all of your devices into the Particle cloud at the beginning, you could do it now, one device at a time, after flashing. This is done
by adding your device, typically by using its serial number or Device ID, to your product in the console.




## End-to-end test

You may want to do a full end-to-end test, making a full connection to the Particle cloud over cellular. This provides the best assurance that everything will work properly when your customer receives their device.

There are a few reasons why you may not be able to do this, however:

If your CM is doing testing, and are out of the service area for your device, it may not be practical. For example, if you are based on the B404X B-SoM, but your CM is based in China, they will be unable to make a cellular connection using the B404X. 

In the basic plan, billing starts as soon as the device connects to the Particle cloud the first time. You can program the device offline (by USB or SWD/JTAG) without starting billing. In the enterprise plan, there is a manufacturing grace period that allows billing to be stopped after manufacturing.


{{section-nav}}


