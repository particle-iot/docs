---
title: Mesh Accessories
layout: datasheet.hbs
columns: two
order: 30
---

# Mesh Accessories

## Grove Starter Kit for Particle Mesh

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/grove-mesh-starter-kit.png" ></div>

The Grove starter kit is designed to make your first exploration into the world of sensing and actuating a breeze. The kit comes with seven different components that work out-of-the-box with Particle Mesh hardware and let you focus on learning the basics. Working with Starter Kit requires no soldering and minimal wiring. Simply connect the kit’s Grove Shield (the new co-developed FeatherWing adapter from Particle and SeeedStudio) to your Particle Mesh board and use the included cables to connect the adapter and the sensors and actuators that you want to use. It’s a plug-and-play experience.

### Kit Contents

 - 1x Grove Shield for Particle Mesh
 - 1x Button
 - 1x Rotary Angle Sensor
 - 1x Ultrasonic Ranger
 - 1x Temp&Humi Sensor
 - 1x Light Sensor v1.2
 - 1x Chainable RGB LED
 - 1x Buzzer
 - 1x 4-Digit Display

#### Grove shield

The main shield consists of a connector to plug in any of the Particle Mesh dev kit and a set of 8 grove ports for plugging in various grove accessories. The ports consist of:
 - 3 Digital ports
 - 2 Analog ports
 - 2 I2C ports
 - 1 UART port

#### Button

Button is a momentary push button. It contains one independent "momentary on/off" button. “Momentary” means that the button rebounds on its own after it is released. The button outputs a HIGH signal when pressed, and LOW when released.  The Sig marked on silk layer stands for signal while NC is not connected to anything. 

Additional information available [here.](https://www.seeedstudio.com/Grove-Button-p-766.html)

#### Rotary Angle Sensor

The rotary angle sensor produces analog output between 0 and Vcc (3.3VDC) on its D1 connector. The D2 connector is not used. The angular range is 300 degrees with a linear change in value. The resistance value is 10k ohms. This essentially is a potentiometer.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/)


#### Ultrasonic Ranger

Ultrasonic ranger is a non-contact distance measurement module which works at 40KHz. When we provide a pulse trigger signal with more than 10uS through signal pin, the sensor will issue 8 cycles of 40kHz cycle level and detect the echo. The pulse width of the echo signal is proportional to the measured distance. Here is the formula: Distance = echo signal high time * Sound speed (340M/S)/2. The sensor's trig and echo signal share 1 SIG pin.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/)


#### Temperature and Humidity Sensor

This Temperature and Humidity sensor provides a pre-calibrated digital output. A unique capacitive sensor element measures relative humidity and the temperature is measured by a negative temperature coefficient (NTC) thermistor. It has excellent reliability and long term stability. Please note that this sensor will not work for temperatures below 0 degrees.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-TemperatureAndHumidity_Sensor/)


#### Light Sensor v1.2

Light sensor integrates a photo-resistor (light dependent resistor) to detect the intensity of light. The resistance of photo-resistor decreases when the intensity of light increases. A dual OpAmp chip LM358 on board produces voltage corresponding to intensity of light(i.e. based on resistance value). The output signal is analog value, the brighter the light is, the larger the value.

This module can be used to build a light controlled switch i.e. switch off lights during day time and switch on lights during night time.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Light_Sensor/)


#### Chainable RGB LED

Chainable RGB LED is based on P9813 chip which is a full-color LED driver. It provides 3 constant-current drivers as well as modulated output of 256 shades of gray. It communicates with a MCU using 2-wire transmission (Data and Clock). This 2-wire transmission can be used to cascade additional Grove - Chainable RGB LED modules. The built-in clock regeneration enhances the transmission distance. This Grove module is suitable for any colorful LED based projects.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Chainable_RGB_LED/)


#### Buzzer

Buzzer module has a piezo buzzer as the main component. The piezo can be connected to digital outputs, and will emit a tone when the output is HIGH. Alternatively, it can be connected to an analog pulse-width modulation output to generate various tones and effects.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Buzzer/)


#### 4-Digit Display

This is a 4 digit seven-segment display module that uses TM1637 driver chip. This driver is controlled with a two wire interface (CLK, DATA). This is perfect for displaying 4 digit numeric values.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-4-Digit_Display/)
