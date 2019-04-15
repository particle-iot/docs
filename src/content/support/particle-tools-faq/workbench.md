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

- Get the latest Device OS source from Github. You'll need to have the command line version of git available in order to retrieve the submodules.

```
git clone git@github.com:particle-iot/device-os.git
cd ./device-os
git submodule update --init --recursive
git checkout -b develop
```

- Run the `Particle: Launch Compiler Shell` command.
- In the terminal that launches, execute the following:

```
DEVICE_OS_PATH=/path/to/device-os/ make -f $PARTICLE_MAKEFILE compile-all
```

- You'll need to do your builds from this window in order for the change to take effect.


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





