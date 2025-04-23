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

The M-HAT has a 3-pin JST-PH (2mm pitch) battery connector that is the same as the Monitor One, Muon, and Tachyon for connection to a 3.7V LiPo battery pack 
with an integrated temperature sensor (10K NTC thermistor).

Some other Particle devices have a 3.7V LiPo battery without a temperature sensor using 2-pin JST-PH connector. This battery is not compatible and cannot be used with the Muon. A temperature sensor or equivalent resistance is required for proper operation; replacing the connector is not sufficient to use a battery without a temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>

If purchasing a battery from a 3rd-party supplier, verify the polarity as the polarity is not standardized even for batteries using a JST-PH connector.


#### <!-- shared-diagram-label m-hat ioex-conn title-label-paren -->I/O Expansion (6)<!-- end -->

The IOEX connector provides a way to access some of the unused GPIO on the Particle SoM.

It is a 2x5 1.27mm IDC socket that connects using the same ribbon cable that is used for SWD/JTAG debugging on many Particle devices.

{{imageOverlay src="/assets/images/m-hat/m-hat-ioex.svg" alt="IOEX connector"}}

{{!-- BEGIN do not edit content below, it is automatically generated bf89b87e-f66f-4de9-9a5e-fc88a792cf7b --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 51 | SOM14 | SOM14 | I/O | NC on B-SoM |
| 57 | SOM17 | SOM17 | I/O | NC on B-SoM |
| 58 | D24 | M2_D24 | I/O | On IOEX connector, NC on B-SoM |
| 60 | D25 | M2_D25 | I/O | On IOEX connector, NC on B-SoM |
| 64 | D23 | M2_D23 | I/O | GPIO on IOEX connector |
| 70 | D6 | M2_D6 | I/O | PWM, GPIO on IOEX connector |


{{!-- END do not edit content above, it is automatically generated--}}


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

The onboard peripherals including QWIIC and Grove connector are powered by the 3V3_AUX power supply.

If you use [setup.particle.io](https://setup.particle.io/) to set up your M-HAT, 3V3_AUX will be set up
automatically. 

If you want to do it manually, the see the section [Firmware settings](#firmware-settings), below, 
for the sample code and the technical reasons why it is necessary.


#### Expansion card power

A jumper located on the bottom side of the M-HAT selects the direction of expansion card (HAT) 5V power (label 20, above).

- Connecting `5V_IN` and center pin: Expansion card powers the M-HAT (typically from PoE) 
- Connecting `5V_OUT` and center pin: The M-HAT powers expansion card (from USB-C, USB, or LiPo)

{{imageOverlay src="/assets/images/m-series/muon-5v-jumper.jpg" alt="5V Jumper"}}

<p class="attribution">This picture is of the Muon; the appearance of the M-HAT may differ</p>


## HAT connector

The 40-pin Raspberry Pi HAT connector is primarily left for use by the Pi and additional HATs, however the following connections are included:

{{imageOverlay src="/assets/images/m-hat/m-hat-pins.svg" alt="Pin Diagram"}}


{{!-- BEGIN do not edit content below, it is automatically generated 04c52083-eb85-46a7-b2a7-c366be119571 --}}

| Pin Name | Schematic net | MCU direction | Description | Pi Pin | Pi Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TXD | M2_TXD | O | UART serial TXD, connects to Pi UART0 RXD | GPIO15 | UART0_RX |
| RXD | M2_RXD | I | UART serial RXD, connects to Pi UART0 TXD | GPIO14 | UART0_TX |
| CTS | M2_D3/CTS | I | UART serial CTS, connects to Pi UART0 RTS | GPIO17 | UART0_RTS |
| RTS | M2_D2/RTS | O | UART serial RTS, connects to Pi UART0 CTS | GPIO16 | UART0_CTS |
| CS | WAKE_RPI_CTR | O | Pi power control by GPIO4 | GPIO4 | GPIO4 |


{{!-- END do not edit content above, it is automatically generated--}}


### GPIO4 - HAT connector

GPIO4 on the Pi is used for on/off control. While the Pi does not have a true sleep mode like Particle devices, it does use 
less power in HALT mode and this pin can optionally be used for power control.

The GPIO4 pin has a 10K hardware pull-up resistor to the Pi 3V3. 

From the Particle SoM, settings `CS` pin, also known as `D8`, to `OUTPUT` and using `digitalWrite(D8, LOW)` will set GPIO4 low.

### UART serial - HAT connector

The Raspberry Pi UART0 is connected to the Particle M.2 SoM `Serial1` UART, with hardware flow control. As is typically the case:

- RXD &harr; TXD
- CTS &harr; RTS

By default, this mapping is isolated. By the `SEL` pin, see [FSA2567](#fsa2567), below, you can enable the UART connection, which is needed for tethering.

## Internal peripherals

### Components - Internal peripherals

#### STUSB4500

The STUSB4500 USB PD controller has three connections, however they are not frequently needed and are hard to access on the B-SoM.

Two of the pins are NFC pins on the B-SoM. They can be converted from NFC Tag to GPIO, but doing so requires changing the UICR bytes in the nRF52840 configuration flash and rebooting the MCU. After that, the pins will remain as GPIO.

{{!-- BEGIN do not edit content below, it is automatically generated 3f9e11ff-5582-435d-af08-5e087b63414b --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | PD_RST | O | USB PD controller reset, pin is NFC1 on B-SoM |
| 19 | D20 | PD_ALERT | I | USB PD controller alert, pin is NFC2 on B-SoM |
| 59 | D26 | PD_ATTACH | I | USB PD controller attach interrupt, NC on B-SoM |


{{!-- END do not edit content above, it is automatically generated--}}

#### FSA2567

This chip isolates the UART pins (RX, TX, CTS, RTS) between the Particle M.2 SoM and the Pi. 

If the A0 pin is set HIGH, then the UART is connected:

- RXD &harr; TXD
- CTS &harr; RTS

{{!-- BEGIN do not edit content below, it is automatically generated 7f56ea43-30ef-4cb1-988a-3d7e31247bc9 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 | SEL | O | HIGH to enable SoM to Pi UART |


{{!-- END do not edit content above, it is automatically generated--}}

To enable the UART connection, you would typically use code like this in your firmware that enabled tethering:

```cpp
pinMode(A0, OUTPUT);
digitalWrite(A0, HIGH); // enable UART connection
```

#### DML3006

There are two separate ways 5V on the HAT connector can be generated when powering from

{{!-- BEGIN do not edit content below, it is automatically generated f90b1182-87f3-4aa6-8599-01504bfdff97 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 37 | A3 | EN1_CTR | O | LiPo to 5V boost converter (HIGH to turn off, default on) |


{{!-- END do not edit content above, it is automatically generated--}}


#### TMP112A

This is the temperature sensor on the M-HAT, which is connected by I2C. There is an optional alert output that can be enabled
on the sensor. It is an open-collector output and is connected to D4. If you are using this feature, be sure to set 
`pinMode(D4, INPUT_PULLUP)` so the input does not float.

{{!-- BEGIN do not edit content below, it is automatically generated f6622f00-cc13-43e4-99d4-c955ed253710 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 66 | D4 | TEMP_ALERT | I | Temperature sensor ALERT output |


{{!-- END do not edit content above, it is automatically generated--}}

#### AB1805

The AB1805 RTC/Watchdog provides additional RTC and hardware watchdog options. This is push-pull driven from the AB1805
and defaults to HIGH in the chip, so you can't reuse this pin for other purposes, though you can ignore it.

{{!-- BEGIN do not edit content below, it is automatically generated e37904f1-301c-4f2b-97a9-3bab92a6acd3 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 68 | D5 | RTC_INT | I | RTC/Watchdog FOUT/IRQ output |


{{!-- END do not edit content above, it is automatically generated--}}

#### PM-BAT

[PM-BAT](/hardware/power/pm-bat-datasheet/) power module includes an open-collector output for interrupts from the bq24195 PMIC
and the MAX17043 fuel gauge. If using this feature, be sure to set `pinMode(A7, INPUT_PULLUP)` so the input does not float.

{{!-- BEGIN do not edit content below, it is automatically generated cc5c6247-5bdb-43bd-8b18-24954f4adea4 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 47 | A7 | M2_A7/PMIC_INT | I | PMIC and fuel gauge interrupt output |
| 72 | D7 | D7/AUX_POWER_EN | O | 3V3_AUX power control (HIGH to turn on) |


{{!-- END do not edit content above, it is automatically generated--}}


### GPIO - Internal peripherals

{{!-- BEGIN do not edit content below, it is automatically generated 5c7622c6-ae73-4a5b-88b6-e761ee69fa3f --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Connected to | Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 17 | D21 | PD_RST | O | STUSB4500 | USB PD controller reset, pin is NFC1 on B-SoM |
| 19 | D20 | PD_ALERT | I | STUSB4500 | USB PD controller alert, pin is NFC2 on B-SoM |
| 20 | SCL | M2_SCL | I/O | Multiple | I2C SCL |
| 22 | SDA | M2_SDA | I/O | Multiple | I2C SDA |
| 23 | A0 | SEL | O | FSA2567 | HIGH to enable SoM to Pi UART |
| 32 | MODE | M2/MODE | I | MODE button | MODE button for Particle SoM |
| 33 | A1 | M2_A1/MISO | I/O | Grove A1 | Grove A1, Input, Output, ADC, PWM |
| 34 | RESET | M2/RESET | I | RESET button | RESET button for Particle SoM |
| 35 | A2 | M2_A2/SCK | I/O | Grove A2 | Grove A2, Input, Output, ADC |
| 36 | TXD | M2_TXD | O | HAT | UART serial TXD, connects to Pi UART0 RXD |
| 37 | A3 | EN1_CTR | O | DML3006 | LiPo to 5V boost converter (HIGH to turn off, default on) |
| 38 | RXD | M2_RXD | I | HAT | UART serial RXD, connects to Pi UART0 TXD |
| 40 | CTS | M2_D3/CTS | I | HAT | UART serial CTS, connects to Pi UART0 RTS |
| 41 | A4 | EN2_CTR | O | MP28167 | DCIN or USB boost-buck converter (HIGH to turn off, default on) |
| 42 | RTS | M2_D2/RTS | O | HAT | UART serial RTS, connects to Pi UART0 CTS |
| 47 | A7 | M2_A7/PMIC_INT | I | PM-BAT | PMIC and fuel gauge interrupt output |
| 48 | CS | WAKE_RPI_CTR | O | HAT | Pi power control by GPIO4 |
| 51 | SOM14 | SOM14 | I/O | IOEX connector | NC on B-SoM |
| 57 | SOM17 | SOM17 | I/O | IOEX connector | NC on B-SoM |
| 58 | D24 | M2_D24 | I/O | IOEX connector | On IOEX connector, NC on B-SoM |
| 59 | D26 | PD_ATTACH | I | STUSB4500 | USB PD controller attach interrupt, NC on B-SoM |
| 60 | D25 | M2_D25 | I/O | IOEX connector | On IOEX connector, NC on B-SoM |
| 62 | D22 | 3V3_DETECTION | I | HAT connector | HIGH when Pi is supplying 3V3 to the HAT connector |
| 64 | D23 | M2_D23 | I/O | IOEX connector | GPIO on IOEX connector |
| 66 | D4 | TEMP_ALERT | I | TMP112A | Temperature sensor ALERT output |
| 68 | D5 | RTC_INT | I | AB1805 | RTC/Watchdog FOUT/IRQ output |
| 70 | D6 | M2_D6 | I/O | IOEX connector | PWM, GPIO on IOEX connector |
| 72 | D7 | D7/AUX_POWER_EN | O | PM-BAT | 3V3_AUX power control (HIGH to turn on) |


{{!-- END do not edit content above, it is automatically generated--}}


#### PD_RST

This is the PD_RST line to reset the STUSB4500 USB PD controller. You normally will not need to use this.

There is a 10K hardware pull-down resistor on this pin. If you set the pin to OUTPUT and HIGH, it will reset the chip.

#### PD_ALERT

This is the PD_ALERT output from the STUSB4500 USB PD controller. It is not enabled by default.

This is connected to M.2 Pin 19. 

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

## Other

### NFC

The M-HAT does not support NFC tag. NFC tag is not supported on the M-SoM, and there is no connector for use with the B-SoM.

If using the B-SoM, it is recommended that you disable NFC in the UICR bytes of the nRF52840. This will allow the MCU to 
use the NFC pins (NFC1 and NFC2) as GPIO, which will allow you to access the PD_RST and PD_ATTACH pins.

### SWD/JTAG

The 10-pin SWD/JTAG debugging connector is not populated on the M-HAT. 

Additionally, the Particle M.2 SoM SWD pogo pins are not available on the M-HAT, so SWD would only work
on M-SoM, not B-SoM, even if populated.


## Firmware settings

Devices using the [Particle Power Module](/hardware/power/pm-bat-datasheet/) include a `3V3_AUX` power output
that can be controlled by a GPIO. On the M-HAT, it controls the Qwiic and Grove connectors. 
On the M.2 SoM breakout board, this powers the Feather connector. On the Muon,
it powers the Ethernet port, LoRaWAN module, 40-pin expansion HAT connector, and QWIIC connector.

The main reason for this is that until the PMIC is configured, the input current with no battery
connected is limited to 100 mA. This is insufficient for the M-SoM to boot when 
using a peripheral that requires a lot of current, like the WIZnet W5500 Ethernet module. The 
system power manager prevents turning on `3V3_AUX` until after the PMIC is configured
and the PMIC has negotiated a higher current from the USB host (if powered by USB).

This setting is persistent and only needs to be set once. In fact, the PMIC initialization
normally occurs before user firmware is run. This is also necessary because if you are using Ethernet
and enter safe mode (breathing magenta), it's necessary to enable `3V3_AUX` so if you are using
Ethernet, you can still get OTA updates while in safe mode.

After changing the auxiliary power configuration you must reset the device.

The following code can be used to enable Ethernet on the M-HAT. This only needs to be done
once and the device must be reset after configuration for the changes to take effect.  It requires Device OS 5.9.0 or later.

```cpp
// Enable 3V3_AUX
SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
System.setPowerConfiguration(powerConfig);
```

If you wish to manage the 3V3_AUX power manually from your firmware,
you can set the `auxiliaryPowerControlPin` to `PIN_INVALID` and reset the device. It will then no longer
turn on at boot.

```cpp
// Manual management of 3V3_AUX
SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
powerConfig.auxiliaryPowerControlPin(PIN_INVALID).interruptPin(A7);
System.setPowerConfiguration(powerConfig);
```

To control `3V3_AUX` manually from your firmware, use `pinMode(D7, OUTPUT)` in `setup()`. Use
`digitalWrite(D7, 1)` to turn `3V3_AUX` on and `digitalWrite(D7, 0)` to turn it off.


## Schematics

{{box op="start" cssClass="boxed warningBox"}}
These are preliminary (v0.2) schematics and are subject to change.
{{box op="end"}}

#### Schematics - Page 1

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-1.png" alt="Schematic page 1" class="full-width"}}

#### Schematics - Page 2

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-2.png" alt="Schematic page 2" class="full-width"}}

#### Schematics - Page 3

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-3.png" alt="Schematic page 3" class="full-width"}}

#### Schematics - Page 4

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-4.png" alt="Schematic page 4" class="full-width"}}

#### Schematics - Page 5

{{imageOverlay src="/assets/images/m-hat/m-hat-sch-5.png" alt="Schematic page 5" class="full-width"}}

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
