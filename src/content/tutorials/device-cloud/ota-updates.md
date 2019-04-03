---
word: OTA
title: OTA Firmware Updates
order: 1
shared: true
columns: two
layout: tutorials.hbs
---

# {{title}}

**Over-the-air (OTA) firmware updates** are a vital component of any IoT
system. Over-the-air firmware updates refers to the practice of remotely
updating the code on an embedded device.

<img src="/assets/images/ota-updates/ota-update-hero.png"/>
<p class="caption">Particle's all-in-one IoT platform offers industry
leading OTA update capabilities</p>

The value of incorporating OTA update capabilities into a connected
product cannot be understated, and include:

- The ability to add **new software features** to a product after a device has been deployed in the field to improve functionality over time
- The opportunity to **rapidly respond to bugs and security vulnerabilities** without the need for physical recalls of devices or truck rolls
- Ensuring embedded developers can quickly prototype and seamlessly roll out new versions of device firmware, **speeding up innovation cycles**


## OTA Updates with Particle

Particle's platform is uniquely positioned to provide industry-leading
OTA update capabilities for embedded devices. Using Particle for OTA
updates give you the following benefits:

### A Complete Solution

A successful OTA update requires complex coordination between IoT hardware, device firmware, network connectivity, and an IoT device cloud. Trust us, this is a _very hard problem_ to solve correctly.

Lucky for you and your team, this is where Particle's fully integrated IoT platform shines. These four parts of the "IoT stack" are core pillars of Particle's platform, and enable you to seamlessly deliver OTA updates to devices at any scale.

<img src="/assets/images/ota-updates/device-to-cloud.png"
class="full-width"/>

- **Hardware**: All Particle dev kits and systems-on-a-module (SoMs) support OTA updates right out of the box. Device and cloud-side safeguards are combined to ensure that devices only receive compatible firmware that can run on its unique hardware platform.

- **Device OS**: Our embedded operating system which runs on all Particle devices, Device OS, is architected to reliably and resiliently accept firmware updates from the Device Cloud.

- **Connectivity**: OTA updates work seamlessly across Particle's suite of connectivity offerings. Devices connecting over Wi-Fi, Cellular, and even via a Mesh network can receive firmware updates using our OTA feature set.

- **Device Cloud**: The Device Cloud tightly integrates with Device OS to safely and effectively deliver OTA updates. It also provides a variety of flexible management tools to choose how OTA updates should be applied based on your needs.

In fact, **one must have visibility and control over all four of these components of an IoT system to successfully deliver an OTA update**. Without any one of these parts, or the integration of these parts, an OTA update is not possible.

Other IoT platforms may market an OTA feature, but in reality only provide a small sliver of the functionality required perform a complete, reliable, and secure update — leaving your team to piece together a bespoke solution that distracts them from spending valuable time on the features that make your IoT product unique.

### Reliable and Resilient

Sending an OTA update is arguably one of the riskiest actions you can take on a connected device. Mishandling OTA updates could at a minimum cause temporary disruption, or at worst force the device into an unrecoverable state.

Particle's OTA updates have been built from the ground up to be reliable and resilient to allow your team to deploy quickly while keeping your fleet functioning healthily:

- **Atomic updates**: A Particle device will only run a new version of firmware it has received after empirically verifying that it has successfully received the entire file from the cloud. Additionally, your firmware application can be updated independently of the Device OS.

- **Automatic rollbacks**: If for some reason an OTA is interrupted (like a disruption in connectivity or a device losing power), the device will fail gracefully by automatically reverting to the previous version of working firmware.

- **Minimal disruption**: A Particle device continues to run its current version of firmware while it receives an OTA update. After a brief reset, the device seamlessly begins running the new firmware.

- **Application and Device OS version management**: Particle's OTA
capabilities make it easy to manage _both_ the firmware applications
your team writes, _and_ the low-level Device OS that Particle manages.
This lets you send updates to your device logic, but also enables you to
stay up-to-date with the latest features and improvements in Device OS.
You are in complete control of your adoption of Device OS versions.

- **Support for updates for sleeping devices**: Some applications use *sleep modes* to reduce power consumption on battery-powered devices. OTA updates can be released and applied when the device wakes up from sleep mode automatically. 

### Secure

Given the risk associated with an OTA update, it is especially critical
that these updates are performed securely and safely.

- **Encrypted communications**: All messages between Particle devices and the Device Cloud are always encrypted, including firmware files. This eliminates potential man-in-the-middle attacks that seek to send fraudulent firmware to the device.

- **Sender verification**: Every OTA update attempt is first verified to ensure the identity of the sender is an approved device manager.

### Scalable

Particle provides your team with tools as part of the Device Cloud that give you full control and flexibility in how OTA updates are delivered to your fleet. Particle offers different OTA tools that are appropriate at different phases of fleet growth.

#### Prototyping

When prototyping, you want to enable your development team with the
ability to iterate quickly to provide viability and value in as little
time as possible.

Particle's **single device OTA** functions help enable your embedded
development team to rapidly prototype and innovate. OTA updates can be
sent with a click of a button in our IDEs (available both in
[Workbench](https://www.particle.io/workbench/) and our [Web
IDE](https://build.particle.io)), or via our developer-approved [REST
API](/reference/device-cloud/api/).

#### Moving to Production

As you begin to deploy large numbers of devices, it is imperative to
have the ability to safely batch OTA updates to many devices at one time. This is what allows you to roll out new software features, fix bugs, or patch security holes across your fleet.

For this purpose, Particle offers **fleet-wide OTA updates**. A variety
of tools are available in the Particle Console to apply fleet-wide
updates without sacrificing fine-grained control.

- **Firmware releases**: Cut a version of firmware that will be
automatically sent to your fleet, with sensible safeguards to roll out
an update responsibly and monitor fleet health for changes.
- **Release by device groups**: Target a subset of your fleet to receive a new version of firmware. This is useful when your product has variants that require different device behaviors, or when wanting to phase out a single release over time to reduce risk.
- **Immediate firmware releases (alpha)**: Instead of waiting for devices to re-connect to receive an update, push a fleet-wide update out immediately.

## The firmware "stack"

### Device OS

The Particle [Device OS](/tutorials/device-os/device-os/) provides the foundation for your application. It provides many features including:

- Core networking and communication [APIs](/reference/device-os/firmware/)
- Standard C and C++ libraries
- Hardware abstraction layer, allowing your code to be run on a variety of devices
- Real-time operating system (RTOS)

The device OS can be updated over-the-air as needed, however you are always in control over updates. You can choose whether you want to upgrade or not for any release.

### Application firmware

Application firmware provides the features for your specific use case and support for any additional peripheral hardware like sensors, actuators, etc..

Particle application firmware is programmed in C/C++ using industry-standard gcc C++11 compilers. 

Furthermore, to facilitate moving from prototyping to production, an Arduino compatibility layer allows the use of hardware libraries for sensors, displays, etc. that were designed for Arduino to be easily used on Particle devices.

Application firmware is designed to make it easy to compile your firmware with little or no modification when switching between devices. You can start prototyping with the Boron in prototyping breadboards and move to mass-production on the B series SoM (system on a module).

Splitting the firmware between application part (up to 128 Kbytes) and system parts (384K to 656K bytes, depending on the device) allows for faster updates of application firmware, with reduced data usage when only updating application firmware.

## Fleet-wide OTA

Fleet-wide OTA (over-the-air) firmware updates make it easy to deploy a new firmware binary to your fleet of devices.

- For initial testing, you might deploy to only one device. This might be the device sitting on your desk, for easy access to the debugging USB serial port, for example.
- Once you've verified the functionality, you may choose to deploy to a subset of your devices using groups.
- Finally, you can roll out the release to all of your devices.

### Gradual vs. Immediate Firmware Updates

Once you've decided to release your firmware to your devices, the default is a gradual roll-out. This deploys new releases to devices when they reconnect to the Particle Device Cloud. This offers the least disruption, since the device was already in the process of reconnecting. Historically, this was the only option.

Immediate Firmware Updates makes it possible to roll out your firmware more rapidly, and also provides fine-grained control over finding a safe time to update devices, controlled by the device itself. For example, consider an electric scooter controller. It could defer updates until the device was parked, for example.

<img src="/assets/images/immediate-vs-gradual-comparison.png" class="full-width tall" />

<p class="caption"> Immediate vs. Gradual Comparison </p>

![Immediate vs. Gradual Graph](/assets/images/immediate-vs-gradual-graph.jpg)


### Firmware Releases

A firmware release consists of a compiled firmware binary for a given device containing your application code. 

Each binary also targets a specific Device OS version. This is the minimum Device OS version that is required to run your application. If the device us running older Device OS, the Device OS will be upgraded automatically.

If the device is running the same or newer version of Device OS, no upgrade (or downgrade) is required, saving time and data usage.


### Recommended development flow

When releasing firmware your fleet, it's helpful to first understand
Particle's recommended release flow. This flow has been designed to minimize risk when deploying new firmware to devices:

<img src="/assets/images/release-firmware-flow.png" class="full-width" />
<p class="caption">The recommended flow for releasing firmware</p>

1. The first step of the release flow is using [**development
devices**](/guide/how-to-build-a-product/development-devices/) to rapidly develop and iterate on product firmware. These are special
product devices marked specifically for internal testing.
This gives you the flexibility to experiment with
new firmwares while still simulating behaviors of deployed devices in
the production fleet. For information on marking a device as a
development devices, check out [the
guide](/tutorials/product-tools/development-devices/#marking-a-development-device).

2. When you have finalized a firmware that you feel confident in releasing to your fleet, [**prepare the binary and upload it to your
product**](/tutorials/device-cloud/console/#preparing-a-binary).

3. Before releasing, you will need to ensure that the uploaded product
firmware is running on at least one device in your product fleet.
Your development device(s) may already be running the firmware,
but we also recommend [**locking one or more devices**](/tutorials/device-cloud/console/#locking-firmware)
to the newly updated firmware and ensure that it re-connects
successfully to the cloud. This is because locking more closely
represents a release action, with the specific firmware being delivered
to a product device.

4. [**Mark the firmware as released**](/tutorials/device-cloud/console/#releasing-firmware). This will
target product devices to automatically download and run the firmware.
The Particle Device Cloud will respect the [precedence
rules](#firmware-precedence-rules) to determine which firmware is
delivered to a given device. If you are on the Enterprise plan with
access to [device groups](/tutorials/product-tools/device-groups/),
you can more safely roll out the firmware by targeting a subset of the
fleet for release.

The rest of this section contains details around how to go through this
process.

### Preparing an application firmware binary

Click the Firmware icon in the left sidebar to get started. This will direct you to your product's firmware page, your centralized hub for viewing and managing firmware for your product's devices. If you haven't yet uploaded any firmware for this Product, your page will look like this:

<img src="/assets/images/firmware-page.png" class="full-width"
alt="Firmware page"/>

If you have been using the [Web IDE](/tutorials/developer-tools/build) to
develop firmware, you are used to the process of writing, compiling, and
then flashing firmware. You will follow the same high-level process
here, but altered slightly to work with a fleet of devices. The first thing you'll need to do is compile a *firmware binary* that you will upload to your Console.

Unlike compiling a binary for a single device, it is critical that the **product ID** and a **firmware version** are included in the compiled binary. Specifically, you must add `PRODUCT_ID([your product ID])` and `PRODUCT_VERSION([version])` into the application code of your firmware. This is documented fully [here](https://github.com/particle-iot/device-os/blob/develop/docs/build.md#product-id).

Add these two *macros* near the top of your main application `.ino`
file, below `#include "Particle.h"` if it includes that line. Remember
that your [product ID](/tutorials/device-cloud/console/#your-product-id) can be found in the navigation
of your Console. The firmware version must be an integer that increments
each time a new binary is uploaded to the Console. This allows the
Particle Device Cloud to determine which devices should be running which firmwares.

Here is an example of Blinky with the correct product and version details:

```
PRODUCT_ID(94);
PRODUCT_VERSION(1);

int led = D0;  // You'll need to wire an LED to this one to see it blink.

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);   // Turn ON the LED pins
  delay(300);               // Wait for 1000mS = 1 second
  digitalWrite(led, LOW);    // Turn OFF the LED pins
  delay(300);               // Wait for 1 second in off mode
}
```

### Development devices

**Development devices** are special class of product devices marked specifically for internal testing, separate from the production fleet. Development devices are prevented from receiving any automatic product firmware updates from the Particle Device Cloud. These devices will ignore both released product firmware as well as any firmware version it has been locked to run.

The [Product Tools Development Devices Guide](/tutorials/product-tools/development-devices/) explains how to set devices as development devices.

### Upload firmware binary

Back on the firmware page, click on the **Upload** button in the top-right corner of the page. This will launch the upload firmware modal:

![Upload firmware](/assets/images/upload-firmware.png)

A few things to keep in mind here:

* The firmware version that you enter into this screen **must match** what you just compiled into your binary. Madness will ensue otherwise!
* You should give your firmware a distinct title that concisely describes how it differs from other versions of firmware. This name will be important in how firmware is rolled out to devices
* Attach your newly compiled `.bin` file in the gray box

Click upload. Congrats! You've uploaded your first version of product firmware! You should now see it appear in your list of firmware versions.

![Product firmware version](/assets/images/product-firmware.png)
<p class="caption">Your firmware version now appears in your list of available binaries</p>

### Locking firmware


In many cases, you may want to force a device to download and run a specific
version of product firmware. This is referred to as **locking** the
device. You can lock a device to a new version of product
firmware to test it before releasing the firmware to the fleet.

To lock a device to a firmware, find the device on your product's
devices view <i class="im-devices-icon"></i>. Click on the device, which
will take you to the device details view. Click on the **Edit** button:

<img class="full-width" alt="Edit device" src="/assets/images/edit-device.png" />

This will allow you to edit many aspects of the device's state,
including the firmware it is targeted to run. Find the **Firmware**
section, select a version of firmware you want to lock the device to,
and click the **Lock** button as sown below:

<img class="full-width" alt="Lock device firmware"
src="/assets/images/lock-firmware.png" />

If the device is currently online, you can optionally immediately
trigger an OTA update to the device by checking *Flash now* next to the
lock button. Otherwise, the device will download and run the locked
firmware the next time it handshakes with the cloud (starts a new secure
session, most often on reset).

Once the device downloads and runs the locked firmware, it will no
longer be targeted by the Particle Device Cloud for automatic firmware updates,
until it is unlocked. For more details, please read the [firmware
precedence rules](#firmware-precedence-rules).

### Unlocking firmware

Unlocking a product device breaks its association with the locked
firmware version and makes the device eligible to receive released
product firmwares once again.

To unlock a device, visit the device's details view by clicking on it
from your product's device list. Click the **Edit button** (shown
above), and then click the **Unlock** button:

<img class="full-width" alt="Unlock device firmware"
src="/assets/images/unlock-firmware.png" />

The device above is now unlocked from version 3 of product firmware, and
may be targeted to receive a released firmware next time it handshakes
with the cloud.

### Choosing release targets

The default is to deliver a release to all devices in your product. However, you can use the device groups feature to limit a release to a certain group.

Groups are like tags; each device can be part of zero or more groups. You might use groups for tagging devices by geographical location, features, or for things like beta test users. 

In this example, I've selected the `beta_test` group of devices to deploy a release to:

![Release To Group](/assets/images/product-release-group.png)

The [Product Tools Device Groups Guide](/tutorials/product-tools/device-groups/) shows how to use groups.

### Releases via the REST API

All of the operations that can be performed from the console can also be automated using the REST API. You might do this to automate your build and release process, for example.

You can build firmware using the [Particle CLI](/reference/developer-tools/cli/#particle-compile) or directly using the [compile source code API](/reference/device-cloud/api/#compile-source-code).

Using the [upload product firmware API](/reference/device-cloud/api/#upload-product-firmware) you can upload your firmware binary.

Finally, the [release product firmware API](/reference/device-cloud/api/#release-product-firmware) can be used to release the firmware to devices.

By using the APIs, you can script solutions that leverage other techniques like source code control (such as Github) and continuous integration tests.

### Firmware precedence rules

Devices in your fleet will be targeted to
receive a version of product firmware according to these precedence
rules:

- A **development device** never receives automatic updates of product
firmware.

- A device that has been **individually locked** to a version of product
firmware is respected above all else, and will not be overwritten by any
released firmwares.

- If unlocked, devices **belonging to a group** will receive the
corresponding group's released firmware (if a firmware has been released
to the group). When a device belongs to multiple groups that each have
released firmware, the _highest firmware version_ will be preferred

- If a device is unlocked and **does not belong to any groups** with
released firmware, it will receive the **Product default** released
firmware (if a firmware has been released as the Product default)

- If none of the above conditions result in a device being targeted for
a product firmware, it will not receive an automatic OTA update from the
Particle Device Cloud

## Immediate Firmware Releases (alpha)

Firmware Releases allow your team to roll out an OTA update to a fleet
of devices with a single action.

By default, Firmware Releases are sent to devices **gradually**.
Targeted device will receive the new version of firmware over time, with
each device updating the next time it starts a new secure session with
the Device Cloud. This is to ensure devices are not disrupted while in
use as a result of the reset needed to begin running the new firmware.

However, there are many instances where it is preferrable to release a
version of firmware **immediately**. This may be because:

- You desire speedy delivery of an update with new features or
security patches to impacted devices in your fleet
- You may have unexpectedly introduced a bug in your previous release,
and need to quickly rollback

**Immediate Firmware Releases** allow you to trigger a _real-time_ OTA
update across a fleet of devices. Individual devices can express their
availability for an OTA to the Device Cloud, preventing an Immediate
Release from disrupting busy devices.

This provides your team with the tools you need to roll out an OTA update
quickly without putting devices in your fleet at risk being interrupted
during a critical activity.

Immediate Firmware Releases is currently in _alpha_, and is only available to select Enterprise customers. [Interested in Immediate Firmware Releases?](https://www.particle.io/sales)

### Marking a firmware release as immediate
To mark a version of firmware as an Immediate Firmware Release, begin the release
process as-normal. On the Firmware view of the Console for your product,
identify the version of firmware you'd like to release, and click the
**Release Firmware** link that appears on hover.

When the _Release Firmware_ modal appears, choose the group(s) that you
would like to release to. Then, top opt-in to an immediate release,
check the checkbox signaling that you would like to deliver the firmware
immediately to target devices:

![](/assets/images/ota-updates/immediate-release.png)

Remember that this is an Enterprise-only feature -- so this action will
be disabled unless you are an Enterprise customer. Interested in
Immediate Firmware Releases? [Talk to us!](https://www.particle.io/sales)

Note that the Console describes that target devices that are **online**
with **OTA updates enabled** would receive the new version of firmware
immediately.
- A target device _must be online_ and connected to the Device Cloud to
receive the OTA update immediately at the time of release. Offline devices targeted
to receive the new version of firmware will be OTA updated the next time
they come online.
- A target device _must also have OTA updates enabled_ at the time of release
to receive the OTA update immediately. Specifically, this means that
[`System.updatesEnabled()`](/reference/device-os/firmware/argon/#system-updatesenabled-)
returns `true` in application firmware. For more information, see the
section below on [controlling OTA
availability](#controlling-ota-availability).

### Understanding the impact of Immediate Firmware Releases

After clicking **Next**, you will need to confirm that you understand
the impact of the action that you are about to take:

![](/assets/images/ota-updates/immediate-release-confirm.png)

What is most important to recognize is that **Immediate Firmware
Releases _can be disruptive_ to active devices**. That is, if a targeted
device is online (connected to the Device Cloud) and [OTA updates have
not been disabled](#disabling-ota-updates), the Device Cloud will
trigger the OTA to occur at the time of release.

For those fleet managers in which disrupting active devices is
problematic, we strongly suggest implementing [OTA control
behaviors](#controlling-ota-availability) in Device OS to properly
coordinate when Immediate Releases are delivered to target devices.

When you check the checkbox to confirm the Immediate Release, you can
proceed with completing the release action. This will begin the process
of rolling out the version of firmware to target devices immediately.

In your firmware list, you should see the firmware version marked as an
Immediate Release:

<img class="small" src="/assets/images/ota-updates/immediate-fw-list.png" />

## Single Device OTA

Single Device OTA is the how most users initially program their Particle developer devices using the IDEs.

### OTA in the IDEs

From the Particle [Web IDE](https://build.particle.io), you simply select the device you want to flash from the **Devices** tab (circle with 4 lines) and click the **Flash** icon.

From Particle [Workbench](https://www.particle.io/workbench/) you select the device using [Particle: Configure Workspace for Device](/tutorials/developer-tools/workbench/#cloud-build-and-flash) and compile and flash using ** Particle: Cloud Flash**.

From the [Particle CLI](https://particle.io/cli/), you use a command like:

```
particle flash my-device my-app.ino
```

When used with products, the device must not only be marked as a development device, but also claimed to your Particle account. For this reason, we recommend each developer have their own device, claimed to their own account, and often on their desk with each access to buttons and the USB debug serial port, for ease of development.

### Flash via the REST API

It is also possible to flash devices using the REST API. 

For example, you can use the [flash a device with a pre-compiled binary](/reference/device-cloud/api/#flash-a-device-with-a-pre-compiled-binary) API to program a device.

```
$ curl -X PUT "https://api.particle.io/v1/devices/0123456789abcdef01234567?access_token=1234" \
       -F file=@my-firmware-app.bin \
       -F file_type=binary
```

With products, as a team member you can flash product development devices that are part of the product but not claimed to your account using the API. This allows for shared pools of devices across team members.

In order to use the product REST API you'll need a product bearer token. To get started, the easiest way to get one is to open the console, your product, click **Events** (1) within your product, **View events from a terminal** (2), then copy and paste the token (highlighted). Note that it spans two lines, and is the part after `access_token=` and not including the equal sign.

![Product token from console](/assets/images/product-token.png)

Note that this token is short-lived and will be invalided when you log out of the console, so for permanent use you may want to create one using the API directly but this is useful for testing.

You'll use the product variation of the [flash a device with a pre-compiled binary](/reference/device-cloud/api/#flash-a-device-with-a-pre-compiled-binary) API.

```
$ curl -X PUT "https://api.particle.io/v1/products/:productIdOrSlug/devices/0123456789abcdef01234567?access_token=1234" \
       -F file=@my-firmware-app.bin \
       -F file_type=binary
```

The device must still be marked as a development device, otherwise the cloud will update to the currently released firmware for that device immediately after you manually flash code.

### Flash via SDKs

In addition to just the cloud REST API directly or using curl, you can also use the [particle-api-js](/reference/SDKs/javascript/) Javascript API from node.js. This can make automating complex tasks much easier.

The [flashDevice](/reference/SDKs/javascript/#flash) method makes it easy to compile and flash or flash a pre-built binary:

```
particle.flashDevice({ deviceId: 'DEVICE_ID', files: { file1: './path/file1' }, auth: token }).then(function(data) {
  console.log('Device flashing started successfully:', data);
}, function(err) {
  console.log('An error occurred while flashing the device:', err);
});
```
 
The Particle Device SDKs for iOS and Android are also able to flash code. Note that when using the SDKs the code is flashed from the Particle Device Cloud. While initiated from the mobile device, the actual transfer is done securely through the Particle Device Cloud, not directly with your mobile device. This can only be done for devices claimed to your account, and for products, marked as a development device.

## Controlling OTA availability

Sending an OTA update to a device comes with the risk of interrupting it
during critical activities. Particle's Device OS includes [helpful APIs](/reference/device-os/firmware/argon/#system-enableupdates-)
to allow a device to coordinate with the Device Cloud to ensure OTAs are
delivered at the appropriate time.

Furthermore, OTA updates occur in roughly three phases:

- A user firmware update may either immediately stop your user firmware from running while being downloaded, or may allow your code to continue, but with a performance degradation (when using `SYSTEM_THREAD(ENABLED)`).
- After fully downloaded, you can either allow the device to be reset, or halt the reset until a later time. The reset process is typically quick, only a few seconds. 
- If the new firmware requires a Device OS upgrade, the upgrades are applied after reset. This can take a minute or two if an upgrade is required.

### Non-immediate updates

The default behavior is for updates to occur when a device establishes a session with the cloud. This occurs a few seconds after the cloud connection is established. The rules for OTA availability apply to these updates as well as immediate updates.

Previously, for Electron, E Series, and Gen 3 (Argon, Boron, and Xenon) updates occurred only after a full session authentication. This could occur as infrequently as every 10 days, or when manually forced from the cloud or device side. Also, the update check occurred tens of seconds after the connection was established. Now updates are also checked on session resume, which occurs much more often, including after waking from sleep mode, and occurs much more quickly, making it possible for battery-powered devices to go to sleep much more quickly if an update is not required. 

{{!-- TODO: Add this section back when I can take screenshots ### OTA availability in the Console --}}

### Disabling OTA updates

[`System.disableUpdates()`](/reference/device-os/firmware/#system-disableupdates-) can be added in application firmware to
disable OTA updates for an individual device. This is done to prevent
OTA attempts from the Device Cloud when the device is not available for
an update.

Calling `System.disableUpdates()` will **prevent all over-the-air
firmware requests from initiating**, including single device OTA
attempts (i.e. flashing development firmware in the Web IDE) and
fleet-wide OTA attempts (i.e. a firmware release).

### Re-enabling OTA updates

[`System.enableUpdates()`](/reference/device-os/firmware/#system-enableupdates-) enables OTA updates for an individual device,
allowing all over-the-air firmware requests from the Device Cloud.
By default, OTA updates are enabled for a device. This method would only
need to be called if updates had been previously disabled using
`System.disableUpdates()`.

### Notifications of pending OTA updates

[`System.updatesPending()`](/reference/device-os/firmware/#system-updatespending-) is a boolean flag that will return whether a
new version of Product firmware is available for the device. This is
helpful in the case when updates have been disabled for a device (by
calling `System.disableUpdates()` in firmware), and the device needs
to be notified that there is a pending update for the device.

In this case, the OTA update will be prevented by the device. The device
will emit an internal system event, `firmware_update_pending` and
`System.updatesPending()` will evaluate to `true`.

### Force Enable OTA updates

While you can inhibit firmware updates from your device firmware, sometimes you need to override the device. If, for example, you flashed firmware that had a bug in the disable updates code, you might need to force enable updates to replace the bad code.

Fortunately, this can be done remotely by selecting the Force Enable OTA Updates option in the device settings in the console.


### Putting it all together

Depending on the nature of your IoT application, you may want to:

- Only disable OTA updates when critical activities are being carried
out by the device, keeping OTA enabled for most of the time the device
is online
- Disable OTA updates most of the time the device is online, and include
logic to conditionally enable updates at the appropriate time
- Allow the OTA update to downloaded at any time, but defer the reset after download.

#### Disabling OTA only when necessary

The calls [`System.enableUpdates()`](/reference/device-os/firmware/#system-enableupdates-) and [`System.disableUpdates()`](/reference/device-os/firmware/#system-disableupdates-) can be used to control whether updates are allowed.

When not using `SYSTEM_THREAD(ENABLED)`, updates are only checked between your calls to your loop() function.

When using `SYSTEM_THREAD(ENABLED)`, updates can occur at any time.

`System.enableUpdates()` and `System.disableUpdates()` just set an internal flag and do not incur and data usage so it's safe to call them frequently.

```
void setup() {
}

void loop() {
	System.disableUpdates();
	criticalFunction();
	System.enableUpdates();
}
```

#### Disabling OTA most of the time

This architecture is likely preferable if the cost of disrupting a
device during normal operation is very high. Imagine a connected medical
device needed at a moment's notice to save lives -- the risk of an OTA
would be high enough in this case to warrant disabling updates by
default, then temporarily enabling them when a safe "update window" has
been identified.

One common location to call `System.disableUpdates()` is from setup(). Note, however, that for this to work as intended, preventing any updates, you should use `SYSTEM_THREAD(ENABLED)` or `SYSTEM_MODE(SEMI_AUTOMATIC)` or `SYSTEM_MODE(MANUAL)`. 

Example using `SYSTEM_MODE(SEMI_AUTOMATIC)`:

```
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	// When disabling updates by default, you must use either system thread
	// enabled or system mode SEMI_AUTOMATIC or MANUAL
	System.disableUpdates();

	// After setting the disable updates flag, it's safe to connect to the cloud.
	Particle.connect();
}

void loop() {
}
```

Example using `SYSTEM_THREAD(ENABLED)`:

```
#include "Particle.h"

SYSTEM_THREAD(ENABLED);

void setup() {
	// When disabling updates by default, you must use either system thread
	// enabled or system mode SEMI_AUTOMATIC or MANUAL
	System.disableUpdates();
}

void loop() {

}
```

The reason is that with threading disabled `SYSTEM_MODE(AUTOMATIC)`, the default mode, setup() is only called after the cloud connection has been established and you might not be able to prevent the update from occurring at boot.

If you want to manage firmware updates in this way, you can check [`System.updatesPending()`](/reference/device-os/firmware/#system-updatespending-) when you are in a situation where updates would be acceptable. If true, you can then enable updated again using `System.enableUpdates()`. 

For example, if you were writing firmware for an electric scooter, you might only want to do update when it's idle and between users. If you were building an asset tracking application, you might only want to do updates when not in motion.

```

bool isSafeToUpdate();

void setup() {
	// When disabling updates by default, you must use either system
	// thread enabled or system mode SEMI_AUTOMATIC or MANUAL
	System.disableUpdates();

	// After setting the disable updates flag, it's safe to connect to
	// the cloud.
	Particle.connect();
}

void loop() {
	if (isSafeToUpdate() && System.updatesPending()) {
		System.enableUpdates();

		// Wait 2 minutes for the update to complete and the device
		// to restart. If the device doesn't automatically reset, manually
		// reset just in case.
		unsigned long start = millis();
		while (millis() - start < (120 * 1000)) {
			Particle.process();
		}
		// You normally won't reach this point as the device will
		// restart automatically to apply the update.
		System.reset();
	}
}

```

#### Intercepting the post OTA reset

When using `SYSTEM_THREAD(ENABLED)` your code will continue to run during the download process for the new user firmware, however performance will be affected. Normally, the device will reset immediately after the download completes, and after reset the device will be running the new firmware.

Using [`System.disableReset()`](/reference/device-os/firmware/#disablereset-) will prevent this reset from occurring. You might do this if you want to do additional cleanup, or delay it until a more appropriate time.

You can use the [`on_reset_pending`](/reference/device-os/firmware/#system-events) event to be notified when a reset is required. You can also call [`System.resetPending()`](/reference/device-os/firmware/#resetpending-) to find out if the system needs a reset to complete an OTA update. 

Once you've performed any additional operations and it's a good time to reset, you can call `System.reset()`.

```
SYSTEM_THREAD(ENABLED);

bool isSafeToReset();

void setup() {
	// Allow updates to be downloaded, but wait before restarting. 
	// This only makes sense in system thread enabled mode.
	System.disableReset();
}

void loop() {
	if (isSafeToReset() && System.resetPending()) {
		System.reset();
	}
}


bool isSafeToReset() {
	return false;
}
```

It is also possible to use the [`reset` System Event](/reference/device-os/firmware/#system-events). This is ideal if you only want to do quick clean-up operations before resetting.

```
void setup() {
    System.on(reset, resetHandler);
}

void loop() {
}

void resetHandler() {
	// Put code here to be called right before reset.
	// Don't put lengthy operations here; this would be a good
	// place to flush a flash file system, for example.
}
```
