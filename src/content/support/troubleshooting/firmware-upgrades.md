---
title: Firmware Upgrades
layout: support.hbs
columns: two
devices: [ photon,electron,core,argon,boron,xenon ]
order: 9
---

How do I upgrade my firmware?
===
{{#unless core}}


## The Simple Way (one CLI command)

**Warning:** The particle update command has not been updated to work with the Argon, Boron, and Xenon yet. Use the manual instructions below, instead.

If you are using the [Particle CLI](/tutorials/developer-tools/cli) and have been able to use it successfully to login to your account, then you should be able to upgrade your device firmware and it will auto-update the CLI for you. Yeah I know, it's great right?!

- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- From a command prompt or terminal window, run the command:

```html
particle update
```


## Manual Firmware Update 

Install the [Particle CLI](/tutorials/developer-tools/cli) if you have not already done so.

### Argon, Boron, and Xenon

- Go to the [mesh firmware releases page](https://github.com/particle-iot/device-os/releases/tag/v0.9.0).
- Download the hybrid .bin file for your device. For example: hybrid-0.9.0-argon.bin
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb hybrid-0.9.0-argon.bin
```

### Photon

- Go to the [latest firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.0.0.
- Download the system-part1 and system-part2 for your device, for example: system-part1-1.0.0-photon.bin and system-part2-1.0.0-photon.bin.
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb system-part1-1.0.0-photon.bin
particle flash --usb system-part2-1.0.0-photon.bin
```

### P1

- Go to the [latest firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.0.0.
- Download the system-part1 and system-part2 for your device, for example: system-part1-1.0.0-p1.bin and system-part2-1.0.0-p1.bin.
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb system-part1-1.0.0-p1.bin
particle flash --usb system-part2-1.0.0-p1.bin
```

### Electron and E Series

- Go to the [firmware releases page](https://github.com/particle-iot/device-os/releases/latest). At the time of writing, this was 1.0.0.
- Download the system-part1, part2, and part3. for your device, for example: system-part1-1.0.0-electron.bin, system-part2-1.0.0-electron.bin, and system-part3-1.0.0-electron.bin. (The Electron and E series use the same system firmware.)
- Put your device into DFU mode (blinking yellow), instructions [here](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-).
- Flash the code:

```html
particle flash --usb system-part1-1.0.0-electron.bin
particle flash --usb system-part2-1.0.0-electron.bin
particle flash --usb system-part3-1.0.0-electron.bin
```

{{else}}

## Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using [dfu-util](http://dfu-util.sourceforge.net/) and installing the [Particle CLI](/tutorials/developer-tools/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.

{{/unless}}

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
