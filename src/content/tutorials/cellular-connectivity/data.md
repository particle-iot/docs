---
title: Cellular Data Guide
layout: tutorials.hbs
columns: two
order: 12
---

## Cellular Data Service with Particle

The Electron introduces a whole new kind of connectivity with cellular, and with that comes a new resource to optimize: data. While data over Wi-Fi has been boundless and free, you may find yourself counting bytes with cellular. There are some necessary consumers of data Here's what consumes data, why and how it does, and what you can do to use less.

## How we've saved you data
We've worked very hard to optimize everything out of the gate and save you a great big pile o' data. Here are some of the improvements we've made specifically for the Electron.

**Changed to UDP from TCP**
The unencrypted CoAP message for a small published event is 10 bytes. Add 20 bytes of IPv4 frame overhead, and you have 30 bytes of data common to both the Photon's TCP communications and the Electron's UDP communications.

On the Photon, the AES encryption mode is CBC, which always rounds up to a block size of 16 bytes. That 10-byte message just got 6 bytes bigger, plus we add a 2-byte length to our encrypted messages so the receiver knows how many bytes to pull from the stream. The TCP frame is 20 bytes, plus every message is acknowledged at the TCP level adding another 20 (TCP) + 20 (IP) for the ACK. So even if we don't acknowledge at the application layer, a small, non-confirmable published event from a Photon results in at least 98 bytes of communication.

On the Electron, the AES encryption mode is CCM, which adds no overhead, however the DTLS tunnel does have 29 bytes of overhead per datagram. The UDP frame is 8 bytes, much smaller than TCP's 20. Additionally the UDP layer has no built-in acknowledgement. A small, non-confirmable published event from an Electron is only 67 bytes.

**Reduced ping frequency**
To keep the TCP connection alive on the Photon we have to send a ping every 15 seconds even if your application isn't communicating at all. Those pings end up being the same size as the publish described above, plus acknowledge them at the application level. The initial ping results in 98 bytes, plus then the application's acknowledgement is another 98 bytes. That's 196 bytes every 15 seconds, or almost 46 kilobytes per hour, just in pings.

On the Electron, using UDP, there is no connection to keep alive. The only reason we do send pings is to keep the NAT open at the cellular provider. An Electron that is breathing cyan and doing nothing else currently pings every 23 minutes. The ping and the cloud's acknowledgement are each 61 bytes. That averages out to 318 bytes per hour, a DRAMATIC reduction.

**Fewer handshakes and longer sessions**
When a device initially connects to the Particle cloud it has to perform a handshake to set up the encryption. The handshake is always big compared to the stream messages, multiple kilobytes for both the Photon and the Electron. However, we can control how often handshakes happen.

With TCP on the Photon, a handshake must happen for every newly opened connection. A Photon that goes to sleep for an hour, wakes up to read its sensors each hour, and publishes the accumulated data every 6 hours will have to handshake every 6 hours when it connects to the cloud.

On the Electron we use UDP, which is connection-less. An Electron can go to sleep, wake up sometime later, and talk to the Particle cloud without performing a handshake, continuing to use the DTLS session credentials it previously established. We currently require an Electron to handshake at least once per week, and this is subject to change. The data usage of handshakes is thus dramatically reduced from hundreds of KB per week for sleepy Photons to a few KB per week for sleepy Electrons.

## The structure of data transmission
When data is sent to or from the device, it comes with a fixed overhead. This includes the [User Datagram Protocol (UDP)](https://en.wikipedia.org/wiki/User_Datagram_Protocol#Packet_structure) header, the Datagram Transport Layer Security (DTLS) header, and an acknowledgement message (ACK). The UDP header is necessary because specifies where the packet came from and where it's going, and that adds 26 bytes to a message. Without the DTLS header we couldn't encrypt your data, and that's an additional 27 bytes. Finally, the ACK is a very short message back from the Cloud with its own UDP and DTLS headers which acts as a receipt and confirms that a message was received, and adds around 61 bytes. For a very short Particle.publish you're looking at a total of nearly 128 bytes, mostly comprised of infrastructure.

## What consumes data?
Any time the Electron talks to the Internet or the Internet talks back,
that data travels though the cellular network and is metered. There's
also unavoidable overhead on all communications because of the structure
of the Internet and the necessity of security and reliability. Many of
these communications are intentional and obvious, like calling
Particle.publish() or flashing code over the air. There are other
communications that you may not even be aware of. For instance, when an
Electron turns on or is reset it has to register with the cell towers
and the Particle Device Cloud, and this set of messages can use as much as 6KB! The following all use data:

**Functions from or registered by firmware:**
- Publish (smallest communication)
- Function calls from the API
- Variable calls from the API
- Subscribe to events or webhook response
- Direct network connections through `TCPServer/TCPClient/UDP`

**Background connectivity:**
- Pings (once every 23 minutes if no other communications happen and device is awake. 122 bytes)
- Handshakes (whenever the device comes online, and once a week. up to 6kB) 

**Flashing code:**
- Flashing code over the air (try [flashing code via USB instead!](/guide/tools-and-features/cli/electron/#flashing-over-serial-for-the-electron))

**Starting a connection:**
Whenever the Electron has to join the cellular network it will "handshake" and register itself and your functions and variables.
- Startup
- Reset
- Wake from deep sleep
- Wake from stop mode
- Cellular modem is turned off and on again

**Tinker App:**
Our friend Tinker also consumes data! Calling digital and analog read/writes use the API to talk to the Electron, and it has to reply. Use sparingly and you'll be fine. 
- All functions of Tinker (digital I/O, analog I/O)

**Libraries: HTTPClient, MQTT, etc:**
Whenever you use a library that talks over the network you'll use data. A lot of data. We highly recommend that you do **NOT** use these with the Electron, as they will use data much more quickly than Particle publishes and functions.

## What if I run out?
If you reach your data limit and want to keep your device online, just hop over to the [Console](https://console.particle.io/) and increase the limit. It will automatically unpause and you'll be back online in a few minutes. We highly recommend that you set a high limit for critical applications.

Your application will be stuck in a connecting loop if you haven't written code specifically for offline behavior, so plan ahead! You can use System Modes like `MANUAL` and `SEMIAUTOMATIC` to directly control connection activity. In later versions of Electron firmware you can also enable multi-threading so that connection attempts will not block your application code.

## Ways to reduce data use
There are lots of things you can do to save data! We'll go through these in order of increasing complexity.

**Use Shorter Names** This applies to Particle.publish, .variable, and .function. Those longer names have to be sent to/from the cloud, so you're much better off using `Particle.publish("x")` than `Particle.publish("xylophone_is_now_playing_a_song")`.

**Use Serial() for Development** When you're first testing and debugging your code, you can avoid costly and embarrassing runaway data publishing scenarios by sending sensor readings, alerts, etc over a USB cable. Comment out your `Particle.publish()` line, add `Serial.begin(9600);` to `setup()` and instead use `Serial.println(your_data_here")` to log data out to a serial terminal. You can use [Particle Dev](https://www.particle.io/dev), the Arduino IDE, `screen` or any other terminal program. Find out more in the [Serial reference](/reference/firmware/electron/#serial)

**Event-Driven Publishing** One of the very common structures we see in code is a loop() with a sensor reading, then a publish and delay. This calls the publish (and uses data) at some regular interval, but the data being reported may not have changed! Picture a temperature sensor in your yard- the temperature is unlikely to have changed much after 1 second, 1 minute, or even 10 minutes. The data-efficient thing to do is to save the temperature you last published and compare the current reading to that previous one. If it's more than a few degrees different, then publish the new one.

```
// We're also using absolute value here, so may need to #include "math.h"
if(abs(temperature-lastTemperature)>5){
	Particle.publish("T",temperature);
}
```

**Combining Publishes** Are you sending data that isn't time-critical? Consider combining many data points into a single publish. Instead of using the 100+ bytes of overhead for every data point, you'll only use it once and save a ton! Sample the data based on change or frequency, store them in a string or array, and then send them out as one publish when you've collected as many as you want (or fit in the 255 byte data field of a Particle.publish). We often add commas between data points so they're easy to separate.

```
Particle.publish("T", String::format("%d,%d,%d,%d,%d", temperatures[0],temperatures[1],temperatures[2],temperatures[3],temperatures[4]));
```

We're also working on a new kind of Particle.publish that will do this for you automatically!

**On-Device Logic** Most of the behaviors you'd like to implement can live right on the Electron. For example, if you have a greenhouse with a motorized vent, and you want the vent to turn on if the temperature exceeds a user-set threshold, then there are two options. You could send the temperature reading to the cloud from time to time, compare the reading to the threshold, and have the cloud control the vent via a function if the temp is above the threshold. This is much, much less data efficient than using a function to set the threshold on the device when necessary, and otherwise keeping the logic and control entirely on the device. This has the added benefit of being more reliable in the event of a connectivity outage.

**Being "Sleepy"** When your Electron is asleep you won't use pings and power consumption will be much lower! For now, hop over to the firmware reference and read about [sleep](/reference/firmware/electron/#sleep-sleep-). 


