---
title: Firmware release process
columns: two
layout: commonTwo.hbs
description: Firmware release process
---

# {{title}}


One of the most valuable features of a Particle product is being able
to seamlessly manage firmware on a fleet of IoT devices. You now have
the ability to continuously improve how a device functions after
deployment. In addition, product firmware management allows you to
quickly and remotely fix bugs identified in the field, fleet-wide.

This happens through **firmware releases**, which targets some or all of
a device fleet to automatically download and run a firmware binary.

#### Recommended development flow

When releasing firmware your fleet, it's helpful to first understand
Particle's recommended release flow. This flow has been designed to minimize
risk when deploying new firmware to devices:

<img src="/assets/images/release-firmware-flow.png" class="full-width" />
<p class="caption">The recommended flow for releasing firmware</p>

1. The first step of the release flow is using [**development
devices**](/getting-started/console/development-devices/) to rapidly develop and iterate on product firmware. These are special
product devices marked specifically for internal testing.
This gives you the flexibility to experiment with
new firmwares while still simulating behaviors of deployed devices in
the production fleet. For information on marking a device as a
development devices, check out [the
guide](/getting-started/console/development-devices/#marking-a-development-device).

2. When you have finalized a firmware that you feel confident in releasing
to your fleet, [**prepare the binary and upload it to your
product**](#preparing-a-binary).

3. Before releasing, you will need to ensure that the uploaded product
firmware is running on at least one device in your product fleet.
Your development device(s) may already be running the firmware,
but we also recommend [**locking one or more devices**](#locking-firmware)
to the newly updated firmware and ensure that it re-connects
successfully to the cloud. This is because locking more closely
represents a release action, with the specific firmware being delivered
to a product device.

4. [**Mark the firmware as released**](#releasing-firmware). This will
target product devices to automatically download and run the firmware.
The Particle Device Cloud will respect the [precedence
rules](#firmware-precedence-rules) to determine which firmware is
delivered to a given device. You can also use [device groups](/getting-started/console/device-groups/),
to more safely roll out the firmware by targeting a subset of the
fleet for release.

The rest of this section contains details around how to go through this
process.

#### Development devices

Please visit the [guide on development
devices](/getting-started/console/development-devices/) for
information on this feature.

#### Preparing a binary

Click the Firmware icon in the left sidebar to get started. This will direct you to your product's firmware page, your centralized hub for viewing and managing firmware for your product's devices. If you haven't yet uploaded any firmware for this Product, your page will look like this:

<img src="/assets/images/firmware-page.png" class="full-width"
alt="Firmware page"/>

If you have been using the [Web IDE](/getting-started/developer-tools/build/) to
develop firmware, you are used to the process of writing, compiling, and
then flashing firmware. You will follow the same high-level process
here, but altered slightly to work with a fleet of devices. The first thing you'll need to do is compile a *firmware binary* that you will upload to your Console.


#### Preparing firmware (4.x and later)

Unlike compiling a binary for a single device, it is critical that the **firmware version** is included in the compiled binary when targeting Device OS 4.0 or later. 

Add the PRODUCT_VERSION macro to your main application `.ino`
file, below `#include "Particle.h"` if it includes that line. For more information, see [PRODUCT_VERSION](/reference/device-os/api/macros/product_version/).

The firmware version must be an integer that increments
each time a new binary is uploaded to the Console. This allows the
Particle Device Cloud to determine which devices should be running which firmware versions.

Here is an example of Blinky with the correct product version details:

```cpp
#include "Particle.h"

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


#### Preparing firmware (3.x and earlier)

Unlike compiling a binary for a single device, it is critical that the **product ID** and a **firmware version** are included in the compiled binary. Specifically, you must add `PRODUCT_ID([your product ID])` and `PRODUCT_VERSION([version])` into the application code of your firmware. For more information, see [PRODUCT_VERSION](/reference/device-os/api/macros/product_version/).

Add these two *macros* near the top of your main application `.ino`
file, below `#include "Particle.h"` if it includes that line. Remember
that your [product ID](/getting-started/console/console/#your-product-id) can be found in the navigation
of your Console. The firmware version must be an integer that increments
each time a new binary is uploaded to the Console. This allows the
Particle Device Cloud to determine which devices should be running which firmwares.

Here is an example of Blinky with the correct product and version details:

```cpp
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


#### Compiling binaries

If you are using Particle Workbench, follow the instructions to use the [**Particle: Cloud Compile**](/getting-started/developer-tools/workbench/#particle-cloud-compile) or [**Particle: Compile Application (local)**](/getting-started/developer-tools/workbench/#particle-compile-application-local-) to create a firmware binary.


If you are in the Web IDE, you can easily download a compiled binary by
clicking the code icon (<i class="ion-code"></i>) in your sidebar. You
will see the name of your app in the pane, along with a download icon
(shown below). Click the download icon to compile and download your current binary.

![Compile firmware](/assets/images/ide-compile.png)
<p class="caption">Compile and download a product binary from the web IDE</p>

Once you have a binary ready to go, it's time to upload it to the Console!

#### Uploading firmware

Back on the firmware page, click on the **Upload** button in the top-right corner of the page. This will launch the upload firmware modal:

![Upload firmware](/assets/images/upload-firmware.png)

A few things to keep in mind here:

* The firmware version that you enter into this screen **must match** what you just compiled into your binary. Madness will ensue otherwise!
* You should give your firmware a distinct title that concisely describes how it differs from other versions of firmware. This name will be important in how firmware is rolled out to devices
* Attach your newly compiled `.bin` file in the gray box

Click upload. Congrats! You've uploaded your first version of product firmware! You should now see it appear in your list of firmware versions.

![Product firmware version](/assets/images/product-firmware.png)
<p class="caption">Your firmware version now appears in your list of available binaries</p>

You can update the details of your product firmware version by clicking
Edit when hovering over that firmware version.

If you find a problem with your firmware version during testing, you can
delete the firmware version, recompile it and reupload it. It is only
possible to delete a firmware version before marking it as released.

![Product firmware editor](/assets/images/product-firmware-editor.png)
<p class="caption">Edit the details of your firmware version or delete an unreleased version</p>

#### Releasing firmware

Time to flash that shiny new binary to some devices! Notice that when
you hover over a version of firmware, you have the ability to
**release firmware**. Releasing firmware is the mechanism by which any
number of devices can receive a single version of firmware
without being individually targeted.

Imagine identifying a bug in your firmware and pushing out a fix to
thousands of devices that are out in the field. Or, consider the
possibility of continuing to add new capabilities to your fleet connected
devices, even after being deployed. It is all possible via releasing
firmware.

As a product creator, you can choose to release firmware to *some* or *all* of your
product fleet. Releasing a firmware as the **product default** sets the
firmware as the default version available to *all*
devices in the fleet to download and run.

To start the release process, place your cursor over the firmware you
want to release and click **Release firmware**:

<img class="full-width" src="/assets/images/release-firmware-list.png" />

A modal will appear, asking you to confirm the action you are about to
take:

![Release firmware confirmation](/assets/images/release-firmware-confirmation.png)
<p class="caption">Always confirm the version, targeted group(s) and impacted devices
before releasing firmware to your device fleet to ensure you are taking
the desired action.</p>

*Impacted devices* refers specifically to the number of devices
that will receive an OTA firmware update as a direct result of this
action. Keep in mind  that releasing firmware always presents risk. Anytime the code on a
device is changed, there is a chance of introducing bugs or regressions.
As a safeguard, **a firmware version must be successfully running on at
least one device before it can be released**.

When you have confirmed the release is what you have intended, click the
**Release this firmware** button. Note that the devices will not receive the firmware immediately;
instead, they will be targeted for an over-the-air update the next time
they start a new secure session with the cloud (this is called a
*handshake*).

It is also possible to release firmware to a subset of your product
fleet, using [device
groups](/getting-started/console/device-groups/). For more
information on fine-grained firmware management, please check out
[the guide](/getting-started/console/device-groups/) on device
groups.

#### Locking firmware

In many cases, you may want to force a device to download and run a specific
version of product firmware. This is referred to as **locking** the
device. You can lock a device to a new version of product
firmware to test it before releasing the firmware to the fleet.

To lock a device to a firmware, find the device on your product's
devices view. Click on the device, which
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
longer be targeted by the Particle cloud for automatic firmware updates,
until it is unlocked. For more details, please read the [firmware
precedence rules](#firmware-precedence-rules).

#### Unlocking firmware

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

#### Firmware precedence rules

Devices in your fleet will be targeted to
receive a version of product firmware according to these precedence
rules:

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
Particle cloud