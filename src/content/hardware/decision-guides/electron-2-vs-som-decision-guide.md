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

|      | Electron 2 | B-SoM | M-SoM | Photon 2 |
| :--- | :---: | :---: | :---: | :---: |
| Form-factor | Feather | M.2 NGFF module |M.2 NGFF module | Feather |
| Cellular | &check; | &check; | &check; | |
| Wi-Fi | | | &check; | &check; |
| Breadboard compatible | &check; | | | &check; |
| Base board | Optional | Required | Required | Optional |
| MCU | nRF52840 | nRF5240 | RTL8722DM | RTL8721DM |
| Maximum application | 256 KB | 256 KB | 2048 KB | 2048 KB |
| Available RAM | 80 KB | 80 KB | 3072 KB | 3072 KB |
| USB connector | On module | On base board<sup>1</sup> |On base board<sup>1</sup> | On module |
| RGB LED | On module | On base board<sup>1</sup> | On base board<sup>1</sup> | On module |
| Reset and mode buttons | On module | On base board<sup>1</sup> | On base board<sup>1</sup> | On module |
| Li-Po battery connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | On module |
| PMIC | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | |
| Fuel gauge | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | |
| Cellular antenna | External (U.FL) | External (U.FL) | External (U.FL) | | |
| Wi-Fi antenna | | | Chip or External (U.FL) | Chip or External (U.FL) |
| BLE antenna | Chip or External (U.FL) | External (U.FL) or <sup>2</sup> | External (U.FL) | Chip or External (U.FL) |
| NFC antenna | External (U.FL) | On base board<sup>2</sup> | | |
| SWD debug connector | On module | On base board<sup>2</sup> | On base board<sup>2</sup> | On module |

- <sup>1</sup> Optional but recommended on base board
- <sup>2</sup> Optional on base board, can be omitted if not needed

### Connectivity differences

|      | ELC504EM | ELC524EM | B504 | B404X | B524 | M404 | M524 | PHN2 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Line | Electron 2 | Electron 2 | B-SoM | B-SoM | B-SoM | M-SoM | M-SoM | P2 |
| Form-factor | Feather | Feather | M.2 NGFF | M.2 NGFF | M.2 NGFF | M.2 NGFF | M.2 NGFF | Feather | 
| Region | Americas | EMEAA | NorAm | Americas |  EMEAA | NorAm | EMEAA | Any |
| LTE | Cat 1 bis | Cat 1 bis | Cat 1 | Cat M1 | Cat 1 | Cat M1 | Cat 1 | |
| 3G | | | &check; | | &check; | | &check; | |
| 2G | | | | | &check; | | &check; | |
| Wi-Fi | | | | | | &check; | &check; | &check; |
| GNSS | | | &check; | | | &check; | &check; | |
| Cellular modem | EG800Q-NA | EG800Q-EU | EG91-NAX | R510 | EG91-E | BG95-M5 | EG91-EX | |
| Modem manufacturer | Quectel | Quectel | Quectel | u-blox | Quectel | Quectel | Quectel | |
| MCU | nRF52840 | nRF52840 | nRF52840 | nRF52840 | nRF52840 | RTL8722DM | RTL8722DM | RTL8721DM |
