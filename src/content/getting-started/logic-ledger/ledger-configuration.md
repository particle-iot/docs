---
title: Ledger configuration
columns: two
layout: commonTwo.hbs
description: Storing device configuration in ledger
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
Ledger is in beta and is not recommended for production applications. There may be breaking changes to the behavior 
and APIs in future versions based on user feedback. 

Pricing and availability may change in the future.

Ledger requires Device OS 5.7.0 or later.
{{box op="end"}}

One use case of a Cloud to Device ledger is storing configuration parameters. You can store data per organization, owner, product, or device. You can implement your own hierarchy (product with device overrides, for example). If ledger values are changed while the device is online, it will generally receive the update quickly, within 30 seconds. If the device is offline, it will receive the updates when the device connects to the cloud again.


## Sandbox product

In order to use Ledger, you will need to:

- Create a product for testing in your developer sandbox. There is no additional charge for this.
- Add one or more devices to the product.

Ledger can only be used with devices in products; it cannot be used with individual developer devices.

## Create a ledger

Create a new **Cloud to Device ledger** for your configuration data. Go to the [Particle console](https://console.particle.io/) and select the **Ledger** icon in your developer sandbox. 

{{imageOverlay src="/assets/images/ledger/ledger-select.png" class="no-darken"}}

Create a new device to cloud ledger named **test-config-defaults**. You may need to rename it if the name is already in use; if you do, you will need to update the device firmware so the names match. This should be a **Product** scoped ledger.

{{imageOverlay src="/assets/images/ledger/config-ledger-defaults.png" class="no-darken"}}

Create a new device to cloud ledger named **test-config-device**. You may need to rename it if the name is already in use; if you do, you will need to update the device firmware so the names match. This should be a **Device** scoped ledger.

{{imageOverlay src="/assets/images/ledger/config-ledger-device.png" class="no-darken"}}

## Device firmware

This is the test device firmware. It requires Device OS 5.7.0 or later.

{{> project-browser project="ledger-config" default-file="src/ledger-config.cpp" height="400"}}

Walking through the code:


