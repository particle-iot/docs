---
title: B Series from Boron Migration Guide
columns: two
layout: commonTwo.hbs
description: Learn about migrating from the Boron to the B Series
---

# {{title}}

{{!-- BEGIN shared-blurb b69a2546-9baa-11ec-b909-0242ac120002 --}}
![B Series](/assets/images/b-series/b-series-top.png)

The B Series SoM (system-on-a-module) is similar to the Boron in that it is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

One of the benefits is that many of the extra features on the Boron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

| Feature | Boron | B Series SoM | SoM Base Board | Tracker SoM |
| --- | :---: | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |&check; | 
| MFF2 SMD Particle SIM<sup>2</sup> | &check; | &check; | &nbsp; |&check; | 
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional | Optional |
| Status LED | &check; | &nbsp; | Optional | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional | Optional |
| Battery Connector | &check; | &nbsp; | Optional | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional | &check; | 

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

<sup>2</sup>The built-in Particle SIM card is [free for use](/tutorials/device-cloud/introduction/#free-tier) up to certain limits, no credit card required.
{{!-- END shared-blurb --}}



{{!-- BEGIN shared-blurb 97fa98d2-9baa-11ec-b909-0242ac120002 --}}
The available models include:

| Model | Region | EtherSIM | Bands | Replacement |
| :--- | :--- | :---: | :--- | :--- |
| B404X | United States, Canada, Mexico | &check; | LTE Cat M1 | |
| B524 | Europe, Australia, New Zealand | &check; | LTE Cat M1 | |
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Use B404X instead |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Use B404X instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Use B524 instead |

- The B404X, B404, and B402 cannot be used in Central or South America.
- The B524 is only recommended for use in Europe, Australia, and New Zealand.
- The B524 and B523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

### Datasheets

- [B404X/B4404/B402 datasheet](/datasheets/boron/b404x-b404-b402-datasheet/)
- [B524/B523 datasheet](/datasheets/boron/b524-b523-datasheet/)
- [B Series evaluation board](/datasheets/boron/b-series-eval-board/)

If you want to migrate from the Electron or E Series to the B Series SoM, see [Gen 2 cellular migration](/tutorials/learn-more/gen2-cellular-migration/).

### Countries - B404X, B404

{{!-- BEGIN do not edit content below, it is automatically generated c9241a2c-76e0-11eb-9439-0242ac130002 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Canada | B404 | M1 | Bell Mobility, Rogers Wireless, Telus |
| Mexico | B404 | M1 | AT&T |
| United States | B404 | M1 | AT&T |


{{!-- END do not edit content above, it is automatically generated c9241a2c-76e0-11eb-9439-0242ac130002 --}}

### Countries - B524

{{!-- BEGIN do not edit content below, it is automatically generated 99975710-76e0-11eb-9439-0242ac130002 --}}

| Country | Model | Technologies | Carriers |
| :--- | :--- | :--- | :--- |
| Albania | B524 | 2G, 3G, Cat1 | ALBtelecom, Telekom, Vodafone |
| Australia | B524 | 3G, Cat1 | Optus, Telstra, Vodafone |
| Austria | B524 | 2G, 3G, Cat1 | 3 (Drei), A1, T-Mobile |
| Belarus | B524 | 2G, 3G, Cat1 | A1 |
| Belgium | B524 | 2G, 3G, Cat1 | Base, Orange, Proximus |
| Bosnia and Herzegovina | B524 | 2G, 3G | BH Telecom, HT Eronet |
| Bulgaria | B524 | 2G, 3G | A1, Telenor, Vivacom |
| Croatia | B524 | 2G, 3G, Cat1 | Hrvatski Telekom, Tele2 |
| Czechia | B524 | 2G, 3G, Cat1 | O2, T-Mobile, Vodafone |
| Denmark | B524 | 2G, 3G, Cat1 | 3 (Tre), TDC, Telenor, Telia |
| Estonia | B524 | 2G, 3G, Cat1 | Elisa, Tele2, Telia |
| Faroe Islands | B524 | 2G, 3G | Faroese Telecom, Vodafone |
| Finland | B524 | 2G, 3G, Cat1 | DNA, Elisa, Telia |
| France | B524 | 2G, 3G, Cat1 | Bouygues, Free Mobile, Orange, SFR |
| Germany | B524 | 2G, 3G, Cat1 | O2, Telekom, Vodafone |
| Gibraltar | B524 | 2G, 3G, Cat1 | Gibtel |
| Greece | B524 | 2G, 3G, Cat1 | Cosmote, Vodafone, Wind |
| Hungary | B524 | 2G, 3G, Cat1 | Magyar Telekom, Telenor, Vodafone |
| Iceland | B524 | 2G, 3G, Cat1 | Nova, Siminn, Vodafone |
| Ireland | B524 | 2G, 3G, Cat1 | 3 (Tre), Meteor, O2, Vodafone |
| Italy | B524 | 2G, 3G, Cat1 | TIM, Vodafone, Wind |
| Latvia | B524 | 2G, 3G, Cat1 | Bite, LMT, Tele2 |
| Liechtenstein | B524 | 2G, 3G, Cat1 | Mobilkom, Orange |
| Lithuania | B524 | 2G, 3G, Cat1 | Bite, Omnitel, Tele2 |
| Luxembourg | B524 | 2G, 3G, Cat1 | Orange, POST, Tango |
| Malta | B524 | 2G, 3G, Cat1 | Go Mobile, Vodafone |
| Moldova | B524 | 2G, 3G, Cat1 | Moldcell, Orange |
| Montenegro | B524 | 2G, 3G, Cat1 | Mtel, T-Mobile, Telenor |
| Netherlands | B524 | 2G, 3G, Cat1 | KPN, T-Mobile, Vodafone |
| New Zealand | B524 | 2G, 3G, Cat1 | 2degrees, Spark, Vodafone |
| Norway | B524 | 2G, 3G, Cat1 | TDC, Telenor, Telia |
| Poland | B524 | 2G, 3G, Cat1 | Orange, Play, Plus, T-Mobile |
| Portugal | B524 | 2G, 3G, Cat1 | NOS, TMN, Vodafone |
| Romania | B524 | 2G, 3G, Cat1 | DigiMobil, Orange, Telekom Romania, Vodafone |
| Serbia | B524 | 2G, 3G, Cat1 | Telenor, VIP |
| Slovakia | B524 | 2G, 3G, Cat1 | O2, Orange, Telekom |
| Slovenia | B524 | 2G, 3G, Cat1 | A1, Mobitel |
| Spain | B524 | 2G, 3G, Cat1 | Orange, Telefonica, Vodafone, Yoigo |
| Sweden | B524 | 2G, 3G, Cat1 | 3 (Tre), Tele2, Telenor, Telia |
| Switzerland | B524 | 2G, 3G, Cat1 | Salt, Sunrise, Swisscom |
| United Kingdom | B524 | 2G, 3G, Cat1 | 3, EE, Manx, O2, Sure, Vodafone |


{{!-- END do not edit content above, it is automatically generated 99975710-76e0-11eb-9439-0242ac130002 --}}


### SKUs

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404MEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | GA |
| B404XMEA | B Series LTE CAT-M1 (NorAm), [x1] | NORAM | GA |
| B404XMTY | B Series LTE CAT-M1 (NorAm), Tray [x50] | NORAM | GA |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | EMEAA | GA |
| B524MTY | B Series LTE CAT-1/3G/2G (Europe), Tray [x50] | EMEAA | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | GA |


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

## Prototyping

The B Series SoM cannot be used without a base board. Typically you will create your own board, however there are two off-the-shelf options available:

### B Series Eval board

![B Series Eval](/assets/images/b-series/b-series-eval.png)

The [B Series evaluation board](/datasheets/boron/b-series-eval-board/) provides a variety of interfaces and access to all ports and pins on the B Series SoM. You can use the expansion connector to connect the evaluation board to a breadboard for prototyping. You can also add sensors and accessories using the Grove expansion connectors.

{{!-- BEGIN shared-blurb 19f889d4-a5c9-11ec-b909-0242ac120002 --}}
{{imageOverlay src="/assets/images/b-series/b-series-eval-labeled.png" alt="Ports Diagram" class="full-width"}}

| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
| 1 | **External Power** | 5-12 VDC. Minimum power requirements are 5VDC @500mA (when the LiPo battery) or 5VDC @2000mA (without LiPo battery). | 
| 2 | **LiPo Battery connector**| Plug in the LiPo battery here.|
| 3 |  **SoM USB port**       | This is the module's main USB port that connects to the microcontroller.|
| 4 | **JTAG connector**        | This can plug directly into the Particle debugger ribbon cable.|
| 5 | **Battery switch** | Controls power between the LiPo connector and the charge controller. |
| 6 | **SoM power switch** | Controls 3V3 power to the SoM |
| 7 | **u-blox USB port**  | This USB port connects directly to the u-blox module for firmware updates.|
| 8 | **Ethernet connector** | RJ45 connector for twisted pair Ethernet, 10 or 100 Mbit/sec. |
| 9 | **PoE connector** | Connect for the Particle PoE adapter for power-over-Ethernet. |
| 10 | **Cellular antenna** | Connector for an external SMA connected cellular antenna. |
| 11 | **Bluetooth antenna** | Connector for an external SMA connected antenna for Bluetooth networking. |
| 12 | **TF/SD Card** | MicroSD card slot. |
| 13 | **User LED** | Blue LED connected to pin D7. | 
| 14 | **Reset Button** |This is same as the RESET button on the Boron. |
| 15 | **RGB LED** | System status indicator RGB LED. |
| 16 | **Mode Button** | This is the same as the MODE button on the Boron. |
| 17 | **Expansion Connector** | Allows easy access to SoM IO pins. |
| 18 | **Grove Analog Port** | Connects to Seeed Studio Grove analog and digital boards.|
| 19 | **Grove I2C Port** | Connects to Seeed Studio Grove I2C boards.|
| 20 | **NFC Antenna** | U.FL connector for an NFC antenna (optional). |
| 21 | **Jumpers J12** | Enable or disable various features on the evaluation board. |
| 22 | **SoM connector** | M.2 connector for the Boron SoM. |
| 23 | **Jumpers J13** | Enable or disable various features on the evaluation board. |
| 24 | **Power Jumpers** | Enable or disable power from the evaluation board. |
| 25 | **Charge LED** | Indicate LiPo is charging. | 
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/b-series/b-series-eval-block.png" alt="Block Diagram" class="full-width"}}


### Mikroe Gen 3 SoM shield

{{!-- BEGIN shared-blurb b644c2f2-a5ca-11ec-b909-0242ac120002 --}}
![Mikroe Gen 3 SoM](/assets/images/prototyping/mikroe-som.png)

The [Gen 3 SoM shield](https://www.mikroe.com/click-shield-for-particle-gen-3) connects a B Series SoM to mikroBUS Click boards:

| M.2 Pin | Generic SoM | Gen 3 | mikroBUS #1 | mikroBUS #2 |
| :---: | :---: | :---: | :---: | :---: |
| 20 | SCL | D1 | SCL | SCL |
| 22 | SDA | D0 | SDA | SDA |
| 23 | ADC0 | A0 | | RST2 |
| 33 | ADC1 | A1 | AN1 | |
| 35 | ADC2 | A2 | | AN2|
| 36 | TX | TX/D9 | TX | TX
| 37 | ADC3 | A3 | | |
| 38 | RX | TX/D10 | RX | RX
| 41 | ADC4 | A4 | | |
| 43 | ADC5 | A5 | | |
| 45 | ADC6 | A6 | | |
| 47 | ADC7 | A7 | | |
| 48 | CS | D8 | CS1 | |
| 50 | MISO | MISO/D11 | MISO | MISO |
| 52 | MOSI | MOSI/D12 | MOSI | MOSI |
| 54 | SCK | SCK/D13 | SCK | SCK |
| 62 | GPIO0 | D22 | INT1 | |
| 64 | GPIO1 | D23 | | INT2 |
| 66 | PWM0 | D4 | | CS2 |
| 68 | PWM1 | D5 | PWM1 | |
| 70 | PWM2 | D6 | | PWM2 |
| 72 | PWM3 | D7 | RST1 | |
{{!-- END shared-blurb --}}

There is a huge library of mikroBUS Click expansion boards, however the caveat is that most of them do not already have a Particle software library. If the board is for a common sensor or chip, however, existing Particle libraries for the chip will typically work, even if not designed work with the Click.

For more information, see the [Mikroe community page](/community/mikroe/).

## Creating a board

### First SoM board tutorial

The [SoM first board tutorial](/tutorials/hardware-projects/som-first-board) shows how to get started with the M.2 SoM boards by making the simplest possible design. It's an introduction to working with surface mount components you will need in order to make your own SoM base board.

![Board Image](/assets/images/som-first-board/main.png)

### Basic SoM design

This design is a bit more complicated, and includes the PMIC and Fuel Gauge chips that are present on the Boron:

![Whole Board](/assets/images/app-notes/AN001/whole-board.png)

- RGB LED
- bq24195 PMIC
- MAX17043 Fuel Gauge
- USB Connector
- LiPo Connector (JST-PH)
- M.2 SoM Connector

This is the basic set of features you'll probably want to include in a LiPo battery-powered design. The Evaluation Board is also a good reference to use. This design, however, is simple enough that it can be hand-assembled, though you still need a reflow oven and some of the parts (in particular the fuel gauge and PMIC) are tiny and there are a lot of them. 

This board a two-layer circuit board so it can be manufactured inexpensively and edited using the free version of Eagle CAD.

As this board doesn't really do much, you'll unlikely use it as-is, but you can use it as a tutorial for how to hook up the PMIC and fuel gauge.


## Hardware differences


### Antennas

The Boron has a built-in BLE chip antenna, antenna switch, and U.FL antenna connector. The B Series SoM only has a U.FL connector for BLE and does not have a built-in antenna.

Both require an external cellular antenna.

Both require an external antenna for NFC tag.

### SPI

SPI is mostly unchanged between the Boron and B Series SoM. The only difference is the default SS pin, however you can choose any GPIO for your SPI chip select, you do not need to use the default.

{{!-- BEGIN do not edit content below, it is automatically generated 49b31eea-a5de-11ec-b909-0242ac120002 --}}

| Boron Pin Name | Boron SPI | B Series SoM Pin Name | B Series SoM SPI |
| :--- | :--- | :--- | :--- |
| A5 / D14 | SPI (SS) | A5 / D14 | &nbsp; |
| D2 | SPI1 (SCK) | D2 | SPI1 (SCK) |
| D3 | SPI1 (MOSI) | D3 | SPI1 (MOSI) |
| D4 | SPI1 (MISO) | D4 | SPI1 (MISO) |
| D8 | &nbsp; | D8 | SPI (SS) |
| MISO / D11 | SPI (MISO) | MISO / D11 | SPI (MISO) |
| MOSI / D12 | SPI (MOSI) | MOSI / D12 | SPI (MOSI) |
| SCK / D13 | SPI (SCK) | SCK / D13 | SPI (SCK) |


{{!-- END do not edit content above, it is automatically generated--}}

### Serial (UART)

Hardware serial (UART) ports are unchanged between the Boron and B Series SoM.

{{!-- BEGIN do not edit content below, it is automatically generated ef25dc00-a5de-11ec-b909-0242ac120002 --}}

| Boron Pin Name | Boron Serial | B Series SoM Pin Name | B Series SoM Serial |
| :--- | :--- | :--- | :--- |
| D2 | Serial1 RTS | D2 | Serial1 RTS |
| D3 | Serial1 CTS | D3 | Serial1 CTS |
| RX / D10 | Serial1 RX | RX / D10 | Serial1 RX |
| TX / D09 | Serial1 TX | TX / D9 | Serial1 TX |


{{!-- END do not edit content above, it is automatically generated--}}

### Analog input (ADC)

There are two additional ADC inputs on the B Series SoM. These can also be used as digital GPIO.

{{!-- BEGIN do not edit content below, it is automatically generated db4246c4-a5de-11ec-b909-0242ac120002 --}}

| Boron Pin Name | Boron ADC | B Series SoM Pin Name | B Series SoM ADC |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &check; |
| A3 / D16 | &check; | A3 / D16 | &check; |
| A4 / D15 | &check; | A4 / D15 | &check; |
| A5 / D14 | &check; | A5 / D14 | &check; |
| &nbsp; | &nbsp; | A6 | &check; |
| &nbsp; | &nbsp; | A7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

### PWM (Pulse-width modulation)

These are differences in pins that support PWM between the Boron and B Series SoM.

{{!-- BEGIN do not edit content below, it is automatically generated ce9644de-a5de-11ec-b909-0242ac120002' --}}

| Boron Pin Name | Boron PWM | B Series SoM Pin Name | B Series SoM PWM |
| :--- | :--- | :--- | :--- |
| A0 / D19 | &check; | A0 / D19 | &check; |
| A1 / D18 | &check; | A1 / D18 | &check; |
| A2 / D17 | &check; | A2 / D17 | &nbsp; |
| A3 / D16 | &check; | A3 / D16 | &nbsp; |
| A4 / D15 | &check; | A4 / D15 | &nbsp; |
| A5 / D14 | &check; | A5 / D14 | &nbsp; |
| &nbsp; | &nbsp; | A6 | &check; |
| &nbsp; | &nbsp; | A7 | &check; |
| D2 | &check; | D2 | &nbsp; |
| D3 | &check; | D3 | &nbsp; |
| D4 | &check; | D4 | &check; |
| D5 | &check; | D5 | &check; |
| D6 | &check; | D6 | &check; |
| D7 | &check; | D7 | &check; |
| D8 | &check; | D8 | &nbsp; |


{{!-- END do not edit content above, it is automatically generated--}}

### Interrupts

All pins can be used for interrupts on Gen 3 devices, however only 8 pins can be used for interrupts at the same time.


### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset. 

On both the Boron and B Series SoM, retained memory is 3068 bytes. 

The flash file system on Gen 3 devices can also be used for data storage, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### USB

The Boron has a Micro USB B connector. 

The B Series SoM does not have a USB connector. It is recommended that you add one to your base board for programming and troubleshooting/

### NFC Tag

The Boron and B Series SoM have NFC Tag support.

The Boron has a U.FL connector on the bottom of the board; you must supply your own NFC antenna connector or integrated antenna on your base board.

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 09a7da10-a5d0-11ec-b909-0242ac120002--}}

#### 3V3
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 2 | 10 |
| Pin Name | 3V3 | 3V3 |
| Description | Regulated 3.3V DC output, maximum load 1000 mA | System power in, supply a fixed 3.0-3.6v power. |
#### A0
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 5 | 23 |
| Pin Name | A0 | A0 |
| Pin Alternate Name | D19 | D19 |
| Description | A0 Analog in, GPIO, PWM | A0 Analog in, GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A1
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 6 | 33 |
| Pin Name | A1 | A1 |
| Pin Alternate Name | D18 | D18 |
| Description | A1 Analog in, GPIO, PWM | A1 Analog in, GPIO, PWM |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | A0, A1, A6, and A7 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A2
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 7 | 35 |
| Pin Name | A2 | A2 |
| Pin Alternate Name | D17 | D17 |
| Description | A2 Analog in, GPIO, PWM | A2 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A3
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 8 | 37 |
| Pin Name | A3 | A3 |
| Pin Alternate Name | D16 | D16 |
| Description | A3 Analog in, GPIO, PWM | A3 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A0, A1, A2, and A3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A4
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 9 | 41 |
| Pin Name | A4 | A4 |
| Pin Alternate Name | D15 | D15 |
| Description | A4 Analog in, GPIO, PWM | A4 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A5
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 10 | 43 |
| Pin Name | A5 | A5 |
| Pin Alternate Name | D14 | D14 |
| Description | A5 Analog in, GPIO, PWM, SPI SS | A5 Analog in, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogRead | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### A6
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 45|
| Pin Name | A6|
| Description | A6 Analog in, PWM, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | A0, A1, A6, and A7 must have the same frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
#### A7
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 47|
| Pin Name | A7|
| Description | A7 Analog in, GPIO, Ethernet Reset|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | A0, A1, A6, and A7 must have the same frequency.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
#### AGND
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 39|
| Pin Name | AGND|
| Description | Analog Ground.|
#### Cellular Modem USBD-
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | Cellular Modem USBD-|
| Description | Cellular Modem USB Data-|
| Input is 5V Tolerant | Yes|
#### Cellular Modem USBD+
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | Cellular Modem USBD+|
| Description | Cellular Modem USB Data+|
| Input is 5V Tolerant | Yes|
#### Cellular Modem VBUS
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 74|
| Pin Name | Cellular Modem VBUS|
| Description | USB detect pin for R410M. 5V on this pin enables the Cellular Modem USB interface.|
| Input is 5V Tolerant | Yes|
#### D0
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 16 | 22 |
| Pin Name | D0 | D0 |
| Description | I2C SDA, GPIO | I2C SDA, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| I2C interface | SDA. Use Wire object. | SDA. Use Wire object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D1
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 17 | 20 |
| Pin Name | D1 | D1 |
| Description | I2C SCL, GPIO | I2C SCL, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| I2C interface | SCL. Use Wire object. | SCL. Use Wire object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D2
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 18 | 42 |
| Pin Name | D2 | D2 |
| Description | SPI1 SCK, Serial1 RTS, GPIO, PWM | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Optional RTS hardware flow control for Serial1 | Optional RTS hardware flow control for Serial1 |
| SPI interface | SCK. Use SPI1 object. | SCK. Use SPI1 object. |
| I2C interface | n/a | SDA. Use Wire1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D22
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 62|
| Pin Name | D22|
| Description | GPIO, Ethernet INT|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
#### D23
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 64|
| Pin Name | D23|
| Description | GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
#### D3
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 19 | 40 |
| Pin Name | D3 | D3 |
| Description | SPI1 MOSI, Serial1 CTS, PWM, GPIO | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | A4, A5, D2, and D3 must have the same frequency. | No |
| UART serial | Optional CTS hardware flow control for Serial1 | Optional CTS hardware flow control for Serial1 |
| SPI interface | MOSI. Use SPI1 object. | MOSI. Use SPI1 object. |
| I2C interface | n/a | SCL. Use Wire1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D4
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 20 | 66 |
| Pin Name | D4 | D4 |
| Description | SPI1 MISO, PWM, GPIO | SPI1 MISO, PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | D4, D5, and D6 must have the same frequency. |
| SPI interface | MISO. Use SPI1 object. | MISO. Use SPI1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D5
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 21 | 68 |
| Pin Name | D5 | D5 |
| Description | PWM, GPIO | PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | D4, D5, and D6 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D6
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 22 | 70 |
| Pin Name | D6 | D6 |
| Description | PWM, GPIO | PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | Yes |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | D4, D5, and D6 must have the same frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D7
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 23 | 72 |
| Pin Name | D7 | D7 |
| Description | PWM, GPIO | PWM, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### D8
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 23 | 48 |
| Pin Name | D8 | D8 |
| Description | GPIO, PWM | GPIO, SPI SS, Ethernet CS |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| Supports analogWrite (PWM) | Yes | No |
| Supports tone | D4, D5, D6, and D7 must have the same frequency. | No |
| SPI interface | n/a | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### EN
| | Removed from Boron |
| :--- | :--- |
| Pin Number | 25|
| Pin Name | EN|
| Description | Power supply enable. Connect to GND to power down. Has internal weak (100K) pull-up.|
#### GND
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 4 | 1 |
| Pin Name | GND | GND |
| Description | Ground. | Ground. |
#### LI+
| | Removed from Boron |
| :--- | :--- |
| Pin Number | 26|
| Pin Name | LI+|
| Description | Connected to JST PH LiPo battery connector. 3.7V in or out.|
#### MISO
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 13 | 50 |
| Pin Name | MISO | MISO |
| Pin Alternate Name | D11 | D11 |
| Description | SPI MISO, GPIO | SPI MISO, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| SPI interface | MISO. Use SPI object. | MISO. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### MODE
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 3 | 32 |
| Pin Name | MODE | MODE |
| Pin Alternate Name | D20 | D20 |
| Description | MODE button, has internal pull-up | MODE button, has internal pull-up |
#### MOSI
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 12 | 52 |
| Pin Name | MOSI | MOSI |
| Pin Alternate Name | D12 | D12 |
| Description | SPI MOSI, GPIO | SPI MOSI, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| SPI interface | MOSI. Use SPI object. | MOSI. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### NC
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 14|
| Pin Name | NC|
| Description | n/a|
#### NC
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 75|
| Pin Name | NC|
| Description | n/a|
#### NFC1
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 17|
| Pin Name | NFC1|
| Description | NFC Antenna 1|
#### NFC2
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 19|
| Pin Name | NFC2|
| Description | NFC Antenna 2|
#### RGBB
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 65|
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### RGBG
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 63|
| Pin Name | RGBG|
| Description | RGB LED Green|
#### RGBR
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 61|
| Pin Name | RGBR|
| Description | RGB LED Red|
#### RST
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 1 | 34 |
| Pin Name | RST | RST |
| Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset, active low. External pull-up required. |
#### RX
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 14 | 38 |
| Pin Name | RX | RX |
| Pin Alternate Name | D10 | D10 |
| Description | Serial RX, GPIO | Serial RX, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | RX Use Serial1 object. | RX Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### SCK
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 11 | 54 |
| Pin Name | SCK | SCK |
| Pin Alternate Name | D13 | D13 |
| Description | SPI SCK, GPIO | SPI SCK, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| SPI interface | SCK. Use SPI object. | SCK. Use SPI object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### SIM_CLK
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 71|
| Pin Name | SIM_CLK|
| Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M.|
#### SIM_DATA
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 73|
| Pin Name | SIM_DATA|
| Description | Leave unconnected, 1.8V/3V SIM Data I/O of R410m with internal 4.7 k pull-up.|
#### SIM_RST
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 69|
| Pin Name | SIM_RST|
| Description | Leave unconnected, 1.8V/3V SIM Reset Output from R410M.|
#### SIM_VCC
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 67|
| Pin Name | SIM_VCC|
| Description | Leave unconnected, 1.8V/3V SIM Supply Output from R410M.|
#### TX
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 15 | 36 |
| Pin Name | TX | TX |
| Pin Alternate Name | D09 | D9 |
| Description | Serial TX, GPIO | Serial TX, GPIO |
| Supports digitalRead | Yes | Yes |
| Supports digitalWrite | Yes | Yes |
| UART serial | TX Use Serial1 object. | TX Use Serial1 object. |
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins. | Yes. You can only have 8 active interrupt pins. |
#### USBDATA-
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 13|
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 11|
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VCC
| | Added to B Series SoM |
| :--- | :--- |
| Pin Number | 2|
| Pin Name | VCC|
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power.|
#### VUSB
|   | Boron | B Series SoM |
| :--- | :--- | :--- |
| Pin Number | 24 | 16 |
| Pin Name | VUSB | VUSB |
| Description | Power out (when powered by USB) 5 VDC at 1A maximum. Power in with limitations. | USB VUSB power pin |
| Input is 5V Tolerant | Yes | Yes |


{{!-- END do not edit content above, it is automatically generated  --}}

## Software

### Platform ID

| Platform ID | Name | Description |
| :--- | :--- | :--- |
| 13 | boron | Boron (all models) |
| 23 | bsom | B404X, B404, and B402 B Series SoM |
| 25 | b5som | B524, B523 B Series SoM | 

The platforms IDs of the B Series SoM models vary from the Boron. 

If you have a product based on the Boron, you will need to create a separate product (or two) for devices using the B Series SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

The reason there are separate platforms for the B4xx and B5xx SoM is that they have different cellular modem manufacturers, u-blox and Quectel, respectively. All Boron models have u-blox cellular modems and thus can share a single platform.

### Third-party libraries

Most third-party libraries are believed to be compatible between the Boron and B Series SoM.

## Version History

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
|   1 | 2022-03-17 | RK | Initial version |
