---
title: Introduction to products
columns: two
layout: commonTwo.hbs
description: Learn about products on the Particle platform
---

# {{title}}


## Introduction

#### Developer Devices

Starting out with a single development kit and a single account you can use the Particle cloud features like:

- [Publish and Subscribe](/tutorials/device-os/device-os/#particle-publish).
- [Functions and Variables](/tutorials/device-os/device-os/#particle-function).
- [Over-the-air (OTA) firmware updates](/tutorials/device-cloud/ota-updates/).

Plus, cellular, Tracker, and Wi-Fi devices can be free to use!

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge
- No credit card required
- Products can be prototyped in the Free tier
- Device communication is paused when the monthly limit is reached
- Community support


#### Products

Products group devices with similar firmware and usage. You can use products with the Free tier above for prototyping, then expand to the Growth tier for production.

Products allow a number of additional features over developer devices:

- [Team members](/tutorials/device-cloud/console/#adding-team-members), so multiple accounts can work with your product.
- [Product firmware](/tutorials/device-cloud/console/#rollout-firmware), so you can upgrade your fleet of devices automatically instead of one-by-one.
- [Device groups](/tutorials/product-tools/device-groups/), so you can subdivide your fleet of devices with different firmware or features.
- [Team access controls](/tutorials/product-tools/team-access-controls/), allowing you to grant specific permissions to team members.
- [Fleet health](/tutorials/diagnostics/fleet-health/), for monitoring the status of your fleet of devices.


#### Growth Tier

- [Organizations](/tutorials/product-tools/organizations/), allowing you have multiple products with hierarchical access controls and billing in the Growth and Enterprise Tiers.
- A block includes {{growthTierDataOperationsUnit}} Data Operations ({{growthTierDataOperationsComma}}) per month and up to {{growthTierDevices}} devices
- Add as many blocks as you need for more Data Operations or more devices
- No limit to the number of blocks you can purchase self-service
- Up to {{growthTierDataOperationsCellularData}} of cellular data per month ({{growthTierDataOperationsTrackerData}} for Tracker), pooled across all devices, for each block purchased
- Email support

#### Enterprise Features

Once you move beyond self-service to an enterprise plan, you get features such as:

- Enterprise tiers include a maximum number of devices, Data Operations, storage, and cellular data
- Data Operations and cellular data are pooled across all devices annually
- Discounts for higher Enterprise tier commitments
- Service Level Agreements (SLA)
- Dedicated support
- [Contact sales](https://particle.io/sales/) for more information


## Devices in Products

For most products, you pay for all of the device cloud charges from your own account. You then either handle your own recurring billing with your customer, or build the cost into the cost of your product. 

You typically control which devices are in your product by Device ID. Each Particle device has a unique Device ID (24 character hexadecimal code) from the factory that cannot be changed. When you order devices in tray or reel quantities from the Particle wholesale store, you'll get an email with the Device IDs in your order. By [importing the list of device IDs](/tutorials/device-cloud/console/#adding-devices) to your product you associate those devices with your product.

This serves two purposes: It prevents someone from taking a developer device and making it into your product, causing the device to appear on your billing and possibly avoiding any fees that you would have charged. It also prevents someone from stealing the device from your product and using it as a developer device.

You can add the devices to your product in bulk at once, even if you don't intend to use them right away. The billing will not start until the device comes online the first time. 

## Initial Device Setup

It's possible to just send out devices from your order to your customers without programming them first, however this will slow down the initial connection process and use additional cellular data upgrading your product firmware and Device OS over cellular.

Instead, it's common to program the devices before you send them to your customer. 

Programming devices can be done:

- Using JTAG/SWD. More common on an assembly line, also the fastest method.
- Using USB. More common for small numbers of devices.
- OTA. Less common for cellular devices.

This also is a good time to test the device and make sure it is working properly. 

Note that the device cloud charges begin when the devices comes online the first time. If you only flash the device by JTAG/SWD or USB and do not allow it to connect to the cloud, you can program it without starting device cloud billing.

## Device and Claiming

In addition to being part of the product, devices typically need to be **claimed** to an account. For cellular products, it is common to create a single account that all devices are claimed to. It's also possible to use [two-legged shadow customers](/tutorials/device-cloud/authentication/#two-legged-authentication), for both cellular and Wi-Fi devices.

A product device can be claimed to any team member of a product using the [Particle Cloud API](/reference/device-cloud/api/#claim-a-device) after the device has been imported to the product. It does not need to be online for claiming.

![Pre-claim Flow](/assets/images/PreclaimFlow.png)

If you never need to send an event to your product's devices, it's possible to leave them unclaimed.

For Wi-Fi devices, you will typically need to use a mobile app and the [Photon/P1 Setup Library](/reference/SDKs/ios/) to set the Wi-Fi credentials, and this provides a convenient way to claim devices at the same time.

## Product Firmware Workflow

When you are working on a product there are any number of possible scenarios, but this one is common and works well:

- Each developer has their own Particle account and device on their desk for use with your product. This makes it easy to access the USB debug serial port, buttons, etc.. 
- These developers are [team members](/tutorials/device-cloud/console/#adding-team-members) for your product, so they can access the product test fleet.
- The developer's desktop device is claimed to the developer's account. 
- This device uses the [Mark As Development Device](/tutorials/product-tools/development-devices/) feature. This allows it to be part of the product, but combined with being claimed to the developer's account, allows it to be flashed directly from Particle Workbench or the Web IDE.


The normal workflow is to use Particle Workbench to develop firmware. It can then be flashed to the device, either over USB, or OTA, as desired.

Once the firmware is ready for larger testing:

- The `PRODUCT_VERSION` is updated, if it has not already been updated.
- A version of the firmware is built and downloaded, using Particle Workbench or the Particle CLI cloud compiler.
- This version is uploaded to the console as [product firmware](/tutorials/device-cloud/console/#rollout-firmware).

You can then:

- Lock and flash a single device in your product test fleet for further testing
- Release the firmware to a device group, such as a beta test group.
- Release the firmware to all devices.

![Workflow](/assets/images/release-firmware-flow.png)



