---
word: Mobile
title: Mobile SDK
order: 11
---

iOS Cloud SDK
=======

The iOS Cloud SDK is a library that enables your iOS app to interact with internet-connected hardware through the Particle Cloud. It serves the same purpose as Particle JS — it’s an easy-to-use wrapper for our REST API, accessible from beautiful, idiomatic Objective-C or Swift. Using the Cloud SDK, you can:

- Manage user sessions for the Particle Cloud (access tokens, encrypted session management)
- Claim/Unclaim devices for a user account
- Get a list of instances of claimed Particle devices
- Read variables from devices
- Invoke functions on devices
- Coming Soon: Publish events from the mobile app and subscribe to events coming from devices

All cloud operations take place asynchronously and use the well-known completion blocks (closures for swift) design pattern for allowing you to build beautiful responsive apps for your Particle products.

## How To Get Started

- [Download Particle iOS Cloud SDK](https://github.com/spark/spark-sdk-ios/archive/master.zip) and try out the included iOS example app
- Or perform the installation step described under the **Installation** section below

## Usage

SDK usage involves two basic classes: first is [SparkCloud](http://cocoadocs.org/docsets/Spark-SDK/0.2.6/Classes/SparkCloud.html) which is a singleton object that enables all basic cloud operations such as user authentication, device listing, claiming etc.
Second class is [SparkDevice](http://cocoadocs.org/docsets/Spark-SDK/0.2.6/Classes/SparkDevice.html) which is an instance represnting a *claimed* device in the current user session. Each object enables device-specific operation such as: getting its info, invoking functions and reading variables from it. 
Full class and variables [Reference is available on Cocoadocs website](http://cocoadocs.org/docsets/Spark-SDK/) or consult the javadoc style comments in `SparkCloud.h` and `SparkDevice.h` for each public method.
If Particle iOS Cloud SDK installation completed successfully - you should be able to press `Esc` to get an auto-complete hints from XCode for each cloud and device method.

## Communication

- If you **need help**, use [Our community website](http://community.particle.io), use the `mobile` category for dicussion/troubleshooting iOS apps using the Particle iOS Cloud SDK.
- If you are certain you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue, label it as `bug`.
- If you **have a feature request**, open an issue with an `enhancement` label on it
- If you **want to contribute**, submit a pull request, be sure to check out spark.github.io for our contribution guidelines, and please sign the [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform). 

## Installation

Particle iOS Cloud SDK is available through [CocoaPods](https://cocoapods.org). To install it, simply add the following line to your Podfile on main project folder:

```ruby
pod "Spark-SDK"
```

and then run `pod update`. A new `.xcworkspace` file will be created for you to open by Cocoapods, open that file workspace file in XCode and you can start interacting with Particle cloud and devices by
adding `#import "Spark-SDK.h"`. (that is not required for swift projects)


#### Support for Swift projects
To use Particle Cloud SDK from within Swift based projects [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/), 
also be sure the check out [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) on this matter.
_Notice_ that we've included the required bridging header file in the SDK, you just need to copy it to your project add it as the active bridging header file in the project settings as described in the link above.
We also have an example app [here](https://github.com/Spark/spark-setup-ios-example), this app also demonstrates the Particle DeviceSetup library usage

#### Notes
**Name change**
Spark was re-branded as Particle. Libraries source code will be updated soon to reflect this change. 
New cocoapod libraries will be released with new name and old ones will be deprecated soon. This applies to both Cloud SDK and Device Setup library.

## License

Particle iOS Cloud SDK is available under the LGPL v3 license. See the LICENSE file for more info.


iOS Device Setup Library
=======

The Particle Device Setup library is meant for integrating the initial setup process of Particle devices in your app.
This library will enable you to easily invoke a standalone setup wizard UI for setting up internet-connect products
powered by a Photon/P0/P1. The setup UI can be easily customized by a customization proxy class available to the user
that includes: look & feel, colors, fonts as well as custom brand logos and instructional video for your product. There are good defaults if you don’t set these properties, but you can override the look and feel as needed to suit the rest of your app.

As you may have heard, the wireless setup process for the Photon uses very different underlying technology from the Core. Where the Core used Smart Config, the Photon uses what we call “soft AP” — the Photon advertises a Wi-Fi network, you join that network from your mobile app to exchange credentials, and then the Photon connects using the Wi-Fi credentials you supplied.

With the Device Setup library, you make one simple call from your app, for example when the user hits a “setup my device” button, and a whole series of screens then guides the user through the soft AP setup process. When the process finishes, the user is back on the screen where she hit the “setup my device” button, and your code has been passed an instance of the device she just setup and claimed.

## Usage

### Basic
Import `SparkSetup.h` in your view controller implementation file, and invoke the device setup wizard by:

```objective-c
SparkSetupMainController *setupController = [[SparkSetupMainController alloc] init];
[self presentViewController:setupController animated:YES completion:nil];
```

Alternatively if your app requires separation between the Particle cloud authentication process and the device setup process you can call:

```objective-c
SparkSetupMainController *setupController = [[SparkSetupMainController alloc] initWithAuthenticationOnly:YES];
[self presentViewController:setupController animated:YES completion:nil];
```

This will invoke Particle Cloud authentication (login/signup/password recovery screens) only 
after user has successfully logged in or signed up, control will be returned to the calling app. 
If an active user session already exists control will be returned immediately.


### Customization

Customize setup look and feel by accessing the SparkSetupCustomization singleton appearance proxy `[SparkSetupCustomization sharedInstance]`
and modify its properties. All properties are optional. 

#### Product/brand info:

You can modify the brand and product related info/images by assigning to these properties:

```objective-c
 NSString *deviceName;          // Device/product name 
 UIImage *deviceImage;          // Device/product image

 NSString *brandName;           // Your brand name
 UIImage *brandImage;          	// Your brand logo to fit in header of setup wizard screens
 UIColor *brandImageBackgroundColor;    // brand logo background color
 NSString *welcomeVideoFilename;        // Welcome screen instructional video
 NSString *appName;                     // Your setup app name
```
 
#### Technical info:

Modify product technical data by assigning to these properties:

```objective-c
 NSString *modeButtonName;              // The mode button name on your product
 NSString *listenModeLEDColorName;      // The color of the LED when product is in listen mode
 NSString *networkNamePrefix;           // The SSID prefix of the Soft AP Wi-Fi network of your product while in listen mode
```

#### Links for legal/technical stuff:

You can edit links to your TOS and privacy policy as well as a troubleshooting page. Links will supersede static pages if supplied.

```objective-c
 NSURL *termsOfServiceLinkURL; // URL for terms of service of the app/device usage
 NSURL *privacyPolicyLinkURL;  // URL for privacy policy of the app/device usage
 NSURL *troubleshootingLinkURL; // URL for troubleshooting text of the app/device usage

 NSString *termsOfServiceHTMLFile; // Static HTML file for terms of service of the app/device usage
 NSString *privacyPolicyHTMLFile;  // Static HTML file for privacy policy of the app/device usage
 NSString *troubleshootingHTMLFile; // Static HTML file for troubleshooting text of the app/device usage
```


#### Look & feel:

Edit the looks of the setup wizard screens by assigning values to these properties:

```objective-c
 UIColor *pageBackgroundColor;     // setup screens background color
 UIImage *pageBackgroundImage;     // optional background image for setup screens
 UIColor *normalTextColor;         // normal text color
 UIColor *linkTextColor;           // link text color (will be underlined)
 UIColor *buttonBackgroundColor;   // Buttons background color
 UIColor *buttonTextColor;         // Buttons text color
 NSString *normalTextFontName;     // Customize normal setup text font - include OTF/TTF file in project
 NSString *boldTextFontName;       // Customize bold setup text font - include OTF/TTF file in project
 NSString *headerTextFontName;     // Customize header setup text font - include OTF/TTF file in project
 CGFloat fontSizeOffset;           // Set offset of font size so small/big fonts can be fine-adjusted
```

#### Organization:

Setting `organization=YES` will enable organization mode. You can modify organization name via the `organizationName` property.
 
```objective-c
 BOOL organization;                 // enable organization mode - activation codes, other organizational APIs
 NSString *organizationName;        // organization name
```

### Advanced

You can get an active instance of `SparkDevice` by making your viewcontroller conform to protocol `<SparkSetupMainControllerDelegate>` when setup wizard completes:

```objective-c
-(void)SparkSetupViewController:(SparkSetupMainController *)controller didFinishWithResult:(SparkSetupMainControllerResult)result device:(SparkDevice *)device;
```

method will be called, if `(result == SparkSetupMainControllerResultSuccess)` the device parameter will contain an active `SparkDevice` instance you can interact with
using the [Particle Cloud SDK](https://cocoapods.org/pods/Spark-SDK).

#### Support for Swift projects
To use Particle DeviceSetup library from within Swift based projects [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/), 
also be sure the check out [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) on this matter.

### Example
Usage example app (in Swift) can be found [here](https://github.com/particle/spark-setup-ios-example/). Example app demonstates - invoking the setup wizard, customizing its UI and using the returned ParticleDevice instance once 
setup wizard completes (delegate). Feel free to contribute to the example by submitting pull requests.

### Reference

Check out the [Reference in Cocoadocs website](http://cocoadocs.org/docsets/SparkSetup/) or consult the javadoc style comments in `SparkSetupCustomization.h` and `SparkSetupMainController.h` for each public method or property.
If Particle Device Setup library installation completed successfully - you should be able to press `Esc` to get an auto-complete hints from XCode for each public method or property in the library.

## Requirements / limitations

- iOS 7.1+ supported
- Currently setup wizard displays on portait mode only.
- XCode 6.0 and up is required

## Installation

Particle-Setup is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your Podfile:

```ruby
pod "SparkSetup"
```

## Communication

- If you **need help**, use [Our community website](http://community.particle.io)
- If you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.


## License

Particle Device Setup library is available under the LGPL v3 license. See the LICENSE file for more info.


Android Cloud SDK
=====

**Coming Soon...**


Android Device Setup Library
====
**Coming Soon...**
