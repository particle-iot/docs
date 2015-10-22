---
title: Troubleshooting Tools
template: support.hbs
columns: two
devices: [ photon, core ]
order: 9
---

# Troubleshooting Tools

Here are some tools to help you as you troubleshoot your Photon.

## Listening Mode Commands

{{#if photon}}
It is possible to put your Photon in [Listening Mode](/guide/getting-started/modes/photon/#listening-mode) to get some information about its system, version, and MAC address, and Device ID. You can even add Wi-Fi credentials with this method.
{{/if}}

{{#if core}}
It is possible to put your Core in [Listening Mode](/guide/getting-started/modes/core/#listening-mode) to get some information about its system, version, and MAC address, and Device ID. You can even add Wi-Fi credentials with this method.
{{/if}}

### Setup

#### For Windows

For Windows users, we recommend downloading [PuTTY](http://www.putty.org/). You will also need to download and install the [Particle driver](https://s3.amazonaws.com/spark-website/Particle.zip). 

Plug your device into your computer over USB. When the Core is in [Listening Mode](/guide/getting-started/modes/#listening-mode), open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1


#### For OS X or Linux

On OS X and Linux systems, you can access the serial monitor through the terminal.

For OS X, open the terminal and type:

```screen /dev/tty.u```

and pressing tab to autocomplete.

On Linux, you can accomplish the same thing by using:

```screen /dev/ACM```

and pressing tab to autocomplete.

Now you are ready to type some commands to get info about your device.



### Display MAC Address

To display the MAC address of your device, type `m`

This will give an output something like:

```
Your device MAC address is
1a:2b:34:5c:6d:78
```

Note that this does not work on unboxed photons unless they have firmware updated manually (e.g. via `particle update`)

### Get Device ID

To display the device ID of your Core or Photon, type `i`

This will give an output that looks like:

```
Your device id is 1a2345678912345678901234
```


### Display System Firmware Version

To get the system firmware version of your device, type `v`

This will give you an output indicating the [firmware](https://github.com/spark/firmware/blob/develop/CHANGELOG.md) that your device is using.

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

### Configure Wi-Fi

You can also configure your wifi using this method. The key for wifi configuration is `w`

The configuration process will be almost identical to the process laid out in the Particle CLI command `particle serial wifi`

## DFU Commands

{{#if core}}

If you can't get the CLI working, you may have to put your device in [DFU mode](/guide/getting-started/modes/core/#dfu-mode-device-firmware-upgrade-) and use [dfu-util](http://dfu-util.sourceforge.net/) to get some basic commands done. A list of DFU commands is below. To use these, you can download dfu-util via the above link, then go to the command line and run dfu-util with one of the following commands.

We don't recommend using these commands unless you're very comfortable with the platform or unless you've been instructed to do so by Particle Support or an Elite community member.

### Windows Setup

dfu-util works from the command line with OS X, but to use dfu-util on Windows, you'll need several drivers.

- First, you'll need to download and install the [Particle driver](https://s3.amazonaws.com/spark-website/Particle.zip).

- Once that is done, put your Photon in DFU mode.

- Then download the tar files for dfu-util [here](http://dfu-util.sourceforge.net/releases/dfu-util-0.8-binaries.tar.xz).

- You can unzip these files using a utility like [7-zip](http://www.7-zip.org/).

- After this, you should install [Zadig](http://zadig.akeo.ie/).

- Open Zadig and install WinUSB to your Particle device.

For a better illustrated version of these instructions, check out steps 1-5 of [Jon Gallant's tutorial](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

Now you are ready for DFU commands!

###Core DFU commands:

**User firmware**

`dfu-util -d 1d50:607f -a 0 -s 0x08005000 -D user-firmware.bin`

**Factory reset firmware**

`dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory-firmware.bin`

**Particle cloud public key**

`dfu-util -d 1d50:607f -a 1 -s 0x00001000 -D cloud_public.der`

**Device private key**

`dfu-util -d 1d50:607f -a 1 -s 0x00002000 -D device-private.der`

{{/if}}

{{#if photon}}

If you can't get the CLI working, you may have to put your device in [DFU mode](/guide/getting-started/modes/photon/#dfu-mode-device-firmware-upgrade-) and use [dfu-util](http://dfu-util.sourceforge.net/) to get some basic commands done. A list of DFU commands is below. To use these, you can download dfu-util via the above link, then go to the command line and run dfu-util with one of the following commands.

We don't recommend using these commands unless you're very comfortable with the platform or unless you've been instructed to do so by Particle Support or an Elite community member.

### Windows Setup

dfu-util works from the command line with OS X, but to use dfu-util on Windows, you'll need several drivers.

- First, you'll need to download and install the [Particle driver](https://s3.amazonaws.com/spark-website/Particle.zip).

- Once that is done, put your Photon in DFU mode.

- Then download the tar files for dfu-util [here](http://dfu-util.sourceforge.net/releases/dfu-util-0.8-binaries.tar.xz).

- You can unzip these files using a utility like [7-zip](http://www.7-zip.org/).

- After this, you should install [Zadig](http://zadig.akeo.ie/).

- Open Zadig and install WinUSB to your Particle device.

For a better illustrated version of these instructions, check out steps 1-5 of [Jon Gallant's tutorial](http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html).

###Photon DFU commands:

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


###P1 DFU commands:

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

{{/if}}