---
title: Security
columns: two
template: guide.hbs
order: 5
---

# Security

When it comes to IoT devices, there is no shortage of security concerns. This
part of the guide will be a discussion of security-related topics that arise
with a product at scale.

## Treating Devices as Products

When you created a product, you created a new type of device in the Particle
cloud. So far, development kits that you have been using for prototyping have been considered as a "Photon," "P1", "Electron," or "Core" by the
Particle cloud. However, when you added devices to your product, you are signaling to the cloud
that you would like them to be treated as part of your product instead of
as development kits.

There are certain security implications that arise around devices behaving as products. Ideally, the following is always true:
- Only the _devices_ that be given product privileges will recieve them
- Only the _people_ who should have the ability to interact with the
  product device will be allowed to do so

There can be, however, cases when the Particle cloud won't have all the information it needs to be certain that a device should in fact be treated as a part of your product. As such, you have the power as a product creator to choose the [level of strictness](#mismatched-product-ids) around which devices receive product priveleges and which do not.

Before making this decision, it is important to get a grasp of the role of the Product ID in the Particle cloud.

### Product IDs

A Product ID is used to group devices together and treat them as a cohesive unit. A group of devices that all share a Product ID are able to do things like download product-specific firmware, publish events that will appear in a product's event stream, and trigger product webhooks.

When you created your product, a unique numeric ID was assigned to it. This ID
will be used countless times during the development and manufacturing process for your product. When a device is [added to a product](/guide/how-to-build-a-product/dashboard/#adding-devices), the _Product ID_ of the device changes from a development kit to a member of a product.

You will be able to find your product's ID at any time in your product's
dashboard navigation bar:

![A new product](/assets/images/product-id.png) <p class="caption">Your product
ID is marked with a key icon</p>

You should store your Product ID in a safe place where you won't forget it. It
may be helpful to memorize your Product ID if possible.

### Definitions of Product ID

There are **2** places where a Product ID is defined for a given device.

- <i class="ion-cloud"></i> **Cloud**: The Particle cloud keeps a record
  of devices and their associated Product IDs
- <i class="im-devices-icon"></i> **Device**: The device itself will
  report a Product ID when coming online based on the firmware running on the device

Your goal as a product creator is to **ensure that both of these Product
ID definitions match** for the devices that should behave as your product. When both of these IDs
match, the Particle cloud can proceed with confidence in treating the device as
part of the product. If these IDs *don't* match, the device will be limited in
its privileges as a member of the product.

The table below shows the three possible combinations of Product IDs between the
cloud and the device. In any case when the Product ID of the device does not
match the Product ID saved in the cloud, you should expect limited product
functionality.

| <i class="ion-cloud"></i> Cloud | <i class="im-devices-icon"></i> Device | Status                                                  |
|---------------------------------|----------------------------------------|---------------------------------------------------------|
| 1                               | 1                                      | <i class="ion-checkmark"></i> OK                        |
| 1                               | 2                                      | <i class="ion-alert-circled"></i> Limited Privileges    |
| 2                               | 1                                      | <i class="ion-alert-circled"></i> Limited Privileges    |

<p class="caption">The device's firmware Product ID should match the Product ID
of the device in the cloud</p>

### Product Privileges

A device that has been successfully added to a product will be granted special
privileges. These privileges include (but are not limited to):

- Receiving over-the-air (OTA) firmware updates from this product
- Publishing events that will appear in this product's event stream
- Claiming by a customer of your organization
- Triggering product webhooks

These privileges are only guaranteed when there are [no mismatches](#mismatched-product-ids) between the Product ID of the device in the cloud and the Product
ID reported by the device in firmware.

## Mismatched Product IDs

There is the possiblity that the Product ID saved in the Particle cloud for a
given device does not match the self-identified Product ID reported by the
device in firmware.

These mismatches can occur from a multitude of reasons, including:
- Your team forgot to add the device to the product before directly flashing it with product firmware either during development or during manufacturing
- Someone outside your team mistakenly flashed their device with firmware containing your Product ID
- Someone outside your team is deliberately attempting to "spoof" your product by purposefully putting your Product ID in their device's firmware

You as a product creator have the ability to choose how these devices should be
handled in the case of mismatched Product IDs. There are two choices for
handling these kinds of devices: *Quarantining*, or *Auto Approval*.

Ideally mismatches in Product IDs never happen, because you or a member of your
team has taken the steps to [add the device to your product](/guide/how-to-build-a-product/dashboard/#adding-devices) before the device comes online with your product's firmware
binary.

## Quarantining Devices

This is the most secure and recommmended option for handling unrecognized
devices. By default, unrecognized devices will be quarantined unless you
override the setting in your product's config page. This is done to protect
against potentially malicious actions from unrecognized devices.

A device will be put into a quarantined state when it comes online and reports a
Product ID in its firmware that is different from the Product ID saved in the
cloud for that device. This happens when a device was flashed firmware
containing a given Product ID, but that device hasn't been properly [added to
the product](/guide/how-to-build-a-product/dashboard/#adding-devices) via the dashboard.

When this happens, the device will temporarily lose all [product privileges
](#product-privileges). In your product's devices hub on the Particle Dashboard,
you will see a list of your quarantined devices.

![Quarantined Devices](/assets/images/quarantined-device.png) <p
class="caption">Quarantined devices will be called out in your product's device
list</p>

Note that each quarantined device has two potential actions you can take:
*Approve* or *Deny*.

### Approving a Quarantined Device

Approving a quarantined device effectively adds it to your product and gives it
full [product privileges](#product-privileges). You should approve a quarantined
device if you recognize it as belonging to a member of your team or a customer
of your organization.

It is important to note that if your product has a released firmware version for
this product, the device may immediately update if necessary.

### Denying a Quarantined Device

Denying a quarantined device will ensure that the Particle cloud will continue
blocking it from [product privileges](#product-privileges). You should deny a
quarantined device if you do not recognize the device or its owner.

Denied devices will be visible in your product's device hub, but will appear
collapsed. You can re-approve a denied device at any time, in case you do in
fact want to add the device to your product.

## Auto Approving Devices

The other option for handing unrecognized devices is to automatically approve
them into your product. This is a *less secure* option, but may be necessary if
you don't have access to the list of Device IDs that you are expecting to come
online and self-identify as your product.

Auto approving devices will automatically add the unrecognized device to your
product (with some restrictions) if it self-identifies as your product without
the cloud knowing about it.

For security reasons, a device will _only_ be automatically approved if either
of the following conditions are met:

- The device is unowned when it comes online
- The device is owned by a user that is a team member of your   organization

This safeguard has been put in place to prevent a blatant attempt to spoof your
product. However, because devices can connect to the cloud without an owner, it is
possible that an undesired device could be automatically added to the product. This
is why we recommend that you use [quarantining](#quarantining-devices) as the
mechanism for handling unrecognized devices, unless you have a compelling reason to
use auto-approval.


