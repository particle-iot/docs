---
title: Prototype
columns: two
layout: commonTwo.hbs
description: Prototype your product
guide-custom-images: default
---

# {{title}}

{{section-nav}}

The first step is usually to create a prototype. There are a few things that you can do in the prototyping phase that will make things easier as you scale.

{{content-nav}}

## Create a product

Using a [product](/getting-started/console/console/#working-with-a-product) during the prototyping phase is important for a number of reasons:

- A product is necessary for fleet firmware updates, device vitals
- It keeps devices together with integrations, logic blocks, etc.
- API endpoints remain consistent when moving to basic or enterprise plans
- Provide a convenient way for contract programmers to transfer devices and configuration

## Use Particle Workbench

Use [Particle Workbench](/getting-started/developer-tools/workbench/) for your development environment.

## Prototyping with developer devices

In some cases, you may want to use developer devices like the Boron or Photon 2 for early prototyping. These can be used in solderless breadboards or with off-the-shelf sensors, displays, and other peripherals based on Qwiic or Feather standards, which can speed up development.

See [Prototyping](/hardware/expansion/prototyping/) for more information.

## Building custom hardware

Once you go past initial prototyping, you may want to consider using a custom circuit board, or switch to using a production device like the B-SoM or P2.

See [Beyond prototyping](/hardware/expansion/beyond-prototyping/) for more information.

## Gateways

You can also build using an off-the-shelf product like the Tracker One or Monitor One. In many cases, you can use these products with no hardware
development at all. For some asset tracking applications using the Tracker One you may not even need to write firmware.

![Enclosure](/assets/images/at-som/at-encosure-plugged.jpg)


{{section-nav}}
