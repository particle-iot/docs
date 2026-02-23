---
title: Environment Variables
columns: two
layout: commonTwo.hbs
description: Environment Variables (env vars)
---

{{!-- BEGIN shared-blurb 79e94a32-654d-4961-8498-5d7969690c4a --}}
Environment variables are a lightweight, non‑secret, key - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware, they allow configuration of both Device OS features and user features in a hierarchical manner from organization, the product, with optional per-device overrides.
{{!-- END shared-blurb --}}

## Variables

Environment variables are key - value pairs.

{{!-- BEGIN shared-blurb 436d14ef-9684-4d3e-85de-72de338ff565 --}}
- Variable names are uppercase letters, underscores and numbers only, and cannot start with a number.
- Maximum variable name length: 128 characters.
- Maximum variable value length: Not limited per variable.
{{!-- END shared-blurb --}}

The total size of all key - value pairs to be delivered to a device cannot exceed 16 Kbytes. This includes all variables from the organization, product, and device level.

## Hierarchical

### Organization products

For products in an organization (basic, plus, or enterprise), you can set environment variables at the organization, product, or device level.

> Organization &#x2190; Product &#x2190; Device

If a variable is set in multiple layers, the most specific (rightmost) setting is used.


### Sandbox products

For products in the free developer sandbox, you can set environment variables at the sandbox, product, or device level.

> Sandbox &#x2190; Product &#x2190; Device

If a variable is set in multiple layers, the most specific (rightmost) setting is used.

Environment variables, like ledger, are only used for devices in a product.

## Synchronized

When variables are changed at a given level, the changed are staged for delivery to devices. 

Added, removed, or changed variables can be delivered immediately to online devices. For devices that are offline, changes are delivered when the device connects to the cloud.

Optionally, you can have online devices also wait until the next cloud connection to update their variables when rolling out updates.



## Console

### Organization - Console

If you have access to an organization (basic, plus, or enterprise), you can set environment variables at the organization level in the **Organization - Configuration - Environment** section.

{{imageOverlay src="/assets/images/console/config-org.png" class="no-darken"}}


### Sandbox - Console

For the free developer sandbox, you can set environment variables in **Sandbox - Configuration - Environment** section.

{{imageOverlay src="/assets/images/console/config-sandbox.png" class="no-darken"}}

### Creating an environment variable

When you create your first environment variable in a scope, you will see a screen similar to this:

{{imageOverlay src="/assets/images/console/config-start.png" class="no-darken"}}

To create an environment variable, fill in this screen:

{{imageOverlay src="/assets/images/console/config-create.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 436d14ef-9684-4d3e-85de-72de338ff565 --}}
- Variable names are uppercase letters, underscores and numbers only, and cannot start with a number.
- Maximum variable name length: 128 characters.
- Maximum variable value length: Not limited per variable.
{{!-- END shared-blurb --}}

Once you've created a variable, you'll see a list of variables that you have created within this scope.

{{imageOverlay src="/assets/images/console/config-list.png" class="no-darken"}}

Creating a new variable does not immediately take effect. Once you have made all of the changes you intend to at this scope, click the **Next** button to roll out the changes.

{{imageOverlay src="/assets/images/console/config-rollout.png" class="no-darken"}}

Changes take effect immediately for online devices, and will be sent to offline devices when they next connect to the Particle cloud.

## Cloud API

Environment variables can be configured using the Cloud API. See the [Cloud API Reference](/reference/cloud-apis/api/#environment).

## Device OS

## Particle environment variables

### Networking

### Cellular

## Particle CLI



