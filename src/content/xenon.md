---
title: Xenon
layout: landing.hbs
---

# Particle Xenon: Bluetooth + Mesh

![Image of the Xenon in a breadboard](/assets/images/xenon-breadboard-05.png)
The Xenon is a low cost mesh-enabled development kit that can act as either an endpoint or repeater within a Particle Mesh network.

Xenon is mesh only and designed to function as the endpoint of your IoT network. It is based on the Nordic nRF52840 and has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

The Xenon is best for connecting sensors, motors, pumps, valves, and points of data-interest. Pair it with an Argon or Boron gateway to get all that great data into the Device Cloud.


{{box op="start" cssClass="boxedSideBySide"}}
**Tutorials**
- [Quick start](/quickstart/xenon/)
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

### Xenon general specifications:
  - On-board additional 4MB SPI flash
  - Micro USB 2.0 full speed (12 Mbps)
  - Integrated Li-Po charging and battery connector
  - JTAG (SWD) Connector
  - RGB status LED
  - Reset and Mode buttons
  - On-board 2.4GHz PCB antenna for Thread/BLE
  - Meets the [Feather specification](https://learn.adafruit.com/adafruit-feather/feather-specification) in dimensions and pinout
  - FCC, CE and IC certified
  - RoHS compliant (lead-free)
  {{box op="end"}}
