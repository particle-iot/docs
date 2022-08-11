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

- LTE Cat M1 cellular devices (Boron LTE BRN404X/BRN404/BRN402, B404X/B404/B402, Tracker SoM T404/T402, E Series LTE E404/E402, Electron LTE ELC402) also only require 500 mA at 5 VDC.

- 2G/3G cellular devices may require up to 2 A at 5 VDC, which can lead to some complexities, as described below.

## Typical device power inputs

### USB Power

- Most devices have a Micro USB B connector for supplying USB power to the device.

- The Tracker One and Tracker SoM eval board have a USB C connector instead.

- By default, most USB 2 and USB 3 ports can supply up to 500 mA at 5 VDC. 

- A few specialty USB ports like those on keyboards sometimes only support 100 mA and these should not be used to power Particle devices.

- Cellular devices have a PMIC that supports USB DPDM to negotiate the power requirements with the USB hub, allowing it to negotiate higher current with some USB hubs.

- Some tablet chargers support 2 A power without using DPDM; these can also be used.


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

- For cellular devices with a PMIC (Boron, Tracker, E Series, Electron), this can be used to power the device with an external supply in some specific conditions, see the PMIC section below.

### VBAT

- This is only applicable to the Photon and E Series, and is used to back up the real-time clock and retained memory when removing USB or VIN power. You can connect a Lithium coin cell or a supercap to this pin.

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

- The software setting, [`powerSourceMaxCurrent()`](/reference/device-os/api/power-manager/powersourcemaxcurrent/).

- DPDM, if connected to a hub or power adapter that supports DPDM.

- A hardware maximum set by the ILIM resistor, 1590 mA on most devices.

#### powerSourceMaxCurrent

The [`powerSourceMaxCurrent()`](/reference/device-os/api/power-manager/powersourcemaxcurrent/) method sets the maximum current the power source can provide. 

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

- Are using sleep modes and sleeping mode of the time
- Not using the LiPo battery
- Your external supply could be configured to generate 3.7V at 2A

it may be advantageous to power by Li+ instead of VIN.

If Li+ is powered, it can supply VSYS (the output of the bq24195) without powering up the bq24195 internal buck regulator, which takes care of lowering the VIN voltage. There is some loss when this regulator is running. While the loss is minimal as a percentage of power in normal operating mode, it can become a significant percentage if using sleep mode most of the time.

If you use this technique, make sure you also disable charging, just in case the device is powered by USB.

### Shipping mode

Shipping mode allows the battery to be disconnected electronically so the discharge rate is minimal and the device can be left in this state for months without having to physically disconnect the battery. It also prevents the device from being turned on accidentally while in transit, such as by bumping a power button.

Only the Tracker One has built-in support for shipping mode, but all bq24195 devices can use this technique by disabling the BATFAT. 

An important consideration is that the only way to exit shipping mode is to supply external power, either by USB or VIN. It's not possible to exit shipping mode by time, button press, etc..

### External power detection mode

All bq24195 devices can detect whether they have external power or not. This can be useful in a number of cases, including:

- For vehicle powered devices, after the ignition power is removed the device could gracefully go into sleep mode to conserve power.
- For a device that is line powered, but with a battery, it could gracefully shut down, and resume operations when power was restored. This is good for gracefully handling power outages, for example.


## Special power cases

### Vehicle power

- 12 V vehicle power is the correct voltage, however the voltage spikes that occur can damage devices such as the Boron, E Series, and Electron if connected directly to the vehicle supply. 
- A [sample power supply designed for vehicles](/hardware/power/vehicle-power/).
- For devices that do not accept 12V (Argon, Photon, Photon 2), using this power supply is also an option.
- Alternatively, you may want to use an off-the-shelf vehicle to USB adapter. 
- If you are using a 2G/3G cellular device, and are not using a LiPo battery, a USB power supply may be appropriate if you want an off-the-shelf solution. You may have to change the input current limit, and/or try different power adapters to get a working combination.

### PoE

- An example design is the [Particle PoE adapter](https://github.com/particle-iot/ethernet-wing) (discontinued). It used a Silvertel Ag9905M PoE module to convert PoE to 5 VDC at 1800 mA.
- As long as you can supply 500 mA (for Wi-Fi and LTE Cat M1 devices) or 2 A (for 2G/3G devices), you can use most PoE adapters.
- If you are using a 2G/3G device with a bq24195 and not using a battery, you will need to change the input current limit to the maximum.


## By Device

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

### B Series SoM

- The B Series SoM does not have a built-in voltage regulator or PMIC. 
- If you add your own bq24195, it will behave as the Boron.
- We recommend having two separate regulators for the B Series SoM, one at 3.3V and one at 3.7V. This can either be a single dual regulator, or two separate regulators.
  - 3.3V at 150 mA (minimum). Supply more current if you have 3.3V peripherals on your base board. 500 mA or more is recommended for future compatibility.
  - 3.7V at 2A. While the B404X/B404/B402 only require 500 mA, having additional power assures compatibility with other modules in the future.

### P2

- The P2 does not have a built-in voltage regulator or PMIC. 
- It requires 3.3V at 500 mA.

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


### E Series

- VIN, 3.88V to 17V.
- Li+, 3.6V to 4.4V. Normally connected to a LiPo battery, but can also be used as a power supply input with certain restrictions, see above.
- VDDA. This is the 3.3V supply to the analog portion of the STM32. This pin must be powered, or the STM32 will not boot, even if you do not use the ADC inputs. Normally you should connect this to 3V3, which is the 3.3V power output. 
- VBAT, 1.65 to 3.6V. This powers the real-time clock and retained memory if VIN or Li+ are not powered. Normally you just connect this to 3V3, however you could use an external Lithium coin cell battery or supercap. See [VBAT](#vbat), above.

On the E Series, 3V3 can only be used as a power output, not a power input.

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

