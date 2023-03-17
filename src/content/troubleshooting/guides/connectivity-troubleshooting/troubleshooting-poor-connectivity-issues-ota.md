---
title: Troubleshooting Poor Connectivity Issues & OTA
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
The guide looks at certain issues and solutions for Poor Connectivity and OTA failures. This article is divided into the following:

* 1st Checks
* Device Vitals
* Device disconnecting intermittently with high data consumption
* Dealing with OTA failures
* Rural or extreme locations
* Cellular Class

## 1st Checks

For 2G and 3G connectivity, do power the device using a battery. USB will not provide adequate power. Such networks require more power. If there is not enough power, there is no explicit error in Cloud Debug logs, but there will be a line stating “Battery state: disconnected”.

You can also check that the antenna is firmly attached and that the most suitable antenna is used. You can read more [here](/hardware/certification/antenna/#compatible-devices-cellular-),

If the antenna is not properly connected, the Cloud Debug logs will output CREG 2,0 and CREG 2,2 alternately.

All said, devices require both good cellular signal power and quality. Without either, the connectivity will be affected. To understand more about cellular signal, you can read [here](/getting-started/console/device-vitals/).

## Device vitals

You can view the Device Vitals and observe the in-use behavior over time. The Device Vitals are stored for 30 days. Once you detect connectivity issues, we encourage you to quickly investigate using the above information.

You can download connectivity metrics by navigating to the Console page for a given device, navigating to the “Get Vitals” panel on the left-hand-side, and selecting “Download History.” You can find information about how to interpret these results here.


## Device disconnecting intermittently with high data consumption

  
There are usually two main reasons:  

- a high rate of application-driven calls to our Cloud API
- high rate of system-related calls made to keep your device online 

If you have done the math on your expected data consumption based on Publish payload size and frequency, it's possible that your device is experiencing poor enough connectivity.  
Devices with connectivity issues may experience frequent, abrupt disconnects - sometimes in the middle of the handshake process. In certain edge cases, this can lead to noticeably higher-than-expected data consumption. The device is forced to consume data in order to try to get online.  

You can also read more about cellular data consumption [here](/getting-started/billing/cellular-data/#cellular-data-service-with-particle).

## Dealing with OTA failures

To prevent devices with low cellular signal strength and quality, from repeatedly attempting to OTA update, you can check for cellular signal before OTA updates using [Cellular Signal](/reference/device-os/api/cellular/cellularsignal-class/) and [Disable Updates](/reference/device-os/api/ota-updates/system-disableupdates/).  
  
One thing that can cause problems is special sleep logic. Once the download starts, if there is not enough wait before sleep, the download will start over from the beginning with DeviceOS 2.x and may never complete. With DeviceOS 3.x on Gen 3, then it will resume from where it left off before sleep.

One thing that can cause problems that you have control over is if you have any special sleep logic. Once the download starts, ideally it should be completed before sleep. For Device OS 2.x, OTA never resumes. With 3.x on Gen 3, then it will resume from where it left off before sleep.

We have a back-off algorithm to cater for failed OTAs. If the initial OTA fails, we will delay the retry for 5 minutes. For each failed retry, this backoff timing will be doubled. The maximum backoff period is 1 hour.

If the OTA is interrupted, it can resume from where it was interrupted. This improves the data transfer for sleepy devices and devices with poor connectivity which do not stay online long enough to receive a complete update.

Firmware updates have a much higher odds of success than deviceOS updates. Users have reported that the “sweet spot” of up to 10 minutes improve update success.

## Rural or extreme locations

We have clients implementing at extreme locations such as rural and forested areas with poor signal strength.

To improve the signal, you can use a [cellular booster](/hardware/certification/antenna/#cellular-boosters-and-micro-cells). We have seen users deploying successfully at the San Francisco bay.

## Cellular class

You can use these functions for deeper troubleshooting [here](/reference/device-os/api/cellular/cellular/).
