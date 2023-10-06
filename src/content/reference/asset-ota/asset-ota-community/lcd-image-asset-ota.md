---
title: LCD image Asset OTA
columns: two
layout: commonTwo.hbs
description: LCD image Asset OTA
includeDefinitions: [api-helper, api-helper-extras,api-helper-projects,ble-serial,zip]
---

# {{title}}


This project shows how to send resources like graphics, fonts, sound samples as assets. The application will not start until all the assets have been delivered to the device so it's safe to assume that the assets are available.

In this case, the application searches the lists of available assets using `System.assetsAvailable()` and read a splash screen image directly from asset storage into the memory of an external LCD screen.

{{> project-browser project="lcd-image-asset-ota" default-file="src/lcd_image.cpp" height="400" flash="false"}}


This example was shown at Spectra 2023. [Github](https://github.com/particle-iot/asset-ota-examples).

