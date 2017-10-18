---
title: P1 datasheet
layout: datasheet.hbs
columns: two
order: 5
---

# P1 Datasheet <sup>(v009)</sup>

<div align=center><img src="/assets/images/p1-vector.png" width=200></div>

```c++
void setup() {
    Particle.publish("my-event","The internet just got smarter!");
}
```

<!-- --✂-- cut: part above doesn't go to PDF -->

## Functional description

### Overview

The P1 is Particle's tiny Wi-Fi module that contains both the Broadcom Wi-Fi chip and a reprogrammable STM32F205RGY6 32-bit ARM Cortex-M3 microcontroller. The P1 comes preloaded with Particle firmware libraries, just like our dev kits, and it's designed to simplify your transition from prototype to production. The P1 is the PØ's big brother; it's a bit bigger and a tad more expensive, but it includes some extra flash and an antenna and u.FL connector on board.  Particle provides free access to Particle Cloud for prototyping. Paid tiers of Particle Cloud start when you create a product with more than 25 devices.

### Features

- Particle P1 Wi-Fi module
	- Broadcom BCM43362 Wi-Fi chip
	- 802.11b/g/n Wi-Fi
    - STM32F205RGY6 120Mhz ARM Cortex M3
	- 1MB flash, 128KB RAM
	- 1MB external SPI flash (MX25L8006E)
	- Integrated PCB antenna
	- Integrated u.FL connector for external antenna
	- Integrated RF switch
- 25 Mixed-signal GPIO and advanced peripherals
- Open source design
- Real-time operating system (FreeRTOS)
- Soft AP setup
- FCC, CE and IC certified

## Interfaces

### Block Diagram

<div align=center><img src="/assets/images/p1-block-diagram.png" width=700></div>

### Power

Power to the P1 is supplied via 3 different inputs: VBAT_WL (pin 2 & 3), VDDIO_3V3_WL (pin 5), VDD_3V3 (pin 26 & 27).  Optionally +3.3V may be supplied to VBAT_MICRO (pin 38) for data retention in low power sleep modes. Each of these inputs also requires a 0.1uF and 10uF ceramic decoupling capacitor, located as close as possible to the pin (see Fig 1). The voltage should be regulated between 3.0VDC and 3.6VDC. (Please refer to [Absolute Maximum Ratings](#absolute-maximum-ratings) for more info).

Typical average current consumption is 80mA with 5V @ input of the recommended SMPS power supply with Wi-Fi on. Deep sleep quiescent current is typically 80uA (Please refer to [Recommended Operating Conditions](#recommended-operating-conditions) for more info).  When powering the P1 make sure the power supply can handle 600mA continuous. If a lesser power supply is provided, peak currents drawn from the P1 when transmitting and receiving will result in voltage sag at the input which may cause a system brown out or intermittent operation.

**Warning:** When powering the P1 from long wires, care should be taken to protect against damaging voltage transients if using the same regulator as is used on the Photon. **From the Richtek datasheet:**

<p class = "boxed">
When a ceramic capacitor is used at the input and the power is supplied by a wall adapter through long wires, a load step at the output can induce ringing at the input, VIN. At best, this ringing can couple to the output and be mistaken as loop instability. At worst, a sudden inrush of current through the long wires can potentially cause a voltage spike at VIN large enough to damage the part.
</p>

To avoid these voltage spikes, keep input wiring as short as possible.  If long wires are unavoidable, it is advisable to add a 5.1V zener diode or similar transient suppression device from VIN to GND.  Another technique is adding more capacitance to the input using an electrolytic capacitor. Please refer to [AN-88 by Linear](http://cds.linear.com/docs/en/application-note/an88f.pdf) for a good discussion on this topic.

<div align=center><img src="/assets/images/p1-power-pins.png" width="500">
<br><br><b>Fig. 1</b> Recommended power connections with decoupling capacitors.</div>

### RF

The RF section of the P1 includes an on-board PCB trace antenna and a u.FL connector which allows the user to connect an external antenna.  These two antenna outputs are selectable via a user API, made possible by an integrated RF switch.

The default selected antenna will be the PCB antenna.

The area surrounding the PCB antenna on the carrier PCB should be free of ground planes and signal traces for maximum Wi-Fi performance.

---

### FCC Approved Antennas

| Antenna Type | Manufacturer | MFG. Part # | Gain |
|-|-|-|-|
| Dipole antenna | LumenRadio | 104-1001 | 2.15dBi |
| PCB Antenna | Included | - | - |

---

### Peripherals and GPIO

The P1 module has ton of capability in a super small footprint, with analog, digital and communication interfaces.

**Note:** P1 pin names will be preserved as they are named in the USI datasheet, however for the scope of this datasheet we will also refer to them as their Photon and code equivalents, i.e. D7 instead of MICRO_JTAG_TMS and A2 instead of MICRO_GPIO_13.  This will help to simplify descriptions, while providing a quick reference for code that can be written for the P1 such as `int value = analogRead(A2);`

| Peripheral Type | Qty | Input(I) / Output(O) | FT<sup>[1]</sup> / 3V3<sup>[2]</sup> |
| :-:|:-:|:-:|:-: |
| Digital | 24 | I/O | FT/3V3 |
| Analog (ADC) | 13 | I | 3V3 |
| Analog (DAC) | 2 | O | 3V3 |
| SPI | 2 | I/O | 3V3 |
| I2S | 1 | I/O | 3V3 |
| I2C | 1 | I/O | FT |
| CAN | 1 | I/O | 3V3<sup>[4]</sup> |
| USB | 1 | I/O | 3V3 |
| PWM | 12<sup>[3]</sup> | O | 3V3 |

**Notes:**

<sup>[1]</sup> FT = 5.0V tolerant pins.  All pins except A3 and DAC are 5V tolerant (when not in analog mode). If used as a 5V input the pull-up/pull-down resistor must be disabled.

<sup>[2]</sup> 3V3 = 3.3V max pins.

<sup>[3]</sup> PWM is available on D0, D1, D2, D3, A4, A5, WKP, RX, TX, P1S0, P1S1, P1S6 with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 10 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time. P1S6 requires System Feature Wi-Fi Powersave Clock to be disabled.  See System Features in Firmware Reference.

<sup>[4]</sup> Technically these pins are 5.0V tolerant, but since you wouldn't operate them with a 5.0V transceiver it's proper to classify them as 3.3V.

### RGB LED, SETUP and RESET button

When using the P1 module, it is very important to remember that your device must have an RGB LED to show the user the connectivity status.  Also required is a SETUP and RESET button to enter various [Device Modes](/guide/getting-started/modes). By default the RGB LED outputs are configured for a Common Anode type of LED. These components should be wired according to the [P1 Reference Design - User I/O](#schematic-user-i-o).  RGB pins may be accessed in code as: RGBR, RGBG and RGBB.

### JTAG and SWD

Pin D3 through D7 are JTAG interface pins.  These can be used to reprogram your P1 bootloader or user firmware image with standard JTAG tools such as the ST-Link v2, J-Link, R-Link, OLIMEX ARM-USB-TINI-H, and also the FTDI-based Particle JTAG Programmer. If you are short on available pins, you may also use SWD mode which requires less connections.

| Photon Pin | JTAG | SWD | STM32F205RGY6 Pin | P1 Pin # | P1 Pin Name | Default Internal<sup>[1]</sup> |
| :-:|:-:|:-:|:-:|:-:|:-:|:- |
| D7 | JTAG_TMS | SWD/SWDIO | PA13 | 54 | MICRO_JTAG_TMS | ~40k pull-up |
| D6 | JTAG_TCK | CLK/SWCLK | PA14 | 55 | MICRO_JTAG_TCK | ~40k pull-down |
| D5 | JTAG_TDI | | PA15 | 53 | MICRO_JTAG_TDI | ~40k pull-up |
| D4 | JTAG_TDO | | PB3 | 52 | MICRO_JTAG_TDO | Floating |
| D3 | JTAG_TRST | | PB4 | 51 | MICRO_JTAG_TRSTN | ~40k pull-up |
| 3V3 | Power | Power | | | | |
| GND | Ground | Ground | | | | |
| RST | Reset | Reset | | | | |

**Notes:**
<sup>[1]</sup> Default state after reset for a short period of time before these pins are restored to GPIO (if JTAG debugging is not required, i.e. `USE_SWD_JTAG=y` is not specified on the command line.)

A standard 20-pin 0.1" shrouded male JTAG interface connector should be wired as follows:

<div align=center><a href="/assets/images/p1-jtag.png"><img src="/assets/images/p1-jtag.png" height=500>(click to stop squinting)</a></div>

### External Coexistence Interface

The P1 supports coexistence with Bluetooth and other external radios via three pins available on the P1 module.

When two radios occupying the same frequency band are used in the same system, such as Wi-Fi and Bluetooth, a coexistence interface can be used to coordinate transmit activity, to ensure optimal performance by arbitrating conflicts between the two radios.

| P1 Pin Name | P1 Pin # | I/O | Description |
|:-|:-:|:-:|:-|
| BTCX_RF_ACTIVE | 57 | I | Coexistence signal: Bluetooth is active |
| BTCX_STATUS | 56 | I | Coexistence signal: Bluetooth priority status and TX/RX direction |
| BTCX_TXCONF | 58 | O | Output giving Bluetooth permission to TX |
￼
When these pins are programmed to be used as a Bluetooth coexistence interface, they're set as high impedance on power up and reset.

---

## Memory Map

### STM32F205RGY6 Flash Layout Overview

- Bootloader (16 KB)
- DCT1 (16 KB), stores Wi-Fi credentials, keys, mfg info, system flags, etc..
- DCT2 (16 KB), swap area for DCT1
- EEPROM emulation bank 1 (16 KB)
- EEPROM emulation bank 2 (64 KB)
- System firmware (512 KB) [256 KB Wi-Fi/comms + 256 KB hal/platform/services]
- Factory backup, OTA backup and user application (384 KB) [3 x 128 KB]

### DCT Layout

The DCT area of flash memory has been mapped to a separate DFU media device so that we can incrementally update the application data. This allows one item (say, server public key) to be updated without erasing the other items.

_DCT layout in `release/stable`_ <a href="https://github.com/spark/firmware/blob/release/stable/platform/MCU/STM32F2xx/SPARK_Firmware_Driver/inc/dct.h" target="_blank">found here in firmware.</a>

| Region | Offset | Size |
|:---|---|---|
| system flags | 0 | 32 |
| version | 32 | 2 |
| device private key | 34 | 1216 |
| device public key | 1250 | 384 |
| ip config | 1634 | 120 |
| feature flags | 1754 | 4 |
| country code | 1758 | 4 |
| claim code | 1762 | 63 |
| claimed | 1825 | 1 |
| ssid prefix | 1826 | 26 |
| device code | 1852 | 6 |
| version string | 1858 | 32 |
| dns resolve | 1890 | 128 |
| reserved1 | 2018 | 64 |
| server public key | 2082 | 768 |
| padding | 2850 | 2 |
| flash modules | 2852 | 100 |
| product store | 2952 | 24 |
| antenna selection | 2976 | 1 |
| cloud transport | 2977 | 1 |
| alt device public key | 2978 | 128 |
| alt device private key | 3106 | 192 |
| alt server public key | 3298 | 192 |
| alt server address | 3490 | 128 |
| device id | 3618 | 12 |
| radio flags | 3630 | 1 |
| mode button mirror | 3631 | 32 |
| led mirror | 3663 | 96 |
| led theme | 3759 | 64 |
| reserved2 | 3823 | 435 |

**Note:** Writing 0xFF to offset 34 (DEFAULT) or 3106 (ALTERNATE) will cause the device to re-generate a new private key on the next boot. Alternate keys are currently unsupported on the P1 but are used on the Electron as UDP/ECC keys.  You should not need to use this feature unless your keys are corrupted.

```
// Regenerate Default Keys
echo -e "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 34 -D fillbyte
// Regenerate Alternate Keys
echo -e "\xFF" > fillbyte && dfu-util -d 2b04:d00a -a 1 -s 3106 -D fillbyte
```

### Memory Map (Common)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Bootloader | 0x8000000 | 0x8004000 | 16 KB |
| DCT1 | 0x8004000 | 0x8008000 | 16 KB |
| DCT2 | 0x8008000 | 0x800C000 | 16 KB |
| EEPROM1 | 0x800C000 | 0x8010000 | 16 KB |
| EEPROM2 | 0x8010000 | 0x8020000 | 64 KB |

### Memory Map (Modular Firmware - default)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| System Part 1 | 0x8020000 | 0x8060000 | 256 KB |
| System Part 2 | 0x8060000 | 0x80A0000 | 256 KB |
| User Part | 0x80A0000 | 0x80C0000 | 128 KB |
| OTA Backup | 0x80C0000 | 0x80E0000 | 128 KB |
| Factory Backup | 0x80E0000 | 0x8100000 | 128 KB |

### Memory Map (Monolithic Firmware - optional)

| Region | Start Address | End Address | Size |
|:---|---|---|---|
| Firmware | 0x8020000 | 0x8080000 | 384 KB |
| Factory Reset | 0x8080000 | 0x80E0000 | 384 KB |
| Unused (factory reset modular) | 0x80E0000 | 0x8100000 | 128 KB |

---

## Pin and button definition

### Pin markings

<div align=center><img src="/assets/images/p1-pin-numbers.png" width=600></div>

### Pin description

| Pin | Description |
|-----|-------------|
| RST | Active-low reset input. On-board circuitry contains a 1k ohm pull-up resistor between RST and 3V3, and 0.1uF capacitor between RST and GND. |
| VBAT | Supply to the internal RTC, backup registers and SRAM when 3V3 not present (1.65 to 3.6VDC). |
| 3V3  | This pin represents the regulated +3.3V DC power to the P1 module.  In reality, +3.3V must be supplied to 3 different inputs: VBAT_WL (pin 2 & 3), VDDIO_3V3_WL (pin 5), VDD_3V3 (pin 26 & 27). Optionally +3.3V may be supplied to VBAT_MICRO (pin 38) for data retention in low power sleep modes. Each of these inputs also requires a 0.1uF and 10uF ceramic decoupling capacitor, located as close as possible to the pin. |
| TX    | Primarily used as UART TX, but can also be used as a digital GPIO or PWM<sup>[1]</sup>. |
| RX    | Primarily used as UART RX, but can also be used as a digital GPIO or PWM<sup>[1]</sup>. |
| WKP | Active-high wakeup pin, wakes the module from sleep/standby modes. When not used as a WAKEUP, this pin can also be used as a digital GPIO, ADC input or PWM<sup>[1]</sup>. Can be referred to as `A7` when used as an ADC.|
| DAC   | 12-bit Digital-to-Analog (D/A) output (0-4095), referred to as `DAC` or `DAC1` in software. Can also be used as a digital GPIO or ADC. Can be referred to as `A6` when used as an ADC. A3 is a second DAC output used as `DAC2` in software. |
| A0~A7 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs. `A6` and `A7` are code convenience mappings, which means pins are not actually labeled as such but you may use code like `analogRead(A7)`.  `A6` maps to the DAC pin and `A7` maps to the WKP pin. A4,A5,A7 may also be used as a PWM<sup>[1]</sup> output. |
| D0~D7 | Digital only GPIO pins. D0~D3 may also be used as a PWM<sup>[1]</sup> output. |
| P1S0 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also can be used as a digital GPIO or PWM<sup>[1]</sup>. |
| P1S1 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also can be used as a digital GPIO or PWM<sup>[1]</sup>. |
| P1S2 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also can be used as a digital GPIO. |
| P1S3 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also can be used as a digital GPIO. |
| P1S4 | Primarily used as a digital GPIO. |
| P1S5 | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also can be used as a digital GPIO. |
| P1S6 | Can be used as a digital GPIO or PWM<sup>[1]</sup> output. Must disable Wi-Fi Powersave Clock first, see System Features in Firmware Reference. |

**Notes:**
<sup>[1]</sup> PWM is available on D0, D1, D2, D3, A4, A5, WKP, RX, TX, P1S0, P1S1, P1S6 with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 10 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time. P1S6 requires System Feature Wi-Fi Powersave Clock to be disabled.  See System Features in Firmware Reference.

### Pinout diagram

<div align=left><a href="/assets/images/p1-pinout.pdf" target="_blank"><img src="/assets/images/p1-pinout1.png"</div></a></div>

<div align=left><a href="/assets/images/p1-pinout.pdf" target="_blank"><img src="/assets/images/p1-pinout2.png"</div></a></div>

<div align=left><a href="/assets/images/p1-pinout.pdf" target="_blank"><img src="/assets/images/p1-pinout3.png"</div></a></div>

You can download a high resolution pinout diagram in a <a href="/assets/images/p1-pinout.pdf" target="_blank"><strong>PDF version here.</strong></a></div><br>

**Notes:**
<sup>[1]</sup> Connected to MCO1 by default, outputs 32kHz clock for WICED powersave mode. See System Features in the Firmware Reference to disable the Wi-Fi Powersave Clock and allow usage of this pin.

<sup>[2]</sup> MICRO_SPI1_SS is only for reference as a P1 module pin name.  It is technically speaking the STM32 pin PA4 which is the SS pin in an hardware SPI driven sense, however in the Particle API SPI SS is only user controlled as a GPIO. The hardware SS pin is not implemented.  The default SS pin for the Particle SPI API is A2 (STM32 pin PC2), but any GPIO can be used for this function with SPI.begin(pin).

### Complete P1 Module Pin Listing

| P1 Pin # | P1 Pin Name	| Type / STM32F205RGY6 Port | Description |
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
| 21	|	MICRO_SPI1_MISO	|	PA6	|	A4 (SPI MISO) |
| 22	|	MICRO_SPI1_SCK	|	PA5	|	A3 (SPI SCK) |
| 23	|	MICRO_SPI1_MOSI	|	PA7	|	A5 (SPI MOSI) |
| 24	|	MICRO_SPI1_SS	|	PA4	|	DAC |
| 25	|	GND	|	PWR	|	Ground |
| 26~27	|	VDD_3V3	|	PWR	|	+3.3V |
| 28	|	GND	|	PWR	|	Ground |
| 29	|	MICRO_UART2_RTS	|	PA1	|	RGBR (RGB LED RED) |
| 30	|	MICRO_UART2_CTS	|	PA0	|	WKP |
| 31	|	MICRO_UART2_RXD	|	PA3	|	RGBB (RGB LED BLUE) |
| 32	|	MICRO_UART2_TXD	|	PA2	|	RGBG (RGB LED GREEN) |
| 33	|	TESTMODE	|	PA8	| P1S6 (Connected to MCO1 by default, outputs 32kHz clock for WICED powersave mode. See System Features in the Firmware Reference to disable the Wi-Fi Powersave Clock and allow usage of this pin.) |
| 34	|	MICRO_RST_N	|	I	|	/RESET (Active low MCU reset) |
| 35	|	MICRO_I2C1_SCL	|	PB6	|	D1 (I2C SCL) |
| 36	|	MICRO_I2C1_SDA	|	PB7	|	D0 (I2C SDA) |
| 37	|	GND	|	PWR	|	Ground |
| 38	|	VBAT_MICRO	|	PWR	|	Supply to the internal RTC, backup registers and SRAM when 3V3 not present (1.65 to 3.6VDC) |
| 39	|	GND	|	PWR	|	Ground |
| 40	|	MICRO_GPIO_1	|	PB0	|	P1S0 |
| 41	|	MICRO_GPIO_2	|	PB1	|	P1S1 |
| 42	|	MICRO_GPIO_3	|	PC0	|	P1S2 |
| 43	|	MICRO_GPIO_5	|	PC3	|	A1 |
| 44	|	MICRO_GPIO_6	|	PC4	|	P1S3 |
| 45	|	MICRO_GPIO_7	|	PB5	|	D2 (I2S SD) |
| 46	|	MICRO_GPIO_8	|	PC7	|	/SETUP (I2S MCK) |
| 47	|	MICRO_GPIO_9	|	PC13	|	P1S4 |
| 48	|	MICRO_GPIO_12	|	PC1	|	P1S5 |
| 49	|	MICRO_GPIO_13	|	PC2	|	A2  (DEFAULT SPI SS) |
| 50	|	MICRO_GPIO_14	|	PC5	|	A0 |
| 51	|	MICRO_JTAG_TRSTN	|	PB4	|	D3 |
| 52	|	MICRO_JTAG_TDO	|	PB3	|	D4 (I2S SCK) |
| 53	|	MICRO_JTAG_TDI	|	PA15	|	D5 (I2S WS) |
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

## Technical specification

### Absolute maximum ratings

| Parameter | Symbol | Min | Typ | Max | Unit |
|:-|:-|:-:|:-:|:-:|:-:|
| Supply Input Voltage | V<sub>3V3-MAX</sub> |  |  | +3.6 | V |
| Storage Temperature | T<sub>stg</sub> | -40 |  | +85 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 2 | kV |

### Recommended operating conditions

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

### Wi-Fi Specifications

| Feature | Description| |
| :-|:-|:-: |
| WLAN Standards | IEEE 802 11b/g/n |
| Antenna Port | Single Antenna |
| Frequency Band | 2.412GHz -- 2.462GHz (United States of America and Canada) |
| <sub></sub> | 2.412GHz -- 2.472GHz (EU) |
| Sub Channels | 1 -- 11 (United States of America and Canada) |
| <sub></sub> | 1 -- 13 (EU) |
| Modulation | DSSS, CCK, OFDM, BPSK, QPSK, 16QAM, 64QAM |

| P1 module Wi-Fi output power | | Typ. | Tol. | Unit |
| :-|:-|:-:|:-:|:-: |
| RF Average Output Power, 802.11b CCK Mode | 1M | Avail. upon request | +/- 1.5 | dBm |
| <sub></sub> | 11M | - | +/- 1.5 | dBm |
| RF Average Output Power, 802.11g OFDM Mode | 6M | - | +/- 1.5 | dBm |
| <sub></sub> | 54M | - | +/- 1.5 | dBm |
| RF Average Output Power, 802.11n OFDM Mode | MCS0 | - | +/- 1.5 | dBm |
| <sub></sub> | MCS7 | - | +/- 1.5 | dBm |


### I/O Characteristics

These specifications are based on the STM32F205RGY6 datasheet, with reference to Photon pin nomenclature.

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :-|:-|:-:|:-:|:-:|:-:|:-: |
| Standard I/O input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.28*(V<sub>3V3</sub>-2)+0.8 | V |
| I/O FT<sup>[1]</sup> input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.32*(V<sub>3V3</sub>-2)+0.75 | V |
| Standard I/O input high level voltage | V<sub>IH</sub> | | 0.41*(V<sub>3V3</sub>-2)+1.3 | | V<sub>3V3</sub>+0.3 | V |
| I/O FT<sup>[1]</sup> input high level voltage | V<sub>IH</sub> | V<sub>3V3</sub> > 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.5 | V |
| <sup></sup> | V<sub>IH</sub> | V<sub>3V3</sub> ≤ 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.2 | V |
| Standard I/O Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 200 | | | mV |
| I/O FT Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 5% V<sub>3V3</sub><sup>[3]</sup> | | | mV |
| Input/Output current max | I<sub>io</sub> | | | | ±25 | mA |
| Input/Output current total | I<sub>io total</sub> | | | | ±120 | mA |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | GND ≤ V<sub>io</sub> ≤ V<sub>3V3</sub> GPIOs | | | ±1 | µA |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | R<sub>PU</sub> | V<sub>io</sub> = 5V, I/O FT | | 3 | µA |
| Weak pull-up equivalent resistor<sup>[5]</sup> | R<sub>PU</sub>| V<sub>io</sub> = GND | 30 | 40 | 50 | kΩ |
| Weak pull-down equivalent resistor<sup>[5]</sup> | R<sub>PD</sub>| V<sub>io</sub> = V<sub>3V3</sub> | 30 | 40 | 50 | kΩ |
| I/O pin capacitance | C<sub>IO</sub> | | | 5 | | pF |
| DAC output voltage (buffers enabled by default) | V<sub>DAC</sub> | | 0.2 | | V<sub>3V3</sub>-0.2 | V |
| DAC output resistive load (buffers enabled by default) | R<sub>DAC</sub> | | 5 | | | k Ω |
| DAC output capacitive load (buffers enabled by default) | C<sub>DAC</sub> | | | | 50 | pF |

**Notes:**

<sub>[1]</sub> FT = Five-volt tolerant. In order to sustain a voltage higher than V<sub>3V3</sub>+0.3 the internal pull-up/pull-down resistors must be disabled.

<sub>[2]</sub> Hysteresis voltage between Schmitt trigger switching levels.  Based on characterization, not tested in production.

<sub>[3]</sub> With a minimum of 100mV.

<sub>[4]</sub> Leakage could be higher than max. if negative current is injected on adjacent pins.

<sub>[5]</sub> Pull-up and pull-down resistors are designed with a true resistance in series with switchable PMOS/NMOS. This PMOS/NMOS contribution to the series resistance is minimum (~10% order).

## Mechanical specifications

### Overall dimensions

P1 module dimensions are: 0.787"(28mm) (W) x 1.102"(20mm) (L) x 0.0787"(2.0mm) (H) +/-0.0039"(0.1mm) (includes metal shielding)

<div align=center><img src="/assets/images/p1-overall_dimensions.png" width=300></div>

<div align=center><img src="/assets/images/p1-vector.png" width=80>
Actual size (so tiny!)</div>

### P1 Module Dimensions

These are the physical dimensions of the P1 module itself, including all pins:

<div align=center><img src="/assets/images/p1-module-dimensions.png" width=600></div>

### P1 Module Recommended PCB land pattern

The P1 can be mounted directly on a carrier PCB with following PCB land pattern:

<div align=center><img src="/assets/images/p1-land-pattern.png" width=600px></div>

A P1 part for EAGLE can be found in the [Particle EAGLE library](https://github.com/spark/hardware-libraries#pcb-footprints-land-pattern)

## P1 Reference Design Schematic

### Schematic - USB

<div align=center><img src="/assets/images/p1-sch-usb.png" width=400></div>

### Schematic - Power

<div align=center><img src="/assets/images/p1-sch-power.png" width=600></div>

### Schematic - User I/O

<div align=center><img src="/assets/images/p1-sch-user-io.png" width=600></div>

### Schematic - P1 Wi-Fi Module

<div align=center><img src="/assets/images/p1-sch-wifi-module.png" height=500></div>

## P1 Reference Design Layout

### P1 Reference Design Top Layer (GTL)

To be added.

### P1 Reference Design Bottom Layer (GBL)

To be added.

## Recommended solder reflow profile

<div align=left><img src="/assets/images/photon-reflow-profile.png" width=600></div>

| Phase | Temperatures and Rates |
| -:|:- |
| A-B. | Ambient~150°C, Heating rate: < 3°C/s |
| B-C. | 150~200°C, soak time: 60~120 s |
| C-D. | 200~245°C, Heating rate: < 3°C/s |
| D.   | Peak temp.: 235~245°C, Time above 220°C: 40~90 s |
| D-E. | 245~220°C, Cooling rate: < 1°C/s |

## Ordering information

P1 modules are available from [store.particle.io](https://store.particle.io/) as cut tape in quantities of 10 each.

## Qualification and approvals

<div align=left><img src="/assets/images/lead-free-fcc-ce.png" height=100></div>

-	RoHS
-	CE
-	FCC ID: COFWMNBM11
-	IC: 10293A-WMNBM11

## Product handling

### Tape and Reel Info

<div align=center><img src="/assets/images/p1-tape-and-reel.png" width=600></div>

### Moisture sensitivity levels

<i class="icon-attention"></i> The Moisture Sensitivity Level (MSL) relates to the packaging and handling precautions required. The P1 module is rated level 3. In general, this precaution applies for Photons without headers.  When reflowing a P1 directly onto an application PCB, increased moisture levels prior to reflow can damage sensitive electronics on the P1.  A bake process to reduce moisture may be required. <i class="icon-attention"></i>

<i class="icon-right-hand"></i>For more information regarding moisture sensitivity levels, labeling, storage and drying see the MSL standard see IPC/JEDEC J-STD-020 (can be downloaded from [www.jedec.org](http://www.jedec.org)).

### ESD Precautions

<i class="icon-attention"></i> The P1 module contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling a P1 module without proper ESD protection may destroy or damage it permanently.  Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates P1 modules.  ESD precautions should be implemented on the application board where the P1 module is mounted. Failure to observe these precautions can result in severe damage to the P1 module! <i class="icon-attention"></i>

## Default settings

The P1 module comes pre-programmed with a bootloader and a user application called Tinker.  This application works with an iOS and Android app also named Tinker that allows you to very easily toggle digital pins, take analog and digital readings and drive variable PWM outputs.

The bootloader allows you to easily update the user application via several different methods, USB, OTA, Serial Y-Modem, and also internally via the Factory Reset procedure.  All of these methods have multiple tools associated with them as well.

You may use the online Web IDE [Particle Build](https://build.particle.io/) to code, compile and flash a user application OTA (Over The Air).  [Particle Dev](https://www.particle.io/dev) is a local tool that uses the Cloud to compile and flash OTA as well.  There is also a package `Spark DFU-UTIL` for Particle Dev that allows for Cloud compiling and local flashing via DFU over USB.  This requires `dfu-util` to be installed on your system.  'dfu-util' can also be used with [Particle CLI](/guide/tools-and-features/cli) for Cloud compiling and local flashing via the command line.  Finally the lowest level of development is available via the [GNU GCC tool chain for ARM](https://github.com/spark/firmware), which offers local compile and flash via dfu-util.  This gives the user complete control of all source code and flashing methods.  This is an extensive list, however not exhaustive.

## Glossary

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

## FCC IC CE Warnings and End Product Labeling Requirements

**Federal Communication Commission Interference Statement**
This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to Part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one of the following measures:

- Reorient or relocate the receiving antenna.
- Increase the separation between the equipment and receiver.
- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.
- Consult the dealer or an experienced radio/TV technician for help.

**FCC Caution:**
Any changes or modifications not expressly approved by the party responsible for compliance could void the user's authority to operate this equipment.
This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions:

1. This device may not cause harmful interference, and
2. This device must accept any interference received, including interference that may cause undesired operation.

**FCC Radiation Exposure Statement:**
This equipment complies with FCC radiation exposure limits set forth for an uncontrolled environment. This transmitter module must not be co-located or operating in conjunction with any other antenna or transmitter. This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.

**IMPORTANT NOTE:**
In the event that these conditions can not be met (for example certain laptop configurations or co-location with another transmitter), then the FCC authorization is no longer considered valid and the FCC ID can not be used on the final product. In these circumstances, the OEM integrator will be responsible for re-evaluating the end product (including the transmitter) and obtaining a separate FCC authorization.

**End Product Labeling**
The final end product must be labeled in a visible area with the following:
> Contains FCC ID: 2AEMI-PHOTON

**Manual Information to the End User**
The OEM integrator has to be aware not to provide information to the end user regarding how to install or remove this RF module in the user’s manual of the end product which integrates this module.

---

**Canada Statement**
This device complies with Industry Canada’s licence-exempt RSSs. Operation is subject to the following two conditions:

1. This device may not cause interference; and
2. This device must accept any interference, including interference that may cause undesired operation of the device.

Le présent appareil est conforme aux CNR d’Industrie Canada applicables aux appareils radio exempts de licence.

**L’exploitation est autorisée aux deux conditions suivantes:**

1. l’appareil ne doit pas produire de brouillage;
2. l’utilisateur de l’appareil doit accepter tout brouillage radioélectrique subi, même si le brouillage est susceptible d’en compromettre le fonctionnement.

**Caution Exposure:**
This device meets the exemption from the routine evaluation limits in section 2.5 of RSS102 and users can obtain Canadian information on RF exposure and compliance.
Le dispositif répond à l'exemption des limites d'évaluation de routine dans la section 2.5 de RSS102 et les utilisateurs peuvent obtenir des renseignements canadiens sur l'exposition aux RF et le respect.

**The final end product must be labelled in a visible area with the following:**
The Industry Canada certification label of a module shall be clearly visible at all times when installed in the host device, otherwise the host device must be labelled to display the Industry Canada certification number of the module, preceded by the words “Contains transmitter module”, or the word “Contains”, or similar wording expressing the same meaning, as follows:
> Contains transmitter module IC: 20127-PHOTON

This End equipment should be installed and operated with a minimum distance of 20 centimeters between the radiator and your body.
Cet équipement devrait être installé et actionné avec une distance minimum de 20 centimètres entre le radiateur et votre corps.

> The end user manual shall include all required regulatory information/warning as shown in this manual.

## Revision history

| Revision | Date | Author | Comments |
|:---:|:---:|:---:|:----|
| v001 | 4-May-2015 | BW | Initial release |
| v002 | 31-May-2015 | BW | Update assets |
| v003 | 1-June-2015 | BW | Updated VBAT_MICRO info |
| v004 | 24-July-2015 | BW | Added FCC IC CE Warnings and End Product Labeling Requirements, Updated power output, added approved antennas, Corrected DAC2 as A3, Corrected A0 as pin 50, Corrected External Coexistence Interface pin numbers, Added RGB LED, SETUP and RESET button section. |
| v005 | 11-April-2016 | BW | Added: full STM32 part number, Memory map, DAC limits, SWD pin locations, max source/sink current, known errata URL and tape-and-reel dimensions. Updated: BT COEX info, pinout diagrams (fixed RESET pin number error), operating conditions, pin descriptions (P1S0~P1S5 pins), land-pattern image signal keepout note.
| v006 | 14-July-2016 | BW | Updated P1 pin listing: TESTMODE pin 33 (PA8), connected to MCO1 by default, outputs 32kHz clock for WICED powersave mode - currently unsupported for user control.
| v007 | 20-September-2016 | BW | Updated P1 pin listing: TESTMODE pin 33 (PA8), can use now as P1S6 if enabled.  Updated Pinmap and added P1S6.  Updated Pin Description and Peripherals and GPIO. |
| v008 | 25-July-2017 | BW | Added note to clarify MICRO_SPI1_SS label, renamed SPI1_*/SPI3_* to match Particle API instead of STM32 pin names to avoid confusion (now SPI and SPI1), updated the Pin Description section and added high resolution pinout PDF, updated PWM notes, JTAG_TDO pin number (54 -> 52), block diagram and DCT layout, added warning to power section |
| v009 | 30-August-2017 | BW | Added part number for 1MB external SPI flash (MX25L8006E) |

## Known Errata

We are tracking [known errata with this datasheet here](https://github.com/spark/docs/issues/19).  These issues/errors in the datasheet will be resolved in subsequent revisions.

## Contact

**Web**

https://www.particle.io

**Community Forums**

https://community.particle.io

**Email**

<mailto:hello@particle.io>
