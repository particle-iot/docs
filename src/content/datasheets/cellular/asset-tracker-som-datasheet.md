---
title: Asset Tracker SoM datasheet
layout: datasheet.hbs
columns: two
order: 4
description: Datasheet for the Particle Asset Tracker SoM Cellular GNSS module
---

# Asset Tracker SoM Datasheet <sup>(pre)</sup>

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/asset-tracker-som-datasheet.pdf"}}
{{/unless}} {{!-- pdf-generation --}}

**This is a preliminary datasheet and is subject to change**

<div align=center><img src="/assets/images/b-series/b523-top.jpg" ></div>


## Functional description

### Overview

The B Series System-on-a-Module (SoM) is a LTE Cat 1 cellular device with support for BLE (Bluetooth LE). It is based on the Nordic nRF52840 micro-controller.

The B Series is designed to be integrated into your circuit board design, plugging a M.2 NGFF connector on your board, allowing the module to be changed or upgraded easily.

### Features

 * GNSS u-blox Neo M8U for GNSS with on-board dead-reckoning for up to 1.8m CEP50 GPS accuracy
  * Supports GPS L1C/A, SBAS L1C/A, QZSS L1C/A, QZSS L1-SAIF, GLONASS L1OF, BeiDou B1I, Galileo E1B/C
 * Quectel BG96-NA modem
  * LTE Cat M1 module for North America (United States, Canada, and Mexico)
  * **TODO: BG96 Specs Here**
 * Quectel EG91-E modem
  * LTE category 1 module for EMEA region 
  * 3GPP E-UTRA Release 11 
  * Cat 1 bands supported: 1, 3, 7, 8, 20, 28A
 * Nordic Semiconductor nRF52840 SoC 
  * ARM Cortex-M4F 32-bit processor @ 64MHz 
  * 1MB flash, 256KB RAM in SoC
  * Bluetooth 5: 2 Mbps, 1 Mbps, 500 Kbps, 125 Kbps 
  * Supports DSP instructions, HW accelerated Floating Point Unit (FPU) calculations 
  * ARM TrustZone CryptoCell-310 Cryptographic and security module 
  * Up to +8 dBm TX power (down to -20 dBm in 4 dB steps) 
  * NFC-A tag
 * Wi-Fi location: on-board ESP32 offers SSID scanning for using third-party Wi-Fi location services
 * PMIC (Power Management IC) and Fuel Gauge
 * On-module additional 8MB SPI flash
 * CAN Bus: on-board, integrated CAN Bus controller and transceiver making it ideal for fleet and micromobility
 * I/O Expander: onboard devices use this where appropriate to leave 1 SPI, 1 I2C, 1 UART and up to 10 GPIO available for the user
 * RTC: Battery-backed external real-time clock
 * Watchdog Timer: integrated hardware WDT
 * 24 mixed signal GPIO (8 x Analog, 4 x PWM), UART, I2C, SPI **TODO: Adjust this for correct number of IO**
 * USB 2.0 full speed (12 Mbps)
 * JTAG (SWD) pins
 * Support for external RGB status LED 
 * Support for external Reset and Mode buttons
 * On-module MFF2 Particle SIM 
 * Bluetooth chip antenna on module, switchable to use U.FL connector in software.
 * Two on-module U.FL connectors for external antennas **TODO: More connectors, determine exact number**
 * Castellated module designed to be reflow soldered to your own custom base board, or pre-populated on a Particle Evaluation Board or Carrier Board.
 * FCC, IC, and CE certified **TODO: Which certs?**
 * RoHS compliant (lead-free)


## Interfaces

### Block diagram

**TODO: This is a temporary image from Eagle. Redraw in Illustrator**

<div align=center> <a href="/assets/images/at-som/block-diagram.png" target="_blank"> <img src="/assets/images/at-som/block-diagram.png" ></a></div>

### Power
The Asset Tracker SoM can be powered via the VIN (3.88V-12VDC) pin, over USB, or a LiPo battery.

#### VIN
The input voltage range on VIN pin is 3.88VDC to 12VDC. When powering from the VIN pin alone, make sure that the power supply is rated at 10W (for example 5 VDC at 2 Amp). If the power source is unable to meet this requirement, you'll need connect the LiPo battery as well.  An additional bulk capacitance of 470uF to 1000uF should be added to the VIN input when the LiPo Battery is disconnected.  The amount of capacitance required will depend on the ability of the power supply to deliver peak currents to the cellular modem.

#### LiPo
This pin serves two purposes. You can use this pin to connect a LiPo battery directly without having to use a JST connector or it can be used to connect an external DC power source (and this is where one needs to take extra precautions). When powering it from an external regulated DC source, the  recommended input voltage range on this pin is between 3.6V to 4.4VDC. Make sure that the supply can handle currents of at least 3Amp. This is the most efficient way of powering the module since the PMIC by-passes the regulator and supplies power to the module via an internal FET leading to lower quiescent current.

When powered from a LiPo battery alone, the power management IC switches off the internal regulator and supplies power to the system directly from the battery. This reduces the conduction losses and maximizes battery run time. The battery provided with the module is a Lithium-Ion Polymer battery rated at 3.7VDC 1,800mAh. You can substitute this battery with another 3.7V LiPo with higher current rating. Remember to never exceed this voltage rating and always pay attention to the polarity of the connector.

Typical current consumption is around 180mA and up to 1.8A transients at 5VDC. In deep sleep mode, the quiescent current is 130uA (powered from the battery alone).

The MAX17043 fuel gauge is only compatible with single cell lithium-ion batteries. The state-of-charge (SoC) values will not be accurate with other battery chemistries.

A battery temperature sensor can be added if desired. Connect a negative temperature coefficient thermistor to the TS pin and GND. Charge suspends when the TS pin is out of range. A 103AT-2 thermistor is recommended.

#### VBUS
This pin is internally connected to USB supply rail and will output 5V when the module is plugged into an USB port. It is intentionally left unpopulated. This pin will _NOT_ output any voltage when the module is powered via VIN and/or the LiPo battery.

Most USB ports can supply only a maximum of 500mA, but the cellular module alone can consume a peak of 800mA to 1800mA (2G/3G) or 550 mA (LTE Cat M1) of current during transmission. In order to compensate of this deficit, one must connect the LiPo battery at all times when powering from a traditional USB port for 2G/3G. The PMIC will intelligently source power from the USB most of the time and keep the battery charged. During peak current requirements, the additional power will be sourced from the battery. This reduces the charge-discharge cycle load on the battery, thus improving its longevity.

#### 3V3 Pin
This pin is the output of the on-board 3.3V switching regulator that powers the microcontroller and the peripherals. This pin can be used as a 3.3V power source with a max load of 800mA. Unlike the Photon, this pin _CANNOT_ be used as an input to power the module.


#### RTC_BAT
This is the supply to the real-time clock battery backup. **TODO: specs**

#### PMID
This pin is the output of the internal boost regulator of the PMIC that can source 5.1VDC from the battery in OTG (On The Go) mode. This feature is useful when your circuitry needs a 5V source from the module when powered by the battery alone.

The confusing bit about this pin is that it will continue to provide 5.1VDC but only when the input voltage (VIN) is between 3.6V to 5.1VDC. As soon as the input voltage exceeds this limit, the PMID starts tracking _that_ voltage. For example if VIN = 9VDC, the PMID will be 9VDC and _NOT_ 5.1VDC. So you need to be careful when using it as a source for powering your external circuitry. The max current draw on this pin is 2.1A but is not recommended due to thermal limitations of the circuit board.

---

### Antennas

There are a number of U.FL antenna connectors on the Asset Tracker SoM:

| Label | Purpose | 
| GNSS | u-blox GNSS antenna (GPS) |
| CELL | Quectel cellular modem antenna |
| WIFI | Wi-Fi antenna for Wi-Fi geolocation (optional)<sup>1</sup> |
| BLE  | External Bluetooth (optional)<sup>2</sup> |
| GNSS/DIV | Quectel GNSS antenna (optional)<sup>1</sup> |

<sup>1</sup>Not supported in initial release.
<sup>2</sup>There is a BLE chip antenna on the module, the external BLE antenna is optional.

There is no U.FL connector for NFC. If you wish to use the NFC tag feature, you'll need to add an antenna or antenna connector on your base board.

- The antenna placement needs to follow some basic rules, as any antenna is sensitive to its environment. Mount the antenna at least 10mm from metal components or surfaces, ideally 20mm for best radiation efficiency, and try to maintain a minimum of three directions free from obstructions to be able to operate effectively.
- Needs tuning with actual product enclosure and all components.
- For the BLE antenna, it is recommended to use a 2.4 GHz single-frequency antenna and not a 2.4 GHz + 5 GHz antenna, so as to avoid large gain at the frequency twice of 2.4 GHz which can cause the second harmonic radiation of 2.4 GHz to exceed standards.
 

### Peripherals and GPIO

| Peripheral Type | Qty | Input(I) / Output(O) |
| :---:|:---:|:---:|
| Digital | 10 (max) | I/O |
| Analog (ADC) | 8 (max) | I |
| UART | 1 | I/O |
| SPI  | 1 | I/O |
| I2C  | 1 | I/O |
| USB  | 1 | I/O |
| PWM  | 10 (max) | O |
| NFC  | 1 | O |
| CAN  | 1 | 0 | 

**Note:** All GPIO are only rated at 3.3VDC max. CAN bus is rated at **TODO: CAN maximum voltage**.

### JTAG (SWD) 

The AssetTracker SoM exposes the nRF52 SWD interface on the following pins. The Evaluation Board connects these pins to the 2x5 connector used on the Argon and Boron to easily connect the Particle Debugger.

| # |	Pin	 | Function | Connected To |	Description |
| :---: | :---: | :---: | :---: | --- |
| 22 | SWDIO | JTAG | nRF52 | nRF52 MCU SWDIO |
| 23 | SWDCLK | JTAG | nRF52 | nRF52 MCU SWDCLK |
| 24 | SWO | JTAG | nRF52 | nRF52 MCU SWO |

This interface can be used to debug your code or reprogram your E402 bootloader, device OS, or the user firmware. 

## Memory map

### nRF52840 Flash Layout Overview

 - Bootloader (48KB, @0xF4000)
 - User Application (128KB, @0xD4000)
 - System (656KB, @0x30000)
 - SoftDevice (192KB)

### External SPI Flash Layout Overview (DFU offset: 0x80000000)

 - Reserved (4MB, @0x0040000) 
 - OTA (1500KB, @0x00289000)
 - Reserved (420KB, @0x00220000)
 - FAC (128KB, @0x00200000)
 - LittleFS (2M, @0x00000000)

## Pins and button definitions

### Pinout diagram

**TODO: Update this diagram**
![Pinout](/assets/images/b-series/b523-pinout.png)

### SoM Pin description

| # |	Pin	 | Function | Connected To |	Description |
| :---: | :---: | :---: | :---: | --- |
|   |   |  |  | Right Side |
| 1 | GND | POWER | | Ground |
| 2 | GNSS_BAT | POWER IN | GNSS | Battery backup for GNSS |
| 3 | GNSS_RESET | IO | GNSS & IOEX | GNSS hardware reset. Can be controlled by this pin or software. |
| 4 | GNSS_VBUS | USB PWR | GNSS | GNSS USB power. Optional. |
| 5 | GNSS_P | USB D+ | GNSS | GNSS USB interface D+. Optional. |
| 6 | GNSS_N | USB D- | GNSS | GNSS USB interface D-. Optional. |
| 7 | GNSS_PULSE | OUT | GNSS | GNSS time pulse output. Can be used for a GPS fix LED. |
| 8 | GND | POWER | | Ground |
| 9 | NC |  | | Leave unconnected. |
| 10 | GND | POWER | | Ground |
| 11 | WIFI_EN | IO | WIFI & IOEX | ESP32 enable. Can be controlled by this pin or software.  |
| 12 | WIFI_BOOT | IO | WIFI & IOEX | ESP32 boot mode. Can be controlled by this pin or software.  |
| 13 | WIFI_TXD | OUT | WIFI | ESP32 serial TX |
| 14 | WIFI_RXD | IN | WIFI | ESP32 serial TX |
| 15 | CELL_VBUS | USB PWR | CELL | Cellular modem USB power. Optional. |
| 16 | CELL_D+ | USB D+ | CELL | Cellular modem USB interface D+. Optional. |
| 17 | CELL-D- | USB D- | CELL | Cellular modem USB interface D-. Optional. |
| 18 | NC SOM18 | | | Leave unconnected. |
| 19 | NC SOM19 | | | Leave unconnected. |
| 20 | NC SOM20 | | | Leave unconnected. |
| 21 | NC SOM21 | | | Leave unconnected. |
| 22 | SWDIO | JTAG | nRF52 | nRF52 MCU SWDIO |
| 23 | SWDCLK | JTAG | nRF52 | nRF52 MCU SWDCLK |
| 24 | SWO | JTAG | nRF52 | nRF52 MCU SWO |
| 25 | GND | POWER | | Ground |
| 26 | NFC1 | NFC | nRF52 | nRF52 NFC antenna. Supports NFC tag mode only. Optional. |
| 27 | NFC2 | NFC | nRF52 | nRF52 NFC antenna. Supports NFC tag mode only. Optional. |
| 28 | RGB_BLUE | RGB LED | nRF52 | Common anode RGB status LED, blue. Optional. |
| 29 | RGB_GREEN | RGB LED | nRF52 | Common anode RGB status LED, green. Optional. |
| 30 | RGB_RED | RGB LED | nRF52 | Common anode RGB status LED, red. Optional. |
| 31 | GND | POWER | | Ground |
| 32 | MODE | INPUT | nRF52 | External MODE button input. Optional. |
| 33 | RESET | INPUT | nRF52 | External RESET button input. Optional. |
| 34 | NC SOM34 | | | Leave unconnected. |
| 35 | NC SOM35 | | | Leave unconnected. |
| 36 | NC SOM36 | | | Leave unconnected. |
| 37 | NC SOM37 | | | Leave unconnected. |
| 38 | A7 | IO | nRF52 | A7, D7, Serial1 RTS |
| 39 | A6 | IO | nRF52 | A6, D6, Serial1 CTS |
| 40 | A5 | IO | nRF52 | A5, D5, SPI MISO |
| 41 | A4 | IO | nRF52 | A4, D4, SPI MOSI |
| 42 | GND | POWER | | Ground |
|   |   |  |  | Top Side |
| 43 | GND | POWER | | Ground |
| 44 | NC SOM44 | | | Leave unconnected. |
| 45 | 3V3 | POWER OUT | TPS62291 | 3.3V power output. 1000 mA maximum include nRF52 and other peripheral use. |
| 46 | TS | IN | PMIC | Battery temperature sensor |
| 47 | PMID | POWER OUT | PMIC | PMIC power output in OTG mode. |
| 48 | GND | POWER | | Ground |
| 49 | VIN | POWER IN | PMIC | Power input 3.88VDC to 12VDC. |
| 50 | STAT | OUT | PMIC | PMIC charge status. Can be connected to an LED. Optional. | 
| 51 | VBUS | POWER IN | PMIC & nRF52 | nRF52 USB power input. Can be used as a power supply instead of VIN. |
| 52 | GND | POWER | | Ground |
| 53 | LI+ | POWER | PMIC | Connect to Li-Po battery. Can power the device or be recharged by VIN or VBUS. |
|   |   |  |  | Left Side |
| 54 | GND | POWER | | Ground |
| 55 | A0 | IO | nRF52 | A0 D0 Wire SDA |
| 56 | A1 | IO | nRF52 | A1 D1 Wire SCL |
| 57 | A2 | IO | nRF52 | A2 D2 SPI SS |
| 58 | A3 | IO | nRF52 | A3 D3 SPI SCK |
| 59 | NC SOM59 | | | Leave unconnected. |
| 60 | NC SOM60 | | | Leave unconnected. |
| 61 | NC SOM61 | | | Leave unconnected. |
| 62 | NC SOM62 | | | Leave unconnected. |
| 63 | AGND | POWER | nRF52 | nRF52 analog ground. Can connect to regular GND. |
| 64 | CAN_N | CAN | CAN | CAN Data- |
| 65 | CAN_P | CAN | CAN | CAN Data+ |
| 66 | CAN_5V |  | XCL9142F40 | 5V power out, 0.8A maximum. Can be controlled by software. |
| 67 | GND | POWER | | Ground |
| 68 | MCU-D- | USB D- | nRF52 | MCU USB interface D-. Optional. |
| 69 | MCU_D+ | USB D+ | nRF52 | MCU USB interface D+. Optional. |
| 70 | GND | POWER | | Ground |
| 71 | MCU_RX | IO | nRF52 | Serial RX, GPIO D9 |
| 72 | MCU_TX | IO | nRF52 | Serial TX, GPIO D8 |
| 73 | RTC_BAT | POWER | AM18X5 | RTC/Watchdog battery +. Connect to GND if not using. |
| 74 | RTC_BTN | IN | AM18X5 | RTC EXTI. Can use as a wake button. |
| 75 | GND | POWER | | Ground |
| 76 | NC SOM76 | | | Leave unconnected. |
| 77 | NC SOM77 | | | Leave unconnected. |
| 78 | NC SOM78 | | | Leave unconnected. |
| 79 | NC SOM79 | | | Leave unconnected. |
| 80 | NC SOM80 | | | Leave unconnected. |
| 81 | NC SOM81 | | | Leave unconnected. |
| 82 | NC SOM82 | | | Leave unconnected. |
| 83 | CELL_GPS_TX | OUT | CELL | Cellular modem GPS serial TX data. |
| 84 | CELL_GPS_RX | IN | CELL | Cellular modem GPS serial RX data. |
| 85 | CELL_RI | OUT | CELL | Cellular modem ring indicator output. **TODO: Is this connected to anything else?** |
| 86 | GND | POWER | | Ground |
| 87 | CELL_GPS_RF | RF | CELL | Cellular modem GPS antenna. Optional. |
| 88 | GND | POWER | | Ground |
| 89 | GND | POWER | | Ground |
| 90 | GNSS_BOOT |  | GNSS | **TODO: What does this do?** |
| 91 | GNSS_ANT_PWR |  | GNSS | **TODO: What does this do?** |
| 92 | GNSS_LNA_EN |  | GNSS | **TODO: What does this do?** |
| 93 | GND | POWER | | Ground |
| 94 | GNSS_RF |  | GNSS | GNSS antenna. |
| 95 | GND | POWER | | Ground |


```
Not actually exposed on castellated pads, probably delete this section

| 96 | MOSI1 | SPI | nRF52 | SPI MOSI |
| 97 | MISO1 | SPI | nRF52 | SPI MISO |
| 98 | CLK1 | SPI | nRF52 | SPI CLK |
| 99 | Y5 | OUT | SN74LVC138 | SPI CS for user use on custom base board. |
| 100 | Y1 | OUT | SN74LVC138 | SPI CS for user use on custom base board. |
| 101 | SIM_VCC | SIM | CELL | SIM power for external SIM. Not supported. |
| 102 | SIM_RST | SIM | CELL | SIM reset for external SIM. Not supported. |
| 103 | SIM_DATA | SIM | CELL | SIM data for external SIM. Not supported. |
| 104 | SIM_CLK | SIM | CELL | SIM clock for external SIM. Not supported. |

```

### nRF52 pin assignments

| SoM Pin | GPIO  | Analog | Other       | PWM     | nRF Pin |
| :-----: | :---: | :----: | :---------: | :-----: | :-----: |
| 55      | D0    | A0     | Wire SDA    | Group 0 | P0.03   |
| 56      | D1    | A1     | Wire SCL    | Group 0 | P0.02   |
| 57      | D2    | A2     | SPI SS, WKP | Group 0 | P0.28   |
| 58      | D3    | A3     | SPI SCK     | Group 0 | P0.30   |
| 41      | D4    | A4     | SPI MOSI    | Group 1 | P0.31   |
| 40      | D5    | A5     | SPI MISO    | Group 1 | P0.29   |
| 39      | D6    | A6     | Serial1 CTS | Group 1 | P0.04   |
| 38      | D7    | A7     | Serial1 RTS | Group 1 | P0.05   |
| 72      | D8    |        | Serial1 TX  | Group 2 | P0.06   |
| 71      | D9    |        | Serial1 RX  | Group 2 | P0.08   |

#### System peripheral GPIO

| Name | Description | Location | 
| :---: | :--- | :---: |
| BTN | MODE Button | P1.13 | 
| PMIC_INT | PMIC Interrupt | P0.26 | 
| LOW_BAT_UC | Fuel Gauge Interrupt | IOEX |
| RTC_INT | Real-time clock Interrupt | P0.27 |
| BGRST | Cellular module reset | P0.7 |
| BGPWR | Cellular module power | P0.8 |
| BGVINT | Cellular power on detect  | P1.14 |
| BGDTR | Cellular module DTR | IOEX |
| CAN_INT | CAN interrupt | P1,9 |
| CAN_RST | CAN reset | IOEX |
| CAN_PWR | 5V boost converter enable | IOEX |
| CAN_STBY | CAN standby mode | IOEX |
| CAN_RTS0 | CAB RTS0 | IOEX |
| CAN_RTS1 | CAN RTS1 | IOEX |
| CAN_RTS2 | CAN RTS2 | IOEX |
| SEN_INT | IMU interrupt | P1.7 |
| ANT_SW1 | BLE antenna switch | P1.15 |
| GPS_PWR | u-blox GNSS power | IOEX | 
| GPS_INT | u-blox GNSS interrupt | IOEX | 
| GPS_BOOT | u-blox GNSS boot mode | IOEX | 
| GPS_RST | u-blox GNSS reset | IOEX | 
| WIFI_EN | ESP32 enable | IOEX |
| WIFI_INT | ESP32 interrupt | IOEX |
| WIFI_BOOT | ESP32 boot mode | IOEX |


```
nRF52 pin assignments 
Once everything is copied to another more useful table, delete this section

P1.01 MISO1 (SPI1 for system peripherals)
P1.02 MOSI1 (SPI1 for system peripherals)
P1.03 RGBB (PWM3.3)
P1.04 SCK1 (SPI1 for system peripherals)
P1.05 RGBG (PWM3.2)
P1.06 RGBR (PWM3.1)
P1.07 SEN_INT (IMU interrupt)
P0.09 NFC1 
P0.10 NFC2 
P1.10 SPI1_CS0 (connected to 3-8 expander) 
P1.11 SPI1_CS1 
P1.12 SPI1_CS2 
P1.13 /MODE 
P1.14 CELL_ON_DET 
P1.15 ANT_SELECT 
P0.03 A0 D0 SDA (PWM0.0)
P0.02 A1 D1 SCL (PWM0.1)
P0.28 A2 SS  (PWM0.2)
P0.29 A5 MISO (PWM1.1)
P0.30 A3 SCK (PWM0.3)
P0.31 A4 MOSI (PWM1.0)
P0.26 PMIC_INT (interrupt output from bq24195)
P0.27 RTC_INT (interrupt from AM18X5)
P0.04 A6 D6 CTS (PWM1.2)
P0.05 A7 D7 RTS (PWM1.3)
P0.06 TX D8 (PWM2.0)
P0.07 NRF_BG_RST (what is this?)
P0.08 RX D9 (PWM2.1)
P1.08 NRF_CELL_PWR (what is this?)
P1.09 /CAN_INT 
P0.11 SDA1 (I2C Wire1 used by PMIC, Fuel Gauge, RTC)
P0.12 SCL1 (I2C Wire1 used by PMIC, Fuel Gauge, RTC)
P0.13 CTS1 (Serial to cellular modem)
P0.14 RTS1 (Serial to cellular modem)
P0.15 RX1  (Serial to cellular modem)
P0.16 TX1  (Serial to cellular modem)
P0.17 QSPI_CS (QSPI flash MX256435) 
P0.8 /RESET /NRF_RST 
P0.19 QSPI_CLK (QSPI flash MX256435) 
P0.20 QSPI_D0 
P0.21 QSPI_D1 
P0.22 QSPI_D2 
P0.23 QSPI_D3 
P0.24 /IOEX_INT 
P0.25 /IOEX_RST 
P1.00 SWO 
```

### LED status

#### System RGB LED

The Asset Tracker SoM does not have an on-module RGB system status LED. We have provided its individual control pins for you to connect an LED of 
your liking. This will allow greater flexibility in the end design of your products.

Device OS assumes a common anode RGB LED. One common LED that meets the requirements is the 
[Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/9094273 CLMVC-FKA-CL1D1L71BB7C3C3) 
which is inexpensive and easily procured. You need to add three current limiting resistors. With this LED, we typically use 1K current limiting resistors. 
These are much larger than necessary. They make the LED less blinding but still provide sufficient current to light the LEDs. 
If you want maximum brightness you should use the calculated values, 33 ohm on red, and 66 ohm on green and blue.

A detailed explanation of different color codes of the RGB system LED can be found [here](/tutorials/device-os/led/).

## Technical specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

#### Supply voltages

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| **Supply voltages** | | | | | |
| Supply Input Voltage | VCC | -0.3 |  | +4.7 | V |
| Supply Input Voltage | 3V3 | -0.3 |  | +3.9 | V |
| VBUS USB supply voltage | VUSB | -0.3 |  | +5.8 | V |
| **I/O pin voltage** | | | | | | 
| VI/O, VDD ≤ 3.6 V| IO | -0.3 |  | VDD + 0.3 | V |
| VI/O, VDD > 3.6 V | IO | -0.3 |  | +3.9 | V |
| **NFC antenna pin current** | | | | | |
| I<sub>NFC1/2</sub> | NFC1/NFC2 | | | 80 | mA |
| **Radio**| | | | | |
| BT RF input level (52840)| | | | 10 | dBm |
| **Environmental**| | | | | |
| Storage  temperature | | -40 | | +85 |°C |


<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.


### Recommended operating conditions

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| **Supply voltages** |
| Supply Input Voltage | VCC | +3.6 | +3.8 | +4.3 | V |
| Supply Input Voltage | 3V3 | +3.0 | +3.3 | +3.6 | V |
| VBUS USB supply voltage | VUSB | +4.35 | +5.0 | +5.5 | V |
| **Environmental** |
| Normal operating temperature<sup>1</sup> | | -20 | +25 | +75<sup>3</sup> | °C |
| Extended operating temperature<sup>2</sup> | | -40 |  | +85 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>1</sup> Normal operating temperature range (fully functional and meet 3GPP specifications).

<sup>2</sup> Extended operating temperature range (RF performance may be affected outside normal operating range, though module is fully functional)

<sup>3</sup> The maximum operating temperature is 75°C on the B523 (Quectel) but is 65°C on the B402 (u-blox LTE M1). For compatibility across modules, limit this to 65°C. 

---

### GNSS specifications

**TODO: Copy from u-blox NEO-M8U datasheet performance section 1.3**

- u-blox NEO-M8U
- SPI Interface 
- Connected to SPI1 (MISO1, MOSI1, SCK1) 
- Chip Select: GPS_CS (connected to SPI CS Multiplexer Y4)

**TODO: Probably don't need this table**

| # |	Pin	 | Function | Connected To |	Description |
| :---: | :---: | :---: | :---: | --- |
|  1 | SAFEBOOT_N | | |
|  2 | D_SEL | | |
|  3 | TIME_PULSE | | |
|  4 | EXTINT | | |
|  5 | USB_DM | | |
|  6 | USB_DP | | |
|  7 | USB_VDD | | |
|  8 | RESET_N | | |
|  9 | VCC_RF | | |
| 10 | GND | | |
| 11 | RF_IN | | |
| 12 | GND | | |
| 13 | GND | | |
| 14 | LNA_EN | | |
| 15 | RESERVED | | |
| 16 | RESERVED | | |
| 17 | RESERVED | | |
| 18 | SPI_CS_N | | |
| 18 | SPI_CLK | | |
| 20 | SPI_MISO | | |
| 21 | SPI_MOSI | | |
| 22 | V_BCKP | | |
| 23 | VCC | | GNSS Power |
| 24 | GND | | Ground. |

 **TODO: Might want to remove the GND and reserved pins and just include the important ones**


### Other components

#### CAN Bus

**TODO: table of specs from datasheet**

```
MCP25625T
Connected to SCK1, MOSI1, MISO1
CS: CAN_CS  (connected to SPI CS Multiplexer Y7)
/CAN_RST
CAN_STBY
/CAN_INT 

5V power supply
XCL9142F40CER
Step-up converter 0.8A 5V
```


#### IMU (Inertial Measurement Unit)

- Bosch Sensortec BMI160
- SPI Interface 
- Connected to SPI1 (MISO1, MOSI1, SCK1) 
- Chip Select: SEN_CS (connected to SPI CS Multiplexer Y2)
- Interrupt: SEN_INT2 (nRF52 P1.07)
- Can wake nRF52 MCU on movement

**TODO: table of specs from datasheet**


#### PMIC

- bq24195
- I2C interface (address 0x6B)
- Interrupt output connected to nRF52 P0.26. The INT pin sends active low, 256-us pulse Digital to host to report charger device status and fault.
**TODO: table of specs from datasheet**



#### Fuel Gauge

- MAX17043
- I2C interface (address 0x36)
- Interrupt output connected to MCP23517 I/O Expander (GPA0)

**TODO: table of specs from datasheet**


#### RTC/Watchdog

- Ambiq Micro AM18X5 Real-Time Clock with Power Management
- 55 nA power consumption
- Crystal oscillator
- I2C interface (address 0x68)
- Can wake MCU at a specific time using `RTC_INT`.
- Hardware watchdog functionality

**TODO: table of specs from datasheet**

#### Wi-Fi Geolocation

The Wi-Fi module is intended for Wi-Fi geolocation only. It cannot be used as a network interface instead of using cellular. 
An external service provider is required.

- ESP32-D2WD
- SPI Interface 
- Connected to SPI1 (MISO1, MOSI1, SCK1) 
- Chip Select: WIFI_CS (connected to SPI CS Multiplexer Y3)
- Interrupt: ESP32 IO4 is connected to MCP23517T I/0 Expander GPA4.

The SoM connector has several pins dedicated to Wi-Fi:

| # |	Pin	 | Function | Connected To |	Description |
| :---: | :---: | :---: | :---: | --- |
| 11 | WIFI_EN | IO | WIFI & IOEX | ESP32 enable. Can be controlled by this pin or software.  |
| 12 | WIFI_BOOT | IO | WIFI & IOEX | ESP32 boot mode. Can be controlled by this pin or software.  |
| 13 | WIFI_TXD | OUT | WIFI | ESP32 serial TX |
| 14 | WIFI_RXD | IN | WIFI | ESP32 serial TX |

The WIFI_EN pin turns on the Wi-Fi module. LOW=Off, HIGH=On. The default is off (with a 100K weak pull-down). It can be turned on from Pin 11 on the SoM 
connection, or in software from the MCP23517T I/0 Expander GPA3.

The WIFI_BOOT pin enables programming mode. 



```
ESP32-D2WD
Connected to MISO1, MOSI1, SCK1
CS: WIFI_CS
Other IO: WIFI_INT, WIFI_BOOT
WIFI_TXD, WIFI_RXD (where do these go?)

WIFI_BOOT is connecting to ESP32 GPIO0. 1 = SPI boot, 0 = Download boot
WIFI_INT is ESP32 IO4. I think it's intended to be an output. Connected to IO expander GPA4.
WIFI_EN is ESP32 CHIP_PU. HIGH = chip powered, LOW = power off ESP32. Default is powered off (100K pull-down).
```


#### SPI CS Multiplexer

**TODO: I might delete this section as it's not really relevant to the use of the module**

The Asset Tracker SoM includes a large number of SPI devices. As each SPI device requires a CS (chip select) line and they are mutually exclusive, a 
SN74LVC138 3-to-8 multiplexer is used to minimize the number of nRF52 GPIO pins that are required. 

| nRF52 Pin | Name |
| :---: | :---: | 
| P1.10 | SPI1_CS0 |
| P1.11 | SPI1_CS1 |
| P1.12 | SPI1_CS2 | 

| Multiplexer Output | Name | Details |
| :---: | :---: | :--- |
| Y0 | unused | |
| Y1 | Y1 | Not currently used |
| Y2 | SEN_CS | Bosch BMI160 IMU |
| Y3 | WIFI_CS | ESP32 Wi-Fi|
| Y4 | GPS_CS | u-blox NEO-M8U GNSS |
| Y5 | Y5 | Not currently used |
| Y6 | IOEX_CS | MCP23517T I/O Expander |
| Y7 | CAN_CS | MCP25625T CAN Controller | 

The pins Y1 and Y5 available on the SoM pads and evaluation board so you can control additional SPI devices on your base board without having to use 
nRF52 GPIO directly.

#### I/O Expander

**TODO: Maybe don't need to document this**

```
I/O Expander 
MCP23517T-E 
Connected to SCK1, MOSI1, MISO1 
CS pin: IOEX_CS 
INTA: IOEX_INT 

GPA0 FUEL_INT 
GPA1 RTC_WDI 
GPA2 CAN_STBY 
GPA3 WIFI_EN 
GPA4 WIFI_INT 
GPA5 WIFI_BOOT 
GPA6 GPS_WR_EN 
GPA7 GPS_INT 
GPB0 GPS_BOOT 
GPB1 /GPS_RST 
GPB2 CAN_RTS1 
GPB3 CAN_RTS2 
GPB4 CAN_RTS0 
GPB5 CELL_DTR_NR 
GPB6 /CAN_RST 
GPB7 CAN_VDD_EN 
```

#### 3.3V Regulator

- Texas Instruments TPS62291
- 1.0A at 3.3V
- 3.3V supply can be powered down from the RTC/Watchdog

### Radio specifications

Boron has two radio modules.

#### nRF52840
- Bluetooth® 5, 2.4 GHz
  - 95 dBm sensitivity in 1 Mbps Bluetooth® low energy mode
  - 103 dBm sensitivity in 125 kbps Bluetooth® low energy mode (long range)
  - 20 to +8 dBm TX power, configurable in 4 dB steps

#### 4G LTE cellular characteristics for EG91-E

| Parameter | Value |
| --- | --- |
| Protocol stack | 3GPP Release 13 |
| RAT | LTE Cat 1 |
| LTE FDD Bands | Band 28A (700 MHz) |
| | Band 20 (800 MHz)  |
| | Band 8 (900 MHz)  |
| | Band 3 (1800 MHz)  |
| | Band 1 (2100 MHz)  |
| | Band 7 (2600 MHz)  |
| WCDMA Bands | Band 8 (900 MHz) | 
| | Band 1 (2100) |
| GSM Bands | EGSM900 (900 MHz) |
| | DCS1800 (1800 MHz) |
| Power class | Class 4 (33dBm ± 2dB) for EGSM900 |
| | Class 1 (30dBm ± 2dB) for DCS1800 |
| | Class E2 (27dBm ± 3dB) for EGSM900 8-PSK |
| | Class E2 (26dBm ± 3dB) for DCS1800 8-PSK |
| | Class 3 (24dBm ± 3dB) for WCDMA bands |
| | Class 3 (23dBm ± 2dB) for LTE FDD bands |

#### 4G LTE cellular characteristics for BG96-NA

**TODO: This section**


### I/O Characteristics 

These specifications are based on the nRF52840 datasheet.


| Symbol | Parameter | Min | Typ | Max | Unit |
| :---------|:-------|:---:|:---:|:---:|:---: |
| VIH | Input high voltage | 0.7 xVDD |  | VDD | V |
| VIL | Input low voltage | VSS |  | 0.3 xVDD | V | 
| VOH,SD | Output high voltage, standard drive, 0.5 mA, VDD ≥1.7 | VDD - 0.4 |  | VDD | V | 
| VOH,HDH | Output high voltage, high drive, 5 mA, VDD >= 2.7 V | VDD - 0.4 |  | VDD | V | 
| VOH,HDL | Output high voltage, high drive, 3 mA, VDD >= 1.7 V  | VDD - 0.4 |  | VDD | V | 
| VOL,SD | Output low voltage, standard drive, 0.5 mA, VDD ≥1.7 | VSS |  | VSS + 0.4 | V | 
| VOL,HDH | Output low voltage, high drive, 5 mA, VDD >= 2.7 V | VSS |  | VSS + 0.4 | V | 
| VOL,HDL | Output low voltage, high drive,3 mA, VDD >= 1.7 V | VSS  |  | VSS + 0.4 | V |  
| IOL,SD | Current at VSS+0.4 V, output set low, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOL,HDH | Current at VSS+0.4 V, output set low, high drive, VDD >= 2.7V | 6 | 10 | 15 | mA | 
| IOL,HDL | Current at VSS+0.4 V, output set low, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| IOH,SD | Current at VDD-0.4 V, output set high, standard drive, VDD≥1.7 | 1 | 2 | 4 | mA | 
| IOH,HDH | Current at VDD-0.4 V, output set high, high drive, VDD >= 2.7V | 6 | 9 | 14 | mA | 
| IOH,HDL | Current at VDD-0.4 V, output set high, high drive, VDD >= 1.7V | 3 |  |  | mA | 
| tRF,15pF | Rise/fall time, standard drivemode, 10-90%, 15 pF load<sup>1</sup> |  | 9 |  | ns | 
| tRF,25pF | Rise/fall time, standard drive mode, 10-90%, 25 pF load<sup>1</sup> |  | 13 |  | ns |  
| tRF,50pF | Rise/fall time, standard drive mode, 10-90%, 50 pF load<sup>1</sup> |  | 25 |  | ns | 
| tHRF,15pF | Rise/Fall time, high drive mode, 10-90%, 15 pF load<sup>1</sup> |  | 4  | | ns | 
| tHRF,25pF | Rise/Fall time, high drive mode, 10-90%, 25 pF load<sup>1</sup> |  | 5 |  | ns | 
| tHRF,50pF | Rise/Fall time, high drive mode, 10-90%, 50 pF load<sup>1</sup> |  | 8 |  | ns | 
| RPU | Pull-up resistance | 11 | 13 | 16 | kΩ | 
| RPD | Pull-down resistance | 11 | 13 | 16 | kΩ | 
| CPAD | Pad capacitance |  | 3 |  | pF | 
| CPAD_NFC | Pad capacitance on NFC pads  |  | 4 |  | pF | 
| INFC_LEAK | Leakage current between NFC pads when driven to different states |  | 1 | 10 | μA |  


<sup>1</sup>Rise and fall times based on simulations

## Mechanical specifications

### Dimensions and Weight

| Parameters | Value | Unit |
| --- | --- | --- |
| Width | 30 | mm |
| Height | 42 | mm | 
| Thickness | 5.5 | mm | 
| Weight | 6.2 | grams |

### Mechanical drawing

**TODO: Mechanical drawing**

Dimensions are in millimeters.

---

### Mating connector and land pattern

The mating connector is a an M.2 (NGFF) type 4. Note that there are several different key configurations for the M.2, and type 4 is different than is commonly used on SSDs.

One compatible connector is the [TE 2199230-4](https://www.te.com/usa-en/product-2199230-4.html). It is widely available including at suppliers such as [DigiKey](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916).

![Connector](/assets/images/b-series/b-series-connector.png)


## Product Handling

### ESD Precautions
The Asset Tracker SoM contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an module without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the B series is mounted. Failure to observe these precautions can result in severe damage to the module!

### Connectors

The U.FL antenna connectors are not designed to be constantly plugged and unplugged. The antenna pin is static sensitive and you can destroy the radio with improper handling. A tiny dab of glue (epoxy, rubber cement, liquid tape or hot glue) on the connector can be used securely hold the plug in place.


## Schematics

**TODO: Schematics**

## Default settings

The AssetTracker SoM comes pre-programmed with a bootloader and a user application called Tinker. This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure. All of these methods have multiple tools associated with them as well.



## Revision history

| Revision | Date | Author | Comments |
|:---------|:-----|:-------|:---------|
| pre      | 31 Mar 2020 | RK | Preview Release |
