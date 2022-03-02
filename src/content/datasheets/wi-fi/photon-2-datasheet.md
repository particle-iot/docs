---
title: Photon 2 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Photon 2, Wi-Fi development module
---

# Photon 2 Datasheet <sup>(pre)</sup>

**Preliminary pre-release version 2022-03-02**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon2-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

## Functional description

### Overview

The Photon 2 is a development module with a microcontroller and Wi-Fi networking. The form-factor is similar to the Argon (Adafruit Feather), but
the Photon 2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications. 

It is intended to replace both the Photon and Argon modules. It contains the same module as the P2, making it easier to migrate from a pin-based development module to a SMD mass-production module if desired.

### Features

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - Integrated PCB antenna
  - Integrated U.FL connector for external antenna
  - Integrated RF switch
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8721DM MCU
  - ARM Cortex M4F CPU, 200 MHz
- 1024 KB (1 MB) user application maximum size
- 2 MB flash file system
- FCC, IC, and CE certified


## Interfaces

### Block Diagram

[To be provided at a later date.]

### Power

Power can be supplied via:

- USB C connector on edge of module (up to 500 mA at 5V)
- LiPo battery connector (JST-PH)
- Li+ pin 
- VUSB pin at 5VDC

### RF

- The Photon 2 includes an on-module PCB trace antenna and a U.FL connector that allows the user to connect an external antenna.
- The antenna is selected in software. The default is the PCB trace antenna.


### FCC Approved Antennas

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| Dipole antenna | LumenRadio | 104-1001 | 2.15dBi |
| PCB Antenna | Included | - | - |

---

### SWD/JTAG

The Photon 2 module supports programming and debugging use SWD (Serial Wire Debug) using the 10-pin micro JTAG connector on the top of the module.

When the bootloader starts, for a brief period of time a weak pull-up is applied to pin D8 and pull-down to pin D6 to detect whether a SWD debugger is attached. After boot, you can use these pins for regular GPIO, but beware of a possible GPIO state change caused by the pull-up or pull-down when using these pins as output.

| Pin   | JTAG   | SWD    | Pull at boot |
| :---: | :----: | :----: | :----------: |
| D8    | SWDIO  | PA[27] | Pull-up      |
| D6    | SWCLK  | PB[3]  | Pull-down    |
| 3V3   | Power  |        |              |
| GND   | Ground |        |              |
| RST   | Reset  |        |              |


---

## Memory Map

### Flash Layout Overview

[To be provided at a later date.]

### DCT Layout

[This information is from the P1, and is likely to remain the same, but is subject to change.]

The DCT area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCT layout in `release/stable`_ <a href="https://github.com/particle-iot/device-os/blob/release/stable/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

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

**Note:** Writing 0xFF to offset 34 (DEFAULT) or 3106 (ALTERNATE) will cause the device to re-generate a new private key on the next boot. Alternate keys are currently unsupported on the P1 but are used on the Electron as UDP/ECC keys.  You should not need to use this feature unless your keys are corrupted.

```
// Regenerate Default Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 34 -D fillbyte
// Regenerate Alternate Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 3106 -D fillbyte
```

### Memory Map

[To be provided at a later date.]

---

## Pin and button definition


| Peripheral Type | Qty | Input(I) / Output(O) |
| :-:|:-:|:-:|
| Digital | 20 | I/O |
| Analog (ADC) | 6 | I |
| SPI | 2 | I/O |
| I2C | 1 | I/O |
| UART | 3 | I/O |
| USB | 1 | I/O |
| PWM | 6 | O |


### Pin markings

<div align=center><img src="/assets/images/p1-pin-numbers.png" width=600></div>

### GPIO and port listing

{{!-- BEGIN do not edit content below, it is automatically generated 8bd904e1-0088-488c-9fbb-e695d7643949 --}}

| Pin Name |   |   |   |   | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 / D19 | ADC_4 | | | | PB[1] |
| A1 / D18 | ADC_5 | | | | PB[2] |
| A2 / D17 | ADC_0 | | | | PB[4] |
| A5 / D14 | ADC_3 | | SPI (SS) | | PB[7] |
| D0 / A3 | ADC_2 | Wire (SDA) | | | PB[6] |
| D1 / A4 | ADC_1 | Wire (SCL) | | | PB[5] |
| D15 | | | | | PB[26] |
| D16 | | | | Serial3 (RX) | PA[19] |
| D2 | | | SPI1 (SCK) | Serial2 (RTS) | PA[14] |
| D3 | | | SPI1 (MOSI) | Serial2 (TX) | PA[12] |
| D4 | | | SPI1 (MISO) | Serial2 (RX) | PA[13] |
| D5 / WKP | | | SPI1 (SS) | Serial2 (CTS) | PA[15] |
| D6 | | SWCLK | | | PB[3] |
| D7 | | | | | PA[0] |
| D8 | | SWDIO | | | PA[27] |
| MISO / D11 | | | SPI (MISO) | Serial3 (CTS) | PA[17] |
| MOSI / D12 | | | SPI (MOSI) | Serial3 (RTS) | PA[16] |
| RX / D10 | | | | Serial1 (RX)  | PA[8] |
| SCK / D13 | | | SPI (SCK) | Serial3 (TX) | PA[18] |
| TX / D9 | | | | Serial1 (TX) | PA[7] |


{{!-- END do not edit content above, it is automatically generated 8bd904e1-0088-488c-9fbb-e695d7643949 --}}

### ADC (Analog to Digital Converter)

The Photon 2 supports six ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated ed5c8a8d-6f7f-4253-be72-a45e7316421e --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, GPIO | ADC_4 | PB[1] |
| A1 / D18 | A1 Analog in, GPIO | ADC_5 | PB[2] |
| A2 / D17 | A2 Analog in, GPIO, PWM. | ADC_0 | PB[4] |
| A5 / D14 | A5 Analog in, PWM, SPI SS, GPIO | ADC_3 | PB[7] |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | ADC_2 | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | ADC_1 | PB[5] |


{{!-- END do not edit content above, it is automatically generated ed5c8a8d-6f7f-4253-be72-a45e7316421e --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits

### UART serial

The Photon 2 supports two UART serial interfaces. 

{{!-- BEGIN do not edit content below, it is automatically generated cd89fea9-4917-4af5-bfd0-4bdaa400545c --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D16 | D16 GPIO, Serial3 RX. Was A3 on Argon. | Serial3 (RX) | PA[19] |
| SCK / D13 | SPI SCK, D13 GPIO, Serial3 TX | Serial3 (TX) | PA[18] |
| MOSI / D12 | SPI MOSI, D12 GPIO, Serial3 RTS | Serial3 (RTS) | PA[16] |
| MISO / D11 | SPI MISO, D11 GPIO, Serial3 CTS | Serial3 (CTS) | PA[17] |
| RX / D10 | Serial1 RX (received data), GPIO | Serial1 (RX)  | PA[8] |
| TX / D9 | Serial1 TX (transmitted data), GPIO | Serial1 (TX) | PA[7] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 SCK. | Serial2 (RTS) | PA[14] |
| D3 | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI. | Serial2 (TX) | PA[12] |
| D4 | D4 GPIO, PWM, Serial2 RX, SPI1 MISO. | Serial2 (RX) | PA[13] |
| D5 / WKP | GPIO D5, Serial2 CTS, SPI1 SS. | Serial2 (CTS) | PA[15] |


{{!-- END do not edit content above, it is automatically generated cd89fea9-4917-4af5-bfd0-4bdaa400545c --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- Serial1 uses the RTL872x UART_LOG peripheral
- Serial2 uses the RTL872x LP_UART peripheral
- Serial3 uses the RTL872x HS_UART0 peripheral

### SPI

The Photon 2 supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated c48b830e-f222-4a5d-a34f-14973ce84e22 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A5 / D14 | A5 Analog in, PWM, SPI SS, GPIO | SPI (SS) | PB[7] |
| SCK / D13 | SPI SCK, D13 GPIO, Serial3 TX | SPI (SCK) | PA[18] |
| MOSI / D12 | SPI MOSI, D12 GPIO, Serial3 RTS | SPI (MOSI) | PA[16] |
| MISO / D11 | SPI MISO, D11 GPIO, Serial3 CTS | SPI (MISO) | PA[17] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 SCK. | SPI1 (SCK) | PA[14] |
| D3 | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI. | SPI1 (MOSI) | PA[12] |
| D4 | D4 GPIO, PWM, Serial2 RX, SPI1 MISO. | SPI1 (MISO) | PA[13] |
| D5 / WKP | GPIO D5, Serial2 CTS, SPI1 SS. | SPI1 (SS) | PA[15] |


{{!-- END do not edit content above, it is automatically generated c48b830e-f222-4a5d-a34f-14973ce84e22 --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- SPI uses the RTL872x SPI1 peripheral (25 MHz maximum speed)
- SPI1 uses the RTL872x SPI0 peripheral (50 MHz maximum speed)


### I2C

The Photon 2 supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated 5b55adb8-1e32-4518-b01e-eadf4e67a262 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | Wire (SDA) | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | Wire (SCL) | PB[5] |


{{!-- END do not edit content above, it is automatically generated 5b55adb8-1e32-4518-b01e-eadf4e67a262 --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are required for I2C
- If not using I2C, pins D0 and D1 can be used as GPIO


### Complete pin listing

{{!-- BEGIN do not edit content below, it is automatically generated 5c5c78ef-c99c-49b7-80f4-19196b90ecfe --}}

| Pin Name | Description | MCU |
| :--- | :--- | :--- |
| RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| 3V3 | Regulated 3.3V DC output, maximum load 500 mA | |
| MODE | MODE button, has internal pull-up | PA[4] |
| GND | Ground. | |
| A0 / D19 | A0 Analog in, GPIO | PB[1] |
| A1 / D18 | A1 Analog in, GPIO | PB[2] |
| A2 / D17 | A2 Analog in, GPIO, PWM. | PB[4] |
| D16 | D16 GPIO, Serial3 RX. Was A3 on Argon. | PA[19] |
| D15 | D15 GPIO, Was A4 on Argon. | PB[26] |
| A5 / D14 | A5 Analog in, PWM, SPI SS, GPIO | PB[7] |
| SCK / D13 | SPI SCK, D13 GPIO, Serial3 TX | PA[18] |
| MOSI / D12 | SPI MOSI, D12 GPIO, Serial3 RTS | PA[16] |
| MISO / D11 | SPI MISO, D11 GPIO, Serial3 CTS | PA[17] |
| RX / D10 | Serial1 RX (received data), GPIO | PA[8] |
| TX / D9 | Serial1 TX (transmitted data), GPIO | PA[7] |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | PB[5] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 SCK. | PA[14] |
| D3 | D3 GPIO, PWM, Serial2 TX, SPI1 MOSI. | PA[12] |
| D4 | D4 GPIO, PWM, Serial2 RX, SPI1 MISO. | PA[13] |
| D5 / WKP | GPIO D5, Serial2 CTS, SPI1 SS. | PA[15] |
| D6 | D6 GPIO, SWCLK. | PB[3] |
| D7 | D7 GPIO. Blue LED. | PA[0] |
| D8 | GPIO, PWM, SWDIO | PA[27] |
| VUSB | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. | |
| EN | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up. | |
| LI+ | Connected to JST PH LiPo battery connector. 3.7V in or out. | |


{{!-- END do not edit content above, it is automatically generated 5c5c78ef-c99c-49b7-80f4-19196b90ecfe --}}


## Technical specification

### Absolute maximum ratings

[To be provided at a later date.]

### Recommended operating conditions

[To be provided at a later date.]

### Wi-Fi Specifications

[To be provided at a later date.]


### I/O Characteristics

[To be provided at a later date.]

## Mechanical specifications

### Overall dimensions

[To be provided at a later date.]

### Module Dimensions

[To be provided at a later date.]


## Ordering information

[To be provided at a later date.]

Photon 2 modules are available from [store.particle.io](https://store.particle.io/).

{{!-- BEGIN do not edit content below, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |


{{!-- END do not edit content above, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: [To be provided at a later date.]
-	IC: [To be provided at a later date.]

## Product handling

### Tape and Reel Info

[To be provided at a later date.]

### Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

## Default settings

The P2 module comes pre-programmed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the [Particle Web IDE](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air). [Particle Workbench](/quickstart/workbench/) is a full-featured desktop IDE for Windows, Mac, and Linux based on VSCode and supports both cloud-based and local gcc-arm compiles. The [Particle CLI](/tutorials/developer-tools/cli/) provides a command-line interface for cloud-based compiles and flashing code over USB.

## Glossary

<div class="dictionary-wrapper">
<dd>Radio Frequency</dd>
<dt>SMT</dt>
<dd>Surface Mount Technology (often associated with SMD which is a surface mount device).</dd>
<dt>AP</dt>
<dd>Access Point</dd>
<dt>USB</dt>
<dd>Universal Serial Bus</dd>
<dt>Quiescent current</dt>
<dd>Current consumed in the deepest sleep state</dd>
<dt>FT</dt>
<dd>Five-tolerant; Refers to a pin being tolerant to 5V.</dd>
<dt>3V3</dt>
<dd>+3.3V; The regulated +3.3V supply rail.  Also used to note a pin is only 3.3V tolerant.</dd>
<dt>RTC</dt>
<dd>Real Time Clock</dd>
<dt>OTA</dt>
<dd>Over The Air; describing how firmware is transferred to the device.</dd>
</div>

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
> Contains FCC ID: [To be provided at a later date]

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
> Contains transmitter module IC: [To be provided at a later date]

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-03-02 | RK | Pre-release initial version |


## Known Errata

## Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

https://support.particle.io
