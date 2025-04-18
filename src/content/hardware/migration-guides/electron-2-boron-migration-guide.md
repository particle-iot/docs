---
title: Electron 2 from Boron migration guide
columns: two
layout: commonTwo.hbs
description: Learn about migrating from the Boron to the Electron 2
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary guide and is subject to change.
{{box op="end"}}

{{migration-guide leftImg="/assets/images/boron/boron-top.png" leftStyle="transform: matrix(0.92, 0, 0, 0.92, 0, 7);" rightImg="/assets/images/electron-2/electron-2-rendering.png"}}


This guide discusses the minor changes required when moving from the Boron to Electron 2 (LTE Cat 1).

## Migration

- Recompile source for `electron2` platform.
- Upgrade Device OS to 6.3.0 or later if necessary.
- Verify that power requirements for are met, as the Electron 2 requires more power than the Boron LTE.
- Use the antenna the Electron 2 was certified with, not previous antennas.

These steps are explained in more detail, below.

### Certification

{{!-- BEGIN shared-blurb 2d22b4d0-8047-4513-a095-81ba5b289ff3 --}}
Changing the Particle module will require unintentional radiator testing of your completed assembly. This is the least expensive 
and least complicated of the certification tests.

You generally do not need to perform intentional radiator testing if using the antennas used for the Particle certification.
{{!-- END shared-blurb --}}

### USB connector

The Electron 2 has a USB-C connector and the Boron has a USB Micro-B connector.

### LiPo connector

The Electron 2 has a 3-pin JST-PH (2mm pitch) battery connector that is the same as the Monitor One, Muon, and Tachyon for connection to a 3.7V LiPo battery pack 
with an integrated temperature sensor (10K NTC thermistor).

The Boron and many other Particle devices have a 3.7V LiPo battery without a temperature sensor using 2-pin JST-PH connector. This battery is not compatible and cannot be used with the Electron 2. A temperature sensor or equivalent resistance is required for proper operation; replacing the connector is not sufficient to use a battery without a temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>

### Power

The Electron 2 requires slightly more power than the Boron LTE (LTE Cat M1), and may exceed the limits of a 500 mA USB
port. This can be solved by powering by a 1A or larger USB-C charger, or including a battery.

If your power supply is sufficient for a Boron 2G/3G, it will work with the Electron 2.

The Nordic nRF52840 MCU consumption is the same across all Boron, B-SoM, and Electron 2 modules.


### Li+ Power

There are changes between the Boron and Electron 2 with regards to Li+.

#### Li+ with external battery

If you are using an external LiPo battery and wish to use the built-in charger on the Electron 2,
changes will be necessary from the Boron as you must simulate having a temperature
sensor in the valid charging range to enable charging.

This can be done using a solder jumper on the bottom of the Electron 2. It consists
of two half-moon shaped pads that must be soldered closed and will allow charging at
any temperature with battery packs or external supplies that do not have a temperature sensor.

{{imageOverlay src="/assets/images/electron-2/ts-pad.png" alt="ts solder jumper"}}

<p class="attribution">Facing bottom side of the Electron 2 with the battery connector on the left</p>

#### Li+ as power input

When used as a power input (3.6 to 4.2 VDC), on the Boron it was necessary to disable charging in software 
through the PMIC settings. This is not necessary with the Electron 2 as charging will automatically be
disabled in hardware because the battery temperature sensor will be missing and will signal out of valid
temperature range in this case, disabling charging.


### SIM card

The Electron 2 does not have a 4FF plastic SIM card socket for use with an external SIM card. 

The Electron 2 has a programmable e-sim in place of the MFF2 SMD Particle EtherSIM. The e-sim is not user-programmable.

The carriers programmed into the e-sim on the Electron 2 are identical to the BRN404X, BRN404, and BRN314, however.


### Platform

The Electron 2 is the `electron2` platform (37), not the `boron` platform (13). You must compile for the correct platform. 

Products can only contain a single platform, so you will need separate products for Electron 2 and Boron (or B-SoM) devices.

### Antennas

The Electron 2 uses a different cellular antenna than the Boron.

The Electron 2 uses the same antenna as the M-SoM.

The Electron 2 is certified with the following cellular antenna:

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


Both the Boron and Electron 2 use the same on-board BLE chip antenna, and the same external BLE antenna. The external
BLE antenna is optional on both devices.

Both the Boron and Electron 2 use the same external NFC antenna. The NFC antenna can be omitted if the NFC tag
feature is not needed.

 
{{!-- BEGIN shared-blurb 6e4375b2-8981-4e75-8572-82a138fc2a46 --}}
| Dimension | mm | inches |
| :--- | ---: | ---: |
| Width | 22.86 | 0.9 |
| Length | 50.80 | 2.0 |
| Spacing between rows of pins | 20.32 | 0.8 |
| Spacing between pins | 2.54 | 0.1 | 
| Width between holes | 17.78 | 0.7 |
| Length between holes | 45.72 | 1.8 | 
{{!-- END shared-blurb --}}

### Size

The Electron 2 is the same form-factor as the Boron (and Argon), and follows the Adafruit Feather
design specification.

{{imageOverlay src="/assets/images/electron-2/electron-2-dimensions.png" alt="Dimensions" class="full-width"}}

### GPIO and ports

There are no changes the Feather pins for ports and GPIO between the Boron and Electron 2.

{{imageOverlay src="/assets/images/electron-2/electron-2-pinout.svg" alt="Electron 2 Pinout" class="full-width"}}


## Additional information

- [Electron 2 datasheet](/reference/datasheets/e-series/electron-2-datasheet/)
- [Boron BRN404X datasheet](/reference/datasheets/b-series/brn404x-datasheet/)
- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)
- [Cellular carrier list](/reference/cellular/cellular-carriers/)
