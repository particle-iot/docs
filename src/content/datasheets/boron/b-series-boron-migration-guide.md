---
title: B Series from Boron Migration Guide
columns: two
layout: commonTwo.hbs
description: Learn about migrating from the Boron to the B Series
includeDefinitions: [api-helper, carrier-family-map]
---

# {{title}}

{{!-- BEGIN shared-blurb b69a2546-9baa-11ec-b909-0242ac120002 --}}
![B Series](/assets/images/b-series/b-series-top.png)

The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

One of the benefits is that many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

| Feature | Boron | B Series SoM | SoM Base Board | Tracker SoM |
| --- | :---: | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |&check; | 
| MFF2 SMD Particle SIM<sup>2</sup> | &check; | &check; | &nbsp; |&check; | 
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional | Optional |
| Status LED | &check; | &nbsp; | Optional | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional | Optional |
| Battery Connector | &check; | &nbsp; | Optional | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional | &check; | 

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

<sup>2</sup>The built-in Particle SIM card is [free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}



{{!-- BEGIN shared-blurb 97fa98d2-9baa-11ec-b909-0242ac120002 --}}
The available models include:

| Model | Region | EtherSIM | Bands | Replacement |
| :--- | :--- | :---: | :--- | :--- |
| B404X | United States, Canada, Mexico | &check; | LTE Cat M1 | |
| B524 | Europe, Australia, New Zealand | &check; | LTE Cat M1 | |
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Use B404X instead |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Use B404X instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Use B524 instead |

- The B404X, B404, and B402 cannot be used in Central or South America.
- The B524 is only recommended for use in Europe, Australia, and New Zealand.
- The B524 and B523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

{{> carrier-family-map family="b series"}}


- [B404X/B4404/B402 datasheet](/datasheets/boron/b402-datasheet/)
- [B524/B523 datasheet](/datasheets/boron/b523-datasheet/)
- [B Series evaluation board](/datasheets/boron/b-series-eval-board/)

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | GA |
| B404XMEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | GA |
| B404XMTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | GA |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | GA |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | GA |


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}
