# Adafruit_ILI9341_RK

*Port of Adafruit TFT FeatherWing - 2.4" 320x240 Touchscreen for Particle Argon/Boron/Xenon*

The [Adafruit TFT FeatherWing](https://www.adafruit.com/product/3315) has a touch screen display on the front and a socket for any Feather on the back, including the Particle Argon, Boron, and Xenon. You can find [technical information](https://learn.adafruit.com/adafruit-2-4-tft-touch-screen-featherwing) at Adafruit.

There aren't any wires necessary, but it does use the following pins:

- SPI (SCK, MISO, MOSI)
- SD (SD card CS) = D2
- RT (Touch screen CS) = D3
- TFT_CS (display) = D4
- D/C (display) = D5

This library is also uses:

- [Adafruit\_GFX\_RK](https://github.com/rickkas7/Adafruit_GFX_RK)

There are two Adafruit examples:

- examples/graphicstest\_featherwing
- examples/touchpaint\_featherwing

If you are looking for the 3.5" TFT Featherwing, check out [Adafruit\_HX8357\_RK](https://github.com/rickkas7/Adafruit_HX8357_RK) instead.


## Original Adafruit Readme for the ILI9341

This is a library for the Adafruit ILI9341 display products

This library works with the Adafruit 2.8" Touch Shield V2 (SPI)
  * http://www.adafruit.com/products/1651

Adafruit 2.4" TFT LCD with Touchscreen Breakout w/MicroSD Socket - ILI9341
  * https://www.adafruit.com/product/2478

2.8" TFT LCD with Touchscreen Breakout Board w/MicroSD Socket - ILI9341
  * https://www.adafruit.com/product/1770

2.2" 18-bit color TFT LCD display with microSD card breakout - ILI9340
  * https://www.adafruit.com/product/1480

TFT FeatherWing - 2.4" 320x240 Touchscreen For All Feathers 
  * https://www.adafruit.com/product/3315

Check out the links above for our tutorials and wiring diagrams.
These displays use SPI to communicate, 4 or 5 pins are required
to interface (RST is optional).

Adafruit invests time and resources providing this open source code,
please support Adafruit and open-source hardware by purchasing
products from Adafruit!

Written by Limor Fried/Ladyada for Adafruit Industries.
MIT license, all text above must be included in any redistribution

To download. click the DOWNLOADS button in the top right corner, rename the uncompressed folder Adafruit_ILI9341. Check that the Adafruit_ILI9341 folder contains Adafruit_ILI9341.cpp and Adafruit_ILI9341.

Place the Adafruit_ILI9341 library folder your arduinosketchfolder/libraries/ folder. You may need to create the libraries subfolder if its your first library. Restart the IDE

Also requires the Adafruit_GFX library for Arduino.

## Version History

#### 1.2.3 (2020-08-02)

- Update Adafruit_GFX_RK to 1.5.8
- Modify examples to not rely on copy constructor which is not implemented in Adafruit_SPITFT


#### 1.2.2 (2020-02-19)

- Update Adafruit_GFX_RK to 1.5.6
- Added default SPI speed
