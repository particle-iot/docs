---
title: Introduction
order: 1
columns: two
layout: tutorials.hbs
description: Introduction to the Particle Cloud for Particle IoT devices
---

# Device Cloud Introduction

The Particle Device Cloud provides a secure, data-efficient way for your Particle devices to communicate.

### Secure

The Device Cloud uses mutual authentication using RSA public-private key pairs to make sure your device is your device and not an impersonator and the Particle cloud is the real Particle cloud an not a man-in-the middle impostor. Thus both sides can be sure the other is who they say they are.

The initial handshaking process creates an encrypted session using DTLS over UDP (datagram TLS) on cellular and Gen 3 devices, or AES over TCP on the Photon and P1. This assures that your data cannot be monitored or tampered with in transit.

The Particle cloud connection uses the CoAP (constrained application protocol) over DTLS or AES. All features like publish, subscribe, functions, variables, and OTA firmware updates occur over a single CoAP connection.

On all devices there are no listening ports enabled for other services, making the devices hard to attack directly.

Furthermore, on cellular devices, the cellular network prevents all inbound connections from the Internet, except for the cloud connection we establish from the device. The cellular network also isolates devices from each other, so you cannot attack a cellular device from another cellular device.

By making all connections from the device to the cloud, devices on Wi-Fi networks can be used without having to make any custom port forwarding or firewall changes in most cases.

Since there is very little exposed surface for attackers, we have not had a required Device OS upgrade for security reasons. (We did provide an optional upgrade for the Wi-Fi KRACK attack, however even if the WPA2 encryption is broken, the device cloud connection is not affected because it's encrypted again using AES.) While we recommend using the current version of Device OS, even using version 0.5.3 from September 2016 is not a security risk. 

### Data-Efficient

In order to conserve cellular data, the Particle Cloud DTLS connections can be resumed. This allows a device to reconnect to the cloud using less than 200 bytes of data, vs. up to 5K of data for a full handshake.

Using CoAP over DTLS with session resume allows the cloud connection to be resumed very efficiently, unlike some other protocols like MQTT over TLS/SSL that require a full 5K TLS handshake on reconnection.

Using feature like Particle Publish allows data to be sent to external servers using as little as 150 to 200 bytes of data. Establishing a TLS/SSL connection to an external server directly from a device could use 5000 bytes of data for each piece of data sent when including the TLS/SSL handshake. This is possible because the TLS/SSL authentication is done off-device using [webhooks](/reference/device-cloud/webhooks/) or the [server-sent-events stream](/reference/device-cloud/api/#product-event-stream).

### Communication Features

- [Publish and Subscribe](/tutorials/device-os/device-os/#particle-publish).
- [Functions and Variables](/tutorials/device-os/device-os/#particle-function).
- [Over-the-air (OTA) firmware updates](/tutorials/device-cloud/ota-updates/).

#### Particle.publish

[Particle.publish](/reference/device-os/firmware/#particle-publish-) allows an event to be sent from a device to the cloud, from the cloud to a device, or between devices. 

When sent from the device to the cloud, publish can be used to send things like sensor data and trigger events on the cloud. Once in the cloud, the event can trigger a [webhook](/reference/device-cloud/webhooks/) that makes a connection to an external service or web server efficiently.

![Publish Flow](/assets/images/PublishFlow.png)

#### Particle.variable

[Particle.variable](/reference/device-os/firmware/#particle-subscribe-) allows the cloud to query a value from the device.

- For a publish, every time you publish, the data is sent up to the cloud.
- For a variable, the current value is stored on the device, and is only sent when requested.

![Variable Flow](/assets/images/VariableFlow.png)


Depending on your situation, one or the other may be more efficient. Also note:

- If you are querying a value from a large number of devices, it's almost always more efficient to use publish as you can hit the [API rate limits](/reference/device-cloud/api/#api-rate-limits) if you need to make a variable retrieval to hundreds or thousands of devices.
- Variables cannot be queried if the device is offline, including in sleep mode. For those applications, you'll want to publish a value before sleep instead.

#### Particle.subscribe

[Particle.subscribe](/reference/device-os/firmware/#particle-subscribe-) allows a device to listen for an event from another device or the cloud.

Subscribing to private events is secure, as only devices in your account can send these events. Also, subscribe works across all connection types such as Wi-Fi and cellular, and does not require any firewall modifications for Wi-Fi networks in most cases.

#### Particle.function

[Particle.function](/reference/device-os/firmware/#particle-subscribe-) allows the cloud to send a request to a single device. This is handy if you want to control a device from the cloud side. 

There is no ability for devices to send function calls to other devices; publish and subscribe should be used instead.

#### OTA Firmware Updates

Updating your device firmware and Device OS can be done securely over the Particle cloud connection that's used for the other device cloud features.


