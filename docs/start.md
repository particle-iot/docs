Getting started
=====

Spark is the fastest and easiest way to build an internet-connected hardware product.


### What's in the box

Congratulations on being the owner of a brand new Spark Core! Go ahead, open the box, and let's talk about what you see. Your box should include:

![Spark Core in box](/images/core-in-box.jpg)

- *One Spark Core*. The reason you bought this thing. We'll dig in more here in a bit.
- *One breadboard*. A breadboard makes it easy to wire components to the Core without solder. Internally, the rows are electrically connected horizontally, and the "rails" along the edges are connected vertically. See the [breadboard article on Wikipedia](http://en.wikipedia.org/wiki/Breadboard) for more information.
- *One USB cable*. The included USB cable is used for two things: powering the Spark Core (by connecting it to your computer, to a USB power brick, or to a USB battery pack) and reprogramming. Most of the time you will be reprogramming the Core through the Cloud, but you always have the option of reprogramming it over USB, especially if your internet connection is down or you would prefer to use your own servers.


### Power the Core

Powering the Core is easy; it receives power over a Micro USB port, much like many smartphones and other gadgets. Power your Core on by connecting the Micro USB cable to the USB port on the Core, and plug the other end into any USB port on your computer, a USB hub (preferably powered), or a USB power adapter (like the one that probably came with your smartphone).

```
ADD AN ILLUSTRATIVE PICTURE HERE
```

### Create an account

This is more content.

``` Javascript
  console.log('hello');
```


### Connect the Core to Wi-Fi

This is more content.

``` Javascript
  console.log('hello');
```

### Blink an LED

Wait, what is this thing?
=====

The Spark Core is a Wi-Fi development kit for internet-connected hardware. It is, in essence, the "brains" of a connected hardware product or project.

The Core has on board a microcontroller, which is a small, low-cost, low-power computer that can run a single application. The microcontroller runs the show; it runs your software and tells the rest of the Core what to do. It doesn't have an Operating System the way that your computer does; it just runs a single application (often called *firmware* or an *embedded application*), which can be as simple as a few lines of code, or very complex, depending on what you want to do.

Microcontrollers are particularly good at *controlling things*; hence the name. They have a set of "pins" (little spider leg type things sticking off the chip) that are called *GPIO* (General Purpose Input and Output) pins. They can be hooked to sensors or buttons to listen in on the world, or they can be hooked to lights and motors to act upon the world. These pins have been extended out on the Core so you can easily connect to them; the pins labeled D0 to D7 and A0 to A7 are hooked directly to the microcontroller's GPIO pins.

The microcontroller can also communicate with other chips using common protocols like *Serial* (also called UART), *SPI*, or *I2C* (also called Wire). You can then make the Core more powerful by connecting it to special-purpose chips like motor drivers or shift registers. Sometimes we'll wrap up these chips on a *Shield*, an accessory to the Core that makes extending the Core dead simple.

The Core also has a Wi-Fi module, which connects it to your local Wi-Fi network in the same way that your computer or smartphone might connect to a Wi-Fi network. The Core is programmed to stay connected to the internet by default, so long as it can find and connect to a network.

When the Core connects to the internet, it establishes a connection to the *Spark Cloud*. By connecting to the Cloud, the Core becomes accessible from anywhere through a simple REST API. This API is designed to make it very easy to interface with the Core through a web app or mobile app in a secure, private way, so that only you and those you trust can access the Core.

### Buttons

There are two buttons on the Core: the RESET button (on the right) and the MODE button (on the left). The RESET button will put the Core in a hard reset, effectively depowering and repowering the microcontroller. This is a good way to restart the application that you've downloaded onto the Core. The MODE button serves three functions:

- Hold down the MODE button for three seconds to put the Core into *Smart Config* mode to connect it to your local Wi-Fi network. The LED should start flashing blue.
- Hold down the MODE button, tap on the RESET button and wait for *three seconds* to enter *Bootloader* mode, where you can reprogram the Core over USB or JTAG. Release the MODE button when you see the LED flashing yellow. If you do this by accident, simply hit RESET button to leave *Bootloader* mode.
- Hold down the MODE button, tap on the RESET button and wait for *ten seconds* to do a *Factory Reset*, where the Core is reprogrammed with the software that was installed on the Core in the factory (the Tinker application). The LED should turn white for three seconds and begin flashing quickly; when the LED switches to another color the Core has been reset. This is useful if you encounter bugs with your firmware, or if you just want to get back to Tinker.


### LEDs

There are two LEDs on the Core. The big fat one in the middle is a full-color RGB LED that shows you the status of the Core's internet connection. The other small blue LED is the *user LED*; it's hooked up to D7, so when you turn the D7 pin `HIGH` or `LOW`, it turns on and off, respectively.

The RGB LED could show the following states:

- *Flashing blue*: Smart Config mode, waiting for network information.
- *Solid blue*: Smart Config complete, network information found.
- *Flashing green*: Connecting to local Wi-Fi network.
- *Solid green*: Local Wi-Fi connection complete.
- *Flashing cyan*: Connecting to Spark Cloud.
- *Slow breathing cyan*: Successfully connected to Spark Cloud.
- *Flashing yellow*: Bootloader mode, waiting for new code via USB or JTAG.
- *Flashing white*: Factory Reset initiated.
- *Solid white*: Factory Reset complete; rebooting.

The RGB LED can also let you know if there were errors in establishing an internet connection. *A red LED means an error has occurred.* These errors might include:

- *Two red flashes*: Connection failure due to bad internet connection. Check your network connection.
- *Three red flashes*: The Cloud is inaccessible, but the internet connection is fine. Check our [Twitter feed](http://www.twitter.com/sparkdevices) to see if there have been any reported outages; if not, visit our [support page](https://www.sparkdevices.com/support) for help.
- *Four red flashes*: The Cloud was reached but the secure handshake failed. Visit our [support page](https://www.sparkdevices.com/support) for help.

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



Tinkering with "Tinker"
======

The Tinker app
---

### Controlling I/O pins
### Reading I/O pins
### Changing functions

The Tinker API
---

The Tinker Firmware
---

The Tinker firmware is the default application program stored in the Spark Core upon its commissioning from the factory assembly line. You can always get back to it by putting the Core in the [factory reset mode.](#buttons)

The Tinker firmware has four basic functions:

- Write a digital value to an I/O pin
- Write an analog/PWM value to an I/O pin
- Read a digital value from an I/O pin
- Read an analog value from an I/O pin

You can have a look at the latest release [here.](https://github.com/spark/core-firmware/blob/master/src/application.cpp)

Writing Core Firmware
===

Firmware sounds scary
---

The Spark Web IDE
---

### Writing firmware
### Flashing the Core

The Spark Command Line
---

### Set up
### Flashing the command line

Deploying a Spark web app
===

Writing your web app
---

Testing it locally
---

Deploying to Heroku
---

More options
---

Troubleshooting
===

What's wrong?
---

### My Core won't connect to the Cloud
### My Core won't start up
### My Core is behaving erratically


Further resources
===

Hardware development
---

### Hardware for dummies
### Advanced hardware

Software development
---

### Software for dummies
### Advanced software
