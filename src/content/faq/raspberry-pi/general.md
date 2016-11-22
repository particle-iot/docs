---
title: General Questions
template: faq.hbs
columns: two
order: 100
---

# {{title}}

## What do I do to get started?
Congratulations! You just received your confirmation email to the Raspberry Pi beta, and you want to get your hardware connected to the Particle Cloud. The first thing you should do is make sure you follow all of the instructions in our Getting Started guide for the Raspberry Pi, which is available [here](http://particle.io/start-pi). This tutorial will walk you through:
 - Setting up your Pi
 - Using the Particle mobile app
 - Using Particle's Web IDE
 - Several basic code examples

## Is connecting my Raspberry Pi to the Particle Cloud free?
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
