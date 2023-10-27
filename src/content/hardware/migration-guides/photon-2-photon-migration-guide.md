---
title: Photon 2 from Photon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Photon to Photon 2
---

# {{title}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon-2-photon-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{migration-guide leftImg="/assets/images/photon_vector2_600.png" rightImg="/assets/images/photon2-rendering.png"}}

The Photon 2 is a development module with a microcontroller and Wi-Fi networking. The form-factor is similar to the Argon (Adafruit Feather), but
the Photon 2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications.

It is intended to replace both the Photon and Argon modules. It contains the same module as the P2, making it easier to migrate from a pin-based development module to a SMD mass-production module if desired.

| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| User application size | 2048 KB (2 MB) | 128 KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | 2 MB |
| | | | |
| MCU | RTL8721DM | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | |
| RAM<sup>2</sup> | 4608 KB | 128 KB | 256 KB |
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
| Digital GPIO | 20 | 24 | 20 |
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

<sup>2</sup> Total RAM; amount available to user applications is smaller. On the Photon 2, available RAM is approximately 3072 KB. On the Photon, it is 55 KB.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.

There are two Photon 2 migration guides, depending on what you are migrating from:

- [From Photon](/hardware/migration-guides/photon-2-photon-migration-guide/)
- [From Argon](/hardware/migration-guides/photon-2-argon-migration-guide/)


## Hardware 

### Battery support

The Photon 2 has a connector for a Li-Po battery and built-in charger. The Photon does not include battery power functionality.

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the Photon 2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### SPI

Both the Photon and Photon 2 have two SPI ports, however the pins are different for primary `SPI`, which is on the `S` pins on the Photon 2 instead of the `A` pins on the Photon.

`SPI1` on the `D` pins is the same between the Photon and Photon 2.

{{!-- BEGIN do not edit content below, it is automatically generated e0b9fa70-6d55-4b97-97c3-59591785f6a3 --}}

| Photon Pin Name | Photon SPI | Photon 2 Pin Name | Photon 2 SPI |
| :--- | :--- | :--- | :--- |
| A2 | SPI (SS) | A2 / D13 | &nbsp; |
| A3 | SPI (SCK) | D0 / A3 | &nbsp; |
| A4 | SPI (MISO) | D1 / A4 | &nbsp; |
| A5 | SPI (MOSI) | A5 / D14 | &nbsp; |
| D2 | SPI1 (MOSI) | D2 | SPI1 (MOSI) |
| D3 | SPI1 (MISO) | D3 | SPI1 (MISO) |
| D4 | SPI1 (SCK) | D4 | SPI1 (SCK) |
| D5 | SPI1 (SS) | D5 | SPI1 (SS) |
| &nbsp; | &nbsp; | MISO / D16 | SPI (MISO) |
| &nbsp; | &nbsp; | MOSI / D15 | SPI (MOSI) |
| &nbsp; | &nbsp; | S3 / D18 | SPI (SS) |
| &nbsp; | &nbsp; | SCK / D17 | SPI (SCK) |


{{!-- END do not edit content above, it is automatically generated --}}

If you are using SPI, Device OS 5.3.1 or later is recommended. Prior to that version, SPI ran at half of the set speed, and SPI1 ran at double the set speed. 
Timing has also been improved for large DMA transfers; prior to 5.3.1, there could be 1 µs gaps for every 16 bytes of data transferred.

#### SPI - Gen 2 devices (including Photon)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - Photon 2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### I2C

Both the Photon and Photon 2 have a single I2C port on the same pins, D0/D1.

{{!-- BEGIN do not edit content below, it is automatically generated 1b998d6c-a383-11ec-b909-0242ac120002 --}}

| Photon Pin Name | Photon I2C | Photon 2 Pin Name | Photon 2 I2C |
| :--- | :--- | :--- | :--- |
| A3 | &nbsp; | D0 / A3 | Wire (SDA) |
| A4 | &nbsp; | D1 / A4 | Wire (SCL) |
| D0 | Wire (SDA) | D0 / A3 | Wire (SDA) |
| D1 | Wire (SCL) | D1 / A4 | Wire (SCL) |


{{!-- END do not edit content above, it is automatically generated  --}}

- The Photon 2 I2C port is not 5V tolerant
- The Photon 2 A3/A4 pins are physically in the same location as D0/D1.
- The Photon pins A3/A4 are D16/D15 on the Photon 2.
- On the P2 and Photon 2, the only valid I2C clock speeds are `CLOCK_SPEED_100KHZ` and `CLOCK_SPEED_400KHZ`. Other speeds are not supported at this time.


### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the Photon and Photon 2. There is no hardware flow control on this port on the Photon or Photon 2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated b4bf5550-eadd-49f9-a462-e1cc867d9768 --}}

| Photon Pin Name | Photon Serial | Photon 2 Pin Name | Photon 2 Serial |
| :--- | :--- | :--- | :--- |
| D2 | &nbsp; | D2 | Serial2 (RTS) |
| D3 | &nbsp; | D3 | Serial2 (CTS) |
| D4 | &nbsp; | D4 | Serial2 (TX) |
| D5 | &nbsp; | D5 | Serial2 (RX) |
| &nbsp; | &nbsp; | MISO / D16 | Serial3 (RX) |
| &nbsp; | &nbsp; | MOSI / D15 | Serial3 (TX) |
| RGBB | Serial2 (RX) | &nbsp; | &nbsp; |
| RGBG | Serial2 (TX) | &nbsp; | &nbsp; |
| RX | Serial1 (RX) | RX / D9 | Serial1 (RX)  |
| &nbsp; | &nbsp; | SCK / D17 | Serial3 (RTS) |
| TX | Serial1 (TX) | TX / D8 | Serial1 (TX) |
| WKP / A7 | &nbsp; | D10 / WKP | Serial3 (CTS) |


{{!-- END do not edit content above, it is automatically generated --}}

|      | Photon    | Photon 2 |
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

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the Photon 2:

{{!-- BEGIN do not edit content below, it is automatically generated 7b8ec61a-2e3d-4569-9e37-a06d1a8926d0 --}}

| Photon Pin Name | Photon ADC | Photon 2 Pin Name | Photon 2 ADC |
| :--- | :--- | :--- | :--- |
| A0 | &check; | A0 / D11 | &check; |
| A1 | &check; | A1 / D12 | &check; |
| A2 | &check; | A2 / D13 | &check; |
| A3 | &check; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |
| DAC / A6 | &check; | &nbsp; | &nbsp; |
| WKP / A7 | &check; | D10 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

On the Photon 2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, Photon 2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for Photon 2 pin D1 (hardware pin 35), which has the alias A4.

The `setADCSampleTime()` function is not supported on the Photon 2 or P2.

### PWM (Pulse-width modulation)

The pins that support PWM are different on the Photon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 5a2874df-488f-4879-93cf-b0c85dced7a9 --}}

| Photon Pin Name | Photon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A2 | &nbsp; | A2 / D13 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| D0 | &check; | D0 / A3 | &nbsp; |
| D1 | &check; | D1 / A4 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| &nbsp; | &nbsp; | MISO / D16 | &check; |
| &nbsp; | &nbsp; | MOSI / D15 | &check; |
| RX | &check; | RX / D9 | &nbsp; |
| TX | &check; | TX / D8 | &nbsp; |
| WKP / A7 | &check; | D10 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on the Photon 2 share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### Digital to analog converter (DAC)

The Photon supports DAC one A3 and A6 (DAC). There is no DAC on the Photon 2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.



{{!-- BEGIN do not edit content below, it is automatically generated 516f360b-9f6c-4eb0-b931-e095b24dcd02 --}}

| Photon Pin Name | Photon DAC | Photon 2 Pin Name | Photon 2 DAC |
| :--- | :--- | :--- | :--- |
| A3 | &check; | D0 / A3 | &nbsp; |
| DAC / A6 | &check; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}



### WKP (A7)

|      | Photon    | Photon 2 |
| :--- | :---: | :---: |
| Module Pin | 30 | 30 |
| Pin Name | WKP | WKP |
| | A7 | D11 |
| Analog Input | &check; | &nbsp; |
| PWM | &check; | &nbsp; |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the Photon 2 and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (controller area network)

The Photon supports CAN on pins D1 and D2. There is no CAN on the Photon 2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 0509e2dc-3122-4ed1-905d-41330c531519 --}}

| Photon Pin Name | Photon CAN | Photon 2 Pin Name | Photon 2 CAN |
| :--- | :--- | :--- | :--- |
| D1 | &check; | D1 / A4 | &nbsp; |
| D2 | &check; | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### I2S (Sound)

The Photon theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the Photon 2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated 0d09bd5a-5858-41dd-a48a-82198eb7cb4a --}}

| Photon Pin Name | Photon I2S | Photon 2 Pin Name | Photon 2 I2S |
| :--- | :--- | :--- | :--- |
| D2 | I2S3_SD | D2 | &nbsp; |
| D4 | I2S3_SCK | D4 | &nbsp; |
| D5 | I2S3_WS | D5 | &nbsp; |
| SETUP | I2S3_MCK | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### BLE (Bluetooth LE)

BLE Central Mode on the P2 and Photon 2 is only supported in Device OS 5.1.0 and later. Earlier versions only supported BLE Peripheral Mode.

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated 2eae4165-6d66-49cc-b8ec-0e564c0f7a9e --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 15 | TX / D8 | Low at boot triggers ISP flash download | PA[7] |
| 22 | D6 | SWCLK. 40K pull-down at boot. | PB[3] |
| 23 | D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | PA[27] |


{{!-- END do not edit content above, it is automatically generated --}}

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the Photon 2.

### Sleep

The Photon 2 can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The Photon 2 can only wake from `HIBERNATE` sleep mode on pin D10, `RISING`, `FALLING`, or `CHANGE`. The Photon can only wake from `HIBERNATE` on `WKP` `RISING` so this should not be an issue, other than making sure the pins are mapped appropriately.

### Internal pull-up or pull-down

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

- On the Photon 2, the internal pull is approximately 2.1K.
- On the Photon (Gen 2), the internal pull is approximately 40K.

### Retained memory

The P2 and Photon 2 have limited support for retained memory, also referred to as Backup RAM or SRAM, in Device OS 5.3.1 and later.

Retained memory is preserved with the following limitations:

- When entering `HIBERNATE` sleep mode.
- Under programmatic reset, such as `System.reset()` and OTA firmware upgrades.
- In limited cases when using pin reset (RESET button or externally triggered reset).

By default, the retained memory is saved every 10 seconds, so changes made to retained variables between the last save and an unplanned system reset will
be lost. Calling [`System.backupRamSync`](/reference/device-os/api/system-calls/backupramsync/) on the P2 and Photon 2 can make sure the data is saved. The data is saved to a dedicated flash page in the RTL827x MCU 
however you should avoid saving the data extremely frequently as it is slower than RAM and will cause flash wear.

Prior to Device OS 5.3.1, retained memory is not supported. The flash file system can be used, or you can use an external chip such as an I2C or SPI FRAM.

Retained memory is 3068 bytes. 

### USB

The Photon 2 has a USB C connector, like the Tracker One and Tracker Eval Board.

The Photon has a Micro USB B connector.

### Photon Bottom

The Photon 2 has components on both sides of the board, like the Argon. It is not available without the mounted headers, and cannot be reflowed directly to a base board like the Photon without headers.

The Photon 2 does not have the solder pads for the RGB LED and SETUP/MODE button on the bottom. The RGB LED can be directed in software to other pins on the Photon 2. The SETUP/MODE button is available on the header pins on the Photon 2.

### Classic adapter

![Classic Adapter](/assets/images/accessories/classic-adapter.png)

The [Particle classic adapter](/reference/datasheets/accessories/gen3-accessories/#classic-adapter) can be used to plug a Photon 2 into a socket that is intended to support an Electron. It can also fit in a Photon socket, however pins will hang past the socket, so there must not be anything in the way, or anything that would short the overhanging pins. 

There are many pin limitations, and in particular the classic adapter does not work if you need to use SPI.

Pins B0 - B5 and C0 - C5 are not available if plugging into a Photon socket, as these pins are the pins that hang over the edge and exist only on the Electron, not the Photon

{{!-- BEGIN do not edit content below, it is automatically generated 0339ca50-9a3e-11ec-b909-0242ac120002 --}}

| Electron Pin Name | Electron Description | Photon 2 Pin Name | Photon 2 Description |
| :--- | :--- | :--- | :--- |
| 3V3 | Regulated 3.3V DC output, maximum load 800 mA. Cannot be used as a power input. | 3V3 | Regulated 3.3V DC output, maximum load 500 mA |
| A0 | A0 Analog in, GPIO | A0 / D11 | A0 Analog in, GPIO |
| A1 | A1 Analog in, GPIO | A1 / D12 | A1 Analog in, GPIO |
| A2 | A2 Analog in, GPIO, SPI SS | A2 / D13 | A2 Analog in, GPIO, PWM. |
| A3 | A3 True analog out, analog in, GPIO. | A5 / D14 | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. |
| A4 | A4 Analog in, GPIO, SPI MISO. | S4 / D19 | S4 GPIO, Was A4 on Gen 3. |
| A5 | A5 Analog in, GPIO, SPI MOSI. | A5 / D14 | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. |
| B0 | B0, GPIO, PWM | &nbsp; | Not Connected |
| B1 | B1, GPIO, PWM | &nbsp; | Not Connected |
| B2 | B2, analog in, GPIO, PWM | &nbsp; | Not Connected |
| B3 | B3, analog in, GPIO, PWM | &nbsp; | Not Connected |
| B4 | B4 Analog in, GPIO | &nbsp; | Not Connected |
| B5 | B5 Analog in, GPIO | MISO / D16 | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. |
| C0 | Serial5 RX (received data), GPIO. | &nbsp; | Not Connected |
| C1 | Serial5 TX (trasmitted data), SPI2 MOSI, GPIO. | &nbsp; | Not Connected |
| C2 | Serial4 RX (received data), SPI2 MISO, GPIO. | &nbsp; | Not Connected |
| C3 | Serial4 TX (transmitted data), SPI2 SCK, GPIO. | &nbsp; | Not Connected |
| C4 | I2C, CAN TX, GPIO. | &nbsp; | Not Connected |
| C5 | I2C, CAN RX, GPIO. | D10 / WKP | D10 GPIO. Serial3 CTS, WKP. Was D8/WKP on Gen 3. |
| D0 | D0 GPIO, I2C SDA | D0 / A3 | D0 GPIO, I2C SDA, A3 Analog In |
| D1 | D0 GPIO, I2C SCL, CAN TX | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| D2 | D2 GPIO, SPI1 MOSI, CAN RX | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI |
| D3 | D3 GPIO, SPI1 MISO | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO |
| D4 | D4 GPIO, SPI1 SCK | D4 | D4 GPIO, Serial2 TX, SPI1 SCK |
| D5 | D5 GPIO, SPI1 SS | D5 | D5 GPIO, Serial2 RX, SPI1 SS |
| D6 | D6 GPIO, SWCLK | D6 | D6 GPIO, SWCLK. |
| D7 | D7 GPIO, Blue LED, SWDIO | D7 | D7 GPIO, Blue LED, SWDIO |
| DAC / A6 | DAC/A6 True analog out, analog in, GPIO. | SCK / D17 | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS |
| &nbsp; | Not Connected | EN | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up. |
| GND | Ground. You only need to use one of the Photon ground pins. | GND | Ground. |
| &nbsp; | Not Connected | LI+ | Connected to JST PH LiPo battery connector. 3.7V in or out. |
| &nbsp; | Not Connected | MODE | MODE button, has internal pull-up |
| RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. |
| RX | Serial1 RX (received data), GPIO, PWM. | RX / D9 | Serial1 RX (received data), GPIO |
| &nbsp; | Not Connected | S3 / D18 | S3 GPIO, SPI SS, Was A5 on Gen 3. |
| TX | Serial1 TX (transmitted data), GPIO, PWM. | TX / D8 | Serial1 TX (transmitted data), GPIO |
| VBAT | Battery for internal real-time clock, jumpered to 3V3. | &nbsp; | Not Connected |
| VIN | Power in 3.9V to 12 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum. | VUSB | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. |
| WKP / A7 | WKP/A7 Wakeup (active high), analog in, GPIO. | MOSI / D15 | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX |


{{!-- END do not edit content above, it is automatically generated --}}


### Full module pin comparison

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Photon 2 Pinout Diagram" class="full-width"}}

{{imageOverlay src="/assets/images/photon-pinout.svg" alt="Photon Pinout Diagram" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 8fe037d3-67e1-429f-9865-014e4e5b50af --}}

#### 3V3
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 100 mA. Or input 3.0V to 3.6V. | Regulated 3.3V DC output, maximum load 500 mA |
#### A0
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| ∆ | Pin Alternate Name | n/a | D11 |
| &nbsp; | Description | A0 Analog in, GPIO | A0 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A1
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| ∆ | Pin Alternate Name | n/a | D12 |
| &nbsp; | Description | A1 Analog in, GPIO | A1 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A2
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| ∆ | Pin Alternate Name | n/a | D13 |
| ∆ | Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, GPIO, PWM. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K | 42K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A3
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | A3 | D0 |
| ∆ | Pin Alternate Name | n/a | A3 |
| ∆ | Description | A3 True analog out, analog in, GPIO. | D0 GPIO, I2C SDA, A3 Analog In |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (DAC) | Yes | No |
| ∆ | SPI interface | SCK. Use SPI object. | n/a |
| ∆ | I2C interface | n/a | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| ∆ | Internal pull resistance | 40K | 22K |
#### A4
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | A4 | D1 |
| ∆ | Pin Alternate Name | n/a | A4 |
| ∆ | Description | A4 Analog in, GPIO, SPI MISO. | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes |
| ∆ | SPI interface | MISO. Use SPI object. | n/a |
| ∆ | I2C interface | n/a | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes |
| ∆ | Internal pull resistance | 40K | 22K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A5
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| ∆ | Pin Alternate Name | n/a | D14 |
| ∆ | Description | A5 Analog in, GPIO, SPI MOSI. | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes |
| ∆ | SPI interface | MOSI. Use SPI object. | n/a |
| ∆ | Supports attachInterrupt | No | Yes |
| ∆ | Internal pull resistance | 40K | 42K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D0
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Pin Alternate Name | n/a | A3 |
| ∆ | Description | D0 GPIO, I2C SDA | D0 GPIO, I2C SDA, A3 Analog In |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | No | Yes |
| ∆ | Internal pull resistance | 40K | 22K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D1
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Pin Alternate Name | n/a | A4 |
| ∆ | Description | D0 GPIO, I2C SCL, CAN TX | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes |
| ∆ | CAN interface | CAN2_TX | n/a |
| ∆ | Internal pull resistance | 40K | 22K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D2
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | D2 GPIO, SPI1 MOSI, CAN RX | D2 GPIO, Serial2 RTS, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | UART serial | n/a | RTS. Use Serial2 object. Flow control optional. |
| &nbsp; | SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| ∆ | CAN interface | CAN2_RX | n/a |
| ∆ | I2S interface | I2S3_SD | n/a |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D3
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | D3 GPIO, SPI1 MISO | D3 GPIO, Serial2 CTS, SPI1 MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | UART serial | n/a | CTS. Use Serial2 object. Flow control optional. |
| &nbsp; | SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG RST. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG RST. 40K pull-up at boot. | n/a |
#### D4
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | D4 GPIO, SPI1 SCK | D4 GPIO, Serial2 TX, SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | n/a | TX. Use Serial2 object. |
| &nbsp; | SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| ∆ | I2S interface | I2S3_SCK | n/a |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDO. Floating at boot. | n/a |
| ∆ | Signal used at boot | JTAG TDO. Floating at boot. | n/a |
#### D5
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | D5 GPIO, SPI1 SS | D5 GPIO, Serial2 RX, SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | n/a | RX. Use Serial2 object. |
| &nbsp; | SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | I2S interface | I2S3_WS | n/a |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG TDI. 40K pull-up at boot. | n/a |
#### D6
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | D6 GPIO, SWCLK | D6 GPIO, SWCLK. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 42K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a |
| &nbsp; | SWD interface | SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | JTAG TCK/SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot. |
#### D7
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D7 | D7 |
| &nbsp; | Description | D7 GPIO, Blue LED, SWDIO | D7 GPIO, Blue LED, SWDIO |
| ∆ | Supports digitalRead | Yes. But the on-board LED will light when 3.3V is supplied on this pin as well. | Yes. |
| ∆ | Supports digitalWrite | Yes. Note that this controls the on-board blue LED. | Yes. On the Photon this is the blue D7 LED. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 2.1K |
| ∆ | JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a |
| &nbsp; | SWD interface | SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot. |
| ∆ | Signal used at boot | JTAG TMS/SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### DAC
| | Removed from Photon |
| :--- | :--- |
| Pin Name | DAC|
| Pin Alternate Name | A6|
| Description | DAC/A6 True analog out, analog in, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (DAC) | Yes|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler.|
| Internal pull resistance | 40K|
#### EN
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | GND | GND |
| ∆ | Description | Ground. You only need to use one of the Photon ground pins. | Ground. |
#### LI+
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | MISO|
| Pin Alternate Name | D16|
| Description | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| UART serial | RX. Use Serial3 object.|
| SPI interface | MISO. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### MODE
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | MODE|
| Description | MODE button, has internal pull-up|
#### MOSI
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | MOSI|
| Pin Alternate Name | D15|
| Description | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| UART serial | TX. Use Serial3 object.|
| SPI interface | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### RGBB
| | Removed from Photon |
| :--- | :--- |
| Pin Name | RGBB|
| Description | RGB LED Blue|
| UART serial | RX. Use Serial2 object.|
| Input is 5V Tolerant | No, if LED is connected.|
#### RGBG
| | Removed from Photon |
| :--- | :--- |
| Pin Name | RGBG|
| Description | RGB LED Green|
| UART serial | TX. Use Serial2 object.|
| Input is 5V Tolerant | No, if LED is connected.|
#### RGBR
| | Removed from Photon |
| :--- | :--- |
| Pin Name | RGBR|
| Description | RGB LED Red|
| Input is 5V Tolerant | No, if LED is connected.|
#### RST
| | Unchanged between Photon and Photon 2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### RX
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RX | RX |
| ∆ | Pin Alternate Name | n/a | D9 |
| ∆ | Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K | 42K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### S3
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | S3|
| Pin Alternate Name | D18|
| Description | S3 GPIO, SPI SS, Was A5 on Gen 3.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | Default SS for SPI.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### S4
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | S4|
| Pin Alternate Name | D19|
| Description | S4 GPIO, Was A4 on Gen 3.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
#### SCK
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | SCK|
| Pin Alternate Name | D17|
| Description | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | RTS. Use Serial3 object. Flow control optional.|
| SPI interface | SCK. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### SETUP
| | Removed from Photon |
| :--- | :--- |
| Pin Name | SETUP|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN.|
| I2S interface | I2S3_MCK|
#### TX
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | n/a | D8 |
| ∆ | Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K | 42K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### USBDATA-
| | Removed from Photon |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Removed from Photon |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VBAT
| | Removed from Photon |
| :--- | :--- |
| Pin Name | VBAT|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA..|
#### VIN
| | Removed from Photon |
| :--- | :--- |
| Pin Name | VIN|
| Description | Power in 3.6V to 5.5 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum.|
#### VUSB
| | Added to Photon 2 |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### WKP
|   |   | Photon | Photon 2 |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | WKP | D10 |
| ∆ | Pin Alternate Name | A7 | WKP |
| ∆ | Description | WKP/A7 Wakeup (active high), analog in, GPIO. | D10 GPIO. Serial3 CTS, WKP. Was D8/WKP on Gen 3. |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | n/a |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | UART serial | n/a | CTS. Use Serial3 object. Flow control optional. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 40K | 2.1K |
| ∆ | Input is 5V Tolerant | Yes | No |


{{!-- END do not edit content above, it is automatically generated --}}

## Software

### Wi-Fi Configuration

The Photon 2 and Argon utilize BLE for configuration of Wi-Fi rather than the SoftAP approach taken with the P1. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

Sample applications for React Native, iOS, and Android will be provided in the future.

| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | &check; | |
| BLE | &check; | | &check; |


### User firmware binary size

One major advantage of the Photon 2 is that user firmware binaries can be up to 2048 Kbytes, instead of 128 Kbytes on Gen 2 devices including the Photon.

### Flash file system

On the Photon 2, P2, and Gen 3 devices, there is a flash file system (2 MB) for storing user data. This is not available on Gen 2 devices including the Photon.

### Combined and resumable OTA

On the Photon 2, P2, and Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Increased API field limits

The maximum size of a variable, function parameter, or publish is 1024 bytes on the Photon 2 vs. 864 bytes on Photon.

| API Field | Photon | Photon 2 |
| :--- | :---: | :---: |
| Variable Key | 64 | 64 |
| Variable Data | 864 | 1024 |
| Function Key | 64 | 64 |
| Function Argument | 864 | 1024  |
| Publish/Subscribe Event Name | 64 | 64 |
| Publish/Subscribe Event Data | 864 | 1024 |


### Platform ID

The Platform ID of the Photon 2 will different from that of the Photon (6) because of the vastly different hardware. 

If you have a product based on the Photon, you will need to create a separate product for devices using the Photon 2. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

### Third-party libraries

{{!-- BEGIN shared-blurb 0ac81e91-31f6-4a87-9d78-f10f016ab102 --}}

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID
- Libraries that manipulate GPIO at high speeds or are timing-dependent

#### DS18B20 (1-Wire temperature sensor)

- Not compatible
- OneWire library requires high-speed GPIO support
- Can use [DS2482](https://github.com/rickkas7/DS2482-RK) I2C to 1-Wire bridge chip instead
- SHT30 sensors (I2C) may be an alternative in some applications

#### FastLED

- Not compatible. 
- In theory the library could be modified to use the same technique as the NeoPixel library.


#### NeoPixel (WS2812, WS2812B, and WS2813)

- Requires Device OS 5.3.2 or later and [Particle-NeoPixel](https://github.com/technobly/Particle-NeoPixel) version 1.0.3.

#### OneWire

- Not compatible
- OneWire library requires high-speed GPIO support
- Can use [DS2482](https://github.com/rickkas7/DS2482-RK) I2C to OneWire bridge instead

#### DHT22 and DHT11 (temperature and humidity sensor)

- Not compatible, requires high-speed GPIO support
- Using an I2C temperature and humidity sensor like the SHT3x is recommended instead

#### SHT1x (temperature and humidity sensor)

- Not compatible, requires high-speed GPIO support
- SHT3x using I2C is recommended

#### SparkIntervalTimer 

- Not compatible at this time
- Requires hardware timer support from user firmware

{{!-- END shared-blurb --}}

## Version history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-03-02 | RK | Pre-release |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
|     | 2022-04-12 | RK | Added serial baud rates |
|     | 2022-04-16 | RK | Major changes to pinmap to align with P2 |
|     | 2022-08-12 | RK | Added listing of pins used at boot |
|     | 2022-08-12 | RK | Warning about BLE central mode not available |
|     | 2022-10-05 | RK | Added HIBERNATE sleep section |
|     | 2022-11-17 | RK | Pin D0 does not have PWM |
|     | 2023-04-05 | RK | Added Device OS 5.3.1 information for SPI and retained memory |
