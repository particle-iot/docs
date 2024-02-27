---
title: R410 modem deprecation
layout: commonTwo.hbs
columns: two
---

# {{title}}

Due to the [global silicon chip shortage](https://www.particle.io/blog/how-we-are-supporting-our-customers-through-the-global-silicon-shortage/) causing the inability to obtain certain key components there will be some changes in the available product SKUs.

The u-blox SARA-R410M cellular modem (LTE Cat M1 for the United States, Canada, and Mexico) has become unavailable. This will require a change to the SARA-R510S-01B cellular modem. This will not require a change to your hardware, however it will require a Device OS update to version 2.3.0 or later.

The following SKUs are affected:

| Device | Old SKU | Replacement SKU |
| :--- | :--- | :--- |
| Boron | BRN404, BRN402 | BRN404X |
| B-Series SoM | B404, B402 | BRN404X |

## R510S Advantages

- u-blox long term support and roadmap stability
- 3GPP Release 14 LTE Cat M1 vs. Release 13 on the R410
- Additional band support

