---
word: Dev
title: Desktop IDE (Dev)
shared: true
columns: two
layout: commonTwo.hbs
description: Older desktop IDE for programming Particle devices for Windows and Mac OS (discontinued)
---

# Desktop IDE (Dev)

**Particle Dev** (Desktop IDE) is discontinued.

{{box op="start"}}
Particle Dev cannot be used to program 3rd-generation devices (Argon, Boron, B Series SoM, or the Tracker products).

You should instead use [**Particle Workbench**](/getting-started/developer-tools/workbench/) powered by VS Code. Workbench provides an integrated development environment as well as cloud compiling, local compiling, and source-level debugging.
{{box op="end"}}


## Download

As Particle Dev is discontinued, we do not recommend downloading and using it. However, if for some reason you need the last released version, click the triangle for the download links.

{{collapse op="start" label="Download"}}

Head over and download latest release:

[Download for Windows >](https://github.com/particle-iot-archived/particle-dev-app/releases/download/v1.19.0/ParticleDevSetup.exe)

[Download for Windows X64 >](https://github.com/particle-iot-archived/particle-dev-app/releases/download/v1.19.0/ParticleDevSetup-x64.exe)

[Download for Mac >](https://github.com/particle-iot-archived/particle-dev-app/releases/download/v1.19.0/particle-dev-mac-1.19.0.zip)

[Download for Linux >](https://github.com/particle-iot-archived/particle-dev-app/#linux)

{{collapse op="end"}}

### Getting Started

![IDE Menu]({{assets}}/images/ide-menu.jpg)

All the commands are available from the **Particle** menu. The menu changes depending on whether you're logged in or have selected a device, so some of the commands will only show up once you're in the right context.

![Command Palette]({{assets}}/images/ide-palette.jpg)

If you prefer a keyboard-oriented workflow, there's **Command Palette** with all available commands in a searchable list.

To show the palette press `Command`+`Shift`+`P` keys together on a Mac or `Control`+`Shift`+`P` on Windows.

![Toolbar]({{assets}}/images/ide-toolbar.jpg)

**Tip**: you can change toolbar's position in settings.

There's also a toolbar on left side of IDE which contains shortcuts to the most frequently used commands like compiling and flashing (looks a lot like the one from the [Web IDE](https://build.particle.io/), doesn't it?).

### Logging In

![IDE Window]({{assets}}/images/ide-window.jpg)

To access most of features you need to log in using your Particle account (which you can [create here](https://build.particle.io/signup)) by clicking the link on the bottom of the window.

![Logging in]({{assets}}/images/ide-log-in.jpg)

Enter your email and password then click the "Log In" button. After a successful login, the dialog will hide and a link will appear at the bottom showing your current account email.

**NOTE**: When using [Command Line](/getting-started/developer-tools/cli/) you'll notice that log-in status is shared between Particle Dev and CLI. So if you successfully ran `particle login`, you will be logged in within the Particle Dev.

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

**NOTE**: Remember that **\*.cpp** and **\*.ino** files behave differently. You can read more about it on our [support page](https://support.particle.io/hc/en-us/articles/204952620).

![Compile errors]({{assets}}/images/ide-compile-errors.jpg)

If there are some errors, you'll see a list of them allowing you to quickly jump to relevant line in code. You can show this list by clicking red error icon on the bottom of the window.

### Flashing device

![Flash button]({{assets}}/images/ide-flash.jpg)

When you're sure that your code is correct it's time to flash it to the device. To do this, click **Flash using cloud** button. Your code will be sent wirelessly to your device. If the request was successful, the LED on your device will begin flashing magenta as code is downloaded to it. The process is complete when the magenta is replaced by your online status indication patterns.

## Cloud variables & functions

To access all registered variables and functions, go to **Particle** -> **Show cloud functions**/**Show cloud functions** menus.

### Variables

![Getting variable]({{assets}}/images/ide-get-variable.gif)

All variables declared with [Particle.variable()](/cards/firmware/cloud-functions/particle-variable/) are shown on the left side of panel. To poll latest variable value, click **Refresh** button for variable you want to update.

![Watching variable]({{assets}}/images/ide-watch-variable.gif)

When you want to check variable value constantly, you can click **Watch** button. When a variable is watched, Particle Dev will fetch latest value every 5 seconds.

### Functions

![Functions]({{assets}}/images/ide-functions.gif)

To call an [exposed function](/cards/firmware/cloud-functions/particle-function/) simply click on the button with its name. You'll see any data the function returns on the right side.

You can also add parameters to the call by entering them to the right of button.

## Managing Your Device

### Setting up Wi-Fi

![WiFi list]({{assets}}/images/ide-wifi-list.jpg)

To setup device's Wi-Fi, connect it via USB and click **Setup device's Wi-Fi...** button on the toolbar.

If your device isn't in listening mode (blinking dark blue), hold down the SETUP or MODE button to enter it now.

Next you'll see all available networks. The one you are currently connected to will be listed first.

Select the one you want your device to use or choose **Enter SSID manually** (listed last) to specify all information by hand.

![WiFi setup]({{assets}}/images/ide-wifi-save.jpg)

Now you need to fill missing information and click **Save**. Your device will go dark for a second and then try to connect to the Wi-Fi.

## Using Community Libraries

![Include the library](/assets/images/libraries/libraries-dev.png)

Firmware libraries are an important part of how you connect your Photon or Electron to sensors and actuators. They make it easy to reuse code across multiple Particle projects, or to leverage code written by other people in the Particle community. As an example, firmware libraries make it easy to get data out of your DS18B20 temperature sensor without writing any of the code yourself.

Particle libraries are hosted on GitHub, and can be easily accessed through through all of Particle's development tools including the Web IDE.

To include a firmware library in your Particle project, open the library drawer in the Desktop IDE, search for the corresponding library for your sensor or actuator, click the `Use` button, then select `Add to current project`. Adding a library in your project will add the library dependency to the `project.properties` file that will be compiled with your project when it is verified or flashed to your target device.

Read on for detailed instructions to include a firmware library in your Particle application with the Web IDE.

We have [a detailed reference guide about libraries](/getting-started/device-os/firmware-libraries/) but for now here's a step by step guide on how to include a library in our Desktop IDE.

##### Step 1 - Open the libraries tab

Once you have opened your Particle project in the Desktop IDE, open the libraries tab by clicking on the `Browse and manage libraries` button on the left hand toolbar.

![Open the libraries tab](/assets/images/libraries/libraries-tab.png)

##### Step 2 - Find the library you need

![Library list](/assets/images/libraries/libraries-list-dev.png)

Once you open the libraries tab, you'll be presented with a list of libraries. Libraries with the Particle logo next to them are Official libraries created by the Particle team for Particle hardware. Libraries that have a check mark next to them are Verified libraries. Verified libraries are popular community libraries that have been validated by the Particle team to ensure that they work and are well documented. Click [here](/getting-started/device-os/firmware-libraries/#kinds-of-libraries) To learn more about the different kinds of Particle libraries.

To find the right library for your project, you can either search for it directly or browse through popular firmware libraries using the browsing buttons at the bottom of the library list.

**Search**. To search for a library, begin typing in the search bar. Search results are ranked by match with the search term with a preference for official and verified libraries.

![Search](/assets/images/libraries/libraries-dev-search.png)

**Browsing buttons**. Not sure what library you're looking for? Use the browsing arrows beneath the library list to view additional Particle libraries in our firmware library manager. Pagination also works with search results.

![Pagination](/assets/images/libraries/libraries-dev-browsing.png)

##### Step 3 - Library details

All the information you need to select your library is available in the search result cards for each library.

![Library information](/assets/images/libraries/libraries-dev-info.png)

The information included with each library search result includes:

- `Library name`: The name of the library. The name must be unique, so there aren't two libraries with the same name.
- `Library version`: The version of the library. This follows the [semver convention](http://semver.org/).
- `GitHub link`: Where the library is hosted. The code for public libraries must be open-sourced. See how to [Contribute a library](/getting-started/device-os/firmware-libraries/#contributing-libraries).
- `Library description`: Detailed information about the library
- `View source`: Clicking this icon will download the source files of the library and open them in another window. Library source files include the source files for the library itself which follow the [new library file structure](/getting-started/device-os/firmware-libraries/#library-file-structure), as well as library examples, which demonstrate usage of the library.

![View source](/assets/images/libraries/libraries-dev-source.png)

- `Install count`: This is the number of times a particular library has been added to a Particle project

##### Step 4 - Click on `Add to current project`

![Include in App](/assets/images/libraries/libraries-dev-use.png)

To add a firmware library to a project, click the `Use` button. You will be presented with two options -- `Add to current project` or `Copy to current project`.

- **Add to current project** will include the library as a line in your project's project.properties file and will be included by the Particle compiler when your project is verified or flashed.

- **Copy to current project** will download a local copy of the source files of the library to your project's `src` folder. The library can be inspected and modified before it is sent to the Particle compiler. If you copy a library into a project, the library files must be included in the `src` folder or they will not be compiled with the rest of your project.

Once you add the library to your Particle project, you should see a confirmation message

![Confirmation](/assets/images/libraries/libraries-dev-confirmation.png)

the library name and version number should be added to the `project.properties` file for your Particle project.

![Library included](/assets/images/libraries/libraries-dev-properties.png)

To make the library functionality available to your application, you add an include statement to your application source code.
The include statement names the library header file, which is the library name with a `.h` ending.  

For example, if we were using the library "UberSensor", it would be included like this:

```
#include "UberSensor.h"
```

**Congrats!** You have now added a firmware library to your Particle project in the Desktop IDE!

## Contribute a library

See the [detailed library guide](/getting-started/device-os/firmware-libraries/#contributing-libraries) to find more about contributing a library from the Desktop IDE.

## Targeting different platforms and firmware versions

Similarly to the [Web IDE](/getting-started/developer-tools/build/) you can specify exactly which platform (Core, Photon, Electron or others) you're using and at which specific firmware version your project is depending.

**Note:** By default all projects are compiled for latest version of firmware for a Photon.

To know what platform and version you are targeting take a look at the status bar:

![](/assets/images/local-ide/status-bar.png)

The first item is currently selected device. Once you select a different device, the target platform will be automatically changed to its platform.

The second one is the platform you want to target. Different platforms have different capabilities (i.e. Photon has WiFi but Electron has cellular instead) so keep in mind that some firmware methods might not exist or work differently (consult [the reference](/reference/device-os/firmware/) to make sure they will work as you expect).

Clicking on the platform name will allow you to select a different one:

![](/assets/images/local-ide/platforms.png)

**Note:** You can target platforms you don't own hardware of and at least test if the code compiles.

The last item is the firmware version aka the build target. This allows you to select exactly which version you want to use. When reading [the reference](/reference/device-os/firmware/) you might have noticed that some functions have a note saying: _Since X.Y.Z_. This specifies the minimum build target you need to use in order to have this function available.

When you use a version newer than's on your device (which can be checked
using `particle serial inspect` [CLI
command](/getting-started/developer-tools/cli/)) it will enter **safe mode**
which should be automatically fixed with multiple consecutive flashes.
The exception here is the Electron where updating Device OS versions would incur charges. In this case, the IDE will select the build target that's currently on the device in order to keep the device running.

Clicking on the build target will show the list of available ones for current platform:

![](/assets/images/local-ide/build-targets.png)

You can see that some of the build targets have a warning sign next to them. Those are pre-releases. They will bring the latest features but might not be as stable as the other releases. We encourage you to test them but only for experimental purposes (i.e. not in production).
