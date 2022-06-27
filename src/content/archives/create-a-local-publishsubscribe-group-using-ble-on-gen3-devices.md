---
title: Create a local publish/subscribe group using BLE on Gen3 devices
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## BLE\_Group library

Github link: <https://github.com/particle-iot/ble-group-library>

Community thread with some common questions: <https://community.particle.io/t/library-for-creating-a-local-group-of-devices-using-ble/54467>

A library that works with Particle Gen3 devices to create a local group over Bluetooth Low Energy (BLE) to publish/subscribe messages.

The library works by connecting the devices over BLE. One of the devices in the group acts in the Central role, while the others act in the Peripheral role.

Data is exchanged one to one from the Central to each Peripheral. However, when data is sent from a Peripheral to the Central, it both "consumes" the data locally, as well as forwarding the data to all the other Peripherals that it is connected with.

## [](https://github.com/particle-iot/ble-group-library#typical-usage)Typical Usage

You will need 2 or more devices. One will act as the Central, and the other(s) as Peripheral.

On the Central device:

```
#include "BLE_Group.h"
BLE_Group *group;

void callbackFunc(const char *event, const char *data)
{
  Log.info("Event: %s, Data: %s", event, data);
}

void setup() {
  group = new BLE_Group_Central(1); // The parameter is the groupID
  group->subscribe("test", callbackFunc);
}

void loop() {
  static uint32_t scan_time = millis();
  static uint32_t publish_time = millis();
  // Scan when the number of connected devices is less than the max
  if (group->devices_connected() < BLE_GROUP_MAX_PERIPHERALS && (millis() - scan_time) > 3000) { 
    group->scan(); 
    scan_time = millis(); 
  }
  // Publish every 10 seconds
  if (group->devices_connected() > 0 && (millis() - publish_time) > 10000) {
    group->publish("test-central", "Some data");
    publish_time = millis();
  }
}

```

On the peripheral device:

```
#include "BLE_Group.h"
BLE_Group *group;

void callbackFunc(const char *event, const char *data)
{
  Log.info("Event: %s, Data: %s", event, data);
}

void setup() {
  group = new BLE_Group_Peripheral(1); // The parameter is the groupID
  group->subscribe("test", callbackFunc);
}

void loop() {
  static uint32_t publish_time = millis();
  if ((millis() - publish_time) > 10000) {
    group->publish("test-periph", "Some Data");
    publish_time = millis();
  }
}

```

It is also possible to use the same application on the Central and Peripheral devices, and use configuration variables stored in EEPROM to decide which is which. The examples provided with the library show how to do that.

## [](https://github.com/particle-iot/ble-group-library#examples)Examples

* **Diagnostics:** Cloud-started throughput test, as well as reporting of group health by publishing Connect/Disconnect events
* **Heartbeat:** Each device in the group will publish a heartbeat once per minute. The other devices will all receive it and use Particle.publish to send to the Particle cloud
* **Ping-pong:** For just 2 devices (one Central and one Peripheral), send a number of events with small data payload back and forth and publish the total amount of time it took, to test message latency.
