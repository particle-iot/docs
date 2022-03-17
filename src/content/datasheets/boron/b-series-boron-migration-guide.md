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


- [B404X/B4404/B402 datasheet](/datasheets/boron/b402-datasheet/)
- [B524/B523 datasheet](/datasheets/boron/b523-datasheet/)
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


### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 09a7da10-a5d0-11ec-b909-0242ac120002--}}



{{!-- END do not edit content above, it is automatically generated  --}}
