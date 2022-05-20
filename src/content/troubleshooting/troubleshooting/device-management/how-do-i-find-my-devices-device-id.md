---
title: How Do I Find My Device's Device ID?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
There are several ways to **find the device ID of your Particle device**, but the best method depends on whether or not your device has already been claimed to your account. We'll cover both scenarios in the section below.

* [I Haven't Claimed My Device Yet](https://support.particle.io/hc/en-us/articles/360045422954#i-havent-claimed-my-device-yet)
* [I've Already Claimed My Device](https://support.particle.io/hc/en-us/articles/360045422954#ive-already-claimed-my-device)

**Note:** You do not need to know your device ID to complete setup using the Particle smartphone app or over USB! The device ID is most useful for debugging with the technical support team and building interactions with your through the Particle API.

## I Haven't Claimed My Device Yet!

If you haven't claimed your device yet, there are two ways for you to figure out your device ID:

**Get your ID using the Particle CLI** Make sure that you've got the Particle Command Line Interface (CLI) installed by typing `particle` into your terminal. You should see a help message that displays the various commands available to you. Please make sure your device is in [Listening Mode](https://mtc.cdn.vine.co/r/videos/B75AACF6B91015398617940668416%5F154e6c92f81.4.3.1608668747173494282%5FV%5FAMvRCF0NS2Y%5Fi%5Fy0FdDV9ABtESHh9GR%5FVFKEu8Pn8Q3ZHYx9l32NfspugyWKJh.mp4?versionId=l%5FG0UVaqFXFSdJVxAeJ3.56M1HhVfO9S) (flashing blue), and type `particle serial identify`.

Your device should respond with its device ID!

**Get your device ID using CoolTerm, PuTTY, or screen** CoolTerm and PuTTY are programs for Mac and Windows, respectively, that allow you to communicate with your using the exposed serial lines. You can find the download links for CoolTerm and PuTTY at the links attached-- [CoolTerm](http://freeware.the-meiers.org/) & [PuTTy](http://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html).

Plug your device into your computer over USB. When the device is in Listening Mode (flashing blue), open a serial port over USB using the standard settings, which should be:

* Baud rate: 9600
* Data Bits: 8
* Parity: none
* Stop Bits: 1

Once you've successfully opened a serial connection, you have two commands at your disposal by hitting either w or i on the keyboard. Here's what they do:

* **w:** Set up your Wi-Fi SSID and password
* **i:** ("i" as in identify) Read out the device ID

## I've Already Claimed My Device!

If you've already claimed your device, finding your device ID is a super simple process. You can still use either of the methods described above, but the easiest method is to look up your device ID in the Particle Build IDE.

Follow these simple steps:

* Navigate your web browser to the [Particle Build IDE](https://build.particle.io/build).
* Click on the "" icon in the bottom of the navigation panel.
* Find the device whose device ID you'd like to know, and click on the dropdown arrow on it's right.
* The ID will be displayed in a box that reads "device ID".

Alternatively, you can scan or read your device's QR code, obtaining its serial number, and hit the [identify via serial number endpoint](https://docs.particle.io/reference/device-cloud/api/#look-up-device-identification-from-a-serial-number), e.g. via cURL: `curl "https://api.particle.io/v1/serial_numbers/<serial_number>?access_token=$ACCESS_TOKEN"`.  
  
