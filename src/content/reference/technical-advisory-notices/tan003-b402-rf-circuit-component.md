---
title: TAN003 - B402 RF Circuit Component
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

_B402 modules manufactured during week 28 of 2020 have incorrect components in their RF circuit, impacting connectivity._

Published: Jan 5, 2021

## Issue Summary

A manufacturing run of B402 SOMs in week 28 of 2020 mis-populated 10K resistors in place of 15pF capacitors in the RF matching circuit. This can lead to weakened connectivity and component heating.

## Products Affected

B402 SOMs manufactured in week 28 of 2020.

## How to determine if a SOM is affected

Locate the serial number of the device by navigating to its device page in the Console, by using the [CLI command](/getting-started/developer-tools/cli/) `particle identify`, by checking your device's original packaging, or by reading the value from the sticker on the device itself.

* Example: P006VN028MJBHG7

Characters 1-6 are for internal tracking, Character 7-9 identify the year and week of manufacturing.

* The B402 SOM in the example above was manufactured in 2020 (designated by the`0`, week 28 (designated by the `28`). This device would be subject to this Technical Advisory notice.

If you are having trouble determining your device's serial number, please contact [Particle support](https://support.particle.io/).

If your device was manufactured during week 28, please perform a visual inspection to confirm if the incorrect component was placed. The photos below represent an incorrect and correct component usage respectively. The resistor (Black) highlighted in red is the incorrect component and the SOM should be replaced. The capacitor (Brown) highlighted in green is the correct component and the SOM should function normally.

![Pixel_Bad.png](/assets/images/support/Pixel_Bad.png)

_(Above: incorrect component)_

![Pixel_Good.png](/assets/images/support/Pixel_Good.png)

_(Above: correct component)_


## Issue Mitigation

Particle will send a replacement for all affected units.
