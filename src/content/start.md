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

- *One Spark Core*. The reason you bought this thing. We'll dig in more here in a bit.
- *One breadboard*. A breadboard makes it easy to wire components to the Core without solder. Internally, the rows are electrically connected horizontally, and the "rails" along the edges are connected vertically. See the [breadboard article on Wikipedia](http://en.wikipedia.org/wiki/Breadboard) for more information.
- *One USB cable*. The included USB cable is used for three things: powering the Spark Core (by connecting it to your computer, to a USB power brick, or to a USB battery pack), Wi-Fi setup (when done through the Spark CLI) and reprogramming. Most of the time you will be reprogramming the Core through the Cloud, but you always have the option of reprogramming it over USB, especially if your internet connection is down or you would prefer to use your own servers.


### Step 1: Power the Core

![Power the Core]({{assets}}/images/core-usb.jpg)

Powering the Core is easy; it receives power over a Micro USB port, much like many smartphones and other gadgets. Power your Core on by connecting the Micro USB cable to the USB port on the Core, and plug the other end into any USB port on your computer, a USB hub (preferably powered), or a USB power adapter (like the one that probably came with your smartphone).

If you so desire, you can also power the Core with 3.6V to 6V to the `VIN` pin, or 3.3V to the `3.3V` pin.

If you have a Core with the [u.FL connector](#/hardware/spark-core-datasheet-types-of-cores) for an external antenna, now is a good time to connect that as well.

### Step 2: Download the Spark iOS or Android app

![Spark apps]({{assets}}/images/spark-apps.png)

The Spark mobile app is the easiest way to get your Spark Core connected to the internet. The app will help you do three things:

- Create an account with Spark
- Connect your Spark Core to your Wi-Fi network
- Control your Core without writing any code

The iOS app requires iOS 7, and the Android app works with Ice Cream Sandwich (Android 4.0) and newer.

[Download the iPhone app >](https://itunes.apple.com/us/app/spark-core/id760157884)

[Download the Android app >](https://play.google.com/store/apps/details?id=io.spark.core.android)

**At a conference?** Setup your Core with the
[Spark CLI](https://github.com/spark/spark-cli#spark-cli)
instead.



### Step 3: Connect the Core to Wi-Fi

![Smart Config]({{assets}}/images/smart-config.png)

Connecting the Spark Core to your Wi-Fi is dead simple. In fact, I did it twice while I was typing this paragraph.

The Spark mobile app will guide you through the process, but basically it's a one-step process where you type your Wi-Fi network name (SSID) and password and they're sent over Wi-Fi to the Spark Core, which automatically connects to the network and to the Spark Cloud. If everything works as planned, you'll see the LED go through the following colors:

- **Flashing blue**: Listening for Wi-Fi credentials
- **Flashing green**: Connecting to the Wi-Fi network
- **Flashing cyan**: Connecting to the Spark Cloud
- **Flashing magenta**: Updating to the newest firmware
- **Breathing cyan**: Connected!

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">See an animation</a>

If the mobile app doesn't work for you, you can also connect your Spark Core over USB. For more information, or for a detailed explanation of how to connect your Core to the 'net, check out:

[Connect your Core >](/connect)

### Step 4: Blink an LED with Tinker

![Tinker]({{assets}}/images/tinker.png)

The Spark mobile app contains a mini-app called Tinker that lets you... well, tinker. It lets you talk with the Input/Output pins of the Spark Core without writing a single line of code.

Each of the pins has up to four functions available: *digitalWrite*, *analogWrite*, *digitalRead*, and *analogRead*. For more information, scroll down to the "Tinkering with Tinker" section.

### Step 5: Write Apps with Spark Build

![Spark Build]({{assets}}/images/ide.png)

Once you're tired of reading reading sensor values and flashing LEDs, head over to the Spark Build IDE for the real show.  Spark Build allows you to create and flash custom applications to your Core from any modern web browser, and equips your Core with the full capabilities of the Internet!  Wow!

Don't be nervous--we've got you covered with plenty of community-approved example applications and libraries that will get you started on the right foot.  To learn more, check out the "Writing Apps with Spark Build" section further down on this page.


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
- *Three red flashes*: The Cloud is inaccessible, but the internet connection is fine. Check our [Twitter feed](http://www.twitter.com/sparkdevices) to see if there have been any reported outages; if not, visit our [support page](https://www.sparkdevices.com/support) for help.
- *Four red flashes*: The Cloud was reached but the secure handshake failed. Visit our [support page](https://www.sparkdevices.com/support) for help.
- *Flashing yellow/red*: Bad credentials for the Spark Cloud. Contact the Spark team (<a href="mailto@hello@spark.io">hello@spark.io</a>).

### Pins

The Core has 24 pins that you can connect a circuit to. These pins are:

- _VIN_: Connect an unregulated power source here with a voltage between 3.6V and 6V to power the Core. If you're powering the Core over USB, this pin should *not* be used.
- _3V3_: This pin will output a regulated 3.3V power rail that can be used to power any components outside the Core. (Also, if you have your own 3.3V regulated power source, you can plug it in here to power the Core).
- _3V3*_: This is a separate low-noise regulated 3.3V power rail designed for analog circuitry that may be susceptible to noise from the digital components. If you're using any sensitive analog sensors, power them from _3V3*_ instead of from _3V3_.
- _!RST_: You can reset the Core (same as pressing the RESET button) by connecting this pin to GND.
- _GND_: These pins are your ground pins.
- _D0 to D7_: These are the bread and butter of the Spark Core: 8 GPIO (General Purpose Input/Output) pins. They're labeled "D" because they are "Digital" pins, meaning they can't read the values of analog sensors. Some of these pins have additional peripherals (SPI, JTAG, etc.) available, keep reading to find out more.
- _A0 to A7_: These pins are 8 more GPIO pins, to bring the total count up to 16. These pins are just like D0 to D7, but they are "Analog" pins, which means they can read the values of analog sensors (technically speaking they have an ADC peripheral). As with the Digital pins, some of these pins have additional peripherals available.
- _TX and RX_: These pins are for communicating over Serial/UART. TX represents the transmitting pin, and RX represents the receiving pin.

#### PWM Pins

When you want to use the `analogWrite()` function on the Core, for instance to smoothly dim the brightness of LEDs, you need to use pins that have a timer peripheral.  People often call these PWM pins, since what they do is called Pulse Width Modulation.  The Core has 8 PWM pins: A0, A1, A4, A5, A6, A7, D0 and D1.

The Spark Cloud
---

The Spark Cloud is a network of servers hosted at `https://api.spark.io/` that the Spark Core connects to once it's on your Wi-Fi network.

The Cloud exists for three main reasons:

### Simplicity

Generally speaking, when you work in an embedded system, networking means sending bytes over TCP sockets and UDP datagrams. Everyone agrees - socket programming is not fun. But higher-level communications are difficult because microcontrollers have so little memory they can't generally host a traditional HTTP web server. The Cloud gives you the simplicity of the web server with the low cost and low power of a microcontroller by translating between web communications (HTTP requests) and embedded communications (in our case, encrypted CoAP messages).

But you don't have to know any of that. The whole point of the Cloud is that all of this is abstracted away. You don't need to know *how* it connects to the internet; it just does. And once it's connected, you can make it do awesome things quickly and easily, without dealing with sockets.

### Global availability

By default, if you connect a thing to your Wi-Fi network, it's only available from elsewhere on your local network. This is a result of the fact that we've run out of IP addresses, and it's also a security measure, since it means that people can't just reach into your home willy-nilly and mess with your stuff.

Making the stuff in your home available outside your home is a pain, and usually requires nasty things like port mapping and static IP addresses. Even if you're technically savvy enough to handle this stuff, if you're developing a product, you don't want to make familiarity with OpenWRT a pre-requisite for purchasing your product.

We avoid this issue entirely with the Cloud. The Core connects to the Cloud when it hits your Wi-Fi network, and holds open a persistent connection. This means that it's available from anywhere in the world at any time.

But wait, if local networks are a security measure, then doesn't this open you up to all sorts of nastiness? Well, it would, except...

### Security

Yep, that's right. We thought of that.

Security is hard. It's especially hard on an embedded system, because encryption is resource intensive. But it's also important, because you don't want anyone turning on and off your lights, or worse, locking and unlocking your front doors.

We hand-picked a set of rock-solid security protocols that are secure and efficient, so they work great on an embedded system. They're baked into the Spark Protocol, which is open source and ready to be extended to other products.



Tinkering with "Tinker"
======

The Tinker app
---

![Tinker]({{assets}}/images/tinker.png)

The Tinker section of the Spark mobile app makes it very easy to start playing with your Spark Core without writing any code. It's great for early development, and often it will do everything you need to get your project off of the ground.

The app consists of 16 pins in vertical rows - 8 analog pins on the left, 8 digital pins on the right. These pins represent the 16 GPIO (General Purpose Input and Output) pins on the Spark Core, and are organized the same way.

![Tinker selection]({{assets}}/images/tinker-select.png)

To begin, tap any of the pins. A menu will pop up showing the functions that pin has available. Each pin can have up to four possible functions:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

To change the function of the pin, simply tap and hold on the pin, and the function select menu will come back up. Any further questions? Come talk to us in the [forums!](https://community.sparkdevices.com/)

The Tinker firmware
---

The Tinker firmware is the default application program stored in the Spark Core upon its commissioning from the factory assembly line. You can always get back to it by putting the Core in the [factory reset mode](#buttons), or by re-flashing your Core with Tinker in the Spark mobile app. 

###To reflash Tinker from within the app:

- **iOS Users**: Tap the list button at the top left. Then tap the arrow next to your desired Core and tap the "Re-flash Tinker" button in the pop out menu.
- **Android Users**: With your desired Core selected, tap the options button in the upper right and tap the "Reflash Tinker" option in the drop down menu.

The Tinker app is a great example of how to build a very powerful application with not all that much code. You can have a look at the latest release [here.](https://github.com/spark/core-firmware/blob/master/src/application.cpp)

The Tinker API
---

When the Tinker firmware is installed on your Spark Core, it will respond to certain API requests from your mobile app, which mirror the four basic GPIO functions (digitalWrite, analogWrite, digitalRead, analogRead). These API requests can also be made from another application, so you can build your own web or mobile app around the Tinker firmware.

### digitalWrite

Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/digitalwrite \
      -d access_token=123412341234 -d params=D0,HIGH

The parameters must be the pin (A0 to A7, D0 to D7), followed by either HIGH or LOW, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.



### analogWrite

Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/analogwrite \
      -d access_token=123412341234 -d params=A0,215

The parameters must be the pin (A0 to A7, D0 to D7), followed by an integer value from 0 to 255, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.




### digitalRead

This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/digitalread \
      -d access_token=123412341234 -d params=D0


The parameter must be the pin (A0 to A7, D0 to D7). The return value will be 1 if the pin is HIGH, 0 if the pin is LOW, and -1 if the read fails.



### analogRead

This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

    POST /v1/devices/{DEVICE_ID}/analogread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef
    # Your access token is 123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef/analogread \
      -d access_token=123412341234 -d params=A0

The parameters must be the pin (A0 to A7, D0 to D7). The return value will be between 0 and 4095 if the read succeeds, and -1 if it fails.


Flash Apps with Spark Build
===

What is firmware?
---

An *embedded system* like the Spark Core doesn't have an Operating System like a traditional computer. Instead, it runs a single application, often called *firmware*, which runs whenever the system is powered.

*Firmware* is so-called because it's harder than software and softer than hardware. Hardware is fixed during manufacturing, and doesn't change. Software can be updated anytime, so it's very flexible. Firmware is somewhere in between; hardware companies do issue firmware updates, but they tend to be very infrequent, because upgrading firmware can be difficult.

In our case, because the Spark Core is connected to the internet, updating firmware is quite trivial; we send it over the network, and we have put in place safeguards to keep you from "bricking" the Core.

When you flash code onto the Spark Core, you are doing an *over-the-air firmware update*. This firmware update overwrites almost all of the software on the Spark Core; the only piece that is untouched is the bootloader, which manages the process of loading new firmware and ensures you can always update the firmware over USB or through a factory reset.


Logging into Spark Build
---
When you're ready to reprogram your Spark Core, head over to our IDE:

[Spark Build >](https://www.spark.io/build)

![Spark Build]({{assets}}/images/create-account.jpg)

Creating an account is a simple one-step process.  When presented with the login screen, simply enter your email address (careful!), and desired account password.  Press the big friendly "Sign Up" button, and you'll reach the Spark Build home page.

![Spark Build]({{assets}}/images/log-in.jpg)

If you've already logged into Spark Build before, click the "Let me log in" text beneath the Sign Up button, and you'll be presented with a login for existing users.  Don't worry--if you already have an account and accidentally click the "Sign Up" button, we'll still log you into your existing account.

Spark Build, our web IDE
---

![Spark Build]({{assets}}/images/ide.png)

Spark Build is an Integrated Development Environment, or IDE; that means that you can do software development in an easy-to-use application, which just so happens to run in your web browser.

Spark Build starts with the navigation bar on the left. On the top, there are three buttons, which serve important functions:

- **Flash**: Flashes the current code to the Spark Core. This initiates an *over-the-air firmware update* and loads the new software onto your Spark Core.
- **Verify**: This compiles your code without actually flashing it to the Core; if there are any errors in your code, they will be shown in the debug console on the bottom of the screen.
- **Save**: Saves any changes you've made to your code.

At the bottom, there are four more buttons to navigate through the IDE:

- **Code**: Shows a list of your firmware applications and lets you select which one to edit/flash.
- **Docs**: Brings you to the documentation for Spark.
- **Cores**: Shows a list of your Spark Cores, so you can choose which to flash, and get more information on each Core.
- **Settings**: Change your password, log out, or get your access token for API calls.

Spark Apps and Libraries
---

![Spark Build]({{assets}}/images/spark-apps.jpg)

The heart of Spark Build is the "Spark Apps" section, which displays the name of the current app in your editor, as well as a list of your other applications and community-supported example apps.

The application you've got open in the editor is displayed under the "Current App" header.  You'll notice that this "HELLOWORLD" sample application has only one file, but firmware with associated libraries/multiple files are fully supported.

From this pane, you've got a lot of buttons and actions available to you that can help you grow and manage your library of kick-ass applications:

- **Create**: You can create a new application by clicking the "Create New App" button.  Give it a sweet name and press enter!  Your app is now saved to your account and ready for editing.

- **Delete**: Click the "Remove App" button to remove it forever from your Spark library.

- **Rename**: You can rename your Spark App by simply double-clicking on the title of your app under the "Current App" header.  You can modify the "Optional description" field in the same way.
- **My Apps**: Tired of working on your current project?  Select the name of another app under the "My apps" header to open it in a tab of the Spark Build editor.

- **Files**: This header lists all known files associated with the open application.  Click on a supporting file in your application to open it as an active tab in the editor.

- **Examples**: The "Example apps" header lists a continuously growing number of community-supported example apps.  Use these apps as references for developing your own, or fork them outright to extend their functionality.


Flashing Your First App
---

The best way to get started with the IDE is to start writing code:

- **Connect**: Make sure your Core is powered and "breathing" Cyan, which indicates that it's connected to the Spark Cloud and ready to be updated.
- **Get Code**: Try clicking on the "Blink an LED" example under the "Example apps" header.  The Spark Build editor should display the code for the example application in an active tab.  Alternatively, you can copy and paste this snippet of code into a new application in the Build IDE.

```
//D7 LED Flash Example
int LED = D7;

void setup() {
    pinMode(LED, OUTPUT);
}

void loop() {
    digitalWrite(LED, HIGH);
    delay(1000);
    digitalWrite(LED, LOW);
    delay(1000);
}
```

![Spark Build]({{assets}}/images/select-a-core.jpg)


- **Select Your Core**: The next step is to make sure that you've selected which of your Cores to flash code to.  Click on the "Cores" icon at the bottom left side of the navigation pane, and click on the star next to the Core you'd like to update.  Once you've selected a Core, the star associated with it will turn yellow. (If you only have one core, there is no need to select it, you can continue on to the next step).

- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your Core.  If the flash was successful, the LED on your Core will begin flashing magenta.

![Spark Build]({{assets}}/images/fork-app.jpg)

- **Fork**: Wish the timing of that LED flash was a little bit faster?  Try clicking on the "Fork This Example" button after selecting the "Blink An LED" example application.  You've now got a personal copy of that application that you can modify, save, and flash to all of your Cores.

- **Edit**: Try changing the values in the delay() function from 1000 to 250, which changes the timing interval from 1000 milliseconds to only 250 milliseconds.  Click the Verify button, then the Flash button.  Is your Core's LED blinking faster?  Well done :)


Account Information
---

There are a couple of other neat bells and whistles in Spark Build.  The Spark Build IDE the best tool for viewing important information about your Core, managing Cores associated with your Spark account, and "unclaiming" them so they can be transferred to your buddy.

![Spark Build]({{assets}}/images/device-id.jpg)

- **Core ID**: You can view your Core's Device ID by clicking on the "Cores" icon at the bottom of the navigation pane, then clicking the dropdown arrow next to the Core of interest.

- **Unclaim**: You can "Unclaim" a Core by pressing the "Remove Core" button that is revealed by clicking the dropdown arrow.  Once a Core has been unclaimed, it is available to be reassociated with any Spark users' account.

![Spark Build]({{assets}}/images/access-token.png)

- **API Key**: You can find your most recent API Key listed under the "Settings" tab in your account.  You can press the "Reset Token" button to assign a new API Key to your account.  *Note* that pressing this button will require you to update any hard-coded API Credentials in your Spark-powered projects!


Using Libraries
---

![Include the library]({{assets}}/images/choose-app-to-include-library.png)

When you want to reuse code across multiple applications, Spark Libraries are your friend.
Spark Libraries are easily shareable, extensible packages built by the community to help with common problems many Spark applications encounter. They are hosted on GitHub and easily pulled into the IDE where they can be included in apps and shared with others.

You can include a library in an application by opening the library drawer, finding a library that will work for your project, and clicking the "include in app" button. This will add an `#include` statement to your code that will expose all the capabilities of the library to your code.

Contribute a library
---

![Validate library]({{assets}}/images/validate-library.png)

Adding a library to the IDE starts by creating an open source GitHub repository where your code will live.
At minimum, this repository needs a `spark.json` file, some documentation, some example firmware files, and some Arduino/C++ files.
The import and validation process is designed to be forgiving and easy to interpret, so don't be scared; the IDE will walk you through what is required to get your library set to go.

The easiest way to generate library boilerplate code is to follow the instructions on the [getting started section](https://github.com/spark/uber-library-example/#getting-started) of the `uber-library-example`, a project designed to illustrate and document what a library is supposed to look like.

The Spark Command Line
===

The Spark command line tool provides a rich set of functionality ranging from initial account creation, verifying and flashing firmware via the Spark Cloud, and
interacting with deployed cores.  You can find more details about how to get it installed and all of the cool things you can do with it [here on GitHub](https://github.com/spark/spark-cli).

Deploying a Spark web app
===

**Coming soon!** We'll give you instructions for how to deploy a web app on Heroku that can talk with a Spark Core.

Troubleshooting
===

There are many reasons that your Core might not be connecting to your Wi-Fi network or is not behaving exactly as you might expect.

[Check out the troubleshooting section >](/#/troubleshooting)
