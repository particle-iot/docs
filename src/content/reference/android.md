---
title: Android SDK
template: reference.hbs
columns: three
order: 6
---

# {{title}}

The Android SDK consists of two parts: (1) the Cloud SDK and (2) the Device Setup library, the first is an API wrapper that enables your mobile app to interact with internet-connected hardware through the Particle Cloud while the latter is a library allows you to easily create a setup wizard for allowing your app users to setup their devices.

## Android Cloud SDK

The Particle Android Cloud SDK enables Android apps to interact with Particle-powered connected products using the Particle Cloud. It’s an easy-to-use wrapper for Particle REST API. The Cloud SDK will allow you to:

- Get a list of a user's Particle devices.
- Read variables from devices.
- Invoke functions on devices.
- Manage access tokens for the Particle Cloud.
- Claim & unclaim devices for a user account.
- *(Coming Soon)* Publish events from the mobile app and subscribe to events coming from devices.

**Rebranding notice**

Spark recently rebranded as Particle!  Classes like `SparkCloud` and `SparkDevice` this will soon be replaced with `ParticleCloud` and `ParticleDevice`, _et al._

**Beta notice**

This SDK is still under development and is currently in beta.  Although it is tested and mostly API-stable, bugs and other issues may be present, and the API may change prior to leaving beta.

### Getting Started

The SDK is available as a Gradle dependency via [JCenter](https://bintray.com/particle/android/cloud-sdk/).  See the [Installation](#android-cloud-sdk-installation) section for more details.
**Spoiler**: just add `compile 'io.particle:cloudsdk:0.1.3'` to your `build.gradle`

You can also [download the SDK as a zip](https://github.com/spark/spark-sdk-android/archive/master.zip).

For some usage examples, check out [Usage](#android-cloud-sdk-usage) below, or play with the `example_app` module included in the git repository.

### Usage

**NOTE:**  All SDK methods are intentionally implemented as synchronous, blocking calls, including network calls.  This blocking API avoids nested callbacks and other complexity, making it easy to write a series of synchronous calls while on a non-UI thread.

To spare developers some of the awkwardness of making asynchronous calls and returning results back to the UI thread, we have supplied the `Async` and `ApiWork` set of convenience classes, a purpose-built wrapper around `AsyncTask` for use with these APIs.  ([Extras](#android-cloud-sdk-usage-extras) has more info on this.)

Cloud SDK usage mostly involves two main classes:

1. `SparkCloud` is a singleton which enables all basic cloud operations such as: user authentication, retrieving a device list, claiming, and more.
2. `SparkDevice` instances represent a claimed device.  Each instance enables device-specific operations: invoking functions, reading variables, and getting basic info about the device, such as name and version info.

### Extras

The SDK also ships with a handful of helpful utility classes:

- `Async.executeAsync` is a purpose-built wrapper around AsyncTask.  Usage information for this class follows in the API examples below.
- `Toaster`: is another boilerplate eliminator.  `Toast.makeToast(blah blah blah)` is absurd, when all you really wanted was an ultra-lightweight way to say "put this string on the screen for a sec".  `Toaster` makes this dream come true!
- `EZ`: contains miscellaneous shortcuts for reducing boilerplate which have no simple taxonomic classification.
- `Py`: There's nothing Particle or Android specific about this, but it's worth calling out.  This class brings a little Pythonic joy to your Java, like easy collection constructors (e.g.: `list()` and `set()`), and a _truthiness_ check named `truthy()`.  See the source for this class for additional documentation on this class.

Here are few examples for the most common use cases to get your started:

#### Log in to the Particle cloud

```java
Async.executeAsync(SparkCloud.get(myView.getContext()), new Async.ApiWork<SparkCloud, Void>() {

        public void callApi(SparkCloud sparkCloud) throws SparkCloudException, IOException {
            sparkCloud.logIn("ido@particle.io","l33tp4ssw0rd");
        }

        @Override
        public void onSuccess(Void aVoid) {
            Toaster.l(myActivity.this, "Logged in");
            // start new activity...
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", e);
            Toaster.l(myActivity.this, "Wrong credentials or no internet connectivity, please try again");
        }
});

```
---


#### Get a list of all devices for the currently logged-in user

```java
Async.executeAsync(sparkCloud, new Async.ApiWork<SparkCloud, List<SparkDevice>>() {

        public List<SparkDevice> callApi(SparkCloud sparkCloud) throws SparkCloudException, IOException {
            return sparkCloud.getDevices();
        }

        @Override
        public void onSuccess(List<SparkDevice> devices) {
            for (SparkDevice device : devices) {
                if (device.getName().equals("myDevice")) {
                    doSomethingWithMyDevice(device);
                    return;
                }
            }
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", e);
            Toaster.l(myActicity.this, "Wrong credentials or no internet connectivity, please try again");
        }
});

```
---

#### Read a variable from a Particle device (Core/Photon)
This example assumes that `sparkDevice` is an active instance of `SparkDevice`, and the device it represents is claimed by the currently logged-in user.

```java
Async.executeAsync(sparkDevice, new Async.ApiWork<SparkDevice, Integer>() {

        public Integer callApi(SparkDevice sparkDevice) throws SparkCloudException, IOException {
            return sparkCloud.getVariable("myVariable");
        }

        @Override
        public void onSuccess(Integer value) {
            Toaster.s(MyActivity.this, "Room temp is " + value + " degrees.");
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", e);
            Toaster.l(MyActivity.this, "Wrong credentials or no internet connectivity, please try again");
        }
});
```
---

#### Call a function on a Particle device (Core/Photon)
This example shows how to call a function on the device with a list of parameters.  The meaning of the value returned from `SparkDevice.callFunction()` depends on the function itself, e.g., in Tinker:
* Using `digitalread`, this is the value read from the pin.
* Using `digitalwrite`, this value is a _result code_, indicating if the write was successful.

```java
Async.executeAsync(sparkDevice, new Async.ApiWork<SparkDevice, Integer>() {

        public Integer callApi(SparkDevice sparkDevice) throws SparkCloudException, IOException {
            return sparkCloud.callFunction("digitalwrite", list("D7", "1"));
        }

        @Override
        public void onSuccess(Integer returnValue) {
            Toaster.s(MyActivity.this, "LED on D7 successfully turned on");
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", e);
        }
});
```
---

#### List device exposed functions and variables
`SparkDevice.getFunctions()` returns a list of function names.  `SparkDevice.getVariables()` returns a map of variable names to types.

```java
for (String funcName : sparkDevice.getFunctions()) {
    Log.i("SOME_TAG", "Device has function: " + funcName);
}

Map<String, Object> vars = sparkDevice.getVariables();
for (String name : vars.keySet()) {
    Log.i("SOME_TAG", String.format("variable '%s' type is '%s'", name, vars.get(name)));
}
```
---


#### Get a device instance by its ID

```java
Async.executeAsync(sparkCloud, new Async.ApiWork<SparkCloud, SparkDevice>() {

        public SparkDevice callApi(SparkCloud sparkCloud) throws SparkCloudException, IOException {
            return sparkCloud.getDevice("53fa73265066544b16208184");
        }

        @Override
        public void onSuccess(SparkDevice device) {
            myDevice = device;
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", e);
        }
});
```
---

#### Rename a device
```java
Async.executeAsync(sparkDevice, new Async.ApiWork<SparkDevice, Void>() {

        public Void callApi(SparkDevice sparkDevice) throws SparkCloudException, IOException {
            sparkDevice.setName("rocket_bubble");
            return null; // return "Void"
        }

        @Override
        public void onSuccess(Void v) {
            Log.i("SOME_TAG", "Rename succeeded");
        }

        @Override
        public void onFailure(SparkCloudException e) {
            Log.e("SOME_TAG", "Rename failed", e);
        }
});
```
---


#### Logout
This logs out the user, clearing the user's session and access token.

```java
SparkCloud.get(someContext).logOut()
```
---

### Additional reference
For more complete interface information, check out the [source code of SparkCloud](https://github.com/spark/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleCloud.java) and [SparkDevice](https://github.com/spark/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/ParticleDevice.java).

If you're working from Android Studio on OS X, you can get the Javadoc for each method or class by putting the cursor over it and hitting `F1`.


### Logging

HTTP logging can be configured by setting the `http_log_level` string resource.  Valid values follow Retrofit's `LogLevel` enum : `NONE`, `BASIC`, `HEADERS`, `HEADERS_AND_ARGS`, or `FULL`.

For example, to set logging to `BASIC`, you would add the following to your `strings.xml`:
```xml
<string name="http_log_level">BASIC</string>
```
---

### Installation

The SDK is available through [JCenter](https://bintray.com/particle/android/cloud-sdk/).  To install the Android Cloud SDK in your project, add the following to your app module Gradle file:

```gradle
dependencies {
    compile 'io.particle:cloudsdk:0.1.3'
}
```

Also note that the SDK is hosted on JCenter, but not Maven Central. You need a Gradle Version higher than 1.7.
Make sure your top-level Gradle file contains the following:

```gradle
allprojects {
    repositories {
        jcenter()
    }
}
```
---

### Communication

- If you **need help**, head to [our community website](http://community.particle.io), under the `Mobile` category for dicussion/troubleshooting around Android apps using the Particle Android Cloud SDK.
- If you are certain you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue, label it as `bug`.
- If you **have a feature request**, open an issue with an `enhancement` label on it
- If you **want to contribute**, submit a pull request, be sure to check out spark.github.io for our contribution guidelines, and please sign the [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).

### License

The Particle Android Cloud SDK is available under the Apache License 2.0.  See the LICENSE file for the complete text of the license.
This license provides flexibility and is a good fit for consuming the SDK in your developed app and being able to distrubute it in Google's Play Store without license violations.


## Android Device Setup library 

The Particle Device Setup library provides everything you need to offer your
users a simple initial setup process for Particle-powered devices.  This includes
all the necessary device communication code, an easily customizable UI, and a
simple developer API.

The setup UI can be easily customized by a modifying Android XML resource files.
Available customizations include: look & feel, colors, fonts, custom brand logos
and more.  Customization isn't required for a nice looking setup process,
though: good defaults are used throughout, with styling generally following
Google's Material Design guidelines.

With the Device Setup library, you only need to make one simple call from
your app, and the Particle setup process UI launches to guide the user
through the device setup process.  When that process finishes, the user is
returned to the Activity where they were left off, and a broadcast intent
is sent out with the ID of the device she just set up and claimed.

The wireless setup process for the Photon uses very different underlying
technology from the Core.  The Core used _SmartConfig_, while the Photon
uses what we call a “soft AP” mode: during setup, the Photon advertises
itself as a Wi-Fi network.  The mobile app configures the Android device to
connect to this soft AP network, and using this connection, it can provide
the Particle device with the credentials it needs for the Wi-Fi network
you want the to Photon to use.

<!---
[![CI Status](http://img.shields.io/travis/spark/SparkSetup.svg?style=flat)](https://travis-ci.org/spark/SparkSetup)
[![Version](https://img.shields.io/cocoapods/v/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![License](https://img.shields.io/cocoapods/l/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
[![Platform](https://img.shields.io/cocoapods/p/Spark-Setup.svg?style=flat)](http://cocoapods.org/pods/SparkSetup)
-->

**Rebranding notice**

As you know. Spark recently rebranded as Particle.  Some themes and code references still contains `Spark` in their names.
This will soon be replaced with `Particle`, but API impact should be minimal.

**Beta notice**

This library is still under development and is currently in beta.  Although it is tested
and mostly API-stable, bugs and other issues may be present, and the API may change prior
to leaving beta.


### Usage

#### Basic 

The Device Setup library has two main requirements:

- You must call `ParticleDeviceSetupLibrary.init()` in your Application.onCreate() or in the
onCreate() of your first Activity, e.g.:

```java
ParticleDeviceSetupLibrary.init(this.getApplicationContext(), MyMainActivity.class);
```
---

The class passed in as the second argument to `init()` is used to return you to the
"main activity" of your app once setup has completed (or whatever other activity you
wish to start once setup is complete).


- You must add all of the following entries to your application's `AndroidManifest.xml` file.
(Due to Android platform requirements, we cannot provide these manifest entries for
you automatically.)

```xml
<!-- All of the following are from the device setup lib, and must be present in your app's
manifest or you will not go to space today. -->
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.DiscoverDeviceActivity"
    android:label="@string/title_activity_discover_device"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="stateHidden" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.SelectNetworkActivity"
    android:label="@string/title_activity_select_network"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="stateHidden" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.PasswordEntryActivity"
    android:label="@string/title_activity_password_entry"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="adjustResize|stateVisible" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.ConnectingActivity"
    android:label="@string/title_activity_connecting"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="stateHidden" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.SuccessActivity"
    android:label="@string/title_activity_success"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="stateHidden" />
<activity
    android:name="io.particle.android.sdk.utils.ui.WebViewActivity"
    android:label="@string/title_activity_web_view"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.GetReadyActivity"
    android:label="@string/title_activity_get_ready"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar" />
<activity
    android:name="io.particle.android.sdk.devicesetup.ui.ManualNetworkEntryActivity"
    android:label="@string/title_activity_manual_network_entry"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="adjustResize|stateVisible" />
<activity
    android:name="io.particle.android.sdk.accountsetup.CreateAccountActivity"
    android:label="@string/title_activity_create_account"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="adjustResize|stateHidden" />
<activity
    android:name="io.particle.android.sdk.accountsetup.LoginActivity"
    android:label="@string/title_activity_login"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="adjustResize|stateHidden" />
<activity
    android:name="io.particle.android.sdk.accountsetup.PasswordResetActivity"
    android:label="@string/title_activity_password_reset"
    android:screenOrientation="portrait"
    android:theme="@style/ParticleSetupTheme.NoActionBar"
    android:windowSoftInputMode="adjustResize|stateVisible" />
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

Just listen for `ACTION_DEVICE_SETUP_COMPLETE`, and the device ID will be set on the `EXTRA_CONFIGURED_DEVICE_ID` value.


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

### Installation

The Particle Android Device Setup library is available via
[JCenter](https://bintray.com/particle/android/devicesetup/). To include it in your
project, add this to the `dependencies` section of your app module's `build.gradle`:

```gradle
dependencies {
    compile 'io.particle:devicesetup:0.1.3'
}
```
---

Also note that the library is hosted on JCenter, but not Maven Central.

Make sure your top-level Gradle file contains the following:

```gradle
allprojects {
    repositories {
        jcenter()
    }
}
```
---


### Requirements

- Android OS 4.0 (API 15) or higher
- Android Studio 1.2 or higher

### Communication

- If you **need help**, head to [our community website](http://community.particle.io), under the `Mobile` category
- If you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue, label it as `bug`.
- If you **have a feature request**, open an issue, and label it with `enhancement`.
- If you **want to contribute**, submit a pull request.  Be sure to check out spark.github.io for our contribution guidelines.  You'll also need to sign our [CLA](https://docs.google.com/a/particle.io/forms/d/1_2P-vRKGUFg5bmpcKLHO_qNZWGi5HKYnfrrkd-sbZoA/viewform).

### License

The Particle Device Setup library is available under the Apache License 2.0.
See the [LICENSE](https://github.com/spark/spark-sdk-android/blob/master/LICENSE) file for the complete text of the license.
This license provides flexibility and is a good fit for consuming the SDK in your developed app and being able to distrubute it in Google's Play Store without license violations.
