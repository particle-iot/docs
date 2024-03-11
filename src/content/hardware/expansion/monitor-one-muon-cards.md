---
title: Monitor One and Muon flexible expansion cards
columns: two
layout: commonTwo.hbs
description: Monitor One and Muon flexible expansion cards
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
The information on the Muon is preliminary and may change before release.
{{box op="end"}}

The Monitor One has support for [expansion cards](/reference/datasheets/tracker/monitor-one-datasheet/#expansion-card-interface). The [Muon](/reference/datasheets/m-series/muon-datasheet/) does as well. The Muon has twice the number of pins on the expansion connector, but both cards share a large number of common signals and are the same physical size.

With a little care, you can design a card that works in both! You can also use the Monitor One as a test bench for developing expansion cards before the Muon is widely available.


## Monitor One expansion

![](/assets/images/monitor-one/monitor-one-iocard.jpg)

### Expansion card pinout - Monitor One

{{imageOverlay src="/assets/images/monitor-one-expansion.svg" alt="Expansion card pinout" class="full-width"}}

### Expansion card dimensions - Monitor One

{{imageOverlay src="/assets/images/monitor-one/expansion-dim.png" alt="Expansion card dimensions" class="full-width"}}


## Muon expansion

![](/assets/images/m-series/muon-iso.jpg)

### Expansion card pinout - Muon

{{imageOverlay src="/assets/images/muon-pins.svg" alt="Expansion card pinout" class="full-width"}}

### Expansion card dimensions - Muon

{{imageOverlay src="/assets/images/m-series/muon-dims2.png" alt="Expansion card dimensions" class="full-width"}}


## Combined card

{{imageOverlay src="/assets/images/muon-monitor-one-pins.svg" alt="Combined card pinout" class="full-width"}}

<p class="attribution"><span style="background-color: #89E2B3; color: #010D14;">Green</span> is the Monitor One pin usage</p>


### General - combined card

- The Monitor One and Muon expansion cards are the same dimensions.
- The expansion cards are the same size as the Muon (50mm x 90mm).
- The inner row of expansion pins exists only on the Muon.
- Tracker SoM (and Monitor One) have combined A and D pins which are separate on the Muon.
- Tracker SoM (and Monitor One) support I2C `Wire3` on the UART TX/RX pins, the Muon does not.
- Muon does not support CAN bus, so `CAN_P`, `CAN_N`, and `CAN_5V` are not supported.

### I2C

- `TSOM_A0_SDA` (Monitor One) and `D0`/`SDA` are in the same pin position (33)
- `TSOM_A1_SCL` (Monitor One) and `D1`/`SCL` are in the same pin position (34)
- Use this instead of Monitor One `Wire3` (TX/RX).


{{!-- BEGIN do not edit content below, it is automatically generated 7e4f9bbe-44f6-40ae-bcab-6e0eb1cb50f0 --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion I2C | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion I2C |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 33 | TSOM_A0_SDA / D0 | Wire (SDA) | 33 | D0 | Wire (SDA) |
| 34 | TSOM_A1_SCL / D1 | Wire (SCL) | 34 | D1 | Wire (SCL) |
| 45 | RX / D9 | Wire3 (SDA) | 45 | RX / D10 | &nbsp; |
| 46 | TX / D8 | Wire3 (SCL) | 46 | TX / D9 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}


### SPI

- `TSOM_A6` (Monitor One) and `SCK`/`D13` are in the same pin position (14)
- `TSOM_A5` (Monitor One) and `MISO`/`D11` are in the same pin position (15)
- `TSOM_A4` (Monitor One) and `MOSI`/`D12` are in the same pin position (16)
- `TSOM_A7` (Monitor One) and `D8` are in the same pin position (13) and are both `SS`. However you can use any GPIO for SPI chip select.


{{!-- BEGIN do not edit content below, it is automatically generated d5f43cdb-55ad-41a1-bd96-5c2c7fd6fd07 --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion SPI | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion SPI |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 13 | TSOM_A7 / D7 | &nbsp; | 13 | D8 | SPI (SS) |
| 14 | TSOM_A6 / D6 | SPI (SCK) | 14 | SCK / D13 | SPI (SCK) |
| 15 | TSOM_A5 / D5 | SPI (MISO) | 15 | MISO / D11 | SPI (MISO) |
| 16 | TSOM_A4 / D4 | SPI (MOSI) | 16 | MOSI / D12 | SPI (MOSI) |
| 35 | TSOM_A2_BUTTON / D2 | &nbsp; | 35 | D3 | SPI1 (SS) |
| 36 | TSOM_A3_BATT_TEMP / D3 | &nbsp; | 36 | D2 | SPI1 (SCK) |
| 45 | RX / D9 | &nbsp; | 45 | RX / D10 | SPI1 (MISO) |
| 46 | TX / D8 | &nbsp; | 46 | TX / D9 | SPI1 (MOSI) |


{{!-- END do not edit content above, it is automatically generated--}}

### UART

- `RX` is in the same position (45)
- `TX` is in the same position (46)
- This port cannot be used as I2C (`Wire3`) on the Muon.

{{!-- BEGIN do not edit content below, it is automatically generated 5e904a3c-9904-4468-b3aa-c721a247322d --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion UART | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion UART |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 35 | TSOM_A2_BUTTON / D2 | &nbsp; | 35 | D3 | Serial1 (CTS)  |
| 36 | TSOM_A3_BATT_TEMP / D3 | &nbsp; | 36 | D2 | Serial1 (RTS)  |
| 45 | RX / D9 | Serial1 RX | 45 | RX / D10 | Serial1 (RX)  |
| 46 | TX / D8 | Serial1 TX | 46 | TX / D9 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated--}}

### ADC

- There are no available ADC pins that work on both Monitor One and Muon expansion cards.
- Using an I2C ADC on your expansion card is a good option if you need cross-compatibility.

{{!-- BEGIN do not edit content below, it is automatically generated d2f12256-c380-4915-8595-5e5fb89066eb --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion ADC | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion ADC |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 2 | NC | &nbsp; | 2 | A1 / D18 | ADC_1 |
| 3 | NC | &nbsp; | 3 | A3 / D16 | ADC_4 |
| 4 | NC | &nbsp; | 4 | A5 / D14 | ADC_6 |
| 5 | NC | &nbsp; | 5 | A7 / WKP | ADC_7 |
| 13 | TSOM_A7 / D7 | ADC3 | 13 | D8 | &nbsp; |
| 14 | TSOM_A6 / D6 | ADC2 | 14 | SCK / D13 | &nbsp; |
| 15 | TSOM_A5 / D5 | ADC5 | 15 | MISO / D11 | &nbsp; |
| 16 | TSOM_A4 / D4 | ADC7 | 16 | MOSI / D12 | &nbsp; |
| 35 | TSOM_A2_BUTTON / D2 | ADC4 | 35 | D3 | &nbsp; |
| 36 | TSOM_A3_BATT_TEMP / D3 | ADC6 | 36 | D2 | &nbsp; |
| 50 | NC | &nbsp; | 50 | A0 / D19 | ADC_0 |
| 51 | NC | &nbsp; | 51 | A2 / D17 | ADC_2 |
| 52 | NC | &nbsp; | 52 | A4 / D15 | ADC_5 |
| 53 | NC | &nbsp; | 53 | A6 / D29 | ADC_3 |


{{!-- END do not edit content above, it is automatically generated--}}

### PWM

- `TSOM_A5` (Monitor One) and `MISO`/`D11` are in the same pin position (15) and support PWM, but cannot be used as GPIO/PWM if used as SPI.
- `TSOM_A4` (Monitor One) and `MOSI`/`D12` are in the same pin position (16) and support PWM, but cannot be used as GPIO/PWM if used as SPI.
- `TX` is in the same position (46) and support PWM, but cannot be used as GPIO/PWM if used as UART serial.
- Using an I2C PWM on your expansion card is a good option if you need cross-compatibility.

{{!-- BEGIN do not edit content below, it is automatically generated df6bdb3e-9bf6-4a92-9807-013eafba7d7f --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion PWM | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion PWM |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 2 | NC | &nbsp; | 2 | A1 / D18 | &check; |
| 4 | NC | &nbsp; | 4 | A5 / D14 | &check; |
| 13 | TSOM_A7 / D7 | &check; | 13 | D8 | &nbsp; |
| 14 | TSOM_A6 / D6 | &check; | 14 | SCK / D13 | &nbsp; |
| 15 | TSOM_A5 / D5 | &check; | 15 | MISO / D11 | &check; |
| 16 | TSOM_A4 / D4 | &check; | 16 | MOSI / D12 | &check; |
| 35 | TSOM_A2_BUTTON / D2 | &check; | 35 | D3 | &nbsp; |
| 36 | TSOM_A3_BATT_TEMP / D3 | &check; | 36 | D2 | &nbsp; |
| 45 | RX / D9 | &check; | 45 | RX / D10 | &check; |
| 46 | TX / D8 | &check; | 46 | TX / D9 | &check; |
| 50 | NC | &nbsp; | 50 | A0 / D19 | &check; |
| 53 | NC | &nbsp; | 53 | A6 / D29 | &check; |
| 61 | NC | &nbsp; | 61 | D4 | &check; |
| 62 | NC | &nbsp; | 62 | D5 | &check; |
| 63 | NC | &nbsp; | 63 | D6 | &check; |
| 64 | NC | &nbsp; | 64 | D7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}


### GPIO

- `NFC2_VIN_EN`/`NFC_PIN2` (Monitor One) and `D20` are in the same pin position (9)
- `NFC1_PERIPH_INT`/`NFC_PIN1` (Monitor One) and `D21` are in the same pin position (10)
- `TSOM_A6` (Monitor One) and `SCK`/`D13` are in the same pin position (14), but cannot be used as GPIO if used as SPI.
- `TSOM_A5` (Monitor One) and `MISO`/`D11` are in the same pin position (15), but cannot be used as GPIO if used as SPI.
- `TSOM_A4` (Monitor One) and `MOSI`/`D12` are in the same pin position (16), but cannot be used as GPIO if used as SPI.
- `TSOM_A7` (Monitor One) and `D8` are in the same pin position (13) and are both `SS`.
- `RX` is in the same position (45) and can be used as GPIO but cannot be used as GPIO if used as UART serial.
- `TX` is in the same position (46) and can be used as GPIO but cannot be used as GPIO if used as UART serial.
- Using an I2C or SPI GPIO expander on your expansion card is a good option if you need cross-compatibility.

{{!-- BEGIN do not edit content below, it is automatically generated d559a76e-0faf-4f12-97f4-abe1d8cd74f0 --}}

| Pin | Monitor One Expansion Pin Name | Monitor One Expansion GPIO | Muon Expansion Pin | Muon Expansion Pin Name | Muon Expansion GPIO |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 2 | NC | &nbsp; | 2 | A1 / D18 | &check; |
| 3 | NC | &nbsp; | 3 | A3 / D16 | &check; |
| 4 | NC | &nbsp; | 4 | A5 / D14 | &check; |
| 5 | NC | &nbsp; | 5 | A7 / WKP | &check; |
| 9 | NFC2_VIN_EN | &check; | 9 | D20 | &check; |
| 10 | NFC1_PERIPH_INT | &check; | 10 | D21 | &check; |
| 13 | TSOM_A7 / D7 | &check; | 13 | D8 | &check; |
| 14 | TSOM_A6 / D6 | &check; | 14 | SCK / D13 | &check; |
| 15 | TSOM_A5 / D5 | &check; | 15 | MISO / D11 | &check; |
| 16 | TSOM_A4 / D4 | &check; | 16 | MOSI / D12 | &check; |
| 33 | TSOM_A0_SDA / D0 | &nbsp; | 33 | D0 | &check; |
| 34 | TSOM_A1_SCL / D1 | &nbsp; | 34 | D1 | &check; |
| 35 | TSOM_A2_BUTTON / D2 | &check; | 35 | D3 | &check; |
| 36 | TSOM_A3_BATT_TEMP / D3 | &check; | 36 | D2 | &check; |
| 45 | RX / D9 | &check; | 45 | RX / D10 | &check; |
| 46 | TX / D8 | &check; | 46 | TX / D9 | &check; |
| 50 | NC | &nbsp; | 50 | A0 / D19 | &check; |
| 51 | NC | &nbsp; | 51 | A2 / D17 | &check; |
| 52 | NC | &nbsp; | 52 | A4 / D15 | &check; |
| 53 | NC | &nbsp; | 53 | A6 / D29 | &check; |
| 59 | NC | &nbsp; | 59 | D22 | &check; |
| 60 | NC | &nbsp; | 60 | D23 | &check; |
| 61 | NC | &nbsp; | 61 | D4 | &check; |
| 62 | NC | &nbsp; | 62 | D5 | &check; |
| 63 | NC | &nbsp; | 63 | D6 | &check; |
| 64 | NC | &nbsp; | 64 | D7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}


### 5V

The Muon does not have a built-in 5V power supply. 

- `VBUS` is the power line on the USB-C connector. The Muon contains a USB PD chip and prefers to run the USB port at 9V. If the USB-C adapter supports this, VBUS will be 9V instead of 5V!
- `5V` (Monitor One) and `PMIC_VIN` (Muon) are the same pin position (31) but on the Muon, this pin can be 5V to 12V!
- `CAN_5V` is not supported on the Muon as it does not have a boost converter for it.


### Full combined pin details

{{!-- BEGIN do not edit content below, it is automatically generated fdd63f32-8330-4bde-942f-3c707ef91eb0 --}}

#### Module Pin 1 (GNSS_PULSE / GNSS_P)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 1 | 1 |
| ∆ | Pin Name | GNSS_PULSE | GNSS_P |
| ∆ | Description | GNSS time pulse output. Can be used for a GPS fix LED. | NC on Muon (GNSS pulse output on Monitor One). |
#### Module Pin 2 (NC / A1)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 2 | 2 |
| ∆ | Pin Name | NC | A1 |
| ∆ | Pin Alternate Name | n/a | D18 |
| ∆ | Description | n/a | A1 Analog in, GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 3 (NC / A3)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 3 | 3 |
| ∆ | Pin Name | NC | A3 |
| ∆ | Pin Alternate Name | n/a | D16 |
| ∆ | Description | n/a | A3 Analog in, GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 2.1K |
#### Module Pin 4 (NC / A5)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 4 | 4 |
| ∆ | Pin Name | NC | A5 |
| ∆ | Pin Alternate Name | n/a | D14 |
| ∆ | Description | n/a | A5 Analog in, PWM, GPIO, shared with pin 53 |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 5 (NC / A7)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 5 | 5 |
| ∆ | Pin Name | NC | A7 |
| ∆ | Pin Alternate Name | n/a | WKP |
| ∆ | Description | n/a | A7 Analog In, WKP, GPIO D28 |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 6 (NC / GND)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 6 | 6 |
| ∆ | Pin Name | NC | GND |
| ∆ | Description | n/a | Ground. |
#### Module Pin 7 (NC)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | NC|
#### Module Pin 8 (NC)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 8|
| Pin Name | NC|
#### Module Pin 9 (NFC2_VIN_EN / D20)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 9 | 9 |
| ∆ | Pin Name | NFC2_VIN_EN | D20 |
| ∆ | Description | GPIO (used for relay on I/O Card) | D20 GPIO, relay on Monitor One I/O card |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 10 (NFC1_PERIPH_INT / D21)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 10 | 10 |
| ∆ | Pin Name | NFC1_PERIPH_INT | D21 |
| ∆ | Description | Peripheral interrupt (active low) | D21 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### Module Pin 11 (TSOM_MODE / MODE)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 11 | 11 |
| ∆ | Pin Name | TSOM_MODE | MODE |
| ∆ | Description | MODE button (active low) | MODE button. Pin number constant is BTN. External pull-up required! |
| ∆ | Supports attachInterrupt | n/a | Yes |
#### Module Pin 12 (TSOM_RESET / RST)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 12 | 12 |
| ∆ | Pin Name | TSOM_RESET | RST |
| ∆ | Description | RESET button (active low) | Hardware reset, active low. External pull-up required. |
#### Module Pin 13 (TSOM_A7 / D8)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 13 | 13 |
| ∆ | Pin Name | TSOM_A7 | D8 |
| ∆ | Pin Alternate Name | D7 | n/a |
| ∆ | Description | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | D8 GPIO, SPI SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, A5, A7 must have the same frequency. | No |
| ∆ | SPI interface | n/a | Default SS for SPI. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 14 (TSOM_A6 / SCK)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 14 | 14 |
| ∆ | Pin Name | TSOM_A6 | SCK |
| ∆ | Pin Alternate Name | D6 | D13 |
| ∆ | Description | A6 Analog in, GPIO D6, PWM, SPI (SCK) | D13 GPIO, SPI SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A4, A5, A5, A7 must have the same frequency. | No |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 15 (TSOM_A5 / MISO)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 15 | 15 |
| ∆ | Pin Name | TSOM_A5 | MISO |
| ∆ | Pin Alternate Name | D5 | D11 |
| ∆ | Description | A5 Analog in, GPIO D5, PWM, SPI MISO | D11 GPIO, PWM, SPI MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A4, A5, A5, A7 must have the same frequency. | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 16 (TSOM_A4 / MOSI)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 16 | 16 |
| ∆ | Pin Name | TSOM_A4 | MOSI |
| ∆ | Pin Alternate Name | D4 | D12 |
| ∆ | Description | A4 Analog in, GPIO D4, PWM, SPI MOSI | D12 GPIO, PWM, SPI MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A4, A5, A5, A7 must have the same frequency. | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 17 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 17|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 18 (3V3)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 18 | 18 |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | 3.3V out, 1000 mA maximum including nRF52 and other peripherals. | 3.3V out. 700 mA for M-SoM and 500 mA available for peripheral devices. |
#### Module Pin 19 (RUN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 19 | 19 |
| &nbsp; | Pin Name | RUN | RUN |
| ∆ | Description | Pull low to disable LTC7103 regulator. Has 100K pull-up to VIN. | NC on Muon (power enabled on Monitor One). |
#### Module Pin 20 (PGOOD)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 20 | 20 |
| &nbsp; | Pin Name | PGOOD | PGOOD |
| ∆ | Description | LTC7103 regulator open drain power good output. Pulled low when regulator is not in regulation. | NC on Muon (open drain power good output on Monitor One). |
#### Module Pin 21 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 21|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 22 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 22|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 23 (VIN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 23 | 23 |
| &nbsp; | Pin Name | VIN | VIN |
| ∆ | Description | Power input, 6 - 90 VDC | Power input, 6 - 12 VDC |
#### Module Pin 24 (VIN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 24 | 24 |
| &nbsp; | Pin Name | VIN | VIN |
| ∆ | Description | Power input, 6 - 90 VDC | Power input, 6 - 12 VDC |
#### Module Pin 25 (LI+)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 25|
| Pin Name | LI+|
| Description | Connect to Li-Po battery. Can power the device or be recharged by VIN or VBUS.|
#### Module Pin 26 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 26|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 27 (TSOM_USB_VBUS / VBUS)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 27 | 27 |
| ∆ | Pin Name | TSOM_USB_VBUS | VBUS |
| ∆ | Description | nRF52 USB power input. Can be used as a 5V power supply instead of VIN. | Power out from USB-C connector, 5 - 9 VDC |
#### Module Pin 28 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 28|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 29 (TSOM_VIN / VCC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 29 | 29 |
| ∆ | Pin Name | TSOM_VIN | VCC |
| ∆ | Description | Tracker SoM power input 5V-12V DC. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 30 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 30|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 31 (5V / PMIC_VIN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 31 | 31 |
| ∆ | Pin Name | 5V | PMIC_VIN |
| ∆ | Description | 5V power output when powered by VIN or USB | Power out 5 - 12 VDC, supplied by VIN or USB-C |
#### Module Pin 32 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 32|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 33 (TSOM_A0_SDA / D0)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 33 | 33 |
| ∆ | Pin Name | TSOM_A0_SDA | D0 |
| ∆ | Pin Alternate Name | D0 | n/a |
| ∆ | Description | Wire SDA | D0 GPIO, I2C SDA |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 34 (TSOM_A1_SCL / D1)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 34 | 34 |
| ∆ | Pin Name | TSOM_A1_SCL | D1 |
| ∆ | Pin Alternate Name | D1 | n/a |
| ∆ | Description | Wire SCL | D1 GPIO, I2C SCL |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 35 (TSOM_A2_BUTTON / D3)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 35 | 35 |
| ∆ | Pin Name | TSOM_A2_BUTTON | D3 |
| ∆ | Pin Alternate Name | D2 | n/a |
| ∆ | Description | External user button, A2 Analog in, GPIO D2, PWM | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, A3 must have the same frequency. | No |
| ∆ | UART serial | n/a | CTS. Use Serial1 object. |
| ∆ | SPI interface | n/a | SS. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 36 (TSOM_A3_BATT_TEMP / D2)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 36 | 36 |
| ∆ | Pin Name | TSOM_A3_BATT_TEMP | D2 |
| ∆ | Pin Alternate Name | D3 | n/a |
| ∆ | Description | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A2, A3 must have the same frequency. | No |
| ∆ | UART serial | n/a | RTS. Use Serial1 object. |
| ∆ | SPI interface | n/a | SCK. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 37 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 37|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 38 (CAN_N)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 38 | 38 |
| &nbsp; | Pin Name | CAN_N | CAN_N |
| ∆ | Description | CAN Data- or CANL | NC on Muon (CAN Data- or CANL on Monitor One) |
| ∆ | CAN interface | CAN_N | n/a |
#### Module Pin 39 (CAN_P)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 39 | 39 |
| &nbsp; | Pin Name | CAN_P | CAN_P |
| ∆ | Description | CAN Data+ or CANH | NC on Muon. (CAN Data+ or CANH on Monitor One) |
| ∆ | CAN interface | CAN_P | n/a |
#### Module Pin 40 (CAN_5V)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 40 | 40 |
| &nbsp; | Pin Name | CAN_5V | CAN_5V |
| ∆ | Description | 5V power out, 0.8A maximum. Can be controlled by software. | NC on Muon. (CAN_5V on Monitor One) |
| ∆ | CAN interface | CAN_5V | n/a |
#### Module Pin 41 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 41|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 42 (TSOM_USB_N / USBDATA-)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 42 | 42 |
| ∆ | Pin Name | TSOM_USB_N | USBDATA- |
| ∆ | Description | nRF52 MCU USB interface D-. | USB Data- |
| ∆ | Input is 5V Tolerant | n/a | Yes |
#### Module Pin 43 (TSOM_USB_P / USBDATA+)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 43 | 43 |
| ∆ | Pin Name | TSOM_USB_P | USBDATA+ |
| ∆ | Description | nRF52 MCU USB interface D+. | USB Data+ |
| ∆ | Input is 5V Tolerant | n/a | Yes |
#### Module Pin 44 (GND)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 45 (RX)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 45 | 45 |
| &nbsp; | Pin Name | RX | RX |
| ∆ | Pin Alternate Name | D9 | D10 |
| ∆ | Description | Serial1 RX, GPIO D9, PWM, Wire3 SDA | Serial RX, PWM, GPIO, SPI1 MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D8, D9 must have the same frequency. | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| ∆ | I2C interface | SDA. Use Wire3 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 46 (TX)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 46 | 46 |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D8 | D9 |
| ∆ | Description | Serial1 TX, GPIO D8, PWM, Wire3 SCL | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D8, D9 must have the same frequency. | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | I2C interface | SCL. Use Wire3 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 47 (RTC_BAT)
| | Unchanged between Monitor One Expansion and Muon Expansion |
| :--- | :--- |
| Pin Number | 47|
| Pin Name | RTC_BAT|
| Description | RTC/Watchdog battery +. Connect to GND if not using.|
#### Module Pin 48 (RTC_EXTI)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 48 | 48 |
| &nbsp; | Pin Name | RTC_EXTI | RTC_EXTI |
| ∆ | Description | RTC EXTI. Can use as a wake button. Has 100K weak pull-up to 3V3. | RTC EXTI. Can use as a wake button. Has 100K weak pull-up to RTC 3V3. |
#### Module Pin 49 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 49 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 50 (NC / A0)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 50 |
| ∆ | Pin Name | NC | A0 |
| ∆ | Pin Alternate Name | n/a | D19 |
| ∆ | Description | Leave unconnected | A0 Analog in, GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
#### Module Pin 51 (NC / A2)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 51 |
| ∆ | Pin Name | NC | A2 |
| ∆ | Pin Alternate Name | n/a | D17 |
| ∆ | Description | Leave unconnected | A2 Analog in, GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 22K |
#### Module Pin 52 (NC / A4)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 52 |
| ∆ | Pin Name | NC | A4 |
| ∆ | Pin Alternate Name | n/a | D15 |
| ∆ | Description | Leave unconnected | A4 Analog in, GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 2.1K |
#### Module Pin 53 (NC / A6)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 53 |
| ∆ | Pin Name | NC | A6 |
| ∆ | Pin Alternate Name | n/a | D29 |
| ∆ | Description | Leave unconnected | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 54 (NC / GND)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 54 |
| ∆ | Pin Name | NC | GND |
| ∆ | Description | Leave unconnected | Ground. |
#### Module Pin 55 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 55 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 56 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 56 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 57 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 57 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 58 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 58 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 59 (NC / D22)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 59 |
| ∆ | Pin Name | NC | D22 |
| ∆ | Description | Leave unconnected | D22 GPIO, PMIC_INT |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 60 (NC / D23)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 60 |
| ∆ | Pin Name | NC | D23 |
| ∆ | Description | Leave unconnected | D23 GPIO, RTC_INT |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 61 (NC / D4)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 61 |
| ∆ | Pin Name | NC | D4 |
| ∆ | Description | Leave unconnected | D4 GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 62 (NC / D5)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 62 |
| ∆ | Pin Name | NC | D5 |
| ∆ | Description | Leave unconnected | D5 GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 63 (NC / D6)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 63 |
| ∆ | Pin Name | NC | D6 |
| ∆ | Description | Leave unconnected | D6 GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 64 (NC / D7)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 64 |
| ∆ | Pin Name | NC | D7 |
| ∆ | Description | Leave unconnected | D7 GPIO, PWM |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 65 (NC / GND)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 65 |
| ∆ | Pin Name | NC | GND |
| ∆ | Description | Leave unconnected | Ground. |
#### Module Pin 66 (NC / 3V3)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 66 |
| ∆ | Pin Name | NC | 3V3 |
| ∆ | Description | Leave unconnected | 3.3V out. 700 mA for M-SoM and 500 mA available for peripheral devices. |
#### Module Pin 67 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 67 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 68 (NC)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 68 |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | Leave unconnected | n/a |
#### Module Pin 69 (NC / GND)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 69 |
| ∆ | Pin Name | NC | GND |
| ∆ | Description | Leave unconnected | Ground. |
#### Module Pin 70 (NC / GND)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 70 |
| ∆ | Pin Name | NC | GND |
| ∆ | Description | Leave unconnected | Ground. |
#### Module Pin 71 (NC / VIN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 71 |
| ∆ | Pin Name | NC | VIN |
| ∆ | Description | Leave unconnected | Power input, 6 - 12 VDC |
#### Module Pin 72 (NC / VIN)
|   |   | Monitor One Expansion | Muon Expansion |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | n/a | 72 |
| ∆ | Pin Name | NC | VIN |
| ∆ | Description | Leave unconnected | Power input, 6 - 12 VDC |


{{!-- END do not edit content above, it is automatically generated--}}

| Revision | Date       | Author | Comments |
|:---------|:-----------|:-------|:---------|
| pre      | 2024-03-10 | RK | Initial version |
