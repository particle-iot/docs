---
title: Using Blynk dashboards
columns: two
layout: commonTwo.hbs
description: Using Blynk dashboards
guide-custom-images: tracker-one
guide-blynk-event: loc
guide-blynk-temp: \{{loc.sh_31temp}}
guide-blynk-humid: \{{loc.sh_31humid}}
---

# {{title}}

This section includes information on creating integrations and more about environment variables to use Blynk.

{{section-nav}}

{{!-- BEGIN shared-blurb 2ca6542b-e2b9-4e7a-a643-42463ecdf415 --}}
## Setting up Blynk

[Blynk](https://blynk.io/) is an external service for processing IoT device data and displaying it in dashboards and apps with minimal code required. 

Follow the instructions on the site for creating an account, then use the Blynk **Blueprints** feature. Select the **Connect a Particle device** Blueprint.

{{imageOverlay src="/assets/images/getting-started-guide/blynk-01.png" class="no-darken"}}

You can follow the Blynk blueprint instructions as is, however I've made a few modification to allow it to work with the existing fleet temperature sensor code that we've used in earlier sections. No firmware changes required!

## Create an integration

From my product I selected **Cloud services** then **Integrations** then **Add new integration** to open the integrations gallery.

I selected **Custom webhook** then **Start now**.

{{imageOverlay src="/assets/images/getting-started-guide/blynk-02.png" class="no-darken"}}

There is a built-in template for Blynk but because of the number of changes that are required, it's easier to just a custom webhook instead.

The default view is **Webhook builder** but click **Custom template** to copy and paste the configuration.

```json
{
    "name": "Blynk",
    "event": "{{guide-blynk-event}}",
    "responseTopic": "\{{PARTICLE_DEVICE_ID}}/hook-response/\{{PARTICLE_EVENT_NAME}}",
    "disabled": false,
    "parameters": [
        {
            "value": "ny3.blynk.cloud",
            "template_name": "BLYNK_SERVER_ADDRESS"
        }
    ],
    "use_env": true,
    "template": "webhook",
    "url": "https://\{{{BLYNK_SERVER_ADDRESS}}}/external/api/batch/update",
    "requestType": "GET",
    "noDefaults": true,
    "rejectUnauthorized": true,
    "unchunked": false,
    "data_url_response_event": false,
    "query": {
        "V15": "{{guide-blynk-temp}}",
        "V6": "\{{PARTICLE_PUBLISHED_AT}}",
        "token": "\{{BLYNK_DEVICE_TOKEN}}",
        "V16": "{{guide-blynk-humid}}"
    }
}
```

I edited the integration for my purposes:

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-05.png") class="no-darken"}}

| Field | Old Value | New Value |
| :---- | :-------- | :-------- |
| Name  |  | Blynk |
| Event name | blynk_get | {{{guide-blynk-event}}} |
| Status | on | on |
| Allow environment variables in this integration | off | on |
| Blynk server address | ny3.blink.cloud | ny3.blink.cloud |
| Blynk auth token| | |
| V0 | \{{{v0}}} | (deleted) |
| V1 | \{{{v2}}} | (deleted) |
| V2 | \{{{v2}}} | (deleted) |
| V3 | \{{{v3}}} | (deleted) |
| V4 | \{{{v4}}} | (deleted) |
| V5 | \{{{v5}}} | (deleted) |
| V15 | | {{{guide-blynk-temp}}} ||
| V6 | \{{{PARTICLE_PUBLISHED_AT}}} | \{{{PARTICLE_PUBLISHED_AT}}} |
| token | | \{{{BLYNK_DEVICE_TOKEN}}} |
| V16 | | {{{guide-blynk-humid}}} | 

## Create an environment variable

When using Blynk with https upload of data, as is done with the Particle integration, **each device has its own Blynk API token**. This allows the Blynk service to securely separate the data between multiple devices.

The Blynk blueprint accomplishes this by hardcoding the API token into the device firmware and sending it in the Particle event to the webhook. This is does not work well with device fleets that share common firmware. Fortunately, the environment variable feature works great for this use case.

From my product I selected **Cloud services** then **Configuration** then **Environment variables**:

{{imageOverlay src="/assets/images/getting-started-guide/blynk-06.png" class="no-darken"}}

I created a new environment variable **BLYNK_DEVICE_TOKEN** but did not set a value at the product level.

{{imageOverlay src="/assets/images/getting-started-guide/blynk-07.png" class="no-darken"}}

I then went into each device in my product, and in the **Environment** section created a new variable **BLYNK_DEVICE_TOKEN** and the value of the Blynk auth token for this device.
{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-05.png") class="no-darken"}}


{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-08.png") class="no-darken"}}

You can create and view the Blynk auth tokens from the **Devices** section in Blynk.

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-09.png") class="no-darken"}}

When you select **Allow environment variables in this integration** in the integration settings it allows you use the value of an environment variable via Mustache templates. I use this feature to set the value of `token` to `\{{{BLYNK_DEVICE_TOKEN}}}`.

Note: You use an environment variable instead of a **Secret** because the value needs to be scoped to device. Secrets are scoped only to Sandbox or Organization and can't be overridden on a per-device basis.

## Device dashboard

Once the data is in Blynk you can drag and drop controls to easy make dashboards.

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-10.png") class="no-darken"}}

## Monitoring the integration

In the product **Events** pane, you can see the events from the devices and that a response was received from the webhook.

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-12.png") class="no-darken"}}

In Integration - View details - History it shows the 10 most recent events that triggered the integration (webhook).

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-13.png") class="no-darken"}}

You can see greater details about the event, webhook request, and webhook response by expanding the history log entries.

{{imageOverlay src=(concat "/assets/images/getting-started-guide/" guide-custom-images "/blynk-14.png") class="no-darken"}}

{{!-- END shared-blurb 2ca6542b-e2b9-4e7a-a643-42463ecdf415 --}}

{{section-nav}}
