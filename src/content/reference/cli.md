---
word: CLI
title: Command Line Interface (CLI)
template: reference.hbs
columns: three
order: 3
---

# CLI Command Reference


## particle setup Wi-Fi

  Helpful shortcut for adding another Wi-Fi network to a device connected over USB.  Make sure your device is connected via a USB cable, and is slow blinking blue [listening mode](/guide/getting-started/modes/#listening-mode)

```sh
# how to just update your wifi settings.
# Make sure your device is connected and in listening mode first
$ particle setup wifi
```


## particle login

  Login and save an access token for interacting with your account on the Particle Cloud.

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
my_device_name (0123456789ABCDEFGHI) 0 variables, and 4 functions
  Functions:
    int digitalWrite(string)
    int digitalRead(string)
    int analogWrite(string)
    int analogRead(string)

```

## particle call

  Calls a function on one of your devices, use ```particle list``` to see which devices are online, and what functions are available.

```sh
# how to call a function on your device
$ particle call 0123456789ABCDEFGHI digitalWrite "D7,HIGH"
1
```

## particle get

  Retrieves a variable value from one of your devices, use ```particle list``` to see which devices are online, and what variables are available.

```sh
# how to get a variable value from a device
$ particle get 0123456789ABCDEFGHI temperature
72.1
```


## particle device

### particle device add

  Adds a new device to your account.
  
  Your device will need to be connected to the Internet (onboard LED breathing cyan) for this process to work.

```sh
# how to add a new device to your account
$ particle device add 0123456789ABCDEFGHI
Claiming device 0123456789ABCDEFGHI
Successfully claimed device 0123456789ABCDEFGHI
```


### particle device rename

  Assigns a new name to a device you've claimed

```sh
# how to change the name of your device
$ particle device rename 0123456789ABCDEFGHI "pirate frosting"
```



### particle device remove

  Removes a device from your account so someone else can claim it.

```sh
# how to remove a device from your account
$ particle device remove 0123456789ABCDEFGHI
Are you sure?  Please Type yes to continue: yes
releasing device 0123456789ABCDEFGHI
server said  { ok: true }
Okay!
```


## particle flash

  Sends a firmware binary, a source file, or a directory of source files, or a known app to your device.

### Flashing a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.

```sh
# how to compile and flash a directory of source code to your device
$ particle flash 0123456789ABCDEFGHI my_project
```

### Flashing one or more source files

```sh
# how to compile and flash a list of source files to your device
$ particle flash 0123456789ABCDEFGHI app.ino library1.cpp library1.h
```

### Target a specific firmware version for flashing

You can compile and flash your application against a specific firmware version using the `--target` flag. If you don't specify `target` your code will compile against the latest released firmware.

This is useful if you are not ready to upgrade to the latest system firmware on your device or if you want to try a pre-release version.

```sh
# compile your application with the 0.5.0 system firmware and flash it
$ particle flash --target 0.5.0 0123456789ABCDEFGHI my_project
```

### Compiling remotely and flashing locally

To work locally, but use the cloud compiler, simply use the compile command, and then the local flash command after.  Make sure you connect your device via USB and place it into [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-).

```sh
# how to compile a directory of source code and tell the CLI where to save the results
$ particle compile photon my_project_folder --saveTo firmware.bin
OR
# how to compile a list of source files
$ particle compile photon app.ino library1.cpp library1.h --saveTo firmware.bin

# how to flash a pre-compiled binary over usb to your device
# make sure your device is flashing yellow and connected via USB
# requires dfu-util to be installed
$ particle flash --usb firmware.bin
```


## particle compile

  Compiles one or more source file, or a directory of source files, and downloads a firmware binary.

  **NOTE**: Remember that **\*.cpp** and **\*.ino** files behave differently. You can read more about it on our [support page](http://support.particle.io/hc/en-us/articles/204952620).

```text
This is device specific and must be passed as an argument during compilation.

The devices available are:

- photon (alias is 'p')
- core (alias is 'c')

eg. `particle compile photon xxx` OR `particle compile p xxxx` both targets the photon
```

### compiling a directory

You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.

```sh
# how to compile a directory of source code
$ particle compile photon my_project_folder
# by default the current directory will be compiled
$ particle compile photon
```


### Compiling one or more source files

```sh
# how to compile a list of source files
$ particle compile photon app.ino library1.cpp library1.h
```

### Target a specific firmware version for compiling

You can compile your application against a specific firmware version use the `--target` flag. If you don't specific `target` your code will compile against the latest released firmware.

This is useful if you are not ready to upgrade to the latest system firmware on your device.

```sh
# compile your application with the 0.5.0 system firmware
$ particle compile photon --target 0.5.0 my_project
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

To make your own library you can use `particle library init` to get a folder structure with all the files you'll need and customize it from there.

```sh
$ mkdir mylib
# create a library mylib
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
webhook parameters, see the [REST API documentation](/reference/api/#create-a-webhook). This command is only available for user webhooks.

```sh
$ particle webhook create temperature https://mysite.com
$ particle webhook create temperature https://mysite.com 0123456789ABCDEFGHI
$ particle webhook create webhook.json
```

```sh
# An example custom webhook JSON file that will target Librato, webhook.json
{
    "event": "librato_",
    "url": "https://metrics-api.librato.com/v1/metrics",
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


## particle monitor

  Pulls the value of a variable at a set interval, and optionally display a timestamp

  * Minimum delay for now is 500 (there is a check anyway if you keyed anything less)
  * hitting ```CTRL + C``` in the console will exit the monitoring

```sh
# how to poll for a variable value from one or more devices continuously
$ particle monitor 0123456789ABCDEFGHI temperature 5000
$ particle monitor 0123456789ABCDEFGHI temperature 5000 --time
$ particle monitor all temperature 5000
$ particle monitor all temperature 5000 --time
$ particle monitor all temperature 5000 --time > my_temperatures.csv
```


## particle identify

  Retrieves your device id when the device is connected via USB and in listening mode (flashing blue).

```sh
# helps get your device id via usb and serial
# make sure your device is connected and blinking blue
$ particle identify
$ particle identify 1
$ particle identify COM3
$ particle identify /dev/cu.usbmodem12345

$ particle identify
0123456789ABCDEFGHI
```

## particle subscribe

  Subscribes to published events on the cloud, and pipes them to the console.  Special device name "mine" will subscribe to events from just your devices.


```sh
# opens a connection to the API so you can stream events coming from your devices
$ particle subscribe
$ particle subscribe mine
$ particle subscribe eventName
$ particle subscribe eventName mine
$ particle subscribe eventName CoreName
$ particle subscribe eventName 0123456789ABCDEFGHI
```

## particle publish

  Publishes events to the cloud via API, similar to running Particle.publish() on a Particle Device.
  
```sh
$ particle publish eventName data
```

## particle serial

### particle serial list

  Shows currently connected Particle Core's acting as serial devices over USB

```sh
# shows a list of devices connected via serial usb
$ particle serial list
```


### particle serial monitor

  Starts listening to the specified serial device, and echoes to the terminal

```sh
# opens a read-only serial monitor for a particular device
$ particle serial monitor
$ particle serial monitor 1
$ particle serial monitor COM3
$ particle serial monitor /dev/cu.usbmodem12345
```

## particle keys

### particle keys doctor

Helps you update your keys, or recover your device when the keys on the server are out of sync with the keys on your device.  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.

Connect your device in [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-), and run this command to replace the unique cryptographic keys on your device.  Automatically attempts to send the new public key to the cloud as well.

```sh
# helps repair key issues on a device
$ particle keys doctor 0123456789ABCDEFGHI
```


### particle keys new

Generates a new public / private key pair that can be used on a device.

```sh
# generates a new public/private keypair
$ particle keys new
running openssl genrsa -out device.pem 1024
running openssl rsa -in device.pem -pubout -out device.pub.pem
running openssl rsa -in device.pem -outform DER -out device.der
New Key Created!

# generates a new public/private keypair with the filename mykey
$ particle keys new mykey
running openssl genrsa -out mykey.pem 1024
running openssl rsa -in mykey.pem -pubout -out mykey.pub.pem
running openssl rsa -in mykey.pem -outform DER -out mykey.der
New Key Created!
```

### particle keys load

Copies a ```.DER``` formatted private key onto your device's external flash.  Make sure your device is connected and in [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-).  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.  Make sure any key you load is sent to the cloud with ```particle keys send device.pub.pem```

```sh
# loads a key to your device via USB
# make sure your device is connected and blinking yellow
# requires dfu-util
$ particle keys load device.der
...
Saved!
```

### particle keys save

Copies a ```.DER``` formatted private key from your device's external flash to your computer.  Make sure your device is connected and in [DFU mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-).  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.

```sh
# creates a backup of the private key from your device to a file
# requires dfu-util
$ particle keys save device.der
...
Saved!
```

### particle keys send

Sends a device's public key to the cloud for use in opening an encrypted session with your device.  Please make sure your device has the corresponding private key loaded using the ```particle keys load``` command.

```sh
# sends a new public key to the API for use for your device
$ particle keys send 0123456789ABCDEFGHI device.pub.pem
submitting public key succeeded!
```

### particle keys server

Switches the server public key stored on the device's external flash.  This command is important when changing which server your device is connecting to, and the server public key helps protect your connection.   Your device will stay in DFU mode after this command, so that you can load new firmware to connect to your server.

Coming Soon - more commands to make it easier to change the server settings on your device!


```sh
# changes the public server key stored on your device
# (useful when switching servers)
$ particle keys server my_server.der
Okay!  New keys in place, your device will not restart.
```
