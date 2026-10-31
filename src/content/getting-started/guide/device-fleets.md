---
title: Device fleets
columns: two
layout: commonTwo.hbs
description: Managing a fleet of devices
---

# {{title}}

{{section-nav}}

This section demonstrates device fleets which allow you to group devices with a common set of firmware and manage them as a group, allowing automatic firmware updates and fleet monitoring.

Any product can have multiple devices, including those in the free tier.

## Firmware

The firmware from the last section, environment variables, will be reused in this section with a fleet of devices.

I've opened [console.particle.io](https://console.particle.io/), then my product (Chivalrous Pink Borons), then the product device list.

Since there's a `PRODUCT_VERSION(1)` in the firmware, you can see that listed in the product device list now.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-01.png" class="no-darken"}}

## Setting up a device fleet

When you order Particle devices in bulk (tray or reel quantities) from the Particle store, you'll get an email containing the Device IDs and serial numbers for the devices in your order.

For my small test, I created a text file with the serial numbers in my test fleet.

- You can scan the serial number from the data matrix code on the serial number label (it looks similar to a QR code)
- You can obtain the Device ID if you are connecting the device by USB, using `particle identify`, or when flashing code 

Click the **Add devices** button in the device list.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-02.png" class="no-darken"}}

Then **Add many devices**, and drag and drop the file of Device IDs or serial numbers onto the window. This step does two things:

- Adds the device to your product
- Activates the SIM (for cellular devices)

{{imageOverlay src="/assets/images/getting-started-guide/fleet-03.png" class="no-darken"}}

If you are part of a growth or enterprise plan, adding the device to your product does not immediately start billing. Billing only starts after the device connects to the cloud the first time, so you can add the device to your product during manufacture without having to worry about incurring costs.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-pic.jpg" class="no-darken"}}


We recommend flashing Device OS and your product firmware by USB or SWD/JTAG during manufacture, rather than doing the initial update OTA. This speeds up the first connection process. The [scaling](/scaling/scaling/) section of the docs provides more best practices.

For a few test devices, using **Particle: Flash application & DeviceOS (local)** over USB works fine.

Once all of the devices have been added to your product and come online, you can see them in your device list.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-devices.png" class="no-darken"}}

Since my test devices are cellular, there is also information in the SIM panel.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-sims.png" class="no-darken"}}


## Releasing firmware


{{imageOverlay src="/assets/images/getting-started-guide/fleet-04.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-05.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-06.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-07.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-08.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-09.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/fleet-10.png" class="no-darken"}}


## Cloud debug logs




{{section-nav}}

