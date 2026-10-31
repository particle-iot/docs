---
title: Cloud LED
columns: two
layout: commonTwo.hbs
description: Cloud connected LED
---

# {{title}}

{{section-nav}}

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudLed, and paste the contents CloudLed.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="CloudLed" default-file="src/CloudLed.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

Once the firmware is running you can try making function calls to it.

## Making function calls

### Console - making function calls

I've opened [console.particle.io](https://console.particle.io/), then my product (Chivalrous Pink Borons), the product device list, then my device (wombat_magnetic). If you still have it opened from the last section, close it and reopen the device.

{{imageOverlay src="/assets/images/getting-started-guide/cloud-led-1.png" class="no-darken"}}

Of particular interest is the **Functions** panel on the right side of the window.

Enter: **255,255,0** (no spaces, with commas between the numbers ) and click **Call**.

{{imageOverlay src="/assets/images/getting-started-guide/cloud-led-2.png" class="no-darken"}}

The status LED of the device should change to solid red for 10 seconds!

The numbers are red,green,blue and range from 0-255, so solid dark blue would be 0,0,255. Try some other colors.

### Particle CLI - making function calls

You can also make function calls from the Particle CLI. 

From the command palette, **Particle: Launch CLI**. A new Terminal pane will appear at the bottom of the window.

{{imageOverlay src="/assets/images/getting-started-guide/cloud-led-3.png" class="no-darken"}}

Enter in the terminal window:

```
particle call wombat_magnetic setColor 0,255,0
```

Replace wombat_magnetic with the name of your device. Everything else should be the same, and several parts of the command line are case-sensitive.

The status LED of the device should change to solid green.

### USB serial debug

If you are monitoring the USB serial debug log, you'll see a message when the color changes, and when it reverts back to normal:

```
0000012822 [system] INFO: Cloud connected
0000222622 [app] INFO: setColor 255,0,0
0000222622 [app] INFO: red=255 green=0 blue=0
0000232622 [app] INFO: reverted to normal color scheme
0000643743 [app] INFO: setColor 0,255,0
0000643744 [app] INFO: red=0 green=255 blue=0
0000653744 [app] INFO: reverted to normal color scheme
```

## Environment variables

This code demonstrates two features: functions and environment variables.

{{!-- BEGIN shared-blurb 79e94a32-654d-4961-8498-5d7969690c4a --}}
Environment is a collection of lightweight, non‑secret, name - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware, they allow configuration of both Device OS features and user features in a hierarchical manner from organization, the product, with optional per-device overrides.
{{!-- END shared-blurb --}}

Environment variables are available in Device OS 6.4.0 and later. If you build the firmware with a target of an older version of Device OS, it will still build, but without the functionality.

For more information, see [Environment](/getting-started/configuration/environment/).

### Setting an environment variable


## Explaining the code





{{section-nav}}

