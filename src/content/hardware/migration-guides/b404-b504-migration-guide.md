---
title: B504e from B404X/B404/B402 migration guide
columns: two
layout: commonTwo.hbs
description: Learn about migrating to the B504e
---

# {{title}}

{{migration-guide leftImg="/assets/images/b-series/b402-top.jpg" rightImg="/assets/images/b-series/b504e-top.png"}}

This guide discusses the minor changes required when moving from the B404X/B404/B402 (LTE Cat M1) to B504e (LTE Cat 1) 
in the United States, Canada, and Mexico.

The B504e is a LTE Cat 1 cellular device for use in the Americas region, in particular the United States, Canada, and Mexico.

LTE Cat 1 offers better cellular coverage than LTE Cat M1 in some areas, and is also faster.

## Migration

- Recompile source for `b5som` platform.
- Upgrade Device OS to 5.x or later if necessary.
- Verify that power requirements for VCC are met, as the B504e requires more power than the B404X/B404/B402.
- Use the antenna the B504e was certified with, not previous antennas.

These steps are explained in more detail, below.

### Certification

{{!-- BEGIN shared-blurb 2d22b4d0-8047-4513-a095-81ba5b289ff3 --}}
Changing the Particle module will require unintentional radiator testing of your completed assembly. This is the least expensive 
and least complicated of the certification tests.

You generally do not need to perform intentional radiator testing if using the antennas used for the Particle certification.
{{!-- END shared-blurb --}}


### Power

The B504e requires more power than the B404X/B404/B402 for the cellular modem (VCC/3V7 rail). 

The Nordic nRF52840 MCU consumption (3V3 rail) is the same across all B-SoM modules.

If you have designed your B404X/B404/B402 power supply with sufficient spare capacity the B504e can be a drop-in replacement. 

If you have designed your power supply for the B524/B523 or M-SoM, it will have sufficient power for the B504e.

#### B504e/B524/B523 power consumption

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 4.47 | 4.48 | 4.51 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 17.5 | 34.2 | 744 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 17.9 | 72.3 | 711 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 23.0 | 93.6 | 669 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 22.9 | 26.8 | 149 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 113 | 139 | 519 | mA |

#### B404X power consumption

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 4.48 | 4.71 | 5.17 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 5.1 | 45.2 | 166 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 13.7 | 56.0 | 192 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> |  | 63.2 | 185 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 13.4 | 15.5 | 98.3 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 9.47 | 66.3 | 192 | mA |


### Platform

The B504e is the `b5som` platform (25), not the `bsom` platform (23). You must compile for the correct platform. 

Products can only contain a single platform, so you will need separate products for B504e and B404X/B404/B402 devices.

You can share the same product for B524, B523, and B504e devices.

### Antennas

The B504e uses a different cellular antenna than the B404X/B404/B402, and also the B524/B523. 

The B504e uses the same antenna as the M-SoM.

The B504e is certified with the following cellular antenna:

{{!-- BEGIN shared-blurb c04616f7-eede-439f-9dee-d5c9aa1bf53f --}}
| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |

Single quantity units and developer kits include a PARANTCW1EA antenna. Tray quantities of the do not include antennas.

| Dimension | Value | Unit |
| :--- | ---: | :---: |
| Length | 116.0 | mm |
| Width | 27.0 | mm |
| Thickness | 0.2 | mm |
| Cable Length | 189.5 | mm |


| Parameter | 700/850/900 | 1700/1800/1900 | 2100 | 2400 | 2600 | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Peak gain | | | | | | | |
| PARANTCW1EA | 2.8 | 5.3 | 5.3 | 5.3 | 5.3 | dBi |
{{!-- END shared-blurb --}}


The BLE and NFC antennas are the same. If you are not using these features, you can omit the antennas.

### GNSS

The B504 (and B524) include optional GNSS (GPS) functionality. This requires an additional antenna.

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

Single quantity B-SoM units and developer kits include a PARANTGN1EA antenna. Tray quantities of the B-SoM do not include antennas. If not using the GNSS feature, the antenna can be omitted from your design.

{{!-- BEGIN shared-blurb a33dc9e7-17a7-4a03-87d6-88b8a534600f --}}
- GNSS support requires a [firmware library](https://github.com/particle-iot/particle-som-gnss). This library is not currently compatible with the B504 (EG91 cellular modem), but support is planned for the future.
- Features such of high-precision, dead-reckoning, and high updates rates will require an external GNSS chip.
{{!-- END shared-blurb --}}

### Size

The outline of the SoM module is unchanged between all B-Series SoM modules.

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

The top shield on the B504e is larger than the B404X/B404/B402 but this generally will not affect your design as the thickness of the SoM is unchanged.

The top shield on the B504e is the same size as the B524/B523.


### GPIO and ports

There are no changes the pins on the M.2 for ports and GPIO.


### Cellular providers

The B504e (B504MEA and B504MTY) is the same as the B504 (B504MEA and B504MTY), except it has a programmable
e-sim in place of the MFF2 SMD Particle EtherSIM. The e-sim is not user-programmable.

The carriers programmed into the e-sim on the B504e are identical to the B404X and B404.


## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 86efb1c7-a248-4821-8403-6f949b5b0285 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | EG91-NAX | GA | |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | EG91-NAX | GA | |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | EG91-NAX | Deprecated | B504EMEA|
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | EG91-NAX | Deprecated | B504EMTY|


{{!-- END do not edit content above, it is automatically generated --}}
