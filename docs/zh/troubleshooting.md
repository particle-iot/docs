无法连接
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



Known Issues
===

## Flashing Cyan / WiFi Disconnect
* Status: In Progress
* Forum Thread: https://community.spark.io/t/bug-bounty-kill-the-cyan-flash-of-death/1322

With certain WiFi networks, the Spark Core will sometimes enter a state where the status LED will flash cyan. Flashing cyan means that the Spark Core can no longer communicate with the Spark Cloud server. If this happens, the Spark Core is programmed to try to reconnect. When the Core reconnects, the status LED will go back to 'Breathing Cyan'.

The Spark Core is equipped with a Texas Instruments (TI) CC3000 WiFi module to facilitate wireless networking. The CC3000 module has it's own closed-source firmware that was created by TI. Unfortunately, it was discovered that the firmware on the CC3000 module itself has an issue that can cause the module to stop responding. In this case, the Spark Core entered a permanent state of flashing cyan referred to as the 'Cyan Flash of Death' or CFOD. A reset was required to reconnect the Spark Core.

The good news is that the firmware on the CC3000 module can be updated and the Spark team has been working with TI in order to resolve the issue. Also, because of the great work by many community members and the Spark team, the Spark Core firmware has been modified to work around the issues with the CC3000. When the CC3000 fails, the Spark Core firmware will attempt to reset the CC3000 and reconnect to the Spark Cloud.

So far TI has supplied a couple of firmware patches to the Spark Team to test, but at this time, the issue doesn't seem to have been fully resolved. TI has been very helpful during this process and we're hopeful to have a fix soon. When the fix is ready and fully tested, we will provide instructions on how to update the CC3000 firmware.

## Stuck Flashing Blue
* Status: Trying to replicate
* Forum Thread: https://community.spark.io/t/status-led-flashing-blue/2915

## Inaccurate Analog Readings
* Status: Partially Resolved (Not yet available in the web IDE)
* Forum Thread: https://community.spark.io/t/odd-analog-readings/906
* Forum Thread: https://community.spark.io/t/odd-analog-readings-part-2/2718

## Serial1 UART Missing Received Data due to being polled
* Status: Resolved
* Forum Thread:

Serial UART Tx/Rx is now Interrupt Driven

## Long delays cause Core to drop off of the Cloud
* Status: Resolved
* Forum Thread: https://community.spark.io/t/known-issue-long-delays-or-blocking-code-kills-the-connection-to-the-cloud/950

Long delays now call the background tasks to keep the Cloud connected.

## Initializing peripherals in Class constructors causes the Core to hang
* Status: Resolved
* Forum Thread: https://community.spark.io/t/serial1-begin-in-class-constructor-hangs-core/3133

Constructors are called after the Core is initialized

## UDP and TCP ports close if not accessed
* Status: ???
* Forum Thread: https://community.spark.io/t/strange-udp-bug/2583/
* Comments: (From @Dave) - re-read that thread, apparently there was a fix for this I wasn't aware of?
