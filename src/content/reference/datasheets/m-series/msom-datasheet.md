---
title: M SoM datasheet
columns: two
layout: commonTwo.hbs
description: M SoM datasheet
---

# M SoM datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and changes may occur prior to release.
{{box op="end"}}

![M SoM](/assets/images/m-series/msom-top.png)
 
## Overview

The M SoM module contains the following functional units:
 
- M.2 SoM form-factor, like the B Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - Quectel BG95-M5 LTE Cat M1 (North America)
  - Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)

### MCU

The Realtek RTL8722DM is in the same family as the P2 and Photon 2 modules (RTL8721DM), but has additional GPIO.

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - U.FL connector for external antenna
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8722DM MCU
  - ARM Cortex M33 CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 3072 KB (3 MB) of RAM available to user applications
- 2 MB flash file system
- FCC (United States), ISED (Canada), and CE (European Union) certified

### Block diagram

{{imageOverlay src="/assets/images/m-series/msom-block-diagram.png" alt="Block diagram" class="full-width"}}

### Device families

| | Cellular Only | Cellular & Wi-Fi | Wi-Fi Only |
| :--- | :---: | :---: | :---: |
| Developer devices | Boron | &nbsp; | Photon 2 |
| Production module | B SoM | M SoM | P2 |

### Migration guides

If you are migrating to the M SoM from another Particle device, see also the following migration guides:

- [M SoM from B SoM](/hardware/migration-guides/msom-b-series-migration-guide/)
- [M SoM from Boron or Argon](/hardware/migration-guides/msom-boron-migration-guide/)
- [M SoM from E Series](/hardware/migration-guides/msom-e-series-migration-guide/)
- [M SoM from P2](/hardware/migration-guides/msom-p2-migration-guide/)


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


### RF

- The M SoM includes three U.FL connectors for external antennas:
  - Cellular 
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE
  - GNSS (GPS)
- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.
- GNSS features are limited M404 as the cellular modem cannot do cellular communication and GNSS at the same time.

## Approved Antennas

### Certified cellular antennas

The M SoM is certified with the following cellular antenna:

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Wide band LTE cell antenna [x1] | PARANTCW1EA | M404, M524 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |
| Wide band LTE cell antenna [x50] | PARANTCW1TY | M404, M524 | [Datasheet](/assets/pdfs/PARANTCW1EA.pdf) |

Single quantity M SoM units and developer kits include a PARANTCW1EA antenna. Tray quantities of the M SoM do not include antennas.


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


### Certified Wi-Fi/BLE antennas

The M SoM is certified for use with the same antennas as the P2/Photon 2. The same antenna is shared for Wi-Fi and BLE. Unlike the P2/Photon 2, the external antenna is required for Wi-Fi and BLE and the M SoM does not include a built-in trace antenna on the module.

| Antenna | SKU  | Links |
| :------ | :--- | :---- |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x1] | PARANTWM1EA | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/particle-p2-photon2-wi-fi-antenna-2-4-5ghz)  |
| Particle P2/Photon2 Wi-Fi Antenna 2.4/5GHz, [x50] |PARANTWM1TY | [Datasheet](/assets/datasheets/PARANTWM1EA.pdf) |

Single quantity M SoM units and developer kits include a PARANTWM1EA antenna. Tray quantities of the M SoM do not include antennas.

### Certified GNSS antennas

| SKU | Description | |
| :--- | :--- | :--- |
| PARANTGN1EA	| Particle GNSS FPC Antenna, [x1] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |
| PARANTGN1TY	| Particle GNSS FPC Antenna, [x50] | [Datasheet](/assets/pdfs/PARANTGN1EA.pdf) |

Single quantity M SoM units and developer kits include a PARANTGN1EA antenna. Tray quantities of the M SoM do not include antennas. If not using the GNSS feature, the antenna can be omitted from your design.


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

The M SoM has 4 pads at the bottom exposing the SWD interface of the MCU. This interface can be used to debug your code or reprogram your SoM bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

Additionally, SWD is supported on pins on the M.2 connector:

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | SWCLK | PB[7] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840).
- SWO (Serial Wire Output) is not supported on the RTL8722DM.
- Pins 45 and 53 are shared 

## Pin information

### Pinout diagram

{{imageOverlay src="/assets/images/msom.svg" alt="Pinout" class="full-width"}}


### Pin function by pin name

{{!-- BEGIN do not edit content below, it is automatically generated 1ef65384-3694-4999-a6d8-4ee9432ca08d --}}

| Pin Name | Module Pin |   |   |   |   | MCU |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| A0 / D19 | 23 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | PB[4] |
| A1 / D18 | 33 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | PB[5] |
| A2 / D17 | 35 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | PB[6] |
| A3 / D16 | 37 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A4 / D15 | 41 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A5 / D14 | 43 | ADC_6 | &nbsp; | &nbsp; | &nbsp; | PB[3] |
| A5 / D14 | 53 | ADC_6 | SWCLK | &nbsp; | &nbsp; | PB[3] |
| A6 / D29 | 45 | ADC_3 | SWCLK | &nbsp; | &nbsp; | PB[7] |
| A7 / WKP | 47 | ADC_7 | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| CELL USBD- | 46 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL USBD+ | 44 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL VBUS | 74 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| CELL_RI | 75 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D0 | 22 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | PB[0] |
| D1 | 20 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | PA[31] |
| D2 | 42 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | PA[14] |
| D20 | 19 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| D21 | 17 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| D22 | 62 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| D23 | 64 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[10] |
| D24 | 58 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | PA[7] |
| D25 | 60 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | PA[8] |
| D26 | 59 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| D27 | 55 | &nbsp; | SWDIO | &nbsp; | &nbsp; | PA[27] |
| D3 | 40 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | PA[15] |
| D4 | 66 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[18] |
| D5 | 68 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[19] |
| D6 | 70 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[20] |
| D7 | 72 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[21] |
| D8 | 48 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | PA[19] |
| GNSS_TX | 18 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| MISO / D11 | 50 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | PA[17] |
| MOSI / D12 | 52 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | PA[16] |
| NC | 14 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| RGBB | 65 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| RGBG | 63 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| RGBR | 61 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| RX / D10 | 38 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | PA[13] |
| SCK / D13 | 54 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | PA[18] |
| SIM_CLK | 71 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_DATA | 73 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_RST | 69 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| SIM_VCC | 67 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| TX / D9 | 36 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | PA[12] |
| USBDATA- | 13 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| USBDATA+ | 11 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |


{{!-- END do not edit content above, it is automatically generated--}}

### Pin fuction by M.2 pin

{{!-- BEGIN do not edit content below, it is automatically generated 5feb3f9e-2bf4-4e73-a2c8-b6584b125391 --}}

| Module Pin | Pin Name |   |   |   |   | MCU |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 11 | USBDATA+ | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |
| 13 | USBDATA- | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| 14 | NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 17 | D21 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| 18 | GNSS_TX | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 19 | D20 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| 20 | D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | PA[31] |
| 22 | D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | PB[0] |
| 23 | A0 / D19 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | PB[4] |
| 33 | A1 / D18 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | PB[5] |
| 35 | A2 / D17 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | PB[6] |
| 36 | TX / D9 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | PA[12] |
| 37 | A3 / D16 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| 38 | RX / D10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | PA[13] |
| 40 | D3 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | PA[15] |
| 41 | A4 / D15 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| 42 | D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | PA[14] |
| 43 | A5 / D14 | ADC_6 | &nbsp; | &nbsp; | &nbsp; | PB[3] |
| 44 | CELL USBD+ | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 45 | A6 / D29 | ADC_3 | SWCLK | &nbsp; | &nbsp; | PB[7] |
| 46 | CELL USBD- | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 47 | A7 / WKP | ADC_7 | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| 48 | D8 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | PA[19] |
| 50 | MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | PA[17] |
| 52 | MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | PA[16] |
| 53 | A5 / D14 | ADC_6 | SWCLK | &nbsp; | &nbsp; | PB[3] |
| 54 | SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | PA[18] |
| 55 | D27 | &nbsp; | SWDIO | &nbsp; | &nbsp; | PA[27] |
| 58 | D24 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | PA[7] |
| 59 | D26 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| 60 | D25 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | PA[8] |
| 61 | RGBR | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| 62 | D22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| 63 | RGBG | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| 64 | D23 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[10] |
| 65 | RGBB | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| 66 | D4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[18] |
| 67 | SIM_VCC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 68 | D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[19] |
| 69 | SIM_RST | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 70 | D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[20] |
| 71 | SIM_CLK | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 72 | D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[21] |
| 73 | SIM_DATA | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 74 | CELL VBUS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| 75 | CELL_RI | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}



### GPIO (Digital I/O)

{{!-- BEGIN do not edit content below, it is automatically generated 315abea5-56c1-45ce-af72-bf0d9d8e8482 --}}

| Pin | M SoM Pin Name | M SoM GPIO | MCU | Special boot function |
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
| 43 | A5 / D14 | &check; | PB[3] | &nbsp; |
| 45 | A6 / D29 | &check; | PB[7] | SWCLK. 40K pull-down at boot. |
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
- The drive strength is 4 mA per pin in normal drive and 12 mA per pin in high drive mode on the M SoM.
- There is a maximum of 200 mA across all pins. The total maximum could be further limited by your 3.3V regulator.
- Drive strength selection using [pinSetDriveStrength](/reference/device-os/api/input-output/pinsetdrivestrength/) is only available in Device OS 5.5.0 and later on the M SoM.

Certain GPIO will change state at boot, or cause the MCU to enter a special mode. See the [boot mode pins](#boot-mode-pins) section, below, for more information.


### ADC (Analog to Digital Converter)

{{!-- BEGIN do not edit content below, it is automatically generated 8f52432b-ccd8-4be0-a2e2-1718b6771c4f --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | ADC_0 | PB[4] |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | ADC_1 | PB[5] |
| 35 | A2 / D17 | A2 Analog in, GPIO | ADC_2 | PB[6] |
| 37 | A3 / D16 | A3 Analog in, GPIO | ADC_4 | PB[1] |
| 41 | A4 / D15 | A4 Analog in, GPIO | ADC_5 | PB[2] |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | ADC_6 | PB[3] |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | ADC_3 | PB[7] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | ADC_7 | PA[20] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | ADC_6 | PB[3] |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits
- SoM pin 45 (A6) on the M SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A6 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at hoot by the MCU.

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}

### UART serial

{{!-- BEGIN do not edit content below, it is automatically generated d3ffb099-2b14-45d6-b006-71efef7af3ff --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI | Serial1 (TX) | PA[12] |
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
- Supported baud rates: 110, 300, 600, 1200, 9600, 14400, 19200, 28800, 38400, 57600, 76800, 115200, 128000, 153600, 230400, 500000, 921600, 1000000, 1382400, 1444400, 1500000, 1843200, 2000000, 2100000, 2764800, 3000000, 3250000, 3692300, 3750000, 4000000, 6000000



### SPI

{{!-- BEGIN do not edit content below, it is automatically generated fd3eed60-17cc-4294-9a39-7f3d01bf7487 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI | SPI1 (MOSI) | PA[12] |
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
- SPI uses the RTL872x SPI1 peripheral (25 MHz maximum speed)
- SPI1 uses the RTL872x SPI0 peripheral (50 MHz maximum speed)

Even though the B SoM and M SoM both have two SPI interfaces, note that the M SoM SPI1 is on different pins.

{{!-- BEGIN do not edit content below, it is automatically generated 89fcdf38-5b12-43fa-b306-72a4262c913e --}}

| Pin | B SoM Pin Name | B SoM SPI | M SoM Pin Name | M SoM SPI |
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
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | PA[13] |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | PB[3] |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | PB[7] |
| 50 | MISO / D11 | D11 GPIO, PWM, SPI MISO | PA[17] |
| 52 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | PA[16] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | PB[3] |
| 66 | D4 | D4 GPIO, PWM | PB[18] |
| 68 | D5 | D5 GPIO, PWM | PB[19] |
| 70 | D6 | D6 GPIO, PWM | PB[20] |
| 72 | D7 | D7 GPIO, PWM | PB[21] |


{{!-- END do not edit content above, it is automatically generated--}}

- All available PWM pins on the M SoM share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### USB

The M SoM supports a USB interface for programming the device and for USB serial (CDC) communications. The module itself does not contain a USB connector; you typically add a micro USB or USB C connector on your base board. It is optional but recommended.

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

The M SoM supports an external common anode RGB LED. 

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

- On the M SoM, Pin RGBR (PA[30]) has a 10K hardware pull-up in the module because it's a trap pin that controls the behavior of the internal 1.1V regulator. This does not affect the RGB LED but could affect your design if you are repurposing this pin as GPIO. You must not hold this pin low at boot.

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated e39d39e4-5349-44b3-9aaa-989469037cd45 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 45 | A6 / D29 | SWCLK. 40K pull-down at boot. | PB[7] |
| 53 | A5 / D14 | SWCLK. 40K pull-down at boot. | PB[3] |
| 55 | D27 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | PA[27] |
| 58 | D24 | Low at boot triggers ISP flash download | PA[7] |
| 60 | D25 | Goes high at boot | PA[8] |
| 61 | RGBR | Low at boot triggers trap mode | PA[30] |


{{!-- END do not edit content above, it is automatically generated --}}


### SETUP and RESET button

It is highly recommended that you add MODE (SETUP) and RESET buttons to your base board using momentary switches that connect to GND. These are necessary to change the operating mode of the device, for example to enter listening or DFU mode.

{{!-- BEGIN do not edit content below, it is automatically generated a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 34 | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| 46 | MODE | MODE button. Pin number constant is BTN. External pull-up required! | PA[4] |


{{!-- END do not edit content above, it is automatically generated a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9 --}}

The MODE button does not have a hardware pull-up on it, so you must add an external pull-up (2.2K to 10K) to 3V3, or connect it to 3V3 if not using a button. 

The RST pin does have an internal weak pull-up, but you may want to add external pull-up on that as well, especially if you use an off-board reset button connected by long wires.

### BLE (Bluetooth LE)

If you wish to use Wi-Fi on the M SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.

BLE 5.3 BLE Central Mode and BLE Peripheral Mode are supported. 

Full-speed BLE modes such as A2DP used for BLE audio are not supported.

Wi-Fi and BLE share the same antenna so you do not need to include a separate antenna to use both.

### Sleep

The M SoM can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The M SoM can only wake from `HIBERNATE` sleep mode on pin A7 (WKP), `RISING`, `FALLING`, or `CHANGE`.

The M SoM preserves the state of outputs during `STOP` or `ULTRA_LOW_POWER` sleep mode. In `HIBERNATE`, outputs are high-impedance.

Most pins can use `INPUT_PULLUP` or `INPUT_PULLDOWN` in sleep modes. The exception is `HIBERNATE` sleep mode where pin D21 can only use an external hardware pull-up or pull down.

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Only this pin can wake from HIBERNATE sleep mode. | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}



### PMIC Notes

{{!-- BEGIN shared-blurb b3247dfa-acbd-4e81-a50d-a5ab68220636 --}}
When using the M SoM with a bq24195 PMIC, note the following:

By default, the bq24195 sets the input current limit, which affects powering by VIN and VUSB, to 100 mA. This affects the VSYS output of the PMIC, which powers both the cellular modem and 3V3 supply, and is not enough to power the M SoM in normal operation.

If your device has the default firmware (Tinker), it will attempt to connect to the cloud, brown out due to insufficient current, then the device will reset. This may result in what appears to be the status LED blinking white, but is actually rolling reboot caused by brownout.

A factory new M SoM does not enable the PMIC setup. To enable the use of the bq21415, you must enable the system power feature [PMIC_DETECTION](/reference/device-os/api/power-manager/systempowerfeature/#systempowerfeature-pmic_detection) in your code. This defaults to off because the M SoM can be used without a PMIC, or with a different PMIC, and also requires I2C on D0/D1, and some base boards may use those pins as GPIO.

Because the input current limit does not affect the battery input (Li+), for troubleshooting purposes it can be helpful to attach a battery to help rule out input current limit issues. It's also possible to supply 3.7V via a bench power supply to the battery input, instead of VIN. 

The input current limit can result in a situation where you can't bring up a M SoM because it browns out continuously, but also cannot flash code to it to stop if from browning out. There are two general solutions:

- Attach a battery or supply by Li+ when bringing up a board.
- Use SWD/JTAG and reset halt the MCU. This will prevent it from connecting to the cloud, so you can flash Device OS and firmware to it by SWD.

The input current limit is actually controlled by three factors:

- The [power source max current setting](/reference/device-os/api/power-manager/powersourcemaxcurrent/) in the PMIC. The default is 900 mA. It can be set to 100, 150, 500, 900, 1200, 1500, 2000, or 3000 mA.
- It is also limited by the hardware ILIM resistor. On Particle devices with a built-in PMIC, this is set to 1590 mA, but if you are implementing your own PMIC hardware, you can adjust this higher.
- When connected by USB, it will use DPDM, current negotiation via the USB DP (D+) and DM (D-) lines. 

Note that some 2A tablet chargers and multi-port USB power supplies supply 2A but do not implement DPDM; these will be treated as if VIN was used, and you must set the power source current, otherwise the input current will be limited to 900 mA, which is not enough to power a 2G/3G cellular modem without an attached battery.

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


{{!-- ### I/O Characteristics --}}

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



## Mechanical specifications

### Dimensions and Weight

To be provided at a later date.


### Mechanical drawing

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

Dimensions are in millimeters.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

One compatible connector is the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html). It is widely available including at suppliers such as [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916).

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}

---

### Screw Assembly

The M.2 SoM requires a screw to hold the SoM in place because the M.2 connector does not have integrated locks and the SoM will pop up if not attached to the base board. The screw also provides better vibration resistance than locking clips.

- This is one style of standoff.

![Screw Assembly](/assets/images/b-series/new-standoff.png)

- An [alternative design](/hardware/b-series-som/som-first-board/#hold-down-screw) uses a [JAE SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) standoff. It's reflow soldered to your base board and has a threaded hole for a M2*3 screw to hold down the SoM. This may be easier to obtain.

The screw should be connected to the ground plane on your base board.

### Design Considerations

We strongly recommend against placing components under the SOM board because there is not enough height.

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

## Product Handling

### ESD Precautions
The M SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an M SoM without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the M SoM module. ESD precautions should be implemented on the application board where the M SoM is mounted. Failure to observe these precautions can result in severe damage to the M SoM!

### Connectors

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.

The M.2 edge connector is static sensitive and should be handled carefully. The M.2 connector is not designed for repeated removal and insertion of the module.



---

## Default settings

The M SoM comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

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

We, Particle Industries,Inc, declare under our sole responsibility that the product, P2, to which this declaration relates, is in conformity with RED Directive 2014/53/EU and (EU) 2015/863 RoHS Directive 2011/65/EU (Recast).

The full text of the EU declaration of conformity is available at the followingInternet address: 
[https://www.particle.io/](https://www.particle.io/)

Radiation Exposure Statement: This equipment complies with radiation exposure limits set forth for an uncontrolled environment.

The operating frequency bands and the maximum transmitted power limit are listed below:
- BLE 2402-2480MHz 10dBm
- Wi-Fi 2.4GHz band 2412-2484MHz 20dBm
- Wi-Fi 5GHz band 5180-5825MHz 23dBm

### United Kingdom

UKCA Conformity:

Radio Equipment Regulations 2017 (S.I. 2017/1206)

### Outdoor use (world)

This device is restricted to indoor use when operating in the 5150 to 5350
MHz frequency range. This restriction applies in: AT, BE, BG, CH, CY, CZ, DE,
DK, EE, EL, ES, FI, FR, HR, HU, IE, IS, IT, LI, LT, LU, LV, MT, NL, NO, PL, PT, RO,
SE, SI, SK, TR, UA, UK(NI).

---


## Country compatibility



---
## Ordering information

| Model | Quantity | Region |
| :--- | :--- | :--- |
| M404MEA | 1 | United States, Canada, and Mexico |
| M404MTY | 50 | United States, Canada, and Mexico |
| M524MEA | 1 | EMEAA (Europe, and parts of the Middle East, Africa, and Asia) |
| M524MTY | 50 | EMEAA (Europe, and parts of the Middle East, Africa, and Asia) |

## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2023-10-03 | RK | Initial version |
|          | 2023-12-20 | RK | Added FCC and IC IDs. Additional notes for ADCs, D24, and D25 |
|          | 2024-02-08 | RK | Added power consumption information |
|          | 2024-02-20 | RK | M.2 screw assembly should be connected to ground |
|          | 2024-02-20 | RK | Added pin drive strength |
