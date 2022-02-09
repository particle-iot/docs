---
title: Development tips
columns: two
layout: commonTwo.hbs
description: Tips for writing Particle device software
---

# {{title}}

*Tips for writing Particle device software*

## Getting started

- If you are using the [Tracker One](/tutorials/asset-tracking/introduction/) you may be able to use your device with no programming at all, as many features can be managed from the console.

- Install [Particle Workbench](/tutorials/developer-tools/workbench/). This is the preferred development environment for Particle device programming.

Particle devices are programming using C/C++, specifically gcc C++11, C++14, or C++17 depending on the version of Device OS you are targeting. If it's been a while since you've programmed in C/C++, there is a [language syntax overview](/cards/firmware/language-syntax/language-syntax/). Of course there are countless books and tutorials on the Internet as well.

The collection of calls to manage the features of the device including cloud features, hardware interfaces (serial, I2C, SPI), networking features, etc. are in the [Device OS API](/cards/firmware/introduction/introduction/).

### Device firmware

Particle devices contain a base set of software:

- Bootloader, which handles starting up the device. This is where DFU mode (blinking yellow) is implemented, as well as the code to load Device OS.
- Device OS, which is the operating system of the device. This handles bringing up the base peripherals, networking interfaces, and makes sure that all of the required components are installed. If there are missing dependencies, the device will go into safe mode (breathing magenta) to upgrade the parts over-the-air.
- User firmware, the part that you typically program. From the factory, the Tinker application is installed which allows simple control of the device over the cloud, but doesn't really do anything useful.
- Other parts depending on the device. Gen 3 devices include SoftDevice, which implements the nRF52 BLE radio stack. Argon and Tracker devices include NCP, the Wi-Fi network coprocessor image. 

Unlike a regular computer, Particle devices only run a single user application at a time. If your device needs to perform multiple functions you combine all of the necessary features into a single application. This application can be flashed over-the-air (cellular or Wi-Fi) or by USB. In many cases, you only need to flash the small user firmware and not all of Device OS, which speeds the update process and saves data when flashing over cellular.

Devices are intended to boot quickly, often within a second or two. On some devices the cellular network connection can remain active across a reboot, which allows the device to be reprogrammed or just rebooted with minimal disruption.

Tracker One and Tracker SoM also typically include the [Tracker Edge](/tutorials/asset-tracking/tracker-edge-firmware/) base reference application which supports the additional peripherals on this device. You can expand this to include your own functionality.

### Program structure



## General tips



## Watch out for

### Global constructors

### Interrupt service routines

### Mutex deadlock

### SPI transactions

### I2C transactions



