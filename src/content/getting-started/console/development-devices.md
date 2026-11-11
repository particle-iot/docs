---
title: Development devices
columns: two
layout: commonTwo.hbs
description: Using Development Devices to rapidly iterate device firmware for Particle products
---

# {{title}}

When viewing the device list for a product, there are options in the **...** button.

{{imageOverlay src="/assets/images/console/product-device-list-options.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 74f89cd2-5118-4233-9b9d-7f64a2322a0a --}}
Using **Mark development** does several things:

- Disables fleet flashing to the device. If you are doing active development and flashing your device by USB or OTA directly from Particle Workbench you need to enable Mark Development, otherwise the cloud may immediately overwrite the firmware you flashed with the product default or pinned versions.
- Enables override for all typed configuration settings for Tracker devices.
- Allows local flashing by USB for devices with device protection enabled (enterprise accounts only).
{{!-- END shared-blurb --}}

You can tell which devices have Mark development set by the tool icon to the right of the version number in the product device list.

{{imageOverlay src="/assets/images/console/product-device-development.png" class="no-darken"}}

For more information, see [firmware release process](/firmware/best-practices/firmware-release/).

## From the Particle cloud API

You can also [use the Particle cloud API](/reference/cloud-apis/api/#unmark-product-development-device) to set the mark development flag.

