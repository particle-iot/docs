---
title: Troubleshooting the Particle CLI
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
This guide is divided into five sections:

* [How To Use And Interact With The CLI](https://support.particle.io/hc/en-us/articles/1260801311330#how-to-use-and-interact-with-the-cli)
* [Running A Basic CLI Functionality Check](https://support.particle.io/hc/en-us/articles/1260801311330#running-a-basic-cli-functionality-check)
* [Ensuring The CLI Is Properly Installed And Configured](https://support.particle.io/hc/en-us/articles/1260801311330#ensuring-the-cli-is-properly-installed)
* [Steps To Take If The CLI Does Not Recognize Your Device](https://support.particle.io/hc/en-us/articles/1260801311330#cli-does-not-recognize-device)
* [How To Report CLI-related Issues (Important!)](https://support.particle.io/hc/en-us/articles/1260801311330#how-to-report-cli-issues)

But first, let's ensure that you've installed Particle's Command Line Interface (CLI) by following the instructions here: ([link](https://docs.particle.io/tutorials/developer-tools/cli/)).

## How To Use And Interact With The CLI

Right off the bat, you may be reading this article with a more conceptual question: **_how do I actually access the Particle CLI and run commands?_**

**CLI** stands for "**Command Line Interface**" - one accesses the CLI via your computer's command line.

For MacOS, use your computer's Spotlight Search to search for "Terminal". 

For Windows, perform a search for "cmd.exe".

You will be confronted with something that looks like this:

![Screen_Shot_2021-01-11_at_11.07.14_AM.png](/assets/images/support/Screen_Shot_2021-01-11_at_11.07.14_AM.png)

with the cursor ready for your command! 

## Running A Basic CLI Functionality Check

Before troubleshooting further, please take the following steps to ensure the CLI's basic operations are functional. Try running:

* `particle login` (ensure the CLI can complete the login process)
* `particle usb list` (ensure that no errors are reported. If no devices are connected via USB, this command will report 0\. If it fails with an error like this ([link](https://github.com/particle-iot/particle-cli/blob/d2cede0561e4ce7df4fe76a602a7b9bfb9b7d029/src/lib/require-optional.js#L8-L9%C2%A0)), confirm that your OS / CPU architecture are supported - as of writing this, some ARM environments are not fully supported).
* `particle serial list` (ensure that no errors are reported. If no devices are connected for serial communication via USB, this command will report 0).

If you receive errors from the above, it's worth proceeding further through this guide. If these commands report as expected, it's worth taking a good look at our CLI reference page ([link](https://docs.particle.io/reference/developer-tools/cli/)) to ensure that the commands you are trying to run are supported and formatted correctly.

## Ensuring The CLI Is Properly Installed On And Configure** **d For Your System

Issues related to build tools can be complex! After all, every computer is configured differently and is governed by unique administrative permissions schema, firewalls, networking settings, etc.... The majority of CLI issues are related to this complexity, so taking a step back and ensuring your tools are installed and configured properly is an important step to the troubleshooting process. 

1. Verify you are using the **latest version of the CLI** \- there’s a decent chance we’ve already fixed your issue. You can use the command `particle update-cli` via the command line.
2. **Disable Antivirus Software** \- some antivirus programs interfere with the CLI. During the course of troubleshooting, it is important to temporarily disable or explicitly grant higher privileges in your firewall interface to confirm your issue is still present.
3. Likewise, temporarily disable any **VPNs** through which you may be networking and confirm that your issue is still present.
4. **Avoid Network Storage Drives** targeting a project in a Dropbox / OneDrive / Google Drive directory. Ensure the CLI has been installed within a standard directory to which you have the appropriate permissions.
5. If you are receiving errors from CLI functions, do ensure that you have correctly logged into the CLI by using `particle login`.

**From there, take the following steps to reset your CLI installation:** 

**Open the directory** containing the CLI’s files:

* * MacOS / Linux: `~/.particle`  
   * Windows: `C:\Users\<your username>\AppData\Local\particle`

**Delete the following files and directories** if available:

* * `.npm-cache`  
   * `autoupdate`  
   * `error.log`  
   * `node-v8.15.0-<os>-<cpu>`  
   (e.g. `node-v8.15.0-windows-x64`, `node-v8.15.0-darwin-x64`, `node-v8.15.0-linux-x64`)  
   * `node_modules`  
   * `package-lock.json`  
   * `plugin-cache.json`  
   * `profile.json`  
   * `tmp`

**Update** the CLI:

_If Workbench_:

1. run the `Particle: Update CLI` command

_If stand-alone CLI_

1. Open a terminal (Powershell, Cmd.exe, Bash, Zsh, etc..).
2. Run `particle update-cli` and wait for the operation to complete.Reset your CLI installation:

Once that completes, confirm a successful reinstallation by by running the `particle usb list` and `particle serial inspect` CLI commands (or, n Workbench, run `Particle: Launch CLI` and type the aforementioned commands into the terminal pane that launches).

If the above steps fail to resolve the issue, **s** **croll to the bottom of this page and follow the steps for issue reporting.**

## Steps To Take If The CLI Does Not Recognize Your Device

Hardware peripheral issues have several main causes. In order:

1. Investigate your USB cable. 90%+ of cases where the CLI cannot detect your device result from two major cable issues. First, **make sure your USB cable is a data cable** (not simply a power cable). There are, unfortunately, no conventions around labeling cables as data cables or power cables - the easiest way to ensure your USB cable is in fact a data cable is to attempt to transmit data to it. We recommend cross-testing against another device and against another cable. Following the PuTTY/CoolTerm instructions here ([link](https://support.particle.io/hc/en-us/articles/360045422954)) is an easy way to test a viable USB serial connection to your device without using the CLI.
2. **Make sure your USB cable is not damaged in some way**. Again, cross-testing against another device and against another cable is strongly recommended.
3. **Bypass USB hub / extension**s - if you are working with a device and are seeing issues related to its USB connection, try disconnecting all USB devices and reconnecting only your Particle device directly to you computer’s USB port.
4. For Windows devices, you may need to ensure that the appropriate drivers are installed. IF you see the error `LIBUSB_ERROR_NOT_SUPPORTED`, you may need to install the latest [Particle USB/serial drivers](http://binaries.particle.io/cli/installer/windows/ParticleDriversSetup.exe). Please see our extensive troubleshooting documentation for fixing Windows driver issues here: ([link](https://github.com/rickkas7/particle%5Fnotes/tree/master/fixing-windows-10-serial-drivers)).
5. Check your computer's Device Manager to ensure that your computer is able to identify the device. For MacOS, you will need to go to `Applications/Utilities` and open up the application called "System Information." For Windows, this is your Device Manager.  
    
When in DFU mode, the Device Manager looks like this: (Note that it may say **Photon DFU Mode** regardless of device type.)  
    
![DFU driver](/assets/images/support/installing-dfu-util-22dfu.png)
    
And when in normal operating mode or listening mode (blinking blue), the Device Manager looks like this:  
    
![COM driver](/assets/images/support/installing-dfu-util-23com.png)
6. If your device is recognized in DFU Mode but not in any other mode, you may need to perform an update to that device in order for it to recognize Serial commands. In order to do so, as always, place the device in DFU Mode (hold down BOTH buttons, then release only the `RESET` button, while holding down the `MODE` button. Wait for the LED to start flashing yellow (it will flash magenta first) and release the `MODE` button once it's flashing yellow). Then run the CLI commands `particle update` followed by `particle flash --usb tinker`.

## How To Report CLI Issues

**Particle's Support Team refers CLI and Workbench issues to our Particle Community** **([link](https://community.particle.io/c/DT/CLI/52)).** There are several benefits to doing so - other members of our Community may already have a solution for this issue, it allows for more transparent self-service after your issue is resolved, and it also is an often direct channel to our CLI and Workbench Engineering Team. **In order to report your issue, please post in our Particle Community** ([link](https://community.particle.io/c/DT/CLI/52))   **following the instructions below**:

1. Capture verbose error logs of the incident in question - run your any commands that have been failing using the `--verbose` flag  (- e.g. `particle <cmd> --verbose`) and collect those results into your report.
2. Collect the contents of your particle directory -`ls -a ~./particle` (MacOS / Linux), or `get-childitem ~\AppData\Local\particle` (Windows + PowerShell) into your report as well.
3. Navigate to the Particle Community's CLI Topic ([link](https://community.particle.io/c/DT/CLI/52)) and post your issue, taking care to further specify:  
   * Operating System  
   * CPU Architecture (32/64 bit? ARM?)  
   * CLI Version (`particle version`).  
   * CLI Installation Type (Standard or Advanced?, see link: ([here](https://docs.particle.io/tutorials/developer-tools/cli/#installing)).  
   * Terminal / Shell within which you running the Particle CLI (e.g. Powershell, Bash, Zsh, cmd.exe, etc)  
   * What Particle hardware are you using (Argon, Boron, etc...) and with what Device OS Version?
4. **Carefully, with screenshots as appropriate, walk us through the process with which you experience the error step-by-step, taking care to note expected behavior.**
5. Ensure you use the \[ISSUE\] Prefix in your Community Post so as to draw our attention to the post.
