---
title: Cloud Wi-Fi config
columns: two
layout: commonTwo.hbs
description: Tinker
includeDefinitions: [api-helper, api-helper-cloud, cloud-wifi-config]
---

# {{title}}

This tool demonstrates configuring Wi-Fi on a device from the cloud. This is only useful on the M-SoM that has both cellular and Wi-Fi, and you want to be able to configure the Wi-Fi credentials using the cellular interface.

## Configuration tool

{{> sso}}

{{> cloud-wifi-config}}

## Device firmware

A firmware library is required to configure the Wi-Fi credentials. This is a standalone test application, but the intention is that you would add the library to your own production firmware to able to configure Wi-Fi credentials remotely.


## Data operations

Because the process uses Particle.function and a number of published events, it will use some data operations. Since Wi-Fi configuration is not expected to occur frequently, this should not amount to a significant number, but could be a dozen or even a few dozen data operations, especially when doing Wi-Fi scans.