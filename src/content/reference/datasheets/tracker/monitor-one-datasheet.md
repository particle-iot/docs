---
title: Monitor One Datasheet
columns: two
layout: commonTwo.hbs
description: Monitor One Datasheet
---

# Monitor One Datasheet

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/monitor-one-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

**Preliminary pre-release version 2022-10-19**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release datasheet and the contents are subject to change.
{{box op="end"}}



| | Tracker SoM | Tracker M | Tracker One | Monitor One |
| :--- | :---: | :---: | :---: | :---: |
| Style | SMD Module | Module | All-in-one | All-in-one |
| Enclosure | - | - | Included | Included |
| MCU | nRF52840 | RTL8721DM | nRF52840 | nRF52840 |
| Base board | Your design | Included | Included | Included |
| Expansion connector | Your design | 8-pin | M8 8-pin | Multiple options |
| GNSS Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| Cellular Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| USB Connector | Your design | Micro B | USB C | USB C |
| System RGB LED | Your design | Included | Included | Included |
| SETUP and MODE buttons | Your design | On board | Inside Enclosure | Inside Enclosure |
| External power | 3.9 - 17 VDC | 6 - 90 VDC | 6 - 30 VDC | 6 - 90 VDC |
| SPI | &check; | ??? | | Expansion card |
| I2C | &check; | ??? | M8 | Expansion card |
| Serial | &check; | ??? | M8 | Expansion card |
| External user button | n/a | n/a | | &check; |
| User RGB LEDs | | | | 2 |
| Temperature sensor | Your design | &check; | &check; | &check; |
| Battery temperature sensor | n/a | ??? | n/a | &check; |
| Controlling charging by temperature | Your design | ??? | In software | In hardware |

<sup>1</sup>On the Tracker One, the M8 can be configured for GPIO, I2C (SDA and SCL), or Serial (RX and TX) on two pins.

<sup>2</sup>Both internal and external GNSS and cellular antennas are supported, however the antenna style must be decided in advance as there in no software antenna switch.


## Internal connectors

- LiPo Battery connector (3-pin JST-PH, for battery with thermistor
- MCU USB (Micro B, vertical)
- User LED 1 and User LED 2
- User Button (externally accessible)
- RGB Status LED
- GNSS Antenna (internal) 
- GNSS Antenna connector U.FL
- Cellular antenna
- Cellular antenna connector U.FL
- SWD debugging connector
- VIN connector (JST-PH, 2 pin)
- Expansion card area


## External Features

### User Button

A waterproof button is available from the outside of the enclosure.

- Long press (10 seconds) resets the device (as if the RESET button was pressed)
- Shorter press and multiple press can be handled by your user firmware for your own features

### User LEDs (2)

- There are two small RGB LEDs visible from the outside on the side of the unit, next to the user button.
- You can program custom colors, blinking, and fade effects for each LED from your user firmware.
- LEDs are controlled by a ADP8866 I2C LED controller.


### Connectors

The bottom plate of the Monitor One can be customized. 

- M12 connectors (2)
- GNSS antenna (SMA)
- Cellular antenna (SMA)



## Expansion card interface

Unlike the Tracker One, the Tracker M is designed for expansion, with easy-to-use expansion headers and an enclosure with sufficient space inside for an expansion card, and for additional expansion connector through the wall of enclosure.

- Expansion card size: 2" x 3.5"
- Connector: 24-pin 0.1" headers (two, one on each long side)
- Male header pins on the bottom of expansion card
- Attachment: 4 screw holes to standoffs

Pre-built expansion cards will be available, including a prototyping breadboard expansion card. You can also design and fabricate your own.


{{imageOverlay src="/assets/images/monitor-one-expansion.svg" alt="Expansion card pinout" class="full-width"}}


### GPIO

{{!-- BEGIN do not edit content below, it is automatically generated 9b3cae8d-ceee-4ec3-b8f3-d281501feb5e --}}

| Pin Name | Description | SoM Pin | MCU |
| :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | 38 | P0.5 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | 39 | P0.4 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | 41 | P0.29 |
| TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | 57 | P0.28 |
| TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | 58 | P0.30 |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | 71 | P0.8 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, pins A0 and A1 are used in I2C mode by the user RGB LED temperature sensor. Pins A0 and A1 cannot be used as GPIO.
- On the Monitor One, you should not use A2 and A3 as GPIO or analog inputs as they are used by the external user button and battery temperature thermistor.

### ADC

{{!-- BEGIN do not edit content below, it is automatically generated 7dcbd294-4979-41bf-8e70-252fdb227e06 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | ADC3 | 38 | P0.5 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | ADC2 | 39 | P0.4 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | ADC5 | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | ADC7 | 41 | P0.29 |
| TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | ADC4 | 57 | P0.28 |
| TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | ADC6 | 58 | P0.30 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, you should not use A2 and A3 as analog inputs as they are used by the external user button and battery temperature thermistor.


### SPI

{{!-- BEGIN do not edit content below, it is automatically generated 291a5a48-7c53-4243-b1d5-db4fa8a8b7ff --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | SPI (SCK) | 39 | P0.4 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | SPI (MISO) | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | SPI (MOSI) | 41 | P0.29 |


{{!-- END do not edit content above, it is automatically generated --}}

- Any available GPIO can be used as a SPI CS/SS pin.

### I2C

{{!-- BEGIN do not edit content below, it is automatically generated d8395668-3997-4528-9701-303a37ea1a6e --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A0_SDA / D0 | Wire SDA | Wire (SDA) | 55 | P0.03 |
| TSOM_A1_SCL / D1 | Wire SCL | Wire (SCL) | 56 | P0.02 |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | Wire3 (SDA) | 71 | P0.8 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | Wire3 (SCL) | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, pins A0 and A1 are used in I2C mode by the user RGB LED temperature sensor. Pins A0 and A1 cannot be used as GPIO.
    - On the Monitor One (and Tracker SoM), `Wire` and `Wire3` are two different I2C peripherals and can be used at the same time.
- On the Monitor One (and Tracker SoM), `Wire3` and `Serial1` share the same pins and only one can be used at a time.

### Serial (UART)

{{!-- BEGIN do not edit content below, it is automatically generated 4ab733fc-0cd1-4ad5-a55e-1d986eab4205 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | Serial1 RX | 71 | P0.8 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | Serial1 TX | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One (and Tracker SoM), `Wire3` and `Serial1` share the same pins and only one can be used at a time.

### PWM

{{!-- BEGIN do not edit content below, it is automatically generated 010c5e58-e69f-468f-9d6c-3c7c6df851b5 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | PWM1 | 38 | P0.5 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | PWM1 | 39 | P0.4 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | PWM1 | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | PWM1 | 41 | P0.29 |
| TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | PWM0 | 57 | P0.28 |
| TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | PWM0 | 58 | P0.30 |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | PWM2 | 71 | P0.8 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | PWM2 | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, you should not use A2 and A3 as PWM outputs as they are used by the external user button and battery temperature thermistor.
- All pins on the same hardware timer (PWM0, PWM1, or PWM2) must share the same frequency but can have different duty cycles.

### M12 8-pin expansion connector

One recommended option for connecting your Monitor One to external devices is using 

M12 8-pin female, panel mount connector to B8B-PH female



## Monitor One vs. Tracker One 

### External connectors



### GPIO Pins

| Pin   | Monitor One | Tracker One |
| :---: | :---: | :---: |
| A0    | I2C SDA<sup>1</sup | Internal Thermistor |
| A1    | I2C SCL<sup>1</sup | User Button (not accessible) |
| A2    | External Button | GNSS lock indicator |
| A3    | Battery Temperature | M8 Analog in, GPIO |
| A4    | Analog in, GPIO, PWM, SPI MOSI<sup>1</sup> | Not available |
| A5    | Analog in, GPIO, PWM, SPI
 MISO<sup>1</sup> | Not available |
| A6    | Analog in, GPIO, PWM, SPI SCK<sup>1</sup> | Not available |
| A7    | Analog in, GPIO, PWM, SPI SS, WKP | Not available |
| TX    | Serial TX or GPIO<sup>1</sup> | MCU serial TX, GPIO D8, Wire3 SCL |
| RX    | Serial RX or GPIO<sup>1</sup> | MCU serial RX, GPIO D9, Wire3 SDA |

<sup>1</sup>Available on expansion card connector (internal)

- On the Monitor One, the expansion card connector allows the use the I2C, Serial, and SPI at the same time
- On the Tracker One, you must choose between using the M8 for either serial or I2C. SPI is not available.
