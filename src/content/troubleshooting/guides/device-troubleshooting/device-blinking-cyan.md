---
title: Device Blinking Cyan
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Most devices that find themselves stuck Blinking Cyan (light blue) are experiencing a keys issue. Read on for a detailed examination of this issue as well as steps you can take to resolve. If these steps do not work for you, or if a large number of devices in your fleet are Blinking Cyan all at once, please open a support ticket.

## How to identify a device keys issue

Device Keys issues can manifest in a few different forms, but they tend to follow the same profile:

1) The device is able to proceed beyond the “blinking green” phase (i.e. it’s able to connect to the internet via Cellular or Wifi).  
2) The device enters the rapid-cyan blink phase but is unable to proceed further - it will blink Red once or Orange three times. This signals an inability to connect to the Cloud.   
  
Your device most likely needs new device keys! Skip ahead to the resolution below (How to Change Your Key), or read on for a bit more information!
  
## About device keys

Particle devices authenticate with the Particle cloud using public key cryptography. Each side (device and Cloud) has a public key and a private key. Public keys are public information. The Particle cloud knows every device's public key and a device’s public key can be shared even over insecure channels. You can share it with everyone! The device has its own private key, however, that is stored deep within its memory. 

Particle handles the Cloud keys the same way - all Particle devices know the Cloud public key. It's publicly available on our web site and in the Particle CLI source code. The cloud public key is not a secret. However, like each Particle device, the Cloud also retains its own, secret, private key.

When a device handshakes with the Cloud, it combines its device private key with the Cloud public key to encrypt its transmission. The Cloud is able to decrypt this because it knows the Cloud private key and the device public key. The Cloud then encrypts its transmission back to the device using the Cloud private key together with the device public key. That data can only be decrypted by the specific device targeted by the Cloud in this interaction; decrypting it requires both Cloud public key and the device private key, and only the device knows the device private key. 

This process assures that the Cloud is who it says it is, not a rogue Cloud, because only the real Cloud knows its private key. And the Cloud knows the device is authentic, because only the device knows its private key.

A third-party snooping on the process can’t access the information exchange because both sets of private keys never leave their respective sides. A man-in-the-middle can't hijack or spoof either side because they don’t have access to these private keys! 

This process requires a lot of computation, so we only use this process to authenticate both sides and then set up a session key. This session key encrypt the data for the rest of the connection using a faster and more efficient symmetric encryption protocol like AES. 

## Issue breakdown

Devices store their private device key in their configuration flash memory - and only there! So… what happens if this part of flash memory is erased or corrupted?

The device \*will\* generate a new private and public device key. (They have to be generated in pairs because they're cryptographically connected). However, when the device attempts to connect to the Cloud using this new keyset, it will fail. Why? The public key stored on the Cloud won’t match the public key provided by the device. The Cloud will assume foul play and will terminate the connection. In order to bring the device back online, you need a fresh set of device keys. The easiest way to do this is to simply “change your key” (see below). You can create a backup of this key for future usage if needed. While you cannot solve this problem remotely, it is possible to use your firmware to actively maintain your device keys to prevent against further instances of this issue. For one example, see the [Device Key Helper Library](https://github.com/rickkas7/DeviceKeyHelperRK) (n.b. - this library is marked as “Early Development” so it should be thoroughly tested in the instance of bugs). 

## How to backup/save your key

1. Place your into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.
2. Run the `particle keys save mykey.der` command. This will backup the key on your to the Home folder on your computer. You can substitute your own naming convention for the \*.der file if you wish.

## How to restore/load your key

1. Place your into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.
2. Run the `particle keys load mykey.der` command. This will restore the key you saved previously to your Home directory to your . The file may not necessarily be named mykey.der, substitute whatever you backed it up as previously with the `particle keys save` command.

## How to change your key

If you have physical access to the in question, here's how to change the Key on it. Once you do that you can share the Public key with us and we'll get you up and running again on that . You may not even need to share the key with us if it your connects to the Cloud after following this procedure.

1. Before we can start, you're going to want to install the Particle CLI tool to make life easier: [Particle CLI.](/getting-started/developer-tools/cli/)
2. Once the CLI tool is installed, the first thing you should do is log in to your Particle account. To login on the Particle CLI, run the command `particle login` and follow the prompts for email and password.
3. Next we need to get the Device ID of your device. Start by putting the device into Listening Mode by holding the Mode button for about 3 seconds until it starts blinking BLUE.
4. Next run the following CLI command to get the ID of your device: `particle identify`. It should reply "Your device id is: xxxxxxxxxxxxxxxxxx". Copy the number down or to your clipboard for later.
5. View the key commands and example output here for the next steps: [particle keys doctor.](/reference/developer-tools/cli/#particle-keys-doctor)
6. Place your into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.
7. It's a good idea to run the `particle keys server` command in case your server keys or address are corrupted.
8. Run the `particle keys doctor xxxxx` command, where xxxxx is the device ID you copied just earlier. This will generate a new public/private key pair and automatically download it to your device, and also send the public key up to the Cloud.
