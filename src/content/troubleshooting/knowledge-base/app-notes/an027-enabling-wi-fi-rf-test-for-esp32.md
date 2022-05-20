---
title: AN027 Enabling Wi-Fi RF Test for ESP32
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Overview

This document contains instructions for conducting RF tests with the ESP32 Wi-Fi chip on the Argon development kit.

## Hardware Modifications

There are two pins (UART) exposed on the back of the Argon for sending test mode commands to the ESP32 chip. You will need to connect these two pins to the Particle Debugger. The following diagram shows these two pins - ESP32 RX and ESP32 TX. Remember to provide the GND for the connection as well:

![Screen_Shot_2021-02-09_at_6.39.14_AM.png](https://support.particle.io/hc/article_attachments/1260800895049/Screen_Shot_2021-02-09_at_6.39.14_AM.png). ![Screen_Shot_2021-02-09_at_6.39.29_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.39.29_AM.png)

## Setup

* Flash the firmware to the Argon that enables RF test mode for the ESP32 Wi-Fi chip: <https://go.particle.io/shared%5Fapps/607544754c3ada0009fe5bf0>  
   * Ensure the Argon is on >= Device OS 2.0.1.
* Connect ESP32 RX to Debugger TX and ESP32 TX to Debugger RX
* Connect the GND pin as well.
* Attach a battery.
* Connect the Debugger to a Windows PC.

  
![Screen_Shot_2021-02-09_at_6.43.37_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.43.37_AM.png)

## Verification

* Connect the Argon to a spectrum analyzer via the u.FL (with labelled Wi-Fi) connector:

![Screen_Shot_2021-02-09_at_6.45.25_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.45.25_AM.png)
  
* Download ESP Test Tool (only works on Windows): [link, see "Flash Download Tools (ESP8266 & ESP32 & ESP32-S2)"](https://www.espressif.com/en/support/download/other-tools).
* Start the tool - espRFTool.exe.
* Set the items  
   * ChipType: ESP32  
   * COM: the COM port of the Debugger  
   * BaudRate: 115200  
   * Test Firmware (inside the **bin** folder:  of the ESP Test Tool)  
            * ESP32\_RF\_TEST\_BIN\_V1.3.3\_20180403.bin  
   * Press the “**MODE**” button once on the Argon, the D7 Blue LED will light on.
* After that, click the button - **load bin.**
* Note: if it doesn’t start to load, press the reset button on the Argon once.
* Once it shows **SUCC**, then you can select the test parameters like Test Mode, WiFi Rate, Bandwidth and Channel.
* If you need to reduce TX power, set attenuation.
* Click the start button and monitor the spectrum analyzer.

  
![Screen_Shot_2021-02-09_at_6.48.00_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.48.00_AM.png)

TX:

  
![Screen_Shot_2021-02-09_at_6.48.33_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.48.33_AM.png)

Harmonics:

![Screen_Shot_2021-02-09_at_6.49.13_AM.png](/assets/images/support/Screen_Shot_2021-02-09_at_6.49.13_AM.png)

## References

* [ESP32&ESP8266\_RF\_Performance\_Test\_Demonstration\_\_EN.pdf](https://www.espressif.com/sites/default/files/tools/ESP32%26ESP8266%5FRF%5FPerformance%5FTest%5FEN%5F0.zip)
