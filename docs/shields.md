Shield Shield
====
This shield is essentially an adapter that allows the user to connect Arduino compatible shields to the Spark Core. There are two functions that this shield performs: pin mapping of the Spark Core to the Arduino pin layout and voltage translation of 3.3V to/from 5V.  
[Here is a GitHub link to the hardware files.](https://github.com/spark/shields/tree/master/Shield%20Shield)

Operation
-----
We use Texas Instruments [TXB0108PWR](http://www.ti.com/lit/ds/symlink/txb0108.pdf) to do the voltage translation in between Spark Core's 3.3V logic level and Arduino's 5V logic.

Due to the limited number of pin to function combinations, we have only mapped three analog channels A0, A1 and A2. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and NOT 5.0V. Please remember not to exceed this voltage at anytime.

The shield has an onboard voltage regulator and can be powered from 7V to 15V DC. You could also power it via the USB plug on the Spark Core alone but the current would be limited to 500mA.

Shield Specifications
-----

- Operating voltage: 7 to 15V DC
- Current consumption: without the core plugged in 7mA at 9V DC and 150mA with the Core. 
- Dimensions: 3.79 x 2.1  
- Weight  

Setting up the shield
-----
  Pin layout  
  Pin Description/Functions  
  Compatibility - list of supported shields
( add more functions here)

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
0  - RX  -   
1  - TX  -   
2  - D2  -   
3  - D0  - PWM   
4  - D3  -   
5  - D1  - PWM    
6  - A7  - PWM    
7  - D4  -   
8  - D5  -   
9  - D6  -   
10 - A2  - SS    
11 - A5  - PWM/ MOSI    
12 - A4  - PWM/ MISO      
13 - A3  - SCK    
A0 - A0  - ADC (3.3V)  
A1 - A1  - ADC (3.3V)  
A2 - A6  - ADC (3.3V)  


Relay Shield
====
The Relay Shield, in combination with the Spark Core, allows you to control high power devices over the internet. Want to control a lamp, fan or garden sprinklers? Then this is a solution for you! 

[Here is a GitHub link to the hardware files.](https://github.com/spark/shields/tree/master/Relay%20Shield)


`` ADD AN IMAGE OF THE SHIELD HERE ``

Operation
-----
(I'm adding the description of the schematic here in case we decide to include it in the documentation.)  
The schematic for the relay shield is simple and self explanatory. The shield has four relays that are controlled by pins D0, D1, D2 and D3 on the Core. Each relay is triggered via a NPN transistor that takes a control signal from the core and switches the relay coil ON and OFF which in turn makes or breaks the electrical contact on the output. There is also a [flyback diode](http://en.wikipedia.org/wiki/Flyback_diode) connected across the coil to help protect the transistor from high voltage transients caused during switching.  
The relays are SPDT (Single Pole Double Throw) type, which means they have three terminals at the output: COMMON (COMM), Normally Open (NO) and Normally Closed (NC). We can either connect the load in between the COMM and NO or COMM and NC terminals. When connected in between COMM and NO, the output remains open/disconnected when the relay is turned OFF and closes/connects when the relay is turned ON. In the later case, the output remains closed/connected when the relay is OFF and opens/disconnets when the relay is ON. 

``ADD ILLUSTRATION HERE``

Specifications
-----
- Operating voltage: 7 to 15V DC
- Current consumption: 150mA min to 290mA (at 9V DC)
- Relay Max Voltage: 220V AC
- Relay Max Current: 10Amp at 125V AC
- Dimensions: 3.5 x 3.3
- Weight: 

Setting up the Relay Shield
-----
Turning ON a relay is as simple as setting the associated pin to HIGH.

`` ADD AN IMAGE OF THE TEST SETUP HERE ``

(the following example does not involve any Internet API calls)
``` C
#include "application.h"
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
}

void loop()
{
   //User application code example
}
```

Sample use cases
-----
`` ADD VECTOR DIAGRAM FOR THE SETUP/USE CASES ``

Project Ideas
-----
- Home Automation
- Sprinklers

**CAUTION** : High voltages! Please use extreme caution when working with high voltages.

``ADD ILLUSTRAION OF FINGERS GETTIND ZAPPED``


Programmer Shield (JTAG)
====
The programmer shield is a simple adapter that lets you connect a JTAG programmer to the Spark Core.  
[Here is a GitHub link to the hardware files.](https://github.com/spark/shields/tree/master/Programmer%20Shield)

`` ADD IMAGE OF THE SHIELD ``  

Specifications
-----
- Compatible JTAG programmers : STLink  
- Link to webshop?
- Dimensions: 2.2 x 1.55
- Weight

Setting up the programmer
-----
- Hardware setup
- Software setup under Windows/Mac/Linux

`` ADD IMAGE OF THE CORE CONECTED TO THE SHIELD ``


Battery Shield
====
The battery shield is a LiPo battery charger and voltage regulator combined into one. You can use it to power your core with any 3.7V LiPo battery and charge it at the same time via the USB port.
The shield is build around  Microchip's MCP73871 battery charge management controller and TI's TPS61200 boost converter for up converting 3.7V to 5.0V.

[Here is a GitHub link to the hardware files.](https://github.com/spark/shields/tree/master/Battery%20Shield)

`` ADD SYSTEM BLOCK DIAGRAM HERE`` 

Operation 
-----

MCP73871 is an intelligent battery charge management controller that allows one to charge the battery and power the system simultaneously. There is also an under voltage lock out which protects the battery from draining completely. The TPS61200 converts the 3.7V to 4.1V battery output to a regulated 5V to power the core or potentially any other hardware (cellphones?!)  
The charge current to the battery is set to 500mA.

Link to GitHub repo.  

Specifications
-----

- Works with any 3.7V Lithium Polymer battery.
- Simultaneously charge the battery and power the core
- Provide link to the datasheets MCP73871 and TPS61200
- Dimensions: 2.3 x 0.61
- Weight


Setting up the shield
-----
In order to just charge the battery, simply plug in the battery into the JST connector (*CAUTION: Remember to check the polarity of the battery header!!*) and a USB cable into the microB socket as shown in the picture.  

`` ADD PICTURE OF THE SETUP HERE ``

You will see the Blue power LED light up on the shield and either the RED (indicating charging in progress) or GREEN (indicating charging complete) LED light up.  
You could also power the Spark Core while the battery is charging but remember that the charging might be slower as the current will be distributed between the Core and the battery.  

`` ADD PICTURE OF SHIELD CONNECTED TO THE CORE ``  

Explain the power save mode and the jumper configuration on the TPS61200.

`` ADD PICTURE OF THE PS JUMPER ``

`` ADD PICTURE OF A PHONE BEING CHARGED ``

**CAUTION:** Check the battery polarity and its voltage rating  