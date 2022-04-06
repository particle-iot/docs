---
title: P2 from Argon migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Argon to P2
---

# {{title}}

**Pre-release version 2022-04-06**

{{box op="start" cssClass="boxed warningBox"}}
This is an pre-release migration guide and the contents are subject to change.
{{box op="end"}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-argon-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

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
| UART | 1 | 2 | 2<sup>6</sup> | 1 |
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


The Photon 2 is the easiest upgrade from the Argon as it's mostly pin compatible with the Argon. However, if you are looking at mass-production, you may want to consider moving from the Argon directly to the P2. The Photon 2 module contains a P2 module.


### SPI

Both the Argon and P2 have two SPI ports, however the pins are different for both SPI ports. Also note that while pins D2 - D4 are used for SPI1 on both, the actual functions (SCK, MOSI, MISO) are on different pins!

The following are all SPI-related pins on the P1 and P2:

{{!-- BEGIN do not edit content below, it is automatically generated cf7eb295-1ecf-4d24-b2a1-dc8a654321362 --}}

| Argon Pin Name | Argon SPI | P2 Pin Name | P2 SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | SPI (SS) | A5 / D14 | &nbsp; |
| MISO / D11 | SPI (MISO) | A0 / D11 | &nbsp; |
| MOSI / D12 | SPI (MOSI) | A1 / D12 | &nbsp; |
| SCK / D13 | SPI (SCK) | A2 / D13 | &nbsp; |
| D2 | SPI1 (SCK) | D2 | SPI1 (MOSI) |
| D3 | SPI1 (MOSI) | D3 | SPI1 (MISO) |
| D4 | SPI1 (MISO) | D4 | SPI1 (SCK) |
| D5 | &nbsp; | D5 | SPI1 (SS) |
| &nbsp; | &nbsp; | S0 / D15 | SPI (MOSI) |
| &nbsp; | &nbsp; | S1 / D16 | SPI (MISO) |
| &nbsp; | &nbsp; | S2 / D17 | SPI (SCK) |
| &nbsp; | &nbsp; | S3 / D18 | SPI (SS) |


{{!-- END do not edit content above, it is automatically generated --}}





### Pin functions removed

The following pins served Argon-specific uses and are NC on the P2. You should not connect anything to these pins.

{{!-- BEGIN do not edit content below, it is automatically generated d524a654-8845-4d9c-b8c4-05b60dca363e --}}
{{!-- END do not edit content above, it is automatically generated --}}

### Pin functions added

The following pins did not exist on the Argon but are available on the P2.


{{!-- BEGIN do not edit content below, it is automatically generated fa0065f1-ba10-43af-9b5c-78338c2d02b8 --}}

| Pin | Pin Name | Description |
| :---: | :--- | :--- |
| 5 | 3V3_IO | 3.3V power to MCU IO. |
| 2 | 3V3_RF | 3.3V power to RF module |
| 30 | D10 / WKP | GPIO. (Was WKP/A7 on P1.) |
| 31 | RGBB | RGB LED Blue |
| 32 | RGBG | RGB LED Green |
| 29 | RGBR | RGB LED Red |
| 40 | S0 / D15 | S0 GPIO, PWM, SPI MOSI. (Was P1S0 on P1.) |
| 41 | S1 / D16 | S1 GPIO, PWM, SPI MISO. (Was P1S1 on P1.) |
| 42 | S2 / D17 | S2 GPIO, SPI SCK. (Was P1S2 on P1.) |
| 44 | S3 / D18 | S3 GPIO. (Was P1S3 on P1.), SPI SS |
| 47 | S4 / D19 | S4 GPIO. (Was P1S4 on P1.) |
| 33 | S6 / D21 | S6 GPIO. (Was P1S6/TESTMODE on P1.) |
| 46 | SETUP | SETUP button, has internal pull-up. Pin number constant is BTN. |
| 62 | USBDATA- | USB Data- |
| 61 | USBDATA+ | USB Data+ |
| 12 | VBAT_MEAS | Battery voltage measurement (optional). |


{{!-- END do not edit content above, it is automatically generated  --}}

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated ee790982-5af6-44e2-aabf-89cd1ff1f392 --}}

#### 3V3
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 2 | 26 |
| Pin Name | 3V3 | 3V3 |
| Description | Regulated 3.3V DC output, maximum load 1000 mA | 3.3V power to MCU |
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
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 5 | 50 |
| Pin Name | A0 | A0 |
| Pin Alternate Name | D19 | D11 |
| Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### A1
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 6 | 43 |
| Pin Name | A1 | A1 |
| Pin Alternate Name | D18 | D12 |
| Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### A2
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 7 | 49 |
| Pin Name | A2 | A2 |
| Pin Alternate Name | D17 | D13 |
| Description | A2 Analog in, GPIO, PWM | A2 Analog in, PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### A3
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 8 | 36 |
| Pin Name | A3 | D0 |
| Pin Alternate Name | D16 | A3 |
| Description | A3 Analog in, GPIO, PWM | D0 GPIO, PWM, I2C, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | Yes |
| I2C interface | n/a | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### A4
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 9 | 35 |
| Pin Name | A4 | D1 |
| Pin Alternate Name | D15 | A4 |
| Description | A4 Analog in, GPIO, PWM | D1 GPIO, PWM, I2C, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes |
| I2C interface | n/a | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### A5
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 10 | 23 |
| Pin Name | A5 | A5 |
| Pin Alternate Name | D14 | D14 |
| Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, GPIO, PWM. |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | Yes |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D0
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 16 | 36 |
| Pin Name | D0 | D0 |
| Pin Alternate Name | n/a | A3 |
| Description | I2C SDA, GPIO | D0 GPIO, PWM, I2C, A3 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| I2C interface | SDA. Use Wire object. | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D1
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 17 | 35 |
| Pin Name | D1 | D1 |
| Pin Alternate Name | n/a | A4 |
| Description | I2C SCL, GPIO | D1 GPIO, PWM, I2C, A4 Analog In |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| I2C interface | SCL. Use Wire object. | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D10
| | Added to P2 |
| :--- | :--- |
| Pin Number | 30|
| Pin Name | D10|
| Pin Alternate Name | WKP|
| Description | GPIO. (Was WKP/A7 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes|
#### D11
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 13 | 50 |
| Pin Name | MISO | A0 |
| Pin Alternate Name | D11 | D11 |
| Description | SPI MISO, GPIO | A0 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| SPI interface | MISO. Use SPI object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D12
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 12 | 43 |
| Pin Name | MOSI | A1 |
| Pin Alternate Name | D12 | D12 |
| Description | SPI MOSI, GPIO | A1 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| SPI interface | MOSI. Use SPI object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D13
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 11 | 49 |
| Pin Name | SCK | A2 |
| Pin Alternate Name | D13 | D13 |
| Description | SPI SCK, GPIO | A2 Analog in, PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | No | Yes |
| Supports analogWrite (PWM) | No | Yes |
| Supports tone | No | Yes |
| SPI interface | SCK. Use SPI object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D2
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 18 | 45 |
| Pin Name | D2 | D2 |
| Description | SPI1 SCK, Wire1 SDA, Serial1 RTS, PWM, GPIO | D2 GPIO, Serial2, SPI1 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Options RTS hardware flow control for Serial1 | RTS. Use Serial2 object. Flow control optional. |
| SPI interface | SCK. Use SPI1 object. | MOSI. Use SPI1 object. |
| I2C interface | SDA. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D20
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 3 | 48 |
| Pin Name | MODE | S5 |
| Pin Alternate Name | D20 | D20 |
| Description | MODE button, has internal pull-up | S5 GPIO. (Was P1S5 on P1.) |
| Supports digitalWrite | n/a | Yes |
| Supports attachInterrupt | n/a | Yes |
#### D3
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 19 | 51 |
| Pin Name | D3 | D3 |
| Description | SPI1 MOSI, Wire1 SCL, Serial1 CTS, PWM, GPIO | D3 GPIO, Serial2, SPI1 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Options CTS hardware flow control for Serial1 | CTS. Use Serial2 object. Flow control optional. |
| SPI interface | MOSI. Use SPI1 object. | MISO. Use SPI1 object. |
| I2C interface | SCL. Use Wire1 object. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D4
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 20 | 52 |
| Pin Name | D4 | D4 |
| Description | SPI1 MISO, PWM, GPIO | D4 GPIO, Serial2, SPI1 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | TX. Use Serial2 object. |
| SPI interface | MISO. Use SPI1 object. | SCK. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D5
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 21 | 53 |
| Pin Name | D5 | D5 |
| Description | PWM, GPIO | D5 GPIO, Serial2, SPI1 |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | RX. Use Serial2 object. |
| SPI interface | n/a | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### D6
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 22 | 55 |
| Pin Name | D6 | D6 |
| Description | PWM, GPIO | D6 GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| SWD interface | n/a | SWCLK. 40K pull-down at boot. |
#### D7
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 23 | 54 |
| Pin Name | D7 | D7 |
| Description | PWM, GPIO | D7 GPIO |
| Supports digitalRead | Yes | Yes. |
| Supports digitalWrite | Yes | Yes. On the Photon this is the blue D7 LED. |
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
| SWD interface | n/a | SWDIO. 40K pull-up at boot. |
#### D8
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 23 | 64 |
| Pin Name | D8 | TX |
| Pin Alternate Name | n/a | D8 |
| Description | GPIO, PWM | Serial1 TX (transmitted data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| UART serial | n/a | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### EN
| | Removed from Argon |
| :--- | :--- |
| Pin Number | 25|
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 4 | 1 |
| Pin Name | GND | GND |
| Description | Ground. | Ground. Be sure you connect all P1 ground pins. |
#### LI+
| | Removed from Argon |
| :--- | :--- |
| Pin Number | 26|
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### NC
| | Added to P2 |
| :--- | :--- |
| Pin Number | 7|
| Pin Name | NC|
| Description | No connection. Do not connect anything to this pin.|
#### RGBB
| | Added to P2 |
| :--- | :--- |
| Pin Number | 31|
| Pin Name | RGBB|
| Description | RGB LED Blue|
| Supports attachInterrupt | Yes|
#### RGBG
| | Added to P2 |
| :--- | :--- |
| Pin Number | 32|
| Pin Name | RGBG|
| Description | RGB LED Green|
| Supports attachInterrupt | Yes|
#### RGBR
| | Added to P2 |
| :--- | :--- |
| Pin Number | 29|
| Pin Name | RGBR|
| Description | RGB LED Red|
| Supports attachInterrupt | Yes|
#### RST
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 1 | 34 |
| Pin Name | RST | RST |
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset. Pull low to reset; can leave unconnected in normal operation. |
#### RX
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 14 | 63 |
| Pin Name | RX | RX |
| Pin Alternate Name | D10 | D9 |
| Description | Serial RX, GPIO | Serial1 RX (received data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | RX Use Serial1 object. | RX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### S0
| | Added to P2 |
| :--- | :--- |
| Pin Number | 40|
| Pin Name | S0|
| Pin Alternate Name | D15|
| Description | S0 GPIO, PWM, SPI MOSI. (Was P1S0 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| SPI interface | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes|
#### S1
| | Added to P2 |
| :--- | :--- |
| Pin Number | 41|
| Pin Name | S1|
| Pin Alternate Name | D16|
| Description | S1 GPIO, PWM, SPI MISO. (Was P1S1 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| SPI interface | MISO. Use SPI object.|
| Supports attachInterrupt | Yes|
#### S2
| | Added to P2 |
| :--- | :--- |
| Pin Number | 42|
| Pin Name | S2|
| Pin Alternate Name | D17|
| Description | S2 GPIO, SPI SCK. (Was P1S2 on P1.)|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | SCK. Use SPI object.|
| Supports attachInterrupt | Yes|
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
#### SETUP
| | Added to P2 |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | SETUP|
| Description | SETUP button, has internal pull-up. Pin number constant is BTN.|
| Supports attachInterrupt | Yes|
#### TX
|   | Argon | P2 |
| :--- | :--- | :--- |
| Pin Number | 15 | 64 |
| Pin Name | TX | TX |
| Pin Alternate Name | D09 | D8 |
| Description | Serial TX, GPIO | Serial1 TX (transmitted data), GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | TX Use Serial1 object. | TX. Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes |
#### USBDATA-
| | Added to P2 |
| :--- | :--- |
| Pin Number | 62|
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Added to P2 |
| :--- | :--- |
| Pin Number | 61|
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VBAT_MEAS
| | Added to P2 |
| :--- | :--- |
| Pin Number | 12|
| Pin Name | VBAT_MEAS|
| Description | Battery voltage measurement (optional).|
#### VUSB
| | Removed from Argon |
| :--- | :--- |
| Pin Number | 24|
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|


{{!-- END do not edit content above, it is automatically generated  --}}
