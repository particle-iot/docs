---
title: Device Breathing Cyan But Cannot Connect
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
A device that is breathing cyan but cannot connect (e.g. you cannot ping the device in the Console) has three likely causes, both of which should be easily actionable to the user. The following outlines a few strategies to debug, in four sections:

* [The Console Online Indicator](https://support.particle.io/hc/en-us/articles/360060114433#the-console-online-indicator)
* [Keeping System Firmware Up To Date](https://support.particle.io/hc/en-us/articles/360060114433#keeping-system-firmware-up-to-date)
* [Checking For Sporadic RF Issues](https://support.particle.io/hc/en-us/articles/360060114433#checking-for-sporadic-rf-issues)
* [Identifying Blocking Firmware](https://support.particle.io/hc/en-us/articles/360060114433#identifying-blocking-firmware)

## The Console Online Indicator

It's worth explicitly stating that the Console's **Online Indicator** is not a real-time status indicator. For cellular devices, it has a lag of up to as much as 46 minutes (two successive missed Keep-Alives). This article is not meant to address Devices that are "online" in the Console but not breathing Cyan in the field.

## Keeping System Firmware Up To Date

Prior to Device OS 1.3.1, firmware connectivity-blocking issues can be disguised as a "Breathing Cyan But Cannot Connect" state. This is because `Particle.connected()` returned true immediately after successfully resuming a session, but not prior to a completed handshake. While Device OS 1.3.1 fixes this issue ([link](https://github.com/particle-iot/device-os/pull/1825)), we recommend upgrading system firmware to at least the most recent production version following the instructions here ([link](/reference/device-os/versions/#sts=Device%20OS%20Versions,%20Upgrades,%20and%20Downgrades)). Note: updating your Device OS may not result in a successful connection, but it may kick the device out of the Breathing Cyan state - allowing the Status LED to show more useful information about its connectivity status. 

### 

##   
**Checking For Sporadic RF Issues** 

An environment that has _just enough_ cellular connectivity to allow for successful connections but _not enough_ to prevent constant timeouts and long roundtrip times could put a device into this condition.   
  
The Particle Console provides you with current and historical Device Vitals that are helpful in debugging cellular connections. To see Device Vitals, head to: <https://console.particle.io/devices>, and click on the device you are interested in. **These values will not appear if the device has never connected in the past** \- if this is the case, please skip ahead to "Sim Management" below.  
  
On the right-hand side you will see “Last Vitals”, and you can press the reset button to request the latest numbers from the device. (You can also do so by selecting "Run health check" on the bottom of the panel). For devices that are Breathing Cyan but can't connect, we recommend downloading the CSV file with your vitals history to dig into more details. In order to do so, click "Download History" on the underside of the Vitals panel.  
  
This is a very information-dense document, but the key things to look out for are:

1. **Device.network.signal.strength**  
_This value corresponds to signal “Strength”, with desirable values higher than -85dBm, with a steady decrease in stability as you approach -120dBm. We recommend you use our "%" metrics to scale these values accordingly as there are differences between RSCP and RSRP measurements for 2G/3G and LTE devices respectively._
2. **Device.network.signal.quality**  
_This value corresponds to signal “Quality”, lower values (< -14dBm) may indicate the device has trouble talking to the tower (eg. potentially due to interference)._
3. _Number of recent **disconnects** from the Particle Cloud._  
_Frequent disconnects can point to issues with signal quality (Low Signal Quality values will correlate) and/or local interference._

Watch for low % values in either of the above categories (e.g. < 20%), and watch for high rates of disconnects. Any of these three metrics point to an environmental/RF issue as the root cause of this device Breathing Cyan.

## Identifying Blocking Firmware

In some edge cases, application firmware can interfere with a device's ability to respond to things like Pings or Function Calls (e.g. devices that reset themselves constantly, that perform blocking actions without Threading enabled, etc...). While root cause in firmware might take some time, it is easy to identify whether or not application firmware is a contributing factor to devices the Breathe Cyan but cannot connect.  
  
In order to establish whether or not your application firmware is blocking, flash blank firmware down to the device that runs with `SYSTEM_MODE_AUTOMATIC` and has an empty `loop()`. However - **please take care to ensure that a blank sketch is safe for your device's hardware configuration, making all the necessary initializations in `setup()` while keeping your application functionally minimal:**

void setup() {  
// any necessary hardware initializations  
}  
  
void loop() {  
// empty, if at all possible  
}  
  
// refrain from declaring any interrupts and try and keep your test firmware as empty as possible

It is worth stating that the majority of these issues do boil down to blocking firmware, so performing the above test is an essential component of the troubleshooting process. If all of the above fails, please [open a support ticket.](https://support.particle.io)
