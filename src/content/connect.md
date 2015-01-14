---
word: Connect
title: Connecting your Core
order: 1
---

Connecting your Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

The easiest way to connect the Spark Core to Wi-Fi is using the Spark mobile app for iPhone or Android. But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the Spark Core must be in [Listening Mode](/connect/#connecting-your-core-listening-mode), which you'll know by its flashing blue LED.

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

## Listening Mode

The Core boots into listening mode by default, so if your Core is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds. The RGB LED will be flashing blue in this mode.  To completely clear all stored Wi-Fi credentials, continue to hold the MODE button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.  The RGB LED should now be flashing blue again.

## Smart Config with the Spark app

<iframe class="vine-embed" src="https://vine.co/v/hFH09MJwbxg/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once you've downloaded the Spark Core app from the App Store or Google Play, you should create an account. Afterwards, you'll be asked to connect your Core using a process called Smart Config.  If your Core has a u.FL connector, you must connect an external antenna before initiating Smart Config. *NOTE: Your phone must be connected to the Wi-Fi network that you want to connect the Core to.  Wi-Fi Hotspots generated from the phone you are running this app on typically will yield an error claiming there is no Wi-Fi available.  Please try to [Connect over USB](/connect/#connecting-your-core-connect-over-usb) and enter your Hotspot credentials manually.*  When connected to Wi-Fi, the app will automatically fill the SSID field with the name of the network that your phone is connected to.  Enter your Wi-Fi password and hit connect.

*NOTE: In places like a conference or workshop where multiple cores are connected, Smart Config is not preferred. Claiming a Core over USB will prevent confusion with accidentally claiming of another Core.*

<iframe class="vine-embed" src="https://vine.co/v/hFwubhA3JXV/embed/simple" width="320" height="320" frameborder="0"></iframe>

Smart Config can take up to a minute, so be patient. The closer your phone to your Spark Core, the faster it will connect. Once the Core hears the signal, it will go through the following sequence of lights:

- **Solid blue**: Credentials captured
- **Flashing green**: Connecting to Wi-Fi network
- **Flashing cyan**: Connecting to Spark Cloud
- **Breathing cyan**: Connected to Spark Cloud

<iframe class="vine-embed" src="https://vine.co/v/hFdj1TJjA9M/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once the Spark Core has connected, your phone will "claim" the Core and attach it to your account. Then you'll get to name your Core.  If you're uncertain, you can confirm that the claim process was successful by logging into the [Spark Web IDE](https://www.spark.io/build) and clicking the "Cores" icon at the bottom of the page.  Is your Core listed?  Great!  The world is perfect.

*NOTE: The Core **MUST** be online (breathing cyan) in order for the claiming process to work. If the Spark Core has been claimed by someone else, the app won't recognize it. If you need to transfer a Spark Core to another account, email us at [hello@spark.io](mailto:hello@spark.io).*

<iframe class="vine-embed" src="https://vine.co/v/hFdPKul226i/embed/simple" width="320" height="320" frameborder="0"></iframe>

If you are connecting multiple Cores, you'll go through this naming process for each Core. You'll know which one is which by the rainbow signal.

<iframe class="vine-embed" src="https://vine.co/v/hFdxB9lHOmv/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once you've finished naming your Cores, you can control them with Tinker! Try *digitalWrite* on D7 to turn on the user LED.

For more information on how the *seemingly magical* Smart Config mode works, check out [this community thread by GHawkins](https://community.spark.io/t/smart-config-the-missing-manual-now-available/442)

## Connect over USB

You can also connect the Spark Core to your Wi-Fi network over USB by communicating through Serial. *NOTE: This only works when the Spark Core is in [Listening Mode](/connect/#connecting-your-core-listening-mode) (i.e. RGB led is blinking blue)*.

First, you'll need to download a serial terminal application.

For __Windows__ users, we recommend [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/).
You'll also need to install the Windows driver:

[Windows driver for Spark Core >](https://s3.amazonaws.com/spark-website/Spark.zip)

[CoolTerm](http://freeware.the-meiers.org/) provides a nice GUI.
![CoolTerm settings]({{assets}}/images/coolterm-settings.png)
![CoolTerm setup]({{assets}}/images/coolterm-setup.png)

For __Mac__ users, either CoolTerm or screen work.

For __Linux__ command line usage, [GNU Screen](https://www.gnu.org/software/screen/) works great.
(On OS X, the command line invocation might look something like `screen /dev/cu.usbmodem1411 9600`.
On Ubuntu, it looks something like `screen /dev/ttyACM0 9600`. Device location may vary, poke around in the `/dev` directory if you don't find it immediately)

__How-to__

Plug your Spark Core into your computer over USB. When the Spark Core is in [Listening Mode](/connect/#connecting-your-core-listening-mode), open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Once you've opened a serial connection, you have two commands at your disposal by hitting either **w** or **i** on the keyboard. Here's what they do:

- **w**: Set up your Wi-Fi SSID and password
- **i**: ("i" as in identify) Read out the Spark Core ID

**NOTE:** If you connect your Core over USB the first time, you will also need to manually *claim* your Core to connect it with your account. Please see the section below on [claiming your Core](/#/connect/claiming-your-core) for more details.

Claiming your Core
===

Once your Core is connected, it needs to be *claimed* in order to be associated with your account. This is what lets you control your Core and keeps anyone else from doing so.

If you use the mobile app to set up your Core, it should claim it automatically. However if you connect your Core over USB, or if the claiming process is unsuccessful, you can claim it manually.

The easiest way to manually claim a Core over USB is to use the [Spark Command Line Interface](https://github.com/spark/spark-cli). Once you have this installed, you can simply type `spark setup` and follow the instructions.

Alternatively, if you have troubles installing the command line tool, you can get the Core's ID over serial and claim it via the build site.
You can do this by opening a Serial connection to the Core and pressing the **i** key (see the above instuctions for connecting over USB). It should show you a number like this:

    # Example Core ID
    55ff68064989495329092587

---

Then open up [Spark Build](https://www.spark.io/build) and click the 'Cores' icon. Click the button that says 'Add a Core', and enter your ID in the text box.



APPENDIX
===

## DFU Mode (Device Firmware Upgrade)

If you are wish to program a Core with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the dfu-utility.

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The Core now is in the DFU mode.


<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>

## Factory Reset

A factory reset restores the firmware on the Core to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the Core change from flashing yellow to flashing white. Then release the button.  The Core should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button

**Note:** The video here is a continuation of the video from above (DFU Mode).

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>

## Smart Config with the TI app

Smart Config with the Texas Instruments CC3000 app is similar to the process above, although you don't need an account with Spark, and TI also has a Java applet that can work from a Mac, Windows, or Linux computer.

Follow the instructions on Texas Instrument's website:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

The only thing that's different is that you'll need to activate the optional AES key and type `sparkdevices2013`.

*NOTE: TI's Android app is not available in Google Play; you'll have to download it off of their website and side-load the apk yourself.*
