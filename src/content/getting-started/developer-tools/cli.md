---
word: CLI
title: Command Line
columns: two
redirects: true
layout: commonTwo.hbs
description: Command line interface for managing your Particle devices for Windows, Mac OS, and Linux
---

# Particle CLI

The Particle CLI is a powerful tool for interacting with your devices
and the Particle Device Cloud.  The CLI uses [Node.js](https://nodejs.org/) and can easily run on Windows, Mac OS (OS X), and Linux.  It's also [open source](https://github.com/particle-iot/particle-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/about-pull-requests/) if you want to share!

{{!-- BEGIN shared-blurb 5c2a6fdf-e4c6-4dad-b4dd-ea7eed0ced53 --}}

## Installing

### Using Mac OS or Linux

The easiest way to install the CLI is to open a Terminal and type:

```sh
bash <( curl -sL https://particle.io/install-cli )
```

This command downloads the `particle` command to your home directory at `~/bin`.

### Using Windows

Download the [Windows CLI Installer](https://binaries.particle.io/particle-cli/installer/win32/ParticleCLISetup.exe ) and run it to install the Particle CLI. The Windows CLI installer is self-contained and can be run on a computer without Internet access, however CLI commands that interact with the Particle clould will of course need Internet access.

The CLI is installed to `%LOCALAPPDATA%\particle` (`C:\Users\username\AppData\Local\particle` for Windows in English).

{{!-- END shared-blurb --}}


### Upgrading to the latest version

If you installed the Particle CLI through the installer, it will periodically update itself to the latest version.

To force it to update, run the installer script again or enter this command:

```sh
$ particle update-cli
```

#### Disabling automatic updates

If you wish to prevent automatic updates from occurring you can do so with the following command. This might be appropriate on an assembly line where you want to keep the configuration and binaries constant, however in general we recommend always using the current version.

```sh
$ particle update-cli --disable-updates
```

#### Reenabling automatic updates

To resume updates and update if necessary now:

```sh
$ particle update-cli --enable-updates
```

#### Installing a specific version

```sh
$ particle update-cli --version <version>
```

<version> can be any version 3.23.0 or later. This also disables automatic updates. 

For more information about installing a specific version, see [specific CLI version](/troubleshooting/guides/build-tools-troubleshooting/specific-cli-version/).


## Getting started

These next two commands are all you need to get started setting up an account, claiming a device, and discovering new features.


### particle help

  Shows you what commands are available and how to use them.  You can also give the name of a command for detailed help.

```sh
# how to get help
$ particle help
$ particle help keys
```

## Flashing using serial (listening mode)

We recommend that you use DFU mode (blinking yellow) with `particle flash --local` instead of listening mode (blinking dark blue).

In the long-ago past the CLI did not install drivers for DFU mode, so `--serial` mode was sometimes easier. However, listening mode does not communicate errors well, and also is subject to interference from user application firmware, and is no longer recommended.

{{collapse op="start" label="Show older technique using --serial mode"}}

If you're wanting to save data on your Electron you should definitely consider flashing your Electron over
USB instead of OTA (over-the-air).

Assuming you've compiled and downloaded the firmware binary from the [Web IDE](https://build.particle.io) by clicking the cloud button next to the file name, you should
be able to use the Particle CLI, mentioned above, to flash your application firmware to your Electron *without using data.*

Steps:
- **1:** Put the Electron in to [DFU mode](/tutorials/device-os/led/electron/#dfu-mode-device-firmware-upgrade-) (blinking yellow).
- **2:** Open a command prompt or terminal window.
- **3:** Navigate to the folder where you've downloaded the `firmware.bin` file.
- **4:** From the CLI issue `particle flash --local firmware.bin`

```sh
# How to flash an Electron over USB
$ particle flash --local firmware.bin
```

*Note*: If your Electron goes into [safe
mode](/tutorials/device-os/led/electron/#safe-mode) blinking magenta you should put the Electron back into DFU mode (blinking yellow) and do:

```
$ particle update
```
{{collapse op="end"}}


## Blink an LED with Tinker

If you're just opening a new device, chances are it's already loaded with Tinker, the app we load at the factory.  If you don't have Tinker, or if you've been using the build IDE already, let's load it quickly by typing:

```sh
# How to re-load tinker onto a device
$ particle flash my_new_device_name tinker
Including:
/usr/local/lib/node_modules/particle-cli/binaries/particle_tinker.bin
attempting to flash firmware to your device my_new_device_name
flash device said  {"id":"0123456789abcdef78901234","status":"Update started"}
```

Let's make sure your device is online and loaded with Tinker.  We should see the four characteristic functions exposed by Tinker, "digitalWrite", "digitalRead", "analogWrite", and "analogRead".

```sh
# how to show all your devices and their functions and variables
$ particle list

Checking with the cloud...
Retrieving devices... (this might take a few seconds)
my_device_name (0123456789abcdef78901234) 0 variables, and 4 functions
  Functions:
    int digitalread(String args)
    int digitalwrite(String args)
    int analogread(String args)
    int analogwrite(String args)

```

Let's try turning on the LED attached to pin D7 on your device.

```sh
# how to call a function on your device
$ particle call my_device_name digitalwrite D7,HIGH
1
$ particle call my_device_name digitalwrite D7,LOW
1
```

Nice!  You should have seen the small blue LED turn on, and then off.


## Update your device remotely

You can write whole apps and flash them remotely from the command line just as you would from the build IDE.  Let's write a small blink sketch to try it out.

Copy and paste the following program into a file called blinky.ino

```ino
// Copy me to blinky.ino
#define PIN D7
int state = 0;

void setup() {
    //tell the device we want to write to this pin
    pinMode(PIN, OUTPUT);
}
void loop() {
    //alternate the PIN between high and low
    digitalWrite(PIN, (state) ? HIGH : LOW);

    //invert the state
    state = !state;

    //wait half a second
    delay(500);
}
```


Then let's compile that program to make sure it's valid code.  The CLI will automatically download the compiled binary of your program if everything went well.


```sh
# how to compile a program without flashing to your device
$ particle compile boron blinky.ino
Including:
blinky.ino
attempting to compile firmware
pushing file: blinky.ino
grabbing binary from: https://api.particle.io/v1/binaries/01234567890ABCDEFGH
saved firmware to firmware_123456781234.bin
Compiled firmware downloaded.
```

Replace boron with the type of device you have:

{{!-- BEGIN shared-blurb 866d92e9-015e-457e-b34a-367d8a73f443 --}}
  - `p2` (also Photon 2)
  - `boron`
  - `argon`
  - `bsom` (B-Series SoM, 4xx)
  - `b5som` (B-Series SoM, 5xx)
  - `tracker`
  - `photon`
  - `p1`
  - `electron` (also E-Series)
{{!-- END shared-blurb --}}

Now that we have a valid program, let's flash it to our device!  We can use either the source code again, or we can send our binary.

```sh
# how to flash a program to your device (from source code)
$ particle flash my_device_name blinky.ino

# OR - how to flash a pre-compiled binary to your device
$ particle flash my_device_name firmware_123456781234.bin
Including:
firmware_123456781234.bin
attempting to flash firmware to your device my_device_name
flash device said  {"id":"01234567890ABCDEFGH","status":"Update started"}
```

## Compile and flash code locally

If you prefer to compile your code locally instead of in the cloud, you can use Particle Workbench, which includes both local and cloud compiling.

## Working with projects and libraries

When your code gets too long for one file or you want to use libraries
that other developers have contributed to the Particle platform it's
time to create a project.

### Creating a project

By default projects are created in your home directory under Particle or
in your Documents folder under Particle on Windows. You can also create
projects in the current directory.

```sh
$ particle project create
What would you like to call your project? [myproject]: doorbell
Would you like to create your project in the default project directory? [Y/n]:
Initializing project in directory /home/user/Particle/projects/doorbell...
> A new project has been initialized in directory /home/user/Particle/projects/doorbell
```

### Using libraries

The CLI supports using libraries with your project. This allows you to
incorporate already written and tested code into your project, speeding
up development and assuring quality.

The overall flow when consuming a library goes like this

- set up the initial project for your application
- find the library you want to add `particle library search`
- add the library to your project - `particle library add`
- edit your source code to use the library
- compile your project - `particle compile`

These commands are described in more details in [the CLI reference](/reference/developer-tools/cli/#particle-library).

Instead of the text search in the CLI, you can also use the [web-based library search](/reference/device-os/libraries/search/).

### library search

The `library search` command allows you to search for libraries that are related to the text that you type in.

For example,

```
particle library search neo
```

Will find libraries containing `neo` in their name.

### library add

The `library add` command adds the latest version of a library to your project.

For example, if you wanted to add the InternetButton library to your project, you would type

```
$ particle library add internetbutton
> Library InternetButton 0.1.10 has been added to the project.
> To get started using this library, run particle library view InternetButton to view the library documentation and sources.
```

This will add the InternetButton dependency to your project's `project.properties` file.

The InternetButton library itself is not present in your project, so you won't see the InternetButton sources.
The library is added to your project when the project is compiled in the cloud.

To make the library functionality available to your application, you add an include statement to your application source code.
The include statement names the library header file, which is the library name with a `.h` ending.  

For example, if we were using the library "UberSensor", it would be included like this

```
#include "UberSensor.h"
```

### library view

The `library view` downloads the source code of a library so you can view the code, example and README.

```
$ particle library view internetbutton
Checking library internetbutton...
Library InternetButton 0.1.11 installed.
Checking library neopixel...
Checking library particle_ADXL362...
Library particle_ADXL362 0.0.1 installed.
Library neopixel 0.0.10 installed.
To view the library documentation and sources directly, please change to the directory /home/monkbroc/Particle/community/libraries/InternetButton@0.1.11
```

Change to the directory indicated to view the sources.

### library copy

Adding a library to your project does not add the library sources. For times when you want to modify the library sources, you can have them added locally.

```
particle library copy neopixel
```

The library will be copied to the `lib` folder of your project. If you already have the library in your `project.properties` make sure to remove it so the cloud compiler doesn't overwrite your changed copy with the published code.



### Incorporating the library into your project

Once the library is added, it is available for use within your project.
The first step to using the library is to include the library header, which follows the name of the library. For example:

```
#include "neopixel.h"
```

The functions and classes from that library are then available for use in your application.
Check out the library examples and documentation that comes with the library for specifics on using that library.

## Contributing libraries

Contributing a library is the process where you author a library and share this with the community.

The steps to creating a library are as follows:

- optionally, create a project for consuming the library
- scaffold a new library structure - `library create`
- author the library, tests and examples
- publish the library

### Create a project for consuming the library

While it's not strictly necessary to have a project present when authoring
a new library, having one can help ensure that the library works as intended before publishing it. The project allows you to consume the library, check that it compiles and verify it behaves as expected on the target platforms before publishing.

For the library consumer project that will consume the library `mylib`, create an initial project structure that looks like this:

```
src/project.cpp
src/project.h
project.properties
lib/mylib
```

The library will exist in the directory `lib/mylib`.

All these files are initially empty - we'll add content to them as the library is authored.


### Scaffolding the library

The `library create` command is used to scaffold the library. It creates a skeleton structure for the library, containing
initial sources, examples, tests and documentation.

In our example project structure we want to create a new library in `lib/mylib` so we will run these commands:

```
cd lib/mylib
particle library create
```
The command will prompt you to enter the name of the library - `mylib`, the version - `0.0.1` and the author, your name/handle/ident.

The command will then create the skeleton structure for the library.


### Authoring the library

You are then free to edit the `.cpp` and `.h` files in the `lib/mylib/src` folder to provide the functionality of your library.

It's a good idea to test often, by writing code in the consuming project that uses each piece of functionality in the library as it's written.

### Consuming the library

To test your changes in the library, compile the project using `particle compile <platform> <directory>`

`particle compile boron . --saveTo firmware.bin`

This will create a `.bin` file which you then flash to your device.

`particle flash mydevice firmware.bin`

### Contributing the library

Once you have tested the library and you are ready to upload the library to the cloud, you run the `library upload`
command.  You run this command from the directory containing the library

```
cd lib/mylib
particle library upload
```

Before the library is contributed, it is first validated. If validation succeeds, the library is contributed
and is then available for use in your other projects. The library is not available to anyone else.

### Publishing the library

If you wish to make a contributed library available to everyone, it first needs to be published.

When publishing a library, it's important to ensure the version number hasn't been published before -
if the version has already been published, the library will not be published and an error message will be displayed.

Incrementing the version number with each publish is a recommended approach to ensuring unique versions.

Once the library is published, it is visible to everyone and available for use. Once the a given version of a library
has been published, the files and data cannot be changed. Subsequent changes must be via a new contributed version
and subsequent publish.

## Reference
For more info on CLI commands, go [here](/reference/developer-tools/cli/).


**Also**, check out and join our [community forums](https://community.particle.io/) for advanced help, tutorials, and troubleshooting.

