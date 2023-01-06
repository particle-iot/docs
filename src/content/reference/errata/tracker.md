---
title: Tracker system errata
columns: two
layout: commonTwo.hbs
description: Tracker system errata
---

# {{title}}

This document contains known bugs, limitations, and errata for the Tracker SoM, Tracker One, and Tracker Eval board.

## Tracker One - Shipping Mode

Particle has discovered an issue with GPIO current leakage through Tracker One's M8 connector that affects Tracker One v1.0 devices manufactured prior to August 31, 2020 and can adversely affect the use of shipping mode for devices that use the M8 connection to an external peripheral device. For more information see [TAN002 - Tracker One v1.0 Shipping Mode](/reference/technical-advisory-notices/tan002-tracker-one-v10-shipping-mode/).

## Tracker SoM - GNSS Interface

Particle has identified an issue with the u-blox Neo M8U communications interface on our Tracker SoM modules that can be found inside Particle products including the Tracker One and Tracker SoM Evaluation kits. This issue manifests itself in a situation where a Tracker SoM wakes from sleep and turns on the GNSS chipset to acquire the device’s current location - in some units, some of the time, the GNSS chipset does not initialize correctly and the device fails to acquire its location in the allotted time period before the device goes back to sleep. Subsequent GNSS acquisition cycles are not impacted if a prior cycle has failed. [See TAN008](/reference/technical-advisory-notices/tan006-tracker-som-gnss-interface/) for more information.

