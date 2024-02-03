---
title: M SoM from Boron or Argon migration guide
columns: two
layout: commonTwo.hbs
description: M SoM from Boron or Argon migration guide
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and changes may occur prior to release.
{{box op="end"}}

{{migration-guide leftImg="/assets/images/boron/boron-top.png" rightImg="/assets/images/m-series/muon-top.png"}}

<p class="attribution">Pictures are not the same scale</p>


## Hardware

### Module style

The Argon and Boron are pin-based modules that can be installed in solderless breadboard for prototyping, can be installed in a socket on your custom board, or soldered directly to your board. The modules are in Adafruit Feather form-factor. There are male header pins on the bottom.

The Muon is a larger development module. There female headers on the top of the board that accept an expansion card or can be connected to a solderless breadboard using Dupont wires or ribbon cable. The Muon contains a M SoM module mounted in a M.2 NGFF socket, a power supply, and various peripheral chips.

| Device | Inches | Millimeters (mm) |
| :--- | :--- | :--- |
| Argon/Boron | 0.9" x 2.0" | 22.86mm x 50.8mm |
| Muon | 1.96" x 3.54" | 50mm x 90mm |

You can use the Muon as a development module, or use it as a base for your you own product. The 96-pin socket mates with standard 0.1" male header pins, making it easy to build your own expansion card.

### Radios

| Radio | Argon | Boron | M SoM | Muon |
| :--- | :---: | :---: | :---: | :---: |
| Cellular | | &check; | &check; | &check; |
| Wi-Fi 2.4 GHz | &check; | | &check; | &check; |
| Wi-Fi 5 GHz |  | | &check; | &check; |
| BLE | &check; | &check; | &check; | &check; |
| LoRa | | | | &check; |


### Datasheets

- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)
- [M SoM datasheet](/reference/datasheets/m-series/msom-datasheet/)
- [Boron BRN404X datasheet](/reference/datasheets/b-series/brn404x-datasheet/)
- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)
- [B Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)


## Certification

When migrating to a new device, recertification is typically required. If you are using the standard Particle antennas 
you often only need to complete the less expensive unintentional radiator testing of your completed assembly, however 
in some cases intentional radiator testing could be required.

## Software differences

### User firmware binary size

One major advantage is that user firmware binaries can be up to 2048 Kbytes, instead of 256 Kbytes on Gen 3 devices using Device OS 3.1.0 or later.

### Available RAM

The Boron and Argon have around 80K of RAM available to user applications. The Muon and M SoM has 3500K of available RAM.

### Flash file system

There is a 2 MB flash file system for storing user data. This is the same size as the Boron, B SoM, and Argon. The Tracker has a 4 MB flash file system.

### USB Connector

The Argon and Boron have a USB Micro B connector.

The Muon has a USB C connector.

### SWD/JTAG

The Muon has the same 10-pin (2x5) SWD/JTAG debugging connector as the Argon and Boron.

On the Muon and M SoM, however, SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840). Building a Debug build in Particle Workbench allows SWD to be used while user firmware is running, but you cannot use A4, A6, or D27 as GPIO when SWD is enabled in user firmware.

SWO (Serial Wire Output) is not supported on the RTL8722DM.

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | SWCLK | PB[7] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}


### LiPo Battery and LI+ pin

The Boron and Argon have a 2-pin JST-PH connector for a 3.7V LiPo battery. The standard Particle battery is 1800 mAh, but other batteries are available up to 6000 mAh in a similar but larger form-factor.

The Muon has a 3-pin JST-PH for a 3.7V LiPo battery with a battery pack temperature sensor.

The Boron uses a full PMIC (bq24195) and fuel gauge (MAX17043). By including these features on your base board you can provide more full-featured operation on battery power than the Argon does.

The Argon uses a Torex XC6208A42 LiPo charge controller.

The Muon uses the same PMIC and fuel gauge chips as the Boron.

### EN pin

The Argon and Boron have EN pin which can shut down the Torex XC9258 3.3V regulator to power down the 3.3V supply to the Argon nRF52840 MCU and the ESP32 Wi-Fi coprocessor. A similar feature exists on the Boron, using a load switch to control the 3.3V power supply and the 3.7V cellular modem power supply.

This feature does not exist on the Muon.

### Land pattern

An expansion card for the Muon has male header pins on the bottom, and its on top of the Muon.

{{imageOverlay src="/assets/images/m-series/muon-dims2.png" alt="Expansion card dimensions" class="full-width"}}

The Argon and Boron have male header pins on the bottom, and often mate with a female socket on your base board, opposite of the Muon.

{{imageOverlay src="/assets/images/boron/boron-landing-pattern.png" alt="Boron Land Pattern" class="full-width"}}



### ADC

{{imageOverlay src="/assets/images/m-series/muon-adc.svg" alt="ADC pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 7569c844-d0ac-4468-b317-3c9c6d9b7198 --}}

| Boron Pin Name | Boron ADC | Muon Pin Name | Muon ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| &nbsp; | &nbsp; | A6 / D29 | &check; |
| D8 / WKP | &nbsp; | A7 / WKP | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

- Same number of ADC on both
- ADC inputs are single-ended and limited to 0 to 3.3V on both
- Resolution is 12 bits on both

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}

### Serial

{{imageOverlay src="/assets/images/m-series/muon-uart.svg" alt="UART pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 5bb5787d-980b-4cb7-8293-14ed6775d21b --}}

| Boron Pin Name | Boron Serial | Muon Pin Name | Muon Serial |
| :--- | :--- | :--- | :--- |
| D2 | Serial1 RTS | D2 | Serial1 (RTS)  |
| &nbsp; | &nbsp; | D24 | Serial2 (TX)  |
| &nbsp; | &nbsp; | D25 | Serial2 (RX)  |
| D3 | Serial1 CTS | D3 | Serial1 (CTS)  |
| RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| TX / D09 | Serial1 TX | TX / D9 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated--}}

- One additional UART serial port on the Muon/M SoM


### SPI

{{imageOverlay src="/assets/images/m-series/muon-spi.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated bb723044-07c3-4cf6-819f-8a140213ec6b --}}

| Boron Pin Name | Boron SPI | Muon Pin Name | Muon SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | SPI (SS) | A5 / D14 | &nbsp; |
| D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| D3 | SPI1 (MOSI) | D3 | SPI1 (SS) |
| D4 | SPI1 (MISO) | D4 | &nbsp; |
| &nbsp; | &nbsp; | D8 | SPI (SS) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| RX / D10 | &nbsp; | RX / D10 | SPI1 (MISO) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| TX / D09 | &nbsp; | TX / D9 | SPI1 (MOSI) |


{{!-- END do not edit content above, it is automatically generated--}}

- There are two SPI interfaces on both, however SPI1 is on different pins on Muon/M SoM.


### I2C

{{imageOverlay src="/assets/images/m-series/muon-i2c.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 202b1c57-447e-4821-b2f5-ef6f90407e49 --}}

| Boron Pin Name | Boron I2C | Muon Pin Name | Muon I2C |
| :--- | :--- | :--- | :--- |
| D0 | Wire (SDA) | D0 | Wire (SDA) |
| D1 | Wire (SCL) | D1 | Wire (SCL) |


{{!-- END do not edit content above, it is automatically generated--}}

- You can generally have many devices on a single I2C bus.
- If you have I2C address conflicts you can use an I2C multiplexer like the TCA9548A.
- On the Muon, M SoM, P2, and Photon 2, the only valid I2C clock speeds are `CLOCK_SPEED_100KHZ` and `CLOCK_SPEED_400KHZ`. Other speeds are not supported at this time.

There are number of I2C peripherals on the Muon board. Makes ure external sensors and devices I2C addresses do not conflict with these addresses:


{{!-- BEGIN shared-blurb b22140c5-a3b4-4295-bd72-ae892dc637cf --}}
| I2C Address | Peripheral |
| :--- | :--- |
| 0x08 | HUSB238 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x50 | 24CW640T EEPROM |
| 0x68 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
|      | LoRa radio |
{{!-- END shared-blurb --}}



### PWM

{{imageOverlay src="/assets/images/m-series/muon-pwm.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 7ccd5b6d-7fac-406d-9245-8a0659e3b746 --}}

| Boron Pin Name | Boron PWM | Muon Pin Name | Muon PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &nbsp; |
| A3 / D16 | &check; | A3 / D16 | &nbsp; |
| A4 / D15 | &check; | A4 / D15 | &nbsp; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| &nbsp; | &nbsp; | A6 / D29 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 | &check; |
| D6 | &check; | D6 | &check; |
| D7 | &check; | D7 | &check; |
| MISO / D11 | &nbsp; | MISO / D11 | &check; |
| MOSI / D12 | &nbsp; | MOSI / D12 | &check; |
| RX / D10 | &nbsp; | RX / D10 | &check; |
| TX / D09 | &nbsp; | TX / D9 | &check; |
| D8 / WKP | &check; | A7 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated c9e7a163-b53c-4c4f-81ff-f84ec7344a0c --}}

| Pin Name | Description | M2 Pin | MCU |
| :--- | :--- | :--- | :--- |
| A6 / D29 | SWCLK. 40K pull-down at boot. | 45 | PB[7] |
| RGBR | Low at boot triggers trap mode | 61 | PA[30] |
| D24 | Low at boot triggers ISP flash download | 58 | PA[7] |
| D25 | Goes high at boot | 60 | PA[8] |
| D27 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | 55 | PA[27] |


{{!-- END do not edit content above, it is automatically generated --}}

### NFC

The Muon and M SoM do not support NFC. 

The Boron and Argon support NFC Tag mode.

### Sleep

- In `HIBERNATE` sleep mode, the Muon/M SoM can only be wakened via the `WKP` pin, but the Boron and Argon can be wakened by any pin.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the Muon, M SoM, Boron, and Argon can be wakened by any pin.

- In `HIBERNATE` sleep mode, the Muon/M SoM puts `OUTPUT` pins into high-impedance state. The Boron and Argon preserve the digital level.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the Muon, M SoM, Boron, and Argon preserve the digital output

- In `HIBERNATE` sleep mode, on the Muon/M SoM, pin D21 does not maintain `INPUT_PULLUP` or `INPUT_PULLDOWN` while asleep.

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Only this pin can wake from HIBERNATE sleep mode. | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Full comparison


{{!-- BEGIN do not edit content below, it is automatically generated a92768ab-8aea-4c68-8223-c1a6636141f8 --}}

#### 3V3
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 1000 mA | 3.3V out, 1000 mA maximum including nRF52 and other peripherals. |
#### A0
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| &nbsp; | Pin Alternate Name | D19 | D19 |
| &nbsp; | Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 42K |
#### A1
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| &nbsp; | Pin Alternate Name | D18 | D18 |
| &nbsp; | Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### A2
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| &nbsp; | Pin Alternate Name | D17 | D17 |
| ∆ | Description | A2 Analog in, GPIO, PWM | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 22K |
#### A3
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A3 | A3 |
| &nbsp; | Pin Alternate Name | D16 | D16 |
| ∆ | Description | A3 Analog in, GPIO, PWM | A3 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### A4
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A4 | A4 |
| &nbsp; | Pin Alternate Name | D15 | D15 |
| ∆ | Description | A4 Analog in, GPIO, PWM | A4 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### A5
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, PWM, GPIO, shared with pin 53 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### A6
| | Added to Muon |
| :--- | :--- |
| Pin Name | A6|
| Pin Alternate Name | D29|
| Description | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
| SWD interface | SWCLK. 40K pull-down at boot.|
| Signal used at boot | SWCLK. 40K pull-down at boot.|
#### D0
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | I2C SDA, GPIO | D0 GPIO, I2C SDA |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D1
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | I2C SCL, GPIO | D1 GPIO, I2C SCL |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D2
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | SPI1 SCK, Serial1 RTS, GPIO, PWM | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| &nbsp; | UART serial | RTS. Use Serial1 object. | RTS. Use Serial1 object. |
| &nbsp; | SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D21
| | Added to Muon |
| :--- | :--- |
| Pin Name | D21|
| Description | D21 GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
#### D22
| | Added to Muon |
| :--- | :--- |
| Pin Name | D22|
| Description | D22 GPIO, PMIC_INT|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D23
| | Added to Muon |
| :--- | :--- |
| Pin Name | D23|
| Description | D23 GPIO, RTC_INT|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D24
| | Added to Muon |
| :--- | :--- |
| Pin Name | D24|
| Description | D24 GPIO, Serial2 TX, do not pull down at boot|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | TX. Use Serial2 object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 42K|
| Signal used at boot | Low at boot triggers ISP flash download|
#### D25
| | Added to Muon |
| :--- | :--- |
| Pin Name | D25|
| Description | GPIO25, Serial2 RX|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | RX. Use Serial2 object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 42K|
| Signal used at boot | Goes high at boot|
#### D26
| | Added to Muon |
| :--- | :--- |
| Pin Name | D26|
| Description | D26 GPIO, LORA_RST|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D27
| | Added to Muon |
| :--- | :--- |
| Pin Name | D27|
| Description | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 42K|
| SWD interface | SWDIO. 40K pull-up at boot.|
| Signal used at boot | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode.|
#### D3
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | SPI1 MOSI, Serial1 CTS, PWM, GPIO | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| &nbsp; | UART serial | CTS. Use Serial1 object. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | SS. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D4
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | SPI1 MISO, PWM, GPIO | D4 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | SPI interface | MISO. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D5
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | PWM, GPIO | D5 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D6
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | PWM, GPIO | D6 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D7
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | PWM, GPIO | D7 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D8
| | Added to Muon |
| :--- | :--- |
| Pin Name | D8|
| Description | D8 GPIO, SPI SS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | Default SS for SPI.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### EN
| | Removed from Boron |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
| | Unchanged between Boron and Muon |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### GNSS_P
| | Added to Muon |
| :--- | :--- |
| Pin Name | GNSS_P|
| Description | NC on Muon (GNSS pulse output on Monitor One).|
#### LI+
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | LI+ | LI+ |
| ∆ | Description | Connected to JST PH LiPo battery connector. 3.7V in or out. | Connect to Li-Po battery. Can power the device or be recharged by VIN or VBUS. |
#### MISO
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MISO | MISO |
| &nbsp; | Pin Alternate Name | D11 | D11 |
| ∆ | Description | SPI MISO, GPIO | D11 GPIO, PWM, SPI MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### MODE
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | MODE | D20 |
| ∆ | Pin Alternate Name | D20 | n/a |
| ∆ | Description | MODE button, has internal pull-up | D20 GPIO, relay on Monitor One I/O card |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### MODE
| | Added to Muon |
| :--- | :--- |
| Pin Name | MODE|
| Description | MODE button. Pin number constant is BTN. External pull-up required!|
| Supports attachInterrupt | Yes|
#### MOSI
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MOSI | MOSI |
| &nbsp; | Pin Alternate Name | D12 | D12 |
| ∆ | Description | SPI MOSI, GPIO | D12 GPIO, PWM, SPI MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### NC
| | Added to Muon |
| :--- | :--- |
| Pin Name | NC|
| Description | n/a|
#### PGOOD
| | Added to Muon |
| :--- | :--- |
| Pin Name | PGOOD|
| Description | NC on Muon (open drain power good output on Monitor One).|
#### PMIC_VIN
| | Added to Muon |
| :--- | :--- |
| Pin Name | PMIC_VIN|
| Description | NC on Muon.|
#### RGBB
| | Added to Muon |
| :--- | :--- |
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### RGBG
| | Added to Muon |
| :--- | :--- |
| Pin Name | RGBG|
| Description | RGB LED Green|
#### RGBR
| | Added to Muon |
| :--- | :--- |
| Pin Name | RGBR|
| Description | RGB LED Red|
| Signal used at boot | Low at boot triggers trap mode|
#### RST
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RST | RST |
| ∆ | Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset, active low. External pull-up required. |
#### RTC_BAT
| | Added to Muon |
| :--- | :--- |
| Pin Name | RTC_BAT|
| Description | RTC/Watchdog battery +. Connect to GND if not using.|
#### RTC_EXTI
| | Added to Muon |
| :--- | :--- |
| Pin Name | RTC_EXTI|
| Description | RTC EXTI. Can use as a wake button. Has 100K weak pull-up to RTC 3V3.|
#### RUN
| | Added to Muon |
| :--- | :--- |
| Pin Name | RUN|
| Description | NC on Muon (power enabled on Monitor One).|
#### RX
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RX | RX |
| &nbsp; | Pin Alternate Name | D10 | D10 |
| ∆ | Description | Serial RX, GPIO | Serial RX, PWM, GPIO, SPI1 MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### SCK
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | SCK | SCK |
| &nbsp; | Pin Alternate Name | D13 | D13 |
| ∆ | Description | SPI SCK, GPIO | D13 GPIO, SPI SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### TS
| | Added to Muon |
| :--- | :--- |
| Pin Name | TS|
| Description | PMIC temperature sensor|
#### TX
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D09 | D9 |
| ∆ | Description | Serial TX, GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### USBDATA-
| | Added to Muon |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Added to Muon |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VBUS
| | Added to Muon |
| :--- | :--- |
| Pin Name | VBUS|
| Description | NC on Muon (nRF52 USB power input on Monitor One).|
#### VCC
| | Added to Muon |
| :--- | :--- |
| Pin Name | VCC|
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power.|
#### VIN
| | Added to Muon |
| :--- | :--- |
| Pin Name | VIN|
| Description | Power input, 6 - 12 VDC|
#### VUSB
| | Removed from Boron |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### WKP
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D8 | A7 |
| &nbsp; | Pin Alternate Name | WKP | WKP |
| ∆ | Description | GPIO, PWM | A7 Analog In, WKP, GPIO D28 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |


{{!-- END do not edit content above, it is automatically generated--}}



## Software

### Wi-Fi configuration

Since the Boron (cellular) does not have Wi-Fi support, if you wish to use Wi-Fi on the Muon/M SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.


### User firmware binary size

One major advantage of the Muon/M SoM is that user firmware binaries can be up to 2048 Kbytes.

On the B SoM (Device OS 3.1 and later), it's 256 Kbytes, or 128 Kbytes for older version of Device OS.

### Platform ID

The Platform ID of the msom (35, `PLATFORM_MSOM`) is different from that of the Boron (13) because of the vastly different hardware. Note that Muon and M SoM share a platform ID.

If you have a product based on the Boron, you will need to create a separate product for devices using the M SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2024-02-05 | RK | Preliminary version |
