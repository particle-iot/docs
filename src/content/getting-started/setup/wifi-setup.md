---
title: Wi-Fi setup
columns: two
layout: commonTwo.hbs
description: Wi-Fi setup
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-projects, api-helper-protobuf, api-helper-usb, api-helper-extras, api-helper-tickets, webdfu, zip]
---


# {{title}}

This page includes information on how to set up Wi-Fi on fleets of P2, Photon 2, or Argon devices. If you are interested in setting up a single device, see [setup options](/getting-started/setup/setup-options).

## Introduction

The recommended setup process for Wi-Fi device fleets:

- Add the device IDs of the devices to your product. If you order in tray quantities from the wholesale store you will be emailed this list, making the process simple.
- Install the desired version of Device OS on the device and flash your product firmware to the devices.

When your customer receives their device they will need to configure Wi-Fi so it can connect to their Wi-Fi network. There are several options:

- The recommended option is that you provide a custom mobile app for iOS and Android based on our React Native example app. This will allow the device to be configured by BLE from the customer's mobile device.
- We also have sample code for native iOS and Android that shows how to use the setup protocol over BLE, but this is not a complete setup app and you will need to do additional app development.

### Provisioning mode

Device provisioning mode allows for secure device setup over BLE (Bluetooth LE 5), typically from a mobile device (iOS or Android). This mode allows easier setup of P2, Photon 2, and Argon than the previous requirement of using listening mode (blinking dark blue):

- Provisioning mode can run concurrently with your user firmware, with or without a valid Wi-Fi connection. This makes it easier for users to reconfigure their Wi-Fi later without having to change the device mode first, which previously required using physical buttons. Instead, they can reconfigure right from your mobile app.
- Provisioning mode can restrict interaction to devices running your product firmware. This prevents accidentally seeing and configuring other Particle devices including developer kits or devices associated with other products. This also prevents the mobile apps for other products from seeing your devices.

Previously, on the Photon and P1, setup could be done in listening mode (blinking dark blue) using USB serial (CDC) or by SoftAP, which allows setup over Wi-Fi. Setup over Wi-Fi from a mobile device is somewhat cumbersome because you need to use the mobile device Wi-Fi configuration settings to select a different Wi-Fi network. SoftAP is not available on newer devices.

### Wi-Fi provisioning vs. device setup

We highly recommend that you limit customer device setup to only setting Wi-Fi credentials.

Previously, when using the Device Setup SDK for iOS and Android, Wi-Fi setup was mixed in with device firmware upgrade and device claiming. 

Claiming makes the process significantly more complicated because of the need to manage customer accounts and access tokens. Product devices no longer need to be claimed, so eliminating this step saves a lot of effort.

Likewise, the [web-based Particle device setup](https://setup.particle.io/) and the old Particle mobile apps have features for upgrading Device OS. Instead, we recommend that you set up the devices ahead of time with the appropriate Device OS and firmware, which eliminates the need to include that functionality in the mobile app, and also makes the setup process significantly faster for your users.

### How do I authenticate users?

The big change is that we no longer recommend making Particle REST API calls directly from your mobile app. This required creating Particle customer accounts and storing authentication tokens into your mobile app, which adds significant complexity.

Instead, we recommend that you handle authenticating your users entirely in your back-end. You might choose to implement your own, or use any number of common authentication schemes like authenticate with Facebook, Google, SMS, etc.. This also means that you no longer need to share any customer-specific information with Particle. You handle that entirely on your end.

### Provisioning settings

There are a number of configurable parameters needed for device provisioning:

- BLE service UUIDs. These are embedded in the device firmware and also in your mobile app. Changing these settings prevents other mobile apps from being able to interact with your devices.

- BLE device name or setup code. From the factory, this is the last 6 characters of the serial number. Imagine a classroom of users who are all trying to set up their devices at the same time over BLE. The device name makes sure they set up the device in their hand instead of a different nearby device. However, you can also set this to a constant value, for example the name of your product, to simplify setup.

- Mobile secret. Every Particle device has a mobile secret written to it at the factory. It's also printed on in the data matrix code (similar to a QR code) on the serial number sticker. This is used for secure communication over BLE between your mobile app, which has presumably scanned the data matrix code, and the device, which already knows its mobile secret stored in flash memory. You can, however, configure the mobile secret to be a single pre-shared secret across all of your product devices. This is less secure, since an attacker who is nearby, knows the pre-shared secret, and is listening at the time of Wi-Fi configuration, could intercept and decrypt the communications. 

If multiple users setting up your product in close proximity is unlikely, and the highest level of security is not necessary, setting both a constant device name and mobile secret eliminates the need to scan the serial number sticker, which may be desirable trade-off for user setup simplicity.

### Provisioning firmware

You would normally include this within your standard product firmware to allow both device provisioning and your normal application. This code will allow you to easily 

{{> project-browser project="ble-provisioning" default-file="src/ble-provisioning.cpp" height="400" flash="true" options="gen3" target=">=3.3"}}


## React native example

## iOS native example

## Android native example

The Android example app is not a fully functional setup application. 

## USB setup

A less common option is Wi-Fi setup over USB. This is typically done from a computer, Chromebook, or some Android phones and tablets. It is not possible to do this from iOS (iPhone or iPad), which is why BLE setup from a mobile app is generally preferred. This only works with Chrome, Edge, and Opera. It does not work on Safari or Firefox browsers.

To use this built-in tool, connect your P2, Photon 2, or Argon by USB and use the **Connect** button.

{{> device-setup-usb mode="wifi"}}

If you'd like to implement this same technique from your own web site, you can find an example app in Github at [https://github.com/particle-iot/wifi-setup-usb-example](https://github.com/particle-iot/wifi-setup-usb-example).

