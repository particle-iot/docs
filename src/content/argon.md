---
title: Argon
layout: landing.hbs
---

# Particle Argon: Wi-Fi + Bluetooth + Mesh
![Image of the Argon Kit](/assets/images/argon-kit-looped-antenna-docs-crop.jpg)

The Argon is a powerful Wi-Fi development kit that can act as a standalone Wi-Fi endpoint or Wi-Fi enabled gateway for Particle Mesh networks.

Based on the Nordic nRF52840, the Argon has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

{{box op="start" cssClass="boxedSideBySide"}}
**Tutorials**
- [Quick start](/quickstart/argon/)
- Starter project
- Code examples
{{box op="switch"}}
**Resources:**
- Code
- Gerber files
- Data sheets
- [Community](https://community.particle.io/c/mesh)
- Buy more
{{box op="end"}}

## Hardware specifications

{{box op="start"}}
### Main processor:

**Nordic Semiconductor nRF52840 SoC**
  - ARM Cortex-M4F 32-bit processor @ 64MHz
  - 1MB flash, 256KB RAM
  - IEEE 802.15.4-2006: 250 Kbps
  - Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps
  - 20 mixed signal GPIO (6 x Analog, 8 x PWM), UART, I2C, SPI
  - Supports DSP instructions, HW accelerated Floating Point Unit (FPU) calculations
  - ARM TrustZone CryptoCell-310 Cryptographic and security module
  - Up to +8 dBm TX power (down to -20 dBm in 4 dB steps)
  - NFC-A radio



### Argon Wi-Fi network coprocessor:

**Espressif ESP32-D0WD 2.4G Wi-Fi coprocessor**
  - On-board 4MB flash for the ESP32
  - 802.11 b/g/n support
  - 802.11 n (2.4 GHz), up to 150 Mbps


### Argon general specifications:
- On-board additional 4MB SPI flash
- Micro USB 2.0 full speed (12 Mbps)
- Integrated Li-Po charging and battery connector
- JTAG (SWD) Connector
- RGB status LED
- Reset and Mode buttons
- On-board 2.4GHz PCB antenna for Thread/BLE (does not support Wi-Fi)
- Two U.FL connectors for external antennas (one for Thread/BLE, another for Wi-Fi)

- Meets the [Feather specification](https://learn.adafruit.com/adafruit-feather/feather-specification) in dimensions and pinout
- FCC, CE and IC certified
- RoHS compliant (lead-free)
{{box op="end"}}
