---
title: Connection management
columns: two
layout: commonTwo.hbs
description: Connection management
---

# {{title}}

Connection management manages network connections across the three currently available network interfaces, depending on hardware available:

- Ethernet
- Wi-Fi
- Cellular

Connection management:

- Requires Device OS 5.6.0 or later, and some features require Device OS 5.7.0. 
- Is currently supported on M SoM devices.
- In the future will support management of Ethernet and another interface on Gen 3 devices (Boron, B SoM, and Argon) as well as P2 and Photon 2. 
- The Tracker SoM (also Tracker One and Monitor One) Wi-Fi interface can only be used for geolocation, not for connectivity.

## Automatic connection management

{{box op="start" cssClass="boxed warningBox"}}
It is recommended that you allow Device OS to manage the connection automatically. This is sufficient in 
most cases, however the APIs below are available for specific situations when necessary.
{{box op="end"}}

Automatic connection management occurs in two cases:

At boot, the first available interface of Ethernet, Wi-Fi, and cellular is attempted. This will typically provide the fastest time to cloud connection.

If the cloud connection is lost, all available network interfaces are checked to determine the best interface based on:

- Configured and link available
- Low packet loss
- Low latency

This process involves sending and receiving packets from the Particle cloud servers, and takes around 5 seconds.

Once an interface is selected it will continue to be used until the connection is lost again.

- Wi-Fi is only attempted if Wi-Fi credentials are configured.
- Ethernet is only attempted if the Ethernet interface detection is enabled (`System.enableFeature(FEATURE_ETHERNET_DETECTION)`) and there is an Ethernet link available (the port is connected to an Ethernet switch or hub).

## Connection preference

You can manually prefer one type of network interface.

- The automatic connection management rules still apply when preferring an interface.
- The preference only determines which to use if multiple interfaces are available. It will not force connection to a non-available interface.
- Setting a preference does not affect an immediate change if the cloud is currently connected. It will only be consulted on the next automatic connection management which typically occurs after the cloud disconnects.
- Only one network type can be preferred, setting WiFi.prefer() will clear Cellular.prefer() for example.

```cpp
// EXAMPLE - enable selecting a network preference (select only one)
Cellular.prefer();
WiFi.prefer();
Ethernet.prefer();

// EXAMPLE - disable selecting a network interface
Cellular.prefer(false);
WiFi.prefer(false);
Ethernet.prefer(false);
```

## Forcing automatic connection management

Automatic connection management occurs on the next connection following a disconnection 
from the Particle cloud. This happens automatically if the underlying network (cellular, Wi-Fi, or ethernet) becomes unavailable.

In some special cases you can manually disconnect to force automatic connection management. You should avoid doing this
frequently as the device will not have cloud connectivity during the disconnection, discovery, and reconnection process. It will also use
cellular data (but not data operations).

```cpp
// EXAMPLE
Particle.disconnect();
waitFor(Particle.disconnected, 10000);
Particle.connect();
```


## Device OS firmware API changes

You can find additional information in the [Device OS API reference](/reference/device-os/api/network/network/).

The `Network`, `Cellular`, `WiFi`, and `Ethernet` classes all implement APIs including `prefer()` and `isPreferred()` for manually preferring certain interfaces.

In the Cloud class, `Particle.connect()` and `Particle.disconnect()` have additional options for manual connection management.


