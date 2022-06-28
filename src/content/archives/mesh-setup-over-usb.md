---
title: Mesh Setup over USB
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## Mesh Setup over USB

### Mesh networking is [no longer supported](/reference/discontinued/mesh/). The instructions below will no longer work to create a mesh network and cannot be used.

Normally, mesh networks are set up using the mobile apps for iOS and Android. Alternatively, you can set up a gateway and mesh nodes using a computer and the devices connected by USB using the process described here.

### Gateway Setup

The first step is to configure your gateway device. This is your connection to the Internet and it is required. It's not possible to set up a completely standalone network at this time.

It is possible for the mesh network to operate disconnected from the Internet, however you won't be able to Particle.publish or Particle.subscribe, use Particle functions, variables, or OTA code flash, of course. You will need to reconnect to the Internet to add nodes (Xenon) to your network, as well.

Your gateway can be:

* Argon (Wi-Fi)
* Boron (Cellular)
* Xenon with an Ethernet FeatherWing (Ethernet)

#### Argon Gateway Setup

* You must have the [Particle CLI](/tutorials/developer-tools/cli/) (version 1.47.0 or newer) installed. Use `particle update-cli` to upgrade if necessary.
* Attach the Wi-Fi antenna to your Argon. Make sure you connect it to the correct connector, there are three U.FL connectors: WiFi, BT, and NFC.
* Remove the Argon from the anti-static foam before powering the device.
* Plug the Argon into a USB port on your computer. It should begin blinking blue.
* Download from the [Argon NCP release site](https://github.com/particle-iot/argon-ncp-firmware/releases/tag/v0.0.5):  
   * [argon-ncp-firmware-0.0.5-ota.bin](https://github.com/particle-iot/argon-ncp-firmware/releases/download/v0.0.5/argon-ncp-firmware-0.0.5-ota.bin)
* Put the Argon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Update the device. If the device goes out of blinking yellow after the first command, put it back into DFU mode.

```html
particle update
particle flash --usb tinker

```

* When the command reports **Flash success!**, reset the Argon. It should go back into listening mode (blinking dark blue).
* Verify that the update worked:

```html
particle serial identify

Your device id is e00fce681ffffffffc08949b
Your system firmware version is 1.2.1

```

* Save the device ID, you'll need it later.
* Flash the NCP firmware. Note that this must be done in listening mode (blinking dark blue). It cannot be done in DFU mode!

```html
particle flash --serial argon-ncp-firmware-0.0.5-ota.bin

```

* The status LED will turn solid magenta (red and blue at the same time) for a minute during the upgrade. It may also turn off for a while, and blink for a while. This is normal. When complete the Argon will go back into listening mode (blinking blue).
* Set your Wi-Fi credentials. This must be done in listening mode.

```html
particle serial wifi

```

* After setting, you Argon should go through the normal sequence of blinking green, blinking cyan (light blue), fast blinking cyan, and breathing cyan.
* Claim the device to your account. This can only be done if it's breathing cyan. Replace `e00fce681ffffffffc08949b` with the device ID you got earlier from particle serial identify.

```html
particle device add e00fce681ffffffffc08949b

```

* Rename the device (optional):

```html
particle device rename e00fce681ffffffffc08949b argon3

```

* You now have a working standalone Argon! You can stop here if you don't want to use it on a mesh network.
* Create a new mesh network. You'll need the device ID of the gateway, the name for your new network, and you'll assign a new password to your mesh network:

```html
particle mesh create MeshTest3 e00fce681ffffffffc08949b
? Enter a password for the new network [hidden]
? Confirm the password [hidden]
Done! The device will be registered in the network once it is connected to the cloud.

```

* The Argon should go into listening mode for a while, then eventually go back into breathing cyan.
* You now have a mesh network! Now you can add nodes to it using the Xenon (mesh node) instructions below.

#### Boron Gateway Setup

* You must have the [Particle CLI](/tutorials/developer-tools/cli/) (version 1.47.0 or newer) installed. Use `particle update-cli` to upgrade if necessary.
* Attach the cellular antenna to your Boron. Make sure you connect it to the correct connector, there are three U.FL connectors: cellular (on the top), BT and NFC (on the bottom).
* Remove the Boron from the anti-static foam before powering the device.
* Plug the Boron into a USB port on your computer. It should begin blinking blue. For a Boron LTE, you can power only by USB, but for a Boron 2G/3G you should also attach the LiPo battery.
* Put the Boron in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Update the device. If the device goes out of blinking yellow after the first command, put it back into DFU mode.

```html
particle update
particle flash --usb tinker

```

* When the command reports **Flash success!**, reset the Boron. It should go back into listening mode (blinking dark blue).
* Verify that the update worked:

```html
particle serial identify

Your device id is e00fce68fffffffb22d4e61b
Your IMEI is 352999999084606
Your ICCID is 89014103111111117667
Your system firmware version is 1.2.1

```

* Save the device ID and ICCID, you'll need them later. If you get a serial timed out error, just try the command again.
* If you are using the Particle SIM card built into your Boron, Copy the ICCID and go to: <https://setup.particle.io>. Click on the link to **Activate a Particle SIM** under the pictures. Enter the ICCID and proceed through the activation steps.
* If you want to use a 3rd-party SIM with the Boron, follow [the instructions here](/support/particle-devices-faq/electron-3rdparty-sims) for setting up a Boron with 3rd-party SIM card.
* Once you've activated your SIM, exit listening mode:

```html
particle usb stop-listening

```

* The Boron should go through the normal sequence of blinking green, blinking cyan (light blue), fast blinking cyan, and breathing cyan.
* Claim the device to your account. This can only be done if it's breathing cyan. Replace `e00fce68fffffffb22d4e61b` with the device ID you got earlier from particle serial identify.

```html
particle device add e00fce68fffffffb22d4e61b

```

* Rename the device (optional):

```html
particle device rename e00fce68fffffffb22d4e61b boron4

```

* You now have a working standalone Boron! You can stop here if you don't want to use it on a mesh network. However you will need to [set the setup done](#marking-setup-done) flag, below.
* Create a new mesh network. You'll need the device ID of the gateway, the name for your new network, and you'll assign a new password to your mesh network:

```html
particle mesh create MeshTest4 e00fce68fffffffb22d4e61b
? Enter a password for the new network [hidden]
? Confirm the password [hidden]
Done! The device will be registered in the network once it is connected to the cloud.

```

* The Boron should go into listening mode for a while, then eventually go back into breathing cyan.
* You now have a mesh network! Now you can add nodes to it using the Xenon (mesh node) instructions below.

#### Xenon with Ethernet Gateway Setup

* Remove the Xenon from the anti-static foam before powering the device.
* Plug the Xenon into a USB port on your computer. It should begin blinking blue.
* Put the Xenon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Update the device. If the device goes out of blinking yellow after the first command, put it back into DFU mode.

```html
particle update
particle flash --usb tinker

```

* When the command reports **Flash success!**, reset the Xenon. It should go back into listening mode (blinking dark blue).
* Verify that the update worked:

```html
particle serial identify
Your device id is e00fce6ffffffff401c00f23
Your system firmware version is 1.2.1

```

* Save the device ID, you'll need it later.
* Enable Ethernet detection by building and flashing this firmware. You only need to do this once, as the setting is saved in configuration flash. It's normally set by the mobile app when you use the Enable Ethernet checkbox.
* Save this code to a file, say EthernetEnable.cpp

```cpp
#include "Particle.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {

	// System.disableFeature(FEATURE_ETHERNET_DETECTION);
	System.enableFeature(FEATURE_ETHERNET_DETECTION);

	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}

```

* Compile it:

```html
particle compile xenon EthernetEnable.cpp --saveTo EthernetEnable.bin 

```

* Put the Xenon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Flash the EthernetEnable.bin file to the Xenon:

```html
particle flash --usb EthernetEnable.bin

```

* After the Xenon reboots, the blue D7 LED will come on.
* Put the Xenon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Flash the Tinker to the Xenon:

```html
particle flash --usb tinker

```

* Continue from here if you already have enabled Ethernet.
* Unplug the USB from the Xenon, then plug it into the Ethernet FeatherWing. Attach the Ethernet cable. Then reconnect the USB to your computer.
* The Xenon should go through the normal sequence of blinking green, blinking cyan (light blue), fast blinking cyan, and breathing cyan.
* Claim the device to your account. This can only be done if it's breathing cyan. Replace `e00fce6ffffffff401c00f23` with the device ID you got earlier from particle serial identify.

```html
particle device add e00fce6ffffffff401c00f23

```

* Rename the device (optional):

```html
particle device rename e00fce6ffffffff401c00f23 xenon50

```

* You now have a working standalone Xenon with Ethernet! You can stop here if you don't want to use it on a mesh network. However you may need to [set the setup done](#marking-setup-done) flag, below.
* Create a new mesh network. You'll need the device ID of the gateway, the name for your new network, and you'll assign a new password to your mesh network:

```html
particle mesh create MeshTest5 e00fce68ffffffc03c6db46a
? Enter a password for the new network [hidden]
? Confirm the password [hidden]
Done! The device will be registered in the network once it is connected to the cloud.

```

* The Xenon should go into listening mode for a while, then eventually go back into breathing cyan.
* You now have a mesh network! Now you can add nodes to it using the Xenon (mesh node) instructions below.

### Xenon (mesh node) Setup

* Remove the Xenon from the anti-static foam before powering the device.
* Plug the Xenon into a USB port on your computer. It should begin blinking blue.
* Put the Xenon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.
* Update the device. If the device goes out of blinking yellow after the first command, put it back into DFU mode.

```html
particle update
particle flash --usb tinker

```

* When the command reports **Flash success!**, reset the Xenon. It should go back into listening mode (blinking dark blue).
* Verify that the update worked:

```html
particle serial identify
Your device id is e00fce68ffffffc03c6db46a
Your system firmware version is 0.2.1

```

* Save the device ID, you'll need it later.
* Join the Xenon to your mesh network. You'll need the password for the network you assigned when you set up your mesh gateway. In this example, we're connecting to the argon3 gateway we set up, above.

```html
particle mesh add e00fce68ffffffc03c6db46a argon3

```

* The first parameter is the device ID of the Xenon
* The second parameter is the name of the assisting device, typically the gateway (Argon, Boron, or Xenon with Ethernet FeatherWing).
* Name your Xenon (optional):

```html
particle device rename e00fce68ffffffc03c6db46a xenon31

```

* Get a list of the devices on your mesh network.

```html
particle mesh list
meshtest3
  devices:
    argon3 [e00fce681ffffffffc08949b] (Argon)
    xenon31 [e00fce68ffffffc03c6db46a] (Xenon)

```

* Repeat to add more Xenons.

### Handy tips

#### Marking setup done

Normally when you complete the mobile phone-based setup, the setup is marked as done. In the absence of this, every time you boot your Argon or Boron gateway, it will go back into listening mode (blinking dark blue).

For standalone Xenon device (using BLE, for example), you do not need to mark setup done, but make sure you've update the bootloader and use SYSTEM\_MODE(MANUAL) to prevent connecting to the cloud. Without a cloud connection you won't be able to get software updates OTA, so you must manually upgrade your Device OS and bootloader over USB for standalone Xenon devices.

##### Marking setup done using the Particle CLI 

The Particle CLI can set the setup done flag for an Argon or Boron connected by USB using the command:

particle usb setup-done

You can optionally specify the name or device ID of a device if there is more than one connected by USB.

##### Marking setup done from code

You can set the flag from code by flashing this firmware to your device:

```cpp
#include "Particle.h"

#include "dct.h"

SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
	// 0x01 = setup done
	// 0xff = setup not done (go into listening mode at boot)
	const uint8_t val = 0x01;
	dct_write_app_data(&val, DCT_SETUP_DONE_OFFSET, 1);

	// This is just so you know the operation is complete
	pinMode(D7, OUTPUT);
	digitalWrite(D7, HIGH);
}

void loop() {
}


```

You only need to do this once, as the setting is stored in configuration flash.

##### Marking setup done from dfu-util

You can set the setup done flag using dfu-util. Put the device in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow.

Argon:

```html
echo -n -e \\x01 > dummy.bin
dfu-util -d 2b04:d00c -a 1 -s 8134:leave -D dummy.bin

```

Boron:

```html
echo -n -e \\x01 > dummy.bin
dfu-util -d 2b04:d00d -a 1 -s 8134:leave -D dummy.bin

```

You only need to do this once, as the setting is stored in configuration flash, unless you clear credentials (fast blinking dark blue), then you need to do it again.

It not necessary to mark setup done on a standalone Xenon. If you go into blinking blue at boot on a standalone Xenon, you may need to update the bootloader. The `particle update` command should do this for you, but if you are loading a specific version of device OS from the release site (like a new Device OS release candidate), you will also need to manually update the bootloader. For example, if you loaded system 1.4.1-rc.1, you'd also need to update the bootloader:

```
particle flash --serial xenon-bootloader@1.4.1-rc.1.bin

```
