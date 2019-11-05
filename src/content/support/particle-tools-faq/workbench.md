---
title: Workbench
layout: support.hbs
columns: two
order: 900
---

# Particle Workbench FAQ

{{!-- FAQs: See ch25557 --}}

- [Installation Instructions](/quickstart/workbench/)
- [Tutorial](/tutorials/developer-tools/workbench)

## Working with a custom Device OS build

It's possible to work with a non-released branch, fork, or manually merged PRs of Device OS.

- Get the latest Device OS source from GitHub. You'll need to have the command line version of git available in order to retrieve the submodules.

```
git clone git@github.com:particle-iot/device-os.git
cd ./device-os
git submodule update --init --recursive
git checkout -b develop
```

- Launch Visual Studio Code
- Navigate to your Particle settings ([docs](https://code.visualstudio.com/docs/getstarted/settings)) and set the `Custom Device OS Location`

![Particle Global Settings](/assets/images/workbench/settings-custom-deviceos-location.png)

- Enter the absolute path to your Device OS source code and reload when prompted
- Open a Particle project and open a source file
- Click on the Device OS entry in the status bar to display a list of available toolchains

![Particle Project Settings](/assets/images/workbench/statusbar-project-settings.png)

- Select the `deviceOS@source` entry - it should be first in the list
- Wait for the toolchain to install and activate
- Run commands ([docs](https://docs.particle.io/tutorials/developer-tools/workbench/#particle-commands)) and local compilation tasks as normal ([docs](/tutorials/developer-tools/workbench/#local-build-and-flash))


## Error: Unable to load manifest

```
Unable to load manifest for: ~/path/to/device-os - attempted to load: ~/path/to/device-os/.workbench/manifest.json
```

Workbench attempts to load a manifest located within the Device OS source repository. If that file isn't available or if you've somehow incorrectly set the `Custom Device OS Location` setting, you'll see this error.


## Uninstalling Workbench

- Open VSCode.
- Click the **Extensions** button on the left toolbar (Activity bar).
- Click on the gear icon for the **Workbench** extension and select **Uninstall**.
- Repeat for the **C/C++** and **Cortex-Debug** extensions
- Close and re-open VSCode, then close it again.
- Delete the `~/.particle/toolchains` directory.


## Uninstalling VSCode

### Mac

- Find your `Visual Studio Code.app` file (typically in `~/Applications` or `/Applications`)
- Delete `Visual Studio Code.app`

### Windows 

- Open **Add/Remove Programs**.
- Select **Microsoft Visual Studio Code** and click the **Uninstall** button

### Linux 

- Open a terminal
- Run `sudo apt-get purge code`. This currently only works with Ubuntu and other Debian-style distributions.

## Linux Tips

- On 64-bit Linux you may need to install 32-bit libraries:

```
sudo apt-get install gcc-multilib libncurses5:i386
```

- If you get a permission error when debugging, you may need to add udev rules.
  * If you have the [Particle Workbench](https://docs.particle.io/workbench/), run the `Particle: Launch CLI` command and then run `particle usb configure` in the terminal that launches
  * if you just have the [Particle CLI](https://docs.particle.io/tutorials/developer-tools/cli/), open a terminal and run `particle usb configure`
  * Otherwise, you can download [50-particle.rules](https://github.com/particle-iot/particle-cli/blob/master/assets/50-particle.rules) and copy it to `/etc/udev/rules.d/`



