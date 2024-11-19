---
title: NeoPixel
layout: commonTwo.hbs
columns: two
description: Using NeoPixel LEDs with your Particle IoT device
includeDefinitions: [api-helper,api-helper-cloud,api-helper-projects,zip]
---

# {{title}}

NeoPixels are individually addressable "smart" LEDs including WS2812, WS2811, and SK6812 LEDs. They work great on Particle devices!

- NeoPixels only require a single GPIO for any number of LEDs (limited by RAM, available power, and the refresh speed)
- Each pixel can be programmed to an a specific RGB (red, green, blue) color

They're available in many form-factors:

- Strips
- Flexible strands and ropes
- Matrix panels
- Special shapes like rings
- Individual chips for use on your own board

The [Adafruit NeoPixel guide](https://learn.adafruit.com/adafruit-neopixel-uberguide/the-magic-of-neopixels) has a great 
deal of information if you are starting out with addressable LEDs.


## Power

The NeoPixels typically require 3.7 to 5V.

If you have a small number of pixels (less than 16 or so):

- If you are using a USB-powered device like the Photon 2 pictured below, you can use VUSB.
- If you are using a battery powered device with a LI+ connector, you can use that.

If you have a large number of pixels, you will typically need an external 5V power supply.

There must be a common ground connection between the pixels and Particle device, as well as any external power supply.

## Data

The data line to use depends on your device.

Additionally, some NeoPixels powered at 5V will not work properly with the 3.3V GPIO on Particle devices. A
level shifter such as the 74AHCT125 or 74HCT245 may be required.


### Photon 2/P2

There are only two pins that can be for NeoPixel on the Photon 2 and P2:

| Pin | PIXEL_PIN |
| :---: | :--- |
| MOSI | `SPI` |
| D2 | `SPI1` |

Use `SPI` or `SPI1` as the `PIXEL_PIN` on Photon 2/P2. For example:

```cpp
#define PIXEL_COUNT 10
#define PIXEL_PIN SPI
#define PIXEL_TYPE WS2812B
Adafruit_NeoPixel strip(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
```

### Gen 3 (Argon, Boron, B-SoM)

These pins can be used:

 - D2, D3, A4, A5
 - D4, D6, D7, D8
 - A0, A1, A2, A3

Set `PIXEL_PIN` to be the pin you have selected. For example:

```cpp
#define PIXEL_COUNT 10
#define PIXEL_PIN D2
#define PIXEL_TYPE WS2812B
Adafruit_NeoPixel strip(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
```


Normally you only use a single pin for NeoPixels, but if you do have multiple pixels you
can only select one from each group.

### Gen 2

On Gen 2 devices, any pin can be used for NeoPixels, and multiple pins can be used in any combination.

![Neopixel](/assets/images/neopixel-ring.jpeg)


## Example source 

{{> project-browser project="neopixel-example" default-file="src/neopixel-example.cpp" height="400" flash="false"}}


## Library Documentation

### `Adafruit_NeoPixel`

```
// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_COUNT 10
#define PIXEL_PIN D2
#define PIXEL_TYPE WS2812B
Adafruit_NeoPixel strip(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
```

Creates an object to interact wth a NeoPixel strip.

`PIXEL_COUNT` is the number of pixels in strip.

_Note: for some stripes like those with the TM1829, you need to count the number of segments, i.e. the number of controllers in your stripe, not the number of individual LEDs!_

`PIXEL_PIN` is the pin number where your NeoPixel are connected (A0-A7, D0-D7, etc). If omitted, D2 is used.

On Photon, Electron, P1, Core and Duo, any pin can be used for Neopixel.

On the Argon, Boron and Xenon, only these pins can be used for Neopixel:
- D2, D3, A4, A5
- D4, D6, D7, D8
- A0, A1, A2, A3

In addition on the Argon/Boron/Xenon, only one pin per group can be used at a time. So it's OK to have one Adafruit_NeoPixel
instance on pin D2 and another one on pin A2, but it's not possible to have one on pin A0 and another
one on pin A1.

`PIXEL_TYPE` is the type of LED, one of WS2811, WS2812, WS2812B, WS2812B2, WS2813, TM1803, TM1829, SK6812RGBW. If omitted, WS2812B is used.

_Note: For legacy 50us reset pulse timing on WS2812/WS2812B or WS2812B2, select WS2812B_FAST or WS2812B2_FAST respectively.  Otherwise, 300us timing will be used._

_Note: RGB order is automatically applied to WS2811, WS2812/WS2812B/WS2812B2/WS2813/TM1803 is GRB order._

### `begin`

`strip.begin();`

Sets up the pin used for the NeoPixel strip.

### `setPixelColor`
### `setColor`

```
strip.setPixelColor(num, red, green, blue);
strip.setPixelColor(num, red, green, blue, white);
strip.setPixelColor(num, color);
strip.setColor(num, red, green, blue);
strip.setColor(num, red, green, blue, white);
```

Set the color of LED number `num` (0 to `PIXEL_COUNT-1`). `red`,
`green`, `blue`, `white` are between 0 and 255. White is only used for
RGBW type pixels. `color` is a color returned from [`Color`](#color).

The brightness set with `setBrightness` will modify the color before it
is applied to the LED.

### `show`

`strip.show();`

Displays the colors on the NeoPixel strip that were set with `setPixelColor` and other calls that change the color of LEDs.

This function takes some time to run (more time the more LEDs you have) and disables interrupts while running.

### `clear`

`strip.clear();`

Set all LED color to off. Will take effect on next `show()`.

### `setBrightness`

`strip.setBrightness(brightness);`

Make the LED less bright. `brightness` is from 0 (off) to 255 (max brightness) and defaults to 255.

This factor is not linear: 128 is not visibly half as bright as 255 but almost as bright.

### `getBrightness`

`uint8_t brightness = strip.getBrightness();`

Get the current brightness.

### `setColorScaled`

```
strip.setColorScaled(num, red, green, blue, scaling);
strip.setColorScaled(num, red, green, blue, white, scaling);
```

Set the color of LED number `num` and scale that color non-linearly according to the `scaling` parameter (0 to 255).

### `setColorDimmed`

```
strip.setColorDimmed(num, red, green, blue, brightness);
strip.setColorDimmed(num, red, green, blue, white, brightness);
```

Set the color of LED number `num` and dim that color linearly according to the `brightness` parameter (0 to 255). In this case 128 should look half as bright as 255.

### `Color`

```
uint32_t color = strip.Color(red, green, blue);
uint32_t color = strip.Color(red, green, blue, white);
```

Make a color from component colors. Useful if you want to store colors in a variable or pass them as function arguments.

### `getPixelColor`

`uint32_t color = strip.getPixelColor();`

Get the current color of an LED in the same format as [`Color`](#color).

### `setPin`

`strip.setPin(pinNumber);`

Change the pin used for the NeoPixel strip.

### `updateLength`

`strip.updateLength(n);`

Change the number of LEDs in the NeoPixel strip.

### `getPixels`

`uint8_t *pixels = strip.getPixels();`

Get the raw color data for the LEDs.

### `getNumLeds`
### `numPixels`

```
uint16_t n = strip.getNumLeds();
uint16_t n = strip.numPixels();
```

Get the number of LEDs in the NeoPixel strip. `numPixels` is an alias for `getNumLeds`.
