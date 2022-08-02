---
title: Device Communication
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
The Particle Device Cloud provides a secure, data-efficient way for your Particle devices to communicate.

  
## Secure

The Device Cloud uses mutual authentication using RSA public-private key pairs to make sure that:

a) your device is **your** device and not an impersonator and

b) the Particle cloud is the **real** Particle cloud and not a man-in-the middle impostor.

Thus both sides can be sure the other is who they say they are.

  
The initial handshaking process creates an encrypted session using DTLS over UDP (datagram TLS) on cellular and Gen 3 devices, or AES over TCP on the Photon and P1\. This assures that your data cannot be monitored or tampered with in transit.

  
The Particle cloud connection uses the CoAP (constrained application protocol) over DTLS or AES. All features like Publish, Subscribe, Particle Functions and Variables, and OTA firmware updates occur over a single CoAP connection.  
  
[Learn More about the Device Cloud](/getting-started/cloud/introduction/#secure)

  
## Data-Efficient

In order to conserve cellular data, Particle Cloud DTLS connections can be resumed. This allows a device to reconnect to the cloud using less than 200 bytes of data (vs. up to 5K of data for a full handshake).

  
Using CoAP over DTLS with session resume allows the cloud connection to be resumed very efficiently, unlike some other protocols like MQTT over TLS/SSL that require a full 5K TLS handshake on reconnection.

## Built-in Communication Primitives

* Particle Publish allows a device to send an event to the cloud, which can communicate with external services.
* Subscribe allows a device to receive events sent from the cloud.
* Functions allow the cloud to trigger an action on a device.
* Variables allow the cloud to query a value from a device on demand.

[Learn More about Device Communications](/getting-started/device-os/introduction-to-device-os/#communication)

When sent from a device to the cloud, Publish can be used to send things like sensor data and trigger events on the cloud. Once in the cloud, the event can trigger an integration that makes a connection to an external service or web server efficiently.

![PublishFlow.png](/assets/images/support/PublishFlow.png)

[Learn More About Integrations](/getting-started/integrations/integrations/)
