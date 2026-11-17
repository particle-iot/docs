---
title: Prepare for shipping
columns: two
layout: commonTwo.hbs
description: Preparing manufactured devices for shipping
guide-custom-images: default
---

# {{title}}

{{section-nav}}

This section describes how to prepare your tested devices for shipping to your customers.

{{content-nav}}

## If your device requires a battery

There are a number of restrictions if your product requires a battery that affect shipping. 


## Shipping without upgrading firmware (not recommended)

Theoretically, you can ship a cellular device fresh from Particle to your customer, never powered on, and it will work if you're pre-added the Device ID, serial number, or order number to your product. When your customer powers it on the first time, it will upgrade its version of user firmware to the version you have specified for your product, and upgrade Device OS if necessary.

We don't recommend this because upgrading Device OS OTA over cellular can be slow, and requires a lot of data. It also prevents being able to test for any manufacturing problems prior to your customer receiving it.

