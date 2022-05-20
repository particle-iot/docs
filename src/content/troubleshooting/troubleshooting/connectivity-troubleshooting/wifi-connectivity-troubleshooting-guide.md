---
title: WiFi Connectivity Troubleshooting Guide
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
The following guide is divided into 3 sections:

* [Basic WiFi Troubleshooting](https://support.particle.io/hc/en-us/articles/360052621274#basic-wifi-troubleshooting)
* [Checking Network Compatibility](https://support.particle.io/hc/en-us/articles/360052621274#checking-network-compatibility)
* [Further Troubleshooting Steps](https://support.particle.io/hc/en-us/articles/360052621274#further-troubleshooting-steps)

## Basic WiFi Troubleshooting

Particle's cellular and WiFi stacks differ in a few notable ways. From a troubleshooting perspective, the key difference is _visibility._ For cellular devices, the bulk of network operations are handled by Particle's MVNO and carrier partnerships, allowing our support staff significant visibility into potential cellular connectivity issues. 

However, _for WiFi devices_, the network component is situated much closer to the end user - one's own router, one's own ISP, or one's own commercial networking arrangement. For this reason, we ask our WiFi users to take a more active role in the troubleshooting process. This guide will walk you through the most common blockers to a successful first connection. We ask you to review this list before submitting a WiFi connectivity-related support ticket.

It should be explicitly stated that this guide is relevant to WiFi Particle devices that are blinking green (or alternating between blinking cyan and blinking green). If your device is presenting some other LED state, please return to our Support Portal ([link](https://support.particle.io/hc/en-us)) and select the appropriate resource.

First things first, let's make sure you've done all you can to help this device get connected:

   * Download and install the Particle CLI ([link](https://docs.particle.io/tutorials/developer-tools/cli/)). Connect your device to your computer.
   * Place your device in DFU Mode by pressing RESET and MODE simultaneously, releasing RESET, and then releasing MODE once the status LED blinks yellow. Once the status LED blinks yellow, open up your Command Line ("Teminal" (Mac), "cmd.exe" (Windows)), and then enter the command `particle update`. Allow the device to reset once complete.
   * Place your device in Listening Mode by pressing the MODE button and holding it down for 3 seconds. Once the status LED blinks dark blue, open up your Command Line ("Teminal" (Mac), "cmd.exe" (Windows), and then enter the command `particle serial wifi` and follow the instructions.
   * Place your device in Safe Mode by pressing RESET and MODE simultaneously, releasing RESET, and releasing MODE once the status LED blinks magenta. Give the device ample opportunity to connect.

If your device still struggles to connect, let's first evaluate the compatibility of your network before going through some hands-on troubleshooting. 

## Checking Network Compatibility

**First**, what kind of authentication does your web connection use? If you are on a WPA2 Enterprise connection, please see the relevant support article here: ([link](https://support.particle.io/hc/en-us/articles/360039741153-WPA2-Enterprise-Setup)), and please note that WPA2 Enterprise support is **only** available on the Photon and P1.

**Next**, do you have any firewalls in place that may preempt IoT connectivity?

_This is far, far and way the **most common issue** our Technical Support Team comes across when helping out our WiFi customers! If you do not think you have a firewall active, please double check and if possible contact your system administrator to ensure that no firewall is indeed blocking your Photon, P1, or Argon!_

**From there -** 

   * Does the web connection require users to enter information on any kind of captive portal / login page? This can block Particle devices from successfully authenticating.
   * Please ensure you're not attempting to connect to a 5GHz network. Our WiFi devices only support 2.4GHz networks.
   * Please note that our devices do not support 40MHz wide band channels.
   * Please check to ensure that IPv6 disabled for the network in question.
   * While you’re investigating your network settings, it’s worth confirming that the respective port is open:  
   `Outbound TCP port 5683 (Photon/P1) `  
   `Outbound UDP port 5684 (Argon) `

## Further Troubleshooting Steps

**Before opening a support ticket**, we ask that you please try the following troubleshooting steps:

**Please ensure another device (e.g. your laptop or phone) can connect to the Internet via your network.** If you have another Particle device you can bring this this location, please attempt to connect it as well! Take care to ensure that your Particle device is as close as it can be to your router when trying to troubleshoot.

If no Particle devices can connect to the network in question, **please set up a Mobile Hotspot** and wait for it to appear in the CLI (see the bullet list at the top of this article for connection instructions). A Particle WiFi device should be able to connect to a Mobile Hotspot without issue. If the device continues to blink green when set to connect to a Mobile Hotspot, that eliminates a network-side issue and usually points to an issue with the device itself. When opening a support ticket, please confirm for our support staff that you've attempted this step!

Next, **consult the relevant resource for advanced WiFi troubleshooting**:

* [Troubleshooting WiFi on the Photon/P1](https://support.particle.io/hc/articles/1260800691709/)
* [Troubleshooting WiFi on the Argon](https://support.particle.io/hc/articles/1260800691709/)

To take advantage of the above resources, you will need to follow the instructions here ([link](https://github.com/particle-iot/cloud-debug)) to source important debug logs via Cloud Debug. Please note the uninstallation instructions at the bottom of the link as well. Using the serial monitor per the instructions, please gather about 10 minutes or so of logs that document the device attempting to connect. Please then copy and paste those logs into a .txt or .log file and attach them to your support request.

 It's worth doing a bit of diagnostic digging into these logs as well:

   * For Argons only - is `TRACE: < +CWLAP` able to find your AP?
   * Do you see the message `TRACE: < WIFI CONNECTED` (indicating that the device is in fact able to connect to the router)?
   * Is your device able to resolve DNS? You can follow along starting at: `TRACE: Resolving <your_device_id>.<protocol>.particle.io` \- DNS failures typically announce themselves, or you will find strange IP addresses like 0.0.0.0.
   * Finally, do you see any errors after DNS resolution, e.g. a handshake error? Usually errors at this stage point to a firewall issue (but not always). Take a note of the error code and include it in your ticket!
