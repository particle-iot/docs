---
word: Connect
title: Connecting your Device
order: 3
columns: 2
---

#Connecting your Device over USB

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

The easiest way to connect your device to Wi-Fi is using the mobile app as described in the [previous lesson](/guide/start). But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the device must be in [Listening Mode](/guide/modes), where the RGB LED is flashing blue.

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUHUIjq7pO/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

The Core and Photon both boot into listening mode by default, so if your device is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds. The RGB LED will be flashing blue in this mode.

There are a two ways to go about connecting your Photon over USB, depending on your OS. These links will take you to the right place:

- [Windows](#connecting-your-device-using-windows)
- [Mac OSX](#connecting-your-device-using-osx)

##Using Windows

To connect and interact with a Particle Device over USB from a Windows machine, the easiest route is to use the Particle command line interface.
The following describes how to install the Particle CLI on your computer. If you already have Node.js installed, you can skip to [this step](#installing-the-particle-cli).

###Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](http://nodejs.org/download)

**If you do not know if you are running 32-bit or 64-bit, checking is easy!**
- __On Windows 8__ Mouse over the upper right hand corner of your screen and nagivate to Settings. Then click "PC info" to display basic information about your computer.
- __On Windows 7__ Open System by clicking the Start button Picture of the Start button, right-clicking Computer, and then clicking Properties. Under System, you can view the system type.

Run the installer you downloaded. Follow the prompts. The default file locations should be fine for this.

Restart your computer.
_(You can do this by mousing over the upper right hand corner of the screen, then going to Settings > Power > Restart)_

Node should now be installed! In the next step we will test it and install the CLI.

###Installing the Particle Driver
You'll also need to install the Windows driver. [Download it here.](https://s3.amazonaws.com/spark-website/Spark.zip)

Unzip the file. It is fine to unzip this as a default into your Downloads folder.

Go to the Device Manager and double-click on your Particle device under `Other Devices`.

Click `Update Driver`, and select `Browse for driver software on your computer`.

Navigate to your Downloads folder, or wherever you unzipped the drivers.

(Note that right now, the drivers are in a `Spark` folder and are named `spark_core`)

If you have a problem installing, you may have to temporarily disable the digitally signed driver enforcement policy. (We're sorry.) There are good instructions on how to do that [here](http://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).

###Opening the Command Prompt
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


###Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](#connecting-your-device-listening-mode) (blinking blue). Then type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**

- _The SSID_ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- _The Security_ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.particle.io/hc/en-us/articles/204357684-Can-t-Get-Connected-).

More info on the CLI is available [here](/photon/cli).


##Using OSX

We're going to install the Particle CLI on your computer. If you already have node.js installed, you can skip to [this step](#install-the-particle-cli).

###Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](http://nodejs.org/download)

Launch the installer and follow the instructions to install node.js.

Next, open your terminal, or preferred terminal program.

####Install the Particle CLI

Type:
`npm install -g particle-cli`

_Note:_ You may need to update xcode at this time.


###Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](#connecting-your-device-listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.

If your device is not connecting, try troubleshooting [here](http://support.particle.io/).

More info on the CLI is available [here](/photon/cli).

Once you've finished connecting your device, head over to [the next section](/guide/modes) to learn about the different modes for your device.
