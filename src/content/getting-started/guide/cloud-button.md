---
title: Cloud button
columns: two
layout: commonTwo.hbs
description: Cloud-connected button project
---

# {{title}}

{{section-nav}}

This section creates new firmware that sends a Particle event when you double-tap the MODE button on your device.

## Events

Particle events are one of the [Particle primitives](/getting-started/device-os/introduction-to-device-os/#communication) used to communicate between devices and the Particle cloud. They can be sent in all four directions: device-to-cloud, cloud-to-device, device-to-device, and cloud-to-cloud. It is an unconfirmed one-to-many message that is temporal, not stored in the cloud.

There's an event name (a short string), and data. It's often a string, but can be structured data such as JSON or binary data up to 16 Kbytes on some devices and Device OS versions.

When you send an event from the device to cloud, the destination is typically:

- An [integration (webhook)](/integrations/introduction/) to send data to an external service
- The server-sent-events (SSE) data stream
- Another device that subscribed to the event name

Events flow in the same manner with a common API regardless of network transmission method: Wi-Fi, cellular, or Ethernet. Devices with multiple networks can switch between them, for example using Wi-Fi with cellular backup on the M-SoM.

## Monitoring events

## USB serial debugging

{{section-nav}}

