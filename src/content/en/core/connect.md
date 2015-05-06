---
word: Connect
title: Connecting your Device
order: 1
---

Connecting your Device
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

The easiest way to connect your device to Wi-Fi is using the [Particle mobile app]({{assets}}/images/mobile-app) for iPhone or Android. But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the device must be in [Listening Mode](#/#Listening-Mode), which you'll know by its flashing blue LED.


## Listening Mode

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

The Core and Photon both boot into listening mode by default, so if your device is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds. The RGB LED will be flashing blue in this mode.  To completely clear all stored Wi-Fi credentials, continue to hold the MODE button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.  The RGB LED should now be flashing blue again.


## Particle App for Photon

More information on this lovely app is coming soon! For now, please try connecting over USB.

If you are by yourself, and no other Photons are in listening mode in the same house/apt/room/conference, then you should not attempt to claim your device with the Particle App. Instead, use the CLI.


## Connect over USB

You can also connect your device to your Wi-Fi network over USB by communicating through Serial. *NOTE: This only works when the device is in [Listening Mode](#/connect/#listening-mode) (i.e. RGB led is blinking blue)*.

There are a few ways to go about connecting your Photon over USB. We find that the easiest way is to just use the Particle Command Line Interface (Particle CLI), but this can be intimidating if you have little experience with the Terminal, or if you have a Windows computer that is recalcitrant to node.js. Follow these links depending on your preferences:

[Windows, using CLI](#/cli/#using-windows)
[Windows, not using CLI](#/connect/#using-windows)

[Mac OSX, using CLI](#/cli/#using-osx)
[Mac OSX, not using CLI](#/connect/#using-osx)

[Linux, using CLI](#/cli/#linux-start)
[Linux, not using CLI](#/connect/#linux-start)

###Using Windows

We're going to install the Particle CLI on your computer. If you already have node.js installed, you can skip to [this step](#/connect/#install-cli).

####Installing Node.js
Go to the [node.js website](https://nodejs.org/download) and download the Windows installer. Download the 32-Bit or 64-Bit .msi files, depending on your operating system.

**If you do not know if you are running 32-bit or 64-bit, checking is easy!**
- __On Windows 8__ Mouse over the upper right hand corner of your screen and nagivate to Settings. Then click "PC info" to display basic information about your computer.
- __On Windows 7__ Open System by clicking the Start button Picture of the Start button, right-clicking Computer, and then clicking Properties. Under System, you can view the system type.

Run the installer you downloaded. Follow the prompts. The default file locations should be fine for this.

Restart your computer.
__(You can do this by mousing over the upper right hand corner of the screen, then going to Settings > Power > Restart)__

Node should now be installed! In the next step we will test it and install the CLI.

####Installing the Particle Drivers
You'll also need to install the Windows driver. [Download it here.](https://s3.amazonaws.com/spark-website/Spark.zip)

Unzip the file. It is fine to unzip this as a default into your Downloads folder.

Go to the Device Manager and double-click on your Particle device under `Other Devices`.

Click `Update Driver`, and select `Browse for driver software on your computer`.

Navigate to your Downloads folder, or wherever you unzipped the drivers.

(Note that right now, the drivers are in a `Spark` folder and are named `spark_core`)

If you have a problem installing, you may have to temporarily disable the digitally signed driver enforcement policy. (We're sorry.) There are good instrunctions on how to do that [here](http://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).

####Opening the Command Prompt
You'll need to open the command prompt for this next part. You can also use Powershell or a similar command line tool if that is what you are used to.

To open the command prompt:
1) Mouse over the upper right hand corner of the screen and select "Search"
2) Search for `cmd` in the search box
3) Click on Command Prompt

Now your Command Prompt, is open for use.

####Installing the Particle CLI
In the Command Prompt window, type:
`npm install -g spark-cli`

and press enter.

The terminal will spit out a lot of data that ends in

`[serialport] Success:`

with a lot more data after it.

Now let's try using the CLI!

####Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode]() (blinking blue). Then type:
`spark setup`

Log in with your [Particle Build account](http://build.particle.io) and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `spark serial wifi` instead of `spark setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
-__The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.spark.io/hc/en-us/articles/204357684-Can-t-Get-Connected-).

More info on the CLI is available [here](#/cli).


###Using OSX

We're going to install the Particle CLI on your computer. If you already have node.js installed, you can skip to [this step](#/connect/#install-cli).

####Installing Node.js
Go to the [node.js website](https://nodejs.org/download) and download the OSX installer.

Launch the installer and follow the instructions to install node.js.

Next, open your terminal, or preferred terminal program.

To open the terminal, go to the spotlight search and type `Terminal`, then press enter.

In the terminal, type or paste this series of commands:
`mkdir ~/npm-global`
`npm config set prefix '~/npm-global'`

If you have a .profile, (or a .bash_profile) then type:
`export PATH=~/npm-global/bin:$PATH`
`source ~/.profile` or `source ~/.bash_profile`

If you do not have a .profile, type:
`cat >~/.profile`
`export PATH=~/npm-global/bin:$PATH`


####Install the Particle CLI

Type:
`npm install -g spark-cli`

_Note:_ You may need to update xcode at this time.


####Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode]() (blinking blue). Open the terminal and type:
`spark setup`

Log in with your [Particle Build account](http://build.particle.io) and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `spark serial wifi` instead of `spark setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
-__The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.spark.io/hc/en-us/articles/204357684-Can-t-Get-Connected-).

More info on the CLI is available [here](#/cli).


APPENDIX
===

## DFU Mode (Device Firmware Upgrade)

If you are wish to program a device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the dfu-utility.

Procedure:

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow
6. Release the MODE button


The device now is in the DFU mode.


<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>

## Factory Reset

A factory reset restores the firmware on the device to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the device change from flashing yellow to flashing white. Then release the button.  The device should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the RST button, while holding down the MODE button.
3. Wait for the LED to start flashing yellow (continue to hold the MODE button)
4. The LED will turn solid white (continue to hold the MODE button)
5. Finally, the LED will turn blink white rapidly
6. Release the MODE button

**Note:** The video here is a continuation of the video from above (DFU Mode).

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>

## Smart Config with the TI app (Core Only)

Smart Config with the Texas Instruments CC3000 app is similar to the process above, although you don't need an account with Particle, and TI also has a Java applet that can work from a Mac, Windows, or Linux computer.

Follow the instructions on Texas Instrument's website:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

The only thing that's different is that you'll need to activate the optional AES key and type `particledevices2013`.

*NOTE: TI's Android app is not available in Google Play; you'll have to download it off of their website and side-load the apk yourself.*
