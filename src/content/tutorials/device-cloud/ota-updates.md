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
- The opportunity to **rapidly respond to bugs and security
  vulnerabilities** without the need for physical recalls of devices or truck rolls
- Ensuring embedded developers can quickly prototype and seamlessly roll out
  new versions of device firmware, **speeding up innovation cycles**


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
parts, or the integration of these parts, an OTA update is not possible.

Other IoT platforms may market an OTA
feature, but in reality only provide a small sliver of the functionality required
perform a complete, reliable, and secure update — leaving your team to
piece together a bespoke solution that distracts them from spending valuable time
on the features that make your IoT product unique.

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
successfully received the entire file from the cloud. Additionally,
your firmware application can be updated independently of the Device OS.

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
You are in complete control of your adoption of Device OS versions.

### Secure

Given the risk associated with an OTA update, it is especially critical
that these updates are performed securely and safely.

- **Encrypted communications**: All messages between Particle devices and the
Device Cloud are always encrypted, including firmware files. This
eliminates potential man-in-the-middle attacks that seek to send
fraudulent firmware to the device.

- **Sender verification**: Every OTA update attempt is first verified to ensure the identity
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

Particle's **single device OTA** functions help enable your embedded
development team to rapidly prototype and innovate. OTA updates can be
sent with a click of a button in our IDEs (available both in
[Workbench](https://www.particle.io/workbench/) and our [Web
IDE](https://build.particle.io)), or via our developer-approved [REST
API](https://docs.particle.io/reference/device-cloud/api/).

#### Moving to Production

As you begin to deploy large numbers of devices, it is imperative to
have the ability to safely batch OTA updates to many devices at one time. This
is what allows you to roll out new software features, fix bugs, or patch
security holes across your fleet.

For this purpose, Particle offers **fleet-wide OTA updates**. A variety
of tools are available in the Particle Console to apply fleet-wide
updates without sacrificing fine-grained control.
- **Firmware releases**: Cut a version of firmware that will be
automatically sent to your fleet, with sensible safeguards to roll out
an update responsibly and monitor fleet health for changes.
- **Release by device groups**: Target a subset of your fleet to receive a new
version of firmware. This is useful when your product has variants
that require different device behaviors, or when wanting to phase out a
single release over time to reduce risk.
- **Immediate firmware releases**: Instead of waiting for devices to
re-connect to receive an update, push a fleet-wide update out immediately.

## Single Device OTA
// TODO
// include something about locking development devices to a version

## Fleet-wide OTA
// TODO

## Immediate Firmware Releases
Firmware Releases allow your team to roll out an OTA update to a fleet
of devices with a single action.

By default, Firmware Releases are sent to devices **gradually**.
Targeted device will receive the new version of firmware over time, with
each device updating the next time it starts a new secure session with
the Device Cloud. This is to ensure devices are not disrupted while in
use as a result of the reset needed to begin running the new firmware.

However, there are many instances where it is preferrable to release a
version of firmware **immediately**. This may be because:
- You desire speedy delivery of an update with new features or
security patches to impacted devices in your fleet
- You may have unexpectedly introduced a bug in your previous release,
and need to quickly rollback

**Immediate Firmware Releases** allow you to trigger a _real-time_ OTA
update across a fleet of devices. Individual devices can express their
availability for an OTA to the Device Cloud, preventing an Immediate
Release from disrupting busy devices.

This provides your team with the tools you need to roll out an OTA update
quickly without putting devices in your fleet at risk being interrupted
during a critical activity.

[ADD IMAGE OF IMMEDIATE UPDATES HERE]

## Controlling OTA availability

Sending an OTA update to a device comes with the risk of interrupting it
during critical activities. Particle's Device OS includes helpful APIs
to allow a device to coordinate with the Device Cloud to ensure OTAs are
delivered at the appropriate time.


### Disabling OTA updates

`System.disableUpdates()` can be added in application firmware to
disable OTA updates for an individual device. This is done to prevent
OTA attempts from the Device Cloud when the device is not available for
an update.

Calling `System.disableUpdates()` will **prevent all over-the-air
firmware requests from initiating**, including single device OTA
attempts (i.e. flashing development firmware in the Web IDE) and
fleet-wide OTA attempts (i.e. a firmware release).

### Re-enabling OTA updates

`System.enableUpdates()` enables OTA updates for an individual device,
allowing all over-the-air firmware requests from the Device Cloud.
By default, OTA updates are enabled for a device. This method would only
need to be called if updates had been previously disabled using
`System.disableUpdates()`.

### Notifications of pending OTA updates

`System.updatesPending()` is a boolean flag that will return whether a
new version of Product firmware is available for the device. This is
helpful in the case when updates have been disabled for a device (by
calling `System.disableUpdates()` in firmware), and the device needs
to be notified that there is a pending update for the device.

In this case, the OTA update will be prevented by the device. The device
will emit an internal system event, `firmware_update_pending` and
`System.updatesPending()` will evaluate to `true`.

### Putting it all together

Depending on the nature of your IoT application, you may want to:
- Only disable OTA updates when critical activities are being carried
out by the device, keeping OTA enabled for most of the time the device
is online
- Disable OTA updates most of the time the device is online, and include
logic to conditionally enable updates at the appropriate time, *OR*

Let's take a look at some sample firmware apps that implement these 2
architectures.

#### Disabling OTA only when necessary

#### Disabling OTA most of the time

This architecture is likely preferrable if the cost of disrupting a
device during normal operation is very high. Imagine a connected medical
device needed at a moment's notice to save lives -- the risk of an OTA
would be high enough in this case to warrant disabling updates by
default, then temporarily enabling them when a safe "update window" has
been identified.

One could implement something like this in application firmware:

```c++
void setup() {
  // Disable OTA updates by default when first booting up
  System.disableUpdates();
  // Register a listener to be notified when an OTA update is pending
  System.on(firmware_update_pending, firmware_pending_handler)
}

void firmware_pending_handler() {
  // Have the device wait until it's ready for an OTA, then enable
  // updates to trigger the update
  waitUntil(isAvailableForOTA);
  System.enableUpdates();
}

bool isAvailableForOTA() {
 // Add logic here to specify if the device is available for an update
 return Particle.connected() && ...;
}
```

In this example, the application firmware will boot up and disable all
OTA updates immediately as part of its `setup()` method. When the device
receives a notification from the Device Cloud that a new version of firmware
is available, we can use the `firmware_update_pending` event to check to
see if the device is in a position to accept an update.

When the pending update event fires, we'd like our app to wait until the
device is able to accept it to avoid interruption. We define a function
called `isAvailableForOTA()` that checks for all the characteristics
that would make a device qualify as busy.

