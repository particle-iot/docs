---
title: B-Series SoM
layout: landing.hbs
description: Particle B-Series SoM, Gen 3 cellular and BLE mass-production module
---

# Particle B-Series SoM

**Cellular + Bluetooth in a M.2 SoM**

![Image of the B-Series SoM](/assets/images/b-series/b-series-top.png)

The B-Series is a powerful cellular-enabled system-on-a-module (SoM) designed for mass-production. It includes the Nordic nRF52840 and with support for cellular and Bluetooth LE.

{{box op="start" cssClass="boxedSideBySide"}}
  **Resources:**
- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B504 datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524/B523 Datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [Evaluation Board](/reference/datasheets/b-series/b-series-eval-board/)
- [Certification](/hardware/certification/certification/)
{{box op="switch"}}
**Learn more:**
- [Making your first SoM board](/hardware/som/som-first-board/)
- [More advanced SoM board](/hardware/som/basic-som-design/)
- [Community](https://community.particle.io/)
{{box op="end"}}

## Models

| Model | Modem | Technology | Supported Locations |
| :---- | :--- | :--- | :--- | 
| B404X | u-blox SARA R510S-01B | LTE Cat M1 | United States, Canada, Mexico | 
| B404  | u-blox SARA R410M-02B | LTE Cat M1 | United States, Canada, Mexico |
| B402  | u-blox SARA R410M-02B | LTE Cat M1 | United States, Canada, Mexico |
| B504  | Quectel EG91-NAX      | LTE Cat 1 with 3G fallback | Americas |
| B524  | Quectel EG91-E        | LTE Cat 1 with 3G and 2G fallback | EMEAA&dagger; |
| B523  | Quectel EG91-E        | LTE Cat 1 with 3G and 2G fallback | Europe |

&dagger; Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand.

<center>[Cellular carrier list](/reference/cellular/cellular-carriers/)</center>

## Hardware specifications:

{{box op="start"}}

### Main processor:

**Nordic Semiconductor nRF52840 SoC**

- ARM Cortex-M4F 32-bit processor @ 64MHz
- 1MB flash, 256KB RAM
- Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps
- 20 mixed signal GPIO (6 x Analog, 8 x PWM), UART, I2C, SPI
- Supports DSP instructions, HW accelerated Floating Point Unit (FPU) and encryption functions
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

<a href="https://store.particle.io/collections/cellular/products/boron-lte-cat-m1-noram-starter-kit-with-ethersim-brn404xkit" target="_blank" class="button">BUY A BORON</a>

</div>
-->

{{box op="end"}}
