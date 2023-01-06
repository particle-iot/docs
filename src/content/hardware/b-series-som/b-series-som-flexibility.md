---
title: Designing for B Series SoM flexibility
columns: two
layout: commonTwo.hbs
description: Designing for B Series SoM flexibility
---

# {{title}}

The B Series SoM is designed for the flexibility to switch between different models of the family with the same hardware and the same source code.

| Model | Platform | EtherSIM | Modem | Region |
| :--- | :--- | :---: | :--- | :--- |
| B404X | bsom | &check; | R510 | North America |
| B404 | bsom | &check; | R410 | North America |
| B402 | bsom | &nbsp; | R410 | North America |
| B524 | b5som | &check; | EG91-E | EMEAA |
| B523 | b5som | &nbsp; | EG9-E | Europe | 

## Questions and Answers

### Can the same software run across all devices?

The same source code can be used across all devices, however it must be compiled for each platform separately. Devices must also be divided into two separate products.

### Why are there two different platforms?

B Series SoM has two platforms, bsom and b5som, because the B4xx has a u-blox LTE Cat M1 cellular modem and the B5xx has a Quectel LTE Cat 1 with 2G/3G fallback cellular modem. These require sufficiently different code within Device OS itself that they require two different platforms. Device OS exposes a single cellular API that is the same across both cellular modems, so most user firmware is unaffected by the differences.

On the Tracker, for example, there is a single platform, which allows both source and binaries to be shared between the North America and EMEAA models, because both have Quectel cellular modems (BG96-MC and EG91-EX).

The Boron uses the u-blox R410 or R510 for North America, but only has a 2G/3G variation using the u-blox U201, so both cellular modems are u-blox.

### Is user firmware source code compatible across both devices?

Yes.

The only exception is if you use direct cellular modem commands using `Cellular.command()`. Some commands vary between u-blox and Quectel modems, so if you are using low-level access to the cellular modem you may need to use different code based on the platform. This is an unusual situation, however.


### Is it possible to use a single base board for both?

Yes, as long as you design the power supply to be compatible with the the B5xx:

- VCC: 3.6VDC - 4.2VDC @ 2A

The B5xx models (B524, B523) when running in 2G/3G mode require more current: 2A peak, vs. 500 mA peak for LTE Cat M1. You can, however design a single power supply circuit that services both models.

{{!-- BEGIN do not edit content below, it is automatically generated 28581230-6d89-4e9c-a7f7-7dcef556fb2b --}}

#### Module Pin 2 (VCC)
|   | B4xx SoM | B5xx SoM |
| :--- | :--- | :--- |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
#### Module Pin 4 (VCC)
|   | B4xx SoM | B5xx SoM |
| :--- | :--- | :--- |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
#### Module Pin 6 (VCC)
|   | B4xx SoM | B5xx SoM |
| :--- | :--- | :--- |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
#### Module Pin 8 (VCC)
|   | B4xx SoM | B5xx SoM |
| :--- | :--- | :--- |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |


{{!-- END do not edit content above, it is automatically generated --}}

### Do I need to certify both devices?

Since the models are used in different regions you would likely have to even if there was a single SoM. 

For example, if you use the standard Particle antenna you can often get by with only FCC unintentional radiator certification (Part 15 Subpart B). This is the least expensive of the certifications, and often can be SDoC (supplier's declaration of conformity), which is the least complicated of the filings. This is considerably less expensive than intentional radiator (Part 15 Subpart A) or other certifications like PTCRB.

Unintentional radiator testing makes sure that the completed assembly, including any components you have on your base board, do not emit spurious electromagnetic radiation.

| Region | Certification Required |
| :--- | :--- |
| United States, Mexico | FCC |
| Canada | IC |
| Europe, Australia, New Zealand | CE |
