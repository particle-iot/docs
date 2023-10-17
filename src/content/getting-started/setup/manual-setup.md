---
title: Manual setup
columns: two
layout: commonTwo.hbs
description: Manual setup
includeDefinitions: [api-helper, api-helper-extras, api-helper-usb]
---

# {{title}}

We highly recommend using the [web-based setup](https://setup.particle.io/) as it is automatic and significantly easier to use, however you can also use the following steps to set up your device manually.

Note that these instructions are intended to be used to set up individual developer devices, not product fleets, though there are some common steps.

If you are interested in setting up customer Wi-Fi for product fleets, see [Wi-Fi setup options](/reference/device-os/wifi-setup-options/).


## Prerequisites 

- Manual setup requires a Windows, Linux, or Mac computer. It cannot be completed on a phone, tablet, or Chromebook.

- You must install the [Particle CLI](/getting-started/developer-tools/cli/).

- You must have a free Particle account. Sign in or sign up here:

{{> sso }}

- The setup process will configure your device by USB, so you will need an appropriate USB cable to connect your device to your computer.

{{collapse op="start" label="Show device cable types" indent="32px"}}

{{!-- BEGIN do not edit content below, it is automatically generated 58997959-6743-4757-8081-18a46c2f6abf --}}

| SKU | Description | USB Cable |
| :--- | :--- | :--- |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | Micro B |
| ARG-LDKT | Argon Leak Detection Kit [x1] | Micro B |
| ARG-STRTKT | Argon Starter Kit [x1] | Micro B |
| ARGN-H | Argon [x1] | Micro B |
| ARGNKIT | Argon, Starter Kit  [x1] | Micro B |
| ASSET2GV2 | Asset Tracker 2G | Micro B |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | Micro B |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | Micro B |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | Micro B |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | Micro B |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | Micro B |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | Micro B |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | Micro B |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | Micro B |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | Micro B |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | Micro B |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | Micro B |
| E350KIT | Electron 2G Kit (Global) | Micro B |
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | Micro B |
| E404KIT | E Series LTE CAT-M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | Micro B |
| M2EVAL | Particle M.2 SoM Evaluation Board [x1] | USB-C |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Micro B |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | Micro B |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | Micro B |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | USB-C |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | USB-C |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | USB-C |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | USB-C |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | Micro B |
| PHN2KIT | Photon 2, Kit [x1] | Micro B |
| PHN2MEA | Photon 2 [x1] | Micro B |
| PHOTONH | Photon with Headers, [x1] | Micro B |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | Micro B |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | Micro B |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | Micro B |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | Micro B |
| SPKBTTN | Internet Button, [x1] | Micro B |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | USB-C |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | Micro B |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | Micro B |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | Micro B |


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}


- Cellular devices with a 2G/3G or LTE/2G/3G cellular modem require a battery.

{{collapse op="start" label="Show device battery requirement" indent="32px"}}


{{!-- BEGIN do not edit content below, it is automatically generated 4db96e4d-e7bd-4f43-a5dc-2c1db07fd338 --}}

| SKU | Description | Battery Required |
| :--- | :--- | :---: |
| ARG-AQKT | Argon Air Quality Monitor Kit [x1] | &nbsp; |
| ARG-LDKT | Argon Leak Detection Kit [x1] | &nbsp; |
| ARG-STRTKT | Argon Starter Kit [x1] | &nbsp; |
| ARGN-H | Argon [x1] | &nbsp; |
| ARGNKIT | Argon, Starter Kit  [x1] | &nbsp; |
| ASSET2GV2 | Asset Tracker 2G | &check; |
| ASSET3G260V2 | Asset Tracker 3G (Americas/Aus) | &check; |
| ASSET3G270V2 | Asset Tracker 3G (Eur/Asia/Afr) | &check; |
| B402MEA | B Series LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| B404MEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| B404XMEA | B Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| B523MEA | B Series LTE CAT-1/3G/2G (Europe) [x1] | &check; |
| B524MEA | B Series LTE CAT-1/3G/2G (Europe, EtherSIM) [x1] | &check; |
| BRN310KIT | Boron 2G/3G (Global) Starter Kit, [x1] | &check; |
| BRN314KIT | Boron 2G/3G (Global) Starter Kit, [x1] | &check; |
| BRN402 | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN402-AQKT | Boron LTE CAT-M1 (NorAm) Air Quality Monitor Kit, [x1] | &nbsp; |
| BRN402KIT | Boron LTE CAT-M1 (NorAm), Starter Kit [x1] | &nbsp; |
| BRN404 | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN404KIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | &nbsp; |
| BRN404X | Boron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| BRN404XKIT | Boron LTE CAT-M1 (NorAm, EtherSIM), Starter Kit [x1] | &nbsp; |
| E260KIT | Electron 2G/3G (Americas/Aus) Starter Kit, [x1] | &check; |
| E270KIT | Electron 2G/3G (EMEA) Starter Kit, [x1] | &check; |
| E310KIT | E Series 2G/3G (Global - E310) Evaluation Kit, [x1] | &check; |
| E310MOD1 | E Series 2G/3G (Global - E310), [x1] | &check; |
| E313EA | E Series 2G/3G (Global - E313), [x1] | &check; |
| E314KIT | E Series 2G/3G (Global - E314) Evaluation Kit, [x1] | &check; |
| E314MOD1 | E Series 2G/3G (Global - E314), [x1] | &check; |
| E350KIT | Electron 2G Kit (Global) | &check; |
| E402KIT | E Series LTE CAT-M1 (NorAm) Evaluation Kit, [x1] | &nbsp; |
| E402MOD1 | E Series LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| E404KIT | E Series LTE CAT-M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | &nbsp; |
| E404MOD1 | E Series LTE CAT-M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| ELC402EA | Electron LTE CAT-M1 (NorAm), [x1] | &nbsp; |
| MON404E01C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | &nbsp; |
| MON404E02C01KIT | Monitor One LTE CAT-M1 (NorAm, EtherSIM), Particle Blue Enclosure, IO Card, Developer Edition [x1] | &nbsp; |
| MON524E01C01KIT | Monitor One LTE CAT-1/3G/2G (Europe, EtherSIM), Particle Transparent Enclosure, IO Card, Developer Edition [x1] | &nbsp; |
| ONE402MEA | Tracker One LTE M1 (NorAm), [x1] | &nbsp; |
| ONE404MEA | Tracker One LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| ONE523MEA | Tracker One LTE CAT1/3G/2G (Europe), [x1] | &check; |
| ONE524MEA | Tracker One LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| PHN2EDGEKIT | Edge ML Kit for Photon 2 (Photon 2 included) | &nbsp; |
| PHN2KIT | Photon 2, Kit [x1] | &nbsp; |
| PHN2MEA | Photon 2 [x1] | &nbsp; |
| PHOTONH | Photon with Headers, [x1] | &nbsp; |
| PHOTONKIT | Photon with Headers Starter Kit, [x1] | &nbsp; |
| PHOTONNOH | Photon without Headers, Dev board Kit [x1] | &nbsp; |
| SNSRKIT3G260 | Electron 3G (Americas/Aus) Sensor Kit, [x1] | &check; |
| SNSRKIT3G270 | Electron 3G (Eur/Asia/Afr) Sensor Kit, [x1] | &check; |
| T402MEA | Tracker SoM LTE M1 (NorAm), [x1] | &nbsp; |
| T402MKIT | Tracker SoM LTE M1 (NorAm) Evaluation Kit, [x1] | &nbsp; |
| T404MEA | Tracker SoM LTE M1 (NorAm, EtherSIM), [x1] | &nbsp; |
| T404MKIT | Tracker SoM LTE M1 (NorAm, EtherSIM) Evaluation Kit, [x1] | &nbsp; |
| T523MEA | Tracker SoM LTE CAT1/3G/2G (Europe), [x1] | &check; |
| T523MKIT | Tracker SoM LTE CAT1/3G/2G (Europe) Evaluation Kit, [x1] | &check; |
| T524MEA | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM), [x1] | &check; |
| T524MKIT | Tracker SoM LTE CAT1/3G/2G (Europe, EtherSIM) Evaluation Kit, [x1] | &check; |


{{!-- END do not edit content above, it is automatically generated  --}}

{{collapse op="end"}}


## Get a device identifier

In order to add your device to your product, you will need either:

- The Device ID of the device (24-character hexadecimal).
- The Serial Number of the device. On most devices, this is printed on a sticker on the device or package.

The CLI commands to claim a device and name a device require a Device ID. If you add a device to a product using the serial number, the console will show the Device ID corresponding to that serial number. The interactive tool below also does this.

### Interactive - get a device identifier

This tool will get information about your device connected to your computer by USB:

{{> usb-device-info }}

### CLI - Get a device identifier

If the device is not currently in listening mode (blinking dark blue), you can put it in listening mode using one of the following methods:

- Using the Particle CLI:
</p><div style="padding-left: 4px;"><p>
```
particle usb start-listening
```
</p></div><p>

- Alternatively, hold down the MODE (or SETUP) button until the status LED blinks dark blue.

Then use the Particle CLI command:

```
particle identify
```

This will output information about the device including the Device ID and Serial Number.


## Create or select a product

Particle devices can be used in a product, or as sandbox developer devices. Even if you are not planning on creating a commercial product, using a product makes it possible to:

- Use Device Vitals to get connectivity and battery information about your devices remotely
- Flash code on wake from sleep
- Allow controlled access to your devices by other users, if desired
- Group devices
- Easy migration to growth if you exceed the free plan limits

Using a product in the free plan is still free. You can have any combination of Wi-Fi and cellular devices in the free plan whether the devices are developer or product devices.

### Interactive - create or select a product

{{> create-or-select-product options="status"}}

### Console - create a product

- Go to the [Particle console](https://console.particle.io/). 

- Select **Products** in the left-hand icon bar.

- Click **New Product** in the upper right corner of the window.

- Fill in the fields and create the new product. Note the product ID of your new product. It's shown next to the key icon at the top of the window..

### Console - find an existing product

- Go to the [Particle console](https://console.particle.io/). 

- Select **Products** in the left-hand icon bar.

- Note the Product ID in the grid of products in your account.

- If you want to add to an organization product, select the Organization using the popup at the top of the window first.

## Add your device to your product

Adding a cellular device to a product also activates its SIM. If you skip this step, a cellular device may end up blinking green forever because it won't be able to connect to the cellular network.

### Interactive - add your device to your product

{{> add-device-to-product }}

The options for claim, mark as development, and name device are explained below.

### Console - add your device to your product

- Go to the [Particle console](https://console.particle.io/). 

- Select **Products** in the left-hand icon bar, then the product you want to add your device to.

- Select **Devices** (within the product, not at the top level).

- Click **Add Devices** and **Add One Device**.

- Enter the Device ID or Serial Number to add.

### CLI - Add your device to your product

```
particle product device add <product_id> <device_id>
```

## Claim your device

Claiming a device is separate from adding your device to a product. It makes your account the owner of the device, which allows to to so certain things like flash code directly to your device. Claiming is often unnecessary; Tracker devices using Tracker Edge often run as unclaimed product devices. However, if you are going to be writing and testing firmware on devices, you almost certainly will need to claim the device.

### CLI - Claim your device

This command looks similar to the one to add a device to a product, but it serves a different purpose: claiming a device to user account.

```
particle device add <device_id>
```


## Mark as development device

In addition to claiming a device, it's useful to mark the device as a development device. The main purpose is to allow you to manage your own firmware flashing for the device, so you can directly program testing firmware and other custom firmware to your device. If you do not mark the device as a development device, the cloud will immediately replace your custom firmware with the default product firmware, which is probably not what you want.

### Console - mark as development device

- Go to the [Particle console](https://console.particle.io/). 

- Select **Products** in the left-hand icon bar, then the product you want to add your device to.

- Select **Devices** (within the product, not at the top level).

- Click the **...** button to show the menu, and then select **Mark as development**.

There is no Particle CLI command to mark as a development device.

## Name your device

Naming your device makes it easier to identify devices in the console, but is not required.

You should avoid using a name as a unique identifier for devices in your product, as it's not always set and not guaranteed to be unique. You should instead use the Device ID when identifying devices in a database or back-end service.

### Console - name your device

- Go to the [Particle console](https://console.particle.io/). 

- Select **Products** in the left-hand icon bar, then the product you want to add your device to.

- Select **Devices** (within the product, not at the top level).

- Click on the Device ID for the device you want to rename to open the Device Information window.

- Click **Edit** in the upper right corner of the window.

- Edit the name and click **Save**.


### CLI - Name your device

```
particle device rename <device_id> <device_name>
```

## Configure Wi-Fi

This step is not necessary for cellular devices (or the Tracker, which uses Wi-Fi only for geolocation).

For Wi-Fi devices you will need to set the Wi-Fi credentials. You can do this using the Particle CLI.

Make sure the device is connected to your computer using a USB cable. Make sure it's a data cable, not just a charging cable.

If the device is not currently in listening mode (blinking dark blue), you can put it in listening mode using one of the following methods:

- Using the Particle CLI:
</p><div style="padding-left: 4px;"><p>
```
particle usb start-listening
```
</p></div><p>

- Alternatively, hold down the MODE (or SETUP) button until the status LED blinks dark blue.


Configure Wi-Fi:

```
particle serial wifi
```

This will interactively prompt for the SSID and password to use to connect to your Wi-Fi network.

After configuring Wi-Fi, the device should progress through the normal connection steps: blinking green, blinking cyan (light blue), fast blinking cyan, then breathing cyan.
