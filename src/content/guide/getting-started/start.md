---
title: Getting started
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 2
---

# Getting Started

## Getting to Know You

{{#if photon}}
![](/assets/images/photon-kit-new.jpg)
<p class="caption">Your new Photon! Note that many components pictured will only be included if you purchased a Photon Kit</p>
{{/if}}
{{#if core}}![](/assets/images/core-box.jpg){{/if}}

Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [contents](/datasheets/kits) and check out their [hardware datasheets](/datasheets) if you like! If you have an Internet Button, read through this section to get started and connect your device, then hop over to the [Internet Button Guide](/guide/getting-started/button) for more detailed info.

Let's quickly go over what you see.

### What's on it?

{{#if photon}}{{{popup '**The Wi-Fi Module.**' 'img' 'photon-module.jpg'}}}{{/if}}{{#if core}}{{{popup '**The Wi-Fi Module.**' 'img' 'core-cc3000.jpg'}}}{{/if}} This is probably why you bought your device-- the Wi-Fi module allows your Core or Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network. {{#if photon}} **Do not press down on the Photon's module.** Doing so triggers a reset and is generally not good for the Photon. {{/if}}


{{#if photon}}{{{popup '**The Microcontroller.**' 'img' 'photon-module.jpg'}}}{{/if}}{{#if core}}{{{popup '**The Microcontroller.**' 'img' 'core-stm32.jpg'}}}{{/if}} The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called *firmware* or an *embedded application*). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.


{{#if photon}}{{{popup '**The Pins.**' 'img' 'photon-pinout.png'}}}{{/if}} {{#if core}} {{{popup '**The Pins.**' 'img' 'core-pinout.png'}}} {{/if}} Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.

{{#if photon}}
{{{popup '**Buttons**' 'img' 'photon-buttons.jpg'}}} **and** {{{popup '**LEDs.**' 'img' 'photon-leds.jpg'}}} There are several awesome buttons and LEDs on your Photon to make it easier to use.

- The `SETUP` button is on the left and the `RESET` button is on the right. You can use these buttons to help you set your device's [mode](/guide/getting-started/modes).
- The RGB LED is in the center of your Photon, above the module. The color of the RGB LED tells you what [mode](/guide/getting-started/modes) your Photon is currently in.
- The D7 LED is next to the D7 pin on your Photon, on the upper right quadrant. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}


{{#if core}}

{{{popup '**Buttons**' 'img' 'core-buttons.jpg'}}} **and** {{{popup '**LEDs.**' 'img' 'core-leds.jpg'}}} There are several awesome buttons and LEDs on your Core to make it easier to use.

- The `MODE` button is on the left and the `RESET` button is on the right. You can use these buttons to help you set your device's [mode](/guide/getting-started/modes).
- The **RGB LED** is in the center of your Core, above the module. The color of the RGB LED tells you what [mode](/guide/getting-started/modes) your Core is currently in.
- The **D7 LED** in the upper right side of your device. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}

For more technical details on what comes on your device, go [here](/datasheets).

## Prerequisites for Setup
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

In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.



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
* *Blinking cyan:* Connecting to the Spark Cloud
* *Blinking magenta:* Updating to the newest firmware
* *Breathing cyan:* Connected!

{{/if}}

{{#if photon}} If this is your Photon's first time connecting, it will blink purple for a few minutes as it downloads updates. **This is perfectly normal.** It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. **Please do not restart or unplug your Photon during this time.** If you do, you may need to follow [this guide](http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042) to fix your device. {{/if}}

If you can't seem to get the Mobile App to connect your device, that's okay! Read over this example quickly, and then check out the [next lesson](/guide/getting-started/connect) to connect your device using the USB cable.

Once you have connected your device, it has learned that network. Your device can store up to {{#if core}}seven{{/if}} {{#if photon}}five{{/if}} networks. If you feel like your device has too many networks on it, you can wipe your device's memory of any wifi networks it has learned. You can do so by continuing to hold the MODE button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.

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
