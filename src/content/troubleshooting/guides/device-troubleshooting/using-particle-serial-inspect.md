---
title: Using particle serial inspect
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
If your device is going into safe mode (breathing magenta) or is unexpectedly connecting to the cloud (blinking green) when it should be in a manual mode (breathing white), you may have an unmet system dependency. This is easiest to diagnose using the Particle CLI with the device connected by USB to your computer.

1. Install the [Particle CLI](/getting-started/developer-tools/cli/) if you have not done so.
2. Connect the device by USB to your computer.
3. Put the device in listening mode (blinking dark blue) by holding down the MODE button until the status LED blinks dark blue, then release.
4. Enter the following command from a Command Prompt or Terminal window:

particle serial inspect

This should return something like this, though the output will vary depending on the device and version:

```
Platform: 13 - Boron  
Modules  
  Bootloader module #0 - version 1003, main location, 49152 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS  
      System module #1 - version 1102  
  
  System module #1 - version 2007, main location, 671744 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS  
      Bootloader module #0 - version 1003  
      Radio stack module #0 - version 202  
  
  User module #1 - version 6, main location, 131072 bytes max size  
    UUID: 3331A89CA0126D4D2AD2EE311F7EDFEF5E0A5E36BCCB0605C13B5441114BD7EC  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS  
      System module #1 - version 2007  
  
  Radio stack module #0 - version 202, main location, 192512 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS
```

To read this output, start with **User module #1**. This is always version 6\. Make note of any failures.

You can tell which version of Device OS this user firmware binary targets by the dependency for the System module #1, in this case:

System module #1 - version 2007

Version 2007 is a system module version, which is an integer. To convert this the more commonly used semver, use [this table in Github](https://github.com/particle-iot/device-os/blob/develop/system/system-versions.md). Here are a few rows of the table:

| Bootloader Module Version | System Module Version | Release Version | Platforms                                                  |
| ------------------------- | --------------------- | --------------- | ---------------------------------------------------------- |
| 502                       | 1512                  | 1.5.2           | Photon, P1, Electron, Xenon, Argon, Boron, B SoM, B5 SoM   |
| 1002                      | 2004                  | 2.0.0-rc.1      | Photon, P1, Electron, Argon, Boron, B SoM, B5 SoM          |
| 1003                      | 2007                  | 2.0.0-rc.4      | Photon, P1, Electron, Argon, Boron, B SoM, B5 SoM, Tracker |

From this we can see that 2007 is 2.0.0-rc.4\. 

Looking closer at **System Module #1** we can see that it further depends on bootloader #1003 (which matches the table above) as well as Radio stack 202 (this is also referred to SoftDevice).

  System module #1 - version 2007, main location, 671744 bytes max size  
    Dependencies: PASS  
      Bootloader module #0 - version 1003  
      Radio stack module #0 - version 202

## Missing dependency

In this example, we can see a **FAIL** in the dependencies for System module #1\. 

```
Platform: 13 - Boron
Modules  
  Bootloader module #0 - version 1002, main location, 49152 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS  
      System module #1 - version 1102  
  
  System module #1 - version 2007, main location, 671744 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: FAIL  
      Bootloader module #0 - version 1003  
      Radio stack module #0 - version 202  
  
  User module #1 - version 5, main location, 131072 bytes max size  
    UUID: 362808E0DB24B4ED309227C9121675856A32E73D5D16D2C7922C49C9AEF353C2  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS  
      System module #1 - version 326  
  
  Radio stack module #0 - version 202, main location, 192512 bytes max size  
    Integrity: PASS  
    Address Range: PASS  
    Platform: PASS  
    Dependencies: PASS
```

The device has bootloader 1002 (2.0.0-rc.1) but the system module #1 requires version 1003\. Flashing the missing bootloader or letting it upgrade OTA will fix this missing dependency.
