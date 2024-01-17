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
0000141147 [app] INFO: temp value=19.600000 not in bounds, min=20.000000 max=30.000000
0000141163 [app] INFO: hum value=32.200000 in bounds, min=10.000000 max=80.000000
0000141428 [app] INFO: set ledger {"alarm":["temp"],"hum":32.2,"temp":19.6,"time":"2024-01-17T13:50:51Z"}
```

### Device-specific overrides

The code supports product defaults with device-specific overrides. A device-scoped cloud to device ledger was created earlier, but now we'll test it.

You'll need the device ID (24 character hex) for the device you want to override.


Open **Ledger**, then **test-config-device**. Click **Instances** then **Create new instance**.

{{imageOverlay src="/assets/images/ledger/config-create-device-ledger.png" class="no-darken"}}

Enter the Device ID and click **Advanced** and enter this JSON:

```json
{
    "temp": {
        "min": 40,
        "max": 50
    }
}
```

{{imageOverlay src="/assets/images/ledger/config-device-value.png" class="no-darken"}}


Then, in the USB serial debug log, you should see something like this:

```
0000022797 [system.ledger] INFO: Subscribed to ledger updates
0000080121 [app] INFO: syncCallback called
0000082388 [app] INFO: temp value=4.800000 not in bounds, min=40.000000 max=50.000000
0000082405 [app] INFO: hum value=19.500000 in bounds, min=10.000000 max=80.000000
0000082664 [app] INFO: set ledger {"alarm":["temp"],"hum":19.5,"temp":4.8,"time":"2024-01-17T14:29:22Z"}
```

Note that for `temp` (temperature), the min and max values have changed from 20 - 30 to 40 - 50.

## Push notification

One option for alerting is to use a push notification service. This example uses [Pushover](/integrations/community-integrations/pushover/). Follow the instructions in that page to create an integration that trigger from the event `push-notification`. It's recommended that you create the integration in the product you are testing with.

Then, in the device firmware, uncomment the `Particle.publish()` command:

```cpp
void alertUser(const char *msg) {
    if (Particle.connected()) {
        // Uncomment the following line to enable push notification alerts
        Particle.publish("push-notification", msg);
    }
    Log.info("alertUser %s", msg);
}
```

Flash your device and in an alert condition it should send a push notification.

The USB serial debug log will show something like this:

```
0000441154 [app] INFO: alertUser temp 9.400000 not in range 20.000000 to 30.000000 0a10aced202194944a02c53c
```

## Cloud-based notification using Logic

This is not the only way to handle alerting, however. Instead of putting the business logic in device firmware and configuration, you can do it entirely in the cloud. This example does not use Ledger, so it can be run on older versions of Device OS, including the 2.x release line used by Gen 2 devices.

You'll still need the [Pushover](/integrations/community-integrations/pushover/) integration as in the previous example. Follow the instructions in that page to create an integration that trigger from the event `push-notification`. It's recommended that you create the integration in the product you are testing with.


{{> project-browser project="logic-cloud-alerts" default-file="src/logic-cloud-alerts.cpp" height="400"}}

If you monitor the USB serial debug log, you'll see something like this:

```
0000021186 [app] INFO: publish testCloudSensor {"temp":16,"hum":60.4}
```

The next step is to create a logic block to handle this event.

In **Logic** click **Create new logic function** of the type **Event triggered function**. Set the name to **logic-cloud-alerts**.

```js
import Particle from 'particle:core';

export default function process({ functionInfo, trigger, event }) {
  const tempLimits = {
    min: 20.0,
    max: 80.0
  }

  let data;
  try {
	  data = JSON.parse(event.eventData);
  } catch (err) {
    console.error("Invalid JSON", event.eventData);
    throw err;
  }

  if (typeof data.temp != 'undefined') {
    if (data.temp < tempLimits.min || data.temp > tempLimits.max) {
        const msg = 'temp ' + data.temp + ' not in range ' + tempLimits.min + ' to ' + tempLimits.max + ' ' + event.deviceId;

        Particle.publish("push-notification", msg, { productId: event.productId });
        console.log('notification ' + msg);
    }
  }
}
```

Use the follow event test data to test alert:

```json
{"temp":14.0, "hum": 40.0}
```

And then **Run code**. You can then deploy the Logic block.

Set the trigger event name to **testCloudSensor** and **Deploy**.

When the temperature is out of range, an alert will be generated, but this time it's done from values in a published event instead of synchronizing the configuration to the device.

You can change the min and max values by modifying the logic block. This code does not implement device-specific overrides, though it is possible to do so.

{{imageOverlay src="/assets/images/ledger/cloud-alert-run.png" class="no-darken"}}
