---
title: Boron
layout: commonTwo.hbs
columns: two
description: Getting started with your Particle Boron, Gen 3 cellular and BLE device
---

# Quick start: Boron

![Image of the Boron in a breadboard](/assets/images/boron-breadboard.jpg)

The Particle Boron is a cellular and Bluetooth development kit designed for building connected projects and products. To set up the device you'll need an Android or iOS mobile phone and a connection to the internet.

<div  align="center">
<br />
<a href="https://setup.particle.io/?family=mesh&device=boron"  target="_blank" class="button">SET UP YOUR BORON</a>
</div>

### The Boron Kit comes with the following things:

{{box op="start"}}

- **Boron development kit**
- **Starter Project**
  - One micro-USB cable
  - One mini breadboard
- **Electronic components**
  - Two resistors (220 ohm)
  - One light-emitting diode (LED)
  - One phototransistor
    {{box op="end"}}

---

## 1. Set up your Boron

For a short (~4 min) overview of what the Boron setup process looks like, watch the video below.

<iframe width="640" height="360" class="video" src="https://www.youtube.com/embed/xymSayKBGbg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Once you're ready to proceed, use the online setup application to configure your new Boron. The process includes the following.

- Registration of your device with your Particle account
- Connection of your device to the Particle Device Cloud

Once you've completed the setup you will be able to program your device and send over-the-air (OTA) updates to it.

To begin setting up your Boron, click the button below and follow the onscreen instructions. When you've completed set up, continue to Step #2.

<div  align="center">
<br />
<a href="https://setup.particle.io/"  target="_blank" class="button">SET UP YOUR BORON</a>
<br />
</div>

{{box op="start" cssClass="boxed warningBox"}}
**NOTES:**</br>
1.) If you have already set up your Boron, skip to Step #2.<br /><br />
2.) We recommend setting up the Boron as stanadalone device, not as a part of a mesh network. See [mesh deprecation](/reference/discontinued/mesh/) for more information.

{{box op="end"}}

---

## 2. Open the Web IDE

![Image of the Web IDE](/assets/images/webide.png)

To program your Boron, open a new browser tab and go to the <a target="_blank" href="https://build.particle.io">Web IDE</a>.

{{box op="start"}}
**NOTE:**

The Web IDE is one of the ways you can write, compile, and deploy code to your Particle devices.

If you're looking for a more traditional embedded development experience, be sure to learn about [Particle Workbench](/tutorials/developer-tools/workbench/), a full toolchain integration with Microsoft Visual Studio Code.
{{box op="end"}}

---

## 3. Load the Blink example

![Image of the Web IDE with example code](/assets/images/webide-with-examples.png)

Click on _Blink an LED_ on the left side of the page. As soon as you click the _Blink and LED_ code will load and fill the screen as shown below.

![Image of the Web IDE with example code loaded](/assets/images/loaded-blink.png)

The code is heavily commented to help you understand the general structure of the sketch: the first part of the code declares two variables, the setup() function configures two pins as outputs, and finally the loop() which turns the onboard LED on, then off, then loops continuously.

---

## 4. Target your device

The Web IDE can be used with multiple devices. As such, when you go to compile source code, it's a good idea to verify that the device you are intending to program has a gold star to the left of its name in the Devices tab (circle with 4 lines).

---

## 5. Compile your code & flash

Click the lightning bolt icon on the top left of your screen to flash your code to your device.

As soon as you click, the Particle Device cloud will compile the program source code to a binary file and send it over-the-air (OTA) to your Boron.


---

For more hardware examples to try, visit the [hardware examples](/tutorials/hardware-projects/hardware-examples/boron).
