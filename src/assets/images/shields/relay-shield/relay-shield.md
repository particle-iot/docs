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
