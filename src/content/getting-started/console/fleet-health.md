---
title: Fleet health
shared: true
columns: two
layout: commonTwo.hbs
---

# {{title}}

**Fleet Health** is a collection of metrics that provides a bird's-eye
view of the health of an IoT system. These metrics are gathered for
all devices in a product fleet, and displayed as interactive graphs in the
Particle Console. When a problem does arise, Fleet Health will allow your team to
proactively recognize and respond to it — as opposed to waiting for your customers to
inform you of a degraded experience. The available metrics provide
insight into critical components of a healthy system, which results in
rapid root-causing (and thus, faster resolution times) of any disruption to IoT devices.

## Product fleet health

When viewing a product, click on **Cloud services** in the left navigation bar, then **Fleet health**:

{{imageOverlay src="/assets/images/console/fleet-health-01.png" class="no-darken"}}

### View options

You can restrict your view to:

- Device group
- Device OS version
- Firmware version
- Time range

{{imageOverlay src="/assets/images/console/fleet-health-03.png" class="no-darken"}}

### Online devices

This graph displays the number of online devices in your fleet. If the number drops significantly, there could be an outage.

{{imageOverlay src="/assets/images/console/fleet-health-04.png" class="no-darken"}}

### Event traffic

This graph shows the number of events sent by your devices.

- If the number increases significantly, you may have a bug that is causing an excessive number of events to be sent, which could affect billing.
- If the number decreases significantly, there could be an outage.

{{imageOverlay src="/assets/images/console/fleet-health-05.png" class="no-darken"}}

### Integration traffic

If you are using integrations (webhooks), this graph shows the number of calls:

{{imageOverlay src="/assets/images/console/fleet-health-06.png" class="no-darken"}}

Hovering over a bar shows the details for that time period.

{{imageOverlay src="/assets/images/console/fleet-health-02.png" class="no-darken"}}

- Success: A success (200) return code from the webhook
- Failure: A failure, either an HTTP failure code, or the server did not respond
- Skipped: There were repeated failures to this hostname, so requests are being discarded to avoid overloading the server

### Cloud function calls

If you are making function calls to devices, this graph shows the success and failure.

Since function calls can only be made to online devices, there is also a category for devices offline when the call was made.

{{imageOverlay src="/assets/images/console/fleet-health-07.png" class="no-darken"}}

### Cloud variable requests

If you are getting variable values from devices, this graph shows the success and failure.

Since variable values can only be retrieved from online devices, there is also a category for devices offline when the request was made.

{{imageOverlay src="/assets/images/console/fleet-health-08.png" class="no-darken"}}

## Device vitals

Related to fleet health is [device vitals](/getting-started/console/device-vitals/) which includes health information for a single device instead of across an entire fleet.
