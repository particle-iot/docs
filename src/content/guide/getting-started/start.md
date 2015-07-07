---
title: 2. Getting started
template: guide.hbs
columns: two
devices: [ photon, core ]
order: 2
---

#Getting Started

## Getting to Know You

{{#if photon}}![](/assets/images/phokit-box.jpg){{/if}}
{{#if core}}![](/assets/images/core-box.jpg){{/if}}

Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [contents](/datasheets/kits) and check out their [hardware datasheets](/datasheets) if you like! Let's quickly go over what you see.

####What's on it?

{{#if photon}}<span class="popupLink">**The Wi-Fi Module.**<span class="popup"><img src="/assets/images/photon-module.jpg" style="margin:auto;"></span></span>{{/if}}{{#if core}}<span class="popupLink">**The Wi-Fi Module.**<span class="popup"><img src="/assets/images/core-cc3000.jpg" style="margin:auto;"></span></span>{{/if}} This is probably why you bought your device-- the Wi-Fi module allows your Core or Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network.



{{#if photon}}<span class="popupLink">**The Microcontroller.**<span class="popup"><img src="/assets/images/photon-module.jpg" style="margin:auto;"></span></span>{{/if}}{{#if core}}<span class="popupLink">**The Microcontroller.**<span class="popup"><img src="/assets/images/core-stm32.jpg" style="margin:auto;"></span></span>{{/if}} The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called *firmware* or an *embedded application*). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.



{{#if photon}}<span class="popupLink">**The Pins.**<span class="popup"><img src="/assets/images/photon-pinout.png" style="margin:auto;"></span></span>{{/if}} {{#if core}} **The Pins.** {{/if}} Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.

{{#if photon}}
<span class="popupLink">**Buttons**<span class="popup"><img src="/assets/images/photon-buttons.jpg" style="margin:auto;"></span></span> **and** <span class="popupLink">**LEDs.**<span class="popup"><img src="/assets/images/photon-leds.jpg" style="margin:auto;"></span></span> There are several awesome buttons and LEDs on your Photon to make it easier to use.

- The `SETUP` button is on the left and the `RESET` button is on the right. You can use these buttons to help you set your device's [mode](../../modes).
- The RGB LED is in the center of your Photon, above the module. The color of the RGB LED tells you what [mode](/../../modes) your Photon is currently in.
- The D7 LED is next to the D7 pin on your Photon, on the upper right quadrant. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}


{{#if core}}

<span class="popupLink">**Buttons**<span class="popup"><img src="/assets/images/core-buttons.jpg" style="margin:auto;"></span></span> **and** <span class="popupLink">**LEDs.**<span class="popup"><img src="/assets/images/core-leds.jpg" style="margin:auto;"></span></span> There are several awesome buttons and LEDs on your Core to make it easier to use.

- The `MODE` button is on the left and the `RESET` button is on the right. You can use these buttons to help you set your device's [mode](../../modes).
- The **RGB LED** is in the center of your Core, above the module. The color of the RGB LED tells you what [mode](../../modes) your Core is currently in.
- The **D7 LED** in the upper right side of your device. This LED will turn on when the D7 pin is set to `HIGH`.

{{/if}}

For more technical details on what comes on your device, go [here](/datasheets).

####Okay great, I want to play with it I want to make it do a thing right now!

Good, me too! Let's get started.

##Hello World!
In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone. If you don't have your smartphone with you, go ahead and move to the next lesson on [connecting over USB.](../../connect)

{{#if photon}}
####Materials
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Software**
  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}
####Materials
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Software**
  * Spark Core Mobile App - [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) | [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)
* **Experience**
    * None! This is your first project.

{{/if}}

####Step 1: Power On Your Device
{{#if photon}}![plug in your device!](/assets/images/photon-plugged-in.jpg){{/if}}
{{#if core}}![plug in your device!](/assets/images/core-front.jpg){{/if}}


Plug the USB cable into your power source. <span class="footnoteLink">(Your computer works perfectly for this purpose.)<span class="footnote"> Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.</span></span>

As soon as it is plugged in, the RGB LED on your device should begin blinking blue.

{{#if photon}}

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUg2ZjVpn7/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

{{/if}}

{{#if core}}

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU92D9X9ge/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

{{/if}}

If your device is not blinking blue, hold down the "MODE" button for three seconds to reset.

{{#if photon}}

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

{{/if}}

{{#if core}}

<div class="iframe-wrapper">
  <iframe src="https://vine.co/v/eZU6YiK20Hl/embed/simple" width="320" height="320" frameborder="0"></iframe>
</div>

{{/if}}

If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.

####Step 2: Connect With Your Smartphone

<p class="boxedHead">Learning Note: What happens when my device wants to talk to the Internet?</p>

<p class="boxed"> 
When your device comes to life for the first time, it has a specific set of objectives:
* Find wifi
* Connect to wifi
* Execute firmware

Unless you tell it not to, your device will run through these commands every time you power it on. You can teach it different wifi networks using your phone or computer. It remembers up to 7 wifi networks, and it will connect to these automatically if it can find them.

When you power on your device for the very first time, though, it doesn't know any networks. It blinks blue, which is its way of saying, "Hey, I'm ready to find some wifi." Let's help it out.
</p>

Open the app on your phone. Log in or sign up for an account with Particle if you don't have one.

Follow the instructions on the screen to connect your Core or Photon. Remember that to connect the Core, you need the older Spark Core app and to connect the Photon you need the new Particle App.

This may take a little while- but don't worry.

{{#if core}}While you're waiting, your Core will go through the following colors:

* *Blinking blue:* Listening for Wi-Fi credentials
* *Solid blue:* Getting Wi-Fi info from app
* *Blinking green:* Connecting to the Wi-Fi network
* *Blinking cyan:* Connecting to the Spark Cloud
* *Blinking magenta:* Updating to the newest firmware
* *Breathing cyan:* Connected!

{{/if}}
If you are having trouble connecting, that's okay! Read over this example quickly, and then check out the [next lesson](../../connect) to connect your device using the USB cable.

Once you have connected your device, it has learned that network. Your device can store up to seven networks. If you feel like your device has too many networks on it, you can wipe your device's memory of any wifi networks it has learned. You can do so by continuing to hold the MODE button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.

####Step 3: Blink an LED!
{{#if core}}The Spark Core App should now be on the Tinker screen, as shown below.

![Tinker on your Phone!](/assets/images/tinker-core.png)
{{/if}}
{{#if photon}}The Particle App should now be on the Tinker screen, as shown below.

![Tinker on your Phone!](/assets/images/tinker.png)
{{/if}}


<p class="boxedHead">**Learning Note: What is Tinker?**</p>
<p class = "boxed"> 
We've taken the liberty of loading some firmware onto your device for you. It's called Tinker, and it helps you talk to your device by sending power to the pins and reading power levels from the pins. Tinker's functions include:
* `digitalRead` reads the input of a digital pin, such as one connected to a button or motion sensor. The input will be either HIGH (powered at 3.3 V) or LOW (not powered).
* `digitalWrite` sends digital output to a digital pin, such as one connected to a signal light. You can set this output to HIGH (powered at 3.3 V) or LOW (not powered).
* `analogRead` reads the input of an analog pin, such as one connected to a temperature sensor. The input will be between 0 and 255.
* `analogWrite` writes analog output to an analog pin, such as a dimmable LED. You can set this output from 0 to 255.

We'll go over this more [later](../../tinker), so don't worry. For more documentation on Tinker, click [here](/reference/tinker).
</p> 

As you can see on your smartphone, the circles represent different pins on your device. If you tap on these circles, you can see the Tinker functions available for the associated pins.

We could use Tinker and the smartphone app to talk to any pin on your device. If you had a buzzer, an LED, a sensor, etc., you could interact with it using Tinker on your phone. But since I know you're very eager to get started, let's use an LED already provided on your device.

The D7 pin comes already wired to a small blue LED on the face of your device. When you set the power of the D7 pin to high, this LED turns on. Let's do that now.

Tap `D7` then `digitalWrite` in the popup. Now when you tap the D7 circle the tiny blue LED should turn off or on!

**Congratulations, you just blinked an LED over the internet, using your Particle device!**


Keep in mind that with Tinker, you can communicate with any of the pins, not just with the D7 LED. You can wire things to the pins to run motors, read sensors, and much more. The real fun part comes when you write your own firmware, of course. We'll go over that in later sections.

The next lesson is on [connecting over USB](../../connect). If you've successfully connected with your smartphone and you'd like to keep playing around with Tinker, skip ahead to learn [device modes](../../modes) and then do some [Tinker examples](../../tinker).

Otherwise, go to the [next section](../../connect) to learn to connect over USB.
