---
title: E404X migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the E Series E402/E404 to E404X
---

# E404X Migration Guide

**Preliminary pre-release version 2022-01-25**

This guide assists in the transition from the E Series E402/E404 to the E404X.


## Hardware 

### No 5V tolerance!

On Gen 2 devices (STM32F205), most pins are 5V tolerant. This is not the case for the E404X and Gen 3 (nRF52840). You must not exceed 3.3V on any GPIO pin, including ports such as serial, I2C, and SPI.

### Pins A3, A4, and DAC (A6)

Pins A3 (module pin 22), A4 (module pin 21), DAC/A6 (module pin 24) do not exist on the P2 and are NC.

You will need to use different pins if you are currently using these pins.

### SPI

Both the P1 and P2 have two SPI ports, however the pins are different for `SPI` (primary SPI).

**TODO: Update this table for Gen 3**

|      | P1    | P2 |
| :--- | :---: | :---: |
| SPI SCK  | A3 | D20 / S2 |
| SPI MISO | A4 | D19 / S1 |
| SPI MOSI | A5 | D18 / S0 |

The following are all SPI-related pins on the P1 and P2:

{{!-- BEGIN do not edit content below, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}

| Pin | E Series Pin Name | E Series SPI | E404X Pin Name | E404X SPI |
| :---: | :--- | :--- | :--- | :--- |
| 21 | A5 | SPI (MOSI) | A5 | SPI (MOSI) | 
| 22 | A4 | SPI (MISO) | A4 | SPI (MISO) | 
| 23 | A3 | SPI (SCK) | A3 | SPI (SCK) | 
| 24 | A2 | SPI (SS) | A2 | SPI (SS) | 
| 37 | D5 | SPI1 (SS) | D5 | SPI1 (SS) | 
| 38 | D4 | SPI1 (SCK) | SWO | &nbsp; | 
| 39 | D3 | SPI1 (MISO) | NC | &nbsp; | 
| 40 | D2 | SPI1 (MOSI) | D2 | &nbsp; | 
| 46 | C3 | SPI2 (SCK) | C3 | SPI1 (SCK) | 
| 47 | C2 | SPI2 (MISO) | C2 | SPI1 (MISO) | 
| 48 | C1 | SPI2 (MOSI) | C1 | SPI1 (MOSI) | 


{{!-- END do not edit content above, it is automatically generated 9327b9b9-21fd-46fd-a406-8c249ade9688 --}}


#### SPI - Gen 2 devices (including P1)

**TODO: Update this table for Gen 3**

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 30 MHz | 15 MHz |
| Default rate | 15 MHz | 15 MHz |
| Clock | 60 MHz | 30 MHz |

- Available clock divisors: 2, 4, 8, 16, 32, 64, 128, 256

#### SPI - P2 

**TODO: Update this table for Gen 3**

| | SPI | SPI1 |
| :--- | :--- | :--- |
| Maximum rate | 25 MHz | 50 MHz |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |



### Serial (UART)


The primary UART serial (`Serial1`) is on the TX and RX pins on both the P1 and P2. There is no hardware flow control on this port on the P1 or P2.

The secondary UART serial (`Serial2`) is on different pins, however it does not conflict with the RGB LED, and also supports CTS/RTS hardware flow control.

{{!-- BEGIN do not edit content below, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

| Pin | E Series Pin Name | E Series Serial | E404X Pin Name | E404X Serial |
| :---: | :--- | :--- | :--- | :--- |
| 16 | TX | Serial1 (TX) | TX | Serial1 (TX) | 
| 17 | RX | Serial1 (RX) | RX | Serial1 (RX) | 
| 41 | D1 | &nbsp; | D1 | Serial1 (CTS) | 
| 42 | D0 | &nbsp; | D0 | Serial1 (RTS) | 
| 46 | C3 | USART4_TX | C3 | &nbsp; | 
| 47 | C2 | USART4_RX | C2 | &nbsp; | 
| 48 | C1 | USART5_TX | C1 | &nbsp; | 
| 49 | C0 | USART5_RX | C0 | &nbsp; | 
| 52 | RGBB | Serial2 (RX) | RGBB | &nbsp; | 
| 53 | RGBG | Serial2 (TX) | RGBG | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated c7f59d46-dca3-4376-b885-0b4ca924a28b --}}

**TODO: Update this table for Gen 3**

|      | P1    | P2 |
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

### Analog input (ADC)

For analog to digital conversion (ADC) using `analogRead()`, there are fewer ADC inputs on the E404X:

{{!-- BEGIN do not edit content below, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}

| Pin | E Series Pin Name | E Series ADC | E404X Pin Name | E404X ADC |
| :---: | :--- | :--- | :--- | :--- |
| 19 | WKP / A7 | &check; | WKP / A7 | &check; | 
| 20 | DAC / A6 | &check; | A6 | &check; | 
| 21 | A5 | &check; | A5 | &check; | 
| 22 | A4 | &check; | A4 | &check; | 
| 23 | A3 | &check; | A3 | &check; | 
| 24 | A2 | &check; | A2 | &check; | 
| 25 | A1 | &check; | A1 | &check; | 
| 26 | A0 | &check; | A0 | &check; | 
| 28 | B5 | &check; | NC | &nbsp; | 
| 29 | B4 | &check; | NC | &nbsp; | 
| 30 | B3 | &check; | B3 | &nbsp; | 
| 31 | B2 | &check; | B2 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated a7091023-5382-4496-8bfc-727593f0d426 --}}



### PWM (Pulse-width modulation)

The pins that support PWM are different on the E Series and E404X.


{{!-- BEGIN do not edit content below, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

| Pin | E Series Pin Name | E Series PWM | E404X Pin Name | E404X PWM |
| :---: | :--- | :--- | :--- | :--- |
| 16 | TX | TIM1_CH2 | TX | PWM2 | 
| 17 | RX | TIM1_CH3 | RX | PWM2 | 
| 19 | WKP / A7 | TIM5_CH1 | WKP / A7 | &nbsp; | 
| 21 | A5 | TIM3_CH2 | A5 | PWM3 | 
| 22 | A4 | TIM3_CH1 | A4 | PWM3 | 
| 23 | A3 | &nbsp; | A3 | PMW2 | 
| 24 | A2 | &nbsp; | A2 | PMW2 | 
| 30 | B3 | TIM3_CH4 | B3 | PWM1 | 
| 31 | B2 | TIM3_CH3 | B2 | PWM0 | 
| 32 | B1 | TIM8_CH1 | B1 | &nbsp; | 
| 33 | B0 | TIM8_CH3 | B0 | &nbsp; | 
| 39 | D3 | TIM3_CH1 | NC | &nbsp; | 
| 40 | D2 | TIM3_CH2 | D2 | PWM1 | 
| 41 | D1 | TIM4_CH1 | D1 | PWM3 | 
| 42 | D0 | TIM4_CH2 | D0 | PWM3 | 
| 44 | C5 | TIM4_CH3 | C5 | &nbsp; | 
| 45 | C4 | TIM4_CH4 | C4 | &nbsp; | 
| 49 | C0 | &nbsp; | C0 | PWM1 | 


{{!-- END do not edit content above, it is automatically generated 0fc429e8-585e-4f36-9874-e3fa37a1136e --}}

- PWM on the same timer must share the same frequency, but can have different duty cycles.
- Pin B2 uses PWM0 which is used by the RGB LED. You can have a different duty cycle but should not change the frequency if you are using the RGB LED.


### Digital to analog converter (DAC)

The E Series supports DAC one A3 and A6 (DAC). There is no DAC on the E404X or Gen 3 devices.

If you need a DAC, it's easy to add one via I2C or SPI on your base board.


{{!-- BEGIN do not edit content below, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}

| Pin | E Series Pin Name | E Series DAC | E404X Pin Name | E404X DAC |
| :---: | :--- | :--- | :--- | :--- |
| 20 | DAC / A6 | &check; | A6 | &nbsp; | 
| 23 | A3 | &check; | A3 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated 2ee8f339-68a5-4d9c-b6b9-0f359038d704 --}}



### WKP (A7)

|              | E Series    | E404X |
| :----------- | :---------: | :---: |
| Module Pin   | 30          | 30 |
| Pin Name     | WKP         | WKP |
|              | A7          | A7 |
| Analog Input | &check;     | &check; |
| PWM          | &check;     |  |

On Gen 2 devices (STM32), only the WKP pin can wake from HIBERNATE sleep mode. 

This restriction does not exist on the E404X and Gen 3 devices; any pin can be used to wake from all sleep modes.

### CAN (Controller Area Network)

The E series supported CAN on pins D1/D2 or C4/C5. There is no CAN on the E404X or Gen 3 devices (except the Tracker).

- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to the E404X.


{{!-- BEGIN do not edit content below, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}

| Pin | E Series Pin Name | E Series CAN | E404X Pin Name | E404X CAN |
| :---: | :--- | :--- | :--- | :--- |
| 40 | D2 | &check; | D2 | &nbsp; | 
| 41 | D1 | &check; | D1 | &nbsp; | 
| 44 | C5 | &check; | C5 | &nbsp; | 
| 45 | C4 | &check; | C4 | &nbsp; | 


{{!-- END do not edit content above, it is automatically generated aaf618d9-4053-490d-8b3b-2ef6118592d6 --}}


### I2S (Sound)

The E Series theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.

I2S is available on Gen 3 devices including the P404X on any GPIO pins using a 3rd-party library.


### Interrupts

There are many limitations for interrupts on the STM32F205. All pins can be used for interrupts on Gen 3 devices and the E404X.

### Pin functions removed

The following pins were used on the E Series but are not available on the E404X. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 10 | VDDA | Power input for ADC. Normally connected to 3V3. Must always be within 300 mV of 3V3. |
| 11 | VBAT | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. |
| 28 | B5 | B5 Analog in, GPIO |
| 29 | B4 | B4 Analog in, GPIO |
| 39 | D3 | D3 GPIO, SPI1 |


{{!-- END do not edit content above, it is automatically generated 6c533551-bce6-4c2e-b248-c7274f4b1b22 --}}

### Pin functions added

No pin functions have been added to previously unused (NC) pins.


### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

#### Module Pin 1 (VIN)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | VIN|
| Description | Power in 3.9V to 12 VDC.|
#### Module Pin 2 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 3 (VBUS)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | VBUS|
| Description | Connect to VBUS power pin on the USB port|
#### Module Pin 4 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 5 (LIPO)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | LIPO|
| Description | Connect to + pin on the LiPo battery, 3.6V maximum|
#### Module Pin 6 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Do not connect to anything|
#### Module Pin 7 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 8 (PMID)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | PMID|
| Description | Connected to the PMID pin of the PMIC|
#### Module Pin 9 (3V3)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | 3V3|
| Description | Regulated 3.3V DC output, maximum load 800 mA. Cannot be used as a power input.|
#### Module Pin 10
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | VDDA | NC|
| Description | Power input for ADC. Normally connected to 3V3. Must always be within 300 mV of 3V3. | Do not connect to anything|
#### Module Pin 11
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | VBAT | NC|
| Description | Battery for internal real-time clock, backup registers, and SRAM. Supply 1.65VDC to 3.6 VDC at 19 μA.. | Do not connect to anything|
#### Module Pin 12 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 13 (USBDATA+)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### Module Pin 14 (USBDATA-)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### Module Pin 15 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 16 (TX)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | TX | TX|
| Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial1 TX (transmitted data), GPIO, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| UART serial | TX. Use Serial1 object. | TX. Use Serial1 object.|
| Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 17 (RX)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | RX | RX|
| Description | Serial1 RX (received data), GPIO, PWM. | Serial1 RX (received data), GPIO, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| UART serial | RX. Use Serial1 object. | RX. Use Serial1 object.|
| Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | Yes|
#### Module Pin 18 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 19 (WKP)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | WKP | WKP|
| Pin Alternate Name | A7 | A7|
| Description | WKP/A7 Wakeup (active high), analog in, GPIO. | WKP/A7 Wakeup (active high), analog in, GPIO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 20
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | DAC | A6|
| Pin Alternate Name | A6 | n/a|
| Description | DAC/A6 True analog out, analog in, GPIO. | A6 analog in, GPIO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (DAC) | Yes | No|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
#### Module Pin 21 (A5)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A5 | A5|
| Description | A5 Analog in, GPIO, SPI. | A5 Analog in, GPIO, SPI.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object.|
| Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 22 (A4)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A4 | A4|
| Description | A4 Analog in, GPIO, SPI. | A4 Analog in, GPIO, SPI, PWM.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MISO. Use SPI object. | MISO. Use SPI object.|
| Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 23 (A3)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A3 | A3|
| Description | A3 True analog out, analog in, GPIO. | A3 True analog out, analog in, GPIO, PWM|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (DAC) | Yes | No|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SCK. Use SPI object. | SCK. Use SPI object.|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
#### Module Pin 24 (A2)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A2 | A2|
| Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, GPIO, SPI SS, PWM|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead.|
| Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 25 (A1)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A1 | A1|
| Description | A1 Analog in, GPIO | A1 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 26 (A0)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | A0 | A0|
| Description | A0 Analog in, GPIO | A0 Analog in, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | Yes|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 27 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 28
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B5 | NC|
| Description | B5 Analog in, GPIO | Do not connect to anything|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogRead | Yes | n/a|
| Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler. | n/a|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 29
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B4 | NC|
| Description | B4 Analog in, GPIO | Do not connect to anything|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogRead | Yes | n/a|
| Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | n/a|
| Input is 5V Tolerant | Yes | n/a|
#### Module Pin 30 (B3)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B3 | B3|
| Description | B3, analog in, GPIO, PWM | B3, GPIO, PWM|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 31 (B2)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B2 | B2|
| Description | B2, analog in, GPIO, PWM | B2, GPIO, PWM|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogRead | Yes | No|
| Supports analogWrite (PWM) | Yes | Timer is shared with RGB LED; duty cycle can be set but not frequency.|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 32 (B1)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B1 | B1|
| Description | B1, GPIO, PWM | B1, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 33 (B0)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | B0 | B0|
| Description | B0, GPIO, PWM | B0, GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 34 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 35
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D7 | SWDIO|
| Description | D7 GPIO | SWDIO for JTAG/SWD debugger. Not GPIO.|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | No|
| Supports attachInterrupt | No. Shared with BAT_INT_PC13 | No|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a|
| SWD interface | SWDIO. 40K pull-up at boot. | SWDIO|
#### Module Pin 36
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D6 | SWDCLK|
| Description | D6 GPIO | SWCLK for JTAG/SWD debugger. Not GPIO.|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | No|
| Supports attachInterrupt | Yes | No|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a|
| SWD interface | SWCLK. 40K pull-down at boot. | SWCLK|
#### Module Pin 37 (D5)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D5 | D5|
| Description | D5 GPIO, SPI1 | D5 GPIO, SPI1 SS|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however.|
| Supports attachInterrupt | Yes | Yes. You can only have 8 active interrupt pins.|
| I2S interface | I2S3_WS | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a|
#### Module Pin 38
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D4 | SWO|
| Description | D4 GPIO, SPI1 | SWO for JTAG/SWD debugger. Not GPIO.|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | No|
| SPI interface | SCK. Use SPI1 object. | n/a|
| Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | No|
| I2S interface | I2S3_SD | n/a|
| Input is 5V Tolerant | Yes | No|
| JTAG interface | JTAG TDO. Floating at boot. | n/a|
| SWD interface | n/a | SWO|
#### Module Pin 39
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D3 | NC|
| Description | D3 GPIO, SPI1 | Do not connect to anything|
| Supports digitalRead | Yes | n/a|
| Supports digitalWrite | Yes | n/a|
| Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | n/a|
| Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | n/a|
| SPI interface | MISO. Use SPI1 object. | n/a|
| Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | n/a|
| Input is 5V Tolerant | Yes | n/a|
| JTAG interface | JTAG RST. 40K pull-up at boot. | n/a|
#### Module Pin 40 (D2)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D2 | D2|
| Description | D2 GPIO, SPI1, CAN | D2 GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | Yes|
| Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | Yes|
| SPI interface | MOSI. Use SPI1 object. | n/a|
| Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| CAN interface | CAN2_RX | n/a|
| I2S interface | I2S3_SD | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 41 (D1)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D1 | D1|
| Description | D0 GPIO, I2C, CAN | D0 GPIO, I2C|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| UART serial | n/a | CTS flow control (optional). Use Serial1 object.|
| I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| CAN interface | CAN2_TX | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 42 (D0)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | D0 | D0|
| Description | D0 GPIO, I2C | D0 GPIO, I2C|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | Yes | Yes|
| Supports tone | Yes | Yes|
| UART serial | n/a | RTS flow control (optional). Use Serial1 object.|
| I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor.|
| Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 43 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 44 (C5)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C5 | C5|
| Description | I2C, CAN, GPIO. | I2C|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | No|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| I2C interface | SCL. Use Wire1 object. You can only use Wire or Wire1, not both! | SCL. Use Wire1 object. Shared with PMIC and Fuel Gauge.|
| Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler. | n/a|
| CAN interface | CAN1_RX | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 45 (C4)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C4 | C4|
| Description | I2C, CAN, GPIO. | I2C|
| Supports digitalRead | Yes | No|
| Supports digitalWrite | Yes | No|
| Supports analogWrite (PWM) | Yes | No|
| Supports tone | Yes | No|
| I2C interface | SDA. Use Wire1 object. You can only use Wire or Wire1, not both! | SDA. Use Wire1 object. Shared with PMIC and Fuel Gauge.|
| Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler. | No|
| CAN interface | CAN1_TX | n/a|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 46 (C3)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C3 | C3|
| Description | Serial4 TX (transmitted data), SPI2, GPIO. | SPI1, GPIO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | TX. Use Serial4 object. | n/a|
| SPI interface | SCK. Use SPI2 object. | SCK. Use SPI1 object.|
| Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 47 (C2)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C2 | C2|
| Description | Serial4 RX (received data), SPI2, GPIO. | SPI1, GPIO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | RX. Use Serial4 object. | n/a|
| SPI interface | MISO. Use SPI2 object. | MISO. Use SPI1 object.|
| Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 48 (C1)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C1 | C1|
| Description | Serial5 TX (trasmitted data), SPI2, GPIO. | SPI1, GPIO.|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| UART serial | TX. Use Serial5 object. | n/a|
| SPI interface | MOSI. Use SPI2 object. | MOSI. Use SPI1 object.|
| Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 49 (C0)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | C0 | C0|
| Description | Serial5 RX (received data), GPIO. | GPIO|
| Supports digitalRead | Yes | Yes|
| Supports digitalWrite | Yes | Yes|
| Supports analogWrite (PWM) | No | Yes|
| Supports tone | No | Yes|
| UART serial | RX. Use Serial5 object. | n/a|
| Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins.|
| Input is 5V Tolerant | Yes | No|
#### Module Pin 50 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Do not connect to anything|
#### Module Pin 51 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 52 (RGBB)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | RGBB | RGBB|
| Description | RGB LED Blue | RGB LED Blue|
| UART serial | RX. Use Serial2 object. | n/a|
#### Module Pin 53 (RGBG)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | RGBG | RGBG|
| Description | RGB LED Green | RGB LED Green|
| UART serial | TX. Use Serial2 object. | n/a|
#### Module Pin 54 (RGBR)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | RGBR|
| Description | RGB LED Red|
#### Module Pin 55 (MODE)
| | E Series | E404X |
| :--- | :--- | :--- |
| Pin Name | MODE | MODE|
| Description | MODE button, has internal pull-up. Pin number constant is BTN. | MODE button, has internal pull-up. Pin number constant is BTN.|
| I2S interface | I2S3_MCK | n/a|
#### Module Pin 56 (RESET)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | RESET|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### Module Pin 57 (STAT)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | STAT|
| Description | Charge status output from the PMIC.|
#### Module Pin 58 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 59 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 60 (GND)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground. Be sure to connect all GND pins.|
#### Module Pin 61 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 62 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 63 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 64 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 65 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 66 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 67 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 68 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 69 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 70 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 71 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|
#### Module Pin 72 (NC)
| | Unchanged between E Series and E404X |
| :--- | :--- |
| Pin Name | NC|
| Description | Leave unconnected|


{{!-- END do not edit content above, it is automatically generated aa218eb3-5975-4ba6-b26d-2a5d43c5378e --}}

## Software


### Third-party libraries

Most third-party libraries are believed to be compatible. The exceptions include:

- Libraries that use peripherals that are not present (such as DAC)
- Libraries for MCU-specific features (such as ADC DMA)
- Libraries that are hardcoded to support only certain platforms by their PLATFORM_ID

Since the E404X uses the same MCU as Gen 3 devices (Boron, B Series SoM, Tracker SoM), most libraries intended for those platforms will work with no changes or minimal changes.
