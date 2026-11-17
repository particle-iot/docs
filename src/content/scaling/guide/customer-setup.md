---
title: Customer setup
columns: two
layout: commonTwo.hbs
description: Setting up devices for your customers
guide-custom-images: default
---

# {{title}}

{{section-nav}}

The final step of the process will be your customers setting up their device, which will mostly be dependent on the choices you have made so far.

{{content-nav}}

## Cellular devices (pre-configured)

If your product is semi-custom, pre-configured for each user, they will probably only need to power up the device.

This will also be simple if the customer does not have a web or mobile user interface, for example if they are just feeding data into your infrastructure.

- shipping mode

## Cellular devices (other)

In some cases, you will need your customer to associate their device with an account you have created for this, either using a web application or mobile application.

There are too many possibilities to list here, but typically this is done by entering information such as a serial number (either your own number, or Particle's) into a web or mobile app. This is mostly standard front-end and back-end implementation, and is not really specific to Particle, so it is generally straightforward for most web or mobile developers to create such as solution for you.

## Wi-Fi devices

The most complicated scenario is for Wi-Fi devices, because your customer will need to configure their Wi-Fi credentials into the device. This will typically require a mobile app or a computer with a USB connection to the Particle device.

See [Wi-Fi setup options](reference/device-os/wifi-setup-options/) for more information about Wi-Fi setup.

{{section-nav}}


