---
title: Firmware introduction
columns: two
layout: commonTwo.hbs
description: Tips for writing Particle device software
---

# {{title}}

*Tips for writing Particle device firmware*

## Getting started

- If you are using the [Tracker One or Monitor One](/getting-started/hardware/tracking-system/) you may be able to use your device with no programming at all, as many features can be managed from the console.

- Install [Particle Workbench](/getting-started/developer-tools/workbench/). This is the preferred development environment for Particle device programming.

Particle devices are programming using C/C++, specifically gcc C++11, C++14, or C++17 depending on the version of Device OS you are targeting. If it's been a while since you've programmed in C/C++, there is a [language syntax overview](/reference/device-os/api/language-syntax/language-syntax/). Of course there are countless books and tutorials on the Internet as well.

The collection of calls to manage the features of the device including cloud features, hardware interfaces (serial, I2C, SPI), networking features, etc. are in the [Device OS API](/reference/device-os/api/introduction/getting-started/).

### Device firmware

Particle devices contain a base set of software:

- Bootloader, which handles starting up the device. This is where DFU mode (blinking yellow) is implemented, as well as the code to load Device OS.
- Device OS, which is the operating system of the device. This handles bringing up the base peripherals, networking interfaces, and makes sure that all of the required components are installed. If there are missing dependencies, the device will go into safe mode (breathing magenta) to upgrade the parts over-the-air.
- User firmware, the part that you typically program.
- Other parts depending on the device. Gen 3 devices include SoftDevice, which implements the nRF52 BLE radio stack. Argon and Tracker devices include NCP, the Wi-Fi network coprocessor image. 

Unlike a regular computer, Particle devices only run a single user application at a time. If your device needs to perform multiple functions you combine all of the necessary features into a single application. This application can be flashed over-the-air (cellular or Wi-Fi) or by USB. In many cases, you only need to flash the small user firmware and not all of Device OS, which speeds the update process and saves data when flashing over cellular.

Devices are intended to boot quickly, often within a second or two. On some devices the cellular network connection can remain active across a reboot, which allows the device to be reprogrammed or just rebooted with minimal disruption.

Tracker One and Tracker SoM devices typically include the [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/) user firmware reference application which supports the additional peripherals on this device. You can expand this to include your own functionality. Monitor One devices use the similar [Monitor Edge](/firmware/tracker-edge/monitor-edge-firmware/).

When you flash User application and Device OS in Particle Workbench, the bootloader and any other dependencies (SoftDevice, for example) are not flashed. You may need to upgrade these components OTA after flashing. A better option is to use [Device Restore over USB](/tools/device-restore/device-restore-usb/) to program the version you want first, to make sure all dependencies will be met.

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

---

### Asset OTA

Particle Asset OTA (available in Device OS 5.5.0 and later), allows users to include bundled assets in an OTA software update that can be delivered to other processors and components in your product. Bundled assets can be up to 1 MB to 1.5 MB in size, after compression, depending on platform and do not use additional data operations.

With this feature, your Particle device can not only update itself, but also update the components connected to it.

### Program structure

We recommend the following boilerplate for every user application:

```cpp
#include "Particle.h"

#ifndef SYSTEM_VERSION_v620
SYSTEM_THREAD(ENABLED); // System thread defaults to on in 6.2.0 and later and this line is not required
#endif
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

This is necessary for all .cpp files, but optional for .ino files. We recommend always using .cpp files, even for the main application source file. See [preprocessor](/reference/device-os/api/preprocessor/preprocessor/) for the specific differences between standard .cpp file and .ino files.

```cpp
SYSTEM_THREAD(ENABLED);
```

[Threaded mode](/reference/device-os/api/system-thread/system-thread/) should be used for all user applications. It tends to provide the most consistent behavior and all products created by Particle Studios use this mode. With Device OS {{systemThreadRequired}} and later, system thread is always enabled. For additional information, see [non-threaded system mode](/reference/discontinued/software/non-threaded-system-mode/).

```cpp
SYSTEM_MODE(SEMI_AUTOMATIC);
```

You can a [system mode](/reference/device-os/api/system-modes/system-modes/) of `SEMI_AUTOMATIC` or `AUTOMATIC`, but by using the combination of `SEMI_AUTOMATIC` and a call `Particle.connect()` in `setup()` you have a great deal of flexibility for managing the cloud connection.

```cpp
SerialLogHandler logHandler;
```

Using the [log handler](/reference/device-os/api/logging/logging/) is the recommended way of creating debugging output. 

```cpp
void setup() 
{
    Particle.connect();
}
```

When using `SEMI_AUTOMATIC` mode you need to add a call to [`Particle.connect()`](/reference/device-os/api/cloud-functions/particle-connect/), typically in `setup()`. This provides flexibility:

- If you need to perform operations before connecting, you can put them before `Particle.connect()`. This is safer than using [`STARTUP`](/reference/device-os/api/macros/startup/#startup-) blocks.

- On battery-powered cellular devices, you may want to check the [battery charge and skip connecting when the battery is low](/firmware/low-power/wake-publish-sleep-cellular/). This is particularly useful for devices that also have a solar charger, to avoid completely discharging the battery or failing to connect due to insufficient power.
 

```cpp
void loop() 
{
}
```

The loop() function is where you put your code. You should try to return as quickly as possible from the loop function. Typically the loop function is called 1000 times per second.


## General tips

### Use Log calls instead of Serial.print

In many older and Arduino examples, you you may see `Serial.print()`. It's better practice to use [`Log.info()`](/reference/device-os/api/logging/logger-class/) instead.

```cpp
Log.info("analogvalue=%d", analogvalue);
```

- Logging level for specific categories can be controlled at runtime.
- Device OS itself uses logging and can be configured this way.
- Allows redirection to other ports (such as a hardware UART), remote logging services (like Solarwinds Papertrail), SD cards, and many others. 
- Thread-safe, allowing logging safely from multiple threads.

See [Logging](/reference/device-os/api/logging/logging/) for more information.


### Memory fragmentation

Be careful when allocating large memory blocks on the heap using `new`, `malloc`, `strdup`, etc.. It's safe if you allocate the blocks once from setup(), but of you periodically allocate large blocks, especially of varying size, with varying lifetimes, as this can lead to heap fragmentation.

See [Fragmentation](/firmware/best-practices/code-size-tips/#fragmentation) in Code Size Tips for more information.

### Code size

Gen 2 devices including the Photon, P1, Electron, and E-Series have a 128 Kbyte (131,072 byte) flash memory sector for user code. Within the flash, there are a number of things including:

- Your compiled code
- String constants
- Variables initialized to values other than 0
- C++ template expansions
- Some overhead

Gen 3 devices (including the Argon, Boron, B-Series SoM, and Tracker) running Device OS 3.1 or later have 256 Kbyte user binaries (262,144 byte), double the space. Earlier versions of Device OS only supported 128K binaries like Gen 2. For more information, see [256K user binaries](/reference/device-os/256K-user-binaries/).

See [Code Size Tips](/firmware/best-practices/code-size-tips/#out-of-memory-handler) for a great deal of information about code size.

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

See [Stack](/firmware/best-practices/code-size-tips/#stack) in Code Size Tips for more information.

### Avoid blocking loop

You should avoid blocking loop. It's best to return from loop as often as possible instead of looping within `loop()` or using long `delay` calls.

See [Finite State Machines](/firmware/software-design/finite-state-machines/) for one technique to make this more manageable.


## Watch out for

Be sure to follow these rules carefully. If you are upgrading from older versions of Device OS (earlier than 1.4.0) and your code appeared to work correctly but does not when upgrading to newer versions of Device OS, one of these things could be the issue, as explained below.

### Failing to return a value

Failing to return a value from a function that is not `void` must be avoided.

```cpp
int functionHandler(String cmd) {
    // Not returning a value will cause a compile error, or crash, depending on Device OS version
}
```

In recent versions of Device OS, this generates a compile error:

```
src/TestApp.cpp: In function 'int functionHandler(String)':
src/TestApp.cpp:5:1: error: no return statement in function returning non-void [-Werror=return-type]
    5 | }
      | ^
```      

In some older versions, it generates a warning, but if there are no other errors in the file, warnings are not displayed with the cloud compilers, so it's easy to miss. Unfortunately, it also causes the device to SOS fault at runtime.

In very old versions of Device OS, it works, which can lead to the impression it's fine, and is a common reason code that worked with old versions of Device OS no longer works when upgraded.

```cpp
void sampleFunction() {
    // Is void, does not require a return value
}
```

### Global object constructors

```cpp
class MyClass {
public:
    MyClass() {
        // Constructor        
    }
};

MyClass myGlobalObject; // Global object

void setup() {
}

void loop() {
}
```

You must be careful in the constructors of global objects. In the code above, the class instance `myGlobalObject` of class `MyClass` is a global object. The class constructor is called very early in initialization, and, most dangerously, the order of the objects are constructed is undefined, and may vary in surprising ways. Newer versions of the gcc compiler tend to run the user constructors earlier, and this can cause code that previously just happen to work because of luck to crash at boot instead.

The only things you can do safely from the constructor are:

- Initialize variables
- Allocate memory
- Initialize pin modes (if absolutely necessary)

To do more complex initialization, you should to two-step initialization, which is also good practice when you are making objects that are possibly subclassed, anyway:

```cpp
SerialLogHandler logHandler;

class MyClass {
public:
    MyClass() {
        // Constructor        
    }

    void setup() {
        Log.info("safe to do things here!");
    }
};

MyClass myGlobalObject; // Global object

void setup() {
    myGlobalObject.setup();
}

void loop() {
}
```

In this example, complex parts of setup are deferred until `setup()` instead of being done at object construction time.

Another better alternative to global objects is often to use the [singleton pattern](/firmware/software-design/singleton/).

For more information see, [Global object constructors](/reference/device-os/api/global-object-constructors/global-object-constructors/).

### Mutex deadlock

You must be very careful when using [SINGLE_THREADED_BLOCK](/reference/device-os/api/system-thread/single_threaded_block/) and you should avoid using it except to surround very small blocks of code that use only simple operations such as manipulating variables (such as queues), `digitalWrite()`, and `delayMicroseconds()`. 

The reason is that many resources in Device OS are protected by mutexes. This includes things like SPI, I2C, the cellular modem, and logging. This is necessary so only a single thread can access the resource at time, but code that does not need that resource can continue to execute normally, and threads can swap as needed.

If you attempt to acquire a lock on a resource from inside a `SINGLE_THREADED_BLOCK` that is currently in use by another thread, the device will **deadlock**. Your thread will not proceed, because the resource is locked. However, since you have disabled thread switching because you used `SINGLE_THREADED_BLOCK`, the resource lock can never be freed, because the other thread cannot be swapped in.

In old versions of Device OS, some resources like SPI were not protected. This caused failures when the system thread and user thread attempted to access SPI at the same time. The solution is use a mutex, but if you have code that previously used SPI from a `SINGLE_THREADED_BLOCK`, which does not actually solve the simultaneous access issue, it would fail with newer versions of Device OS by deadlocking.

For more information about mutexes, see the [threading explainer](/firmware/software-design/threading-explainer/#using-a-mutex-with-an-oled-display).

### SPI transactions

You should always use SPI `beginTransaction` and `endTransaction` surrounding all operations on the SPI bus:

- Transactions prevent multiple threads from trying to use the SPI bus at the same time
- Transactions set the speed, byte order, and mode before each use allowing multiple devices on the same bus to have different settings safely
- You should set the CS pin low after `beginTransaction` and restore it high before `endTransaction`

Note that not all libraries that interact with SPI peripherals use transactions, but they should. If the library does not, it should be modified to use transactions.

Prior to Ethernet on Gen 3 devices (Argon, Boron), the system thread never accessed `SPI`, so the lack of locking was less noticeable. You should still use locking, even if you are not using Ethernet.

For more information, see [beginTransaction](/reference/device-os/api/spi/begintransaction/) in the Device OS firmware API reference.

### I2C locking

Similar to SPI locking, you should use `Wire.lock` and `Wire.unlock` around groups of I2C operations. For example, it's common to write a command code by I2C, then read the results in a separate operation. The entire operation should be surrounded by a lock/unlock pair, to prevent another thread from jumping in between the command and result.

This is especially important on the B-Series SoM if the PMIC and fuel gauge are on `Wire` as these can be read by the system thread.

For more information, see [Wire.lock](/reference/device-os/api/wire-i2c/lock/) in the Device OS firmware API reference.

### Software timers

Beware when using [Software Timers](/reference/device-os/api/software-timers/software-timers/). You should:

- Avoid performing lengthy operations from a timer callback as all timers execute from a single thread and other timers will not fire while one is already executing.
- When possible set a flag and perform complex operations from `loop()` instead.
- Avoid blocking operations like `Particle.publish()` from timers.
- Timers run from a thread with a small stack (1024 bytes).

In many cases, it may be better to trigger periodic operations from the `millis()` counter instead of using software timers.

### Interrupt service routines

Interrupt service routines (ISR) are bits of code that run in an interrupt context. They literally interrupt the execution of the current thread, which could be the application thread, system thread, timer thread, or worker thread. Because of this, you need to be very careful in ISRs there are strict limits of what you can safely call from an ISR:

- No memory allocation (`new`, `malloc`, `strdup`, etc.).
- No Particle primitives like `Particle.publish`.
- No `Cellular`, `Wifi`, `TCPClient`, `TCPServer`, `UDP`, etc..
- No mutex locks, including things that also lock like SPI transactions.
- No queue calls except [`os_queue_put`](/firmware/software-design/threading-explainer/#queue-functions) which is ISR safe
- Basically assume that all Device OS functions are unsafe, unless specifically listed as safe.

A few of the locations that are interrupt service routines:

- [attachInterrupt()](/reference/device-os/api/interrupts/attachinterrupt/) handlers.
- [SPI onSelect()](/reference/device-os/api/spi/onselect/) handlers.
- [system button](/reference/device-os/api/system-events/system-events-overview/) handlers.
- [SparkIntervalTimer](/reference/device-os/libraries/s/SparkIntervalTimer/) library timer callbacks.

A few of the locations that are **not** ISRs:

- [Software timers](/reference/device-os/api/software-timers/software-timers/) but they run with a small stack (1024 bytes).
- [Function handlers](/reference/device-os/api/cloud-functions/particle-function/) are called from the loop thread.
- [Calculated variable handlers](/reference/device-os/api/cloud-functions/particle-variable-calculated/) are called from the loop thread.
- [Subscription handlers](/reference/device-os/api/cloud-functions/particle-subscribe/) are called from the loop thread, however you cannot `Particle.publish` from a subscription handler.
- [Serial events](/reference/device-os/api/serial/serialevent/) are called from the loop thread.
- [Application watchdog callback](/reference/device-os/api/watchdog-application/watchdog-application/) but the device is probably unstable when it is called.

In old versions of Device OS, allocating memory from an ISR would proceed, except randomly corrupt memory, often causing the device to crash later for completely unrelated reasons. Newer versions of Device OS will panic immediately, which makes it seem like code that previously worked no longer works on newer versions of Device OS, but really this is an improvement over randomly failing later.

For more information, see [Interrupts](/reference/device-os/api/interrupts/interrupts/) in the Device OS firmware API reference.

### Exceptions

Exceptions are not enabled on Particle devices, and throwing an exception causes an Exit fault (SOS+7). 

Beware of some Standard C++ library classes that can throw exceptions. std::string, std::vector, std::stoi, std::stof, among others, can throw exceptions in certain cases.

### Accessing invalid memory

Using an invalid pointer from memory that has been corrupted, using a deleted pointer, etc. can cause unexpected behavior. 

It can also cause a hard fault (SOS+1) if it attempts to access an invalid memory address. It can also cause a secure fault (SOS+15) if user firmware attempts to access secure memory areas, which it is not allowed to do.

### Out of memory handler

When a heap allocation such as `new`, `malloc`, `strdup`, etc. fails, the out of memory handler is called, then the allocation returns null, as exceptions are not enabled on Particle devices.

Using an out of memory handler, you can flag this situation, then from loop, you can reset the device. This is not the default behavior in Device OS, because in some cases you may want to continue execution, free some memory in an application-specific manner, or use other techniques to resolve the situation.

See [out of memory handler](/firmware/best-practices/code-size-tips/#out-of-memory-handler) in Code Size Tips for more information.



