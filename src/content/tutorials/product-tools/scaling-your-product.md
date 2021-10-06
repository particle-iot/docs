---
title: Scaling Your Product
columns: two
layout: commonTwo.hbs
description: Scaling your product beyond prototyping
includeDefinitions: [api-helper, api-helper-extras]
---

# {{title}}

The free plan allows:

- Up to {{freeTierDevices}} devices, any mix of cellular and Wi-Fi
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge

When you exceed these limits, you will need to migrate to the growth plan. Sign up at [upgrade to growth](https://www.particle.io/upgradetogrowth/). A representative will contact you by telephone to complete the upgrade process to growth tier.

When you upgrade to the growth tier, you will get an organization, which is the collection of products and accounts in your plan. The usage limits in the growth tier apply monthly across all products of the same type in your organization. Some limits vary between cellular, Wi-Fi, and tracker products. 

Additionally, all organization members still have a private sandbox in their account and can still have their own 100 free devices that do not count against your growth plan limits. 

**Moving your product**

When you are ready to migrate to growth, one of the questions you will be asked is which products you want to move into your organization. This is usually done once during the migration process, but you can move individual products into your organization later with a [support ticket](https://support.particle.io/).

When you move a product into your organization:

- Devices stay online the entire time with no interruption.
- Webhooks will continue to function.
- Cloud API endpoints remain unchanged.
- Product access tokens issued before the change will continue to work.
- Customers such two-legged shadow customers will continue to work with the same access tokens.

Device claiming is not affected by the move. If the devices were claimed to the original product owner that will remain unchanged. However even though the devices appear in the product owner's sandbox device list, devices that are part of the organization product do not count against the 100 device limit! You can use the [device list details tool](/tutorials/product-tools/creating-a-product/#device-list-details) to see which devices count against the limits.

Integrations such as webhooks defined in the old product owner account will continue to function if the devices are still claimed to the product owner.

## Possible migration issues

### No product

If you did not create a product at all, you will need to create one. The [creating a product guide](/tutorials/product-tools/creating-a-product/) can help with this.

- You will need to adjust your workflow to include uploading product firmware releases and releasing them to your fleet. In the unusual situation where each device in your product has its own unique firmware, you can use the **Mark as Development Device** to allow each device to have its own firmware that you flash manually instead of using fleet firmware.

- You will need to add devices to your product. For cellular devices, also their SIM cards. The [Move devices into a product](/tools/product-tools/device-move) tool can simplify this process.

- You may or may not want to change device claiming. See [device claiming](/tutorials/product-tools/creating-a-product/#device-claiming) in the creating a product guide.

- If you are using integrations such as webhooks, you may want to move your integrations into your product, see [integrations](/tutorials/product-tools/creating-a-product/#integrations), in the creating a product guide.

- Cloud API endpoints are different for developer devices vs. product devices. If you are using the cloud API to access devices, changes will be necessary.

- If you have created oAuth tokens for your developer account you will need to generate new product-specific oAuth tokens for use with your product.

This is why we recommend creating a product very early in development, because making these changes later tends to be somewhat disruptive.

### Moving a product vs. moving devices

Whenever possible you should move an entire product into your organization on the growth plan. This is generally painless and has no interruption in service.

Moving individual devices from one product to another can present certain issues that can be very disruptive:

- If you use customer claiming (simple auth or two-legged shadow customers) you should avoid moving devices because there is no automated way to do so. Also, it's impossible to keep the same authentication tokens when moving a customer device into a new product.

- In many cases, moving a device from one product to another requires flashing new firmware, which adds complexity.

- It can be confusing to move devices that are offline, because devices will enter quarantine in the old product for a period of time before they self-correct and move themselves into their new product.

If you are absolutely sure you want to move devices from a product to another product you can use the [move devices into a product](/tools/product-tools/device-move) tool, however be sure to read all of the caveats on that page before doing so.

### Device claiming

Moving a product from your sandbox into the growth organization does not affect device claiming! In general, you should leave claiming as-is, at least initially. 

See [device claiming](/tutorials/product-tools/creating-a-product/#device-claiming) in the creating a product guide for more information.

### User-level oAuth tokens

If you are using oAuth tokens created via the Authentication tab in a user account (when moving from developer sandbox) or in a product (when moving to a different product), these tokens will no longer work when using the new product. You must create new oAuth tokens from a new client ID and secret created in the destination product. It's not possible to transfer oAuth tokens between accounts or products. 

Authentication tokens created using `particle token create` from the product owner's account will continue to work after migrating to growth, assuming the the original product owner is also a team member of the organization or product.

Authentication tokens created from an oAuth client ID and secret within the product will continue to function after the product is moved to a growth or enterprise organization.

### Product owner webhooks

If you created the webhooks in the product owner account and claimed all devices to the product owner account, this will still function uninterrupted when migrating to growth, as long as you don't change device claiming. As long as the devices are added to the growth organization product, the data operations incurred for webhook responses will be counted in the organization, even though the webhook is in the developer sandbox.

However, if you change the device claiming you may need to move the webhook into the product. The product is generally the best place to put webhooks for product devices, and is required if you are using unclaimed product devices or customer claimed devices.

