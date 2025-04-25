---
title: Electron 2 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Electron 2, Gen 3 cellular development kit
---

# Electron 2 Datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and is subject to change.
{{box op="end"}}

![Electron 2 Rendering](/assets/images/electron-2/electron-2-rendering.png)

## Functional description

### Overview

The Electron 2 is a powerful LTE Cat 1 bis-enabled development kit that supports cellular networks and Bluetooth LE (BLE). It is based on the Nordic nRF52840 and has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

The Electron 2 is great for connecting existing projects to the Particle Device Cloud where Wi-Fi is missing or unreliable. In most cases, it can be used 
as a drop-in replacement for Boron devices including the BRN404X, BRN404, BRN402, BRN314, or BRN310.

### Features

#### Features - ELC504EM (NorAm)

 * Quectel EG800Q-NA cellular modem
 * LTE Cat 1 bis (4G)
 * Support for United States, Canada, and Mexico (North America, NorAm)
 * LTE Cat 1 bands: 2, 4, 5, 12, 13, 66
 * Embedded Particle EtherSIM e-sim

#### Features - ELC524EM (Europe)

 * Quectel EG800Q-EU cellular modem
 * LTE Cat 1 bis (4G)
 * Support for selected countries in Europe, Middle East, Africa, Asia, Oceania (EMEAA)
 * LTE Cat 1 bands: 1, 3, 5, 7, 8, 20, 28
 * Embedded Particle EtherSIM e-sim


#### Features - all models

 * Nordic Semiconductor nRF52840 SoC 
  * ARM Cortex-M4F 32-bit processor @ 64MHz 
  * 1MB flash, 256KB RAM 
  * Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps 
  * Supports DSP instructions, HW accelerated Floating Point Unit (FPU) and encryption functions
  * Up to +8 dBm TX power (down to -20 dBm in 4 dB steps) 
  * NFC-A tag
 * On-board additional 8MB SPI flash
 * 20 mixed signal GPIO (6 x Analog, 8 x PWM), UART, I2C, SPI
 * USB-C connector
 * Integrated Li-Po charging and battery connector (3-pin with temperature sensor)
 * JTAG (SWD) Connector
 * RGB status LED
 * Reset and Mode buttons
 * Built-in Particle EtherSIM e-sim
 * On-board PCB antenna for BLE
 * U.FL connectors for external antennas for cellular, BLE, and NFC
 * Meets the Adafruit Feather [specification](https://learn.adafruit.com/adafruit-feather/feather-specification) in dimensions and pinout
 * RoHS compliant (lead-free)
 * Requires Device OS 6.3.0 (or later)


## Decision guides

If you are unsure of whether to use the Electron 2 or another device, you can consult the decision guides.

| Deciding between | Information |
| :--- | :--- |
| M.2 SoM | [Electron 2 vs SoM decision guide](/hardware/decision-guides/electron-2-vs-som-decision-guide/) |

## Migration information

| Migrating from | Information |
| :--- | :--- |
| Boron | [Electron 2 from Boron migration guide](/hardware/migration-guides/electron-2-boron-migration-guide/) |

### Certification

{{!-- BEGIN shared-blurb 2d22b4d0-8047-4513-a095-81ba5b289ff3 --}}
Changing the Particle module will require unintentional radiator testing of your completed assembly. This is the least expensive 
and least complicated of the certification tests.

You generally do not need to perform intentional radiator testing if using the antennas used for the Particle certification.
{{!-- END shared-blurb --}}


### Device OS support

It is recommended that you use the latest version in the 6.x or later release line with the Electron 2.

The minimum supported version is 6.3.0.

The Electron 2 is the `electron2` platform (37). 

Products can only contain a single platform, so you will need separate products for Electron 2 and other devices such as the 
Boron, B-SoM, M-SoM, or Photon 2.


## Interfaces

### Block diagram
 
{{imageOverlay src="/assets/images/electron-2/electron-2-block-diagram.png" alt="Block Diagram" class="full-width"}}

### Labeled diagram

{{imageOverlay src="/assets/images/electron-2/electron-2-labeled.png" alt="Labeled diagram" class="full-width"}}

| Label | Description | Location |
| ---: | :--- | :--- |
|  1 | USB-C connector | Top |
|  2 | Battery Charge LED (Oranbge) | Top |
|  3 | User LED D6 (Blue) | Top |
|  4 | LiPo battery connector | Top |
|  5 | SWD debug connector | Top |
|  6 | MODE button | Top |
|  7 | RGB LED | Top |
|  8 | RESET button | Top |
|  9 | External BLE antenna U.FL connector | Top |
| 10 | Internal BLE antenna | Bottom |
| 11 | NFC U.FL connector | Bottom |

### Power

#### USB-C PORT
The USB port is the easiest way to power up the Electron 2. The Electron 2 includes a USB-C connector on the module.

Note that the Electron 2 does not use USB-C PD mode to change the port voltage like the Muon and Tachyon; the USB-C port
is used at the default of 5V.

The Electron 2 is compatible with most USB-C chargers for tablets. Power adapters for the Raspberry Pi 4 and 5 are generally
compatible as well.

#### VUSB PIN
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.

#### LiPo

The Electron 2 has a 3-pin JST-PH (2mm pitch) battery connector that is the same as the Monitor One, Muon, and Tachyon for connection to a 3.7V LiPo battery pack 
with an integrated temperature sensor (10K NTC thermistor).

Some other Particle devices have a 3.7V LiPo battery without a temperature sensor using 2-pin JST-PH connector. This battery is not compatible and cannot be used with the Electron 2. A temperature sensor or equivalent resistance is required for proper operation; replacing the connector is not sufficient to use a battery without a temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>


If purchasing a battery from a 3rd-party supplier, verify the polarity as the polarity is not standardized even for batteries using a JST-PH connector.
See the [battery guide](/hardware/power/batteries/) for additional information.

#### Li+ pin
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Electron 2.

**Li+ with external battery**

If you are using an external LiPo battery and wish to use the built-in charger on the Electron 2,
changes will be necessary from the Boron as you must simulate having a temperature
sensor in the valid charging range to enable charging.

This can be done using a solder jumper on the bottom of the Electron 2. It consists
of two half-moon shaped pads that must be soldered closed and will allow charging at
any temperature with battery packs or external supplies that do not have a temperature sensor.

{{imageOverlay src="/assets/images/electron-2/ts-pad.png" alt="ts solder jumper"}}

<p class="attribution">Facing bottom side of the Electron 2 with the battery connector on the left</p>

**Li+ as power input**

When used as a power input (3.6 to 4.2 VDC), on the Boron it was necessary to disable charging in software 
through the PMIC settings. This is not necessary with the Electron 2 as charging will automatically be
disabled in hardware because the battery temperature sensor will be missing and will signal out of valid
temperature range in this case, disabling charging.

#### 3V3 PIN

This pin is the output of the on board 3.3V step-down switching regulator. The regulator is rated at 1500mA maximum, however you must also budget 
for the power used by the MCU and the cellular modem.

Unlike the Photon, this pin _CANNOT_ be used to power the Electron 2.

#### EN pin

The **EN** pin is not a power pin, per se, but it controls the 3V3 and cellular modem power. The EN pin is pulled high by a 100K resistor to VSYS (3.8V), which is powered by VUSB, the USB-C connector, or the LiPo battery. Because the pull-up can result in voltages above 3.3V you should never directly connect EN to a 3.3V GPIO pin. Instead, you should only pull EN low, such as by using an N-channel MOSFET or other open-collector transistor.

The EN pin can force the device into a deep power-down state where it uses very little power. It also can used to assure that the device is completely reset, similar to unplugging it, with one caveat:

If using the EN pin to deeply reset the device, you must be careful not to allow leakage current back into the nRF52 MCU by GPIO or by pull-ups to 3V3. If you only power external devices by 3V3 you won't run into this, as 3V3 is de-powered when EN is low. 

However, if you have circuitry that is powered by a separate, external power supply, you must be careful. An externally powered circuit that drives a nRF52 GPIO high when EN is low can provide enough current to keep the nRF52 from powering down and resetting. Likewise, a pull-up to an external power supply can do the same thing. Be sure that in no circumstances can power by supplied to the nRF52 when 3V3 is de-powered.

### Antenna

There are three radios on the Electron 2. A BLE radio (nRF52840) and a cellular radio. For the cellular radio, we have provided a u.FL connector to plug in the cellular antenna. This is required if you wish to use the cellular connectivity.

There are two options for the BLE antenna on the Electron 2. It comes with an on-board PCB antenna which is selected by default in the device OS and a u.FL connector if you wish to connect an external antenna. If you wish to use the external antenna, you'll need to issue an appropriate command in the firmware.

There is also an NFC tag receiver. This requires an external NFC antenna.

### Approved antennas


#### Certified cellular antenna

The following antenna is included in single-unit packages that include an antenna.

{{!-- BEGIN shared-blurb c04616f7-eede-439f-9dee-d5c9aa1bf53f --}}
| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | B504e and M-SoM | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |

Single quantity units and developer kits include a PARANTCW1EA antenna. Tray quantities of the do not include antennas.

| Dimension | Value | Unit |
| :--- | ---: | :---: |
| Length | 116.0 | mm |
| Width | 27.0 | mm |
| Thickness | 0.2 | mm |
| Cable Length | 189.5 | mm |


| Parameter | 700/850/900 | 1700/1800/1900 | 2100 | 2400 | 2600 | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Peak gain | | | | | | | |
| PARANTCW1EA | 2.8 | 5.3 | 5.3 | 5.3 | 5.3 | dBi |
{{!-- END shared-blurb --}}

{{box op="start" cssClass="boxed warningBox"}}
Particle devices are certified for use only with the designated antenna specified above. The use of alternative antennas with our modules could necessitate a recertification process. To fully understand the potential consequences of using a non-certified antenna, Particle strongly advises seeking consultation with a qualified RF expert.
{{box op="end"}}



#### Certified BLE antenna 

The Electron 2 404X contains an onboard chip antenna for Bluetooth LE (BLE). You can optionally use an external 2.4 GHz BLE antenna.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Built-in chip antenna | | [Datasheet](/assets/datasheets/AT5020-E3R0HBAN.pdf)  |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |

|Frequency     |Antenna Type|Manufacturer|MFG. Part # | Gain      |
|:-------------|:-----------|:-----------|:-----------|:----------|
| 2400-2500 MHz | Chip Antenna | ACX | AT5020-E3R0HBA | 0dBi peak |
| 2400-2500 MHz|PCB Antenna |Particle    | ANT-FLXV2  |2.0dBi peak|


**Built-in chip antenna**

General antenna parameters:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Manufacturer | ACX | |
| Model | AT5020-E3R0HBA | |
| Antenna Type | Chip | |
| Impedance | 50 | ohms |
| Peak Gain | 0 | dBi |
| Average Gain | -1.5 | dBi |
| Max VSWR | 2 | |

**Particle external antenna ANT-FLXV2**
{{!-- BEGIN shared-blurb 7c41f4d6-9679-493a-aea9-61dfee3c2066 --}}
General antenna parameters:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Antenna Type | Dipole | |
| Radiation Properties | Omnidirectional | |
| Polarization | Vertical | |
| Impedance | 50 | ohms |
| Peak Gain | 2.0 | dBi |
| Max VSWR | < 2.0 | |

Mechanical:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Dimensions | 45.1 x 7.4 x 1.0 | mm |
| Material | PCB | |
| Connector | U.FL (IPEX) |
| Cable | Mini-coax 1.13mm | |
| Cable length | 120 | mm |

Environmental:

| Parameter | Value |
| :--- | :---: |
| Operating temperature | -20°C to 75°C |
| Storage temperature | -20°C to 75°C |
| ROHS Compliant | &check; |
{{!-- END shared-blurb --}}


#### Certified NFC antenna

{{!-- BEGIN shared-blurb 86c73bb3-0686-431e-a7b9-1ac0a47170e0 --}}
| Antenna | SKU  | Links |
| :------ | :--- | :---- | 
| Particle NFC Antenna, [x1] | ANT-NFC | [Datasheet](/assets/datasheets/ANT-NFC.pdf) &#124; [Retail Store](https://store.particle.io/products/nfc-antenna) |

General antenna parameters:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Frequency | 13.56 MHz |
| Communication Distance (max) | 52 | mm |

Mechanical:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Dimensions | 35 x 35 | mm |
| Connector and cable | U.FL and 1.13mm mini coax | |
| Cable length | 100 | mm |

Environmental:

| Parameter | Value |
| :--- | :---: |
| Operating temperature | -20°C to 85°C |
| Storage temperature | -20°C to 85°C |
| ROHS Compliant | &check; |
{{!-- END shared-blurb --}}

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 20 | I/O |
| Analog (ADC) | 6 | I |
| UART | 1 | I/O |
| SPI  | 1 | I/O |
| I2C  | 2 | I/O |
| USB  | 1 | I/O |
| PWM  | 8| O |

**Note:** All GPIOs are only rated at 3.3VDC max.

### SWD 

The Electron 2 has a dedicated 10 pin debug connector that exposes the SWD interface of the nRF52840. This interface can be used to debug your code or reprogram your Electron 2 bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" ></div>

## Memory map

### nRF52840 flash layout overview

 - Bootloader (48KB, @0xF4000)
 - User Application (256KB @ 0xB4000)
 - System (656KB, @0x30000)
 - SoftDevice (192KB)

### External SPI flash layout overview (dfu offset: 0x80000000)

 - OTA (1500KB, @0x00289000)
 - Reserved (420KB, @0x00220000)
 - FAC (128KB, @0x00200000)
 - LittleFS (2M, @0x00000000)

## Pins and button definitions

### Pinout diagram

{{imageOverlay src="/assets/images/electron-2/electron-2-pinout.svg" alt="Pinout" class="full-width"}}


### Pin description

|   Pin | Description |
| :-----|:----------- |
|Li+    |This pin is internally connected to the positive terminal of the LiPo battery connector.|
|VUSB   |This pin is internally connected to the USB (+ve) supply.|
|3V3    |This pin is the output of the on-board 3.3V regulator.|
|GND    |System ground pin.|
|EN     |Device enable pin is internally pulled-up. To disable the device, connect this pin to GND.|
|RST    |Active-low system reset input. This pin is internally pulled-up.|
|MD     |This pin is internally connected to the MODE button. The MODE function is active-low.|
|RX     |Primarily used as UART RX, but can also be used as a digital GPIO.|
|TX     |Primarily used as UART TX, but can also be used as a digital GPIO.|
|SDA    |Primarily used as data pin for I2C, but can also be used as a digital GPIO.|
|SCL    |Primarily used as clock pin for I2C, but can also be used as a digital GPIO.|
|MO,MI,SCK| These are the SPI interface pins,  but can also be used as a digital GPIO.|
|D2-D8  | These are generic GPIO pins. D2-D8 are PWM-able.|
|A0-A5  | These are analog input pins that can also act as standard digital GPIO. A0-A5 are PWM-able.|

---


### GPIO and port listing

{{!-- BEGIN do not edit content below, it is automatically generated e3a16918-77ca-4439-9020-220282c681ee --}}

| Pin Name |   |   |   |   | PWM | MCU |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| A0 / D19 | ADC0 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.03 |
| A1 / D18 | ADC1 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.04 |
| A2 / D17 | ADC2 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.28 |
| A3 / D16 | ADC3 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.29 |
| A4 / D15 | ADC4 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.30 |
| A5 / D14 | ADC5 | &nbsp; | SPI (SS) | &nbsp; | &check; | P0.31 |
| D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | P0.26 |
| D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | P0.27 |
| D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 RTS | &check; | P1.01 |
| D3 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 CTS | &check; | P1.02 |
| D4 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | P1.08 |
| D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.10 |
| D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.11 |
| D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.12 |
| D8 / WKP | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.03 |
| MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; | P1.14 |
| MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; | P1.13 |
| RX / D10 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | &nbsp; | P0.08 |
| SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | P1.15 |
| TX / D09 | &nbsp; | &nbsp; | &nbsp; | Serial1 TX | &nbsp; | P0.06 |


{{!-- END do not edit content above, it is automatically generated  --}}

### ADC (analog to digital converter)

The Electron 2 supports 6 ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated 6d2f42d4-109a-43d6-9375-4bcd750f1225 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, GPIO, PWM | ADC0 | P0.03 |
| A1 / D18 | A1 Analog in, GPIO, PWM | ADC1 | P0.04 |
| A2 / D17 | A2 Analog in, GPIO, PWM | ADC2 | P0.28 |
| A3 / D16 | A3 Analog in, GPIO, PWM | ADC3 | P0.29 |
| A4 / D15 | A4 Analog in, GPIO, PWM | ADC4 | P0.30 |
| A5 / D14 | A5 Analog in, GPIO, PWM, SPI SS | ADC5 | P0.31 |


{{!-- END do not edit content above, it is automatically generated  --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits


### UART serial

The Electron 2 supports one UART serial interface. 

{{!-- BEGIN do not edit content below, it is automatically generated 4dccb92d-ca6c-491a-8aab-2f5a1d259809 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D2 | SPI1 SCK, Serial1 RTS, GPIO, PWM | Serial1 RTS | P1.01 |
| D3 | SPI1 MOSI, Serial1 CTS, PWM, GPIO | Serial1 CTS | P1.02 |
| RX / D10 | Serial RX, GPIO | Serial1 RX | P0.08 |
| TX / D09 | Serial TX, GPIO | Serial1 TX | P0.06 |


{{!-- END do not edit content above, it is automatically generated  --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- You cannot use hardware flow control and Ethernet at the same time.


### SPI

The Electron 2 supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated dcad2250-0112-4901-ae15-f18d3b8fd771 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A5 / D14 | A5 Analog in, GPIO, PWM, SPI SS | SPI (SS) | P0.31 |
| D2 | SPI1 SCK, Serial1 RTS, GPIO, PWM | SPI1 (SCK) | P1.01 |
| D3 | SPI1 MOSI, Serial1 CTS, PWM, GPIO | SPI1 (MOSI) | P1.02 |
| D4 | SPI1 MISO, PWM, GPIO | SPI1 (MISO) | P1.08 |
| MISO / D11 | SPI MISO, GPIO | SPI (MISO) | P1.14 |
| MOSI / D12 | SPI MOSI, GPIO | SPI (MOSI) | P1.13 |
| SCK / D13 | SPI SCK, GPIO | SPI (SCK) | P1.15 |


{{!-- END do not edit content above, it is automatically generated --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- You cannot use `SPI1` and Ethernet at the same time.


### I2C

The Electron 2 supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated 5f81e7fc-53ae-46e5-9976-9a71f2d94bb2 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D0 | I2C SDA, GPIO | Wire (SDA) | P0.26 |
| D1 | I2C SCL, GPIO | Wire (SCL) | P0.27 |


{{!-- END do not edit content above, it is automatically generated --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are recommended for I2C as the internal pull-up is 13K.
- If not using I2C, pins D0 and D1 can be used as GPIO or analog input.

### PWM

The Electron 2 supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated cdac1a36-7742-47d6-b1cd-c8ecced4974d --}}

| Pin Name | Description | Timer | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, GPIO, PWM | PWM2 | P0.03 |
| A1 / D18 | A1 Analog in, GPIO, PWM | PWM2 | P0.04 |
| A2 / D17 | A2 Analog in, GPIO, PWM | PWM2 | P0.28 |
| A3 / D16 | A3 Analog in, GPIO, PWM | PWM2 | P0.29 |
| A4 / D15 | A4 Analog in, GPIO, PWM | PWM3 | P0.30 |
| A5 / D14 | A5 Analog in, GPIO, PWM, SPI SS | PWM3 | P0.31 |
| D2 | SPI1 SCK, Serial1 RTS, GPIO, PWM | PWM3 | P1.01 |
| D3 | SPI1 MOSI, Serial1 CTS, PWM, GPIO | PWM3 | P1.02 |
| D4 | SPI1 MISO, PWM, GPIO | PWM1 | P1.08 |
| D5 | PWM, GPIO | PWM1 | P1.10 |
| D6 | PWM, GPIO | PWM1 | P1.11 |
| D7 | PWM, GPIO | PWM0 | P1.12 |
| D8 / WKP | GPIO, PWM | PWM1 | P1.03 |


{{!-- END do not edit content above, it is automatically generated --}}

- PWM that share the same timer (`PMW2` for example) must share the same frequency but can have different duty cycles.
- Pin `D7` (PWM0) share a timer with the RGB LED and you should not change its frequency but it can have a different duty cycle.


---


### Complete module pin details

{{collapse op="start" label="Show pin details"}}

{{!-- BEGIN do not edit content below, it is automatically generated 22694b55-ad2c-4e61-a33f-71994b569ba3 --}}


#### 1 RST

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hardware reset. Pull low to reset; can leave unconnected in normal operation.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.18</td></tr>
</tbody>
</table>

#### 2 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Regulated 3.3V DC output, maximum load 1000 mA</td></tr>
</tbody>
</table>

#### 3 MODE

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MODE</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">MODE button, has internal pull-up</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.11</td></tr>
</tbody>
</table>

#### 4 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 5 A0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A0 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A2, and A3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.03</td></tr>
</tbody>
</table>

#### 6 A1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A1 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A2, and A3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.04</td></tr>
</tbody>
</table>

#### 7 A2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A2 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A2, and A3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.28</td></tr>
</tbody>
</table>

#### 8 A3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A3 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A2, and A3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.29</td></tr>
</tbody>
</table>

#### 9 A4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A4 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A4, A5, D2, and D3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.30</td></tr>
</tbody>
</table>

#### 10 A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, GPIO, PWM, SPI SS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A4, A5, D2, and D3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.31</td></tr>
</tbody>
</table>

#### 11 SCK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI SCK, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.15</td></tr>
</tbody>
</table>

#### 12 MOSI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MOSI, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.13</td></tr>
</tbody>
</table>

#### 13 MISO

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MISO, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.14</td></tr>
</tbody>
</table>

#### 14 RX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial RX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.08</td></tr>
</tbody>
</table>

#### 15 TX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D09</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.06</td></tr>
</tbody>
</table>

#### 16 D0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SDA, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.26</td></tr>
</tbody>
</table>

#### 17 D1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">I2C SCL, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.27</td></tr>
</tbody>
</table>

#### 18 D2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 SCK, Serial1 RTS, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A4, A5, D2, and D3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.01</td></tr>
</tbody>
</table>

#### 19 D3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MOSI, Serial1 CTS, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A4, A5, D2, and D3 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">CTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.02</td></tr>
</tbody>
</table>

#### 20 D4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MISO, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, D6, and D7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.08</td></tr>
</tbody>
</table>

#### 21 D5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">21</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, D6, and D7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.10</td></tr>
</tbody>
</table>

#### 22 D6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, D6, and D7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.11</td></tr>
</tbody>
</table>

#### 23 D7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.12</td></tr>
</tbody>
</table>

#### 24 D8

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">24</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">WKP</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, D6, and D7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.03</td></tr>
</tbody>
</table>

#### 25 VUSB

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">25</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VUSB</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 26 EN

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">26</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">EN</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.</td></tr>
</tbody>
</table>

#### 27 LI+

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">27</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">LI+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Connected to JST PH LiPo battery connector. 3.7V in or out.</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}


---

### LED status

#### System RGB LED

For a detailed explanation of different color codes of the RGB system LED, please see the [status LED guide](/troubleshooting/led/).

#### Charge status LED

|State | Description |
|:---|:---|
|ON | Charging in progress |
|OFF | Charging complete |
|Blink at 1Hz| Fault condition<sup>[1]</sup> |
|Flickering | Battery disconnected<sup>[2]</sup> |

**Notes:**

<sup>[1]</sup> A fault condition can occur due to several reasons, for example, battery over/under voltage, temperature fault or safety timer fault. You can find the root cause by reading the fault register of the power management IC in firmware.

<sup>[2]</sup> Once the device is in normal operating mode it will eventually detect the battery is disconnected and stop flickering. It will continue to flicker
if in DFU mode (blinking yellow) as battery detection is not done when in the bootloader or DFU mode.

## Technical specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| Supply Input Voltage | V<sub>IN-MAX</sub> |  |  | +6.2 | V |
| Battery Input Voltage | V<sub>LiPo</sub> |  |  | +6.5 | V |
| Supply Output Current | I<sub>3V3-MAX-L</sub> |  |  | 1000 | mA |
| Storage Temperature | T<sub>stg</sub> | -30 |  | +75 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 1 | kV |

<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.


### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| LiPo Battery Voltage | V<sub>LiPo</sub> | +3.3 |  | +4.4 | V |
| Supply Input Voltage | V<sub>3V3</sub> | +3.0 | +3.3 | +3.6 | V |
| Supply Output Voltage | V<sub>3V3</sub> |  | +3.3 |  | V |
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

---

### Radio specifications

Electron 2 has two radio modules, the nRF52 MCU BLE radio, and a cellular module, depending on the model.

#### Nordic Semiconductor nRF52840 for BLE

{{!-- BEGIN shared-blurb a084ed37-28ae-47ae-8d1d-63e95a0f7d6d --}}
| Feature | Description|
| :-------|:---------- |
| Feature | Bluetooth LE 5 |
|Operating Frequencies| 2360 to 2500 MHz|
|Output Power| Programmable -20dBm to +8dBm|
|PLL channel spacing| 1 MHz|
|On the air data rate| 125 to 2000 kbps|
{{!-- END shared-blurb --}}

#### Nordic Semiconductor nRF52840 for NFC tag

{{!-- BEGIN shared-blurb b8bb013e-9b2f-443b-874e-842e94850e62 --}}
| Feature | Description|
| :-------|:---------- |
| Feature | NFC Tag-A |
| Frequency | 13.56 MHz |
{{!-- END shared-blurb --}}



### I/O characteristics 

These specifications are based on the nRF52840 datasheet.

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :---------|:-------|:----------:|:---:|:---:|:---:|:---: |
|Input high voltage | V<sub>IH</sub>||0.7*3.3|--|3.3|V|
|Input low voltage | V<sub>IL</sub> | | 0 | | 0.3*3.3 | V |
|Current at GND+0.4 V, output set low, high drive|I<sub>OL,HDL</sub> |V<sub>3V3</sub> >= 2.7V|6|10|15|mA|
|Current at V<sub>3V3</sub>-0.4 V, output set high, high drive|I<sub>OH,HDH</sub>|V<sub>3V3</sub> >= 2.7V|6|9|14|mA|
|Current at GND+0.4 V, output set low, standard drive|I<sub>OL,SD</sub> |V<sub>3V3</sub> >= 2.7V|1|2|4|mA|
|Current at V<sub>3V3</sub>-0.4 V, output set high, standard drive|I<sub>OH,SD</sub>|V<sub>3V3</sub> >= 2.7V|1|2|4|mA|
| Pull-up resistance | R<sub>PU</sub> | | 11 |13 | 16 | kΩ |
| Pull-down resistance | R<sub>PD</sub> | | 11 |13 | 16 | kΩ |

GPIO default to standard drive (2mA) but can be reconfigured to high drive (9mA) in Device OS 2.0.0 and later using the [`pinSetDriveStrength()`](/reference/device-os/api/input-output/pinsetdrivestrength/) function.

## Mechanical specifications

### Dimensions and weight

{{imageOverlay src="/assets/images/electron-2/electron-2-dimensions.png" alt="Dimensions" class="full-width"}}
 
{{!-- BEGIN shared-blurb 6e4375b2-8981-4e75-8572-82a138fc2a46 --}}
| Dimension | mm | inches |
| :--- | ---: | ---: |
| Width | 22.86 | 0.9 |
| Length | 50.80 | 2.0 |
| Spacing between rows of pins | 20.32 | 0.8 |
| Spacing between pins | 2.54 | 0.1 | 
| Width between holes | 17.78 | 0.7 |
| Length between holes | 45.72 | 1.8 | 
{{!-- END shared-blurb --}}


- Weight = 10 grams

### 3D models

To be provided at a later date. The module is the same size as the Boron, however the dimensions of the shield are different.

### Mating connectors

The Electron 2 uses two single row 0.1" pitch male header pins. One of them is 16 pin while the other is 12 pin. It can be mounted with matching 0.1" pitch female headers with a typical height of 0.335" (8.5mm). When you search for parts like these it can be difficult to navigate the thousands of parts available online so here are a few good choices for the Electron 2:

| Description | MFG | MFG Part Number |
|:----------- |:----|:----------------|
|16-pin 0.1" (2.54mm) Female Header|Sullins|PPTC161LFBN-RC|
|16-pin 0.1" (2.54mm) Female Header|TE|6-535541-4|
|12-pin 0.1" (2.54mm) Female Header|Sullins|PPTC121LFBN-RC|
|12-pin 0.1" (2.54mm) Female Header|TE|6-534237-0|


## Land pattern

The Electron 2 can be directly soldered onto the PCB or be mounted with the above mentioned female headers.

{{imageOverlay src="/assets/images/boron/boron-landing-pattern.png" alt="Land pattern"}}

This land pattern is the same as the Boron and Argon.

## Schematic

To be provided at a later date.


## Assembly

### Water soluble flux

When attaching a Electron 2 to your base board, we recommend using a socket. As there are components on the bottom side of the Electron 2 there is no version available with castellated holes, solder pads, or similar techniques for direct surface mounting.

The pin headers on the bottom of the Electron 2 are not intended to be reflowed using paste-in-hole. 

If you decide to wave solder or hand-solder the Electron 2 directly to your base board, water soluble flux should not be used. There are components within the Electron 2 module that are moisture-sensitive, and wash water can get trapped under the RF shields, causing damage.

Use no-clean flux instead if you must solder the Electron 2 module.

### Conformal coatings

Electron 2 modules should not use a conformal coating to protect the module from water. Some components on the module cannot be coated and would need to be masked off during coating. This will make the coating process difficult to implement and test.

Furthermore, the buttons cannot be protected by using a coating. Using an enclosure that protects both your base board and the Electron 2 module as a single waterproof assembly is recommended instead.



## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

To be provided at a later date.

## Product handling

### ESD precautions

The Electron 2 contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling Electron 2 without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates Electron 2. ESD precautions should be implemented on the application board where the Electron 2 is mounted. Failure to observe these precautions can result in severe damage to the Electron 2!

### Breadboarding

The breadboard provided with the Electron 2 is specifically designed to require low insertion force. This makes it easy to plug the Electron 2 in and out of the breadboard. If you end up using a different breadboard, remember that it may require more force. In this case, always remember to pinch-hold your precious Electron 2 by the sides (along the header pins) when plugging-unplugging and not by the USB connector (don't be this person).

## Default settings

The Electron 2 comes preprogrammed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.

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

* Contains FCC ID: xxx

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

 * Contains transmitter module ISED: (To be provided at a later date)
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Certification documents

To be provided at a later date.



## Country compatibility 

{{!-- BEGIN do not edit content below, it is automatically generated c13cd883-4df5-4de7-868e-5999c8650ce4 --}}

<table>
<thead>
<tr><td></td><td></td><td colspan="2" style="background-color: #AFE4EE; color: #001928; " >ELC504EM (NorAm)</td><td width="6px;">&nbsp;</td><td colspan="2" style="background-color: #89E2B3; color: #001928; " >ELC524EM (Europe)</td></tr>
<tr><th></th><th>Country</th><th>Rec</th><th>Carriers</th><th>&nbsp;</th><th>Rec</th><th>Carriers</th></tr>
</thead>
<tbody>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Albania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Eagle, Telekom, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Algeria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Mobilis, Ooredoo</td></tr>
<tr><td style="width: 2px; "></td><td>Anguilla</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Antigua and Barbuda</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Argentina</td><td>❓</td><td>Movistar, Personal</td><td>&nbsp;</td><td>❓</td><td>Personal</td></tr>
<tr><td style="width: 2px; "></td><td>Armenia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Ucom</td></tr>
<tr><td style="width: 2px; "></td><td>Aruba</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Setar</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Australia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Optus, Telstra, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Austria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3 (Drei), A1, T-Mobile</td></tr>
<tr><td style="width: 2px; "></td><td>Azerbaijan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Azercell, Bakcell, NAR Mobile</td></tr>
<tr><td style="width: 2px; "></td><td>Bahamas</td><td>❓</td><td>Aliv</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Bahrain</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Zain</td></tr>
<tr><td style="width: 2px; "></td><td>Bangladesh</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Bangalink, GrameenPhone</td></tr>
<tr><td style="width: 2px; "></td><td>Barbados</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Belarus</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>A1</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Belgium</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Base, Orange, Proximus</td></tr>
<tr><td style="width: 2px; "></td><td>Belize</td><td>❓</td><td>Smart</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Bolivia</td><td>❓</td><td>Viva</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Botswana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>BeMobile</td></tr>
<tr><td style="width: 2px; "></td><td>Brazil</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>Claro, TIM, Vivo</td></tr>
<tr><td style="width: 2px; "></td><td>Brunei</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>DST</td></tr>
<tr><td style="width: 2px; "></td><td>Burkina Faso</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Orange</td></tr>
<tr><td style="width: 2px; "></td><td>Cabo Verde</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>CVMóvel</td></tr>
<tr><td style="width: 2px; background-color: #AFE4EE; "></td><td>Canada</td><td>✅</td><td>Bell Mobility, Rogers Wireless, Telus, Videotron</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Chad</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Chile</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Claro, Entel, Movistar</td></tr>
<tr><td style="width: 2px; "></td><td>Colombia</td><td>❓</td><td>Movistar, Tigo</td><td>&nbsp;</td><td>❓</td><td>Tigo</td></tr>
<tr><td style="width: 2px; "></td><td>Congo (Brazzaville)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Congo (Kinshasa)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Costa Rica</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Movistar</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Croatia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Hrvatski Telekom, Tele2</td></tr>
<tr><td style="width: 2px; "></td><td>Cyprus</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>MTN, PrimeTel</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Czechia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>O2, T-Mobile, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Denmark</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3 (Tre), TDC, Telenor, Telia</td></tr>
<tr><td style="width: 2px; "></td><td>Dominica</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Dominican Republic</td><td>❓</td><td>Altice Dominicana, Claro</td><td>&nbsp;</td><td>❓</td><td>Altice Dominicana</td></tr>
<tr><td style="width: 2px; "></td><td>Ecuador</td><td>❓</td><td>Claro, Movistar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Egypt</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Etisalat, Orange</td></tr>
<tr><td style="width: 2px; "></td><td>El Salvador</td><td>❓</td><td>Telefonica</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Estonia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Elisa, Tele2, Telia</td></tr>
<tr><td style="width: 2px; "></td><td>eSwatini</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>MTN</td></tr>
<tr><td style="width: 2px; "></td><td>Ethiopia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Ethio Telecom</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Finland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>DNA, Elisa, Telia</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>France</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Bouygues, Free Mobile, Orange, SFR</td></tr>
<tr><td style="width: 2px; "></td><td>Gabon</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Georgia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Beeline, Geocell</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Germany</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>O2, Telekom, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Ghana</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>MTN, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Gibraltar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Gibtel</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Greece</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Cosmote, Vodafone, Wind</td></tr>
<tr><td style="width: 2px; "></td><td>Guadeloupe</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Orange</td></tr>
<tr><td style="width: 2px; "></td><td>Guatemala</td><td>❓</td><td>Claro, Movistar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Guinea</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>MTN</td></tr>
<tr><td style="width: 2px; "></td><td>Guinea-Bissau</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>MTN</td></tr>
<tr><td style="width: 2px; "></td><td>Honduras</td><td>❓</td><td>Claro, Tigo</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Hong Kong</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>CMHK, CSL, SmarTone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Hungary</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Magyar Telekom, Telenor, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Iceland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Nova, Siminn, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>India</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>Jio</td></tr>
<tr><td style="width: 2px; "></td><td>Indonesia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Indosat, Telkomsel, XL Axiata</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Ireland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3 (Tre), Meteor, O2, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Israel</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Hot Mobile, Orange, Pelephone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Italy</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>TIM, Vodafone, Wind</td></tr>
<tr><td style="width: 2px; "></td><td>Jamaica</td><td>❓</td><td>Digicel, Flow</td><td>&nbsp;</td><td>❓</td><td>Digicel, Flow</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Jersey</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Jersey Telecom</td></tr>
<tr><td style="width: 2px; "></td><td>Jordan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Zain</td></tr>
<tr><td style="width: 2px; "></td><td>Kazakhstan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Beeline, K-Cell</td></tr>
<tr><td style="width: 2px; "></td><td>Kenya</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Kuwait</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Viva, Zain</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Latvia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Bite, LMT, Tele2</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Liechtenstein</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Mobilkom, Orange</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Lithuania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Bite, Omnitel, Tele2</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Luxembourg</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Orange, POST, Tango</td></tr>
<tr><td style="width: 2px; "></td><td>Macao</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>CTM</td></tr>
<tr><td style="width: 2px; "></td><td>Madagascar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Malawi</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Malaysia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Celcom, DiGi, Maxis</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Malta</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Go Mobile, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #AFE4EE; "></td><td>Mexico</td><td>✅</td><td>AT&T, Telcel</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Moldova</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Orange</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Montenegro</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Mtel, T-Mobile, Telenor</td></tr>
<tr><td style="width: 2px; "></td><td>Morocco</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Inwi, Medi Telecom</td></tr>
<tr><td style="width: 2px; "></td><td>Mozambique</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Vodacom</td></tr>
<tr><td style="width: 2px; "></td><td>Namibia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Telecom Namibia</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Netherlands</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>KPN, T-Mobile, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>New Zealand</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>2degrees, Spark, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Nigeria</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>9mobile, Airtel, Glo, MTN</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>North Macedonia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Vip operator</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Norway</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>TDC, Telenor, Telia</td></tr>
<tr><td style="width: 2px; "></td><td>Pakistan</td><td>❓</td><td>Telenor</td><td>&nbsp;</td><td>❓</td><td>Telenor, Warid</td></tr>
<tr><td style="width: 2px; "></td><td>Panama</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Movistar</td></tr>
<tr><td style="width: 2px; "></td><td>Paraguay</td><td>❓</td><td>Personal, Vox</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Peru</td><td>❓</td><td>Claro, Entel, Movistar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Philippines</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Globe, Smart</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Poland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Orange, Play, Plus, T-Mobile</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Portugal</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>NOS, TMN, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Qatar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Ooredoo, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Romania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Orange, Telekom Romania, Vodafone</td></tr>
<tr><td style="width: 2px; "></td><td>Russia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>Beeline, MTS, Megafon, Tele2</td></tr>
<tr><td style="width: 2px; "></td><td>Saint Kitts and Nevis</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Flow</td></tr>
<tr><td style="width: 2px; "></td><td>Saint Vincent and the Grenadines</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>❓</td><td>Flow</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Serbia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Telenor, VIP</td></tr>
<tr><td style="width: 2px; "></td><td>Seychelles</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Singapore</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓<sup>1</sup></td><td>SingTel, StarHub</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Slovakia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>O2, Orange, Telekom</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Slovenia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>A1, Mobitel</td></tr>
<tr><td style="width: 2px; "></td><td>South Africa</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Cell C, MTN, Vodacom</td></tr>
<tr><td style="width: 2px; "></td><td>South Korea</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>KT, LG U+, SK Telecom</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Spain</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Orange, Telefonica, Vodafone, Yoigo</td></tr>
<tr><td style="width: 2px; "></td><td>Sri Lanka</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Dialog, Mobitel</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Sweden</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3 (Tre), Tele2, Telenor, Telia</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>Switzerland</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>Salt, Sunrise, Swisscom</td></tr>
<tr><td style="width: 2px; "></td><td>Taiwan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Chunghwa, FarEasTone, T Star, Taiwan Mobile</td></tr>
<tr><td style="width: 2px; "></td><td>Tajikistan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Tcell</td></tr>
<tr><td style="width: 2px; "></td><td>Tanzania</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
<tr><td style="width: 2px; "></td><td>Thailand</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>AIS, DTAC, True Move</td></tr>
<tr><td style="width: 2px; "></td><td>Trinidad and Tobago</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>TSTT</td></tr>
<tr><td style="width: 2px; "></td><td>Tunisia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Orange Tunisie, Tunisie Telecom</td></tr>
<tr><td style="width: 2px; "></td><td>Uganda</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Africell, MTN</td></tr>
<tr><td style="width: 2px; "></td><td>Ukraine</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Kyivstar, Life, MTS</td></tr>
<tr><td style="width: 2px; background-color: #89E2B3; "></td><td>United Kingdom</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>✅</td><td>3, EE, Manx, O2, Vodafone</td></tr>
<tr><td style="width: 2px; background-color: #AFE4EE; "></td><td>United States</td><td>✅</td><td>AT&T, Alaska Wireless, T-Mobile (USA), Verizon</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Uruguay</td><td>❓</td><td>Antel, Claro, Movistar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Uzbekistan</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Beeline</td></tr>
<tr><td style="width: 2px; "></td><td>Venezuela</td><td>❓</td><td>Movistar</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Vietnam</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Viettel</td></tr>
<tr><td style="width: 2px; "></td><td>Virgin Islands (British)</td><td>❓</td><td>Flow</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Virgin Islands (U.S.)</td><td>❓</td><td>T-Mobile (USA)</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
<tr><td style="width: 2px; "></td><td>Zambia</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>❓</td><td>Airtel</td></tr>
</tbody>
</table>
<table><tbody><tr><td style="text-align: center;">✅</td><td>Recommended and supported</td></tr><tr><td style="text-align: center;">❓</td><td>Not officially supported, but is likely to work</td></tr><tr><td style="text-align: center;"><sup>1</sup></td><td>Permanent roaming restrictions may apply</td></tr></tbody></table>


{{!-- END do not edit content above, it is automatically generated --}}



## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 128e6580-8ddd-45bc-882f-71785ae12855 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | Americas | EG800Q-NA | &check; | In development | |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | Americas | EG800Q-NA | &check; | In development | |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | EMEAA | EG800Q-EU | &check; | In development | |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | EMEAA | EG800Q-EU | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated --}}


## Revision history

| Revision | Date       | Author | Comments |
|:---------|:-----------|:-------|:---------|
| pre      | 2025-03-25 | RK     | Preliminary version |
