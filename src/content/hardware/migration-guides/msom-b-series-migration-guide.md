---
title: M SoM from B Series migration guide
columns: two
layout: commonTwo.hbs
description: M SoM from B Series migration guide
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary datasheet and changes may occur prior to release.
{{box op="end"}}


{{migration-guide leftImg="/assets/images/b-series/b-series-top.png" rightImg="/assets/images/m-series/msom-top.png"}}

<p class="attribution">The modules are the same size, but the different cellular module size makes them look different.</p>

Migrating from the B Series SoM to the M SoM is straightforward, however there are some things to keep in mind:

- Make sure your 3V3 and VCC (3V7) power supplies are sufficient
- SPI1 (secondary SPI) is on different pins
- Wire1 (secondary I2C) is not available on the M SoM
- PWM pins are different
- It has a different MCU which may have different compatibility with 3rd-party libraries

As the M SoM is a different platform ID and requires different firmware binaries it will require a separate product from bsom and b5som products.

### Datasheets

- [M SoM datasheet](/reference/datasheets/m-series/msom-datasheet/)
- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B523/B524 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [B Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)

## Certification

When migrating to a new device, recertification is typically required. If you are using the standard Particle antennas 
you often only need to complete the less expensive unintentional radiator testing of your completed assembly, however 
in some cases intentional radiator testing could be required.

## Software differences

### User firmware binary size

One major advantage is that user firmware binaries can be up to 2048 Kbytes, instead of 256 Kbytes on Gen 3 devices using Device OS 3.1.0 or later.

### Available RAM

The B SoM has around 80K of RAM available to user applications. The M SoM has 3500K of available RAM.

### Flash file system

There is a 2 MB flash file system for storing user data. This is the same size as the Boron, B SoM, and Argon. The Tracker has a 4 MB flash file system.


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

| &nbsp; | B SoM Pin Number | B SoM Pin Name | B SoM Description | M SoM Pin Name | M SoM Description |
| :---: | :--- | :--- | :--- | :--- | :--- |
| &nbsp; | 1 | GND | Ground. | GND | Ground. |
| ∆ | 2 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| &nbsp; | 3 | GND | Ground. | GND | Ground. |
| ∆ | 4 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| &nbsp; | 5 | GND | Ground. | GND | Ground. |
| ∆ | 6 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| &nbsp; | 7 | GND | Ground. | GND | Ground. |
| ∆ | 8 | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | VCC | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
| &nbsp; | 9 | GND | Ground. | GND | Ground. |
| ∆ | 10 | 3V3 | System power in, supply a fixed 3.0-3.6v power. | 3V3 | System power in, supply a fixed 3.3V power, 500 mA minimum |
| &nbsp; | 11 | USBDATA+ | USB Data+ | USBDATA+ | USB Data+ |
| ∆ | 12 | 3V3 | System power in, supply a fixed 3.0-3.6v power. | 3V3 | System power in, supply a fixed 3.3V power, 500 mA minimum |
| &nbsp; | 13 | USBDATA- | USB Data- | USBDATA- | USB Data- |
| &nbsp; | 14 | NC | &nbsp; | NC | &nbsp; |
| &nbsp; | 15 | GND | Ground. | GND | Ground. |
| ∆ | 16 | VUSB | USB VUSB power pin | NC | &nbsp; |
| ∆ | 17 | NFC1 | NFC Antenna 1 | D21 | D21 GPIO |
| ∆ | 18 | NC | &nbsp; | GNSS_TX | Cellular modem GNSS UART TX |
| ∆ | 19 | NFC2 | NFC Antenna 2 | D20 | D20 GPIO |
| ∆ | 20 | D1 | I2C SCL, GPIO | D1 | D1 GPIO, I2C SCL |
| &nbsp; | 21 | GND | Ground. | GND | Ground. |
| ∆ | 22 | D0 | I2C SDA, GPIO | D0 | D0 GPIO, I2C SDA |
| &nbsp; | 23 | A0 / D19 | A0 Analog in, GPIO, PWM | A0 / D19 | A0 Analog in, GPIO, PWM |
| ∆ | 32 | MODE / D20 | MODE button, has internal pull-up | MODE | MODE button. Pin number constant is BTN. External pull-up required! |
| &nbsp; | 33 | A1 / D18 | A1 Analog in, GPIO, PWM | A1 / D18 | A1 Analog in, GPIO, PWM |
| &nbsp; | 34 | RST | Hardware reset, active low. External pull-up required. | RST | Hardware reset, active low. External pull-up required. |
| &nbsp; | 35 | A2 / D17 | A2 Analog in, GPIO | A2 / D17 | A2 Analog in, GPIO |
| ∆ | 36 | TX / D9 | Serial TX, GPIO | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | 37 | A3 / D16 | A3 Analog in, GPIO | A3 / D16 | A3 Analog in, GPIO |
| ∆ | 38 | RX / D10 | Serial RX, GPIO | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO |
| &nbsp; | 39 | AGND | Analog Ground. | AGND | Analog Ground. |
| ∆ | 40 | D3 | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | 41 | A4 / D15 | A4 Analog in, GPIO | A4 / D15 | A4 Analog in, GPIO |
| ∆ | 42 | D2 | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| ∆ | 43 | A5 / D14 | A5 Analog in, GPIO | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 |
| &nbsp; | 44 | CELL USBD+ | Cellular Modem USB Data+ | CELL USBD+ | Cellular Modem USB Data+ |
| ∆ | 45 | A6 | A6 Analog in, PWM, GPIO | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 |
| &nbsp; | 46 | CELL USBD- | Cellular Modem USB Data- | CELL USBD- | Cellular Modem USB Data- |
| ∆ | 47 | A7 | A7 Analog in, GPIO, Ethernet Reset | A7 / WKP | A7 Analog In, WKP, GPIO D28 |
| ∆ | 48 | D8 | GPIO, SPI SS, Ethernet CS | D8 | D8 GPIO, SPI SS |
| &nbsp; | 49 | AGND | Analog Ground. | AGND | Analog Ground. |
| ∆ | 50 | MISO / D11 | SPI MISO, GPIO | MISO / D11 | D11 GPIO, PWM, SPI MISO |
| &nbsp; | 51 | NC | &nbsp; | NC | &nbsp; |
| ∆ | 52 | MOSI / D12 | SPI MOSI, GPIO | MOSI / D12 | D12 GPIO, PWM, SPI MOSI |
| ∆ | 53 | NC | &nbsp; | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 |
| ∆ | 54 | SCK / D13 | SPI SCK, GPIO | SCK / D13 | D13 GPIO, SPI SCK |
| ∆ | 55 | NC | &nbsp; | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot |
| &nbsp; | 56 | GND | Ground. | GND | Ground. |
| &nbsp; | 57 | NC | &nbsp; | NC | &nbsp; |
| ∆ | 58 | NC | &nbsp; | D24 | D24 GPIO, Serial2 TX, do not pull down at boot |
| ∆ | 59 | NC | &nbsp; | D26 | D26 GPIO |
| ∆ | 60 | NC | &nbsp; | D25 | GPIO25, Serial2 RX |
| &nbsp; | 61 | RGBR | RGB LED Red | RGBR | RGB LED Red |
| ∆ | 62 | D22 | GPIO, Ethernet INT | D22 | D22 GPIO |
| &nbsp; | 63 | RGBG | RGB LED Green | RGBG | RGB LED Green |
| ∆ | 64 | D23 | GPIO | D23 | D23 GPIO |
| &nbsp; | 65 | RGBB | RGB LED Blue | RGBB | RGB LED Blue |
| ∆ | 66 | D4 | SPI1 MISO, PWM, GPIO | D4 | D4 GPIO, PWM |
| &nbsp; | 67 | SIM_VCC | Leave unconnected, 1.8V/3V SIM Supply Output from R410M. | SIM_VCC | Leave unconnected, 1.8V/3V SIM Supply Output from R410M. |
| ∆ | 68 | D5 | PWM, GPIO | D5 | D5 GPIO, PWM |
| ∆ | 69 | SIM_RST | Leave unconnected, 1.8V/3V SIM Reset Output from R410M. | SIM_RST | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
| ∆ | 70 | D6 | PWM, GPIO | D6 | D6 GPIO, PWM |
| ∆ | 71 | SIM_CLK | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. | SIM_CLK | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
| ∆ | 72 | D7 | PWM, GPIO | D7 | D7 GPIO, PWM |


{{!-- END do not edit content above, it is automatically generated--}}






### ADC

{{!-- BEGIN do not edit content below, it is automatically generated ed9de0f9-7941-4090-9fb2-d6bb398fd860 --}}

| Pin | B SoM Pin Name | B SoM ADC | M SoM Pin Name | M SoM ADC |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | &check; | A0 / D19 | &check; |
| 33 | A1 / D18 | &check; | A1 / D18 | &check; |
| 35 | A2 / D17 | &check; | A2 / D17 | &check; |
| 37 | A3 / D16 | &check; | A3 / D16 | &check; |
| 41 | A4 / D15 | &check; | A4 / D15 | &check; |
| 43 | A5 / D14 | &check; | A5 / D14 | &check; |
| 45 | A6 | &check; | A6 / D29 | &check; |
| 47 | A7 | &check; | A7 / WKP | &check; |
| 53 | NC | &nbsp; | A5 / D14 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V on both.
- Resolution is 12 bits on both.
- SoM pin 45 (A6) on the M SoM is shared with SoM pin 53 (SWD_CLK). You cannot use A6 and SWD at the same time. If you implement SWD on your base board, driving pin A6 will prevent SWD from functioning. The SWD_CLK will be driven at hoot by the MCU.

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}


### Serial

{{!-- BEGIN do not edit content below, it is automatically generated 5458f22f-840f-4892-97cc-57e6ebd5c1bb --}}

| Pin | B SoM Pin Name | B SoM Serial | M SoM Pin Name | M SoM Serial |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial1 TX | TX / D9 | Serial1 (TX) |
| 38 | RX / D10 | Serial1 RX | RX / D10 | Serial1 (RX)  |
| 40 | D3 | Serial1 CTS | D3 | Serial1 (CTS)  |
| 42 | D2 | Serial1 RTS | D2 | Serial1 (RTS)  |
| 58 | NC | &nbsp; | D24 | Serial2 (TX)  |
| 60 | NC | &nbsp; | D25 | Serial2 (RX)  |


{{!-- END do not edit content above, it is automatically generated--}}

- The M SoM has two available UART serial ports vs. 1 on the B SoM.

### SPI

{{!-- BEGIN do not edit content below, it is automatically generated 89fcdf38-5b12-43fa-b306-72a4262c913e --}}

| Pin | B SoM Pin Name | B SoM SPI | M SoM Pin Name | M SoM SPI |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | &nbsp; | TX / D9 | SPI1 (MOSI) |
| 38 | RX / D10 | &nbsp; | RX / D10 | SPI1 (MISO) |
| 40 | D3 | SPI1 (MOSI) | D3 | SPI1 (SS) |
| 42 | D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| 48 | D8 | SPI (SS) | D8 | SPI (SS) |
| 50 | MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| 52 | MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| 54 | SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| 66 | D4 | SPI1 (MISO) | D4 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- There are two SPI interfaces on both, however SPI1 is on different pins on M SoM.


### I2C

{{!-- BEGIN do not edit content below, it is automatically generated d72da918-d38e-46f0-b651-0c4ddee8cad7 --}}

| Pin | B SoM Pin Name | B SoM I2C | M SoM Pin Name | M SoM I2C |
| :---: | :--- | :--- | :--- | :--- |
| 20 | D1 | Wire (SCL) | D1 | Wire (SCL) |
| 22 | D0 | Wire (SDA) | D0 | Wire (SDA) |
| 40 | D3 | Wire1 (SCL) | D3 | &nbsp; |
| 42 | D2 | Wire1 (SDA) | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

- 1 I2C on M SoM vs. 2 on the B Series SoM.
- You can generally have many devices on a single I2C bus.
- If you have I2C address conflicts you can use an I2C multiplexer like the TCA9548A.
- On the M SoM (and P2 and Photon 2), the only valid I2C clock speeds are `CLOCK_SPEED_100KHZ` and `CLOCK_SPEED_400KHZ`. Other speeds are not supported at this time.

### PWM

{{!-- BEGIN do not edit content below, it is automatically generated d6253ac9-1074-48cd-a7b9-05315e4a5850 --}}

| Pin | B SoM Pin Name | B SoM PWM | M SoM Pin Name | M SoM PWM |
| :---: | :--- | :--- | :--- | :--- |
| 23 | A0 / D19 | &check; | A0 / D19 | &check; |
| 33 | A1 / D18 | &check; | A1 / D18 | &check; |
| 36 | TX / D9 | &nbsp; | TX / D9 | &check; |
| 38 | RX / D10 | &nbsp; | RX / D10 | &check; |
| 43 | A5 / D14 | &nbsp; | A5 / D14 | &check; |
| 45 | A6 | &check; | A6 / D29 | &check; |
| 47 | A7 | &check; | A7 / WKP | &nbsp; |
| 50 | MISO / D11 | &nbsp; | MISO / D11 | &check; |
| 52 | MOSI / D12 | &nbsp; | MOSI / D12 | &check; |
| 53 | NC | &nbsp; | A5 / D14 | &check; |
| 66 | D4 | &check; | D4 | &check; |
| 68 | D5 | &check; | D5 | &check; |
| 70 | D6 | &check; | D6 | &check; |
| 72 | D7 | &check; | D7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

On the B SoM, multiple timers are using allowing different PWM frequencies on certain pins. On the M SoM, all PWM pins share a single time and thus must share the same frequency, but can have different duty cycles.

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

### SWD

The M SoM has 4 pads at the bottom exposing the SWD interface of the MCU. This interface can be used to debug your code or reprogram your SoM bootloader, device OS, or the user firmware. We use 4 pogo-pins connecting to these pads during production for firmware flashing.

{{imageOverlay src="/assets/images/b-series/pogo-pins.png" alt="Pogo Pins"}}

Additionally, SWD is supported on pins on the M.2 connector:

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 45 | A6 / D29 | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 | SWCLK | PB[7] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}

- SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840).
- SWO (Serial Wire Output) is not supported on the RTL8722DM.

### USB

The nRF52 MCU requires the 5V line from the USB interface on pin 16 (VUSB).

The M SoM does not require this pin, however you can supply VUSB on M SoM pin 16 so you can use the same base board for both SKUs.

### NFC

The M SoM does not support NFC.

On the B SoM, pin 17 is NFC1 which is NC on the M SoM. Pin 19 is NFC2 but is D20 on the M SoM. Pin D20 can only be used as GPIO.

### Sleep

- In `HIBERNATE` sleep mode, the M SoM can only be wakened via the `WKP` pin, but the B SoM can be wakened by any pin.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, both the M SoM and B SoM can be wakened by any pin.

- In `HIBERNATE` sleep mode, the M SoM puts `OUTPUT` pins into high-impedance state. The B SoM preserves the digital level.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, both the M SoM and B SoM preserve the digital output

- In `HIBERNATE` sleep mode, on the M SoM, pin D21 does not maintain `INPUT_PULLUP` or `INPUT_PULLDOWN` while asleep.

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Only this pin can wake from HIBERNATE sleep mode. | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Full pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 2ad3dc88-d864-49db-bb3a-46b2a2f7ced0 --}}

#### Module Pin 1 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 1|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 2 (VCC)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 2 | 2 |
| &nbsp; | Pin Name | VCC | VCC |
| ∆ | Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 3 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 3|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 4 (VCC)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 4 | 4 |
| &nbsp; | Pin Name | VCC | VCC |
| ∆ | Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 5 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 5|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 6 (VCC)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 6 | 6 |
| &nbsp; | Pin Name | VCC | VCC |
| ∆ | Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 7 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 8 (VCC)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 8 | 8 |
| &nbsp; | Pin Name | VCC | VCC |
| ∆ | Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power. | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power. |
#### Module Pin 9 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 9|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 10 (3V3)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 10 | 10 |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | System power in, supply a fixed 3.0-3.6v power. | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### Module Pin 11 (USBDATA+)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 11|
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 12 (3V3)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 12 | 12 |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | System power in, supply a fixed 3.0-3.6v power. | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### Module Pin 13 (USBDATA-)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 13|
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 14 (NC)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 14|
| Pin Name | NC|
#### Module Pin 15 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 15|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 16 (VUSB / NC)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 16 | 16 |
| ∆ | Pin Name | VUSB | NC |
| ∆ | Description | USB VUSB power pin | n/a |
| ∆ | Input is 5V Tolerant | Yes | n/a |
#### Module Pin 17 (NFC1 / D21)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 17 | 17 |
| ∆ | Pin Name | NFC1 | D21 |
| ∆ | Description | NFC Antenna 1 | D21 GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 22K. No internal pull up or pull down in HIBERNATE sleep mode. |
#### Module Pin 18 (NC / GNSS_TX)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 18 | 18 |
| ∆ | Pin Name | NC | GNSS_TX |
| ∆ | Description | n/a | Cellular modem GNSS UART TX |
#### Module Pin 19 (NFC2 / D20)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 19 | 19 |
| ∆ | Pin Name | NFC2 | D20 |
| ∆ | Description | NFC Antenna 2 | D20 GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 20 (D1)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 20 | 20 |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | I2C SCL, GPIO | D1 GPIO, I2C SCL |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 21 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 21|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 22 (D0)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 22 | 22 |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | I2C SDA, GPIO | D0 GPIO, I2C SDA |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 23 (A0)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 23 | 23 |
| &nbsp; | Pin Name | A0 | A0 |
| &nbsp; | Pin Alternate Name | D19 | D19 |
| &nbsp; | Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 42K |
#### Module Pin 32 (MODE)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 32 | 32 |
| &nbsp; | Pin Name | MODE | MODE |
| ∆ | Pin Alternate Name | D20 | n/a |
| ∆ | Description | MODE button, has internal pull-up | MODE button. Pin number constant is BTN. External pull-up required! |
| ∆ | Supports attachInterrupt | n/a | Yes |
#### Module Pin 33 (A1)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 33 | 33 |
| &nbsp; | Pin Name | A1 | A1 |
| &nbsp; | Pin Alternate Name | D18 | D18 |
| &nbsp; | Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 34 (RST)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 34|
| Pin Name | RST|
| Description | Hardware reset, active low. External pull-up required.|
#### Module Pin 35 (A2)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 35 | 35 |
| &nbsp; | Pin Name | A2 | A2 |
| &nbsp; | Pin Alternate Name | D17 | D17 |
| &nbsp; | Description | A2 Analog in, GPIO | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 22K |
#### Module Pin 36 (TX)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 36 | 36 |
| &nbsp; | Pin Name | TX | TX |
| &nbsp; | Pin Alternate Name | D9 | D9 |
| ∆ | Description | Serial TX, GPIO | Serial TX, PWM, GPIO, SPI1 MOSI |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 37 (A3)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 37 | 37 |
| &nbsp; | Pin Name | A3 | A3 |
| &nbsp; | Pin Alternate Name | D16 | D16 |
| &nbsp; | Description | A3 Analog in, GPIO | A3 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 38 (RX)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 38 | 38 |
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
#### Module Pin 39 (AGND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 39|
| Pin Name | AGND|
| Description | Analog Ground.|
#### Module Pin 40 (D3)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 40 | 40 |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | UART serial | CTS. Use Serial1 object. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | SS. Use SPI1 object. |
| ∆ | I2C interface | SCL. Use Wire1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 41 (A4)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 41 | 41 |
| &nbsp; | Pin Name | A4 | A4 |
| &nbsp; | Pin Alternate Name | D15 | D15 |
| &nbsp; | Description | A4 Analog in, GPIO | A4 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 42 (D2)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 42 | 42 |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | UART serial | RTS. Use Serial1 object. | RTS. Use Serial1 object. |
| &nbsp; | SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| ∆ | I2C interface | SDA. Use Wire1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 43 (A5)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 43 | 43 |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO | A5 Analog in, PWM, GPIO, shared with pin 53 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 44 (CELL USBD+)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | CELL USBD+|
| Description | Cellular Modem USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 45 (A6)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 45 | 45 |
| &nbsp; | Pin Name | A6 | A6 |
| ∆ | Pin Alternate Name | n/a | D29 |
| ∆ | Description | A6 Analog in, PWM, GPIO | A6 Analog in, GPIO, PWM, SWCLK, M.2 eval PMIC INT, shared with pin 53 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 46 (CELL USBD-)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | CELL USBD-|
| Description | Cellular Modem USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 47 (A7)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 47 | 47 |
| &nbsp; | Pin Name | A7 | A7 |
| ∆ | Pin Alternate Name | n/a | WKP |
| ∆ | Description | A7 Analog in, GPIO, Ethernet Reset | A7 Analog In, WKP, GPIO D28 |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | A0, A1, A6, and A7 must have the same frequency. | No |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 48 (D8)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 48 | 48 |
| &nbsp; | Pin Name | D8 | D8 |
| ∆ | Description | GPIO, SPI SS, Ethernet CS | D8 GPIO, SPI SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | Default SS for SPI. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 49 (AGND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 49|
| Pin Name | AGND|
| Description | Analog Ground.|
#### Module Pin 50 (MISO)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 50 | 50 |
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
#### Module Pin 51 (NC)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 51|
| Pin Name | NC|
#### Module Pin 52 (MOSI)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 52 | 52 |
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
#### Module Pin 53 (NC / A5)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 53 | 53 |
| ∆ | Pin Name | NC | A5 |
| ∆ | Pin Alternate Name | n/a | D14 |
| ∆ | Description | n/a | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 45 |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports analogRead | n/a | Yes |
| ∆ | Supports analogWrite (PWM) | n/a | Yes |
| ∆ | Supports tone | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### Module Pin 54 (SCK)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 54 | 54 |
| &nbsp; | Pin Name | SCK | SCK |
| &nbsp; | Pin Alternate Name | D13 | D13 |
| ∆ | Description | SPI SCK, GPIO | D13 GPIO, SPI SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### Module Pin 55 (NC / D27)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 55 | 55 |
| ∆ | Pin Name | NC | D27 |
| ∆ | Description | n/a | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | SWD interface | n/a | SWDIO. 40K pull-up at boot. |
| ∆ | Signal used at boot | n/a | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### Module Pin 56 (GND)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 56|
| Pin Name | GND|
| Description | Ground.|
#### Module Pin 57 (NC)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 57|
| Pin Name | NC|
#### Module Pin 58 (NC / D24)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 58 | 58 |
| ∆ | Pin Name | NC | D24 |
| ∆ | Description | n/a | D24 GPIO, Serial2 TX, do not pull down at boot |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | UART serial | n/a | TX. Use Serial2 object. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### Module Pin 59 (NC / D26)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 59 | 59 |
| ∆ | Pin Name | NC | D26 |
| ∆ | Description | n/a | D26 GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### Module Pin 60 (NC / D25)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 60 | 60 |
| ∆ | Pin Name | NC | D25 |
| ∆ | Description | n/a | GPIO25, Serial2 RX |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | UART serial | n/a | RX. Use Serial2 object. |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | 42K |
| ∆ | Signal used at boot | n/a | Goes high at boot |
#### Module Pin 61 (RGBR)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 61 | 61 |
| &nbsp; | Pin Name | RGBR | RGBR |
| &nbsp; | Description | RGB LED Red | RGB LED Red |
| ∆ | Signal used at boot | n/a | Low at boot triggers trap mode |
#### Module Pin 62 (D22)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 62 | 62 |
| &nbsp; | Pin Name | D22 | D22 |
| ∆ | Description | GPIO, Ethernet INT | D22 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 63 (RGBG)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 63|
| Pin Name | RGBG|
| Description | RGB LED Green|
#### Module Pin 64 (D23)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 64 | 64 |
| &nbsp; | Pin Name | D23 | D23 |
| ∆ | Description | GPIO | D23 GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 65 (RGBB)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 65|
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### Module Pin 66 (D4)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 66 | 66 |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | SPI1 MISO, PWM, GPIO | D4 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| ∆ | SPI interface | MISO. Use SPI1 object. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 67 (SIM_VCC)
| | Unchanged between B SoM and M SoM |
| :--- | :--- |
| Pin Number | 67|
| Pin Name | SIM_VCC|
| Description | Leave unconnected, 1.8V/3V SIM Supply Output from R410M.|
#### Module Pin 68 (D5)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 68 | 68 |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | PWM, GPIO | D5 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 69 (SIM_RST)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 69 | 69 |
| &nbsp; | Pin Name | SIM_RST | SIM_RST |
| ∆ | Description | Leave unconnected, 1.8V/3V SIM Reset Output from R410M. | Leave unconnected, 1.8V/3V SIM Reset Output from cellular modem. |
#### Module Pin 70 (D6)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 70 | 70 |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | PWM, GPIO | D6 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, and D6 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### Module Pin 71 (SIM_CLK)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 71 | 71 |
| &nbsp; | Pin Name | SIM_CLK | SIM_CLK |
| ∆ | Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M. | Leave unconnected, 1.8V/3V SIM Clock Output from cellular modem. |
#### Module Pin 72 (D7)
|   |   | B SoM | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Number | 72 | 72 |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | PWM, GPIO | D7 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |


{{!-- END do not edit content above, it is automatically generated--}}


## Software

### Wi-Fi configuration

Since the B SoM (cellular) does not have Wi-Fi support, if you wish to use Wi-Fi on the M SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.


### User firmware binary size

One major advantage of the M SoM is that user firmware binaries can be up to 2048 Kbytes.

On the B SoM (Device OS 3.1 and later), it's 256 Kbytes, or 128 Kbytes for older version of Device OS.

### Platform ID

The Platform ID of the msom (35, `PLATFORM_MSOM`) is different from that of the B SoM (23) because of the vastly different hardware. 

If you have a product based on the B SoM, you will need to create a separate product for devices using the M SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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
| pre      | 2023-10-03 | RK | Initial version |
|          | 2023-12-20 | RK | Additional notes for ADCs, D24, and D25 |
