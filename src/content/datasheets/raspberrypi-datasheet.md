---
title: Raspberry Pi datasheet
layout: datasheet.hbs
columns: two
order: 9
---

<!-- --✂-- cut: part above doesn't go to PDF -->

# Raspberry Pi Datasheet

<div align=center><img src="/assets/images/raspberry-pi.svg" width=200></div>

## Functional description

### Overview

The Raspberry Pi is a low-cost single-board Linux computer designed and produced by the Raspberry Pi Foundation.

This datasheet shows the conventions and pin mappings used when Particle firmware is running on the Raspberry Pi. For more information about the Raspberry Pi hardware itself, please visit the Raspberry Pi Foundation's [Hardware documentation](https://www.raspberrypi.org/documentation/hardware/raspberrypi/README.md).

## Hardware Variants

The Particle firmware is being developed on the **Raspberry Pi 3**.

The Particle Agent software also works on the Pi Zero, original Raspberry Pi and Raspberry Pi 2, but the differences in peripherals and pin mapping means that some firmware and libraries may not compile correctly on older hardware variants.

Firmware and library coverage for all versions of Raspberry Pi hardware will improve over time.

## Operating System

The Particle firmware and agent (the supervisor for the firmware) expects Raspbian Jessie or later. Please visit our Getting Started Guide for instructions on [updating your existing OS](/guide/getting-started/start/raspberry-pi/#i-have-an-sd-card-with-raspbian), or [flashing a new SD card](/guide/getting-started/start/raspberry-pi/#i-don-39-t-have-an-sd-card-with-raspbian) from scratch.

You can download the latest version of Raspbian for your Raspberry Pi from the Raspberry Pi Foundation, [here](https://www.raspberrypi.org/downloads/raspbian/).

## Interfaces

### Peripherals and GPIO

The Raspberry Pi 3 has general purpose IO pins, 4 PWM-capable pin and
several buses (SPI, I2C and UART). It does not have analog input or
output pins.

<p class = "boxedHead">**D7** User LED</p>
<p class = "boxed">
The Raspberry Pi has a green activity LED next to the red power LED near the USB connector. Particle's firmware maps activity of the D7 LED, which is a blue physical LED on the Photon and Electron, to the green LED of the Raspberry Pi.
</p>

### RGB LED, SETUP and RESET button

The Raspberry Pi doesn't have the RGB LED, SETUP or RESET button found on Particle devices. You can learn more about the state of your device by

- Running `particle-agent logs` in your terminal
- Logging into the [Particle Console](https://console.particle.io) and investigating your Pi's device logs

## Pin definition

### Pin numbering

In the Particle firmware, pins are labeled from D0 to D15. The Broadcom pin numbers, also know as the BCM or GPIO pin numbers, are also available from GPIO0 to GPIO27.

**Note:** Since enabling and disabling peripherals like SPI and I2C can only be done at boot, the peripheral pins are considered dedicated pins and should not be used for digital I/O.

### Pin out diagram

![](/assets/images/pi-pinout-diagram-01.png)

### Pin description

| Pin | Particle | Description |
|-----|------|-------------|
| GPIO0 |  | I2C data line used to identify Pi Hats (RESERVED FOR SYSTEM)
| GPIO1 |  | I2C clock line used to identify Pi Hats (RESERVED FOR SYSTEM)
| GPIO2 | SDA | I2C data line <sup>[2]</sup>
| GPIO3 | SCL | I2C clock line <sup>[2]</sup>
| GPIO4 | D0 | Digital IO
| GPIO5 | D4 | Digital IO
| GPIO6 | D5 | Digital IO
| GPIO7 | CE1 | SPI chip enable 1, digital IO
| GPIO8 | CE0 | SPI chip enable 0, digital IO
| GPIO9 | MISO | SPI master-in slave-out <sup>[3]</sup>
| GPIO10 | MOSI | SPI master-out slave-in <sup>[3]</sup>
| GPIO11 | SCK | SPI clock <sup>[3]</sup>
| GPIO12 | D13/A4 | Digital IO
| GPIO13 | D6 | PWM-capable digital IO
| GPIO14 | TX | UART hardware serial transmit <sup>[1]</sup>
| GPIO15 | RX | UART hardware serial receive <sup>[1]</sup>
| GPIO16 | D14/A5 | PWM-capable digital IO
| GPIO17 | D1 | Digital IO
| GPIO18 | D9/A0 | PWM-capable digital IO
| GPIO19 | D7 | PWM-capable digital IO
| GPIO20 | D15/A6 | Digital IO
| GPIO21 | D16/A7 | Digital IO
| GPIO22 | D3 | Digital IO
| GPIO23 | D10/A1 | Digital IO
| GPIO24 | D11/A2 | Digital IO
| GPIO25 | D12/A3 | Digital IO
| GPIO26 | D8 | Digital IO
| GPIO27 | D2 | Digital IO

**Notes:**

<sup>[1]</sup>: Disabled by default on the Raspberry Pi 3. Must be enabled by adding `enable_uart=1` to `/boot/config.txt`  

<sup>[2]</sup>: Disabled by default on the Raspberry Pi 3. Must be enabled by adding `dtparam=i2c_arm=on` to `/boot/config.txt`

<sup>[3]</sup>: Disabled by default on the Raspberry Pi 3. Must be enabled by adding `dtparam=spi=on` to `/boot/config.txt`
