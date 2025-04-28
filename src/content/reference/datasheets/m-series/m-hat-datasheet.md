---
title: M-HAT datasheet
columns: two
layout: commonTwo.hbs
description: M-HAT Datasheet
---

# M-HAT datasheet (preview)

{{box op="start" cssClass="boxed warningBox"}}
This is a pre-review, preliminary datasheet, for internal use only. Changes are likely before release.
{{box op="end"}}

![](/assets/images/m-hat/m-hat.png)

<p class="attribution">Rendering is of an older version of the M-HAT</p>


## Overview

The M-HAT is pass-through HAT (hardware attached on top) for the Raspberry Pi to provide cellular connectivity and power.

It contains the power circuitry similar to the Muon, including the ability to power both the cellular modem and Raspberry Pi using USB-C PD, external DC power, or LiPo battery.

It is intended for use with the B504e (LTE Cat 1 NorAm) and B524 (LTE Cat 1 EMEAA) to provide network connectivity to the Raspberry Pi using [tethering](reference/device-os/tethering/). 

The M-HAT provides a pass-through Raspberry Pi 40-pin expansion HAT connector to allow use with additional HATs.

- [B504e datasheet](/reference/datasheets/b-series/b504-datasheet/)
- [B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)

If you are using additional Raspberry Pi HATs, you will typically stack them on top of the M-HAT.

If you are using a PoE (Power over Ethernet) HAT, it must go directly against the Raspberry Pi, underneath the M-HAT. This is because PoE has a separate 4-pin connector that directly plugs into to a header next to the Ethernet jack in addition to accessing the 40-pin HAT connector. 

Other pass-through HATs could be used below the M-HAT, if they fit and have appropriate stand-offs so the M-HAT remains secure, as well.

Note that the M-SoM does not support tethering and cannot be used to supply a cellular network connection to a Raspberry Pi with the M-HAT.

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
| 9 | Qwiic connector | <!-- qwiic-conn -->
| 10 | SMA connector - GNSS | <!-- sma-gnss -->
| 11 | SMA connector - BLE | <!-- sma-ble -->
| 12 | SMA connector - Cellular | <!-- sma-cellular -->
| 13 | Particle RESET button | <!-- reset-button -->
| 14 | Raspberry Pi HAT 40-pin connector | <!-- hat -->
| 15 | Particle M.2 SoM | <!-- m2-som -->
| 16 | Particle MODE button | <!-- mode-button -->
| 17 | Particle RGB LED | <!-- rgb-led -->
<!-- shared-diagram-table end m-hat -->

### <!-- shared-diagram-label m-hat usb title-label-paren -->USB-C (1)<!-- end -->

USB-C can be used for powering the M-HAT and the Raspberry Pi. 

This USB-C connector also provides USB access to the Particle M.2 SoM for programming over USB or accessing
 USB serial debug.

It is recommended that you use this USB-C connector instead of the one on the Pi, as the Pi may not provide 
sufficient power for the cellular modem unless also used with a battery. You should not connect both 
USB-C cables at the same time.

See also [Power](#power), below.

### <!-- shared-diagram-label m-hat pd-led title-label-paren -->USB-C PD LED (2)<!-- end -->

This LED will turn on when USB-C PD (power delivery) has been negotiated with the charger or host.

### <!-- shared-diagram-label m-hat dc-in title-label-paren -->DC IN (3)<!-- end -->

Optional 5V - 12V DC power input (screw terminals).

See also [Power](#power), below.

### <!-- shared-diagram-label m-hat chg-led title-label-paren -->Charge LED (4)<!-- end -->

- When lit, the battery is being charged.
- When off, the battery is fully charged, or is not charging because of insufficient power.
- When blinking, there is a battery fault or charging fault.

If you do not have a battery connected, the charge LED may flicker at boot and in DFU mode, and will periodically blink when the device attempts to determine if a battery has been connected.


### <!-- shared-diagram-label m-hat bat-conn title-label-paren -->LiPo Battery (5)<!-- end -->

The M-HAT has a 3-pin JST-PH (2mm pitch) battery connector that is the same as the Monitor One, Muon, and Tachyon for connection to a 3.7V LiPo battery pack 
with an integrated temperature sensor (10K NTC thermistor).

Some other Particle devices have a 3.7V LiPo battery without a temperature sensor using 2-pin JST-PH connector. This battery is not compatible and cannot be used with the Muon. 

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>

If you wish to use a battery without a 10K NTC temperature sensor, you must cut the normally closed trace jumper indicated, otherwise charging will never enable. It is located to the left of the power module (on the bottom side of the board), with the HAT connector on the side away from you.

{{imageOverlay src="/assets/images/m-hat/ts-jumper.png" alt="TS jumper"}}

<p class="attribution">Facing the bottom of the M-HAT</p>

If purchasing a battery from a 3rd-party supplier, verify the polarity as the polarity is not standardized even for batteries using a JST-PH connector.


### <!-- shared-diagram-label m-hat ioex-conn title-label-paren -->I/O Expansion (6)<!-- end -->

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


### <!-- shared-diagram-label m-hat rtc-conn title-label-paren -->RTC Battery (7)<!-- end -->

This connector can power the RTC (AB1805) to maintain the real-time clock if all other power sources (USB, DC IN, LiPo) are removed.

This 2-pin 1mm-pitch connector is designed to work with a standard RTC battery module for the Raspberry Pi 5 that typically contains a Lithium coin cell battery.

### <!-- shared-diagram-label m-hat grove-conn title-label-paren -->Grove connector (8)<!-- end -->

The Grove connector allows [Grove accessories](/reference/datasheets/accessories/gen3-accessories/#grove-starter-kit) to be added. Pins A1 and A2 are present on the connector. This allows the use of Grove analog and digital sensors.

{{!-- BEGIN do not edit content below, it is automatically generated f77388d6-01aa-4a52-afa9-8d05985c5907 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 33 | A1 | M2_A1/MISO | I/O | Grove A1, Input, Output, ADC, PWM |
| 35 | A2 | M2_A2/SCK | I/O | Grove A2, Input, Output, ADC |


{{!-- END do not edit content above, it is automatically generated--}}



### <!-- shared-diagram-label m-hat qwiic-conn title-label-paren -->Qwiic connector (9)<!-- end -->

[Qwiic](/hardware/expansion/qwiic/) is a 3.3V I2C standard developed by SparkFun and adopted by other manufacturers. It's also compatible with Adafruit Stemma Qt expansion devices. You can use this to add displays, sensors, etc. and multiple devices can be connected to a single Qwiic port, as accessory boards have two connectors for chaining multiple sensors.

### <!-- shared-diagram-label m-hat sma-gnss title-label-paren -->SMA connector - GNSS (10)<!-- end -->

The SMA connectors provide an alternative antenna connection. Each is connected to a U.FL pigtail that typically connects to the Particle SoM module such as the B-SoM. 

The GNSS antenna is only required if you are using GNSS. 

Many off-the-shelf GNSS antennas include a SMA connector, so the built-in adapter can be useful in this case. Since GNSS does not transmit, using an alternative GNSS antenna does not require intentional radiator certification.

### <!-- shared-diagram-label m-hat sma-ble title-label-paren -->SMA connector - BLE (11)<!-- end -->

The SMA connectors provide an alternative antenna connection. Each is connected to a U.FL pigtail that typically connects to the Particle SoM module such as the B-SoM. 

The BLE antenna is only required if you are using the BLE feature. The B-SoM does not have a built-in BLE chip antenna like the Boron, but BLE is not required for setup.

Often you will attach the Particle 2.4 GHz BLE/Wi-Fi antenna directly to the B-SoM instead of using the SMA connector.

Using an alternative BLE antenna with a SMA connector will require intentional radiator certification. 

### <!-- shared-diagram-label m-hat sma-cellular title-label-paren -->SMA connector - Cellular (12)<!-- end -->

The SMA connectors provide an alternative antenna connection. Each is connected to a U.FL pigtail that typically connects to the Particle SoM module such as the B-SoM. 

The cellular antenna is required on the B-SoM. Often you will attach the Particle cellular antenna directly to the B-SoM instead of using the SMA connector.

Using an alternative cellular antenna with a SMA connector will require intentional radiator certification. 

### <!-- shared-diagram-label m-hat reset-button title-label-paren -->Particle RESET button (13)<!-- end -->

The RESET button resets the Particle SoM module. It does not reset the Raspberry Pi.

### <!-- shared-diagram-label m-hat hat title-label-paren -->Raspberry Pi HAT 40-pin connector (14)<!-- end -->

This is a two-sided pass-through 40-pin Raspberry Pi HAT connector.

It is designed to sit on top of a Raspberry Pi, and allows additional HATs to sit on top of the M-HAT.

The 40-pin Raspberry Pi HAT connector is primarily left for use by the Pi and additional HATs, however the following connections are included between the Particle M.2 SoM and the Pi.

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

#### GPIO4 - HAT connector

GPIO4 on the Pi is used for on/off control. While the Pi does not have a true sleep mode like Particle devices, it does use 
less power in HALT mode and this pin can optionally be used for power control.

The GPIO4 pin has a 10K hardware pull-up resistor to the Pi 3V3. 

From the Particle SoM, settings `CS` pin, also known as `D8`, to `OUTPUT` and using `digitalWrite(D8, LOW)` will set GPIO4 low.

#### UART serial - HAT connector

The Raspberry Pi UART0 is connected to the Particle M.2 SoM `Serial1` UART, with hardware flow control. As is typically the case:

- RXD &harr; TXD
- CTS &harr; RTS

By default, this mapping is isolated. By the `SEL` pin, see [FSA2567](#fsa2567), below, you can enable the UART connection, which is needed for tethering.


### <!-- shared-diagram-label m-hat m2-som title-label-paren -->Particle M.2 SoM (15)<!-- end -->

The M-HAT is typically use with a Particle B-SoM B504e or B524 module.

### <!-- shared-diagram-label m-hat mode-button title-label-paren -->Particle MODE button (16)<!-- end -->

The RESET button resets the Particle SoM module. It does not reset the Raspberry Pi.

### <!-- shared-diagram-label m-hat rgb-led title-label-paren -->Particle RGB LED (17)<!-- end -->

This is a standard Particle RGB status LED. It is unaffected by the Raspberry Pi.

See the [Status LED and device modes page](/troubleshooting/led/) for an explanation of colors and patterns.

## Power

Power can be supplied to M-HAT by:

- USB-C
- VIN (5 - 12 VDC, via screw terminals)
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


#### HAT power direction jumper

A jumper located on the bottom side of the M-HAT selects the direction of expansion card (HAT) 5V power (label 20, above).

- Connecting `5V_IN` and center pin: Expansion header powers the M-HAT (typically from a PoE HAT)
- Connecting `5V_OUT` and center pin: The M-HAT powers expansion card (from USB-C, USB, or LiPo)

{{imageOverlay src="/assets/images/m-series/muon-5v-jumper.jpg" alt="5V Jumper"}}

<p class="attribution">This picture is of the Muon; the appearance of the M-HAT may differ</p>

When the jumper is set to 5V_IN, the M-HAT powers the Raspberry Pi HAT connector 5V pin, which is turn powers the Raspberry Pi itself. When using 5V_IN
mode you must not power both the M-HAT USB-C and the Pi USB-C at the same time, as both will attempt to power the HAT 5V pin, which could damage
either or both devices.

There are two separate ways 5V on the HAT connector can be generated when powering from M-HAT:
- LiPo boost converter
- DCIN or USB boost-buck converter

The outputs are ORed together using a circuit similar to an ideal diode so none, one, or both can be safely powered at the same time.

Both of these default to on, but can be disabled using GPIO.

{{!-- BEGIN do not edit content below, it is automatically generated f90b1182-87f3-4aa6-8599-01504bfdff97 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 37 | A3 | EN1_CTR | O | LiPo to 5V boost converter (HIGH to turn off, default on) |
| 41 | A4 | EN2_CTR | O | DCIN or USB boost-buck converter (HIGH to turn off, default on) |


{{!-- END do not edit content above, it is automatically generated--}}

The LiPo boost converter is isolated by a DML3006 load switch, so when disconnected, the boost converter (TPS61088) is not powered. The EN1_CTR control line connects to the load switch via a 2N7002 N-channel MOSFET to handle the inversion and voltage-level differences.

The EN2_CTR control line connects to the MP28167 boost-buck converter EN pin via a 2N7002 N-channel MOSFET to handle the inversion and voltage-level differences.

## Internal peripherals

### STUSB4500 - Internal peripherals

The STUSB4500 USB PD controller has three connections, however they are not frequently needed and are hard to access on the B-SoM.

{{!-- BEGIN do not edit content below, it is automatically generated 3f9e11ff-5582-435d-af08-5e087b63414b --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | PD_RST | O | USB PD controller reset, pin is NFC1 on B-SoM |
| 19 | D20 | PD_ALERT | I | USB PD controller alert, pin is NFC2 on B-SoM |
| 59 | D26 | PD_ATTACH | I | USB PD controller attach interrupt, NC on B-SoM |


{{!-- END do not edit content above, it is automatically generated--}}

If using the B-SoM, it is recommended that you disable NFC in the UICR bytes of the nRF52840. This will allow the MCU to 
use the NFC pins (NFC1 and NFC2) as GPIO, which will allow you to access the PD_RST and PD_ATTACH pins.

A [library and instructions]((https://github.com/rickkas7/NFC_UICR_RK/) are available for doing so.

#### PD_RST

This is the PD_RST line to reset the STUSB4500 USB PD controller. You normally will not need to use this.

This is the NFC1 pin on the B-SoM. The NFC pins can be converted from NFC Tag to GPIO, but doing so requires changing the UICR bytes in the nRF52840 configuration flash and rebooting the MCU. After that, the pins will remain as GPIO.

There is a 10K hardware pull-down resistor on this pin. If you set the pin to OUTPUT and HIGH, it will reset the chip.

#### PD_ALERT

This is the PD_ALERT output from the STUSB4500 USB PD controller. It is not enabled by default.

This is the NFC2 pin on the B-SoM. The NFC pins can be converted from NFC Tag to GPIO, but doing so requires changing the UICR bytes in the nRF52840 configuration flash and rebooting the MCU. After that, the pins will remain as GPIO.


#### PD_ATTACH

This is the PD_ATTACH output from the STUSB4500 USB PD controller. 

This pin is not available on the B-SoM.

### FSA2567 - Internal peripherals

This chip isolates the UART pins (RX, TX, CTS, RTS) between the Particle M.2 SoM and the Pi. 

If the A0 pin is set HIGH, then the UART is connected:

- RXD &harr; TXD
- CTS &harr; RTS

{{!-- BEGIN do not edit content below, it is automatically generated 7f56ea43-30ef-4cb1-988a-3d7e31247bc9 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 | SEL | O | HIGH to enable SoM to Pi UART |


{{!-- END do not edit content above, it is automatically generated--}}

By default, the serial connection is isolated.

To enable the UART connection, you would typically use code like this in your firmware that enabled tethering:

```cpp
pinMode(A0, OUTPUT);
digitalWrite(A0, HIGH); // enable UART connection
```

### TMP112A - Internal peripherals

This is the temperature sensor on the M-HAT, which is connected by I2C. There is an optional alert output that can be enabled
on the sensor. It is an open-collector output and is connected to D4. If you are using this feature, be sure to set 
`pinMode(D4, INPUT_PULLUP)` so the input does not float. There is no hardware pull-up on tbe M-HAT on this line.

{{!-- BEGIN do not edit content below, it is automatically generated f6622f00-cc13-43e4-99d4-c955ed253710 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 66 | D4 | TEMP_ALERT | I | Temperature sensor ALERT output |


{{!-- END do not edit content above, it is automatically generated--}}

### AB1805 - Internal peripherals

The AB1805 RTC/Watchdog provides additional RTC and hardware watchdog options. It can be powered by:

- USB-C power
- DCIN
- HAT connector (when the jumper is selected to power from HAT)
- LiPo battery

Note that the LiPo battery will power the chip even when the PMIC BATFET is disabled.

The FOUT/IRQ output from the AB1805 is an open-collector output and defaults to Hi-Z in the chip. If you are using this feature, be sure to set 
`pinMode(D5, INPUT_PULLUP)` so the input does not float. There is no hardware pull-up on tbe M-HAT on this line.

{{!-- BEGIN do not edit content below, it is automatically generated e37904f1-301c-4f2b-97a9-3bab92a6acd3 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 68 | D5 | RTC_INT | I | RTC/Watchdog FOUT/IRQ output |


{{!-- END do not edit content above, it is automatically generated--}}

Additionally, the <!-- shared-diagram-label m-hat rtc-conn title-label-paren -->RTC Battery (7)<!-- end --> connector is connected to 
the VBAT in of the AB1805. This allows the RTC to maintain time when all other sources of power are removed. This feature is optional.

### PM-BAT - Internal peripherals

[PM-BAT](/hardware/power/pm-bat-datasheet/) power module includes an open-collector output for interrupts from the bq24195 PMIC
and the MAX17043 fuel gauge. If using this feature, be sure to set `pinMode(A7, INPUT_PULLUP)` so the input does not float.

{{!-- BEGIN do not edit content below, it is automatically generated cc5c6247-5bdb-43bd-8b18-24954f4adea4 --}}

| Module Pin | Pin Name | Schematic net | MCU direction | Description |
| :---: | :--- | :--- | :--- | :--- |
| 47 | A7 | M2_A7/PMIC_INT | I | PMIC and fuel gauge interrupt output |
| 72 | D7 | D7/AUX_POWER_EN | O | 3V3_AUX power control (HIGH to turn on) |


{{!-- END do not edit content above, it is automatically generated--}}

This output controls the 3V3_AUX power, which also powers:

- Qwiic connector
- Grove connector

Unlike the Muon, AUX_PWR_EN does not control 3.3V and 5V power to the HAT connector.

### GPIO - Internal peripherals

{{imageOverlay src="/assets/images/m-hat/m-hat-m2.svg" alt="Pin Diagram"}}

{{!-- BEGIN do not edit content below, it is automatically generated 5c7622c6-ae73-4a5b-88b6-e761ee69fa3f --}}

| Pin Name | Schematic net | MCU direction | Connected to | Description | M.2 pin |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 | SEL | O | FSA2567 | HIGH to enable SoM to Pi UART | 23 |
| A1 | M2_A1/MISO | I/O | Grove A1 | Grove A1, Input, Output, ADC, PWM | 33 |
| A2 | M2_A2/SCK | I/O | Grove A2 | Grove A2, Input, Output, ADC | 35 |
| A3 | EN1_CTR | O | DML3006 | LiPo to 5V boost converter (HIGH to turn off, default on) | 37 |
| A4 | EN2_CTR | O | MP28167 | DCIN or USB boost-buck converter (HIGH to turn off, default on) | 41 |
| A7 | M2_A7/PMIC_INT | I | PM-BAT | PMIC and fuel gauge interrupt output | 47 |
| CS | WAKE_RPI_CTR | O | HAT | Pi power control by GPIO4 | 48 |
| CTS | M2_D3/CTS | I | HAT | UART serial CTS, connects to Pi UART0 RTS | 40 |
| D4 | TEMP_ALERT | I | TMP112A | Temperature sensor ALERT output | 66 |
| D5 | RTC_INT | I | AB1805 | RTC/Watchdog FOUT/IRQ output | 68 |
| D6 | M2_D6 | I/O | IOEX connector | PWM, GPIO on IOEX connector | 70 |
| D7 | D7/AUX_POWER_EN | O | PM-BAT | 3V3_AUX power control (HIGH to turn on) | 72 |
| D20 | PD_ALERT | I | STUSB4500 | USB PD controller alert, pin is NFC2 on B-SoM | 19 |
| D21 | PD_RST | O | STUSB4500 | USB PD controller reset, pin is NFC1 on B-SoM | 17 |
| D22 | 3V3_DETECTION | I | HAT connector | HIGH when Pi is supplying 3V3 to the HAT connector | 62 |
| D23 | M2_D23 | I/O | IOEX connector | GPIO on IOEX connector | 64 |
| D24 | M2_D24 | I/O | IOEX connector | On IOEX connector, NC on B-SoM | 58 |
| D25 | M2_D25 | I/O | IOEX connector | On IOEX connector, NC on B-SoM | 60 |
| D26 | PD_ATTACH | I | STUSB4500 | USB PD controller attach interrupt, NC on B-SoM | 59 |
| MODE | M2/MODE | I | MODE button | MODE button for Particle SoM | 32 |
| RESET | M2/RESET | I | RESET button | RESET button for Particle SoM | 34 |
| RTS | M2_D2/RTS | O | HAT | UART serial RTS, connects to Pi UART0 CTS | 42 |
| RXD | M2_RXD | I | HAT | UART serial RXD, connects to Pi UART0 TXD | 38 |
| SCL | M2_SCL | I/O | Multiple | I2C SCL | 20 |
| SDA | M2_SDA | I/O | Multiple | I2C SDA | 22 |
| SOM14 | SOM14 | I/O | IOEX connector | NC on B-SoM | 51 |
| SOM17 | SOM17 | I/O | IOEX connector | NC on B-SoM | 57 |
| TXD | M2_TXD | O | HAT | UART serial TXD, connects to Pi UART0 RXD | 36 |


{{!-- END do not edit content above, it is automatically generated--}}

### I2C

The I2C bus is not shared between the Raspberry Pi and the Particle M.2 SoM. The following internal peripherals are present on the Particle M.2 SoM primary I2C bus (`Wire`):

| I2C Address | Peripheral |
| :--- | :--- |
| 0x28 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x69 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |


## Other

### NFC

The M-HAT does not support NFC tag. NFC tag is not supported on the M-SoM, and there is no connector for use with the B-SoM.

### SWD/JTAG

The 10-pin SWD/JTAG debugging connector is not populated on the M-HAT. 

Additionally, the Particle M.2 SoM SWD pogo pins are not available on the M-HAT, so SWD would only work
on M-SoM, not B-SoM, even if populated.

Note that the 2x5 connector on the top of the M-HAT is the IOEX connector, not the debug connector, even though the debug
cable does fit in the connector.


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

### Tethering code - Firmware settings

The following code can be added to your application to enable the UART interface connection and enable
tethering so the Raspberry Pi can use the B-SoM cellular connection.

{{> codebox content="/assets/files/tether-mhat.cpp" format="cpp" height="400" flash="true"}}

- For general information, see [Tethering](reference/device-os/tethering/).
- For information about the `Tether` class, see the [Device OS API reference](/reference/device-os/api/tether/).

Note that the M-SoM does not support tethering and cannot be used to supply a cellular network connection to a Raspberry Pi with the M-HAT.

### One-time configuration - Firmware settings
The following code can be used to enable Ethernet on the M-HAT. This only needs to be done
once and the device must be reset after configuration for the changes to take effect.  It requires Device OS 5.9.0 or later.

```cpp
// Enable 3V3_AUX
SystemPowerConfiguration powerConfig = System.getPowerConfiguration();
powerConfig.auxiliaryPowerControlPin(D7).interruptPin(A7);
System.setPowerConfiguration(powerConfig);
```

### Manual configuration - Firmware settings

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

To be provided at a later date.

## Certification

The cellular (intentional radiator) certification depends on the cellular module you have selected.

- [B504e certification documents](/hardware/certification/certification-documents/#b504-b-series-som)
- [B524 certification documents](/hardware/certification/certification-documents/#b523-b524-b-series-som)

If you are building a product with the M-HAT and are using the Particle certified cellular antenna you may not need to complete intentional radiator testing.

You will likely need to perform unintentional radiator testing with your compete module, however. Fortunately this is generally the least expensive and least complicated test.


## Cellular carriers

The carriers are dependent on the Particle M.2 SoM you have selected for your M-HAT.

- [B504e carriers](/reference/cellular/cellular-carriers/?tab=ByDevice&device=B-Series%20B504%20LTE%20CAT1%2F3G%20(NorAm)%20EtherSIM&region=All)
- [B524 carriers](/reference/cellular/cellular-carriers/?tab=ByDevice&device=B-Series%20B524%20LTE%20CAT1%2F3G%2F2G%20(EMEAA)%20EtherSIM&region=All)

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
