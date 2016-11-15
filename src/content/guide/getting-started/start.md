---
title: Getting started
template: guide.hbs
columns: two
devices: [ photon,electron,core,raspberry-pi ]
order: 2
---

# Getting Started

{{#if raspberry-pi}}

_Particle on the Raspberry Pi is still in beta. We know you're eager to get started, but you won't be able to complete all these steps before you receive your beta activation email._

<a class="big button" href="https://www.particle.io/particle-pi">Sign up for the beta to reserve your spot.</a>

## What do I need

To connect a Raspberry Pi to the Particle cloud you'll need a Raspberry Pi, a power supply, SD card and a way to connect it to the network. If you don't have access to a wired network cable you will need a keyboard, mouse and monitor.

![](/assets/images/raspberry-pi-kit.jpg)

## Getting the Raspberry Pi Ready

First, let's make sure the Raspberry Pi is running the latest Raspbian operating system.

You can [download Raspbian on the Raspberry Pi website](https://www.raspberrypi.org/downloads/raspbian/) and [follow the official installation guide](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).

When the SD card is ready, insert it into the Raspberry Pi and connect it to power.

Next you'll need to connect the Raspberry Pi to the Internet.

If you are using a wired network connection, just connect the wire and you're done!

If you want to connect the Raspberry Pi to the Internet with Wi-Fi, you can either configure the Wi-Fi remotely by connecting a wired network cable or configure it through the graphical user interface by connecting a keyboard, mouse and monitor.

### Remote Wi-Fi Setup

Connect a wired network cable to the Raspberry Pi.

TODO: Add instructions on getting the IP address of a Raspberry Pi connected through Ethernet.

Connect to the Raspberry Pi through secure shell (SSH). On Windows,
download [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). On macOS and Linux, use the `ssh` command in a Terminal.

```
ssh pi@192.168.0.100
```
where `192.168.0.100` is the IP address of your Pi.

The default password for the Raspberry Pi is `raspberry`

After connecting, run:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```

Insert these lines at the end of the file:
```
network={
	ssid="MyWiFiNetwork"
	psk="the_password"
	key_mgmt=WPA-PSK
}

```

### Graphic Interface Wi-Fi Setup

Connecting a keyboard, mouse and monitor to the Raspberry Pi.

Configure your Wi-Fi network through the icon on the top right.

![](/assets/images/raspberry-pi-wifi-ssid.png)

![](/assets/images/raspberry-pi-wifi-password.png)

![](/assets/images/raspberry-pi-wifi-connected.png)

While you are here you can also find the IP address of your Raspberry Pi by running `ifconfig wlan0` in a terminal.

![](/assets/images/raspberry-pi-ip-address.png)

## Installing the Particle Software

To get your Raspberry Pi connected to the Particle cloud, you need to
install the Particle Agent. It's a software service that runs in the
background on the Raspberry Pi and allows you to write and run firmware
(software that interacts with the I/O pins).

Install the agent by pasting this command in a terminal on your
Raspberry Pi, either while connected remotely through SSH or locally
with a keyboard and monitor.

```
bash <( curl -sL https://particle.io/install-pi )
```

When the installation is over, the Particle Agent setup will ask you to
sign in to your Particle account. If you don't have one yet, [create a
Particle account at https://login.particle.io/signup](https://login.particle.io/signup).

_If you have not received your beta activation email yet, you won't be able to finish the setup. Hang on tight. The email will come in soon!_

If you have to restart the setup process later, the command is `sudo particle-agent setup`.

When the setup finishes, the Raspberry Pi will be online, running the
Tinker firmware and claimed to your account.

## Tinkering with the Raspberry Pi

Now that your Raspberry Pi is connected to the Particle Cloud, you can use the Particle Mobile App to toggle pins and light LEDs.

Install the app and log in.

  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)

Select your Raspberry Pi device from the list and you'll see the Tinker screen.

![Tinker on your Phone!](/assets/images/tinker.png)

Since the Raspberry Pi doesn't have labels next to the I/O pins, you'll
need to refer to [the pin out diagram in the datasheet](/datasheets/raspberrypi-datasheet/#pin-out-diagram)

Connect an LED and a resistor (any value between 200 ohm and 1000 ohm) between D0, the 4th pin on the top left and GND, the 13th pin on the left.

![](/assets/images/raspberry-pi-tinker.jpg)

Tap the D0 pin on the Mobile App and select `digitalWrite`. You'll be able to toggle the LED by tapping on the D0 pin again.

Congratulations, you've just toggled an LED over the Internet!

See more information in the [Tinker section](/guide/getting-started/tinker)

## Writing a First App

Go to the [Web IDE section](/guide/getting-started/build) to learn how to write your first app.

{{else}}

## What's in the Box?

{{#if photon}}
![](/assets/images/photon-kit-new.jpg)
<p class="caption">Your new Photon! Note that many components pictured will only be included if you purchased a Photon Kit.</p>
{{/if}}

{{#if core}}
![](/assets/images/core-box.jpg)
{{/if}}

{{#if electron}}
![](/assets/images/electronItemBox.png)
<p class="caption">Introducing the Electron.</p>
{{/if}}

Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [kit add-ons](/datasheets/kits) and check out the {{#if photon}}[Photon datasheet](/datasheets/photon-datasheet/){{/if}}{{#if core}}[Core datasheet](/datasheets/core-datasheet/){{/if}}{{#if electron}}[Electron datasheet](/datasheets/electron-datasheet/){{/if}} if you like!

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

{{#if electron}}{{{popup '**The Cellular Module.**' 'img' 'electronUblox.png'}}}
This is probably why you bought your device-- the cellular module allows your Electron to communicate with the internet in over 120 countries!
The cellular module is also accompanied with a Particle SIM card.

It connects your device to the internet in the same way that your smartphone might connect to its cellular network.
[See our coverage map](/support/troubleshooting/common-issues/electron/#6-check-the-cellular-coverage-in-your-area).
{{/if}}

{{#if photon}}{{{popup '**The Wi-Fi Module.**' 'img' 'photon-module.jpg'}}}{{/if}}
{{#if core}}{{{popup '**The Wi-Fi Module.**' 'img' 'core-cc3000.jpg'}}}{{/if}}
{{#if photon}}This is probably why you bought your device-- the Wi-Fi module allows your Core or Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network.{{/if}}
{{#if core}}This is probably why you bought your device-- the Wi-Fi module allows your Core or Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network.{{/if}}
{{#if photon}} **Do not press down on the Photon's module.** Doing so triggers a reset and is generally not good for the Photon. {{/if}}


{{#if photon}}{{{popup '**The Microcontroller.**' 'img' 'photon-module.jpg'}}}{{/if}}
{{#if core}}{{{popup '**The Microcontroller.**' 'img' 'core-stm32.jpg'}}}{{/if}}
{{#if electron}}{{{popup '**The Microcontroller.**' 'img' 'electronMCU.png'}}}{{/if}}
The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called *firmware* or an *embedded application*). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.


{{#if electron}}{{{popup '**The Pins.**' 'img' 'mk-header-male.jpg'}}}{{/if}}{{#if photon}}{{{popup '**The Pins.**' 'img' 'photon-pinout.png'}}}{{/if}} {{#if core}} {{{popup '**The Pins.**' 'img' 'core-pinout.png'}}} {{/if}} Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.


{{#if electron}}{{{popup '**The Antenna & USB Cable.**' 'img' 'electronAntenna.jpg'}}}
The cellular antenna is imperative for the Electron to reach connection to a cellular tower. It will operate for all 2G/3G frequencies that your
Electron needs, depending on the version you have. The USB cable provides a means to charge your Electron as well as send serial and dfu commands to your device.
{{/if}}


{{#if electron}}{{{popup '**The Battery.**' 'img' 'electronBattery.jpg'}}}
The Electron comes with a standard 2000mAh 3.7V LiPo battery (rechargeable) which allows the Electron to be powered over long periods of time without needing a connection
to wired power source. Consider this battery your Electron's best friend!
{{/if}}


{{#if photon}}
{{{popup '**Buttons**' 'img' 'photon-buttons.jpg'}}} **and** {{{popup '**LEDs.**' 'img' 'photon-leds.jpg'}}} There are several awesome buttons and LEDs on your Photon to make it easier to use.

- The `{{system-button}}` button is on the left and the `{{reset-button}}` button is on the right. You can use these buttons to help you set your device's [mode](/guide/getting-started/modes).
- The RGB LED is in the center of your Photon, above the module. The color of the RGB LED tells you what [mode](/guide/getting-started/modes) your Photon is currently in.
- The D7 LED is next to the D7 pin on your Photon, on the upper right quadrant. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}


{{#if core}}

{{{popup '**Buttons**' 'img' 'core-buttons.jpg'}}} **and** {{{popup '**LEDs.**' 'img' 'core-leds.jpg'}}} There are several awesome buttons and LEDs on your Core to make it easier to use.

- The `{{system-button}}` button is on the left and the `{{reset-button}}` button is on the right. You can use these buttons to help you set your device's [mode](/guide/getting-started/modes).
- The **RGB LED** is in the center of your Core, above the module. The color of the RGB LED tells you what [mode](/guide/getting-started/modes) your Core is currently in.
- The **D7 LED** in the upper right side of your device. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}

For more technical details on what comes on your device, go {{#if core}}[here](/datasheets/core-datasheet/){{/if}}{{#if photon}}[here](/datasheets/kits/#photon){{/if}}{{#if electron}}[here](/datasheets/kits/#electron){{/if}}.


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
  * You can also use the Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
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
{{/if}}

{{#if photon}}
* **Software**
  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Wifi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcasted SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP wifi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}
* **Software**
  * Spark Core Mobile App - [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) | [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Wifi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcasted SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP wifi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if photon}}
## Connect Your Photon
{{/if}}
{{#if core}}
## Connect Your Core
{{/if}}

{{#if photon}}
In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.

<iframe src="https://player.vimeo.com/video/178282058" width="320" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


{{/if}}
{{#if core}}
In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.
{{/if}}


{{#if photon}}
### Step 1: Power On Your Device
{{#if photon}}![plug in your device!](/assets/images/photon-plugged-in.jpg){{/if}}
{{#if core}}![plug in your device!](/assets/images/core-front.jpg){{/if}}


Plug the USB cable into your power source. {{{ popup '(Your computer works perfectly for this purpose.)' 'note' 'Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.'}}}

As soon as it is plugged in, the RGB LED on your device should begin {{#if photon}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}}

If your device is not blinking blue, {{#if photon}}{{{popup 'hold down the SETUP button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUgHYYrYgl/embed/simple'}}}{{/if}}

If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.

### Step 2: Connect With Your Smartphone

Open the app on your phone. Log in or sign up for an account with Particle if you don't have one.

Press the plus icon and select the device you'd like to add. Then follow the instructions on the screen to {{#if photon}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 5 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} {{#if core}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 7 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} Remember that to connect the Core, you need the older Spark Core app and to connect the Photon you need the new Particle App.

This may take a little while - but don't worry.

{{#if core}}While you're waiting, your Core will go through the following colors:

* *Blinking blue:* Listening for Wi-Fi credentials
* *Solid blue:* Getting Wi-Fi info from app
* *Blinking green:* Connecting to the Wi-Fi network
* *Blinking cyan:* Connecting to the Particle Cloud
* *Blinking magenta:* Updating to the newest firmware
* *Breathing cyan:* Connected!

{{/if}}

{{#if photon}} If this is your Photon's first time connecting, it will blink purple for a few minutes as it downloads updates. **This is perfectly normal.** It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. **Please do not restart or unplug your Photon during this time.** If you do, you may need to follow [this guide](http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042) to fix your device. {{/if}}

If you can't seem to get the Mobile App to connect your device, that's okay! Read over this example quickly, and then check out the [next lesson](/guide/getting-started/connect) to connect your device using the USB cable.

Once you have connected your device, it has learned that network. Your device can store up to {{#if core}}seven{{/if}} {{#if photon}}five{{/if}} networks. To add a new network after your initial setup, you'd put your device into {{#if photon}}{{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}} again and proceede as above (the claiming part can be skipped). If you feel like your device has too many networks on it, you can wipe your device's memory of any wifi networks it has learned. You can do so by continuing to hold the `{{system-button}}` button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.

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
{{/if}}<!-- end of photon's steps -->

{{#if core}}
### Step 1: Power On Your Device
{{#if photon}}![plug in your device!](/assets/images/photon-plugged-in.jpg){{/if}}
{{#if core}}![plug in your device!](/assets/images/core-front.jpg){{/if}}


Plug the USB cable into your power source. {{{ popup '(Your computer works perfectly for this purpose.)' 'note' 'Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.'}}}

As soon as it is plugged in, the RGB LED on your device should begin {{#if photon}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}}

If your device is not blinking blue, {{#if photon}}{{{popup 'hold down the SETUP button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUgHYYrYgl/embed/simple'}}}{{/if}}

If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.

### Step 2: Connect With Your Smartphone

Open the app on your phone. Log in or sign up for an account with Particle if you don't have one.

Follow the instructions on the screen to {{#if photon}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 5 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} {{#if core}}{{{ popup 'connect your device to Wi-Fi.' 'note' 'Your device remembers up to 7 wifi networks, and it will connect to these automatically if it can find them.'}}}{{/if}} Remember that to connect the Core, you need the older Spark Core app and to connect the Photon you need the new Particle App.

This may take a little while - but don't worry.

{{#if core}}While you're waiting, your Core will go through the following colors:

* *Blinking blue:* Listening for Wi-Fi credentials
* *Solid blue:* Getting Wi-Fi info from app
* *Blinking green:* Connecting to the Wi-Fi network
* *Blinking cyan:* Connecting to the Particle Cloud
* *Blinking magenta:* Updating to the newest firmware
* *Breathing cyan:* Connected!

{{/if}}

{{#if photon}} If this is your Photon's first time connecting, it will blink purple for a few minutes as it downloads updates. **This is perfectly normal.** It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. **Please do not restart or unplug your Photon during this time.** If you do, you may need to follow [this guide](http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042) to fix your device. {{/if}}

If you can't seem to get the Mobile App to connect your device, that's okay! Read over this example quickly, and then check out the [next lesson](/guide/getting-started/connect) to connect your device using the USB cable.

Once you have connected your device, it has learned that network. Your device can store up to {{#if core}}seven{{/if}} {{#if photon}}five{{/if}} networks. To add a new network after your initial setup, you'd put your device into {{#if photon}}{{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'Listening Mode' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}} again and proceede as above (the claiming part can be skipped). If you feel like your device has too many networks on it, you can wipe your device's memory of any wifi networks it has learned. You can do so by continuing to hold the `{{system-button}}` button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.

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
{{/if}}

{{/if}}{{!-- raspberry-pi --}}
