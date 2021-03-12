---
title: Cellular Data Guide
layout: tutorials.hbs
columns: two
order: 22
description: Optimizing data using with Particle cellular devices
---

## Cellular Data Service with Particle

Particle provides a number of devices with cellular connectivity including the Tracker, Boron, B Series SoM, E Series, and Electron. These can provide access in areas without Wi-Fi and provide a more seamless solution that does not depend on being able to connect to your customer's Wi-Fi network, which may involve unexpected challenges. 

### Free Tier

- Up to 100 devices, any mix of cellular and Wi-Fi
- 100K Data Operations (100,000) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to 45 MB of cellular data per month, pooled across all devices, at no charge
- No credit card required
- Products can be prototyped in the Free tier
- Device communication is paused<sup>1</sup> when the monthly limit is reached
- Community support

<sup>1</sup>During the transition period, a warning will be sent but communication will not be immediately paused.

### Data Operations

The central billing element for both cellular and Wi-Fi is the data operation:

- Each publish, subscribe, function, or variable consumes one data operation regardless of size (currently limited to 622 bytes per operation)
- Stored data, such as Tracker geolocation data, consume one data operation per location point saved<sup>1</sup>
- Each user-initiated device ping consumes one data operation
- Certain retransmissions, as described below

<sup>1</sup>During the transition period, stored data will not be measured, however the publish from the device will be measured.

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

#### Webhooks and other integrations

When a device sends an event that triggers a webhook or other integration, that will consume one data operation.

If the webhook response is not subscribed to by the device, that will be the only data operation.

If the webhook response is subscribed to by the device, it will use one data operation for each 512-byte segment of a response. Retransmissions could also increase the number of Data Operations, as described below.

#### Retransmissions

When a device must retransmit data that does not reach the cloud, for example because of poor cellular connectivity, it does not count as a Data Operations. If it retransmits the data because the acknowledgement was lost, that could cause an additional data operation as the data was actually received by the cloud twice.

When transmitting from the cloud to a device, such as for a function, variable, or subscription:

If the device is marked as offline, no data transmission will be attempted and no Data Operations will be incurred.

If the device is believed to be online, an attempt will be made, which will consume a data operation.

If the transmission is not acknowledged, it is possible that up to two more attempts will be made, each adding a data operation. If all three attempts fail, the device will then be marked as offline.

### Cellular Data Limit

For cellular devices, there is a data limit depending on your tier. For the Free tier, the cellular data limit is 45 MB, pooled across all devices, which includes all data usage including Data Operations, OTA code flash, overhead, and 3rd-party services. This limit is high relative to the average size of Data Operations, so you probably won't need to worry about the exact number of bytes for each operation.

For Wi-Fi devices (Photon, P1, Argon) there is no limit for direct TCP or UDP data communications, or services that are based on direct communication such as [Blynk](https://blynk.io/).

### What consumes data?
Any time a Particle cellular device talks to the Internet or the Internet talks back,
that data travels though the cellular network and is metered. There's
also unavoidable overhead on all communications because of the structure
of the Internet and the necessity of security and reliability. Many of
these communications are intentional and obvious, like calling
Particle.publish() or flashing code over the air. There are other
communications that you may not even be aware of. For instance, when a 
cellular device turns on or is reset it has to register with the cell towers
and the Particle Device Cloud, and this set of messages can use as much as 6KB! The following all use data:

**Functions from or registered by firmware:**
- Publish (smallest communication)
- Function calls from the API
- Variable calls from the API
- Subscribe to events or webhook response
- Direct network connections through TCPClient or UDP
- DNS name resolution

**Background connectivity:**
- Pings (once every 23 minutes if no other communications happen and device is awake. 122 bytes)
- Handshakes (when the device comes online initially, and then every 3 days. up to 6kB) 

**Flashing code:**
- Flashing code over the air including Device OS upgrades.

**Starting a connection:**
Whenever a cellular has to join the cellular network it will "handshake" and register itself and your functions and variables.
- Startup
- Reset
- Wake from deep sleep
- Wake from stop mode (when not using `SLEEP_NETWORK_STANDBY`)
- Cellular modem is turned off and on again


### Ways to reduce data use
There are lots of things you can do to save data! 

**Use Shorter Names** This applies to Particle.publish, .variable, and .function. Those longer names have to be sent to/from the cloud, so you're much better off using `Particle.publish("x")` than `Particle.publish("xylophone_is_now_playing_a_song")`. 

**Use Serial() for Development** When you're first testing and debugging your code, you can avoid costly and embarrassing runaway data publishing scenarios by sending sensor readings, alerts, etc over a USB cable. Comment out your `Particle.publish()` line, add `Serial.begin(9600);` to `setup()` and instead use `Serial.println(your_data_here")` to log data out to a serial terminal. You can use [Particle Workbench](/quickstart/workbench/), the Arduino IDE, `screen` or any other terminal program. Find out more in the [Serial reference](/reference/device-os/firmware/#serial)

**Event-Driven Publishing** One of the very common structures we see in code is a loop() with a sensor reading, then a publish and delay. This calls the publish (and uses data) at some regular interval, but the data being reported may not have changed! Picture a temperature sensor in your yard- the temperature is unlikely to have changed much after 1 second, 1 minute, or even 10 minutes. The data-efficient thing to do is to save the temperature you last published and compare the current reading to that previous one. If it's more than a few degrees different, then publish the new one.

```
// We're also using absolute value here, so may need to #include "math.h"
if(abs(temperature-lastTemperature)>5){
	Particle.publish("T",temperature);
}
```

**Combining Publishes** Are you sending data that isn't time-critical? Consider combining many data points into a single publish. Instead of using the 100+ bytes of overhead for every data point, you'll only use it once and save a ton! Sample the data based on change or frequency, store them in a string or array, and then send them out as one publish when you've collected as many as you want (or fit in the 622 byte data field of a Particle.publish). We often add commas between data points so they're easy to separate.

```
Particle.publish("T", String::format("%d,%d,%d,%d,%d", temperatures[0],temperatures[1],temperatures[2],temperatures[3],temperatures[4]));
```

**On-Device Logic** Most of the behaviors you'd like to implement can live right on the device. For example, if you have a greenhouse with a motorized vent, and you want the vent to turn on if the temperature exceeds a user-set threshold, then there are two options. You could send the temperature reading to the cloud from time to time, compare the reading to the threshold, and have the cloud control the vent via a function if the temp is above the threshold. This is much, much less data efficient than using a function to set the threshold on the device when necessary, and otherwise keeping the logic and control entirely on the device. This has the added benefit of being more reliable in the event of a connectivity outage.

**Use webhooks** Webhooks take a value that you Particle.publish and convert it into a HTTP request to an external server. If the external server is accepting connections by https (TLS/SSL), doing the TLS handshake from the webhook server greatly reduces the data usage from around 6K to the size of the publish, which might be as low as 100 bytes.

**Use network sleep modes** If you are sleeping for 15 minutes or less, you can save data by keeping the cellular connection alive by using [network sleep](/reference/device-os/firmware/boron/#network-systemsleepconfiguration-). This can eliminate the negotiation that would occur to being the device back online after sleep.

**Update Device OS over USB** Using `particle update` over USB to upgrade your device's version of Device OS can save a significant amount of data over upgrading over-the-air.

### Additional Details

If you're interested in the specific details about data usage, expand this section.

{{collapse op="start" label="Additional low-level details"}}

**Changed to UDP from TCP**
The unencrypted CoAP message for a small published event is 10 bytes. Add 20 bytes of IPv4 frame overhead, and you have 30 bytes of data common to both the Photon's TCP communications and cellular UDP communications.

On the Photon, the AES encryption mode is CBC, which always rounds up to a block size of 16 bytes. That 10-byte message just got 6 bytes bigger, plus we add a 2-byte length to our encrypted messages so the receiver knows how many bytes to pull from the stream. The TCP frame is 20 bytes, plus every message is acknowledged at the TCP level adding another 20 (TCP) + 20 (IP) for the ACK. So even if we don't acknowledge at the application layer, a small, non-confirmable published event from a Photon results in at least 98 bytes of communication.

On cellular devices, the AES encryption mode is CCM, which adds no overhead, however the DTLS tunnel does have 29 bytes of overhead per datagram. The UDP frame is 8 bytes, much smaller than TCP's 20. Additionally the UDP layer has no built-in acknowledgement. A small, non-confirmable published event from a cellular device is only 67 bytes.

**Reduced ping frequency**
To keep the TCP connection alive on the Photon we have to send a ping every 15 seconds even if your application isn't communicating at all. Those pings end up being the same size as the publish described above, plus acknowledge them at the application level. The initial ping results in 98 bytes, plus then the application's acknowledgement is another 98 bytes. That's 196 bytes every 15 seconds, or almost 46 kilobytes per hour, just in pings.

On cellular devices, using UDP, there is no connection to keep alive. The only reason we do send pings is to keep the NAT open at the cellular provider. A cellular device that is breathing cyan and doing nothing else currently pings every 23 minutes. The ping and the cloud's acknowledgement are each 61 bytes. That averages out to 318 bytes per hour, a dramatic reduction.

**Fewer handshakes and longer sessions**
When a device initially connects to the Particle cloud it has to perform a handshake to set up the encryption. The handshake is always big compared to the stream messages, multiple kilobytes for both Wi-Fi and cellular devices. However, we can control how often handshakes happen.

With TCP on the Photon, a handshake must happen for every newly opened connection. A Photon that goes to sleep for an hour, wakes up to read its sensors each hour, and publishes the accumulated data every 6 hours will have to handshake every 6 hours when it connects to the cloud.

On cellular-devices we use UDP, which is connection-less. A cellular device can go to sleep, wake up sometime later, and talk to the Particle cloud without performing a handshake, continuing to use the DTLS session credentials it previously established. We currently require a cellular device to handshake at least once every three days, and this is subject to change. The data usage of handshakes is thus dramatically reduced from hundreds of KB per week for sleepy Photons to a few KB per week for sleepy cellular devices.

**The structure of data transmission**
When data is sent to or from the device, it comes with a fixed overhead. This includes the [User Datagram Protocol (UDP)](https://en.wikipedia.org/wiki/User_Datagram_Protocol#Packet_structure) header, the Datagram Transport Layer Security (DTLS) header, and an acknowledgement message (ACK). The UDP header is necessary because specifies where the packet came from and where it's going, and that adds 26 bytes to a message. Without the DTLS header we couldn't encrypt your data, and that's an additional 27 bytes. Finally, the ACK is a very short message back from the Cloud with its own UDP and DTLS headers which acts as a receipt and confirms that a message was received, and adds around 61 bytes. For a very short Particle.publish you're looking at a total of nearly 128 bytes, mostly comprised of infrastructure.

**Tinker App:**
Our friend Tinker also consumes data! Calling digital and analog read/writes use the API to talk to a cellular device, and it has to reply. Use sparingly and you'll be fine. 
- All functions of Tinker (digital I/O, analog I/O)

**Libraries: HTTPClient, MQTT, etc:**
Whenever you use a library that talks over the network you'll use data. A lot of data. We highly recommend that you do **NOT** use these with cellular devices, as they will use data much more quickly than Particle publishes and functions.

{{collapse op="end"}}

