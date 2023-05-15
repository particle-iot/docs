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

You would normally include this within your standard product firmware to allow both device provisioning and your normal application. 

#### Standard mobile secret firmware

This is the standard firmware that uses the mobile secret that is set at the factory. You would typically need to use a data matrix decoded in your mobile app to read this off the serial number sticker. This example should be used with the iOS native example, below.

- Device Name: `aabbcc`
- Mobile Secret: (set at factory, varies by devices and is encoded in the data matrix code on the serial number sticker)

{{> project-browser project="ble-provisioning" default-file="src/ble-provisioning.cpp" height="400" flash="true" options="gen3" target=">=3.3"}}

#### Fixed mobile secret firmware

This example shows how to use a fixed mobile secret. In this case it's set to `AAAAAAAAAAAAAAA` (15 uppercase letter A). Using a fixed mobile secret is less secure, but you do not need to scan the serial number sticker, so it may be an acceptable trade-off in some cases. This example is easier to use with the React Native and Android native examples since you don't need to read the data matrix sticker to get your device's mobile secret and can just paste in that string.

- Device Name: `aabbcc`
- Mobile Secret: `AAAAAAAAAAAAAAA` (it must be 15 characters in length)

{{> project-browser project="ble-provisioning3" default-file="src/ble-provisioning3.cpp" height="400" flash="true" options="gen3" target=">=3.3"}}


## React native example

The react native example is designed to be built using [Expo](https://expo.dev/). Using Expo EAS is fast and easy, and eliminates the need to install the full development environments (Xcode for iOS and Android Studio for Android) because it can build in the cloud. The free tier allows 30 cloud builds per month, though iOS counts as 2 builds. You can pay on demand, or purchase a production plan with a large number of builds. Additionally, the Expo cloud build allows you to build iOS apps from Windows, which is not normally possible.

You can, however, export a native project that can be built with native development tools, as well.

- Download the [react native example](https://github.com/particle-iot/rn-ble-setup) from Github
- Make sure node 16 or above is installed with npm 8 or above. 
- You will also need a global install of [yarn](https://classic.yarnpkg.com/lang/en/docs/install/).

Install the dependencies using:

```
cd rn-ble-setup
npm install --legacy-peer-deps
```

The `--legacy-peer-deps` is because the setup application uses `react@18` and the setup library uses `react@^17.0.2`, but does work properly with `react@18` and that option allows the peer dependency in the setup library to be ignored.

You will need to configure two settings in app.json in the project. These should be set to your domain instead of Particle:

```
    "ios": {
      "bundleIdentifier": "io.particle.blesetup",
```

```
    "android": {
      "package": "io.particle.blesetup",
```


You will also need to install the Expo [eas-cli](https://docs.expo.dev/eas-update/getting-started/) globally:

```
npm install --global eas-cli
```

If you are going to be using cloud builds, you should also install the **Expo Go** mobile app. 

### iOS development app - react native

Building an iOS app using Expo EAS is as easy as:

```
npx eas build -p ios --profile development 
```

This will do a cloud build of the iOS app, and eliminates the need to install a local development environment. In the Expo EAS cloud build, iOS builds are more expensive, as they could as two builds in the free plan, and are $2 instead of $1 a la carte. You may want to do initial development and testing on Android for this reason.

Follow the instructions when prompted to connect to your Apple developer account, register your device with Expo (if you have not already done so), and install and run the demo app.


### Android development app - react native

```
npx eas build -p android --profile development 
```

This will do a cloud build of the Android app, and eliminates the need to install a local development environment.

Follow the instructions when prompted to register your device with Expo (if you have not already done so), and install and run the demo app.


### Export native source

Instead of using the Expo EAS cloud build service you can export source to build using native tools.

This will create a project that can be opened in Xcode on a Mac to build an iOS mobile app:

```
npx eas build -p ios --profile development --local
```

This will create project that can be opened in Android Studio to build an Android app:

```
npx eas build -p android --profile development --local
```

## iOS native example

- Download the [iOS native example](https://github.com/particle-iot/iOSBLEExample) from Github
- Install XCode
- Enable your iOS device for development mode (BLE cannot be used in the emulator)
- Flash the "standard mobile secret firmware" above to Particle P2, Photon 2, or Argon.
- You will need an Apple developer account in order to be able to sign the binaries, create provisioning profiles, etc.

### Settings - iOS native example

- Select your team in General - Targets iOSBLEExample
- Make sure a provisioning profile and signing certificate are selected
- Build an run the example


## Android native example

The Android example app is not a fully functional setup application. 


### Settings

- Download the [Android native example](https://github.com/particle-iot/AndroidBLEExample) from Github
- Tested with Android Studio Flamingo
- [Enable developer options](https://developer.android.com/studio/run/device) on your Android device (the emulator cannot be used with BLE)
- Follow the instructions in the README of the AndroidBLEExample repository
- It is OK to upgrade the Android Gradle Plug-in using the automatic tool
- Flash the "fixed mobile secret firmware" above to Particle P2, Photon 2, or Argon.

The Android sample app does not handle scanning the data matrix code on the device. The fixed mobile secret firmware sets it to `AAAAAAAAAAAAAAA` (15 of the uppercase letter A).

Note that the setup code is the value set in the firmware using `BLE.setDeviceName` and is set to `aabbcc`. From the factory, this would be the last 6 characters of the serial number instead. You would probably set this to be your product or company name.

In app - java - io.particle.bleexample - MainActivity, update the `setupCode` (device name) and `mobileSecret`:

```
private final String setupCode = "aabbcc";
// Mobile secret available on the QR sticker on the device
private final String mobileSecret = "AAAAAAAAAAAAAAA";
```

- Run the application on your Android device.
- You will need to allow precise location, because access to local BLE devices requires this.





## USB setup

A less common option is Wi-Fi setup over USB. This is typically done from a computer, Chromebook, or some Android phones and tablets. It is not possible to do this from iOS (iPhone or iPad), which is why BLE setup from a mobile app is generally preferred. This only works with Chrome, Edge, and Opera. It does not work on Safari or Firefox browsers.

To use this built-in tool, connect your P2, Photon 2, or Argon by USB and use the **Connect** button.

{{> device-setup-usb mode="wifi"}}

If you'd like to implement this same technique from your own web site, you can find an example app in Github at [https://github.com/particle-iot/wifi-setup-usb-example](https://github.com/particle-iot/wifi-setup-usb-example).

