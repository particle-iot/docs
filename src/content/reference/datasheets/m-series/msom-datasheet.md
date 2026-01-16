---
title: M-SoM datasheet
columns: two
layout: commonTwo.hbs
description: M-SoM datasheet
---

# M-SoM datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/msom-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

![M-SoM](/assets/images/m-series/msom-top.png)
 
## Overview

The Particle M-SoM contains the following functional units:
 
- M.2 SoM form-factor, like the B-Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - M404: Quectel BG95-M5 LTE Cat M1/2G (Global)
  - M524: Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)
  - M635: Quectel BG95-S5 LTE Cat M1/2G (Global with satellite)

The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations. See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.

### MCU

The Realtek RTL8722DM is in the same family as the P2 and Photon 2 modules (RTL8721DM), but has additional GPIO.

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - U.FL connector for external antenna
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8722DM MCU
  - ARM Cortex M33 CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 3072 KB (3 MB) of RAM available to user applications
- 8 MB flash file system
- FCC (United States), ISED (Canada), and CE (European Union) certified

### Block diagram

{{imageOverlay src="/assets/images/m-series/msom-block-diagram.png" alt="Block diagram" class="full-width"}}

### Device families

| | Cellular Only | Cellular & Wi-Fi | Wi-Fi Only |
| :--- | :---: | :---: | :---: |
| Developer devices | Boron | &nbsp; | Photon 2 |
| Production module | B-SoM | M-SoM | P2 |

### Migration guides

If you are migrating to the M-SoM from another Particle device, see also the following migration guides:

- [M-SoM from B-SoM](/hardware/migration-guides/msom-b-series-migration-guide/)
- [M-SoM from Boron or Argon](/hardware/migration-guides/msom-boron-migration-guide/)
- [M-SoM from E-Series](/hardware/migration-guides/msom-e-series-migration-guide/)
- [M-SoM from P2](/hardware/migration-guides/msom-p2-migration-guide/)


### Power

#### VCC

VCC is used to supply power to the cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery. Make sure that the supply can handle currents of at least 2 A.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting.

#### 3V3

3V3 is used to supply power to RTL8722 MCU, logic ICs, memory, etc.. Make sure that the supply can handle a minimum of 500 mA.

These limits do not include any 3.3V peripherals on your base board, so that may increase the current requirements.

{{!-- BEGIN shared-blurb b7c36aca-bdfe-463c-b901-53a3aeec8ab0 --}}
Power supply requirements:
- 3.3V output
- Maximum 5% voltage drop
- 100 mV peak-to-peak ripple maximum
- 500 mA minimum output current at 3.3V recommended for future compatibility
- Maintain these values at no-load as well as maximum load
{{!-- END shared-blurb --}}


{{!-- BEGIN shared-blurb 356da82a-95ad-401e-a26b-216d120c45d9 --}}
In some cases, it may be necessary to add a supervisory/reset IC, such as the Richtek RT9818C or SG Micro SGM809-RXN3L/TR:

- If your power supply has a slew rate from 1.5V to 3.0V slower than 15 ms, a reset IC is required.
- If your power supply at power off cannot be guaranteed to drop below 0.3V before powering back up, a reset IC required.

See [supervisory reset](#supervisory-reset), below, for additional information.
{{!-- END shared-blurb --}}


### RF

- The M-SoM includes three U.FL connectors for external antennas:
  - Cellular 
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE
  - GNSS (GPS)

- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.

## Approved Antennas

### Certified cellular antennas

The M-SoM is certified with the following cellular antenna:

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


### Certified Wi-Fi/BLE antennas

The M-SoM is certified for use with the same antennas as the P2/Photon 2. The same antenna is shared for Wi-Fi and BLE. Unlike the P2/Photon 2, the external antenna is required for Wi-Fi and BLE and the M-SoM does not include a built-in trace antenna on the module.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x1] | PARANTWM1EA | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/particle-p2-photon2-wi-fi-antenna-2-4-5ghz)  |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x50] |PARANTWM1TY | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTWM1EA antenna. Tray quantities of the M-SoM do not include antennas.

{{!-- BEGIN shared-blurb adf4fb35-acf2-464b-8080-15e05f79006b --}}
{{box op="start" cssClass="boxed warningBox"}}
Do not use the Argon Wi-Fi/BLE antenna (ANT-FLXV2) on the P2, Photon 2, or M-SoM. The Argon antenna does not 
work with 5 GHz and this will result in poor Wi-Fi performance on the P2, Photon 2, and M-SoM.
{{box op="end"}}
{{!-- END shared-blurb --}}

### Certified GNSS antennas

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

Single quantity M-SoM units and developer kits include a PARANTGN1EA antenna. Tray quantities of the M-SoM do not include antennas. If not using the GNSS feature, the antenna can be omitted from your design.

{{!-- BEGIN shared-blurb 7380ecbc-cf8b-4498-926c-f74739cafcb9 --}}
- A [firmware library](https://github.com/particle-iot/particle-som-gnss) is available now for the M404. A future update will add support for the M524.
- Another option is the [QuectelGnssRK](https://github.com/rickkas7/QuectelGnssRK) library that can be used with [LocationFusionRK](https://github.com/rickkas7/LocationFusionRK) to provide Tracker-like location services on the M-SoM.
- Features such of high-precision, dead-reckoning, and high updates rates will require an external GNSS chip.
- On the M404 (BG95 cellular modem), radio hardware is shared between the cellular modem and built-in GNSS which limits concurrent use.
{{!-- END shared-blurb --}}

### General Antenna Guidance

- The antenna placement needs to follow some basic rules, as any antenna is sensitive to its environment. Mount the antenna at least 10mm from metal components or surfaces, ideally 20mm for best radiation efficiency, and try to maintain a minimum of three directions free from obstructions to be able to operate effectively.
- Needs tuning with actual product enclosure and all components.
 

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 30 (max) | I/O |
| Analog (ADC) | 8 (max) | I |
| UART | 2 | I/O |
| SPI  | 2 | I/O |
| I2C  | 1 | I/O |
| USB  | 1 | I/O |
| PWM  | 11 (max) | O |

**Note:** All GPIOs are only rated at 3.3VDC max.

### JTAG and SWD 

The M-SoM has 4 pads at the bottom exposing the SWD interface of the MCU. This interface can be used to debug your code or reprogram your SoM bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

Additionally, SWD is supported on pins on the M.2 connector:

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | SWCLK | PB[3] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available unless SWD is enabled at compile time. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840).
- SWO (Serial Wire Output) is not supported on the RTL8722DM.
- Pins 43 and 53 are shared 

## Pin information

### Pinout diagram

{{imageOverlay src="/assets/images/msom.svg" alt="Pinout" class="full-width"}}

### Common SoM pins

{{!-- BEGIN shared-blurb 0988fa39-ba4b-427c-82c2-0c83c305b0b7 --}}
<span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">RESERVED</span> and <span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">SOM</span> pins may vary across different SoM models. If you are designing for this specific module, or similar modules, you can use the indicated functions even if the pin is marked RESERVED.

The nRF52840 B-SoM has some differences from the RTL8722 M-SoM. Future modules with a different MCU may have different pin functions. An effort will be made to assign all of the listed functions for ADC, PWM, SPI, etc. from the set of common SoM pin functions in future modules, but the functions on RESERVED and SOM pins will likely vary.
{{!-- END shared-blurb --}}

### Pin function by pin name

{{!-- BEGIN do not edit content below, it is automatically generated 1ef65384-3694-4999-a6d8-4ee9432ca08d --}}

| Pin Name | Module Pin |   |   |   |   | PWM | MCU |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| A0 / D19 | 23 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[4] |
| A1 / D18 | 33 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[5] |
| A2 / D17 | 35 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[6] |
| A3 / D16 | 37 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A4 / D15 | 41 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A5 / D14 | 43 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] |
| A5 / D14 | 53 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] |
| A6 / D29 | 45 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] |
| A7 / WKP | 47 | ADC_7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| CELL USBD- | 46 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL USBD+ | 44 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL VBUS | 74 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL_RI | 75 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D0 | 22 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | PB[0] |
| D1 | 20 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | PA[31] |
| D2 | 42 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | &nbsp; | PA[14] |
| D3 | 40 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | &nbsp; | PA[15] |
| D4 | 66 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[18] |
| D5 | 68 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[19] |
| D6 | 70 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[20] |
| D7 | 72 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[21] |
| D8 | 48 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | &nbsp; | PA[19] |
| D20 | 19 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| D21 | 17 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| D22 | 62 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| D23 | 64 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[10] |
| D24 | 58 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | &nbsp; | PA[7] |
| D25 | 60 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | &nbsp; | PA[8] |
| D26 | 59 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| D27 | 55 | &nbsp; | SWDIO | &nbsp; | &nbsp; | &nbsp; | PA[27] |
| GNSS_TX | 18 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| MISO / D11 | 50 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PA[17] |
| MOSI / D12 | 52 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PA[16] |
| NC | 14 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| RGBB | 65 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| RGBG | 63 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| RGBR | 61 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| RX / D10 | 38 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | &check; | PA[13] |
| SCK / D13 | 54 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | PA[18] |
| SIM_CLK | 71 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_DATA | 73 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_RST | 69 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_VCC | 67 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| TX / D9 | 36 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | &check; | PA[12] |
| USBDATA- | 13 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| USBDATA+ | 11 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin function by M.2 pin

{{!-- BEGIN do not edit content below, it is automatically generated 5feb3f9e-2bf4-4e73-a2c8-b6584b125391 --}}

| Module Pin | Pin Name |   |   |   |   | PWM | MCU |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 11 | USBDATA+ | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |
| 13 | USBDATA- | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| 14 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 17 | D21 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| 18 | GNSS_TX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 19 | D20 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| 20 | D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | &nbsp; | PA[31] |
| 22 | D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | &nbsp; | PB[0] |
| 23 | A0 / D19 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[4] |
| 33 | A1 / D18 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[5] |
| 35 | A2 / D17 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[6] |
| 36 | TX / D9 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | &check; | PA[12] |
| 37 | A3 / D16 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| 38 | RX / D10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | &check; | PA[13] |
| 40 | D3 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | &nbsp; | PA[15] |
| 41 | A4 / D15 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| 42 | D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | &nbsp; | PA[14] |
| 43 | A5 / D14 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] |
| 44 | CELL USBD+ | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 45 | A6 / D29 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | &check; | PB[7] |
| 46 | CELL USBD- | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 47 | A7 / WKP | ADC_7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| 48 | D8 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | &nbsp; | PA[19] |
| 50 | MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | &check; | PA[17] |
| 52 | MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | &check; | PA[16] |
| 53 | A5 / D14 | ADC_6 | SWCLK | &nbsp; | &nbsp; | &check; | PB[3] |
| 54 | SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | &nbsp; | PA[18] |
| 55 | D27 | &nbsp; | SWDIO | &nbsp; | &nbsp; | &nbsp; | PA[27] |
| 58 | D24 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | &nbsp; | PA[7] |
| 59 | D26 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| 60 | D25 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | &nbsp; | PA[8] |
| 61 | RGBR | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| 62 | D22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| 63 | RGBG | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| 64 | D23 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[10] |
| 65 | RGBB | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| 66 | D4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[18] |
| 67 | SIM_VCC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 68 | D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[19] |
| 69 | SIM_RST | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 70 | D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[20] |
| 71 | SIM_CLK | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 72 | D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; | PB[21] |
| 73 | SIM_DATA | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 74 | CELL VBUS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 75 | CELL_RI | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}



### GPIO (Digital I/O)

{{!-- BEGIN do not edit content below, it is automatically generated 315abea5-56c1-45ce-af72-bf0d9d8e8482 --}}

| Pin | M-SoM Pin Name | M-SoM GPIO | MCU | Special boot function |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | &check; | PA[0] | &nbsp; |
| 19 | D20 | &check; | PA[1] | &nbsp; |
| 20 | D1 | &check; | PA[31] | &nbsp; |
| 22 | D0 | &check; | PB[0] | &nbsp; |
| 23 | A0 / D19 | &check; | PB[4] | &nbsp; |
| 33 | A1 / D18 | &check; | PB[5] | &nbsp; |
| 35 | A2 / D17 | &check; | PB[6] | &nbsp; |
| 36 | TX / D9 | &check; | PA[12] | &nbsp; |
| 37 | A3 / D16 | &check; | PB[1] | &nbsp; |
| 38 | RX / D10 | &check; | PA[13] | &nbsp; |
| 40 | D3 | &check; | PA[15] | &nbsp; |
| 41 | A4 / D15 | &check; | PB[2] | &nbsp; |
| 42 | D2 | &check; | PA[14] | &nbsp; |
| 43 | A5 / D14 | &check; | PB[3] | SWCLK. 40K pull-down at boot. |
| 45 | A6 / D29 | &check; | PB[7] | &nbsp; |
| 47 | A7 / WKP | &check; | PA[20] | &nbsp; |
| 48 | D8 | &check; | PA[19] | &nbsp; |
| 50 | MISO / D11 | &check; | PA[17] | &nbsp; |
| 52 | MOSI / D12 | &check; | PA[16] | &nbsp; |
| 53 | A5 / D14 | &check; | PB[3] | SWCLK. 40K pull-down at boot. |
| 54 | SCK / D13 | &check; | PA[18] | &nbsp; |
| 55 | D27 | &check; | PA[27] | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
| 58 | D24 | &check; | PA[7] | Low at boot triggers ISP flash download |
| 59 | D26 | &check; | PA[4] | &nbsp; |
| 60 | D25 | &check; | PA[8] | Goes high at boot |
| 62 | D22 | &check; | PA[9] | &nbsp; |
| 64 | D23 | &check; | PA[10] | &nbsp; |
| 66 | D4 | &check; | PB[18] | &nbsp; |
| 68 | D5 | &check; | PB[19] | &nbsp; |
| 70 | D6 | &check; | PB[20] | &nbsp; |
| 72 | D7 | &check; | PB[21] | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- All GPIO are 3.3V only and are not 5V tolerant
- The drive strength is 4 mA per pin in normal drive and 12 mA per pin in high drive mode on the M-SoM.
- There is a maximum of 200 mA across all pins. The total maximum could be further limited by your 3.3V regulator.
- Drive strength selection using [pinSetDriveStrength](/reference/device-os/api/input-output/pinsetdrivestrength/) is only available in Device OS 5.5.0 and later on the M-SoM.

Certain GPIO will change state at boot, or cause the MCU to enter a special mode. See the [boot mode pins](#boot-mode-pins) section, below, for more information.


### ADC (Analog to Digital Converter)

{{!-- BEGIN do not edit content below, it is automatically generated 8f52432b-ccd8-4be0-a2e2-1718b6771c4f --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | ADC_0 | PB[4] |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | ADC_1 | PB[5] |
| 35 | A2 / D17 | A2 Analog in, GPIO | ADC_2 | PB[6] |
| 37 | A3 / D16 | A3 Analog in, PDM CLK, GPIO | ADC_4 | PB[1] |
| 41 | A4 / D15 | A4 Analog in, PDM DAT, GPIO | ADC_5 | PB[2] |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | ADC_6 | PB[3] |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | ADC_3 | PB[7] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | ADC_7 | PA[20] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 | ADC_6 | PB[3] |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits
- SoM pin 43 (A5) on the M-SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A5 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at boot by the MCU.

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M-SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}

### UART serial

{{!-- BEGIN do not edit content below, it is automatically generated d3ffb099-2b14-45d6-b006-71efef7af3ff --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Serial1 (TX) | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Serial1 (RX)  | PA[13] |
| 40 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Serial1 (CTS)  | PA[15] |
| 42 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Serial1 (RTS)  | PA[14] |
| 58 | D24 | D24 GPIO, Serial2 TX, do not pull down at boot | Serial2 (TX)  | PA[7] |
| 60 | D25 | GPIO25, Serial2 RX | Serial2 (RX)  | PA[8] |


{{!-- END do not edit content above, it is automatically generated--}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- Serial1 uses the RTL872x UART_LOG peripheral
- Serial2 uses the RTL872x HS_UART0 peripheral
- Supported baud rates: 110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, 76800, 115200, 128000, 153600, 230400, 380400, 460800, 500000, 921600, 1000000, 1382400, 1444400, 1500000, 1843200, 2000000, 2100000, 2764800, 3000000, 3250000, 3692300, 3750000, 4000000, 6000000



### SPI

{{!-- BEGIN do not edit content below, it is automatically generated fd3eed60-17cc-4294-9a39-7f3d01bf7487 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | SPI1 (MOSI) | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | SPI1 (MISO) | PA[13] |
| 40 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | SPI1 (SS) | PA[15] |
| 42 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | SPI1 (SCK) | PA[14] |
| 48 | D8 | D8 GPIO, SPI SS | SPI (SS) | PA[19] |
| 50 | MISO / D11 | D11 GPIO, PWM, SPI MISO | SPI (MISO) | PA[17] |
| 52 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | SPI (MOSI) | PA[16] |
| 54 | SCK / D13 | D13 GPIO, SPI SCK | SPI (SCK) | PA[18] |


{{!-- END do not edit content above, it is automatically generated--}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- SPI uses the RTL872x SPI0 peripheral (50 MHz maximum speed)
- SPI1 uses the RTL872x SPI1 peripheral (25 MHz maximum speed)
- Note: The P2/Photon 2 maximum speeds for SPI and SPI1 are reversed from the M-SoM

Even though the B-SoM and M-SoM both have two SPI interfaces, note that the M-SoM SPI1 is on different pins.

{{!-- BEGIN do not edit content below, it is automatically generated 89fcdf38-5b12-43fa-b306-72a4262c913e --}}

| Pin | B-SoM Pin Name | B-SoM SPI | M-SoM Pin Name | M-SoM SPI |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | &nbsp; | TX / D9 | SPI1 (MOSI) |
| 38 | RX / D10 | &nbsp; | RX / D10 | SPI1 (MISO) |
| 40 | D3 | SPI1 (MOSI) | D3 | SPI1 (SS) |
| 42 | D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| 48 | D8 | SPI (SS) | D8 | SPI (SS) |
| 50 | MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| 52 | MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| 54 | SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| 66 | D4 | SPI1 (MISO) | D4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}



### I2C

{{!-- BEGIN do not edit content below, it is automatically generated e673700c-e099-4705-b7be-768efe895a08 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 20 | D1 | D1 GPIO, I2C SCL | Wire (SCL) | PA[31] |
| 22 | D0 | D0 GPIO, I2C SDA | Wire (SDA) | PB[0] |


{{!-- END do not edit content above, it is automatically generated--}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are required for I2C


### PWM

{{!-- BEGIN do not edit content below, it is automatically generated ce50aa3a-b76c-4140-bf85-100dded18864 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | PB[4] |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | PB[5] |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | PA[13] |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | PB[3] |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | PB[7] |
| 50 | MISO / D11 | D11 GPIO, PWM, SPI MISO | PA[17] |
| 52 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | PA[16] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 | PB[3] |
| 66 | D4 | D4 GPIO, PWM | PB[18] |
| 68 | D5 | D5 GPIO, PWM, I2S TX | PB[19] |
| 70 | D6 | D6 GPIO, PWM, I2S CLK | PB[20] |
| 72 | D7 | D7 GPIO, PWM, I2S WS | PB[21] |


{{!-- END do not edit content above, it is automatically generated--}}

- All available PWM pins on the M-SoM share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### PDM 

Pulse density modulation digital microphones can be used with the [Microphone_PDM](https://github.com/particle-iot/Microphone_PDM) library 
and the M-SoM, but only on specific pins:

{{!-- BEGIN do not edit content below, it is automatically generated b97d7e7b-d462-4687-8371-96e0150b106f --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 37 | A3 / D16 | A3 Analog in, PDM CLK, GPIO | PB[1] |
| 41 | A4 / D15 | A4 Analog in, PDM DAT, GPIO | PB[2] |


{{!-- END do not edit content above, it is automatically generated--}}


### USB

The M-SoM supports a USB interface for programming the device and for USB serial (CDC) communications. The module itself does not contain a USB connector; you typically add a micro USB or USB C connector on your base board. It is optional but recommended.

{{!-- BEGIN do not edit content below, it is automatically generated 15c79387-e8a2-418b-886f-a9439e41663b --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 11 | USBDATA+ | USB Data+ | PA[26] |
| 13 | USBDATA- | USB Data- | PA[25] |
| 44 | CELL USBD+ | Cellular Modem USB Data+ | &nbsp; |
| 46 | CELL USBD- | Cellular Modem USB Data- | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}

- The CELL USB connector does not need to be populated on your board. It is used for reprogramming the cellular modem firmware, which is rarely done as it often requires recertification of the device.

### RGB LED

The M-SoM supports an external common anode RGB LED. 

One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K ohm current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values - 33 ohm on red, and 66 ohm on green and blue.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

The use of the RGB LED is optional, however it is highly recommended as troubleshooting the device without the LED is very difficult.

{{!-- BEGIN do not edit content below, it is automatically generated 79cc6da1-8165-49c1-914d-e39064a9ed06 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 61 | RGBR | RGB LED Red | PA[30] |
| 63 | RGBG | RGB LED Green | PB[23] |
| 65 | RGBB | RGB LED Blue | PB[22] |


{{!-- END do not edit content above, it is automatically generated --}}

- On the M-SoM, Pin RGBR (PA[30]) has a 10K hardware pull-up in the module because it's a trap pin that controls the behavior of the internal 1.1V regulator. This does not affect the RGB LED but could affect your design if you are repurposing this pin as GPIO. You must not hold this pin low at boot.

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated e39d39e4-5349-44b3-9aaa-989469037cd45 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 43 | A5 / D14 | SWCLK. 40K pull-down at boot. | PB[3] |
| 53 | A5 / D14 | SWCLK. 40K pull-down at boot. | PB[3] |
| 55 | D27 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | PA[27] |
| 58 | D24 | Low at boot triggers ISP flash download | PA[7] |
| 60 | D25 | Goes high at boot | PA[8] |
| 61 | RGBR | Low at boot triggers trap mode | PA[30] |


{{!-- END do not edit content above, it is automatically generated --}}


### BLE (Bluetooth LE)

If you wish to use Wi-Fi on the M-SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.

BLE 5.3 BLE Central Mode and BLE Peripheral Mode are supported. 

Full-speed BLE modes such as A2DP used for BLE audio are not supported.

Wi-Fi and BLE share the same antenna so you do not need to include a separate antenna to use both.

### Sleep

The M-SoM can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The M-SoM can only wake from `HIBERNATE` sleep mode on certain pins, `RISING`, `FALLING`, or `CHANGE`.

The M-SoM preserves the state of outputs during `STOP` or `ULTRA_LOW_POWER` sleep mode. In `HIBERNATE`, outputs are high-impedance.


{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Pin can wake from HIBERNATE sleep | PA[13] |
| 40 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Pin can wake from HIBERNATE sleep | PA[15] |
| 42 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Pin can wake from HIBERNATE sleep | PA[14] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Pin can wake from HIBERNATE sleep | PA[20] |
| 48 | D8 | D8 GPIO, SPI SS | Pin can wake from HIBERNATE sleep | PA[19] |
| 50 | MISO / D11 | D11 GPIO, PWM, SPI MISO | Pin can wake from HIBERNATE sleep | PA[17] |
| 52 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | Pin can wake from HIBERNATE sleep | PA[16] |
| 54 | SCK / D13 | D13 GPIO, SPI SCK | Pin can wake from HIBERNATE sleep | PA[18] |


{{!-- END do not edit content above, it is automatically generated  --}}


Most pins can use `INPUT_PULLUP` or `INPUT_PULLDOWN` in sleep modes. The exception is `HIBERNATE` sleep mode where pin D21 can only use an external hardware pull-up or pull down. It also cannot be used to wake from hibernate sleep mode.

{{!-- BEGIN do not edit content below, it is automatically generated c9bab6c3-be4f-44e8-aea3-d1a738422b13 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO, I2S RX | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |


{{!-- END do not edit content above, it is automatically generated  --}}



### SETUP and RESET button

It is highly recommended that you add MODE (SETUP) and RESET buttons to your base board using momentary switches that connect to GND. These are necessary to change the operating mode of the device, for example to enter listening or DFU mode.

{{!-- BEGIN do not edit content below, it is automatically generated e39d39e4-5349-44b3-9aaa-989469037cd4 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 32 | MODE | MODE button. Pin number constant is BTN. External pull-up required! | PA[11] |
| 34 | RST | Hardware reset, active low. External pull-up required. | CHIP_EN |


{{!-- END do not edit content above, it is automatically generated --}}

The MODE button does not have a hardware pull-up on it, so you must add an external pull-up (2.2K to 10K) to 3V3, or connect it to 3V3 if not using a button. 

The RST pin does have an internal weak pull-up, but you may want to add external pull-up on that as well, especially if you use an off-board reset button connected by long wires.

### Supervisory reset

{{!-- BEGIN shared-blurb c57e3927-686d-4a58-9a39-cd60a1ebc0bd --}}

In many cases, it may be desirable to include a supervisory reset IC in your design. The design below is from
the Photon 2 and uses the small and inexpensive Richtec RT9818C. This chip will hold the MCU in reset until there 
is sufficient voltage to successfully boot. This can be helpful if your power supply cannot guarantee a sufficient slew
rate.

![](/assets/images/m-series/p2-reset.png)

Of note in this design, the VDD pin of the RT9818C is connected to 3V3. The design is configurable by 
moving a zero-ohm resistor to disable supervisory reset (by connecting to GND) or to use VIN. Note that the
RT9818C has a maximum input voltage of 6V which is compatible with the Photon 2. Keep this in mind if using VIN
on designs that have larger VIN voltages.

Of course you can simply wire VDD to 3V3 instead of including the configurable resistors.
{{!-- END shared-blurb --}}


### PMIC Notes

{{!-- BEGIN shared-blurb b3247dfa-acbd-4e81-a50d-a5ab68220636 --}}
When using the M-SoM with a bq24195 PMIC, note the following:

By default, the bq24195 sets the input current limit, which affects powering by VIN and VUSB, to 100 mA. This affects the VSYS output of the PMIC, which powers both the cellular modem and 3V3 supply, and is not enough to power the M-SoM in normal operation.

If your device has the default firmware (Tinker), it will attempt to connect to the cloud, brown out due to insufficient current, then the device will reset. This may result in what appears to be the status LED blinking white, but is actually rolling reboot caused by brownout.

A factory new M-SoM does not enable the PMIC setup. To enable the use of the bq21415, you must enable the system power feature [PMIC_DETECTION](/reference/device-os/api/power-manager/systempowerfeature/#systempowerfeature-pmic_detection) in your code. This defaults to off because the M-SoM can be used without a PMIC, or with a different PMIC, and also requires I2C on D0/D1, and some base boards may use those pins as GPIO.

Because the input current limit does not affect the battery input (Li+), for troubleshooting purposes it can be helpful to attach a battery to help rule out input current limit issues. It's also possible to supply 3.7V via a bench power supply to the battery input, instead of VIN. 

The input current limit can result in a situation where you can't bring up a M-SoM because it browns out continuously, but also cannot flash code to it to stop if from browning out. There are two general solutions:

- Attach a battery or supply by Li+ when bringing up a board.
- Use SWD/JTAG and reset halt the MCU. This will prevent it from connecting to the cloud, so you can flash Device OS and firmware to it by SWD.

The input current limit is actually controlled by three factors:

- The [power source max current setting](/reference/device-os/api/power-manager/powersourcemaxcurrent-systempowerconfiguration/) in the PMIC. The default is 900 mA. It can be set to 100, 150, 500, 900, 1200, 1500, 2000, or 3000 mA.
- It is also limited by the hardware ILIM resistor. On Particle devices with a built-in PMIC, this is set to 1590 mA, but if you are implementing your own PMIC hardware, you can adjust this higher.
- When connected by USB, it will use DPDM, current negotiation via the USB DP (D+) and DM (D-) lines. 

Note that some 2A tablet chargers and multi-port USB power supplies supply 2A but do not implement DPDM; these will be treated as if VIN was used, and you must set the power source current, otherwise the input current will be limited to 900 mA, which is not enough to power a 2G/3G cellular modem without an attached battery.

{{!-- END shared-blurb --}}

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

### SIM Pins

- The SIM pins should be left unconnected
- You cannot use these pins for an external SIM card, despite their names

{{!-- BEGIN do not edit content below, it is automatically generated dd39756a-80c9-4fc0-8665-7533da96152d --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 69 | SIM_RST | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
| 71 | SIM_CLK | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
| 73 | SIM_DATA | Leave unconnected, 1.8V/3V SIM Data I/O of cellular modem with internal 4.7 k pull-up. |


{{!-- END do not edit content above, it is automatically generated --}}

## Technical specification

{{!-- ### Absolute maximum ratings --}}


{{!-- 
### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
|:-|:-|:-:|:-:|:-:|:-:|
| Operating Temperature | T<sub>op</sub> | -20 |  | +70 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |
--}}

{{!-- ### Wi-Fi Specifications --}}


### I/O Characteristics

{{!-- BEGIN shared-blurb 817be6c6-c2fb-43b0-be1e-c4b5b030b6e2 --}}
| Parameter | Symbol | Min   | Typ   | Peak  | Unit  |
| :-------- | :----- | :---: | :---: | :---: | :---: |
| Input-High Voltage | V<sub>IH</sub> | 2.0 | | | V |
| Input-Low Voltage | V<sub>IL</sub> |  | | 0.8 | V |
| Output drive strength (normal drive) | | | | 4 | mA |
| Output drive strength (high drive) | | | | 12 | mA |
| Total output drive (all pins) | | | | 200 | mA |
{{!-- END shared-blurb --}}


### Power consumption (M524) 

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 26.4 | 26.6 | 26.9 | mA |
| Operating current (uC on, BLE advertising) | I<sub>ble_adv</sub> | 62.9 | 66.1 | 84.2 | mA |
| Operating current (uC on, BLE connected but idle) | I<sub>ble_conn_idle</sub> | 62.4 | 66.7 | 74 | mA |
| Operating current (uC on, BLE scanning) | I<sub>ble_scan</sub> | 50.5 | 57.2 | 87.7 | mA |
| Operating current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 36.7 | 44.4 | 907 | mA |
| Operating current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 40.2 | 97.4 | 840 | mA |
| Operating current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 37 | 43.1 | 132 | mA |
| Operating current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 39.9 | 164 | 851 | mA |
| Operating current (uC on, Wi-Fi on but not connected) | I<sub>wifi_idle</sub> | 26.1 | 26.3 | 26.6 | mA |
| Operating current (uC on, Wi-Fi connecting to access point) | I<sub>wifi_conn_ap</sub> | 44.3 | 67.3 | 298 | mA |
| Operating current (uC on, Wi-Fi connecting to cloud) | I<sub>wifi_conn_cloud</sub> | 61 | 68.2 | 357 | mA |
| Operating current (uC on, Wi-Fi connected but idle) | I<sub>wifi_cloud_idle</sub> | 61.9 | 64.1 | 68.4 | mA |
| Operating current (uC on, Wi-Fi connected and transmitting) | I<sub>wifi_cloud_tx</sub> | 60.1 | 64.8 | 309 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 419 | 421 | 425 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 412 | 415 | 418 | uA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | 419 | 421 | 425 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | 412 | 415 | 418 | uA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 23.9 | 26.1 | 28.6 | uA |
| HIBERNATE mode sleep, RTC wake-up | I<sub>hib_intrtc</sub> | 24.5 | 26.5 | 28.1 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).

### Power consumption (M404) 

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 27.7 | 27.9 | 28.1 | mA |
| Operating current (uC on, BLE advertising) | I<sub>ble_adv</sub> | 65.5 | 69.5 | 85.9 | mA |
| Operating current (uC on, BLE connected but idle) | I<sub>ble_conn_idle</sub> | 65.5 | 70.1 | 77 | mA |
| Operating current (uC on, BLE scanning) | I<sub>ble_scan</sub> | 52.6 | 60.5 | 91.1 | mA |
| Operating current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 36.2 | 159 | 816 | mA |
| Operating current (uC on, cellular on but not connected using LTE Cat M1) | I<sub>cell_idle_catm1</sub> | 41.5 | 46.7 | 217 | mA |
| Operating current (uC on, cellular connecting to tower using LTE Cat M1) | I<sub>cell_conn_twr_catm1</sub> | 39.8 | 43.9 | 131 | mA |
| Operating current (uC on, cellular connecting to cloud using LTE Cat M1) | I<sub>cell_conn_cloud_catm1</sub> | 39.7 | 83.5 | 181 | mA |
| Operating current (uC on, cellular connected but idle using LTE Cat M1) | I<sub>cell_cloud_idle_catm1</sub> | 41.8 | 44.5 | 155 | mA |
| Operating current (uC on, cellular connected and transmitting using LTE Cat M1) | I<sub>cell_cloud_tx_catm1</sub> | 40.1 | 83.6 | 177 | mA |
| Operating current (uC on, cellular on but not connected using 2G) | I<sub>cell_idle_2g</sub> | 38.9 | 44.7 | 1700 | mA |
| Operating current (uC on, cellular connecting to tower using 2G) | I<sub>cell_conn_twr_2g</sub> | 36.9 | 128 | 1700 | mA |
| Operating current (uC on, cellular connecting to cloud using 2G) | I<sub>cell_conn_cloud_2g</sub> | 35.9 | 98.3 | 1740 | mA |
| Operating current (uC on, cellular connected but idle using 2G) | I<sub>cell_cloud_idle_2g</sub> | 35.8 | 40.3 | 114 | mA |
| Operating current (uC on, cellular connected and transmitting using 2G) | I<sub>cell_cloud_tx_2g</sub> | 32 | 152 | 1720 | mA |
| Operating current (uC on, Wi-Fi on but not connected) | I<sub>wifi_idle</sub> | 27.3 | 30.4 | 101 | mA |
| Operating current (uC on, Wi-Fi connecting to access point) | I<sub>wifi_conn_ap</sub> | 25.4 | 68.9 | 353 | mA |
| Operating current (uC on, Wi-Fi connecting to cloud) | I<sub>wifi_conn_cloud</sub> | 59.8 | 109 | 469 | mA |
| Operating current (uC on, Wi-Fi connected but idle) | I<sub>wifi_cloud_idle</sub> | 61.6 | 64.5 | 184 | mA |
| Operating current (uC on, Wi-Fi connected and transmitting) | I<sub>wifi_cloud_tx</sub> | 60.7 | 64.9 | 349 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 542 | 547 | 551 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 512 | 515 | 518 | uA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | 542 | 547 | 551 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | 512 | 515 | 518 | uA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 41.9 | 44 | 45.8 | uA |
| HIBERNATE mode sleep, RTC wake-up | I<sub>hib_intrtc</sub> | 41.1 | 43.4 | 45.3 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).


### Power consumption (M635)

To be determined at a later date. When operated on LTE Cat M1 or 2G, should be similar to M404.


### Radio specifications


#### Realtek RTL872x for Wi-Fi 2.4 GHz

{{!-- BEGIN shared-blurb 6a81f804-a969-462d-8ac6-1d7601b7f814 --}}
| Feature | Description | Minimum | Typical | Maximum | Unit |
| :------ | :---------- | :------ | :------ | :------ | :--- |
| Frequency Range | Center channel | 2412 | - | 2484 | MHz |
| Output power | 1 Mbps CCK | - | 20 | 21 | dBM |
|              | 11 Mbps CCK | - | 18 | 21 | dBM |
|              | BPSK rate 1/2, 6Mbps OFDM | - | 20 | 21 | dBM |
|              | 64QAM rate 3/4, 54Mbps OFDM | - | 17 | 18 | dBM |
|              | HT20-MCS 0, BPSK rate 1/2 | - | 19 | 20 | dBM |
|              | HT20-MCS 7, 64QAM rate 5/6 | - | 16 | 17 | dBM |
|              | HT40-MCS 0, BPSK rate 1/2 | - | 19 | 20 | dBM |
|              | HT40-MCS 7, 64QAM rate 5/6 | - | 16 | 17 | dBM |
| Tx EVM       | BPSK rate 1/2, 6Mbps OFDM | - | - | -5 | dB |
|              | 64QAM rate 3/4, 54Mbps OFDM | - | - | -25 | dB |
|              | HT20-MCS 0, BPSK rate 1/2 | - | - | -5 | dB |
|              | HT20-MCS 7, 64QAM rate 5/6 | - | - | -28 | dB |
|              | HT40-MCS 0, BPSK rate 1/2 | - | - | -5 | dB |
|              | HT40-MCS 7, 64QAM rate 5/6 | - | - | -28 | dB |
| Output power variation | | -1.5 | - | 1.5 | dBm |
| Carrier suppression | | - | - | -30 | dBm |
{{!-- END shared-blurb --}}


#### Realtek RTL872x for Wi-Fi 5 GHz

{{!-- BEGIN shared-blurb c98cb3af-178e-4fa5-86ad-3a7c07c21f8d --}}
| Feature | Description | Minimum | Typical | Maximum | Unit |
| :------ | :---------- | :------ | :------ | :------ | :--- |
| Frequency Range | Center channel | 5180 | - | 5825 | MHz |
| Output power | BPSK rate 1/2, 6Mbps OFDM | - | 19 | 19 | dBM |
|              | 64QAM rate 3/4, 54Mbps OFDM | - | 14 | 15 | dBM |
|              | HT20-MCS 0, BPSK rate 1/2 | - | 17 | 18 | dBM |
|              | HT20-MCS 7, 64QAM rate 5/6 | - | 13 | 14 | dBM |
|              | HT40-MCS 0, BPSK rate 1/2 | - | 17 | 18 | dBM |
|              | HT40-MCS 7, 64QAM rate 5/6 | - | 13 | 14 | dBM |
| Tx EVM       | BPSK rate 1/2, 6Mbps OFDM | - | - | -5 | dB |
|              | 64QAM rate 3/4, 54Mbps OFDM | - | - | -25 | dB |
|              | HT20-MCS 0, BPSK rate 1/2 | - | - | -5 | dB |
|              | HT20-MCS 7, 64QAM rate 5/6 | - | - | -28 | dB |
|              | HT40-MCS 0, BPSK rate 1/2 | - | - | -5 | dB |
|              | HT40-MCS 7, 64QAM rate 5/6 | - | - | -28 | dB |
| Output power variation | | -1.5 | - | 1.5 | dBm |
| Carrier suppression | | - | - | -30 | dBm |
{{!-- END shared-blurb --}}


#### Realtek RTL872x for BLE

{{!-- BEGIN shared-blurb 92c3a675-6497-44eb-b38e-f5ecbd7cdc13 --}}
| Feature | Description | Minimum | Typical | Maximum | Unit |
| :------ | :---------- | :------ | :------ | :------ | :--- |
| Frequency Range |  | 2402 | - | 2480 | MHz |
| Tx Output power |  | -10 | 4.5 |  | dBM |
{{!-- END shared-blurb --}}

#### Cellular characteristics for BG95-M5 (M404)

{{!-- BEGIN shared-blurb bb8991bb-bb5f-4cd3-9966-39311448d382 --}}
| Parameter | Value |
| --- | --- |
| Protocol stack | 3GPP Release 14 |
| RAT | LTE Cat M1 |
| LTE FDD Bands  | Band 12 (700 MHz) |
| | Band 13 (700 MHz) |
| | Band 28 (700 MHz) |
| | Band 20 (800 MHz)  |
| | Band 5 (850 MHz)  |
| | Band 26 (850 MHz)  |
| | Band 8 (900 MHz)  |
| | Band 4 (1700 MHz)  |
| | Band 3 (1800 MHz)  |
| | Band 2 (1900 MHz)  |
| | Band 25 (1900 MHz)  |
| | Band 1 (2100 MHz)  |
| | Band 66 (2100 MHz)  |
| GSM Bands | GSM850 (850 MHz) |
| | EGSM900 (900 MHz) |
| | DCS1800 (1800 MHz) |
| | PCS1900 (1900 MHz) |
| Power class | Class 4 (33dBm ± 2dB) for GSM850 | |
| | Class 4 (33dBm ± 2dB) for EGSM900 |
| | Class 1 (30dBm ± 2dB) for DCS1800 |
| | Class 1 (30dBm ± 2dB) for PCS1900 |
| | Class E2 (27dBm ± 3dB) for GSM850 8-PSK |
| | Class E2 (27dBm ± 3dB) for EGSM900 8-PSK |
| | Class E2 (26dBm ± 3dB) for DCS1800 8-PSK |
| | Class E2 (26dBm ± 3dB) for PCS1900 8-PSK |
| | Class 3 (23dBm ± 2dB) for LTE FDD bands |
{{!-- END shared-blurb --}}


#### Cellular characteristics for EG91-EX (M524)

{{!-- BEGIN shared-blurb 5056bd6b-9e89-4f27-a3b5-9c9b5346cbc1 --}}
| Parameter | Value |
| --- | --- |
| Protocol stack | 3GPP Release 13 |
| RAT | LTE Cat 1 |
| LTE FDD Bands | Band 28A (700 MHz) |
| | Band 20 (800 MHz)  |
| | Band 8 (900 MHz)  |
| | Band 3 (1800 MHz)  |
| | Band 1 (2100 MHz)  |
| | Band 7 (2600 MHz)  |
| WCDMA Bands | Band 8 (900 MHz) | 
| | Band 1 (2100) |
| GSM Bands | EGSM900 (900 MHz) |
| | DCS1800 (1800 MHz) |
| Power class | Class 4 (33dBm ± 2dB) for EGSM900 |
| | Class 1 (30dBm ± 2dB) for DCS1800 |
| | Class E2 (27dBm ± 3dB) for EGSM900 8-PSK |
| | Class E2 (26dBm ± 3dB) for DCS1800 8-PSK |
| | Class 3 (24dBm ± 3dB) for WCDMA bands |
| | Class 3 (23dBm ± 2dB) for LTE FDD bands |
{{!-- END shared-blurb --}}


## Mechanical specifications


{{!-- ### Dimensions and Weight --}}


### Mechanical drawing

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

Dimensions are in millimeters.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

One compatible connector is the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html). It is widely available including at suppliers such as [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916).

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}

A device, footprint, and symbol for EagleCAD are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries).

---

### Screw Assembly

The M.2 SoM requires a screw to hold the SoM in place because the M.2 connector does not have integrated locks and the SoM will pop up if not attached to the base board. The screw also provides better vibration resistance than locking clips.

- This is one style of standoff.

![Screw Assembly](/assets/images/b-series/new-standoff.png)

- An [alternative design](/hardware/som/som-first-board/#hold-down-screw) uses a [JAE SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) standoff. It's reflow soldered to your base board and has a threaded hole for a M2*3 screw to hold down the SoM. This may be easier to obtain.

The screw should be connected to the ground plane on your base board.

### Design Considerations

We strongly recommend against placing components under the SOM board because there is not enough height.

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

### Reference design

The [M.2 breakout board design](https://github.com/particle-iot/m2-breakout-board/) design files for EagleCAD are available as a reference design.

## Product Handling

### ESD Precautions
The M-SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an M-SoM without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the Particle M-SoM. ESD precautions should be implemented on the application board where the M-SoM is mounted. Failure to observe these precautions can result in severe damage to the M-SoM!

### Connectors

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The M.2 edge connector is static sensitive and should be handled carefully. The M.2 connector is not designed for repeated removal and insertion of the module.



---

## Default settings

The M-SoM comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.

---

## FCC ISED CE Warnings and End Product Labeling Requirements

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

* Contains FCC ID: 2AEMI-M404

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.


**Outdoor Use (US)**

To be compliant to FCC §15.407(a) the EIRP is not allowed to exceed 125 mW
(21 dBm) at any elevation angle above 30° (measured from the horizon) when operated as an
outdoor access point in U-NII-1 band, 5.150-5.250 GHz. 


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

 * Contains transmitter module ISED: 20127-M524
 
This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.


**Outdoor use (CA)**

- Operation in the band 5150–5250 MHz is only for indoor use to reduce the potential for harmful
interference to co-channel mobile satellite systems;
- Operation in the 5600-5650 MHz band is not allowed in Canada. High-power radars are allocated
as primary users (i.e., priority users) of the bands 5250-5350 MHz and 5650-5850 MHz and that
these radars could cause interference and/or damage to LE-LAN devices.

---

- Le dispositif de fonctionnement dans la bande 5150-5250 MHz est réservé à une utilisation en
intérieur pour réduire le risque d'interférences nuisibles à la co-canal systèmes mobiles par
satellite
- Opération dans la bande 5600-5650 MHz n'est pas autorisée au Canada. Haute puissance radars
sont désignés comme utilisateurs principaux (c.-àutilisateurs prioritaires) des bandes 5250-5350
MHz et 5650-5850 MHz et que ces radars pourraient causer des interférences et / ou des
dommages à dispositifs LAN-EL.


### European Union (CE)

### M404 - European Union (CE)

We, Particle Industries, Inc, declare under our sole responsibility that the product, M404, to which this declaration relates, is in conformity with RED Directive 2014/53/EU and (EU) 2015/863 RoHS Directive 2011/65/EU (Recast).

The full text of the EU declaration of conformity is available at the followingInternet address: 
[https://www.particle.io/](https://www.particle.io/)

Radiation Exposure Statement: This equipment complies with radiation exposure limits set forth for an uncontrolled environment.

The operating frequency bands and the maximum transmitted power limit are listed below:
- BLE 2402-2480MHz 10dBm
- Wi-Fi 2.4GHz band 2412-2484MHz 20dBm
- Wi-Fi 5GHz band 5180-5825MHz 23dBm
- LTE B1 B3 B8 B20 B28 704.5-959.3MHz 1710.7-2687.5 MHz, 25dBm

### M524 - European Union (CE)

We, Particle Industries, Inc, declare under our sole responsibility that the product, M524, to which this declaration relates, is in conformity with RED Directive 2014/53/EU and (EU) 2015/863 RoHS Directive 2011/65/EU (Recast).

The full text of the EU declaration of conformity is available at the followingInternet address: 
[https://www.particle.io/](https://www.particle.io/)

Radiation Exposure Statement: This equipment complies with radiation exposure limits set forth for an uncontrolled environment.

The operating frequency bands and the maximum transmitted power limit are listed below:
- BLE 2402-2480MHz 10dBm
- Wi-Fi 2.4GHz band 2412-2484MHz 20dBm
- Wi-Fi 5GHz band 5180-5825MHz 23dBm
- LTE B1 B3 B7 B8 B20 B28 704.5-959.3MHz 1710.7-2687.5 MHz, 25dBm
- WCDMA 882.4-957.6 MHz 1922.6-2167.4 MHz, 25dBm
- EGSM900 880-915 MHz, 33 dBm
- DCS1800 1710-1785 MHz, 30 dBm


### United Kingdom

UKCA Conformity:

Radio Equipment Regulations 2017 (S.I. 2017/1206)

### Outdoor use (world)

This device is restricted to indoor use when operating in the 5150 to 5350
MHz frequency range. This restriction applies in: AT, BE, BG, CH, CY, CZ, DE,
DK, EE, EL, ES, FI, FR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO,
SE, SI, SK, TR, UA, UK(NI).

---

## Certification documents

{{!-- BEGIN shared-blurb 8d11397b-ce65-41f3-8a2a-70bad7cf18c3 --}}
### FCC (United States) - M404 M-SoM M-Series LTE-M/2G

- FCC ID: 2AEMI-M404
- [Part 15B](/assets/pdfs/m404-fcc-part15b.pdf)
- [Part 15C, Digital Transmission System 2.4 GHz](/assets/pdfs/m404-fcc-DTS.pdf)
- [Part 15E, Unlicensed national information infrastructure TX, 5 GHz](/assets/pdfs/m404-fcc-part15e.pdf)
- [Part 15B, Part 15 Class B Computing Device Peripheral](/assets/pdfs/m404-fcc-JBP.pdf)
- [Part 22H, 24E, 27, PCS Licensed Transmitter](/assets/pdfs/m404-fcc-PCB.pdf)

### ISED (Canada) - M404 M-SoM M-Series LTE-M/2G

- ISED: 20127-M504
- [Certificate](/assets/pdfs/m404-ised-certificate.pdf)
- [Test Report RS-130](/assets/pdfs/m404-ic-rs130.pdf)
- [Test Report RS-132](/assets/pdfs/m404-ic-rs132.pdf)
- [Test Report RS-133](/assets/pdfs/m404-ic-rs133.pdf)
- [Test Report RS-139](/assets/pdfs/m404-ic-rs139.pdf)
- [ICES-003 Issue 7:2020](/assets/pdfs/m404-ic-ices003.pdf)
- [Test Report RS-102](/assets/pdfs/m404-ic-rs102.pdf) (RF Exposure)


### CE (European Union) - M404 M-SoM M-Series LTE-M/2G

- [Summary](/assets/pdfs/m404-ce-summary.pdf)
- [EN-62368-1 Test Report](/assets/pdfs/m404-EN-62368-1-test-report.pdf)
- [EN 300 328 Test Report BLE](/assets/pdfs/m404-EN300-328-ble-test-report.pdf) (Bluetooth LE 2.4 GHz ISM band)
- [EN 300 328 Test Report Wi-Fi](/assets/pdfs/m404-EN300-328-wifi-test-report.pdf) (Wi-Fi 2.4 GHz ISM band)
- [EN 300 440 Test Report Wi-Fi](/assets/pdfs/m404-EN300-440-wifi-test-report.pdf) (Wi-Fi 5 GHz)
- [EN 301 893 Test Report Wi-Fi](/assets/pdfs/m404-EN301-893-wifi-test-report.pdf) (Wi-Fi 5 GHz)
- [EN 301 893 Test Report DFS](/assets/pdfs/m404-EN301-893-dfs-test-report.pdf) (Dynamic frequency selection clause 4.2.6)
- [EN 303 413 Test Report](/assets/pdfs/m404-EN303-413-gnss-test-report.pdf) (GNSS)
- [EN 301 489 Test Report](/assets/pdfs/m404-EN301-489-test-report.pdf)
- [EN 301 511 Test Report](/assets/pdfs/m404-EN301-511-test-report.pdf) (GSM)
- [EN 301 908 Test Report](/assets/pdfs/m404-EN301-908-test-report.pdf) 
- [EN-62311 Test Report](/assets/pdfs/m404-EN62311-test-report.pdf)
- [Test Report Photos](/assets/pdfs/m404-test-photos.pdf)



### RoHS - M404 M-SoM M-Series LTE-M/2G

- [RoHS 3.0 Test Reports](/assets/pdfs/m404-rohs.pdf)
{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 8f4d899f-2ed4-47fc-9b45-e28fd55e245c --}}

### CE (European Union) - M524 M-SoM M-Series LTE Cat 1

- [Summary](/assets/pdfs/m524-ce-summary.pdf)
- [EN-62368-1 Test Report](/assets/pdfs/m524-EN-62368-1-test-report.pdf)
- [EN 300 328 Test Report BLE](/assets/pdfs/m524-EN300-328-ble-test-report.pdf) (Bluetooth LE 2.4 GHz ISM band)
- [EN 300 328 Test Report Wi-Fi](/assets/pdfs/m524-EN300-328-wifi-test-report.pdf) (Wi-Fi 2.4 GHz ISM band)
- [EN 301 893 Test Report Wi-Fi](/assets/pdfs/m524-EN301-893-wifi-test-report.pdf) (Wi-Fi 5 GHz)
- [EN 300 440 Test Report Wi-Fi](/assets/pdfs/m524-EN300-440-wifi-test-report.pdf) (Wi-Fi 5 GHz)
- [EN 301 893 Test Report DFS](/assets/pdfs/m524-EN301-893-dfs-test-report.pdf) (Dynamic frequency selection clause 4.2.6)
- [EN 303 413 Test Report](/assets/pdfs/m524-EN303-413-gnss-test-report.pdf) (GNSS)
- [EN 301 489 Test Report](/assets/pdfs/m524-EN301-489-test-report.pdf)
- [EN 301 511 Test Report](/assets/pdfs/m524-EN301-511-test-report.pdf) (GSM)
- [EN 301 908 Test Report](/assets/pdfs/m524-EN301-908-test-report.pdf) 
- [EN-62311 Test Report](/assets/pdfs/m524-EN62311-test-report.pdf)
- [Test Report Photos](/assets/pdfs/m524-test-photos.pdf)



### RoHS - M524 M-SoM M-Series LTE Cat 1

- [RoHS 3.0 Test Reports](/assets/pdfs/m524-rohs.pdf)
{{!-- END shared-blurb --}}

---

## Country compatibility

### M404 - Country compatibility


{{!-- BEGIN do not edit content below, it is automatically generated 291c6e45-3647-412b-8e38-47d29d5b4a83 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | M404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | M404 | M1 | AT&T, Telcel |
| United States | M404 | M1 | AT&T, T-Mobile (USA), Verizon<sup>7</sup> |


{{!-- END do not edit content above, it is automatically generated  --}}

The M404 is fully supported in the United States, Canada, and Mexico. It is in beta testing in other locations. See the [carrier list](/reference/cellular/cellular-carriers/?tab=Msom&region=byRegion) for country compatibility information.

### M404 - Certified bands

| Technology | Band | FCC | CE |
| :--- | :--- | :---: | :---: |
| 2G | 850 MHz | &check; | &nbsp; |
| 2G | 900 MHz | &nbsp; | &nbsp; |
| 2G | 1800 MHz | &nbsp; | &nbsp; |
| 2G | 1900 MHz | &check; | &nbsp; |
| LTE Cat M1 | B1 (2100 MHz) | | &check;|
| LTE Cat M1 | B2 (1900 MHz) | &check; | |
| LTE Cat M1 | B3 (1800 MHz) | | &check;|
| LTE Cat M1 | B4 (1700 MHz) | &check;| |
| LTE Cat M1 | B5 (850 MHz) | &check;| |
| LTE Cat M1 | B8 (900 MHz) | | &check;|
| LTE Cat M1 | B12 (700 MHz) | &check;| |
| LTE Cat M1 | B13 (700 MHz) | &check;| |
| LTE Cat M1 | B20 (800 MHz) | | &check;|
| LTE Cat M1 | B25 (1900 MHz) | &check;| |
| LTE Cat M1 | B26 (850 MHz) | &check;| |
| LTE Cat M1 | B28 (700 MHz) | | &check;|
| LTE Cat M1 | B66 (2100 MHz) | &check;| |



### M524 - Country compatibility


{{!-- BEGIN do not edit content below, it is automatically generated da2ba229-df4a-4df6-a0a5-d74444b8d5c1 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Albania | M524 | 2G, 3G, 4G | Eagle, Telekom, Vodafone |
| Algeria | M524 | 2G, 3G, 4G | Mobilis, Ooredoo |
| Aruba | M524 | 2G, 3G, 4G | Setar |
| Australia | M524 | 4G | Optus, Telstra, Vodafone |
| Austria | M524 | 2G, 4G | 3 (Drei), A1, T-Mobile |
| Bahrain | M524 | 2G, 4G | Zain |
| Bangladesh | M524 | 2G, 3G, 4G | Bangalink, GrameenPhone |
| Belarus | M524 | 2G, 3G, 4G | A1 |
| Belgium | M524 | 2G, 4G | Base, Orange, Proximus |
| Bosnia and Herzegovina | M524 | 2G, 3G | HT Eronet |
| Botswana | M524 | 2G, 3G, 4G | BeMobile |
| Brunei | M524 | 3G, 4G | DST |
| Bulgaria | M524 | 2G, 3G | A1, Telenor, Vivacom |
| Burkina Faso | M524 | 2G, 3G, 4G | Orange |
| Cabo Verde | M524 | 2G, 3G, 4G | CVMóvel, Unitel T+ |
| Cambodia | M524 | 2G, 3G | Metfone |
| Chad | M524 | 2G, 3G, 4G | Airtel |
| Chile | M524 | 3G, 4G | Claro, Entel, Movistar |
| Congo (Brazzaville) | M524 | 2G, 3G, 4G | Airtel |
| Congo (Kinshasa) | M524 | 2G, 3G, 4G | Airtel |
| Côte d'Ivoire | M524 | 2G, 3G | MTN |
| Croatia | M524 | 2G, 3G, 4G | Hrvatski Telekom, Tele2 |
| Cyprus | M524 | 2G, 3G, 4G | MTN, PrimeTel |
| Czechia | M524 | 2G, 4G | O2, T-Mobile, Vodafone |
| Denmark | M524 | 2G, 4G | 3 (Tre), TDC, Telenor, Telia |
| Egypt | M524 | 2G, 3G, 4G | Etisalat, Orange |
| Estonia | M524 | 2G, 3G, 4G | Elisa, Tele2, Telia |
| eSwatini | M524 | 2G, 3G, 4G | MTN |
| Ethiopia | M524 | 2G, 3G, 4G | Ethio Telecom |
| Faroe Islands | M524 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | M524 | 2G, 4G | DNA, Elisa, Telia |
| France | M524 | 2G, 3G, 4G | Bouygues, Free Mobile, Orange, SFR |
| French Guiana | M524 | 2G, 3G | Digicel |
| Gabon | M524 | 2G, 3G, 4G | Airtel |
| Germany | M524 | 2G, 3G, 4G | O2, Telekom, Vodafone |
| Ghana | M524 | 2G, 3G, 4G | AirtelTigo, MTN, Vodafone |
| Gibraltar | M524 | 2G, 3G, 4G | Gibtel |
| Greece | M524 | 2G, 4G | Cosmote, Vodafone, Wind |
| Guinea | M524 | 2G, 3G, 4G | MTN |
| Guinea-Bissau | M524 | 2G, 3G, 4G | MTN |
| Guyana | M524 | 2G | Digicel |
| Hong Kong | M524 | 3G, 4G | CMHK, CSL, SmarTone |
| Hungary | M524 | 2G, 3G, 4G | Magyar Telekom, Telenor, Vodafone |
| Iceland | M524 | 4G | Nova, Siminn, Vodafone |
| Indonesia | M524 | 2G, 3G, 4G | Indosat, Telkomsel, XL Axiata |
| Ireland | M524 | 2G, 3G, 4G | 3 (Tre), Meteor, O2, Vodafone |
| Israel | M524 | 2G, 3G, 4G | Hot Mobile, Orange, Pelephone |
| Italy | M524 | 2G, 3G, 4G | TIM, Vodafone, Wind |
| Jordan | M524 | 2G, 3G, 4G | Zain |
| Kazakhstan | M524 | 2G, 3G, 4G | Beeline, K-Cell |
| Kenya | M524 | 2G, 3G, 4G | Airtel |
| Kuwait | M524 | 2G, 3G, 4G | Viva, Zain |
| Latvia | M524 | 2G, 4G | Bite, LMT, Tele2 |
| Liechtenstein | M524 | 2G, 3G, 4G | Mobilkom, Orange |
| Lithuania | M524 | 2G, 4G | Bite, Omnitel, Tele2 |
| Luxembourg | M524 | 2G, 4G | Orange, POST, Tango |
| Macao | M524 | 3G, 4G | CTM |
| Madagascar | M524 | 2G, 3G, 4G | Airtel |
| Malawi | M524 | 2G, 3G, 4G | Airtel |
| Malaysia | M524 | 2G, 3G, 4G | Celcom, DiGi, Maxis |
| Malta | M524 | 2G, 3G, 4G | Go Mobile, Vodafone |
| Moldova | M524 | 2G, 3G, 4G | Moldcell, Orange |
| Mongolia | M524 | 2G, 3G | Mobicom, Unitel |
| Montenegro | M524 | 2G, 3G, 4G | Mtel, T-Mobile, Telenor |
| Morocco | M524 | 2G, 3G, 4G | Inwi, Medi Telecom |
| Mozambique | M524 | 2G, 3G, 4G | Vodacom |
| Myanmar | M524 | 2G, 3G | MPT |
| Namibia | M524 | 2G, 3G, 4G | Telecom Namibia |
| Netherlands | M524 | 2G, 3G, 4G | KPN, T-Mobile, Vodafone |
| New Zealand | M524 | 3G, 4G | 2degrees, Spark, Vodafone |
| Nigeria | M524 | 2G, 3G, 4G | 9mobile, Airtel, Glo, MTN |
| Norway | M524 | 2G, 3G, 4G | TDC, Telenor, Telia |
| Pakistan | M524 | 2G, 3G, 4G | Mobilink, Telenor, Ufone, Warid |
| Palestine | M524 | 2G, 3G | Jawwal |
| Papua New Guinea | M524 | 2G, 3G | bmobile |
| Poland | M524 | 2G, 3G, 4G | Orange, Play, Plus, T-Mobile |
| Portugal | M524 | 2G, 3G, 4G | NOS, TMN, Vodafone |
| Qatar | M524 | 2G, 3G, 4G | Ooredoo, Vodafone |
| Romania | M524 | 2G, 4G | Orange, Telekom Romania, Vodafone |
| Rwanda | M524 | 2G, 3G | Airtel, MTN |
| Serbia | M524 | 2G, 3G, 4G | Telenor, VIP |
| Seychelles | M524 | 2G, 3G, 4G | Airtel |
| Sint Maarten | M524 | 2G, 3G | TelCell |
| Slovakia | M524 | 2G, 4G | O2, Orange, Telekom |
| Slovenia | M524 | 2G, 3G, 4G | A1, Mobitel |
| South Africa | M524 | 2G, 3G, 4G | Cell C, MTN, Vodacom |
| South Korea | M524 | 3G, 4G | KT, LG U+, SK Telecom |
| South Sudan | M524 | 2G, 3G | MTN |
| Spain | M524 | 2G, 3G, 4G | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | M524 | 2G, 3G, 4G | Dialog, Mobitel |
| Suriname | M524 | 2G, 3G | Telesur |
| Sweden | M524 | 2G, 4G | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | M524 | 3G, 4G | Salt, Sunrise, Swisscom |
| Taiwan | M524 | 3G, 4G | Chunghwa, FarEasTone, T Star, Taiwan Mobile |
| Tanzania | M524 | 2G, 3G, 4G | Airtel |
| Thailand | M524 | 2G, 3G, 4G | AIS, DTAC, True Move |
| Tunisia | M524 | 2G, 3G, 4G | Orange Tunisie, Tunisie Telecom |
| Uganda | M524 | 2G, 3G, 4G | Africell, Airtel, MTN |
| United Kingdom | M524 | 2G, 4G | 3, EE, O2, Vodafone |
| Vietnam | M524 | 3G, 4G | MobiFone, Viettel, Vinaphone |
| Zambia | M524 | 2G, 3G, 4G | Airtel |


{{!-- END do not edit content above, it is automatically generated  --}}

### M524 - Certified bands

| Technology | Band | CE |
| :--- | :--- | :---: |
| 2G | 900 MHz | &check; |
| 2G | 1800 MHz | &check; |
| 3G | B1 (2100 MHz) | &check;|
| 3G | B8 (900 MHz) | &check;|
| LTE Cat 1 | B1 (2100 MHz) | &check;|
| LTE Cat 1 | B3 (1800 MHz) | &check;|
| LTE Cat 1 | B7 (2600 MHz) | &check;|
| LTE Cat 1 | B8 (900 MHz) | &check;|
| LTE Cat 1 | B20 (800 MHz) | &check;|
| LTE Cat 1 | B28 (700 MHz) | &check;|



### M635 - Country compatibility

Global, country list to be provided a later date.


---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 5c48836c-dced-4420-be6f-15916d265a5e --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Global | BG95-M5 | &check; | GA | |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Global | BG95-M5 | &check; | GA | |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | EMEAA | EG91-EX | &check; | GA | |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | EG91-EX | &check; | GA | |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 |  | In development | |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Global | BG95-S5 | &check; | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2023-10-03 | RK | Initial version |
|          | 2023-12-20 | RK | Added FCC and IC IDs. Additional notes for ADCs, D24, and D25 |
|          | 2024-02-08 | RK | Added power consumption information |
|          | 2024-02-20 | RK | M.2 screw assembly should be connected to ground |
|          | 2024-02-20 | RK | Added pin drive strength |
|          | 2024-03-14 | RK | M SoM pin 45 is not shared. Pins 43 and 53 are both connected to PB[2], but not pin 45. |
|          | 2024-03-15 | RK | The UART baud rate 2400, 4800, 380400, 460800 are supported but were not listed |
|          | 2024-03-26 | RK | Listed certified bands for FCC and CE |
| 001      | 2024-04-02 | RK | General availability |
| 002      | 2024-04-03 | RK | Additional transmitter information |
| 003      | 2024-04-18 | RK | Add PDM microphone |
| 004      | 2024-04-23 | RK | Added links to certification documents |
| 005      | 2024-04-25 | RK | Added I/O characteristics |
| 006      | 2024-04-30 | RK | Corrected SPI interface speeds |
| 007      | 2024-07-09 | RK | Updated cellular modem on M635 to BG95-S5 |
| 008      | 2024-08-21 | RK | Added supervisory reset information |
| 009      | 2024-09-03 | RK | Added clarification of cellular modem USB pins |
| 010      | 2024-09-24 | RK | Removed concurrent GNSS warning, added link to library |
| 011      | 2024-10-02 | RK | Added warning to not use Argon (ANT-FLXV2) antenna |
| 012      | 2025-01-06 | RK | Added note explaining reserved SoM pins |
| 013      | 2025-01-21 | RK | Incorrect RTL pin listed in SETUP and RESET button section. It was listed as PA[4] but is PA[11]. It was correct in the pin diagram. |
| 014      | 2025-04-10 | RK | Added links to hardware-libraries and M.2 breakout board designs |
| 015      | 2025-06-25 | RK | Clarifications for GNSS use |
