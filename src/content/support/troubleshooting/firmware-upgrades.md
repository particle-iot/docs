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

If you are using the [particle-cli](/guide/tools-and-features/cli) and have been able to use it successfully to login to your account, then you should be able to upgrade your device firmware and it will auto-update the CLI for you. Yeah I know, it's great right?!

*Requirements:* 
- dfu-util --> Install dfu-util on your Mac using: ```brew install dfu-util```
- [particle-cli](/guide/tools-and-features/cli)
- [Particle {{device}}](https://store.particle.io/?product=particle-{{deviceValue}}) 

**Step One:** 
- Put {{device}} into [dfu-mode](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-) while being plugged into computer. {{#if electron}}Make sure the antenna and battery are connected.{{/if}}

**Step Two:** 
- While {{device}} in [dfu-mode](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-), issue ```particle update``` from the CLI and that's it! Your device should upgrade to the newest available firmware and you should be a happy camper!



### Manual Firmware Update 

*Note:* This will allow you to flash custom versions of firmware.

If you do not have a Mac/Apple computer then you should not read the instructions below for a firmware upgrade. These are specifically for users who have MAC machines.

*For Windows* If you have a Windows machine, please follow [these instructions](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/spark/firmware/releases).

To upgrade your {{device}}, follow the instructions below:

-  Download the proper firmware binaries for the {{device}} linked below:
{{#if photon}}
      - [Part1](https://github.com/spark/firmware/releases/download/v0.5.3/system-part1-0.5.3-photon.bin)
      - [Part2](https://github.com/spark/firmware/releases/download/v0.5.3/system-part2-0.5.3-photon.bin)
{{/if}}
{{#if electron}}
      - [Part1](https://github.com/spark/firmware/releases/download/v0.5.3/system-part1-0.5.3-electron.bin)
      - [Part2](https://github.com/spark/firmware/releases/download/v0.5.3/system-part2-0.5.3-electron.bin)
{{/if}}

-  Install dfu-util on your Mac using: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: http://brew.sh/

-  Put {{device}} into DFU MODE, instructions [here](/guide/getting-started/modes/{{deviceValue}}/#dfu-mode-device-firmware-upgrade-).

{{#if photon}}
-  Flash part1:

`dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-0.5.3-photon.bin`

-  Flash part2, unit should still be blinking yellow:

`dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-0.5.3-photon.bin`
{{/if}}

{{#if electron}}
-  Flash part1:

`dfu-util -d 2b04:d00a -a 0 -s 0x8020000 -D system-part1-0.5.3-electron.bin`

-  Flash part2, unit should still be blinking yellow:

`dfu-util -d 2b04:d00a -a 0 -s 0x8060000:leave -D system-part2-0.5.3-electron.bin`
{{/if}}

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



**And of course**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

