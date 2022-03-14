---
title: Particle Hardware
columns: two
layout: commonTwo.hbs
description: Learn about selecting the right hardware for your project
includeDefinitions: [api-helper, carrier-family-map]
---

# {{title}}

*Finding the right Particle hardware for your project*

- If you want an off-the-shelf, complete device with little or no hardware design required, see [off-the-shelf complete](#off-the-shelf-complete) below.
- One way to start finding the right device is whether you're a hobbyist, prototyping, or producing a product. To start there, see [prototype or production](#prototype-or-production) below.
- Another way to start is by deciding on [cellular or Wi-Fi](#cellular-or-wi-fi) first.


## Off-the-shelf complete


### Tracker One

If you want an off-the-shelf device can requires little or no hardware design, the [Tracker One](/datasheets/asset-tracking/tracker-one/) is a complete system with a waterproof IP67-rated enclosure. In includes cellular connectivity, GNSS (GPS) and Wi-Fi geolocation, and motion detection.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ONE404MEA| Tracker One LTE M1 (NorAm), [x1]| NORAM| GA|
| ONE524MEA| Tracker One LTE CAT1/3G/2G (Europe), [x1]| EMEAA| GA|


{{!-- END do not edit content above, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

The Tracker One is fully assembled and sealed; all you need to do is plug it in to wake it from shipping mode and you can immediately begin using it with no programming or assembly necessary!

Included inside the fully assembled, sealed enclosure:

- Built-in Particle SIM card ([free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required).
- 2000 mAh LiPo battery.
- Cellular antenna.
- Wi-Fi antenna (for geolocation only, not for connectivity).
- BLE antenna.
- GNSS (GPS) antenna.
- NFC tag antenna.
- Power by USB-C or an external power supply.

#### Country compatibility - Tracker

{{> carrier-family-map family="tracker"}}

#### M8 Expansion - Tracker One

![M8 Sensor Temperature/Humidity](/assets/images/tracker/m8-temp-humidity.png)

If you are interested in measuring temperature and humidity, an [external sensor](/tutorials/asset-tracking/m8-temperature-humidity/) can be connected to the M8 connector. The connector maintains the waterproof rating when in use.

[Custom solutions](/tutorials/asset-tracking/tracker-one-expansion/) can be implemented via an M8 connector as well. 

{{!-- BEGIN do not edit content below, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| M8CONNEA | M8 Connector (Straight), [x1] | GA |
| M8CONNTY | M8 Connector (Straight), [x40] | GA |
| M8TEMPHUMIEA | M8 Sensor Temperature/Humidity (Straight), [x1] | GA |
| M8TEMPHUMITY | M8 Sensor Temperature/Humidity (Straight), [x40] | GA |
| ONEM8CABEA | M8 Accessory Cable 5V Power 3.3V Logic (Straight), [x1] | GA |
| ONEM8CABRAEA | M8 Accessory Cable 5V Power 3.3V Logic Right Angle), [x1] | GA |
| ONEM8CABRATY | M8 Accessory Cable 5V Power 3.3V Logic (Right Angle), [x40] | GA |
| ONEM8CABTY | M8 Accessory Cable 5V Power 3.3V Logic Straight), [x40] | GA |


{{!-- END do not edit content above, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}


## Prototype or production

### Prototyping

For easy prototyping, devices with pins on the bottom can easily be installed in a solderless breadboard. The Argon and Boron (Gen 3) are the best choices for prototyping.

![Breadboard](/assets/images/beyond-prototyping/bread1.jpg)

Gen 3 devices use the Adafruit Feather form-factory so easily add accessories like sensors and displays, with no wiring required.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

Even though these devices are ideal for prototyping, you can also scale with the Argon and Boron. For example, you may mount the device in a socket in your own custom circuit board when you're ready to scale, instead of using solderless breadboards or off-the-shelf Feather adapters.

There are also evaluation kits for the B Series SoM, Tracker SoM, and E Series modules that can be used for prototyping with those modules.

If you're not sure whether you want cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

{{!-- BEGIN do not edit content below, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

| SKU | Description | Region | Battery Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :--- |
| ARG-STRTKT | Argon Starter Kit [x1] | Global | &nbsp; | GA |
| ARGN-H | Argon [x1] | Global | &nbsp; | GA |
| ARGNKIT | Argon, Starter Kit  [x1] | Global | &nbsp; | GA |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | &nbsp; | GA |
| BRN404KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | &nbsp; | GA |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | &check; | NRND-US |


{{!-- END do not edit content above, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

- The Boron 2G/3G (BRN314KIT) should not be deployed in the United States due to the [2G/3G shutdown](/tutorials/cellular-connectivity/introduction/#united-states).
- The Boron LTE Cat M1 (BRN404KIT) is the recommended model for the United States.
- Can be powered by USB, rechargeable LiPo battery, or an external power supply.
- A battery is included with the Boron 2G/3G (BRN314) as the cellular modem uses more power for brief periods of time than a standard laptop USB port will supply.
- All Boron devices include a built-in Particle SIM card ([free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required).
- Starter kits include a mini-breadboard, USB cable, two resistors (220 ohm), one red LED, and one photodiode.
- ARG-STRTKT includes a variety of [Grove](/datasheets/accessories/gen3-accessories/#grove-starter-kit) sensors and a display.

There are numerous ways to expand Gen 3 devices:

- [Adafruit FeatherWing](/community/feather/) compatible modules can add things like displays, sensors, relays, with no wiring necessary.
- [SparkFun Qwiic](/community/qwiic/) and Adafruit Stemma-QT modules provide a way to add features connected by a small I2C cable. Multiple modules can be chained together, as well.
  - Environment sensors (pressure, temperature, humidity) like the BME280
  - Buttons and indicator buttons
  - Load cell adapter (weight sensor)
  - Distance and proximity sensors
  - Thermocouple adapters
  - Relays
  - Keypads
  - Small displays
- [Grove](/datasheets/accessories/gen3-accessories/#grove-starter-kit) sensors and displays connect to digital, analog, I2C, and serial devices with a simple 4-pin cable.


Its also possible to prototype with these easy to use modules, then include the same functionality on a custom board later. The Adafruit and SparkFun designs are all open-source and include hardware design files for EagleCAD.

The [Beyond Prototyping Tutorial](/tutorials/learn-more/beyond-prototyping/) shows examples of how you can move from prototyping to custom circuit boards, with example designs.

For more information about the Boron, see [Cellular - Boron](#boron-prototyping-gen-3-cellular-) below.

For more information about the Argon, see [Wi-Fi - Argon](#argon-prototyping-gen-3-wi-fi-) below.

### Production

When producing at scale, you may prefer to use devices that you reflow solder to your own base board (E Series, P1, and Tracker SoM) or securely mount in a M.2 socket (B Series SoM).

If you're not sure whether you want cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

While you can use prototyping devices at scale, if you will be needing devices over a long period of time, production devices will generally be maintained for a longer period of time. For example, the Electron (prototyping) was discontinued before the E Series (production), even though both have similar hardware.

The software for prototyping and production devices is similar. It's often possible to use a single code base to work with both types of modules. And, in many cases, across both Gen 2 and Gen 3 devices, or across both cellular and Wi-Fi devices.


#### B Series SoM (Gen 3 Cellular)

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
- Built-in Particle SIM card ([free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required).
- PMIC and fuel gauge chips (charger and battery level sensor)
- Hardware watchdog
{{!-- END shared-blurb --}}

For more information about the Tracker SoM, see [Cellular - Tracker SoM](#tracker-gen-3-cellular-) below.


#### E Series (Gen 2 Cellular)

{{!-- BEGIN shared-blurb 58d445bc-9bab-11ec-b909-0242ac120002 --}}
![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series module is a 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.


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

<sup>1</sup>The built-in Particle SIM card is [free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}

For more information about the E Series module, see [Cellular - E Series](#e-series-production-gen-2-cellular-) below.


#### P1 (Gen 2 Wi-Fi)

<div align="center"><img src="/assets/images/p1-vector.png" width="200"></div>

The P1 module is a Wi-Fi module that you reflow solder to your own custom base board. It's smaller and less expensive than the Argon.

{{!-- BEGIN shared-blurb 6383e77a-9baa-11ec-b909-0242ac120002 --}}
| Feature | P1 | Argon |
| :--- | :---: | :---: |
| | Production | Prototyping |
| | Gen 2 | Gen 3 |
| Style | SMD module | Bottom pins |
| Integrated Wi-Fi antenna | &check; | |
| U.FL Antenna Connector | &check; | &check; |
| Configuration via | Wi-Fi | BLE |
| Enterprise Wi-Fi | &check; | |
| USB Connector | Optional | &check; |
| Status LED | Optional | &check; |
| Reset and Mode Buttons | Optional | &check; |
| LiPo Battery Connector | | &check; | 
| Size | 28mm x 20mm | 51mm x 23mm |
|      | 1.1" x 0.8" | 2.0" x 0.9" |
{{!-- END shared-blurb --}}

For more information about the P1 module, see [Wi-Fi - P1](/#p1-production-gen-2-wi-fi-) below.


## Cellular or Wi-Fi

A common question to start with is how you want to connect to the Internet.

### Cellular

While cellular hardware is initially more expensive, the total cost to onboard a customer with cellular may be lower due to the other expenses involved in Wi-Fi deployments:

- No requirement to provide a method of configuring Wi-Fi credentials, such as a custom mobile app
- No dependence on the customer's Wi-Fi network, which may be inconsistent 
- No troubleshooting site-specific Wi-Fi configuration issues


#### B Series SoM (Production Gen 3 Cellular)

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
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | |
| B524 | Europe, Australia, New Zealand | &check; | LTE Cat M1 | |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Use B404 instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Use B524 instead |

- The B404 (and B402) cannot be used in Central or South America.
- The B524 is only recommended for use in Europe, Australia, and New Zealand.
- The B524 (and B523) do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

{{> carrier-family-map family="b series"}}


- [B404 datasheet](/datasheets/boron/b402-datasheet/)
- [B524 datasheet](/datasheets/boron/b523-datasheet/)
- [B Series evaluation board](/datasheets/boron/b-series-eval-board/)

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404MEA| B Series LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| B524MEA| B Series LTE CAT-1/3G/2G (Europe) [x1]| EMEAA| GA|
| B524MTY| B Series LTE CAT-1/3G/2G (Europe), Tray [x50]| EMEAA| GA|
| M2EVAL| Particle M.2 SoM Evaluation Board [x1]| Global| GA|


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

- For more in-depth information on cellular devices see the [cellular introduction](/tutorials/cellular-connectivity/introduction/) page.

#### Boron (Prototyping Gen 3 Cellular)

{{!-- BEGIN shared-blurb 33f29de8-9bab-11ec-b909-0242ac120002 --}}
![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

- Includes a built-in Particle SIM card ([free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required).
- Can be powered by USB, rechargeable LiPo battery, or an external power supply (3.9 - 12 VDC).
{{!-- END shared-blurb --}}

The available models include:

| Model | Region | EtherSIM | Bands | Replacement |
| :--- | :--- | :---: | :--- | :--- |
| BRN404 | United States, Canada, Mexico | &check; | LTE Cat M1 | |
| BRN314 | Global<sup>1</sup> | &check; | LTE Cat M1 | |
| BRN402 | United States, Canada, Mexico | | 2G/3G | Use BRN404 instead |
| BRN310 | Global<sup>1</sup> | | 2G/3G | Use BRN314 instead |

- <sup>1</sup>Global except in areas that have or will soon discontinue the use of 2G/3G, including the United States.
- Do not deploy the BRN314 or BRN310 in the United States, see [2G/3G sunset](/tutorials/cellular-connectivity/introduction/#united-states).
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.

{{> carrier-family-map family="boron"}}

- [Boron datasheet](/datasheets/boron/boron-datasheet/)
- [Ways to expand Gen 3 feather devices](#prototyping) (above)


{{!-- BEGIN do not edit content below, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| | &check;| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| | &check;| GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| &check;| &check;| NRND-US|


{{!-- END do not edit content above, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

- For more in-depth information on cellular devices see the [cellular introduction](/tutorials/cellular-connectivity/introduction/) page.


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
- Built-in Particle SIM card ([free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required).
- PMIC and fuel gauge chips (charger and battery level sensor)
- Hardware watchdog
{{!-- END shared-blurb --}}

{{> carrier-family-map family="tracker"}}

- [Tracker SoM datasheet](/datasheets/asset-tracking/tracker-som-datasheet/)
- [Tracker SoM evaluation board](/datasheets/asset-tracking/tracker-som-eval-board/)
- [Tracker One datasheet](/datasheets/asset-tracking/tracker-one/)

{{!-- BEGIN do not edit content below, it is automatically generated b9f495c6-80bc-49d7-a4b7-cb210f89fb65 --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| ONE404MEA| Tracker One LTE M1 (NorAm), [x1]| NORAM| &check;| &check;| GA|
| ONE524MEA| Tracker One LTE CAT1/3G/2G (Europe), [x1]| EMEAA| &check;| &check;| GA|
| T404MEA| Tracker SoM LTE M1 (NorAm), [x1]| NORAM| | &check;| GA|
| T404MKIT| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]| NORAM| | &check;| GA|
| T524MEA| Tracker SoM LTE CAT1/3G/2G (Europe), [x1]| EMEAA| | &check;| GA|
| T524MKIT| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1]| EMEAA| | &check;| GA|


{{!-- END do not edit content above, it is automatically generated b9f495c6-80bc-49d7-a4b7-cb210f89fb65 --}}

- The T404, T402, ONE404, ONE402 cannot be used in Central or South America.
- The T524 and ONE524 are only recommended for use in Europe, Australia, and New Zealand.
- The T524, T523, ONE524, ONE523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.
- For more in-depth information on cellular devices see the [cellular introduction](/tutorials/cellular-connectivity/introduction/) page.

#### E Series (Production Gen 2 Cellular)

{{!-- BEGIN shared-blurb 58d445bc-9bab-11ec-b909-0242ac120002 --}}
![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series module is a 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.


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

<sup>1</sup>The built-in Particle SIM card is [free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}


{{> carrier-family-map family="e series"}}

- [E Series datasheet](/datasheets/electron/e-series-datasheet/)
- [E Series evaluation board](/datasheets/electron/e-series-eval-board/)
- [E Series integration guide](/datasheets/electron/e-series-system-integration-manual/)

{{!-- BEGIN do not edit content below, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| E314KIT| E Series 2G/3G (Global - E314) Evaluation Kit, [x1]| Global| &check;| &check;| NRND-US|
| E314MOD1| E Series 2G/3G (Global - E314), [x1]| Global| | &check;| NRND-US|
| E404KIT| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1]| NORAM| &check;| &check;| NRND-US|
| E404MOD1| E Series LTE CAT-M1 (NorAm), [x1]| NORAM| | &check;| NRND-US|


{{!-- END do not edit content above, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

- Global models except in areas that have or will soon discontinue the use of 2G/3G, including the United States.
- Do not deploy the E314 or E310 in the United States, see [2G/3G sunset](/tutorials/cellular-connectivity/introduction/#united-states).
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries.
- For more in-depth information on cellular devices see the [cellular introduction](/tutorials/cellular-connectivity/introduction/) page.
- If you are currently using a Gen 2 cellular device (Electron or E Series) and are interested in migrating to a Gen 3 device (Boron or B Series SoM), see [Gen 2 Cellular Migration](/tutorials/learn-more/gen2-cellular-migration/).


### Wi-Fi

There are two currently available Wi-Fi devices, the P1 and the Argon:

{{!-- BEGIN shared-blurb 6383e77a-9baa-11ec-b909-0242ac120002 --}}
| Feature | P1 | Argon |
| :--- | :---: | :---: |
| | Production | Prototyping |
| | Gen 2 | Gen 3 |
| Style | SMD module | Bottom pins |
| Integrated Wi-Fi antenna | &check; | |
| U.FL Antenna Connector | &check; | &check; |
| Configuration via | Wi-Fi | BLE |
| Enterprise Wi-Fi | &check; | |
| USB Connector | Optional | &check; |
| Status LED | Optional | &check; |
| Reset and Mode Buttons | Optional | &check; |
| LiPo Battery Connector | | &check; | 
| Size | 28mm x 20mm | 51mm x 23mm |
|      | 1.1" x 0.8" | 2.0" x 0.9" |
{{!-- END shared-blurb --}}

For product creators, Wi-Fi devices require a way to set the Wi-Fi credentials for the user's Wi-Fi network. This is typically done using a custom mobile app. The P1 has an available Device Setup SDK that makes it easy to create a custom white-label mobile app to set up the P1. This does not exist for the Argon at this time.

| | P1 | Argon |
| :--- | :---: | :---: |
| Configuration via | Wi-Fi | BLE |
| Setup SDK for iOS and Android | &check; | |
| Enterprise Wi-Fi | &check; | |
| 2.4 GHz Wi-Fi b/g/n | &check; | &check; |
| 5 GHz Wi-Fi b/g/n | | |

#### Argon (Prototyping Gen 3 Wi-Fi)

![](/assets/images/argon/argon-top.png)

The Argon in a Gen 3 Wi-Fi device in a prototyping form-factor (pins on the bottom).

- [Argon datasheet](/datasheets/wi-fi/argon-datasheet/)
- [Ways to expand Gen 3 feather devices](#prototyping) (above)

{{!-- BEGIN do not edit content below, it is automatically generated a1f313d4-5b1a-409e-b03c-32ebec003b10 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ARG-AQKT| Argon Air Quality Monitor Kit [x1]| Global| GA|
| ARG-STRTKT| Argon Starter Kit [x1]| Global| GA|
| ARGN-H| Argon [x1]| Global| GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| GA|


{{!-- END do not edit content above, it is automatically generated a1f313d4-5b1a-409e-b03c-32ebec003b10--}}


#### P1 (Production Gen 2 Wi-Fi)

<div align="center"><img src="/assets/images/p1-vector.png" width="200"></div>

The P1 is intended for production use. Even though the P1 is an older Gen 2 design, it is still safe to design to the P1-form factor.

- [P1 datasheet](/datasheets/wi-fi/p1-datasheet/)

{{!-- BEGIN do not edit content below, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| P1MOD10| P1 Wi-Fi Module, Cut tape [x10]| Global| GA|


{{!-- END do not edit content above, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b--}}


### Both Cellular and Wi-Fi

There are no Particle devices that include both cellular and Wi-Fi connectivity in a single device. While the Tracker SoM and Tracker One include cellular and Wi-Fi, the Tracker Wi-Fi can only be used for geolocation and cannot be used to connect to the Internet.

If you want an option of cellular or Wi-Fi in your product, you'll need two or three different SKUs, however the best choice is:

- Wi-Fi: Argon
- Cellular: Boron LTE (North America), Boron 2G/3G (Global except NORAM)

These modules are pin-compatible in the Feather form-factor, so you can make two versions of your hardware, one cellular and one Wi-Fi, which you can use depending on local connectivity, for example.

{{!-- BEGIN do not edit content below, it is automatically generated a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5 --}}

| SKU | Description | Region | Battery Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :--- |
| ARG-STRTKT| Argon Starter Kit [x1]| Global| | GA|
| ARGN-H| Argon [x1]| Global| | GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| | GA|
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| | GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| | GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| &check;| NRND-US|


{{!-- END do not edit content above, it is automatically generated a4c0c80f-3745-4b3c-b6dd-e774c4c71ad5 --}}


### Ethernet

![](/assets/images/accessories/ethernet-featherwing/ethernet-featherwing.png)


The Argon and Boron are compatible with the [Ethernet FeatherWing](/datasheets/accessories/gen3-accessories/#ethernet-featherwing). 

With the B Series SoM you can implement Ethernet on your custom base board fairly simply using the WIZnet W5500 chipset. The [B Series Eval Board](/datasheets/boron/b-series-eval-board/) includes this circuitry.

You can also include Ethernet functionality on your Tracker SoM base board, but this is an unusual configuration and the [Tracker SoM Eval board](/datasheets/asset-tracking/tracker-som-eval-board/) does not include Ethernet. 

It is not possible to use Ethernet with Gen 2 devices (Photon, P1, Electron, or E Series).

Ethernet is only intended for use as a method of connecting to the Internet. It is not intended to connect to isolated Ethernet segments such as Ethernet control networks, and relay information over cellular, for example. See the [AN037 Ethernet](/datasheets/app-notes/an037-ethernet/) application note for more information.

{{!-- BEGIN do not edit content below, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| ARG-STRTKT| Argon Starter Kit [x1]| Global| | | GA|
| ARGN-H| Argon [x1]| Global| | | GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| | | GA|
| B404MEA| B Series LTE CAT-M1 (NorAm), [x1]| NORAM| | &check;| GA|
| B524MEA| B Series LTE CAT-1/3G/2G (Europe) [x1]| EMEAA| | &check;| GA|
| B524MTY| B Series LTE CAT-1/3G/2G (Europe), Tray [x50]| EMEAA| | | GA|
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| | &check;| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| | &check;| GA|
| FWNG-ETH| Particle Ethernet FeatherWing, [x1]| Global| | | GA|
| M2EVAL| Particle M.2 SoM Evaluation Board [x1]| Global| | | GA|
| T404MEA| Tracker SoM LTE M1 (NorAm), [x1]| NORAM| | &check;| GA|
| T404MKIT| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]| NORAM| | &check;| GA|
| T524MEA| Tracker SoM LTE CAT1/3G/2G (Europe), [x1]| EMEAA| | &check;| GA|
| T524MKIT| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1]| EMEAA| | &check;| GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| &check;| &check;| NRND-US|


{{!-- END do not edit content above, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}
