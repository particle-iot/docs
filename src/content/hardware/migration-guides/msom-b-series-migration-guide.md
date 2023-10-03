---
title: M SoM from B Series migration guide
columns: two
layout: commonTwo.hbs
description: M SoM from B Series migration guide
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
For internal use only. This document is based on preliminary engineering documents. Changes are highly likely!
{{box op="end"}}


{{migration-guide leftImg="/assets/images/b-series/b-series-top.png" rightImg="/assets/images/m-series/msom-top.png"}}

Migrating from the B Series SoM to the M SoM is straightforward, however there are some things to keep in mind:

- Makes sure your 3V3 and VCC (3V7) power supplies are sufficient
- ADCs A6 and A7 are not available on the M SoM
- SPI1 (secondary SPI) is on different pins
- Wire1 (secondary I2C) is not available on the M SoM
- PWM pins are different
- It has a different MCU which may have different compatibility with 3rd-party libraries.

As the M SoM is a different platform ID and requires different firmware binaries it will require a separate product from bsom and b5som products.

### Voltage regulators

#### VCC

VCC is used to supply power to the cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting.

If you are migrating from the BRN404X/BRN404/BRN402 make sure your VCC power supply provides sufficient current if you will be using the LTE Cat 1 with 2G/3G fallback version of the M SoM.

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

If you are migrating from the B Series SoM, note that the required current on 3.3V is 500 mA with the M SoM, vs. 150 mA on the B Series SoM, because of the Wi-Fi radio.


### Brief comparison

{{!-- BEGIN do not edit content below, it is automatically generated 6d82afd2-3dd4-4a30-a75b-7d9b0b780986 --}}

| B4xx SoM Pin Number | B4xx SoM Pin Name | B4xx SoM Description | M SoM Pin Name | M SoM Description |
| :--- | :--- | :--- | :--- | :--- |
| 1 | GND | Ground. | GND | Ground. |
| 2 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| 3 | GND | Ground. | GND | Ground. |
| 4 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| 5 | GND | Ground. | GND | Ground. |
| 6 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| 7 | GND | Ground. | GND | Ground. |
| 8 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| 9 | GND | Ground. | GND | Ground. |
| 10 | 3V3 | System power in, supply a fixed 3.0-3.6v power. | 3V3 | System power in, supply a fixed 3.3V power, 500 mA minimum |
| 11 | USBDATA+ | USB Data+ | USBDATA+ | USB Data+ |
| 12 | 3V3 | System power in, supply a fixed 3.0-3.6v power. | 3V3 | System power in, supply a fixed 3.3V power, 500 mA minimum |
| 13 | USBDATA- | USB Data- | USBDATA- | USB Data- |
| 14 | NC | &nbsp; | NC | &nbsp; |
| 15 | GND | Ground. | GND | Ground. |
| 16 | VUSB | USB VUSB power pin | NC | &nbsp; |
| 17 | NFC1 | NFC Antenna 1 | D21 | D21 GPIO |
| 18 | NC | &nbsp; | GNSS_TX | Cellular modem GNSS UART TX |
| 19 | NFC2 | NFC Antenna 2 | D20 | D20 GPIO |
| 20 | D1 | I2C SCL, GPIO | D1 | D1 GPIO, I2C SCL |
| 21 | GND | Ground. | GND | Ground. |
| 22 | D0 | I2C SDA, GPIO | D0 | D0 GPIO, I2C SDA |
| 23 | A0 / D19 | A0 Analog in, GPIO, PWM | A0 / D19 | A0 Analog in, GPIO, PWM |
| 32 | MODE / D20 | MODE button, has internal pull-up | MODE | MODE button. Pin number constant is BTN. External pull-up required! |
| 33 | A1 / D18 | A1 Analog in, GPIO, PWM | A1 / D18 | A1 Analog in, GPIO, PWM |
| 34 | RST | Hardware reset, active low. External pull-up required. | RST | Hardware reset, active low. External pull-up required. |
| 35 | A2 / D17 | A2 Analog in, GPIO | A2 / D17 | A2 Analog in, GPIO |
| 36 | TX / D9 | Serial TX, GPIO | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI |
| 37 | A3 / D16 | A3 Analog in, GPIO | A3 | A3 Analog in |
| 38 | RX / D10 | Serial RX, GPIO | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO |
| 39 | AGND | Analog Ground. | AGND | Analog Ground. |
| 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| 41 | A4 / D15 | A4 Analog in, GPIO | A4 | A4 Analog in |
| 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| 43 | A5 / D14 | A5 Analog in, GPIO | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 |
| 44 | CELL USBD+ | Cellular Modem USB Data+ | CELL USBD+ | Cellular Modem USB Data+ |
| 45 | A6 | A6 Analog in, PWM, GPIO | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT |
| 46 | CELL USBD- | Cellular Modem USB Data- | CELL USBD- | Cellular Modem USB Data- |
| 47 | A7 | A7 Analog in, GPIO, Ethernet Reset | A7 / WKP | A7 Analog In, WKP, GPIO D28 |
| 48 | D8 | GPIO, SPI SS, Ethernet CS | D8 | D8 GPIO, SPI SS |
| 49 | AGND | Analog Ground. | AGND | Analog Ground. |
| 50 | MISO / D11 | SPI MISO, GPIO | D11 / MISO | D11 GPIO, PWM, SPI MISO |
| 51 | NC | &nbsp; | NC | &nbsp; |
| 52 | MOSI / D12 | SPI MOSI, GPIO | D12 / MOSI | D12 GPIO, PWM, SPI MOSI |
| 53 | NC | &nbsp; | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 |
| 54 | SCK / D13 | SPI SCK, GPIO | D13 / SCK | D13 GPIO, SPI SCK |
| 55 | NC | &nbsp; | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot |
| 56 | GND | Ground. | GND | Ground. |
| 57 | NC | &nbsp; | NC | &nbsp; |
| 58 | NC | &nbsp; | D24 | D24 GPIO, do not pull down at boot |
| 59 | NC | &nbsp; | D26 | D26 GPIO |
| 60 | NC | &nbsp; | D25 | GPIO25 |
| 61 | RGBR | RGB LED Red | RGBR | RGB LED Red |
| 62 | D22 | GPIO, Ethernet INT | D22 | D22 GPIO |
| 63 | RGBG | RGB LED Green | RGBG | RGB LED Green |
| 64 | D23 | GPIO | D23 | D23 GPIO |
| 65 | RGBB | RGB LED Blue | RGBB | RGB LED Blue |
| 66 | D4 | SPI1 MISO, PWM, GPIO | D4 | D4 GPIO, PWM |
| 67 | SIM_VCC | Leave unconnected, 1.8V/3V SIM Supply Output from R410M. | SIM_VCC | Leave unconnected, 1.8V/3V SIM Supply Output from R410M. |
| 68 | D5 | PWM, GPIO | D5 | D5 GPIO, PWM |
| 69 | SIM_RST | Leave unconnected, 1.8V/3V SIM Reset Output from R410M. | SIM_RST | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
| 70 | D6 | PWM, GPIO | D6 | D6 GPIO, PWM |
| 71 | SIM_CLK | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. | SIM_CLK | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
| 72 | D7 | PWM, GPIO | D7 | D7 GPIO, PWM |


{{!-- END do not edit content above, it is automatically generated--}}






### ADC vs. B SoM

{{!-- BEGIN do not edit content below, it is automatically generated ed9de0f9-7941-4090-9fb2-d6bb398fd860 --}}

| Pin | B4xx SoM Pin Name | B4xx SoM ADC | M SoM Pin Name | M SoM ADC |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | &check; | A0 / D19 | &check; |
| 33 | A1 / D18 | &check; | A1 / D18 | &check; |
| 35 | A2 / D17 | &check; | A2 / D17 | &check; |
| 37 | A3 / D16 | &check; | A3 | &check; |
| 41 | A4 / D15 | &check; | A4 | &check; |
| 43 | A5 / D14 | &check; | A5 / D14 | &check; |
| 45 | A6 | &check; | A6 / D29 | &check; |
| 47 | A7 | &check; | A7 / WKP | &check; |
| 53 | NC | &nbsp; | A5 / D14 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V on both.
- Resolution is 12 bits on both.
- SoM pin 45 (A6) on the M SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A6 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at hoot by the MCU.

### Serial vs. B SoM

{{!-- BEGIN do not edit content below, it is automatically generated 5458f22f-840f-4892-97cc-57e6ebd5c1bb --}}

| Pin | B4xx SoM Pin Name | B4xx SoM Serial | M SoM Pin Name | M SoM Serial |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial1 TX | TX / D9 | Serial1 (TX) |
| 38 | RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| 40 | D3 | Serial1 CTS | D3 | Serial1 (CTS)  |
| 42 | D2 | Serial1 RTS | D2 | Serial1 (RTS)  |


{{!-- END do not edit content above, it is automatically generated--}}

- The M SoM has two available UART serial ports vs. 1 on the B SoM.

### SPI vs. B SoM

{{!-- BEGIN do not edit content below, it is automatically generated 89fcdf38-5b12-43fa-b306-72a4262c913e --}}

| Pin | B4xx SoM Pin Name | B4xx SoM SPI | M SoM Pin Name | M SoM SPI |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | &nbsp; | TX / D9 | SPI1 (MOSI) |
| 38 | RX / D10 | &nbsp; | RX / D10 | SPI1 (MISO) |
| 40 | D3 | SPI1 (MOSI) | D3 | SPI1 (SS) |
| 42 | D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| 48 | D8 | SPI (SS) | D8 | SPI (SS) |
| 50 | MISO / D11 | SPI (MISO) | D11 / MISO | SPI (MISO) |
| 52 | MOSI / D12 | SPI (MOSI) | D12 / MOSI | SPI (MOSI) |
| 54 | SCK / D13 | SPI (SCK) | D13 / SCK | SPI (SCK) |
| 66 | D4 | SPI1 (MISO) | D4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- There are two SPI interfaces on both, however SPI1 is on different pins on M SoM.


### I2C vs. B SoM

{{!-- BEGIN do not edit content below, it is automatically generated d72da918-d38e-46f0-b651-0c4ddee8cad7 --}}

| Pin | B4xx SoM Pin Name | B4xx SoM I2C | M SoM Pin Name | M SoM I2C |
| :---: | :--- | :--- | :--- | :--- |
| 20 | D1 | Wire (SCL) | D1 | Wire (SCL) |
| 22 | D0 | Wire (SDA) | D0 | Wire (SDA) |
| 40 | D3 | Wire1 (SCL) | D3 | &nbsp; |
| 42 | D2 | Wire1 (SDA) | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- 1 I2C on M SoM vs. 2 on the B Series SoM

### PWM vs. B SoM

{{!-- BEGIN do not edit content below, it is automatically generated d6253ac9-1074-48cd-a7b9-05315e4a5850 --}}

| Pin | B4xx SoM Pin Name | B4xx SoM PWM | M SoM Pin Name | M SoM PWM |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | &check; | A0 / D19 | &check; |
| 33 | A1 / D18 | &check; | A1 / D18 | &check; |
| 36 | TX / D9 | &nbsp; | TX / D9 | &check; |
| 38 | RX / D10 | &nbsp; | RX / D10 | &check; |
| 43 | A5 / D14 | &nbsp; | A5 / D14 | &check; |
| 45 | A6 | &check; | A6 / D29 | &check; |
| 47 | A7 | &check; | A7 / WKP | &nbsp; |
| 50 | MISO / D11 | &nbsp; | D11 / MISO | &check; |
| 52 | MOSI / D12 | &nbsp; | D12 / MOSI | &check; |
| 53 | NC | &nbsp; | A5 / D14 | &check; |
| 66 | D4 | &check; | D4 | &check; |
| 68 | D5 | &check; | D5 | &check; |
| 70 | D6 | &check; | D6 | &check; |
| 72 | D7 | &check; | D7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

On the B SoM, multiple timers are using allowing different PWM frequencies on certain pins. On the M SoM, all PWM pins share a single time and thus must share the same frequency, but can have different duty cycles.

### SWD vs. B SoM

The M SoM has 4 pads at the bottom exposing the SWD interface of the MCU. This interface can be used to debug your code or reprogram your SoM bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

Additionally, SWD is supported on pins on the M.2 connector:

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT | SWCLK | PB[7] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840).
- SWO (Serial Wire Output) is not supported on the RTL8722DM.



### Full pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 2ad3dc88-d864-49db-bb3a-46b2a2f7ced0 --}}

#### Module Pin 1 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 1|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 2 (VCC)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 2 | 2 |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 3 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 3|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 4 (VCC)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 4 | 4 |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 5 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 5|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 6 (VCC)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 6 | 6 |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 7 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 8 (VCC)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 8 | 8 |
| Pin Name | VCC | VCC |
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 9 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 9|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 10 (3V3)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 10 | 10 |
| Pin Name | 3V3 | 3V3 |
| Description | System power in, supply a fixed 3.0-3.6v power. | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### Module Pin 11 (USBDATA+)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 11|
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 12 (3V3)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 12 | 12 |
| Pin Name | 3V3 | 3V3 |
| Description | System power in, supply a fixed 3.0-3.6v power. | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### Module Pin 13 (USBDATA-)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 13|
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 14 (NC)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 14|
| Pin Name | NC|
#### Module Pin 15 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 15|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 16 (VUSB / NC)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 16 | 16 |
| Pin Name | VUSB | NC |
| Description | USB VUSB power pin | n/a |
| Input is 5V Tolerant | Yes | n/a |
#### Module Pin 17 (NFC1 / D21)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 17 | 17 |
| Pin Name | NFC1 | D21 |
| Description | NFC Antenna 1 | D21 GPIO |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### Module Pin 18 (NC / GNSS_TX)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 18 | 18 |
| Pin Name | NC | GNSS_TX |
| Description | n/a | Cellular modem GNSS UART TX |
#### Module Pin 19 (NFC2 / D20)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 19 | 19 |
| Pin Name | NFC2 | D20 |
| Description | NFC Antenna 2 | D20 GPIO |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | ??? |
#### Module Pin 20 (D1)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 20 | 20 |
| Pin Name | D1 | D1 |
| Description | I2C SCL, GPIO | D1 GPIO, I2C SCL |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 21 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 21|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 22 (D0)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 22 | 22 |
| Pin Name | D0 | D0 |
| Description | I2C SDA, GPIO | D0 GPIO, I2C SDA |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 23 (A0)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 23 | 23 |
| Pin Name | A0 | A0 |
| Pin Alternate Name | D19 | D19 |
| Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 42K |
#### Module Pin 32 (MODE)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 32 | 32 |
| Pin Name | MODE | MODE |
| Pin Alternate Name | D20 | n/a |
| Description | MODE button, has internal pull-up | MODE button. Pin number constant is BTN. External pull-up required! |
| Supports attachInterrupt | n/a | Yes |
#### Module Pin 33 (A1)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 33 | 33 |
| Pin Name | A1 | A1 |
| Pin Alternate Name | D18 | D18 |
| Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 34 (RST)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 34|
| Pin Name | RST|
| Description | Hardware reset, active low. External pull-up required.|
#### Module Pin 35 (A2)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 35 | 35 |
| Pin Name | A2 | A2 |
| Pin Alternate Name | D17 | D17 |
| Description | A2 Analog in, GPIO | A2 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 22K |
#### Module Pin 36 (TX)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 36 | 36 |
| Pin Name | TX | TX |
| Pin Alternate Name | D9 | D9 |
| Description | Serial TX, GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| UART serial | TX Use Serial1 object. | TX. Use Serial1 object. |
| SPI interface | n/a | MOSI. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 37 (A3)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 37 | 37 |
| Pin Name | A3 | A3 |
| Pin Alternate Name | D16 | n/a |
| Description | A3 Analog in, GPIO | A3 Analog in |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 38 (RX)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 38 | 38 |
| Pin Name | RX | RX |
| Pin Alternate Name | D10 | D10 |
| Description | Serial RX, GPIO | Serial RX, PWM, GPIO, SPI1 MISO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| UART serial | RX Use Serial1 object. | RX. Use Serial1 object. |
| SPI interface | n/a | MISO. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 39 (AGND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 39|
| Pin Name | AGND|
| Description | Analog Ground.|
#### Module Pin 40 (D3)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 40 | 40 |
| Pin Name | D3 | D3 |
| Description | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | Optional CTS hardware flow control for Serial1 | CTS. Use Serial1 object. |
| SPI interface | MOSI. Use SPI1 object. | SS. Use SPI1 object. |
| I2C interface | SCL. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 41 (A4)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 41 | 41 |
| Pin Name | A4 | A4 |
| Pin Alternate Name | D15 | n/a |
| Description | A4 Analog in, GPIO | A4 Analog in |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 42 (D2)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 42 | 42 |
| Pin Name | D2 | D2 |
| Description | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | Optional RTS hardware flow control for Serial1 | RTS. Use Serial1 object. |
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| I2C interface | SDA. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 43 (A5)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 43 | 43 |
| Pin Name | A5 | A5 |
| Pin Alternate Name | D14 | D14 |
| Description | A5 Analog in, GPIO | A5 Analog in, PWM, GPIO, shared with pin 53 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 44 (CELL USBD+)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | CELL USBD+|
| Description | Cellular Modem USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 45 (A6)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 45 | 45 |
| Pin Name | A6 | A6 |
| Pin Alternate Name | n/a | D29 |
| Description | A6 Analog in, PWM, GPIO | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
| SWD interface | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 46 (CELL USBD-)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | CELL USBD-|
| Description | Cellular Modem USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 47 (A7)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 47 | 47 |
| Pin Name | A7 | A7 |
| Pin Alternate Name | n/a | WKP |
| Description | A7 Analog in, GPIO, Ethernet Reset | A7 Analog In, WKP, GPIO D28 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A6, and A7 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 48 (D8)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 48 | 48 |
| Pin Name | D8 | D8 |
| Description | GPIO, SPI SS, Ethernet CS | D8 GPIO, SPI SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | Default SS for SPI. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 49 (AGND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 49|
| Pin Name | AGND|
| Description | Analog Ground.|
#### Module Pin 50 (MISO / D11)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 50 | 50 |
| Pin Name | MISO | D11 |
| Pin Alternate Name | D11 | MISO |
| Description | SPI MISO, GPIO | D11 GPIO, PWM, SPI MISO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 51 (NC)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 51|
| Pin Name | NC|
#### Module Pin 52 (MOSI / D12)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 52 | 52 |
| Pin Name | MOSI | D12 |
| Pin Alternate Name | D12 | MOSI |
| Description | SPI MOSI, GPIO | D12 GPIO, PWM, SPI MOSI |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 53 (NC / A5)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 53 | 53 |
| Pin Name | NC | A5 |
| Pin Alternate Name | n/a | D14 |
| Description | n/a | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports analogRead | n/a | Yes |
| Supports analogWrite (PWM) | n/a | Yes |
| Supports tone | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | 42K |
| SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 54 (SCK / D13)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 54 | 54 |
| Pin Name | SCK | D13 |
| Pin Alternate Name | D13 | SCK |
| Description | SPI SCK, GPIO | D13 GPIO, SPI SCK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | 2.1K |
#### Module Pin 55 (NC / D27)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 55 | 55 |
| Pin Name | NC | D27 |
| Description | n/a | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | 42K |
| SWD interface | n/a | SWDIO. 40K pull-up at boot. |
| Signal used at boot | n/a | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### Module Pin 56 (GND)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 56|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 57 (NC)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 57|
| Pin Name | NC|
#### Module Pin 58 (NC / D24)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 58 | 58 |
| Pin Name | NC | D24 |
| Description | n/a | D24 GPIO, do not pull down at boot |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | 42K |
| Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### Module Pin 59 (NC / D26)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 59 | 59 |
| Pin Name | NC | D26 |
| Description | n/a | D26 GPIO |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | ??? |
#### Module Pin 60 (NC / D25)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 60 | 60 |
| Pin Name | NC | D25 |
| Description | n/a | GPIO25 |
| Supports digitalRead | n/a | Yes |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
| Internal pull-up or pull-down resistance | n/a | 42K |
#### Module Pin 61 (RGBR)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 61 | 61 |
| Pin Name | RGBR | RGBR |
| Description | RGB LED Red | RGB LED Red |
| Signal used at boot | n/a | Low at boot triggers trap mode |
#### Module Pin 62 (D22)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 62 | 62 |
| Pin Name | D22 | D22 |
| Description | GPIO, Ethernet INT | D22 GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 63 (RGBG)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 63|
| Pin Name | RGBG|
| Description | RGB LED Green|
#### Module Pin 64 (D23)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 64 | 64 |
| Pin Name | D23 | D23 |
| Description | GPIO | D23 GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 65 (RGBB)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 65|
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### Module Pin 66 (D4)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 66 | 66 |
| Pin Name | D4 | D4 |
| Description | SPI1 MISO, PWM, GPIO | D4 GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| SPI interface | MISO. Use SPI1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 67 (SIM_VCC)
| | Unchanged between B4xx SoM and M SoM |
| :--- | :--- |
| Pin Number | 67|
| Pin Name | SIM_VCC|
| Description | Leave unconnected, 1.8V/3V SIM Supply Output from R410M.|
#### Module Pin 68 (D5)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 68 | 68 |
| Pin Name | D5 | D5 |
| Description | PWM, GPIO | D5 GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 69 (SIM_RST)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 69 | 69 |
| Pin Name | SIM_RST | SIM_RST |
| Description | Leave unconnected, 1.8V/3V SIM Reset Output from R410M. | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
#### Module Pin 70 (D6)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 70 | 70 |
| Pin Name | D6 | D6 |
| Description | PWM, GPIO | D6 GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |
#### Module Pin 71 (SIM_CLK)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 71 | 71 |
| Pin Name | SIM_CLK | SIM_CLK |
| Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
#### Module Pin 72 (D7)
|   | B4xx SoM | M SoM |
| :--- | :--- | :--- |
| Pin Number | 72 | 72 |
| Pin Name | D7 | D7 |
| Description | PWM, GPIO | D7 GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | Yes |
| Supports tone | No | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| Internal pull-up or pull-down resistance | 13K | ??? |


{{!-- END do not edit content above, it is automatically generated--}}
