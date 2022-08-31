---
title: Photon 2 datasheet
layout: commonTwo.hbs
columns: two
description: Datasheet for the Particle Photon 2, Wi-Fi development module
---

# Photon 2 Datasheet <sup>(pre)</sup>

**Preliminary pre-release version 2022-05-04**

{{box op="start" cssClass="boxed warningBox"}}
This is an preliminary pre-release datasheet and the contents are subject to change. The Photon 2 design has not been finalized so changes are likely.
{{box op="end"}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/photon-2-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

![Photon 2 Rendering](/assets/images/photon2-rendering.png)

## Functional description

### Overview

The Photon 2 is a development module with a microcontroller and Wi-Fi networking. The form-factor is similar to the Argon (Adafruit Feather), but
the Photon 2 supports 2.4 GHz and 5 GHz Wi-Fi, BLE, and has much larger RAM and flash that can support larger applications.

It is intended to replace both the Photon and Argon modules. It contains the same module as the P2, making it easier to migrate from a pin-based development module to a SMD mass-production module if desired.

### Features

- 802.11a/b/g/n Wi-Fi, 2.4 GHz and 5 GHz
  - Integrated PCB antenna
  - Integrated U.FL connector for external antenna
  - Integrated RF switch
- BLE 5 using same antenna as Wi-Fi
- Realtek RTL8721DM MCU
  - ARM Cortex M23 CPU, 200 MHz
- 2048 KB (2 MB) user application maximum size
- 2 MB flash file system
- FCC, IC, and CE certified


## Interfaces

### Block Diagram

{{imageOverlay src="/assets/images/photon2-block-diagram.png" alt="Block Diagram" class="full-width"}}

### Power

#### USB
The USB port is the easiest way to power up the Photon 2. Please make sure that the USB port is able to provide at least 500mA. The Photon 2 has a micro B connector, same as the Photon.

#### VUSB Pin
The pin is internally connected to the VBUS of the USB port. The nominal output should be around 4.5 to 5 VDC when the device is plugged into the USB port and 0 when not connected to a USB source. You can use this pin to power peripherals that operate at such voltages. Do not exceed the current rating of the USB port, which is nominally rated to 500mA.  This pin is also protected with an internal fuse rated at 1000mA.

It is also possible to use the VUSB to power the Photon 2 if not using the USB port. 

#### LiPo
If you want to make your projects truly wireless, you can power the device with a single cell LiPo (3.7V). The Photon 2 has an on board LiPo charger that will charge and power the device when USB source is plugged in or power the device from the LiPo alone in the absence of the USB.

{{box op="start" cssClass="boxed warningBox"}}
**NOTE:**
Please pay attention to the polarity of the JST-PH LiPo connector. Not all LiPo batteries follow the same polarity convention!
{{box op="end"}}

![LiPo Polarity](/assets/images/lipo-polarity.png)

#### Li+ PIN
This pin is internally connected to the positive terminal of the LiPo connector. You can connect a single cell LiPo/Lithium Ion or a DC supply source to this pin for powering the Argon. Remember that the input voltage range on this pin is 3.6 to 4.2 VDC. 

#### 3V3 PIN
This pin is the output of the on board 3.3V step-down switching regulator. The regulator is rated at 500mA max. When using this pin to power other devices or peripherals remember to budget in the current requirement of the Argon first. This pin can also be used to power the Argon in absence of the USB or LiPo power. When powering over this pin, please connect the ENABLE pin to GND so that the on board regulator is disabled.

#### EN PIN

The **EN** pin is not a power pin, per se, but it controls the 3V3 power. The EN pin is pulled high by a 100K resistor to the higher of VUSB, the micro USB connector, or Li+. Because the pull-up can result in voltages near 5V you should never directly connect EN to a 3.3V GPIO pin. Instead, you should only pull EN low, such as by using an N-channel MOSFET or other open-collector transistor.

The EN pin can force the device into a deep power-down state where it uses very little power. It also can used to assure that the device is completely reset, similar to unplugging it, with one caveat:

If using the EN pin to deeply reset the device, you must be careful not to allow leakage current back into the nRF52 MCU by GPIO or by pull-ups to 3V3. If you only power external devices by 3V3 you won't run into this, as 3V3 is de-powered when EN is low. 

However, if you have circuitry that is powered by a separate, external power supply, you must be careful. An externally powered circuit that drives a nRF52 GPIO high when EN is low can provide enough current to keep the nRF52 from powering down and resetting. Likewise, a pull-up to an external power supply can do the same thing. Be sure that in no circumstances can power by supplied to the nRF52 when 3V3 is de-powered.

### Antenna

- The Photon 2 includes an on-module PCB trace antenna and a U.FL connector that allows the user to connect an external antenna.
- The antenna is selected in software. The default is the PCB trace antenna.
- A single antenna is used for both Wi-Fi and BLE.

### FCC Approved Antennas

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| Dipole antenna | LumenRadio | 104-1001 | 2.15dBi |
| PCB Antenna | Included | - | - |

---

### SWD/JTAG

The Photon 2 module supports programming and debugging use SWD (Serial Wire Debug) using the 10-pin micro JTAG connector on the top of the module.

When the bootloader starts, for a brief period of time a weak pull-up is applied to pin D8 and pull-down to pin D6 to detect whether a SWD debugger is attached. After boot, you can use these pins for regular GPIO, but beware of a possible GPIO state change caused by the pull-up or pull-down when using these pins as output.

| Pin   | JTAG   | MCU Pin| Pull at boot |
| :---: | :----: | :----: | :----------: |
| D8    | SWDIO  | PA[27] | Pull-up      |
| D6    | SWCLK  | PB[3]  | Pull-down    |
| 3V3   | Power  |        |              |
| GND   | Ground |        |              |
| RST   | Reset  |        |              |


![SWD Debug Connector](/assets/images/argon/swd-connector-pinout.png)


### LED status

#### System RGB LED
For a detailed explanation of different color codes of the RGB system LED, please take a look [here.](/troubleshooting/led/)

#### Charge status LED

|State | Description |
|:---|:---|
|ON | Charging in progress |
|OFF | Charging complete |

---

## Memory Map

### Flash Layout Overview

[To be provided at a later date.]

### DCT Layout

[This information is from the P1, and is likely to remain the same, but is subject to change.]

The DCT area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCT layout in `release/stable`_ <a href="https://github.com/particle-iot/device-os/blob/release/v2.x/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

| Region | Offset | Size |
|:---|---|---|
| system flags | 0 | 32 |
| version | 32 | 2 |
| device private key | 34 | 1216 |
| device public key | 1250 | 384 |
| ip config | 1634 | 120 |
| feature flags | 1754 | 4 |
| country code | 1758 | 4 |
| claim code | 1762 | 63 |
| claimed | 1825 | 1 |
| ssid prefix | 1826 | 26 |
| device code | 1852 | 6 |
| version string | 1858 | 32 |
| dns resolve | 1890 | 128 |
| reserved1 | 2018 | 64 |
| server public key | 2082 | 768 |
| padding | 2850 | 2 |
| flash modules | 2852 | 100 |
| product store | 2952 | 24 |
| antenna selection | 2976 | 1 |
| cloud transport | 2977 | 1 |
| alt device public key | 2978 | 128 |
| alt device private key | 3106 | 192 |
| alt server public key | 3298 | 192 |
| alt server address | 3490 | 128 |
| device id | 3618 | 12 |
| radio flags | 3630 | 1 |
| mode button mirror | 3631 | 32 |
| led mirror | 3663 | 96 |
| led theme | 3759 | 64 |
| reserved2 | 3823 | 435 |

**Note:** Writing 0xFF to offset 34 (DEFAULT) or 3106 (ALTERNATE) will cause the device to re-generate a new private key on the next boot. Alternate keys are currently unsupported on the P1 but are used on the Electron as UDP/ECC keys.  You should not need to use this feature unless your keys are corrupted.

```
// Regenerate Default Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 34 -D fillbyte
// Regenerate Alternate Keys
echo -en "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 3106 -D fillbyte
```

### Memory Map

[To be provided at a later date.]

---

## Pin and button definition


| Peripheral Type | Qty | Input(I) / Output(O) |
| :-:|:-:|:-:|
| Digital | 20 | I/O |
| Analog (ADC) | 6 | I |
| SPI | 2 | I/O |
| I2C | 1 | I/O |
| UART | 3 | I/O |
| USB | 1 | I/O |
| PWM | 6 | O |


### Pin markings

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Pinout Diagram" class="full-width"}}

### GPIO and port listing

{{!-- BEGIN do not edit content below, it is automatically generated ed19d7a3-f59d-4eec-85ba-2f67859e87b2 --}}

| Pin Name |   |   |   |   | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 / D11 | ADC_4 | &nbsp; | &nbsp; | &nbsp; | PB[1] |
| A1 / D12 | ADC_5 | &nbsp; | &nbsp; | &nbsp; | PB[2] |
| A2 / D13 | ADC_3 | &nbsp; | &nbsp; | &nbsp; | PB[7] |
| A5 / D14 | ADC_0 | &nbsp; | &nbsp; | &nbsp; | PB[4] |
| D0 / A3 | ADC_2 | Wire (SDA) | &nbsp; | &nbsp; | PB[6] |
| D1 / A4 | ADC_1 | Wire (SCL) | &nbsp; | &nbsp; | PB[5] |
| D10 / WKP | &nbsp; | &nbsp; | &nbsp; | Serial3 (CTS) | PA[15] |
| D2 | &nbsp; | &nbsp; | SPI1 (MOSI) | Serial2 (RTS) | PA[16] |
| D3 | &nbsp; | &nbsp; | SPI1 (MISO) | Serial2 (CTS) | PA[17] |
| D4 | &nbsp; | &nbsp; | SPI1 (SCK) | Serial2 (TX) | PA[18] |
| D5 | &nbsp; | &nbsp; | SPI1 (SS) | Serial2 (RX) | PA[19] |
| D6 | &nbsp; | SWCLK | &nbsp; | &nbsp; | PB[3] |
| D7 | &nbsp; | SWDIO | &nbsp; | &nbsp; | PA[27] |
| MISO / D16 | &nbsp; | &nbsp; | SPI (MISO) | Serial3 (RX) | PA[13] |
| MOSI / D15 | &nbsp; | &nbsp; | SPI (MOSI) | Serial3 (TX) | PA[12] |
| RX / D9 | &nbsp; | &nbsp; | &nbsp; | Serial1 (RX)  | PA[8] |
| S3 / D18 | &nbsp; | &nbsp; | SPI (SS) | &nbsp; | PB[26] |
| S4 / D19 | &nbsp; | &nbsp; | &nbsp; | &nbsp; | PA[0] |
| SCK / D17 | &nbsp; | &nbsp; | SPI (SCK) | Serial3 (RTS) | PA[14] |
| TX / D8 | &nbsp; | &nbsp; | &nbsp; | Serial1 (TX) | PA[7] |


{{!-- END do not edit content above, it is automatically generated --}}

### ADC (Analog to Digital Converter)

The Photon 2 supports six ADC inputs.

{{!-- BEGIN do not edit content below, it is automatically generated 2e0292c9-3489-40dd-b411-1a1ad8e5bb81 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| A0 / D11 | A0 Analog in, GPIO | ADC_4 | PB[1] |
| A1 / D12 | A1 Analog in, GPIO | ADC_5 | PB[2] |
| A2 / D13 | A2 Analog in, GPIO, PWM. | ADC_3 | PB[7] |
| A5 / D14 | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. | ADC_0 | PB[4] |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | ADC_2 | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | ADC_1 | PB[5] |


{{!-- END do not edit content above, it is automatically generated --}}

- ADC inputs are single-ended and limited to 0 to 3.3V
- Resolution is 12 bits

### UART serial

The Photon 2 supports three UART serial interfaces. 

{{!-- BEGIN do not edit content below, it is automatically generated f0b0b5df-84bf-400d-a833-1dd3276ca910 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| SCK / D17 | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS | Serial3 (RTS) | PA[14] |
| MOSI / D15 | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX | Serial3 (TX) | PA[12] |
| MISO / D16 | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. | Serial3 (RX) | PA[13] |
| RX / D9 | Serial1 RX (received data), GPIO | Serial1 (RX)  | PA[8] |
| TX / D8 | Serial1 TX (transmitted data), GPIO | Serial1 (TX) | PA[7] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | Serial2 (RTS) | PA[16] |
| D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | Serial2 (CTS) | PA[17] |
| D4 | D4 GPIO, Serial2 TX, SPI1 SCK | Serial2 (TX) | PA[18] |
| D5 | D5 GPIO, Serial2 RX, SPI1 SS | Serial2 (RX) | PA[19] |
| D10 / WKP | D10 GPIO. Serial3 CTS. Was D8 on Gen 3. | Serial3 (CTS) | PA[15] |


{{!-- END do not edit content above, it is automatically generated --}}

- The UART pins are 3.3V and must not be connected directly to a RS-232C port or to a 5V TTL serial port
- Hardware flow control is optional; if not used then the RTS and CTS pins can be used as regular GPIO
- Serial1 uses the RTL872x UART_LOG peripheral
- Serial2 uses the RTL872x HS_UART0 peripheral
- Serial3 uses the RTL872x LP_UART peripheral
- Supported baud rates: 110, 300, 600, 1200, 9600, 14400, 19200, 28800, 38400, 57600, 76800, 115200, 128000, 153600, 230400, 500000, 921600, 1000000, 1382400, 1444400, 1500000, 1843200, 2000000, 2100000, 2764800, 3000000, 3250000, 3692300, 3750000, 4000000, 6000000

### SPI

The Photon 2 supports two SPI (serial peripheral interconnect) ports.

{{!-- BEGIN do not edit content below, it is automatically generated 90d1c896-32b3-4211-9d62-24d356098f29 --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| S3 / D18 | S3 GPIO, SPI SS, Was A5 on Gen 3. | SPI (SS) | PB[26] |
| SCK / D17 | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS | SPI (SCK) | PA[14] |
| MOSI / D15 | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX | SPI (MOSI) | PA[12] |
| MISO / D16 | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. | SPI (MISO) | PA[13] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | SPI1 (MOSI) | PA[16] |
| D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | SPI1 (MISO) | PA[17] |
| D4 | D4 GPIO, Serial2 TX, SPI1 SCK | SPI1 (SCK) | PA[18] |
| D5 | D5 GPIO, Serial2 RX, SPI1 SS | SPI1 (SS) | PA[19] |


{{!-- END do not edit content above, it is automatically generated 90d1c896-32b3-4211-9d62-24d356098f29 --}}

- The SPI port is 3.3V and must not be connected directly to devices that drive MISO at 5V
- If not using a SPI port, its pins can be used as GPIO
- Any pins can be used as the SPI chip select
- Multiple devices can generally share a single SPI port
- SPI uses the RTL872x SPI1 peripheral (25 MHz maximum speed)
- SPI1 uses the RTL872x SPI0 peripheral (50 MHz maximum speed)


### I2C

The Photon 2 supports one I2C (two-wire serial interface) port.

{{!-- BEGIN do not edit content below, it is automatically generated 136ece09-1c16-422d-8078-8c5fc47cf23e --}}

| Pin Name | Description | Interface | MCU |
| :--- | :--- | :--- | :--- |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | Wire (SDA) | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | Wire (SCL) | PB[5] |


{{!-- END do not edit content above, it is automatically generated --}}

- The I2C port is 3.3V and must not be connected directly a 5V I2C bus
- Maximum bus speed is 400 kHz
- External pull-up resistors are required for I2C
- If not using I2C, pins D0 and D1 can be used as GPIO

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated 2eae4165-6d66-49cc-b8ec-0e564c0f7a9e --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 15 | TX / D8 | Low at boot triggers ISP flash download | PA[7] |
| 22 | D6 | SWCLK. 40K pull-down at boot. | PB[3] |
| 23 | D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | PA[27] |


{{!-- END do not edit content above, it is automatically generated --}}

### BLE (Bluetooth LE)

{{!-- P2 BLE Central Warning --}}

The Photon 2 only supports BLE 5 peripheral mode at this time. BLE central mode is not currently supported.


### Pins Photon 2 vs. P2

The pins on the Photon 2 map directly the pins with the same name on the P2.

{{!-- BEGIN do not edit content below, it is automatically generated 7c78e07c-4e5a-43a6-8c61-d9a322871bd8 --}}

| Photon 2 Pin Name | Photon 2 Description | P2 Pin Name | P2 Description | P2 Pin Number | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 / D11 | A0 Analog in, GPIO | A0 / D11 | A0 Analog in, GPIO | 50 | PB[1] |
| A1 / D12 | A1 Analog in, GPIO | A1 / D12 | A1 Analog in, GPIO | 43 | PB[2] |
| A2 / D13 | A2 Analog in, GPIO, PWM. | A2 / D13 | A2 Analog in, PWM, GPIO | 49 | PB[7] |
| A5 / D14 | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. | A5 / D14 | A5 Analog in, GPIO, PWM. | 23 | PB[4] |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | 36 | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | 35 | PB[5] |
| D10 / WKP | D10 GPIO. Serial3 CTS. Was D8 on Gen 3. | D10 / WKP | D10 GPIO, Serial 3 CTS. (Was WKP/A7 on P1.) | 30 | PA[15] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | 45 | PA[16] |
| D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | 51 | PA[17] |
| D4 | D4 GPIO, Serial2 TX, SPI1 SCK | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | 52 | PA[18] |
| D5 | D5 GPIO, Serial2 RX, SPI1 SS | D5 | D5 GPIO, Serial2 RX, SPI1 SS | 53 | PA[19] |
| D6 | D6 GPIO, SWCLK. | D6 | D6 GPIO, SWCLK | 55 | PB[3] |
| D7 | D7 GPIO, Blue LED, SWDIO | D7 | D7 GPIO, SWDIO | 54 | PA[27] |
| MISO / D16 | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | 41 | PA[13] |
| MODE | MODE button, has internal pull-up | MODE | MODE button. Pin number constant is BTN. External pull-up required! | 46 | PA[4] |
| MOSI / D15 | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | 40 | PA[12] |
| RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | 34 | CHIP_EN |
| RX / D9 | Serial1 RX (received data), GPIO | RX / D9 | Serial1 RX (received data), GPIO | 63 | PA[8] |
| S3 / D18 | S3 GPIO, SPI SS, Was A5 on Gen 3. | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS | 44 | PB[26] |
| S4 / D19 | S4 GPIO, Was A4 on Gen 3. | S4 / D19 | S4 GPIO. (Was P1S4 on P1.) | 47 | PA[0] |
| SCK / D17 | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | 42 | PA[14] |
| TX / D8 | Serial1 TX (transmitted data), GPIO | TX / D8 | Serial1 TX (transmitted data), GPIO | 64 | PA[7] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Complete pin listing

{{!-- BEGIN do not edit content below, it is automatically generated e9628714-d248-4806-897f-189eef8d4352 --}}

| Pin Name | Description | MCU |
| :--- | :--- | :--- |
| RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | CHIP_EN |
| 3V3 | Regulated 3.3V DC output, maximum load 500 mA | &nbsp; |
| MODE | MODE button, has internal pull-up | PA[4] |
| GND | Ground. | &nbsp; |
| A0 / D11 | A0 Analog in, GPIO | PB[1] |
| A1 / D12 | A1 Analog in, GPIO | PB[2] |
| A2 / D13 | A2 Analog in, GPIO, PWM. | PB[7] |
| A5 / D14 | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. | PB[4] |
| S4 / D19 | S4 GPIO, Was A4 on Gen 3. | PA[0] |
| S3 / D18 | S3 GPIO, SPI SS, Was A5 on Gen 3. | PB[26] |
| SCK / D17 | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS | PA[14] |
| MOSI / D15 | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX | PA[12] |
| MISO / D16 | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. | PA[13] |
| RX / D9 | Serial1 RX (received data), GPIO | PA[8] |
| TX / D8 | Serial1 TX (transmitted data), GPIO | PA[7] |
| D0 / A3 | D0 GPIO, PWM, I2C SDA, A3 Analog In | PB[6] |
| D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | PB[5] |
| D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | PA[16] |
| D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | PA[17] |
| D4 | D4 GPIO, Serial2 TX, SPI1 SCK | PA[18] |
| D5 | D5 GPIO, Serial2 RX, SPI1 SS | PA[19] |
| D6 | D6 GPIO, SWCLK. | PB[3] |
| D7 | D7 GPIO, Blue LED, SWDIO | PA[27] |
| D10 / WKP | D10 GPIO. Serial3 CTS. Was D8 on Gen 3. | PA[15] |
| VUSB | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. | &nbsp; |
| EN | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up. | &nbsp; |
| LI+ | Connected to JST PH LiPo battery connector. 3.7V in or out. | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


## Technical specification

### Absolute maximum ratings

[To be provided at a later date.]

### Recommended operating conditions

[To be provided at a later date.]

### Wi-Fi Specifications

[To be provided at a later date.]


### I/O Characteristics

[To be provided at a later date.]

## Mechanical specifications

### Dimensions and Weight

[To be provided at a later date.]

- The Photon 2 is designed to compliant with the Adafruit Feather form-factor (2.0" x 0.9")
- It has male header pins on the bottom of the module
- Unlike the Argon and Boron, the Photon 2 uses SMD pins on the bottom because the P2 module is too wide to fit between two rows of PTH pins 0.8" apart
- It will not be available in a "no headers" version as there are components on the bottom side of the board

### Mating connectors

The Photon 2 uses two single row 0.1" pitch male header pins. One of them is 16 pin while the other is 12 pin. It can be mounted with matching 0.1" pitch female headers with a typical height of 0.335" (8.5mm). When you search for parts like these it can be difficult to navigate the thousands of parts available online so here are a few good choices for the Photon 2 and Argon:

| Description | MFG | MFG Part Number |
|:----------- |:----|:----------------|
|16-pin 0.1" (2.54mm) Female Header|Sullins|PPTC161LFBN-RC|
|16-pin 0.1" (2.54mm) Female Header|TE|6-535541-4|
|12-pin 0.1" (2.54mm) Female Header|Sullins|PPTC121LFBN-RC|
|12-pin 0.1" (2.54mm) Female Header|TE|6-534237-0|

## Recommended PCB land pattern

The Photon 2 can be directly soldered onto the PCB or be mounted with the above mentioned female headers.

<div align=center><img src="/assets/images/argon/argon-landing-pattern.png" ></div>


### Overall dimensions

[To be provided at a later date.]

### Module Dimensions

[To be provided at a later date.]


## Ordering information

[To be provided at a later date.]

Photon 2 modules are available from [store.particle.io](https://store.particle.io/).

{{!-- BEGIN do not edit content below, it is automatically generated 097ba52c-0c46-4ec0-827d-3c5880d3fd3a --}}

| SKU | Description | Region | Lifecycle | Replacement |
| :--- | :--- | :--- | :--- | :--- |
| PHN2MEA | Photon 2, Kit [x1] | Global | In development | |
| PHN2MTY | Photon 2, Tray [x50] | Global | In development | |


{{!-- END do not edit content above, it is automatically generated  --}}


## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: [To be provided at a later date.]
-	IC: [To be provided at a later date.]

## Product handling

### Tape and Reel Info

[To be provided at a later date.]

### Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

## Default settings

The P2 module comes pre-programmed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the [Particle Web IDE](https://build.particle.io) to code, compile and flash a user application OTA (Over The Air). [Particle Workbench](/quickstart/workbench/) is a full-featured desktop IDE for Windows, Mac, and Linux based on VSCode and supports both cloud-based and local gcc-arm compiles. The [Particle CLI](/getting-started/developer-tools/cli/) provides a command-line interface for cloud-based compiles and flashing code over USB.

## Glossary

<div class="dictionary-wrapper">
<dd>Radio Frequency</dd>
<dt>SMT</dt>
<dd>Surface Mount Technology (often associated with SMD which is a surface mount device).</dd>
<dt>AP</dt>
<dd>Access Point</dd>
<dt>USB</dt>
<dd>Universal Serial Bus</dd>
<dt>Quiescent current</dt>
<dd>Current consumed in the deepest sleep state</dd>
<dt>FT</dt>
<dd>Five-tolerant; Refers to a pin being tolerant to 5V.</dd>
<dt>3V3</dt>
<dd>+3.3V; The regulated +3.3V supply rail.  Also used to note a pin is only 3.3V tolerant.</dd>
<dt>RTC</dt>
<dd>Real Time Clock</dd>
<dt>OTA</dt>
<dd>Over The Air; describing how firmware is transferred to the device.</dd>
</div>

## FCC IC CE Warnings and End Product Labeling Requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:
> Contains FCC ID: [To be provided at a later date]

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.

---

**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:
> Contains transmitter module IC: [To be provided at a later date]

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-03-02 | RK | Pre-release initial version |
|     | 2022-03-14 | RK | Minor edits; no functional changes |
|     | 2022-04-08 | RK | Added table comparing Photon 2 and P2 pins |
|     | 2022-04-12 | RK | Added serial baud rates |
|     | 2022-04-16 | RK | Major changes to pinmap to align with P2 |
|     | 2022-05-04 | RK | USB connector is micro B, not USB C |
|     | 2022-08-12 | RK | Added listing of pins used at boot |
|     | 2022-08-12 | RK | Warning about BLE central mode not available |
## Known Errata

## Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

https://support.particle.io
