---
word: Dev
title: Particle Dev
order: 2
shared: true
columns: two
template: guide.hbs
---

# Particle Dev

## Getting Started

![IDE Menu]({{assets}}/images/ide-menu.jpg)

**Particle Dev** is a desktop application that allows you to work with local copies of your firmware files. However, **internet** access is required as the files are pushed to the Particle Cloud for compilation and returns a binary. i.e. This is not an offline development tool, yet.

All the commands are available from the **Particle** menu. The menu changes depending on whether you're logged in or have selected a device, so some of the commands will only show up once you're in the right context.

![Command Palette]({{assets}}/images/ide-palette.jpg)

If you prefer a keyboard-oriented workflow, there's **Command Palette** with all available commands in a searchable list.

To show the palette press `Command`+`Shift`+`P` keys together on a Mac or `Control`+`Shift`+`P` on Windows.

![Toolbar]({{assets}}/images/ide-toolbar.jpg)

**Tip**: you can change toolbar's position in settings.

There's also a toolbar on left side of IDE which contains shortcuts to the most frequently used commands like compiling and flashing (looks a lot like the one from [Web IDE (Build)](https://build.particle.io/), doesn't it?).

### Logging In

If you want to work on more advanced projects, Particle Dev could be the choice for you. Head over and download latest release:

[Particle Dev Download >](https://www.particle.io/dev)

![IDE Window]({{assets}}/images/ide-window.jpg)

To access most of features you need to log in using your Particle account (which you can [create here](https://build.particle.io/signup)) by clicking the link on the bottom of the window.

![Logging in]({{assets}}/images/ide-log-in.jpg)

Enter your email and password then click the "Log In" button. After a successful login, the dialog will hide and a link will appear at the bottom showing your current account email.

**NOTE**: When using [Command Line](/guide/tools-and-features/cli) you'll notice that log-in status is shared between Particle Dev and CLI. So if you successfully ran `particle login`, you will be logged in within the Particle Dev.

### Selecting Device

![Selecting device]({{assets}}/images/ide-select-core.jpg)

Most features like **Flashing** or accessing **Cloud variables and functions** require selecting a target device they will interact with.

There are three ways to select core:

* Click **Select device** button in the left toolbar
* Click device's name on the bottom of the window
* Click on **Particle** -> **Select device...** menu

Then you will see list of all your devices along with an indicator of online status and platform. You can search for a specific one by typing its name. Clicking on the device or pressing `Enter` when a device is selected will select it.

### Compiling Code

Before compiling your project, make sure your project files are in a dedicated directory.

Notes:
* If other files not related to your project are present in the project directory, you may experience errors when trying to compile.
* All the files have to be on the same level (no subdirectories) like [this]({{assets}}/images/ide-include-library.jpg)

![Compile button]({{assets}}/images/ide-compile.jpg)

To compile your current project, click on the **Compile in the cloud** button. If your code doesn't contain errors, you'll see a new file named **PLATFORM_firmware_X.bin** in your project's directory (where *PLATFORM* is name of currently selected platform and *X* is a timestamp).

Different devices usually require separate binaries (i.e. you can't flash Core with firmware compiled for a Photon) and resulting file is going to be compiled for platform of currently selected device.  If you don't have a device selected, the code is going to be compiled for the Core.

**NOTE**: Remember that **\*.cpp** and **\*.ino** files behave differently. You can read more about it on our [support page](http://support.particle.io/hc/en-us/articles/204952620).

![Compile errors]({{assets}}/images/ide-compile-errors.jpg)

If there are some errors, you'll see a list of them allowing you to quickly jump to relevant line in code. You can show this list by clicking red error icon on the bottom of the window.

### Flashing device

![Flash button]({{assets}}/images/ide-flash.jpg)

When you're sure that your code is correct it's time to flash it to the device. To do this, click **Flash using cloud** button. Your code will be sent wirelessly to your device. If the request was successful, the LED on your device will begin flashing magenta as code is downloaded to it. The process is complete when the magenta is replaced by your online status indication patterns.

## Cloud variables & functions

To access all registered variables and functions, go to **Particle** -> **Show cloud functions**/**Show cloud functions** menus.

### Variables

![Getting variable]({{assets}}/images/ide-get-variable.gif)

All variables declared with [Particle.variable()](/reference/firmware/#particle-variable-) are shown on the left side of panel. To poll latest variable value, click **Refresh** button for variable you want to update.

![Watching variable]({{assets}}/images/ide-watch-variable.gif)

When you want to check variable value constantly, you can click **Watch** button. When a variable is watched, Particle Dev will fetch latest value every 5 seconds.

### Functions

![Functions]({{assets}}/images/ide-functions.gif)

To call an [exposed function](/reference/firmware/#particle-function-) simply click on the button with its name. You'll see any data the function returns on the right side.

You can also add parameters to the call by entering them to the right of button.

## Managing Your Device

### Setting up WiFi

![WiFi list]({{assets}}/images/ide-wifi-list.jpg)

To setup device's WiFi, connect it via USB and click **Setup device's WiFi...** button on the toolbar.

If your device isn't in {{#if photon}}{{{popup 'Listening Mode,' 'vine' 'https://vine.co/v/eZUH7WaWjMT/embed/simple'}}}{{/if}}{{#if core}}{{{popup 'Listening Mode,' 'vine' 'https://vine.co/v/eZU6YiK20Hl/embed/simple'}}}{{/if}} you'll see animation showing how to enter that state.

Next you'll see all available networks. The one you are currently connected to will be listed first.

Select the one you want your device to use or choose **Enter SSID manually** (listed last) to specify all information by hand.

![WiFi setup]({{assets}}/images/ide-wifi-save.jpg)

Now you need to fill missing information and click **Save**. Your device will go dark for a second and then try to connect to the WiFi.

## Using Community Libraries

Community libraries can be used from within Dev. Libraries are used like this:

- create a new project using the new project structure
- add the libraries you wish to use to the project
- edit your project's code to use the library
- compile and flash the application to the target device

## Creating the Project Structure

Create a new folder to hold the project, and add these files:

- src/project.cpp

This provides the beginnings of a new project. 

## Adding a library to your project

Using the Command Palette, launch the `Particle Dev Libraries:add` command (as a shortcut, you can type `lib add`)

This will prompt you to begin typing in the name of the library. The first 10 libraries that partially match the entered name are shown. 

![Library Add]({{assets}}/images/dev-library-add.jpg)

To add the library to your project, hit enter to accept the selected library or click on a different library.  The library is added immediately once a library is clicked.  

To close the dialog without adding a library, press "ESC".

# Using the Library

To use the library in your project, you first need to include the library.
Edit `project.cpp` and include the library by adding 

```
`#include "library.h"`
```
to your project code (replacing the text `library` with the actual name of the library being used.)

With the library header file included, you can then call functions that are defined in the library. Please see the library documentation and examples for details on the functions that are available with your chosen library 

When you compile your project, the library functions are automatically added to your project by the cloud compiler. 

## Contributing Libraries

### Creating a new library

To scaffold a new library, create one using the new V2 structure:

 - library.properties
 - src/libraryname.cpp
 - src/libraryname.h
 - examples/example.ino

See the [https://github.com/spark/uber-library-example/tree/39acac03fa58a76417d9247a87206c416f1d4a0a](user-library-example) for detials of what to include in the `library.properties` file.


### Migrating an exiting V1 library to V2

If you wish to continue working on an existing V1 format library, it's necessary to convert it to V2 format. This is done via the `library migrate` command. 

To migrate a library:

- open the library directory in atom as a project
- run `Particle Dev Libraries: migrate` 
- the library is then migrated to the new format (for example, you'll see the sources moved from `firmware` to `src`.)

You can then continue working on the library and later publish your changes as a new version.

### Publishing a Library

To publish a new version of a library:

- increment the version number to ensure the version is unique
- ensure the library is opened as a project folder if not already done so
- run `Particle Dev Libraries: publish` - the library will be validated and then published.


### further Help

Check out and join our [community forums](http://community.particle.io/) for advanced help, tutorials, and troubleshooting.

{{#if photon}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}

{{#if core}}
[Go to Community Forums >](http://community.particle.io/c/troubleshooting)
{{/if}}
