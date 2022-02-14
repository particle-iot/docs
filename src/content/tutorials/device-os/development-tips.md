---
title: Development tips
columns: two
layout: commonTwo.hbs
description: Tips for writing Particle device software
---

# {{title}}

*Tips for writing Particle device software*

## Getting started

- If you are using the [Tracker One](/tutorials/asset-tracking/introduction/) you may be able to use your device with no programming at all, as many features can be managed from the console.

- Install [Particle Workbench](/tutorials/developer-tools/workbench/). This is the preferred development environment for Particle device programming.

Particle devices are programming using C/C++, specifically gcc C++11, C++14, or C++17 depending on the version of Device OS you are targeting. If it's been a while since you've programmed in C/C++, there is a [language syntax overview](/cards/firmware/language-syntax/language-syntax/). Of course there are countless books and tutorials on the Internet as well.

The collection of calls to manage the features of the device including cloud features, hardware interfaces (serial, I2C, SPI), networking features, etc. are in the [Device OS API](/cards/firmware/introduction/introduction/).

### Device firmware

Particle devices contain a base set of software:

- Bootloader, which handles starting up the device. This is where DFU mode (blinking yellow) is implemented, as well as the code to load Device OS.
- Device OS, which is the operating system of the device. This handles bringing up the base peripherals, networking interfaces, and makes sure that all of the required components are installed. If there are missing dependencies, the device will go into safe mode (breathing magenta) to upgrade the parts over-the-air.
- User firmware, the part that you typically program. From the factory, the Tinker application is installed which allows simple control of the device over the cloud, but doesn't really do anything useful.
- Other parts depending on the device. Gen 3 devices include SoftDevice, which implements the nRF52 BLE radio stack. Argon and Tracker devices include NCP, the Wi-Fi network coprocessor image. 

Unlike a regular computer, Particle devices only run a single user application at a time. If your device needs to perform multiple functions you combine all of the necessary features into a single application. This application can be flashed over-the-air (cellular or Wi-Fi) or by USB. In many cases, you only need to flash the small user firmware and not all of Device OS, which speeds the update process and saves data when flashing over cellular.

Devices are intended to boot quickly, often within a second or two. On some devices the cellular network connection can remain active across a reboot, which allows the device to be reprogrammed or just rebooted with minimal disruption.

Tracker One and Tracker SoM also typically include the [Tracker Edge](/tutorials/asset-tracking/tracker-edge-firmware/) base reference application which supports the additional peripherals on this device. You can expand this to include your own functionality.

### Program structure

We recommend the following boilerplate for every user application:

```cpp
#include "Particle.h"

SYSTEM_THREAD(ENABLED);
SYSTEM_MODE(SEMI_AUTOMATIC);

SerialLogHandler logHandler;

void setup() 
{
    Particle.connect();
}

void loop() 
{
}
```

Breaking this down:

```cpp
#include "Particle.h"
```

This is necessary for all .cpp files, but optional for .ino files. We recommend always using .cpp files, even for the main application source file. See [preprocessor](/cards/firmware/preprocessor/preprocessor/) for the specific differences between standard .cpp file and .ino files.

```cpp
SYSTEM_THREAD(ENABLED);
```

[Threaded mode](/cards/firmware/system-thread/system-thread/) should be used for all user applications. It tends to provide the most consistent behavior and all products created by Particle Studios use this mode.

```cpp
SYSTEM_MODE(SEMI_AUTOMATIC);
```

You can a [system mode](/cards/firmware/system-modes/system-modes/) of `SEMI_AUTOMATIC` or `AUTOMATIC`, but by using the combination of `SEMI_AUTOMATIC` and a call `Particle.connect()` in `setup()` you have a great deal of flexibility for managing the cloud connection.

```cpp
SerialLogHandler logHandler;
```

Using the [log handler](/cards/firmware/logging/logging/) is the recommended way of creating debugging output. 

```cpp
void setup() 
{
    Particle.connect();
}
```

When using `SEMI_AUTOMATIC` mode you need to add a call to [`Particle.connect()`](/cards/firmware/cloud-functions/particle-connect/), typically in `setup()`. This provides flexibility:

- If you need to perform operations before connecting, you can put them before `Particle.connect()`. This is safer than using [`STARTUP`](/cards/firmware/macros/startup/#startup-) blocks.

- On battery-powered cellular devices, you may want to check the [battery charge and skip connecting when the battery is low](/datasheets/app-notes/an029-wake-publish-sleep-cellular/). This is particularly useful for devices that also have a solar charger, to avoid completely discharging the battery or failing to connect due to insufficient power.
 

```cpp
void loop() 
{
}
```

The loop() function is where you put your code.


## General tips

### Use Log calls instead of Serial.print

### Memory fragmentation

### Code size

### Stack size

### Avoid blocking loop

### Periodic events (timers)


## Watch out for

Be sure to follow these rules carefully. If you are upgrading from older versions of Device OS (earlier than 1.4.0) and your code appeared to work correctly but does not when upgrading to newer versions of Device OS, one of these things could be the issue, as explained below.

### Failing to return a value

### Global constructors

### Interrupt service routines

### Mutex deadlock

### SPI transactions

### I2C transactions



