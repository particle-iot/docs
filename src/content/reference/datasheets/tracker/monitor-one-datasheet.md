---
title: Monitor One Datasheet
columns: two
layout: commonTwo.hbs
description: Monitor One Datasheet
---

# Monitor One Datasheet

{{#unless pdf-generation}}
{{!-- downloadButton url="/assets/pdfs/datasheets/monitor-one-datasheet.pdf" --}}
{{/unless}} {{!-- pdf-generation --}}

**Pre-release draft 2022-10-27 for review only. Do not distribute or share this URL!**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release datasheet and the contents are subject to change.
{{box op="end"}}

{{imageOverlay src="/assets/images/monitor-one/front-on-post.jpg" alt="Front view" class="full-width no-darken"}}

*The pictures in this preliminary datasheet are of a pre-release unit. The production units will be a different color, and may have other minor differences.*

The Monitor One is an off-the-shelf complete design, like the Tracker One. The Monitor One is in a larger IP67 waterproof enclosure with room inside for expansion cards and additional connectors, allowing it to be used in more custom scenarios than the Tracker One.

- **Ready to go** with IP67-rated enclosure.
- **Flexible power supply** to easily add asset tracking to most devices with a 6 - 90 VDC power input.
- **Internal or external antennas** for cellular and GNSS.
- **Temperature sensors** within the enclosure, and also a battery pack temperature sensor.
- **Expansion cards** allow for custom features.
- **RGB LEDs** for system status, and two user RGB LEDs for your own use, visible from outside the enclosure.
- **User button**, waterproof and accessible from outside the enclosure.


## Block diagram

{{imageOverlay src="/assets/images/monitor-one/block-diagram2.png" alt="Block diagram" class="full-width"}}

Details about the Tracker SoM that is contained within the Monitor One can be found in the [Tracker SoM Datasheet](/reference/datasheets/tracker/tracker-som-datasheet/).

## External features

{{imageOverlay src="/assets/images/monitor-one/post-corner-labeled.png" alt="External features" class="full-width"}}


| Label | Feature |
| :---: | :--- |
|  1 | System RGB LED |
|  2 | GNSS antenna (internal) |
|  3 | Cellular antenna (internal) |
|  4 | External connectors (on bottom) |
|  5 | Magnetic or bolt-down mounting bracket |
|  6 | User RGB LEDs (2) |
|  7 | User button (externally accessible) |
|  8 | Wi-Fi geolocation antenna (internal) |

### User button

A waterproof button is available from the outside of the enclosure.

- Long press (10 seconds) resets the device (as if the RESET button was pressed)
- Shorter press and multiple press can be handled by your user firmware for your own features

### User LEDs (2)

- There are two small RGB LEDs visible from the outside on the side of the unit, next to the user button.
- You can program custom colors, blinking, and fade effects for each LED from your user firmware.
- LEDs are controlled by a ADP8866 I2C LED controller.


### Connectors

{{imageOverlay src="/assets/images/monitor-one/bottom-connectors-labeled.png" alt="Bottom Connectors" class="full-width"}}


The bottom plate of the Monitor One can be customized with different connectors for your application.

| Label | Feature |
| :---: | :--- |
|  1 | Cellular antenna (SMA) |
|  2 | M12 connector (8-pin) |
|  3 | M12 connector (4-pin) |
|  4 | GNSS antenna (SMA) |
|  5 | Mounting plate attachment screw |

By default the Monitor One uses the internal cellular and GNSS antennas, but can be switched to using the external connectors inside the enclosure.

## Mounting

The Monitor One is intended to be mounted in the orientation shown at the top of the page, with the connectors facing down. You can also mount it with the mounting plate facing down as the GNSS antenna is angled to allow it to work in either orientation.

When using external cellular and GNSS antennas you can orient the Monitor One in any direction.

The mounting plate contains two magnets that allow it to be easily mounted on a metal surface, or to a metal plate affixed to a non-metal surface, such as the wood post shown above.

{{imageOverlay src="/assets/images/monitor-one/back-view.jpg" alt="Back View" class="full-width"}}

The mounting plate is removable from the back of the unit after removing the screw on the bottom, near the expansion connectors.

Once removed, you can screw or bolt the mounting plate to a surface and reattach the Monitor One. This is good for rough conditions and to help prevent theft.


| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Top, width between mounting holes | 28 mm | 1 3/32" |
| Bottom, width between mounting holes | 46 mm | 1 13/16" |
| Height between mounting holes | 140 mm | 5 1/2" |

{{imageOverlay src="/assets/images/monitor-one/bracket-dim.png" alt="Mounting bracket holes" class="full-width"}}

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Bolt/screw head hole diameter | 12.46 mm | 31/64" |
| Bolt/screw head maximum height | 4.0 mm | 5/32" |
| Bolt/screw hole diameter | 4.33 mm | 11/64" |
| Bolt/screw shaft to surface | 3.65 mm | 9/64" |
| Recommended bolt | M4 | #8 |


{{imageOverlay src="/assets/images/monitor-one/hole-dim.png" alt="Mounting bracket screw hole dimensions" class="full-width"}}


## Internal features

{{imageOverlay src="/assets/images/monitor-one/base-board-labeled.png" alt="Base board features" class="full-width"}}

| Label | Feature |
| :---: | :--- |
|  1 | MCU USB Connector (Micro B) |
|  2 | User RGB LEDs (2, externally visible) |
|  3 | User Button (externally accessible) |
|  4 | System RGB LED (externally visible) |
|  5 | GNSS antenna (internal, optional) | 
|  6 | GNSS antenna U.FL connector |
|  7 | Cellular antenna (internal) |
|  8 | Cellular antenna U.FL connector |
|  9 | Expansion card headers (2) |
| 10 | SWD debugging connector |
| 11 | Wi-Fi geolocation antenna U.FL connector |
| 12 | MODE and SETUP buttons |
| 13 | VIN connector |
| 14 | Expansion card to external connector cable |
| 15 | LiPo battery connector |
| 16 | Cellular antenna SMA connector (external) |
| 17 | Expansion card external connector #1 (M12, 8-pin) |
| 18 | Expansion card external connector #2 (M12) |
| 19 | GNSS antenna SMA connector (external) |
| 20 | Tracker SoM module |
| 21 | Wi-Fi geolocation antenna (internal, not pictured) |


## Expansion card interface

Tracker M is designed with easy-to-use expansion headers and an enclosure with sufficient space inside for an expansion card, and for additional expansion connector through the wall of enclosure.

- Expansion card size: 50mm x 90mm (approximately 2" x 3.5")
- Connectors: 24-pin 0.1" headers (two, one on each long side)
- Male header pins on the bottom of expansion card
- Attachment: 4 screws to standoffs (M3 screw recommended)

Pre-built expansion cards will be available, including a prototyping breadboard expansion card. You can also design and fabricate your own.


{{imageOverlay src="/assets/images/monitor-one-expansion.svg" alt="Expansion card pinout" class="full-width"}}

### Expansion card dimensions

{{imageOverlay src="/assets/images/monitor-one/expansion-dim.png" alt="Expansion card dimensions" class="full-width"}}

### Expansion card location

{{imageOverlay src="/assets/images/monitor-one/expansion-board-labeled.png" alt="Expansion card location" class="full-width"}}

| Label | Feature |
| :---: | :--- |
| 14 | Expansion card to external connector cable (M8 to PHR8) |
| 17 | Expansion card external connector #1 (M12, 8-pin) |
| 22 | Location of expansion card (green outline) |

The enclosure typically has a panel-mount M12 8 pin female connector in location 17 in the picture above. This is connected via a short cable to a PHR-8 female connector that attaches to your expansion card. The picture above shows the cable but a board is not installed in the picture.

The functions of the pins on the M12 8-pin connector are dependent on your base board, but the following pinouts are recommended:

| Conn P1 (M12) | Conn P2 (PHR-8) | Function | 
| :---: | :---: | :--- |
| 1 | 8 | |
| 2 | 1 | VIN |
| 3 | 3 | CAN_P |
| 4 | 4 | CAN_N |
| 5 | 5 |  |
| 6 | 6 |  |
| 7 | 7 |  |
| 8 | 2 | Ground |
| Round | Rectangular | |
| Enclosure | Expansion Card | |

{{imageOverlay src="/assets/images/monitor-one/m8-phr8-cable.png" alt="M8 to PHR-8 cable" class="full-width"}}

Note: wire color may vary from this graphic.

- Cable length: 75mm
- Wire gauge: 24 AWG

### GPIO

{{!-- BEGIN do not edit content below, it is automatically generated 9b3cae8d-ceee-4ec3-b8f3-d281501feb5e --}}

| Pin Name | Description | SoM Pin | MCU |
| :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | 38 | P0.05 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | 39 | P0.04 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | 41 | P0.29 |
| TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | 57 | P0.28 |
| TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | 58 | P0.30 |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | 71 | P0.08 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, pins A0 and A1 are used in I2C mode by the user RGB LED temperature sensor. Pins A0 and A1 cannot be used as GPIO.
- On the Monitor One, you should not use A2 and A3 as GPIO or analog inputs as they are used by the external user button and battery temperature thermistor.
- All GPIO are 3.3V and are not 5V tolerant.

### ADC

{{!-- BEGIN do not edit content below, it is automatically generated 7dcbd294-4979-41bf-8e70-252fdb227e06 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | ADC3 | 38 | P0.05 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | ADC2 | 39 | P0.04 |
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
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | SPI (SCK) | 39 | P0.04 |
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
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | Wire3 (SDA) | 71 | P0.08 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | Wire3 (SCL) | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, pins A0 and A1 are used in I2C mode by the user RGB LED and temperature sensor. Pins A0 and A1 cannot be used as GPIO.
- On the Monitor One (and Tracker SoM), `Wire` and `Wire3` are two different I2C peripherals and can be used at the same time.
- On the Monitor One (and Tracker SoM), `Wire3` and `Serial1` share the same pins and only one can be used at a time.
- I2C is 3.3V only and is not 5V tolerant.
- There are 4.7K pull-up resistors on `TSOM_A0_SDA` and `TSOM_A1_SCL` to 3.3V on the base board.

### Serial (UART)

{{!-- BEGIN do not edit content below, it is automatically generated 4ab733fc-0cd1-4ad5-a55e-1d986eab4205 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | Serial1 RX | 71 | P0.08 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | Serial1 TX | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One (and Tracker SoM), `Wire3` and `Serial1` share the same pins and only one can be used at a time.
- Hardware flow control is not available on the Monitor One.
- Serial pins are 3.3V only and are not 5V tolerant. 
- Additional interface chips are required for other serial standards such as RS232 and RS485.

### PWM

{{!-- BEGIN do not edit content below, it is automatically generated 010c5e58-e69f-468f-9d6c-3c7c6df851b5 --}}

| Pin Name | Description | Interface | SoM Pin | MCU |
| :--- | :--- | :--- | :--- | :--- |
| TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | PWM1 | 38 | P0.05 |
| TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | PWM1 | 39 | P0.04 |
| TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | PWM1 | 40 | P0.29 |
| TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | PWM1 | 41 | P0.29 |
| TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | PWM0 | 57 | P0.28 |
| TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | PWM0 | 58 | P0.30 |
| RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | PWM2 | 71 | P0.08 |
| TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | PWM2 | 72 | P0.06 |


{{!-- END do not edit content above, it is automatically generated --}}

- On the Monitor One, you should not use A2 and A3 as PWM outputs as they are used by the external user button and battery temperature thermistor.
- All pins on the same hardware timer (PWM0, PWM1, or PWM2) must share the same frequency but can have different duty cycles.


### CAN

{{!-- BEGIN do not edit content below, it is automatically generated a3c5f7f2-c933-4f71-9936-6373090a5d7e --}}

| Pin Name | Description | Interface | SoM Pin |
| :--- | :--- | :--- | :--- |
| CAN_N | CAN Data- or CANL | CAN_N | 64 |
| CAN_P | CAN Data+ or CANH | CAN_P | 65 |
| CAN_5V | 5V power out, 0.8A maximum. Can be controlled by software. | CAN_5V | 66 |


{{!-- END do not edit content above, it is automatically generated --}}

The CAN transceiver is included on the Tracker SoM. However if you implement CAN on your expansion card, you will probably want to add protection circuitry. This circuit is present on the Monitor One CAN expansion card and also on the Tracker One.

{{imageOverlay src="/assets/images/monitor-one/can-schematic.png" alt="CAN schematic" class="full-width"}}

Note that the two 60.4 ohm resistors are DNP (do not populate). If populated, these provide the 120 ohm CAN termination, if you need it in your design.

### All expansion card pins

{{!-- BEGIN do not edit content below, it is automatically generated eb58b0f8-264c-4d09-8a26-d653ddc84b5a --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 1 | GNSS_PULSE | GNSS time pulse output. Can be used for a GPS fix LED. | &nbsp; |
| 2 | NC | &nbsp; | &nbsp; |
| 3 | NC | &nbsp; | &nbsp; |
| 4 | NC | &nbsp; | &nbsp; |
| 5 | NC | &nbsp; | &nbsp; |
| 6 | NC | &nbsp; | &nbsp; |
| 7 | NC | &nbsp; | &nbsp; |
| 8 | NC | &nbsp; | &nbsp; |
| 9 | NFC2_VIN_EN | VIN enable | P0.10 |
| 10 | NFC1_PERIPH_INT | Peripheral interrupt (active low) | P0.09 |
| 11 | TSOM_MODE | MODE button (active low) | P1.13 |
| 12 | TSOM_RESET | RESET button (active low) | P0.08 |
| 13 | TSOM_A7 / D7 | A7 Analog in, GPIO D7, PWM, SPI SS, WKP | P0.05 |
| 14 | TSOM_A6 / D6 | A6 Analog in, GPIO D6, PWM, SPI (SCK) | P0.04 |
| 15 | TSOM_A5 / D5 | A5 Analog in, GPIO D5, PWM, SPI MISO | P0.29 |
| 16 | TSOM_A4 / D4 | A4 Analog in, GPIO D4, PWM, SPI MOSI | P0.29 |
| 17 | GND | Ground. | &nbsp; |
| 18 | 3V3 | 3.3V out, 1000 mA maximum including nRF52 and other peripherals. | &nbsp; |
| 19 | RUN | Pull low to disable LTC7103 regulator. Has 100K pull-up to VIN. | &nbsp; |
| 20 | PGOOD | LTC7103 regulator open drain power good output. Pulled low when regulator is not in regulation. | &nbsp; |
| 21 | GND | Ground. | &nbsp; |
| 22 | GND | Ground. | &nbsp; |
| 23 | VIN | Power input, 6 - 90 VDC | &nbsp; |
| 24 | VIN | Power input, 6 - 90 VDC | &nbsp; |
| 25 | LI+ | Connect to Li-Po battery. Can power the device or be recharged by VIN or VBUS. | &nbsp; |
| 26 | GND | Ground. | &nbsp; |
| 27 | TSOM_USB_VBUS | nRF52 USB power input. Can be used as a 5V power supply instead of VIN. | &nbsp; |
| 28 | GND | Ground. | &nbsp; |
| 29 | TSOM_VIN | Tracker SoM power input 5V-12V DC. | &nbsp; |
| 30 | GND | Ground. | &nbsp; |
| 31 | 5V | 5V power output when powered by VIN or USB | &nbsp; |
| 32 | GND | Ground. | &nbsp; |
| 33 | TSOM_A0_SDA / D0 | Wire SDA | P0.03 |
| 34 | TSOM_A1_SCL / D1 | Wire SCL | P0.02 |
| 35 | TSOM_A2_BUTTON / D2 | External user button, A2 Analog in, GPIO D2, PWM | P0.28 |
| 36 | TSOM_A3_BATT_TEMP / D3 | Battery temperature sensor, A3 Analog in, GPIO D3, PWM | P0.30 |
| 37 | GND | Ground. | &nbsp; |
| 38 | CAN_N | CAN Data- or CANL | &nbsp; |
| 39 | CAN_P | CAN Data+ or CANH | &nbsp; |
| 40 | CAN_5V | 5V power out, 0.8A maximum. Can be controlled by software. | &nbsp; |
| 41 | GND | Ground. | &nbsp; |
| 42 | TSOM_USB_N | nRF52 MCU USB interface D-. | &nbsp; |
| 43 | TSOM_USB_P | nRF52 MCU USB interface D+. | &nbsp; |
| 44 | GND | Ground. | &nbsp; |
| 45 | RX / D9 | Serial1 RX, GPIO D9, PWM, Wire3 SDA | P0.08 |
| 46 | TX / D8 | Serial1 TX, GPIO D8, PWM, Wire3 SCL | P0.06 |
| 47 | RTC_BAT | RTC/Watchdog battery +. Connect to GND if not using. | &nbsp; |
| 48 | RTC_EXTI | RTC EXTI. Can use as a wake button. Has 100K weak pull-up to 3V3. | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### I/O Characteristics

The GPIO pins on the expansion connector have the following specifications, from the nRF52840 datasheet:

| Symbol | Parameter | Min | Typ | Max | Unit |
| :---------|:-------|:---:|:---:|:---:|:---: |
| VIH | Input high voltage | 0.7 xVDD |  | VDD | V |
| VIL | Input low voltage | VSS |  | 0.3 xVDD | V | 
| VOH,SD | Output high voltage, standard drive, 0.5 mA, VDD ≥1.7 | VDD - 0.4 |  | VDD | V | 
| VOH,HDH | Output high voltage, high drive, 5 mA, VDD >= 2.7 V | VDD - 0.4 |  | VDD | V | 
| VOH,HDL | Output high voltage, high drive, 3 mA, VDD >= 1.7 V  | VDD - 0.4 |  | VDD | V | 
| VOL,SD | Output low voltage, standard drive, 0.5 mA, VDD ≥1.7 | VSS |  | VSS + 0.4 | V | 
| VOL,HDH | Output low voltage, high drive, 5 mA, VDD >= 2.7 V | VSS |  | VSS + 0.4 | V | 
| VOL,HDL | Output low voltage, high drive,3 mA, VDD >= 1.7 V | VSS  |  | VSS + 0.4 | V |  
| IOL,SD | Current at VSS+0.4 V, output set low, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOL,HDH | Current at VSS+0.4 V, output set low, high drive, VDD >= 2.7V | 6 | 10 | 15 | mA | 
| IOL,HDL | Current at VSS+0.4 V, output set low, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| IOH,SD | Current at VDD-0.4 V, output set high, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOH,HDH | Current at VDD-0.4 V, output set high, high drive, VDD >= 2.7V | 6 | 9 | 14 | mA | 
| IOH,HDL | Current at VDD-0.4 V, output set high, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| RPU | Pull-up resistance | 11 | 13 | 16 | kΩ | 
| RPD | Pull-down resistance | 11 | 13 | 16 | kΩ | 

- GPIO default to standard drive (2mA) but can be reconfigured to high drive (9mA) in Device OS 2.0.0 and later using the [`pinSetDriveStrength()`](/reference/device-os/api/input-output/pinsetdrivestrength/) function.

### GPIO and port leakage current warning

Be careful when you are connecting GPIO or ports such as serial that may have power when the Monitor One is not powered, such as when using shipping mode.

If you have current flowing into GPIO or ports of the nRF52840 when it is powered down, it can cause it to enter a state where it cannot be reawaked without removing all power from it, including the internal LiPo battery. This may be difficult if you've sealed your Monitor One enclosure.

The Tracker One has a [TI TS3A5018 Quad SPDT Analog Switch](/assets/datasheets/ts3a5018.pdf) on the three GPIO pins (A3, D9/RX/SDA, D8/TX/SCL) to prevent this. The switch is normally open, and is closed when the `CAN_5V` is powered. By default, Tracker Edge enables `CAN_5V` when in normal operating mode and turns it off during sleep, however this behavior can be changed by using `enableIoCanPower()` and `enableIoCanPowerSleep()` in the `TrackerConfiguration` object.

The Tracker One circuit looks like this, and you may want to implement something similar if you are in a scenario where you have externally powered peripherals.

{{imageOverlay src="/assets/images/tracker/tracker-io-schematic.png" alt="CAN Protection Circuitry" class="full-width"}}


This is not necessary if your external peripherals are powered by 3V3 or CAN_5V.

### GPIO and Ports vs. Tracker One

| Pin   | Monitor One | Tracker One |
| :---: | :---: | :---: |
| A0    | I2C SDA<sup>1</sup> | Internal Thermistor |
| A1    | I2C SCL<sup>1</sup> | User Button (not accessible) |
| A2    | External Button | GNSS lock indicator |
| A3    | Battery Temperature | M8 Analog in, GPIO |
| A4    | Analog in, GPIO, PWM, SPI MOSI<sup>1</sup> | Not available |
| A5    | Analog in, GPIO, PWM, SPI MISO<sup>1</sup> | Not available |
| A6    | Analog in, GPIO, PWM, SPI SCK<sup>1</sup> | Not available |
| A7    | Analog in, GPIO, PWM, SPI SS, WKP | Not available |
| TX    | MCU serial TX, GPIO D8, Wire3 SCL<sup>1</sup> | MCU serial TX, GPIO D8, Wire3 SCL |
| RX    | MCU serial RX, GPIO D9, Wire3 SDA<sup>1</sup> | MCU serial RX, GPIO D9, Wire3 SDA |

<sup>1</sup>Available on expansion card connector (internal)

- On the Monitor One, the expansion card connector allows the use the I2C, Serial, and SPI at the same time
- On the Tracker One, you must choose between using the M8 for either serial or I2C. SPI is not available.


## Tracker feature comparison


{{!-- BEGIN shared-blurb 742666de-f91d-45c6-b17c-915bac5f5ea6 --}}

| | Tracker SoM | Tracker M | Tracker One | Monitor One |
| :--- | :---: | :---: | :---: | :---: |
| Style | SMD Module | Module | All-in-one | All-in-one |
| Enclosure | Your design | Your design | Included | Included |
| MCU | nRF52840 | RTL8721DM | nRF52840 | nRF52840 |
| CPU Speed | 60 MHz | 200 MHz | 64 MHz | 64 MHz |
| Maximum user binary | 256 KB | 2 MB | 256 KB | 256 KB |
| Flash file system<sup>6</sup> | 4 MB | 2 MB | 4 MB | 4 MB |
| Base board | Your design | Included | Included | Included |
| Expansion connector | Your design | 8-pin | M8 8-pin | Multiple options |
| GNSS Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| Cellular Antenna | Your design | Int/Ext<sup>2</sup> | Internal | Int/Ext<sup>2</sup> |
| Wi-Fi geolocation antenna | Your design | Int/Ext<sup>5</sup> | Internal | Internal |
| BLE Antenna | Your design | Int/Ext<sup>5</sup>  | Internal | Internal<sup>4</sup> |
| NFC Tag | Your design | n/a | Included | n/a |
| USB Connector | Your design | Micro B | USB C | Micro B (Int)<sup>3</sup> |
| System RGB LED | Your design | Included | Included | Included |
| External user button | n/a | n/a | | &check; |
| User RGB LEDs | | | | 2 |
| SETUP and MODE buttons | Your design | On board | Inside Enclosure | Inside Enclosure |
| External power | 3.9 - 17 VDC | 6 - 90 VDC | 6 - 30 VDC | 6 - 90 VDC |
| SPI | &check; | Expansion card | n/a | Expansion card |
| I2C | &check; | Expansion card | M8 | Expansion card |
| Serial | &check; | Expansion card | M8 | Expansion card |
| Internal temperature sensor | Your design | &check; | &check; | &check; |
| Battery temperature sensor | n/a | &check; | n/a | &check; |
| Controlling charging by temperature | Your design | In hardware | In software | In software |

<sup>1</sup>On the Tracker One, the M8 can be configured for GPIO, I2C (SDA and SCL), or Serial (RX and TX) on two pins.

<sup>2</sup>Both internal and external GNSS and cellular are supported by physically changing the antenna connector inside the enclosure.

<sup>3</sup>There is no external MCU USB connector on the Monitor One.

<sup>4</sup>The Monitor One uses the Tracker SoM BLE chip antenna on the board and does not include a separate BLE antenna, but one could be added using the BLE U.FL connector.

<sup>5</sup>The Tracker M uses a shared antenna for BLE and Wi-Fi geolocation. You can use the built-in trace antenna or an external 2.4 GHz/5 GHz dual-band antenna, selectable in software.

<sup>6</sup>A small portion of the flash file system is used by the system, and a configurable portion can be used for store and forward, to optionally allow location publishes to be saved when the device is offline to be uploaded later. The remainder of the flash file system can be used by user applications.

{{!-- END shared-blurb --}}



## Mechanical specifications

### Operating Temperature

To be provided at a later date.


### Dimensions and weight

| Dimensions | Metric | SAE      |
| :--------- | -----: |  ------: |
| Width      | 121 mm |   4 3/4" |
| Height     | 220 mm |   8 5/8" |
| Depth      |  69 mm | 2 11/16" |
| Weight     | 775 g  |  27.3 oz |

{{imageOverlay src="/assets/images/monitor-one/front-dim.png" alt="Dimensions" class="full-width"}}

{{imageOverlay src="/assets/images/monitor-one/side-dim.png" alt="Dimensions" class="full-width"}}

### Power consumption

To be provided at a later date.


## Country compatibility

To be provided at a later date.


---

## Ordering Information

To be provided at a later date.



---

## Certification

To be provided at a later date.


## Product Handling

### ESD Precautions

The Monitor One contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the module!

### Battery Warning

**CAUTION**

RISK OF EXPLOSION IF BATTERY IS REPLACED BY AN INCORRECT TYPE.
DISPOSE OF USED BATTERIES ACCORDING TO THE INSTRUCTIONS.

### Disposal

![WEEE](/assets/images/weee.png)

This device must be treated as Waste Electrical & Electronic Equipment (WEEE) when disposed of.

Any WEEE marked waste products must not be mixed with general household waste, but kept separate for the treatment, recovery and recycling of the materials used. For proper treatment, recovery and recycling; please take all WEEE marked waste to your Local Authority Civic waste site, where it will be accepted free of charge. If all consumers dispose of Waste Electrical & Electronic Equipment correctly, they will be helping to save valuable resources and preventing any potential negative effects upon human health and the environment of any hazardous materials that the waste may contain.


## Revision history

| Date | Author | Comments |
|:-----|:-------|:---------|
| 2022-10-24 | RK | For internal review only |
