---
title: P2 from Photon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Photon to P2
---

# {{title}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-photon-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{migration-guide leftImg="/assets/images/photon_vector2_600.png" rightImg="/assets/images/p2-rendering.png"}}

The Particle P2 module is the next generation Wi-Fi module from Particle. It is footprint compatible with our prior module, the P1, but is built on an upgraded chipset, supporting advanced features such as 5 GHz Wi-Fi, a 200MHz CPU, and built-in Bluetooth BLE 5.0.

| Feature | P2 | P1 | Photon | Argon |
| :--- | :---: | :---: | :---: | :---: |
| Style | SMD | SMD | Pin Module | Pin Module |
| Status LEDs | &dagger; | &dagger; | &check; | &check; |
| Reset and Mode Buttons | &dagger; | &dagger; | &check; | &check; |
| USB Connector | &dagger; | &dagger; | Micro B | Micro B |
| D7 Blue LED | | | &check; | &check; |
| LiPo Connector | | | | &check; |
| Battery Charger | | | | &check; |
| User application size | 2048 KB (2 MB) | 128 KB | 128KB | 256 KB |
| Flash file system<sup>1</sup> |  2 MB | | | 2 MB |
| | | | | |
| MCU | RTL8721DM | STM32F205RGY6 | STM32F205RGY6 | nRF52840 |
|  | Realtek Semiconductor | ST Microelectronics | ST Microelectronics | Nordic Semiconductor |
| CPU | Cortex M33 @ 200 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 120 MHz | Cortex M3 @ 64 MHz |
| | Cortex M23 @ 20 MHz | | | |
| RAM<sup>2</sup> | 512 KB | 128KB | 128 KB | 256 KB |
| Flash<sup>3</sup> | 16 MB | 1 MB | 1 MB | 1 MB | 
| Hardware FPU | &check; | | | &check; |
| Secure Boot | &check; | | | |
| Trust Zone | &check; | | | }
| | | | | }
| Wi-Fi | 802.11 a/b/g/n | 802.11 b/g/n | 802.11 b/g/n | 802.11 b/g/n |
| &nbsp;&nbsp;2.4 GHz | &check; | &check; | &check; | &check; |
| &nbsp;&nbsp;5 GHz | &check; | | | |
| Bluetooth | BLE 5.0 | | | BLE 5.0 |
| NFC Tag |  | | | External antenna required |
| Antenna | Shared for Wi-Fi and BLE | Wi-Fi only | Wi-Fi only | Separate Wi-Fi and BLE antennas |
| | Built-in PCB antenna (Wi-Fi & BLE) | Built-in PCB antenna (Wi-Fi) | Built-in chip antenna (Wi-Fi) | Built-in chip antenna (BLE) |
| | | | | Required external antenna (Wi-Fi) |
| | Optional external (Wi-Fi & BLE)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (Wi-Fi)<sup>4</sup> | Optional external (BLE)<sup>4</sup> |
| | | | | |
| Peripherals | USB 2.0 | USB 1.1 | USB 1.1 | USB 1.1 |
| Digital GPIO | 22 | 24 | 18 | 20 |
| Analog (ADC) | 6 | 13 | 8 | 6 |
| Analog (DAC) |  | 2 | 2 |  |
| UART | 3 | 2 | 2<sup>6</sup> | 1 |
| SPI | 2 | 2 | 2 |  2 |
| PWM | 6 | 12 | 9 | 8 |
| I2C | 1 | 1 | 1 | 1 |
| CAN |  | 1 | 1 | |
| I2S |  | 1<sup>5</sup> | 1<sup>5</sup> | 1 |
| JTAG | | &check; | &check; | |
| SWD | &check; | &check; | &check; |&check; |


&dagger; Optional but recommended. Add to your base board.

<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup> Total RAM; amount available to user applications is smaller.

<sup>3</sup> Total built-in flash; amount available to user applications is smaller. The Argon also has a 4 MB external flash, a portion of which is available to user applications as a flash file system.

<sup>4</sup> Onboard or external antenna is selectable in software.

<sup>5</sup> The STM32 hardware supports I2S but there is no software support in Device OS or 3rd-party libraries.

<sup>6</sup> The second UART on the Photon shares pins with the status LED, and requires unsoldering it (or its current limiting resistors) and using pads on the bottom of the module, making it impractical to use.

## Hardware

### Module style

The primary difference is that the Photon is a pin-based module that can be installed in solderless breadboard for prototyping, can be installed in a socket on your custom board, or soldered directly to your board.

![Photon](/assets/images/photon_vector2_600.png)

The P2 is only available as a SMD (surface mount device) that is typically reflow soldered to your base board. Your base board will need to be a custom printed circuit board, and cannot be a solderless breadboard or perforated prototyping board.

This can be done in small quantities by hand using a reflow oven or soldering hot plate. In quantity, it would be done by your PCBA (PCB with assembly) contractor.

This is a P2 custom board, not an actual product. Full instructions on how to build this board are included in the [P2 First Board Tutorial](/hardware/wi-fi/p2-first-board/).

![P2 Custom Board](/assets/images/p2-custom.png)

The Photon 2 is a pin-based module that contains a P2, and may be appropriate in many cases. If you are planning on scaling, it may be advantageous to migrate from the Photon directly to the P2 as the Photon and Photon 2 are not pin-compatible and will require a redesign of your base board anyway.

![Photon 2 Rendering](/assets/images/photon2-rendering.png)


### Status LED

The P2 does not include a status LED on the module. We recommend adding one to your base board.

Alternatively, if you have a separate hardware control panel, it provides the ability to put the RGB LED there and not duplicate it on the module or base board.

Device OS assumes a common anode RGB LED. One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K ohm current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values - 33 ohm on red, and 66 ohm on green and blue. 

If you are using a different LED, you should limit current to 2mA per color.

A detailed explanation of different color codes of the RGB system LED can be found [here](/troubleshooting/led/).

### Reset and Mode buttons

The P2 does not include buttons on module. We highly recommend including reset and mode buttons on your base board.

For example, you could use two-inexpensive SMD switches. The 4.5mm [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) costs $0.20 in single quantities.

### USB Connector

The P2 does not include a USB connector on the module. We recommend including one on your base board. This can be a USB Micro B, as on the Photon and Argon, or you could use USB C.

Since you choose the connector you have the option of using a right-angle USB connector. This is handy if your board will be an enclosure where the board is recessed into the case under a removable cover. This can allow the USB connector to be accessed without removing the board from the enclosure.

| Part | Example | Price |
| :--- | :--- | ---: |
| USB micro B connector | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 
| CONN RCPT USB2.0 MICRO B SMD R/A | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 


### SWD/JTAG

The P2 does not include a SWD/JTAG debugging connector on the board. We recommend including the following pins available for debugging:


{{!-- BEGIN do not edit content below, it is automatically generated 84ab47ce-0497-437a-96cc-b56c854104b8 --}}

| Pin | Pin Name | Description | Interface | MCU |
| :---: | :--- | :--- | :--- | :--- |
| 1 | GND | Ground. Be sure you connect all P1 ground pins. | &nbsp; | &nbsp; |
| 34 | RST | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | &nbsp; | CHIP_EN |
| 54 | D7 | D7 GPIO, SWDIO | SWDIO | PA[27] |
| 55 | D6 | D6 GPIO, SWCLK | SWCLK | PB[3] |


{{!-- END do not edit content above, it is automatically generated --}}

### Troubleshooting connector

In some cases, you may want to omit the reset and mode buttons, status LED, USB connector, and SWD/JTAG pins from your board board. If you do, we highly recommend adding a debug connector to make these features available for troubleshooting. The debug connector could be an actual connector, header pins, socket, card-edge connector, or SMD pads that allow an adapter or daughter card with these features.

### Voltage regulator

The P2 requires regulated 3.3VDC at 500 mA. An voltage regulator is required on your base board if powering by USB (5V), LiPo (3.7V), or an external power source.

As of the first half of 2022, supply chain constraints are affecting the availability of voltage regulator components. There is no Device OS software dependency on 
the voltage regulator so you can choose any model as long as it meets the voltage and current requirements.

- This is often a switching regulator to save space, but this is not required. 
  - The Photon used a Richtek RT8008 (3.3V), which is hard to procure.
  - The Argon used a Torex XCL223, which is no longer available. The pin compatible XCL224 is also no longer available.
- If the input voltage is close to 3.3V, such as 5V USB, a linear regulator can be used.

### VBAT

On the Photon, a lithium coin cell or supercap can be attached to the VBAT pin to keep the real-time clock running, and keep the backup SRAM (retained memory). 

This feature is not available on the P2 or Gen 3 devices.

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for Gen 3 (nRF52840) and the P2 (RTL872x). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### Pins A3, A4, and DAC (A6)

Pins A3, A4, DAC/A6 do not exist on the P2 and are NC.

You will need to use different pins if you are currently using these pins. There are a large number of additional pins (S0 - S6), however.

### SPI

Both the Photon and P2 have two SPI ports, however the pins are different for primary SPI port.

The following are all SPI-related pins on the Photon and P2:

{{!-- BEGIN do not edit content below, it is automatically generated 2edd3413-e159-4396-9a02-db963b4c8999 --}}

| Photon Pin Name | Photon SPI | P2 Pin Name | P2 SPI |
| :--- | :--- | :--- | :--- |
| A2 | SPI (SS) | A2 / D13 | &nbsp; |
| A3 | SPI (SCK) | D0 / A3 | &nbsp; |
| A4 | SPI (MISO) | D1 / A4 | &nbsp; |
| A5 | SPI (MOSI) | A5 / D14 | &nbsp; |
| D2 | SPI1 (MOSI) | D2 | SPI1 (MOSI) |
| D3 | SPI1 (MISO) | D3 | SPI1 (MISO) |
| D4 | SPI1 (SCK) | D4 | SPI1 (SCK) |
| D5 | SPI1 (SS) | D5 | SPI1 (SS) |
| &nbsp; | &nbsp; | S0 / D15 | SPI (MOSI) |
| &nbsp; | &nbsp; | S1 / D16 | SPI (MISO) |
| &nbsp; | &nbsp; | S2 / D17 | SPI (SCK) |
| &nbsp; | &nbsp; | S3 / D18 | SPI (SS) |


{{!-- END do not edit content above, it is automatically generated --}}

#### SPI - Gen 2 devices (including Photon and P1)

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - P2 

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |

### I2C

The P2 supports one I2C (two-wire serial interface) port on the same pins as the Photon.

However on the P2, D0 is shared with A3 and D1 is shared with D4, so you cannot use A3 and A4 at the same time as I2C.

{{!-- BEGIN do not edit content below, it is automatically generated 15242326-04aa-4cc8-b2fd-8621301c7bdd --}}

| Photon Pin Name | Photon I2C | P2 Pin Name | P2 I2C |
| :--- | :--- | :--- | :--- |
| A3 | &nbsp; | D0 / A3 | Wire (SDA) |
| A4 | &nbsp; | D1 / A4 | Wire (SCL) |
| D0 | Wire (SDA) | D0 / A3 | Wire (SDA) |
| D1 | Wire (SCL) | D1 / A4 | Wire (SCL) |


{{!-- END do not edit content above, it is automatically generated  --}}

- The P2 I2C port is not 5V tolerant

### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the Photon and P2. There is no hardware flow control on this port on the Photon or P2.

The secondary UART serial (`Serial2`) is on different pins and also supports CTS/RTS hardware flow control. 

There is also a third UART serial (`Serial3`).

On the Photon, the Serial2 port is shared with the RGB LED, and the Photon must be modified to remove the LED or the current limiting resistors, so using Serial2 on the Photon is impractical.

{{!-- BEGIN do not edit content below, it is automatically generated 21bcd7d9-474c-4d45-81e1-0cb1753fdb87 --}}

| Photon Pin Name | Photon Serial | P2 Pin Name | P2 Serial |
| :--- | :--- | :--- | :--- |
| D2 | &nbsp; | D2 | Serial2 (RTS) |
| D3 | &nbsp; | D3 | Serial2 (CTS) |
| D4 | &nbsp; | D4 | Serial2 (TX) |
| D5 | &nbsp; | D5 | Serial2 (RX) |
| RGBB | Serial2 (RX) | RGBB | &nbsp; |
| RGBG | Serial2 (TX) | RGBG | &nbsp; |
| RX | Serial1 (RX) | RX / D9 | Serial1 (RX)  |
| &nbsp; | &nbsp; | S0 / D15 | Serial3 (TX) |
| &nbsp; | &nbsp; | S1 / D16 | Serial3 (RX) |
| &nbsp; | &nbsp; | S2 / D17 | Serial3 (RTS) |
| TX | Serial1 (TX) | TX / D8 | Serial1 (TX) |
| WKP / A7 | &nbsp; | D10 / WKP | Serial3 (CTS) |


{{!-- END do not edit content above, it is automatically generated  --}}

|      | Photon    | P2 |
| :--- | :---: | :---: |
| Buffer size | 64 bytes | 2048 bytes |
| 7-bit mode | &check; | &check; |
| 8-bit mode | &check; | &check; |
| 9-bit mode | &check; | |
| 1 stop bit | &check; | &check; |
| 2 stop bits | &check; | &check; |
| No parity | &check; | &check; |
| Even parity | &check; | &check; |
| Odd parity | &check; | &check; |
| Break detection | &check; | |
| LIN bus support | &check; | |
| Half duplex | &check; | |
| CTS/RTS flow control |  | &check;<sup>1</sup> |

<sup>1</sup>CTS/RTS flow control only on Serial2. It is optional.

Supported Baud Rates:

| Baud Rate | P1 | P2 |
| ---: | :---: | :---|
| 110     | | &check; |
| 300     | | &check; |
| 600     | | &check; |
| 1200    | &check; | &check; |
| 2400    | &check; | |
| 4800    | &check; | |
| 9600    | &check; | &check; |
| 14400   | | &check; |
| 19200   | &check; | &check; |
| 28800   | | &check; |
| 38400   | &check; | &check; |
| 57600   | &check; | &check; |
| 76800   | | &check; |
| 115200  | &check; | &check; |
| 128000  | | &check; |
| 153600  | | &check; |
| 230400  | &check; | &check; |
| 500000  | | &check; |
| 921600  | | &check; |
| 1000000 | | &check; |
| 1382400 | | &check; |
| 1444400 | | &check; |
| 1500000 | | &check; |
| 1843200 | | &check; |
| 2000000 | | &check; |
| 2100000 | | &check; |
| 2764800 | | &check; |
| 3000000 | | &check; |
| 3250000 | | &check; |
| 3692300 | | &check; |
| 3750000 | | &check; |
| 4000000 | | &check; |
| 6000000 | | &check; |

### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the P2:

{{!-- BEGIN do not edit content below, it is automatically generated 37d26734-83ca-42db-8dd6-701e3c411928 --}}

| Photon Pin Name | Photon ADC | P2 Pin Name | P2 ADC |
| :--- | :--- | :--- | :--- |
| A0 | &check; | A0 / D11 | &check; |
| A1 | &check; | A1 / D12 | &check; |
| A2 | &check; | A2 / D13 | &check; |
| A3 | &check; | D0 / A3 | &check; |
| A4 | &check; | D1 / A4 | &check; |
| A5 | &check; | A5 / D14 | &check; |
| D0 | &nbsp; | D0 / A3 | &check; |
| D1 | &nbsp; | D1 / A4 | &check; |
| DAC / A6 | &check; | &nbsp; | &nbsp; |
| WKP / A7 | &check; | D10 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

On the P2, there are no pins A3 (hardware pin 21) and A4 (hardware pin 22); these are NC (no connection). However, P2 pin D0 (hardware pin 36) can be used as an analog input and has the alias A3. The same is true for P2 pin D1 (hardware pin 35), which has the alias A4.

The `setADCSampleTime()` function is not supported on the P2.


### PWM (Pulse-width modulation)

The pins that support PWM are different on the Photon and P2.


{{!-- BEGIN do not edit content below, it is automatically generated e27ab11e-d144-4fe0-bfcf-dc5a56809e22 --}}

| Photon Pin Name | Photon PWM | P2 Pin Name | P2 PWM |
| :--- | :--- | :--- | :--- |
| A2 | &nbsp; | A2 / D13 | &check; |
| A4 | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | D1 / A4 | &check; |
| A5 | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | A5 / D14 | &check; |
| D0 | &check; | D0 / A3 | &nbsp; |
| D1 | &check; | D1 / A4 | &check; |
| D2 | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | D2 | &nbsp; |
| D3 | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | D3 | &nbsp; |
| RX | &check; | RX / D9 | &nbsp; |
| &nbsp; | &nbsp; | S0 / D15 | &check; |
| &nbsp; | &nbsp; | S1 / D16 | &check; |
| TX | &check; | TX / D8 | &nbsp; |
| WKP / A7 | &check; | D10 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

All available PWM pins on the P2 share a single timer. This means that they must all share a single frequency, but can have different duty cycles.

### Digital to analog converter (DAC)

The Photon supports DAC one A3 and A6 (DAC). There is no DAC on the P2 or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.


{{!-- BEGIN do not edit content below, it is automatically generated 79d52214-7c64-4437-92e8-2ed059b3bbe3 --}}

| Photon Pin Name | Photon DAC | P2 Pin Name | P2 DAC |
| :--- | :--- | :--- | :--- |
| A3 | &check; | D0 / A3 | &nbsp; |
| DAC / A6 | &check; | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}



### WKP (A7)

|      | Photon    | P2 |
| :--- | :---: | :---: |
| Module Pin | 30 | 30 |
| Pin Name | WKP | WKP |
| | A7 | D11 |
| Analog Input | &check; | |
| PWM | &check; | |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the P2 and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (Controller Area Network)

The Photon supports CAN on pins D1 and D2. There is no CAN on the P2 or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the P2.


{{!-- BEGIN do not edit content below, it is automatically generated 2cf91e3c-e8d7-40a4-a637-6a69a4d08e59 --}}

| Photon Pin Name | Photon CAN | P2 Pin Name | P2 CAN |
| :--- | :--- | :--- | :--- |
| D1 | CAN2_TX | D1 / A4 | &nbsp; |
| D2 | CAN2_RX | D2 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### I2S (Sound)

The Photon theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

There is no software support for I2S on the P2 either, and while the RTL872x hardware supports I2S, the pins that it requires are in use by other ports.


{{!-- BEGIN do not edit content below, it is automatically generated b2ddf109-3a53-449e-a940-a3c9736b15fc --}}

| Photon Pin Name | Photon I2S | P2 Pin Name | P2 I2S |
| :--- | :--- | :--- | :--- |
| D2 | I2S3_SD | D2 | &nbsp; |
| D4 | I2S3_SCK | D4 | &nbsp; |
| D5 | I2S3_WS | D5 | &nbsp; |
| SETUP | I2S3_MCK | &nbsp; | &nbsp; |


{{!-- END do not edit content above, it is automatically generated  --}}

### BLE (Bluetooth LE)

BLE Central Mode on the P2 and Photon 2 is only supported in Device OS 5.1.0 and later. Earlier versions only supported BLE Peripheral Mode.

### MODE button

The P2 MODE button does not have a hardware pull-up on it, so you must add an external pull-up (2.2K to 10K) to 3V3, or connect it to 3V3 if not using a button. 

### Sleep

The P2 can wake from `STOP` or `ULTRA_LOW_POWER` sleep mode on any GPIO, `RISING`, `FALLING`, or `CHANGE`.

The P2 can only wake from `HIBERNATE` sleep mode on pin D10, `RISING`, `FALLING`, or `CHANGE`. The Photon can only wake from `HIBERNATE` on `WKP` `RISING` so this should not be an issue, other than making sure the pins are mapped appropriately.

### Internal pull-up or pull-down

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

- On the P2, the internal pull varies by pin and can be approximately 2.1K, 22K, or 42K.
  - Pins A0, A1, D2, D3, D4, D5, D10, S0, S1, S2 are 2.1K
  - Pins D0, D1, S4, S5, S6 are 22K
  - Pins A2, A5, D6, TX, RX are 42K
  - Pins S4, S5, S6 do not support pull-up or pull-down in HIBERNATE sleep mode. Use an external pull resistor if this is required.
- On the Photon (Gen 2), the internal pull is approximately 40K.

### Boot mode pins

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated 5936ede0-76ff-423b-97c7-5ba925aa6095 --}}

| Pin | Pin Name | Description | MCU |
| :---: | :--- | :--- | :--- |
| 54 | D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | PA[27] |
| 55 | D6 | SWCLK. 40K pull-down at boot. | PB[3] |
| 64 | TX / D8 | Low at boot triggers ISP flash download | PA[7] |


{{!-- END do not edit content above, it is automatically generated --}}

### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the P2.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset, is not available on the P2. This also prevents system usage of retained memory, including session resumption on reset.

On Gen 2 and Gen 3 devices, retained memory is 3068 bytes. 

The flash file system can be used for data storage on the P2, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### Flash file system

The Photon did not have a flash file system. 

The P2 has a 2 MB flash file system using the same [POSIX API](/reference/device-os/api/file-system/file-system/) as Gen 3 devices. A small amount of space is reserved for system use including configuration data. Most of the space is available for user application use.

### EEPROM

The [EEPROM emulation API](/reference/device-os/api/eeprom/eeprom/) is the same across the Photon and P2.

The Photon had 2047 bytes of emulated EEPROM.
The P2 has 4096 bytes of emulated EEPROM. On the P2 and Gen 3 devices, the EEPROM is actually just a file on the flash file system.


### Pin functions removed

The following pins served Photon-specific uses and are NC on the P2. You should not connect anything to these pins.

- Pins A3 and A4 on the P2 are shared with D0 and D1. You cannot use A3 and A4 at the same time as I2C (`Wire`) on the P2.

{{!-- BEGIN do not edit content below, it is automatically generated 3729b0b4-4058-454e-aef8-0ca5c2526bd52 --}}

| Pin Name | Description |
| :--- | :--- |
| DAC / A6 | DAC/A6 True analog out, analog in, GPIO. |
| SETUP | SETUP button, has internal pull-up. Pin number constant is BTN. |
| VBAT | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. |
| VIN | Power in 3.6V to 5.5 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum. |


{{!-- END do not edit content above, it is automatically generated --}}

### Pin functions added


{{!-- BEGIN do not edit content below, it is automatically generated 1de5c9cc-077e-45d1-bc1e-d5892742d68e --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 5 | 3V3_IO | 3.3V power to MCU IO. |
| 2 | 3V3_RF | 3.3V power to RF module |
| 46 | MODE | MODE button. Pin number constant is BTN. External pull-up required! |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) |
| 42 | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) |
| 44 | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS |
| 47 | S4 / D19 | S4 GPIO. (Was P1S4 on P1.) |
| 48 | S5 / D20 | S5 GPIO. (Was P1S5 on P1.) |
| 33 | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) |
| 12 | VBAT_MEAS | Battery voltage measurement (optional). |


{{!-- END do not edit content above, it is automatically generated  --}}

### Recommended pin mappings

#### SPI prioritized

In this mapping, the SPI pins are preserved from Photon to P2 at the expense of two ADCs. Note, however, that SS can be any pin, so you could a different pin for SS and preserve the use of A2 as an ADC. 

{{!-- BEGIN do not edit content below, it is automatically generated 1e172c40-939f-4ff0-85b3-11bcb54a70b8 --}}

| Photon Pin Name | Photon Description | P2 Pin Name | P2 Description | P2 Pin Number | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 | A0 Analog in, GPIO | A0 / D11 | A0 Analog in, GPIO | 50 | PB[1] |
| A1 | A1 Analog in, GPIO | A1 / D12 | A1 Analog in, GPIO | 43 | PB[2] |
| A2 | A2 Analog in, GPIO, SPI SS | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS | 44 | PB[26] |
| A3 | A3 True analog out, analog in, GPIO. | S2 / D17 | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.) | 42 | PA[14] |
| A4 | A4 Analog in, GPIO, SPI MISO. | S1 / D16 | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.) | 41 | PA[13] |
| A5 | A5 Analog in, GPIO, SPI MOSI. | S0 / D15 | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.) | 40 | PA[12] |
| D0 | D0 GPIO, I2C SDA | D0 / A3 | D0 GPIO, I2C SDA, A3 Analog In | 36 | PB[6] |
| D1 | D0 GPIO, I2C SCL, CAN TX | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | 35 | PB[5] |
| D2 | D2 GPIO, SPI1 MOSI, CAN RX | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | 45 | PA[16] |
| D3 | D3 GPIO, SPI1 MISO | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | 51 | PA[17] |
| D4 | D4 GPIO, SPI1 SCK | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | 52 | PA[18] |
| D5 | D5 GPIO, SPI1 SS | D5 | D5 GPIO, Serial2 RX, SPI1 SS | 53 | PA[19] |
| D6 | D6 GPIO, SWCLK | D6 | D6 GPIO, SWCLK | 55 | PB[3] |
| D7 | D7 GPIO, Blue LED, SWDIO | D7 | D7 GPIO, SWDIO | 54 | PA[27] |
| DAC / A6 | DAC/A6 True analog out, analog in, GPIO. | S5 / D20 | S5 GPIO. (Was P1S5 on P1.) | 48 | PB[29] |
| RX | Serial1 RX (received data), GPIO, PWM. | RX / D9 | Serial1 RX (received data), GPIO | 63 | PA[8] |
| TX | Serial1 TX (transmitted data), GPIO, PWM. | TX / D8 | Serial1 TX (transmitted data), GPIO | 64 | PA[7] |
| WKP / A7 | WKP/A7 Wakeup (active high), analog in, GPIO. | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) | 33 | PB[31] |


{{!-- END do not edit content above, it is automatically generated  --}}

#### ADC prioritized

In this mapping, there are two more ADC pins, but primary SPI on the A pins cannot be used.


{{!-- BEGIN do not edit content below, it is automatically generated 276c4cb4-5683-49ce-b9f6-e0bb74dc6735 --}}

| Photon Pin Name | Photon Description | P2 Pin Name | P2 Description | P2 Pin Number | MCU |
| :--- | :--- | :--- | :--- | :--- | :--- |
| A0 | A0 Analog in, GPIO | A0 / D11 | A0 Analog in, GPIO | 50 | PB[1] |
| A1 | A1 Analog in, GPIO | A1 / D12 | A1 Analog in, GPIO | 43 | PB[2] |
| A2 | A2 Analog in, GPIO, SPI SS | A2 / D13 | A2 Analog in, PWM, GPIO | 49 | PB[7] |
| A3 | A3 True analog out, analog in, GPIO. | A2 / D13 | A2 Analog in, PWM, GPIO | 49 | PB[7] |
| A5 | A5 Analog in, GPIO, SPI MOSI. | A5 / D14 | A5 Analog in, GPIO, PWM. | 23 | PB[4] |
| D0 | D0 GPIO, I2C SDA | D0 / A3 | D0 GPIO, I2C SDA, A3 Analog In | 36 | PB[6] |
| D1 | D0 GPIO, I2C SCL, CAN TX | D1 / A4 | D1 GPIO, PWM, I2C SCL, A4 Analog In | 35 | PB[5] |
| D2 | D2 GPIO, SPI1 MOSI, CAN RX | D2 | D2 GPIO, Serial2 RTS, SPI1 MOSI | 45 | PA[16] |
| D3 | D3 GPIO, SPI1 MISO | D3 | D3 GPIO, Serial2 CTS, SPI1 MISO | 51 | PA[17] |
| D4 | D4 GPIO, SPI1 SCK | D4 | D4 GPIO, Serial2 TX, SPI1 SCK | 52 | PA[18] |
| D5 | D5 GPIO, SPI1 SS | D5 | D5 GPIO, Serial2 RX, SPI1 SS | 53 | PA[19] |
| D6 | D6 GPIO, SWCLK | D6 | D6 GPIO, SWCLK | 55 | PB[3] |
| D7 | D7 GPIO, Blue LED, SWDIO | D7 | D7 GPIO, SWDIO | 54 | PA[27] |
| DAC / A6 | DAC/A6 True analog out, analog in, GPIO. | S5 / D20 | S5 GPIO. (Was P1S5 on P1.) | 48 | PB[29] |
| RX | Serial1 RX (received data), GPIO, PWM. | RX / D9 | Serial1 RX (received data), GPIO | 63 | PA[8] |
| TX | Serial1 TX (transmitted data), GPIO, PWM. | TX / D8 | Serial1 TX (transmitted data), GPIO | 64 | PA[7] |
| WKP / A7 | WKP/A7 Wakeup (active high), analog in, GPIO. | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) | 33 | PB[31] |


{{!-- END do not edit content above, it is automatically generated  --}}


### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 46220dbb-60cf-40f4-8fd0-30a968622977 --}}

#### 3V3
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 24 | 26 |
| Pin Name | 3V3 | 3V3 |
| Description | Regulated 3.3V DC output, maximum load 100 mA. Or input 3.0V to 3.6V. | 3.3V power to MCU |
#### 3V3_IO
| | Added to P2 |
| :--- | :--- |
| Pin Number | 5|
| Pin Name | 3V3_IO|
| Description | 3.3V power to MCU IO.|
#### 3V3_RF
| | Added to P2 |
| :--- | :--- |
| Pin Number | 2|
| Pin Name | 3V3_RF|
| Description | 3.3V power to RF module|
#### A0
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 12 | 50 |
| Pin Name | A0 | A0 |
| Pin Alternate Name | n/a | D11 |
| Description | A0 Analog in, GPIO | A0 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |
#### A1
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 11 | 43 |
| Pin Name | A1 | A1 |
| Pin Alternate Name | n/a | D12 |
| Description | A1 Analog in, GPIO | A1 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |
#### A2
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 10 | 49 |
| Pin Name | A2 | A2 |
| Pin Alternate Name | n/a | D13 |
| Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K | 42K |
| Input is 5V Tolerant | Yes | No |
#### A3
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 9 | 36 |
| Pin Name | A3 | D0 |
| Pin Alternate Name | n/a | A3 |
| Description | A3 True analog out, analog in, GPIO. | D0 GPIO, I2C SDA, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (DAC) | Yes | No |
| SPI interface | SCK. Use SPI object. | n/a |
| I2C interface | n/a | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| Internal pull-up or pull-down resistance | 40K | 22K |
#### A4
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 8 | 35 |
| Pin Name | A4 | D1 |
| Pin Alternate Name | n/a | A4 |
| Description | A4 Analog in, GPIO, SPI MISO. | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes |
| SPI interface | MISO. Use SPI object. | n/a |
| I2C interface | n/a | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes |
| Internal pull-up or pull-down resistance | 40K | 22K |
| Input is 5V Tolerant | Yes | No |
#### A5
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 7 | 23 |
| Pin Name | A5 | A5 |
| Pin Alternate Name | n/a | D14 |
| Description | A5 Analog in, GPIO, SPI MOSI. | A5 Analog in, GPIO, PWM. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes |
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes |
| SPI interface | MOSI. Use SPI object. | n/a |
| Supports attachInterrupt | No | Yes |
| Internal pull-up or pull-down resistance | 40K | 42K |
| Input is 5V Tolerant | Yes | No |
#### D0
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 13 | 36 |
| Pin Name | D0 | D0 |
| Pin Alternate Name | n/a | A3 |
| Description | D0 GPIO, I2C SDA | D0 GPIO, I2C SDA, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | No | Yes |
| Internal pull-up or pull-down resistance | 40K | 22K |
| Input is 5V Tolerant | Yes | No |
#### D1
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 14 | 35 |
| Pin Name | D1 | D1 |
| Pin Alternate Name | n/a | A4 |
| Description | D0 GPIO, I2C SCL, CAN TX | D1 GPIO, PWM, I2C SCL, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | Yes | Yes |
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes |
| CAN interface | CAN2_TX | n/a |
| Internal pull-up or pull-down resistance | 40K | 22K |
| Input is 5V Tolerant | Yes | No |
#### D2
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 15 | 45 |
| Pin Name | D2 | D2 |
| Description | D2 GPIO, SPI1 MOSI, CAN RX | D2 GPIO, Serial2 RTS, SPI1 MOSI |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No |
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No |
| UART serial | n/a | RTS. Use Serial2 object. Flow control optional. |
| SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object. |
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes |
| CAN interface | CAN2_RX | n/a |
| I2S interface | I2S3_SD | n/a |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |
#### D3
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 16 | 51 |
| Pin Name | D3 | D3 |
| Description | D3 GPIO, SPI1 MISO | D3 GPIO, Serial2 CTS, SPI1 MISO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No |
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No |
| UART serial | n/a | CTS. Use Serial2 object. Flow control optional. |
| SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object. |
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes |
| Internal pull-up or pull-down resistance | 40K. Pull-up applied in bootloader for JTAG. | 2.1K |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a |
| Signal used at boot | JTAG RST. 40K pull-up at boot. | n/a |
#### D4
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 17 | 52 |
| Pin Name | D4 | D4 |
| Description | D4 GPIO, SPI1 SCK | D4 GPIO, Serial2 TX, SPI1 SCK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | n/a | TX. Use Serial2 object. |
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes |
| I2S interface | I2S3_SCK | n/a |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TDO. Floating at boot. | n/a |
| Signal used at boot | JTAG TDO. Floating at boot. | n/a |
#### D5
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 18 | 53 |
| Pin Name | D5 | D5 |
| Description | D5 GPIO, SPI1 SS | D5 GPIO, Serial2 RX, SPI1 SS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | n/a | RX. Use Serial2 object. |
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| Supports attachInterrupt | Yes | Yes |
| I2S interface | I2S3_WS | n/a |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a |
| Signal used at boot | JTAG TDI. 40K pull-up at boot. | n/a |
#### D6
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 19 | 55 |
| Pin Name | D6 | D6 |
| Description | D6 GPIO, SWCLK | D6 GPIO, SWCLK |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K. Pull-up applied in bootloader for JTAG. | 42K |
| Input is 5V Tolerant | Yes | No |
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a |
| SWD interface | SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot. |
| Signal used at boot | JTAG TCK/SWCLK. 40K pull-down at boot. | SWCLK. 40K pull-down at boot. |
#### D7
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 20 | 54 |
| Pin Name | D7 | D7 |
| Description | D7 GPIO, Blue LED, SWDIO | D7 GPIO, SWDIO |
| Supports digitalRead | Yes. But the on-board LED will light when 3.3V is supplied on this pin as well. | Yes. |
| Supports digitalWrite | Yes. Note that this controls the on-board blue LED. | Yes. On the Photon this is the blue D7 LED. |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K. Pull-up applied in bootloader for JTAG. | 42K |
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a |
| SWD interface | SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot. |
| Signal used at boot | JTAG TMS/SWDIO. 40K pull-up at boot. | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. |
#### DAC
| | Removed from Photon |
| :--- | :--- |
| Pin Number | 6|
| Pin Name | DAC|
| Pin Alternate Name | A6|
| Description | DAC/A6 True analog out, analog in, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (DAC) | Yes|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler.|
| Internal pull-up or pull-down resistance | 40K|
#### GND
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 2 | 1 |
| Pin Name | GND | GND |
| Description | Ground. You only need to use one of the Photon ground pins. | Ground. Be sure you connect all P1 ground pins. |
#### MODE
| | Added to P2 |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | MODE|
| Description | MODE button. Pin number constant is BTN. External pull-up required!|
| Supports attachInterrupt | Yes|
#### NC
| | Added to P2 |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### RGBB
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 29 | 31 |
| Pin Name | RGBB | RGBB |
| Description | RGB LED Blue | RGB LED Blue |
| UART serial | RX. Use Serial2 object. | n/a |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### RGBG
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 28 | 32 |
| Pin Name | RGBG | RGBG |
| Description | RGB LED Green | RGB LED Green |
| UART serial | TX. Use Serial2 object. | n/a |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### RGBR
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 27 | 29 |
| Pin Name | RGBR | RGBR |
| Description | RGB LED Red | RGB LED Red. Has 10K hardware pull-up. Do not hold low at boot. |
| Supports attachInterrupt | n/a | Yes |
| Input is 5V Tolerant | No, if LED is connected. | No |
#### RST
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 23 | 34 |
| Pin Name | RST | RST |
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset. Pull low to reset; can leave unconnected in normal operation. |
#### RX
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 4 | 63 |
| Pin Name | RX | RX |
| Pin Alternate Name | n/a | D9 |
| Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K | 42K |
| Input is 5V Tolerant | Yes | No |
#### S0
| | Added to P2 |
| :--- | :--- |
| Pin Number | 40|
| Pin Name | S0|
| Pin Alternate Name | D15|
| Description | S0 GPIO, PWM, SPI MOSI, Serial3 TX. (Was P1S0 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| UART serial | TX. Use Serial3 object.|
| SPI interface | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 2.1K|
#### S1
| | Added to P2 |
| :--- | :--- |
| Pin Number | 41|
| Pin Name | S1|
| Pin Alternate Name | D16|
| Description | S1 GPIO, PWM, SPI MISO, Serial3 RX. (Was P1S1 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| UART serial | RX. Use Serial3 object.|
| SPI interface | MISO. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 2.1K|
#### S2
| | Added to P2 |
| :--- | :--- |
| Pin Number | 42|
| Pin Name | S2|
| Pin Alternate Name | D17|
| Description | S2 GPIO, SPI SCK, Serial3 RTS. (Was P1S2 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | RTS. Use Serial3 object. Flow control optional.|
| SPI interface | SCK. Use SPI object.|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 2.1K|
#### S3
| | Added to P2 |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | S3|
| Pin Alternate Name | D18|
| Description | S3 GPIO. (Was P1S3 on P1.), SPI SS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | Default SS for SPI.|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 2.1K|
#### S4
| | Added to P2 |
| :--- | :--- |
| Pin Number | 47|
| Pin Name | S4|
| Pin Alternate Name | D19|
| Description | S4 GPIO. (Was P1S4 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
#### S5
| | Added to P2 |
| :--- | :--- |
| Pin Number | 48|
| Pin Name | S5|
| Pin Alternate Name | D20|
| Description | S5 GPIO. (Was P1S5 on P1.)|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode|
#### S6
| | Added to P2 |
| :--- | :--- |
| Pin Number | 33|
| Pin Name | S6|
| Pin Alternate Name | D21|
| Description | S6 GPIO. (Was P1S6/TESTMODE on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
| Internal pull-up or pull-down resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode.|
#### SETUP
| | Removed from Photon |
| :--- | :--- |
| Pin Number | 26|
| Pin Name | SETUP|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN.|
| I2S interface | I2S3_MCK|
#### TX
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 3 | 64 |
| Pin Name | TX | TX |
| Pin Alternate Name | n/a | D8 |
| Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K | 42K |
| Input is 5V Tolerant | Yes | No |
| Signal used at boot | n/a | Low at boot triggers ISP flash download |
#### USBDATA-
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 30 | 62 |
| Pin Name | USBDATA- | USBDATA- |
| Description | USB Data- | USB Data- |
| Input is 5V Tolerant | Yes | Yes |
#### USBDATA+
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 31 | 61 |
| Pin Name | USBDATA+ | USBDATA+ |
| Description | USB Data+ | USB Data+ |
| Input is 5V Tolerant | Yes | Yes |
#### VBAT
| | Removed from Photon |
| :--- | :--- |
| Pin Number | 22|
| Pin Name | VBAT|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA..|
#### VBAT_MEAS
| | Added to P2 |
| :--- | :--- |
| Pin Number | 12|
| Pin Name | VBAT_MEAS|
| Description | Battery voltage measurement (optional).|
#### VIN
| | Removed from Photon |
| :--- | :--- |
| Pin Number | 1|
| Pin Name | VIN|
| Description | Power in 3.6V to 5.5 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum.|
#### WKP
|   | Photon | P2 |
| :--- | :--- | :--- |
| Pin Number | 5 | 30 |
| Pin Name | WKP | D10 |
| Pin Alternate Name | A7 | WKP |
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | D10 GPIO, Serial 3 CTS, WKP. (Was WKP/A7 on P1.) |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | n/a |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | Yes | No |
| UART serial | n/a | CTS. Use Serial3 object. Flow control optional. |
| Supports attachInterrupt | Yes | Yes |
| Internal pull-up or pull-down resistance | 40K | 2.1K |
| Input is 5V Tolerant | Yes | No |


{{!-- END do not edit content above, it is automatically generated  --}}


## Software

### Wi-Fi Configuration

The P2 and Argon utilize BLE or USB for configuration of Wi-Fi rather than the SoftAP approach taken with the P1. Using BLE allow mobile apps to more easily set up the device Wi-Fi without having to modify the mobile device's network configuration.

| Feature | P2 | P1 | Argon |
| :--- | :---: | :---: | :---: |
| Wi-Fi (SoftAP) | | &check; | |
| BLE | &check; | | &check; |

### User firmware binary size

One major advantage of the P2 is that user firmware binaries can be up to 2048 Kbytes, instead of 128 Kbytes on Gen 2 devices including the Photon.

### Flash file system

On the P2 there is a flash file system (2 MB) for storing user data. This is not available on Gen 2 devices including the Photon.

### Combined and resumable OTA

On the P2, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Increased API field limits

The maximum size of a variable, function parameter, or publish is 1024 bytes on the P2 vs. 864 bytes on Photon.

| API Field | Photon | P2 |
| :--- | :---: | :---: |
| Variable Key | 64 | 64 |
| Variable Data | 864 | 1024 |
| Function Key | 64 | 64 |
| Function Argument | 864 | 1024  |
| Publish/Subscribe Event Name | 64 | 64 |
| Publish/Subscribe Event Data | 864 | 1024 |


### Platform ID

The Platform ID of the P2 (32, `PLATFORM_P2`) is different from that of the Photon (6) because of the vastly different hardware. 

If you have a product based on the Photon, you will need to create a separate product for devices using the P2. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID


## Version History

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| pre | 2022-04-06 | RK | Pre-release |
|     | 2022-04-08 | RK | Added recommended pin mappings |
|     | 2022-04-12 | RK | Added serial baud rates |
|     | 2022-04-16 | RK | Added Serial3 |
|     | 2022-07-14 | RK | No hardware pull-up on MODE pin |
|     | 2022-07-18 | RK | List which pins have which pull-up or pull-down value |
|     | 2022-08-12 | RK | Added listing of pins used at boot |
|     | 2022-08-12 | RK | Warning about BLE central mode not available |
|     | 2022-10-05 | RK | Added HIBERNATE sleep section |
|     | 2022-11-17 | RK | Pin D0 does not have PWM |
| 001 | 2023-03-13 | RK | Removed preliminary banner |
