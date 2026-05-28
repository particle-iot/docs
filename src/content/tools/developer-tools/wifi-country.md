---
title: Wi-Fi country tool
layout: commonTwo.hbs
description: Tool to setting the Wi-Fi country code on Gen 4 devices
includeDefinitions: [api-helper,api-helper-extras,api-helper-usb,webdfu]
---

# {{title}}

The Wi-Fi country code can be set from user firmware using [WiFi.setCountryCode()](/reference/device-os/api/wifi/setcountrycode-wifi/), added in Device OS 5.1.0 for the P2, Photon 2, and M-SoM. On the same devices you can also set the country code in the DCT (configuration flash) in DFU mode (blinking yellow) using dfu-util, or the web-based tool below.

The Wi-Fi country code only needs to be set if you need to be able to use channels that are not available in the United States, such as 2.4 GHz Wi-Fi channel 12, or a number of channels only available in Japan.

To this tool, connect the compatible device to your computer via USB.

{{> wifi-country }}

