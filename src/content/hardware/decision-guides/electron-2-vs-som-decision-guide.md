---
title: Electron 2 vs. SoM decision guide
layout: commonTwo.hbs
columns: two
description: Deciding between the Electron 2 and B-SoM or M-SoM devices
---

# {{title}}

{{migration-guide type="question" leftImg="/assets/images/electron-2/electron-2-rendering.png" rightImg="/assets/images/b-series/b-series-top.png"}}

<p class="attribution">Pictures are not the same scale</p>


## Summary of differences

### Basic differences

The Electron 2 includes most features on the module itself, where the B-SoM and M-SoM typically requires a base board with the features you want to include, many of which are optional.

|      | Electron 2 | B-SoM | M-SoM |
| :--- | :---: | :---: | :---: |
| Form-factor | Feather | M.2 NGFF module |M.2 NGFF module |
| Cellular | &check; | &check; | &check; |
| Wi-Fi | | | &check; |
| Breadboard compatible | &check; | | |
| Base board | Optional | Required | Required |
| MCU | nRF52840 | nRF5240 | RTL8722DM |
| Maximum application | 256 KB | 256 KB | 2048 KB |
| Available RAM | 80 KB | 80 KB | 3072 KB |
| USB connector | On module | On base board<sup>1</sup> |On base board<sup>1</sup> |
| RGB LED | On module | On base board<sup>1</sup> | On base board<sup>1</sup> |
| Reset and mode buttons | On module | On base board<sup>1</sup> | On base board<sup>1</sup> |
| Li-Po battery connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> |
| PMIC | On module | On base board<sup>2</sup> | On base board<sup>2</sup> |
| Fuel gauge | On module | On base board<sup>2</sup> | On base board<sup>2</sup> |
| Cellular antenna | External (U.FL) | External (U.FL) | On base board<sup>2</sup> |
| BLE antenna | Chip or External (U.FL) | External (U.FL) or <sup>2</sup> | External (U.FL) |
| NFC antenna | External (U.FL) | On base board<sup>2</sup> | |
| SWD debug connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> |

- <sup>1</sup> Optional but recommended on base board
- <sup>2</sup> Optional on base board, can be omitted if not needed

### Connectivity differences

|      | ELC504EM | ELC524EM | B504 | B404X | B524 | M404 | M524 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Line | Electron 2 | Electron 2 | B-SoM | B-SoM | B-SoM | M-SoM | M-SoM |
| Form-factor | Feather | Feather | M.2 NGFF | M.2 NGFF | M.2 NGFF | M.2 NGFF | M.2 NGFF |
| Region | Americas | EMEAA | NorAm | Americas |  EMEAA | NorAm | EMEAA |
| LTE | Cat 1 bis | Cat 1 bis | Cat 1 | Cat M1 | Cat 1 | Cat M1 | Cat 1 |
| 3G | | | &check; | | &check; | | &check; |
| 2G | | | | | &check; | | &check; |
| Wi-Fi | | | | | | &check; | &check; |
| GNSS | | | &check; | | | &check; | &check; |
| Cellular modem | EG800Q-NA | EG800Q-EU | EG91-NAX | R510 | EG91-E | BG95-M5 | EG91-EX |
| Modem manufacturer | Quectel | Quectel | Quectel | u-blox | Quectel | Quectel | Quectel |
