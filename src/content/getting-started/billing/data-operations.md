---
title: Data operations
columns: two
layout: commonTwo.hbs
description: Data operations
---

# {{title}}

{{!-- BEGIN shared-blurb a7c0e9bc-9ba8-11ec-b909-0242ac120002 --}}
The central billing element for both cellular and Wi-Fi is the Data Operation:

- Each publish, subscribe, function, or variable consumes one Data Operation regardless of size
- The data has a maximum size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/)
- Stored data, such as Tracker geolocation data, consume one Data Operation per location point saved<sup>1</sup>
- Certain retransmissions, as described below

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

<sup>1</sup>You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. In the Free Plan you will have an opportunity to upgrade to the Growth Plan. In the Growth Plan, additional blocks can be added to allow for more data operations.
{{!-- END shared-blurb --}}

{{> dataoperationscalc}}

## Blocks

Blocks are a maximum number of Data Operations and devices per month in the Growth plan:

- Up to {{growthTierDataOperationsUnit}} Data Operations ({{growthTierDataOperationsComma}}) per month 
- Up to {{growthTierDevices}} devices
- Up to {{growthTierDataOperationsCellularData}} of cellular data per month ({{growthTierDataOperationsTrackerData}} for Tracker), pooled across all devices, for each block purchased
- Price varies for Wi-Fi, Cellular, and Tracker
- Add as many blocks are you need

For example, if you have 150 devices you will need 2 blocks, even if your Data Operations do not yet exceed {{growthTierDataOperationsUnit}}. 

Likewise, if you are using a million Data Operations per month, you will need 2 blocks, even of you have fewer than 100 devices.

If you exceed the number of data operations or cellular data usage for the number of blocks you have purchased this billing month, additional block(s) will be charged at the start of the next billing month to account for your current usage. You are not billed a prorated block at the time of the overage, and you will only be billed on your normal billing date for full blocks.

## Non-Particle cloud traffic

For Wi-Fi devices (Photon, P1, Argon) there is no limit for direct TCP or UDP data communications, or services that are based on direct communication such as [Blynk](https://blynk.io/).

For cellular devices, there is a data limit depending on your tier. For the Free plan, the cellular data limit is {{freeTierDataOperationsCellularData}}, pooled across all devices, which includes all data usage including Data Operations, OTA code flash, overhead, and 3rd-party services.

## Minimizing Data Operations

There are many possible steps for minimizing the number of Data Operations that you use, and will tend to be specific to your use case. Some options to consider:

### Publish changed values only

In some cases, it may be useful to only publish values when they change, instead of periodically. Each publish uses a data operation.

### Avoid polling variables frequently

Each request of a Particle.variable uses a data operation. If you are doing this constantly and frequently, this can use a large number of data operations. 

If multiple things (web pages, mobile apps, etc.) are all polling a variable, each one uses a data operation. Using publish is generally more efficient because the device will only use one data operation per value sent, regardless of the number of things viewing the event by webhook or SSE. 

### Combine fields

Rather than publish several independent variables, publish several related variables at once in a single publish. Some common methods include:

- Comma-separated values
- JSON

You're still limited to a maximum publish size, but you can still store many values in a single publish. The limit is 622 to 1024 bytes of UTF-8 characters depending on Device OS version and sometimes the device; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/)

### Aggregate data by time

If you need a time series of data, but latency is acceptable, you can aggregate data by time.

Instead of publishing once per second, you could accumulate 10 samples and send 10 every 10 seconds, reducing the number of publishes. 

### Only transmit changed data

In some cases, you may want to only publish data when it changes. 

Or, if it changes by a significantly large amount for analog-like data using a change threshold (value differs by more than x).

Or keep a mean value of samples and publish when the current sample deviates from the mean. This can be helpful if the value tends to creep up or down slowly and wouldn't trigger a change threshold, but accumulates over time.

### Beware when subscribing

When subscribing to events on-device, every event that's delivered to the device is a data operation. If many devices are sending events to all devices, this can add up to be a large number of events.

### Beware of webhook response subscription

Similarly, in most cases you want only the device that triggered the webhook to get its response. To do this, prefix the hook-response and hook-error responses with the device ID as described [here](/reference/cloud-apis/webhooks/#responsetopic). 

Also each 512 byte response chunk counts as a data operation, so minimizing the size of the response can save data operations.

If the data being returned in JSON, sometimes you can filter out only the information you need using [mustache templates](/firmware/best-practices/json/#mustache-variables).

## Limits

### Where can I check my usage limits?

The [Particle Console](https://console.particle.io) lists the three limits you will most likely encounter:

- The number of devices (both cellular and Wi-Fi)
- The number of Data Operations consumed this billing month
- The number of MB of cellular usage this billing month

Note that the cellular data usage is not real-time. It can take at least 24 hours, and in some cases may lag several days behind actual usage.

### What happens if I need more than 100 devices?

You cannot add more than 100 devices to the Free plan. You instead will need to upgrade to the Growth plan. 

You can have any number of devices in the Growth plan, but you will need to purchase another block for each group of 100 devices. It's not possible to purchase a fractional block for devices only; each block includes a maximum number of devices, Data Operations, and cellular data usage, and exceeding any one limit will require purchasing an additional block.

There is no limit to the number of blocks you can purchase in the Growth plan, however upgrading to an enterprise contract can reduce the cost.

### What happens if I exceed the number of Data Operations?

In the Free plan, if you need more Data Operations you will need to upgrade to the Growth plan. When you exceed {{freeTierDataOperationsUnit}} Data Operations, all Data Operations for both cellular and Wi-Fi will stop until the end of the billing month, when they will be resumed. You cannot add more Data Operations to the Free plan. 

In the Growth plan, if you need more than {{growthTierDataOperationsUnit}} Data Operations across your fleet of devices per month, you can add another block.

In the Enterprise plan, the number of Data Operations is pooled annually across all devices, instead of monthly in the Free and Growth plans.

### What happens if I exceed the cellular data quota?

In the Free plan, if you exceed the pooled monthly data quota, all SIMs in your account will be paused until the end of the billing month, when they will be resumed. It is not possible to add more data to the Free plan.

In the Growth plan, if you exceed the pooled monthly data quota, you can add an additional block to add more data.

In the Enterprise plan, the amount of cellular data is pooled annually across all devices, instead of monthly in the Free and Growth plans.

### What is the maximum rate I can send data?

[Publishes from a device](/reference/device-os/api/cloud-functions/particle-publish/) a limited to 1 per second, at the maximum publish payload size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/).

There are no additional limits placed on webhooks. However, if the server you are sending to cannot process the data within 20 seconds or returns an error because it is overloaded, traffic to the server will be throttled, and the [events will be discarded](/reference/cloud-apis/webhooks/#limits).

While there is no specific rate limit on variables and functions, there are practical limits on how fast the device can return data. The device can only process one function or variable at a time. Additionally, if you have more than a few devices you will instead [run into API rate limits](/reference/cloud-apis/api/#api-rate-limits) which limit how fast you can make requests to the Particle cloud APIs. You should avoid polling your entire device fleet frequently using functions or variables, as this is likely to cause scalability issues.

See also [Migrating to Growth](/getting-started/billing/migrating-to-growth/) for more information about data operations in the growth plan.
