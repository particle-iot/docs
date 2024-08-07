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

- **Test Duration** This is how long the simulation is run. It's not in real-time, but if the number is very large calculation may take a while and the result table will be very large. The success and missed percentages tend to reach a stable average fairly quickly, which is why the default is 900 seconds.

- **Wi-Fi/BLE TDMA Window Size** This is the period of time devoted to a Wi-Fi and BLE cycle. The default is 100 ms. and you should leave it at the default as this is not a parameter that you can change in the RTL872x.

- **BLE window percentage** Amount of time devote to BLE vs. Wi-Fi. The default is 50% and you should leave it at the default as this is not a parameter that you can change in the RTL872x. Setting this to 100% does simulate how it would work if it had a dedicated BLE peripheral, however.


#### Sensor parameters

- **Fixed advertising interval** You specify often this sensor transmits its data in milliseconds.

- **Random advertising interval** The sensor will transmit with a random delay in the range specified.

- **Packet length** How long it takes to advertise. You generally don't need to change this, but a transmission is considered successful 

- **Retransmit repeats** Beacons will often transmit the data multiple times within the advertising interval. This
can be on different channels, and can also be done in case of RF interference. A value is typically between 0 and 3.

- **Retransmit delay** How long of a delay for retransmits. The jitter (below) is also added. Note that the
number of repeats * the retransmit delay must be less than the advertising interval. When retransmitting, if
any of the retransmissions succeeds, the packet is marked as success. If all are missed, then it is marked as missed.

- **Random transmit jitter** Most BLE sensors will add a random delay before transmitting. This prevents beacons 
from transmitting at exactly the same time, every time, causing interference on every packet. This only affects
the transmission within the advertising interval, so the interval does not drift.


#### Sensor results

- **Samples in test period** Number of samples that were transmitted during the simulated test run

- **BLE success** Number of samples that fell within the BLE interval.

- **BLE missed** Number of samples that fell within the Wi-Fi interval and were missed.

- **Latency normal** Number of samples and percentage where this sample was not missed.

- **Latency missed 1 packet**  Number of samples and percentage where only one sample was missed.

- **Latency missed 2 packets**  Number of samples and percentage where two consecutive samples were missed.

- **Latency missed 3 or more packets**  Number of samples and percentage where three or more consecutive samples were missed.

- **Mean latency** The average (mean) latency.

- **Minimum latency** Lowest latency.

- **Maximum latency** Maximum latency.

#### Test runs

Since you have little control over the synchronization between the BLE advertiser and the Particle BLE receiver, 
a series of test runs is done to see if offset affects the results.

This is particularly helpful if you accidentally make the advertising interval a multiple of the 
TDMA window size, as it's possible that the BLE beacon could forever transmit in the Wi-Fi interval and
every packet would be lost.


{{collapse op="end"}}

## Tool

{{> ble-tdm }}


## Examples

### 750 ms advertising

With your sensor advertising frequently (750 ms), the missed samples may seem a little alarming, but 
are spaced out and do not significantly affect the mean latency. Note in the wild, advertisements 
are often missed because of RF interference from other devices and sensors, or even people walking
between the beacon and the receiver.

{{> ble-tdm-example param="?d=60&ws=100&b=50&it0=f&i0=750&rmin0=9000&rmax0=11000&l0=0.125&r0=0&d0=100&j0=10"}}

### 1 second advertising

One thing to beware of, however, is making the advertising interval a multiple of the BLE + Wi-Fi TDM
window, which is 100 milliseconds. Scroll to the right in the results to view runs 4 and 5 to see the problem.

{{> ble-tdm-example param="?d=300&ws=100&b=50&it0=f&i0=1000&rmin0=9000&rmax0=11000&l0=0.125&r0=0&d0=100&j0=10"}}

### 10 second advertising

The same problem can be seen at a 10 second interval, though in this example repeats are enabled which 
helps somewhat.

A repeat of 3 with a delay of 100 ms means that the advertising interval, the same data is transmitted
3 times, 100 ms apart. Since jitter of 10 ms is also enabled, a random amount of jitter delay is added as well.

{{> ble-tdm-example param="?d=900&ws=100&b=50&it0=f&i0=10000&rmin0=9000&rmax0=11000&l0=0.125&r0=3&d0=100&j0=10"}}

### 10.75 second advertising

By adjusting the advertising interval to not be a multiple of the TDM window, the results are much more consistent.

{{> ble-tdm-example param="?d=900&ws=100&b=50&it0=f&i0=10750&rmin0=9000&rmax0=11000&l0=0.125&r0=3&d0=100&j0=10"}}



- [Scroll up to see results](#tool)


