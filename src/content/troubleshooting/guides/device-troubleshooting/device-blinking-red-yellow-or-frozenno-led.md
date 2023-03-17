---
title: Device Blinking Red, Yellow, or Frozen/No LED
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Bugs happen! From hard faults to heap exhaustion to a missing DeviceOS component - even the best of us can accidentally flash firmware that leaves our Particle device Blinking Red, crashing, or failing to connect (Blinking Green). This article will help you understand **what to do** and **what not to do** when dealing with a device that just won't stop crashing or Blinking Red. Please see the following 7 sections:

## Getting started

Your device is Blinking Red or Yellow, or Frozen Cyan, or has no Status LED at all - let's start by making sure the device is connected to your computer and gathering some more information.

**Do not**: unclaim your device. This is a totally natural instinct to have, but it does more harm than good. Unclaiming your device does not do anything to the device itself, it just trips a flag in the Cloud that allows this device to be claimed by another person. Worse, it removes this device from your Console, making it hard for yourself and our Support Team to identify the device that's struggling!

**Do**: explore our LED Status pages! These pages provide helpful insights into the various ways your Particle device is signaling for your attention. It breaks out by device Type, LED Status Code, and - most importantly - by Red SOS code:

* [Boron](/tutorials/device-os/led/boron/)
* [Argon](/tutorials/device-os/led/argon/)
* [Electron](/tutorials/device-os/led/electron/)
* [Photon](/tutorials/device-os/led/photon/)

## Interacting with the device

**Do**: Cold Boot your device. Disconnect it from power, let all of its capacitors drain (5 seconds), and reconnect your device.

**Do**: Put your device in Safe Mode. Safe Mode will bypass User Application firmware, loading in its place a piece of backup ("factory") firmware that lives deep in memory. In order to enter Safe Mode, press both RESET and MODE buttons and hold them down together. Release the RESET button, and wait until the Status LED Blinks Magenta. Then release the MODE button. The device should start Blinking Green (connecting to the Cloud) and then Breathing Magenta (connected to the Cloud - the same as Breathing Cyan, but in Safe Mode). The outcome of Safe Mode will:

* Tell you whether or not the issue boils down to the User Application. If it connects in Safe Mode, there's likely something in the User Application that is causing an error.
* If the device connects in Safe Mode, you can then OTA new, working firmware (like Tinker, which lives in the [Web IDE](https://build.particle.io/build/new)) to the device. Problem solved! Now to debug that User App...

## DFU Mode

For a number of reasons, sometimes Safe Mode does not work - it could be that the problem has to do the system files on the device, or it could be that the User Application prevents the device from entering Safe Mode altogether. Below is a magic pair of commands that the Support Team uses to resolve issues where this is the case.

**Do** **:** Download and Install the [Particle CLI](/getting-started/developer-tools/cli/). Upon doing so, open your Terminal (Mac) or Command Line (Windows).

**Do:** Put your device in DFU Mode. A device in DFU (Device Firmware Update) Mode can be manually programmed by your computer. To put your device in DFU Mode, connect your device to your computer. Then, press both RESET and MODE buttons and hold them down together. Release the RESET button, and wait until the Status LED Blinks Yellow. Then release the MODE button. The device should continue to Blink Yellow.

_If you are unable to force this device to Blink Yellow_ there are a few avenues that you can try:

* attempting the CLI command `particle usb dfu`
* opening a Serial connection with a Serial Terminal Emulator (like [CoolTerm](https://freeware.the-meiers.org/) (Mac) or PuTTY (Windows), setting the baud rate of said connection to 14400 and pressing connect. This magic baud rate kicks the device into DFU mode.
* opening a Support Ticket to discuss further!

 Once your device is in DFU Mode, enter the following commands in the Command Line:

```
particle update
```

followed by

```
particle flash --usb tinker 
```

If the device goes out of Blinking Yellow after the first command, put it back into DFU Mode for the second one.

This sequence of commands will update your device to the most recent DeviceOS (and in so doing, update correlating Bootloader, NCP, and/or SoftDevice firmware) and it will also replace the User Application on the device with our factory firmware Tinker. 

If this does not work the first time, please give it one more shot. Sometimes, the sequence of flashing Tinker prior to the update command will get a device over the finish line. 

### If your device is in DFU mode, but you're unable to get a response from it with the CLI** **:

* Check your cable! This is the issue almost 90% of the time. Try multiple cables, taking care to ensure that these cables can handle both USB data and power (not just USB power).
* If you get an error that reads `LIBUSB_ERROR_NOT_SUPPORTED`, check to make sure you have the [most recent drivers installed](http://binaries.particle.io/cli/installer/windows/ParticleDriversSetup.exe) (Windows only).

**Do:** reset your device. Hopefully, after all of the above has flashed successfully, the device will stop its bad behavior and start Blinking Green (trying to connect).

## Device restore

Particle has implemented two browser-based tools that can help you restore your device to a stable, factory-like state. Please review the caveats listed as part of the documentation of each tool.

* For simple error states, see the [device restore via USB tool](/tools/device-restore/device-restore-usb/). This will restore your device via a simple USB connection, but requires the device to be able to enter DFU Mode (see above) in order to perform its function.
* For more complex error states, including states where a device has a missing bootloader, see the [device restore via JTAG tool](/tools/device-restore/device-restore-jtag/). This requires the use of a JTAG interface, e.g. the [Particle Debugger](/reference/datasheets/accessories/debugger/). This tool also requires a device to be in DFU Mode, but it works via SWD (which is enabled in DFU Mode) - it may, however, work on devices without a status LED.

## Manual DeviceOS flash

The following is recommended for advanced Particle Users, preferably those who have undergone the manual DeviceOS flash process already. It may be possible that `particle update` does not suit your need or intention, in which case you can manually flash the DeviceOS of your choice by following the instructions here ([link](https://github.com/particle-iot/device-os/releases)). 

**Do not**: do so without reading the instructions very carefully. Please keep track of which firmware parts should be flashed via DFU (`--usb`) and those which should be flashed via Serial (`--serial`). **Under no circumstances should you have to use the `--force` argument.** 

## Totally unresponsive devices

If your device is completely unresponsive the the above, please see our article on Identifying Damaged Hardware here ([link](/troubleshooting/guides/device-troubleshooting/identifying-damaged-hardware/)).

## Before opening a support ticket

If you are unable to resolve the issue via the above, please collect the following information before opening a Support Ticket:

* Your [DeviceID](/troubleshooting/guides/device-management/finding-your-device-id/) (if possible)
* The LED Status exhibited by your device
* The results of the steps above that you have taken, in sequence
* A brief history of this device including:  
   * How it is powered  
   * On what is it mounted  
   * To what (peripherals) is it connected  
   * With what (User Application and DeviceOS firmware) is it running, and when/how did it receive that firmware
* Finally, the results of the following command (if possible):

Place your device in Listening Mode (pressing and holding down the MODE button until the device Blinks Dark Blue).

Run the command `particle serial inspect` in the CLI. Place these results in your Support Ticket.
