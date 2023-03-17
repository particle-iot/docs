---
title: Device Claiming
layout: no-nav.hbs
description: Particle Device Setup and Claiming Tool
includeDefinitions: [api-helper, api-helper-extras, usb-serial]
---

# Device setup and claiming

{{> sso}}

## Wi-Fi Setup (Photon, P1, and Argon)

Your Photon, P1, or Argon must be connected by USB to your computer and in listening mode
(blinking dark blue). If it's in another mode, hold down MODE (SETUP on Photon) until 
the status LED blinks dark blue.

{{> wifi-setup }}

{{> device-lookup hidden="true"}}


## Marking setup done

On Gen 3 devices (Argon, Boron, B Series SoM, Tracker) running Device OS 3.x or earlier, you must clear the "Setup Done" flag
in order to leave listening mode (blinking dark blue). This can be done using the
[Particle CLI](/reference/developer-tools/cli/#particle-usb-setup-done), or you can use 
flash this firmware to your device.

**When using Device OS 4.0 and later, there is no setup done bit and you should skip this step!**

This is the standard Tinker app with a bit of extra code to mark setup done on Gen 3 devices. 

Flashing this to your device will also upgrade your device to the latest default release of 
Device OS. Even though you don't need to mark setup done on the Photon, you could still 
flash this firmware to a Photon to upgrade it.

Your device may blink magenta (red and blue at the same time), including having the LED turn 
off for many seconds at a time, and reboot several times. This is normal.

{{> codebox content="/assets/files/hardware-examples/tinker-setup-done.cpp" format="cpp" height="400" flash="true"}}
