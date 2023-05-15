---
title: Wi-Fi setup
columns: two
layout: commonTwo.hbs
description: Wi-Fi setup
includeDefinitions: [api-helper, api-helper-cloud, device-setup-usb, api-helper-projects, api-helper-protobuf, api-helper-usb, api-helper-extras, api-helper-tickets, webdfu, zip]
---

# {{title}}

This page includes information on how to set up Wi-Fi on fleets of P2, Photon 2, or Argon devices. If you are interested in setting up a single device, see [setup options](/getting-started/setup/setup-options).

### Provisioning mode

BLE provisioning mode is an alternative to listening mode (blinking dark blue) that allows customization of the user experience. For example:

- You will typically use custom service UUIDs, so your mobile app will only see devices with your firmware, not other Particle developer kits.
- Likewise, other products' mobile apps won't see your devices.
- Customizable device names and company ID.

Unlike listening mode (blinking dark blue), BLE provisioning mode:

- Can run concurrently with your user firmware, allowing your mobile app to communicate directly with the device over BLE without putting the device in a specific mode.
- This also means that Wi-Fi credentials can be reconfigured without requiring an external button.
- Does not interrupt the cloud connection if used after connecting to the cloud.

In order to use BLE provisioning mode, you must already have added the device to your product and flashed your user firmware to it. The onboarding process will typically be:

- Add the Device IDs you will be using to your product. When you order in tray or reel quantities from the Particle wholesale store you will be emailed this list.
- Flash your product firmware to your devices by USB or SWD/JTAG.

Additionally, you will need something for your customers to configure their Wi-Fi credentials. There are a number of options:

- Particle React Native sample application for iOS and Android
- Custom iOS native sample application
- Custom Android native sample application
- WebUSB based browser application (does not work on iOS)

Note that the Particle mobile apps cannot be used with BLE provisioning mode. The older Photon device setup SDKs for iOS and Android only work with the Photon and P1 using SoftAP and do not work with BLE-based setup.

Unlike the previous Particle mobile setup experience, BLE provisioning works differently:

| BLE Provisioning | Old Particle mobile apps |
| :---: | :---: |
| Device added to a product in advance | No product support  |
| Flash firmware and Device OS in advance | Flash firmware and Device OS by BLE |
| Use with unclaimed product devices | Claim to a developer account |
| Cloud API calls made from your back-end | Cloud API calls made directly from mobile app |

Note that these are recommendations; if you wish to use two-legged customer accounts you can do so, however there is no built-in support for doing so.


## Setup protocol overview

If you are using one of the standard examples you probably don't need to dig this deep into the protocol, but this is how setup actually works, should you need this information.

### BLE connection

The setup process is based on BLE 5 (Bluetooth LE) but does not depend on BLE pairing. It does encrypt the information, but using an application layer encryption, not BLE pairing, such as LESC pairing.

The setup process uses a BLE service that has three characteristics (tx, rx, and version). The standard listening mode setup on the Argon, P2, and Photon 2 has a set of service and characteristic UUIDs, which are all 128 bit unique IDs. This allows the BLE configuration service to be detected by your BLE client (mobile app, computer with BLE, etc.).

It is also possible to customize these UUIDs when using BLE provisioning mode. This is useful for custom products because it means your BLE client will only see your product devices, not random Particle developer kits.

In BLE terminology, the Particle device is the BLE peripheral, which accepts connections for configuration and implements a service. Your mobile app is the BLE central.

### Device name

By default, the device name that appears in the BLE advertising packet is something like "P Series-AB123X". The last 6 characters match the last 6 characters of the serial number, which is printed on the serial number sticker and also encoded in the data matrix code on the label.

Imagine you are in a classroom with many people configuring their devices at the same time. This makes sure the correct device is selected when there are multiple devices in BLE range.

You can set a custom name base, such as your company or product name by changing a setting in the DCT (configuration flash). 

You can also set the entire name to a fixed string from your product firmware, eliminating the serial number part. If you do not expect your customers to be configuring multiple devices in close proximity, this can simplify the setup experience by eliminating the need to scan the data matrix sticker if you also use a fixed mobile secret, as described in the next section.

### Encryption

Because setup does not rely on BLE pairing it has an encryption layer using the EC (Elliptical Curve) J/PAKE algorithm. This assures that other devices in BLE range cannot sniff configuration data or spoof packets.

The encryption key is includes the device mobile secret. By default, this is defined in the factory and is unique per-device. It's encoded in the data matrix code (which looks like a QR code) along with the serial number. Typically this code is scanned by the the camera in your mobile app. 

It's also possible to specify a mobile secret in device firmware. This could be used to set all of your product devices to be the same mobile secret. This is not recommended for security reasons, but in some applications it may be desireable to trade the additional security for the simplicity of not having to scan the data matrix sticker from your mobile app.

### Control requests

Finally, the act of getting the list of Wi-Fi networks and configuring the Wi-Fi credentials is done using control requests. These are request and response binary packets that are encoded using protobufs.

On Particle devices, control requests can be made of encrypted BLE, and also can be done over USB using the same control request format. There are many control requests defined that include many features beyond Wi-Fi configuration.

There is also an application-defined control request. This allows your application to implement a custom control request handler that accepts requests either from BLE or USB. This is handy if you need to configure things beyond the Particle-defined control requests. You define your own payload; we recommend using JSON for it as it's often easier to handle than protobufs. The Tracker uses this to allow control functions like enter shipping mode to be made by USB, BLE, or by Particle.function.

Since BLE provisioning mode work even when your application firmware is running, this provides a way for your mobile app to communicate with your devices over BLE, in addition to being able to communicate over the cloud.

Additional information can be found in:

- [Device OS header listing all control request types](https://github.com/particle-iot/device-os/blob/develop/system/inc/system_control.h)
- [particle-usb library](https://github.com/particle-iot/particle-usb) which implements control requests for node.js (also available in npm) and browser-based WebUSB


### Listening mode

You can still use listening mode (blinking dark blue) with the P2, Photon 2, and Argon, when connecting by USB, and if it has not been disabled. For example, the `particle serial wifi` command can be used from the Particle CLI to configure Wi-Fi credentials. The newer control request method is generally preferred, however, because of the increased flexibility and robustness. Typically when BLE provisioning mode is enabled, listening mode is disabled, so you will generally want to select one or the other.

Previously, on the Photon and P1, setup could be done in listening mode (blinking dark blue) using USB serial (CDC) or by SoftAP, which allows setup over Wi-Fi. Setup over Wi-Fi from a mobile device is somewhat cumbersome because you need to use the mobile device Wi-Fi configuration settings to select a different Wi-Fi network. SoftAP is not available on newer devices.

### Wi-Fi credentials setting vs. device setup

We highly recommend that you limit customer device setup to only setting Wi-Fi credentials.

Previously, when using the Device Setup SDK for iOS and Android, Wi-Fi setup was mixed in with device firmware upgrade and device claiming. 

Claiming makes the process significantly more complicated because of the need to manage customer accounts and access tokens. Product devices no longer need to be claimed, so eliminating this step saves a lot of effort.

Likewise, the [web-based Particle device setup](https://setup.particle.io/) and the old Particle mobile apps have features for upgrading Device OS. Instead, we recommend that you set up the devices ahead of time with the appropriate Device OS and firmware, which eliminates the need to include that functionality in the mobile app, and also makes the setup process significantly faster for your users.

### How do I authenticate users?

The big change is that we no longer recommend making Particle REST API calls directly from your mobile app. This required creating Particle customer accounts and storing authentication tokens into your mobile app, which adds significant complexity.

Instead, we recommend that you handle authenticating your users entirely in your back-end. You might choose to implement your own, or use any number of common authentication schemes like authenticate with Facebook, Google, SMS, etc.. This also means that you no longer need to share any customer-specific information with Particle. You handle that entirely on your end.

This also makes it significantly easier to use a combination of mobile app and web app, depending on what your customers prefer to use.

### Provisioning settings

There are a number of configurable parameters needed for device provisioning:

- BLE service UUIDs. These are embedded in the device firmware and also in your mobile app. Changing these settings prevents other mobile apps from being able to interact with your devices.

- BLE device name or setup code. From the factory, this is the last 6 characters of the serial number. Imagine a classroom of users who are all trying to set up their devices at the same time over BLE. The device name makes sure they set up the device in their hand instead of a different nearby device. However, you can also set this to a constant value, for example the name of your product, to simplify setup.

- Mobile secret. Every Particle device has a mobile secret written to it at the factory. It's also printed on in the data matrix code (similar to a QR code) on the serial number sticker. This is used for secure communication over BLE between your mobile app, which has presumably scanned the data matrix code, and the device, which already knows its mobile secret stored in flash memory. You can, however, configure the mobile secret to be a single pre-shared secret across all of your product devices. This is less secure, since an attacker who is nearby, knows the pre-shared secret, and is listening at the time of Wi-Fi configuration, could intercept and decrypt the communications. 

If multiple users setting up your product in close proximity is unlikely, and the highest level of security is not necessary, setting both a constant device name and mobile secret eliminates the need to scan the serial number sticker, which may be desirable trade-off for user setup simplicity.

This is what the service UUIDs look like in the Particle device firmware:

```
const char* serviceUuid = "6E400021-B5A3-F393-E0A9-E50E24DCCA9E";
const char* rxUuid = "6E400022-B5A3-F393-E0A9-E50E24DCCA9E";
const char* txUuid = "6E400023-B5A3-F393-E0A9-E50E24DCCA9E";
const char* versionUuid = "6E400024-B5A3-F393-E0A9-E50E24DCCA9E";
```


### Provisioning firmware

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

- Download the [react native example](https://github.com/particle-iot/rn-ble-setup) from Github.
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

If you are going to be using cloud builds, you should also install the **Expo Go** mobile app on your iOS and Android devices.

### iOS development app - react native

Building an iOS app using Expo EAS is as easy as:

```
npx eas build -p ios --profile development 
```

This will do a cloud build of the iOS app, and eliminates the need to install a local development environment. In the Expo EAS cloud build, iOS builds are more expensive, as they count as two builds in the free plan, and are $2 instead of $1 a la carte. You may want to do initial development and testing on Android for this reason.

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

Building native iOS apps requires a Mac.

- Download the [iOS native example](https://github.com/particle-iot/iOSBLEExample) from Github.
- Install XCode.
- Enable your iOS device for development mode (BLE cannot be used in the emulator).
- Flash the "standard mobile secret firmware" above to Particle P2, Photon 2, or Argon.
- You will need an Apple developer account in order to be able to sign the binaries, create provisioning profiles, etc.

### Settings - iOS native example

- Select your team in General - Targets iOSBLEExample
- Make sure a provisioning profile and signing certificate are selected
- Build and run the example

## Android native example

The Android example app is not a fully functional setup application; it just shows how to use the BLE setup protocol.

### Settings

- Download the [Android native example](https://github.com/particle-iot/AndroidBLEExample) from Github.
- Tested with Android Studio Flamingo, but should work with other versions.
- [Enable developer options](https://developer.android.com/studio/run/device) on your Android device (the emulator cannot be used with BLE).
- Follow the instructions in the README of the AndroidBLEExample repository.
- It is OK to upgrade the Android Gradle Plug-in using the automatic tool.
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

