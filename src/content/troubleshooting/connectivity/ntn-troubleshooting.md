---
title: NTN (satellite) troubleshooting
layout: commonTwo.hbs
description: NTN (satellite) troubleshooting
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary note and is subject to change.
{{box op="end"}}

NTN (satellite) provides an alternate connection method when cellular or Wi-Fi connectivity is not available, but there are a number of constraints to keep in mind.

## NTN background

Non-Terrestrial Network (NTN) is a 3GPP standard to allow devices to connect to satellites instead of earth-based cellular towers. It is based on narrowband cellular standards to allow for relatively straightforward inclusion in devices like the Particle M635e M-SoM, which implements it using the Quectel BG95-S5 cellular and NTN modem.

Using a non-terrestrial network allows devices to communicate in locations that do not have cellular infrastructure. 

Even though NTN devices are based on cellular standards, there are differences that require specialized hardware and software.

- NTN networks use different, dedicated bands:
  - n255: L-Band, 1.6 GHz
  - n256: S-Band, 2.0 GHz
- Regulatory and certification differences
- Data rate limitations

## General requirements

### Clear view of sky required

For all practical purposes, this requires the antenna being outside, and not under tree cover or obstructed by nearby tall buildings.

![Clear view of sky](/assets/images/m-series/location-good.png)

You will not be able to connect with the antenna inside a building, inside a vehicle, or inside an enclosure such as a trailer, shipping container, equipment cabinet, etc..

In general, even putting the antenna in a window will not be sufficient to connect to NTN.

![Bad locations](/assets/images/m-series/location-bad.png)


### Antenna requirements

NTN requires a special antenna that is different than the standard Particle LTE antenna. The Particle NTN antenna connects to the same connector as the LTE antenna, and works for both LTE and NTN, so each device will only need a single antenna for both cellular and NTN, however.

Depending on application, you may also need a GNSS antenna and/or Wi-Fi/BLE antenna.

### Location or GNSS required

In order to register with the NTN provider, geographic coordinates of the device are required. Since the M635e includes built-in GNSS capabilities, this the most common solution, though the coordinates can also be set manually.

This is required for regulatory reasons, as well as network demand management.

The NTN provider can detect if a device is in a location significantly different than the submitted location, and may ban your device from the network if detected.

### Not for use while in motion

NTN is only available in fixed locations and may not be used in moving vehicles.

The NTN provider can detect if your data packet transmission locations are frequently changing and could ban your device from the network if detected.


### Data limitations

NTN has limits significantly lower than cellular. In particular:

- Packet size: The amount of data in each transmission is limited to around 50 bytes
- Packet rate: You are limited to sending one packet of data every 2 to 3 minutes
- Latency: Each packet will take 5 to 10 seconds to transmit and be received

Because of these limitations, devices will not automatically switch Particle.publish to use NTN. Likewise, it is not possible to do a remote firmware update (OTA) over NTN networks, nor can you use Particle.subscribe, Particle.function, or direct TCP/IP access (TCP or UDP) over NTN.

### Carrier restrictions

Because both the cellular/NTN module (Quectel BG95-S5) and the device the module is embedded in (Particle M635e) must be certified by the NTN provider, it is not possible to swap to a different NTN provider, even though the M635e includes a programmable e-sim.

