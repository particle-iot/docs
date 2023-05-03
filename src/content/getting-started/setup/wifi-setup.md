---
title: Wi-Fi setup
columns: two
layout: commonTwo.hbs
description: Wi-Fi setup
---

# {{title}}

This page includes information on how to set up Wi-Fi on fleets of P2, Photon 2, or Argon devices. If you are interested in setting up a single device, see [setup options](/getting-started/setup/setup-options).

The recommended setup process for Wi-Fi device fleets:

- Add the device IDs of the devices to your product. If you order in tray quantities from the wholesale store you will be emailed this list, making the process simple.
- Install the desired version of Device OS on the device and flash your product firmware to the device

When your customer receives their device they will need to configure Wi-Fi so it can connect to their Wi-Fi network. There are several options:

- The recommended option is that you provide a custom mobile app for iOS and Android based on our React Native example app. This will allow the device to be configured by BLE from the customer's mobile device.
- We also have sample code for native iOS and Android that shows how to use the setup protocol over BLE, but this is not a complete setup app and you will need to do additional app development.

## Provisioning mode

Device provisioning mode allows for secure device setup over BLE (Bluetooth LE 5), typically from a mobile device (iOS or Android). This mode allows easier setup of P2, Photon 2, and Argon than the previous requirement of using listening mode (blinking dark blue):

- Provisioning mode can run concurrently with your user firmware, with or without a valid Wi-Fi connection. This makes it easier for users to reconfigure their Wi-Fi later without having to change the device mode first, typically using buttons. Instead, they can reconfigure right from your mobile app.
- Provisioning mode restricts interaction to devices running your product firmware. This prevents accidentally seeing and configuring other Particle devices including developer kits or devices associated with other products. This also prevents the mobile apps for other products from seeing your devices.

Previously, on the Photon and P1, setup could be done in listening mode (blinking dark blue) using USB serial (CDC) or by SoftAP, which allows setup over Wi-Fi. Setup over Wi-Fi from a mobile device is somewhat cumbersome because you need to use the mobile device Wi-Fi configuration settings to select a different Wi-Fi network. SoftAP is not available on newer devices.

## Wi-Fi provisioning vs. device setup

We highly recommend that you restrict customer device setup to only setting Wi-Fi credentials.

Previously, when using the Device Setup SDK for iOS and Android, Wi-Fi setup was mixed in with device claiming. This makes the process significantly more complicated. Product devices no longer need to be claimed, so eliminating this step saves a lot of effort.

## But how do I authenticate users?

The big change is that we no longer recommend making Particle REST API calls directly from your mobile app. This required getting Particle customer authentication tokens into your mobile app, which adds significant complexity.

Instead, we recommend that you handle authenticating your users entirely in your back-end. You might choose to implement your own, or use any number of common authentication schemes like authenticate with Facebook, Google, SMS, etc.. This also means that you no longer need to share any customer-specific information with Particle. You handle that entirely on your end.

## USB setup

A less common option is Wi-Fi setup over USB. This is typically done from a computer, Chromebook, or some Android phones and tablets. It is not possible to do this from iOS (iPhone or iPad), which is why BLE setup from a mobile app is generally preferred.


