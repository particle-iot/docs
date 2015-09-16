---
word: CLI
title: Command Line
order: 4
columns: two
template: guide.hbs
---

# Particle CLI


The Particle CLI is a powerful tool for interacting with your devices and the Particle Cloud.  The CLI uses [node.js](http://nodejs.org/) and can easily run on Windows, Mac OS X, and Linux.  It's also [open source](https://github.com/spark/particle-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/using-pull-requests/) if you want to share!

## Installing

  First, make sure you have [node.js](http://nodejs.org/) installed!

  Next, open a command prompt or terminal, and install by typing:

```sh
# how to install the particle-cli
$ npm install -g particle-cli
$ particle login
```

For more advanced install instructions, see below.

### Upgrading from the Spark CLI


If you have already installed `spark-cli`, please uninstall it before installing the Particle CLI. Simply type: `npm uninstall -g spark-cli` into the command line.

Once this is done, then run `npm install -g particle-cli` to install the Particle CLI.

### Advanced Install

To use the local flash and key features you'll also need to install [dfu-util](https://s3.amazonaws.com/spark-assets/dfu-util-0.8-binaries.tar.xz), and [openssl](http://www.openssl.org/).  They are freely available and open-source, and there are installers and binaries for most major platforms.

Here are some great tutorials on the community for full installs:

[Installing on Ubuntu 12.04](https://community.particle.io/t/how-to-install-spark-cli-on-ubuntu-12-04/3474)

[Installing on Ubuntu 14.04](https://community.particle.io/t/how-to-install-the-spark-toolchain-in-ubuntu-14-04/4139)

[Installing on Windows](https://community.particle.io/t/tutorial-spark-cli-on-windows-06-may-2014/3112)

[Installing on Mac](http://community.particle.io/t/tutorial-particle-cli-on-mac-osx-07-jun-2015/5225)


### Upgrading to the latest version

To upgrade Particle-CLI, enter the following command:

```sh
# how to update the particle-cli
$ npm update -g particle-cli
```


### Running from source (advanced)

To grab the CLI source and play with it locally

```sh
# how to get the source code for the CLI
$ git clone git@github.com:spark/particle-cli.git
$ cd particle-cli
$ npm install
$ node app.js help
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



## Update your device remotely

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

## Reference
For more info on CLI commands, go [here](../../../../reference/cli).
