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

{{> webhook-demo-product-config options="functionPublishApiUser,functionPublishWebhook,functionPublishDeviceGroups"}}

### Upload firmware to product

{{> webhook-demo-upload-firmware }} 


{{> project-browser project="function-publish-demo" default-file="src/function-publish-demo.cpp" height="400" flash="true"}}


### Add devices to product

Whenever you have a product, you must add devices to it. When you scale, you will typically add all of the devices in your order at once, as you will be emailed a list of the Device IDs in your order. In the growth and enterprise plans, just adding the Device ID to the product does not affect billing; billing only starts the first time the device connects to the Particle cloud.

For this demo, you can just select existing devices from your developer sandbox to use in this tutorial. If you do not have a device yet, you can skip this step and use the **Test** feature to show how the webhook works without a device.

{{> webhook-demo-add-devices}}

You will normally use the **Add Devices** button in the {{webhook-demo-link link="devices" text="devices tab"}} in the console to do this in your real products.

### Your device fleet

This control shows the status of devices in your product fleet. It's similar to the {{webhook-demo-link link="devices" text="devices tab"}} in your product in the console.

{{> webhook-demo-fleet options="groupSelector"}}


### Functions

{{> webhook-demo-function-publish-function}}

### Publish

{{> webhook-demo-function-publish-publish}}

