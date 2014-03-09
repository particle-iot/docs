让我们开始吧
=====

### 盒子里的内容

![Spark Core in box](images/core-in-box.jpg)

恭喜您成为一个全新的星火核心的主人！来吧，打开盒子，让我们来谈谈你所看到的。你的盒子应包括：

- *一个 Spark Core*. 你买的原因就是为了它. 我们将会进一步探讨.
- *一个面包板*. 面包板能轻易把电子元件接到 Spark Core 上，不许软焊. Internally, the rows are electrically connected horizontally, and the "rails" along the edges are connected vertically. 请参阅 [breadboard article on Wikipedia](http://en.wikipedia.org/wiki/Breadboard) 了解更多信息.
- *一条 USB 数据线*. 附带的 USB 数据线能用来做两件事: 为 Spark Core 供电 (连接到您的电脑, USB 电源适配器, 或者是 USB 能量砖) 和重新编程. 大部分时间,您会通过 Spark 云来重新编程 Spark Core,但你总是可以选择通过 USB 重新编程, 特别是如果您的互联网无法连接，或你选拔使用自己的服务器.


### 第1步: 接上电源

![Power the Core](images/core-usb.jpg)

让 Spark Core 接上电源很容易；它通过一个微型USB端口接收电,就像许多智能手机和其他小机件. 把  Micro USB 数据线连接到 Spark Core 的 USB 端口, USB 数据线的另一端插入电脑, USB集线器 (自有电源), 或 USB 电源适配器 (像是您智能手机所用的).

如果您想要的话, 您也能把 （3.6V 到 6V） 接到 `VIN` pin, 或 3.3V 到 `3.3V` pin.

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

Spark 的手机程序会指导您完成整个过程, 但基本上它是一个一步到位的过程. 您输入您的Wi-Fi网络名称（SSID）和密码，通过 Wi-Fi 发到 Spark Core, 它会自动连接到网络和 Spark 云. 如果一切按计划进行，你会看到LED会呈献以下颜色：

- **蓝色闪烁**: 正在监听 Wi-Fi 的认证
- **绿色闪烁**: 正在连接到本地 Wi-Fi 网络
- **青色闪烁**: 正在连接到 Spark 云
- **品红闪烁**: 正在更新到最新的固件
- **青色慢速闪烁**: 连接成功！

<div id="core1" class="core"><div class="core-butt"></div><div class="rgb"><div class="pattern"></div></div></div>

<a id="button1" class="button" onclick="animateCore()">See an animation</a>

如果 Spark 的手机程序无法帮您完成以上的过程, 您也能透过 USB 把 Spark Core 连接到网络. 欲了解更多信息，或详细解释, 请到：

[Connect your Core >](/#/connect)

### 第4步: 用 Tinker 闪烁 LED

![Tinker](images/tinker.png)

Spark 的手机程包含一个小应用程序叫 Tinker. 它可以让您无需编写任何代码,就能控制 Spark Core 输入/输出引脚. 


每个 pin 可具有多达四个功能：*digitalWrite*, *analogWrite*, *digitalRead*, and *analogRead*. 欲了解更多信息，向下滚动到
 "Tinkering with Tinker" 部分.

### 第5步: 用 Spark Build 编写应用程序

![Spark Build](images/ide.png)

当您开始厌倦了读取传感器的值或闪烁 LEDs, 请到 Spark Build IDE 尝试实际的应用程序.  Spark Build 允许您从任何现代Web浏览器,创建和上传自定义应用程序到您的 Spark Core, 和让 Core 备有互联网全部的功能！哇！

不要紧张--我们已经准备了大量的示例应用程序和库,将让你从对的方向开始. 要了解更多信息，上进一步回落 向下滚动到 Spark Build 编写的应用程序” 部分.  


等一下，这是什么东西？
=====

Spark Core 是Wi-Fi的开发套件，用于网络连接的硬件。它在本质上，是一个连接的硬件产品或项目的“大脑”。

Core 上有微控制器, 是一种小型，低成本，低功耗， 可以运行一个应用程序的电脑. 微控制器主要运行，它运行在您的软件，并告诉 Core 的其余部分该做什么. 它不像一般的电脑有一个操作系统; 它只是运行一个应用程序(通常被称为 *固件* 或 *嵌入式应用*）, 可以是简单的，只需几行代码，还是很复杂的，这取决于你想要做什么。

微控制器*在控制东西*方面特别好; 所以故名为‘微控制器’. 他们有一套“管脚" (小蜘蛛腿型的东西) 这被称为 *GPIO* (通用输入和输出) 管脚, or I/O 管脚. 它们可以被连接到传感器或按钮来与世界接触, 或者他们可以挂接到灯和马达. 
这些微控制器的管脚已被直接连到 Spark Core 接头上的两侧方便使用; 特别是, 标记 D0 到 D7 和 A0 到 A7 的引脚直接挂接到单 片机的 GPIO 管脚。

微控制器还可以与其他芯片使用像普通的协议进行通信,譬如 *Serial* (也被称为 UART), *SPI*, or *I2C* (也被称为 Wire). 然后，您可以让 Core 更加强大，它连接到专用芯片，如马达驱动器或移位寄存器。 有时候，我们会将这些芯片放在一个  *Shield*, 一个附件，可以很容易扩展 Spark Core 的功能.

Spark Core 还具有Wi-Fi模块，它连接到您的本地 Wi-Fi 网络，像您的电脑或智能手机可以连接到 Wi-Fi 网络的方式相同. Spark Core 编程,在默认情况下，只要它能找到并连接到网络,就为保持连接到互联网.

当 Spark Core 连接到互联网，它会与 *Spark 云* 建立连接. 通过连接到云，Spark Core 从任何地方通过一个简单的 REST API 变得容易存取。 这个API被设计成使它很容易与 Spark Core 互动. 通过一个web应用程序或移动应用程序, 在一个安全的，私人的方式接口与 Spark Core，这样只有您和您信任的人可以与 Spark Core 互动。


### 按钮

Spark Core 上有两个按钮：按RESET按钮（右侧）和MODE按钮（左侧).

RESET按钮将会把 Spark Core 硬复位，有效切除微控制器的电源和重新通电。这是重新启动，你已经下载到核心的应用程序的好方.

MODE 按钮有三个功能:

- 按住 MODE 键三秒钟把 Spark Core 进入 *Smart Config* 模式，将它连接到您的本地 Wi-Fi 网络. LED应开始蓝色闪烁.
- 按住 MODE 按钮十秒钟以清除 Spark Core 内存的 Wi-Fi 网络.
- 按住 MODE 键，点击RESET按钮，等待*3秒* 进入 *Bootloader* 的模式. 当您看到LED闪烁黄色,松开MODE按钮.在这里您可以通过 USB 或 JTAG 重新编程 Spark Core.  如果你不小心这样做，只需点击 RESET 按钮就能离开 *Bootloader* 的模式。
- 按住 MODE 键，点击 RESET 按钮，等待 *10秒* 做 *出厂重置*， 将 Spark Core 重新编程，回到工厂安装的核心软件 (Tinker 小应用程序). LED应该变成白色三秒钟，然后开始快速闪烁; 当 LED 切换到另一种颜色的核心已被重置. 如果遇到固件错误, 或者如果你只是想回 Tinker 小应用程序匠,这是有用的.


### LEDs

Spark core 有两个 LED. 中间胖肥的是一个全彩 RGB LED，显示您 Spark Core 互联网连接的状态。另外小的蓝色 LED 是 *用户LED*; 它连接到 D7, 所以当你控制 D7 脚`高`或`低`，它打亮灯或关闭.

RGB LED可以显示出以下状态：

- **蓝色闪烁**: 正在监听 Wi-Fi 的认证
- *蓝色固体*: Smart Config 完成, 收到 Wi-Fi 网络信息
- **绿色闪烁**: 正在连接到本地 Wi-Fi 网络
- **青色闪烁**: 正在连接到 Spark 云
- **青色慢速闪烁**: 连接成功！
- *黄色闪烁*: Bootloader 模式, 等待 USB 或 JTAG 重新编程.
- *白色闪烁*: 出厂设置启动.
- *白色固体*: 恢复出厂设置齐全;重启.

RGB LED 也可以让你知道，如果在建立互联网连接有错误. *红色LED表示发生了故障* 这些故障可能包括：

- *两个红色闪烁*： 连接失败是由于不良的互联网连接。请检查您的网络连接.
- *三个红色闪烁*： 无法与 Spark 云连接，但互联网连接是好的。 查看我们的 [Twitter feed](http://www.twitter.com/sparkdevices) 看是否有过任何报道停运; 否则，请到 [支持页面](https://www.sparkdevices.com/support) 寻求支援.
- *四个红色闪烁*： 与 Spark 云达成，但安全握手失败。 请到 [支持页面](https://www.sparkdevices.com/support)寻求支援.
- *黄/红闪烁*: Spark 云错误认证. 请发电子邮件到(<a href="mailto@hello@spark.io">hello@spark.io</a>).

### Pins

Spark Core 具有 24 可以将电路连接的管脚，这些管脚是:

- _VIN_: 这里连接一个不受管制的电源与3.6V至6V的电压来驱动 Spark Core. 如果你通过 USB 供电的 Spark Core，该引脚应*不*使用。
- _3V3_: 该引脚将输出一个稳定的 3.3V 电源轨，可用于 Spark Core之外的任何组件提供电力. (此外，如果你有自己的 3.3V 稳压电源，你可以将其插入这里驱动 Spark Core）.
- _3V3*_: 这是一个单独的低噪声稳定的 3.3V 电轨设计用于可能容易受到数字元件噪声影响的模拟电路。 如果你正在使用任何敏 感的模拟传感器，请用_3V3*_ 电源，而不是从_3V3_.
- _!RST_: 把该引脚连接到GND， 您可以重置 Spark Core (就像是按 RESET 按钮)
- _GND_: 这些引脚是您的电气接地引脚。
- _D0 to D7_: 这些都是 Spark Core 的基础: 8 GPIO (通用输入/输出) 管脚. 它们标有“D” 因为他们是“数字”管脚, 这意味着它们无法读取模拟传感器的值. 有些管脚可有额外的外设（SPI，JTAG，等). 请继续阅读以了解更多信息.
- _A0 to A7_:这些是多 8 个 GPIO 管脚, 把总数拉到 16. T这些管脚就像D0到D7，但他们是“模拟”管脚， 这意味着它们可以读取模拟传感器的值(从技术上来说，他们有一个ADC外设).和“数字”管脚一样，其中的一些管脚有额外的可用外设
- _TX and RX_: 这些引脚用于串行通信 Serial/ UART. TX 表示传动管脚，和 RX 表示接收管脚。

#### 脉冲宽度调制 管脚

当您要使用 Core `analogWrite()` 的功能, 例如为了自如暗淡 LED 的的亮度, 您需要使用具有定时器外设管脚.  人们常常称这些 PWM 管脚, 因为他们做的就是脉宽调制.  Spark Core 有8个 PWM 管脚： A0, A1, A4, A5, A6, A7, D0 and D1.

Spark 云
---

Spark 云的一簇服务器托管在`https://api.spark.io/`，Spark core 一旦连接到您的Wi-Fi网络上就会连接到 Spark 云

Spark 云的存在主要有三个原因：

### 简单性
一般而言，当您在一使用个嵌入式系统，联网方式是通过TCP套接字和UDP数据包发送的字节.每个人都同意 - socket 编程一点也不好玩. 但更高级别的通信是困难的，因为微控制器有那么一点记忆，他们一般不能举办一个传统的HTTP Web服务器.

云给你的是 Web服务器的简单性和微控制器的低成本与低功耗通.透过网络通信（HTTP请求）和嵌入式通信之间进行转换（在我们的案例中，是用加密COAP消息）。

但你不必知道任何一切. Spark 云整个的一点是，把所有这一切都抽象出来. 你不需要知道*它如何*连接到互联网，它自然就会. 而一旦它连接，您可以快速的把它弄做成很棒的东西，很轻松地，无需处理 socket 编程。

### 到处都能连接

默认情况下，如果你一个东西连接到 Wi-Fi 网络，它是只能从本地网络上的连接。 这是我们已经用完了IP地址的事实的结果
, 也是一种安全措施, 因为外人不能随意侵入您的网路，任意控制您的东西.

要使得您家里的东西能从家外面控制是一件非常不容易的事. 通常需要做讨厌的东西，像端口映射和静态IP地址. 即使你在技术上精明，足以应付这东西,如果你正在开发一个产品, 你不想让技术上精明作为先决条件.

我们用 Spark 云完全回避这个问题。一旦 Spark Core 连接到您的 Wi-Fi 网络上就会连接到 Spark 云, 并保持打开持久的连接. 这意味着它可从世界上任何地方在任何时间都能都能被连接上.

但是，如果本地网络是一种安全措施，那么这难道不是打开种种的龌龊？嗯，是的，不过...

### 安全

是，没错.我们有想到这一点.

安全性是很难的. 特别是难在嵌入式系统上，因为加密很资耗费源密. 但它也是重要的，因为你不希望任何人打开和关闭你的灯，或者更糟的是，锁定和解锁你的前门.

我们手选的一组安全协议是安全有效和坚固的，能有效的在嵌入式系统上运行. 安全协议是公开的，能扩展到其它产品.



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
