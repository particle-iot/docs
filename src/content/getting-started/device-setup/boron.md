---
title: Boron setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle Boron cellular device
---

# {{title}}

This page walks you through unboxing and setting up a [Boron](/reference/datasheets/b-series/boron-datasheet/), a cellular development board with Bluetooth LE. By the end, the Boron will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/boron/BRN404X-box.jpg" alt="Boron box" class="no-darken"}}

What's in the box depends on whether you purchased the Boron Kit or just the Boron device. Check the contents before you start.

### Boron Kit (BRN404XKIT)

- Boron LTE development board (BRN404X with EtherSIM)
- Mini breadboard
- Cellular flex antenna (PARANTC41EA)
- Micro-USB cable
- Starter components: two 220 Ω resistors, one red LED, and one photodiode

### Boron (board only)

- Boron LTE development board (BRN404X or BRN402)
- Cellular flex antenna (PARANTC41EA)

{{note op="start" type="warning"}}
The Boron must always be used with the included certified cellular antenna to remain compliant with regulatory certifications.
{{note op="end"}}

## What you'll need

- A Boron (BRN404X or BRN402)
- The cellular antenna. It is required and must be attached before you power the device.
- A micro-USB cable for power and data
- A computer (Windows, Mac, or Linux), which you'll use to set up the device and to program it with Particle Workbench
- Optionally, a Li-Po battery for portable or backup power

## Prepare the hardware

1. Connect the cellular antenna to the u.FL connector on the Boron.
2. If you want to use a battery, connect the Li-Po battery.
3. Connect the micro-USB cable between the Boron and your computer. This provides both power and a data connection.

{{imageOverlay src="/assets/images/device-setup/boron/BRN404X-antenna.jpg" alt="Boron antenna" class="no-darken"}}

## Add to your account

To add the device to your account and make sure it's running the latest Device OS, go to [setup.particle.io](https://setup.particle.io/). The guided setup will:

- Sign you in, or create a Particle account if you do not have one yet
- Activate the SIM card
- Update the Device OS if necessary

## Next steps

Once setup is complete, continue with the [getting started guide](/getting-started/guide/device-setup/) to explore the Particle console and program your device.
