---
title: Muon from Boron or Argon migration guide
columns: two
layout: commonTwo.hbs
description: Muon from Boron or Argon migration guide
---

# {{title}}

{{box op="start" cssClass="boxed warningBox"}}
This is a preliminary guide and is subject to change.
{{box op="end"}}

{{migration-guide leftImg="/assets/images/boron/boron-top.png" rightImg="/assets/images/m-series/muon-rendering-top.png"}}

<p class="attribution">Pictures are not the same scale</p>


## Hardware

### Module style

The Argon and Boron are pin-based modules that can be installed in solderless breadboard for prototyping, can be installed in a socket on your custom board, or soldered directly to your board. The modules are in Adafruit Feather form-factor. There are male header pins on the bottom.

The Muon is a larger development module and contains a Particle M-SoM mounted in a M.2 NGFF socket, a power supply, and various peripheral chips.

There is an expansion connector on the top of the Muon, 40 pins (2x20), 0.1" (2.54mm) pitch. An expansion card can be mounted directly on top pf the Muon ("a HAT"), or can be connected to a solderless breadboard using Dupont wires or ribbon cable. 

The expansion connector is mostly compatible with the Raspberry Pi expansion connector and some Pi HATs can be used on the Muon for expansion.

| Device | Inches | Millimeters (mm) |
| :--- | :--- | :--- |
| Argon/Boron | 0.9" x 2.0" | 22.86mm x 50.8mm |
| Muon | 2.2" x 3.35" | 56mm x 85mm |

You can use the Muon as a development module, or use it as a base for your you own product. 

{{imageOverlay src="/assets/images/m-series/muon-dims.png" alt="Dimensions" class="full-width"}}

<p class="attribution">Dimensions in millimeters (mm)</p>


### Radios

| Radio | Argon | Boron | M-SoM | Muon |
| :--- | :---: | :---: | :---: | :---: |
| Cellular | | &check; | &check; | &check; |
| Wi-Fi 2.4 GHz | &check; | | &check; | &check; |
| Wi-Fi 5 GHz |  | | &check; | &check; |
| BLE | &check; | &check; | &check; | &check; |
| LoRa | | | | &check; |


### Datasheets

- [Muon datasheet](/reference/datasheets/m-series/muon-datasheet/)
- [M-SoM datasheet](/reference/datasheets/m-series/msom-datasheet/)
- [Boron BRN404X datasheet](/reference/datasheets/b-series/brn404x-datasheet/)
- [Boron datasheet](/reference/datasheets/b-series/boron-datasheet/)
- [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)


## Certification

When migrating to a new device, re-certification is typically required. If you are using the standard Particle antennas 
you often only need to complete the less expensive unintentional radiator testing of your completed assembly, however 
in some cases intentional radiator testing could be required.

## Software differences

### User firmware binary size

One major advantage is that user firmware binaries can be up to 2048 Kbytes, instead of 256 Kbytes on Gen 3 devices using Device OS 3.1.0 or later.

### Available RAM

The Boron and Argon have around 80K of RAM available to user applications. The Muon and M-SoM has 3500K of available RAM.

### Flash file system

There is a 2 MB flash file system for storing user data. This is the same size as the Boron, B-SoM, and Argon. The Tracker has a 4 MB flash file system.

### USB Connector

The Argon and Boron have a USB Micro B connector.

The Muon has a USB C connector.

{{!-- BEGIN shared-blurb c3d00a89-9f50-4d63-bf29-c07645b09e8f --}}
You must use an actual USB-C port or USB-C power adapter to power the Muon by USB.

**A USB-A to USB-C cable will not power the Muon or charge the battery**

The reason is that the Muon uses USB-C PD to change the USB port voltage to 9V and request enough
current to power the Muon. 

When using a USB-2 or USB-3 port with USB-A to USB-C adapter cable, the USB port voltage cannot
be changed and the port will not be able to power the Muon.

Also beware of some wall adapters that have a USB-C cable, but do not support USB-C PD. Some
of these are advertised as Raspberry Pi power adapters, which only support 5V and cannot be used
to power the Muon.

See [Muon USB Power](/troubleshooting/guides/device-troubleshooting/muon-usb-power/) for more information.
{{!-- END shared-blurb --}}


### SWD/JTAG

The Muon has the same 10-pin (2x5) SWD/JTAG debugging connector as the Argon and Boron.

On the Muon and M-SoM, however, SWD is on the same pins as GPIO, so by default once user firmware boots, SWD is no longer available. This is the same as Gen 2 (STM32) but different than Gen 3 (nRF52840). Building a Debug build in Particle Workbench allows SWD to be used while user firmware is running, but you cannot use A4, A6, or D27 as GPIO when SWD is enabled in user firmware.

SWO (Serial Wire Output) is not supported on the RTL8722DM.

{{!-- BEGIN do not edit content below, it is automatically generated 64e4bc46-68b8-4974-a61e-ddeae080fd44 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 43 | A5 / D14 | A5 Analog in, PWM, GPIO, shared with pin 53 | SWCLK | PB[3] |
| 53 | A5 / D14 | A5 Analog in, PWM, GPIO, SWCLK, shared with pin 43 | SWCLK | PB[3] |
| 55 | D27 | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot | SWDIO | PA[27] |


{{!-- END do not edit content above, it is automatically generated--}}


### LiPo Battery and LI+ pin

The Boron and Argon have a 2-pin JST-PH connector for a 3.7V LiPo battery. The standard Particle battery is 1800 mAh, but other batteries are available up to 6000 mAh in a similar but larger form-factor.

The Muon has a 3-pin JST-PH for a 3.7V LiPo battery with a battery pack temperature sensor.

The Boron uses a full PMIC (bq24195) and fuel gauge (MAX17043). By including these features on your base board you can provide more full-featured operation on battery power than the Argon does.

The Argon uses a Torex XC6208A42 LiPo charge controller.

The Muon uses the same PMIC and fuel gauge chips as the Boron.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>

### 3V3

The Boron includes a built-in power supply. You must supply 3V3 and VCC (3V7) separately the M-SoM from your own power supply.

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

{{!-- BEGIN shared-blurb 09b8c1f0-e4f0-486b-8f53-5ec64fc00d6f --}}
In some cases, it may be necessary to add a supervisory/reset IC, such as the Richtek RT9818C or SG Micro SGM809-RXN3L/TR:

- If your power supply has a slew rate from 1.5V to 3.0V slower than 15 ms, a reset IC is required.
- If your power supply at power off cannot be guaranteed to drop below 0.3V before powering back up, a reset IC required.

See [supervisory reset](/reference/datasheets/m-series/msom-datasheet/#supervisory-reset) in the M-SoM datasheet, for additional information.
{{!-- END shared-blurb --}}


### EN pin

The Argon and Boron have EN pin which can shut down the Torex XC9258 3.3V regulator to power down the 3.3V supply to the Argon nRF52840 MCU and the ESP32 Wi-Fi coprocessor. A similar feature exists on the Boron, using a load switch to control the 3.3V power supply and the 3.7V cellular modem power supply.

This feature does not exist on the Muon.

### Land pattern

The Muon is not intended to be placed on a carrier board, so doesn't have a land pattern, per se.

The expansion connector dimensions can be found in the Muon datasheet, but the expansion connector is on the top of the Muon
and intended to be used with a small expansion card on top ("HAT") not with a bottom-mounted carrier, like the Argon or Boron.

### GPIO

{{imageOverlay src="/assets/images/m-series/muon-gpio.svg" alt="ADC pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 18b9d26a-9a58-48ee-98e5-c375ee7f15a5 --}}

| Boron Pin Name | Boron GPIO | Muon Pin | Muon Pin Name | Muon GPIO | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| A0 / D19 | &check; | 29 | A0 / D19 | &check; | GPIO5 |
| A1 / D18 | &check; | 31 | A1 / D18 | &check; | GPIO6 |
| A2 / D17 | &check; | 26 | A2 / D17 | &check; | GPIO7 (CE1) |
| A3 / D16 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A4 / D15 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A5 / D14 | &check; | 13 | A5 / D14 | &nbsp; | GPIO27 |
| &nbsp; | &nbsp; | 24 | A6 / D29 | &check; | GPIO8 (CE0) |
| D0 | &check; | 3 | D0 | &nbsp; | GPIO2 (SDA) |
| D1 | &check; | 5 | D1 | &nbsp; | GPIO3 (SCL) |
| D2 | &check; | 11 | D2 | &check; | GPIO17 |
| &nbsp; | &nbsp; | 40 | D20 | &check; | GPIO21 (PCM_DOUT) |
| &nbsp; | &nbsp; | 38 | D21 | &check; | GPIO20 (PCM_DIN) |
| &nbsp; | &nbsp; | 16 | D24 | &check; | GPIO23 |
| &nbsp; | &nbsp; | 18 | D25 | &check; | GPIO24 |
| &nbsp; | &nbsp; | 35 | D26 | &check; | GPIO19 (PCM_FS) |
| D3 | &check; | 36 | D3 | &check; | GPIO16 |
| D4 | &check; | 33 | D4 | &check; | GPIO13 (PWM1) |
| D5 | &check; | 32 | D5 | &check; | GPIO12 (PWM0) |
| D6 | &check; | 12 | D6 | &check; | GPIO18 (PCM_CLK) |
| D7 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D8 / WKP | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| &nbsp; | &nbsp; | 7 | IOEX_PA0 | &check; | GPIO4 (GPCKL0) |
| &nbsp; | &nbsp; | 37 | IOEX_PB7 | &check; | GPIO26 |
| MISO / D11 | &check; | 21 | MISO / D11 | &nbsp; | GPIO9 (MISO) |
| MOSI / D12 | &check; | 19 | MOSI / D12 | &nbsp; | GPIO10 (MOSI) |
| RX / D10 | &check; | 10 | RX / D10 | &check; | GPIO15 (RXD) |
| SCK / D13 | &check; | 23 | SCK / D13 | &nbsp; | GPIO11 (SCLK) |
| TX / D09 | &check; | 8 | TX / D9 | &check; | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

- Pin D8 is not available on the Muon expansion connector. It is used internally for the I/O expander interrupt.

### ADC

{{imageOverlay src="/assets/images/m-series/muon-adc.svg" alt="ADC pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 7569c844-d0ac-4468-b317-3c9c6d9b7198 --}}

| Boron Pin Name | Boron ADC | Muon Pin | Muon Pin Name | Muon ADC | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| A0 / D19 | &check; | 29 | A0 / D19 | &check; | GPIO5 |
| A1 / D18 | &check; | 31 | A1 / D18 | &check; | GPIO6 |
| A2 / D17 | &check; | 26 | A2 / D17 | &check; | GPIO7 (CE1) |
| A3 / D16 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A4 / D15 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A5 / D14 | &check; | 13 | A5 / D14 | &check; | GPIO27 |
| &nbsp; | &nbsp; | 24 | A6 / D29 | &check; | GPIO8 (CE0) |


{{!-- END do not edit content above, it is automatically generated--}}

- ADC inputs are single-ended and limited to 0 to 3.3V on both
- Resolution is 12 bits on both

{{!-- BEGIN shared-blurb 839d8427-884c-4e59-9eee-a267cc4b0e72 --}}
The ADCs on the M-SoM (RTL872x) have a lower impedance than other Particle device MCUs (nRF52, STM32F2xx). They require a stronger 
drive and this may cause issues when used with a voltage divider. This is particularly true for A7, which has an even lower impedance 
than other ADC inputs.

For signals that change slowly, such as NTC thermocouple resistance, you can add a 2.2 uF capacitor to the signal. 
For rapidly changing signals, a voltage follower IC can be used.
{{!-- END shared-blurb --}}

### Serial

{{imageOverlay src="/assets/images/m-series/muon-uart.svg" alt="UART pins" class="full-width"}}

{{!-- BEGIN do not edit content below, it is automatically generated 5bb5787d-980b-4cb7-8293-14ed6775d21b --}}

| Boron Pin Name | Boron Serial | Muon Pin | Muon Pin Name | Muon Serial | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| D2 | Serial1 RTS | 11 | D2 | Serial1 (RTS)  | GPIO17 |
| &nbsp; | &nbsp; | 16 | D24 | Serial2 (TX)  | GPIO23 |
| &nbsp; | &nbsp; | 18 | D25 | Serial2 (RX)  | GPIO24 |
| D3 | Serial1 CTS | 36 | D3 | Serial1 (CTS)  | GPIO16 |
| RX / D10 | Serial1 RX | 10 | RX / D10 | Serial1 (RX)  | GPIO15 (RXD) |
| TX / D09 | Serial1 TX | 8 | TX / D9 | Serial1 (TX) | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

- One additional UART serial port on the Muon/M-SoM


### SPI

{{imageOverlay src="/assets/images/m-series/muon-spi.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated bb723044-07c3-4cf6-819f-8a140213ec6b --}}

| Boron Pin Name | Boron SPI | Muon Pin | Muon Pin Name | Muon SPI | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| A1 / D18 | &nbsp; | 31 | A1 / D18 | SPI2 (MISO) | GPIO6 |
| A2 / D17 | &nbsp; | 26 | A2 / D17 | SPI2 (SCK) | GPIO7 (CE1) |
| A5 / D14 | SPI (SS) | 13 | A5 / D14 | &nbsp; | GPIO27 |
| D2 | SPI1 (SCK) | 11 | D2 | SPI1 (SCK) | GPIO17 |
| D3 | SPI1 (MOSI) | 36 | D3 | SPI1 (SS) | GPIO16 |
| D4 | SPI1 (MISO) | 33 | D4 | &nbsp; | GPIO13 (PWM1) |
| MISO / D11 | SPI (MISO) | 21 | MISO / D11 | SPI (MISO) | GPIO9 (MISO) |
| MOSI / D12 | SPI (MOSI) | 19 | MOSI / D12 | SPI (MOSI) | GPIO10 (MOSI) |
| RX / D10 | &nbsp; | 10 | RX / D10 | SPI1 (MISO) | GPIO15 (RXD) |
| SCK / D13 | SPI (SCK) | 23 | SCK / D13 | SPI (SCK) | GPIO11 (SCLK) |
| TX / D09 | &nbsp; | 8 | TX / D9 | SPI1 (MOSI) | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

If using an expansion card that requires SPI, generally the following pins are used. The pins `CE0` and `CE1` are generally used for SPI chip select on standard Raspberry Pi expansion cards.

{{!-- BEGIN do not edit content below, it is automatically generated e09ec63f-a037-4dac-b8ca-8038186e5515 --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 19 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | MOSI | 52 | PA[16] | GPIO10 (MOSI) |
| 21 | MISO / D11 | D11 GPIO, PWM, SPI MISO | MISO | 50 | PA[17] | GPIO9 (MISO) |
| 23 | SCK / D13 | D13 GPIO, SPI SCK | SCLK | 54 | PA[18] | GPIO11 (SCLK) |
| 24 | A6 / D29 | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT | CE0 | 45 | PB[7] | GPIO8 (CE0) |
| 26 | A2 / D17 | A2 Analog in, GPIO | CE1 | 35 | PB[6] | GPIO7 (CE1) |


{{!-- END do not edit content above, it is automatically generated--}}

Expansion cards GPIO10 (MOSI), GPIO9 (MISO), and GPIO11(SCLK) can only be used for SPI. They cannot be used for SPI because the SPI bus is used for internal peripherals on the Muon. You can, however, use GPIO8 (CE0) and GPIO7 (CE1) as GPIO.

### I2C

{{imageOverlay src="/assets/images/m-series/muon-i2c.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 202b1c57-447e-4821-b2f5-ef6f90407e49 --}}

| Boron Pin Name | Boron I2C | Muon Pin | Muon Pin Name | Muon I2C | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| D0 | Wire (SDA) | 3 | D0 | Wire (SDA) | GPIO2 (SDA) |
| D1 | Wire (SCL) | 5 | D1 | Wire (SCL) | GPIO3 (SCL) |


{{!-- END do not edit content above, it is automatically generated--}}

- You can generally have many devices on a single I2C bus.
- On the Muon, M-SoM, P2, and Photon 2, the only valid I2C clock speeds are `CLOCK_SPEED_100KHZ` and `CLOCK_SPEED_400KHZ`. Other speeds are not supported at this time.

If using an expansion card that requires I2C, generally the following pins are used on standard Raspberry Pi expansion cards.

{{!-- BEGIN do not edit content below, it is automatically generated 8b0e89b2-549c-47a2-bb14-bfb86825687b --}}

| Pin | Pin Name | Description | Interface | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| 3 | D0 | I2C SDA | SDA | 22 | PB[0] | GPIO2 (SDA) |
| 5 | D1 | I2C SCL | SCL | 20 | PA[31] | GPIO3 (SCL) |


{{!-- END do not edit content above, it is automatically generated--}}


The Argon/Boron and M-SoM use D0/D1 for SDA/SCL. 

Raspberry Pi GPIO2 and GPIO3 can only be used as I2C, not as GPIO, This is because the I2C is also used for peripherals on the Muon. You cannot use these I2C addresses on expansion cards as they will conflict with built-in peripherals.

{{!-- BEGIN shared-blurb b22140c5-a3b4-4295-bd72-ae892dc637cf --}}
| I2C Address | Peripheral |
| :--- | :--- |
| 0x28 | STUSB4500 USB-C power controller |
| 0x36 | MAX17043 Fuel Gauge |
| 0x48 | TMP112A temperature sensor |
| 0x61 | KG200Z LoRaWAN radio |
| 0x69 | AM1805 RTC/Watchdog |
| 0x6B | bq24195 PMIC |
{{!-- END shared-blurb --}}



### PWM

{{imageOverlay src="/assets/images/m-series/muon-pwm.svg" alt="GPIO pins" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 7ccd5b6d-7fac-406d-9245-8a0659e3b746 --}}

| Boron Pin Name | Boron PWM | Muon Pin | Muon Pin Name | Muon PWM | Raspberry Pi |
| :--- | :--- | :---: | :--- | :--- | :--- |
| A0 / D19 | &check; | 29 | A0 / D19 | &check; | GPIO5 |
| A1 / D18 | &check; | 31 | A1 / D18 | &check; | GPIO6 |
| A2 / D17 | &check; | 26 | A2 / D17 | &nbsp; | GPIO7 (CE1) |
| A3 / D16 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A4 / D15 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| A5 / D14 | &check; | 13 | A5 / D14 | &check; | GPIO27 |
| &nbsp; | &nbsp; | 24 | A6 / D29 | &check; | GPIO8 (CE0) |
| D2 | &check; | 11 | D2 | &nbsp; | GPIO17 |
| D3 | &check; | 36 | D3 | &nbsp; | GPIO16 |
| D4 | &check; | 33 | D4 | &check; | GPIO13 (PWM1) |
| D5 | &check; | 32 | D5 | &check; | GPIO12 (PWM0) |
| D6 | &check; | 12 | D6 | &check; | GPIO18 (PCM_CLK) |
| D7 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D8 / WKP | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| MISO / D11 | &nbsp; | 21 | MISO / D11 | &check; | GPIO9 (MISO) |
| MOSI / D12 | &nbsp; | 19 | MOSI / D12 | &check; | GPIO10 (MOSI) |
| RX / D10 | &nbsp; | 10 | RX / D10 | &check; | GPIO15 (RXD) |
| TX / D09 | &nbsp; | 8 | TX / D9 | &check; | GPIO14 (TXD) |


{{!-- END do not edit content above, it is automatically generated--}}

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated c9e7a163-b53c-4c4f-81ff-f84ec7344a0c --}}

| Pin | Pin Name | Description | M2 Pin | MCU | Raspberry Pi |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 13 | A5 / D14 | SWCLK. 40K pull-down at boot. | 43 | PB[3] | GPIO27 |
| 15 | D27 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | 55 | PA[27] | GPIO22 |
| 16 | D24 | Low at boot triggers ISP flash download | 58 | PA[7] | GPIO23 |
| 18 | D25 | Goes high at boot | 60 | PA[8] | GPIO24 |


{{!-- END do not edit content above, it is automatically generated --}}

### NFC

The Muon and M-SoM do not support NFC. 

The Boron and Argon support NFC Tag mode.

### Sleep

- In `HIBERNATE` sleep mode, the Muon/M-SoM can only be wakened via the `WKP` pin, but the Boron and Argon can be wakened by any pin.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the Muon, M-SoM, Boron, and Argon can be wakened by any pin.

- In `HIBERNATE` sleep mode, the Muon/M-SoM puts `OUTPUT` pins into high-impedance state. The Boron and Argon preserve the digital level.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the Muon, M-SoM, Boron, and Argon preserve the digital output

- In `HIBERNATE` sleep mode, on the Muon/M-SoM, pin D21 does not maintain `INPUT_PULLUP` or `INPUT_PULLDOWN` while asleep.

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 36 | TX / D9 | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK | Pin can wake from HIBERNATE sleep | PA[12] |
| 38 | RX / D10 | Serial RX, PWM, GPIO, SPI1 MISO | Pin can wake from HIBERNATE sleep | PA[13] |
| 40 | D3 | D3 GPIO, Serial1 CTS flow control (optional), SPI1 SS | Pin can wake from HIBERNATE sleep | PA[15] |
| 42 | D2 | D2 GPIO, Serial RTS flow control (optional), SPI1 SCK | Pin can wake from HIBERNATE sleep | PA[14] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Pin can wake from HIBERNATE sleep | PA[20] |
| 48 | D8 | D8 GPIO, SPI SS | Pin can wake from HIBERNATE sleep | PA[19] |
| 50 | MISO / D11 | D11 GPIO, PWM, SPI MISO | Pin can wake from HIBERNATE sleep | PA[17] |
| 52 | MOSI / D12 | D12 GPIO, PWM, SPI MOSI | Pin can wake from HIBERNATE sleep | PA[16] |
| 54 | SCK / D13 | D13 GPIO, SPI SCK | Pin can wake from HIBERNATE sleep | PA[18] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Full comparison


{{!-- BEGIN do not edit content below, it is automatically generated a92768ab-8aea-4c68-8223-c1a6636141f8 --}}

#### 3V3
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 1000 mA | 3.3V power to expansion card |
#### 5V
| | Added to Muon |
| :--- | :--- |
| Pin Name | 5V|
| Description | 5V power to expansion card|
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
| ∆ | SPI interface | n/a | MISO. Use SPI2 object. |
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
| ∆ | SPI interface | n/a | SCK. Use SPI2 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 22K |
#### A3
| | Removed from Boron |
| :--- | :--- |
| Pin Name | A3|
| Pin Alternate Name | D16|
| Description | A3 Analog in, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | A0, A1, A2, and A3 must have the same frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### A4
| | Removed from Boron |
| :--- | :--- |
| Pin Name | A4|
| Pin Alternate Name | D15|
| Description | A4 Analog in, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | A4, A5, D2, and D3 must have the same frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### A5
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A5 | A5 |
| &nbsp; | Pin Alternate Name | D14 | D14 |
| ∆ | Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, PWM, GPIO, shared with pin 53 |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
| ∆ | Internal pull resistance | 13K | ??? |
| ∆ | SWD interface | n/a | SWCLK. 40K pull-down at boot. |
| ∆ | Signal used at boot | n/a | SWCLK. 40K pull-down at boot. |
#### A6
| | Added to Muon |
| :--- | :--- |
| Pin Name | A6|
| Pin Alternate Name | D29|
| Description | A6 Analog in, GPIO, PWM, M.2 eval PMIC INT|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | ???|
#### D0
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | I2C SDA, GPIO | I2C SDA |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
| ∆ | Internal pull resistance | 13K | ??? |
#### D1
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | I2C SCL, GPIO | I2C SCL |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
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
#### D20
| | Added to Muon |
| :--- | :--- |
| Pin Name | D20|
| Description | D20 GPIO, I2S TX|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| I2S interface | I2S TX|
| Internal pull resistance | ???|
#### D21
| | Added to Muon |
| :--- | :--- |
| Pin Name | D21|
| Description | D21 GPIO, I2S RX|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| I2S interface | I2S RX|
| Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
#### D22
| | Added to Muon |
| :--- | :--- |
| Pin Name | D22|
| Description | D22 GPIO|
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
| Description | D26 GPIO, I2S WS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| I2S interface | I2S WS|
| Internal pull resistance | ???|
#### D27
| | Added to Muon |
| :--- | :--- |
| Pin Name | D27|
| Description | D27 GPIO, SWDIO (SWD_DATA), do not pull down at boot|
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
| ∆ | Description | PWM, GPIO | D5 GPIO, PWM, I2S TX |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S TX |
| ∆ | Internal pull resistance | 13K | ??? |
#### D6
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | PWM, GPIO | D6 GPIO, PWM, I2S CLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | D4, D5, D6, and D7 must have the same frequency. | Yes |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S CLK |
| ∆ | Internal pull resistance | 13K | ??? |
#### D7
| | Removed from Boron |
| :--- | :--- |
| Pin Name | D7|
| Description | PWM, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### D8
| | Removed from Boron |
| :--- | :--- |
| Pin Name | D8|
| Pin Alternate Name | WKP|
| Description | GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | D4, D5, D6, and D7 must have the same frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### EN
| | Removed from Boron |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | GND | GND |
| ∆ | Description | Ground. | Ground |
#### IOEX_PA0
| | Added to Muon |
| :--- | :--- |
| Pin Name | IOEX_PA0|
| Description | n/a|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
#### IOEX_PB7
| | Added to Muon |
| :--- | :--- |
| Pin Name | IOEX_PB7|
| Description | n/a|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
#### LI+
| | Removed from Boron |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MISO | MISO |
| &nbsp; | Pin Alternate Name | D11 | D11 |
| ∆ | Description | SPI MISO, GPIO | D11 GPIO, PWM, SPI MISO |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### MODE
| | Removed from Boron |
| :--- | :--- |
| Pin Name | MODE|
| Description | MODE button, has internal pull-up|
#### MOSI
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MOSI | MOSI |
| &nbsp; | Pin Alternate Name | D12 | D12 |
| ∆ | Description | SPI MOSI, GPIO | D12 GPIO, PWM, SPI MOSI |
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### NC27
| | Added to Muon |
| :--- | :--- |
| Pin Name | NC27|
| Description | n/a|
#### NC28
| | Added to Muon |
| :--- | :--- |
| Pin Name | NC28|
| Description | n/a|
#### RST
| | Removed from Boron |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
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
| ∆ | Supports digitalRead | Yes | n/a |
| ∆ | Supports digitalWrite | Yes | n/a |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | n/a |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### TX
|   |   | Boron | Muon |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D09 | D9 |
| ∆ | Description | Serial TX, GPIO | Serial TX, PWM, GPIO, SPI1 MOSI, I2S MCLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | I2S interface | n/a | I2S MCLK |
| ∆ | Internal pull resistance | 13K | 2.1K |
#### VUSB
| | Removed from Boron |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|


{{!-- END do not edit content above, it is automatically generated--}}

## Software

### Wi-Fi configuration

Since the Boron (cellular) does not have Wi-Fi support, if you wish to use Wi-Fi on the Muon/M-SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.


### User firmware binary size

One major advantage of the Muon/M-SoM is that user firmware binaries can be up to 2048 Kbytes.

On the B-SoM (Device OS 3.1 and later), it's 256 Kbytes, or 128 Kbytes for older version of Device OS.

### Platform ID

The Platform ID of the msom (35, `PLATFORM_MSOM`) is different from that of the Boron (13) because of the vastly different hardware. Note that Muon and M-SoM share a platform ID.

If you have a product based on the Boron, you will need to create a separate product for devices using the M-SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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
|          | 2024-05-08 | RK | Update for schematic 0.4R1 |
|          | 2024-05-14 | RK | Update for schematic 0.4R4 |
|          | 2024-05-21 | RK | Update for dimensions |
|          | 2024-08-04 | RK | Pinmap 0.05 |
|  1       | 2024-10-22 | RK | Initial release |
|  2       | 2025-01-07 | RK | Added power supply notes |
