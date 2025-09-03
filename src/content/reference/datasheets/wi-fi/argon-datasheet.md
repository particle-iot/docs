---
title: Argon datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Argon, Gen 3 Wi-Fi development kit
---

# Argon Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/argon-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{box op="start" cssClass="boxed warningBox"}}
The Argon has been deprecated. The recommended replacement is the Photon 2. See the [Photon 2 Datasheet](/reference/datasheets/wi-fi/photon-2-datasheet/) 
and [Photon 2 from Argon migration guide](/hardware/migration-guides/photon-2-argon-migration-guide/) for more information.
{{box op="end"}}

<div align=center><img src="/assets/images/argon/argon-top.png" ></div>

## Functional description

### Overview

The Argon is a powerful Wi-Fi enabled development board for Wi-Fi networks. It is based on the Nordic nRF52840 and has built-in battery charging circuitry so it’s easy to connect a Li-Po and deploy your local network in minutes.

The Argon is great for connecting existing projects to the Particle Device Cloud over a Wi-Fi network.

### Features

 * Espressif ESP32-D0WD 2.4 GHz Wi-Fi coprocessor 
  * On-board 4MB flash for ESP32 
  * 802.11 b/g/n support 
  * 802.11 n (2.4 GHz), up to 150 Mbps
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
 * On-board PCB antenna
 * U.FL connector for external antenna
 * Meets the Adafruit Feather [specification](https://learn.adafruit.com/adafruit-feather/feather-specification) in dimensions and pinout
 * FCC (United States), CE (European Union), and ISED (Canada) certified
 * RoHS compliant (lead-free)


### Device OS support

It is recommended that you use the latest version in the 4.x LTS release line with the Argon.

While Argons can use an older version of Device OS:
- Device OS 3.x is a developer preview release and has reached its end-of-support date.
- The 2.x LTS release line is in the Extended Support and Maintenance (ESM) window and will stop being supported in 2024.
- Earlier versions of Device OS have reached their end-of-support dates.

For information on upgrading Device OS, see [Version information](/reference/device-os/versions/). For the latest version shipped from the factory, see [Manufacturing firmware versions](/scaling/manufacturing/manufacturing-firmware-versions/) page. See also [Long Term Support (LTS) releases](/reference/product-lifecycle/long-term-support-lts-releases/).


## Interfaces

### Block diagram

{{imageOverlay src="/assets/images/argon/argon-block-diagram.png" alt="Block Diagram" class="full-width"}}


### Power

#### USB PORT
The USB port is the easiest way to power up the Argon. Please make sure that the USB port is able to provide at least 500mA. Power from the USB is regulated down to 3.3V by the on board Torex XC9258A step-down regulator. 

#### VUSB PIN
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.  This pin is also protected with an internal fuse rated at 1000mA.

It is also possible to use the VUSB pin to power the Argon at 5V if not using the USB port. There is no blocking diode between the USB port and VUSB, so you should
not use both at the same time.

#### LiPo
If you want to make your projects truly wireless, you can power the device with a single cell LiPo (3.7V). The Argon has an on board LiPo charger that will charge and power the device when USB source is plugged in or power the device from the LiPo alone in the absence of the USB.

{{box op="start" cssClass="boxed warningBox"}}
**NOTE:**
Please pay attention to the polarity of the LiPo connector. Not all LiPo batteries follow the same polarity convention!
{{box op="end"}}

<div align=center><img src="/assets/images/lipo-polarity.png" ></div>

#### Li+ pin
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Argon. Remember that the input voltage range on this pin is 3.6 to 4.2 VDC. 

#### 3V3 PIN
This pin is the output of the on board 3.3V step-down switching regulator (Torex XC9258A). The regulator is rated at 1000mA max. When using this pin to power other devices or peripherals remember to budget in the current requirement of the Argon first. Unlike the Photon, this pin _CANNOT_ be used to power the Argon.

#### EN pin

The **EN** pin is not a power pin, per se, but it controls the 3V3 power. The EN pin is pulled high by a 100K resistor to the higher of VUSB, the micro USB connector, or Li+. Because the pull-up can result in voltages near 5V you should never directly connect EN to a 3.3V GPIO pin. Instead, you should only pull EN low, such as by using an N-channel MOSFET or other open-collector transistor.

The EN pin can force the device into a deep power-down state where it uses very little power. It also can used to assure that the device is completely reset, similar to unplugging it, with one caveat:

If using the EN pin to deeply reset the device, you must be careful not to allow leakage current back into the nRF52 MCU by GPIO or by pull-ups to 3V3. If you only power external devices by 3V3 you won't run into this, as 3V3 is de-powered when EN is low. 

However, if you have circuitry that is powered by a separate, external power supply, you must be careful. An externally powered circuit that drives a nRF52 GPIO high when EN is low can provide enough current to keep the nRF52 from powering down and resetting. Likewise, a pull-up to an external power supply can do the same thing. Be sure that in no circumstances can power by supplied to the nRF52 when 3V3 is de-powered.

[See the power supply schematic](#power-1), below, for more information.


---

### Antenna

There are two radios on the Argon. A BLE radio (nRF52840) and a Wi-Fi radio (ESP32). For the Wi-Fi radio, we have provided a u.FL connector to plug in the Wi-Fi antenna. This is required if you wish to use the Wi-Fi connectivity. 

There are two options for the BLE antenna on the Argon. It comes with an on-board PCB antenna which is selected by default in the device OS and a u.FL connector if you wish to connect an external antenna. If you wish to use the external antenna, you'll need to issue an appropriate command in the firmware.

### FCC approved antennas

**BLE and Wi-Fi**

The Argon includes one of these antennas, but a second for use with BLE can be purchased in the [Particle online store](https://store.particle.io/products/wi-fi-or-mesh-2-4ghz-antenna).


|Particle Device|Frequency     |Antenna Type|Manufacturer|MFG. Part # | Gain      |
|:--------------|:-------------|:-----------|:-----------|:-----------|:----------|
|Argon          | 2400-2500 MHz|PCB Antenna |Particle    | ANT-FLXV2  |2.0dBi peak|


### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 20 | I/O |
| Analog (ADC) | 6 | I |
| UART | 1 | I/O |
| SPI  | 2 | I/O |
| I2C  | 2 | I/O |
| USB  | 1 | I/O |
| PWM  | 8| O |

**Note:** All GPIOs are only rated at 3.3VDC max.

### SWD 

The Argon has a dedicated 10 pin debug connector that exposes the SWD interface of the nRF5280. This interface can be used to debug your code or reprogram your Argon bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align=center><img src="/assets/images/argon/swd-connector-pinout.png" ></div>

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

<div align=center><img src="/assets/images/argon/argon-pin-markings.png" ></div>

<div align=center><img src="/assets/images/argon/argon-bottom-pin-markings.png" ></div>


### Pinout diagram

<div align=center> <a href="/assets/images/argon/argon-pinout-v1.0.pdf" target="_blank"> <img src="/assets/images/argon/argon-pinout.png" ></a></div>

You can download a high resolution <a href="/assets/images/argon/argon-pinout-v1.0.pdf" target="_blank"><strong>PDF version of the pin out here.</strong></a></div><br>

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
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

---

### Power consumption

| Parameter | Symbol | Min | Typ | Peak | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Operating Current (uC on, peripherals and radio disabled) | I<sub>idle</sub> | 3.1 | 3.52 | 3.58 | mA |
| Operating Current (uC on, radio connected but idle) | I<sub>wifi_cloud_idle</sub> | 20.5 | 25.8 | 219 | mA |
| Operating Current (uC on, radio connected and transmitting) | I<sub>wifi_cloud_tx</sub> | 20.1 | 31.7 | 261 | mA |
| STOP mode sleep, GPIO wake-up | I<sub>stop_gpio</sub> | 350 | 396 | 459 | uA |
| STOP mode sleep, analog wake-up | I<sub>stop_analog</sub> | 349 | 398 | 456 | uA |
| STOP mode sleep, RTC wake-up | I<sub>stop_intrtc</sub> | 340 | 398 | 461 | uA |
| STOP mode sleep, BLE wake-up, advertising | I<sub>stop_ble_adv</sub> | 340 | 442 | 3420 | uA |
| STOP mode sleep, BLE wake-up, connected | I<sub>stop_ble_conn</sub> | 102 | 435 | 1970 | uA |
| STOP mode sleep, serial wake-up | I<sub>stop_usart</sub> | 348 | 397 | 449 | uA |
| STOP mode sleep, Wi-Fi wake-up | I<sub>stop_wifi</sub> | 15.3 | 22.2 | 110 | mA |
| ULP mode sleep, GPIO wake-up | I<sub>ulp_gpio</sub> | | 81.7 | 169 | uA |
| ULP mode sleep, analog wake-up | I<sub>ulp_analog</sub> | | 81.1 | 174 | uA |
| ULP mode sleep, RTC wake-up | I<sub>ulp_intrtc</sub> |  | 80.7 | 168 | uA |
| ULP mode sleep, BLE wake-up, advertising | I<sub>ulp_ble_adv</sub> | | 141 | 3280 | uA |
| ULP mode sleep, BLE wake-up, connected | I<sub>ulp_ble_conn</sub> |  | 138 | 1870 | uA |
| ULP mode sleep, serial wake-up | I<sub>ulp_usart</sub> | 476 | 520 | 569 | uA |
| ULP mode sleep, Wi-Fi wake-up | I<sub>ulp_wifi</sub> |  16.3 | 21.3 | 105 | mA |
| HIBERNATE mode sleep, GPIO wake-up | I<sub>hib_gpio</sub> | | 64.7 | 161 | uA |
| HIBERNATE mode sleep, analog wake-up | I<sub>hib_analog</sub> | | 65.0 | 159 | uA |
| Power disabled (EN pin = LOW) | I<sub>disable</sub> |  | 20 | 30 | uA |

<sup>1</sup>The min, and particularly peak, values may consist of very short transients.
The typical (typ) values are the best indicator of overall power consumption over time. The 
peak values indicate the absolute minimum capacity of the power supply necessary, not overall consumption.


### Radio specifications

Argon has two radio modules. 

Nordic Semiconductor nRF52840 SoC for BLE and NFC.

| Feature | Description|
| :-------|:---------- |
|Operating Frequencies| 2400 to 2480 MHz|
|Output Power| Programmable -20dBm to +8dBm|
|PLL channel spacing| 1 MHz|
|On the air data rate| 125 to 2000 kbps|

Espressif Systems ESP32 for Wi-Fi

| Feature | Description|
| :-------|:-----------|
| WLAN Standards | IEEE 802 11b/g/n |
| Antenna Port | Single Antenna |
| Frequency Band | 2412 to 2484 MHz |


**Note:** Bluetooth features of the ESP32 are not exposed.

---

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

<div align=center><img src="/assets/images/argon/argon-dimensions.png" ></div>
 
 * Weight = 10 grams

### 3D models

3D models of the Argon are available in the [hardware-libraries Github](https://github.com/particle-iot/hardware-libraries/tree/master/CAD/mesh/argon) in formats including step, iges, stl, and f3d.

### Mating connectors

The Argon uses two single row 0.1" pitch male header pins. One of them is 16 pin while the other is 12 pin. It can be mounted with matching 0.1" pitch female headers with a typical height of 0.335" (8.5mm). When you search for parts like these it can be difficult to navigate the thousands of parts available online so here are a few good choices for the Argon:

| Description | MFG | MFG Part Number |
|:----------- |:----|:----------------|
|16-pin 0.1" (2.54mm) Female Header|Sullins|PPTC161LFBN-RC|
|16-pin 0.1" (2.54mm) Female Header|TE|6-535541-4|
|12-pin 0.1" (2.54mm) Female Header|Sullins|PPTC121LFBN-RC|
|12-pin 0.1" (2.54mm) Female Header|TE|6-534237-0|

## Recommended PCB land pattern

The Argon can be directly soldered onto the PCB or be mounted with the above mentioned female headers.

<div align=center><img src="/assets/images/argon/argon-landing-pattern.png" ></div>


## Schematic

The complete schematic and board files are open source and available on Particle's GitHub repository [here.](https://github.com/particle-iot/argon)

### Power

<div align=center><img src="/assets/images/argon/schematic-power.png" ></div>

### nRF52840

<div align=center><img src="/assets/images/argon/schematic-nrf52840.png" ></div>

### ESP32

<div align=center><img src="/assets/images/argon/schematic-esp32.png" ></div>

<!---
## Bill of materials
-->


## Ordering information

Argon are available from [store.particle.io](https://store.particle.io/) in single quantities.

{{!-- BEGIN do not edit content below, it is automatically generated 81ddccf2-774f-11eb-9439-0242ac130002 --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Global | Deprecated | |
| ARG-LDKT | Argon Leak Detection Kit [x1] | Global | Deprecated | |
| ARG-STRTKT | Argon Starter Kit [x1] | Global | Deprecated | |
| ARGN-H | Argon [x1] | Global | Deprecated | |
| ARGNKIT | Argon, Starter Kit  [x1] | Global | Deprecated | |
| ARGNTRAY50 | Argon, Tray [x50] | Global | Deprecated | |


{{!-- END do not edit content above, it is automatically generated 81ddccf2-774f-11eb-9439-0242ac130002 --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-   Model Number: ARGN
-   RoHS
-   CE
-   FCC ID: 2AEMI-ARGN
-   ISED: 20127-ARGN

## Product handling

### ESD precautions

The Argon contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling Argon without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates Argon. ESD precautions should be implemented on the application board where the Argon is mounted. Failure to observe these precautions can result in severe damage to the Argon!

### Connectors

There are four connectors on the Argon that will get damaged with improper usage. The JST connector on the circuit board, where you plug in the LiPo battery, is very durable but the connector on the battery itself is not. When unplugging the battery, take extra precaution to **NOT** pull the connector using the wires, but instead hold the plug at its base to avoid putting stress on the wires. This can be tricky with bare hands - needle nose pliers are your friend here.

<div align=center><img src="/assets/images/lipo-connection.png" ></div>

The micro B USB connector on the Argon is soldered on the PCB with large surface pads as well as couple of through hole anchor points. Despite this reinforcement, it is very easy to rip out the connector if too much stress is put on in the vertical direction.

<div align=center><img src="/assets/images/proper-usb-connection.png" ></div>

The U.FL antenna connector is not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used to securely hold the plug in place.

The 10 pin SWD connector provides an easy in-system debugging access to the device. The pins on the connector can easily be damaged if the mating connector cable is inserted improperly. If you are trying to debug the device, you probably are already not in a good mood. The last thing you want is to render the connector useless. Be nice and be gentle with the connector. Good luck with the debugging!

### Breadboarding

The breadboard provided with the Argon is specifically designed to require low insertion force. This makes it easy to plug the Argon in and out of the breadboard. If you end up using a different breadboard, remember that it may require more force. In this case, always remember to pinch-hold your precious Argon by the sides (along the header pins) when plugging-unplugging and not by the USB connector (don't be this person).

## Default settings

The Argon comes preprogrammed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

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

* Contains FCC ID: 2AEMI-ARGN

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

 * Contains transmitter module ISED: 20127-ARGN

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
| v005     | 15-Mar-2021 | RK | Updated ordering information |
| v006     | 28-Jun-2021 | RK | Added Device OS 3.1 memory map information |
| v007     | 28-Jul-2021 | RK | Corrected number of SPI ports (2) in peripherals and GPIO |
| v008     | 10-Sep-2021 | RK | Changed wording of peak vs. max current |
| v009     | 14-Mar-2022 | RK | Added deprecation notice |
| v010     | 18-May-2023 | RK | Add warning that the Argon cannot be powered by 3V3 |
| v011     | 12-Mar-2024 | RK | Fix location of VUSB diode in block diagram |
| v012     | 15-Mar-2024 | RK | Update VUSB diode and descriptive text for VUSB |
| v013     | 03-Sep-2025 | RK | Corrected the BLE operating frequency to 2400 to 2480 MHz |


## Known errata

## Contact

**Web**

[https://www.particle.io](https://www.particle.io)

**Community Forums**

[https://community.particle.io](https://community.particle.io)
