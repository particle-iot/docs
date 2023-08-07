---
title: Photon 2 from Argon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Argon to Photon 2
---

# Photon 2 from Argon migration guide

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon-2-argon-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{migration-guide leftImg="/assets/images/argon/argon-top.png" rightImg="/assets/images/photon2-rendering.png"}}

The Photon 2 is a development module with a microcontroller and Wi-Fi networking. The form-factor is similar to the Argon (Adafruit Feather), but
the Photon 2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications. 

It is intended to replace both the Photon and Argon modules. It contains the same module as the P2, making it easier to migrate from a pin-based development module to a SMD mass-production module if desired.

{{!-- BEGIN shared-blurb d3802fd5-24b9-433c-b2c9-3d994182751e --}}
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

<sup>2</sup> Total RAM; amount available to user applications is smaller. On the Photon 2, available RAM is approximately 3072 KB. On the Argon, it is 80 KB.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.
{{!-- END shared-blurb --}}

There are two Photon 2 migration guides, depending on what you are migrating from:

- [From Photon](/hardware/migration-guides/photon-2-photon-migration-guide/)
- [From Argon](/hardware/migration-guides/photon-2-argon-migration-guide/)

## Hardware 

### Antennas

The Argon requires an external Wi-Fi antenna, and has a built-in chip antenna for BLE. It can optionally use an external chip antenna.

The Photon 2 has a built-in trace antenna that is shared by Wi-Fi and BLE. It can optionally use an external 2.4 GHz antenna for both Wi-Fi and BLE.

### Pin names

{{imageOverlay src="/assets/images/photon-2-argon-comparison.svg" alt="Pin name comparison" class="full-width"}}

Some pins in the same positions are named differently between the Argon and Photon 2:

| Argon Name | Photon 2 Name |
| :---: | :---: |
| A3 | A5 |
| A4 | S4 |
| A5 | S3 |
| D8 | D10 |

Additionally, `D` pin aliases `D8` and higher are different, however these names are rarely used.



### SPI

{{imageOverlay src="/assets/images/photon-2-argon-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

Pins for `SPI` are unchanged between the Argon and Photon 2.

The the pin functions for `SPI1` on the `D` pins are different between the Argon and Photon 2! While they both use D2 - D4, the order of SCK, MOSI, and MISO are different so you cannot plug a Photon 2 into an Argon base board that uses SPI1.

Most boards, including Ethernet, use primary `SPI`, which works the same between the Argon and Photon 2.

{{!-- BEGIN do not edit content below, it is automatically generated 021430dd-e4d9-434c-8a5a-9632168c57b5 --}}

| Argon Pin Name | Argon SPI | Photon 2 Pin Name | Photon 2 SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | SPI (SS) | S3 / D18 | SPI (SS) |
| SCK / D13 | SPI (SCK) | SCK / D17 | SPI (SCK) |
| MOSI / D12 | SPI (MOSI) | MOSI / D15 | SPI (MOSI) |
| MISO / D11 | SPI (MISO) | MISO / D16 | SPI (MISO) |
| D2 | SPI1 (SCK) | D2 | SPI1 (MOSI) |
| D3 | SPI1 (MOSI) | D3 | SPI1 (MISO) |
| D4 | SPI1 (MISO) | D4 | SPI1 (SCK) |
| D5 | &nbsp; | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}

- Any available GPIO can be used for SS/CS (chip select) pins.
- Each SPI device must have a unique CS pin.
- The Argon supports SPI slave mode only on `SPI1` (D pins).

If you are using SPI, Device OS 5.3.1 or later is recommended. Prior to that version, SPI ran at half of the set speed, and SPI1 ran at double the set speed. 
Timing has also been improved for large DMA transfers; prior to 5.3.1, there could be 1 µs gaps for every 16 bytes of data transferred.


#### SPI - Gen 3 devices (including Argon)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 32 MHz | 32 MHz |
| Default rate | 16 MHz | 16 MHz |
| Clock | 64 MHz | 64 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256
- Default divisor is 4

#### SPI - Photon 2

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)

{{imageOverlay src="/assets/images/photon-2-argon-serial-comparison.svg" alt="Serial comparison" class="full-width"}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both the Photon 2 and Argon. There is no hardware flow control on this port on the Photon 2, but there is on the Argon.

The secondary UART serial (`Serial2`) exists on the Photon 2 but not the Argon, and also supports CTS/RTS hardware flow control. This is recommended if you need serial with hardware flow control on the Photon 2.

There is a third UART serial (`Serial3`) on the Photon 2 that also supports optional CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated 6a0631e5-4c61-4617-997c-0b310d0d2574 --}}

| Argon Pin Name | Argon Serial | Photon 2 Pin Name | Photon 2 Serial |
| :--- | :--- | :--- | :--- |
| SCK / D13 | &nbsp; | SCK / D17 | Serial3 (RTS) |
| MOSI / D12 | &nbsp; | MOSI / D15 | Serial3 (TX) |
| MISO / D11 | &nbsp; | MISO / D16 | Serial3 (RX) |
| RX / D10 | Serial1 RX | RX / D9 | Serial1 (RX)  |
| TX / D09 | Serial1 TX | TX / D8 | Serial1 (TX) |
| D2 | Serial1 RTS | D2 | Serial2 (RTS) |
| D3 | Serial1 CTS | D3 | Serial2 (CTS) |
| D4 | &nbsp; | D4 | Serial2 (TX) |
| D5 | &nbsp; | D5 | Serial2 (RX) |
| D8 / WKP | &nbsp; | D10 / WKP | Serial3 (CTS) |


{{!-- END do not edit content above, it is automatically generated --}}

|      | Argon    | Photon 2 |
| :--- | :------: | :---: |
| Buffer size | 64 bytes<sup>2</sup> | 2048 bytes |
| 7-bit mode |  | &check; |
| 8-bit mode | &check; | &check; |
| 1 stop bit | &check; | &check; |
| 2 stop bits |  | &check; |
| No parity | &check; | &check; |
| Even parity | &check; | &check; |
| Odd parity |  | &check; |
| CTS/RTS flow control |  | &check;<sup>1</sup> |

<sup>1</sup>CTS/RTS flow control only on `Serial2` and `Serial3`. It is optional.

<sup>2</sup>On the Argon, the buffer be resized larger in Device OS 3.2.0 and later.

Supported Baud Rates:

| Baud Rate | Argon | P2 |
| ---: | :---: | :---|
| 110     | | &check; |
| 300     | | &check; |
| 600     | | &check; |
| 1200    | &check; | &check; |
| 2400    | &check; | |
| 4800    | &check; | |
| 9600    | | &check; |
| 14400   | | &check; |
| 19200   | &check; | &check; |
| 28800   | &check; | &check; |
| 38400   | &check; | &check; |
| 57600   | &check; | &check; |
| 76800   | &check; | &check; |
| 115200  | &check; | &check; |
| 128000  | | &check; |
| 153600  | | &check; |
| 230400  | &check; | &check; |
| 250000  | &check; | |
| 460800  | &check; | |
| 500000  | | &check; |
| 921600  | &check; | &check; |
| 1000000 | &check; | &check; |
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

{{imageOverlay src="/assets/images/photon-2-argon-adc-comparison.svg" alt="ADC comparison" class="full-width"}}

For analog to digital conversion (ADC) using `analogRead()`.

- Pin A0, A1, A2, and A5 are analog inputs on both the Argon and Photon 2.
- Pins A3 and A4 are only analog inputs on the Argon.
- Pins D0 and D1 can also be used as analog inputs on the Photon 2. 
- The `setADCSampleTime()` function is not supported on the Photon 2 or P2.

{{!-- BEGIN do not edit content below, it is automatically generated 74be4a79-6a50-4688-a29e-f0ca660e7c49 --}}

| Argon Pin Name | Argon ADC | Photon 2 Pin Name | Photon 2 ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D11 | &check; |
| A1 / D18 | &check; | A1 / D12 | &check; |
| A2 / D17 | &check; | A2 / D13 | &check; |
| A3 / D16 | &check; | A5 / D14 | &check; |
| A4 / D15 | &check; | S4 / D19 | &nbsp; |
| A5 / D14 | &check; | S3 / D18 | &nbsp; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}


### PWM (Pulse-width modulation)

{{imageOverlay src="/assets/images/photon-2-argon-pwm-comparison.svg" alt="ADC comparison" class="full-width"}}

The pins that support PWM are different on the Argon and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated bf93e2c1-5640-404d-a2f7-5150ade02743 --}}

| Argon Pin Name | Argon PWM | Photon 2 Pin Name | Photon 2 PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D11 | &nbsp; |
| A1 / D18 | &check; | A1 / D12 | &nbsp; |
| A2 / D17 | &check; | A2 / D13 | &check; |
| A3 / D16 | &check; | A5 / D14 | &check; |
| A4 / D15 | &check; | S4 / D19 | &nbsp; |
| A5 / D14 | &check; | S3 / D18 | &nbsp; |
| MOSI / D12 | &nbsp; | MOSI / D15 | &check; |
| MISO / D11 | &nbsp; | MISO / D16 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| D4 | &check; | D4 | &nbsp; |
| D5 | &check; | D5 | &nbsp; |
| D6 | &check; | D6 | &nbsp; |
| D7 | &check; | D7 | &nbsp; |
| D8 / WKP | &check; | D10 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on the Photon 2 share a single timer. This means that they must all share a single frequency, but can have different duty cycles.

### CAN (controller area network)

Neither the Argon nor the Photon 2 support CAN.

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the Photon 2.


### I2S (Sound)

The Argon supports I2S (sound) input and output with a third-party library.

There is no software support for I2S on the Photon 2, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.

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

### Battery and charge pins

The Photon 2 does not have a fuel gauge chip, however you can determine the voltage of the LiPo battery, if present. The P2 does not include a LiPo battery connector, but if you connect your battery to `VBAT_MEAS`, this technique also works with the P2.

```cpp
float voltage = analogRead(A6) / 819.2;
```

The constant is from the ADC range (0 - 4095) mapped to the voltage from 0 - 5 VDC (the maximum supported on VBAT_MEAS). 

The charge indicator on the Photon 2 can be read using:

```
pinMode(CHG, INPUT_PULLUP);
bool charging = digitalRead(CHG);
```

On the Photon 2, the `CHG` digital input is `HIGH` (1) when charging and `LOW` (0) when not charging.

The voltage formula is different than the Argon, and the logic of the `CHG` pin is opposite! Also the Photon 2 requires `INPUT_PULLUP`.


```cpp
float voltage = analogRead(BATT) * 0.0011224; // Argon
bool charging = !digitalRead(CHG); // Argon
```


### Interrupts

All pins can be used for interrupts on Gen 3 devices and the Photon 2.

There is a limit of 8 pin interrupts on the Argon; this limitation does not exist on the Photon 2.

### Sleep

The Photon 2 can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The Photon 2 can only wake from `HIBERNATE` sleep mode on pin D10, `RISING`, `FALLING`, or `CHANGE`. Pin D10 is the same module pin location as the Argon pin D8, which is also the WKP pin. However, the Argon can wake from `HIBERNATE` on any GPIO, so if you use `HIBERNATE` mode with GPIO wake on other pins, changes will be necessary. One alternative is to use `ULTRA_LOW_POWER` instead of `HIBERNATE` sleep mode on the P2.

### Internal pull-up or pull-down

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

- On the Photon 2, the internal pull is approximately 2.1K.
- On the Argon (Gen 3), the internal pull is approximately 13K.

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

The Argon has a Micro USB B connector.

### NFC tag

The Photon 2 does not have NFC Tag support. The Argon does.

### Full module pin comparison

{{imageOverlay src="/assets/images/argon-pinout.svg" alt="Argon Pinout Diagram" class="full-width"}}

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Photon 2 Pinout Diagram" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 971b8de5-cd16-4546-b554-8535ea744b71 --}}

#### RST
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### 3V3
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | 3V3 | 3V3 |
| Description | Regulated 3.3V DC output, maximum load 1000 mA | Regulated 3.3V DC output, maximum load 500 mA |
#### MODE
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MODE | MODE |
| Pin Alternate Name | D20 | n/a |
| Description | MODE button, has internal pull-up | MODE button, has internal pull-up |
#### GND
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### A0
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A0 | A0 |
| Pin Alternate Name | D19 | D11 |
| Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### A1
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A1 | A1 |
| Pin Alternate Name | D18 | D12 |
| Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### A2
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A2 | A2 |
| Pin Alternate Name | D17 | D13 |
| Description | A2 Analog in, GPIO, PWM | A2 Analog in, GPIO, PWM. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
#### A3 / A5
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A3 | A5 |
| Pin Alternate Name | D16 | D14 |
| Description | A3 Analog in, GPIO, PWM | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
#### A4 / S4
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A4 | S4 |
| Pin Alternate Name | D15 | D19 |
| Description | A4 Analog in, GPIO, PWM | S4 GPIO, Was A4 on Gen 3. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### A5 / S3
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | A5 | S3 |
| Pin Alternate Name | D14 | D18 |
| Description | A5 Analog in, GPIO, PWM, SPI SS | S3 GPIO, SPI SS, Was A5 on Gen 3. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | No |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | Default SS for SPI. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### SCK
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | SCK | SCK |
| Pin Alternate Name | D13 | D17 |
| Description | SPI SCK, GPIO | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | n/a | RTS. Use Serial3 object. Flow control optional. |
| SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### MOSI
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MOSI | MOSI |
| Pin Alternate Name | D12 | D15 |
| Description | SPI MOSI, GPIO | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| UART serial | n/a | TX. Use Serial3 object. |
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### MISO
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | MISO | MISO |
| Pin Alternate Name | D11 | D16 |
| Description | SPI MISO, GPIO | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| UART serial | n/a | RX. Use Serial3 object. |
| SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### RX
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | RX | RX |
| Pin Alternate Name | D10 | D9 |
| Description | Serial RX, GPIO | Serial1 RX (received data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | RX Use Serial1 object. | RX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
#### TX
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | TX | TX |
| Pin Alternate Name | D09 | D8 |
| Description | Serial TX, GPIO | Serial1 TX (transmitted data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | TX Use Serial1 object. | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
| Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### D0
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D0 | D0 |
| Pin Alternate Name | n/a | A3 |
| Description | I2C SDA, GPIO | D0 GPIO, I2C SDA, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 22K |
#### D1
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D1 | D1 |
| Pin Alternate Name | n/a | A4 |
| Description | I2C SCL, GPIO | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 22K |
#### D2
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D2 | D2 |
| Description | SPI1 SCK, Wire1 SDA, Serial1 RTS, PWM, GPIO | D2 GPIO, Serial2 RTS, SPI1 MOSI |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Options RTS hardware flow control for Serial1 | RTS. Use Serial2 object. Flow control optional. |
| SPI interface | SCK. Use SPI1 object. | MOSI. Use SPI1 object. |
| I2C interface | SDA. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### D3
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D3 | D3 |
| Description | SPI1 MOSI, Wire1 SCL, Serial1 CTS, PWM, GPIO | D3 GPIO, Serial2 CTS, SPI1 MISO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Options CTS hardware flow control for Serial1 | CTS. Use Serial2 object. Flow control optional. |
| SPI interface | MOSI. Use SPI1 object. | MISO. Use SPI1 object. |
| I2C interface | SCL. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### D4
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D4 | D4 |
| Description | SPI1 MISO, PWM, GPIO | D4 GPIO, Serial2 TX, SPI1 SCK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | TX. Use Serial2 object. |
| SPI interface | MISO. Use SPI1 object. | SCK. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### D5
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D5 | D5 |
| Description | PWM, GPIO | D5 GPIO, Serial2 RX, SPI1 SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | RX. Use Serial2 object. |
| SPI interface | n/a | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### D6
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D6 | D6 |
| Description | PWM, GPIO | D6 GPIO, SWCLK. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
| SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### D7
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D7 | D7 |
| Description | PWM, GPIO | D7 GPIO, Blue LED, SWDIO |
| Supports digitalRead | Yes | Yes. |
| Supports digitalWrite | Yes | Yes. On the Photon this is the blue D7 LED. |
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
| SWD interface | n/a | SWDIO. 40K pull-up at boot. |
| Signal used at boot | n/a | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### D8 / D10
|   | Argon | Photon 2 |
| :--- | :--- | :--- |
| Pin Name | D8 | D10 |
| Pin Alternate Name | WKP | WKP |
| Description | GPIO, PWM | D10 GPIO. Serial3 CTS, WKP. Was D8/WKP on Gen 3. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### VUSB
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### EN
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### LI+
| | Unchanged between Argon and Photon 2 |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|


{{!-- END do not edit content above, it is automatically generated --}}

## Software

### Wi-Fi Configuration

The Photon 2 and Argon utilize BLE for configuration of Wi-Fi. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration. A React Native reference will be provided to simplify Wi-Fi setup.

Neither the Photon 2 nor Argon use the Wi-Fi based setup (SoftAP) that is used on the Photon and P1.

Sample applications for React Native, iOS, and Android will be provided in the future.

| Feature | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | &check; | |
| BLE | &check; | | &check; |

### BLE (Bluetooth LE)

- BLE long-range (coded PHY) is not supported on the Photon 2. It is on the Argon with Device OS 3.1 or later.

### Platform ID

The Platform ID of the Photon 2 will different from that of the Argon (12) because of the vastly different hardware. 

If you have a product based on the Argon, you will need to create a separate product for devices using the Photon 2. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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
|     | 2022-04-18 | RK | Major changes to pinmap to align with P2 |
|     | 2022-08-12 | RK | Added listing of pins used at boot |
|     | 2022-08-12 | RK | Warning about BLE central mode not available |
|     | 2022-10-05 | RK | Added HIBERNATE sleep section |
|     | 2022-11-17 | RK | Pin D0 does not have PWM |
|     | 2023-04-05 | RK | Added Device OS 5.3.1 information for SPI and retained memory |
|     | 2023-04-24 | RK | Document VBAT_MEAS and CHG |
|     | 2023-05-05 | RK | Fix available RAM |
