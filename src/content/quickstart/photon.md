---
title: Xenon Kit
layout: quickstart.hbs
columns: two
order: 6
---

## What's in the box
![](/assets/images/photon-kit-new.jpg)
<p class="caption">Your new Photon! Note that many components pictured will only be included if you purchased a Photon Kit.</p>



Congratulations on being the owner of a brand new Particle Device! Go ahead and open the box. You can see the different [kit addons](https://docs.particle.io/datasheets/kits) and check out the [Photon datasheet](https://docs.particle.io/datasheets/photon-datasheet/) if you like!

If you have an Internet Button, read through this section to get started and connect your device, then hop over to the [Internet Button tutorial](https://docs.particle.io/guide/tools-and-features/button/) for more detailed info.

Let's quickly go over what you see.

### What's on it?
#### The Wi-Fi Module

This is probably why you bought your device-- the Wi-Fi module allows your Photon to communicate with the internet. It connects your device to the internet in the same way that your smartphone might connect to a wifi network. **Do not press down on the Photon's module. Doing so triggers a reset and is generally not good for the Photon.**

#### The Microcontroller

The microcontroller is the brain of your device. It runs your software and tells your prototype what to do. Unlike your computer, it can only run one application (often called _firmware_ or an _embedded application_). This application can be simple (just a few lines of code), or very complex, depending on what you want to do. The microcontroller interacts with the outside world using pins.

#### The Pins

Pins are the input and output parts of the microcontroller that are exposed on the sides of your device. GPIO pins can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and buzzers to act upon the world. There are also pins to allow you to power your device, or power motors and outputs outside of your device. There are pins for Serial/UART communication, and a pin for resetting your device.

#### Buttons & LEDs

There are several awesome buttons and LEDs on your Photon to make it easier to use.

The SETUP button is on the left and the RESET button is on the right. You can use these buttons to help you set your device's mode.
The RGB LED is in the center of your Photon, above the module. The color of the RGB LED tells you what mode your Photon is currently in.
The D7 LED is next to the D7 pin on your Photon, on the upper right quadrant. This LED will turn on when the D7 pin is set to HIGH.
* **Software**
  * Particle Mobile App - [iPhone](https://itunes.apple.com/us/app/particle-build-iot-projects-wifi-or-cellular/id991459054?mt=8) | [Android](https://play.google.com/store/apps/details?id=io.particle.android.app)
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


## Connect Your Photon
In this example, we will connect your device to the internet for the very first time. Then, we will blink the D7 LED on your device by using your smartphone.

<iframe src="https://player.vimeo.com/video/178282058" width="320" height="240" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Step 1: Power On Your Device
![plug in your device!](/assets/images/photon-plugged-in.jpg)

Plug the USB cable into your power source. <span class="footnoteLink">(Your computer works perfectly for this purpose.)<span class="footnote">Your Particle device does not need your computer to connect to wifi. You could just as easily power your device with a power brick, a battery shield, or another power source wired to the VIN pin.</span></span></p>
<p>As soon as it is plugged in, the RGB LED on your device should begin <span class="popupLink">blinking blue.<span class="popup"><iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span></p>
<p>If your device is not blinking blue, <span class="popupLink">hold down the SETUP button.<span class="popup"><iframe src="https://vine.co/v/eZUHUIjq7pO/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span></p>
<p>If your device is not blinking at all, or if the LED is burning a dull orange color, it may not be getting enough power. Try changing your power source or USB cable.</p>

### Step 2a: Connect your Photon to the Internet using the setup web application
<p>
<ul>
<li><strong>Step 1</strong> Go to <a href="https://setup.particle.io" target="_blank" rel="noopener noreferrer">setup.particle.io</a></li>
<li><strong>Step 2</strong> Click on <code>Setup a Photon</code></li>
<li><strong>Step 3</strong> After clicking on <code>NEXT</code>, you should be presented with a file (<code>photonsetup.html</code>)</li>
<li><strong>Step 4</strong> Open the file</li>
</ul>
<p>After opening the file:</p>
<ul>
<li><strong>Step 5</strong> Connect your PC to the Photon, by connecting to the network named <code>PHOTON-...</code></li>
<li><strong>Step 6</strong> Configure your Wi-Fi credentials</li>
</ul>
<p><em>Note: If you mistyped your credentials, the Photon will blink dark blue or green. You have to go through the process again (by refreshing the page or clicking on the retry process part)</em></p>
<ul>
<li><strong>Step 7</strong> Rename your device. You will also see a confirmation if the device was claimed or not</li>
</ul>
<p><em>Note: Make sure your Photon is not part of a product before claiming it</em></p>
<h4 id="why-a-separate-file-">Why a separate file?<a href="#why-a-separate-file-" class="header-permalinks"><i class="ion-link"></i></a></h4><p>We care a lot about security, and we want to make sure that everything you do is safe. Downloading a local file ensures that the credentials are sent directly to the Photon, without any chance of being intercepted.</p>
<h3 id="step-2b-connect-your-photon-to-the-internet-using-your-smartphone">Step 2b: Connect your Photon to the Internet using your smartphone<a href="#step-2b-connect-your-photon-to-the-internet-using-your-smartphone" class="header-permalinks"><i class="ion-link"></i></a></h3><p>Open the app on your phone. Log in or sign up for an account with Particle if you don&apos;t have one.</p>
<p>Press the plus icon and select the device you&apos;d like to add. Then follow the instructions on the screen to <span class="footnoteLink">connect your device to Wi-Fi.<span class="footnote">Your device remembers up to 5 wifi networks, and it will connect to these automatically if it can find them.</span></span></p>
<p>This may take a little while - but don&apos;t worry.</p>
<p> If this is your Photon&apos;s first time connecting, it will blink purple for a few minutes as it downloads updates. <strong>This is perfectly normal.</strong> It may take 6-12 minutes for the updates to complete, depending on your internet connection, with the Photon restarting a few times in the process. <strong>Please do not restart or unplug your Photon during this time.</strong> If you do, you may need to follow <a href="http://community.particle.io/t/photon-troubleshooting-guide-as-of-firmware-v0-4-5/16042" target="_blank" rel="noopener noreferrer">this guide</a> to fix your device. </p>
<p>If you can&apos;t seem to get the Mobile App to connect your device, that&apos;s okay! Read over this example quickly, and then check out the <a href="/guide/getting-started/connect">next lesson</a> to connect your device using the USB cable.</p>
<p>Once you have connected your device, it has learned that network. Your device can store up to  five networks. To add a new network after your initial setup, you&apos;d put your device into <span class="popupLink">Listening Mode<span class="popup"><iframe src="https://vine.co/v/eZUH7WaWjMT/embed/simple" width="320" height="320" frameborder="0"></iframe></span></span> again and proceed as above (the claiming part can be skipped). If you feel like your device has too many networks on it, you can wipe your device&apos;s memory of any Wi-Fi networks it has learned. You can do so by continuing to hold the <code>SETUP</code> button for 10 seconds until the RGB LED flashes blue quickly, signaling that all profiles have been deleted.</p>
<h3 id="step-3-blink-an-led-">Step 3: Blink an LED!<a href="#step-3-blink-an-led-" class="header-permalinks"><i class="ion-link"></i></a></h3><p>The Particle App should now be on the <span class="footnoteLink">Tinker<span class="footnote">We have taken the liberty of loading some firmware onto your device for you. It is called Tinker, and it helps you talk to your device by sending power to the pins and reading power levels from the pins. More info about Tinker is available <a href="/guide/getting-started/tinker/photon">here</a>.</span></span> screen, as shown below.</p>
<p><img src="/assets/images/tinker.png" alt="Tinker on your Phone!"></p>
<p>As you can see on your smartphone, the circles represent different pins on your device. If you tap on these circles, you can see the Tinker functions available for the associated pins.</p>
<p>We could use Tinker and the smartphone app to talk to any pin on your device. If you had a buzzer, an LED, a sensor, etc., you could interact with it using Tinker on your phone. But since I know you&apos;re very eager to get started, let&apos;s use an LED already provided on your device.</p>
<p>The D7 pin comes already wired to a small blue LED on the face of your device. When you set the power of the D7 pin to high, this LED turns on. Let&apos;s do that now.</p>
<p>Tap <code>D7</code> then <code>digitalWrite</code> in the popup. Now when you tap the D7 circle the tiny blue LED should turn off or on!</p>
<p><strong>Congratulations, you just blinked an LED over the internet, using your Particle device!</strong></p>
