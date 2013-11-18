Getting started
=====

Spark is the fastest and easiest way to build an internet-connected hardware product.


### What's in the box

Congratulations on being the owner of a brand new Spark Core! Go ahead, open the box, and let's talk about what you see. Your box should include:

![Spark Core in box](images/core-in-box.jpg)

- *One Spark Core*. The reason you bought this thing. We'll dig in more here in a bit.
- *One breadboard*. A breadboard makes it easy to wire components to the Core without solder. Internally, the rows are electrically connected horizontally, and the "rails" along the edges are connected vertically. See the [breadboard article on Wikipedia](http://en.wikipedia.org/wiki/Breadboard) for more information.
- *One USB cable*. The included USB cable is used for two things: powering the Spark Core (by connecting it to your computer, to a USB power brick, or to a USB battery pack) and reprogramming. Most of the time you will be reprogramming the Core through the Cloud, but you always have the option of reprogramming it over USB, especially if your internet connection is down or you would prefer to use your own servers.


### Power the Core

Powering the Core is easy; it receives power over a Micro USB port, much like many smartphones and other gadgets. Power your Core on by connecting the Micro USB cable to the USB port on the Core, and plug the other end into any USB port on your computer, a USB hub (preferably powered), or a USB power adapter (like the one that probably came with your smartphone).

![Power the Core](images/core-usb.jpg)

### Download the Spark iOS or Android app

![Spark apps](images/spark-apps.jpg)

The Spark mobile app is the easiest way to get your Spark Core connected to the internet. The app will help you do three things:

- Create an account with Spark
- Connect your Spark Core to your Wi-Fi network
- Control your Core without writing any code

### Connect the Core to Wi-Fi

![Smart Config](images/smart-config.jpg)

Connecting the Spark Core to your Wi-Fi is dead simple. In fact, I did it twice while I was typing this paragraph.

The Spark mobile app will guide you through the process, but basically it's a one-step process where you type your Wi-Fi network name (SSID) and password and they're sent over Wi-Fi to the Spark Core, which automatically connects to the network and to the Spark Cloud. If everything works as planned, you'll see the LED go through the following colors:

- **Flashing blue**: Listening for Wi-Fi credentials
- **Flashing green**: Connecting to the Wi-Fi network
- **Flashing cyan**: Connecting to the Spark Cloud
- **Breathing cyan**: Connected!

### Blink an LED with Tinker

![Tinker](images/tinker.jpg)

The Spark mobile app contains a mini-app called Tinker that lets you... well, tinker. It lets you talk with the Input/Output pins of the Spark Core without writing a single line of code.

Each of the pins has up to four functions available:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

Wait, what is this thing?
=====

The Spark Core is a Wi-Fi development kit for internet-connected hardware. It is, in essence, the "brains" of a connected hardware product or project.

The Core has on board a microcontroller, which is a small, low-cost, low-power computer that can run a single application. The microcontroller runs the show; it runs your software and tells the rest of the Core what to do. It doesn't have an Operating System the way that your computer does; it just runs a single application (often called *firmware* or an *embedded application*), which can be as simple as a few lines of code, or very complex, depending on what you want to do.

Microcontrollers are particularly good at *controlling things*; hence the name. They have a set of "pins" (little spider leg type things sticking off the chip) that are called *GPIO* (General Purpose Input and Output) pins, or I/O pins. They can be hooked to sensors or buttons to listen to the world, or they can be hooked to lights and motors to act upon the world. These pins have been extended out on the Core so you can easily connect to them; the pins labeled D0 to D7 and A0 to A7 are hooked directly to the microcontroller's GPIO pins.

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

The Spark Cloud is a network of servers hosted at `https://api.spark.io/` that the Spark Core connects to once it's on your Wi-Fi network.

The Cloud exists for three main reasons:

### Simplicity

Generally speaking, when you work in an embedded system, networking means sending bytes over TCP sockets and UDP datagrams. Everyone agrees - socket programming is not fun. But higher-level communications are difficult because microcontrollers have so little memory they can't generally host a traditional HTTP web server. The Cloud gives you the simplicity of the web server with the low cost and low power of a microcontroller by translating between web communications (HTTP requests) and embedded communications (in our case, encrypted CoAP messages).

But you don't have to know any of that. The whole point of the Cloud is that all of this is abstracted away. You don't need to know *how* it connects to the internet; it just does. And once it's connected, you can make it do awesome things quickly and easily, without dealing with sockets.

### Global availability

By default, if you connect a thing to your Wi-Fi network, it's only available from elsewhere on your local network. This is a result of the fact that we've run out of IP addresses, and it's also a security measure, since it means that people can't just reach into your home willy-nilly and mess with your stuff.

Making the stuff in your home available outside your home is a pain, and usually requires nasty things like port mapping and static IP addresses. Even if you're technically savvy enough to handle this stuff, if you're developing a product, you don't want to make familiarity with OpenWRT a pre-requisite for purchasing your product.

We avoid this issue entirely with the Cloud. The Core connects to the Cloud when it hits your Wi-Fi network, and holds open a persistent connection. This means that it's available from anywhere in the world at any time.

But wait, if local networks are a security measure, then doesn't this open you up to all sorts of nasties? Well, it would, except...

### Security

Yep, that's right. We thought of that.

Security is hard. It's especially hard on an embedded system, because encryption is resource intensive. But it's also important, because you don't want anyone turning on and off your lights, or worse, locking and unlocking your front doors.

We hand-picked a set of rock-solid security protocols that are both fully secure and incredibly efficient, so they work great on an embedded system. They're baked into the Spark Protocol, which is open source and ready to be extended to other products.



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
