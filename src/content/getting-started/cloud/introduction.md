---
title: Introduction
columns: two
layout: commonTwo.hbs
description: Introduction to the Particle Cloud for Particle IoT devices
---

# Device cloud introduction

## Device cloud features

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

Using feature like Particle Publish allows data to be sent to external servers using as little as 150 to 200 bytes of data. Establishing a TLS/SSL connection to an external server directly from a device could use 5000 bytes of data for each piece of data sent when including the TLS/SSL handshake. This is possible because the TLS/SSL authentication is done off-device using [webhooks](/reference/cloud-apis/webhooks/) or the [server-sent-events stream](/reference/cloud-apis/api/#product-event-stream).

### Communication features

- [Publish and Subscribe](/getting-started/device-os/introduction-to-device-os/#particle-publish).
- [Functions and Variables](/getting-started/device-os/introduction-to-device-os/#particle-function).
- [Over-the-air (OTA) firmware updates](/getting-started/cloud/ota-updates/).

#### Particle.publish

[Particle.publish](/reference/device-os/api/cloud-functions/particle-publish/) allows an event to be sent from a device to the cloud, from the cloud to a device, or between devices. 

When sent from the device to the cloud, publish can be used to send things like sensor data and trigger events on the cloud. Once in the cloud, the event can trigger a [webhook](/reference/cloud-apis/webhooks/) that makes a connection to an external service or web server efficiently.

<img src="/assets/images/PublishFlow.png" class="full-width"/>

#### Particle.variable

[Particle.variable](/reference/device-os/api/cloud-functions/particle-subscribe/) allows the cloud to query a value from the device.

- For a publish, every time you publish, the data is sent up to the cloud.
- For a variable, the current value is stored on the device, and is only sent when requested.

<img src="/assets/images/VariableFlow.png" class="full-width"/>

Depending on your situation, one or the other may be more efficient. Also note:

- If you are querying a value from a large number of devices, it's almost always more efficient to use publish as you can hit the [API rate limits](/reference/cloud-apis/api/#api-rate-limits) if you need to make a variable retrieval to hundreds or thousands of devices.
- Variables cannot be queried if the device is offline, including in sleep mode. For those applications, you'll want to publish a value before sleep instead.

#### Particle.subscribe

[Particle.subscribe](/reference/device-os/api/cloud-functions/particle-subscribe/) allows a device to listen for an event from another device or the cloud.

Subscribing to private events is secure, as only devices in your account can send these events. Also, subscribe works across all connection types such as Wi-Fi and cellular, and does not require any firewall modifications for Wi-Fi networks in most cases.

#### Particle.function

[Particle.function](/reference/device-os/api/cloud-functions/particle-subscribe/) allows the cloud to send a request to a single device. This is handy if you want to control a device from the cloud side. 

There is no ability for devices to send function calls to other devices; publish and subscribe should be used instead.

#### Public events

Prior to August 2020, a feature existed for public publish and subscribe. This allowed an event to be published and viewed by anyone on the Internet who subscribed to it. This was envisioned as been similar to public tweets on Twitter.

In practice, this feature was vary rarely intentionally used and frequently unintentionally used, creating security issues. Not only would the data be viewable by the public, but when used for controlling things, anyone could send control messages. To eliminate this problem, public event support has been removed. 

#### OTA Firmware updates

Updating your device firmware and Device OS can be done securely over the Particle cloud connection that's used for the other device cloud features.



## Pricing plans

{{!-- BEGIN shared-blurb 27145a22-9b9b-11ec-b909-0242ac120002 --}}
#### Free plan

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge
- No credit card required
- Products can be prototyped in the Free plan
- Device communication is paused<sup>1</sup> when the monthly limit is reached
- Community support

<sup>1</sup> You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. Once you reach the 100% limit you have three days to switch the the Basic plan, or data will be stopped until the end of your billing month. It will automatically resume on the free plan at the beginning of the next billing month, still on the free plan, if you do not upgrade.

#### Basic plan

- A block includes {{basicTierDataOperationsUnit}} Data Operations ({{basicTierDataOperationsComma}}) per month and up to {{basicTierDevices}} devices
- Add as many blocks as you need for more Data Operations or more devices
- No limit to the number of blocks you can purchase self-service
- Up to {{basicTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, for each block purchased
- The basic plan was formerly known as the growth plan

#### Enterprise plan

- Enterprise plans include a maximum number of devices, Data Operations, storage, and cellular data
- Data Operations and cellular data are pooled across all devices annually
- Discounts for higher Enterprise plan commitments
- [Contact sales](https://particle.io/sales/) for more information
{{!-- END shared-blurb --}}

## Data operations

{{!-- BEGIN shared-blurb a7c0e9bc-9ba8-11ec-b909-0242ac120002 --}}
The central billing element for both cellular and Wi-Fi is the Data Operation:

- Each function or variable consumes one Data Operation
- Each publish or subscribe consumes one Data Operation for each 1024 bytes of data payload<sup>2</sup>
- The data has a maximum size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/)
- Stored data, such as Tracker geolocation data, consume one Data Operation per location point saved<sup>1</sup>
- Certain retransmissions, as described below

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

<sup>1</sup>You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. 
In the Free Plan you will have an opportunity to upgrade to the basic/plus plan. In the basic/plus plans, additional blocks can be added to allow for more data operations.

<sup>2</sup>For example: If you publish 800 bytes of data, it will count as 1 data operation. If you publish 1300 bytes of data, it will count as two. At the maximum publish size of 16 Kbytes, it would count as 16 data operations.
{{!-- END shared-blurb --}}

{{> dataoperationscalc}}

You can find more information in the [Data Operations](/getting-started/billing/data-operations/) page.

## Wi-Fi Support

| Feature | Gen 2 | Gen 3 | P2 | 
| :------ | :---: | :---: | :---: |
| Devices | [Photon](/reference/datasheets/wi-fi/photon-datasheet/) | [Argon](/reference/datasheets/wi-fi/argon-datasheet/) | [Photon 2](/reference/datasheets/wi-fi/photon-2-datasheet/) | 
| | [P1](/reference/datasheets/wi-fi/p1-datasheet/) |  | [P2](/reference/datasheets/wi-fi/argon-datasheet/) | 
| 2.4 GHz Wi-Fi | &check; |&check; |&check; |
| 5 GHz Wi-Fi | &nbsp; | &nbsp; | &check; |
| Particle mobile app supported<sup>2</sup> | &check; | &check; | &nbsp; |
| [Mobile SDK](/reference/mobile-sdks/ios/#photon-setup-library) for white-label setup apps | &check; | &nbsp; | &nbsp; |
| React Native Setup Example | &nbsp; | &check; | &check; |
| USB configuration | &check; | &check; |
| BLE configuration | &nbsp; | &check; |&check; |
| [Soft AP](/reference/device-os/api/softap-http-pages/softap-http-pages/) (configuration over Wi-Fi) | &check; | &nbsp; | &nbsp; |
| Static IP address support | &check; | &nbsp; | &nbsp; |
| WPA2 Enterprise support | &check; | &nbsp; | <sup>1</sup> |

<sup>1</sup>WPA2 Enterprise support will be added in a future version of Device OS for the P2 and Photon 2.

<sup>2</sup>The Particle mobile apps for iOS and Android will be deprecated in the future. You should not rely on them for your product setup experience.

### WPA2 Enterprise

WPA2 Enterprise is a variation of Wi-Fi sometimes used in corporate and educations environments. It's sometimes referred to as WPA Enterprise, and mentions of 802.1(x), RADIUS, or eduroam indicate that WPA2 Enterprise is being used.

To configure a Photon, P1 using WPA2 Enterprise using the Particle CLI. Of note:

- Setup can only be done over USB using the [Particle CLI](/getting-started/developer-tools/cli/).
- Requires Device OS 0.7.0 or later for WPA2 Enterprise Support.
- Device OS 1.5.4-rc.1 or 2.0.x or later is required if concatenated certificates (intermediate certificates) are required.
- Only one set of WPA2 Enterprise Wi-Fi credentials can be stored.
- The Argon, P2, and Photon 2 do not have WPA2 Enterprise support.

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

### Special Wi-Fi considerations

The following features are **not supported**:

- 5 GHz is not supported on the Argon, Photon, or P1. It is supported on the P2 and Photon 2.
- Captive portals (where you are redirected to a web page to agree to terms of service or enter an authorization code) are not supported. This is common in hotels and corporate public networks.
- Wi-Fi networks that are 802.11 n only (do not support 802.11 b or g as well) are not supported on the Photon and P1.
- Special configuration steps are necessary to [set up a Photon or P1 with WEP encryption](http://rickkas7.github.io/wep/). It is possible, but difficult, to set up and is not recommended as WEP is also not secure.
- Wi-Fi Networks without a DHCP server with the Argon, P2, and Photon 2 require Device OS 5.3.0 or later. Earlier versions did not support static IP addresses.
- IPv6 is not supported.

## Cloud services and firewalls

The IP addresses used by the Particle cloud are subject to change without notice. Use the information here as a last resort if you have a network that restricts traffic and are unable to allow-list traffic by using techniques such as MAC address allow-lists.

### Gen 3 and Gen 2 cellular

Gen 3 devices (Argon, Boron, B-Series, Tracker SoM, P2, and Photon 2) and Gen 2 cellular devices (Electron, E-Series) all use UDP port 5684, outbound. 

While you rarely need to worry about this for cellular devices, for the Argon, P2, and Photon 2 (Wi-Fi), if you are connecting from a network with a restrictive network firewall, the devices will connect to one of these IP addresses, port 5684, outbound. Like most UDP-based protocols (like DNS), your firewall generally creates a temporary port to allow packets back to the device without creating a permanent firewall port forwarding rule. The amount of time this port will remain active ranges from seconds to hours, and you may need to use [`Particle.keepAlive()`](/reference/device-os/api/cloud-functions/particle-keepalive/) to keep the cloud connection active. The default keep-alive for Gen 3 Wi-Fi devices is 25 seconds.

### Gen 2 and gen 1 Wi-Fi

The Photon, P1, and Spark Core connect to TCP Port 5683 (CoAP), outbound.

If you are connecting from a restrictive network that does not allow outbound TCP access on Port 5683, you may need to allow-list these IP addresses or allow access based on the device's MAC address.

### Internet test

If your device is unable to connect to the Particle cloud, but is able to connect to its network, an outbound UDP NTP request may be made to pool.ntp.org, port 123 to see if DNS and other hosts on the Internet are accessible. This is only done on connection failures, and only affects logging. It will not prevent connecting to the Particle cloud.

### Cloud IP addresses

The list of servers devices connect to is subject to change and you should avoid relying on a static list of IP addresses if possible.

The current list is stored [here](https://infra.particle.io/v2/data/ips/device-service.json).

### Cloud API

The devices themselves do not access the Particle Cloud using the API port, but if you are using the Tinker mobile app over Wi-Fi, curl commands, node.js scripts, etc. from a computer on the Wi-Fi or LAN, and you have a restrictive outbound network connection policy, you may need to allow-list **api.particle.io** port 443 (TLS/SSL), outbound.

### Other services

Other common services includes:

- **console.particle.io** (device management)
- **docs.particle.io** (documentation)
- **build.particle.io** (Web IDE)
- **binaries.particle.io** (installation binary downloads)

If you are using network with restrictive outbound access policies, you may need to allow-list those DNS names for port 443 (TLS/SSL) outbound.
