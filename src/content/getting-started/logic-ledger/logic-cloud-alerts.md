---
title: Cloud alerts with Logic
columns: two
layout: commonTwo.hbs
description: Cloud alerts with Logic
---

# {{title}}

This example is part of a pair of examples illustrating how to do push notification alerts using two different techniques:

- [Configuration via Ledger](/getting-started/logic-ledger/ledger-configuration/), device generates alerts
- Device generates data, Logic generates alerts in the cloud (this page)


One option for alerting is to use a push notification service. This example uses [Pushover](/integrations/community-integrations/pushover/). Follow the instructions in that page to create an integration that trigger from the event `push-notification`. 

**You must create create the integration in the product you are testing with**, or the logic block will not be able to trigger the integration.

Instead of putting the business logic in device firmware and configuration, you can do it entirely in the cloud. This example does not use Ledger, so it can be run on older versions of Device OS, including the 2.x release line used by Gen 2 devices.

## Device firmware

{{> project-browser project="logic-cloud-alerts" default-file="src/logic-cloud-alerts.cpp" height="400"}}

The firmware for this just publishes imaginary sensor data.

If you wish to change how often it publishes, change this line. You can also use minutes, such as `5min`.

```cpp
const std::chrono::milliseconds sensorCheckPeriod = 60s;
```

If you change the event name, be sure to change the trigger in the logic block.

```cpp
const char *eventName = "testCloudSensor";
```

The other important part is where the JSON data is built and published:

```cpp
// Publish
memset(jsonBuffer, 0, sizeof(jsonBuffer));
JSONBufferWriter writer(jsonBuffer, sizeof(jsonBuffer) - 1);

writer.beginObject();
writer.name("temp").value(temp);
writer.name("hum").value(hum);
writer.endObject();            

Particle.publish(eventName, jsonBuffer);
Log.info("publish %s %s", eventName, jsonBuffer);
```

If you monitor the USB serial debug log, you'll see something like this:

```
0000021186 [app] INFO: publish testCloudSensor {"temp":16,"hum":60.4}
```

## Create logic block

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

You can change the min and max values by modifying the logic block.

{{imageOverlay src="/assets/images/ledger/cloud-alert-run.png" class="no-darken"}}

## Using Ledger from Logic

You can also use events published from a device and handled by logic to write the Ledger from Logic. You might want to do this:

- To consolidate code in one location on the cloud side.
- Support for older versions of Device OS (such as 4.x LTS).
- Support for even older versions of Device OS on Gen 2 (such as 2.x LTS).

In order to use Ledger from Logic you will need to create a separate Cloud Only Ledger. You can't set values in a Device to Cloud Ledger from Logic (or the cloud API).

See [Using Ledger from Logic](/getting-started/logic-ledger/logic/#using-ledger-from-logic) in the Logic documentation for more information.


