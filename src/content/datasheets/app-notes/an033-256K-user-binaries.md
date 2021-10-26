---
title: AN033 256K User Binaries
layout: commonTwo.hbs
columns: two
---

# AN033 256K User Binaries

On Gen 3 devices with Device OS 3.1 and later, user firmware binaries have a maximum size of 256KB. On all other versions and devices, the maximum size is 128KB.

Supported devices:

- Boron
- B Series SoM
- Tracker SoM and Tracker One
- Argon

This feature will not be available on earlier versions of Device OS (it will not be back-ported to 2.x LTS, for example), and will not be available on Gen 2 devices (such as the Photon, P1, Electron, and E Series).

As long as you target Device OS 3.1 or later, you can build large binaries for supported devices with:

- Particle Workbench (local compile)
- Particle Workbench (cloud compile)
- Particle CLI (cloud compile)
- Web IDE

## Memory Map

The memory map is changed to move the start address of the user firmware binary from 0xd4000 to 0xb4000:

- 256KB @ 0xb4000 (Device OS 3.1 and later)
- 128KB @ 0xd4000 (Device OS 3.0 and earlier)

0xb4000 overlaps the end of the system-part-1 on Device OS 1.5.2 and earlier. Various techniques are used to safely upgrade in this scenario, as described below.

If you have valid user binaries at both 0xb4000 (3.1 and later) and 0xd4000 (3.0 and earlier), the binary at 0xd4000 is used! This sound counterintuitive but the reason is that it assures proper operation if you install Device OS 3.1 and a user firmware binary targeting 3.1, then subsequently install Tinker, which targets an older version of Device OS. In this case you want the install of Tinker to have precedence.

## Compatibility

In Device OS, it is possible to run a user application targeting an older version of Device OS on a newer version of Device OS. This is preserved for Device OS 3.1 binaries as well.

If you have a 128K user binary targeting 3.0 or earlier, it will be flashed to 0xd4000 and still operate properly on Device OS 3.1 and later. This works with all methods of flashing: 

- OTA (cloud flashing)
- USB (DFU, --usb)
- USB (ymodem, --serial)
- SWD/JTAG

If you have a user binary targeting 3.1 or later, the method varies slightly.

### OTA Flashing 

If you are flashing OTA, the cloud will notice you are doing this, put the device into safe mode, and upgrade Device OS before flashing the Device OS 3.1 user binary. This is different than the normal flow where the user binary is sent first and the device upgrades itself. The reason is that Devices running 3.0 and earlier don't know what to do with the 256K binary and will just discard it. Also with Device OS 1.5.x and earlier, the 256K user binary slot overlaps the end of system-part1, which would cause chaos.

#### Normal upgrade

This is a normal upgrade process for user firmware, which triggers a Device OS upgrade.

![](/assets/images/app-notes/AN033/upgrade-normal.png)

#### Special 3.1 upgrade

When upgrading from an older version of Device OS to a user firmware binary that requires 3.1 or later, a special upgrade path is required.

![](/assets/images/app-notes/AN033/upgrade-31.png)

This is only required for the first old-to-new upgrade. Upgrading user firmware after that works the way it did before as 3.1 and later know how to handle both 128K and 256K user binaries.

### USB (DFU)

If you are flashing a Device OS 3.1 or later 256K user binary in DFU mode, you should also make sure the device has Device OS 3.1 Device OS and bootloader installed. It's best to upgrade Device OS and the bootloader before flashing the user binary.

There are several reasons for this:

- If the device had Device OS 1.5.2 or earlier, the user binary at 0xb4000 will overwrite the end of the system part, causing it to no longer function.
- Device OS 3.0 and earlier don't know about user binaries at 0xb4000 so they will not know they need to upgrade Device OS to run them.
- If you flash a Device OS 3.1 user firmware binary to 0xb4000 in DFU mode, the bootloader in Device OS 3.1 and later will invalidate the Device OS 3.0 and earlier user binary at 0xd4000 to makes sure the new binary is used even it it's smaller than 128K.

### SWD/JTAG

When flashing a Device OS 3.1 or later user binary by SWD/JTAG, be careful if your binary is less than 128K and you have not erased the whole flash. The reason is that if there is a valid 128K binary at 0xd4000 it will always have precedence over a user binary at 0xb4000, so the old binary will be used instead of the newly flashed binary.

If you are using the [hex generator](/tools/device-programming/hex-generator/), this is taken care of for you. A 4K sector is erased at 0xd4000 before the user firmware is written when targeting Device OS 3.1 or later. This will assure that there isn't a valid 128K user binary regardless of the size of your Device OS 3.1 user binary.


