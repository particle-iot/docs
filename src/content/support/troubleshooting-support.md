---
title: Troubleshooting
template: support.hbs
columns: two
devices: [ photon, core ]
order: 3
---

# Common Troubleshooting Tips and References

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


## Device Management

### How do if find my device ID?

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


### How do I transfer my {{#if photon}}Photon?{{/if}} {{#if core}}Core?{{/if}}

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

### How do I unclaim a {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} ?

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

## Cloud Solutions

### Building a Local Cloud for Devices

This will guide you through on how to Setup the Local cloud and use it with Particle-cli after a successful installation.

Before you proceed, make sure you fired up ``particle-server`` [link to particle-server](https://github.com/spark/spark-server) successfully at least once. We will need the server public keys generated on 1st run later.

**NOTE:** This will point the Particle-CLI to the local cloud and you will not be able to use features available on the Particle cloud.

**1. We will now create a new server profile on Particle-cli using the command:**

``particle config profile_name apiUrl "http://DOMAIN_OR_IP"``

For the local cloud, the port number 8080 needs to be added behind: http&#58;//domain_or_ip:8080

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


### Cloud Switching (Local vs Particle)

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

	KENMBP:~ kennethlimcp$ particle config identify
	Current profile: local
	Using API: http://192.168.1.68

This will ensure that you are pointing to your own cloud!

*Thanks to [Kenneth Lim](http://community.particle.io/users/kennethlimcp/activity) for writing this local cloud solution.*


## Device Mode Switching

One of our goals with the Particle {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} and Particle OS was to abstract away the connectivity layer. When you're running a distributed OS where some of your software runs on the device and some of your software runs in the cloud, you want the connection between the two to "just work".

However, sometimes you don't want everything to be automatic; you want to take control of the connection, so you can decide when the device should try to connect and when it shouldn't. This is particularly helpful when you want your application code to start running immediately as soon as the device is powered, and the connectivity stuff can happen later on.

As of today, the {{#if photon}}photon{{/if}}{{#if core}}core{{/if}} has three modes: **AUTOMATIC, SEMI_AUTOMATIC, and MANUAL**. Let's go through each of them in turn.

### Automatic Mode

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

### Semi-automatic mode

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

### Manual Mode

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


## Device Key Management

An easy step-by-step walkthrough of Particle CLI commands to BACKUP, RESTORE and CHANGE Keys.

https://github.com/spark/particle-cli#particle-keys-doctor

{{#if core}}
You may need to use this guide if you suffer from: "My Core is flashing yellow/red (orange) lights after it connects to Wi-Fi (Decryption Error)"

More detailed info:
https://community.particle.io/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627
{{/if}}

### How to Backup/Save your Key:

1. Place your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2.Run the ``particle keys save mykey.der`` command. This will backup the key on your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} to the Home folder on your computer.  You can substitute your own naming convention for the *.der file if you wish.

### How to Restore/Load your Key:

1. Place your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2. Run the ``particle keys load mykey.der`` command. This will restore the key you saved previously to your Home directory to your {{#if photon}}Photon{{/if}}{{#if core}}Core{{/if}}.  The file may not necessarily be named mykey.der, substitute whatever you backed it up as previously with the ``particle keys save`` command. 

### How to Change your Key:

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

## Connection Issues

### Can't Get Connected

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

[Setup with USB >](/guide/getting-started/intro/core)

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


### Special Cases

***Pulsing White***

- **What's the Core Doing?** The main LED on my Core slowly pulses white, even if I reset it or [perform a factory reset](https://community.particle.io/t/how-to-do-a-factory-reset/2579).
- **What's the problem?** The CC3000 on the COre is having trouble initializing due ot a potential hardware issue.
- **How do I fix it?** In general, if the LED on your Core starts breathing white, the best thing to do is to reach out to the Particle team. Refer to this issue in your email, and Particle's Technical Support staff will help you resolve the problem directly.
	

***Main LED off, Small Blue LED dim***

- **What’s the Core doing?** The main LED on my Core is off, but the small blue LED in the upper right corner is dimly glowing.
- **What’s the problem?** Your Core is missing firmware.
- **How do I fix it?** 

1. Try a factory reset. Hold down both buttons, then release the RST button, while holding down the MODE button. The LED should begin flashing yellow. Continue holding down the MODE button until you see the Core change from flashing yellow to flashing white. Then release the button. The Core should begin after the factory reset is complete. [Here](http://docs.particle.io/core/connect/#appendix-factory-reset) is a video to illustrate it being done.

2. If you see no flashing lights during factory reset, then your Core may be temporarily nonfunctional. If you have a JTAG shield, contact [hello @ particle dot io] so we can help walk you through re-installing the Core firmware. If you do not have a JTAG shield, please contact the Particle team to let us know, and we’ll help you take next steps.

***Both LEDs off and Unresponsive***

- **What's the Core doing?** My Core isn't showing any LED acitivity when I power it over USB.
- **What's the problem?** Your core is not receiving power.
- **How do I fix it?**

Please complete the following steps:

1. Try powering the Core with a different USB cable and power supply (different USB port on your computer, for example).

2. If a different USB cable and power supply does not fix the issue, your Core may have a hardware short. Please contact the Particle team for further debugging.


## Upgrades and Updates

### Deep Update for the Core

A **deep update** is a firmware update that reaches **deep** into the internals of a core and updates the firmware of peripheral modules like the CC3000. Periodically, as enhancements and bugfixes become available for components on the Core, we'll release new deep updates to keep your hardware always running the latest, greatest firmware within your application and the other underlying flashable components. Our first deep update release, **deep_update_2014_06** is the maiden voyage of this feature, designed to apply the CC3000 patch, fix the flashing cyan issue, and dramatically improve the stability and performance of the Core.

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

If you're on a noisy WiFi network you've had troubles flashing wirelessly in the past, you might want to consider using one of the alternate USB-based approaches described below.

**Flash via Particle CLI**

The [Particle CLI](https://github.com/spark/particle-cli) s a swiss army command line knife that can be used to do all kinds of cool things...like flash a deep update to your core. The README provides some nice documentation about how to install it and [how to do a deep update over USB](https://github.com/spark/spark-cli#performing-a-deep-update). The process is pretty simple:

Install or Upgrade the CLI (requires Node.js):

``npm install -g spark-cli``

Connect a Core to your computer via USB and put it into [dfu-mode](/guide/getting-started/modes/core/#dfu-mode-device-firmware-upgrade-)

Run the flash command:

``particle flash --usb deep_update_2014_06``

This installs the deep udate from a binary that is packaged with the Particle CLI, so you don't have to download it.


### Full Firmware Upgrade

If you are having intermittent connectivity issues, odd behavior or believe your firmware to be corrupted or out of date, you would benefit from performing a full firmware upgrade. This requires using dfu-util and installing the [Particle CLI](https://github.com/spark/particle-cli)
, which provides an excellent local development and troubleshooting environment for your Spark development.

Once the Particle CLI and dfu-util are installed, you have to enter DFU mode. Once that is done, please run the following commands through the Particle CLI:

- particle flash --factory tinker
- particle flash --usb cc3000
- particle flash --usb tinker

These commands replace the factory reset image, and re-patch the radio, bringing your Core to an upgraded factory state. Good luck!

{{/if}}


## Hardware Questions

### Shields and Accessories

For all hardware related questions in regards to all of our available shields, pinouts, and diagrams, and mini-tutorials
feel free to visit our [Datasheets Section](/datasheets/photon-shields/#shield-shield) on these topics.
This includes:
 
- Shield Shield
- Relay Shield
- Programmer Shield
- Internet Button
- Photon Kit
- Particle Maker Kit

{{#if photon}}
## Avoid Factory Reset

It’s best to avoid doing a Factory Reset on your Photon. Here’s an in-depth explanation and some ways to avoid it
[link here](https://community.particle.io/t/avoid-factory-reset-what-do-do-with-unexpected-led-behavior-on-a-photon/13358).
{{/if}}

## Common Questions

**Where can I get more firmware information, like a guide?**
Most of our firmware solutions are now explained in depth, located in our new and improved {{#if photon}}[Photon Guide](/guide/getting-started/intro/photon){{/if}}{{#if core}}[Core Guide](/guide/getting-started/intro/core){{/if}}.

**Do Particle devices play well with IFTTT?**
Yes, and that *how-to* is located in our [IFTTT features section](/guide/tools-and-features/ifttt).

**Do you have Webhooks and JS-Plugins?**
Yes, you can find more information on both of these at [Webhooks features section](/guide/tools-and-features/webhooks).

**I am hosting a Hackathon/Program that includes Particle - do you have any suggestions?**
Yup! [Here are our best practices](/guide/tools-and-features/hackathon) about setting devices up for a Hackathon.

Feel free to contact [hello @ particle dot com] with **subject line: *"Sponsorship Inquiry for Particle"* **for any additional information about this. Please include as many details about your event and what sort of participation you’re interested in from Particle and allow a week for response.



{{#if core}}
## Troubleshoot LED Color on the Core

Here is a [comprehensive community guide](https://community.particle.io/t/spark-core-troubleshooting-guide-spark-team/696) on this issue.
{{/if}}

## Installing Particle CLI

For [installation instructions](https://github.com/spark/particle-cli) and to stay up-to-date on the most recent revisions of our Particle-cli, follow our repo
[Particle CLI Repo](https://github.com/spark/particle-cli).


## {{#if photon}}Photon{{/if}} {{#if core}}Core{{/if}} Pinout Map & Datasheets

{{#if photon}}
Go to our Photon datasheets [collection](/datasheets/photon-datasheet/) to get an in-depth view of the Photon pinouts.
{{/if}}

{{#if core}}
Go to our Core datasheets [collection](/datasheets/core-datasheet/) to get an in-depth view of the Core's pinouts.
{{/if}}
