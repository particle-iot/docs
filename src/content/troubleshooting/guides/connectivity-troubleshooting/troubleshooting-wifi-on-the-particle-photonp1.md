---
title: Troubleshooting Wi-Fi On The Particle Photon/P1
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
_The Particle Argon and Photon/P1 utilize different Wi-Fi stacks. For this reason, we have broken out advanced support for each of these device sets. You can find resources for the Argon here: ([link](/troubleshooting/guides/connectivity-troubleshooting/troubleshooting-wifi-on-the-particle-argon/))._ 

The following article contains 5 sections:

* Basic Wi-Fi Troubleshooting
* Walking Through The Photon's Connectivity Routine
* Network Scan And Authentication
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

## Walking through the Photon's connectivity routine

The Photon/P1's architecture is quite different from the Particle Argon. The Particle Argon uses an ESP32 as a Wi-Fi modem, to which it is connected via UART. In contrary, the Particle Photon/P1 uses a proprietary SDI-based Wi-Fi stack (WICED). As a further point of departure from the Argon, the Photon/P1 does not use an AT-based system to communicate with its modem - instead an all-binary system that provides less visibility for debugging purposes. Visibility is further attenuated by the size of the WICED stack; we do not solicit logs from the WICED stack in order to preserve flash memory availability. However, the Cloud Debug application ([link](https://github.com/particle-iot/cloud-debug/releases)) annotates the process to the extent it can.

After calling `WiFi.on()`, the steps undertaken to connect are as follows:

## Network scan and authentication

* There is limited logging provided at this stage, but it's worth taking note of the application-driven logs here to ensure they are correct and in line with your expectations:

```
[app] INFO: IP Address Configuration: dynamic  
[app] INFO: Configured credentials:  
[app] INFO: ssid=myNetwork security=wpa2 cipher=AES
```

* As well as the results of: `Available access points`. At this stage, an array of available APs should display. If your device cannot find your AP, that can point either to a network compatibility issue (see our Wi-Fi Connectivity Guide - [link](/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/)), or to a simple proximity issue (go closer to the AP).
* Failures that appear immediately after the Wi-Fi scan point to an authentication issue. However, **t** **ake note of the RAM that’s available to your device** (this will be reported by `[app] Free Memory:` and you can modify Cloud Debug source to reveal this information wherever you would like). If your device has low RAM, might not be able to connect because the WICED stack needs to allocate quite a bit (for a WPA2 Enterprise connection it can be as much as 10k).

## IP connectivity

* After this point, if there's an issue, keep an eye out the following:

```
[hal.wlan] TRACE: Bringing Wi-Fi interface up with DHCP   
```

In rare cases, this could be Static if you've configured Static IP addressing on the Photon/P1. Note that the static IP address setting is extremely sticky and resetting Wi-Fi credentials does not clear it. Switching Wi-Fi networks will often require switching to a different IP address.

* This indicates that the low-level link (essentially Ethernet connectivity has been established). Issues thereafter may pertain to IP connectivity. If you do not see the above, line, look for:

```
LOG(ERROR, "wiced_join_ap_specific(), result: %d", (int)result);
```

* This will print out one of the error codes here: ([link](https://github.com/particle-iot/device-os/blob/release/v2.x/hal/src/photon/wiced/WWD/include/wwd_constants.h#L463)). Common results include `1003: Partial Results` (AP Out of Range) and `1024: Network Not Found` (see our Wi-Fi Connectivity Guide for compatibility information - ([link](/troubleshooting/guides/connectivity-troubleshooting/wifi-connectivity-troubleshooting-guide/)).

## DNS and cloud connection

* The next step for the Photon is to resolve DNS. Any errors you see in this regard will typically present themselves as the device tries to make a cloud connection. Failures at this stage will prompt the device to run an `Internet Test` (Device OS 2.0.0+). This test is comprised of two checks - a DNS check and an NTP check. There are three major valences to errors at this stage, one of which will be produced as the result of the Internet Test:  
    
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
