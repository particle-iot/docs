---
title: Boron datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Boron, Gen 3 cellular development kit
---

# Boron Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/boron-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

<div align=center><img src="/assets/images/boron/boron-top.png" ></div>

## Functional description

### Overview

The Boron is a powerful LTE Cat M1 or 2G/3G enabled development kit that supports cellular networks and Bluetooth LE (BLE). It is based on the Nordic nRF52840 and has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

The Boron is great for connecting existing projects to the Particle Device Cloud where Wi-Fi is missing or unreliable.

The BRN404X model (LTE Cat M1, North America) can be found in the [Boron BRN404X datasheet](/reference/datasheets/b-series/brn404x-datasheet/).

### Features

#### Features - BRN402, BRN404 (Boron LTE)

 * The BRN402 and BRN404 have been deprecated, replacement is the BRN404X. See the [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information.
 * u-blox SARA-R410M-02B-00 or R410M-02B-03 LTE modem
 * LTE Cat M1 module
 * Support for United States, Canada, and Mexico only
 * 3GPP Release 13 LTE Cat M1 
 * LTE Cat M1 bands: 2, 4, 5, 12, 13
 * Embedded Particle EtherSIM (BRN404)
 * Embedded Particle SIM (BRN402)


#### Features - BRN314, BRN310 (Boron 2G/3G)

 * The BRN314 and BRN310 have been deprecated. See the [Supply Secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information.
 * u-blox SARA U201 2G/3G modem
 * HSPA/GSM with global hardware and SIM support 
 * Bands 800/850/900/1900/2100 MHz 
 * 3GPP Release 7
 * Embedded Particle EtherSIM (BRN314)
 * Embedded Particle SIM (BRN310)

#### Features - all models

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


### Model comparison

{{!-- BEGIN shared-blurb f131d988-6f01-4ad5-95ec-762475eba505 --}}

| | BRN404X | BRN404 | BRN402 | BRN313 | BRN310 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Region | NorAm | NorAm | NorAm | Global | Global |
| Technology | LTE Cat M1 | LTE Cat M1 | LTE Cat M1 | 2G/3G | 2G/3G |
| EtherSIM | &check; | &check; | &nbsp; | &check; | &nbsp; |
| Supply Secure | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Lifecycle | GA | Deprecated | Deprecated | NRND | NRND |

- EtherSIM devices generally have a larger number of carriers and more may be added in the future
- NorAm: North America (United States, Canada, and Mexico)
- Global 2G/3G devices not recommended in the United States due to the impending shutdown of 2G/3G networks
- NRND: Not recommended for new designs
- See the [Carrier list](/reference/cellular/cellular-carriers/) for specific carrier and country compatibility
- See the [Supply secure FAQ](/reference/product-lifecycle/supply-secure-faq/) for more information
- See [Lifestyle stages](/reference/product-lifecycle/product-lifecycle-stages/) for more information

{{!-- END shared-blurb --}}

### Device OS support

It is recommended that you use the latest version in the 4.x LTS release line with Boron models.

While the Boron 2G/3G (BRN314 and BRN310) and Boron LTE (BRN404 and BRN402) can use an older version of Device OS:
- Device OS 3.x is a developer preview release and has reached its end-of-support date.
- The 2.x LTS release line is in the Extended Support and Maintenance (ESM) window and will stop being supported in 2024.
- Earlier versions of Device OS have reached their end-of-support dates.

The BRN404X requires a minimum of Device OS 4.0.0, so if you have a mixed fleet of devices that contains both BRN404 and BRN404X devices, we recommend that you upgrade all devices in the fleet to use a consistent version of Device OS.

For information on upgrading Device OS, see [Version information](/reference/device-os/versions/). For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).


## Interfaces

### Block diagram
 
{{imageOverlay src="/assets/images/boron/boron-block-diagram.png" large="/assets/images/boron/boron-block-diagram-large.png" alt="Block Diagram" class="full-width"}}

### Power

#### USB PORT
The USB port is the easiest way to power up the Boron. Please make sure that the USB port is able to provide at least 500mA. Power from the USB is regulated down to 3.3V by the on board Torex XC9258A step-down regulator. 

For powering the Boron 2G/3G version, you'll either need a USB port that is able support 2A current, or have the LiPo battery plugged in when powering over USB. This is because the on-board u-blox modem can consumes up to 1.8A peak current when operating in 2G mode. The Boron will intelligently source power from the USB most of the time and keep the battery charged. During peak current requirements, the additional power will be sourced from the battery. This reduces the charge-discharge cycle load on the battery, thus improving its longevity.

#### VUSB PIN
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.

#### LiPo
If you want to make your projects truly wireless, you can power the device with a single cell LiPo (3.7V). The Boron has an on board LiPo charger that will charge and power the device when USB source is plugged in, or power the device from the LiPo alone in the absence of the USB.

{{box op="start" cssClass="boxed warningBox"}}
**NOTE:**
Please pay attention to the polarity of the LiPo connector. Not all LiPo batteries follow the same polarity convention!
{{box op="end"}}

<div align=center><img src="/assets/images/lipo-polarity.png" ></div>

#### Li+ pin
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Boron. Remember that the input voltage range on this pin is 3.6 to 4.2 VDC. 

For the Boron 2G/3G version, make sure that the external DC supply is able to support 2A peak current requirements.

#### 3V3 PIN
This pin is the output of the on board 3.3V step-down switching regulator (Torex XC9258A). The regulator is rated at 1000mA max. When using this pin to power other devices or peripherals remember to budget in the current requirement of the Boron first. Unlike the Photon, this pin _CANNOT_ be used to power the Boron.

#### EN pin

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

**BLE**

The following antenna is optional, as the Boron comes with an on-board chip antenna for BLE. It can be purchased in the [Particle online store](https://store.particle.io/products/wi-fi-or-mesh-2-4ghz-antenna).

|Particle Device|Frequency     |Antenna Type|Manufacturer|MFG. Part # | Gain      |
|:--------------|:-------------|:-----------|:-----------|:-----------|:----------|
|Boron          | 2400-2500 MHz|PCB Antenna |Particle    | ANT-FLXV2  |2.0dBi peak|

**Cellular**

|Particle Device|Frequency     |Antenna Type|Manufacturer|MFG. Part #    | Gain       |
|:--------------|:-------------|:-----------|:-----------|:--------------|:-----------|
|Boron          | 698-3000 MHz| PCB Antenna|Taoglas     |FXUB63.07.0150C|5.00dBi peak|

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

### Power consumption (Boron 2G/3G)

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Peak Current, 3G | I<sub>Li+ pk</sub> | | | 800 | mA |
| Peak Current, 2G | I<sub>Li+ pk</sub> | | | 1800 | mA |
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 3.76 | 3.77 | 3.79 | mA |
| Operating Current (uC on, cellular on but not connected) | I<sub>cell_idle</sub> | 3.84 | 25.2 | 901 | mA |
| Operating Current (uC on, cellular connecting to tower) | I<sub>cell_conn_twr</sub> | 11.6 | 56.9 | 579 | mA |
| Operating Current (uC on, cellular connecting to cloud) | I<sub>cell_conn_cloud</sub> | 22.4 | 97.9 | 957 | mA |
| Operating Current (uC on, cellular connected but idle) | I<sub>cell_cloud_idle</sub> | 15.6 | 18.7 | 84.7 | mA |
| Operating Current (uC on, cellular connected and transmitting) | I<sub>cell_cloud_tx</sub> | 19.5 | 86.1 | 981 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 594 | 631 | 665 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 579 | 585 | 591 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 589 | 607 | 630 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | 17.0 | 907 | 2400 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 443 | 906 | 1540 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 589 | 606 | 627 | uA |
| STOP mode sleep, cellular wake-up | I<sub>stop_cell</sub> | 6.49 | 15.6 | 81.0 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | 160 | 171 | 182 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> | 166 | 178 | 188 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> | 163 | 174 | 185 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> |  | 494 | 2100 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> |  55.9 | 515 | 1090 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 590 | 610 | 634 | uA |
| ULP mode sleep, cellular wake-up | I<sub>ulp_cell</sub> | 6.96 | 16.4 | 81.1 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | 139 | 146 | 162 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | 139 | 147 | 163 | uA |
| Power disabled (EN pin = LOW) | I<sub>disable</sub> |  | 70 | 75 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).

---

### Power consumption (Boron LTE)

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

Current measurements taken at 3.6V via the battery input. For more information about measuring power usage, see [power measurement](/hardware/power/power-measurement/).

---

### Radio specifications

Boron has two radio modules, the nRF52 MCU BLE radio, and a cellular module, depending on the model.

#### Nordic Semiconductor nRF52840 for BLE.

| Feature | Description|
| :-------|:---------- |
|Operating Frequencies| 2360 to 2500 MHz|
|Output Power| Programmable -20dBm to +8dBm|
|PLL channel spacing| 1 MHz|
|On the air data rate| 125 to 2000 kbps|

#### u-blox SARA-U201 (2G/3G)

|Parameter | Value | 
|:---|:---|
|Protocol stack| 3GPP Release 7 | 
|MS Class | Class B | 
|Bands | GSM 850 MHz |
| | E-GSM 900 MHz|
| | DCS 1800 MHz |
| | PCS 1900 MHz | 
|Power Class | Class 4 (33 dBm) for 850/900 bands |
| | Class 1 (30 dBm) for 1800/1900 bands|

- Global 2G/3G.
- Not recommended for use in the United States due to the shutdown of 2G and 3G networks in 2022.

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

<div align=center><img src="/assets/images/boron/boron-dimensions.png" ></div>
 
 * Weight = 10 grams

### 3D models

3D models of the Boron are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/mesh/boron) in formats including step, iges, stl, and f3d.

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

### Fuel gauge

{{imageOverlay src="/assets/images/boron/schematic-fuelgauge.png" large="/assets/images/boron/schematic-fuelgauge.png" alt="Fuel Gauge" }}

### Interfaces

{{imageOverlay src="/assets/images/boron/schematic-interfaces.png" large="/assets/images/boron/schematic-interfaces.png" alt="Interfaces" }}

## Assembly

### Water soluble flux

When attaching a Boron to your base board, we recommend using a socket. As there are components on the bottom side of the Boron there is no version available with castellated holes, solder pads, or similar techniques for direct surface mounting.

The pin headers on the bottom of the Boron are not intended to be reflowed using paste-in-hole. 

If you decide to wave solder or hand-solder the Boron directly to your base board, water soluble flux should not be used. There are components within the Boron module that are moisture-sensitive, and wash water can get trapped under the RF shields, causing damage.

Use no-clean flux instead if you must solder the Boron module.

### Conformal coatings

Boron modules should not use a conformal coating to protect the module from water. Some components on the module cannot be coated and would need to be masked off during coating. This will make the coating process difficult to implement and test.

Furthermore, the buttons cannot be protected by using a coating. Using an enclosure that protects both your base board and the Boron module as a single waterproof assembly is recommended instead.

<!---
## Bill of materials
-->

## Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated 945c4c4c-76d1-11eb-9439-0242ac130002 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Afghanistan | BRN314 | 2G, 3G | MTN |
| Albania | BRN314 | 2G, 3G | Eagle, Telekom, Vodafone |
| Algeria | BRN314 | 2G, 3G | Mobilis, Ooredoo |
| Anguilla | BRN314 | 2G, 3G | Flow |
| Antigua and Barbuda | BRN314 | 2G, 3G | Flow |
| Argentina | BRN314 | 2G, 3G | Claro, Movistar, Personal |
| Armenia | BRN314 | 2G, 3G | Beeline, Ucom |
| Aruba | BRN314 | 2G, 3G | Setar |
| Austria | BRN314 | 2G, 3G | 3 (Drei), A1, T-Mobile |
| Azerbaijan | BRN314 | 2G, 3G | Azercell, Bakcell, NAR Mobile |
| Bahamas | BRN314 | 2G, 3G | Aliv, BTC Bahamas |
| Bahrain | BRN314 | 2G | Zain |
| Bangladesh | BRN314 | 2G, 3G | Bangalink, GrameenPhone |
| Barbados | BRN314 | 2G, 3G | Flow |
| Belarus | BRN314 | 2G, 3G | A1 |
| Belgium | BRN314 | 2G, 3G | Base, Orange, Proximus |
| Belize | BRN314 | 3G | Smart |
| Bolivia | BRN314 | 2G, 3G | Viva |
| Bosnia and Herzegovina | BRN314 | 2G, 3G | BH Telecom, HT Eronet |
| Brunei | BRN314 | 3G | DST |
| Bulgaria | BRN314 | 2G, 3G | A1, Telenor, Vivacom |
| Burkina Faso | BRN314 | 2G, 3G | Orange |
| Cambodia | BRN314 | 2G, 3G | Metfone |
| Canada | BRN404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Canada | BRN404X | M1 | Bell Mobility, Rogers Wireless, Telus |
| Cayman Islands | BRN314 | 2G, 3G | Flow |
| Chad | BRN314 | 2G, 3G | Airtel |
| Chile | BRN314 | 2G, 3G | Claro, Entel, Movistar |
| Colombia | BRN314 | 2G, 3G | Movistar, Tigo |
| Congo (Brazzaville) | BRN314 | 2G, 3G | Airtel |
| Congo (Kinshasa) | BRN314 | 2G, 3G | Airtel |
| Costa Rica | BRN314 | 3G | Movistar |
| Côte d'Ivoire | BRN314 | 2G, 3G | MTN |
| Croatia | BRN314 | 2G, 3G | Hrvatski Telekom, Tele2 |
| Cyprus | BRN314 | 2G, 3G | Cytamobile-Vodafone, MTN |
| Czechia | BRN314 | 2G | O2, T-Mobile, Vodafone |
| Denmark | BRN314 | 2G, 3G | 3 (Tre), TDC, Telenor, Telia |
| Dominica | BRN314 | 2G, 3G | Flow |
| Dominican Republic | BRN314 | 2G, 3G | Altice Dominicana, Claro, Viva |
| Ecuador | BRN314 | 2G, 3G | Claro, Movistar |
| Egypt | BRN314 | 2G, 3G | Etisalat, Orange |
| El Salvador | BRN314 | 2G, 3G | Claro, Telefonica |
| Estonia | BRN314 | 2G, 3G | Elisa, Tele2, Telia |
| eSwatini | BRN314 | 2G, 3G | MTN |
| Ethiopia | BRN314 | 2G, 3G | Ethio Telecom |
| Faroe Islands | BRN314 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | BRN314 | 2G | DNA, Elisa, Telia |
| France | BRN314 | 2G, 3G | Bouygues, Free Mobile, Orange, SFR |
| French Guiana | BRN314 | 2G, 3G | Digicel |
| Gabon | BRN314 | 2G, 3G | Airtel |
| Georgia | BRN314 | 2G, 3G | Beeline, Geocell |
| Germany | BRN314 | 2G, 3G | O2, Telekom, Vodafone |
| Ghana | BRN314 | 2G, 3G | AirtelTigo, MTN, Vodafone |
| Gibraltar | BRN314 | 2G, 3G | Gibtel |
| Greece | BRN314 | 2G | Cosmote, Vodafone, Wind |
| Grenada | BRN314 | 2G | Flow |
| Guadeloupe | BRN314 | 2G, 3G | Orange |
| Guatemala | BRN314 | 2G, 3G | Claro, Movistar |
| Guinea | BRN314 | 2G, 3G | MTN |
| Guinea-Bissau | BRN314 | 2G, 3G | MTN |
| Guyana | BRN314 | 2G | Digicel |
| Haiti | BRN314 | 2G, 3G | Digicel |
| Honduras | BRN314 | 2G, 3G | Claro, Tigo |
| Hong Kong | BRN314 | 2G, 3G | CSL, SmarTone |
| Hungary | BRN314 | 2G, 3G | Magyar Telekom, Telenor, Vodafone |
| Iceland | BRN314 | 2G, 3G | Nova, Siminn, Vodafone |
| Indonesia | BRN314 | 2G, 3G | Indosat, Telkomsel, XL Axiata |
| Ireland | BRN314 | 2G, 3G | Meteor, O2, Vodafone |
| Israel | BRN314 | 2G, 3G | Hot Mobile, Orange, Pelephone |
| Italy | BRN314 | 2G, 3G | TIM, Vodafone, Wind |
| Jamaica | BRN314 | 2G, 3G | Digicel, Flow |
| Japan | BRN314 | 3G | NTT DoCoMo |
| Jordan | BRN314 | 2G, 3G | Zain |
| Kazakhstan | BRN314 | 2G, 3G | Beeline, K-Cell |
| Kenya | BRN314 | 2G, 3G | Airtel |
| Kuwait | BRN314 | 2G, 3G | Viva, Zain |
| Kyrgyzstan | BRN314 | 2G, 3G | Beeline |
| Latvia | BRN314 | 2G, 3G | Bite, LMT, Tele2 |
| Liechtenstein | BRN314 | 2G, 3G | Mobilkom, Orange |
| Lithuania | BRN314 | 2G, 3G | Bite, Omnitel, Tele2 |
| Luxembourg | BRN314 | 2G, 3G | Orange, POST, Tango |
| Malawi | BRN314 | 2G, 3G | Airtel |
| Malaysia | BRN314 | 2G, 3G | Celcom, DiGi, Maxis |
| Malta | BRN314 | 2G, 3G | Go Mobile, Vodafone |
| Mexico | BRN404 | M1 | AT&T, Telcel |
| Mexico | BRN404X | M1 | AT&T, Telcel |
| Moldova | BRN314 | 2G, 3G | Moldcell, Orange |
| Mongolia | BRN314 | 2G, 3G | Mobicom, Unitel |
| Montenegro | BRN314 | 2G, 3G | Mtel, T-Mobile, Telenor |
| Mozambique | BRN314 | 2G, 3G | Vodacom |
| Myanmar | BRN314 | 2G, 3G | MPT, Telenor |
| Namibia | BRN314 | 2G, 3G | Telecom Namibia |
| Netherlands | BRN314 | 2G, 3G | KPN, T-Mobile, Vodafone |
| Nicaragua | BRN314 | 2G, 3G | Movistar |
| Nigeria | BRN314 | 2G, 3G | 9mobile, Airtel, Glo, MTN |
| Norway | BRN314 | 2G, 3G | TDC, Telenor, Telia |
| Pakistan | BRN314 | 2G, 3G | Mobilink, Telenor, Ufone, Warid |
| Palestine | BRN314 | 2G, 3G | Jawwal |
| Panama | BRN314 | 2G, 3G | Digicel, Movistar |
| Papua New Guinea | BRN314 | 2G, 3G | bmobile |
| Paraguay | BRN314 | 2G, 3G | Claro, Personal, Tigo, Vox |
| Peru | BRN314 | 2G, 3G | Claro, Entel, Movistar |
| Philippines | BRN314 | 2G, 3G | Globe, Smart |
| Poland | BRN314 | 2G, 3G | Orange, Play, Plus, T-Mobile |
| Portugal | BRN314 | 2G, 3G | NOS, TMN, Vodafone |
| Qatar | BRN314 | 2G, 3G | Ooredoo, Vodafone |
| Romania | BRN314 | 2G, 3G | Orange, Telekom Romania, Vodafone |
| Rwanda | BRN314 | 2G, 3G | Airtel, MTN |
| Saint Kitts and Nevis | BRN314 | 2G, 3G | Flow |
| Saint Lucia | BRN314 | 2G, 3G | Flow |
| Saint Vincent and the Grenadines | BRN314 | 3G | Flow |
| Serbia | BRN314 | 2G, 3G | Telenor, VIP |
| Sint Maarten | BRN314 | 2G, 3G | TelCell |
| Slovakia | BRN314 | 2G | O2, Orange, Telekom |
| Slovenia | BRN314 | 2G, 3G | A1, Mobitel |
| South Africa | BRN314 | 2G, 3G | Cell C, MTN, Vodacom |
| South Korea | BRN314 | 3G | KT, SK Telecom |
| South Sudan | BRN314 | 2G, 3G | MTN |
| Spain | BRN314 | 2G, 3G | Orange, Telefonica, Vodafone, Yoigo |
| Sri Lanka | BRN314 | 2G, 3G | Dialog, Mobitel |
| Suriname | BRN314 | 2G, 3G | Telesur |
| Sweden | BRN314 | 2G, 3G | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | BRN314 | 3G | Salt, Sunrise, Swisscom |
| Taiwan | BRN314 | 3G | Chunghwa, T Star, Taiwan Mobile |
| Tajikistan | BRN314 | 2G, 3G | Beeline, Tcell |
| Tanzania | BRN314 | 2G, 3G | Airtel |
| Thailand | BRN314 | 2G, 3G | AIS, DTAC, True Move |
| Trinidad and Tobago | BRN314 | 2G, 3G | Digicel, TSTT |
| Tunisia | BRN314 | 2G, 3G | Orange Tunisie, Tunisie Telecom |
| Turks and Caicos Islands | BRN314 | 2G, 3G | Flow |
| Uganda | BRN314 | 2G, 3G | Africell, Airtel, MTN |
| Ukraine | BRN314 | 2G, 3G | Kyivstar, Life, MTS |
| United Kingdom | BRN314 | 2G, 3G | 3, EE, O2, Vodafone |
| United States | BRN404 | M1 | AT&T, T-Mobile (USA), Verizon<sup>7</sup> |
| United States | BRN404X | M1 | AT&T, T-Mobile (USA), Verizon<sup>7</sup> |
| Uruguay | BRN314 | 2G, 3G | Antel, Claro, Movistar |
| Uzbekistan | BRN314 | 2G, 3G | Beeline |
| Venezuela | BRN314 | 2G, 3G | Movistar |
| Vietnam | BRN314 | 2G, 3G | MobiFone, Viettel, Vinaphone |
| Virgin Islands (British) | BRN314 | 2G, 3G | CCT, Flow |
| Zambia | BRN314 | 2G, 3G | Airtel |


{{!-- END do not edit content above, it is automatically generated 945c4c4c-76d1-11eb-9439-0242ac130002 --}}

<sup>7</sup>Verizon in the United States is only supported on enterprise plans.


## Ordering information

Borons are available from [store.particle.io](https://store.particle.io/) in single quantities in 2G/3G and LTE Cat M1 versions.

{{!-- BEGIN do not edit content below, it is automatically generated 281acdea-76ce-11eb-9439-0242ac130002 --}}

| SKU | Description | Region  | Modem | EtherSIM | Lifecycle | Replacement |
| :--- | :--- | :---  | :--- | :---: | :--- | :--- |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R510 | &check; | GA | |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R510 | &check; | GA | |
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R510 | &check; | GA | |
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 |  | NRND | BRN404XTRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 |  | Deprecated | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 |  | Deprecated | |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | &check; | Deprecated | |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | &check; | Deprecated | |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 |  | Deprecated | BRN404X|
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | NORAM | R410 |  | Deprecated | |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | NORAM | R410 |  | Deprecated | BRN404XKIT|
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | &check; | Deprecated | BRN404X|
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | NORAM | R410 | &check; | Deprecated | BRN404XKIT|
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | NORAM | R410 | &check; | Deprecated | BRN404XTRAY50|


{{!-- END do not edit content above, it is automatically generated 281acdea-76ce-11eb-9439-0242ac130002 --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

**BORON LTE (Cat M1) **

-   Model Number: BRN404, BRN402
-   RoHS
-   CE
-   PTCRB
-   FCC ID: 2AEMI-BRN402
-   ISED: 20127-BRN402

**BORON 2G/3G**

-   Model Number: BRN314, BRN310
-   RoHS
-   CE
-   FCC ID: 2AEMI-BRN310
-   ISED: 20127-BRN310

## Product handling

### ESD precautions

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

* Contains FCC ID: 2AEMI-BRN402 (BORON LTE)
* Contains FCC ID: 2AEMI-BRN310 (BORON 2G/3G)

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

 * Contains transmitter module ISED: 20127-BRN402 (BORON LTE)
 * Contains transmitter module ISED: 20127-BRN310 (BORON 2G/3G)

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| v001     | 2018 Oct 26 | MB | Initial release |
| v002     | 2020 Jan 21 | RK | Remove mesh |
| v003     | 2020 Sep 01 | RK | Add EN pin information |
| v004     | 16-Sep-2020 | RK | Added power consumption information |
| v005     | 15-Mar-2021 | RK | Updated model, carrier, ordering information |
| v005     | 26-Apr-2021 | RK | Added BRN314 and BRN404 model numbers |
| v006     | 28-Jun-2021 | RK | Added Device OS 3.1 memory map information |
| v007     | 09-Jul-2021 | RK | Number of accessible I2C ports is 1, not 2 |
| v008     | 28-Jul-2021 | RK | Corrected number of SPI ports (2) in peripherals and GPIO |
| v009     | 10-Sep-2021 | RK | Changed wording of peak vs. max current |
| v010     | 06-Sep-2022 | RK | Split BRN404X into new datasheet |
| v011     | 28-Apr-2023 | RK | Add conformal coating and flux notes |
| v012     | 19-Mar-2024 | RK | Incorrect bands listed for the BRN402 and BRN404 |
| v013     | 18-Jul-2025 | RK | Fixed typo in replacement, is BRN404X not B404X |

## Known errata

## Contact

**Web**

[https://www.particle.io](https://www.particle.io)

**Community Forums**

[https://community.particle.io](https://community.particle.io)
