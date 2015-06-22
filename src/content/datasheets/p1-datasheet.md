---
title: P1 datasheet
template: docs.hbs
columns: two
---

P1 Datasheet <sup>(v003)</sup>
===

<div align=center><img src="/assets/images/p1-vector.png" width=200></div>

```c++
void setup() {
    Spark.publish("my-event","The internet just got smarter!");
}
```

# 1. Functional description

### 1.1 Overview

The P1 is Particle's tiny Wi-Fi module that contains both the Broadcom Wi-Fi chip and a reprogrammable STM32 32-bit ARM Cortex-M3 microcontroller. The P1 comes preloaded with Particle firmware libraries, just like our dev kits, and it's designed to simplify your transition from prototype to production. The P1 is the PØ's big brother; it's a bit bigger and a tad more expensive, but it includes some extra flash and an antenna and u.FL connector on board.  Every P1 includes free cloud service.

### 1.2 Features

- Particle P1 Wi-Fi module
	- Broadcom BCM43362 Wi-Fi chip
	- 802.11b/g/n Wi-Fi
    - STM32F205 120Mhz ARM Cortex M3
	- 1MB flash, 128KB RAM
	- 1MB external SPI flash
	- Integrated PCB antenna
	- Integrated u.FL connector for external antenna
	- Integrated RF switch
	- RF avg. output power (max)
	  - b / g / n, 16.5dBm / 15.0dBm / 14.5dBm (+/-1.5dBm)
- 25 Mixed-signal GPIO and advanced peripherals
- Open source design
- Real-time operating system (FreeRTOS)
- Soft AP setup
- FCC, CE and IC certified

# 2. Interfaces

### 2.1 Block Diagram

<div align=center><img src="/assets/images/p1-block-diagram.png" width=600></div>

### 2.2 Power

Power to the P1 is supplied via 3 different inputs: VBAT_WL (pin 2 & 3), VDDIO_3V3_WL (pin 5), VDD_3V3 (pin 26 & 27).  Optionally +3.3V may be supplied to VBAT_MICRO (pin 38) for data retention in low power sleep modes. Each of these inputs also requires a 0.1uF and 10uF ceramic decoupling capacitor, located as close as possible to the pin (see Fig 1). The voltage should be regulated between 3.0VDC and 3.6VDC.

Typical current consumption is 80mA with a 3.3V input.  Deep sleep quiescent current is 160uA.  When powering the P1 make sure the power supply can handle 600mA continuous. If a lesser power supply is provided, peak currents drawn from the P1 when transmitting and receiving will result in voltage sag at the input which may cause a system brown out or intermittent operation.  Likewise, the power source should be sufficient enough to source 1A of current to be on the safe side.

<div align=center><img src="/assets/images/p1-power-pins.png" width="500">
<br><br><b>Fig. 1</b> Recommended power connections with decoupling capacitors.</div>

### 2.3 RF

The RF section of the P1 includes an on-board PCB trace antenna and a u.FL connector which allows the user to connect an external antenna.  These two antenna outputs are selectable via a user API, made possible by an integrated RF switch.

The default selected antenna will be the PCB antenna.

The area surrounding the PCB antenna on the carrier PCB should be free of ground planes and signal traces for maximum Wi-Fi performance.

### 2.4 Peripherals and GPIO

The P1 module has ton of capability in a super small footprint, with analog, digital and communication interfaces.

**Note:** P1 pin names will be preserved as they are named in the USI datasheet, however for the scope of this datasheet we will also refer to them as their Photon and code equivalents, i.e. D7 instead of MICRO_JTAG_TMS and A2 instead of MICRO_GPIO_13.  This will help to simplify descriptions, while providing a quick reference for code that can be written for the P1 such as `int value = analogRead(A2);`

| Peripheral Type | Qty | Input(I) / Output(O) | FT<sup>[1]</sup> / 3V3<sup>[2]</sup> |
| :-:|:-:|:-:|:-: |
| Digital | 18 | I/O | FT/3V3 |
| Analog (ADC) | 8 | I | 3V3 |
| Analog (DAC) | 2 | O | 3V3 |
| SPI | 2 | I/O | 3V3 |
| I2S | 1 | I/O | 3V3 |
| I2C | 1 | I/O | FT |
| CAN | 1 | I/O | FT |
| USB | 1 | I/O | 3V3 |
| PWM | 9<sup>3</sup> | O | 3V3 |
| Spare<sup>[4]</sup> | 6 | I/O | FT/3V3 |

**Notes:**

<sup>[1]</sup> FT = 5.0V tolerant pins.  All pins except A3 and DAC are 5V tolerant (when not in analog mode). If used as a 5V input the pull-up/pull-down resistor must be disabled.  

<sup>[2]</sup> 3V3 = 3.3V max pins.

<sup>[3]</sup> PWM is available on D0, D1, D2, D3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 7 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

<sup>[4]</sup> There are 6 extra pins that have digital I/O capability.  There are other peripherals that are available on these pins as well, which will be implemented in firmware and documented in a future version of this document.

### 2.5 JTAG

Pin D3 through D7 are JTAG interface pins.  These can be used to reprogram your P1 bootloader or user firmware image with standard JTAG tools such as the ST-Link v2, J-Link, R-Link, OLIMEX ARM-USB-TINI-H, and also the FTDI-based Particle JTAG Programmer.

| Photon Pin | Description | STM32 Pin | P1 Pin # | P1 Pin Name | Default Internal<sup>[1]</sup> |
| :-:|:-:|:-:|:-:|:-:|:- |
| D7 | JTAG_TMS | PA13 | 54 | MICRO_JTAG_TMS | ~40k pull-up |
| D6 | JTAG_TCK | PA14 | 55 | MICRO_JTAG_TCK | ~40k pull-down |
| D5 | JTAG_TDI | PA15 | 53 | MICRO_JTAG_TDI | ~40k pull-up |
| D4 | JTAG_TDO | PB3 | 52 | MICRO_JTAG_TDO | Floating |
| D3 | JTAG_TRST | PB4 | 51 | MICRO_JTAG_TRSTN | ~40k pull-up |
| 3V3 | Power | | | | |
| GND | Ground | | | | |
| RST | Reset | | | | |

**Notes:**
<sup>[1]</sup> Default state after reset for a short period of time before these pins are restored to GPIO (if JTAG debugging is not required, i.e. `USE_SWD_JTAG=y` is not specified on the command line.

A standard 20-pin 0.1" shrouded male JTAG interface connector should be wired as follows:

<div align=center><img src="/assets/images/photon-jtag.png" width=700></div>

### 2.6 External Coexistence Interface

The P1 supports coexistence with Bluetooth and other external radios via the three gold pads on the top side of the PCB near pin A3.  These pads are 0.035" square, spaced 0.049" apart.  This spacing supports the possibility of tacking on a small 1.25mm - 1.27mm pitch 3-pin male header to make it somewhat easier to interface with.

When two radios occupying the same frequency band are used in the same system, such as Wi-Fi and Bluetooth, a coexistence interface can be used to coordinate transmit activity, to ensure optimal performance by arbitrating conflicts between the two radios.

| P1 Pin Name | P1 Pin # | I/O | Description |
|:-|:-:|:-:|:-|
| BTCX_RF_ACTIVE | 9 | I | Coexistence signal: Bluetooth is active |
| BTCX_STATUS | 10 | I | Coexistence signal: Bluetooth priority status and TX/RX direction |
| BTCX_TXCONF | 11 | O | Output giving Bluetooth permission to TX |
￼
When these pads are programmed to be used as a Bluetooth coexistence interface, they're set as high impedance on power up and reset. Alternatively, they can be individually programmed to be used as GPIOs through software control. They can also be programmed to have an internal pull-up or pull-down resistor.

# 3. Pin and button definition

### 3.1 Pin markings

<div align=center><img src="/assets/images/p1-pin-numbers.png" width=600></div>

### 3.2 Pin description

| Pin | Description |
|-----|-------------|
| RST | Active-low reset input. On-board circuitry contains a 1k ohm pull-up resistor between RST and 3V3, and 0.1uF capacitor between RST and GND. |
| VBAT | Supply to the internal RTC, backup registers and SRAM when 3V3 not present (1.65 to 3.6VDC). |
| 3V3  | This pin represents the regulated +3.3V DC power to the P1 module.  In reality, +3.3V must be supplied to 3 different inputs: VBAT_WL (pin 2 & 3), VDDIO_3V3_WL (pin 5), VDD_3V3 (pin 26 & 27). Optionally +3.3V may be supplied to VBAT_MICRO (pin 38) for data retention in low power sleep modes. Each of these inputs also requires a 0.1uF and 10uF ceramic decoupling capacitor, located as close as possible to the pin. |
| D0~D7 | Digital only GPIO pins. |
| A0~A7 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs. A6 and A7 are code convenience mappings, which means pins are not actually labeled as such but you may use code like `analogRead(A7)`.  A6 maps to DAC pin and A7 maps to the WKP pin. |
| DAC   | 12-bit Digital-to-Analog (D/A) output (0-4095), and also a digital GPIO. DAC is used as `DAC1` in software, and A5 is a second DAC output used as `DAC2` in software. |
| RX    | Primarily used as UART RX, but can also be used as a digital GPIO or PWM. |
| TX    | Primarily used as UART TX, but can also be used as a digital GPIO or PWM. |
| Spare 1-6    | Primarily used as GPIO. There are other peripherals that are available on these pins as well, which will be implemented in firmware and documented in a future version of this document. |

### 3.3 Pin out diagrams

<div align=left><img src="/assets/images/p1-pinout1.png"</div>

<div align=left><img src="/assets/images/p1-pinout2.png"</div>

<div align=left><img src="/assets/images/p1-pinout3.png"</div>

### 3.4 Complete P1 Module Pin Listing

| P1 Pin # | P1 Pin Name	| Type / STM32 Port | Description |
| :-|:-|:-:|:-|
| 1	| GND	|	PWR	|	Ground |
| 2~3 |	VBAT_WL	|	PWR	|	+3.3V |
| 4	| GND	|	PWR	|	Ground |
| 5	| VDDIO_3V3_WL	|	PWR	|	+3.3V |
| 6	| GND	|	PWR	|	Ground |
| 7	| WL_REG_ON	|	PWR	|	BCM43362 Debugging Pin |
| 8~12	|	NC	|	NC	|	NC |
| 13	|	GND	|	PWR	|	Ground |
| 14	|	NC	|	NC	|	NC |
| 15	|	GND	|	PWR	|	Ground |
| 16	|	WL_JTAG_TDI	|	DEBUG	|	BCM43362 Debugging Pin |
| 17	|	WL_JTAG_TCK	|	DEBUG	|	BCM43362 Debugging Pin |
| 18	|	WL_JTAG_TRSTN	|	DEBUG	|	BCM43362 Debugging Pin |
| 19	|	WL_JTAG_TMS	|	DEBUG	|	BCM43362 Debugging Pin |
| 20	|	WL_JTAG_TDO	|	DEBUG	|	BCM43362 Debugging Pin |
| 21	|	MICRO_SPI1_MISO	|	PA6	|	A4, SPI MISO |
| 22	|	MICRO_SPI1_SCK	|	PA5	|	A3, SPI SCK |
| 23	|	MICRO_SPI1_MOSI	|	PA7	|	A5, SPI MOSI |
| 24	|	MICRO_SPI1_SS	|	PA4	|	DAC,  SPI SS |
| 25	|	GND	|	PWR	|	Ground |
| 26~27	|	VDD_3V3	|	PWR	|	+3.3V |
| 28	|	GND	|	PWR	|	Ground |
| 29	|	MICRO_UART2_RTS	|	PA1	|	RGB_LED_RED |
| 30	|	MICRO_UART2_CTS	|	PA0	|	WKP |
| 31	|	MICRO_UART2_RXD	|	PA3	|	RGB_LED_BLUE |
| 32	|	MICRO_UART2_TXD	|	PA2	|	RGB_LED_GREEN |
| 33	|	TESTMODE	|	PA8	| GPIO (see STM32F205 datasheet) |
| 34	|	MICRO_RST_N	|	I	|	/RESET, Active low MCU reset |
| 35	|	MICRO_I2C1_SCL	|	PB6	|	D1, I2C SCL |
| 36	|	MICRO_I2C1_SDA	|	PB7	|	D0, I2C SDA |
| 37	|	GND	|	PWR	|	Ground |
| 38	|	VBAT_MICRO	|	PWR	|	Supply to the internal RTC, backup registers and SRAM when 3V3 not present (1.65 to 3.6VDC) |
| 39	|	GND	|	PWR	|	Ground |
| 40	|	MICRO_GPIO_1	|	PB0	|	SPARE1 |
| 41	|	MICRO_GPIO_2	|	PB1	|	SPARE2 |
| 42	|	MICRO_GPIO_3	|	PC0	|	SPARE3 |
| 43	|	MICRO_GPIO_5	|	PC3	|	A1 |
| 44	|	MICRO_GPIO_6	|	PC4	|	SPARE4 |
| 45	|	MICRO_GPIO_7	|	PB5	|	D2, I2S SD |
| 46	|	MICRO_GPIO_8	|	PC7	|	/SETUP, I2S MCK |
| 47	|	MICRO_GPIO_9	|	PC13	|	SPARE5 |
| 48	|	MICRO_GPIO_12	|	PC1	|	SPARE6 |
| 49	|	MICRO_GPIO_13	|	PC2	|	A2 |
| 50	|	MICRO_GPIO_14	|	PC5	|	A0 |
| 51	|	MICRO_JTAG_TRSTN	|	PB4	|	D3 |
| 52	|	MICRO_JTAG_TDO	|	PB3	|	D4, I2S SCK |
| 53	|	MICRO_JTAG_TDI	|	PA15	|	D5, I2S WS |
| 54	|	MICRO_JTAG_TMS	|	PA13	|	D7 |
| 55	|	MICRO_JTAG_TCK	|	PA14	|	D6 |
| 56	|	BTCX_STATUS	|	I	|	Coexistence signal: Bluetooth status and TX/RX direction |
| 57	|	BTCX_RF_ACTIVE	|	I	|	Coexistence signal: Bluetooth is active |
| 58	|	BTCX_TXCONF	|	O	|	Output giving Bluetooth permission to TX |
| 59	|	GND	|	PWR	|	Ground |
| 60	|	WL_SLEEP_CLK	|	DEBUG	|	BCM43362 Debugging Pin |
| 61	|	MICRO_UART1_RTS	|	PA12	|	OTG_FS_DP (USB D+) |
| 62	|	MICRO_UART1_CTS	|	PA11	|	OTG_FS_DM (USB D--) |
| 63	|	MICRO_UART1_RXD	|	PA10	|	RX |
| 64	|	MICRO_UART1_TXD	|	PA9	|	TX |
| 65~73	|	GND	|	PWR	|	Ground |
| 74	|	PAD1	|	NC	|	NC |
| 75	|	PAD2	|	NC	|	NC |

# 4. Technical specification

### 4.1 Absolute maximum ratings <i class="icon-attention"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:-|:-|:-:|:-:|:-:|:-:|
| Supply Input Voltage | V<sub>3V3-MAX</sub> |  |  | +3.6 | V |
| Storage Temperature | T<sub>stg</sub> | -40 |  | +85 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 2 | kV |

### 4.2 Recommended operating conditions <i class="icon-check"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:-|:-|:-:|:-:|:-:|:-:|
| Supply Input Voltage | V<sub>3V3</sub><sup>[1]</sup> | +3.0 | +3.3 | +3.6 | V |
| Supply Input Current (VBAT_WL) | I<sub>VBAT_WL</sub> |  |  | 310 | mA |
| Supply Input Current (VDDIO_3V3_WL) | I<sub>VDDIO_3V3_WL</sub> |  |  | 50 | mA |
| Supply Input Current (VDD_3V3) | I<sub>VDD_3V3</sub> |  |  | 120 | mA |
| Supply Input Voltage | V<sub>VBAT_MICRO</sub> | +1.65 |  | +3.6 | V |
| Supply Input Current (VBAT_MICRO) | I<sub>VBAT_MICRO</sub> |  |  | 19 | uA |
| Operating Current (Wi-Fi on) | I<sub>3V3 avg</sub><sup>[1]</sup> |  | 80 | 100 | mA |
| Operating Current (Wi-Fi on) | I<sub>3V3 pk</sub><sup>[1]</sup> | 235<sup>[2]</sup> |  | 430<sup>[2]</sup> | mA |
| Operating Current (Wi-Fi on, w/powersave) | I<sub>3V3 avg</sub><sup>[1]</sup> |  | 18 | 100<sup>[3]</sup> | mA |
| Operating Current (Wi-Fi off) | I<sub>3V3 avg</sub><sup>[1]</sup> |  | 30 | 40 | mA |
| Sleep Current (5V @ VIN) | I<sub>Qs</sub> |  | 1 | 2 | mA |
| Deep Sleep Current (5V @ VIN) | I<sub>Qds</sub> |  | 80 | 100 | uA |
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>[1]</sup> V<sub>3V3</sub> and I<sub>3V3</sub> represents the the combined 4 inputs that require +3.3V: VBAT_WL, VDDIO_3V3_WL, VDD_3V3 and VBAT_MICRO.

<sup>[2]</sup> These numbers represent the extreme range of short peak current bursts when transmitting and receiving in 802.11b/g/n modes at different power levels.  Average TX current consumption in will be 80-100mA.

<sup>[3]</sup> These are very short average current bursts when transmitting and receiving.  On average if minimizing frequency of TX/RX events, current consumption in powersave mode will be 18mA

### 4.3 Wi-Fi Specifications <i class="icon-signal"></i>

| Feature | Description| |
| :-|:-|:-: |
| WLAN Standards | IEEE 802 11b/g/n |
| Antenna Port | Single Antenna |
| Frequency Band | 2.400 GHz – 2.484 GHz |
| Sub Channels | 1 ~ 14 |
| Modulation | DSSS, CCK, OFDM, BPSK, QPSK,16QAM, 64QAM |


| P1 module Wi-Fi output power | | Typ. | Tol. | Unit |
| :-|:-|:-:|:-:|:-: |
| RF Average Output Power, 802.11b CCK Mode | 1M | 16.5 | +/- 1.5 | dBm |
| <sub></sub> | 11M | 16.5 | +/- 1.5 | dBm |
| RF Average Output Power, 802.11g OFDM Mode | 6M | 15 | +/- 1.5 | dBm |
| <sub></sub> | 54M | 13 | +/- 1.5 | dBm |
| RF Average Output Power, 802.11n OFDM Mode | MCS0 | 14.5 | +/- 1.5 | dBm |
| <sub></sub> | MCS7 | 12 | +/- 1.5 | dBm |


### 4.4 I/O Characteristics

These specifications are based on the STM32F205RG datasheet, with reference to Photon pin nomenclature.

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :-|:-|:-:|:-:|:-:|:-:|:-: |
| Standard I/O input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.28*(V<sub>3V3</sub>-2)+0.8 | V |
| I/O FT<sup>[1]</sup> input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.32*(V<sub>3V3</sub>-2)+0.75 | V |
| Standard I/O input high level voltage | V<sub>IH</sub> | | 0.41*(V<sub>3V3</sub>-2)+1.3 | | V<sub>3V3</sub>+0.3 | V |
| I/O FT<sup>[1]</sup> input high level voltage | V<sub>IH</sub> | V<sub>3V3</sub> > 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.5 | V |
| <sup></sup> | V<sub>IH</sub> | V<sub>3V3</sub> ≤ 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.2 | V |
| Standard I/O Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 200 | | | mV |
| I/O FT Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 5% V<sub>3V3</sub><sup>[3]</sup> | | | mV |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | GND ≤ V<sub>io</sub> ≤ V<sub>3V3</sub> GPIOs | | | ±1 | µA |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | R<sub>PU</sub> | V<sub>io</sub> = 5V, I/O FT | | 3 | µA |
| Weak pull-up equivalent resistor<sup>[5]</sup> | R<sub>PU</sub>| V<sub>io</sub> = GND | 30 | 40 | 50 | kΩ |
| Weak pull-down equivalent resistor<sup>[5]</sup> | R<sub>PD</sub>| V<sub>io</sub> = V<sub>3V3</sub> | 30 | 40 | 50 | kΩ |
| I/O pin capacitance | C<sub>IO</sub> | | | 5 | | pF |

**Notes:**

<sub>[1]</sub> FT = Five-volt tolerant. In order to sustain a voltage higher than V<sub>3V3</sub>+0.3 the internal pull-up/pull-down resistors must be disabled.

<sub>[2]</sub> Hysteresis voltage between Schmitt trigger switching levels.  Based on characterization, not tested in production.

<sub>[3]</sub> With a minimum of 100mV.

<sub>[4]</sub> Leakage could be higher than max. if negative current is injected on adjacent pins.

<sub>[5]</sub> Pull-up and pull-down resistors are designed with a true resistance in series with switchable PMOS/NMOS. This PMOS/NMOS contribution to the series resistance is minimum (~10% order).

# 5. Mechanical specifications

### 5.1 Overall dimensions

P1 module dimensions are: 0.787"(28mm) (W) x 1.102"(20mm) (L) x 0.0787"(2.0mm) (H) +/-0.0039"(0.1mm) (includes metal shielding)

<div align=center><img src="/assets/images/p1-overall_dimensions.png" width=300></div>

<div align=center><img src="/assets/images/p1-vector.png" width=80>
Actual size (so tiny!)</div>

### 5.2 P1 Module Dimensions

These are the physical dimensions of the P1 module itself, including all pins:

<div align=center><img src="/assets/images/p1-module-dimensions.png" width=600></div>

### 5.3 P1 Module Recommended pcb land pattern

The P1 can be mounted directly on a carrier PCB with following PCB land pattern:

<div align=center><img src="/assets/images/p1-land-pattern.png" width=600px></div>

# 6. P1 Reference Design Schematic

### 6.1 Schematic - USB

<div align=center><img src="/assets/images/p1-sch-usb.png" width=400></div>

### 6.2 Schematic - Power

<div align=center><img src="/assets/images/p1-sch-power.png" width=600></div>

### 6.3 Schematic - User I/O

<div align=center><img src="/assets/images/p1-sch-user-io.png" width=600></div>

### 6.4 Schematic - P1 Wi-Fi Module

<div align=center><img src="/assets/images/p1-sch-wifi-module.png" height=500></div>

# 7. P1 Reference Design Layout

### 7.1 P1 Reference Design Top Layer (GTL)

To be added.

### 7.2 P1 Reference Design Bottom Layer (GBL)

To be added.

# 8. Recommended solder reflow profile

<div align=left><img src="/assets/images/photon-reflow-profile.png" width=600></div>

| Phase | Temperatures and Rates |
| -:|:- |
| A-B. | Ambient~150°C, Heating rate: < 3°C/s |
| B-C. | 150~200°C, soak time: 60~120 s |
| C-D. | 200~245°C, Heating rate: < 3°C/s |
| D.   | Peak temp.: 235~245°C, Time above 220°C: 40~90 s |
| D-E. | 245~220°C, Cooling rate: < 1°C/s |

#9. Ordering information

P1 modules are available from [store.particle.io](https://store.particle.io/) as cut tape in quantities of 10 each.

#10. Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: COFWMNBM11
-	IC: 10293A-WMNBM11

# 11. Product handling

### 11.1 Tape and Reel Info

<div align=center><img src="/assets/images/p1-tape-and-reel.png" width=500></div>

### 11.2 Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### 11.3 ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

# 12. Default settings

The P1 module comes preprogrammed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the online Web IDE [Particle Build](https://www.particle.io/build) to code, compile and flash a user application OTA (Over The Air).  [Particle Dev](https://www.particle.io/dev) is a local tool that uses the Cloud to compile and flash OTA as well.  There is also a package `Spark DFU-UTIL` for Particle Dev that allows for Cloud compiling and local flashing via DFU over USB.  This requires `dfu-util` to be installed on your system.  'dfu-util' can also be used with [Particle CLI](https://github.com/spark/particle-cli) for Cloud compiling and local flashing via the command line.  Finally the lowest level of development is available via the [GNU GCC toolchain for ARM](https://github.com/spark/firmware), which offers local compile and flash via dfu-util.  This gives the user complete control of all source code and flashing methods.  This is an extensive list, however not exhaustive.

# 13. Glossary

<div class="dictionary-wrapper">
<dd>Radio Frequency</dd>
<dt>SMT</dt>
<dd>Surface Mount Technology (often associated with SMD which is a surface mount device).</dd>
<dt>AP</dt>
<dd>Access Point</dd>
<dt>USB</dt>
<dd>Universal Serial Bus</dd>
<dt>Quiescent current</dt>
<dd>Current consumed in the deepest sleep state</dd>
<dt>FT</dt>
<dd>Five-tolerant; Refers to a pin being tolerant to 5V.</dd>
<dt>3V3</dt>
<dd>+3.3V; The regulated +3.3V supply rail.  Also used to note a pin is only 3.3V tolerant.</dd>
<dt>RTC</dt>
<dd>Real Time Clock</dd>
<dt>OTA</dt>
<dd>Over The Air; describing how firmware is transferred to the device.</dd>
</div>


#14. Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| v001 | 4-May-2015 | BW | Initial release |
| v002 | 31-May-2015 | BW | Update assets |
| v003 | 1-June-2015 | BW | Updated VBAT_MICRO info |


#15. Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

<mailto:hello@particle.io>
