---
title: Hex File Generator
layout: device-restore.hbs
description: Hex File Generator
---

# Hex file generator

This tool makes it easy to create custom Intel hex files for flashing new devices. This is handy if you will be flashing many devices, or your contract manufacturer will be flashing your devices for you. The .hex file contains: 

- On Gen 3 devices the Bootloader, Soft Device, UICR bytes, Device OS, and user firmware
- On the Tracker, with 5.4.0 and later and 4.2.0 and later, UICR bytes are not set for compatibility with the Monitor One
- On Gen 2 devices the Bootloader, Device OS, and user firmware

Any of the technique in the [JTAG Reference](/reference/developer-tools/jtag/) can be used, such as the Particle Debugger, ST-LINK/v2 (for Gen 2), or Segger J-Link, to flash hex files to your devices.

This tool takes the [restore binaries](/reference/developer-tools/jtag/#restore-binaries) and replaces Tinker with your user firmware binary.

- Select the device platform and version to base your image on:

{{device-restore mode="radio"}}

- Select your user firmware .bin file:

<form id="hexGeneratorForm">
<p><input type="file" id="userBinFile" name="userBinFile" accept=".bin"></p>
<p><button type="button" onclick="downloadHex()">Generate and Download Hex File</button></p>
</form>

The hex file is generated entirely in your web browser. Your user firmware binary is not uploaded to any servers.
