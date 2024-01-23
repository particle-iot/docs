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

## Network class

Most features are implemented in the `Network` class. This section will be part of the [Device OS firmware API reference](https://docs.particle.io/reference/device-os/api/network/network/) when released, but is included here for pre-release.



## Network

The `Network` class can be used instead of `Cellular` or `WiFi` and represents the set of features common across all supported networking types: Cellular, Wi-Fi, and Ethernet. 

There are two common uses for this:

- When you have code that runs on both Wi-Fi and Cellular devices, and you want to work automatically with the default network interface without having to use `#ifdef`.
- When you are writing a library or module within a large application and want to be able to work with a specific interface that is decided on by the caller.

```cpp
// EXAMPLE
#include "Particle.h"

SYSTEM_THREAD(ENABLED);
SerialLogHandler logHandler;

class ExampleModule {
public:
    ExampleModule &withNetwork(NetworkClass &network) {
        this->network = network;
        return *this;
    }

    void setup() {        
    }

    void loop() {
        bool ready = network.ready();
        if (ready != lastReady) {
            lastReady = ready;
            Log.info("ready=%d", (int) ready);
        }
    }

    NetworkClass &network = Network;
    bool lastReady = false;
};
ExampleModule exampleModule;

void setup() {
    exampleModule
        .withNetwork(Ethernet)
        .setup();
}

void loop() {
    exampleModule.loop();
}

```

This example prints when the network changes to or from ready state. By default, it uses `Network`, the default networking for this device. However, the caller can use the `withNetwork()` method to pass in a different network. In this example, it changes the behavior to monitor the `Ethernet` network instead.

When using the switchable network, it uses `network` (lowercase, the member variable), instead of `Network` (default interface), or a specific interface like `Cellular` or `WiFi`.

### on() [Network]

{{api name1="Network.on"}}

`Network.on()` turns on the the default network interface for this device, typically Cellular or Wi-Fi.

Note that `Network.on()` does not need to be called unless you have changed the [system mode](#system-modes) or you have previously turned the network off.

### off() [Network]

{{api name1="Network.off"}}

```cpp
// EXAMPLE:
Particle.disconnect();
Network.off();
```

`Network.off()` turns off the default network interface for this device, typically Cellular or Wi-Fi.

You must call [`Particle.disconnect()`](#particle-disconnect-) before turning off the network manually, otherwise the cloud connection may turn it back on again.

This should only be used with [`SYSTEM_MODE(SEMI_AUTOMATIC)`](#semi-automatic-mode) (or `MANUAL`) as the cloud connection and Wi-Fi are managed by Device OS in `AUTOMATIC` mode.


### connect() [Network]

{{api name1="Network.connect"}}

Attempts to connect to default network interface for this device, typically Cellular or Wi-Fi. 

For Wi-Fi devices, if there are no credentials stored, this will enter listening mode, blinking dark blue. If there are credentials stored, this will try the available credentials until connection is successful. When this function returns, the device may not have an IP address on the LAN; use `Network.ready()` to determine the connection status.

```cpp
// SYNTAX
Network.connect();
```

On Gen 3 devices (Argon, Boron, B Series SoM, and Tracker), prior to Device OS 2.0.0, you needed to call `WiFi.on()` or `Cellular.on()` before calling `Particle.connect()`. This is not necessary on Gen 2 devices (any Device OS version) or with 2.0.0 and later.

On the Argon, starting with Device OS 1.5.0, a quick Wi-Fi scan is done before connecting. The list of available networks is compared with the configured SSIDs. The access point with the strongest signal is connected to. Prior to 1.5.0, only the original access point BSSID that was configured would ever be connected to, even if there was a different access point on the same SSID and network with a stronger signal.

### disconnect() [Network]

{{api name1="Network.disconnect"}}

Disconnects from the network, but leaves the network module on.

```cpp
// SYNTAX
Network.disconnect();
```

### connecting() [Network]

{{api name1="Network.connecting"}}

This function will return `true` once the device is attempting to connect, and will return `false` once the device has successfully connected to the network.

```cpp
// SYNTAX
Network.connecting();
```

### ready() [Network]

{{api name1="Network.ready"}}

This function will return `true` once the device is connected to the network. Otherwise it will return `false`.

```cpp
// SYNTAX
Network.ready();
```

### setConfig() [Network]

{{api name1="Network.setConfig"}}

{{since when="5.3.0"}}

Set a [`NetworkInterfaceConfig`](#networkinterfaceconfig) for a generic network interface on the Argon, P2, and Photon 2 running Device OS 5.3.0 or later. This can be used with Ethernet and WiFi. This is used to set a static IP address or restore DHCP addressing (the default).

```cpp
// PROTOTYPE
int setConfig(const particle::NetworkInterfaceConfig& conf);

// EXAMPLE
Network.setConfig(NetworkInterfaceConfig()
  .source(NetworkInterfaceConfigSource::STATIC)
  .address({192,168,1,20}, {255,255,255,0})
  .gateway(SockAddr({192,168,1,1}))
  .dns(SockAddr({192,168,1,1})));
```

### getConfig() [Network]

{{api name1="Network.getConfig"}}

{{since when="5.3.0"}}

Get the current [`NetworkInterfaceConfig`](#networkinterfaceconfig) for a generic network interface interface on the Argon, P2, and Photon 2 running Device OS 5.3.0 or later. This can be used with Ethernet and WiFi.

```cpp
// PROTOTYPE
particle::NetworkInterfaceConfig getConfig(String profile = String()) const;
```


### listen() [Network]

{{api name1="Network.listen"}}

This will enter or exit listening mode, blinking dark blue. The cloud connection is not available in listening mode.

```cpp
// SYNTAX - enter listening mode
Network.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
Network.listen(false);

```



### listening() [Network]

{{api name1="Network.listening"}}

```cpp
// SYNTAX
Network.listening();
```

Returns true if the device is in listening mode (blinking dark blue). 

This is only relevant when using `SYSTEM_THREAD(ENABLED)`. When not using threading, listening mode stops 
user firmware from running, so you would not have an opportunity to test the value and calling this always 
returns false.


### setListenTimeout() [Network]

{{api name1="Network.setListenTimeout"}}

{{since when="0.6.1"}}

```cpp
// SYNTAX
Network.setListenTimeout(seconds);
```

`Network.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout. This function is rarely needed.


```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(Network.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}

void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) Network.setListenTimeout(0); // disables the listening mode timeout
}
```

{{since when="1.5.0"}}

You can also specify a value using [chrono literals](#chrono-literals), for example: `Network.setListenTimeout(5min)` for 5 minutes.



### getListenTimeout() [Network]

{{api name1="Network.getListenTimeout"}}

{{since when="0.6.1"}}

```cpp
// SYNTAX
uint16_t seconds = Network.getListenTimeout();
```

`Network.getListenTimeout()` is used to get the timeout value currently set for Listening Mode. Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled. This function is rarely needed.


## Cloud functions

This section will be updated in the [Device OS firmware API reference](/reference/device-os/api/cloud-functions/particle-connect/) when released.

### Particle.connect()

{{api name1="Particle.connect"}}

`Particle.connect()` connects the device to the Cloud. This will automatically activate the network connection and attempt to connect to the Particle cloud if the device is not already connected to the cloud.

```cpp
void setup() {}

void loop() {
  if (Particle.connected() == false) {
    Particle.connect();
  }
}
```

After you call `Particle.connect()`, your loop will not be called again until the device finishes connecting to the Cloud. Typically, you can expect a delay of approximately one second.

In most cases, you do not need to call `Particle.connect()`; it is called automatically when the device turns on. Typically you only need to call `Particle.connect()` after disconnecting with [`Particle.disconnect()`](#particle-disconnect-) or when you change the [system mode](#system-modes).

Connecting to the cloud does not use Data Operation from your monthly or yearly quota. However, for cellular devices it does use cellular data, so unnecessary connection and disconnection can lead to increased data usage, which could result in hitting the monthly data limit for your account.

On Gen 3 devices (Argon, Boron, B Series SoM, and Tracker), prior to Device OS 2.0.0, you needed to call `WiFi.on()` or `Cellular.on()` before calling `Particle.connect()`. This is not necessary on Gen 2 devices (any Device OS version) or with 2.0.0 and later.

{{since when="5.6.0"}}

In Device OS 5.6.0 and later you can choose which interface to connect to. Normally you should use [automatic connection management](/reference/device-os/connection-management/), but in special cases you can force a specific interface to be used:

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
