---
title: Cloud Debug
layout: commonTwo.hbs
description: Tool for debugging cloud connection issues
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-protobuf, api-helper-usb, api-helper-extras, api-helper-tickets, usb-serial, debug-log, webdfu, zip]
---

# Cloud debug

Using the [Particle Web Device Doctor](/tools/doctor/) allows checking account and SIM status and enables other troubleshooting checks. However, if you only want to use the cloud debug firmware, you can do so by installing the firmware and viewing the data in the USB serial console.

## Automatic install

Automatic install is the easiest way to install the cloud debug firmware and Device OS (if necessary). If you prefer to install manually, see the instructions below.

{{> device-setup-usb mode="cloud"}}


## Viewing the results

To view the results in a web browser, use the [Debug log tool](/tools/developer-tools/debug-log/). The tool also helps decode some commands.

Or you can use the Particle CLI command:

```
particle serial monitor --follow
```

If you are interested in understanding the log output:

- [Interpreting cloud debug logs part 1](/troubleshooting/connectivity/interpreting-cloud-debug/)
- [Interpreting cloud debug logs part 2](/troubleshooting/connectivity/interpreting-cloud-debug-2/)

## Manual installation

You should use [Web Device Doctor](/tools/doctor/) as it is able to do both device-side and cloud-side checks from one user interface, but if you prefer to install manually or do not have a compatible browser or computer, you can flash appropriate binary below to your device manually.

The Particle CLI can flash the binary and Device OS as necessary:

```
particle flash --local firmware.bin
```

{{!-- BEGIN setup-firmware-list --}}
| Platform | Required Device OS |
| :--- | :--- |
| [Argon](/assets/files/docs-usb-setup-firmware/argon.bin) | 6.3.4 |
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

Note that the Device OS version is the minimum device OS version that must be installed to use that binary. It's OK if your device already has a newer version of Device OS. If your device has an older version of Device OS you should upgrade it first, or use the Web Device Doctor that will handle updating Device OS if necessary.
