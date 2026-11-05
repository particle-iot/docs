---
title: Device setup and console
columns: two
layout: commonTwo.hbs
description: Setting up a new Particle device and using the Particle console
includeDefinitions: [device-animation]
---

# {{title}}

{{section-nav}}

The getting started guide section of the Particle docs contains tutorials and examples for getting started with Particle devices and the Particle platform.

In this section I'll set up a device and begin exploring the Particle console.

{{content-nav}}

## Compatible devices

Once you have received your Particle device, you need to set it up, which generally involves adding it to your account and updating its software. For cellular devices, setup activates the SIM card. For Wi-Fi devices setup, adds your Wi-Fi credentials.

This tutorial uses a Boron, a cellular device, but the tutorial works with most Particle devices including:

- [Boron](/reference/datasheets/b-series/boron-datasheet/): Cellular (Feather, Gen 3)
- [Photon 2](/reference/datasheets/wi-fi/photon-2-datasheet/): Wi-Fi (Feather, Gen 4)
- [Argon](/reference/datasheets/wi-fi/argon-datasheet/): Wi-Fi (Feather, Gen 3)

It can also be used with our M.2 SoM devices, typically in the [M.2 breakout board](/reference/datasheets/m-series/m2-breakout-datasheet/), [B-SoM eval board](/reference/datasheets/b-series/b-series-eval-board/), or [Muon](/reference/datasheets/m-series/muon-datasheet/).

- [M-SoM](/reference/datasheets/m-series/msom-datasheet/) M404 or M524: Cellular and Wi-Fi
- B-SoM: [B404X](/reference/datasheets/b-series/b404x-datasheet/), [B404/B402](/reference/datasheets/b-series/b404-b402-datasheet/), [B524/B523](/reference/datasheets/b-series/b524-b523-datasheet/), [B504e](/reference/datasheets/b-series/b504-datasheet/)

Even though the basic techniques are the same, the exact steps will be different with a [Tracker One](/reference/datasheets/tracker/tracker-one/) or [Monitor One](/reference/datasheets/tracker/monitor-one-datasheet/), so those are not ideal for use with this guide.

{{imageOverlay src="/assets/images/getting-started-guide/boron.jpg" class="no-darken"}}

{{note op="start" type="gen2"}}
You can also use this guide with Gen 2 devices, however some of the later sections use features like environment variables and 
typed publish that are only available on Gen 3 and Gen 4 devices. You can still set up your Gen 2 device and begin programming 
it using this guide.
{{note op="end"}}

## Device setup

You will generally set up your device from a computer (Windows, Linux, Mac) connected by USB to your devices. A Chromebook can be used for device setup, but you'll need a full computer to install and use the Particle Workbench development environment.

Simply follow the instructions at: [https://setup.particle.io/](https://setup.particle.io/).

{{imageOverlay src="/assets/images/getting-started-guide/setup-01.png" class="no-darken"}}

If you do not already have a Particle account you can create one as part of the setup process. You will use this account to access things like the Particle console in the next step. It's quick and there is no fee or credit card required.

{{imageOverlay src="/assets/images/getting-started-guide/create-account.png" class="no-darken"}}

When you reach the last step of setup you can click the button to **Go to Console**.

{{imageOverlay src="/assets/images/getting-started-guide/setup-last.png" class="no-darken"}}

## Console

The Particle console can be found any time at [https://console.particle.io/](https://console.particle.io/). 

{{!-- It's recommended that you use it with Chrome, Firefox, Safari, or current versions of Edge. It does not work with many older browsers, including Internet Explorer. --}}

### Sandbox

When you open the console you'll see the home view:

{{imageOverlay src="/assets/images/getting-started-guide/console-home.png" class="no-darken"}}

Initially you will be in **Sandbox** view where you see your personal devices. If your account is associated with your company, the Sandbox popup at the top will allow you to switch into your company's organization to see their devices.

The icons along the left allow you to see your personal devices, SIM cards, integrations, and billing information.

### Products

Setup automatically creates a product for your device. I recommend working in product view, even if your goal is not to create a commercial product. A product just keeps the settings and devices organized for a fleet of devices, and there is no fee to create as many products as you need. A fleet can be as small as a single device.

When I set up my Boron, I used the default, randomly generated product and device names. This is my device list view in the console:

{{imageOverlay src="/assets/images/getting-started-guide/product-devices.png" class="no-darken"}}


## Status LED and device modes

Most devices have an RGB status LED and it can tell you a lot about what the device is doing. 

First, a few basic terms:

- Blinking: The LED is blinking on and off. There is also fast blinking.
- Breathing: The LED gently fades on, then fades off, and repeats. This is the normal operating condition.

Additionally, there are a few standard colors.

- Cyan: A light blue color. When your device is breathing cyan, it's operating normally.
- Green: Generally used for connecting to network.
- Blue (dark blue): Certain setup modes. On Wi-Fi devices that do not have Wi-Fi credentials yet, the device will blink dark blue.
- Magenta (red and blue at the same time): Device is being updated, or awaiting updates.
- Yellow: Device is being programmed by USB.

When you first turn on a device, it will generally progress through a series of stages:

- Blink white: Powered on. This might be a single blink, and you might not see it.
{{!-- BEGIN shared-blurb 39fe3a4d-397e-417f-b7f5-b1f91d69cee4 --}}
- Blinking green: Connecting to the network (cellular or Wi-Fi).
- Blinking cyan: Connecting to the Particle cloud.
- Fast blinking cyan: Last step of connecting to the Particle cloud.
- Breathing cyan: Successfully connected.
{{!-- END shared-blurb --}}

You can find more on the [Status LED and device modes](/troubleshooting/led/) page.

{{device-animation device "breathe" "cyan" }}

{{section-nav}}

