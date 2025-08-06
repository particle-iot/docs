---
title: Hardware overview
columns: two
layout: commonTwo.hbs
description: Learn about selecting the right hardware for your project
includeDefinitions: [api-helper, carrier-family-map]
---

# {{title}}

*Finding the right Particle hardware for your project*

## Off-the-shelf complete

Particle gateway devices contain a cellular communication module in an enclosure with the required antennas and certification. IP67-rated waterproof connectors makes it easy to add external sensors and devices that communicate over protocols such as CAN bus, serial, and I2C. 

### Tracker One

If you want an off-the-shelf device can requires little or no hardware design, the [Tracker One](/reference/datasheets/tracker/tracker-one/) is a complete system with a waterproof IP67-rated enclosure. In includes cellular connectivity, GNSS (GPS) and Wi-Fi geolocation, and motion detection.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)

{{!-- BEGIN do not edit content below, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | NORAM | GA |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | NORAM | GA |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | GA |
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | GA |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | GA |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | EMEAA | GA |


{{!-- END do not edit content above, it is automatically generated b7083b52-4bd3-47a6-85e8-396922c41b33 --}}

<p class="attribution">ONE524: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand.<br>
See the [cellular carrier list](/reference/cellular/cellular-carriers/).</p>

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


### Monitor One

The Monitor One has the same cellular and processor module (Tracker SoM), but is enclosed in a heavy duty waterproof enclosure that is large enough to contain expansion cards.

- [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/) 

{{!-- BEGIN do not edit content below, it is automatically generated df800960-c749-4b1d-9c69-ae4372e86ab7 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | &check; | GA | |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | EMEAA | EG91-EX | &check; | GA | |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | NORAM | BG96-MC | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

<p class="attribution">MON524: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/).</p>

![Monitor One](/assets/images/monitor-one/monitor-one-closed.jpg)


## Tachyon

{{imageOverlay src="/assets/images/tachyon/tachyon-iso.jpg" alt="Tachyon Photo"}}

{{!-- BEGIN shared-blurb 0cc9e529-f43b-4100-83b4-4ea4a75ad44b --}}
Tachyon is a 5G-connected single-board computer (SBC) that takes the technology inside a modern smartphone and packs it into a Raspberry Pi form factor to power portable and remote computing devices. With a powerful Qualcomm Dragonwing™ SoC, an AI accelerator, and Particle’s application infrastructure, Tachyon combines all of the edge computing power, connectivity, and software necessary to embed intelligence into anything, anywhere.

- Qualcomm QCM6490 8-core Kryo™ 670 CPU (1x 2.7GHz, 3x 2.4GHz, 4x 1.9GHz).
- 5G sub-6Hz cellular connectivity and Wi-Fi 6E with on-device antennas
- 8GB RAM and 128GB with built-in UFS storage
- Adreno 643 GPU and 12 TOPS NPU 
- USB-C 3.1 PD with DisplayPort and PD, 2x PCIe lanes, and DSI 4-lane
- 2 x CSI 4-lane with ISP, supporting 20+ pre-integrated camera sensors 
- Powered by USB-C or lithium-ion battery with integrated battery charger
- Secure boot and encrypted filesystem
{{!-- END shared-blurb --}}

Additional Tachyon resources:
- [Tachyon datasheet](/reference/datasheets/tachyon/tachyon-datasheet)
- [Tachyon developer documentation](https://developer.particle.io/tachyon/)
- [Tachyon setup instructions](https://developer.particle.io/tachyon/setup/setup-overview)


## Production devices

Production devices integrate with a custom base board to provide the functionality you need for your product.

### M-SoM

The M-SoM multi-radio module is designed to fit in an M.2 NGFF socket on your custom base board.

- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - M404: Quectel BG95-M5 LTE Cat M1/2G (Global)
  - M524: Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)
  - M635: Quectel BG95-M5 LTE Cat M1/2G (Global with satellite)


Additionally, through your base board you can add additional functionality including network interfaces in addition to the built-in cellular and Wi-Fi:

| Interface | Required module |
| :--- | :--- |
| Ethermet | WizNET W5500 |
| LoRaWAN | Quectel KG200Z |

For prototyping with the M-SoM module, see [Muon](#muon), below.

- [M-SoM datasheet](/reference/datasheets/m-series/msom-datasheet/) 

{{!-- BEGIN do not edit content below, it is automatically generated 5c48836c-dced-4420-be6f-15916d265a5e --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | BG95-M5 | &check; | GA | |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | &check; | GA | |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-EX | &check; | GA | |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 |  | In development | |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

<p class="attribution">The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations.<br/>
See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.</p>


![M-SoM](/assets/images/m-series/m404-iso.jpg)

### B-SoM

The B-SoM includes only cellular (not Wi-Fi, satellite, or LoRaWAN). It uses the same M.2 NGFF socket as the M-SoM, though there are some minor differences because of the use of different MCUs (Realtek RTL8722 in M-SoM and Nordic nRF52840 in B-SoM).

- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B504 datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | GA |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | GA |


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

![B-SoM](/assets/images/b-series/b404x-iso.png)

### P2

The P2 is a Wi-Fi only module using the Realtek RTL8721DM module. The MCU is very similar to the M-SoM MCU, with the same fast speed and large amount of flash and RAM, making it useful for low-cost devices performing computationally intensive edge computing tasks, including running machine learning models.

The P2 must be reflow soldered to a base board. For prototyping, see the [Photon 2](#photon-2), below.

- [P2 datasheet](/reference/datasheets/wi-fi/p2-datasheet/)

P2 modules are available from [store.particle.io](https://store.particle.io/) as cut tape in quantities of 10 each.

{{!-- BEGIN do not edit content below, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |
| P2MOD10 | P2 Wi-Fi Module, Cut tape [x10] | Global | GA | |
| P2REEL | P2 Wi-Fi Module, Reel [x600] | Global | GA | |


{{!-- END do not edit content above, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}

![P2](/assets/images/p2-iso.png)


### Tracker SoM

The Asset Tracker SoM is a castellated SoM designed to be reflow soldered to your own base board. If you need a more custom design that is possible with the Tracker One or Monitor One, you can directly use the same module contained in these devices.

- [Tracker SoM datasheet](/reference/datasheets/tracker/tracker-som-datasheet/) 
- [Tracker SoM evaluation board](/reference/datasheets/tracker/tracker-som-eval-board/) 

![Tracker SoM](/assets/images/t523-som.svg)

## Prototyping devices

### Muon

The Muon contains an M-SoM module in a M.2 socket and a carrier board with an expansion connector, along with additional peripherals, including:

- LoRaWAN module (Quectel KG200Z, 862 – 928 MHz)
- Expansion connector
- Temperature sensor (TMP112A)
- Configuration EEPROM (24CW640T)
- Real-time clock and watchdog chip (AM1805)
- Reset and mode buttons
- RGB status LED
- Power input options
  - USB-C
  - VIN (6-12 VDC)
  - LiPo battery with temperature sensor (3-pin JST-PH)

![](/assets/images/m-series/muon-iso.png)


The Muon contains a Particle M-SoM that the following functional units:
 
- M.2 SoM form-factor, like the B-Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - M404: Quectel BG95-M5 LTE Cat M1/2G (Global)
  - M524: Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)
  - M635: Quectel BG95-M5 LTE Cat M1/2G (Global with satellite)

The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations. See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.

The Muon can be used in a number of ways:

- As a prototyping device, as-is, or using Dupont wires to connect to a solderless breadboard.
- Expanded using Sparkfun [Qwiic](/hardware/expansion/qwiic/) and Adafruit STEMMA QT plug-and-play I2C sensors and peripherals.
- Design your own expansion card, either as a prototype or for production.
- Incorporate the features of the Muon into your own design based on the M-SoM.


- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/) 

{{!-- BEGIN do not edit content below, it is automatically generated f4a91103-4428-4732-a1bc-83784f9bf207 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | GA | |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Global | EG91-EX | &check; | GA | |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

<p class="attribution">See the [cellular carrier list](/reference/cellular/cellular-carriers/) for supported countries.</p>

### Photon 2

The Photon 2 is a prototyping module for Wi-Fi networks based on the P2 module. It is an Adafruit Feather form-factor with pins on the bottom that are ideal for use in a solderless breadboard.

Since it contains a P2 module, you can also use it as a development kit for creating your own product based on a P2 module, as software is fully compatible between the two devices.

- [Photon 2 datasheet](/reference/datasheets/wi-fi/photon-2-datasheet/)

{{!-- BEGIN do not edit content below, it is automatically generated 097ba52c-0c46-4ec0-827d-3c5880d3fd3a --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |
| PHN2KIT | Photon 2, Kit [x1] | Global | GA | |
| PHN2MEA | Photon 2 [x1] | Global | GA | |
| PHN2MTY | Photon 2, Tray [x50] | Global | GA | |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Global | Deprecated | |


{{!-- END do not edit content above, it is automatically generated  --}}

![Photon 2](/assets/images/photon2-iso.jpg)


### Boron

The Boron is a prototyping module for cellular networks. It is an Adafruit Feather form-factor with pins on the bottom that are ideal for use in a solderless breadboard.

- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)

There is no Boron version for EMEAA (Europe, Middle East, Africa, and Asia), as the LTE Cat 1 with 2G/3G fallback cellular modem on the B524 would not physically fit in the Feather form-factor. 

{{!-- BEGIN do not edit content below, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

| SKU | Description | Region | Battery Inc | Cell Ant Inc | Lifecycle |
| :--- | :--- | :--- | :---: | :---: | :--- |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | &nbsp; | &check; | GA |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | &nbsp; | &nbsp; | GA |


{{!-- END do not edit content above, it is automatically generated 518869dc-61de-43db-add1-f0d57956c4e0 --}}

![Boron](/assets/images/boron-angle.jpg)
