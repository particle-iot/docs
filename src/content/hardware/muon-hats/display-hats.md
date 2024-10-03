---
title: Display hats
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-pins,api-helper-projects,zip]
---

# {{title}}

There are a number of Raspberry Pi hat displays available.



## Color 1.44 128x128 display (ST7735S)

This hat is listed as Waveshare 1.44inch LCD Display HAT for Raspberry Pi 128x128 with Embedded Controller Communicating via SPI Interface
([Amazon](https://www.amazon.com/gp/product/B077YK8161/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&th=1), [Waveshare](https://www.waveshare.com/product/displays/lcd-oled/lcd-oled-3/1.44inch-lcd-hat.htm)).

- LCD display HAT for Raspberry Pi, 1.44inch diagonal, 128x128 pixels, with embedded controller, communicating via SPI interface.
- 1x joystick (5-position), 3x pushbuttons
- RGB, 65K color
- ST7735S ("green tab")
- [Manual](https://www.waveshare.com/wiki/1.44inch_LCD_HAT)

{{> api-helper-pins mappings="1=3V3,6=GND,GPIO21=Key 1,GPIO20=Key 2,GPIO16=Key 3,GPIO6=Joystick Up,GPIO19=Joystick Down,GPIO5=Joystick Left,GPIO26=Joystick Right,GPIO13=Joystick Press,GPIO11=SPI SCLK,GPIO10=SPI MOSI,GPIO25=DC Display/Command,GPIO8=SPI CS,GPIO27=RST Display Reset,GPIO24=BL Display backlight" platform="Muon" style="columns=hat"}}


To use this display, use the `Adafruit_ST7735_RK` library. The [Adafruit_ST7735_RK github](https://github.com/rickkas7/Adafruit_ST7735_RK) contains a README and example code. The pi-hat example works with this board.

The initialization code is typically:

```cpp
#define TFT_CS        A6
#define TFT_RST       A5
#define TFT_DC        D22

Adafruit_ST7735 tft = Adafruit_ST7735(&SPI, TFT_CS, TFT_DC, TFT_RST);
```

This sample uses the display and also handles debouncing the buttons.

{{> project-browser project="display-button-hat" default-file="src/display-button-hat.cpp" height="500" flash="false"}}

As of Device OS 5.9.0, it's not possible to read `IOEX_PB7` from user firmware, so you won't be able to interpret the joystick right button.


![](/assets/images/muon-hats/display-hats/st7735.jpeg)



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
#define OLED_RESET D22

Adafruit_SSD1305 display(128, 32, &SPI, OLED_DC, OLED_RESET, OLED_CS, 7000000UL);
```

{{> api-helper-pins mappings="1=3V3,6=GND,GPIO10=SPI MOSI,GPIO11=SPI SCLK,GPIO8=SPI CS,GPIO24=DC Display/control,GPIO25=RST Display reset" platform="Muon" style="columns=hat"}}


![](/assets/images/muon-hats/display-hats/ssd1305.jpeg)

