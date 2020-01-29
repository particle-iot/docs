---
title: Firmware Upgrades
layout: support.hbs
columns: two
redirects: true
order: 9
---

How do I upgrade my firmware?
===


## The Simple Way (one CLI command - recommended)

If you are using the [Particle CLI](/tutorials/developer-tools/cli) and have been able to use it successfully to login to your account, then you should be able to upgrade your device firmware and it will auto-update the CLI for you. Yeah I know, it's great right?!

- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- From a command prompt or terminal window, run the command:

```html
particle update
```


## Manual Firmware Update 

Install the [Particle CLI](/tutorials/developer-tools/cli) if you have not already done so.

### Argon, Boron, and Xenon

- Go to the [firmware release site](https://github.com/particle-iot/device-os/releases/tag/v1.2.1) and:
- Download the system-part1 for your device. For example: [boron-system-part1@1.2.1.bin](https://github.com/particle-iot/device-os/releases/download/v1.2.1/boron-system-part1@1.2.1.bin)
- Download Tinker for your device. For example: [boron-tinker@1.2.1.bin](https://github.com/particle-iot/device-os/releases/download/v1.2.1/boron-tinker@1.2.1.bin)
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb boron-system-part1@1.2.1.bin
particle flash --usb boron-tinker@1.2.1.bin
```

### Photon

- Go to the [latest firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.2.1.
- Download the system-part1 and system-part2 for your device, for example: photon-system-part1@1.2.1.bin and photon-system-part2@1.2.1.bin.
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb photon-system-part1@1.2.1.bin
particle flash --usb photon-system-part2@1.2.1.bin
```

### P1

- Go to the [latest firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.2.0.
- Download the system-part1 and system-part2 for your device, for example: p1-system-part1@1.2.1.bin and p1-system-part2@1.2.1.binn.
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb p1-system-part1@1.2.1.bin
particle flash --usb p1-system-part2@1.2.1.bin
```

### Electron and E Series

- Go to the [firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.2.0.
- Download the system-part1, part2, and part3. for your device, for example: electron-system-part1@1.2.1.bin, electron-system-part2@1.2.1.bin, electron-system-part3@1.2.1.bin. (The Electron and E series use the same system firmware.)
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb electron-system-part1@1.2.1.bin
particle flash --usb electron-system-part2@1.2.1.bin
particle flash --usb electron-system-part3@1.2.1.bin
```


## Full Firmware Upgrade (Spark Core only)

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using [dfu-util](http://dfu-util.sourceforge.net/) and installing the [Particle CLI](/tutorials/developer-tools/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.


For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
