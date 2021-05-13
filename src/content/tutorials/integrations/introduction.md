---
title: Introduction
layout: commonTwo.hbs
columns: two
description: Using Integrations to access external services
---


### Integrations

Integrations provide a way of easily and efficiently interacting with an Internet-based service. There are several advantages to this:

- They take advantage of the authentication and encryption already provided with the Particle cloud connection.
- They use significantly less data than connecting directly.
- They often do not require external libraries, saving more code space for your application.

<img src="/assets/images/PublishFlow.png" class="full-width"/>

The typical flow is for your device to do a [`Particle.publish()`](/cards/firmware/cloud-functions/particle-publish/). This triggers an integration such as a webhook or Google Cloud Integration. For example, you could use this integration to store data in a cloud-based database, or update values in a dashboard. 

It's also possible for the integration to return data to the device.

While webhooks can access many external services, there are special integrations for:

- Google Cloud Platform
- Google Maps (Cellular or Wi-Fi geolocation service)
- Azure IoT Hub

For a webhook, when the triggering event is received, it makes an outgoing connection to a web server. Typically this is encrypted using TLS/SSL (https). Standard REST API calls (GET, POST, PUT, etc.) can be made. Additionally, you can do simple manipulation of the data using [Mustache Templates](/reference/device-cloud/webhooks/#variable-substitution). This can modify the request URL, request data, and response data. The webhook can also add HTTP headers, query arguments, and form data, if desired. 


### Server-Sent-Events (SSE)

<img src="/assets/images/SSEFlow.png" class="full-width"/>

It's also possible to use the Server-Sent-Events (SSE) stream. Your server makes an outgoing encrypted TLS/SSL connection to the Particle cloud and keeps the connection open. The Particle cloud can then push events down this connection in near real time.

- Faster response time.
- Lower request overhead on your server.
- Your server can be behind a firewall, including NAT.
- Your server can does not require a DNS name or a fixed IP address.
- The connection is encrypted without requiring a TLS/SSL server certificate for your server.

The disadvantage is that there is no way to distribute SSE traffic across multiple servers. This can cause issues when there is a very large number of events from a large number of devices, and also is a single point of failure.

Your server can be implemented in any language that supports the SSE protocol, however one popular solution is to use node.js and the [particle-api-js](/reference/SDKs/javascript/#geteventstream). It could be running on your own computer, or could be cloud-hosted using Google App Engine, Amazon, Azure, or other cloud services.

### Direct Connection

The alternative is directly connecting to external services:

<img src="/assets/images/DirectFlow.png" class="full-width"/>


The disadvantage of this approach is that you cannot leverage the Particle cloud authentication. You need to separately authenticate each transaction. While there are third-party libraries for using protocols like HTTP and TLS/SSL, these libraries are large and not official. Doing a https connection for each piece of data you want to upload might use 5K of data per connection! This is much less efficient than using an integration or SSE.
