连接您的 Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

连接 Spark Core 到Wi-Fi的最简单方法是使用为iPhone或Android 手机应用程序. 但如果这行不通，或者您没有 iOS/ Android手机，我们还有还有其它方法.

对于所有下面的方法, Spark Core 必须在“聆听”模式，闪烁蓝色 LED 能让您知道它已在此模式.

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

Core 在默认情况下会进入“聆听”模式，所以如果您的 Core 是全新的，它应该直接进入聆听模式. 否则，请按MODE按钮3秒钟. seconds.

## Spark 手机应用程序的智能配置

<iframe class="vine-embed" src="https://vine.co/v/hFH09MJwbxg/embed/simple" width="320" height="320" frameborder="0"></iframe>

一旦您从 App Store 或 Google Play 下载星火核心的应用程序下载，您应该注册一个 Spark 帐户. 之后，您会被要求使用一种称为智能配置过程来连接您的 Core.  如果您的核心有U.FL连接器， 您必须启动智能配置前连接一个外接天线. **注意：您的手机必须连接到您想要 Core 连接到的Wi-Fi网络** 该应用程序会自动填入 SSID 字段与您的手机连接到网络的名称. 输入您的Wi-Fi密码，并点击连接。

<iframe class="vine-embed" src="https://vine.co/v/hFwubhA3JXV/embed/simple" width="320" height="320" frameborder="0"></iframe>

智能配置可能需要长达一分钟的时间，请耐心等待. 如果您的手机越接近您的 Spark Core，它将更快连接. 一旦 core 听到信号时，它会通过灯光的顺序如下：

- **蓝色固体**: 收到WiFi凭证
- **绿色闪烁**: 正连接到Wi-Fi网络
- **青色闪烁**: 正连接到 Spark 云
- **青色慢速闪烁**: 已连接到 Spark 云

<iframe class="vine-embed" src="https://vine.co/v/hFdj1TJjA9M/embed/simple" width="320" height="320" frameborder="0"></iframe>

一旦 Spark Core 已经连接，您的手机将“认领” core，并将它附加到您的帐户. 然后您可以为您的 core 取名字. 如果您不确定认领过程是否成功，您可以登录 [Spark Web IDE](https://www.spark.io/build) 并在页面的底部点击“core”的图标. 您的 core 是否被列出？  太棒了！这个世界是完美的!

*注意: Core **必须** 已连接到互联网 (青色慢速闪烁) 才能让认领过程运作. 如果 Spark Core 已被别人领取，手机运用程序将无法连接. 如果您需要把 Spark Core 过户到另一个户口, 请发电子邮件到 [hello@spark.io](mailto:hello@spark.io).*

<iframe class="vine-embed" src="https://vine.co/v/hFdPKul226i/embed/simple" width="320" height="320" frameborder="0"></iframe>

如果您要连接多个 core，您会经历为每个核心命名的过程. 您会透过LED彩虹信号知道是哪一个.

<iframe class="vine-embed" src="https://vine.co/v/hFdxB9lHOmv/embed/simple" width="320" height="320" frameborder="0"></iframe>

一旦您已经完成了core的命名，您可以用 Tinker 控制它们！ 尝试用 *digitalWrite* 在D7把用户LED打亮.

## 德州仪器（TI) 手机应用程序智能配置

Texas Instruments(德州仪器) CC3000手机应用程序的智能配置过程与以上过程类似, 但您不需要用Spark帐户. TI 也提供 Java applet,可以从Mac，Windows或Linux电脑使用.

按照德州仪器（TI）的网站上的说明：

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

唯一的不同的是，您需要通过可选的AES密钥并输入`sparkdevices2013`.

*注意: 德州仪器（TI) 的手机应用程序不在 Google Play 上; 您必须从它们的网站下载它apk,自己安装在手机上.*

## 通过 USB 连接

您也可以通过USB串行通信连接 Spark Core 接到您的Wi-Fi网络.  *注意: 这只有当 Spark Core 在聆听模式才能使用 (i.e. LED 在蓝色闪烁)*.

首先，您需要下载一个串行终端应用程序.

 __Windows__ 用户, 我们推荐 [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/).
您还需要安装 Windows 驱动程序：

[Spark Core Windows 驱动程序 >](https://s3.amazonaws.com/spark-website/Spark.zip)

[CoolTerm](http://freeware.the-meiers.org/) 提供一个很好的图形用户界面（GUI）.
![CoolTerm 设置](images/coolterm-settings.png)
![CoolTerm 安装](images/coolterm-setup.png)

 __Mac__ 用户, 请使用 CoolTerm 或 screen work.

 __Linux__ 命令行用法, [GNU Screen](https://www.gnu.org/software/screen/) 很棒.
(在OS X上，在命令行调用可能看起来像 `screen /dev/cu.usbmodem1411 9600`.
在Ubuntu上，它看起来像 `screen /dev/ttyACM0 9600`. 设备位置可能会有所不同，如果你不能马上找到它，请看 `/dev`目录.）

__操作方法__

将您的 Spark Core 通过 USB 连接到您的电脑. 当 Spark Core 是在聆听模式，通过 USB 打开一个串行端口,标准设置应该是：

- baudrate(波特率): 9600
- data bit(数据位): 8
- parity(奇偶校验位): none
- Stop Bits(停止数据位): 1

一旦您打开了一个串行连接，您有两个命令能透过键盘打**W**或**i** 使用. 它们的功能是：

- **w**: 设置您的无线网络的SSID和密码
- **i**: （“i”作为标识）读出 Spark Core 标识号

**注意：**如果您通过USB第一次连接您的内核，你还需要亲自*认领*您的核心将它与您的帐户进行连接. 请参阅下面的章节 [认领您的 Core](/#/connect/claiming-your-core) 了解更多的细节.

## 即将推出：自编 SSID 和密码

目前还没有一种机制来自编您的 SSID 和密码到 Spark Core 里.我们正在努力！

认领您的 Core
===

一旦您的 Spark Core 连接, 它需要被认领并与您的帐户相关联。.这就是让您控制您的 Spark Core 的方式 ，并保持其它人 无法这样做.

如果使用手机应用程序来设置您的 Spark Core， 它应该会自动认领. 但是，如果您通过USB连接您的 Core, 或者认领过程不成功，您可以亲自认领.

首先，您需要您的core 标识号. 您可以通过打开串行与 core 连接，按下**i**关键做到这一点 (请但以上的‘通过 USB 连接’).
它应该告诉您一个类似的数字：

    #  core 标识号 例子
    55ff68064989495329092587

---

然后打开 [Spark Build](https://www.spark.io/build)并点击“core”图标. 点击上面写着' 添加一个 core“的该按钮， 并在文本框中输入您的 core 标识号.

我们将发布一个命令行工具来把这个过程简化. 敬请关注！

故障排除
===

您的 Spark Core 可能无法连接到您的网络有很多原因. 市面上有许多类型的Wi-Fi网络，而 Spark core 和 CC3000 不连接到所有的. 我们认为这是我们的一个重要目标. 以最轻松的方式， 尽可能连接到越多网络越好. 您的反馈意见是非常有价值的，这样我们就可以做得更好.

Spark Core 与传统家庭网络的效果最佳：设用 WPA/WPA2 或 WEP 安全模式（或安全）的简单网络, 和只有一台从有信誉的公司的路由器（苹果，美国网件，Linksys的，D-Link的，等等）加上没有任何花哨的设置. 您的网络越比正常的不同，遇到的问题有可能更多.

有已知的问题与网络的种类如下：

- **802.11n-only 网络**. Spark Core 是 802.11b/g. 大多的 802.11n 网络向后兼容与 802.11b/g, 但如果您的不是， Spark Core 将无法连接.
- **网络设有 ["强制网络门户"](http://en.wikipedia.org/wiki/Captive_portal) 安全模式**. 强制网络门户，就像在星巴克，是个小网站. 会请您登录到网络或签署协议. Spark Core 无法浏览这些门户.
- **企业网络**. 我们连接 Spark Core 到企业网络有不同的结果. 虽然我们还没有非常了解是什么造成这个问题, 但是我们正在努力改善.
- **复杂网络**. 网络具有多个路由器，非标准防火墙和非标准设置.
- **WEP安全模式的网路**. If connecting with the mobile app works for you, WEP-secured networks should be fine. However, you cannot currently connect to a WEP-secured network over USB. We are implementing a fix for this now, which should be available in the next couple of weeks.
- **渠道11以上**.这是在一个国际特定的问题; 如果您是在美国以外，您的 Wi-Fi 路由器可能会运行在渠道 12，13，或 14, 其中CC3000不支持. 请使用编号为 11 或更低的渠道。

所以，让我们开始深入了解. 如果您的 Spark Core 无法连接到 Wi-Fi 网络，我们推荐遵循以下步骤：

## 步骤 0: 检查基本

首先要检查的一些常简单的问题：

- 请检查您的Wi-Fi凭据（SSID和密码），以确保您正确键入了它们.
- 请确保您在您的 Wi-Fi 网络的范围. 如果您的手机或电脑在同一位置连接不良，请尝试移动到更靠近您的 Wi-Fi 接入点.
- 如果您使用的是 U.FL coere, 确保您有附加的天线. 并且，它是牢固连接的.
- 请确保您的 core 有足够的电力来传输 Wi-Fi的信号（300毫安）. 尝试使用不同的电源，或拔掉借鉴很多电的组成部分.

## 步骤 1: 通过 USB 安装您的 core

在某些网络中，智能配置不起作用，但 core 还是可以连接到网络. 我们已经实现了一个备份机制，这样您就可以通过 USB 安装您的 core. 有关说明，请参阅上面. 不要忘了，你需要亲自*认领*您的核心，如果您还没有！

## 步骤 2: 尝试用另一个网络

您的 Spark Core 可能无法连接到您的网络有很多原因; 有些是由于 Spare Core, 有些是由于您的移动设备发送的 Wi-Fi 认证，有些可能是由于网络. 如果您的 core 没有连接，请尝试另一个 Wi-Fi 网络.这将迅速帮助您找出问题.

## 步骤 3: 重新启动和清晰的记忆

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

有很多时候，电子产品关闭它们，然后将它们重新打开后，就开始表现正常. 尝试：

- 关闭您的移动应用程序，并重新打开它
- 拔开 Spark Core USB 然后把它插回
- 按住 MODE 按钮 10 秒钟清除 Spark Core 内存的 Wi-Fi 网络. 3秒钟后，指示灯应开始闪烁蓝色; 10秒后，它应该做一个快速的蓝色闪烁. 这意味着记忆已被清除.
- 恢复 Spark Core 的固件到出厂默认值状态. [此视频](https://community.spark.io/t/how-to-do-a-factory-reset/2579) 作说明.

## 步骤 4: 请检查您的路由器设置

有一百万个方式路由器的设置可能会导致问题，但这里有几件事情要注意的事项：

- **使用DHCP**. Although the Spark Core can handle static IP addresses, it's not configured for it out of the box, so you'll have to dig into the source code.
- **Turn off access control and firewalls**. Not permanently, but temporarily, to see if it resolves the issue. If it does, you can hopefully just tweak your settings to accommodate the Core rather than taking down your security. The only change you may need to make to your router is to open up outgoing port 5683, the default [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) port the Spark Core uses to connect to the Spark Cloud. If your core flashes cyan and occasionally flashes red, router issues are likely the culprit.

## STEP 5: Search the forums

It's possible that other folks have encountered the same issues that you have. The best way to check and learn from others is to search the forums; search for your particular symptoms or for your Wi-Fi router make and model to find relevant posts.

[Visit the forums >](https://community.sparkdevices.com)

## STEP 6: Post a report

We would love to hear about your issues, regardless of whether you were able to resolve them, so that we can improve our platform. If you haven't been able to resolve your issue, hopefully we or the community will be able to help.

Please post issues with connectivity either as responses to this topic or, if they are dissimilar from other reported issues, as their own topic. When you make a post, please include:

- Router make and model
- Network security (unsecured, WEP, WPA2, etc.)
- Environment (home, small office, enterprise, public network, etc.)
- Network topology (number of routers and/or range extenders, estimated number of devices connected to network)
- Internet Service Provider
- Any network settings that might diverge from the norm

Troubleshooting by color
===

The Spark Core has an RGB LED positioned on the front that displays the connectivity status of the Core. This LED can help you debug your Core and resolve any issues that you might encounter.

## Flashing blue

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

- *What’s the Core doing?* My Core is flashing blue.
- *What’s the problem?* Your Core doesn’t have Wi-Fi credentials to join your local network
- *How do I fix it?*
        
Right now, your Core does not have the information it needs to connect to your local Wi-Fi network.  If you haven’t already, try using the Spark Core app for [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) or [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)  to send your network credentials to your Core.  Detailed instructions can be found [here](http://docs.spark.io/#/connect/connecting-your-core-smart-config-with-the-ti-app).


If that doesn’t work, try the steps below:


1. If your network router supports 802.11n, make sure that it also supports Legacy network protocols, and that it is configured into that mode (the Core supports 802.11 a/c networks)
2. If you have a Core with a u.FL connector, make sure the antenna is attached
3. Try [rebooting the Core and clearing its memory](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
4. If you have an Android phone, and your network has no password, you cannot currently use the Spark Core app to communicate the credentials to your Core.  Instead, try using [TI’s SmartConfig app to configure your Core](/#/connect/connecting-your-core-smart-config-with-the-ti-app).
5. Try configuring your Core over USB.  Instructions can be found [here](/#/connect/connecting-your-core-connect-over-usb).
6. If all else fails, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model of your smartphone.

---


## Flashing green

- *What’s the Core doing?* My Core is [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), but doesn’t progress to flashing Cyan.
- *What’s the problem?* Your Core has received Wi-Fi credentials (an SSID and password), but still can't connect to the Wi-Fi network.
- *How do I fix it?*

Please complete the following steps:

1. [Check the basics](/#/connect/troubleshooting-step-0-check-the-basics).
2. Try a new power source. You should be powering your Core with a power supply that is capable of providing 500mA of current.  We recommend the 5V/1A wall wart power supplies that are commonly used for charging cell phones.
3. If your network has a landing page or splash page, the Core will not be able to connect; try configuring it onto a different network.
4. Try [rebooting the Core and clearing its memory](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
5. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
6. Try manually re-running the patch programmer to update the CC3000’s firmware over USB.  You can find detailed instructions [here](https://community.sparkdevices.com/t/failed-connecting-to-wifi/648/53).  
7. If none of the above are successful, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model number of your access point.

---

## Flashing yellow

- *What’s the Core doing?* My Core is starts flashing yellow when I plug it or when I hit the RST button.
- *What’s the problem?* Your Core is missing important firmware.
- *How do I fix it?*

Please complete the following steps:
  
1. Try hitting the RST button to make sure you did not accidentally configure your Core into DFU mode.
2. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
3. If a factory reset is unsuccessful, then we have to write the firmware over DFU.  You can accomplish this by following the steps below:

Install dfu-util for your system either using homebrew on a mac, http://dfu-util.gnumonks.org/ on windows, or you can build from source on linux:
        
    opkg install libusb-1.0-dev
    wget http://dfu-util.gnumonks.org/releases/dfu-util-0.7.tar.gz
    tar xvf dfu-util-0.7.tar.gz
    cd dfu-util-0.7
    ./configure
    make
    sudo make install

---

If you install those you should be able to run, with your core connected over USB:
        
    sudo dfu-util -l

---

This should give you a list with something like [1d50:607f] in the list, if that's the case, then we can install the missing firmware (can be found here: https://s3.amazonaws.com/spark-website/factory_firmware.bin)

    dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory_firmware.bin
    dfu-util -d 1d50:607f -a 0 -s 0x08005000:leave -D factory_firmware.bin

You can reboot your Core and it should start [slow flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N), or start [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_) if everything worked.

If none of these steps are successful, please [contact the Spark team](mailto:hello@sparkdevices.com).

---

## Flashing orange (red/yellow)

- *What’s the Core doing?* My Core is flashing yellow/red/orange lights after it connects to Wi-Fi.
- *What’s the problem?* A decryption error occurred during the handshake with the Spark Cloud
- *How do I fix it?*

Please complete the following steps:

1. A full set of instructions for resolving this issue can be found at the following location on the Spark Community forums.  If the steps included in the link below are unsuccessful, please [contact the Spark team](mailto:hello@sparkdevices.com).

[Replacing your Spark Cloud credentials >](https://community.sparkdevices.com/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627)

---

## Flashing green then red

- *What’s the Core doing?* My Core starts flashing green to connect to my network, then the LED turns red.
- *What’s the problem?* Your Core is facing a networking issue and cannot connect to the Cloud.
- *How do I fix it?*

There are two potential failure modes here--either your home network does not have a working internet connection, or we are having issues with our servers. 

1. Try power cycling your router to resolve any transient networking hiccups in your home Wi-Fi network
2. Try going to a website like [Google](http://www.google.com/) on your computer or laptop to verify that your Wi-Fi network is connected to the internet and is capable of serving up web pages
3. Check www.spark.io/status to see if there is a known issue with the Spark Cloud
4. If you’re still seeing this issue, please [contact the Spark team](mailto:hello@sparkdevices.com).

---

## Main LED off, small blue LED dim

- *What’s the Core doing?* The main LED on my Spark Core is off, but the small blue LED in the upper right corner is dimly glowing.
- *What’s the problem?* Your Core is missing firmware.
- *How do I fix it?*

1. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin after the factory reset is complete.
2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional.  If you have a JTAG shield, [contact the Spark team](mailto:hello@spark.io) so we can help walk you through re-installing the Core firmware.  If you do not have a JTAG shield, please [contact the Spark team](mailto:hello@spark.io) to let us know, and we’ll help you take next steps.

## LEDs off and unresponsive

- *What’s the Core doing?* My Core isn’t showing any LED activity when I power it over USB.
- *What’s the problem?* Your Core is not receiving power.
- *How do I fix it?*

Please complete the following steps:
  
1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example)
2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please [contact the Spark team](mailto:hello@spark.io) for further debugging.


APPENDIX
===

## DFU Mode (Device Firmware Upgrade)

If you are wish to program a Core with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via the dfu-utility.

Procedure:

Hold down both buttons, then release the RST button, while holding down the MODE button. Release the MODE button as soon as the LED starts flashing yellow. The Core now is in the DFU mode.


<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>


## Factory Reset

A factory reset restores the firmware on the Core to the default Tinker app and clears all your WiFi credentials. 

Procedure: 

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the MODE button until you see the Core change from flashing yellow to flashing white. Then release the button.  The Core should begin after the factory reset is complete.

**Note:** The video here is a continuation of the video from above (DFU Mode).

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>
