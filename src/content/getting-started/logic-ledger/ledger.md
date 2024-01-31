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
| Device to Cloud Ledger | Device storage that syncs automatically to the cloud | Beta soon |
| Cloud to Device Ledger | Set data in the cloud that will sync to devices | Beta soon |

Each ledger is a block of JSON data, up to 16 Kbytes in length. You can define the data format yourself, and it does not need to be pre-defined (no schema required). It can contain simple values (string, number, boolean) as well as nested objects and arrays.

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

### Cloud ledger uses - console

- Stores information about a device, product or your entire fleet in the cloud.
- Data can be read and written by your applications through the Particle API and Logic Functions.
- Cloud Ledgers cannot be read by a device.

Common Use Cases:
- Aggregate data about devices using a Logic Function.
- Managing device lifecycle data.
- Parameters for processing in Logic Functions.

{{imageOverlay src="/assets/images/ledger/ledger-cloud.png" class="no-darken"}}

### Cloud ledger options - console

| Option | Description |
| :--- | :--- |
| Ledger Name | Lowercase alphanumeric and dash, up to 32 characters, unique in scope |
| Description | Description for your use |
| Scope | Product, Device, Owner |

When scoped to a product, you don't specify the product ID in the options; if that project uses that ledger an instance will automatically be crated.

Likewise, when scoped to device, whenever that device accesses the ledger an instance will automatically be created.

{{imageOverlay src="/assets/images/ledger/ledger-options.png" class="no-darken"}}

### Cloud ledger instances - console

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

When using the Cloud API you get back the entire JSON data structure for a ledger instance.

## Using Ledger from Logic

You can easily access owner, product, and device ledgers from Logic.

- Store published events in Ledger using Logic.
- Move business logic from device firmware to the cloud using Logic.

See [Using Ledger from Logic](/getting-started/logic-ledger/logic/#using-ledger-from-logic) in the Logic documentation for more information.



