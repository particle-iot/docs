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


###spark help

  Shows you what commands are available, and how to use them.  You can also give the name of a command for detailed help.
  
```sh
$ spark help
$ spark help keys 
```


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

  Sends a firmware binary, a source file, or a directory of source files, or a known app to your core.

####Flashing a directory

```sh
$ spark flash 0123456789ABCDEFGHI my_project
```

####Flashing one or more source files

```sh
$ spark flash 0123456789ABCDEFGHI app.ino library1.cpp library1.h
```

####Flashing a known app

```sh
$ spark flash 0123456789ABCDEFGHI tinker
$ spark flash 0123456789ABCDEFGHI cc3000
```

####Compiling remotely and Flashing locally

To work locally, but use the cloud compiler, simply use the compile command, and then the local flash command after.  Make sure you connect your core via USB and place it into [dfu mode](http://docs.spark.io/#/connect/appendix-dfu-mode-device-firmware-upgrade)

```sh
$ spark compile my_project_folder --saveTo firmware.bin
OR
$ spark compile app.ino library1.cpp library1.h --saveTo firmware.bin
$ spark flash --usb firmware.bin
```



###spark call

  Calls a function on one of your cores, use ```spark list``` to see which cores are online, and what functions are available.

    $ spark call 0123456789ABCDEFGHI digitalWrite "D7,HIGH"
    1



###spark get

  Retrieves a variable value from one of your cores, use ```spark list``` to see which cores are online, and what variables are available.

    $ spark get 0123456789ABCDEFGHI temperature
    72.1



###spark variable monitor

  Pulls the value of a variable at a set interval, and optionally display a timestamp
  
  * Minimum delay for now is 500 (there is a check anyway if you keyed anything less)
  * "ctrl + c" in the console stops the monitoring

```sh
$ spark variable monitor 0123456789ABCDEFGHI temperature 5000
$ spark variable monitor 0123456789ABCDEFGHI temperature 5000 --time
$ spark variable monitor all temperature 5000
$ spark variable monitor all temperature 5000 --time
$ spark variable monitor all temperature 5000 --time > my_temperatures.csv
```


###spark identify

  Retrieves your core id when the core is connected via USB and in listening mode (flashing blue).

```sh
$ spark identify
$ spark identify 1
$ spark identify COM3
$ spark identify /dev/cu.usbmodem12345

$ spark identify
0123456789ABCDEFGHI
```



###spark serial list

  Shows currently connected Spark Core's acting as serial devices over USB

``` $ spark serial list ```


###spark serial monitor

  Starts listening to the specified serial device, and echoes to the terminal

```sh
$ spark serial monitor
$ spark serial monitor 1
$ spark serial monitor COM3
$ spark serial monitor /dev/cu.usbmodem12345
```


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

