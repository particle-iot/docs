Connecting your Core
===

The easiest way to connect the Spark Core to Wi-Fi is using the Spark mobile app for iPhone or Android. But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the Spark Core must be in "listening" mode, which you'll know by its flashing blue LED:

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

The Core boots into listening mode by default, so if your Core is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds:

VINE

## Smart Config with the Spark app

Once you've downloaded the Spark Core app from the App Store or Google Play, you should create an account. Afterwords you'll be asked to connect your Core using a process called Smart Config. *NOTE: You must be connected to the Wi-Fi network that you want to connect the Core to.* Enter your Wi-Fi password and hit connect:

VINE

Smart Config can take up to a minute, so be patient. The closer your phone to your Spark Core, the faster it will connect. Once the Core hears the signal, it will go through the following sequence of lights:

- **Solid blue**: Credentials captured
- **Flashing green**: Connecting to Wi-Fi network
- **Flashing cyan**: Connecting to Spark Cloud
- **Breathing cyan**: Connected to Spark Cloud

It looks something like this:

VINE

Once the Spark Core has connected, your phone will "claim" the Core and attach it to your account. Then you'll get to name your Core:

VINE

*NOTE: If the Spark Core has been claimed by someone else, the app won't recognize it. If you need to transfer a Spark Core to another account, email us at [hello@spark.io](mailto:hello@spark.io).*

If you are connecting multiple Cores, you'll go through this naming process for each Core. You'll know which one is which by the rainbow signal:

VINE

Once you've finished naming your Cores, you can control them with Tinker! Try *digitalWrite* on D7 to turn on the user LED.

VINE

## Smart Config with the TI app

Smart Config with the Texas Instruments CC3000 app is similar to the process above, although you don't need an account with Spark, and TI also has a Java applet that can work from a Mac, Windows, or Linux computer.

Follow the instructions on Texas Instrument's website:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

The only thing that's different is that you'll need to activate the optional AES key and type `sparkdevices2013`.

*NOTE: TI's Android app is not available in Google Play; you'll have to download it off of their website and side-load the apk yourself.*

## Connect over USB

You can also connect the Spark Core to your Wi-Fi network over USB by communicating through Serial. *NOTE: This only works when the Spark Core is in listening mode*.

First, you'll need to download a serial terminal application; we recommend [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) for Windows and [CoolTerm](http://freeware.the-meiers.org/) for Mac.

Plug your Spark Core into your computer over USB. When the Spark Core is in listening mode, open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

SCREENSHOT

Once you've opened a serial connection, you have two commands at your disposal by hitting either **w** or **i** on the keyboard. Here's what they do:

- **w**: Set up your Wi-Fi SSID and password
- **i**: Read out the Spark Core ID

Here's what setting up the Spark Core over USB looks like:

VINE

## Coming soon: Hard-code credentials

Currently there is not a mechanism to hard-code your SSID and password into the firmware for the Spark Core. We're working on it!

Troubleshooting
===