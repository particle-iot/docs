---
word: API
title: Command Line
order: 13
---

Spark CLI
==========

The Spark CLI is a powerful tool for interacting with your cores and the Spark Cloud.  The CLI uses [node.js](http://nodejs.org/) and can run on Windows, Mac OS X, and Linux fairly easily.  It's also [open source](https://github.com/spark/spark-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/using-pull-requests) if you want to share!

Installing
=======

  First, make sure you have [node.js](http://nodejs.org/) installed!

  Next, open a command prompt or terminal, and install by typing:

```sh
# how to install the spark-cli
$ npm install -g spark-cli
$ spark cloud login
```

Advanced Install
---------------------------

To use the local flash and key features you'll also need to install [dfu-util](http://dfu-util.sourceforge.net/), and [openssl](http://www.openssl.org/).  They are freely available and open-source, and there are installers and binaries for most major platforms.

Here are some great tutorials on the community for full installs:

[Installing on Ubuntu 12.04](https://community.spark.io/t/how-to-install-spark-cli-on-ubuntu-12-04/3474)

[Installing on Ubuntu 14.04](https://community.spark.io/t/how-to-install-the-spark-toolchain-in-ubuntu-14-04/4139)

[Installing on Windows](https://community.spark.io/t/tutorial-spark-cli-on-windows-06-may-2014/3112)


Upgrading to the latest version
---------------------------
To upgrade Spark-CLI, enter the following command:

```sh
# how to update the spark-cli
$ npm update -g spark-cli
```


Running from source (advanced)
---------------------------
To grab the CLI source and play with it locally

```sh
# how to get the source code for the CLI
$ git clone git@github.com:spark/spark-cli.git
$ cd spark-cli/js
$ node app.js help
```





Getting Started
===============

  These next two commands are all you need to get started setting up an account, claiming a core, and discovering new features.


###spark setup

  This command will guide you through logging in or creating a new account as well as claiming your core!


```sh
# how to setup your account and your core
$ spark setup
```


###spark help

  Shows you what commands are available and how to use them.  You can also give the name of a command for detailed help.

```sh
# how to get help
$ spark help
$ spark help keys
```



Blink an LED with Tinker
============

If you're just opening a new core, chances are it's already loaded with Tinker, the app we load at the factory.  If you don't have Tinker, or if you've been using the build IDE already, let's load it quickly by typing:

```sh
# How to re-load tinker onto a core
$ spark flash my_new_core_name tinker
Including:
/usr/local/lib/node_modules/spark-cli/binaries/spark_tinker.bin
attempting to flash firmware to your core my_new_core_name
flash core said  {"id":"0123456789ABCDEFGHI","status":"Update started"}
```


Let's make sure your core is online and loaded with Tinker.  We should see the four characteristic functions exposed by Tinker, "digitalwrite", "digitalread", "analogwrite", and "analogread".

```sh
# how to show all your cores and their functions and variables
$ spark list

Checking with the cloud...
Retrieving cores... (this might take a few seconds)
my_core_name (0123456789ABCDEFGHI) 0 variables, and 4 functions
  Functions:
    int digitalread(String args)
    int digitalwrite(String args)
    int analogread(String args)
    int analogwrite(String args)

```

Let's try turning on the LED attached to pin D7 on your core.

```sh
# how to call a function on your core
$ spark call my_core_name digitalwrite D7,HIGH
1
$ spark call my_core_name digitalwrite D7,LOW
1
```

Nice!  You should have seen the small blue LED turn on, and then off.



Update your core remotely
=========================

You can write whole apps and flash them remotely from the command line just as you would from the build IDE.  Let's write a small blink sketch to try it out.

Copy and paste the following program into a file called blinky.ino

```ino
#Copy me to blinky.ino
#define PIN D7
int state = 0;

void setup() {
    //tell the core we want to write to this pin
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
# how to compile a program without flashing to your core
$ spark compile blinky.ino
Including:
blinky.ino
attempting to compile firmware
pushing file: blinky.ino
grabbing binary from: https://api.spark.io/v1/binaries/01234567890ABCDEFGH
saved firmware to firmware_123456781234.bin
Compiled firmware downloaded.
```


Now that we have a valid program, let's flash it to our core!  We can use either the source code again, or we can send our binary.

```sh
# how to flash a program to your core (from source code)
$ spark flash my_core_name blinky.ino

# OR - how to flash a pre-compiled binary to your core
$ spark flash my_core_name firmware_123456781234.bin
Including:
firmware_123456781234.bin
attempting to flash firmware to your core my_core_name
flash core said  {"id":"01234567890ABCDEFGH","status":"Update started"}
```



Command Reference
================

###spark setup wifi

  Helpful shortcut for adding another wifi network to a core connected over USB.  Make sure your core is connected via a USB cable, and is slow blinking blue [listening mode](http://docs.spark.io/#/connect)

```sh
# how to just update your wifi settings.
# Make sure your core is connected and in listening mode first
$ spark setup wifi
```


###spark login

  Login and save an access token for interacting with your account on the Spark Cloud.

```sh
# how to login - creates and saves an access token for your session with the CLI
$ spark login
```


###spark logout

  Logout and optionally revoke the access token for your CLI session.

```sh
# how to remove your saved access token, and optionally revoke that token as well
$ spark logout
```


###spark list

Generates a list of what cores you own, and displays information about their status, including what variables and functions are available

```sh
# how to show what cores of yours are online
# and what functions and variables are available
$ spark list

Checking with the cloud...
Retrieving cores... (this might take a few seconds)
my_core_name (0123456789ABCDEFGHI) 0 variables, and 4 functions
  Functions:
    int digitalWrite(string)
    int digitalRead(string)
    int analogWrite(string)
    int analogRead(string)

```

###spark cloud claim

  Adds a new core to your account

```sh
# how to add a new core to your account
$ spark cloud claim 0123456789ABCDEFGHI
Claiming core 0123456789ABCDEFGHI
Successfully claimed core 0123456789ABCDEFGHI
```


###spark core rename

  Assigns a new name to a core you've claimed

```sh
# how to change the name of your core
$ spark core rename 0123456789ABCDEFGHI "pirate frosting"
```



###spark core remove

  Removes a core from your account so someone else can claim it.

```sh
# how to remove a core from your account
$ spark core remove 0123456789ABCDEFGHI
Are you sure?  Please Type yes to continue: yes
releasing core 0123456789ABCDEFGHI
server said  { ok: true }
Okay!
```


###spark flash

  Sends a firmware binary, a source file, or a directory of source files, or a known app to your core.

####Flashing a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.  You can also create ```spark.include``` and / or a ```spark.ignore``` file in that directory that will tell the CLI specifically which files to use or ignore.

```sh
# how to compile and flash a directory of source code to your core
$ spark flash 0123456789ABCDEFGHI my_project
```

####Flashing one or more source files

```sh
# how to compile and flash a list of source files to your core
$ spark flash 0123456789ABCDEFGHI app.ino library1.cpp library1.h
```

####Flashing a known app

  Two pre-built apps are included with the CLI to help you get back on track.  Tinker, and the CC3000 patching app.  You can flash these both over the cloud or locally via USB and dfu-util through the CLI.

```sh
# how to flash a "known app" like tinker, or the cc3000 patcher to your core
$ spark flash 0123456789ABCDEFGHI tinker
$ spark flash 0123456789ABCDEFGHI cc3000

# how to flash if your core is blinking yellow and connected over usb
# requires dfu-util
$ spark flash --usb tinker
$ spark flash --usb cc3000
```




####Compiling remotely and Flashing locally

To work locally, but use the cloud compiler, simply use the compile command, and then the local flash command after.  Make sure you connect your core via USB and place it into [dfu mode](http://docs.spark.io/#/connect/appendix-dfu-mode-device-firmware-upgrade).

```sh
# how to compile a directory of source code and tell the CLI where to save the results
$ spark compile my_project_folder --saveTo firmware.bin
OR
# how to compile a list of source files
$ spark compile app.ino library1.cpp library1.h --saveTo firmware.bin

# how to flash a pre-compiled binary over usb to your core
# make sure your core is flashing yellow and connected via USB
# requires dfu-util to be installed
$ spark flash --usb firmware.bin
```


###spark compile

  Compiles one or more source file, or a directory of source files, and downloads a firmware binary.

####compiling a directory

  You can setup a directory of source files and libraries for your project, and the CLI will use those when compiling remotely.  You can also create ```spark.include``` and / or a ```spark.ignore``` file in that directory that will tell the CLI specifically which files to use or ignore.  Those files are just plain text with one line per filename

```sh
# how to compile a directory of source code
$ spark compile my_project_folder
```

####example spark.include

  The spark.include and spark.ignore files are just regular text files with one filename per line.  If your directory has one of these files, the CLI will use it to try and determine what to include or ignore when compiling your app.

```text
# spark.include
application.cpp
library1.h
library1.cpp
```

####example spark.ignore

```text
# spark.ignore
.ds_store
logo.png
old_version.cpp
```


####Compiling one or more source files

```sh
# how to compile a list of source files
$ spark compile app.ino library1.cpp library1.h
```




###spark call

  Calls a function on one of your cores, use ```spark list``` to see which cores are online, and what functions are available.

```sh
# how to call a function on your core
$ spark call 0123456789ABCDEFGHI digitalWrite "D7,HIGH"
1
```



###spark get

  Retrieves a variable value from one of your cores, use ```spark list``` to see which cores are online, and what variables are available.

```sh
# how to get a variable value from a core
$ spark get 0123456789ABCDEFGHI temperature
72.1
```



###spark monitor

  Pulls the value of a variable at a set interval, and optionally display a timestamp

  * Minimum delay for now is 500 (there is a check anyway if you keyed anything less)
  * hitting ```CTRL + C``` in the console will exit the monitoring

```sh
# how to poll for a variable value from one or more cores continuously
$ spark monitor 0123456789ABCDEFGHI temperature 5000
$ spark monitor 0123456789ABCDEFGHI temperature 5000 --time
$ spark monitor all temperature 5000
$ spark monitor all temperature 5000 --time
$ spark monitor all temperature 5000 --time > my_temperatures.csv
```


###spark identify

  Retrieves your core id when the core is connected via USB and in listening mode (flashing blue).

```sh
# helps get your core id via usb and serial
# make sure your core is connected and blinking blue
$ spark identify
$ spark identify 1
$ spark identify COM3
$ spark identify /dev/cu.usbmodem12345

$ spark identify
0123456789ABCDEFGHI
```

###spark subscribe

  Subscribes to published events on the cloud, and pipes them to the console.  Special core name "mine" will subscribe to events from just your cores.


```sh
# opens a connection to the API so you can stream events coming from your cores
$ spark subscribe
$ spark subscribe mine
$ spark subscribe eventName
$ spark subscribe eventName mine
$ spark subscribe eventName CoreName
$ spark subscribe eventName 0123456789ABCDEFGHI
```




###spark serial list

  Shows currently connected Spark Core's acting as serial devices over USB

```sh
# shows a list of cores connected via serial usb
$ spark serial list
```


###spark serial monitor

  Starts listening to the specified serial device, and echoes to the terminal

```sh
# opens a read-only serial monitor for a particular core
$ spark serial monitor
$ spark serial monitor 1
$ spark serial monitor COM3
$ spark serial monitor /dev/cu.usbmodem12345
```


###spark keys doctor

Helps you update your keys, or recover your core when the keys on the server are out of sync with the keys on your core.  The ```spark keys``` tools requires both dfu-util, and openssl to be installed.

Connect your core in [dfu mode](http://docs.spark.io/#/connect/appendix-dfu-mode-device-firmware-upgrade), and run this command to replace the unique cryptographic keys on your core.  Automatically attempts to send the new public key to the cloud as well.

```sh
# helps repair key issues on a core
$ spark keys doctor 0123456789ABCDEFGHI
```


###spark keys new

Generates a new public / private keypair that can be used on a core.

```sh
# generates a new public/private keypair
$ spark keys new
running openssl genrsa -out core.pem 1024
running openssl rsa -in core.pem -pubout -out core.pub.pem
running openssl rsa -in core.pem -outform DER -out core.der
New Key Created!

# generates a new public/private keypair with the filename mykey
$ spark keys new mykey
running openssl genrsa -out mykey.pem 1024
running openssl rsa -in mykey.pem -pubout -out mykey.pub.pem
running openssl rsa -in mykey.pem -outform DER -out mykey.der
New Key Created!
```

###spark keys load

Copies a ```.DER``` formatted private key onto your core's external flash.  Make sure your core is connected and in [dfu mode](http://docs.spark.io/#/connect/appendix-dfu-mode-device-firmware-upgrade).  The ```spark keys``` tools requires both dfu-util, and openssl to be installed.  Make sure any key you load is sent to the cloud with ```spark keys send core.pub.pem```

```sh
# loads a key to your core via USB
# make sure your core is connected and blinking yellow
# requires dfu-util
$ spark keys load core.der
...
Saved!
```

###spark keys save

Copies a ```.DER``` formatted private key from your core's external flash to your computer.  Make sure your core is connected and in [dfu mode](http://docs.spark.io/#/connect/appendix-dfu-mode-device-firmware-upgrade).  The ```spark keys``` tools requires both dfu-util, and openssl to be installed.

```sh
# creates a backup of the private key from your core to a file
# requires dfu-util
$ spark keys save core.der
...
Saved!
```

###spark keys send

Sends a core's public key to the cloud for use in opening an encrypted session with your core.  Please make sure your core has the corresponding private key loaded using the ```spark keys load``` command.

```sh
# sends a new public key to the API for use for your core
$ spark keys send 0123456789ABCDEFGHI core.pub.pem
submitting public key succeeded!
```

###spark keys server

Switches the server public key stored on the core's external flash.  This command is important when changing which server your core is connecting to, and the server public key helps protect your connection.   Your core will stay in DFU mode after this command, so that you can load new firmware to connect to your server.

Coming Soon - more commands to make it easier to change the server settings on your core!


```sh
# changes the public server key stored on your core
# (useful when switching servers)
$ spark keys server my_server.der
Okay!  New keys in place, your core will not restart.
```
