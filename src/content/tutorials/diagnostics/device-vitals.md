---
word: Device Vitals
title: Device Vitals
order: 2
shared: true
columns: two
layout: tutorials.hbs
---

# {{title}}

Device vitals are indicators that impact connectivity health for
that device. Starting with Device OS version `0.8.0`, each device will automatically
collect and send its vitals to the Device Cloud upon starting a new secure session. For
information on upgrading Device OS versions for your devices, check out the [Device OS
guide](/guide/tools-and-features/device-os/#managing-device-os).

You can see a device's vitals in the <a
href="https://console.particle.io" target="_blank">Console</a>. From the
devices view, click on a device from your device list.

When viewing a device details page,  will see a section for _Device Vitals_ in the
right column. This will show you the last recorded vitals information
for your device:

<img src="/assets/images/remote-diagnostics/device-vitals-cellular.png"
class="small"/>

The device collects the following diagnostic vitals, and sends them to
the Device Cloud:
{{#if has-cellular}}
- *Battery state of charge*: The state of charge of the device’s connected battery, represented as a percentage.
{{/if}}
- *Signal strength*: The strength of the device’s connection to the
{{#if has-cellular}}Cellular{{else}}Wi-Fi{{/if}} network, measured in decibels of received signal power.
- *Disconnect events*: The number of times the device disconnected
unexpectedly from the Particle Device Cloud since its last reset.
- *Round-trip time*: The amount of time it takes for the device to
successfully respond to a CoAP message sent by the Particle Device Cloud in milliseconds.
- *Rate-limited publishes*: Particle devices are allowed to publish an
average of 1 event per second in application firmware. Publishing at a
rate higher than this will result in rate limiting of events.
- *Used Memory*: The amount of memory used by the device, combining the heap and the user application’s static RAM in bytes.

The device delivers the diagnostics data to the Particle Device Cloud
via the [`spark/device/diagnostics/update`](/reference/api/#device-vitals-event)
system event. The device vitals event will include a data payload of the
most recent readings the device collected.

Each vital will be analyzed and marked as either _healthy_ or _warning_
depending on what values are returned by the device. Learn more about
diagnostic analysis in the section on [test results](#test-results).

You can also refresh a device vitals on-demand. Read on to learn how.

### Refresh in the Console
You can use the Console to update vitals for your device at any time:

<img src="/assets/images/remote-diagnostics/device-vitals-refresh.png"
class="small"/>

**Clicking on the <i class="ion-refresh"></i> refresh icon**  above the
last recorded vitals reading will instruct the device to re-send its
device vitals to the Device Cloud. If your device is online and
responsive, device vitals will be refreshed.

**Clicking on the _Run diagnostics_ link** will trigger running the [full
diagnostics test suite](#full-diagnostics-test-suite), which includes
refreshing device vitals.

### Refresh using the API

If you'd like to programmatically instruct the device to re-send its
device vitals, you can use the Device Cloud REST API. **This is especially
useful if you'd like to automate devices in your fleet reporting
diagnostic information on a regular cadence**.

You will need to make a `POST` request to the [refresh device
vitals](/reference/api/#refresh-device-vitals) API endpoint, then listen for the
published event from the device either using the [server-sent event
stream](/reference/api/#product-event-streamh) or by
[setting up a webhook](/guide/tools-and-features/webhooks/) that
triggers off of the `spark/device/diagnostics/update` event.


## Full Diagnostics Test Suite

If device vitals are the appetizer, the full Remote Diagnostics test
suite is the main course. It combines diagnostic data sent from the
device with other relevant connectivity layers needed for healthy device
communication.

Note that the relevant connectivity layers vary based on the type of device (i.e.
Wi-Fi vs. Cellular).

For your device, these connectivity layers are:

{{#if has-cellular}}
  <img class="full-width" alt="Device Vitals, SIM Card, Cellular Network, and
  Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-cellular.png"/>
{{else}}
  <img alt="Device Vitals and
  Device Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-wifi.png"/>
{{/if}}


### Device Vitals

The device itself must be in a healthy state in order to successfully
communicate with the cloud. A variety of factors influence its state,
such as battery state of charge, signal strength, available memory, and
application firmware that does not exceed enforced rate limits.

As part of the full Remote Diagnostics test suite, the device will be
asked to re-send its vitals to the Device Cloud. Each vital will be
inspected and analyzed to ensure that it falls within a healthy range.
See the section on [device vitals](#device-vitals) for detailed
information on what data gets sent from the device.


{{#if has-cellular}}
### SIM Card

Cellular devices rely on a SIM card to facilitate a connection to the
cellular network. The SIM must be in an active state, allowing the
device to try to initiate a data session with the network. This test
verifies the state of the SIM and reports back on whether it
is currently active or not.

Note that the SIM layer will only be displayed if your Particle account
has the proper access to the Particle SIM Card inside the device. For instance, if
you are viewing Remote Diagnostics for a device claimed to your
developer account, but that device is using a SIM associated with a product
(not owned by your individual Particle account), the SIM Card layer will
not be displayed.

### Cellular Network

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

{{/if}}

### Particle Device Cloud

The health of the Particle Device Cloud is critical to devices having the ability to
successfully connect and communicate.

When running the test suite, the Particle Device Cloud services most relevant
to device connectivity are automatically checked to ensure they are fully operational.
Any open incident involving the services above will be reflected in the test results.

#### Device Service

The Device Service brokers the connection between an IoT device and
the Particle Device Cloud. In addition, the Device Service is responsible for
shuttling of messages to and from a Particle device.

#### API

The API provides a REST interface to allow remote interactions with
Particle devices and the cloud. This includes calling a [
function](/reference/api/#call-a-function),
checking a [variable](/reference/api/#get-a-variable-value),
or publishing an [event](/reference/api/#publish-an-event)
that devices subscribe to.

#### Webhooks

The Webhooks service allows for device data to be sent to other
apps and services. Webhooks also allows devices to ingest
information *from* these Internet services.


## Running the test suite

To run the full test suite, you can click on the **Run diagnostics**
link from the Device Vitals UI, or click on the **Diagnostics tab** when viewing a
device on the Console:

<img src="/assets/images/remote-diagnostics/device-vitals-run-fullsuite.jpg"/>

Click the **Run Tests** button to run the test suite, if the tests have
not already begun to run:

{{#if has-cellular}}
<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-cellular.png"/>
{{else}}
<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-wifi.png"/>
{{/if}}

Running the tests will kick off diagnostics for each layer of the
connectivity stack. Tests will be run in parallel, and the test results
will be shown once all tests are completed.

## Test Results

Once all of the diagnostic tests have completed, the Console will
provide test results. Each connectivity layer will marked as
_healthy_, _unhealthy_, or _warning_  depending on the result of the
test.

### Healthy

A _healthy_ test result means that all tests have passed
successfully. The device is operating normally. This state looks like
this:

{{#if has-cellular}}
<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test.png"
class="full-width"/>
{{else}}
<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test-wifi.png"
class="full-width"/>
{{/if}}
<p class="caption">All diagnostic tests have passed and this device is
healthy! Woot!</p>

You can see that each connectivity layer has been marked as _healthy_,
with a green check mark. You will also notice a top-level summary
that confirms that all tests have passed and diagnostic vitals are in healthy
ranges.

### Warning

The diagnostic tests also can be marked in the _warning_ state. In
this case, one or more of the diagnostic vitals has fallen outside of
the healthy range. However, all diagnostic tests still passed. This is
an indication that there _may be a problem_, and you should investigate
it further:

{{#if has-cellular}}
<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test.png"
class="full-width" style="max-height: inherit"/>
{{else}}
<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test-wifi.png"
class="full-width" style="max-height: inherit"/>
{{/if}}

In the warning state, you will receive some helpful text to explain what
is happening as well as some recommendations on how to return the device
to a fully healthy state.

{{#if has-cellular}}
In this case, the device's battery is running low (12%) but the device
is still online and able to communicate with the Particle Device Cloud.
For devices with low battery, the recommendation is simple
&mdash; recharge the battery before the device turns off.
{{else}}
In this case, the device is getting rate-limited in firmware because it
is attempting to publish events too quickly. The recommendation is to
rework the application firmware by reducing the frequency of event
publishes to 1 per second or less.
{{/if}}

### Unhealthy

The test run will be marked as _unhealthy_ if one or more of the Remote
Diagnostic tests fail. Note that failure is defined as a state in which
the device will not be able to communicate with the Particle Device Cloud:

{{#if has-cellular}}
<img src="/assets/images/remote-diagnostics/diagnostic-failure.png"
class="full-width" />
<p class="caption">This Remote Diagnostic test reports a problem because the
SIM is deactivated<br/>causing 3 tests to fail</p>
{{else}}
<img src="/assets/images/remote-diagnostics/diagnostic-failure-wifi.png"
class="full-width" />
<p class="caption">This Remote Diagnostic test reports a problem because
the device is unresponsive</p>
{{/if}}

In this state, the test will be marked clearly as failing with a red "X"
icon. In this case, we are not able to successfully communicate with the
Particle device. The device layer is marked as unhealthy, and we see
that the device is unresponsive.

Anytime the Remote Diagnostic tests fail, there will be a course of
action suggested in the test results summary. These calls-to-action are
designed to help your team quickly identify a solution to the
connectivity issue that has arisen. In this scenario, the call to action
is {{#if has-cellular}}simple &mdash; reactivate the SIM{{else}} to visit
the docs to troubleshoot device connectivity{{/if}}. Remote Diagnostics provides this
call-to-action intelligently based on the test failures.

To help uncover what the cause of the issue might be, the last known
device diagnostic reading is displayed. For this device, we can see that
{{#if has-cellular}}the SIM card is deactivated. This prevents the device from connecting
and the cellular network from initiating a session.{{else}} the last
known diagnostics reading showed a weak Wi-Fi signal. This may be the
cause of why the device is now not responsive to requests from the
Particle Device Cloud.{{/if}}
