---
title: STM32 Asset OTA
columns: two
layout: commonTwo.hbs
description: STM32 Asset OTA
includeDefinitions: [api-helper, api-helper-extras,api-helper-projects,ble-serial,zip]
---

# {{title}}

This project shows how to bundle a firmware binary for a coprocessor (in this case an STM32 microcontroller) and how to update the coprocessor when a new binary has been received.

The application registers a callback using `System.onAssetOta(handleAssets)`. `handleAssets` will find the firmware binary for the coprocessor, flash it, then mark the assets as handled using `System.assetsHandled(true)` so that `handleAssets` is not called on next boot.

{{> project-browser project="stm32-asset-ota" default-file="src/stm32_ota.cpp" height="400" flash="false"}}


This example was shown at Spectra 2023. [Github](https://github.com/particle-iot/asset-ota-examples).
