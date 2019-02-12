---
title: Workbench
layout: quickstart.hbs
columns: two
order: 10
---

# Quick start: Workbench

## Installation

- If you have not already done so, [download Visual Studio Code](https://code.visualstudio.com/) for Mac, Windows, or Linux. We recommend the Stable build. If you already have Visual Studio Code install you can add the Particle Workbench to your existing install.

- Open the [VisualStudio Marketplace](https://marketplace.visualstudio.com/items?itemName=particle.particle-vscode-pack) in your web browser.

- Click the green **Install** button and allow it to be opened in Visual Studio Code.

![Install](/assets/images/workbench/install1.png)

- Within Visual Studio code, click the green **Install** button to confirm the installation.

![Install](/assets/images/workbench/install2.png)

- Note that there will be a small confirmation window that pops up in the lower right corner of the window. Make sure you confirm the installation there.

![Install](/assets/images/workbench/install3.png)

The core installation will take a few minutes. There's an indicator at the top of the extensions panel that shows the install is still in progress. When complete, you'll be prompted to reload. Click the **Reload Now** button.

![Reload](/assets/images/workbench/reload.png)

After reload, some more components will be installed and you will be prompted to install the Particle Local Compiler. This is recommended.

![Local Compiler](/assets/images/workbench/install-local.png)

That's it!

## Create a project

To create your first project, you'll start with the Command Palette.

The Command Palette provides access to many commands such as open files, search for symbols, and see a quick outline of a file, all using the same interactive window. It can be invoked via `cmd+shift+p` on macOS or `ctrl+shift+p` on Linux and Windows.

In the Command Palette select **Particle: Create New Project**. The matching is very flexible - you don't have to type that whole thing in or scroll through the list. You could just type **project** and that would typically be the first match.

A small popup window will appear in the lower right corner of the window. It's easy to miss if you're not expecting it. Use the **Open** button to select the parent directory.

![Select Directory](/assets/images/workbench/new-project-dir.png)

For example, if you had a directory named "Projects" in your "Documents" directory where you kept your Workbench projects, you'd select **Projects**.

Then you'll be prompted for the name of your project. This will create a new directory within the directory you just selected. Your project files will be in that directory.

![Project Name](/assets/images/workbench/project-name.png)

Your first project workspace should look something like this:

![First Project](/assets/images/workbench/first-project.png)


## Compile a project

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

## Learn More

You can learn more about Workbench features in the [Particle Workbench Tutorial](/tutorials/developer-tools/workbench).
