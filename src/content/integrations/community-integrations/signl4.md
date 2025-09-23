---
title: SIGNL4 Integration
columns: two
layout: commonTwo.hbs
description: SIGNL4 Integration
---

# {{title}}

[SIGNL4](https://www.signl4.com/) adds reliable mobile alerting to Particle with features like mobile app, push notifications, SMS messaging, voice calls, automated escalations, and on-call duty scheduling. SIGNL4 ensures that critical alerts reliably reach the responsible personnel – anytime, anywhere.

In this example, we integrate a Particle Photon device with both an IR motion sensor and a temperature sensor. Whenever motion is detected (e.g., a potential intruder), an alert is automatically sent to our SIGNL4 team.

![Particle Setup](/assets/images/integrations/signl4/particle-photon.jpg)

## Prerequisites
- A SIGNL4 ([https://www.signl4.com](https://www.signl4.com/)) account
- An Particle ([https://console.particle.io](https://console.particle.io/)) account
- A Particle device, e.g. Maker Kit ([https://store.particle.io/collections/all-products](https://store.particle.io/collections/all-products))

In this setup, we use the Particle Maker Kit with a Photon device to connect an IR motion sensor and a temperature sensor. An LED is also included to provide a direct visual indication of motion detection on the device.

![Particle Devices](/assets/images/integrations/signl4/particle-devices.png)

The assembled device is shown in the image above. A detailed guide on how to connect the sensors can be found here: [https://docs.particle.io/archives/maker-kit/](https://docs.particle.io/archives/maker-kit/).

Now you can connect your device to the Particle IoT platform. This can be done easily using the Particle mobile app. A full step-by-step description is available here: [https://docs.particle.io/quickstart/photon](https://docs.particle.io/quickstart/photon).

You should now see your new device listed in the Particle Console under My devices: [https://console.particle.io/devices](https://console.particle.io/devices).

In the Particle Console under Cloud services -> Integrations ([https://console.particle.io/integrations](https://console.particle.io/integrations)), you can now create a new webhook to send alerts directly to SIGNL4.

Create a new webhook and enter the SIGNL4 webhook URL.

![Particle Webhook 1](/assets/images/integrations/signl4/particle-webhook1.png)

The {team-secret} is your SIGNL4 team or integration secret.

In the Custom Template section, you can insert the JSON data template that will be sent to SIGNL4.

```json
{
    "event": "photon-motion",
    "deviceID": "37002a000xxxxx",
    "url": "https://connect.signl4.com/webhook/{team-secret}",
    "requestType": "POST",
    "noDefaults": true,
    "rejectUnauthorized": true,
    "json": {
        "subject": "\{{{subject}}}",
        "temperature": "\{{{temperature}}}"
    }
}
```

![Particle Webhook 2](/assets/images/integrations/signl4/particle-webhook2.png)

You can now open the Web IDE at [https://build.particle.io/build](https://build.particle.io/build) to deploy the code to your device(s).

The two key lines responsible for sending the SIGNL4 alert are shown below:

```javascript
String data = "{ "subject": "Motion detected.", "temperature": "" + temperature() + "" }";

Particle.publish("photon-motion", data, 60, PUBLIC); 
```

First, we assemble the data that will be included in the webhook JSON payload. Next, we send this data to the "photon-motion" webhook created earlier.

That’s it! You can now test your IoT scenario by simulating motion. Once triggered, an alert will be delivered to your SIGNL4 app.

You can find a sample in GitHub:  
[https://github.com/signl4/signl4-integration-particle](https://github.com/signl4/signl4-integration-particle)

### Closing Alerts

The configuration above will trigger a SIGNL4 alert. It is also possible to automatically close the alert, for example when a sensor returns to an OK state.

To achieve this, you need to include specific SIGNL4 parameters in the JSON payload within the Custom Template of your webhook.

JSON payload to trigger the alert:

```
{
  "Title": "Test Alert",
  "Cause": "Hello world.",
  "X-S4-ExternalID":"37002a000xxxxx",
  "X-S4-Status": "new"
}
```

You can add or modify the parameters as needed, but be sure to keep the X-S4- parameters as listed.

Use this JSON payload to close the alert: 

```
{
  "X-S4-ExternalID":"37002a000xxxxx",
  "X-S4-Status": "resolved"
}
```

Use the same value for X-S4-ExternalID as for triggering the alert.

The alert in SIGNL4 might look like this.

![SIGNL4 Alert](/assets/images/integrations/signl4/signl4-particle.png)
