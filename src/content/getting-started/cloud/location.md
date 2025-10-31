---
title: Location
columns: two
layout: commonTwo.hbs
description: Geolocation for Particle IoT devices
---

# {{title}}


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


## Supported devices

### Tracker devices

Tracker devices, including the Tracker One, Monitor One, and Tracker SoM include a built-in GNSS module, as well as supporting
Wi-Fi and cell tower geolocation and location fusion, if a GNSS lock is not available.

The Tracker configuration determines how often to send [`loc` events](/reference/cloud-apis/api/#tracker-location-events) containing the GNSS and Wi-Fi information. These location 
events are processed by the Particle cloud and stored in the historical location database and also can be processed by 
[integrations](/integrations/introduction/) (such as webhooks), [logic](/getting-started/logic-ledger/logic/), or on-device using [`loc-enhanced`](/reference/cloud-apis/api/#enhanced-location-events).

#### Tracker One

{{!-- BEGIN do not edit content below, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | GA |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | GA |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | GA |


{{!-- END do not edit content above, it is automatically generated --}}

#### Monitor One

{{!-- BEGIN do not edit content below, it is automatically generated 89024c15-a66e-466b-9449-48bc25856725 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | GA |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | GA |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | In development |


{{!-- END do not edit content above, it is automatically generated  --}}


### Other devices

Non-Tracker devices support geolocation in two different ways:

### Device vitals location (other than Tracker)

Devices typically upload [Device Vitals](/getting-started/console/device-vitals/) that includes information including the connected cellular tower information.

Device Vitals can be used to generate an approximate location of the device and is available on cellular, Wi-Fi, and Ethernet devices. On non-cellular devices, Device Vitals geolocation uses IP-address geolocation, so the location will not be precise.

On Sandbox and Basic plans, the Device Vitals location is updated once per week. 

On Enterprise plans, the location is updated when Device Vitals are updated and:
- The network identity has changed (new IP address or cell tower)
- Or at least one hour has passed since the last update

When calculating location from Device Vitals, `loc-enhanced` events are never sent. However, once you've enabled location storage in the console
you can use the [query location API](/reference/cloud-apis/api/#query-location-for-one-device-within-a-product) to find a device's location. For the 
free plan, there is no location history; it will only show the most recent location.

### loc events (other than Tracker)

On some plans, non-Tracker devices can upload `loc` events by using a software library or manually encoding the event JSON in the
[appropriate format](/reference/cloud-apis/api/#tracker-location-events).

For example, on M-SoM and B504 devices, the cellular modem also supports GNSS geolocation with an external antenna. 
On the M-SoM, Wi-Fi geolocation is also possible since it supports both cellular and Wi-Fi. This data can be formatted
as a `loc` event and used with location fusion on some plans.

If you send a `loc` event that contains coordinates (`lat`, `lon`) and a GNSS lock (`lck` is 1) on a non-Tracker device,
Location Fusion will not be done. If you do not have valid coordinates, but do have additional information, such as 
cell tower information or Wi-Fi access points, Location Fusion will be done, at a cost of {{dataOperationsForLocation}} data operations.
If location can be determined by Location Fusion, a `loc-enhanced` event will be generated.

The [LocationFusionRK](https://github.com/rickkas7/LocationFusionRK) can be used to provide Tracker-like location services non-Tracker devices.

### Non-Tracker devices with GNSS capabilities

#### M-SoM

{{!-- BEGIN do not edit content below, it is automatically generated 800c1260-a4d4-4c9a-a41c-a6f2993218ce --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | GA |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | GA |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | GA |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | GA |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | GA |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | GA |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | GA |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | In development |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | In development |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | In development |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

#### B504

{{!-- BEGIN do not edit content below, it is automatically generated 4507ee1f-212e-4638-8320-6e8d6d9f7873 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | GA |


{{!-- END do not edit content above, it is automatically generated  --}}

### Non-Tracker devices without GNSS capabilities

It is also possible to use an external hardware GNSS to determine location, though you will likely need to generate
your own `loc` events based on the hardware and library that you selected.

## Supported plans

### Sandbox

- Location via device vitals is refreshed once per week
- No location history is stored for non-Tracker devices
- Location fusion from `loc` events is supported for all devices
- For non-Tracker devices, `loc` events using location fusion (cellular or Wi-Fi geolocation) counts as {{dataOperationsForLocation}} data operations

### Basic

- Location via device vitals is refreshed once per week
- No location history is stored for non-Tracker devices
- Location Fusion from `loc` events is only supported for Tracker devices

### Enterprise

- Location via device vitals is refreshed as often as new vitals are published
- 1 month of location history for Pro, 6 months for Pro Plus
- Supports full location fusion from loc events, including advanced geolocation for Tracker and non-Tracker devices
- For non-Tracker devices, `loc` events using location fusion (cellular or Wi-Fi geolocation) counts as {{dataOperationsForLocation}} data operations

### Plan summary

{{!-- BEGIN shared-blurb 5b46fb4b-bac6-496d-8a0d-ca3e2ccf43b8 --}}
| | Sandbox | Basic | Enterprise |
| :--- | :---: | :---: | :---: |
| Device Vitals location | Once per week | Once per week | Every update |
| Location fusion | Yes | Tracker only | Yes |
| Non-tracker location history | None | None | 1 or 6 months |
{{!-- END shared-blurb --}}


## Location storage

Historical location data is stored for Tracker device on all plans. You must opt into location storage from the product settings page in the console
in the product settings panel.

On the free plan, you must enable location storage to be able to query the current location from the Particle cloud API, however the history will only ever contain one location; historical data is not saved on the free plan.

On enterprise plans, you can opt into location storage for non-Tracker devices, as well.

Location storage must be enabled to use the map view in the console.
