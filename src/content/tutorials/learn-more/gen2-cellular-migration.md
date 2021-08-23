---
title: Gen 2 cellular migration
columns: two
layout: commonTwo.hbs
description: Learn more about migrating from Gen 2 to Gen 3 cellular devices
---

# {{title}}

This document has information on migrating designs based on the Gen 2 cellular devices (Electron, E Series) to Gen 3 cellular devices (Boron, B Series SoM, Tracker SoM). There are not pin-compatible replacements to make this migration, and there are some necessary hardware tradeoffs and design changes that may be required for some features.

## Gen 2 overview


### Electron 

![Electron](/assets/images/electron/illustrations/electron-v20.png)

The Electron is a 2nd-generation device designed to easily plug into a solderless breadboard, or can be installed in a socket on your own circuit board.

#### Peripherals and GPIO - Electron

{{pin-table platform="Electron"}}

- Wire (D0 and D1) and Wire1 (C4 and D5) connect to the same I2C peripheral and only one can be used at a time.

#### SKUs - Electron

{{!-- BEGIN do not edit content below, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Global | U201 | GA | |
| ELC404TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Global | G350 | NRND | ELC314TY|
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | ELC404EA|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | ELC404TY|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Americas | U260 | Discontinued | ELC314TY|
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | EMEAA | U270 | Discontinued | ELC314TY|


{{!-- END do not edit content above, it is automatically generated 7a6e03da-072c-4955-922a-288e9609292a --}}

### E Series

![E Series](/assets/images/e-series/illustrations/e0-top.png)

The E Series module is a 2nd-generation cellular device that is reflow soldered to your custom base board. As the software is fully compatible between the Electron and E Series, you can easily move from prototyping to mass production with the same software.

Though the form-factor is different than the Electron, they are nearly identically electrically, and the same software binaries can be used on both the Electron and E Series.

#### Peripherals and GPIO - E Series

{{pin-table platform="E Series"}}

- Wire (D0/D1) and Wire1 (C4/D5) connect to the same I2C peripheral and only one can be used at a time.


#### SKUs - E Series


{{!-- BEGIN do not edit content below, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Global | U201 | GA | |
| E314MOD1 | E Series 2G/3G (Global - E314), [x1] | Global | U201 | GA | |
| E314TRAY50 | E Series 2G/3G (Global - E314), Tray [x50] | Global | U201 | GA | |
| E404KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 | GA | |
| E404MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| E404TRAY50 | E Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| E310TRAY50 | E Series 2G/3G (Global - E310), Tray [x50] | Global | U201 | NRND-US | |
| E313TY | E Series 2G/3G (Global - E313), Tray [x50] | Global | U201 | NRND-US | |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Global | U201 | NRND | E314KIT|
| E310MOD1 | E Series 2G/3G (Global - E310), [x1] | Global | U201 | NRND | E314MOD1|
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | NORAM | R410 | NRND | E404KIT|
| E402MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | E404MOD1|
| E402TRAY50 | E Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | E404TRAY50|
| E313EA | E Series 2G/3G (Global - E313), [x1] | Global | U201 | Discontinued | |


{{!-- END do not edit content above, it is automatically generated d5825d70-1978-4172-a917-9127c8879f4e --}}


### Feature Comparison - Gen 2

| Feature | Electron | E Series Module | Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | &nbsp; |
| MFF2 SMD Particle SIM | &nbsp; | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge| &check; | &check; | |



#### Antennas - Gen 2

Note that there are antenna differences between some Gen 2 and Gen 3 models, and a different antenna may be required.

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x1] | ANTELEC | Electron and E Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-antenna-1) |
| Taoglas Cellular PCB Antenna 2G/3G 2.4dBi, [x50] | ANTELEC50 | Electron and E Series 2G/3G | [Datasheet](/assets/datasheets/PC104.07.0165C.pdf) |
| Tracker One Cellular Antenna | | Tracker One | [Datasheet](/assets/pdfs/tracker-one-ant-cellular.pdf) |

- The Electron 2G/3G cellular antenna (ANTELEC) should not be used with LTE (Cat 1 or Cat M1) devices. Not only is it not certified, but is not compatible with all of the necessary bands for use with LTE.

## Gen 3 overview

### Boron

![Boron](/assets/images/boron/boron-top.png)

The Boron is the 3rd-generation cellular device in a prototyping form factor. It has pins on the bottom that can plug into a solderless breadboard, and is compatible with the Adafruit Feather form-factor to easily add accessories like sensors and displays. You can also plug it into a socket on a custom circuit board.

#### Country Compatibility - Boron

- The Boron 2G/3G Global (BRN314) can be used world-wide, however it is not recommended for the United States. In December 2022, all 2G/3G cellular operators will have shut down their 2G and 3G cellular networks and this device will no longer be able to connect.
- The Boron LTE Cat M1 (BRN404) is only recommended for use in the United States, Canada, and Mexico. 

#### Peripherals and GPIO - Boron

{{pin-table platform="Boron"}}


#### SKUs - Boron

{{!-- BEGIN do not edit content below, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | GA | |
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | GA | |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| BRN404KIT | Boron LTE CAT-M1 (NorAm) Starter Kit, [x1] | NORAM | R410 | GA | |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Global | U201 | NRND-US | BRN314TRAY50|
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Global | U201 | NRND | BRN314KIT|
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | BRN404|
| BRN402KIT | Boron LTE CAT-M1 (NorAm) Starter Kit, [x1] | NORAM | R410 | NRND | BRN404KIT|
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | BRN404TRAY50|


{{!-- END do not edit content above, it is automatically generated 0f0d9a27-0176-4f7d-8006-75cf7c3f5072 --}}


### B Series SoM

![B Series](/assets/images/b-series/b-series-top.png)

The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.


#### Country Compatibility - B Series SoM

- The B Series SoM LTE Cat M1 (B404) is only recommended for use in the United States, Canada, and Mexico. 
- The B Series LTE Cat 1 with 2G/3G fallback (B524) is only recommended in Europe, Australia, and New Zealand.

Note that the T524 only supports EMEAA cellular frequencies and thus it cannot connect in most locations in the Americas. It does not work at all in the United States.

#### Peripherals and GPIO - B Series SoM

{{pin-table platform="B4xx SoM"}}


#### SKUs - B Series SoM

{{!-- BEGIN do not edit content below, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| B404MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | GA | |
| B404MTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | GA | |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E | GA | |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E | GA | |
| B402MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | R410 | NRND | B404MEA|
| B402MTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | R410 | NRND | B404MTY|
| B523MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | EG91-E | NRND | B524MEA|
| B523MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-E | NRND | B524MTY|


{{!-- END do not edit content above, it is automatically generated 295a969b-7ffa-4f84-8234-7e4cb38d1f10 --}}


### Tracker SoM

![SoM](/assets/images/at-som/at-som-bg96.png)

The Asset Tracker SoM is a castellated SoM designed to be used with the Tracker One or reflow soldered to your own base board. It has features including:

- Gen 3 hardware platform (nRF52840 MCU)
- Quectel cellular modem
- GNSS (GPS)
- IMU (accelerometer)
- Real-time clock
- Hardware watchdog

#### Country Compatibility - Tracker SoM

- The Tracker SoM LTE Cat M1 (T404) is only recommended for use in the United States, Canada, and Mexico. 
- The Tracker LTE Cat 1 with 2G/3G fallback (T524) is only recommended in Europe, Australia, and New Zealand.

Note that the T524 only supports EMEAA cellular frequencies and thus it cannot connect in most locations in the Americas. It does not work at all in the United States; you must use the T404 in the United States.

#### Peripherals and GPIO - Tracker SoM

{{pin-table platform="Tracker SoM"}}

- Analog and digital pins (A0 and D0 for example) are the same physical pin on the Tracker SoM.
- Wire (D0/D1) and Wire3 (TX/RX) connect to the same I2C peripheral and only one can be used at a time. This feature is mainly because TX/RX are exposed on the M8 connector on the Tracker One, and this allows the port to be switched between I2C and UART serial modes.

#### SKUs - Tracker SoM

{{!-- BEGIN do not edit content below, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}

| SKU | Description | Region  | Modem | Lifecycle | Replacement |
| :--- | | :--- | :---  | :--- | :--- | :--- | :--- |
| ONE404MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC | GA | |
| ONE404MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC | GA | |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | GA | |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX | GA | |
| T404MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC | GA | |
| T404MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC | GA | |
| T404MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC | GA | |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | GA | |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX | GA | |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX | GA | |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | NORAM | BG96-MC | NRND | ONE404MEA|
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | NORAM | BG96-MC | NRND | ONE404MTY|
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | NRND | ONE524MEA|
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | EMEAA | EG91-EX | NRND | ONE524MTY|
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | NORAM | BG96-MC | NRND | T404MEA|
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | NORAM | BG96-MC | NRND | T404MKIT|
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | NORAM | BG96-MC | NRND | T404MTY|
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | EMEAA | EG91-EX | NRND | T524MEA|
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | EMEAA | EG91-EX | NRND | T524MKIT|
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | EMEAA | EG91-EX | NRND | T524MTY|


{{!-- END do not edit content above, it is automatically generated d833e557-5289-450c-92cf-a6eedec30bd8 --}}

### Feature comparison - Gen 3

| Feature | Boron | B Series SoM | SoM Base Board | Tracker SoM |
| --- | :---: | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |&check; | 
| MFF2 SMD Particle SIM | &check; | &check; | &nbsp; |&check; | 
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional | Optional |
| Status LED | &check; | &nbsp; | Optional | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional | Optional |
| Battery Connector | &check; | &nbsp; | Optional | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional | &check; | 

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

#### Antennas - Gen 3

| Antenna | SKU | Details | Links |
| :----- | :--- | :------ | :---- |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x1]| ANTCW2EA | Tracker, B Series, E Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-lte-4-7dbi) |
| Particle Cellular Flex Antenna 2G/3G/LTE 4.7dBi, [x50] | ANTCW2TY | Tracker, B Series, E Series | [Datasheet](/assets/datasheets/ANTCW2EA.pdf) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x1]| ANT-FLXU | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf) &#124; [Retail Store](https://store.particle.io/collections/shields-and-kits/products/cellular-flex-antenna-2g-3g-m1-nb1) |
| Taoglas Cellular Flex Antenna 2G/3G/LTE 5dBi, [x50] | ANT-FLXU-50 | Boron and Electron/E Series LTE M1 | [Datasheet](/assets/datasheets/FXUB63.07.0150C.pdf)|


## Hardware differences

### GPIO

There are fewer available GPIO pins on Gen 3 devices. If you need a large number of GPIO pins, an external GPIO expander connected by I2C or SPI is a good option.

The [MCP23008](https://github.com/rickkas7/MCP23008-RK) is an 8-port GPIO expander that connects to I2C and works well with Gen 3 devices. You can connect up to 8 of them to a single I2C interface. the [MCP23017](https://github.com/rickkas7/MCP23017-RK) has 16-ports, and you can also connect 8 of them, for a total of 128 GPIO ports.

The application note [AN013 Tracker GPIO](/datasheets/app-notes/an013-tracker-gpio) shows how you can add additional GPIO to your Tracker One using the external M8 connector. It includes both 3.3V and 5V design options, as well. The techniques work on other Gen 3 devices as well.

### 5V tolerance

The other difference in the GPIO between Gen 2 and Gen 3 is with 5V tolerance. While both devices are 3.3V devices and only will drive 3.3V, the I/O pins on Gen 2 devices (with the exception of A3 and A6) are 5V tolerant. This allows a Gen 2 device to connect to some 5V peripherals directly.

**You must not connect 5V peripherals to a Gen 3 device.** This includes GPIO, ports (serial, I2C, SPI), and ADC. 

Interfacing with 5V peripherals can be done with a level shifter, a MOSFET, or a 5V GPIO expander.

### Serial (UART)

There are more UART ports on the Gen 2 devices than Gen 3. If you need more hardware serial ports, the best option is to use the [SC16IS740](https://github.com/rickkas7/SC16IS740RK) or its relatives like the SC16IS750. These devices connect by I2C or SPI, and you can add multiple ports this way.

#### Serial Baud Rates

| Baud Rate | Gen 2 | Gen 3 |
| ------: | | :---: | :---: |
|    1200 | &check; | &check; |
|    2400 | &check; | &check; |
|    4800 | &check; | &check; |
|    9600 | &check; | &check; |
|   19200 | &check; | &check; |
|   28800 | &nbsp;  | &check; |
|   38400 | &check; | &check; |
|   57600 | &check; | &check; |
|   76800 | &nbsp;  | &check; |
|  115200 | &check; | &check; |
|  230400 | &check; | &check; |
|  250000 | &nbsp;  | &check; |
|  460800 | &nbsp;  | &check; |
|  921600  | &nbsp; | &check; |
| 1000000 | &nbsp;  | &check; |

#### Serial configurations

| Constant | Description | Gen 2 | Gen 3 |
| :--- | :--- | :---: | :---: |
| SERIAL_8N1 | 8 data bits, no parity, 1 stop bit (default) | &check; | &check; |
| SERIAL_8N2 | 8 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8E1 | 8 data bits, even parity, 1 stop bit | &check; | &check; |
| SERIAL_8E2 | 8 data bits, even parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8O1 | 8 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_8O2 | 8 data bits, odd parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_9N1 | 9 data bits, no parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_9N2 | 9 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_7O1 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7O2 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E1 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E2 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| LIN_MASTER_13B | 8 data bits, no parity, 1 stop bit, LIN Master mode with 13-bit break generation | &check; | &nbsp; |
| LIN_SLAVE_10B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 10-bit break detection | &check; | &nbsp; |
| LIN_SLAVE_11B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 11-bit break detection | &check; | &nbsp; |


### DAC

- Gen 2 devices have two DAC (digital-to-analog converter), on pins A3 and A6. 

- Gen 3 devices do not have built-in DAC, however they can easily be added by I2C or SPI.

### I2C

- On Gen 2, Wire (D0/D1) and Wire1 (C4/D5) connect to the same I2C peripheral and only one can be used at a time.
- On the Boron, there is only one available I2C interface (D0/D1).
- On the B Series SoM, there are two available independent I2C interfaces (D0/D1 and D2/D3)
- On the Tracker SoM, Wire (D0/D1) and Wire3 (TX/RX) connect to the same I2C peripheral and only one can be used at a time. This feature is mainly because TX/RX are exposed on the M8 connector on the Tracker One, and this allows the port to be switched between I2C and UART serial modes.

### SPI

- Gen 2 devices have two SPI ports.
- The Boron and B Series SoM have two SPI ports.
- The Tracker SoM only has one available SPI port.
- In most cases, you can share a single SPI bus with many peripherals.

### CAN Bus

- Gen 3 devices do not support CAN on the MCU.
- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to other Gen 3 devices.

### MCU

The microcontroller is different in Gen 2 vs. Gen 3 devices:

| Measure | Gen 2 | Gen 3 |
| :--- | :---: | :---: |
| MCU | STM32F205 | nRF52840 |
| Manufacturer | ST Microelectronics | Nordic Semiconductor |
| Processor | ARM Cortex M3 | ARM Cortex M4F |
| Speed | 120 MHz | 64 MHz |
| RAM | 128 KB | 256 KB | 
| Flash (MCU) | 1 MB | 1 MB |
| Flash (external) | &nbsp; | 4 MB<sup>1</sup> |
| Hardware floating point | &nbsp; | &check; |

- <sup>1</sup>8 MB on the Tracker One. Most of this space is reserved by the system and only a portion if it is available to user applications as a flash file system.
- Not all RAM is available to user applications. The Device OS firmware uses a portion of it.

### BLE (Bluetooth LE)

- Bluetooth LE (BLE 5.0) is supported on Gen 3 devices but not Gen 2.

### NFC Tag

- NFC tag mode is supported on Gen 3 devices but not Gen 2.

### Flash file system

- Gen 3 devices have a user-accessible flash file system with a POSIX API.
- It is 2 MB on the Boron and B Series SoM, and 4 MB on the Tracker SoM.
- Gen 2 devices do not have an available file system for storing data.

### Sleep Modes

- In general, Gen 3 devices use less power in all modes.
- In `HIBERNATE` mode, the RTC (real time clock) does not run on Gen 3 devices, so you cannot wake by time from `HIBERNATE` mode (formerly known as `SLEEP_MODE_DEEP`).
- However, you can wake by time from `ULTRA_LOW_POWER` mode, and it uses less power than the Gen 2 `HIBERNATE` mode.
- On Gen 2 devices, you can only wake from `HIBERNATE` with a rising signal on `WKP` (A7). Gen 3 devices can wake from `HIBERNATE` on any pin, rising or falling.
- On Gen 2 (STM32F205) devices, if you try to go into `HIBERNATE` mode with WKP already high, the device will go into sleep and will not wake up by time or pin change, essentially rendering it unable to wake until reset manually. This problem does not occur on Gen 3 devices.

### RTC (Real-time clock)

- The E Series module has the ability to use an external lithium coin cell or supercap to power the RTC when the MCU is unpowered. This feature is difficult to access on the Electron (requires removing a resistor on the module) amd does not exist on Gen 3 devices.
- The RTC on Gen 3 devices is not really a real-time clock. It's basically just a counter, and some advanced wakeup features are not possible on Gen 3 devices. These features were not enabled by Device OS on Gen 2 devices, either, so this is generally not an issue.
- On Gen 3 devices, in `HIBERNATE` sleep mode the RTC does not run, so it is not possible to wake by time, and the system clock will not be set until you connect to the cloud again. `ULTRA_LOW_POWER` is recommended instead.

### SWD/JTAG

- Gen 2 devices support SWD on D6 and D7, and full JTAG on D3, D4, D5, D6, and D7.
- Gen 3 devices only support SWD, and do so via a dedicated debug connector.
- The Boron has the debug connector on top of the module.
- The B Series SoM has SWD on pads on the bottom of the SoM. The evaluation board connects to these with pogo pins and breaks out to the same 2x5 connector that is on the Boron.

## Cellular Differences


### SIM cards

There are two different kinds of SIM cards, depending on the device.

- Nano (4FF) SIM card holder that accepts a physical SIM card
- MFF2 embedded SMD SIM soldered to the device

The MFF2 embedded SIM card is best for harsh conditions as it's more robust than the plastic card and connector. It is not a programmed eSIM, however. It's basically the same as the Particle SIM card, except in an SMD form-factor. It cannot be reprogrammed to support other carriers.

The Boron has both a MFF2 Particle SIM soldered to the board and an empty nano SIM card holder that can be used for 3rd-party SIM cards. 

| Device | Model | Nano SIM Card | MFF2 SMD SIM | 
| --- | :--- | :---: | :---: | 
| Boron 2G/3G | BRN314 BRN310 | &check; | &check; |
| Boron LTE  | BRN404 BRN402 | &check; | &check; |
| B Series B402 SoM (Cat M1) | B404 B402 | &nbsp; | &check; |
| B Series B523 SoM (Cat 1) | B524 B523 | &nbsp; | &check; |
| Tracker SoM (LTE Cat M1) | T404 T402 | &nbsp; | &check; |
| Tracker SoM (LTE Cat 1 and 2G/3G) | T524 T523 | &nbsp; | &check; |
| Electron 2G | G350 | &check; | &nbsp; |
| Electron 3G | U260 | &check; | &nbsp; |
| Electron 3G | U270 |  &check; | &nbsp; |
| Electron Global | ELC314 | &check; | &nbsp; |
| Electron LTE (Cat M1) | ELC404 ELC402 | &nbsp; | &check; |
| E Series 2G/3G | E314 E310 | &nbsp; | &check; |
| E Series LTE (Cat M1) | E404 E402 | &nbsp; | &check; |

- Devices without a Nano SIM card socket cannot be used with a 3rd-party SIM card. 
- 3rd-party SIM cards are not recommended for product deployments at scale.

## Software Differences

### User firmware binary size

One major advantage of Gen 3 devices is that user firmware binaries in Device OS 3.1.0 and later can be up to 256 Kbytes, instead of 128 Kbytes in earlier version of Device OS and on Gen 2 devices. The larger firmware binary support will not be added to Gen 2 in the future, and will only be available on Gen 3 devices.

### Flash file system

As mentioned earlier, there is a flash file system (2 MB except on the Tracker which is 4 MB) for storing user data, on Gen 3 devices only.

### Combined and resumable OTA

On Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning.

These features are only available on Gen 3 and will not be available on Gen 2.
