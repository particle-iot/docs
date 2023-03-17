---
title: How Can I Source Debug Logs from My Tracker SoM / Tracker One?
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
Debug (trace) logs are an incredibly useful tool when it comes to understanding your device's connectivity habits and application firmware flow.   
  
## Tracker Edge

If you are using a build of Tracker Edge application firmware, Serial Debug Logs are enabled by default. All you need to do is:

1\. Download and Install the Particle CLI

You can find instructions here ([link](/getting-started/developer-tools/cli/)).

2\. Open up your computer's Terminal (Mac) / Command Line (Windows - cmd.exe). Make sure that you've got the Particle Command Line Interface (CLI) correctly installed by typing `particle` into your Terminal. You should see a help message that displays the various commands available to you. 

3\. Run the command `particle serial monitor --follow` and only **then** connect your device via USB to your computer.

Logs and AT commands should start scrolling freely!

If you intend to submit these logs to a Support Engineer via a support ticket, ensure to collect about 10 minutes of logs that document the device struggling to connect!

## Custom firmware

Follow the instructions here: ([link](/troubleshooting/guides/device-troubleshooting/how-do-i-collect-trace-logs-from-my-device/))!
