---
title: Monitor One setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle Monitor One
---

# {{title}}

This page walks you through unboxing and powering up a [Monitor One](/reference/datasheets/tracker/monitor-one-datasheet/). By the end, the Monitor One will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/monitor-one/monitor-one-box.jpg" alt="Monitor One box" class="no-darken"}}

The Monitor One box contains:

- The Monitor One base model, in an IP67-rated, waterproof enclosure with a flexible mounting plate for walls, rails, poles, and more
- Two expansion cards for customizing I/O:
  - The I/O card, an all-in-one expansion card with CAN, Modbus, RS-485, 4-20mA and 0-10V inputs, 24V I/O, and a dry contact relay output
  - The prototype card, a perf board for hardware integration and validation
- 4-pin M12 cable
- 8-pin M12 cable
- USB cable
- 24V power supply

## What you'll need

- The Monitor One Developer Edition kit
- The power supply (24 VDC, 1 A), which is in the box
- The two M12 cables: the 8-pin cable for power, and the 4-pin cable for I/O and expansion
- Optionally, a micro-USB cable and hex wrenches, for opening the case or installing extras

## Powering on the device

1. Take the M12 8-pin cable. There are two cables in the box, and this is the one used for power.
2. Connect the 5.5 x 2.1 mm barrel jack from the power supply to the barrel socket on the adapter.
3. Plug the M12 8-pin connector into the Monitor One, with the label up and toward the cellular SMA connector.
4. If you disconnect and reconnect the wires, check the polarity. The + terminal should be red and the - terminal black.

{{imageOverlay src="/assets/images/device-setup/monitor-one/monitor-one-open.jpg" alt="Monitor One open" class="no-darken"}}

If you want to use your own power supply, any 6 - 30 VDC, 2 A adapter with a 5.5 x 2.1 mm center-positive barrel plug will work.

For more details on the Monitor One hardware, see the [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/).

## Add to your account

When the device is powered on, go to [setup.particle.io](https://setup.particle.io/) to add it to your account and make sure it's running the latest Device OS.

## Next steps

Once setup is complete, continue with the [getting started guide](/getting-started/guide/device-setup/) to explore the Particle console and program your device.

{{note op="start" type="note"}}
The getting started guide does not fully support the Monitor One yet. You can still use it to learn about the Particle console, but some steps will differ.
{{note op="end"}}
