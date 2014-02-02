Connecting your Core
===

<iframe class="vine-embed" src="https://vine.co/v/hFHPMue5lgd/embed/simple" width="320" height="320" frameborder="0"></iframe>

The easiest way to connect the Spark Core to Wi-Fi is using the Spark mobile app for iPhone or Android. But in case that's not working for you or you don't have an iOS/Android phone, there are other methods as well.

For all of the following methods, the Spark Core must be in "listening" mode, which you'll know by its flashing blue LED.

<iframe class="vine-embed" src="https://vine.co/v/hFHlpBDELeU/embed/simple" width="320" height="320" frameborder="0"></iframe>

The Core boots into listening mode by default, so if your Core is brand new, it should go straight into listening mode. Otherwise, hold the MODE button for three seconds.

## Smart Config with the Spark app

<iframe class="vine-embed" src="https://vine.co/v/hFH09MJwbxg/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once you've downloaded the Spark Core app from the App Store or Google Play, you should create an account. Afterwords, you'll be asked to connect your Core using a process called Smart Config.  If your Core has a u.FL connector, you must connect an external antenna before initiating Smart Config. *NOTE: Your phone must be connected to the Wi-Fi network that you want to connect the Core to.* The app will automatically fill the SSID field with the name of the network that your phone is connected to.  Enter your Wi-Fi password and hit connect.

<iframe class="vine-embed" src="https://vine.co/v/hFwubhA3JXV/embed/simple" width="320" height="320" frameborder="0"></iframe>

Smart Config can take up to a minute, so be patient. The closer your phone to your Spark Core, the faster it will connect. Once the Core hears the signal, it will go through the following sequence of lights:

- **Solid blue**: Credentials captured
- **Flashing green**: Connecting to Wi-Fi network
- **Flashing cyan**: Connecting to Spark Cloud
- **Breathing cyan**: Connected to Spark Cloud

<iframe class="vine-embed" src="https://vine.co/v/hFdj1TJjA9M/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once the Spark Core has connected, your phone will "claim" the Core and attach it to your account. Then you'll get to name your Core.  If you're uncertain, you can confirm that the claim process was successful by logging into the [Spark Web IDE](https://www.spark.io/build) and clicking the "Cores" icon at the bottom of the page.  Is your Core listed?  Great!  The world is perfect.  

*NOTE: The Core **MUST** be online (breathing cyan) in order for the claiming process to work. If the Spark Core has been claimed by someone else, the app won't recognize it. If you need to transfer a Spark Core to another account, email us at [hello@spark.io](mailto:hello@spark.io).*

<iframe class="vine-embed" src="https://vine.co/v/hFdPKul226i/embed/simple" width="320" height="320" frameborder="0"></iframe>

If you are connecting multiple Cores, you'll go through this naming process for each Core. You'll know which one is which by the rainbow signal.

<iframe class="vine-embed" src="https://vine.co/v/hFdxB9lHOmv/embed/simple" width="320" height="320" frameborder="0"></iframe>

Once you've finished naming your Cores, you can control them with Tinker! Try *digitalWrite* on D7 to turn on the user LED.

## Smart Config with the TI app

Smart Config with the Texas Instruments CC3000 app is similar to the process above, although you don't need an account with Spark, and TI also has a Java applet that can work from a Mac, Windows, or Linux computer.

Follow the instructions on Texas Instrument's website:

[CC3000 Smart Config @ Texas Instruments](http://processors.wiki.ti.com/index.php/CC3000_Smart_Config)

The only thing that's different is that you'll need to activate the optional AES key and type `sparkdevices2013`.

*NOTE: TI's Android app is not available in Google Play; you'll have to download it off of their website and side-load the apk yourself.*

## Connect over USB

You can also connect the Spark Core to your Wi-Fi network over USB by communicating through Serial. *NOTE: This only works when the Spark Core is in listening mode*.

First, you'll need to download a serial terminal application; we recommend [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) for Windows and [CoolTerm](http://freeware.the-meiers.org/) for Mac. From the command line, [GNU Screen](https://www.gnu.org/software/screen/) works great.

![CoolTerm settings](images/coolterm-settings.png)

If you're running Windows, you'll need a driver:

[Windows driver for Spark Core >](https://s3.amazonaws.com/spark-website/spark_core.inf)

Plug your Spark Core into your computer over USB. When the Spark Core is in listening mode, open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Screen should work by running `sudo screen <port> 9600`, and then pressing either of the commands below. On Ubuntu, `<port>` is probably /dev/ttyACM0.

![CoolTerm setup](images/coolterm-setup.png)

Once you've opened a serial connection, you have two commands at your disposal by hitting either **w** or **i** on the keyboard. Here's what they do:

- **w**: Set up your Wi-Fi SSID and password
- **i (the i in tiger)**: Read out the Spark Core ID

**NOTE:** If you connect your Core over USB the first time, you will also need to manually *claim* your Core to connect it with your account. Please see the section below on [claiming your Core](/#/connect/claiming-your-core) for more details.


## Coming soon: Hard-code credentials

Currently there is not a mechanism to hard-code your SSID and password into the firmware for the Spark Core. We're working on it!

Claiming your Core
===

Once your Core is connected, it needs to be *claimed* in order to be associated with your account. This is what lets you control your Core and keeps anyone else from doing so.

If you use the mobile app to set up your Core, it should claim it automatically. However if you connect your Core over USB, or if the claiming process is unsuccessful, you can claim it manually.

First, you'll need to get your Core's ID. You can do this by opening a Serial connection to the Core and pressing the **i** key (see the above instuctions for connecting over USB). It should show you a number like this:

    # Example Core ID
    55ff68064989495329092587

---

Then open up [Spark Build](https://www.spark.io/build) and click the 'Cores' icon. Click the button that says 'Add a Core', and enter your ID in the text box.

We will be releasing a command-line tool to simplify this process; stay tuned!

Troubleshooting
===

There are many reasons that your Spark Core might not be able to connect to your network. There are many types of Wi-Fi networks, and the Spark Core and the CC3000 do not support all of them. We consider it an important goal of ours to connect easily and painlessly to as many networks as possible, and your feedback is extremely valuable so that we can get better.

The Spark Core works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured),  with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Spark Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the Spark Core will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The Spark Core can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the Spark Core to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Networks with WEP security**. If connecting with the mobile app works for you, WEP-secured networks should be fine. However, you cannot currently connect to a WEP-secured network over USB. We are implementing a fix for this now, which should be available in the next couple of weeks.
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

Troubleshooting by color
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
3. Try [rebooting the Core and clearing its memory](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
4. If you have an Android phone, and your network has no password, you cannot currently use the Spark Core app to communicate the credentials to your Core.  Instead, try using [TI’s SmartConfig app to configure your Core](/#/connect/connecting-your-core-smart-config-with-the-ti-app).
5. Try configuring your Core over USB.  Instructions can be found [here](/#/connect/connecting-your-core-connect-over-usb).
6. If all else fails, please [contact the Spark team](mailto:hello@sparkdevices.com) and provide us with the brand and model of your smartphone.

---


## Flashing green

- *What’s the Core doing?* My Core is [flashing green](https://mtc.cdn.vine.co/r/videos/DB9E0E87311015399731217969152_1d6c83d12a3.4.3.2795910212236322177_4RBA9frM0a4pwIG_RbZgo.ZOBEbBr_CpxzoOsBNuExDz6TFldcjJSYHVh203e6F4.mp4?versionId=orM0m0DvLYdciAwsb6DYHhqb974AHMj_), but doesn’t progress to flashing Cyan.
- *What’s the problem?* Your Core has received Wi-Fi credentials (an SSID and password), but still can't connect to the Wi-Fi network.
- *How do I fix it?*

Please complete the following steps:

1. [Check the basics](/#/connect/troubleshooting-step-0-check-the-basics).
2. Try a new power source. You should be powering your Core with a power supply that is capable of providing 500mA of current.  We recommend the 5V/1A wall wart power supplies that are commonly used for charging cell phones.
3. If your network has a landing page or splash page, the Core will not be able to connect; try configuring it onto a different network.
4. Try [rebooting the Core and clearing its memory](/#/connect/troubleshooting-step-3-reboot-and-clear-memory).
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

1. Try a factory reset.  Hold down both buttons, then release the RST button, while holding down the MODE button.  The LED should begin flashing yellow.  Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white.  Then release the button.  The Core should begin [flashing blue](https://v.cdn.vine.co/r/videos/E465A8959B1015390893882101760_178fcfd2b3c.4.3.11510817618992331600_MIW9HE1mtZ9H_SpBlKdK1lv2UfmniExCFQHrgJ7iqiFDUiDb0E31bR7GwvB_7wz0.mp4?versionId=eS01KUZ6NaUZgEipSDeVi0rxZENByp1N) after the factory reset is complete.
2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional.  If you have a JTAG shield, [contact the Spark team](mailto:hello@spark.io) so we can help walk you through re-installing the Core firmware.  If you do not have a JTAG shield, please [contact the Spark team](mailto:hello@spark.io) to let us know, and we’ll help you take next steps.

## LEDs off and unresponsive

- *What’s the Core doing?* My Core isn’t showing any LED activity when I power it over USB.
- *What’s the problem?* Your Core is not receiving power.
- *How do I fix it?*

Please complete the following steps:
  
1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example)
2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please [contact the Spark team](mailto:hello@spark.io) for further debugging.
