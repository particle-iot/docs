---
title: Command Line Interface
template: docs.hbs
columns: two
device: core
---

Particle CLI
==========

The Particle CLI is a powerful tool for interacting with your devices and the Particle Cloud.  The CLI uses [node.js](http://nodejs.org/) and can easily run on Windows, Mac OS X, and Linux.  It's also [open source](https://github.com/particle/particle-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/using-pull-requests/) if you want to share!

Installing
=======

  First, make sure you have [node.js](http://nodejs.org/) installed!

  Next, open a command prompt or terminal, and install by typing:

```sh
# how to install the particle-cli
$ npm install -g particle-cli
$ particle login
```

Upgrading from the Spark CLI
======

If you have already installed `spark-cli`, please uninstall it before installing the Particle CLI. Simply type: `npm uninstall -g spark-cli` into the command line.

Once this is done, then run `npm install -g particle-cli` to install the Particle CLI.

Advanced Install
---------------------------

To use the local flash and key features you'll also need to install [dfu-util](http://dfu-util.sourceforge.net/), and [openssl](http://www.openssl.org/).  They are freely available and open-source, and there are installers and binaries for most major platforms.

Here are some great tutorials on the community for full installs:

[Installing on Ubuntu 12.04](https://community.particle.io/t/how-to-install-spark-cli-on-ubuntu-12-04/3474)

[Installing on Ubuntu 14.04](https://community.particle.io/t/how-to-install-the-spark-toolchain-in-ubuntu-14-04/4139)

[Installing on Windows](https://community.particle.io/t/tutorial-spark-cli-on-windows-06-may-2014/3112)


Upgrading to the latest version
---------------------------
To upgrade Particle-CLI, enter the following command:

```sh
# how to update the particle-cli
$ npm update -g particle-cli
```


Running from source (advanced)
---------------------------
To grab the CLI source and play with it locally

```sh
# how to get the source code for the CLI
$ git clone git@github.com:spark/particle-cli.git
$ cd particle-cli
$ npm install
$ node app.js help
```





Getting Started
===============

  These next two commands are all you need to get started setting up an account, claiming a device, and discovering new features.


###particle setup

  This command will guide you through logging in or creating a new account as well as claiming your device!


```sh
# how to setup your account and your device
$ particle setup
```


###particle help

  Shows you what commands are available and how to use them.  You can also give the name of a command for detailed help.

```sh
# how to get help
$ particle help
$ particle help keys
```



Blink an LED with Tinker
============

If you're just opening a new device, chances are it's already loaded with Tinker, the app we load at the factory.  If you don't have Tinker, or if you've been using the build IDE already, let's load it quickly by typing:

```sh
# How to re-load tinker onto a device
$ particle flash my_new_device_name tinker
Including:
/usr/local/lib/node_modules/particle-cli/binaries/particle_tinker.bin
attempting to flash firmware to your device my_new_device_name
flash device said  {"id":"0123456789ABCDEFGHI","status":"Update started"}
```


Let's make sure your device is online and loaded with Tinker.  We should see the four characteristic functions exposed by Tinker, "digitalwrite", "digitalread", "analogwrite", and "analogread".

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



Update your device remotely
=========================

You can write whole apps and flash them remotely from the command line just as you would from the build IDE.  Let's write a small blink sketch to try it out.

Copy and paste the following program into a file called blinky.ino

```ino
#Copy me to blinky.ino
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


Then let's compile that program to make sure it's valid code.  The CLI will automatically download the compiled binary of your program if everything went well, and show you the url.  The server will also keep a copy of your binary around for you for about 24 hours.


```sh
# how to compile a program without flashing to your device
$ particle compile blinky.ino
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



Command Reference
================

###particle setup wifi

  Helpful shortcut for adding another wifi network to a device connected over USB.  Make sure your device is connected via a USB cable, and is slow blinking blue [listening mode](/core/connect/#connecting-your-device-listening-mode)

```sh
# how to just update your wifi settings.
# Make sure your device is connected and in listening mode first
$ particle setup wifi
```


###particle login

  Login and save an access token for interacting with your account on the Particle Cloud.

```sh
# how to login - creates and saves an access token for your session with the CLI
$ particle login
```


###particle logout

  Logout and optionally revoke the access token for your CLI session.

```sh
# how to remove your saved access token, and optionally revoke that token as well
$ particle logout
```


###particle list

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

###particle device claim

  Adds a new device to your account

```sh
# how to add a new device to your account
$ particle device claim 0123456789ABCDEFGHI
Claiming device 0123456789ABCDEFGHI
Successfully claimed device 0123456789ABCDEFGHI
```


###particle device rename

  Assigns a new name to a device you've claimed

```sh
# how to change the name of your device
$ particle device rename 0123456789ABCDEFGHI "pirate frosting"
```



###particle device remove

  Removes a device from your account so someone else can claim it.

```sh
# how to remove a device from your account
$ particle device remove 0123456789ABCDEFGHI
Are you sure?  Please Type yes to continue: yes
releasing device 0123456789ABCDEFGHI
server said  { ok: true }
Okay!
```


###particle flash

  Sends a firmware binary, a source file, or a directory of source files, or a known app to your device.

####Flashing a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.  You can also create ```particle.include``` and / or a ```particle.ignore``` file in that directory that will tell the CLI specifically which files to use or ignore.

```sh
# how to compile and flash a directory of source code to your device
$ particle flash 0123456789ABCDEFGHI my_project
```

####Flashing one or more source files

```sh
# how to compile and flash a list of source files to your device
$ particle flash 0123456789ABCDEFGHI app.ino library1.cpp library1.h
```

####Flashing a known app

  Two pre-built apps are included with the CLI to help you get back on track.  Tinker, and the CC3000 patching app.  You can flash these both over the cloud or locally via USB and dfu-util through the CLI.

```sh
# how to flash a "known app" like tinker, or the cc3000 patcher to your device
$ particle flash 0123456789ABCDEFGHI tinker
$ particle flash 0123456789ABCDEFGHI cc3000

# how to flash if your device is blinking yellow and connected over usb
# requires dfu-util
$ particle flash --usb tinker
$ particle flash --usb cc3000
```




####Compiling remotely and Flashing locally

To work locally, but use the cloud compiler, simply use the compile command, and then the local flash command after.  Make sure you connect your device via USB and place it into [dfu mode](/core/modes/#core-modes-dfu-mode-device-firmware-upgrade).

```sh
# how to compile a directory of source code and tell the CLI where to save the results
$ particle compile my_project_folder --saveTo firmware.bin
OR
# how to compile a list of source files
$ particle compile app.ino library1.cpp library1.h --saveTo firmware.bin

# how to flash a pre-compiled binary over usb to your device
# make sure your device is flashing yellow and connected via USB
# requires dfu-util to be installed
$ particle flash --usb firmware.bin
```


###particle compile

  Compiles one or more source file, or a directory of source files, and downloads a firmware binary.

  **NOTE**: Remember that **\*.cpp** and **\*.ino** files behave differently. You can read more about it on our [support page](http://support.particle.io/hc/en-us/articles/204952620).

####compiling a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.  You can also create ```particle.include``` and / or a ```particle.ignore``` file in that directory that will tell the CLI specifically which files to use or ignore.  Those files are just plain text with one line per filename

```sh
# how to compile a directory of source code
$ particle compile my_project_folder
```

####example particle.include

  The particle.include and particle.ignore files are just regular text files with one filename per line.  If your directory has one of these files, the CLI will use it to try and determine what to include or ignore when compiling your app.

```text
# particle.include
application.cpp
library1.h
library1.cpp
```

####example particle.ignore

```text
# particle.ignore
.ds_store
logo.png
old_version.cpp
```


####Compiling one or more source files

```sh
# how to compile a list of source files
$ particle compile app.ino library1.cpp library1.h
```




###particle call

  Calls a function on one of your devices, use ```particle list``` to see which devices are online, and what functions are available.

```sh
# how to call a function on your device
$ particle call 0123456789ABCDEFGHI digitalWrite "D7,HIGH"
1
```



###particle get

  Retrieves a variable value from one of your devices, use ```particle list``` to see which devices are online, and what variables are available.

```sh
# how to get a variable value from a device
$ particle get 0123456789ABCDEFGHI temperature
72.1
```



###particle monitor

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


###particle identify

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

###particle subscribe

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




###particle serial list

  Shows currently connected Particle Core's acting as serial devices over USB

```sh
# shows a list of devices connected via serial usb
$ particle serial list
```


###particle serial monitor

  Starts listening to the specified serial device, and echoes to the terminal

```sh
# opens a read-only serial monitor for a particular device
$ particle serial monitor
$ particle serial monitor 1
$ particle serial monitor COM3
$ particle serial monitor /dev/cu.usbmodem12345
```


###particle keys doctor

Helps you update your keys, or recover your device when the keys on the server are out of sync with the keys on your device.  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.

Connect your device in [dfu mode](/core/modes/#core-modes-dfu-mode-device-firmware-upgrade), and run this command to replace the unique cryptographic keys on your device.  Automatically attempts to send the new public key to the cloud as well.

```sh
# helps repair key issues on a device
$ particle keys doctor 0123456789ABCDEFGHI
```


###particle keys new

Generates a new public / private keypair that can be used on a device.

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

###particle keys load

Copies a ```.DER``` formatted private key onto your device's external flash.  Make sure your device is connected and in [dfu mode](/core/modes/#core-modes-dfu-mode-device-firmware-upgrade).  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.  Make sure any key you load is sent to the cloud with ```particle keys send device.pub.pem```

```sh
# loads a key to your device via USB
# make sure your device is connected and blinking yellow
# requires dfu-util
$ particle keys load device.der
...
Saved!
```

###particle keys save

Copies a ```.DER``` formatted private key from your device's external flash to your computer.  Make sure your device is connected and in [dfu mode](/core/modes/#core-modes-dfu-mode-device-firmware-upgrade).  The ```particle keys``` tools requires both dfu-util, and openssl to be installed.

```sh
# creates a backup of the private key from your device to a file
# requires dfu-util
$ particle keys save device.der
...
Saved!
```

###particle keys send

Sends a device's public key to the cloud for use in opening an encrypted session with your device.  Please make sure your device has the corresponding private key loaded using the ```particle keys load``` command.

```sh
# sends a new public key to the API for use for your device
$ particle keys send 0123456789ABCDEFGHI device.pub.pem
submitting public key succeeded!
```

###particle keys server

Switches the server public key stored on the device's external flash.  This command is important when changing which server your device is connecting to, and the server public key helps protect your connection.   Your device will stay in DFU mode after this command, so that you can load new firmware to connect to your server.

Coming Soon - more commands to make it easier to change the server settings on your device!


```sh
# changes the public server key stored on your device
# (useful when switching servers)
$ particle keys server my_server.der
Okay!  New keys in place, your device will not restart.
```
