---
title: Tracker Edge firmware - Tracker One
columns: two
layout: commonTwo.hbs
description: Setting up Tracker Edge on the Tracker One
---

# {{title}}

{{section-nav}}

Tracker Edge is the standard firmware for the Tracker One and Tracker SoM. It can be used as-is, but often you will want to modify it to suit your specific application.

You should always start using Tracker Edge as the base, instead of programming it like other Particle devices directly to Device OS, because of the support for the Tracker One built-in peripherals and console support built into Tracker Edge.

You can skip this section for now, however, as there is significant functionality built-in and setup.particle.io will update your device to the latest Tracker Edge.

{{content-nav}}

## Get the Tracker Edge firmware

To get the latest Tracker Edge firmware version from Github in Workbench, the easiest option is to use the Github extension.

{{!-- BEGIN shared-blurb 689a692c-8568-4383-9d3f-eb340e12c0dc --}}
The Github extension in Workbench makes it easy to use Github. It is typically automatically installed and ready to use.

Open the command palette (Ctrl + Shift + P or Command + Shift + P). Start typing "git" to see a list of commands available.

{{imageOverlay src="/assets/images/getting-started-guide/git-01.png" class="no-darken"}}

If you want to make a clone of a repository you can use **Git: Clone (Recursive)**. You can use the non-recursive option as well for most repositories, but some like tracker-edge and device-os require it, and it doesn't hurt to use it all of the time. Recursive also clones submodules, which you could also do using `git submodule init recursive` from the command line, but the built-in version is usually easier.

{{imageOverlay src="/assets/images/getting-started-guide/git-02.png" class="no-darken"}}

If you haven't signed in yet, sigh in with your Github credentials.

{{imageOverlay src="/assets/images/getting-started-guide/git-03.png" class="no-darken"}}
{{imageOverlay src="/assets/images/getting-started-guide/git-04.png" class="no-darken"}}

You will be prompted for where to clone from, select **Clone from Github**.

{{imageOverlay src="/assets/images/getting-started-guide/git-12.png" class="no-darken"}}
{{!-- END shared-blurb --}}

Enter the repository **particle-iot/tracker-edge**.

{{imageOverlay src="/assets/images/getting-started-guide/git-05.png" class="no-darken"}}

{{!-- BEGIN shared-blurb 484581eb-e78e-44ed-bc11-bb1d0945f2d6 --}}
When the clone is complete you are prompted for where to open it. You should only select **Open** (replaces current window) or **Open in New Window**. Using the Add to Workspace option will create a multi-root workspace, with multiple projects, which does not work well with the Particle extension.

{{imageOverlay src="/assets/images/getting-started-guide/git-06.png" class="no-darken"}}

If you are prompted to Select CMakeLists.txt, just use Escape to exit the request, or select **Don't Show Again**. The main tracker-edge firmware doesn't use CMakeLists.txt.

{{imageOverlay src="/assets/images/getting-started-guide/git-11.png" class="no-darken"}}

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Configure project for device**.

Select **Asset Tracker / Monitor One**.
{{imageOverlay src="/assets/images/getting-started-guide/git-07.png" class="no-darken"}}

Select the version of Device OS for the current Tracker Edge firmware. This is currently 6.5.0 or later.
{{imageOverlay src="/assets/images/getting-started-guide/git-08.png" class="no-darken"}}

If you do not have the option for 6.5.0, select **Preferences** then **Settings** in VSCode.
{{imageOverlay src="/assets/images/getting-started-guide/git-09.png" class="no-darken"}}

Select **Extensions** then **Particle**. Check the checkbox for **Enable Pre-release Device OS Builds**.

{{imageOverlay src="/assets/images/getting-started-guide/git-10.png" class="no-darken"}}
{{!-- END shared-blurb --}}

## Flashing code

{{!-- BEGIN shared-blurb d2ee6341-5e98-4805-85c8-7dedf9b2c2d1 --}}
There are two ways you typically compile and flash code:

- Local: compiling on your computer and flashing the device by USB
- Cloud: compiling the code in the Particle cloud and flashing the device OTA (over-the-air)

When using cellular devices, you can save on cellular data by flashing locally.

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Flash application (local)**.

A **Terminal** pane at the bottom of the window will appear with the build progress. It will sit in this state for a few minutes, but it will be much faster for subsequent builds.

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-1.png" class="no-darken"}}

When the build is done, a message similar to this will display:

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-2.png" class="no-darken"}}
{{!-- END shared-blurb d2ee6341-5e98-4805-85c8-7dedf9b2c2d1 --}}


## Next steps

- Learn more about [Tracker Edge firmware](/firmware/tracker-edge/tracker-edge-firmware/#overview)
- Learn about [Tracker One expansion options](/hardware/tracker/tracker-one-expansion/)


{{section-nav}}
