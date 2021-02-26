---
title: Android SDK
layout: reference.hbs
columns: three
order: 30
description: Manage your Particle IoT device from an Android phone
sdkversion: 1.0.1
devicesetupversion: 0.7.3
asyncclasslink: https://github.com/particle-iot/particle-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/utils/Async.java
---

# {{title}}

The Particle Android SDK consists of two parts:

1. [the Cloud SDK](#android-cloud-sdk): a wrapper for our REST API which enables your mobile app to interact with Particle-powered hardware through the Particle Device Cloud
2. [the Device Setup library](#android-device-setup-library): a library which provides an easy setup wizard for your app's users to set up their Photon/P1-powered devices

## Requirements

Both the Cloud SDK and Device Setup libraries have the following requirements:

- a `minSdkVersion` of 21 (Android 5.0) or higher
- `compileOptions` [set to Java 8](https://developer.android.com/studio/write/java8-support)
- The [AndroidX](https://developer.android.com/jetpack/androidx/) versions of the Jetpack support libraries


## Support and Contributions
- If you **need help**, visit the [Mobile category](https://community.particle.io/c/mobile) in our [community forums](https://community.particle.io) for discussion, troubleshooting, and feedback around the Android Cloud SDK and Device Setup library.
- If you have **found a bug**, _and can provide steps to reliably reproduce it_, open an issue in the appropriate repo [on GitHub](https://github.com/search?q=org%3Aparticle-iot+android&unscoped_q=android), and apply the `bug` label.
- If you **have a feature request**, open an issue [on GitHub](https://github.com/particle-iot/particle-android), and apply the `enhancement` label.
- If you **want to contribute**, submit a pull request! Also be sure to check out [the contribution guidelines](https://particle-iot.github.io/#contributions), and sign our [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).


## Android Cloud SDK

### Introduction

The Particle Android Cloud SDK enables Android apps to interact with Particle-powered connected products via the Particle Cloud. As an easy-to-use wrapper for the Particle REST API, the Cloud SDK can:

- Get a list of Particle devices claimed by a user account
- Read variables from devices
- Invoke functions on devices
- Publish events from your mobile app and subscribe to events coming from devices
- Get data usage information for cellular devices
- Claim/unclaim devices for a user account
- Manage & inject user sessions for the Particle Cloud (access tokens, encrypted session management)

The complete SDK sources are available to [browse on GitHub](https://github.com/particle-iot/particle-android/tree/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud).

For usage info, check out [the examples](#common-tasks) below, or play with the [`sdk_example_app`](https://github.com/particle-iot/particle-android/tree/master/sdk_example_app) module included in the git repository.


### Installation

Just add `implementation 'io.particle:cloudsdk:{{sdkversion}}'` to your app's `build.gradle` dependencies, and then follow [these instructions](#oauth-client-configuration) if you'll be distributing an app based on the SDK.

```gradle
dependencies {
    implementation 'io.particle:cloudsdk:{{sdkversion}}'
}
```

Then, from your Application class, add `ParticleCloudSDK.init()` in `onCreate()`:

```java
public class MyApp extends Application {

    ...

    @Override
    public void onCreate() {
        super.onCreate();
        ParticleCloudSDK.init(this);
    }

    ...

}
```

---

### Overview

Cloud SDK usage mostly revolves around two main classes:

1. [`ParticleCloud`](https://github.com/particle-iot/particle-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleCloud.kt), which is the interface for all cloud operations not specific to a claimed device, such as user authentication, retrieving a user's device list, claiming devices, and more
2. [`ParticleDevice`](https://github.com/particle-iot/particle-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleDevice.kt), which represents a claimed device.  Each instance enables operations specific to that device, e.g.: invoking functions, reading variables, and accessing basic info like the device's name and version info.

#### Blocking APIs FTW

**preemptive tl;dr:** _many of the SDK's methods make **blocking network calls**, meaning they can't be called from the app's main thread.  The **strongly** recommended way of handling this requirement is to write your app in [Kotlin](https://developer.android.com/kotlin/learn) and use [coroutines](https://developer.android.com/kotlin/coroutines) to make call these SDK methods off the main thread._  _If you are unable to use Kotlin, the first example in the [API usage section](#common-tasks) shows another way to handle this requirement._

All the SDK's methods have been very intentionally implemented as synchronous, blocking calls, _including calls which use the internet_, meaning they cannot be called directly on the main thread.  This is because there are many easy ways to make a blocking API non-blocking (Kotlin coroutines, RxJava, Executors, AsyncTasks, etc), but going the other way around is awkward and bug-prone.  The Cloud SDK's use of blocking calls makes it easy to pair it with the asynchronous programming approach of your choice.

As mentioned above, if Kotlin coroutines are not an option for you, the SDK includes an alternative in the form of the [`Async`]({{asyncclasslink}}) and `ApiWork` convenience classes.  These form a simple, purpose-built wrapper around Android's `AsyncTask`, with the boilerplate kept to a minimum.  There's [an example](#sdk-calls-from-the-ui-thread) of using this class further below.

Finally, to make it clear which calls can be made from the UI thread, and which must be called from a background thread, the SDK APIs have been carefully annotated with [`@WorkerThread` and `@MainThread`](http://goo.gl/pRgWWm) where applicable.  Besides offering a hint to developers, this annotation also causes Android Studio to warn you if you try to make a blocking network call in the SDK from the main thread.

### Common tasks

Here are some example usages for common API tasks:

### SDK calls from the UI thread

Most of the methods on the `ParticleCloud` and `ParticleDevice` classes make blocking network calls.  Since Android doesn't allow making network calls on the main/UI thread, you'll need to make these calls from a background/worker thread.  [As mentioned previously](#blocking-apis-ftw), Kotlin's coroutines are the best way to handle this, but the Cloud SDK provides the `Async` class if Kotlin is not an option.

Here's an example of reading a variable from a device using the `ParticleDevice` API with the `Async` class:

```java
// "someDevice" is a ParticleDevice instance
Async.executeAsync(someDevice, new Async.ApiWork<ParticleDevice, Integer>() {

    public Integer callApi(ParticleDevice particleDevice)
            throws ParticleCloudException, IOException {
        return particleDevice.getVariable("myVariable");
    }

    @Override
    public void onSuccess(Integer value) {
        Toaster.s(MyActivity.this, "Room temp is " + value + " degrees.");
    }

    @Override
    public void onFailure(ParticleCloudException e) {
        Log.e("some tag", "Something went wrong making an SDK call: ", e);
        Toaster.l(MyActivity.this, "Uh oh, something went wrong.");
    }
});
```

#### Cloud Login
Log in to the Particle Device Cloud:

```java
ParticleCloudSDK.getCloud().logIn("ido@particle.io", "myl33tp4ssw0rd");
Toaster.s(someActivity, "Logged in!");
```

##### Injecting Session Access Token (Two Legged Authentication)

If you use your own backend to authenticate users in your app, you can now easily inject the access token your backend gets from the Particle cloud using one of the new `setAccessToken()` methods on `ParticleCloud`. Additionally, the SDK will now automatically renew an expired session if a refresh token exists.

```java
ParticleCloudSDK.getCloud().setAccessToken("9bb912533940e7c808b191c28cd6aaaf8d12986c");
```

---


#### List Devices
List the devices that belong to the currently logged-in user, and find a specific device by name:

```java
List<ParticleDevice> devices = ParticleCloudSDK.getCloud().getDevices();
for (ParticleDevice device : devices) {
    if (device.getName().equals("myDevice")) {
        doSomethingWithMyDevice(device);
        break;
    }
}
```
---

#### Get Device Instance
Get a device instance by its ID:

```java
ParticleDevice myDevice = ParticleCloudSDK.getCloud().getDevice("53fa73265066544b16208184");
```
---

#### Read Device Information
Accessing information about a device.

```java
// 'myDevice' here is a ParticleDevice instance
String nameString = myDevice.getName();
int productIdInt = myDevice.getProductID();
int platformIdInt = myDevice.getPlatformID();
String ipAddressString = myDevice.getIpAddress();
String lastNameString = myDevice.getLastAppName();
String statusString = myDevice.getStatus();
Date lastHeardDate = myDevice.getLastHeard();
boolean cellularBoolean = myDevice.isCellular();
String imeiString = myDevice.getImei();
String currentBuildString = myDevice.getCurrentBuild();
String defaultBuildString = myDevice.getDefaultBuild();
```
---

#### Read Variables
Accessing variables of [all the standard Particle Device Cloud types](/reference/device-os/firmware/#particle-variable-) (integers, strings, doubles, and booleans):

```java
// 'myDevice' here is a ParticleDevice instance
int anInteger = myDevice.getIntVariable("someIntValue");
String aString = myDevice.getStringVariable("someOtherStringValue");
double aDouble = myDevice.getDoubleVariable("someDoubleValue");
boolean aBoolean = myDevice.getBooleanVariable("someBooleanValue");
```
---

#### Call a Function
Invoke a function on the device with a list of parameters.  The return value from `callFunction()` is result code returned from the function on the device.

```java
// Call function "digitalwrite" with params ("D7", "1"), which will tell digitalWrite to set the value of D7 to "1"
int resultCode = someDevice.callFunction("digitalwrite", list("D7", "1"));
Toaster.s(someActivity, "Result of calling digitalwrite: " + resultCode);
```
---

#### List Variables and Functions
`ParticleDevice.getFunctions()` returns a list of function names.  `ParticleDevice.getVariables()` returns a map of variable names to types.

```java
for (String funcName : someDevice.getFunctions()) {
    Log.i("some tag", "Device has function: " + funcName);
}

Map<String, VariableType> variables = someDevice.getVariables();
for (String name : variables.keySet()) {
    Log.i("some tag", String.format("variable '%s' type is '%s'", name, variables.get(name)));
}
```
---

#### Rename a device
Set a new name for a claimed device:

```java
particleDevice.setName("rocket_bubble");
```
---


#### Log out
Log out the user, clearing their session and access token:

```java
ParticleCloudSDK.getCloud().logOut()
```
---

### Events sub-system
Using the SDK, you open a stream for receiving [Server-Sent Events (SSEs)](http://www.w3.org/TR/eventsource/) from devices.  Calling one of the `subscribe...()` methods opens a connection to the Particle Device Cloud.  Unlike regular HTTP calls which end as soon as the request is handled, this connection will stay open until explicitly closed.  Then, when your Particle device publishes an event, your event handler will receive the event

Events can be filtered by name using the optional `eventNamePrefix` param.  When this prefix is specified, your event handler will only receive events with names that begin with the specified prefix. For example, specifying an event name filter of 'temp' will return events with names 'temp', 'tempo', and 'temperature'.

#### Subscribe to events

Subscribe to all events published by all the devices the user owns:

```java
long subscriptionId;  // save this for later, for unsubscribing
subscriptionId = ParticleCloudSDK.getCloud().subscribeToMyDevicesEvents(
    null,  // the first argument, "eventNamePrefix", is optional
    new ParticleEventHandler() {
        public void onEvent(String eventName, ParticleEvent event) {
            Log.i("some tag", "Received event with payload: " + event.dataPayload);
        }

        public void onEventError(Exception e) {
            Log.e("some tag", "Event error: ", e);
        }
});
```
---

Subscribe to events from one specific device. This requires that the device be claimed to the same account that the subscription request is made from.

```java
long subscriptionId;  // save this for later, for unsubscribing
ParticleCloud cloud = ParticleCloudSDK.getCloud();
subscriptionId = cloud.subscribeToDeviceEvents(null, "53ff6c065075535119511687", someHandler);
```
---

Another option for subscribing to events from a particular device is calling same method via the `ParticleDevice` instance.  Using this method guarantees that private events will be received, since the API only provides access to the user's claimed devices.

```java
long subscriptionId;  // save this for later, for unsubscribing
subscriptionId = someDevice.subscribeToEvents(null, someHandler);
```
---

#### Unsubscribing from events

When subscribing to events, keep a reference to the subscription ID returned, and pass this as the parameter to the unsubscribe method:

```java
// "subscriptionId" was provided earlier from the subscribe call
ParticleCloudSDK.getCloud().unsubscribeFromEventWithID(subscriptionId);
```
---

or via the `ParticleDevice` instance, if applicable:

```java
// "subscriptionId" was provided earlier from the subscribe call
someDevice.unsubscribeFromEvents(subscriptionId);
```
---

#### Publishing an event

You can also publish an event from your app to the Particle Device Cloud:

```java
ParticleCloudSDK.getCloud().publishEventWithName(
    "event_from_app",                 // the event name
    "some_event_payload",             // the event payload data
    ParticleEventVisibility.PRIVATE   // event visibility, either PRIVATE (the default), or PUBLIC
    // the TTL (time to live), in seconds for this event.  After this time, the event is 
    // considered stale/outdated
    60
);
```
---


### API Reference
For a complete interface reference, check out the JavaDoc and source code in [the `cloudsdk` module in the Git repo](https://github.com/particle-iot/particle-android/blob/master/cloudsdk/).

If you're working in Android Studio, you can get the JavaDoc for each method or class by putting the cursor over it and hitting `F1`.  (This shortcut is for macOS; shortcuts on other platforms may vary.)


### OAuth client configuration

If you're distributing your own app, you are **required** to provide the cloud SDK with an OAuth client ID and secret. These are used to identify users coming from your specific app to the Particle Device Cloud.  You'll need to create a new pair of these credentials for each app that you plan to release.  i.e. If you plan to release two different apps, then you'll need two sets of credentials, one for each app.

These credentials will persist forever and do not need to be refreshed.

#### Supplying credentials to the SDK
The first way is to provide them as string resources, using the names `oauth_client_id` and `oauth_client_secret`, respectively, as shown here and in the example app:
```xml
<string name="oauth_client_id">(client ID string goes here)</string>
<string name="oauth_client_secret">(client secret 40-char hex string goes here)</string>
```

If you would prefer not to ship these OAuth strings as Android string resources, an alternative approach is provided via a separate SDK init method, `ParticleCloudSDK.initWithOauthCredentialsProvider()`.  For this option, you'll need to create a custom `OauthBasicAuthCredentialsProvider` implementation, and pass it to the init method, as seen here:
```java
ParticleCloudSDK.initWithOauthCredentialsProvider(someContext,
    new OauthBasicAuthCredentialsProvider() {

        public String getClientId() {
            return (the client ID, accessed however you like)
        }

        public String getClientSecret() {
            return (the client secret, accessed however you like)
        }
});
```


### Logging

HTTP logging can be configured by setting the `http_log_level` string resource.  Valid values follow the `LogLevel` enum from Retrofit (1.x): `NONE`, `BASIC`, `HEADERS`, `HEADERS_AND_ARGS`, or `FULL`.  The default for release builds is `NONE`.

For example, to set logging to `BASIC`, you would add the following to your `strings.xml`:
```xml
<string name="http_log_level">BASIC</string>
```
---



## Android Device Setup Library

### Introduction
The Particle Device Setup library provides everything you need to offer your users a simple initial setup process for Photon/P1-powered devices.  This includes all the necessary device communication code, an easily customizable UI, and a simple developer API.

The setup UI can be customized by a modifying Android XML resource files. Available customizations include: look & feel, colors, fonts, custom brand logos and more.  Customization isn't required for a nice looking setup process, though: good defaults are used throughout, with styling rooted in Google's Material Design.

With the Device Setup library, you only need to make a single call from your app, and the Particle setup process UI launches to guide the user through the device setup process.  When that process finishes, the user is returned to the Activity where they were left off, and a broadcast intent is sent out with the ID of the device she just set up and claimed.

Configuration for the Photon uses what we call a “soft AP” mode: during setup, the Photon advertises itself as a Wi-Fi access point ("AP").  The mobile app configures the Android device to connect to this soft AP network, and using this connection, it can provide the Particle device with the credentials it needs for the Wi-Fi network you want the to Photon to use.

<!---
[![CI Status](http://img.shields.io/travis/spark/SparkSetup.svg?style=flat)](https://travis-ci.org/spark/SparkSetup)
[![Version](https://img.shields.io/cocoapods/v/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![License](https://img.shields.io/cocoapods/l/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![Platform](https://img.shields.io/cocoapods/p/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
-->


## Installation

Just add `implementation 'io.particle:devicesetup:{{devicesetupversion}}'` to your app's `build.gradle` dependencies, and then follow [these instructions](#oauth-client-configuration) if you'll be distributing an app based on the SDK.

```gradle
dependencies {
    implementation 'io.particle:devicesetup:{{devicesetupversion}}'`
}
```


### Basic Usage

The Device Setup library has two main requirements:

- You must call `ParticleDeviceSetupLibrary.init(...)` in your Application.onCreate() or in the
onCreate() of your first Activity, e.g.:

```java
ParticleDeviceSetupLibrary.init(this.getApplicationContext(), MyMainActivity.class);
```
---
The class passed in as the second argument to `init()` is used to return you to a specified activity of your app once setup has completed.

#### Configure device Wi-Fi credentials without claiming it

If your app requires the ability to let users configure device Wi-Fi credentials without changing its ownership you can also do that via initWithSetupOnly. Invoking setup will go thru the setup steps required for configuring device Wi-Fi credentials but not for claiming it.
```java
ParticleDeviceSetupLibrary.initWithSetupOnly(this.getApplicationContext());
```
---

Then, to invoke the Device Setup wizard in your app, just call:

```java
ParticleDeviceSetupLibrary.startDeviceSetup(someContext);
```
---

### Advanced

You can get the device ID of the successfully set-up device after setup
completes by listening for the intent broadcast defined by
`ParticleDeviceSetupLibrary.DeviceSetupCompleteContract`.

A convenience wrapper for this broadcast has been created as well,
`ParticleDeviceSetupLibrary.DeviceSetupCompleteReceiver`.  Just override
the required methods, then call the `.register()` before starting the
device setup wizard, and call `.unregister()` once it's done.

```java
DeviceSetupCompleteReceiver receiver = new DeviceSetupCompleteReceiver() {

    @Override
    public void onSetupSuccess(String configuredDeviceId) {
        Toaster.s(someContext, "Hooray, you set up device " + configuredDeviceId);
    }

    @Override
    public void onSetupFailure() {
        Toaster.s(someContext, "Sorry, device setup failed.  (sad trombone)");
    }
};
receiver.register(someContext);
ParticleDeviceSetupLibrary.startDeviceSetup(someContext);
```
---

And then when setup is complete...
```java
receiver.unregister(someContext);
```
---

(Short version: listen for the `ACTION_DEVICE_SETUP_COMPLETE` intent broadcast; the device ID will be available as a `String` with key `EXTRA_CONFIGURED_DEVICE_ID`)


### Customization

The look and feel of the setup UI can be customized by overriding values from the `customization.xml` file
under `devicesetup -> src -> main -> res -> values`.

#### Product/brand info:

```xml
<string name="brand_name">Particle</string>
<string name="app_name">@string/brand_name</string>
<string name="device_name">Photon</string>
<drawable name="device_image">@drawable/photon_vector</drawable>
<drawable name="device_image_small">@drawable/photon_vector_small</drawable>
<drawable name="brand_image_horizontal">@drawable/particle_horizontal_blue</drawable>
<drawable name="brand_image_vertical">@drawable/particle_vertical_blue</drawable>
<drawable name="screen_background">@drawable/trianglifybackground</drawable>
<color name="brand_image_background_color">#641A1A1A</color>
```
---

#### Technical data:

```xml
<string name="mode_button_name">Mode button</string>
<string name="listen_mode_led_color_name">blue</string>
<string name="network_name_prefix">@string/device_name</string>
```
---

#### Legal/technical info:

```xml
<string name="terms_of_service_uri">https://www.particle.io/tos</string>
<string name="privacy_policy_uri">https://www.particle.io/privacy</string>
<string name="forgot_password_uri">https://www.particle.io/forgot-password</string>
<string name="troubleshooting_uri">https://community.particle.io/t/spark-core-troubleshooting-guide-spark-team/696</string>
<bool name="show_sign_up_page_fine_print">true</bool>
```
---

#### Look & feel:

```xml
<color name="page_background_color">#F2F2F2</color>
<color name="form_field_background_color">@android:color/white</color>
<color name="normal_text_color">@android:color/white</color>
<color name="link_text_color">@android:color/white</color>
<color name="link_text_bg">#19AAAAAA</color>
<color name="error_text_color">#FE4747</color>
<color name="element_background_color">#00BAEC</color>
<color name="element_background_color_dark">#0083A6</color>
<color name="element_text_color">@android:color/white</color>
<color name="element_text_disabled_color">#E0E0E0</color>
```
---

### Product creators

If you're developing an app for your product / you're a product creator you should create a boolean resource as follows: `<bool name="productMode">true</bool>`.  This will enable product mode which uses different API endpoints to allow adding/setting up devices assigned to your product.

If you set `productMode ` to `true` be sure to also provide the `product_id` and `product_name` - please [read here](/tutorials/device-cloud/console/#your-product-id) for how to find your productId number.

Lastly, make sure you inject the `ParticleCloud` class with [scoped OAuth credentials for creating customers](/tutorials/device-cloud/authentication/), so app users could create an account. [Read here](/reference/SDKs/android/#oauth-client-configuration) on how to do this.


```xml
<!-- enable product mode -->
<bool name="organization">true</bool>
<!-- product display name -->
<string name="product_name">Your Product Name Here!</string>
<!-- Product ID from Particle console -->
<integer name="product_id">12345</integer>
```
---


## License

As with most Android libraries and AOSP itself, the Particle Android Cloud SDK and Device Setup library are available under the Apache License 2.0.  See [the LICENSE file](https://github.com/particle-iot/spark-sdk-android/blob/master/LICENSE) for the complete text of the license.
