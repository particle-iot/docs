---
title: Connectivity Help
layout: support.hbs
columns: two
devices: [ photon,core ]
order: 8
---

Connection Issues
===

{{#if electron}}
## Using non Particle SIM card
### Steps for using non Particle SIM card for Electron
*This section is coming soon!*
{{/if}}


## Steps to Success

### Can't Get Connected

{{#if core}}
There are many reasons that your Particle Core might not be able to connect to your network. There are many types of Wi-Fi networks, and the Core and the CC3000 do not support all of them. We consider it an important goal of ours to connect easily and painlessly to as many networks as possible, and your feedback is extremely valuable so that we can get better.
{{/if}}

The {{device}} works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured), with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The {{device}} is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the {{device}} will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The {{device}} can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the devices to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex Networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
{{#if core}}
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.
{{/if}}

So, let's dig in. If your {{device}} is not connecting to your Wi-Fi network, we recommend following these steps:

**STEP 0: Check the basics**

- Check your Wi-Fi credentials (SSID and password) to make sure you typed them correctly.
- Make sure you're in range of your Wi-Fi network. If your phone or computer has a poor connection in the same location, try moving closer to your Wi-Fi access point.
- If you're using a u.FL {{#if photon}}antenna{{/if}}{{#if core}}Core{{/if}}, make sure you have an antenna attached, and that it's firmly connected.
- Make sure your {{device}} has enough power to transmit Wi-Fi signals (300mA in bursts). Try a different power source, or unplug components that draw a lot of power.

**STEP 1: Set up your {{device}} over USB**

On some networks, {{#if photon}}the mobile app won't work{{/if}}{{#if core}}Smart Config does not work{{/if}}, but the {{device}} can connect to the network just fine. We've implemented a back-up mechanism so you can set up your {{device}} over USB. Don't forget that you'll need to claim your {{device}} manually as well if you haven't already!

{{#if photon}}[Setup with USB >](/guide/getting-started/intro/photon){{/if}}{{#if core}}[Setup with USB >](/guide/getting-started/intro/core){{/if}}

**STEP 2: Try another network**

There are many reasons that your {{device}} might not connect; some of them have to do with the {{device}}; some have to do with your mobile device sending the Wi-Fi credentials; some have to do with the network. If your {{device}} doesn't connect, try another Wi-Fi network. This will quickly help you figure out which type of issue you might be seeing.

**STEP 3: Reboot and clear memory**

So often, electronics start behaving after you shut them off and turn them back on. Try:

- Closing your mobile app and re-opening it
- Un-plugging the {{device}} and plugging it back in
- Clear the {{#if photon}}Photon's{{/if}}{{#if core}}Core's{{/if}} memory of Wi-Fi networks by holding the `{{system-button}}` button for 10 seconds. After 3 seconds, the light should start flashing blue; after 10 seconds, it should do a quick burst of blue flashes. That means the memory has been cleared.
{{#if core}}- Restoring the Core's firmware to the factory default. Getting this right can be tricky, see [this video](https://community.particle.io/t/how-to-do-a-factory-reset/2579) for illustration.{{/if}}

**STEP 4: Check your router settings**

There are a million ways router settings could cause problems, but here's a few things to look out for:

- **Use DHCP**. Although the {{device}} can handle static IP addresses, it's not configured for it out of the box, so you'll have to dig into the source code.
- **Turn off access control and firewalls**. Not permanently, but temporarily, to see if it resolves the issue. If it does, you can hopefully just tweak your settings to accommodate the {{device}} rather than taking down your security. The only change you may need to make to your router is to open up outgoing port 5683, the default [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) port the {{device}} uses to connect to the Particle Cloud. If your {{device}} flashes cyan and occasionally flashes red, router issues are likely the culprit.

**STEP 5: Search the forums**

It's possible that other folks have encountered the same issues that you have. The best way to check and learn from others is to [search the forums](https://community.particle.io/); search for your particular symptoms or for your Wi-Fi router make and model to find relevant posts.

**STEP 6: Post a report in the Forums**

We would love to hear about your issues, regardless of whether you were able to resolve them, so that we can improve our platform. If you haven't been able to resolve your issue, hopefully we or the community will be able to help.

Please post issues with connectivity either as responses to this topic or, if they are dissimilar from other reported issues, as their own topic. When you make a post, please include:

- Router make and model
- Network security (unsecured, WEP, WPA2, etc.)
- Environment (home, small office, enterprise, public network, etc.)
- Network topology (number of routers and/or range extenders, estimated number of devices connected to network)
- Internet Service Provider
- Any network settings that might diverge from the norm

{{#if core}}
### Special Cases

***Pulsing White***

- **What's the Core Doing?** The main LED on my Core slowly pulses white, even if I reset it or [perform a factory reset](https://community.particle.io/t/how-to-do-a-factory-reset/2579).
- **What's the problem?** The CC3000 on the COre is having trouble initializing due to a potential hardware issue.
- **How do I fix it?** In general, if the LED on your Core starts breathing white, the best thing to do is to reach out to the Particle team. Refer to this issue in your email, and Particle's Technical Support staff will help you resolve the problem directly.


***Main LED off, Small Blue LED dim***

- **What’s the Core doing?** The main LED on my Core is off, but the small blue LED in the upper right corner is dimly glowing.
- **What’s the problem?** Your Core is missing firmware.
- **How do I fix it?**

1. Try a factory reset. Hold down both buttons, then release the RST button, while holding down the `{{system-button}}` button. The LED should begin flashing yellow. Continue holding down the `{{system-button}}` button until you see the Core change from flashing yellow to flashing white. Then release the button. The Core should begin after the factory reset is complete. [Here](/core/connect/#appendix-factory-reset) is a video to illustrate it being done.

2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional. If you have a JTAG shield, contact [hello @ particle dot io] so we can help walk you through re-installing the Core firmware. If you do not have a JTAG shield, please contact the Particle team to let us know, and we’ll help you take next steps.

***Both LEDs off and Unresponsive***

- **What's the Core doing?** My Core isn't showing any LED activity when I power it over USB.
- **What's the problem?** Your core is not receiving power.
- **How do I fix it?**

Please complete the following steps:

1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example).

2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please contact the Particle team for further debugging.

## Upgrades and Updates

### Deep Update for the Core

A **deep update** is a firmware update that reaches **deep** into the internals of a core and updates the firmware of peripheral modules like the CC3000. Periodically, as enhancements and bug fixes become available for components on the Core, we'll release new deep updates to keep your hardware always running the latest, greatest firmware within your application and the other underlying flashable components. Our first deep update release, **deep_update_2014_06** is the maiden voyage of this feature, designed to apply the CC3000 patch, fix the flashing cyan issue, and dramatically improve the stability and performance of the Core.

***Overview***

There are multiple ways to apply the CC3000 deep update described below. Regardless of which path you choose, all of them will invoke the same behaviors once the binary has been flashed to the Core. This firmware employs the following logic:

1. Selectively apply the patch if needed, if the CC3000 firmware version is less than "1.28".

2. Restart, reconnect to cloud, auto-upgrade to the latest Tinker via an over the air firmware update.

3. Restart, reconnect to cloud, publish spark/cc3000-patch-version (latest Tinker does this).

In step one, when the CC3000 firmware is being upgraded the LED will blink orange. It looks very similar to the bootloader mode's blinking yellow; if you look closely, it is in fact orange!

Sometimes over air firmware updates can fail. If your Core freezes while blinking magenta, just reset it and try again.

If you want to get a preview of what to expect, please checkout these **videos that illustrate what a deep update looks like on a Core.**

- [This video](https://vimeo.com/99867395) illustrates what a deep update looks like when the OTA firmware update fails a couple of times, but ultimately succeeds.

**Flash via Particle Build IDE**

The easiest way to apply **deep_update_2014_06** is to simply log into the [Particle Build IDE](https://build.particle.io/build).
When you login, you'll be prompted with instructions and links that will show you the way. Once all of your claimed cores have had the deep update applied to them, you'll no longer be prompted. Note: You'll need have a Core connected and breathing cyan for this to work.

If you're on a noisy Wi-Fi network you've had troubles flashing wirelessly in the past, you might want to consider using one of the alternate USB-based approaches described below.

**Flash via Particle CLI**

The [Particle CLI](/cli) is a Swiss army command line knife that can be used to do all kinds of cool things...like flash a deep update to your core. The process is pretty simple:

[install or Upgrade the CLI](/cli#installing)
Connect a Core to your computer via USB and put it into [dfu-mode](/guide/getting-started/modes/core/#dfu-mode-device-firmware-upgrade-)

Run the flash command:

- `particle flash --usb deep_update_2014_06` **(v1.28)**
- `particle flash --usb cc3000` **(v1.29 stable - recommended)**
- `particle flash --usb cc3000_1_14` **(v1.32 latest - not recommended without testing)**

This installs the deep update from a binary that is packaged with the Particle CLI, so you don't have to download it.

When it's done running, your Core will be blinking yellow in DFU-mode, you'll need to flash regular firmware like Tinker
to get connected and developing again.

1. Run `particle flash --usb tinker`. This will flash a new version of Tinker to your Core and return to a blinking blue "listening" state, where
you can:
1. Run `particle setup` or `particle setup wifi` to provide your network credentials to get connected again.


### Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using dfu-util and installing the [Particle CLI](/guide/tools-and-features/cli)
, which provides an excellent local development and troubleshooting environment for your Particle development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state. Good luck!

{{/if}}

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
