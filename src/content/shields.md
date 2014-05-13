---
title: Shields and kits
order: 6
---

Shield Shield
====
This shield is essentially an adapter that allows the user to connect Arduino compatible shields to the Spark Core. There are two functions that this shield performs: pin mapping of the Spark Core to the Arduino pin layout and voltage translation of 3.3V to/from 5V.

Operation
-----

![Shield Shield](images/sshield-top.jpg)

We use Texas Instruments [TXB0108PWR](http://www.ti.com/lit/ds/symlink/txb0108.pdf) to do the voltage translation in between Spark Core's 3.3V logic level and Arduino's 5V logic.

Due to the limited number of pin to function combinations, we have only mapped three analog channels `A0`, `A1` and `A2`. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and NOT 5.0V. **Please remember NOT to exceed this voltage at anytime.**

The shield has an onboard voltage regulator and can be powered from 7V to 15V DC. You could also power it via the USB plug on the Spark Core alone but the current would be limited to 500mA.

Specifications
-----

![Shield Shield Setup](images/sshield-setup.jpg)

- Operating voltage: 7 to 15V DC
- Current consumption: without the core plugged in 7mA at 9V DC and 150mA with the Core.
- Dimensions: 3.79" x 2.1"
- Weight: 40g

The pictures shows a robot shield interfaced with the Spark Core via the Shield Shield.

Pin mapping
-----
<table>
  <tr>
    <th>Arduino pin</th>
    <th>Spark Core pin</th>
    <th>Peripherals</th>
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

**IMPORTANT**: The Shield Shield does *not* map the Spark Core pins to like-numbered pins on the Arduino. In other words, D0 on the Spark Core is **not** the same as D0 on the Arduino. Please review the pin mapping table to the right and plan accordingly.

[Shield Shield Hardware files >](https://github.com/spark/shields/tree/master/Shield%20Shield)


Relay Shield
====

![Relay Shield Top](images/relay-shield-top.jpg)

The Relay Shield, in combination with the Spark Core, allows you to control high power devices over the internet. Want to control a lamp, fan or garden sprinklers? Then this is a solution for you!

Operation
-----

![Relay Shield Setup](images/relay-shield-setup.jpg)

The schematic for the relay shield is simple and self explanatory. The shield has four relays that are controlled by pins D0, D1, D2 and D3 on the Core. Each relay is triggered via a NPN transistor that takes a control signal from the core and switches the relay coil ON and OFF which in turn makes or breaks the electrical contact on the output. There is also a [flyback diode](http://en.wikipedia.org/wiki/Flyback_diode) connected across the coil to help protect the transistor from high voltage transients caused during switching.  
The relays are SPDT (Single Pole Double Throw) type, which means they have three terminals at the output: COMMON (COMM), Normally Open (NO) and Normally Closed (NC). We can either connect the load in between the COMM and NO or COMM and NC terminals. When connected in between COMM and NO, the output remains open/disconnected when the relay is turned OFF and closes/connects when the relay is turned ON. In the later case, the output remains closed/connected when the relay is OFF and opens/disconnets when the relay is ON.

Specifications
-----
- Operating voltage: 7 to 15V DC
- Current consumption: 150mA min to 290mA (at 9V DC)
- Relay Max Voltage: 220V AC
- Relay Max Current: 10Amp at 125V AC
- Dimensions: 3.5 x 3.3
- Weight: 100gms

Setting up the Relay Shield
-----

![Relay Shield Connection](images/relay-shield-bulb.jpg)

Turning ON a relay is as simple as setting the associated pin to HIGH.

The picture shows a sample setup where the relay is used as a switch to control a light bulb.

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

   //register the Spark function
   Spark.function("relay", relayControl);
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

An example API request to this function would look something like this:

```json
POST /v1/devices/{DEVICE_ID}/relay

# EXAMPLE REQUEST
curl https://api.spark.io/v1/devices/teapot/relay \
  -d access_token=1234123412341234123412341234123412341234 -d params=r1,HIGH
```

**USE EXTREME CAUTION WHEN DEALING WITH HIGH VOLTAGE !!**

[Relay Shield Hardware Files >](https://github.com/spark/shields/tree/master/Relay%20Shield)

<!-- TO DO
Project Ideas
------------
- Home Automation
- Sprinklers

**CAUTION** : High voltages! Please use extreme caution when working with high voltages.

``ADD ILLUSTRAION OF FINGERS GETTIND ZAPPED``
-->

Programmer Shield (JTAG)
====

![JTAG Shield Top](images/jtag-topview.jpg)

The programmer shield is a simple adapter that lets you connect a JTAG programmer to the Spark Core. If you need complete control over your Core and are comfortable with the ARM development environment, you will need this shield as an interface between the JTAG programmer and the Core.

Specifications
-----
- Compatible JTAG programmers : STLink  V2 (the only one tested)
- Dimensions: 2.2" x 1.55"
- Weight: 20g

Setting up the programmer
-----

![JTAG Setup](images/jtag-setup.jpg)

If you are using the STLink V2, you can download the supporting drivers and utilities from [their website.](http://www.st.com/web/catalog/tools/FM146/CL1984/SC724/SS1677/PF251168)

All of the hardware files for the JTAG shield are available for download.

[JTAG Shield Hardware Files >](https://github.com/spark/shields/tree/master/Programmer%20Shield)


Battery Shield
====

![Battery Shield Top](images/bshield-top.jpg)

The battery shield is a LiPo battery charger and voltage regulator combined into one. You can use it to power your Core with any 3.7V LiPo battery and charge it at the same time via the USB port.
The shield is built around  Microchip's MCP73871 battery charge management controller and TI's TPS61200 boost converter for up converting 3.7V to 5.0V.

![Battery Shield Bottom](images/bshield-bottom.jpg)


<!--TO DO ADD SYSTEM BLOCK DIAGRAM HERE -->

Operation
-----

MCP73871 is an intelligent battery charge management controller that allows one to charge the battery and power the system simultaneously. There is also an under voltage lock out which protects the battery from draining completely. The TPS61200 converts the 3.7V to 4.1V battery output to a regulated 5V to power the Core or potentially any other hardware (cellphones?!)  
The charge current to the battery is set to 500mA.

<!--Link to GitHub repo.-->  

Specifications
-----

- Works with any 3.7V Lithium Polymer battery.
- Simultaneously charge the battery and power the core
- Provide link to the datasheets MCP73871 and TPS61200
- Dimensions: 2.3 x 0.61
- Weight: 20gms


Setting up the shield
-----

![Battery Shield Charging](images/bshield-charging.jpg)

In order to just charge the battery, simply plug the battery into the JST connector (**CAUTION: Remember to check the polarity of the battery header!!**) and a USB cable into the microB socket as shown in the picture.  

You will see the BLUE power LED light up on the shield and either the RED (indicating charging in progress) or GREEN (indicating charging complete) LED light up.  

![Battery Shield Charging and Powering](images/bshield-charging-powering.jpg)

To summarize the LED functions:

- Blue LED: Power indicator for the USB cable. Lights up only when the USB cable is plugged in.
- Red LED: Charging in progress indicator. Is ON when the battery is charging. Turns OFF when charging complete.
- Green LED: Charge Complete Indicator. This LED lights up when the battery is completely charged.

You could also power the Spark Core while the battery is charging but remember that the charging might be slower as the current will be distributed in between the Core and the battery.  

![Battery Shield Powering](images/bshield-powering.jpg)

When powering the Core via the battery alone, the blue LED will NOT light up.

**TIP:** Remember to unplug the battery from the shield when not in use. If you leave the battery connected to the battery shield, it will eventually drain it.

<!--`` ADD PICTURE OF THE PS JUMPER ``-->

<!--` ADD PICTURE OF A PHONE BEING CHARGED ``-->

**CAUTION:** Check the battery polarity and its voltage rating  

[Battery Shield Hardware Files >](https://github.com/spark/shields/tree/master/Battery%20Shield)

# Spark Maker Kit

<!--
   TO DO
   - add short description
   - add pictures of all the components laid out and number them
-->

### 1. Ceramic Capacitors (10 each)

![Ceramic Capacitors](images/mk-ceramic-capacitor-10nF.bmp)

These are standard [ceramic capacitors.](http://en.wikipedia.org/wiki/Ceramic_capacitor) They are widely used in analog circuits as bypass/ decoupling capacitors, in timers, filters, etc. The kit comes with:

- 10nF (0.01uF) - Number code: 103
- 100nF (0.1uF) - Number coed: 104

*Note:* These are non-polar capacitors which means they can be oriented both ways.

<!-- TO Do Capacitor number codes -->

### 2. Electrolytic Capacitor 100uF (5)

![Electrolytic Capacitors](images/mk-electrolytic-capacitor.bmp)

[Electrolytic capacitors](http://en.wikipedia.org/wiki/Electrolytic_capacitor) offer larger values and are polar. These capacitors are ideal for decoupling power supplies, as transient suppressors, and in timing circuits.

*Note:* These are polar capacitors. The longer lead denotes positive while the shorter one denotes negative. These are also know to "pop" when subjected to voltages higher than their ratings.

<!-- TO DO ADD VOLTAGE VALUE-->

### 3. Headers

![Headers](images/mk-header-male.bmp)

These are standard 0.1" pitch headers that can be cut to size. Very handy when building circuits on breadboard or PCBs alike.

- 8-Pin Female Headers (5)
- 40-Pin Male Breakaway Headers (2)
- 40-Pin Male Breakaway Dual-Headers (1)

### 4. LEDs

![LEDs](images/mk-led-3mm.bmp)

These are general purpose 3mm LEDs. You can never have enough of them! Use a resistor in series when hooking them up to the Spark Core. ( 220 ohms to 1K ohms)

- Red (5)
- Green (5)

*Note:* The longer lead is positive (anode) while the shorter one is negative (cathode).

### 5. RGB LED (1)

![RGB LED](images/mk-rgb-led.bmp)

So, Red and Green aren't enough for you? Want to make bazzillion different colors? Then this RGB LED will do it for ya. You can mix colors by connecting each pin to an analogWrite compatible pin on the Core and feed them different values. Let the disco party begin!

This LED has four pins, one for each color and a common anode (+) pin.

[Datasheet >](datasheets/makerkit/rgb-led.pdf)

<!-- TO DO pin diagram-->

### 6. NPN Transistor (1)

![NPN Transistor](images/mk-npn-transistor.bmp)

S9013 is a general purpose small signal NPN [transistor](http://en.wikipedia.org/wiki/Transistor) rated at 40V, 500mA.

You can this transistor to switch small loads like relays, mini motors, buzzers, etc.

[Datasheet >](http://www.fairchildsemi.com/ds/SS/SS9013.pdf)

### 7. Diode (6)

![Diode](images/mk-diode.bmp)

[1N4004](http://en.wikipedia.org/wiki/1N4004) is a general purpose diode rated at 400V, 1000mA with a forward voltage drop of 1.1V. Excellent as a [fly-back diode](http://en.wikipedia.org/wiki/Flyback_diode) or as a general rectifying diode.

[Datasheet >](http://www.diodes.com/datasheets/ds28002.pdf)

### 8. Micro Servo (1)

![RC Servo](images/mk-micro-rc-servo.bmp)

Emax ES08A is a mini RC servo motor.

- Operating Voltage: 4.8 to 6.0VDC
- Stall Torque: 1.8Kg/cm
- Speed: 0.10sec/degree at no load

[Datasheet >](http://www.emaxmodel.com/views.asp?hw_id=6)


### 9. Deluxe Jumper Wire Pack (1)

![Jumper Cables](images/mk-jumper-cables.bmp)

Multi-colored and stripped. You can never have enough of these either.

### 10. USB Micro B Cable (1)
A custom Spark USB cable for you Core! We were really excited to have our logo printed on them.

### 11. Mini DC Motor (1)

![DC Motor](images/mk-mini-dc-motor.bmp)

This is a simple DC motor that you can switch using the NPN transistor provided in the kit.

[Datasheet >](datasheets/makerkit/mini-dc-motor.pdf)

<!-- TO DO
   - add motor specs
   - add illustration
 -->

### 12. Vibration Motor (1)

![Vibration Motor](images/mk-vibration-motor.bmp)

Wanna give your next Spark Core project a tactile feedback? This vibration motor serves the purpose nicely. Use the NPN transistor to switch it.

[Datasheet >](datasheets/makerkit/vibration-motor.pdf)

<!-- TO DO
   - add motor specs
   - add illustration
 -->

### 13. Piezo Buzzer (1)

![Buzzer](images/mk-buzzer.bmp)

Add an audible feedback to your project with this buzzer. The loner lead is positive and the shorter is negative. You will need a transistor to driver it.

*Note:* The sound gets annoying after a while. Use it sparingly!

- Operating Voltage: 4.0 to 7.0 V DC
- Oscillation Frequency: 2.3KHz
- Current: 30mA
- Sound Pressure: 85dB

[Datasheet >](datasheets/makerkit/buzzer.pdf)

### 14. Mini Pushbuttons (3)

![Push Buttons](images/mk-mini-pushbutton.bmp)

These are nifty little switches that plug nicely into a breadboard or a proto-board. They are normally-open type and are rated at 12V, 50mA.

### 15. DPDT Switch (2)

![DPDT Switch](images/mk-dpdt-switch.bmp)

This is a tiny Double Pole Double Throw (DPDT) Switch with 6 legs and is rated at

### 16. Shift Register IC (1)

![Shift Register](images/mk-shift-register.bmp)

74HC595 is an 8 bit serial-in parallel-out shift register commonly used as an output expander. You can drive of up to 8 outputs from only 3 lines (using one chip). You could potentially daisy chain multiple of these to get even more outputs.

[Datasheet >](http://www.nxp.com/documents/data_sheet/74HC_HCT595.pdf)

<!-- TO DO ADD EXAMPLES AND LINKS-->

### 17. Tilt Sensor (2)

![Tilt Sensor](images/mk-tilt-sensor.bmp)

SW-200D is a tiny tilt sensor that when tilted to more than 30 degrees will internally connects its two terminals together. The magic happens with the use of gravity and a tiny metal ball.

You can use to it detect tilt, orientation or vibrations.

[Datasheet >](datasheets/makerkit/tilt-sensor.pdf)

### 18. Temperature Sensor (1)

![Temp Sensor](images/mk-temp-sensor.bmp)

The TMP36 is a low voltage, precision centigrade temperature sensor. It provides a voltage output that is linearly proportional to the Celsius (centigrade) temperature. The TMP36 does not require any external calibration to provide typical accuracies of ±1°C at +25°C and ±2°C over the −40°C to +125°C temperature range.

[Here is an example](http://docs.spark.io/#/examples) of how you could use it the Core.

[Datasheet >](http://www.analog.com/static/imported-files/data_sheets/TMP35_36_37.pdf)

<!-- TO DO ADD LINK TO EXAMPLE-->

### 19. Thermistor (2)

![Thermistor](images/mk-thermistor.bmp)

A [thermistor](http://en.wikipedia.org/wiki/Thermistor) is a temperature dependent resistor. This one is a NTC type (Negative Temperature Coefficient), which means its resistance decreases with an increase in temperature.

Unlike the TMP36, you will need to use this as a part of a voltage divider circuit as nicely described in this [tutorial.](http://learn.adafruit.com/thermistor/using-a-thermistor)

[Datasheet >](datasheets/makerkit/thermistor.pdf)

### 20. Force-Sensitive Resistor (1)

![Force Sensor](images/mk-force-sensor.bmp)

Manufacturer Part Number: Interlink 30-81794
This is a force sensitive resistor with a 0.5" diameter and an operating force from 10gms to 1000gms. Their resistance decreases with an increase in applied pressure.

[Datasheet >]()

<!-- TO DO ADD LINK TO EXAMPLE-->

### 21. Photo Resistors (2)

![LDR](images/mk-ldr.bmp)

A photo resistor is a light dependent resistor whose resistance decreases with the increase in the intensity of light striking it. You can use it to detect the ambient light in the surrounding, detect shadows or use it as a part of a burglar alarm system.

[Datasheet >](datasheets/makerkit/photoresistor.pdf)
<!-- TO DO ADD LINK TO EXAMPLE-->

### 22. Resistors

![Resistors](images/mk-1k-resistor.bmp)

There are three different value resistor in this kit. All of them are rated at 5%, 1/4 Watt.

- 330-Ohm (10)
- 1K-Ohm (10)
- 10K-Ohm (10)

### 23. Rotary Potentiometer (1)

![Pot](images/mk-potentiometer.bmp)

This is a [variable resistor](http://en.wikipedia.org/wiki/Potentiometer) whose value can be changed by simply turning the knob.

### 24. Proto-board (1)

![PCB](images/mk-pcb.bmp)

This is a 7" x 9" general purpose dot-matrix prototyping PCB.
<!-- TO DO ADD LINK TO EXAMPLE-->


### 25. Spark Core - u.FL or CA (1)
Your very own Spark Core, ready to take over the world, one byte at a time.

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

# Spark RC Car Kit

![Top View](images/rc-car-top-small.jpg)

The RC car kit is a two-wheeled differentially driven platform that you can control using a Spark Core.

### Kit Contents

- RC Car Chassis kit
- Spark Shield Shield
- Motor Driver Shield
- Spark Core

Assemble the RC Car chassis as shown in the [tutorial here.](http://www.dfrobot.com/wiki/index.php/3PA_Assembly_Guide_%28SKU:ROB0005%29) (Without the electronics)


<!--
Put together the Shield Shield and the Motor Driver Shield as shown in the picture.
The Motor Driver shield is setup in the PWM mode as shown in the picture.
-->

<!-- TO DO - Add picture of the motor shield setup -->

- Pin 4: Connects with M1
- Pin 5: Connects with E1 (PWM)
- Pin 6: Connects with E2 (PWM)
- Pin 7: Connects with M2

Where E1 and E2 control the speed of the motors, while M1 and M2 change the direction.

![Jumper Settings](images/rc-car-jumpers-small.jpg)

Connect the left and right motor terminals to M2+,M2-,M1+ and M1- respectively.

![Motor Connections](images/rc-car-motor-conn-small.jpg)

The motors can run from a voltage in the range of 5V to 9V DC. The jumpers can be set to get power from Vin from the Shield below.

![Power Selection](images/rc-car-power-small.jpg)

### Example code

A simple example for controlling the RC Car is as described:


```C++
int leftMotorEnable   = D1;
int rightMotorEnable  = A7;
int leftMotorDir    = D3;
int rightMotorDir   = D4;

void setup()
{
  //Register Spark function
  Spark.function("rccar", rcCarControl);

  pinMode(leftMotorDir, OUTPUT);
  pinMode(leftMotorEnable, OUTPUT);
  pinMode(rightMotorDir, OUTPUT);
  pinMode(rightMotorEnable, OUTPUT);

  pinMode(D7,OUTPUT);
}

void loop()
{
  // Nothing to do here
}

/*******************************************************************************
 * Function Name  : rcCarControl
 * Description    : Parses the incoming API commands and sets the motor control
          pins accordingly
 * Input          : RC Car commands
          e.g.: rc,FORWARD
            rc,BACK
 * Output         : Motor signals
 * Return         : 1 on success and -1 on fail
 *******************************************************************************/
int rcCarControl(String command)
{
  if(command.substring(3,7) == "STOP")
  {
    digitalWrite(leftMotorEnable,LOW);
    digitalWrite(rightMotorEnable,LOW);

    digitalWrite(leftMotorDir,LOW);
    digitalWrite(rightMotorDir,LOW);

    return 1;
  }

  if(command.substring(3,7) == "BACK")
  {
    digitalWrite(leftMotorDir,LOW);
    digitalWrite(rightMotorDir,HIGH);

    digitalWrite(leftMotorEnable,HIGH);
    digitalWrite(rightMotorEnable,HIGH);

    return 1;
  }

  if(command.substring(3,10) == "FORWARD")
  {
    digitalWrite(leftMotorDir,HIGH);
    digitalWrite(rightMotorDir,LOW);

    digitalWrite(leftMotorEnable,HIGH);
    digitalWrite(rightMotorEnable,HIGH);

    return 1;
  }

  if(command.substring(3,8) == "RIGHT")
  {
    digitalWrite(leftMotorDir,HIGH);
    digitalWrite(rightMotorDir,HIGH);

    digitalWrite(leftMotorEnable,HIGH);
    digitalWrite(rightMotorEnable,HIGH);

    return 1;
  }

  if(command.substring(3,7) == "LEFT")
  {
    digitalWrite(leftMotorDir,LOW);
    digitalWrite(rightMotorDir,LOW);

    digitalWrite(leftMotorEnable,HIGH);
    digitalWrite(rightMotorEnable,HIGH);

    return 1;
  }

  // If none of the commands were executed, return false
  return -1;
}
```

---

To send API commands:

```json
# Sending command to go forward
curl https://api.spark.io/v1/devices/1234/rccar -d access_token=1234 -d params=rc,FORWARD
```

### Motor Driver Shield Specifications
The motor driver shield is based around the L298 [Full-bridge](http://en.wikipedia.org/wiki/H_bridge) motor driver chip.

- Logic voltage: 5V DC
- Logic Supply Current: 36mA
- Motor drive voltage: 7V to 12V DC
- Motor drive current: 2Amp Max

<!--
Plug in the Spark Core.

Now plug in the battery.

Example user code.

Project ideas.
-->

### Datasheets

- [L298 datasheet >](http://www.st.com/st-web-ui/static/active/en/resource/technical/document/datasheet/CD00000240.pdf)
- [Motor Driver Shield Manual >](http://www.dfrobot.com/wiki/index.php?title=Arduino_Motor_Shield_%28L298N%29_%28SKU:DRI0009%29)
