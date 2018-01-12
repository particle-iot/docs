---
title: E Series datasheet
layout: datasheet.hbs
columns: two
order: 2
---

# E Series Module Datasheet <sup>(v001)</sup>

<div align=center><img src="/assets/images/e-series/illustrations/e0-top.png" ></div>

## Functional description

### Overview

The E Series module is an IOT platform for creating cellular-connected products. It is an industrial version of Particle's Electron dev kit. It is specifically designed for mass scale manufacturing and integration. It comes with an affordable data plan for low-bandwidth applications. Plus the E Series is available for more than 100 countries worldwide!

It also comes with Particle's development tools and cloud platform for managing and interacting with your new connected hardware.

### Features

 * U-blox SARA-U260/U270/U201/G350 cellular module
 * STM32F205RGT6 120MHz ARM Cortex M3 microcontroller
 * 1MB flash, 128KB RAM
 * BQ24195 power management unit and battery charger
 * MAX17043 fuel gauge
 * 30 mixed-signal GPIO and advanced peripherals
 * Open source design
 * Real-time operation system (RTOS)
 * FCC, CE and IC certified


## Interfaces

### Block diagram

<div align=center><img src="/assets/images/e-series/illustrations/e-blockdiagram.png" width=700></div>

### Power
The E series can be powered via the VIN (3.88V-12VDC) pin, over USB, or a LiPo battery.

#### VIN
The input voltage range on VIN pin is 3.88VDC to 12VDC. When powering from the VIN pin alone, make sure that the power supply is rated at 10W (for example 5 VDC at 2 Amp). If the power source is unable to meet this requirement, you'll need connect the LiPo battery as well.  An additional bulk capacitance of 470uF to 1000uF should be added to the VIN input when the LiPo Battery is disconnected.  The amount of capacitance required will depend on the ability of the power supply to deliver peak currents to the cellular modem.

#### LIPO
This pin serves two purposes. You can use this pin to connect a LiPo battery directly without having to use a JST connector or it can be used to connect an external DC power source (and this is where one needs to take extra precautions). When powering it from an external regulated DC source, the  recommended input voltage range on this pin is between 3.6V to 4.4VDC. Make sure that the supply can handle currents of at least 3Amp. This is the most efficient way of powering the E series since the PMIC by-passes the regulator and supplies power to the E series module via an internal FET leading to lower quiescent current.

When powered from a LiPo battery alone, the power management IC switches off the internal regulator and supplies power to the system directly from the battery. This reduces the conduction losses and maximizes battery run time. The battery provided with the E series module is a Lithium-Ion Polymer battery rated at 3.7VDC 2000mAh. You can substitute this battery with another 3.7V LiPo with higher current rating. Remember to never exceed this voltage rating and always pay attention to the polarity of the connector.

Typical current consumption is around 180mA and up to 1.8A transients at 5VDC. In deep sleep mode, the quiescent current is 130uA (powered from the battery alone).

#### VBUS
This pin is internally connected to USB supply rail and will output 5V when the E series module is plugged into an USB port. It is intentionally left unpopulated. This pin will _NOT_ output any voltage when the E series module is powered via VIN and/or the LiPo battery.

Most USB ports can supply only a maximum of 500mA, but the u-Blox GSM module on the E series alone can consume a peak of 800mA to 1800mA of current during transmission. In order to compensate of this deficit, one must connect the LiPo battery at all times when powering from a traditional USB port. The E series will intelligently source power from the USB most of the time and keep the battery charged. During peak current requirements, the additional power will be sourced from the battery. This reduces the charge-discharge cycle load on the battery, thus improving its longevity.

#### 3V3 Pin
This pin is the output of the on-board 3.3V switching regulator that powers the microcontroller and the peripherals. This pin can be used as a 3.3V power source with a max load of 800mA. Unlike the Photon or the Core, this pin _CANNOT_ be used as an input to power the E series module.

#### VDDA
Unlike the Electron, the E series module exposes the VDDA pin of the STM32 microcontroller separately. This pin powers the ADC block of the microcontroller. A maximum difference of 300 mV between VDD (in this case, 3V3) and VDDA can be tolerated during power-up and power-down operation. Under normal operations, connect the VDDA to 3V3 pin of the E0.

#### VBAT
This is the supply to the internal RTC, backup registers and SRAM. You can connect a backup battery to it (1.65 to 3.6VDC), if you wish to retain RTC/RAM when 3V3 is absent or simply tie it up to 3V3.

#### PMID
This pin is the output of the internal boost regulator of the PMIC that can source 5.1VDC from the battery in OTG (On The Go) mode. This feature is useful when your circuitry needs a 5V source from the E series module when powered by the battery alone.

The confusing bit about this pin is that it will continue to provide 5.1VDC but only when the input voltage (VIN) is between 3.6V to 5.1VDC. As soon as the input voltage exceeds this limit, the PMID starts tracking _that_ voltage. For example if VIN = 9VDC, the PMID will be 9VDC and _NOT_ 5.1VDC. So you need to be careful when using it as a source for powering your external circuitry. The max current draw on this pin is 2.1A but is not recommended due to thermal limitations of the circuit board.

### FCC approved antennas

|Antenna Type| Manufacturer | MFG. Part #| Gain|
|:--|:--|:--|:--|
|PCB antenna| Taoglas| [PC104.07.0165C](http://www.taoglas.com/wp-content/uploads/2015/06/PC104.07.0165C.pdf)| 1dBi ~ 2.39dBi|



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
Pin D3 through D7 are JTAG interface pins. These can be used to reprogram your E series module bootloader or user firmware image with standard JTAG tools such as the ST-Link v2, J-Link, R-Link, OLIMEX ARM-USB-TINI-H, and also the FTDI-based Particle JTAG Programmer. If you are short on available pins, you may also use SWD mode which requires less pins.

| E series module Pin | JTAG | SWD | STM32F205RGT6 Pin | Default Internal<sup>[1]</sup> |
| :-:|:-:|:-:|:-:|:-:|
| D7 | JTAG_TMS | SWD/SWDIO| PA13 | ~40k pull-up |
| D6 | JTAG_TCK | CLK/SWCLK| PA14 | ~40k pull-down |
| D5 | JTAG_TDI | |PA15 | ~40k pull-up |
| D4 | JTAG_TDO | |PB3 | Floating |
| D3 | JTAG_TRST | |PB4 | ~40k pull-up |
| 3V3 | Power | || |
| GND | Ground| || |
| RST | Reset | || |


**Notes:**
[1] Default state after reset for a short period of time before these pins are restored to GPIO (if JTAG debugging is not required, i.e. `USE_SWD_JTAG=y` is not specified on the command line.)

## Memory Map

### STM32F205RGT6 Flash Layout Overview

- Bootloader (16 KB)
- DCD1 (16 KB), stores keys, mfg info, system flags, etc..
- DCD2 (16 KB), swap area for DCD1
- EEPROM emulation bank 1 (16 KB)
- EEPROM emulation bank 2 (64 KB) [only 16k used]
- System firmware (512 KB) [256 KB comms + 256 KB hal/platform/services]
- Factory backup, OTA backup and user application (384 KB) [3 x 128 KB]

### DCD Layout

The DCD area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCD layout as of v0.4.9_ [found here in firmware](https://github.com/particle-iot/firmware/blob/develop/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h)

| Region | Offset | Size |
|:---|---|---|
| system flags | 0 | 32 |
| version | 32 | 2 |
| device private key | 34 | 1216 |
| device public key | 1250 | 384 |
| ip config | 1634 | 128 |
| claim code | 1762 | 63 |
| claimed | 1825 | 1 |
| device id | 1852 | 6 |
| version string | 1858 | 32 |
| dns resolve | 1890 | 128 |
| reserved1 | 2018 | 64 |
| server public key | 2082 | 768 |
| padding | 2850 | 2 |
| flash modules | 2852 | 100 |
| product store | 2952 | 24 |
| cloud transport | 2977 | 1 |
| alt device public key | 2978 | 128 |
| alt device private key | 3106 | 192 |
| alt server public key | 3298 | 192 |
| alt server address | 3490 | 128 |
| reserved2 | 3618 | 1280 |

**Note:** Writing 0xFF to offset 3106 (DEFAULT key used on E series module) will cause the device to re-generate a new private UDP/ECC key on the next boot. TCP keys are currently unsupported on the E series module but would be located at offset 34.  You should not need to use this feature unless your keys are corrupted.

```
// Regenerate Alternate Keys (Default)
echo -e "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 3106 -D fillbyte
// Regenerate TCP Keys (Unsupported)
echo -e "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 34 -D fillbyte
```

### Memory Map (Common)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Bootloader | 0x8000000 | 0x8004000 | 16 KB |
| DCD1 | 0x8004000 | 0x8008000 | 16 KB |
| DCD2 | 0x8008000 | 0x800C000 | 16 KB |
| EEPROM1 | 0x800C000 | 0x8010000 | 16 KB |
| EEPROM2 | 0x8010000 | 0x8020000 | 64 KB |

### Memory Map (Modular Firmware - default)
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

### Memory Map (Monolithic Firmware - optional)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Firmware | 0x8020000 | 0x8080000 | 384 KB |
| Factory Reset | 0x8080000 | 0x80E0000 | 384 KB |
| Unused (factory reset modular) | 0x80E0000 | 0x8100000 | 128 KB |

---

## Pin and button definition

### Pin markings:

<div align=center><img src="/assets/images/e-series/illustrations/e0-description.png"></div>

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

<sup>[2]</sup> You can stop this behavior by either plugging in the LiPo battery or by disabling the charging using the appropriate firmware command.

#### System RGB LED

Unlike the Electron, the E series module does not have an on-board RGB status LED. We have provided its individual control pins for you to connect an LED of your liking. This will allow greater flexibility in the end design of your products.

For a detailed explanation of different color codes of the RGB system LED, please take a look [here.](/guide/getting-started/modes/electron/)

### Pinout diagram

<div align=center> <a href="/assets/images/e-series/illustrations/e0-pinout.pdf" target="_blank"> <img src="/assets/images/e-series/illustrations/e0-pinout.png"> </a></div>

You can download a high resolution pinout diagram in a <a href="/assets/images/e-series/illustrations/e0-pinout.pdf" target="_blank"><strong>PDF version here.</strong></a></div><br>

### Pin description

|#	| PIN | FUNCTION  | DESCRIPTION|
|:--|:----|:---------:|:-----------|
|1| VIN   | POWER     | This pin can be used as an input or output. As an input, supply 5VDC to 12VDC to power the Electron. When the Electron is powered via the USB port, this pin will output a voltage of approximately 4.8VDC due to a reverse polarity protection series Schottky diode between VBUS and VIN. When used as an output, the max load on VIN is 1Amp.
|2| GND   | POWER     | System ground.
|3| VBUS  | POWER     | This is connected to the VBUS power pin of the USB port.
|4| GND   | POWER     | System ground.
|5| LIPO  | POWER     | This is connected to the +LiPo connector.				
|6| NC    | TBD       | Do not connect.
|7| GND   | POWER     | System ground.
|8| PMID  | POWER     | This is connected to the PMID pin of the PMIC.			
|9| 3V3   | POWER     | This is the output of the 3V3 regulator on the E0.
|10| VDDA | POWER     | This is the input to the analog block of the STM32.		
|11| VBAT | POWER     | Supply to the internal RTC, backup registers and SRAM when 3V3 is not present (1.65 to 3.6VDC).
|12| GND  | POWER     | System ground.
|13| USB+ | IO        | Data+ pin of the USB port.
|14| USB- | IO        | Data- pin of the USB port.|
|15| GND  | POWER     | System ground.
|16| TX   | IO        | Primarily used as UART TX, but can also be used as a digital GPIO or PWM.
|17| RX   | IO        | Primarily used as UART RX, but can also be used as a digital GPIO or PWM.
|18| GND  | POWER     | System ground.
|19| WKP  | IO        | Active-high wakeup pin, wakes the module from sleep/standby modes. When not used as a WAKEUP, this pin can also be used as a digital GPIO, ADC input or PWM. Can be referred to as A7 when used as an ADC.
|20| DAC  | IO        | 12-bit Digital-to-Analog (D/A) output (0-4095), referred to as DAC or DAC1 in software. Can also be used as a digital GPIO or ADC. Can be referred to as A6 when used as an ADC.|
|21| A5   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|22| A4   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|23| A3   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|24| A2   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|25| A1   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|26| A0   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|27| GND  | POWER     | System ground.|
|28| B5   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|29| B4   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|30| B3   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), PWM and also digital GPIOs.
|31| B2   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), PWM and also digital GPIOs.|
|32| B1   | IO        | Digital only GPIO, and PWM.
|33| B0   | IO        | Digital only GPIO, and PWM.
|34| GND  | POWER     | System ground.
|35| D7   | IO        | Digital only GPIO.
|36| D6   | IO        | Digital only GPIO.
|37| D5   | IO        | Digital only GPIO.
|38| D4   | IO        | Digital only GPIO.
|39| D3   | IO        | Digital only GPIO, and PWM.
|40| D2   | IO        | Digital only GPIO, and PWM.
|41| D1   | IO        | Digital only GPIO, and PWM.
|42| D0   | IO        | Digital only GPIO, and PWM.
|43| GND  | POWER     | System ground.
|44| C5   | IO        | Digital only GPIO, and PWM.
|45| C4   | IO        | Digital only GPIO, and PWM.
|46| C3   | IO        | Digital only GPIO.
|47| C2   | IO        | Digital only GPIO.
|48| C1   | IO        | Digital only GPIO.
|49| C0   | IO        | Digital only GPIO.
|50| NC   | TBD       | Do not connect.
|51| GND  | POWER     | System ground.
|52| BLU  | IO        | Blue pin of the RGB LED.
|53| GRN  | IO        | Green pin of the RGB LED.
|54| RED  | IO        | Red pin of the RGB LED.
|55| MODE | IO        | Connected to the MODE button input.
|56| RST  | I         | Active-low reset input.
|57| STAT | O         | Connected to the charge status pin of the PMIC.
|58| GND  | POWER     | System ground.
|59| GND  | POWER     | System ground.
|60| GND  | POWER     | System ground.
|61| UB_USB+ | IO        | Data+ pin of the ublox USB port.
|62| UB_USB- | IO        | Data- pin of the ublox USB port.
|63| UB_VUSB_DET | IO        | USB detect pin of the ublox USB port. 5V on this pin enables the ublox's USB interface.




[1] PWM is available on D0, D1, D2, D3, B0, B1, B2, B3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 11 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

## Technical Specifications

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
| Supply Input Voltage | V<sub>IN</sub> | +3.88<sup>[1]</sup> |  | +12 | V |
| Supply Output Voltage | V<sub>IN</sub> |  | +4.8 |  | V |
| Supply Output Voltage | V<sub>3V3</sub> |  | +3.3 |  | V |
| LiPo Battery Voltage | V<sub>LiPo</sub> | +3.6 |  | +4.4 | V |
| Supply Input Voltage | V<sub>VBAT</sub> | +1.65 |  | +3.6 | V |
| Supply Input Current (VBAT) | I<sub>VBAT</sub> |  |  | 19 | uA |
| Operating Current (uC on, Cellular ON) | I<sub>IN avg</sub> |  | 180 | 250 | mA |
| Peak Current (uC on, Cellular ON) | I<sub>IN pk</sub> | 800<sup>[2]</sup> |  | 1800<sup>[3]</sup> | mA |
| Operating Current (uC on, Cellular OFF) | I<sub>IN avg</sub> |  | 47 | 50 | mA |
| Sleep Current (4.2V LiPo, Cellular OFF)| I<sub>Qs</sub> |  | 0.8 | 2 | mA |
| Deep Sleep Current (4.2V LiPo, Cellular OFF) | I<sub>Qds</sub> |  | 110 | 130 | uA |
| Operating Temperature | T<sub>op</sub> | -40<sup>[4]</sup> |  | +85<sup>[4]</sup> | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>[1]</sup> The minimum input voltage is software defined with a user selectable range of 3.88V to 5.08V in 80mV increments. Out of the box, the minimum input voltage is set to 4.36V in order for the LiPo battery to be able to properly charge.

<sup>[2]</sup> 3G operation

<sup>[3]</sup> 2G operation

<sup>[4]</sup> When powering the E series module with a LiPo battery (or other battery chemistries), please note that the operating temperatures will be affected accordingly.

### Radio specifications

The E series is available in three different versions: A 2G version based on u-blox G350 cellular module, and two 3G versions based on U260 and U270 modules. The difference between the 3G versions is their operating frequency band which differs based on the country. All of these cellular modules are GSM only and do not support CDMA networks.

| E series 3G Module  | Compatible Countries |
| :------------------ |:---|
| U260 | United States, Australia, Argentina, Brazil, Canada, Chile, Colombia, Costa Rica, Dominican Republic, El Salvador, Guatemala, Honduras, Mexico, Nicaragua, Panama, Paraguay, Peru, Venezuela |
| U270 |  Austria, Bahrain, Belarus, Belgium, Bulgaria, China, Congo, Croatia, Cyprus, Czech Republic, Denmark, Ecuador, Egypt, Estonia, Finland, France, Germany, Ghana, Gibraltar, Greece, Hong Kong, Hungary, Iceland, India, Indonesia, Ireland, Israel, Italy, Japan, Jersey, Kenya, Republic of Korea, Latvia, Lithuania, Luxembourg, Republic of Macedonia, Malaysia, Republic of Moldova, Republic of Montenegro, Netherlands, New Zealand, Nigeria, Norway, Pakistan, Philippines, Poland, Portugal, Qatar, Reunion, Romania, Russian Federation, Rwanda, Saudi Arabia, Republic of Serbia, Seychelles, Sierra Leone, Singapore, Slovakia, Slovenia, South Africa, Spain, Sri Lanka, Swaziland, Sweden, Switzerland, Taiwan, United Republic of Tanzania, Thailand, Turkey, Uganda, Ukraine, United Arab Emirates, United Kingdom, Uruguay, Zambia |

Please be sure to order a board that works in the country where you want to deploy your project.

#### 2G cellular characteristics for G350, U260, and U270 modules:
|Parameter | SARA-U260 | SARA-U270 | SARA-G350 |
|:---|:---|:---|:---|
|Protocol stack| 3GPP Release 7 | 3GPP Release 7 | 3GPP Release 99 |
|MS Class | Class B | Class B | Class B |
|Bands | GSM 850 MHz PCS 1900 MHz | E-GSM 900 MHz DCS 1800 MHz| GSM 850 MHz E-GSM 900 MHz DCS 1800 MHz PCS 1900 MHz|
|Power Class | Class 4 (33 dBm) for 850 band Class 1 (30 dBm) for 1900 band|Class 4 (33 dBm) for 900 band Class 1 (30 dBm) for 1800 band|Class 4 (33 dBm) for 850/900 bands Class 1 (30 dBm) for 1800/1900 bands|

#### 3G cellular characteristics for U260, and U270 modules:
|Parameter | SARA-U260 | SARA-U270 |
|:---|:---|:---|
|Protocol stack| 3GPP Release 7 | 3GPP Release 7 |
|UE Class| Class A | Class A|
|Bands | Band V (850 MHz) Band II (1900 MHz)| Band VIII (900 MHz) Band I (2100 MHz) |
|Power Class | Class 3 (24 dBm) for all bands| Class 3 (24 dBm) for all bands |


### I/O Characteristics

These specifications are based on the STM32F205RGT6 datasheet, with reference to E series pin nomenclature.

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

## Mechanical Specifications

<div align=center><img src="/assets/images/e-series/illustrations/e0-dims.png"></div>

### Dimensions and Weight
 * Width = 36 mm
 * Height = 43 mm
 * Thickness = 4.6 mm
 * Weight = 8 gms

### Recommended PCB land pattern

<div align=center><img src="/assets/images/e-series/illustrations/e0-footprint.png"></div>

An E series part for EAGLE can be found in the [Particle EAGLE library](https://github.com/particle-iot/hardware-libraries#pcb-footprints-land-pattern)

## Schematics

### USB

<div align=center><img src="/assets/images/e-series/schematics/e0-usb-sch.png"></div>

The USB data lines are terminated with 22 Ohm resistors. These data pins are also exposed via small through holes next to the USB connector and are labeled D+ and D-. The VBUS (+5VDC VCC of the USB port) is fed to the PMIC via a 3Amp Schottky diode ([SS3P3](http://www.vishay.com/docs/88944/ss3p3.pdf)). The VBUS pin is also available via the unpopulated header hole on the top-right side of the E series.

### PMIC (Power Management Integrated Circuit)

<div align=center><img src="/assets/images/e-series/schematics/e0-pmic-sch.png"></div>

The E series uses TI's [BQ24195](http://www.ti.com/lit/ds/symlink/bq24195.pdf) as the power management and charging unit. This PMIC intelligently sources power from either the VIN pin, the USB port and/or the LiPo battery. When all the power sources as connected, the unit tries to source power from the USB or VIN as default and continues to charge the LiPo battery. When the battery is completely charged, the power is then sourced from USB/VIN alone. If there is a power deficit (which generally occurs during cellular radio transmission), the additional power is then sourced from the battery as required. The unit can also seamlessly switch back to the battery when other sources of power are suddenly removed.

The DP data pin of the USB is used by the PMIC to detect the presence of a USB power source. It then adjusts the charge current and the limit based on the type of USB power source it detects. This does not always happen successfully since there are a lot of USB hubs and chargers out there that do not meet the USB design guidelines. If the detection is unsuccessful, the PMIC defaults to a 500mA current limit. A user can always adjust these parameters via software.

The microcontroller communicates with the PMIC via an I2C interface (pins PC9 and PA8). This interface allows the microcontroller to read the status of the PMIC and set its various parameters.

### Microcontroller

<div align=center><img src="/assets/images/e-series/schematics/e0-micro-sch.png"></div>

The E series uses ST Microelectronics's [STM32F205RGT6](http://www2.st.com/content/ccc/resource/technical/document/datasheet/bc/21/42/43/b0/f3/4d/d3/CD00237391.pdf/files/CD00237391.pdf/jcr:content/translations/en.CD00237391.pdf) ARM Cortex M3 microcontroller running at  120MHz.

### U-blox cellular module

<div align=center><img src="/assets/images/e-series/schematics/e0-ublox-sch.png"></div>

The u-blox cellular module talks to the microcontroller over a full-duplex USART interface using a standard set of AT commands. The eSIM chip is directly connected to the u-blox. The power to the eSIM chip is also provided by the cellular module.


### Buffers

<div align=center><img src="/assets/images/e-series/schematics/e0-buffers-sch.png"></div>

Since u-blox module's communication interface operates at 1.8VDC, while the STM32F205RGT6 microcontroller operates at 3.3VDC, we need voltage translators in-between them. This is achieved with two [SN74AVC4T245](http://www.ti.com/lit/ds/symlink/sn74avc4t245.pdf) non-inverting buffers. The default state of the USART pins is set with the help of pull-up and pull-down resistors, and the unused input pins are tied to GND.

### 3.3V Regulator and Fuel Gauge

<div align=center><img src="/assets/images/e-series/schematics/e0-reg-sch.png"></div>

The output (3.8V net) of the PMIC is fed directly to the u-blox cellular module and a 3.3VDC high efficiency switching regulator ([TPS62290](http://www.ti.com.cn/cn/lit/ds/symlink/tps62290.pdf)). This 3.3VDC regulator helps power the microcontroller, fuel gauge and the buffers.

The E series employs a [MAX17043](https://datasheets.maximintegrated.com/en/ds/MAX17043-MAX17044.pdf) fuel gauge to monitor the LiPo battery voltage and it's state of charge. The microcontroller communicates with it over an I2C interface (same channel as the PMIC).

## Product Handling

### ESD Precautions

<i class="icon-attention"></i> The E series contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an E series without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates EØs.  ESD precautions should be implemented on the application board where the E series is mounted. Failure to observe these precautions can result in severe damage to the E series! <i class="icon-attention"></i>

### Connectors

There are two connectors on the E series that will get damaged with improper usage.

The micro B USB connector on the E series is soldered on the PCB with large surface pads as well as couple of through hole anchor points. Despite this reinforcement, it is very easy to rip out the connector if too much stress is put on in the vertical direction.


The u.FL antenna connector is a very fragile piece of hardware (and is fancy too with all the gold plating). The connector was not designed to be constantly plugged and unplugged. Care must be taken not to put stress on it at any time (yes, swinging the E series by the antenna is a very bad idea, this is not your cat). The antenna pin is also the most static sensitive and you can destroy the radio with improper handling. If you are feeling adventurous, we highly recommend putting a tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector to securely hold the plug in place.

## Default settings

The E series comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the online Web IDE [Particle Build](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air).  [Particle Dev](https://www.particle.io/dev) is a local tool that uses the Cloud to compile and flash OTA as well.  There is also a package `Spark DFU-UTIL` for Particle Dev that allows for Cloud compiling and local flashing via DFU over USB.  This requires `dfu-util` to be installed on your system.  'dfu-util' can also be used with [Particle CLI](https://github.com/particle-iot/particle-cli) for Cloud compiling and local flashing via the command line.  Finally the lowest level of development is available via the [GNU GCC tool chain for ARM](https://github.com/particle-iot/firmware), which offers local compile and flash via dfu-util.  This gives the user complete control of all source code and flashing methods.  This is an extensive list, however not exhaustive.

## Glossary
|Term|Definition |
|:---|:---|
|SMPS| Switch Mode Power Supply |
|SIM| Subscriber Identity Module|
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

## Product Variants

|Name|Connectivity       |Geography             |u-blox variant|Band Support|
|:---|:------------------|:---------------------|:-------------|:-----------|
|E210|2G only			 |Global	            |SARA-G350     |850/900/1800/1900 MHz|
|E301|3G with 2G fallback|Regional(Americas/Aus)|SARA-U260     |850/1900 MHz|
|E302|3G with 2G fallback|Regional(Eur/Asia/Aus)|SARA-U270     |900/1800/2100 MHz|
|E310|3G with 2G fallback|Global                |SARA-U201     |850/900/1800/1900/2100 MHz|

## FCC IC CE Warnings and End Product Labeling Requirements

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

 * XPYSARAG350 (For 2G E series module using the G350 module)
 * XPYSARAU260 (For 3G E series module using the U260 module)
 * XPYSARAU270 (For 3G E series module using the U270 module)
 * XPYSARAU201 (For 3G E series module using the U201 module)

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
> Contains transmitter module IC:

 * 8595A-SARAG350 (For 2G E series using the G350 module)
 * 8595A-SARAU260 (For 3G E series using the U260 module)
 * 8595A-SARAU270 (For 3G E series using the U270 module)
 * 8595A-SARAU201 (For 3G E series using the U201 module)

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.
>
> For an in-depth review on certifications, please click [here.](/guide/how-to-build-a-product/certification/)

## Revision history

| Revision | Date          | Author | Comments        |
|:--------:|:-------------:|:------:|:----------------|
| v001     | 07-Nov-2017   | MB     |  Initial release |

## Known Errata


## Contact

**Web**

[https://www.particle.io](https://www.particle.io)

**Community Forums**

[https://community.particle.io](https://community.particle.io)

**Email**

[https://support.particle.io](https://support.particle.io)
