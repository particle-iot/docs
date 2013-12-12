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

Once the Spark Core has connected, your phone will "claim" the Core and attach it to your account. Then you'll get to name your Core.  If you're uncertain, you can confirm that the claim process was successful by logging into the [Spark Web IDE](www.spark.io/build) and clicking the "Cores" icon at the bottom of the page.  Is your Core listed?  Great!  The world is perfect.  

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

First, you'll need to download a serial terminal application; we recommend [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/) for Windows and [CoolTerm](http://freeware.the-meiers.org/) for Mac.

![CoolTerm settings](images/coolterm-settings.png)

If you're running Windows, you'll need a driver:

[Windows driver for Spark Core >](https://s3.amazonaws.com/spark-website/spark_core.inf)

Plug your Spark Core into your computer over USB. When the Spark Core is in listening mode, open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

![CoolTerm setup](images/coolterm-setup.png)

Once you've opened a serial connection, you have two commands at your disposal by hitting either **w** or **i** on the keyboard. Here's what they do:

- **w**: Set up your Wi-Fi SSID and password
- **i**: Read out the Spark Core ID


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
- **Turn off access control and firewalls**. Not permanently, but temporarily, to see if it resolves the issue. If it does, you can hopefully just tweak your settings to accommodate the Core rather than taking down your security.

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