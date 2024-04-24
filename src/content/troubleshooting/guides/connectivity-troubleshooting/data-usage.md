---
title: Data usage troubleshooting
columns: two
layout: commonTwo.hbs
description: Data usage troubleshooting
---

# {{title}}

You can find the current data usage in the [Particle console](https://console.particle.io/) in the **Billing & Usage** tab.

[Data operations](/getting-started/cloud/introduction/#data-operations) are measured for both Wi-Fi and cellular devices. For cellular devices, there is a separate cellular data limit. Both are shown in the console:

{{imageOverlay src="/assets/images/console/billing-usage-data-operations.png" alt="Data usage" class="full-width no-darken"}}

In some cases, only a subset of your devices are using excessive numbers of data operations or cellular data. You can download the historical data spreadsheet to view data operations per device from the Billing & Usage tab.

{{imageOverlay src="/assets/images/console/billing-usage-historical.png" alt="Historical usage" class="full-width no-darken"}}

It is recommended that you always group your devices in a product, even for your personal devices. For products, in the console go into your product, and go into the Fleet Health tab within your product and you will be able to see the kinds of data operations are being used for your product devices.

{{imageOverlay src="/assets/images/console/fleet-health.png" alt="Fleet health" class="full-width no-darken"}}

In some cases, you will want to examine the cellular usage separate from the data operations. The [cellular data usage tool](/troubleshooting/connectivity/cellular-usage/) can be used if you have set up your devices in a product.



## Excessive data operations

If you are reaching the limit for data operations but not cellular data:

If you are publishing very frequently, you can easily incur a large number of data operations. This tool can help calculate whether you would exceed the free plan limits or require an excessive number of blocks on the basic plan.

{{> dataoperationscalc}}

If you are publishing a large number of small events, it may makes sense to aggregate many small publishes into a single larger publish.

Using fleet health, you can see if you are using a large number of function calls or variable queries. Each query uses a data operation, and if multiple users are all querying the same device, each counts as a data operation. If you have a large number of readers, or frequently poll devices, you may want to consider a different architecture.

If you subscribe to events on-device, beware of events that publish to an entire fleet of devices when not all devices care about the event. Product devices default to including the Device ID in the hook-response event, but non-product devices to broadcasting the response to all devices.


## Excessive cellular usage

If you are consuming large amount of cellular data but not data operations, some causes include:

Failed OTA can consume very large amounts of data. This is especially true the device is running Device OS prior to 3.1.0 or is a Gen 2 device; these devices cannot resume a failed OTA and will start over from the beginning each time. OTA can fail because of poor cellular connectivity, or a device going into sleep mode before the download is complete. If you have an external hardware watchdog with a short timeout, it can prevent an upgrade of Device OS from completing successfully.

Normally devices establish a new session with the cloud on first connection, and every 3 days. This is data-intensive (up to 5 kilobytes of data) due to the encryption and authentication that occurs. If you are manually ending the session from the device or the cloud side, this can lead to excessive data usage. Poor connectivity can sometimes cause a session reset.

Poor connectivity can lead to increased data usage due to retransmissions. All retransmissions count as cellular data usage, but only a subset of retransmissions use additional data operations.

Bypassing the Particle cloud using TCPClient or UDP can cause excessive data usage. This is especially true if you use using TLS/SSL encrypted connections which can use 5K of data per connection to establish a TLS session.


## Learn more

For additional information, see the [cellular data guide](/getting-started/billing/cellular-data/).

