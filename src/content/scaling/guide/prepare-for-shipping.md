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

There are a number of restrictions if your product requires a battery that affect shipping. The rules vary by country, method of transport (air or ground), and often by carrier.

As a general rule, ground shipping is generally acceptable for devices that contain a Li-Po battery as an integral part of the product, and the battery is electrically isolated to prevent your device from turning on during shipping.

### Shipping mode

The Tracker One uses **shipping mode** to ship the sealed devices with the battery connected. This is implemented using the bq24195 PMIC chip, which can isolate the battery from the rest of the device using a FET (transistor). 

You can enter shipping mode under software control, but the only way to get out of shipping mode is to supply external power, such as by USB. 

The same technique can be used with other devices that include a similar PMIC and is not limited to the Tracker One.

### Other techniques

Disconnecting the battery is a common solution, especially if you are using the Particle JST-PH connector, and if your customers are technical. 

Many consumer electronics with replaceable batteries using plastic pull tabs to isolate the batteries, but this isn't generally practical for larger Li-Po battery packs
that are connected using the JST-PH connector.


## Shipping without upgrading firmware (not recommended)

Theoretically, you can ship a cellular device fresh from Particle to your customer, never powered on, and it will work if you're pre-added the Device ID, serial number, or order number to your product. When your customer powers it on the first time, it will upgrade its version of user firmware to the version you have specified for your product, and upgrade Device OS if necessary.

We don't recommend this because upgrading Device OS OTA over cellular can be slow, and requires a lot of cellular data. It also prevents being able to test for any manufacturing problems prior to your customer receiving it.

