---
title: Automation hats
layout: commonTwo.hbs
columns: two
includeDefinitions: [api-helper,api-helper-cloud,api-helper-pins,api-helper-projects,zip]
---

# {{title}}

This page covers hats used in home automation, environmental monitoring, or robotics.


## Pimoroni automation hat

This hat includes a large number of inputs and outputs. ([Pimoroni](https://shop.pimoroni.com/products/automation-hat?variant=30712316554), [Adafruit](https://www.adafruit.com/product/3289)).

- 3 x 24V @ 2A relays (NC and NO terminals)
- 3 x 12-bit ADC @ 0-24V (±2% accuracy)
- 3 x 24V tolerant buffered inputs
- 3 x 24V tolerant sinking outputs
- 15 x channel indicator LEDs
- 1 x 12-bit ADC @ 0-3.3V (not available on Muon!)
- 3.5mm screw terminals

![](/assets/images/muon-hats/automation-hats/pimoroni-automation-hat.png)

The [pinout](https://pinout.xyz/pinout/automation_hat) is as follows:

{{> api-helper-pins mappings="1=3V3,2=5V,6=GND,3=SDA,5=SCL,29=Output 1,31=Output 3,32=Output 2,33=Relay 1,35=Relay 2,36=Relay 3,37=Input 1,38=Input 2,40=Input 3" platform="Muon" style="columns=hat"}}

Note that both 3V3 (for logic) and 5V (for relays and LEDs) are used on this board. 

There are two chips connected by I2C on the hat:

| Chip    | Description | I2C Address |
| :------ | :--- | :--- |
| SN3218  | 18-channel LED driver | 0x54 |
| ADS1015 | Analog to digital converter | 0x48 |

The ADS1015 ADC cannot be accessed on the Muon. The problem is that I2C Address 0x48 is used by both the ADS1015 on the automation hat as well as
the TMP112A temperature sensor on the Muon itself. These will conflict with each other, allowing neither to be used.

The LEDs are controlled by a SN3218 LED driver chip. The [SN3218_RK](https://github.com/rickkas7/SN3218_RK) library can be used to manage the LEDs.

### Relays - Pimoroni automation hat

All three relays can be activated using the GPIO in the table above. Note that you must set the `pinMode` once (typically during setup) before you can use `digitalWrite`.

```cpp
pinMode(D4, OUTPUT);
digitalWrite(D4, HIGH);
```

### Sample code

This sample code shows how to set outputs (relay or digital) and get digital input values.

{{> project-browser project="automation-hat" default-file="src/automation-hat.cpp" height="500" flash="true"}}

It implements a Particle.function to set the digital and relay output values. In also implements a Particle.variable to get the digital input values.


### ADC - Pimoroni automation hat

ADC inputs 1 - 3 cannot be used on the Muon. The problem is that I2C Address 0x48 is used by both the ADS1015 on the automation hat as well as
the TMP112A temperature sensor on the Muon itself. These will conflict with each other, allowing neither to be used.

### Digital inputs - Pimoroni automation hat

Digital inputs Input 2 and Input 3 can be read using `digitalRead()`. The value will be `HIGH` or `LOW` (1 or 0, respectively).

Digital Input 1 cannot be read with Device OS 5.9.0 as it does not allow reading of pins from the I/O expander (IOEX_PB7) at this time.

When using the sample code above, you can request the variable named `input` and it will return a JSON object with the input values:

```sh
% particle variable get my-muon input 
{"input2":0,"input3":0}
```

You can also request variables from the [Particle console](https://console.particle.io/) in the device view.


### Digital outputs - Pimoroni automation hat

All three digital output can be used. Note that you must set the `pinMode` once (typically during setup) before you can use `digitalWrite`.

```cpp
pinMode(A0, OUTPUT);
digitalWrite(A0, HIGH);
```

When using the sample code above, you can call the function `output` and it will allow you to set one or more values:

```sh
% particle call my-muon output '{"relay1":1}'
% particle call my-muon output '{"relay1":0,"output1":1}'
```

Note that the digital outputs (`output1`, `output2`, `output3`) are low-side sink outputs, meaning they provide the connection to GND when turned on. If you are testing the output using a digital multimeter, put it in resistance (ohm) mode, and measure the resistance between the output and GND. If 0 &ohm; then the output is turned on (1).

### LEDs - Pimoroni automation hat

The LEDs are controlled by a SN3218 LED driver chip. The [SN3218_RK](https://github.com/rickkas7/SN3218_RK) library can be used to manage the LEDs.

When using the sample code above, you can call the function `output` and it will allow you to set one or more LEDs on or off:

```sh
% particle call my-muon output '{"led0":1}'
% particle call my-muon output '{"led0":0,"led3":1}'
```

You can also set the PWM (brightness) value from 0 - 255. The sample code sets it to 128 during setup.

```sh
% particle call my-muon output '{"pwm0":255,"led0":1}'
```


## Pimoroni enviro + air quality (PIM458)


- BME280 temperature, pressure, humidity sensor
- LTR-559 light and proximity sensor 
- MICS6814 analog gas sensor
- ADS1015 analog to digital converter (ADC)
- MEMS microphone (datasheet) (see below)
- 0.96" color LCD (160x80, ST7735) (see below)
- Connector for particulate matter (PM) sensor (available separately)

![](/assets/images/muon-hats/automation-hats/pimoroni-enviro-hat.png)


The [pinout](https://pinout.xyz/pinout/enviro_plus) is as follows:

{{> api-helper-pins mappings="1=3V3,2=5V,6=GND,3=SDA,5=SCL,8=PMS5003 TX,10=PMS5003 RX,12=Mic I2S CLK,13=PMS5003 Reset,15=PMS5003 Enable,16=ADS1015 Alert,18=Gas heater enable,19=SPI MOSI,21=LCD D/C,23=SPI SCLK,26=LCD CS,32=LCD backlight,35=Mic I2S FS,38=Mic I2S Data" platform="Muon" style="columns=hat"}}

| Chip    | Description | I2C Address |
| :------ | :--- | :--- |
| LTR559  | Light sensor | 0x23 |
| ADS1015 | Analog to digital converter | 0x49 |
| BME280  | Temperature and humidity sensor | 0x76 |


While the ADS1015 ADC is not available on the automation hat, it is available on the enviro hat because it's configured to use I2C address 0x49 so it does not conflict with the TMP112A temperature sensor on the Muon itself.

The ST7735 LCD display is not useable because the D/C pin (input to display) uses the Pi expansion pin 21 (GPIO9), which is also SPI MISO. The display never sends data to the MCU, and the hat doesn't otherwise use SPI, however the RTL872x SPI does not allow the MISO pin to be used as GPIO while SPI is active. It is possible that a workaround will be found, but right now it does not work.

The I2S microphone is supported by the Muon hardware, but a library is not available at this time. It is expected to be available in the future.

The LTR559 light sensor can be accessed using the [LTR559_RK](https://github.com/rickkas7/LTR559_RK/) library. It provides basic access
the read the proximity sensor (PS) and automatic light sensor (ALS) data. Since the interrupt line from the LTR559 is not connected to 
the hat interface, you can't use hardware interrupts with it.

The PMS5003 particulate matter sensor is not currently working for unknown reasons but should be possible to make work.

### Sample code

{{> project-browser project="enviro-hat" default-file="src/enviro-hat.cpp" height="500" flash="true"}}
