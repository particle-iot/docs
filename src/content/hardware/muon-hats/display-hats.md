---
title: Display hats
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

There are a number of Raspberry Pi hat displays available.


## SSD1305 Monochrome OLED

This hat is listed as 2.23 inch OLED Display HAT for Raspberry Pi 2B/3B/4B/Zero/Zero W Jetson Nano 128×32 Pixels SPI/I2C Interface
([Amazon](https://www.amazon.com/Display-Raspberry-Jetson-Interface-XYGStudy/dp/B07Z2GG5K3/ref=sr_1_6), 
[Waveshare](https://www.waveshare.com/product/raspberry-pi/displays/oled/2.23inch-oled-hat.htm)).

To use this display with the Muon, use the Particle port of the Adafruit SSD1305 library. It's in the community libraries
as `Adafruit_SSD1305_RK` and the [Adafruit_SSD1305_RK Github](https://github.com/rickkas7/Adafruit_SSD1305_RK) contains 
the source and README. The example `pi-hat` works with this display.


The important parameters for this display are:

```cpp
#define OLED_CS A6 
#define OLED_DC D25
#define OLED_RESET PIN_INVALID

Adafruit_SSD1305 display(128, 32, &SPI, OLED_DC, OLED_RESET, OLED_CS, 7000000UL);
```

| Display Pin | Pi Name | Pi Pin | Muon Pin | Description |
| :--- | :--- | :--- | :--- | :--- |
| VCC | 3V3    |  1 | 3V3  | 3.3V power |
| GND | GND    |  6 | GND  | Ground |
| DIN | SPI0 MOSI / GPIO10 | 19 | MOSI | SPI MOSI |
| CLK | SPI0 SCLK / GPIO11 | 23 | SCK  | SPI CLK |
| CS  | CE0 / GPIO8 | 24  | A6 | SPI CS |
| DC  | GPIO24 | 18 | D25 | Display/control (from MCU) |
| RST | GPIO25 | 22 | IOEX_PB7 | Display reset |

The reset line is set to `PIN_INVALID` as GPIO25 is connected to the I/O expander and there isn't support for
using that GPIO in Device OS 5.9.0.

![](/assets/images/muon-hats/display-hats/ssd1305.jpeg)





