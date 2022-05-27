---
title: P2 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle P2, Wi-Fi mass-production module
---

# P2 Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}


![P2 Rendering](/assets/images/p2-rendering.png)

## Functional description

### Overview

The P2 is a SMD module with a microcontroller and Wi-Fi networking. The form-factor is the same as the P1, but
the P2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications.

### Features

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - Integrated PCB antenna
  - Integrated U.FL connector for external antenna
  - Integrated RF switch
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8721DM MCU
  - ARM Cortex M4F CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 2 MB flash file system
- FCC, IC, and CE certified


## Interfaces

### Block Diagram

{{imageOverlay src="/assets/images/p2-block-diagram.png" alt="Block Diagram" class="full-width"}}

{{!-- ### Power --}}

### RF

- The P2 includes an on-module PCB trace antenna and a U.FL connector that allows the user to connect an external antenna.
- The antenna is selected in software. The default is the PCB trace antenna.
- The area surrounding the PCB antenna on the carrier PCB should be free of ground planes and signal traces for maximum Wi-Fi performance when using the trace antenna.
- Device operation in the 5150-5250 MHz band is only for indoor use to reduce the potential for harmful interference to co-channel mobile satellite systems.

### FCC Approved Antennas

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| External antenna | Wistron NeWeb Corporation | 95XEAK15.G53| 1.55dBi |
| Internal PCB Antenna | Included | - | 2.41dBi |

---

### SWD/JTAG

The P2 module supports programming and debugging use SWD (Serial Wire Debug) on pins D6 and D7.

| Pin   | JTAG   | MCU Pin | P2 Pin # | Pull at boot |
| :---: | :----: | :-----: | :------: | :----------: |
| D7    | SWDIO  | PA[27]  | 54       | Pull-up      |
| D6    | SWCLK  | PB[3]   | 55       | Pull-down    |
| 3V3   | Power  |         |          |              |
| GND   | Ground |         |          |              |
| RST   | Reset  |         |          |              |

When the bootloader starts, for a brief period of time a weak pull-up is applied to pin D7 and pull-down to pin D6 to detect whether a SWD debugger is attached. After boot, you can use these pins for regular GPIO, but beware of a possible GPIO state change caused by the pull-up or pull-down when using these pins as output.

Note that SWD is shared with GPIO pins D6 and D7, and by default SWD is only enabled while the bootloader is running, immediately at boot, and when in DFU mode (blinking yellow). Only Debug builds in Particle Workbench have SWD enabled in when user firmware is running.

---

## Memory Map

{{!-- ### Flash Layout Overview --}}

### DCT Layout

[This information is from the P1, and is likely to remain the same, but is subject to change.]

The DCT area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCT layout in `release/stable`_ <a href="https://github.com/particle-iot/device-os/blob/release/v2.x/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

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

{{!-- ### Memory Map --}}

## Pin and button definition

| Peripheral Type | Qty | Input(I) / Output(O) |
| :-:|:-:|:-:|
| Digital | 22 | I/O |
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

| Pin Name | Module Pin |   |   |   |   | MCU |
| :--- | :---: | :--- | :--- | :--- | :--- | :--- |
| A0 / D11 | 50 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A1 / D12 | 43 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A2 / D13 | 49 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | PB[7] |
| A5 / D14 | 23 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | PB[4] |
| D0 / A3 | 36 | ADC_2 | Wire (SDA) | &nbsp; | &nbsp; | PB[6] |
| D1 / A4 | 35 | ADC_1 | Wire (SCL) | &nbsp; | &nbsp; | PB[5] |
| D10 / WKP | 30 | &nbsp; | &nbsp; | &nbsp; | Serial3 (CTS) | PA[15] |
| D2 | 45 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial2 (RTS) | PA[16] |
| D3 | 51 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial2 (CTS) | PA[17] |
| D4 | 52 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial2 (TX) | PA[18] |
| D5 | 53 | &nbsp; | &nbsp; | SPI1 (SS) | Serial2 (RX) | PA[19] |
| D6 | 55 | &nbsp; | SWCLK | &nbsp; | &nbsp; | PB[3] |
| D7 | 54 | &nbsp; | SWDIO | &nbsp; | &nbsp; | PA[27] |
| NC | 7 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| RGBB | 31 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[22] |
| RGBG | 32 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[23] |
| RGBR | 29 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[30] |
| RX / D9 | 63 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RX)  | PA[8] |
| S0 / D15 | 40 | &nbsp; | &nbsp; | SPI (MOSI) | Serial3 (TX) | PA[12] |
| S1 / D16 | 41 | &nbsp; | &nbsp; | SPI (MISO) | Serial3 (RX) | PA[13] |
| S2 / D17 | 42 | &nbsp; | &nbsp; | SPI (SCK) | Serial3 (RTS) | PA[14] |
| S3 / D18 | 44 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | PB[26] |
| S4 / D19 | 47 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| S5 / D20 | 48 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[29] |
| S6 / D21 | 33 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PB[31] |
| TX / D8 | 64 | &nbsp; | &nbsp; | &nbsp; | Serial1 (TX) | PA[7] |
| USBDATA- | 62 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[25] |
| USBDATA+ | 61 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[26] |


{{!-- END do not edit content above, it is automatically generated 8bd904e1-0088-488c-9fbb-e695d7643949 --}}

### ADC (Analog to Digital Converter)

The P2 supports six ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated ed5c8a8d-6f7f-4253-be72-a45e7316421e --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A5 / D14 | A5 Analog in, GPIO, PWM. | ADC_0 | PB[4] |
| 35 | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | ADC_1 | PB[5] |
| 36 | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | ADC_2 | PB[6] |
| 43 | A1 / D12 | A1 Analog in, GPIO | ADC_5 | PB[2] |
| 49 | A2 / D13 | A2 Analog in, PWM, GPIO | ADC_3 | PB[7] |
| 50 | A0 / D11 | A0 Analog in, GPIO | ADC_4 | PB[1] |


{{!-- END do not edit content above, it is automatically generated ed5c8a8d-6f7f-4253-be72-a45e7316421e --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits

### UART serial

The P2 supports three UART serial interfaces. 

{{!-- BEGIN do not edit content below, it is automatically generated cd89fea9-4917-4af5-bfd0-4bdaa400545c --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 30 | D10 / WKP | D10 GPIO, Serial 3 CTS. (Was WKP/A7 on P1.) | Serial3 (CTS) | PA[15] |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | Serial3 (TX) | PA[12] |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | Serial3 (RX) | PA[13] |
| 42 | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | Serial3 (RTS) | PA[14] |
| 45 | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | Serial2 (RTS) | PA[16] |
| 51 | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | Serial2 (CTS) | PA[17] |
| 52 | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | Serial2 (TX) | PA[18] |
| 53 | D5 | D5 GPIO, Serial2 RX, SPI1 SS | Serial2 (RX) | PA[19] |
| 63 | RX / D9 | Serial1 RX (received data), GPIO | Serial1 (RX)  | PA[8] |
| 64 | TX / D8 | Serial1 TX (transmitted data), GPIO | Serial1 (TX) | PA[7] |


{{!-- END do not edit content above, it is automatically generated cd89fea9-4917-4af5-bfd0-4bdaa400545c --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- Serial1 uses the RTL872x UART_LOG peripheral
- Serial2 uses the RTL872x HS_UART0 peripheral
- Serial3 uses the RTL872x LP_UART peripheral
- Supported baud rates: 110, 300, 600, 1200, 9600, 14400, 19200, 28800, 38400, 57600, 76800, 115200, 128000, 153600, 230400, 500000, 921600, 1000000, 1382400, 1444400, 1500000, 1843200, 2000000, 2100000, 2764800, 3000000, 3250000, 3692300, 3750000, 4000000, 6000000



### SPI

The P2 supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated c48b830e-f222-4a5d-a34f-14973ce84e22 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | SPI (MOSI) | PA[12] |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | SPI (MISO) | PA[13] |
| 42 | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | SPI (SCK) | PA[14] |
| 44 | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS | SPI (SS) | PB[26] |
| 45 | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | SPI1 (MOSI) | PA[16] |
| 51 | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | SPI1 (MISO) | PA[17] |
| 52 | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | SPI1 (SCK) | PA[18] |
| 53 | D5 | D5 GPIO, Serial2 RX, SPI1 SS | SPI1 (SS) | PA[19] |


{{!-- END do not edit content above, it is automatically generated c48b830e-f222-4a5d-a34f-14973ce84e22 --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- SPI uses the RTL872x SPI1 peripheral (25 MHz maximum speed)
- SPI1 uses the RTL872x SPI0 peripheral (50 MHz maximum speed)


### I2C

The P2 supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated 5b55adb8-1e32-4518-b01e-eadf4e67a262 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | Wire (SCL) | PB[5] |
| 36 | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | Wire (SDA) | PB[6] |


{{!-- END do not edit content above, it is automatically generated 5b55adb8-1e32-4518-b01e-eadf4e67a262 --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are required for I2C
- If not using I2C, pins D0 and D1 can be used as GPIO or analog input.


### PWM

The P2 supports PWM (pulse-width modulation) on the following pins:

{{!-- BEGIN do not edit content below, it is automatically generated d68a9c54-a380-11ec-b909-0242ac120002 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 23 | A5 / D14 | A5 Analog in, GPIO, PWM. | PB[4] |
| 35 | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | PB[5] |
| 36 | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | PB[6] |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | PA[12] |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | PA[13] |
| 49 | A2 / D13 | A2 Analog in, PWM, GPIO | PB[7] |


{{!-- END do not edit content above, it is automatically generated --}}


All available PWM pins on the P2 share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### USB

The P2 supports a USB interface for programming the device and for USB serial (CDC) communications. The module itself does not contain a USB connector; you typically add a micro USB or USB C connector on your base board. It is optional but recommended.

{{!-- BEGIN do not edit content below, it is automatically generated 51e324e1-6f8a-43d5-aad2-f7cbbb699804 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 61 | USBDATA+ | USB Data+ | PA[26] |
| 62 | USBDATA- | USB Data- | PA[25] |


{{!-- END do not edit content above, it is automatically generated 51e324e1-6f8a-43d5-aad2-f7cbbb699804 --}}


### RGB LED

The P2 supports an external common anode RGB LED. 

One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K ohm current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values - 33 ohm on red, and 66 ohm on green and blue.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

The use of the RGB LED is optional, however it is highly recommended as troubleshooting the device without the LED is very difficult.

{{!-- BEGIN do not edit content below, it is automatically generated e5794e03-d007-4420-be1f-b62ca2788442 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 29 | RGBR | RGB LED Red | PA[30] |
| 31 | RGBB | RGB LED Blue | PB[22] |
| 32 | RGBG | RGB LED Green | PB[23] |


{{!-- END do not edit content above, it is automatically generated e5794e03-d007-4420-be1f-b62ca2788442 --}}


### SETUP and RESET button

It is highly recommended that you add SETUP and RESET buttons to your base board using momentary switches that connect to GND. These are necessary to change the operating mode of the device, for example to enter listening or DFU mode.

{{!-- BEGIN do not edit content below, it is automatically generated a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 34 | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| 46 | MODE | MODE button, has internal pull-up. Pin number constant is BTN. | PA[4] |


{{!-- END do not edit content above, it is automatically generated a4b4a564-7178-4ba6-a98e-7b7ac5c8eeb9 --}}


### Complete module pin listing

{{imageOverlay src="/assets/images/p2-pinout.svg" alt="P2 Pinout Diagram" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 5c5c78ef-c99c-49b7-80f4-19196b90ecfe --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 1 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 2 | 3V3_RF | 3.3V power to RF module | &nbsp; |
| 3 | 3V3_RF | 3.3V power to RF module | &nbsp; |
| 4 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 5 | 3V3_IO | 3.3V power to MCU IO. | &nbsp; |
| 6 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 7 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 8 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 9 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 10 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 11 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 12 | VBAT_MEAS | Battery voltage measurement (optional). | &nbsp; |
| 13 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 14 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 15 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 16 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 17 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 18 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 19 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 20 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 21 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 22 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 23 | A5 / D14 | A5 Analog in, GPIO, PWM. | PB[4] |
| 24 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 25 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 26 | 3V3 | 3.3V power to MCU | &nbsp; |
| 27 | 3V3 | 3.3V power to MCU | &nbsp; |
| 28 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 29 | RGBR | RGB LED Red | PA[30] |
| 30 | D10 / WKP | D10 GPIO, Serial 3 CTS. (Was WKP/A7 on P1.) | PA[15] |
| 31 | RGBB | RGB LED Blue | PB[22] |
| 32 | RGBG | RGB LED Green | PB[23] |
| 33 | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) | PB[31] |
| 34 | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| 35 | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | PB[5] |
| 36 | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | PB[6] |
| 37 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 38 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 39 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | PA[12] |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | PA[13] |
| 42 | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | PA[14] |
| 43 | A1 / D12 | A1 Analog in, GPIO | PB[2] |
| 44 | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS | PB[26] |
| 45 | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | PA[16] |
| 46 | MODE | MODE button, has internal pull-up. Pin number constant is BTN. | PA[4] |
| 47 | S4 / D19 | S4 GPIO. (Was P1S4 on P1.) | PA[0] |
| 48 | S5 / D20 | S5 GPIO. (Was P1S5 on P1.) | PB[29] |
| 49 | A2 / D13 | A2 Analog in, PWM, GPIO | PB[7] |
| 50 | A0 / D11 | A0 Analog in, GPIO | PB[1] |
| 51 | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | PA[17] |
| 52 | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | PA[18] |
| 53 | D5 | D5 GPIO, Serial2 RX, SPI1 SS | PA[19] |
| 54 | D7 | D7 GPIO, SWDIO | PA[27] |
| 55 | D6 | D6 GPIO, SWCLK | PB[3] |
| 56 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 57 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 58 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 59 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 60 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 61 | USBDATA+ | USB Data+ | PA[26] |
| 62 | USBDATA- | USB Data- | PA[25] |
| 63 | RX / D9 | Serial1 RX (received data), GPIO | PA[8] |
| 64 | TX / D8 | Serial1 TX (transmitted data), GPIO | PA[7] |
| 65 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 66 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 67 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 68 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 69 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 70 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 71 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 72 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 73 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; |
| 74 | NC | No connection. Do not connect anything to this pin. | &nbsp; |
| 75 | NC | No connection. Do not connect anything to this pin. | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 5c5c78ef-c99c-49b7-80f4-19196b90ecfe --}}


## Technical specification

{{!-- ### Absolute maximum ratings --}}

### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
|:-|:-|:-:|:-:|:-:|:-:|
| Operating Temperature | T<sub>op</sub> | -20 |  | +70 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |


{{!-- ### Wi-Fi Specifications --}}


{{!-- ### I/O Characteristics --}}

## Mechanical specifications

{{!-- ### Overall dimensions --}}

### Module Dimensions

- P1 module dimensions are: 0.787"(28mm) (W) x 1.102"(20mm) (L) x 0.0787"(2.0mm) (H) +/-0.0039"(0.1mm) (includes metal shielding)
- The P2 should have the same width and length but the height may be slightly different as it has different metal shielding

<div align=center><img src="/assets/images/p1-module-dimensions.png" width=600></div>

### Recommended PCB land pattern

The P2 can be mounted directly on a carrier PCB with following PCB land pattern:

<div align=center><img src="/assets/images/p1-land-pattern.png" width=600px></div>

A P1/P2 part for EAGLE can be found in the [Particle EAGLE library](https://github.com/particle-iot/hardware-libraries#pcb-footprints-land-pattern).


{{!-- ## Reference Design Schematic --}}

## Recommended solder reflow profile

[This information is from the P1, and is likely to remain the same, but is subject to change.]

<div align=left><img src="/assets/images/photon-reflow-profile.png" width=600></div>

| Phase | Temperatures and Rates |
| -:|:- |
| A-B. | Ambient~150°C, Heating rate: < 3°C/s |
| B-C. | 150~200°C, soak time: 60~120 s |
| C-D. | 200~245°C, Heating rate: < 3°C/s |
| D.   | Peak temp.: 235~245°C, Time above 220°C: 40~90 s |
| D-E. | 245~220°C, Cooling rate: < 1°C/s |

## Ordering information

P2 modules are available from [store.particle.io](https://store.particle.io/) as cut tape in quantities of 10 each.

{{!-- BEGIN do not edit content below, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |


{{!-- END do not edit content above, it is automatically generated a201cbf3-f21d-4b34-ac10-a713ef5a857e --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: 2AEMI-P2
-	IC: 20127-P2

## Product handling

{{!-- ### Tape and Reel Info --}}

### Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

## Default settings

The P2 module comes pre-programmed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the [Particle Web IDE](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air). [Particle Workbench](/quickstart/workbench/) is a full-featured desktop IDE for Windows, Mac, and Linux based on VSCode and supports both cloud-based and local gcc-arm compiles. The [Particle CLI](/getting-started/developer-tools/cli/) provides a command-line interface for cloud-based compiles and flashing code over USB.

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
> Contains FCC ID: 2AEMI-P2

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
> Contains transmitter module IC: 20127-P2

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2021-11-04 | RK | Pre-release |
|     | 2022-02-08 | RK | Corrected D pin aliases for A5 and S0-S6 |
|     | 2022-02-25 | RK | Changed D pin aliases for D9 - D22, A5 is not SPI MOSI, Serial2 TX and RX were reversed |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
|     | 2022-03-23 | RK | Added FCC and IC IDs, operating temperature range |
|     | 2022-04-12 | RK | Added serial baud rates |
|     | 2022-04-16 | RK | Added Serial3 |
|     | 2022-05-07 | RK | Temperature range is -20°C to +70°C |
|     | 2022-05-27 | RK | Updated antenna information |

### D Pin Change (2022-02-25)

The names of pins D9 - D22 have been changed to D8 - D21, eliminating the odd situation where there was previously no pin D8. This prevented being able to use a loop to initialize pins. This should not affect the hardware in any way, but software that used the D pin names instead of their more common names like TX (was D9, now D8) would need to be updated.

{{!-- BEGIN do not edit content below, it is automatically generated 3b7b8712-9617-11ec-b909-0242ac120002 --}}

| Pin | Old Pin Name | New Pin Name | Description | MCU |
| :---: | :---: | :---: | :--- |:--- |
| 64 | D9|TX / D8 | Serial1 TX (transmitted data), GPIO | PA[7] |
| 63 | D10|RX / D9 | Serial1 RX (received data), GPIO | PA[8] |
| 30 | D11|D10 / WKP | D10 GPIO, Serial 3 CTS. (Was WKP/A7 on P1.) | PA[15] |
| 50 | D12|A0 / D11 | A0 Analog in, GPIO | PB[1] |
| 43 | D13|A1 / D12 | A1 Analog in, GPIO | PB[2] |
| 49 | D14|A2 / D13 | A2 Analog in, PWM, GPIO | PB[7] |
| 23 | D15|A5 / D14 | A5 Analog in, GPIO, PWM. | PB[4] |
| 40 | D16|S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | PA[12] |
| 41 | D17|S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | PA[13] |
| 42 | D18|S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | PA[14] |
| 44 | D19|S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS | PB[26] |
| 47 | D20|S4 / D19 | S4 GPIO. (Was P1S4 on P1.) | PA[0] |
| 48 | D21|S5 / D20 | S5 GPIO. (Was P1S5 on P1.) | PB[29] |
| 33 | D22|S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) | PB[31] |


{{!-- END do not edit content above, it is automatically generated --}}



## Known Errata

## Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

https://support.particle.io
