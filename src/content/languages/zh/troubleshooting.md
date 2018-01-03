无法连接
===

您的 Spark Core 可能无法连接到您的网络有很多原因. 市面上有许多类型的Wi-Fi网络，而 Spark core 和 CC3000 不连接到所有的. 我们认为这是我们的一个重要目标. 以最轻松的方式， 尽可能连接到越多网络越好. 您的反馈意见是非常有价值的，这样我们就可以做得更好.

Spark Core 与传统家庭网络的效果最佳：设用 WPA/WPA2 或 WEP 安全模式（或安全）的简单网络, 和只有一台从有信誉的公司的路由器（苹果，美国网件，Linksys的，D-Link的，等等）加上没有任何花哨的设置. 您的网络越比正常的不同，遇到的问题有可能更多.

有已知的问题与网络的种类如下：

- **802.11n-only 网络**. Spark Core 是 802.11b/g. 大多的 802.11n 网络向后兼容与 802.11b/g, 但如果您的不是， Spark Core 将无法连接.
- **网络设有 ["强制网络门户"](http://en.wikipedia.org/wiki/Captive_portal) 安全模式**. 强制网络门户，就像在星巴克，是个小网站. 会请您登录到网络或签署协议. Spark Core 无法浏览这些门户.
- **企业网络**. 我们连接 Spark Core 到企业网络有不同的结果. 虽然我们还没有非常了解是什么造成这个问题, 但是我们正在努力改善.
- **复杂网络**. 网络具有多个路由器，非标准防火墙和非标准设置.
- **WEP安全模式的网路**. 如果与手机应用程序的连接效果很好，WEP 的安全网络应该没问题. 但是，您目前无法通过 USB 连接到 WEP 保护的网络. 我们现在正在实施这个修复程序，应该可以在接下来的几个星期看到.
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

## 步骤 3: 重新启动和删除记忆

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

有很多时候，电子产品关闭它们，然后将它们重新打开后，就开始表现正常. 尝试：

- 关闭您的移动应用程序，并重新打开它
- 拔开 Spark Core USB 然后把它插回
- 按住 `{{system-button}}` 按钮 10 秒钟清除 Spark Core 内存的 Wi-Fi 网络. 3秒钟后，指示灯应开始闪烁蓝色; 10秒后，它应该做一个快速的蓝色闪烁. 这意味着记忆已被清除.
- 恢复 Spark Core 的固件到出厂默认值状态. [此视频](https://community.particle.io/t/how-to-do-a-factory-reset/2579) 作说明.

## 步骤 4: 请检查您的路由器设置

有一百万个方式路由器的设置可能会导致问题，但这里有几件事情要注意的事项：

- **使用DHCP**. 尽管 Spark Core 可以处理静态 IP 地址, 它不是默认配置. 所以您必须要深入到源代码.
- **关闭访问控制和防火墙**.  不是永久的，而是暂时的，看它是否解决问题. 如果是这样，您可以尝试调整您的设置，以适 core，而不是降低您的安全模式.  您可能需要对您的路由器唯一的变化是开辟出 [COAP] 默认的 5683 端口， [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) 端口是用于连接到 Spark 云. 如果您的核心闪烁青色和偶尔闪烁红色，路由器的问题很可能是罪魁祸首.

## 步骤 5: 搜索论坛

这有可能是其他人都遇到过的同样的问题. 检查和向他人学习的最好方法是搜索论坛; 搜索您的特定症状或为您的 Wi-Fi 路由器的品牌和型号来找到相关的帖子.

[请到论坛 >](https://community.sparkdevices.com)

## 步骤 6: 发布一份报告

我们很想听到您的问题，不管你是否能够解决这些问题，让我们可以学习改善我们的平台. 如果您还没有能够解决您的问题， 希望我们或社区将能够帮助.

请张贴回应相同的话题，或者，如果您的连接问题和其他不同，打开一个新的论坛帖子. 当你打开一个新的论坛帖子，请包括：

- 路由器的品牌和型号 
- 网络安全（无抵押，WEP，WPA2等） 
- 环境（家庭，小型办公室，企业，公共网络等） 
- 网络拓扑（多个路由器和/或范围扩展器，连接到网络的设备的估计数目） 
- 互联网服务提供商 
- 任何可能偏离正常的网络设置

按颜色疑难解答
===

Spark Core 有一个 RGB LED 定位在的前部,显示 core 的连接状态.此指示灯可以帮助您调试 core 和解决可能遇到的任何问题.

## 蓝色闪烁

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

- *Core 在做什么?* 我的核心是闪烁的蓝色？ 
- *问题是什么?* 您的 core 不具备Wi-Fi认证,无法加入您的本地网络
- *我如何修复它?*
        
现在，您的 core 没有它需要连接到您的本地 Wi-Fi 网络的信息. 如果您还没有，请尝试使用 Spark Core [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) 或 [Android](https://play.google.com/store/apps/details?id=io.spark.core.android) 应用程序发送您的网络凭据到您的 core. 详细的说明可以看 [这里](http://docs.particle.io/#/connect/connecting-your-core-smart-config-with-the-ti-app).


如果还是不行，请尝试以下步骤:


1. 如果您的网络路由器支持 802.11n 标准，确保它也支持传统的网络协议，并且它被配置成这种模式（core 支持 802.11 的 A/C 网）
2. 如果你有一个 U.FL 连接器的 core，确保天线已连接.
3. 尝试 [重新启动 core 和清除它的内存](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
4. 尝试通过 USB 配置 core. 步骤可以在这里找到 [here](/#/connect/connecting-your-core-connect-over-usb).
5. 如果一切都失败，请 [联系 Spark Team]（邮寄地址：hello@sparkdevices.com)并且向我们提供您的智能手机的品牌和型号.

---


## 绿色闪烁

- *Core 在做什么?* Core 正在 [绿色闪烁](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), 但不会进展到闪烁青色.
- *问题是什么?* 您的 core 已收到 Wi-Fi 的认证（SSID 和密码），但仍无法连接到Wi-Fi网络.
- *我如何修复它?*

请完成以下步骤：

1. [检查基本](/#/connect/troubleshooting-step-0-check-the-basics).
2. 尝试新的点源适配器. 您所用的电源应能够提 core，为 500mA 的电流. 我们建议使用通常用于手机充电的 5V/1A 电源适配器.
3. 如果您的网络有一个登陆页面，核心将无法进行连接;尝试将其配置到不同的网络.
4. 尝试 [重新启动 core 和清除它的内存](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
5. 尝试恢复出厂设置.按住两个按键，然后只松开RST键. LED应开始闪烁黄色.  继续按住 `{{system-button}}` 键直到您看到闪烁的黄色变化成闪烁的白色, 然后松开按钮. Core 恢复出厂设置完成后应该开始 [闪烁蓝色](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N)
6. 尝试通过 USB 运行,重新补丁程序员,更新 CC3000 的固件. 您可以在 [这里](https://community.sparkdevices.com/t/failed-connecting-to-wifi/648/53) 找到详细的说明.
7. 如果以上都不成功，请 [联系 Spark Team]（邮寄地址：hello@sparkdevices.com），并为我们提供路由器的品牌和型号.

---

## 黄色闪烁

- *Core 在做什么?* 当我开启电源，或当我按 RST 按, core 便开始闪烁黄色.
- *问题是什么?* 您的 core 缺少重要的固件.
- *我如何修复它?*

请完成以下步骤：
  
1. 尝试打 RST 键，以确保您没不小心设定您的核心进入 DFU 模式.
2. 尝试恢复出厂设置.按住两个按键，然后只松开RST键. LED应开始闪烁黄色.  继续按住 `{{system-button}}` 键直到您看到闪烁的黄色变化成闪烁的白色, 然后松开按钮. Core 后恢复出厂设置完成后应该开始 [闪烁蓝色](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N)
3. 如果恢复出厂设置不成功，那么我们就通过 DFU 更新固件. 您可以按照以下的步骤做：

Mac 使用自制软件， Windows 需要到 http://dfu-util.gnumonks.org 下载，或者您也可以从源代码在Linux上构建，安装 DFU-util：

    opkg install libusb-1.0-dev
    wget http://dfu-util.gnumonks.org/releases/dfu-util-0.7.tar.gz
    tar xvf dfu-util-0.7.tar.gz
    cd dfu-util-0.7
    ./configure
    make
    sudo make install

---

如果您安装了这些，您应该通过 USB 与您的 core 连接：        

    sudo dfu-util -l

---

这应该给您一个列表. 列表中应有 [1d50：607F]，如果是这样的话， 那么我们就可以安装缺少的固件（可以在这里找到：https://s3.amazonaws.com/spark-website/factory_firmware.bin）

    dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory_firmware.bin
    dfu-util -d 1d50:607f -a 0 -s 0x08005000:leave -D factory_firmware.bin

你可以重新启动您的 core. 如果一切顺利，它应该开始 [慢速闪烁蓝色](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N), 或开始 [绿色闪烁](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_)

如果以上都不成功，请[联系 Spark Team]（邮寄地址：hello@sparkdevices.com).

---

## 橙色闪烁（红色/黄色）

- *Core 在做什么?* 我的 core 接到 Wi-Fi 后，开始闪烁黄色/红色/橙色
- *问题是什么?* 与 Spark 云握手期间发生错误解密
- *我如何修复它?*

请完成以下步骤：

1.全套解决这个问题的指示可以在以下的星火社区论坛位置找到. 如果都不成功，请[联系 Spark Team]（邮寄地址：hello@sparkdevices.com）

[更换你的 Spark 云凭据 >](https://community.sparkdevices.com/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627)

---

## 绿色闪烁接着红色

- *Core 在做什么?* 我的核心开始闪烁绿色并连接到我的网络，然后 LED 变成红色.
- *问题是什么?* 您的 core 正面临着一个网络问题，无法连接到 Spark 云.
- *我如何修复它?*

有两种潜在的失效模式存在 - 你的家庭网络没有一个可用的互联网连接，或者我们的服务器出现问题. 

1. 请尝试重新启动路由器来解决任何 Wi-Fi 网络短暂的网络问题.
2. 尝试使用电脑到一个网站 [谷歌](http://www.google.com/) 以验证您的Wi-Fi网络连接到互联网，并能服务于 web 页面.
3. 查看 www.spark.io/status，看看是否有一个已知的 Spark 云问题
4. 如果您还在看这个问题, 请[联系 Spark Team]（邮寄地址：hello@sparkdevices.com).

---

## 主要 LED 没亮起，小蓝色 LED 暗淡

- *Core 在做什么?* Spark Core 的主要 LED 没亮起，但右上角的小蓝色 LED 发光暗淡.
- *问题是什么?* 您的 core 缺失的固件.
- *我如何修复它?*

1. 尝试恢复出厂设置.按住两个按键，然后只松开RST键. LED应开始闪烁黄色.  继续按住 `{{system-button}}` 键直到您看到闪烁的黄色变化成闪烁的白色, 然后松开按钮. Core 恢复出厂设置完成后应该开始.
2. 如果您在恢复出厂设置后没有看到闪灯，那么您的 core 可能暂时不起作用.  如果你有一个 JTAG shield, [联系 Spark Team ](邮寄地址：hello@spark.io)这样我们就可以帮您完成重新安装内核固件.  如果你没有一个 JTAG shield, 请 [联系 Spark Team ](邮寄地址：hello@spark.io) 让我们知道，我们会帮助您采取下一步措施.

## LED 灯关闭，反应迟钝

- *Core 在做什么?* 当我通过 USB 供电, core 没有显示任何 LED 的活动.
- *问题是什么?* 你的核心没有接通电源.
- *我如何修复它?*

请完成以下步骤:
  
1. 试着使用不同的 USB 电缆和电源为 core 供电（例如,您的电脑上不同的 USB 端口）
2. 如果使用不同的USB电缆和电源不解决这个问题，你的 core 硬件可能出现问题， 请 [联系 Spark Team ](邮寄地址：hello@spark.io) 为进一步调试.



Known Issues
===

## Flashing Cyan
* Status: **Solution in progress, available in 1-2 weeks**
* Forum Thread: https://community.particle.io/t/bug-bounty-kill-the-cyan-flash-of-death/1322

#### Description

With certain WiFi networks, the Spark Core will sometimes enter a state where the status LED will flash cyan. Flashing cyan means that the Spark Core can no longer communicate with the Spark Cloud server. If this happens, the Spark Core is programmed to try to reconnect. When the Core reconnects, the status LED will go back to 'Breathing Cyan'.

The Spark Core is equipped with a Texas Instruments (TI) CC3000 WiFi module to facilitate wireless networking. The CC3000 module has it's own closed-source firmware that was created by TI. Unfortunately, it was discovered that the firmware on the CC3000 module itself has an issue that can cause the module to stop responding. In this case, the Spark Core entered a permanent state of flashing cyan referred to as the 'Cyan Flash of Death' or CFOD. A reset was required to reconnect the Spark Core.

The good news is that the firmware on the CC3000 module can be updated and the Spark team has been working with TI in order to resolve the issue. Also, because of the great work by many community members and the Spark team, the Spark Core firmware has been modified to work around the issues with the CC3000. When the CC3000 fails, the Spark Core firmware will attempt to reset the CC3000 and reconnect to the Spark Cloud.

So far TI has supplied a couple of firmware patches to the Spark Team to test, but at this time, the issue doesn't seem to have been fully resolved. TI has been very helpful during this process and we're hopeful to have a fix soon. When the fix is ready and fully tested, we will provide instructions on how to update the CC3000 firmware.

## Particle.publish() breaks inside of Particle.function()
* Status: **Acknowledged**
* Forum Thread: https://community.particle.io/t/spark-publish-crashing-core/3463

#### Description

If `Particle.publish()` is called within a function declared in `Particle.function()`, the Core may become unresponsive for a short period of time and return a 408 timed out error in the cloud API call.

A fix can be applied in the user code that will work around this issue.  A simple explanation can be found in [post #10 of the forum thread](https://community.particle.io/t/spark-publish-crashing-core/3463/10).

Recently Resolved Issues
===

## Flashing Blue
* Status: **Resolved as of v0.2.0**
* Github Issue: https://github.com/particle-iot/core-firmware/issues/144
* Forum Thread: https://community.particle.io/t/status-led-flashing-blue/2915

#### Description

In some cases after attempting to connect to a Wi-Fi network and failing repeatedly, the Core will step back into listening mode, and will stop attempting to connect to the internet.

This issue has been resolved, and the fix was pushed with firmware v0.2.0 on March 25.

## Inaccurate analog readings
* Status: **Resolved as of v0.2.0**
* Forum Thread: https://community.particle.io/t/odd-analog-readings/906
* Forum Thread: https://community.particle.io/t/odd-analog-readings-part-2/2718

#### Description

Timing issues were causing analog readings to return incorrectly; this has now been fixed with [this commit](https://github.com/particle-iot/core-firmware/commit/b7ce24a4fb2dfe4f90e597e3a0f568f9ae098cfe).

This issue has been resolved, and the fix was pushed with firmware v0.2.0 on March 25.

## Serial1 UART missing data
* Status: **Resolved**

#### Description

Previously, Serial UART was polling, and data could be dropped if the user code did not check frequently enough. Serial UART is now interrupt driven, so this is no longer an issue.

## Long delays break connectivity
* Status: **Resolved**
* Forum Thread: https://community.particle.io/t/known-issue-long-delays-or-blocking-code-kills-the-connection-to-the-cloud/950

#### Description

Long delays can keep messages from being sent to the Cloud, which can cause the connection with the Cloud to abruptly die.

We recently released an update to process Cloud messages during long delays, making this issue significantly less of a problem. It is still possible to block the connection to the Cloud with a long series of very short delays, but longer delays will no longer cause issues.

## Can't init. peripherals in constructors
* Status: **Resolved**
* Forum Thread: https://community.particle.io/t/serial1-begin-in-class-constructor-hangs-core/3133

#### Description

Constructors are now called after the Core is initialized.
