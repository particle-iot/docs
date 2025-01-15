---
title: Location
columns: two
layout: commonTwo.hbs
description: Enterprise Geolocation for Particle IoT devices
---

# {{title}} for Enterprise plans

This page discusses geolocation services on the enterprise plan. For additional information and other plans, see [getting started with location](/getting-started/cloud/location/).

## Geolocation methods

Particle Location Services can use the following geolocation methods:

{{!-- BEGIN shared-blurb 47267ac9-0ada-4300-9c07-71b68e532609 --}}
#### GNSS (GPS)
- Primary Method for Tracker devices
- High-precision (up to ~1.8 meters)
- Worst-case resolution can be up to ~500 meters in typical edge conditions

#### Wi-Fi geolocation
- Uses nearby Wi-Fi access point information and the Particle Geolocation service
- Typically high or medium accuracy (best case ~24 meters)
- Does not connect to the Wi-Fi access point; only passively collects public broadcast information

#### Cell tower scan
- Uses a database of cell tower identifiers
- Medium to low accuracy depending on the number of towers in the scan (could be 150 meters in good conditions or as poor as 10 km)
- Not supported on all cellular modems

#### Single cell tower geolocation
- Estimates the location from the single tower reported through device vitals
- Typically medium accuracy of ~1 km or more

#### IP-based geolocation
- Uses a device's public IP address to estimate approximate location
- Only used for Wi-Fi and Ethernet devices (not cellular)
- Typically low accuracy of ~5 km or more; can be quite coarse depending on the IP and service provider

#### Location fusion

Location fusion combines multiple geolocation methods to produce coordinates for a location, along with a circle of uncertainty.

For example, when using single cellular tower location, the device could be anywhere within the area served by that tower, 
which could be a circle several kilometers in diameter. 

This is represented as high (GNSS, some Wi-Fi), medium (cellular tower scan), 
or low (single tower or IP) in the console.
{{!-- END shared-blurb --}}


### Tracker devices

Tracker devices, including the Tracker One, Monitor One, and Tracker SoM include a built-in GNSS module, as well as supporting
Wi-Fi and cell tower geolocation and location fusion, if a GNSS lock is not available.

The Tracker configuration determines how often to send [`loc` events](/reference/cloud-apis/api/#tracker-location-events) containing the GNSS and Wi-Fi information. These location 
events are processed by the Particle cloud and stored in the historical location database and also can be processed by 
[integrations](/integrations/introduction/) (such as webhooks), [logic](/getting-started/logic-ledger/logic/), or on-device using [`loc-enhanced`](/reference/cloud-apis/api/#enhanced-location-events).

### Other devices

Non-tracker devices support geolocation in two different ways:

### Device vitals location (other than Tracker)

Devices typically upload [Device Vitals](/getting-started/console/device-vitals/) that includes information including the connected cellular tower information.

Device Vitals can be used to generate an approximate location of the device and is available on cellular, Wi-Fi, and Ethernet devices. On non-cellular devices, Device Vitals geolocation uses
IP-address geolocation, so the location will not be precise.

On Enterprise plans, the location is updated on all Device Vitals updates.

### loc events (other than Tracker)

On enterprise plans, non-Tracker devices can upload `loc` events by using a software library or manually encoding the event JSON in the
[appropriate format](/reference/cloud-apis/api/#tracker-location-events). Each non-Tracker location fusion request counts 
as {{dataOperationsForLocation}} data operations.

For example, on M-SoM and B504 devices, the cellular modem also supports GNSS geolocation with an external antenna. 
On the M-SoM, Wi-Fi geolocation is also possible since it supports both cellular and Wi-Fi. This data can be formatted
as a `loc` event and used with location fusion on some plans. Additional data operations charges may apply.

### Plan summary

{{!-- BEGIN shared-blurb 5b46fb4b-bac6-496d-8a0d-ca3e2ccf43b8 --}}
| | Sandbox | Basic | Enterprise |
| :--- | :---: | :---: | :---: |
| Device Vitals location | Once per week | Once per week | Every update |
| Location fusion | Yes | Tracker only | Yes |
| Non-tracker location history | None | None | 1 or 6 months |
{{!-- END shared-blurb --}}


## Location storage

Historical location data is stored for Tracker device on all plans. You must opt into location storage from the product settings page in the console.

On enterprise plans, you can opt into location storage for non-Tracker devices, as well.

Location storage must be enabled to use the map view in the console.



