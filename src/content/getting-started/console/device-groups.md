---
title: Device groups
columns: two
layout: commonTwo.hbs
description: Using Device Groups for deploying product firmware to a subset of the Particle devices in your product
---

# {{title}}

Device groups allow you to define subsets of your IoT deployment that can
be addressed separately from the rest of the fleet. Groups provide the flexibility
and granularity you need to manage a connected product at scale.

You can create groups for many purposes, including:

- To associate devices in a certain shipment
- To classify by your customer
- To allocate a selection of devices for testing
- By your hardware version

A device can belong to zero or more groups, and groups can be overlapping.

## Assigning device groups

### Product device list

The product device list shows which group(s) a device belongs to, and also allows you to create new groups.

{{imageOverlay src="/assets/images/console/product-devices.png" class="no-darken"}}

### New group 

The **New group** popup allows you to create or delete [device groups](/getting-started/console/device-groups/).

{{imageOverlay src="/assets/images/console/device-group-new.png" class="no-darken"}}

{{imageOverlay src="/assets/images/console/device-group-delete.png" class="no-darken"}}

### View device

If you select a single device from the product device list, it shows details including its groups.

{{imageOverlay src="/assets/images/console/product-device-details.png" class="no-darken"}}

Clicking **Edit** in the upper right makes it possible to change groups for a device.

{{imageOverlay src="/assets/images/console/product-device-edit.png" class="no-darken"}}

### When adding devices

When adding devices to a product you can set its groups.

{{imageOverlay src="/assets/images/console/add-devices-4.png" class="no-darken"}}

You can also do this when adding a single device, and when adding devices from a spreadsheet.

For more information, see [Add devices](/getting-started/console/console/#add-devices-product).

## Releasing firmware to a device group

The **Firmware** panel in a product is used to manage firmware versions and release versions to fleets of devices.

{{imageOverlay src="/assets/images/console/product-firmware.png" class="no-darken"}}

Clicking **Release firmware** brings up the options for releasing. Clicking on **Groups** brings up a list of device groups and also **Product default**.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-20.png" class="no-darken"}}

For more information, see [firmware release process](/firmware/best-practices/firmware-release/).

## Fleet health

When viewing the **Fleet health** panel of a product, you can restrict the health to the devices in a device group.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-22.png" class="no-darken"}}

## From device firmware

Normally device groups are used to manage devices in the console and for releasing product firmware. However, by using a webhook and some device firmware, you can get the device group list from user firmware running on a Particle device.

A 3rd-party library, [DeviceGroupHelperRK](https://github.com/rickkas7/DeviceGroupHelperRK) is available to make this easier. It is also available when using **Particle: Install Library** in Particle Workbench. Or you can use the technique shown in the library directly in your own firmware.



