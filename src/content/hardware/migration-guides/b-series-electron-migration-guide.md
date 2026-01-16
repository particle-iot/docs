---
title: B-Series from Electron migration guide
columns: two
layout: commonTwo.hbs
description: B-Series from Electron migration guide
---

# {{title}}

{{migration-guide leftImg="/assets/images/electron/illustrations/electron-v20.png" rightImg="/assets/images/b-series/b-series-top.png"}}

The B-Series SoM (system-on-a-module) is a 3rd-generation cellular device. It plugs into an M.2 NGFF connector on your custom circuit board and is intended for mass production use.

Many of the extra features on the Electron have been omitted from the SoM, so you can implement a custom solution as necessary. For example, rather than duplicating the buttons and status LED on the SoM, you can put them on an external control panel for your product, or omit them entirely.

Additionally, the extra width vs. the Electron (0.7" DIP) form-factor makes it possible to include a LTE Cat 1 with 2G/3G fallback cellular modem, such as the Quectel EG91-E on the B524. This modem is too wide to fit in the Electron form-factor.

All Electron models have been deprecated. It is recommended that you migrate to the B-Series SoM, and it is required to get LTE Cat 1 with 2G/3G fallback support in Europe, Australia, and New Zealand.

| Feature | Electron | B-Series SoM | SoM Base Board |
| --- | :---: | :---: | :---: |
| U.FL Antenna Connector | &check; | &check; | Optional |
| MFF2 SMD Particle SIM<sup>2</sup> | <sup>3</sup> | &check; | &nbsp; |
| Nano 4FF SIM card connector | &check; | &nbsp; | &nbsp; |
| USB Connector | &check; | &nbsp; | Optional |
| Status LED | &check; | &nbsp; | Optional |
| Reset and Mode Buttons | &check; | &nbsp; | Optional |
| Battery Connector | &check; | &nbsp; | Optional |
| PMIC and Fuel Gauge<sup>1</sup> | &check; | &nbsp; | Optional |

<sup>1</sup>The PMIC (power management IC) and fuel gauge are used with battery-powered applications. They're omitted from the SoM as they are not needed for externally powered solutions (grid or automotive power, for example). Additionally, you may want to use different models if you are making a solar-powered device, or using a different battery technology or multiple battery pack.

<sup>2</sup>The built-in Particle SIM card is [free for use](/getting-started/cloud/introduction/#free-tier) up to certain limits, no credit card required.

<sup>3</sup>The Electron 2G and 2G/3G models include only a 4FF nano SIM card socket. The Electron LTE (ELC402 and ELC404) only includes a MFF2 SMD Particle SIM.

{{!-- BEGIN shared-blurb 97fa98d2-9baa-11ec-b909-0242ac120002 --}}
The available models include:

| Model | Region | EtherSIM | Bands | Lifecycle | Replacement |
| :--- | :--- | :---: | :--- | :--- | :--- | 
| B404X | United States, Canada, Mexico | &check; | LTE Cat M1 | Coming soon | |
| B524 | EMEAA | &check; | LTE Cat M1 | GA | |
| B404 | United States, Canada, Mexico | &check; | LTE Cat M1 | Last buy | Use B404X instead |
| B402 | United States, Canada, Mexico | | LTE Cat 1, 2G, 3G | Deprecated | Use B404X instead |
| B523 | Europe | | LTE Cat 1, 2G, 3G | Deprecated | Use B524 instead |

- The B404X, B404, and B402 cannot be used in Central or South America.
- The B524 can be used in selected countries in Europe, Middle East, Africa, and Asia (EMEAA), including Australia and New Zealand.
- The B524 and B523 do not work out of the EMEAA region.
- See the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/?tab=CountryDetails) for compatibility in specific countries
{{!-- END shared-blurb --}}

### Datasheets

- [B404X datasheet](/reference/datasheets/b-series/b404x-datasheet/)
- [B524/B523 datasheet](/reference/datasheets/b-series/b524-b523-datasheet/)
- [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/)


## Prototyping

The B-Series SoM cannot be used without a base board. Typically you will create your own board, however there are two off-the-shelf options available:

### B-Series Eval board

![B-Series Eval](/assets/images/b-series/b-series-eval.png)

The [B-Series evaluation board](/reference/datasheets/b-series/b-series-eval-board/) provides a variety of interfaces and access to all ports and pins on the B-Series SoM. You can use the expansion connector to connect the evaluation board to a breadboard for prototyping. You can also add sensors and accessories using the Grove expansion connectors.

{{!-- BEGIN shared-blurb 19f889d4-a5c9-11ec-b909-0242ac120002 --}}
{{imageOverlay src="/assets/images/b-series/b-series-eval-labeled.png" alt="Ports Diagram" class="full-width"}}

| Num | ID 					    | Description                                      |
| :---: | :----------------------|:--------------------------------|
| 1 | **External Power** | 5-12 VDC. Minimum power requirements are 5VDC @500mA (when using the LiPo battery) or 5VDC @2000mA (without LiPo battery). | 
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
| 22 | **SoM connector** | M.2 connector for the B-Series SoM. |
| 23 | **Jumpers J13** | Enable or disable various features on the evaluation board. |
| 24 | **Power Jumpers** | Enable or disable power from the evaluation board. |
| 25 | **Charge LED** | Indicate LiPo is charging. | 
{{!-- END shared-blurb --}}

{{imageOverlay src="/assets/images/b-series/b-series-eval-block.png" alt="Block Diagram" class="full-width"}}


### Mikroe Gen 3 SoM shield

{{!-- BEGIN shared-blurb b644c2f2-a5ca-11ec-b909-0242ac120002 --}}
![Mikroe Gen 3 SoM](/assets/images/prototyping/mikroe-som.png)

The [Gen 3 SoM shield](https://www.mikroe.com/click-shield-for-particle-gen-3) connects a B-Series SoM to mikroBUS Click boards:

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

For more information, see the [Mikroe community page](/hardware/expansion/mikroe/).

## Creating a board

### First SoM board tutorial

The [SoM first board tutorial](/hardware/som/som-first-board/) shows how to get started with the M.2 SoM boards by making the simplest possible design. It's an introduction to working with surface mount components you will need in order to make your own SoM base board.

![Board Image](/assets/images/som-first-board/main.png)

### Basic SoM design

This design is a bit more complicated, and includes the PMIC and Fuel Gauge chips that are present on the Electron:

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


## Software differences

{{!-- BEGIN shared-blurb e5b77a80-8a7a-4bd6-a7b6-8685fb87ed43 --}}
### User firmware binary size

One major advantage of Gen 3 devices is that user firmware binaries in Device OS 3.1.0 and later can be up to 256 Kbytes, instead of 128 Kbytes in earlier version of Device OS and on Gen 2 devices. The larger firmware binary support will not be added to Gen 2 in the future, and will only be available on Gen 3 devices.

### Flash file system

There is a flash file system (2 MB except on the Tracker which is 4 MB) for storing user data, on Gen 3 devices only.

### Combined and resumable OTA

On Gen 3 devices, over-the-air (OTA) updates have two features that can improve the speed and reliability of OTA updates:

- Combined OTA can combine Device OS and user firmware updates into a single binary that requires only one download and one reboot to install.
- Resumable OTA allows an update to resume from the point it stopped, instead of starting over from the beginning if interrupted.

### Asset OTA

[Asset OTA](/getting-started/cloud/ota-updates/#asset-ota) (available in Device OS 5.5.0 and later), makes it possible to include bundled assets in an OTA software update that can be delivered to other processors and components in your product. 

{{!-- END shared-blurb --}}

### Increased API field limits

The maximum size of a variable, function parameter, or publish is 1024 bytes on the B-Series SoM vs. 864 bytes on the Electron.

| API Field | Electron | B-Series SoM |
| :--- | :---: | :---: |
| Variable Key | 64 | 64 |
| Variable Data | 864 | 1024 |
| Function Key | 64 | 64 |
| Function Argument | 864 | 1024  |
| Publish/Subscribe Event Name | 64 | 64 |
| Publish/Subscribe Event Data | 864 | 1024 |


## Hardware differences

### MCU

| Measure | Electron | B-Series SoM |
| :--- | :---: | :---: |
| MCU | STM32F205 | nRF52840 |
| Manufacturer | ST Microelectronics | Nordic Semiconductor |
| Processor | ARM Cortex M3 | ARM Cortex M4F |
| Speed | 120 MHz | 64 MHz |
| RAM | 128 KB | 256 KB | 
| Flash (MCU) | 1 MB | 1 MB |
| Flash (external) | &nbsp; | 4 MB|
| Hardware floating point | &nbsp; | &check; |

- Not all RAM is available to user applications. The Device OS firmware uses a portion of it.

### BLE (Bluetooth LE)

- Bluetooth LE (BLE 5.0) is supported on B-Series SoM but not the Electron.

### NFC tag

- NFC tag mode is supported on the B-Series SoM but not the Electron.

### GPIO

There are fewer available GPIO pins on the B-Series SoM than the Electron. If you need a large number of GPIO pins, an external GPIO expander connected by I2C or SPI is a good option.

{{!-- BEGIN do not edit content below, it is automatically generated adfc129f-947d-4e22-b703-a6710d77a5a3 --}}

| Electron Pin Name | Electron GPIO | B-Series SoM Pin | B-Series SoM Pin Name | B-Series SoM GPIO |
| :--- | :--- | :---: | :--- | :--- |
| A0 | &check; | 23 | A0 / D19 | &check; |
| A1 | &check; | 33 | A1 / D18 | &check; |
| A2 | &check; | 35 | A2 / D17 | &check; |
| A3 | &check; | 37 | A3 / D16 | &check; |
| A4 | &check; | 41 | A4 / D15 | &check; |
| A5 | &check; | 43 | A5 / D14 | &check; |
| B0 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B1 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B2 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B3 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B4 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B5 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C0 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C1 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C2 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C3 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C4 | &check; | &nbsp; | &nbsp; | &nbsp; |
| C5 | &check; | &nbsp; | &nbsp; | &nbsp; |
| D0 | &check; | 22 | D0 | &check; |
| D1 | &check; | 20 | D1 | &check; |
| D2 | &check; | 42 | D2 | &check; |
| &nbsp; | &nbsp; | 62 | D22 | &check; |
| &nbsp; | &nbsp; | 64 | D23 | &check; |
| D3 | &check; | 40 | D3 | &check; |
| D4 | &check; | 66 | D4 | &check; |
| D5 | &check; | 68 | D5 | &check; |
| D6 | &check; | 70 | D6 | &check; |
| D7 | Yes. Note that this controls the on-board blue LED. | 72 | D7 | &check; |
| &nbsp; | &nbsp; | 48 | D8 | &check; |
| DAC / A6 | &check; | 45 | A6 | &check; |
| &nbsp; | &nbsp; | 50 | MISO / D11 | &check; |
| &nbsp; | &nbsp; | 52 | MOSI / D12 | &check; |
| RX | &check; | 38 | RX / D10 | &check; |
| &nbsp; | &nbsp; | 54 | SCK / D13 | &check; |
| TX | &check; | 36 | TX / D9 | &check; |
| WKP / A7 | &check; | 47 | A7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}


The [MCP23008](https://github.com/rickkas7/MCP23008-RK) is an 8-port GPIO expander that connects to I2C and works well with Gen 3 devices. You can connect up to 8 of them to a single I2C interface. the [MCP23017](https://github.com/rickkas7/MCP23017-RK) has 16-ports, and you can also connect 8 of them, for a total of 128 GPIO ports.

The application note [AN013 Tracker GPIO](/hardware/tracker/projects/tracker-gpio/) shows how you can add additional GPIO to your Tracker One using the external M8 connector, however the same technique can also be used with the B-Series SoM. It includes both 3.3V and 5V design options.

### 5V tolerance

The other difference in the GPIO between Gen 2 and Gen 3 is with 5V tolerance. While both devices are 3.3V devices and only will drive 3.3V, the I/O pins on Gen 2 devices (with the exception of A3 and A6) are 5V tolerant. This allows a Gen 2 device to connect to some 5V peripherals directly.

**You must not connect 5V peripherals to a Gen 3 device.** This includes GPIO, ports (serial, I2C, SPI), and ADC. 

Interfacing with 5V peripherals can be done with a level shifter, a MOSFET, or a 5V GPIO expander.


### Beware of leakage current

If you have circuitry that can disconnect the nRF52840 MCU 3V3 power, beware of situations where current can leak into GPIO pins from an external supply.

For example, if you have 3V3 disconnect circuitry but have pull-ups to non-disconnected power, when MCU 3V3 is powered down current can flow into the GPIO causing the MCU to not fully power down. This can prevent the MCU from resetting when power is reapplied. It will also cause excess power consumption when powered down.


### SPI

- The B-Series SoM and Electron both have two SPI ports.
- In most cases, you can share a single SPI bus with many peripherals.
- On the Electron, SPI1 and SPI2 share the same MCU SPI interface but have different pin locations. You can only use one or the other.

{{!-- BEGIN do not edit content below, it is automatically generated fa06b028-2b43-4832-9c98-41329ed4cd78 --}}

| Electron Pin Name | Electron SPI | B-Series SoM Pin | B-Series SoM Pin Name | B-Series SoM SPI |
| :--- | :--- | :---: | :--- | :--- |
| A2 | SPI (SS) | 35 | A2 / D17 | &nbsp; |
| A3 | SPI (SCK) | 37 | A3 / D16 | &nbsp; |
| A4 | SPI (MISO) | 41 | A4 / D15 | &nbsp; |
| A5 | SPI (MOSI) | 43 | A5 / D14 | &nbsp; |
| C1 | SPI2 (MOSI) | &nbsp; | &nbsp; | &nbsp; |
| C2 | SPI2 (MISO) | &nbsp; | &nbsp; | &nbsp; |
| C3 | SPI2 (SCK) | &nbsp; | &nbsp; | &nbsp; |
| D2 | SPI1 (MOSI) | 42 | D2 | SPI1 (SCK) |
| D3 | SPI1 (MISO) | 40 | D3 | SPI1 (MOSI) |
| D4 | SPI1 (SCK) | 66 | D4 | SPI1 (MISO) |
| D5 | SPI1 (SS) | 68 | D5 | &nbsp; |
| &nbsp; | &nbsp; | 48 | D8 | SPI (SS) |
| &nbsp; | &nbsp; | 50 | MISO / D11 | SPI (MISO) |
| &nbsp; | &nbsp; | 52 | MOSI / D12 | SPI (MOSI) |
| &nbsp; | &nbsp; | 54 | SCK / D13 | SPI (SCK) |


{{!-- END do not edit content above, it is automatically generated--}}

### Serial (UART)


{{!-- BEGIN shared-blurb f1cc7f9f-ad76-4621-a1f8-cf4b1fa395c8 --}}

There are more UART ports on the Gen 2 devices than Gen 3. If you need more hardware serial ports, the best option is to use the [SC16IS740](https://github.com/rickkas7/SC16IS740RK) or its relatives like the SC16IS750. These devices connect by I2C or SPI, and you can add multiple ports this way.

#### Serial baud rates

| Baud Rate | Gen 2 | Gen 3 |
| ------: | :---: | :---: |
|    1200 | &check; | &check; |
|    2400 | &check; | &check; |
|    4800 | &check; | &check; |
|    9600 | &check; | &check; |
|   19200 | &check; | &check; |
|   28800 | &nbsp;  | &check; |
|   38400 | &check; | &check; |
|   57600 | &check; | &check; |
|   76800 | &nbsp;  | &check; |
|  115200 | &check; | &check; |
|  230400 | &check; | &check; |
|  250000 | &nbsp;  | &check; |
|  460800 | &nbsp;  | &check; |
|  921600 | &nbsp;  | &check; |
| 1000000 | &nbsp;  | &check; |

#### Serial configurations

| Constant | Description | Gen 2 | Gen 3 |
| :--- | :--- | :---: | :---: |
| SERIAL_8N1 | 8 data bits, no parity, 1 stop bit (default) | &check; | &check; |
| SERIAL_8N2 | 8 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8E1 | 8 data bits, even parity, 1 stop bit | &check; | &check; |
| SERIAL_8E2 | 8 data bits, even parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_8O1 | 8 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_8O2 | 8 data bits, odd parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_9N1 | 9 data bits, no parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_9N2 | 9 data bits, no parity, 2 stop bits | &check; | &nbsp; |
| SERIAL_7O1 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7O2 | 7 data bits, odd parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E1 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| SERIAL_7E2 | 7 data bits, even parity, 1 stop bit | &check; | &nbsp; |
| LIN_MASTER_13B | 8 data bits, no parity, 1 stop bit, LIN Master mode with 13-bit break generation | &check; | &nbsp; |
| LIN_SLAVE_10B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 10-bit break detection | &check; | &nbsp; |
| LIN_SLAVE_11B | 8 data bits, no parity, 1 stop bit, LIN Slave mode with 11-bit break detection | &check; | &nbsp; |

- Using an I2C or SPI UART like the SC16IS750 is also a good way to add support for other bit length, parity, and stop bit options on Gen 3 devices.

{{!-- END shared-blurb --}}

{{!-- BEGIN do not edit content below, it is automatically generated 1d4ebec9-df9d-457f-acf8-9305a870c888 --}}

| Electron Pin Name | Electron Serial | B-Series SoM Pin | B-Series SoM Pin Name | B-Series SoM Serial |
| :--- | :--- | :---: | :--- | :--- |
| C0 | USART5_RX | &nbsp; | &nbsp; | &nbsp; |
| C1 | USART5_TX | &nbsp; | &nbsp; | &nbsp; |
| C2 | USART4_RX | &nbsp; | &nbsp; | &nbsp; |
| C3 | USART4_TX | &nbsp; | &nbsp; | &nbsp; |
| D2 | &nbsp; | 42 | D2 | Serial1 RTS |
| D3 | &nbsp; | 40 | D3 | Serial1 CTS |
| RX | Serial1 (RX) | 38 | RX / D10 | Serial1 RX |
| TX | Serial1 (TX) | 36 | TX / D9 | Serial1 TX |


{{!-- END do not edit content above, it is automatically generated--}}

### Analog input (ADC)

The B-Series SoM does not have an many ADC ports as the Electron. You can add additional ADC ports using a SPI or I2C ADC.

{{!-- BEGIN do not edit content below, it is automatically generated 090c9e42-91dc-4531-8c51-3ed6e4b8ade0 --}}

| Electron Pin Name | Electron ADC | B-Series SoM Pin | B-Series SoM Pin Name | B-Series SoM ADC |
| :--- | :--- | :---: | :--- | :--- |
| A0 | &check; | 23 | A0 / D19 | &check; |
| A1 | &check; | 33 | A1 / D18 | &check; |
| A2 | &check; | 35 | A2 / D17 | &check; |
| A3 | &check; | 37 | A3 / D16 | &check; |
| A4 | &check; | 41 | A4 / D15 | &check; |
| A5 | &check; | 43 | A5 / D14 | &check; |
| B2 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B3 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B4 | &check; | &nbsp; | &nbsp; | &nbsp; |
| B5 | &check; | &nbsp; | &nbsp; | &nbsp; |
| DAC / A6 | &check; | 45 | A6 | &check; |
| WKP / A7 | &check; | 47 | A7 | &check; |


{{!-- END do not edit content above, it is automatically generated--}}

### PWM (Pulse-width modulation)

These are differences in pins that support PWM between the Electron and B-Series SoM.

{{!-- BEGIN do not edit content below, it is automatically generated 598e5ada-284b-4648-b553-1580a0020f38' --}}

| Electron Pin Name | Electron PWM | B-Series SoM Pin | B-Series SoM Pin Name | B-Series SoM PWM | B-Series SoM Hardware Timer |
| :--- | :--- | :---: | :--- | :--- | :--- |
| A0 | &nbsp; | 23 | A0 / D19 | &check; | PWM2 |
| A1 | &nbsp; | 33 | A1 / D18 | &check; | PWM2 |
| A4 | &check; | 41 | A4 / D15 | &nbsp; | &nbsp; |
| A5 | &check; | 43 | A5 / D14 | &nbsp; | &nbsp; |
| B0 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| B1 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| B2 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| B3 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| C4 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| C5 | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| D0 | &check; | 22 | D0 | &nbsp; | &nbsp; |
| D1 | &check; | 20 | D1 | &nbsp; | &nbsp; |
| D2 | &check; | 42 | D2 | &nbsp; | &nbsp; |
| D3 | &check; | 40 | D3 | &nbsp; | &nbsp; |
| D4 | &nbsp; | 66 | D4 | &check; | PWM1 |
| D5 | &nbsp; | 68 | D5 | &check; | PWM1 |
| D6 | &nbsp; | 70 | D6 | &check; | PWM1 |
| D7 | &nbsp; | 72 | D7 | &check; | PWM0 |
| DAC / A6 | &nbsp; | 45 | A6 | &check; | PWM2 |
| RX | &check; | 38 | RX / D10 | &nbsp; | &nbsp; |
| TX | &check; | 36 | TX / D9 | &nbsp; | &nbsp; |
| WKP / A7 | &check; | 47 | A7 | &check; | PWM2 |


{{!-- END do not edit content above, it is automatically generated--}}

#### PWM - Gen 3

On Gen 3 devices, the PWM frequency is from 5 Hz to `analogWriteMaxFrequency(pin)` (default is 500 Hz).

On the B-Series SoM, pins D4, D5, D7, A0, A1, A6, and A7 can be used for PWM. Pins are assigned a PWM group. Each group must share the same 
frequency and resolution, but individual pins in the group can have a different duty cycle.

- Group 2: Pins A0, A1, A6, and A7.
- Group 1: Pins D4, D5, and D6.
- Group 0: Pin D7 and the RGB LED. This must use the default resolution of 8 bits (0-255) and frequency of 500 Hz.

It is also possible to add an external PWM driver such as the PCA9685 which adds 16 outputs via I2C. You can add 62 of these to a single I2C bus for 992 PWM outputs! The [Adafruit_PWMServoDriver](/reference/device-os/libraries/a/Adafruit_PWMServoDriver/) library supports this chip on all Particle devices.

#### PWM - Gen 2

On the Electron and E-Series, this function works on pins D0, D1, D2, D3, A4, A5, WKP, RX, TX, B0, B1, B2, B3, C4, and C5 with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 7 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.


### Internal pull-up or pull-down

Internal (MCU) pull-up and pull-down can be enabled using the `pinMode()` function and `INPUT_PULLUP` or `INPUT_PULLDOWN`.

On both the B-Series SoM (Gen 3), the internal pull is approximately 16K. On the Electron it is approximately 40K.

### Retained memory

Retained memory, also referred to as Backup RAM or SRAM, that is preserved across device reset. 

On both the Boron and B-Series SoM, retained memory is 3068 bytes, same as the Electron.

The flash file system on Gen 3 devices can also be used for data storage, however care must be taken to avoid excessive wear of the flash for frequently changing data.

### Interrupts

{{!-- BEGIN shared-blurb 0ad42255-7fdf-47d2-af7a-0e4dcff59790 --}}

#### Interrupts - Gen 2

Not supported on the Electron/E series (you can't use attachInterrupt on these pins):

  - D0, A5 (shared with MODE button)
  - D7 (shared with BATT_INT_PC13)
  - C1 (shared with RXD_UC)
  - C2 (shared with RI_UC)

No restrictions on the Electron/E-Series (all of these can be used at the same time):

  - D5, D6

Shared on the Electron/E-Series (only one pin for each bullet item can be used at the same time):

  - D1, A4, B1
  - D2, A0, A3
  - D3, DAC
  - D4, A1
  - A2, C0
  - A7 (WKP), B2, B4
  - B0, C5
  - B3, B5
  - C3, TX
  - C4, RX

{{!-- END shared-blurb --}}

#### Interrupts - Gen 3

There is a limit of 8 pins with interrupt handlers, however the selection of pins is not restricted.



### DAC

- Gen 2 devices have two DAC (digital-to-analog converter), on pins A3 and A6. 

- Gen 3 devices do not have built-in DAC, however they can easily be added by I2C or SPI to your base board.

### CAN bus

- Gen 3 devices do not support CAN on the MCU.
- The Tracker SoM includes CAN via a MCP25625 CAN interface with integrated transceiver.
- Both the MCP2515 and MCP25625 work with [the library](https://github.com/particle-iot/can-mcp25x) used on the Tracker and can be used to add CAN to other Gen 3 devices.

### I2S (Sound)

- The Electron theoretically had I2S sound available on pins D1 and D2, however there has never been support for it in Device OS.
- I2S is available on Gen 3 devices including the B-Series SoM on any GPIO pins using a 3rd-party library.


{{!-- BEGIN shared-blurb 28cd19b2-4f01-444b-8189-ba6191e6ebdd --}}

### Sleep modes

- In general, Gen 3 devices use less power in all modes.
- In `HIBERNATE` mode, the RTC (real time clock) does not run on Gen 3 devices, so you cannot wake by time from `HIBERNATE` mode (formerly known as `SLEEP_MODE_DEEP`).
- However, you can wake by time from `ULTRA_LOW_POWER` mode, and it uses less power than the Gen 2 `HIBERNATE` mode.
- On Gen 2 devices, you can only wake from `HIBERNATE` with a rising signal on `WKP` (A7). Gen 3 devices can wake from `HIBERNATE` on any pin, rising or falling.
- On Gen 2 (STM32F205) devices, if you try to go into `HIBERNATE` mode with WKP already high, the device will go into sleep and will not wake up by time or pin change, essentially rendering it unable to wake until reset manually. This problem does not occur on Gen 3 devices.

### RTC (Real-time clock)

- The E-Series module has the ability to use an external lithium coin cell or supercap to power the RTC when the MCU is unpowered. This feature is difficult to access on the Electron (requires removing a resistor on the module) and does not exist on Gen 3 devices.
- The RTC on Gen 3 devices is not really a real-time clock. It's basically just a counter, and some advanced wakeup features are not possible on Gen 3 devices. These features were not enabled by Device OS on Gen 2 devices, either, so this is generally not an issue.
- On Gen 3 devices, in `HIBERNATE` sleep mode the RTC does not run, so it is not possible to wake by time, and the system clock will not be set until you connect to the cloud again. `ULTRA_LOW_POWER` is recommended instead.
- The Tracker SoM has a separate real-time clock and watchdog (AM1805) chip allowing it to wake from `HIBERNATE` based on time.

{{!-- END shared-blurb --}}

{{!-- BEGIN shared-blurb 585f8962-e24a-4de2-8bbc-a45a02439350 --}}

### SWD/JTAG

- Gen 2 devices support SWD on D6 and D7, and full JTAG on D3, D4, D5, D6, and D7.
- Gen 3 devices only support SWD, and do so via a dedicated debug connector.
- The Boron has the debug connector on top of the module.
- The B-Series SoM has SWD on pads on the bottom of the SoM. The evaluation board connects to these with pogo pins and breaks out to the same 2x5 connector that is on the Boron.

#### JTAG pin warning - Gen 2

On Gen 2 devices, beware when using pins D3, D5, D6, and D7 as OUTPUT controlling external devices. After reset, these pins will be briefly taken over for JTAG/SWD, before being restored to the default high-impedance INPUT state during boot.

- D3, D5, and D7 are pulled high with a pull-up
- D6 is pulled low with a pull-down
- D4 is left floating

The brief change in state (especially when connected to a MOSFET that can be triggered by the pull-up or pull-down) may cause issues when using these pins in certain circuits. Using STARTUP will not prevent this! 

This is not an issue with Gen 3 devices that have dedicated SWD pins.

If you are relying on this behavior for external circuits, you should instead use a hardware pull-up or pull-down on Gen 3 devices. The pins default to high-impedance state, and this means they will stay in this state when in the bootloader, DFU mode, and safe mode.

{{!-- END shared-blurb --}}

### PMIC and Fuel gauge

The Electron, E-Series, Boron, and Tracker SoM all include the PMIC (bq24195) and battery fuel gauge (MAX17043) on the module itself.

On the B-Series SoM, the PMIC and fuel gauge are optional. For example, if you are powering by an external power supply and not using a battery, you can omit the components entirely.


### USB

- The Electron has a Micro USB B connector. The B-Series SoM does not have a USB connector. It is recommended that you add one to your base board for programming and troubleshooting.
- Gen 2 devices can emulate a USB mouse or keyboard over the USB port. This feature is not available on Gen 3.
- Gen 2 devices can support two separate USB serial emulation streams over the USB port. Gen 3 devices only support the normal `Serial` interface.


| USB Feature | Electron | B-Series SoM |
| :--- | :---: | :---: |
| Secondary USB serial emulation `USBSerial1` | &check; | |
| USB keyboard emulation | &check; | |
| USB mouse emulation | &check; | |


### NFC tag

The B-Series SoM has NFC Tag support, however you must add a U.FL antenna connector to your base board to use it.

Note that this only supports emulating an NFC tag that can be read by an another reader or smartphone. It does not allow the B-Series SoM to detect other tags!

## PMIC Notes

{{!-- BEGIN shared-blurb 93112786-2815-408c-b064-ec7e9c629200 --}}
When using the B-Series SoM with a bq24195 PMIC, note the following:

By default, the bq24195 sets the input current limit, which affects powering by VIN and VUSB, to 100 mA. This affects the VSYS output of the PMIC, which powers both the cellular modem and 3V3 supply, and is not enough to power the B-Series SoM in normal operation.

If your device has the default firmware (Tinker), it will attempt to connect to the cloud, brown out due to insufficient current, then the device will reset. This may result in what appears to be the status LED blinking white, but is actually rolling reboot caused by brownout.

A factory new B-Series SoM does not enable the PMIC setup. To enable the use of the bq21415, you must enable the system power feature [PMIC_DETECTION](/reference/device-os/api/power-manager/systempowerfeature/#systempowerfeature-pmic_detection) in your code. This defaults to off because the B-Series SoM can be used without a PMIC, or with a different PMIC, and also requires I2C on D0/D1, and some base boards may use those pins as GPIO.

Because the input current limit does not affect the battery input (Li+), for troubleshooting purposes it can be helpful to attach a battery to help rule out input current limit issues. It's also possible to supply 3.7V via a bench power supply to the battery input, instead of VIN. 

The input current limit can result in a situation where you can't bring up a B-Series SoM because it browns out continuously, but also cannot flash code to it to stop if from browning out. There are two general solutions:

- Attach a battery or supply by Li+ when bringing up a board.
- Use SWD/JTAG and reset halt the MCU. This will prevent it from connecting to the cloud, so you can flash Device OS and firmware to it by SWD.

The input current limit is actually controlled by three factors:

- The [power source max current setting](/reference/device-os/api/power-manager/powersourcemaxcurrent-systempowerconfiguration/) in the PMIC. The default is 900 mA. It can be set to 100, 150, 500, 900, 1200, 1500, 2000, or 3000 mA.
- It is also limited by the hardware ILIM resistor. On Particle devices with a built-in PMIC, this is set to 1590 mA, but if you are implementing your own PMIC hardware, you can adjust this higher.
- When connected by USB, it will use DPDM, current negotiation via the USB DP (D+) and DM (D-) lines. 

Note that some 2A tablet chargers and multi-port USB power supplies supply 2A but do not implement DPDM; these will be treated as if VIN was used, and you must set the power source current, otherwise the input current will be limited to 900 mA, which is not enough to power a 2G/3G cellular modem without an attached battery.

{{!-- END shared-blurb --}}



### Antennas

The B-Series SoM has U.FL antenna connectors for BLE and cellular antennas. A connector for NFC can be added from your base board.

The Electron has a U.FL connector for the cellular antenna, and does not have BLE or NFC tag capabilities.

Both require an external cellular antenna.

{{!-- BEGIN do not edit content below, it is automatically generated fb53409a-8f87-44fa-91e0-5c82ee1feb5c --}}

| Device | SKU  | Included | Antenna | Alternate | Lifecycle |
| :----- | :--- | :--------: | :------: | :--------: | :-------: |
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | B504MEA | &check; | PARANTCW1EA | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | B504MTY | &nbsp; | PARANTCW1TY | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | B504EMEA | &check; | PARANTCW1EA | &nbsp; | GA|
| B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | B504EMTY | &nbsp; | PARANTCW1TY | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | B524MEA | &check; | ANTCW2EA | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | B524MTY | &nbsp; | ANTCW2TY | &nbsp; | GA|
| B-Series LTE CAT-1/3G/2G (Europe) [x1] | B523MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | B523MTY | &nbsp; | ANTCW2TY | &nbsp; | NRND|
| B-Series LTE CAT-M1 (NorAm), [x1] | B402MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE CAT-M1 (NorAm), Tray [x50] | B402MTY | &nbsp; | ANTCW2TY | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404MEA | &check; | ANTCW2EA | &nbsp; | Deprecated|
| B-Series LTE-M (NorAm, EtherSIM), [x1] | B404XMEA | &check; | PARANTC41EA | ANT-FLXU<sup>3</sup> | GA|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404MTY | &nbsp; | ANTCW2TY | &nbsp; | NRND|
| B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | B404XMTY | &nbsp; | PARANTC41TY | ANT-FLXU-50<sup>3</sup> | GA|
| Electron 2G (Global), Tray [x50] | E350TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | Deprecated|
| Electron 2G Kit (Global) | E350KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | E260KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (Americas/Aus), Tray [x50] | E260TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | Deprecated|
| Electron 2G/3G (EMEA) Starter Kit, [x1] | E270KIT | &check; | ANTELEC | &nbsp; | Deprecated|
| Electron 2G/3G (EMEA), Tray [x50] | E270TRAY50 | &nbsp; | ANTELEC50 | &nbsp; | NRND|
| Electron 2G/3G (Global - U201) , Tray [x50] | ELC314TY | &nbsp; | ANT-FLXU-50 | &nbsp; | NRND|
| Electron 3G (Americas/Aus) Sensor Kit, [x1] | SNSRKIT3G260 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | SNSRKIT3G270 | &check; | ANT-ELEC | &nbsp; | Deprecated|
| Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | ELC404TY | &nbsp; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | Deprecated|
| Electron LTE CAT-M1 (NorAm), [x1] | ELC402EA | &check; | ANT-FLXU | ANTCW2EA<sup>2</sup> | Deprecated|
| Electron LTE CAT-M1 (NorAm), Tray [x50] | ELC402TY | &nbsp; | ANT-FLXU-50 | ANTCW2TY<sup>2</sup> | Deprecated|


{{!-- END do not edit content above, it is automatically generated --}}

<sup>2</sup>This device originally shipped with one antenna (ANTELEC or ANT-FLXU) however the ANTCW2EA is listed as an alternative. The ANTCW2EA (or ANTCW2TY) is recommended as most new designs will use this antenna and using this antenna will reduce the number of SKUs you need to stock when building a product at tray quantities.


{{!-- BEGIN shared-blurb 2fd8bba2-0bda-44c3-822d-0fb0ad30118e --}}

| Dimension | PARANTCW1EA | PARANTC41EA | ANTCW2EA | ANT-FLXU | ANTELEC | 
| :--- | :---: | :---: | :---: | :---: | :---: |
| Tray SKU | PARANTCW1TY | PARANTC41TY | ANTCW2TY | ANT-FLXU-50 | ANTELEC50 |
| Length | 116mm | 122.1mm | 97.0mm | 96.0mm | 80.0mm |
| Width | 27mm | 12.8mm | 21.0mm | 21.0mm | 20.0mm |
| Thickness | 0.2mm | 0.2mm | 0.2mm | 0.2mm | 0.2mm |
| Cable Length | 189.5mm | 183mm | 160mm | 150mm | 164mm |

PARANTC41EA/PARANTC41TY are slightly longer than ANTCW2EA/ANTCW2TY. The antenna can be bent when being placed inside an enclosure. There are a couple restrictions to ensure good performance:

- Do not bend more the 90 degrees. Right angle turns are acceptable, but do not fold the antenna over on itself.
- The antenna should not be creased when it is bent into position. A crease can damage the internal structure of the antenna.
- The antenna should always be affixed along its entire length. Do not affix a portion of the antenna and leave a portion free floating.
- All portions of the antenna should maintain proper spacing from electronics, grounded metal, or active metal.
    - Recommended: 12mm
    - Minimum: 8mm
- Ideally when placing the antenna it should not have a bend in it, but following the above guidelines, there should be minimal performance degradation.

{{!-- END shared-blurb --}}

### 4FF nano SIM card socket

The B-Series SoM can only be used with the built-in MFF2 SMD Particle SIM card.

The Electron 2G and 2G/3G models can be used with a 4FF plastic Particle SIM or 3rd-party SIM card. The Electron LTE can only be used with the built-in MFF2 SMD Particle SIM card.

### Full module pin comparison

{{!-- BEGIN do not edit content below, it is automatically generated 4ca93c19-3cd8-4edf-ae24-d5a3ab433844 --}}

#### 3V3
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 36 | 10 |
| &nbsp; | Pin Name | 3V3 | 3V3 |
| ∆ | Description | Regulated 3.3V DC output, maximum load 800 mA. Cannot be used as a power input. | System power in, supply a fixed 3.0-3.6v power. |
#### A0
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 12 | 23 |
| &nbsp; | Pin Name | A0 | A0 |
| ∆ | Pin Alternate Name | n/a | D19 |
| ∆ | Description | A0 Analog in, GPIO | A0 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | A0, A1, A6, and A7 must have the same frequency. |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A1
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 11 | 33 |
| &nbsp; | Pin Name | A1 | A1 |
| ∆ | Pin Alternate Name | n/a | D18 |
| ∆ | Description | A1 Analog in, GPIO | A1 Analog in, GPIO, PWM |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | A0, A1, A6, and A7 must have the same frequency. |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A2
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 10 | 35 |
| &nbsp; | Pin Name | A2 | A2 |
| ∆ | Pin Alternate Name | n/a | D17 |
| ∆ | Description | A2 Analog in, GPIO, SPI SS | A2 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead. | n/a |
| ∆ | Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A3
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 9 | 37 |
| &nbsp; | Pin Name | A3 | A3 |
| ∆ | Pin Alternate Name | n/a | D16 |
| ∆ | Description | A3 True analog out, analog in, GPIO. | A3 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (DAC) | Yes | No |
| ∆ | SPI interface | SCK. Use SPI object. | n/a |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
#### A4
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 8 | 41 |
| &nbsp; | Pin Name | A4 | A4 |
| ∆ | Pin Alternate Name | n/a | D15 |
| ∆ | Description | A4 Analog in, GPIO, SPI MISO. | A4 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | SPI interface | MISO. Use SPI object. | n/a |
| ∆ | Supports attachInterrupt | Yes. D1 and A4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### A5
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 7 | 43 |
| &nbsp; | Pin Name | A5 | A5 |
| ∆ | Pin Alternate Name | n/a | D14 |
| ∆ | Description | A5 Analog in, GPIO, SPI MOSI. | A5 Analog in, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | SPI interface | MOSI. Use SPI object. | n/a |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### AGND
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 39|
| Pin Name | AGND|
| Description | Analog Ground.|
#### B0
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 18|
| Pin Name | B0|
| Description | B0, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### B1
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 17|
| Pin Name | B1|
| Description | B1, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### B2
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 16|
| Pin Name | B2|
| Description | B2, analog in, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### B3
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 15|
| Pin Name | B3|
| Description | B3, analog in, GPIO, PWM|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### B4
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 14|
| Pin Name | B4|
| Description | B4 Analog in, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### B5
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 13|
| Pin Name | B5|
| Description | B5 Analog in, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogRead | Yes|
| Supports attachInterrupt | Yes. B3 and B5 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C0
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 19|
| Pin Name | C0|
| Description | Serial5 RX (received data), GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | RX. Use Serial5 object.|
| Supports attachInterrupt | Yes. A2 and C0 share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C1
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 20|
| Pin Name | C1|
| Description | Serial5 TX (trasmitted data), SPI2 MOSI, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | TX. Use Serial5 object.|
| SPI interface | MOSI. Use SPI2 object.|
| Supports attachInterrupt | No. Shared with RXD_UC.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C2
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 21|
| Pin Name | C2|
| Description | Serial4 RX (received data), SPI2 MISO, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | RX. Use Serial4 object.|
| SPI interface | MISO. Use SPI2 object.|
| Supports attachInterrupt | No. Shared with RI_UC.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C3
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 22|
| Pin Name | C3|
| Description | Serial4 TX (transmitted data), SPI2 SCK, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| UART serial | TX. Use Serial4 object.|
| SPI interface | SCK. Use SPI2 object.|
| Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler.|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C4
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 23|
| Pin Name | C4|
| Description | I2C, CAN TX, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| I2C interface | SDA. Use Wire1 object. You can only use Wire or Wire1, not both!|
| Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler.|
| CAN interface | CAN1_TX|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### C5
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 24|
| Pin Name | C5|
| Description | I2C, CAN RX, GPIO.|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports analogWrite (PWM) | Yes|
| Supports tone | Yes|
| I2C interface | SCL. Use Wire1 object. You can only use Wire or Wire1, not both!|
| Supports attachInterrupt | Yes. B0 and C5 share the same interrupt handler.|
| CAN interface | CAN1_RX|
| Internal pull resistance | 40K|
| Input is 5V Tolerant | Yes|
#### CELL USBD-
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 46|
| Pin Name | CELL USBD-|
| Description | Cellular Modem USB Data-|
| Input is 5V Tolerant | Yes|
#### CELL USBD+
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 44|
| Pin Name | CELL USBD+|
| Description | Cellular Modem USB Data+|
| Input is 5V Tolerant | Yes|
#### CELL VBUS
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 74|
| Pin Name | CELL VBUS|
| Description | USB detect pin for R410M. 5V on this pin enables the Cellular Modem USB interface.|
| Input is 5V Tolerant | Yes|
#### D0
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 25 | 22 |
| &nbsp; | Pin Name | D0 | D0 |
| ∆ | Description | D0 GPIO, I2C SDA | I2C SDA, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | I2C interface | SDA. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SDA. Use Wire object. |
| ∆ | Supports attachInterrupt | No | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D1
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 26 | 20 |
| &nbsp; | Pin Name | D1 | D1 |
| ∆ | Description | D0 GPIO, I2C SCL, CAN TX | I2C SCL, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| ∆ | I2C interface | SCL. Use Wire object. Use 1.5K to 10K external pull-up resistor. Is 5V tolerant. | SCL. Use Wire object. |
| ∆ | Supports attachInterrupt | Yes. D1, A4, and B1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN2_TX | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D2
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 27 | 42 |
| &nbsp; | Pin Name | D2 | D2 |
| ∆ | Description | D2 GPIO, SPI1 MOSI, CAN RX | SPI1 SCK, Serial1 RTS, PWM, GPIO, Wire1 SDA |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D2 and A5 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D2 and A5 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | UART serial | n/a | RTS. Use Serial1 object. |
| ∆ | SPI interface | MOSI. Use SPI1 object. | SCK. Use SPI1 object. |
| ∆ | I2C interface | n/a | SDA. Use Wire1 object. |
| ∆ | Supports attachInterrupt | Yes. D2, A0, and A3 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | CAN interface | CAN2_RX | n/a |
| ∆ | I2S interface | I2S3_SD | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### D22
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 62|
| Pin Name | D22|
| Description | GPIO, Ethernet INT|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### D23
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 64|
| Pin Name | D23|
| Description | GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### D3
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 28 | 40 |
| &nbsp; | Pin Name | D3 | D3 |
| ∆ | Description | D3 GPIO, SPI1 MISO | SPI1 MOSI, Serial1 CTS, GPIO, Wire1 SCL |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes. D3 and A4 share the same PWM channel and the PWM duty cycle is set for both. | No |
| ∆ | Supports tone | Yes. D3 and A4 share the same PWM channel and only one frequency can be set for both. | No |
| ∆ | UART serial | n/a | CTS. Use Serial1 object. |
| ∆ | SPI interface | MISO. Use SPI1 object. | MOSI. Use SPI1 object. |
| ∆ | I2C interface | n/a | SCL. Use Wire1 object. |
| ∆ | Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG RST. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG RST. 40K pull-up at boot. | n/a |
#### D4
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 29 | 66 |
| &nbsp; | Pin Name | D4 | D4 |
| ∆ | Description | D4 GPIO, SPI1 SCK | SPI1 MISO, PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | D4, D5, and D6 must have the same frequency. |
| ∆ | SPI interface | SCK. Use SPI1 object. | MISO. Use SPI1 object. |
| ∆ | Supports attachInterrupt | Yes. D4 and A1 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | I2S interface | I2S3_SCK | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDO. Floating at boot. | n/a |
| ∆ | Signal used at boot | JTAG TDO. Floating at boot. | n/a |
#### D5
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 30 | 68 |
| &nbsp; | Pin Name | D5 | D5 |
| ∆ | Description | D5 GPIO, SPI1 SS | PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | D4, D5, and D6 must have the same frequency. |
| ∆ | SPI interface | SS. Use SPI1 object. Can use any pin for SPI1 SS/CS however. | n/a |
| ∆ | Supports attachInterrupt | Yes | Yes. You can only have 8 active interrupt pins. |
| ∆ | I2S interface | I2S3_WS | n/a |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TDI. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG TDI. 40K pull-up at boot. | n/a |
#### D6
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 31 | 70 |
| &nbsp; | Pin Name | D6 | D6 |
| ∆ | Description | D6 GPIO, SWCLK | PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | D4, D5, and D6 must have the same frequency. |
| ∆ | Supports attachInterrupt | Yes | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
| ∆ | JTAG interface | JTAG TCK. 40K pull-down at boot. | n/a |
| ∆ | SWD interface | SWCLK. 40K pull-down at boot. | n/a |
| ∆ | Signal used at boot | JTAG TCK/SWCLK. 40K pull-down at boot. | n/a |
#### D7
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 32 | 72 |
| &nbsp; | Pin Name | D7 | D7 |
| ∆ | Description | D7 GPIO, Blue LED, SWDIO | PWM, GPIO |
| ∆ | Supports digitalRead | Yes. But the on-board LED will light when 3.3V is supplied on this pin as well. | Yes |
| ∆ | Supports digitalWrite | Yes. Note that this controls the on-board blue LED. | Yes |
| ∆ | Supports analogWrite (PWM) | No | PWM is shared with the RGB LED, you can specify a different duty cycle but should not change the frequency. |
| ∆ | Supports attachInterrupt | No. Shared with BAT_INT_PC13. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K. Pull-up applied in bootloader for JTAG. | 13K |
| ∆ | JTAG interface | JTAG TMS. 40K pull-up at boot. | n/a |
| ∆ | SWD interface | SWDIO. 40K pull-up at boot. | n/a |
| ∆ | Signal used at boot | JTAG TMS/SWDIO. 40K pull-up at boot. | n/a |
#### D8
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 48|
| Pin Name | D8|
| Description | GPIO, SPI SS, Ethernet CS|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | SS. Use SPI object. This is only the default SS/CS pin, you can use any GPIO instead.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### DAC
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 6 | 45 |
| ∆ | Pin Name | DAC | A6 |
| ∆ | Pin Alternate Name | A6 | n/a |
| ∆ | Description | DAC/A6 True analog out, analog in, GPIO. | A6 Analog in, PWM, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| ∆ | Supports analogWrite (DAC) | Yes | No |
| ∆ | Supports analogWrite (PWM) | No | Yes |
| ∆ | Supports tone | No | A0, A1, A6, and A7 must have the same frequency. |
| ∆ | Supports attachInterrupt | Yes. D3 and DAC/A6 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
#### GND
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 2 | 1 |
| &nbsp; | Pin Name | GND | GND |
| ∆ | Description | Ground. You only need to use one of the Photon ground pins. | Ground. |
#### MISO
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 50|
| Pin Name | MISO|
| Pin Alternate Name | D11|
| Description | SPI MISO, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | MISO. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### MODE
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 32|
| Pin Name | MODE|
| Pin Alternate Name | D20|
| Description | MODE button, has internal pull-up|
#### MOSI
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 52|
| Pin Name | MOSI|
| Pin Alternate Name | D12|
| Description | SPI MOSI, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | MOSI. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### NC
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 14|
| Pin Name | NC|
| Description | n/a|
#### NC
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 75|
| Pin Name | NC|
| Description | n/a|
#### NFC1
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 17|
| Pin Name | NFC1|
| Description | NFC Antenna 1|
#### NFC2
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 19|
| Pin Name | NFC2|
| Description | NFC Antenna 2|
#### RGBB
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 65|
| Pin Name | RGBB|
| Description | RGB LED Blue|
#### RGBG
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 63|
| Pin Name | RGBG|
| Description | RGB LED Green|
#### RGBR
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 61|
| Pin Name | RGBR|
| Description | RGB LED Red|
#### RST
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 35 | 34 |
| &nbsp; | Pin Name | RST | RST |
| ∆ | Description | Hardware reset. Pull low to reset; can leave unconnected in normal operation. | Hardware reset, active low. External pull-up required. |
#### RX
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 4 | 38 |
| &nbsp; | Pin Name | RX | RX |
| ∆ | Pin Alternate Name | n/a | D10 |
| ∆ | Description | Serial1 RX (received data), GPIO, PWM. | Serial RX, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | UART serial | RX. Use Serial1 object. | RX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. C4 and RX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### SCK
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 54|
| Pin Name | SCK|
| Pin Alternate Name | D13|
| Description | SPI SCK, GPIO|
| Supports digitalRead | Yes|
| Supports digitalWrite | Yes|
| SPI interface | SCK. Use SPI object.|
| Supports attachInterrupt | Yes. You can only have 8 active interrupt pins.|
| Internal pull resistance | 13K|
#### SIM_CLK
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 71|
| Pin Name | SIM_CLK|
| Description | Leave unconnected, 1.8V/3V SIM Clock Output from R410M.|
#### SIM_DATA
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 73|
| Pin Name | SIM_DATA|
| Description | Leave unconnected, 1.8V/3V SIM Data I/O of R410m with internal 4.7 k pull-up.|
#### SIM_RST
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 69|
| Pin Name | SIM_RST|
| Description | Leave unconnected, 1.8V/3V SIM Reset Output from R410M.|
#### SIM_VCC
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 67|
| Pin Name | SIM_VCC|
| Description | Leave unconnected, 1.8V/3V SIM Supply Output from R410M.|
#### TX
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 3 | 36 |
| &nbsp; | Pin Name | TX | TX |
| ∆ | Pin Alternate Name | n/a | D9 |
| ∆ | Description | Serial1 TX (transmitted data), GPIO, PWM. | Serial TX, GPIO |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| ∆ | Supports analogWrite (PWM) | Yes | No |
| ∆ | Supports tone | Yes | No |
| &nbsp; | UART serial | TX. Use Serial1 object. | TX. Use Serial1 object. |
| ∆ | Supports attachInterrupt | Yes. C3 and TX share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |
#### USBDATA-
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 13|
| Pin Name | USBDATA-|
| Description | USB Data-|
| Input is 5V Tolerant | Yes|
#### USBDATA+
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 11|
| Pin Name | USBDATA+|
| Description | USB Data+|
| Input is 5V Tolerant | Yes|
#### VBAT
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 34|
| Pin Name | VBAT|
| Description | Battery for internal real-time clock, jumpered to 3V3.|
#### VCC
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 2|
| Pin Name | VCC|
| Description | System power in, connect to the +LiPo or supply a fixed 3.6-4.3v power.|
#### VIN
| | Removed from Electron |
| :--- | :--- |
| Pin Number | 1|
| Pin Name | VIN|
| Description | Power in 3.9V to 12 VDC. Or power out (when powered by USB) 4.8 VDC at 1A maximum.|
#### VUSB
| | Added to B-Series SoM |
| :--- | :--- |
| Pin Number | 16|
| Pin Name | VUSB|
| Description | USB VUSB power pin|
| Input is 5V Tolerant | Yes|
#### WKP
|   |   | Electron | B-Series SoM |
| :--- | :--- | :--- | :--- |
| ∆ | Pin Number | 5 | 47 |
| ∆ | Pin Name | WKP | A7 |
| ∆ | Pin Alternate Name | A7 | n/a |
| ∆ | Description | WKP/A7 Wakeup (active high), analog in, GPIO. | A7 Analog in, GPIO, Ethernet Reset |
| &nbsp; | Supports digitalRead | Yes | Yes |
| &nbsp; | Supports digitalWrite | Yes | Yes |
| &nbsp; | Supports analogRead | Yes | Yes |
| &nbsp; | Supports analogWrite (PWM) | Yes | Yes |
| ∆ | Supports tone | Yes | A0, A1, A6, and A7 must have the same frequency. |
| ∆ | Supports attachInterrupt | Yes. A7 (WKP), B2, and B4 share the same interrupt handler. | Yes. You can only have 8 active interrupt pins. |
| ∆ | Internal pull resistance | 40K | 13K |
| ∆ | Input is 5V Tolerant | Yes | No |


{{!-- END do not edit content above, it is automatically generated  --}}



### Country compatibility

{{!-- BEGIN do not edit content below, it is automatically generated 175f09c2-2761-42e2-acbf-f7e0ea730d20 --}}

| Country | Electron U260 | Electron U270 | Electron LTE | B404X | B524 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Afghanistan | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Albania | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Algeria | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Anguilla | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Antigua and Barbuda | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Argentina | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Aruba | &check; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Australia | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Austria | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Azerbaijan | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Bahamas | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Bahrain | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Bangladesh | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Barbados | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Belarus | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Belgium | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Bermuda | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Bolivia | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Bosnia and Herzegovina | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Botswana | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Brazil | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Brunei | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Bulgaria | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Burkina Faso | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Cabo Verde | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Cambodia | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Cameroon | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Canada | &check; | &nbsp; | &check; | &check; | &nbsp; |
| Cayman Islands | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Chad | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Chile | &check; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Colombia | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Congo (Brazzaville) | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Congo (Kinshasa) | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Costa Rica | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Côte d'Ivoire | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Croatia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Curaçao | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Cyprus | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Czechia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Denmark | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Dominica | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Dominican Republic | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Ecuador | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Egypt | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| El Salvador | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Estonia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| eSwatini | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Ethiopia | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Faroe Islands | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Finland | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| France | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| French Guiana | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Gabon | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Georgia | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Germany | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Ghana | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Gibraltar | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Greece | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Greenland | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Grenada | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Guadeloupe | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Guatemala | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Guinea | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Guinea-Bissau | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Guyana | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Haiti | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Honduras | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Hong Kong | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Hungary | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Iceland | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Indonesia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Ireland | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Israel | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Italy | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Jamaica | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Japan | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Jersey | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Jordan | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Kazakhstan | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Kenya | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Kuwait | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Latvia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Liechtenstein | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Lithuania | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Luxembourg | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Macao | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Madagascar | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Malawi | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Malaysia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Malta | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Mexico | &check; | &nbsp; | &check; | &check; | &nbsp; |
| Moldova | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Mongolia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Montenegro | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Montserrat | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Morocco | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Mozambique | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Myanmar | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Namibia | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Netherlands | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| New Zealand | &check; | &check; | &nbsp; | &nbsp; | &check; |
| Nicaragua | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Niger | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Nigeria | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| North Macedonia | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Norway | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Oman | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Pakistan | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Palestine | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Panama | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Papua New Guinea | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Peru | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Philippines | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Poland | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Portugal | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Qatar | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Réunion | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Romania | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Russia | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Rwanda | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Saint Kitts and Nevis | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Saint Lucia | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Saint Vincent and the Grenadines | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Serbia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Seychelles | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Sint Maarten | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Slovakia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Slovenia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| South Africa | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| South Korea | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| South Sudan | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Spain | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Sri Lanka | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Suriname | &check; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Sweden | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Switzerland | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Taiwan | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Tanzania | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Thailand | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| Trinidad and Tobago | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Tunisia | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Uganda | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Ukraine | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| United Arab Emirates | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| United Kingdom | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |
| United States | &nbsp; | &nbsp; | &check; | &check; | &nbsp; |
| Uruguay | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Venezuela | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Vietnam | &nbsp; | &check; | &nbsp; | &nbsp; | &check; |
| Virgin Islands (British) | &check; | &nbsp; | &nbsp; | &nbsp; | &nbsp; |
| Yemen | &nbsp; | &check; | &nbsp; | &nbsp; | &nbsp; |
| Zambia | &nbsp; | &nbsp; | &nbsp; | &nbsp; | &check; |


{{!-- END do not edit content above, it is automatically generated  --}}



## Software

### Platform ID

| Platform ID | Name | Description |
| :--- | :--- | :--- |
| 10 | electron | Electron and E-Series |
| 13 | boron | Boron (all models) |
| 23 | bsom | B404X, B404, and B402 B-Series SoM |
| 25 | b5som | B524, B523 B-Series SoM | 

If you have a product based on the Electron, you will need to create a separate product (or two) for devices using the B-Series SoM. While you may be able to use the same source code to build your application, the firmware binaries uploaded to the console will be different, so they need to be separate products. This generally does not affect billing as only the number of devices, not the number of products, is counted toward your plan limits.

The reason there are separate platforms for the B4xx and B5xx SoM is that they have different cellular modem manufacturers, u-blox and Quectel, respectively. All Boron models have u-blox cellular modems and thus can share a single platform.

### Third-party libraries

Most common third-party libraries work on both devices. The exceptions are libraries that depend on specific hardware in the STM32F205 processor. For example:

- SparkIntervalTimer depends on the STM32 hardware timers
- Libraries that use ADC DMA features of the STM32 directly
- Code that uses timing loops that depend on the MCU clock frequency


### SKUs

{{!-- BEGIN do not edit content below, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

| SKU | Description | Region | Lifecycle |
| :--- | :--- | :--- | :--- |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | NORAM | GA |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | NORAM | GA |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Americas | GA |
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | NORAM | GA |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | EMEAA | GA |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | EMEAA | GA |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | Global | GA |


{{!-- END do not edit content above, it is automatically generated b28329f3-7067-4ae1-aafa-c48b75d77674 --}}

- EMEAA: Selected countries in Europe, Middle East, Africa, and Asia, including Australia and New Zealand. See the [cellular carrier list](/reference/cellular/cellular-carriers/) for more information.


## Version history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
|   1 | 2022-11-15 | RK | Initial version |
|   2 | 2022-12-10 | RK | Added PMIC notes |
