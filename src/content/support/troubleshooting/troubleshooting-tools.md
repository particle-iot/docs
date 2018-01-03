---
title: Troubleshooting Tools
layout: support.hbs
columns: two
devices: [ photon,electron,core,raspberry-pi ]
order: 10
---

# Troubleshooting Tools

Here are some tools to help you as you troubleshoot your {{device}}.

{{#if has-listening}}

## Listening Mode Commands

It is possible to put your {{device}} in [Listening Mode](/guide/getting-started/modes/#listening-mode) to get some information about its system, version, and MAC address, and Device ID. {{#if has-wifi}}You can even add Wi-Fi credentials with this method.{{/if}}

### Setup

#### For Windows

For Windows users, we recommend downloading [PuTTY](http://www.putty.org/). You will also need to download and install the [Particle driver](https://github.com/particle-iot/windows-device-drivers/releases/download/v6.1.0.51/particle_drivers_6.1.0.51.exe).

Plug your device into your computer over USB. When the {{device}} is in [Listening Mode](/guide/getting-started/modes/#listening-mode), open a serial port over USB using the standard settings, which should be:

- Baud rate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1


#### For OS X or Linux

On OS X and Linux systems, you can access the serial monitor through the terminal.

For OS X, open the terminal and type:

```screen /dev/tty.u```

and pressing tab to autocomplete.

On Linux, you can accomplish the same thing by using:

```screen /dev/ttyACM```

and pressing tab to autocomplete.

Now you are ready to type some commands to get info about your device.

{{#if has-wifi}}
### Display MAC Address

To display the MAC address of your device, type `m`

This will give an output something like:

```
Your device MAC address is
1a:2b:34:5c:6d:78
```
{{/if}} {{!-- has-wifi --}}

### Get Device ID [deviceID] CLI method
_Using the Particle CLI_
* Put your device into [Listening Mode](/guide/getting-started/modes/#listening-mode) mode while being plugged into a computer via USB
* Issue `particle serial identify` from the [Particle CLI](/guide/tools-and-features/cli)
	and it should return the deviceID.

### Get Device ID

To display the device ID of your {{device}}, type `i`

This will give an output that looks like:

```
Your device id is 1a2345678912345678901234
```

{{#if has-cellular}}
The IMEI of the cellular modem will also be printed.
{{/if}} {{!-- has-cellular --}}

### Display System Firmware Version

To get the system firmware version of your device, type `v`

This will give you an output indicating the [firmware](https://github.com/particle-iot/firmware/blob/develop/CHANGELOG.md) that your device is using.

Sample output:

```
system firmware version: 0.4.6
```

### Display System Information

For debugging purposes, sometimes it helps to get a dump of all the system information. For this, you can press `s`

The output will be a big confusing mess, which is why most of the time you won't need to use it. Occasionally, though, Particle Support might ask you for it. It looks something like this:

```
{"p":6,"m":[{"s":16384,"l":"m","vc":30,"vv":30,"f":"b","n":"0","v":4,"d":[]},{"s":262144,"l":"m","vc":30,"vv":30,"f":"s","n":"1","v":7,"d":[]},{"s":262144,"l":"m","vc":30,"vv":30,"f":"s","n":"2","v":7,"d":[{"f":"s","n":"1","v":7,"_":""}]},{"s":131072,"l":"m","vc":30,"vv":30,"u":"5CC350CE567187492F6FA800655CECF42DCFE1236EC7E23CDB17ECBC1774EDAF","f":"u","n":"1","v":3,"d":[{"f":"s","n":"2","v":7,"_":""}]},{"s":131072,"l":"f","vc":30,"vv":0,"d":[]}]}
```

{{#if has-wifi}}
### Configure Wi-Fi

You can also configure your Wi-Fi using this method. The key for Wi-Fi configuration is `w`

The configuration process will be almost identical to the process laid out in the Particle CLI command `particle serial wifi`

{{/if}} {{!-- has-wifi --}}

{{/if}} {{!-- has-listening --}}

{{#if has-dfu}}

## DFU Commands

If you can't get the CLI working, you may have to put your device in [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-) and use [dfu-util](http://dfu-util.sourceforge.net/) to get some basic commands done. A list of DFU commands is below. To use these, you can download dfu-util via the above link, then go to the command line and run dfu-util with one of the following commands.

We don't recommend using these commands unless you're very comfortable with the platform or unless you've been instructed to do so by Particle Support or an Elite community member.

### Windows Setup

dfu-util works from the command line with OS X, but to use dfu-util on Windows, you'll need several drivers.

- First, you'll need to download and install the [Particle driver](https://github.com/particle-iot/windows-device-drivers/releases/download/v6.1.0.51/particle_drivers_6.1.0.51.exe).

- Once that is done, put your {{device}} in DFU mode.

- Then download the tar files for dfu-util [here](http://dfu-util.sourceforge.net/releases/dfu-util-0.8-binaries.tar.xz).

- You can unzip these files using a utility like [7-zip](http://www.7-zip.org/).

- After this, you should install [Zadig](http://zadig.akeo.ie/).

- Open Zadig and install WinUSB to your Particle device.

{{!-- Is this tutorial still relevant? --}}
For a better illustrated version of these instructions, check out steps 1-5 of [Jon Gallant's tutorial](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

Now you are ready for DFU commands!

{{#if core}}
### Core DFU commands:

**User firmware**

`dfu-util -d 1d50:607f -a 0 -s 0x08005000 -D user-firmware.bin`

**Factory reset firmware**

`dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory-firmware.bin`

**Particle cloud public key**

`dfu-util -d 1d50:607f -a 1 -s 0x00001000 -D cloud_public.der`

**Device private key**

`dfu-util -d 1d50:607f -a 1 -s 0x00002000 -D device-private.der`

{{/if}} {{!-- core --}}

{{#if photon}}

### Photon DFU commands:

**System Part 1**

`dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1.bin`

**System Part-2**

`dfu-util -d 2b04:d006 -a 0 -s 0x8060000 -D system-part2.bin`

**User firmware**

`dfu-util -d 2b04:d006 -a 0 -s 0x80A0000 -D user-firmware.bin`

**Factory reset firmware**

`dfu-util -d 2b04:d006 -a 0 -s 0x80E0000 -D factory-firmware.bin`

**Particle cloud public key**

`dfu-util -d 2b04:d006 -a 1 -s 2082 -D cloud_public.der`

**Device private key**

`dfu-util -d 2b04:d006 -a 1 -s 34 -D device-private.der`


### P1 DFU commands:

***

**System Part 1**

`dfu-util -d 2b04:d008 -a 0 -s 0x8020000 -D system-part1.bin`

**System Part-2**

`dfu-util -d 2b04:d008 -a 0 -s 0x8060000:leave -D system-part2.bin`

**User firmware**

`dfu-util -d 2b04:d008 -a 0 -s 0x80A0000 -D user-firmware.bin`

**Factory reset firmware**

`dfu-util -d 2b04:d008 -a 0 -s 0x80E0000 -D factory-firmware.bin`

**Particle cloud public key**

`dfu-util -d 2b04:d008 -a 1 -s 2082 -D cloud_public.der`

**Device private key**

`dfu-util -d 2b04:d008 -a 1 -s 34 -D device-private.der`

{{/if}} {{!-- photon --}}

{{#if electron}}

### Electron DFU commands:

{{!-- TODO: Verify for accuracy! --}}

**System Part 1**

`dfu-util -d 2b04:d00a -a 0 -s 0x8060000 -D system-part1.bin`

**System Part-2**

`dfu-util -d 2b04:d00a -a 0 -s 0x8020000 -D system-part2.bin`

**System Part-3**

`dfu-util -d 2b04:d00a -a 0 -s 0x8040000 -D system-part3.bin`

**User firmware**

`dfu-util -d 2b04:d00a -a 0 -s 0x8080000 -D user-firmware.bin`

**Factory reset firmware**

`dfu-util -d 2b04:d00a -a 0 -s 0x80A0000 -D factory-firmware.bin`

**Particle cloud public key**

`dfu-util -d 2b04:d00a -a 1 -s 3298 -D cloud_public.der`

**Device private key**

`dfu-util -d 2b04:d00a -a 1 -s 3106 -D device-private.der`


{{/if}} {{!-- electron --}}

{{/if}} {{!-- has-dfu --}}
