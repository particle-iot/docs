---
title: B-SoM setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle B-Series SoM cellular module
---

# {{title}}

This page walks you through unboxing and setting up a B-Series SoM (B-SoM), a cellular M.2 system-on-module with Bluetooth LE designed for IoT products. By the end, the B-SoM will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/bsom/B404X-box.png" alt="B404X box" class="no-darken"}}

The B-SoM box contains:

- B-SoM system-on-module
- Cellular antenna (PARANTC41EA)
- Bluetooth antenna (ANT-FLXV2)

{{note op="start" type="note"}}
The M.2 SoM breakout board and the M.2 evaluation board are sold separately.
{{note op="end"}}

## Choose a board

You can set up the B-SoM on either of these boards:

- The [M.2 SoM breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/), which gives you the most flexibility when evaluating and designing custom hardware
- The [M.2 evaluation board](https://store.particle.io/products/som-evaluation-board?variant=30588638167109), which is older hardware

## Using the M.2 SoM breakout board

{{imageOverlay src="/assets/images/device-setup/bsom/m2-breakout-bsom.jpg" alt="B-SoM on the M.2 SoM breakout board" class="no-darken"}}

1. Insert the B-SoM into the M.2 socket on the breakout board.
2. Connect the cellular and Bluetooth antennas.
3. Install the power module on the breakout board.
4. Power the board with the supplied AC/DC power adapter.
5. Plug in the battery.
6. Connect the breakout board to your computer with a USB cable.

For more details on the layout and specifications, see the [M.2 SoM breakout board datasheet](/reference/datasheets/m-series/m2-breakout-datasheet/).

## Using the M.2 evaluation board

{{imageOverlay src="/assets/images/device-setup/bsom/m2-eval-bsom.jpg" alt="B-SoM on the M.2 evaluation board" class="no-darken"}}

For detailed instructions on setting up the B-SoM on the M.2 evaluation board, see the [M.2 evaluation board datasheet](/reference/datasheets/b-series/b-series-eval-board/).

## Add to your account

To add the device to your account and make sure it's running the latest Device OS, go to [setup.particle.io](https://setup.particle.io/) and follow the guided instructions.

## Next steps

Once setup is complete, continue with the [getting started guide](/getting-started/guide/device-setup/) to explore the Particle console and program your device.
