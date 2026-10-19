---
title: Sulu from Boron migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Boron to Sulu
---

# {{title}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/sulu-boron-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{migration-guide leftImg="/assets/images/boron/boron-top.png" rightImg="/assets/images/axion/axion-rendering.png"}}

## Hardware

### Datasheets

- [Sulu datasheet](/reference/datasheets/b-series/sulu-datasheet/)
- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)
- [Boron BRN404X datasheet](/reference/datasheets/b-series/brn404x-datasheet/)

## Certification

When migrating to a new device, recertification is typically required. If you are using the standard Particle antennas 
you often only need to complete the less expensive unintentional radiator testing of your completed assembly, however 
in some cases intentional radiator testing could be required.

## Cellular

The Boron 404X contains a LTE Cat M1 cellular modem that is only officially supported in the United States, Canada, and Mexico. It may work in some additional countries.

Sulu has a LTE Cat 1 bis cellular modem with global cellular compatibility. This allows a single SKU to be used world-wide.

See [country comparison](/reference/datasheets/b-series/sulu-datasheet/#country-comparison) in the Sulu datasheet for more information.

## SIM

Sulu contains an e-sim programmed with the Particle EtherSIM.

The Boron has a MFF2 hardware EtherSIM, as well as a 4FF plastic nano SIM card slot.

## Wi-Fi connectivity

Sulu supports Wi-Fi connectivity as well as cellular. Wi-Fi is not supported on Boron.

## NFC Tag

Boron supports NFC tag mode. This is not supported on Sulu.

## Antennas

The Boron certified cellular antenna (PARANTC41EA/PARANTC41TY) is different than the Sulu certified cellular antenna (PARANTCW1EA/PARANTCW1TY).

The Boron has an integrated BLE chip antenna. Sulu requires an external antenna for BLE, shared with Wi-Fi.

## Software differences

### User firmware binary size

One major advantage is that user firmware binaries can be up to 2048 KB, instead of 256 KB on Gen 3 devices using Device OS 3.1.0 or later.

### Available RAM

The Boron and Argon have around 80 KB of RAM available to user applications. Sulu has 3000 KB (3 MB) of available RAM.

### Flash file system

There is a 2 MB flash file system for storing user data. This is the same size as the Boron, B-SoM, and Argon.

## Antennas

Sulu does not contain an on-board chip antenna for BLE, unlike the Boron.

External antennas are required on Sulu for BLE/Wi-Fi, and also for cellular. See [antennas](/reference/datasheets/b-series/sulu-datasheet/#antennas) in the Sulu datasheet for more information.

## USB connector

Sulu has a USB-C connector. The Boron has a Micro USB connector.

## LiPo battery connector

Sulu has a 3-pin Particle LiPo battery connector for a battery pack containing an integrated 10K NTC thermistor. This is a different connector and battery than the Boron.

## Interface port differences


### SPI - Sulu from Boron

{{imageOverlay src="/assets/images/axion/axion-boron-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 74e90cd9-f151-4393-86a2-fdd6ca70c4ca --}}

| Boron Pin Name | Boron SPI | Axion Pin Name | Axion SPI |
| :--- | :--- | :--- | :--- |
| A3 / D16 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| A4 / D15 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| A5 / D14 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (SCK) | D2 | &nbsp; |
| D3 | SPI1 (MOSI) | D3 | &nbsp; |
| D4 | SPI1 (MISO) | D4 | SPI (SS) |
| D5 | &nbsp; | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}

#### SPI - Gen 3 devices (including Boron)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 32 MHz | 32 MHz |
| Default rate | 16 MHz | 16 MHz |
| Clock | 64 MHz | 64 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256
- Default divisor is 4

#### SPI - Sulu

| | SPI1 | SPI0 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |


### Serial (UART) - Sulu from Boron

{{imageOverlay src="/assets/images/axion/axion-boron-serial-comparison.svg" alt="Serial comparison" class="full-width"}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both Sulu and Boron. Sulu optionally supports hardware flow control on `Serial1`.

{{!-- BEGIN do not edit content below, it is automatically generated 8671f442-6d5f-468b-a0c2-a11870f7228d --}}

| Boron Pin Name | Boron Serial | Axion Pin Name | Axion Serial |
| :--- | :--- | :--- | :--- |
| RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| TX / D09 | Serial1 TX | TX / D9 | Serial1 (TX) |
| D2 | Serial1 RTS | D2 | Serial1 (RTS)  |
| D3 | Serial1 CTS | D3 | Serial1 (CTS)  |


{{!-- END do not edit content above, it is automatically generated --}}

|      | Boron    | Sulu |
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

<sup>1</sup>CTS/RTS flow control only on `Serial1` on Sulu. It is optional.

<sup>2</sup>On the Boron, the buffer be resized larger in Device OS 3.2.0 and later.

Supported Baud Rates:

| Baud Rate | Boron | P2 |
| ---: | :---: | :---|
| 110     | | &check; |
| 300     | | &check; |
| 600     | | &check; |
| 1200    | &check; | &check; |
| 2400    | &check; | &check;|
| 4800    | &check; | &check;|
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
| 380400 | | &check; |
| 460800  | &check; | &check; |
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


### Analog input (ADC) - Sulu from Boron

{{imageOverlay src="/assets/images/axion/axion-boron-adc-comparison.svg" alt="ADC comparison" class="full-width"}}

For analog to digital conversion (ADC) using `analogRead()`.

- Pin A0, A1, A2, A3, A4, and A5 are analog inputs on both the Boron and Sulu.
- The `setADCSampleTime()` function is not supported on Sulu.

{{!-- BEGIN do not edit content below, it is automatically generated 60b8d1d9-a3b4-431a-a028-c0f7c0bdda3a --}}

| Boron Pin Name | Boron ADC | Axion Pin Name | Axion ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}


### PWM (Pulse-width modulation) - Sulu from Boron

{{imageOverlay src="/assets/images/axion/axion-boron-pwm-comparison.svg" alt="PWM comparison" class="full-width"}}

The pins that support PWM are different on the Boron and Photon 2.


{{!-- BEGIN do not edit content below, it is automatically generated 6026dd9c-e783-4ada-a1ed-850c5cddcd0b --}}

| Boron Pin Name | Boron PWM | Axion Pin Name | Axion PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &nbsp; |
| A1 / D18 | &check; | A1 / D18 | &nbsp; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &nbsp; |
| SCK / D13 | &nbsp; | SCK / D13 | &check; |
| MOSI / D12 | &nbsp; | MOSI / D12 | &check; |
| MISO / D11 | &nbsp; | MISO / D11 | &check; |
| RX / D10 | &nbsp; | RX / D10 | &check; |
| TX / D09 | &nbsp; | TX / D9 | &check; |
| D0 | &nbsp; | D0 | &check; |
| D1 | &nbsp; | D1 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 | &nbsp; |
| D6 | &check; | D6 | &nbsp; |
| D7 | &check; | D7 | &nbsp; |
| D8 / WKP | &check; | D8 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on Sulu share a single timer. This means that they must all share a single frequency, but can have different duty cycles.


### PDM - Sulu from Boron

Pulse density modulation digital microphones can be used with the [Microphone_PDM](https://github.com/particle-iot/Microphone_PDM) library 
and Sulu, but only on specific pins. The Boron can use any pins for PDM (with the same library).

{{!-- BEGIN do not edit content below, it is automatically generated e9d285b3-09e4-47f2-b040-a45f719a9bde --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D19 | A0 Analog in, PDM CLK, GPIO | CLK | PB[1] |
| A1 / D18 | A1 Analog in, PDM DAT, GPIO | DAT | PB[2] |


{{!-- END do not edit content above, it is automatically generated--}}


### I2S (Sound) - Sulu from Boron


{{!-- BEGIN do not edit content below, it is automatically generated 6489e45c-ce6e-41be-840b-c94c85124702 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D4 | D4 GPIO, SPI SS, PWM, I2S WS | I2S WS | PB[21] |
| MISO / D11 | SPI MISO, D11 GPIO, PWM, I2S TX | I2S TX | PB[19] |
| SCK / D13 | D13 GPIO, SPI SCK, PWM, I2S CLK | I2S CLK | PB[20] |
| TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | I2S MCLK | PA[12] |


{{!-- END do not edit content above, it is automatically generated--}}

Boron supports I2S (sound) input and output with a third-party library.

The Sulu hardware supports I2S (sound), but there is no support for it in Device OS. It should be possible to implement in a third-party library from user firmware, but there is no publicly available library available at this time.
### BLE (Bluetooth LE) - Sulu from Boron

BLE Central and BLE Peripheral modes are supported on Sulu and the Boron.

BLE long range (coded PHY) is not supported on Sulu but is supported on the Boron.


### Boot mode pins - Sulu from Boron

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated db6531b6-9387-4e7c-b2f9-779c8423b2cf --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |


{{!-- END do not edit content above, it is automatically generated --}}


### Interrupts - Sulu from Boron

All pins can be used for interrupts on Gen 3 devices and Sulu.

There is a limit of 8 pin interrupts on the Boron; this limitation does not exist on Sulu.

### Sleep - Sulu from Boron

Sulu can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

Sulu can only wake from `HIBERNATE` sleep mode on certain pins, `RISING`, `FALLING`, or `CHANGE`. 

Pin D8 `WKP` is the same module pin location as the Boron pin D8, which is also the WKP pin. This is different on the Photon 2.

{{!-- BEGIN do not edit content below, it is automatically generated f1da1b65-7e6c-4611-ba44-b9273c40c9da --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 14 | RX / D10 | Serial RX, PWM, GPIO | Pin can wake from HIBERNATE sleep | PA[13] |
| 15 | TX / D9 | Serial TX, PWM, GPIO, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
| 18 | D2 | D2 GPIO, Serial RTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[14] |
| 19 | D3 | D3 GPIO, Serial1 CTS flow control (optional) | Pin can wake from HIBERNATE sleep | PA[15] |
| 24 | D8 / WKP | GPIO, WKP | Pin can wake from HIBERNATE sleep | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Internal pull-up or pull-down - Sulu from Boron

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

- On Sulu, the internal pull varies based on the pin.
- On the Boron (Gen 3), the internal pull is approximately 13K.


### Retained memory - Sulu from Boron

Sulu has limited support for retained memory, also referred to as Backup RAM or SRAM, in Device OS 5.3.1 and later.

{{!-- BEGIN shared-blurb f960cc9c-6e25-4205-adf9-03bfd50b9da7 --}}
Retained memory is preserved on RTL872x devices in the following cases:

| Case | Saved |
| :--- | :--- |
| When entering sleep modes | 5.3.1 and later |
| OTA firmware updates | 5.3.1 and later |
| `System.backupRamSync()` | 5.3.1 and later |
| `System.reset()` | Not saved |
| Reset button or reset pin | Not saved  |
| Every 10 seconds | 5.3.1 to 5.8.0 only |

Calling [`System.backupRamSync()`](/reference/device-os/api/system-calls/backupramsync/) will manually save the contents of retained memory and will be restored after the device is reset. You should avoid saving the data extremely frequently as it is slower than RAM and will cause flash wear and is relatively slow to execute.
In Device OS 5.3.1 to 6.5.x it is saved to a dedicated flash page, and in Device OS 6.6.0 and later it is saved to the flash file system.

Prior to Device OS 5.3.1, retained memory is not supported on RTL872x devices. The flash file system can be used, or you can use an external chip such as an I2C or SPI FRAM.

Retained memory is 3068 bytes. 
{{!-- END shared-blurb --}}

### NFC tag - Sulu from Boron

Sulu does not have NFC Tag support. Gen 3 devices including the Boron do have support for NFC Tag.


### Full module pin comparison - Sulu from Boron

{{imageOverlay src="/assets/images/boron-pinout.svg" alt="Boron Pinout Diagram" class="full-width"}}

{{imageOverlay src="/assets/images/axion/axion-pinout.svg" alt="Pinout" class="full-width"}}



{{collapse op="start" label="Show pin details"}}
{{!-- BEGIN do not edit content below, it is automatically generated ec636e6d-5401-4cf4-8ff9-27354ec41508 --}}

#### RST
| | Unchanged between Boron and Axion |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### 3V3
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 1000 mA | Regulated 3.3V DC output |
#### MODE
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MODE | MODE |
| &nbsp; | Description | MODE button, has internal pull-up | MODE button, has internal pull-up |
| ∆ | Supports attachInterrupt | n/a | Yes |
#### GND
| | Unchanged between Boron and Axion |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### A0
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| &nbsp; | Pin Alternate Name | D19 | D19 |
| ∆ | Description | A0 Analog in, GPIO, PWM | A0 Analog in, PDM CLK, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### A1
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| &nbsp; | Pin Alternate Name | D18 | D18 |
| ∆ | Description | A1 Analog in, GPIO, PWM | A1 Analog in, PDM DAT, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### A2
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| &nbsp; | Pin Alternate Name | D17 | D17 |
| &nbsp; | Description | A2 Analog in, GPIO, PWM | A2 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### A3
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A3 | A3 |
| &nbsp; | Pin Alternate Name | D16 | D16 |
| ∆ | Description | A3 Analog in, GPIO, PWM | A3 Analog in, SPI1 MOSI, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 42K |
#### A4
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A4 | A4 |
| &nbsp; | Pin Alternate Name | D15 | D15 |
| ∆ | Description | A4 Analog in, GPIO, PWM | A4 Analog in, SPI1 MISO, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### A5
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, SPI1 SCK, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | SCK. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 22K |
#### SCK
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | SCK | SCK |
| &nbsp; | Pin Alternate Name | D13 | D13 |
| ∆ | Description | SPI SCK, GPIO | D13 GPIO, SPI SCK, PWM, I2S CLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S CLK |
| ∆ | Internal pull resistance | 13K | ??? |
#### MOSI
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MOSI | MOSI |
| &nbsp; | Pin Alternate Name | D12 | D12 |
| ∆ | Description | SPI MOSI, GPIO | SPI MOSI, D12 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### MISO
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MISO | MISO |
| &nbsp; | Pin Alternate Name | D11 | D11 |
| ∆ | Description | SPI MISO, GPIO | SPI MISO, D11 GPIO, PWM, I2S TX |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S TX |
| ∆ | Internal pull resistance | 13K | ??? |
#### RX
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RX | RX |
| &nbsp; | Pin Alternate Name | D10 | D10 |
| ∆ | Description | Serial RX, GPIO | Serial RX, PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### TX
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D09 | D9 |
| ∆ | Description | Serial TX, GPIO | Serial TX, PWM, GPIO, I2S MCLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S MCLK |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### D0
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | I2C SDA, GPIO | I2C SDA, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D1
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | I2C SCL, GPIO | I2C SCL, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D2
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | SPI1 SCK, Serial1 RTS, GPIO, PWM | D2 GPIO, Serial RTS flow control (optional) |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| &nbsp; | UART serial | RTS. Use Serial1 object. | RTS. Use Serial1 object. |
| ∆ | SPI interface | SCK. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D3
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | SPI1 MOSI, Serial1 CTS, PWM, GPIO | D3 GPIO, Serial1 CTS flow control (optional) |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| &nbsp; | UART serial | CTS. Use Serial1 object. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D4
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | SPI1 MISO, PWM, GPIO | D4 GPIO, SPI SS, PWM, I2S WS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | SPI interface | MISO. Use SPI1 object. | SS. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S WS |
| ∆ | Internal pull resistance | 13K | ??? |
#### D5
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | PWM, GPIO | D5 GPIO, SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| ∆ | SPI interface | n/a | SS. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D6
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | PWM, GPIO | GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D7
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | PWM, GPIO | GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| &nbsp; | Internal pull resistance | 13K | 13K |
#### D8
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D8 | D8 |
| &nbsp; | Pin Alternate Name | WKP | WKP |
| ∆ | Description | GPIO, PWM | GPIO, WKP |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### VUSB
|   |   | Boron | Axion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | VUSB | VUSB |
| ∆ | Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. | Power out (when powered by USB) 5 VDC, power in with limitations. |
| &nbsp; | Input is 5V Tolerant | Yes | Yes |
#### EN
| | Unchanged between Boron and Axion |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### LI+
| | Unchanged between Boron and Axion |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}

## Software

### Wi-Fi Configuration

The Boron does not have Wi-Fi capabilities. If you wish to use Wi-Fi on Sulu, you will typically use BLE for configuration of Wi-Fi. Using BLE allows mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

Sample applications for React Native, iOS, and Android will be provided in the future.

| Feature | Sulu | Photon 2 | Photon | Argon |
| :--- | :---: | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | | &check; | |
| BLE | &check; | &check; | | &check; |

### BLE (Bluetooth LE)

- BLE long-range (coded PHY) is not supported on Sulu. It is on the Boron with Device OS 3.1 or later.

### Platform ID

The Platform ID of Sulu is 38. This is different than the Boron (13) because of the vastly different hardware. 

If you have a product based on the Boron, you will need to create a separate product for devices using Sulu. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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

## Revision history

| Revision | Date       | Author | Comments |
| :--------| :--------- | :----- | :------- |
| pre 01   | 2026-10-13 | RK     | Initial preview version |
