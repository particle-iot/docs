---
title: Boron BRN404X datasheet
columns: two
layout: commonTwo.hbs
description: Datasheet for the Particle Boron BRN404X, Gen 3 cellular development kit
---

# Boron BRN404X datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/brn404x-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

<div align=center><img src="/assets/images/boron/boron-top.png" ></div>

## Functional description

### Overview

The Boron is a powerful LTE Cat M1 enabled development kit that supports cellular networks and Bluetooth LE (BLE). It is based on the Nordic nRF52840 and has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

The Boron is great for connecting existing projects to the Particle Device Cloud where Wi-Fi is missing or unreliable.

### Features

#### Features - BRN404X (Boron LTE)

 * u-blox SARA-R510S-01B LTE modem
 * LTE Cat M1 module
 * Support for United States, Canada, and Mexico only
 * 3GPP Release 14 LTE Cat M1 
 * Cat M1 bands: 1, 2, 3, 4, 5, 8, 12, 13, 18, 19, 20, 25, 26, 28, 66, 71, 85<sup>1</sup>
 * Embedded Particle EtherSIM
 * Requires Device OS 4.0.0 LTS (or later)

<sup>1</sup> Not all bands enabled in software by default

#### Features - All Models

 * Nordic Semiconductor nRF52840 SoC 
  * ARM Cortex-M4F 32-bit processor @ 64MHz 
  * 1MB flash, 256KB RAM 
  * Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps 
  * Supports DSP instructions, HW accelerated Floating Point Unit (FPU) and encryption functions
  * Up to +8 dBm TX power (down to -20 dBm in 4 dB steps) 
  * NFC-A tag
 * On-board additional 4MB SPI flash
 * 20 mixed signal GPIO (6 x Analog, 8 x PWM), UART, I2C, SPI
 * Micro USB 2.0 full speed (12 Mbps)
 * Integrated Li-Po charging and battery connector
 * JTAG (SWD) Connector
 * RGB status LED
 * Reset and Mode buttons
 * Dual SIM support: Nano 4FF and MFF2
 * On-board PCB antenna
 * U.FL connector for external antenna
 * Meets the Adafruit Feather [specification](https://learn.adafruit.com/adafruit-feather/feather-specification) in dimensions and pinout
 * FCC and PTCRB certified
 * RoHS compliant (lead-free)

## Interfaces

### Block diagram
 
{{imageOverlay src="/assets/images/boron/brn404x-block-diagram.png" alt="Block Diagram" class="full-width"}}

### Power

#### USB PORT
The USB port is the easiest way to power up the Boron. Please make sure that the USB port is able to provide at least 500mA. Power from the USB is regulated down to 3.3V by the on board Torex XC9258A step-down regulator. 

#### VUSB PIN
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.

#### LiPo
If you want to make your projects truly wireless, you can power the device with a single cell LiPo (3.7V). The Boron has an on board LiPo charger that will charge and power the device when USB source is plugged in, or power the device from the LiPo alone in the absence of the USB.

{{box op="start" cssClass="boxed warningBox"}}
**NOTE:**
Please pay attention to the polarity of the LiPo connector. Not all LiPo batteries follow the same polarity convention!
{{box op="end"}}

<div align=center><img src="/assets/images/lipo-polarity.png" ></div>

#### Li+ PIN
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Boron. Remember that the input voltage range on this pin is 3.6 to 4.2 VDC. 

#### 3V3 PIN
This pin is the output of the on board 3.3V step-down switching regulator (Torex XC9258A). The regulator is rated at 1000mA max. When using this pin to power other devices or peripherals remember to budget in the current requirement of the Boron first. Unlike the Photon, this pin _CANNOT_ be used to power the Boron.

#### EN PIN

The **EN** pin is not a power pin, per se, but it controls the 3V3 and cellular modem power via a load switch (XC8107, U2). The EN pin is pulled high by a 100K resistor to PMIC_SYS (3.8V), which is powered by VUSB, the micro USB connector, or the LiPo battery. Because the pull-up can result in voltages above 3.3V you should never directly connect EN to a 3.3V GPIO pin. Instead, you should only pull EN low, such as by using an N-channel MOSFET or other open-collector transistor.

The EN pin can force the device into a deep power-down state where it uses very little power. It also can used to assure that the device is completely reset, similar to unplugging it, with one caveat:

If using the EN pin to deeply reset the device, you must be careful not to allow leakage current back into the nRF52 MCU by GPIO or by pull-ups to 3V3. If you only power external devices by 3V3 you won't run into this, as 3V3 is de-powered when EN is low. 

However, if you have circuitry that is powered by a separate, external power supply, you must be careful. An externally powered circuit that drives a nRF52 GPIO high when EN is low can provide enough current to keep the nRF52 from powering down and resetting. Likewise, a pull-up to an external power supply can do the same thing. Be sure that in no circumstances can power by supplied to the nRF52 when 3V3 is de-powered.

[See the power supply schematic](#power-1), below, for more information.

---

### Antenna

There are two radios on the Boron. A BLE radio (nRF52840) and a cellular radio (u-blox). For the cellular radio, we have provided a u.FL connector to plug in the cellular antenna. This is required if you wish to use the cellular connectivity.

There are two options for the BLE antenna on the Boron. It comes with an on-board PCB antenna which is selected by default in the device OS and a u.FL connector if you wish to connect an external antenna. If you wish to use the external antenna, you'll need to issue an appropriate command in the firmware.

### FCC approved antennas

#### Certified Cellular Antenna

{{!-- BEGIN shared-blurb 4118f060-06af-4943-b51a-a2961f9d1e88 --}}
| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE-CAT M1 cell antenna, [x1] | PARANTC41EA | B404X, BRN404X, and E404X | [Datasheet](/assets/datasheets/PARANTC41.pdf) |
| Wide band LTE-CAT M1 cell antenna, [x50] | PARANTC41TY | B404X, BRN404X, and E404X | [Datasheet](/assets/datasheets/PARANTC41.pdf) |

General antenna parameters:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Antenna Type | Dipole | |
| Radiation Properties | Omnidirectional | |
| Maximum Input Power | 5 | watts |
| Polarization | Linear | |
| Impedance | 50 | ohms |

Antenna parameters in frequency ranges:

| Parameter | 698 MHz - 894 MHz | 1700 MHz - 2690 MHz | Unit |
| :--- | :---: | :---: | :--- |
| Peak Gain | 2.46 | 3.86 | dBi |
| Efficiency | 65.46 | 54.95 | % |
| Average Gain | 1 | 0.98 | |

Antenna parameters in specific frequency bands:

| Parameter | 698 MHz | 894 MHz | 1700 MHz | 2170 MHz | 2690 MHz | Unit |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| Max VSWR | 1.6 | 1.8 | 1.7 | 2.8 | 2.5 | |
| Max Return Loss | -12 | -10 | -11 | -6 | -7 | dB |

Mechanical:

| Parameter | Value | Unit |
| :--- | :--- | :--- |
| Dimensions | 122.1 x 12.8 x 0.2 | mm |
| Material | Flexible polymer | |
| Connector and cable | U.FL and 1.13mm mini coax | |
| Cable length | 183 | mm |

Environmental:

| Parameter | Value |
| :--- | :---: |
| Operating temperature | -40°C to 85°C |
| Storage temperature | -40°C to 85°C |
| ROHS Compliant | &check; |
{{!-- END shared-blurb --}}


#### Certified BLE Antenna 

The Boron 404X contains an onboard chip antenna for Bluetooth LE (BLE). You can optionally use an external 2.4 GHz BLE antenna.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Built-in chip antenna | | [Datasheet](/assets/datasheets/AT5020-E3R0HBAN.pdf)  |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |

|Frequency     |Antenna Type|Manufacturer|MFG. Part # | Gain      |
|:-------------|:-----------|:-----------|:-----------|:----------|
| 2400-2500 MHz | Chip Antenna | ACX | AT5020-E3R0HBA | 0dBi peak |
| 2400-2500 MHz|PCB Antenna |Particle    | ANT-FLXV2  |2.0dBi peak|


It is also possible to use most antennas designed for Wi-Fi (2.4 GHz) as a BLE antenna. In some cases, a u.FL to RP-SMA adapter will be required. If you are building a product using alternative antennas, additional certification may be required. 

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


#### Certified NFC Antenna

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

The Boron has a dedicated 10 pin debug connector that exposes the SWD interface of the nRF52840. This interface can be used to debug your code or reprogram your Boron bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align=center><img src="/assets/images/boron/swd-connector-pinout.png" ></div>

## Memory map

### nRF52840 Flash Layout Overview

 - Bootloader (48KB, @0xF4000)
 - User Application
   - 256KB @ 0xB4000 (Device OS 3.1 and later)
   - 128KB @ 0xD4000 (Device OS 3.0 and earlier)
 - System (656KB, @0x30000)
 - SoftDevice (192KB)

### External SPI Flash Layout Overview (DFU offset: 0x80000000)

 - OTA (1500KB, @0x00289000)
 - Reserved (420KB, @0x00220000)
 - FAC (128KB, @0x00200000)
 - LittleFS (2M, @0x00000000)

## Pins and button definitions

### Pin markings

<div align=center><img src="/assets/images/boron/boron-pin-markings.png" ></div>

<div align=center><img src="/assets/images/boron/boron-bottom-pin-markings.png" ></div>

### Pinout diagram

{{imageOverlay src="/assets/images/boron/boron-pinout.png" alt="Pinout" class="full-width"}}

You can download a high resolution <a href="/assets/images/boron/boron-pinout-v1.0.pdf" target="_blank"><strong>PDF version of the pin out here.</strong></a></div><br>


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

{{!-- BEGIN do not edit content below, it is automatically generated ac335968-6a40-4e3a-9493-46510917cf20 --}}

| Pin Name |   |   |   |   | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 / D19 | ADC0 | &nbsp; | &nbsp; | &nbsp; | P0.03 |
| A1 / D18 | ADC1 | &nbsp; | &nbsp; | &nbsp; | P0.04 |
| A2 / D17 | ADC2 | &nbsp; | &nbsp; | &nbsp; | P0.28 |
| A3 / D16 | ADC3 | &nbsp; | &nbsp; | &nbsp; | P0.29 |
| A4 / D15 | ADC4 | &nbsp; | &nbsp; | &nbsp; | P0.30 |
| A5 / D14 | ADC5 | &nbsp; | SPI (SS) | &nbsp; | P0.31 |
| D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | P0.26 |
| D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | P0.27 |
| D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 RTS | P1.01 |
| D3 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 CTS | P1.02 |
| D4 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | P1.08 |
| D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P1.10 |
| D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P1.11 |
| D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P1.12 |
| D8 / WKP | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P1.03 |
| MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | P1.14 |
| MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | P1.13 |
| RX / D10 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | P0.08 |
| SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | P1.15 |
| TX / D09 | &nbsp; | &nbsp; | &nbsp; | Serial1 TX | P0.06 |


{{!-- END do not edit content above, it is automatically generated  --}}

### ADC (Analog to Digital Converter)

The Boron supports 6 ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated bf872784-b042-45b5-980a-ff7abdec8a1b --}}

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

The Boron supports one UART serial interface. 

{{!-- BEGIN do not edit content below, it is automatically generated 6169d4a3-4938-4c53-9830-849f29c0ffe7 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| RX / D10 | Serial RX, GPIO | Serial1 RX | P0.08 |
| TX / D09 | Serial TX, GPIO | Serial1 TX | P0.06 |
| D2 | SPI1 SCK, Serial1 RTS, GPIO, PWM | Serial1 RTS | P1.01 |
| D3 | SPI1 MOSI, Serial1 CTS, PWM, GPIO | Serial1 CTS | P1.02 |


{{!-- END do not edit content above, it is automatically generated  --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- You cannot use hardware flow control and Ethernet at the same time.


### SPI

The Boron supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated 5578133c-be91-431a-bec6-c903d70e87dd --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A5 / D14 | A5 Analog in, GPIO, PWM, SPI SS | SPI (SS) | P0.31 |
| SCK / D13 | SPI SCK, GPIO | SPI (SCK) | P1.15 |
| MOSI / D12 | SPI MOSI, GPIO | SPI (MOSI) | P1.13 |
| MISO / D11 | SPI MISO, GPIO | SPI (MISO) | P1.14 |
| D2 | SPI1 SCK, Serial1 RTS, GPIO, PWM | SPI1 (SCK) | P1.01 |
| D3 | SPI1 MOSI, Serial1 CTS, PWM, GPIO | SPI1 (MOSI) | P1.02 |
| D4 | SPI1 MISO, PWM, GPIO | SPI1 (MISO) | P1.08 |


{{!-- END do not edit content above, it is automatically generated --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- You cannot use `SPI1` and Ethernet at the same time.


### I2C

The Boron supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated b959c6b0-5b22-4e0d-9bbc-ce9989d7e16c --}}

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

The Boron supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 2ee22e01-a29b-46db-9e33-cd9f93223537 --}}

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

### LED status

#### System RGB LED
For a detailed explanation of different color codes of the RGB system LED, please take a look [here.](/troubleshooting/led/)

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

### Power consumption (Boron LTE)

Values are from BRN404/BRN402. Actual operating current with cellular using the R510 modem may vary but should be similar.

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Peak Current | I<sub>Li+ pk</sub> | 120 |  | 490 | mA |
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 3.89 | 3.90 | 3.92 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | | 5.78 | 16.9 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 14.7 | 58.9 | 178 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 14.6 | 53.4 | 207 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | | 17.9 | 108 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | | 63.9 | 184 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 565 | 575 | 590 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 565 | 577 | 593 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 568 | 584 | 602 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | 91.6 | 885 | 2210 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 486 | 866 | 1440 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 569 | 587 | 612 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | | 12.2 | 104 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | | 127 | 137 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> | | 130 | 141 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> |  | 128 | 138 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> | | 442 | 2120 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> |  | 438 | 1050 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 568 | 584 | 601 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> |  | 14.2 | 112 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 98.7 | 106 | 118 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | 99.4 | 106 | 120 | uA |
| Power disabled (EN pin = LOW) | I<sub>disable</sub> |  | 70 | 75 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

---

### Radio specifications

Boron has two radio modules, the nRF52 MCU BLE radio, and a cellular module, depending on the model.

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

#### Nordic Semiconductor nRF52840 for NFC Tag

{{!-- BEGIN shared-blurb b8bb013e-9b2f-443b-874e-842e94850e62 --}}
| Feature | Description|
| :-------|:---------- |
| Feature | NFC Tag-A |
| Frequency | 13.56 MHz |
{{!-- END shared-blurb --}}


#### u-blox SARA-R510S-01B

{{!-- BEGIN shared-blurb 2f821871-252e-4acd-8002-11854b95faa6 --}}
| Parameter | Value | FCC Certified | 
| --- | --- | :---: | 
| Protocol stack | 3GPP Release 14 | |
| RAT | LTE Cat M1 Half-Duplex | |
| LTE FDD Bands | Band 71 (600 MHz) | &nbsp; |
| | Band 12 (700 MHz) | &check; |
| | Band 28 (700 MHz)  | &check; |
| | Band 85 (700 MHz)  | &nbsp; |
| | Band 13 (750 MHz)  | &check; |
| | Band 20 (800 MHz)  | &check; |
| | Band 5 (850 MHz) | &check; |
| | Band 18 (850 MHz) | &nbsp; |
| | Band 19 (850 MHz) | &nbsp; |
| | Band 26 (850 MHz)  | &nbsp; |
| | Band 8 (900 MHz)  | &check; |
| | Band 4 (1700 MHz) | &check; |
| | Band 3 (1800 MHz)  | &check; |
| | Band 2 (1900 MHz) | &check; |
| | Band 25 (1900 MHz)  | &nbsp; |
| | Band 1 (2100 MHz)  | &nbsp; |
| Power class | Class 3 (23 dBm) | &nbsp; |

- LTE Cat M1 for United States, Canada, and Mexico.
- Not all bands are enabled in software by default. 
- FCC Certification in the United States only tests bands in use in the United States.
- Particle LTE Cat M1 devices are not certified for use in Europe or other countries that follow EU certification requirements.
{{!-- END shared-blurb --}}


### I/O Characteristics 

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

### Dimensions and Weight

<div align=center><img src="/assets/images/boron/boron-dimensions.png" ></div>
 
 * Weight = 10 grams

### Mating connectors

The Boron uses two single row 0.1" pitch male header pins. One of them is 16 pin while the other is 12 pin. It can be mounted with matching 0.1" pitch female headers with a typical height of 0.335" (8.5mm). When you search for parts like these it can be difficult to navigate the thousands of parts available online so here are a few good choices for the Boron:

| Description | MFG | MFG Part Number |
|:----------- |:----|:----------------|
|16-pin 0.1" (2.54mm) Female Header|Sullins|PPTC161LFBN-RC|
|16-pin 0.1" (2.54mm) Female Header|TE|6-535541-4|
|12-pin 0.1" (2.54mm) Female Header|Sullins|PPTC121LFBN-RC|
|12-pin 0.1" (2.54mm) Female Header|TE|6-534237-0|


## Recommended PCB land pattern

The Boron can be directly soldered onto the PCB or be mounted with the above mentioned female headers.

<div align=center><img src="/assets/images/boron/boron-landing-pattern.png" ></div>


## Schematic

The complete schematic and board files are open source and available on Particle's GitHub repository [here.](https://github.com/particle-iot/boron)

### Power
 
{{imageOverlay src="/assets/images/boron/schematic-power.png" large="/assets/images/boron/schematic-power-large.png" alt="Power Schematic" class="full-width"}}
 
### nRF52840

{{imageOverlay src="/assets/images/boron/schematic-nrf52840.png" large="/assets/images/boron/schematic-nrf52840-large.png" alt="nRF52 Schematic" class="full-width"}} 

### u-blox

{{imageOverlay src="/assets/images/boron/schematic-ublox.png" large="/assets/images/boron/schematic-ublox-large.png" alt="u-blox Schematic" class="full-width"}}

### SIM

{{imageOverlay src="/assets/images/boron/schematic-sim.png" large="/assets/images/boron/schematic-sim-large.png" alt="SIM Schematic" }}

### SPI Flash

{{imageOverlay src="/assets/images/boron/schematic-spi-flash.png" large="/assets/images/boron/schematic-spi-flash.png" alt="SPI Flash" }}

### Fuel Gauge

{{imageOverlay src="/assets/images/boron/schematic-fuelgauge.png" large="/assets/images/boron/schematic-fuelgauge.png" alt="Fuel Gauge" }}

### Interfaces

{{imageOverlay src="/assets/images/boron/schematic-interfaces.png" large="/assets/images/boron/schematic-interfaces.png" alt="Interfaces" }}

<!---
## Bill of materials
-->

## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated e2c1aabb-d8d1-4bf4-90e1-6fe0978663e8 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | BRN404X | M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | BRN404X | M1 | AT&T |
| United States | BRN404X | M1 | AT&T |


{{!-- END do not edit content above, it is automatically generated --}}


## Ordering information

Borons are available from [store.particle.io](https://store.particle.io/).

{{!-- BEGIN do not edit content below, it is automatically generated a7f02cc7-9035-489e-a7dc-15d4e915866f --}}

| SKU | Description | Region  | Modem | EtherSIM| Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R510 | &check; | GA | |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R510 | &check; | GA | |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R510 | &check; | GA | |


{{!-- END do not edit content above, it is automatically generated --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

**BORON LTE (Cat M1) **

-   Model Number: BRN404X
-   RoHS
-   CE
-   PTCRB
-   FCC ID: 2AEMI-BRN404X
-   IC: 20127-BRN404X

## Product Handling

### ESD Precautions

The Boron contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling Boron without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates Boron. ESD precautions should be implemented on the application board where the Boron is mounted. Failure to observe these precautions can result in severe damage to the Boron!

### Connectors

There are four connectors on the Boron that will get damaged with improper usage. The JST connector on the circuit board, where you plug in the LiPo battery, is very durable but the connector on the battery itself is not. When unplugging the battery, take extra precaution to **NOT** pull the connector using the wires, but instead hold the plug at its base to avoid putting stress on the wires. This can be tricky with bare hands - nose pliers are your friend here.

<div align=center><img src="/assets/images/lipo-connection.png" ></div>

The micro B USB connector on the Boron is soldered on the PCB with large surface pads as well as couple of through hole anchor points. Despite this reinforcement, it is very easy to rip out the connector if too much stress is put on in the vertical direction.

<div align=center><img src="/assets/images/proper-usb-connection.png" ></div>

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The 10 pin SWD connector provides an easy in-system debugging access to the device. The pins on the connector can easily be damaged if the mating connector cable is inserted improperly. If you are trying to debug the device, you probably are not in a good mood to begin with. The last thing you want is to render the connector useless. Be nice, and be gentle on the connector. Good luck with the debugging!

### Breadboarding

The breadboard provided with the Boron is specifically designed to require low insertion force. This makes it easy to plug the Boron in and out of the breadboard. If you end up using a different breadboard, remember that it may require more force. In this case, always remember to pinch-hold your precious Boron by the sides (along the header pins) when plugging-unplugging and not by the USB connector (don't be this person).

## Default settings

The Boron comes preprogrammed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.

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

* Contains FCC ID: 2AEMI-BRN404X

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

 * Contains transmitter module IC: 20127-BRN404X
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 010      | 2022-09-06 | RK | Split out from rest of the Boron line |
| 011      | 2022-09-07 | RK | Add additional port and pin information |
| 012      | 2022-09-16 | RK | Add minimum Device OS version, is 4.0.0 |
| 013      | 2022-12-13 | RK | Update block diagram and antenna information |

## Known Errata

## Contact

**Web**

[https://www.particle.io](https://www.particle.io)

**Community Forums**

[https://community.particle.io](https://community.particle.io)

**Email**

[https://support.particle.io](https://support.particle.io)
