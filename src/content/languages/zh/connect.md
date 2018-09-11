连接您的 Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

连接 Spark Core 到 Wi-Fi 的最简单方法是使用为 iPhone 或 Android 手机应用程序. 但如果这行不通，或者您没有 iOS/ Android 手机，我们还有还有其它方法.

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

## 德州仪器(TI) 手机应用程序智能配置

Texas Instruments(德州仪器) CC3000手机应用程序的智能配置过程与以上过程类似, 但您不需要用Spark帐户. TI 也提供 Java applet,可以从 Mac，Windows 或 Linux 电脑使用.

按照德州仪器(TI)的网站上的说明：

CC3000 Smart Config @ Texas Instruments

唯一的不同的是，您需要通过可选的AES密钥并输入`sparkdevices2013`.

*注意: 德州仪器（TI) 的手机应用程序不在 Google Play 上; 您必须从它们的网站下载它apk,自己安装在手机上.*

## 通过 USB 连接

您也可以通过 USB 串行通信连接 Spark Core 接到您的Wi-Fi网络.  *注意: 这只有当 Spark Core 在聆听模式才能使用 (i.e. LED 在蓝色闪烁)*.

首先，您需要下载一个串行终端应用程序.

 __Windows__ 用户, 我们推荐 [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/).
您还需要安装 Windows 驱动程序：

[Spark Core Windows 驱动程序 >](https://s3.amazonaws.com/spark-website/Particle.zip)

[CoolTerm](http://freeware.the-meiers.org/) 提供一个很好的图形用户界面（GUI）.
![CoolTerm 设置](/assets/images/coolterm-settings.png)
![CoolTerm 安装](/assets/images/coolterm-setup.png)

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

通过 USB 手动认取 core  最简单的方法是使用[Spark 命令行界面](https://github.com/particle-iot/spark-cli). 一旦您安装了这个，您可以简单的输入'setup'的设置，并按照说明进行操作.

另外，如果您在安装命令行工具时遇到问题，您可以通过串行得到 core 的 标识号.
 
您可以通过打开串行与 core 连接，按下**i**关键做到这一点 (请但以上的‘通过 USB 连接’). 它应该告诉您一个类似的数字：

    #  core 标识号 例子
    55ff68064989495329092587

---

然后打开 [Spark Build](https://www.spark.io/build)并点击“core”图标. 点击上面写着' 添加一个 core“的该按钮， 并在文本框中输入您的 core 标识号.





附录
===

## DFU 模式 (设备固件升级)

一如果您想通过 USB 把自定固件下载到 core, 您将需要使用此模式. 这个模式触发板上的 bootloader, 通过 DFU 下载二进制固件文件.

程序:

按住两个按键，然后松开 RST 键，同时还按住 MODE 按钮.一旦 LED 开始闪烁黄色，松开 MODE 按钮. Core 现在在 DFU 模式.

<iframe class="vine-embed" src="https://vine.co/v/MahhI1Fg7O6/embed/simple" width="320" height="320" frameborder="0"></iframe>


## 恢复出厂设置

出厂重置恢复的核心固件默认的 tinker 应用程序，并清除所有的 WiFi 凭证.

程序: 

该程序和以上（DFU模式）所描述的相同. 但在这情况下您应该继续按住 MODE 键直到您看到 LED 从黄色闪烁变化到闪烁白色, 然后松开按钮. core 重新开始后，恢复出厂设置就完成了

**注意：**这里的视频是从上面（DFU模式）的视频延续的.

<iframe class="vine-embed" src="https://vine.co/v/MahOmIaX2xP/embed/simple" width="320" height="320" frameborder="0"></iframe>
