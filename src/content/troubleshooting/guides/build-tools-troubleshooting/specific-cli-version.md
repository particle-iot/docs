---
title: Using a specific Particle CLI version
columns: two
layout: commonTwo.hbs
description: Using a specific Particle CLI version
---

# {{title}}

The Particle CLI should generally be installed using the instructions [here](/getting-started/developer-tools/cli), however there are some special cases where you may want to run an older version of the Particle CLI:

Prior to September, 2023, the `particle update` command installed the latest LTS version at the time the CLI version was released. Thus if you wanted to install an older version of Device OS you had to downgrade the CLI. This is no longer necessary as the `--target` option can be used to install a specific version instead.

Support for discontinued platforms like the Spark Core no longer exists in the current version of the CLI, so you may want to use an older version of the CLI to do things like flash the cc3000 update, however.

## Installation

The recommended path is to install the CLI as above first. Alternatively, if you've installed Particle Workbench, it will install the Particle CLI as well. This is necessary because there are other required dependencies like dfu-util that are installed by the CLI installer that are difficult to install manually.

The current source for the Particle CLI can be found [in Github](https://github.com/particle-iot/particle-cli) and the release notes can be found [here](https://github.com/particle-iot/particle-cli/releases). The release notes can help you determine which version of the CLI you need.

Some versions of interest:

- If you need to use older platforms such as Redbear Duo and Core, use v2 (v2.16.0, currently).


To replace the existing `particle` command you can use:

```
npm install -g particle-cli@3.2.0
```

Or, for the latest CLI 2.x version (currently 2.16.0):

```
npm install -g particle-cli@2
```

To restore the current version of the Particle CLI you can use:

```
particle --update-cli
```
