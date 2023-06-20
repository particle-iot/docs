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
- Open Particle Workbench. From the Command Palette (Ctrl-Shift-P on Windows and Linux, Cmd-Shift-P on Mac):
- **Particle: Import Project**. Select the `project.properties` file in the zip file you just extracted.
- Use **Particle: Configure Project For Device** and select **deviceOS@5.4.0** and **P2**. The P2 option is also used for the Photon 2. Device OS 5.4.0 or later is required.
- In src/main.cpp, you'll need to configure the keyboard shortcut to what was set above. 

```cpp
// Keyboard.click(KEY_A, MOD_LEFT_COMMAND | MOD_LSHIFT); // Mac
Keyboard.click(KEY_A, MOD_LALT); // Windows                
```

- Connect your Photon 2 to your computer with a USB cable.
- Use **Particle: Clean application (local)** to make sure there are no remnants from a previous build.
- Use **Particle: Flash Application (local)** or **Particle: Compile Application (local)**. You must use the local option; the firmware cannot be compiled using the cloud compile options (Cloud Compile or Cloud Flash). 



