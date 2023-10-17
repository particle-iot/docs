---
title: Firmware template
columns: two
layout: commonTwo.hbs
description: Firmware template
---

# {{title}}

The project template is what is created when you use **Particle: Create new project** in Particle Workbench, or `particle project create` with the Particle CLI. It's a good starting point to creating your own firmware.

## Project overview

### src directory

This will contain your source code and header files. The template includes a single file `project.cpp` but you can add more files.

{{collapse op="start" label="Tell me more!"}}

- Some projects ported from Arduino will use `.ino` files. You can have one ino file in your `src` directory, but we recommend using `.cpp` files instead. For information on the differences between ino and cpp files, see [preprocessor](/reference/device-os/api/preprocessor/preprocessor/).

- It's recommended that filenames only contain letters (A-Z and a-z), numbers (0-9), period (`.`), underscore (`_`), and dash (`-`). Spaces are not allowed, and other characters such as accented characters may cause problems. Filenames in the cloud compilers are case-sensitive!

- You cannot rename the `src` directory. 

- Source and headers can only be in `src` or in certain subdirectories of `lib`. You cannot use directories that are peers to `src`.

{{collapse op="end"}}


### lib directory

Firmware libraries provide additional functionality, such as interfaces to sensors, displays, algorithms, etc..

Most libraries are community written and supported and you can search the list from [library search](/reference/device-os/libraries/search/).

#### Workbench - Adding libraries

To add a library to your project from Workbench, use **Particle: Install library** from the command palette.

#### CLI - Adding libraries

To add a library to your project using the Particle CLI:

- `cd` into your project directory if you have not already done so
- `particle library add <libraryname>`

#### Pseudo-libraries

In addition to community libraries, you can use [Workbench pseudo-libraries](/getting-started/device-os/firmware-libraries/#workbench-pseudo-libraries) to:

- Share code across multiple projects.
- Isolate code into more management sections.
- Work with a modified version of a community library.

### project.properties

This file serves a few purposes:

- It marks the top level of your project directory and signifies that it is a Particle project in Workbench. This is necessary because Workbench supports multiple C/C++ development environments at the same time.
- It lists all of the community libraries that have been added and their versions.
- For public projects it includes author and license information.

There are other files such as `particle.ignore`. For more information see [project file structure](/getting-started/device-os/firmware-libraries/#project-file-structure).

### .github/workflows

[Github actions](/firmware/best-practices/github-actions/) is a CI/CD (continuous integration/continuous deployment) solution that is easy to integrate with the Particle platform. This can provide checks to make sure the source you commit can be compiled, and also provides the ability to deploy source, and to upload binaries to a product.

## Source details

This include statement is required in all `.cpp` files. It's not required in `.ino` files so you won't see it in all example code, but it doesn't hurt to include it everywhere. It provides the definitions needed for the [Particle Device OS API](/reference/device-os/api/introduction/getting-started/).

```cpp
#include "Particle.h"
```

These two statements control how the cloud connection is managed, and whether threading is enabled. 

Using `AUTOMATIC` or `SEMI_AUTOMATIC` system mode is recommended in most cases. See [system modes](/reference/device-os/api/system-modes/system-modes/) for more information.

System threading should always be enabled. See [system threading](/reference/device-os/api/system-thread/system-thread/) for more information.

```cpp
SYSTEM_MODE(AUTOMATIC);
SYSTEM_THREAD(ENABLED);
```

This statement is recommended to enable logging to USB serial debug. You can view these messages using **Particle: Serial Monitor** in Workbench or `particle serial monitor` in the Paricle CLI.

For more information, see [USB serial debugging](/firmware/best-practices/usb-serial/).

```cpp
SerialLogHandler logHandler(LOG_LEVEL_INFO);
```

The `setup()` function is called once when your device boots, and also when waking from `HIBERNATE` sleep mode. You can put initialization code in this function.

```cpp
void setup() {
  // Put initialization like pinMode and begin functions here
}
```

The `loop()` function is called continuously in most cases. You will typically your code in this function. You should try to return from loop as often as possible. Avoid having lenthy loops within loop() as it can cause unexpected behavior.

{{collapse op="start" label="Tell me more!"}}

- If you do not enable system threading and do not specify a system mode other than AUTOMATIC, `loop()` will only run when cloud connected! This is often not desirable, and is one of the reasons threading is recommended.

- Avoid lengthy calls to `delay()` within loop.

{{collapse op="end"}}

```cpp
void loop() {
  // The core of your code will likely live here.

  // Example: Publish event to cloud every 10 seconds. Uncomment the next 3 lines to try it!
  // Logging.info("Sending Hello World to the cloud!");
  // Particle.publish("Hello world!");
  // delay( 10 * 1000 ); // milliseconds and blocking - see docs for more info!
}
```

This bit of code is commented out in the template, but you can uncomment it to test publishing to the Particle cloud using [`Particle.publish()`](/reference/device-os/api/cloud-functions/particle-publish/).

```cpp
// Example: Publish event to cloud every 10 seconds. Uncomment the next 3 lines to try it!
// Logging.info("Sending Hello World to the cloud!");
// Particle.publish("Hello world!");
// delay( 10 * 1000 ); // milliseconds and blocking - see docs for more info!
```

## Compiling your project

### Workbench

Use **Particle: Configure Workspace for Device** to select which device you want to work with.

Use local or cloud build options, such as **Particle: Cloud Flash** to compile and flash your device.

See the [Workbench documentation](/getting-started/developer-tools/workbench/#cloud-build-and-flash) for more information.

### CLI

Using the Particle CLI from a Terminal or Command Prompt window, `cd` into the directory containing this source. You should be in the directory containing the `project.properties` file.

Use the [`particle compile`](/reference/developer-tools/cli/#particle-compile) to generate a .bin (or .zip if you are using Asset OTA) file. Often you will use a command like:

```
particle compile boron . --saveTo firmware.bin
```

- This compiles for the boron platform. Other valid values can be found using `particle compile --help`.
- Note the period `.` by itself, separated by spaces. This means build the current directory and its subdirectories.
- `--saveTo firmware.bin` is optional, and specifies the filename to save the binary to.


Or use the [`particle flash`](/reference/developer-tools/cli/#particle-flash) command to compile and flash to a device.

```
particle flash my-device-name .
```

- Replace `my-devce-name` with the name or Device ID (24 character hex) of your device.
- Note the period `.` by itself, separated by spaces. This means build the current directory and its subdirectories.

