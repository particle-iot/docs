---
title: Connection management
columns: two
layout: commonTwo.hbs
description: Connection management
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
Connection management is in development and APIs may change in future versions of Device OS.
{{box op="end"}}

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

The following sections will be added to the Device OS firmware API reference when this feature is publicly released.


## Network class

Most features are implemented in the `Network` class. This section will be part of the [Device OS firmware API reference](https://docs.particle.io/reference/device-os/api/network/network/) when released, but is included here for pre-release.

### Network.prefer()

{{api name1="Network.prefer"}}

{{since when="5.7.0"}}

You should normally let automatic connection management handle which network interface to use. There are `prefer()` methods in the `Cellular`, `WiFi`, and `Ethernet` classes that can be used if you have a need to steer the connection management toward a specific interface.

- The automatic connection management rules still apply when preferring an interface.
- The preference only determines which to use if multiple interfaces are available. It will not force connection to a non-available interface.
- Setting a preference does not affect an immediate change if the cloud is currently connected. It will only be consulted on the next automatic connection management which typically occurs after the cloud disconnects.
- Only one network type can be preferred, setting `WiFi.prefer()` will clear `Cellular.prefer()` for example.
- Setting `Network` as the preferred interface will clear other preferences such as `WiFi` and `Cellular`.

```cpp
// PROTOTYPE
virtual NetworkClass& prefer(bool prefer = true);

// EXAMPLE - Enable automatic connection management (disable other preferences)
Network.prefer();
```

### Network.isPreferred()

{{api name1="Network.isPreferred"}}

{{since when="5.6.0"}}

Returns true if automatic connection management is in use, which is to say that no other interfaces such as `WiFi` and `Cellular` have been selected as preferred.

```cpp
// PROTOTYPE 
virtual bool isPreferred();

if (Network.isPreferred()) {
    // Automatic connection management is enabled
}
```


## Cloud functions

This section will be updated in the [Device OS firmware API reference](/reference/device-os/api/cloud-functions/particle-connect/) when released.

### Particle.connect()

{{since when="5.6.0"}}

In Device OS 5.6.0 and later you can choose which interface to connect to. Normally you should use [automatic connection management](/reference/device-os/connection-management/), but in special cases you can force a specific interface to be used.

{{box op="start" cssClass="boxed warningBox"}}
Specifying an interface with `Particle.connect()` will only connect to that interface with no fallback to other interfaces, and is not recommended in most cases.
{{box op="end"}}

```cpp
// PROTOTYPE
static void connect(const spark::NetworkClass& network = spark::Network);

// EXAMPLES
Particle.connect(WiFi);
Particle.connect(Ethernet);
Particle.connect(Cellular);
```

### Particle.connectionInterface()

{{api name1="Particle.connectionInterface"}}

{{since when="5.6.0"}}

Returns the current interface used for the Particle cloud connection in Device OS 5.6.0 and later.

```cpp
// PROTOTYPE
spark::NetworkClass& connectionInterface();

// EXAMPLE
if (Particle.connectionInterface() == WiFi) {
	// WiFi
} else if (Particle.connectionInterface() == Cellular) {
	// Cellular
} else if (Particle.connectionInterface() == Network) {
	// Generic
}

```

### Particle.disconnect()

{{since when="5.6.0"}}

[Automatic connection management](/reference/device-os/connection-management/) occurs on the next connection following a disconnection 
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


## Cellular

This section will be updated in the [Device OS firmware API reference](/reference/device-os/api/cellular/cellular/) when released.

### Cellular.prefer()

{{api name1="Cellular.prefer"}}

{{since when="5.7.0"}}

You should normally let [automatic connection management](/reference/device-os/connection-management/) handle which network interface to use.

In some cases you may want to prefer cellular, Wi-Fi, or Ethernet, and this can be done using the API. Note however:

- The automatic connection management rules still apply.
- The preference only determines which to use if multiple interfaces are available. It will not force connection to a non-available interface.
- Setting a preference does not affect an immediate change if the cloud is currently connected. It will only be consulted on the next automatic connection management which typically occurs after the cloud disconnects.
- Only one network type can be preferred, setting `Cellular.prefer()` will clear `WiFi.prefer()` for example.

```cpp
// PROTOTYPE
virtual NetworkClass& prefer(bool prefer = true);

// EXAMPLE - enable prefer cellular
Cellular.prefer();

// EXAMPLE - disable prefer cellular
Cellular.prefer(false);
```

### Cellular.isPreferred()

{{api name1="Cellular.isPreferred"}}

Returns true if the preferred network interface is cellular. This only indicates that the interface has been preferred and 
does not reflect what interface is in use.

```cpp
// PROTOTYPE 
virtual bool isPreferred();

if (Cellular.isPreferred()) {
    // Do something here
}
```


## WiFi

This section will be updated in the [Device OS firmware API reference](https://docs.particle.io/reference/device-os/api/wifi/wifi/) when released.

### WiFi.prefer()

{{api name1="WiFi.prefer"}}

{{since when="5.7.0"}}

You should normally let [automatic connection management](/reference/device-os/connection-management/) handle which network interface to use.

In some cases you may want to prefer cellular or Wi-Fi, and this can be done using the API. Note however:

- The automatic connection management rules still apply.
- The preference only determines which to use if multiple interfaces are available. It will not force connection to a non-available interface.
- Setting a preference does not affect an immediate change if the cloud is currently connected. It will only be consulted on the next automatic connection management which typically occurs after the cloud disconnects.
- Only one network type can be preferred, setting `WiFi.prefer()` will clear `Cellular.prefer()` for example.

```cpp
// PROTOTYPE
virtual NetworkClass& prefer(bool prefer = true);

// EXAMPLE - enable prefer Wi-Fi
WiFi.prefer();

// EXAMPLE - disable prefer Wi-Fi
WiFi.prefer(false);
```

### WiFi.isPreferred()

{{api name1="WiFi.isPreferred"}}

Returns true if the preferred network interface is Wi-Fi. This only indicates that the interface has been preferred and 
does not reflect what interface is in use.

```cpp
// PROTOTYPE 
virtual bool isPreferred();

if (WiFi.isPreferred()) {
    // Do something here
}
```



## Ethernet

This section will be updated in the [Device OS firmware API reference](/reference/device-os/api/ethernet/ethernet/) when released.

### Ethernet.prefer()

{{api name1="Ethernet.prefer"}}

{{since when="5.7.0"}}

You should normally let [automatic connection management](/reference/device-os/connection-management/) handle which network interface to use.

In some cases you may want to prefer cellular or Wi-Fi, and this can be done using the API. Note however:

- The automatic connection management rules still apply.
- The preference only determines which to use if multiple interfaces are available. It will not force connection to a non-available interface.
- Setting a preference does not affect an immediate change if the cloud is currently connected. It will only be consulted on the next automatic connection management which typically occurs after the cloud disconnects.
- Only one network type can be preferred, setting `Ethernet.prefer()` will clear `Cellular.prefer()` for example.

```cpp
// PROTOTYPE
virtual NetworkClass& prefer(bool prefer = true);

// EXAMPLE - enable prefer Ethernet
Ethernet.prefer();

// EXAMPLE - disable prefer Ethernet
Ethernet.prefer(false);
```

### Ethernet.isPreferred()

{{api name1="Ethernet.isPreferred"}}

Returns true if the preferred network interface is Ethernet. This only indicates that the interface has been preferred and 
does not reflect what interface is in use.

```cpp
// PROTOTYPE 
virtual bool isPreferred();

if (Ethernet.isPreferred()) {
    // Do something here
}
```


