Shield Shield
====
This shield is essentially an adapter that allows the user to connect Arduino compatible shields to the Spark Core. There are two functions that this shield performs: pin mapping of the Spark Core to the Arduino pin layout and voltage translation of 3.3V to/from 5V.

Operation
-----
We use Texas Instruments [TXB0108PWR](http://www.ti.com/lit/ds/symlink/txb0108.pdf) to do the voltage translation in between Spark Core's 3.3V logic level and Arduino's 5V logic.

Due to the limited number of pin to function combinations, we have only mapped three analog channels A0, A1 and A2. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and NOT 5.0V. **Please remember NOT to exceed this voltage at anytime.**

The shield has an onboard voltage regulator and can be powered from 7V to 15V DC. You could also power it via the USB plug on the Spark Core alone but the current would be limited to 500mA.

![Shield Shield](images/sshield-top.jpg)

Specifications
-----

- Operating voltage: 7 to 15V DC
- Current consumption: without the core plugged in 7mA at 9V DC and 150mA with the Core. 
- Dimensions: 3.79 x 2.1  
- Weight: 40gms

<!-- TODO - Weight   -->

![Shield Shield Setup](images/sshield-setup.jpg)

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

[Shield Shield Hardware files >](https://github.com/spark/shields/tree/master/Shield%20Shield)


Relay Shield
====
The Relay Shield, in combination with the Spark Core, allows you to control high power devices over the internet. Want to control a lamp, fan or garden sprinklers? Then this is a solution for you! 

![Relay Shield Top](images/relay-shield-top.jpg)

Operation
-----

The schematic for the relay shield is simple and self explanatory. The shield has four relays that are controlled by pins D0, D1, D2 and D3 on the Core. Each relay is triggered via a NPN transistor that takes a control signal from the core and switches the relay coil ON and OFF which in turn makes or breaks the electrical contact on the output. There is also a [flyback diode](http://en.wikipedia.org/wiki/Flyback_diode) connected across the coil to help protect the transistor from high voltage transients caused during switching.  
The relays are SPDT (Single Pole Double Throw) type, which means they have three terminals at the output: COMMON (COMM), Normally Open (NO) and Normally Closed (NC). We can either connect the load in between the COMM and NO or COMM and NC terminals. When connected in between COMM and NO, the output remains open/disconnected when the relay is turned OFF and closes/connects when the relay is turned ON. In the later case, the output remains closed/connected when the relay is OFF and opens/disconnets when the relay is ON. 

![Relay Shield Setup](images/relay-shield-setup.jpg)

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
Turning ON a relay is as simple as setting the associated pin to HIGH.

![Relay Shield Connection](images/relay-shield-bulb.jpg)

The picture shows a sample setup where the relay is used as a switch to control a light bulb.

```C++
#include "application.h"
int RELAY1 = D0;
int RELAY2 = D1;
int RELAY3 = D2;
int RELAY4 = D3;

int relayControl(String command);

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
  digitalWrite(relayNumber, relayState);
  return 1;
}

```

An example API request to this function would look something like this:

```json
POST /v1/devices/{DEVICE_ID}/relay

# EXAMPLE REQUEST
curl https://api.spark.io/v1/devices/teapot/relay \
  -d access_token=1234123412341234123412341234123412341234 -d params=r1,HIGH
```

**USE EXTREME CAUTION WHEN DEALING WITH HIGH VOLATGE !!**

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
The programmer shield is a simple adapter that lets you connect a JTAG programmer to the Spark Core. If you need complete control over your Core and are comfortable with the ARM development environment, you will need this shield as an interface between the JTAG programmer and the Core.

![JTAG Shield Top](images/jtag-topview.jpg)

Specifications
-----
- Compatible JTAG programmers : STLink  V2 (the only one tested)
- Dimensions: 2.2 x 1.55
- Weight: 20gms

Setting up the programmer
-----

If you are using the STLink V2, you can download the supporting drivers and utilities from [their website.](http://www.st.com/web/catalog/tools/FM146/CL1984/SC724/SS1677/PF251168)

![JTAG Setup](images/jtag-setup.jpg)

All of the hardware files for the JTAG shield are available for download. 

[JTAG Shield Hardware Files >](https://github.com/spark/shields/tree/master/Programmer%20Shield)


Battery Shield
====
The battery shield is a LiPo battery charger and voltage regulator combined into one. You can use it to power your Core with any 3.7V LiPo battery and charge it at the same time via the USB port.
The shield is built around  Microchip's MCP73871 battery charge management controller and TI's TPS61200 boost converter for up converting 3.7V to 5.0V.

![Battery Shield Top](images/bshield-top.jpg)

&nbsp;

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
In order to just charge the battery, simply plug the battery into the JST connector (**CAUTION: Remember to check the polarity of the battery header!!**) and a USB cable into the microB socket as shown in the picture.  

![Battery Shield Charging](images/bshield-charging.jpg)

You will see the BLUE power LED light up on the shield and either the RED (indicating charging in progress) or GREEN (indicating charging complete) LED light up.  

To summarize the LED functions:

- Blue LED: Power indicator for the USB cable. Lights up only when the USB cable is plugged in.
- Red LED: Charging in progress indicator. Is ON when the battery is charging. Turns OFF when charging complete.
- Green LED: Charge Complete Indicator. This LED lights up when the battery is completely charged.

You could also power the Spark Core while the battery is charging but remember that the charging might be slower as the current will be distributed in between the Core and the battery.  

![Battery Shield Charging and Powering](images/bshield-charging-powering.jpg)

&nbsp;

![Battery Shield Powering](images/bshield-powering.jpg)

When powering the Core via the battery alone, the blue LED will NOT light up. 

**TIP:** Remember to unplug the battery from the shield when not in use. If you leave the battery connected to the battery shield, it will eventually drain it.

<!--`` ADD PICTURE OF THE PS JUMPER ``-->

<!--` ADD PICTURE OF A PHONE BEING CHARGED ``-->

**CAUTION:** Check the battery polarity and its voltage rating  

[Battery Shield Hardware Files >](https://github.com/spark/shields/tree/master/Battery%20Shield)
