---
title: Programming devices
layout: commonTwo.hbs
columns: two
---

# {{title}}

This document includes tips for installing a specific version of Device OS, typically during manufacturing, but can also be used for developer devices and testing.

There are a number of components that may need to be upgraded on a device, in addition to user firmware:

| Device | Generation | System Parts | Bootloader | Soft Device | NCP |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Tracker | Gen 3 | 1 | &check; | &check; | &check;<sup>2</sup> |
| B-Series SoM | Gen 3 | 1 | &check; | &check; | &nbsp; |
| Boron | Gen 3 | 1 | &check; | &check; | &nbsp; |
| Argon | Gen 3 | 1 | &check; | &check; | &check;<sup>1</sup> |
| E-Series | Gen 2 | 3 | &check; | &nbsp; | &nbsp; |
| Electron | Gen 2 | 3 | &check; | &nbsp; | &nbsp; |
| P1 | Gen 2 | 2 | &check; | &nbsp; | &nbsp; |
| Photon | Gen 2 | 2 | &check; | &nbsp; | &nbsp; |

<sup>1</sup>There is only one version of the Argon NCP firmware in production, so it does not need to upgraded.

<sup>2</sup>The Tracker SoM NCP firmware was upgraded in Device OS 3.0.0, thus there are two versions in the field. It is not necessary or desirable to ever downgrade the Tracker NCP firmware, as the 3.0.0 version is backward compatible with earlier versions. See [Argon and Tracker NCP](/reference/developer-tools/jtag/#argon-and-tracker-ncp) for more information.

There are a number of ways the Device OS version can be upgraded:

## OTA (over-the-air)

OTA is how most devices are upgraded in the field. This can also be done during manufacturing, either on the manufacturing line, or by the initial user, however it's more common to upgrade using one of the other methods, below, especially for cellular devices.

OTA will only ever upgrade the Device OS version; it will not downgrade. Device OS is generally backward compatible. If you built your user firmware targeting, say, 1.5.2, it would likely run correctly on Device OS 2.1.0. However, because of differences between versions, this is not always possible. Thus if you are relying on OTA, it is possible that devices from the factory could contain a newer version than you initially developed for.

### Asset OTA

{{!-- BEGIN shared-blurb e724be96-469f-4bf2-bead-c8c962accad8 --}}
Asset OTA (available in Device OS 5.5.0 and later), makes it easy to include bundled assets that can be delivered to other processors and components in your system, such as:

- Coprocessors
- Graphics and fonts for external displays
- Sound samples for device with audio output capabilities

Including assets is as easy as including an directory in your project, specifying it in the `project.properties` and building and flashing using Particle Workbench, the Particle CLI, or fleet-wide OTA for a product. Bundled assets can be up to 1 MB to 1.5 MB in size, after compression, depending on the platform, and do not use additional data operations.

The compression algorithm is similar to gzip, so using a gzip program on the assets folder on your computer will yield the approximate size after compression.
{{!-- END shared-blurb --}}

## USB (particle flash --local)

In most cases you will be using product firmware that you have built and uploaded to the console. By using the CLI, you can flash your product firmware and Device OS to the device over USB:

```
particle flash --local firmware.bin --target 4.1.0
```

## USB (particle update)

Using the `particle update` command in the Particle CLI is the most common way that end-users upgrade their devices.

You can upgrade (or downgrade) to a specific version of Device OS using the `--target` option. For example:

```sh
$ particle update --target 4.1.0
```

## USB (Particle CLI, manually)

It is also possible to use the Particle CLI to manually program the device, which provides the most flexibility at the expense of a more complicated script. The recommended flow is:

In some cases, you may want to capture the Device ID at this point. If so:

- The device should be in listening mode (blinking dark blue). If not, use `particle usb start-listening`.
- You may want to capture the Device ID and ICCID using `particle identify`.

Place the binaries you want to flash in a directory, then:

- Flash them using `particle flash --local <directory>`
- Mark setup done (Gen 3 running Device OS 3.x or earlier) using `particle usb setup-done`. This is not required with Device OS 4.0 and later.

You can download the necessary files for several common Device OS releases as a zip file for several common Device OS releases here:

{{device-restore mode="zip"}}

It is recommended that you use the latest in release line. For example, if you are using 1.5.x, use 1.5.2 instead of 1.5.0. Ideally, you should be using the latest LTS release (2.1.0, for example), unless you need features in a developer preview release (3.1.0, for example).

All versions are available in [GitHub Device OS Releases](https://github.com/particle-iot/device-os/releases).

| File | Generation | Listening | DFU |
| :--- | :---: | :---: | :---: |
| Bootloader | All | &check; | <sup>1</sup> |
| NCP | Gen3 | &check; | &nbsp; |
| SoftDevice | Gen3 | &check; | &check;<sup>2</sup> |
| System Parts | All | &check; | &check;<sup>2</sup> |
| User Firmware | All | &check; | &check;<sup>2</sup> |

<sup>1</sup> It's technically possible to flash the bootloader in DFU mode, however the process is complicated. [Device Restore over USB](/tools/device-restore/device-restore-usb/) uses this technique, however the CLI only supports this during `particle update` and not when manually flashing the bootloader. It requires two dfu-util commands that vary between devices and resetting the device.

<sup>2</sup> While it's possible to flash system parts in listening mode (--serial), using DFU mode is generally more reliable. If you are downgrading in --serial mode, there are also additional restrictions, as the system parts must be flashed in reverse numerical order. Also, you can run into a situation where the device reboots too early in --serial mode, and completes the upgrade OTA, which defeats the purpose of flashing over USB first.


## USB (web-based)

[Device Restore - USB](/tools/device-restore/device-restore-usb/) is a convenient way to flash a specific version of Device OS, bootloader, SoftDevice, and user firmware onto a device over USB. It's normally used for individual developers, not manufacturing.

- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It does not require any additional software to be installed, but does require Internet access to download the requested binaries.


## USB (dfu-util)

It is possible to directly script the dfu-util application to flash system parts and user firmware. However, this is not usually an ideal solution is that you can't easily flash the bootloader using dfu-util, and the commands are complicated. Also, without the Particle CLI, you'd have to manually switch the device modes between DFU and listening mode using buttons, which is tedious at best.


## SWD/JTAG

SWD/JTAG is the recommended method for upgrading (or downgrading) Device OS, bootloader, Soft Device, and user firmware on devices where it is available. It requires a compatible SWD/JTAG programmer:

| Programmer | Gen 2 | Gen 3 |
| :--- | :---: | :---: |
| Particle Debugger | &check; | &check; |
| Segger J/LINK | &check; | &check; |
| ST-LINK/V2 | &check; | &nbsp; |


### Device compatibility - SWD/JTAG

The Tracker SoM does not contain a 10-pin SWD debugging connector on the SoM itself, but is exposed on the pads of the SoM and the connector could be added to your base board.

The 10-pin SWD debugging connector Tracker One is not easily accessible, as it not only requires opening the case, which would void the warranty and possibly affect the IP67 waterproof rating, but also the connector is not populated on the board (there are bare tinned pads where the SMD connector would be).

The B-Series SoM does not contain the 10-pin SWD debugging connector on the SoM. There are pads on the bottom of the SoM that mate with pogo pins on the B-Series evaluation board, which does have a 10-pin SWD debugging connector. You can either temporarily mount the SoM in a test fixture with a debugging connector, include the connector on your board, or use other methods.

The Boron and Argon both have 10-pin SWD debugging connectors on the Feather device.

The Electron, E-Series, Photon and P1 have SWD on pins D7, D5, and optionally RESET. If these pins are available, you can program it by SWD. However, you may need to be able to change the device mode, so access to the MODE button, or to USB, may be helpful.

### Hex files

If you want to use SWD/JTAG see the [JTAG Reference](/reference/developer-tools/jtag/). The most common method is to generate an Intel Hex File (.hex) containing all of the binaries, including your user firmware binary. 

Using the [Hex File Generator](/tools/developer-tools/hex-generator/), you can take one of the base restore images, replace Tinker with your own user firmware, and download the resulting hex file. This makes it easy to flash devices with known firmware quickly and easily.

This is an excellent option if your contract manufacturer will be programming your devices as they will likely be able to use the .hex files and a SWD/JTAG programmer to easily reprogram your devices. This can be done with the standard JTAG programmer software and does not require the Particle toolchains or Particle CLI be installed.

