---
title: iOS SDK
layout: reference.hbs
columns: three
order: 20
---

# {{title}}

Particle provides two iOS libraries:
1. [Cloud SDK](#ios-cloud-sdk) - an API wrapper that enables your mobile app to interact with internet-connected hardware through the Particle Device Cloud.
2. [Photon Setup Library](#photon-setup-library) - a library which provides an easy setup wizard for your app users to set up their Particle-powered devices.

## Requirements

Cloud SDK supports iOS 8.0 and up, Photon Setup Library supports iOS 9.0 and up.

## Support and Contributions

- If you **need help**, visit the [mobile category](http://community.particle.io/c/mobile) in our [community forums](http://community.particle.io) for discussion, troubleshooting, and feedback around the iOS Cloud SDK and Photon Setup Library.
- If you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue in the appropriate repo [on GitHub](https://github.com/search?q=org%3Aparticle-iot+ios&unscoped_q=ios), and apply the `bug` label.
- If you **have a feature request**, open an issue in the appropriate repo [on GitHub](https://github.com/search?q=org%3Aparticle-iot+ios&unscoped_q=ios), and apply the `enhancement` label.
- If you **want to contribute**, submit a pull request. Also be sure to check out [the contribution guidelines](http://particle-iot.github.io/#contributions), and sign our [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).

## iOS Cloud SDK

### Introduction

Particle iOS Cloud SDK enables iOS apps to interact with Particle-powered connected products via the Particle Cloud. It’s an easy-to-use wrapper for Particle REST API. The Cloud SDK will allow you to:

- Manage & inject user sessions for the Particle Cloud (access tokens, encrypted session management)
- Claim/Unclaim devices for a user account
- Get a list of Particle devices claimed by user
- Read variables from devices
- Invoke functions on devices
- Publish events from the mobile app and subscribe to events coming from devices
- Get data usage information for Electron devices

All cloud operations take place asynchronously and use the well-known completion blocks (closures for swift) design pattern for reporting results allowing you to build beautiful responsive apps for your Particle products and projects.
iOS Cloud SDK is implemented as an open-source CocoaPods static library and also as Carthage dynamic framework dependency. See [Installation](#installation) section for more details. It works well for both Objective-C and [Swift](#support-for-swift-projects) projects.

**Swift support**

One of the great things about Swift is that it transparently interoperates with Objective-C code, both existing frameworks written in Objective-C and code in your app. However, in Swift there’s a strong distinction between optional and non-optional references, e.g. `NSView` vs. `NSView?`, while Objective-C represents both of these two types as `NSView *`. Because the Swift compiler can’t be sure whether a particular `NSView *` is optional or not, the type is brought into Swift as an implicitly unwrapped optional, NSView!.
In previous Xcode releases, some Apple frameworks had been specially audited so that their API would show up with proper Swift optionals. Starting Xcode 6.3 there's support for this on your own code with a new Objective-C language feature: nullability annotations.
The new nullability annotations have been integrated into the Particle iOS Cloud SDK library so now it plays nicely with Swift projects.

All SDK callbacks return real optionals (`ParticleDevice?`) instead of implicitly unwrapped optionals (`ParticleDevice!`). See Swift examples below. Basically only a simple change required from the SDK user: to replace your callback argument types from `!` suffix to `?` suffix.

### Getting Started

- Perform the installation step described under the **Installation** section below for integrating in your own project
- You can also [Download Particle iOS Cloud SDK](https://github.com/particle-iot/particle-cloud-sdk-ios/archive/master.zip) and try out the included iOS example app
- Be sure to check [Usage](#usage) before you begin for some code examples

### Usage

Cloud SDK usage involves two basic classes: first is `ParticleCloud` which is a singleton object that enables all basic cloud operations such as user authentication, device listing, claiming etc. Second class is `ParticleDevice` which is an instance representing a claimed device in the current user session. Each object enables device-specific operation such as: getting its info, invoking functions and reading variables from it.

##### Return values

Most SDK functions will return an [`NSURLSessionDataTask`](https://developer.apple.com/library/prerelease/ios/documentation/Foundation/Reference/NSURLSessionDataTask_class/index.html) object that can be queried by the app developer for further information about the status of the network operation. This is a result of the SDK relying on AFNetworking which is a networking library for iOS and macOS (OS X). It's built on top of the Foundation URL Loading System, extending the powerful high-level networking abstractions built into Cocoa. The Particle Device Cloud SDK has been relying on this powerful library since the beginning, but when version 3.0 was released not long ago it contained some breaking changes, the main change from 2.x is that `NSURLConnectionOperation` was deprecated by Apple and `NSURLSessionDataTask` was introduced to replace it. You can ignore the return value (previously it was just `void`) coming out of the SDK functions, alternatively you can now make use of the `NSURLSessionDataTask` object as described.

##### Error handling
_Starting SDK version 0.8.0_

If there's an error while executing API request, completion block will have non-null error object. `userInfo` dictionary has 2 custom values:
* `ParticleSDKErrorResponseBodyKey` is the NSDictionary representation of JSON server response.
* `ParticleSDKErrorLocalizedStringKey` contains human readable error message.  

`NSError.code` contains HTTP status code. `NSError.localizedDescription` contains best attempt trying to explain what happened in human readable language based on `ParticleSDKErrorLocalizedStringKey` and `NSError.code`.

Here are few examples for the most common use cases to get your started:

#### Logging in to Particle cloud
You don't need to worry about access tokens and session expiry, SDK takes care of that for you

**Objective-C**
```objc
[[ParticleCloud sharedInstance] loginWithUser:@"username@email.com" password:@"userpass" completion:^(NSError *error) {
    if (!error)
        NSLog(@"Logged in to cloud");
    else
        NSLog(@"Wrong credentials or no internet connectivity, please try again");
}];
```
---

**Swift**
```swift
ParticleCloud.sharedInstance().login(withUser: "username@email.com", password: "userpass") { (error:Error?) -> Void in
    if let _ = error {
        print("Wrong credentials or no internet connectivity, please try again")
    }
    else {
        print("Logged in")
    }
}
```
---
#### Injecting a session access token (app utilizes two legged authentication)

If you use your own backend to authenticate users in your app - you can now inject the Particle access token your back end gets from Particle cloud easily using one of the new `injectSessionAccessToken` functions exposed from `ParticleCloud` singleton class. In turn the `.isLoggedIn` property has been deprecated in favor of `.isAuthenticated` - which checks for the existence of an active access token instead of a username. Additionally the SDK will now automatically renew an expired session if a refresh token exists. As increased security measure the Cloud SDK will no longer save user's password in the Keychain.

**Objective-C**
```objc
if ([[ParticleCloud sharedInstance] injectSessionAccessToken:@"9bb9f7433940e7c808b191c28cd6738f8d12986c"])
    NSLog(@"Session is active!");
else
    NSLog(@"Bad access token provided");
```
---

**Swift**
```swift
if ParticleCloud.sharedInstance().injectSessionAccessToken("9bb9f7433940e7c808b191c28cd6738f8d12986c") {
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
__block ParticleDevice *myPhoton;
[[ParticleCloud sharedInstance] getDevices:^(NSArray *particleDevices, NSError *error) {
    NSLog(@"%@",particleDevices.description); // print all devices claimed to user

    for (ParticleDevice *device in particleDevices)
    {
        if ([device.name isEqualToString:@"myNewPhotonName"])
            myPhoton = device;
    }
}];
```
---

**Swift**

```swift
var myPhoton : ParticleDevice?
ParticleCloud.sharedInstance().getDevices { (devices:[ParticleDevice]?, error:Error?) -> Void in
    if let _ = error {
        print("Check your internet connectivity")
    }
    else {
        if let d = devices {
            for device in d {
                if device.name == "myNewPhotonName" {
                    myPhoton = device
                }
            }
        }
    }
}
```
---

#### Read a variable from a Particle device
Assuming here that `myPhoton` is an active instance of `ParticleDevice` class which represents a device claimed to current user:

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
myPhoton!.getVariable("temperature", completion: { (result:Any?, error:Error?) -> Void in
    if let _ = error {
        print("Failed reading temperature from device")
    }
    else {
        if let temp = result as? NSNumber {
            print("Room temperature is \(temp.stringValue) degrees")
        }
    }
})
```
---
#### Call a function on a Particle device
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

#### Retrieve current data usage (Electron only)
_Starting SDK version 0.5.0_

Assuming here that `myElectron` is an active instance of `ParticleDevice` class which represents an Electron device:

**Objective-C**
```objc
[myElectron getCurrentDataUsage:^(float dataUsed, NSError * error) {
    if (!error) {
        NSLog(@"device has used %f MBs of data this month",dataUsed);
    }
}];
```
---

**Swift**
```swift
self.selectedDevice!.getCurrentDataUsage { (dataUsed: Float, error :Error?) in
    if (error == nil) {
        print("Device has used "+String(dataUsed)+" MBs this month")
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
print("MyDevice first Variable is called \(myDeviceVariables!.keys.first) and is from type \(myDeviceVariables?.values.first)")

let myDeviceFunction = myPhoton.functions
print("MyDevice first function is called \(myDeviceFunction!.first)")
```
---
#### Get an instance of a device
Get a device instance by its ID:

**Objective-C**
```objc
__block ParticleDevice *myOtherDevice;
NSString *deviceID = @"53fa73265066544b16208184";
[[ParticleCloud sharedInstance] getDevice:deviceID completion:^(ParticleDevice *device, NSError *error) {
    if (!error)
        myOtherDevice = device;
}];
```
---

**Swift**
```swift
var myOtherDevice : ParticleDevice? = nil
    ParticleCloud.sharedInstance().getDevice("53fa73265066544b16208184", completion: { (device:ParticleDevice?, error:Error?) -> Void in
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
[[ParticleCloud sharedInstance] logout];
```
---

**Swift**
```swift
ParticleCloud.sharedInstance().logout()
```
---
### Events sub-system

You can make an API call that will open a stream of [Server-Sent Events (SSEs)](http://www.w3.org/TR/eventsource/). You will make one API call that opens a connection to the Particle Device Cloud. That connection will stay open, unlike normal HTTP calls which end quickly. Very little data will come to you across the connection unless your Particle device publishes an event, at which point you will be immediately notified. In each case, the event name filter is `eventNamePrefix` and is optional. When specifying an event name filter, published events will be limited to those events with names that begin with the specified string. For example, specifying an event name filter of 'temp' will return events with names 'temp' and 'temperature'.

#### Subscribe to events

Subscribe to the firehose of public events with name that starts with "temp", plus the private events published by devices one owns:

_Starting SDK version 0.8.0_

Public event stream **no longer accepts*** nil or empty string as the eventNamePrefix

**Objective-C**
```objc
// The event handler:
ParticleEventHandler handler = ^(ParticleEvent *event, NSError *error) {
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
id eventListenerID = [[ParticleCloud sharedInstance] subscribeToAllEventsWithPrefix:@"temp" handler:handler];
```
---

**Swift**
```swift
var handler : Any?
handler = ParticleCloud.sharedInstance().subscribeToAllEvents(withPrefix: "temp", handler: { (event :ParticleEvent?, error : Error?) in
    if let _ = error {
        print ("could not subscribe to events")
    } else {
        DispatchQueue.main.async(execute: {
            print("got event with data \(event?.data)")
        })
    }
})
```
---

*Note:* You can have multiple handlers per event name and/or same handler per multiple events names.


Subscribe to all events, public and private, published by devices the user owns (`handler` is a Obj-C block or Swift closure:

**Objective-C**

```objc
id eventListenerID = [[ParticleCloud sharedInstance] subscribeToMyDevicesEventsWithPrefix:@"temp" handler:handler];
```
---

**Swift**

```swift
var eventListenerID : Any?
eventListenerID = ParticleCloud.sharedInstance().subscribeToMyDevicesEvents(withPrefix: "temp", handler: handler)
```
---

Subscribe to events from one specific device (by deviceID, second parameter). If the API user owns the device, then he will receive all events, public and private, published by that device. If the API user does not own the device he will only receive public events.

**Objective-C**

```objc
id eventListenerID = [[ParticleCloud sharedInstance] subscribeToDeviceEventsWithPrefix:@"temp" deviceID:@"53ff6c065075535119511687" handler:handler];
```
---

**Swift**

```swift
var eventListenerID : Any?
eventListenerID = ParticleCloud.sharedInstance().subscribeToDeviceEvents(withPrefix: "temp", deviceID: "53ff6c065075535119511687", handler: handler)
```
---

other option is calling same method via the `ParticleDevice` instance:

**Objective-C**

```objc
id eventListenerID = [device subscribeToEventsWithPrefix:@"temp" handler:handler];
```
---

**Swift**

```swift
var eventListenerID : Any?
eventListenerID = device.subscribeToEvents(withPrefix : "temp", handler : handler)
```
---

this guarantees that private events will be received since having access device instance in your app signifies that the user has this device claimed.

#### Unsubscribing from events

Very straightforward. Keep the id object the subscribe method returned and use it as parameter to call the unsubscribe method:

**Objective-C**

```objc
[[ParticleCloud sharedInstance] unsubscribeFromEventWithID:eventListenerID];
```
---

**Swift**

```swift
if let sid = eventListenerID {
    ParticleCloud.sharedInstance().unsubscribeFromEvent(withID: sid)
}
```
---

or via the `ParticleDevice` instance (if applicable):

**Objective-C**

```objc
[device unsubscribeFromEventWithID:self.eventListenerID];
```
---

**Swift**

```swift
device.unsubscribeFromEvent(withID : eventListenerID)
```
---

#### Publishing an event

You can also publish an event from your app to the Particle Device Cloud:

**Objective-C**

```objc
[[ParticleCloud sharedInstance] publishEventWithName:@"event_from_app" data:@"event_payload" isPrivate:NO ttl:60 completion:^(NSError *error) {
    if (error)
    {
        NSLog(@"Error publishing event: %@",error.localizedDescription);
    }
}];
```
---

**Swift**

```swift
ParticleCloud.sharedInstance().publishEvent(withName: "event_from_app", data: "event_payload", isPrivate: false, ttl: 60, completion: { (error:Error?) -> Void in
    if error != nil
    {
        print("Error publishing event" + e.localizedDescription)
    }
})
```
---

### Delegate Protocol

_Starting version 0.5.0_

You can opt-in to conform to the `ParticleDeviceDelegate` protocol in your ViewController code if you want to register for receiving system events notifications about the specific device.
You do it by setting `device.delegate = self` where device is an instance of `ParticleDevice`.

The function that will be called on the delegate is:
`-(void)particleDevice:(ParticleDevice *)device didReceiveSystemEvent:(ParticleDeviceSystemEvent)event;`

and then you can respond to the various system events by:

```swift
func particleDevice(device: ParticleDevice, receivedSystemEvent event: ParticleDeviceSystemEvent) {
        print("Received system event "+String(event.rawValue)+" from device "+device.name!)
        // do something meaningful
    }
```
---

The system events types are:
- CameOnline (device came online)
- WentOffline (device went offline)
- FlashStarted (OTA flashing started)
- FlashSucceeded (OTA flashing succeeded - new user firmware app is live)
- FlashFailed (OTA flashing process failed - user firmware app was not updated)
- AppHashUpdated (a new app which is different from last one was flashed to the device)
- EnteredSafeMode (device has entered safe mode due to firmware dependency issue )
- SafeModeUpdater (device is trying to heal itself out of safe mode)

### OAuth client configuration

If you are creating an app, you are required to provide the `ParticleCloud` class with OAuth clientId and secret.
Those are used to identify users coming from your specific app to the Particle Device Cloud.
Please follow the procedure described [in our guide](/tutorials/device-cloud/authentication) to create those strings,
then in your `AppDelegate` class you can supply those credentials by setting the following properties in `ParticleCloud` singleton:

```objc
@property (nonatomic, strong) NSString *OAuthClientId;
@property (nonatomic, strong) NSString *OAuthClientSecret;
```

**Important**
Those credentials should be kept as secret. 

### Installation

#### CocoaPods

Particle iOS Cloud SDK is available through [CocoaPods](http://cocoapods.org). CocoaPods is an easy to use dependency manager for iOS.
You must have CocoaPods installed, if you don't then be sure to [Install CocoaPods](https://guides.cocoapods.org/using/getting-started.html) before you start:
To install the iOS Cloud SDK, simply add the following line to your Podfile on main project folder:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

target 'YourAppName' do
    pod 'Particle-SDK'
end
```

Replace `YourAppName` with your app target name - usually shown as the root item name in the XCode project.
In your shell - run `pod update` in the project folder. A new `.xcworkspace` file will be created for you to open by Cocoapods, open that file workspace file in Xcode and you can start interacting with Particle cloud and devices by
adding `#import "Particle-SDK.h"`. (that is not required for swift projects)

##### Support for Swift projects

To use iOS Cloud SDK from within Swift based projects [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/).
For a detailed step-by-step help on integrating the Cloud SDK within a Swift project check out this [Particle community posting](https://community.particle.io/t/mobile-sdk-building-the-bridge-from-swift-to-objective-c/12020/1).

The [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) is an important resource on mixing Objective-C and Swift code, be sure to read through that as well.

There's also an [example app](https://github.com/particle-iot/example-app-ios), this app also demonstrates the Particle DeviceSetup library usage, as well as several Cloud SDK calls.

#### Carthage

The SDK is now also available as a [Carthage](https://github.com/Carthage/Carthage) dependency since version 0.4.0.

Before CocoaPods v1.5.0 `use_frameworks!` flag was mandatory for dependencies written in Swift. This has caused a lot of problems while compiling projects that had dependencies written in both languages. To counter this problem, we added Carthage support and marked it as recommended way for quite a while. This is no longer the case as both dependency managers work well now.

Be sure to [install Carthage](https://github.com/Carthage/Carthage#installing-carthage) before you start.
Then to build the iOS Cloud SDK, simply create a `Cartfile` on your project root folder, containing the following line:

```
github "particle-iot/particle-cloud-sdk-ios" "master"
```

and then run the following command:
`carthage update --platform iOS --use-submodules --no-use-binaries`.
A new folder will be created in your project root folder - navigate to the `./Carthage/Build/iOS` folder and drag all the created `.framework`s file into your project in XCode.
Go to your XCode target settings->General->Embedded binaries and make sure the `ParticleSDK.framework` and the `AFNetworking.framework` are listed there.
Build your project - you now have the Particle SDK embedded in your project.

### Reference

#### ParticleCloud class

  `@property (nonatomic, strong, nullable, readonly) NSString* loggedInUsername`

Currently logged in user name, nil if no valid session

  `@property (nonatomic, readonly) BOOL isAuthenticated`

Currently authenticated (does a access token exist?)

  `@property (nonatomic, strong, nullable, readonly) NSString *accessToken`

Current session access token string, nil if not logged in

  `@property (nonatomic, nullable, strong) NSString *oAuthClientId`

oAuthClientId unique for your app, use 'particle' for development or generate your OAuth creds for production apps (/reference/api/#create-an-oauth-client)

  `@property (nonatomic, nullable, strong) NSString *oAuthClientSecret`

oAuthClientSecret unique for your app, use 'particle' for development or generate your OAuth creds for production apps (/reference/api/#create-an-oauth-client)

  `@property (nonatomic, nullable, strong) NSString *customAPIBaseURL`

Base URL for the Particle Cloud API. This can be used to proxy all API calls though your server or to point at staging server.

  `+ (instancetype)sharedInstance`

Singleton instance of ParticleCloud class

  `-(NSURLSessionDataTask *)loginWithUser:(NSString *)user password:(NSString *)password completion:(nullable ParticleCompletionBlock)completion`

Login with existing account credentials to Particle cloud

 * **Parameters:**
   * `user` — User name, must be a valid email address
   * `password` — Password
   * `completion` — Completion block will be called when login finished, NS/Error object will be passed in case of an error, nil if success

  `-(NSURLSessionDataTask *)createUser:(NSString *)username password:(NSString *)password accountInfo:(nullable NSDictionary *)accountInfo completion:(nullable ParticleCompletionBlock)completion`

Sign up with new account credentials to Particle cloud

 * **Parameters:**
   * `user` — Required user name, must be a valid email address
   * `password` — Required password
   * `accountInfo` — Optional dictionary with extended account info fields: firstName, lastName, isBusinessAccount [NSNumber @0=false, @1=true], companyName
   * `completion` — Completion block will be called when sign-up finished, NSError object will be passed in case of an error, nil if success

  `-(nullable NSURLSessionDataTask *)createCustomer:(NSString *)username password:(NSString *)password productId:(NSUInteger)productId accountInfo:(nullable NSDictionary *)accountInfo completion:(nullable ParticleCompletionBlock)completion`

Sign up with new account credentials to Particle cloud

 * **Parameters:**
   * `username` — Required user name, must be a valid email address
   * `password` — Required password
   * `productId` — Required ProductID number should be copied from console for your specific product
   * `accountInfo` — Optional account information metadata that contains fields: first_name, last_name, company_name, business_account [boolean] - currently has no effect for customers
   * `completion` — Completion block will be called when sign-up finished, NSError object will be passed in case of an error, nil if success

  `-(void)logout`

Logout user, remove session data

  `-(BOOL)injectSessionAccessToken:(NSString * _Nonnull)accessToken`

Inject session access token received from a custom backend service in case Two-legged auth is being used. This session expected not to expire, or at least SDK won't know about its expiration date.

 * **Parameters:** `accessToken` — Particle Access token string
 * **Returns:** YES if session injected successfully

  `-(BOOL)injectSessionAccessToken:(NSString *)accessToken withExpiryDate:(NSDate *)expiryDate`

Inject session access token received from a custom backend service in case Two-legged auth is being used. Session will expire at expiry date.

 * **Parameters:**
   * `accessToken` — Particle Access token string
   * `expiryDate` — Date/time in which session expire and no longer be active - you'll have to inject a new session token at that point.
 * **Returns:** YES if session injected successfully

  `-(BOOL)injectSessionAccessToken:(NSString *)accessToken withExpiryDate:(NSDate *)expiryDate andRefreshToken:(NSString *)refreshToken`

Inject session access token received from a custom backend service in case Two-legged auth is being used. Session will expire at expiry date, and SDK will try to renew it using supplied refreshToken.

 * **Parameters:**
   * `accessToken` — Particle Access token string
   * `expiryDate` — Date/time in which session expire
   * `refreshToken` — Refresh token will be used automatically to hit Particle cloud to create a new active session access token.
 * **Returns:** YES if session injected successfully

  `-(NSURLSessionDataTask *)requestPasswordResetForUser:(NSString *)email completion:(nullable ParticleCompletionBlock)completion`

Request password reset for user command generates confirmation token and sends email to customer using org SMTP settings

 * **Parameters:**
   * `email` — user email
   * `completion` — Completion block with NSError object if failure, nil if success



 * **Parameters:**
   * `email` — user email
   * `completion` — Completion block with NSError object if failure, nil if success

  `-(NSURLSessionDataTask *)getDevices:(nullable void (^)(NSArray<ParticleDevice *> * _Nullable particleDevices, NSError * _Nullable error))completion`

Get an array of instances of all user's claimed devices offline devices will contain only partial data (no info about functions/variables)

 * **Parameters:** `completion` — Completion block with the device instances array in case of success or with NSError object if failure
 * **Returns:** NSURLSessionDataTask task for requested network access

  `-(NSURLSessionDataTask *)getDevice:(NSString *)deviceID completion:(nullable void (^)(ParticleDevice * _Nullable device, NSError * _Nullable error))completion`

Get a specific device instance by its deviceID. If the device is offline the instance will contain only partial information the cloud has cached, notice that the the request might also take quite some time to complete for offline devices.

 * **Parameters:**
   * `deviceID` — required deviceID
   * `completion` — Completion block with first argument as the device instance in case of success or with second argument NSError object if operation failed
 * **Returns:** NSURLSessionDataTask task for requested network access

  `-(NSURLSessionDataTask *)claimDevice:(NSString *)deviceID completion:(nullable ParticleCompletionBlock)completion`

Claim the specified device to the currently logged in user (without claim code mechanism)

 * **Parameters:**
   * `deviceID` — required deviceID
   * `completion` — Completion block with NSError object if failure, nil if success
 * **Returns:** NSURLSessionDataTask task for requested network access

  `-(NSURLSessionDataTask *)generateClaimCode:(nullable void(^)(NSString * _Nullable claimCode, NSArray * _Nullable userClaimedDeviceIDs, NSError * _Nullable error))completion`

Get a short-lived claiming token for transmitting to soon-to-be-claimed device in soft AP setup process

 * **Parameters:** `completion` — Completion block with claimCode string returned (48 random bytes base64 encoded to 64 ASCII characters), second argument is a list of the devices currently claimed by current session user and third is NSError object for failure, nil if success
 * **Returns:** NSURLSessionDataTask task for requested network access


  `-(NSURLSessionDataTask *)generateClaimCodeForProduct:(NSUInteger)productId completion:(nullable void(^)(NSString *_Nullable claimCode, NSArray * _Nullable userClaimedDeviceIDs, NSError * _Nullable error))completion`

Get a short-lived claiming token for transmitting to soon-to-be-claimed device in soft AP setup process for specific product and organization (different API endpoints)

 * **Parameters:**
   * `productId` — - the product id number
   * `completion` — Completion block with claimCode string returned (48 random bytes base64 encoded to 64 ASCII characters), second argument is a list of the devices currently claimed by current session user and third is NSError object for a failure, nil if success
 * **Returns:** NSURLSessionDataTask task for requested network access

  `-(nullable id)subscribeToAllEventsWithPrefix:(nullable NSString *)eventNamePrefix handler:(nullable ParticleEventHandler)eventHandler`

Subscribe to the firehose of public events, plus private events published by devices one owns

_Starting SDK version 0.8.0_

Public event stream **no longer accepts*** nil or empty string as the eventNamePrefix

 * **Parameters:**
   * `eventHandler` — ParticleEventHandler event handler method - receiving NSDictionary argument which contains keys: event (name), data (payload), ttl (time to live), published_at (date/time emitted), coreid (device ID). Second argument is NSError object in case error occured in parsing the event payload.
   * `eventName` — Filter only events that match name eventName
 * **Returns:** eventListenerID function will return an id type object as the eventListener registration unique ID - keep and pass this object to the unsubscribe method in order to remove this event listener

  `-(nullable id)subscribeToMyDevicesEventsWithPrefix:(nullable NSString *)eventNamePrefix handler:(nullable ParticleEventHandler)eventHandler`

Subscribe to all events, public and private, published by devices one owns

 * **Parameters:**
   * `eventHandler` — Event handler function that accepts the event payload dictionary and an NSError object in case of an error
   * `eventNamePrefix` — Filter only events that match name eventNamePrefix, for exact match pass whole string, if nil/empty string is passed any event will trigger eventHandler
 * **Returns:** eventListenerID function will return an id type object as the eventListener registration unique ID - keep and pass this object to the unsubscribe method in order to remove this event listener

  `-(nullable id)subscribeToDeviceEventsWithPrefix:(nullable NSString *)eventNamePrefix deviceID:(NSString *)deviceID handler:(nullable ParticleEventHandler)eventHandler`

Subscribe to events from one specific device. If the API user has the device claimed, then she will receive all events, public and private, published by that device. If the API user does not own the device she will only receive public events.

 * **Parameters:**
   * `eventNamePrefix` — Filter only events that match name eventNamePrefix, for exact match pass whole string, if nil/empty string is passed any event will trigger eventHandler
   * `deviceID` — Specific device ID. If user has this device claimed the private & public events will be received, otherwise public events only are received.
   * `eventHandler` — Event handler function that accepts the event payload dictionary and an NSError object in case of an error
 * **Returns:** eventListenerID function will return an id type object as the eventListener registration unique ID - keep and pass this object to the unsubscribe method in order to remove this event listener

  `-(void)unsubscribeFromEventWithID:(id)eventListenerID`

Unsubscribe from event/events.

 * **Parameters:** `eventListenerID` — The eventListener registration unique ID returned by the subscribe method which you want to cancel

  `-(NSURLSessionDataTask *)publishEventWithName:(NSString *)eventName data:(NSString *)data isPrivate:(BOOL)isPrivate ttl:(NSUInteger)ttl completion:(nullable ParticleCompletionBlock)completion`

Subscribe to events from one specific device. If the API user has the device claimed, then she will receive all events, public and private, published by that device. If the API user does not own the device she will only receive public events.

 * **Parameters:**
   * `eventName` — Publish event named eventName
   * `data` — A string representing event data payload, you can serialize any data you need to represent into this string and events listeners will get it
   * `private` — A boolean flag determining if this event is private or not (only users's claimed devices will be able to listen to it)
   * `ttl` — TTL stands for Time To Live. It it the number of seconds that the event data is relevant and meaningful. For example, an outdoor temperature reading with a precision of integer degrees Celsius might have a TTL of somewhere between 600 (10 minutes) and 1800 (30 minutes).

     The geolocation of a large piece of farm equipment that remains stationary most of the time but may be moved to a different field once in a while might have a TTL of 86400 (24 hours). After the TTL has passed, the information can be considered stale or out of date.
 * **Returns:** NSURLSessionDataTask task for requested network access

#### ParticleDevice class

  `typedef void (^ParticleCompletionBlock)(NSError * _Nullable error)`

Standard completion block for API calls, will be called when the task is completed with a nullable error object that will be nil if the task was successful.

  `@property (strong, nonatomic, readonly) NSString* id`

DeviceID string

  `@property (strong, nullable, nonatomic) NSString* name`

Device name. Device can be renamed in the cloud by setting this property. If renaming fails name will stay the same.

  `@property (nonatomic, readonly) BOOL connected`

Is device connected to the cloud? Best effort - May not accurate reflect true state.

  `@property (strong, nonatomic, nonnull, readonly) NSArray<NSString *> *functions`

List of function names exposed by device. Functions are only available after `refresh` is called on the device instance returned by `getDevices` call.

  `@property (strong, nonatomic, nonnull, readonly) NSDictionary<NSString *, NSString *> *variables`

Dictionary of exposed variables on device with their respective types. Variables are only available after `refresh` is called on the device instance returned by `getDevices` call.

  `@property (strong, nonatomic, readonly) NSString *systemFirmwareVersion`

Device firmware version string

  `@property (strong, nonatomic, nullable, readonly) NSDate *lastHeard`

Date when the device was last heard.

  `@property (strong, nonatomic, nullable, readonly) NSString *appHash`

App hash received from system event after flashing a new different user application. Please note that if you flashe same app, the app hash event won't trigger.

  `@property (strong, nonatomic, nullable, readonly) NSString *networkId`

Mesh network ID if device belongs to a mesh network.

  `@property (nonatomic, readonly) ParticleDeviceNetworkRole networkRole`

Mesh network role if device belongs to a mesh network (gateway or a node).

  `@property (nonatomic, readonly) ParticleDeviceNetworkRoleState networkRoleState`

Mesh network state if device belongs to a mesh network. State can be pending if device is waiting for the role change confirmation.

  `@property (nonatomic, readonly) BOOL isFlashing`

Is device currently being flashed? Best effort - May not accurate reflect true state.

  `@property (strong, nonatomic, nullable, readonly) NSString *lastIPAdress`

Last know IP address of the device.

  `@property (strong, nonatomic, nullable, readonly) NSString *lastIccid`

Last known ICCID (for cellular devices only)

  `@property (strong, nonatomic, nullable, readonly) NSString *imei`

Last know IMEI (for cellular devices only)

  `@property (nonatomic, readonly) NSUInteger platformId`

Device platfomr ID (device type).

  `@property (nonatomic, readonly) NSUInteger productId`

ID of the product device belongs to.

  `@property (strong, nonatomic, nullable, readonly) NSString *serialNumber`

Unique serial number of the device

  `@property (strong, nonatomic, nullable, readonly) NSString *mobileSecret`

Mobile secret of the device. Only available for 3rd gen devices.

  `@property (strong, nonatomic, nullable) NSString *notes`

Additional device notes.

  `@property (nonatomic, readonly) BOOL cellular`

Is this device a cellular device?

  `@property (nonatomic, readonly) BOOL requiresUpdate`

Does this device require software update?

  `@property (nonatomic, readonly) ParticleDeviceType type`

Particle device type. A easier to use version of `platformId`.

  `@property (nonatomic, readonly) NSString *typeString`

`type` casted into a human readable String.

  `-(NSURLSessionDataTask *)getVariable:(NSString *)variableName completion:(nullable void(^)(id _Nullable result, NSError* _Nullable error))completion`

Retrieve a variable value from the device

 * **Parameters:**
   * `variableName` — Variable name
   * `completion` — Completion block to be called when function completes with the variable value retrieved (as id/Any) or NSError object in case on an error

  `-(NSURLSessionDataTask *)callFunction:(NSString *)functionName withArguments:(nullable NSArray *)args completion:(nullable void (^)(NSNumber * _Nullable result, NSError * _Nullable error))completion`

Call a function on the device

 * **Parameters:**
   * `functionName` — Function name
   * `args` — Array of arguments to pass to the function on the device. Arguments will be converted to string maximum length 63 chars.
   * `completion` — Completion block will be called when function was invoked on device. First argument of block is the integer return value of the function, second is NSError object in case of an error invoking the function

  `-(NSURLSessionDataTask *)signal:(BOOL)enable completion:(nullable ParticleCompletionBlock)completion`

Signal device Will make the onboard LED "shout rainbows" for easy physical identification of a device

 * **Parameters:** `enable` — - YES to start or NO to stop LED signal.

  `- (NSURLSessionDataTask *)ping:(nullable void (^)(BOOL result, NSError *_Nullable error))completion`

Request device refresh from cloud update online status/functions/variables/device name, etc

  `-(NSURLSessionDataTask *)refresh:(nullable ParticleCompletionBlock)completion`

Request device refresh from cloud update online status/functions/variables/device name, etc

 * **Parameters:** `completion` — Completion block called when function completes with NSError object in case of an error or nil if success.

  `-(NSURLSessionDataTask *)unclaim:(nullable ParticleCompletionBlock)completion`

Remove device from current logged in user account

 * **Parameters:** `completion` — Completion block called when function completes with NSError object in case of an error or nil if success.

  `-(NSURLSessionDataTask *)rename:(NSString *)newName completion:(nullable ParticleCompletionBlock)completion`

Rename device

 * **Parameters:**
   * `notes` — New device notes
   * `completion` — Completion block called when function completes with NSError object in case of an error or nil if success.

  `-(NSURLSessionDataTask *)setNotes:(NSString *)notes completion:(nullable ParticleCompletionBlock)completion`

Edit device notes.

 * **Parameters:**
   * `newName` — New device name
   * `completion` — Completion block called when function completes with NSError object in case of an error or nil if success.

  `-(NSURLSessionDataTask *)getCurrentDataUsage:(nullable void(^)(float dataUsed, NSError* _Nullable error))completion`

Retrieve current data usage report (For Electron only)

 * **Parameters:** `completion` — Completion block to be called when function completes with the data used in current payment period in (float)MBs. All devices other than Electron will return an error with -1 value

  `-(nullable NSURLSessionDataTask *)flashFiles:(NSDictionary *)filesDict completion:(nullable ParticleCompletionBlock)completion`

Flash files to device

 * **Parameters:**
   * `filesDict` — files dictionary in the following format: @{@"filename.bin" : <NSData>, ...} - that is a NSString filename as key and NSData blob as value. More than one file can be flashed. Data is alway binary.
   * `completion` — Completion block called when function completes with NSError object in case of an error or nil if success. NSError.localized descripion will contain a detailed error report in case of a

  `-(NSURLSessionDataTask *)flashKnownApp:(NSString *)knownAppName completion:(nullable ParticleCompletionBlock)completion`

Flash known firmware images to device

 * **Parameters:**
   * `knownAppName` — NSString of known app name. Currently @"tinker" is supported.
   * `completion` — Completion block called when function completes with NSError object in case of an error or nil if success. NSError.localized descripion will contain a detailed error report in case of a

  `-(nullable id)subscribeToEventsWithPrefix:(nullable NSString *)eventNamePrefix handler:(nullable ParticleEventHandler)eventHandler`

Subscribe to events from this specific (claimed) device - both public and private.

 * **Parameters:**
   * `eventNamePrefix` — Filter only events that match name eventNamePrefix, for exact match pass whole string, if nil/empty string is passed any event will trigger eventHandler
   * `eventHandler` — Event handler function that accepts the event payload dictionary and an NSError object in case of an error

  `-(void)unsubscribeFromEventWithID:(id)eventListenerID`

Unsubscribe from event/events.

 * **Parameters:** `eventListenerID` — The eventListener registration unique ID returned by the subscribe method which you want to cancel

## Photon Setup Library

### Introduction

The Particle Photon Setup library is meant for integrating the initial setup process of Particle devices (Photon, P0, P1) in your app. This library will enable you to easily invoke a standalone setup wizard UI for setting up internet-connected products powered by a Particle device (Photon, P0, P1). The setup UI can be easily customized by a customization proxy class, that includes: look & feel, colors, texts and fonts as well as custom brand logos and custom instructional video for your product. There are good defaults in place if you don’t set these properties, but you can override the look and feel as needed to suit the rest of your app.

The wireless setup process for the Photon uses very different underlying technology from the Core. Where the Core used TI SmartConfig, the Photon uses what we call “soft AP” — i.e.: the Photon advertises a Wi-Fi network, you join that network from your mobile app to exchange credentials, and then the Photon connects using the Wi-Fi credentials you supplied.

With the Photon Setup library, you make one simple call from your app, for example when the user hits a “Setup my device” button, and a whole series of screens then guide the user through the setup process. When the process finishes, the app user is back on the screen where she hit the “setup my device” button, and your code has been passed an instance of the device she just setup and claimed. iOS Photon Setup Library is implemented as an open-source Cocoapod static library and also as Carthage dynamic framework dependancy.

### Usage

**Cocoapods**

Import `ParticleSetup.h` in your view controller implementation file, use bridging header for Swift projects (See [Installation](#installation) section for more details).

**Carthage**

Use `#import <ParticleDeviceSetupLibrary/ParticleDeviceSetupLibrary.h>` in Obj-C files or `import ParticleDeviceSetupLibrary` for Swift files.

and then invoke the device setup wizard by:

**Objective-C**

```objc
ParticleSetupMainController *setupController = [[ParticleSetupMainController alloc] init];
setupController.delegate = self; // why? see "Advanced" section below
[self presentViewController:setupController animated:YES completion:nil];
```
---
**Swift**

```swift
if let setupController = ParticleSetupMainController()
{
    setupController.delegate = self
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---

Alternatively if your app requires separation between the Particle cloud authentication process and the device setup process you can call:

**Objective-C**

```objc
ParticleSetupMainController *setupController = [[ParticleSetupMainController alloc] initWithAuthenticationOnly:YES];
[self presentViewController:setupController animated:YES completion:nil];
```
---

**Swift**

```swift
if let setupController = ParticleSetupMainController(authenticationOnly: true)
{
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---

This will invoke Particle Device Cloud authentication (login/signup/password recovery screens) only after user has successfully logged in or signed up, control will be returned to the calling app. If an active user session already exists control will be returned immediately.

#### Configure device Wi-Fi credentials without claiming it

If your app requires the ability to let users configure device Wi-Fi credentials without changing its ownership you can also do that via `initWithSetupOnly`, and by allowing your users to skip authentication (see `allowSkipAuthentication` flag in customization section) if you present the authentication stage. If an active user session exists - it'll be used and device will be claimed, otherwise it won't. So invoking setup without an active user session will go thru the setup steps required for configuring device Wi-Fi credentials but not for claiming it. However, calling `-initWithSetupOnly:` method with an active user session is essentially the same as calling `-init:`.
Usage:

**Objective-C**

```objc
ParticleSetupMainController *setupController = [[ParticleSetupMainController alloc] initWithSetupOnly:YES];
[self presentViewController:setupController animated:YES completion:nil];
```
---

**Swift**

```swift
if let setupController = ParticleSetupMainController(setupOnly: true)
{
    self.presentViewController(setupController, animated: true, completion: nil)
}
```
---

#### Password manager extension support

Starting library version 0.6.0 the 1Password manager extension support has been added to the signup and login screens - no action is required from the developer - if 1Password is installed on the iOS device the lock icon will appear in the password fields on those screen and will allow user to fill in his saved password (login) or create a new one (signup). Only recommendation is adding `LSApplicationQueriesSchemes = org-appextension-feature-password-management` key-value to your `info.plist` file in your app project.

For additional information read [here](https://github.com/AgileBits/onepassword-app-extension#use-case-1-native-app-login).


### Customization

Customize setup look and feel by accessing the `ParticleSetupCustomization` singleton appearance proxy `[ParticleSetupCustomization sharedInstance]`
and modify its default properties. Setting the properties in this class is optional.
These properies are shown in Objective-C syntax for convenience but work the same for Swift projects - use `String`, `Bool` instead of `NSString` and `BOOL`.

In v0.9 `brandImageBackgroundImage` has been introduced in order to improve support for iPhone X. With introduction with iPhone X, the status bar is no longer fixed at 20px as it was since the original iPhone. To keep changes to API small `brandImage` should remain at 64px height (@1x). Top 20px (@1x) should still remain clear and the logo should be in the lower 44px (@1x). We suggest keeping this image with transparent background. If your design requires pattern or color under the logo, please use `brandImageBackgroundColor` or `brandImageBackgroundImage` respectively.

#### Product/brand info:

```objc
 NSString *deviceName;                  // Device/product name
 UIImage *productImage;                 // Custom product image to display in "Get ready" screen *new*
 NSString *brandName;                   // Your brand name
 UIImage *brandImage;                   // Your brand logo to fit in header of setup wizard screens
 UIColor *brandImageBackgroundColor;    // brand logo background color
 UIImage *brandImageBackgroundImage;    // brand logo background image (introduced in v0.9)
 NSString *instructionalVideoFilename;  // Instructional video shown landscape full screen mode when "Show me how" button pressed on second setup screen
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
 NSURL *troubleshootingLinkURL;     // URL for troubleshooting text of the app/device usage
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
 BOOL lightStatusAndNavBar;        // Make navigation and status bar appear in white or black color characters to contrast the selected brandImage color // *New since v0.6.1*
```
---

#### Further customization and localization:

In v1.0.0 two more customization options were introduced:
```objc
 BOOL useAppResources;                  // use storyboard and assets (images and strings) from app instead of from this SDK
 NSString *appResourcesStoryboardName;  // name of the storyboard file. default: 'setup'
```

By default all assets are loaded from library bundle. Setting `useAppResources` to true, will load ALL assets from the main bundle. This includes strings file, image assets and storyboard. You can also provide a custom name for storyboard by using `appResourcesStoryboardName` property. 

#### Product creators

If you're developing an app for your product / you're a product creator you should set `productMode` to `YES` (or `true` for Swift) - this will enable product mode which uses different API endpoints to allow adding/setting up devices assigned to your product.

If you set `productMode ` to `YES` / `true` be sure to also provide the `productId` (and `productName`) - please [read here](/guide/tools-and-features/console/#your-product-id) about how to find your productId number.

Make sure you inject the `ParticleCloud` class with [scoped OAuth credentials for creating customers](/tutorials/device-cloud/authentication), so app users could create an account. [Read here](/reference/ios/#oauth-client-configuration) on how to do it correctly.

```objc
 BOOL productMode;              // enable product mode
 NSString *productName;         // product display name
 NSUInteger productId;			  // Product Id number from Particle console
```

---

#### iOS 13 Permission Notice

Starting iOS 13, to access Wi-Fi SSID app has to be granted location permission. Photon setup relies on this information to advance past "Discover Device" screen, therefore on iOS devices running iOS 13+, additional screen requesting to grant location permission will be shown. 

---

#### Skipping authentication:

```objc
 BOOL allowSkipAuthentication;          // Allow user to skip authentication (skip button will appear on signup and login screens)
 NSString *skipAuthenticationMessage;   // Message to display to user when she's requesting to skip authentication (Yes/No question)
```
---

### Advanced

You can get an active instance of the set up device - `ParticleDevice` by making your viewcontroller conform to protocol `<ParticleSetupMainControllerDelegate>` when setup wizard completes successfully:

**Objective-C**

```objc
-(void)particleSetupViewController:(ParticleSetupMainController *)controller didFinishWithResult:(ParticleSetupMainControllerResult)result device:(ParticleDevice *)device;
```
---

**Swift**

```swift
func particleSetupViewController(controller: ParticleSetupMainController!, didFinishWithResult result: ParticleSetupMainControllerResult, device: ParticleDevice!)
```
---

method will be called, if `(result == ParticleSetupMainControllerResultSuccess)` or (or simply `(result == .Success)` in Swift) the device parameter will contain an active `ParticleDevice` instance you can interact with using the [iOS Cloud SDK](https://cocoapods.org/pods/Particle-SDK).
In case setup failed, aborted or was cancalled  you can determine the exact reason by consulting the documentation of the enum value `ParticleSetupMainControllerResult`. See [here](https://github.com/particle-iot/particle-photon-setup-ios/blob/master/ParticleSetup/User/ParticleSetupMainController.h#L18-31) for additional details.

If setup failed and you can still determine the device ID of the last device that was tried to be setup and failed by conforming to the @optional delegate function: (new since 0.5.0)

**Objective-C**

```objc
- (void)particleSetupViewController:(ParticleSetupMainController *)controller didNotSucceeedWithDeviceID:(NSString *)deviceID;
```
---

**Swift**

```swift
func particleSetupViewController(controller: ParticleSetupMainController!, didNotSucceeedWithDeviceID deviceID: String)
```
---

### Example

Example app (in Swift) can be found [here](https://github.com/particle-iot/example-app-ios). Example app demonstates - invoking the setup wizard, customizing its UI and using the returned ParticleDevice instance once setup wizard completes (delegate). Feel free to contribute to the example by submitting pull requests.

### Reference

Consult the javadoc style comments in `ParticleSetupCustomization.h` and `ParticleSetupMainController.h` for each public method or property. If the Photon Setup Library installation completed successfully in your XCode project - you should be able to press `Esc` to get an auto-complete hints from XCode for each public method or property in the library.

### Installation

#### Cocoapods

Particle Photon Setup Library is available through [CocoaPods](http://cocoapods.org). Cocoapods is an easy to use dependency manager for iOS.
You must have Cocoapods installed, if you don't then be sure to [Install Cocoapods](https://guides.cocoapods.org/using/getting-started.html) before you start:
To install the iOS Photon Setup Library, create a text file named `Podfile` on main project folder, it should contain:

```ruby
source 'https://github.com/CocoaPods/Specs.git'

target 'YourAppName' do
    pod 'ParticleSetup'
end
```
---

Replace `YourAppName` with your app target name - usually shown as the root item name in the XCode project,
then run `pod update` in your shell. A new `.xcworkspace` file will be created for you to open by Cocoapods, open that workspace file in Xcode and you can start invoking a new instance of the setup process viewcontroller - refer to the examples above. Don't forget to add `#import "ParticleSetup.h"` to the source file in which you want to invoke setup in (that is not required for swift projects).

##### Support for Swift projects

To use Particle Photon Setup Library from within Swift based projects - you'll need to configure a bridging header - please [read here](http://swiftalicio.us/2014/11/using-cocoapods-from-swift/),
as an additional resource you can consult official [Apple documentation](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/BuildingCocoaApps/InteractingWithObjective-CAPIs.html) on the matter.

#### Carthage

Starting version 0.4.0 Particle iOS Photon Setup Library is available through [Carthage](https://github.com/Carthage/Carthage). Carthage is intended to be the simplest way to add frameworks to your Cocoa application.
Be sure to [install Carthage](https://github.com/Carthage/Carthage#installing-carthage) before you start.
Then to build the Particle iOS Photon Setup Library, simply create a `Cartfile` on your project root folder (that's important), containing the following line:

```
github "particle-iot/particle-photon-setup-ios" ~> 1.0.0
```

and then run the following command:
`carthage update --platform iOS --use-submodules --no-use-binaries`.

*you can also re-use/copy the `bin/setup` shell script in your project, find it [here](https://github.com/particle-iot/particle-photon-setup-ios/blob/master/bin/setup)*

A new folder will be created in your project root folder - when Carthage checkout and builds are done, navigate to the `./Carthage/Build/iOS` folder and drag all the created `.framework`s files into your project in XCode. Go to your XCode target settings->General->Embedded binaries and press `+` and add all the `.framework` files there too - make sure the `ParticleDeviceSetupLibrary.framework`, `ParticleSDK.framework` and the `AFNetworking.framework` are listed there. Build your project - you now have the Particle SDK embedded in your project. Use `#import <ParticleDeviceSetupLibrary/ParticleDeviceSetupLibrary.h>` in Obj-C files or `import ParticleDeviceSetupLibrary` for Swift files to gain access to `ParticleSetupMainController` (see usage example).

No need for any special process or operation integrating the Photon Setup Library with Swift-based or Swift-dependant projects.

## License

Particle Cloud SDK and Particle Photon Setup Library are available under the Apache License 2.0.
