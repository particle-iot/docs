---
title: Debug log tool
layout: commonTwo.hbs
description: Device firmware inspection tool
includeDefinitions: [api-helper, api-helper-extras, debug-log]
---

# {{title}}

Debugging logs can help troubleshoot problems with devices.

The [Web Device Doctor](/tools/doctor/) flashes firmware to your device and monitors the logs. 

You can also monitor or decode logs using the tool below.

{{> debug-log }}

## Firmware

### Using your own firmware

You can add USB serial debugging to your own firmware using:

```
SerialLogHandler logHandler(LOG_LEVEL_TRACE);
```

You can then monitor the output using the tool above in Web Serial mode, or the Particle CLI `particle serial monitor`.

### Web device doctor firmware

You should really use [Web Device Doctor](/tools/doctor/) as it is able to do both device-side and cloud-side checks from one user interface, but if you prefer to install manually or do not have a compatible browser or computer, you can flash appropriate binary below to your device manually.

Note that the Device OS version is the minimum device OS version that must be installed to use that binary. It's OK if your device already has a newer version of Device OS. If your device has an older version of Device OS you should upgrade it first, or use the Web Device Doctor that will handle updating Device OS if necessary.

{{!-- BEGIN setup-firmware-list --}}
| Platform | Required Device OS |
| :--- | :--- |
| [Argon](/assets/files/docs-usb-setup-firmware/argon.bin) | 6.3.4 |
| [Asset Tracker / Monitor One](/assets/files/docs-usb-setup-firmware/tracker.bin) | 4.0.0 |
| [B-SoM](/assets/files/docs-usb-setup-firmware/bsom.bin) | 6.3.4 |
| [B5-SoM](/assets/files/docs-usb-setup-firmware/b5som.bin) | 6.3.4 |
| [Boron](/assets/files/docs-usb-setup-firmware/boron.bin) | 6.3.4 |
| [E-SoM-X](/assets/files/docs-usb-setup-firmware/esomx.bin) | 6.3.4 |
| [Electron](/assets/files/docs-usb-setup-firmware/electron.bin) | 3.3.1 |
| [M-SoM](/assets/files/docs-usb-setup-firmware/msom.bin) | 6.3.4 |
| [P1](/assets/files/docs-usb-setup-firmware/p1.bin) | 3.3.1 |
| [Photon](/assets/files/docs-usb-setup-firmware/firmware.bin) | 3.3.1 |
| [Photon](/assets/files/docs-usb-setup-firmware/photon.bin) | 3.3.1 |
| [Photon 2 / P2](/assets/files/docs-usb-setup-firmware/p2.bin) | 6.3.4 |
{{!-- END setup-firmware-list --}}

### Cloud debug firmware





