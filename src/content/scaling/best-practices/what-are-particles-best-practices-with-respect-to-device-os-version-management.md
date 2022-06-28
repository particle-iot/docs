---
title: What are Particle's Best Practices with respect to Device OS Version Management?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
From exposing new features to refining existing capabilities, meaningful development and significant enhancement go into each successive DeviceOS release. We at Particle encourage our customers to reap the benefits of our hard work! Please explore our [changelog](https://github.com/particle-iot/device-os/releases) for an outline of all of these improvements, indexed by release.

As new diagnostic tools develop and bugfixes emerge, our Support Team asks you to keep your DeviceOS as current as possible. Given a recent cluster of advancements around cellular connectivity, Sleep, and Device Vitals, we recommend bringing your Particle Device to **at least DeviceOS 2.x**. Doing so will equip our Support Team with our most modern diagnostic toolset as they work to tackle the issue!

### What is the easiest way to update an individual Device's DeviceOS?

If you have a Support Request that centers around a specific Device, and if you have that Device in hand, the easiest way to upgrade your DeviceOS to the most current version is to: 

* Download and Install the [Particle CLI](/getting-started/developer-tools/cli/).
* Upon doing so, open your Terminal (Mac) or Command Line (Windows).
* Put your Device in DFU Mode. To put your device in DFU Mode, connect your Device to your computer. Then, press both RESET and MODE buttons and hold them down together. Release the RESET button, and wait until the Status LED Blinks Yellow. Then release the MODE button. The device should continue to Blink Yellow.
* Once your Device is in DFU Mode, enter the following command in the Command Line:

```
particle update
```

This should take care of the entire process. If the device does not reboot and run your firmware as expected, please place the device back into DFU Mode and run:

```
particle flash --usb tinker 
```

Then open up a Support Ticket!

### What is the best way to keep DeviceOS modern at scale?

First, a general principle: a DeviceOS Upgrade almost always happens in tandem with an application firmware upgrade. Or - to put it another way - **Particle users update DeviceOS at scale by compiling their application firmware against a specific DeviceOS version and flashing that firmware to their fleet.** Users of the WebIDE will be familiar with this workflow: when compiling application firmware, one _targets_ one's firmware toward a given DeviceOS. If the targeted DeviceOS version is more modern than that on the Device, the Device will upgrade its DeviceOS OTA automatically.

The best way to keep your Particle device firmware current at scale is by using [Particle Workbench](/getting-started/developer-tools/workbench/) and our Particle Product fleet management system. In order to upgrade devices at scale:

* Please test your firmware thoroughly against the DeviceOS version you wish to target. To do so, please [Install the Local Compiler Toolchain](/getting-started/developer-tools/workbench/#particle-install-local-compiler) of your choice, and [Configure your Workspace for Device](/getting-started/developer-tools/workbench/#particle-configure-workspace-for-device) based on the DeviceOS you selected. Then simply [Compile Application & DeviceOS](/getting-started/developer-tools/workbench/#particle-install-local-compiler) and [Flash Application & DeviceOS](/getting-started/developer-tools/workbench/#particle-flash-application-amp-deviceos-local-) to your test unit. _(n.b.: an advanced user can also do this via [Product Device Groups](/getting-started/console/device-groups/))._
* After a thorough test period, use our [OTA Firmware Release Workflow](/getting-started/cloud/ota-updates/#fleet-wide-ota) to upload your firmware, compiled against the DeviceOS version of your choice. Use the Firmware Release function to distribute it to your fleet. If the firmware you just released was compiled against a more modern DeviceOS version than that on your Devices, your Devices will upgrade their DeviceOS OTA automatically.
