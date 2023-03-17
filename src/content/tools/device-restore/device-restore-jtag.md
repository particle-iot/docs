---
title: Device Restore JTAG
layout: device-restore.hbs
description: Particle Debugger-based device restore over the web
---

# Device restore JTAG

This experimental tool works with the Particle Debugger to allow a device to be completely restored to a known Device OS version in a single click and less than a minute, from a web browser!

Important caveats:

- This tool is experimental, and may not work properly. It could leave your device in a bad state.
- You must [upgrade the firmware on your Particle Debugger](/reference/datasheets/accessories/debugger/#upgrading-the-debugger) as the version from the factory does not have this functionality.
- There is limited browser support on desktop: Chrome, Edge, and Opera. It does not work with Firefox or Safari. 
- It should work on Mac, Windows, Linux, and Chromebook on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome or Opera browsers.
- It does not work on iOS (iPhone or iPad) as the hardware does not support USB OTG.
- Web-based flashing only works reliably on Gen 3 devices (Argon, Boron, B Series SoM, Tracker SoM).
- You must put the device in DFU mode (blinking yellow) before flashing. It's not using DFU mode, but SWD mode is disabled in normal operating mode or safe mode, but is enabled in DFU mode. If the device is non-responsive with no LED, you may still be able to flash it.
- It takes about 3 minutes from a browser vs. 1 minute for drag-and-drop.
- To just download the restore images and use other flashing methods, see the [JTAG Reference](/reference/developer-tools/jtag/).
- To flash a device using USB directly, without the Particle Debugger, see [Device Restore USB](/tools/device-restore/device-restore-usb/).

Still ready to go?

## Setup

- Connect your Particle device to the debugger:
  - Gen 3: Use the included 10-pin ribbon cable.
  - Gen 2: [Follow the instructions here](/reference/datasheets/accessories/debugger/#debugging-gen-2-platforms) to connect D6, D7, and GND to the debugger.
- Connect the debugger to your computer or Chromebook
- Or, for some Android phones, use a USB OTG adapter between the debugger and your phone.
- Power your Particle device by USB or battery. It cannot be powered from the debugger.
- Put your Particle device in DFU mode (blinking yellow) by holding down MODE and tapping RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release MODE.

## Restore!

{{device-restore mode="flash"}}

