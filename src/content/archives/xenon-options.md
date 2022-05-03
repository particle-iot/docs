---
title: Using a Xenon without Mesh
layout: commonTwo.hbs
columns: two
description: Options for using Particle Xenon devices without Particle Mesh
---

# Using a Particle Xenon without Particle Mesh

{{box op="start" cssClass="boxed warningBox"}}
This page is no longer maintained and is provided for historical reference only
{{box op="end"}}

In January of 2020, Particle announced that Mesh networking support in Gen3 devices would be deprecated. While this change does not affect the ability of customers to use the Argon and Boron as standalone devices, because the Particle Xenon is a Mesh-only device, it is not possible to use this device with the Particle Device Cloud in a production-supported context.

It is possible to continue to use your Particle Xenon, either as a standalone device, or in unsupported Particle Mesh networks. This document provides information regarding the various contexts in which the Xenon can be used, as well as instructions for provisioning your Xenon for another use, if needed.

## Option 1: Continue to use your Xenon as a Particle Device

If you wish, you can continue to use your Xenon as a part of a pre-existing Particle Mesh network, provided that your network was provisioned before the end of 2020 and is running as version of Device OS that supports Mesh (i.e. 1.5.x or older). Later versions do not support Particle Mesh and do not support the Xenon as a build target.

*_Please note that this option, while available, is not supported by Particle for production use._*

You can also use your Xenon in [standalone mode, with no network connectivity](https://support.particle.io/hc/en-us/articles/360044183314/#set-the-system_mode).

## Option 2: Provision your Xenon as a non-Particle dev kit

Alternatively, you can provision your Xenon for use as a dev kit disconnected from the Particle platform. Available options are:

- [Use the Particle Xenon as a nRF52840 dev kit](/reference/discontinued/hardware/xenon-nordic-sdk/).
- [Use the Particle Xenon as a CircuitPython device](/archives/xenon-circuit-python/).
- [Use the Particle Xenon with the Zephyr Project](https://docs.zephyrproject.org/latest/boards/arm/particle_xenon/doc/index.html) (Real-time operating system with MicroPython).

These options will remove the Particle Device OS and bootloader, so the device will no longer be able to connect to the Particle Device Cloud.

## Option 3: Use your Xenon with the Ethernet FeatherWing

Using Device OS 1.5.x you can continue to use a Xenon in the Ethernet FeatherWing. You can continue to do so after January 1, 2021, however you will only be able to claim a Xenon to your account using the Particle CLI as there will be no mobile app support at that time.
