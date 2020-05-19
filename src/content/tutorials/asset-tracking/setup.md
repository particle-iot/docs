---
title: Setup
columns: two
layout: tutorials.hbs
order: 20
description: Setting up your Particle Asset Tracer
---

# Asset Tracker Setup

## Hardware Setup

### Tracker Evaluation Board

#### Powering

#### Status LEDs

### Tracker One

#### Powering

#### Status LEDs

## Create a product

All Asset Tracker devices are intended to be used in a product, not as developer devices. This makes it easy to manage a fleet of asset trackers, allowing per-fleet and per-device configuration settings, and features like fleet mapping. 

It's OK if you're starting out with a single Tracker; you can create a free prototyping level product that only has one device in it. From the [console](https://console.particle.io), click on the **Products** icon (1) then **New Product** (2).

![New Product](/assets/images/tracker/new-product.png)

When you create the product, be sure to select **Asset Tracker (Cellular** as the type.

![Create Product](/assets/images/tracker/create-product.png)

You will probably also want to opt into the storage of geolocation data. In the **Settings** (gear) icon, check the box to enable it. The privacy policy can be found [here](https://www.particle.io/legal/privacy/).

![Enable Storage](/assets/images/tracker/privacy-storage.png)


## Cloud Setup

These setup steps are intended for setting up a few developer trackers. Fleet setup steps are slightly different and can more easily be automated. For example, when you make a tray order of devices from the wholesale store, you get an email with the serial numbers of the devices.

### Get the device information

You can set up the device using the serial number on the sticker, it may be easier to just connect the device by USB and use the Particle CLI, which makes it easy to copy and paste instead of typing the serial number.

Hold down the MODE button until the status LED blinks dark blue (listening mode). Then use the Particle CLI command:

```
$ particle identify
Your device id is e00fce6851c5ffffffff4478
Your IMEI is 865284011111120
Your ICCID is 89014103271401111114
Your system firmware version is 1.5.3
```

### Add device to product

Select your Asset Tracker product and then the **Devices** icon. Click the **Add Devices** then **Add One Device**. Copy and paste the Device ID (24-character hex). You could also type the serial number in this box.

Adding the device to your product will automatically add the SIM card to the product as well.

If you want to be able to flash the device directly from Workbench, CLI, or the Web IDE, you will want click the **...** button on the right edge of the device list for your device and select **Mark development device**.

### Claim device

When using fleets of devices, it's not necessary to claim your device to an account. You will want to claim your device if:

- The device is a development device and you want to be able to flash code from Particle Workbench, CLI, or the Web IDE.
- You are using custom device firmware that subscribes to private events on the device. Only claimed devices can access private events.

In order to claim a device, it must be online and breathing cyan. If you've completed the steps above it should be now, and then you can use the CLI to claim. Replace `<device-id>` with your actual Device ID (24 character hex).

```
particle device add <device-id>
```

You may also want to name your device:

```
particle device rename <device-id> "Tracker-1"
```


## Device Firmware

One difference between the Tracker One and other Particle devices is that the Tracker One firmware can be used in three different ways:

- Completely off-the-shelf. With its cloud-based configuration, you can use the firmware as-is with no modifications in some cases.
- Semi-custom. The Tracker One firmware is customizable on-device making it possible to add new sensors and customize behavior while still making it easy to upgrade the base firmware.
- Custom. The Tracker One firmware is open-source so you can duplicate and modify it ("fork") for completely custom applications. Or build your own completely from scratch.

The Tracker firmware is included on the device from the factory instead of Tinker. 




