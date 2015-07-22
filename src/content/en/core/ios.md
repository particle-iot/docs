---
word: iOS
title: iOS SDK
order: 11
---

iOS Cloud SDK
=======

Particle iOS Cloud SDK enables iOS apps to interact with Particle-powered connected products via the Particle Cloud. It’s an easy-to-use wrapper for Particle REST API. The Cloud SDK will allow you to:

- Manage user sessions for the Particle Cloud (access tokens, encrypted session management)
- Claim/Unclaim devices for a user account
- Get a list of instances of user's Particle devices
- Read variables from devices
- Invoke functions on devices
- Publish events from the mobile app and subscribe to events coming from devices *(Coming Soon)*

All cloud operations take place asynchronously and use the well-known completion blocks (closures for swift) design pattern for reporting results allowing you to build beautiful responsive apps for your Particle products and projects.
iOS Cloud SDK is implemented as an open-source Cocoapod library. See [Installation](#ios-cloud-sdk-installation) section for more details. It works well for both Objective-C and [Swift](#support-for-swift-projects) projects.

**Rebranding notice**

Spark has been recently rebranded as Particle.
Code currently refers to `SparkCloud` and `SparkDevice`, this will soon be replaced with `ParticleCloud` and `ParticleDevice`. A new Cocoapod library will be published and current one will be depracated and point to the new one. This should not bother or affect your code.

**Beta notice**

This SDK is still under development and is currently released as Beta, although tested, bugs and issues may be present, some code might require cleanups.

## Getting Started

- Perform the installation step described under the **Installation** section below for integrating in your own project
- You can also [Download Particle iOS Cloud SDK](https://github.com/spark/spark-sdk-ios/archive/master.zip) and try out the included iOS example app
- Be sure to check [Usage](#ios-cloud-sdk-usage) before you begin for some code examples

## Usage

Cloud SDK usage involves two basic classes: first is `SparkCloud` which is a singleton object that enables all basic cloud operations such as user authentication, device listing, claiming etc. Second class is `SparkDevice` which is an instance represnting a claimed device in the current user session. Each object enables device-specific operation such as: getting its info, invoking functions and reading variables from it.

Here are few examples for the most common use cases to get your started:

#### Logging in to Particle cloud
You don't need to worry about access tokens, SDK takes care of that for you

**Objective-C**
```objc
[[SparkCloud sharedInstance] loginWithUser:@"ido@particle.io" password:@"userpass" completion:^(NSError *error) {
    if (!error)
        NSLog(@"Logged in to cloud");
    else
        NSLog(@"Wrong credentials or no internet connectivity, please try again");
}];
```
---
**Swift**

```swift
SparkCloud.sharedInstance().loginWithUser("ido@particle.io", password: "userpass") { (error:NSError!) -> Void in
    if let e=error {
        println("Wrong credentials or no internet connectivity, please try again")
    }
    else {
        println("Logged in")
    }
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
SparkCloud.sharedInstance().getDevices { (sparkDevices:[AnyObject]!, error:NSError!) -> Void in
    if let e = error {
        println("Check your internet connectivity")
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

#### Read a variable from a Particle device (Core/Photon)
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
myPhoton!.getVariable("temperature", completion: { (result:AnyObject!, error:NSError!) -> Void in
    if let e=error {
        println("Failed reading temperature from device")
    }
    else {
        if let temp = result as? Float {
            println("Room temperature is \(temp) degrees")
        }
    }
})
```
---

#### Call a function on a Particle device (Core/Photon)
Invoke a function on the device and pass a list of parameters to it, `resultCode` on the completion block will represent the returned result code of the function on the device

**Objective-C**
```objc
[myPhoton callFunction:@"digitalwrite" withArguments:@[@"D7",@1] completion:^(NSNumber *resultCode, NSError *error) {
    if (!error)
    {
        NSLog(@"LED on D7 successfully turned on");
    }
}];
```
---

**Swift**
```swift
let funcArgs = ["D7",1]
myPhoton!.callFunction("digitalwrite", withArguments: funcArgs) { (resultCode : NSNumber!, error : NSError!) -> Void in
    if (error == nil) {
        println("LED on D7 successfully turned on")
    }
}
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
println("MyDevice first Variable is called \(myDeviceVariables!.keys.first) and is from type \(myDeviceVariables?.values.first)")

let myDeviceFunction = myPhoton.functions
println("MyDevice first function is called \(myDeviceFunction!.first)")
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
    SparkCloud.sharedInstance().getDevice("53fa73265066544b16208184", completion: { (device:SparkDevice!, error:NSError!) -> Void in
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
_or_
```swift
myPhoton!.rename("myNewDeviceName", completion: { (error:NSError!) -> Void in
    if (error == nil) {
        println("Device successfully renamed")
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

### Additional reference
For additional reference check out the [Reference in Cocoadocs website](http://cocoadocs.org/docsets/Spark-SDK/) for full coverage of `SparkDevice` and `SparkCloud` functions and member variables. In addition you can consult the javadoc style comments in `SparkCloud.h` and `SparkDevice.h` for each public method. If Particle iOS Cloud SDK is integrated in your XCode project you should be able to press `Esc` to get an auto-complete hints for each cloud and device method.

## Installation

Particle iOS Cloud SDK is available through [CocoaPods](http://cocoapods.org). Cocoapods is an easy to use dependacy manager for iOS.
You must have Cocoapods installed, if you don't then be sure to [Install Cocoapods](https://guides.cocoapods.org/using/getting-started.html) before you start:
To install the iOS Cloud SDK, simply add the following line to your Podfile on main project folder:

```ruby
pod "Spark-SDK"
```

and then run `pod update`. A new `.xcworkspace` file will be created for you to open by Cocoapods, open that file workspace file in XCode and you can start interacting with Particle cloud and devices by
adding `#import "Spark-SDK.h"`. (that is not required for swift projects)

## Communication

- If you **need help**, use [Our community website](http://community.particle.io), use the `Mobile` category for dicussion/troubleshooting iOS apps using the Particle iOS Cloud SDK.
- If you are certain you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue, label it as `bug`.
- If you **have a feature request**, open an issue with an `enhancement` label on it
- If you **want to contribute**, submit a pull request, be sure to check out spark.github.io for our contribution guidelines, and please sign the [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).


#### Support for Swift projects
To use iOS Cloud SDK from within Swift based projects [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/).
For a detailed step-by-step help on integrating the Cloud SDK within a Swift project check out this [Particle community posting](https://community.particle.io/t/mobile-sdk-building-the-bridge-from-swift-to-objective-c/12020/1).

The [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) is an important resource on mixing Objective-C and Swift code, be sure to read through that as well.

_Notice_ that we've included the required bridging header file in the SDK, you just need to copy it to your project add it as the active bridging header file in the project settings as described in the links above.
There's also an [example app](https://github.com/spark/spark-setup-ios-example), this app also demonstrates the Particle DeviceSetup library usage, as well as several Cloud SDK calls.

## License

Particle iOS Cloud SDK is available under the Apache License 2.0. See the LICENSE file for more info.
