---
title: Tracker One setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle Tracker One
---

# {{title}}

This page walks you through unboxing and powering up a [Tracker One](/reference/datasheets/tracker/tracker-one/), a rugged, ready-to-go asset tracking device. It also explains the status LEDs. By the end, the Tracker One will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/tracker-one/t-one-box.jpg" alt="Tracker One kit box" class="no-darken"}}

The Tracker One comes pre-assembled in its IP67-rated enclosure, so you can get started right away. The box contains:

- Tracker One
- USB-C to Type A cable

{{note op="start" type="note"}}
The Tracker One M8 accessory cable and sensors are sold separately.
{{note op="end"}}

## What you'll need

- A Tracker One
- The USB-C to Type A cable that is included in the box. You can also use a USB-C to USB-C cable, but make sure it supports data transfer, not just charging.
- A computer (Windows, Mac, or Linux), which you'll use to set up the device and update the Device OS

{{imageOverlay src="/assets/images/device-setup/tracker-one/tracker-one-by-window.png" alt="Tracker One by a window" class="no-darken"}}

## Powering on the device

The Tracker One ships in shipping mode to preserve the battery during transport. It does not have a power button. To wake it from shipping mode:

1. Connect the USB cable to the Tracker One.
2. Plug the other end into your computer or a dedicated USB power supply.

{{imageOverlay src="/assets/images/device-setup/tracker-one/tone-usb-c-plugged.png" alt="Tracker One with USB-C cable" class="no-darken"}}

This powers up the device and begins the startup sequence.

## Status LEDs

Once powered on, the Tracker One uses LEDs to indicate its status, including the charging state, GNSS (GPS) status, and cloud connection.

{{imageOverlay src="/assets/images/device-setup/tracker-one/t-one-led-cell-connect.gif" alt="Tracker One LEDs" class="no-darken"}}

### Charge LED (yellow)

The charge LED shows the status of the battery charging circuit.

- Off: No charging or no power
- On: The battery is charging
- Blinking: Charging fault
- Flickering: No battery connected

### GNSS LED (blue)

The GNSS LED shows the status of the GNSS receiver.

- Off: GNSS is powered off
- Blinking (1 Hz): Attempting to acquire a satellite fix
- Solid on: GNSS fix acquired

### Cloud status LED (RGB)

The cloud status LED shows the cellular and Particle cloud connection status.

- Red breathing: Connecting to the cellular network
- Yellow breathing: Connecting to the cloud (weak signal)
- Green breathing: Connecting to the cloud (good signal)
- Yellow solid: Connected to the cloud (weak signal)
- Green solid: Connected to the cloud (good signal)

## Add to your account

To add the device to your account and make sure it's running the latest Device OS, go to [setup.particle.io](https://setup.particle.io/). The guided setup will:

- Sign you in, or create a Particle account if you do not have one yet
- Activate the SIM card
- Update the Device OS if necessary

{{!-- BEGIN shared-blurb 168590ce-16d7-4b90-baf2-ed68bb6d653d --}}
## Install VSCode

The recommended programming environment for Particle devices is VSCode (Visual Studio Code). It's free and available for Windows, Linux, and Mac.

To install it, follow the instructions in the [Workbench quickstart](/quickstart/workbench/).

{{imageOverlay src="/assets/images/getting-started-guide/workbench-install-vscode.png" class="no-darken"}}

If you already have VSCode installed, you can follow the instructions on that page to install the Particle VSCode Pack from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=particle.particle-vscode-pack).


## Workbench basics

When you open VSCode, you'll generally see the VSCode welcome page. 

{{imageOverlay src="/assets/images/getting-started-guide/workbench-start.png" class="no-darken"}}

If you click the Particle logo in the left-hand navigation, you'll see the Workbench home page.

{{imageOverlay src="/assets/images/getting-started-guide/workbench-particle.png" class="no-darken"}}

Most features in Particle Workbench (VSCode) are accessed using the **Command Palette**.

- On Windows and Linux: Ctrl + Shift + P
- On Mac: Command + Shift + P

{{imageOverlay src="/assets/images/getting-started-guide/workbench-palette.png" class="no-darken"}}

Instead of scrolling the (very long) list commands, you can type a bit of the command name and it will provide some intelligent guesses. It also puts the most recently used options near the top. I've entered **part** to show the Particle commands:

{{imageOverlay src="/assets/images/getting-started-guide/workbench-palette-particle.png" class="no-darken"}}

To learn more about Particle Workbench, see [Workbench getting started](/getting-started/developer-tools/workbench/).

## Log in

You should log Workbench into your Particle account if you have not done so already. 

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Login**.

{{imageOverlay src="/assets/images/getting-started-guide/workbench-login.png" class="no-darken"}}

You will generally **Login with username** unless you have a corporate Particle account using single sign on (SSO). Your username is your Particle account email.

After entering your username and password, you will be prompted for your 6-digit login code (MFA). Enter this from your authenticator app if you have enabled MFA on your Particle account, otherwise, press Esc (escape).

{{imageOverlay src="/assets/images/getting-started-guide/workbench-login-mfa.png" class="no-darken"}}

Note: There are a number of these prompts in Workbench where you are asked for a value or press Escape. In these cases, Escape is used to continue without specifying a value, not cancel out of the current operation!

You will generally stay logged in for up to 3 months before you have to log in again. Workbench login really just logs you into the Particle CLI (command line interface), so you can log into either and will be logged into both.

There will be temporary status notifications that appear in the lower right corner of the VSCode window. These go away after a few seconds but it's worthwhile to look in that corner after doing something for additional status information.

{{imageOverlay src="/assets/images/getting-started-guide/workbench-logged-in.png" class="no-darken"}}
{{!-- END shared-blurb --}}

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

There are two ways you typically compile and flash code:

- Local: compiling on your computer and flashing the device by USB
- Cloud: compiling the code in the Particle cloud and flashing the device OTA (over-the-air)

When using cellular devices, you can save on cellular data by flashing locally.

Open the command palette (Ctrl + Shift + P or Command + Shift + P) and select **Particle: Flash application (local)**.

A **Terminal** pane at the bottom of the window will appear with the build progress. It will sit in this state for a few minutes, but it will be much faster for subsequent builds.

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-1.png" class="no-darken"}}

When the build is done, a message similar to this will display:

{{imageOverlay src="/assets/images/getting-started-guide/compile-status-2.png" class="no-darken"}}

## Next steps

- Learn more about [Tracker Edge firmware](/firmware/tracker-edge/tracker-edge-firmware/#overview)
- Learn about [Tracker One expansion options](/hardware/tracker/tracker-one-expansion/)

