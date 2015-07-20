---
title: Troubleshooting
template: support.hbs
columns: two
devices: [ photon, core ]
order: 4
---

#Common Troubleshooting Tips and References


## Subsystems

### Microcontroller

![STM32](/assets/images/core-stm32.jpg)

Spark Core v1.0 uses the STM32F103CB - ARM 32-bit Cortex M3 based - microcontroller for its brain power. You can download the datasheet [here.](https://github.com/spark/core/blob/master/Datasheets/ST_STM32F103CB.pdf)

Some of its key features are as follows:

- ARM 32-bit Cortex™-M3 CPU Core
- 72Mhz operating frequency, 1.25 DMIPS/MHz (Dhrystone 2.1)
- 128KB of Flash memory
- 20KB of SRAM
- 12 bit ADC
- USB 2.0 full-speed interface
- USART, SPI and I2C interfaces
- JTAG Debug mode



### Wi-Fi module

![CC3000](/assets/images/core-cc3000.jpg)

Core v1.0 uses TI's CC3000 module for the WiFi communications.

Some of the key features of the CC3000 module are as follows:

- IEEE 802.11 b/g compliant
- Radio Performance
   - TX power: +18.0 dBm at 11 Mbps, CCK
   - RX sensitivity: – 88 dBm, 8% PER, 11 Mbps
- Operating temperature: – 20° C to 70° C
- Wireless security subsystem
   - WEP
   - WPA Personal
   - WPA2 Personal
- FCC, IC, and CE certified with a chip antenna
- SPI host interface

The datasheet is available [here.](http://www.ti.com/lit/ds/symlink/cc3000.pdf)


### External FLASH

![External Flash](/assets/images/core-flashchip.jpg)

In addition to having 128KB of internal flash memory for storing the firmware, the Core also features an external SPI based flash memory chip - [SST25VF016B](https://github.com/spark/core/blob/master/Datasheets/MicrochipTech_SST25VF016B-75-4I-S2AF-T.pdf?raw=true). This memory space (a total of 2MB) is used to store the factory reset firmware, a back up firmware, a copy of the firmware sent during Over The Air (OTA) update and the keys. Part of the space is also available to the user who can use it to store log data, user parameters, etc. A detailed description of the memory mapping can be found further down this document in the [memory mapping section.](#spark-core-datasheet-memory-mapping)

Since the flash memory is non-volatile, it retains the data even after turning off the power. According to the manufacturer of the chip, the data retention of this memory is greater than 100 years, which we reckon should be good enough for now. Also, note that the maximum read-write endurance is limited to 100,000 cycles. meh.

### Power regulator

![Power Regulator](/assets/images/core-regulator.jpg)

The entire Core, including all of the on board peripherals run at 3.3V DC. So, in order to power the Core from the USB port or an external power supply, we need to *downconvert* the voltage before feeding it into the Core. We went through a couple of iterations before choosing Microchip's [MCP1825S-3302E](http://ww1.microchip.com/downloads/en/devicedoc/22056b.pdf) power regulator which comfortably meets the specs.

Some of its key features are:

- 500mA output current
- Input voltage range of 3.6 to 6.0V (for 3.3V output)
- Low Dropout (LDO) voltage of 210mV at 500mA
- SOT-223 package that sits nicely on the other side of the USB connector. The connector also acts as an additional heat sink.
- Short Circuit Current Limiting and Overtemperature Protection

This means, you can power the Core via the USB port or via the VIN pin from an external power supply that can range from 3.6V to 6.0V DC. Ideal sources of power can be: 3.6V LiPo battery, 4AA battery pack, backup USB battery or an USB wall charger.

![Powering the Core](/assets/images/core-power.jpg)
