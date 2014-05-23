Can't get connected?
===

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

On some networks, Smart Config does not work, but the Core can connect to the network just fine. We've implemented a back-up mechanism so you can set up your Core over USB. For instructions, see above. Don't forget that you'll need to claim your Core manually as well if you haven't already!

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

[Visit the forums >](https://community.sparkdevices.com)

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

Right now, your Core does not have the information it needs to connect to your local Wi-Fi network.  If you haven’t already, try using the Spark Core app for [iPhone](https://itunes.apple.com/us/app/spark-core/id760157884) or [Android](https://play.google.com/store/apps/details?id=io.spark.core.android)  to send your network credentials to your Core.  Detailed instructions can be found [here](http://docs.spark.io/#/connect/connecting-your-core-smart-config-with-the-ti-app).


If that doesn’t work, try the steps below:


1. If your network router supports 802.11n, make sure that it also supports Legacy network protocols, and that it is configured into that mode (the Core supports 802.11 a/c networks)
2. If you have a Core with a u.FL connector, make sure the antenna is attached
3. Try [rebooting the Core and clearing its memory](/#/troubleshooting/can-t-get-connected-step-3-reboot-and-clear-memory).
4. Try configuring your Core over USB.  Instructions can be found [here](/#/connect/connecting-your-core-connect-over-usb).
5. If all else fails, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model of your smartphone.

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
6. Try manually re-running the patch programmer to update the CC3000’s firmware over USB.  You can find detailed instructions [here](https://community.sparkdevices.com/t/failed-connecting-to-wifi/648/53).  
7. If none of the above are successful, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model number of your access point.

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

If none of these steps are successful, please [contact the Spark team](mailto:hello@sparkdevices.com).

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

Please complete the following steps:

1. A full set of instructions for resolving this issue can be found at the following location on the Spark Community forums.  If the steps included in the link below are unsuccessful, please [contact the Spark team](mailto:hello@sparkdevices.com).

[Replacing your Spark Cloud credentials >](https://community.sparkdevices.com/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627)

---

## Flashing green then red

- *What’s the Core doing?* My Core starts flashing green to connect to my network, then the LED turns red.
- *What’s the problem?* Your Core is facing a networking issue and cannot connect to the Cloud.
- *How do I fix it?*

There are two potential failure modes here--either your home network does not have a working internet connection, or we are having issues with our servers.

1. Try power cycling your router to resolve any transient networking hiccups in your home Wi-Fi network
2. Try going to a website like [Google](http://www.google.com/) on your computer or laptop to verify that your Wi-Fi network is connected to the internet and is capable of serving up web pages
3. Check www.spark.io/status to see if there is a known issue with the Spark Cloud
4. If you’re still seeing this issue, please [contact the Spark team](mailto:hello@sparkdevices.com).

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


Known Issues
===

## Flashing Cyan
* Status: **Solution in progress, available in 1-2 weeks**
* Forum Thread: https://community.spark.io/t/bug-bounty-kill-the-cyan-flash-of-death/1322

#### Description

With certain WiFi networks, the Spark Core will sometimes enter a state where the status LED will flash cyan. Flashing cyan means that the Spark Core can no longer communicate with the Spark Cloud server. If this happens, the Spark Core is programmed to try to reconnect. When the Core reconnects, the status LED will go back to 'Breathing Cyan'.

The Spark Core is equipped with a Texas Instruments (TI) CC3000 WiFi module to facilitate wireless networking. The CC3000 module has it's own closed-source firmware that was created by TI. Unfortunately, it was discovered that the firmware on the CC3000 module itself has an issue that can cause the module to stop responding. In this case, the Spark Core entered a permanent state of flashing cyan referred to as the 'Cyan Flash of Death' or CFOD. A reset was required to reconnect the Spark Core.

The good news is that the firmware on the CC3000 module can be updated and the Spark team has been working with TI in order to resolve the issue. Also, because of the great work by many community members and the Spark team, the Spark Core firmware has been modified to work around the issues with the CC3000. When the CC3000 fails, the Spark Core firmware will attempt to reset the CC3000 and reconnect to the Spark Cloud.

So far TI has supplied a couple of firmware patches to the Spark Team to test, but at this time, the issue doesn't seem to have been fully resolved. TI has been very helpful during this process and we're hopeful to have a fix soon. When the fix is ready and fully tested, we will provide instructions on how to update the CC3000 firmware.

## Spark.publish() breaks inside of Spark.function()
* Status: **Acknowledged**
* Forum Thread: https://community.spark.io/t/spark-publish-crashing-core/3463

#### Description

If `Spark.publish()` is called within a function declared in `Spark.function()`, the Core may become unresponsive for a short period of time and return a 408 timed out error in the cloud API call.

A fix can be applied in the user code that will work around this issue.  A simple explanation can be found in [post #10 of the forum thread](https://community.spark.io/t/spark-publish-crashing-core/3463/10).

Recently Resolved Issues
===

## Flashing Blue
* Status: **Resolved as of v0.2.0**
* Github Issue: https://github.com/spark/core-firmware/issues/144
* Forum Thread: https://community.spark.io/t/status-led-flashing-blue/2915

#### Description

In some cases after attempting to connect to a Wi-Fi network and failing repeatedly, the Core will step back into listening mode, and will stop attempting to connect to the internet.

This issue has been resolved, and the fix was pushed with firmware v0.2.0 on March 25.

## Inaccurate analog readings
* Status: **Resolved as of v0.2.0**
* Forum Thread: https://community.spark.io/t/odd-analog-readings/906
* Forum Thread: https://community.spark.io/t/odd-analog-readings-part-2/2718

#### Description

Timing issues were causing analog readings to return incorrectly; this has now been fixed with [this commit](https://github.com/spark/core-firmware/commit/b7ce24a4fb2dfe4f90e597e3a0f568f9ae098cfe).

This issue has been resolved, and the fix was pushed with firmware v0.2.0 on March 25.

## Serial1 UART missing data
* Status: **Resolved**

#### Description

Previously, Serial UART was polling, and data could be dropped if the user code did not check frequently enough. Serial UART is now interrupt driven, so this is no longer an issue.

## Long delays break connectivity
* Status: **Resolved**
* Forum Thread: https://community.spark.io/t/known-issue-long-delays-or-blocking-code-kills-the-connection-to-the-cloud/950

#### Description

Long delays can keep messages from being sent to the Cloud, which can cause the connection with the Cloud to abruptly die.

We recently released an update to process Cloud messages during long delays, making this issue significantly less of a problem. It is still possible to block the connection to the Cloud with a long series of very short delays, but longer delays will no longer cause issues.

## Can't init. peripherals in constructors
* Status: **Resolved**
* Forum Thread: https://community.spark.io/t/serial1-begin-in-class-constructor-hangs-core/3133

#### Description

Constructors are now called after the Core is initialized.
