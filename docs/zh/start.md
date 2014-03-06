让我们开始吧
=====

### 盒子里的内容

![Spark Core in box](images/core-in-box.jpg)

恭喜您成为一个全新的星火核心的主人！来吧，打开盒子，让我们来谈谈你所看到的。你的盒子应包括：

- *一个 Spark Core*. 你买的原因就是为了它. 我们将会进一步探讨.
- *一个面包板*. 面包板能轻易把电子元件接到 Spark Core 上，不许软焊. Internally, the rows are electrically connected horizontally, and the "rails" along the edges are connected vertically. 请参阅 [breadboard article on Wikipedia](http://en.wikipedia.org/wiki/Breadboard) 了解更多信息.
- *一条USB电缆*. 附带的USB电缆能用来做两件事: 为 Spark Core 供电 (连接到您的电脑, USB 电源适配器, 或者是 USB 能量砖) 和重新编程. 大部分时间,您会通过星火云来重新编程星火核心,但你总是可以选择通过 USB 重新编程, 特别是如果您的互联网无法连接，或你选拔使用自己的服务器.


### 第1步: 接上电源

![Power the Core](images/core-usb.jpg)

让 Spark Core 接上电源很容易；它通过一个微型USB端口接收电,就像许多智能手机和其他小机件. Power your Core on by connecting the Micro USB cable to the USB port on the Core, USB电缆的另一端插入电脑, USB集线器 (自有电源), 或 USB 电源适配器 (想是您的智能手机).

If you so desire, you can also power the Core with 3.6V to 6V to the `VIN` pin, or 3.3V to the `3.3V` pin.

### 第2步: 下载 Spark 的 iOS or Android 手机程序

![Spark apps](images/spark-apps.png)

利用手机程序将是把星火核心连接到互联网最简单的方法. 手机程序能帮您做以下的三件事项:

- 开一个 Spark 账户 
- 连接 Spark Core 到您的 Wi-Fi网络
- 而无需编写任何代码,控制您的 Spark Core

iOS 手机程序需要 iOS 7, Android 的手机程序需要 (Android 4.0) 以上.

[下载 iPhone 手机程序 >](https://itunes.apple.com/us/app/spark-core/id760157884)

[下载 Android 手机程序 >](https://play.google.com/store/apps/details?id=io.spark.core.android)



### 第3步:  Spark Core 连接 Wi-Fi

![Smart Config](images/smart-config.png)

连接星火核心到您的Wi-Fi是非常的简单. 其实，我在打这一段字时就做了两次！

Spark 手机程序会指导您完成整个过程, 但基本上它是一个一步到位的过程. 您输入您的Wi-Fi网络名称（SSID）和密码，通过 Wi-Fi 发到 Spark Core, 它会自动连接到网络和 Spark 云. 如果一切按计划进行，你会看到LED会经历以下颜色：

- **蓝色闪烁**: 正在监听 Wi-Fi 的认证
- **绿色闪烁**: 正在连接到 Wi-Fi 网络
- **Flashing cyan**: 正在连接到 Spark 云
- **品红闪烁**: 正在更新到最新的固件
- **Breathing cyan**: 连接成功！

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">See an animation</a>

If the mobile app doesn't work for you, you can also connect your Spark Core over USB. For more information, or for a detailed explanation of how to connect your Core to the 'net, check out:

[Connect your Core >](/#/connect)

### Step 4: Blink an LED with Tinker

![Tinker](images/tinker.png)

The Spark mobile app contains a mini-app called Tinker that lets you... well, tinker. It lets you talk with the Input/Output pins of the Spark Core without writing a single line of code.

Each of the pins has up to four functions available: *digitalWrite*, *analogWrite*, *digitalRead*, and *analogRead*. For more information, scroll down to the "Tinkering with Tinker" section.

### Step 5: Write Apps with Spark Build

![Spark Build](images/ide.png)

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

There are two buttons on the Core: the RESET button (on the right) and the MODE button (on the left). 

The RESET button will put the Core in a hard reset, effectively depowering and repowering the microcontroller. This is a good way to restart the application that you've downloaded onto the Core.  

The MODE button serves three functions:

- Hold down the MODE button for three seconds to put the Core into *Smart Config* mode to connect it to your local Wi-Fi network. The LED should start flashing blue.
- Hold down the MODE button for ten seconds to clear the Core's memory of Wi-Fi networks.
- Hold down the MODE button, tap on the RESET button and wait for *three seconds* to enter *Bootloader* mode, where you can reprogram the Core over USB or JTAG. Release the MODE button when you see the LED flashing yellow. If you do this by accident, simply hit RESET button to leave *Bootloader* mode.
- Hold down the MODE button, tap on the RESET button and wait for *ten seconds* to do a *Factory Reset*, where the Core is reprogrammed with the software that was installed on the Core in the factory (the Tinker application). The LED should turn white for three seconds and begin flashing quickly; when the LED switches to another color the Core has been reset. This is useful if you encounter bugs with your firmware, or if you just want to get back to Tinker.


### LEDs

There are two LEDs on the Core. The big fat one in the middle is a full-color RGB LED that shows you the status of the Core's internet connection. The other small blue LED is the *user LED*; it's hooked up to D7, so when you turn the D7 pin `HIGH` or `LOW`, it turns on and off, respectively.

The RGB LED could show the following states:

- *Flashing blue*: Listening mode, waiting for network information.
- *Solid blue*: Smart Config complete, network information found.
- *Flashing green*: Connecting to local Wi-Fi network.
- *Flashing cyan*: Connecting to Spark Cloud.
- *Slow breathing cyan*: Successfully connected to Spark Cloud.
- *Flashing yellow*: Bootloader mode, waiting for new code via USB or JTAG.
- *Flashing white*: Factory Reset initiated.
- *Solid white*: Factory Reset complete; rebooting.

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

![Tinker](images/tinker.png)

The Tinker section of the Spark mobile app makes it very easy to start playing with your Spark Core without writing any code. It's great for early development, and often it will do everything you need to get your project off of the ground.

The app consists of 16 pins in vertical rows - 8 analog pins on the left, 8 digital pins on the right. These pins represent the 16 GPIO (General Purpose Input and Output) pins on the Spark Core, and are organized the same way.

![Tinker selection](images/tinker-select.png)

To begin, tap any of the pins. A menu will pop up showing the functions that pin has available. Each pin can have up to four possible functions:

- **digitalWrite**: Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.
- **analogWrite**: Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.
- **digitalRead**: This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.
- **analogRead**: This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

To change the function of the pin, simply tap and hold on the pin, and the function select menu will come back up. Any further questions? Come talk to us in the [forums!](https://community.sparkdevices.com/)

The Tinker firmware
---

The Tinker firmware is the default application program stored in the Spark Core upon its commissioning from the factory assembly line. You can always get back to it by putting the Core in the [factory reset mode](#buttons), or by re-flashing your Core with Tinker in the Spark mobile app.

The Tinker app is a great example of how to build a very powerful application with not all that much code. You can have a look at the latest release [here.](https://github.com/spark/core-firmware/blob/master/src/application.cpp)

The Tinker API
---

When the Tinker firmware is installed on your Spark Core, it will respond to certain API requests from your mobile app, which mirror the four basic GPIO functions (digitalWrite, analogWrite, digitalRead, analogRead). These API requests can also be made from another application, so you can build your own web or mobile app around the Tinker firmware.

### digitalWrite

Sets the pin to HIGH or LOW, which either connects it to 3.3V (the maximum voltage of the system) or to GND (ground). Pin D7 is connected to an on-board LED; if you set pin D7 to HIGH, the LED will turn on, and if you set it to LOW, it will turn off.

    POST /v1/devices/{DEVICE_ID}/digitalwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0,HIGH

The parameters must be the pin (A0 to A7, D0 to D7), followed by either HIGH or LOW, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.



### analogWrite

Sets the pin to a value between 0 and 255, where 0 is the same as LOW and 255 is the same as HIGH. This is sort of like sending a voltage between 0 and 3.3V, but since this is a digital system, it uses a mechanism called Pulse Width Modulation, or PWM. You could use *analogWrite* to dim an LED, as an example.

    POST /v1/devices/{DEVICE_ID}/analogwrite

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0,215

The parameters must be the pin (A0 to A7, D0 to D7), followed by an integer value from 0 to 255, separated by a comma. The return value will be 1 if the write succeeds, and -1 if it fails.

    


### digitalRead

This will read the digital value of a pin, which can be read as either HIGH or LOW. If you were to connect the pin to 3.3V, it would read HIGH; if you connect it to GND, it would read LOW. Anywhere in between, it'll probably read whichever one it's closer to, but it gets dicey in the middle.

    POST /v1/devices/{DEVICE_ID}/digitalread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalread \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0


The parameter must be the pin (A0 to A7, D0 to D7). The return value will be 1 if the pin is HIGH, 0 if the pin is LOW, and -1 if the read fails.



### analogRead

This will read the analog value of a pin, which is a value from 0 to 4095, where 0 is LOW (GND) and 4095 is HIGH (3.3V). All of the analog pins (A0 to A7) can handle this. *analogRead* is great for reading data from sensors.

    POST /v1/devices/{DEVICE_ID}/analogread

    # EXAMPLE REQUEST IN TERMINAL
    # Core ID is 0123456789abcdef01234567
    # Your access token is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogread \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0

The parameters must be the pin (A0 to A7, D0 to D7). The return value will be between 0 and 4095 if the read succeeds, and -1 if it fails.


Flash Apps with Spark Build
===

What is firmware?
---

An *embedded system* like the Spark Core doesn't have an Operating System like a traditional computer. Instead, it runs a single application, often called *firmware*, which runs whenever the system is powered.

*Firmware* is so-called because it's harder than software and softer than hardware. Hardware is fixed during manufacturing, and doesn't change. Software can be updated anytime, so it's very flexible. Firmware is somewhere in between; hardware companies do issue firmware updates, but they tend to be very infrequent, because upgrading firmware can be difficult.

In our case, because the Spark Core is connected to the internet, updating firmware is quite trivial; we send it over the network, and we have put in place safeguards to keep you from "bricking" the Core.

When you flash code onto the Spark Core, you are doing an *over-the-air firmware update*. This firmware update overwrites almost all of the software on the Spark Core; the only piece that is untouched is the bootloader, which manages the process of loading new firmware and ensures you can always update the firmware over USB or through a factory reset.  (We'll be open sourcing the bootloader as soon as we can bring the README up to date.)

Logging into Spark Build
---
When you're ready to reprogram your Spark Core, head over to our IDE:

[Spark Build >](https://www.spark.io/build)

![Spark Build](images/create-account.jpg)

Creating an account is a simple one-step process.  When presented with the login screen, simply enter your email address (careful!), and desired account password.  Press the big friendly "Sign Up" button, and you'll reach the Spark Build home page.

![Spark Build](images/log-in.jpg)

If you've already logged into Spark Build before, click the "Let me log in" text beneath the Sign Up button, and you'll be presented with a login for existing users.  Don't worry--if you already have an account and accidentally click the "Sign Up" button, we'll still log you into your existing account.

Spark Build, our web IDE
---

![Spark Build](images/ide.png)

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

![Spark Build](images/spark-apps.jpg)

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

---
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

![Spark Build](images/select-a-core.jpg)

- **Select Your Core**: The next step is to make sure that you've selected which of your Cores to flash code to.  Click on the "Cores" icon at the bottom left side of the navigation pane, and click on the start next to the Core you'd like to update.  Once you've selecte a Core, the star associated with it will turn yellow.

- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your Core.  If the flash was successful, the LED on your Core will begin flashing magenta.

![Spark Build](images/fork-app.jpg)

- **Fork**: Wish the timing of that LED flash was a little bit faster?  Try clicking on the "Fork This Example" button after selecting the "Blink An LED" example application.  You've now got a personal copy of that application that you can modify, save, and flash to all of your Cores.

- **Edit**: Try changing the values in the delay() function from 1000 to 250, which changes the timing interval from 1000 milliseconds to only 250 milliseconds.  Click the Verify button, then the Flash button.  Is your Core's LED blinking faster?  Well done :)


Account Information
---

There are a couple of other neat bells and whistles in Spark Build.  The Spark Build IDE the best tool for viewing important information about your Core, managing Cores associated with your Spark account, and "unclaiming" them so they can be transferred to your buddy.

![Spark Build](images/device-id.jpg)

- **Core ID**: You can view your Core's Device ID by clicking on the "Cores" icon at the bottom of the navigation pane, then clicking the dropdown arrow next to the Core of interest.  

- **Unclaim**: You can "Unclaim" a Core by pressing the "Remove Core" button that is revealed by clicking the dropdown arrow.  Once a Core has been unclaimed, it is available to be reassociated with any Spark users' account.

![Spark Build](images/access-token.png)

- **API Key**: You can find your most recent API Key listed under the "Settings" tab in your account.  You can press the "Reset Token" button to assign a new API Key to your account.  *Note* that pressing this button will require you to update any hard-coded API Credentials in your Spark-powered projects!






The Spark Command Line
===

**Coming soon!** Command line tools so that you can build Spark applications with your own desktop IDE, whether it's Eclipse, Sublime Text, Vim, or anything else.

Deploying a Spark web app
===

**Coming soon!** We'll give you instructions for how to deploy a web app on Heroku that can talk with a Spark Core.

Troubleshooting
===

What's wrong?
---

### My Core won't connect to Wi-Fi

There are many reasons that your Core might not be connecting to your Wi-Fi network. To debug, check out our detailed connection troubleshooting section:

[Why won't it connect? >](/#/connect/troubleshooting)

### I can't talk to my Core

Once your Core is connected, it needs to be *claimed* in order to be associated with your account. This is what lets you control your Core and keeps anyone else from doing so.

If you use the mobile app to set up your Core, it should claim it automatically. However if you connect your Core over USB, or if the claiming process is unsuccessful, you can claim it manually.

Head over to our connection page to learn about this:

[ Claiming your Core >](/#/connect/claiming-your-core)

### My Core won't start up

If your Core won't start up (the LED never comes on), here are a few things to check:

- Is the Core receiving sufficient power? If you're not sure, connect a multimeter to the 3.3V pin and GND and see if you get 3.3V, as expected. Try connecting the Core to another power source.
- Have any components been damaged? Visually inspect both sides of the Core.

### My Core is behaving erratically

If you're seeing unexpected behavior with your Core, here are a few things to check:

- Is the Core receiving sufficient power? The Core might behave eratically if it's plugged into an unpowered USB hub and not receiving enough power. In addition, if you have components that draw a lot of power (motors, for instance), you might need more power than your computer can supply. Try using a USB power supply or providing more power directly to the VIN or 3.3V pins.
- If you have a u.FL Core, is an antenna connected? Are you within range of the Wi-Fi router?


Further resources
===

Hardware development
---

### Hardware for dummies

**Coming soon!**

### Advanced hardware

**Coming soon!**

Software development
---

### Software for dummies

**Coming soon!**

### Advanced software

**Coming soon!**
