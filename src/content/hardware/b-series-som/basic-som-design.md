---
title: Basic SoM design
layout: commonTwo.hbs
columns: two
---
# {{title}}

This application note is a simple SoM base board. Like a Boron it can be powered by LiPo battery, USB, or an external DC supply. It includes:

- RGB LED
- bq24195 PMIC
- MAX17043 Fuel Gauge
- USB Connector
- LiPo Connector (JST-PH)
- M.2 SoM Connector

This is the basic set of features you'll probably want to include in a LiPo battery-powered design. The Evaluation Board is also a good reference to use. This design, however, is simple enough that it can be hand-assembled, though you still need a reflow oven and some of the parts (in particular the fuel gauge and PMIC) are tiny and there are a lot of them. 

This board a two-layer circuit board so it can be manufactured inexpensively and edited using the free version of Eagle CAD.

As this board doesn't really do much, you'll unlikely use it as-is, but you can use it as a tutorial for how to hook up the PMIC and fuel gauge.

![Whole Board](/assets/images/app-notes/AN001/whole-board.png)

There is another design in the [SoM first board tutorial](/hardware/b-series-som/som-first-board/) that includes additional information that will be useful for building your first board.

You can download the files associated with this app note [as a zip file](/assets/files/app-notes/AN001.zip).



## Board

![Board Features](/assets/images/app-notes/AN001/features.png)

1. bq24195 PMIC
2. XCL223 3.3V regulator
3. M.2 SoM connector
4. RGB LED, reset, and mode buttons
5. Micro USB connector
6. JST-PH battery connector
7. External power input (3.9V - 12V)
8. Charging LED
9. MAX17043 fuel gauge

![Board](/assets/images/app-notes/AN001/board.png)

While the pictures show a simple M3 screw and nut to hold down the SoM, the Eagle files have been updated with a proper standoff assembly. This is described in detail [here](/hardware/b-series-som/som-first-board/#hold-down-screw).

## Schematic

![M.2 and Basic Features](/assets/images/app-notes/AN001/sch3.png)

This is the M.2 connector, RGB LED, RESET and MODE buttons, and USB connector.

![bq24195](/assets/images/app-notes/AN001/sch2.png)

The bq24195 PMIC circuit. You can use a different PMIC, however you'll need to manage its settings yourself as Device OS can only configure this PMIC automatically. If this PMIC is not present, then it will assume you're managing your own PMIC, or you do not have one. For example, a device powered only by USB or disposable batteries would not need a PMIC.

![XCL223](/assets/images/app-notes/AN001/sch1.png)

The XCL223 3.3V regulator. This regulator is required when using 3.7V LiPo batteries because they can have a voltage as high as 4.2V during charging. With some other types of batteries that never exceed 3.6V at any time, you can omit this regulator as the nRF52840 can be used at up to 3.6V on the 3V3 pin.

![MAX17043](/assets/images/app-notes/AN001/sch4.png)

The MAX17043 fuel gauge. You can use a different fuel gauge, however as of Device OS 1.3.1, you cannot hook an alternate fuel gauge into the system so the battery reports correctly with device diagnostics. This is planned for the future.


## BOM

The bill of materials for this board is:

| Quan | Part | Example | Price | 
| :---: | --- | --- | ---: |
| 1 | 150Ω resistor 0603 | [Panasonic ERJ-3EKF1500V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF1500V/P150HCT-ND/198177) | | 
| 1 | 332Ω resistor 0603 | [Panasonic ERJ-3EKF3320V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF3320V/P332HCT-ND/198336) | | 
| 5 | 1K resistor 0603 | [Panasonic ERJ-PB3D1001V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PB3D1001V/P20283CT-ND/6214538) | | 
| 2 | 4.7K resistor 0603 | [Panasonic ERJ-PA3J472V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PA3J472V/P4.7KBZCT-ND/5036332) | | 
| 1 | 5.6K resistor 0603 | [Panasonic ERJ-3EKF5601V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-3EKF5601V/P5.60KHCT-ND/1746792) | | 
| 5 | 10K resistor 0603 | [Panasonic ERJ-PA3J103V](https://www.digikey.com/product-detail/en/panasonic-electronic-components/ERJ-PA3J103V/P10KBZCT-ND/5036237) | |
| 1 | 0.001 uF capacitor 0603 | [Murata GRM1885C1H102JA01D](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM1885C1H102JA01D/490-1451-1-ND/587655) | | 
| 1 | 0.047 uF capacitor 0603 | [Murata GCJ188R71H473KA12D](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCJ188R71H473KA12D/490-5854-1-ND/2785840) | | 
| 1 | 0.01 uF capacitor 0603 | [Murata GCM188R72A103KA37J](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GCM188R72A103KA37J/490-8028-1-ND/4380313) | | 
| 2 | 1 uF capacitor 0603 | [Samsung CL10B105KA8NNNC](https://www.digikey.com/product-detail/en/samsung-electro-mechanics-america-inc/CL10B105KA8NNNC/1276-1184-1-ND/3889270) | | 
| 2 | 4.7 uF capacitor 0603 | [Murata GRM188R60J475KE19J](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM188R60J475KE19J/490-6407-1-ND/3845604) | | 
| 7 | 10 uF capacitor 0805 | [Murata GRM21BR61C106KE15L](https://www.digikey.com/product-detail/en/murata-electronics-north-america/GRM21BR61C106KE15L/490-3886-1-ND/965928) | | 
| 1 | 2.2 uH inductor 1008 | [Bourns SRN2512-2R2M/](https://www.digikey.com/product-detail/en/bourns-inc/SRN2512-2R2M/SRN2512-2R2MCT-ND/4867759) | $0.31 | 
| 1 | RS1JFP Diode | [On Semiconductor RS1JFP](https://www.digikey.com/product-detail/en/on-semiconductor/RS1JFP/RS1JFPCT-ND/5722970) | $0.44 | 
| 1 | MAX17043 FuelGauge | [MAX17043X+T10](https://www.mouser.com/ProductDetail/Maxim-Integrated/MAX17043X%2bT10?qs=sGAEpiMZZMtKiEBa%2FXu9%252BOav9R4qKwGZ) | $3.09|
| 1 | bq24195 PMIC | [Texas Instruments BQ24195LRGER](https://www.digikey.com/product-detail/en/texas-instruments/BQ24195LRGER/296-49149-1-ND/9351369)| $2.93 | 
| 1 | XCL223 3.3V Regulator | [Torex XCL223A333D2-G](https://www.digikey.com/product-detail/en/torex-semiconductor-ltd/XCL223A333D2-G/893-1416-1-ND/8256118) | $2.63 |
| 2 | 4.5mm tactile switch | [E-Switch TL3305AF160QG](https://www.digikey.com/product-detail/en/e-switch/TL3305AF160QG/EG5350CT-ND/5816195) | $0.20 |
| 1 | USB micro B connector | [Amphenol FCI 10118194-0001LF](https://www.digikey.com/products/en?keywords=609-4618-1-nd) | $0.42 | 
| 1 | JST-PH battery connector | [JST B2B-PH-K-S(LF)(SN)](https://www.digikey.com/product-detail/en/jst-sales-america-inc/B2B-PH-K-S-LF-SN/455-1704-ND/926611) | $0.17 | 
| 1 | RGB LED 4PLCC | [Cree CLMVC-FKA-CL1D1L71BB7C3C3](https://www.digikey.com/product-detail/en/cree-inc/CLMVC-FKA-CL1D1L71BB7C3C3/CLMVC-FKA-CL1D1L71BB7C3C3CT-ND/9094273 CLMVC-FKA-CL1D1L71BB7C3C3) | $0.19 |
| 1 | Red LED 0603 5mA | [Lite-On LTST-C193KRKT-5A](https://www.digikey.com/product-detail/en/lite-on-inc/LTST-C193KRKT-5A/160-1830-1-ND/2356251) | $0.41 |
| 1 | M.2 connector | [TE Connectivity 2199230-4](https://www.digikey.com/product-detail/en/te-connectivity-amp-connectors/2199230-4/A115904CT-ND/4208916) | $1.42 |
| 1 | M.2 standoff | [JAE 	SM3ZS067U410-NUT1-R1200](https://www.digikey.com/product-detail/en/jae-electronics/SM3ZS067U410-NUT1-R1200/670-2865-1-ND/5955849) | $1.25 |
| 1 | M2*3 screw w/4mm head | [example](https://www.amazon.com/gp/product/B07NZ32TRB/ref=ppx_yo_dt_b_asin_title_o00_s00) | |


## Eagle files

The eagle directory contains files for Autodesk Eagle CAD 9. It is a small two-layer board you can view and edit it with the free version of Eagle CAD.

- SomTest1.sch - Schematic
- SomTest1.brd - Board File
- SomTest1v4.zip - Gerbers
- SomTest1.lbr - Library file containing all of the components on this board
- SomTest1-brd.pdf - PDF version of the board
- SomTest1-sch.pdf - PDF version of the schematic

The Gerber files were tested at JLCPCB but were created using the default Eagle CAD settings so they should work with many fabrication houses.

## PMIC Notes

{{!-- BEGIN shared-blurb 93112786-2815-408c-b064-ec7e9c629200 --}}
When using the B Series SoM with a bq24195 PMIC, note the following:

By default, the bq24195 sets the input current limit, which affects powering by VIN and VUSB, to 100 mA. This affects the VSYS output of the PMIC, which powers both the cellular modem and 3V3 supply, and is not enough to power the B Series SoM in normal operation.

If your device has the default firmware (Tinker), it will attempt to connect to the cloud, brown out due to insufficient current, then the device will reset. This may result in what appears to be the status LED blinking white, but is actually rolling reboot caused by brownout.

A factory new B Series SoM does not enable the PMIC setup. To enable the use of the bq21415, you must enable the system power feature [PMIC_DETECTION](/reference/device-os/api/power-manager/systempowerfeature/#systempowerfeature-pmic_detection) in your code. This defaults to off because the B Series SoM can be used without a PMIC, or with a different PMIC, and also requires I2C on D0/D1, and some base boards may use those pins as GPIO.

Because the input current limit does not affect the battery input (Li+), for troubleshooting purposes it can be helpful to attach a battery to help rule out input current limit issues. It's also possible to supply 3.7V via a bench power supply to the battery input, instead of VIN. 

The input current limit can result in a situation where you can't bring up a B Series SoM because it browns out continuously, but also cannot flash code to it to stop if from browning out. There are two general solutions:

- Attach a battery or supply by Li+ when bringing up a board.
- Use SWD/JTAG and reset halt the MCU. This will prevent it from connecting to the cloud, so you can flash Device OS and firmware to it by SWD.

The input current limit is actually controlled by three factors:

- The [power source max current setting](/reference/device-os/api/power-manager/powersourcemaxcurrent/) in the PMIC. The default is 900 mA. It can be set to 100, 150, 500, 900, 1200, 1500, 2000, or 3000 mA.
- It is also limited by the hardware ILIM resistor. On Particle devices with a built-in PMIC, this is set to 1590 mA, but if you are implementing your own PMIC hardware, you can adjust this higher.
- When connected by USB, it will use DPDM, current negotiation via the USB DP (D+) and DM (D-) lines. 

Note that some 2A tablet chargers and multi-port USB power supplies supply 2A but do not implement DPDM; these will be treated as if VIN was used, and you must set the power source current, otherwise the input current will be limited to 900 mA, which is not enough to power a 2G/3G cellular modem without an attached battery.

{{!-- END shared-blurb --}}

