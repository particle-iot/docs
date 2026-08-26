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

- T-Mobile 2G shutdown complete as of August 3, 2026 (started on April 2, 2025).
- T-Mobile 3G shutdown started in January 2021 and is substantially complete as of June 2022.


## Timeline

**These devices do not have connectivity in the United States as of August 2026**

| SKU | 2020 Available Operators | 2021 Available Operators | 2022 Available Operators |
| :--- | :---: | :---: | :---: |
| E314, ELC314, BRN314 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G) | T-Mobile (2G) |
| E313, BRN310 | T-Mobile (2G/3G) | T-Mobile (2G) | T-Mobile (2G) |
| E310, E260 | AT&T (3G), T-Mobile (2G/3G) | AT&T (3G), T-Mobile (2G) | T-Mobile (2G) |
| E350 | T-Mobile (2G) | T-Mobile (2G) | T-Mobile (2G) |

## Affected devices

### Boron 2G/3G (BRN310)

- **These devices can no longer connect in the United States**
- The Boron 2G/3G only has ever connected to T-Mobile. It will likely revert to 2G only by October 2021, may stop working entirely in April 2024, and did stop working in August 2026.
- After the T-Mobile 3G shutdown in October 2021, there may be reduced T-Mobile coverage in some areas.
- T-Mobile 2G shutdown is complete as of August 2026. It was possible any time after April 2024.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### E-Series E310

- **These devices can no longer connect in the United States**
- The E-Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- T-Mobile 2G shutdown is complete as of August 2026. It was possible any time after April 2024.

### Electron 2G/3G (ELC314, E260)

- **These devices can no longer connect in the United States**
- The E-Series 2G/3G Global can connect to AT&T or T-Mobile.
- After February 2022 it will not be able to connect to AT&T and will only be able to use T-Mobile 2G.
- T-Mobile 2G shutdown is complete as of August 2026. It was possible any time after April 2024.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

### Electron 2G (E350)

- **These devices can no longer connect in the United States**
- The Electron 2G has only connected to T-Mobile since 2016.
- T-Mobile 2G shutdown is complete as of August 2026. It was possible any time after April 2024.
- Of the nationwide US mobile carriers, this model is only compatible with T-Mobile and AT&T, and using a 3rd-party SIM card will not help. This device is not compatible with Verizon.

## SKUs that cannot be used in the US

Because of the 2G/3G sunset, the following SKUs cannot be used in the United States.

| Family | SKU | Replacement |
| :--- | | :--- | :--- | :--- |
| Electron | E350 | ELC404 |
| Electron | E260 | ELC404 |
| Electron | ELC314 | ELC404 |
| E-Series | E314, E313, E310 | E404 |
| Boron | BRN314, BRN310 | BRN404X |
