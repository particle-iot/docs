---
title: Environmental HATs
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-pins,api-helper-projects,zip]
---

# {{title}}

This page covers HATs used in environmental monitoring.

## Pimoroni enviro + air quality (PIM458)

- BME280 temperature, pressure, humidity sensor
- LTR-559 light and proximity sensor 
- MICS6814 analog gas sensor
- ADS1015 analog to digital converter (ADC)
- MEMS microphone (datasheet) (see below)
- 0.96" color LCD (160x80, ST7735) (see below)
- Connector for particulate matter (PM) sensor (available separately)

![](/assets/images/muon-hats/automation-hats/pimoroni-enviro-hat.png)

This HAT is available at [Pimoroni](https://shop.pimoroni.com/products/enviro?variant=31155658457171) and [DigiKey](https://shop.pimoroni.com/products/enviro?variant=31155658457171), as well as other locations.

The [pinout](https://pinout.xyz/pinout/enviro_plus) is as follows:

{{> api-helper-pins mappings="1=3V3,2=5V,6=GND,3=SDA,5=SCL,8=PMS5003 TX,10=PMS5003 RX,12=Mic I2S CLK,13=PMS5003 Reset,15=PMS5003 Enable,16=ADS1015 Alert,18=Gas heater enable,19=SPI MOSI,21=LCD D/C,23=SPI SCLK,26=LCD CS,32=LCD backlight,35=Mic I2S FS,38=Mic I2S Data" platform="Muon" style="columns=hat"}}

There are three I2C sensors:

| Chip    | Description | I2C Address |
| :------ | :--- | :--- |
| LTR559  | Light sensor | 0x23 |
| ADS1015 | Analog to digital converter | 0x49 |
| BME280  | Temperature and humidity sensor | 0x76 |

While the ADS1015 ADC is not available on the automation HAT, it is available on the enviro HAT because it's configured to use I2C address 0x49 so it does not conflict with the TMP112A temperature sensor on the Muon itself.

The ST7735 LCD display is not useable because the D/C pin (input to display) uses the Pi expansion pin 21 (GPIO9), which is also SPI MISO. The display never sends data to the MCU, and the hat doesn't otherwise use SPI, however the RTL872x SPI does not allow the MISO pin to be used as GPIO while SPI is active. It is possible that a workaround will be found, but right now it does not work.

The I2S microphone is supported by the Muon hardware, but a library is not available at this time. It is expected to be available in the future.

The LTR559 light sensor can be accessed using the [LTR559_RK](https://github.com/rickkas7/LTR559_RK/) library. It provides basic access
the read the proximity sensor (PS) and automatic light sensor (ALS) data. Since the interrupt line from the LTR559 is not connected to 
the HAT interface, you can't use hardware interrupts with it.

The PMS5003 particulate matter sensor is not currently working for unknown reasons. The data stream is not coming off the
sensor but the library and setup is in place.

### Sample code

{{> project-browser project="enviro-hat" default-file="src/enviro-hat.cpp" height="500" flash="true"}}
