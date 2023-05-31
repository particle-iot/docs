---
title: Edge AI kit
columns: two
layout: commonTwo.hbs
description: Edge AI kit
---

# {{title}}

The Edge AI kit provides a number of accessories that can be used with your Particle Photon 2 device. While the parts in the kit can be used with other Particle devices, the Edge AI features will only work on the P2 and Photon 2 at this time because of the limited amount of flash and RAM on older devices.

## Kit components

### ADXL362 (GY362) accelerometer breakout

This breakout board allows you to detect motion and orientation. Using Edge AI you can filter for certain types of motion. It can also be used for wake-on-motion to wake from sleep. 

See the [Accelerometer example](#accelerometer-example), below, for more details.

### PDM MEMS microphone

This breakout board is a digital microphone. It's intended for voice applications, not high-fidelity recording. Using Edge AI you cam implement similar voice commands using the microphone. It can also be used to detect specific sounds, such as an alarm siren.

![](/assets/images/edge-kit/mic-1.jpeg)

![](/assets/images/edge-kit/mic-2.jpeg)

See the [PDM MEMS microphone example](#pdm-mems-microphone-example), below, for more details.

### SW18020P vibration sensor

The vibration sensor a simple digital output that detects motion. This is simpler to use than the accelerometer, but less flexible.


### GP2Y0A710K0F 100-550cm IR Distance sensor

This sensor measures distance, and provides an analog output that is proportional to distance that you can connect to an `A` pin and use `analogRead()` to read. Note that this sensor requires 5V so you cannot use it when powered by a LiPo battery but it will work when connected to USB. The analog output is a maximum of 3V so it's safe to connect to an analog input, which supports a maximum of 3.3V.

![](/assets/images/edge-kit/distance-1.jpeg)

![](/assets/images/edge-kit/distance-2.jpeg)


### Loudness sensor with LM2904 opamp

The loudness sensor provides an analog output that is proportional to the loudness. This is easier to use than the microphone, but of course only detects that there is sound, not its specific characteristics. This sensor requires 3.6V minimum, so it's best to use it powered by VUSB, but this means that you will not be able to use it when powered by a LiPo battery.

Care should be used when setting the adjustable gain - if you set it to maximum gain and it is very loud, the output could exceed the recommended maximum of 3.3V on analog inputs.

![](/assets/images/edge-kit/loudness-1.jpeg)

![](/assets/images/edge-kit/loudness-2.jpeg)

### MQ2 gas sensor for LPG, i-butane, propane, methane, alcohol

This is a sensor for detecting the presence of various combustible gasses. It requires 5V so you cannot use it when powered by a LiPo battery but it will work when connected to USB. Also, this type of sensor has a small heater inside, which is not well suited for being battery powered.

Care should be used when setting the adjustable gain - if you set it to maximum gain and there is a high concentration of a detectable gas, the output could exceed the recommended maximum of 3.3V on analog inputs.

![](/assets/images/edge-kit/mq2-1.jpeg)

![](/assets/images/edge-kit/mq2-2.jpeg)

### Soil moisture sensor (resistance-type)

The YL-69 soil moisture sensor provides a digital or analog output based on soil moisture. It is not a high-precision sensor.

![](/assets/images/edge-kit/soil-1.jpeg)

The fork-shaped probe connects to the adapter board by the two-pin female-to-female jumper wires. The sensor connects to the two-pin side of the adapter board. There is no polarity on this connection.

![](/assets/images/edge-kit/soil-2.jpeg)

The other side has the following pins:

| Name | Purpose |
| VCC | 3.3V power supply, connect to 3V3 |
| GND | Ground, connect to GND |
| D0 | Digital output, LOW = wet, HIGH = dry |
| A0 | Analog output, closer to 0 = wet, closer to 4095 = dry |

You don't need to connect both D0 and A0, you can use just one of them. The potentiometer controls the moisture level that switches D0 on and off.

- D0 can be connected to any digital (`D`) or analog (`A`) input on your Particle device.
- A0 can be connected to any analog (`A`) input  on your Particle device.

### HC-SR501 PIR motion sensor

This sensor detects heat using a passive infrared (PIR) sensor. It's typically used to sense humans (and other warm-blooded animals). It requires 5V so you cannot use it when powered by a LiPo battery but it will work when connected to USB. The output is only 3.3V so it's safe to connect to any available GPIO.

![](/assets/images/edge-kit/pir-1.jpeg)

### LEDs

Several light-emitting diodes (LEDs) are included in the kit, and can be used as indicator lights. The LEDs in your kit may vary slightly from the items pictured here.

![LEDs](/assets/images/edge-kit/leds.jpeg)

LEDs require a current limiting resistor. Typically you will use 1K&ohm; (Brown - Black - Red - Gold) so the LED will not be overly bright.

You can use  330 &ohm; (Orange - Orange - Brown - Gold) if you need maximum brightness. This will require changing the [pin drive strength](/reference/device-os/api/input-output/pinsetdrivestrength/) on nRF52840 devices (Boron, B Series SoM, Tracker, E404X, Argon) in software.

- The longer lead is the positive connection or anode
- The shorter lead in the negative connection or cathode. The case may also have a flattened spot on the cathode side.
- The current limiting resistor can be on either the positive or negative side, but there must be a separate current limiting resistor for each LED if you have more than one.

### Resistors

![](/assets/images/edge-kit/resistors-2.jpeg)

Resistors have a standardized color code.

{{> resistor-code }}

The resistors in the kit include:

| Color | Resistance | Usage |
| :---: | :---: | :--- |
| Orange - Orange - Brown - Gold | 330 &ohm; | LED current limiting |
| Brown - Black - Red - Gold | 1K&ohm; | Transistor gate or current limiting |
| Brown - Black - Orange - Gold | 10K&ohm; | Pull-up or pull-down |

### Capacitor

![](/assets/images/edge-kit/capacitor.jpeg)

The kit includes a capacitor, which is typically used to smooth your input power source in certain conditions.

### USB

The kit contains a standard USB-A to Micro-B cable. You can use any USB cable, but for programming over USB make sure you are using a full USB data cable and not a "charging only" cable.

![USB cable](/assets/images/edge-kit/usb.jpeg)

### Breadboard

The kit contains a solderless breadboard. 

![](/assets/images/edge-kit/breadboard.jpeg)


### Jumper wires

![](/assets/images/edge-kit/wires.jpeg)

## Example applications

### PDM MEMS Microphone example

### Accelerometer example

