---
word: Troubleshooting
title: Troubleshooting
order: 12
---

Troubleshooting
===

Can't get connected?
---

There are many reasons that your Spark Core might not be able to connect to your network. There are many types of Wi-Fi networks, and the Spark Core and the CC3000 do not support all of them. We consider it an important goal of ours to connect easily and painlessly to as many networks as possible, and your feedback is extremely valuable so that we can get better.

The Spark Core works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured),  with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Spark Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the Spark Core will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The Spark Core can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the Spark Core to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.

So, let's dig in. If your Spark Core is not connecting to your Wi-Fi network, we recommend following these steps:

## STEP 0: Check the basics

There are a few common issues to check first:

- Check your Wi-Fi credentials (SSID and password) to make sure you typed them correctly.
- Make sure you're in range of your Wi-Fi network. If your phone or computer has a poor connection in the same location, try moving closer to your Wi-Fi access point.
- If you're using a u.FL Core, make sure you have an antenna attached, and that it's firmly connected.
- Make sure your Core has enough power to transmit Wi-Fi signals (300mA in bursts). Try a different power source, or unplug components that draw a lot of power.

## STEP 1: Set up your Core over USB

On some networks, Smart Config does not work, but the Core can connect to the network just fine. We've implemented a back-up mechanism so you can set up your Core over USB. Don't forget that you'll need to claim your Core manually as well if you haven't already!

[Setup with USB >](/#/connect/#connecting-your-core-connect-over-usb)

## STEP 2: Try another network

There are many reasons that your Core might not connect; some of them have to do with the Spark Core; some have to do with your mobile device sending the Wi-Fi credentials; some have to do with the network. If your Core doesn't connect, try another Wi-Fi network. This will quickly help you figure out which type of issue you might be seeing.

## STEP 3: Reboot and clear memory

<iframe class="vine-embed" src="https://vine.co/v/hFHQlj6iuKT/embed/simple" width="320" height="320" frameborder="0"></iframe>

So often, electronics start behaving after you shut them off and turn them back on. Try:

- Closing your mobile app and re-opening it
- Un-plugging the Spark Core and plugging it back in
- Clear the Spark Core's memory of Wi-Fi networks by holding the MODE button for 10 seconds. After 3 seconds, the light should start flashing blue; after 10 seconds, it should do a quick burst of blue flashes. That means the memory has been cleared.
- Restoring the Spark Core's firmware to the factory default.  Getting this right can be tricky, see [this video](https://community.spark.io/t/how-to-do-a-factory-reset/2579) for illustration.

## STEP 4: Check your router settings

There are a million ways router settings could cause problems, but here's a few things to look out for:

- **Use DHCP**. Although the Spark Core can handle static IP addresses, it's not configured for it out of the box, so you'll have to dig into the source code.
- **Turn off access control and firewalls**. Not permanently, but temporarily, to see if it resolves the issue. If it does, you can hopefully just tweak your settings to accommodate the Core rather than taking down your security. The only change you may need to make to your router is to open up outgoing port 5683, the default [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) port the Spark Core uses to connect to the Spark Cloud. If your core flashes cyan and occasionally flashes red, router issues are likely the culprit.

## STEP 5: Search the forums

It's possible that other folks have encountered the same issues that you have. The best way to check and learn from others is to search the forums; search for your particular symptoms or for your Wi-Fi router make and model to find relevant posts.

[Visit the forums >](https://community.spark.io)

## STEP 6: Post a report

We would love to hear about your issues, regardless of whether you were able to resolve them, so that we can improve our platform. If you haven't been able to resolve your issue, hopefully we or the community will be able to help.

Please post issues with connectivity either as responses to this topic or, if they are dissimilar from other reported issues, as their own topic. When you make a post, please include:

- Router make and model
- Network security (unsecured, WEP, WPA2, etc.)
- Environment (home, small office, enterprise, public network, etc.)
- Network topology (number of routers and/or range extenders, estimated number of devices connected to network)
- Internet Service Provider
- Any network settings that might diverge from the norm

Other problems
===

## I can't talk to my Core

Once your Core is connected, it needs to be *claimed* in order to be associated with your account. This is what lets you control your Core and keeps anyone else from doing so.

If you use the mobile app to set up your Core, it should claim it automatically. However if you connect your Core over USB, or if the claiming process is unsuccessful, you can claim it manually.

Head over to our connection page to learn about this:

[ Claiming your Core >](/#/connect/claiming-your-core)

## My Core won't start up

If your Core won't start up (the LED never comes on), here are a few things to check:

- Is the Core receiving sufficient power? If you're not sure, connect a multimeter to the 3.3V pin and GND and see if you get 3.3V, as expected. Try connecting the Core to another power source.
- Have any components been damaged? Visually inspect both sides of the Core.

## My Core is behaving erratically

If you're seeing unexpected behavior with your Core, here are a few things to check:

- Is the Core receiving sufficient power? The Core might behave eratically if it's plugged into an unpowered USB hub and not receiving enough power. In addition, if you have components that draw a lot of power (motors, for instance), you might need more power than your computer can supply. Try using a USB power supply or providing more power directly to the VIN or 3.3V pins.
- If you have a u.FL Core, is an antenna connected? Are you within range of the Wi-Fi router?


Troubleshoot by color
===

The Spark Core has an RGB LED positioned on the front that displays the connectivity status of the Core. This LED can help you debug your Core and resolve any issues that you might encounter.

## Flashing blue

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

- *What’s the Core doing?* My Core is flashing blue.
- *What’s the problem?* Your Core doesn’t have Wi-Fi credentials to join your local network
- *How do I fix it?*

Right now, your Core does not have the information it needs to connect to your local Wi-Fi network.  If you haven’t already, try using the Spark Core app for [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) or [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)  to send your network credentials to your Core.  Detailed instructions can be found [here](/#/connect/connecting-your-core-smart-config-with-the-spark-app).


If that doesn’t work, try the steps below:


1. If your network router supports 802.11n, make sure that it also supports Legacy network protocols, and that it is configured into that mode (the Core supports 802.11 a/c networks)
2. If you have a Core with a u.FL connector, make sure the antenna is attached
3. Try [rebooting the Core and clearing its memory](/#/troubleshooting/can-t-get-connected-step-3-reboot-and-clear-memory).
4. Try configuring your Core over USB.  Instructions can be found [here](/#/connect/connecting-your-core-connect-over-usb).
5. If all else fails, please [contact the Spark team](mailto:hello@spark.io) and provide us with the brand and model of your smartphone.

---


## Flashing green

- *What’s the Core doing?* My Core is [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), but doesn’t progress to flashing Cyan.
- *What’s the problem?* Your Core has received Wi-Fi credentials (an SSID and password), but still can't connect to the Wi-Fi network.
- *How do I fix it?*

Please complete the following steps:

1. [Check the basics](/#/troubleshooting/can-t-get-connected-step-0-check-the-basics).
2. Try a new power source. You should be powering your Core with a power supply that is capable of providing 500mA of current.  We recommend the 5V/1A wall wart power supplies that are commonly used for charging cell phones.
3. If your network has a landing page or splash page, the Core will not be able to connect; try configuring it onto a different network.
4. Try [rebooting the Core and clearing its memory](/#/troubleshooting/can-t-get-connected-step-3-reboot-and-clear-memory).
5. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
6. Try manually re-running the patch programmer to update the CC3000’s firmware over USB.  You can find detailed instructions [here](https://community.spark.io/t/failed-connecting-to-wifi/648/53).
7. If none of the above are successful, please [contact the Spark team](mailto:hello@spark.io) and provide us with the brand and model number of your access point.

---

## Flashing yellow

- *What’s the Core doing?* My Core is starts flashing yellow when I plug it or when I hit the RST button.
- *What’s the problem?* Your Core is missing important firmware.
- *How do I fix it?*

Please complete the following steps:

1. Try hitting the RST button to make sure you did not accidentally configure your Core into DFU mode.
2. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
3. If a factory reset is unsuccessful, then we have to write the firmware over DFU.  You can accomplish this by following the steps below:

Install dfu-util for your system either using homebrew on a mac, http://dfu-util.gnumonks.org/ on windows, or you can build from source on linux:

    opkg install libusb-1.0-dev
    wget http://dfu-util.gnumonks.org/releases/dfu-util-0.7.tar.gz
    tar xvf dfu-util-0.7.tar.gz
    cd dfu-util-0.7
    ./configure
    make
    sudo make install

---

If you install those you should be able to run, with your core connected over USB:

    sudo dfu-util -l

---

This should give you a list with something like [1d50:607f] in the list, if that's the case, then we can install the missing firmware (can be found here: https://s3.amazonaws.com/spark-website/factory_firmware.bin)

    dfu-util -d 1d50:607f -a 1 -s 0x00020000 -D factory_firmware.bin
    dfu-util -d 1d50:607f -a 0 -s 0x08005000:leave -D factory_firmware.bin

You can reboot your Core and it should start [slow flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N), or start [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_) if everything worked.

If none of these steps are successful, please [contact the Spark team](mailto:hello@spark.io).

---

## Flashing red

- *What’s the Core doing?* My Core is flashing red lights at different intervals when I power it on
- *What’s the problem?* The Core is reporting a panic code, which could be caused by one of a large number of potential firmware issues.
- *How do I fix it?*

The panic code is signified by a series of flashing red LED blinks.  First, the LED will spell SOS ( ... - - - ... ), followed by a number of flashes, followed by another SOS message.

The meaning of the panic codes is described below.  8 flashes, signifying out of heap memory, is the most common issue.

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

---

## Flashing orange (red/yellow)

- *What’s the Core doing?* My Core is flashing yellow/red/orange lights after it connects to Wi-Fi.
- *What’s the problem?* A decryption error occurred during the handshake with the Spark Cloud
- *How do I fix it?*

Please make sure the following software is installed:

* [Spark-CLI](http://docs.spark.io/cli/)
* [DFU-util (windows)](https://community.spark.io/t/tutorial-installing-dfu-driver-on-windows/3518)
* [DFU-util (mac)](https://github.com/spark/firmware#3-device-firmware-upgrade-utilities)

Please complete the following steps:

1. Place the core in [Listening Mode](http://docs.spark.io/connect/#connecting-your-core-listening-mode)
2. In a command line window / terminal run the command ```spark keys identify``` to get a list of cores connected to the computer. Make note of the core id (replace core_id below with this core id)
3. Place the core in [DFU Mode](http://docs.spark.io/connect/#appendix-dfu-mode-device-firmware-upgrade)
4. Run the command ```spark keys doctor core_id```
5. Your Spark Core should connect to the network (green, cyan, breathing cyan). If not feel free to [contact the Spark team](mailto:hello@spark.io).

---

## Flashing green then red

- *What’s the Core doing?* My Core starts flashing green to connect to my network, then the LED turns red.
- *What’s the problem?* Your Core is facing a networking issue and cannot connect to the Cloud.
- *How do I fix it?*

There are two potential failure modes here--either your home network does not have a working internet connection, or we are having issues with our servers.

1. Try power cycling your router to resolve any transient networking hiccups in your home Wi-Fi network
2. Try going to a website like [Google](http://www.google.com/) on your computer or laptop to verify that your Wi-Fi network is connected to the internet and is capable of serving up web pages
3. Check www.spark.io/status to see if there is a known issue with the Spark Cloud
4. If you’re still seeing this issue, please [contact the Spark team](mailto:hello@spark.io).

---

## Pulsing White

- *What’s the Core doing?* The main LED on my Core slowly pulses white, even if I reset it or perform a factory reset.
- *What’s the problem?* The CC3000 on the Core is having trouble initializing due to a potential hardware issue.
- *How do I fix it?*

In general, if the LED on your Core starts breathing white, the best thing to do is to [reach out to the Spark team](mailto:hello@spark.io).  Refer to this issue in your email, and Spark's Technical Support staff will help you resolve the problem directly.

---

## Main LED off, small blue LED dim

- *What’s the Core doing?* The main LED on my Spark Core is off, but the small blue LED in the upper right corner is dimly glowing.
- *What’s the problem?* Your Core is missing firmware.
- *How do I fix it?*

1. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin after the factory reset is complete.
2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional.  If you have a JTAG shield, [contact the Spark team](mailto:hello@spark.io) so we can help walk you through re-installing the Core firmware.  If you do not have a JTAG shield, please [contact the Spark team](mailto:hello@spark.io) to let us know, and we’ll help you take next steps.

## LEDs off and unresponsive

- *What’s the Core doing?* My Core isn’t showing any LED activity when I power it over USB.
- *What’s the problem?* Your Core is not receiving power.
- *How do I fix it?*

Please complete the following steps:

1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example)
2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please [contact the Spark team](mailto:hello@spark.io) for further debugging.

Deep Update
===

A *deep update* is a firmware update that reaches *deep* into the internals of a core and *updates* the firmware of peripheral modules like the CC3000.  Periodically, as enhancements and bugfixes become available for components on the Core, we'll release new deep updates to keep your hardware always running the latest, greatest firmware within your application <i>and</i> the other underlying flashable components.  Our first deep update release, `deep_update_2014_06` is the maiden voyage of this feature, designed to apply the CC3000 patch, fix the flashing cyan issue, and dramatically improve the stability and performance of the Core.

## Overview

There are multiple ways to apply the CC3000 deep update described below.
Regardless of which path you choose, all of them will invoke the same behaviors once the binary has been flashed to the Core.
This firmware employs the following logic:

1. Selectively apply the patch if needed, if the CC3000 firmware version is less than "1.28".
1. Restart, reconnect to cloud, auto-upgrade to the latest Tinker via an over the air firmware update.
1. Restart, reconnect to cloud, publish spark/cc3000-patch-version (latest Tinker does this).

In step one, when the CC3000 firmware is being upgraded the LED will blink orange.
It looks very similar to the bootloader mode's blinking yellow; if you look closely, it is in fact orange! :)

Sometimes over air firmware updates can fail. If your Core freezes while blinking magenta, just reset it and try again.

If you want to get a preview of what to expect, please checkout
these **videos that illustrate what a deep update looks like on a Core**.

- [This video](https://vimeo.com/99867395) illustrates what a deep update looks like when the OTA firmware update fails a couple of times, but ultimately succeeds.

## Flash via Spark Build IDE

The easiest way to apply `deep_update_2014_06` is to simply log into the [Spark Build IDE](spark.io/build).
When you login, you'll be prompted with instructions and links that will show you the way.
Once all of your claimed cores have had the *deep update* applied to them, you'll no longer be prompted.
Note: You'll need have a Core connected and breathing cyan for this to work.

If you're on a noisy WiFi network you've had troubles flashing wirelessly in the past, you might want to consider using one of the alternate USB-based approaches described below.

### Flash via Spark CLI

The [Spark-CLI](https://github.com/spark/spark-cli) is a swiss army command line knife that can be used to do all kinds of cool things...like flash a deep update to your core. The README provides some nice documentation about how to install it and [how to do a deep update over USB](https://github.com/spark/spark-cli#performing-a-deep-update).  The process is pretty simple:

Install or Upgrade the CLI (requires Node.js):

```bash
npm install -g spark-cli
```

Connect a Core to your computer via USB and put it into [dfu-mode](http://docs.spark.io/connect/#appendix-dfu-mode-device-firmware-upgrade).

Run the flash command:

```bash
spark flash --usb deep_update_2014_06
```

This installs the deep update from a binary that is packaged with the Spark CLI, so you don't have to download it.


## Flash via USB with dfu-util

Note: If you can, you should use the `spark-cli` described above; it's simpler and easier.

To flash a Core over USB without the `spark-cli`, you'll need the `dfu-util` utility and the `deep_update_2014_06` binary.

- You can install dfu-util via the instructions provided [here](https://github.com/spark/core-firmware#3-device-firmware-upgrade-utilities).
- You can download the deep_update_2014_06 binary [here](https://github.com/spark/spark-cli/raw/master/js/binaries/deep_update_2014_06.bin).

To flash the deep update binary to the core, first put it into [dfu-mode](http://docs.spark.io/connect/#appendix-dfu-mode-device-firmware-upgrade):

- Hold down BOTH buttons
- Release only the RST button, while holding down the MODE button.
- Wait for the LED to start flashing yellow
- Release the MODE button

Then, with your lovely Core blinking yellow, type:

    dfu-util -d 1d50:607f -a 0 -s 0x8005000:leave -D \
      ~/Downloads/deep_update_2014_06.bin
      ^^ YOU WILL NEED TO CHANGE THIS ^^
         TO POINT AT THE FILE YOU DOWNLOADED

After that completes, the core will reset and commence the deep update.


## Troubleshooting

### Verify the deep update worked

The following gets very technical, it is provided in case you're unsure whether the patch worked or not or you need to inspect the state of your Core more closely.

If a core requires a deep update, the API will tell you via the list devices endpoint:

```bash
# Which cores require a deep update?
curl 'https://api.spark.io/v1/devices?access_token=9aa51...'
#                   REPLACE WITH YOUR ACCESS TOKEN ^^^^^^^^
[
  {
    "id": "51ff69065067545755380687",
    "name": "joe_prod_core2",
    "last_app": null,
    "last_heard": "2014-07-02T23:15:00.409Z",
    "connected": true,
    "requires_deep_update": true  # <--- NEW KEY/VALUE
  }
]
```

---

The API will also tell you what firmware version the CC3000 is running for a particular core.
This is handy for verifying that the patch was successfully applied.

```bash
# Before applying the patch, the version is less than the newest
curl 'https://api.spark.io/v1/devices/51fab...?access_token=9aa51091b8...'
#                REPLACE WITH CORE ID ^^^^^^^^  REPLACE ACCESS TOKEN ^^

# Note the cc3000_patch_version and requires_deep_update keys
{
  "id": "51ff6b0e5e675f5755380687",
  "name": "jfg_core",
  "connected": true,
  "variables": {},
  "functions": [],
  "cc3000_patch_version": "1.23", # <--- THE RADIO FIRMWARE VERSION
  "requires_deep_update": true    # <--- REQUIRES UPDATE
}


# After applying the patch, the requires_deep_update key is not there and the version is different
curl 'https://api.spark.io/v1/devices/51fab...?access_token=9aa51091b8...'
#                REPLACE WITH CORE ID ^^^^^^^^  REPLACE ACCESS TOKEN ^^

# Note the updated cc3000_patch_version key
{
  "id": "51ff69065067545755380687",
  "name": "joe_prod_core2",
  "connected": true,
  "variables": {},
  "functions": [
    "digitalread",
    "digitalwrite",
    "analogread",
    "analogwrite"
  ],
  "cc3000_patch_version": "1.28" # <-- AH SO FRESH, DEEP UPDATE DONE
```

### It won't work, help!

If you've tried both the IDE and command line approaches to applying the deep update and neither of them are working for you:

1. Search the [community site](community.spark.io) for "deep update", maybe someone else has encountered your issue and can help you out.
2. If you can't find a thread that sounds similar to the problem you're experiencing, post a thread that includes the words "deep update" in the title.
   Be sure to include detailed information about what you've tried so far and what the failure condition looks like so it's easy for others to help you
3. If you you've tried the suggestions here and on the community site and nothing seems to be working, please contact [hello@spark.io](mailto:hello@spark.io). Again, please provide information about what you've tried, how it's failing, relevant threads that didn't work, etc.


Known Issues
===

## Spark UDP - numerous issues
* Status: **Acknowledged**
* Forum Thread: https://community.spark.io/t/udp-issues-and-workarounds/4975

#### Description

There are numerous issues with Spark UDP. The central one is that received datagram boundaries are not preserved by Spark UDP. This and other issues, together with some workarounds, are detailed at the forum thread linked to above.
