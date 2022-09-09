There are a few common reasons your old code will continue to run after you attempt to flash new code to the device:

#### Flash failed (OTA)

Flashing OTA requires that the device be online and breathing cyan. If the device recently went offline, or recently lost its cloud connection, it's possible that the flash could fail. 

In the successful case, the device should blink magenta, then reboot, blink once white (maybe), then go through blinking green, blinking cyan, then breathing cyan. It's also possible that instead of breathing cyan, it will go into breathing magenta, then reboot one or more times to update dependencies.

If the flash fails, your old code will continue to run until the new code is successfully downloaded.

#### Flashing failed (USB)

When flashing by USB from the Particle CLI, you should use DFU mode (blinking yellow) and the

```
particle flash --usb firmware.bin
```

command. This provides better error reporting than using listening mode (blinking dark blue) and the `--serial` option.

If you get an error about the platform not matching, do not use the `--force` option. It will never help. 

Make sure you are targeting the correct device:

- In Workbench: **Particle: Configure Project for Device** from the command palette (Ctrl-Shift-P or Command-Shift-P).

- In the Particle CLI, the first parameter specifies the platform (boron, argon, bsom, b5som, etc.).

- Note that some devices seem similar but use different platforms, for example bsom (B4xx) and b5som (B5xx). Make sure you are using the correct one.

- In the Web IDE, make sure the device has a gold star to the left of the name in the Devices list.


#### Product device is not marked as a developer device

If your device has been added to a product and is not marked as a development device, as soon as it connects to the cloud it may immediately get a software update to the current product default or locked firmware version. This may happen so quickly it's barely noticeable, but if the device comes online (breathing cyan) and immediately begins blinking magenta, then reboots, the is likely what is happening.

Use the Mark as development device feature in the product to allow the device to remain in the product but not receive automatic firmware updates.

#### 256K binary edge case

{{!-- BEGIN shared-blurb c44d9da5-6a99-46cc-a6e9-c9405c8fc578 --}}
On Gen 3 devices including the Argon, Boron, B Series SoM, and Tracker, when upgrading from 3.0 or earlier to 3.1 or later, there is an edge case that can cause your old code to run. This will only occur when flashing over USB from Workbench, or using `particle flash --usb` or `particle flash --serial` from the Particle CLI. This problem does not occur with OTA flashing or Device Restore.

When binaries were expanded from 128K to 256K maximum, this was accomplished by moving the start address 128K earlier in flash memory. The logic in the Device OS 3.1.0 and later bootloader is to check the 128K slot first, if there is a valid binary it will be used. This is necessary to make sure you can successfully using `particle flash <device> tinker`, `particle flash --usb tinker`, or the flash Tinker from the mobile apps.

The problem is that if your 256K binary is less than 128K in size, the `particle flash --usb` command and Workbench **Particle: Flash application** commands do not invalidate the old 128K binary slot, which causes the old 128K binary to continue to run.

The best workaround is to upgrade the device using [Device Restore USB](/tools/device-restore/device-restore-usb/) first, as it will clear the 128K binary slot during upgrade. This is only necessary once, when upgrading from before 3.1.0, to 3.1.0 or later.
{{!-- END shared-blurb --}}

For more information, see [256K User Binaries](/reference/device-os/256K-user-binaries/).
