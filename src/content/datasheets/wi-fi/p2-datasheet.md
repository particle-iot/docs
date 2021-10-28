---
title: P2 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle P2, Wi-Fi mass-production module
---

# P2 Datasheet <sup>(pre)</sup>

**Preliminary pre-release version 2021-10-28**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

## Functional description

### Overview

[To be provided at a later date.]

### Features

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - Integrated PCB antenna
  - Integrated U.FL connector for external antenna
  - Integrated RF switch
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8721DM MCU
  - ARM Cortex M4F CPU, 200 MHz
- 1024 KB (1 MB) user application maximum size
- 2 MB flash file system


## Interfaces

### Block Diagram

[To be provided at a later date.]

### Power

[To be provided at a later date.]

### RF

- The P2 includes an on-module PCB trace antenna and a U.FL connector that allows the user to connect an external antenna.
- The antenna is selected in software. The default is the PCB trace antenna.
- The area surrounding the PCB antenna on the carrier PCB should be free of ground planes and signal traces for maximum Wi-Fi performance when using the trace antenna.


### FCC Approved Antennas

[To be provided at a later date.]

---

### Peripherals and GPIO

[To be provided at a later date.]

### RGB LED, SETUP and RESET button

When using the P2 module, it is very important to remember that your device must have an RGB LED to show the user the connectivity status.  Also required is a SETUP and RESET button to enter various [Device Modes](/tutorials/device-os/led/). By default the RGB LED outputs are configured for a Common Anode type of LED. 

---

### SWD/JTAG

The P2 module supports programming and debugging use SWD (Serial Wire Debug) on pins D6 and D7.

| Pin | JTAG | SWD | MCU Pin | P2 Pin # | Pull at boot |
| :-:|:-:|:-:|:-:|:-:|:-:|:- |
| D7 | SWDIO | PA[27] | 54 | Pull-up |
| D6 | SWCLK | PB[3] | 55 | Pull-down |
| 3V3 | Power | | | | |
| GND | Ground | | | | |
| RST | Reset | | | | |

When the bootloader starts, for a brief period of time a weak pull-up is applied to pin D7 and pull-down to pin D6 to detect whether a SWD debugger is attached. After boot, you can use these things for regular GPIO, but beware of a possible GPIO state change caused by the pull-up or pull-down when using these pins as output.

---

## Memory Map

### Flash Layout Overview

[To be provided at a later date.]

### DCT Layout

[This information is from the P1, and is likely to remain the same, but is subject to change.]

The DCT area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCT layout in `release/stable`_ <a href="https://github.com/particle-iot/device-os/blob/release/stable/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

| Region | Offset | Size |
|:---|---|---|
| system flags | 0 | 32 |
| version | 32 | 2 |
| device private key | 34 | 1216 |
| device public key | 1250 | 384 |
| ip config | 1634 | 120 |
| feature flags | 1754 | 4 |
| country code | 1758 | 4 |
| claim code | 1762 | 63 |
| claimed | 1825 | 1 |
| ssid prefix | 1826 | 26 |
| device code | 1852 | 6 |
| version string | 1858 | 32 |
| dns resolve | 1890 | 128 |
| reserved1 | 2018 | 64 |
| server public key | 2082 | 768 |
| padding | 2850 | 2 |
| flash modules | 2852 | 100 |
| product store | 2952 | 24 |
| antenna selection | 2976 | 1 |
| cloud transport | 2977 | 1 |
| alt device public key | 2978 | 128 |
| alt device private key | 3106 | 192 |
| alt server public key | 3298 | 192 |
| alt server address | 3490 | 128 |
| device id | 3618 | 12 |
| radio flags | 3630 | 1 |
| mode button mirror | 3631 | 32 |
| led mirror | 3663 | 96 |
| led theme | 3759 | 64 |
| reserved2 | 3823 | 435 |

**Note:** Writing 0xFF to offset 34 (DEFAULT) or 3106 (ALTERNATE) will cause the device to re-generate a new private key on the next boot. Alternate keys are currently unsupported on the P1 but are used on the Electron as UDP/ECC keys.  You should not need to use this feature unless your keys are corrupted.

```
// Regenerate Default Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 34 -D fillbyte
// Regenerate Alternate Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 3106 -D fillbyte
```

### Memory Map

[To be provided at a later date.]

---

## Pin and button definition

### Pin markings

[To be provided at a later date.]

### Pin description

[To be provided at a later date.]

### Pinout diagram

[To be provided at a later date.]

### Complete P1 Module Pin Listing

[To be provided at a later date.]



## Technical specification

### Absolute maximum ratings

[To be provided at a later date.]

### Recommended operating conditions

[To be provided at a later date.]

### Wi-Fi Specifications

[To be provided at a later date.]


### I/O Characteristics

[To be provided at a later date.]

## Mechanical specifications

### Overall dimensions

[To be provided at a later date.]

### Module Dimensions

[To be provided at a later date.]

### Recommended PCB land pattern

[To be provided at a later date.]

## Reference Design Schematic

[To be provided at a later date.]

## Recommended solder reflow profile

[This information is from the P1, and is likely to remain the same, but is subject to change.]

<div align=left><img src="/assets/images/photon-reflow-profile.png" width=600></div>

| Phase | Temperatures and Rates |
| -:|:- |
| A-B. | Ambient~150°C, Heating rate: < 3°C/s |
| B-C. | 150~200°C, soak time: 60~120 s |
| C-D. | 200~245°C, Heating rate: < 3°C/s |
| D.   | Peak temp.: 235~245°C, Time above 220°C: 40~90 s |
| D-E. | 245~220°C, Cooling rate: < 1°C/s |

## Ordering information

[To be provided at a later date.]

## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: [To be provided at a later date.]
-	IC: [To be provided at a later date.]

## Product handling

### Tape and Reel Info

[To be provided at a later date.]

### Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

## Default settings

The P2 module comes pre-programmed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the [Particle Web IDE](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air). [Particle Workbench](/quickstart/workbench/) is a full-featured desktop IDE for Windows, Mac, and Linux based on VSCode and supports both cloud-based and local gcc-arm compiles. The [Particle CLI](/tutorials/developer-tools/cli/) provides a command-line interface for cloud-based compiles and flashing code over USB.

## Glossary

<div class="dictionary-wrapper">
<dd>Radio Frequency</dd>
<dt>SMT</dt>
<dd>Surface Mount Technology (often associated with SMD which is a surface mount device).</dd>
<dt>AP</dt>
<dd>Access Point</dd>
<dt>USB</dt>
<dd>Universal Serial Bus</dd>
<dt>Quiescent current</dt>
<dd>Current consumed in the deepest sleep state</dd>
<dt>FT</dt>
<dd>Five-tolerant; Refers to a pin being tolerant to 5V.</dd>
<dt>3V3</dt>
<dd>+3.3V; The regulated +3.3V supply rail.  Also used to note a pin is only 3.3V tolerant.</dd>
<dt>RTC</dt>
<dd>Real Time Clock</dd>
<dt>OTA</dt>
<dd>Over The Air; describing how firmware is transferred to the device.</dd>
</div>

## FCC IC CE Warnings and End Product Labeling Requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:
> Contains FCC ID: [To be provided at a later date]

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.

---

**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:
> Contains transmitter module IC: [To be provided at a later date]

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2021-10-28 | RK | Pre-release |


## Known Errata

## Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

https://support.particle.io
