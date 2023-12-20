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

{{migration-guide leftImg="/assets/images/boron/boron-top.png" rightImg="/assets/images/m-series/msom-top.png"}}

<p class="attribution">Pictures are not the same scale</p>


## Hardware

### Module style

The primary difference is that the Argon and Boron are pin-based modules that can be installed in solderless breadboard for prototyping, can be installed in a socket on your custom board, or soldered directly to your board.

![Argon](/assets/images/argon/argon-top.png)

The M SoM is a M.2 SoM that fits in a SMD mounted M.2 NGFF connector. It requires a base board and cannot be used on its own. The M.2 socket is not the same as the M.2 sockets used for flash memory in computers.


### Datasheets

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

The Boron and Argon have around 80K of RAM available to user applications. The M SoM has 3500K of available RAM.

### Flash file system

There is a 2 MB flash file system for storing user data. This is the same size as the Boron, B SoM, and Argon. The Tracker has a 4 MB flash file system.


### Status LED

The M SoM does not include a status LED on the module. We recommend adding one to your base board.

Alternatively, if you have a separate hardware control panel, it provides the ability to put the RGB LED there and not duplicate it on the module or base board.

Device OS assumes a common anode RGB LED. One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K ohm current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values - 33 ohm on red, and 66 ohm on green and blue. 

If you are using a different LED, you should limit current to 2mA per color.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

### Reset and Mode buttons

The M SoM does not include buttons on module. We highly recommend including reset and mode buttons on your base board.

For example, you could use two-inexpensive SMD switches. The 4.5mm [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) costs $0.20 in single quantities.

### USB Connector

The M SoM does not include a USB connector on the module. We recommend including one on your base board. This can be a USB Micro B, as on the Photon and Argon, or you could use USB C.

Since you choose the connector you have the option of using a right-angle USB connector. This is handy if your board will be an enclosure where the board is recessed into the case under a removable cover. This can allow the USB connector to be accessed without removing the board from the enclosure.

| Part | Example | Price |
| :--- | :--- | ---: |
| USB micro B connector | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 
| CONN RCPT USB2.0 MICRO B SMD R/A | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 


### SWD/JTAG

The M SoM does not include a SWD/JTAG debugging connector on the board. The functionality is available on four pads on the bottom of the SoM. These typically mate with pogo pins on your base board, if you want to include SWD functionality.

Since the M SoM can be removed from your base board, you can also use a different board, such the M.2 SoM eval board, for rare situations where you need SWD for low-level reprogramming.

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


### Troubleshooting connector

In some cases, you may want to omit the reset and mode buttons, status LED, USB connector, and SWD/JTAG pins from your board board. If you do, we highly recommend adding a debug connector to make these features available for troubleshooting. The debug connector could be an actual connector, header pins, socket, card-edge connector, or SMD pads that allow an adapter or daughter card with these features.

### Voltage regulators

#### VCC

VCC is used to supply power to the cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting.

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

### LiPo Battery and LI+ pin

The M SoM does not include a LiPo battery connector or charging circuit on the module. If you want these features you will need to include them on your base board.

This is the LiPo battery connector used on the Argon:

| Description | Example | Price |
| :--- | :--- | ---: |
| JST-PH battery connector | [JST B2B-PH-K-S-LF-SN](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B2B-PH-K-S-LF-SN/455-1704-ND/926611) | $0.17 | 

As of the first half of 2022, supply chain constraints are affecting the supply of PMICs and charge controllers. Because of this, we are not recommending a specific model to use with your board.

The Argon uses a Torex XC6208A42 LiPo charge controller, however there is no need use this part and it will be difficult to obtain.

The Boron uses a full PMIC (bq24195) and fuel gauge (MAX17043). By including these features on your base board you can provide more full-featured operation on battery power than the Argon does.

### EN pin

The Argon and Boron have EN pin which can shut down the Torex XC9258 3.3V regulator to power down the 3.3V supply to the Argon nRF52840 MCU and the ESP32 Wi-Fi coprocessor. A similar feature exists on the Boron, using a load switch to control the 3.3V power supply and the 3.7V cellular modem power supply.

This feature does not exist on the M SoM, however you could add equivalent circuitry on your base board. This could either be a regulator with power control like the Argon, or an external load switch like the Boron (Torex XC8107). The specific load switch is not important, as long as it meets the power requirements of the MCU and any additional peripherals on 3V3.

### Land pattern

The land pattern for the M.2 connector on the M SoM is:

{{imageOverlay src="/assets/images/b-series/b-series-connector.png" alt="M.2 Connector" class="full-width"}}

{{imageOverlay src="/assets/images/b-series/b-series-keep-out.png" alt="Keep-Out Area"}}

The Argon/Boron land pattern is:

{{imageOverlay src="/assets/images/boron/boron-landing-pattern.png" alt="Boron Land Pattern" class="full-width"}}



### ADC

{{!-- BEGIN do not edit content below, it is automatically generated 0ad610ce-7eb9-463a-a214-3abf217f2e80 --}}

| Boron Pin Name | Boron ADC | M SoM Pin | M SoM Pin Name | M SoM ADC |
| :--- | :--- | :---: | :--- | :--- |
| A0 / D19 | &check; | 23 | A0 / D19 | &check; |
| A1 / D18 | &check; | 33 | A1 / D18 | &check; |
| A2 / D17 | &check; | 35 | A2 / D17 | &check; |
| A3 / D16 | &check; | 37 | A3 / D16 | &check; |
| A4 / D15 | &check; | 41 | A4 / D15 | &check; |
| A5 / D14 | &check; | 43 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 53 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 45 | A6 / D29 | &check; |
| D8 / WKP | &nbsp; | 47 | A7 / WKP | &check; |


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

{{!-- BEGIN do not edit content below, it is automatically generated 53ee9c68-d92a-4a07-b56a-7c1cfab44f60 --}}

| Boron Pin Name | Boron Serial | M SoM Pin | M SoM Pin Name | M SoM Serial |
| :--- | :--- | :---: | :--- | :--- |
| D2 | Serial1 RTS | 42 | D2 | Serial1 (RTS)  |
| &nbsp; | &nbsp; | 58 | D24 | Serial2 (TX)  |
| &nbsp; | &nbsp; | 60 | D25 | Serial2 (RX)  |
| D3 | Serial1 CTS | 40 | D3 | Serial1 (CTS)  |
| RX / D10 | Serial1 RX | 38 | RX / D10 | Serial1 (RX)  |
| TX / D09 | Serial1 TX | 36 | TX / D9 | Serial1 (TX) |


{{!-- END do not edit content above, it is automatically generated--}}

- One additional UART serial port on the M SoM


### SPI

{{!-- BEGIN do not edit content below, it is automatically generated 1b2c8715-6448-4bb6-aebf-8a507c16a87d --}}

| Boron Pin Name | Boron I2C | M SoM Pin | M SoM Pin Name | M SoM I2C |
| :--- | :--- | :---: | :--- | :--- |
| D0 | Wire (SDA) | 22 | D0 | Wire (SDA) |
| D1 | Wire (SCL) | 20 | D1 | Wire (SCL) |


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

{{!-- BEGIN do not edit content below, it is automatically generated f8d3a842-6457-4404-ad7b-d1c47a53e638 --}}

| Boron Pin Name | Boron PWM | M SoM Pin | M SoM Pin Name | M SoM PWM |
| :--- | :--- | :---: | :--- | :--- |
| A0 / D19 | &check; | 23 | A0 / D19 | &check; |
| A1 / D18 | &check; | 33 | A1 / D18 | &check; |
| A2 / D17 | &check; | 35 | A2 / D17 | &nbsp; |
| A3 / D16 | &check; | 37 | A3 / D16 | &nbsp; |
| A4 / D15 | &check; | 41 | A4 / D15 | &nbsp; |
| A5 / D14 | &check; | 43 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 53 | A5 / D14 | &check; |
| &nbsp; | &nbsp; | 45 | A6 / D29 | &check; |
| D2 | &check; | 42 | D2 | &nbsp; |
| D3 | &check; | 40 | D3 | &nbsp; |
| D4 | &check; | 66 | D4 | &check; |
| D5 | &check; | 68 | D5 | &check; |
| D6 | &check; | 70 | D6 | &check; |
| D7 | &check; | 72 | D7 | &check; |
| MISO / D11 | &nbsp; | 50 | MISO / D11 | &check; |
| MOSI / D12 | &nbsp; | 52 | MOSI / D12 | &check; |
| RX / D10 | &nbsp; | 38 | RX / D10 | &check; |
| TX / D09 | &nbsp; | 36 | TX / D9 | &check; |
| D8 / WKP | &check; | 47 | A7 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

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


### NFC

The M SoM does not support NFC. 

The Boron and Argon support NFC Tag mode.

### Sleep

- In `HIBERNATE` sleep mode, the M SoM can only be wakened via the `WKP` pin, but the Boron and Argon can be wakened by any pin.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the M SoM, Boron, and Argon can be wakened by any pin.

- In `HIBERNATE` sleep mode, the M SoM puts `OUTPUT` pins into high-impedance state. The Boron and Argon preserve the digital level.

- In `STOP` and `ULTRA_LOW_POWER` sleep modes, the M SoM, Boron, and Argon preserve the digital output

- In `HIBERNATE` sleep mode, on the M SoM, pin D21 does not maintain `INPUT_PULLUP` or `INPUT_PULLDOWN` while asleep.

{{!-- BEGIN do not edit content below, it is automatically generated 58475011-6c17-488b-a042-a363c1312d02 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 17 | D21 | D21 GPIO | No internal pull up or pull down in HIBERNATE sleep mode. | PA[0] |
| 47 | A7 / WKP | A7 Analog In, WKP, GPIO D28 | Only this pin can wake from HIBERNATE sleep mode. | PA[20] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Full comparison


{{!-- BEGIN do not edit content below, it is automatically generated 92c0afb8-3e86-47bf-adc2-34873410a475 --}}

#### 3V3
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 1000 mA | System power in, supply a fixed 3.3V power, 500 mA minimum |
#### A0
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | I2C SDA, GPIO | D0 GPIO, I2C SDA |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D1
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | I2C SCL, GPIO | D1 GPIO, I2C SCL |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | ??? |
#### D2
|   |   | Boron | M SoM |
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
| | Added to M SoM |
| :--- | :--- |
| Pin Name | D21|
| Description | D21 GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
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
| | Added to M SoM |
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
| | Unchanged between Boron and M SoM |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### GNSS_TX
| | Added to M SoM |
| :--- | :--- |
| Pin Name | GNSS_TX|
| Description | Cellular modem GNSS UART TX|
#### LI+
| | Removed from Boron |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | MODE | D20 |
| ∆ | Pin Alternate Name | D20 | n/a |
| ∆ | Description | MODE button, has internal pull-up | D20 GPIO |
| ∆ | Supports digitalRead | n/a | Yes |
| ∆ | Supports digitalWrite | n/a | Yes |
| ∆ | Supports attachInterrupt | n/a | Yes |
| ∆ | Internal pull resistance | n/a | ??? |
#### MODE
| | Added to M SoM |
| :--- | :--- |
| Pin Name | MODE|
| Description | MODE button. Pin number constant is BTN. External pull-up required!|
| Supports attachInterrupt | Yes|
#### MOSI
|   |   | Boron | M SoM |
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
| | Added to M SoM |
| :--- | :--- |
| Pin Name | NC|
| Description | n/a|
#### RGBB
| | Added to M SoM |
| :--- | :--- |
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### RGBG
| | Added to M SoM |
| :--- | :--- |
| Pin Name | RGBG|
| Description | RGB LED Green|
#### RGBR
| | Added to M SoM |
| :--- | :--- |
| Pin Name | RGBR|
| Description | RGB LED Red|
| Signal used at boot | Low at boot triggers trap mode|
#### RST
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RST | RST |
| ∆ | Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset, active low. External pull-up required. |
#### RX
|   |   | Boron | M SoM |
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
|   |   | Boron | M SoM |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | SCK | SCK |
| &nbsp; | Pin Alternate Name | D13 | D13 |
| ∆ | Description | SPI SCK, GPIO | D13 GPIO, SPI SCK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| ∆ | Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| ∆ | Internal pull resistance | 13K | 2.1K |
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
|   |   | Boron | M SoM |
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
| | Added to M SoM |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Added to M SoM |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VCC
| | Added to M SoM |
| :--- | :--- |
| Pin Name | VCC|
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3V power.|
#### VUSB
| | Removed from Boron |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### WKP
|   |   | Boron | M SoM |
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

Since the Boron (cellular) does not have Wi-Fi support, if you wish to use Wi-Fi on the M SoM you will need to provide a way to configure it. Wi-Fi setup works the same as the P2, Photon 2, and Argon, and uses BLE. See [Wi-Fi setup options](/reference/device-os/wifi-setup-options/) for more information.


### User firmware binary size

One major advantage of the M SoM is that user firmware binaries can be up to 2048 Kbytes.

On the B SoM (Device OS 3.1 and later), it's 256 Kbytes, or 128 Kbytes for older version of Device OS.

### Platform ID

The Platform ID of the msom (35, `PLATFORM_MSOM`) is different from that of the Boron (13) because of the vastly different hardware. 

If you have a product based on the Bprpm, you will need to create a separate product for devices using the M SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

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
