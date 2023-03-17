---
title: Web IDE Exporter
layout: commonTwo.hbs
description: Tool to export Web IDE projects to Particle Workbench
includeDefinitions: [api-helper,api-helper-webide, zip]
---

# {{title}}

This tool makes it easy to export projects from the [Particle Web IDE](https://build.particle.io) for use in 
[Particle Workbench](/getting-started/developer-tools/workbench/).

{{> sso}}

{{> web-ide-exporter}}

## Instructions

- Use the **Get Web IDE Projects** button to download the Web IDE source code from your Particle account.

- Select the project(s) you want to download. You can select multiple projects, or even all of them.

- Use the **Export Projects** button to build a zip file in your web browser and download it to your computer.

- Extract the **export.zip** file in your Downloads directory. If you have done this more than once, it will likely have a unique number in the filename.

### Multi-Root

- If you export multiple applications and open the top level of the **export** directory after extracting it, you will have a multi-root workspace, where you can see all of the projects you exported in the left-hand navigation tree.
- This provides the best overview of the source and is good for searching.
- It is not recommended for working with a project, because each time you want to compile or flash, you need to choose which project you want to work with.

### Single root

- If instead you open a single project (directory with a project.properties file), then you only see the source for that project.
- Use the command palette (Ctrl-Shift-P or Command-Shift-P) to **Particle: Configure Project for Device** to configure the Device OS version, platform, and optionally the device to flash.
- If you have libraries in your project and you want to build locally:
  - Open the command palette and select **Particle: Launch CLI**.
  - Use the `particle library copy` command to install libraries locally.
  - This is not necessary if you will be doing cloud builds.

## Learn more

- To install Workbench and get a brief overview of the features, see the [Workbench Quickstart](/quickstart/workbench/).
- For a more in-depth explanation of the features, see the [Workbench Tutorial](/getting-started/developer-tools/workbench/).
- See also [FAQ and Tips](/getting-started/developer-tools/workbench-faq/).
- And [Troubleshooting](/troubleshooting/guides/build-tools-troubleshooting/troubleshooting-the-particle-workbench/).

