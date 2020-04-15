---
title: Introduction
columns: two
layout: tutorials.hbs
order: 10
description: Learn about products on the Particle platform
---

# Products Introduction


| Feature | Developer | Product | Enterprise |
| :--- | :---: | :---: | :---: |
| Maximum devices | 100 | 250 | Unlimited |
| OTA Firmware Updates | Per-Device | Per-Group | Intelligent OTA |
| Device Groups | &nbsp; | &check; | &check; |
| Team Members | &nbsp; | &check; | &check; |
| Team Access Controls | &nbsp; | &nbsp; | &check; |
| Organizations | &nbsp; | &nbsp; | &check; |
| Fleet Health | &nbsp; | &nbsp; | &check; |
| Intelligent OTA | &nbsp; | &nbsp; | &check; |
| Service Level Agreements | &nbsp; | &nbsp; | &check; |
| Additional Support Options | &nbsp; | &nbsp; | &check; |


#### Developer Devices

Starting out with a single development kit and a single account you can use the Particle cloud features like:

- [Publish and Subscribe](/tutorials/device-os/device-os/#particle-publish).
- [Functions and Variables](/tutorials/device-os/device-os/#particle-function).
- [Over-the-air (OTA) firmware updates](/tutorials/device-cloud/ota-updates/).

However, you are limited to 100 developer devices per account and you can only flash code to a single device at a time.


#### Products

As you scale beyond prototyping, you will almost certainly want to use a product. In the self-service plan you can scale to 250 devices in a product.

Products allow a number of additional features over developer devices:

- [Team members](/tutorials/device-cloud/console/#adding-team-members), so multiple accounts can work with your product.
- [Product firmware](/tutorials/device-cloud/console/#rollout-firmware), so you can upgrade your fleet of devices automatically instead of one-by-one.
- [Device groups](/tutorials/product-tools/device-groups/), so you can subdivide your fleet of devices with different firmware or features.

You can start developing with a product for initial prototyping and testing and later import them to an organization when you scale to enterprise quantities.

#### Enterprise Features

Once you move beyond self-service to an enterprise plan, you get features such as:

- [Organizations](/tutorials/product-tools/organizations/), allowing you have multiple products with hierarchical access controls and billing.
- [Team access controls](/tutorials/product-tools/team-access-controls/), allowing you to grant specific permissions to team members.
- [Fleet health](/tutorials/diagnostics/fleet-health/), for monitoring the status of your fleet of devices.
- [Intelligent OTA](/tutorials/device-cloud/ota-updates/#intelligent-firmware-releases), allowing fine-grained control of the fleet OTA process.


## Devices in Products

For most products, you pay for all of the device cloud charges from your own account. You then either handle your own recurring billing with your customer, or build the cost into the cost of your product. The device cloud charge includes 3 MB of cellular data per month.

You typically control which devices are in your product by Device ID. Each Particle device has a unique Device ID (24 character hexadecimal code) from the factory that cannot be changed. When you order devices in tray or reel quantities from the Particle wholesale store, you'll get an email with the Device IDs in your order. By [importing the list of device IDs](/tutorials/device-cloud/console/#adding-devices) to your product you associate those devices with your product.

This serves two purposes: It prevents someone from taking a developer device and making it into your product, causing the device to appear on your billing and possibly avoiding any fees that you would have charged. It also prevents someone from stealing the device from your product and using it as a developer device.

You can add the devices to your product in bulk at once, even if you don't intend to use them right away. The billing will not start until the device comes online the first time. 

## Initial Device Setup

It's possible to just send out devices from your order to your customers without programming them first, however this will slow down the initial connection process and use additional cellular data upgrading your product firmware and Device OS over cellular.

Instead, it's common to program the devices before you send them to your customer. 

Programming devices can be done:

- Using JTAG/SWD. More common on an assembly line, also the fastest method.
- Using USB. More common for small numbers of devices.
- OTA. Less common for cellular devices as it can use a lot of data.

This also is a good time to test the device and make sure it is working properly. 

Note that the device cloud charges begin when the devices comes online the first time. If you only flash the device by JTAG/SWD or USB and do not allow it to connect to the cloud, you can program it without starting device cloud billing.

## Device and Claiming

In addition to being part of the product, devices typically need to be **claimed** to an account. For cellular products, it is common to create a single account that all devices are claimed to. It's also possible to use [two-legged shadow customers](/tutorials/device-cloud/authentication/#two-legged-authentication), for both cellular and Wi-Fi devices.

Claiming can only be done when the device is online (breathing cyan). 

This can be done using the [Particle Cloud API](/reference/device-cloud/api/#claim-a-device) after bringing the device online. 

![Pre-claim Flow](/assets/images/PreclaimFlow.png)

If you have your own server monitoring product events, you can do this from your server automatically when the device comes online the first time, allowing you to defer billing until the customer first turns on the device and allows it to connect to the cloud.

If you do not have your own server infrastructure, it's possible to auto-claim a device with a [little bit of device firmware and two webhooks](https://github.com/rickkas7/DeviceClaimRK), as well.

![Auto-claim Flow](/assets/images/AutoclaimFlow.png)

If you never need to send a private event to your product's devices, it's possible to leave them unclaimed, but we recommend claiming all devices.

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



