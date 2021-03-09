---
title: B Series SoM
layout: landing.hbs
description: Particle B Series SoM, Gen 3 cellular and BLE mass-production module
---

# Particle B Series SoM

**Cellular + Bluetooth in a M.2 SoM**

![Image of the B Series SoM](/assets/images/b-series/b-series-top.png)

The B Series is a powerful cellular-enabled system-on-a-module (SoM) designed for mass-production. It includes the Nordic nRF52840 and with support for cellular and Bluetooth LE.

{{box op="start" cssClass="boxedSideBySide"}}
  **Resources:**
- [B402 Datasheet](/datasheets/boron/b402-datasheet/)
- [B523 Datasheet](/datasheets/boron/b523-datasheet/)
- [Evaluation Board](/datasheets/boron/b-series-eval-board/)
- [Certification](/datasheets/certifications/certification)
{{box op="switch"}}
**Learn more:**
- [Making your first SoM board](/tutorials/hardware-projects/som-first-board/)
- [More advanced SoM board](https://docs.particle.io/datasheets/app-notes/an001-basic-som-design/)
- [Community](https://community.particle.io/)
- [Support](https://support.particle.io/hc/)
{{box op="end"}}

## Models

| B402 | B523 |
| :--- | :--- |
| u-blox SARA R410M-02-B | Quectel EG91-E | 
| LTE Cat M1 | LTE Cat 1 with 3G and 2G fallback |
| 3GPP LTE Cat M1 Release 13 | 3GPP E-UTRA Release 13  |
| LTE Cat M1 bands: 2, 3, 4, 5, 8, 12, 13, 20, 28 | LTE Cat 1 bands: 1, 3, 7, 8, 20, 28A |
| Supported in the US, Canada, and Mexico only | Support for Europe only at this time |

<center>[Cellular carrier list](/tutorials/cellular-connectivity/cellular-carriers/)</center>

## Hardware specifications:

{{box op="start"}}

### Main processor:

**Nordic Semiconductor nRF52840 SoC**

- ARM Cortex-M4F 32-bit processor @ 64MHz
- 1MB flash, 256KB RAM
- Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps
- 20 mixed signal GPIO (6 x Analog, 8 x PWM), UART, I2C, SPI
- Supports DSP instructions, HW accelerated Floating Point Unit (FPU) calculations
- ARM TrustZone CryptoCell-310 Cryptographic and security module
- Up to +8 dBm TX power (down to -20 dBm in 4 dB steps)
- NFC-A radio

### General specifications:

- M.2 NGFF 67-pin connector to your base board
- Up to +8 dBm TX power (down to -20 dBm in 4 dB steps)
- NFC-A tag (requires external antenna)
- On-board additional 4MB SPI flash
- MFF2 SMD Particle SIM card
- U.FL connectors for external cellular and Bluetooth antennas
- FCC and PTCRB certified
- RoHS compliant (lead-free)

<!--
<div align="center">
<br />

<a href="https://store.particle.io/products/boron-lte" target="_blank" class="button">BUY A BORON</a>

</div>
-->

{{box op="end"}}
