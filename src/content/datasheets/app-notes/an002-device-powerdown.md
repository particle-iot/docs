---
title: AN002 Device Powerdown
layout: commonTwo.hbs
columns: two
---
# AN002 Device Powerdown

This application note shows how to have an Electron, E Series, or Boron gracefully power down under battery power when the power supply is disconnected then automatically power up when restored. This can be useful in automotive applications or devices powered by a switch in mains power applications.

The idea works like this:

- Periodically from `loop()`, you check the `pmic.isPowerGood()` function. When it returns false, there is no longer power on USB or VIN and you're running off the LiPo battery.
- When occurs, you gracefully shut down the cloud connection and modem.
- Then you use `pmic.disableBATFET()`. The BATFET is the MOSFET transistor that's connects the battery to the PMIC. When disabled, the battery is essentially disconnected and won't discharge.
- Since there is no longer external or battery power, the device will shut down.
- When external power is supplied again, the device will boot.
- Early in setup(), before connecting to the cloud, the BATFET is turned back on again so the battery can supplement the external power and also can be charged. This is done using `pmic.enableBATFET()`.


Full Code:

{{> codebox content="/assets/files/app-notes/AN002/firmware/powerdown.cpp" format="cpp" height="500"}}


Author: Rick