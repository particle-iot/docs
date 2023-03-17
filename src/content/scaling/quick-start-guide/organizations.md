---
title: Introduction to Organizations
columns: two
layout: commonTwo.hbs
description: Introduction to Organizations
---

# {{title}}

When you sign up for an enterprise plan, an organization will be created for you.

An organization **contains one or more Products that manage your device fleet.**

A single product manages a fleet of devices that share a common hardware platform and typically run the same or similar firmware.

Your organization can contain as many products as you need; there is no additional charge for products and you can create, rename, and delete products through the [Particle console](https://console.particle.io).

Enterprise organizations don't have a developer sandbox, though each individual developer in the organization has their own developer sandbox. All enterprise fleets should be organized into products for shared access control and easier management.

Learn more in the [creating a product guide](/getting-started/products/creating-a-product/).

**An organization allows access control across multiple products** and makes it easy to add and remove developers as your team changes.

In many cases, developers will have access to all products by default, but you can also control access to specific products. For example, if you hire a contractor to work on a single product they can get access to only that product and not the rest of your products.


**An organization centralizes billing** for multiple products. Usage is also aggregated annually instead of monthly in the growth plan.


## Migrating to enterprise

<a id="top"></a>

### 1. Select the products you want to upgrade

You can select any number of products from your free sandbox to migrate to enterprise.

- [What is a product?](#what-is-a-product-)
- [Which products should I move to enterprise?](#which-products-should-i-move-to-enterprise-)
- [What if I don't have a product yet?](#what-if-i-don-39-t-have-a-product-yet-)

### 2. Name your organization

All of the products in your enterprise plan are grouped together into an organization. 

- [What is an organization?](#what-is-an-organization-)

### 3. Choose the number of blocks you need

The enterprise plan usage is measured in blocks, and you need to pick an initial number of blocks.

- [What is a block?](#what-is-a-block-)
- [How many blocks do I need?](#how-many-blocks-do-i-need-)


## FAQ (frequently asked questions)

### What is a block?

Billing is measured in blocks.

- A block includes {{growthTierDataOperationsUnit}} Data Operations ({{growthTierDataOperationsComma}}) per month.
- Up to {{growthTierDevices}} devices.
- Up to {{growthTierDataOperationsCellularData}} of cellular data per month, pooled across all devices.
- Blocks are specific to cellular, Tracker, or Wi-Fi. Usage is aggregated for all devices in all products in your growth organization of the same class. For example, Electrons, Borons, and B Series are all cellular devices that can share the same block even though they are in different products.
- Cellular blocks are {{growthBlockCellularPrice}} per month per block
- Tracker blocks are {{growthBlockTrackerPrice}} per month per block
- Wi-Fi blocks are {{growthBlockWiFiPrice}} per month per block

{{top}}

### How many blocks do I need?

If you exceed any limit, you will need another block. You can't just buy more data operations, or more cellular data, for example. For example, if you have 150 cellular devices, you will need a minimum of two blocks.

You can find out your fleet usage in the [Billing & Usage](/getting-started/console/console/#billing-amp-usage) panel in the console if you are an organization administrator. 

You can get a rough estimate of the number of data operations if you publish data periodically by using this calculator:

{{> dataoperationscalc}}

If you want to try to reduce the number of data operations you are using, see [minimizing data operations](/getting-started/cloud/introduction/#minimizing-data-operations).

{{top}}


### What is a data operation?

{{!-- BEGIN shared-blurb a7c0e9bc-9ba8-11ec-b909-0242ac120002 --}}
The central billing element for both cellular and Wi-Fi is the Data Operation:

- Each publish, subscribe, function, or variable consumes one Data Operation regardless of size
- The data has a maximum size of 622 to 1024 bytes of UTF-8 characters; see [API Field Limits](/reference/device-os/api/cloud-functions/overview-of-api-field-limits/)
- Stored data, such as Tracker geolocation data, consume one Data Operation per location point saved<sup>1</sup>
- Certain retransmissions, as described below

The following do **not** count against your Data Operations limit:

- Over-the-air firmware updates do not count against your Data Operations limit
- Internal events such as device vitals (beginning with "particle" or "spark") do not count against your Data Operations limit
- Acknowledgements, session negotiation, keep-alives etc. do not count against your Data Operations limit
- Webhooks and server-sent-events (SSE) themselves do not count against your Data Operations limit, but the triggering event or response could
- Particle cloud API calls do not count against your Data Operations limit

<sup>1</sup>You will receive warnings by email, and as a pop-up and in the [**Billing & Usage**](https://console.particle.io/billing) tab in the console at 70%, 90%, and 100% of the allowable data operations. In the Free Plan you will have an opportunity to upgrade to the Growth Plan. In the Growth Plan, additional blocks can be added to allow for more data operations.
{{!-- END shared-blurb --}}

{{top}}

### What are free plan limits?

The free plan is a place for prototyping products. It is free of charge, but there are limits on the number of devices and data operations you can use.

- Up to {{freeTierDevices}} devices, any mix of cellular, Wi-Fi, and Tracker devices
- {{freeTierDataOperationsUnit}} Data Operations ({{freeTierDataOperationsComma}}) per month, for both cellular and Wi-Fi, pooled across all devices
- Up to {{freeTierDataOperationsCellularData}} of cellular data per month, pooled across all devices, at no charge
- Device communication is paused when a monthly limit is reached

Each developer within your organization also have their own free plan developer sandbox to use for their own experimentation that does not affect your enterprise billing plan.

{{top}}

### What is a product?

A product groups together related devices that generally run the same firmware. It has many advantages:

- [Fleet deployment](/getting-started/cloud/ota-updates/#intelligent-firmware-releases), so you can release firmware to many devices at the same time.
- Upgrade firmware on offline devices, so devices can receive updates when they reconnect to the cloud.
- [Teams](/getting-started/console/team-access-controls/), so multiple users can work with the product devices.
- [API users](/reference/cloud-apis/api/#api-users), to allow fine-grained access control to Particle APIs from your servers.

If you need to create a product, see the [creating a product](/getting-started/products/creating-a-product/) tutorial.

{{top}}

### Which products should I move to enterprise?

- Any product that will have more than 100 devices in it must be on the enterprise plan.

- Any product whose devices use more than {{freeTierDataOperationsUnit}} data operations, or large amount of cellular data.

{{top}}


### What is an organization?

An organization groups together one or more products so they:

- Have one bill for all products in the organization
- Pooled usage across all products in the organization
- Organization level users that have access to all products
- You can still have product level users with access to specific products, if needed
- There is no per-product fee for products in your organization, however the devices, data operations, and cellular data usage by the devices in those products count against your organization's total usage.
- A user can belong to multiple organizations if needed.

{{top}}

### What happens when I move a product to enterprise?

When you move a product into your enterprise plan organization:

- Devices stay online the entire time with no interruption.
- Webhooks will continue to function.
- Cloud API endpoints remain unchanged.
- Product access tokens issued before the change will continue to work.
- Customer claiming, typically used with Wi-Fi devices, will continue to work with the same access tokens.

{{top}}

### Is device claiming affected?

Device claiming is not affected by moving products into an organization.

- If the devices were claimed to the original product owner that will remain unchanged. 
- Even though the devices appear in the product owner's sandbox device list, devices that are part of the organization product do not count against the 100 device limit! 
- You can use the [device list details tool](/getting-started/products/creating-a-product/#device-list-details) to see which devices count against the limits.
- Integrations such as webhooks defined in the old product owner account will continue to function if the devices are still claimed to the product owner.
- See [device claiming](/getting-started/products/creating-a-product/#device-claiming) in the creating a product guide for more information.

{{top}}

### What are team members?

You can configure team members at both the product and organization level from the console if you are an administrator.

- If you have team members in your product from the free sandbox tier, they will continue to work after migration.
- You may prefer to create team members in your organization so they'll have access to all current and future products by default.
- You may still want to use product team members to grant access to one product only. For example, you might do this for a contractor who is hired to help with one specific project.

Learn more in the [teams documentation](/getting-started/console/team-access-controls/).

{{top}}

### What if I don't have a product yet?

If all of your devices are still in the developer sandbox, there are a few steps you will need to do before migration. The [creating a product guide](/getting-started/products/creating-a-product/) can help with this.

- You will need to adjust your workflow to include uploading product firmware releases and releasing them to your fleet. In the unusual situation where each device in your product has its own unique firmware, you can use the **Mark as Development Device** to allow each device to have its own firmware that you flash manually instead of using fleet firmware.

- You will need to add devices to your product. For cellular devices, also their SIM cards. The [Move devices into a product](https://github.com/particle-iot/node-example-device-move) script can simplify this process.

- You may or may not want to change device claiming. See [device claiming](/getting-started/products/creating-a-product/#device-claiming) in the creating a product guide.

- If you are using integrations such as webhooks, you may want to move your integrations into your product, see [integrations](/getting-started/products/creating-a-product/#integrations), in the creating a product guide.

- Cloud API endpoints are different for developer devices vs. product devices. If you are using the cloud API to access devices, changes will be necessary.

- If you have created oAuth tokens for your developer account you will need to generate new product-specific oAuth tokens for use with your product.

{{top}}

### Moving a product vs. moving devices

Whenever possible you should move entire product(s) into your organization on the enterprise plan. This is generally painless and has no interruption in service.

Moving individual devices from one product to another can present certain issues that can be disruptive:

- If you use customer claiming (simple auth or two-legged shadow customers) you should avoid moving devices between products because there is no automated way to do so. Also, it's impossible to keep the same authentication tokens when moving a customer device into a new product.

- In many cases, moving a device from one product to another requires flashing new firmware, which adds complexity.

- It can be confusing to move devices that are offline, because devices will enter quarantine in the old product for a period of time before they self-correct and move themselves into their new product.

If you are absolutely sure you want to move devices from a product to another product you can use the [move devices into a product](https://github.com/particle-iot/node-example-device-move) script, however be sure to read all of the caveats on that page before doing so.

- If you want to move entire products from the free plan into your your organization later, you can do so with a [support ticket](https://support.particle.io/). 
- Team members with administrative access can create new products in your organization directly from the console at any time.

{{top}}

### Beware of user-level oAuth tokens

If you are using oAuth tokens created via the Authentication tab in a user account (when moving from developer sandbox) or in a product (when moving to a different product), these tokens will no longer work when using the new product.

You must create new oAuth tokens from a new client ID and secret created in the destination product. It's not possible to transfer oAuth tokens between accounts or products. 

Authentication tokens created using `particle token create` from the product owner's account will continue to work after migrating to enterprise, assuming the the original product owner is also a team member of the organization or product.

Authentication tokens created from an oAuth client ID and secret within the product will continue to function after the product is moved to a growth or enterprise organization.

{{top}}

### Product owner webhooks

If you created the webhooks in the product owner account and claimed all devices to the product owner account, this will still function uninterrupted when migrating to enterprise, as long as you don't change device claiming.

As long as the devices are added to the organization product, the data operations incurred for webhook responses will be counted in the organization, even though the webhook is in the developer sandbox.

However, if you change the device claiming you may need to move the webhook into the product. The product is generally the best place to put webhooks for product devices, and is required if you are using unclaimed product devices or customer claimed devices.

{{top}}

### Help me understand the device list!

![Sandbox device list](/assets/images/console/sandbox-devices.png)

The sandbox device list is confusing because it includes items that don't count against your free plan limit, and some devices that are part of the free plan limit are not in the list!

- The device limit is 100 total devices across all device types (cellular, Wi-Fi, and Tracker).
- If you select the **Show sandbox devices only checkbox** (3) it will show only developer devices claimed to your account.
- However if you are the product owner for a free sandbox tier product, all devices in that product count toward the device limit, even if they are not claimed to your account.

The [device list tool](/getting-started/products/creating-a-product/#device-list-details) can make it easier to understand the devices that do and do not count toward the 100 device limit.

{{top}}



#### Learn more

There's more information in the [Organizations Guide](/getting-started/products/organizations/).

If you've never created a product, see [Creating a product](/getting-started/products/creating-a-product/).
