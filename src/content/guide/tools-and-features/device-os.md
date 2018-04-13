---
word: Device OS
title: Device OS
order: 10
columns: two
layout: guide.hbs
---

# {{title}}

Device OS is low-level firmware code that supports a Particle device's basic functions. You can think of Device OS as the _operating system_ (OS) for Particle's embedded hardware.

Like an operating system for a computer, Particle Device OS provides a foundation for other applications to run on. More specifically, it enables _application firmware_ (the firmware you write) to run successfully by exposing the underlying behaviors of the device.


Particle Device OS abstracts much of the complexity away from the traditional firmware development experience. Some specific responsibilities of Device OS include:

- **Secure communication**: Ensuring that all communications between the device and the Particle cloud are authorized and encrypted
- **Hardware abstraction**: Providing a single, unified interface to the device, regardless of the underlying hardware architecture
- **Application enablement**: Exposing a feature-rich API that is used by developers to write applications for the device
- **Over-the-air updates**: Allowing rapid remote changes to code running on the device while providing resilience in poor connectivity environments

Unlike application firmware, Device OS is written and maintained primarily by the Particle team. This is a conscious decision meant to keep you focused on your particular use case without needing to understand the nuances of low-level device behaviors.

That being said, Particle's firmware repository is available as an open source project for those that want deep visibility into Device OS. To view the code and/or contribute, check out the [repo on GitHub](https://github.com/particle-iot/firmware).


## Versioning
New features, security patches, and bugfixes are introduced to new versions of Device OS regularly by the Particle team. These changes to Device OS are bundled into _releases_ that are versioned using [semantic versioning](http://semver.org/) best practices.

Device OS versions that are suffixed with `-rc.x` are called _prereleases_ ("rc" stands for release candidate). These prereleases contain the changes that will eventually become a default release, but still need more thorough usage and testing. We recommend that you **do not** flash prereleased firmware to your production units deployed in the field.

Each release is documented thoroughly to give you a comprehensive picture of what has changed in the new version. For a full list of Device OS releases and their descriptions, please check out [the release page on GitHub](https://github.com/particle-iot/firmware/releases) for the firmware repository.

## Firmware Modules

Particle firmware is split into modules: two or more modules for the
Device OS and one module for the application firmware.

Each module can be updated independently. This is why
over-the-air updates to the user application are so fast: you can update
only the user application module without having to update the Device OS
system modules.

## Firmware Dependencies

Application firmware that is written in the
[Web](https://build.particle.io) or
[Desktop](https://www.particle.io/products/development-tools/particle-desktop-ide)
IDEs are _compiled against_ a specific version of Device OS before
being sent to a device to run. That is, the Device OS acts as a
translator - taking the human-readable code you write and translating
into a binary that the device is able to run.

This creates a dependency that must be carefully managed.
Application firmware can only run on a device with the same or newer system
firmware version than the Device OS used to compile it.
This is because the application firmware may be using new
functionality that was not available in an older version of Device OS. Allowing
a new application to run with older Device OS might lead to a
crash.

For example, imagine a new firmware primitive was introduced in Device OS version `1.0.0`, `Particle.travelInTime()`. As an aspiring time traveler, you quickly add the new feature to your firmware logic and send the code off to be compiled and flashed to your Electron.

However, the Electron on your desk is running Device OS `0.9.0`, a version that predates the time travel functionality. Instructing the device to use the new firmware method in application firmware before it understands how to do so will of course not work. You can see how application firmware _depends on_ a compatible version of Device OS.

So what happens in these cases?

### Safe Mode
When booting up, the Particle device will check dependencies between the application and the Device OS. In the case of an incompatibility between the two, the device will automatically enter into [_safe mode_](/guide/getting-started/modes/#safe-mode) (breathing magenta). 

Safe mode allows the device to connect to the Particle cloud, but does not run application firmware. There are many uses for safe mode, but is particularly relevant when a device receives application firmware compiled against a newer version of Device OS than it currently is running. In this case, safe mode prevents the device from running the incompatible application firmware that will cause it to hard fault.

### Safe Mode Healer
_Safe mode healer_ takes things one step further, automatically
resolving Device OS incompatibilities when a device enters safe
mode. Because a device in safe mode still has network connectivity, it
is able to send an event to the Particle Device Cloud notifying it of the firmware mismatch.

From this event, the Particle Device Cloud determines the cause of the incompatibility and delivers to the device new Device OS over-the-air. When this happens, you'll see the device rapidly blinking magenta as it receives packets containing the new Device OS. When complete, the device will have what it needs to successfully run the application that was previously flashed.

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

You can also find this information in the Desktop IDE, in the bottom rail:

![Find Device OS in the Desktop IDE](/assets/images/system-fw-desktop-ide.png)

Note that you will need to be the owner of the device to have visibility into Device OS in the IDE. Now that we know the version of Device OS on the device, how can we update it to a different version?

### Updating remotely
For devices in which you do not have physical access, you have the ability to update Device OS over-the-air.

#### Flashing application firmware

One of the easiest and safest ways to update Device OS is to simply flash an application firmware that was compiled against a newer version of Device OS. The device will receive the incompatible firmware app, and use [safe mode healer](#safe-mode-healer) to automatically download the newer system modules.

**Note**: This method is not currently available for Electrons, unless the device has been added to a [product](https://docs.particle.io/guide/tools-and-features/console/#product-tools). This is meant to help you manage cellular data usage. For updating Device OS on Electrons, check out the methods for [updating locally](#updating-locally).

In the Web IDE, this can be done by using the _Device OS target_ dropdown, and choosing a version that is newer than what is currently on the device.

![Select newer version of Device OS in the IDE](/assets/images/system-fw-newer-ide.png)
<p class="caption">In this case, the app  will be compiled against <strong>0.7.0-rc.3</strong>, a prereleased Device OS version</p>

This can be just as easily accomplished using the Desktop IDE:

![Desktop IDE newer version of Device OS](/assets/images/system-fw-newer-desktop-ide.png)


Now, compile and flash the firmware by clicking on the flash (<i class="ion-flash"></i>) icon. Your device will receive the new application firmware and reboot. Then, it will automatically enter safe mode and trigger the cloud to resolve the incompatibility by sending it Device OS version 0.7.0-rc.3.

Sweet! You just updated the Device OS on your device.

There's a couple of things to note:

- This approach will also work for _product firmware_. When a product firmware binary is [released to a fleet](/guide/tools-and-features/console/#releasing-firmware), any device that receives it will enter into safe mode and heal itself by downloading the required Device OS
- This approach will trigger Device OS _upgrades_, but not _downgrades_. As mentioned earlier, Device OS is backwards compatible meaning that devices can successfully run application firmware compiled against an older version of Device OS than it currently is running

#### CLI (Remote)
You can also use the Particle CLI to remotely update a device's Device OS without changing the application firmware. This is a more advanced approach and requires some technical chops.

To do this, first visit the [Device OS releases page](https://github.com/particle-iot/firmware/releases) on GitHub and locate the version you'd like to send to a device.

When you find the desired release, scroll down to the **Downloads** section. Here you will find the Device OS binary files. Remember that these binaries are specific to a device type, and a complete Device OS is comprised of multiple parts. Hone in on the files that begin with `system-part`:

![Device OS binaries](/assets/images/system-fw-binaries-gh.png)
<p class="caption">Available downloads for the 0.7.0-rc.3 release</p>

Find the files relevant to your device (each binary is suffixed with the device type) and click to download them to your machine. Note that you'll only need to do this step once to store a copy of the binaries on your computer.

Next, you'll flash these files to a device using the `particle flash` command in the CLI. If you haven't already, you must [download the Particle CLI](/guide/tools-and-features/cli/photon/). Open up your Terminal and run the following commands to flash the system modules to a device:

```bash
particle flash YOUR_DEVICE_NAME_OR_ID path/to/system-part1.bin
particle flash YOUR_DEVICE_NAME_ID path/to/system-part2.bin
# Sometimes required
particle flash YOUR_DEVICE_NAME_ID path/to/system-part3.bin
```

*Use caution when using this method. Double check that you are flashing the correct binaries for the given device type, and that you flash all required system parts.*

### Updating locally
For devices in which you have physical access, there are also methods to update Device OS over-the-wire.

#### CLI (Local)
The Particle CLI offers two different methods of updating Device OS locally. Both require that the device is connected to your computer over USB.  If you haven't already, you must [download the Particle CLI](/guide/tools-and-features/cli/photon/) and ensure you are running version **1.24.1** or later. You can check with `particle --version`.

The first approach is to run [`particle update`](/reference/cli/#particle-update). Open up your Terminal and run the following command to flash the latest Device OS to a device:


```bash
# put the device in DFU mode first, then update the Device OS
$ particle update
> Your device is ready for a system update.
> This process should take about 30 seconds. Here goes!

! Device OS update successfully completed!

> Your device should now restart automatically.
```

Be sure to put the device in [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-) before running the command. Note that this will update your device to the _newest_ Device OS - it does not currently allow you to flash a different verrsion of firmware other than the latest. 

If you'd like to use the CLI to flash a Device OS version _other than the latest_, you can use the `particle flash` command in a similar way as [outlined above](#cli-remote-). The only difference will be that you'll pass an argument to tell the CLI to flash the files over USB, and you won't have to include the device name or ID in the command:

```bash
particle flash --usb path/to/system-part1.bin
particle flash --usb path/to/system-part2.bin
# Sometimes required
particle flash --usb path/to/system-part3.bin
```


#### Firmware Manger
The [Firmware Manager](/guide/tools-and-features/firmware-manager/) is a
desktop application that upgrades your device to the latest system
firmware. For Electrons, it provides an easy way to update Device OS while avoiding cellular data charges.

![Firmware Manager](/assets/images/updater-connected.png)
<p class="caption">The Firmware Manager is available for Windows and Mac</p>

Like the `particle update` command, the Firmware Manager updates your device to the _newest_ Device OS. For more information on this method, please check out the [firmware manager guide](/guide/tools-and-features/firmware-manager).
