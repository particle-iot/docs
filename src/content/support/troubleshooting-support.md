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

###How do if find my Device ID?

There are several ways to **find your Core ID**, but the best method depends on whether or not your Core has already been claimed to your account.  We'll cover both scenarios in the section below.

**Note:** You do not need to know your Core ID to complete setup using the Particle smartphone app or over USB!  The Core ID is most useful for debugging with the technical support team and building interactions with your Core through the Particle API.

	1. I haven't claimed my Core yet!

If you haven't claimed your Core yet, there are two ways for you to figure out your Core ID.  






##{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} Pinout Map & Datasheets

{{#if photon}}
Go to our Photon datasheets [collection](/datasheets/photon-datasheet/) to get an in-depth view of the Photon pinouts.
{{/if}}

{{#if core}}
Go to our Core datasheets [collection](/datasheets/core-datasheet/) to get an in-depth view of the Core's pinouts.
{{/if}}