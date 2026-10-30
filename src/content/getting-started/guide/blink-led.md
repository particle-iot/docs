---
title: Blink an LED
columns: two
layout: commonTwo.hbs
description: Setting up a new Particle device
---

# {{title}}

{{section-nav}}


## Create new project

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Create New Project**.

{{imageOverlay src="/assets/images/getting-started-guide/workbench-create-new-project.png" class="no-darken"}}

You will be prompted to select the parent of the directory you want your project to be in. Each project is created in its own directory, and it will be created for you in the next step.

Workbench will often prompt you for input and confirmation at the top center of the window. Here's where you'd name the project, in this case, I entered **BlinkLed**.

{{imageOverlay src="/assets/images/getting-started-guide/workbench-name-project.png" class="no-darken"}}

It's recommended that you avoid using spaces or special characters (accented, emoji, etc.) in filenames. Spaces in directory and file names do not work at all on Linux and may have compatibility issues with some tools on Windows and Mac so it's best to just play it safe with alphanumeric characters only.

It's best to open a single project in VSCode at a time. Using **Particle: Create New Project** automatically does this. In other words, you open the directory containing a project, not a directory containing multiple projects. If you are switching between multiple projects, you can open multiple VSCode windows.


## Blink an LED

This is the Workbench window after creating the project. The **Explorer** panel in the upper left allows to to browse the files in your project.

I've opened the **src** (source) and clicked on **BlinkLed.cpp** to view the source file.

{{imageOverlay src="/assets/images/getting-started-guide/blinkled-window.png" class="no-darken"}}

- Particle devices are programmed in C++
- The style of programming is similar to programming an Arduino

In embedded programming, it's common for your first project to do nothing but blink an LED.

You can download the project here, or just copy and paste the BlinkLed.cpp source code into your Workbench window.

{{> project-browser project="BlinkLed" default-file="src/BlinkLed.cpp" height="400" flash="true"}}

## Configure project for device

Now that you've logged in and opened your project, you must tell Workbench which device you will be working with.

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Configure project for device**.

{{imageOverlay src="/assets/images/getting-started-guide/configure-project-1.png" class="no-darken"}}

Select the type of device you are using.

{{imageOverlay src="/assets/images/getting-started-guide/configure-project-2.png" class="no-darken"}}

Select the version of Device OS you will be using. Often, you will select the newest. There may be newer versions when you go through this guide, and you can just select the latest version.

{{imageOverlay src="/assets/images/getting-started-guide/configure-project-3.png" class="no-darken"}}

Finally, enter the name of the device you want to program. You can skip this by pressing Escape if you will be programming by USB and you only have one device connected to your computer.

{{imageOverlay src="/assets/images/getting-started-guide/configure-project-4.png" class="no-darken"}}

## Flashing code

There are two ways you typically compile and flash code:

- Local: compiling on your computer and flashing the device by USB
- Cloud: compiling the code in the Particle cloud and flashing the device OTA (over-the-air)

When using cellular devices, you can save on cellular data by flashing locally.

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Flash application (local)**.

A **Terminal** pane at the bottom of the window will appears with the build progress. It will sit in this state for a few minutes, but it will be much faster for subsequent builds.

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-1.png" class="no-darken"}}

When the build is done, a message similar to this will display:

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-2.png" class="no-darken"}}

If you are looking at your device, you will notice that it switches to 

- Blinking yellow: Programming the device by USB.
- Blinking green: Connecting to the network (cellular or Wi-Fi).
- Blinking cyan: Connecting to the Particle cloud.
- Fast blinking cyan: Last step of connecting to the Particle cloud.
- Breathing cyan: Successfully connected.

Also you should notice the blue status LED, which may be located next to the USB connector, or next to the D7 pin, blinking on and off once per second.

If you are monitoring the device page for your device in the console during this process, you'll see some cloud events as well:

{{imageOverlay src="/assets/images/getting-started-guide/flash-events.png" class="no-darken"}}


## Firmware introduction


{{section-nav}}

