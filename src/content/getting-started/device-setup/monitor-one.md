---
title: Monitor One setup
columns: two
layout: commonTwo.hbs
description: Unboxing and setting up a Particle Monitor One
---

# {{title}}

This page walks you through unboxing and powering up a [Monitor One](/reference/datasheets/tracker/monitor-one-datasheet/). By the end, the Monitor One will be powered up and ready to add to your Particle account.

{{content-nav}}

## Unboxing

{{imageOverlay src="/assets/images/device-setup/monitor-one/monitor-one-box.jpg" alt="Monitor One box" class="no-darken"}}

The Monitor One box contains:

- The Monitor One base model, in an IP67-rated, waterproof enclosure with a flexible mounting plate for walls, rails, poles, and more
- Two expansion cards for customizing I/O:
  - The I/O card, an all-in-one expansion card with CAN, Modbus, RS-485, 4-20mA and 0-10V inputs, 24V I/O, and a dry contact relay output
  - The prototype card, a perf board for hardware integration and validation
- 4-pin M12 cable
- 8-pin M12 cable
- USB cable
- 24V power supply

## What you'll need

- The Monitor One Developer Edition kit
- The power supply (24 VDC, 1 A), which is in the box
- The two M12 cables: the 8-pin cable for power, and the 4-pin cable for I/O and expansion
- Optionally, a micro-USB cable and hex wrenches, for opening the case or installing extras

## Powering on the device

1. Take the M12 8-pin cable. There are two cables in the box, and this is the one used for power.
2. Connect the 5.5 x 2.1 mm barrel jack from the power supply to the barrel socket on the adapter.
3. Plug the M12 8-pin connector into the Monitor One, with the label up and toward the cellular SMA connector.
4. If you disconnect and reconnect the wires, check the polarity. The + terminal should be red and the - terminal black.

{{imageOverlay src="/assets/images/device-setup/monitor-one/monitor-one-open.jpg" alt="Monitor One open" class="no-darken"}}

If you want to use your own power supply, any 6 - 30 VDC, 2 A adapter with a 5.5 x 2.1 mm center-positive barrel plug will work.

For more details on the Monitor One hardware, see the [Monitor One datasheet](/reference/datasheets/tracker/monitor-one-datasheet/).

{{!-- BEGIN shared-blurb 2067ac29-149f-46d1-87cd-2045f3795ff2 --}}
## Device setup

You will generally set up your device from a computer (Windows, Linux, Mac) connected by USB to your devices. A Chromebook can be used for device setup, but you'll need a full computer to install and use the Particle Workbench development environment.

Simply follow the instructions at: [https://setup.particle.io/](https://setup.particle.io/).

{{imageOverlay src="/assets/images/getting-started-guide/setup-01.png" class="no-darken"}}

If you do not already have a Particle account you can create one as part of the setup process. You will use this account to access things like the Particle console in the next step. It's quick and there is no fee or credit card required.

{{imageOverlay src="/assets/images/getting-started-guide/create-account.png" class="no-darken"}}

When you reach the last step of setup you can click the button to **Go to Console**.

{{imageOverlay src="/assets/images/getting-started-guide/setup-last.png" class="no-darken"}}

## Console

The Particle console can be found any time at [https://console.particle.io/](https://console.particle.io/). 

{{!-- It's recommended that you use it with Chrome, Firefox, Safari, or current versions of Edge. It does not work with many older browsers, including Internet Explorer. --}}

### Sandbox

When you open the console you'll see the home view:

{{imageOverlay src="/assets/images/getting-started-guide/console-home.png" class="no-darken"}}

Initially you will be in **Sandbox** view where you see your personal devices. If your account is associated with your company, the Sandbox popup at the top will allow you to switch into your company's organization to see their devices.

The icons along the left allow you to see your personal devices, SIM cards, integrations, and billing information.

### Products

Setup automatically creates a product for your device. I recommend working in product view, even if your goal is not to create a commercial product. A product just keeps the settings and devices organized for a fleet of devices, and there is no fee to create as many products as you need. A fleet can be as small as a single device.

When I set up my Boron, I used the default, randomly generated product and device names. This is my device list view in the console:

{{imageOverlay src="/assets/images/getting-started-guide/product-devices.png" class="no-darken"}}


## Status LED and device modes

Most devices have an RGB status LED and it can tell you a lot about what the device is doing. 

First, a few basic terms:

- Blinking: The LED is blinking on and off. There is also fast blinking.
- Breathing: The LED gently fades on, then fades off, and repeats. This is the normal operating condition.

Additionally, there are a few standard colors.

- Cyan: A light blue color. When your device is breathing cyan, it's operating normally.
- Green: Generally used for connecting to network.
- Blue (dark blue): Certain setup modes. On Wi-Fi devices that do not have Wi-Fi credentials yet, the device will blink dark blue.
- Magenta (red and blue at the same time): Device is being updated, or awaiting updates.
- Yellow: Device is being programmed by USB.

When you first turn on a device, it will generally progress through a series of stages:

- Blink white: Powered on. This might be a single blink, and you might not see it.
- Blinking green: Connecting to the network (cellular or Wi-Fi).
- Blinking cyan: Connecting to the Particle cloud.
- Fast blinking cyan: Last step of connecting to the Particle cloud.
- Breathing cyan: Successfully connected.

You can find more on the [Status LED and device modes](/troubleshooting/led/) page.

{{device-animation device "breathe" "cyan" }}

{{!-- END shared-blurb --}}

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

## Get the Monitor Edge firmware

To get the latest Monitor Edge firmware version from Github in Workbench, the easiest option is to use the Github extension.

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

Enter the repository **particle-iot/monitor-edge**.

{{imageOverlay src="/assets/images/getting-started-guide/git-13.png" class="no-darken"}}

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

If you are looking at your device, you will notice that it sequences through:

- Blinking yellow: Programming the device by USB.
- Blinking green: Connecting to the network (cellular or Wi-Fi).
- Blinking cyan: Connecting to the Particle cloud.
- Fast blinking cyan: Last step of connecting to the Particle cloud.
- Breathing cyan: Successfully connected.

## Next steps

- Learn more about [Monitor Edge firmware](/firmware/tracker-edge/monitor-edge-firmware/#overview)


