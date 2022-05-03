---
title: Device OS API - Mesh
layout: reference.hbs
columns: three
description: Reference for discontinued Mesh features
---

Device OS API - Mesh
==========

## Mesh

**The mesh networking features described in this section is only available in Device OS 0.9.0 to 1.5.4.**

It is discontinued in 2.0.0 and later but the API for compatible versions is included below.

See [mesh deprecation](/reference/discontinued/hardware/mesh/) for more information.

### publish()

On Mesh devices, there are two publish options: Particle.publish and Mesh.publish:

- Particle.publish communicates by the cloud. It's used when interacting with an external web service (webhooks, server-sent-events, or rules engine), a classic device (Photon or Electron), or across different mesh networks.
- Mesh.publish communicates locally within a Mesh network. It is faster and does not send data across the Internet, but can only communicate between Mesh devices (Argon, Boron, Xenon) that are on the same Mesh network in the same location. 

The publish function takes two parameters:

* name (1–63 ASCII characters)

**Note:** Only use letters, numbers, underscores, dashes and slashes in event names. Spaces and special characters may be escaped by different tools and libraries causing unexpected results.

* optional data (up to 255 bytes)


```cpp
// SYNTAX
Mesh.publish(const char *name, const char *data);
```

**Returns:**
An `int` indicating the result. (0 = success, non-zero = system error code)

```cpp
// EXAMPLE USAGE
Mesh.publish("motion-sensor", "living room");
```

Note that the return value for Mesh.publish is 0 (`SYSTEM_ERROR_NONE`) for success, where the return value for Particle.publish is true (1) for success.

### subscribe()

Mesh.subscribe subscribes to events within the Mesh network. Like Particle.subscribe, the event name is a prefix, matching any event that begins with that name. You can have up to 5 mesh subscription handlers.

```cpp
LogHandler logHandler;

void myHandler(const char *event, const char *data)
{
  Log.info("topic=%s data=%s", event, data);
}

void setup()
{
  Mesh.subscribe("motion-sensor", myHandler);
}
```

The return value is an int (integer), `SYSTEM_ERROR_NONE` if successful or `SYSTEM_ERROR_NO_MEMORY` if there are no slots left. This is different from Particle.subscribe which returns a bool (boolean).


### on()

`Mesh.on()` turns on the Mesh module. Useful when you've turned it off, and you changed your mind.

Note that `Mesh.on()` does not need to be called unless you have changed the [system mode](/cards/firmware/system-modes/system-modes/) or you have previously turned the Mesh module off.

### off()

`Mesh.off()` turns off the Mesh module. 
 
### connect()

Attempts to connect to the Mesh network. If there are no credentials stored, this will enter listening mode. When this function returns, the device may not have an IP address on the LAN; use `Mesh.ready()` to determine the connection status.

```cpp
// SYNTAX
Mesh.connect();
```

### disconnect()

Disconnects from the Mesh network, but leaves the Mesh module on.

```cpp
// SYNTAX
Mesh.disconnect();
```

### connecting()

This function will return `true` once the device is attempting to connect using stored credentials, and will return `false` once the device has successfully connected to the Mesh network.

```cpp
// SYNTAX
Mesh.connecting();
```

### ready()

This function will return `true` once the device is connected to the network and has been assigned an IP address, which means that it's ready to open TCP sockets and send UDP datagrams. Otherwise it will return `false`.

```cpp
// SYNTAX
Mesh.ready();
```

### listen()

This will enter or exit listening mode, which opens a Serial connection to get Mesh credentials over USB, and also listens for credentials over
Bluetooth.

```cpp
// SYNTAX - enter listening mode
Mesh.listen();
```

Listening mode blocks application code. Advanced cases that use multithreading, interrupts, or system events
have the ability to continue to execute application code while in listening mode, and may wish to then exit listening
mode, such as after a timeout. Listening mode is stopped using this syntax:

```cpp

// SYNTAX - exit listening mode
Mesh.listen(false);

```



### listening()

```cpp
// SYNTAX
Mesh.listening();
```

This command is only useful in connection with `SYSTEM_THREAD(ENABLED)`, otherwise it will always return `false`, because listening mode blocks application code.
With a dedicated system thread though `Mesh.listening()` will return `true` once `Mesh.listen()` has been called
or the MODE button has been held for 3 seconds, when the RGB LED should be blinking blue.
It will return `false` when the device is not in listening mode.

### setListenTimeout()

```cpp
// SYNTAX
Mesh.setListenTimeout(seconds);
```

`Mesh.setListenTimeout(seconds)` is used to set a timeout value for Listening Mode.  Values are specified in `seconds`, and 0 disables the timeout.  By default, Mesh devices do not have any timeout set (seconds=0).  As long as interrupts are enabled, a timer is started and running while the device is in listening mode (Mesh.listening()==true).  After the timer expires, listening mode will be exited automatically.  If Mesh.setListenTimeout() is called while the timer is currently in progress, the timer will be updated and restarted with the new value (e.g. updating from 10 seconds to 30 seconds, or 10 seconds to 0 seconds (disabled)).  
**Note:** Enabling multi-threaded mode with SYSTEM_THREAD(ENABLED) will allow user code to update the timeout value while Listening Mode is active.

```cpp
// EXAMPLE
// If desired, use the STARTUP() macro to set the timeout value at boot time.
STARTUP(Mesh.setListenTimeout(60)); // set listening mode timeout to 60 seconds

void setup() {
  // your setup code
}

void loop() {
  // update the timeout later in code based on an expression
  if (disableTimeout) Mesh.setListenTimeout(0); // disables the listening mode timeout
}
```

{{since when="1.5.0"}}

You can also specify a value using [chrono literals](/cards/firmware/chrono-literals/chrono-literals/), for example: `Mesh.setListenTimeout(5min)` for 5 minutes.


### getListenTimeout()

```cpp
// SYNTAX
uint16_t seconds = Mesh.getListenTimeout();
```

`Mesh.getListenTimeout()` is used to get the timeout value currently set for Listening Mode.  Values are returned in (uint16_t)`seconds`, and 0 indicates the timeout is disabled.  By default, Mesh devices do not have any timeout set (seconds=0).

### localIP()


`Mesh.localIP()` is used to get the ML-EID (Mesh-Local EID) IP address of the mesh node. This is an IPv6 address.

```cpp
// EXAMPLE
SerialLogHandler logHandler;

void setup() {
  Log.info("localIP: %s", Mesh.localIP().toString().c_str());
}
```

### selectAntenna()

{{since when="1.5.0"}}

Selects which antenna is used by the mesh radio stack. This is a persistent setting.

**Note:** On Gen 3 devices (Argon, Boron, Xenon), the mesh and BLE radio stacks share the same antenna and changing the antenna via `Mesh.selectAntenna()` also changes the antenna used by the BLE stack. SoM devices do not have an internal antenna.

```cpp
// Select the internal antenna
Mesh.selectAntenna(MeshAntennaType::INTERNAL);
// Select the external antenna
Mesh.selectAntenna(MeshAntennaType::EXTERNAL);
```

The following function can be used to select the external antenna in older versions of Device OS. Note that, in this case, the setting is not saved, and the Device OS will select the default internal antenna after a reset.

```cpp
void selectExternalMeshAntenna() {
#if (PLATFORM_ID == PLATFORM_ARGON)
    digitalWrite(ANTSW1, 1);
    digitalWrite(ANTSW2, 0);
#elif (PLATFORM_ID == PLATFORM_BORON)
    digitalWrite(ANTSW1, 0);
#elif (PLATFORM_ID == PLATFORM_XENON)
    digitalWrite(ANTSW1, 0);
    digitalWrite(ANTSW2, 1);
#endif
}
```
