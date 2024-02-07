---
title: Introduction to products
columns: two
layout: commonTwo.hbs
description: Learn about products on the Particle platform
---

# {{title}}


## Introduction

#### Developer devices

Starting out with a single development kit and a single account you can use the Particle cloud features like:

- [Publish and Subscribe](/getting-started/device-os/introduction-to-device-os/#particle-publish).
- [Functions and Variables](/getting-started/device-os/introduction-to-device-os/#particle-function).
- [Over-the-air (OTA) firmware updates](/getting-started/cloud/ota-updates/).

Plus, cellular, Tracker, and Wi-Fi devices can be free to use!

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge
- No credit card required
- Products can be prototyped in the Free plan
- Device communication is paused when the monthly limit is reached
- Community support


#### Products

Products group devices with similar firmware and usage. You can use products with the Free plan above for prototyping, then expand to the Growth plan for production.

Products allow a number of additional features over developer devices:

- [Team members](/getting-started/console/console/#adding-team-members), so multiple accounts can work with your product.
- [Product firmware](/getting-started/console/console/#rollout-firmware), so you can upgrade your fleet of devices automatically instead of one-by-one.
- [Device groups](/getting-started/console/device-groups/), so you can subdivide your fleet of devices with different firmware or features.
- [Team access controls](/getting-started/console/team-access-controls/), allowing you to grant specific permissions to team members.
- [Fleet health](/getting-started/console/fleet-health/), for monitoring the status of your fleet of devices.


#### Growth plan

- [Organizations](/getting-started/products/organizations/), allowing you have multiple products with hierarchical access controls and billing in the Growth and Enterprise plans.
- A block includes {{growthTierDataOperationsUnit}} Data Operations ({{growthTierDataOperationsComma}}) per month and up to {{growthTierDevices}} devices
- Add as many blocks as you need for more Data Operations or more devices
- No limit to the number of blocks you can purchase self-service
- Up to {{growthTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, for each block purchased

#### Enterprise features

Once you move beyond self-service to an enterprise plan, you get features such as:

- Enterprise plans include a maximum number of devices, Data Operations, storage, and cellular data
- Data Operations and cellular data are pooled across all devices annually
- Discounts for higher Enterprise plan commitments
- Service Level Agreements (SLA)
- Dedicated support
- [Contact sales](https://particle.io/sales/) for more information


## Devices in products

For most products, you pay for all of the device cloud charges from your own account. You then either handle your own recurring billing with your customer, or build the cost into the cost of your product. 

You typically control which devices are in your product by Device ID. Each Particle device has a unique Device ID (24 character hexadecimal code) from the factory that cannot be changed. When you order devices in tray or reel quantities from the Particle wholesale store, you'll get an email with the Device IDs in your order. By [importing the list of device IDs](/getting-started/console/console/#adding-devices) to your product you associate those devices with your product.

This serves two purposes: It prevents someone from taking a developer device and making it into your product, causing the device to appear on your billing and possibly avoiding any fees that you would have charged. It also prevents someone from stealing the device from your product and using it as a developer device.

You can add the devices to your product in bulk at once, even if you don't intend to use them right away. The billing will not start until the device comes online the first time. 

## Initial device setup

It's possible to just send out devices from your order to your customers without programming them first, however this will slow down the initial connection process and use additional cellular data upgrading your product firmware and Device OS over cellular.

Instead, it's common to program the devices before you send them to your customer. 

Programming devices can be done:

- Using JTAG/SWD. More common on an assembly line, also the fastest method.
- Using USB. More common for small numbers of devices.
- OTA. Less common for cellular devices.

This also is a good time to test the device and make sure it is working properly. 

Note that the device cloud charges begin when the devices comes online the first time. If you only flash the device by JTAG/SWD or USB and do not allow it to connect to the cloud, you can program it without starting device cloud billing.

## Device and claiming

As of March 2023, claiming product devices is no longer necessary to subscribe to events on-device. This can simplify the process of device onboarding and we recommend that you use the unclaimed product device feature.

{{!-- BEGIN shared-blurb 04d55e8d-8af5-4d4b-b6a4-d4db886c669d --}}
- Prior to March 2023, claiming was required if the device firmware subscribed to events on-device. This is no longer necessary.
- You still need to claim a device is if you are using a webhook in the sandbox of the user who claimed the device. It is recommended that you use product webhooks instead, which do not require claiming.
- If you are using a device with Mark as Development device, you may want to claim the device to your account so you can easily OTA flash it from Particle Workbench or other development environments.
- If you previously had firmware that subscribed to events but was the device was unclaimed, the events previously disappeared. This is no longer the case and the device will now start receiving those events, and each event will count as a data operation.
- Claiming is still allowed, if you prefer to continue to use claiming, but not recommended.
{{!-- END shared-blurb --}}


## Product firmware workflow

When you are working on a product there are any number of possible scenarios, but this one is common and works well:

- Each developer has their own Particle account and device on their desk for use with your product. This makes it easy to access the USB debug serial port, buttons, etc.. 
- These developers are [team members](/getting-started/console/console/#adding-team-members) for your product, so they can access the product test fleet.
- The developer's desktop device is claimed to the developer's account. 
- This device uses the [Mark As Development Device](/getting-started/console/development-devices/) feature. This allows it to be part of the product, but combined with being claimed to the developer's account, allows it to be flashed directly from Particle Workbench or the Web IDE.


The normal workflow is to use Particle Workbench to develop firmware. It can then be flashed to the device, either over USB, or OTA, as desired.

Once the firmware is ready for larger testing:

- The `PRODUCT_VERSION` is updated, if it has not already been updated.
- A version of the firmware is built and downloaded, using Particle Workbench or the Particle CLI cloud compiler.
- This version is uploaded to the console as [product firmware](/getting-started/console/console/#rollout-firmware).

You can then:

- Lock and flash a single device in your product test fleet for further testing
- Release the firmware to a device group, such as a beta test group.
- Release the firmware to all devices.

![Workflow](/assets/images/release-firmware-flow.png)



