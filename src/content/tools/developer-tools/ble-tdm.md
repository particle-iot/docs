---
title: BLE TDM calculator
columns: two
layout: commonTwo.hbs
description: BLE TDM calculator
includeDefinitions: [api-helper, ble-tdm]
---

# {{title}}

On the P2, Photon 2, and M-SoM, the RTL872x MCU supports both BLE and Wi-Fi. This is done using a single radio and antenna by
time division multiplexing (TDM) the BLE and Wi-Fi features. This is normally transparent, as features such as BLE 
advertising and data transfer already occur in bursts due to the design of BLE. Same for Wi-Fi, and all protocols that
use the 2.4 GHz unlicensed band.

There is one use case that requires some tuning, however: 

If you are using a P2, Photon 2, or M-SoM to receive BLE advertisements only (no connection), you may need to adjust
your scan parameters or advertising parameters to make sure you do not miss an excessive number of transmissions.
In most cases, if the BLE advertising devices are transmitting frequently, this will not be an issue, but if 
transmissions from from battery powered beacons that transmit less frequent;y, you may need to make adjustments.

{{> ble-tdm }}

