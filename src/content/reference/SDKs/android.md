---
title: Android SDK
layout: reference.hbs
columns: three
order: 30
sdkversion: 0.5.1
devicesetupversion: 0.6.3
asyncclasslink: https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/utils/Async.java
---

# {{title}}

The Particle Android SDK consists of two parts:
1. [the Cloud SDK](#android-cloud-sdk): a REST API wrapper which enables your mobile app to interact with Particle-powered hardware through the Particle Device Cloud
2. [the Device Setup library](#android-device-setup-library): a library which provides an easy setup wizard for your app users to set up their Particle-powered devices

## Requirements

Both the Cloud SDK and Device Setup libraries have the following requirements:
- a `minSdkVersion` of 15 (Android 4.0.3) or higher
- Gradle 2.x (Other build systems, e.g.: Maven, may also work, but are not officially supported.)
- `compileOptions` set to Java 8


## Support and Contributions
- If you **need help**, visit the [Mobile category](http://community.particle.io/c/mobile) in our [community forums](http://community.particle.io) for discussion, troubleshooting, and feedback around the Android Cloud SDK and Device Setup library.
- If you have **found a bug**, _and can provide steps to reliably reproduce it_, open an issue in the appropriate repo [on GitHub](https://github.com/search?q=org%3Aparticle-iot+android&unscoped_q=android), and apply the `bug` label.
- If you **have a feature request**, open an issue in the appropriate repo [on GitHub](https://github.com/search?q=org%3Aparticle-iot+android&unscoped_q=android) in the appropriate repo, and apply the `enhancement` label.
- If you **want to contribute**, submit a pull request! Also be sure to check out [the contribution guidelines](http://particle-iot.github.io/#contributions), and sign our [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).


## Android Cloud SDK

### Introduction

The Particle Android Cloud SDK is an easy-to-use wrapper for the Particle REST API, providing a clear, type-safe way for your Android app to interact with Particle-powered connected products, all via the Particle Device Cloud.

SDK features include:

- Getting a list of a user's Particle devices
- Reading variables and invoking functions on devices
- Publishing events from mobile devices, and subscribing to events published by devices & apps
- Claiming & unclaiming devices for a user
- Managing access tokens for the Particle Device Cloud

The complete SDK sources are available to [browse on GitHub](https://github.com/particle-iot/spark-sdk-android/tree/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud), and can be [downloaded as a zip file](https://github.com/particle-iot/spark-sdk-android/archive/master.zip).

For usage info, check out [the examples](#common-tasks) below, or play with the `example_app` module included in the git repository.

#### Beta notice

While this SDK is ready for production use, as seen in [the Particle Android app](https://github.com/particle-iot/photon-tinker-android), it is still under development and is currently in beta.  The API is mostly stable, but may be subject to further changes prior to leaving beta.  Once the SDK leaves beta, the API should never change outside of ["major" version](http://semver.org/) updates.

### Installation

#### Short version
Just add `compile 'io.particle:cloudsdk:{{sdkversion}}'` to your app's `build.gradle`, and then follow [these instructions](#oauth-client-configuration) if you'll be distributing an app based on the SDK.

#### Additional Details
The Android Cloud SDK is available through [JCenter](https://bintray.com/particle/android/cloud-sdk/).  To add it to your project, just add `compile 'io.particle:cloudsdk:{{sdkversion}}'` to the `dependencies` element in your app module's `build.gradle` file, so it looks something like this:

```gradle
dependencies {
    // (...other dependencies...)
    compile 'io.particle:cloudsdk:{{sdkversion}}'
}
```

If you're unfamiliar with adding dependencies to your project, or are unfamiliar with Gradle in general, [this guide](http://developer.android.com/tools/building/configuring-gradle.html#buildFileBasics) provides a solid overview of the basics.

---

### Overview

Cloud SDK usage mostly revolves around two main classes:

1. [`ParticleCloud`](https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleCloud.java), which is the interface for all cloud operations not specific to a claimed device, such as user authentication, retrieving a user's device list, claiming devices, and more
2. [`ParticleDevice`](https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleDevice.java), which represents a claimed device.  Each instance enables operations specific to that device, e.g.: invoking functions, reading variables, and accessing basic info like the device's name and version info.

#### Blocking APIs FTW

**preemptive tl;dr:** _many of the SDK methods make blocking network calls, meaning they can't be called from the main thread.  See the first example in the [API usage section](#common-tasks) for one way to handle this requirement._

All the SDK's methods have been very intentionally implemented as synchronous, blocking calls, _including calls which hit the network_.  Using blocking APIs avoids the tangled, nested logic of callbacks and other complexity, making it easy to make a synchronous call, get its return value, and use it as input to further calls, all in the same simple block of code.

As with all network programming, making async calls and returning their results to the UI thread can be clumsy and verbose, especially when using plain `AsyncTask`s. To spare you some of this awkwardness, the SDK includes the [`Async`]({{asyncclasslink}}) and `ApiWork` convenience classes.  These form a simple, purpose-built wrapper around `AsyncTask`, with the boilerplate kept to a minimum.  There's [an example](#sdk-calls-from-the-ui-thread) of using this class further below.

**Note:** the `Async` class itself is an *entirely optional* convenience. The SDK is perfectly useable from an `IntentService`, `Executor`, plain vanilla `AsyncTask`, or whatever other async mechanism you like.

Finally, to make it clear which calls can be made from the UI thread, and which must be called from a background thread, the SDK APIs have been carefully annotated with [`@WorkerThread`](http://goo.gl/pRgWWm) where applicable.  Besides offering a hint to developers, this annotation also causes Android Studio to warn you if you try to make a blocking network call in the SDK from your UI thread.

### Common tasks

Here are some example usages for common API tasks:

### SDK calls from the UI thread

Most of the methods on the `ParticleCloud` and `ParticleDevice` classes make blocking calls to the network.  Since Android (rightly) doesn't allow making network calls on the UI thread, you'll need to make these calls from a background/worker thread.  [As mentioned previously](#blocking-apis-ftw), you can use whatever method you like for this, but the Cloud SDK provides the `Async` class to make this as easy as possible.

Here's an example of reading a variable from a device using the `ParticleDevice` API with the `Async` class:

```java
// "aDevice" is a ParticleDevice instance we've previously retrieved
Async.executeAsync(aDevice, new Async.ApiWork<ParticleDevice, Integer>() {

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

### Cloud Login
Log in to the Particle Device Cloud:

```java
ParticleCloudSDK.getCloud().logIn("ido@particle.io", "myl33tp4ssw0rd");
Toaster.s(someActivity, "Logged in!");
```
#### Injecting Session Access Token (Two Legged Authentication)

If you use your own backend to authenticate users in your app - you can now inject the Particle access token your back end gets from Particle cloud easily using one of the new setAccessToken methods exposed from ParticleCloud class. Additionally the SDK will now automatically renew an expired session if a refresh token exists.

```java
ParticleCloudSDK.getCloud().setAccessToken("9bb912533940e7c808b191c28cd6aaaf8d12986c");
```

---


### List Devices
List the devices that belong to currently logged-in user, and find a specific device by name:

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

### Get Device Instance
Get a device instance by its ID:

```java
ParticleDevice myDevice = ParticleCloudSDK.getCloud().getDevice("53fa73265066544b16208184");
```
---

### Read Device Information
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

### Read Variables
Accessing variables of [all the standard Particle Device Cloud types](/reference/device-os/firmware/#particle-variable-) (integers, strings, and doubles):

```java
// 'myDevice' here is a ParticleDevice instance
int anInteger = myDevice.getIntVariable("someIntValue");
String aString = myDevice.getStringVariable("someOtherStringValue");
double aDouble = myDevice.getDoubleVariable("someDoubleValue");
```
---

### Call a Function
Invoke a function on the device with a list of parameters.  The return value from `callFunction()` is result code returned from the function on the device.

```java
int resultCode = someDevice.callFunction("digitalwrite", list("D7", "1"));
Toaster.s(someActivity, "Result of calling digitalwrite: " + resultCode);
```
---

### List Variables and Functions
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

### Rename a device
Set a new name for a claimed device:

```java
particleDevice.setName("rocket_bubble");
```
---


### Log out
Log out the user, clearing their session and access token:

```java
ParticleCloudSDK.getCloud().logOut()
```
---

### Events sub-system
<!-- FIXME: improve this description -->
Using the SDK, you can make an API call that will open a stream of [Server-Sent Events (SSEs)](http://www.w3.org/TR/eventsource/). You will make one API call that opens a connection to the Particle Device Cloud. That connection will stay open, unlike normal HTTP calls which end quickly. Very little data will come to you across the connection unless your Particle device publishes an event, at which point you will be immediately notified. In each case, the event name filter is `eventNamePrefix` and is optional. When specifying an event name filter, published events will be limited to those events with names that begin with the specified string. For example, specifying an event name filter of 'temp' will return events with names 'temp' and 'temperature'.

### Subscribe to events

Subscribe to the firehose of public events, plus the private events published by devices one owns:

```java
long subscriptionId;  // save this for later, for unsubscribing
subscriptionId = ParticleCloudSDK.getCloud().subscribeToAllEvents(
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

*Note 1:* Passing in `null` or `""` for the `eventNamePrefix` parameter will subscribe the handler to **all** events. (We weren't joking when we called it a firehose before: this will produce a **lot** of data!)

*Note 2:* You can have multiple handlers per event name and/or same handler per multiple events names.

Subscribe to all events, public and private, published by devices the user owns:

```java
long subscriptionId;  // save this for later, for unsubscribing
subscriptionId = ParticleCloudSDK.getCloud().subscribeToMyDevicesEvents(null, someHandler);
```
---

Subscribe to events from one specific device.  If the API user owns the device, she'll receive all events, public and private, published by that device.  Otherwise, only the public events will be received.

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

### Unsubscribing from events

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

### Publishing an event

You can also publish an event from your app to the Particle Device Cloud:

```java
ParticleCloudSDK.getCloud().publishEventWithName("event_from_app", "some_event_payload",
        ParticleEventVisibility.PRIVATE, 60);
```
---


### API Reference
For a complete interface reference, simply check out the JavaDoc and source code in [the Git repo](https://github.com/particle-iot/spark-sdk-android/).

Also, if you're working from Android Studio, you can get the JavaDoc for each method or class by putting the cursor over it and hitting `F1`.  (This is on macOS; shortcuts on other platforms may vary.)


### OAuth client configuration

If you're distributing your own app, you're required to provide the cloud SDK with an OAuth client ID and secret. These are used to identify users coming from your specific app to the Particle Device Cloud.  You need only create one pair of these credentials for each app that you plan to release.  i.e. If you plan to release two different apps, then you'll need one set of credentials for each app.  They will persist forever and do not need to be refreshed.  

Once you've created your OAuth credentials, you can supply them to the SDK in one of two ways.

The first way is to provide them as string resources, using the names `oauth_client_id` and `oauth_client_secret`, respectively, as in the example, and they'll be picked up by the SDK automatically:
```xml
<string name="oauth_client_id">(client ID string goes here)</string>
<string name="oauth_client_secret">(client secret 40-char hex string goes here)</string>
```

The second way, if you would prefer not to ship these OAuth strings as Android string resources, is to use an alternate SDK init method, `ParticleCloudSDK.initWithOauthCredentialsProvider()`.  For this option, you'll need to create a custom `OauthBasicAuthCredentialsProvider` implementation, and pass it to the init method, as seen here:
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

HTTP logging can be configured by setting the `http_log_level` string resource.  Valid values follow Retrofit's (1.x) `LogLevel` enum : `NONE`, `BASIC`, `HEADERS`, `HEADERS_AND_ARGS`, or `FULL`.  The default for release builds is `NONE`.

For example, to set logging to `BASIC`, you would add the following to your `strings.xml`:
```xml
<string name="http_log_level">BASIC</string>
```
---


### Extras

The SDK also ships with a handful of utility classes, mostly focused on eliminating boilerplate while maintaining a clear API:

- [`Async`]({{asyncclasslink}}): [as mentioned previously](#blocking-apis-ftw), this is an optional convenience wrapper around AsyncTask for calling Cloud SDK methods.  Usage information for this class can be found in [the API examples](#common-tasks).
- [`Toaster`](https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/utils/Toaster.java): another boilerplate eliminator.  `Toast.makeToast(blah blah blah).show()` is absurd when all you really wanted was an ultra-lightweight way to say _"hey Android, put this string on the screen for a sec, pls."_.  `Toaster` makes this dream come true.
- [`EZ`](https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/utils/EZ.java): miscellaneous shortcuts which have no simple taxonomic classification.
- [`Py`](https://github.com/particle-iot/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/utils/Py.java): There's nothing Particle or Android-specific about this class, but it's worth calling out.  This class brings a little Pythonic joy to your Java, like easy collection constructors (e.g.: `list()` and `set()`), a _truthiness_ check named `truthy()`, and other simple, sane goodies.  See the javadoc on source for this class for additional information.
---


## Android Device Setup Library

### Introduction
<!-- FIXME: tighten this up, copy it back into the setup lib README -->
The Particle Device Setup library provides everything you need to offer your users a simple initial setup process for Particle-powered devices.  This includes all the necessary device communication code, an easily customizable UI, and a simple developer API.

The setup UI can be easily customized by a modifying Android XML resource files. Available customizations include: look & feel, colors, fonts, custom brand logos and more.  Customization isn't required for a nice looking setup process, though: good defaults are used throughout, with styling generally following Google's Material Design guidelines.

With the Device Setup library, you only need to make one simple call from your app, and the Particle setup process UI launches to guide the user through the device setup process.  When that process finishes, the user is returned to the Activity where they were left off, and a broadcast intent is sent out with the ID of the device she just set up and claimed.

The wireless setup process for the Photon uses very different underlying technology from the Core.  The Core used _SmartConfig_, while the Photon uses what we call a “soft AP” mode: during setup, the Photon advertises itself as a Wi-Fi network.  The mobile app configures the Android device to connect to this soft AP network, and using this connection, it can provide the Particle device with the credentials it needs for the Wi-Fi network you want the to Photon to use.

<!---
[![CI Status](http://img.shields.io/travis/spark/SparkSetup.svg?style=flat)](https://travis-ci.org/spark/SparkSetup)
[![Version](https://img.shields.io/cocoapods/v/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![License](https://img.shields.io/cocoapods/l/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![Platform](https://img.shields.io/cocoapods/p/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
-->


#### Beta notice

While this library is ready for production use, as seen in [the Particle Android app](https://github.com/particle-iot/photon-tinker-android), it is still under development and is currently in beta.  The API is mostly stable, but may be subject to further changes prior to leaving beta.  Once it leaves beta, the API should never change outside of ["major" version](http://semver.org/) updates.


## Installation

#### Short version
Just add `compile 'io.particle:devicesetup:{{devicesetupversion}}'` to your app's `build.gradle`, and then follow [these instructions](#oauth-client-configuration) if you'll be distributing an app based on the SDK.

#### Additional Details
The Android Cloud SDK is available through [JCenter](https://bintray.com/particle/android/devicesetup/).  To add it to your project, just add `compile 'io.particle:devicesetup:{{devicesetupversion}}'` to the `dependencies` element in your app module's `build.gradle` file, so it looks something like this:

```gradle
dependencies {
    // (...other dependencies...)
    compile 'io.particle:devicesetup:{{devicesetupversion}}'
}
```

If you're unfamiliar with adding dependencies to your project, or are unfamiliar with Gradle in general, [this guide](http://developer.android.com/tools/building/configuring-gradle.html#buildFileBasics) provides a solid overview of the basics.


### Basic Usage

The Device Setup library has two main requirements:

- You must call `ParticleDeviceSetupLibrary.init(...)` in your Application.onCreate() or in the
onCreate() of your first Activity, e.g.:

```java
ParticleDeviceSetupLibrary.init(this.getApplicationContext(), MyMainActivity.class);
```
---
The class passed in as the second argument to `init()` is used to return you to the
"main activity" of your app once setup has completed (or whatever other activity you
wish to start once setup is complete).

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
ParticleDeviceSetupLibrary.DeviceSetupCompleteContract.

A convenience wrapper for this broadcast has been created as well,
`ParticleDeviceSetupLibrary.DeviceSetupCompleteReceiver`.  Just override
the required methods, then call the `.register()` before starting the
device setup wizard, and call `.unregister()` once it's done.

```java
DeviceSetupCompleteReceiver receiver = new DeviceSetupCompleteReceiver() {

    @Override
    public void onSetupSuccess(long configuredDeviceId) {
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

(Short version: listen for the `ACTION_DEVICE_SETUP_COMPLETE` intent broadcast; the device ID will be available as a `long` with key `EXTRA_CONFIGURED_DEVICE_ID`)


### Customization

Customize setup look and feel by overriding values from the `customization.xml` file
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
<string name="terms_of_service_html_file">NOT_DEFINED</string>
<string name="privacy_policy_html_file">NOT_DEFINED</string>
<string name="forgot_password_html_file">NOT_DEFINED</string>
<string name="troubleshooting_html_file">NOT_DEFINED</string>
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

### Organization mode:
Setting the boolean resource `organization` to `true`[1] in one of your resource files) will enable organization mode, which uses different API endpoints and requires special permissions (See Particle Console).
If you enable organization mode, be sure to also provide string resources for `organization_slug` and `product_slug`, using the values you created on the [Particle Console](/guide/tools-and-features/console/).
To provide the `ParticleCloud` class with correct OAuth credentials for creating customers (so app users could create an account), [read the instructions here](/reference/android/#oauth-client-configuration).
To learn how to create these credentials for your organization [read here](/tutorials/device-cloud/authentication).

[1] i.e.: adding `<bool name="organization">false</bool>`


```xml
<!-- enable organization mode -->
<bool name="organization">true</bool>
<!-- organization display name -->
<string name="organization_name">Acme Wireless-Enabled Widget Company</string>
<!-- organizational name for API endpoint URL - must specify for orgMode *new* -->
<string name="organization_slug">acme_wireless_enabled_widgets</string>
<!-- enable product string for API endpoint URL - must specify for orgMode *new* -->
<string name="product_slug">acme-widget-model-123</string>
```
---


## License

Just like the Android support libraries, the Particle Android Cloud SDK and Device Setup library are available under the Apache License 2.0.  See [the LICENSE file](https://github.com/particle-iot/spark-sdk-android/blob/master/LICENSE) for the complete text of the license.
