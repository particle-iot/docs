---
title: Ledger
columns: two
layout: commonTwo.hbs
description: Ledger
---

# {{title}} (Beta)

{{box op="start" cssClass="boxed warningBox"}}
Ledger is in beta and is not recommended for production applications. There may be breaking changes to the behavior 
and APIs in future versions based on user feedback. 

Pricing and availability may change in the future.
{{box op="end"}}

Ledger allows data to be stored in the cloud, per-device, per-product, or per owner account. 

The three types of Ledgers are:

| Scope | Description | Availability |
| :--- | :--- | :--- |
| Cloud Ledger | Stores information in the cloud without syncing to the edge. | In Beta Now |
| Device to Cloud Ledger | Device storage that syncs automatically to the cloud | In Beta Now |
| Cloud to Device Ledger | Set data in the cloud that will sync to devices | In Beta Now |

Each ledger is a block of JSON data, up to 16 Kbytes in length. You can define the data format yourself, and it does not need to be pre-defined (no schema required). It can contain simple values (string, number, boolean) as well as nested objects and arrays.

Device to Cloud and Cloud to Device ledgers require Device OS 5.7.0 or later. This feature is currently in beta and will not be available in a Device OS 4.x LTS release. Device ledger support will not be available on Gen 2 devices (E Series other than the E404X, Electron, P1, and Photon 1).

## Console

You can view and edit ledgers in the [Particle console](https://console.particle.io). 

Ledger is only available to products, not individual developer devices. During beta, it's only available to free sandbox products, not to organization products.

To access Ledger, open the console and select the **Ledger** icon in the left-hand navigation icons.

{{imageOverlay src="/assets/images/ledger/ledger-console.png" class="no-darken"}}

### Select ledger type - console

- Cloud Ledger: Stores information in the cloud without syncing to the edge.
- Device to Cloud Ledger: Device storage that syncs automatically to the cloud.
- Cloud to Device Ledger: Set data in the cloud that will sync to devices.

{{imageOverlay src="/assets/images/ledger/ledger-select.png" class="no-darken"}}

### Ledger options - console

| Option | Description |
| :--- | :--- |
| Ledger Name | Lowercase alphanumeric and dash, up to 32 characters, unique across all scopes |
| Description | Description for your use |
| Scope | Product, Device, Owner |

When scoped to a product, you don't specify the product ID in the options; if that project uses that ledger an instance will automatically be crated.

Likewise, when scoped to device, whenever that device accesses the ledger an instance will automatically be created.

{{imageOverlay src="/assets/images/ledger/ledger-options.png" class="no-darken"}}

### Ledger instances - console

For Owner scoped ledger, there will only be one instance listed:

{{imageOverlay src="/assets/images/ledger/ledger-instances.png" class="no-darken"}}

For product scoped ledgers, if a product accesses the ledger a new instance will be created and can be viewed here.

For device scoped ledgers, if the device accesses the ledger a new instance will be created. 

### View ledger - console

You can also view and edit a ledger instance from the console. In this view, you can add rows, which correspond to top-level values in the JSON data. You can set number (integer or floating point), string, and boolean (`true` or `false`) values using this user interface:

{{imageOverlay src="/assets/images/ledger/ledger-values.png" class="no-darken"}}

### View ledger advanced - console

In the **Advanced** tab, you can set arbitrary JSON data, including nested objects, arrays, and any other valid JSON constructs.

{{imageOverlay src="/assets/images/ledger/ledger-advanced.png" class="no-darken"}}

When using the [Cloud API](/reference/cloud-apis/api/#ledger) you get back the entire JSON data structure for a ledger instance.

## Cloud ledger - console

- Stores information about a device, product or your entire fleet in the cloud.
- Data can be read and written by your applications through the Particle API and Logic Functions.
- Cloud Ledgers cannot be read by a device.

Common use cases:

- Aggregate data about devices using a Logic Function.
- Managing device lifecycle data.
- Parameters for processing in Logic Functions.

{{imageOverlay src="/assets/images/ledger/ledger-cloud.png" class="no-darken"}}

## Device to Cloud ledger - console

- Store information on a device in a structured manner.
- Device OS reliably sends the data to the cloud automatically when device is online.
- Data can be read by your applications through the Particle API and Logic Functions.

Common use cases:

- Make latest device state accessible whether device is online or not.
- Record anomalous events for maintenance and diagnostics.
- Aggregate data on the edge and make a summary available to the cloud.

{{imageOverlay src="/assets/images/ledger/device-to-cloud.png" class="no-darken"}}

For an example of using a Device to Cloud Ledger to store sensor data, see [Ledger sensor](/getting-started/logic-ledger/ledger-sensor).


## Cloud to Device ledger - console

- Stores information about a device, product or your entire fleet in the cloud.
- Cloud reliably sends latest data to devices as soon as devices get online.
- Data can be scoped to an individual device, to the devices in a product, or to all your devices.
- Data can be read and written by your applications through the Particle API and Logic Functions.

Common use cases:

- Send commands to devices regardless if device is online or not.
- Setting individual device thresholds or parameters.
- Implement policies for a fleet of devices.

{{imageOverlay src="/assets/images/ledger/cloud-to-device.png" class="no-darken"}}

### Using Ledger for configuration

One common use case is to store configuration using Ledger. Since each Ledger is scoped to an organization, owner, product, or device, you can implement a custom hierarchy of configuration. For example, you can have product defaults in a product ledger, and device-specific values in a device-specific ledger. You can read both ledgers on-device and implement your own desired override behavior.



## Using Ledger from Logic

You can easily access owner, product, and device ledgers from Logic.

- Store published events in Ledger using Logic.
- Move business logic from device firmware to the cloud using Logic.

See [Using Ledger from Logic](/getting-started/logic-ledger/logic/#using-ledger-from-logic) in the Logic documentation for more information.

## Using Ledger from the Particle Cloud API

Ledger can be also be accessed using the Particle Cloud REST API. See the [Cloud API reference](/reference/cloud-apis/api/#ledger) for more information.


