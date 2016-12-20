# Power Shield

The Power Shield, as the name implies, allows the Particle device to be powered from different types of power sources. The shield has an intelligent battery charger and power management unit along with a wide input voltage regulator and an I2C based fuel-gauge. You can power a Particle device with either a USB plug or a DC supply of anywhere from 7 to 20VDC and charge a 3.7V LiPo battery all at the same time. 

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield.png)

The system switches in between the different power sources automatically, reducing the charge and discharge cycle stress on the battery. The fuel gauge allows you to monitor the battery's state-of-charge (SOC), allowing it to notify the user remotely and take preemptive actions when necessary.

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-dimensions.png)

**Specifications:**
 - Operating voltage: USB or External DC of 7 to 20V
 - Current consumption: 
 - Dimensions: 
 - Weight: 

//Circuit Diagram
//Product Photo with description

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-photon-plugged.png)

The shield is setup so that when powered from the USB port as well as from a DC supply, it chooses the DC source over USB. The charge current is set to 500mA when charging from USB and set to 1A when charging from a DC source.

![](https://github.com/spark/photon-shields-docs/blob/master/power-shield/power-shield-powersupply.png)
