---
title: Webhook demo
columns: two
layout: commonTwo.hbs
description: Webhook demo
includeDefinitions: [api-helper,api-helper-cloud,api-helper-extras,api-helper-projects,stackblitz,zip]
---

# {{title}}

{{> sso}}

## Cloud setup

### Select a device

To begin, select a device from your Particle account:

{{> device-select options="deviceInfo"}}

### Create a product

### Add device to product

### Mark device as development

### Create a product webhook


## Device firmware


## Demo server

In order to use webhooks, you need to have a server to receive the requests. This could be running on your own server, or a cloud-based server, but this example runs right in your web browser.

The server is written in node.js (Javascript) using the ExpressJS framework. 

{{> stackblitz-embed project="node-mx6mjb" width="700" height="500"}}

## Testing

### Device logs

If you have your Particle device connected by USB to your computer (Windows, Linux, Mac, or Chromebook), and you are using the Chrome web browser, you can monitor your device's USB serial debug log from this interactive control. You can also use `particle serial monitor` from the Particle CLI if you prefer. Both are optional, but are good for troubleshooting.


### Cloud logs


