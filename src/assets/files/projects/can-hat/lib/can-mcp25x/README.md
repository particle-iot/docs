# can-mcp25x - MCP2515 and MCP25625 Driver
Particle driver library to support Microchip MCP2515 and MCP25625 CAN controllers.

This code is based on the Seeed-Studio CAN bus shield repository (https://github.com/Seeed-Studio/CAN_BUS_Shield) written by Loovee (loovee@seeed.cc).

## Further Reading
For instructions on using this library on the Tracker platforms see [AN017 Tracker CAN](https://github.com/particle-iot/app-notes/tree/master/AN017-Tracker-CAN).

## Examples Application Build Instructions
On platforms such as the tracker that use external IO expanders and other circuits for GPIO access to the CAN device, normal write accesses with the `digitalWrite` interface must be employed instead of the faster version `digitalWriteFast` for direct MCU IO.  For this reason `MCP2515_NORMAL_WRITES` must be specified to the precompiler to use normal `digitalWrite`.

There are two ways to accomplish this:
1. Add a compile define to your Workbench settings file that will add `MCP2515_NORMAL_WRITES` automatically to all source compiled.
2. Create a local makefile in the `src/` directory to add the define.

### Workbench Settings
1. Open `.vscode/settings.json` file in Workbench.
2. Add this line to the top of the settings.  Don't forget the comma at the end. `"particle.compileDefines": ["MCP2515_NORMAL_WRITES"],`
3. Save the settings file.
4. Clean your application so that the define is applied to all files by pressing <CTRL-SHIFT-P> and select "Particle: Clean application (local)".
5. Compile your application.

Your settings.json file should look similar to this.
```json
{
    "particle.compileDefines": ["MCP2515_NORMAL_WRITES"],
    "extensions.ignoreRecommendations": true,
    "C_Cpp.default.configurationProvider": "particle.particle-vscode-core",
    "cortex-debug.openocdPath": "${command:particle.getDebuggerOpenocdPath}",
    "files.associations": {
        "*.ino": "cpp"
    },
    "particle.firmwareVersion": "2.0.0-rc.3"
}
```

### Local Makefile
1. Copy and paste the following make file text into a file named `build.mk` in your `src/` directory.
2. Clean your application.
3. Compile your application.

```make
INCLUDE_DIRS += $(SOURCE_PATH)/$(USRSRC)  # add user sources to include path
# add C and CPP files - if USRSRC is not empty, then add a slash
CPPSRC += $(call target_files,$(USRSRC_SLASH),*.cpp)
CSRC += $(call target_files,$(USRSRC_SLASH),*.c)

APPSOURCES=$(call target_files,$(USRSRC_SLASH),*.cpp)
APPSOURCES+=$(call target_files,$(USRSRC_SLASH),*.c)
ifeq ($(strip $(APPSOURCES)),)
$(error "No sources found in $(SOURCE_PATH)/$(USRSRC)")
endif

CPPFLAGS+=-DMCP2515_NORMAL_WRITES
```

---

### LICENSE

Unless stated elsewhere, file headers or otherwise, all files herein are licensed under The MIT License (MIT). For more information, please read the LICENSE file.

If you have questions about software licensing, please contact Particle [support](https://support.particle.io/).

---
### LICENSE FAQ

**This firmware is released under The MIT License (MIT), what does that mean for you?**

 * You may use this commercially to build applications for your devices!  You **DO NOT** need to distribute your object files or the source code of your application under The MIT License.  Your source can be released under a non-MIT license.  Your source code belongs to you when you build an application using this library.

**When am I required to share my code?**

 * You are **NOT required** to share your application firmware binaries, source, or object files when linking against libraries or System Firmware licensed under LGPL.

**Why?**

 * This license allows businesses to confidently build firmware and make devices without risk to their intellectual property, while at the same time helping the community benefit from non-proprietary contributions to the shared reference firmware.

**Questions / Concerns?**

 * Particle intends for this firmware to be commercially useful and safe for our community of makers and enterprises.  Please [Contact Us](https://support.particle.io/) if you have any questions or concerns, or if you require special licensing.

_(Note!  This FAQ isn't meant to be legal advice, if you're unsure, please consult an attorney)_

---

### CONTRIBUTE

Want to contribute to the Particle tracker edge firmware project? Follow [this link](CONTRIBUTING.md) to find out how.

---

### CONNECT

Having problems or have awesome suggestions? Connect with us [here.](https://community.particle.io/)

---

### Revision History

#### 1.0.1 (2024-09-30)
* Added support for 12 MHz crystal on MCP2515

#### 1.0.0
* Initial file commit
