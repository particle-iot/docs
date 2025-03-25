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


The BLE and NFC antennas are the same. If you are not using these features, you can omit the antennas.

### Size

The Electron 2 is the same form-factor as the Boron (and Argon), and follows the Adafruit Feather
design specification.

### GPIO and ports

There are no changes the Feather pins for ports and GPIO.


### Cellular providers

The Electron 2 has a programmable e-sim in place of the MFF2 SMD Particle EtherSIM. The e-sim is not user-programmable.

The carriers programmed into the e-sim on the Electron 2 are identical to the BRN404X, BRN404, and BRN314, however.

The Electron 2 does not have a 4FF plastic SIM card socket for use with an external SIM card. It can only be used 
with the built-in EtherSIM.

