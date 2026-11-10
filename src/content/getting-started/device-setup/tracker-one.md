---
title: Tracker One setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle Tracker One
---

# {{title}}

This page walks you through unboxing and powering up a [Tracker One](/reference/datasheets/tracker/tracker-one/), a rugged, ready-to-go asset tracking device. It also explains the status LEDs. By the end, the Tracker One will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/tracker-one/t-one-box.jpg" alt="Tracker One kit box" class="no-darken"}}

The Tracker One comes pre-assembled in its IP67-rated enclosure, so you can get started right away. The box contains:

- Tracker One
- USB-C to Type A cable

{{note op="start" type="note"}}
The Tracker One M8 accessory cable and sensors are sold separately.
{{note op="end"}}

## What you'll need

- A Tracker One
- The USB-C to Type A cable that is included in the box. You can also use a USB-C to USB-C cable, but make sure it supports data transfer, not just charging.
- A computer (Windows, Mac, or Linux), which you'll use to set up the device and update the Device OS

{{imageOverlay src="/assets/images/device-setup/tracker-one/tracker-one-by-window.png" alt="Tracker One by a window" class="no-darken"}}

## Powering on the device

The Tracker One ships in shipping mode to preserve the battery during transport. It does not have a power button. To wake it from shipping mode:

1. Connect the USB cable to the Tracker One.
2. Plug the other end into your computer or a dedicated USB power supply.

{{imageOverlay src="/assets/images/device-setup/tracker-one/tone-usb-c-plugged.png" alt="Tracker One with USB-C cable" class="no-darken"}}

This powers up the device and begins the startup sequence.

## Status LEDs

Once powered on, the Tracker One uses LEDs to indicate its status, including the charging state, GNSS (GPS) status, and cloud connection.

{{imageOverlay src="/assets/images/device-setup/tracker-one/t-one-led-cell-connect.gif" alt="Tracker One LEDs" class="no-darken"}}

### Charge LED (yellow)

The charge LED shows the status of the battery charging circuit.

- Off: No charging or no power
- On: The battery is charging
- Blinking: Charging fault
- Flickering: No battery connected

### GNSS LED (blue)

The GNSS LED shows the status of the GNSS receiver.

- Off: GNSS is powered off
- Blinking (1 Hz): Attempting to acquire a satellite fix
- Solid on: GNSS fix acquired

### Cloud status LED (RGB)

The cloud status LED shows the cellular and Particle cloud connection status.

- Red breathing: Connecting to the cellular network
- Yellow breathing: Connecting to the cloud (weak signal)
- Green breathing: Connecting to the cloud (good signal)
- Yellow solid: Connected to the cloud (weak signal)
- Green solid: Connected to the cloud (good signal)

## Add to your account

To add the device to your account and make sure it's running the latest Device OS, go to [setup.particle.io](https://setup.particle.io/). The guided setup will:

- Sign you in, or create a Particle account if you do not have one yet
- Activate the SIM card
- Update the Device OS if necessary

## Next steps

Once setup is complete, continue with the [getting started guide](/getting-started/guide/device-setup/) to explore the Particle console and program your device.

{{note op="start" type="note"}}
The getting started guide does not fully support the Tracker One yet. You can still use it to learn about the Particle console, but some steps will differ. See [Tracker setup](/getting-started/tracker/tracker-setup/) for Tracker-specific instructions.
{{note op="end"}}
