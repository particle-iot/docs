---
title: Argon datasheet
layout: datasheet.hbs
columns: two
order: 2
---

# Argon Datasheet <sup>(v001)</sup>

<div align=center><img src="/assets/images/argon/argon-top.png" ></div>

## Functional description
 - Overview
    what is this product?

 - Features

## Interfaces

### Block diagram

<div align=center><img src="/assets/images/argon/argon-block-diagram.png" ></div>

### Power

All Particle Mesh devices are 3.3V logic compatible.

#### USB PORT
The USB port is the easiest way to power up the Argon. Please make sure that the USB port is able to provided at least 500mA. Power from the USB is regulated down to 3.3V by the on board Torex XC9258A step-down regulator. 

#### VUSB PIN
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.

#### LIPO
If you want to make your projects truly wireless, you can power the device with a single cell LiPo (3.7V). The Argon has an on board LiPo charger that will charge and power the device when USB source is plugged in, or power the device from the LiPo alone in the absence of the USB.

**Note:** Please pay attention to the polarity of the LiPo connector. Not all LiPo follow the same polarity convention!

#### LIPO PIN
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Argon. Remember that the input voltage range on this pin is 3.6 to 4.2 VDC. 

#### 3V3 PIN
This pin is the output of the on board 3.3V step-down switching regulator (Torex XC9258A). The regulator is rated at 1000mA max. When using this pin to power other devices or peripherals remember to budget in the current requirement of the Argon first.


## FCC approved antennas

**Mesh and WiFi**

Custom Particle 2.4GHz Antenna.
>> Add datasheet and parameters here

**NFC**

Custom Particle NFC Antenna.
>> Add datasheet and parameters here

## Peripherals and GPIO

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

## SWD 

The Argon has a dedicated 10 pin debug connector that exposes the SWD interface of the nRF5280. This interface can be used to debug your code or reprogram your Argon bootloader, device OS, or the user firmware using any standard SWD tools including out Mesh Debugger.

<div align=center><img src="/assets/images/argon/swd-connector-pinout.png" ></div>

## Memory map

>> need input from the firmware team here

## Pins and button definitions

### Pin markings

<div align=center><img src="/assets/images/argon/argon-pin-markings.png" ></div>

<div align=center><img src="/assets/images/argon/argon-bottom-pin-markings.png" ></div>

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
|D2-D8  | These are generic GPIO pins. D4-D8 are PWM-able.|
|A0-A5  | These are analog input pins that can also act as standard digital GPIO. A0-A3 are PWM-able.|



## LED status

### System RGB LED
For a detailed explanation of different color codes of the RGB system LED, please take a look here. (https://docs.particle.io/guide/getting-started/modes)

### Charge status LED

|State | Description |
|:---|:---|
|ON | Charging in progress |
|OFF | Charging complete |


## Pinout diagram

>> add pinout diagram

## Technical specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| Supply Input Voltage | V<sub>IN-MAX</sub> |  |  | +6.2 | V |
| Battery Input Voltage | V<sub>LiPo</sub> |  |  | +6.5 | V |
| Supply Output Current | I<sub>3V3-MAX-L</sub> |  |  | 1000 | mA |
| Storage Temperature | T<sub>stg</sub> | -30 |  | +75 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 2 | kV |

<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.


### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| LiPo Battery Voltage | V<sub>LiPo</sub> | +3.3 |  | +4.4 | V |
| Supply Input Voltage | V<sub>3V3</sub> | +3.0 | +3.3 | +3.6 | V |
| Supply Output Voltage | V<sub>3V3</sub> |  | +3.3 |  | V |
| Operating Current (uC on, Radio ON) | I<sub>Li+ avg</sub> |  | xxx | xxx | mA |
| Peak Current (uC on, Radio ON) | I<sub>Li+ pk</sub> | xxx<sup>[2]</sup> |  | xxx<sup>[3]</sup> | mA |
| Operating Current (uC on, Radio OFF) | I<sub>Li+ avg</sub> |  | xx | xx | mA |
| Sleep Current (4.2V LiPo, Radio OFF)| I<sub>Qs</sub> |  | xx | xx | mA |
| Deep Sleep Current (4.2V LiPo, Radio OFF) | I<sub>Qds</sub> |  | xxx | xxx | uA |
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>[1]</sup> These numbers represent the extreme range of short peak current bursts when transmitting and receiving in 802.11b/g/n modes at different power levels.  Average TX current consumption in will be 80-100mA.

<sup>[2]</sup> These are very short average current bursts when transmitting and receiving.  On average if minimizing frequency of TX/RX events, current consumption in powersave mode will be 18mA

## Radio specifications

Argon has two radio modules. 

Nordic Semiconductor nRF52840 SoC for BLE, Thread, and NFC.

| Feature | Description|
| :-------|:---------- |
|Operating Frequencies| 2360 to 2500 MHz|
|Output Power| Programmable -20dBm to +8dBm|
|PLL channel spacing| 1 MHz|
|On the air data rate| 125 to 2000 kbps|

Espressif Systems ESP32 for WiFi

| Feature | Description|
| :-------|:-----------|
| WLAN Standards | IEEE 802 11b/g/n |
| Antenna Port | Single Antenna |
| Frequency Band | 2412 to 2484 MHz |


Note: Bluetooth features of the ESP32 are not exposed.

## I/O Characteristics 

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :---------|:-------|:----------:|:---:|:---:|:---:|:---: |
|Input high voltage | V<sub>IH</sub>||0.7*3.3|--|3.3|V|
|Input low voltage | V<sub>IL</sub> | | 0 | | 0.3*3.3 | V |
|Current at GND+0.4 V, output set low, high drive|I<sub>OL,HDL</sub> |V<sub>3V3</sub> >= 2.7V|6|10|15|mA|
|Current at V<sub>3V3</sub>-0.4 V, output set high, high drive|I<sub>OH,HDH</sub>|V<sub>3V3</sub> >= 2.7V|6|9|14|mA|
| Pull-up resistance | R<sub>PU</sub> | | 11 |13 | 16 | kΩ |
| Pull-down resistance | R<sub>PD</sub> | | 11 |13 | 16 | kΩ |


## Mechanical specifications

### Dimensions and Weight

<div align=center><img src="/assets/images/argon/argon-dimensions.png" ></div>
 
 * Weight = 10 grams

### Mating connectors

USB connector
Debug connector
JST connector
u.FL connector
Male header


## Recommended PCB land pattern

The Argon uses standard 0.1" pitch male header pins. 

<div align=center><img src="/assets/images/argon/argon-landing-pattern.png" ></div>

## Schematic

### Power
### nRF52840
### u-blox
### ESP32
### Interfaces
### JTAG

## Bill of materials

## Ordering information

## Product Handling

### ESD Precautions

The Argon contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling Argon without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates Argon. ESD precautions should be implemented on the application board where the Argon is mounted. Failure to observe these precautions can result in severe damage to the Argon!

### Connectors

### Breadboarding

The breadboard provided with the Argon is specifically designed to require low insertion force. This makes it easy to plug the Argon in and out of the breadboard. If you end up using a different breadboard, remember that it may require more force. In this case, always remember to pinch-hold your precious Argon by the sides (along the header pins) when plugging-unplugging and not by the USB connector (don't be this person).

## Default settings

## Glossary

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

>> add FCC number here

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

>> add IC number here

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

## Known Errata

## Contact