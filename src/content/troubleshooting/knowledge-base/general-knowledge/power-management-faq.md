---
title: Power Management FAQ
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
When considering the deployment of your Particle IoT device it is important to consider how it will be powered and if powered via battery, recharged.

In most cases changing the parameters of the PMIC (Power Management Integrated Circuit) will not be necessary or even recommended, but **in power-related use-cases outside of the conventional VIN / Particle LiPo configuration (e.g. a solar-powered deployment), attention to the PMIC in firmware can be critical.** 

The following article is divided into 4 sections:

* [Key Concepts](https://support.particle.io/hc/en-us/articles/1260803794770#key-concepts)
* [Resetting The PMIC](https://support.particle.io/hc/en-us/articles/1260803794770#resetting-the-pmic)
* [En/Disabling Charging](https://support.particle.io/hc/en-us/articles/1260803794770#en-disabling-charging)
* [Low Power Use-Cases](https://support.particle.io/hc/en-us/articles/1260803794770#low-power-use-cases)

## Key Concepts

Please review the code example below.

```cpp
void setup()  
{  
  SystemPowerConfiguration conf;  
  conf.powerSourceMaxCurrent(900)  
      .powerSourceMinVoltage(3880)  
      .batteryChargeCurrent(896)  
      .batteryChargeVoltage(4112)  
  int res = System.setPowerConfiguration(conf);  
  // returns SYSTEM_ERROR_NONE (0) in case of success  
}
```

_\* Please note that the setting above are persistent and once set on a device, will remain until either changed or reset. If your device is not behaving as expected; you should attempt a reset._

The four settings from the above example that demand attention are highlighted below by use-case:

### Source(USB/5V adaptor/Solar panel):

* `powerSourceMaxCurrent` \- The maximum current the device can pull from the source.  
These are the available current limits:

100, 150, 500, 900, 1200, 1500, 2000, 3000 - The PMIC will set closest usable value.

* `powerSourceMinVoltage` \- The minimum voltage at which current is available (useful for Solar panels):

3880-5080 in increments of 80(mV).

### Battery (LiPo battery):

* `batteryChargeCurrent` \- The current at which the battery will be charged.

100, 150, 500, 900, 1200, 1500, 2000 - The PMIC will set closest usable value.

* `batteryChargeVoltage` \- The termination voltage at which the device will cease charging the battery. In hot environments a lower voltage is recommended.

4110 or 4210

  
**Note:** Beginning with the release of Device OS 1.5.x, and with further improvements in Particle's LTS branch (2.x, also applicable to 3.x), Particle introduced a new Power Manager ([link](https://docs.particle.io/reference/device-os/firmware/boron/#power-manager)). The previous PMIC API ([link](https://docs.particle.io/reference/device-os/firmware/boron/#pmic-power-management-ic-)) will be phased out moving forward.

## Resetting The PMIC

In some cases errant settings or misconfigurations can cause undesired behavior. The code below will reset the PMIC to its default values.

### When troubleshooting power-related issues, taking care to perform a PMIC reset is a useful and necessary step prior to initiating contact with our Support team.

void setup()  
{  
  System.setPowerConfiguration(SystemPowerConfiguration());  
}

### 

##   
**En/Disabling Charging** 

Currently (as of DeviceOS 2.0.1) the Power manager cannot enable or disable charging.

To do so one needs to call the old PMIC API.

To call the PMIC API it ideally needs to be wrapped inside a function to avoid interference from the Power Manager.

void turnOffCharging()  
{  
  PMIC **pmic**(true); _//Calling it with true locks it to the user code_  
  pmic.disableCharging();  
}

  
## Low Power Use-Cases

When a device is running solely on battery power it needs to conserve power. The new Sleep API (link) is the best way to achieve this, if paired with an efficient publishing schema. We will release documentation optimized for low-power use-cases in the future, but in the meantime please see the following considerations for low-power deployments:

* The PMIC will not enter a low-power state if powered from the USB port or VUSB. Quoted power draw has been calculated with the device powered at 3.7V from the Li+ pin.
* Prior to Device OS 1.5.2/2.x, Sleep mode will not operate as expected and current draw can in fact increase during Sleep. We encourage all customers to upgrade to our latest LTS Device OS version (2.x) in order to avail oneself of the advancements to our Sleep implementation.
* Battery chemistry and configuration is important. Primary (alkaline AAs for ex.) cells have a long shelf life and excellent capacity, but their constant draw is low and they have limited peak current capabilities. Lithium batteries have a much higher self-discharge rate and should not be drained too low.
