---
title: Firmware release process
columns: two
layout: commonTwo.hbs
description: Firmware release process
---

# {{title}}

One of the most valuable features of a Particle product is being able
to seamlessly manage firmware on a fleet of IoT devices. You now have
the ability to continuously improve how a device functions after
deployment. In addition, product firmware management allows you to
quickly and remotely fix bugs identified in the field, fleet-wide.

This happens through **firmware releases**, which targets some or all of
a device fleet to automatically download and run a firmware binary.

## Recommended development flow

{{step-diagram op="start"}}
```json
{
    "width": 450,
    "steps": [
        {
            "title": "Iteratively write and test firmware"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Upload firmware to product"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Release firmware for further testing"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Release firmware to device fleet"
        }
    ]
}
```
{{step-diagram op="end"}}

## Iteratively write and test firmware

In most cases we recommend having one or more devices on each developer's desk for local testing.

- Development is done in [Particle Workbench](/getting-started/developer-tools/workbench/)
- The device is flashed by USB
- [Status LED](/troubleshooting/led/) and buttons are easily accessible
- The [USB serial debug logs](/firmware/best-practices/usb-serial/) can be easily accessed
- A CMSIS/DAP debugger can be used (optional)

### Mark development

This options are also available from the device list in the **...** button.

{{imageOverlay src="/assets/images/console/product-device-list-options.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 74f89cd2-5118-4233-9b9d-7f64a2322a0a --}}
Using **Mark development** does several things:

- Disables fleet flashing to the device. If you are doing active development and flashing your device by USB or OTA directly from Particle Workbench you need to enable Mark Development, otherwise the cloud may immediately overwrite the firmware you flashed with the product default or pinned versions.
- Enables override for all typed configuration settings for Tracker devices.
- Allows local flashing by USB for devices with device protection enabled (enterprise accounts only).
{{!-- END shared-blurb --}}

You can tell which devices have Mark development set by the tool icon to the right of the version number in the product device list.

{{imageOverlay src="/assets/images/console/product-device-development.png" class="no-darken"}}

### Add a PRODUCT_VERSION

When preparing software for your product, you must include product version at the top of the firmware source code. This must also match the version specified when uploading the firmware as product firmware.

This must be added to your main .cpp file, not in a function, and after `#include "Particle.h"`.

```cpp
PRODUCT_VERSION(1); // increment each time you upload to the console
```

Devices that are marked as development devices do not need a valid `PRODUCT_VERSION`, but may include it to make it easier to use the firmware on a fleet.


### PRODUCT_ID

With Device OS 4.0 and later, you only need the `PRODUCT_VERSION` and not the `PRODUCT_ID`.  

{{collapse op="start" label="Show older information"}}

{{!-- BEGIN shared-blurb 13e6f38f-8576-4245-8b7e-d0e77acd5d5b --}}
#### Device OS 4.0 and later

In Device OS 4.0 and later, the `PRODUCT_ID` macro is no longer used. If you attempt to use it, you will get an error during compilation targeting 4.0.0 and later.

```
The PRODUCT_ID macro must be removed from your firmware source code. The same compiled firmware binary may be used in multiple products that share the same platform and functionality.
```

You must also pre-add all Device IDs that will be using your product when using Device OS 4.0 and later. There is no support for quarantine mode or auto-approve modes. The only way to add a device to a product is to do it using the console or cloud API before the device first connects to the cloud.

You still need to include `PRODUCT_VERSION`.

#### Device OS before 3.x and earlier

When preparing software for versions of Device OS before 4.0 it is essential to include your product ID and version at the top of the firmware source code.

```cpp
// EXAMPLE 3.x and earlier
PRODUCT_ID(94); // replace by your product ID
PRODUCT_VERSION(1); // increment each time you upload to the console
```

You can find more details about the product ID and how to get yours in the [_Console_ guide.](/getting-started/console/console/#your-product-id)

#### Device OS 1.5.3 to 3.x Wildcard

In Device OS 1.5.3 and later, but before 4.0, you can also use a wildcard product ID. In order to take advantage of this feature you must pre-add the device IDs to your product as you cannot use quarantine with a wildcard product ID. Then use:

```cpp
// EXAMPLE 1.5.3 to 3.x with wildcard product ID
PRODUCT_ID(PLATFORM_ID);
PRODUCT_VERSION(1); // increment each time you upload to the console
```

This will allow the device to join the product it has been added to without hardcoding the product ID into the device firmware. This is used with the Tracker SoM to join the product it is assigned to with the factory firmware and not have to recompile and flash custom firmware. 

The behavior with 4.0 and later is similar to using a wildcard product ID, but you simply omit the `PRODUCT_ID`.

If you want to make your product firmware compile both before and after 4.0, you could use something like:

```cpp
#ifndef SYSTEM_VERSION_v400ALPHA1
// Include this only for versions prior to 4.0.0-alpha.1
PRODUCT_ID(PLATFORM_ID)
#endif
```
{{!-- END shared-blurb --}}

{{collapse op="end"}}

### Obtain a binary

Particle user firmware is stored in a `.bin` file. When you compile locally it will be in: `target`/(version)/(platform)/(project name)`.bin` in your project directory. In this example target/6.4.1/boron/CloudLed2.bin.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-firmware-local.png" class="no-darken"}}

If you've cloud compiled your firmware, it will be in a firmware.bin file in the top level of your project. The name may be different but will follow that general pattern.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-firmware-cloud.png" class="no-darken"}}

## Upload firmware to product

To upload firmware, go to your product, Cloud services, then Firmware.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-04.png" class="no-darken"}}

The page will show any firmware you have previously uploaded. Use **Upload firmware** to upload new firmware.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-05.png" class="no-darken"}}

Fill in the parameters. The version must match the `PRODUCT_VERSION()` in your code. The version numbers are allocated sequentially.
{{imageOverlay src="/assets/images/getting-started-guide/fleet-06.png" class="no-darken"}}

## Release firmware for further testing

If you've already tested your firmware on your desk you can skip this step.

Using the pinned version feature, you can set the firmware on a single device to a version you've uploaded before flashing it to more of the fleet.

Open your product and a specific device. Click **Edit** in the upper right corner of the window.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-14.png" class="no-darken"}}

In the **Firmware** section you can select the version to flash. You will typically also select **Flash now** to do an Intelligent OTA update immediately.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-15.png" class="no-darken"}}

The pop up menu contains a list of all of the firmware versions for your product.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-16.png" class="no-darken"}}

The device list will show a pending update in the version column.
{{imageOverlay src="/assets/images/getting-started-guide/fleet-17.png" class="no-darken"}}

Once the version has been flashed you can see that the version has been pinned by the push pin next to the version number. You can click on it to remove the pin and restore the device to the product or group default.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-18.png" class="no-darken"}}


## Release firmware to device fleet

To release a version of your firmware, in the firmware list click **Release firmware** on the right side.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-07.png" class="no-darken"}}

Select the devices you want to flash to, either a device group or **Product default**. 

You will normally use a device group with one or a small number of devices to test your firmware before a wide deployment.

In order to set the Product default the firmware must be running on at least one device.

Intelligent updates flash the device immediately, if possible, or when the device next comes online. This is usually the best choice.

{{imageOverlay src="/assets/images/getting-started-guide/fleet-08.png" class="no-darken"}}

Finally, confirm the update. 

{{imageOverlay src="/assets/images/getting-started-guide/fleet-09.png" class="no-darken"}}

Here's the updated device list. Of note:

- All devices are online (cyan dot to the left of the ID), and the status is **Online**
- 3 of the devices are unnamed; this is common, though you can name every device if you want to
- All are running firmware v1
- 3 of the devices have no owner. This is normal for device fleets

{{imageOverlay src="/assets/images/getting-started-guide/fleet-10.png" class="no-darken"}}

## Firmware precedence rules

Devices in your fleet will be targeted to
receive a version of product firmware according to these precedence
rules:

- A device that has been **individually locked** to a version of product
firmware is respected above all else, and will not be overwritten by any
released firmwares.

- If unlocked, devices **belonging to a group** will receive the
corresponding group's released firmware (if a firmware has been released
to the group). When a device belongs to multiple groups that each have
released firmware, the _highest firmware version_ will be preferred

- If a device is unlocked and **does not belong to any groups** with
released firmware, it will receive the **Product default** released
firmware (if a firmware has been released as the Product default)

- If none of the above conditions result in a device being targeted for
a product firmware, it will not receive an automatic OTA update from the
Particle cloud

## Next steps

You may want to consider automating the firmware build and upload process using [Github actions](/firmware/best-practices/github-actions/).

