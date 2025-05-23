---
title: Billing
columns: two
layout: commonTwo.hbs
description: Billing
---

# {{title}}

## How does billing work?

Your bills are generated based on your contract terms. While the term is generally one year, you will receive monthly bills that show your data operation usage.

Hardware is billed at the time of shipment.

## Billing in the console

Billing information is available in the [Particle Console](https://console.particle.io/).

Select your organization in the upper left corner, then the **Billing & Usage** tab. Only organization administrators can see organization billing information. The organization popup will initially be set to **Sandbox**.

![Organization Billing](/assets/images/console/org-view-labeled.png)

For more information, see the [Billing & Usage](/getting-started/console/console/#billing-amp-usage) tab instructions. From the billing page you can see your current usage and download usage data.

## Data operations

{{!-- BEGIN shared-blurb a7c0e9bc-9ba8-11ec-b909-0242ac120002 --}}
The central billing element for both cellular and Wi-Fi is the Data Operation:

- Each function or variable consumes one Data Operation
- Each publish or subscribe consumes one Data Operation for each 1024 bytes of data payload<sup>2</sup>
- The data has a maximum size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/)
- Stored data, such as Tracker geolocation data, consume one Data Operation per location point saved<sup>1</sup>
- Certain retransmissions, as described below

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

<sup>1</sup>You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. 
In the Free Plan you will have an opportunity to upgrade to the basic/plus plan. In the basic/plus plans, additional blocks can be added to allow for more data operations.

<sup>2</sup>For example: If you publish 800 bytes of data, it will count as 1 data operation. If you publish 1300 bytes of data, it will count as two. At the maximum publish size of 16 Kbytes, it would count as 16 data operations.
{{!-- END shared-blurb --}}

To learn more, see [Getting started with data operations](/getting-started/billing/data-operations/).

Additionally, cellular devices may have additional constraints. See the [Cellular data guide](/getting-started/billing/cellular-data/).

## Device counts

The device count in the enterprise plan includes all devices in all products in the enterprise organization.

Devices are added to the product from the console or API. When you order a devices from the wholesale store in tray or reel quantities, you will be emailed a list of Device IDs in the order that you can upload to the console.

A product device is not counted until it comes online at least once. 

Once a device connects to the cloud the first time it will be counted as a billable device even if it does not connect to the cloud in future months.

For cellular devices, if the SIM is deactivated for the entire billing month, it will not be counted as a billable device. There is no proration for devices active only part of the month.

Product device counts are not affected by device claiming, whether unclaimed product devices, claimed to a single account, claimed to a team member, or claimed to a customer.


## Manufacturing grace period

Some some enterprise plans, there is a six month manufacturing grace period. After the device comes online for the first time, if in any of the first six billing months the device does not come online, it will not be counted as a billable device.

After the six month manufacturing grace period, the device will count as a billable device whether it comes online or not.

This only applies to some enterprise plans; in basic, free, and other enterprise plans there is no manufacturing grace period.
