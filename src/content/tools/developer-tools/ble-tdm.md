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
transmissions from from battery powered beacons that transmit less frequently, you may need to make adjustments.

- [Scroll down to examples](#examples)

{{collapse op="start" label="Show instructions for tool"}}
#### Global parameters

- **Wi-Fi/BLE TDMA Window Size** This is the period of time devoted to a Wi-Fi and BLE cycle. The default is 18 ms. and you should leave it at the default as this is not a parameter that you can change in the RTL872x.

- **BLE window percentage** Amount of time devote to BLE vs. Wi-Fi. The default is 50% and you should leave it at the default as this is not a parameter that you can change in the RTL872x. Setting this to 100% does simulate how it would work if it had a dedicated BLE peripheral, however.

- **TDMA window offset** Where the transition occurs relative to the simulation time clock. Unless the sensors and MCU are synchronized, this generally does not make a significant difference.

- **Test Duration** This is how long the simulation is run. It's not in real-time, but if the number is very large calculation may take a while and the result table will be very large. The success and missed percentages tend to reach a stable average fairly quickly, which is why the default is 900 seconds.


#### Sensor parameters

- **Advertising interval** How often this sensor transmits its data in milliseconds.

- **Packet length** How long it takes to advertise. You generally don't need to change this, but a transmission is considered successful 

- **Offset** Where the transmission occurs relative to the simulation time clock.

#### Sensor results

- **Samples in test period** Number of samples that were transmitted during the simulated test run

- **BLE success** Number of samples that fell within the BLE interval.

- **BLE missed** Number of samples that fell within the Wi-Fi interval and were missed.

- **Latency normal** Number of samples and percentage where this sample was not missed.

- **Latency missed 1 packet**  Number of samples and percentage where only one sample was missed.

- **Latency missed 2 packets**  Number of samples and percentage where two consecutive samples were missed.

- **Latency missed 3 or more packets**  Number of samples and percentage where three or more consecutive samples were missed.

- **Mean latency** The average (mean) latency.

- **Minimum latency** Lowest latency. This is typically the advertising interval.

- **Maximum latency** Maximum latency.
{{collapse op="end"}}

## Tool

{{> ble-tdm }}


## Examples

### 750 advertising

With your sensor advertising frequently (750 ms), the missed samples may seem a little alarming, but 
are spaced out and do not significantly affect the mean latency. Note in the wild, advertisements 
are often missed because of RF interference from other devices and sensors, or even people walking
between the beacon and the receiver.

{{> ble-tdm-example param="?d=300&ws=100&b=50&it0=f&i0=750&rmin0=9000&rmax0=11000&l0=0.125&r0=0&d0=100&j0=10"}}

### 10 second advertising


### 30-second advertising

With a sensor advertising less frequently (30 seconds), the missed samples do affect the latency
because the 

{{> ble-tdm-example param="?ws=100&b=50&o=0&d=900&i0=30000&l0=0.125&o0=0"}}

- [Scroll up to see results](#tool)

### 15-second advertising

This example compares 30-second advertising and 15-second advertising. With an advertising interval
of 15 seconds the mean latency of 20 seconds is less than it would be for 100% success at 30 second interval.
Also, the maximum latency is 30 seconds.

{{> ble-tdm-example param="?ws=100&b=50&o=0&d=900&i0=30000&l0=0.125&o0=0&i1=15000&l1=0.125&o1=0"}}

- [Scroll up to see results](#tool)

### Beware of overfitting

Beware of making settings that appear to eliminate the missed packets entirely.

{{> ble-tdm-example param="?ws=100&b=50&o=0&d=300&i0=18000&l0=0.125&o0=0"}}

Since the transmitted and receiver are not synchronized you can just as easily end up in entirely in the Wi-Fi range.

{{> ble-tdm-example param="?ws=100&b=50&o=0&d=300&i0=18000&l0=0.125&o0=12"}}

Also likely is that the clocks aren't exactly the same, causing poor performance when they drift to certain offsets

{{> ble-tdm-example param="?ws=100&b=50&o=0&d=900&i0=18000.5&l0=0.125&o0=0"}}

All of these situations can be eliminated by not picking an advertising interval a multiple of 18 milliseconds.

- [Scroll up to see results](#tool)


