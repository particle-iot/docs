---
title: E Series System Integration Manual
layout: datasheet.hbs
columns: two
order: 3
---
# System Integration Manual

This manual provides the necessary guidelines to successfully integrate the E series module in your product. 

For further information about this module please refer to:

 - <a href="/datasheets/electron-(cellular)/e-series-datasheet">Datasheet</a>
 - [Firmware development](/reference/firmware/electron/)
 - [Product management](/guide/tools-and-features/console/)

## E series architecture:

The block diagram below summarizes the architecture of the E series module. It's key components are the STM32F205 microcontroller and the uBlox SARA cellular modem. In addition to that, the module has an on board power management IC, 3.3V DC regulator, LiPo fuel gauge, and an Particle embedded SIM chip. There is also room for additional SPI based FLASH memory expansion. 

<div align=center><img src="/assets/images/e-series/illustrations/e-blockdiagram.png" ></div>

### Overview
 
### Pinout diagram

<div align=center> <a href="/assets/images/e-series/illustrations/e0-pinout.pdf" target="_blank"> <img src="/assets/images/e-series/illustrations/e0-pinout.png"> </a></div>

You can download a high resolution pinout diagram in a <a href="/assets/images/e-series/illustrations/e0-pinout.pdf" target="_blank"><strong>PDF version here.</strong></a></div><br>

### Pin description

|#  | PIN | FUNCTION  | DESCRIPTION|
|:--|:----|:---------:|:-----------|
|1| VIN   | POWER     | This pin can be used as an input or output. As an input, supply 5VDC to 12VDC to power the Electron. When the Electron is powered via the USB port, this pin will output a voltage of approximately 4.8VDC due to a reverse polarity protection series Schottky diode between VBUS and VIN. When used as an output, the max load on VIN is 1Amp.  
|2| GND   | POWER     | System ground.
|3| VBUS  | POWER     | This is connected to the VBUS power pin of the USB port. 
|4| GND   | POWER     | System ground.
|5| LIPO  | POWER     | This is connected to the +LiPo connector.       
|6| NC    | TBD       | Do not connect.
|7| GND   | POWER     | System ground.
|8| PMID  | POWER     | This is connected to the PMID pin of the PMIC.      
|9| 3V3   | POWER     | This is the output of the 3V3 regulator on the E0.  
|10| VDDA | POWER     | This is the input to the analog block of the STM32.   
|11| VBAT | POWER     | Supply to the internal RTC, backup registers and SRAM when 3V3 is not present (1.65 to 3.6VDC).
|12| GND  | POWER     | System ground.
|13| USB+ | IO        | Data+ pin of the USB port.
|14| USB- | IO        | Data- pin of the USB port.|
|15| GND  | POWER     | System ground.
|16| TX   | IO        | Primarily used as UART TX, but can also be used as a digital GPIO or PWM.
|17| RX   | IO        | Primarily used as UART RX, but can also be used as a digital GPIO or PWM.
|18| GND  | POWER     | System ground.
|19| WKP  | IO        | Active-high wakeup pin, wakes the module from sleep/standby modes. When not used as a WAKEUP, this pin can also be used as a digital GPIO, ADC input or PWM. Can be referred to as A7 when used as an ADC.
|20| DAC  | IO        | 12-bit Digital-to-Analog (D/A) output (0-4095), referred to as DAC or DAC1 in software. Can also be used as a digital GPIO or ADC. Can be referred to as A6 when used as an ADC.|
|21| A5   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|22| A4   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|23| A3   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|24| A2   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|25| A1   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|26| A0   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|27| GND  | POWER     | System ground.|
|28| B5   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|29| B4   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), and also digital GPIOs.
|30| B3   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), PWM and also digital GPIOs.
|31| B2   | IO        | 12-bit Analog-to-Digital (A/D) inputs (0-4095), PWM and also digital GPIOs.|
|32| B1   | IO        | Digital only GPIO, and PWM.
|33| B0   | IO        | Digital only GPIO, and PWM.
|34| GND  | POWER     | System ground.
|35| D7   | IO        | Digital only GPIO.
|36| D6   | IO        | Digital only GPIO.
|37| D5   | IO        | Digital only GPIO.
|38| D4   | IO        | Digital only GPIO.
|39| D3   | IO        | Digital only GPIO, and PWM.
|40| D2   | IO        | Digital only GPIO, and PWM.
|41| D1   | IO        | Digital only GPIO, and PWM.
|42| D0   | IO        | Digital only GPIO, and PWM.
|43| GND  | POWER     | System ground.
|44| C5   | IO        | Digital only GPIO, and PWM.
|45| C4   | IO        | Digital only GPIO, and PWM.
|46| C3   | IO        | Digital only GPIO.
|47| C2   | IO        | Digital only GPIO.
|48| C1   | IO        | Digital only GPIO.
|49| C0   | IO        | Digital only GPIO.
|50| NC   | TBD       | Do not connect.
|51| GND  | POWER     | System ground.
|52| BLU  | IO        | Blue pin of the RGB LED.
|53| GRN  | IO        | Green pin of the RGB LED.
|54| RED  | IO        | Red pin of the RGB LED.
|55| MODE | IO        | Connected to the MODE button input.
|56| RST  | I         | Active-low reset input.
|57| STAT | O         | Connected to the charge status pin of the PMIC.
|58| GND  | POWER     | System ground.
|59| GND  | POWER     | System ground.
|60| GND  | POWER     | System ground.
|61| UB_USB+ | IO        | Data+ pin of the ublox USB port.
|62| UB_USB- | IO        | Data- pin of the ublox USB port.
|63| UB_VUSB_DET | IO        | USB detect pin of the ublox USB port. 5V on this pin enables the ublox's USB interface.

[1] PWM is available on D0, D1, D2, D3, B0, B1, B2, B3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 11 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

## Technical Specifications

### Absolute maximum ratings <sup>[1]</sup> <i class="icon-attention"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
|:---|:---|:---:|:---:|:---:|:---:|
| Supply Input Voltage | V<sub>IN-MAX</sub> |  |  | +17 | V |
| Supply Output Current | I<sub>IN-MAX-L</sub> |  |  | 1 | A |
| Battery Input Voltage | V<sub>LiPo</sub> |  |  | +6 | V |
| Supply Output Current | I<sub>3V3-MAX-L</sub> |  |  | 800 | mA |
| Storage Temperature | T<sub>stg</sub> | -30 |  | +75 | °C |
| ESD Susceptibility HBM (Human Body Mode) | V<sub>ESD</sub> |  |  | 2 | kV |

<sup>[1]</sup> Stresses beyond those listed under absolute maximum ratings may cause permanent damage to the device. These are stress ratings
only, and functional operation of the device at these or any other conditions beyond those indicated under recommended operating
conditions is not implied. Exposure to absolute-maximum-rated conditions for extended periods may affect device reliability.

### Recommended operating conditions <i class="icon-check"></i>

| Parameter | Symbol | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:
| Supply Input Voltage | V<sub>IN</sub> | +3.88<sup>[1]</sup> |  | +12 | V |
| Supply Output Voltage | V<sub>IN</sub> |  | +4.8 |  | V |
| Supply Output Voltage | V<sub>3V3</sub> |  | +3.3 |  | V |
| LiPo Battery Voltage | V<sub>LiPo</sub> | +3.6 |  | +4.4 | V |
| Supply Input Voltage | V<sub>VBAT</sub> | +1.65 |  | +3.6 | V |
| Supply Input Current (VBAT) | I<sub>VBAT</sub> |  |  | 19 | uA |
| Operating Current (uC on, Cellular ON) | I<sub>IN avg</sub> |  | 180 | 250 | mA |
| Peak Current (uC on, Cellular ON) | I<sub>IN pk</sub> | 800<sup>[2]</sup> |  | 1800<sup>[3]</sup> | mA |
| Operating Current (uC on, Cellular OFF) | I<sub>IN avg</sub> |  | 47 | 50 | mA |
| Sleep Current (4.2V LiPo, Cellular OFF)| I<sub>Qs</sub> |  | 0.8 | 2 | mA |
| Deep Sleep Current (4.2V LiPo, Cellular OFF) | I<sub>Qds</sub> |  | 110 | 130 | uA |
| Operating Temperature | T<sub>op</sub> | -20 |  | +60 | °C |
| Humidity Range Non condensing, relative humidity | | | | 95 | % |

**Notes:**

<sup>[1]</sup> The minimum input voltage is software defined with a user selectable range of 3.88V to 5.08V in 80mV increments. Out of the box, the minimum input voltage is set to 4.36V in order for the LiPo battery to be able to properly charge.

<sup>[2]</sup> 3G operation

<sup>[3]</sup> 2G operation 

## Design

### Power supply interface

The E series modules can be powered over VIN, VBUS, LIPO or a combination of them. The VIN and VBUS pins are connected to the input of the power management IC which handles regulation, charging and powering of system. The VIN pin is directly connected to the inpout while VBUS pin has a reverse polarity protection diode so that power over VIN does not back feed into the USB port. You will see a drop of 0.43 V at the input when powered over USB.

 > **Tip:** Most of the power requirements of the E series module are dictated by the ublox's SARA cellular modem, so it is important that you also refer to the SARA-G3 and SARA-U2-series System Integration Manual's section 1.5.

#### Powering using a battery:

The E series module uses TI's BQ24195 to do all of its power management. It is designed to charge a single cell Li-Ion or Li-Polymer battery while intelligently switching between charging and discharging based on the presence of an additional power supply. You can power your design with a battery alone or use it as a back up in addition to having a permanent DC source. The two things you need to keep in mind while choosing a battery is its cell chemistry and max discharge rate. The on board PMIC only supports single cell Li Ion and Li Polymer (3.7V) chemistries. The discharge rate should be able equal to or greater that 2A to meet the cellular modems peak current requirements.
The battery provided with the E series evaluation kit is rated at 1,800mAH and a discharge rate of 1C with internal over current protection.

<div align=center><img src="/assets/images/e-series/schematics/e-ps-lipo.png"></div>

Powering over VIN along with the LiPo battery

<div align=center><img src="/assets/images/e-series/schematics/e-ps-vin-lipo.png"></div>


If you are planning to use a different cell chemistry or voltage, you'll have to design its charging and management separately.

#### Powering using an external DC source

**VIN**

The E series module can be powered from an external DC source via the VIN pin. The pin can accept voltages from 3.88V to 12VDC. For continuous operation without a battery, please spec the power supply at 10 Watts. For example, if powering at 5 V, the supply should be able to supply 2 A of current. 

<div align=center><img src="/assets/images/e-series/schematics/e-ps-vin.png"></div>


**LIPO**

You can also bypass the PMIC's internal regulator and power the module directly by connecting an externally regulated DC source (3.8 V to 4.1 V) to the LIPO pin as long as the VIN pin is left disconnected. The PMID internally routes power from the LIPO pin to the system via a FET with minimal losses. 

<div align=center><img src="/assets/images/e-series/schematics/e-ps-lipo-ext.png"></div>


<!-- #### Powering over USB:

If you are designing a product that is only powered via a USB power source, remember to spec it at 2 A minimum since the cellular module can consume upto 1.8A peak for short durations when transmitting in 2G mode, or upto 0.8A in 3G mode. If the USB power source cannot be specd at 2 A, you can supplement the power requirements by integrating a battery. 
  (or enough bulk capacitance along with inrush current limiting) -->

#### VDDA

This pin powers the analog block of the on board microcontroller. You can connect this directly to the 3V3 pin or power it separately with a low noise power source. In either case, you need to connect it to a source for the module to boot up.

>**Note:** Do not leave this pin unconnected. For the module to boot up, you need to tie this pin to systems 3V3 or other 3.3V supply. 

<div align=center><img src="/assets/images/e-series/schematics/e-ps-vdda.png"></div>


**Using an external low-noise power source**

<div align=center><img src="/assets/images/e-series/schematics/e-ps-vdda-ext.png"></div>


#### VBAT

This is the supply to the internal RTC, backup registers and SRAM. You can connect a backup battery to it (1.65 to 3.6VDC), if you wish to retain RTC/RAM when system supply is removed or simply tie it up to 3V3.

### Basic setup

The following is a sample schematic needed to power up and use the E series module. The module is powered over VIN with an external DC power source along with a LiPo battery used as a back up. The RGB LED provides a visual aide to detect the state of the module. Two buttons, RESET and MODE provide the ability to put the module in different modes. LED1 indicates the charging status of the LiPo battery. The main USB port can be used for debugging or to update the firmware on the module.

In addition to these parts, it is also encouraged to add a USB interface for the ublox module as it provides additional debugging channel and can be used to update the firmware of the modem. The JTAG/SWD interface can be useful to provision the product during manufacturing or when testing/debugging the firmware.

<div align=center><img src="/assets/images/e-series/schematics/e-sample-setup.png"></div>


> You can also take a look at the schematic and board files of the E series evaluation kit as a reference design available here.

### GPIO interface

#### Electrical parameters

These specifications are based on the STM32F205RGT6 datasheet, with reference to E series pin nomenclature.

| Parameter | Symbol | Conditions | Min | Typ | Max | Unit |
| :---|:---|:---:|:---:|:---:|:---:|:---: |
| Standard I/O input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.28*(V<sub>3V3</sub>-2)+0.8 | V |
| I/O FT<sup>[1]</sup> input low level voltage | V<sub>IL</sub> | | -0.3 | | 0.32*(V<sub>3V3</sub>-2)+0.75 | V |
| Standard I/O input high level voltage | V<sub>IH</sub> | | 0.41*(V<sub>3V3</sub>-2)+1.3 | | V<sub>3V3</sub>+0.3 | V |
| I/O FT<sup>[1]</sup> input high level voltage | V<sub>IH</sub> | V<sub>3V3</sub> > 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.5 | V |
| <sup></sup> | V<sub>IH</sub> | V<sub>3V3</sub> ≤ 2V | 0.42*(V<sub>3V3</sub>-2)+1 | | 5.2 | V |
| Standard I/O Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 200 | | | mV |
| I/O FT Schmitt trigger voltage hysteresis<sup>[2]</sup> | V<sub>hys</sub> | | 5% V<sub>3V3</sub><sup>[3]</sup> | | | mV |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | GND ≤ V<sub>io</sub> ≤ V<sub>3V3</sub> GPIOs | | | ±1 | µA |
| Input leakage current<sup>[4]</sup> | I<sub>lkg</sub> | R<sub>PU</sub> | V<sub>io</sub> = 5V, I/O FT | | 3 | µA |
| Weak pull-up equivalent resistor<sup>[5]</sup> | R<sub>PU</sub>| V<sub>io</sub> = GND | 30 | 40 | 50 | k Ω |
| Weak pull-down equivalent resistor<sup>[5]</sup> | R<sub>PD</sub>| V<sub>io</sub> = V<sub>3V3</sub> | 30 | 40 | 50 | k Ω |
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



| Peripheral Type | Qty | Input(I) / Output(O) | FT<sup>[1]</sup> / 3V3<sup>[2]</sup> |
| :---:|:---:|:---:|:---: |
| Digital | 30 | I/O | FT/3V3 |
| Analog (ADC) | 12 | I | 3V3 |
| Analog (DAC) | 2 | O | 3V3 |
| UART | 3 | I/O | 3V3 |
| SPI  | 2 | I/O | 3V3 |
| I2S  | 1 | I/O | 3V3 |
| I2C  | 1 | I/O | FT |
| CAN  | 2 | I/O | 3V3<sup>[4]</sup> |
| USB  | 1 | I/O | 3V3 |
| PWM  | 13<sup>3</sup> | O | 3V3 |

**Notes:**
<sup>[1]</sup> FT = 5.0V tolerant pins. All pins except A3 and DAC are 5V tolerant (when not in analog mode). If used as a 5V input the pull-up/pull-down resistor must be disabled.

<sup>[2]</sup> 3V3 = 3.3V max pins.

<sup>[3]</sup> PWM is available on D0, D1, D2, D3, B0, B1, B2, B3, A4, A5, WKP, RX, TX with a caveat: PWM timer peripheral is duplicated on two pins (A5/D2) and (A4/D3) for 11 total independent PWM outputs. For example: PWM may be used on A5 while D2 is used as a GPIO, or D2 as a PWM while A5 is used as an analog input. However A5 and D2 cannot be used as independently controlled PWM outputs at the same time.

<sup>[4]</sup> Technically these pins are 5.0V tolerant, but since you wouldn't operate them with a 5.0V transceiver it's proper to classify them as 3.3V.

### Antenna interface

Antenna interface provided via an IPEX MHF/u.FL receptacle. The interface has LC ESD protection of XXXKV. 

Particle recommends the Taoglas PC104 penta-band (850/900/1800/1900/2100 MHz) GSM antenna. The antenna comes with an adhesive backing making it easy to mount. Please refer to its datasheet for further details on power characteristics and optimal placement in a product.

|Antenna Type| Manufacturer | MFG. Part #| Gain|
|:--|:--|:--|:--|
|PCB antenna| Taoglas| [PC104.07.0165C](http://www.taoglas.com/wp-content/uploads/2015/06/PC104.07.0165C.pdf)| 1dBi ~ 2.39dBi|

If you are choosing your own antenna please make sure of the following:
 
 - Optimal support for the operating frequency bands of the module.
 - Select an antenna cable with minimum insertion loss.
 - Select a connector with 50 ohm impedance.
 - Select the antenna with appropriate gain figure that does not exceed the regulatory requirements in the country of operation.

### Handling and Soldering

#### ESD Precautions

The E series contains highly sensitive electronic circuitry and is an Electrostatic Sensitive Device (ESD). Handling an E series without proper ESD protection may destroy or damage it permanently. Proper ESD handling and packaging procedures must be applied throughout the processing, handling and operation of any application that incorporates the module. ESD precautions should be implemented on the application board where the E series is mounted. Failure to observe these precautions can result in severe damage to the E series!

#### Packaging

<div align=center><img src="/assets/images/e-series/illustrations/e-dims.png"></div>

**Dimensions and Weight**

 - Width = 36 mm
 - Height = 43 mm
 - Thickness = 4.6 mm
 - Weight = 8 gms

#### Pick and place

**Fiducials**

You can use the three fiducials on the top layer for alignment during machine placement of the module.

<div align=center><img src="/assets/images/e-series/illustrations/e-fiducials.png"></div>


#### Soldering

We recommend no clean solder paste over water soluble as it does not require additional cleaning processes.

**Alloy specification**

 - 95.5% Sn / 3.9% Ag / 0.6% Cu (95.5% Tin / 3.9% Silver / 0.6% Copper)
 - 95.5% Sn / 4.0% Ag / 0.5% Cu (95.5% Tin / 4.0% Silver / 0.5% Copper)

**Melting temperature:** 217 °C

**Stencil thickness:** 150 micrometer 

**Reflow**

We recommend a three phase convection reflow oven process. Please refer to IPC-7530 guidelines for in depth details on reflow temperature profiles.

Typical reflow profile for a Pb free solder paste:

<div align=center><img src="/assets/images/e-series/illustrations/e-reflow.png"></div>


**Recommended PCB land pattern**

<div align=center><img src="/assets/images/e-series/illustrations/e-footprint.png"></div>
