---
title: Connecting over USB
layout: guide.hbs
columns: two
devices: [ photon,electron,core,argon,boron,xenon ]
order: 3
---

# Connecting your Device over USB

The easiest way to connect your device to {{network-type}} network is using the {{#if has-cellular}}browser{{else}}mobile app{{/if}} as described in the [previous lesson](/guide/getting-started/start). {{#if has-cellular}}It's worth noting here that you currently cannot set up {{a-device}} from the command line (CLI) because we require that a credit card number be entered, but the CLI will be extremely useful for other things. Please use [setup.particle.io](https://setup.particle.io/) or the mobile apps.{{else}}But in case that's not working for you, there are other methods as well.{{/if}}

For all of the following methods, the device must be in [Listening Mode](/guide/getting-started/modes/#listening-mode), where the RGB LED is {{#unless core}}{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}{{else}}{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}{{/unless}}

Particle devices boot into listening mode by default, so if your device is brand new, it should go straight into listening mode. If your device is not blinking blue, {{#if photon}}{{popup 'hold down the SETUP button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}{{/if}}{{#if electron}}{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}{{/if}}{{#if core}}{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUgHYYrYgl/embed/simple'}}{{/if}}

## Install the Particle CLI

Next we're going to install the Particle CLI on your computer.

### Using macOS or Linux

Open Terminal, or preferred terminal program and paste this command to install the Particle CLI:

```sh
bash <( curl -sL https://particle.io/install-cli )
```

**You may need to open a new terminal after the install completes to use the `particle` command.**

If you get a message about installing dfu-util for your OS, make sure you have [homebrew](http://brew.sh) installed and run the command above again.

### Using Windows

Download the [Windows CLI Installer](https://binaries.particle.io/cli/installer/windows/ParticleCLISetup.exe) and run it to install the Particle CLI, the device drivers and the dependencies that the CLI needs.

You'll need to open the command prompt for this next part. You can also use Powershell or a similar command line tool if that is what you are used to.

To open the command prompt:
1) Mouse over the upper right hand corner of the screen and select "Search"
2) Search for `cmd` in the search box
3) Click on Command Prompt

Now your Command Prompt, is open for use.
 
{{#if has-wifi}}
### Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](/guide/getting-started/modes/#listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to Wi-Fi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current Wi-Fi.

**Wait! What is an SSID? What kind of security does my Wi-Fi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to Wi-Fi.
- __The Security__ of your Wi-Fi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of Wi-Fi you have.
{{/if}} {{!-- has-wifi --}}

{{#if has-cellular}}
### Connecting Your Device
To check that your {{device}} can talk over USB, open a terminal and
type `particle setup`.

However to finish setting up your device, you will need to follow the instructions at [https://setup.particle.io](https://setup.particle.io).
{{/if}} {{!-- has-cellular --}}

If your device is not connecting, try troubleshooting [here](/support/troubleshooting/common-issues).

[More info on the CLI and steps to install it manually are available](/guide/tools-and-features/cli/).


Once you've finished connecting your device, head over to [the next section](/guide/getting-started/modes) to learn about the different modes for your device.
