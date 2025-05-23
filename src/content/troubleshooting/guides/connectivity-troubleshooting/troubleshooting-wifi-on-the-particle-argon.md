---
title: Troubleshooting Wi-Fi On the Particle Argon
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
_The Particle Argon and Photon/P1 utilize different Wi-Fi stacks. For this reason, we have broken out advanced support for each of these device sets, this article is for the Particle Argon. You can find resources for the Photon/P1 [here](/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-photonp1/)._

The following article contains 7 sections:

* Basic Wi-Fi Troubleshooting
* Walking Through The Argon's Connectivity Routine
* Initialization
* Network Scan And Authentication
* Wi-Fi Link
* IP Connectivity
* DNS And Cloud Connection

## Basic Wi-Fi troubleshooting

First things first, let's make sure you've done all you can to help this device get connected:

* Download and install the Particle CLI ([link](/getting-started/developer-tools/cli/)). Connect your device to your computer.
* Place your device in DFU Mode by pressing RESET and MODE simultaneously, releasing RESET, and then releasing MODE once the status LED blinks yellow. Once the status LED blinks yellow, open up your Command Line ("Terminal" (Mac), "cmd.exe" (Windows)), and then enter the command `particle update`. Allow the device to reset once complete.
* Place your device in Listening Mode by pressing the MODE button and holding it down for 3 seconds. Once the status LED blinks dark blue, open up your Command Line ("Terminal" (Mac), "cmd.exe" (Windows), and then enter the command `particle serial wifi` and follow the instructions.
* Place your device in Safe Mode by pressing RESET and MODE simultaneously, releasing RESET, and releasing MODE once the status LED blinks magenta. Give the device ample opportunity to connect.

If your device still struggles to connect, please ensure that you have walked through the Wi-Fi Connectivity Guide here: ([link](/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/)) and have collected the requested logs from Cloud Debug ([link](https://github.com/particle-iot/cloud-debug/releases)).  
  
Please remember that in order to source the requisite logs to proceed, you will need to download Cloud Debug and install it onto your device (see the Cloud Debug link above for instructions). From there, open up the terminal of your choice (cmd.exe (Windows) or Terminal (Mac), and enter the CLI ([link](/getting-started/developer-tools/cli/)) command `particle serial monitor --follow`. Then connect your device via USB.

## Walking through the Argon's connectivity routine

The following walkthrough of the Argon's connectivity routine is provided to help users pinpoint the specific location in the connectivity process where an issue is occurring. See above for instructions about log collection.

The Argon's architecture is similar to that of Particle's Boron/B-Series, with the most meaningful point of difference being its Network Co-Processor. The Particle Argon uses an ESP32 as a Wi-Fi modem, to which it is connected via UART. Whenever you see a muxer referenced in Argon logs, it denotes the 2-channel communication stream between the Argon MCU (the NRF chip) and the ESP32\. 

After calling `WiFi.on()`, the steps undertaken to connect are as follows:

## Initialization

* The Argon powers on the ESP32\. This action will return `OK` and will be further confirmed via the line `NCP ready to accept AT commands`.
* The muxer will then initialize and some preliminary points of connection will be made.
* The device's network manager `system.nm` will authorize state change to "up" - essentially providing the device the administrative go-ahead to proceed. This will be confirmed by `net.ifapi` (essentially the same type of agent as the ifconfig tool on a Mac). This line looks like this:

```
[system.nm] INFO: State changed: IFACE_REQUEST_UP -> IFACE_UP
```

## Network scan and authentication

* The device will scan for networks via the `CWLAP` AT command - this the AT command implicated when you run `WiFi.connect()` or `WiFi.scan()`. At this stage, an array of available APs should display. If your device cannot find your AP, that can point either to a network compatibility issue (see our Wi-Fi Connectivity Guide - [link](/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/)), or to a simple proximity issue (go closer to the AP).
* Your Wi-Fi credentials are stored inside the Argon's filesystem. It will scroll through the enumerated APs and look for SSID + Password matches. The authentication process begins and is confirmed by this line:

```
[hal] TRACE: Connecting to "myNetwork"  
[ncp.at] TRACE: < OK”
```

* Failures that appear between the Wi-Fi scan and the above successes point to an authentication issue. Since the `CWJAP` AT commands is the next one called, the error code returned from the ESP32 in response to that command might help you diagnose issues at this stage - see the link here: ([link](https://docs.espressif.com/projects/esp-at/en/latest/AT%5FCommand%5FSet/Wi-Fi%5FAT%5FCommands.html#cmd-jap)).

1: connection timeout.  
2: wrong password.  
3: cannot find the target AP.  
4: connection failed.

## Wi-Fi Link

* The ESP32 will then establish a simple link, as evidenced by the line:

```
[net.ifapi] INFO: Netif wl3 link UP
```

* This is a simple low-level connection, essentially an ethernet connection to the local network.

## IP connectivity

* Argons use DHCP for IP connectivity so please ensure that this is enabled on your network. (Note - while the Photon/P1 can also support static IPs, the Argon cannot).
* If DHCP fails, you will **not** see the following line:

```
[hal] INFO: DNS server list changed
```

* If it succeeds, you can watch the device receive an IP:

```
[net.ifapi] TRACE: Netif wl3 ipv4 configuration changed -> got configuration via DHCP  
[system.nm] INFO: State changed: IFACE_LINK_UP -> IP_CONFIGURED
```

* If you reach this point, the device can essentially "talk IP" with its network - of course, a fundamental requirement for securing a Cloud connection.

## DNS and cloud connection

* The next step for the Argon is to resolve DNS. Any errors you see in this regard will typically present themselves as the device tries to make a cloud connection. Failures at this stage will prompt the device to run an `Internet Test` (Device OS 2.0.0+). This test is comprised of two checks - a DNS check and an NTP check. There are three major valences to errors at this stage, one of which will be produced as the result of the Internet Test:  
    
   * **Idle Network** \- the device was unable to resolve DNS. This could be due to a DNS configuration issue on your network, or it could be due to a **firewall**, a **captive portal** (e.g. a second stage of authentication launched _after_ you have already connected - common on a lot of business and academic networks), or a **disabled UDP port.** See our Wi-Fi Connectivity Guide ([link](/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/)) for more information.  
   * **Timeout** \- the device was able to send something outside of the network, but it was unable to receive a response. See "Idle Network" for potentially related issues.  
   * **Network** \- a more generic network error in which the device's connectivity was likely interrupted (e.g. lost connection to the AP, AP dropped the connection, etc...).

* You can find more information about the internet test here: ([link](https://github.com/particle-iot/device-os/blob/develop/system/src/system%5Ftask.cpp#L261)).
* After calling `Particle.connect()`, the device will attempt to find and negotiate a connection with the Particle Cloud. If you are unable to successfully connect to the Particle Cloud, you will see an error after this line:

```
[system] INFO: Cloud: connecting
```

* The device will first attempt to use stored session data, which may or may not be available to the device. For this reason **this ERROR or WARN message is benign**:

Failed to load session data from persistent storage  

* Any other error that occurs here is likely not benign, and will point to one of three issue areas:  
   * **Firewall** \- please ensure that any firwalls active on your network are not blocking Particle's servers.  
   * **Firewall** \- please ensure that any firwalls active on your network are not blocking CoAP.  
   * Check for a **keys issue** ([link](/troubleshooting/guides/device-management/repairing-product-device-keys/)).  
   * Check <status.particle.io> to ensure that there are no active outages. This is very rare and the overwhelming majority of cases of failed Cloud connections boil down to one of the above issues.
