---
title: Application Notes
layout: datasheet.hbs
columns: two
order: 2
---

# Application Notes

Technical application notes for hardware and software designs and best-practices are stored in the app-notes Github
repository:

[https://github.com/particle-iot/app-notes/](https://github.com/particle-iot/app-notes/)


## Highlighted App Notes

### Hardware Designs

- [AN001 Basic SoM Design](https://github.com/particle-iot/app-notes/tree/master/AN001-Basic-SoM-Design) is a simple SoM base board. 
Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes: RGB LED, bq24195 PMIC, MAX17043 Fuel Gauge, 
USB Connector, LiPo Connector (JST-PH), and M.2 SoM Connector.
- [AN006 Vehicle Power](https://github.com/particle-iot/app-notes/tree/master/AN006-Vehicle-Power) provides sample designs for powering Particle devices in vehicles.

### Programming techniques

- [AN002-Device-Powerdown](https://github.com/particle-iot/app-notes/tree/master/AN002-Device-Powerdown) shows how to 
have an Electron, E Series, or Boron gracefully power down under battery power when the power supply is disconnected 
then automatically power up when restored. This can be useful in automotive applications or devices powered by a switch 
in mains power applications.
- [AN005 Threading Explainer](https://github.com/particle-iot/app-notes/tree/master/AN005-Threading-Explainer) provides detailed information on using execution threads on Particle devices.
- [AN008 Using a Xenon with the Nordic SDK](https://github.com/particle-iot/app-notes/tree/master/AN008-Xenon-Nordic-SDK)

### Troubleshooting

- [AN003 Interpreting Cloud Debug](https://github.com/particle-iot/app-notes/tree/master/AN003-Interpreting-Cloud-Debug) shows how to 
interpret cloud debugging logs to troubleshoot various common issues.
- [AN004 Interpreting Cloud Debug-2](https://github.com/particle-iot/app-notes/tree/master/AN004-Interpreting-Cloud-Debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN007 Tower Info](https://github.com/particle-iot/app-notes/tree/master/AN007-Tower-Info) is a tool for location nearby cellular towers.

## Numerical List

- [AN001 Basic SoM Design](https://github.com/particle-iot/app-notes/tree/master/AN001-Basic-SoM-Design)
- [AN002 Device Powerdown](https://github.com/particle-iot/app-notes/tree/master/AN002-Device-Powerdown)
- [AN003 Interpreting Cloud Debug](https://github.com/particle-iot/app-notes/tree/master/AN003-Interpreting-Cloud-Debug) 
- [AN004 Interpreting Cloud Debug-2](https://github.com/particle-iot/app-notes/tree/master/AN004-Interpreting-Cloud-Debug-2) is a deep dive into interpreting cloud debug logs and cross-referencing the AT command guide for the u-blox modem.
- [AN005 Threading Explainer](https://github.com/particle-iot/app-notes/tree/master/AN005-Threading-Explainer) provides detailed information on using execution threads on Particle devices.
- [AN006 Vehicle Power](https://github.com/particle-iot/app-notes/tree/master/AN006-Vehicle-Power) provides sample designs for powering Particle devices in vehicles.
- [AN007 Tower Info](https://github.com/particle-iot/app-notes/tree/master/AN007-Tower-Info) is a tool for location nearby cellular towers.
- [AN008 Using a Xenon with the Nordic SDK](https://github.com/particle-iot/app-notes/tree/master/AN008-Xenon-Nordic-SDK)
