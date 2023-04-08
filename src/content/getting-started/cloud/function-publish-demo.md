---
title: Function and publish demo
columns: two
layout: commonTwo.hbs
description: Function and publish demo
includeDefinitions: [api-helper,api-helper-cloud,api-helper-events,api-helper-extras,api-helper-library,api-helper-projects,usb-serial,webhook-demo,zip]
---

# {{title}}

This is an interactive tutorial that show the difference between functions and subscribing to Particle events on-device, and how you can use these techniques to send commands to remote devices. To fully experience the demo, you should have two or more devices of the same type. Both cellular and Wi-Fi devices are supported, however this demo does not work with the Tracker and isn't useful if your device does not have a visible status LED.

In order to use this tutorial, you must be logged into your Particle account:

{{> sso}}

## Cloud setup

### Select a product

You should typically start with a product. You'll eventually need one to scale, and it makes it easier to group devices. 

This demo requires a product, and you should create a new one just for this demo. Each product can only have a single device platform, so you must select that first.

{{> webhook-demo-select-product}}

You can find all of your sandbox products in the {{webhook-demo-link link="sandbox/products" text="productsTab"}} in the Particle console.

### Start demo

Starting the demo will start monitoring events and set up the product you have selected.

{{> webhook-demo-start mode="function-publish" options="noTracker"}}

### Product setup

{{> webhook-demo-product-config options="functionPublishApiUser,functionPublishWebhook,functionPublishDeviceGroups,functionPublishFirmware"}}

### Add devices to product

Whenever you have a product, you must add devices to it. When you scale, you will typically add all of the devices in your order at once, as you will be emailed a list of the Device IDs in your order. In the growth and enterprise plans, just adding the Device ID to the product does not affect billing; billing only starts the first time the device connects to the Particle cloud.

For this demo, you can just select existing devices from your developer sandbox to use in this tutorial. If you do not have a device yet, you can skip this step and use the **Test** feature to show how the webhook works without a device.

{{> webhook-demo-add-devices}}

You will normally use the **Add Devices** button in the {{webhook-demo-link link="devices" text="devices tab"}} in the console to do this in your real products.

## Testing

The test firmware updates the status LED color of the device on request from the cloud in several situations:

- A function call to the specified device
- A publish of the `setColor` event to all devices in the product
- A publish to the group-specific event, such as `groupa/setColor`. This event will trigger all devices in `groupa` to set their status LED color.

### Your device fleet

This control shows the status of devices in your product fleet. It's similar to the {{webhook-demo-link link="devices" text="devices tab"}} in your product in the console.

{{> webhook-demo-fleet options="groupSelector"}}

Use the `groupa` and `groupb` checkboxes to set some devices to `groupa` and some to `groupb`. A device can be in more than one group, if desired.

The test firmware uses a library to allow the device to monitor its device group assignments and automatically change what it responds to within a few seconds of changing the settings using the control above.

If the device is offline or in sleep mode, it will get the current device group settings from the cloud after it comes online.

### Functions

{{> webhook-demo-function-publish-function}}

This control will set the status LED of the specified device to the specified color for 10 seconds.

Functions are directed at a single device, by its Device ID. This is good when you want to control a single device at a time.

You can only call functions when the device is online. If the device is turned off or in sleep mode, the function call will fail with an error.

Unlike publish, however, the error indicates that the function was or was not handled. With publish, there is no indication to the caller whether any device received the publish.

### Publish

{{> webhook-demo-function-publish-publish}}

This control will set the status LED of all devices or certain device groups to the specified color for 10 seconds.

Publish goes out to zero or more devices. This is handy when you need to broadcast to many devices, or a selection of devices, at the same time.

The downside is that you don't know whether any devices received the publish, and if the device is offline, the publish is lost forever and the device will not receive it later.

## Firmware explanation

{{> project-browser project="function-publish-demo" default-file="src/function-publish-demo.cpp" height="400" flash="true"}}

## Clean up

If you are done using this tutorial, you can clean up the things that were created during this tutorial.

{{> webhook-demo-cleanup }}

Don't forget to turn off your device or flash different firmware (or Tinker) to it so it doesn't continue to publish events and use data operations.
