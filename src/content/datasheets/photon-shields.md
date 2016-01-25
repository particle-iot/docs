---
title: Photon shields and kits
template: datasheet.hbs
columns: two
order: 6
---

# Shields and accessories

## Shield Shield

Sometimes life can be a little difficult in the land of electronics when two systems talk a different voltage language. How do you make them talk to each other without making one of them _burn out_? The Shield Shield is the answer. This shield performs all the necessary voltage translation and provides an Arduino-compatible footprint to make it easier for you to plug in your existing Arduino shields or talk to other 5V hardware.

![Shield Shield](/assets/images/shields/shield-shield/shield-shield.png)

### Shield Shield - Operation

We use Texas Instruments TXB0108PWR to do the voltage translation in between the Particle's device's 3.3V to a 5V logic. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and **NOT** 5.0V. Please remember NOT to exceed this voltage at anytime. The shield has an on-board voltage regulator and can be powered from 7V to 15V DC source. You could also power it via the USB plug on the Particle device alone but the current would be limited to 500mA.

### Shield Shield Schematic - TXB0108PWR

![Shield Shield TXB0108PWR](/assets/images/shields/shield-shield/txb0108pwr-schematic.png)

The new version of the Shield Shield (v3.x.x) uses dedicated mosfet based voltage translation on the I2C lines. We also decided to add a prototyping area in empty space in the middle of the shield.

### Shield Shield Schematic - MOSFET I2C

![Shield Shield I2C](/assets/images/shields/shield-shield/mosfet-i2c-schematic.png)

![Shield Shield Description](/assets/images/shields/shield-shield/shield-shield-description.png)

**Note:** One drawback of using the TXB0108PWR as a voltage translator is that it is only capable of driving loads at short distances. Long length wires will introduce excessive capacitive loading and cause the auto direction detection to fail. To overcome this drawback, the shield shield also has an optional on-board 74ABT125 buffer that is capable of driving heavier loads in *one* direction. A user can jumper wire to whichever IO pin they would like to be translated to 5V.

### Shield Shield - Pin Mapping

![Shield Shield Pinmapping](/assets/images/shields/shield-shield/shield-shield-pinmapping.png)

|Shield  | Photon | Peripherals             |
|--------|--------|-------------------------|
|0       | RX     |     Serial1 RX,PWM      |
|1       | TX     |     Serial1 TX,PWM      |
|2       | A2     |     SPI1_SS             |
|3       | WKP    |     PWM,ADC             |
|4       | D6     |                         |
|5       | D0     |     SDA,PWM             |
|6       | D1     |     SCL,PWM,CAN_TX      |
|7       | D7     |                         |
|8       | A5     |     SPI1_MOSI,PWM       |
|9       | A4     |     SPI1_MISO,PWM       |
|10      | D5     |     SPI3_SS             |
|11      | D2     |     SPI3_MOSI,PWM,CAN_RX|
|12      | D3     |     SPI3_MISO,PWM       |
|13      | D4     |     SPI3_SCK            |
|A0      | A0     |     ADC**               |
|A1      | A1     |     ADC**               |
|A2      | DAC1   |     DAC,ADC**           |
|A3      | DAC2   |     SPI1_SCL,DAC,ADC**  |
|A4      | D0     |     SDA,PWM*            |
|A5      | D1     |     SCL,PWM*,CAN_TX     |

\* Note: These pins can also function as 3.3V PWM outputs or 3.3V Servo outputs.  
\*\* Note: ADC inputs are 3.3V max.

**IMPORTANT:** The Shield Shield does not map the Particle device's pins to like-numbered pins on the Arduino. In other words, D0 on the Particle device is not the same as D0 on the Arduino. Please review the pin mapping table to the right and plan accordingly.

### Shield Shield - Specifications (v3.x.x)
 - Operating voltage: 7 to 15V DC
 - Current consumption: standalone 7mA at 9V DC
 - Voltage translator with auto direction detect: TXB0108PWR
 - Dedicated MOSFET based voltage translator on I2C lines
 - Separate unidirectional quad buffer for driving heavy loads: 74ACT125
 - Diode protection on ADC pins
 - Dimensions: 3.4" x 2.1"
 - Weight: 28 gms

[Drill Template >](/assets/images/shields/shield-shield/shield-shield-template.pdf)

![Shield Shield Dimensions](/assets/images/shields/shield-shield/shield-shield-dimensions.png)

<!--
**Usage:**

Link to the Shield Shield Library and example connections for I2C, SPI, ADC, and neopixel.

add PDF template for holes
-->

## Relay Shield
The Relay Shield allows you to take over the world, one electric appliance at a time. Want to control a lamp, fan, coffee machine, aquarium pumps or garden sprinklers? Then this is a solution for you!

The shield comes with four relays that are rated at a max of 220V @10Amp allowing you to control any electric appliance rated at under 2000 Watts. You are not just limited to an appliance though; any gadget that requires high voltage and/or a lot of current can be controlled with this shield.

![Relay Shield](/assets/images/shields/relay-shield/relayshield.png)

We have even provided a small prototyping area around the shield for you to add more components or connectors. A temperature sensor to go along with your brewer, maybe?

**IMPORTANT:** This shield provides regulated power (5V) to the seated Particle device and relays. However, it does not support power to the devices controlled by the relays.

### Relay Shield - Operation

The schematic for the relay shield is simple and self explanatory. The shield has four relays that are controlled by pins D3, D4, D5 and D6 on the Particle device. Each relay is triggered via a NPN transistor that takes a control signal from the Particle device and switches the relay coil ON and OFF, which in turn makes or breaks the electrical contact on the output. There is also a fly-back diode connected across the coil to help protect the transistor from high voltage transients caused during switching.

**NOTE:** On the under side of the relay shield (top center), you will see 4 solder pads that are by default bridged via traces. You can scratch off the trace to disconnect the control pin from the preassigned ones (D3 to D6) and wire up based on your project requirement.

### Relay Shield Schematic - Control

![Relay Shield Interface](/assets/images/shields/relay-shield/relay-shield-schematic-1.png)

The relays are SPDT (Single Pole Double Throw) type, which means they have three terminals at the output: COMMON (COMM), Normally Open (NO) and Normally Closed (NC). We can either connect the load in between the COMM and NO or COMM and NC terminals. When connected in between COMM and NO, the output remains open/disconnected when the relay is turned OFF and closes/connects when the relay is turned ON. In the later case, the output remains closed/connected when the relay is OFF and opens/disconnects when the relay is ON.

### Relay Shield Schematic - Power Supply

![Relay Shield Power Supply](/assets/images/shields/relay-shield/relay-shield-schematic-2.png)

The Relay Shield uses a high efficiency [RT8259](http://www.richtek.com/download_ds.jsp?p=RT8259) switch mode voltage regulator that provides a constant 5V to the Particle device and the relays. The regulator is rated at 1.2A max output current which is ample enough to power the Particle device, the four relays and still have left over for other things you may decided to connect later. You can power the shield via the 5.5mm barrel jack or through the screw terminal. There is a reverse polarity protection diode in place so that you don't fry the electronics by plugging in the wires in reverse!

Here is an example setup to control a light bulb. The relay acts like a switch which is normally open and when pin D3 on the Particle device is turned HIGH, it activates Relay 1 thereby closing the circuit on the light bulb and turning it ON. Ta dah!

### Relay Shield - Sample Setup

![Relay Shield Setup](/assets/images/shields/relay-shield/relay-shield-setup.png)

### Relay Shield - Sample Code

```cpp
int RELAY1 = D3;
int RELAY2 = D4;
int RELAY3 = D5;
int RELAY4 = D6;

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
  digitalWrite(relayNumber+2, relayState);
  return 1;
}

```

---

An example API request to this function would look something like this:

```json
POST /v1/devices/{DEVICE_ID}/relay

# EXAMPLE REQUEST
curl https://api.particle.io/v1/devices/0123456789abcdef/relay \
  -d access_token=123412341234 -d params=r1,HIGH
```

### Relay Shield - Specifications (v3.x.x)
 - Operating voltage: 7 to 20V DC
 - Current consumption: 150mA min to 290mA max (at 9V DC)
 - Relay Max Voltage: 220V AC
 - Relay Max Current: 10Amp at 125V AC
 - Relay Part Number: JS1-5V-F [Data Sheet](http://www3.panasonic.biz/ac/e_download/control/relay/power/catalog/mech_eng_js.pdf?f_cd=300182)
 - Dimensions: 6.0" x 1.7"
 - Weight: 80 gms

[Drill Template >](/assets/images/shields/relay-shield/relay-shield-template.pdf)

![Relay Shield Dimensions](/assets/images/shields/relay-shield/relay-shield-dimensions.png)

<!--
**Changing the relay control pins: (Advanced)**
Not happy with which pins control the relays? Worry not. With a little bit of scratching and soldering, you can reconfigure the control pins.

Here is how to perform that surgery:
 - Tools needed:
    - Hobby knife
    - Soldering Iron
    - Wires
    - Multimeter (optional)
    - Steady pair of hands (not optional)
 - Steps:
    - Scratch the tracks in between the pads
    - Test it with a multimeter for continuity
    - Solder wire to the chosen pin
    - Done!

[pictures of the steps]

 Not happy with the change you just made? You can always go back to the default configuration by desoldering your new wired connection and adding a solder-jumper on the scratched pads.

[picture of the pads solder jumped]
-->

## Programmer Shield

Do you want to gain complete control over your Particle device right down to its every bit of memory space? or watch as your code gets executed and debug it? Then this shield should be able to pacify that control freak inside of you.

![Programmer Shield](/assets/images/shields/prog-shield/prog-shield.png)

This is a FT2232H based JTAG programmer shield that is compatible with OpenOCD and Broadcom's WICED IDE. The FT2232 chip is setup to provide an USB-JTAG and USB-UART interface simultaneously. The FT2232 can be also reconfigured by the user by reprogramming the on-board config EEPROM. The unused pins are clearly marked and broken out into easy to access header holes.

The USB-UART interface is connected to the TX and RX of a Particle device and communicates via [Serial1](https://docs.particle.io/reference/firmware/photon/#serial)

![Programmer Shield Description](/assets/images/shields/prog-shield/prog-shield-description.png)

For more instructions on setting up OpenOCD and using the Programmer Shield, please read through the README at the landing page of the Programmer Shield repository on GitHub, linked below:

[https://github.com/spark/shields/tree/master/photon-shields/programmer-shield](https://github.com/spark/shields/tree/master/photon-shields/programmer-shield)


### Programmer Shield - Specifications
 - Operating supply: USB
 - Current consumption:
 - Dimensions: 1.55" x 3.3"
 - Weight: 18 gms
 - Compatibility: OpenOCD and WICED IDE

[Drill Template >](/assets/images/shields/prog-shield/programmer-shield-template.pdf)

![Programmer Shield Dimensions](/assets/images/shields/prog-shield/prog-shield-dimensions.png)

## Power Shield

The Power Shield, as the name implies, allows the Particle device to be powered from different types of power sources. The shield has an intelligent battery charger and power management unit along with a wide input voltage regulator and an I2C based fuel-gauge. You can power a Particle device with either a USB plug or a DC supply of anywhere from 7 to 20VDC and charge a [3.7V LiPo battery](https://www.sparkfun.com/products/8483) all at the same time.

![Power Shield](/assets/images/shields/power-shield/power-shield.png)

The system switches in between the different power sources automatically, reducing the charge and discharge cycle stress on the battery. The fuel-guage allows you to monitor the battery's state-of-charge (SOC), allowing it to notify the user remotely and take preemptive actions when necessary.

![Power Shield Plugged](/assets/images/shields/power-shield/power-shield-photon-plugged.png)

The shield is setup so that when powered from the USB port as well as from a DC supply, it chooses the DC source over USB. The charge current is set to 500mA when charging from USB and set to 1A when charging from a DC source.

![Power Shield Supply](/assets/images/shields/power-shield/power-shield-powersupply.png)

There are two status led located on the left of the JST battery connector labeled `STAT1` and `STAT2`. Here is a table of the led behavior depending on which state the battery charger is in:

|STAT1 (Blue)  | STAT2 (Red) | Charge State |
|--------|--------|-------------------------|
|ON      | ON     | Precharge in progress   |
|ON      | OFF    | Fast charge in progress |
|OFF     | ON     | Charge done             |
|OFF     | OFF    | Charge suspend (temperature), timer fault, and sleep mode |


### Power Shield - Specifications
 - Operating voltage: USB or External DC of 7 to 20V
 - Current consumption: 500mA max (USB) & 1.2A max (other DC sources)
 - Dimensions: 1" x 1.84"

 <!-- - Weight: -->

 ![Power Shield Dimensions](/assets/images/shields/power-shield/power-shield-dimensions.png)

## Internet Button

The Internet Button is not only an easy way to get started on the Internet of Things, it's also a clean and simple way to start building your own prototypes. Quickly start playing with LEDs, multiple buttons, an accelerometer and more without any wires or soldering.

**NOTE:** There is a known issue with the current release of the Internet Button. On the PCB, the silkscreen labels are incorrect. The correct mapping is, from **right** to **left**, "1-2-3-4", *not* "4-3-2-1" as annotated on the PCB. For super double extra clarity, please see the following pin mapping label table:</span>

|Photon Pin | Correct Mapping | Incorrect Mapping |
|--------|--------|-------------------------|
|D4 | Button 1   | Button 4 |
|D5 | Button 2   | Button 3 |
|D6 | Button 3   | Button 2 |
|D7 | Button 4   | Button 1 |


![Internet Button](/assets/images/shields/internet-button/button.png)

### Internet Button - Top
![Internet Button Description](/assets/images/shields/internet-button/button-description-top.png)

### Internet Button - Bottom
![Internet Button Description](/assets/images/shields/internet-button/button-description-bottom.png)

### Internet Button - Specifications

- Operating voltage: USB or External DC of 3.6 to 6VDC
- Dimensions: 2.6" x 2.6"
<!-- - Current consumption: -->
<!-- - Weight: -->
- 11 individually controllable RGB LEDs
- ADXL362 3-axis accelerometer
- 4 tactile buttons for D-pad style interactions
- Female socket for connection to a Particle device
- Additional female headers for adding extra actuators and sensors
- Backward compatible with the Core

![Internet Button Dimensions](/assets/images/shields/internet-button/button-dimensions.png)

## Photon Kit

### Photoresistor (1)
![LDR](/assets/images/mk-ldr.jpg)

A photo resistor is a light dependent resistor whose resistance decreases with the increase in the intensity of light striking it. You can use it to detect the ambient light in the surrounding, detect shadows or use it as a part of a burglar alarm system. One photoresistor comes in your Photon Kit.

### LED (1)
![LEDs](/assets/images/mk-led-3mm.jpg)

This general purpose 3mm red LED is great for getting started with your Photon. You can never have enough of them!

### Resistors (2)
![Resistors](/assets/images/mk-1k-resistor.jpg)

You get two 220-Ohm resistors in your Photon Kit. They are rated at 5%, 1/4 Watt.



## Photon Maker Kit Contents

![Photon Maker Kit](/assets/images/maker-kit-photon.jpg)

### Photon with Headers (1)

![Photon with Headers](/assets/images/photon-loose-top.jpg)

### USB Micro B Cable (1)

![USB Cable](/assets/images/usb-cable.jpg)

A custom Particle USB cable for your Photon! We were really excited to have our logo printed on them :)

### Flex antenna (1)

![Flex Antenna](/assets/images/flex-antenna.jpg)

### Mini Breadboard (1)

![Photon in Breadboard](/assets/images/photon-in-breadboard.jpg)

<p class="caption">This breadboard is pictured with a Photon in it.</p>

### Proto-board (1)

![PCB](/assets/images/mk-pcb.jpg)

This is a 7" x 9" general purpose dot-matrix prototyping PCB.

### Deluxe Jumper Wire Pack (1)

![Jumper Cables](/assets/images/mk-jumper-cables.jpg)

Multi-colored and stripped. You can never have enough of these either.

### Male to Female Jumper Wires (10)

![Jumper Wires](/assets/images/mk-mf-jumper.jpg)

### Battery holder - 4xAA (1)

![Battery Holder](/assets/images/mk-battery-holder.jpg)


### Headers (7)

![Headers](/assets/images/mk-header-male.jpg)

These are standard 0.1" pitch headers that can be cut to size. Very handy when building circuits on breadboard or PCBs alike.

- 12-Pin Female Headers (5)
- 40-Pin Male Breakaway Headers (2)


### Ceramic Capacitors (10 each)

![Ceramic Capacitors](/assets/images/mk-ceramic-capacitor-10nF.jpg)

These are standard [ceramic capacitors.](http://en.wikipedia.org/wiki/Ceramic_capacitor) They are widely used in analog circuits as bypass/ decoupling capacitors, in timers, filters, etc. The kit comes with:

- 10nF (0.01uF) - Number code: 103
- 100nF (0.1uF) - Number code: 104

*Note:* These are non-polar capacitors which means they can be oriented both ways.

### Electrolytic Capacitor 100uF (5)

![Electrolytic Capacitors](/assets/images/mk-electrolytic-capacitor.jpg)

[Electrolytic capacitors](http://en.wikipedia.org/wiki/Electrolytic_capacitor) offer larger values and are polar. These capacitors are ideal for decoupling power supplies, as transient suppressors, and in timing circuits.

*Note:* These are polar capacitors. The longer lead denotes positive while the shorter one denotes negative. These are also know to "pop" when subjected to voltages higher than their ratings.


### LEDs (10)

![LEDs](/assets/images/mk-led-3mm.jpg)

These are general purpose 3mm LEDs. You can never have enough of them! Use a resistor in series when hooking them up to the Particle device. ( 220 ohms to 1K ohms)

- Red (5)
- Green (5)

*Note:* The longer lead is positive (anode) while the shorter one is negative (cathode).

### RGB LED (1)

![RGB LED](/assets/images/mk-rgb-led.jpg)

So, Red and Green aren't enough for you? Want to make bazzillion different colors? Then this RGB LED will do it for ya. You can mix colors by connecting each pin to an analogWrite compatible pin on the Core and feed them different values. Let the disco party begin!

This LED has four pins, one for each color and a common anode (+) pin.

[Datasheet >](/assets/datasheets/makerkit/rgb-led.pdf)

### Diode (6)

![Diode](/assets/images/mk-diode.jpg)

[1N4004](http://en.wikipedia.org/wiki/1N4004) is a general purpose diode rated at 400V, 1000mA with a forward voltage drop of 1.1V. Excellent as a [fly-back diode](http://en.wikipedia.org/wiki/Flyback_diode) or as a general rectifying diode.

[Datasheet >](http://www.diodes.com/_files/datasheets/ds28002.pdf)

### IR LED (1)

![IR LED](/assets/images/mk-ir-led.jpg)

You can take control of your television, air-conditioner or any other IR remote controlled devices with this IR LED. Simply connect it to the Particle device with a series 220 ohm resistor, use the appropriate IR code library, and control things over the Internet!

**Specifications:**
- Continuous forward current: 100mA (1A peak)
- Power dissipation: 150mW
- Peak wavelength: 940nm
- View angle: 20 deg

[Datasheet >](/assets/datasheets/makerkit/ir333-a.pdf)


### Resistors (30)

![Resistors](/assets/images/mk-1k-resistor.jpg)

There are three different value resistor in this kit. All of them are rated at 5%, 1/4 Watt.

- 220-Ohm (10)
- 1K-Ohm (10)
- 10K-Ohm (10)

You can use this [online guide](http://www.digikey.com/en/resources/conversion-calculators/conversion-calculator-resistor-color-code-4-band) to help identify which resistor is which value.

### Photoresistors (2)

![LDR](/assets/images/mk-ldr.jpg)

A photo resistor is a light dependent resistor whose resistance decreases with the increase in the intensity of light striking it. You can use it to detect the ambient light in the surrounding, detect shadows or use it as a part of a burglar alarm system.

[Datasheet >](/assets/datasheets/makerkit/photoresistor.pdf)

### 10K Rotary Potentiometer (1)
[Datasheet >](/assets/datasheets/makerkit/10k-pot.pdf)


### Temperature Sensor (1)

![Unsealed Temp Sensor](/assets/images/mk-temperature-unsealed.jpg)

The DS18B20 is an easy to use one wire digital thermometer with upto 12-bit measuring resolution.

- Supply Voltage: 3.0V to 5.5V DC
- Current consumption: 4mA max
- Measuring temperature range: -55°C to +125°C
- Accuracy: ±0.5°C (from -10°C to +85°C)
- Package: TO-92

[Datasheet >](/assets/datasheets/makerkit/DS18B20.pdf)


### Temperature Sensor - Sealed (1)

![Sealed Temp Sensor](/assets/images/mk-temperature-sealed.jpg)

This is the sealed, water proof version of the DS18B20 temperature sensor with wires.


### Piezo Buzzer (1)

![Buzzer](/assets/images/mk-buzzer.jpg)

Add an audible feedback to your project with this buzzer. The longer lead is positive and the shorter is negative. You will need a transistor to drive it.

*Note:* The sound gets annoying after a while. Use it sparingly!

- Operating Voltage: 4.0 to 7.0 V DC
- Oscillation Frequency: 2.3KHz
- Current: 30mA
- Sound Pressure: 85dB

[Datasheet >](/assets/datasheets/makerkit/buzzer.pdf)

### Mini Pushbuttons (3)

![Push Buttons](/assets/images/mk-mini-pushbutton.jpg)

These are nifty little switches that plug nicely into a breadboard or a proto-board. They are normally-open type and are rated at 12V, 50mA.

### SPDT Switch (2)

![SPDT Switch](/assets/images/mk-spdt-switch.jpg)

[Datasheet >](/assets/datasheets/makerkit/spdt-switch.pdf)

### SPDT Relay (1)

![SPDT Relay](/assets/images/mk-spdt-relay.jpg)

[Datasheet >](/assets/datasheets/makerkit/spdt-relay.pdf)

### NPN Transistor (1)

![NPN Transistor](/assets/images/mk-npn-transistor.jpg)

S9013 is a general purpose small signal NPN [transistor](http://en.wikipedia.org/wiki/Transistor) rated at 40V, 500mA.

You can use this transistor to switch small loads like relays, mini motors, buzzers, etc.

[Datasheet >](https://www.fairchildsemi.com/datasheets/SS/SS9013.pdf)

### PIR sensor (1)

![PIR](/assets/images/mk-pir.jpg)

[Datasheet >](/assets/datasheets/makerkit/pir-sensor.pdf)

### Pancake Vibration Motor (1)

![Pancake Motor](/assets/images/mk-vibration.jpg)

Wanna give your next Particle device project a tactile feedback? This vibration motor serves the purpose nicely. Use the NPN transistor to switch it.

[Datasheet >](/assets/datasheets/makerkit/pancake-motor.pdf)

### Micro Servo (1)

![RC Servo](/assets/images/mk-micro-rc-servo.jpg)

Emax ES08A is a mini RC servo motor.

- Operating Voltage: 4.8 to 6.0VDC
- Stall Torque: 1.8Kg/cm
- Speed: 0.10sec/degree at no load

[Datasheet >](http://www.emaxmodel.com/es08a-ii.html)

Wiring:
- Yellow - Signal (D0, D1, A0, A1, A4, A5, A6, A7)
- Orange - +5V (VIN)
- Brown  - Ground (GND)

Note: The Ground pin may vary as Brown or Black, +5V pin may vary as Orange or Red and Signal pin may vary as Yellow or White and sometimes Orange if there is already a Red and Black wire.


### Serial OLED Screen,0.96"(1)

![OLED](/assets/images/mk-oled.jpg)

This is a 128x64 pixel graphic OLED screen that can be either controlled via the SPI (default) or I2C.

**Specifications:**
- Supply Voltage: 3.0V to 5V DC
- Current consumption: 50mA max
- Communication modes: SPI or I2C

[Datasheet >](/assets/datasheets/makerkit/oled.pdf)








<!--
Ceramic Capacitor - 10nF
Ceramic Capacitors 100nF
Electrolytic Capacitors 100uF
40-Pin Male Breakaway Headers
12-Pin Female Headers
Basic LED - Red
Basic LED - Green
RGB LEDs
Diode
IR LED
Micro Servo
Deluxe Jumper Wire Pack
Serial OLED LCD,0.96"
USB Micro B Cable
Flex antenna
Male to Female Jumper Wires
Battery holder (4xAA, 2x2 with switch)
Piezo Buzzer
Mini Pushbuttons
SPDT Switch
Temperature Sensor
Temperature Sensor (covered)
SPDT Relay
PIR sensor
Pancake Vibration Motor
NPN Transistor
Proto-board
Photo Resistors
Resistor 220-Ohm
Resistor 1K-Ohm
Resistor 10K-Ohm
10K Rotary Potentiometer
Particle Photon with Headers
Mini Breadboard
-->
