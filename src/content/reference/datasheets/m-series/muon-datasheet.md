---
title: Muon datasheet
columns: two
layout: commonTwo.hbs
description: Muon datasheet
---

# Muon datasheet

{{box op="start" cssClass="boxed warningBox"}}
This is a very preliminary datasheet. There may be errors and design changes prior to release.
{{box op="end"}}

## Overview

The Muon is a developer kit based on the M SoM with additional peripherals for easy prototyping.

The M SoM module contains the following functional units:
 
- M.2 SoM form-factor, like the B Series SoM
- Can use cellular or Wi-Fi (2.4 GHz or 5 GHz) for the cloud connection
- Realtek RTL8722DM MCU (BLE and Wi-Fi)
- Cellular modem 
  - Quectel BG95-M5 LTE Cat M1 (North America)
  - Quectel EG91-EX LTE Cat 1 with 2G/3G fallback (EMEAA)

The Muon adds:

- LoRa module
- 96-pin Expansion connector
- Temperature sensor 
- Configuration EEPROM
- Real-time clock and watchdog chip (AM1805
- Reset and mode buttons
- RGB status LED
- Power input options
  - USB-C
  - VIN (6-12 VDC)

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

{{imageOverlay src="/assets/images/m-series/muon-block-diagram.png" alt="Block diagram" class="full-width"}}

### Device families

| | Cellular Only | Cellular & Wi-Fi | Wi-Fi Only |
| :--- | :---: | :---: | :---: |
| Developer devices | Boron | Muon | Photon 2 |
| Production module | B SoM | M SoM | P2 |

### Migration guides

If you are migrating to the M SoM from another Particle device, see also the following migration guides:


### Power

### RF

- The M SoM includes three U.FL connectors for external antennas:
  - Cellular 
  - Wi-Fi (2.4 GHz and 5 GHz) and BLE
  - GNSS (GPS)
- Wi-Fi operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.
- GNSS features are limited M404 as the cellular modem cannot do cellular communication and GNSS at the same time.

### Approved Antennas

To be provided at a later date.

#### General Antenna Guidance

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

Muon has a Particle-standard 10-pin 2x5 SWD debugging connector. This interface can be used to debug your code or reprogram your bootloader, device OS, or the user firmware using any standard SWD tools including our Gen 3 Debugger.

<div align=center><img src="/assets/images/boron/swd-connector-pinout.png" ></div>

SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840). Using a Debug build in Particle workbench will allow SWD to continue to run, but you will not be able to use pins A5, A6, or D27 as GPIO or ADC.

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | SWCLK | PB[7] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWO (Serial Wire Output) is not supported on the RTL8722DM.
- Pins 45 and 53 are shared 

## Pin information

### Pinout diagram

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Pinout" class="full-width"}}


### Pin function by pin name

{{!-- BEGIN do not edit content below, it is automatically generated 4c12540b-20a8-4d2b-a070-0237af5223e3 --}}

| Pin Name |   |   |   |   | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 / D19 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | PB[4] |
| A1 / D18 | ADC_1 | &nbsp; | &nbsp; | &nbsp; | PB[5] |
| A2 / D17 | ADC_2 | &nbsp; | &nbsp; | &nbsp; | PB[6] |
| A3 / D16 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A4 / D15 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A5 / D14 | ADC_6 | &nbsp; | &nbsp; | &nbsp; | PB[3] |
| A6 / D29 | ADC_3 | SWCLK | &nbsp; | &nbsp; | PB[7] |
| A7 / WKP | ADC_7 | &nbsp; | &nbsp; | &nbsp; | PA[20] |
| D0 | &nbsp; | Wire (SDA) | &nbsp; | &nbsp; | PB[0] |
| D1 | &nbsp; | Wire (SCL) | &nbsp; | &nbsp; | PA[31] |
| D2 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial1 (RTS)  | PA[14] |
| D3 | &nbsp; | &nbsp; | SPI1 (SS) | Serial1 (CTS)  | PA[15] |
| D4 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[18] |
| D5 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[19] |
| D6 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[20] |
| D7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[21] |
| D8 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | PA[19] |
| D20 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[1] |
| D21 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| D22 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[9] |
| D23 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[10] |
| D24 | &nbsp; | &nbsp; | &nbsp; | Serial2 (TX)  | PA[7] |
| D25 | &nbsp; | &nbsp; | &nbsp; | Serial2 (RX)  | PA[8] |
| D26 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[4] |
| D27 | &nbsp; | SWDIO | &nbsp; | &nbsp; | PA[27] |
| MISO / D11 | &nbsp; | &nbsp; | SPI (MISO) | &nbsp; | PA[17] |
| MOSI / D12 | &nbsp; | &nbsp; | SPI (MOSI) | &nbsp; | PA[16] |
| NC | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| PGOOD | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| RGBB | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| RGBG | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| RGBR | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| RUN | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| RX / D10 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial1 (RX)  | PA[13] |
| SCK / D13 | &nbsp; | &nbsp; | SPI (SCK) | &nbsp; | PA[18] |
| TS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| TX / D9 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial1 (TX) | PA[12] |
| USBDATA- | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| USBDATA+ | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |
| VBUS | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}


### GPIO (Digital I/O)

{{imageOverlay src="/assets/images/m-series/muon-gpio.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 2f265258-147d-4139-8a20-d85d1d137af5 --}}

| Muon Pin Name | Muon GPIO | MCU | Special boot function |
| :--- | :--- | :--- | :--- |
| A1 / D18 | &check; | PB[5] | &nbsp; |
| A3 / D16 | &check; | PB[1] | &nbsp; |
| A5 / D14 | &check; | PB[3] | &nbsp; |
| A7 / WKP | &check; | PA[20] | &nbsp; |
| D20 | &check; | PA[1] | &nbsp; |
| D21 | &check; | PA[0] | &nbsp; |
| D8 | &check; | PA[19] | &nbsp; |
| SCK / D13 | &check; | PA[18] | &nbsp; |
| MISO / D11 | &check; | PA[17] | &nbsp; |
| MOSI / D12 | &check; | PA[16] | &nbsp; |
| D0 | &check; | PB[0] | &nbsp; |
| D1 | &check; | PA[31] | &nbsp; |
| D3 | &check; | PA[15] | &nbsp; |
| D2 | &check; | PA[14] | &nbsp; |
| RX / D10 | &check; | PA[13] | &nbsp; |
| TX / D9 | &check; | PA[12] | &nbsp; |
| A0 / D19 | &check; | PB[4] | &nbsp; |
| A2 / D17 | &check; | PB[6] | &nbsp; |
| A4 / D15 | &check; | PB[2] | &nbsp; |
| A6 / D29 | &check; | PB[7] | SWCLK. 40K pull-down at boot. |
| D22 | &check; | PA[9] | &nbsp; |
| D23 | &check; | PA[10] | &nbsp; |
| D4 | &check; | PB[18] | &nbsp; |
| D5 | &check; | PB[19] | &nbsp; |
| D6 | &check; | PB[20] | &nbsp; |
| D7 | &check; | PB[21] | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- All GPIO are 3.3V only and are not 5V tolerant

Certain GPIO will change state at boot, or cause the MCU to enter a special mode. See the [boot mode pins](#boot-mode-pins) section, below, for more information.


### ADC (Analog to Digital Converter)

{{imageOverlay src="/assets/images/m-series/muon-adc.svg" alt="ADC pins" class="full-width"}}

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

{{imageOverlay src="/assets/images/m-series/muon-uart.svg" alt="UART pins" class="full-width"}}


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

{{imageOverlay src="/assets/images/m-series/muon-spi.svg" alt="GPIO pins" class="full-width"}}

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

{{imageOverlay src="/assets/images/m-series/muon-i2c.svg" alt="GPIO pins" class="full-width"}}

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

{{imageOverlay src="/assets/images/m-series/muon-pwm.svg" alt="GPIO pins" class="full-width"}}

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


### RGB LED

The M SoM supports an external common anode RGB LED on the base board, and the pins are exposed on the expansion connector.

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



## Mechanical specifications

### Dimensions and Weight

To be provided at a later date.


### Mechanical drawing

To be provided at a later date.


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

* Contains FCC ID: xxx

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


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-02-04 | RK | Interal pre-release |
