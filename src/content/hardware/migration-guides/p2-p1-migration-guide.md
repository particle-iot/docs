---
title: P2 from P1 migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the P1 to P2
---

# {{title}}

**Pre-release version 2022-03-14**

{{box op="start" cssClass="boxed warningBox"}}
This is an pre-release migration guide and the contents are subject to change.
{{box op="end"}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-p1-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

The Particle P2 module is the next generation Wi-Fi module from Particle. It is footprint compatible with our prior module, the P1, but is built on an upgraded chipset, supporting advanced features such as 5 GHz Wi-Fi, a 200MHz CPU, and built-in Bluetooth BLE 5.0.

| Feature | P2 | P1 | Argon |
| :--- | :---: | :---: | :---: |
| User application size | 2048 KB (2 MB) | 128 KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | 2 MB |
| | | | |
| MCU | RTL8721DM | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | |
| RAM<sup>2</sup> | 512 KB | 128 KB | 256 KB |
| Flash<sup>3</sup> | 16 MB | 1 MB | 1 MB | 
| Hardware FPU | &check; | | &check; |
| Secure Boot | &check; | | |
| Trust Zone | &check; | | |
| | | | |
| Wi-Fi | 802.11 a/b/g/n | 802.11 b/g/n | 802.11 b/g/n |
| &nbsp;&nbsp;2.4 GHz | &check; | &check; | &check; |
| &nbsp;&nbsp;5 GHz | &check; | | |
| Bluetooth | BLE 5.0 | | BLE 5.0 |
| NFC Tag |  | | External antenna required |
| Antenna | Shared for Wi-Fi and BLE | Wi-Fi only | Separate Wi-Fi and BLE antennas |
| | Built-in PCB antenna (Wi-Fi & BLE) | Built-in PCB antenna (Wi-Fi) | Built-in chip antenna (BLE) |
| | | | Required external antenna (Wi-Fi) |
| | Optional external (Wi-Fi & BLE)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (BLE)<sup>4</sup> |
| | | | |
| Peripherals | USB 2.0 | USB 1.1 | USB 1.1 |
| Digital GPIO | 22 | 24 | 20 |
| Analog (ADC) | 6 | 13 | 6 |
| Analog (DAC) |  | 2 |  |
| UART | 3 | 2 | 1 |
| SPI | 2 | 2 | 2 |
| PWM | 6 | 12 | 8 |
| I2C | 1 | 1 | 1 |
| CAN |  | 1 |  |
| I2S |  | 1 | 1 |
| JTAG | | &check; | |
| SWD | &check; | &check; | &check; |



<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup> Total RAM; amount available to user applications is smaller.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.


## Hardware 

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the P2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### Pins A3, A4, and DAC (A6)

Pins A3 (module pin 22), A4 (module pin 21), DAC/A6 (module pin 24) do not exist on the P2 and are NC.

You will need to use different pins if you are currently using these pins.

### SPI

Both the P1 and P2 have two SPI ports, however the pins are different for `SPI` (primary SPI).

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI SCK  | A3 | D20 / S2 |
| SPI MISO | A4 | D19 / S1 |
| SPI MOSI | A5 | D18 / S0 |

The following are all SPI-related pins on the P1 and P2:

{{!-- BEGIN do not edit content below, it is automatically generated 05f6184b-f88f-4737-82d7-647b489af469 --}}

| Pin | P1 Pin Name | P1 SPI | P2 Pin Name | P2 SPI |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A4 | SPI (MISO) | NC | &nbsp; |
| 22 | A3 | SPI (SCK) | NC | &nbsp; |
| 23 | A5 | SPI (MOSI) | A5 / D14 | &nbsp; |
| 40 | P1S0 | &nbsp; | S0 / D15 | SPI (MOSI) |
| 41 | P1S1 | &nbsp; | S1 / D16 | SPI (MISO) |
| 42 | P1S2 | &nbsp; | S2 / D17 | SPI (SCK) |
| 44 | P1S3 | &nbsp; | S3 / D18 | SPI (SS) |
| 45 | D2 | SPI1 (MOSI) | D2 | SPI1 (MOSI) |
| 49 | A2 | SPI (SS) | A2 / D13 | &nbsp; |
| 51 | D3 | SPI1 (MISO) | D3 | SPI1 (MISO) |
| 52 | D4 | SPI1 (SCK) | D4 | SPI1 (SCK) |
| 53 | D5 | SPI1 (SS) | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}


#### SPI - Gen 2 devices (including P1)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - P2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |

### I2C

The P2 supports one I2C (two-wire serial interface) port on the same pins as the P1:

{{!-- BEGIN do not edit content below, it is automatically generated 09bea7c2-a382-11ec-b909-0242ac120002 --}}

| Pin | P1 Pin Name | P1 I2C | P2 Pin Name | P2 I2C |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D1 | Wire (SCL) | D1 / A4 | Wire (SCL) |
| 36 | D0 | Wire (SDA) | D0 / A3 | Wire (SDA) |


{{!-- END do not edit content above, it is automatically generated  --}}

- The P2 I2C port is not 5V tolerant
- The P1 includes internal 2.2K pull-up resistors on D0/D1, the P2 does not

### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the P1 and P2. There is no hardware flow control on this port on the P1 or P2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

There is also a third UART serial (`Serial3`).

{{!-- BEGIN do not edit content below, it is automatically generated 678b62a8-7981-406c-bd67-f7c1e607291f --}}

| Pin | P1 Pin Name | P1 Serial | P2 Pin Name | P2 Serial |
| :---: | :--- | :--- | :--- | :--- |
| 30 | WKP / A7 | &nbsp; | D10 / WKP | Serial3 (CTS) |
| 31 | RGBB | Serial2 (RX) | RGBB | &nbsp; |
| 32 | RGBG | Serial2 (TX) | RGBG | &nbsp; |
| 40 | P1S0 | &nbsp; | S0 / D15 | Serial3 (TX) |
| 41 | P1S1 | &nbsp; | S1 / D16 | Serial3 (RX) |
| 42 | P1S2 | &nbsp; | S2 / D17 | Serial3 (RTS) |
| 45 | D2 | &nbsp; | D2 | Serial2 (RTS) |
| 51 | D3 | &nbsp; | D3 | Serial2 (CTS) |
| 52 | D4 | &nbsp; | D4 | Serial2 (TX) |
| 53 | D5 | &nbsp; | D5 | Serial2 (RX) |
| 63 | RX | Serial1 (RX) | RX / D9 | Serial1 (RX)  |
| 64 | TX | Serial1 (TX) | TX / D8 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated --}}

|      | P1    | P2 |
| :--- | :---: | :---: |
| Buffer size | 64 bytes | 2048 bytes |
| 7-bit mode | &check; | &check; |
| 8-bit mode | &check; | &check; |
| 9-bit mode | &check; | |
| 1 stop bit | &check; | &check; |
| 2 stop bits | &check; | &check; |
| No parity | &check; | &check; |
| Even parity | &check; | &check; |
| Odd parity | &check; | &check; |
| Break detection | &check; | |
| LIN bus support | &check; | |
| Half duplex | &check; | |
| CTS/RTS flow control |  | &check;<sup>1</sup> |

<sup>1</sup>CTS/RTS flow control only on Serial2. It is optional.

Supported Baud Rates:

| Baud Rate | P1 | P2 |
| ---: | :---: | :---|
| 110     | | &check; |
| 300     | | &check; |
| 600     | | &check; |
| 1200    | &check; | &check; |
| 2400    | &check; | |
| 4800    | &check; | |
| 9600    | &check; | &check; |
| 14400   | | &check; |
| 19200   | &check; | &check; |
| 28800   | | &check; |
| 38400   | &check; | &check; |
| 57600   | &check; | &check; |
| 76800   | | &check; |
| 115200  | &check; | &check; |
| 128000  | | &check; |
| 153600  | | &check; |
| 230400  | &check; | &check; |
| 500000  | | &check; |
| 921600  | | &check; |
| 1000000 | | &check; |
| 1382400 | | &check; |
| 1444400 | | &check; |
| 1500000 | | &check; |
| 1843200 | | &check; |
| 2000000 | | &check; |
| 2100000 | | &check; |
| 2764800 | | &check; |
| 3000000 | | &check; |
| 3250000 | | &check; |
| 3692300 | | &check; |
| 3750000 | | &check; |
| 4000000 | | &check; |
| 6000000 | | &check; |


### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the P2:

{{!-- BEGIN do not edit content below, it is automatically generated cb6c8957-8f01-4166-8dea-1d1d5c862618 --}}

| Pin | P1 Pin Name | P1 ADC | P2 Pin Name | P2 ADC |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A4 | &check; | NC | &nbsp; |
| 22 | A3 | &check; | NC | &nbsp; |
| 23 | A5 | &check; | A5 / D14 | &check; |
| 24 | DAC / A6 | &check; | NC | &nbsp; |
| 30 | WKP / A7 | &check; | D10 / WKP | &nbsp; |
| 35 | D1 | &nbsp; | D1 / A4 | &check; |
| 36 | D0 | &nbsp; | D0 / A3 | &check; |
| 40 | P1S0 | &check; | S0 / D15 | &nbsp; |
| 41 | P1S1 | &check; | S1 / D16 | &nbsp; |
| 42 | P1S2 | &check; | S2 / D17 | &nbsp; |
| 43 | A1 | &check; | A1 / D12 | &check; |
| 44 | P1S3 | &check; | S3 / D18 | &nbsp; |
| 48 | P1S5 | &check; | S5 / D20 | &nbsp; |
| 49 | A2 | &check; | A2 / D13 | &check; |
| 50 | A0 | &check; | A0 / D11 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}

On the P2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, P2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for P2 pin D1 (hardware pin 35), which has the alias A4.

The `setADCSampleTime()` function is not supported on the P2.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the P1 and P2.


{{!-- BEGIN do not edit content below, it is automatically generated 597f8364-70a6-4861-9bb6-6f1df20418e3 --}}

| Pin | P1 Pin Name | P1 PWM | P2 Pin Name | P2 PWM |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A4 | &check; | NC | &nbsp; |
| 23 | A5 | &check; | A5 / D14 | &check; |
| 30 | WKP / A7 | &check; | D10 / WKP | &nbsp; |
| 33 | P1S6 | &check; | S6 / D21 | &nbsp; |
| 35 | D1 | &check; | D1 / A4 | &check; |
| 36 | D0 | &check; | D0 / A3 | &check; |
| 40 | P1S0 | &check; | S0 / D15 | &check; |
| 41 | P1S1 | &check; | S1 / D16 | &check; |
| 45 | D2 | &check; | D2 | &nbsp; |
| 49 | A2 | &nbsp; | A2 / D13 | &check; |
| 51 | D3 | &check; | D3 | &nbsp; |
| 63 | RX | &check; | RX / D9 | &nbsp; |
| 64 | TX | &check; | TX / D8 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on the P2 share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### Digital to analog converter (DAC)

The P1 supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 129fac7d-5c50-46e3-82f6-6be5edaaccf1 --}}

| Pin | P1 Pin Name | P1 DAC | P2 Pin Name | P2 DAC |
| :---: | :--- | :--- | :--- | :--- |
| 22 | A3 | &check; | NC | &nbsp; |
| 24 | DAC / A6 | &check; | NC | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}



### WKP (A7)

|      | P1    | P2 |
| :--- | :---: | :---: |
| Module Pin | 30 | 30 |
| Pin Name | WKP | WKP |
| | A7 | D11 |
| Analog Input | &check; | |
| PWM | &check; | |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the P2 and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (Controller Area Network)

The P1 supports CAN on pins D1 and D2. There is no CAN on the P2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 75a00cb1-2521-442a-bd25-3b2071dcdf43 --}}

| Pin | P1 Pin Name | P1 CAN | P2 Pin Name | P2 CAN |
| :---: | :--- | :--- | :--- | :--- |
| 35 | D1 | &check; | D1 / A4 | &nbsp; |
| 45 | D2 | &check; | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### I2S (Sound)

The P1 theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

| Pin | P1 Pin Name | P1 I2S | P2 Pin Name | P2 I2S |
| :---: | :--- | :--- | :--- | :--- |
| 45 | D2 | I2S3_SD | D2 | &nbsp; |
| 46 | MODE | I2S3_MCK | MODE | &nbsp; |
| 52 | D4 | I2S3_SCK | D4 | &nbsp; |
| 53 | D5 | I2S3_WS | D5 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated 8d8e7a73-c60c-4b04-8039-c5f8a7072f39 --}}

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the P2.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset, is not available on the P2. This also prevents system usage of retained memory, including session resumption on reset.

On Gen 2 and Gen 3 devices, retained memory is 3068 bytes. 

The flash file system can be used for data storage on the P2, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### Flash file system

The P1 did not have a flash file system. 

The P2 has a 2 MB flash file system using the same [POSIX API](/cards/firmware/file-system/file-system/) as Gen 3 devices. A small amount of space is reserved for system use including configuration data. Most of the space is available for user application use.

### EEPROM

The [EEPROM emulation API](/cards/firmware/eeprom/eeprom/) is the same across the P1 and P2.

The P1 had 2047 bytes of emulated EEPROM.
The P2 has 4096 bytes of emulated EEPROM. On the P2 and Gen 3 devices, the EEPROM is actually just a file on the flash file system.

### Pin functions removed

The following pins served P1-specific uses and are NC on the P2. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated 17989260-63ec-4ba4-96ce-71639b445d9d --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 7 | WL_REG_ON | BCM43362 Debugging Pin. |
| 16 | WL_JTAG_TDI | BCM43362 Debugging Pin. |
| 17 | WL_JTAG_TCK | BCM43362 Debugging Pin. |
| 18 | WL_JTAG_TRSTN | BCM43362 Debugging Pin. |
| 19 | WL_JTAG_TMS | BCM43362 Debugging Pin. |
| 20 | WL_JTAG_TDO | BCM43362 Debugging Pin. |
| 21 | A4 | A4 Analog in, GPIO, SPI. |
| 22 | A3 | A3 True analog out, analog in, GPIO. |
| 24 | DAC / A6 | DAC/A6 True analog out, analog in, GPIO. |
| 38 | VBAT | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. |
| 56 | BTCX_STATUS | Coexistence signal: Bluetooth status and TX/RX direction. |
| 57 | BTCX_RF_ACTIVE | Coexistence signal: Bluetooth is active. |
| 58 | BTCX_TXCONF | Output giving Bluetooth permission to TX. |
| 60 | WL_SLEEP_CLK | BCM43362 Debugging Pin |


{{!-- END do not edit content above, it is automatically generated --}}

### Pin functions added

The following pins were NC on the P1 but are used on the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 12 | VBAT_MEAS | Battery voltage measurement (optional). |


{{!-- END do not edit content above, it is automatically generated 0f8940d5-5d0b-4f16-bfa2-1666616ba9ef --}}

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 5626ebed-0fab-4d08-bdc9-092490e8c084 --}}

#### Module Pin 1 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 2 (VBAT_WL / 3V3_RF)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT_WL | 3V3_RF |
| Description | Battery for BCM43362. | 3.3V power to RF module |
#### Module Pin 3 (VBAT_WL / 3V3_RF)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT_WL | 3V3_RF |
| Description | Battery for BCM43362. | 3.3V power to RF module |
#### Module Pin 4 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 5 (VDDIO_3V3_WL / 3V3_IO)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VDDIO_3V3_WL | 3V3_IO |
| Description | Regulated 3.3V DC power input for BCM43362. | 3.3V power to MCU IO. |
#### Module Pin 6 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 7 (WL_REG_ON / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_REG_ON | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 8 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 9 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 10 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 11 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 12 (NC / VBAT_MEAS)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | NC | VBAT_MEAS |
| Description | No connection. Do not connect anything to this pin. | Battery voltage measurement (optional). |
#### Module Pin 13 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 14 (NC)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### Module Pin 15 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 16 (WL_JTAG_TDI / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TDI | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 17 (WL_JTAG_TCK / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TCK | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 18 (WL_JTAG_TRSTN / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TRSTN | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 19 (WL_JTAG_TMS / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TMS | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 20 (WL_JTAG_TDO / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_JTAG_TDO | NC |
| Description | BCM43362 Debugging Pin. | No connection. Do not connect anything to this pin. |
#### Module Pin 21 (A4 / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A4 | NC |
| Description | A4 Analog in, GPIO, SPI. | No connection. Do not connect anything to this pin. |
| Supports digitalRead | Yes | n/a |
| Supports digitalWrite | Yes | n/a |
| Supports analogRead | Yes | n/a |
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | n/a |
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | n/a |
| SPI interface | MISO. Use SPI object. | n/a |
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | n/a |
| Input is 5V Tolerant | Yes | n/a |
#### Module Pin 22 (A3 / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A3 | NC |
| Description | A3 True analog out, analog in, GPIO. | No connection. Do not connect anything to this pin. |
| Supports digitalRead | Yes | n/a |
| Supports digitalWrite | Yes | n/a |
| Supports analogRead | Yes | n/a |
| Supports analogWrite (DAC) | Yes | n/a |
| SPI interface | SCK. Use SPI object. | n/a |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | n/a |
#### Module Pin 23 (A5)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A5 | A5 |
| Pin Alternate Name | n/a | D14 |
| Description | A5 Analog in, GPIO, SPI. | A5 Analog in, GPIO, PWM. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes |
| SPI interface | MOSI. Use SPI object. | n/a |
| Supports attachInterrupt | No | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 24 (DAC / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | DAC | NC |
| Pin Alternate Name | A6 | n/a |
| Description | DAC/A6 True analog out, analog in, GPIO. | No connection. Do not connect anything to this pin. |
| Supports digitalRead | Yes | n/a |
| Supports digitalWrite | Yes | n/a |
| Supports analogRead | Yes | n/a |
| Supports analogWrite (DAC) | Yes | n/a |
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | n/a |
#### Module Pin 25 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 26 (3V3)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | 3V3|
| Description | 3.3V power to MCU|
#### Module Pin 27 (3V3)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | 3V3|
| Description | 3.3V power to MCU|
#### Module Pin 28 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 29 (RGBR)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBR | RGBR |
| Description | RGB LED Red | RGB LED Red |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### Module Pin 30 (WKP / D10)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WKP | D10 |
| Pin Alternate Name | A7 | WKP |
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | D10 GPIO, Serial 3 CTS. (Was WKP/A7 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | n/a |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional. |
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 31 (RGBB)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBB | RGBB |
| Description | RGB LED Blue | RGB LED Blue |
| UART serial | RX. Use Serial2 object. | n/a |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### Module Pin 32 (RGBG)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RGBG | RGBG |
| Description | RGB LED Green | RGB LED Green |
| UART serial | TX. Use Serial2 object. | n/a |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### Module Pin 33 (P1S6 / S6)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S6 | S6 |
| Pin Alternate Name | n/a | D21 |
| Description | P1S6 GPIO | S6 GPIO. (Was P1S6/TESTMODE on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| Supports attachInterrupt | Yes | Yes |
#### Module Pin 34 (RST)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### Module Pin 35 (D1)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D1 | D1 |
| Pin Alternate Name | n/a | A4 |
| Description | D1 GPIO, I2C, CAN | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | Yes | Yes |
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes |
| CAN interface | CAN2_TX | n/a |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 36 (D0)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D0 | D0 |
| Pin Alternate Name | n/a | A3 |
| Description | D0 GPIO, I2C | D0 GPIO, PWM, I2C SDA, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | Yes | Yes |
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | No | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 37 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 38 (VBAT / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | VBAT | NC |
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | No connection. Do not connect anything to this pin. |
#### Module Pin 39 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 40 (P1S0 / S0)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S0 | S0 |
| Pin Alternate Name | n/a | D15 |
| Description | P1S0 Analog in, GPIO, PWM. | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | Yes. | Yes |
| UART serial | n/a | TX. Use Serial3 object. |
| SPI interface | n/a | MOSI. Use SPI object. |
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 41 (P1S1 / S1)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S1 | S1 |
| Pin Alternate Name | n/a | D16 |
| Description | P1S1 Analog in, GPIO, PWM. | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | Yes. | Yes |
| UART serial | n/a | RX. Use Serial3 object. |
| SPI interface | n/a | MISO. Use SPI object. |
| Supports attachInterrupt | Yes. P1S1 and P1S5 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 42 (P1S2 / S2)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S2 | S2 |
| Pin Alternate Name | n/a | D17 |
| Description | P1S2 Analog in, GPIO | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| UART serial | n/a | RTS. Use Serial3 object. Flow control optional. |
| SPI interface | n/a | SCK. Use SPI object. |
| Supports attachInterrupt | Yes. WKP/A7, P1S0, and P1S2 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 43 (A1)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A1 | A1 |
| Pin Alternate Name | n/a | D12 |
| Description | A1 Analog in, GPIO | A1 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 44 (P1S3 / S3)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S3 | S3 |
| Pin Alternate Name | n/a | D18 |
| Description | P1S3 Analog in, GPIO | S3 GPIO. (Was P1S3 on P1.), SPI SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| SPI interface | n/a | Default SS for SPI. |
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 45 (D2)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D2 | D2 |
| Description | D2 GPIO, SPI1, CAN | D2 GPIO, Serial2 RTS, SPI1 MOSI |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No |
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No |
| UART serial | n/a | RTS. Use Serial2 object. Flow control optional. |
| SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object. |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| CAN interface | CAN2_RX | n/a |
| I2S interface | I2S3_SD | n/a |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 46 (MODE)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | MODE | MODE |
| Description | MODE button, has internal pull-up. Pin number constant is BTN. | MODE button, has internal pull-up. Pin number constant is BTN. |
| Supports attachInterrupt | n/a | Yes |
| I2S interface | I2S3_MCK | n/a |
#### Module Pin 47 (P1S4 / S4)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S4 | S4 |
| Pin Alternate Name | n/a | D19 |
| Description | P1S4 GPIO | S4 GPIO. (Was P1S4 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports attachInterrupt | Yes. D7 and P1S4 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 48 (P1S5 / S5)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | P1S5 | S5 |
| Pin Alternate Name | n/a | D20 |
| Description | P1S5 Analog in, GPIO | S5 GPIO. (Was P1S5 on P1.) |
| Supports digitalRead | Yes | No |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| Supports attachInterrupt | Yes. P1S1 and P1S5 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 49 (A2)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A2 |
| Pin Alternate Name | n/a | D13 |
| Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| Supports attachInterrupt | Yes | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 50 (A0)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | A0 | A0 |
| Pin Alternate Name | n/a | D11 |
| Description | A0 Analog in, GPIO | A0 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 51 (D3)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D3 |
| Description | D3 GPIO, SPI1 | D3 GPIO, Serial2 CTS, SPI1 MISO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No |
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No |
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional. |
| SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object. |
| Supports attachInterrupt | Yes. D3, DAC/A6, and P1S3 share the same interrupt handler. | Yes |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a |
#### Module Pin 52 (D4)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D4 |
| Description | D4 GPIO, SPI1 | D4 GPIO, Serial2 TX, SPI1 SCK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | n/a | TX. Use Serial2 object. |
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| I2S interface | I2S3_SCK | n/a |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TDO. Floating at boot. | n/a |
#### Module Pin 53 (D5)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D5 |
| Description | D5 GPIO, SPI1 | D5 GPIO, Serial2 RX, SPI1 SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | n/a | RX. Use Serial2 object. |
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| Supports attachInterrupt | Yes | Yes |
| I2S interface | I2S3_WS | n/a |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a |
#### Module Pin 54 (D7)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7 |
| Description | D7 GPIO | D7 GPIO, SWDIO |
| Supports digitalRead | Yes. | Yes. |
| Supports digitalWrite | Yes. On the Photon this is the blue D7 LED. | Yes. On the Photon this is the blue D7 LED. |
| Supports attachInterrupt | Yes. D7 and P1S4 share the same interrupt handler. | Yes |
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a |
| SWD interface | SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot. |
#### Module Pin 55 (D6)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D6 |
| Description | D6 GPIO | D6 GPIO, SWCLK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports attachInterrupt | Yes | Yes |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a |
| SWD interface | SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot. |
#### Module Pin 56 (BTCX_STATUS / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_STATUS | NC |
| Description | Coexistence signal: Bluetooth status and TX/RX direction. | No connection. Do not connect anything to this pin. |
#### Module Pin 57 (BTCX_RF_ACTIVE / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_RF_ACTIVE | NC |
| Description | Coexistence signal: Bluetooth is active. | No connection. Do not connect anything to this pin. |
#### Module Pin 58 (BTCX_TXCONF / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | BTCX_TXCONF | NC |
| Description | Output giving Bluetooth permission to TX. | No connection. Do not connect anything to this pin. |
#### Module Pin 59 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 60 (WL_SLEEP_CLK / NC)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | WL_SLEEP_CLK | NC |
| Description | BCM43362 Debugging Pin | No connection. Do not connect anything to this pin. |
#### Module Pin 61 (USBDATA+)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 62 (USBDATA-)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 63 (RX)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX |
| Pin Alternate Name | n/a | D9 |
| Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| Supports attachInterrupt | Yes | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 64 (TX)
|   | P1 | P2 |
| :--- | :--- | :--- |
| Pin Name | TX | TX |
| Pin Alternate Name | n/a | D8 |
| Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes | Yes |
| Input is 5V Tolerant | Yes | No |
#### Module Pin 65 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 66 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 67 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 68 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 69 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 70 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 71 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|
#### Module Pin 72 (GND)
| | Unchanged between P1 and P2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure you connect all P1 ground pins.|


{{!-- END do not edit content above, it is automatically generated --}}

## Software

### Wi-Fi Configuration

The P2 and Argon utilize BLE or USB for configuration of Wi-Fi rather than the SoftAP approach taken with the P1. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

| Feature | P2 | P1 | Argon |
| :--- | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | &check; | |
| BLE | &check; | | &check; |

### User firmware binary size

One major advantage of the P2 is that user firmware binaries can be up to 2048 Kbytes, instead of 128 Kbytes on Gen 2 devices including the P1.

### Flash file system

On the P2 there is a flash file system (2 MB) for storing user data. This is not available on Gen 2 devices including the P1.

### Combined and resumable OTA

On the P2, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Increased API field limits

The maximum size of a variable, function parameter, or publish is 1024 bytes on the P2 vs. 864 bytes on P1.

| API Field | P1 | P2 |
| :--- | :---: | :---: |
| Variable Key | 64 | 64 |
| Variable Data | 864 | 1024 |
| Function Key | 64 | 64 |
| Function Argument | 864 | 1024  |
| Publish/Subscribe Event Name | 64 | 64 |
| Publish/Subscribe Event Data | 864 | 1024 |


### Platform ID

The Platform ID of the P2 (32, `PLATFORM_P2`) is different from that of the P1 (8) because of the vastly different hardware. 

If you have a product based on the P1, you will need to create a separate product for devices using the P2. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID


## Version History

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2021-11-04 | RK | Pre-release |
|     | 2022-02-08 | RK | Corrected D pin aliases for A5 and S0-S6 |
|     | 2022-02-25 | RK | Changed D pin aliases for D9 - D22, A5 is not SPI MOSI, Serial2 TX and RX were reversed |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
|     | 2022-03-23 | RK | Add notes about flash file system and EEPROM |
|     | 2022-04-12 | RK | Added serial baud rates |
