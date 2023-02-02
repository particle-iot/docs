---
title: Debugging firmware builds
columns: two
layout: commonTwo.hbs
description: Debugging firmware builds
---

# {{title}}

{{!-- BEGIN shared-blurb 86b60d7d-f94f-4ca2-9d9a-e30f2a8bfb3d --}}

There are two types of firmware:

- Modular builds have a separate user firmware binary and a Device OS build. This is standard on all platforms during normal operation.
- Monolithic builds combine the user firmware and Device OS into a single binary. This is used only for debugging on most platforms.

Prior to Device OS 4.0, monolithic builds were used mainly for source level debugging using Particle Workbench. This had the advantage of being able to easily step between the system and user firmware, but also introduced a difference that could make problems behave differently while debugging.

Starting with Device OS 4.0 (and also 5.0):

- Debugging in Workbench now works with modular builds, and you can still step between user firmware and system parts.
- This provides more consistent behavior between debugging and non-debugging builds.
- Flashing only the user binary is significantly faster.


| Platform | Gen | Debug Modular | Debug Monolithic |
| :--- | :---: | :---: | :---: |
| P2 / Photon 2 | 3 | >= 5.0 | n/a |
| Tracker M | 3 | >= 5.0 | n/a |
| Tracker | 3 | >= 4.0 | < 4.0 |
| B SoM (B404X, B404, B402) | 3 | >= 4.0 | < 4.0 |
| B5 SoM (B524, B523) | 3 | >= 4.0 | < 4.0 |
| E SoM X (E404X) | 3 | >= 4.0 | n/a |
| Boron | 3 | >= 4.0 | < 4.0 |
| Argon | 3 | >= 4.0 | < 4.0 |
| E Series / Electron | 2 |  | &check; |
| P1 | 2 |  | &check; |
| Photon | 2 |  | &check; |

For Gen 2 devices, E Series (except E404X), Electron, P1, and Photon, debugging is still monolithic and unchanged as these devices cannot use Device OS 4.0 or later.

{{!-- END shared-blurb --}}


## Debugging setup

- You will need a CMSIS/DAP debugger, such as the Particle Debugger or a generic equivalent, in order to debug nRF52840-based Gen 3 devices.

- Be sure to both connect the debugger by USB and connect the device by a second USB cable to your computer.

- In order to debug code in the system parts, you will need .elf files that contain the symbols, addresses, and line information needed by the debugger. You may be prompted: "You haven't built Device OS locally for this platform and version. You must compile Device OS to get debugging symbols (this process will take several minutes). Would you like to do this now?"
 
  - Debug Application Only: You will not be able to step into system code or see stack traces for system code.
  - Cancel: Don't debug
  - Compile Now: Build the .elf files. This does not flash system parts to your device!

- Make sure that the version of Device OS that you have targeted in Workbench (**Particle: Configure Project for Device**) matches what is on the device. We recommend that you use [Device Restore USB](/tools/device-restore/device-restore-usb/) as flashing Device OS from Workbench does not updated some required components (bootloader, soft device, NCP, etc.).

- When you start debugging, the user binary will be flashed to your device by USB and then debugging started over SWD/JTAG.


For more information, see [Debugging](/getting-started/developer-tools/workbench/#debugging-3rd-generation-) in the Particle Workbench documentation.

## Additional details

- Modular builds are not used on the Spark Core. The Spark Core only supports monolithic builds.
- The P2/Photon 2 and E404X do not support monolithic builds. Only modular builds can be used.
- Switching between monolithic and modular can only be done by USB or SWD/JTAG; it cannot be done OTA.
- Only modular firmware can be used in a product.

