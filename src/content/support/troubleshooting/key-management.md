---
title: Device Keys
layout: support.hbs
columns: two
devices: [ photon,electron,core,raspberry-pi ]
order: 7
---

Device Key Management
===

An easy step-by-step walkthrough of Particle CLI commands to BACKUP, RESTORE and CHANGE Keys.

[particle keys doctor]](/reference/cli/#particle-keys-doctor)

{{#if core}}
You may need to use this guide if you suffer from: "My Core is flashing yellow/red (orange) lights after it connects to Wi-Fi (Decryption Error)"

More detailed info:
https://community.particle.io/t/troubleshooting-my-core-is-flashing-yellow-red-lights-after-it-connects-to-wifi/627
{{/if}}

### How to Backup/Save your Key:

1. Place your {{device}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2. Run the ``particle keys save mykey.der`` command. This will backup the key on your {{device}} to the Home folder on your computer.  You can substitute your own naming convention for the *.der file if you wish.

### How to Restore/Load your Key:

1. Place your {{device}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

2. Run the ``particle keys load mykey.der`` command. This will restore the key you saved previously to your Home directory to your {{device}}.  The file may not necessarily be named mykey.der, substitute whatever you backed it up as previously with the ``particle keys save`` command.

### How to Change your Key:

If you have physical access to the {{device}} in question, here's how to change the Key on it. Once you do that you can share the Public key with us and we'll get you up and running again on that {{device}}.  You may not even need to share the key with us if it your {{device}} connects to the Cloud after following this procedure.

Bare with me for these next steps! This is slightly complicated because of the great security implemented on the {{device}}.

1. Before we can start, you're going to want to install the Particle CLI tool to make life easier! [Particle CLI](/guide/tools-and-features/cli)

2. Once the CLI tool is installed the first thing you should do is login to your Particle account.  If you do not have an account yet, please set one up at https://build.particle.io/build .

3. To login on the Particle CLI, run the command `particle login` and follow the prompts for email and password.

4. Next we need to get the Device ID of your {{device}}. Start by putting the {{device}} into Listening Mode by resetting it, and then holding the Mode button for about 3 seconds until it starts blinking BLUE.

5. Next run the following command to get the ID of your {{device}}: ``particle serial identify``. It should reply "Your device id is: xxxxxxxxxxxxxxxxxx". Copy the number down or to your clipboard for later.

6. View the key commands and example output here for the next steps: [particle keys doctor](/reference/cli/#particle-keys-doctor)

7. Place your {{device}} into DFU mode by holding Mode and tapping Reset, then continue holding Mode for about 3 seconds until the LED starts flashing Yellow.

8. Run the ``particle keys doctor xxxxx`` command, where xxxxx is the device ID you copied just earlier. This will generate a new public/private key pair and automatically download it to your device, and also send the public key up to the Cloud.

9. If ``particle keys doctor`` fails to send the keys to the cloud please contact [Particle support](https://support.particle.io).

Congrats, you made it to the end! now your {{device}} should be connected to the Cloud... or will be just as soon as we add your Key to the server.

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
