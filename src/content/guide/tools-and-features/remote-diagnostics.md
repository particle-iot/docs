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
