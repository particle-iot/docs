---
word: Remote Diagnostics
title: Remote Diagnostics
order: 11
columns: two
layout: guide.hbs
devices: [photon, electron]
---

# {{title}}

As you  deploy your IoT fleet into the field, it becomes increasingly
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

## Connectivity Layers

Multiple connectivity layers must be operating successfully for a given device
to be able to successfully communicate with the cloud.
These connectivity layers include:

- **Device**
{{#if electron}}
- **SIM Card**
- **Cellular Network**
{{/if}}
- **Particle Cloud**


### Device
The device itself must be in a healthy state in order to successfully
communicate with the cloud. A variety of factors influence its state,
such as battery state of charge, signal strength, available memory, and
application firmware that does not exceed enforced rate limits.

{{#if electron}}
### SIM Card
Cellular devices rely on a SIM card to facilitate a connection to the
cellular network. This SIM must be in an active state, allowing the
device to try to initiate a data session with the network.

### Cellular Network

In addition to the need for an active SIM, the device still must be in
range of a cell tower to create a healthy connection to the cellular
network. Particle works with a global network of cellular carriers to
allow devices to connect virtually anywhere in the world.
{{/if}}

### Particle Cloud

The health of the Particle Cloud is critical to devices having the ability to
successfully connect and communicate. There are a few Particle Cloud
services in particular that directly impact device health and
communications:

#### Device Service

The Device Service brokers the connection between an IoT device and
the Particle Cloud. In addition, the Device Service is responsible for
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
apps and services. Webhooks also allow for devices to ingest
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
connectivity stack. Let's dive into what each test actually does:

### Device

Starting with system firmware version `0.8.x`, Particle devices have the
ability to collect a rich amount of diagnostic data and send this
information to the Particle Cloud.

Device diagnostics are sent to the cloud at two different times:
- Automatically, when the device _handshakes_ (starts a new secure session with the
Particle cloud)
- On-demand, when the diagnostic tests are run in the Console or via the
API

The device delivers the diagnostics data to the Particle Cloud via a
[system event](/reference/firmware/#system-events) that is published
to the event stream. The device diagnostic event will have the name
`spark/device/diagnostics/update`, and include a data payload of the
most recent diagnostic vitals the device collected.

To ensure that your device is able to collect and send diagnostic data
to the Particle Cloud, you will need to ensure that the device is
running a system firmware version equal to or greater than `0.8.0`. For
information on managing system firmware, check out the [system firmware
guide](/guide/tools-and-features/system-firmware/).

### SIM Card
### Cellular Network

### Particle Cloud
When running the test suite, the Particle Cloud services most relevant
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

There are three potential results of the Remote Diagnostic tests:
- **Healthy**
- **Warning**
- **Failure**
