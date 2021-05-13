---
title: Workbench
layout: commonTwo.hbs
columns: two
description: Getting started with Particle Workbench, desktop IDE for Windows, Mac OS, and Linux
---

# Quick start: Workbench

## Installation

### Windows

- Download the [Windows installer](https://binaries.particle.io/workbench/ParticleWorkbenchInstaller.exe) (.exe file).
- Double-click on the .exe file to begin installation.
- Continue with the instructions for all operating systems, below.
- Windows 7, 8, or 10 is required.

_NOTE: due to limitations with the local compiler's build system, usernames (or paths) with spaces cannot be supported at this time_

### Mac

- Download the [Mac installer](https://binaries.particle.io/workbench/ParticleWorkbenchInstaller.zip) (.zip file)
- Double-click on the .zip file to extract it.
- Double-click on the **Particle Workbench Installer** to begin installation.
- Continue with the instructions for all operating systems, below.
- Mac OS 10.12.0 (Sierra) or newer is required

_NOTE: If you are running Mac OS 10.15 (Catalina), please use Safari to download and unpack the installer `.zip` file ([settings](/assets/images/workbench-install-with-safari-settings.png)) - unpacking with the default Archive utility will not work_

### Linux

- Download the [Linux installer](https://binaries.particle.io/workbench/ParticleWorkbenchInstaller.AppImage) (.AppImage file)
- Right-click on the .AppImage file and select the **Allow executing file as program** option. Alternatively, use the `chmod a+x` command to enable execution of the .AppImage file.

![Set Executable](/assets/images/workbench/linux-set-executable.png)

- Double-click on the .AppImage to begin installation.
- Continue with the instructions for all operating systems, below.
- You will be prompted to authenticate as the super user up to 4 times during installation, for /usr/bin/apt and /bin/readlink:

![Authenticate](/assets/images/workbench/install7.png)

- Ubuntu Linux (or other Debian-style distribution) is required to use the installer.
- If you are having difficulties, there are [additional tips in the FAQ](https://support.particle.io/hc/en-us/articles/360039251434/#linux-tips).

### All Operating Systems

After clicking through the first two screens, you'll reach the first option. It is not necessary to install the Azure IoT toolkit.

![Install Options](/assets/images/workbench/install4.png)

Finally, when you reach the end of the install, both progress bars will reach 100% and the **Next** button will be enabled. You do need to click Next, otherwise you'll stay in that screen forever.

![Install complete](/assets/images/workbench/install5.png)

When prompted, be sure to click **Install** when asked to **Please install workbench dependencies**.


### VS Code already installed

If you already have VS Code installed, you can add in the Particle workbench extension. 

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

Before you can build in the cloud (the way Particle Web IDE and Particle CLI normally build), you need to select the device you wish to build for.

From the Command Palette select **Particle: Configure Project for Device**.

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
