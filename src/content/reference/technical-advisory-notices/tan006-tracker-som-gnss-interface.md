---
title: TAN006 - Tracker SoM GNSS Interface
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

Advisory notice to all customers to upgrade products based on the Tracker SoM (including the Tracker One product line) to version [**v16** of Tracker Edge firmware](https://github.com/particle-iot/tracker-edge/releases), released Nov 5th, 2021\. Prior versions of Tracker Edge may demonstrate an issue with the GNSS chipset when waking from sleep, leading to some unreliability in the capture of GNSS location data by the product.

Published: November 5, 2021

## Issue summary

Particle has identified an issue with the u-blox Neo M8U communications interface on our Tracker SoM modules that can be found inside Particle products including the Tracker One and Tracker SoM Evaluation kits. This issue manifests itself in a situation where a Tracker SoM wakes from sleep and turns on the GNSS chipset to acquire the device’s current location - in some units, some of the time, the GNSS chipset does not initialize correctly and the device fails to acquire its location in the allotted time period before the device goes back to sleep. Subsequent GNSS acquisition cycles are not impacted if a prior cycle has failed.

Particle has determined that an impacted unit might encounter this error condition 0.0008% of the time when it initializes the GNSS chipset if running on Tracker Edge firmware prior to **v16**.

## Products affected

* Tracker One LTE M1 (NorAm) (ONE402MEA)
* Tracker One LTE M1 with EtherSIM (NorAm) (ONE404MEA)
* Tracker One LTE CAT1/3G/2G (Europe) (ONE523MEA)
* Tracker One LTE CAT1/3G/2G with EtherSIM (Europe) (ONE524MEA)
* Tracker SoM Evaluation Kit LTE M1 (NorAm) (T402MKIT)
* Tracker SoM Evaluation Kit LTE CAT1/3G/2G (Europe) (T523MKIT)
* Tracker SoM Evaluation Kit One LTE M1 with EtherSIM (NorAm) (T404MKIT)
* Tracker SoM Evaluation Kit One LTE CAT1/3G/2G with EtherSIM (Europe) (T524MKIT)
* Tracker SoM LTE M1 (NorAm) (T402MEA)
* Tracker SoM LTE CAT1/3G/2G (Europe) (T523MEA)
* Tracker SoM LTE M1 (NorAm) (T404MEA)
* Tracker SoM LTE CAT1/3G/2G (Europe) (T524MEA)

## Identification of a non-working unit

Identifying a device exhibiting this issue is difficult due to the fallible nature of GNSS data capture. For most users of the Tracker SoM, this GNSS failure mode presents itself with the same symptoms as a device simply unable to acquire a position lock in the allowed time before the device must return to sleep. 

In Tracker Edge v16, we added several flags to identify when a device would have failed to initialize the GNSS chipset (in prior Tracker Edge versions), which are reported in the periodic location update message from the Tracker to the Particle Cloud. The flags are inserted into the message as follows:

1. A trigger source named “err” has been added to the location publish, “loc”, messages to indicate if the GNSS module (u-blox Neo M8U) is not configured correctly with the workaround.

With prior versions of Tracker Edge, initializing the GNSS chipset may block execution for so long that the watchdog resets the device. This watchdog reset will cause the device to cold reboot and re-initialize the GNSS chipset, which invariably succeeds, masking the symptom. 

## Issue summary

The u-blox Neo M8U communications interface selection wire (D\_SEL) is used on the Tracker SoM to select between UART and SPI communication interfaces at boot-up. In our initial design, a 100K ohm strapping resistor was chosen (R77) to pull the D\_SEL pin low to select the SPI bus interface. Particle has found that this resistor value selected may, in some boards, be too high to fully drain the D\_SEL pin of charge between boot up cycles, causing the NEO M8U chipset to initialize with the wrong communication interface selected and not be communicable by the Tracker Edge firmware when it tries to initialize the firmware interface.

## Issue mitigation

### Hardware solution

Tracker SoMs and derivative products built after 1 October 2021 will have the 100K ohm resistor replaced with a 0 ohm resistor to provide plenty of current to select the SPI bus interface with the D\_SEL input. Particle has validated that this bill-of-material change eliminates the issue.

### Software solution in Tracker Edge v16

The following software change has been applied to Tracker Edge v16 that provides a robust workaround for this issue.

1. The power rail initialization sequence has been changed on the Tracker SoM to assert the GNSS reset line in concert with the power enable. This sequence has been found to not allow incidental charge to build up on the D\_SEL pin and it will initialize itself to zero and operate correctly on the SPI interface.

Additionally, the following changes have been made to better identify the issue occurring in the field:

1. A visual indication has been added to flash the GPS LED at a rapid rate if the GNSS module (u-blox Neo M8U) is not configured correctly with the workaround.
2. A trigger source named “err” has been added to the location publish, “loc”, messages to indicate if the GNSS module (u-blox Neo M8U) is not configured correctly with the workaround.
