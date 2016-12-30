---
title: iOS SDK
template: reference.hbs
columns: three
order: 5
---

# {{title}}

The iOS SDK consists of two parts: (1) the Cloud SDK and (2) the Device Setup library, the first is an API wrapper that enables your mobile app to interact with internet-connected hardware through the Particle Cloud while the latter is a library allows you to easily create a setup wizard for allowing your app users to setup their devices.

## iOS Cloud SDK

### Introduction

Particle iOS Cloud SDK enables iOS apps to interact with Particle-powered connected products via the Particle Cloud. It’s an easy-to-use wrapper for Particle REST API. The Cloud SDK will allow you to:

- Manage user sessions for the Particle Cloud (access tokens, encrypted session management)
- Claim/Unclaim devices for a user account
- Get a list of instances of user's Particle devices
- Read variables from devices
- Invoke functions on devices
- Publish events from the mobile app and subscribe to events coming from devices

All cloud operations take place asynchronously and use the well-known completion blocks (closures for swift) design pattern for reporting results allowing you to build beautiful responsive apps for your Particle products and projects.
iOS Cloud SDK is implemented as an open-source CocoaPods static library and also as Carthage dynamic framework dependency. See [Installation](#installation) section for more details. It works well for both Objective-C and [Swift](#support-for-swift-projects) projects.

**Rebranding notice**

Spark has been rebranded as Particle.
Code currently refers to `SparkCloud` and `SparkDevice`, this will soon be replaced with `ParticleCloud` and `ParticleDevice`. A new CocoaPods library will be published and current one will be deprecated and point to the new one. This should not bother or affect your code.

**Beta notice**

This SDK is still under development and is currently released as Beta. Although tested, bugs and issues may be present. Some code might require cleanup. In addition, until version 1.0 is released, we cannot guarantee that API calls will not break from one Cloud SDK version to the next. Be sure to consult the [Change Log](https://github.com/spark/spark-sdk-ios/blob/master/CHANGELOG.md) for any breaking changes / additions to the SDK.

**Major/breaking changes in v0.4 notice**

If you're new to Particle iOS SDK feel free to skip this notice, if you're upgrading please read this section thoroughly.
Some major and breaking changes have been incorporated into release v0.4 of the Particle iOS SDK, here's the list:

#### 1) Carthage support

The SDK is now also available as a [Carthage](https://github.com/Carthage/Carthage) dependency. This should solve many issues SDK users has been reporting with mixing Swift dependencies in their projects and having to use the `use_frameworks!` directive in the `Podfile` -  that flag is required for any dynamic library, which includes anything written in Swift. The previously static library would not play nicely with those. For additional information on how to install the Particle iOS SDK as a Carthage framework dependency check out the updated [Installation](#installation) section.

#### 2) Nullability - even better Swift interoperability!

One of the great things about Swift is that it transparently interoperates with Objective-C code, both existing frameworks written in Objective-C and code in your app. However, in Swift there’s a strong distinction between optional and non-optional references, e.g. `NSView` vs. `NSView?`, while Objective-C represents both of these two types as `NSView *`. Because the Swift compiler can’t be sure whether a particular `NSView *` is optional or not, the type is brought into Swift as an implicitly unwrapped optional, NSView!.
In previous Xcode releases, some Apple frameworks had been specially audited so that their API would show up with proper Swift optionals. Starting Xcode 6.3 there's support for this on your own code with a new Objective-C language feature: nullability annotations.
The new nullability annotations have been integrated into the Particle iOS Cloud SDK library so now it plays more nicely with Swift projects.

*Breaking change* your code will have to be updated - all SDK callbacks now return real optionals (`SparkDevice?`) instead of implicitly unwrapped optionals (`SparkDevice!`). See updated Swift examples below. Basically only simple change required from you the SDK user: to replace your callback argument types from `!` suffix to `?` suffix.

#### 3) AFNetworking 3.0

AFNetworking is a networking library for iOS and Mac OS X. It's built on top of the Foundation URL Loading System, extending the powerful high-level networking abstractions built into Cocoa. It has a modular architecture with well-designed, feature-rich APIs.
The Particle Cloud SDK has been relying on this useful library since the beginning, version 3.0 was released not long ago that contained some breaking changes, the main change from 2.x is that `NSURLConnectionOperation` was removed all together and `NSURLSessionDataTask` was introduced instead - it is used to invoke network access. The major change in Particle iOS Cloud SDK is that now every SDK function will return the [`NSURLSessionDataTask`](https://developer.apple.com/library/prerelease/ios/documentation/Foundation/Reference/NSURLSessionDataTask_class/index.html) object that can be queried by the app developer for further information about the status of the network operation. Refer to the Apple docs link above for further information on how to use it.
Code changes are optional and if you've been ignoring the return value (since it was `void`) of the SDK functions before you can keep doing so, alternatively you can now make use of the `NSURLSessionDataTask` object as described.

#### 4) Two legged auth support / better session handling

If you use your own back end to authenticate users in your app - you can now inject the Particle access token your back end gets from Particle cloud easily using one of the new `injectSessionAccessToken` functions exposed from `SparkCloud` singleton class.
In turn the `.isLoggedIn` property has been deprecated in favor of `.isAuthenticated` - which checks for the existence of an active access token instead of a username. Additionally the SDK will now automatically renew an expired session if a refresh token exists. As increased security measure the Cloud SDK will no longer save user's password in the Keychain.

#### 5) Electron support

The [Electron](https://store.particle.io/#electron), our cellular development kit for creating connected products that work anywhere has been released!
Particle iOS Cloud SDK supports it fully, no code changes required!

### Getting Started

- Perform the installation step described under the **Installation** section below for integrating in your own project
- You can also [Download Particle iOS Cloud SDK](https://github.com/spark/spark-sdk-ios/archive/master.zip) and try out the included iOS example app
- Be sure to check [Usage](#usage) before you begin for some code examples

### Usage

Cloud SDK usage involves two basic classes: first is `SparkCloud` which is a singleton object that enables all basic cloud operations such as user authentication, device listing, claiming etc. Second class is `SparkDevice` which is an instance representing a claimed device in the current user session. Each object enables device-specific operation such as: getting its info, invoking functions and reading variables from it.

### Common tasks

Here are few examples for the most common use cases to get your started:

#### Logging in to Particle cloud
You don't need to worry about access tokens and session expiry, SDK takes care of that for you

**Objective-C**
```objc
[[SparkCloud sharedInstance] loginWithUser:@"username@email.com" password:@"userpass" completion:^(NSError *error) {
    if (!error)
        NSLog(@"Logged in to cloud");
    else
        NSLog(@"Wrong credentials or no internet connectivity, please try again");
}];
```
---

**Swift**
```swift
SparkCloud.sharedInstance().login(withUser: "username@email.com", password: "userpass") { (error:Error?) -> Void in
    if error != nil {
        print("Wrong credentials or no internet connectivity, please try again")
    }
    else {
        print("Logged in")
    }
}
```
---
#### Injecting a session access token (app utilizes two legged authentication)

**Objective-C**
```objc
if ([[SparkCloud sharedInstance] injectSessionAccessToken:@"9bb9f7433940e7c808b191c28cd6738f8d12986c"])
    NSLog(@"Session is active!");
else
    NSLog(@"Bad access token provided");
```
---

**Swift**
```swift
if SparkCloud.sharedInstance().injectSessionAccessToken("9bb9f7433940e7c808b191c28cd6738f8d12986c") {
    print("Session is active")
} else {
    print("Bad access token provided")
}
```
---
#### Get a list of all devices
List the devices that belong to currently logged in user and find a specific device by name:

**Objective-C**

```objc
__block SparkDevice *myPhoton;
[[SparkCloud sharedInstance] getDevices:^(NSArray *sparkDevices, NSError *error) {
    NSLog(@"%@",sparkDevices.description); // print all devices claimed to user

    for (SparkDevice *device in sparkDevices)
    {
        if ([device.name isEqualToString:@"myNewPhotonName"])
            myPhoton = device;
    }
}];
```
---

**Swift**

```swift
var myPhoton : SparkDevice?
SparkCloud.sharedInstance().getDevices { (sparkDevices:[SparkDevice]?, error:Error?) -> Void in
    if error != nil {
        print("Check your internet connectivity")
    }
    else {
        if let devices = sparkDevices as? [SparkDevice] {
            for device in devices {
                if device.name == "myNewPhotonName" {
                    myPhoton = device
                }
            }
        }
    }
}
```
---

#### Read a variable from a Particle device (Core/Photon/Electron)
Assuming here that `myPhoton` is an active instance of `SparkDevice` class which represents a device claimed to current user:

**Objective-C**
```objc
[myPhoton getVariable:@"temperature" completion:^(id result, NSError *error) {
    if (!error) {
        NSNumber *temperatureReading = (NSNumber *)result;
        NSLog(@"Room temperature is %f degrees",temperatureReading.floatValue);
    }
    else {
        NSLog(@"Failed reading temperature from Photon device");
    }
}];
```
---

**Swift**
```swift
myPhoton!.getVariable("temperature", completion: { (result:AnyObject?, error:Error?) -> Void in
    if error != nil {
        print("Failed reading temperature from device")
    }
    else {
        if let temp = result as? Float {
            print("Room temperature is \(temp) degrees")
        }
    }
})
```
---
#### Call a function on a Particle device (Core/Photon/Electron)
Invoke a function on the device and pass a list of parameters to it, `resultCode` on the completion block will represent the returned result code of the function on the device.
This example also demonstrates usage of the new `NSURLSessionDataTask` object returned from every SDK function call.

**Objective-C**
```objc
NSURLSessionDataTask *task = [myPhoton callFunction:@"digitalWrite" withArguments:@[@"D7",@1] completion:^(NSNumber *resultCode, NSError *error) {
    if (!error)
    {
        NSLog(@"LED on D7 successfully turned on");
    }
}];
int64_t bytesToReceive  = task.countOfBytesExpectedToReceive;
// ..do something with bytesToReceive
```
---

**Swift**
```swift
let funcArgs = ["D7",1]
var task = myPhoton!.callFunction("digitalWrite", withArguments: funcArgs) { (resultCode : NSNumber?, error : Error?) -> Void in
    if (error == nil) {
        print("LED on D7 successfully turned on")
    }
}
var bytesToReceive : Int64 = task.countOfBytesExpectedToReceive
// ..do something with bytesToReceive
```
---
#### List device exposed functions and variables
Functions is just a list of names, variables is a dictionary in which keys are variable names and values are variable types:

**Objective-C**
```objc
NSDictionary *myDeviceVariables = myPhoton.variables;
NSLog(@"MyDevice first Variable is called %@ and is from type %@", myDeviceVariables.allKeys[0], myDeviceVariables.allValues[0]);

NSArray *myDeviceFunctions = myPhoton.functions;
NSLog(@"MyDevice first Function is called %@", myDeviceFunctions[0]);
```
---

**Swift**
```swift
let myDeviceVariables : Dictionary? = myPhoton.variables as? Dictionary<String,String>
print("MyDevice first Variable is called \(myDeviceVariables!.keys.first) and is from type \(myDeviceVariables?.values.first)")

let myDeviceFunction = myPhoton.functions
print("MyDevice first function is called \(myDeviceFunction!.first)")
```
---
#### Get an instance of a device
Get a device instance by its ID:

**Objective-C**
```objc
__block SparkDevice *myOtherDevice;
NSString *deviceID = @"53fa73265066544b16208184";
[[SparkCloud sharedInstance] getDevice:deviceID completion:^(SparkDevice *device, NSError *error) {
    if (!error)
        myOtherDevice = device;
}];
```
---

**Swift**
```swift
var myOtherDevice : SparkDevice? = nil
    SparkCloud.sharedInstance().getDevice("53fa73265066544b16208184", completion: { (device:SparkDevice?, error:Error?) -> Void in
        if let d = device {
            myOtherDevice = d
        }
    })
```
---
#### Rename a device
you can simply set the `.name` property or use -rename() method if you need a completion block to be called (for example updating a UI after renaming was done):

**Objective-C**
```objc
myPhoton.name = @"myNewDeviceName";
```

_or_
```objc
[myPhoton rename:@"myNewDeviecName" completion:^(NSError *error) {
    if (!error)
        NSLog(@"Device renamed successfully");
}];
```
---

**Swift**
```swift
myPhoton!.name = "myNewDeviceName"
```
---
_or_
```swift
myPhoton!.rename("myNewDeviceName", completion: { (error:Error?) -> Void in
    if (error == nil) {
        print("Device successfully renamed")
    }
})
```
---
#### Logout
Also clears user session and access token

**Objective-C**
```objc
[[SparkCloud sharedInstance] logout];
```
---

**Swift**
```swift
SparkCloud.sharedInstance().logout()
```
---
### Events sub-system

You can make an API call that will open a stream of [Server-Sent Events (SSEs)](http://www.w3.org/TR/eventsource/). You will make one API call that opens a connection to the Particle Cloud. That connection will stay open, unlike normal HTTP calls which end quickly. Very little data will come to you across the connection unless your Particle device publishes an event, at which point you will be immediately notified. In each case, the event name filter is `eventNamePrefix` and is optional. When specifying an event name filter, published events will be limited to those events with names that begin with the specified string. For example, specifying an event name filter of 'temp' will return events with names 'temp' and 'temperature'.

#### Subscribe to events

Subscribe to the firehose of public events, plus private events published by devices one owns:

```objc
// The event handler:
SparkEventHandler handler = ^(SparkEvent *event, NSError *error) {
        if (!error)
        {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSLog(@"Got Event %@ with data: %@",event.event,event.data);
            });
        }
        else
        {
            NSLog(@"Error occured: %@",error.localizedDescription);
        }

    };

// This line actually subscribes to the event stream:
id eventListenerID = [[SparkCloud sharedInstance] subscribeToAllEventsWithPrefix:@"temp" handler:handler];
```

*Note:* specifying nil or empty string in the eventNamePrefix parameter will subscribe to ALL events (lots of data!)
You can have multiple handlers per event name and/or same handler per multiple events names.

Subscribe to all events, public and private, published by devices the user owns:

```objc
id eventListenerID = [[SparkCloud sharedInstance] subscribeToMyDevicesEventsWithPrefix:@"temp" handler:handler];
```
---
Subscribe to events from one specific device (by deviceID, second parameter). If the API user owns the device, then he'll receive all events, public and private, published by that device. If the API user does not own the device he will only receive public events.

```objc
id eventListenerID = [[SparkCloud sharedInstance] subscribeToDeviceEventsWithPrefix:@"temp" deviceID:@"53ff6c065075535119511687" handler:handler];
```
---
other option is calling same method via the `SparkDevice` instance:

```objc
id eventListenerID = [device subscribeToEventsWithPrefix:@"temp" handler:handler];
```
---
this guarantees that private events will be received since having access device instance in your app signifies that the user has this device claimed.

#### Unsubscribing from events

Very straightforward. Keep the id object the subscribe method returned and use it as parameter to call the unsubscribe method:

```objc
[[SparkCloud sharedInstance] unsubscribeFromEventWithID:self.eventListenerID];
```

or via the `SparkDevice` instance (if applicable):

```objc
[device unsubscribeFromEventWithID:self.eventListenerID];
```
---
#### Publishing an event

You can also publish an event from your app to the Particle Cloud:

**Objective-C**

```objc
[[SparkCloud sharedInstance] publishEventWithName:@"event_from_app" data:@"event_payload" isPrivate:NO ttl:60 completion:^(NSError *error) {
    if (error)
    {
        NSLog(@"Error publishing event: %@",error.localizedDescription);
    }
}];
```
---

**Swift**

```swift
SparkCloud.sharedInstance().publishEvent(withName: "event_from_app", data: "event_payload", isPrivate: false, ttl: 60, completion: { (error:Error?) -> Void in
    if error != nil
    {
        print("Error publishing event" + e.localizedDescription)
    }
})
```
---
### OAuth client configuration

If you're creating an app you're required to provide the `SparkCloud` class with OAuth clientId and secret.
Those are used to identify users coming from your specific app to the Particle Cloud.
Please follow the procedure decribed [in our guide](https://docs.particle.io/guide/how-to-build-a-product/authentication/#creating-an-oauth-client) to create those strings,
then in your `AppDelegate` class you can supply those credentials by setting the following properties in `SparkCloud` singleton:

```objc
@property (nonatomic, strong) NSString *OAuthClientId;
@property (nonatomic, strong) NSString *OAuthClientSecret;
```

**Important**
Those credentials should be kept as secret. We recommend the use of [Cocoapods-keys plugin](https://github.com/orta/cocoapods-keys) for cocoapods
(which you have to use anyways to install the SDK). It is essentially a key value store for environment and application keys.
It's a good security practice to keep production keys out of developer hands. CocoaPods-keys makes it easy to have per-user config settings stored securely in the developer's keychain,
and not in the application source. It is a plugin that once installed will run on every pod install or pod update.

After adding the following additional lines your project `Podfile`:
```ruby
plugin 'cocoapods-keys', {
    :project => "YourAppName",
    :keys => [
        "OAuthClientId",
        "OAuthSecret"
    ]}
```
---
go to your project folder in shell and run `pod install` - it will now ask you for "OAuthClientId", "OAuthSecret" - you can copy/paste the generated keys there
and from that point on you can feed those keys into `SparkCloud` by adding this code to your AppDelegate `didFinishLaunchingWithOptions` function which gets called
when your app starts:

*Swift example code*

```swift
func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    var keys = YourappnameKeys()
    SparkCloud.sharedInstance().OAuthClientId = keys.oAuthClientId()
    SparkCloud.sharedInstance().OAuthClientSecret = keys.oAuthSecret()

    return true
}
```

Be sure to replace `YourAppName` with your project name.

### Additional reference
For additional reference check out the [Reference in Cocoadocs website](http://cocoadocs.org/docsets/Spark-SDK/) for full coverage of `SparkDevice` and `SparkCloud` functions and member variables. In addition you can consult the JavaDoc style comments in `SparkCloud.h` and `SparkDevice.h` for each public method. If Particle iOS Cloud SDK is integrated in your Xcode project you should be able to press `Esc` to get an auto-complete hints for each cloud and device method.

### Installation

#### CocoaPods

Particle iOS Cloud SDK is available through [CocoaPods](http://cocoapods.org). CocoaPods is an easy to use dependency manager for iOS.
You must have CocoaPods installed, if you don't then be sure to [Install CocoaPods](https://guides.cocoapods.org/using/getting-started.html) before you start:
To install the iOS Cloud SDK, simply add the following line to your Podfile on main project folder:

```ruby
pod "Spark-SDK"
```

and then run `pod update`. A new `.xcworkspace` file will be created for you to open by CocoaPods, open that file workspace file in Xcode and you can start interacting with Particle cloud and devices by
adding `#import "Spark-SDK.h"`. (that is not required for swift projects)

#### Support for Swift projects

*Applies to CocoaPods dependency only:*
To use iOS Cloud SDK from within Swift based projects [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/).
For a detailed step-by-step help on integrating the Cloud SDK within a Swift project check out this [Particle community posting](https://community.particle.io/t/mobile-sdk-building-the-bridge-from-swift-to-objective-c/12020/1).

The [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) is an important resource on mixing Objective-C and Swift code, be sure to read through that as well.

_Notice_ that we've included the required bridging header file in the SDK, you just need to copy it to your project add it as the active bridging header file in the project settings as described in the links above.
There's also an [example app](https://github.com/spark/spark-setup-ios-example), this app also demonstrates the Particle DeviceSetup library usage, as well as several Cloud SDK calls.

#### Carthage (Recommended method)

Starting version 0.4.0 Particle iOS Cloud SDK is available through [Carthage](https://github.com/Carthage/Carthage). Carthage is intended to be the simplest way to add frameworks to your Cocoa application.
You must have Carthage installed, if you don't then be sure to [install Carthage](https://github.com/Carthage/Carthage#installing-carthage) before you start.
Then to build the iOS Cloud SDK, simply create a `Cartfile` on your project root folder, containing the following line:

```
github "spark/spark-sdk-ios" >= 0.4.0
```

and then run the following command:
`carthage update --platform iOS --use-submodules --no-use-binaries`.
A new folder will be created in your project root folder - navigate to the `./Carthage/Build/iOS` folder and drag all the created `.framework`s file into your project in XCode.
Go to your XCode target settings->General->Embedded binaries and make sure the `ParticleSDK.framework` and the `AFNetworking.framework` are listed there.
Build your project - you now have the Particle SDK embedded in your project.

#### Carthage example

A new example app demonstrating the usage of Carthage installation method is available [here](https://github.com/spark/ios-app-example-carthage).
This app is meant to serve as basic example for using the Particle Cloud SDK and Device Setup Library in the Carthage dependencies form.
To get this example app running, clone it, open the project in XCode and:

1. Flash the `firmware.c` (included in the repo project) firmware to an online photon available under your account, use Build or Dev or CLI.
1. Set Photon's name to the constant deviceName in the testCloudSDK() function
1. Set your username/password to the appropriate constants, same place
1. Go the project root folder in your shell, run the setup shell script (under the /bin folder) which will build the latest Particle SDK 1. Carthage dependencies
1. Drag the 3 created .framework files under /Carthage/Build/iOS to your project
1. Go to XCode's target general settings and also add those frameworks to "embedded binaries"
1. Run and experiment!

## Particle Device Setup library

The Particle Device Setup library is meant for integrating the initial setup process of Particle devices in your app.
This library will enable you to easily invoke a standalone setup wizard UI for setting up internet-connected products
powered by a Particle device (Photon, PØ, P1). The setup UI can be easily customized by a customization proxy class,
that includes: look & feel, colors, texts and fonts as well as custom brand logos and custom instructional video for your product. There are good defaults in place if you don’t set these properties, but you can override the look and feel as needed to suit the rest of your app.

The wireless setup process for the Photon uses very different underlying technology from the Core. Where the Core used TI SmartConfig, the Photon uses what we call “soft AP” — i.e.: the Photon advertises a Wi-Fi network, you join that network from your mobile app to exchange credentials, and then the Photon connects using the Wi-Fi credentials you supplied.

With the Device Setup library, you make one simple call from your app, for example when the user hits a “Setup my device” button, and a whole series of screens then guide the user through the setup process. When the process finishes, the app user is back on the screen where she hit the “setup my device” button, and your code has been passed an instance of the device she just setup and claimed.
iOS Device setup library is implemented as an open-source CocoaPods static library and also as Carthage dynamic framework dependency. See [Installation](#installation) section for more details. It works well for both Objective-C and [Swift](#support-for-swift-projects) projects containing any type of dependencies.

### Basic usage

**CocoaPods**

Import `SparkSetup.h` in your view controller implementation file, use bridging header for Swift projects (See [Installation](#installation) section for more details).

**Carthage**

Use `#import <ParticleDeviceSetupLibrary/ParticleDeviceSetupLibrary.h>` in Obj-C files or `import ParticleDeviceSetupLibrary` for Swift files.

and then invoke the device setup wizard by:

**Objective-C**

```objc
SparkSetupMainController *setupController = [[SparkSetupMainController alloc] init];
setupController.delegate = self; // why? see "Advanced" section below
[self presentViewController:setupController animated:YES completion:nil];
```
---
**Swift**

```swift
if let setupController = SparkSetupMainController()
{
    setupController.delegate = self
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---
Alternatively if your app requires separation between the Particle cloud authentication process and the device setup process you can call:

**Objective-C**

```objc
SparkSetupMainController *setupController = [[SparkSetupMainController alloc] initWithAuthenticationOnly:YES];
[self presentViewController:setupController animated:YES completion:nil];
```
---
**Swift**
```swift
if let setupController = SparkSetupMainController(authenticationOnly: true)
{
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---

This will invoke Particle Cloud authentication (login/signup/password recovery screens) only
after user has successfully logged in or signed up, control will be returned to the calling app.
If an active user session already exists control will be returned immediately.

####Configure device Wi-Fi credentials without claiming it

If your app requires the ability to let users configure device Wi-Fi credentials without changing its ownership you can also do that via `initWithSetupOnly`,
and by allowing your users to skip authentication (see `allowSkipAuthentication` flag in customization section) if you present the authentication stage.
If an active user session exists - it'll be used and device will be claimed, otherwise it won't.
So invoking setup without an active user session will go thru the setup steps required for configuring device Wi-Fi credentials but not for claiming it.
However, calling `-initWithSetupOnly:` method with an active user session is essentially the same as calling `-init:`.
Usage:

```objc
SparkSetupMainController *setupController = [[SparkSetupMainController alloc] initWithSetupOnly:YES];
[self presentViewController:setupController animated:YES completion:nil];
```
---
**Swift**
```swift
if let setupController = SparkSetupMainController(setupOnly: true)
{
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---

### Customization

Customize setup look and feel by accessing the `SparkSetupCustomization` singleton appearance proxy `[SparkSetupCustomization sharedInstance]`
and modify its default properties. Setting the properties in this class is optional. *(Replace NSString with String for Swift projects)*

#### Product/brand info:

```objc
 NSString *deviceName;                  // Device/product name
 UIImage *productImage;                 // Custom product image to display in "Get ready" screen *new*
 NSString *brandName;                   // Your brand name
 UIImage *brandImage;                   // Your brand logo to fit in header of setup wizard screens
 UIColor *brandImageBackgroundColor;    // brand logo background color
 NSString *instructionalVideoFilename;  // Instructional video shown when "show me how" button pressed
```
---
#### Technical data:

```objc
 NSString *modeButtonName;              // The mode button name on your product
 NSString *listenModeLEDColorName;      // The color of the LED when product is in listen mode
 NSString *networkNamePrefix;           // The SSID prefix of the Soft AP Wi-Fi network of your product while in listen mode
```
---
#### Links for legal/technical info:

```objc
 NSURL *termsOfServiceLinkURL;      // URL for terms of service of the app/device usage
 NSURL *privacyPolicyLinkURL;       // URL for privacy policy of the app/device usage
 NSURL *forgotPasswordLinkURL;      // URL for user password reset (non-organization setup app only) - to be disabled soon
 NSURL *troubleshootingLinkURL;     // URL for troubleshooting text of the app/device usage

 NSString *termsOfServiceHTMLFile;  // Static HTML file for terms of service of the app/device usage
 NSString *privacyPolicyHTMLFile;   // Static HTML file for privacy policy of the app/device usage
 NSString *forgotPasswordHTMLFile;  // Static HTML file for user password reset (non-organization setup app only) - to be disabled soon
 NSString *troubleshootingHTMLFile; // Static HTML file for troubleshooting text of the app/device usage
```
---
#### Look & feel:

```objc
 UIColor *pageBackgroundColor;     // setup screens background color
 UIImage *pageBackgroundImage;     // optional background image for setup screens
 UIColor *normalTextColor;         // normal text color
 UIColor *linkTextColor;           // link text color (will be underlined)
 UIColor *elementBackgroundColor;  // Buttons/spinners background color
 UIColor *elementTextColor;        // Buttons text color
 NSString *normalTextFontName;     // Customize setup font - include OTF/TTF file in project
 NSString *boldTextFontName;       // Customize setup font - include OTF/TTF file in project
 CGFloat fontSizeOffset;           // Set offset of font size so small/big fonts can be fine-adjusted
 BOOL tintSetupImages;             // This will tint the checkmark/warning/wifi symbols in the setup process to match text color (useful for dark backgrounds)
```
---
#### Organization:

Setting `organization=YES` will enable organization mode which uses different API endpoints and requires special permissions (See Particle Console).
*New fields since v0.2.2*

If you set `organization` to `YES` be sure to also provide the `organizationSlug` and `productSlug` your created in [Particle Console](/guide/tools-and-features/console/).
Make sure you inject the `SparkCloud` class with scoped OAuth credentials for creating customers (so app users could create an account), [read here](https://docs.particle.io/reference/ios/#oauth-client-configuration) on how to do it correctly.
To learn how to create those credentials for your organization [read here](https://docs.particle.io/guide/how-to-build-a-product/authentication/#creating-an-oauth-client).

```objc
 BOOL organization;             // enable organizational mode
 NSString *organizationName;    // organization display name
 NSString *organizationSlug;    // organizational name for API endpoint URL - must specify for orgMode *new*
 NSString *productName;         // product display name *new*
 NSString *productSlug;         // product string for API endpoint URL - must specify for orgMode *new*
```
---
#### Skipping authentication:

*New since v0.3.0*

```objc
 BOOL allowSkipAuthentication;          // Allow user to skip authentication (skip button will appear on signup and login screens)
 NSString *skipAuthenticationMessage;   // Message to display to user when she's requesting to skip authentication (Yes/No question)
```
---
### Advanced usage

You can get an active instance of `SparkDevice` by making your ViewController conform to protocol `<SparkSetupMainControllerDelegate>` when setup wizard completes:

```objc
-(void)sparkSetupViewController:(SparkSetupMainController *)controller didFinishWithResult:(SparkSetupMainControllerResult)result device:(SparkDevice *)device;
```

```swift
func sparkSetupViewController(controller: SparkSetupMainController!, didFinishWithResult result: SparkSetupMainControllerResult, device: SparkDevice!);
```
---
method will be called, if `(result == SparkSetupMainControllerResultSuccess)` or (or simply `(result == .Success)` in Swift) the device parameter will contain an active `SparkDevice` instance you can interact with
using the [iOS Cloud SDK](https://cocoapods.org/pods/Spark-SDK).

### Example

CocoaPods usage example app (in Swift) can be found [here](https://www.github.com/spark/spark-setup-ios-example/). Example app demonstrates - invoking the setup wizard, customizing its UI and using the returned SparkDevice instance once
setup wizard completes (delegate). Feel free to contribute to the example by submitting pull requests.

A new example app demonstrating the usage of Carthage installation method is available [here](https://github.com/spark/ios-app-example-carthage).

### Reference

Check out the [Reference in Cocoadocs website](http://cocoadocs.org/docsets/SparkSetup/) or consult the JavaDoc style comments in `SparkSetupCustomization.h` and `SparkSetupMainController.h` for each public method or property.
If the Device Setup library installation completed successfully - you should be able to press `Esc` to get an auto-complete hints from XCode for each public method or property in the library.

### Requirements / limitations

- iOS 8.0 and up supported
- Currently setup wizard displays on portrait mode only.
- XCode 6.0 and up is required

### Installation

#### CocoaPods

Particle Device Setup library is available through [CocoaPods](http://cocoapods.org). CocoaPods is an easy to use dependency manager for iOS.
You must have CocoaPods installed, if you don't then be sure to [Install CocoaPods](https://guides.cocoapods.org/using/getting-started.html) before you start:
To install the iOS Device Setup library, simply add the following line to your Podfile on main project folder:

```ruby
pod "SparkSetup"
```

and then run `pod update`. A new `.xcworkspace` file will be created for you to open by CocoaPods, open that workspace file in Xcode and you can start invoking a new instance of the setup process viewcontroller - refer to the examples above. Don't forget to add `#import "SparkSetup.h"` to the source file in which you want to invoke setup in (that is not required for swift projects).


#### Support for Swift projects
To use Particle Device Setup library from within Swift based projects - you'll need to configure a bridging header - please [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/),
as an additional resource you can consult official [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) on the matter.

#### Carthage

*New since v0.4.0*
Starting version 0.4.0 Particle iOS device setup library is available through [Carthage](https://github.com/Carthage/Carthage). Carthage is intended to be the simplest way to add frameworks to your Cocoa application.
You must have Carthage installed, if you don't then be sure to [install Carthage](https://github.com/Carthage/Carthage#installing-carthage) before you start.
Then to build the Particle iOS device setup library, simply create a `Cartfile` on your project root folder (that's important), containing the following line:

```
github "spark/spark-setup-ios" ~> 0.4.0
```

and then run the following command:
`carthage update --platform iOS --use-submodules --no-use-binaries`.

*you can also re-use/copy the `bin/setup` shell script in your project, find it [here](https://github.com/spark/spark-setup-ios/blob/master/bin/setup)*

A new folder will be created in your project root folder - when Carthage checkout and builds are done, navigate to the `./Carthage/Build/iOS` folder and drag all the created `.framework`s files into your project in XCode.
Go to your XCode target settings->General->Embedded binaries and press `+` and add all the `.framework` files there too - make sure the `ParticleDeviceSetupLibrary.framework`, `ParticleSDK.framework` and the `AFNetworking.framework` are listed there.
Build your project - you now have the Particle SDK embedded in your project.
Use `#import <ParticleDeviceSetupLibrary/ParticleDeviceSetupLibrary.h>` in Obj-C files or `import ParticleDeviceSetupLibrary` for Swift files to gain access to `SparkSetupMainController` (see usage example).

No need for any special process or operation integrating the Device Setup Library with Swift-based or Swift-dependent projects. This is the recommended way if you have a mixed set of dependencies.


### Communication

- If you **need help**, use [Our community website](http://community.particle.io), use the `Mobile` category for discussion/troubleshooting iOS apps using the Particle iOS Cloud SDK.
- If you are certain you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue, label it as `bug`.
- If you **have a feature request**, open an issue with an `enhancement` label on it
- If you **want to contribute**, submit a pull request, be sure to check out spark.github.io for our contribution guidelines, and please sign the [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).

### License

Particle Device Setup library and the Particle iOS Cloud SDK are both available under the Apache License 2.0. See the LICENSE file in the repository for more information.
