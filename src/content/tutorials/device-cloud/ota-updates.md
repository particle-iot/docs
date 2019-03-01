---
word: OTA
title: OTA Firmware Updates
order: 1
shared: true
columns: two
layout: tutorials.hbs
---

# {{title}}

## Introduction

**Over-the-air (OTA) firmware updates** are a vital component of any IoT
system. Over-the-air firmware updates refers to the practice of remotely
updating the code on an embedded device.

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
device firmware, network connectivity, and an IoT device cloud. Particle's
all-in-one IoT platform provides this for you out-of-the box, and integrates
them together seamlessly to allow you to deliver OTA updates to devices.

This is in sharp contrast to other IoT platforms who market an OTA
feature but only provide a small sliver of the functionality required
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

- **Complete hardware abstraction**: Particle's compile
  service translates human-readable firmware application code into
machine-readable binary code specific to a compatible hardware platform.

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

## Single Device OTA
// TODO

## Fleet-wide OTA
// TODO
