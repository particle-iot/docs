---
title: Firmware Upgrades
layout: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 9
---

How do I upgrade my firmware?
===
{{#unless core}}

### The Simple Way (one CLI command)

If you are using the [Particle CLI](/guide/tools-and-features/cli) and have been able to use it successfully to login to your account, then you should be able to upgrade your device firmware and it will auto-update the CLI for you. Yeah I know, it's great right?!

*Requirements:* 
- dfu-util --> Install dfu-util on your Mac using: ```brew install dfu-util```
- [particle-cli](/guide/tools-and-features/cli)
- [Particle {{device}}](https://store.particle.io/?product=particle-{{deviceValue}}) 

**Step One:** 
- Put {{device}} into [DFU mode](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-) while being plugged into computer. {{#if has-cellular}}Make sure the antenna and battery are connected.{{/if}}

**Step Two:** 
- While {{device}} in [DFU mode](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-), issue `particle update` from the CLI and that's it! Your device should upgrade to the newest available firmware and you should be a happy camper!



### Manual Firmware Update 

*Note:* This will allow you to flash custom versions of firmware.

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/particle-iot/firmware/releases).

To upgrade your {{device}}, follow the instructions below:

-  Download the firmware binaries for the {{device}} from the latest release on GitHub. Scroll to the bottom of the page and download `system-part1-x.y.z-{{deviceValue}}.bin`, `system-part2-x.y.z-{{deviceValue}}.bin` and `system-part3-x.y.z-{{deviceValue}}.bin` (if available) where `x.y.z` is the firmware version number like 0.7.0.
   <https://github.com/particle-iot/firmware/releases/latest>

-  Install dfu-util

On a Mac type: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: http://brew.sh/

On Windows, dfu-util will be installed if you install the CLI through the [Windows CLI Installer](https://www.particle.io/cli).

On Ubuntu Linux, type: ```sudo apt install dfu-util```

-  Put {{device}} into DFU MODE, instructions [here](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-).

{{#if photon}}
-  Flash part1:

`dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-x.y.z-photon.bin`

-  Flash part2, unit should still be blinking yellow:

`dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-x.y.z-photon.bin`
{{/if}} {{!-- photon --}}

{{#if electron}}
-  Flash part1:

`dfu-util -d 2b04:d00a -a 0 -s 0x8060000 -D system-part1-x.y.z-electron.bin`

-  Flash part2, unit should still be blinking yellow:

`dfu-util -d 2b04:d00a -a 0 -s 0x8020000 -D system-part2-x.y.z-electron.bin`

-  Flash part3, unit should still be blinking yellow:

`dfu-util -d 2b04:d00a -a 0 -s 0x8040000:leave -D system-part3-x.y.z-electron.bin`
{{/if}} {{!-- electron --}}

-  Wait... Your device should eventually restart and start blinking blue, breathing cyan, or flashing green -- all dependent on if you've setup the device before.

{{else}}

### Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using [dfu-util](http://dfu-util.sourceforge.net/) and installing the [Particle CLI](/guide/tools-and-features/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.

{{/unless}}

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
