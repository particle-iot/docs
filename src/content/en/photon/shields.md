---
  word: Accessories
  title: Shields and kits
  order: 10
---
# Shield Shield

Sometimes life can be a little difficult in the land of electronics when two systems talk a different voltage language. How do you make them talk to each other without making one of them _burnout_? The Shield Shield is the answer. This shield performs all the necessary voltage translation and provides an Arduino-like footprint to make it easier for you to plug in your existing Arduino shields or talk to other 5V hardware.

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield.png)

**Specifications (v3.x.x):**
 - Operating voltage: 7 to 15V DC
 - Current consumption: standalone 7mA at 9V DC
 - Voltage translator with auto direction detect: TXB0108PWR
 - Dedicated MOSFET based voltage translator on I2C lines
 - Separate unidirectional quad buffer for driving heavy loads: 74ACT125
 - Diode protection on ADC pins
 - Dimensions: 3.4" x 2.1"
 - Weight: 28 gms

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-dimensions.png)

**Operation:**   

We use Texas Instruments TXB0108PWR to do the voltage translation in between the Particle's device's 3.3V to a 5V logic. Unlike other IO pins, the analog pins are rated at only a max of 3.3V and **NOT** 5.0V. Please remember NOT to exceed this voltage at anytime. The shield has an on-board voltage regulator and can be powered from 7V to 15V DC source. You could also power it via the USB plug on the Spark Core alone but the current would be limited to 500mA.

The new version of the Shield Shield (v3.x.x) uses dedicated mosfet based voltage translation on the I2C lines. We also decided to add a prototyping area in empty space in the middle of the shield.

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-description.png)

**Note:** One drawback of using the TXB0108PWR as a voltage translator is that it is only capable of driving loads at short distances. Long length wires will introduce excessive capacitive loading and cause the auto direction detection to fail. To overcome this drawback, the shield shield also has an optional on-board 74ABT125 buffer that is capable of driving heavier loads in *one* direction. A user can jumper wire to whichever IO pin they would like to be translated to 5V.

//Circuit Diagram  
//Product Photo with description

**Pin Mapping**

![](https://github.com/spark/photon-shields-docs/blob/master/shield-shield/shield-shield-pinmapping.png)

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

*Note: These pins can also function as 3.3V PWM outputs or 3.3V Servo outputs.  
** Note: ADC inputs are 3.3V max.

**IMPORTANT:** The Shield Shield does not map the Particle device's pins to like-numbered pins on the Arduino. In other words, D0 on the Particle device is not the same as D0 on the Arduino. Please review the pin mapping table to the right and plan accordingly.

**Usage:**

Link to the Shield Shield Library and example connections for I2C, SPI, ADC, and neopixel.

# Relay Shield
The Relay Shield allows you to take over the world, one electric appliance at a time. Want to control a lamp, fan, coffee machine, aquarium pumps or garden sprinklers? Then this is a solution for you! 

The shield comes with four relays that are rated at a max of 220V @10Amp allowing you to control any electric appliance rated at under 2000 Watts. You are not just limited to an appliance though; any gadget that requires high voltage and/or a lot of current can be controlled with this shield.

![](https://github.com/spark/photon-shields-docs/blob/master/relay-shield/relayshield.png)

We have even provided a small prototyping area around the shield for you to add more components or connectors. A temperature sensor to go along with your brewer, maybe?

**IMPORTANT:** This shield provides regulated power (5V) to the seated Particle device and relays. However, it does not support power to the devices controlled by the relays.

![](https://github.com/spark/photon-shields-docs/blob/master/relay-shield/relay-shield-dimensions.png)

**Specifications:**
 - Operating voltage: 7 to 20V DC
 - Current consumption: 150mA min to 290mA max (at 9V DC)
 - Relay Max Voltage: 220V AC
 - Relay Max Current: 10Amp at 125V AC
 - Relay Part Number: JS1-5V-F (Data Sheet)
 - Dimensions: 6.0" x 1.7"
 - Weight: 80 gms

**Operation:**
The schematic for the relay shield is simple and self explanatory. The shield has four relays that are controlled by pins D3, D4, D5 and D6 on the Particle device. Each relay is triggered via a NPN transistor that takes a control signal from the Particle device and switches the relay coil ON and OFF, which in turn makes or breaks the electrical contact on the output. There is also a fly-back diode connected across the coil to help protect the transistor from high voltage transients caused during switching.

![Relay Interface](https://github.com/spark/photon-shields-docs/blob/master/relay-shield/relay-shield-schematic-1.png)

The relays are SPDT (Single Pole Double Throw) type, which means they have three terminals at the output: COMMON (COMM), Normally Open (NO) and Normally Closed (NC). We can either connect the load in between the COMM and NO or COMM and NC terminals. When connected in between COMM and NO, the output remains open/disconnected when the relay is turned OFF and closes/connects when the relay is turned ON. In the later case, the output remains closed/connected when the relay is OFF and opens/disconnects when the relay is ON.

![Power Supply](https://github.com/spark/photon-shields-docs/blob/master/relay-shield/relay-shield-schematic-2.png)

The Relay Shield uses a high efficiency [RT8259](http://www.richtek.com/download_ds.jsp?p=RT8259) switch mode voltage regulator that provides a constant 5V to the Particle device and the relays. The regulator is rated at 1.2A max output current which is ample enough to power the Particle device, the four relays and still have left over for other things you may decided to connect later. You can power the shield via the 5.5mm barrel jack or through the screw terminal. There is a reverse polarity protection diode in place so that you don't fry the electronics buy plugging in the wires in reverse!

Here is an example setup to control a light bulb. The relay acts like a switch which is normally open and when pin D3 on the Particle device is turned HIGH, it activates Relay 1 thereby closing the circuit on the light bulb and turning it ON. Ta dah!

![](https://github.com/spark/photon-shields-docs/blob/master/relay-shield/relay-shield-setup.png)

**Code Example:**

Describe the relay library here.

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

# Programmer Shield

Do you want to gain complete control over your Particle device right down to its every bit of memory space? or watch as your code gets executed and debug it? Then this shield should be able to pacify that control freak inside of you. 

![](https://github.com/spark/photon-shields-docs/blob/master/prog-shield/prog-shield.png)

This is a FT2232H based JTAG programmer shield that is compatible with OpenOCD and Broadcom's WICED IDE. The FT2232 chip is setup to provide an USB-JTAG and USB-UART interface simultaneously. The FT2232 can be also reconfigured by the user by reprogramming the on-board config EEPROM. The unused pins are clearly marked and broken out into easy to access header holes.

![](https://github.com/spark/photon-shields-docs/blob/master/prog-shield/prog-shield-description.png)

//Circuit Diagram
//Product Photo with description

**Specifications:**
 - Operating supply: USB
 - Current consumption: 
 - Dimensions: 1.55" x 3.3"
 - Weight: 18 gms
 - Compatibility: OpenOCD and WICED IDE

![](https://github.com/spark/photon-shields-docs/blob/master/prog-shield/prog-shield-dimensions.png)

# Power Shield

The Power Shield, as the name implies, allows the Particle device to be powered from different types of power sources. The shield has an intelligent battery charger and power management unit along with a wide input voltage regulator and an I2C based fuel-gauge. You can power a Particle device with either a USB plug or a DC supply of anywhere from 7 to 20VDC and charge a 3.7V LiPo battery all at the same time. 

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield.png)

The system switches in between the different power sources automatically, reducing the charge and discharge cycle stress on the battery. The fuel-guage allows you to monitor the battery's state-of-charge (SOC), allowing it to notify the user remotely and take preemptive actions when necessary.

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-dimensions.png)

**Specifications:**
 - Operating voltage: USB or External DC of 7 to 20V
 - Current consumption: 
 - Dimensions: 
 - Weight: 

//Circuit Diagram
//Product Photo with description

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-photon-plugged.png)

The shield is setup so that when powered from the USB port as well as from a DC supply, it chooses the DC source over USB. The charge current is set to 500mA when charging from USB and set to 1A when charging from a DC source.

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-powersupply.png)

# Internet Button

![](https://github.com/spark/photon-shields-docs/blob/master/internet-button/button.png)

![](https://github.com/spark/photon-shields-docs/blob/master/internet-button/button-dimensions.png)
