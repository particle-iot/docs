---
title: M-HAT datasheet
columns: two
layout: commonTwo.hbs
description: M-HAT Datasheet
---

# M-HAT datasheet (preview)

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and there may be changes before release
{{box op="end"}}

![](/assets/images/m-hat/m-hat.png)

<p class="attribution">Rendering is of an older version of the M-HAT</p>


## Overview

The M-HAT is pass-through HAT (hardware attached on top) for the Raspberry Pi to provide cellular connectivity and power.

It contains the power circuitry from the Muon, including the ability to power both the cellular modem and Raspberry Pi using USB-C PD, external DC power, or LiPo battery.

It is intended for use with the B504e (LTE Cat 1 NorAm) and B524 (LTE Cat 1 EMEAA) to provide network connectivity to the Raspberry Pi using [tethering](reference/device-os/tethering/).

It provides a pass-through Raspberry Pi 40-pin expansion HAT connector to allow use with additional HATs.

- [B504e datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)

## Diagram

{{imageOverlay src="/assets/images/m-hat/m-hat-labeled.png" alt="Diagram"}}

<!-- shared-diagram-table start m-hat -->
| Label | Description |
| ---: | :--- |
| 1 | USB-C | <!-- usb -->
| 2 | USB-C PD LED | <!-- pd-led -->
| 3 | DC IN | <!-- dc-in -->
| 4 | Charge LED | <!-- chg-led -->
| 5 | LiPo Battery | <!-- bat-conn -->
| 6 | I/O Expansion | <!-- ioex-conn -->
| 7 | RTC Battery | <!-- rtc-conn -->
| 8 | Grove connector | <!-- grove-conn -->
| 9 | QWIIC connector | <!-- qwiic-conn -->
| 10 | SMA connector | <!-- sma1 -->
| 11 | SMA connector | <!-- sma2 -->
| 12 | SMA connector | <!-- sma3 -->
| 13 | Reset button | <!-- reset-button -->
| 14 | Raspberry Pi HAT 40-pin connector | <!-- hat -->
| 15 | Particle M.2 SoM | <!-- m2-som -->
| 16 | Particle MODE button | <!-- mode-button -->
| 17 | Particle RGB LED | <!-- rgb-led -->
<!-- shared-diagram-table end m-hat -->

#### <!-- shared-diagram-label m-hat usb title-label-paren -->USB-C (1)<!-- end -->

USB-C can be used for powering the M-HAT and the Raspberry Pi. It is recommended that you use this
USB-C connector instead of the one on the Pi, as the Pi may not provide sufficient power for the
cellular modem unless also used with a battery.

This USB-C connector also provides USB access to the M.2 SoM for programming over USB or accessing
the Particle USB serial debug.

See also [Power](#power), below.

#### <!-- shared-diagram-label m-hat pd-led title-label-paren -->USB-C PD LED (2)<!-- end -->


#### <!-- shared-diagram-label m-hat dc-in title-label-paren -->DC IN (3)<!-- end -->

Optional 6V - 12V DC power input. 

See also [Power](#power), below.

#### <!-- shared-diagram-label m-hat chg-led title-label-paren -->Charge LED (4)<!-- end -->

#### <!-- shared-diagram-label m-hat bat-conn title-label-paren -->LiPo Battery (5)<!-- end -->

#### <!-- shared-diagram-label m-hat ioex-conn title-label-paren -->I/O Expansion (6)<!-- end -->

#### <!-- shared-diagram-label m-hat rtc-conn title-label-paren -->RTC Battery (7)<!-- end -->

#### <!-- shared-diagram-label m-hat grove-conn title-label-paren -->Grove connector (8)<!-- end -->

#### <!-- shared-diagram-label m-hat qwiic-conn title-label-paren -->QWIIC connector (9)<!-- end -->

#### <!-- shared-diagram-label m-hat sma1 title-label-paren -->SMA connector (10)<!-- end -->

#### <!-- shared-diagram-label m-hat reset-button title-label-paren -->Reset button (13)<!-- end -->

#### <!-- shared-diagram-label m-hat hat title-label-paren -->Raspberry Pi HAT 40-pin connector (14)<!-- end -->

#### <!-- shared-diagram-label m-hat m2-som title-label-paren -->Particle M.2 SoM (15)<!-- end -->

#### <!-- shared-diagram-label m-hat mode-button title-label-paren -->Particle MODE button (16)<!-- end -->

#### <!-- shared-diagram-label m-hat rgb-led title-label-paren -->Particle RGB LED (17)<!-- end -->


## Power

Power can be supplied to M-HAT by:

- USB-C
- VIN (6 - 12 VDC, via screw terminals)
- LiPo battery (via 3-pin JST battery connector)
- Expansion card (HAT)

#### USB-C cable warning

You must use an actual USB-C port or USB-C power adapter to power the M-HAT by USB.

**A USB-A to USB-C cable will not power the M-HAT or charge the battery**

The reason is that the M-HAT uses USB-C PD to change the USB port voltage to 9V and request enough
current to power the M-HAT. 

When using a USB-2 or USB-3 port with USB-A to USB-C adapter cable, the USB port voltage cannot
be changed and the port will not be able to power the M-HAT.

Also beware of some wall adapters that have a USB-C cable, but do not support USB-C PD. Some
of these are advertised as Raspberry Pi power adapters, which only support 5V and cannot be used
to power the M-HAT.

See [Muon USB Power](/troubleshooting/guides/device-troubleshooting/muon-usb-power/) for more information.

#### Expansion and peripheral power

The onboard peripherals including Ethernet, the LoRa radio, QWIIC, and the expansion HAT connector are powered by the
3V3_AUX power supply.

If you use [setup.particle.io](https://setup.particle.io/) to set up your M-HAT, 3V3_AUX will be set up
automatically. 

If you want to do it manually, the see the section [Firmware settings](#firmware-settings), below, 
for the sample code and the technical reasons why it is necessary.


#### Expansion card power

A jumper located on the bottom side of the M-HAT selects the direction of expansion card (HAT) 5V power (label 20, above).

- Connecting `5V_IN` and center pin: Expansion card powers the M-HAT (typically from PoE) 
- Connecting `5V_OUT` and center pin: The M-HAT powers expansion card (from USB-C, USB, or LiPo)

{{imageOverlay src="/assets/images/m-series/muon-5v-jumper.jpg" alt="5V Jumper" class="full-width"}}

<p class="attribution">This picture is of the Muon; the appearance of the M-HAT may differ</p>


## HAT connector

The 40-pin Raspberry Pi HAT connector is primarily left for use by the Pi and additional HATs, however the following connections are included:

{{imageOverlay src="/assets/images/m-hat/m-hat-pins.svg" alt="Pin Diagram"}}

| Raspberry Pi | Particle M.2 SoM | Description |
| :---: | :---: | :--- |
| GPIO4 | CS | Used for Pi on/off control |
| TXD | RXD | Serial data for tethering |
| RXD | TXD | Serial data for tethering |
| CTS | RTS | Serial flow control for tethering |
| RTS | CTS | Serial flow control for tethering |

### GPIO4

GPIO4 on the Pi is used for on/off control. While the Pi does not have a true sleep mode like Particle devices, it does use 
less power in HALT mode and this pin can optionally be used for power control.

The GPIO4 pin has a 10K hardware pull-up resistor to the Pi 3V3. 

From the Particle SoM, settings `CS` pin, also known as `D8`, to `OUTPUT` and using `digitalWrite(D8, LOW)` will set GPIO4 low.

### UART serial

The Raspberry Pi UART0 is connected to the Particle M.2 SoM `Serial1` UART, with hardware flow control. As is typically the case:

- RXD &harr; TXD
- CTS &harr; RTS

## Internal peripherals


| M.2 Pin | Name | Schematic Net | MCU direction | Connected To | Description |
| ---: | :--- | :--- | :--- | :--- | :--- |
| 17 | D21 | PD_RST | Out | STUSB4500 | USB PD controller reset |
| 19 | D20 | RD_ALERT | In | STUSB4500 | USB PD controller alert interrupt |
| 23 | A0 | SEL | Out | FSA2567 | HIGH to disconnect UART |
| 20 | SCL | M2_SCL | I/O | Multiple | I2C SCL |
| 22 | SDA | M2_SDA | I/O | Multiple | I2C SDA |
| 33 | A1 | M2_A2/MISO | I/O, ADC | Grove | Grove A2 (inner) |
| 35 | A2 | M2_A2/SCK | I/O, ADC | Grove | Grove A1 (outer) |
| 37 | A3 | EN1_CTR | Out | LiPo 5V | HIGH turns off LiPo to 5V boost converter |
| 41 | A4 | EN2_CTR | Out | DCIN 5V | HIGH turns off MP28167 5V_DCIN buck-boost converter |
| 47 | A7 | M2_A7/PMIC_INT | In | PM-BAT | PMIC and fuel gauge interrupt from power module |
| 48 | CS | WAKE_RPI_CTR | Out | HAT | Pi power control via GPIO4 |
| 59 | D26 | PD_ATTACH | In | STUSB4500 | USB PD controller attachment interrupt |
| 62 | D22 | 3V3_DETECTION | In | HAT Conn | HIGH when Pi is supplying 3V3 |
| 66 | D5 | TEMP_ALERT | In | TMP112A | Temperature alert output |
| 68 | D5 | RTC_INT | In | AB1805 | RTC/Watchog FOUT/IRQ output |
| 72 | D7 | A7/AUX_PWR_EN | Out | PM-BAT | 3V3_AUX power control |


#### PD_RST

This is the PD_RST line to reset the STUSB4500 USB PD controller. You normally will not need to use this.

There is a 10K hardware pull-down resistor on this pin. If you set the pin to OUTPUT and HIGH, it will reset the chip.

#### PD_ALERT

This is the PD_ALERT output from the STUSB4500 USB PD controller. 

#### PD_ATTACH

This is the PD_ATTACH output from the STUSB4500 USB PD controller. 

#### EN1_CTR

#### EN2_CTR

This controls the EN pin of the MP28167 

#### TEMP_ALERT

This is the ALERT output from the TMP112A temperature sensor. 

By default, this output is not enabled but can be enabled to interrupt or wake the Particle SoM based on temperature.

#### RTC_INT

This is the FOUT/IRQ output from the AM1805 RTC/Watchdog chip. By default, this output is not enabled.

By default, this output is not enabled but can be enabled to interrupt or wake the Particle SoM based RTC time.

#### A7/AUX_PWR_EN

This output controls the 3V3_AUX power, which also powers:

- Qwiic connector
- Grove connector


## Schematics

{{box op="start" cssClass="boxed warningBox"}}
These are preliminary (v0.2) schematics and are subject to change.
{{box op="end"}}

#### Schematics - Page 1

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-1.png" alt="Schematic page 1"}}

#### Schematics - Page 2

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-2.png" alt="Schematic page 2"}}

#### Schematics - Page 3

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-3.png" alt="Schematic page 3"}}

#### Schematics - Page 4

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-4.png" alt="Schematic page 4"}}

#### Schematics - Page 5

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-5.png" alt="Schematic page 5"}}

---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 47e37393-b9c0-4b04-9da6-e54cb2227cd1 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| MHAT | M-HAT | Global | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | NORAM | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | EMEAA | In development |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-04-21 | RK | Initial version |
