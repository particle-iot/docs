---
title: Verizon FAQ
columns: two
layout: commonTwo.hbs
description: Verizon FAQ
---

# {{title}}

Particle is excited to announce that EtherSIM, our "it just works" SIM card embedded in all of our latest LTE Cat M-1 powered devices, now includes support for Verizon in the U.S.

Our goal at Particle is to reduce the barriers to bringing an IoT product to market by taking all of the technical complexity of an IoT product and packaging it into an IoT platform that "just works.” Our platform is secure, scalable, reliable, easy to use, easy to reprogram, and works for large-scale fleets of IoT products from large enterprises like Watsco and Jacuzzi, as well as individual prototypes on the workbenches of R&D engineers that will one day become products operating at scale.

Achieving seamless connectivity for Particle devices requires a significant amount of complexity behind the scenes, particularly for cellular-connected products that need to navigate the ever-changing and confusing landscape of telcos, SIM cards, and data plans to ensure reliable cellular connectivity. To address these hidden challenges, we launched our EtherSIM solution a few years back to provide one integrated connectivity solution that covers 150 countries, powered by over 350 carriers, using a multi-IMSI SIM that automatically switches to the best-performing network. 

In the U.S., EtherSIM has traditionally included AT&T and T-Mobile, which work well for most customers. However, for deployments in certain remote locations, we have found that Verizon is more trustworthy and reliable. That’s why we're excited to announce that EtherSIM now supports Verizon. Existing EtherSIM devices in the field and new ones to be shipped will automatically connect to the Verizon network when other networks are unavailable. 

With Verizon support, customers can now access all three major US carriers – AT&T, T-Mobile, and Verizon – using a single SIM, making it simpler to deploy IoT devices anywhere in the US with confidence. Whether you’re deploying emergency response systems in mountain areas with significant wildfire risk, measuring greenhouse gas emissions in the Permian Basin, or controlling irrigation for crop yield in California, Particle devices will automatically find the best and most reliable cellular network out-of-the-box. So, you can rest assured that your products will connect seamlessly and stay online without any hiccups.

## FAQ

### Which Particle customers are eligible to access the Verizon network?

All enterprise accounts will have access to the Verizon network, in addition to AT&T and T-Mobile.

### What Particle products have access to Verizon support?

Particle has an extensive portfolio of LTE-ready, Supply Secure devices in the US that have been thoroughly tested for Verizon reliability and performance, including:

| Model | Description | 
| :--- | :--- |
| B404 | B-Series LTE CAT-M1 (NorAm, EtherSIM) |
| B404X | B-Series LTE CAT-M1 (NorAm, EtherSIM) |
| B504E | B-Series LTE CAT-1 (NorAm, EtherSIM) |
| BRN404 | Boron LTE CAT-M1 (NorAm, EtherSIM) |
| BRN404X | Boron LTE CAT-M1 (NorAm, EtherSIM) |
| E404X | E-Series LTE CAT-M1 (NorAm, EtherSIM) |
| ELC404 | Electron LTE CAT-M1 (NorAm, EtherSIM) |
| M404M | M-Series LTE-M/2G (Global, EtherSIM) |
| M635EM | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM) |
| ONE404 | Tracker One LTE M1 (NorAm, EtherSIM) |
| T404 | Tracker SoM LTE M1 (NorAm, EtherSIM) |

### How will my fleet pick up Verizon?

Particle will enable it for eligible devices in your enterprise organization automatically, without any action required on your part.

### How does the device know which carrier to connect to?

The LTE Cat M1 devices listed above can connect to:

- AT&T
- T-Mobile
- Verizon

This is an ordered list, set by the mobile provider. In other words, Verizon is only used when there isn't an ability to connect to either AT&T or T-Mobile.

### Can I force a specific carrier?

You cannot override the priority list set by the mobile provider.

### Is there a Device OS version requirement?

At this time, an upgrade of Device OS is not generally required.

| Models | Device OS Version | Current recommendation |
| :--- | :--- | :--- |
| B404X, BRN404X, E404X | 4.x LTS | {{version mode="latestRelease" line="4"}} |
| B404, BRN404, ONE404, T404 | 4.x LTS recommended, 2.x LTS supported | {{version mode="latestRelease" line="4"}} |
| ELC404 | 2.x LTS | {{version mode="latestRelease" line="2"}} |

See [Recommended Device OS versions](/reference/device-os/versions/) for the current recommended versions for specific devices.

### Do I need a special antenna?

The antenna that your device was originally certified with can be used with Verizon without modification.

The table below lists the certified model numbers.

### Is additional certification required?

No additional certifications are required if you are using the antenna that the Particle device was certified. See the [antenna guide](/hardware/certification/antenna/) for more information.

If you are using a different antenna, and had previously undergone intentional radiator certification, but did not certify on B13 (700 MHz), you will need to recertify. AT&T uses B12 (700 MHz), not B13.

## Supported SKUs

{{!-- BEGIN do not edit content below, it is automatically generated 45d4d59b-d643-41d2-96ef-a7ec73124a9c --}}

| SKU | Description | Antenna | Antenna Alternative |
| :--- | :--- | :--- | :--- |
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | ANTCW2EA | &nbsp; |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | ANTCW2EA | &nbsp; |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | PARANTC41EA | ANT-FLXU |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | PARANTC41EA | ANT-FLXU |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | ANT-FLXU | &nbsp; |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | ANT-FLXU | &nbsp; |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | ANT-FLXU | &nbsp; |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | PARANTC41EA | ANT-FLXU |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | PARANTC41EA | ANT-FLXU |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | PARANTC41EA | ANT-FLXU |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | ANT-FLXU | PARANTC41EA |
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | ANT-FLXU | ANTCW2EA |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | PARANTCW1EA | ANT-FLXU |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | PARANTCW1EA | ANT-FLXU |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | PARANTCW1EA | ANT-FLXU |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | PARANTCW1EA | ANT-FLXU |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | PARANTCW1EA | &nbsp; |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | PARANTCW1EA | &nbsp; |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | 1 | &nbsp; |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | 1 | &nbsp; |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | 1 | &nbsp; |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | PARANTCW1EA | &nbsp; |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | PARANTCW1EA | &nbsp; |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | PARANTCW1EA | &nbsp; |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | PARANTCW1EA | &nbsp; |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | 1 | &nbsp; |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | 1 | &nbsp; |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | ANTCW2EA | &nbsp; |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | ANTCW2EA | &nbsp; |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | ANTCW2EA | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

<sup>1</sup> The cellular antenna for the Tracker One is inside the sealed unit and cannot be changed.
