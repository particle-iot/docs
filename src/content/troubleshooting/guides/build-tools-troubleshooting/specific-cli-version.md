---
title: Using a specific Particle CLI version
columns: two
layout: commonTwo.hbs
description: Using a specific Particle CLI version
---

# {{title}}

The Particle CLI should generally be installed using the instructions [here](/getting-started/developer-tools/cli), however there are some special cases where you may want to run an older version of the Particle CLI:

- The `particle update` command in the CLI installs the specific LTS version of Device OS that the CLI was built to install, not necessarily the most recent version. If you want to install a specific older version of Device OS, you may want to use an older version of the CLI to do so.

- Support for discontinued platforms like the Spark Core no longer exists in the current version of the CLI, so you may want to use an older version of the CLI to do things like flash the cc3000 update.

## Installation

The recommended path is to install the CLI as above first. Alternatively, if you've installed Particle Workbench, it will install the Particle CLI as well. This is necessary because there are other required dependencies like dfu-util that are installed by the CLI installer that are difficult to install manually.

The current source for the Particle CLI can be found [in Github](https://github.com/particle-iot/particle-cli) and the release notes can be found [here](https://github.com/particle-iot/particle-cli/releases).

A versions of interest:

- CLI v3.5.0 switched to Device OS 4.0.0 LTS. 
- If you need to use Device OS 2.3.0 LTS, you can use CLI v3.2.0.
- If you need to use older platforms such as Redbear Duo and Core, use v2 (v2.16.0, currently).
- The release notes indicate which Device OS version is installed by that version of the CLI if you want to install a specific version
- There is no way to install the developer preview releases of Device OS (3.x, 5.x) using `particle update`.

We recommend creating a separate directory for your older version of the CLI instead of changing the default CLI version. To do this:

- Create a new directory:

```
mkdir cli-old
cd cli-old
```

- Get the Particle CLI source:

```
git clone https://github.com/particle-iot/particle-cli/
cd particle-cli
```

- Switch to the correct version

```
git checkout v2.16.0
```

- Install npm dependencies:

```
npm install
```

- To run this version, use the `npm start --` command, with any additional options that you'd normally pass to the `particle` command. For example, to check the version instead of using `particle version`, you would use:

```
$ npm start -- version
> particle-cli@2.16.0 start /Users/rick/Documents/cli-old/particle-cli
> node --require @babel/register ./src/index.js "version"

particle-cli v2.16.0

! A newer version (3.5.0) of particle-cli is available.
! Upgrade now by running: particle update-cli

2.16.0
```

