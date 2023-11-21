---
title: Hardware overview
columns: two
layout: commonTwo.hbs
description: Learn about selecting the right hardware for your project
includeDefinitions: [api-helper, carrier-family-map]
---

# {{title}}

*Finding the right Particle hardware for your project*

- If you want an off-the-shelf, complete device with little or no hardware design required, see [off-the-shelf complete](#off-the-shelf-complete) gateways, below.
- One way to start finding the right device is whether you're a hobbyist, prototyping, or producing a product. To start there, see [prototype or production](#prototype-or-production) below.
- Another way to start is by deciding on [cellular or Wi-Fi](#cellular-or-wi-fi) first.


## Off-the-shelf complete

Particle gateway devices contain a cellular communication module in an enclosure with the required antennas and certification. A waterproof connector makes it easy to add external sensors and devices that communicate over protocols such as CAN bus, serial, and I2C. 

### Tracker One

If you want an off-the-shelf device can requires little or no hardware design, the [Tracker One](/reference/datasheets/tracker/tracker-one/) is a complete system with a waterproof IP67-rated enclosure. In includes cellular connectivity, GNSS (GPS) and Wi-Fi geolocation, and motion detection.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | GA |


{{!-- END do not edit content above, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

The Tracker One is fully assembled and sealed; all you need to do is plug it in to wake it from shipping mode and you can immediately begin using it with no programming or assembly necessary!

Included inside the fully assembled, sealed enclosure:

- Built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- 2000 mAh LiPo battery.
- Cellular antenna.
- Wi-Fi antenna (for geolocation only, not for connectivity).
- BLE antenna.
- GNSS (GPS) antenna.
- NFC tag antenna.
- Power by USB-C or an external power supply.
- NorAm: North America including the United States, Canada, and Mexico.
- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.

#### Country compatibility - Tracker

{{> carrier-family-map family="tracker"}}

#### M8 Expansion - Tracker One

![M8 Sensor Temperature/Humidity](/assets/images/tracker/m8-temp-humidity.png)

If you are interested in measuring temperature and humidity, an [external sensor](/hardware/tracker/m8-temperature-humidity/) can be connected to the M8 connector. The connector maintains the waterproof rating when in use.

[Custom solutions](/hardware/tracker/tracker-one-expansion/) can be implemented via an M8 connector as well. 

{{!-- BEGIN do not edit content below, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| M8CABEA | M8 Accessory Cable (Straight), [x1] | GA |
| M8CABRAEA | M8 Accessory Cable (Right Angle), [x1] | GA |
| M8CABRATY | M8 Accessory Cable (Right Angle), [x40] | GA |
| M8CABTY | M8 Accessory Cable (Straight), [x40] | GA |
| M8CONNEA | M8 Connector (Straight), [x1] | GA |
| M8CONNTY | M8 Connector (Straight), [x40] | GA |
| M8TEMPHUMIEA | M8 Sensor Temperature/Humidity (Straight), [x1] | GA |
| M8TEMPHUMITY | M8 Sensor Temperature/Humidity (Straight), [x40] | GA |
| M8CAB3VEA | M8 Accessory Cable 3.3V Power, 3.3V Logic (Straight), [x1] | In development |
| M8CAB3VTY | M8 Accessory Cable 3.3V Power, 3.3V Logic (Straight), [x40] | In development |


{{!-- END do not edit content above, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}

### Monitor One

The Monitor One has the same cellular and processor module (Tracker SoM), but is enclosed in a heavy duty waterproof enclosure that is large enough to contain expansion cards.

The [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/) is available and a limited number of developer preview units are currently available. 

## Prototype or production

### Prototyping

For easy prototyping, devices with pins on the bottom can easily be installed in a solderless breadboard. 

![Breadboard](/assets/images/beyond-prototyping/bread1.jpg)

The Photon 2, Argon, and Boron use the Adafruit Feather form-factory so easily add accessories like sensors and displays, with no wiring required.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

Even though these devices are ideal for prototyping, you can also scale with the Photon 2 and Boron BRN404X. For example, you may mount the device in a socket in your own custom circuit board when you're ready to scale, instead of using solderless breadboards or off-the-shelf Feather adapters.

There are also evaluation kits for the B Series SoM, Tracker SoM, and E Series modules that can be used for prototyping with those modules.

If you're not sure whether you want cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

- The Argon has been deprecated and has been replaced by the Photon 2. For the differences, see the [Argon to Photon 2 migration guide](/hardware/migration-guides/photon-2-argon-migration-guide/).
- The Boron 2G/3G (BRN314KIT) has been deprecated (along with all other 2G/3G SKUs) as the u-blox SARA-U201 cellular modem module on it is end-of-life.
- The Boron LTE Cat M1 (BRN404KIT or BRN404X) is the recommended model for the United States, Canada, and Mexico.
- Can be powered by USB, rechargeable LiPo battery, or an external power supply.
- All Boron devices include a built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- Starter kits include a mini-breadboard, USB cable, two resistors (220 ohm), one red LED, and one phototransistor.
- ARG-STRTKT includes a variety of [Grove](/reference/datasheets/accessories/gen3-accessories/#grove-starter-kit) sensors and a display.
- A battery is included with the Boron 2G/3G (BRN314) as the cellular modem uses more power for brief periods of time than a standard laptop USB port will supply.


{{!-- BEGIN do not edit content below, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

| SKU | Description | Region | Battery Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &nbsp; | GA |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Global | &nbsp; | GA |
| PHN2KIT | Photon 2, Kit [x1] | Global | &nbsp; | GA |
| PHN2MEA | Photon 2 [x1] | Global | &nbsp; | GA |


{{!-- END do not edit content above, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

There are numerous ways to expand Gen 3 devices:

- [Adafruit FeatherWing](/hardware/expansion/feather/) compatible modules can add things like displays, sensors, relays, with no wiring necessary.
- [SparkFun Qwiic](/hardware/expansion/qwiic/) and Adafruit Stemma-QT modules provide a way to add features connected by a small I2C cable. Multiple modules can be chained together, as well.
  - Environment sensors (pressure, temperature, humidity) like the BME280
  - Buttons and indicator buttons
  - Load cell adapter (weight sensor)
  - Distance and proximity sensors
  - Thermocouple adapters
  - Relays
  - Keypads
  - Small displays
- [Grove](/reference/datasheets/accessories/gen3-accessories/#grove-starter-kit) sensors and displays connect to digital, analog, I2C, and serial devices with a simple 4-pin cable.
- [Mikroe](/hardware/expansion/mikroe/) has a large number of expansion boards for both Feather and M.2 SoM devices.


Its also possible to prototype with these easy to use modules, then include the same functionality on a custom board later. The Adafruit and SparkFun designs are all open-source and include hardware design files for EagleCAD.

The [Beyond Prototyping Tutorial](/hardware/expansion/beyond-prototyping/) shows examples of how you can move from prototyping to custom circuit boards, with example designs.

For more information about the Boron, see [Cellular](#boron-prototyping-gen-3-cellular-) below.

For more information about the Photon 2 and Argon, see [Wi-Fi](#argon-prototyping-gen-3-wi-fi-) below.

### Production

When producing at scale, you may prefer to use devices that you reflow solder to your own base board (E Series, P2, P1, and Tracker SoM) or securely mount in a M.2 socket (B Series SoM).

If you're not sure whether you want cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

While you can use prototyping devices at scale, if you will be needing devices over a long period of time, production devices will generally be maintained for a longer period of time. For example, the Electron (prototyping) was discontinued before the E Series (production), even though both have similar hardware.

The software for prototyping and production devices is similar. It's often possible to use a single code base to work with both types of modules. And, in many cases, across both Gen 2 and Gen 3 devices, or across both cellular and Wi-Fi devices.

For best compatibility in the future we recommend designing around the M.2 (B Series SoM) form-factor, which is a better size to accommodate future communication modules. The Feather (Boron) form-factor is too narrow to fit cellular modules like the EG91 LTE Cat M1 module used in the B Series SoM B524.

#### B Series SoM (Gen 3 Cellular)

![B Series](/assets/images/b-series/b-series-top.png)

{{!-- BEGIN shared-blurb b69a2546-9baa-11ec-b909-0242ac120002 --}}
The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

Many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

Additionally, the extra width vs. the Boron (Adafruit Feather) form-factor makes it possible to include a LTE Cat 1 with 2G/3G fallback cellular modem, such as the Quectel EG91-E on the B524. This modem is too wide to fit on a Boron.

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

<sup>2</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}

For more information about the B Series SoM, see [Cellular - B Series SoM](#b-series-som-production-gen-3-cellular-) below.


#### Tracker SoM (Gen 3 Cellular)

{{!-- BEGIN shared-blurb 875eaa26-9bab-11ec-b909-0242ac120002 --}}
![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- PMIC and fuel gauge chips (charger and battery level sensor)
- Hardware watchdog
{{!-- END shared-blurb --}}

For more information about the Tracker SoM, see [Cellular - Tracker SoM](#tracker-gen-3-cellular-) below.


#### E Series (Gen 2 Cellular)

{{!-- BEGIN shared-blurb 58d445bc-9bab-11ec-b909-0242ac120002 --}}
![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series modules are generally 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.

- The E310, E313, and E314 are deprecated due to the end-of-life of the u-blox SARA-U201 cellular modem module.
- The E402 and E404 has been replaced by the E404X. Note, however, that this is not a drop-in replacement as there are significant differences between these two modules. See the [E404X migration guide](/hardware/migration-guides/e404x-migration-guide/) for more information.
- New designs should use the B Series M.2 SoM instead of the E Series form-factor.

| Feature | Electron | E Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM<sup>1</sup> | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |

<sup>1</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}

For more information about the E Series module, see [Cellular - E Series](#e-series-production-gen-2-cellular-) below.

#### P2 (Wi-Fi)

<div align="center"><img src="/assets/images/p2-rendering.png" width="200"></div>

The P2 module is a Wi-Fi module that you reflow solder to your own custom base board. It's smaller and less expensive than the Argon. 

Both the P1 and Argon are deprecated, as designs should either use the Photon 2 (which includes the P2 module on it), or directly use the P2.

{{!-- BEGIN shared-blurb 6383e77a-9baa-11ec-b909-0242ac120002 --}}
| Feature | P1 | P2 | Argon | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| | Production | Production | Prototyping | Prototyping |
| Style | SMD module | SMD module | Bottom pins | Bottom pins |
| Integrated Wi-Fi antenna | &check; | &check; | | &check; |
| U.FL Antenna Connector | &check; | &check; | &check; | &check; |
| Configuration via | Wi-Fi | BLE | BLE | BLE |
| Enterprise Wi-Fi | &check; | &check; | | &check; |
| USB Connector | Optional | Optional | &check; | &check; |
| Status LED | Optional | Optional | &check; | &check; |
| Reset and Mode Buttons | Optional | Optional | &check; | &check; |
| LiPo Battery Connector | | | &check; | &check; | 
| Size | 28mm x 20mm | 28mm x 20mm | 51mm x 23mm |51mm x 23mm |
|      | 1.1" x 0.8" | 1.1" x 0.8" | 2.0" x 0.9" | 2.0" x 0.9" |
{{!-- END shared-blurb --}}

For more information about the Wi-Fi modules, see [Wi-Fi - P1](/#p1-production-gen-2-wi-fi-) below.

#### P1 (Gen 2 Wi-Fi)

<div align="center"><img src="/assets/images/p1-vector.png" width="200"></div>

The P1 module has been deprecated and is replaced by the P2 module, which is mostly pin-compatible. See the [P2 from P1 migration guide](/hardware/migration-guides/p2-p1-migration-guide/) for more information.

For more information about the Wi-Fi modules, see [Wi-Fi - P1](/#p1-production-gen-2-wi-fi-) below.



## Cellular or Wi-Fi

A common question to start with is how you want to connect to the Internet.

### Cellular

While cellular hardware is initially more expensive, the total cost to onboard a customer with cellular may be lower due to the other expenses involved in Wi-Fi deployments:

- No requirement to provide a method of configuring Wi-Fi credentials, such as a custom mobile app
- No dependence on the customer's Wi-Fi network, which may be inconsistent 
- No troubleshooting site-specific Wi-Fi configuration issues


#### B Series SoM (Production Gen 3 cellular)

![B Series](/assets/images/b-series/b-series-top.png)

{{!-- BEGIN shared-blurb b69a2546-9baa-11ec-b909-0242ac120002 --}}
The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

Many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

Additionally, the extra width vs. the Boron (Adafruit Feather) form-factor makes it possible to include a LTE Cat 1 with 2G/3G fallback cellular modem, such as the Quectel EG91-E on the B524. This modem is too wide to fit on a Boron.

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

<sup>2</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}


{{!-- BEGIN shared-blurb 97fa98d2-9baa-11ec-b909-0242ac120002 --}}
The available models include:

| Model | Region | EtherSIM | Bands | Lifecycle | Replacement |
| :--- | :--- | :---: | :--- | :--- | :--- | 
| B404X | United States, Canada, Mexico | &check; | LTE Cat M1 | Coming soon | |
| B524 | EMEAA | &check; | LTE Cat M1 | GA | |
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Last buy | Use B404X instead |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Deprecated | Use B404X instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Deprecated | Use B524 instead |

- The B404X, B404, and B402 cannot be used in Central or South America.
- The B524 can be used in selected countries in Europe, Middle East, Africa, and Asia (EMEAA), including Australia and New Zealand.
- The B524 and B523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

{{> carrier-family-map family="b series"}}


- [B404 datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [B Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404XMEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | NORAM | GA |
| B404XMTY | B Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | GA |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | GA |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | GA |


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

- For more in-depth information on cellular devices see the [cellular introduction](/getting-started/hardware/cellular-overview/) page.

#### Boron (Prototyping Gen 3 cellular)

{{!-- BEGIN shared-blurb 33f29de8-9bab-11ec-b909-0242ac120002 --}}
![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

- Includes a built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- Can be powered by USB, rechargeable LiPo battery, or an external power supply (3.9 - 12 VDC).
{{!-- END shared-blurb --}}

The available models include:

| Model | Region | EtherSIM | Bands | Lifecycle | Replacement |
| :--- | :--- | :---: | :--- | :--- | :--- |
| BRN404X | United States, Canada, Mexico | &check; | LTE Cat M1 | Coming soon | |
| BRN404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Last buy | |
| BRN314 | Global<sup>1</sup> | &check; | LTE Cat M1 | Last buy | None|
| BRN402 | United States, Canada, Mexico | | 2G/3G | Deprecated | Use BRN404X, BRN404 |
| BRN310 | Global<sup>1</sup> | | 2G/3G | None |

- <sup>1</sup>Global except in areas that have or will soon discontinue the use of 2G/3G, including the United States.
- The BRN314 and BRN310 are now deprecated as the cellular modem on the module is no longer available.
- Do not deploy the BRN314 or BRN310 in the United States, see [2G/3G sunset](/getting-started/hardware/cellular-overview/#united-states).
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.

{{> carrier-family-map family="boron"}}


- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)
- [Ways to expand Gen 3 feather devices](#prototyping) (above)


{{!-- BEGIN do not edit content below, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | &check; | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &nbsp; | &check; | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |


{{!-- END do not edit content above, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

- For more in-depth information on cellular devices see the [cellular introduction](/getting-started/hardware/cellular-overview/) page.


#### Tracker (Gen 3 Cellular)

The Tracker SoM is a SMD module intended to be reflowed to your own base board to create your product. The Tracker One is a complete integrated design with a sealed IP67 waterproof enclosure with a battery and all necessary antenna included inside the enclosure. The Tracker One contains the Tracker SoM internally.

{{!-- BEGIN shared-blurb 875eaa26-9bab-11ec-b909-0242ac120002 --}}
![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Built-in Particle SIM card ([free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required).
- PMIC and fuel gauge chips (charger and battery level sensor)
- Hardware watchdog
{{!-- END shared-blurb --}}

{{> carrier-family-map family="tracker"}}

- [Tracker SoM datasheet](/reference/datasheets/tracker/tracker-som-datasheet/)
- [Tracker SoM evaluation board](/reference/datasheets/tracker/tracker-som-eval-board/)
- [Tracker One datasheet](/reference/datasheets/tracker/tracker-one/)

{{!-- BEGIN do not edit content below, it is automatically generated b9f495c6-80bc-49d7-a4b7-cb210f89fb65 --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | &check; | GA |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &check; | &check; | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | &check; | &check; | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &check; | &check; | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | &check; | &check; | GA |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &nbsp; | &check; | GA |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &nbsp; | &check; | GA |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &nbsp; | &check; | GA |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | &nbsp; | &check; | GA |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &nbsp; | &check; | GA |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | &check; | In development |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | &check; | &check; | In development |


{{!-- END do not edit content above, it is automatically generated b9f495c6-80bc-49d7-a4b7-cb210f89fb65 --}}

- The T404, T402, ONE404, ONE402 cannot be used in Central or South America.
- The T524 and ONE524 can be used in selected countries in Europe, Middle East, Africa, and Asia (EMEAA), including Australia and New Zealand.
- The T524, T523, ONE524, ONE523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.
- For more in-depth information on cellular devices see the [cellular introduction](/getting-started/hardware/cellular-overview/) page.

#### E Series (Production Gen 2 cellular)

{{!-- BEGIN shared-blurb 58d445bc-9bab-11ec-b909-0242ac120002 --}}
![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series modules are generally 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.

- The E310, E313, and E314 are deprecated due to the end-of-life of the u-blox SARA-U201 cellular modem module.
- The E402 and E404 has been replaced by the E404X. Note, however, that this is not a drop-in replacement as there are significant differences between these two modules. See the [E404X migration guide](/hardware/migration-guides/e404x-migration-guide/) for more information.
- New designs should use the B Series M.2 SoM instead of the E Series form-factor.

| Feature | Electron | E Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM<sup>1</sup> | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |

<sup>1</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}


{{> carrier-family-map family="e series"}}

- [E Series datasheet](/reference/datasheets/e-series/e-series-datasheet/)
- [E Series evaluation board](/reference/datasheets/e-series/e-series-eval-board/)
- [E Series integration guide](/reference/datasheets/e-series/e-series-system-integration-manual/)

{{!-- BEGIN do not edit content below, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| E404XTRAY50 | E Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |


{{!-- END do not edit content above, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

- Global models except in areas that have or will soon discontinue the use of 2G/3G, including the United States.
- Do not deploy the E314 or E310 in the United States, see [2G/3G sunset](/getting-started/hardware/cellular-overview/#united-states).
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.
- For more in-depth information on cellular devices see the [cellular introduction](/getting-started/hardware/cellular-overview/) page.
- If you are currently using a Gen 2 cellular device (Electron or E Series) and are interested in migrating to a Gen 3 device (Boron or B Series SoM), see [Gen 2 Cellular Migration](/hardware/migration-guides/gen2-cellular-migration/).


### Wi-Fi

The following are the Wi-Fi compatible devices:

{{!-- BEGIN shared-blurb 6383e77a-9baa-11ec-b909-0242ac120002 --}}
| Feature | P1 | P2 | Argon | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| | Production | Production | Prototyping | Prototyping |
| Style | SMD module | SMD module | Bottom pins | Bottom pins |
| Integrated Wi-Fi antenna | &check; | &check; | | &check; |
| U.FL Antenna Connector | &check; | &check; | &check; | &check; |
| Configuration via | Wi-Fi | BLE | BLE | BLE |
| Enterprise Wi-Fi | &check; | &check; | | &check; |
| USB Connector | Optional | Optional | &check; | &check; |
| Status LED | Optional | Optional | &check; | &check; |
| Reset and Mode Buttons | Optional | Optional | &check; | &check; |
| LiPo Battery Connector | | | &check; | &check; | 
| Size | 28mm x 20mm | 28mm x 20mm | 51mm x 23mm |51mm x 23mm |
|      | 1.1" x 0.8" | 1.1" x 0.8" | 2.0" x 0.9" | 2.0" x 0.9" |
{{!-- END shared-blurb --}}

For product creators, Wi-Fi devices require a way to set the Wi-Fi credentials for the user's Wi-Fi network. This is typically done using a custom mobile app. The P1 has an available Device Setup SDK that makes it easy to create a custom white-label mobile app to set up the P1.

For the P2 and Photon 2, a sample BLE setup app using React will be available.

|  | P1 | P2 | Argon | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| Configuration via | Wi-Fi | BLE | BLE | BLE |
| Setup SDK for iOS and Android | &check; | | |  |
| React mobile setup example | | &check; | &check; | &check; |
| Enterprise Wi-Fi | &check; | &check; | | &check; |
| 2.4 GHz Wi-Fi b/g/n | &check; | &check; | &check; | &check; |
| 5 GHz Wi-Fi b/g/n | | &check; | | &check; |


#### Photon 2 (Prototyping Wi-Fi)

The Photon 2 will replace the Argon as the prototyping Wi-Fi device.

- [Photon 2 datasheet](/reference/datasheets/wi-fi/photon-2-datasheet/)
- [Ways to expand Gen 3 feather devices](#prototyping) (above)
- [Photon 2 from Argon migration guide](/hardware/migration-guides/photon-2-argon-migration-guide/)

{{!-- BEGIN shared-blurb d3802fd5-24b9-433c-b2c9-3d994182751e --}}
| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| User application size | 2048 KB (2 MB) | 128 KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | 2 MB |
| | | | |
| MCU | RTL8721DM | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | |
| RAM<sup>2</sup> | 4608 KB | 128 KB | 256 KB |
| Flash<sup>3</sup> | 16 MB | 1 MB | 1 MB | 
| Hardware FPU | &check; | | &check; |
| Secure Boot | &check; | | |
| Trust Zone | &check; | | |
| | | | |
| Wi-Fi | 802.11 a/b/g/n | 802.11 b/g/n | 802.11 b/g/n |
| &nbsp;&nbsp;2.4 GHz | &check; | &check; | &check; |
| &nbsp;&nbsp;5 GHz | &check; | | |
| Bluetooth | BLE 5.0 | | BLE 5.0 |
| NFC Tag |  | | External antenna required |
| Antenna | Shared for Wi-Fi and BLE | Wi-Fi only | Separate Wi-Fi and BLE antennas |
| | Built-in PCB antenna (Wi-Fi & BLE) | Built-in PCB antenna (Wi-Fi) | Built-in chip antenna (BLE) |
| | | | Required external antenna (Wi-Fi) |
| | Optional external (Wi-Fi & BLE)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (BLE)<sup>4</sup> |
| | | | |
| Peripherals | USB 2.0 | USB 1.1 | USB 1.1 |
| Digital GPIO | 20 | 24 | 20 |
| Analog (ADC) | 6 | 13 | 6 |
| Analog (DAC) |  | 2 |  |
| UART | 3 | 2 | 1 |
| SPI | 2 | 2 | 2 |
| PWM | 6 | 12 | 8 |
| I2C | 1 | 1 | 1 |
| CAN |  | 1 |  |
| I2S |  | 1 | 1 |
| JTAG | | &check; | |
| SWD | &check; | &check; | &check; |


<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup> Total RAM; amount available to user applications is smaller. On the Photon 2, available RAM is approximately 3072 KB. On the Argon, it is 80 KB.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.
{{!-- END shared-blurb --}}


#### Argon (Prototyping Gen 3 Wi-Fi)

![](/assets/images/argon/argon-top.png)

The Argon in a Gen 3 Wi-Fi device in a prototyping form-factor (pins on the bottom). It is deprecated and has been replaced by the Photon 2.

- [Argon datasheet](/reference/datasheets/wi-fi/argon-datasheet/)
- [Ways to expand Gen 3 feather devices](#prototyping) (above)
- [Photon 2 from Argon migration guide](/hardware/migration-guides/photon-2-argon-migration-guide/)

#### P2 (Production Wi-Fi)

<div align="center"><img src="/assets/images/p2-rendering.png" width="200"></div>

- [P2 datasheet](/reference/datasheets/wi-fi/p2-datasheet/)
- [P2 from P1 migration guide](/hardware/migration-guides/p2-p1-migration-guide/)
- [P2 from Argon migration guide](/hardware/migration-guides/p2-argon-migration-guide/)
- [P2 from Photon migration guide](/hardware/migration-guides/p2-photon-migration-guide/)

{{!-- BEGIN shared-blurb 2403957d-c08c-4184-bbe9-0feb12a001e7 --}}
| Feature | P2 | P1 | Photon | Argon |
| :--- | :---: | :---: | :---: | :---: |
| Style | SMD | SMD | Pin Module | Pin Module |
| Status LEDs | &dagger; | &dagger; | &check; | &check; |
| Reset and Mode Buttons | &dagger; | &dagger; | &check; | &check; |
| USB Connector | &dagger; | &dagger; | Micro B | Micro B |
| D7 Blue LED | | | &check; | &check; |
| LiPo Connector | | | | &check; |
| Battery Charger | | | | &check; |
| User application size | 2048 KB (2 MB) | 128 KB | 128KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | | 2 MB |
| | | | | |
| MCU | RTL8721DM | STM32F205RGY6 | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | | |
| RAM<sup>2</sup> | 4608 KB | 128KB | 128 KB | 256 KB |
| Flash<sup>3</sup> | 16 MB | 1 MB | 1 MB | 1 MB | 
| Hardware FPU | &check; | | | &check; |
| Secure Boot | &check; | | | |
| Trust Zone | &check; | | | }
| | | | | }
| Wi-Fi | 802.11 a/b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n |
| &nbsp;&nbsp;2.4 GHz | &check; | &check; | &check; | &check; |
| &nbsp;&nbsp;5 GHz | &check; | | | |
| Bluetooth | BLE 5.0 | | | BLE 5.0 |
| NFC Tag |  | | | External antenna required |
| Antenna | Shared for Wi-Fi and BLE | Wi-Fi only | Wi-Fi only | Separate Wi-Fi and BLE antennas |
| | Built-in PCB antenna (Wi-Fi & BLE) | Built-in PCB antenna (Wi-Fi) | Built-in chip antenna (Wi-Fi) | Built-in chip antenna (BLE) |
| | | | | Required external antenna (Wi-Fi) |
| | Optional external (Wi-Fi & BLE)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (BLE)<sup>4</sup> |
| | | | | |
| Peripherals | USB 2.0 | USB 1.1 | USB 1.1 | USB 1.1 |
| Digital GPIO | 22 | 24 | 18 | 20 |
| Analog (ADC) | 6 | 13 | 8 | 6 |
| Analog (DAC) |  | 2 | 2 |  |
| UART | 1 | 2 | 2<sup>6</sup> | 1 |
| SPI | 2 | 2 | 2 |  2 |
| PWM | 6 | 12 | 9 | 8 |
| I2C | 1 | 1 | 1 | 1 |
| CAN |  | 1 | 1 | |
| I2S |  | 1<sup>5</sup> | 1<sup>5</sup> | 1 |
| JTAG | | &check; | &check; | |
| SWD | &check; | &check; | &check; |&check; |


&dagger; Optional but recommended. Add to your base board.

<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup> Total RAM; amount available to user applications is smaller. On the P2, available RAM is approximately 3072 KB. On the Argon, it is 80 KB. On the Photon, it is 55 KB.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.

<sup>5</sup> The STM32 hardware supports I2S but there is no software support in Device OS or 3rd-party libraries.

<sup>6</sup> The second UART on the Photon shares pins with the status LED, and requires unsoldering it (or its current limiting resistors) and using pads on the bottom of the module, making it impractical to use.
{{!-- END shared-blurb --}}

#### P1 (Production Gen 2 Wi-Fi)

<div align="center"><img src="/assets/images/p1-vector.png" width="200"></div>

The P1 is intended for production use. It is an older Gen 2 models as is deprecated. The P2 should be used instead. 

- [P1 datasheet](/reference/datasheets/wi-fi/p1-datasheet/)
- [P2 from P1 migration guide](/hardware/migration-guides/p2-p1-migration-guide/)

{{!-- BEGIN do not edit content below, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | Global | GA |
| P2REEL | P2 Wi-Fi Module, Reel [x600] | Global | GA |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Global | GA |
| PHN2KIT | Photon 2, Kit [x1] | Global | GA |
| PHN2MEA | Photon 2 [x1] | Global | GA |
| PHN2MTY | Photon 2, Tray [x50] | Global | GA |


{{!-- END do not edit content above, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b--}}


### Both cellular and Wi-Fi

There are no Particle devices that include both cellular and Wi-Fi connectivity in a single device. While the Tracker SoM and Tracker One include cellular and Wi-Fi, the Tracker Wi-Fi can only be used for geolocation and cannot be used to connect to the Internet.

If you want an option of cellular or Wi-Fi in your product, you'll need two or three different SKUs, however the best choice is:

- Wi-Fi: Photon 2, Argon
- Cellular: Boron LTE (North America), Boron 2G/3G (Global except NORAM)

These modules are pin-compatible in the Feather form-factor, so you can make two versions of your hardware, one cellular and one Wi-Fi, which you can use depending on local connectivity, for example.

{{!-- BEGIN do not edit content below, it is automatically generated a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5 --}}

| SKU | Description | Region | Battery Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &nbsp; | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | GA |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Global | &nbsp; | GA |
| PHN2KIT | Photon 2, Kit [x1] | Global | &nbsp; | GA |
| PHN2MEA | Photon 2 [x1] | Global | &nbsp; | GA |
| PHN2MTY | Photon 2, Tray [x50] | Global | &nbsp; | GA |


{{!-- END do not edit content above, it is automatically generated a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5 --}}


### Ethernet

![](/assets/images/accessories/ethernet-featherwing/ethernet-featherwing.png)


The Photon 2, Argon, Boron are compatible with the [Ethernet FeatherWing](/reference/datasheets/accessories/gen3-accessories/#ethernet-featherwing). 

With the B Series SoM you can implement Ethernet on your custom base board fairly simply using the WIZnet W5500 chipset. The [B Series Eval Board](/reference/datasheets/b-series/b-series-eval-board/) includes this circuitry.

With the P2 module, you can implement Ethernet on your custom base board fairly simply using the WIZnet W5500 chipset. There is no evaluation board for this combination, but the circuitry is straightforward and conceptually the same as the B Series, though the specific pins are different.

You can also include Ethernet functionality on your Tracker SoM base board, but this is an unusual configuration and the [Tracker SoM Eval board](/reference/datasheets/tracker/tracker-som-eval-board/) does not include Ethernet. 

It is not possible to use Ethernet with Gen 2 devices (Photon, P1, Electron, or E Series).

Ethernet is only intended for use as a method of connecting to the Internet. It is not intended to connect to isolated Ethernet segments such as Ethernet control networks, and relay information over cellular, for example. See the [AN037 Ethernet](/hardware/ethernet/ethernet/) application note for more information.

The following pins are used by Ethernet. In Device OS 5.3.0 and later these can be [reconfigured](/reference/device-os/api/ethernet/pin-configuration-ethernet/).

| Ethernet Pin | Argon, Boron, P2, Photon 2 | B Series SoM | Tracker SoM |
| :--- | :---: | :---: | :---: |
| MISO | SPI MISO | SPI MISO | SPI MISO |
| MOSI | SPI MOSI | SPI MOSI | SPI MOSI |
| SCK  | SPI SCK  | SPI SCK  | SPI SCK  |
| Chip Select | D5 |  D8 | D2 | 
| Reset       | D3 |  A7 | D6 |
| Interrupt   | D4 | D22 | D7 |

{{!-- BEGIN do not edit content below, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| B404XMEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | NORAM | &nbsp; | &check; | GA |
| B404XMTY | B Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | &nbsp; | &check; | GA |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &nbsp; | &nbsp; | GA |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | &check; | GA |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &nbsp; | &check; | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |
| E404XTRAY50 | E Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |
| FWNG-ETH | Particle Ethernet FeatherWing, [x1] | Global | &nbsp; | &nbsp; | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | &nbsp; | &nbsp; | GA |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | &check; | GA |
| P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | Global | &nbsp; | &nbsp; | GA |
| P2REEL | P2 Wi-Fi Module, Reel [x600] | Global | &nbsp; | &nbsp; | GA |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Global | &nbsp; | &nbsp; | GA |
| PHN2KIT | Photon 2, Kit [x1] | Global | &nbsp; | &nbsp; | GA |
| PHN2MEA | Photon 2 [x1] | Global | &nbsp; | &nbsp; | GA |
| PHN2MTY | Photon 2, Tray [x50] | Global | &nbsp; | &nbsp; | GA |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | NORAM | &nbsp; | &check; | GA |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | NORAM | &nbsp; | &check; | GA |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | &nbsp; | &check; | GA |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | EMEAA | &nbsp; | &check; | GA |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | &nbsp; | &check; | GA |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | &check; | &check; | In development |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | &check; | &check; | In development |


{{!-- END do not edit content above, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}
