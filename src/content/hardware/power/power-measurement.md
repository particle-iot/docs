---
title: Power measurement
columns: two
layout: commonTwo.hbs
description: Power measurement for Particle devices
includeDefinitions: [api-helper, power-comparison]
---

# {{title}}

## Measurement tools

### Standard DMMs

In general, most portable DMMs that have a physical range selector are not suitable for current measurement for Particle devices. 

The reason is that the large current range for cellular devices, in particular. It could be as high as 1.5 A during connection to 100 µA (0.0001 A) in sleep mode, which is beyond the range of most inexpensive meters.

If you are in the low current range and exceed the rating, *burden voltage* will affect the operation of the device because the voltage will be lower than the rated version.

### Qoitech Otii Arc Pro

https://www.qoitech.com/otii-arc-pro/

- Built in power supply
- Logs data
- Can synchronize UART serial logs with the power consumption graph.

### Siglent SDM3055

This bench DMM is suitable 
https://siglentna.com/digital-multimeters/sdm3055-5-%c2%bd-digits-dual-display-digital-multimeters/#

This requires an external power supply. Typically you would use a DC bench supply.

- Logs data
- Also performs other bench DMM features

### µCurrent Gold

https://www.digikey.com/reference-designs/en/sensor-solutions/current-sensing/2637

This works with a regular digital multi-meter and eliminates the burden voltage issue. This also requires an external power supply as well. Typically you would use a DC bench supply.

- Inexpensive
- Works with tools you probably already have

## Tips for Particle devices

### LiPo battery input vs. VIN

### Beware of peripherals


## Comparison tool

{{> power-comparison }}
