---
title: Troubleshooting
template: support.hbs
columns: two
devices: [ photon, core ]
order: 3
---

#Common Troubleshooting Tips and References


## LED Colors (Explained)

{{#if core}}
### Setup Process

During initial setup of a device these are the usual LED specifications:

- **White pulse:** Start-up (happens when the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is first powered on or when it's reset)
- **Flashing blue:** Smart Config, waiting for Wi-Fi credentials
- **Solid blue:** Smart Config, received Wi-Fi credentials
- **Flashing green:** Connecting to local Wi-Fi network
- **Flashing cyan:** Connecting to Particle Cloud
- **High-speed flashing cyan:** Particle Cloud handshake
- **Breathing cyan:** Connected to Particle Cloud
- **Flashing magenta:** Receiving new firmware update over-the-air (OTA)

{{/if}}

### Errors

Hopefully, you never see these colors but here are the error LED color codes:

- **Flash red twice:** Connection failure, no internet connection (technically, can't reach Google)
- **Flash red three times:** Connection failure, Cloud is unreachable
- **Orange flashing:** Connection failure, bad handshake


### Factory Reset & Bootloader

- **Solid white:** Factory reset started
- **High-speed flashing white:** Flashing code from factory reset memory
- **Flashing yellow:** Bootloader mode, waiting for code over USB or JTAG


##Device Management

###How do if find my device ID?

There are several ways to **find your {{#if photon}}Photon's{{/if}} {{#if core}}Core's{{/if}} device ID**, but the best method depends on whether or not your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} has already been claimed to your account.  We'll cover both scenarios in the section below.

**Note:** You do not need to know your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID to complete setup using the Particle smartphone app or over USB!  The {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID is most useful for debugging with the technical support team and building interactions with your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} through the Particle API.

**1. I haven't claimed my {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} yet!**

If you haven't claimed your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} yet, there are two ways for you to figure out your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID:

  1a. **Get your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ID using the Particle CLI** Make sure that you've got the Particle Command Line Interface (CLI) installed by typing ``particle``
into your terminal. 
You should see a help message that displays the various commands available to you.  Please make sure your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is in [Listening Mode](https://mtc.cdn.vine.co/r/videos/B75AACF6B91015398617940668416_154e6c92f81.4.3.1608668747173494282_V_AMvRCF0NS2Y_i_y0FdDV9ABtESHh9GR_VFKEu8Pn8Q3ZHYx9l32NfspugyWKJh.mp4?versionId=l_G0UVaqFXFSdJVxAeJ3.56M1HhVfO9S) (flashing blue), and type ``particle serial identify``.

Your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} should respond with it's {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID!

  1b. **Get your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID using CoolTerm, PuTTY, or screen** CoolTerm and PuTTY are programs for Mac and Windows, respectively, that allow you to communicate with your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} using the exposed serial lines.  You can find the download links for CoolTerm and PuTTY at the links attached--
  [CoolTerm](http://freeware.the-meiers.org/) & [PuTTy](http://the.earth.li/~sgtatham/putty/latest/x86/putty.exe). 

Plug your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} into your computer over USB. When the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is in Listening Mode (flashing blue), open a serial port over USB using the standard settings, which should be:

- Baudrate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Once you've opened a serial connection, you have two commands at your disposal by hitting either w or i on the keyboard. Here's what they do:

- **w:** Set up your Wi-Fi SSID and password
- **i:** ("i" as in identify) Read out the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID

**2. I've already claimed my {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}!**

If you've already claimed your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}, finding your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID is a super simple process. You can still use either of the methods described above, but the easiest method is to look up your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID in the Particle Build IDE.

Follow these simple steps:

- Navigate your web browser to the [Particle Build IDE](https://build.particle.io/build).
- Click on the "{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}" icon in the bottom of the navigation pane
- Find the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} whose device ID you'd like to know, and click on the dropdown arrow on it's right
- The {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ID will be displayed in a box that reads, "device ID"
 

Great! Go forth with your **{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} device ID** and prosper.


###How do I transfer my {{#if photon}}Photon?{{/if}} {{#if core}}Core?{{/if}}

**1. Remove the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}.**

Remove the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} from the account it was previously registered to, using the [Particle Build IDE](https://build.particle.io/build) or Particle CLI.

**2. Connect the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}**

Make sure that the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} is connected to the Particle Cloud (breathing or pulsing cyan).

NOTE: A {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} cannot be claimed unless it is connected to the Particle Cloud, and is breathing/pulsing cyan.

**3. Claim the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}**

Claim the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} using the Particle smartphone app, Particle Build IDE, or Particle CLI.

**"Can Particle do this for me?"**

Excellent question! **No.**

We take **security** extremely seriously at Particle, and that means being very sensitive to attempts to steal, hack, takeover, or misuse {{#if photon}}Photons{{/if}} {{#if core}}Cores{{/if}} and Particle Accounts. As a security feature for all of our customers, we require that requests to add, remove, rename, or reconfigure {{#if photon}}Photons{{/if}} {{#if core}}Cores{{/if}} be submitted directly by the users to whom they are registered.

If you really are the owner of your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}, and are having trouble logging into your Particle account or configuring your {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}, send us an email at [hello @ particle dot io], and our Troubleshooting staff would be happy to help you resolve the issue.

###How do I unclaim a {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ?

There are two primary ways to remove a Core from your account--using the Particle Build Web IDE, or using the Particle Command Line Interface (CLI).

**Using Particle Build**

1. Login to your Particle account at the [Particle Build IDE](https://build.particle.io/build) home page

2. Click on the "Devices" icon in the bottom left-hand panel

3. Identify the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} that you'd like to remove from your account, either by the familiar name you gave it when you added it to your account, or it's device ID. 

4. Click on the arrow next to the device you'd like to remove, and click the blue "REMOVE DEVICE" button


**Using the Particle CLI**

**1. Install [CLI](https://github.com/spark/particle-cli)**.  Make sure you've got the CLI installed by typing

``particle help``

into your terminal. If you're presented with a list of commands, the CLI is installed correctly. If not, please see the following article:

Installing the Particle CLI

**(2. Login**.  Make sure you're logged into your Particle account by typing

``particle login``

and successfully completing the command line prompts.

**3. Remove {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}**.  In your terminal, type

``particle {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} remove [{{#if photon}}PHOTON{{/if}}{{#if core}}CORE{{/if}}]``

where [{{#if photon}}PHOTON{{/if}}{{#if core}}CORE{{/if}}] is either the familiar name or {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}}ID of the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} you'd like to remove from your account. Here's an example:

``particle {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} remove 0123456789ABCDEFGHI``

--or--

``particle {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} remove pinky_panda``

**4. Confirm Removal.**  Confirm that you *really* want to remove the {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} from your account by entering "yes" when prompted by the CLI.

---

**That's it!** The {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} has now been disassociated with your account, and is once again available to be claimed.

##Cloud Solutions

###Building a Local Cloud for Devices

This will guide you through on how to Setup the Local cloud and use it with Particle-cli after a successful installation.

Before you proceed, make sure you fired up ``particle-server`` [link to particle-server](https://github.com/spark/spark-server) successfully at least once. We will need the server public keys generated on 1st run later.

**NOTE:** This will point the Particle-CLI to the local cloud and you will not be able to use features available on the Particle cloud.

**1. We will now create a new server profile on Particle-cli using the command:**

``particle config profile_name apiUrl "http://DOMAIN_OR_IP"``

For the local cloud, the port number 8080 needs to be added behind: http://domain_or_ip:8080

This will create a new profile to point to your server and switching back to the Particle cloud is simply ``particle config`` spark and other profiles would be ``particle config profile_name``.

**2. We will now point over to the local cloud using ``particle config profile_name``**

**3. Run ``particle setup`` (on a separate CMD prompt from the one running the server)**

This will create an account on the local cloud.

Perform <kbd>``CTRL``</kbd>``+``<kbd>``C``</kbd> once you logon with Particle-cli asking you to send Wifi-credentials etc...

**4. On Command-line, ``cd`` to particle-server**

**5. Place your {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} in DFU mode [flashing yellow]**

**6. Change server keys to local cloud key + IP Address**

particle keys server default_key.pub.pem IP_ADDRESS

**7. Go to {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}_key directory to place {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} public key inside**

``cd {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}_keys``
place {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} in DFU-mode
particle keys save INPUT_{{#if photon}}PHOTON{{/if}}{{#if core}}CORE{{/if}}_ID_HERE
NOTE: make sure you use the {{#if photon}}PHOTON{{/if}} {{#if core}}CORE{{/if}} ID when saving the keys!

Reset the {{#if photon}}photon{{/if}} {{#if core}}core{{/if}} manually by hitting the RST button 

**8. Check for connection**

- Make sure particle-server is running
- open a separate CMD (if you closed it earlier)
- cd to particle-server
- run node main.js
- watch the cmd for connections by the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}

You can restart the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} and see if there's any activity when the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} attempts to reach breathing cyan

Example activity from CMD output:

	Connection from: 192.168.1.159, connId: 1
	on ready { coreID: '48ff6a065067555008342387',
				ip: '192.168.1.159',
				product_id: 65535,
				firmware_version: 65535,
				cache_key: undefined }
	Core online!


###Cloud Switching (Local vs Particle)

**1. You will need to flash the respective cloud Public Key to the core which you are connecting to.

- Place your {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} in DFU-mode (flashing yellow)
- On the command line (to switch to Particle Cloud): 
	
	``particle keys server cloud_public.der``
	
	The Particle cloud public key file is here: [https://s3.amazonaws.com/spark-website/cloud_public.der](https://s3.amazonaws.com/spark-website/cloud_public.der)

	For local Cloud: ``particle keys server your_local_cloud_public_key.der IP-ADDRESS``
- Reset your {{#if photon}}photon{{/if}}{{#if core}}core{{/if}}

**2.Changing of probile back to the default particle cloud on the Particle-cli must be performed using:

``particle config identify``

Example Output:

	KENMBP:~ kennethlimcp$ spark config identify
	Current profile: local
	Using API: http://192.168.1.68

This will ensure that you are pointing to your own cloud!

*Thanks to [Kenneth Lim](http://community.particle.io/users/kennethlimcp/activity) for writing this local cloud solution.*


##Device Mode Switching

One of our goals with the Particle {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} and Particle OS was to abstract away the connectivity layer. When you're running a distributed OS where some of your software runs on the device and some of your software runs in the cloud, you want the connection between the two to "just work".

However, sometimes you don't want everything to be automatic; you want to take control of the connection, so you can decide when the device should try to connect and when it shouldn't. This is particularly helpful when you want your application code to start running immediately as soon as the device is powered, and the connectivity stuff can happen later on.

As of today, the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} has three modes: **AUTOMATIC, SEMI_AUTOMATIC, and MANUAL**. Let's go through each of them in turn.

###Automatic Mode

The default mode of the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} is "automatic mode". This means that the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} will attempt to connect to Wi-Fi automatically. If you don't explicitly define the connection mode, the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} will be running in automatic mode. This is identical to how the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} has always worked up until now.

Behind the scenes, what's running on the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} looks something like this:

	void main() {
	  // First, connect to the internet
	  Spark.connect();

	  // Then run the user-defined setup function
	  setup();

	  while (1) {
	    // Then alternate between processing messages to and from the Cloud...
	    Spark.process();

	    // ...and running the user-defined loop function
	    loop();

	  }
	}

But the whole point of the automatic mode is you don't really need to know that. The Wi-Fi connection just works. So let's say your code looks like this:

	// You don't have to add this, but if you want to be explicit:
	SYSTEM_MODE(AUTOMATIC);

	void setup() {
	  pinMode(D7, OUTPUT);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  delay(500);
	  digitalWrite(D7, LOW);
	  delay(500);
	}

What's actually happening is that first we're calling **Spark.connect()**, which will connect the device to the Cloud. Once it's connected, then your code will run, and your **loop()** will alternate with **Spark.process()** so that we can process incoming messages in something that resembles a background process. (Side note: **Spark.process()** also runs during delays).

Ok, that's all well and good, but what if I don't know whether my {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} will have an internet connection? I still want my LED to blink. So now we've got:

###Semi-automatic mode

	// Insert firearm metaphor here
	SYSTEM_MODE(SEMI_AUTOMATIC);

	void setup() {
	  pinMode(D7, OUTPUT);
	  attachInterrupt(D0, connect, FALLING);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  delay(500);
	  digitalWrite(D7, LOW);
	  delay(500);
	}

	void connect() {
	  if (Spark.connected() == false) {
	    Spark.connect();
	  }
	}

In this version of the code, when the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} is plugged in, the LED will immediately start blinking. When a button attached to D0 is depressed (bringing DO to **LOW**), **Spark.connect()** will be called. If the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} already has Wi-Fi credentials in memory, it will attempt to connect; otherwise, it will enter listening mode, and wait for your network name and password through the Particle mobile app or over USB.

The only main difference between **SEMI_AUTOMATIC** mode and **AUTOMATIC** mode is that **Spark.connect()** is not called at the beginning of your code; you have to do that yourself. Let's go deeper down the rabbit hole with:

###Manual Mode

The {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}'s manual mode puts everything in your hands. This mode gives you a lot of rope to hang yourself with, so tread cautiously.

Like **SEMI_AUTOMATIC** mode, in **MANUAL** mode you need to connect to the Cloud using **Spark.connect()** yourself. However, in manual mode, the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} will not call **Spark.process()** automatically; you have to call it yourself. So your code might look like this:

	SYSTEM_MODE(MANUAL);

	void setup() {
	  pinMode(D7, OUTPUT);
	  attachInterrupt(D0, connect, FALLING);
	}

	void loop() {
	  digitalWrite(D7, HIGH);
	  Spark.process();
	  delay(500);
	  digitalWrite(D7, LOW);
	  Spark.process();
	  delay(500);
	}

	void connect() {
	  if (Spark.connected() == false) {
	    Spark.connect();
	  }
	}

**You must call Spark.process() as frequently as possible to process messages from the Wi-Fi module.** If you do not do so, you will encounter erratic behavior, such as:

- The Core losing its connection to the Cloud
- The Core breathing cyan when in fact it is not connected
- Long delays when a request is sent to the Core because the Core won't respond until it's processed the message

Sounds kinda terrible, right? Except this can be really useful when you're writing code that is very sensitive to exact timing, and the **Spark.process()** call might interrupt your sensitive code. By turning on **MANUAL** mode, you can make sure that **Spark.process()** is called when you want, and not when the processor is busy with a time-sensitive task.

As Stan Lee once said: with great power comes great responsibility. Go forth and control the connection. Be careful. Good luck.

##Installing Particle CLI

For [installation instructions](https://github.com/spark/particle-cli) and to stay up-to-date on the most recent revisions of our Particle-cli, follow our repo
[Particle CLI Repo](https://github.com/spark/particle-cli).

##Device Key Management

An easy step-by-step walkthrough of Particle CLI commands to BACKUP, RESTORE and CHANGE Keys.

https://github.com/spark/particle-cli#particle-keys-doctor

{{#if core}}
You may need to use this guide if you suffer from: "My Core is flashing yellow/red (orange) lights after it connects to Wi-Fi (Decryption Error)"

More detailed info:
https://community.particle.io/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627
{{/if}}

###How to Backup/Save your Key:

1. Place your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2.Run the ``particle keys save mykey.der`` command. This will backup the key on your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} to the Home folder on your computer.  You can substitute your own naming convention for the *.der file if you wish.

###How to Restore/Load your Key:

1. Place your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2. Run the ``particle keys load mykey.der`` command. This will restore the key you saved previously to your Home directory to your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}.  The file may not necessarily be named mykey.der, substitute whatever you backed it up as previously with the ``particle keys save`` command. 

###How to Change your Key:

If you have physical access to the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} in question, here's how to change the Key on it. Once you do that you can share the Public key with us and we'll get you up and running again on that {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}.  You may not even need to share the key with us if it your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} connects to the Cloud after following this procedure.

Bare with me for these next steps! This is slightly complicated because of the great security implemented on the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}.

1. Before we can start, you're going to want to install the Particle CLI tool to make life easier! Please see the readme here: [Particle CLI](https://github.com/spark/particle-cli)

2. Once the CLI tool is installed the first thing you should do is login to your Particle account.  If you do not have an account yet, please set one up at https://build.particle.io/build .

3. To login on the Particle CLI, run the command `particle login` and follow the prompts for email and password.

4. Next we need to get the Device ID of your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}. Start by putting the {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into Listening Mode by resetting it, and then holding the Mode button for about 3 seconds until it starts blinking BLUE.

5. Next run the following command to get the ID of your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}: ``particle serial identify``. It should reply "Your {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} id is: xxxxxxxxxxxxxxxxxx". Copy the number down or to your clipboard for later.

6. View the key commands and example output here for the next steps: https://github.com/spark/particle-cli#particle-keys-doctor

7. Place your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

8. Run the ``particle keys doctor xxxxx`` command, where xxxxx is the device ID you copied just earlier. This will generate a new public/private key pair and automatically download it to your device, and also send the public key up to the Cloud.

9. For good measure, run this command to make sure the key has been sent to the Cloud ``particle keys send yyyyy xxxxx_new.pub.pem``, where yyyyy is your device ID and xxxxx is also the same device ID. Written this way to show you the first part is your device ID, and the second part is the ID in part of a filename of your public key that was auto generated by the `doctor` command.

10. Please email us a copy of your new Public key file (skip this if it connects to the Cloud already). It should be called xxxxx_new.pub.pem, where you guessed it...xxxxx is the device ID from before ;) You should be able to search your system hard drive for it pretty easily but it is typically found in your Home directory.

Congrats, you made it to the end! now your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} should be connected to the Cloud... or will be just as soon as we add your Key to the server.

##Connection Troubles

###Can't Get Connected

{{#if core}}
There are many reasons that your Particle Core might not be able to connect to your network. There are many types of Wi-Fi networks, and the Core and the CC3000 do not support all of them. We consider it an important goal of ours to connect easily and painlessly to as many networks as possible, and your feedback is extremely valuable so that we can get better.
{{/if}}

The {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} works best with a traditional home network: simple networks with WPA/WPA2 or WEP security (or unsecured), with a single router from a reputable company (Apple, Netgear, Linksys, D-Link, etc.) without any fancy settings. The more your network diverges from the norm, there more likely you might encounter issues.

There are known issues with the following types of networks:

- **802.11n-only networks**. The Core is 802.11b/g. Most 802.11n networks are backwards compatible with 802.11b/g, but if yours is not, the Core will not connect.
- **Networks with ["captive portal"](http://en.wikipedia.org/wiki/Captive_portal) security**. A captive portal is the little website that comes up to ask you to sign in to a network or sign an agreement, like at a Starbucks. The Core can't navigate these portals.
- **Enterprise networks**. We have had mixed results connecting the devices to enterprise networks, although we don't yet have a great understanding of what's causing the issue. This is something that we are working to improve.
- **Complex Networks**. Networks with multiple routers, with non-standard firewalls, and with non-standard settings.
- **Channels above 11**. This is in particular an international issue; if you are outside the U.S., your Wi-Fi router might run at channels 12, 13, or 14, which the CC3000 does not support. Please use channels numbered 11 or lower.

{{#if core}}
So, let's dig in. If your Core is not connecting to your Wi-Fi network, we recommend following these steps:

**STEP 0: Check the basics**

- Check your Wi-Fi credentials (SSID and password) to make sure you typed them correctly.
- Make sure you're in range of your Wi-Fi network. If your phone or computer has a poor connection in the same location, try moving closer to your Wi-Fi access point.
- If you're using a u.FL Core, make sure you have an antenna attached, and that it's firmly connected.
- Make sure your Core has enough power to transmit Wi-Fi signals (300mA in bursts). Try a different power source, or unplug components that draw a lot of power.

**STEP 1: Set up your Core over USB**

On some networks, Smart Config does not work, but the Core can connect to the network just fine. We've implemented a back-up mechanism so you can set up your Core over USB. Don't forget that you'll need to claim your Core manually as well if you haven't already!

[Setup with USB >](/guide/getting-started/intro/core/)

**STEP 2: Try another network**

There are many reasons that your Core might not connect; some of them have to do with the Core; some have to do with your mobile device sending the Wi-Fi credentials; some have to do with the network. If your Core doesn't connect, try another Wi-Fi network. This will quickly help you figure out which type of issue you might be seeing.

**STEP 3: Reboot and clear memory**

So often, electronics start behaving after you shut them off and turn them back on. Try:

- Closing your mobile app and re-opening it
- Un-plugging the Core and plugging it back in
- Clear the Core's memory of Wi-Fi networks by holding the MODE button for 10 seconds. After 3 seconds, the light should start flashing blue; after 10 seconds, it should do a quick burst of blue flashes. That means the memory has been cleared.
- Restoring the Core's firmware to the factory default. Getting this right can be tricky, see [this video](https://community.particle.io/t/how-to-do-a-factory-reset/2579) for illustration.

**STEP 4: Check your router settings**

There are a million ways router settings could cause problems, but here's a few things to look out for:

- **Use DHCP**. Although the Core can handle static IP addresses, it's not configured for it out of the box, so you'll have to dig into the source code.
- **Turn off access control and firewalls**. Not permanently, but temporarily, to see if it resolves the issue. If it does, you can hopefully just tweak your settings to accommodate the Core rather than taking down your security. The only change you may need to make to your router is to open up outgoing port 5683, the default [CoAP](http://en.wikipedia.org/wiki/Constrained_Application_Protocol) port the  Core uses to connect to the Particle Cloud. If your core flashes cyan and occasionally flashes red, router issues are likely the culprit.

**STEP 5: Search the forums**

It's possible that other folks have encountered the same issues that you have. The best way to check and learn from others is to [search the forums](https://community.partcle.io/); search for your particular symptoms or for your Wi-Fi router make and model to find relevant posts.

**STEP 6: Post a report in the Forums**

We would love to hear about your issues, regardless of whether you were able to resolve them, so that we can improve our platform. If you haven't been able to resolve your issue, hopefully we or the community will be able to help.

Please post issues with connectivity either as responses to this topic or, if they are dissimilar from other reported issues, as their own topic. When you make a post, please include:

- Router make and model
- Network security (unsecured, WEP, WPA2, etc.)
- Environment (home, small office, enterprise, public network, etc.)
- Network topology (number of routers and/or range extenders, estimated number of devices connected to network)
- Internet Service Provider
- Any network settings that might diverge from the norm

##Troubleshoot by color on the Core

Here is a [comprehensive community guide](https://community.particle.io/t/spark-core-troubleshooting-guide-spark-team/696) on this issue.

{{/if}}

##{{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} Pinout Map & Datasheets

{{#if photon}}
Go to our Photon datasheets [collection](/datasheets/photon-datasheet/) to get an in-depth view of the Photon pinouts.
{{/if}}

{{#if core}}
Go to our Core datasheets [collection](/datasheets/core-datasheet/) to get an in-depth view of the Core's pinouts.
{{/if}}
