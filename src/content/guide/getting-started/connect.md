---
title: Connecting over USB
template: guide.hbs
columns: two
devices: [ photon,electron,core ]
order: 3
---

# Connecting your Device over USB

The easiest way to connect your device to {{#if electron}}cellular{{/if}}{{#if photon}}Wi-Fi{{/if}}{{#if core}}Wi-Fi{{/if}} is using the {{#unless electron}}mobile app{{/unless}}{{#if electron}}browser{{/if}} as described in the [previous lesson](/guide/getting-started/start). {{#unless electron}}But in case that's not working for you, there are other methods as well.{{/unless}}{{#if electron}}It's worth noting here that you currently cannot set up an Electron from the command line (CLI) because we require that a credit card number be entered, but the CLI will be extremely useful for other things. Please use [setup.particle.io](https://setup.particle.io/) or the mobile apps.{{/if}}

For all of the following methods, the device must be in [Listening Mode](/guide/getting-started/modes/#listening-mode), where the RGB LED is {{#unless core}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/unless}}{{#if core}}{{{popup 'blinking blue.' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}}

Particle devices boot into listening mode by default, so if your device is brand new, it should go straight into listening mode. If your device is not blinking blue, {{#if photon}}{{{popup 'hold down the SETUP button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}}{{/if}}{{#if electron}}{{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUHUIjq7pO/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'hold down the MODE button.' 'vine' 'https://vine.co/v/eZUgHYYrYgl/embed/simple'}}}{{/if}}

There are a two ways to go about connecting your device over USB, depending on your OS.

## Using OSX

We're going to install the Particle CLI on your computer. If you already have node.js installed, you can skip to [this step](/guide/getting-started/connect/#install-the-particle-cli).

### Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](https://nodejs.org/en/download/)

Launch the installer and follow the instructions to install node.js.

Next, open your terminal, or preferred terminal program.

### Install the Particle CLI

Type:
`npm install -g particle-cli`

_Note:_ You may need to update xcode at this time.

{{#if photon}}
### Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](/guide/getting-started/modes/#listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.
{{/if}}

{{#if core}}
### Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](/guide/getting-started/modes/#listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.
{{/if}}

{{#if electron}}
### Connecting Your Device
If you're using an Electron, please follow the instructions at [https://setup.particle.io](https://setup.particle.io).
{{/if}}

## Using Windows

*An official, updated tutorial on CLI, DFU, and driver tools installation is referenced [here](http://community.particle.io/t/particle-official-windows-10-full-cli-and-dfu-setup/18309).*

To connect and interact with a Particle Device over USB from a Windows machine, the easiest route is to use the Particle command line interface.
The following describes how to install the Particle CLI on your computer. If you already have Node.js installed, you can skip to [this step](#installing-the-particle-cli).

### Installing Node.js
The Particle CLI runs with Node.js. Grab the latest version from [the Node.js website](https://nodejs.org/en/download/)

Run the installer you downloaded. Follow the prompts. The default file locations should be fine for this.

Restart your computer.

Node should now be installed! In the next step we will test it and install the CLI.

### Installing the Particle Driver
You'll also need to install the Windows driver. [Download it here.](https://s3.amazonaws.com/spark-website/Particle.zip)

Unzip the file. It is fine to unzip this as a default into your Downloads folder.

Go to the Device Manager and double-click on your Particle device under `Other Devices` (on Windows 10 your Particle device may be listed under `Ports`).

Click `Update Driver`, and select `Browse for driver software on your computer`.

Navigate to your Downloads folder, or wherever you unzipped the drivers.

{{#if photon}}The driver is called `photon.cat`.{{/if}}
{{#if core}}The driver is called `spark_core.cat`.{{/if}}

If you have a problem installing, you may have to temporarily disable the digitally signed driver enforcement policy. (We're sorry.) There are good instructions on how to do that [here](http://www.howtogeek.com/167723/how-to-disable-driver-signature-verification-on-64-bit-windows-8.1-so-that-you-can-install-unsigned-drivers/).

### Opening the Command Prompt
You'll need to open the command prompt for this next part. You can also use Powershell or a similar command line tool if that is what you are used to.

To open the command prompt:
1) Mouse over the upper right hand corner of the screen and select "Search"
2) Search for `cmd` in the search box
3) Click on Command Prompt

Now your Command Prompt, is open for use.

### Installing the Particle CLI
In the Command Prompt window, type:
`npm install -g particle-cli`

and press enter.

Now let's try using the CLI!


{{#if photon}}
### Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](/guide/getting-started/modes/#listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.
{{/if}}

{{#if core}}
### Connecting Your Device
Make sure your device is plugged in via USB and in [Listening Mode](/guide/getting-started/modes/#listening-mode) (blinking blue). Open the terminal and type:
`particle setup`

Log in with your Particle account and follow the prompts to set up your device.

If you have already claimed your device and you want to connect it to wifi, type `particle serial wifi` instead of `particle setup`. This will set up your device on the current wifi.

**Wait! What is an SSID? What kind of security does my wifi have?**
- __The SSID__ is the name of your network. When you connect on your computer, it is the name that you select when you connect your computer to wifi.
- __The Security__ of your wifi is often set up by the administrator. Typically this is WPA2 if a password is needed, or unsecured if no password is needed. Contact your network administrator if you can't get this step to work, and find out exactly what kind of wifi you have.
{{/if}}

{{#if electron}}
### Connecting Your Device
If you're using an Electron, please follow the instructions at [https://setup.particle.io](https://setup.particle.io).
{{/if}}

If your device is not connecting, try troubleshooting [here](https://docs.particle.io/support/troubleshooting/common-issues).

[More info on the CLI is available](/guide/tools-and-features/cli/).



Once you've finished connecting your device, head over to [the next section](/guide/getting-started/modes) to learn about the different modes for your device.
