---
title: M1 enclosure datasheet
columns: two
layout: commonTwo.hbs
description: M1 enclosure datasheet
---

# M1 enclosure datasheet

The M1 enclosure makes it easy to deploy Particle Tachyon and Muon, or Raspberry Pi, projects in a IP67-rated weatherproof enclosure
similar to the Monitor One.

![M1 enclosure top](/assets/images/monitor-one/m1-top.jpg)

The carrier board securely installs your Raspberry Pi compatible board through use of pin headers and screws. It connects your Muon or Tachyon to the external button and internal LEDs on the carrier board, as well as allowing for expansion hats on the top side. Cutouts in the board accommodate USB-C, PCIe, DSI, and CSI flex cables, ensuring easy access throughout the enclosure. Extra space is available within the enclosure for a GNSS antenna or a battery, depending on your specific use case.

![M1 enclosure open](/assets/images/monitor-one/m1-top-open.jpg)

The bulkhead includes two M20 holes that can be used with round hole plugs or cable glands (included) or can fit other compatible connectors. It also includes two SMA connectors that can be used for external antennas.

![M1 enclosure bulkhead](/assets/images/monitor-one/m1-bulkhead.jpg)

This enclosure is designed to secure your gateway in various challenging environments, offering flexible mounting options for walls, rails, poles, magnetic surfaces, and more. Ideal for both indoor and outdoor use, this enclosure ensures your devices are safe from dust, water, and other environmental hazards. 

Includes:

- Enclosure in white with dark blue accents
- Carrier board for Raspberry Pi compatible boards
- 2x M20 cable glands with TE RJ45 feed-through
- 2x M20 hole plugs
- Back mounting plate
- M3 & M2 hex tools
- Mounting hardware for plates (screws, bolts, etc)
- USB-C cable

The Muon, Tachyon, or Raspberry Pi is not included. Antennas and batteries are sold separately as they may vary depending on the device used.

## Internal features

- ADP8866 LED driver for the 3 RGB LEDs connected by I2C
- Front RGB status LED
- Side RGB LEDs (2)
- Externally accessible button for use by user applications
- 2-pin connector for 5V power (internal)

## Mounting

The mounting plate on the M1 enclosure is the same as the Monitor One. The Monitor One is shown in the 
picture, which has different bulkhead connectors, but the mounting plate is the same.

{{imageOverlay src="/assets/images/monitor-one/back-labeled.png" alt="Back View" class="full-width"}}

<p class="attribution">Monitor One pictured</p>

| Label | Details |
| :---: | :--- |
| 1 | Mounting screw or bolt holes|
| 2 | Slots for strap mounting |
| 3 | Magnets |
| 4 | Mounting plate removal screw (M3 hex, 3mm) |

The mounting plate contains two magnets (3) that allow it to be easily mounted on a metal surface.

The mounting plate is removable from the back of the unit after removing the screw on the bottom (4), near the expansion connectors.

Once removed, you can screw or bolt the mounting plate through the four holes (1) and reattach the Monitor One. This is good for rough conditions and for mounting on non-metal surfaces.

The mounting plate can be strap mounted through the two slots (2).

The magnets do not need to removed to use screw, bolt, or strap mounting.

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Top, width between mounting holes | 28 mm | 1 3/32" |
| Bottom, width between mounting holes | 46 mm | 1 13/16" |
| Height between mounting holes | 140 mm | 5 1/2" |

{{imageOverlay src="/assets/images/monitor-one/bracket-dim.png" alt="Mounting bracket holes" class="full-width"}}

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Bolt/screw head hole diameter (maximum) | 12.46 mm | 31/64" |
| Bolt/screw head maximum height (maximum) | 4.0 mm | 5/32" |
| Bolt/screw hole diameter (maximum) | 4.33 mm | 11/64" |
| Bolt/screw shaft to surface (maximum) | 3.65 mm | 9/64" |
| Recommended bolt or screw | M4 | #8 |


{{imageOverlay src="/assets/images/monitor-one/hole-dim.png" alt="Mounting bracket screw hole dimensions" class="full-width"}}


When mounting using a strap, the strap will hold the mounting bracket against a surface and is sandwiched between the mounting bracket and the Monitor One enclosure.

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Maximum strap width | 15 mm | 19/32" |

{{imageOverlay src="/assets/images/monitor-one/strap-dim.png" alt="Strap mounting dimensions" class="full-width"}}

If you wish to fabricate your own compatible mounting bracket, the STEP file can found in the [Monitor One Github repository](https://github.com/particle-iot/monitor-one).

## User LEDs

There are three LEDs controlled by an ADP8866 I2C PWM controller. It is connected to the I2C bus (address 0x27).

## M1 carrier board

The M1 carrier board fits in the M1 enclosure. The Raspberry Pi-compatible board including the Muon or Tachyon
mounts under the carrier board and the expansion header pins passes through the carrier board.

{{imageOverlay src="/assets/images/monitor-one/m1-board.png" alt="Carrier board" class="full-width"}}

## Schematic

This is the schematic for the v0.5 of the M1 enclosure carrier board. Changes are possible before general availability.

{{imageOverlay src="/assets/images/monitor-one/monitor_pi_v0.5_p1.svg" alt="Schematic" class="full-width"}}

### Dimensions and weight

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Width      | 121 mm |   4 3/4" |
| Height     | 220 mm |   8 5/8" |
| Depth      |  69 mm | 2 11/16" |
| Weight     |   |   |

{{imageOverlay src="/assets/images/monitor-one/front-dim.png" alt="Dimensions" class="full-width"}}

{{imageOverlay src="/assets/images/monitor-one/side-dim.png" alt="Dimensions" class="full-width"}}

{{!-- 
torque values for screws: 7.5 kgf*cm (42 lbf/in) 
--}}

### Dimensions for top cover artwork

{{imageOverlay src="/assets/images/monitor-one/artwork-dimensions.png" alt="Artwork dimensions" class="full-width"}}

### 3D models

- [Bottom cover 3D model](/assets/images/monitor-one/bottom-cover.step) (.step)

## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 1ee1e229-4747-4ebe-9c86-90a2ddbb73af --}}

| SKU | Description | Lifecycle |
| :--- | :--- | :--- |
| M1ENCLEA | M1 Enclosure | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

### Disposal

<img src="/assets/images/weee.png" style="background-color: #fff">

This device must be treated as Waste Electrical & Electronic Equipment (WEEE) when disposed of.

Any WEEE marked waste products must not be mixed with general household waste, but kept separate for the treatment, recovery and recycling of the materials used. For proper treatment, recovery and recycling; please take all WEEE marked waste to your Local Authority Civic waste site, where it will be accepted free of charge. If all consumers dispose of Waste Electrical & Electronic Equipment correctly, they will be helping to save valuable resources and preventing any potential negative effects upon human health and the environment of any hazardous materials that the waste may contain.

## Revision history

| Revision | Date       | Author | Comments |
|:---------|:-----------|:-------|:---------|
| pre      | 2024-10-22 | RK     | Preliminary version |
