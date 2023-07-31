---
title: You're muted
columns: two
layout: commonTwo.hbs
description: You're Muted
---

# {{title}}

![Zoom](/assets/images/edge-kit/zoom.png)

This detector is trained to recognize the phrase "You're muted" and generate a keystroke to unmute your Zoom session. 

## Wiring the microphone

You will need the following hardware, included in the [Edge ML Kit](/reference/datasheets/accessories/edge-ml-kit/)

- PDM digital microphone
- Photon 2 (included with the Edge ML Kit)

{{imageOverlay src="/assets/images/edge-kit/mic-1.jpeg" alt="PDM Microphone" }}

The connections on the breakout are:

| Breakout | Color | Connect To | Details |
| :---: | :--- | :---: | :--- |
| 3V | Red | 3V3 | 3.3V power |
| GND | Black | GND | Ground |
| SEL | | NC | Typically leave unconnected, left/right select |
| CLK | Blue | A0 | PDM Clock |
| DAT | Green | A1 | PDM Data |

The pinout for the Photon 2 can be found on its [datasheet](/reference/datasheets/wi-fi/photon-2-datasheet/#pin-markings).

{{imageOverlay src="/assets/images/edge-kit/mic-3.jpeg" alt="PDM Microphone Assembled" }}

## Configure Zoom

Open the Settings in Zoom. Then select Keyboard Shortcuts. Find **Mute/Unmute my Audio**. Note the key sequence, and you will probably want to check the box for Enable Global Shortcut. The default is typically Command-Shift-A on the Mac and Alt-A on Windows.

![Keyboard shortcuts](/assets/images/edge-kit/keyboard-shortcuts.png)

If using a global shortcut, on the Mac, you may be asked to enable accessibility features. In the Control Panel, it's in Privacy & Security, Accessibility, and make sure the slider is set to on for zoom.

The first time you connect the Photon 2 running this firmware on the Mac, you may be prompted to select the keyboard type. Select ANSI.

![Keyboard type](/assets/images/edge-kit/keyboard-type.png)

## Build the software

This tutorial is a complete example, using a pre-trained model from [Edge Impulse](https://www.edgeimpulse.com/).

- Download the [zip file containing the full source](/assets/files/edge-ml/You_re_Muted__inferencing.zip)
- Extract the contents of the zip file
- Open Particle Workbench. From the Command Palette (Ctrl-Shift-P on Windows and Linux, Cmd-Shift-P on Mac).
- If not logged in to your Particle account, **Particle: Login** as this is necessary to install libraries.
- **Particle: Import Project**. Select the `project.properties` file in the zip file you just extracted.
- Use **Particle: Configure Project For Device** and select **deviceOS@5.4.1** and **P2**. The P2 option is also used for the Photon 2. Device OS 5.4.1 or later is required for this demo.
- In src/main.cpp, you'll need to configure the keyboard shortcut to what was set above. 

```cpp
// Keyboard.click(KEY_A, MOD_LEFT_COMMAND | MOD_LSHIFT); // Mac
Keyboard.click(KEY_A, MOD_LALT); // Windows                
```

- Connect your Photon 2 to your computer with a USB cable.
- Use **Particle: Clean application (local)** to make sure there are no remnants from a previous build.
- Use **Particle: Cloud compile** or **Particle: Cloud Flash**, **Particle: Flash Application (local)**, **Particle: Compile Application (local)**.

If you are building locally and you get a `region `SRAM' overflowed by 4 bytes` error, using the cloud compiler or Docker compile will solve this occasional problem.

## Building using Docker

Particularly on Windows, you can significantly speed up builds by using Docker. Also, if you get the error `Argument list too long` on Windows, using Docker can work around this issue. For more information, see also [building using a buildpack](/firmware/best-practices/firmware-build-options/#using-buildpack).

- Download and install [Docker Desktop](https://www.docker.com/). 
- Docker Desktop does not automatically start when you log in, but does need to be running to do Docker builds.
- The first time you install it will take longer to download the buildpack, but subsequent builds will reuse it and be much faster.
- From the Command Palette (Ctrl-Shift-P) select **Particle: Launch CLI**.
- You use the `docker run` command to start a new container and run the build in it.

| Command Fragment | Description |
| :--- | :--- |
| `docker run` | Create a run a container |
| `--name=`*name* | Name of the container (optional) |
| `-v `*local_path*`:/input` | Path to the source directory, must be an absolute path |
| `-v `*output_path*`:/output` | Path to the output directory, must be an absolute path |
| `-e PLATFORM_ID=`*numeric_platform_id* | The numeric platform ID you are building for |
| *image_name* | The name of the image file |

For example, if my source directory is `C:\Users\rickk\Desktop\You_re_Muted__inferencing`:

```html
docker run --name=edge-compile -v C:\Users\rickk\Desktop\You_re_Muted__inferencing:/input -v C:\Users\rickk\Desktop\You_re_Muted__inferencing:/output -e PLATFORM_ID=32 particle/buildpack-particle-firmware:5.4.1-p2
```

- The `--name` is optional, however it makes it easier to keep track of your containers
- Note that `-v` takes the local path, which must be an absolute path, and either `:/input` or `:/output`, which can be the same path
- You need to include `PLATFORM_ID` with the numeric platform ID (32 for P2 and Photon 2)
- You can use a different version of Device OS instead of `5.4.1` if desired
- `-p2` is used for both P2 and Photon 2

When the build is complete, you'll find your firmware binary in the output directory as `firmware.bin`.

- You can now delete the container artifacts:

```
docker rm edge-compile
```

## Learn more

- You can find additional projects on the [Edge Impulse ML projects page](https://www.edgeimpulse.com/projects/all?search=particle).
- Learn how to create your own projects in the [Edge Impulse documentation](https://docs.edgeimpulse.com/docs).
