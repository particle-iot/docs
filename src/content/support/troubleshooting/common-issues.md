---
title: Common Issues
template: support.hbs
columns: two
devices: [ photon, core ]
order: 1
---

# Common Issues

This section goes over the most common issues we've seen recently with device setup. We expect that many of these issues will be resolved in upcoming releases, but for now here his some info.

Sometimes your device can get into an unexpected state and it won't behave the way you expect. Here's what you might be able to do to resolve your issue!

{{#if photon}}

## Breathing Magenta

Photons that have been interrupted mid-firmware update often breathe magenta (defaulting to Safe Mode) to avoid running faulty firmware. To solve this issue, you can update your firmware manually.

### Manual Firmware Update

If you do not have a Mac/Apple computer then you should not read the instructions below for a firmware upgrade. These are specifically for users who have MAC machines.

*For Windows* If you have a Windows machine, please follow [these instructions](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/spark/firmware/releases).

To upgrade your Photon, follow the instructions below:

-  Download the proper firmware binaries for the Photon linked below:
      - [Part1](https://github.com/spark/firmware/releases/download/v0.4.6.1/system-part1-0.4.6-photon.bin)
      - [Part2](https://github.com/spark/firmware/releases/download/v0.4.6.1/system-part2-0.4.6-photon.bin)

-  Install dfu-util on your Mac using: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: http://brew.sh/

-  Put photon into DFU MODE, instructions [here](https://docs.particle.io/guide/getting-started/modes/photon/#dfu-mode-device-firmware-upgrade-).

-  Flash part1:
```dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-0.4.6-photon.bin```

-  Flash part2, unit should still be blinking yellow:
```dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-0.4.6-photon.bin```

-  Wait... Your device should eventually restart and start blinking blue, breathing cyan, or flashing green -- all dependent on if you've setup the device before.


## Flashing Cyan

If your Photon is flashing cyan and sometimes orange/red without connecting, it is helpful to first try to manually update your firmware, in the same way as listed as above. If this does not work, then move on to a key reset.

### Manual Firmware Update

If you do not have a Mac/Apple computer then you should not read the instructions below for a firmware upgrade. These are specifically for users who have MAC machines.

*For Windows* If you have a Windows machine, please follow [these instructions](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/spark/firmware/releases).

To upgrade your Photon, follow the instructions below:

-  Download the proper firmware binaries for the Photon linked below:
      - [Part1](https://github.com/spark/firmware/releases/download/v0.4.6.1/system-part1-0.4.6-photon.bin)
      - [Part2](https://github.com/spark/firmware/releases/download/v0.4.6.1/system-part2-0.4.6-photon.bin)

-  Install dfu-util on your Mac using: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: http://brew.sh/

-  Put photon into DFU MODE, instructions [here](https://docs.particle.io/guide/getting-started/modes/photon/#dfu-mode-device-firmware-upgrade-).

-  Flash part1:
```dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-0.4.6-photon.bin```

-  Flash part2, unit should still be blinking yellow:
```dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-0.4.6-photon.bin```

-  Wait... Your device should eventually restart and start blinking blue, breathing cyan, or flashing green -- all dependent on if you've setup the device before.


###Public Key Reset

Sometimes, a firmware upgrade will not be enough to solve your Photon's problem. If your are still having an issue, and particularly **if your photon is flashing cyan and sometimes orange/red without connecting**, It's time to try resetting the public key.

- **If you haven't ever claimed the device before:**
You will need [dfu-util](http://dfu-util.sourceforge.net/). Install it, then download the [this file](https://s3.amazonaws.com/spark-website/cloud_public.der).
Use the command line to navigate to that file.
Run the following command:
`dfu-util -d 2b04:d006 -a 1 -s 2082 -D cloud_public.der`
This should reset your public key.

- **If you claimed the device previously:**
You need the [CLI](https://docs.particle.io/guide/tools-and-features/cli/). Once it is installed, run:
`particle keys server cloud_public.der`
`particle keys new photon`
`particle keys load photon.der`
`particle keys send photon.pub.pem`
This should reset your public key.

{{/if}}

## Flashing Green

If your device is flashing green without connecting, there are a few things to check immediately.

### Wi-Fi network requirements

Your device works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured), with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the device will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The device can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the devices to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex Networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.

{{#if core}}

### Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using [dfu-util](http://dfu-util.sourceforge.net/) and installing the [Particle CLI](/guide/tools-and-features/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.

{{/if}}

Check out [connection help](/support/troubleshooting/connection-help) for more info.