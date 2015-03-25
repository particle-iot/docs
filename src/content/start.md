---
word: Start
title: Getting started
order: 0
---

Getting started
=====

### What's in the box

![Spark Core in box]({{assets}}/images/core-in-box.jpg)

Congratulations on being the owner of a brand new Spark Core! Go ahead, open the box, and let's talk about what you see. Your box should include:

- *(1) Spark Core*  The reason you bought it! 
- *(1) Breadboard*  A breadboard makes it easy to wire components to the Core without soldering. See [Wikipedia](http://en.wikipedia.org/wiki/Breadboard) for more information.
- *(1) USB cable*  The included USB cable is great for powering the Spark Core and we'll cover more technical things later.


### Step 1: Power the Core

![Power the Core]({{assets}}/images/core-usb.jpg)

Plug the included USB cable into the Spark Core and your computer. The Core should start blinking blue.  [Have one of these u.FL connectors?](/hardware#spark-core-datasheet-types-of-cores) Make sure you connect an antenna to it now!

- Not blinking blue?
  - Maybe it's already been configured. Hold down the MODE button until it starts blinking blue, then continue.


### Step 2: Install the App

![Spark apps]({{assets}}/images/spark-app.jpg)

You can search for the mobile app named "Spark Core", or you can click one of these links:

[iPhone >](https://itunes.apple.com/us/app/spark-core/id760157884)  [Android >](https://play.google.com/store/apps/details?id=io.spark.core.android)

Now use the app to sign up for an account!

### Step 3: Connect your Core to the Cloud!

![Smart Config]({{assets}}/images/smart-config.jpg)

Make sure your phone is connected to the WiFi you want to use (it'll show up in the SSID blank on the app), then enter your password and click CONNECT!

This may take a little while- but don't worry. It should go through the following colors:
- **Blinking blue**: Listening for Wi-Fi credentials
- **Solid blue**:    Getting Wi-Fi info from app
- **Blinking green**: Connecting to the Wi-Fi network
- **Blinking cyan**: Connecting to the Spark Cloud
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
  - Uh oh. Your Core's on the network, but it took too long. [We're going to claim your core manually.](/connect#claiming-your-core)
- Something else altogether?
  - Give the [Connecting Your Core](/connect) page a read-through and if you're still stuck, search the [community.](http://community.spark.io)



Now do things!
=====

### Blink an LED with Tinker

![Tinker]({{assets}}/images/tinker-select.jpg)

The Spark app should now be on the Tinker screen, as shown to the right. 

Tap *D7* then _digitalWrite_ in the popup. Now when you tap the *D7* circle the tiny blue LED should turn off or on! This is because the LED shares a connection to the Core with the pin labeled D7. 

You could hook your own LED up to the Core on another pin and do the same thing, use digitalRead to tell that a switch has been pressed, or analogRead to see the position of a knob.

You can always get Tinker back on the Core by following [these instructions](/#/tinker#tinkering-with-tinker-the-tinker-firmware)

### Put Code on Your Core

![Spark Build]({{assets}}/images/ide.png)

Now let's control the blue LED using code instead of Tinker. If you [click here](http://spark.io/build) or on Build on the main page, you'll be in the IDE- where we can write code and upload it to the Core. Log in with the same email and password you used to sign up in the app, and we're off!

Click "BLINK AN LED" under the Example apps title. This code turns D7 (labeled _led2_) on and off, once a second. Click the lightning bolt icon in the upper left and it will upload or "flash" this code onto your Core. You'll see a series of status colors on the main LED, and then the little blue LED blinking. Magic!

You can find more info in the [Web IDE (Build) page](/#/build)

Wait, what is this thing?
=====

The Spark Core is a Wi-Fi development kit for internet-connected hardware. It is, in essence, the "brains" of a connected hardware product or project.

The Core has on board a microcontroller, which is a small, low-cost, low-power computer that can run a single application. The microcontroller runs the show; it runs your software and tells the rest of the Core what to do. It doesn't have an Operating System the way that your computer does; it just runs a single application (often called *firmware* or an *embedded application*), which can be simple, just a few lines of code, or very complex, depending on what you want to do.

Microcontrollers are particularly good at *controlling things*; hence the name. They have a set of "pins" (little spider leg type things sticking off the chip) that are called *GPIO* (General Purpose Input and Output) pins, or I/O pins. They can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and motors to act upon the world. These microcontroller's pins have been directly connected to the headers on the sides of the Core so you can easily access them; specifically, the pins labeled D0 to D7 and A0 to A7 are hooked directly to the microcontroller's GPIO pins.

The microcontroller can also communicate with other chips using common protocols like *Serial* (also called UART), *SPI*, or *I2C* (also called Wire). You can then make the Core more powerful by connecting it to special-purpose chips like motor drivers or shift registers. Sometimes we'll wrap up these chips on a *Shield*, an accessory to the Core that makes it easy to extend the Core.

The Core also has a Wi-Fi module, which connects it to your local Wi-Fi network in the same way that your computer or smartphone might connect to a Wi-Fi network. The Core is programmed to stay connected to the internet by default, so long as it can find and connect to a network.

When the Core connects to the internet, it establishes a connection to the *Spark Cloud*. By connecting to the Cloud, the Core becomes accessible from anywhere through a simple REST API. This API is designed to make it very easy to interface with the Core through a web app or mobile app in a secure, private way, so that only you and those you trust can access the Core.

### Buttons

There are two buttons on the Core: the RESET button (when holding the Core with its USB-port to the top, it's the button on the right) and the MODE button (on the left).

The RESET button will put the Core in a hard reset, effectively depowering and repowering the microcontroller. This is a good way to restart the application that you've downloaded onto the Core.

The MODE button serves three functions:

- Hold down the MODE button for three seconds to put the Core into *Smart Config* mode to connect it to your local Wi-Fi network. The LED should start flashing blue.
- Hold down the MODE button for ten seconds to clear the Core's memory of Wi-Fi networks.
- Hold down the MODE button, tap on the RESET button and wait for *three seconds* to enter *Bootloader* mode, where you can reprogram the Core over USB or JTAG. Release the MODE button when you see the LED flashing yellow. If you do this by accident, simply hit RESET button to leave *Bootloader* mode.
- Hold down the MODE button, tap once on the RESET button and wait for *ten seconds* to do a *Factory Reset*, where the Core is reprogrammed with the software that was installed on the Core in the factory (the Tinker application). The LED should turn white for three seconds and begin flashing quickly; when the LED switches to another color the Core has been reset. This is useful if you encounter bugs with your firmware, or if you just want to get back to Tinker.


### LEDs

There are two LEDs on the Core. The big fat one in the middle is a full-color RGB LED that shows you the status of the Core's internet connection. The other small blue LED is the *user LED*; it's hooked up to D7, so when you turn the D7 pin `HIGH` or `LOW`, it turns on and off, respectively.

The RGB LED could show the following states:

- *Flashing blue*: Listening mode, waiting for network information.
- *Solid blue*: Smart Config complete, network information found.
- *Flashing green*: Connecting to local Wi-Fi network.
- *Flashing cyan*: Connecting to Spark Cloud.
- *High-speed flashing cyan*: Spark Cloud handshake.
- *Slow breathing cyan*: Successfully connected to Spark Cloud.
- *Flashing yellow*: Bootloader mode, waiting for new code via USB or JTAG.
- *White pulse*: Start-up, the Core was powered on or reset.
- *Flashing white*: Factory Reset initiated.
- *Solid white*: Factory Reset complete; rebooting.
- *Flashing magenta*: Updating firmware.
- *Solid magenta*: May have lost connection to the Spark Cloud. Pressing the Reset (RST) button will attempt the update again.

The RGB LED can also let you know if there were errors in establishing an internet connection. *A red LED means an error has occurred.* These errors might include:

- *Two red flashes*: Connection failure due to bad internet connection. Check your network connection.
- *Three red flashes*: The Cloud is inaccessible, but the internet connection is fine. Check our [Twitter feed](http://www.twitter.com/sparkdevices) to see if there have been any reported outages; if not, visit our [support page](https://www.spark.io/support) for help.
- *Four red flashes*: The Cloud was reached but the secure handshake failed. Visit our [support page](https://www.spark.io/support) for help.
- *Flashing yellow/red*: Bad credentials for the Spark Cloud. Contact the Spark team (<a href="mailto@hello@spark.io">hello@spark.io</a>).

### Pins

The Core has 24 pins that you can connect a circuit to. These pins are:

- _VIN_: To power the Core off an unregulated power source with a voltage between 3.6V and 6V, or, if you're powering the Core over USB, this pin can be used as 5V V~OUT~ to power external components. In this case consider the current limitation imposed by your USB power source (e.g. max. 500mA for standard USB 2.0 ports). *Avoid powering the Core via USB and V~IN~ concurrently*.
- _3V3_: This pin will output a regulated 3.3V power rail that can be used to power any components outside the Core. (Also, if you have your own 3.3V regulated power source, you can plug it in here to power the Core).
- _3V3*_: This is a separate low-noise regulated 3.3V power rail designed for analog circuitry that may be susceptible to noise from the digital components. If you're using any sensitive analog sensors, power them from _3V3*_ instead of from _3V3_.
- _!RST_: You can reset the Core (same as pressing the RESET button) by connecting this pin to GND.
- _GND_: These pins are your ground pins.
- _D0 to D7_: These are the bread and butter of the Spark Core: 8 GPIO (General Purpose Input/Output) pins. They're labeled "D" because they are "Digital" pins, meaning they can't read the values of analog sensors. Some of these pins have additional peripherals (SPI, JTAG, etc.) available, keep reading to find out more.
- _A0 to A7_: These pins are 8 more GPIO pins, to bring the total count up to 16. These pins are just like D0 to D7, but they are "Analog" pins, which means they can read the values of analog sensors (technically speaking they have an ADC peripheral). As with the Digital pins, some of these pins have additional peripherals available.
- _TX and RX_: These pins are for communicating over Serial/UART. TX represents the transmitting pin, and RX represents the receiving pin.

#### PWM Pins

When you want to use the `analogWrite()` function on the Core, for instance to smoothly dim the brightness of LEDs, you need to use pins that have a timer peripheral.  People often call these PWM pins, since what they do is called Pulse Width Modulation.  The Core has 8 PWM pins: A0, A1, A4, A5, A6, A7, D0 and D1.

