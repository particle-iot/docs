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

When you flash User application and Device OS in Particle Workbench, the bootloader and any other dependencies (Softdevice, for example) are not flashed. You may need to upgrade these components OTA after flashing. A better option is to use [Device Restore over USB](/tools/device-programming/device-restore-usb/) to program the version you want first, to make sure all dependencies will be met.

---

{{collapse op="start" label="More bootloader trivia"}}
DCT operations such as those dealing with the device public and private keys, aren't actually implemented in the bootloader since Device OS 0.7.0. They're implemented in Device OS, so you need to have a working copy of Device OS in order to use those functions.

All Gen 2 (STM32) and Gen 3 (nRF52) devices uses execute-in-place (XIP) to run all code directly from flash memory; it is not copied into RAM. This is the reason you can't upgrade the bootloader directly in DFU mode. Since DFU mode is run from the bootloader, the running code cannot be replaced while it's running. 

However it is possible upgrade the bootloader by DFU by copying it into the OTA sectors, setting a flag in the DCT, and rebooting the device. This is how `particle update` in the Particle CLI and Device Restore over USB work. 

The reason you can flash the bootloader in `--serial` mode (listening mode, blinking dark blue), is that Device OS is running at that point and the bootloader can be replaced because the bootloader is not longer running after Device OS boots.

You can also upgrade the bootloader by SWD/JTAG because the debugger has direct access to the flash and nothing is running on the MCU.

On Gen 2 devices, SWD/JTAG is only enabled by default in the bootloader. Compile-time flags and a local build (typically a monolithic debug build) can keep it running, however this takes over most of the D GPIO pins (D6 and D7 for SWD, and D3 - D7 for JTAG).

Some very old versions of Device OS on the Photon and P1 included a copy of the bootloader in the system parts. The techniques above are used instead in current versions of Device OS.
{{collapse op="end"}}


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

The loop() function is where you put your code. You should try to return as quickly as possible from the loop function. Typically the loop function is called 1000 times per second.


## General tips

### Use Log calls instead of Serial.print

See [Logging](/cards/firmware/logging/logging/) for more information.


### Memory fragmentation

See [Fragmentation](/datasheets/app-notes/an040-code-size-tips/#fragmentation) in Code Size Tips for more information.

### Code size

Gen 2 devices including the Photon, P1, Electron, and E Series have a 128 Kbyte (131,072 byte) flash memory sector for user code. Within the flash, there are a number of things including:

- Your compiled code
- String constants
- Variables initialized to values other than 0
- C++ template expansions
- Some overhead

Gen 3 devices (including the Argon, Boron, B Series SoM, and Tracker) running Device OS 3.1 or later have 256 Kbyte user binaries (262,144 byte), double the space. Earlier versions of Device OS only supported 128K binaries like Gen 2. For more information, see [256K user binaries](/datasheets/app-notes/an033-256K-user-binaries/).

See [Code Size Tips](/datasheets/app-notes/an040-code-size-tips/#out-of-memory-handler) for a great deal of information about code size.

### Stack size

The stack on Particle devices is quite small:

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

This means you should be careful with:

- Allocating buffers on the stack
- Deep recursion
- Member variables in C++ classes that may be allocated on the stack


```cpp
void setup() {
    Serial.begin();
}

void loop() {
    char buf[256]; // <- stack allocated

    // Using an uninitialized variable here, don't do this!
    Serial.printlnf("buf[0]=%d", buf[0]); 
    delay(1000);
}
```

This is a stack allocated variable. It's small enough to be safe from loop.

```cpp
char buf[256]; // <- global static allocation

void setup() {
    Serial.begin();
}

void loop() {    
    Serial.printlnf("buf[0]=%d", buf[0]);
    delay(1000);
}
```

This is a global memory allocation, done statically at compile time. This is the recommended way to handle buffers that are used periodically during execution.

See [Stack](/datasheets/app-notes/an040-code-size-tips/#stack) in Code Size Tips for more information.

### Avoid blocking loop

### Periodic events (timers)


## Watch out for

Be sure to follow these rules carefully. If you are upgrading from older versions of Device OS (earlier than 1.4.0) and your code appeared to work correctly but does not when upgrading to newer versions of Device OS, one of these things could be the issue, as explained below.

### Failing to return a value

### Global constructors

For more information see, [Global object constructors](/cards/firmware/global-object-constructors/global-object-constructors/).

### Interrupt service routines

For more information, see [Interrupts](/cards/firmware/interrupts/interrupts/) in the Device OS firmware API reference.

### Mutex deadlock

For more information about mutexes, see the [threading explainer](/datasheets/app-notes/an005-threading-explainer/#using-a-mutex-with-an-oled-display).

### SPI transactions

For more information, see [beginTransaction](/cards/firmware/spi/begintransaction/) in the Device OS firmware API reference.

### I2C locking

For more information, see [Wire.lock](/cards/firmware/wire-i2c/lock/) in the Device OS firmware API reference.

### Out of memory handler

When a heap allocation such as `new`, `malloc`, `strdup`, etc. fails, the out of memory handler is called, then the allocation returns null, as exceptions are not enabled on Particle devices.

Using an out of memory handler, you can flag this situation, then from loop, you can reset the device. This is not the default behavior in Device OS, because in some cases you may want to continue execution, free some memory in an application-specific manner, or use other techniques to resolve the situation.

See [out of memory handler](/datasheets/app-notes/an040-code-size-tips/#out-of-memory-handler) for more information.



