---
title: Web IDE (Build)
template: guide.hbs
columns: two
devices: [ electron,photon,core,raspberry-pi ]
order: 6
---

Flash Apps with Particle Build
===

Logging In
---

![Particle Build](/assets/images/ide-new-account.png)

When you're ready to reprogram your device, head over to our IDE:

[Particle Build >](https://build.particle.io)

Creating an account is a simple one-step process.  When presented with the login screen, simply enter your email address (careful!), and desired account password.  Press the big friendly "Sign Up" button, and you'll reach the Particle Build home page.

![Particle Build](/assets/images/ide-login.png)

If you've already logged into Particle Build before, click the "Let me log in" text beneath the Sign Up button, and you'll be presented with a login for existing users.  Don't worry--if you already have an account and accidentally click the "Sign Up" button, we'll still log you into your existing account.


Web IDE
---

![Particle Build](/assets/images/ide-main.png)

Particle Build is an Integrated Development Environment, or IDE; that means that you can do software development in an easy-to-use application, which just so happens to run in your web browser.

Particle Build starts with the navigation bar on the left. On the top, there are three buttons, which serve important functions:

- **Flash**: Flashes the current code to the device. This initiates an *over-the-air firmware update* and loads the new software onto your device. {{#if electron}}**Note: Flashing OTA for the Electron uses data and should consider using flash over serial instead.**{{/if}}
- **Verify**: This compiles your code without actually flashing it to the device; if there are any errors in your code, they will be shown in the debug console on the bottom of the screen.
- **Save**: Saves any changes you've made to your code.



At the bottom, there are four more buttons to navigate through the IDE:

- **Code**: Shows a list of your firmware applications and lets you select which one to edit/flash.
- **Library**: Explore libraries submitted by other users, and develop your own.
- **Docs**: Brings you to the documentation for Particle.
- **Devices**: Shows a list of your devices, so you can choose which to flash, and get more information on each device.
- **Settings**: Change your password, log out, or get your access token for API calls.

Keyboard Shortcuts
---

Missing your keyboard shortcuts? [This cheatsheet will help.](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts)

Particle Apps and Libraries
---

![Particle Build](/assets/images/ide-apps.png)

The heart of Particle Build is the "Particle Apps" section, which displays the name of the current app in your editor, as well as a list of your other applications and community-supported example apps.

The application you've got open in the editor is displayed under the "Current App" header.  You'll notice that this "HELLOWORLD" sample application has only one file, but firmware with associated libraries/multiple files are fully supported.

From this pane, you've got a lot of buttons and actions available to you that can help you grow and manage your library of kick-ass applications:

- **Create**: You can create a new application by clicking the "Create New App" button.  Give it a sweet name and press enter!  Your app is now saved to your account and ready for editing.

- **Delete**: Click the "Remove App" button to remove it forever from your Particle library.

- **Rename**: You can rename your Particle App by simply double-clicking on the title of your app under the "Current App" header.  You can modify the "Optional description" field in the same way.
- **My Apps**: Tired of working on your current project?  Select the name of another app under the "My apps" header to open it in a tab of the Particle Build editor.

- **Files**: This header lists all known files associated with the open application.  Click on a supporting file in your application to open it as an active tab in the editor.

- **Examples**: The "Example apps" header lists a continuously growing number of community-supported example apps.  Use these apps as references for developing your own, or fork them outright to extend their functionality.


Flashing Your First App
---

The best way to get started with the IDE is to start writing code:

- **Connect**: Make sure your device is powered and "breathing" Cyan, which indicates that it's connected to the Particle Cloud and ready to be updated.
- **Get Code**: Try clicking on the "Blink an LED" example under the "Example apps" header.  The Particle Build editor should display the code for the example application in an active tab.  Alternatively, you can copy and paste this snippet of code into a new application in the Build IDE.

{{#if electron}}
**NOTE**: Each over *over-the-air firmware update* on Electron counts towards your data allowance. You can also flash the Electron locally [using our CLI](https://github.com/spark/particle-cli#compiling-remotely-and-flashing-locally).
{{/if}}

```
//D7 LED Flash Example
int LED = D7;

void setup() {
    pinMode(LED, OUTPUT);
}

void loop() {
    digitalWrite(LED, HIGH);
    delay(1000);
    digitalWrite(LED, LOW);
    delay(1000);
}
```
{{#if electron}}
![Particle Build](/assets/images/enew-ide.png)
{{/if}}

{{#if photon}}
![Particle Build](/assets/images/ide-devices.png)
{{/if}}

{{#if core}}
![Particle Build](/assets/images/ide-devices.png)
{{/if}}

- **Select Your Device**: If you have more than one device you have to make sure that you've selected which of your devices to flash code to.  Click on the "Devices" icon at the bottom left side of the navigation pane, then when you hover over device name the star will appear on the left. Click on it to set the device you'd like to update (it won't be visible if you have only one device). Once you've selected a device, the star associated with it will turn yellow. (If you only have one device, there is no need to select it, you can continue on to the next step).

**NOTE**: Devices are grouped by their platform. You can see the platform icon (circle with an letter) on the left of its name.

- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your device.  If the flash was successful, the LED on your device will begin flashing magenta.

![Particle Build](/assets/images/ide-examples.png)

- **Fork**: Wish the timing of that LED flash was a little bit faster?  Try clicking on the "Fork This Example" button after selecting the "Blink An LED" example application.  You've now got a personal copy of that application that you can modify, save, and flash to all of your devices.

- **Edit**: Try changing the values in the delay() function from 1000 to 250, which changes the timing interval from 1000 milliseconds to only 250 milliseconds.  Click the Verify button, then the Flash button.  Is your device's LED blinking faster?  Well done :)

Adding files to your app
---

As your codebase grows, you will naturally create libraries to better manage your firmware development. To add a file to your app, simply hit the "+" button located at the top right hand corner.

![Particle Build](/assets/images/ide-add-files.png)

This will create two new tabs, one with `.h` and one with `.cpp` extension. You can read more about why we need both in [this C++ tutorial](http://www.learncpp.com/cpp-tutorial/19-header-files/).

Account Information
---

There are a couple of other neat bells and whistles in Particle Build.  The Particle Build IDE the best tool for viewing important information about your device, managing devices associated with your Particle account, and "unclaiming" them so they can be transferred to your buddy.

![Particle Build](/assets/images/ide-account.png)

- **Device ID**: You can view your device's ID by clicking on the "Device" icon at the bottom of the navigation pane, then clicking the dropdown arrow next to the device of interest.

- **Unclaim**: You can "Unclaim" a device by pressing the "Remove Device" button that is revealed by clicking the dropdown arrow.  Once a device has been unclaimed, it is available to be reassociated with any Particle users' account.

![Particle Build](/assets/images/ide-settings.png)

- **API Key**: You can find your most recent API Key listed under the "Settings" tab in your account.  You can press the "Reset Token" button to assign a new API Key to your account.  *Note* that pressing this button will require you to update any hard-coded API Credentials in your Particle-powered projects!


Using Libraries
---

![Include the library](/assets/images/choose-app-to-include-library.png)

When you want to reuse code across multiple applications, Particle Libraries are your friend.
Particle Libraries are easily shareable, extensible packages built by the community to help with common problems many Particle applications encounter. They are hosted on GitHub and easily pulled into the IDE where they can be included in apps and shared with others.

You can include a library in an application by opening the library drawer, finding a library that will work for your project, and clicking the "include in app" button. This will add an `#include` statement to your code that will expose all the capabilities of the library to your code.

Contribute a library
---

![Validate library](/assets/images/validate-library.png)

Adding a library to the IDE starts by creating an open source GitHub repository where your code will live.
At minimum, this repository needs a `spark.json` file, some documentation, some example firmware files, and some Arduino/C++ files.
The import and validation process is designed to be forgiving and easy to interpret, so don't be scared; the IDE will walk you through what is required to get your library set to go.

The easiest way to generate library boilerplate code is to follow the instructions on the [getting started section](https://github.com/spark/uber-library-example#getting-started) of the `uber-library-example`, a project designed to illustrate and document what a library is supposed to look like.

Checking code memory usage
---

!["i" button](/assets/images/ide-i-button.png)

Whenever you **verify** your code and it compiles successfully, an "i" button will be displayed at the console output window.

This allows you to view the amount of FLASH and RAM used by this particular code/app that is currently being worked on.

_If there are no code changes and you **verify** code for the second time, the "i" button will not be available. You can simply add an extra blank space or new line before you **verify** and the "i" button will now appear._

![Code memory information](/assets/images/ide-mem-usage.png)

Wait, what is firmware?
---

An *embedded system* like the Core, Photon or Electron doesn't have an Operating System like a traditional computer. Instead, it runs a single application, often called *firmware*, which runs whenever the system is powered.


![Firmware versions]({{assets}}/images/ide-firmware-versions.png)

*Firmware* is so-called because it's harder than software and softer than hardware. Hardware is fixed during manufacturing, and doesn't change. Software can be updated anytime, so it's very flexible. Firmware is somewhere in between; hardware companies do issue firmware updates, but they tend to be very infrequent, because upgrading firmware can be difficult.

In our case, because the Cores, Photons and Electrons are connected to the internet, updating firmware is quite trivial; we send it over the network, and we have put in place safeguards to keep you from "bricking" your device.

When you flash code onto your device, you are doing an *over-the-air firmware update*. This firmware update overwrites almost all of the software on the device; the only piece that is untouched is the bootloader, which manages the process of loading new firmware and ensures you can always update the firmware over USB or through a factory reset.

For every device which version of our firmware you want to build against. In most cases you want to build with the latest firmware (which is used by default). If you need to target an older version (i.e. when newer version has some breaking changes) you can select it in dropdown located in device details.

Troubleshooting
---

![Clear cache]({{assets}}/images/ide-clear-cache.png)

Particle Build uses a local cache to improve its performance. In some cases this may cause errors or outdated information about libraries. If you encounter similar symptoms try clearing the cache by going to **Settings** and clicking **Clear cache** button.

Feeling oriented? Let's move on to some more interesting [examples.](/guide/getting-started/examples)


**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if electron}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
