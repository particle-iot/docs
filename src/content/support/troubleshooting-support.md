---
title: Troubleshooting
template: support.hbs
columns: two
devices: [ photon, core ]
order: 3
---

#Common Troubleshooting Tips and References


## LED Colors (Explained)

### Setup Process

During initial setup of a device these are the usual LED specifications:

- **White pulse:** Start-up (happens when the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is first powered on or when it's reset)
- **Flashing blue:** Smart Config, waiting for Wi-Fi credentials
- **Solid blue:** Smart Config, received Wi-Fi credentials
- **Flashing green:** Connecting to local Wi-Fi network
- **Flashing cyan:** Connecting to Particle Cloud
- **High-speed flashing cyan:** Particle Cloud handshake
- **Breathing cyan:** Connected to Particle Cloud
- **Flashing magenta:** Receiving new firmware update over-the-air (OTA)

### Errors

Hopefully, you never see these colors but here are the error LED color codes:

- **Flash red twice:** Connection failure, no internet connection (technically, can't reach Google)
- **Flash red three times:** Connection failure, Cloud is unreachable
- **Orange flashing:** Connection failure, bad handshake


### Factory Reset & Bootloader

- **Solid white:** Factory reset started
- **High-speed flashing white:** Flashing code from factory reset memory
- **Flashing yellow:** Bootloader mode, waiting for code over USB or JTAG


##Device Management

###How do if find my device ID?

There are several ways to **find your {{#if photon}}Photon's{{/if}} {{#if core}}Core's{{/if}} device ID**, but the best method depends on whether or not your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} has already been claimed to your account.  We'll cover both scenarios in the section below.

**Note:** You do not need to know your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID to complete setup using the Particle smartphone app or over USB!  The {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID is most useful for debugging with the technical support team and building interactions with your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} through the Particle API.

**1. I haven't claimed my {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} yet!**

If you haven't claimed your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} yet, there are two ways for you to figure out your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID:

  1a. **Get your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ID using the Particle CLI** Make sure that you've got the Particle Command Line Interface (CLI) installed by typing ``particle``
into your terminal. 
You should see a help message that displays the various commands available to you.  Please make sure your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is in [Listening Mode](https://mtc.cdn.vine.co/r/videos/B75AACF6B91015398617940668416_154e6c92f81.4.3.1608668747173494282_V_AMvRCF0NS2Y_i_y0FdDV9ABtESHh9GR_VFKEu8Pn8Q3ZHYx9l32NfspugyWKJh.mp4?versionId=l_G0UVaqFXFSdJVxAeJ3.56M1HhVfO9S) (flashing blue), and type ``particle serial identify``.

Your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} should respond with it's {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID!

  1b. **Get your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID using CoolTerm, PuTTY, or screen** CoolTerm and PuTTY are programs for Mac and Windows, respectively, that allow you to communicate with your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} using the exposed serial lines.  You can find the download links for CoolTerm and PuTTY at the links attached--
  [CoolTerm](http://freeware.the-meiers.org/) & [PuTTy](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe). 

Plug your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} into your computer over USB. When the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is in Listening Mode (flashing blue), open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Once you've opened a serial connection, you have two commands at your disposal by hitting either w or i on the keyboard. Here's what they do:

- **w:** Set up your Wi-Fi SSID and password
- **i:** ("i" as in identify) Read out the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID

**2. I've already claimed my {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}!**

If you've already claimed your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}, finding your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID is a super simple process. You can still use either of the methods described above, but the easiest method is to look up your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID in the Particle Build IDE.

Follow these simple steps:

- Navigate your web browser to the [Particle Build IDE](https://build.particle.io/build).
- Click on the "{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}" icon in the bottom of the navigation pane
- Find the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} whose device ID you'd like to know, and click on the dropdown arrow on it's right
- The {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ID will be displayed in a box that reads, "device ID"
 

Great! Go forth with your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID and prosper.






##{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} Pinout Map & Datasheets

{{#if photon}}
Go to our Photon datasheets [collection](/datasheets/photon-datasheet/) to get an in-depth view of the Photon pinouts.
{{/if}}

{{#if core}}
Go to our Core datasheets [collection](/datasheets/core-datasheet/) to get an in-depth view of the Core's pinouts.
{{/if}}