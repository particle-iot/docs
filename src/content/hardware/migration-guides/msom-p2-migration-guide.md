---
title: M SoM from P2 migration guide
columns: two
layout: commonTwo.hbs
description: M SoM from P2 migration guide
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and changes may occur prior to release.
{{box op="end"}}


{{migration-guide leftImg="/assets/images/p2-rendering.png" rightImg="/assets/images/m-series/msom-top.png"}}

<p class="attribution">Pictures are not the same scale</p>

The P2 module is a Wi-Fi SMD module that is mounted directly to your custom base board, while the M SoM is a M.2 SoM that fits in a M.2 socket on your base board and has both cellular and Wi-Fi capabilities. The M SoM module is larger and will not fit in the same footprint as the P2.

However, since the P2 has a Realtek RTL8721DM processor and the M SoM has a Realtek RTL8722DM which is substantially similar, only having more GPIO, the migration should be relatively straightforward.

### Datasheets

- [M SoM datasheet](/reference/datasheets/m-series/msom-datasheet/)
- [P2 datasheet](/reference/datasheets/wi-fi/p2-datasheet/)
- [B Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)

## Certification

When migrating to a new device, recertification is typically required. If you are using the standard Particle antennas 
you often only need to complete the less expensive unintentional radiator testing of your completed assembly, however 
in some cases intentional radiator testing could be required.

## Hardware

### Antenna

The P2 has a choice between an internal trace antenna on the module or an external antenna for Wi-Fi and BLE (shared) connected by a U.FL connector.

The M SoM requires an external antenna for cellular. It also requires a separate external antenna for Wi-Fi and BLE (shared). All antennas are connected by U.FL connectors.

### Voltage regulators

#### VCC

VCC is used to supply power to the cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting.

The P2 does not require this voltage.

#### 3V3

3V3 is used to supply power to MCU, Wi-Fi, BLE, logic ICs, memory, etc.. Make sure that the supply can handle a minimum of 500 mA. 

These limits do not include any 3.3V peripherals on your base board, so that may increase the current requirements.

{{!-- BEGIN shared-blurb b7c36aca-bdfe-463c-b901-53a3aeec8ab0 --}}
Power supply requirements:
- 3.3V output
- Maximum 5% voltage drop
- 100 mV peak-to-peak ripple maximum
- 500 mA minimum output current at 3.3V recommended for future compatibility
- Maintain these values at no-load as well as maximum load
{{!-- END shared-blurb --}}

### Land pattern

The land pattern for the M.2 connector on the M SoM is:

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

The P2 land pattern is:

{{imageOverlay src="/assets/images/p1-land-pattern.png" alt="P2 Land Pattern" class="full-width"}}


### ADC

{{!-- BEGIN do not edit content below, it is automatically generated 198f100b-a9d2-40c0-bfad-c835be7dcf6c --}}

| P2 Pin Name | P2 ADC | M SoM Pin | M SoM Pin Name | M SoM ADC |
| :--- | :--- | :---: | :--- | :--- |
| A0 / D11 | &check; | 23 | A0 / D19 | &check; |
| A1 / D12 | &check; | 33 | A1 / D18 | &check; |
| A2 / D13 | &check; | 35 | A2 / D17 | &check; |
| A5 / D14 | &check; | 43 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 53 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 45 | A6 / D29 | &check; |
| &nbsp; | &nbsp; | 47 | A7 / WKP | &check; |
| D0 / A3 | &check; | 22 | D0 | &nbsp; |
| D1 / A4 | &check; | 20 | D1 | &nbsp; |
| S0 / D15 | &nbsp; | 41 | A4 / D15 | &check; |
| S1 / D16 | &nbsp; | 37 | A3 / D16 | &check; |
| S2 / D17 | &nbsp; | 35 | A2 / D17 | &check; |
| S3 / D18 | &nbsp; | 33 | A1 / D18 | &check; |
| S4 / D19 | &nbsp; | 23 | A0 / D19 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

- 6 ADC on the M SoM vs. 6 on the P2
- On the P2, 2 of the ADCs are on the same pins as I2C
- ADC inputs are single-ended and limited to 0 to 3.3V on both
- Resolution is 12 bits on both
- SoM pin 45 (A6) on the M SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A6 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at hoot by the MCU.
- On the P2, `VBAT_MEAS` is a 5V tolerant ADC for measuring battery voltage. This is not present on the M SoM as typically you will use a fuel gauge chip instead of the less accurate voltage measurement to measure battery SoC.
- ADC input A7 has a low impedance which may be an issue when supplied from a voltage divider. The other ADC inputs are comparable to the P2/Photon 2.

### Serial

{{!-- BEGIN do not edit content below, it is automatically generated 8b15c299-ec3c-4638-94e0-70c287b3b480 --}}

| P2 Pin Name | P2 Serial | M SoM Pin | M SoM Pin Name | M SoM Serial |
| :--- | :--- | :---: | :--- | :--- |
| D10 / WKP | Serial3 (CTS) | 38 | RX / D10 | Serial1 (RX)  |
| S0 / D15 | Serial3 (TX) | 41 | A4 / D15 | &nbsp; |
| S1 / D16 | Serial3 (RX) | 37 | A3 / D16 | &nbsp; |
| S2 / D17 | Serial3 (RTS) | 35 | A2 / D17 | &nbsp; |
| D2 | Serial2 (RTS) | 42 | D2 | Serial1 (RTS)  |
| &nbsp; | &nbsp; | 58 | D24 | Serial2 (TX)  |
| &nbsp; | &nbsp; | 60 | D25 | Serial2 (RX)  |
| D3 | Serial2 (CTS) | 40 | D3 | Serial1 (CTS)  |
| D4 | Serial2 (TX) | 66 | D4 | &nbsp; |
| D5 | Serial2 (RX) | 68 | D5 | &nbsp; |
| RX / D9 | Serial1 (RX)  | 36 | TX / D9 | Serial1 (TX) |
| TX / D8 | Serial1 (TX) | 36 | TX / D9 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated--}}

- The P2 has a third UART serial port; this does not exist on M SoM

### SPI

{{!-- BEGIN do not edit content below, it is automatically generated e825d0f8-1762-4ea4-9da8-22f393747616 --}}

| P2 Pin Name | P2 SPI | M SoM Pin | M SoM Pin Name | M SoM SPI |
| :--- | :--- | :---: | :--- | :--- |
| D10 / WKP | &nbsp; | 38 | RX / D10 | SPI1 (MISO) |
| S0 / D15 | SPI (MOSI) | 41 | A4 / D15 | &nbsp; |
| S1 / D16 | SPI (MISO) | 37 | A3 / D16 | &nbsp; |
| S2 / D17 | SPI (SCK) | 35 | A2 / D17 | &nbsp; |
| S3 / D18 | SPI (SS) | 33 | A1 / D18 | &nbsp; |
| D2 | SPI1 (MOSI) | 42 | D2 | SPI1 (SCK) |
| D3 | SPI1 (MISO) | 40 | D3 | SPI1 (SS) |
| D4 | SPI1 (SCK) | 66 | D4 | &nbsp; |
| D5 | SPI1 (SS) | 68 | D5 | &nbsp; |
| &nbsp; | &nbsp; | 48 | D8 | SPI (SS) |
| RX / D9 | &nbsp; | 36 | TX / D9 | SPI1 (MOSI) |
| &nbsp; | &nbsp; | 50 | MISO / D11 | SPI (MISO) |
| &nbsp; | &nbsp; | 52 | MOSI / D12 | SPI (MOSI) |
| &nbsp; | &nbsp; | 54 | SCK / D13 | SPI (SCK) |
| TX / D8 | &nbsp; | 36 | TX / D9 | SPI1 (MOSI) |


{{!-- END do not edit content above, it is automatically generated--}}

- Two SPI interfaces on both

### I2C

{{!-- BEGIN do not edit content below, it is automatically generated d4f5a73f-20a3-4e45-9cbb-f55a68e1c8a5 --}}

| P2 Pin Name | P2 I2C | M SoM Pin | M SoM Pin Name | M SoM I2C |
| :--- | :--- | :---: | :--- | :--- |
| D0 / A3 | Wire (SDA) | 22 | D0 | Wire (SDA) |
| D1 / A4 | Wire (SCL) | 20 | D1 | Wire (SCL) |


{{!-- END do not edit content above, it is automatically generated--}}

- 1 I2C on both
- On the M SoM (and P2 and Photon 2), the only valid I2C clock speeds are `CLOCK_SPEED_100KHZ` and `CLOCK_SPEED_400KHZ`. Other speeds are not supported at this time.


### PWM

{{!-- BEGIN do not edit content below, it is automatically generated be7ef0ce-b932-4cfd-840f-d8f7bf716a6d --}}

| P2 Pin Name | P2 PWM | M SoM Pin | M SoM Pin Name | M SoM PWM |
| :--- | :--- | :---: | :--- | :--- |
| A0 / D11 | &nbsp; | 23 | A0 / D19 | &check; |
| A1 / D12 | &nbsp; | 33 | A1 / D18 | &check; |
| A2 / D13 | &check; | 35 | A2 / D17 | &nbsp; |
| A5 / D14 | &check; | 43 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 53 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 45 | A6 / D29 | &check; |
| D1 / A4 | &check; | 20 | D1 | &nbsp; |
| D10 / WKP | &nbsp; | 38 | RX / D10 | &check; |
| S0 / D15 | &check; | 41 | A4 / D15 | &nbsp; |
| S1 / D16 | &check; | 37 | A3 / D16 | &nbsp; |
| S3 / D18 | &nbsp; | 33 | A1 / D18 | &check; |
| S4 / D19 | &nbsp; | 23 | A0 / D19 | &check; |
| D4 | &nbsp; | 66 | D4 | &check; |
| D5 | &nbsp; | 68 | D5 | &check; |
| D6 | &nbsp; | 70 | D6 | &check; |
| D7 | &nbsp; | 72 | D7 | &check; |
| RX / D9 | &nbsp; | 36 | TX / D9 | &check; |
| &nbsp; | &nbsp; | 50 | MISO / D11 | &check; |
| &nbsp; | &nbsp; | 52 | MOSI / D12 | &check; |
| TX / D8 | &nbsp; | 36 | TX / D9 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

- PWM pins vary between the P2 and M SoM

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

### Sleep

- In `HIBERNATE` sleep mode, the M SoM and P2 can only be wakened via the `WKP` pin, however `WKP` is pin A7 the M SoM (and B SoM) but is pin D10 on the P2.

- In `HIBERNATE` sleep mode, certain pins on the M SoM and P2 do not preserve `INPUT_PULLUP` or `INPUT_PULLDOWN` while asleep. See details below.

M SoM pins related to `HIBERNATE` sleep mode:

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Only this pin can wake from HIBERNATE sleep mode. | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}

P2 pins related to `HIBERNATE` sleep mode:

{{!-- BEGIN do not edit content below, it is automatically generated 6e6f887d-3df4-4cb3-b8e4-67f2aa26ad72 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 30 | D10 / WKP | D10 GPIO, Serial 3 CTS, WKP. (Was WKP/A7 on P1.) | Only this pin can wake from HIBERNATE sleep mode. | PA[15] |
| 33 | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) | No internal pull up or pull down in HIBERNATE sleep mode. | PB[31] |
| 47 | S4 / D19 | S4 GPIO. (Was P1S4 on P1.) | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 48 | S5 / D20 | S5 GPIO. (Was P1S5 on P1.) | No internal pull up or pull down in HIBERNATE sleep mode. | PB[29] |


{{!-- END do not edit content above, it is automatically generated  --}}



### Full comparison


{{!-- BEGIN do not edit content below, it is automatically generated f892e697-679e-4e73-99f6-c396698f3b87 --}}

#### 3V3
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | 3.3V power to MCU | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### 3V3_IO
| | Removed from P2 |
| :--- | :--- |
| Pin Name | 3V3_IO|
| Description | 3.3V power to MCU IO.|
#### 3V3_RF
| | Removed from P2 |
| :--- | :--- |
| Pin Name | 3V3_RF|
| Description | 3.3V power to RF module|
#### A0
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| ∆ | Pin Alternate Name | D11 | D19 |
| ∆ | Description | A0 Analog in, GPIO | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | 42K |
#### A1
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| ∆ | Pin Alternate Name | D12 | D18 |
| ∆ | Description | A1 Analog in, GPIO | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### A2
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| ∆ | Pin Alternate Name | D13 | D17 |
| ∆ | Description | A2 Analog in, PWM, GPIO | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | 22K |
#### A5
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO, PWM. | A5 Analog in, PWM, GPIO, shared with pin 53 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | ??? |
#### A5
| | Added to M SoM |
| :--- | :--- |
| Pin Name | A5|
| Pin Alternate Name | D14|
| Description | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 42K|
| SWD interface | SWCLK. 40K pull-down at boot.|
| Signal used at boot | SWCLK. 40K pull-down at boot.|
#### A6
| | Added to M SoM |
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
#### A7
| | Added to M SoM |
| :--- | :--- |
| Pin Name | A7|
| Pin Alternate Name | WKP|
| Description | A7 Analog In, WKP, GPIO D28|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### AGND
| | Added to M SoM |
| :--- | :--- |
| Pin Name | AGND|
| Description | Analog Ground.|
#### CELL USBD-
| | Added to M SoM |
| :--- | :--- |
| Pin Name | CELL USBD-|
| Description | Cellular Modem USB Data-|
| Input is 5V Tolerant | Yes|
#### CELL USBD+
| | Added to M SoM |
| :--- | :--- |
| Pin Name | CELL USBD+|
| Description | Cellular Modem USB Data+|
| Input is 5V Tolerant | Yes|
#### CELL VBUS
| | Added to M SoM |
| :--- | :--- |
| Pin Name | CELL VBUS|
| Description | USB detect pin for cellular modem. 5V on this pin enables the Cellular Modem USB interface.|
| Input is 5V Tolerant | Yes|
#### CELL_RI
| | Added to M SoM |
| :--- | :--- |
| Pin Name | CELL_RI|
| Description | CELL_RI, ring indicator output, leave unconnected.|
#### D0
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Pin Alternate Name | A3 | n/a |
| ∆ | Description | D0 GPIO, I2C SDA, A3 Analog In | D0 GPIO, I2C SDA |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K | ??? |
#### D1
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Pin Alternate Name | A4 | n/a |
| ∆ | Description | D1 GPIO, PWM, I2C SCL, A4 Analog In | D1 GPIO, I2C SCL |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K | ??? |
#### D10
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D10 | RX |
| ∆ | Pin Alternate Name | WKP | D10 |
| ∆ | Description | D10 GPIO, Serial 3 CTS, WKP. (Was WKP/A7 on P1.) | Serial RX, PWM, GPIO, SPI1 MISO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | CTS. Use Serial3 object. Flow control optional. | RX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 2.1K | 2.1K |
#### D15
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S0 | A4 |
| &nbsp; | Pin Alternate Name | D15 | D15 |
| ∆ | Description | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | A4 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | UART serial | TX. Use Serial3 object. | n/a |
| ∆ | SPI interface | MOSI. Use SPI object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 2.1K | 2.1K |
#### D16
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S1 | A3 |
| &nbsp; | Pin Alternate Name | D16 | D16 |
| ∆ | Description | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | A3 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | UART serial | RX. Use Serial3 object. | n/a |
| ∆ | SPI interface | MISO. Use SPI object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 2.1K | 2.1K |
#### D17
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S2 | A2 |
| &nbsp; | Pin Alternate Name | D17 | D17 |
| ∆ | Description | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | UART serial | RTS. Use Serial3 object. Flow control optional. | n/a |
| ∆ | SPI interface | SCK. Use SPI object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | 22K |
#### D18
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S3 | A1 |
| &nbsp; | Pin Alternate Name | D18 | D18 |
| ∆ | Description | S3 GPIO. (Was P1S3 on P1.), SPI SS | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | SPI interface | Default SS for SPI. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D19
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S4 | A0 |
| &nbsp; | Pin Alternate Name | D19 | D19 |
| ∆ | Description | S4 GPIO. (Was P1S4 on P1.) | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode. | 42K |
#### D2
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | D2 GPIO, Serial2 RTS, SPI1 MOSI | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | RTS. Use Serial2 object. Flow control optional. | RTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | SCK. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D22
| | Added to M SoM |
| :--- | :--- |
| Pin Name | D22|
| Description | D22 GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D23
| | Added to M SoM |
| :--- | :--- |
| Pin Name | D23|
| Description | D23 GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D24
| | Added to M SoM |
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
| | Added to M SoM |
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
| | Added to M SoM |
| :--- | :--- |
| Pin Name | D26|
| Description | D26 GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D27
| | Added to M SoM |
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
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | D3 GPIO, Serial2 CTS, SPI1 MISO | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | CTS. Use Serial2 object. Flow control optional. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MISO. Use SPI1 object. | SS. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D4
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | D4 GPIO, Serial2 TX, SPI1 SCK | D4 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | TX. Use Serial2 object. | n/a |
| ∆ | SPI interface | SCK. Use SPI1 object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D5
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | D5 GPIO, Serial2 RX, SPI1 SS | D5 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | RX. Use Serial2 object. | n/a |
| ∆ | SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D6
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | D6 GPIO, SWCLK | D6 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | ??? |
| ∆ | SWD interface | SWCLK. 40K pull-down at boot. | n/a |
| ∆ | Signal used at boot | SWCLK. 40K pull-down at boot. | n/a |
#### D7
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | D7 GPIO, SWDIO | D7 GPIO, PWM |
| ∆ | Supports digitalRead | Yes. | Yes |
| ∆ | Supports digitalWrite | Yes. On the Photon this is the blue D7 LED. | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | ??? |
| ∆ | SWD interface | SWDIO. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | n/a |
#### D8
| | Added to M SoM |
| :--- | :--- |
| Pin Name | D8|
| Description | D8 GPIO, SPI SS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | Default SS for SPI.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### D9
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | RX | TX |
| &nbsp; | Pin Alternate Name | D9 | D9 |
| ∆ | Description | Serial1 RX (received data), GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | RX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | 2.1K |
#### GND
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | GND | GND |
| ∆ | Description | Ground. Be sure you connect all P1 ground pins. | Ground. |
#### GNSS_TX
| | Added to M SoM |
| :--- | :--- |
| Pin Name | GNSS_TX|
| Description | Cellular modem GNSS UART TX|
#### MISO
| | Added to M SoM |
| :--- | :--- |
| Pin Name | MISO|
| Pin Alternate Name | D11|
| Description | D11 GPIO, PWM, SPI MISO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| SPI interface | MISO. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### MODE
| | Unchanged between P2 and M SoM |
| :--- | :--- |
| Pin Name | MODE|
| Description | MODE button. Pin number constant is BTN. External pull-up required!|
| Supports attachInterrupt | Yes|
#### MOSI
| | Added to M SoM |
| :--- | :--- |
| Pin Name | MOSI|
| Pin Alternate Name | D12|
| Description | D12 GPIO, PWM, SPI MOSI|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| SPI interface | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### NC
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | NC | NC |
| ∆ | Description | No connection. Do not connect anything to this pin. | n/a |
#### RGBB
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RGBB | RGBB |
| &nbsp; | Description | RGB LED Blue | RGB LED Blue |
| ∆ | Supports attachInterrupt | Yes | No |
#### RGBG
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RGBG | RGBG |
| &nbsp; | Description | RGB LED Green | RGB LED Green |
| ∆ | Supports attachInterrupt | Yes | No |
#### RGBR
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RGBR | RGBR |
| ∆ | Description | RGB LED Red. Has 10K hardware pull-up. Do not hold low at boot. | RGB LED Red |
| ∆ | Supports attachInterrupt | Yes | No |
| ∆ | Signal used at boot | n/a | Low at boot triggers trap mode |
#### RST
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RST | RST |
| ∆ | Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset, active low. External pull-up required. |
#### S5
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S5 | D20 |
| ∆ | Pin Alternate Name | D20 | n/a |
| ∆ | Description | S5 GPIO. (Was P1S5 on P1.) | D20 GPIO |
| ∆ | Supports digitalRead | No | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode | ??? |
#### S6
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S6 | D21 |
| ∆ | Pin Alternate Name | D21 | n/a |
| ∆ | Description | S6 GPIO. (Was P1S6/TESTMODE on P1.) | D21 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode. | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### SCK
| | Added to M SoM |
| :--- | :--- |
| Pin Name | SCK|
| Pin Alternate Name | D13|
| Description | D13 GPIO, SPI SCK|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | SCK. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 2.1K|
#### SIM_CLK
| | Added to M SoM |
| :--- | :--- |
| Pin Name | SIM_CLK|
| Description | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem.|
#### SIM_DATA
| | Added to M SoM |
| :--- | :--- |
| Pin Name | SIM_DATA|
| Description | Leave unconnected, 1.8V/3V SIM Data I/O of cellular modem with internal 4.7 k pull-up.|
#### SIM_RST
| | Added to M SoM |
| :--- | :--- |
| Pin Name | SIM_RST|
| Description | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem.|
#### SIM_VCC
| | Added to M SoM |
| :--- | :--- |
| Pin Name | SIM_VCC|
| Description | Leave unconnected, 1.8V/3V SIM Supply Output from R410M.|
#### TX
|   |   | P2 | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D8 | D9 |
| ∆ | Description | Serial1 TX (transmitted data), GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | 2.1K |
| ∆ | Signal used at boot | Low at boot triggers ISP flash download | n/a |
#### USBDATA-
| | Unchanged between P2 and M SoM |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Unchanged between P2 and M SoM |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VBAT_MEAS
| | Removed from P2 |
| :--- | :--- |
| Pin Name | VBAT_MEAS|
| Description | Battery voltage measurement (optional).|
| Input is 5V Tolerant | Yes|
#### VCC
| | Added to M SoM |
| :--- | :--- |
| Pin Name | VCC|
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power.|


{{!-- END do not edit content above, it is automatically generated--}}


## Software

### Wi-Fi configuration

Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.


### Platform ID

The Platform ID of the msom (35, `PLATFORM_MSOM`) is different from that of the P2 (32) because of the different hardware. 

If you have a product based on the P2, you will need to create a separate product for devices using the M SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

### Third-party libraries

Most third-party libraries are believed to be compatible between the P2 and M SoM as they share a similar MCU. The exceptions include:

- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID


## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 2023-10-03 | RK | Initial version |
|          | 2023-12-20 | RK | Additional notes for ADCs, D24, and D25 |
