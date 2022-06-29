---
title: Introduction to Products
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
#### Free Tier

Starting out with a single development kit and a single account you can use the Particle cloud features like:

* [Publish and Subscribe](/getting-started/device-os/introduction-to-device-os/#particle-publish).
* [Functions and Variables](/getting-started/device-os/introduction-to-device-os/#particle-function).
* [Over-the-air (OTA) firmware updates](/getting-started/cloud/ota-updates/).

With developer devices, you flash code to each device separately. To group together multiple devices sharing the same code, you can use a product.

#### Products

A Product is a management schema that allows users higher-level control over groups of devices. In the Free tier you can have up to 100 devices, any mix of cellular, Wi-Fi, and Tracker devices, in a product or developer devices.

Products allow a number of additional features over developer devices:

* [Team members](/getting-started/console/console/#adding-team-members), so multiple accounts can work with your Product.
* [Product firmware](/getting-started/console/console/#rollout-firmware), so you can upgrade your fleet of devices automatically instead of one-by-one.
* [Device groups](/getting-started/console/device-groups/), so you can subdivide your fleet of devices into groups with different firmware or features.
* [Team access controls](/getting-started/console/team-access-controls/), allowing you to grant specific permissions to team members.
* [Fleet health](/getting-started/console/fleet-health/), for monitoring the status of your fleet of devices.
* [Intelligent OTA](/getting-started/cloud/ota-updates/#intelligent-firmware-releases), allowing fine-grained control of the fleet OTA process.

You can start developing with a Product for initial prototyping and testing and later import your Products to an Organization when you scale to Enterprise quantities.

#### Growth Tier

Once you move beyond the 100-device limit of the Free tier, you can move to the [Growth tier](/getting-started/cloud/introduction/#pricing). 

#### Enterprise Features

Once you move beyond Growth to an Enterprise plan, you get features such as annual pooled usage, volume discounts, and service level agreements (SLA).

## 1\. Add Devices to Your Products

For most Products, you pay for all of the device cloud charges from your own account. You then either handle your own recurring billing with your customer, or build the cost into the cost of your Product.

When you order devices in tray or reel quantities from the Particle wholesale store, you'll get an email with the Device IDs in your order. By [importing the list of device IDs](/getting-started/console/console/#adding-devices) to your Product you associate those devices with your Product.

[Learn More About Devices in Products](/getting-started/products/introduction-to-products/#devices-in-products)

## 2\. Initial Device Setup

It's possible to just send out devices from your order to your customers without programming them first, however this will slow down the initial connection process and use additional cellular data upgrading your product firmware and Device OS over cellular.

Instead, it's common to program the devices before you send them to your customer.

Programming devices can be done:

* Using JTAG/SWD. More common on an assembly line, also the fastest method.
* Using USB. More common for small numbers of devices.
* OTA (over-the-air).

## 3\. Device and Claiming

In addition to being part of the Product, devices typically need to be **claimed** to an account. For cellular Products, it is common to create a single account that all devices are claimed to. It's also possible to use [two-legged shadow customers](/reference/cloud-apis/authentication/#two-legged-authentication), for both cellular and Wi-Fi devices.

[Learn more about Device Claiming](/getting-started/products/introduction-to-products/#device-and-claiming)

## 4\. Development Workflow

![release-firmware-flow.png](/assets/images/support/release-firmware-flow.png)

[Learn more about the Development Workflow](/getting-started/products/introduction-to-products/#product-firmware-workflow)
