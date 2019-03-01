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


## Ethernet FeatherWing

<div align=center><img src="/assets/images/accessories/ethernet-featherwing/ethernet-featherwing.png" ></div>

The Ethernet FeatherWing is the fastest way to add wired connectivity to your Argon, Boron, or Xenon and turns any Particle Mesh developer kit into an Ethernet gateway. Based on the WIZnet W5500 chip, this side-by-side FeatherWing maintains great RF performance even while adding Ethernet connectivity to any Particle Mesh device.

The form-factor is based around the Adafruit FeatherWing Tripler. The two side connectors allow you to plug in one Particle Mesh device along with a Feather accessory.

<div align=center><img src="/assets/images/accessories/ethernet-featherwing/ethernet-featherwing-plugged.png" ></div>

### Pin Map

|Mesh Pin|Ethernet FeatherWing Pin   |
|:-------|:--------------------------|
|MISO    | SPI MISO                  |
|MOSI    | SPI MOSI                  |
|SCK     | SPI SCK                   |
|D3      | nRESET<sup>[1]</sup>      |
|D4      | nINTERRUPT<sup>[1]</sup>  |
|D5      | nCHIP SELECT<sup>[1]</sup>|

**Notes:**

<sup>[1]</sup> These pins are connected via jumper pads on the bottom. You can cut these jumper traces and rewire them to a different pin on the Mesh device if the need arises.

The Ethernet driver for this wing is baked into the Mesh Device OS. When you set up a new Particle Mesh device that is plugged into an Ethernet FeatherWing, simply select the _USE WITH ETHERNET?_ option on your Particle mobile app and it should recognize and talk over Ethernet automagically. It's that simple.

The hardware design for this wing is completely opensource. All the files are available on our [GitHub repository here.](https://github.com/particle-iot/ethernet-wing)

If you are using the Adafruit Ethernet Feather Wing, be sure to connect the nRESET and nINTERRUPT pins (on the small header on the short side) to pins D3 and D4 with jumper wires. These are required for proper operation.

## Classic Adapter

<div align=center><img src="/assets/images/accessories/classic-adapter.png" ></div>

The Particle Classic Adapter lets you use your Asset Tracker, Relay Shield, or other third-party shields with our third generation developer kits. Plug your Argon, Boron, or Xenon into this adapter and continue development as usual!

The top of the adapter has female connectors for you to plug in the Particle Mesh device. The bottom has male header pins in the Particle legacy form-factor for devices such as the Electron, Photon, or the Core.

The legacy side (male pins on the bottom) are designed to fit an Electron. So when plugging into a Photon socket please make sure the B/C pins side are hanging off the end, not plugged into anything.

You cannot supply more than 3.3V to any pin on the Argon/Boron/Xenon (except VUSB and the USB connector).

**Note:** This product is a one-way adapter. That is, this product does not enable use of Adafruit FeatherWings with the Photon or Electron.

The design is open source and the design files are available [here](https://github.com/particle-iot/classic-adapter).

{{collapse op="start" label="Additional details and diagrams"}}

#### Pin orientation

The long side (16-pin header on the top) has the pins arranged like this, left to right as in the picture. This only shows how the pins are oriented, not the connections!

| Top (Gen 3) | Bottom (Gen 2) |
| --- | --- | 
| RST | VIN |
| 3V3 | GND |
| MD | TX | 
| GND | RX | 
| A0 | WKP |
| A1 | DAC |
| A2 | A5 | 
| A3 | A4 |
| A4 | A3 |
| A5 | A2 |
| D13 (SCK) | A1 |
| D12 (MISO) | A0 |
| D11 (MOSI) | B5 |
| D10 (RX) | B4 |
| D9 (TX) | B3 |
| NC | B2 |
| | B1 |
| | B0 |

![Classic Adapter long side](/assets/images/accessories/classic-long.png)


The short side (12-pin header on the top) has the pins arranged like this, left to right as in the picture. 

| Top (Gen 3) | Bottom (Gen 2) |
| --- | --- | 
| D0 | C0 |
| D1 | C1 |
| D2 | C2 |
| D3 | C3 |
| D4 | C4 |
| D5 | C5 |
| D6 | D0 |
| D7 | D1 |
| D8 | D2 |
| USB | D3 |
| EN | D4 |
| LI+ | D5 |
| | D6 |
| | D7 |
| | GND |
| | VBAT |
| | RST |
| | 3V3 |

![Classic Adapter short side](/assets/images/accessories/classic-short.png)


#### Substituting for an Electron

Take, for example, the AssetTracker V2 with an Electron:

![AssetTracker with Electron](/assets/images/accessories/assettracker-electron.jpg)

To substitute a Boron, you'd use the classic adapter like this:

![AssetTracker with Electron](/assets/images/accessories/assettracker-classic.jpg)

Note that you will not be able to use the LIS3DH accelerometer because it connects by SPI and the SPI pins are not mapped in a usable way with the classic adapter!

#### Substituting for an Photon

This is a small sensor that typically uses a Photon:

![Photon board](/assets/images/accessories/photon-example.jpg)

When using the classic adapter, some pins will hang off the edge. Makes sure the B and C pins hang over, not the power pins!

![Classic adapter in Photon socket](/assets/images/accessories/photon-classic.jpg)

#### Schematic

![Schematic](/assets/images/accessories/classic-schematic.png)

#### Top

![Top](/assets/images/accessories/classic-top.jpg)

#### Bottom

![Bottom](/assets/images/accessories/classic-bottom.jpg)


{{collapse op="end"}}


### Pin Map

|Legacy Device | Mesh Device|
|:-------------|:-----------|
|A0 |A0 |
|A1 |A1 |
|A2 |A2 |
|A3 |A3 |
|A4 |A4 |
|A5 |A5 |
|D0 |D0 (SDA) |
|D1 |D1 (SCL) |
|D2 |D2 |
|D3 |D3 |
|D4 |D4 |
|D5 |D5 |
|D6 |D6 |
|D7 |D7 |
|C5<sup>[1]</sup>  |D8 |
|TX |TX |
|RX |RX |
|B5<sup>[1]</sup>  |D11 (MISO) |
|WKP<sup>[1]</sup>  |D12 (MOSI)|
|DAC<sup>[1]</sup>  |D13 (SCK) |
|RST |RST |
|VIN |VUSB |
|3V3 |3V3 |

**Notes:**

<sup>[1]</sup> These pins are connected via jumper pads on the top. You can cut these jumper traces and rewire them to a different pin on the Mesh device if the need arises.

<sup>[2]</sup> Pins C0 to C4 and B0 to B4 on the Particle legacy device headers are not connected to anything.

<sup>[3]</sup> Pins MD, Li+, and EN on the Particle Mesh device are not connected to anything.

### I2C

I2C (Wire) can be used on D0 and D1. However, pins on the mesh devices are not 5V tolerant, so make sure you do not have pull-ups to 5V.

### SPI

It's not possible to use SPI with the classic adapter. The mesh SPI pins (MISO, MOSI, SCK) are not connected to pins that support SPI on the Electron or Photon (B5, WKP, DAC). The mesh SPI1 pins overlap the Electron/Photon SPI1 pins, however they're different!

| SPI1 | Classic | Mesh | 
| --- | --- | --- |
| SCK | D4 | D2 |
| MOSI | D2 | D3 |
| MISO | D3 | D4 |

### Other Features

The mesh devices do not support DAC or CAN, so those classic devices using those features won't work with the classic adapter.

## Debugger

<div align=center><img src="/assets/images/accessories/debugger.png" ></div>

The Particle Debugger gives you the power of professional debugging at a fraction of the cost. Using this accessory, you’ll be able to program Particle mesh-ready hardware over common interfaces like JTAG and SWD, using open source tools like GDB and openocd.

Supports the open source [CMSIS-DAP specification](https://os.mbed.com/handbook/DAPLink) and DAPLink firmware developed by ARM. On Mac, Linux, and Windows it requires no additional device drivers. 

It also provides a USB to TTL serial port. This requires no device drivers on Mac, Linux, or Windows 10 or later, but you may need to [install a device driver](https://os.mbed.com/docs/v5.9/tutorials/windows-serial-driver.html) for earlier versions of Windows to use the serial port feature.

Comes with one JTAG ribbon cable.

For more information about debugging see the [JTAG FAQ](/support/particle-tools-faq/jtag/). Future version of Particle Workbench will support the Particle Debugger as well. The design is open source and the design files are available [here](https://github.com/particle-iot/debugger).

### Debugging mesh devices

Connecting a Argon, Boron, or Xenon to the debugger is as easy as connecting the included ribbon cable, as pictured below. It's keyed so it will only go in one way. The devices ship with a small plastic protective plug in the debugging connector; make sure you remove that first.

![Debugger](/assets/images/debugger2.jpg)

### Debugging legacy platforms

Using the headers on the Particle Debugger you can attach it to other ARM processor devices like the STM32 in the Particle Photon, P1, Electron, and E Series for SWD (serial wire debug).

With the debugger positioned like this, USB connector toward you and the headers facing up:

![Debugger](/assets/images/debugger1.jpg)

| Left Header | Right Header |
| --- | ----- |
| VDD | SWCLK |
| RTS | SWDIO |
| RX  | NC    |
| TX  | NC    |  
| CTS | GND   | 
| GND | VUSB  |

In order to use SWD debugging you need to connect:

- D7: SWDIO
- D6: SWCLK
- GND

## FeatherWing Tripler

<div align=center><img src="/assets/images/accessories/mesh-tripler-top-view.png" ></div>

Perfect for any prototyping project, the Tripler provides space to add-on up to two FeatherWing accessories without any stacking header needs. Compatible with the newest generation of Particle developer kits (Particle Mesh).

The Tripler has three breakouts for each pin on a Feather, as well as plain grid proto holes. In addition, three sets of pins are cross connected with a full strip of connected pads for GND and 3.3V.




