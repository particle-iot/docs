---
word: CLI
title: Command Line Interface (CLI)
layout: commonTwo.hbs
columns: three
redirects: true
description: Command line interface for managing your devices for Windows, Mac OS, and Linux
---

# CLI command reference

{{!-- BEGIN shared-blurb 5c2a6fdf-e4c6-4dad-b4dd-ea7eed0ced53 --}}

## Installing

### Using Mac OS or Linux

The easiest way to install the CLI is to open a Terminal and type:

```sh
bash <( curl -sL https://particle.io/install-cli )
```

This command downloads the `particle` command to your home directory at `~/bin`.

### Using Windows

Download the [Windows CLI Installer](https://binaries.particle.io/particle-cli/installer/win32/ParticleCLISetup.exe ) and run it to install the Particle CLI. The Windows CLI installer is self-contained and can be run on a computer without Internet access, however CLI commands that interact with the Particle cloud will of course need Internet access.

The CLI is installed to `%LOCALAPPDATA%\particle` (`C:\Users\username\AppData\Local\particle` for Windows in English).

{{!-- END shared-blurb --}}

For other ways to install the Particle CLI, see the [CLI guide](/getting-started/developer-tools/cli/).


## particle login

  Login and save an access token for interacting with your account on the Particle Device Cloud.

```sh
# how to login - creates and saves an access token for your session with the CLI
$ particle login
```


## particle logout

  Logout and optionally revoke the access token for your CLI session.

```sh
# how to remove your saved access token, and optionally revoke that token as well
$ particle logout
```


## particle list

Generates a list of what devices you own, and displays information about their status, including what variables and functions are available

```sh
# how to show what devices of yours are online
# and what functions and variables are available
$ particle list

Checking with the cloud...
Retrieving devices... (this might take a few seconds)
my_device_name (0123456789abcdef78901234) 0 variables, and 4 functions
  Functions:
    int digitalWrite(string)
    int digitalRead(string)
    int analogWrite(string)
    int analogRead(string)

```

## particle setup

You should use the [web based setup](https://setup.particle.io/) for setting up devices. This CLI command is no longer available.

For setting Wi-Fi credentials only, [particle serial wifi](#particle-serial-wifi).

## particle call

  Calls a function on one of your devices, use ```particle list``` to see which devices are online, and what functions are available.

```sh
# how to call a function on your device
$ particle call 0123456789abcdef78901234 digitalWrite "D7,HIGH"
1
```

To call a function on a product device, set the `--product` flag to your product's id.

```sh
# call the `brew` function on the device with id `0123456789abcdef01234567` within product `12345`
$ particle call 0123456789abcdef01234567 brew --product 12345
```


## particle get

  Retrieves a variable value from one of your devices, use ```particle list``` to see which devices are online, and what variables are available.

```sh
# how to get a variable value from a device
$ particle get 0123456789abcdef78901234 temperature
72.1
```

To get a variable from a product device, set the `--product` flag to your product's id.

```sh
# read the `temperature` variable from the device with id `0123456789abcdef01234567` within product `12345`
$ particle get 0123456789abcdef01234567 temperature --product 12345
```


## particle device


### particle device add

  Adds a new device to your account.

  Your device will need to be connected to the Internet (onboard LED breathing cyan) for this process to work.

```sh
# how to add a new device to your account
$ particle device add 0123456789abcdef78901234
Claiming device 0123456789abcdef78901234
Successfully claimed device 0123456789abcdef78901234
```


### particle device rename

  Assigns a new name to a device you've claimed

```sh
# how to change the name of your device
$ particle device rename 0123456789abcdef78901234 "pirate frosting"
```


### particle device remove

  Removes a device from your account so someone else can claim it.

```sh
# how to remove a device from your account
$ particle device remove 0123456789abcdef78901234
Are you sure?  Please Type yes to continue: yes
releasing device 0123456789abcdef78901234
server said  { ok: true }
Okay!
```

Unclaiming a cellular device removes it from your account, but does not stop billing. As the claiming status and SIM are separate, you must also pause or release ownership of your SIM to stop billing. If you plan on selling or giving away your device, you should both unclaim the device and release ownership of the SIM. That will allow it to be set up as if a new device later.



## particle flash

  Sends a firmware binary, a source file, or a directory of source files, or a known app to your device.


### Flashing a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.

```sh
# how to compile and flash a directory of source code to your device
$ particle flash 0123456789abcdef78901234 my_project
```

More commonly, you will be in the directory containing your `project.properties` file and instead use `.`, which is the current directory.

```sh
$ cd my_project
$ particle flash 0123456789abcdef78901234 .
```

You can also target a specific version of Device OS in the `particle flash` command:

```sh
$ particle flash 0123456789abcdef78901234 . --target 5.6.0
```

#### Flashing a directory with assets

[Asset OTA](/getting-started/cloud/ota-updates/#asset-ota) (available in Device OS 5.5.0 and later), makes it possible to include bundled assets in an OTA software update that can be delivered to other processors and components in your product. 

The `particle flash` command supports asset OTA. Your project directory will typically look like:

```
my_project/
  src/
    my_project.cpp
    my_project.h
  assets/
    coprocessor.bin
  project.properties
  README.md
```

### Flashing a pre-compiled binary OTA

You can flash a binary that you have previously compiled to a .bin file:

```sh
$ particle flash 0123456789abcdef78901234 firmware.bin
```

You can also flash a pre-compiled binary with assets in a .zip file:

```sh
$ particle flash 0123456789abcdef78901234 product.zip
```

### Flashing a pre-compiled binary over USB

You can flash a binary that you have previously compiled to a .bin file over USB. The device will be put into DFU mode automatically, if necessary.

```sh
$ particle flash --local firmware.bin
$ particle flash --local product.zip
```

If there are multiple devices connected by USB, you can specify the device for `--local` by device ID or device name:

```sh
$ particle flash --local wandering-ferret firmware.bin
$ particle flash --local 0123456789abcdef78901234 firmware.bin
```

### Flashing one or more source files

You can include any number of individual source files after the device Name, and the CLI will include them while flashing your app.

```sh
# how to compile and flash a list of source files to your device
$ particle flash 0123456789abcdef78901234 app.ino library1.cpp library1.h
```

Note that the CLI since 1.9.0 has support for firmware libraries via the [particle library](#particle-library)
commands.

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


### Target a specific firmware version for flashing

You can compile and flash your application against a specific firmware version using the `--target` flag. If you don't specify `target` your code will compile against the latest LTS release firmware.

This is useful if you are not ready to upgrade to the latest Device OS
version on your device, try a release candidate version, or switch between LTS and developer preview release lines.

```sh
# compile your application with the 5.6.0 Device OS version and flash it
$ particle flash --target 5.6.0 0123456789abcdef78901234 my_project
```

A list of valid version numbers can be found in the [release notes](/reference/device-os/release-notes/).

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


### Flashing a known app

You can easily reset a device back to a previous existing app with a quick command. Tinker is the original firmware that ships with the device and can be flashed as follows:

```sh
$ particle flash deviceName tinker
```

You can flash a known app over USB with `--local`. The device will be put into DFU mode, blinking yellow. 

```sh
$ particle flash --local tinker
```

Flashing tinker will leave the version of Device OS on your device unchanged. You can, however, set a specific version of Device OS (upgrade or downgrade) using the `--target` option. A list of valid version numbers can be found in the [release notes](/reference/device-os/release-notes/).

```sh
$ particle flash --local tinker --target 5.5.0
```

In many respects, `particle flash --local tinker --target 5.5.0` and `particle update --target 5.5.0` are similar. The major difference is that `particle update` will update the NCP (network coprocessor) where `--local` will not. This will only affect Tracker devices that previously had Device OS 2.x on them and upgrade to 3.x or later. Even if you do not update the NCP over USB, it can still be updated OTA. The Argon also has an NCP, but the version has never been upgraded. No other devices have an NCP.

It is also possible to flash in listening mode (blinking dark blue) using `--serial`, however DFU should be used except in rare cases as it's significantly more reliable and provides status in case of failure.

```sh
$ particle flash --serial tinker
```

You can also update the factory reset firmware using the `--factory` on devices that support factory reset user firmware. Note that factory reset does not restore the original Device OS version. Additionally, the factory reset firmware slot is empty from the factory, so user firmware won't be replaced, either, unless you manually set it first.

```sh
$ particle flash --factory tinker
```

### Flashing a product device

To flash a product device, use the `particle cloud flash` command and set the `--product` flag to your product's id.

```sh
# Compile the source code in the current directory in the cloud and flash to device `0123456789abcdef01234567` within product `12345`
$ particle cloud flash 0123456789abcdef01234567 --product 12345
```

If the specified Device ID is not marked as a development device, the firmware that you have flashed may be immediately overwritten by the default or locked product firmware.

### Compiling remotely and flashing locally

To cloud compile and flash locally over USB:

```
particle flash --local project/path
```

Prior to September 2023, a multi-step process was required.

{{collapse op="start" label="Show old instructions"}}

```sh
# how to compile a directory of source code and tell the CLI where to save the results
$ particle compile boron my_project_folder --saveTo firmware.bin
OR
# how to compile a list of source files
$ particle compile boron app.ino library1.cpp library1.h --saveTo firmware.bin

# how to flash a pre-compiled binary over usb to your device
# make sure your device is flashing yellow and connected via USB
# requires dfu-util to be installed
$ particle flash --local firmware.bin
```

{{collapse op="end"}}

You can also specify a Device OS version. This will be used as both the target Device OS version for your firmware, as well as upgrade or downgrade the Device OS version over USB. A list of valid version numbers can be found in the [release notes](/reference/device-os/release-notes/).

```
particle flash --local project/path --target x.y.z
```

You can also add the `--application-only` to set the Device OS target version for compiling, but to not change the Device OS version over USB. If the target version is newer than what is on the device, the device will be updated OTA if necessary.

```
particle flash --local project/path --target x.y.z --application-only
```

If you specify a directory containing a `project.properties` file that contains an `assetOtaDir`, then the device will be flashed with the bundle of the user firmware and Asset OTA assets.

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


## particle compile

  Compiles one or more source file, or a directory of source files, and downloads a firmware binary to your computer. The cloud compiler is device-specific, so the name of device you want to target (or its alias) must be provided as an argument. The supported devices are:

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

  **NOTE**: Remember that **\*.cpp** and **\*.ino** files behave differently. You can read more about it in [preprocessor](/reference/device-os/api/preprocessor/preprocessor/) in the Device OS Firmware API reference.

```bash
$ particle compile boron myapp.ino
```

While compiling source code using the cloud compiler there are limits:

- Maximum time to compile: {{maximumCompileTime}}
- Maximum source code size: {{maximumCompilePayload}}

---

The cloud compiles `.ino` and `.cpp` files differently.  For `.ino` files, the cloud will apply a pre-processor.  It will add missing function declarations, and it will inject an `#include "Particle.h"` line at the top of your files if it is missing. See [the pre-processor documentation for details](/reference/device-os/api/preprocessor/preprocessor/).

If you want to build a library that can be used for both Arduino and Particle, here's a useful code snippet:

```cpp
#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#elif defined(SPARK)
#include "application.h"
#endif
```

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


### Compiling a directory

You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.

```sh
# how to compile a directory of source code
$ particle compile boron my_project_folder
# by default the current directory will be compiled
$ particle compile boron
```

More commonly, you will be in the directory containing your `project.properties` file and instead use `.`, which is the current directory.

You can also specify the filename to save to. If the filename exists, it will be overwritten.

```sh
$ cd my_project
$ particle compile p2 . --saveTo firmware.bin
```

You can also target a specific version of Device OS in the `particle flash` command:

```sh
$ particle flash 0123456789abcdef78901234 . --target 5.6.0
```

While compiling source code using the cloud compiler there are limits:

- Maximum time to compile: {{maximumCompileTime}}
- Maximum source code size: {{maximumCompilePayload}}

A list of valid version numbers can be found in the [release notes](/reference/device-os/release-notes/).

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


#### Compiling a directory with assets

[Asset OTA](/getting-started/cloud/ota-updates/#asset-ota) (available in Device OS 5.5.0 and later), makes it possible to include bundled assets in an OTA software update that can be delivered to other processors and components in your product. 

The `particle compile` command supports asset OTA. Your project directory will typically look like:

```
my_project/
  src/
    my_project.cpp
    my_project.h
  assets/
    coprocessor.bin
  project.properties
  README.md
```

```sh
$ cd my_project
$ particle compile boron .
```

The name of the assets directory is specified in `project.properties` file contains an `assetOtaDir` key and a value containing a valid directory. It does not need to be named `assets/`.

```
assetOtaDir=assets
```

- When using **Particle: Compile Application** or `particle compile` projects with bundled assets are built into a .zip file. This file contains both the firmware binary (.bin) as well as the assets. 
- The asset bundle .zip can be uploaded to the console as product firmware binary.
- When using **Particle: Flash application** or `particle flash` the same process is followed, except the device is flashed.
- When flashing OTA, the asset bundle is transmitted using resumable OTA and compression for efficient data use.
- You will need to include code in your application firmware to process the additional assets, such as sending them to a coprocessor or saving them to the file system.
- Creating bundled assets will not be not possible in the Web IDE. Particle Workbench is recommended.


{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


### Compiling one or more source files

```sh
# how to compile a list of source files
$ particle compile boron app.ino library1.cpp library1.h
```


### Target a specific firmware version for compiling

You can compile your application against a specific firmware version use the `--target` flag. If you don't specific `target` your code will compile against the latest released firmware.

This is useful if you are not ready to upgrade to the latest Device OS
version on your device.

```sh
# compile your application with the 0.5.0 Device OS version
$ particle compile boron --target 0.5.0 my_project
$ particle compile electron myapp.ino --target 0.5.1`
$ `particle flash <deviceid> myapp.ino --target 0.5.1` would compile and
flash myapp.ino for device <deviceid> against Device OS version 0.5.1.

```

This is also useful for the Xenon, which requires 1.5.x or earlier:

```sh
$ particle compile xenon --target 1.5.0 my_project
```

Or the Spark Core, which requires 1.4.4 or earlier:

```sh
$ particle compile core --target 1.4.4 my_project
```

{{note op="start" type="P2"}}
At the time of writing, flashing a P2 or Photon 2 from the CLI targets 3.2.1-p2.2, which is not recommended. You 
should always manually target 5.3.1 or later, for example, `--target 5.6.0`, instead.
{{note op="end"}}


## particle bundle

If you wish to create an Asset OTA bundle, you will typically do so with the commands above to both compile
the binary and generate the assets. If you have already generated the .bin file, such as from a Workbench 
local build, you can do so using the `particle bundle` command.

You will typically add `assetOtaDir=assets` to your project.properties file to bundle assets from the
asset directory. The assets path should be relative to the project root.

Optionally, you can use the `--assets <path>` option to override the directory used for assets.

To override the default filename to save to, use the `--saveTo <filename>` option. It should be a .zip file. 

Example usage:

| Command | Description |
| :--- | :--- |
| `particle bundle myApp.bin` | Creates a bundle of application binary and assets. The assets are obtained from the project.properties in the current directory |
| `particle bundle myApp.bin --assets /path/to/assets` | Creates a bundle of application binary and assets. The assets are obtained from /path/to/assets directory |
| `particle bundle myApp.bin --assets /path/to/project.properties` | Creates a bundle of application binary and assets. The assets are picked up from the provided project.properties file |
| `particle bundle myApp.bin --assets /path/ --saveTo myApp.zip` | Creates a bundle of application binary and assets, and saves it to the myApp.zip file |
| `particle bundle myApp.bin --saveTo myApp.zip` | Creates a bundle of application binary and assets as specified in the assetOtaDir if available, and saves the bundle to the myApp.zip file |

## particle device-protection

[Device Protection](/scaling/best-practices/device-protection/) is an enterprise feature of Device OS 6.x to provide additional 
security for devices to prevent local flashing by USB or SWD/JTAG, USB serial access, and other features. 

Devices cannot be removed from Device Protection using the Particle CLI, but certain features such as USB
serial access can be temporarily disabled.

You must be logged into a your Particle account in the CLI and have appropriate access to the product the Protected Device
is in in order to use these commands.

### device-protection status

Print the status of Device Protection for a device connected by USB:

```sh
$ particle device-protection status
```

You can also print the status of a specific device if multiple devices are connected and you do not want to be prompted.

```sh
$ particle device-protection status --device 0123456789abcdef78901234
```

### device-protection disable

Temporarily disable Device Protection for a device to allow access to USB serial and other features.

```sh
$ particle device-protection disable
```

You can also disable Device Protection on a specific device if multiple devices are connected and you do not want to be prompted.

```sh
$ particle device-protection disable --device 0123456789abcdef78901234
```


### device-protection enable

Most commands such as flashing a device will revert back to protected mode automatically. The exceptions are:

- `particle usb reset`
- `particle serial monitor`

When using these commands, you can reenable Device Protection using:

```sh
$ particle device-protection enable
```

You can also enable Device Protection on a specific device if multiple devices are connected and you do not want to be prompted.

```sh
$ particle device-protection enable --device 0123456789abcdef78901234
```


## particle project

Use the project structure when you want to use libraries or you want to organize your source code better.


### creating a project

You will be prompted to create the project in a default directory or in the current directory. The default directory for projects is your home directory

```sh
# create a new project
$ particle project create
What would you like to call your project? [myproject]: doorbell
Would you like to create your project in the default project directory? [Y/n]:
Initializing project in directory /home/user/Particle/projects/doorbell...
> A new project has been initialized in directory /home/user/Particle/projects/doorbell
```

The meta data about the project is stored in the `project.properties` file. It includes the project name and what libraries are used by the project.


### compiling a project

Compile or flash a project like you would another directory.

```sh
# compile the project in the current directory
$ particle compile photon
# flash the project in the current directory to a device
$ particle flash my_device
```


## particle library

The fantastic Particle community has created and ported many libraries to make it easier to get your project done fast. You can use those libraries in projects you compile through the command line.


### particle library list

Browse the list of all libraries to see what are the most popular libraries available.

```
$ particle library list
```


### particle library search

Find a specific library by name. The name is case insensitive.

```sh
# seach for the InternetButton library
$ particle library search internet
```


### particle library add

First, [create a project](#creating-a-project) then in the project directory add the library. It will be added to the `project.properties`.

```sh
# add the InternetButton library
$ particle library add internetbutton
# add a specific version of the InternetButton library
$ particle library add internetbutton@0.1.10
# add the line #include "InternetButton.h" in your source code to use the library
```

To upgrade to a newer version later, just do `particle library add` with the same name and the `project.properties` will be updated with the latest version of that library.


### particle library view

See the source and examples of a library with `particle library view`.  It will download the library and tell you where it is on the local file system.

```sh
# see the InternetButton library
$ particle library view internetbutton
```


### particle library copy

If you need to make modifications to a published library, to fix a bug or add a new feature, copy the library locally to your project. It will end up in the `lib` folder of your project.

```sh
# add a custom version of the InternetButton library to your project
$ particle library copy internetbutton
# add the line #include "InternetButton.h" in your source code to use the library
```

If you previously had added the library with `particle library add` you should remove it from your `project.properties` to make sure you don't include 2 versions of the library: the published one and modified one.


### particle library create

To make your own library you can use `particle library create` to get a folder structure with all the files you'll need and customize it from there.

```sh
$ mkdir mylib
$ cd mylib
$ particle library create
```


### particle library upload

After you modified a published library or you are ready to use the [library you created](#particle-library-create) in a project, you upload a private version of your library to the Particle cloud.

```sh
# upload the library in the current directory
$ particle library upload
```

You can upload the same private version several times until you have happy with it.

If you modified an existing library you have to modify the name of the library in `library.properties`.


### particle library publish

When you're ready to make a new private library version available, you publish it.

```sh
# publish you library
$ particle library publish mylib
```

Remember that it's necessary to publish every new version after uploading it before others can use it in their projects.


## particle webhook


### particle webhook create

Create a webhook that will trigger an HTTP request when a Particle event is published to the cloud. You can pass in an `eventName`, `url`, and `deviceID`
as arguments to the CLI command. Optionally, you can create your own custom JSON file that includes webhook params. For a full list of available
webhook parameters, see the [REST API documentation](/reference/cloud-apis/api/#create-a-webhook). This command is only available for user webhooks.

```sh
$ particle webhook create temperature https://mysite.com
$ particle webhook create temperature https://mysite.com 0123456789abcdef78901234
$ particle webhook create webhook.json
```

```sh
# An example custom webhook JSON file that will target Librato, webhook.json
{
    "event": "librato_",
    "url": "https://metrics-api.librato.com/v1/metrics",
    "name": "Publish to Librato",
    "requestType": "POST",
    "auth": {
        "username": "YOUR_LIBRATO_USERNAME",
        "password": "YOUR_LIBRATO_ACCESS_TOKEN"
    },
    "json": {
        "gauges": [
            {
                "name": "\{{PARTICLE_EVENT_NAME}}",
                "value": "\{{PARTICLE_EVENT_VALUE}}",
                "source": "\{{PARTICLE_DEVICE_ID}}"
            }
        ]
    },
    "mydevices": true
}

```


### particle webhook list

List all webhooks belonging to the authenticated user. This command is only available for user webhooks.

```sh
$ particle webhook list

Found 2 hooks registered

    1.) Hook ID 57223d27ffedc82b02697efb is watching for "temp"
        and sending to: http://google.com
        for device 53ff73066678505550292167
        created at 2016-04-28T16:41:11.687Z

    2.) Hook ID 57228c5e4b112b4f2f51cfc2 is watching for "hello"
        and sending to: https://google.com
        created at 2016-04-28T22:19:10.726Z
```


### particle webhook delete

Delete a webhook and immediately stop it from triggering. This command is only available for user webhooks.

```sh
$ particle webhook delete 234523452345234523452345
Successfully deleted webhook!
```

All registered user webhooks can be removed by passing the `all` parameter. 

```sh
$ particle webhook delete all
? Do you want to delete ALL your webhooks? Yes
Found 3 hooks registered

deleting 58889c0af14a8228a3fe64c8
deleting 58889c0ef14a8228a3fe64dd
deleting 58889c1113e45f1b69be21b7
```


## particle monitor

  Pulls the value of a variable at a set interval, and optionally display a timestamp

  * Minimum delay for now is 500 (there is a check anyway if you keyed anything less)
  * hitting ```CTRL + C``` in the console will exit the monitoring

```sh
# how to poll for a variable value from one or more devices continuously
$ particle monitor 0123456789abcdef78901234 temperature 5000
$ particle monitor 0123456789abcdef78901234 temperature 5000 --time
$ particle monitor all temperature 5000
$ particle monitor all temperature 5000 --time
$ particle monitor all temperature 5000 --time > my_temperatures.csv
```


## particle identify

Retrieves your device id when the device is connected via USB. It also provides the current system firmware version on the device.

```sh
# helps get your device id and system firmware version via usb and serial
# make sure your device is connected and blinking blue
$ particle identify
$ particle identify --port 1
$ particle identify --port COM3
$ particle identify --port /dev/cu.usbmodem12345

$ particle identify 0123456789abcdef78901234
```

This command is an alias for `particle serial identify`.

## particle subscribe

Subscribes to published events on the cloud, and pipes them to the console.  

Remember that the eventName is a prefix, so if you subscribe to "test" you'll also get events "testing" and "test1234".

```sh
# opens a connection to the API so you can stream events coming from your devices
$ particle subscribe
$ particle subscribe eventName
$ particle subscribe eventName CoreName
$ particle subscribe eventName 0123456789abcdef78901234
```

---

```sh
# subscribe to all events for a particular device
$ particle subscribe --device deviceName
$ particle subscribe --device 0123456789abcdef01234567
```

It's also possible to subscribe to all events from a specific device in your account. 

---

```sh
# subscribe to all events published by devices within product `12345`
$ particle subscribe --product 12345
```

To listen to a product's event stream, set the `--product` flag to your product's id.

---

```sh
# subscribe to all events published by the device with id `0123456789abcdef01234567` within product `12345`
$ particle subscribe --device 0123456789abcdef01234567 --product 12345
```

Likewise, to listen to a product device's event stream, set the `--device` flag to your device's id and the `--product` flag to your product's id.

---

```sh
# No longer necessary to use "mine" as this is the only option 
# when subscribing to events from your devices
$ particle subscribe mine
$ particle subscribe eventName mine
$ particle subscribe mine deviceName
```

Prior to August 2020, you could subscribe to the public event stream, but the public event stream is no longer available. Thus specifying special device name "mine" is no longer necessary as you only will ever receive events for your account and devices now.



## particle publish

Publishes events to the cloud via API, similar to running Particle.publish() on a Particle Device.

```sh
$ particle publish eventName
$ particle publish eventName data
$ particle publish eventName "some data with spaces"
```

---

Prior to August 2020, there were both public and private event streams. The public event stream no longer exists, thus you do not need to explicitly specify the `--private` flag. All events are private, and will be received whether `MY_DEVICES` is specified or not when subscribing on a device.

---

To send events to a product's event stream, set the `--product` flag to your product's id.


```sh
# publish a `temp` event with a value of `25.0` to your product `12345`'s event stream
$ particle publish temp 25.0 --product 12345
```

Prior to March 2023, webhook events like hook-sent, hook-error, and hook-response only went to the device owner's event stream. If the device was unclaimed, the events disappeared. Now, these events also appear in the product event stream, in the console, SSE event stream, and webhooks. 

## particle wifi

These commands are available on Wi-Fi devices including the P2, Photon 2, M-SoM, and Argon. They are recommended instead of [particle serial wifi](#particle-serial-wifi) on these versions of Device OS as they provide additional functionality and can more easily be scripted.

These commands work in listening mode and in normal operating mode (such as breathing cyan or breathing magenta). They cannot be used in DFU mode (blinking yellow).

### particle wifi add

Add Wi-Fi credentials to a device. 

- This command does not attempt to connect to the network so it can be used for configuring a device to be used in another location.
- This command can be used to set credentials for a network with a hidden SSID.
- See [`particle wifi join`](#particle-wifi-join) if you want to add credentials and connect, or need compatibility with older versions of Device OS.

| Command | Description |
| :--- | :--- |
| `particle wifi add` | Prompt for Wi-Fi credentials and sends them to a device |
| `particle wifi add --file credentials.json` | Read Wi-Fi credentials from credentials.json and send them to a device |

The format of the credentials file is:

```json
{
  "network": "my_ssid",
  "security": "WPA2_PSK",
  "password": "my_password",
  "hidden": false
}
```

The available security types are:

- `NONE`
- `WEP`
- `WPA`
- `WPA2_PSK`
- `WPA3_PSK`

The `particle wifi add` command requires Device OS 5.8.2 and or and Device OS 6.2.0 and later.

### particle wifi join

Add credentials and join a Wi-Fi network, or connect to a specific SSID.

| Command | Description |
| :--- | :--- |
| `particle wifi join` | Prompt for Wi-Fi credentials, sends them to a device, then attempts to join the network |
| `particle wifi add --file credentials.json` | Read Wi-Fi credentials from credentials.json, sends them to a device, then joins |
| `particle wifi join --ssid <SSID>`  | Join a pre-configured network specified by SSID. Pre-configure a network using `particle wifi add` |

See [particle wifi add](#particle-wifi-add) for the format of the credentials.json file.

This command, unlike `particle wifi add`, can be used on Device OS 0.9.0 and later on Gen 3 and Gen 4 Wi-Fi devices.

### particle wifi list

Lists Wi-Fi networks visible to the device.

```
% particle wifi list
List of Wi-Fi networks:
- mySSID1 (WPA2_PSK) - current network
- mySSID2 (WPA2_PSK)
```

### particle wifi clear

Clears all Wi-Fi credentials from the device. If the device is currently connected to Wi-Fi, it is not disconnected.

```
% particle wifi clear
```

### particle wifi remove

Removes a Wi-Fi credential for a specific SSID from the device. If the device is currently connected to Wi-Fi, it is not disconnected.

```
% particle wifi remove --ssid <ssid>
```

### particle wifi status

Show the status of the network that is currently connected to.

```
% particle wifi status
```


## particle serial

### particle serial wifi

Configure Wi-Fi credentials over serial on the Photon, P1, Argon, P2, and Photon 2. 

For devices using Device OS 6.2 or later, it is recommended that you use [`particle wifi`](#particle-wifi) instead of `particle serial wifi`.

```sh
# Configure new Wi-Fi credentials for a Photon or Argon over a serial connection
$ particle serial wifi
```

You will need to use this command to set up a device using WPA2 Enterprise and services like EduRoam that use it.

It's possible to read Wi-Fi credentials from a file and send them to a device over serial.

```sh
$ particle serial wifi --file credentials.json
```

The JSON file for passing Wi-Fi credentials should look like this:
```json
{
  "network": "my_ssid",
  "security": "WPA2_AES",
  "password": "my_password"
}
```

The `security` property can be NONE, WEP, WPA2_AES, WPA2_TKIP, WPA2_AES+TKIP, WPA_AES, WPA_TKIP, WPA_AES+TKIP. For enterprise Wi-Fi, set security to WPA_802.1x or WPA2_802.1x and provide the `eap`, `username`, `outer_identity`, `client_certificate`, `private_key` and `root_ca` properties.

WPA Enterprise is only available on the Photon and P1 (Gen 2). It is not available on the Argon, P2, or Photon 2.

On Gen 2 devices (Photon 1 and P1), scanning for Wi-Fi networks is done from your computer's Wi-Fi interface, which may be able to see different networks than your Particle device. All Gen 3 and later devices (Argon, P2, Photon 2) perform the Wi-Fi scan on-device.


### particle serial identify

Return the Device ID and other information about a device. See [particle identify](#particle-identify) for additional information.

### particle serial list

  Shows currently connected Particle devices acting as serial devices over USB

```sh
# shows a list of devices connected via serial usb
$ particle serial list
```


### particle serial monitor

  Starts listening to the specified serial device, and echoes to the terminal

```sh
# opens a read-only serial monitor for a particular device
$ particle serial monitor
$ particle serial monitor --port 1
$ particle serial monitor --port COM3
$ particle serial monitor --port /dev/cu.usbmodem12345
```


### particle serial flash

This command is no longer available as of CLI 3.21.0 and the underlying ymodem serial flash support is removed from Device OS 6.0.0 and later.

Use `--usb` mode in DFU mode (blinking yellow) to flash firmware instead.


### particle serial inspect

Print information about the firmware modules on a device. The device must be connected by USB to your computer.

```sh
$ particle serial inspect
Platform: 6 - Photon
Modules
  Bootloader module #0 - version 502, main location, 16384 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
  System module #1 - version 1512, main location, 262144 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
      System module #2 - version 207
  System module #2 - version 1512, main location, 262144 bytes max size
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
      System module #1 - version 1512
      Bootloader module #0 - version 400
  User module #1 - version 3, main location, 131072 bytes max size
    UUID: B3A6DCD529BE70FBE24EE959C7305D58E3BC9A04ACDCE8F093C7A1F759097D09
    Integrity: PASS
    Address Range: PASS
    Platform: PASS
    Dependencies: PASS
      System module #2 - version 6
```

If you see any `FAIL` entries, there is likely a missing dependency, such as a bootloader that needs to be upgraded. Normally this will be corrected automatically over-the-air, but if you cannot connect to the cloud the dependency cannot be fixed OTA.

The version numbers in the output can be mapped to common version numbers using [this table](https://github.com/particle-iot/device-os/blob/develop/system/system-versions.md). For example, Device OS version 1512 is more commonly known as 1.5.2.

### particle serial mac

Prints the MAC (media access control) address for devices that have one.

## particle usb

Various commands to interact with a device connected through USB.

_On Windows, these commands require the latest drivers. See the [CLI installation guide](/getting-started/developer-tools/cli/#using-windows) for details._

The Particle USB commands are only available in Device OS 0.9.0 (Gen 3, including Argon and Boron), and 1.0.0 (Gen 2, including Photon, P1, Electron, and E-Series). These commands are not available on the Gen 1 (Spark Core).

If you have an older Particle device you can use `particle update` will upgrade the devices to support these commands.

If you are having trouble seeing devices using these commands on Windows 10, see [Troubleshooting Windows 10 device drivers](/troubleshooting/guides/build-tools-troubleshooting/win10-device-drivers/).

### particle usb list

List Particle USB devices attached to the host

```
particle usb list [--exclude-dfu] [--ids-only]
```

### particle usb start-listening

Put a device or multiple devices into the listening mode

```
particle usb start-listening [devices...] [--all]
```

Also aliases to `usb listen`.

```
particle usb listen [devices...] [--all]
```

Start listening can only be done from normal operating mode or safe mode.

### particle usb stop-listening

Make a device or multiple devices exit the listening mode

```
particle usb stop-listening [devices...] [--all]
```

Stop listening can only be done from listening mode (blinking dark blue).


### particle usb safe-mode

Put a device or multiple devices into the safe mode

```
particle usb safe-mode [devices...] [--all]
```

Safe mode can only be entered from normal operating mode (not DFU mode).


### particle usb dfu

Put a device or multiple devices into the DFU mode

```
particle usb dfu [devices...] [--all]
```

DFU mode can only be entered from normal operating mode or safe mode.

### particle usb reset

Reset a device or multiple devices

```
particle usb reset [devices...] [--all]
```

Reset can be used from normal operating mode, safe mode, or DFU mode.

### particle usb setup-done

On the Argon, Boron, B-Series SoM, and Tracker SoM running Device OS 3.x and earlier, the setup done flag indicates that mesh setup has been complete. This is set automatically by the mobile apps, however if you are setting up manually over USB, you will need to set the setup done flag, otherwise the device will always boot into listening mode (blinking dark blue).

```
particle usb setup-done [devices...] [--reset]
```

The `--reset` command clears the setup done flag, so the device will resume booting into listening mode.

Setup done can only be issued when in normal operating mode or safe mode. It is only applicable for Gen 3 devices (Argon, Boron).

**With Device OS 4.0 and later, there is no setup done flag and this CLI command does not do anything.**

### particle usb configure

Install udev rules for Particle USB devices (Linux-only)

```
particle usb configure
```


## particle update

Update your device to the latest Device OS release. Follow this with `particle flash --local tinker` to reflash the default Tinker app to make your device run known good software. This will generally be the latest LTS version, unless the device does not yet have an LTS release, in which case it will be the latest non-RC version in the developer preview release line.

```sh
$ particle update
> Your device is ready for a system update.
> This process should take about 30 seconds. Here goes!

! System firmware update successfully completed!

> Your device should now restart automatically.
```

Additionally, you can upgrade to a specific version of Device OS using the `--target` option. This is handy for moving to the developer preview line of releases instead of LTS.

```sh
$ particle update --target 5.5.0
```

You can also downgrade Device OS, however:

- In general we recommend that you do not downgrade Device OS on devices, except to roll back from developer preview back to the adjacent LTS version.
- If you are downgrading, you should first downgrade user firmware or using `particle flash --local tinker` as user firmware that targets a newer version of Device OS will cause it to update back to its original version OTA after reconnecting to the cloud.

{{!-- BEGIN shared-blurb 164b5ce0-9baa-11ec-b909-0242ac120002 --}}
**Boron LTE BRN402 and B-Series SoM B402**

If you are downgrading a Boron LTE (BRN402) or B-Series SoM B402 from Device OS 2.0.0 or later, to 1.5.1 or earlier, you must first install 1.5.2, allow the device to boot and connect to cellular before downgrading again to an earlier version. The reason is that 2.0.0 and later use a higher baud rate for the cellular modem, and on the SARA-R410M only, this setting is persistent. Older versions of Device OS assume the modem is using the default of 115200 and will fail to communicate with the modem since it will be using 460800. Device OS 1.5.2 uses 115200, however it knows it can be 460800 and will try resetting the baud rate if it can't communicate with the modem.
{{!-- END shared-blurb --}}


## particle keys


### particle keys doctor

Helps you update your keys, or recover your device when the keys on the server are out of sync with the keys on your device.  The ```particle keys``` tools requires openssl to be installed.

Connect your device, and run this command to replace the unique cryptographic keys on your device.  Automatically sends the new public key to the cloud as well.

```sh
# helps repair key issues on the connected device
$ particle keys doctor

# repair key issues on a specific connected device
$ particle keys doctor 0123456789abcdef78901234
```


### particle keys new

Generates a new public / private key pair that can be used on the connected device. The ```particle keys``` tools requires openssl to be installed.

```sh
# generates a new public/private keypair
$ particle keys new
New key 0123456789abcdef78901234.der created for device 0123456789abcdef78901234

# generates a new public/private keypair with the filename mykey
$ particle keys new mykey
New key mykey.der created for device 0123456789abcdef78901234
```


### particle keys load

Copies a ```.der``` formatted private key onto your device's external flash. It defaults to using the file ```<deviceID>.der``` or you can specify a key file on the command line. The ```particle keys``` tools requires openssl to be installed.  Make sure any key you load is sent to the cloud with ```particle keys send device.pub.pem```

```sh
# loads a key named after your device
$ particle keys load
Saved existing key to backup_ec_0123456789abcdef78901234.der
Key 0123456789abcdef78901234.der written to device

# loads a key to your device via USB
$ particle keys load mykey.der
Saved existing key to backup_ec_0123456789abcdef78901234.der
Key mykey.der written to device
```


### particle keys save

Copies a ```.der``` formatted private key from your device's external flash to your computer.  It defaults to saving the key to a file named ```<deviceID>.der``` or you can specify a filename on the command line. The ```particle keys``` tools requires openssl to be installed.

```sh
# creates a backup of the private key from your device
$ particle keys save
Saved existing key to 0123456789abcdef78901234.der

# creates a backup of the private key from your device to named file
$ particle keys save backup.der
Saved existing key to backup.der
```


### particle keys send

Sends a device's public key to the cloud for use in opening an encrypted session with your device.  Please make sure your device has the corresponding private key loaded using the ```particle keys load``` command. The ```particle keys``` tools requires openssl to be installed.

```sh
# sends a new public key to the API for the connected device
$ particle keys send
attempting to add a new public key for device 0123456789abcdef78901234
submitting public key succeeded!

# sends a new public key to the API for use for another device
$ particle keys send 0123456789abcdef78901234 device.der
attempting to add a new public key for device 0123456789abcdef78901234
submitting public key succeeded!
```


### particle keys server

Switches the server public key stored on the device's external flash. This command is important when changing which server your device is connecting to, and the server public key helps protect your connection. Your device will stay in DFU mode after this command, so that you can load new firmware to connect to your server. By default this will only change the server key associated with the default protocol for a device.


```sh
# change the server key
$ particle keys server my_server.der

# restore the default server key
$ particle keys server
```


#### Encoding a server address and port

When using the local cloud you can ask the CLI to encode the IP or DNS address into your key to control where your device will connect. You may also specify a port number to be included.

```sh
$ particle keys server my_server.der --host 192.168.1.10
$ particle keys server my_server.der --host 192.168.1.10 --port 9000
```


### particle keys address

Reads and displays the server address, port, and protocol from a device.

```sh
$ particle keys address
udp://$id.udp.particle.io:5684
```


## particle nyan

Make your device shout rainbows. Useful in a hackerspace-type setting to easily identify a specific device, or to verify that your device can receive commands from the cloud.

```sh
# Activates the "shouting rainbow LED" sequence
$ particle nyan
$ particle nyan my_device_id on
$ particle nyan my_device_id off
$ particle nyan all on
$ particle nyan [on/off]
$ particle nyan [device_id/all] [on/off]
```


## particle config

The config command lets you create groups of settings and quickly switch to a profile by calling `particle config <profile-name>`. This is especially useful for switching to your local server or between other environments.

Calling `particle config particle` will switch **Particle-Cli** back to the Particle Device Cloud API server.

```sh
$ particle config my-profile-name // switch to a new profile called 'my-profile-name'
$ particle config particle // switch back to your default profile
$ particle config local apiUrl http://localhost:8080  //creates a new profile with name "local" and saves the IP-address parameter
$ particle config set proxyUrl http://proxy:8080 //changes the proxy url for the current profile
$ particle config useSudoForDfu true // sets the `useSudoForDfu` option to `true`
```

Calling `particle config` will output your current config settings.

```sh
$ particle config
Current profile: particle
Using API: https://api.particle.io
Access token: 01234567890abcdef01234567890abcdef012345
```


## particle binary

Inspect binaries


### particle binary inspect

Describe binary generated by compile.

```sh
$ particle binary inspect file.bin
file.bin
 CRC is ok (06276dc6)
 Compiled for photon
 This is a system module number 2 at version 6
 It depends on a system module number 1 at version 6
```

You can also inspect a .zip file containing a binary with additional assets.

## particle token


### particle token create
Create a new access token under your Particle account.

```sh
$ particle token create
? Using account cli@particle.io
Please enter your password: *******
New access token expires on Fri Jun 23 2017 23:09:24 GMT+0800 (SGT)
		da39a3ee5e6b4b0d3255bfef95601890afd80709
```

In order to change the duration a token is valid, use `--expires-in <seconds>` option. The default if not specified is 90 days.

```sh
$ particle token create --expires-in 600
```

To make a non-expiring token, use the `--never-expires` option. Short lived tokens are better for security. Reserve non-expiring tokens for hosted web applications that need to access the Particle API reliably over an indefinite period of time.


```sh
$ particle token create --never-expires
```


### particle token revoke
Revoke an access token under your Particle account.

```sh
$ particle token revoke ACCESS_TOKEN
? Using account cli@particle.io
Please enter your password: *******
successfully deleted ACCESS_TOKEN
```

The only available option is `--force` which is necessary if you want to delete the access token used by the CLI itself.


## particle product [BETA]

Access Particle Product functionality


### particle product device add

Adds one or more devices into a Product


```sh
# add device id `0123456789abcdef01234567` into product `12345`
$ particle product device add 12345 0123456789abcdef01234567
```

...or upload a `.txt` file with a single column of device ids

```sh
# add a list of devices into product `12345`
$ particle product device add 12345 --file ./path/to/device_ids.txt
```


### particle product device list

List all devices that are part of a product


```sh
# lists devices in product `12345`
$ particle product device list 12345
```
