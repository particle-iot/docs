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

Creating an account is a simple one-step process.  When presented with the login screen, click the "create account" text and fill out the form including your email address (careful!) and desired account password. That's it!

![Particle Build](/assets/images/ide-login.png)

If you haven't logged into Particle Build before, click the "create account" text beneath the Log In button, and you'll be presented with a signup for existing users.  

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

The application you've got open in the editor is displayed under the "Current App" header.  You'll notice that this empty application has only one file, but firmware with associated libraries/multiple files are fully supported.

From this pane, you've got a lot of buttons and actions available to you that can help you grow and manage your library of applications:

- **Create**: You can create a new application by clicking the "Create New App" button.  Give it a descriptive name and press enter!  Your app is now saved to your account and ready for editing.

- **Delete**: Click the "Remove App" button to remove it forever from your Particle library.

- **Rename**: You can rename your Particle App by simply double-clicking on the title of your app under the "Current App" header.  You can modify the "Optional description" field in the same way.
- **My Apps**: Tired of working on your current project?  Select the name of another app under the "My apps" header to open it in a tab of the Particle Build editor.

- **Files**: This header lists all known files associated with the open application.  Click on a supporting file in your application to open it as an active tab in the editor.

- **Examples**: The "Example apps" header lists a continuously growing number of community-supported example apps.  Use these apps as references for developing your own, or fork them outright to extend their functionality.


Flashing Your First App
---

The best way to get started with the IDE is to start writing code:

{{#if raspberry-pi}}
- **Connect**: Make sure your device is powered connected to the Particle Cloud and ready to be updated.
{{else}}
- **Connect**: Make sure your device is powered and "breathing" Cyan, which indicates that it's connected to the Particle Cloud and ready to be updated.
{{/if}}

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

{{#if raspberry-pi}}
![Particle Build](/assets/images/ide-devices.png)
{{/if}}

- **Select Your Device**: If you have more than one device you have to make sure that you've selected which of your devices to flash code to.  Click on the "Devices" icon at the bottom left side of the navigation pane, then when you hover over device name the star will appear on the left. Click on it to set the device you'd like to update (it won't be visible if you have only one device). Once you've selected a device, the star associated with it will turn yellow. (If you only have one device, there is no need to select it, you can continue on to the next step).

![Signal device](/assets/images/signal-device.png)

- **Device details**: To identify a device in the "Devices" list, click the chevron then click Signal to make the device LED shout rainbows. Click Signal again to stop. You can also use the firmware selector to opt-in to the latest cutting edge features!

**NOTE**: Devices are grouped by their platform. You can see the platform icon (circle with an letter) on the left of its name.

{{#if raspberry-pi}}
- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your device.  If the flash was successful, your device will begin running the app.
{{else}}
- **Flash**: Click the "Flash" button, and your code will be sent wirelessly to your device.  If the flash was successful, the LED on your device will begin flashing magenta.
{{/if}}
![Particle Build](/assets/images/ide-examples.png)

- **Fork**: Wish the timing of that LED flash was a little bit faster?  Try clicking on the "Fork This Example" button after selecting the "Blink An LED" example application.  You've now got a personal copy of that application that you can modify, save, and flash to all of your devices.

- **Edit**: Try changing the values in the delay() function from 1000 to 250, which changes the timing interval from 1000 milliseconds to only 250 milliseconds.  Click the Verify button, then the Flash button.  Is your device's LED blinking faster?  Well done :)

Adding files to your app
---

As your code base grows, you will naturally create libraries to better manage your firmware development. To add a file to your app, simply hit the "+" button located at the top right hand corner.

![Particle Build](/assets/images/ide-add-files.png)

This will create two new tabs, one with `.h` and one with `.cpp` extension. You can read more about why we need both in [this C++ tutorial](http://www.learncpp.com/cpp-tutorial/19-header-files/).

Account Information
---

There are a couple of other neat bells and whistles in Particle Build.  The Particle Build IDE the best tool for viewing important information about your device, managing devices associated with your Particle account, and "unclaiming" them so they can be transferred to your friend.

![Particle Build](/assets/images/ide-account.png)

- **Device ID**: You can view your device's ID by clicking on the "Device" icon at the bottom of the navigation pane, then clicking the dropdown arrow next to the device of interest.

- **Unclaim**: You can "Unclaim" a device by pressing the "Remove Device" button that is revealed by clicking the dropdown arrow.  Once a device has been unclaimed, it is available to be associated with any Particle users' account.

![Particle Build](/assets/images/ide-settings.png)

- **API Key**: You can find your most recent API Key listed under the "Settings" tab in your account.  You can press the "Reset Token" button to assign a new API Key to your account.  *Note* that pressing this button will require you to update any hard-coded API Credentials in your Particle-powered projects!


Using Libraries
---

![Include the library](/assets/images/libraries/libraries.png)

Firmware libraries are an important part of how you connect your Photon or Electron to sensors and actuators. They make it easy to reuse code across multiple Particle projects, or to leverage code written by other people in the Particle community. As an example, firmware libraries make it easy to get data out of your DS18B20 temperature sensor without writing any of the code yourself.

Particle libraries are hosted on GitHub, and can be easily accessed through through all of Particle's development tools including the Web IDE.

To include a firmware library in your Particle project, open the library drawer, search for the corresponding library for your sensor or actuator, and click the `Include in Project` button. Including a library in your project will add the library dependency to the `project.properties` file that will be compiled with your project when it is verified or flashed to your target device.

Read on for detailed instructions to include a firmware library in your Particle application with Build.

We have [a detailed reference guide about libraries](/guide/tools-and-features/libraries/) but for now here's a step by step guide on how to include a library in the Web IDE.

##### Step 1 - Go to the Libraries tab
Click on the libraries bookmark icon on the left hand side of the Build interface.

![Bookmark icon](/assets/images/libraries-guide-bookmarkicon.png)

##### Step 2 - Find the library you need

![Bookmark icon](/assets/images/libraries-guide-librarylist.png)

Once you open the libraries tab, you'll be presented with a list of libraries. Libraries with the Particle logo next to them are Official libraries created by the Particle team for Particle hardware. Libraries that have a check mark next to them are Verified libraries. Verified libraries are popular community libraries that have been validated by the Particle team to ensure that they work and are well documented. Click [here](/guide/tools-and-features/libraries/#kinds-of-libraries) To learn more about the different kinds of Particle libraries.

To find the right library for your project, you can either search for it directly or browse through popular firmware libraries using the browsing arrows at the bottom of the library list.

**Search**. To search for a library, begin typing in the search bar. Search results are ranked by match with the search term with a preference for official and verified libraries.

![Search](/assets/images/libraries-guide-search.png)

**Browsing arrows**. Not sure what library you're looking for? Use the browsing arrows beneath the library list to view additional Particle libraries in our firmware library manager. Pagination also works with search results.

![Pagination](/assets/images/libraries-guide-pagination.png)

##### Step 3 - Inspect a library
Clicking on a library from the library list shows you more detailed information about the library.

![Library information](/assets/images/libraries-guide-libraryinfo.png)

The detailed view for a library includes the following:

- `Library name`: The name of the library. The name must be unique, so there aren't two libraries with the same name.
- `Library version`: The version of the library. This follows the [semver convention](http://semver.org/).
- `GitHub link`: Where the library is hosted. The code for public libraries must be open-sourced. See how to [Contribute a library](/guide/tools-and-features/libraries/#contributing-libraries).
- `Library description`: Detailed information about the library
- `Library files`: What files come with the library. This follows the [new library file structure](/guide/tools-and-features/libraries/#library-file-structure).
- `Library examples`: Those are examples of usage. If you click on one of them, you will be shown the source code. To use it as one of your projects, click on 'Use this example'.

![Library examples](/assets/images/libraries-guide-libraryexamples.png)

- `Library source`: In the editor you will see all the code of the library.

##### Step 4 - Click on 'Include in Project'

![Include in Project](/assets/images/libraries-guide-includeinproject.png)

To add a firmware library to a project, click the `Include in Project` button. You will be presented with a list of your Particle projects that the library can be added to. After you select your target project from the list, you'll be presented with a confirmation page.

![Include in Project](/assets/images/libraries-guide-includeinappconfirmation.png)

Clicking the `Confirm` button will bring you back to your Particle project. The library include should appear at the top of your project source file. It should also be listed in the `Included libraries` section of the project.

![Include](/assets/images/libraries-guide-include.png)
![Included libraries](/assets/images/libraries-guide-includedlibraries.png)

**Congrats!** You have now added a firmware library to your Particle project!

Contribute a library
---

This functionality was moved to the Desktop IDE and the Command Line Interface (CLI). You can follow [this link](/guide/tools-and-features/libraries/#contributing-libraries) to find more about contributing a library.

Checking code memory usage
---

!["i" button](/assets/images/ide-i-button.png)

Whenever you **verify** your code and it compiles successfully, an "i" button will be displayed at the console output window.

This allows you to view the amount of FLASH and RAM used by this particular code/app that is currently being worked on.

_If there are no code changes and you **verify** code for the second time, the "i" button will not be available. You can simply add an extra blank space or new line before you **verify** and the "i" button will now appear._

![Code memory information](/assets/images/ide-mem-usage.png)

{{#if raspberry-pi}}
{{else}}

Wait, what is firmware?
---

An *embedded system* like the Core, Photon or Electron doesn't have an Operating System like a traditional computer. Instead, it runs a single application, often called *firmware*, which runs whenever the system is powered.


![Firmware versions]({{assets}}/images/ide-firmware-versions.png)

*Firmware* is so-called because it's harder than software and softer than hardware. Hardware is fixed during manufacturing, and doesn't change. Software can be updated anytime, so it's very flexible. Firmware is somewhere in between; hardware companies do issue firmware updates, but they tend to be very infrequent, because upgrading firmware can be difficult.

In our case, because the Cores, Photons and Electrons are connected to the internet, updating firmware is quite trivial; we send it over the network, and we have put in place safeguards to keep you from "bricking" your device.

When you flash code onto your device, you are doing an *over-the-air firmware update*. This firmware update overwrites almost all of the software on the device; the only piece that is untouched is the bootloader, which manages the process of loading new firmware and ensures you can always update the firmware over USB or through a factory reset.

For every device which version of our firmware you want to build against. In most cases you want to build with the latest firmware (which is used by default). If you need to target an older version (i.e. when newer version has some breaking changes) you can select it in dropdown located in device details.
{{/if}}

Troubleshooting
---

![Clear cache]({{assets}}/images/ide-clear-cache.png)

Particle Build uses a local cache to improve its performance. In some cases this may cause errors or outdated information about libraries. If you encounter similar symptoms try clearing the cache by going to **Settings** and clicking **Clear cache** button.

Feeling oriented? Let's move on to some more interesting [examples.](/guide/getting-started/examples)


**Also**, check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
