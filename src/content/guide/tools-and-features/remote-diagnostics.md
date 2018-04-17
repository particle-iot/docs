---
word: Remote Diagnostics
title: Remote Diagnostics
order: 11
columns: two
layout: guide.hbs
devices: [photon, electron]
---

# {{title}}

<p class="boxedHead">Beta feature</p>
<p class="boxed">
This feature is **currently in private beta**.
If you would like access to this feature, please
<a href="https://www.particle.io/sales" target="_blank">contact us</a>.
</p>

As you deploy your IoT fleet into the field, it becomes increasingly
important to ensure that devices stay in a healthy state. In addition,
when problems do arise, the ability to quickly identify and implement a
solution are paramount to the reliability of your production deployment.
This level of visibility can often be difficult to achieve without
physical access to these devices in the field.

Remote Diagnostics gives your team the power to actively monitor the health of
deployed units from the Console, without the need for custom development
or costly dispatching of technicians. Furthermore, in the event of a
device falling into an unhealthy state, your team will be empowered with
rich context and suggested courses of action to quickly diagnose and
rapidly resolve the issue.

{{#if electron}}
<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test.png"
class="full-width"/>
{{else}}
<img
src="/assets/images/remote-diagnostics/successful-diagnostics-test-wifi.png"
class="full-width"/>
{{/if}}
<p class="caption">Remote Diagnostics allow you to test the connectivity
health of your devices, and quickly resolve problems when they arise.</p>

## Connectivity Layers

Multiple connectivity layers must be operating successfully for a given device
to be able to successfully communicate with the Particle Device Cloud. Note that the
relevant connectivity layers vary based on the type of device (i.e.
Wi-Fi vs. Cellular).

These connectivity layers are:

{{#if electron}}
  <img class="full-width" alt="Device, SIM Card, Cellular Network, and
  Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-cellular.png"/>
{{else}}
  <img alt="Device and
  Device Particle Device Cloud"
  src="/assets/images/remote-diagnostics/connectivity-layers-wifi.png"/>
{{/if}}


### Device

The device itself must be in a healthy state in order to successfully
communicate with the cloud. A variety of factors influence its state,
such as battery state of charge, signal strength, available memory, and
application firmware that does not exceed enforced rate limits.

{{#if electron}}
### SIM Card

Cellular devices rely on a SIM card to facilitate a connection to the
cellular network. The SIM must be in an active state, allowing the
device to try to initiate a data session with the network.

### Cellular Network

In addition to the need for an active SIM, the device still must be in
range of a cell tower to create a healthy connection to the cellular
network. Particle works with a [global network of cellular carriers](https://www.particle.io/pricing#cellular-data)
to allow devices to connect virtually anywhere in the world.
{{/if}}

### Particle Device Cloud

The health of the Particle Device Cloud is critical to devices having the ability to
successfully connect and communicate. There are a few Particle Device Cloud
services in particular that directly impact device health and
communications:

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

## Running Diagnostic Tests

Diagnostics tests can be run for a device using the
<a href="https://console.particle.io" target="_blank">Particle
Console</a>. To access Remote Diagnostics, click on a device from your
device list (on the devices view) to visit the device details page. From
here, click on the Diagnostics tab. This toggles between the Event Logs
and Remote Diagnostic tests for the device.

<img src="/assets/images/remote-diagnostics/diagnostics-tab.png"/>
<p class="caption">Remote Diagnostics are available on the Console's
device details page.</br>Click on the Diagnostics tab to get started.</p>

You are now presented with the relevant connectivity layers as described
[above](#connectivity-layers). Click the **Run Tests** button to trigger the
execution of a variety of health checks:

{{#if electron}}
<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-cellular.png"/>
{{else}}
<img class="full-width"
src="/assets/images/remote-diagnostics/default-diagnostics-state-wifi.png"/>
{{/if}}

Running the tests will kick off diagnostics for each layer of the
connectivity stack. Tests will be run in parallel, and the test results
will be shown once all tests are completed.
Let's dive into what each test actually does:

### Device

Starting with Device OS version `0.8.x`, Particle devices have the
ability to collect a rich amount of diagnostic data and send this
information to the Particle Device Cloud.

Device diagnostics are sent to the cloud at two different times:
- Automatically, when the device _handshakes_ (starts a new secure session with the
Particle cloud)
- On-demand, when the diagnostic tests are run in the Console or via the
API

The device collects the following diagnostic vitals:
{{#if electron}}
- *Battery state of charge*: The state of charge of the device’s connected battery, represented as a percentage.
{{/if}}
- *Signal strength*: The strength of the device’s connection to the
{{#if electron}}Cellular{{else}}Wi-Fi{{/if}} network, measured in decibels of received signal power.
- *Disconnect events*: The number of times the device disconnected
unexpectedly from the Particle Device Cloud since its last reset.
- *Round-trip time*: The amount of time it takes for the device to
successfully respond to a CoAP message sent by the Particle Device Cloud in milliseconds.
- *Rate-limited publishes*: Particle devices are allowed to publish an
average of 1 event per second in application firmware. Publishing at a
rate higher than this will result in rate limiting of events.
- *Used Memory*: The amount of memory used by the device, combining the heap and the user application’s static RAM in bytes.

The device delivers the diagnostics data to the Particle Device Cloud via a
[system event](/reference/firmware/#system-events) that is published
to the event stream. The device diagnostic event will have the name
`spark/device/diagnostics/update`, and include a data payload of the
most recent diagnostic vitals the device collected.

To ensure that your device is able to collect and send diagnostic data
to the Particle Device Cloud, you will need to ensure that the device is
running a Device OS version equal to or greater than `0.8.0`. For
information on managing Device OS versions, check out the [Device OS
guide](/guide/tools-and-features/device-os/).

{{#if electron}}
### SIM Card
As mentioned earlier in this guide, in order for a device to
succesfully connect to a cell tower, it relies on an active SIM Card.
This test verifies the state of the SIM and reports back on whether it
is currently active or not.

Note that the SIM layer will only be displayed if your Particle account
has the proper access to the Particle SIM Card inside the device. For instance, if
you are viewing Remote Diagnostics for a device claimed to your
developer account, but that device is using a SIM associated with a product
(not owned by your individual Particle account), the SIM Card layer will
not be displayed.

### Cellular Network
Particle is a mobile virtual network operator (MVNO) that enables
Particle SIM cards to connect to cell towers from a variety
of carriers around the world. This test verifies that the active SIM
card in the device has a healthy data session with a cell tower.

Similar to what was said in the above section, you must have proper
access to the Particle SIM Card being used in the device for the
Cellular Network layer to be displayed in the Console.

{{/if}}

### Particle Device Cloud
When running the test suite, the Particle Device Cloud services most relevant
to device connectivity are automatically checked to ensure they are fully operational.
Probed services are:
- Device Service
- API
- Webhooks

This test is made possible by a tight integration with Particle's
<a href="https://status.particle.io" target="_blank">status page</a>.
Any open incident involving the services above will be reflected in the
test results.

## Test Results

Once all of the diagnostic tests have completed, the Console will
provide test results. Each connectivity layer will marked as
_healthy_, _unhealthy_, or _warning_  depending on the result of the
test.

### Healthy

A _healthy_ test result means that all tests have passed
successfully. The device is operating normally. This state looks like
this:

{{#if electron}}
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
with a green checkmark. You will also notice a top-level summary
that confirms that all tests have passed and diagnostic vitals are in healthy
ranges.

### Warning

The diagnostic tests also can be marked in the _warning_ state. In
this case, one or more of the diagnostic vitals has fallen outside of
the healthy range. However, all diagnostic tests still passed. This is
an indication that there _may be a problem_, and you should investigate
it further:

{{#if electron}}
<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test.png"
class="full-width" style="max-height: inherit"/>
{{else}}
<img
src="/assets/images/remote-diagnostics/warning-diagnostics-test-wifi.png"
class="full-width" style="max-height: inherit"/>
{{/if}}

In the warning state, you will receive some helpul text to explain what
is happening as well as some recommendations on how to return the device
to a fully healthy state.

{{#if electron}}
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

{{#if electron}}
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
is {{#if electron}}simple &mdash; reactivate the SIM{{else}} to visit
the docs to troubleshoot device connectivity{{/if}}. Remote Diagnostics provides this
call-to-action intelligently based on the test failures.

To help uncover what the cause of the issue might be, the last known
device diagnostic reading is displayed. For this device, we can see that
{{#if electron}}the SIM card is deactivated. This prevents the device from connecting
and the cellular network from initiating a session.{{else}} the last
known diagnostics reading showed a weak Wi-Fi signal. This may be the
cause of why the device is now not responsive to requests from the
Particle Device Cloud.{{/if}}
