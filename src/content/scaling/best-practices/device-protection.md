---
title: Device Protection
columns: two
layout: commonTwo.hbs
description: Device Protection
---

# {{title}}

Device Protection protects your Particle devices from malicious access at the device. While the Particle cloud protects
your devices from remote attackers, Device Protection can help protect against attackers who have physical
access to your device.

Device Protection:

- Prevents SWD/JTAG debugger access including flash programming and flash read-out
- Prevents local flashing of user firmware or Device OS by USB or BLE
- Disables control of the device locally by USB or BLE

Additionally, the Particle Cloud will prevent flashing unauthorized firmware on Protected Devices, including flashing ad-hoc applications, downgrading Device OS to versions prior to 6.x, and flashing product firmware versions that are not protected, even with valid access tokens.


## Upgrade process

Device Protection is enabled for your organization as part of your enterprise plan contract.

{{step-diagram op="start"}}
```json
{
    "width": 450,
    "steps": [
        {
            "title": "Device protection enabled in the cloud"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Product firmware targeting Device OS 6.x released to devices"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Device receives and applies update"
        },
        {
            "kind": "arrow"
        },
        {
            "title": "Device is protected!"
        }
    ]
}
```
{{step-diagram op="end"}}

- Build a version of your product firmware that targets Device OS {{minimumDeviceProtectionVersion}} or later. This is required to enable Device Protection.

- Release this version to a subset of your fleet using [device groups](/getting-started/console/device-groups/), or to your entire fleet.

- The new firmware will be flashed to your devices using [intelligent OTA](/getting-started/cloud/ota-updates/#intelligent-firmware-releases), then reboot.

- The device will apply the upgrade to the 6.x version of Device OS that your firmware targets, then reboot and connect to the Particle cloud.

- Once these conditions are met Device Protection will be enabled on the device!

You can see the Device Protection status in the [Particle console](https://console.particle.io/) in the device vitals for individual product devices, and in the fleet health reports.

Once Device Protection is enabled, there is no way to turn it back off! We recommend using a separate product for software development so you can still access local flashing and the SWD/JTAG debugger for devices in that product during development.

## Testing with Device OS 6.x

Device Protection can only be tested with enterprise accounts that have one or more products with it enabled at this time. Once Particle has enabled a product with Device Protection:

- Add your device to the Device Protection enabled product using the **Add devices** button. You will need the device ID or serial number of your device for this step.

![](/assets/images/device-protection/console-add-devices.png)

- Select **...** then **Mark as development device**. This is only for initial testing, and is not necessary when you deploy to a fleet of devices.

- In Particle Workbench, click the settings (gear) icon in the lower left, **Settings**, **Extensions**, **Particle**, then enable pre-release Device OS builds:

![](/assets/images/device-protection/workbench-enable-prerelease.png)

- Connect the device by USB to your computer. This is only necessary for initial testing; later on you can do the whole process OTA.

- Use **Particle: Configure project for device** and select the device you have added and Device OS {{minimumDeviceProtectionVersion}} or later.

- Open the source for your product firmware. 

- For initial testing, you will use **Particle: Flash application and Device OS (local)** to flash your product firmware and Device OS to the device over USB.

![](/assets/images/device-protection/workbench-flash.png)

- If this works successfully, upload the product firmware binary you created in the previous step as product firmware for your product with Device Protection enabled. Mark this firmware as product default.
	
- In the devices tab of your product, from the **...** menu for the device you added, select **Unmark as development**. 

- Your device will OTA the protected bootloader, and will go into Protected Mode once the OTA is complete. Refresh the device details page and you will now see see the following in the top section:

![](/assets/images/device-protection/console-active.png)

- If you want to test with additional devices, you can now simply add them to your product and they will be upgraded OTA.

- You can temporarily disable Device Protection using the Particle CLI [`particle device-protection disable`](/reference/developer-tools/cli/#particle-device-protection) command. This enables service mode so the device can temporarily access the USB serial port, for example.

