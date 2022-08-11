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

- LTE Cat M1 cellular devices (Boron LTE, B404X/B404/B402, Tracker SoM T404/T402, E Series LTE, Electron LTE) also only require 500 mA at 5 VDC.

- 2G/3G cellular devices may require up to 2 A at 5 VDC, which can lead to some complexities, as described below.

## Typical device power inputs

### USB Power

- Most devices have a Micro USB B connector for supplying USB power to the device.

- The Tracker One and Tracker SoM eval board have a USB C connector instead.

- By default, most USB 1, 2, and USB 3 ports can supply up to 500 mA at 5 VDC. 

- A few specialty ports like those on keyboards sometimes only support 100 mA and these should not be used to power Particle devices.

- Cellular devices have a PMIC that supports USB DPDM to negotiate the power requirements with the USB hub, allowing it to negotiate higher current with some USB hubs.

- Some tablet chargers support 2 A power without using DPDM; these can also be used.


### VIN/VUSB (external supplies)

- All devices have the ability to power from a non-USB power pin.

- The allowable voltage range and current varies by device, see the list below.


### Li+ (battery connector)

- Many devices have a JST-PH connector for a Li-Po battery.

- They may also have a separate LI+ that is connected to the same place.

- For cellular devices with a PMIC (Boron, Tracker, E Series, Electron), this can be used to power the device with an external supply in some specific conditions, see the PMIC section below.

### VBAT

- This is only applicable to the Photon and E Series, and is used to back up the real-time clock and retained memory when removing USB or VIN power. You can connect a Lithium coin cell or a supercap to this pin.

- There is an Electron pin labeled VBAT but it should not be used because it's tied to 3V3 on the Electron with a 0-ohm resistor.



## bq24195 PMIC guide

### Charge current

The charge current is limited by the charge current limit, as well as the input current limit.

### Input current limit

The input current is limited by:

- The software setting 

- DPDM, if connected to a hub or power adapter that supports DPDM

- A hardware maximum set by the ILIM resistor

### DPDM

DPDM is the protocol over the USBDATA+ and USBDATA- lines for determining the maximum current that the hub can supply. The input current limit is further limited to this value to prevent putting more load on the USB bus than it can supply.

Note that if you are not using DPDM, such as from using the VIN external power input or a tablet charger that does not support DPDM, the input current limit will be determined only by the software settings and ILIM hardware current limit.

### Voltage input range

We recommend limiting the input voltage on bq24195 devices to 12 VDC. However, the PMIC does allow operation up to 17 VDC. Thus you can use a somewhat higher limit if needed.

Note, however, that in automotive uses-cases, vehicle power supplies may have surges that exceed 17 volts, so you should include extra protection.

The Tracker One includes a bq24195 but has a higher current limit because it includes an additional power supply in front of the bq24195 input.

### Battery charging

### Using Li+ as a power input

### Shipping mode

### External power detection mode


## By Device

### Summary

| Device | PMIC | USB Power | VIN | Current | Notes |
| :--- | :---: | :---: | :---: | :--- | :--- | 
| Boron BRN404X/BRN404/BRN402 | &check; | &check; | 5V (3.8V to 12V in some cases<sup>1</sup>) | 500 mA | |




<sup>1</sup>The VUSB/VIN pin is nominally 5 VDC by the Adafruit Feather specification. However, if you are not using Feather accessories that use VUSB, it is possible to supply 3.8 VDC to 12 VDC to this pin. 

### Boron



### B Series SoM

- The P2 does not have a built-in voltage regulator or PMIC. 

### P2

- The P2 does not have a built-in voltage regulator or PMIC. 
- It requires 3.3V at 500 mA.

### Argon


### Tracker SoM

### Tracker One


### E Series

### Electron

### Photon


### P1

- The P1 does not have a built-in voltage regulator or PMIC. 
- It requires 3.3V at 500 mA.



## Special power cases

### Vehicle power

- 12 V vehicle power is the correct voltage, however the voltage spikes that occur can damage devices such as the Boron, E Series, and Electron if connected directly to the vehicle supply. 
- A sample power supply designed for vehicles shown in xxx.
- For devices that do not accept 12V (Argon, Photon, Photon 2), using this power supply is also an option.
- Alternatively, you may want to use an off-the-shelf vehicle to USB adapter. 
- If you are using a 2G/3G cellular device, and are not using a LiPo battery, a USB power supply may be appropriate if you want an off-the-shelf solution. You may have to change the input current limit, and/or try different power adapters to get a working combination.

### PoE

- An example design is the Particle PoE adapter (discontinued). It used a Silvertel xxx PoE module to convert PoE to xxx VDC.
- As long as you can supply 500 mA (for Wi-Fi and LTE Cat M1 devices) or 2 A (for 2G/3G devices), you can use most PoE adapters.
- If you are using a 2G/3G device with a bq24195 and not using a battery, you will need to change the input current limit to the maximum.
