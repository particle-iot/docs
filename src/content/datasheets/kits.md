---
word: Kits
title: Particle Kits Overview
order: 1
columns: 3
template: datasheet.hbs
devices: [ photon, core ]
---

{{#if core}}
  # Spark Core Line
{{/if}}

{{#if photon}}
  # Photon Line
{{/if}}

Here's a quick "what's in the box" for each of our offered kits. More detail is available in the shields and kits shown in other parts of the datasheet section.

{{#if core}}
### Spark Core
![]({{assets}}/images/core-contents.jpg)

- (1) Spark Core
- (1) USB micro B cable
- (1) Breadboard

### Spark Core Maker Kit

![]({{assets}}/images/core-mkit.jpg)

- Basics
  - (1) Spark Core - u.FL or CA
  - (1) USB Micro B Cable
  - (1) Breadboard
- Inputs
  - (3) Mini Pushbuttons
  - (2) DPDT Switch
  - (2) Tilt Sensor
  - (1) Temperature Sensor
  - (1) Force-Sensitive Resistor
  - (2) Photo Resistors
  - (2) Thermistor
  - (1) 10K Rotary Potentiometer
- Outputs
  - (5) Basic LED - Red
  - (5) Basic LED - Green
  - (1) RGB LEDs
  - (1) Micro Servo
  - (1) Mini DC Motor
  - (1) Vibration Motor
  - (1) Piezo Buzzer
- Connectors
  - (1) Deluxe Jumper Wire Pack
  - (1) Breadboard
  - (1) Proto-board
  - (5) 8-Pin Female Headers
  - (2) 40-Pin Male Breakaway Headers
  - (1) 40-Pin Male Breakaway Dual-Headers
  - (10) Resistor 330-Ohm
  - (10) Resistor 1K-Ohm
  - (10) Resistor 10K-Ohm
  - (10) Ceramic Capacitor - 10nF
  - (10) Ceramic Capacitors 100nF
  - (5) Electrolytic Capacitors 100uF
  - (1) NPN Transistor
  - (6) Diode
  - (1) Shift Register IC
{{/if}}

{{#if photon}}
### Photon
![]({{assets}}/images/photon-matchbox-new.jpg)

- (1) Photon
- (1) Protective disposable paper strip with photon joke

### Photon Kit

![]({{assets}}/images/photon-kit-new.jpg)

- (1) Photon
- (1) USB Micro B Cable
- (1) Breadboard
- (1) Photoresistor
- (1) Basic LED - Red
- (2) Resistor 220-Ohm

### Photon Maker Kit

![]({{assets}}/images/photon-mkit-grey.png)

- Basics
  - (1) Photon with Headers
  - (1) USB Micro B Cable
  - (1) Flex antenna
  - (1) Breadboard
  - (1) Proto-board
  - (1) Deluxe Jumper Wire Pack
  - (10) Male to Female Jumper Wires
  - (1) Battery holder (4xAA, 2x2 with switch)
- Headers
  - (5) 12-Pin Female Headers
  - (2) 40-Pin Male Breakaway Headers
- Capacitors
  - (10) Ceramic Capacitor 10nF
  - (10) Ceramic Capacitors 100nF
  - (5) Electrolytic Capacitors 100uF
- LEDs and Diodes
  - (5) Basic LED - Red
  - (5) Basic LED - Green
  - (1) RGB LED
  - (6) Diode
  - (1) IR LED
- Resistors
  - (10) Resistor 220-Ohm
  - (10) Resistor 1K-Ohm
  - (10) Resistor 10K-Ohm
  - (2) Photoresistors
  - (1) 10K Rotary Potentiometer
- Misc Components
  - (1) Temperature Sensor
  - (1) Temperature Sensor (covered)
  - (1) Piezo Buzzer
  - (3) Mini Pushbuttons
  - (2) SPDT Switch
  - (1) SPDT Relay
  - (1) NPN Transistor
  - (1) PIR sensor
  - (1) Pancake Vibration Motor
  - (1) Micro Servo
  - (1) Serial OLED LCD,0.96"
{{/if}}
