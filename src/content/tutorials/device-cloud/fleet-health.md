---
word: Fleet Health
title: Fleet Health
order: 35
shared: true
columns: two
layout: tutorials.hbs
---

# {{title}}


{{box op="start"}}
<p style="text-align:center;">Fleet Health is a feature available to
customers on Particle's Enterprise plan. Interested in using this feature?</p>

{{!-- TODO: Replace Contact Sales links with UTM links --}}
<a class="btn"
href="https://particle.io/sales"
target="_blank" style="display:block;margin:0
auto;width:200px;text-align:center">Talk to an expert</a>
{{box op="end"}}

As you begin deploying more connected devices in the field powered by
Particle, it is important to have tools that give visibility into the overall functioning
of the IoT fleet. These tools allow your team to effectively identify and
respond to any system-wide disruptions that may occur.

**Fleet Health** is a collection of metrics that provides a bird's-eye
view of the health of an IoT system. These metrics are gathered for
all devices in a _Product_ fleet, and displayed as interactive graphs in the
Particle Console. When a problem does arise, Fleet Health will allow your team to
proactively recognize and respond to it — as opposed to waiting for your customers to
inform you of a degraded experience. The available metrics provide
insight into critical components of a healthy system, which results in
rapid root-causing (and thus, faster resolution times) of any disruption to IoT devices.

<img src="/assets/images/fleet-health/fh-preview.png" class="full-width"
alt="Fleet Health Metrics Dashboard" />

Fleet Health is meant to complement [Device
Vitals](/tutorials/device-cloud/remote-diagnostics#device-vitals) as
part of the Diagnostics suite of tools available to you. The aggregated,
top-down visibility provided by Fleet Health can be used in tandem with
the detailed device-level diagnostics Device Vitals offers.

## Available Metrics

### Online Devices
One of the most common questions you as a fleet manager likely have is:
_How many devices are online right now_? And relatedly, _How do the
number of online devices right now compare to historical totals_?

<img src="/assets/images/fleet-health/online-devices.png" class="full-width"
alt="Fleet Health Online Devices Metric" />

Fleet Health includes three different metrics related to online devices:
- **Devices currently online**: The number of Particle
  devices in your fleet currently connected to the Device Cloud.
- **Online devices over time**: Periodic snapshots of the fleet are
  taken to capture how many devices were online and connected at
different points in time.
- **Cellular data usage**: How many MBs of cellular data was consumed by
  the fleet in the current period. Only displayed for Products that
  include cellular devices.

### Event Traffic

One of the 4 main device communication primitives is **publishing
events**, which is done by adding
[`Particle.publish()`](/reference/device-os/firmware/#particle-publish-)
to application firmware. Publishing events allows devices to send a
message to the Device Cloud (i.e. the current location of an
asset), which can be subscribed to by downstream systems.

The Event Traffic metric measures _How many events have been published
by my device fleet over time_?

<img src="/assets/images/fleet-health/event-traffic.png"
alt="Fleet Health Event Traffic Metric" />

Specifically, this metric observes _published events sent by devices to
the Particle Device Cloud_. As published events trigger Integrations
(see next metric below) to
forward telemetry data to other systems, this is often a critical component of
a healthily functioning deployment.

### Integration Traffic

Integrations represent secure channels that allow telemetry data to flow
from the Particle Device Cloud to other systems, like CRMs, ERPs, and
customer-facing IoT applications.

The Integration Traffic metric measures _How many messages from devices
in the fleet were sent to destination servers via Integrations? What
percentage of those have been successful?_

<img src="/assets/images/fleet-health/integration-traffic.png"
alt="Fleet Health Integration Traffic Metric" />

This metric aggregates all configured Integrations for your Product. For
instance, if you have 2 Webhooks and an Azure Integration set up, the
Integration Traffic metric will sum the performance of all three.

An elevated error rate would suggest that events are being published
successfully, but one or more Integrations are not accepting requests
from the Particle Device Cloud. If you experience high error rates, you
should examine each Integration's [history and logs](/reference/device-cloud/webhooks/#using-the-console) to
identify which one is having an issue.

### Cloud Function Calls

Another device communication primitive is **Cloud Functions**, which are
exposed using
[`Particle.function()`](/reference/device-os/firmware/#particle-function-)
in application firmware. Cloud Functions allow you to instruct devices
to take an action remotely.

The Cloud Function Calls metric measures _How many cloud function calls have been made to my devices? What percentage of
those have been successful?_

<img src="/assets/images/fleet-health/function-calls.png"
alt="Fleet Health Function Calls Metric" />

An elevated error rate here suggests that attempts to reach devices from
the cloud (i.e. via an API call) are failing. This is most often
correlated with devices losing connectivity with the Device Cloud,
making them unreachable remotely. Be sure to cross-reference this metric
with the [Online Devices](#online-devices) data.

### Cloud Variable Requests

**Cloud Variables** is another device communication primitive that
allows you to query devices for information locally. Variables are
exposed using
[`Particle.variable()`](/reference/device-os/firmware/#particle-variable-)
in application firmware.

The Cloud Variable Requests metric measures _How many cloud variable
requests have been made to my devices? What percentage of
those have been successful?_

<img src="/assets/images/fleet-health/variable-requests.png"
alt="Fleet Health Variable Requests Metric" />

Like the Cloud Function Calls metric, an increase in errors would
represent attempts to reach devices from the cloud are failing. Be sure
to also cross-reference this metric
with the [Online Devices](#online-devices) data.

### Firmware Version Distribution
There are two main types of firmware that runs on Particle devices:
- **Application Firmware**: The application-specific logic that you
  manage. Fleet Health collects data on which versions of Product
firmware are running on your devices.
- **Device OS**: The underlying embedded operating system managed by
  Particle. Fleet Health also collects data on which versions of Device
OS are running on your devices.

The Firmware Version Distribution metric measues _Which version of
firmware are my devices running? How is this changing over time?_

<img src="/assets/images/fleet-health/fw-distribution.png"
class="full-width"
alt="Fleet Health Firmware Version Metric" />

This metric is especially useful when you have recently [released a
version of
firmware](/tutorials/device-cloud/ota-updates/#fleet-wide-ota) to your
fleet. You can observe the rate at which targeted devices receive the
new version of application firmware.

You can toggle this metric between Application and Device OS firmware.
Switching to Device OS distribution can help you understand which percentages
of your fleet are running which versions of Device OS.

## Manipulating the data

By default, Fleet Health displays metrics for an entire Product fleet,
and in the last 30 minutes. When doing deeper analysis, there are tools
available to slice the data accross different characteristics.

### Date range selection

<img src="/assets/images/fleet-health/date-range.png"
alt="Fleet Health Date Range Selection" />

It can be helpful to examine Fleet Health metrics collected at different
time intervals. For instance, if doing a post-mortem on a disruption,
you would want to go back to look at the time period in question.

You can use the Date Range selector to change the time window for all
recorded time-series metrics. You can either choose from a few _Preset
Ranges_, or pick a custom date range.

Note that when you change the date range, there will also be a
corresponding change in the _bucketing_ of metrics. That is, each
tickmark on the x-axis representing a window of time will be updated.
The longer the range, the wider window of time each data point will
include.

### Metric filtering

When performing analysis on potential disruptions, it may be the case
that only a subset of the fleet is actually impacted. Fleet Health
equips you with powerful filtering tools to isolate a problem to subsets
of devices.

<img src="/assets/images/fleet-health/fh-filters.png"
alt="Fleet Health Fitlers" />
<p class="caption">Use filters to examine subsets of devices for
connectivity health insights</p>

#### By Device Group
Each metric can be filtered to display data from devices belonging to a
specific [group](/tutorials/product-tools/device-groups/). This can help you, for instance, understand that a
decrease in online devices is because of a localized cellular outage for
units deployed in a certain geographic area, grouped by location in the
Console.

#### By Firmware Version
Similarly, Fleet Health metrics can be focused on a specific version of
Product application firmware. It may be the case that a new version of
firmware you have released to the fleet has caused unintended
consequences on the ability for devices to successfully communicate with
the cloud. For instance, perhaps a bug was introduced between `v2` and
`v3` of application firmware causing calls to a `Particle.function()` to
fail.

#### By Device OS Version
Lastly, it may be that devices running different versions of [Device
OS](/tutorials/device-os/device-os/) are exhibiting different behaviors.
Filtering by Device OS version can help you identify patterns in
connectivity health across Device OS versions running on devices in the
fleet.

{{box op="start"}}
<p style="text-align:center;">Fleet Health is a feature available to
customers on Particle's Enterprise plan. Interested in using this feature?</p>

{{!-- TODO: Replace Contact Sales links with UTM links --}}
<a class="btn"
href="https://particle.io/sales"
target="_blank" style="display:block;margin:0
auto;width:200px;text-align:center">Talk to an expert</a>
{{box op="end"}}
