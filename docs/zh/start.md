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
- **蓝色固体**: Smart Config 完成, 收到 Wi-Fi 网络信息
- **绿色闪烁**: 正在连接到本地 Wi-Fi 网络
- **青色闪烁**: 正在连接到 Spark 云
- **青色慢速闪烁**: 连接成功！
- **黄色闪烁**: Bootloader 模式, 等待 USB 或 JTAG 重新编程.
- **白色闪烁**: 出厂设置启动.
- **白色固体**: 恢复出厂设置齐全;重启.

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

安全性是很难的. 特别是难在嵌入式系统上，因为加密很耗费源资. 但它也是重要的，因为你不希望任何人打开和关闭你的灯，或者更糟的是，锁定和解锁你的前门.

我们手选的一组安全协议是安全有效和坚固的，能有效的在嵌入式系统上运行. 安全协议是公开的，能扩展到其它产品.



用 "Tinker" 操作
======

Tinker 应用程序
---

![Tinker](images/tinker.png)

Spark 手机应用程序的 Tinker 部分，而无需编写任何代码就能容易对 Spark Core 入手. 它在您发展的初期很管用，能提供您需要的一切让你的项目起步.

Tinker 应用程序包含16个管脚的控制接口 - 8模拟管脚在左边，8个数字管脚在右边. 这些管脚代表了 Spark Core 上的 16 个 GPIO（通用输入输出）管脚.

![Tinker selection](images/tinker-select.png)

首先，请点选任何管脚.一个菜单会弹出显示管脚有可用的功能. 每个管脚最多有四个可能的功能：

- **digitalWrite** （数字写）:设置管脚为 HIGH(高)或低(LOW), 这是在连接到 3.3V（该系统的最大电压）或 GND（地）. D7 管脚连接到 一个板上的 LED; 如果你设置D7管脚为高电平时, LED会亮起, 如果你将其设置为低时，它会关闭.
- **analogWrite** (模拟写）: 设置管脚的值0和255之间, 其中0是相同的 LOW(低)和 255 是 HIGH(高). 这有点像介于0和3.3V发送电压, 但因为这是一个数字系统, 它使用一个叫做脉宽调制机制, 或短称 PWM. 作为一个例子, 你可以使用 *analogWrite* 把 LED 暗淡.
- **digitalRead** (数字读）: 这将读取数字管脚的值，这可以是高或低. 如果您管脚连接到 3.3V，它会读高;如果您将它连接到 GND，它会读低。 在任何地方之间，它会读取靠近的那一方，但在中间就很难决定.
- **analogRead** (模拟读）: 这将读取模拟管脚的值，这是从 0 值的模拟值4095，其中0表示低电平（GND）和 4095 是 高电压（3.3V）. 所有的模拟管脚（A0到A7）可以处理应付这个。 *analogRead* 用在读取传感器的数据最管用.

要改变管脚的功能，只需轻触并按住管脚, 功能选择菜单就会回来了。 任何进一步的问题？ [论坛！](https://community.sparkdevices.com/) 与我们谈一谈！

Tinker 固件
---

Tinker 固件是 Spark Core 在工厂流水线时储存的默认应用程序. 您可以随时用 [恢复出厂设置模式](#buttons) 让 Spark Core 回到 Tinker 固件 , 或者通过 Spark 的手机程序重新重新下载 Tinker 固件.

 Tinker 应用程序, 是如何用极少的代码建立一个功能强大的应用程序，很好的一个例子。 你可以 [在这里](https://github.com/spark/core-firmware/blob/master/src/application.cpp) 看看最新发布

Tinker 应用程式介面 (API)

---

当补 Tinker 固件安装在你的 Spark Core, 它会从您的手机应用程序响应某些API请求, 反映四个基本的GPIO功能 (digitalWrite, analogWrite, digitalRead, analogRead). 这些API请求，也可以从其他应用软件作出, 这样您就可以围绕 Tinker 固件构建自己的Web或手机应用程序.

### digitalWrite（模拟写）

设置管脚为 HIGH(高)或低(LOW), 这是在连接到 3.3V（该系统的最大电压）或 GND（地）. D7 管脚连接到 一个板上的 LED; 如果你设置D7管脚为高电平时, LED会亮起, 如果你将其设置为低时，它会关闭.

    POST /v1/devices/{设备标识号}/digitalwrite

    # 串行终端请求示例
    # Core ID(设备标识号) is 0123456789abcdef01234567
    # Your access token(访问令牌) is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0,HIGH

该参数必须是管脚 (A0 to A7, D0 to D7), 其次是高或低, 用逗号分隔. 返回值将是1，如果写入成功，返回-1，如果它失败。



### analogWrite（数字写）

设置管脚的值0和255之间, 其中0是相同的 LOW(低)和 255 是 HIGH(高). 这有点像介于0和3.3V发送电压, 但因为这是一个数字系统, 它使用一个叫做脉宽调制机制, 或短称 PWM. 作为一个例子, 你可以使用 *analogWrite* 把 LED 暗淡.

    POST /v1/devices/{设备标识号}/analogwrite

    # 串行终端请求示例
    # Core ID(设备标识号) is 0123456789abcdef01234567
    # Your access token(访问令牌) is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogwrite \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0,215

该参数必须是管脚 (A0 to A7, D0 to D7), 其次是一个整数值从0到255, 用逗号分隔. 返回值将是1，如果写入成功，返回-1，如果它失败.

    


### digitalRead(数字读）

这将读取数字管脚的值，这可以是高或低. 如果您管脚连接到 3.3V，它会读高;如果您将它连接到 GND，它会读低。 在任何地方之间，它会读取靠近的那一方，但在中间就很难决定.

    POST /v1/devices/{设备标识号}/digitalread

    # 串行终端请求示例
    # Core ID(设备标识号) is 0123456789abcdef01234567
    # Your access token(访问令牌) is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/digitalread \
      -d access_token=1234123412341234123412341234123412341234 -d params=D0


该参数必须是管脚 (A0 to A7, D0 to D7).返回值将是1，如果该引脚为高电平，0，如果该引脚为低电平，并-1，如果读取失败。



### analogRead(模拟读）

这将读取模拟管脚的值，这是从 0 值的模拟值4095，其中0表示低电平（GND）和 4095 是 高电压（3.3V）. 所有的模拟管脚（A0到A7）可以处理应付这个。 *analogRead* 用在读取传感器的数据最管用.

    POST /v1/devices/{设备标识号}/analogread

    # 串行终端请求示例
    # Core ID(设备标识号) is 0123456789abcdef01234567
    # Your access token(访问令牌) is 1234123412341234123412341234123412341234
    curl https://api.spark.io/v1/devices/0123456789abcdef01234567/analogread \
      -d access_token=1234123412341234123412341234123412341234 -d params=A0

该参数必须是管脚 (A0 to A7, D0 to D7). 返回值将介于0和4095如果读取成功，返回-1，如果它失败。


用 Spark Build　闪存应用程序
===

什么是固件?
---

一个*嵌入式系统*如 Spark Core 并没有像传统电脑的操作系统. 相反，它运行一个单独的应用程序，通常被称为*固件*，即每当系统通电运行。

*固件*是所谓的，比软件容易但比硬件较难。 在制造过程中的硬件是固定的，不会改变. 软件可以随时更新，所以它是非常灵活的. 固件是介于两者之间;硬件公司做发行的固件更新，但往往是非常罕见的，因为升级固件可能会很困难。

在我们的例子中，因为 Spark Core 连接到互联网，更新固件是相当微不足道的; 我们通过网络发送它，我们制定了预防措施，不让您的 Spark Core “变砖”.

当你闪代码到星火核心，你正在做一个 *空中固件更新*。 此固件更新几乎将覆盖所有的 Spark Core 的软件; 唯一不变的一块是引导程序,管理加载新固件的程序，并确保你总是可以通过USB或通过恢复出厂设置更新固件。  （我们将公开引导程序）

登录到 Spark Build
---
当你准备好重新编程您的 Spark Core，请到我们的 IDE：

[Spark Build >](https://www.spark.io/build)

![Spark Build](images/create-account.jpg)

创建一个帐户是一个简单的单步过程。  当登录屏幕出现，只需输入您的电子邮件地址（小心!），和所需的帐户密码。 按大友好的“注册”按钮，你就会到达 Spark Build 主页

![Spark Build](images/log-in.jpg)

如果您之前已经登录到 Spark Build, 点击注册按钮下方的“让我登录”文本, a你会看到一个现有用户的登录. 不要担心 - 如果你已经有一个帐户，不小心点击“注册”按钮，我们还是会您登录到您现有的帐户。

Spark Build, 我们的网上 IDE
---

![Spark Build](images/ide.png)

Spark Build 是一个集成开发环境 或短称 IDE; 这意味着你可以在Web浏览器中，用一个易于使用的应用程序，做软件开发.

Spark Build 的侧导航栏在左侧. 在顶端，有三个按钮，从而起到重要的功能：

- **Flash**（闪存）: 闪存当前的代码到 Spark Core. 这将启动一个 *空中固件更新* 并加载新的软件到您的 Spark Core.
- **Verify**(确认): 这将编译你的代码，而不会把它闪烁到 Core; 如果在你的代码中的任何错误，它们会显示在屏幕底部的 调试控制台.
- **Save**(储存）: 储存您对代码进行的任何更改

在底部，有多四个的按钮来导航 IDE：

- **Code**(编码): 显示你的固件应用程序的列表，并允许您选择要编辑/闪光哪一个。
- **Docs**(文档): 为您带来的 Spark Core 文档。
- **Cores**: 显示 Spark Cores 列表, 所以你可以选择要闪烁的 Core, 并获得每个 Spark Core 的更多信息.
- **Settings**(设置): 更改您的密码，注销，或获得调用您 API 的访问令牌。

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
