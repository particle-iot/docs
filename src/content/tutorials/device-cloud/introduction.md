---
title: Introduction
columns: two
layout: commonTwo.hbs
description: Introduction to the Particle Cloud for Particle IoT devices
---

# Device Cloud Introduction

## Device Cloud Features

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

[Particle.publish](/cards/firmware/cloud-functions/particle-publish/) allows an event to be sent from a device to the cloud, from the cloud to a device, or between devices. 

When sent from the device to the cloud, publish can be used to send things like sensor data and trigger events on the cloud. Once in the cloud, the event can trigger a [webhook](/reference/device-cloud/webhooks/) that makes a connection to an external service or web server efficiently.

<img src="/assets/images/PublishFlow.png" class="full-width"/>

#### Particle.variable

[Particle.variable](/cards/firmware/cloud-functions/particle-subscribe/) allows the cloud to query a value from the device.

- For a publish, every time you publish, the data is sent up to the cloud.
- For a variable, the current value is stored on the device, and is only sent when requested.

<img src="/assets/images/VariableFlow.png" class="full-width"/>

Depending on your situation, one or the other may be more efficient. Also note:

- If you are querying a value from a large number of devices, it's almost always more efficient to use publish as you can hit the [API rate limits](/reference/device-cloud/api/#api-rate-limits) if you need to make a variable retrieval to hundreds or thousands of devices.
- Variables cannot be queried if the device is offline, including in sleep mode. For those applications, you'll want to publish a value before sleep instead.

#### Particle.subscribe

[Particle.subscribe](/cards/firmware/cloud-functions/particle-subscribe/) allows a device to listen for an event from another device or the cloud.

Subscribing to private events is secure, as only devices in your account can send these events. Also, subscribe works across all connection types such as Wi-Fi and cellular, and does not require any firewall modifications for Wi-Fi networks in most cases.

#### Particle.function

[Particle.function](/cards/firmware/cloud-functions/particle-subscribe/) allows the cloud to send a request to a single device. This is handy if you want to control a device from the cloud side. 

There is no ability for devices to send function calls to other devices; publish and subscribe should be used instead.

#### Public Events

Prior to August 2020, a feature existed for public publish and subscribe. This allowed an event to be published and viewed by anyone on the Internet who subscribed to it. This was envisioned as been similar to public tweets on Twitter.

In practice, this feature was vary rarely intentionally used and frequently unintentionally used, creating security issues. Not only would the data be viewable by the public, but when used for controlling things, anyone could send control messages. To eliminate this problem, public event support has been removed. 

#### OTA Firmware Updates

Updating your device firmware and Device OS can be done securely over the Particle cloud connection that's used for the other device cloud features.



## Pricing Tiers

{{blurb name="tiers"}}

## Data Operations

{{blurb name="dataoperations"}}

{{> dataoperationscalc}}

## Blocks

Blocks are a maximum number of Data Operations and devices per month in the Growth tier:

- Up to {{growthTierDataOperationsUnit}} Data Operations ({{growthTierDataOperationsComma}}) per month 
- Up to {{growthTierDevices}} devices
- Up to {{growthTierDataOperationsCellularData}} of cellular data per month ({{growthTierDataOperationsTrackerData}} for Tracker), pooled across all devices, for each block purchased
- Price varies for Wi-Fi, Cellular, and Tracker
- Add as many blocks are you need

For example, if you have 150 devices you will need 2 blocks, even if your Data Operations do not yet exceed {{growthTierDataOperationsUnit}}. 

Likewise, if you are using a million Data Operations per month, you will need 2 blocks, even of you have fewer than 100 devices.

If you exceed the number of data operations or cellular data usage for the number of blocks you have purchased this billing month, additional block(s) will be charged at the start of the next billing month to account for your current usage. You are not billed a prorated block at the time of the overage, and you will only be billed on your normal billing date for full blocks.

## Non-Particle cloud traffic

For Wi-Fi devices (Photon, P1, Argon) there is no limit for direct TCP or UDP data communications, or services that are based on direct communication such as [Blynk](https://blynk.io/).

For cellular devices, there is a data limit depending on your tier. For the Free tier, the cellular data limit is {{freeTierDataOperationsCellularData}}, pooled across all devices, which includes all data usage including Data Operations, OTA code flash, overhead, and 3rd-party services.

## Minimizing Data Operations

There are many possible steps for minimizing the number of Data Operations that you use, and will tend to be specific to your use case. Some options to consider:

### Publish changed values only

In some cases, it may be useful to only publish values when they change, instead of periodically. Each publish uses a data operation.

### Avoid polling variables frequently

Each request of a Particle.variable uses a data operation. If you are doing this constantly and frequently, this can use a large number of data operations. 

If multiple things (web pages, mobile apps, etc.) are all polling a variable, each one uses a data operation. Using publish is generally more efficient because the device will only use one data operation per value sent, regardless of the number of things viewing the event by webhook or SSE. 

### Combine fields

Rather than publish several independent variables, publish several related variables at once in a single publish. Some common methods include:

- Comma-separated values
- JSON

You're still limited to a maximum publish size, but you can still store many values in a single publish. The limit is 622 to 1024 bytes of UTF-8 characters depending on Device OS version and sometimes the device; see [API Field Limits](/cards/firmware/cloud-functions/overview-of-api-field-limits/)

### Aggregate data by time

If you need a time series of data, but latency is acceptable, you can aggregate data by time.

Instead of publishing once per second, you could accumulate 10 samples and send 10 every 10 seconds, reducing the number of publishes. 

### Only transmit changed data

In some cases, you may want to only publish data when it changes. 

Or, if it changes by a significantly large amount for analog-like data using a change threshold (value differs by more than x).

Or keep a mean value of samples and publish when the current sample deviates from the mean. This can be helpful if the value tends to creep up or down slowly and wouldn't trigger a change threshold, but accumulates over time.

### Beware when subscribing

When subscribing to events on-device, every event that's delivered to the device is a data operation. If many devices are sending events to all devices, this can add up to be a large number of events.

### Beware of webhook response subscription

Similarly, in most cases you want only the device that triggered the webhook to get its response. To do this, prefix the hook-response and hook-error responses with the device ID as described [here](/reference/device-cloud/webhooks/#responsetopic). 

Also each 512 byte response chunk counts as a data operation, so minimizing the size of the response can save data operations.

If the data being returned in JSON, sometimes you can filter out only the information you need using [mustache templates](/tutorials/device-os/json/#mustache-variables).

## Limits

### Where can I check my usage limits?

The [Particle Console](https://console.particle.io) lists the three limits you will most likely encounter:

- The number of devices (both cellular and Wi-Fi)
- The number of Data Operations consumed this billing month
- The number of MB of cellular usage this billing month

Note that the cellular data usage is not real-time. It can take at least 24 hours, and in some cases may lag several days behind actual usage.

### What happens if I need more than 100 devices?

You cannot add more than 100 devices to the Free tier. You instead will need to upgrade to the Growth tier. 

You can have any number of devices in the Growth tier, but you will need to purchase another block for each group of 100 devices. It's not possible to purchase a fractional block for devices only; each block includes a maximum number of devices, Data Operations, and cellular data usage, and exceeding any one limit will require purchasing an additional block.

There is no limit to the number of blocks you can purchase in the Growth tier, however upgrading to an enterprise contract can reduce the cost.

### What happens if I exceed the number of Data Operations?

In the Free tier, if you need more Data Operations you will need to upgrade to the Growth tier. When you exceed {{freeTierDataOperationsUnit}} Data Operations, all Data Operations for both cellular and Wi-Fi will stop until the end of the billing month, when they will be resumed. You cannot add more Data Operations to the Free tier. 

In the Growth tier, if you need more than {{growthTierDataOperationsUnit}} Data Operations across your fleet of devices per month, you can add another block.

In the Enterprise tier, the number of Data Operations is pooled annually across all devices, instead of monthly in the Free and Growth tiers.

### What happens if I exceed the cellular data quota?

In the Free tier, if you exceed the pooled monthly data quota, all SIMs in your account will be paused until the end of the billing month, when they will be resumed. It is not possible to add more data to the Free tier.

In the Growth tier, if you exceed the pooled monthly data quota, you can add an additional block to add more data.

In the Enterprise tier, the amount of cellular data is pooled annually across all devices, instead of monthly in the Free and Growth tiers.

### What is the maximum rate I can send data?

[Publishes from a device](/cards/firmware/cloud-functions/particle-publish/) a limited to 1 per second, at the maximum publish payload size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/cards/firmware/cloud-functions/overview-of-api-field-limits/).

There are no additional limits placed on webhooks. However, if the server you are sending to cannot process the data within 20 seconds or returns an error because it is overloaded, traffic to the server will be throttled, and the [events will be discarded](/reference/device-cloud/webhooks/#limits).

While there is no specific rate limit on variables and functions, there are practical limits on how fast the device can return data. The device can only process one function or variable at a time. Additionally, if you have more than a few devices you will instead [run into API rate limits](/reference/device-cloud/api/#api-rate-limits) which limit how fast you can make requests to the Particle cloud APIs. You should avoid polling your entire device fleet frequently using functions or variables, as this is likely to cause scalability issues.


## Wi-Fi Support

| Feature | Gen 2 | Gen 3 |
| :------ | :---: | :---: |
| Devices | [Photon](/datasheets/wi-fi/photon-datasheet/) & [P1](/datasheets/wi-fi/p1-datasheet/) | [Argon](/datasheets/wi-fi/argon-datasheet/) |
| Particle mobile app supported | &check; | &check; |
| [Mobile SDK](/reference/SDKs/ios/#photon-setup-library) for white-label setup apps | &check; | &nbsp; |
| USB configuration | &check; | &check; |
| BLE configuration | &nbsp; | &check; |
| [Soft AP](/cards/firmware/softap-http-pages/softap-http-pages/) (configuration over Wi-Fi) | &check; | &nbsp; |
| Static IP address support | &check; | &nbsp; |
| WPA2 Enterprise support | &check; | &nbsp; |

### WPA2 Enterprise

WPA2 Enterprise is a variation of Wi-Fi sometimes used in corporate and educations environments. It's sometimes referred to as WPA Enterprise, and mentions of 802.1(x), RADIUS, or eduroam indicate that WPA2 Enterprise is being used.

To configure a Photon or P1 using WPA2 Enterprise, follow the [WPA2 Enterprise Setup Instructions](https://support.particle.io/hc/en-us/articles/360039741153). Of note:

- Setup can only be done over USB using the [Particle CLI](/tutorials/developer-tools/cli/) (no mobile app support).
- Requires Device OS 0.7.0 or later for WPA2 Enterprise Support.
- Device OS 1.5.4-rc.1 or 2.0.x or later is required if concatenated certificates (intermediate certificates) are required.
- Only one set of WPA2 Enterprise Wi-Fi credentials can be stored.
- The Argon does not have WPA2 Enterprise support.

There are a variety of encryption protocols for WPA2 Enterprise, however only the following are supported on the Photon and P1:

- EAP-TLS (certificate-based)
- PEAPv0/EAP-MSCHAPv2 (username/password challenge/response)


| Parameter | Options |
| :--- | :--- |
| Certificate type | RSA certificates only |
| Certificate signature | SHA-1, SHA-256, SHA-384, or SHA-512 only |
| Keyschemes | RSA and DH RSA only |
| Ciphers | AES-128-CBC only |
| MAC | SHA-1 and SHA-256 only |
| TLS versions | TLS1.0 and TLS1.1 only |

Support has been tested with Microsoft NPS, Cisco Secure ACS, and Cisco ISE. FreeRADIUS RADIUS implementations with have been tested with Ubiquiti, Cisco, and Aruba access points. Eduroam sometimes works, however it is dependent on the university's WPA2 Enterprise configuration; some use settings that do not correspond to the requirements above.

### Special Wi-Fi Considerations

The following features are **not supported**:

- 5 GHz is not supported.
- Captive portals (where you are redirected to a web page to agree to terms of service or enter an authorization code) are not supported. This is common in hotels and corporate public networks.
- Wi-Fi networks that are 802.11 n only (do not support 802.11 b or g as well) are not supported on the Photon and P1.
- Special configuration steps are necessary to [set up a Photon or P1 with WEP encryption](http://rickkas7.github.io/wep/). It is possible, but difficult, to set up and is not recommended as WEP is also not secure.
- Networks without a DHCP server are not supported on the Argon as there is no static IP address support.
- IPv6 is not supported.

## Cloud Services and Firewalls

The IP addresses used by the Particle cloud are subject to change without notice. Use the information here as a last resort if you have a network that restricts traffic and are unable to allow-list traffic by using techniques such as MAC address allow-lists.

### Gen 3 and Gen 2 Cellular

Gen 3 devices (Argon, Boron, B Series, Tracker SoM) and Gen 2 cellular devices (Electron, E Series) all use UDP port 5684, outbound. 

While you rarely need to worry about this for cellular devices, for the Argon (Wi-Fi), if you are connecting from a network with a restrictive network firewall, the devices will connect to one of these IP addresses, port 5684, outbound. Like most UDP-based protocols (like DNS), your firewall generally creates a temporary port to allow packets back to the device without creating a permanent firewall port forwarding rule. The amount of time this port will remain active ranges from seconds to hours, and you may need to use [`Particle.keepAlive()`](/cards/firmware/cloud-functions/particle-keepalive/) to keep the cloud connection active.

{{dnsTable key="udp"}}

### Gen 2 and Gen 1 Wi-Fi

The Photon, P1, and Spark Core connect to TCP Port 5683 (CoAP), outbound.

If you are connecting from a restrictive network that does not allow outbound TCP access on Port 5683, you may need to allow-list these IP addresses or allow access based on the device's MAC address.

{{dnsTable key="tcp"}}

### Cloud API

The devices themselves do not access the Particle Cloud using the API port, but if you are using the Tinker mobile app over Wi-Fi, curl commands, node.js scripts, etc. from a computer on the Wi-Fi or LAN, and you have a restrictive outbound network connection policy, you may need to allow-list **api.particle.io** port 443 (TLS/SSL), outbound.

### Other Services

Other common services includes:

- **console.particle.io** (device management)
- **docs.particle.io** (documentation)
- **build.particle.io** (Web IDE)
- **support.particle.io** (support and knowledge base)

If you are using network with restrictive outbound access policies, you may need to allow-list those DNS names for port 443 (TLS/SSL) outbound.
