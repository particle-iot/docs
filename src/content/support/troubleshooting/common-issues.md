---
title: Common Issues
template: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 1
---

# Common Issues

This section will help walk you through the diagnosis and resolution of the most common roadblocks that our users run into. Some of these roadblocks are caused by issues or bugs in the platform, but many are more innocuous than that, and few are permanent. We'll help you identify exactly why your device is `insert_issue_here` and help you get it back to happily connected.

{{#if electron}}

## Blinking Green

{{{device-animation device "blink" "lime" }}}

Electrons that are blinking green have successfully read the APN data from the inserted SIM card and are attempting to connect to a cellular tower. There are many different reasons that your Electron might fail to connect to your nearby cellular network. Here are a few things you can check if you find your device in an endless loop (5 minutes+) of blinking green:

### 1) Is your Electron compatible with your local cellular network?
There are three different variants of the Electron, and they each work in different parts of the world:


| Electron Name  | Service | Service Location | Bands (MHz) |
| ------------- | :-------------: | :----: | :----: |
| Electron G350  | 2G only | Worldwide | 850/900/1800/1900
| Electron U260  | 3G with 2G fallback | North and South America, Australia | 850/1900
| Electron U270 | 3G with 2G fallback | Europe, Asia, Africa | 900/1800/2100 |

Make sure that your device is compatible with the cellular infrastructure in your country. Small country-by-country variations from the generalized table above may apply. For a detailed list of 3G service country by country, <a href="https://www.kickstarter.com/projects/sparkdevices/spark-electron-cellular-dev-kit-with-a-simple-data/description" target="_blank">please visit the following link</a>.

If your device is not compatible with the cellular infrastructure in your country, **it will be unable to connect to the Internet using a Particle SIM or any other SIM.**

### 2) Is your antenna connected?
Your Electron cannot connect without the included external cellular antenna. Please make sure it is connected as depicted below:

![Attach the antenna](/assets/images/antenna_attach.jpg)

### 3) Is your battery connected?
Your Electron *requires a Li-Po battery or high current power source to communicate wirelessly*. Make sure your battery is connected as depicted below:

![Connect the battery](/assets/images/attach_batt.jpg)

While the Electron does not *require* that you attach the USB cable, this will ensure that your battery does not run out of charge during the connection process.

### 4) Is your SIM activated?
In order for your Particle SIM card to connect to the cellular network, it needs to be activated. The *only* way to do this is to go through SIM activation and setup at [https://setup.particle.io](https://setup.particle.io). Follow the on-screen prompts to complete device setup and SIM activation.

### 5) Are you using a 3rd party (non-Particle) SIM?
If you're not using a Particle SIM, you will have to change the cellular APN on the Electron before it can connect. A Username and Password may also be required.  To connect the Electron with a 3rd party SIM, visit our [setup page](http://setup.particle.io) and follow the on screen instructions to set your APN, download a new firmware binary, and flash it to your device.

> **NOTE**: Until you have done this, your device _will not_ be able to connect to the Internet.

### 6) Check the cellular coverage in your area
The Electron leverages a number of cellular carriers to provide excellent coverage, but it *is* possible that you are outside GSM coverage in your country. Fortunately, it's relatively simple to check:

- Go to http://particle.io/cellular and select your country from the dropdown at the bottom of the page. Note the cellular provider in your country. In the US, for example, service is provided by `T-Mobile and AT&T`.
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
If you've been using your Electron successfully for a while and it's now just started flashing green, you might have hit your data limit, and your SIM might be paused. You can check your data usage and update your data limits by visiting the SIM dashboard at the following link:

[https://dashboard.particle.io/user/billing](https://dashboard.particle.io/user/billing)

### 9) Cold boot your device
If all else fails, try restarting it! Remove *both* the USB cable and Li-Po battery from the Electron, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the Electron should reboot and retry the connection sequence.

### 10) Are Particle's mobile carriers experiencing issues?
Check out [our status page](http://status.particle.io/) to see if there's a known issue with Particle's mobile carriers.

### 11) Contact Particle
Still having issues? [Write us an email](/support/support-and-fulfillment/menu-base/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.

## Blinking Blue

{{{device-animation device "blink" "blue" 300 300 }}}

Electrons that are blinking blue are in listening mode. When an Electron boots up, it will attempt to read information from the its SIM card to connect to the cellular network. Electrons that do not have a SIM card, or that have an improperly configured SIM card will be unable to connect to a cell tower and will default back to listening mode. If you're in listening mode and don't want to be, try the steps listed below:

### 1\. Is your SIM card inserted?
Your device cannot exit listening mode and connect to a cellular tower if your SIM is not inserted. Please make sure your SIM is inserted as demonstrated below:

![Insert your SIM](/assets/images/insert_sim.jpg)

### 2\. Is your SIM card *fully* inserted?
Give your SIM an extra little push to make sure it's fully in the SIM card holder. No need to press too hard--just make sure there's no empty space between the card and the end of the holder.

### 3\. Try a cold boot
Remove *both* the USB cable and Li-Po battery from the Electron, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the Electron should reboot and retry the connection sequence.

### 4\. Check the integrity of your SIM card holder
Visually inspect the SIM card holder. Are all of the contacts soldered down? Does the holder lie flush against the Electron PCB (printed circuit board)? Are any of the pins bent or depressed downwards?

The easiest way to identify a bad contact in the holder is by removing the SIM card and looking at the marks on the contacts. If there are any contacts without marks, then one of the spring pins in the holder may be bent down. You can try to fix this yourself by gently bending the pin upward until it lines up with the others using a pair of fine tweezers or an exacto knife.

![Identifying and fixing SIM holder](/assets/images/bad-sim-socket.png)
<p class="caption"> <a target="_blank" href="/assets/images/bad-sim-socket.png">Click here</a> for a larger image.</p>

Try using your hands to press down on the SIM card to improve contact between the SIM and the metal pins underneath--while pressing on the SIM card, press the `RESET` button on the Electron. If you see the device begin to connect to the cellular network (flash green), you may have a damaged SIM card holder and should [contact Particle](/support/support-and-fulfillment/menu-base/).

### 5\. Is your SIM card damaged or defective?
Try using the SIM card from your cell phone, if you have one. If the RGB LED on the Electron begins to blink green when your phone's SIM is inserted, your Particle SIM may need to be replaced, and you should [contact Particle](/support/support-and-fulfillment/menu-base/).

### 6\. Contact Particle
Still having issues? [Write us an email](/support/support-and-fulfillment/menu-base/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.


## Breathing Magenta

{{{device-animation device "breathe" "magenta" }}}

If your Electron is breathing magenta, it is in Safe Mode. This means that, although it is connected to the Cloud, it is not running your user firmware. Your device can end up in Safe Mode if the user app that you programmed became corrupted, or the compile target of the user app is newer than the firmware version of the system modules on your device.

There are two primary ways that you can resolve this issue:

### 1) Recompile your user app for your existing system firmware.

If you are developing in the Build IDE, the compiler should automatically target the version of system firmware running on the selected device. The Build IDE will also give you a warning if you select a firmware version build target for your device that is newer than the system modules running on it. To confirm that you're building with the right version of firmware, follow these steps:

- Go to [https://build.particle.io](https://build.particle.io)
- Click on the `Devices` icon on the left-most navigation pane
- Select the dropdown arrow next to the device that is in safe mode
- Click the `Building with firmware` dropdown and make sure that it is set to `Default`
- Try flashing the application to your device again over the air, or download the binary and flash it to your device using the CLI

### 2) Update the system firmware on your Electron

The other option to resolve a mismatch between system and user firmware versions is to update the system firmware on your Electron to match the newer user firmware version. You can do this one of two ways:

**Using the Build IDE**  
More details coming soon.

**Using the Particle Device Updater**  
More details coming soon.

**Using the Particle CLI**
- Put your device into DFU mode by holding the `MODE` and `RESET` buttons, then releasing the `RESET` button while continuing to hold the `MODE` button. The LED on your Electron will begin flashing yellow.
- Open up a terminal session and type `particle update`
- Your device will download the most recent version of system firmware and will reboot successfully.

### 3) Check your application for issues

If you are confident that there is a version match between the system and user compile targets of firmware on your device or you see the LED on your device flash [red or orange](http://docs.particle.io/support/troubleshooting/troubleshooting-support/electron/#error-codes) after startup, it is likely that there is an issue with the user firmware running on your device. To return your device to a stable condition, reflash the Tinker app to your device in one of two ways:

**Using the CLI** - Uses _no_ data
- Attach the Electron to your computer using a USB cable
- Put your Electron in DFU mode
- Type the following command: `particle flash --usb tinker`

**Using the Build IDE** - Uses data
- Go to https://build.particle.io
- Click on the `Devices` icon on the left-most navigation pane
- Select the dropdown arrow next to the device that is in safe mode
- Click the `Building with firmware` dropdown and make sure that it is set to `Default`
- Click the `Code` icon on the left-most navigation pane
- Click the `Tinker` application from the list of "Example Apps" section at the bottom of your applications pane
- Click the `Flash` button




{{/if}}

{{#if photon}}

## Breathing Magenta

{{{device-animation device "breathe" "magenta" }}}

Photons that have been interrupted mid-firmware update often breathe magenta (defaulting to Safe Mode) to avoid running faulty firmware. To solve this issue, you can update your firmware manually.

### Manual Firmware Update

If you do not have a Mac/Apple computer then you should not read the instructions below for a firmware upgrade. These are specifically for users who have MAC machines.

*For Windows* If you have a Windows machine, please follow <a href="http://blog.jongallant.com/2015/08/particle-photon-firmware-flash-windows.html" target="_blank">these instructions</a>.

Since your device is offline, I recommend using our dfu-util method. If you want more info on this, the local DFU-UTIL method is roughly explained [here](https://github.com/spark/firmware/releases).

To upgrade your Photon, follow the instructions below:

-  Download the latest system Part-1 and Part-2 firmware binaries for the Photon linked here: [latest release](https://github.com/spark/firmware/releases/latest)

-  Install dfu-util on your Mac using: ```brew install dfu-util```
If you don't have brew or homebrew installed, install it here: <a href="http://brew.sh/" target="_blank">http://brew.sh/</a>

-  Put photon into DFU MODE, instructions [here](/guide/getting-started/modes/photon/#dfu-mode-device-firmware-upgrade-).

-  Flash part1:
```dfu-util -d 2b04:d006 -a 0 -s 0x8020000 -D system-part1-x.x.x-photon.bin``` (replace x.x.x with actual version number)

-  Flash part2, unit should still be blinking yellow:
```dfu-util -d 2b04:d006 -a 0 -s 0x8060000:leave -D system-part2-x.x.x-photon.bin``` (replace x.x.x with actual version number)

-  Wait... Your device should eventually restart and start blinking blue, breathing cyan, or flashing green -- all dependent on if you've setup the device before.


## Blinking Cyan

{{{device-animation device "blink" "cyan" }}}

If your Photon is blinking cyan and sometimes orange/red without connecting, it is helpful to first try to manually update your firmware, in the same way as listed as above. If this does not work, then move on to a key reset.

### Public Key Reset

Sometimes, a firmware upgrade will not be enough to solve your Photon's problem. If your are still having an issue, and particularly **if your Photon is blinking cyan and sometimes orange/red without connecting**, It's time to try resetting the public key.

- **If you haven't ever claimed the device before:**
You will need <a href="http://dfu-util.sourceforge.net/" target="_blank">dfu-util</a>. Install it, then download the [this file](https://s3.amazonaws.com/spark-website/cloud_public.der).
Use the command line to navigate to that file.
Run the following command:
`dfu-util -d 2b04:d006 -a 1 -s 2082 -D cloud_public.der`
This should reset your public key.

- **If you claimed the device previously:**
You need the [CLI](https://docs.particle.io/guide/tools-and-features/cli/). Once it is installed, run:
`particle keys server cloud_public.der`
`particle keys new photon`
`particle keys load photon.der`
`particle keys send photon.pub.pem`
This should reset your public key.


## Blinking Green

{{{device-animation device "blink" "lime" }}}

If your device is blinking green without connecting, there are a few things to check immediately.

### Wi-Fi network requirements

Your device works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured), with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the device will not connect.
- **Networks with <a href="http://en.wikipedia.org/wiki/Captive_portal" target="_blank">"captive portal"</a> security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The device can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the devices to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex Networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.

{{/if}}

{{#if photon}}
**Prerequisites for Setup**
* **Software**
  * Particle Mobile App - <a href="https://itunes.apple.com/us/app/particle-build-photon-electron/id991459054?ls=1&mt=8" target="_blank">iPhone</a> | <a href="https://play.google.com/store/apps/details?id=io.particle.android.app" target="_blank">Android</a>
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Wifi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcasted SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP wifi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}
**Prerequisites for Setup**
* **Software**
  * Spark Core Mobile App - <a href="https://itunes.apple.com/us/app/spark-core/id760157884" target="_blank">iPhone</a> | <a href="https://play.google.com/store/apps/details?id=io.spark.core.android" target="_blank">Android</a>
  * *Note: We highly recommend using the mobile app for first time setup.*
* **Hardware**
  * Your Particle device, brand new and out of the box!
  * USB to micro USB cable {{#if photon}}(included with Photon Kit and Maker Kit){{/if}}
  * Power source for USB cable (such as your computer, USB battery, or power brick)
  * Your iPhone or Android smartphone
* **Wifi Settings**
  * 2.4GHz capable router
  * Channels 1-11
  * WPA/WPA2 encryption
  * On a broadcasted SSID network
  * Not behind a hard firewall or Enterprise network
  * *Note: We do not recommend using WEP wifi settings, for security reasons.*
* **Experience**
    * None! This is your first project.

{{/if}}

{{#if core}}

## Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using <a href="http://dfu-util.sourceforge.net/" target="_blank">dfu-util</a> and installing the [Particle CLI](/guide/tools-and-features/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state.

{{/if}}

## Still Having Problems?

Check out [connection help](/support/troubleshooting/connection-help) for more info.

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
