---
title: Input protection
columns: two
layout: commonTwo.hbs
description: Input protection
---

# {{title}}

Most Particle devices have a 3.3V limit on digital and analog inputs. When connecting to external sensors, it's important to make sure:

- The voltage is in the required range
- The Particle device is protected against transient voltages

One common solution is to use a rail-to-rail TVS (transient voltage suppressor) with Zener diode.

The examples here use a Diodes Inc. [D1213A-02SOL-7](https://www.digikey.com/en/products/detail/diodes-incorporated/D1213A-02SOL-7/3340437) 
(TVS DIODE 3.3VWM 10VC SOT233). They're US$ 0.20 in single quantities and significantly less expensive in larger quantities. This version is in the SOT-23-3 package 
but there are variations in several common surface mount packages.

This chip isn't available in PTH packages for breadboards, but if you want to prototype a design in a breadboard, you can 
easily search for "SOT-23-3 breakout" and find items such as this one [from Amazon](https://www.amazon.com/Chironal-Double-Side-SOT23-3-Adapter-Converter/dp/B07MQBF2DD/ref=sr_1_3) which is 50 pieces for US$ 9.49. The SOT-23-3 is intended to be reflow soldered, but the pins are far enough apart that you can
solder it by hand with a soldering iron fairly easily.

## Example circuits

### Voltage divider (5V)

One common situation is interfacing a 5V signal to 3.3V GPIO. A common solution, especially for analog signals, is a voltage divider:

![5V divider](/assets/images/hardware-community/input-protection/div5.png)

These resistors values do not exactly match 5 VDC to 3.3V (4095 on the ADC), but are close and use common off-the-shelf resistor values.

Because resistors in series add together, you could make this will three common 10K resistors, as well.

![5V divider](/assets/images/hardware-community/input-protection/div5b.png)


### Voltage divider (12V)

This is a voltage divider for a 12 VDC signal, 27K on the high side, and 10K on the low side.

![12V voltage divider](/assets/images/hardware-community/input-protection/div12.png)

These resistors values do not exactly match 12 VDC to 3.3V (4095 on the ADC), but are close and use common off-the-shelf resistor values.

### 3.3V TVS

In the simplest case, a 3.3V analog or digital signal, you can use it like this:

![IN4](/assets/images/hardware-community/input-protection/in4.png)

- The input signal is `IN4` in this example.
- It connects to `A0` though and analog or digital input can be used.
- The 100&ohm; resistor protects against excessive current through the diode.
- If the input voltage is negative, the diode shunts it to ground, protecting the MCU.
- If the input signal is slightly more than 3.3V, the diode shunts it to 3V3, protecting the MCU.
- If the input signal is very large, including ESD, the Zener diode stops the highest voltages, leaving the small differential to the rail-to-rail diodes.

### 5V TVS

You can also attach a voltage divider to the input of the TVS:

![IN4](/assets/images/hardware-community/input-protection/div5tvs.png)

- The voltage divider works the same as [Voltage divider (5V)](#voltage-divider-5v-), above.
- Instead of the 100&ohm; R20 in [3.3V TVS](#3-3v-tvs), above, the high side of the voltage divider (R19) limits the input current.

### Input block

One technique that I like is to use this universal input block on my circuits. If I might want to change the voltage or other characteristics
of the input in the future, I can just rework the board to change the resistors and not have to spin a new board.

#### 3.3V Input block

This circuit is electrically the same as [3.3V TVS](#3-3v-tvs).

![IN1](/assets/images/hardware-community/input-protection/in1.png)

The layout on a circuit board looks like this:

![IN1](/assets/images/hardware-community/input-protection/in1-board.png)
