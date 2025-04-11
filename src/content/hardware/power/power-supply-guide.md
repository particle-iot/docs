---
title: Power supply guide
columns: two
layout: commonTwo.hbs
description: Power supply guide
---

# {{title}}

This guide is a brief guide to power supplies for Particle devices.

## Power requirements

- Most Wi-Fi devices use a maximum of 500 mA at 5 VDC and can be powered by most USB ports.

- LTE Cat M1 cellular devices (Boron LTE BRN404X/BRN404/BRN402, B404X/B404/B402, Tracker SoM T404/T402, E-Series LTE E404/E402, Electron LTE ELC402) also only require 500 mA at 5 VDC.

- The M-SoM and 2G/3G cellular devices may require up to 2 A at 5 VDC, which can lead to some complexities, as described below.

## Typical device power inputs

### USB Power

- Most devices have a Micro USB B connector for supplying USB power to the device.

- The Tracker One, Tracker SoM eval board, Muon, and M.2 breakout board have a USB C connector instead.

- By default, most USB 2 and USB 3 ports can supply up to 500 mA at 5 VDC. 

- A few specialty USB ports like those on keyboards sometimes only support 100 mA and these should not be used to power Particle devices.

- Cellular devices have a PMIC that supports USB DPDM to negotiate the power requirements with the USB hub, allowing it to negotiate higher current with some USB hubs.

- Some tablet chargers support 2 A power without using DPDM; these can also be used.

- Monitor One devices can only be powered by the M12 8-pin connector.

### VIN (external supplies)

- All devices have the ability to power from a non-USB power pin. On many devices this is labeled VIN.

- The allowable voltage range and current varies by device, see the list of devices below.

### VUSB (Adafruit Feather)

- On Adafruit Feather form-factor devices (Argon, Boron, Photon 2), the VUSB pin can be used as a power input or power output.

- If used as a power output, it can supply peripheral devices that require approximately 5V. However:
  - The voltage will be slightly less, around 4.8V, because of the Schottky diode that prevents voltage from VUSB, when used as a power input, from flowing into a USB port.
  - GPIO pins on the Argon and Boron are not 5V tolerant, so you may need level shifters when interfacing with 5V peripherals.

- If used as a power input, it can supply power as an alternative to using the USB power input. However:
  - According to the Adafruit Feather specification, this should be 5V.
  - For the Argon and Photon 2, this can be 3.6V to 5.5V, assuming other Featherwing devices do not have smaller limits.
  - For the Boron, this can be 3.6V to 17V, assuming other Featherwing devices do not have smaller limits.
  - If you also connect USB power, voltage from the USB port can also flow into your power supply. Adding a Schottky diode to prevent this where your power supply connects to VUSB may be desirable.



### Li+ (battery connector)

- Many devices have a JST-PH connector for a Li-Po battery. See the [battery guide](/hardware/power/batteries/) for more information.

- They may also have a separate Li+ pin that is connected to the same place and can be used as a power input, power output, or as an alterative way to connect an external battery without using the JST-PH.

- For cellular devices with a PMIC (Boron, Tracker, E-Series, Electron), this can be used to power the device with an external supply in some specific conditions, see the PMIC section below.

Some devices including the M.2 breakout board and Muon include a 3-pin JST-PH connector. The battery pack includes an integrated 10K NTC thermistor which prevents charging when the battery temperature is too low or too high.

Some devices include the Tracker One and Monitor One also control charging, but do so in software using a temperature sensor in the enclosure
instead of using a battery pack temperature sensor.

<div align="center"><img src="/assets/images/m-series/battery-conn.png" class="small"></div>

<p class="attribution">Facing the plug on the battery side</p>


{{!-- BEGIN do not edit content below, it is automatically generated 993e47b6-c085-45bf-908b-238bb6c323b8 --}}

| SKU | Description | USB connector | Battery Connector | Lifecycle |
| :--- | :--- | :---: | :---: | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | micro-b | 2-pin | Deprecated |
| ARG-LDKT | Argon Leak Detection Kit [x1] | micro-b | 2-pin | Deprecated |
| ARG-STRTKT | Argon Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [ARGN-H](/reference/datasheets/wi-fi/argon-datasheet/) | Argon [x1] | micro-b | 2-pin | Deprecated |
| [ARGNKIT](/reference/datasheets/wi-fi/argon-datasheet/) | Argon, Starter Kit  [x1] | micro-b | 2-pin | Deprecated |
| [ARGNTRAY50](/reference/datasheets/wi-fi/argon-datasheet/) | Argon, Tray [x50] | micro-b | 2-pin | Deprecated |
| ASSET2GV2 | Asset Tracker 2G | micro-b | 2-pin | Deprecated |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | micro-b | 2-pin | Deprecated |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | micro-b | 2-pin | Deprecated |
| [B402MEA](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE CAT-M1 (NorAm), [x1] | &nbsp; | 2-pin | Deprecated |
| [B402MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE CAT-M1 (NorAm), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [B404MEA](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | Deprecated |
| [B404MTY](/reference/datasheets/b-series/b404-b402-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | NRND |
| [B404XMEA](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | GA |
| [B404XMTY](/reference/datasheets/b-series/b404x-datasheet/) | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [B504EMEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | &nbsp; | 2-pin | GA |
| [B504EMTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | &nbsp; | 2-pin | GA |
| [B504MEA](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | Deprecated |
| [B504MTY](/reference/datasheets/b-series/b504-datasheet/) | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | &nbsp; | 2-pin | Deprecated |
| [B523MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe) [x1] | &nbsp; | 2-pin | Deprecated |
| [B523MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | &nbsp; | 2-pin | NRND |
| [B524MEA](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | &nbsp; | 2-pin | GA |
| [B524MTY](/reference/datasheets/b-series/b524-b523-datasheet/) | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [BRN310KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN310TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN314KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN314TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron 2G/3G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN402](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | micro-b | 2-pin | Deprecated |
| [BRN402KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [BRN402TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | NRND |
| [BRN404](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| [BRN404KIT](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | micro-b | 2-pin | Deprecated |
| [BRN404TRAY50](/reference/datasheets/b-series/boron-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | micro-b | 2-pin | Deprecated |
| [BRN404X](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | GA |
| [BRN404XKIT](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | micro-b | 2-pin | GA |
| [BRN404XTRAY50](/reference/datasheets/b-series/brn404x-datasheet/) | Boron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | GA |
| [E260KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [E260TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Americas/Aus), Tray [x50] | micro-b | 2-pin | Deprecated |
| [E270KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA) Starter Kit, [x1] | micro-b | 2-pin | Deprecated |
| [E270TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (EMEA), Tray [x50] | micro-b | 2-pin | NRND |
| [E310KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E310MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), [x1] | &nbsp; | 2-pin | Deprecated |
| [E310TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E310), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [E313EA](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), [x1] | &nbsp; | 2-pin | Deprecated |
| [E313TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E313), Tray [x50] | &nbsp; | 2-pin | End of life |
| [E314KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E314MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), [x1] | &nbsp; | 2-pin | Deprecated |
| [E314TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series 2G/3G (Global - E314), Tray [x50] | &nbsp; | 2-pin | NRND |
| [E350KIT](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G Kit (Global) | micro-b | 2-pin | Deprecated |
| [E350TRAY50](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G (Global), Tray [x50] | micro-b | 2-pin | Deprecated |
| [E402KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E402MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), [x1] | &nbsp; | 2-pin | Deprecated |
| [E402TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm), Tray [x50] | &nbsp; | 2-pin | NRND |
| [E404KIT](/reference/datasheets/e-series/e-series-eval-board/) | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | micro-b | 2-pin | NRND |
| [E404MOD1](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE-M (NorAm, EtherSIM), [x1] | &nbsp; | 2-pin | NRND |
| [E404TRAY50](/reference/datasheets/e-series/e-series-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | Deprecated |
| [E404XTRAY50](/reference/datasheets/e-series/e404x-datasheet/) | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | &nbsp; | 2-pin | GA |
| [ELC314TY](/reference/datasheets/e-series/electron-datasheet/) | Electron 2G/3G (Global - U201) , Tray [x50] | micro-b | 2-pin | NRND |
| [ELC402EA](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), [x1] | micro-b | 2-pin | Deprecated |
| [ELC402TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm), Tray [x50] | micro-b | 2-pin | Deprecated |
| [ELC404TY](/reference/datasheets/e-series/electron-datasheet/) | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | micro-b | 2-pin | Deprecated |
| [ELC504EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x1] | c | 3-pin | In development |
| [ELC504EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (NorAm), [x50] | c | 3-pin | In development |
| [ELC524EMEA](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x1] | c | 3-pin | In development |
| [ELC524EMTY](/reference/datasheets/e-series/electron-2-datasheet/) | Electron 2 LTE CAT-1 bis (Europe), [x50] | c | 3-pin | In development |
| [M2BREAKOUT](/reference/datasheets/m-series/m2-breakout-datasheet/) | Particle M.2 SoM Breakout Board [x1] | c | 3-pin | GA |
| [M2EVAL](/reference/datasheets/b-series/b-series-eval-board/) | Particle M.2 SoM Evaluation Board [x1] | micro-b | 2-pin | GA |
| MHAT | M-HAT | c | 3-pin | In development |
| MHAT504e | M-HAT with LTE CAT1 for North America | c | 3-pin | In development |
| MHAT524e | M-HAT with LTE CAT1 for Rest of World | c | 3-pin | In development |
| [MUON404](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON404EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON524](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON524EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | c | 3-pin | GA |
| [MUON635](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | c | 3-pin | In development |
| [MUON635EA](/reference/datasheets/m-series/muon-datasheet/) | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | c | 3-pin | In development |
| MUONCB | Muon Carrier Board (Dev Board only) | c | 3-pin | GA |
| MUONCB-BETA | Muon Carrier Board - Beta Sample | c | 3-pin | Deprecated |
| MUONCBKIT | Muon Carrier Board Kit | c | 3-pin | GA |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | micro-b | 2-pin | Deprecated |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | micro-b | 2-pin | Deprecated |
| XENNTRAY50 | Xenon [x50] | micro-b | 2-pin | End of life |


{{!-- END do not edit content above, it is automatically generated --}}



### VBAT

- This is only applicable to the Photon and E-Series, and is used to back up the real-time clock and retained memory when removing USB or VIN power. You can connect a Lithium coin cell or a supercap to this pin.

- There is an Electron pin labeled VBAT but it should not be used because it's tied to 3V3 on the Electron with a 0-ohm resistor.



## PMIC (bq24195) guide

### Charge current

The charge current is limited by the charge current limit set in software, as well as the input current limit, described in the following section.

The charge current can be specified using the Power Manager [`batteryChargeCurrent()`](/reference/device-os/api/power-manager/batterychargecurrent/) method. The default is 896 mA. A few situations where you will need to manually change the setting:

- If you are charging using a small solar panel and you can run into a situation where the charging LED slowly blinks. This is solved by setting a lower charge limit. What is happening:
  - The solar panel output voltage rises above the charge voltage limit, so charging begins.
  - The solar panel is unable to supply the charge current, and the voltage collapses below the charge voltage limit.
  - Charging stops because the voltage is below the charge voltage limit.
  - The process repeats.

- If you are operating in very high or very low temperatures, you may need to stop charging.

- If you are operating in high temperatures, it may be desirable to lower the charge current to keep the battery cooler.


### Input current limit

The input current is limited by:

- The software setting, [`powerSourceMaxCurrent()`](/reference/device-os/api/power-manager/powersourcemaxcurrent-systempowerconfiguration/).

- DPDM, if connected to a hub or power adapter that supports DPDM.

- A hardware maximum set by the ILIM resistor, 1590 mA on most devices.

#### powerSourceMaxCurrent

The [`powerSourceMaxCurrent()`](/reference/device-os/api/power-manager/powersourcemaxcurrent-systempowerconfiguration/) method sets the maximum current the power source can provide. 

The valid values are: 100, 150, 500, 900, 1200 or 1500 (mA). While the bq24195 PMIC has settings for 2000 and 3000, these will still be limited to around 1590 mA because the input current is limited to the lower of the powerSourceMaxCurrent and the hardware ILIM resistors, which are set to 1590 mA on most devices.

When powering by a USB power adapter that implements DPDM (USB current limit discovery), the lower of that value, powerSourceMaxCurrent, and ILIM resistors will be used.

The default is 900 mA, which is not enough to power a 2G/3G cellular modem without a LiPo battery.

Situations where you will need to change powerSourceMaxCurrent:

- If you are using a 2G/3G cellular device without a LiPo battery.
- If you are using an external power supply to VIN that supplies less than 900 mA. 

#### DPDM

DPDM how the PMIC determines the USB hub current capabilities over the USBDATA+ and USBDATA- lines. This is also known as Battery Charging Spec, BC 1.2.

The input current limit is further limited to this value to prevent putting more load on the USB bus than it can supply.

Note that if you are not using DPDM, such as from using the VIN external power input or a tablet charger that does not support DPDM, the input current limit will be determined only by the software settings and ILIM hardware current limit.

### Voltage input range

We recommend limiting the input voltage on bq24195 devices to 12 VDC. However, the PMIC does allow operation up to 17 VDC. Thus you can use a somewhat higher limit if needed.

Note, however, that in automotive uses-cases, vehicle power supplies may have surges that exceed 17 volts, so you should include extra protection.

The Tracker One includes a bq24195 but has a higher voltage limit because it includes an additional power supply in front of the bq24195 input.

### Using Li+ as a power input

If you are in a situation where:

- Are using sleep modes and sleeping most of the time
- Not using the LiPo battery
- Your external supply could be configured to generate 3.7V at 2A

it may be advantageous to power by Li+ instead of VIN.

If Li+ is powered, it can supply VSYS (the output of the bq24195) without powering up the bq24195 internal buck regulator, which takes care of lowering the VIN voltage. There is some loss when this regulator is running. While the loss is minimal as a percentage of power in normal operating mode, it can become a significant percentage if using sleep mode most of the time.

If you use this technique, make sure you also disable charging, just in case the device is powered by USB.

### Shipping mode

Shipping mode allows the battery to be disconnected electronically so the discharge rate is minimal and the device can be left in this state for months without having to physically disconnect the battery. It also prevents the device from being turned on accidentally while in transit, such as by bumping a power button.

Only the Tracker One has built-in support for shipping mode, but all bq24195 devices can use this technique by disabling the BATFET. 

An important consideration is that the only way to exit shipping mode is to supply external power, either by USB or VIN. It's not possible to exit shipping mode by time, button press, etc..

### External power detection mode

All bq24195 devices can detect whether they have external power or not. This can be useful in a number of cases, including:

- For vehicle powered devices, after the ignition power is removed the device could gracefully go into sleep mode to conserve power.
- For a device that is line powered, but with a battery, it could gracefully shut down, and resume operations when power was restored. This is good for gracefully handling power outages, for example.


## Special power cases

### Vehicle power

- 12 V vehicle power is the correct voltage, however the voltage spikes that occur can damage devices such as the Boron, E-Series, and Electron if connected directly to the vehicle supply. 
- A [sample power supply designed for vehicles](/hardware/power/vehicle-power/).
- For devices that do not accept 12V (Argon, Photon, Photon 2), using this power supply is also an option.
- Alternatively, you may want to use an off-the-shelf vehicle to USB adapter. 
- If you are using a 2G/3G cellular device, and are not using a LiPo battery, a USB power supply may be appropriate if you want an off-the-shelf solution. You may have to change the input current limit, and/or try different power adapters to get a working combination.

### PoE

- An example design is the [Particle PoE adapter](https://github.com/particle-iot/ethernet-wing) (discontinued). It used a Silvertel Ag9905M PoE module to convert PoE to 5 VDC at 1800 mA.
- As long as you can supply 500 mA (for Wi-Fi and LTE Cat M1 devices) or 2 A (for 2G/3G devices), you can use most PoE adapters.
- If you are using a 2G/3G device with a bq24195 and not using a battery, you will need to change the input current limit to the maximum.


## PM-BAT power module

In order to simplify a design using the bq24195 PMIC, MAX 17043 fuel gauge, and appropriate voltage regulators, the [PM-BAT](/hardware/power/pm-bat-datasheet/) module can be used to greatly simplify your design. It can be inserted into 0.1" female headers on your board, or directly soldered using the castellated pads on the bottom of the module.

## By device

### Boron

The Boron (Adafruit Feather form-factor) includes the following power inputs:

- USB Micro B
  - When used with the Boron 2G/3G models (BRN314/BRN310), the USB connector does not supply enough current to connect to cellular without a LiPo battery with the default settings.
  - Adjusting the input current limit and using a 2A tablet charger may be sufficient to connect, however we still recommend including a battery.
- LiPo battery connector (JST-PH)
- Li+ pin (Feather). See [Li+](#li-battery-connector-), above.
- VUSB pin (Feather)
  - The VUSB pin can be used to power the device. To comply with the Adafruit Feather specification, this should be 5V.
  - However on the Boron (not Argon), you can supply a up to 17V this pin if you do not have other Featherwing devices that require 5V on VUSB.
  - If you need compatibility with the Argon and Photon 2, limit VUSB to 3.6V to 5.5V as a power input.


### M-SoM

- The M-SoM does not include a built-in voltage regulator or PMIC.
- If you wish to support using battery power, the [PM-BAT](/hardware/power/pm-bat-datasheet/) power module is recommended.

#### VCC - M-SoM

VCC is used to supply power to the cellular module. The recommended input voltage range on this pin is between 3.6V to 4.2V DC. This can be connected directly to a 3.7V LiPo battery. Make sure that the supply can handle currents of at least 2 A.

If you are not using a battery, or using a battery of a different voltage, you should use a regulator to supply 3.7V to 4.2V at 2A. You may want to add additional bulk capacitors to handle the short, high current peak usage when the cellular modem is transmitting.

#### 3V3 - M-SoM

3V3 is used to supply power to RTL8722 MCU, logic ICs, memory, etc.. Make sure that the supply can handle a minimum of 500 mA.

These limits do not include any 3.3V peripherals on your base board, so that may increase the current requirements.

{{!-- BEGIN shared-blurb b7c36aca-bdfe-463c-b901-53a3aeec8ab0 --}}
Power supply requirements:
- 3.3V output
- Maximum 5% voltage drop
- 100 mV peak-to-peak ripple maximum
- 500 mA minimum output current at 3.3V recommended for future compatibility
- Maintain these values at no-load as well as maximum load
{{!-- END shared-blurb --}}


{{!-- BEGIN shared-blurb 356da82a-95ad-401e-a26b-216d120c45d9 --}}
In some cases, it may be necessary to add a supervisory/reset IC, such as the Richtek RT9818C or SG Micro SGM809-RXN3L/TR:

- If your power supply has a slew rate from 1.5V to 3.0V slower than 15 ms, a reset IC is required.
- If your power supply at power off cannot be guaranteed to drop below 0.3V before powering back up, a reset IC required.

See [supervisory reset](#supervisory-reset), below, for additional information.
{{!-- END shared-blurb --}}



### B-Series SoM

- The B-Series SoM does not have a built-in voltage regulator or PMIC. 
- If you add your own bq24195, it will behave as the Boron.
- We recommend having two separate regulators for the B-Series SoM, one at 3.3V and one at 3.7V. This can either be a single dual regulator, or two separate regulators.
  - 3.3V at 150 mA (minimum). Supply more current if you have 3.3V peripherals on your base board. 500 mA or more is recommended for future compatibility.
  - 3.7V at 2A. While the B404X/B404/B402 only require 500 mA, having additional power assures compatibility with other modules in the future.

### P2

- The P2 does not have a built-in voltage regulator or PMIC. 
- It requires 3.3V at 500 mA.

{{!-- BEGIN shared-blurb b7c36aca-bdfe-463c-b901-53a3aeec8ab0 --}}
Power supply requirements:
- 3.3V output
- Maximum 5% voltage drop
- 100 mV peak-to-peak ripple maximum
- 500 mA minimum output current at 3.3V recommended for future compatibility
- Maintain these values at no-load as well as maximum load
{{!-- END shared-blurb --}}


{{!-- BEGIN shared-blurb 356da82a-95ad-401e-a26b-216d120c45d9 --}}
In some cases, it may be necessary to add a supervisory/reset IC, such as the Richtek RT9818C or SG Micro SGM809-RXN3L/TR:

- If your power supply has a slew rate from 1.5V to 3.0V slower than 15 ms, a reset IC is required.
- If your power supply at power off cannot be guaranteed to drop below 0.3V before powering back up, a reset IC required.

See [supervisory reset](#supervisory-reset), below, for additional information.
{{!-- END shared-blurb --}}


### Argon and Photon 2

The Argon (Adafruit Feather form-factor) includes the following power inputs:

- USB Micro B, 500 mA required.
- LiPo battery connector (JST-PH)
- Li+ pin (Feather). See [Li+](#li-battery-connector-), above. 
- VUSB pin (Feather)
  - The VUSB pin can be used to power the device. To comply with the Adafruit Feather specification, this should be 5V.
  - You can supply 3.6V to 5.5V if you do not have other Featherwing devices that require 5V on VUSB.

### Tracker SoM

The Tracker One includes the following power inputs on the module:

- VIN, 3.9V to 17V.
- Li+, 3.6V to 4.4V. Normally connected to a LiPo battery, but can also be used as a power supply input with certain restrictions, see above.
- VBUS, 5V. If you are using the USB port, this must be connected to the USB 5V power line. If there is no power on VBUS, the nRC52 MCU powers down the USB block and the USB functions cannot be used.

On the Tracker SoM, 3V3 can only be used as a power output, not a power input. Maximum load is 800 mA.

### Tracker One

The Tracker One includes the following power inputs:

- LiPo battery (inside sealed case)
- USB C
- M8 connector (6.0 to 30 VDC at 2A)


### E-Series

- VIN, 3.88V to 17V.
- Li+, 3.6V to 4.4V. Normally connected to a LiPo battery, but can also be used as a power supply input with certain restrictions, see above.
- VDDA. This is the 3.3V supply to the analog portion of the STM32. This pin must be powered, or the STM32 will not boot, even if you do not use the ADC inputs. Normally you should connect this to 3V3, which is the 3.3V power output. 
- VBAT, 1.65 to 3.6V. This powers the real-time clock and retained memory if VIN or Li+ are not powered. Normally you just connect this to 3V3, however you could use an external Lithium coin cell battery or supercap. See [VBAT](#vbat), above.

On the E-Series, 3V3 can only be used as a power output, not a power input.

### Electron

The Photon includes the following power inputs:

- USB Micro B, 500 mA required.
- VIN, 3.6V to 5.5V at 500 mA.
- VBAT, should not be connected as it's internally connected to 3V3.

On the Electron, 3V3 can only be used as a power output, not a power input.

### Photon

The Photon includes the following power inputs:

- USB Micro B, 500 mA required.
- VIN, 3.6V to 5.5V at 500 mA.
- 3V3, 3.3V power input or output.
- VBAT, real-time clock and retained memory. See [VBAT](#vbat), above.


### P1

- The P1 does not have a built-in voltage regulator or PMIC. 
- It requires 3.3V at 500 mA.

## Batteries

### Compatible batteries

- The standard Particle LiPo is 1800 mAh at 3.7V = 6.66 Wh.
- The largest commonly available LiPo of this style is 6600 mAh at 3.7V = 22.2 Wh
- There are larger multi-cell LiPo batteries, typically made from 18650 cells, that can be connected to the Particle Li+ connector and are compatible with the built-in charger, but the built-in fuel gauge (MAX17043) is not compatible with these batteries so state-of-charge (SoC) information will not be accurate.

There are several criteria that must be met in order to use a battery with your Particle device:

- Nominal voltage. Different devices have different power ranges, and this can affect the type of battery you can use. Cellular devices generally work best with batteries of a nominal voltage of 3.7V to 4.4V.
- Discharge curve. Different battery chemistries have different characteristics during discharge. At some point, every battery will fall below the minimum allowed for your device, but this is not always linear with battery capacity.
- Maximum voltage. Note that some batteries may have a voltage higher than their nominal voltage when fully charged. Make sure this does not exceed the limits of your device. If you use a rechargeable battery with an external charger, also be aware of the charge voltage, which is typically higher than the nominal voltage.
- Capacity. How much energy is stored in the battery, measured in amp-hours (Ah) at the nominal voltage, or watt-hours (Wh), which is the amp-hours multiplied by the voltage.
- Maximum discharge rate. Many batteries have maximum rate that they can be discharged. This is important because 2G/3G cellular devices can draw up to 2A at 3.7V, which not all batteries can supply.
- Temperature. There may be different temperatures for operating, charging, and storage temperatures.

#### Example

For example, [this Adafruit battery](https://www.adafruit.com/product/5035) looks to be compatible. 

> Nominal Capacity
> - Minimum: 9500mAh
> - Typical: 10050mAh Standard discharge （0.2C) after Standard charge

This looks good. It's significantly larger than the 1800 mAh Particle LiPo.

> Nominal Voltage 3.7V

This is good. It matches the Particle battery and above the minimum required for the Li+ pin of 3.6V.

> Charging Cut-off Voltage 4.2V

This matches the Particle battery charge voltage. The bq24195 PMIC can be programmed to use different charging voltages, within a small range typical for LiPo batteries.

> Discharge Cut-off Voltage 2.5V

LiPo batteries have a circuit that disconnects the output when the voltage drops below a certain level, as the battery can be damaged if discharged to zero. In practice, when the voltage drops below 3.6V the cellular modem will be adversely affected and below 3.0V the MCU will likely turn off, so you probably won't reach this voltage.

> Maximum Constant Charging Current 3000mA

The bq24195 PMIC has a charge current limit of 1500 mA, however charging is typically limited to lower values by the input current limit and software settings. This battery can be safely charged by the Particle device, but it will take longer than the listed charge time of 8 hours because the charge current will lower.

> Maximum Continuous Discharging Current 3000mA

The maximum Particle device discharge current is 2000 mA for 2G/3G cellular, and 500 mA for most other devices, so this is fine.

> Operating Temperature Charge 0～4°C

By default, devices other than the Tracker do not limit charging by temperature. If you plan on using the device below 0°C or above 45°C with this battery, you should turn charging on or off based on temperature.

> Discharge –20～60°C

This temperature range is larger than most Particle devices so this battery should be acceptable.

Note, however, that this is a multi-cell LiPo battery. While it can be charged by the Particle device, the fuel gauge (MAX17043) is not compatible with this battery! Thus the state-of-charge (SoC) information will not be accurate. The fuel gauge chip won't be damaged, but it won't be accurate.

Also note that the wiring of the JST-PH is not standardized! While Adafruit and Sparkfun batteries are wired the same as Particle batteries, this is not the case for many batteries you can purchase on Amazon, eBay, or AliExpress. See the [battery guide](/hardware/power/batteries/) for more information.

### Other battery types

It is possible to use an external battery of a type other than the Li-Po battery used with most Particle device, however there are several caveats:

- The built-in charger will most likely not be usable and you'll need an external charger.
- The built-in fuel gauge will not be able to monitor your external non-Li-Po battery, so if you need to know the state-of-charge you'll need circuitry to measure it.

You need to select the appropriate device power input, which may be one of:

- VIN. Has the largest input voltage range on most devices.
- Li+. Has a very limited input range, but is the most efficient, especially when using sleep modes. You need to disable charging in software.
- USB. An external battery pack with USB output can be used, but beware of sleep modes. Some USB battery packs will turn off if the current being drawn is very low, and sleep mode is typically in the low range. Be sure to test that your power pack does not turn off if you use sleep modes.


### Disposable batteries (primary cells)

As a general rule, off-the-shelf disposable batteries such as AA or 9V batteries are a poor choice for powering Particle devices.

#### AA batteries

A single AA alkaline battery (zinc-chloride) has a nominal voltage of 1.5V and a capacity of 1700 mAh to 2850 mAh. Most devices have a minimum supply voltage of 3.6V so you would need a minimum of 3 batteries in series. 2500 mAh at 1.5V x 3 = 11.25 Wh. While greater than the standard Particle LiPo, this is only enough energy to run most cellular devices for a few days without using sleep modes, or longer if you sleep most of the time.


#### 9V Batteries

A single 9V alkaline battery has a typical capacity of 550 mAh at 9V, or 4.95 Wh, less than the capacity of the Particle LiPo. This should power most cellular devices for around 18 hours without using sleep modes, or longer with sleep modes.

The other issue with 9V batteries is that the voltage would require powering by VIN as the voltage exceeds the Li+. However 9V on VIN is only possible on cellular devices with the bq24195 PMIC. Devices such as the Argon and Photon cannot directly accept 9V and an additional voltage regulator would be required.

When using sleep modes, using the VIN input is less efficient than the Li+. When using Li+, the internal buck regulator in the bq24195 is bypassed. When using VIN, the regulator must be used and it has some loss. The loss is miniscule compared to the current used by the cellular mode, but in sleep mode the loss can become noticeable.

While there isn't a standard maximum discharge rate for 9V batteries, the datasheet for the [Energizer 522](https://data.energizer.com/pdfs/522.pdf) battery shows that even at a 50 mA discharge, the battery capacity (mAh) is significantly lowered. A LTE Cat M1 device could draw that as an average, and during cellular transactions ten times that (500 mA), which is clearly above the intended use for this battery.


#### LiSOCl2 Batteries

LiSOCl2 (Lithium Thionyl Chloride) primary cell batteries are not generally recommended for cellular devices because the nominal voltage of 3.5V is below the minimum recommended voltage for the cellular modem of 3.6V. 

These batteries are typically 3.5V 19000 mAh in a D-size battery package. It is possible to use two in series connected to VIN on most cellular devices, though this is less efficient if the device is asleep most of the time. The batteries are also quite expensive, and cannot be picked up in most stores.

### Supervisory reset

{{!-- BEGIN shared-blurb c57e3927-686d-4a58-9a39-cd60a1ebc0bd --}}

In many cases, it may be desirable to include a supervisory reset IC in your design. The design below is from
the Photon 2 and uses the small and inexpensive Richtec RT9818C. This chip will hold the MCU in reset until there 
is sufficient voltage to successfully boot. This can be helpful if your power supply cannot guarantee a sufficient slew
rate.

![](/assets/images/m-series/p2-reset.png)

Of note in this design, the VDD pin of the RT9818C is connected to 3V3. The design is configurable by 
moving a zero-ohm resistor to disable supervisory reset (by connecting to GND) or to use VIN. Note that the
RT9818C has a maximum input voltage of 6V which is compatible with the Photon 2. Keep this in mind if using VIN
on designs that have larger VIN voltages.

Of course you can simply wire VDD to 3V3 instead of including the configurable resistors.
{{!-- END shared-blurb --}}
