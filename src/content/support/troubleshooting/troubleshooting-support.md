---
title: Device LED Codes
layout: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 2
---

Troubleshooting Common LED Codes
===

### LED Colors [(Explained)](/guide/getting-started/modes)

During initial setup of a device these are the usual LED specifications:

- **White pulse:** Start-up (happens when the {{device}} is first powered on or when it's reset)
{{#if has-wifi}}- **Blinking blue:** {{#if photon}}Listening Mode{{/if}}{{#if core}}Smart Config{{/if}}, waiting for Wi-Fi credentials{{/if}}
{{#if has-cellular}}- **Blinking blue:** Listening mode.{{/if}}
{{#if core}}- **Solid blue:** Smart Config, received Wi-Fi credentials{{/if}}
- **Blinking green:** Connecting to {{network-type}} network
- **Blinking cyan:** Connecting to Particle Device Cloud. Connected to the network, but not necessarily the internet yet.
- **High-speed blinking cyan:** Particle Device Cloud handshake
- **Breathing cyan:** Connected to Particle Device Cloud
- **Blinking magenta:** Receiving new firmware update over-the-air (OTA)
- **Breathing magenta** Safe mode, connected to Particle Device Cloud but user firmware not running

Further explained in our [Device Modes section](../../../../guide/getting-started/modes).

### Error Codes

Hopefully, you never see these colors but here are the error LED color codes:

- **Flash red twice:** Connection failure, no internet connection (technically, can't reach Google)
- **Flash red three times:** Connection failure, Cloud is unreachable
- **Orange blinking:** Connection failure, bad handshake

{{#if core}}

### Factory Reset & Bootloader

- **Solid white:** Factory reset started
- **High-speed blinking white:** Flashing code from factory reset memory
- **Blinking yellow:** Bootloader mode, waiting for code over USB or JTAG

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).

{{/if}}
