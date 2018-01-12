屏蔽 屏蔽
====
This shield is essentially an adapter that allows the user to connect Arduino compatible shields to the Spark Core. There are two functions that this shield performs: pin mapping of the Spark Core to the Arduino pin layout and voltage translation of 3.3V to/from 5V.

此屏蔽本质上是一个适配器，它允许用户将 Arduino 的兼容屏蔽连接到 Spark Core. 这个屏蔽会执行两个功能：Spark Core 到 Arduino 引脚连接和 3.3V 至/从 5V 的电压转换.

操作
-----

![屏蔽 屏蔽](/assets/images/sshield-top.jpg)

我们采用德州仪器 [TXB0108PWR]（http://www.ti.com/lit/ds/symlink/txb0108.pdf）做电压转换. 从 Spark Core 的3.3V 逻辑 到 Arduino 的 5V 逻辑.

由于引脚功能组合的数量有限，我们只连接了三个模拟通道 `A0`，`A1` 和 `A2`. 不像其他的 IO 引脚，模拟引脚的额定电压为 3.3V 而不是 5.0V. *请记住不要超过这个电压在任何时候。

屏蔽有一个板载电压调节器,可供从 7V 到 15V 直流电. 您还可以通过 USB  插头单独使用 Spark Core 的电，但是它的电流将被限制到 500 毫安.

产品规格
-----

![屏蔽 屏蔽 设置](/assets/images/sshield-setup.jpg)

- 工作电压：7-15V DC 
- 电流消耗：不插 Spark Core 时是 7毫安 在 9V DC 和插上 Core 时是 150 毫安.
- 尺寸：3.79“ x 2.1”
- 重量：40g

这些照片显示了一个机器人通过 `屏蔽 屏蔽` 接口与星火核心。

引脚连接表
-----
<table>
  <tr>
    <th>Arduino 引脚</th>
    <th>Spark Core 引脚</th>
    <th>外设</th>
  </tr>
  <tr>
    <td>0</td>
    <td>RX</td>
    <td></td>
  </tr>
  <tr>
    <td>1</td>
    <td>TX</td>
    <td></td>
  </tr>
  <tr>
    <td>2</td>
    <td>D2</td>
    <td></td>
  </tr>
  <tr>
    <td>3</td>
    <td>D0</td>
    <td>PWM (analogWrite)</td>
  </tr>
  <tr>
    <td>4</td>
    <td>D3</td>
    <td></td>
  </tr>
  <tr>
    <td>5</td>
    <td>D1</td>
    <td>PWM (analogWrite)</td>
  </tr>
  <tr>
    <td>6</td>
    <td>A7</td>
    <td>PWM (analogWrite)</td>
  </tr>
  <tr>
    <td>7</td>
    <td>D4</td>
    <td></td>
  </tr>
  <tr>
    <td>8</td>
    <td>D5</td>
    <td></td>
  </tr>
  <tr>
    <td>9</td>
    <td>D6</td>
    <td></td>
  </tr>
  <tr>
    <td>10</td>
    <td>A2</td>
    <td>SS</td>
  </tr>
  <tr>
    <td>11</td>
    <td>A5</td>
    <td>PWM (analogWrite) / MOSI</td>
  </tr>
  <tr>
    <td>12</td>
    <td>A4</td>
    <td>PWM (analogWrite) / MISO</td>
  </tr>
  <tr>
    <td>13</td>
    <td>A3</td>
    <td>SCK</td>
  </tr>
  <tr>
    <td>A0</td>
    <td>A0</td>
    <td>analogRead (ADC, 3.3V)</td>
  </tr>
  <tr>
    <td>A1</td>
    <td>A1</td>
    <td>analogRead (ADC, 3.3V)</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>A6</td>
    <td>analogRead (ADC, 3.3V)</td>
  </tr>
</table>

**重要**：`屏蔽 屏蔽` 并 *不* 连接 Spark Core 引脚到 Arduino 的相同编号的引脚。换句话说，Spark Core 的 D0 和 Arduino 的 D0 是 **不** 一样的. 请检查引脚连接表做计划.

[屏蔽 屏蔽 硬件文件 >](https://github.com/particle-iot/shields/tree/master/Shield%20Shield)


继电器 屏蔽
====

![继电器 屏蔽 顶部](/assets/images/relay-shield-top.jpg)

继电器 屏蔽，与 Spark Core 组合，让您在互联网上控制高功率器件. 要控制一盏灯，风扇或花园洒水器？那么这是给您的一个解决方案！

操作
-----

![继电器 屏蔽 设置](/assets/images/relay-shield-setup.jpg)

该继电器 屏蔽示意图是简单和自我解释的. 继电器 屏蔽具有四个继电器, 通过 Spark Core 的 D0，D1， D2 控制. 每个继电器经由 NPN 晶体管，需要一个从 Core 的控制信号来开关继电器线圈，接通和断开电接触. 还有一个 [续流二极管] (http://en.wikipedia.org/wiki/Flyback_diode) 跨接在线圈, 以帮助保护晶体管于瞬变切换过程中造成的高电压. 该继电器是 SPDT（单刀双掷）型，这意味着它有三个端子的输出：常见 (通讯)，常开(NO)和常闭(NC).  我们既可以连接负载在 COMM 和 NO 或 COMM 和 NC 端子之间. 在后一种情况下，该继电器 OFF 时， 输出保持闭合/当继, ，并在继电器 ON 时,打开/断开.

产品规格
-----
- 工作电压：7-15V DC 
- 电流电流：最低至 150 毫安到 290 毫安（9V 直流） 
- 继电器最大电压：250V AC 
- 继电器最大电流：10 安培在 125V AC 
- 继电器型号：JS1-5V-F[（数据表）]（http://pewa.panasonic.com/assets/pcsd/catalog/js-catalog.pdf） 
- 尺寸：3.5×3.3 [INCHES?!]
- 重量：100g


设置继电器 屏蔽
-----

![继电器 屏蔽 连接](/assets/images/relay-shield-bulb.jpg)

接通继电器很简单，只要相关的引脚设置为高。 

图像示出了继电器被用作一个开关来控制一个灯泡的样品设置。

```cpp
int RELAY1 = D0;
int RELAY2 = D1;
int RELAY3 = D2;
int RELAY4 = D3;

void setup()
{
   //Initilize the relay control pins as output
   pinMode(RELAY1, OUTPUT);
   pinMode(RELAY2, OUTPUT);
   pinMode(RELAY3, OUTPUT);
   pinMode(RELAY4, OUTPUT);
   // Initialize all relays to an OFF state
   digitalWrite(RELAY1, LOW);
   digitalWrite(RELAY2, LOW);
   digitalWrite(RELAY3, LOW);
   digitalWrite(RELAY4, LOW);

   //register the Particle function
   Particle.function("relay", relayControl);
}

void loop()
{
   // This loops for ever
}

// command format r1,HIGH
int relayControl(String command)
{
  int relayState = 0;
  // parse the relay number
  int relayNumber = command.charAt(1) - '0';
  // do a sanity check
  if (relayNumber < 1 || relayNumber > 4) return -1;

  // find out the state of the relay
  if (command.substring(3,7) == "HIGH") relayState = 1;
  else if (command.substring(3,6) == "LOW") relayState = 0;
  else return -1;

  // write to the appropriate relay
  digitalWrite(relayNumber-1, relayState);
  return 1;
}

```

---

一个 API 请求这个函数的示例看起来像这样：
```json
POST /v1/devices/{DEVICE_ID}/relay

# 请求示例
curl https://api.spark.io/v1/devices/0123456789abcdef01234567/relay \
  -d access_token=1234123412341234123412341234123412341234 -d params=r1,HIGH
```

**请格外小心当处理高电压！**

[继电器 屏蔽 硬件文件 >](https://github.com/particle-iot/shields/tree/master/Relay%20Shield)

<!-- TO DO
Project Ideas
------------
- Home Automation
- Sprinklers

**CAUTION** : High voltages! Please use extreme caution when working with high voltages.

``ADD ILLUSTRAION OF FINGERS GETTIND ZAPPED``
-->

程序 屏蔽 (JTAG)
====

![JTAG 屏蔽 顶部](/assets/images/jtag-topview.jpg)

JTAG 屏蔽是一个简单的适配器, 可以让您把一个 JTAG 编程器连接到 Spark Core. 如果您需要完全控制您的 core 和适应 ARM 的开发环境，您需要这面屏蔽作为 JTAG 编程器和 core 之间的接口.

产品规格
-----
- 兼容的 JTAG 编程器：STLink V2（唯一测试的） 
- 尺寸：2.2" x 1.55"
- 重量：20g 

设立编程器
-----

![JTAG 设置](/assets/images/jtag-setup.jpg)

如果您使用的是 STLink V2，则可以从[它们的网站.]（HTTP :// www.st.com/web/catalog/tools/FM146/CL1984/SC724/SS1677/PF251168）下载支持的驱动程序和实用程序.

所有的 JTAG 屏蔽文件的硬件可供下载.

[JTAG 屏蔽 硬件盾文件 >](https://github.com/particle-iot/shields/tree/master/Programmer%20Shield)


电池 屏蔽
====

![电池 屏蔽 顶部](/assets/images/bshield-top.jpg)

电池屏蔽是锂电池充电器和电压调节器结合为一体. 您可以用它来通过 3.7V 锂电池使用您的 core ，并在同一时间，通过 USB 端口充电池.

屏蔽是围绕 Microchip 的 MCP73871 电池负载管理控制器 和德州仪器的 TPS61200 升压转换器，用于将 3.7V 电压升到 5.0V。

![电池 屏蔽 底部](/assets/images/bshield-bottom.jpg)


<!--TO DO ADD SYSTEM BLOCK DIAGRAM HERE -->

操作 
-----

MCP73871 是，允许一个同时装入电池和电源系统的智能电池充电管理控制器. 有一个欠压上锁的功能， 保护电池不让它完全耗尽. 该 TPS61200 将 3.7V 至 4.1V 的电池转换为稳定的5V, 供电给 core 或任何其它潜在的硬件. (手机!） 

电池的充电电流被设定在 500mA.

[Battery 屏蔽 硬件盾文件 >](https://github.com/particle-iot/shields/tree/master/Battery%20Shield)

产品规格
-----

- 与任何 3.7V 的锂聚合物电池
- 同时充电电池和提供电源到 core 
- 提供链接到数据表 MCP73871 和 	TPS61200 *************************************************************************
- 尺寸：2.3×0.61 
- 重量：20g


设立屏蔽
-----

![电池 屏蔽 充电](/assets/images/bshield-charging.jpg)

如果要为电池从点，只需将电池插入 JST 连接器（*注意：记住要检查电池头的极性!!**）和 USB 连接线插入 microB 插座，如图片所显示的.

你会看到屏蔽上，蓝色的电源指示灯亮起，黄色（指示指示正在充电）或绿色（表示指示充电完成），LED 也亮起来.

![电池 屏蔽 池充电和供电](/assets/images/bshield-charging-powering.jpg)

总结 LED 的功能：

- 蓝色 LED：USB 电缆电源的指示灯. 只有当USB电缆插上才亮起来.
- 黄色 LED：进度指示灯. 当电池正在充电时会亮起. 充电已满时便关闭. 
- 绿色 LED: 充电完毕指示灯. 当电池完全充电时，此灯会亮起.

您可能当电池正在充电时也同时启动 core, 但充电的速度将会放慢. 因为电流将分布在 core 和电池之间.

![Battery Shield Powering](/assets/images/bshield-powering.jpg)

当通过电池单独供电到 core，蓝色 LED 指示灯会不亮.

**提示:** 请记住，电池在不使用时请从屏蔽拔下. 如果你把电池留在屏蔽上，它最终将被耗尽.

<!--`` ADD PICTURE OF THE PS JUMPER ``-->

<!--` ADD PICTURE OF A PHONE BEING CHARGED ``-->

**注意:** 检查电池极性和电压等级

[Battery 屏蔽 硬件盾文件 >](https://github.com/particle-iot/shields/tree/master/Battery%20Shield)

# Spark Maker Kit

<!-- 
   TO DO 
   - add short description
   - add pictures of all the components laid out and number them 
-->

### 1. 陶瓷电容器 (10 each)

![陶瓷电容器](/assets/images/mk-ceramic-capacitor-10nF.jpg)

���些都是标准 [陶瓷电容器.](http://en.wikipedia.org/wiki/Ceramic_capacitor)， 它们被广泛应用于模拟电路旁路/去耦电容���在计时器，过滤器等。该工具包随附：

- 10nF (0.01uF) - 验证码: 103
- 100nF (0.1uF) - 验证码: 104

*注:* 这些都是非极性电容,可以面向两种方式。

<!-- TO Do Capacitor number codes -->

### 2. 电解电容器 100uF (5)

![电解电容器](/assets/images/mk-electrolytic-capacitor.jpg)

[电解电容器](http://en.wikipedia.org/wiki/Electrolytic_capacitor) 提供更多的容量选择，是极性的. 这些电容是去耦电源供应器最好的选择，或用在瞬态抑制器，以及定时电路.	

*注意:* 这些是极性电容. 长的脚表示正，而较短的表示为负. 受到比等级更高的电压时将会 "爆炸”.

<!-- TO DO ADD VOLTAGE VALUE-->

### 3. 排针（或简称标头）

![排针](/assets/images/mk-header-male.jpg)

这些尺寸标准 0.1“ 间距的排针可以切割成您所需要的大小. 在面包板或 PCB 上建立电路时使用，会非常好用的.

- 8针 母排针（5） 
- 40针公排针（2） 
- 40针双头排针（1）

### 4. LED 灯

![LED 灯](/assets/images/mk-led-3mm.jpg)

这些都是通用的 3 毫米 LED. 使用一个 220 欧姆到 1K 欧姆的电阻，串联起来连接到 core.

- 红（5） 
- 绿（5）

*注意：*较长的引叫是正极 (阳极), 而较短的是负极 (阴极).

### 5. RGB LED 灯 (1)

![RGB LED 灯](/assets/images/mk-rgb-led.jpg)

红色和绿色的 LED 还是不够刺激？想要制造千白种不同的颜色？那么这个 RGB LED 将做到这一点！ 您可以通过每个引脚连接到 core 的  analogWrite 兼容的引脚, 用不同的值混合颜色. 让迪斯科派对开始吧！

此LED具有四个引脚，每个颜色与一个共同的阳极（+）引脚.

[数据表 >](datasheets/makerkit/rgb-led.pdf)

<!-- TO DO pin diagram-->

### 6. NPN 晶体管 (1) 

![NPN 晶体管](/assets/images/mk-npn-transistor.jpg)

S9013 是一个通用的小信号 NPN [晶体管]（http://en.wikipedia.org/wiki/Transistor）额定 40V，500mA 的电流.

[数据表 >](https://www.fairchildsemi.com/datasheets/SS/SS9013.pdf)

### 7. 二极管 (6)

![二极管](/assets/images/mk-diode.jpg)

[1N4004](http://en.wikipedia.org/wiki/1N4004) 是一种通用二极管,额定电压为 400V，千毫安与 1.1V 的正向压降. 优良的[回扫二极管]（http://en.wikipedia.org/wiki/Flyback_diode），或作为一般整流二极管.

[数据表 >](http://www.diodes.com/datasheets/ds28002.pdf)

### 8. 微型伺服 (1) 

![RC 伺服](/assets/images/mk-micro-rc-servo.jpg)

Emax ES08A 是个 迷你 RC 伺服电机.

- 工作电压：4.8~6.0VDC 
- 失速转矩：1.8Kg/cm 
- 速度：0.10sec/degree 在无负载状态

[数据表 >](http://www.emaxmodel.com/views.asp?hw_id=6)


### 9.豪华 跳线 包 (1)

![跳线](/assets/images/mk-jumper-cables.jpg)

多色和已剥离.

### 10. USB 微型 B 连接线 (1)

自定义 Spark USB 数据线给您的 core！我们真的很高兴能有我们的标志印在上面！

### 11. 微型直流电机 (1)

![微型直流电机](/assets/images/mk-mini-dc-motor.jpg)

这是一个简单的直流电机，您可以使用套件中提供的 NPN 晶体管开关.

[数据表 >](datasheets/makerkit/mini-dc-motor.pdf)

<!-- TO DO 
   - add motor specs
   - add illustration
 -->

### 12. 振动电机 (1)

![振动电机](/assets/images/mk-vibration-motor.jpg)

想给您的下一个 Spark Core 项目触觉反馈？这种振动电机是最适合不过的！使用 NPN 晶体管切换它.

[数据表 >](datasheets/makerkit/vibration-motor.pdf)

<!-- TO DO 
   - add motor specs
   - add illustration
 -->

### 13.压电式蜂鸣器(1)

![压电式蜂鸣器](/assets/images/mk-buzzer.jpg)

用这个蜂鸣器，添加声音反馈到您的项目. 较长的引脚是正极和较短的是负的. 您将需要一个晶体管来驱动它.

*注意：*了一段时间后声音很烦人. 应谨慎使用！

- 工作电压：4.0~7.0 V DC 
- 振荡频率：2.3KHZ 
- 电流：30mA 
- 声压：85分贝

[数据表 >](datasheets/makerkit/buzzer.pdf)

### 14. 迷你按键 (3) 

![迷你按键](/assets/images/mk-mini-pushbutton.jpg)

这些都是漂亮的小开关. 能很好的插到实验电路板或一个原板。他们是常开式和额定电压为 12V，50mA电流.

### 15. 双刀双掷开关 (2)

![双刀双掷开关](/assets/images/mk-dpdt-switch.jpg)

这是一个很小的双刀双掷（DPDT）开关，具有6腿和额定功率为: <!-- To add in rating -->

### 16. 移位寄存器 IC (1)

![移位寄存器](/assets/images/mk-shift-register.jpg)

74HC595 是 8 位串行输入常用为输出扩展并行输出的移位寄存器. 可以从只有 3 条线（使用 1 芯片) 驱动高达 8 个输出. 您可能把它连锁数倍，以获得更多的输出.

<!-- TO DO ADD EXAMPLES AND LINKS-->

### 17. 倾角传感器 (2)

![倾角传感器](/assets/images/mk-tilt-sensor.jpg)

SW-200D 是一个微小的倾斜传感器，当倾斜到30度以上将其两个在内部的端子连接在一起. 利用重力和一个小金属球制造这个神奇!

你可以用它来​​检测倾斜，方向或振动.

[数据表 >](datasheets/makerkit/tilt-sensor.pdf)

### 18. 温度传感器 (1)

![温度传感器](/assets/images/mk-temp-sensor.jpg)

该 TMP36 是一个低电压，精密摄氏温度传感器, 它提供的电压输出是线性正比于摄氏（℃）温度. 该 TMP36 不需要任何外部校准，以提供超过 ±1°C 典型精度在 +25°C 和 ±2°C 在 40°C 至 +125°C 的温度范围.

[下面是一个例子](http://docs.particle.io/#/examples) of how you could use it the Core.

[数据表 >](http://www.analog.com/static/imported-files/data_sheets/TMP35_36_37.pdf)

<!-- TO DO ADD LINK TO EXAMPLE-->

### 19. 热敏电阻 (2)

![热敏电阻](/assets/images/mk-thermistor.jpg)

一个 [热敏电阻]（http://en.wikipedia.org/wiki/Thermistor） 是随温度变化的电阻. 这个是 NTC 型 （负温度系数）， 表示与温度的上升其电阻值降低. 
 

不像 TMP36，您将需要使用在了分压器电路的一部分. 这是很好的描述[教程]（https://learn.adafruit.com/thermistor/using-a-thermistor）

[数据表 >](datasheets/makerkit/thermistor.pdf)

### 20. 力敏电阻 (1)

![力敏电阻](/assets/images/mk-force-sensor.jpg)

制造商零件编号：互联30-81794 
这是一个力敏感电阻与一个 0.5“ 直径和从 10g 到 1000g 的操作力. 与增加施加的压力及其电阻减小.

[数据表 >]()

<!-- TO DO ADD LINK TO EXAMPLE-->

### 21. 光敏电阻 (2)

![LDR](/assets/images/mk-ldr.jpg)

一种光电阻器是一种光相关电阻器，照射到它的光,的强度增加,其电阻的值降低. 您可以用它来检测周围的环境光， 检测出阴影或使用它作为一个防盗报警系统的一部分.

[数据表 >](datasheets/makerkit/photoresistor.pdf)
<!-- TO DO ADD LINK TO EXAMPLE-->

### 22. 电阻器

![电阻器](/assets/images/mk-1k-resistor.jpg)

在这一套件三种不同的电阻值。所有这些额定为5％，1/4瓦。

- 330-欧姆 (10)
- 1K-欧姆 (10)
- 10K-欧姆 (10)

### 23. 旋转电位器 (1) 

![旋转电位器](/assets/images/mk-potentiometer.jpg)

这是一个[可变电阻]（http://en.wikipedia.org/wiki/Potentiometer），其值可以通过简单地旋转旋钮来改变.

### 24. 原板 (1)

![原型板](/assets/images/mk-pcb.jpg)

这是一个 7" × 9" 通用点阵式原型板.
<!-- TO DO ADD LINK TO EXAMPLE-->


### 25. Spark Core - u.FL 或 CA (1)

您自己的 Spark Core, 准备接管世界，一次一个字节.

<!--
1. Ceramic Capacitor - 10nF (10)
2. Ceramic Capacitors 100nF (10)
3. Electrolytic Capacitors 100uF (5)
4. 8-Pin Female Headers (5)
5. 40-Pin Male Breakaway Headers (2)
6. 40-Pin Male Breakaway Dual-Headers (1) 
7. Basic LED - Red (5)
8. Basic LED - Green (5)
9. RGB LEDs (1)
10. NPN Transistor (1) 
11. Diode (6)
12. Micro Servo (1) 
13. Deluxe Jumper Wire Pack (1)
14. USB Micro B Cable (1)
15. Mini DC Motor (1)
16. Vibration Motor (1)
17. Piezo Buzzer (1)
18. Mini Pushbuttons (3) 
19. Shift Register IC (1)
20. DPDT Switch (2)
21. Tilt Sensor (2)
22. Temperature Sensor (1)
24. Proto-board (1)
25. Force-Sensitive Resistor (1)
26. Photo Resistors (2)
27. Thermistor (2)
28. Resistor 330-Ohm (10)
29. Resistor 1K-Ohm (10)
30. Resistor 10K-Ohm (10)
31. 10K Rotary Potentiometer (1) 
32. Spark Core - u.FL or CA (1)
-->
