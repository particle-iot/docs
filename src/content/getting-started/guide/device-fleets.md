---
title: Device fleets
columns: two
layout: commonTwo.hbs
description: Managing a fleet of devices
---

# {{title}}

{{section-nav}}

This code demonstrates two features: environment variables and device fleets

### Environment variables
{{!-- BEGIN shared-blurb 79e94a32-654d-4961-8498-5d7969690c4a --}}
Environment is a collection of lightweight, non‑secret, name - value pairs that shape the runtime environment. They are ideal for fast, system level adjustments (endpoints, feature flags, polling intervals) without changing firmware. Available in the cloud and in the firmware, they allow configuration of both Device OS features and user features in a hierarchical manner from organization, the product, with optional per-device overrides.
{{!-- END shared-blurb --}}

Environment variables are available in Device OS 6.4.0 and later. If you build the firmware with a target of an older version of Device OS, it will still build, but without the functionality so you can still test the fleet functionality.

For more information, see [Environment](/getting-started/configuration/environment/).

### Device fleets

A powerful feature is device fleets, which allows you to group devices with a common set of firmware and manage them as a group, allowing automatic firmware updates and fleet monitoring.

Any product can have multiple devices, including those in the free tier.

## Firmware

As in the previous section, you can either:

- **Particle: Create New Project**, create CloudLed, and paste the contents CloudLed.cpp file into your file.
- Download the zip file, extract, then **Particle: Import Project**.

{{> project-browser project="CloudLed2" default-file="src/CloudLed2.cpp" height="400" flash="true"}}

As in the previous section, also do:

- **Particle: Configure project for device**
- **Particle: Flash application (local)**

## Explaining the code

The code is mostly the same as before. 

Setting `PRODUCT_VERSION` is necessary for fleet firmware updates. The version number must be embedded in the firmware this way for it to be tracked properly. We'll upload the built version to the cloud later.

```cpp
PRODUCT_VERSION(1);
```

In setup(), there's this block of code:

The check for `HAL_PLATFORM_ENV` includes this code only when targeting versions of Device OS that support environment variables (Device OS 6.4.0 and later). A similar technique can be used for checking for cellular, Wi-Fi, etc.. See [Checking for features](/reference/device-os/api/checking-for-features/) for more information.

The [System.getEnv()](/reference/device-os/api/system-calls/enviroment-variables-system/) call gets the variable of an environment variable.

Environment variables set from the cloud are delivered to the device as an OTA update and the device reset. An environment variable will never change while your code is running, and it will available immediately at boot, before cloud connecting.

```cpp
#if HAL_PLATFORM_ENV
    // On platform and Device OS version that support environment variables, allow a startup color to be defined
    String value;
    if (System.getEnv("STARTUP_COLOR", startupColor)) {
        Log.info("STARTUP_COLOR=%s", startupColor.c_str());
    }
#endif // HAL_PLATFORM_ENV
```

The business logic in loop() takes care of calling setColor once after cloud connecting with the value set by the environment variable. After the normal 10 second expiration period expires, the device reverts to using the system color (breathing cyan). It also supports function calls to change the color at runtime as in the previous example.

```cpp
    if (Particle.connected() && !startupColorShown && startupColor.length()) {
        // There is a startup color and it has not been shown yet so show it now
        startupColorShown = true;
        setColor(startupColor);
    }
```    

### Setting an environment variable


## Setting up a device fleet



{{section-nav}}

