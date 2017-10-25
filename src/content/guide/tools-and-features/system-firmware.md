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


## Versioning
New features, security patches, and bugfixes are introduced to new versions of system firmware regularly by the Particle team. Due to the interdependence between application and system firmware, Particle system firmware is released using [semantic versioning](http://semver.org/).