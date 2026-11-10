---
title: M-SoM setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle M-SoM cellular module
---

# {{title}}

This page walks you through unboxing and setting up an M-SoM, a compact cellular and Wi-Fi M.2 system-on-module. By the end, the M-SoM will be powered up and ready to add to your Particle account. If you have an M635e satellite-capable M-SoM, see [M635e setup](/getting-started/device-setup/m635/) instead.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/msom/M404-top.png" alt="M404" class="no-darken"}}

The M-SoM comes with three antennas that are pre-certified for use with the module: a wide-band cellular antenna, a Wi-Fi/BLE antenna, and a multi-band GNSS antenna supporting L1, L2, and L5. The box contains:

- M-SoM
- PARANTGN1EA, GNSS antenna
- PARANTCW1, certified wide-band cellular antenna
- PARANTWM1, certified Wi-Fi/BLE antenna

{{note op="start" type="note"}}
The Muon board and the M.2 SoM breakout board are sold separately.
{{note op="end"}}

## Choose a board

You can set up the M-SoM on either of these boards:

- The [Muon](/getting-started/device-setup/muon/) carrier board is a ready-to-use development kit form factor. Use it to quickly test connectivity and application code.
- The [M.2 SoM breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/) gives you full access to the module's interfaces. Use it for evaluation, prototyping, or early product design.

## Using the M-SoM with Muon

{{imageOverlay src="/assets/images/device-setup/msom/msom-muon.jpg" alt="M404 on Muon" class="no-darken"}}

See the [Muon setup](/getting-started/device-setup/muon/) page for detailed instructions on installing the M-SoM on the Muon carrier board.

## Using the M-SoM with the M.2 SoM breakout board

{{imageOverlay src="/assets/images/device-setup/msom/msom-m2-breakout.jpg" alt="M404 on the M.2 SoM breakout board" class="no-darken"}}

1. Insert the M-SoM into the M.2 socket on the breakout board.
2. Connect the GNSS, cellular, and Wi-Fi/BLE antennas.
3. Install the power module on the breakout board.
4. Power the board with the supplied AC/DC power adapter.
5. Plug in the battery.
6. Connect the breakout board to your computer with a USB cable.

For more details on the layout and specifications, see the [M.2 SoM breakout board datasheet](/reference/datasheets/m-series/m2-breakout-datasheet/).

## Add to your account

To add the device to your account and make sure it's running the latest Device OS, go to [setup.particle.io](https://setup.particle.io/) and follow the guided instructions.

## Next steps

Once setup is complete, continue with the [getting started guide](/getting-started/guide/device-setup/) to explore the Particle console and program your device.
