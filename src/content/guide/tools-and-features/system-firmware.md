---
word: System Firmware
title: System Firmware
order: 10
columns: two
layout: guide.hbs
---

# {{title}}

System firmware is low-level firmware code that supports a Particle device's basic functions. You can think of system firmware as the _operating system_ (OS) for Particle's embedded hardware.

Like an operating system for a computer, Particle system firmware provides a foundation for other applications to run on. More specifically, it enables _application firmware_ (the firmware you write) to run successfully by exposing the underlying behaviors of the device. 


Particle system firmware abstracts much of the complexity away from the traditional firmware development experience. Some specific responsibilities of system firmware include:

- **Secure communication**: Ensuring that all communications between the device and the Particle cloud are authorized and encrypted
- **Hardware abstraction**: Providing a single, unified interface to the device, regardless of the underlying hardware architecture
- **Application enablement**: Exposing a feature-rich API that is used by developers to write applications for the device
- **Over-the-air updates**: Allowing rapid remote changes to code running on the device while providing resilience in poor connectivity environments, ensuring your device is never bricked

Unlike application firmware, system firmware is written and maintained primarily by the Particle team. This is a conscious decision meant to keep you focused on your particular use case without needing to understand the nuances of low-level device behaviors.

That being said, Particle's firmware repository is available as an open source project for those that want deep visibility into system firmware. To view the code and/or contribute, check out the [repo on GitHub](https://github.com/spark/firmware).


## Versioning
New features, security patches, and bugfixes are introduced to new versions of system firmware regularly by the Particle team. These changes to system firmware are bundled into _releases_ that are versioned using [semantic versioning](http://semver.org/) best practices.

System firmware versions that are suffixed with `-rc.x` are called _prereleases_ ("rc" stands for release candidate). These prereleases contain the changes that will eventually become a default release, but still need more thorough usage and testing. We recommend that you **do not** flash prereleased firmware to your production units deployed in the field.

Each release is documented thoroughly to give you a comprehensive picture of what has changed in the new version. For a full list of system firmware releases and their descriptions, please check out [the release page on GitHub](https://github.com/spark/firmware/releases) for the firmware repository.

## Firmware Dependencies
Recall from the introduction of this guide that system firmware provides a foundation for the application firmware that you write to run. As such, it is important to understand the tight coupling between application and system firmware.

Application firmware that is written in the [Web](https://build.particle.io) or [Desktop](https://www.particle.io/products/development-tools/particle-desktop-ide) IDEs are _compiled against_ a specific version of system firmware before being sent to a device to run. That is, the system firmware acts as a translator - taking the human-readable code you write using the firmware API and translating into machine-executable code that the device can run.

This creates a dependency that must be carefully managed. For example, imagine a new firmware primitive was introduced in system firmware version `1.0.0`, `Particle.travelInTime()`. As an aspiring time traveler, you quickly add the new feature to your firmware logic and send the code off to be compiled and flashed to your Electron.

However, the Electron on your desk is running system firmware `0.9.0`, a version that predates the time travel functionality. Instructing the device to use the new firmware method in application firmware before it understands how to do so will of course not work. You can see how application firmware _depends on_ a compatible version of system firmware.

So what happens in these cases?

### Safe Mode
When booting up, the Particle device will check dependencies between the application and the system firmware. In the case of an incompatibility between the two, the device will automatically enter into [_safe mode_](/guide/getting-started/modes/#safe-mode) (breathing magenta). 

Safe mode allows the device to connect to the Particle cloud, but does not run application firmware. There are many uses for safe mode, but is particularly relevant when a device receives application firmware compiled against a newer version of system firmware than it currently is running. In this case, safe mode prevents the device from running the incompatible application firmware that will cause it to hard fault.

### Safe Mode Healer
_Safe mode healer_ takes things one step further, automatically resolving system firmware incompatibilities when a device enters safe mode. Because a device in safe mode still has network connectivity, it is able to send an event to the Particle Cloud notifying it of the firmware mismatch.

From this event, the Particle Cloud determines the cause of the incompatibility and delivers to the device new system firmware over-the-air. When this happens, you'll see the device rapidly blinking magenta as it receives packets containing the new system firmware. When complete, the device will have what it needs to successfully run the application that was previously flashed.

The combination of safe mode and safe mode healer provides you confidence when flashing new application firmwares to devices. Regardless of the version of system firmware the app was compiled against, the Particle Cloud will ensure the device has what it needs to run it without issue.

A couple of important notes:

- System firmware versions are _backwards compatible_. That is, you can flash an app compiled against an older version of system firmware to the device without the device entering into safe mode. The device will not be automatically downgraded to the older version of system firmware
- System firmware is _modular_ and contains multiple parts. That is, your device will receive 2 or more binary files when getting a system firmware update. When receiving system modules via safe mode healer, the device will reset between each binary flashed to it