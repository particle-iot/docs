Spark Core Datasheet
===

Subsystems
---

### Microcontroller

Spark Core v1.0 uses the STM32F103CB - ARM 32-bit Cortex M3 based - microcontroller for its brain power. You can download the datasheet [here.](https://github.com/spark/core/blob/master/Datasheets/ST_STM32F103CB.pdf)

```
HIGHLIGHTED IMAGE OF THE CHIP ON THE CORE
```

### Wi-Fi module

Core v1.0 uses TI's CC3000 module of the WiFi communications.

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

```
HIGHLIGHTED IMAGE OF THE CHIP ON THE CORE
```

### External FLASH

In addition to having 128Kb of internal flash memory for storing the firmware, the Core also features an external SPI based flash memory chip - [SST25VF016B](https://github.com/spark/core/blob/master/Datasheets/MicrochipTech_SST25VF016B-75-4I-S2AF-T.pdf?raw=true). This memory space is used to store the factory reset firmware, a back up firmware, a copy of the firmware sent during Over The Air (OTA) update and the keys. Part of the space is also available to the user who can use it to store log data, user parameters, etc. A detailed description of the memory mapping can be found futher down this document in the [memory mapping section.](http://spark.github.io/docs/#spark-core-datasheet-memory-mapping)

Since the flash memory is non-volatile, it retains the data even after turning off the power. According to the manufacturer of the chip, the data retention of this memory is greater than 100 years, which we reckon should be good enough for now. Also, note that the maximum read-write endurance is limited to 100,000 cycles. meh.

```
HIGHLIGHTED IMAGE OF THE CHIP ON THE CORE
```

### Power regulator

The entire Core, including all of the on board peripherals run at 3.3V DC. So, in order to power the Core from the USB port or an external power supply, we need to *downconvert* the voltage before feeding it into the Core. We went through a couple of iterations before choosing Microchip's [MCP1825S-3302E](http://ww1.microchip.com/downloads/en/devicedoc/22056b.pdf) power regulator which comfortably meets the specs.

Some of its key features are:  

- 500mA output current
- Input voltage range of 3.6 to 6.0V (for 3.3V output)
- Low Dropout (LDO) voltage of 210mV at 500mA
- SOT-223 package that sits nicely on the other side of the USB connector. The connector also acts as an additional heat sink.
- Short Circuit Current Limiting and Overtemperature Protection

This means, you can power the Core via the USB port or via the VIN pin from an external power supply that can range from 3.6V to 6.0V DC. Ideal sources of power can be: 3.6V LiPo battery, 4AA battery pack, backup USB battery or an USB wall charger.

```
HIGHLIGHTED IMAGE OF THE CHIP ON THE CORE
```

### RF circuit

The RF circuit is probably where we spend the most time on during hardware design. RF design is like voodoo black magic and so we sought guidance from the industry experts before finalizing the component values and placement.

You can download a copy of the RF test report [here.]()  

RF Performance Specs:

- add here

```
HIGHLIGHTED IMAGE OF THE RF CIRCUIT ON THE CORE
```
Pins and I/O
---

### Digital pins
### Analog pins
### Serial (UART)
### SPI
### I2C
### JTAG


Memory mapping
---

Electrical characteristics
---

### Power
### RF
### Minimums and maximums

Physical layout
---
