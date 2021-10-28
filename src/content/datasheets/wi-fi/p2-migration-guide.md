---
title: P2 migration guide
layout: commonTwo.hbs
columns: two
description: Migration guide for transitioning from the P1 to P2
---

# P2 Migration Guide

**Preliminary pre-release version 2021-10-28**

{{#unless pdf-generation}}
{{downloadButton url="/assets/pdfs/datasheets/p2-migration-guide.pdf"}}
{{/unless}} {{!-- pdf-generation --}}



|      | P1    | P2 |
| :--- | :---: | :---: |
| User application size | 128 KB | 1024 KB (1 MB) |
| Flash file system<sup>1</sup> |  | 2 MB |
| Wi-Fi | 802.11b/g/n | 802.11a/b/g/n Wi-Fi |
| | 2.4 GHz | 2.4 GHz &amp; 5 GHz |
| BLE | | &check;<sup>2</sup> |
| MCU | STM32F205RGY6 | RTL8721DM |
|  | ST Microelectronics | Realtek Semiconductor |
| ARM CPU | Cortex M3 | Cortex M4F |
|  | 120 MHz | 200 MHz |
| Hardware FPU | | &check; |
| Secure Boot | | &check; |

<sup>1</sup>A small amount of the flash file system is used by Device OS, most is available for user data storage using the POSIX filesystem API. This is separate from the flash memory used for Device OS, user application, and OTA transfers.

<sup>2</sup>Wi-Fi and BLE share the same antenna (trace or external), using an internal coexistence mechanism.


- No 5V tolerance
- No pin A3, A4! 
- No A3, A4, A6, A7, P1S0, P1S2, P1S3, P1S5 ADC
- Interrupts on all GPIO
- No DAC
- No CAN
- SPI moved
- I2S moved?

## SPI1 ?

```
#define SS1                 D5
#define SCK1                D4
#define MISO1               D3
#define MOSI1               D2
```

## Serial

- No break detection, LIN mode, half-duplex
- Double check baud rates and such
- Serial buffer is 2048 bytes on RTL vs. 64 bytes on STM32

Does have Serial2

```
#define TX1                 D4
#define RX1                 D5
#define CTS1                D3
#define RTS1                D2
```