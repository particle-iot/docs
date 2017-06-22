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
{{#if has-wifi}}- **Flashing blue:** {{#if photon}}Listening Mode{{/if}}{{#if core}}Smart Config{{/if}}, waiting for Wi-Fi credentials{{/if}}
{{#if has-cellular}}- **Flashing blue:** Listening mode.{{/if}}
{{#if core}}- **Solid blue:** Smart Config, received Wi-Fi credentials{{/if}}
- **Flashing green:** Connecting to {{network-type}} network
- **Flashing cyan:** Connecting to Particle Cloud. Connected to the network, but not necessarily the internet yet.
- **High-speed flashing cyan:** Particle Cloud handshake
- **Breathing cyan:** Connected to Particle Cloud
- **Flashing magenta:** Receiving new firmware update over-the-air (OTA)
- **Breathing magenta** Safe mode, connected to Particle Cloud but user firmware not running

Further explained in our [Device Modes section](../../../../guide/getting-started/modes).

### Error Codes

Hopefully, you never see these colors but here are the error LED color codes:

- **Flash red twice:** Connection failure, no internet connection (technically, can't reach Google)
- **Flash red three times:** Connection failure, Cloud is unreachable
- **Orange flashing:** Connection failure, bad handshake


### Factory Reset & Bootloader

- **Solid white:** Factory reset started
- **High-speed flashing white:** Flashing code from factory reset memory
- **Flashing yellow:** Bootloader mode, waiting for code over USB or JTAG

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
