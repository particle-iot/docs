---
title: Move devices into a product
columns: two
layout: commonTwo.hbs
description: Move devices into a product
includeDefinitions: [api-helper, api-helper-cloud,  api-helper-extras, api-helper-json, codemirror, usb-serial]
---

# {{title}}

This control moves devices into a product from your developer sandbox or from another product.

- Moving devices from your developer sandbox into your product is useful if you are just now creating a product and want to use it instead of developer devices.
- If you are migrating the the growth plan, whenever possible you should move your entire product into your organization on the growth plan. This is generally painless and has no interruption in service. Moving individual devices from one product to another should only be done as a last resort because there numerous caveats and it can be be disruptive.

{{> sso}}

{{> cloud-api-product-device-move}}


**Moving a device into a product may have billing implications**, especially when moving devices from the free developer sandbox into a growth tier product, where additional devices could require additional blocks to accommodate the added devices. 


**Make sure destination has a default product release**

After moving the device, it will need to be flashed with the new product firmware. This is automatic if the destination product has a default firmware release.

If it does not, you will need to lock and flash, or mark as developer device and manually flash the firmware.

**Do not use with customer claiming!**

This tool should only be used if you claim your devices to a single account, a small number of team member accounts, or leave devices unclaimed.

If you are using simple auth customers or two-legged shadow customers, you should not use this tool. The reason is that customers are defined in the product, and not only does this tool not move them, it's not possible to do so without breaking the authentication tokens for the user.

If you are using customer claiming (more common with Wi-Fi) you should avoid switching products because it can be very disruptive!

**Beware of wildcard PRODUCT_ID**

If you are using the wildcard product ID (`PRODUCT_ID(PLATFORM_ID)`), instead of your specific product ID in your product firmware, the version comparison is only done by version number. Thus if the destination product has the same version number as the source product, it will not get flashed with the new product firmware correct. You can correct this using Lock and Flash, then unlocking.


**Offline devices and quarantine**

If you move devices from a product into another product and they are offline, you may see them appear in quarantine in the source product. This is normal, because the device will go online with the old firmware, then the cloud will determine that they're part of a new product, then get the new product firmware. Once the device comes online with the new product firmware successfully they'll be removed from quarantine on the old product.

Do not approve the devices in quarantine in the old product, or they may be moved back to the old product!


**Disable auto-approve new product devices in source product**

If you are not using a wildcard product ID you must disable auto-approve new product devices in the source product before moving devices if you are moving devices that are currently offline.

The reason is that when the devices come online after moving, they'll still have the old product firmware. If auto-approve is enabled, they'll then get added back into the old product, negating the effects of the move.

**oAuth tokens**

If you are using oAuth tokens created via the Authentication tab in a user account (when moving from developer sandbox) or in a product (when moving to a different product), these tokens will no longer work when using the new product. You must create new oAuth tokens from a new client ID and secret created in the destination product. It's not possible to transfer oAuth tokens between accounts or products.
