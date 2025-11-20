---
title: Product Device Flash USB
columns: two
layout: commonTwo.hbs
description: Product Device Flash USB
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-protobuf, api-helper-usb, api-helper-extras, debug-log, webdfu, zip]
---

# {{title}} (Beta)

This tool flashes Device OS and product firmware to a device over USB. You must be a product or organization team member and the device must already have been added to the product.

{{> sso }}

{{> device-setup-usb mode="product"}}

