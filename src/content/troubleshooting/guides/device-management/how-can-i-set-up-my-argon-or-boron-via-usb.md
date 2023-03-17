---
title: How Can I Set Up My Argon Or Boron Via USB?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Many users set up their Argons and Borons by using the mobile apps for iOS and Android. However, it is quite simple to set up these devices over USB using the process described here.

## Argon Setup

1. You must have the [Particle CLI](/getting-started/developer-tools/cli/) (version 1.47.0 or newer) installed. Use `particle update-cli` to upgrade if necessary.
2. Open up your computer's Terminal (Mac) or Command Line (Windows).
3. Download the following from the [Argon NCP release site](https://github.com/particle-iot/argon-ncp-firmware/releases/tag/v0.0.5): [argon-ncp-firmware-0.0.5-ota.bin](https://github.com/particle-iot/argon-ncp-firmware/releases/download/v0.0.5/argon-ncp-firmware-0.0.5-ota.bin) and save it within an accessible directory. Use `cd` in your Terminal to navigate to the directory that contains this file.
4. Attach the Wi-Fi antenna to your Argon. Make sure you connect it to the correct connector, there are three U.FL connectors: WiFi, BT, and NFC.
5. Remove the Argon from the anti-static foam before powering the device.
6. Plug the Argon into a USB port on your computer. It should begin blinking blue.
7. Put the Argon in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow. Once you've updated your device (below), you can just run the following command in the Particle CLI to bring your device into DFU mode:  
particle usb dfu
8. Update the device by running the following two commands. If the device goes out of blinking yellow after the first command, put it back into DFU mode.  
particle update  
particle flash --usb tinker
9. When the command reports **Flash success!**, reset the Argon. It should go back into listening mode (blinking dark blue).
10. Flash NCP firmware to the device. Note that this must be done in listening mode (blinking dark blue). It cannot be done in DFU mode:  
particle flash --serial argon-ncp-firmware-0.0.5-ota.bin
11. Verify that the updates worked by running the following command:  
particle serial identify  
which should return something like this:  
Your device id is e00fce681fffffffffc08949b  
Your system firmware version is 1.5.0
12. Save the device ID, you'll need it later.
13. Set your Wi-Fi credentials. This must be done in listening mode.  
particle serial wifi
14. After setting, you Argon should go through the normal sequence of blinking green, blinking cyan (light blue), fast blinking cyan, and breathing cyan.
15. Claim the device to your account. This can only be done if it's breathing cyan. Replace `e00fce681ffffffffc08949b` with the device ID you got earlier from particle serial identify.  
particle device add e00fce681fffffffffc08949b
16. Rename the device (optional):  
particle device rename e00fce681fffffffffc08949b argon-3b
17. Ensure that your setup flag is marked as done:  
particle usb setup-done
18. You have successfully set up your Argon!

## Boron Setup

1. You must have the [Particle CLI](/getting-started/developer-tools/cli/) (version 1.47.0 or newer) installed. Use `particle update-cli` to upgrade if necessary.
2. Attach the cellular antenna to your Boron. Make sure you connect it to the correct connector, there are three U.FL connectors: cellular (on the top), BT and NFC (on the bottom).
3. Remove the Boron from the anti-static foam before powering the device.
4. Plug the Boron into a USB port on your computer. It should begin blinking blue. For a Boron LTE, just USB power alone should be sufficient, but for a Boron 2G/3G you should also attach the LiPo battery.
5. Open up your computer's Terminal (Mac) or Command Line (Windows).
6. Put the Boron in DFU mode (blinking yellow) by holding down MODE. Tap RESET and continue to hold down MODE. The status LED will blink magenta (red and blue at the same time), then yellow. Release when it is blinking yellow. Once you've updated your device (below), you can just run the following command in the Particle CLI to bring your device into DFU mode:  
particle usb dfu
7. Update the device. If the device goes out of blinking yellow after the first command, put it back into DFU mode.  
particle update  
particle flash --usb tinker
8. When the command reports **Flash success!**, reset the Boron. It should go back into listening mode (blinking dark blue).
9. Verify that the update worked by running the following command:  
particle serial identify  
which should return something like this:  
Your device id is e00fce681fffffffffc08949b  
Your IMEI is 352999999084606  
Your ICCID is 8901413111111117667  
Your system firmware version is 1.5.0
10. Save the device ID and ICCID, you'll need them later. If you get a serial timed out error, just try the command again.
11. If you are using the Particle SIM card built into your Boron, Copy the ICCID and go to: [https://setup.particle.io](https://setup.particle.io/). Click on the link to **Activate a Particle SIM** under the pictures. Enter the ICCID and proceed through the activation steps.  
    
If you want to use a 3rd-party SIM with the Boron, follow [the instructions here](/troubleshooting/guides/connectivity-troubleshooting/using-3rd-party-sim-cards/) for setting up a Boron with 3rd-party SIM card.
12. Once you've activated your SIM, exit listening mode:  
particle usb stop-listening
13. The Boron should go through the normal sequence of blinking green, blinking cyan (light blue), fast blinking cyan, and breathing cyan.
14. Claim the device to your account. This can only be done if it's breathing cyan. Replace `e00fce681ffffffffc08949b` with the device ID you got earlier from particle serial identify.  
particle device add e00fce681fffffffffc08949b
15. Rename the device (optional):  
particle device rename e00fce681fffffffffc08949b argon-3b
16. Ensure that your setup flag is marked as done:  
particle usb setup-done
17. You have successfully set up your Boron!

## Marking setup done

Normally when you complete the mobile phone-based setup, the setup is marked as done. In the absence of this, every time you boot your Argon or Boron, it will go back into listening mode (blinking dark blue).

#### Marking setup done using the Particle CLI 

The Particle CLI can set the setup done flag for an Argon or Boron connected by USB using the command:

```
particle usb setup-done
```

You can optionally specify the name or device ID of a device if there is more than one connected by USB.

**With Device OS 4.0 and later, there is no setup done flag and this CLI command does not do anything.**

