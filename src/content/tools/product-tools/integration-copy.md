---
title: Copy integrations into a product
columns: two
layout: commonTwo.hbs
description: Copy integrations into a product
includeDefinitions: [api-helper, api-helper-cloud, api-helper-extras]
---

# {{title}}

This control copies integrations (such as webhooks) into a product (sandbox or organization) from your developer sandbox.

{{> sso}}

{{> cloud-api-integration-move}}

### Product integrations

The recommended location for webhooks for product devices is within the product configuration. Product integrations can be triggered for any device in the product device fleet, including development devices and unclaimed devices. Make sure you are opening the Integrations tab after going into the product to see this list.

This is necessary if you are using product customers, where claiming will occur to many accounts. Since product customers cannot log into the console, they do not have customer-specific integrations.

Unclaimed product devices cannot receive the response from a product webhook, but they can still send to the webhook.

### Device owner integrations

An integration in the device owner's account can also trigger for a product device event. This is generally not the best place to put the integration, even if you are claiming devices to a single account, as it means development devices must be claimed to the shared account, which is inconvenient for OTA flashing during development.

Also all team members can access product integrations with their own login. They would need to log in as the device owner account to see a device owner integration.

Beware: If you have two integrations, one in the owner account and one in the product, both can fire if they have the same event trigger!

