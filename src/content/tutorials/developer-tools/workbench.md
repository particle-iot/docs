---
word: Workbench
title: Workbench
order: 20
columns: two
layout: tutorials.hbs
---

# Particle Workbench

{{!-- Tutorials: See ch25556 --}}

<div  align="center">
<br />
<a href="/quickstart/workbench/" class="button">INSTALL NOW</a>
</div>


## Workbench Features

### Left Toolbar

Typically, there is a toolbar on the left with frequently used features.

| Button | Purpose |
| --- | --- |
| <img src="/assets/images/workbench/left-bar-explorer.png" class="toolbarIcon" /> | File Explorer |
| <img src="/assets/images/workbench/left-bar-search.png" class="toolbarIcon" /> | Search and Replace |
| <img src="/assets/images/workbench/left-bar-source-control.png" class="toolbarIcon" /> | Source code control (like Git) |
| <img src="/assets/images/workbench/left-bar-debugger.png" class="toolbarIcon" /> | Source level debugger |
| <img src="/assets/images/workbench/left-bar-extensions.png" class="toolbarIcon" /> | Add or modify VS Code Extensions |
| <img src="/assets/images/workbench/left-bar-particle.png" class="toolbarIcon" /> | Particle Welcome Screen |


### Welcome Screen

![Welcome Screen](/assets/images/workbench/welcome.png)

The Welcome Screen has handy tips for using Workbench. If you close it, you can get it back by clicking on the Particle icon in the left toolbar.


### Particle Commands

If you’re new to Visual Studio Code, the Command Palette will become a familiar part of the user interface. As the name implies, the Command Palette provides access to many commands such as open files, search for symbols, and see a quick outline of a file, all using the same interactive window. It can be invoked via `cmd+shift+p` on macOS or `ctrl+shift+p` on Linux and Windows.

Workbench adds custom Particle commands to the palette. Start typing `Particle` to see all the currently available commands.

![Command Palette](/assets/images/workbench/command-palette.png)

### Dependency Manager

Downloading and maintaining a local toolchain can be a full-time job so Workbench introduces a new dependency manager. It downloads the Device OS, build system, compiler, and anything else needed to develop and debug Device OS apps, and places them in a local, private location in user space as to not mess with your current configuration.

You can install and uninstall different versions of Device OS (and dependencies) with **Particle: Install Local Compiler**. You can uninstall unneeded versions just as easily.

![Dependency Manager](/assets/images/workbench/dependency-manager.png)


### Working with Particle Projects

You can initialize a new project with the command, `Particle: Create New Project`. Doing so will open a new a Visual Studio Code _Workspace_, an abstract concept of a collection of files and folders. The Workspace will include a scaffold of what is needed to begin developing your Particle project, like Tasks, C++ IntelliSense, Commands, files and folders. Note that these are designed to only work when editing Particle projects as to not muddy up the rest of your editing experience. 

A project contains a number of files. Here's what's in a small sample project:

![Project Directories](/assets/images/workbench/project-directories.png)

- The **.vscode** directory contains your project-specific settings. The settings.json file allows you to override any setting on a per-project basis. It's also where your build firmware version, target platform, and target device are saved.
- The **src** directory contains your source file. If you created a .ino file for your main project file, after building you may see a .cpp file of the same name. This is because the .ino file is transformed into a .cpp before compiling. You can create multiple source files and header files in this directory.
- Not pictured here is the **libs** directory, at the same level as src. This contains the source to libraries that you have included. If you are cloud compiling, if you have the library listed in your project.properties file the cloud version of the library is used instead of the downloaded one in libs.
- The **target** directory contains local build output. In particular, the .bin file (Test1.bin) is the same binary you get from downloading from the Web IDE or CLI.
- The electron\_firmware\_1548790892661**.bin** (your filename will be different) at the top level is the result of a cloud compile for this project.
- The **project.properties** file specifies all of the libraries that this project uses.
- **README.md** is where you could put documentation for your project.
- The **.code-workspace** is the workspace settings file for VS Code. There are no particle-specific settings in it.

If you already have an existing Particle project (with a project.properties file), you can import it to create the necessary VS Code files by using the command **Particle: Import Project** from the command palette.

### Cloud build and flash

Before you can build in the cloud (the way Particle Web IDE, Particle Dev, and Particle CLI normally build), you need to select the device you wish to build for.

From the Command Palette select **Particle: Configure Workspace for Device**.

![Configure Device](/assets/images/workbench/config-device-1.png)

Then the device OS version you'd like to build for:

![Configure Device](/assets/images/workbench/config-device-2.png)

Then the type of device to you'd like to build for:

![Configure Device](/assets/images/workbench/config-device-3.png)

And finally the name or device ID of the device you want to flash to. You can leave this blank if you're going to flash by USB, or just want to test building.

![Configure Device](/assets/images/workbench/config-device-4.png)

To compile your program and download the binary, open the Command Palette and select **Particle: Cloud Compile**. To compile your program in the cloud and flash it to the selected device over-the-air, select **Particle: Cloud Flash**. 

![Compile or Flash](/assets/images/workbench/compile-flash.png)

It's also possible to compile in the cloud and flash over USB, as described in the section [Cloud build and flash locally](#cloud-build-and-flash-locally), below.


### Local build and flash

Local build does all of the compiling locally on your computer, and, once installed, can be used even without an Internet connection.

In order to target a specific version of Device OS you must install the appropriate toolchain first. From the Command Palette select **Particle: Install Local Compiler**.

![Install Local Compiler](/assets/images/workbench/local-1.png)

Then select the version you want to install.

![Install Local Compiler Version](/assets/images/workbench/local-2.png)

To compile and flash locally, use the Command Palette and select one of the local flash options:

- Particle: Flash application (local)
- Particle: Flash application for debug (local)
- Particle: Flash application & Device OS (local)

![Flash Local](/assets/images/workbench/local-3.png)

In order to use the Flash options, the device must be connected by USB and in DFU mode (blinking yellow). Hold down the MODE (or SETUP) button while tapping RESET. Continue to hold down MODE (or SETUP) while the status LED blinks magenta (red and blue at the same time), until it blinks yellow, then release.

There are also compile options, which compile the code and download a binary:

- Particle: Compile application (local)
- Particle: Compile application for debug (local)
- Particle: Compile application & Device OS (local)

![Compile Local](/assets/images/workbench/local-4.png)

Normally, Device OS (system firmware) is built by Particle and downloaded to your device if an upgrade is needed. User applications are generally small and fast to update because the Device OS is not normally downloaded.

With Workbench local builds, you can optionally flash both Device OS and your binary using the **Flash application & Device OS** option in Build Tasks. This will upgrade or downgrade the Device OS. It also allows you to make a modified Device OS and flash it to your device by USB.

There is also a monolithic build. It contains both the Device OS and your user application in a single binary. Using the **for debug** options creates a monolithic debug build. These binaries are large, but are better suited for use with the debugger. Also, because the boundary between Device OS and the user application is removed, it's possible to call more low-level system functions from monolithic builds.

The local compile and flash options are also available in the Build Tasks palette (`cmd+shift+b` or `ctrl+shift+b`).

If you are getting mysterious errors, sometimes it's helpful to do a clean to remove old objects that might be causing difficulties:

- Particle: Clean application (local)
- Particle: Clean application & Device OS (local)
- Particle: Clean application for debug (local)

![Clean Local](/assets/images/workbench/local-5.png)

### Compile and Flash Buttons

When you are viewing a .cpp or .ino file, there will be two new icons in the upper right corner:

![Clean Local](/assets/images/workbench/compile-flash-button.png)

| Button | Purpose |
| --- | --- |
| <img src="/assets/images/workbench/compile-button.png" class="toolbarIcon" /> | Compile |
| <img src="/assets/images/workbench/flash-button.png" class="toolbarIcon" /> | Compile and Flash |

By default, the **Compile** button invokes **Particle: Compile application & Device OS (local)**. Flash works similarly.

However you can make these buttons do other things, like cloud flash, by changing settings. From the menus, select **Code > Preferences > Settings** (Mac) or **File > Preferences > Settings** (Windows) and search for **compileButtonAction** and **flashButtonAction** to change the task to run when these buttons are used.

![Compile Button Action](/assets/images/workbench/compileButtonAction.png)

### Integrated CLI

Workbench ships with a local copy of the Particle CLI (Command-Line Interface). The CLI powers many of the commands behind the scenes. It can also be accessed via the Integrated Terminal, which can be handy for features not yet exposed natively in Workbench. To open a CLI window, from the Command Palette enter **Particle: Launch CLI**.

In the Integrated Terminal window you can enter any Particle CLI commands, for example:

```
particle help
particle --version
particle libraries list
```

![Integrated CLI](/assets/images/workbench/cli.png)

### Cloud build and flash locally

Combining the cloud compile and integrated CLI, you can, for example, compile in the cloud and then flash to an Boron or Electron over USB to save on cellular data usage.


After you've done **Particle: Cloud Compile** you'll notice a new .bin file created in your workspace. In this example, it's **electron\_firmware\_1548790892661.bin**.

From the Command Palette enter **Particle: Launch CLI**. 

The device must be connected by USB and in DFU mode (blinking yellow). Hold down the MODE (or SETUP) button while tapping RESET. Continue to hold down MODE (or SETUP) while the status LED blinks magenta (red and blue at the same time), until it blinks yellow, then release.

Then type in a command like:

```
particle flash --usb electron_firmware_1548790892661.bin
```

You can just type the first few letters of the filename then hit Tab to auto-complete the rest.

![Local Compiler](/assets/images/workbench/flash-binary-usb.png)



### Integrated Serial Monitor

One handy debugging technique is to use the USB debug serial port. Open the Command Palette and select **Particle: Serial Monitor**.

Normally, when the device restarts (such as after flashing new code) the serial port is disconnected, but you are presented with an option to automatically reconnect or not.


### IntelliSense

Workbench leans heavily on the built-in IntelliSense features of Visual Studio Code and the C++ language support provided by the official [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) extension. Workbench works behind the scenes to automatically configures the C/C++ extension work with Device OS.


You can see IntelliSense in action by starting to type `Particle.` and see suggestions for public functions.

![Intellisense](/assets/images/workbench/intellisense1.png)

Or possible arguments.

![Intellisense Arguments](/assets/images/workbench/intellisense2.png)

IntelliSense for C++ includes a slew of advanced features for you to explore. For example, you can “peek” to the definition of a function.

![Intellisense Peek](/assets/images/workbench/intellisense2.png)


### Particle Themes

Workbench includes two Particle-inspired theme to add a little pizazz to Workbench, **Matter (by Particle)** and **Dark Matter (by Particle)**.

To change the color theme, open the Command Palette and select **Preferences - Color Theme**.

![Themes](/assets/images/workbench/themes.png)

You can scroll through the list to try out the available themes, or select **Install Additional Color Themes** to select one from the Marketplace. There are a lot of them!

### Keymaps

If you are used to a different development environment, you can use  keymaps to switch the keyboard shortcuts to be similar to the other environment.

To change the keymap, open the Command Palette and select **Preferences: Keymaps**.

Some popular options include:

- Vim
- Sublime
- Atom (Particle Dev is based on Atom)
- IntelliJ
- Visual Studio
- Eclipse
- Emacs

and many more!

### Particle Libraries

Add one of the 3,000+ Device OS libraries with the **Particle: Install Library** command. Workbench will download the requested library, all its dependencies and even example projects.

![Libraries](/assets/images/workbench/libraries.png)

You can search for libraries from the command palette by using **Particle: Find Libraries**. 

For example, I used the **Particle: Install Library** to install the **AssetTrackerRK** library. In the file navigation, you can see the two libraries that it included automatically, AssetTrackerRK and LIS3DH.

Navigating into AssetTrackerRK you can see the source and examples, and also the README.md file. That contains the documentation in most libraries.

![Library Read Me](/assets/images/workbench/library-readme.png)


### Snippets

Code snippets are templates that make it easier to enter repeating code patterns, such as loops or conditional-statements. We’ve included snippets for the bits of code we use most often for your Device OS apps. For example, start typing `dw` and hit `tab` to expand the snippet. You can `tab` between input entries, which includes suggestions.

![Snippets](/assets/images/workbench/snippets.gif)


### Debugging (3rd-generation)

For this tutorial, you'll use the [TinkerBreak source](/assets/files/eclipse-debug/tinkerbreak.cpp). This is the same application used in the [Eclipse Debug Tutorial](/support/particle-tools-faq/eclipse-debug/). As you'll see, this is way easier in Workbench! 

- Create a new project using the Command Palette and **Particle: Create New Project**.
- Rename TinkerBreak.ino to TinkerBreak.cpp. Paste in the [TinkerBreak source](/assets/files/eclipse-debug/tinkerbreak.cpp) into TinkerBreak.cpp.

![Debug Workspace](/assets/images/workbench/debug-1.png)

- From the Command Palette select **Particle: Configure Workspace for Device** and choose the Device OS and type of device you want to use.
- Connect the Particle Debugger using the ribbon cable to your Argon, Boron, or Xenon device.
- Connect the device to your computer by USB.
- Click the Debug icon (1), then select the correct Debugger (2). In this case, it's **Particle Debugger (argon, boron, xenon)**. Note that you need to select the type of device in both places!

![Debug View](/assets/images/workbench/debug-2.png)

- Hold down the MODE (or SETUP) button while tapping RESET. Continue to hold down MODE (or SETUP) while the status LED blinks magenta (red and blue at the same time), until it blinks yellow, then release.
- Click the green arrow next to DEBUG in the upper left to build, flash, and begin debugging.
- After flashing the device will typically halt. You can tell because the device status LED will go off.

![Debug Console](/assets/images/workbench/debug-3.png)

- Click **Debug Console** (1). The error shown is normal.
- Click **Continue** (2). The device should boot up normally and get to breathing cyan.

You're now debugging the application!

- From the Command Palette select **Particle: Launch CLI**. In the CLI window, enter a command like:

```
particle call argon2 break
```

Replace argon2 with the name of the device you're testing with. This should call a function via the cloud.

- The command is entered in the Terminal tab (1).
- Execution has stopped at the code breakpoint (2).
- You can see the call stack (3).
- You can continue execution using **Continue** (4).

![Debug Console](/assets/images/workbench/debug-4.png)

You can also set your own breakpoints.

- Scroll down to line 51. Click to the left of the line number so a red dot appears (1)
- You'll also see it listed in the breakpoints tab (2).

![Debug Break](/assets/images/workbench/debug-5.png)

- From the Terminal window, enter a command like:

```
particle call argon2 div 10
```

- Now you can see the execution has stopped (1). Sometimes it won't stop exactly on the line you put the breakpoint on.
- The call stack (2) is much more interesting this time.
- You can see the variables (3)!
- When done, **Continue** (4).

![Debug Breakpoint](/assets/images/workbench/debug-6.png)

That is just a brief introduction to debugging. For more information, see the [VS Code Debugging Documentation](https://code.visualstudio.com/docs/editor/debugging).


### Debugging (2nd-generation with Particle Debugger)

- Create a new project using the Command Palette and **Particle: Create New Project**. If you already created a project for the 3rd-generation device, you can just reuse that one.
- Rename TinkerBreak.ino to TinkerBreak.cpp. Paste in the [TinkerBreak source](/assets/files/eclipse-debug/tinkerbreak.cpp) into TinkerBreak.cpp.

![Debug Workspace](/assets/images/workbench/debug-1.png)

- From the Command Palette select **Particle: Configure Workspace for Device** and choose the Device OS and type of device you want to use. In this example, a Photon is used.
- Connect the Particle Debugger to your device.

With the Particle Debugger positioned like this, USB connector toward you and the headers facing up:

![Debugger](/assets/images/debugger1.jpg)

| Left Header | Right Header |
| --- | ----- |
| VDD | SWCLK |
| RTS | SWDIO |
| RX  | NC    |
| TX  | NC    |  
| CTS | GND   | 
| GND | VUSB  |

You need to connect:

| Pin | Function | Color |
| --- | --- | --- |
| GND | GND | Black |
| D7 | SWDIO | Green | 
| D6 | SWCLK | Blue |


![Debugger](/assets/images/workbench/debug-11.jpg)

- Connect the device to your computer by USB.
- Click the Debug icon (1), then select the correct Debugger (2). In this case, it's **Particle Debugger (photon, p1, electron)**. Note that you need to select the type of device in both places!

![Debug Workspace](/assets/images/workbench/debug-10.png)

The rest of the instructions are the same as for 3rd-generation. Start with the putting your device in DFU mode step.


## Migration Guide

{{!-- See ch25559 --}}

### From Particle Web IDE (Build)

One big change from the Web IDE is the lack of the icon bar on the left. Most replacements are available from the Command Palette (`cmd+shift+p` on Mac OS or `ctrl+shift+p` on Linux and Windows).


| Button | Label | Replacement |
| --- | --- | --- |
| <img src="/assets/images/workbench/webide-flash.png" class="toolbarIcon" /> | Flash | Command Palette **Particle: Cloud Flash** |
| <img src="/assets/images/workbench/webide-verify.png" class="toolbarIcon" /> | Verify | Command Palette **Particle: Cloud Compile** |
| <img src="/assets/images/workbench/webide-code.png" class="toolbarIcon" /> | Code | You create a new app from the Command Palette **Particle: Create New Project**. If you use **Particle: Cloud Compile** the binary will be downloaded to the top level of your project so there isn't a separate download button. Since the files are already on your hard drive there is no project download button. Share this Revision is not supported in Workbench. |
| <img src="/assets/images/workbench/webide-libraries.png" class="toolbarIcon" /> | Libraries | Command Palette **Particle: Find Library** and **Particle: Install Library** |
| <img src="/assets/images/workbench/webide-docs.png" class="toolbarIcon" /> | Docs | Go to [https://docs.particle.io](https://docs.particle.io) |
| <img src="/assets/images/workbench/webide-devices.png" class="toolbarIcon" /> | Devices | Command Palette **Particle: Configure Workspace for Device** |
| <img src="/assets/images/workbench/webide-console.png" class="toolbarIcon" /> | Console | Go to [https://console.particle.io](https://console.particle.io) |

### From Particle Dev (Atom IDE)

One big change from Particle Dev is the lack of the icon bar on the left. Most replacements are available from the Command Palette (`cmd+shift+p` on Mac OS or `ctrl+shift+p` on Linux and Windows).

| Button | Label | Replacement |
| --- | --- | --- |
| <img src="/assets/images/workbench/dev-flash.png" class="toolbarIcon" /> | Compile in cloud and upload using cloud | Command Palette **Particle: Cloud Flash** |
| <img src="/assets/images/workbench/dev-verify.png" class="toolbarIcon" /> | Compile in cloud and show errors if any | Command Palette **Particle: Cloud Compile** |
| <img src="/assets/images/workbench/dev-new-project.png" class="toolbarIcon" /> | Start a New Project | Command Palette **Particle: Create New Project** |
| <img src="/assets/images/workbench/dev-libraries.png" class="toolbarIcon" /> | Browse and manage Particle libraries | Command Palette **Particle: Find Library** and **Particle: Install Library** |
| <img src="/assets/images/workbench/dev-manage-library.png" class="toolbarIcon" /> | Manage current library | No replacement at this time. |
| <img src="/assets/images/workbench/dev-docs.png" class="toolbarIcon" /> | Docs | Go to [https://docs.particle.io](https://docs.particle.io)  |
| <img src="/assets/images/workbench/dev-devices.png" class="toolbarIcon" /> | Devices | Command Palette **Particle: Configure Workspace for Device** |
| <img src="/assets/images/workbench/dev-console.png" class="toolbarIcon" /> | Console | Go to [https://console.particle.io](https://console.particle.io) |
| <img src="/assets/images/workbench/dev-serial.png" class="toolbarIcon" /> | Show Serial Monitor | Command Palette **Particle: Serial Monitor**. |


![Particle Dev Menu](/assets/images/workbench/dev-menu.png)

- The **Log out** menu item is replaced by the Command Palette **Particle: Logout** (and **Particle: Login**).
- The **Select device...** meny item is replaced by the Command Palette **Particle: Configure Workspace for Device**.
- The **Claim device...** menu item can be replaced by using the Command Palette **Particle: Launch CLI** and using the `particle device add DEVICE_ID` CLI command.
- The **Identify device...** menu item done replaced by the Command Palette **Particle: Launch CLI** and using the `particle nyan DEVICE_NAME` CLI command.
- The **Compile in Cloud** menu item is replaced by Command Palette **Particle: Cloud Compile**.
- The **Show serial monitor** menu item is replaced by Command Palette **Particle: Serial Monitor**.
- The **Show cloud variables** and **Show cloud functions** menu items do not have a direct replacement but the Command Palette **Particle: Launch CLI** and using the `particle list` CLI command does return the same information (for all of your devices).


![Particle Dev Status Bar](/assets/images/workbench/dev-status.png)

In the bottom status bar:

- The device selector is replaced by the Command Palette **Particle: Configure Workspace for Device**.
- The other status bar information is displayed on the VS Code status bar. If the status bar is not visible, you can change that using Command Palette **View: Toggle Status Bar Visibility**.

If you are used to the editing keyboard shortcuts, you can install the Atom keymap. Open the Command Palette and select **Preferences: Keymaps**.

## Learn More

Additional questions and answers are in the [FAQ](/support/particle-tools-faq/workbench).

