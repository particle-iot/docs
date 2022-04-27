---
title: Status LED and Device Modes
layout: commonTwo.hbs
columns: two
devices: [ boron,photon,electron,argon,xenon,tracker-som ]
description: Explanation of status LED codes and device modes for Particle IoT devices
includeDefinitions: [device-animation]
---

# Status LED - {{device}}

You are viewing the Status LED and Device Modes for the **{{device}}**. To view the documentation for other 
devices, use the blue device selector below the Particle logo on the left side of the page.

{{#if tracker-som}}
## Tracker SoM Mode

The Tracker SoM and Tracker One status LED can be configured in several different ways. This section describes the **Tracker** LED mode. It can be configured to use the standard Particle LED scheme (blinking green, blinking cyan, breathing cyan), or can be completely customized in the [Device Fleet Settings](/tutorials/device-cloud/console/#rgb-led-settings). The Tracker SoM Evaluation Board defaults to the Particle color scheme. 

{{!--
{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "breathe red 1000ms 4 times"
  "breathe green 1 times"
  "on green 10000ms"
  "off 1000ms"
}}
--}}

The standard LED patterns for Tracker One devices are:

### Connecting to Cellular - Tracker

The Tracker will fast breathe red while connecting to cellular.

{{device-animation device "pattern"
  "breathe red 500ms"
}}

### Connecting to the Cloud - Tracker

While trying to connect to the cloud, the Tracker shows the relative signal strength as breathing yellow (weaker cellular signal):

{{device-animation device "pattern"
  "breathe yellow 1000ms"
}}

Or breathing green (stronger cellular signal):

{{device-animation device "pattern"
  "breathe green 1000ms"
}}

### Connected to Cellular - Tracker

The Tracker shows the relative signal strength as solid yellow (weaker cellular signal):

{{device-animation device "pattern"
  "on yellow"
}}

Or solid green (stronger cellular signal):

{{device-animation device "pattern"
  "on green"
}}

Solid yellow or solid green indicates normal operation on the Tracker.


**The remainder of this page describes the status LED when using standard Particle LED scheme.**

{{/if}} {{!-- tracker-som --}}

## Standard Modes
These modes are the typical behaviors you will see from your device on a regular basis. They are the light patterns of a healthy device.

Here's the typical pattern of after power up.

{{#if has-cellular}}
{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "blink lime 16 times"
  "blink cyan 8 times"
  "breathe cyan 3 times"
  "off 1000ms"
}}
{{/if}}

{{#unless has-cellular}}
{{device-animation device "pattern"
  "off 1000ms"
  "on white 1000ms"
  "blink lime 8 times"
  "blink cyan 8 times"
  "breathe cyan 3 times"
  "off 1000ms"
}}
{{/unless}}




### Connected

{{device-animation device "breathe" "cyan" }}

When it is breathing cyan, your device is happily connected to the Internet. When it is in this mode, you can call functions and flash code.


### OTA Firmware Update

{{device-animation device "blink" "magenta" }}

If your device is blinking magenta (red and blue at the same time), it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from the Web IDE, CLI, or Workbench. You might see this mode when you connect your device to the cloud for the first time.

Note that, if you enter this mode by holding `{{system-button}}` on boot, blinking magenta indicates that letting go of the `{{system-button}}` button will enter safe mode to connect to the cloud and not run application firmware.

### Looking For Internet

{{device-animation device "blink" "lime" }}

{{#if has-wifi}}
If your device is blinking green, it is trying to connect to Wi-Fi.

{{collapse op="start" label="More information"}}

If you are unable to get past blinking green, here are a few known working situations that the device is not compatible with:

{{#if photon}}
- If you are using a corporate or school network that uses WPA2 Enterprise, you will need to follow [special setup instructions](https://support.particle.io/hc/en-us/articles/360039741153/). If you require both a username and a password, or see a mention of 802.1(x), or RADIUS you're using WPA2 Enterprise.
{{/if}} 


- If you are using a network that takes you to a web page where you need to either sign in or agree to terms and service when you first connect, using the device directly will be difficult or impossible. This is the case in some hotels and public Wi-Fi networks and is often referred to as Captive Portal.

- If your Wi-Fi network uses 5 GHz only, instead of the more common 2.4 GHz, the device cannot be used. The Wi-Fi radio is only compatible with 2.4 GHz networks.

{{#if photon}}
- If your Wi-Fi network uses 802.11n only mode (does not support 802.11b, 802.11g, or a combination of b, g, and n), it's not currently possible to connect a Photon or P1 to the network if the device is running Device OS 0.7.0 or later.
{{/if}} 

For home users:

- If your router uses WEP encryption, you should upgrade your router to something more secure. However it may be possible to connect your device with some difficulty by following the [WEP configuration instructions](http://rickkas7.github.io/wep/).

And the less common situations:

- If you get fast blinking green, especially in classroom and hack-a-thon type situations, it is possible that your network has run out of DHCP IP addresses.

- If your Wi-Fi network does not support DHCP, and only uses static IP addresses, it is possible, though somewhat difficult, to set up a device. You will need to flash a program by USB to set the IP address.

- If the Wi-Fi network restricts access to known device Ethernet MAC addresses, you'll need to determine the MAC address and give it to the network administrator. Put the device in listening mode (blinking dark blue) by holding down the {{system-button}} button, then use the Particle CLI command `particle serial mac`.

{{collapse op="end"}}

{{/if}}

{{#if has-cellular}}
If your device is blinking green, it is trying to connect to cellular.

{{collapse op="start" label="More information"}}

Electrons that are blinking green have successfully read the APN data from the inserted SIM card and are attempting to connect to a cellular tower. There are many different reasons that your Electron might fail to connect to your nearby cellular network. Here are a few things you can check if you find your device in an endless loop (5 minutes+) of blinking green:

#### 1) Is your Electron compatible with your local cellular network?
There are three different variants of the Electron, and they each work in different parts of the world:


| Electron Name  | Service | Service Location | Bands (MHz) |
| ------------- | :-------------: | :----: | :----: |
| Electron G350  | 2G only | Worldwide | 850/900/1800/1900 |
| Electron U260  | 3G with 2G fallback | North and South America, Australia | 850/1900
| Electron U270 | 3G with 2G fallback | Europe, Asia, Africa | 900/1800/2100 |
| E Series E310 | 3G with 2G fallback | Worldwide | 850/900/1800/1900/2100 |
| E Series E402 | LTE Cat M1 | United States (AT&T) | Bands 2, 4, 12 |
| Boron 2G/3G BRN310 | 3G with 2G fallback | Worldwide | 850/900/1800/1900/2100 | 
| Boron LTE BRN402 | LTE Cat M1 | United States (AT&T) | Bands 2, 4, 12 |

The Boron LTE can be used in other locations with a 3rd-party SIM card on bands 2, 3, 4, 5, 8, 12, 13, 20, and 28.

Make sure that your device is compatible with the cellular infrastructure in your country. Small country-by-country variations from the generalized table above may apply. For a detailed list of 3G service country by country see the [Carrier List](/tutorials/cellular-connectivity/cellular-carriers/).

If your device is not compatible with the cellular infrastructure in your country, **it will be unable to connect to the Internet using a Particle SIM or any other SIM.**

#### 2) Is your antenna connected?
Your Electron cannot connect without the included external cellular antenna. Please make sure it is connected as depicted below:

![Attach the antenna](/assets/images/antenna_attach.jpg)

#### 3) Is your battery connected?
Your Electron, E Series E310, or Boron 2G/3G *requires a Li-Po battery or high current power source to communicate wirelessly*. Make sure your battery is connected as depicted below:

![Connect the battery](/assets/images/attach_batt.jpg)

While the Electron does not *require* that you attach the USB cable, this will ensure that your battery does not run out of charge during the connection process.

The E Series E402 (LTE Cat M1) and Boron LTE can be used only powered by USB.

#### 4) Is your SIM activated?
In order for your Particle SIM card to connect to the cellular network, it needs to be activated. The *only* way to do this is to go through SIM activation and setup at [https://setup.particle.io](https://setup.particle.io) or the mobile apps. Follow the on-screen prompts to complete device setup and SIM activation.

#### 5) Are you using a 3rd party (non-Particle) SIM?
If you're not using a Particle SIM, you will have to change the cellular APN on the Electron before it can connect. A Username and Password may also be required.  To connect the Electron with a 3rd party SIM, visit our [setup page](https://setup.particle.io), choose  "Setup an Electron with SIM card" and follow the on screen instructions to set your APN, download a new firmware binary, and flash it to your device.

> **NOTE**: Until you have done this, your device _will not_ be able to connect to the Internet.

If you are using the Boron, you should follow [the Boron 3rd-party SIM instructions](https://support.particle.io/hc/en-us/articles/360039741113/#setting-up-a-boron-with-a-3rd-party-sim-card) instead.

#### 6) Check the cellular coverage in your area
The Electron leverages a number of cellular carriers to provide excellent coverage, but it *is* possible that you are outside GSM coverage in your country. Fortunately, it's relatively simple to check:

- Find the carrier from the [carrier list](/tutorials/cellular-connectivity/cellular-carriers/)
- Use a tool such as the OpenSignal mobile app to find coverage. The OpenSignal apps for iOS and Android can provide coverage information world-wide.
- If you are using an E Series E402 (LTE) or Boron LTE, the built-in Particle SIM card can only be used in the United States, on AT&T. It will only work in areas with LTE coverage; it cannot fall back to 3G.

If you are outside of the coverage map, it's possible that the Particle SIM does not have coverage in your area, and your device will be unable to connect. We are always looking to expand our coverage network, and hope to provide coverage in your area soon!


#### 7) Check the cellular reception in your location
Cellular *coverage* and cellular *reception* are slightly different.  Coverage is determined by the location and availability of cellular towers in your neighborhood. Even if there is coverage, your device might not have *reception*. Things like RF interference, being in a basement, or a damaged antenna might affect your device's ability to get a good signal from the cell tower nearby.

There are a bunch of things that you can do to improve your cellular reception:

- Check the coverage on your phone (if it is on a GSM network) as a comparison point. Do you get a good signal?
- Try going outside, or by a window, to confirm that your device can connect


#### 8) Check your data limit
If you've been using your Electron successfully for a while and it's now just started flashing green, you might have hit your data limit, and your SIM might be paused. You can check your data usage and update your data limits by visiting the SIM console at the following link:

[https://console.particle.io/billing](https://console.particle.io/billing)

#### 9) Cold boot your device
If all else fails, try restarting it! Remove *both* the USB cable and Li-Po battery from the Electron, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the Electron should reboot and retry the connection sequence.

#### 10) Are Particle's mobile carriers experiencing issues?
Check out [our status page](https://status.particle.io/) to see if there's a known issue with Particle's mobile carriers.

#### 11) Contact Particle
Still having issues? [Write us an email](https://support.particle.io/hc/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.

{{collapse op="end"}}

{{/if}}



### Connecting to the Cloud

{{device-animation device "blink" "cyan" }}

When the device is in the process of connecting to the cloud, it will rapidly blink cyan. You often see this mode when you first connect your device to a network, after it has just blinked green.

### Listening Mode

{{device-animation device "blink" "blue" 300 300 }}

{{#if electron}}
The most common cause of blinking dark blue on a device is a loose SIM card.

{{collapse op="start" label="More information"}}

Electrons that are blinking blue are in listening mode. When an Electron boots up, it will attempt to read information from the its SIM card to connect to the cellular network. Electrons that do not have a SIM card, or that have an improperly configured SIM card will be unable to connect to a cell tower and will default back to listening mode. If you're in listening mode and don't want to be, try the steps listed below:

#### 1\. Is your SIM card inserted?
Your device cannot exit listening mode and connect to a cellular tower if your SIM is not inserted. Please make sure your SIM is inserted as demonstrated below:

![Insert your SIM](/assets/images/insert_sim.jpg)

#### 2\. Is your SIM card *fully* inserted?
Give your SIM an extra little push to make sure it's fully in the SIM card holder. No need to press too hard--just make sure there's no empty space between the card and the end of the holder.

#### 3\. Try a cold boot
Remove *both* the USB cable and Li-Po battery from the Electron, so that the RGB LED fully powers off. Then, reconnect the Li-Po battery and USB cable--the Electron should reboot and retry the connection sequence.

#### 4\. Check the integrity of your SIM card holder
Visually inspect the SIM card holder. Are all of the contacts soldered down? Does the holder lie flush against the Electron PCB (printed circuit board)? Are any of the pins bent or depressed downwards?

The easiest way to identify a bad contact in the holder is by removing the SIM card and looking at the marks on the contacts. If there are any contacts without marks, then one of the spring pins in the holder may be bent down. You can try to fix this yourself by gently bending the pin upward until it lines up with the others using a pair of fine tweezers or an exacto knife.

![Identifying and fixing SIM holder](/assets/images/bad-sim-socket.png)
<p class="caption"> <a target="_blank" href="/assets/images/bad-sim-socket.png">Click here</a> for a larger image.</p>

Try using your hands to press down on the SIM card to improve contact between the SIM and the metal pins underneath--while pressing on the SIM card, press the `{{reset-button}}` button on the Electron. If you see the device begin to connect to the cellular network (flash green), you may have a damaged SIM card holder and should [contact Particle](https://support.particle.io/hc/).

#### 5\. Is your SIM card damaged or defective?
Try using the SIM card from your cell phone, if you have one. If the RGB LED on the Electron begins to blink green when your phone's SIM is inserted, your Particle SIM may need to be replaced, and you should [contact Particle](https://support.particle.io/hc/).

#### 6\. Contact Particle
Still having issues? [Write us an email](https://support.particle.io/hc/) and include the following to help us with troubleshooting:
- Your Device ID
- Your ICCID (SIM Number)
- A photo of your device setup to help with troubleshooting.
{{collapse op="end"}}

{{/if}}

{{#if has-gen3}}
When your device is in Listening Mode, it is waiting for you to configure your mesh network, or is waiting for configuration by USB serial.

Normally, when you've successfully configured your Gen 3 device using the mobile apps for iOS or Android, the setup complete flag is set and you will exit Listening Mode.

If you have reset your configuration or have set up using USB, you may need to manually set the configuration done flag using [these instructions](/reference/developer-tools/cli/#particle-usb-setup-done) to use the `particle usb setup-done` command.

{{else}}

{{#if has-cellular}}
When your device is in Listening Mode, it either cannot find the SIM card, or is waiting for configuration by USB serial.
{{/if}}

{{#if has-wifi}}
When your device is in Listening Mode, it is waiting for your input to connect to Wi-Fi. Your device needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.
{{/if}}

{{/if}} {{!-- has-gen3 --}}

To put your device in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.

You can also use [`particle usb start-listening`](/reference/developer-tools/cli/#particle-usb-start-listening) to enter listening mode.

{{#if has-cellular-strength }}
### Cellular Signal Strength

{{device-animation device "pattern"
  "on rgba(0, 255, 0, 0.4) 1000ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "on rgba(0, 255, 0, 1) 200ms"
  "on rgba(0, 255, 0, 0.4) 300ms"
  "off 2000ms"
}}

Tapping the `{{system-button}}` button on your device will blink out the bars of signal strength. More blinks indicate a stronger signal.

{{/if}} {{!-- has-cellular-strength --}}

{{#if electron}}
### Soft power off

{{device-animation device "pattern"
  "breathe cyan 2 times"
  "on white 2000ms"
  "off 4000ms"
}}

Tapping the `{{system-button}}` button twice on your device enter soft power off mode. It is the lowest power consumption mode. 

{{/if}}


{{#if has-gen3}}
### Network Reset (fast blinking blue)

{{device-animation device "pattern"
  "blink blue 20 times"
  "blink blue 50ms 50ms 20 times"
}}

To erase the stored network settings on your device, hold the `{{system-button}}` button blinks dark blue, then continue to hold it down for about ten seconds longer, until the RGB LED blinks blue rapidly, then release.

- For all Gen 3 devices it will clear the mesh settings and the setup complete flag, so the device will go back into setup mode (listening mode)
- For the Argon it will also clear Wi-Fi settings.
- For the Boron, it will also clear the cellular APN and SIM selection.
- For Ethernet, it will also clear the using Ethernet flag.

{{/if}}

{{#if photon}}

### Wi-Fi Network Reset

To erase the stored Wi-Fi networks on your device, hold the `{{system-button}}` button blinks dark blue, then continue to hold it down for about ten seconds longer, until the RGB LED blinks blue rapidly, then release.

{{/if}}


{{#if has-cellular}}
### Cellular Off
{{/if}}
{{#if has-wifi}}
### Wi-Fi Off
{{/if}}

{{device-animation device "breathe" "white" }}

If your device is breathing white, the {{network-type}} module is off. You might see this mode if:

- You have set your module to `MANUAL` or `SEMI_AUTOMATIC` in your user firmware
- You have called `Cellular.off()` or `WiFi.off()` in your user firmware



### Safe Mode

{{device-animation device "breathe" "magenta" }}

Safe mode, breathing magenta (red and blue at the same time), connects the device to the cloud, but does not run any application firmware. This mode is one of the most useful for
development or for troubleshooting. If something goes wrong with the app
you loaded onto your device, you can set your device to Safe Mode. This
runs the Device OS but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The device indicates that it is in Safe Mode with the LED breathing magenta.**

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start blinking magenta
6. Release the `{{system-button}}` button

Before entering safe mode, the device will proceed through the normal steps of connecting to the cloud; blinking green, blinking cyan, and fast blinking cyan. If you're unable to connect to the cloud, you won't actually end up with breathing magenta, but execution of application firmware will still be blocked - so you are in a "sort-of safe mode" (e.g. to enter "Safe Listening Mode").

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.

You can also use the [`particle usb safe-mode`](/reference/developer-tools/cli/#particle-usb-safe-mode) command to enter safe mode. 

### DFU Mode (Device Firmware Upgrade)

{{device-animation device "blink" "yellow" }}

If you wish to program your device with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via [dfu-util](https://support.particle.io/hc/en-us/articles/360039251394/)

Installation tutorial can be found [here.](/tutorials/developer-tools/cli/)

And a usage guide [here.](/reference/developer-tools/cli/)

To enter DFU Mode:


1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
4. Release the `{{system-button}}` button

The device now is in the DFU mode.

DFU mode requires device drivers under Windows. These should automatically be installed by the Particle CLI installer, but if you think you are having driver issues, there are [additional DFU troubleshooting tips here](https://support.particle.io/hc/en-us/articles/360039251394/).

Some users have reported issues with dfu-util on a USB3 ports (typically the blue ones). Use a USB2 port if the USB3 port doesn't work.

You can also use the [`particle usb dfu`](/reference/developer-tools/cli/#particle-usb-dfu) command to enter DFU mode.


{{#if photon}}
### Firmware Reset

Firmware reset is not available on the device, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

The [Particle CLI](/tutorials/developer-tools/cli/) can also restore the default Tinker firmware by entering DFU mode by holding down both the {{reset-button}} and {{system-button}} buttons, releasing {{reset-button}} and continuing to hold down {{system-button}} until it blinks yellow then entering the command:

```
particle flash --usb tinker
```
{{/if}}

{{#if electron}}
### Firmware Reset
_Since 0.6.0_

{{device-animation device "blink" "lime" }}

The Electron can store a backup copy of any desired user firmware in flash memory at address 0x080A0000, separate from user flash memory which is located at 0x08080000.  This backup copy of firmware can be restored to user memory with a button sequence that is only available when the backup copy flash memory contains a valid firmware image.  To program your Electron with a backup copy of user firmware via USB, you'll need to put the Electron in [DFU Mode](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-) and run this command: `particle flash --factory user-backup-firmware.bin`

A CLI installation tutorial can be found [here.](/tutorials/developer-tools/cli/)

And a usage guide [here.](/reference/developer-tools/cli/)

To enter Firmware Reset Mode:

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing green or white (it will flash magenta, then yellow first)
4. Release the `{{system-button}}` button
{{/if}} {{!-- electron --}}


{{#if has-gen3-argon-boron-xenon}}

### Firmware Reset

Gen 3 devices can store a backup copy of any desired user firmware in flash memory at address 0x80200000, separate from user flash memory which is located at 0x000D4000.  This backup copy of firmware can be restored to user memory with a button sequence that is only available when the backup copy flash memory contains a valid firmware image. 

To program your device with a backup copy of user firmware via USB, you'll need to put it in [DFU Mode](/tutorials/device-os/led/#dfu-mode-device-firmware-upgrade-) and run a command like one of the following:

Argon:
```
dfu-util -d 2b04:d00c -a 2 -s 0x80200000 -D tinker-0.8.0-rc.25-argon.bin
```

Boron:
```
dfu-util -d 2b04:d00d -a 2 -s 0x80200000 -D tinker-0.8.0-rc.25-boron.bin
```

Xenon:
```
dfu-util -d 2b04:d00e -a 2 -s 0x80200000 -D tinker-0.8.0-rc.25-xenon.bin
```

You don't have to flash tinker, of course, that's just an example. Note that the d00c, d00d, or d00e varies depending on the type of device which is why there are three different commands.

To factory reset the user firmware after flashing valid firmware using the previous step:

Hold down the MODE button and tap RESET. The status LED will blink:

- Magenta (red and blue at the same time, safe mode)
- Yellow (DFU mode)
- Fast blinking yellow (restore factory firmware)

{{device-animation device "pattern"
  "blink magenta 20 times"
  "blink yellow 20 times"
  "blink yellow 50ms 50ms 20 times"
  "blink magenta 50ms 50ms 20 times"
}}

Be sure to release the mode button as soon as you get to fast blinking yellow, otherwise you'll go one step farther and clear all of your settings as well.
 
### Factory Reset

Gen 3 (Argon, Boron) devices from the factory somewhat ironically do not have a factory user firmware backup image installed. Thus it's best if you pre-install one using the steps above first. 

To factory reset, hold down the MODE button and tap RESET. The status LED will blink:

- Magenta (red and blue at the same time, safe mode)
- Yellow (DFU mode)
- Fast blinking yellow (restore factory firmware)
- Fast blinking white (factory reset)

This will:

- Restore the factory backup user firmware (if present)
- Clear mesh credentials (1.5.2 and earlier)
- Boron: Clear any saved APN and default to internal SIM
- Argon: Clear Wi-Fi credentials
- Ethernet: Clear the using Ethernet flag
- Clear the setup complete flag, to force setup mode again

{{device-animation device "pattern"
  "blink magenta 20 times"
  "blink yellow 20 times"
  "blink yellow 50ms 50ms 20 times"
  "blink white 50ms 50ms 20 times"
  "blink magenta 50ms 50ms 20 times"
  "blink blue 50 times"
}}

{{/if}} {{!-- has-gen3-argon-boron-xenon --}}




## Troubleshooting Modes

These modes let you know about more atypical issues your device might be exhibiting. Use this section to troubleshoot strange colors you might see from your device.

{{#if electron}}
### Cellular Module Not Connected

{{device-animation device "breathe" "blue" }}

If the Cellular module is on but not connected to a cellular tower, your device will be breathing blue. Note that this will be dark blue and not cyan.
{{/if}}

{{#if photon}}
### Wi-Fi Module Not Connected

{{device-animation device "breathe" "blue" }}

If the Wi-Fi module is on but not connected to a network, your device will be breathing blue. Note that this will be dark blue and not cyan.
{{/if}}


### Cloud Not Connected

{{device-animation device "breathe" "lime" }}

When your device is connected to {{network-type}} but not to the cloud, it will be breathing green.

{{collapse op="start" label="More information"}}

#### I can't flash my device anymore

Breathing green means that {{network-type}} is on, but you're not connected to the Particle cloud. Because of this, you cannot flash your device from the cloud. That includes the Particle Web IDE, Particle Workbench, and Particle CLI cloud-based flashing commands.
 
Fortunately, you can usually get around this by entering safe mode, breathing magenta.

Hold down {{reset-button}} and {{system-button}}, release {{reset-button}} and continue to hold down {{system-button}} until the device blinks magenta, then release {{system-button}}. The device will then go through the normal sequence of colors: blinking green, blinking cyan, fast blinking cyan, then breathing magenta. Once breathing magenta, you should be able to OTA flash again.

But to get rid of the breathing green, you'll probably need to make some changes to your code.

#### Cause 1: Blocking the loop

In this simple program, you'll breathe cyan, then about 10 seconds later, you'll go to breathing green. Why? You've blocked the loop from returning, and in the default threading and system mode, that stops the cloud from being processed, which causes breathing green.

Don't do this:

```
void setup() {
}

void loop() {

    // Don't do this: preventing loop from returning will cause breathing green
    while(true) {

    }
}
```

Of course your code probably has a more subtle bug than that. For example, if you have a function that's called from setup or loop that never returns, that can cause problems. 

Some libraries that deal with sensor hardware might behave strangely when the hardware is not available, which could cause a call to block forever as well.

#### Solution 1: Add some Particle.process() calls

One way to solve this is to sprinkle Particle.process() calls in code that blocks. You might do something like this:

```
void waitForSwitch() {
    while(digitalRead(D7) == HIGH) {
        // Without the following line, you'd go into breathing green
        Particle.process();
    }
}
```

In general it's better to structure your code so it always returns from loop(), but if that's not a viable solution, you can sprinkle some Particle.process() calls in your code.

#### Solution 2: Enable SYSTEM_THREAD

The other solution is to use [SYSTEM_THREAD](/cards/firmware/system-thread/system-thread/) mode.

```
SYSTEM_THREAD(ENABLED);
```

You insert this at the top of your source file. What it does is run the cloud processing in a separate system thread, so if you block your loop, the cloud will still be serviced and you will stay in breathing cyan instead of going to breathing green.

The only thing to be careful is that when you do this, your loop code will run before connected to the cloud. One solution is to add this in your setup() code, before you do any Particle.publish calls:

```
waitUntil(Particle.connected);
```

You might also do something like this in loop():

```
if (Particle.connected()) {
    Particle.publish("myEvent", PRIVATE);
}
```

{{#if has-wifi}}
#### Side note: Wi-Fi only mode

While all of the causes above were unintentionally causing breathing green, you can also do it on purpose. Using the [SEMI_AUTOMATIC or MANUAL system mode](/cards/firmware/system-modes/semi-automatic-mode/) and only bringing up Wi-Fi and not the cloud will cause intentional breathing green. You would do this if you're sending data to a local server and not using the cloud at all, for example. 
{{/if}}

{{collapse op="end"}}


### Rainbows/Nyan

Using the Signal option in the Web IDE, or the [particle cloud nyan](/reference/developer-tools/cli/#particle-nyan) CLI command, you can have a device's status LED display a rainbow pattern. This is handy if you have multiple devices nearby and are not sure which one is which. 

{{device-animation device "pattern"
  "on #0000f3 100ms"
  "on #00f300 100ms"
  "on #f3f300 100ms"
  "on #f39c00 100ms"
  "on #f30000 100ms"
  "on #e37ae3 100ms"
  "on #47007a 100ms"
}}


### Red Blink Basic Errors

Blinking red indicates various errors.

While connecting to the Cloud, the RGB LED will be blinking cyan followed by:
- 1 orange blink: Decryption error.
- 2 orange blinks: Could not reach the internet.
- 3 orange blinks: Connected to the internet, but could not reach the Particle Device Cloud. This sometimes is seen as yellow or red and indicates bad server keys.
- 1 magenta blink: Authentication error.
- 1 red blink: Generic handshake error. The device could have the wrong keys or has just encountered a generic error in the handshake process.

{{collapse op="start" label="Repair instructions"}}

Most keys related issues can be resolved using the [Particle CLI](/tutorials/developer-tools/cli/).

Put the device into Listening mode (blinking blue) by holding down {{system-button}} until it blinks blue. Then issue the CLI command:

```
particle identify
```

Save the Device ID; you’ll need it later.

Then put the device in DFU mode by holding down both the {{reset-button}} and {{system-button}} buttons, releasing {{reset-button}} and continuing to hold down {{system-button}} until it blinks yellow and issue the commands below, in order.

```
particle keys server
particle keys doctor YOUR_DEVICE_ID
```

If you get this error under Windows:

```html
'openssl' is not recognized as an internal or external command, operable program or batch file.
```

it may work if you do:

```html
cd c:\OpenSSL-Win32\bin
particle keys doctor YOUR_DEVICE_ID
```

There are additional tips for a [missing openssl error on this page](https://github.com/rickkas7/particle_notes/tree/master/installing-openssl), including tips for macOS (OS X) and Linux.

{{collapse op="end"}}


### Red Flash SOS

{{device-animation device "sos" }}

Is your device blinking red? Oh no!

A pattern of more than 10 red blinks is caused by the firmware crashing. The pattern is 3 short blinks, 3 long blinks, 3 short blinks (SOS pattern), followed by a number of blinks that depend on the error, then the SOS pattern again.

[Enter safe mode](#safe-mode), tweak your firmware and try again! 

You can also reset your device to a known state by following [these instructions](https://support.particle.io/hc/en-us/articles/360046136473).


There are a number of other red blink codes that may be expressed after the SOS blinks:

1. Hard fault
2. Non-maskable interrupt fault
3. Memory Manager fault
4. Bus fault
5. Usage fault
6. Invalid length
7. Exit
8. Out of heap memory
9. SPI over-run
10. Assertion failure
11. Invalid case
12. Pure virtual call
13. Stack overflow
14. Heap error

The two most common ones are:

**Hard Fault (1 blink between 2 SOS patterns)**

{{device-animation device "sos" 1 }}

Some causes of hard fault include:

- Using an invalid pointer.
- Memory corruption caused by freeing memory twice, overwriting the end of a block of memory, etc.
- Making Wire (I2C) calls without calling `Wire.begin()`.

**Exit (7 blinks between 2 SOS patterns)**

This occurs if the standard C function abort() is called. In a Unix program, this would be used to abruptly stop the process. Device OS itself does not use this function, but the SOS can happen if user firmware calls abort() or _exit(). Since Particle devices only effectively support a single process, the user firmware, the effect is an SOS+7 and reboot. This could also happen if a library used abort().

**Out of heap memory (8 blinks between 2 SOS patterns)**

{{device-animation device "sos" 8 }}

If your device crashes repeatedly with an SOS code, first try recovering with [Safe Mode](/tutorials/device-os/led/#safe-mode) and flashing Tinker with the CLI to see if it was something recently added in your user application.

```
particle flash <mydevice> tinker
```

{{#if has-device-doctor}}
If it's not possible to enter Safe Mode, your Device OS may be corrupted.  Use the Device Doctor feature of the CLI to put your device into a healthy state.
 
```
particle device doctor
```
{{/if}}

Some tips for reducing the memory used by your firmware [can be found here](https://support.particle.io/hc/en-us/articles/360039741093/).

**Assertion failure (10 blinks between 2 SOS patterns)**

Assertion failure is triggered when a test for something that should never occur occurs, and there is no solution other than to SOS and restart.

Code might do this if the internal state is invalid and not what is expected, for example. Or something that should never happen and is non-recoverable, for example if the system thread cannot be created.

At the moment, all of the AssertionFailures are in things related to threads and the system thread, but that’s just because those are the only things that have been instrumented with an AssertionFailure panic.

**Stack overflow (13 blinks between 2 SOS patterns)**

Stack overflow occurs when you try to store too much data on the stack. The size is quite limited, and storing large temporary objects on the stack can cause problems.

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

**Heap error (14 blinks between 2 SOS patterns)**

SOS+14 signifies:

- Semaphore lock timeout 
- _Since 0.8.0_ 60 seconds expired while trying to acquire a semaphore lock, likely due to dynamic memory allocation
- _Since 1.2.0_ Other heap-related error, such as allocating memory from an ISR

Prior to 1.2.0, attempting to allocate memory from an interrupt service routine would sometimes work, and sometimes corrupt the heap causing the software to crash sometime later, while doing something completely different. Since this is very difficult to debug, now a SOS+14 is thrown immediately.

Some locations that are interrupt service routines:

- ISRs attached using attachInterrupt
- System event button handlers (just button_status, button_click, and button_final_click handlers, not all system events)
- SPI transaction callbacks
- SparkIntervalTimer library timer callbacks

Things you should not do from an ISR:

- Any memory allocation or free: new, delete, malloc, free, strdup, etc.
- Any Particle class function like Particle.publish, Particle.subscribe, etc.
- Most API functions, with the exception of pinSetFast, pinResetFast, and analogRead.
- delay or other functions that block
- Log.info, Log.error, etc.
- sprintf, Serial.printlnf, etc. with a `%f` (float) value.

### Solid colors


Solid colors are rare. There only expected situation is:

- Solid magenta if you are loading code in ymodem serial mode.


In most cases, solid colors are the side effect of a bug. If code crashes or infinitely loops with interrupts disabled, it's possible that the LED animation will stop. The color of the LED is the color it last was before failure. So for example, it could be solid cyan if it was previously breathing cyan, or solid red if it was trying to output an SOS pattern.

### No status LED

{{#if has-stm32}}
If you power up your device and the status LED never comes on and the small blue led next to pin D7 is on dimly, you have a missing or corrupted bootloader.
{{else}}
If you power up your device and the status LED never comes on, you could have a missing or corrupted bootloader. 

- Unplug the USB (and battery, if you are using one)
- Hold down the SETUP button while plugging in the USB power

If you still see no change in the status LED you probably have a missing or corrupted bootloader. 
{{/if}}



This can be corrected using a [JTAG/SWD programmer](https://support.particle.io/hc/en-us/articles/360039251414/) if you have one. Otherwise, you should [contact support](https://particle.io/support).

