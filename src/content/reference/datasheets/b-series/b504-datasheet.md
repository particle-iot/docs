---
title: B-Series B504e datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle B-Series B504e SoM, Gen 3 cellular LTE Cat 1 Americas
---

# B504e Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/b504-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

<div align=center><img src="/assets/images/b-series/b504e-top.png" ></div>

## Functional description

### Overview

The B-Series System-on-a-Module (SoM) is a cellular device with support for BLE (Bluetooth LE). It is based on the Nordic nRF52840 microcontroller.

The B-Series is designed to be integrated into your circuit board design, plugging into a M.2 NGFF connector on your board, allowing the module to be changed or upgraded easily.

### Features

 * Quectel EG91-NAX cellular modem
  * LTE Cat 1 module with 3G fallback with Americas bands
  * Support for United States, Canada, and Mexico only
  * 3GPP E-UTRA Release 13 
  * LTE Cat 1 bands: 2, 4, 5, 12, 13, 25, 26
  * UMTS (3G) bands: 2, 4, 5
  * Embedded Particle EtherSIM
  * GNSS (GPS)
 * Nordic Semiconductor nRF52840 SoC 
  * ARM Cortex-M4F 32-bit processor @ 64MHz 
  * 1MB flash, 256KB RAM 
  * Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps 
  * Supports DSP instructions, HW accelerated Floating Point Unit (FPU) and encryption functions
  * Up to +8 dBm TX power (down to -20 dBm in 4 dB steps) 
  * NFC-A tag
 * On-module additional 4MB SPI flash
 * 24 mixed signal GPIO (8 x Analog, 8 x PWM), UART, I2C, SPI
 * USB 2.0 full speed (12 Mbps)
 * JTAG (SWD) pins
 * Pins for RGB LED used for connection status
 * Pins for reset and mode buttons
 * On-module MFF2 Particle SIM 
 * Three on-module U.FL connectors for external antennas
 * Connects to your base board or eval board that has a Particle M.2 connector
 * FCC (United States) and ISED (Canada) certified
 * RoHS compliant (lead-free)

### Model comparison

{{!-- BEGIN shared-blurb bfc112a3-ce3c-4c3e-a607-e547e240371a --}}
| | B404X | B404 | B402 | B524 | B523 | B504e |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Region | NorAm | NorAm | NorAm | EMEAA | Europe | Americas |
| EtherSIM | &check; | &check; | &nbsp; | &check; | &nbsp; | &check; |
| Supply Secure | &check; | &nbsp; | &nbsp; | &check; | &nbsp; | &check; |
| Lowest power (LTE Cat M1) | &check; | &check; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Fastest speed (LTE Cat 1) | &nbsp; | &nbsp; | &nbsp; | &check; | &check; | &check; |
| Cellular fallback | &nbsp; | &nbsp; | &nbsp; | 3G, 2G | 3G, 2G | 3G | 
| Lifecycle | GA | NRND | Deprecated | GA | Deprecated | In development |

- EtherSIM devices generally have a larger number of carriers and more may be added in the future
- NorAm: North America (United States, Canada, and Mexico)
- Americas: North America, Central, and South America (not all countries supported)
- LTE Cat M1: Low-power cellular intended for IoT devices
- LTE Cat 1: Available in more countries and has higher data rates
- EMEAA: Europe, Middle East, Africa, and Asia (not all countries supported)
- NRND: Not recommended for new designs
- See the [Carrier list](/reference/cellular/cellular-carriers/) for specific carrier and country compatibility
- See the [Supply secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information
- See [Lifestyle stages](/reference/product-lifecycle/product-lifecycle-stages/) for more information

{{!-- END shared-blurb --}}

### B504e vs. B504

The B504e (B504MEA and B504MTY) is the same as the B504 (B504MEA and B504MTY), except it has a programmable
e-sim in place of the MFF2 SMD Particle EtherSIM. The e-sim is not user-programmable, and is programmed at the factory
with the same SIM and carriers as the B504.

No user firmware or Device OS changes are required between the B504 and B504e. This change is generally a permissive certification
change and will not require full recertification of products using it.

### Device OS support

The B504e requires Device OS 5.0 or later. Using the most recent version 5.x or 6.x version is recommended.

The B504e is platform `b5som`, not `bsom` used by the B404X. While source code is compatible across both B-Series SoM 
models, binaries must be compiled separately for each. 

Additionally, products can only contain one platform. Thus if you have both B404X and B504e, they must be in separate
products. You can, however, put the B504e and B524/B523 devices in the same product.

For information on upgrading Device OS, see [Version information](/reference/device-os/versions/). For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).

## Migration information

The B504e is similar to the B524, except for the cellular bands supported. The B504e contains a Quectel EG91-NAX cellular modem and the B524 contains a Quectel EG91-E cellular modem. They are the same physical size and software compatible.

| Migrating from | Information |
| :--- | :--- |
| B404X, B404, B402 | [B504e from B404X/B404/B402 migration guide](/hardware/migration-guides/b404-b504-migration-guide/) |
| B524, B523 | Upgrade Device OS version if necessary |
| Boron | [B-Series from Boron or Argon migration guide](/hardware/migration-guides/b-series-boron-migration-guide/) |
| E-Series | [B-Series from E-Series migration Guide](/hardware/migration-guides/b-series-e-series-migration-guide/) |
| Electron | [B-Series from Electron migration Guide](/hardware/migration-guides/b-series-electron-migration-guide/) |

### B404X, B404, B402 migration

- Recompile source for `b5som` platform.
- Upgrade Device OS to 5.x or later if necessary.
- Verify that power requirements for VCC are met, as the B504e requires more power than the B404X/B404/B402.
- Use the antenna the B504e was certified with, not previous antennas.

### B524, B523 migration

- Upgrade Device OS to 5.x or later if necessary.
- Use the antenna the B504 was certified with, not previous antennas.

## Interfaces

### Block diagram

{{imageOverlay src="/assets/images/b-series/b504-block-diagram.png" alt="Block Diagram" class="full-width"}}

### Power

#### VCC

VCC is used to supply power to the Quectel EG91-NAX cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery. Make sure that the supply can handle currents of at least 2 A.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting. If your board contains a bq24195 PMIC, see [PMIC notes](#pmic-notes), below, for additional information.

Note that the B504e requires 2000 mA on VCC, unlike the B404X which only 600 mA.

#### 3V3

3V3 is used to supply power to nRF52840, logic ICs, memory, etc.. The 3V3 input voltage range is between 3V to 3.6V DC, but 3.3V is recommended. Make sure that the supply can handle a minimum of 150 mA, however we recommend a minimum of 500 mA supplied from your base board to allow for compatibility with future modules. 

These limits do not include any 3.3V peripherals on your base board, so that may increase the current requirements.

{{!-- BEGIN shared-blurb b7c36aca-bdfe-463c-b901-53a3aeec8ab0 --}}
Power supply requirements:
- 3.3V output
- Maximum 5% voltage drop
- 100 mV peak-to-peak ripple maximum
- 500 mA minimum output current at 3.3V recommended for future compatibility
- Maintain these values at no-load as well as maximum load
{{!-- END shared-blurb --}}

We do not recommend using a single 3.6V supply for both VCC and 3V3 as the cellular modem performance may be lower below 3.7V. Use two separate regulators for best results.

#### VBus

VBus is connected to the USB detect pin of nRF52840 to enables the USB interface. The recommended input voltage range is between 4.35V to 5.5V DC.

---

### Antenna

There are four radios on the B504e module:

- BLE radio (part of nRF52840 MCU) 
- NFC tag receiver (part of nRF52840 MCU)
- Cellular radio (Quectel EG91-NAX)
- GNSS (GPS) receiver (part of Quectel EG91-NAX) 

We have provided three u.FL connectors to plug in the cellular, BLE antenna, and GNSS antennas.

![B504e Connectors](/assets/images/b-series/b523-connectors.png)

| Number | Label   | Purpose | 
| :----: | :-----: | :--- |
|  1     | BT      | Bluetooth antenna (optional) |
|  2     | CELL    | Quectel cellular modem antenna |
|  3     | GNSS    | GNSS (GPS) antenna (optional) |

The NFC antenna connection is provided through the M.2 connector.

If you are not using BLE, NFC, or GNSS, you can omit those antennas.

#### Certified cellular antenna

The B504e is certified with the following cellular antenna:

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


#### Certified BLE antenna 

The following antenna is optional and can be omitted if you do not wish to use BLE. It can be purchased in the [Particle online store](https://store.particle.io/products/wi-fi-or-mesh-2-4ghz-antenna).

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle Wi-Fi Antenna 2.4GHz, [x1] | ANT-FLXV2 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/wi-fi-or-mesh-2-4ghz-antenna) |
| Particle Wi-Fi Antenna 2.4GHz, [x50] | ANT-FLXV2-50 | [Datasheet](/assets/datasheets/ANT-FLXV2.pdf) |

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



### Certified GNSS antennas

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

Single quantity B-SoM units and developer kits include a PARANTGN1EA antenna. Tray quantities of the B-SoM do not include antennas. If not using the GNSS feature, the antenna can be omitted from your design.

- GNSS support requires a [firmware library](https://github.com/particle-iot/particle-som-gnss).
- Feature such of high-precision, dead-reckoning, and high updates rates will require an external GNSS chip.


#### General antenna guidance

- The antenna placement needs to follow some basic rules, as any antenna is sensitive to its environment. Mount the antenna at least 10mm from metal components or surfaces, ideally 20mm for best radiation efficiency, and try to maintain a minimum of three directions free from obstructions to be able to operate effectively.
- Needs tuning with actual product enclosure and all components.
- For the BLE antenna, it is recommended to use a 2.4 GHz single-frequency antenna and not a 2.4 GHz + 5 GHz antenna, so as to avoid large gain at the frequency twice of 2.4 GHz which can cause the second harmonic radiation of 2.4 GHz to exceed standards.
 

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 24 (max) | I/O |
| Analog (ADC) | 8 (max) | I |
| UART | 1 | I/O |
| SPI  | 2 | I/O |
| I2C  | 2 | I/O |
| USB  | 1 | I/O |
| PWM  | 8 (max) | O |
| NFC  | 1 | O |

There are some optional B504e module specific I/O:

- Quectel USB and VBUS (for modem firmware upgrades)
- Quectel Ring Indicator (RI) output 

**Note:** All GPIOs are only rated at 3.3VDC max.

### JTAG and SWD 

The B504e module has 4 pads at the bottom exposing the SWD interface of the nRF52840. This interface can be used to debug your code or reprogram your B504e bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

## Memory map

### nRF52840 flash layout overview

 - Bootloader (48KB, @0xF4000)
  - User Application: 256KB @ 0xB4000
 - System (656KB, @0x30000)
 - SoftDevice (192KB)

### External SPI flash layout overview (dfu offset: 0x80000000)

 - OTA (1500KB, @0x00289000)
 - Reserved (420KB, @0x00220000)
 - FAC (128KB, @0x00200000)
 - LittleFS (2M, @0x00000000)


## Pins and button definitions

### Pinout diagram

{{imageOverlay src="/assets/images/b5-som.svg" alt="Pinout"}}

### Common SoM pins

{{!-- BEGIN shared-blurb 0c0a430c-bbf9-4464-a432-348288ccea49 --}}
<span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">RESERVED</span> and <span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">SOM</span> pins may vary across different SoM models. If you are designing for this specific module, or similar modules, you can use the indicated functions even if the pin is marked RESERVED. Most nRF52840-based modules will have the same pin functions on the RESERVED pins.

The nRF52840 B-SoM has some differences from the RTL8722 M-SoM. Future modules with a different MCU may have different pin functions. An effort will be made to assign all of the listed functions for ADC, PWM, SPI, etc. from the set of common SoM pin functions in future modules, but the functions on RESERVED and SOM pins will likely vary.
{{!-- END shared-blurb --}}

### GPIO and port listing

{{!-- BEGIN do not edit content below, it is automatically generated 50c2d429-c8a8-4dd1-9afa-5ceab1fdb714 --}}

| Pin Name | Module Pin |   |   |   |   | PWM | MCU |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| A0 / D19 | 23 | ADC1 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.03 |
| A1 / D18 | 33 | ADC2 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.04 |
| A2 / D17 | 35 | ADC4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.28 |
| A3 / D16 | 37 | ADC5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.29 |
| A4 / D15 | 41 | ADC6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.30 |
| A5 / D14 | 43 | ADC7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.31 |
| A6 | 45 | ADC3 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.05 |
| A7 | 47 | ADC0 | &nbsp; | &nbsp; | &nbsp; | &check; | P0.02 |
| CELL USBD- | 46 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL USBD+ | 44 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL VBUS | 74 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D0 | 22 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | P0.26 |
| D1 | 20 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | P0.27 |
| D2 | 42 | &nbsp; | Wire1 (SDA) | SPI1 (SCK) | Serial1 RTS | &nbsp; | P1.02 |
| D3 | 40 | &nbsp; | Wire1 (SCL) | SPI1 (MOSI) | Serial1 CTS | &nbsp; | P1.01 |
| D4 | 66 | &nbsp; | &nbsp; | SPI1 (MISO) | &nbsp; | &check; | P1.08 |
| D5 | 68 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.10 |
| D6 | 70 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.11 |
| D7 | 72 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | P1.12 |
| D8 | 48 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | &nbsp; | P1.03 |
| D22 | 62 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.24 |
| D23 | 64 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P1.09 |
| MISO / D11 | 50 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &nbsp; | P1.14 |
| MOSI / D12 | 52 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &nbsp; | P1.13 |
| NC | 14 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| NC | 75 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| NFC1 | 17 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.09 |
| NFC2 | 19 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.10 |
| RGBB | 65 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.15 |
| RGBG | 63 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.14 |
| RGBR | 61 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | P0.13 |
| RX / D10 | 38 | &nbsp; | &nbsp; | &nbsp; | Serial1 RX | &nbsp; | P0.08 |
| SCK / D13 | 54 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | P1.15 |
| SIM_CLK | 71 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_DATA | 73 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_RST | 69 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_VCC | 67 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| TX / D9 | 36 | &nbsp; | &nbsp; | &nbsp; | Serial1 TX | &nbsp; | P0.06 |
| USBDATA- | 13 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| USBDATA+ | 11 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| VUSB | 16 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}

### ADC (analog to digital converter)

The B504e supports 8 ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated 4f2addb7-dc0c-4a01-915a-e47b4cbea4f5 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | ADC1 | P0.03 |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | ADC2 | P0.04 |
| 35 | A2 / D17 | A2 Analog in, GPIO | ADC4 | P0.28 |
| 37 | A3 / D16 | A3 Analog in, GPIO | ADC5 | P0.29 |
| 41 | A4 / D15 | A4 Analog in, GPIO | ADC6 | P0.30 |
| 43 | A5 / D14 | A5 Analog in, GPIO | ADC7 | P0.31 |
| 45 | A6 | A6 Analog in, PWM, GPIO | ADC3 | P0.05 |
| 47 | A7 | A7 Analog in, GPIO, Ethernet Reset | ADC0 | P0.02 |


{{!-- END do not edit content above, it is automatically generated  --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits

### UART serial

The B504e supports one UART serial interfaces. 

{{!-- BEGIN do not edit content below, it is automatically generated f054fe69-870e-43d3-bd07-4d3168908a2b --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, GPIO | Serial1 TX | P0.06 |
| 38 | RX / D10 | Serial RX, GPIO | Serial1 RX | P0.08 |
| 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Serial1 CTS | P1.01 |
| 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Serial1 RTS | P1.02 |


{{!-- END do not edit content above, it is automatically generated  --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- You cannot use hardware flow control and Ethernet at the same time.


### SPI

The B504e supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated 7fe583f7-da0e-4353-aba3-57085789528f --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | SPI1 (MOSI) | P1.01 |
| 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | SPI1 (SCK) | P1.02 |
| 48 | D8 | GPIO, SPI SS, Ethernet CS | SPI (SS) | P1.03 |
| 50 | MISO / D11 | SPI MISO, GPIO | SPI (MISO) | P1.14 |
| 52 | MOSI / D12 | SPI MOSI, GPIO | SPI (MOSI) | P1.13 |
| 54 | SCK / D13 | SPI SCK, GPIO | SPI (SCK) | P1.15 |
| 66 | D4 | SPI1 MISO, PWM, GPIO | SPI1 (MISO) | P1.08 |


{{!-- END do not edit content above, it is automatically generated --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- You cannot use `SPI1` and Ethernet at the same time.


### I2C

The B504e supports two I2C (two-wire serial interface) ports.

{{!-- BEGIN do not edit content below, it is automatically generated 5736a439-4588-407f-a2bd-3a9f32920646 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 20 | D1 | I2C SCL, GPIO | Wire (SCL) | P0.27 |
| 22 | D0 | I2C SDA, GPIO | Wire (SDA) | P0.26 |
| 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | Wire1 (SCL) | P1.01 |
| 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | Wire1 (SDA) | P1.02 |


{{!-- END do not edit content above, it is automatically generated --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are recommended for I2C as the internal pull-up is 13K.
- If not using I2C, pins D0 and D1 can be used as GPIO or analog input.
- You cannot use `Wire1` and Ethernet at the same time.

### PWM

The B504e supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated 32c36a5a-08d1-4cd0-bb65-a9d05e085a3d --}}

| Pin | Pin Name | Description | Timer | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | PWM2 | P0.03 |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | PWM2 | P0.04 |
| 45 | A6 | A6 Analog in, PWM, GPIO | PWM2 | P0.05 |
| 47 | A7 | A7 Analog in, GPIO, Ethernet Reset | PWM2 | P0.02 |
| 66 | D4 | SPI1 MISO, PWM, GPIO | PWM1 | P1.08 |
| 68 | D5 | PWM, GPIO | PWM1 | P1.10 |
| 70 | D6 | PWM, GPIO | PWM1 | P1.11 |
| 72 | D7 | PWM, GPIO | PWM0 | P1.12 |


{{!-- END do not edit content above, it is automatically generated --}}

- PWM that share the same timer (`PMW2` for example) must share the same frequency but can have different duty cycles.
- Pin `D7` (PWM0) share a timer with the RGB LED and you should not change its frequency but it can have a different duty cycle.

### USB

The B504e supports a USB interface for programming the device and for USB serial (CDC) communications. The module itself does not contain a USB connector; you typically add a micro USB or USB C connector on your base board. It is optional but recommended.

{{!-- BEGIN do not edit content below, it is automatically generated 9a03f9ac-6d5e-4d9c-8962-4856d9029c30 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 11 | USBDATA+ | USB Data+ | &nbsp; |
| 13 | USBDATA- | USB Data- | &nbsp; |
| 16 | VUSB | USB VUSB power pin | &nbsp; |
| 44 | CELL USBD+ | Cellular Modem USB Data+ | &nbsp; |
| 46 | CELL USBD- | Cellular Modem USB Data- | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

- The Cellular Modem USB connector is optional, and can be used for firmware updates of the cellular module.


### RGB LED

The B504e supports an external common anode RGB LED. 

One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K ohm current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values - 33 ohm on red, and 66 ohm on green and blue.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

The use of the RGB LED is optional, however it is highly recommended as troubleshooting the device without the LED is very difficult.

{{!-- BEGIN do not edit content below, it is automatically generated c4771770-1f59-4b95-9774-06e7ee605b64 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 61 | RGBR | RGB LED Red | P0.13 |
| 63 | RGBG | RGB LED Green | P0.14 |
| 65 | RGBB | RGB LED Blue | P0.15 |


{{!-- END do not edit content above, it is automatically generated  --}}



### SETUP and RESET button

It is highly recommended that you add MODE (SETUP) and RESET buttons to your base board using momentary switches that connect to GND. These are necessary to change the operating mode of the device, for example to enter listening or DFU mode.

{{!-- BEGIN do not edit content below, it is automatically generated e653d1b3-41a4-4c63-94a3-7029c2128bfd --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 32 | MODE / D20 | MODE button, has internal pull-up | P0.11 |
| 34 | RST | Hardware reset, active low. External pull-up required. | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}

The MODE button does not have a hardware pull-up on it, so you must add an external pull-up (2.2K to 10K) to 3V3, or connect it to 3V3 if not using a button. 

The RST pin does have an internal weak pull-up, but you may want to add external pull-up on that as well, especially if you use an off-board reset button connected by long wires.

### Pin description
| # |	Pin	 | Common | Function | nRF52 |	Description |
| :---: | :---: | :---: | :---: | :---: | --- |
| 1 | GND | GND | POWER | | System ground. |
| 2 | VCC	| VCC<sup>5</sup>	| POWER |  | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. |
| 3 | GND | GND | POWER | | System ground. |
| 4 | VCC | VCC	| POWER | |	System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. |
| 5 | GND | GND | POWER | | System ground. |
| 6	 | VCC | VCC	| POWER | | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. |
| 7 | GND | GND | POWER | | System ground. |
| 8 | VCC | VCC	| POWER | | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. |
| 9 | GND | GND | POWER | | System ground. |
| 10 | 3V3 | 3V3 |POWER | | System power in, supply a fixed 3.0-3.6v power.| 
| 11 | USB D+	 | USB D+	 |IO | | Data+ pin of the NRF52840 USB port. |
| 12 | 3V3 | 3V3 |POWER | | System power in, supply a fixed 3.0-3.6v power. |
| 13 | USB D- | USB D- | IO  | | Data- pin of the NRF52840 USB port. |
| 14 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |	
| 15 | GND | GND | POWER | | System ground. |
| 16 | VUSB | VUSB | POWER | | System power in, USB detect pin for nRF52840. 5V on this pin enables the USB interface. |
| 17 | NFC1 | SOM3<sup>3</sup> | NFC input | P0.09 | 	NFC antenna connection. | 
| 18 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 19 | NFC2 | SOM4<sup>3</sup> | NFC input	 | P0.10 | NFC antenna connection. |
| 20 | D1 | SCL | IO | P0.27 | I2C SCL, and digital only GPIO. | 
| 21 | GND | GND | POWER | | System ground. |
| 22 | D0 | SDA | IO | P0.26 | I2C SDA, and digital only GPIO.|
| 23 | A0 | ADC0 | IO | P0.03 | Analog input ADC0<sup>2</sup>, and digital GPIO. |
| 32 | MODE | MODE | IO | P0.25 | Connected to the MODE button input, and digital only GPIO.|
| 33 | A1 | ADC1 | IO | P0.04 | Analog input ADC1<sup>2</sup>, and digital GPIO. |
| 34 | RESET | RESET | I | | Active-low reset input. |
| 35 | A2 | ADC2 | IO | P0.28| Analog input ADC2<sup>2</sup>, and digital GPIO. |
| 36 | D9 | TX | IO | P0.06 | Primarily used as UART TX, but can also be used as a digital GPIO. |
| 37 | A3 | ADC3 | IO | P0.29| Analog input ADC3<sup>2</sup>, and digital GPIO. |
| 38 | D10 | RX | IO | P0.08 | Primarily used as UART RX, but can also be used as a digital GPIO.	 | 
| 39 | AGND | AGND | POWER | | System analog ground. |
| 40 | D3 | RESERVED<sup>3</sup> |IO | P1.10 | UART flow control CTS, SCL1 (Wire1), SPI1 MOSI, digital only GPIO. |
| 41 | A4 | RESERVED<sup>3</sup> |IO | P0.30 | Analog input ADC4<sup>2</sup>, and digital GPIO. |
| 42 | D2 | RESERVED<sup>3</sup> | IO | P1.02 | UART flow control RTS, SDA1 (Wire1), SPI1 SCK, digital only GPIO. |
| 43 | A5 | RESERVED<sup>3</sup> |IO | P0.31 | Analog input ADC5<sup>2</sup>, and digital GPIO.|
| 44 | Quectel USB D+ | SOM0 | IO | | Data+ pin of the cellular modem USB port.|
| 45 | A6 | RESERVED<sup>3</sup> | IO | P0.05| Analog input ADC6<sup>2</sup>, and digital GPIO. |
| 46 | Quectel USB D- | SOM1 | IO ||  Data- pin of the cellular modem USB port.|
| 47 | A7 | RESERVED<sup>3</sup> | IO | P0.02 | Analog input ADC7<sup>2</sup>, and digital GPIO.|
| 48 | D8 | CS | IO | P0.07 | SPI interface CS, and digital only GPIO. | 
| 49 | AGND | AGND | POWER	| | System analog ground.|
| 50 | D11 | MISO | IO | P1.08| SPI interface MISO, and digital only GPIO.|
| 51 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 52 | D12 | MOSI | IO | P1.09| SPI interface MOSI, and digital only GPIO.| 
| 53 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 54 | D13 | SCK | IO | P0.11| SPI interface SCK, and digital only GPIO. |
| 55 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 56 | GND | GND | POWER | | System analog ground. |
| 57 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 58 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 59 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 60 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 61 | RGBR | RED | IO | P0.16| Red pin of the RGB LED. | 
| 62 | D22 | GPIO0 | IO | P1.01 | GPIO0, digital only. |
| 63 | RGBG | GREEN | IO | P0.15 | Green pin of the RGB LED.|
| 64 | D23 | GPIO1 | IO | P1.03| GPIO1, digital only.|	
| 65 | RGBB | BLUE | IO | P0.14 | Blue pin of the RGB LED.|
| 66 | D4 | PWM0 | IO | P0.12 | SPI1 MISO, Digital only GPIO, and PWM0. |
| 67 | SIM_VCC<sup>1</sup> | SOM5<sup>3</sup> | POWER | | Leave unconnected, 1.8V/3V SIM Supply Output from cellular modem. |
| 68 | D5 | PWM1 | IO | P0.24| Digital only GPIO, and PWM1. |
| 69 | SIM_RST<sup>1</sup> | SOM6<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
| 70 | D6 | PWM2 | IO | P1.04| Digital only GPIO, and PWM2.|
| 71 | SIM_CLK<sup>1</sup> | SOM7<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem.|
| 72 | D7 | PWM3 | IO | P0.13| Digital only GPIO, and PWM3.|
| 73 | SIM_DATA<sup>1</sup> | SOM8<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Data I/O of cellular modem with internal 4.7 k pull-up. |
| 74 | Quectel VBUS | SOM2<sup>3</sup> | IO | | USB detect pin for cellular modem. 5V on this pin enables the Quectel USB interface.|
| 75 | Quectel RI | SOM9<sup>4</sup> | IO ||  Ring indicator |

<sup>1</sup>These pins are connected to the internal MFF2 SIM and should be left open. 

<sup>2</sup>A0-A7 are 12-bit Analog-to-Digital (A/D) inputs (0-4095).

<sup>3</sup>SoM-specific and Reserved pins will vary depending on module. They are able to be used on the B523, but their function may be be different on future modules.

<sup>4</sup>RI is available on the B504e (Quectel) but not on the B402 (u-blox LTE M1)

<sup>5</sup>The VCC maximum is 4.3V on the B504e (Quectel) but is 4.2V on the B402 (u-blox LTE M1). For compatibility across modules, limit this to 4.2V.

By default, the Tinker application firmware enables the use of the bq24195 PMIC and MAX17043 fuel gauge. This in turn uses I2C (D0 and D1) and pin A6 (PM_INT). If you are not using the PMIC and fuel gauge and with to use these pins for other purposes, be sure to disable system power configuration. This setting is persistent, so you may want to disable it with your manufacturing firmware only.

```
System.setPowerConfiguration(SystemPowerConfiguration());
```

If you are using Ethernet with the B-Series SoM, the following pins are used by Ethernet:

| Device OS Pin | M.2 Pin | Ethernet Pin  |
|:-------------:|:-------:|:--------------------------|
| MISO          | 50      | SPI MISO                  |
| MOSI          | 52      | SPI MOSI                  |
| SCK           | 54      | SPI SCK                   |
| A7            | 47      | nRESET                    |
| D22           | 62      | nINTERRUPT                |
| D8            | 48      | nCHIP SELECT              |


### Cellular modem USB pins

{{!-- BEGIN shared-blurb df57b908-c626-4879-82d4-d082c0fc542b --}}
The cellular modem USB pins are optional on custom base boards. These pins are used for low-level diagnostics 
and reprogramming the cellular modem firmware.

Note, however, the Particle has never done a cellular modem firmware upgrade in the field because doing so 
generally requires recertification, and is there is a high likelihood that the upgrade will fail, rendering
the modem unusable.

Cellular modem could be reprogrammed by removing the SoM from your board and putting it in the M.2 SoM
breakout board, which has the cellular modem USB connector.

| # |	Pin	 | Common | Function | nRF52 |	Description |
| :---: | :---: | :---: | :---: | :---: | --- |
| 44 | Quectel USB D+ | SOM0 | IO | | Data+ pin of the cellular modem USB port.|
| 46 | Quectel USB D- | SOM1 | IO ||  Data- pin of the cellular modem USB port.|
| 74 | Quectel VBUS | SOM2<sup>3</sup> | IO | | USB detect pin for cellular modem. 5V on this pin enables the Quectel USB interface.|
| 75 | Quectel RI | SOM9<sup>4</sup> | IO ||  Ring indicator |

{{!-- END shared-blurb --}}



### Complete module pin details

{{collapse op="start" label="Show pin details"}}

{{!-- BEGIN do not edit content below, it is automatically generated 88cf3396-ffa7-4f4c-b2ef-deead0b0315d --}}


#### 1 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 2 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power.</td></tr>
</tbody>
</table>

#### 3 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 4 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power.</td></tr>
</tbody>
</table>

#### 5 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 6 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power.</td></tr>
</tbody>
</table>

#### 7 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 8 VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power.</td></tr>
</tbody>
</table>

#### 9 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 10 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">10</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, supply a fixed 3.0-3.6v power.</td></tr>
</tbody>
</table>

#### 11 USBDATA+

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">USBDATA+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">USB Data+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 12 3V3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">3V3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">System power in, supply a fixed 3.0-3.6v power.</td></tr>
</tbody>
</table>

#### 13 USBDATA-

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">USBDATA-</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">USB Data-</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 14 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 15 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 16 VUSB

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">VUSB</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">USB VUSB power pin</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 17 NFC1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NFC1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.09</td></tr>
</tbody>
</table>

#### 18 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 19 NFC2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NFC2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">NFC Antenna 2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.10</td></tr>
</tbody>
</table>

#### 20 D1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">20</td></tr>
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

#### 21 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">21</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 22 D0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">22</td></tr>
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

#### 23 A0

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A0</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D19</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A0 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.03</td></tr>
</tbody>
</table>

#### 32 MODE

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">32</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MODE</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D20</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">MODE button, has internal pull-up</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.25</td></tr>
</tbody>
</table>

#### 33 A1

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">33</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A1</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D18</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A1 Analog in, GPIO, PWM</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.04</td></tr>
</tbody>
</table>

#### 34 RST

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">34</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Hardware reset, active low. External pull-up required.</td></tr>
</tbody>
</table>

#### 35 A2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">35</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D17</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A2 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.28</td></tr>
</tbody>
</table>

#### 36 TX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">36</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">TX</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D9</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Serial TX, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">TX. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.06</td></tr>
</tbody>
</table>

#### 37 A3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">37</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D16</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A3 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.29</td></tr>
</tbody>
</table>

#### 38 RX

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">38</td></tr>
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

#### 39 AGND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">39</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">AGND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Analog Ground.</td></tr>
</tbody>
</table>

#### 40 D3

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">40</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D3</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">CTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SCL. Use Wire1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.10</td></tr>
</tbody>
</table>

#### 41 A4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">41</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D15</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A4 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.30</td></tr>
</tbody>
</table>

#### 42 D2

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">42</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D2</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">UART serial</td><td class="" style="text-align: left; ">RTS. Use Serial1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">I2C interface</td><td class="" style="text-align: left; ">SDA. Use Wire1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.02</td></tr>
</tbody>
</table>

#### 43 A5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">43</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D14</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A5 Analog in, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.31</td></tr>
</tbody>
</table>

#### 44 CELL USBD+

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">44</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">CELL USBD+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Cellular Modem USB Data+</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 45 A6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">45</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A6 Analog in, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.05</td></tr>
</tbody>
</table>

#### 46 CELL USBD-

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">46</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">CELL USBD-</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Cellular Modem USB Data-</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 47 A7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">47</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">A7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">A7 Analog in, GPIO, Ethernet Reset</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">A0, A1, A6, and A7 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.02</td></tr>
</tbody>
</table>

#### 48 D8

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">48</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D8</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, SPI SS, Ethernet CS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.07</td></tr>
</tbody>
</table>

#### 49 AGND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">49</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">AGND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Analog Ground.</td></tr>
</tbody>
</table>

#### 50 MISO

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">50</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MISO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D11</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MISO, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.08</td></tr>
</tbody>
</table>

#### 51 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">51</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 52 MOSI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">52</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">MOSI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D12</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI MOSI, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MOSI. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.09</td></tr>
</tbody>
</table>

#### 53 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">53</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 54 SCK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">54</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SCK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Alternate Name</td><td class="" style="text-align: left; ">D13</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI SCK, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">SCK. Use SPI object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.11</td></tr>
</tbody>
</table>

#### 55 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">55</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 56 GND

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">56</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">GND</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ground.</td></tr>
</tbody>
</table>

#### 57 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">57</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 58 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">58</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 59 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">59</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 60 NC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">60</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">NC</td></tr>
</tbody>
</table>

#### 61 RGBR

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">61</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RGBR</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Red</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.16</td></tr>
</tbody>
</table>

#### 62 D22

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">62</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D22</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO, Ethernet INT</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.01</td></tr>
</tbody>
</table>

#### 63 RGBG

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">63</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RGBG</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Green</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.15</td></tr>
</tbody>
</table>

#### 64 D23

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">64</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D23</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.03</td></tr>
</tbody>
</table>

#### 65 RGBB

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">65</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RGBB</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">RGB LED Blue</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.14</td></tr>
</tbody>
</table>

#### 66 D4

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">66</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D4</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">SPI1 MISO, PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">SPI interface</td><td class="" style="text-align: left; ">MISO. Use SPI1 object.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.12</td></tr>
</tbody>
</table>

#### 67 SIM_VCC

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">67</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SIM_VCC</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected, 1.8V/3V SIM Supply Output from R410M.</td></tr>
</tbody>
</table>

#### 68 D5

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">68</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D5</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.24</td></tr>
</tbody>
</table>

#### 69 SIM_RST

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">69</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SIM_RST</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected, 1.8V/3V SIM Reset Output from R410M.</td></tr>
</tbody>
</table>

#### 70 D6

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">70</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D6</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports tone</td><td class="" style="text-align: left; ">D4, D5, and D6 must have the same frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P1.04</td></tr>
</tbody>
</table>

#### 71 SIM_CLK

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">71</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SIM_CLK</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected, 1.8V/3V SIM Clock Output from R410M.</td></tr>
</tbody>
</table>

#### 72 D7

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">72</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">D7</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">PWM, GPIO</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalRead</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports digitalWrite</td><td class="" style="text-align: left; ">Yes</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports analogWrite (PWM)</td><td class="" style="text-align: left; ">PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Supports attachInterrupt</td><td class="" style="text-align: left; ">Yes. You can only have 8 active interrupt pins.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Internal pull resistance</td><td class="" style="text-align: left; ">13K</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">MCU Pin</td><td class="" style="text-align: left; ">P0.13</td></tr>
</tbody>
</table>

#### 73 SIM_DATA

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">73</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">SIM_DATA</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Leave unconnected, 1.8V/3V SIM Data I/O of R410m with internal 4.7 k pull-up.</td></tr>
</tbody>
</table>

#### 74 CELL VBUS

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">74</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">CELL VBUS</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">USB detect pin for R410M. 5V on this pin enables the Cellular Modem USB interface.</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Input is 5V Tolerant</td><td class="" style="text-align: left; ">Yes</td></tr>
</tbody>
</table>

#### 75 RI

<table class="pinDetailTable">
<thead>
<th> </th><th>Details</th></thead>
<tbody>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Number</td><td class="" style="text-align: left; ">75</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Pin Name</td><td class="" style="text-align: left; ">RI</td></tr>
<tr><td class="pinDetailTableLabel" style="text-align: left; ">Description</td><td class="" style="text-align: left; ">Ring Indicator for cellular modem</td></tr>
</tbody>
</table>


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}



### LED status

#### System RGB LED

Unlike the Boron, the B504e module does not have an on-module RGB system status LED. We have provided its individual control pins for you to connect an LED of your liking. This will allow greater flexibility in the end design of your products.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

### PMIC Notes

{{!-- BEGIN shared-blurb 93112786-2815-408c-b064-ec7e9c629200 --}}
When using the B-Series SoM with a bq24195 PMIC, note the following:

By default, the bq24195 sets the input current limit, which affects powering by VIN and VUSB, to 100 mA. This affects the VSYS output of the PMIC, which powers both the cellular modem and 3V3 supply, and is not enough to power the B-Series SoM in normal operation.

If your device has the default firmware (Tinker), it will attempt to connect to the cloud, brown out due to insufficient current, then the device will reset. This may result in what appears to be the status LED blinking white, but is actually rolling reboot caused by brownout.

A factory new B-Series SoM does not enable the PMIC setup. To enable the use of the bq21415, you must enable the system power feature [PMIC_DETECTION](/reference/device-os/api/power-manager/systempowerfeature/#systempowerfeature-pmic_detection) in your code. This defaults to off because the B-Series SoM can be used without a PMIC, or with a different PMIC, and also requires I2C on D0/D1, and some base boards may use those pins as GPIO.

Because the input current limit does not affect the battery input (Li+), for troubleshooting purposes it can be helpful to attach a battery to help rule out input current limit issues. It's also possible to supply 3.7V via a bench power supply to the battery input, instead of VIN. 

The input current limit can result in a situation where you can't bring up a B-Series SoM because it browns out continuously, but also cannot flash code to it to stop if from browning out. There are two general solutions:

- Attach a battery or supply by Li+ when bringing up a board.
- Use SWD/JTAG and reset halt the MCU. This will prevent it from connecting to the cloud, so you can flash Device OS and firmware to it by SWD.

The input current limit is actually controlled by three factors:

- The [power source max current setting](/reference/device-os/api/power-manager/powersourcemaxcurrent-systempowerconfiguration/) in the PMIC. The default is 900 mA. It can be set to 100, 150, 500, 900, 1200, 1500, 2000, or 3000 mA.
- It is also limited by the hardware ILIM resistor. On Particle devices with a built-in PMIC, this is set to 1590 mA, but if you are implementing your own PMIC hardware, you can adjust this higher.
- When connected by USB, it will use DPDM, current negotiation via the USB DP (D+) and DM (D-) lines. 

Note that some 2A tablet chargers and multi-port USB power supplies supply 2A but do not implement DPDM; these will be treated as if VIN was used, and you must set the power source current, otherwise the input current will be limited to 900 mA, which is not enough to power a 2G/3G cellular modem without an attached battery.

{{!-- END shared-blurb --}}

## Technical specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

#### Supply voltages

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| **Supply voltages** | | | | | |
| Supply Input Voltage | VCC | -0.3 |  | +6.0 | V |
| Supply Input Voltage | 3V3 | -0.3 |  | +3.9 | V |
| VBUS USB supply voltage | VUSB | -0.3 |  | +5.8 | V |
| **I/O pin voltage** | | | | | | 
| VI/O, VDD ≤ 3.6 V| IO | -0.3 |  | VDD + 0.3 | V |
| VI/O, VDD > 3.6 V | IO | -0.3 |  | +3.9 | V |
| **NFC antenna pin current** | | | | | |
| I<sub>NFC1/2</sub> | NFC1/NFC2 | | | 80 | mA |
| **Radio**| | | | | |
| BT RF input level (52840)| | | | 10 | dBm |
| **Environmental**| | | | | |
| Storage  temperature | | -40 | | +85 |°C |


<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.


### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| **Supply voltages** |
| Supply Input Voltage | VCC | +3.6 | +3.8 | +4.2 | V |
| Supply Input Voltage | 3V3 | +3.0 | +3.3 | +3.6 | V |
| VBUS USB supply voltage | VUSB | +4.35 | +5.0 | +5.5 | V |
| **Environmental** |
| Normal operating temperature<sup>1</sup> | | -20 | +25 | +65 | °C |
| Extended operating temperature<sup>2</sup> | | -40 |  | +85 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>1</sup> Normal operating temperature range (fully functional and meet 3GPP specifications).

<sup>2</sup> Extended operating temperature range (RF performance may be affected outside normal operating range, though module is fully functional)

--- 

### Power consumption

Values are from B523 using the EG91-E cellular modem. Actual operating current with cellular using the EG91-NAX modem may vary slightly but should be similar.


| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 4.47 | 4.48 | 4.51 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 17.5 | 34.2 | 744 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 17.9 | 72.3 | 711 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 23.0 | 93.6 | 669 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 22.9 | 26.8 | 149 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 113 | 139 | 519 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 323 | 538 | 916 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 272 | 537 | 948 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 264 | 537 | 947 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | | 604 | 2260 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | | 619 | 1700 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 327 | 537 | 912 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 18.7 | 23.1 | 140 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | | 53.6 | 446 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> | | 55.8 | 420 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | | 54.8 | 444 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> |  | 139 | 2430 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> | | 162 | 1090 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 317 | 537 | 938 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> | 18.4 | 22.8 | 149 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | | 29.7 | 430 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | | 30.8 | 441 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

The values above are for connecting to cellular using LTE Cat 1 on the EG91-E (not 2G or 3G). Thus the values should be 
comparable for the EG91-NAX (B504e) which only uses LTE Cat 1.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).

---

### Radio specifications

The B-Series SoM has two radio modules.


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


#### Quectel EG91-NAX

| Parameter | Value |
| --- | --- |
| Protocol stack | 3GPP Release 13 |
| RAT | LTE Cat 1 |
| LTE FDD Bands | Band 12 (700 MHz) | &check; |
| | Band 13 (750 MHz)  | &check; |
| | Band 5 (850 MHz) | &check; |
| | Band 26 (850 MHz)  | &nbsp; |
| | Band 4 (1700 MHz) | &nbsp; |
| | Band 2 (1900 MHz) | &check; |
| | Band 25 (1900 MHz)  | &nbsp; |
| WCDMA Bands | Band 5 (850 MHz) | 
| | Band 4 (1700) |
| | Band 2 (1900) |
| Power class | Class 3 (24dBm ± 3dB) for WCDMA bands |
| | Class 3 (23dBm ± 2dB) for LTE FDD bands |


---

### I/O characteristics 

These specifications are based on the nRF52840 datasheet.


| Symbol | Parameter | Min | Typ | Max | Unit |
| :---------|:-------|:---:|:---:|:---:|:---: |
| VIH | Input high voltage | 0.7 xVDD |  | VDD | V |
| VIL | Input low voltage | VSS |  | 0.3 xVDD | V | 
| VOH,SD | Output high voltage, standard drive, 0.5 mA, VDD ≥1.7 | VDD - 0.4 |  | VDD | V | 
| VOH,HDH | Output high voltage, high drive, 5 mA, VDD >= 2.7 V | VDD - 0.4 |  | VDD | V | 
| VOH,HDL | Output high voltage, high drive, 3 mA, VDD >= 1.7 V  | VDD - 0.4 |  | VDD | V | 
| VOL,SD | Output low voltage, standard drive, 0.5 mA, VDD ≥1.7 | VSS |  | VSS + 0.4 | V | 
| VOL,HDH | Output low voltage, high drive, 5 mA, VDD >= 2.7 V | VSS |  | VSS + 0.4 | V | 
| VOL,HDL | Output low voltage, high drive,3 mA, VDD >= 1.7 V | VSS  |  | VSS + 0.4 | V |  
| IOL,SD | Current at VSS+0.4 V, output set low, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOL,HDH | Current at VSS+0.4 V, output set low, high drive, VDD >= 2.7V | 6 | 10 | 15 | mA | 
| IOL,HDL | Current at VSS+0.4 V, output set low, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| IOH,SD | Current at VDD-0.4 V, output set high, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOH,HDH | Current at VDD-0.4 V, output set high, high drive, VDD >= 2.7V | 6 | 9 | 14 | mA | 
| IOH,HDL | Current at VDD-0.4 V, output set high, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| tRF,15pF | Rise/fall time, standard drivemode, 10-90%, 15 pF load<sup>1</sup> |  | 9 |  | ns | 
| tRF,25pF | Rise/fall time, standard drive mode, 10-90%, 25 pF load<sup>1</sup> |  | 13 |  | ns |  
| tRF,50pF | Rise/fall time, standard drive mode, 10-90%, 50 pF load<sup>1</sup> |  | 25 |  | ns | 
| tHRF,15pF | Rise/Fall time, high drive mode, 10-90%, 15 pF load<sup>1</sup> |  | 4  | | ns | 
| tHRF,25pF | Rise/Fall time, high drive mode, 10-90%, 25 pF load<sup>1</sup> |  | 5 |  | ns | 
| tHRF,50pF | Rise/Fall time, high drive mode, 10-90%, 50 pF load<sup>1</sup> |  | 8 |  | ns | 
| RPU | Pull-up resistance | 11 | 13 | 16 | kΩ | 
| RPD | Pull-down resistance | 11 | 13 | 16 | kΩ | 
| CPAD | Pad capacitance |  | 3 |  | pF | 
| CPAD_NFC | Pad capacitance on NFC pads  |  | 4 |  | pF | 
| INFC_LEAK | Leakage current between NFC pads when driven to different states |  | 1 | 10 | μA |  

- Rise and fall times based on simulations

- GPIO default to standard drive (2mA) but can be reconfigured to high drive (9mA) in Device OS 2.0.0 and later using the [`pinSetDriveStrength()`](/reference/device-os/api/input-output/pinsetdrivestrength/) function.

## Mechanical specifications

### Dimensions and weight

| Parameters | Value | Unit |
| --- | --- | --- |
| Width | 30 | mm |
| Height | 42 | mm | 
| Thickness | 5.5 | mm | 
| Weight | 6.2 | grams |

### 3D models

3D models of the B-Series SoM module are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/B-Series/B402) in formats including step, iges, stl, and f3d.

The 3D models are the same for the B504e and B523 as the cellular modem module is the same size.

### Mechanical drawing

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

Dimensions are in millimeters.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

One compatible connector is the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html). It is widely available including at suppliers such as [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916).

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}


---

### Screw assembly

The M.2 SoM requires a screw to hold the SoM in place because the M.2 connector does not have integrated locks and the SoM will pop up if not attached to the base board. The screw also provides better vibration resistance than locking clips.

- This is one style of standoff.

![Screw Assembly](/assets/images/b-series/new-standoff.png)

- An [alternative design](/hardware/som/som-first-board/#hold-down-screw) uses a [JAE SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) standoff. It's reflow soldered to your base board and has a threaded hole for a M2*3 screw to hold down the SoM. This may be easier to obtain.
- The screw should be connected to the ground plane on your base board.

### Design considerations

We strongly recommend against placing components under the SOM board because there is not enough height.

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

## Product handling

### ESD precautions
The B series contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an B series without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the B series module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the B series!

### Connectors

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The M.2 edge connector is static sensitive and should be handled carefully. The M.2 connector is not designed for repeated removal and insertion of the module.

---

## Assembly

### Conformal coatings

B-Series SoM modules should not use a conformal coating to protect the module from water. Some components on the SoM cannot be coated and would need to be masked off during coating. This will make the coating process difficult to implement and test.

Furthermore, you cannot safely protect the the connection between the M.2 SoM and the M.2 NGFF connector by using a coating. Using an enclosure that protects both your base board and the B-Series SoM as a single waterproof assembly is recommended instead.


---

## Default settings

The B series comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.

---

## FCC warnings and end product labeling requirements

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

* Contains FCC ID: 2AEMI-B504

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.

---

## Certification documents

{{!-- BEGIN shared-blurb bc4dc783-cdaa-4684-b87e-3aa6ff5f404d --}}

### FCC (United States) - B504e B-Series SoM 

- FCC ID: 2AEMI-B504
- [Grant of equipment authorization (DTS)](/assets/pdfs/b504-fcc-dts.pdf)
- [Grant of equipment authorization (PCB)](/assets/pdfs/b504-fcc-pcb.pdf)
- [Grant of equipment authorization - Part 15B Communication Receiver](/assets/pdfs/b504-fcc-cxx.pdf)
- [Grant of equipment authorization - Part 15B Computing Device](/assets/pdfs/b504-fcc-jbp.pdf)

The certification for the B504 applies to the B504e as changing only the SIM is a permissive change that does not require full recertification.

### ISED (Canada) -  B504e B-Series SoM 

- ISED ID: 20127-B504
- [Certificate of Conformity](/assets/pdfs/b504-ised.pdf)
- [Test Report RSS-247 Issue 2, RSS-Gen Issue 5](/assets/pdfs/b504-ised-rss247-2.pdf)
- [Test Report RS-132 Issue 3, RSS-133 Issue 6, RSS-139 Issue 4](/assets/pdfs/b504-ised-rs132.pdf)
- [Test Report RSS-130 Issue 2](/assets/pdfs/b504-ised-rs130.pdf)
- [Test Report RSS-132 Issue 4](/assets/pdfs/b504-ised-rs132.pdf)
- [Test Report RSS-133 Issue 7](/assets/pdfs/b504-ised-rs133.pdf)
- [Test Report RSS-139 Issue 4](/assets/pdfs/b504-ised-rs139.pdf)

{{!-- END shared-blurb --}}

**Indiustry Canada Statement**
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

 * Contains transmitter module ISED: 20127-B504
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.


---

## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated 716800d6-7c3f-45f7-8cc4-91af58795240 --}}

| Country | Technologies | Carriers |
| :--- | :--- | :--- |
| Canada | 3G, 4G | Bell Mobility, Rogers Wireless, Telus, Videotron |
| Mexico | 3G, 4G | AT&T, Telcel |
| United States | 4G | Alaska Wireless, AT&T, T-Mobile (USA), Verizon<sup>7</sup> |


{{!-- END do not edit content above, it is automatically generated --}}

### Additional countries

The following countries are not officially supported at this time, but may be compatible. Countries in this list can be used for prototyping and development work, but contact Particle prior to fleet deployment in these additional countries.

{{!-- BEGIN do not edit content below, it is automatically generated 4dd8ccc8-d597-4a5b-8ed9-174666f1dd3b --}}

| Country | Technologies | Carriers |
| :--- | :--- | :--- |
| Anguilla | 3G, 4G | Flow |
| Antigua and Barbuda | 4G | Flow |
| Argentina | 3G, 4G | Claro, Movistar, Personal |
| Bahamas | 3G, 4G | Aliv, BTC Bahamas |
| Barbados | 4G | Flow |
| Belize | 3G, 4G | Smart |
| Bolivia | 3G, 4G | Viva |
| Cayman Islands | 3G | Flow |
| Chile | 3G | Claro, Entel, Movistar |
| Colombia | 3G, 4G | Movistar, Tigo |
| Costa Rica | 3G | Movistar |
| Dominica | 4G | Flow |
| Dominican Republic | 3G, 4G | Altice Dominicana, Claro |
| Ecuador | 3G, 4G | Claro, Movistar |
| El Salvador | 3G, 4G | Claro, Telefonica |
| Guatemala | 3G, 4G | Claro, Movistar |
| Honduras | 3G, 4G | Claro, Tigo |
| Jamaica | 3G, 4G | Digicel, Flow |
| Nicaragua | 3G | Movistar |
| Panama | 3G | Digicel, Movistar |
| Paraguay | 3G, 4G | Claro, Personal, Tigo, Vox |
| Peru | 3G, 4G | Claro, Entel, Movistar |
| Saint Kitts and Nevis | 3G | Flow |
| Saint Lucia | 3G | Flow |
| Saint Vincent and the Grenadines | 3G, 4G | Flow |
| Trinidad and Tobago | 3G | Digicel, TSTT |
| Turks and Caicos Islands | 3G | Flow |
| Uruguay | 3G, 4G | Antel, Claro, Movistar |
| Venezuela | 3G, 4G | Movistar |
| Virgin Islands (British) | 4G | Flow |
| Virgin Islands (U.S.) | 4G | T-Mobile (USA) |


{{!-- END do not edit content above, it is automatically generated --}}


---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 86efb1c7-a248-4821-8403-6f949b5b0285 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | EG91-NAX | GA | |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | EG91-NAX | GA | |
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | NORAM | EG91-NAX | Deprecated | B504EMEA|
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | NORAM | EG91-NAX | Deprecated | B504EMTY|


{{!-- END do not edit content above, it is automatically generated --}}




## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-02-28 | RK | Preliminary version |
|          | 2024-05-31 | RK | Update bands |
|          | 2024-06-06 | RK | Update bands |
| 001      | 2024-06-26 | RK | Initial version |
| 002      | 2024-08-13 | RK | Added links to certification documents |
| 003      | 2024-09-03 | RK | Added clarification of cellular modem USB pins |
| 004      | 2024-09-24 | RK | Removed concurrent GNSS warning |
| 005      | 2025-04-21 | RK | Added ISED certification |
| 006      | 2025-05-09 | RK | Added Industry Canada statement |
