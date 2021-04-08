---
title: Device Claiming
layout: no-nav.hbs
description: Particle Device Setup and Claiming Tool
includeDefinitions: [api-helper, api-helper-extras, usb-serial]
---

# Device Setup and Claiming

{{> sso}}

## Wi-Fi Setup (Photon, P1, and Argon)

Your Photon, P1, or Argon must be connected by USB to your computer and in listening mode
(blinking dark blue). If it's in another mode, hold down MODE (SETUP on Photon) until 
the status LED blinks dark blue.

{{> wifi-setup }}

{{> device-lookup hidden="true"}}
