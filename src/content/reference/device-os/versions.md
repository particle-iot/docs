---
title: Versions and upgrades
layout: commonTwo.hbs
columns: two
description: Device OS versions, upgrades, and downgrades
---

# {{title}}

## Introduction

Most applications consist of two parts: Device OS ("system firmware") and the user application ("user firmware"). Device OS contains the code necessary to communicate with the hardware on the device (including cellular or Wi-Fi radios), as well as the Particle cloud. The user firmware is the part specific to your product or application and is typically the code you've written in C/C++. 

Separating the two makes upgrading the smaller user firmware quick and easy allowing for rapid test and debug cycles, even when programming firmware over cellular networks.

Unlike desktop and laptop computers, Particle devices only run a single user application at a time. Programing new user firmware replaces the previous user firmware.

Each user firmware binary specifies the minimum version of Device OS that it is compatible with, referred to as the target version. For example, if your user firmware targets 1.5.0, it will work not only on 1.5.0, but also 1.5.2, and 2.0.0.

If you flash user firmware that requires a newer version of Device OS than is currently installed on the device, the device will automatically upgrade. For example, if the device has 1.5.2 and you target your user firmware for 2.0.0, the user firmware would not initially be able to run because the Device OS version is too old. However, at boot, the device will discover this and go into safe mode (breathing magenta), and the cloud will send down the missing binaries. This normally requires a few reboot cycles that happen automatically.

Unlike computer operating systems like Windows or Mac, Device OS will never be automatically updated under your application. You must manually opt into each update, and updates are generally not required. Because of the more limited function set and smaller attack surface, recommended updates for security reasons are rare.

## Version Numbering

Device OS releases follow semantic versioning ("semver") guidelines with MAJOR.MINOR.PATCH numbering. For example in the 1.5.x release line, there are 1.5.0, 1.5.1, and 1.5.2 versions.

There are also occasionally beta releases (2.0.0-beta.1) and more commonly release candidate ("rc") releases (2.0.0-rc.1). There may be multiple release candidates (for example, 2.0.0-rc.4) before a final release is made (2.0.0).

## LTS Versions

Particle is constantly improving Device OS with new releases that add new features, increase performance, and improve the standard behavior of Particle devices to better meet the needs of our customers. However, for some customers, constant ongoing development and changes in behavior can create undesired risk to the stability and reliability of existing applications.

Many enterprises building and deploying mission-critical solutions with Particle value reliability over everything else. For those customers, Particle develops and releases Long Term Support (LTS) releases of Device OS that deliver consistent behavior and stable performance for device applications over extended periods of time.

Long Term Support (LTS) releases for Device OS are independent branches of Device OS that are feature-frozen in time. They do not receive updates with new features, API changes, or improvements that change the function or standard behavior of the device. 

LTS releases are, however, supported by an extended support window which address critical bugs, regressions, security vulnerabilities, and issues that affect our wider enterprise customer community.

LTS release lines have even major version numbers (2.0.x, 4.0.x, etc.). After 2.0.0 is released, new feature development will occur in the 3.x.x release line with only important bug and security fixes back-ported to 2.x.x.

{{!-- BEGIN shared-blurb d07841d1-c7b6-4d06-b89d-f906d454d2b7 --}}
## Recommended LTS versions

| Platform | Models | Previous LTS | Test With | Current LTS | Minimum Version |
| :--- | :--- | :--- | :--- | :--- | :--- |
| B Series SoM | B404X |  |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| B Series SoM | B404 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}}  | 2.3.0<sup>1</sup>|
| B Series SoM | B402, B524, B523 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}}  | |
| Boron | BRN404X |  |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| Boron | BRN404, BRN402, BRN314, BRN310 | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | |
| Argon | | {{version mode="latestRelease" line="2"}} |  {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | |
| E404X | E404X | | {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} | 4.0.0<sup>2</sup> |
| Tracker | T404, T524, T523 ONE404, ONE402, ONE524, ONE523 | {{version mode="latestRelease" line="3"}} | {{version mode="testWith" line="4"}} | {{version mode="latestRelease" line="4" alt="4.0.0"}} |  |

- <sup>1</sup>B404 SoMs should only use Device OS 2.3.0 or later. While older units worked with older versions, newer units from the factory will only with with 2.3.0 and later due to a required component change. It's recommended that all B404 units use this version for compatibility.
- <sup>2</sup>B404X, BRN404X, E404X, and Tracker X devices require Device OS 4.0.0 or later. The most recent 4.x release, currently {{version mode="latestRelease" line="4"}}. 

### Devices that must stay on 2.x LTS

| Platform | Models | Current LTS | Minimum Version |
| :--- | :--- | :--- | :--- |
| E Series | E404, E402, E314, E313, E310  | {{version mode="latestRelease" line="2"}} | 2.2.0<sup>1</sup> |
| Electron | ELC402, U260, U270, G350  | {{version mode="latestRelease" line="2"}} | 2.2.0<sup>1</sup> |
| P1 | | {{version mode="latestRelease" line="2"}} | 1.2.1<sup>2</sup>|
| Photon | | {{version mode="latestRelease" line="2"}} | 1.2.1<sup>2</sup>|

-<sup>1</sup>The most recent versions of the devices shipped from the factory with 2.2.0. This device can use older versions of Device OS but we do not recommend downgrading the Device OS whenever possible.
-<sup>2</sup>The Photon and P1 shipped with 1.2.1 from the factory. This device can use older versions of Device OS but we do not recommend downgrading the Device OS whenever possible.



### Devices that cannot use LTS yet

| Platform | Current Version | Minimum Version |
| :--- | :--- | :--- |
| P2 | {{version mode="latestRelease" line="5"}} | 5.0.0<sup>1</sup>|

<sup>1</sup>Some devices from the factory shipped with 3.2.1-p2.3. This version should not be used in production, using the latest 5.0 release, currently {{version mode="latestRelease" line="5"}}, is recommended.

{{!-- END shared-blurb --}}

- For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. 
- See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).


## Upgrading Device OS

### OTA (over-the-air)

In general, flashing a version of your user firmware will automatically update the version of Device OS automatically over-the-air when necessary. Note this will only ever upgrade. If you have Device OS 2.0.0 on your device and flash user firmware targeting 1.5.2 Device OS will not be downgraded! However, your firmware should still run because the target version is the minimum compatible version.

### particle update (USB)

Using the [Particle CLI](/getting-started/developer-tools/cli/) allows upgrading to the current default release over USB. This is a common option because it's generally faster than OTA, and does not use your cellular data allowance.

- Put the device in DFU mode (blinking yellow) by holding down the MODE button and tapping RESET. Continue to hold down MODE while the device blinks magenta (red and blue at the same time) until it blinks yellow, then release. Or use the CLI:

```
particle usb dfu
```

- Issue the update command from a Command Prompt or Terminal window:

```
particle update
```

Note that particle update actually updates Device OS to the version that was the default when the CLI version was created, and the binaries are stored in the CLI itself (not downloaded). Thus you may need to use `particle update-cli` to have it update itself. 

### Browser DFU

Certain browsers can do a DFU upgrade or downgrade right from the browser page with no software or app install. See [Device Restore USB](/tools/device-restore/device-restore-usb/) for more information.

- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers.


### Manually over USB

It is also possible to update manually over USB. This allows for upgrades as well as downgrades, and operation while offline. 

You can download binaries for any release from the GitHub releases for Device OS page:

[https://github.com/particle-iot/device-os/releases](https://github.com/particle-iot/device-os/releases)

Note the number of components that need to be flashed varies depending on the device:

| Device | Gen | System Parts | Bootloader | SoftDevice | NCP |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Boron | 3 | 1 | &check; | &check; | &nbsp; | 
| B Series SoM | 3 | 1 | &check; | &check; | &nbsp; | 
| Tracker SoM | 3 | 1 | &check; | &check; | &check; | 
| Argon | 3 | 1 | &check; | &check; | &check; | 
| Electron/E Series | 2 | 3<sup>1</sup> | &check; | &nbsp; | &nbsp; | 
| Photon | 2 | 2 | &check; | &nbsp; | &nbsp; | 
| P1 | 2 | 2 | &check; | &nbsp; | &nbsp; | 

<sup>1</sup>Electrons prior to 0.6.0 had 2 system parts.

- If the build consists of multiple system parts (Electron/E Series, Photon, P1) then all parts must be the same version.
- The bootloader is generally updated on each minor version (1.4.x to 1.5.x) and occasionally in other cases where required (2.0.0-rc.1 to 2.0.0-rc.2).
- The SoftDevice ("radio stack") is rarely updated.
- The only devices with an OTA programmable NCP are the Argon and Tracker SoM. The NCP is rarely updated.

To find out the versions of the components on your device, use [`particle serial inspect`](/troubleshooting/guides/device-troubleshooting/using-particle-serial-inspect/).

Some components require DFU mode (`--usb`), blinking yellow. Some require listening mode (`--serial`), blinking dark blue. Some can use either. The recommended ordering of the component upgrades is as follows, as well:

| Component | DFU Mode | Listening Mode | Notes | 
| :--- | :---: | :---: | :--- |
| System Part(s) | &check; | &check;<sup>1</sup> | DFU is preferable |
| Bootloader | &nbsp; | &check; | |
| SoftDevice (Gen 3) | &check; | &check; | Not always required |
| NCP | &nbsp; | &check; | Rarely required |

<sup>1</sup>In the initial batch of Gen 3 devices with 0.8.0-rc, you can only upgrade Device OS in DFU mode. After you've updated to 0.9.0 or later, both DFU and listening mode are supported. 

#### Example: Upgrading a Boron to 2.0.0 by USB

- Download the binaries from the [Device OS Release Page](https://github.com/particle-iot/device-os/releases/tag/v2.0.0).

- Put the device in DFU mode (blinking yellow) by holding down the MODE button and tapping RESET. Continue to hold down MODE while the device blinks magenta (red and blue at the same time) until it blinks yellow, then release. Or use the CLI:

```
particle usb dfu
```

- Flash system part 1:

```
particle flash --usb boron-system-part1@2.0.0.bin
```

- Tap the reset button, then put the device in listening mode (blinking dark blue) by holding down the MODE button.

- Flash the bootloader:

```
particle flash --serial boron-bootloader@2.0.0.bin
```

- Put the device back in listening mode (blinking dark blue) by holding down the MODE button.

- Flash the SoftDevice if necessary. This is only ever required and Gen 3, and often is not required as it does not change on every version.

```
particle flash --serial boron-softdevice@2.0.0.bin
```

### Manually over SWD/JTAG

On production lines, it's common to update devices using SWD/JTAG. This can be done with:

| Device | Gen 2 | Gen 3 | Windows | Linux | Mac | Notes | 
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| ST-LINK/v2 | &check; | &nbsp; | &check; | &nbsp; | &nbsp; | Using ST/LINK for Windows |
| ST-LINK Mini | &check; | &nbsp; | &check; | &check; | &check; | Using openocd |
| Particle Debugger | &check; | &check; | &check; | &check; | &check; | Using openocd |
| Segger J-LINK | &check; | &check; | &check; | &check; | &check; |  |

You can use [device restore images](/reference/developer-tools/jtag/#restore-binaries) to restore a device to a known state using a SWD/JTAG debugger. This works for both upgrades and downgrades and is by far the fastest way to do this.

A [hex file generator](/reference/developer-tools/jtag/#custom-hex-files) is available to take a device restore hex file and replace Tinker (or Tracker Edge) with your custom user firmware binary. This can make it very easy to mass-produce devices with exactly the version of Device OS and your firmware you want.

Additional information can be found in the [JTAG and SWD Guide](/reference/developer-tools/jtag/).


### Using Particle Workbench

In [Particle Workbench](/getting-started/developer-tools/workbench/) you can also choose to upgrade or downgrade Device OS when flashing code.

- Select the version of Device OS from the command palette using **Particle: Configure Project for Device**.
- Use **Particle: Flash application and Device OS (local)**

There are several caveats to this, however:

- Workbench will not upgrade the bootloader. Your device may go into safe mode and require a connection to the cloud to update it, or you can do so over USB.
- Workbench will not downgrade the bootloader. This generally will function, but the farther back you go in versions the more likely this is to not work. Downgrading the bootloader by USB is recommended as bootloader downgrades are never done by the cloud.
- Workbench will not upgrade or downgrade the SoftDevice on Gen 3 platforms. This is not always required, but if it is you'll need to do so OTA or by USB.
- Workbench will not upgrade or downgrade the Argon or Tracker SoM NCP, though this is almost never required.

### NCP Upgrade

The Argon and Tracker have a Network Coprocessor (NCP). This rarely needs to be updated manually, as it will be upgraded OTA if necessary. There is currently no scenario in which it would need to be downgraded.

For more information see [Argon and Tracker NCP](/reference/developer-tools/jtag/#argon-and-tracker-ncp).

### Less common scenarios

There are a few less common upgrade scenarios described in the section below. Use the disclosure triangle to view.

{{collapse op="start" label="Less common scenarios"}}

#### Using OTA or Serial (YModem) on Electron

Updating in the proper sequence is essential as you cannot update directly from 
very old versions of Device OS to 2.0.0

1. First Update to 0.5.5 (if the current version is less than that)
2. Then update to 0.6.4 (if the current version is less than that)
3. Then update to 0.7.0 (if the current version is less than that)
4. Then update to 1.2.1 (if the current version is less than that)
5. Then update to 2.0.0


Use `particle flash --serial` for locally connected devices.

#### Using DFU over USB on Electron/Photon/P1

These software components may be updated in any order:

- You may update Device OS to 2.0.0 directly first, flash the system firmware parts in order 1,2(,3) to the device using 
	`particle flash --usb <system-part.bin>`. See the notes below about the bootloader if you are offline!


>**Note:** P1/Photon Bootloader
> The Cloud will automatically update the bootloader on P1/Photon devices if your device is online. 
If your device does not connect to the cloud and it is offline, you should flash the bootloader to the device using `particle flash --serial <bootloader.bin>`. 
This should be done *after* upgrading system firmware.  The Electron bootloader is applied automatically from it's own system parts.
>
>**Note:** Argon/Boron/B SoM/B5 SoM
> If your device is offline, the bootloader must be manually updated using `particle flash --serial <bootloader.bin>`. This can be done *before* or *after* upgrading system firmware.
>


#### Updating SoftDevice and Bootloader

Note: The SoftDevice .bin files provided on the Device OS GitHub release site are OTA binaries intended for use OTA or in --serial mode. They cannot be flashed directly to a device using SWD/JTAG because they have a Particle binary header that must be removed, and a Nordic preamble that must be inserted to flash directly via SWD.

#### Via OTA

1. Upgrade Device OS to 2.0.0
2. Manually flash 2.0.0 bootloader: `particle flash <deviceId> boron-bootloader@2.0.0.bin`
3. Flash SoftDevice: `particle flash <deviceId> boron-softdevice@2.0.0.bin`

#### Using Serial (YModem)

1. Upgrade Device OS to 2.0.0
2. Put the device into listening mode (blinking blue) by holding MODE button
3. Manually flash 2.0.0 bootloader: `particle flash --serial boron-bootloader@2.0.0.bin`
4. Flash SoftDevice: `particle flash --serial boron-softdevice@2.0.0.bin`

#### Using DFU

This only works for SoftDevice, not for bootloader:

1. Upgrade Device OS to 2.0.0
2. Update the bootloader to 2.0.0 with the OTA or Serial (YModem) process above
3. Put the device into DFU mode (blinking yellow) 
4. Flash the SoftDevice: `particle flash --usb boron-softdevice@2.0.0.bin`


{{collapse op="end"}}


## Downgrading Device OS

While upgrades to Device OS are automatically handled by Safe Mode (breathing magenta), downgrades are not handled automatically. 

### USB Downgrade - Browser

Certain browsers can do a DFU upgrade or downgrade right from the browser page with no software or app install. See [Device Restore USB](/tools/device-restore/device-restore-usb/) for more information.

- There is limited browser support on desktop: Chrome, Opera, and Edge. It does not work with Firefox or Safari. Chrome is recommended.
- It should work on Chromebook, Mac, Linux, and Windows 10 on supported browsers.
- It should work on some Android phones that support USB OTG when using Chrome, Opera, or Samsung Internet browsers.

### USB Downgrade - Particle CLI

You can downgrade USB in DFU mode (blinking yellow). This can generally be done in one version jump, with the following exception:

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac120002 --}}
**Boron LTE BRN402 and B Series SoM B402**

If you are downgrading a Boron LTE (BRN402) or B Series SoM B402 from Device OS 2.0.0 or later, to 1.5.1 or earlier, you must first install 1.5.2, allow the device to boot and connect to cellular before downgrading again to an earlier version. The reason is that 2.0.0 and later use a higher baud rate for the cellular modem, and on the SARA-R410M only, this setting is persistent. Older versions of Device OS assume the modem is using the default of 115200 and will fail to communicate with the modem since it will be using 460800. Device OS 1.5.2 uses 115200, however it knows it can be 460800 and will try resetting the baud rate if it can't communicate with the modem.
{{!-- END shared-blurb --}}

The process to downgrade by USB is:

- Downgrade the user firmware, if necessary. Make sure your user firmware targets the version you are intended to downgrade to, or an earlier version

- For each Device OS downgrade, download the binaries from the [Device OS releases](https://github.com/particle-iot/device-os/releases) page. As a general rule, we recommend using the latest in a patch line. For example, even if you previously used 1.4.2, you may want to consider using 1.4.4 instead. Some common release lines include:

| Release | Notes |
| :--- | :--- |
| [3.0.0](https://github.com/particle-iot/device-os/releases/tag/v3.0.0) | Developer Preview Release |
| [2.1.0](https://github.com/particle-iot/device-os/releases/tag/v2.1.0) | Latest 2.0 LTS |
| [2.0.1](https://github.com/particle-iot/device-os/releases/tag/v2.0.1) | First 2.0 LTS |
| [1.5.2](https://github.com/particle-iot/device-os/releases/tag/v1.5.2) | Last version before 2.0 LTS |
| [1.4.4](https://github.com/particle-iot/device-os/releases/tag/v1.4.4) | |
| [1.2.1](https://github.com/particle-iot/device-os/releases/tag/v1.2.1) | | 
| [1.1.0](https://github.com/particle-iot/device-os/releases/tag/v1.1.0) | |
| [1.0.1](https://github.com/particle-iot/device-os/releases/tag/v1.0.1) | |
| [0.9.0](https://github.com/particle-iot/device-os/releases/tag/v0.9.0) | Oldest recommended Gen 3 version |
| [0.7.0](https://github.com/particle-iot/device-os/releases/tag/v0.7.0) | |
| [0.6.4](https://github.com/particle-iot/device-os/releases/tag/v0.6.4) | Useful in specific Photon/P1 applications |
| [0.5.5](https://github.com/particle-iot/device-os/releases/tag/v0.5.5) | Oldest recommended Gen 2 version | 

Say you wanted to downgrade a Boron from 2.0.0 back to 1.4.4:

- Put the device in DFU mode (blinking yellow) by holding down the MODE button and tapping RESET. Continue to hold down MODE while the device blinks magenta (red and blue at the same time) until it blinks yellow, then release. Or use the CLI:

```
particle usb dfu
```

- Flash your application targeting the older version of Device OS, or Tinker:

```
# Downgrade user firmware
particle flash --usb tinker
```

- Go back into DFU mode (blinking yellow) if necessary.

- Flash system part 1:

```
particle flash --usb boron-system-part1@1.4.4.bin
```

- For the Electron and E Series, also flash system-part2 and system-part3. For the Photon and P1, also flash system-part2.

- Put the device in listening mode (blinking dark blue) by holding down the MODE button.

- Flash the bootloader

```
particle flash --serial boron-bootloader@1.4.4.bin
```

- Put the device back in listening mode (blinking dark blue) by holding down the MODE button.

- Flash the SoftDevice (Gen 3 only). This is not always required.

```
particle flash --serial boron-softdevice@1.4.4.bin
```

- If you'd like to verify, put the device in listening mode and:

```
particle serial inspect
```

The output should look something like this. Make sure there are no **FAIL** entries.

```
Platform: 13 - Boron
Modules
  Bootloader module #0 - version 501, main location, 49152 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
  System module #1 - version 1406, main location, 671744 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
      Bootloader module #0 - version 501
      Radio stack module #0 - version 202
  User module #1 - version 5, main location, 131072 bytes max size
    UUID: 362808E0DB24B4ED309227C9121675856A32E73D5D16D2C7922C49C9AEF353C2
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
      System module #1 - version 326
  Radio stack module #0 - version 202, main location, 192512 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
```

### OTA - Downgrade

The downgrade process is generally the reverse of the upgrade process, however when downgrading OTA, there may be additional intermediate steps you need to make.

- Downgrade the user firmware, if necessary. Make sure your user firmware targets the version you are intended to downgrade to, or an earlier version, otherwise safe mode healer will kick in and upgrade the device while you are trying to downgrade!

- Note the required intermediate downgrades. This is important! If you skip this step, the device will become unreachable and will require downgrade by USB.

| Device | Version | Version | Version | Version |
| :--- | :---: | :---: | :---: | :---: | :---: | 
| Electron/E Series | 1.2.1 | 0.7.0 | 0.6.4 | 0.5.5 |
| Photon, P1 | 1.2.1 | 0.7.0 | 0.6.4 | 0.5.5 |
| Boron LTE, B Series SoM B402 | 1.5.2 | | | |

For example: Say you have an Electron running 1.5.2 and you want to downgrade it to 0.6.2 OTA. We don't actually recommend doing that, but if for some reason you had to, you would first need to downgrade to 1.2.1. Once that was completed, you would downgrade to 0.7.0. Then 0.6.4. Then finally 0.6.2, your desired target.

- For each required Device OS downgrade, download the binaries from the [Device OS releases](https://github.com/particle-iot/device-os/releases) page. 

- Flash the system parts in reverse order. Wait not only for the command to complete, but also for the device to come back online again. Using the Events page in the [console](https://console.particle.io) can be helpful for this.


#### Example: Downgrade Electron OTA

For example, say you want to downgrade device named "electron7" from 2.0.0 to 1.5.2 OTA:

- Flash your application targeting the older version of Device OS, or Tinker:

```
# Downgrade user firmware
particle flash electron7 tinker
```

- Flash system parts in reverse numerical order. This is generally 3, 2, 1 for the Electron and E Series. 2, 1 for Photon and P1. For Gen 3 devices, there is only 1 system part.

```
# Flash system parts in reverse order
particle flash electron7 electron-system-part3@1.5.2.bin

# Wait until spark/status online event is received
particle flash electron7 electron-system-part2@1.5.2.bin

# Wait until spark/status online event is received
particle flash electron7 electron-system-part1@1.5.2.bin
```

After each part, wait for the device to come back online. This is shown in the Events page in the [console](https://console.particle.io).

![Online event](/assets/images/online-event.png)

- Flash the bootloader.

```
particle flash electron7 electron-bootloader@1.5.2+lto.bin
```

- For Gen 3 devices, you may need to flash the SoftDevice.

- Your device should now be online and successfully downgraded.

### SWD/JTAG Device Restore

Using a SWD/JTAG debugger such as the Particle Debugger, ST-LINK, or Segger J-Link, plus 
[device restore images](/reference/developer-tools/jtag/#restore-binaries) make it restore a device to a known state or downgrade Device OS easily.

With some combinations of browsers, an upgraded Particle Debugger, and a Gen 3 device, you can also do a [JTAG Device Restore](/tools/device-restore/device-restore-jtag/) with no software or app install required.
