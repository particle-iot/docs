---
title: US 2G/3G Sunset
layout: commonTwo.hbs
columns: two
---

# {{title}}

The mobile operators used by Particle cellular devices in the United States are making changes to their networks that will affect some devices.

## Operators

### AT&T

- 2G/3G devices will no longer connect AT&T at this time.
- AT&T 2G has been shut down since 2016.
- AT&T 3G started shut down in [February 2022](https://www.att.com/support/article/wireless/KM1324171/) and this is substantially complete as of June 2022.

### T-Mobile

- T-Mobile 2G will have reduced capacity and coverage starting April 2, 2025. Any time after this date 2G coverage could disappear permanently at any location without warning.
- T-Mobile 3G shutdown started in January 2021 and is substantially complete as of June 2022.


## Timeline

| SKU | 2020 Available Operators | 2021 Available Operators | 2022 Available Operators | 
| :--- | :---: | :---: | :---: |
| E314, ELC314, BRN314 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E313, BRN310 | T-Mobile (2G/3G) | T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E310, E260 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |
| E350 | T-Mobile (2G) | T-Mobile (2G)<sup>1</sup> | T-Mobile (2G)<sup>1</sup> |

**These devices could lose all connectivity in the United States starting in April 2025**

<sup>1</sup> After the T-Mobile 3G shutdown in October 2021, there may be reduced T-Mobile coverage in some areas.

## Affected devices

### Boron 2G/3G (BRN310)

- The Boron 2G/3G only has ever connected to T-Mobile. It will likely revert to 2G only by October 2021 and stop working entirely in April 2024.
- After the T-Mobile 3G shutdown in October 2021, there may be reduced T-Mobile coverage in some areas.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### E-Series E310

- The E-Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- It will stop working entirely in April 2024.

### Electron 2G/3G (ELC314, E260)

- The E-Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- It will stop working entirely in April 2024.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### Electron 2G (E350)

- The Electron 2G has only connected to T-Mobile since 2016.
- It will stop working entirely in April 2024.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

## SKUs not recommended in the US

Because of the 2G/3G sunset, the following SKUs should not be used in the United States as they will lose all connectivity in April 2024.

| Family | SKU | Replacement |
| :--- | | :--- | :--- | :--- |
| Electron | E350 | ELC404 |
| Electron | E260 | ELC404 |
| Electron | ELC314 | ELC404 |
| E-Series | E314, E313, E310 | E404 |
| Boron | BRN314, BRN310 | BRN404X |
