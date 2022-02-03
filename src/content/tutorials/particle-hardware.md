---
title: Particle Hardware
columns: two
layout: commonTwo.hbs
description: Learn about selecting the right hardware for your project
---

# {{title}}

*Finding the right Particle hardware for your project*

## Off-the-shelf complete

If you want an off-the-shelf device can requires little or no hardware design, the [Tracker One](/datasheets/asset-tracking/tracker-one/) is a complete system with a waterproof IP67-rated enclosure. In includes cellular connectivity, GNSS (GPS) and Wi-Fi geolocation, and motion detection.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ONE404MEA| Tracker One LTE M1 (NorAm), [x1]| NORAM| GA|
| ONE404MTY| Tracker One LTE M1 (NorAm), Bulk [x40]| NORAM| GA|
| ONE524MEA| Tracker One LTE CAT1/3G/2G (Europe), [x1]| EMEAA| GA|
| ONE524MTY| Tracker One CAT1/3G/2G (Europe), Bulk [x40]| EMEAA| GA|


{{!-- END do not edit content above, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

If you are interested in measuring temperature and humidity, an [external sensor](/tutorials/asset-tracking/m8-temperature-humidity/) can be connected to the M8 connector. The connector maintains the waterproof rating when in use.

[Custom solutions](/tutorials/asset-tracking/tracker-one-expansion/) can be implemented via an M8 connector as well. 

{{!-- BEGIN do not edit content below, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| M8CONNEA| M8 Connector (Straight), [x1]| GA|
| M8CONNTY| M8 Connector (Straight), [x40]| GA|
| M8TEMPHUMIEA| M8 Sensor Temperature/Humidity (Straight), [x1]| GA|
| M8TEMPHUMITY| M8 Sensor Temperature/Humidity (Straight), [x40]| GA|
| ONEM8CABEA| M8 Accessory Cable 5V Power 3.3V Logic (Straight), [x1]| GA|
| ONEM8CABRAEA| M8 Accessory Cable 5V Power 3.3V Logic Right Angle), [x1]| GA|
| ONEM8CABRATY| M8 Accessory Cable 5V Power 3.3V Logic (Right Angle), [x40]| GA|
| ONEM8CABTY| M8 Accessory Cable 5V Power 3.3V Logic Straight), [x40]| GA|


{{!-- END do not edit content above, it is automatically generated 6a02fd77-1222-4208-8da5-45c9290c5f6d --}}


## Prototype or production

### Prototyping

For easy prototyping, devices with pins on the bottom can easily be installed in a solderless breadboard. The Argon and Boron (Gen 3) are the best choices for prototyping.

![Breadboard](/assets/images/beyond-prototyping/bread1.jpg)

Gen 3 devices use the Adafruit Feather form-factory so easily add accessories like sensors and displays, with no wiring required.

![Boron GPS FeatherWing](/assets/images/gps-display-featherwing.jpg)

Even though these devices are ideal for prototyping, you can also scale with the Argon and Boron. For example, you may mount the device in a socket in your own custom circuit board when you're ready to scale, instead of using solderless breadboards or off-the-shelf Feather adapters.

If you're not sure whether you want Cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

{{!-- BEGIN do not edit content below, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ARG-STRTKT| Argon Starter Kit [x1]| Global| GA|
| ARGN-H| Argon [x1]| Global| GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| GA|
| ARGNTRAY50| Argon, Tray [x50]| Global| GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| NRND-US|
| BRN314TRAY50| Boron 2G/3G (Global), Tray [x50]| Global| NRND-US|
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| GA|
| BRN404TRAY50| Boron LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|


{{!-- END do not edit content above, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

- The Boron 2G/3G (BRN314KIT and BRN314TRAY50) is not recommended in the United States due to the upcoming shutdown of 2G and 3G cellular networks in the United States. These devices will no longer function after the shutdown date.
- The Boron LTE Cat M1 (BRN404KIT and BRN404TRAY50) is the recommended model for the United States.

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

Its also possible to prototype with these easy to use modules, then include the same functionality on a custom board later. The Adafruit and SparkFun designs are all open-source and include hardware design files for EagleCAD.

The [Beyond Prototyping Tutorial](/tutorials/learn-more/beyond-prototyping/) shows examples of how you can move from prototyping to custom circuit boards, with example designs.

### Production

When producing at scale, you may prefer to use devices that you reflow solder to your own base board (E Series, P1, and Tracker SoM) or securely mount in a M.2 socket (B Series SoM).

If you're not sure whether you want Cellular or Wi-Fi, see [Cellular or Wi-Fi](#cellular-or-wi-fi) below.

While you can use prototyping devices at scale, if you will be needing devices over a long period of time, production devices will generally be maintained for a longer period of time. For example, the Electron (prototyping) was discontinued before the E Series (production), even though both have similar hardware.

The software for prototyping and production devices is similar. It's often possible to use a single code base to work with both types of modules. And, in many cases, across both Gen 2 and Gen 3 devices, or across both cellular and Wi-Fi devices.


#### B Series SoM (Gen 3 Cellular)

{{blurb name="b-series-overview"}}

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404MEA| B Series LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| B404MTY| B Series LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|
| B524MEA| B Series LTE CAT-1/3G/2G (Europe) [x1]| EMEAA| GA|
| B524MTY| B Series LTE CAT-1/3G/2G (Europe), Tray [x50]| EMEAA| GA|


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}


#### Tracker SoM (Gen 3 Cellular)

{{blurb name="tracker-som-overview"}}


{{!-- BEGIN do not edit content below, it is automatically generated 88844fc4-c390-44ff-9254-2fa41e2b8963 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| T404MEA| Tracker SoM LTE M1 (NorAm), [x1]| NORAM| GA|
| T404MKIT| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]| NORAM| GA|
| T404MTY| Tracker SoM LTE M1 (NorAm), Tray [x50]| NORAM| GA|
| T524MEA| Tracker SoM LTE CAT1/3G/2G (Europe), [x1]| EMEAA| GA|
| T524MKIT| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1]| EMEAA| GA|
| T524MTY| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50]| EMEAA| GA|


{{!-- END do not edit content above, it is automatically generated 88844fc4-c390-44ff-9254-2fa41e2b8963 --}}

#### E Series (Gen 2 Cellular)

{{blurb name="e-series-overview"}}

{{!-- BEGIN do not edit content below, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| E310TRAY50| E Series 2G/3G (Global - E310), Tray [x50]| Global| NRND-US|
| E314KIT| E Series 2G/3G (Global - E314) Evaluation Kit, [x1]| Global| NRND-US|
| E314MOD1| E Series 2G/3G (Global - E314), [x1]| Global| NRND-US|
| E314TRAY50| E Series 2G/3G (Global - E314), Tray [x50]| Global| NRND-US|
| E402TRAY50| E Series LTE CAT-M1 (NorAm), Tray [x50]| NORAM| NRND-US|
| E404KIT| E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1]| NORAM| NRND-US|
| E404MOD1| E Series LTE CAT-M1 (NorAm), [x1]| NORAM| NRND-US|
| E404TRAY50| E Series LTE CAT-M1 (NorAm), Tray [x50]| NORAM| NRND-US|


{{!-- END do not edit content above, it is automatically generated 5e188545-21ff-4ef8-9510-155caea7014e --}}

If you are currently using a Gen 2 cellular device (Electron or E Series) and are interested in migrating to a Gen 3 device (Boron or B Series SoM), see [Gen 2 Cellular Migration](/tutorials/learn-more/gen2-cellular-migration/).


#### P1 (Gen 2 Wi-Fi)

<div align="center"><img src="/assets/images/p1-vector.png" width="200"></div>

The P1 module is a Wi-Fi module that you reflow solder to your own custom base board. It's smaller and less expensive than the Argon.

{{blurb name="argon-p1-table"}}

{{!-- BEGIN do not edit content below, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| P1MOD10| P1 Wi-Fi Module, Cut tape [x10]| Global| GA|
| P1REEL| P1 Wi-Fi Module, Reel [x500]| Global| GA|


{{!-- END do not edit content above, it is automatically generated 8ba8241b-1084-463b-b5be-64cda68e3a4b--}}

## Cellular or Wi-Fi

A common question to start with is how you want to connect to the Internet.

### Cellular

While cellular hardware is initially more expensive, the total cost to onboard a customer with cellular may be lower due to the other expenses involved in Wi-Fi deployments:

- No requirement to provide a method of configuring Wi-Fi credentials, such as a custom mobile app
- No dependence on the customer's Wi-Fi network, which may be inconsistent 
- No troubleshooting site-specific Wi-Fi configuration issues


#### B Series SoM (Production Gen 3 Cellular)


{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}
{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

#### Boron (Prototyping Gen 3 Cellular)

{{!-- BEGIN do not edit content below, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| GA|
| BRN404TRAY50| Boron LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|
| BRN310TRAY50| Boron 2G/3G (Global), Tray [x50]| Global| NRND-US|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| NRND-US|
| BRN314TRAY50| Boron 2G/3G (Global), Tray [x50]| Global| NRND-US|


{{!-- END do not edit content above, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

#### Tracker (Gen 3 Cellular)

There are two variations of the Tracker


#### E Series (Production Gen 2 Cellular)

If you are currently using a Gen 2 cellular device (Electron or E Series) and are interested in migrating to a Gen 3 device (Boron or B Series SoM), see [Gen 2 Cellular Migration](/tutorials/learn-more/gen2-cellular-migration/).


### Wi-Fi

{{blurb name="argon-p1-table"}}


#### Argon (Prototyping Gen 3 Wi-Fi)



#### P1 (Production Gen 2 Wi-Fi)


### Both Cellular and Wi-Fi

There are no Particle devices that include both cellular and Wi-Fi connectivity in a single device. While the Tracker SoM and Tracker One include cellular and Wi-Fi, the Tracker Wi-Fi can only be used for geolocation and cannot be used to connect to the Internet.

If you want an option of cellular or Wi-Fi in your product, you'll need two or three different SKUs, however the best choice is:

- Wi-Fi: Argon
- Cellular: Boron LTE (North America), Boron 2G/3G (Global except NORAM)

These modules are pin-compatible in the Feather form-factor, so you can make two versions of your hardware, one cellular and one Wi-Fi, which you can use depending on local connectivity, for example.

{{!-- BEGIN do not edit content below, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ARG-STRTKT| Argon Starter Kit [x1]| Global| GA|
| ARGN-H| Argon [x1]| Global| GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| GA|
| ARGNTRAY50| Argon, Tray [x50]| Global| GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| NRND-US|
| BRN314TRAY50| Boron 2G/3G (Global), Tray [x50]| Global| NRND-US|
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| GA|
| BRN404TRAY50| Boron LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|


{{!-- END do not edit content above, it is automatically generated 455bf1d0-0230-4074-bfa7-99ce6e4f6245 --}}


### Ethernet

The Argon and Boron are compatible with the [Ethernet Featherwing](/datasheets/accessories/gen3-accessories/#ethernet-featherwing). 

With the B Series SoM you can implement Ethernet on your custom base board fairly simply using the WIZnet W5500 chipset. The [B Series Eval Board](/datasheets/boron/b-series-eval-board/) includes this circuitry.

It is not possible to use Ethernet with Gen 2 devices (Photon, P1, Electron, or E Series).

Ethernet is only intended for use as a method of connecting to the Internet. It is not intended to connect to isolated Ethernet segments such as Ethernet control networks, and relay information over cellular, for example. See the [AN037 Ethernet](/datasheets/app-notes/an037-ethernet/) application note for more information.

{{!-- BEGIN do not edit content below, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ARG-STRTKT| Argon Starter Kit [x1]| Global| GA|
| ARGN-H| Argon [x1]| Global| GA|
| ARGNKIT| Argon, Starter Kit  [x1]| Global| GA|
| ARGNTRAY50| Argon, Tray [x50]| Global| GA|
| B404MEA| B Series LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| B404MTY| B Series LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|
| B524MEA| B Series LTE CAT-1/3G/2G (Europe) [x1]| EMEAA| GA|
| B524MTY| B Series LTE CAT-1/3G/2G (Europe), Tray [x50]| EMEAA| GA|
| BRN404| Boron LTE CAT-M1 (NorAm), [x1]| NORAM| GA|
| BRN404KIT| Boron LTE CAT-M1 (NorAm), Starter Kit [x1]| NORAM| GA|
| BRN404TRAY50| Boron LTE CAT-M1 (NorAm), Tray [x50]| NORAM| GA|
| FWNG-ETH| Particle Ethernet FeatherWing, [x1]| Global| GA|
| M2EVAL| Particle M.2 SoM Evaluation Board [x1]| Global| GA|
| ONE404MEA| Tracker One LTE M1 (NorAm), [x1]| NORAM| GA|
| ONE404MTY| Tracker One LTE M1 (NorAm), Bulk [x40]| NORAM| GA|
| ONE524MEA| Tracker One LTE CAT1/3G/2G (Europe), [x1]| EMEAA| GA|
| ONE524MTY| Tracker One CAT1/3G/2G (Europe), Bulk [x40]| EMEAA| GA|
| T404MEA| Tracker SoM LTE M1 (NorAm), [x1]| NORAM| GA|
| T404MKIT| Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1]| NORAM| GA|
| T404MTY| Tracker SoM LTE M1 (NorAm), Tray [x50]| NORAM| GA|
| T524MEA| Tracker SoM LTE CAT1/3G/2G (Europe), [x1]| EMEAA| GA|
| T524MKIT| Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1]| EMEAA| GA|
| T524MTY| Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50]| EMEAA| GA|
| BRN314KIT| Boron 2G/3G (Global) Starter Kit, [x1]| Global| NRND-US|
| BRN314TRAY50| Boron 2G/3G (Global), Tray [x50]| Global| NRND-US|


{{!-- END do not edit content above, it is automatically generated 2de596b8-2889-4df7-86d1-910d5551b34f --}}
