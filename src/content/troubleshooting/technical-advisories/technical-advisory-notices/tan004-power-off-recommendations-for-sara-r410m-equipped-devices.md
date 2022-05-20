---
title: TAN004 - Power-off Recommendations for SARA R410M-Equipped Devices
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Issue Summary

Particle has produced the following power-off procedure recommendations for Particle devices running u-blox SARA-R410M-02B modules. The u-blox SARA-R410M-02B is a component that is used in **Particle Electron, E Series, Boron, and B Series LTE Cat-M1 Devices**. Devices that ungracefully power off the SARA-R410M module, especially if done with great frequency, may be subject to a very rare but serious flash memory corruption issue with the u-blox modem. 

Abrupt (“ungraceful” - unhandled by firmware protocols) power removal from the above modem component may induce memory corruption that permanently disrupts normal function of the modem and prevents it from booting or connecting to the network. This issue primarily affects devices in low-power use cases (allowing their power sources to drain fully) and in use cases that abruptly remove power from the device. _Devices that do not fully deplete their batteries in an unhandled fashion or routinely ungracefully power off the modem have little to no risk of occurrence_. 

The recommendations detailed here are not bound to the same conditions (firmware version, manufacturing timeline) as the issue detailed in [TAN001 - SARA-R410M “124-Day](https://support.particle.io/hc/en-us/articles/360052556854-Errata-SARA-R410M-124-day-)”.

## Power-off Procedure Recommendations

Risk of u-blox corruption is generally very low, but observing the following recommendations can all but eliminate this possibility.

### Device OS

Device OS branches 2.1.0+ and 3.0.0+ implement safety checks to ensure the graceful poweroff of the modem upon direction by standard Device OS API Commands (`Cellular.off()`, `System.Sleep()`). 

These Device OS versions further introduce an API that queries the modem state (`bool Cellular.isOff()`), with which one can introduce application logic to facilitate safe removal from power. An example implementation of this particular API is strongly recommended prior to power removal:

Cellular.off();  
waitFor(Cellular.isOff, 30000); 

System firmware can be updated on affected devices using a standard OTA firmware update to Device OS [v.2.1.0, v3.0.0 or later](https://github.com/particle-iot/device-os/releases) using the following guidelines:

* If running an older version of Device OS, please ensure that you test your application on the updated version of Device OS prior to deploying the update.
* During the update, ensure that power to the device is not interrupted and the device is not put to sleep.
* Ensure that the device is within cellular range to complete over the air update.

### Recommendations by Use-Case

* **Low Battery States** \- battery-powered devices that allow their batteries to drain completely (or near completely) in an unchecked fashion are at _low_ risk for u-blox corruption. It is worth stating that devices in a frequent low-power/brownout states are already vulnerable to serious performance issues - including degraded connectivity, flash corruption, keys issues, etc....  
    
Devices powered by battery can monitor State of Charge via the FuelGauge Class of the DeviceOS API ([link](https://docs.particle.io/reference/device-os/firmware/boron/#fuelgauge)). Upon a given threshold, devices can power themselves down safely - for example using our Hibernate Sleep API ([link](https://docs.particle.io/reference/device-os/firmware/boron/#sleep-sleep-)). Particle recommends that LTE Cat-M1 devices self-power down at 5% SoC, unless there exist some power-hungry components on a given board that would exhaust that remaining charge in less than a few minutes. It is further recommended to keep the device powered down until charged to 5% or more, depending on power supply capability and overall power consumption of the device.
* **Abrupt Power Removal** \- devices without backup battery redundancy and connected only via VIN directly to a temporary power supply (e.g. vehicle) are at _moderate_ risk for modem corruption under two conditions: a) if there is no way to qualify when power is removed from the device (e.g. using the `Cellular.isOff()` API), b) if there is no buffering intermediary power source (e.g. a LiPo battery or supercapacitor).  
    
Using a backup battery or a supercapacitor that allows the device at least 30 seconds of power upon loss of the external power supply to gracefully power off the cellular modem using `Cellular.isOff()`and `Cellular.off()` APIs is recommended.

### Identifying Impacted Devices:

Particle devices with u-blox memory corruption resulting from ungraceful modem power-off will fail to connect and can exhibit characteristic LED status signals and trace logs.

 A Particle E-Series LTE device in this state will blink its LED dark blue and will report:  

INFO: SIM/modem not responsive or SIM not inserted/requires a PIN.

when producing trace logs (e.g. from [Cloud Debug](https://github.com/particle-iot/cloud-debug/releases)).

  
A Particle Boron LTE device in this state will blink its LED green and will report:

ERROR: No response from NCP

and/or

modem is not yet responding

_repeatedly (multiple times)_ when producing trace logs (e.g. from [Cloud Debug](https://github.com/particle-iot/cloud-debug/releases)). Please note that blinking green on a Particle Boron is a generic signal inclusive to all cellular connectivity problems - by no means should it be assumed that blinking green Borons have entered this state without the above trace log information.
