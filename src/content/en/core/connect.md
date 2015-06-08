---
word: Connect
title: Connecting your Device
order: 1
---

Connecting your Device
===

<div class="iframe-wrapper">
  <iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

The easiest way to connect your device to Wi-Fi is using the [Spark Core mobile app](#connecting-your-device-spark-core-mobile-app) for iPhone or Android. But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the device must be in [Listening Mode](#connecting-your-device-listening-mode), which you'll know by its flashing blue LED.


## Listening Mode

<div class="iframe-wrapper">
  <iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

The Core and Photon both boot into listening mode by default, so if your device is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds. The RGB LED will be flashing blue in this mode.  

## Spark Core mobile app

You can search for the mobile app named Spark Core, or you can click one of these links:

[iPhone >](https://itunes.apple.com/us/app/spark-core/id760157884?mt=8)  [Android >](https://play.google.com/store/apps/details?id=io.spark.core.android&hl=en)

Now use the app to sign up for an account!

![Smart Config]({{assets}}/images/smart-config.jpg)

Make sure your phone is connected to the WiFi you want to use (it'll show up in the SSID blank on the app), then enter your password and click CONNECT!

This may take a little while- but don't worry. It should go through the following colors:
- **Blinking blue**: Listening for Wi-Fi credentials
- **Solid blue**:    Getting Wi-Fi info from app
- **Blinking green**: Connecting to the Wi-Fi network
- **Blinking cyan**: Connecting to the Particle Cloud
- **Blinking magenta**: Updating to the newest firmware
- **Breathing cyan**: Connected!

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">See an animation</a>

Did your phone not find any Cores?
- Is it blinking blue?
  - Give it another go.
- Is it blinking green and not getting to cyan?
  - Try it again by holding the MODE button on the core until it begins flashing blue, then double-check your network name and password.
- Is it now breathing cyan, but the app didn't find any Cores?
  - Uh oh. Your Core's on the network, but it took too long. [We're going to claim your core manually.](../cli#running-from-source-advanced-spark-cloud-claim)
- Something else altogether?
  - Give the [Connecting Your Core](/core/connect) page a read-through and if you're still stuck, search the [community.](http://community.particle.io)

## Connect over USB

You can also set up your device using USB. *NOTE: This only works when the device is in [Listening Mode](#connecting-your-device-listening-mode) (i.e. RGB led is blinking blue)*.

There are a two ways to go about connecting your Core over USB, depending on your OS. These links will take you to the right place:

- [Windows](#connecting-your-device-using-windows)
- [Mac OSX](#connecting-your-device-using-osx)


##Using Windows

To connect and interact with a Particle Device over USB from a Windows machine, the easiest route is to use the Particle command line interface.
The following describes how to install the Particle CLI on your computer. If you already have Node.js installed, you can skip to [this step](#installing-the-particle-cli).

####Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](http://nodejs.org/download)

**If you do not know if you are running 32-bit or 64-bit, checking is easy!**
- __On Windows 8__ Mouse over the upper right hand corner of your screen and nagivate to Settings. Then click "PC info" to display basic information about your computer.
- __On Windows 7__ Open System by clicking the Start button Picture of the Start button, right-clicking Computer, and then clicking Properties. Under System, you can view the system type.

Run the installer you downloaded. Follow the prompts. The default file locations should be fine for this.

Restart your computer.
_(You can do this by mousing over the upper right hand corner of the screen, then going to Settings > Power > Restart)_

Node should now be installed! In the next step we will test it and install the CLI.

####Installing the Particle Drivers
You'll also need to install the Windows driver. [Download it here.](https://s3.amazonaws.com/spark-website/Spark.zip)

Unzip the file. It is fine to unzip this as a default into your Downloads folder.

Go to the Device Manager and double-click on your Particle device under `Other Devices`.

Click `Update Driver`, and select `Browse for driver software on your computer`.

Navigate to your Downloads folder, or wherever you unzipped the drivers.

(Note that right now, the drivers are in a `Spark` folder and are named `spark_core`)

If you have a problem installing, you may have to temporarily disable the digitally signed driver enforcement policy. (We're sorry.) There are good instructions on how to do that [here](http://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).

####Opening the Command Prompt
You'll need to open the command prompt for this next part. You can also use Powershell or a similar command line tool if that is what you are used to.

To open the command prompt:
1) Mouse over the upper right hand corner of the screen and select "Search"
2) Search for `cmd` in the search box
3) Click on Command Prompt

Now your Command Prompt, is open for use.

####Installing the Particle CLI
In the Command Prompt window, type:
`npm install -g particle-cli`

and press enter.

Now let's try using the CLI!


####Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](#connecting-your-device-listening-mode) (blinking blue). Then type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**

- _The SSID_ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- _The Security_ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.particle.io/hc/en-us/articles/204357684-Can-t-Get-Connected-).

More info on the CLI is available [here](/core/cli).


##Using OSX

We're going to install the Particle CLI on your computer. If you already have node.js installed, you can skip to [this step](#install-the-particle-cli).

####Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](http://nodejs.org/download)

Launch the installer and follow the instructions to install node.js.

Next, open your terminal, or preferred terminal program.


####Install the Particle CLI

Type:
`npm install -g particle-cli`

_Note:_ You may need to update xcode at this time.


####Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](#connecting-your-device-listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.particle.io/).

More info on the CLI is available [here](http://docs.particle.io/core/cli).


APPENDIX
===

## Smart Config with the TI app (Core Only)

Smart Config with the Texas Instruments CC3000 app is similar to the process above, although you don't need an account with Particle, and TI also has a Java applet that can work from a Mac, Windows, or Linux computer.

Follow the instructions on Texas Instrument's website:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

The only thing that's different is that you'll need to activate the optional AES key and type `particledevices2013`.

*NOTE: TI's Android app is not available in Google Play; you'll have to download it off of their website and side-load the apk yourself.*
