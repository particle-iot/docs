---
title: Argon
layout: quickstart.hbs
columns: two
order: 3
---

# Quick start: Argon

![Image of the Argon in a breadboard](/assets/images/argon-breadboard.jpg)

The Particle Argon is a development kit with Wi-Fi, mesh, and Bluetooth radios for building connected projects and products.

To set up your Argon, you'll need an Android or iOS mobile phone and a connection to the internet.


### The Argon Kit comes with the following things:

{{box op="start"}}

* **Argon development kit**
* **Starter Project**
  * One micro-USB cable
  * One mini breadboard
* **Electronic components**
  * Two resistors (220 ohm)
  * One light-emitting diode (LED)
  * One phototransistor
{{box op="end"}}

---

## 1. Set up your Argon

Use the online setup application to configure your new Argon. The process includes the following.
* Registration of your device with your Particle account
* Connection of your device to the Particle Device Cloud
* Particle Mesh network configuration



Once you've completed the setup you will be able to program your device and send over-the-air (OTA) updates to it.

To begin setting up your Argon, click the button below and follow the onscreen instructions. When you've completed set up, continue to Step #2.

<div  align="center">
<br />
<a href="https://setup.particle.io/"  target="_blank" class="button">SET UP YOUR ARGON</a>
<br />
</div>




{{box op="start" cssClass="boxed warningBox"}}
**NOTES:**</br>
1.) If you have already set up your Argon, skip to Step #2.<br /><br />
2.) During set up you may skip setting up a Particle Mesh network and use the Argon in a standalone mode.



{{box op="end"}}



---

## 2. Open the Web IDE
![Image of the Web IDE](/assets/images/webide.png)

To program your Argon, open a new browser tab and go to the <a target="_blank" href="https://build.particle.io">Web IDE</a>. You will see a layout like the image below.


{{box op="start"}}
**NOTE:**

The Web IDE is one of the ways you can write, compile, and deploy code to your Particle devices.

If you're looking for a more traditional embedded development experience, be sure to learn about [Particle Workbench], a full toolchain integration with Microsoft Visual Studio Code.
{{box op="end"}}

---
## 3. Load the Blink example

![Image of the Web IDE with example code](/assets/images/webide-with-examples.png)


Click on _Blink an LED_ on the left side of the page. As soon as you click the _Blink and LED_ code will load and fill the screen as shown below.

![Image of the Web IDE with example code loaded](/assets/images/loaded-blink.png)

The code is heavily commented to help you understand the general structure of the sketch: the first part of the code declares two variables, the setup() function configures two pins as outputs, and finally the loop() which turns the onboard LED on, then off, then loops continuously.

---

## 4. Target your device

The Web IDE can be used with multiple devices. As such, when you go to compile source code, it's a good idea to verify that the board you

Before you compile the source code and flash your device with its binary output, make sure that the correct Particle device is selected.


{{box op="start"}}
**NOTE:**

If you don't see your Argon listed, click on the device name. A sidebar will appear on the left with a list of all of your devices. Click on _start_ to the left of the Argon you wish to deploy code to.
{{box op="end"}}

---

## 5. Compile your code & flash


Click the lightning bolt icon on the top left of your screen to flash your code to your device.

As soon as you click, the Particle Device cloud will compile the program source code to a binary file and send it over-the-air (OTA) to your Argon.

{{box op="start"}}
**NOTE:**

You'll often see words like flashing and deploying used interchangeably.
{{box op="end"}}

---

## Hardware examples

{{> codeexamples mesh=true}}


