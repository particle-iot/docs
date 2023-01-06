---
title: Mesh Deprecation
layout: commonTwo.hbs
columns: two
---

Particle Gen 3 devices (Argon, Boron, and Xenon) previously included support for Thread Mesh, a technology for short-range (10 meter) communication. 

Mesh networking and the Xenon have been discontinued.

| Date | Milestone |
| ---  | --- |
| March 2020 | Last Device OS release with mesh support (1.5.2) |
| April 30, 2020 | Last sale of Xenon devices<sup>1</sup> |
| June 30, 2020 | End of customer support for mesh <sup>2</sup> | 
| December 31, 2020 | Mobile apps, CLI, and cloud support for adding Xenons will be removed<sup>3</sup> |
| January 2021 | Console management of mesh network will be removed |

<sup>1</sup> Sales of Xenons will continue until April 30, 2020, or until supplies run out, whichever comes first.

<sup>2</sup> After June 30, 2020, support for mesh networks will only be available in the [community forums](https://community.particle.io).

<sup>3</sup> Mesh networks that have already been created will continue to function after December 31, 2020, however you will not be able to add any new devices to a mesh network.

## Questions and Answers

#### Does this affect my standalone Argon or Boron?

Argon, Boron, and B Series SoM devices will continue to be manufactured and sold. While you cannot use the Thread Mesh functionality after 2020, the primary network interface (Wi-Fi for Argon, cellular for Boron and B Series) will continue to be supported. BLE (Bluetooth LE) will continue to be supported as well.

After 2020 the mobile app support for creating mesh networks will be removed, so the mobile apps will always behave as if you answered "No" to the "Do you want to use this device in a mesh network" question.


#### What are my options for the Xenon?

- Xenons in the Ethernet FeatherWing will continue to work running Device OS 1.5.x or older.
- Xenons run in standalone mode to use BLE will continue to work running Device OS 1.5.x or older. You will need to program standalone Xenons over USB, not OTA.
- Already set up mesh networks will continue to work until a breaking change occurs in the cloud. We do not anticipate there being one, but cannot guarantee how long the network will continue to function. You will need to keep the Xenon running 1.5.x.
- Xenons can be reprogrammed to run [CircuitPython in standalone (no network) mode](/archives/xenon-circuit-python/).
- Xenons can be reprogrammed to be a standard nRF52840 board [using the nRD52 SDK](/reference/discontinued/hardware/xenon-nordic-sdk/). It can use a native Thread Mesh network in this mode, but will lose all Particle functionality.

#### What happens after Device OS 1.5.x?

Device OS 1.5.2 is the last version to contain Thread mesh networking support. After this release, there will not be any additional mesh-specific bug fixes or upgrades to the nRF52 Thread mesh networking stack.

Version 2.0.0 and later (there is no 1.6.x), have the ability to use a mesh network removed, and all Device OS API calls in the `Mesh` object have been removed.

It is possible to continue to use 1.5.x on Argon, Boron, and Xenon devices to continue to use Thread mesh networking features, however no new cloud or device OS features will be back-ported to 1.5.x.

#### What happens in March 2021?

By this time, support for creating mesh gateways on Argon and Boron devices will be removed from the mobile apps and CLI. It also will no longer be possible to add a Xenon to a mesh network. The features to manage mesh networks ("Networks" tab) in the console will be removed as well.

An existing mesh network will continue to function, however you will not be able to add devices to it after December 31, 2020.

There is no firm date to when these grandfathered mesh networks will cease to function. We do not intend to make any changes to cause them to cease to function, but at some point a breaking cloud-related change could cause them to stop working.

