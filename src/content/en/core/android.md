---
word: Android
title: Android SDK
order: 12
shared: true
---

Android Cloud SDK
=======

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
            Toaster.l(myActicity.this, "Wrong credentials or no internet connectivity, please try again");
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
For more complete interface information, check out the [source code of SparkCloud](https://github.com/spark/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/SparkCloud.java) and [SparkDevice](https://github.com/spark/spark-sdk-android/blob/master/cloudsdk/src/main/java/io/particle/android/sdk/cloud/SparkDevice.java).

If you're working from Android Studio on OS X, you can get the Javadoc for each method or class by putting the cursor over it and hitting `F1`.


### Logging
HTTP logging can be configured by setting the `http_log_level` string resource.  Valid values follow Retrofit's [`LogLevel` enum](http://square.github.io/retrofit/javadoc/retrofit/RestAdapter.LogLevel.html) : `NONE`, `BASIC`, `HEADERS`, `HEADERS_AND_ARGS`, or `FULL`.

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

Also note that the SDK is hosted on JCenter, but not Maven Central.
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

