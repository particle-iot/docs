---
title: Raspberry Pi datasheet
template: datasheet.hbs
columns: two
order: 9
---

# Raspberry Pi Datasheet

<div align=center><img src="/assets/images/raspberry-pi.svg" width=200></div>

## Functional description

### Overview

The Raspberry Pi is a low-cost single-board Linux computer.

This datasheet shows the conventions used when the Particle firmware is running on the Raspberry Pi.

## Hardware Variants

The Particle firmware is being developed on the Raspberry Pi 3. It works on the Raspberry Pi 2. It has not been tested yet on the original Raspberry Pi or the Raspberry Pi Zero.

## Operating System

The Particle firmware and agent (the supervisor for the firmware) expects Raspbian Jessie or later.

[Download a Raspbian image on the official Raspberry Pi website.](https://www.raspberrypi.org/downloads/raspbian/)

## Interfaces

### Peripherals and GPIO

The Raspberry Pi has general purpose IO pins, one PWM-capable pin and
several buses (SPI, I2C and UART). It does not have analog input or
output pins.

### RGB LED, SETUP and RESET button

The Raspberry Pi doesn't have the RGB LED, SETUP or RESET button found on Particle devices.

## Pin definition

### Pin numbering

The pin number used in the Particle firmware are the Broadcom pin numbers, also know as the BCM or GPIO pin numbers.

### Pin out diagram

<div align=center><a href="http://pinout.xyz"><img src="/assets/images/raspberry-pi-pinout.png"></a></div>

This pinout diagram is provided by [Pinout.xyz](http://pinout.xyz/)
under a Creative Commons license. Visit [Pinout.xyz](http://pinout.xyz/) for an interactive pinout diagram.

### Pin description

| Pin | Name | Description |
|-----|------|-------------|
| 0 | EED | I2C data line used to identify Pi Hats (addon boards)
| 1 | EEC | I2C clock line used to identify Pi Hats (addon boards)
| 2 | SDA | I2C data line
| 3 | SCL | I2C clock line
| 4 | | Digital IO
| 5 | | Digital IO
| 6 | | Digital IO
| 7 | CE1 | SPI chip enable 1, digital IO
| 8 | CE0 | SPI chip enable 0, digital IO
| 9 | | Digital IO
| 10 | | Digital IO
| 11 | | Digital IO
| 12 | | Digital IO
| 13 | | Digital IO
| 14 | TX | UART hardware serial transmit <sup>[1]</sup>
| 15 | RX | UART hardware serial receive <sup>[1]</sup>
| 16 | | Digital IO
| 17 | | Digital IO
| 18 | PWM 0 | PWM-capable digital IO
| 19 | MISO | SPI master-in slave-out
| 20 | MOSI | SPI master-out slave-in
| 21 | SCK | SPI clock
| 22 | | Digital IO
| 23 | | Digital IO
| 24 | | Digital IO
| 25 | | Digital IO
| 26 | | Digital IO
| 27 | | Digital IO

**Notes:**

<sup>[1]</sup>: Disabled by default on the Raspberry Pi 3. Must be enabled by adding `enable_uart=1` to `/boot/config.txt`

