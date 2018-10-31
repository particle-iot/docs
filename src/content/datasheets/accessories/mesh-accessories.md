---
title: Mesh Accessories
layout: datasheet.hbs
columns: two
order: 20
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

The pins on the [Grove connector](http://wiki.seeedstudio.com/Grove_System/) are as follows:

| Pin | Color | Digital | Analog | I2C | UART
| --- | --- | --- | --- | --- | --- |
| 1 | Yellow | Primary I/O | Primary Analog In | I2C Clock | Serial RX |
| 2 | White | Secondary I/O | Secondary Analog In | I2C Data | Serial TX |
| 3 | Red | Power | Power | Power | Power|
| 4 | Black | GND | GND | GND | GND |

#### Button


<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/button.png" ></div>

Button is a momentary push button. It contains one independent "momentary on/off" button. “Momentary” means that the button rebounds on its own after it is released. The button outputs a HIGH signal when pressed, and LOW when released.  The Sig marked on silk layer stands for signal while NC is not connected to anything. 

It can be used on either a digital or analog input port, and the button is read using the primary digital I/O using the [digitalRead](/reference/device-os/firmware#digitalread-) function. The digitalRead function can be used on both digital and analog pins.

Additional information available [here.](https://www.seeedstudio.com/Grove-Button-p-766.html)

#### Rotary Angle Sensor

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/pot.png" ></div>

The rotary angle sensor produces analog output between 0 and Vcc (3.3VDC) on its D1 connector. The D2 connector is not used. The angular range is 300 degrees with a linear change in value. The resistance value is 10k ohms. This essentially is a potentiometer.

It must be used on an analog input port, and the value is read using the primary analog input using the [analogRead](/reference/device-os/firmware#analogread-adc-) function.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Rotary_Angle_Sensor/)


#### Ultrasonic Ranger

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/ultrasonic.png" ></div>

Ultrasonic ranger is a non-contact distance measurement module which works at 40KHz. When we provide a pulse trigger signal with more than 10uS through signal pin, the sensor will issue 8 cycles of 40kHz cycle level and detect the echo. The pulse width of the echo signal is proportional to the measured distance. Here is the formula: Distance = echo signal high time * Sound speed (340M/S)/2. The sensor's trig and echo signal share 1 SIG pin.

The library is available in the Web IDE as [Grove_Ultrasonic_Ranger](https://build.particle.io/libs/Grove_Ultrasonic_Ranger/1.0.0/tab/Ultrasonic.cpp).

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Ultrasonic_Ranger/)


#### Temperature and Humidity Sensor

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/temphumi.png" ></div>

This Temperature and Humidity sensor provides a pre-calibrated digital output. A unique capacitive sensor element measures relative humidity and the temperature is measured by a negative temperature coefficient (NTC) thermistor. It has excellent reliability and long term stability. Please note that this sensor will not work for temperatures below 0 degrees. It uses the DHT-11 sensor.

The library is available in the Web IDE as [Grove_Temperature_And_Humidity_Sensor](https://build.particle.io/libs/Grove_Temperature_And_Humidity_Sensor/1.0.6/tab/Seeed_DHT11.cpp).

Additional information available [here.](http://wiki.seeedstudio.com/Grove-TemperatureAndHumidity_Sensor/)


#### Light Sensor v1.2

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/lightsensor.png" ></div>

Light sensor integrates a photo-resistor (light dependent resistor) to detect the intensity of light. The resistance of photo-resistor decreases when the intensity of light increases. A dual OpAmp chip LM358 on board produces voltage corresponding to intensity of light(i.e. based on resistance value). The output signal is analog value, the brighter the light is, the larger the value.

It must be used on an analog input port, and the value is read using the primary analog input using the [analogRead](/reference/device-os/firmware#analogread-adc-) function.

This module can be used to build a light controlled switch i.e. switch off lights during day time and switch on lights during night time.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Light_Sensor/)


#### Chainable RGB LED

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/rgb.png" ></div>


Chainable RGB LED is based on P9813 chip which is a full-color LED driver. It provides 3 constant-current drivers as well as modulated output of 256 shades of gray. It communicates with a MCU using 2-wire transmission (Data and Clock). This 2-wire transmission can be used to cascade additional Grove - Chainable RGB LED modules. The built-in clock regeneration enhances the transmission distance. This Grove module is suitable for any colorful LED based projects.

The library is available in the Web IDE as [Grove_ChainableLED](https://build.particle.io/libs/Grove_ChainableLED/1.0.1/tab/ChainableLED.cpp).

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Chainable_RGB_LED/)

#### Buzzer

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/buzzer.png" ></div>

Buzzer module has a piezo buzzer as the main component. The piezo can be connected to digital outputs, and will emit a tone when the output is HIGH. Alternatively, it can be connected to an pulse-width modulation output to generate various tones and effects.

You can use the [pinMode](/reference/device-os/firmware#pinmode-) and [digitalWrite](/reference/device-os/firmware#digitalwrite-) functions to control the output.

```
pinMode(D2, OUTPUT);
digitalWrite(D2, HIGH);
delay(1000);
digitalWrite(D2, LOW);
```

It can be used on a digital or analog port, as the analog inputs can also be used as digital outputs.

An example using [tone](/reference/device-os/firmware#tone-) (PWM) to play a melody can be found [here](https://go.particle.io/shared_apps/5bc52086cb4e858acf001098). Not every pin is PWM compatible, so make sure you use a port that supports PWM.

Additional information available [here.](http://wiki.seeedstudio.com/Grove-Buzzer/)


#### 4-Digit Display

<div align=center><img src="/assets/images/accessories/grove-mesh-starter-kit/display.png" ></div>

This is a 4 digit seven-segment display module that uses TM1637 driver chip. This driver is controlled with a two wire interface (CLK, DATA). This is perfect for displaying 4 digit numeric values.

The library is available in the Web IDE as [Grove_4Digit_Display](https://build.particle.io/libs/Grove_4Digit_Display/1.0.1/tab/TM1637.cpp).

Additional information available [here.](http://wiki.seeedstudio.com/Grove-4-Digit_Display/)


## Adafruit FeatherWing OLED Display 128x32

![Adafruit FeatherWing OLED Display](/assets/images/accessories/adafruit_oled.jpg)

The Adafruit OLED display FeatherWing makes it easy to add a small text and graphics display to your project. Built in a FeatherWing form-factor, you can use a FeatherWing Doubler or FeatherWing Tripler to add a display to your Argon, Boron, or Xenon project with no loose wires. And it includes three handy momentary push-buttons.

You can purchase one from the [Particle Store](https://store.particle.io/collections/accessories) or from [Adafruit](https://www.adafruit.com/product/2900). You can find more technical information [at Adafruit](https://learn.adafruit.com/adafruit-oled-featherwing/overview).

The library is available in the Web IDE as [oled-wing-adafruit](https://build.particle.io/libs/oled-wing-adafruit/0.0.4/tab/oled-wing-adafruit.cpp). You can find additional documentation [here](https://github.com/rickkas7/oled-wing-adafruit).

The display is a SSD1306 and connects by I2C (pins D0 and D1).

The three buttons are:

| Button | Pin | Notes |
| --- | --- | --- |
| A | D4 | No pull-up. Can't be used with Ethernet. |
| B | D3 | 100K pull-up. Can't be used with Ethernet. |
| C | D2 | No pull-up. |

The library takes care of setting the appropriate input modes and debouncing the buttons for you.

Note that if you are using the Adafruit OLED display and the Particle Ethernet FeatherWing, you cannot use buttons A or B as those pins are used by Ethernet.







