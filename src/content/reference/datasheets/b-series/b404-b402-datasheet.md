---
title: B-Series B404/B402 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle B-Series B404 and B402 SoM, Gen 3 cellular LTE Cat M1
---

# B404/B402 datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/b404-b402-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{box op="start" cssClass="boxed warningBox"}}
The B404 and B402 have been deprecated. The recommended replacement is the [B404X](/reference/datasheets/b-series/b404x-datasheet/).

See the [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information.
{{box op="end"}}


<div align=center><img src="/assets/images/b-series/b-series-top.png" ></div>

## Functional description

### Overview

The B-Series System-on-a-Module (SoM) is a cellular device with support for BLE (Bluetooth LE). It is based on the Nordic nRF52840 microcontroller.

The B-Series is designed to be integrated into your circuit board design, plugging into a M.2 NGFF connector on your board, allowing the module to be changed or upgraded easily.

### Features

#### Features - B402, B404

 * u-blox SARA-R410M-02B-00 or R410M-02B-03 LTE modem (B402, B404)
  * The B402 and B404 have been deprecated, replacement is the B404X. See the [Supply secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information.
  * LTE Cat M1 module
  * Support for United States, Canada, and Mexico only
  * 3GPP Release 13 LTE Cat M1 
  * LTE Cat M1 bands: 2, 4, 5, 12, 13
  * Embedded Particle EtherSIM (B404)
  * Embedded Particle SIM (B402)


<sup>1</sup> Not all bands enabled in software by default

#### Features - all models

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
 * Two on-module U.FL connectors for external antennas
 * M.2 interface
 * FCC and PTCRB certified
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


### Device OS support

It is recommended that you use the latest version in the 4.x LTS release line with the B404 and B402.

B404X devices requires a minimum of Device OS 4.0.0. If you have a mixed fleet of B404X, B404, and/or B402 devices, we recommend upgrading all device to the latest 4.x LTS release.

Recent B404 devices require Device OS 2.3.0 or later due to a required component change. 

While older B404 devices and B402 devices can use earlier versions, we recommend that all B404 and B404 fleets use a minimum of 2.3.0 and recommend 4.x LTS. The 2.x LTS release line is in the Extended Support and Maintenance (ESM) window and will stop being supported in 2024.

For information on upgrading Device OS, see [Version information](/reference/device-os/versions/). For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).

## Interfaces

### Block diagram

{{imageOverlay src="/assets/images/b-series/b-series-block-diagram.png" alt="Block Diagram" class="full-width"}}

### Power


#### VCC

VCC is used to supply power to the u-blox SARA-R410M cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V. While you only need 600mA for the B402/B404/B404X, we recommend 2A for compatibility with future SoM modules.

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

---

### Antenna

There are two radios on the B402 module. A BLE radio (nRF52840) and a cellular radio (u-blox). We have provided two u.FL connectors to plug in the cellular and BLE antenna. These are required if you wish to use the cellular and BLE. If you do not need BLE, you do not need to connect the BLE antenna.

#### Certified cellular antenna

| SKU  | Description |
| :--- | :--- |
| ANTCW2EA | Particle Cellular Flex Antenna 2G/3G/LTE [x1] |
| ANTCW2TY | Particle Cellular Flex Antenna 2G/3G/LTE Tray of 50 [x50] |

- Type: LTE Ultra Wide Band Flex Antenna
- Frequency/band: 698 MHz-2690 MHz
- RoHS Compliant
- Mechanical Specs:
  - Dimensions: 97 x 21 x 0.2 mm
  - Mounting: 3M adhesive backed for application on non-metallic surfaces
  - Connector type: FPC + IPEX connector
  - Cable length: 210 mm
  - Gain: 4.71 dBi

{{box op="start" cssClass="boxed warningBox"}}
Particle devices are certified for use only with the designated antenna specified above. The use of alternative antennas with our modules could necessitate a recertification process. To fully understand the potential consequences of using a non-certified antenna, Particle strongly advises seeking consultation with a qualified RF expert.
{{box op="end"}}

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

There are some optional B402 module specific I/O:

- u-blox USB and VBUS (for u-blox firmware upgrades)

**Note:** All GPIOs are only rated at 3.3VDC max.

### JTAG and SWD 

The B402 module has 4 pads at the bottom exposing the SWD interface of the nRF52840. This interface can be used to debug your code or reprogram your B402 bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

## Memory map

### nRF52840 flash layout overview

 - Bootloader (48KB, @0xF4000)
  - User Application
   - 256KB @ 0xB4000 (Device OS 3.1 and later)
   - 128KB @ 0xD4000 (Device OS 3.0 and earlier)
 - System (656KB, @0x30000)
 - SoftDevice (192KB)

### External SPI flash layout overview (dfu offset: 0x80000000)

 - OTA (1500KB, @0x00289000)
 - Reserved (420KB, @0x00220000)
 - FAC (128KB, @0x00200000)
 - LittleFS (2M, @0x00000000)

## Pins and button definitions

### Pinout diagram

{{imageOverlay src="/assets/images/b4-som.svg" alt="Pinout"}}

### Common SoM pins

{{!-- BEGIN shared-blurb 0c0a430c-bbf9-4464-a432-348288ccea49 --}}
<span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">RESERVED</span> and <span style="padding: 0px 10px 0px 10px; color:#01131D; background-color:#FF9F61; ">SOM</span> pins may vary across different SoM models. If you are designing for this specific module, or similar modules, you can use the indicated functions even if the pin is marked RESERVED. Most nRF52840-based modules will have the same pin functions on the RESERVED pins.

The nRF52840 B-SoM has some differences from the RTL8722 M-SoM. Future modules with a different MCU may have different pin functions. An effort will be made to assign all of the listed functions for ADC, PWM, SPI, etc. from the set of common SoM pin functions in future modules, but the functions on RESERVED and SOM pins will likely vary.
{{!-- END shared-blurb --}}

### Pin description

| # |	Pin	 | Common | Function | nRF52 |	Description |
| :---: | :---: | :---: | :---: | :---: | --- |
| 1 | GND | GND | POWER | | System ground. |
| 2 | VCC	| VCC	| POWER |  | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
| 3 | GND | GND | POWER | | System ground. |
| 4 | VCC | VCC	| POWER | |	System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
| 5 | GND | GND | POWER | | System ground. |
| 6	 | VCC | VCC	| POWER | | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
| 7 | GND | GND | POWER | | System ground. |
| 8 | VCC | VCC	| POWER | | System power in, connect to the +LiPo or supply a fixed 3.6-4.2v power. |
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
| 32 | MODE | MODE | IO | P0.11 | Connected to the MODE button input, and digital only GPIO.|
| 33 | A1 | ADC1 | IO | P0.04 | Analog input ADC1<sup>2</sup>, and digital GPIO. |
| 34 | RESET | RESET | I | | Active-low reset input. |
| 35 | A2 | ADC2 | IO | P0.28| Analog input ADC2<sup>2</sup>, and digital GPIO. |
| 36 | D9 | TX | IO | P0.06 | Primarily used as UART TX, but can also be used as a digital GPIO. |
| 37 | A3 | ADC3 | IO | P0.29| Analog input ADC3<sup>2</sup>, and digital GPIO. |
| 38 | D10 | RX | IO | P0.08 | Primarily used as UART RX, but can also be used as a digital GPIO.	 | 
| 39 | AGND | AGND | POWER | | System analog ground. |
| 40 | D3 | RESERVED<sup>3</sup> |IO | P1.01 | UART flow control CTS, SCL1 (Wire1), SPI1 MOSI, digital only GPIO. |
| 41 | A4 | RESERVED<sup>3</sup> |IO | P0.30 | Analog input ADC4<sup>2</sup>, and digital GPIO. |
| 42 | D2 | RESERVED<sup>3</sup> | IO | P1.02| UART flow control RTS, SDA1 (Wire1), SPI1 SCK, digital only GPIO. |
| 43 | A5 | RESERVED<sup>3</sup> |IO | P0.31 | Analog input ADC5<sup>2</sup>, and digital GPIO.|
| 44 | u-blox USB D+ | SOM0 | IO | | Data+ pin of the cellular modem USB port.|
| 45 | A6 | RESERVED<sup>3</sup> | IO | P0.05| Analog input ADC6<sup>2</sup>, and digital GPIO. |
| 46 | u-blox USB D- | SOM1 | IO ||  Data- pin of the cellular modem USB port.|
| 47 | A7 | RESERVED<sup>3</sup> | IO | P0.02 | Analog input ADC7<sup>2</sup>, and digital GPIO.|
| 48 | D8 | CS | IO | P1.03| SPI interface CS, and digital only GPIO. | 
| 49 | AGND | AGND | POWER	| | System analog ground.|
| 50 | D11 | MISO | IO | P1.14 | SPI interface MISO, and digital only GPIO.|
| 51 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 52 | D12 | MOSI | IO | P1.13| SPI interface MOSI, and digital only GPIO.| 
| 53  | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 54 | D13 | SCK | IO | P1.15| SPI interface SCK, and digital only GPIO. |
| 55 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 56 | GND | GND | POWER | | System analog ground. |
| 57 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 58 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 59 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 60 | NC | RESERVED<sup>3</sup> | NC | | Leave unconnected. |
| 61 | RGBR | RED | IO | P0.13| Red pin of the RGB LED. | 
| 62 | D22 | GPIO0 | IO | P0.24 | GPIO0, digital only. |
| 63 | RGBG | GREEN | IO | P0.14 | Green pin of the RGB LED.|
| 64 | D23 | GPIO1 | IO | P1.09| GPIO1, digital only.|	
| 65 | RGBB | BLUE | IO | P0.15 | Blue pin of the RGB LED.|
| 66 | D4 | PWM0 | IO | P1.08| SPI1 MISO, Digital only GPIO, and PWM0. |
| 67 | SIM_VCC<sup>1</sup> | SOM5<sup>3</sup> | POWER | | Leave unconnected, 1.8V/3V SIM Supply Output from cellular modem. |
| 68 | D5 | PWM1 | IO | P1.10| Digital only GPIO, and PWM1. |
| 69 | SIM_RST<sup>1</sup> | SOM6<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
| 70 | D6 | PWM2 | IO | P1.11 | Digital only GPIO, and PWM2.|
| 71 | SIM_CLK<sup>1</sup> | SOM7<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem.|
| 72 | D7 | PWM3 | IO | P1.12| Digital only GPIO, and PWM3.|
| 73 | SIM_DATA<sup>1</sup> | SOM8<sup>3</sup> | IO | | Leave unconnected, 1.8V/3V SIM Data I/O of cellular modem with internal 4.7 k pull-up. |
| 74 | u-blox VBUS | SOM2<sup>3</sup> | IO | | USB detect pin for cellular modem. 5V on this pin enables the u-blox USB interface.|
| 75 | NC | SOM9<sup>3</sup> | NC ||  Leave unconnected. |

<sup>1</sup>These pins are connected to the internal MFF2 SIM and should be left open. 

<sup>2</sup>A0-A7 are 12-bit Analog-to-Digital (A/D) inputs (0-4095).

<sup>3</sup>SoM-specific and Reserved pins will vary depending on module. They are able to be used on the B402, but their function may be be different on future modules.

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


### LED status

#### System RGB LED

Unlike the Boron, the B402 module does not have an on-module RGB system status LED. We have provided its individual control pins for you to connect an LED of your liking. This will allow greater flexibility in the end design of your products.

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

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 4.48 | 4.71 | 5.17 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 5.1 | 45.2 | 166 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 13.7 | 56.0 | 192 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> |  | 63.2 | 185 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 13.4 | 15.5 | 98.3 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 9.47 | 66.3 | 192 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 552 | 555 | 559 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 554 | 557 | 559 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 553 | 556 | 558 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | | 631 | 2650 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 47.3 | 630 | 1540 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 553 | 556 | 558 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 8.87 | 9.65 | 63.6 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | 44.7 | 47.6 | 49.6 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> | 45.0 | 47.8 | 49.5 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | 43.4 | 46.4 | 47.9 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> | | 130 | 2560| uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> | | 121 | 1010 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 554 | 557 | 559 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> | 0.37 | 9.47 | 53.7 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 23.6 | 26.0 | 29.7 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | 23.9 | 26.5 | 30.5 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).
---

### Radio specifications

The B-Series SoM has two radio modules.

#### nRF52840
- Bluetooth® 5, 2.4 GHz
  - 95 dBm sensitivity in 1 Mbps Bluetooth® low energy mode
  - 103 dBm sensitivity in 125 kbps Bluetooth® low energy mode (long range)
  - 20 to +8 dBm TX power, configurable in 4 dB steps

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

- LTE Cat M1 for United States, Canada, and Mexico.
- Not all bands are enabled in software by default. 
- Particle LTE Cat M1 devices are not certified for use in Europe or other countries that follow EU certification requirements.


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

### Mechanical drawing

{{imageOverlay src="/assets/images/b-series/b-series-mechanical.png" alt="Mechanical Drawing"}}

Dimensions are in millimeters.

### 3D models

3D models of the B-Series SoM module are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/B-Series/B402) in formats including step, iges, stl, and f3d.

The 3D models are the same for the B404 and B402, as the only changes are the SIM card, which is not visible.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

One compatible connector is the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html). It is widely available including at suppliers such as [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916).

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}


---

### Screw assembly

![Screw Assembly](/assets/images/b-series/b-series-screw.jpg)

We recommend this screw assembly to securely affix the B series SoM to your circuit board. From top to bottom:

- M3 screw, 3mm long
- M3 washer
- M3 standoff, 2.45mm

![Standoff](/assets/images/b-series/b-series-standoff.png)

- Mounting hole, 2.6 mm metal hole, 3.1mm metal ring diameter (picture is of the bottom side of the circuit board)

![Bottom](/assets/images/b-series/b-series-screw-bottom.jpg)

- An [alternative design](/hardware/som/som-first-board/#hold-down-screw) uses a [JAE SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) standoff. It's reflow soldered to your base board and has a threaded hole for a M2*3 screw to hold down the SoM. This may be easier to obtain.

- Note that a hold-down screw is required because the M.2 connector does not have integrated locks and the SoM will pop up if not attached to the base board.

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

## Schematics

### Microcontroller

{{imageOverlay src="/assets/images/b-series/schematic-nrf.png" alt="Microcontroller" class="full-width"}}

### u-blox cellular modem

{{imageOverlay src="/assets/images/b-series/schematic-ublox.png" alt="u-blox cellular modem" class="full-width"}}

---

### M.2 connector

{{imageOverlay src="/assets/images/b-series/schematic-conn.png" alt="M.2 Connector"}}

Note: An earlier version of this document had reversed the labels D2 and D3 in the diagram located here. The correct assignments are pictured above and are as follows:

| SoM Pin | nRF52 Pin | Device OS Pin | Serial1 Flow Control |
| :---: | :---: | :---: | :---: |
| 40 | P1.01 | D3 | CTS |
| 42 | P1.02 | D2 | RTS |


### SIM and Flash

{{imageOverlay src="/assets/images/b-series/schematic-sim.png" alt="SIM and Flash" class="full-width"}}


---

### Buffers

{{imageOverlay src="/assets/images/b-series/schematic-buffers.png" alt="Buffers"}}

## Assembly

### Conformal coatings

B-Series SoM modules should not use a conformal coating to protect the module from water. Some components on the SoM cannot be coated and would need to be masked off during coating. This will make the coating process difficult to implement and test.

Furthermore, you cannot safely protect the the connection between the M.2 SoM and the M.2 NGFF connector by using a coating. Using an enclosure that protects both your base board and the B-Series SoM as a single waterproof assembly is recommended instead.


## Default settings

The B series comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.


---


## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated c9241a2c-76e0-11eb-9439-0242ac130002 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | B404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | B404 | M1 | AT&T, Telcel |
| United States | B404 | M1 | AT&T, T-Mobile (USA), Verizon<sup>7</sup> |


{{!-- END do not edit content above, it is automatically generated c9241a2c-76e0-11eb-9439-0242ac130002 --}}


---
## Ordering information

{{!-- BEGIN do not edit content below, it is automatically generated 91d8b83c-76ce-11eb-9439-0242ac130002 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | NRND | B404XMTY|
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | B404XMEA|
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | Deprecated | B404XMTY|
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | R410 | &check; | Deprecated | B404XMEA|


{{!-- END do not edit content above, it is automatically generated --}}


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| 001      | 29 Apr 2019 | RK | Initial Release |
| 002      | 03 Feb 2020 | RK | Fixed number of I2C, SPI, and PWM |
| 003      | 18 Feb 2020 | RK | Keep-out diagram M.2 connector was upside-down |
| 004      | 16-Sep-2020 | RK | Added power consumption information |
| 005      | 16-Dec-2020 | RK | Added missing TBD power consumption values |
| 006      | 04-Jan-2021 | RK | Fix incorrect pin number on pogo pin diagram |
| 007      | 03-Feb-2021 | RK | Split u-blox schematics into two images |
| 008      | 15-Mar-2021 | RK | Updated model, carrier, ordering information |
| 009      | 23-Mar-2021 | RK | Pins 40 and 42 functions were reversed |
| 010      | 26-Apr-2021 | RK | Added B404 model number |
| 011      | 14-May-2021 | RK | Pins 40 and 42 were not actually reversed |
| 012      | 19-May-2021 | RK | List Ethernet reserved pins |
| 013      | 28-Jun-2021 | RK | Added Device OS 3.1 memory map information |
| 014      | 10-Sep-2021 | RK | Changed wording of peak vs. max current |
| 015      | 14-Mar-2022 | RK | Added B404X, deprecation notice |
| 016      | 05-May-2022 | RK | Corrected number of PWM outputs (8) |
| 017      | 11-Aug-2022 | RK | Correct typo in 3V3 explanation |
| 018      | 29-Aug-2022 | RK | Split out B404X into separate datasheet |
| 019      | 10-Dec-2022 | RK | Added PMIC notes |
| 020      | 06-Jan-2023 | RK | Clarify power supply notes for VCC and 3V3 |
| 021      | 31-Jan-2023 | RK | Add Device OS versions |
| 022      | 28-Apr-2023 | RK | Add conformal coating warning |
| 023      | 07-Jun-2023 | RK | Fixed diagram of M.2 connector in schematics |
| 024      | 20-Feb-2024 | RK | M.2 screw assembly should be connected to ground |
| 025      | 19-Mar-2024 | RK | Incorrect bands listed for the B402 and B404 |
