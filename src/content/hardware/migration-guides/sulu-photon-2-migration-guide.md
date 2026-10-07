---
title: Sulu from Photon 2 migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the Photon 2 to Sulu
---

# {{title}}

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/sulu-photon-2-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

{{migration-guide leftImg="/assets/images/photon2-rendering.png" leftStyle="transform: matrix(0.92, 0, 0, 0.92, 0, 7);" rightImg="/assets/images/electron-2/electron-2-rendering.png"}}



### SPI - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-spi-comparison.svg" alt="SPI comparison" class="full-width"}}

Both Sulu and the Photon 2 support two SPI interfaces, however there are important differences.

{{!-- BEGIN shared-blurb 01d93dfc-5739-4690-b8e2-4c1e5a35bd75 --}}
|                     | Photon 2 | Sulu |
| :------------------ | :--- | :--- |
| `SPI`               | 25 MHz | 50 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | | &check; |
| Hardware peripheral | RTL872x SPI1 | RTL872x SPI0 |
|                     | | |
| `SPI1`              | 50 MHz | 25 MHz |
| SPI Master          | &check; | &check; |
| SPI Slave           | &check; | |
| Pins                | D2 - D5 | A2 - A5 |
| Hardware peripheral | RTL872x SPI0 | RTL872x SPI1 |
{{!-- END shared-blurb --}}

Additionally, `SPI1` is on different pins.


{{!-- BEGIN do not edit content below, it is automatically generated 6b9bbf34-54df-4cbb-bf2f-8dda881901e4 --}}

| Photon 2 Pin Name | Photon 2 SPI | Sulu Pin Name | Sulu SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | &nbsp; | A3 / D16 | SPI1 (MOSI) |
| S4 / D19 | &nbsp; | A4 / D15 | SPI1 (MISO) |
| S3 / D18 | SPI (SS) | A5 / D14 | SPI1 (SCK) |
| SCK / D17 | SPI (SCK) | SCK / D13 | SPI (SCK) |
| MOSI / D15 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| MISO / D16 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| D2 | SPI1 (MOSI) | D2 | &nbsp; |
| D3 | SPI1 (MISO) | D3 | &nbsp; |
| D4 | SPI1 (SCK) | D4 | SPI (SS) |
| D5 | SPI1 (SS) | D5 | SPI1 (SS) |


{{!-- END do not edit content above, it is automatically generated --}}


### Serial (UART) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-serial-comparison.svg" alt="Serial comparison" class="full-width"}}

The primary UART serial (`Serial1`) is on the TX and RX pins on both Sulu and Photon 2. On Sulu only, `Serial1` optionally supports hardware flow control. On the Photon 2 only, there are additional UART serial ports `Serial2` and `Serial3`.

{{!-- BEGIN do not edit content below, it is automatically generated 5fdfbe77-2ae3-406f-b4e0-e6aafb8ae948 --}}

| Photon 2 Pin Name | Photon 2 Serial | Sulu Pin Name | Sulu Serial |
| :--- | :--- | :--- | :--- |
| SCK / D17 | Serial3 (RTS) | SCK / D13 | &nbsp; |
| MOSI / D15 | Serial3 (TX) | MOSI / D12 | &nbsp; |
| MISO / D16 | Serial3 (RX) | MISO / D11 | &nbsp; |
| RX / D9 | Serial1 (RX)  | RX / D10 | Serial1 (RX)  |
| TX / D8 | Serial1 (TX) | TX / D9 | Serial1 (TX) |
| D2 | Serial2 (RTS) | D2 | Serial1 (RTS)  |
| D3 | Serial2 (CTS) | D3 | Serial1 (CTS)  |
| D4 | Serial2 (TX) | D4 | &nbsp; |
| D5 | Serial2 (RX) | D5 | &nbsp; |
| D10 / WKP | Serial3 (CTS) | D8 / WKP | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Analog input (ADC) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-adc-comparison.svg" alt="Serial comparison" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 28c6f04f-66e8-4b64-87d0-4f6cf18e9228 --}}

| Photon 2 Pin Name | Photon 2 ADC | Sulu Pin Name | Sulu ADC |
| :--- | :--- | :--- | :--- |
| A0 / D11 | &check; | A0 / D19 | &check; |
| A1 / D12 | &check; | A1 / D18 | &check; |
| A2 / D13 | &check; | A2 / D17 | &check; |
| A5 / D14 | &check; | A3 / D16 | &check; |
| S4 / D19 | &nbsp; | A4 / D15 | &check; |
| S3 / D18 | &nbsp; | A5 / D14 | &check; |
| D0 / A3 | &check; | D0 | &nbsp; |
| D1 / A4 | &check; | D1 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}

### PWM (Pulse-width modulation) - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-pwm-comparison.svg" alt="PWM comparison" class="full-width"}}


{{!-- BEGIN do not edit content below, it is automatically generated 817332fa-3736-4879-a091-256b97e9d5c1 --}}

| Photon 2 Pin Name | Photon 2 PWM | Sulu Pin Name | Sulu PWM |
| :--- | :--- | :--- | :--- |
| A2 / D13 | &check; | A2 / D17 | &check; |
| A5 / D14 | &check; | A3 / D16 | &check; |
| S4 / D19 | &nbsp; | A4 / D15 | &check; |
| SCK / D17 | &nbsp; | SCK / D13 | &check; |
| MOSI / D15 | &check; | MOSI / D12 | &check; |
| MISO / D16 | &check; | MISO / D11 | &check; |
| RX / D9 | &nbsp; | RX / D10 | &check; |
| TX / D8 | &nbsp; | TX / D9 | &check; |
| D0 / A3 | &nbsp; | D0 | &check; |
| D1 / A4 | &check; | D1 | &check; |
| D4 | &nbsp; | D4 | &check; |


{{!-- END do not edit content above, it is automatically generated --}}

### Boot mode pins - Sulu from Photon 2

{{!-- imageOverlay src="/assets/images/sulu/sulu-photon2-boot-comparison.svg" alt="Boot mode comparison" class="full-width" --}}

These pins have a special function at boot. Beware when using these pins as input as they can trigger special modes in the MCU.

{{!-- BEGIN do not edit content below, it is automatically generated 5baa3b30-adfa-4fbb-a77c-0cacd12bb039 --}}

| Photon 2 Pin Name | Photon 2 Boot | Sulu Pin Name | Sulu Boot |
| :--- | :--- | :--- | :--- |
| TX / D8 | Low at boot triggers ISP flash download | TX / D9 | &nbsp; |
| D6 | SWCLK. 40K pull-down at boot. | D6 | &nbsp; |
| D7 | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | D7 | Low at boot triggers MCU boot mode. |


{{!-- END do not edit content above, it is automatically generated --}}


### SWD - Sulu from Photon 2

{{imageOverlay src="/assets/images/sulu/sulu-photon2-swd-comparison.svg" alt="SWD comparison" class="full-width"}}

Sulu has dedicated pins for SWD debugging, available on the 10-pin debug connector on the top of the device. The Photon 2 also has this connector, but the pins are shared with GPIO pins.

<div align="center"><img src="/assets/images/boron/swd-connector-pinout.png" ></div>


{{!-- BEGIN do not edit content below, it is automatically generated 39c69dbe-1354-4b67-8f20-ae279d6f45d5 --}}

| Photon 2 Pin Name | Photon 2 SWD | Sulu Pin Name | Sulu SWD |
| :--- | :--- | :--- | :--- |
| D6 | SWCLK | D6 | &nbsp; |
| D7 | SWDIO | D7 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated --}}


### Full module pin comparison - Sulu from Photon 2

{{imageOverlay src="/assets/images/photon-2-pinout.svg" alt="Photon 2 Pinout Diagram" class="full-width"}}
{{imageOverlay src="/assets/images/sulu/sulu-pinout.svg" alt="Pinout" class="full-width"}}

{{collapse op="start" label="Show pin details"}}
{{!-- BEGIN do not edit content below, it is automatically generated 9fb77145-edd4-4f0a-815a-fb1994390006 --}}

#### RST
| | Unchanged between Photon 2 and Sulu |
| :--- | :--- |
| Pin Name | RST|
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation.|
#### 3V3
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 500 mA | Regulated 3.3V DC output, maximum load 1000 mA |
#### MODE
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MODE | MODE |
| &nbsp; | Description | MODE button, has internal pull-up | MODE button, has internal pull-up |
| ∆ | Supports attachInterrupt | n/a | Yes |
#### GND
| | Unchanged between Photon 2 and Sulu |
| :--- | :--- |
| Pin Name | GND|
| Description | Ground.|
#### A0
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A0 | A0 |
| ∆ | Pin Alternate Name | D11 | D19 |
| &nbsp; | Description | A0 Analog in, PDM CLK, GPIO | A0 Analog in, PDM CLK, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 2.1K | 2.1K |
#### A1
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A1 | A1 |
| ∆ | Pin Alternate Name | D12 | D18 |
| &nbsp; | Description | A1 Analog in, PDM DAT, GPIO | A1 Analog in, PDM DAT, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 2.1K | 2.1K |
#### A2
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | A2 | A2 |
| ∆ | Pin Alternate Name | D13 | D17 |
| ∆ | Description | A2 Analog in, GPIO, PWM. | A2 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | ??? |
#### A5 / A3
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | A5 | A3 |
| ∆ | Pin Alternate Name | D14 | D16 |
| ∆ | Description | A5 Analog in, GPIO, PWM, Was A3 on Gen 3. | A3 Analog in, SPI1 MOSI, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | SPI interface | n/a | MOSI. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| &nbsp; | Internal pull resistance | 42K | 42K |
#### S4 / A4
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S4 | A4 |
| ∆ | Pin Alternate Name | D19 | D15 |
| ∆ | Description | S4 GPIO, Was A4 on Gen 3. | A4 Analog in, SPI1 MISO, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | SPI interface | n/a | MISO. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K. No internal pull up or pull down in HIBERNATE sleep mode. | ??? |
#### S3 / A5
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | S3 | A5 |
| ∆ | Pin Alternate Name | D18 | D14 |
| ∆ | Description | S3 GPIO, SPI SS, Was A5 on Gen 3. | A5 Analog in, SPI1 SCK, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | No | Yes |
| ∆ | SPI interface | Default SS for SPI. | SCK. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | 22K |
#### SCK
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | SCK | SCK |
| ∆ | Pin Alternate Name | D17 | D13 |
| ∆ | Description | SPI SCK, D13 GPIO, S3 GPIO, Serial3 RTS | D13 GPIO, SPI SCK, PWM, I2S CLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | RTS. Use Serial3 object. Flow control optional. | n/a |
| &nbsp; | SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | I2S interface | n/a | I2S CLK |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### MOSI
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MOSI | MOSI |
| ∆ | Pin Alternate Name | D15 | D12 |
| ∆ | Description | D15 GPIO, S0 GPIO, PWM, SPI MOSI, Serial3 TX | SPI MOSI, D12 GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | UART serial | TX. Use Serial3 object. | n/a |
| &nbsp; | SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### MISO
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | MISO | MISO |
| ∆ | Pin Alternate Name | D16 | D11 |
| ∆ | Description | D16 GPIO, S1 GPIO, PWM, SPI MISO, Serial3 RX. | SPI MISO, D11 GPIO, PWM, I2S TX |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | UART serial | RX. Use Serial3 object. | n/a |
| &nbsp; | SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | I2S interface | n/a | I2S TX |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### RX
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | RX | RX |
| ∆ | Pin Alternate Name | D9 | D10 |
| ∆ | Description | Serial1 RX (received data), GPIO | Serial RX, PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | 2.1K |
#### TX
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | D8 | D9 |
| ∆ | Description | Serial1 TX (transmitted data), GPIO | Serial TX, PWM, GPIO, I2S MCLK |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | I2S interface | n/a | I2S MCLK |
| ∆ | Internal pull resistance | 42K | 2.1K |
| ∆ | Signal used at boot | Low at boot triggers ISP flash download | n/a |
#### D0
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Pin Alternate Name | A3 | n/a |
| ∆ | Description | D0 GPIO, I2C SDA, A3 Analog In | I2C SDA, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. | SDA. Use Wire object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K | ??? |
#### D1
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Pin Alternate Name | A4 | n/a |
| ∆ | Description | D1 GPIO, PWM, I2C SCL, A4 Analog In | I2C SCL, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogRead | Yes | No |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| &nbsp; | Supports tone | Yes | Yes |
| ∆ | I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. | SCL. Use Wire object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 22K | ??? |
#### D2
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | D2 GPIO, Serial2 RTS, SPI1 MOSI | D2 GPIO, Serial RTS flow control (optional) |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | RTS. Use Serial2 object. Flow control optional. | RTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D3
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | D3 GPIO, Serial2 CTS, SPI1 MISO | D3 GPIO, Serial1 CTS flow control (optional) |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | CTS. Use Serial2 object. Flow control optional. | CTS. Use Serial1 object. |
| ∆ | SPI interface | MISO. Use SPI1 object. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D4
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | D4 GPIO, Serial2 TX, SPI1 SCK | D4 GPIO, SPI SS, PWM, I2S WS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | Yes |
| ∆ | UART serial | TX. Use Serial2 object. | n/a |
| ∆ | SPI interface | SCK. Use SPI1 object. | SS. Use SPI object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | I2S interface | n/a | I2S WS |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D5
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | D5 GPIO, Serial2 RX, SPI1 SS | D5 GPIO, SPI1 SS |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | RX. Use Serial2 object. | n/a |
| ∆ | SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | SS. Use SPI1 object. |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### D6
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | D6 GPIO, SWCLK. | GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 42K | ??? |
| ∆ | SWD interface | SWCLK. 40K pull-down at boot. | n/a |
| ∆ | Signal used at boot | SWCLK. 40K pull-down at boot. | n/a |
#### D7
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | D7 GPIO, Blue LED, SWDIO | GPIO |
| ∆ | Supports digitalRead | Yes. | Yes |
| ∆ | Supports digitalWrite | Yes. On the Photon this is the blue D7 LED. | Yes |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | 13K |
| ∆ | SWD interface | SWDIO. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | SWDIO. 40K pull-up at boot. Low at boot triggers MCU test mode. | Low at boot triggers MCU boot mode. |
#### D10 / D8
|   |   | Photon 2 | Sulu |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Name | D10 | D8 |
| &nbsp; | Pin Alternate Name | WKP | WKP |
| ∆ | Description | D10 GPIO. Serial3 CTS, WKP. Was D8/WKP on Gen 3. | GPIO, WKP |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | UART serial | CTS. Use Serial3 object. Flow control optional. | n/a |
| &nbsp; | Supports attachInterrupt | Yes | Yes |
| ∆ | Internal pull resistance | 2.1K | ??? |
#### VUSB
| | Unchanged between Photon 2 and Sulu |
| :--- | :--- |
| Pin Name | VUSB|
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations.|
| Input is 5V Tolerant | Yes|
#### EN
| | Unchanged between Photon 2 and Sulu |
| :--- | :--- |
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### LI+
| | Unchanged between Photon 2 and Sulu |
| :--- | :--- |
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|


{{!-- END do not edit content above, it is automatically generated --}}
{{collapse op="end"}}
