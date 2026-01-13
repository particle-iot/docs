---
title: Workbench FAQ
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

* [Installation Instructions](/quickstart/workbench/)
* [Tutorial](/getting-started/developer-tools/workbench/)
* [Step by Step Video Guide](https://www.youtube.com/watch?v=w7xOmJR2HeE)

### Reporting bugs and feedback

- Follow the instructions in [this community forum post](https://community.particle.io/t/how-to-report-bugs-and-provide-feedback/52361) to report bugs or provide feedback.

- The [Developer Tools - Workbench Category](https://community.particle.io/c/dt/particle-workbench/43) in the community forums should be used for Workbench support.

### Working with a custom Device OS build

It's possible to work with a non-released branch, fork, or manually merged PRs of Device OS.

* Get the latest Device OS source from GitHub. You'll need to have the command line version of git available in order to retrieve the submodules.

```
git clone https://github.com/particle-iot/device-os
cd ./device-os
git checkout develop
git submodule update --init --recursive

```

* Launch Visual Studio Code
* Navigate to your Particle settings ([docs](https://code.visualstudio.com/docs/getstarted/settings)) and set the `Custom Device OS Location`

![Particle Global Settings](/assets/images/support/settings-custom-deviceos-location.png)

* Enter the absolute path to your Device OS source code and reload when prompted
* Open a Particle project and open a source file
* Click on the Device OS entry in the status bar to display a list of available toolchains

![Particle Project Settings](/assets/images/support/statusbar-project-settings.png)

* Select the `deviceOS@source` entry - it should be first in the list
* Wait for the toolchain to install and activate
* Run commands ([docs](/getting-started/developer-tools/workbench/#particle-commands)) and local compilation tasks as normal ([docs](/getting-started/developer-tools/workbench/#local-build-and-flash))

### Error: Unable to load manifest

```
Unable to load manifest for: ~/path/to/device-os - attempted to load: ~/path/to/device-os/.workbench/manifest.json

```

Workbench attempts to load a manifest located within the Device OS source repository. If that file isn't available or if you've somehow incorrectly set the `Custom Device OS Location` setting, you'll see this error.

### Uninstalling Workbench

* Open VSCode.
* Click the **Extensions** button on the left toolbar (Activity bar).
* Click on the gear icon for the **Workbench** extension and select **Uninstall**.
* Repeat for the **C/C++** and **Cortex-Debug** extensions
* Close and re-open VSCode, then close it again.
* Delete the `~/.particle/toolchains` directory.

### Uninstalling VSCode

#### Mac

* Find your `Visual Studio Code.app` file (typically in `~/Applications` or `/Applications`)
* Delete `Visual Studio Code.app`

#### Windows

* Open **Add/Remove Programs**.
* Select **Microsoft Visual Studio Code** and click the **Uninstall** button

#### Linux

* Open a terminal
* Run `sudo apt-get purge code`. This currently only works with Ubuntu and other Debian-style distributions.

### Linux Tips

* On 64-bit Linux you may need to install 32-bit libraries:

```
sudo apt-get install gcc-multilib libarchive-zip-perl libncurses-dev

```

* If you get a permission error when debugging, you may need to add udev rules.  
   * If you have the [Particle Workbench](/workbench/), run the `Particle: Launch CLI` command and then run `particle usb configure` in the terminal that launches  
   * if you just have the [Particle CLI](/getting-started/developer-tools/cli/), open a terminal and run `particle usb configure`  
   * Otherwise, you can download [50-particle.rules](https://github.com/particle-iot/particle-cli/blob/master/assets/50-particle.rules) and copy it to `/etc/udev/rules.d/`

### Enabling pre-release versions

Certain Device OS releases are preview releases, intended for early testing of an upcoming release, to add new features, or fix specific issues. 

Click the settings (gear) icon in the lower left, Settings, Extensions, Particle, then enable pre-release Device OS builds.

![Enable preview releases](/assets/images/workbench/enable-prerelease.png)

Once you complete this step, **Particle: Configure Workspace for Device** will include additional versions.

### Error: Compiler generates FPU instructions for a device without an FPU 

When building debug builds on newer version of Mac OS, you may see errors similar to these:

```bash
/Users/rickk/.particle/toolchains/deviceOS/6.3.4/modules/tron/system-part1/makefile /Users/rickk/.particle/toolchains/deviceOS/6.3.4/modules/tron/user-part/makefile
<command-line>: error: ISO C++11 requires whitespace after the macro name [-Werror]
In file included from ../hal/src/rtl872x/interrupts_irq.h:94,
                 from ../hal/inc/interrupts_hal.h:33,
                 from src/malloc.cpp:12:
../third_party/ambd_sdk/ambd_sdk/component/soc/realtek/amebad/cmsis/core_armv8mbl.h:88:6: error: #error "Compiler generates FPU instructions for a device without an FPU (check __FPU_PRESENT)"
   88 |     #error "Compiler generates FPU instructions for a device without an FPU (check __FPU_PRESENT)"
      |      ^~~~~
cc1plus: all warnings being treated as errors
make[4]: *** [../build/target/newlib_nano/platform-32-m/./src/malloc.o] Error 1
make[3]: *** [newlib_nano] Error 2
make[2]: *** [/Users/rickk/.particle/toolchains/deviceOS/6.3.4/modules/tron/system-part1/makefile] Error 2
```

This is caused by a change in the behavior of the `tr` command in Mac OS. This can be fixed by adding this to the `.bash_profile` file in your home directory.

```bash
# fixes error: #error "Compiler generates FPU instructions for a device without an FPU (check __FPU_PRESENT)"
# for Particle Workbench debug builds on Mac OS
export LC_COLLATE=C
```

Note that Workbench uses bash as its shell for local build and **Particle: Launch compiler shell** regardless of your default shell, so you will probably use .bash_profile even if you normally use zah and .zprofile. 

