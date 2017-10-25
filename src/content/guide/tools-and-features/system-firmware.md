---
word: System Firmware
title: System Firmware
order: 10
columns: two
layout: guide.hbs
---

# {{title}}

System firmware is low-level firmware code that supports a Particle device's basic functions. You can think of system firmware as the _operating system_ for Particle's embedded hardware.

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

## Managing System Firmware