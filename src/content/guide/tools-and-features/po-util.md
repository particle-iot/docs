---
title: po-util
template: guide.hbs
columns: two
devices: [ photon,electron ]
order: 8
---
# Particle Offline Utility

<p align="center" >
<img src="http://po-util.com/logos/po-util-updated.svg" width="600px">
</p>

**Particle Offline Utility**, more commonly known as **po-util**, is a tool written by community member, [Nathan Robinson](https://github.com/nrobinson2000), that simplifies the installation and use of the Particle Toolchain so that new users can easily develop locally on Mac OSX and Ubuntu-based Linux Distributions.

## Features

**Po-util** features commands for:

* Installing the [ARM toolchain](https://launchpad.net/gcc-arm-embedded), [dfu-util](http://dfu-util.sourceforge.net/), [nodejs](https://nodejs.org/en/), [particle-cli](https://github.com/spark/particle-cli) and the [Particle firmware](https://github.com/spark/firmware)
* Building firmware and saving as a binary
* Building firmware and Flashing over USB using dfu-util
* Initializing a directory into a project folder
* Upgrade the System firmware on your {{device}}
* Uploading firmware with particle-cli
* Monitoring the serial output of your {{device}}
* Putting your {{device}} into DFU mode and getting your {{device}} out of DFU mode
* Quickly flashing pre-compiled code with dfu-util

## Download

You can download **po-util** from [GitHub](https://github.com/nrobinson2000/po-util), or install the latest version with:

```
curl po-util.com/download
```

## Examples

### Build firmware

{{#if photon}}
```BASH
po photon build
```
{{/if}}

{{#if electron}}
```BASH
po electron build
```
{{/if}}

### Build firmware and flash using dfu-util

{{#if photon}}
```BASH
po photon flash
```
{{/if}}

{{#if electron}}
```BASH
po electron flash
```
{{/if}}

### Upgrade system firmware

{{#if photon}}
```BASH
po photon upgrade
```
{{/if}}

{{#if electron}}
```BASH
po electron upgrade
```
{{/if}}

### Open serial monitor

```BASH
po serial
```

### Upload firmware Over the Air

{{#if photon}}
```BASH
po photon ota YOUR_DEVICE_NAME
```
{{/if}}

{{#if electron}}
```BASH
po electron ota YOUR_DEVICE_NAME
```
{{/if}}

# Support

Nathan Robinson can be contacted on the [Particle Forums](https://community.particle.io/users/nrobinson2000).

He can also be contacted on his personal [Slack](http://nrobinson2000.herokuapp.com/).
