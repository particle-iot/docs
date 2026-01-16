---
title: Electron datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Electron, Gen 2 cellular development kit
---


# Electron Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/electron-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{box op="start" cssClass="boxed warningBox"}}
The Electron has been deprecated. See the [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information.
{{box op="end"}}

<div align=center><img src="/assets/images/electron/illustrations/electron-v20.png" ></div>


## Functional description

### Overview

Note: The Electron U260 and U270 have been deprecated and are no longer available for sale. New designs should use the B-Series SoM or Boron. For a pin-compatible replacement for the G350, U260, and U270, the Electron ELC314 is available in tray quantities only.

The Electron is a tiny development kit for creating cellular-connected electronics projects and products. It comes with a SIM card (Nano 4FF)<sup>[1]</sup> and an affordable data plan for low-bandwidth things. Plus it's available for more than 100 countries worldwide!

It also comes with Particle's development tools and cloud platform for managing and interacting with your new connected hardware.

### Features

 * U-blox SARA-U201/U260/U270 (3G with 2G fallback), G350 (2G), or R410M (LTE Cat M1) cellular module
 * STM32F205RGT6 120MHz ARM Cortex M3 microcontroller
 * 1MB flash, 128KB RAM
 * BQ24195 power management unit and battery charger
 * MAX17043 fuel gauge
 * RGB status LED
 * 30 mixed-signal GPIO and advanced peripherals
 * Open source design
 * Real-time operation system (RTOS)
 * FCC (United States), CE (European Union), and ISED (Canada) certified

<sup>[1]</sup>The LTE model uses a MFF2 SMD Particle SIM instead of a physical SIM card. The Electron LTE is only available to existing enterprise customers who have deployed an Electron 2G/3G solution and would like to upgrade to LTE. It is only available in tray quantities. New designs should use the Boron LTE or B-Series B404 SoM. It can only be used in the United States, Canada, and Mexico at this time.

### Device OS support

It is recommended that you use the latest version in the 2.x LTS release line with the all Electrons.

While the devices are compatible with older versions of Device OS and 3.x, these versions as past the end-of-support date and are not recommended for use in production. Only 2.x LTS remains in the Extended Support and Maintenance (ESM) window.

For information on upgrading Device OS, see [Version information](/reference/device-os/versions/). For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).



## Interfaces

### Block diagram

<div align=center><img src="/assets/images/electron/illustrations/electron-blockdiagram.png" width=700></div>

### Power
The Electron can be powered via the VIN (3.9V-12VDC) pin, the USB Micro B connector or a LiPo battery.

#### USB
Most USB ports can supply only a maximum of 500mA, but the u-Blox GSM module on the Electron alone can consume a peak of 800mA to 1800mA (2G/3G) or 490 mA (LTE) of current during transmission. In order to compensate of this deficit, one must connect the LiPo battery at all times when powering from a traditional USB port for 2G/3G. The Electron will intelligently source power from the USB most of the time and keep the battery charged. During peak current requirements, the additional power will be sourced from the battery. This reduces the charge-discharge cycle load on the battery, thus improving its longevity.

#### VIN
The input voltage range on VIN pin is 3.9VDC to 12VDC. When powering from the VIN pin alone, make sure that the power supply is rated at 10W (for example 5VDC at 2Amp). If the power source is unable to meet this requirement, you'll need connect the LiPo battery as well.  An additional bulk capacitance of 470uF to 1000uF should be added to the VIN input when the LiPo Battery is disconnected.  The amount of capacitance required will depend on the ability of the power supply to deliver peak currents to the cellular modem.

The Electron LTE (ELC404 & ELC402, LTE Cat 1) can be powered with as little as 550 mA at 5V.

#### LiPo Battery
When powered from a LiPo battery alone, the power management IC switches off the internal regulator and supplies power to the system directly from the battery. This reduces the conduction losses and maximizes battery run time. The battery provided with the Electron is a Lithium-Ion Polymer battery rated at 3.7VDC 1,800mAh. You can substitute this battery with another 3.7V LiPo with higher current rating. Remember to never exceed this voltage rating and always pay attention to the polarity of the connector.

Typical current consumption is around 180mA and up to 1.8A transients at 5VDC. In deep sleep mode, the quiescent current is 130uA (powered from the battery alone).

#### Li+
This pin is internally tied to the positive terminal of the LiPo battery connector. It is intentionally left unpopulated. Please note that an incorrect usage of this pin can render the Electron unusable.

Li+ pin serves two purposes. You can use this pin to connect a LiPo battery directly without having to use a JST connector or it can be used to connect an external DC power source (and this is where one needs to take extra precautions). When powering it from an external regulated DC source, the  recommended input voltage range on this pin is between 3.6V to 4.4VDC. Make sure that the supply can handle currents of at least 2 Amps.

This is the most efficient way of powering the Electron since the PMIC by-passes the regulator and supplies power to the Electron via an internal FET leading to lower quiescent current.

#### VUSB
This pin is internally connected to USB supply rail and will output 5V when the Electron is plugged into an USB port. It is intentionally left unpopulated. This pin will _NOT_ output any voltage when the Electron is powered via VIN and/or the LiPo battery.

#### 3V3 Pin
This pin is the output of the on-board 3.3V switching regulator that powers the microcontroller and the peripherals. This pin can be used as a 3.3V power source with a max load of 800mA. 3.3V will also be available on that pin while the device being in deep sleep. Unlike the Photon or the Core, this pin _CANNOT_ be used as an input to power the Electron.

#### VBAT
Supply to the internal RTC, backup registers and SRAM when 3V3 is not present (1.65 to 3.6VDC). The Pin is internally connected to 3V3 supply via a 0 ohm resistor. If you wish to power VBAT via an external supply, you'll need to remove this resistor with a desoldering iron.  Contact us if you wish to request trays of electrons with this jumper depopulated.

#### Powering the Electron without a battery
The most forgiving way to power the Electron without a battery is via the VIN input [see VIN above](#vin).  Power may also be applied separately to the Li+ pin or LiPo JST connector [see Li+ above](#li-).

<!---
#### PMID
This is a very interesting pin (or rather a pad ) and it's usage is often confusing. This pin is the output of an internal boost regulator of the PMIC that can source 5.1VDC from the battery in OTG (On The Go) mode. This feature is useful when your circuitry needs a 5V source from the Electron when powered by the battery alone.

The confusing bit about this pin is that it will continue to provide 5.1VDC but only when the input voltage (VIN) is between 3.6V to 5.1VDC. As soon as the input voltage exceeds this limit, the PMID starts tracking _that_ voltage. For example if VIN = 9VDC, the PMID will be 9VDC and _NOT_ 5.1VDC. So you need to be careful when using it as a source for powering your external circuitry. The max current draw on this pin is 2.1A but is not recommended due to thermal limitations of the circuit board.
<add photo here>
-->

### FCC approved antennas

|Antenna Type| Manufacturer | MFG. Part #| Gain|
|:--|:--|:--|:--|
|2G/3G PCB antenna| Taoglas| [PC104.07.0165C](/assets/datasheets/PC104.07.0165C.pdf)| 1dBi ~ 2.39dBi|
|LTE flex antenna| Taoglas| [FXUB63.07.0150C](/assets/datasheets/FXUB63.07.0150C.pdf)| 5.00dBi peak|


---

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) | FT<sup>[1]</sup> / 3V3<sup>[2]</sup> |
| :---:|:---:|:---:|:---: |
| Digital | 30 | I/O | FT/3V3 |
| Analog (ADC) | 12 | I | 3V3 |
| Analog (DAC) | 2 | O | 3V3 |
| UART | 3 | I/O | 3V3 |
| SPI  | 2 | I/O | 3V3 |
| I2S  | 1 | I/O | 3V3 |
| I2C  | 1 | I/O | FT |
| CAN  | 2 | I/O | 3V3<sup>[4]</sup> |
| USB  | 1 | I/O | 3V3 |
| PWM  | 13<sup>3</sup> | O | 3V3 |

**Notes:**
<sup>[1]</sup> FT = 5.0V tolerant pins. All pins except A3 and DAC are 5V tolerant (when not in analog mode). If used as a 5V input the pull-up/pull-down resistor must be disabled.

<sup>[2]</sup> 3V3 = 3.3V max pins.

<sup>[3]</sup> PWM is available on D0, D1, D2, D3, B0, B1, B2, B3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 11 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

<sup>[4]</sup> Technically these pins are 5.0V tolerant, but since you wouldn't operate them with a 5.0V transceiver it's proper to classify them as 3.3V.

### JTAG AND SWD
Pin D3 through D7 are JTAG interface pins. These can be used to reprogram your Electron bootloader or user firmware image with standard JTAG tools such as the ST-Link v2, J-Link, R-Link, OLIMEX ARM-USB-TINI-H, and also the FTDI-based Particle JTAG Programmer. If you are short on available pins, you may also use SWD mode which requires less connections.

| Electron Pin | JTAG | SWD | STM32F205RGT6 Pin | Default Internal<sup>[1]</sup> |
| :-:|:-:|:-:|:-:|
| D7 | JTAG_TMS | SWD/SWDIO| PA13 | ~40k pull-up |
| D6 | JTAG_TCK | CLK/SWCLK| PA14 | ~40k pull-down |
| D5 | JTAG_TDI | |PA15 | ~40k pull-up |
| D4 | JTAG_TDO | |PB3 | Floating |
| D3 | JTAG_TRST | |PB4 | ~40k pull-up |
| 3V3 | Power | || |
| GND | Ground| || |
| RST | Reset | || ||


**Notes:**
[1] Default state after reset for a short period of time before these pins are restored to GPIO (if JTAG debugging is not required, i.e. `USE_SWD_JTAG=y` is not specified on the command line.)

## Memory map

### STM32F205RGT6 Flash layout overview

- Bootloader (16 KB)
- DCD1 (16 KB), stores keys, mfg info, system flags, etc..
- DCD2 (16 KB), swap area for DCD1
- EEPROM emulation bank 1 (16 KB)
- EEPROM emulation bank 2 (64 KB)
- Device OS (512 KB) [256 KB comms + 256 KB hal/platform/services]
- Factory backup, OTA backup and user application (384 KB) [3 x 128 KB]

### DCD Layout

The DCD area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCD layout in `release/stable`_ <a href="https://github.com/particle-iot/device-os/blob/release/v2.x/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

| Region | Offset | Size |
|:---|---|---|
| system flags | 0 | 32 |
| version | 32 | 2 |
| device private key | 34 | 1216 |
| device public key | 1250 | 384 |
| ip config | 1634 | 120 |
| feature flags | 1754 | 4 |
| country code | 1758 | 4 |
| claim code | 1762 | 63 |
| claimed | 1825 | 1 |
| ssid prefix | 1826 | 26 |
| device code | 1852 | 6 |
| version string | 1858 | 32 |
| dns resolve | 1890 | 128 |
| reserved1 | 2018 | 64 |
| server public key | 2082 | 768 |
| padding | 2850 | 2 |
| flash modules | 2852 | 100 |
| product store | 2952 | 24 |
| antenna selection | 2976 | 1 |
| cloud transport | 2977 | 1 |
| alt device public key | 2978 | 128 |
| alt device private key | 3106 | 192 |
| alt server public key | 3298 | 192 |
| alt server address | 3490 | 128 |
| device id | 3618 | 12 |
| radio flags | 3630 | 1 |
| mode button mirror | 3631 | 32 |
| led mirror | 3663 | 96 |
| led theme | 3759 | 64 |
| reserved2 | 3823 | 435 |

### Memory map (common)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Bootloader | 0x8000000 | 0x8004000 | 16 KB |
| DCD1 | 0x8004000 | 0x8008000 | 16 KB |
| DCD2 | 0x8008000 | 0x800C000 | 16 KB |
| EEPROM1 | 0x800C000 | 0x8010000 | 16 KB |
| EEPROM2 | 0x8010000 | 0x8020000 | 64 KB |

### Memory map (modular firmware - default)
_Before 0.6.0 firmware_

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| System Part 1 | 0x8020000 | 0x8040000 | 128 KB |
| System Part 2 | 0x8040000 | 0x8060000 | 128 KB |
| Application | 0x8080000 | 0x80A0000 | 128 KB |
| Factory Reset/Extended Application | 0x80A0000 | 0x80C0000 | 128 KB |
| OTA Backup | 0x80C0000 | 0x80E0000 | 128 KB |
| Decompress region | 0x80E0000 | 0x8100000 | 128 KB |

_Since 0.6.0 firmware_

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| System Part 2 | 0x8020000 | 0x8040000 | 128 KB |
| System Part 3 | 0x8040000 | 0x8060000 | 128 KB |
| System Part 1 | 0x8060000 | 0x8080000 | 128 KB |
| Application | 0x8080000 | 0x80A0000 | 128 KB |
| Factory Reset/Extended Application | 0x80A0000 | 0x80C0000 | 128 KB |
| OTA Backup | 0x80C0000 | 0x80E0000 | 128 KB |
| Decompress region | 0x80E0000 | 0x8100000 | 128 KB |

---

### Memory map (monolithic firmware - optional)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Firmware | 0x8020000 | 0x8080000 | 384 KB |
| Factory Reset | 0x8080000 | 0x80E0000 | 384 KB |
| Unused (factory reset modular) | 0x80E0000 | 0x8100000 | 128 KB |

---

## Pin and button definition

### Pin markings:

<div align=center><img src="/assets/images/electron/illustrations/electron_pin_markings.png"></div>

<div align=center><img src="/assets/images/electron/illustrations/electron_pin_markings_bottom.png"></div>

---

### Pin description

|   Pin | Description |
| :-----|:----- |
| VIN | This pin can be used as an input or output. As an input, supply 5VDC to 12VDC to power the Electron. When the Electron is powered via the USB port, this pin will output a voltage of approximately 4.8VDC due to a reverse polarity protection series Schottky diode between VUSB and VIN. When used as an output, the max load on VIN is 1Amp. |
| RST | Active-low reset input. On-board circuitry contains a 10k ohm pull-up resistor between RST and 3V3, and 0.1uF capacitor between RST and GND. |
| VBAT | Supply to the internal RTC, backup registers and SRAM when 3V3 is not present (1.65 to 3.6VDC). The Pin is internally connected to 3V3 supply via a 0 ohm resistor. If you wish to power VBAT via an external supply, you'll need to remove this resistor with a desoldering iron.  Contact us if you wish to request trays of electrons with this jumper depopulated. |
| 3V3 |This pin is the output of the on-board regulator. When powering the Electron via VIN or the USB port, this pin will output a voltage of 3.3VDC. The max load on 3V3 is 800mA. It should not be used as an input to power the Electron. |
| WKP |Active-high wakeup pin, wakes the module from sleep/standby modes. When not used as a WAKEUP, this pin can also be used as a digital GPIO, ADC input or PWM<sup>[1]</sup>. Can be referred to as `A7` when used as an ADC.|
| DAC |12-bit Digital-to-Analog (D/A) output (0-4095), referred to as `DAC` or `DAC1` in software. Can also be used as a digital GPIO or ADC. Can be referred to as `A6` when used as an ADC. |
| RX |Primarily used as UART RX, but can also be used as a digital GPIO or PWM<sup>[1]</sup>.|
| TX |Primarily used as UART TX, but can also be used as a digital GPIO or PWM<sup>[1]</sup>.|
| D0-D7 | Digital only GPIO.  `D0, D1, D2, D3` can also be used as PWM<sup>[1]</sup> outputs.|
| A0-A7 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs. A6 and A7 are code convenience mappings, which means pins are not actually labeled as such but you may use code like `analogRead(A7)`. `A6` maps to the `DAC` pin and `A7` maps to the `WKP` pin. `A3` is also a second DAC output used as `DAC2` or `A3` in software. `A4` and `A5` can also be used as PWM<sup>[1]</sup> outputs.|
| B0-B5 | `B0` and `B1` are digital only while `B2, B3, B4, B5` are 12-bit A/D inputs as well as digital GPIOs. `B0, B1, B2, B3` can also be used as PWM<sup>[1]</sup> outputs.|
| C0-C5 | Digital only GPIO. `C4` and `C5` can also be used as PWM<sup>[1]</sup> outputs.|
| VUSB | This pin is internally connected to USB supply and will output 5V when the Electron is plugged into an USB port. It is intentionally left unpopulated. |
| Li+ | This pin is internally connected to the positive terminal of the LiPo battery. It is intentionally left unpopulated. |

**Notes:**

<sup>[1]</sup> PWM is available on D0, D1, D2, D3, B0, B1, B2, B3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 11 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

---

### LED Status

#### Charge status LED

|State | Description |
|:---|:---|
|ON | Charging in progress |
|OFF | Charging complete |
|Blink at 1Hz| Fault condition<sup>[1]</sup> |
|Rapid blinking | Battery disconnected<sup>[2]</sup> |

**Notes:**

<sup>[1]</sup> A fault condition can occur due to several reasons, for example, battery over/under voltage, temperature fault or safety timer fault. You can find the root cause by reading the fault register of the power management IC in firmware.

<sup>[2]</sup> You can stop this behavior by either plugging in the LiPo battery or by disabling charging using firmware command: `PMIC().disableCharging();`.

#### System RGB LED

For a detailed explanation of different color codes of the RGB system LED, please take a look [here.](/troubleshooting/led/)

### Pinout diagram

<div align=center> <a href="/assets/images/electron/illustrations/electron_pinout.pdf" target="_blank"> <img src="/assets/images/electron/illustrations/electron_pinout.png"> </a></div>

You can download a high resolution pinout diagram in a <a href="/assets/images/electron/illustrations/electron_pinout.pdf" target="_blank"><strong>PDF version here.</strong></a></div><br>

## Technical specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| Supply Input Voltage | V<sub>IN-MAX</sub> |  |  | +17 | V |
| Supply Output Current | I<sub>IN-MAX-L</sub> |  |  | 1 | A |
| Battery Input Voltage | V<sub>LiPo</sub> |  |  | +6 | V |
| Supply Output Current | I<sub>3V3-MAX-L</sub> |  |  | 800 | mA |
| Storage Temperature | T<sub>stg</sub> | -30 |  | +75 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 2 | kV |

<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.

### Recommended operating conditions <i class="icon-check"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Supply Input Voltage | V<sub>VIN</sub> | +3.88<sup>[1]</sup> |  | +12 | V |
| Supply Output Voltage | V<sub>VIN</sub> |  | +4.8 |  | V |
| Supply Output Voltage | V<sub>3V3</sub> |  | +3.3 |  | V |
| LiPo Battery Voltage | V<sub>LiPo</sub> | +3.6 |  | +4.4 | V |
| Supply Input Voltage | V<sub>VBAT</sub> | +1.65 |  | +3.6 | V |
| Supply Input Current (VBAT) | I<sub>VBAT</sub> |  |  | 19 | uA |
| Operating Current (uC on, Cellular ON) | I<sub>VIN avg</sub> |  | 180 | 250 | mA |
| 2G/3G Peak Current (uC on, Cellular ON) | I<sub>IN pk</sub> | 800<sup>[2]</sup> |  | 1800<sup>[3]</sup> | mA |
| LTE Peak Current (uC on, Cellular ON) | I<sub>IN pk</sub> | | 550| | mA |
| Operating Current (uC on, Cellular OFF) | I<sub>VIN avg</sub> |  | 47 | 50 | mA |
| Sleep Current (4.2V LiPo, Cellular OFF)| I<sub>Qs</sub> |  | 0.8 | 2 | mA |
| Deep Sleep Current (4.2V LiPo, Cellular OFF) | I<sub>Qds</sub> |  | 110 | 130 | uA |
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>[1]</sup> The minimum input voltage is software defined with a user selectable range of 3.88V to 5.08V in 80mV increments. Out of the box, the minimum input voltage is set to 4.36V in order for the LiPo battery to be able to properly charge.

<sup>[2]</sup> 3G operation

<sup>[3]</sup> 2G operation

---

### Power consumption

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 29.5 | 33.3 | 34.6 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 26.8 | 42.6 | 786 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 59.7 | 103 | 592| mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 54.0 | 106 | 897 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 30.8 | 37.0 | 114 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 49.9 | 114 | 914 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 1.72 | 2.40 | 3.14 | mA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 5.48 | 6.03 | 6.69 | mA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 1.92 | 2.53 | 3.12 | mA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 12.5 | 13.1 | 13.9 | mA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 23.8 | 28.1 | 93.0 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | 1.91 | 2.42 | 2.99| mA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | 1.94 | 2.55 | 3.21 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 108 | 114 | 121 | uA |
| HIBERNATE mode sleep, RTC wake-up | I<sub>hib_rtc</sub> | 108 | 114 | 120 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).


---

### Radio specifications

The Electron is available in different versions: A 2G version based on u-blox G350 cellular module, two 3G versions based on U260 and U270 modules, and a LTE Cat M1 model (R410M-02B-00 or R410M-02B-03).

Some countries have already stopped supporting 2G, including Australia, Japan, Korea, Singapore, and Taiwan. The cellular carrier used by the Electron no longer supports 2G in New Zealand and Switzerland. The G350 cannot be used in these countries.

The difference between the 3G versions is their operating frequency band which differs based on the country. All of these cellular modules are GSM only and do not support CDMA networks. Both 3G models can fall back to using 2G in areas that support 2G and not 3G.

Note that LTE is LTE Cat M1, not the standard LTE (LTE Cat 1) used by your mobile phone. It is a low-power and low-data-rate variation of LTE for use with IoT devices.

| Electron 3G Module  | Compatible Countries |
| :------------------ |:---|
| U201 | Global |
| U260 | United States, Australia, Argentina, Brazil, Canada, Chile, Colombia, Costa Rica, Dominican Republic, El Salvador, Guatemala, Honduras, Mexico, New Zealand, Nicaragua, Panama, Paraguay, Peru, Venezuela |
| U270 |  Austria, Bahrain, Belarus, Belgium, Bulgaria, China, Congo, Croatia, Cyprus, Czech Republic, Denmark, Ecuador, Egypt, Estonia, Finland, France, Germany, Ghana, Gibraltar, Greece, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Israel, Italy, Japan, Jersey, Kenya, Republic of Korea, Latvia, Lithuania, Luxembourg, Republic of Macedonia, Malaysia, Republic of Moldova, Republic of Montenegro, Netherlands, Nigeria, Norway, Pakistan, Philippines, Poland, Portugal, Qatar, Reunion, Romania, Russian Federation, Rwanda, Saudi Arabia, Republic of Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, South Africa, Spain, Sri Lanka, Swaziland, Sweden, Switzerland, Taiwan, United Republic of Tanzania, Thailand, Turkey, Uganda, Ukraine, United Arab Emirates, United Kingdom, Uruguay, Zambia |
| R410M | United States, Canada, Mexico |


Please be sure to order a board that works in the country where you want to deploy your project.

#### 2G cellular characteristics for G350, U201, U260, and U270 modules:
|Parameter | SARA-U201 | SARA-U260 | SARA-U270 | SARA-G350 |
|:---|:---:|:---:|:---:|:---:|
|Protocol stack| 3GPP Release 7 | GPP Release 7 | 3GPP Release 7 | 3GPP Release 99 |
|MS Class | Class B | Class B | Class B | Class B |
| GSM 850 MHz Band | &check; | &check; | &nbsp; | &check; |
| E-GSM 900 MHz Band | &check; | &nbsp; | &check; | &check; |
| DSC 1800 MHz Band | &check; | &nbsp; | &check; | &check; |
| PCS 1900 MHz Band | &check; | &check; | &nbsp; | &check; |
| Power Class 850/900 | Class 4 (33 dBm)  | Class 4 (33 dBm) | Class 4 (33 dBm) | Class 4 (33 dBm) |
| Power Class 1800/1900 | Class 1 (30 dBm) | Class 1 (30 dBm) | Class 1 (30 dBm) | Class 1 (30 dBm) | 

#### 3G cellular characteristics for U201, U260, and U270 modules:
|Parameter | SARA-U201 | SARA-U260 | SARA-U270 |
|:---|:---:|:---:|:---:|
|Protocol stack| 3GPP Release 7 | 3GPP Release 7 | 3GPP Release 7 |
|UE Class| Class A | Class A | Class A|
| Band 5 (850 MHz) | &check; | &check; | &nbsp; |
| Band 8 (900 MHz) | &check; | &nbsp; | &check; |
| Band 1 (2100 MHz) | &check; | &nbsp; | &check; |
| Band 2 (1900 MHz) | &check; | &check; | &nbsp; |
|Power Class | Class 3 (24 dBm) |Class 3 (24 dBm) | Class 3 (24 dBm) |

#### u-blox SARA-R410M-02B-00 or R410M-02B-03

| Parameter | Value |
| --- | --- |
| Protocol stack | 3GPP Release 13 |
| RAT | LTE Cat M1 Half-Duplex |
| LTE FDD Bands | Band 12 (700 MHz) |
| | Band 28 (700 MHz)  |
| | Band 13 (750 MHz)  |
| | Band 20 (800 MHz)  |
| | Band 5 (850 MHz) |
| | Band 8 (900 MHz)  |
| | Band 4 (1700 MHz) |
| | Band 3 (1800 MHz)  |
| | Band 2 (1900 MHz) |
| Power class | Class 3 (23 dBm) |

---

### I/O characteristics

These specifications are based on the STM32F205RGT6 datasheet, with reference to Electron pin nomenclature.

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:|:---: |
| Standard I/O input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.28*(V<sub>3V3</sub>-2)+0.8 | V |
| I/O FT<sup>[1]</sup> input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.32*(V<sub>3V3</sub>-2)+0.75 | V |
| Standard I/O input high level voltage | V<sub>IH</sub> | | 0.41*(V<sub>3V3</sub>-2)+1.3 | | V<sub>3V3</sub>+0.3 | V |
| I/O FT<sup>[1]</sup> input high level voltage | V<sub>IH</sub> | V<sub>3V3</sub> > 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.5 | V |
| <sup></sup> | V<sub>IH</sub> | V<sub>3V3</sub> ≤ 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.2 | V |
| Standard I/O Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 200 | | | mV |
| I/O FT Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 5% V<sub>3V3</sub><sup>[3]</sup> | | | mV |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | GND ≤ V<sub>io</sub> ≤ V<sub>3V3</sub> GPIOs | | | ±1 | µA |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | R<sub>PU</sub> | V<sub>io</sub> = 5V, I/O FT | | 3 | µA |
| Weak pull-up equivalent resistor<sup>[5]</sup> | R<sub>PU</sub>| V<sub>io</sub> = GND | 30 | 40 | 50 | k Ω |
| Weak pull-down equivalent resistor<sup>[5]</sup> | R<sub>PD</sub>| V<sub>io</sub> = V<sub>3V3</sub> | 30 | 40 | 50 | k Ω |
| I/O pin capacitance | C<sub>IO</sub> | | | 5 | | pF |
| DAC output voltage (buffers enabled by default) | V<sub>DAC</sub> | | 0.2 | | V<sub>3V3</sub>-0.2 | V |
| DAC output resistive load (buffers enabled by default) | R<sub>DAC</sub> | | 5 | | | k Ω |
| DAC output capacitive load (buffers enabled by default) | C<sub>DAC</sub> | | | | 50 | pF |

**Notes:**

<sub>[1]</sub> FT = Five-volt tolerant. In order to sustain a voltage higher than V<sub>3V3</sub>+0.3 the internal pull-up/pull-down resistors must be disabled.

<sub>[2]</sub> Hysteresis voltage between Schmitt trigger switching levels.  Based on characterization, not tested in production.

<sub>[3]</sub> With a minimum of 100mV.

<sub>[4]</sub> Leakage could be higher than max. if negative current is injected on adjacent pins.

<sub>[5]</sub> Pull-up and pull-down resistors are designed with a true resistance in series with switchable PMOS/NMOS. This PMOS/NMOS contribution to the series resistance is minimum (~10% order).

## Mechanical specifications

### Dimensions and weight
 * Width = 0.8"
 * Height = 0.65"
 * Length = 2.05"
 * Weight = 10 grams

### Mating connectors
The Electron can be mounted with (qty 2) 18-pin single row 0.1" female headers. Typically these are 0.335" (8.5mm) tall, but you may pick a taller one if desired.  When you search for parts like these it can be difficult to navigate the thousands of parts available online so here are a few good choices for the Electron:


| Description | MFG | MFG Part Number | Distributor |
|:-:|:-:|:-:|
| 18-pin 0.1" (2.54mm) Female Header (Tin) | Sullins Connector Solutions | [PPTC181LFBN-RC](http://www.digikey.com/product-search/en?keywords=PPTC181LFBN-RC) | DigiKey |
| 18-pin 0.1" (2.54mm) Female Header (Tin) | 3M | [929974-01-18-RK](http://www.digikey.com/product-search/en?keywords=929974-01-18-RK) | DigiKey |
| 18-pin 0.1" (2.54mm) Female Header (Tin) | Harwin | [M20-7821846](http://www.mouser.com/search/ProductDetail.aspx?R=0virtualkey0virtualkeyM20-7821846) | Mouser |

You may also use other types, such as reverse mounted (bottom side SMT) female headers, low profile types, etc..

### Recommended PCB land pattern

The Electron can be mounted with 0.1" 18-pin female header receptacles using the following PCB land pattern:

![Electron Landing Pattern](/assets/images/electron/illustrations/landing-pattern.png)

An Electron part for EAGLE can be found in the [Particle EAGLE library](https://github.com/particle-iot/hardware-libraries#pcb-footprints-land-pattern)

## Schematic

All of the Electron hardware design files are open source and available under a Creative Commons Public License. The schematic and PCB designs were made using EAGLE CAD. You can access these files [here.](https://github.com/particle-iot/electron/tree/master/eagle)

**Note:** Clone or Download the complete repository as a ZIP file to avoid corrupted data in Eagle files.

### USB

![USB](/assets/images/electron/schematics/usb.png)

The USB data lines are terminated with 22 Ohm resistors. These data pins are also exposed via small through holes next to the USB connector and are labeled D+ and D-. The VBUS (+5VDC VCC of the USB port) is fed to the PMIC via a 3Amp Schottky diode ([SS3P3](http://www.vishay.com/docs/88944/ss3p3.pdf)). The VBUS pin is also available via the unpopulated header hole on the top-right side of the Electron.

### PMIC (Power Management integrated circuit)

![PMIC](/assets/images/electron/schematics/pmic.png)

The Electron uses TI's [BQ24195](http://www.ti.com/lit/ds/symlink/bq24195.pdf) as the power management and charging unit. This PMIC intelligently sources power from either the VIN pin, the USB port and/or the LiPo battery. When all the power sources as connected, the unit tries to source power from the USB or VIN as default and continues to charge the LiPo battery. When the battery is completely charged, the power is then sourced from USB/VIN alone. If there is a power deficit (which generally occurs during cellular radio transmission), the additional power is then sourced from the battery as required. The unit can also seamlessly switch back to the battery when other sources of power are suddenly removed.

The DP data pin of the USB is used by the PMIC to detect the presence of a USB power source. It then adjusts the charge current and the limit based on the type of USB power source it detects. This does not always happen successfully since there are a lot of USB hubs and chargers out there that do not meet the USB design guidelines. If the detection is unsuccessful, the PMIC defaults to a 500mA current limit. A user can always adjust these parameters via software.

The microcontroller communicates with the PMIC via an I2C interface (pins PC9 and PA8). This interface allows the microcontroller to read the status of the PMIC and set its various parameters.

### Microcontroller

![STM32](/assets/images/electron/schematics/stm32.png)

The Electron uses ST Microelectronics's STM32F205RGT6 ARM Cortex M3 microcontroller running at  120MHz.

---

### U-blox cellular module

![ublox](/assets/images/electron/schematics/ublox.png)

The u-blox cellular module talks to the microcontroller over a full-duplex USART interface using a standard set of AT commands. The SIM (Nano 4FF) card is directly connected to the u-blox. The power to the SIM card is also provided by the cellular module.

---

### Buffers

![Buffers](/assets/images/electron/schematics/buffers.png)

Since u-blox module's communication interface operates at 1.8VDC, while the STM32F205RGT6 microcontroller operates at 3.3VDC, we need voltage translators in-between them. This is achieved with two [SN74AVC4T245](http://www.ti.com/lit/ds/symlink/sn74avc4t245.pdf) non-inverting buffers. The default state of the USART pins is set with the help of pull-up and pull-down resistors, and the unused input pins are tied to GND.

### 3.3V Regulator and fuel gauge

![Regulator and Fuel Gauge](/assets/images/electron/schematics/3v3reg-fuelgauge.png)

The output (3.8V net) of the PMIC is fed directly to the u-blox cellular module and a 3.3VDC high efficiency switching regulator ([TPS62290](http://www.ti.com.cn/cn/lit/ds/symlink/tps62290.pdf)). This 3.3VDC regulator helps power the microcontroller, fuel gauge and the buffers.

The Electron employs a [MAX17043](https://datasheets.maximintegrated.com/en/ds/MAX17043-MAX17044.pdf) fuel gauge to monitor the LiPo battery voltage and it's state of charge. The microcontroller communicates with it over an I2C interface (same channel as the PMIC).

## Layout

The Electron uses a four layer circuit board. Top layer consists of a signal layer followed by ground (GND), 3.3V power (3V3), and bottom signal.

![All Layers](/assets/images/electron/pcb/all-layers.png)

## Bill of materials

|QTY |Device |Value |Package |Designator | Manufacturer | MFG. Part # |
|-----|------------|-----------|------|------|-------|---------|-------------------------|----------|---------------------|----------------|
| 14  | CAPACITOR  | 0.1uF, 6.3V, 10% | 0402 | C14, C17, C18, C19, C2, C20, C21, C22, C29, C30, C31, C6, C8, C9   | Fenghua| 0402B104K160NT|
| 2   | CAPACITOR  | 10nF, 6.3V, 10%| 0402| C1,C38 | Fenghua| 0402B103K500NT |
| 5   | CAPACITOR  | 10uF, 6.3V, 10% | 0603 | C23, C24, C27, C40, C41 | Yageo| CC0603KRX5R5BB106|
| 2   | CAPACITOR  | 12pF, 6.3V, 10% | 0402| C33, C34|Fenghua| 0402CG120J500NT|
| 1   | CAPACITOR  | 15pF, 6.3V, 10% | 0402| C16| Fenghua| 0402CG150J500NT|
| 2   | CAPACITOR  | 1uF, 6.3V, 10% |0402| C37, C39| Fenghua| 0402X105K6R3NT|
| 1   | CAPACITOR  | 1uF, 25V, 10% | 0603| C4| Yageo| CC0603KRX5R8BB105|
| 2   | CAPACITOR  | 2.2uF, 6.3V, 10%| 0402| C32, C35| Yageo| CC0402KRX5R5BB225|
| 2   | CAPACITOR  | 20pF, 6.3V, 10%| 0402 |C26, C28| Fenghua| 0402CG200J500NT|
| 1   | CAPACITOR  | 22uF, 6.3V, 10%| 0603| C5| Samsung| CL10A226KQ8NRNE|
| 1   | CAPACITOR  | 220uF, 6.3V, 10% | 2312 (6032 metric)| C3| AVX| TAJC227K006|
| 1   | CAPACITOR  | 4.7uF, 6.3V, 10%| 0402| C36| Samsung | CL05A475KQ5NRNC|
| 1   | CAPACITOR  | 4.7uF, 6.3V, 10%| 0603| C25| Yageo| CC0603KRX5R5BB475|
| 1   | CAPACITOR  | 47nF, 6.3V, 10%| 0402 |C7| Fenghua| 0402B473K160NT|
| 4   | CAPACITOR  | 47pF, 6.3V, 10%| 0402| C10, C11, C12, C13| Fenghua| 0402CG470J500NT|
| 1   | CAPACITOR  | 68pF, 6.3V, 10%| 0402| C15| Fenghua| 0402CG680J500NT|
| 1   | CONNECTOR  | 2-pin| SMD, 2-pin, Vertical| JP4| Kaweei| CW2001-02T-M01-D|
| 1   | CONNECTOR  | 1x18| 1x18, 0.1" pitch"| JP1| Kaweei| CP25411-18G-S116A-A|
| 1   | CONNECTOR  | 1x18| 1x18, 0.1" pitch"| JP2| Kaweei| CP25411-18G-S116B-A|
| 1   | CONNECTOR  |         | USB-MICROB-SLOT-HOLE| X1| Kaweei| CMCUSB-5BFM2G-01-D|
| 1   | CONNECTOR  |         | SMD| J2| Kaweei| P1163-0140R|
| 1   | CONNECTOR  |          | 10mm x 12.3mm| J1| Kaweei| CSIM2545-06S-D|
| 1   | CRYSTAL    | 26MHz,  <±20ppm | 4-SMD, 5.0 x 3.2mm| Y2| Song Ji| SJSMD5026M00018F20|
| 1   | CRYSTAL    | 32.768KHz,  <±20ppm | 2-SMD, 1.5 x 3.2mm| Y1| Song Ji| SJ FC1332K012F520P|
| 1   | DIODE      |30V, 3A| DO-220AA| U$3| Vishay| SS3P3-M3/84A|
| 2   | IC - Buffer|         | SC-70-5| U5, U6| Texas Instruments| SN74LVC1G07DCKR|
| 1   | IC - Fuel Gauge|         | TDFN-8| U4| Maxim| MAX17043G+T|
| 1   | IC - Cell Module|         | 16 x 26 x 3mm| U1| u-blox| SARA-G350SARA-U260SARA-U270 |
| 2   | IC - Buffer|         | 16-UQFN| U2, U8| Texas Instruments| SN74AVC4T245RSVR|
| 1   | IC - Microcontroller||LQFP64| U3| ST Microelectronics | STM32F205RGT6|
| 1   | IC - PMIC|| 24VQFN| U$1| Texas Instruments   | BQ24195RGER|
| 1   | IC - MOSFET|| SC70-5| U9| Texas Instruments   | TPS22942DCKR|
| 1   | IC - 3V3 Reg|1A| 6-SON (2x2)| U$5| Texas Instruments| TPS62291DRVR|
| 1   | INDUCTOR   | 2.2uH, 1.5A, 20%| 3.0 mm x 3.0 mm| U$6 | Taiyo Yuden| NR3015T2R2M|
| 1   | INDUCTOR   | 2.2uH, 4A| 4.45mm x 4.06mm| U$4| Bourns, Inc.| SRP4020TA-2R2M|
| 1   | LED        | Blue| 0603| LED1| Everlight| 19-217/BHC-ZL1M2RY/3T|
| 1   | LED        | Red| 0603| LED3| Everlight| 19-217/R6C-AL1M2VY/3T       |
| 1   | LED        | RGB| 4-PLCC (3.2 mm x 2.8mm) | LED2| Cree| CLMVB-FKA-CFHEHLCBB7A363    |
| 1   | RESISTOR   | 0R, 1/16W |0201|R32 | Fenghua| ||
| 1   | RESISTOR   | 100k, 1/16W, 5%| 0402| R1| Fenghua| RC-02W104JT|
| 14  | RESISTOR   | 10K, 1/16W, 5%| 0402| R3, R8, R15, R16, R17, R19, R21, R24, R25, R27, R28, R29, R30, R31 | Fenghua| RC-02W103JT|
| 1   | RESISTOR   | 150R,1/4W, 1%| 0603| R22| Vishay| CRCW0603150RFKEAHP|
| 1   | RESISTOR   | 1K, 1/16W, 5%| 0603| R23| Fenghua| RC-03K102JT|
| 4   | RESISTOR   | 1K, 1/16W, 5%| 0402| R10, R11, R12, R9| Fenghua| RC-02W102JT|
| 1   | RESISTOR   | 2.2K, 1/16W, 5%| 0402| R4| Fenghua| RC-02W222JT|
| 2   | RESISTOR   | 22R, 1/16W, 1%| 0402| R5, R6| Fenghua| RC-02W22R0FT|
| 1   | RESISTOR   | 330R, 1/16W, 1%| 0402| R2| Fenghua| RC-02W3300FT|
| 2   | RESISTOR   | 4K7, 1/16W, 5%| 0402| R13, R14| Fenghua| RC-02W472JT|
| 1   | RESISTOR   | 5.49K, 1/16W, 1%| 0402| R18| Fenghua| RC-02W5491FT|
| 2   | SWITCH     | 160gF|3.6mm x 3.1mm| MODE, RESET| Haoyu| TS-1185A-C|

---


## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated 0ca3e34e-76e2-11eb-9439-0242ac130002 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Afghanistan | ELC314 | 2G, 3G | MTN |
| Albania | ELC314 | 2G, 3G | Eagle, Telekom, Vodafone |
| Algeria | ELC314 | 2G, 3G | Mobilis, Ooredoo |
| Anguilla | ELC314 | 2G, 3G | Flow |
| Antigua and Barbuda | ELC314 | 2G, 3G | Flow |
| Argentina | ELC314 | 2G, 3G | Claro, Movistar, Personal |
| Armenia | ELC314 | 2G, 3G | Beeline, Ucom |
| Aruba | ELC314 | 2G, 3G | Setar |
| Austria | ELC314 | 2G | 3 (Drei), A1, T-Mobile |
| Azerbaijan | ELC314 | 2G, 3G | Azercell, Bakcell, NAR Mobile |
| Bahamas | ELC314 | 2G, 3G | Aliv, BTC Bahamas |
| Bahrain | ELC314 | 2G | Zain |
| Bangladesh | ELC314 | 2G, 3G | Bangalink, GrameenPhone |
| Barbados | ELC314 | 2G, 3G | Flow |
| Belarus | ELC314 | 2G, 3G | A1 |
| Belgium | ELC314 | 2G | Base, Orange, Proximus |
| Belize | ELC314 | 3G | Smart |
| Bolivia | ELC314 | 2G, 3G | Viva |
| Bosnia and Herzegovina | ELC314 | 2G, 3G | HT Eronet |
| Brunei | ELC314 | 3G | DST |
| Bulgaria | ELC314 | 2G, 3G | A1, Telenor, Vivacom |
| Burkina Faso | ELC314 | 2G, 3G | Orange |
| Cambodia | ELC314 | 2G, 3G | Metfone |
| Canada | ELC404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Cayman Islands | ELC314 | 2G, 3G | Flow |
| Chad | ELC314 | 2G, 3G | Airtel |
| Chile | ELC314 | 2G, 3G | Claro, Entel, Movistar |
| Colombia | ELC314 | 2G, 3G | Movistar, Tigo |
| Congo (Brazzaville) | ELC314 | 2G, 3G | Airtel |
| Congo (Kinshasa) | ELC314 | 2G, 3G | Airtel |
| Costa Rica | ELC314 | 3G | Movistar |
| Côte d'Ivoire | ELC314 | 2G, 3G | MTN |
| Croatia | ELC314 | 2G, 3G | Hrvatski Telekom, Tele2 |
| Cyprus | ELC314 | 2G, 3G | MTN |
| Czechia | ELC314 | 2G | T-Mobile, Vodafone |
| Denmark | ELC314 | 2G | TDC, Telenor, Telia |
| Dominica | ELC314 | 2G, 3G | Flow |
| Dominican Republic | ELC314 | 2G, 3G | Altice Dominicana, Viva |
| Ecuador | ELC314 | 2G, 3G | Claro, Movistar |
| Egypt | ELC314 | 2G, 3G | Etisalat, Orange |
| El Salvador | ELC314 | 2G, 3G | Claro, Telefonica |
| Estonia | ELC314 | 2G, 3G | Elisa, Tele2, Telia |
| eSwatini | ELC314 | 2G, 3G | MTN |
| Ethiopia | ELC314 | 2G, 3G | Ethio Telecom |
| Faroe Islands | ELC314 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | ELC314 | 2G | Elisa |
| France | ELC314 | 2G, 3G | Bouygues, Free Mobile, Orange, SFR |
| French Guiana | ELC314 | 2G, 3G | Digicel |
| Gabon | ELC314 | 2G, 3G | Airtel |
| Georgia | ELC314 | 2G, 3G | Beeline, Geocell |
| Germany | ELC314 | 2G, 3G | O2, Telekom, Vodafone |
| Ghana | ELC314 | 2G, 3G | AirtelTigo, MTN, Vodafone |
| Gibraltar | ELC314 | 2G, 3G | Gibtel |
| Greece | ELC314 | 2G | Cosmote, Wind |
| Grenada | ELC314 | 2G | Flow |
| Guadeloupe | ELC314 | 2G, 3G | Orange |
| Guatemala | ELC314 | 2G, 3G | Claro, Movistar |
| Guinea | ELC314 | 2G, 3G | MTN |
| Guinea-Bissau | ELC314 | 2G, 3G | MTN |
| Guyana | ELC314 | 2G | Digicel |
| Haiti | ELC314 | 2G, 3G | Digicel |
| Honduras | ELC314 | 2G, 3G | Claro, Tigo |
| Hong Kong | ELC314 | 3G | CSL, SmarTone |
| Hungary | ELC314 | 2G, 3G | Telenor |
| Indonesia | ELC314 | 2G, 3G | Indosat, Telkomsel, XL Axiata |
| Ireland | ELC314 | 2G, 3G | Meteor, O2, Vodafone |
| Israel | ELC314 | 2G, 3G | Hot Mobile |
| Italy | ELC314 | 2G, 3G | TIM, Vodafone, Wind |
| Jamaica | ELC314 | 3G | Flow |
| Jordan | ELC314 | 2G, 3G | Zain |
| Kazakhstan | ELC314 | 2G, 3G | Beeline, K-Cell |
| Kenya | ELC314 | 2G, 3G | Airtel |
| Kuwait | ELC314 | 2G, 3G | Viva, Zain |
| Kyrgyzstan | ELC314 | 2G | Beeline |
| Latvia | ELC314 | 2G | Bite, LMT, Tele2 |
| Liechtenstein | ELC314 | 2G, 3G | Mobilkom, Orange |
| Lithuania | ELC314 | 2G | Bite, Omnitel, Tele2 |
| Luxembourg | ELC314 | 2G | Orange, POST, Tango |
| Malawi | ELC314 | 2G, 3G | Airtel |
| Malaysia | ELC314 | 2G, 3G | Celcom, DiGi, Maxis |
| Malta | ELC314 | 2G, 3G | Go Mobile, Vodafone |
| Mexico | ELC404 | M1 | AT&T, Telcel |
| Moldova | ELC314 | 2G, 3G | Moldcell, Orange |
| Mongolia | ELC314 | 2G, 3G | Mobicom, Unitel |
| Montenegro | ELC314 | 2G, 3G | T-Mobile, Telenor |
| Mozambique | ELC314 | 2G, 3G | Vodacom |
| Myanmar | ELC314 | 2G, 3G | MPT |
| Namibia | ELC314 | 2G, 3G | Telecom Namibia |
| Netherlands | ELC314 | 2G, 3G | T-Mobile, Vodafone |
| Nicaragua | ELC314 | 2G, 3G | Movistar |
| Nigeria | ELC314 | 2G, 3G | 9mobile, Airtel, Glo, MTN |
| Norway | ELC314 | 2G, 3G | TDC |
| Pakistan | ELC314 | 2G, 3G | Mobilink, Ufone, Warid |
| Palestine | ELC314 | 2G, 3G | Jawwal |
| Panama | ELC314 | 2G, 3G | Digicel, Movistar |
| Papua New Guinea | ELC314 | 2G, 3G | bmobile |
| Paraguay | ELC314 | 2G, 3G | Claro, Personal, Tigo, Vox |
| Peru | ELC314 | 2G, 3G | Claro, Entel, Movistar |
| Philippines | ELC314 | 2G, 3G | Globe, Smart |
| Poland | ELC314 | 2G, 3G | Orange, Play, Plus, T-Mobile |
| Portugal | ELC314 | 2G, 3G | NOS, TMN, Vodafone |
| Qatar | ELC314 | 2G, 3G | Ooredoo, Vodafone |
| Romania | ELC314 | 2G | Orange, Telekom Romania, Vodafone |
| Rwanda | ELC314 | 2G, 3G | Airtel, MTN |
| Saint Kitts and Nevis | ELC314 | 2G, 3G | Flow |
| Saint Lucia | ELC314 | 2G, 3G | Flow |
| Saint Vincent and the Grenadines | ELC314 | 3G | Flow |
| Serbia | ELC314 | 2G, 3G | Telenor, VIP |
| Sint Maarten | ELC314 | 2G, 3G | TelCell |
| Slovakia | ELC314 | 2G | O2, Orange, Telekom |
| Slovenia | ELC314 | 2G, 3G | A1, Mobitel |
| South Africa | ELC314 | 2G, 3G | Cell C, MTN, Vodacom |
| South Korea | ELC314 | 3G | KT, SK Telecom |
| South Sudan | ELC314 | 2G, 3G | MTN |
| Spain | ELC314 | 2G, 3G | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | ELC314 | 2G, 3G | Dialog, Mobitel |
| Suriname | ELC314 | 2G, 3G | Telesur |
| Sweden | ELC314 | 2G | 3 (Tre), Telia |
| Switzerland | ELC314 | 3G | Salt |
| Taiwan | ELC314 | 3G | T Star |
| Tajikistan | ELC314 | 2G, 3G | Beeline, Tcell |
| Tanzania | ELC314 | 2G, 3G | Airtel |
| Thailand | ELC314 | 2G, 3G | AIS, DTAC |
| Trinidad and Tobago | ELC314 | 2G, 3G | Digicel, TSTT |
| Tunisia | ELC314 | 2G, 3G | Orange Tunisie, Tunisie Telecom |
| Turks and Caicos Islands | ELC314 | 2G, 3G | Flow |
| Uganda | ELC314 | 2G, 3G | Africell, Airtel, MTN |
| Ukraine | ELC314 | 2G, 3G | Kyivstar, Life, MTS |
| United Kingdom | ELC314 | 2G | EE |
| United States | ELC404 | M1 | AT&T, T-Mobile (USA) |
| Uruguay | ELC314 | 2G, 3G | Antel, Movistar |
| Uzbekistan | ELC314 | 2G, 3G | Beeline |
| Venezuela | ELC314 | 3G | Movistar |
| Vietnam | ELC314 | 3G | MobiFone, Vinaphone |
| Virgin Islands (British) | ELC314 | 2G, 3G | CCT, Flow |
| Zambia | ELC314 | 2G, 3G | Airtel |


{{!-- END do not edit content above, it is automatically generated 0ca3e34e-76e2-11eb-9439-0242ac130002 --}}

---
## Ordering information

Electrons are available from [store.particle.io](https://store.particle.io/) in single quantities in 2G, and 3G versions.

{{!-- BEGIN do not edit content below, it is automatically generated ab31991a-76c5-11eb-9439-0242ac130002 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 |  | NRND | B524MTY|
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | &check; | NRND | |
| ASSET2GV2 | Asset Tracker 2G | Global | G350 |  | Deprecated | |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Americas | U260 |  | Deprecated | |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | EMEAA | U270 |  | Deprecated | |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Americas | U260 |  | Deprecated | BRN404XKIT|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 |  | Deprecated | BRN404XTRAY50|
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | EMEAA | U270 |  | Deprecated | B524MEA|
| E350KIT | Electron 2G Kit (Global) | Global | G350 |  | Deprecated | B524MEA|
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 |  | Deprecated | B524MTY|
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | Deprecated | BRN404XTRAY50|
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Americas | U260 |  | Deprecated | |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | EMEAA | U270 |  | Deprecated | |


{{!-- END do not edit content above, it is automatically generated ab31991a-76c5-11eb-9439-0242ac130002 --}}


## Product handling

### ESD precautions

<i class="icon-attention"></i> The Electron contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a Electron without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates Electrons.  ESD precautions should be implemented on the application board where the Electron is mounted. Failure to observe these precautions can result in severe damage to the Electron! <i class="icon-attention"></i>

### Connectors

There are three connectors on the Electron that will get damaged with improper usage. The JST connector on the circuit board, where you plug in the LiPo battery, is very durable but the connector on the battery itself is not. When unplugging the battery, take extra precaution to **NOT** pull the connector using the wires, but instead hold the plug at its base to avoid putting stress on the wires. This can be tricky with bare hands - nose pliers are your friend here.

![Unplugging LiPo connector](/assets/images/electron/illustrations/electron-lipo-conn.jpg)

The micro B USB connector on the electron is soldered on the PCB with large surface pads as well as couple of through hole anchor points. Despite this reinforcement, it is very easy to rip out the connector if too much stress is put on in the vertical direction.

![Unplugging USB connector](/assets/images/electron/illustrations/usb-conn-unplug.jpg)

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

<add pic here>

### Breadboarding

The breadboard provided with the Electron is specifically designed to require low insertion force. This makes it easy to plug the Electron in and out of the breadboard. If you end up using a different breadboard, remember that it may require more force. In this case, always remember to pinch-hold your precious Electron by the sides (along the header pins) when plugging-unplugging and **not** by the USB connector (don't be this person).

## Default settings

The Electron comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the [Particle Web IDE](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air). [Particle Workbench](/quickstart/workbench/) is a full-featured desktop IDE for Windows, Mac, and Linux based on VSCode and supports both cloud-based and local gcc-arm compiles. The [Particle CLI](/getting-started/developer-tools/cli/) provides a command-line interface for cloud-based compiles and flashing code over USB.

## Glossary
|Term|Definition |
|:---|:---|
|SMPS| Switch Mode Power Supply |
|SIM| Subscriber Identity Module ([Size: Nano 4FF](https://en.wikipedia.org/wiki/Subscriber_identity_module#Formats))
|RF  | Radio Frequency |
|SMT | Surface Mount Technology (often associated with SMD which is a surface mount device). |
|LED | Light Emitting Diode |
|RGB LED| Red green and blue LEDs combined and diffused in one package. |
|USB | Universal Serial Bus|
|Quiescent current | Current consumed in the deepest sleep state. |
|FT  | Five-tolerant; Refers to a pin being tolerant to 5V.|
|3V3 | +3.3Volt; The regulated +3.3V supply rail. Also used to note a pin is only 3.3V tolerant. |
|PMIC| Power Management Integrated Circuit |
|LiPo| Lithium-ion Polymer Battery |
|GSM| Global System for Mobile Communications |
|CDMA| Code Division Multiple Access |
|OTA | Over The Air; describing how firmware is transferred to the device. |
|uC  | Microcontroller |

## FCC ISED CE warnings and end product labeling requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:
> Contains FCC ID:

 * XPYSARAG350 (For 2G Electron using the G350 module)
 * XPYSARAU201 (For 3G Electron using the U201 module)
 * XPYSARAU260 (For 3G Electron using the U260 module)
 * XPYSARAU270 (For 3G Electron using the U270 module)
 * XPY2AGQN4NNN (For LTE Electron module using the R410 module)
 
**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.

---

**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:
> Contains transmitter module ISED:

 * 8595A-SARAG350 (For 2G Electron using the G350 module)
 * 8595A-SARAU260 (For 3G Electron using the U260 module)
 * 8595A-SARAU270 (For 3G Electron using the U270 module)
 * 8595A-2AGQN4NNN (For LTE Electron module using the R410 module)

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.
>
> For an in-depth review on certifications, please click [here.](/hardware/certification/certification/)

## Revision history

| Revision | Date | Author | Comments |
|:-:|:-:|:-:|:-|
| v001 | 20-Jan-2016 | MB | Initial release |
| v002 | 24-March-2016 | MB | Added: Memory map, DAC limits, SIM card size, SWD pin locations. Updated: Power section, pin diagram, block diagram, operating conditions. |
| v003 | 12-Sept-2016 | BW | Error in Cellular off operating current, changed from 2-15mA to 47-50mA. Also qualified these current readings with uC on/off. Updated the Pin Description section. Updated Mating connectors section. |
| v004 | 27-Oct-2016 | BW | Replaced one STM32F205RGY6 with STM32F205RGT6, and replaced all STM32 mentions with full part number STM32F205RGT6 |
| v005 | 14-Aug-2017 | BW | Updated DCD layout and Memory Map, renamed SPI1_*/SPI3_* to match Particle API instead of STM32 pin names to avoid confusion (now SPI, SPI1 and SPI2), updated the Pin Description section and added high resolution pinout PDF, updated LED Status section, VBAT info, added Power the Electron without a battery section |
| v006     | 31-Jul-2019   | RK     |  Added LTE information |
| v007 | 16-Sep-2020 | RK | Added power consumption information |
| v008 | 24-Feb-2021 | RK | Added ELC314 information |
| v009 | 10-Sep-2021 | RK | Changed wording of peak vs. max current |
| v010 | 14-Mar-2022 | RK | Added deprecation warning |
| v011 | 31-Jan-2023 | RK | Added Device OS versions |


## Known errata

We are tracking [known errata with this datasheet here](https://github.com/particle-iot/docs/issues/19).  These issues/errors in the datasheet will be resolved in subsequent revisions.

## Contact

**Web**

[https://www.particle.io](https://www.particle.io)

**Community Forums**

[https://community.particle.io](https://community.particle.io)
