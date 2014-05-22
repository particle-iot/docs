Spark CLI
==========

The Spark CLI is a powerful tool for interacting with your cores and the Spark Cloud.  The CLI uses [node.js](http://nodejs.org/) and can run on Windows, Mac OS X, and Linux fairly easily.  It's also [open source](https://github.com/spark/spark-cli) so you can edit and change it, and even send in your changes as [pull requests](https://help.github.com/articles/using-pull-requests) if you want to share!

Installing
=======

  First, make sure you have node installed!  http://nodejs.org/

  Then you can install the cli by typing:

    npm install -g spark-cli
    spark cloud login


Install (advanced)
---------------------------

To use the local flash and key features you'll need to install [dfu-util](http://dfu-util.gnumonks.org/), and [openssl](http://www.openssl.org/).  There are freely available, and there are installers and binaries for most major platforms as well.  

There are some great tutorials on the community for full installs:

[Installing on Ubuntu](https://community.spark.io/t/how-to-install-spark-cli-on-ubuntu-12-04/3474)

[Installing on Windows](https://community.spark.io/t/tutorial-spark-cli-on-windows-06-may-2014/3112)


Upgrading
---------------------------
To upgrade Spark-CLI, enter the following command:

    npm update -g spark-cli


Running from source (advanced)
---------------------------
To grab the CLI source and play with it locally

    git clone git@github.com:spark/spark-cli.git
    cd spark-cli/js
    node app.js help




Getting Started / Documentation
===============

###spark setup

  Guides you through creating a new account, and claiming your core!

``` $ spark setup```


###spark login

  Login and save an access token for interacting with your account on the Spark Cloud.

``` $ spark login ```


###spark list

Generates a list of what cores you own, and displays information about their status, including what variables and functions are available

```sh
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

###spark core add

  Claims a new core onto your account

```sh 
$ spark cloud claim 0123456789ABCDEFGHI
Claiming core 0123456789ABCDEFGHI
Successfully claimed core 0123456789ABCDEFGHI
```


###spark core rename

  Assigns a new name to a core you've claimed

```$ spark core rename 0123456789ABCDEFGHI "pirate frosting" ```



###spark core remove

  Removes a core from your account so someone else can claim it.

```sh
$ node app.js core remove 0123456789ABCDEFGHI
Are you sure?  Please Type yes to continue: yes
releasing core 0123456789ABCDEFGHI
server said  { ok: true }
Okay!
```


###spark flash

  Send a firmware binary, a source file, or a directory of source files to your core.



    > spark cloud flash 0123456789ABCDEFGHI core-firmware.bin
    > spark cloud flash 0123456789ABCDEFGHI my_application.ino
    > spark cloud flash 0123456789ABCDEFGHI /projects/big_app/src


###spark cloud compile

    > spark cloud compile my_application.ino
    > spark cloud compile /projects/big_app/src
    > spark cloud compile main.ino SomeLib.h SomeLib.cpp OtherStuff.h
    > spark cloud compile main.ino SomeLib.h SomeLib.cpp OtherStuff.h output.bin
    > spark cloud compile main.ino SomeLib.h SomeLib.cpp OtherStuff.h --saveTo ~/output.bin

  Create and download a firmware binary, by cloud compiling a source file, or a directory of source files


###spark flash firmware

``` > spark flash firmware core-firmware.bin ```

  When your core is flashing yellow (in dfu mode), and connected to your computer, flash your binary locally over USB.


###spark variable list

``` > spark variable list ```

  Gets a list of all your cores and the exposed variables of the cores that are online.


###spark variable get

    > spark variable get 0123456789ABCDEFGHI temperature
    > spark variable get all temperature

  Retrieves the value of that variable from one or all cores


###spark variable monitor

    > spark variable monitor 0123456789ABCDEFGHI temperature 5000
    > spark variable monitor 0123456789ABCDEFGHI temperature 5000 --time
    > spark variable monitor all temperature 5000
    > spark variable monitor all temperature 5000 --time
    > spark variable monitor all temperature 5000 --time > my_temperatures.csv

  Pulls the value of a variable at a set interval, and optionally display a timestamp
  
  * Minimum delay for now is 500 (there is a check anyway if you keyed anything less)
  * "ctrl + c" in the console stops the monitoring

###spark function list

``` > spark function list ```

  Gets a list of all your cores and the exposed functions of the cores that are online.


###spark function call

    > spark function call
    > spark function call 0123456789ABCDEFGHI functionName "Here is my string"

  Call a particular function on your core, and show the return value


###spark serial list

``` > spark serial list ```

  Shows currently connected Spark Core's acting as serial devices over USB

###spark serial monitor

    > spark serial monitor
    > spark serial monitor 1
    > spark serial monitor COM3
    > spark serial monitor /dev/cu.usbmodem12345

  Starts listening to the specified serial device, and echoes to the terminal


###spark serial wifi

    > spark serial wifi
    > spark serial wifi 1
    > spark serial wifi COM3
    > spark serial wifi /dev/cu.usbmodem12345

  Helpful shortcut for configuring Wi-Fi credentials over serial when your core is connected and in listening mode (flashing blue)

###spark serial identify

    > spark serial identify
    > spark serial identify 1
    > spark serial identify COM3
    > spark serial identify /dev/cu.usbmodem12345

  Retrieves your core id when the core is connected and in listening mode (flashing blue)


###spark keys doctor

``` > spark keys doctor 0123456789ABCDEFGHI```

  Runs a series of steps to generate a new public/private keypair, and send it to the server for your core.  Helpful
  for recovering from key issues.


###spark subscribe

    > spark subscribe
    > spark subscribe mine
    > spark subscribe eventName
    > spark subscribe eventName mine
    > spark subscribe eventName CoreName
    > spark subscribe eventName 0123456789ABCDEFGHI


  Subscribes to published events on the cloud, and pipes them to the console.  Special core name "mine" will subscribe to events from just your cores.

