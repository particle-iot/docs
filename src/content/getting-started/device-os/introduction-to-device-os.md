---
title: Introduction to Device OS
columns: two
layout: commonTwo.hbs
description: Introduction to Particle Device OS API for Particle IoT devices
---

# {{title}}

_Note: Device OS was previously referred to as **system firmware**, and
may still be called system firmware in certain Particle interfaces_.

Device OS is low-level firmware code that supports a Particle device's basic functions. You can think of Device OS as the _operating system_ (OS) for Particle's embedded hardware.

Like an operating system for a computer, Particle Device OS provides a foundation for other applications to run on. More specifically, it enables _application firmware_ (the firmware you write) to run successfully by exposing the underlying behaviors of the device.


Particle Device OS abstracts much of the complexity away from the traditional firmware development experience. Some specific responsibilities of Device OS include:

- **Secure communication**: Ensuring that all communications between the device and the Particle cloud are authorized and encrypted
- **Hardware abstraction**: Providing a single, unified interface to the device, regardless of the underlying hardware architecture
- **Application enablement**: Exposing a feature-rich API that is used by developers to write applications for the device
- **Over-the-air updates**: Allowing rapid remote changes to code running on the device while providing resilience in poor connectivity environments

Unlike application firmware, Device OS is written and maintained primarily by the Particle team. This is a conscious decision meant to keep you focused on your particular use case without needing to understand the nuances of low-level device behaviors.

That being said, Particle's firmware repository is available as an open
source project for those that want deep visibility into Device OS code. To view the code and/or contribute, check out the [repo on GitHub](https://github.com/particle-iot/device-os).


## Communication

Device OS supports a number of ways for devices to communicate with each other and with the Particle cloud. The Particle cloud connection is encrypted and mutually authenticated using RSA public/private key pairs.

#### Particle.publish

[Particle.publish](/reference/device-os/api/cloud-functions/particle-publish/) allows an event to be sent from a device to the cloud, from the cloud to a device, or between devices. 

When sent from the device to the cloud, publish can be used to send things like sensor data and trigger events on the cloud. Once in the cloud, the event can trigger a [webhook](/reference/cloud-apis/webhooks/) that makes a connection to an external service or web server.

Using publish and a webhook is particularly advantageous on cellular devices. It's possible to send an event securely in perhaps 200 bytes. Making a TLS/SSL connection to an external web service directly over cellular might use 5000 bytes of data per connection. That can add up quickly!

<img src="/assets/images/PublishFlow.png" class="full-width"/>

For [products](/getting-started/console/console/#product-tools), it's possible receive product events sent by devices using webhooks or the [Server-Sent-Events (SSE)](/reference/cloud-apis/api/#product-event-stream) data stream. This allows  events sent from devices to be received by the product even if the devices are claimed to different accounts. 

When using SSE, your server makes an outbound connection to the Particle cloud. This connection is TLS/SSL encrypted and authenticated with your Particle account access token. This connection is kept open, allowing events to be sent down the connection as them come in efficiently. This also allows your server to be on a private network behind a firewall, and does not require a static IP address, DNS, or a SSL certificate.

<img src="/assets/images/SSEFlow.png" class="full-width"/>


#### Particle.variable

[Particle.variable](/reference/device-os/api/cloud-functions/particle-subscribe/) allows the cloud to query a value from the device.

- For a publish, every time you publish, the data is sent up to the cloud.
- For a variable, the current value is stored on the device, and is only sent when requested.

<img src="/assets/images/VariableFlow.png" class="full-width"/>


Depending on your situation, one or the other may be more efficient. Also note:

- If you are querying a value from a large number of devices, it's almost always more efficient to use publish as you can hit the [API rate limits](/reference/cloud-apis/api/#api-rate-limits) if you need to make a variable retrieval to hundreds or thousands of devices.
- Variables cannot be queried if the device is offline, including in sleep mode. For those applications, you'll want to publish a value before sleep instead.

#### Particle.subscribe

[Particle.subscribe](/reference/device-os/api/cloud-functions/particle-subscribe/) allows a device to listen for an event from another device or the cloud.

Subscribing to private events is secure, as only devices in your account can send these events. Also, subscribe works across all connection types such as Wi-Fi and cellular, and does not require any firewall modifications for Wi-Fi networks in most cases.

#### Particle.function

[Particle.function](/reference/device-os/api/cloud-functions/particle-subscribe/) allows the cloud to send a request to a single device. This is handy if you want to control a device from the cloud side. 

There is no ability for devices to send function calls to other devices; publish and subscribe should be used instead.

#### TCP

Particle devices can also use low-level networking communication methods like [TCP](/reference/device-os/api/tcpclient/tcpclient/). TCP connections do not use the Particle cloud and are suitable for applications with higher data rates, very large data, and other specialized applications. While TCP is flexible, it does not include built-in encryption. Encryption requires the use of third-party libraries.

Note that TCP server mode is not supported on cellular devices. Cellular devices can only make outgoing TCP client connections, though data does flow both ways once connected.

#### UDP

In addition to TCP, the low-level [UDP](/reference/device-os/api/udp/udp/) networking protocol is also supported. 

On cellular devices, persistent UDP listeners are not supported. UDP packets can be received, but only after sending a packet, only from the address that was sent to, and only for a limited period of time, between 30 seconds and 23 minutes, depending on the carrier. 

#### BLE (Bluetooth LE)

[BLE](/reference/device-os/api/bluetooth-le-ble/bluetooth-le-ble/) can be used to send data between BLE compatible devices at short distances, typically within 10 meters. BLE does not require pairing (like with A2DP Bluetooth headsets) but does not have built-in encryption support. Both peripheral and central modes are supported, so the Particle device can be either side of the BLE connection.

BLE is only supported on Gen 3 devices (Argon, Boron, B-Series SoM).

#### Webhooks

[Webhooks](/reference/cloud-apis/webhooks/) allow an event, typically generated from a device, to trigger an outgoing connection to a server on the Internet. This might be your own server, a cloud-hosted server, such as Heroku, Amazon EC2 or lambda, Google Cloud AppEngine or cloud function, etc..

#### Server-Sent-Events

[SSE](/reference/cloud-apis/api/#get-a-stream-of-your-events) allows your server, or cloud-hosted server like Heroku, Amazon EC2, or Google AppEngine to make a connection to the Particle cloud and keep it open to receive events. This can be more efficient and have lower latency.

Because the connection is made from your server, you can do it from a home or office network without firewall changes and without requiring SSL server certificates while still having full TLS/SSL security.

One common way is to use the [particle-api-js](/reference/cloud-apis/javascript/#geteventstream) from node.js (server-based Javascript) but any language can be used.

#### Cloud API

The [Cloud API](/reference/cloud-apis/api/) allows any REST compatible server to make calls to the Particle cloud. This includes publishing events, calling functions, and reading variables.

## Versioning
New features, security patches, and bug fixes are introduced to new versions of Device OS regularly by the Particle team. These changes to Device OS are bundled into _releases_ that are versioned using [semantic versioning](http://semver.org/) best practices.

Device OS versions that are suffixed with `-rc.x` are called _prereleases_ ("rc" stands for release candidate). These prereleases contain the changes that will eventually become a default release, but still need more thorough usage and testing. We recommend that you **do not** flash prereleased firmware to your production units deployed in the field.

Each release is documented thoroughly to give you a comprehensive picture of what has changed in the new version. For a full list of Device OS releases and their descriptions, please check out [the release page on GitHub](https://github.com/particle-iot/device-os/releases) for the firmware repository.

## Firmware modules

Particle firmware is split into modules: two or more modules for the
Device OS (the code Particle writes and maintains)
and one module for the _application firmware_ (the code you write for your
device app).

Each module can be updated independently. This is why
over-the-air updates to the user application are so fast: you can update
only the user application module without having to update the Device OS
system modules.

## Firmware dependencies

Application firmware that is written in the
[Web](https://build.particle.io) or
[Desktop](https://www.particle.io/products/development-tools/particle-desktop-ide)
IDEs are _compiled against_ a specific version of Device OS system
firmware before
being sent to a device to run. That is, the Device OS acts as a
translator - taking the human-readable code you write and translating
into a binary that the device is able to run.

This creates a dependency that must be carefully managed.
Application firmware can only run on a device with the same or newer
Device OS version used to compile it. This is because the application firmware may be using new
functionality that was not available in an older version of Device OS. Allowing
a new application to run with an older Device OS version might lead to a
crash.

For example, imagine a new firmware primitive was introduced in Device OS version `1.0.0`, `Particle.travelInTime()`. As an aspiring time traveler, you quickly add the new feature to your firmware logic and send the code off to be compiled and flashed to your Electron.

However, the Electron on your desk is running Device OS version `0.9.0`, a version that predates the time travel functionality. Instructing the device to use the new firmware method in application firmware before it understands how to do so will of course not work. You can see how application firmware _depends on_ a compatible version of Device OS.

So what happens in these cases?

### Safe mode
When booting up, the Particle device will check dependencies between the
application firmware and the Device OS version. In the case of an incompatibility
between the two, the device will automatically enter into [_safe mode_](/troubleshooting/led/#safe-mode) (breathing magenta). 

Safe mode allows the device to connect to the Particle cloud, but does not run application firmware. There are many uses for safe mode, but is particularly relevant when a device receives application firmware compiled against a newer version of Device OS than it currently is running. In this case, safe mode prevents the device from running the incompatible application firmware that will cause it to hard fault.

### Safe mode healer
_Safe mode healer_ takes things one step further, automatically
resolving firmware incompatibilities when a device enters safe
mode. Because a device in safe mode still has network connectivity, it
is able to send an event to the Particle Device Cloud notifying it of the firmware mismatch.

From this event, the Particle Device Cloud determines the cause of the
incompatibility and delivers to the device a new version of Device OS
over-the-air. When this happens, you'll see the device rapidly blinking
magenta as it receives packets containing the new Device OS version.
When complete, the device will have what it needs to successfully run the application that was previously flashed.

The combination of safe mode and safe mode healer provides you
confidence when flashing new application firmwares to devices.
Regardless of the version of Device OS the app was compiled
against, the Particle Device Cloud will ensure the device has what it needs to run it without issue.

A couple of important notes:

- Device OS versions are _backwards compatible_. That is, you can flash an app compiled against an older version of Device OS to the device without the device entering into safe mode. The device will not be automatically downgraded to the older version of Device OS
- Device OS is _modular_ and contains multiple parts. That is, your device will receive 2 or more binary files when getting a Device OS update. When receiving system modules via safe mode healer, the device will reset between each binary flashed to it

## Managing Device OS
Advanced users may need the ability to actively manage Device OS on a fleet of devices. The management tools needed include:

- Visibility into the version of Device OS running on a device
- Ability to easily update the version of Device OS running on a device

### Which version is running on my device?

The easiest place to find the version of Device OS running on your device is in the [Web IDE](https://build.particle.io). From the main view, click on the devices icon (<i class="ion-pinpoint"></i>) from the sidebar. This opens up the device drawer. From here, find the desired device and click on the arrow (<i class="ion-chevron-right"></i>) to expand device details. You should now see the Device OS version running on the device:

![Find Device OS in the Web IDE](/assets/images/system-fw-ide.png)
<p class="caption">This device is running Device OS version <strong>0.6.2</strong></p>

You can also find this information in the [console](https://console.particle.io) by opening the details for a device:

![Find Device OS in the console](/assets/images/console-device-details-version.png)

Now that we know the version of Device OS on the device, how can we update it to a different version?

### Updating remotely
For devices in which you do not have physical access, you have the ability to update Device OS over-the-air.

#### Flashing application firmware

One of the easiest and safest ways to update Device OS is to simply flash an application firmware that was compiled against a newer version of Device OS. The device will receive the incompatible firmware app, and use [safe mode healer](#safe-mode-healer) to automatically download the newer system modules.

In the Web IDE, this can be done by using the _Device OS target_ dropdown, and choosing a version that is newer than what is currently on the device.

![Select newer version of Device OS in the IDE](/assets/images/system-fw-newer-ide.png)
<p class="caption">In this case, the app  will be compiled against <strong>0.7.0-rc.3</strong>, a prereleased Device OS version</p>

Now, compile and flash the firmware by clicking on the flash (<i class="ion-flash"></i>) icon. Your device will receive the new application firmware and reboot. Then, it will automatically enter safe mode and trigger the cloud to resolve the incompatibility by sending it Device OS version 0.7.0-rc.3.

Sweet! You just updated the Device OS on your device.

There's a couple of things to note:

- This approach will also work for _product firmware_. When a product firmware binary is [released to a fleet](/getting-started/console/console/#releasing-firmware), any device that receives it will enter into safe mode and heal itself by downloading the required Device OS
- This approach will trigger Device OS _upgrades_, but not _downgrades_. As mentioned earlier, Device OS is backwards compatible meaning that devices can successfully run application firmware compiled against an older version of Device OS than it currently is running

#### Workbench (remote)

You can also upgrade a device remotely using [Particle Workbench](/quickstart/workbench). 

The **Particle: Configure Workspace for Device** command allows you to select the version you wish to target.

![Workbench configure version](/assets/images/workbench/config-device-2.png)

There are additional instructions in the [Workbench tutorial](/getting-started/developer-tools/workbench/#cloud-build-and-flash).

#### CLI (Remote)
You can also use the Particle CLI to remotely update a device's Device
OS version without changing the application firmware. This is a more advanced approach and requires some technical chops.

To do this, first visit the [Device OS releases page](https://github.com/particle-iot/device-os/releases) on GitHub and locate the version you'd like to send to a device.

When you find the desired release, scroll down to the **Downloads** section. Here you will find the Device OS binary files. Remember that these binaries are specific to a device type, and a complete Device OS is comprised of multiple parts. Hone in on the files that begin with `system-part`:

![Device OS binaries](/assets/images/system-fw-binaries-gh.png)
<p class="caption">Available downloads for the 0.7.0-rc.3 release</p>

Find the files relevant to your device (each binary is suffixed with the device type) and click to download them to your machine. Note that you'll only need to do this step once to store a copy of the binaries on your computer.

Next, you'll flash these files to a device using the `particle flash` command in the CLI. If you haven't already, you must [download the Particle CLI](/getting-started/developer-tools/cli/). Open up your Terminal and run the following commands to flash the system modules to a device:

```bash
particle flash YOUR_DEVICE_NAME_OR_ID path/to/system-part1.bin
particle flash YOUR_DEVICE_NAME_ID path/to/system-part2.bin
# Sometimes required
particle flash YOUR_DEVICE_NAME_ID path/to/system-part3.bin
```

*Use caution when using this method. Double check that you are flashing the correct binaries for the given device type, and that you flash all required system parts.*

### Updating locally
For devices in which you have physical access, there are also methods to update Device OS over-the-wire.

#### Workbench (local)

You can also upgrade a device locally over USB using [Particle Workbench](/quickstart/workbench). 

Using the **Particle: Install Local Compiler** you can select the version you want to install by USB.

![Select local version](/assets/images/workbench/local-2.png)

Then use the **Particle: Flash application & Device OS (local)** command to flash your application and Device OS. This option can be used to both upgrade and downgrade Device OS.

There are additional instructions in the [Workbench tutorial](/getting-started/developer-tools/workbench/#local-build-and-flash).

#### CLI (Local)
The Particle CLI offers two different methods of updating Device OS locally. Both require that the device is connected to your computer over USB.  If you haven't already, you must [download the Particle CLI](/getting-started/developer-tools/cli/) and ensure you are running version **1.24.1** or later. You can check with `particle --version`.

The first approach is to run [`particle update`](/reference/developer-tools/cli/#particle-update). Open up your Terminal and run the following command to flash the latest Device OS to a device:


```bash
# put the device in DFU mode first, then update the Device OS
$ particle update
> Your device is ready for a system update.
> This process should take about 30 seconds. Here goes!

! Device OS update successfully completed!

> Your device should now restart automatically.
```

Be sure to put the device in [DFU mode](/troubleshooting/led/#dfu-mode-device-firmware-upgrade-) before running the command. Note that this will update your device to the _newest_ Device OS - it does not currently allow you to flash a different version of firmware other than the latest. 

If you'd like to use the CLI to flash a Device OS version _other than the latest_, you can use the `particle flash` command in a similar way as [outlined above](#cli-remote-). The only difference will be that you'll pass an argument to tell the CLI to flash the files over USB, and you won't have to include the device name or ID in the command:

```bash
particle flash --local path/to/system-part1.bin
particle flash --local path/to/system-part2.bin
# Sometimes required
particle flash --local path/to/system-part3.bin
```

