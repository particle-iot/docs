---
title: Device LED Codes
template: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 2
---

Troubleshooting Common LED Codes
===

### LED Colors [(Explained)](/guide/getting-started/modes)

During initial setup of a device these are the usual LED specifications:

- **White pulse:** Start-up (happens when the {{device}} is first powered on or when it's reset)
- **Flashing blue:** {{#if photon}}Listening Mode{{/if}} {{#if core}}Smart Config{{/if}}, waiting for Wi-Fi credentials
{{#if core}}- **Solid blue:** Smart Config, received Wi-Fi credentials{{/if}}
- **Flashing green:** Connecting to local Wi-Fi network
- **Flashing cyan:** Connecting to Particle Cloud
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

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}






