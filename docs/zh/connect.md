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
您还需要安装Windows驱动程序：

[Spark Core Windows 驱动程序 >](https://s3.amazonaws.com/spark-website/Spark.zip)

[CoolTerm](http://freeware.the-meiers.org/) 提供一个很好的图形用户界面（GUI）.
![CoolTerm 设置](images/coolterm-settings.png)
![CoolTerm 安装](images/coolterm-setup.png)

 __Mac__ 用户, 请使用 CoolTerm 或 screen work.

 __Linux__ 命令行用法, [GNU Screen](https://www.gnu.org/software/screen/) 很棒.
(在OS X上，在命令行调用可能看起来像 `screen /dev/cu.usbmodem1411 9600`.
在Ubuntu上，它看起来像 `screen /dev/ttyACM0 9600`. 设备位置可能会有所不同，如果你不能马上找到它，请看 `/dev`目录.）

__操作方法__

将您的 Spark Core通过USB连接到您的电脑. 当 Spark Core 是在聆听模式，通过USB使用打开一个串行端口,标准设置应该是：

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

    #  Core 标识号 例子
    55ff68064989495329092587

---

Then open up [Spark Build](https://www.spark.io/build) and click the 'Cores' icon. Click the button that says 'Add a Core', and enter your ID in the text box.

我们将发布一个命令行工具来把这个过程简化. 敬请关注！

故障排除
===

There are many reasons that your Spark Core might not be able to connect to your network. There are many types of Wi-Fi networks, and the Spark Core and the CC3000 do not support all of them. We consider it an important goal of ours to connect easily and painlessly to as many networks as possible, and your feedback is extremely valuable so that we can get better.

The Spark Core works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured),  with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Spark Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the Spark Core will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The Spark Core can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the Spark Core to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Networks with WEP security**. If connecting with the mobile app works for you, WEP-secured networks should be fine. However, you cannot currently connect to a WEP-secured network over USB. We are implementing a fix for this now, which should be available in the next couple of weeks.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.

So, let's dig in. If your Spark Core is not connecting to your Wi-Fi network, we recommend following these steps:

## STEP 0: Check the basics

There are a few common issues to check first:

- Check your Wi-Fi credentials (SSID and password) to make sure you typed them correctly.
- Make sure you're in range of your Wi-Fi network. If your phone or computer has a poor connection in the same location, try moving closer to your Wi-Fi access point.
- If you're using a u.FL Core, make sure you have an antenna attached, and that it's firmly connected.
- Make sure your Core has enough power to transmit Wi-Fi signals (300mA in bursts). Try a different power source, or unplug components that draw a lot of power.

## STEP 1: Set up your Core over USB

On some networks, Smart Config does not work, but the Core can connect to the network just fine. We've implemented a back-up mechanism so you can set up your Core over USB. For instructions, see above. Don't forget that you'll need to claim your Core manually as well if you haven't already!

## STEP 2: Try another network

There are many reasons that your Core might not connect; some of them have to do with the Spark Core; some have to do with your mobile device sending the Wi-Fi credentials; some have to do with the network. If your Core doesn't connect, try another Wi-Fi network. This will quickly help you figure out which type of issue you might be seeing.

## STEP 3: Reboot and clear memory

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

So often, electronics start behaving after you shut them off and turn them back on. Try:

- Closing your mobile app and re-opening it
- Un-plugging the Spark Core and plugging it back in
- Clear the Spark Core's memory of Wi-Fi networks by holding the MODE button for 10 seconds. After 3 seconds, the light should start flashing blue; after 10 seconds, it should do a quick burst of blue flashes. That means the memory has been cleared.
- Restoring the Spark Core's firmware to the factory default.  Getting this right can be tricky, see [this video](https://community.spark.io/t/how-to-do-a-factory-reset/2579) for illustration.

## STEP 4: Check your router settings

There are a million ways router settings could cause problems, but here's a few things to look out for:

- **Use DHCP**. Although the Spark Core can handle static IP addresses, it's not configured for it out of the box, so you'll have to dig into the source code.
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
