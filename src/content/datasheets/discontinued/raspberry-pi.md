---
title: Raspberry Pi
layout: datasheet.hbs
columns: two
order: 20
---

# {{title}}

**The Particle Raspberry Pi project has been discontinued. You can still follow these instructions to configure, connect, and flash your Pi, but future new releases of the Particle Agent software are unlikely.**

## What do I do to get started?
Congratulations! You just received your confirmation email to the
Raspberry Pi beta, and you want to get your hardware connected to the
Particle Device Cloud. The first thing you should do is make sure you follow all of the instructions in our Getting Started guide for the Raspberry Pi, which is available [here](http://particle.io/start-pi). This tutorial will walk you through:
 - Setting up your Pi
 - Using the Particle mobile app
 - Using Particle's Web IDE
 - Several basic code examples

The [firmware reference](/reference/device-os/firmware/raspberry-pi/) is also available.

## Is connecting my Raspberry Pi to the Particle Device Cloud free?
Yes, it is free, for the first 25 Pi’s that you provision to your Particle Account. After that, you’ll have to create a product, which follows our standard product creator pricing, described on our [pricing page](http://particle.io/pricing).

## How can I tell if my Raspberry Pi is connected to the Cloud?
The Raspberry Pi does not have a status LED, which makes it more complicated to appreciate device state. Here are a few good ways to know what’s going on inside your Pi:

**“Online” indicator in Build.**   
Next to your Raspberry Pi’s device name, there will be a breathing cyan circle next to your device if it is connected to the Cloud and online.

**`sudo particle-agent logs`.**   
This will display the device status of your Raspberry Pi. It will tell you things like whether your device is connected to the Cloud, whether it successfully received OTA updates, whether it is running or kills your firmware binary, and tons of useful things like that.

**The Particle Console.**   
The Particle console is a useful tool that can improve the experience of developing on the Raspberry Pi. By default, your Pi will publish system status events when any of the following happen:
  - Device goes online
  - Device goes offline
  - OTA starts
  - OTA is completed
  - Device reboots

## Will the Particle software work on my Pi?

The Particle Pi software has been designed and primarily tested on the Raspberry Pi v3, but it will run on any Raspberry Pi device that has a connection to the Internet (Pi 1/2/3/Zero and Compute module).

Note that the pinouts and available GPIO for each version of the Raspberry Pi hardware is different. Please refer to the [Raspberry Pi datasheet](/datasheets/raspberrypi-datasheet) for more information about hardware compatibility with Particle development tools.

## Where can I learn more about the peripherals available on my Raspberry Pi?
[Pinout.xyz](http://pinout.xyz) is a great website that has an interactive pinout for the Raspberry Pi.


# Troubleshooting

## My Raspberry Pi is in a weird state.

The magical fix all for Raspberry Pi devices in weird firmware states is to re-run the following command:  
`sudo particle-agent setup`


## I’m having an issue using a library with my Raspberry Pi.

First things first, please let us know by contacting us via our [Support Portal](http://support.particle.io) or by posting in the [Community Forums](http://community.particle.io/c/raspberry-pi).

We’re working on widespread Library compatibility for the Raspberry Pi, but it's entirely possible we may not be there yet. It is  possible that many libraries do not work with the Raspberry Pi yet, given that the integration with the Particle ecosystem is still in _beta_. There may also be libraries that work on the Raspberry Pi v3 but do not work on the Raspberry Pi v1 do to differences between peripheral availability and GPIO configuration.

We will do our best to correct these issues and bring the Raspberry Pi hardware platform up to the same level of completeness as our other development kits. In the meantime, thanks for your patience!


## I’m having trouble installing Raspbian on my SD card.
I'm sorry to hear that! Fortunately, the Raspberry Pi Foundation has a bunch of great resources available to help you get your SD card formatted and your Pi connected to the Internet. You can find a bunch of those resources at the links below:

- [General docs](https://www.raspberrypi.org/documentation/)
- [Setup guide](https://www.raspberrypi.org/documentation/setup/)
- [Installing Raspbian](https://www.raspberrypi.org/documentation/installation/)
- [Hardware documentation](https://www.raspberrypi.org/documentation/hardware/)

