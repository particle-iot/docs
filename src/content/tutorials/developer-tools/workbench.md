---
word: Workbench
title: Workbench
order: 20
columns: two
layout: tutorials.hbs
---

# Particle Workbench

{{!-- Tutorials: See ch25556 --}}


## Workbench Features

### Particle Commands

If you’re new to Visual Studio Code, the Command Palette will become a familiar part of the user interface. As the name implies, the Command Palette provides access to many commands such as open files, search for symbols, and see a quick outline of a file, all using the same interactive window. It can be invoked via `cmd+shift+p` on macOS or `ctrl+shift+p` on Linux and Windows.

Workbench adds custom Particle commands to the palette. Start typing `Particle` to see all the currently available commands.

![Command Palette](/assets/images/workbench/command-palette.png)

### Dependency Manager

Downloading and maintaining a local toolchain can be a full-time job so Workbench introduces a new dependency manager. It downloads the Device OS, build system, compiler, and anything else needed to develop and debug Device OS apps, and places them in a local, private location in user space as to not mess with your current configuration.

You can install and uninstall different versions of Device OS (and dependencies) with `Particle: Install Local Compiler`. You can uninstall unneeded versions just as easily.

![Dependency Manager](/assets/images/workbench/dependency-manager.png)


### Working with Particle Projects

You can initialize a new project with the command, `Particle: Create New Project`. Doing so will open a new a Visual Studio Code _Workspace_, an abstract concept of a collection of files and folders. The Workspace will include a scaffold of what is needed to begin developing your Particle project, like Tasks, C++ IntelliSense, Commands, files and folders. Note that these are designed to only work when editing Particle projects as to not muddy up the rest of your editing experience. 

![Workspace](/assets/images/workbench/workspace.png)


### Building & Flashing

#### Cloud Build

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

It's also possible to compile in the cloud and flash over USB. You might want to do this if you want flash over USB to an Electron or Boron and not use your cellular data.

After you've done **Particle: Cloud Compile** you'll notice a new .bin file created in your workspace. In this example, it's **electron_firmware_1548790892661.bin**.

From the Command Palette enter **Particle: Launch CLI**. 

The device must be connected by USB and in DFU mode (blinking yellow). Hold down the MODE (or SETUP) button while tapping RESET. Continue to hold down MODE (or SETUP) while the status LED blinks magenta (red and blue at the same time), until it blinks yellow, then release.

Then type in a command like:

```
particle flash --usb electron_firmware_1548790892661.bin
```

You can just type the first few letters of the filename then hit Tab to auto-complete the rest.

![Local Compiler](/assets/images/workbench/flash-binary-usb.png)


#### Local Build

Local build does all of the compiling locally on your computer, and, once installed, can be used even without an Internet connection.

In order to target a specific version of Device OS you must install the appropriate toolchain first. From the Command Palette select **Particle: Install Local Compiler**.

![Install Local Compiler](/assets/images/workbench/local-1.png)

Then select the version you want to install.

![Install Local Compiler Version](/assets/images/workbench/local-2.png)

When you build locally, you'll use the Build Tasks, launched with `cmd+shift+b` or `ctrl+shift+b`, not the Command Palette.

![Build Local](/assets/images/workbench/local-3.png)

Some of the options available include:

- Particle: Flash application (local)
- Particle: Flash application for debug(local)
- Particle: Flash application & Device OS (local)
- Particle: Compile application (local)
- Particle: Compile application for debug (local)
- Particle: Compile application & Device OS (local)

In order to use the Flash options, the device must be connected by USB and in DFU mode (blinking yellow). Hold down the MODE (or SETUP) button while tapping RESET. Continue to hold down MODE (or SETUP) while the status LED blinks magenta (red and blue at the same time), until it blinks yellow, then release.

Normally, Device OS (system firmware) is built by Particle and downloaded to your device if an upgrade is needed. User applications are generally small and fast to update because the Device OS is not normally downloaded.

With Workbench local builds, you can optionally flash both Device OS and your binary using the **Flash application & Device OS** option in Build Tasks. This will upgrade or downgrade the Device OS. It also allows you to make a modified Device OS and flash it to your device by USB.

There is also a monolithic build. It contains both the Device OS and your user application in a single binary. Using the **for debug** options creates a monolithic debug build. These binaries are large, but are better suited for use with the debugger. Also, because the boundary between Device OS and the user application is removed, it's possible to call more low-level system functions from monolithic builds.

There are even more tasks available such as `clean`, which can be viewed by selecting “Terminal > Run Tasks…” from the main menu. 


### IntelliSense

Workbench leans heavily on the built-in IntelliSense features of Visual Studio Code and the C++ language support provided by the official [C/C++](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools) extension. Workbench works behind the scenes to automatically configures the C/C++ extension work with Device OS.


You can see IntelliSense in action by starting to type `Particle.` and see suggestions for public functions.

![Intellisense](/assets/images/workbench/intellisense1.png)

Or possible arguments.

![Intellisense Arguments](/assets/images/workbench/intellisense2.png)

IntelliSense for C++ includes a slew of advanced features for you to explore. For example, you can “peek” to the definition of a function.

![Intellisense Peek](/assets/images/workbench/intellisense2.png)



### Integrated CLI

Workbench ships with a local copy of the Particle CLI (Command-Line Interface). The CLI powers many of the commands behind the scenes. It can also be accessed via the Integrated Terminal, which can be handy for features not yet exposed natively in Workbench. To open a CLI window, from the Command Palette enter **Particle: Launch CLI**.

In the Integrated Terminal window you can enter any Particle CLI commands, for example:

```
particle help
particle --version
particle libraries list
```

![Integrated CLI](/assets/images/workbench/cli.png)

### Integrated Serial Monitor

One handy debugging technique is to use the USB debug serial port. Open the Command Palette and select **Particle: Serial Monitor**.

Normally, when the device restarts (such as after flashing new code) the serial port is disconnected, but you are presented with an option to automatically reconnect or not.


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

Add one of the 3,000+ Device OS libraries with the `Particle: Install Library` command. Workbench will download the requested library, all its dependencies and even example projects. Note that there isn’t UI yet to search for Libraries so in the meantime you can use the CLI - which is described next.

![Libraries](/assets/images/workbench/libraries.png)

### Snippets

Code snippets are templates that make it easier to enter repeating code patterns, such as loops or conditional-statements. We’ve included snippets for the bits of code we use most often for your Device OS apps. For example, start typing `dw` and hit `tab` to expand the snippet. You can `tab` between input entries, which includes suggestions.

![Snippets](/assets/images/workbench/snippets.gif)


### Debugging

### Developing libraries




## Migration Guide

{{!-- See ch25559 --}}

### From Particle Web IDE (Build)

### From Particle Dev (Atom IDE)

