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


### Create product ledger instance

This example uses structured data to hold more complex configuration parameters. First set product default values. In the **test-config-defaults** ledger create a new instance for the product your devices are in.

{{imageOverlay src="/assets/images/ledger/config-product-instance.png" class="no-darken"}}

Using the **Advanced** tab, enter this JSON data:

```json
{
    "temp": {
        "min": 20,
        "max": 30
    },
    "hum": {
        "min": 10,
        "max": 80
    }
}
```


## Device firmware

This is the test device firmware. It requires Device OS 5.7.0 or later.

{{> project-browser project="ledger-config" default-file="src/ledger-config.cpp" height="400"}}

Walking through the code:


Logs:

```
0000022048 [app] INFO: set ledger {"hum":21.1,"temp":43.9,"time":"2024-01-17T12:00:56Z"}
```


```
0000021784 [system.ledger] INFO: Requesting ledger info
0000022178 [system.ledger] INFO: Received ledger info
0000022470 [system.ledger] INFO: Subscribing to ledger updates
0000022775 [system.ledger] INFO: Subscribed to ledger updates
```

## Configuration




```
0000237165 [app] INFO: syncCallback called
```

```
0000141147 [app] INFO: value=19.600000 not in bounds, min=20.000000 max=30.000000
0000141163 [app] INFO: value=32.200000 in bounds, min=10.000000 max=80.000000
0000141428 [app] INFO: set ledger {"alarm":["temp"],"hum":32.2,"temp":19.6,"time":"2024-01-17T13:50:51Z"}
```

### Device-specific overrides




## Push notification


## Cloud-based notification using Logic

