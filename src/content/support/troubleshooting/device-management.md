---
title: Device Ownership
layout: support.hbs
columns: two
devices: [ photon,electron,core ]
order: 3
---

Device Management & Ownership
===

### How do I find my device ID?

There are several ways to **find the device ID of your {{device}}**, but the best method depends on whether or not your {{device}} has already been claimed to your account.  We'll cover both scenarios in the section below.

**Note:** You do not need to know your {{device}} device ID to complete setup using the Particle smartphone app or over USB!  The {{device}} device ID is most useful for debugging with the technical support team and building interactions with your {{device}} through the Particle API.

**1. I haven't claimed my {{device}} yet!**

If you haven't claimed your {{device}} yet, there are two ways for you to figure out your {{device}} device ID:

  1a. **Get your {{device}} ID using the Particle CLI** Make sure that you've got the Particle Command Line Interface (CLI) installed by typing ``particle``
into your terminal.
You should see a help message that displays the various commands available to you.  Please make sure your {{device}} is in [Listening Mode](https://mtc.cdn.vine.co/r/videos/B75AACF6B91015398617940668416_154e6c92f81.4.3.1608668747173494282_V_AMvRCF0NS2Y_i_y0FdDV9ABtESHh9GR_VFKEu8Pn8Q3ZHYx9l32NfspugyWKJh.mp4?versionId=l_G0UVaqFXFSdJVxAeJ3.56M1HhVfO9S) (flashing blue), and type ``particle serial identify``.

Your {{device}} should respond with it's {{device}} device ID!

  1b. **Get your {{device}} device ID using CoolTerm, PuTTY, or screen** CoolTerm and PuTTY are programs for Mac and Windows, respectively, that allow you to communicate with your {{device}} using the exposed serial lines.  You can find the download links for CoolTerm and PuTTY at the links attached--
  [CoolTerm](http://freeware.the-meiers.org/) & [PuTTy](http://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html).

Plug your {{device}} into your computer over USB. When the {{device}} is in Listening Mode (flashing blue), open a serial port over USB using the standard settings, which should be:

- Baud rate: 9600
- Data Bits: 8
- Parity: none
- Stop Bits: 1

Once you've successfully opened a serial connection, you have two commands at your disposal by hitting either w or i on the keyboard. Here's what they do:

- **w:** Set up your Wi-Fi SSID and password
- **i:** ("i" as in identify) Read out the {{device}} device ID

**2. I've already claimed my {{device}}!**

If you've already claimed your {{device}}, finding your {{device}} device ID is a super simple process. You can still use either of the methods described above, but the easiest method is to look up your {{device}} device ID in the Particle Build IDE.

Follow these simple steps:

- Navigate your web browser to the [Particle Build IDE](https://build.particle.io/build).
- Click on the "{{device}}" icon in the bottom of the navigation pane
- Find the {{device}} whose device ID you'd like to know, and click on the dropdown arrow on it's right
- The {{device}} ID will be displayed in a box that reads, "device ID"


Great! Go forth with your **{{device}} device ID** and prosper.


### How do I transfer my {{device}}?

**1. Remove the {{device}}.**

Remove the {{device}} from the account it was previously registered to, using the [Particle Build IDE](https://build.particle.io/build) or Particle CLI.

**2. Connect the {{device}}**

Make sure that the {{device}} is connected to the Particle Cloud (breathing or pulsing cyan).

NOTE: A {{device}} cannot be claimed unless it is connected to the Particle Cloud, and is breathing/pulsing cyan.

**3. Claim the {{device}}**

Claim the {{device}} using the Particle smartphone app, Particle Build IDE, or Particle CLI.

**"Can Particle do this for me?"**

Excellent question! **No.**

We take **security** extremely seriously at Particle, and that means being very sensitive to attempts to steal, hack, takeover, or misuse {{device}}s and Particle Accounts. As a security feature for all of our customers, we require that requests to add, remove, rename, or reconfigure {{device}}s be submitted directly by the users to whom they are registered.

If you really are the owner of your {{device}}, and are having trouble logging into your Particle account or configuring your {{device}}, send us an email at [hello @ particle dot io], and our Troubleshooting staff would be happy to help you resolve the issue.

### How do I unclaim a {{device}} ?

There are two primary ways to remove a {{device}} from your account--using the Particle Build Web IDE, or using the Particle Command Line Interface (CLI).

**Using Particle Build**

1. Login to your Particle account at the [Particle Build IDE](https://build.particle.io/build) home page

2. Click on the "Devices" icon in the bottom left-hand panel

3. Identify the {{device}} that you'd like to remove from your account, either by the familiar name you gave it when you added it to your account, or it's device ID.

4. Click on the arrow next to the device you'd like to remove, and click the blue "REMOVE DEVICE" button


**Using the Particle CLI**

**1. Install [CLI](/guide/tools-and-features/cli)**.  Make sure you've got the CLI installed by typing

``particle help``

into your terminal. If you're presented with a list of commands, the CLI is installed correctly. If not, please see the following article:

Installing the Particle CLI

**2. Login**.  Make sure you're logged into your Particle account by typing

``particle login``

and successfully completing the command line prompts.

**3. Remove {{device}}**.  In your terminal, type

``particle device remove <name>``

where <name> is either the familiar name or device ID of the {{device}} you'd like to remove from your account. Here's an example:

``particle device remove 0123456789ABCDEFGHI``

--or--

``particle device remove pinky_panda``

**4. Confirm Removal.**  Confirm that you *really* want to remove the {{device}} from your account by entering "yes" when prompted by the CLI.

---

**That's it!** The {{device}} has now been disassociated with your account, and is once again available to be claimed.

**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}


