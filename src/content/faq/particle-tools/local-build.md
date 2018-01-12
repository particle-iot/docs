---
title: Local build using gcc-arm
layout: faq.hbs
columns: two
devices: [ photon,electron,core ]
order: 1001
---

# Local build using gcc-arm

It is possible to build both user and system firmware locally using the gcc-arm toolchain on Windows, Mac and Linux. There are a few reasons you might be interested in doing this:

- To make a custom modification to system firmware
- To test out system firmware change that hasn't been released yet
- To work entirely offline, with no Internet access
- To use the GDB debugger

This note explains how to do a fully native installation. It's also possible to do a Docker installation. And, of course, you can use the cloud compilers [Particle Build](https://build.particle.io), [Particle Dev](/guide/tools-and-features/dev/), or [Particle CLI](/guide/tools-and-features/cli/) which are much easier to install and use.

## Installation - Windows

### Install Cygwin - Windows

You should use Cygwin or MinGW, depending on what you already have or prefer. It is not necessary to install using both. If you prefer MinGW, skip to the next section.

This step uses Cygwin to provide command-line build support. You should install Cygwin first:

[https://cygwin.com](https://cygwin.com/install.html)

- You will typically download **setup-x86_64.exe** (for 64-bit Windows) or **setup-x86.exe** (for 32-bit Windows).
- Run the setup program, click **Next >**.

- You will typically use the default settings in chose installation type page, **Install from Internet** then click **Next >>**.

- Use the default settings in choose installation directory page (root directory of **c:\cygwin64** or **c:\cygwin** and **All Users**), then click **Next >**.

- Use the default settings in the select local package directory page, then click **Next >**.

- Use the default settings in the connection page (**Direct Connection**), then click **Next >**.

- Select a mirror from the following page (it usually doesn't matter which one), then click **Next >** and you'll get a list of packages to choose from.

- Expand **Devel** by clicking on the + in a box (pointed to by the purple arrow).

![Expand Devel](/assets/images/local-build-01expand.png)

- Select **make: The GNU version of the 'make' utility.** Click on arrows to enable downloading of the binary. Only the **Bin?** checkbox needs to be checked. Click **Next >**.

![Select Make](/assets/images/local-build-02selectmake.png)

- Accept the default settings on the resolving dependencies page and click **Next >**.

The download will take a few minutes. Then click **Finish**.

You'll need to use the **Cygwin Terminal** for entering your build commands, not the standard Windows Command Prompt. The installer puts a shortcut on your desktop for it.

### Install MinGW - Windows

You should install using Cygwin or MinGW, depending on what you already have or prefer. It is not necessary to install using both. If using Cygwin, skip to the next section.

The official web site for MinGW is [http://mingw.org/](http://mingw.org/).

- Use the **Download Installer** link in the upper right corner of the window to download the installer, then run it.

- In the **MinGW Installation Manager** screen, select **mingw-developer-toolkit** and then click on the checkbox and select **Mark for Installation**.

![MinGW select package](/assets/images/local-build-08mingwinst.png)

- Then, from the **Installation** menu select **Apply Changes**. And click **Apply** in the confirmation window.

- If you did not get a **MinGW Shell** icon on your desktop or Startup menu, you may want to create one. Go into **Computer > Local Disk (C:) > MinGW > msys > 1.0** in the Windows File Explorer. Select **msys.bat** (the msys file of type Windows Batch File), right click and select **Create Shortcut**. I like to rename this to **MinGW Shell** and drag it to the desktop.

![MinGW select package](/assets/images/local-build-09mingwshortcut.png)

You'll need to use the **MinGW Shell** for entering your build commands, not the standard Windows Command Prompt, so you'll probably want a handy shortcut to it.

### Download the gcc-arm toolchain - Windows

The gcc-arm toolchains are here: [https://launchpad.net/gcc-arm-embedded](https://launchpad.net/gcc-arm-embedded)

Currently, the 4.9-2015-q3-update is recommended. The 5.3.1 version can be used now and will be used for cloud compiles starting with system firmware 0.7.0. The 5.4.x and 6.x versions are not recommended at this time.

- For Windows, download the installer [gcc-arm-none-eabi-4_9-2015q3-20150921-win32.exe](https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-win32.exe).

- Run the installer. Select **Next >** and **I Agree** for the terms and conditions of the license.

- You can use the default install location, or select another. The default location may vary, but on 64-bit Windows is typically:
C:\Program Files (x86)\GNU Tools ARM Embedded\4.9 2015q3

- On the final page, be sure to select **Add path to environment variable** before clicking **Finish**. This is not the default and it is required for the builds to work properly.

![Add path](/assets/images/local-build-03addpath.png)

To test your installation open a new Command Prompt window and enter the command:

```bash
arm-none-eabi-gcc --version
```

It should report back something like:

```bash
C:\Users\User>arm-none-eabi-gcc --version
arm-none-eabi-gcc (GNU Tools for ARM Embedded Processors) 4.9.3 20150529 (release) [ARM/embedded-4_9-branch revision 227977]
Copyright (C) 2014 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

This should also work from the Cygwin Terminal or MinGW Shell.


### Install git - Windows

- Go to [https://git-scm.com/](https://git-scm.com/) and download the latest Windows version for your type of Windows. In my case, I downloaded 2.10.2 for 64-bit Windows.

- Run the installer and select **Next >** to accept the license terms.

- You will typically install in the default location (**C:\Program Files\Git**) and click **Next >**.

- The default components should be fine and click **Next >**. The startup menu default is usually fine, click **Next >**.

- You generally will want to use the **Use Git from the Windows Command Prompt** option, which should be the default, click **Next >**.

- In the next screen, it's usually best to change the setting to **Checkout as-is, commit Unix-style line endings**. Make sure you change that before clicking **Next >**.

![Line endings](/assets/images/local-build-04lineendings.png)

- Either option can be selected in the next screen, **Use MinTTY (the default terminal of MSYS2)** is the default and is usually fine. Click **Next >**.

- The default options on the last screen are generally fine. Click **Install**.

- After installation, open a new Command Prompt window and enter the command:

```bash
git --help
```

- If it returns help, then your installation was probably successful. (Note that you will need to open a new command prompt window, windows that were open before won't have the PATH updated, and won't be able to use git yet.)

### Install dfu-util - Windows

If you have not already done so, you should install dfu-util and the necessary drivers. If you have used the [Particle Windows CLI installer](https://binaries.particle.io/cli/installer/windows/ParticleCLISetup.exe), this will have been already.

There are also additional instructions in the [FAQ for installing dfu-util](/faq/particle-tools/installing-dfu-util/).

### Install other build tools - Windows

There are two tools needed by the standard Makefiles: xxd and crc32.

- Download the [buildtools_win.zip](/assets/files/buildtools_win.zip) file and extract the contents. Then copy the crc32.exe and xxd.exe application to a suitable location. I like to use /usr/local/bin because it's automatically added to your Cygwin or MinGW path so it will be found by the build tools.

(Incidentally, crc32 is named this because it generates 32-bit cyclic redundancy checks, and has nothing to do with the difference between Windows 32-bit and Windows 64-bit.)

Cygwin64 (replace IEUser with your Windows username):

```bash
cd /cygdrive/c/Users/IEUser/Downloads/buildtools_win/buildtools_win/cygwin64
cp *.exe /usr/local/bin
```

Cygwin32 (replace IEUser with your Windows username):

```bash
cd /cygdrive/c/Users/IEUser/Downloads/buildtools_win/buildtools_win/cygwin32
cp *.exe /usr/local/bin
```

MinGW32 (replace IEUser with your Windows username):

```bash
mkdir -p /usr/local/bin
cd /c/Users/IEUser/Downloads/buildtools_win/buildtools_win/mingw32
cp *.exe /usr/local/bin
```

There are additional instructions in the README.md file if necessary, including how to rebuild the tools from the included source code.


## Installation - Mac

### Download the gcc-arm toolchain - Mac

Some of the other instructions use Homebrew, but they update their current compiler more frequently than Particle does, and it can cause build problems. It's easy to just download a specific version from Canonical, instead:

- The gcc-arm toolchains are here: [https://launchpad.net/gcc-arm-embedded](https://launchpad.net/gcc-arm-embedded)

Currently, the 4.9-2015-q3-update is recommended. The 5.3.1 version can be used now and will be used for cloud compiles starting with system firmware 0.7.0. The 5.4.x and 6.x versions are not recommended at this time.

- Download the [gcc-arm-none-eabi-4_9-2015q3-20150921-mac.tar.bz2](https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-mac.tar.bz2) release.

- Extract the archive file, then move the directory into a permanent location. I like /usr/local/gcc-arm.

```bash
os-x-10:~ rickk$ sudo mv Downloads/gcc-arm-none-eabi-4_9-2015q3 /usr/local/gcc-arm
```

- Edit ~/.profile and add this:

```bash
# gcc-arm toolchain                                                             
export PATH=$PATH:/usr/local/gcc-arm/bin
```

- Close the Terminal window and reopen it. Then you can check that ARM gcc is in your path:

```bash
os-x-10:~ rickk$ arm-none-eabi-gcc --version
arm-none-eabi-gcc (GNU Tools for ARM Embedded Processors) 4.9.3 20150529 (release) [ARM/embedded-4_9-branch revision 227977]
Copyright (C) 2014 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```


### Install git - Mac

- Go to [https://git-scm.com/](https://git-scm.com/) and download the [latest Mac installer](https://git-scm.com/download/mac). I used 2.10.1.

- Run the installer. Depending on your security settings, you may get an error that it is from an unidentified developer. Go into **Apple Menu - System Preferences - Security and Privacy** and click the **Open Anyway** button.

![open anyway](/assets/images/local-build-05openanyway.png)

- When complete you should be able to open a Terminal window and use git -- version to check the version.

```bash
os-x-10:~ rickk$ git --version
git version 2.10.1
```



### Install dfu-util - Mac

If you have not already done so, you should install dfu-util.

```bash
brew install dfu-util
```

There are additional instructions in the [FAQ for installing dfu-util](/faq/particle-tools/installing-dfu-util/) including installing Homebrew if necessary or using MacPorts if you use that instead of Homebrew.

## Installation - Linux

I ran these tests on Ubuntu 16.04 LTS 64-bit; you will need to adjust some of the commands for other distributions that use other package managers.

Also note that the pre-built gcc-arm toolchains are for x86 architecture only. They cannot be used on other CPU architectures such as the ARM used in the Raspberry Pi, even though it's also running Linux.


### Download the gcc-arm toolchain - Linux

The gcc-arm toolchains are here:  
[https://launchpad.net/gcc-arm-embedded](https://launchpad.net/gcc-arm-embedded)

Currently, the 4.9-2015-q3-update is recommended. The 5.3.1 version can be used now and will be used for cloud compiles starting with system firmware 0.7.0. The 5.4.x and 6.x versions are not recommended at this time.

- Download the [gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2](https://launchpad.net/gcc-arm-embedded/4.9/4.9-2015-q3-update/+download/gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2) file.

- Extract it and move it to the permanent location. I like /usr/local/gcc-arm.

```bash
rickk@ubuntu:~$ cd Downloads
rickk@ubuntu:~/Downloads$ bzip2 -d gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar.bz2
rickk@ubuntu:~/Downloads$ tar xf gcc-arm-none-eabi-4_9-2015q3-20150921-linux.tar
rickk@ubuntu$ sudo mv gcc-arm-none-eabi-4_9-2015q3 /usr/local/gcc-arm
```

- Edit ~/.profile and add this:

```bash
# gcc-arm toolchain                                                             
export PATH=$PATH:/usr/local/gcc-arm/bin
```

- Log out and log back in again.

- Try to run the gcc ARM cross-compiler:

```bash
rickk@ubuntu:~$ arm-none-eabi-gcc --version
arm-none-eabi-gcc (GNU Tools for ARM Embedded Processors) 4.9.3 20150529 (release) [ARM/embedded-4_9-branch revision 227977]
Copyright (C) 2014 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

If you get a "No such file or directory" on a 64-bit Linux installation even if you can see the file in the directory:

```bash
rickk@ubuntu:/usr/local/gcc-arm/bin$ ./arm-none-eabi-gcc
bash: ./arm-none-eabi-gcc: No such file or directory
```

it is likely that you need to install the 32-bit libraries:

```bash
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386
```

### Install git - Linux

Installing git on Linux is easy:

```bash
sudo apt-get install git
```

### Install dfu-util - Linux

Installing dfu-util on Linux is easy:

```bash
sudo apt-get install dfu-util
```

By default, dfu-util requires sudo (root access) to run. This will cause a problem using the program-dfu option in make, and many other locations.

The easiest solution is to install the [Particle CLI](/guide/tools-and-features/cli/), however you can also manually install a udev rule:

- Download the [50-particle.rules](/assets/files/50-particle.rules) file, then:

```bash
sudo cp 50-particle.rules /etc/udev/rules.d/
```

- You will probably need to reboot after installing this.

## Building

### Selecting a source directory

One of the things you need to do is decide where to store your source. For the examples here, I've used the following.

#### Source directory - Windows

For Windows, I used: **Documents\src**

In other words, the src directory in the user's documents directory. This is easy to get to. The full path depends on your username, but in the examples here, you might see: **c:\Users\IEUser\Documents\src**.

Making this slightly more confusing is that when you use Cygwin Terminal the Windows paths are mapped into Unix-style paths, so that same directory is **/cygdrive/c/Users/IEUser/Documents/src**. Also beware that the ~ directory in Cygwin is a Unix-style home directory in **/home/IEUser**, not your Windows home directory!

If you are using MinGW instead of Cygwin under Windows, the path would be **/c/Users/IEUser/Documents/src**.

![Windows directory structure](/assets/images/local-build-07windirs.png)

#### Source directory - Mac

For the Mac, I used: **Documents/src**

In other words, the src directory in the user's documents directory, for example, **/Users/rickk/Documents/src**.

#### Source directory - Linux

For Linux, I used: **Documents/src**

In other words, the src directory in the user's documents directory, for example, **/home/rickk/Documents/src**. Remember that Linux paths are case-sensitive.



### Check out the source

- Use cd to position yourself into the src directory, as described above.

- Once you have Git installed, getting the source is easy:

```bash
git clone https://github.com/particle-iot/firmware.git
cd firmware
git checkout release/stable
```

- The checkout command used to specify "latest" instead of "release/stable" but you should now use "release/stable" instead.

- Then do a build. This will build all of the system firmware, plus Tinker, for the Photon.

### Building

```bash
cd modules
make all PLATFORM=photon
```

These commands work for Windows, Linux and Mac. For Windows, remember to use the Cygwin Terminal or MinGW Shell, not the regular Windows Command Prompt.

- If you update the source, make sure you add the clean option:

```bash
cd modules
make clean all PLATFORM=photon
```

- If you're building for the Electron:

```bash
cd modules
make all PLATFORM=electron
```

- If you're building for the P1:

```bash
cd modules
make all PLATFORM=P1
```

These commands build the system firmware and Tinker. You can find the built binaries in the following locations after a successful build.

**Photon:**

- firmware/build/target/system-part1/platform-6-m/system-part1.bin
- firmware/build/target/system-part2/platform-6-m/system-part2.bin
- firmware/build/target/user-part/platform-6-m/user-part.bin

**Electron:**

- firmware/build/target/system-part1/platform-10-m/system-part1.bin
- firmware/build/target/system-part2/platform-10-m/system-part2.bin
- firmware/build/target/system-part3/platform-10-m/system-part3.bin
- firmware/build/target/user-part/platform-10-m/user-part.bin



### Building using APPDIR

I like to use the APPDIR feature to keep my code separate from the firmware repository.

- For this example I created a new directory in my src directory, as described above.

```bash
cd src
mkdir blinkled
```

- And I created the file blinkled.cpp. It's very slightly modified from the source in the [Particle example](/guide/getting-started/examples/photon/#blink-an-led).

```bash
cd firmware/modules
make all PLATFORM=photon APPDIR=../../blinkled
```

- This builds everything, including system firmware. You will probably want to do this once, but for subsequent builds, you can save a lot of time by using the command:

```bash
cd firmware/main
make all PLATFORM=photon APPDIR=../../blinkled
```

Here's what a build window might look like in the Cygwin Terminal:

![Windows build](/assets/images/local-build-06winbuild.png)

If you look in the **target** directory in the blinkled directory you'll find a **blinkled.bin**. This is the user firmware binary that you can flash using the Particle CLI:

```bash
particle flash YOUR_DEVICE_NAME target/blinkled.bin
```

Or, with the device in DFU mode (blinking yellow)

```bash
particle flash --usb target/blinkled.bin
```

Or, with the device in listening mode (blinking dark blue):

```bash
particle flash --serial target/blinkled.bin
```

## Building with libraries

To use libraries with local build you should use the [extended project structure](https://docs.particle.io/guide/tools-and-features/libraries/#project-file-structure) within the APPDIR.

It looks like this:

```
myappdir
  project.properties
  src
    myapp.cpp
  lib
```

You can start out with an empty file for project.properties. 

To add a library you typically cd into myappdir then use a [CLI library copy command](/guide/tools-and-features/cli/electron/#using-libraries) for example:

```
particle library copy neopixel
```

This copies the source to the neopixel library to lib/neopixel.

If you have a project in the extended format, building with APPDIR automatically builds all of the libraries in lib as well, and all of the src directories in the libraries are added to the include search path, so for example you can just:

```
#include "neopixel.h"
```

## Including additional header directories

Sometimes you want to include other directories as locations for header files. For example, say you are using the [extended project structure](/guide/tools-and-features/libraries/#project-file-structure) within the APPDIR with the following layout:

```
myappdir
  project.properties
  inc
    testinc.h
  src
    main.cpp
    build.mk
```

The project.properties can be an empty file; it just signifies that you are using the extended project layout.

This is my main.cpp. Of note is that it just includes testinc.h, not inc/testinc.h.

```
#include "Particle.h"

#include "testinc.h"

void setup() {
	Serial.begin(9600);
}

void loop() {
}
```

Adding additional include directories requires adding a build.mk file in your src directory. The first part should be the standard boilerplate.

But after that, you can add other things, such as adding additional include directories.

```
# Standard behavior must be included here
INCLUDE_DIRS += $(SOURCE_PATH)/$(USRSRC)  # add user sources to include path
CPPSRC += $(call target_files,$(USRSRC_SLASH),*.cpp)
CSRC += $(call target_files,$(USRSRC_SLASH),*.c)

APPSOURCES=$(call target_files,$(USRSRC_SLASH),*.cpp)
APPSOURCES+=$(call target_files,$(USRSRC_SLASH),*.c)

# Custom stuff can be added here
INCLUDE_DIRS += $(SOURCE_PATH)/inc
```


## Flashing using DFU during build

This technique is handy with an Electron where you want to flash over USB, though it also works with the Photon:

```bash
cd firmware/main
make all PLATFORM=electron program-dfu APPDIR=../../blinkled
```

If you used firmware/modules instead, it would DFU the system and the user firmware, which is handy because it will load both system and user firmware at once with a single command.
