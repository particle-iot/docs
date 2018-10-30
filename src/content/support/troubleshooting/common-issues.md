---
title: Common Issues
layout: support.hbs
columns: two
devices: [ photon,electron,core,argon,boron,xenon ]
order: 1
---

# Common Issues

This section will help walk you through the diagnosis and resolution of the most common roadblocks that our users run into. Some of these roadblocks are caused by issues or bugs in the platform, but many are more innocuous than that, and few are permanent. We'll help you identify exactly why your device is `insert_issue_here` and help you get it back to happily connected.

## Device Doctor

If your {{device}} used to work but is not connecting to the cloud anymore, the easiest way to get it back to health is to use the Device Doctor.

- Install [the Particle CLI](/tutorials/developer-tools/cli)
- Run [`particle device doctor`](/reference/cli/#particle-device-doctor)
- Follow the prompts to reset various settings on your device.

{{#if has-cellular}}

## Blinking Green

{{device-animation device "blink" "lime" }}

Cellular devices that are blinking green have successfully read the APN data from the inserted SIM card and are attempting to connect to a cellular tower. There are many different reasons that your {{device}} might fail to connect to your nearby cellular network. Here are a few things you can check if you find your device in an endless loop (5 minutes+) of blinking green:

### 1) Is your {{device}} compatible with your local cellular network?
There are three different variants of the {{device}}, and they each work in different parts of the world:


| Name  | Service | Service Location | Bands (MHz) |
| ------------- | :-------------: | :----: | :----: |
| Electron G350  | 2G only | Worldwide | 850/900/1800/1900
| Electron U260  | 3G with 2G fallback | North and South America, Australia | 850/1900
| Electron U270 | 3G with 2G fallback | Europe, Asia, Africa | 900/1800/2100 |

Make sure that your device is compatible with the cellular infrastructure in your country. Small country-by-country variations from the generalized table above may apply. For a detailed list of 3G service country by country, <a href="https://www.particle.io/products/connectivity/cellular-iot-sim-2g-3g-lte#additional-mbs" target="_blank">please visit the following link</a>.

If your device is not compatible with the cellular infrastructure in your country, **it will be unable to connect to the Internet using a Particle SIM or any other SIM.**

### 2) Is your antenna connected?
Your {{device}} cannot connect without the included external cellular antenna. Please make sure it is connected as depicted below:

![Attach the antenna](/assets/images/antenna_attach.jpg)

### 3) Is your battery connected?
Your {{device}} *requires a Li-Po battery or high current power source to communicate wirelessly*. Make sure your battery is connected as depicted below:

![Connect the battery](/assets/images/attach_batt.jpg)

While the {{device}} does not *require* that you attach the USB cable, this will ensure that your battery does not run out of charge during the connection process.

### 4) Is your SIM activated?
In order for your Particle SIM card to connect to the cellular network, it needs to be activated. The *only* way to do this is to go through SIM activation and setup at [https://setup.particle.io](https://setup.particle.io). Follow the on-screen prompts to complete device setup and SIM activation.

### 5) Are you using a 3rd party (non-Particle) SIM?
If you're not using a Particle SIM, you will have to change the cellular APN on the {{device}} before it can connect. A Username and Password may also be required.  To connect the {{device}} with a 3rd party SIM, visit our [setup page](http://setup.particle.io), choose  "Setup an {{device}} with SIM card" and follow the on screen instructions to set your APN, download a new firmware binary, and flash it to your device.

> **NOTE**: Until you have done this, your device _will not_ be able to connect to the Internet.

There are additional instructions in the [3rd-party SIM FAQ](/support/particle-devices-faq/electron-3rdparty-sims).

### 6) Check the cellular coverage in your area
The {{device}} leverages a number of cellular carriers to provide excellent coverage, but it *is* possible that you are outside GSM coverage in your country. Fortunately, it's relatively simple to check:

- Go to [the pricing page](https://www.particle.io/products/connectivity/cellular-iot-sim-2g-3g-lte#additional-mbs) and select your country from the dropdown. Note the cellular provider in your country. In the US, for example, service is provided by `T-Mobile and AT&T`.
- Navigate to <a href="http://opensignal.com" target="_blank">http://opensignal.com</a> in your browser
- If you have an Electron G350, select "2G" and unselect "3G" and "4G" options. If you have an Electron U260 or U270, select both "2G" and "3G" and unselect the "4G" option. Limit the coverage map to the carrier providing service to your Particle SIM in your country (`T-Mobile and AT&T` in the US, for example).
- Check the coverage map to ensure that you have coverage in your area.

If you are outside of the coverage map, it's possible that the Particle SIM does not have coverage in your area, and your device will be unable to connect. We are always looking to expand our coverage network, and hope to provide coverage in your area soon!


### 7) Check the cellular reception in your location
Cellular *coverage* and cellular *reception* are slightly different.  Coverage is determined by the location and availability of cellular towers in your neighborhood. Even if there is coverage, your device might not have *reception*. Things like RF interference, being in a basement, or a damaged antenna might affect your device's ability to get a good signal from the cell tower nearby.

There are a bunch of things that you can do to improve your cellular reception:

- Check the coverage on your phone (if it is on a GSM network) as a comparison point. Do you get a good signal?
- Try going outside, or by a window, to confirm that your device can connect


### 8) Check your data limit
If you've been using your {{device}} successfully for a while and it's now just started flashing green, you might have hit your data limit, and your SIM might be paused. You can check your data usage and update your data limits by visiting the SIM console at the following link:

[https://console.particle.io/billing](https://console.particle.io/billing)

### 9) Cold boot your device
If all else fails, try restarting it! Remove *both* the USB cable and Li-Po battery from the {{device}}, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the {{device}} should reboot and retry the connection sequence.

### 10) Are Particle's mobile carriers experiencing issues?
Check out [our status page](http://status.particle.io/) to see if there's a known issue with Particle's mobile carriers.

### 11) Contact Particle
Still having issues? [Write us an email](/support/support-and-fulfillment/menu-base/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.

## Blinking Blue

{{device-animation device "blink" "blue" 300 300 }}

Devices that are blinking blue are in listening mode. When an {{device}} boots up, it will attempt to read information from the its SIM card to connect to the cellular network. Electrons that do not have a SIM card, or that have an improperly configured SIM card will be unable to connect to a cell tower and will default back to listening mode. If you're in listening mode and don't want to be, try the steps listed below:

### 1\. Is your SIM card inserted?
Your device cannot exit listening mode and connect to a cellular tower if your SIM is not inserted. Please make sure your SIM is inserted as demonstrated below:

![Insert your SIM](/assets/images/insert_sim.jpg)

### 2\. Is your SIM card *fully* inserted?
Give your SIM an extra little push to make sure it's fully in the SIM card holder. No need to press too hard--just make sure there's no empty space between the card and the end of the holder.

### 3\. Try a cold boot
Remove *both* the USB cable and Li-Po battery from the {{device}}, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the {{device}} should reboot and retry the connection sequence.

### 4\. Check the integrity of your SIM card holder
Visually inspect the SIM card holder. Are all of the contacts soldered down? Does the holder lie flush against the {{device}} PCB (printed circuit board)? Are any of the pins bent or depressed downwards?

The first step is to remove the SIM card and gently press down on the metal band. The little bit of extra pressure from the band is often enough for the SIM to work properly.

The easiest way to identify a bad contact in the holder is by removing the SIM card and looking at the marks on the contacts. If there are any contacts without marks, then one of the spring pins in the holder may be bent down. You can try to fix this yourself by gently bending the pin upward until it lines up with the others using a pair of fine tweezers or an exacto knife.

![Identifying and fixing SIM holder](/assets/images/bad-sim-socket.png)
<p class="caption"> <a target="_blank" href="/assets/images/bad-sim-socket.png">Click here</a> for a larger image.</p>

Try using your hands to press down on the SIM card to improve contact between the SIM and the metal pins underneath--while pressing on the SIM card, press the `{{reset-button}}` button on the {{device}}. If you see the device begin to connect to the cellular network (flash green), you may have a damaged SIM card holder and should [contact Particle](/support/support-and-fulfillment/menu-base/).

### 5\. Is your SIM card damaged or defective?
Try using the SIM card from your cell phone, if you have one. If the RGB LED on the {{device}} begins to blink green when your phone's SIM is inserted, your Particle SIM may need to be replaced, and you should [contact Particle](/support/support-and-fulfillment/menu-base/).

### 6\. Contact Particle
Still having issues? [Write us an email](/support/support-and-fulfillment/menu-base/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.


## Breathing Magenta

{{device-animation device "breathe" "magenta" }}

If your {{device}} is breathing magenta, it is in Safe Mode. This means that, although it is connected to the Cloud, it is not running your user firmware. Your device can end up in Safe Mode if the user app that you programmed became corrupted.

Normally, if your user firmware requires a newer version of Device OS, it will automatically update itself using the safe mode healer. 

If this is not working, you can reset the user firmware and Device OS using these steps:

Put the {{device}} in DFU mode by holding down both the RESET and MODE buttons, releasing RESET and continuing to hold down MODE until it blinks yellow and issue this command in a Command Prompt or Terminal window. 

```
particle flash --usb tinker
```

Put the {{device}} back into DFU mode (blinking yellow), then:

```
particle update
```

## Blinking Cyan

{{device-animation device "blink" "cyan" }}

If your {{device}} is blinking cyan and sometimes orange/red without connecting, it is helpful to first try to manually update your firmware, in the same way as listed as above. If this does not work, then move on to a key reset.

### Public Key Reset

Sometimes, a firmware upgrade will not be enough to solve your Photon's problem. If your are still having an issue, and particularly **if your {{device}} is blinking cyan and sometimes orange/red without connecting**, It's time to try resetting the public key.

Put the {{device}} into Listening mode (blinking blue) by holding down MODE until it blinks blue. Then issue the CLI command:

```
particle serial identify
```

Save the Device ID; you’ll need it later.

Then put the {{device}} in DFU mode by holding down both the RESET and MODE buttons, releasing RESET and continuing to hold down MODE until it blinks yellow and issue the commands below, in order.

```
particle keys server
particle keys doctor YOUR_DEVICE_ID
```


{{/if}}

{{#if photon}}

## Breathing Magenta

{{device-animation device "breathe" "magenta" }}

Normally, if your user firmware requires a newer version of Device OS, it will automatically update itself using the safe mode healer. 

You can reset the user firmware and Device OS using these steps:

Put the {{device}} in DFU mode by holding down both the RESET and MODE buttons, releasing RESET and continuing to hold down MODE until it blinks yellow and issue this command in a Command Prompt or Terminal window. 

```
particle flash --usb tinker
```

Put the {{device}} back into DFU mode (blinking yellow), then:

```
particle update
```

### Manual Firmware Update

The particle update command above is the preferred way to update, however you can update manually using these steps:

If you do not have a Mac/Apple computer then you should not read the instructions below for a firmware upgrade. These are specifically for users who have Mac OS/OS X machines.

*For Windows* If you have a Windows machine, please follow <a href="http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html" target="_blank">these instructions</a>.

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/particle-iot/firmware/releases).

To upgrade your Photon, follow the instructions below:

-  Download the latest system Part-1 and Part-2 firmware binaries for the Photon linked here: [latest release](https://github.com/particle-iot/firmware/releases/latest)

-  Install dfu-util on your Mac using: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: <a href="http://brew.sh/" target="_blank">http://brew.sh/</a>

-  Put photon into DFU MODE, instructions [here](/tutorials/device-os/led/photon/#dfu-mode-device-firmware-upgrade-).

-  Flash part1:
```dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-x.x.x-photon.bin``` (replace x.x.x with actual version number)

-  Flash part2, unit should still be blinking yellow:
```dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-x.x.x-photon.bin``` (replace x.x.x with actual version number)

-  Wait... Your device should eventually restart and start blinking blue, breathing cyan, or flashing green -- all dependent on if you've setup the device before.



## Blinking Cyan

{{device-animation device "blink" "cyan" }}

If your Photon is blinking cyan and sometimes orange/red without connecting, it is helpful to first try to manually update your firmware, in the same way as listed as above. If this does not work, then move on to a key reset.

### Public Key Reset

Sometimes, a firmware upgrade will not be enough to solve your Photon's problem. If your are still having an issue, and particularly **if your Photon is blinking cyan and sometimes orange/red without connecting**, It's time to try resetting the public key.

Put the Photon into Listening mode (blinking blue) by holding down SETUP until it blinks blue. Then issue the CLI command:

```
particle serial identify
```

Save the Device ID; you’ll need it later.

Then put the Photon in DFU mode by holding down both the RESET and SETUP buttons, releasing RESET and continuing to hold down SETUP until it blinks yellow and issue the commands below, in order.

```
particle keys server
particle keys doctor YOUR_DEVICE_ID
```

## Blinking Green

{{device-animation device "blink" "lime" }}

If your device is blinking green without connecting, there are a few things to check immediately.

### Wi-Fi network requirements

Your device works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured), with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the device will not connect.
- **Networks with <a href="http://en.wikipedia.org/wiki/Captive_portal" target="_blank">"captive portal"</a> security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The device can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the devices to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex Networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.
- If your router uses **WEP encryption**, you should upgrade your router to something more secure. However it may be possible to connect your Photon with some difficulty by following the [WEP configuration instructions](http://rickkas7.github.io/wep/).

{{/if}}

{{#if photon}}
**Prerequisites for Setup**
* **Software**
  * Particle Mobile App - <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8" target="_blank">iPhone</a> | <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" target="_blank">Android</a> | <a href="https://www.microsoft.com/en-us/store/p/particle/9nblggh4p55n" target="_blank">Windows</a>
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone, Windows, or Android smartphone
* **Wi-Fi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcast SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP Wi-Fi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}
**Prerequisites for Setup**
* **Software**
  * Spark Core Mobile App - <a href="https://itunes.apple.com/us/app/spark-core/id760157884" target="_blank">iPhone</a> | <a href="https://play.google.com/store/apps/details?id=io.spark.core.android" target="_blank">Android</a> | <a href="https://www.microsoft.com/en-us/store/p/particle/9nblggh4p55n" target="_blank">Windows</a>
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone, Windows, or Android smartphone
* **Wi-Fi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcast SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP Wi-Fi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}

## Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using <a href="http://dfu-util.sourceforge.net/" target="_blank">dfu-util</a> and installing the [Particle CLI](/tutorials/developer-tools/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Put the Core in DFU mode by holding down both the RST and MODE buttons, releasing RST and continuing to hold down MODE until it blinks yellow and issue the commands below, in order.

After completing some of the steps the color may change to something else; if so note what color/pattern it is, then use the button combination to get back to blinking yellow. The core should be blinking yellow before each of the commands listed below is entered.

```
particle flash --usb --factory tinker
particle flash --usb deep_update_2014_06
particle flash --usb tinker
particle flash --usb cc3000
particle flash --usb tinker
```

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.

{{/if}}

## Still Having Problems?

Check out [connection help](/support/troubleshooting/connection-help) for more info.

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
