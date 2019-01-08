---
title: Feather
layout: community.hbs
columns: two
order: 15
---


# Adafruit Feather Accessories

The mesh prototyping devices (Argon, Boron, and Xenon) use the [Adafruit Feather form-factor](https://learn.adafruit.com/adafruit-feather/feather-specification). You can easily add displays, sensors, easily, even if the FeatherWing was not made by Particle.

## Doubler and Tripler

The Doubler and Tripler boards allow easy integration with feather accessories:

![Tripler](/assets/images/accessories/mesh-tripler-top-view.png)

The Tripler has three breakouts for each pin on a Feather, as well as plain grid proto holes. In addition, three sets of pins are cross connected with a full strip of connected pads for GND and 3.3V.

For example, you can easily build a GPS with display by using a tripler with the Adafruit Ultimate GPS FeatherWing and the FeatherWing OLED Display 128x32, no soldering necessary!

![GPS Display Tripler](/assets/images/gps-display-featherwing.jpg)

- The Tripler is available from the [Particle Online Store](https://store.particle.io/products/particle-featherwing-tripler) or [Adafruit](https://www.adafruit.com/product/3417).
- The Doubler is available from [Adafruit](https://www.adafruit.com/product/2890).

Note that you can only include one Particle device in a double or tripler. Putting both an Argon and a Boron, for example, in two of the slots can cause permanent damage to the devices. This also applies to other Feather compatible MCUs, for example you couldn't include both a Boron and a ESP8266 Feather, either.

## Displays

### Adafruit FeatherWing OLED Display 128x32

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


### Adafruit TFT FeatherWing - 2.4" 320x240 Touchscreen 

If you need a bigger display, the [Adafruit TFT FeatherWing - 2.4" 320x240 Touchscreen](https://www.adafruit.com/product/3315) works great. 

![2.4 Display](/assets/images/feather-2.4-display.jpg)

This does not work with the doubler or tripler; you insert the Argon, Boron, or Xenon in the back of the unit. It also includes an SD card reader.

![2.4 Display Back](/assets/images/feather-2.4.jpg)

- The [Adafruit_ILI9341_RK](https://github.com/rickkas7/Adafruit_ILI9341_RK) library supports the touchscreen and display.
- The [SdFat](https://build.particle.io/libs/SdFat/0.0.7/tab/SdFat.h) library supports the SD card reader.

The following pins are used:

| Pin | Notes |
| --- | --- |
| SCK | SPI Clock |
| MISO | SPI Master In |
| MOSI | SPI Master Out |
| D2 | SD Card CS (chip select) |
| D3 | Touchscreen CS |
| D4 | Display CS |
| D5 | Display D/C |



### Adafruit TFT FeatherWing - 3.5" 480x320 Touchscreen 

If you need an even bigger display, the [Adafruit TFT FeatherWing - 3.5" 480x320 Touchscreen ](https://www.adafruit.com/product/3651) works great. This does not work with the doubler or tripler; you insert the Argon, Boron, or Xenon in the back of the unit. It also includes an SD card reader.

![3.5 Display Back](/assets/images/feather-3.5.jpg)

- The [Adafruit_HX8357_RK](https://github.com/rickkas7/Adafruit_HX8357_RK) library supports the touchscreen and display.
- The [SdFat](https://build.particle.io/libs/SdFat/0.0.7/tab/SdFat.h) library supports the SD card reader.

| Pin | Notes |
| --- | --- |
| SCK | SPI Clock |
| MISO | SPI Master In |
| MOSI | SPI Master Out |
| D2 | SD Card CS (chip select) |
| D3 | Touchscreen CS |
| D4 | Display CS |
| D5 | Display D/C |


### Adafruit DotStar FeatherWing - 6 x 12 RGB LEDs

The [Adafruit DotStar FeatherWing - 6 x 12 RGB LEDs](https://www.adafruit.com/product/3449) provides 72 individually controllable RGB LEDs. This provides for a bright matrix display that can be powered either by USB or the LiPo battery.

![Feather DotStar](/assets/images/feather-dotstar.jpg)

- Use the "[Adafruit\_DotStarMatrix\_RK](https://github.com/rickkas7/Adafruit_DotStarMatrix_RK)" library 

| Pin | Notes |
| --- | --- |
| D8 | Clock |
| D6 | Data |

You can learn more about using the DotStartMatrix library from the [Adafruit Tutorial](https://learn.adafruit.com/adafruit-dotstar-leds/dotstarmatrix-library). You can use it to draw graphics and text on the display.

### Adafruit 4-Digit 7-Segment LED Matrix Display FeatherWing

The [Adafruit 4-Digit 7-Segment LED Matrix Display FeatherWing](https://www.adafruit.com/product/3088) provides a numeric clock-like 0.56" high display and is available in several colors (blue, green red, white, and yellow).

![Feather 7-segment](/assets/images/feather-7seg.jpg)

It connects by I2C:

| Pin | Notes |
| --- | --- |
| D0 | SDA (I2C Data) |
| D1 | SCL (I2C Clock) |

You can learn more about this display at the [Adafruit Tutorial](https://learn.adafruit.com/adafruit-7-segment-led-featherwings/overview).

Use the Adafruit_LEDBackpack_RK library. The object to use for this display is:

```
Adafruit_7segment matrix = Adafruit_7segment();
```

There's Particle sample code to use it as a digital clock in the [Feather Clock Example](https://go.particle.io/shared_apps/5c33b28b2872bdbc4300028f).


### Adafruit 14-Segment Alphanumeric LED FeatherWing

The [Adafruit 14-Segment Alphanumeric LED FeatherWing](https://www.adafruit.com/product/3089) is similar to the previous one, except it can also display alphabetic characters.

![Feather alpha 4](/assets/images/feather-alpha4.jpg)

It connects by I2C:

| Pin | Notes |
| --- | --- |
| D0 | SDA (I2C Data) |
| D1 | SCL (I2C Clock) |

Use the Adafruit_LEDBackpack_RK library. The object to use for this display is:

```
Adafruit_AlphaNum4 alpha4 = Adafruit_AlphaNum4();
```

There's Particle sample code to use it as a small ticker display in the [Feather Ticker Example](https://go.particle.io/shared_apps/5c349834e1b63bd1fc000e77).

You can change the message by calling the setMessage function. And adjust the speed using the setSpeed function. The default speed is 250 (milliseconds between updates). Smaller number make it go faster.


## Relays

### Adafruit Power Relay FeatherWing

The [Adafruit Power Relay FeatherWing](https://www.adafruit.com/product/3191) can switch 10A at 120VAC or 5A at 240 VAC with a SPDT power relay.

![Power Relay FeatherWing](/assets/images/feather-power-relay.jpg)

In order to configure which GPIO controls the relay, you need to solder closed one of the solder jumpers on the bottom. Only solder one closed!

![Power Relay FeatherWing Underside](/assets/images/feather-power-relay-bottom.png)

Top row (12-pin side), left to right, viewed from the bottom:

| Pin | Notes |
| --- | --- |
| D4 | Do not use if using Ethernet |
| D5 | Do not use if using Ethernet |
| D6 | |
| D7 | This is also the blue LED next to the USB connector |
| D8 | |

Bottom row (16-pin side), left to right, viewed from the bottom:

| Pin | Notes |
| --- | --- |
| A6 | SCK, do not use if using SPI or Ethernet |
| A5 | |
| A4 | |
| A2 | |
| A1 | |
| A0 | |


To control the LED, set the pin to output mode, typically in setup():

```
pinMode(D6, OUTPUT);
```

To close the relay, use:

```
digitalWrite(D6, HIGH);
```

To open the relay, use:

```
digitalWrite(D6, LOW);
```

## Sensors

### Adafruit INA219 FeatherWing

The [Adafruit INA219 FeatherWing](https://www.adafruit.com/product/3650) is used to sense voltage and current.

![INA219](/assets/images/feather-ina219.jpg)

It connects by I2C:

| Pin | Notes |
| --- | --- |
| D0 | SDA (I2C Data) |
| D1 | SCL (I2C Clock) |

There is a port of the Adafruit library available:

- [adafruit-ina219](https://github.com/cyberlord8/adafruit-ina219) library

## Other Accessories

### Adafruit Ultimate GPS FeatherWing

![Ultimate GPS](/assets/images/gps-display-featherwing.jpg)

The [Adafruit Ultimate GPS FeatherWing](https://www.adafruit.com/product/3133) provides an easy way to add GPS (Global Positioning System) capabilities to your project. 

The PA6H GPS chip connects to Serial1 (RX and TX). You can use either of these libraries (only include one):

- The official "AssetTracker" library
- The "[AssetTrackerRK](https://github.com/rickkas7/AssetTrackerRK)" library

Sample code for the GPS with LCD display can be [found here](https://go.particle.io/shared_apps/5c2f372ae71c123a8b00125e).

### Particle Ethernet FeatherWing

![Particle Ethernet FeatherWing](/assets/images/accessories/ethernet-featherwing/ethernet-featherwing.png)

The Ethernet FeatherWing is the fastest way to add wired connectivity to your Argon, Boron, or Xenon and turns any Particle Mesh developer kit into an Ethernet gateway. Based on the WIZnet W5500 chip, this side-by-side FeatherWing maintains great RF performance even while adding Ethernet connectivity to any Particle Mesh device.

The form-factor is based around the Adafruit FeatherWing Tripler. The two side connectors allow you to plug in one Particle Mesh device along with a Feather accessory.

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

If you are using the [Adafruit Ethernet Feather Wing](https://www.adafruit.com/product/3201), be sure to connect the nRESET and nINTERRUPT pins (on the small header on the short side) to pins D3 and D4 with jumper wires. These are required for proper operation.