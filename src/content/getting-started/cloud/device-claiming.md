---
title: Device Claiming
layout: commonTwo.hbs
columns: two
---

# Device claiming

*A long treatise on Particle device claiming*

## What is claiming?

Claiming associates a device with a developer account or customer account. It sets the device's **owner**.

It's different than:

- Product membership, which associates a device with a product.
- SIM activation, which associates a SIM with a developer account or a product.

![](/assets/images/app-notes/AN039/claiming.png)

Each device is identified by its unique Device ID, the 24-character hexadecimal string that uniquely identifies each device. The Device ID never changes, even if the ownership of the device changes.

### Do I need to claim my devices?

{{note op="start" type="developer"}}
For developer (non-product devices), the device must be claimed in order to use any Particle cloud features.

This includes Particle primitives (publish, subscribe, functions, variables) and over-the-air code flashing.
{{note op="end"}}

{{note op="start" type="product"}}
For devices in a product, you can use unclaimed product devices if:

- You do not need to use the Wi-Fi device setup SDK for the Photon/P1
- You do not use webhooks in the sandbox of the user who claimed the device

However, you still will need to handle product membership and SIM activation even if you do not need to claim the device.

It was previously common for cellular products to claim all devices to a single account controlled by the product owner instead of using unclaimed product devices, but this is no longer necessary.

{{!-- BEGIN shared-blurb 04d55e8d-8af5-4d4b-b6a4-d4db886c669d --}}
- Prior to March 2023, claiming was required if the device firmware subscribed to events on-device. This is no longer necessary.
- You still need to claim a device is if you are using a webhook in the sandbox of the user who claimed the device. It is recommended that you use product webhooks instead, which do not require claiming.
- If you are using a device with Mark as Development device, you may want to claim the device to your account so you can easily OTA flash it from Particle Workbench or other development environments.
- If you previously had firmware that subscribed to events but was the device was unclaimed, the events previously disappeared. This is no longer the case and the device will now start receiving those events, and each event will count as a data operation.
- Claiming is still allowed, if you prefer to continue to use claiming, but not recommended.
{{!-- END shared-blurb --}}

{{note op="end"}}

### When do I need to do it?

{{note op="start" type="developer"}}
For developer (non-product devices), the device must be online and breathing cyan in order to claim the device.
{{note op="end"}}

{{note op="start" type="product"}}
For devices in a product, you can claim the device either:

- After adding the device to the product (even if it's offline)
- When the device is online and breathing cyan
{{note op="end"}}

### The device can be online while unclaimed?

Yes! Device claiming is unrelated to whether a device is online (breathing cyan) or not.

For cellular devices, SIM activation is necessary in order for the device to get online. If the SIM is not activated, then the device will be stuck in blinking green and you will not be able to claim a non-product device until it's online and breathing cyan.

### How is this related to billing?

{{note op="start" type="developer"}}
For developer (non-product) devices, there's a limit of 100 devices in the developer sandbox in the Free plan. The device ownership (who claimed it) determines which account this device counts toward the limit for.
{{note op="end"}}

{{note op="start" type="product"}}
For product devices, claiming is irrelevant. It's the total number of devices that are members of the product that count toward the block limit.
{{note op="end"}}

- Devices that are both claimed to an account **and** in a product, the device shows up in the developer sandbox device list but does not count toward the 100 device limit, except...
- If the account has free plan products in it, every device in those product count against the 100 device limit, but may or may not show up in the sandbox device list.

### How do I claim a device?

#### Particle CLI claiming

You can claim the device using the [Particle CLI](/getting-started/developer-tools/cli/):

```
particle device add <device-id>
```

You'll need to know the device ID to add the device this way, and the device must be online and breathing cyan.

A common sequence of events for setting up a Wi-Fi device using the CLI is:

```text
particle identify
particle usb dfu
particle update
particle serial wifi
particle device add <device-id>
particle device rename <device-id> <name>
particle usb setup-done
```

- When a new device reboots, it should go into listening mode (blinking dark blue), if not, it can be done by holding down the MODE (or SETUP) button until the status LED blinks dark blue, or by using `particle usb listen`.

- The `particle identify` command prints out the Device ID, which you will need in a later step.

- The `particle usb dfu` command puts the device in DFU (blinking yellow) mode. If you have a very old device, this may fail and you will need to use the buttons. Hold down MODE (or SETUP) and tap RESET. Continue to hold down MODE while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release.

- The `particle update` command updates Device OS on the device. This can be used to upgrade or downgrade to a specific version by using the `--target option`.

- The `particle serial wifi` command sets the Wi-Fi credentials. This is only necessary for the Photon, P1, and Argon.

- The `particle device add` command claims the device to your account. 

- The `particle device rename` command sets the name of the device (optional). 

- The `particle usb setup-done` command is only needed for Gen 3 devices such as the Argon or Boron.

#### setup.particle.io claiming

- Using [setup.particle.io](https://setup.particle.io) you can set up cellular devices, and also the Photon, as developer devices.

- This is also the recommended way to set up a small number of Tracker One devices.

- This is also a good way to activate a small number of developer SIM cards not part of a product.

#### Web IDE claiming

You can claim a device from the Web IDE. Open the **Devices** tab and at the bottom is an **Add Device** option. You'll need to know the device ID to add the device this way, and the device must be online and breathing cyan.

#### Particle cloud API claiming

You can claim a device using the Particle cloud API [claim a device endpoint](/reference/cloud-apis/api/#claim-a-device).

An example of doing this from node.js (Javascript) is [node-example-device-cloud-setup](https://github.com/particle-iot/node-example-device-cloud-setup). The example can be run locally on your computer, or in your web browser (even if you don't have node installed).

#### Customer claiming

If you are using [customers](#customers) you will most likely use [claim codes](#claim-codes), described below.

#### Product claiming

{{note op="start" type="product"}}
For product devices, you can claim the devices while offline by using the Particle cloud API [claim a device endpoint](/reference/cloud-apis/api/#claim-a-device). You would typically do this as part of your [manufacturing flow](/scaling/manufacturing/manufacturing-cellular/).
{{note op="end"}}

#### Particle mobile app claiming

The Particle mobile app will be deprecated in the future and should not be used as part of your normal setup flow at this time.

### Unclaiming a device

#### Console unclaiming

{{note op="start" type="developer"}}
For developer (non-product devices), you can unclaim a device from the top level **Devices** tab. Click the **...** button and select **Unclaim Device**.
{{note op="end"}}

{{note op="start" type="product"}}
For a product device, open the product then the product devices tab. Click the **...** button and select **Unclaim Device**.

- **Unclaim Device** removes the device owner for a product device. This works regardless of whether it's a single owner account, team member, or customer.

- **Remove Device** removes the Device ID from the product, making it no longer a product device. If the device still has product firmware on it, it will go into Quarantine until it is flashed with non-product firmware and comes online again.

- If you want to do both, unclaim first. Otherwise, the device will disappear from the console and you won't have an easy way to unclaim it.
{{note op="end"}}

Additionally:

- **Unclaiming a device does not deactivate its SIM!** 

- You can unclaim a device while it is offline as it's entirely a cloud-based operation.

#### Particle CLI unclaiming

You can unclaim the device using the [Particle CLI](/getting-started/developer-tools/cli/):

```
particle device remove <device-id>
```

You must be logged in as the owner of the device to remove it. The device does not need to be online to unclaim.

#### Web IDE unclaiming

You can unclaim developer devices from the Web IDE. Click on the **Devices** tab, then the device you want to unclaim, the **>** icon, then the red trash can icon ("Remove devices from account").

#### Particle cloud API unclaiming

The Particle cloud API [unclaim device](/reference/cloud-apis/api/#unclaim-device) endpoint is used to unclaim a device. There are two different endpoints, one for developer devices and one for product devices.

#### Note about Photon unclaiming

When you unclaim a device, it's a cloud-only operation. However, the Photon (and P1) also have a bit on the device that indicates the device has been claimed. If this bit is set the mobile app will warn you that the device has been claimed to another account when you try to claim it. This is merely a user interface issue. The device may in fact be unclaimed, and the mobile app will still allow you to claim it, regardless. 

The reason this occurs is that in order to find the Device ID, the mobile app needs to connect to the Photon Wi-Fi configuration network. At this point, it it can no longer access the Particle Cloud to see if the device is really claimed, so it uses the bit on the device as a user interface hint, but it doesn't really affect operation beyond an extraneous warning.

### Transferring a device

{{note op="start" type="developer"}}
- You can unclaim the device, then claim it to the new account.

- If you use the Particle mobile app with the Photon that is not in a product, you can transfer the device immediately.

- Using the Particle CLI or Web IDE, you can claim the device. If already claimed, you can request a transfer. The the original owner will be emailed and has to respond affirmatively for the transfer to take place.
{{note op="end"}}

{{note op="start" type="product"}}
- For product devices, you can unclaim a device from the console whether it's claimed to a single account, team member account, or customer account.

- Once unclaimed, you can leave it that way, or use one of the claiming methods above to claim it to a different account.
{{note op="end"}}



## Product membership

Product membership determines whether a given device (identified by its Device ID) can join the product. You generally want some control over this, because it may have billing implications!

Each product can have only one device platform in it. For example, the Argon and Boron need to be in separate products because they have different firmware binaries. However, it then gets more confusing:

- The Electron and E-Series are the same platform and can be in the same product.
- The Boron and B-Series are different platforms and must be in different products.
- The B4xx (bsom) and B5xx (b5som) are different platforms and must be in different products.
- The Photon and P1 are different platforms and must be in different products.
- All Tracker SoM devices (Tracker One and Tracker SoM, both T4xx and T5xx) can be in the same product.
- Tracker One and Monitor One devices can be in the same product, however because they use [Tracker Edge](/firmware/tracker-edge/tracker-edge-firmware/) and  [Monitor Edge](/firmware/tracker-edge/monitor-edge-firmware/) firmware, respectively, it's usually not practical to do so.


### Product firmware

Generally speaking, all devices in a product will be running similar firmware, often the same firmware, though it is possible to subdivide the devices in a product to use different firmware by using Device Groups.

Firmware is uploaded the the console and identified by a version number. This version number is also embedded in the binary by using a macro in the main .cpp or .ino file:

```
PRODUCT_VERSION(2);
```

The version number is a 16-bit unsigned integer (1 - 65535).

When a device connects to the cloud, the version in the binary is compared to the version specified for the product default, device group, or a specific device (lock firmware version). If there is a version mismatch, the correct version will be flashed. It's an equality test, so this will either move the version up or down.

### Version upgrades and downgrades

You can change the product firmware version by the fleet-wide default, a device group, or for a specific device. This will either happen immediately (intelligent OTA), at the next cloud connection (standard release), immediately on a device-specific basis (lock and flash), or when the device reconnects to the cloud (if offline).

This will either upgrade (move to a higher version number) or downgrade as necessary.

Device firmware includes a target Device OS version. This is the minimum version of Device OS that is required for the firmware to run. If the target Device OS version is greater than the version on the device, the device will go into safe mode (breathing magenta, red and blue at the same time), and then the cloud will update required dependencies such as Device OS (multiple parts if necessary), bootloader, Soft Device (Gen 3), and NCP (Gen 3, rarely).

However, since target Device OS version is a minimum, it is never downgraded. Your firmware that targets an older version of Device OS should generally work on newer versions of Device OS, however the full environment may vary from the way it was before upgrade then downgrade.

### Wildcard product firmware

With Device OS 4.0 and later, you must omit the `PRODUCT_ID`. Essentially all devices behave as if the wildcard product ID was used, and you must pre-add all Device IDs to your product prior to their connecting. It is not possible to use quarantine mode or auto-add with Device OS 4.0 and later.

With Device OS 3.x and earlier, the Product ID is also embedded in the firmware binary:

```
#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(1234);
#endif
```

With Device OS 1.5.x, 2.x, and 3.x, it is also possible to use a wildcard product ID:

```
#ifndef SYSTEM_VERSION_v400ALPHA1
PRODUCT_ID(PLATFORM_ID);
#endif
```

This is handy if you have multiple products running the same firmware. However, it requires that you add all device IDs to the product ahead of time,


### Adding device IDs to a product in advance

You should add Device IDs to products during manufacture. When you order devices in tray or reel quantities from the Particle wholesale store, you get a list of device IDs in the order. You can import the file into the Particle console.

You could also do this on a per-device basis as part of your [manufacturing flow](/scaling/manufacturing/manufacturing-cellular/).

This is required when using Device OS 4.0 or later, or if using the [wildcard PRODUCT_ID](#wildcard-product-firmware) macro. Since it is required for later versions, you should plan to switch to pre-adding Device IDs if you have not already done so.

For information about how this affects billing, see [Billing for added devices](/getting-started/products/creating-a-product/#billing-for-added-devices).

### Quarantine

**Quarantine is only supported for devices running Device OS 3.x and earlier.** It is not supported in Device OS 4.0 and later and you should move to pre-adding your Device IDs instead of using quarantine.

If a device has product firmware flashed to it with an explicit PRODUCT_ID defined, but the Device ID has not been added, it will be put into Quarantine by default.

The reason is that without quarantine, anyone who knows your product ID could take any random device and add it to your product.

![Quarantine](/assets/images/console/quarantine.png)

- Select a product, then **Devicess** (1).
- Expand **Denied Devices** (2) if necessary.
- Click **Approve** if desired.

If a device appears in Denied Devices and you do not want to approve it, make sure it's flashed with non-product firmware. The default Tinker app can be used. The next time the device comes online with non-product firmware it will disappear from the denied devices list.

#### Auto-approve

**Auto-approve is only supported for devices running Device OS 3.x and earlier.** It is not supported in Device OS 4.0 and later and you should move to pre-adding your Device IDs instead of using auto-approve or quarantine.

![Quarantine Settings](/assets/images/console/quarantine-settings.png)

- Select a product, then **Settings** (1).
- Select **Auto-Approve** (2). This is not recommended and not supported in Device OS 4.0 and later.

## SIM activation

### setup.particle.io SIM activation

From setup.particle.io you can activate a SIM:

- In a device with a built-in SIM (Boron, B-Series SoM, E-Series, Tracker, Electron LTE) from its serial number.
- A Particle SIM card for use in an Electron 2G/3G from the ICCID on the plastic SIM card.

### Product SIM activation

- If you add cellular device with an embedded MFF2 SIM to a product, the SIM is automatically activated so you don't need to add a separate step to do that.

- However for the Electron G350, Electron U260, Electron U270, or Electron ELC314 with a 4FF plastic SIM card, you do need to separately activate the SIM card from the console or cloud API.


### Console SIM activation

If you order a 50-pack of Particle SIM cards (plastic 4FF nano SIM cards) you will receive an email with the ICCIDs in the order. You can upload this file from the console to activate all of the SIM cards in bulk. Open the product, SIM Cards, then **Import SIM Cards**.

You can also activate a single SIM card this way, whether a 4FF plastic SIM card or a built-in MFF2 SMD SIM, using its ICCID.

### Cloud API SIM activation

You can activate SIMs using the Particle cloud API:

- [Developer SIMs](/reference/cloud-apis/api/#activate-sim)
- [Product SIMs](/reference/cloud-apis/api/#import-and-activate-product-sims)

### SIM activation speed

The amount of time it takes to activate or reactivate a SIM may depend on:

- The device
- Local conditions (the mobile carrier in your location)
- Whether you are activating the SIM the first time, or reactivating it after deactivating or releasing ownership of the SIM

{{!-- BEGIN do not edit content below, it is automatically generated fabf0754-7838-11ec-90d6-0242ac120003 --}}

| SKU | Device | SIM Activation Speed | Lifecycle | Replacement | 
| :-- | :----- | :------------------: | :-------: | :---------: |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Generally fast<sup>2</sup> | Deprecated | |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Generally fast<sup>2</sup> | Deprecated | |
| ASSET2GV2 | Asset Tracker 2G | Generally fast<sup>2</sup> | Deprecated | |
| B524MTY | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| B524MEA | B-Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | Fast<sup>1</sup> | GA | |
| B523MTY | B-Series LTE CAT-1/3G/2G (Europe), Tray [x50] | Sometimes slow<sup>3</sup> | NRND | B524MTY|
| B523MEA | B-Series LTE CAT-1/3G/2G (Europe) [x1] | Sometimes slow<sup>3</sup> | Deprecated | B524MEA|
| B504MTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x50] | Fast<sup>1</sup> | Deprecated | B504EMTY|
| B504MEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | Deprecated | B504EMEA|
| B504EMTY | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x50] | Fast<sup>1</sup> | GA | |
| B504EMEA | B-Series LTE CAT-1/3G (NorAm, EtherSIM+), [x1] | Fast<sup>1</sup> | GA | |
| B404XMTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| B404XMEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| B404MTY | B-Series LTE-M (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | NRND | B404XMTY|
| B404MEA | B-Series LTE-M (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | Deprecated | B404XMEA|
| B402MTY | B-Series LTE CAT-M1 (NorAm), Tray [x50] | Sometimes slow<sup>3</sup> | Deprecated | B404XMTY|
| B402MEA | B-Series LTE CAT-M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | B404XMEA|
| BRN404XTRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | Fast<sup>1</sup> | GA | |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Fast<sup>1</sup> | GA | |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Fast<sup>1</sup> | GA | |
| BRN404TRAY50 | Boron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | Deprecated | BRN404XTRAY50|
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Fast<sup>1</sup> | Deprecated | BRN404XKIT|
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Fast<sup>1</sup> | Deprecated | BRN404X|
| BRN402TRAY50 | Boron LTE CAT-M1 (NorAm), Tray [x50] | Sometimes slow<sup>3</sup> | NRND | BRN404XTRAY50|
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Sometimes slow<sup>3</sup> | Deprecated | BRN404XKIT|
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Sometimes slow<sup>3</sup> | Deprecated | |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | BRN404X|
| BRN314TRAY50 | Boron 2G/3G (Global), Tray [x50] | Fast<sup>1</sup> | Deprecated | |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Fast<sup>1</sup> | Deprecated | |
| BRN310TRAY50 | Boron 2G/3G (Global), Tray [x50] | Sometimes slow<sup>3</sup> | Deprecated | |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Sometimes slow<sup>3</sup> | Deprecated | |
| E404XTRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| E404TRAY50 | E-Series LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | Deprecated | E404XTRAY50|
| E404MOD1 | E-Series LTE-M (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | NRND | |
| E404KIT | E-Series LTE-M (NorAm, EtherSIM) Evaluation Kit, [x1] | Fast<sup>1</sup> | NRND | |
| E402TRAY50 | E-Series LTE CAT-M1 (NorAm), Tray [x50] | Sometimes slow<sup>3</sup> | NRND | E404XTRAY50|
| E402MOD1 | E-Series LTE CAT-M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | |
| E402KIT | E-Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | Sometimes slow<sup>3</sup> | NRND | |
| E314TRAY50 | E-Series 2G/3G (Global - E314), Tray [x50] | Fast<sup>1</sup> | NRND | |
| E314MOD1 | E-Series 2G/3G (Global - E314), [x1] | Fast<sup>1</sup> | Deprecated | |
| E314KIT | E-Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Fast<sup>1</sup> | NRND | |
| E313EA | E-Series 2G/3G (Global - E313), [x1] | Sometimes slow<sup>3</sup> | Deprecated | |
| E310TRAY50 | E-Series 2G/3G (Global - E310), Tray [x50] | Generally fast<sup>2</sup> | Deprecated | |
| E310MOD1 | E-Series 2G/3G (Global - E310), [x1] | Generally fast<sup>2</sup> | Deprecated | |
| E310KIT | E-Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Generally fast<sup>2</sup> | NRND | E314KIT|
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Generally fast<sup>2</sup> | Deprecated | BRN404XKIT|
| E260TRAY50 | Electron 2G/3G (Americas/Aus), Tray [x50] | Generally fast<sup>2</sup> | Deprecated | BRN404XTRAY50|
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Generally fast<sup>2</sup> | Deprecated | B524MEA|
| E270TRAY50 | Electron 2G/3G (EMEA), Tray [x50] | Generally fast<sup>2</sup> | NRND | B524MTY|
| E350KIT | Electron 2G Kit (Global) | Generally fast<sup>2</sup> | Deprecated | B524MEA|
| E350TRAY50 | Electron 2G (Global), Tray [x50] | Generally fast<sup>2</sup> | Deprecated | B524MTY|
| ELC314TY | Electron 2G/3G (Global - U201) , Tray [x50] | Fast<sup>1</sup> | NRND | |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | BRN404XKIT|
| ELC402TY | Electron LTE CAT-M1 (NorAm), Tray [x50] | Sometimes slow<sup>3</sup> | Deprecated | BRN404XTRAY50|
| ELC404TY | Electron LTE CAT-M1 (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | Deprecated | |
| ELC504EMEA | Electron 2 LTE CAT-1 bis (NorAm), [x1] | Fast<sup>1</sup> | In development | |
| ELC504EMTY | Electron 2 LTE CAT-1 bis (NorAm), [x50] | Fast<sup>1</sup> | In development | |
| ELC524EMEA | Electron 2 LTE CAT-1 bis (Europe), [x1] | Fast<sup>1</sup> | In development | |
| ELC524EMTY | Electron 2 LTE CAT-1 bis (Europe), [x50] | Fast<sup>1</sup> | In development | |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Generally fast<sup>2</sup> | Deprecated | |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Generally fast<sup>2</sup> | Deprecated | |
| M635MEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Fast<sup>1</sup> | In development | |
| M635EMEA | M-Series LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Fast<sup>1</sup> | In development | |
| M524MTY | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| M524MEA | M-Series LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| M404MTY | M-Series LTE-M/2G (Global, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| M404MEA | M-Series LTE-M/2G (Global, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Fast<sup>1</sup> | GA | |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | Fast<sup>1</sup> | In development | |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Fast<sup>1</sup> | GA | |
| MUONCBKIT | Muon Carrier Board Kit | Fast<sup>1</sup> | GA | |
| MUONCB-BETA | Muon Carrier Board - Beta Sample | Fast<sup>1</sup> | Deprecated | |
| MUONCB | Muon Carrier Board (Dev Board only) | Fast<sup>1</sup> | GA | |
| MUON635EA | Muon LTE M1/2G/Satellite Kit (Global, EtherSIM), [x1] | Fast<sup>1</sup> | In development | |
| MUON635 | Muon LTE M1/2G/Satellite Dev Board (Global, EtherSIM), [x1] | Fast<sup>1</sup> | In development | |
| MUON524EA | Muon LTE CAT1/3G/2G Kit (Europe, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| MUON524 | Muon LTE CAT1/3G/2G Dev Board (Europe, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| MUON404EA | Muon LTE-M/2G Kit (Global, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| MUON404 | Muon LTE-M/2G Dev Board (Global, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | ONE404MEA|
| ONE402MTY | Tracker One LTE M1 (NorAm), Bulk [x40] | Sometimes slow<sup>3</sup> | Deprecated | ONE404MTY|
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| ONE404MTY | Tracker One LTE M1 (NorAm, EtherSIM), Bulk [x40] | Fast<sup>1</sup> | GA | |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | Sometimes slow<sup>3</sup> | GA | ONE524MEA|
| ONE523MTY | Tracker One CAT1/3G/2G (Europe), Bulk [x40] | Sometimes slow<sup>3</sup> | GA | ONE524MTY|
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| ONE524MTY | Tracker One CAT1/3G/2G (Europe, EtherSIM), Bulk [x40] | Fast<sup>1</sup> | GA | |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | Sometimes slow<sup>3</sup> | Deprecated | T404MEA|
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | Sometimes slow<sup>3</sup> | Deprecated | T404MKIT|
| T402MTY | Tracker SoM LTE M1 (NorAm), Tray [x50] | Sometimes slow<sup>3</sup> | NRND | T404MTY|
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Fast<sup>1</sup> | GA | |
| T404MTY | Tracker SoM LTE M1 (NorAm, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | Sometimes slow<sup>3</sup> | Deprecated | T524MEA|
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | Sometimes slow<sup>3</sup> | NRND | T524MKIT|
| T523MTY | Tracker SoM LTE CAT1/3G/2G (Europe), Tray [x50] | Sometimes slow<sup>3</sup> | Deprecated | T524MTY|
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | Fast<sup>1</sup> | GA | |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | Fast<sup>1</sup> | GA | |
| T524MTY | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), Tray [x50] | Fast<sup>1</sup> | GA | |


{{!-- END do not edit content above, it is automatically generated fabf0754-7838-11ec-90d6-0242ac120003 --}}

- **Fast<sup>1</sup>**, you can generally activate the SIMs and the operation will occur within seconds.

- **Generally fast<sup>2</sup>** SIM activation generally takes seconds, or up to a minute. On rare occasions, initial SIM activation can take longer, up to a day.

- **Sometimes slow<sup>3</sup>**, the initial activation of a SIM from the factory generally occurs quickly. However, if you've deactivated the SIM, or released ownership of the SIM, reactivation can take tens of minutes, or sometimes days, to complete. Avoid situations where activation will be time-sensitive if possible. 

Note that moving a SIM from a developer account (free sandbox) into a product can be done without releasing ownership if the original SIM owner is also a team member. This allows the operation to proceed without disrupting the cellular connection.

## Customers

Customers are an optional feature. They allow API access to specific devices typically from a mobile app. They are more common for Wi-Fi products that use the Photon Device Setup SDK and Particle SDK for iOS or Android.

**We generally recommend not using customers**, unless you are using the device setup SDK for the P1 or Photon. It's generally unnecessary in other cases.

{{collapse op="start" label="Show older information"}}

In lieu of customers, many cellular products claim all devices to a single account or use unclaimed product devices. Not using customers does not preclude having a mobile app, it just requires you handle authentication and API access control from your servers instead of having Particle handle it for you. This may be preferable if you are contracting out your development as you can make a generic mobile app using native APIs or a framework with no specific Particle dependencies, which widens the possible number of mobile developers you can use. However, this is no longer necessary and unclaimed product devices are even easier than using a single claimed account.

There are two types of customers:

- Simple auth customers
- Two-legged shadow customers

With simple auth, the user registers with an email address and a password, and Particle handles storing this information and authenticating the user. While theoretically simple, in practice you likely won't be able to avoid having a server at some point. For example, there is no built-in way of handling password reset for simple auth users. MFA (multi-factor authentication) is not supported for simple auth.

![](/assets/images/tutorials/simple-auth.png)

With two-legged shadow customers you handle the authentication on your server. This allows you to keep all of the personally identifiable information about your customers on your servers. It's initially more complicated to set up, but in practice the flexibility makes it much more useful.

![](/assets/images/tutorials/two-legged.png)

In both cases, customers are different than normal Particle users in that they are specific to your product and only allow access to certain APIs. Customers cannot access things like the console or Web IDE, OTA code flashing, and cannot access product-level APIs.

Customers normally only get variables and call functions on their own devices. They cannot access other devices in the product fleet.

Remembers that customers are optional! If you already have your own server to handle authentication, you may prefer to make the Particle API calls from your own server. This is especially true for web apps, but is also applicable for mobile apps. It's often a significantly simpler design, especially for cellular devices.

![](/assets/images/tutorials/your-server.png)


### Claim codes

When using the Photon Device Setup SDK for iOS and Android you don't have to worry about claim codes, since it's handled automatically behind the scenes.

**If you are not using customers, claim codes are not necessary.**

However, claim codes solve the problem of having a device add itself to a product and claim without having to divulge a product authentication key to the mobile app. This keeps your product authentication tokens more secure. 

The claim code is generated by a cloud API call. This requires an oAuth create customer client ID and secret that only is used for claiming and does not allow access to anything else, so it's safe to hardcode it into your mobile app.

The claim code is passed to the cloud when the device first connects to the cloud. This claims the device to a user or customer.

![](/assets/images/tutorials/claim-simple.png)

A claim code alone may also may associate a device with a product. It's still best to associate devices with a product at time of manufacture, but it is also possible to do so with a claim code.

## Setting Wi-Fi credentials

### Photon setup SDK custom mobile app - Wi-Fi credentials

The Photon setup SDK allows you to create your own white label iOS or Android mobile app that can set up a Photon or P1. It can set up both developer devices as well as simple auth or two-legged shadow auth customers.

It cannot set up an Argon!

### Particle CLI - Wi-Fi credentials

With the device in listening mode (blinking dark blue):

```
particle serial wifi
```

## Setup done

On Gen 3 devices running Device OS 3.x and earlier, the setup done bit determines if setup has been completed. Until the setup done bit is set, the device will boot into listening mode (blinking dark blue), even if it has valid Wi-Fi credentials (Argon) or SIM activation (Boron, B-Series SoM, Tracker).

**If you are using Device OS 4.0 and later, there is no setup done bit so you must skip this step.**

### Particle CLI - setup done

Using the Particle CLI, you can set the setup done bit of a device connected by USB:

```
particle usb setup-done
```

This should be done with the device in normal operating mode or listening mode.


{{collapse op="end"}}


## Device identifiers

### Device ID

This is what is used internally for most device identification. It never changes. It's required for many cloud API calls.

It's always 24 hexadecimal characters (96 bits). You always need to use the whole Device ID, because all of the bits are significant.

### Serial number

The Particle serial number uniquely identifies a Particle device and can be used in many places to set up a device instead of the Device ID or ICCID.

It's typically printed under the data matrix (2D barcode, looks like a QR code) on most newer Particle devices.

Newer serial numbers begin with `P` followed by a 3-digit number. There are also other serial number formats that begin with a model identifier (such as E310).

The serial number is programmed into one-time-programmable (OTP) memory and cannot be changed. Some older Gen 2 devices do not have a serial number.

### Data matrix 

Most Particle device serial number stickers contain a data matrix code, a 2D barcode that looks like a QR code. This can be decoded by many handheld scanners and phone apps.

On Gen 3 devices the data matrix contains the serial number, a space, and the mobile secret (used during setup over BLE).

On other devices the data matrix only contains the serial number.

### Mobile secret

This is used on Gen 3 devices for setup over Bluetooth LE (BLE). It's not unique, but when combined with the serial number, is used for encrypted communication between the mobile app and the device over BLE.

### ICCID

This is the 19 to 21 digit number that identifies a SIM card. It always begins with 89. 

This is typically used when activating a SIM card, particularly 4FF plastic SIM cards. The number is printed both on the small (4FF nano) as well as the larger plastic card.

### IMEI

The IMEI is a unique identifier associated with the cellular modem. While devices with removable SIM card (Electron, Boron) you can swap the SIM card, which changes the ICCID, the IMEI remains constant.

Older Electrons with a u-blox sticker on the modem module, instead of a Particle serial number sticker, have the IMEI encoded in the 2D barcode.

If your device is banned from mobile networks, for example in Turkey if you do not register your device with its telecommunications authority, your device can be banned by IMEI. Thus even changing SIM cards will not allow the device to get online.

### Device name

The device name is optional. Within a developer account, the device name is unique.

In products, however, the device name is not unique if devices are claimed to multiple users or customers. Different users or customers can have devices with the same name.

### MAC Address

The MAC (media access control) Address uniquely identifies the Wi-Fi radio on the Photon, P1, Argon, and Tracker. It is assigned during manufacture and is typically 12 hexadecimal digits (48 bits).

The Particle Ethernet FeatherWing has a separate MAC address that is randomly assigned a site-local address that is not necessarily globally unique.
