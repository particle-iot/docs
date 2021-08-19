---
title: Product Updates 2021
layout: commonTwo.hbs
columns: two
---

Due to the [global silicon chip shortage](https://www.zdnet.com/article/the-global-chip-shortage-is-a-bigger-problem-than-everyone-realised-and-it-will-go-on-for-longer-too/) causing the inability to obtain certain key components, and the impending shutdown of 2G and 3G cellular networks in the United States, there will be some changes in the available product SKUs.

## United States 2G/3G sunset

### AT&T

- AT&T 2G has been shut down since 2016.
- AT&T 3G will shut down in [February 2022](https://www.att.com/support/article/wireless/KM1324171/).

### T-Mobile

- T-Mobile 2G will shut down December 2022.
- T-Mobile 3G will shut down October 2021. This process started in January 2021, and some areas have reduced 3G coverage already. There are some third party reports that this may be delayed until April 2022, but this has not been announced by T-Mobile and should not be relied on.

### Boron 2G/3G (BRN310)

- The Boron 2G/3G only has ever connected to T-Mobile. It will likely revert to 2G only by October 2021 and stop working entirely in December 2022.
- After the T-Mobile 3G shutdown in October 2021, there may be reduced T-Mobile coverage in some areas.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### E Series E310

- The E Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- It will stop working entirely in December 2022.

### Electron 2G/3G (ELC314, E260)

- The E Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- It will stop working entirely in December 2022.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### Electron 2G (E350)

- The Electron 2G has only connected to T-Mobile since 2016.
- It will stop working entirely in December 2022.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### Summary - 2G/3G Sunset

| SKU | 2020 Available Operators | 2021 Available Operators | 2022 Available Operators | 
| :--- | :---: | :---: | :---: |
| E314, ELC314, BRN314 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E310, BRN310 | T-Mobile (2G/3G) | T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E310, E260 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E350 | T-Mobile (2G) | T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |

<sup>1</sup> After the T-Mobile 3G shutdown in October 2021, there may be reduced T-Mobile coverage in some areas.

## Gen 2 deprecation

Due to the global silicon shortage, the STM32F2xx microcontroller is in short supply. For this reason, Gen 2 products should migrate to Gen 3 devices (nRF52840) when possible. The deprecation will not affect devices already deployed and they will continue to function normally (with the exception of the devices affected by the United States 2G/3G sunset).

These devices will remain available for now, but will reach end-of-life when the MCU is no longer available.

| Family | SKU | Replacement Gen 3 |
| :--- | | :--- | :--- |
| Electron | ELC314 | Boron BRN314<sup>1</sup> |
| Electron | ELC404X | Boron BRN404X |
| E Series | E310, E313 | Boron BRN314<sup>1</sup> or B Series SoM<sup>2</sup> |
| E Series | E404X | Boron BRN404X or B Series SoM B404X |

<sup>1</sup> Boron BRN314 is not recommended in the United States due to the 2G/3G sunset. Use the Boron BRN404X (LTE Cat M1) instead.

<sup>2</sup> B Series SoM B404X in United States, Canada, and Mexico. B524 in Europe, Australia, and New Zealand. There is no available B Series SoM for South America at this time.

## Gen 2 end-of-life products

These SKUs are end-of-life and are no longer available. In some cases, a very similar replacement device is available, however that replacement is deprecated, so a longer-term plan for replacement is recommended.

| Family | SKU | Temporary replacement | Long-term replacement |
| :--- | | :--- | :--- | :--- |
| Electron | E350, E260 (US, CA, MX) | ELC404X | Boron BRN404X or B Series SoM B404X |
| Electron | E350, E260, E270 (Europe, AU, NZ) | ELC314 | Boron BRN314 or B Series SoM B524 |
| Electron | E350, E260, E270 (elsewhere) | ELC314 | Boron BRN314 |
| Electron | ELC402, ELC404 | ELC404X | Boron BRN404X or B Series SoM B404X |
| E Series | E402, E404 (US, CA, MX) | E404X | B Series SoM B404X or Boron BRN404X  |


## Gen 3 end-of-life products

These Gen 3 SKUs are end-of-life and will not be available in the future due to the u-blox SARA-R410M end-of-life. The replacement model is pin-compatible and should require only a Device OS upgrade.

| Family | SKU | Replacement (GA) |
| :--- | | :--- | :--- |
| Boron | BRN402, BRN404 | BRN404X |
| B Series | B402, B404 | B404X | 


## u-blox LTE Cat M1 modem migration

The u-blox SARA-R410M modem module is becoming scarce and the supply situation is not expected to improve. This will require a change in the cellular module to the SARA-R510S-01B. This change should be mostly transparent, however the updated modem will require Device OS xxx or later.

The following SKUs are affected:

| Device | Old SKU | Replacement SKU |
| :--- | :--- | :--- |
| Boron | BRN404, BRN402 | BRN404X |
| B Series SoM | B404, B402 | BRN404X |

## Boron or B Series SoM?

When upgrading an Electron or E Series Gen 2 device you may have to choose between the Boron and B Series SoM Gen 3 devices:

| Measure | Electron | E Series | Boron | B Series SoM |
| :--- | :---: | :---: | :---: | :---: |
| Form Factor | Pins | SMD | Pins | M.2 |
| Bluetooth LE | &nbsp; | &nbsp; | &check; | &check; |
| NFC | &nbsp; | &nbsp;  | &check; | &check; |
| Battery Support (PMIC) | &check; | &check; | &check; | <sup>1</sup> |
| MFF2 SMD SIM | &nbsp; | &check; | &check; | &check; |
| 4FF SIM card slot | &check; | &nbsp; | &check; | &nbsp; |
| GPIO | 30 | 30 | 20 | 24 |
| ADC | 12 | 12 | 6 | 8 |
| DAC | 2 | 2 | &nbsp; | &nbsp; |
| UART | 3 | 3 | 1 | 1 |
| SPI | 2 | 2 | 2 | 2 |
| I2C | 1 | 1| 1 | 2 |
| CAN | 2 | 2 | &nbsp; | &nbsp; |
| PWM | 13 | 13 | 8 | 7 |

<sup>1</sup> The B Series SoM does not contain a PMIC, Fuel Gauge, or LiPo battery connector on the SoM. You can add one to your custom base board. This also adds flexibility for omitting battery support if you do not need it, or allowing the use of other battery chemistries. 

Like the E Series, the B Series SoM does not include a USB port connector, RGB LED, MODE, or RESET buttons. These are recommended for your base board. The Boron includes these features on the Boron itself.

The Electron and E Series have more serial ports. If you need many serial ports, you may want to add more serial ports using a chip such as the [SC16IS740](https://github.com/rickkas7/SC16IS740RK) connected to I2C or SPI.

The Electron and E Series have more GPIO. If you are already using all of the Electron GPIO, you may want an external I2C GPIO expander such as the [MCP23008](https://github.com/rickkas7/MCP23008-RK) or [MCP23017](https://github.com/rickkas7/MCP23017-RK).

The Electron and E Series have CAN bus interfaces. The Tracker SoM adds a CAN bus to a Gen 3 device using the MCP25625 via the SPI interface.

The Electron and E Series have 2 DAC (digital to analog converter ports). Gen 3 devices do not include a DAC, however DAC ports can be added via I2C or SPI.

Note that Gen 3 GPIO and ports (serial, I2C, SPI) are not 5V tolerant as most pins are on Gen 2 devices. Input voltages must not exceed 3.3V. 

### From an Electron

While not pin-compatible, the Boron is the most similar to the Electron in that it has male header pins (0.1") on the bottom that can be mounted in a socket or soldered to a base board.

Of course you can also upgrade to a B Series SoM, as discussed in the following section.

### From an E Series

In general, the recommended upgrade path for a E Series is to use the B Series SoM, if you will use the device in:

- North America (United States, Canada, and Mexico)
- Europe
- Australia and New Zealand

In other areas, the Boron is the recommended upgrade. Neither is pin-compatible. 

## Summary

| Family | SKU | Temporary replacement | Long-term replacement |
| :--- | | :--- | :--- | :--- |
| Electron | E350, E260 (US) | ELC404X | Boron BRN404X or B Series SoM B404X |
| Electron | E350, E270 (Europe, AU, NZ) | ELC314 | Boron BRN314 or B Series SoM B524 |
| Electron | E350, E260, E270 (elsewhere) | ELC314 | Boron BRN314 |
| Electron | ELC402, ELC404 (US) | ELC404X | Boron BRN404X or B Series SoM B404X  |
| Electron | ELC314 (US, CA, MX) | &nbsp; | Boron BRN404X or B Series SoM B404X |
| Electron | ELC314 (Europe, AU, NZ) | &nbsp; | Boron BRN314 or B Series SoM B524 |
| Electron | ELC314 (elsewhere) | &nbsp; | Boron BRN314 |
| E Series | E402, E404 | E404X | B Series SoM B404X or Boron BRN404X  |
| E Series | E404X | &nbsp; | B Series SoM B404X or Boron BRN404X  |
| E Series | E314, E313, E310 (US, CA, MX) | E404X | B Series SoM B404X or Boron BRN404X |
| E Series | E314, E313, E310 (Europe, AU, NZ) | E314 | B Series SoM B524 or Boron BRN314 |
| E Series | E314, E313, E310 (elsewhere) | E314 | Boron BRN314 |
| Boron | BRN404, BRN402 | | BRN404X |
| Boron | BRN310 (US) | | BRN404X |
| Boron | BRN310 (elsewhere) | | BRN314 |
| Boron | BRN314 (US) | | BRN404X |
| Boron | BRN314 (elsewhere) | | (no change) |
| B Series SoM | B404, B402 | | B404X |
| B Series SoM | B523 | | B524 |
| Tracker SoM | T402 | | T404 | 
| Tracker SoM | T523 | | T524 | 
| Tracker One | ONE402 | | ONE404 | 
| Tracker One | ONE523 | | ONE524 | 

The following are the recommended generally available (GA) products:

| Family | SKU | Description | Region |
| :--- | :--- | :--- | :--- |
| Boron | BRN314 | Boron Global 2G/3G | Global except US |
| Boron | BRN404X | Boron LTE Cat M1 | US, CA, MX |
| B Series SoM | B524 | B Series SoM LTE Cat 1 with 2G/3G | Europe, AU, NZ |
| B Series SoM | B404X | B Series SoM LTE Cat M1 | US, CA, MX |
| Tracker SoM | T524 | Tracker SoM LTE Cat 1 with 2G/3G | Europe, AU, NZ |
| Tracker SoM | T404 | Tracker SoM LTE Cat M1 | US, CA, MX |
| Tracker One | ONE524 | Tracker One LTE Cat 1 with 2G/3G | Europe, AU, NZ |
| Tracker One | ONE404 | Tracker One LTE Cat M1 | US, CA, MX |

