---
title: Environment Variables
columns: two
layout: commonTwo.hbs
description: Environment Variables (env vars)
---

{{!-- BEGIN shared-blurb 79e94a32-654d-4961-8498-5d7969690c4a --}}
Environment variables are a lightweight, non‑secret, key - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware, they allow configuration of both Device OS features and user features in a hierarchical manner from organization, the product, with optional per-device overrides.
{{!-- END shared-blurb --}}

The feature is available in Device OS 6.4.0 and later.

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

When a device connects to the cloud a hash of the current environment is sent to the cloud and a new version is only sent if the device does not have the current environment snapshot for the device.

### Environment variable values

The value is a string that can be used for any data type, however, there are two built-in decoders in Device OS.

#### Boolean environment variable values

If the string has the value `true` or `false` (case-sensitive, lowercase), you can use the `bool` overload in Device OS.

```cpp
// EXAMPLE
bool enabled;
if (System.getEnv("ENABLE_DEBUG", enabled) && enabled) {
    // Variable was set and is value and true
}

// PROTOTYPE in System class
static bool getEnv(const char* name, bool& value);
```

#### Integer environment variable values

If the string has an valid 32-bit signed integer value, you can use the `int` overload in Device OS.

```cpp
// EXAMPLE
int value;
if (System.getEnv("RETRY_PERIOD", value)) {
    // Value was set, do something with it here
}

// PROTOTYPE in System class
static bool getEnv(const char* name, int& value);
```

### Editing an environment variable

When editing the environment, you can update or delete individual variables.

{{imageOverlay src="/assets/images/console/config-update-delete.png" class="no-darken"}}

Don't forget to rollout the changes to devices after updating.

{{imageOverlay src="/assets/images/console/config-update-rollout.png" class="no-darken"}}

## Cloud API

Environment variables can be configured using the Cloud API. See the [Cloud API Reference](/reference/cloud-apis/api/#environment).

## Device OS

To read environment variables from your code, you use functions like `System.getEnv()`. These are described in the [Device OS API reference](reference/device-os/api/system-calls/enviroment-variables-system/).

Device OS 6.4.0 or later is required.

## Particle environment variables

### Networking environment variables

### Cellular environment variables




