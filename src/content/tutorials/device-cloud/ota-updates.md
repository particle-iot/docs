---
word: OTA
title: OTA Firmware Updates
order: 1
shared: true
columns: two
layout: tutorials.hbs
---

# {{title}}

**Over-the-air (OTA) firmware updates** are a vital component of any IoT
system. Over-the-air firmware updates refers to the practice of remotely
updating the code on an embedded device.

<img src="/assets/images/ota-updates/ota-update-hero.png"/>
<p class="caption">Particle's all-in-one IoT platform offers industry
leading OTA update capabilities</p>

The value of incorporating OTA update capabilities into a connected
product cannot be understated, and include:
- The ability to add **new software features** to a product after a device has been
  deployed in the field to improve functionality over time
- Opportunity to **rapidly respond to bugs and security
  vulnerabilities** without the need for physical recalls of devices or truck rolls
- Ensuring **embedded developers can quickly and seamlessly prototype** new versions of
  device firmware to decrease innovation cycles


## OTA Updates with Particle

Particle's platform is uniquely positioned to provide industry-leading
OTA update capabilities for embedded devices. Using Particle for OTA
updates give you the following benefits:

### A Complete Solution

A successful OTA update requires complex coordination between IoT hardware,
device firmware, network connectivity, and an IoT device cloud. Trust
us, this is a _very hard problem_ to solve correctly.

Lucky for you and your team, this is where Particle's fully integrated IoT platform shines.
These four parts of the "IoT stack" are core pillars of Particle's
platform, and enable you to seamlessly
deliver OTA updates to devices at any scale.

<img src="/assets/images/ota-updates/device-to-cloud.png"
class="full-width"/>

- **Hardware**: All Particle dev kits and systems-on-a-module (SoMs) support
OTA updates right out of the box. Device and cloud-side safeguards
are combined to ensure that devices only receive compatibile firmware that
can run on its unique hardware platform.

- **Device OS**: Our embedded operating system which runs on all
Particle devices, Device OS, is architected to reliably and resiliently
accept firmware updates from the Device Cloud.

- **Connectivity**: OTA updates work seamlessly
across Particle's suite of connectivity offerings. Devices connecting
over Wi-Fi, Cellular, and even via a Mesh network can receive firmware
updates using our OTA feature set.

- **Device Cloud**: The Device Cloud tightly integrates with Device OS
to safely and effectively deliver OTA updates. It also provides a
variety of flexible management tools to choose how OTA updates should be applied
based on your needs.

In fact, **one must have
visibility and control over all four of these components of an IoT
system to successfully deliver an OTA update**. Without any one of these
parts, or the integration of these parts, an OTA is not possible.

Other IoT platforms may market an OTA
feature, but in reality only provide a small sliver of the functionality required
perform a complete, reliable, and secure update -- leaving your team to
piece together a bespoke solution that distracts from time and effort
spent on what makes your IoT product unique.

### Reliable and Resilient

Sending an OTA update is arguably one of the riskiest
actions you can take on a connected device. Mishandling OTA updates could
at a minimum cause temporary disruption, or at worst force the device
into an unrecoverable state.

Particle's OTA updates have been built from the ground up to be
reliable and resilient to allow your team to deploy quickly while
keeping your fleet functioning healthily:

- **Atomic updates**: A Particle device will only run a new version of
  firmware it has received after empirically verifying that it has
successfully received the entire file with the cloud.

- **Automatic rollbacks**: If for some reason an OTA is interrupted (like a disruption
in connectivity or a device losing power), the device will fail
gracefully by automatically reverting to the previous version of working firmware.

- **Minimal disruption**: A Particle device continues to run its current
version of firmware while it receives an OTA update. After a brief
reset, the device seamlessly begins running the new firmware.

- **Application and Device OS version management**: Particle's OTA
capabilities make it easy to manage _both_ the firmware applications
your team writes, _and_ the low-level Device OS that Particle manages.
This lets you send updates to your device logic, but also enables you to
stay up-to-date with the latest features and improvements in Device OS.

### Secure

Given the risk associated with an OTA update, it is especially critical
that these updates are performed securely and safely.

- **Encrypted communications**: All messages between Particle devices and the
Device Cloud are always encrypted, including firmware files. This
eliminates potential man-in-the-middle attacks that seek to send
fraudulent firmware to the device.

- **Sender verifiecation**: Every OTA update attempt is first verified to ensure the identity
of the sender is an approved device manager.

### Scalable

Particle provides your team with tools as part of the Device Cloud that give
you full control and flexibility in how OTA updates are delivered to
your fleet. Particle offers different OTA tools that are appropriate at
different phases of fleet growth.

#### Prototyping

When prototyping, you want to enable your development team with the
ability to iterate quickly to provide viability and value in as little
time as possible.

Particle's **single device OTA** functions helps enable your embedded
development team to rapidly prototype and innovate. OTA updates can be
sent with a click of a button in our IDEs (available both in
[Workbench](https://www.particle.io/workbench/) and our [Web
IDE](https://build.particle.io)), our via our developer-approved [REST
API](https://docs.particle.io/reference/device-cloud/api/).

#### Moving to Production

As you begin to deploy large numbers of devices, it is imperative to
have the ability to safely batch OTA update many devices at a time. This
is what allows you to roll out new software features, fix bugs, or patch
security holes across your fleet.

For this purpose, Particle offers **fleet-wide OTA updates**. A variety
of tools are available in the Particle Console to apply fleet-wide
updates without sacrificing fine-grained control.
- **Firmware releases**: Cut a version of firmware that will be
automatically sent to your fleet, with sensible safeguards to roll out
an update responsibly.
- **Release by device groups**: Target a subset of your fleet to receive a new
version of firmware. Useful when your product has variants
that require different device behaviors, or when wanting to phase out a
single release over time to reduce risk.
- **Immediate firmware releases**: Instead of waiting for devices to
re-connect to receive an update, push a fleet-wide update out immediately.

## Single Device OTA
// TODO

## Fleet-wide OTA
// TODO
