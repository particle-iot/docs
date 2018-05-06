---
title: Getting started
layout: guide.hbs
columns: two
devices: [ photon,electron,core,raspberry-pi ]
order: 2
---

# Getting Started

{{#if raspberry-pi}}

![](/assets/images/raspberry-pi-hero.png)

## Particle Pi Beta
<p class="boxedHead">Please read me!</p>
<p class="boxed">
Please note that the Raspberry Pi integration with the Particle Device Cloud is **currently in beta**. This means that, while the primary happy paths and use cases are tested, the software may still be a little rough around the edges in some areas.
<br>
<br>
The good news is that you're about to join a wonderful community of Particle developers who are here to help. If you need support and can't find the answer in our docs, head over to our [community forums](https://community.particle.io/c/raspberry-pi) and chat with the Particle team. Find an issue? Log it in our [open-source repository](https://github.com/particle-iot/particle-agent) so we can fix it!
<br>
<br>
Have fun!

</p>

### Quick install

*If you've read this guide before and are just looking for the install command, we'll save you some scrolling:*<br>
`bash <( curl -sL https://particle.io/install-pi )`

## What You'll Need
In order to connect your Raspberry Pi to the Particle Device Cloud you'll need the following things. Note that these are all included in the [Particle Pi Starter Kit with Raspberry Pi v3](https://store.particle.io/#particle-pi-starter-kit), which is available for purchase in the [Particle Store](https://store.particle.io/#particle-pi-starter-kit).

- Raspberry Pi (Raspberry Pi v2 and v3 preferred)
- Power supply (5V, 2A+ preferred)
- Micro SD card and SD adapter
- Ethernet cable (for wired connections)

![](/assets/images/raspberry-pi-kit.jpg)

If you do not have access to a wired network cable, you will need to connect your Pi to an active Wi-Fi network, which will require the following:

- Keyboard
- Mouse
- Monitor
- HDMI Cable (to connect the Pi to your monitor)

## Download and install Raspbian
Before you boot up your Pi for the first time, you'll need to make sure you have the latest Raspbian image from the Raspberry Pi Foundation. Note that flashing a fresh version of Raspbian Jessie with Pixel (GUI) can take as long as 10-15 minutes.

Do you already have a Pi with Raspbian installed? Click [here](/guide/getting-started/start/raspberry-pi/#i-have-an-sd-card-with-raspbian) to skip the download and setup steps and update your existing Raspbian image.

### I don't have an SD card with Raspbian

If you don't already have an SD card with Raspbian on it, you'll need to follow these steps:

1. Make sure your SD card is FAT32 formatted  
2. Install an operating system image on the SD card. We recommend Raspberry Pi's preferred operating system, Raspbian Jessie with Pixel, which you can download [here](https://www.raspberrypi.org/downloads/raspbian/).  
3. Install the operating system onto your SD card by following the Raspberry Pi Foundation's official installation instructions, [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).  

<p class = "boxed">
**Note**: There are many different tools and resources available on the Internet to make the process of burning a new image for your Raspberry Pi easier. If you have issues with the instructions above from the Raspberry Pi Foundation, [elinux.org](http://elinux.org/RPi_Easy_SD_Card_Setup#SD_card_setup) has compiled a great list of alternatives for Mac, Windows, and Linux.  

  - [Mac setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_card_using_Mac_OS_X)  
  - [Windows setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Windows)  
  - [Linux setup options](http://elinux.org/RPi_Easy_SD_Card_Setup#Flashing_the_SD_Card_using_Linux_.28including_on_a_Raspberry_Pi.21.29)  

</p>


4\. Insert the SD card into your Raspberry Pi, and apply power using a 5V, 2A+ power supply.

### I have an SD card with Raspbian

If you already have a Pi set up, run the following commands from your Raspberry Pi's command line to update your OS to the most recent version of Raspbian:

1. `sudo apt-get update`, which will update your local package database with the upstream one.
2. `sudo apt-get upgrade`, which will actually upgrade your Raspbian image to the most recent from the Raspberry Pi Foundation.

Note that these steps may take **up to 10 minutes** to complete, so please have patience.

## Connect your Pi to the Internet

There are two primary ways to connect your Raspberry Pi to the web--using a wired connection (Ethernet) or using a wireless connection (Wi-Fi preferred).

### Connecting with a wired connection (Ethernet)

If your Raspberry Pi has an Ethernet port, connecting it to the Internet is as simple as plugging in a cable to the on-board RJ-45 jack on your Pi. The operating system should automatically work with your router to obtain an IP address and connect to the web.

You'll also want to add a blank file named `ssh` (open a text editor and hit Save as: `ssh`) to the `boot` drive of the SD card to allow connecting to your Raspberry Pi remotely.

**Note**: The Pi Zero does not have an on-board Ethernet port, but can be connected with a Ethernet --> USB adapter.

### Connecting over Wi-Fi (headless setup)

You can put the Wi-Fi connection information to the SD card before starting the Raspberry Pi if you don't want to connect a monitor and keyboard.

1. Insert the SD card into your computer.
2. Open the drive called `boot`
3. Add a file named `wpa_supplicant.conf` with this content:

  ```
  network={
      ssid="YOUR_SSID"
      psk="YOUR_PASSWORD"
      key_mgmt=WPA-PSK
  }
  ```

4. Add a blank file named `ssh` (open a text editor and hit Save as: `ssh`).
5. Insert the SD card into your Raspberry Pi.

### Connecting over Wi-Fi (GUI setup)

1. Connect a USB keyboard, USB mouse and monitor to your Raspberry Pi.
2. Click on the icon on the left of the volume symbol to scan for Wi-Fi networks and start the Wi-Fi configuration process.

  ![](/assets/images/raspberry-pi-wifi-ssid.png)

3. Enter your network's Wi-Fi password.

  ![](/assets/images/raspberry-pi-wifi-password.png)

4. When your Pi has successfully connected to the Wi-Fi network, you will see a blue Wi-Fi icon next to the volume icon at the top right hand corner of your screen.

  ![](/assets/images/raspberry-pi-wifi-connected.png)

Note that it's also possible to obtain the IP Address of your Raspberry Pi after you've connected it to the Internet. To do so, click on the black terminal icon at the top left hand side of your screen, and type `ifconfig wlan0`.

Your Pi's IP Address should be displayed next to the label, `inet addr` and look something like `192.168.X.XXX`.

![](/assets/images/raspberry-pi-ip-address.png)

## Install Particle Pi software

Now that your Pi is online, it's finally time to download and install the Particle Pi software. If your Pi has a monitor and keyboard connected, you can skip directly to [Install the Particle Agent](/guide/getting-started/start/raspberry-pi/#install-the-particle-agent). If would like to install the Particle Pi software without using a monitor and keyboard, please read the following section, [Instructions for headless setup](/guide/getting-started/start/raspberry-pi/#instructions-for-headless-setup).

### Instructions for headless setup
Note that if you are using a wired connection without a monitor and keyboard (headless) you will have to SSH (secure shell) into your Pi in order to install the Particle software. If you are using a keyboard and monitor, you can head directly to [Install the Particle Agent](/guide/getting-started/start/raspberry-pi/#install-the-particle-agent).

- The first step is to obtain the IP address for your Raspberry Pi once it is connected to the Internet. You can find instructions for obtaining your Pi's IP address using Raspberry Pi's official tutorial, [here](https://www.raspberrypi.org/documentation/remote-access/ip-address.md).

The easiest method find your Raspberry Pi's IP address and SSH into it is to use its mDNS hostname followed by `.local`. The default hostname for your Pi is `raspberrypi`, so on macOS and Linux, you can simply SSH into your Pi by running the following command in your computer's terminal:
```
ssh pi@raspberrypi.local
```
- If you are using Windows, you can download and use [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) to SSH into your Pi.

The default password for Raspberry Pi is `raspberry`. **We strongly recommend you change the default password.** You can do so by running the following command inside of your Raspberry Pi's terminal:
```
passwd
```
If your want to change the hostname of your Raspberry Pi to something more meaningful, or if you have multiple Raspberry Pi's on your network, you can do so by running the following command inside of your Pi's terminal:

```
echo newHostname | sudo tee /etc/hostname
```
- You will need to reboot your Pi for the new hostname to be used.



<p class = "boxed">
An alternate method for finding the IP address in a headless setup configuration is to ensure that your computer is connected to the same network as your Raspberry Pi device, and to run the following command in your computer's terminal:  

<br>

```arp -a | grep b8:27:eb | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}'```  
<br>

As it turns out, the Raspberry Pi Foundation has their own range of MAC addresses all to themselves. The command above will scan your network for devices whose MAC address starts with the prefix, `b8:27:eb` and report their IP address. Assuming you only have one Raspberry Pi connected to the network, you should be able to easily identify your Pi's network address and SSH into it in the next step.  
<br>

- Once you have your Pi's IP address, you can connect to your Pi through a secure shell (SSH). If you are using macOS or Linux, you can simply create an SSH tunnel using your `Terminal` application. If you are using Windows, download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).
<br><br>
- SSH into your Pi using the following command, where `192.168.X.XXX` is the IP address of your Pi.
<br>
```
ssh pi@192.168.X.XXX
```
</p>

### Install the Particle Agent

You will not be able to complete this step of the process if you have not already received your beta activation email. If that's the case, hang tight--you'll receive your email in the upcoming weeks as we expand access to the Raspberry Pi provisioning endpoint. For more information, visit [particle.io/particle-pi](http://particle.io/particle-pi)

To connect your Raspberry pi to the Particle Device Cloud, you need to install the Particle Agent. The Particle Agent is a software service that runs in the background on the Raspberry Pi and allows you to write and run firmware (software that interacts with the GPIO pins on the Pi).

Install the agent by pasting this command in a terminal on your
Raspberry Pi, either while connected remotely through SSH or locally
with a keyboard and monitor.

```
bash <( curl -sL https://particle.io/install-pi )
```

The installation process should look like this:

<script type="text/javascript" src="https://asciinema.org/a/93209.js" id="asciicast-93209" async data-poster="npt:1:20"></script>

When the installation is over, the Particle Agent setup will ask you to
sign in to your Particle account. If you don't have one yet, [create a
Particle account at https://login.particle.io/signup](https://login.particle.io/signup).

Once the Particle Agent is installed, you will have a number of commands available to you to start firmware, stop firmware, and manage your connection to the Cloud. For a full list of available `particle-agent` commands, type `particle-agent help` into your terminal.

<p class = "boxedHead">`particle-agent setup`</p>
<p class = "boxed">

This is a super useful command! If you find yourself in an unknown or unintended device state at any point in development, you can type this command to reset your device and return it to "factory conditions" running **Tinker**, our default device firmware. The Pi will remain claimed to your Particle account.

</p>

When you have successfully completed setup of your Pi, you will see the following confirmation message:

![](/assets/images/pi-setup-done.png)

If you see the message above, **congratulations!** You've successfully
connected your Pi to the Particle Device Cloud!

## Development Resources

Great work so far! In case you ever find yourself in a pickle, here's a list of resources that can help you through the next steps of your journey. Please make a note of them, and remember that you can always send us a note via our [Support Portal](http://support.particle.io) if you get stuck!

#### Technical Documentation
- [Raspberry Pi Pinout and Datasheet](/datasheets/raspberrypi-datasheet/)
- [`particle-agent` GitHub repository](https://github.com/particle-iot/particle-agent)

#### Projects and Examples
- [Particle IoT projects](https://www.hackster.io/particle)
- [Raspberry Pi tutorials](/guide/getting-started/examples/raspberry-pi/)

#### Forums and Support
- [Community forums](https://community.particle.io/c/36-category)
- [Raspberry Pi Official Documentation](https://www.raspberrypi.org/documentation/)
- [Particle Support Portal](http://support.particle.io)

## Next steps

Connecting your Pi is only the beginning. Check out the other topics in our `Getting Started` guide for the Raspberry Pi, which will show you how to:

- Use [Tinker](/guide/getting-started/tinker/raspberry-pi/), our mobile application, to control your Pi
- Write and flash code to your Pi with our [Web IDE](/guide/getting-started/build/raspberry-pi/)
- Publish sensor values to the Internet
- Remotely execute scripts on your Raspberry Pi
- Leverage your Pi's powerful processor

<center>[Tinker and Mobile App >](/guide/getting-started/tinker/raspberry-pi/)</center>

{{else}} {{!-- raspberry-pi --}}

## What's in the Box?

{{#if photon}}
![](/assets/images/photon-kit-new.jpg)
<p class="caption">Your new Photon! Note that many components pictured will only be included if you purchased a Photon Kit.</p>
{{/if}}

{{#if core}}
![](/assets/images/core-box.jpg)
{{/if}}

{{#if electron}}
![](/assets/images/electronItemBox.jpg)
<p class="caption">Introducing the Electron.</p>
{{/if}}

Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [kit addons](/datasheets/kits) and check out the [{{device}} datasheet](/datasheets/{{deviceValue}}-datasheet/) if you like!

{{#if photon}}
If you have an Internet Button, read through this section to get started and connect your device, then hop over to the [Internet Button Guide](/guide/tools-and-features/button/) for more detailed info.
{{/if}}

{{#if core}}
If you have an Internet Button, read through this section to get started and connect your device, then hop over to the [Internet Button Guide](/guide/tools-and-features/button/) for more detailed info.
{{/if}}

Let's quickly go over what you see.

{{#if photon}}
### What's on it?
{{/if}}

{{#if core}}
### What's on it?
{{/if}}

{{#if electron}}
### What's all here?
{{/if}}

{{#if has-cellular}}{{popup '**The Cellular Module.**' 'img' 'electronUblox.jpg'}}
This is probably why you bought your device-- the cellular module allows your Electron to communicate with the internet in over 120 countries!
The cellular module is also accompanied with a Particle SIM card.

It connects your device to the internet in the same way that your smartphone might connect to its cellular network.
[See our coverage map](/support/troubleshooting/common-issues/electron/#6-check-the-cellular-coverage-in-your-area).
{{/if}}

{{#if has-wifi}}
{{#if photon}}{{popup '**The Wi-Fi Module.**' 'img' 'photon-module.jpg'}}{{/if}}
{{#if core}}{{popup '**The Wi-Fi Module.**' 'img' 'core-cc3000.jpg'}}{{/if}}
This is probably why you bought your device-- the Wi-Fi module allows your {{device}} to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network.
{{#if photon}} **Do not press down on the Photon's module.** Doing so triggers a reset and is generally not good for the Photon.{{/if}}
{{/if}} {{!-- has-wifi --}}

{{#if photon}}{{popup '**The Microcontroller.**' 'img' 'photon-module.jpg'}}{{/if}}
{{#if core}}{{popup '**The Microcontroller.**' 'img' 'core-stm32.jpg'}}{{/if}}
{{#if electron}}{{popup '**The Microcontroller.**' 'img' 'electronMCU.jpg'}}{{/if}}
The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called *firmware* or an *embedded application*). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.


{{#if electron}}{{popup '**The Pins.**' 'img' 'mk-header-male.jpg'}}{{/if}}
{{#if photon}}{{popup '**The Pins.**' 'img' 'photon-pinout.png'}}{{/if}}
{{#if core}} {{popup '**The Pins.**' 'img' 'core-pinout.png'}}{{/if}}
Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.


{{#if has-cellular}}
{{popup '**The Antenna & USB Cable.**' 'img' 'electronAntenna.jpg'}}
The cellular antenna is imperative for the {{device}} to reach connection to a cellular tower. It will operate for all 2G/3G frequencies that your
{{device}} needs, depending on the version you have. The USB cable provides a means to charge your {{device}} as well as send serial and DFU commands to your device.
{{/if}} {{!-- has-cellular --}}


{{#if has-battery}}
{{popup '**The Battery.**' 'img' 'electronBattery.jpg'}}
The {{device}} comes with a standard 1,800mAh 3.7V LiPo battery (rechargeable) which allows the {{device}} to be powered over long periods of time without needing a connection
to wired power source. Consider this battery your {{device}}'s best friend!
{{/if}} {{!-- has-battery --}}


{{#if photon}}{{popup '**Buttons**' 'img' 'photon-buttons.jpg'}} **and** {{popup '**LEDs.**' 'img' 'photon-leds.jpg'}}{{/if}}
{{#if core}}{{popup '**Buttons**' 'img' 'core-buttons.jpg'}} **and** {{popup '**LEDs.**' 'img' 'core-leds.jpg'}}{{/if}}
{{#if electron}}**Buttons and LEDs.**{{/if}}
There are several awesome buttons and LEDs on your {{device}} to make it easier to use.

- The `{{system-button}}` button is on the left and the `{{reset-button}}` button is on the right. You can use these buttons to help you set your device's [mode](/guide/getting-started/modes).
- The **RGB LED** is in the center of your {{device}}, above the module. The color of the RGB LED tells you what [mode](/guide/getting-started/modes) your {{device}} is currently in.
{{#if core}}
- The **D7 LED** in the upper right side of your {{device}}. This LED will turn on when the D7 pin is set to `HIGH`.
{{else}}
- The **D7 LED** is next to the D7 pin on your {{device}}, on the upper right quadrant. This LED will turn on when the D7 pin is set to `HIGH`.
{{/if}} {{!-- core }}

{{/if}}

For more technical details on what comes on your device, go [here](/datasheets/{{deviceValue}}-datasheet/).


{{#if electron}}
## New User Features On the Electron
### Onboard power management
- The Electron charges its own battery!
- If the small red LED is on, the battery is charging
- When the LED turns off, the battery is fully charged

### Display signal strength!
- Press `{{system-button}}` once quickly when the Electron is breathing cyan
- The signal strength (RSSI) will be shown in a 0-5 green blinks, 5 being the strongest

### Soft Power Down
- Tap `{{system-button}}` twice quickly, then the LED will show white, and then it will turn off in a few seconds
- To turn it back on tap `{{reset-button}}` once
- You can use use soft power down instead of unplugging the battery or power
- This uses a deep sleep mode for the Electron, and will still use 0.13mA
{{/if}}

## Prerequisites for Setup
{{#if electron}}
* **Software**
  * We highly recommend using our [online web setup](https://setup.particle.io) for the Electron.
  * You can also use the Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-iot-projects-wifi-or-cellular/id991459054?mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app) | [Windows](https://www.microsoft.com/en-us/store/p/particle/9nblggh4p55n)
* **Hardware**
  * Your Particle Electron, brand new and out of the box!
  * USB to micro USB cable (included)
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Cellular Antenna (included)
  * SIM Card (included)
  * 3.7V LiPo Battery (included)
  * A computer for the [setup process](https://setup.particle.io).
* **Experience**
    * None! This is your first project.

## Billing for Electron
### Overview
- Each SIM card will be billed a *base rate* which includes 1 MB of data (1 MB = 1,000,000 bytes)
- The base rate covers you up to 1.0MB, additional MB are billed at a cheaper rate than the base
- We bill your base rate at beginning of a period, additional MB at the end, so you'll often see both
- Base and additional MB rates are based on your [country and Zone](/guide/getting-started/billing/electron/#roaming-zones-)
- You can set a data limit for each SIM. It defaults to 5MB on new SIMs, but you can change it in the [Console](https://console.particle.io/billing)
- Data limits are soft maximums; we only charge you for the number of MB used, rounded up, and we'll cut off usage as quickly as we have updated metering from your carrier
- If a SIM goes over the limit, it'll be paused and won't be able to use more data until the beginning of the next period or you raise the data limit
- You can use the [Console](https://console.particle.io/billing) to manage SIMs, billing, and see data usage
- See the full [Electron Billing Guide](/guide/getting-started/billing/)

## Data Use on the Electron
### Overview
- Any cellular communication to or from the Electron uses data, since it goes through the cell network
- Maintaining a connection also uses a small amount of data, to keep the device active on the network
- Some actions are very data efficient, like `Particle.publish`
- Others, like flashing your code over the air, will use much more data
- We've done a ton of work to save you data and warn you if an action will use lots of data
- You can save even more data by optimizing your code behavior
- See the full [Electron Data Guide](/guide/getting-started/data/)

Go to the next section to learn to [connect over USB](/guide/getting-started/connect/electron/).    
{{/if}} {{!-- electron --}}

{{#if photon}}
* **Software**
  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app) | [Windows](https://www.microsoft.com/en-us/store/p/particle/9nblggh4p55n)
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android or Windows smartphone
* **Wi-Fi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcast SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP Wi-Fi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}} {{!-- photon --}}

{{#if core}}
* **Software**
  * Spark Core Mobile App - [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) | [Android](https://play.google.com/store/apps/details?id=io.spark.core.android) | [Windows](https://www.microsoft.com/en-us/store/p/particle/9nblggh4p55n)
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android or Windows smartphone
* **Wi-Fi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcast SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP Wi-Fi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}} {{!-- core --}}

{{#if has-wifi}}
## Connect Your {{device}}

In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.

{{#if photon}}
<iframe src="https://player.vimeo.com/video/178282058" width="320" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
{{/if}}


### Step 1: Power On Your Device
{{#if photon}}![plug in your device!](/assets/images/photon-plugged-in.jpg){{/if}}
{{#if core}}![plug in your device!](/assets/images/core-front.jpg){{/if}}

Plug the USB cable into your power source. {{{ popup '(Your computer works perfectly for this purpose.)' 'note' 'Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.'}}}

As soon as it is plugged in, the RGB LED on your device should begin {{#if photon}}{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}{{/if}}{{#if core}}{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}{{/if}}

If your device is not blinking blue, {{#if photon}}{{popup 'hold down the SETUP button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}{{/if}}{{#if core}}{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUgHYYrYgl/embed/simple'}}{{/if}}

If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.

### Step 2a: Connect your Photon to the Internet using the setup web application

*Note: This process only works in Chrome / Firefox / Opera*

- **Step 1** Go to [setup.particle.io](https://setup.particle.io)
- **Step 2** Click on `Setup a Photon`
- **Step 3** After clicking on `NEXT`, you should be presented with a file (`photonsetup.html`)
- **Step 4** Open the file

After opening the file:
- **Step 5** Connect your PC to the Photon, by connecting to the network named `PHOTON-...`
- **Step 6** Configure your Wi-Fi credentials

*Note: If you mistyped your credentials, the Photon will blink dark blue or green. You have to go through the process again (by refreshing the page or clicking on the retry process part)*

-  **Step 7** Rename your device. You will also see a confirmation if the device was claimed or not

*Note: Make sure your Photon is not part of a product before claiming it*

#### Why a separate file?

We care a lot about security, and we want to make sure that everything you do is safe. Downloading a local file ensures that the credentials are sent directly to the Photon, without any chance of being intercepted.

### Step 2b: Connect your Photon to the Internet using your smartphone

Open the app on your phone. Log in or sign up for an account with Particle if you don't have one.

Press the plus icon and select the device you'd like to add. Then follow the instructions on the screen to {{#if photon}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 5 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} {{#if core}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 7 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} Remember that to connect the Core, you need the older Spark Core app and to connect the Photon you need the new Particle App.

This may take a little while - but don't worry.

{{#if core}}While you're waiting, your Core will go through the following colors:

* *Blinking blue:* Listening for Wi-Fi credentials
* *Solid blue:* Getting Wi-Fi info from app
* *Blinking green:* Connecting to the Wi-Fi network
* *Blinking cyan:* Connecting to the Particle Device Cloud
* *Blinking magenta:* Updating to the newest firmware
* *Breathing cyan:* Connected!

{{/if}}

{{#if photon}} If this is your Photon's first time connecting, it will blink purple for a few minutes as it downloads updates. **This is perfectly normal.** It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. **Please do not restart or unplug your Photon during this time.** If you do, you may need to follow [this guide](http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042) to fix your device. {{/if}}

If you can't seem to get the Mobile App to connect your device, that's okay! Read over this example quickly, and then check out the [next lesson](/guide/getting-started/connect) to connect your device using the USB cable.

Once you have connected your device, it has learned that network. Your device can store up to {{#if core}}seven{{/if}} {{#if photon}}five{{/if}} networks. To add a new network after your initial setup, you'd put your device into {{#if photon}}{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}{{/if}}{{#if core}}{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}{{/if}} again and proceed as above (the claiming part can be skipped). If you feel like your device has too many networks on it, you can wipe your device's memory of any Wi-Fi networks it has learned. You can do so by continuing to hold the `{{system-button}}` button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.

### Step 3: Blink an LED!
{{#if core}}The Spark Core App should now be on the {{{ popup 'Tinker' 'note' 'We have taken the liberty of loading some firmware onto your device for you. It is called Tinker, and it helps you talk to your device by sending power to the pins and reading power levels from the pins. More info about Tinker is available [here](/guide/getting-started/tinker/core).'}}} screen, as shown below.

![Tinker on your Phone!](/assets/images/tinker-core.png)
{{/if}}
{{#if photon}}The Particle App should now be on the {{{ popup 'Tinker' 'note' 'We have taken the liberty of loading some firmware onto your device for you. It is called Tinker, and it helps you talk to your device by sending power to the pins and reading power levels from the pins. More info about Tinker is available [here](/guide/getting-started/tinker/photon).'}}} screen, as shown below.

![Tinker on your Phone!](/assets/images/tinker.png)
{{/if}}

As you can see on your smartphone, the circles represent different pins on your device. If you tap on these circles, you can see the Tinker functions available for the associated pins.

We could use Tinker and the smartphone app to talk to any pin on your device. If you had a buzzer, an LED, a sensor, etc., you could interact with it using Tinker on your phone. But since I know you're very eager to get started, let's use an LED already provided on your device.

The D7 pin comes already wired to a small blue LED on the face of your device. When you set the power of the D7 pin to high, this LED turns on. Let's do that now.

Tap `D7` then `digitalWrite` in the popup. Now when you tap the D7 circle the tiny blue LED should turn off or on!

**Congratulations, you just blinked an LED over the internet, using your Particle device!**


Keep in mind that with Tinker, you can communicate with any of the pins, not just with the D7 LED. You can wire things to the pins to run motors, read sensors, and much more. The real fun part comes when you write your own firmware, of course. We'll go over that in later sections.

If you don't have your smartphone with you, go ahead and move to the next lesson on [connecting over USB.](/guide/getting-started/connect). If you've successfully connected with your smartphone and you'd like to keep playing around with Tinker, skip ahead to learn [device modes](/guide/getting-started/modes) and then do some [Tinker examples](/guide/getting-started/tinker).

Otherwise, go to the next section to learn to connect over USB.
{{/if}} {{!-- has-wifi --}}

{{/if}}{{!-- raspberry-pi --}}
