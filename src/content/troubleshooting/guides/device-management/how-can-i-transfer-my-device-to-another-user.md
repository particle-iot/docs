---
title: How Can I Transfer My Device To Another User?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
### First: "Can Particle do this for me?"

Excellent question! **No.**

We take **security** extremely seriously at Particle, and that means being very sensitive to attempts to steal, hack, takeover, or misuse Particle Accounts. As a security feature for all of our customers, we require that requests to add, remove, rename, or reconfigure devices be submitted directly by the users to whom they are registered.

If you really are the owner of your device, and are having trouble logging into your Particle account or configuring your device, send us an email at \[support @ particle dot io\] and our Troubleshooting staff would be happy to help you resolve the issue.

This article is divided into two sections:

* For the current owner: [Removing a Device from its Current Account](/troubleshooting/guides/device-management/how-can-i-transfer-my-device-to-another-user/#removing-a-device-from-its-current-account)
* For the new owner: [Claiming the Device to a New Account](/troubleshooting/guides/device-management/how-can-i-transfer-my-device-to-another-user/#claiming-a-device-to-a-new-account)

## Removing A Device From Its Current Account

In order to transfer a device from one account to another it first needs to be unclaimed by the prior account. You can remove the device from the account it was previously registered to by using the Particle Console, the [Particle Build IDE](https://build.particle.io/build), or the Particle CLI (see instructions below).

### Using the Console

If you are the prior owner of the device, the Console is likely the easiest way to relinquish your claim to the device in order to transfer it to a new, different account. Simply log in to the [Console](https://console.particle.io/devices) and find the device either in your main /devices page or in the /devices endpoint of the Product the device may be connected to. From there, click the "..." on the right-hand side of the device's column and select "Unclaim Device." You're good to go!

**Using Particle Build** (the Web IDE)

1. Login to your Particle account at the [Particle Build IDE](https://build.particle.io/build) home page
2. Click on the "Devices" icon in the bottom left-hand panel
3. Identify the device that you'd like to remove from your account, either by the familiar name you gave it when you added it to your account, or by its device ID.
4. Click on the arrow next to the device you'd like to remove, and click the blue "REMOVE DEVICE" button

### Using the Particle CLI

1. **Install [CLI](/getting-started/developer-tools/cli/).** Make sure you've got the CLI installed by typing  
    
`particle help`  
    
into your terminal. If you're presented with a list of commands, the CLI is installed correctly. If not, please see the following article:  
    
[Installing the Particle CLI ](/getting-started/developer-tools/cli/)
2. **Login.** Make sure you're logged into your Particle account by typing  
    
`particle login`  
    
and successfully completing the command line prompts.
3. **Remove.** In your terminal, type  
    
`particle device remove <name>`  
    
where is either the familiar name or device ID of the you'd like to remove from your account. Here's an example:  
    
`particle device remove 0123456789ABCDEFGHI  
    
`\--or--  
`particle device remove pinky_panda`
4. **Confirm Removal.** Confirm that you _really_ want to remove the from your account by entering "yes" when prompted by the CLI.

## Claiming A Device To A New Account

1. **Connect the device you're trying to claim to your computer.**  
Make sure that the is connected to the Particle Device Cloud (breathing or pulsing cyan).  
    
Note that the device cannot be claimed unless it is connected to the Particle Device Cloud, and is breathing/pulsing cyan.
2. **Claim the device.**  
Claim the device using our [setup page](https://setup.particle.io/), using the Particle smartphone app, the Particle Build IDE, or the Particle CLI.

**That's it!** The device has now been disassociated with a prior account and claimed to a new account.

For more help join our [community forums](http://community.particle.io/) and post in the [troubleshooting section](https://community.particle.io/c/troubleshooting).
