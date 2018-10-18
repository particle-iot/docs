---
title: Xenon Kit
layout: quickstart.hbs
columns: two
order: 5
---

# Quick start: Xenon Kit

![Image of the Xenon in a breadboard](/assets/images/xenon-breadboard-05.png)

The Particle Xenon is a mesh and Bluetooth development kit designed for building connected projects and products. To set up the device you'll need an Android or iOS mobile phone and a connection to the internet.


### The Xenon Kit comes with the following things:

{{box op="start"}}

* **Xenon development kit**
* **Starter Project**
  * One micro-USB cable
  * One mini breadboard
* **Electronic components**
  * Two resistors (220 ohm)
  * One red light-emitting diode (LED)
  * One photodiode
{{box op="end"}}

---

## STEP 1: DOWNLOAD THE MOBILE APP

Download the Particle IoT app for iPhone or Android. The app is used to set up the Xenon, add devices to local mesh networks, and to TKTK.



### Download links
{{box op="start" cssClass="boxedSideBySide"}}
[![**iOS**](/assets/images/app-store-badge.png)](https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8)

{{box op="switch"}}
[![Play Store](/assets/images/google-play-badge.png)](https://play.google.com/store/apps/details?id=io.particle.android.app)

{{box op="end"}}

{{box op="start"}}
**TIP:**

While the app is downloading, gather the micro-USB cable, breadboard, and Xenon that came in your kit. You'll need all of those during the mobile setup.
{{box op="end"}}

---


## STEP 2: FOLLOW THE DIRECTIONS IN THE MOBILE APP


The Particle mobile app temporarily connects your phone with your Xenon using a Bluetooth connection and has you enter your mesh network credentials.

Depending on how you want to use the Xenon — as a part of a local mesh network or with the Ethernet FeatherWing to build a Xenon gateway — the app will prompt you to answer a series of network related questions.

{{box op="start" cssClass="boxed warningBox"}}
**WARNING:**

Remove your Xenon from the packaging foam before you plug it in!
{{box op="end"}}




---
## STEP 3: BLINK THE ONBOARD LED



### STEP 3A: OPEN THE WEB IDE
![Image of the Web IDE](/assets/images/webide.png)

To program your Xenon, open a new browser tab and go to [the Web IDE](https://build.particle.io).


{{box op="start"}}
**NOTE:**

The Web IDE is one of the ways you can write, compile, and deploy code to your Particle devices.

If you're looking for a more traditional embedded development experience, be sure to learn about [Particle Workbench], a full toolchain integration with Microsoft Visual Studio Code.
{{box op="end"}}

---

### STEP 3B: LOAD THE BLINK EXAMPLE

![Image of the Web IDE with example code](/assets/images/webide-with-examples.png)


Click on _Blink an LED_ on the left side of the page. This will load the example code to blink the LED on your Xenon.

---

### STEP 3C: TARGET YOUR DEVICE

Look at the bottom right of the page and ensure that the device name is the name of your new Xenon.


{{box op="start"}}
**NOTE:**

If you don't see your Xenon listed, click on the device name. A sidebar will appear on the left with a list of all of your devices. Click on _start_ to the left of the Xenon you wish to deploy code to.
{{box op="end"}}

---

### STEP 3D: COMPILE YOUR CODE AND FLASH YOUR DEVICE




Click the lightning bolt icon on the top left of your screen to flash your code to your device.

As soon as you click, the Particle Device cloud will compile the program source code to a binary file and send it over-the-air (OTA) to your Argon.

{{box op="start"}}
**NOTE:**

You'll often see words like flashing and deploying used interchangeably.
{{box op="end"}}

---

### STEP 3E: ENJOY THE BLINKING LED


---

## STEP 4: WHERE TO GO NEXT
set up is complete
learn about build and workbench
generally to know about console
