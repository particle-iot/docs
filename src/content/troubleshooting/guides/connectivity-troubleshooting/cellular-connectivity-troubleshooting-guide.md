---
title: Cellular Connectivity Troubleshooting Guide
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
  
While troubleshooting a cellular connectivity issue might seem intimidating at first, the Particle Platform empowers users like you with a number of tools to help you get (and stay) connected. This guide will walk you through three of these tools: Device Vitals (an easy-to-access readout of connectivity metrics), SIM Management, and Cloud Debug (a powerful firmware application that prints out relevant connectivity data directly from your device). Let's get started!


This article is divided into the following resources:

* Device Vitals
* SIM Management
* Cloud Debug
* Troubleshooting Your Antenna
* Submitting A Ticket

But first things first, let's tackle the **four easiest things** you can do to rule out a cellular issue:

* Place your device in Safe Mode by pressing RESET and MODE simultaneously, releasing RESET, and releasing MODE once the status LED blinks magenta. Give the device ample opportunity to connect.
* Ensure your antenna's U.FL connector is firmly attached. If possible, try with another antenna.
* [Upgrade your device's Device OS to the most recent Device OS version.](/getting-started/device-os/introduction-to-device-os/#managing-device-os)
* If you have a 2G/3G device, ensure your device's LiPo battery is attached.

## Device vitals

The Particle Console provides you with current and historical Device Vitals that are helpful in debugging cellular connections.

To see Device Vitals, head to [the Particle console](https://console.particle.io/devices) and click on the device you are interested in. **These values will not appear if the device has never connected in the past** \- if this is the case, please skip ahead to "Sim Management" below.

On the right-hand side you will see “Last Vitals”, and you can press the reset button to request the latest numbers from the device. (You can also do so by selecting "Run health check" on the bottom of the panel).

You will see the following:

* **Cellular Signal**, with the Operator, access technology (2G/3G/LTE depending on your device) and the Cell Global Identity number (the number used to identify the tower your device is connected to).  
    
_This is useful to ensure your device is connecting to the expected technology given acceptable local signal._
* **Round trip time** \- basically a cellular ping time. _Longer times here indicate a less than optimal signal._
* Amount of **RAM** used and total available.  
_High RAM usage can lead to device lock-up._
* **Battery charge level**.
* Number of recent **disconnects** from the Particle Cloud.  
_Frequent disconnects can point to issues with signal quality (Low Signal Quality values will correlate) and/or local interference._
* Number of **rate-limited** publish attempts.  
_If you see anything other than 0 here, you are attempting to publish to the cloud more than once a second. Implement code changes to avoid missing critical messages._

You can download a CSV file with your vitals history to dig into more details. In order to do so, click "Download History" on the underside of the Vitals panel.

This is a very information-dense document, but the key things to look out for are:

* **Device.network.signal.strength**  
_This value corresponds to signal “Strength”, with desirable values higher than -85dBm, with a steady decrease in stability as you approach -120dBm. We recommend you use our "%" metrics to scale these values accordingly as there are differences between RSCP and RSRP measurements for 2G/3G and LTE devices respectively._  
![](/assets/images/support/cellular-connectivity1.jpeg)

* **Device.network.signal.quality**  
__This value corresponds to signal “Quality”._  
_For 3G devices, the metric for Signal Quality is EC/IO. In the case of the LTE devices, the metric for Signal Quality is RSRQ (Reference Signal Received Quality). This is a measure of the signal quality of LTE cellular connection. You can check this signal value in the historical vitals file of each device. This file is available on the web page of the device._  
_EC/IO and RSRQ are typically displayed in a range from 0dB (highest quality) to -20dB (lowest quality). Typically better signal quality results in a more reliable connection. Lower values (-16dBm) are considered insufficient for a sustainable connection (eg. potentially due to interference in operating environment)._  
_We also convert this value to a readable “%”. You can refer to this percentage on the SIGNAL QUALITY graph and in the above mentioned “Download History”” file._  
    
![](/assets/images/support/cellular-connectivity2.jpeg)

* **Device.network.cellular.operator**  
_Seeing -1200 here indicates the response from the modem was not received in a timely manner and would indicate a bad signal. **Please note that on DeviceOS 1.5.0, this key returns -1200 regardless of signal strength: a regression that was fixed in DeviceOS 1.5.1.**_
* **Device.cloud.connection.error**  
_Common errors here include 1 (ping timeout) and 17 (error establishing a session), both commonly associated with signal issues. See below for more information about error codes!_
* **Device.power.source**  
_Useful to determine what is powering your device (VIN, battery, etc…). **It’s worth explicitly stating that 2G/3G devices have specific current requirements ([link](/reference/datasheets/e-series/electron-datasheet/#usb)) in order to connect.**_
* **Device.power.battery.state**  
_Is your battery charging or not?_
* _**Device.power.battery.charge**_  
_The amount of charge in your battery (percentage)._

**Note:** error logging in the Device Vitals is provided via error codes. You can find annotated error messaging for system logs here ([link](https://github.com/particle-iot/device-os/blob/develop/services/inc/system%5Ferror.h#L24)) and communication logs here ([link](https://github.com/particle-iot/device-os/blob/develop/communication/inc/protocol%5Fdefs.h#L23)).

## SIM Management

If your cellular device has trouble getting online, make a note of its ICCID (the identifier for your SIM Card). If this device has come online in the past and is visible in the Console, merely click on the Device in question to check the ICCID number. If the device has never come online, you can find this information by either checking the packaging for your Particle SIM and/or (especially in the case of embedded SIM devices), following the instructions [here](/troubleshooting/guides/device-management/finding-your-device-id/) to ask the device to reveal this number for you.  
  
Once you have your ICCID, be sure to check [the console SIMs page](https://console.particle.io/sims) to ensure the SIM is Active. If the SIM does not appear in your sandbox SIMs page (or in the respective SIM Management page for a given Product), please activate your SIM by following the steps at [setup.particle.io](https://setup.particle.io). If the SIM does appear in the SIM list but is marked as “Deactivated”, please Activate the SIM by pressing the “…” marking on the right-hand side of the SIM Management page. Should you have any issues with SIM Activation, please visit our Article on “Troubleshooting SIM Activation/Deactivations.”  
  
If all of the above are correct, and your device is blinking green, Cloud Debug is the next step. 

## Cloud debug

#### What is cloud debug?

Cloud debug is a precompiled firmware binary that communicates with the modem and spits out the information over serial.

These logs are helpful in determining what the modem is sending to and hearing back from the tower.

Cloud debug is a tool to debug cloud connection issues. It:

* Prints out cellular parameters (ICCID, etc.)
* Prints out your cellular carrier and frequency band information
* Pings your IP gateway
* Pings the Google DNS (8.8.8.8)
* Does a DNS server lookup of the device server (device.spark.io)
* Makes an actual cloud connection
* Acts like Tinker after connecting
* Can print out information about nearby cellular towers

You can download Cloud Debug here: [https://github.com/particle-iot/cloud-debug.](https://github.com/particle-iot/cloud-debug)

If you would like to source debug logs using your application binary instead, follow the link [here](/troubleshooting/guides/device-troubleshooting/how-do-i-collect-trace-logs-from-my-device/).

**NOTE: trace logs are _substantially_ more detailed and useful on Device OS 2.x and 3.x.** 
  
### Google chrome users can flash and see debug logs directly from the browser thanks to the wonders of Web USB: [Web Cloud Debug](/troubleshooting/connectivity/cloud-debug/)

#### Gathering debug logs

The best way to produce these logs is with `particle serial monitor --follow` in [CLI](/getting-started/developer-tools/cli/). We recommend resetting the device after running this command so that you are able to source logs from the device from the very beginning of the application.

Several seconds after connecting serial monitor, the tests will begin.

#### Interpreting cloud debug

Once you have the logs, scan through it and look out for the following responses to the CREG AT command:

#### 2,3

_2,3 indicates your SIM card is being rejected by the local tower. **Please ensure that your SIM card is active!** If your SIM card is indeed active, this error could occur for various infrastructural reasons; it might resolve itself if you have a day or two to wait._ 

_If not, please [submit a support ticket](https://support.particle.io/) at so we can check with our MVNO what is going on._

#### 2,2

_2,2 indicates no compatible carrier is available on the local tower for the SIM card._

#### 2,0

_2,0 indicates a lack of available local towers._

#### 2,5

_Indicates a successful connection to the tower._  

Once you have these logs in hand, reach out to our [support team](https://support.particle.io/) with about 10 minutes or so of those logs! 

#### Uninstalling cloud debug

Put your device in DFU mode (blinking yellow) by pressing RESET and SETUP. Release RESET and continue to hold down SETUP while the LED blinks magenta until it blinks yellow, then release SETUP. Then run the following command in the CLI:

`particle flash --usb tinker`

## Troubleshooting your antenna

There are some circumstances where fixed-location devices just cannot get the service they need. A great way to evidence this is by using the Cloud Debug tool above, and looking for the telltale`CEREG 2,0` and `2,2` traces.

It's worth double-checking your uFL connector for physical defects - this part is quite delicate and often vulnerable to user damage.

Barring any physical damage to the unit, the next step is to thoroughly evaluate whether the device can be moved in any way - oftentimes, for indoor devices, a few feet closer to a window can make a world of difference. Should a relocation insufficiently address your connectivity issue it may be worth exploring an alternative antenna - but please note that prototyping with an alternative antenna may have certification implications. 

Should this be your object of interest, please read our technical notes on this subject thoroughly, located here: ([link](/hardware/certification/antenna/)).

## Submitting a ticket

### In order to provide our support team the opportunity to address your request with optimal efficiency, please supplement any and all cellular connectivity tickets with the following information (to the extent possible):

1. Confirmation that the antenna and (if using a 2G/3G device) LiPo battery connections satisfy a visual inspection.
2. An attached Device Vitals History .pdf, downloadable in the Console per the instructions above. (Please note that this resource will not appear if the device has never connected in the past).
3. Confirmation that the SIM associated with this device is indeed active within the Console. If you are using a 3rd Party SIM, please specify that you are doing so, taking care to note that we cannot help troubleshoot cellular connectivity for 3rd Party configurations.
4. At least ten minutes of Cloud Debug logs documenting the connectivity incident. If possible, please further supplement these logs with a carrier scan, accomplished by resetting the device and using the \`c\` command to request a carrier scan (note: carrier scans not supported on LTE devices, so just Cloud Debug logs will suffice in this instance).
5. The location of the device in question (e.g. GPS coordinates).
6. A brief connectivity history, if possible including timestamps.
