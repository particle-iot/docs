---
title: Device vitals
shared: true
columns: two
layout: commonTwo.hbs
redirects: true
---

# {{title}}

Device Vitals are indicators that impact the overall health of a
device. This is useful when troubleshooting connectivity issues for
specific devices deployed in the field.

<img class="full-width" src="/assets/images/fleet-health/device-vitals-short.png"
alt="Particle Diagnostics -- Device Vitals"/>

Device vitals are:
- **Collected by every Particle device**: The device records information
relevant to its ability to successfully connect and communicate with the
Device Cloud. Cellular networking vitals are now available.
- **Sent to the Device Cloud**: Vitals are automatically shared with the
Device Cloud when starting a new secure session, and can be sent on a
cadence using [`Particle.publishVitals()`](#particle-publishvitals-).
- **Accessible via the Console or API**: The Console exposes a Vitals
Dashboard as well as the last recorded vitals. This information can also
be queried via Particle's Device Cloud API.

Device Vitals can be used in-tandem with [Fleet
Health](/getting-started/console/fleet-health/) metrics for a bird's eye
view of your IoT system's health.

You can see a device's vitals in the <a
href="https://console.particle.io" target="_blank">Console</a>. From the
devices view, click on a device from your device list.

## Vitals dashboard
Starting with Device OS version `0.8.0`, each device will automatically
collect health vitals and send them to the Device Cloud. Device OS version `1.2.1` also includes
additional [cellular networking vitals](#cellular-vitals).

The device collects a variety of metrics that probe different areas that
could impact successful device communications. The Vitals Dashboard takes some of the most important
health metrics relayed by the device and graphs them for quick diagnosis
capabilities. The Vitals Dashboard visualizes the following metrics:

- **Signal Strength**
- **Signal Quality**
- **Round-trip Time**
- **Memory Usage**
- **Battery Charge**

<img src="/assets/images/fleet-health/vitals-tab.png" />
<p class="caption">When viewing a device in the Console, click on the
**Vitals tab** to expose the Dashboard.</p>

There are many other vitals collected by the device and sent to the
Device Cloud. For a comprehensive list of which vitals are collected, check out the
Device Vitals [reference
docs](/reference/cloud-apis/api/#device-vitals-event). To access
to the full collection of vitals, see [this
section](#last-recorded-vitals).

For information on upgrading Device OS versions for your devices to get
the most out of Device Vitals, check out the [Device OS guide](/getting-started/device-os/introduction-to-device-os/#managing-device-os).

### Signal strength
The strength of the device’s connection to the
network (Cellular or Wi-Fi), measured in decibels of received signal power.

<img class="full-width" src="/assets/images/fleet-health/signal-strength.png"/>

The strength of the signal is normalized as a percentage from 0-100 —
the closer to 100, the stronger the signal. As a rule of thumb, the closer the
device is to a tower or router, the better signal strength will be. The raw signal
strength is visible by hovering over each vitals data point.

### Signal quality
The quality of the device’s connection to the (Cellular or Wi-Fi) network is a measure of the relative noise, or likelihood of interference of the signal.

<img class="full-width" src="/assets/images/fleet-health/signal-quality.png"/>

Like signal strength, quality is also normalized as a percentage from
0-100 — the closer to 100, the higher the quality. As a rule of thumb, the
fewer devices in close proximity communicating using similar radio frequencies, the better signal quality will be.
Raw signal quality is available on the tooltip displayed when hovering over a vitals data point.

### Round-trip time
The amount of time it takes for the device to
successfully respond to a CoAP message sent by the Particle Device Cloud.

<img class="full-width" src="/assets/images/fleet-health/round-trip-time.png"/>

A longer the round-trip time often correlates with poor signal strength or quality. Round trip time is displayed in seconds — the lower the reported time, the better the performance.

Note that only messages sent by the Device Cloud to the device like
event subscriptions, function calls and variable requests are counted in
the round-trip time so if a device is only sending data to the cloud
through event publishes the round-trip time won't update.

### Memory usage
The amount of memory used by the device, combining the heap and the user application’s static RAM in bytes.

<img class="full-width" src="/assets/images/fleet-health/memory-usage.png"/>

If a device consumes too much of its available memory, certain unexpected failures in its firmware application can occur. Memory usage is displayed as a percentage from 0-100% — the closer to 0, the less available memory is being consumed.

### Battery state of charge
The state of charge of the device’s connected battery, represented as a percentage.

<img class="full-width" src="/assets/images/fleet-health/battery-charge.png"/>

If the battery charge falls too low,  the device is at risk of losing power and going offline. Battery charge is displayed as a percentage from 0-100% — the closer to 100, the more charge is available to the battery.

### Data resolution
Device Vitals are bucketed into varying time intervals depending on which time range is selected in the Console:

- Last hour — 1 minute intervals
- Last day — 15 minute intervals
- Last 2 days — 30 minute intervals
- Last week — 2 hour intervals
- Last 2 weeks — 4 hour intervals
- Last 30 days — 8 hour intervals

To change time range, use the selector visible on the top-right section of the Vitals tab.

<img src="/assets/images/fleet-health/time-range-change.png" class="full-width" />

### Last recorded vitals

When viewing a device details page,  will see a section for _Last Vitals_ in the
right column. This will show you the last recorded vitals information
for your device:

<img src="/assets/images/remote-diagnostics/device-vitals-cellular.png"
class="small"/>

Each vital will be analyzed and marked as either _healthy_ or _warning_
depending on what values are returned by the device. Learn more about
diagnostic analysis in the section on [test results](#test-results).

You can click on the **Download History** link to download a CSV file
containing the full list of vitals collected by the device over the last
30 days. This CSV will contain additional advanced vitals that are not rendered
in the Console UI. For a comprehensive list of available vitals, check
out the [reference
docs](/reference/cloud-apis/api/#device-vitals-event).

You can also click on the **Health Check** link to execute a real-time diagnostics
test for the device. For more info on this, check out the [Health
Check](#health-check) section.

#### Error codes

Error codes in `device.cloud.connection.error` are described in [comm.protocol errors](/reference/device-os/api/debugging/waiting-for-serial/#comm-protocol-errors).


#### Cellular vitals

As of Device OS version 1.2.1, cellular devices (i.e. Boron, B SoM,
Electron, etc.) will begin to collect and send new vitals specific to
the status and health of the cellular connection.


These vitals will appear in the Console in the _Last Vitals_ section of
the device details view:

<img src="/assets/images/fleet-health/cellular-vitals.png"/>

The cellular vitals collected by the device are as follows:

- **Carrier**: The cellular network operator that the device is currently using to get
a connection to the Internet.
- **Radio Access Technology (RAT)**: The cellular connection method
being used by the device (i.e. "LTE", or "3G").
- **Cell Global Identity (CGI)**: The unique identifier for the specific
cell tower the device is currently connected to, which combines MCC,
MNC, LAC, and CI.

In this case, the device is connected to an AT&T cell tower with CGI
310-410-45997-201601117 using 3G. Breaking down the CGI:
- 310 is the _mobile country code_, or **MCC** associated with the
United States of America.
- 410 is the _mobile network code_, or **MNC**, associated with AT&T in
the US. The combination of MCC and MNC tell you which carrier the device
is using.
- 45997 is the _location area code_ or **LAC**, which references a group of
cellular towers in a geographic area.
- 201601117 is the _cellular identity_, or **CI**, which is the specific identifier of a
single cellular tower.

This data is useful to get an understanding of how a device is
attempting to connect and communicate over a cellular network. For
instance, perhaps cellular devices deployed in a particular geographic
area have different connectivity behaviors depending on which specific
cellular tower or network operator is being used.

## Sending vitals to device cloud
There are a few different ways that a device can be instructed to send
its vitals to the Device Cloud.
1. **Starting a secure session**: When a device _handshakes_ with the
Device Cloud, it will automatically collect and send its vitals recorded
at startup.
2. **Particle.publishVitals()**: An API in
Device OS allows you to instruct a device to send its vitals in
application firmware.
3. **Refreshing from the Device Cloud**: Remotely trigger a device to
send its vitals ad hoc via the Console or the Device Cloud API.

The device delivers the diagnostics data to the Particle Device Cloud
via the [`spark/device/diagnostics/update`](/reference/cloud-apis/api/#device-vitals-event)
system event. The device vitals event will include a data payload of the
most recent readings the device collected.

### Particle.publishVitals()
`Particle.publishVitals()` is a method exposed by Device OS as of
version 1.2.1. It allows you to collect and send device vitals on a
regular cadence as part of application firmware.

This is especially
useful if you use the Device Vitals historical graphs in the Console,
and want regular intervals of data for analysis. For instance, to publish
vitals every hour, add the following to your `setup()` function:

```cpp
setup () {
  Particle.publishVitals(3600);
}

loop () {
  // Your loop logic goes here
}
```

`publishVitals()` accepts one optional argument, which is the period (in
seconds) at which vitals are to be sent to the cloud. If you don't pass
an argument, vitals will be published once, immediately.

For the full reference docs on `Particle.publishVitals()`, [click
here](/reference/device-os/api/cloud-functions/particle-publishvitals/).

**Note**: You should take care when determining how often devices should
send their vitals to the Device Cloud. There's a trade off to be made:
The more frequent you send the vitals, the higher fidelity of data
available to you when troubleshooting. But, this comes with an increase
in cellular data usage (Each vitals message is ~150 bytes). You can find
the proper balance for your specific needs.


### Refreshing from device cloud

You can instruct a device to re-send its vitals remotely via the Device
Cloud.

#### Refresh from the console

You can use the Console to update vitals for your device at any time:

<img src="/assets/images/remote-diagnostics/device-vitals-refresh.png"
class="small"/>

**Clicking on the <i class="ion-refresh"></i> refresh icon**  above the
last recorded vitals reading will instruct the device to re-send its
device vitals to the Device Cloud. If your device is online and
responsive, device vitals will be refreshed.

**Clicking on the _Run diagnostics_ link** will trigger running the [health check](#health-check), which includes
refreshing device vitals.

#### Refresh using the API

If you'd like to programmatically instruct the device to re-send its
device vitals, you can use the Device Cloud REST API. **This is especially
useful if you'd like to automate devices in your fleet reporting
diagnostic information on a regular cadence**.

You will need to make a `POST` request to the [refresh device
vitals](/reference/cloud-apis/api/#refresh-device-vitals) API endpoint, then listen for the
published event from the device either using the [server-sent event
stream](/reference/cloud-apis/api/#product-event-streamh) or by
[setting up a webhook](/integrations/webhooks/) that
triggers off of the `spark/device/diagnostics/update` event.


## Health check

In addition to device vitals, there is also the option to run a health
check. Think of this as a way to run a real-time diagnostics test of the
device. Note that the relevant connectivity layers vary based on the type of device (i.e.
Wi-Fi vs. Cellular).

For your device, these connectivity layers can be:

For Cellular:

  <img class="full-width" alt="Device Vitals, SIM Card, Cellular Network, and
  Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-cellular.png"/>

For Wi-Fi:

  <img alt="Device Vitals and
  Device Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-wifi.png"/>

### Device vitals

The device itself must be in a healthy state in order to successfully
communicate with the cloud. A variety of factors influence its state,
such as battery state of charge, signal strength, available memory, and
application firmware that does not exceed enforced rate limits.

As part of the full health check, the device will be
asked to re-send its vitals to the Device Cloud. Each vital will be
inspected and analyzed to ensure that it falls within a healthy range.
See the section on [device vitals](#device-vitals) for detailed
information on what data gets sent from the device.


### SIM Card

Cellular devices rely on a SIM card to facilitate a connection to the
cellular network. The SIM must be in an active state, allowing the
device to try to initiate a data session with the network. This test
verifies the state of the SIM and reports back on whether it
is currently active or not.

Note that the SIM layer will only be displayed if your Particle account
has the proper access to the Particle SIM Card inside the device. For instance, if
you are viewing vitals for a device claimed to your
developer account, but that device is using a SIM associated with a product
(not owned by your individual Particle account), the SIM Card layer will
not be displayed.

### Cellular network

In addition to the need for an active SIM, the device still must be in
range of a cell tower to create a healthy connection to the cellular
network. Particle works with a [global network of cellular carriers](https://www.particle.io/pricing#cellular-data)
to allow devices to connect virtually anywhere in the world.

Particle is a mobile virtual network operator (MVNO) that enables
Particle SIM cards to connect to cell towers from a variety
of carriers around the world. This test verifies that the active SIM
card in the device has a healthy data session with a cell tower.

Similar to what was said in the above section, you must have proper
access to the Particle SIM Card being used in the device for the
Cellular Network layer to be displayed in the Console.

### Particle Device cloud

The health of the Particle Device Cloud is critical to devices having the ability to
successfully connect and communicate.

When running the test suite, the Particle Device Cloud services most relevant
to device connectivity are automatically checked to ensure they are fully operational.
Any open incident involving the services above will be reflected in the test results.

#### Device service

The Device Service brokers the connection between an IoT device and
the Particle Device Cloud. In addition, the Device Service is responsible for
shuttling of messages to and from a Particle device.

#### API

The API provides a REST interface to allow remote interactions with
Particle devices and the cloud. This includes calling a [
function](/reference/cloud-apis/api/#call-a-function),
checking a [variable](/reference/cloud-apis/api/#get-a-variable-value),
or publishing an [event](/reference/cloud-apis/api/#publish-an-event)
that devices subscribe to.

#### Webhooks

The Webhooks service allows for device data to be sent to other
apps and services. Webhooks also allows devices to ingest
information *from* these Internet services.


### Running a health check

To run the full test suite, you can click on the **Run diagnostics**
link from the Device Vitals UI, or click on the **Health Check** when viewing a
device on the Console:

<img src="/assets/images/remote-diagnostics/device-vitals-run-fullsuite.jpg"/>

Click the **Run Tests** button to run the test suite, if the tests have
not already begun to run:

For Cellular:

<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-cellular.png"/>

For Wi-Fi:

<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-wifi.png"/>

Running the tests will kick off diagnostics for each layer of the
connectivity stack. Tests will be run in parallel, and the test results
will be shown once all tests are completed.

### Test results

Once all of the diagnostic tests have completed, the Console will
provide test results. Each connectivity layer will marked as
_healthy_, _unhealthy_, or _warning_  depending on the result of the
test.

#### Healthy

A _healthy_ test result means that all tests have passed
successfully. The device is operating normally. This state looks like
this:

For Cellular:

<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test.png"
class="full-width"/>

For Wi-Fi:

<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test-wifi.png"
class="full-width"/>


<p class="caption">All diagnostic tests have passed and this device is
healthy! Woot!</p>

You can see that each connectivity layer has been marked as _healthy_,
with a green check mark. You will also notice a top-level summary
that confirms that all tests have passed and diagnostic vitals are in healthy
ranges.

#### Warning

The diagnostic tests also can be marked in the _warning_ state. In
this case, one or more of the diagnostic vitals has fallen outside of
the healthy range. However, all diagnostic tests still passed. This is
an indication that there _may be a problem_, and you should investigate
it further:

For Cellular:

<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test.png"
class="full-width" style="max-height: inherit"/>

For Wi-Fi:

<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test-wifi.png"
class="full-width" style="max-height: inherit"/>

In the warning state, you will receive some helpful text to explain what
is happening as well as some recommendations on how to return the device
to a fully healthy state.

For cellular devices, the device's battery is running low (12%) but the device
is still online and able to communicate with the Particle Device Cloud.
For devices with low battery, the recommendation is simple
&mdash; recharge the battery before the device turns off.

For Wi-Fi devices, the device is getting rate-limited in firmware because it
is attempting to publish events too quickly. The recommendation is to
rework the application firmware by reducing the frequency of event
publishes to 1 per second or less.

#### Unhealthy

The test run will be marked as _unhealthy_ if one or more of the Remote
Diagnostic tests fail. Note that failure is defined as a state in which
the device will not be able to communicate with the Particle Device Cloud:

For Cellular:

<img src="/assets/images/remote-diagnostics/diagnostic-failure.png"
class="full-width" />
<p class="caption">This Remote Diagnostic test reports a problem because the
SIM is deactivated<br/>causing 3 tests to fail</p>

For Wi-Fi:

<img src="/assets/images/remote-diagnostics/diagnostic-failure-wifi.png"
class="full-width" />
<p class="caption">This Remote Diagnostic test reports a problem because
the device is unresponsive</p>

In this state, the test will be marked clearly as failing with a red "X"
icon. In this case, we are not able to successfully communicate with the
Particle device. The device layer is marked as unhealthy, and we see
that the device is unresponsive.

Anytime the Health Check tests fail, there will be a course of
action suggested in the test results summary. These calls-to-action are
designed to help your team quickly identify a solution to the
connectivity issue that has arisen. 

For cellular devices, the call to actionis to reactivate the SIM.

Otherwise, visit
the docs to troubleshoot device connectivity. Remote Diagnostics provides this
call-to-action intelligently based on the test failures.

