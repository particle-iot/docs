---
title: Status LED and Device Modes
layout: reference.hbs
columns: two
devices: [ photon,electron,core ]
order: 9
---

## Standard Modes
These modes are the typical behaviors you will see from your {{device}} on a regular basis. They are the light patterns of a healthy {{device}}.

Here's the typical pattern of {{a-device}} after power up.

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

When it is breathing cyan, your {{device}} is happily connected to the Internet. When it is in this mode, you can call functions and flash code.


### OTA Firmware Update

{{device-animation device "blink" "magenta" }}

If your {{device}} is blinking magenta (red and blue at the same time), it is currently loading an app or updating its firmware. This state is triggered by a firmware update or by flashing code from the Web IDE or Desktop IDE. You might see this mode when you connect your {{device}} to the cloud for the first time.

Note that, if you enter this mode by holding `{{system-button}}` on boot, blinking magenta indicates that letting go of the `{{system-button}}` button will enter safe mode to connect to the cloud and not run application firmware.

### Looking For Internet

{{device-animation device "blink" "lime" }}

{{#if has-wifi}}
If your {{device}} is blinking green, it is trying to connect to Wi-Fi.

If you are unable to get past blinking green, here are a few known working situations that the {{device}} is not compatible with:

{{#if photon}}
- If you are using a corporate or school network that uses WPA2 Enterprise, you will need to follow [special setup instructions](/faq/particle-devices/wpa2-enterprise/photon/). If you require both a username and a password, or see a mention of 802.1(x), or RADIUS you're using WPA2 Enterprise.
{{/if}} 
{{#if core}}
- If you are using a corporate or school network that uses WPA2 Enterprise, you cannot use a {{device}}. If you require both a username and a password, or see a mention of 802.1(x), or RADIUS you're using WPA2 Enterprise.
{{/if}}

- If you are using a network that takes you to a web page where you need to either sign in or agree to terms and service when you first connect, using the {{device}} directly will be difficult or impossible. This is the case in some hotels and public Wi-Fi networks and is often referred to as Captive Portal.

- If your Wi-Fi network uses 5 GHz only, instead of the more common 2.4 GHz, the {{device}} cannot be used. The Wi-Fi radio is only compatible with 2.4 GHz networks.

{{#unless core}}
For home users:

- If your router uses WEP encryption, you should upgrade your router to something more secure. However it may be possible to connect your {{device}} with some difficulty by following the [WEP configuration instructions](http://rickkas7.github.io/wep/).
{{/unless}}

And the less common situations:

- If you get fast blinking green, especially in classroom and hack-a-thon type situations, it is possible that your network has run out of DHCP IP addresses.

- If your Wi-Fi network does not support DHCP, and only uses static IP addresses, it is possible, though somewhat difficult, to set up a {{device}}. You will need to flash a program by USB to set the IP address.

{{#unless core}}
- If the Wi-Fi network restricts access to known device Ethernet MAC addresses, you'll need to determine the MAC address and give it to the network administrator. Put the {{device}} in listening mode (blinking dark blue) by holding down the {{system-button}} button, then use the Particle CLI command `particle serial mac`.
{{/unless}}

{{/if}}

{{#if has-cellular}}
If your {{device}} is blinking green, it is trying to connect to cellular.

- Make sure you have activated your SIM card at [https://setup.particle.io](https://setup.particle.io).
- It may take several minutes or sometimes longer for a SIM card to be activated across all mobile networks.

Some other causes of never-ending blinking green include:

- If you have deactivated your SIM card.
- If you have hit the data limit on your SIM card.
- If there are no cellular signal available at your location.
- The antenna connection is loose.
- You are using a 2G {{device}} in an location that no longer has 2G service (Australia, Japan, Korea, Singapore, and other locations).
- You are using a 3G {{device}} for different region. For example, using a U260 Americas model in Europe.
{{/if}}


### Connecting to the Cloud

{{device-animation device "blink" "cyan" }}

When the {{device}} is in the process of connecting to the cloud, it will rapidly blink cyan. You often see this mode when you first connect your {{device}} to a network, after it has just blinked green.

### Listening Mode

{{device-animation device "blink" "blue" 300 300 }}

{{#if electron}}
The most common cause of blinking dark blue on a {{device}} is a loose SIM card.

- Unplug the USB power and battery from the {{device}}. If it's installed in a breadboard, carefully remove it. Be sure to lift it from both sides; if you pull up from one side only you can bend the pins on the other side.

- Flip the {{device}} over and remove the SIM card. Gently push down on the metal band to make sure it's tight. In rare cases you may want to use a pin to lift up the tiny metal prongs on the {{device}}, but this is not typically necessary. 

- Put the SIM card back in. The metal contacts on the card face the {{device}}, and the cut corner goes on the inside. Make sure it's pushed all the way in.
{{/if}}

{{#if has-wifi}}
When your {{device}} is in Listening Mode, it is waiting for your input to connect to {{#if electron}}a cellular tower{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}}. Your {{device}} needs to be in Listening Mode in order to begin connecting with the Mobile App or over USB.

{{#if photon}}
{{vine "https://vine.co/v/eZUHUIjq7pO/embed/simple"}}
{{/if}}

{{#unless core}}
To put your {{device}} in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.
{{/unless}}

{{#if core}}
{{vine "https://vine.co/v/eZUgHYYrYgl/embed/simple"}}

To put your {{device}} in Listening Mode, hold the `{{system-button}}` button for three seconds, until the RGB LED begins blinking blue.
{{/if}}

{{/if}}


{{#if has-cellular}}
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

Tapping the `{{system-button}}` button on your {{device}} will blink out the bars of signal strength. More blinks indicate a stronger signal.

{{/if}}

{{#if electron}}
### Soft power off

{{device-animation device "pattern"
  "breathe cyan 2 times"
  "on white 2000ms"
  "off 4000ms"
}}

Tapping the `{{system-button}}` button twice on your {{device}} enter soft power off mode. It is the lowest power consumption mode. 

{{/if}}


{{#if photon}}

### Wi-Fi Network Reset

{{vine "https://vine.co/v/eZUwtJljYnK/embed/simple"}}

To erase the stored Wi-Fi networks on your {{device}}, hold the `{{system-button}}` button blinks dark blue, the continue to hold it down for about ten seconds longer, until the RGB LED blinks blue rapidly, then release.

{{/if}}

{{#if core}}

### Wi-Fi Network Reset

{{vine "https://vine.co/v/eZU6expA5bA/embed/simple"}}

To erase the stored Wi-Fi networks on your {{device}}, hold the `{{system-button}}` button for about ten seconds, until the RGB LED blinks blue rapidly.

{{/if}}


{{#if has-cellular}}
### Cellular Off
{{/if}}
{{#if has-wifi}}
### Wi-Fi Off
{{/if}}

{{device-animation device "breathe" "white" }}

If your {{device}} is breathing white, the {{network-type}} module is off. You might see this mode if:

- You have set your module to `MANUAL` or `SEMI_AUTOMATIC` in your user firmware
- You have called {{#if electron}}`Cellular.off()`{{/if}}{{#if photon}}`WiFi.off()`{{/if}}{{#if core}}`WiFi.off()`{{/if}} in your user firmware



### Safe Mode

{{device-animation device "breathe" "magenta" }}

Safe mode, breathing magenta (red and blue at the same time), connects the {{device}} to the cloud, but does not run any application firmware. This mode is one of the most useful for
development or for troubleshooting. If something goes wrong with the app
you loaded onto your device, you can set your device to Safe Mode. This
runs the Device OS but doesn't execute any application code, which can be useful if the application code contains bugs that stop the device from connecting to the cloud.

**The {{device}} indicates that it is in Safe Mode with the LED breathing magenta.**

To put your device in Safe Mode:

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start blinking magenta
6. Release the `{{system-button}}` button

Before entering safe mode, the {{device}} will proceed through the normal steps of connecting to the cloud; blinking green, blinking cyan, and fast blinking cyan. If you're unable to connect to the cloud, you won't be able to enter safe mode.

The device will itself automatically enter safe mode if there is no application code flashed to the device or when the application is not valid.

{{#if photon}}
{{vine "https://vine.co/v/eZUF2ilvLxJ/embed/simple"}}
{{/if}}


### DFU Mode (Device Firmware Upgrade)

{{device-animation device "blink" "yellow" }}

If you wish to program your {{device}} with a custom firmware via USB, you'll need to use this mode. This mode triggers the on-board bootloader that accepts firmware binary files via [dfu-util](/faq/particle-tools/installing-dfu-util/)

Installation tutorial can be found [here.](/guide/tools-and-features/cli/)

And a usage guide [here.](/reference/cli/)

To enter DFU Mode:

{{#unless core}}

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing yellow (it will flash magenta first)
4. Release the `{{system-button}}` button

{{#if photon}}
{{vine "https://vine.co/v/eZUHnhaUD9Y/embed/simple"}}
{{/if}}

{{/unless}}

{{#if core}}

1. Hold down BOTH buttons
2. Release only the `RST` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing yellow
4. Release the `{{system-button}}` button
"
{{vine "https://vine.co/v/eZUgeu0r639/embed/simple"}}

{{/if}}

The {{device}} now is in the DFU mode.

DFU mode requires device drivers under Windows. These should automatically be installed by the Particle CLI installer, but if you think you are having driver issues, there are [additional DFU troubleshooting tips here](/faq/particle-tools/installing-dfu-util).

Some users have reported issues with dfu-util on a USB3 ports (typically the blue ones). Use a USB2 port if the USB3 port doesn't work.

{{#unless core}}

### Firmware Reset

{{#if photon}}
Firmware reset is not available on the {{device}}, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

The [Particle CLI](https://docs.particle.io/guide/tools-and-features/cli) can also restore the default Tinker firmware by entering DFU mode by holding down both the {{reset-button}} and {{system-button}} buttons, releasing {{reset-button}} and continuing to hold down {{system-button}} until it blinks yellow then entering the command:

```
particle flash --usb tinker
```

{{/if}}

{{#if electron}}
_Since 0.6.0_

{{device-animation device "blink" "lime" }}

The Electron can store a backup copy of any desired user firmware in flash memory at address 0x080A0000, separate from user flash memory which is located at 0x08080000.  This backup copy of firmware can be restored to user memory with a button sequence that is only available when the backup copy flash memory contains a valid firmware image.  To program your Electron with a backup copy of user firmware via USB, you'll need to put the Electron in [DFU Mode](/guide/getting-started/modes/#dfu-mode-device-firmware-upgrade-) and run this command: `particle flash --factory user-backup-firmware.bin`

A CLI installation tutorial can be found [here.](/guide/tools-and-features/cli/)

And a usage guide [here.](/reference/cli/)

To enter Firmware Reset Mode:

1. Hold down BOTH buttons
2. Release only the `{{reset-button}}` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start flashing green or white (it will flash magenta, then yellow first)
4. Release the `{{system-button}}` button
{{/if}}

{{/unless}}

### Factory Reset

{{#unless core}}

Factory reset is not available on the {{device}}, but not to worry! If you are experiencing problems with your application firmware, you can use [Safe Mode](#safe-mode) to recover.

{{#if photon}}
You can reset Wi-Fi credentials by performing a [Wi-Fi Network Reset](#wi-fi-network-reset).
{{/if}}

The [Particle CLI](https://docs.particle.io/guide/tools-and-features/cli) can also reset the firmware using:

```
particle device doctor
```

{{/unless}}

{{#if core}}

{{vine "https://vine.co/v/eZU6XdrYbd5/embed/simple"}}

A factory reset restores the firmware on the {{device}} to the default Tinker app and clears all your Wi-Fi credentials.

Procedure:

The procedure is same as the one described above (DFU Mode), but in this case you should continue holding down the `{{system-button}}` button until you see the {{device}} change from blinking yellow to blinking white. Then release the button.  The {{device}} should begin after the factory reset is complete.

1. Hold down BOTH buttons
2. Release only the `RST` button, while holding down the `{{system-button}}` button.
3. Wait for the LED to start blinking yellow (continue to hold the `{{system-button}}` button)
4. The LED will turn solid white (continue to hold the `{{system-button}}` button)
5. Finally, the LED will turn blink white rapidly
6. Release the `{{system-button}}` button


You can reset Wi-Fi credentials by performing a [Wi-Fi Network Reset](#wi-fi-network-reset).
{{/if}}



## Troubleshooting Modes

These modes let you know about more atypical issues your {{device}} might be exhibiting. Use this section to troubleshoot strange colors you might see from your {{device}}.

{{#if electron}}
### Cellular Module Not Connected

{{device-animation device "breathe" "blue" }}

If the Cellular module is on but not connected to a cellular tower, your {{device}} will be breathing blue. Note that this will be dark blue and not cyan.
{{/if}}

{{#if photon}}
### Wi-Fi Module Not Connected

{{device-animation device "breathe" "blue" }}

If the Wi-Fi module is on but not connected to a network, your {{device}} will be breathing blue. Note that this will be dark blue and not cyan.
{{/if}}

{{#if core}}
### Wi-Fi Module Not Connected

{{device-animation device "breathe" "blue" }}

If the Wi-Fi module is on but not connected to a network, your {{device}} will be breathing blue. Note that this will be dark blue and not cyan.
{{/if}}

### Cloud Not Connected

{{device-animation device "breathe" "lime" }}

When your {{device}} is connected to {{network-type}} but not to the cloud, it will be breathing green.

#### I can't flash my {{device}} anymore

Breathing green means that {{network-type}} is on, but you're not connected to the Particle cloud. Because of this, you cannot flash your {{device}} from the cloud. That includes Particle Build (Web IDE), Particle Dev (Atom IDE) and Particle CLI cloud-based flashing commands.
 
Fortunately, you can usually get around this by entering safe mode, breathing magenta.

Hold down {{reset-button}} and {{system-button}}, release {{reset-button}} and continue to hold down {{system-button}} until the {{device}} blinks magenta, then release {{system-button}}. The device will then go through the normal sequence of colors: blinking green, blinking cyan, fast blinking cyan, then breathing magenta. Once breathing magenta, you should be able to OTA flash again.

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

{{#unless core}}
#### Solution 2: Enable SYSTEM_THREAD

The other solution is to use [SYSTEM_THREAD](https://docs.particle.io/reference/firmware/#system-thread) mode.

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
{{/unless}}

{{#if has-wifi}}
#### Side note: Wi-Fi only mode

While all of the causes above were unintentionally causing breathing green, you can also do it on purpose. Using the [SEMI_AUTOMATIC or MANUAL system mode](https://docs.particle.io/reference/firmware/#semi-automatic-mode) and only bringing up Wi-Fi and not the cloud will cause intentional breathing green. You would do this if you're sending data to a local server and not using the cloud at all, for example. 
{{/if}}


### Red Blink Basic Errors

Blinking red indicates various errors.

- 2 red blinks: Could not reach the internet.
- 3 red blinks: Connected to the internet, but could not reach the
Particle Device Cloud.
- Blinking "orange": This sometimes is seen as yellow or red and indicates bad server keys. 
- Alternating cyan and red blinks can also indicate a keys issue.

Most keys related issues can be resolved using the [Particle CLI](https://docs.particle.io/guide/tools-and-features/cli).

Put the {{device}} into Listening mode (blinking blue) by holding down {{system-button}} until it blinks blue. Then issue the CLI command:

```
particle identify
```

Save the Device ID; you’ll need it later.

Then put the {{device}} in DFU mode by holding down both the {{reset-button}} and {{system-button}} buttons, releasing {{reset-button}} and continuing to hold down {{system-button}} until it blinks yellow and issue the commands below, in order.

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

There are additional tips for a [missing openssl error on this page](https://github.com/rickkas7/particle_notes/tree/master/installing-openssl), including tips for Mac OS X and Linux.


### Red Flash SOS

{{device-animation device "sos" }}

Is your {{device}} blinking red? Oh no!

A pattern of more than 10 red blinks is caused by the firmware crashing. The pattern is 3 short blinks, 3 long blinks, 3 short blinks (SOS pattern), followed by a number of blinks that depend on the error, then the SOS pattern again.

{{#if photon}}
[Enter safe mode](#safe-mode), tweak your firmware and try again!
{{/if}}
{{#if electron}}
[Enter safe mode](#safe-mode), tweak your firmware and try again!
{{/if}}
{{#if core}}
[Perform a factory reset](#factory-reset), tweak your firmware and try again!
{{/if}}

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

The two most common ones are:

**Hard Fault (1 blink between 2 SOS patterns)**

{{device-animation device "sos" 1 }}

Some causes of hard fault include:

- Using an invalid pointer.
- Memory corruption caused by freeing memory twice, overwriting the end of a block of memory, etc.
- Making Wire (I2C) calls without calling `Wire.begin()`.

**Out of heap memory (8 blinks between 2 SOS patterns)**

{{device-animation device "sos" 8 }}

If your {{device}} crashes repeatedly with an SOS code, first try recovering with [Safe Mode](/guide/getting-started/modes/#safe-mode) and flashing Tinker with the CLI to see if it was something recently added in your user application.

```
particle flash <mydevice> tinker
```

{{#unless core}}
If it's not possible to enter Safe Mode, your Device OS may be corrupted.  Use the Device Doctor feature of the CLI to put your {{device}} into a healthy state.
 
```
particle device doctor
```
{{/unless}}

Some tips for reducing the memory used by your firmware [can be found here](/faq/particle-devices/code-size-tips).

**Stack overflow (13 blinks between 2 SOS patterns)**

{{device-animation device "sos" 13 }}

Stack overflow occurs when you try to store too much data on the stack. The size is quite limited, and storing large temporary objects on the stack can cause problems.

- Main loop thread: 6144 bytes
- Software timer callbacks: 1024 bytes

### Solid colors


{{#if core}}
Solid colors are rare. There are two expected situations:
- Solid white if you are in the middle of a factory reset.
{{/if}}
{{#unless core}}
Solid colors are rare. There only expected situation is:
{{/unless}}
- Solid magenta if you are loading code in ymodem serial mode.


In most cases, solid colors are the side effect of a bug. If code crashes or infinitely loops with interrupts disabled, it's possible that the LED animation will stop. The color of the LED is the color it last was before failure. So for example, it could be solid cyan if it was previously breathing cyan, or solid red if it was trying to output an SOS pattern.

### No status LED

If you power up your {{device}} and the status LED never comes on and the small blue led next to pin D7 is on dimly, you have a missing or corrupted bootloader.

This can be corrected using a [JTAG/SWD programmer](https://docs.particle.io/faq/particle-tools/jtag/) if you have one. Otherwise, you should [contact support](https://particle.io/support).

