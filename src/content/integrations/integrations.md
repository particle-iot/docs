---
title: Integrations
layout: commonTwo.hbs
columns: two
description: Using Integrations to access external services
---

# {{title}}

### Integrations

Integrations provide a way of easily and efficiently interacting with an Internet-based service. There are several advantages to this:

- They take advantage of the authentication and encryption already provided with the Particle cloud connection.
- They use significantly less data than connecting directly.
- They often do not require external libraries, saving more code space for your application.

<img src="/assets/images/PublishFlow.png" class="full-width"/>

The typical flow is for your device to do a [`Particle.publish()`](/reference/device-os/api/cloud-functions/particle-publish/). This triggers an integration such as a webhook or Google Cloud Integration. For example, you could use this integration to store data in a cloud-based database, or update values in a dashboard. 

It's also possible for the integration to return data to the device.

While webhooks can access many external services, there are special integrations for:

- Google Cloud Platform
- Google Maps (Cellular or Wi-Fi geolocation service)
- Azure IoT Hub

For a webhook, when the triggering event is received, it makes an outgoing connection to a web server. Typically this is encrypted using TLS/SSL (https). Standard REST API calls (GET, POST, PUT, etc.) can be made. Additionally, you can do simple manipulation of the data using [Mustache Templates](/reference/cloud-apis/webhooks/#variable-substitution). This can modify the request URL, request data, and response data. The webhook can also add HTTP headers, query arguments, and form data, if desired. 


### Server-Sent-Events (SSE)

<img src="/assets/images/SSEFlow.png" class="full-width"/>

{{!-- BEGIN shared-blurb 7aab98b6-da1a-43e8-ac8c-49713ceef19d --}}

Two common ways Particle devices can trigger external services are webhooks and Server-Sent Events (SSE).

The SSE event stream works by having your server make an outbound https (encrypted) connection to the Particle API service. This connection is kept open, and if new events arrive, they are immediately passed down this stream. There are a number of advantages to this:

- Works for developer and product event streams.
- Can get all events, or a subset of events by prefix filter.
- Works from a network behind a firewall or NAT typically with no changes required (no port forwarding required).
- You do not need TLS/SSL server certificates for encrypted communication, because the connection is outbound.
- You do not need separate authentication; Particle API tokens are used for authentication.
- It's efficient - the connection only needs to be established and authenticated once.

While this sounds great, there are some issues that can occur that make it less than ideal for large device fleets and make webhooks more attractive:

- You can only have one server accepting events with SSE. With webhooks you can have multiple servers behind a load balancer for both server redundancy as well as load sharing.
- If the SSE stream fails for any reason, you could end up losing events. It can take up to a minute to detect that this has happened in some cases.

| SSE | Webhooks |
| :---: | :---: |
| Works from behind a firewall | Requires a public IP address |
| Encrypted without a SSL certificate | Requires a SSL certificate for the server to support https |
| Best if lost events are not critical | Event delivery is more reliable |
| Only allows a single server | Can use load balancing and redundant servers |

When using SSE, we recommend using the [particle-api-js](/reference/cloud-apis/javascript/#geteventstream) library with node.js, however any language can be used. We recommend using a good, well-tested SSE library as there are some things to beware of when implementing the SSE protocol:

- The connection can be closed at any time by the SSE server. You must be able to handle this and reconnect.
- The connection can stop receiving data because the TCP connection is losing all packets when crossing the Internet. You can detect this because the SSE client will not get any events or the 60 second ping, and it should try reconnecting. This also means that you could lose up to 60 seconds of events in the case of an Internet outage.
- Beware of excessively reconnecting and rate limits.

There is a limit of 100 requests to open an SSE connection in each 5 minute period per public IP address. If rate limiting occurs, you will get a 529 error and you must wait before retrying the connection or you will never be able to successfully connect again. There is also a limit of 100 simultaneous SSE connections from each public IP address. This is not separated by device, access token, etc.; it applies to the public IP address the requests come from.

Because of the simultaneous connection limit, if you want to subscribe to multiple events, you should establish one SSE connection to handle all events, and filter the results for the events that you want to handle. While this seems less efficient, it is the preferred method because the overhead of handling multiple SSE sessions is far higher than the incremental overhead of sending many events across a single event stream. Using a common prefix to group multiple events that need to be received from a single SSE event stream is also a good technique to use if possible.

{{!-- END shared-blurb --}}

