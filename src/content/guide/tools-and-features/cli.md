---
word: CLI
title: Command Line
order: 4
columns: two
devices: [electron,photon,core,raspberry-pi]
layout: guide.hbs
---

# Particle CLI

The Particle CLI is a powerful tool for interacting with your devices and the Particle Cloud.  The CLI uses [Node.js](http://nodejs.org/) and can easily run on Windows, Mac OS X, and Linux.  It's also [open source](https://github.com/particle-iot/particle-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/about-pull-requests/) if you want to share!

## Installing

### Using macOS or Linux

The easiest way to install the CLI is to open a Terminal and type:

```sh
bash <( curl -sL https://particle.io/install-cli )
```

This command downloads the `particle` command to your home directory at `~/bin`, installs a version of Node.js to `~/.particle` and installs the `particle-cli` Node.js module that contain the code of the CLI.

It will also try to install [DFU-util](/faq/particle-tools/installing-dfu-util/), a utility program for programming devices over USB. See the [instructions for installing DFU-util](/faq/particle-tools/installing-dfu-util/) if the installer is not able to automatically install dfu-util.

The installer also works on the Raspberry Pi!

### Using Windows

Download the [Windows CLI Installer](https://binaries.particle.io/cli/installer/windows/ParticleCLISetup.exe) and run it to install the Particle CLI, the device drivers and [DFU-util](/faq/particle-tools/installing-dfu-util/).

The CLI is installed to `%LOCALAPPDATA%\particle` (`C:\Users\username\AppData\Local\particle` for Windodws in English).

### Advanced Install

You can manually install the `particle-cli` Node.js package if you need the CLI installed in a different location or you need to install a specific version of the CLI. 

Make sure you have a recent [LTS version of Node.js](http://nodejs.org/) installed.

```sh
# check that you have node.js 6 or above. Check http://nodejs.org on how to update node.js
$ node -v
v6.11.4
# check that you have npm 5 or above
$ npm -v
5.5.1
# update npm if your version is older than 5
$ npm install -g npm
```

Next, open a command prompt or terminal, and install by typing:

```sh
# how to install the particle-cli
$ npm install -g particle-cli
$ particle login
```

If you experience permission errors, we recommend you change the directory where npm installs global packages (ones installed with `-g`) to another directory as documented [here](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-2-change-npms-default-directory-to-another-directory). If you must install `particle-cli` to the default global package location as the superuser, you have to use the `--unsafe-perm` flag to successfully install all dependencies: `sudo npm install -g --unsafe-perm particle-cli`.

For more OS-specific install instructions, see below.


To use the local flash and key features you'll also need to install [dfu-util](https://s3.amazonaws.com/spark-assets/dfu-util-0.8-binaries.tar.xz), and [openssl](http://www.openssl.org/).  They are freely available and open-source, and there are installers and binaries for most major platforms.

Here are some great tutorials on the community for full installs:

[Install Separate Components for Windows](https://community.particle.io/t/tutorial-spark-cli-on-windows-06-may-2014/3112)

[Installing on Ubuntu 12.04](https://community.particle.io/t/how-to-install-spark-cli-on-ubuntu-12-04/3474)

[Installing on Ubuntu 14.04](https://community.particle.io/t/how-to-install-the-spark-toolchain-in-ubuntu-14-04/4139)

[Installing on Mac](http://community.particle.io/t/tutorial-particle-cli-on-mac-osx-07-jun-2015/5225)


### Upgrading to the latest version

If you installed the Particle CLI through the installer, it will periodically update itself to the latest version.

To force it to update, run the installer script again or enter this command:

```sh
# how to update the installed CLI
$ particle update-cli
```

If you installed manually using `npm install`, you can upgrade by running the same command you used to install the tool.

### Running from source (advanced)

To grab the CLI source and play with it locally

```sh
# how to get the source code for the CLI
$ git clone https://github.com/particle-iot/particle-cli.git
$ cd particle-cli
$ npm install
$ node bin/particle.js help
```


## Getting Started

  These next two commands are all you need to get started setting up an account, claiming a device, and discovering new features.


### particle setup

  This command will guide you through logging in or creating a new account as well as claiming your device!


```sh
# how to setup your account and your device
$ particle setup
```


### particle help

  Shows you what commands are available and how to use them.  You can also give the name of a command for detailed help.

```sh
# how to get help
$ particle help
$ particle help keys
```

## Flashing over Serial for the Electron

If you're wanting to save data on your Electron you should definitely consider flashing your Electron over
serial instead of OTA (over-the-air).

Assuming you've compiled and downloaded the firmware binary from [Build IDE](https://build.particle.io) by clicking the cloud button next to the file name, you should
be able to use the Particle CLI, mentioned above, to flash your application firmware to your Electron *without using data.*

Steps:
- **1:** Put the Electron in to [listening mode](/guide/getting-started/modes/electron/#listening-mode)
- **2:** Open Particle CLI from your machine (make sure you've [installed it first](/guide/tools-and-features/cli/electron/#installing))
- **3:** Navigate to the folder where you've downloaded the `firmware.bin` file.
- **4:** From the CLI issue `particle flash --serial firmware.bin`

```sh
# How to flash an Electron over serial
$ particle flash --serial firmware.bin

! PROTIP: Hold the SETUP button on your device until it blinks blue!
? Press ENTER when your device is blinking BLUE
sending file: firmware.bin

Flash success!
```

*Note*: If your Electron goes into [safe mode](/guide/getting-started/modes/electron/#safe-mode), this is okay, just make sure that the system firmware you on the device matches the dependency of the system firmware
built into the firmware application.

## Blink an LED with Tinker

If you're just opening a new device, chances are it's already loaded with Tinker, the app we load at the factory.  If you don't have Tinker, or if you've been using the build IDE already, let's load it quickly by typing:

```sh
# How to re-load tinker onto a device
$ particle flash my_new_device_name tinker
Including:
/usr/local/lib/node_modules/particle-cli/binaries/particle_tinker.bin
attempting to flash firmware to your device my_new_device_name
flash device said  {"id":"0123456789ABCDEFGHI","status":"Update started"}
```

Let's make sure your device is online and loaded with Tinker.  We should see the four characteristic functions exposed by Tinker, "digitalWrite", "digitalRead", "analogWrite", and "analogRead".

```sh
# how to show all your devices and their functions and variables
$ particle list

Checking with the cloud...
Retrieving devices... (this might take a few seconds)
my_device_name (0123456789ABCDEFGHI) 0 variables, and 4 functions
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
$ particle compile {{deviceValue}} blinky.ino
Including:
blinky.ino
attempting to compile firmware
pushing file: blinky.ino
grabbing binary from: https://api.particle.io/v1/binaries/01234567890ABCDEFGH
saved firmware to firmware_123456781234.bin
Compiled firmware downloaded.
```


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

You can find a [step-by-step guide to installing the local build toolchain for the firmware](/faq/particle-tools/local-build) in the FAQ section of the documentation.

After building your code on your machine, you can flash it to your device over Serial or remotely.

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

These commands are described in more details in [the CLI reference](/reference/cli/#particle-library).

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

## Contributing Libraries

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

To test your changes in the library, compile the project using `particle compile <platform>`

`particle compile photon`

This will create a `.bin` file which you then flash to your device.

`particle flash mydevice firmware.bin`

(Replace the name `firmware.bin` with the name of the `.bin` file produced by the compile step.)

### Contributing the library

Once you have tested the library and you are ready to upload the library to the cloud, you run the `library contribute`
command.  You run this command from the directory containing the library

```
cd lib/mylib
particle library contribute
```

Before the library is contributed, it is first validated. If validation succeeds, the library is contributed
and is then available for use in your other projects. The library is not available to anyone else.

### Publishing the Library

If you wish to make a contributed library available to everyone, it first needs to be published.

When publishing a library, it's important to ensure the version number hasn't been published before -
if the version has already been published, the library will not be published and an error message will be displayed.

Incrementing the version number with each publish is a recommended approach to ensuring unique versions.

Once the library is published, it is visible to everyone and available for use. Once the a given version of a library
has been published, the files and data cannot be changed. Subsequent changes must be via a new contributed version
and subsequent publish.

## Reference
For more info on CLI commands, go [here](/reference/cli).


**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
