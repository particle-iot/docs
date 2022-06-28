---
title: Troubleshooting Asset Tracker Issues
layout: commonTwo.hbs
columns: two
---

# {{{title}}}
## <Introduction>

The purpose of this document is to outline troubleshooting steps for the Asset Tracker. As a start, you can read here to know about the Asset Tracker: [https://docs.particle.io/tutorials/asset-tracking/introduction/ ](/tutorials/asset-tracking/introduction/)This article is divided into the follow sections:

* [Datasheets](#h%5F01FPVVTE9EGRRB36WAP7F4DK22)
* [Setup & Claim](#h%5F01FPVVTQWC9DPRF3WT1SPNYQK6)
* [Common issues and queries you might have](#h%5F01FPVVV3VEJ5V2F2KXQV31W0VY)
* [Sleep & Shipping Mode](#h%5F01FPVVVEAJBSDVMA6XPAKCVDS5)
* [Tracker Edge firmware is Open Source](#h%5F01FPVVVRQJMCW68MSY5BYRK0HQ)
* [M8 & CAN BUS](#h%5F01FPVVW1P3XHDSZ49B4QEAZPS3)
* [Accelerometer Gyro](#h%5F01FPVVW8SBDBSX35X2SJPJ72Z5)
* [Location & Enhance Location Events](#h%5F01FPVVWGVKWBTCQH69DXBK0852)
* [Cloud API](#h%5F01FPVVWSN06R6YJ0RMNJGQ9B8X)
* [Settings](#h%5F01FPVVXEWCABCKHBH8ZVRR8KJ5)
* [Extra Information on Supported Commands](#h%5F01FPVVXQFGSKKC8XZF48GW7VQM)
* [Application Notes](#h%5F01FPVVY80NQ5CK4CT1D4KJYN1V)

## <Datasheets>

Our datasheets are a good reference for any power, connectivity and schematic questions you might have.

SoM: <https://docs.particle.io/datasheets/asset-tracking/tracker-som-datasheet/>

Evaluation Board: <https://docs.particle.io/datasheets/asset-tracking/tracker-som-eval-board/>

Asset Tracker: <https://docs.particle.io/datasheets/asset-tracking/tracker-one/>

## [**Setup & Claim**](Setup-Claim)

If you have used other Particle Devices, you will have noticed that the setup flow is different. This is mainly because it requires a Product and GPS / GNSS signal lock. Please read here: <https://docs.particle.io/tutorials/asset-tracking/setup/#setup>

Asset Trackers must first be **claimed to a Product before they can be claimed by a user**, <https://docs.particle.io/tutorials/asset-tracking/setup/#create-a-product>. Asset Trackers don't operate outside of a Product. 

When moving Asset Trackers across accounts, you have to unclaim both ICCID / SIM and Device ID.

## [**Common issues and queries you might have**](Common-issues%20and-queries)

As a best practice, **upgrade the Tracker Edge firmware to the latest version**: <https://github.com/particle-iot/tracker-edge/releases/latest>

This might mitigate issues with OTA loops, GPS signalling, publishing and also improve stability.

For the 1st time your setup, if you see that the **setup time of GPS / GNSS signal lock** is taking time. Please make a coffee and check back again. The initial setup in certain locations might take up to 20 minutes. This can be due to interference from nearby buildings.

Make sure you use the **Mark As Development Device option** for your Tracker device in your Tracker product. If you don't mark the device as a development device it will be flashed with the default or locked product firmware version immediately after connecting to the cloud, overwriting any application you just flashed.

Is Tracker **officially supported for connectivity in your country**? Do check [here](/tutorials/cellular-connectivity/cellular-carriers/?tab=ByDevice&device=Tracker%20T524%2FONE524%20LTE%20CAT1%2F3G%2F2G%20%28Europe%29%20EtherSIM&region=All).

Since the I2C and Serial1 lines are shared on the M8 connector of the Tracker One, the customer must choose one or the other. The I2C interface on this connector is Wire3 and it is the same interface as Wire but the pins have been rerouted on the MCU to override the Serial1 pins.

To use any IO on the M8 port the user must enable the CAN 5V power. This was done in order keep IO leakage current low when Tracker One is in shipping mode when things may be attached to the port otherwise the battery will get drained quickly. The user may complain that none of the IO lines work or suddenly shut off during sleep. Control over this power line can be managed automatically but using the configuration object passed during init(). Details are here <https://docs.particle.io/reference/asset-tracking/tracker-edge-firmware/#trackerconfiguration>

## [**Sleep & Shipping Mode**](Sleep-Shipping-Mode)

Sleep modes are listed here: <https://docs.particle.io/tutorials/asset-tracking/tracker-sleep/>

Shipping mode powers off the device by disconnecting the battery. This allows a Tracker One to be shipped in a way that the battery does not discharge without having to open the case and disconnect the battery. Note that you can easily exit shipping mode by connecting the device to USB power or power by the M8 connector. To enter shipping mode, enter {"cmd":"enter\_shipping"} into the cmd input box at the web console: <https://docs.particle.io/tutorials/device-cloud/console/#using-the-cmd-box>

## [**Tracker Edge firmware is Open Source**](Tracker-Edge-firmware-is-Open-Source)

Tracker Edge firmware can be used off the shelf or modified. The Tracker One firmware is customizable making it possible to add new sensors, customize behavior such as the gyrometer settings or create custom applications.

Read more: <https://docs.particle.io/tutorials/asset-tracking/setup/#device-firmware>

The Tracker Edge firmware can be downloaded from Github: <https://github.com/particle-iot/tracker-edge>

## [**M8 & CAN BUS**](M8-CAN-BUS)

The Tracker can be expanded without opening the case by using the M8 connector:

<https://docs.particle.io/tutorials/asset-tracking/tracker-one-expansion/#tracker-one-m8-connector>

CAN Specifications: <https://docs.particle.io/datasheets/asset-tracking/tracker-som-datasheet/#can-specifications>

This application note shows how to use the CAN bus for OBD-II to retrieve engine RPM:

<https://docs.particle.io/datasheets/app-notes/an017-tracker-can/>

Explanation on CAN:

<https://docs.particle.io/tutorials/asset-tracking/can-bus/>

## [**Accelerometer Gyro**](Accelerometer-Gyro)

Tips on customizing the Accelerometer: <https://community.particle.io/t/customizing-the-imu-triggers/60169>

More advanced use of real-time accelerometer data can be accessed similar to the IMU test application here <https://github.com/particle-iot/asset-tracker-fw-private/blob/develop/lib/bmi160/test/main.cpp>

## [**Location & Enhance Location Events**](Location-Enhance-Location-Events)

Explanation on Location Events: <https://docs.particle.io/reference/device-cloud/api/#asset-tracking-events>

## Cloud API

Tracker API functions: <https://docs.particle.io/reference/device-cloud/api/#asset-tracking>

## Settings

Above all, if you see something amiss, remember to check the cloud settings:

<https://docs.particle.io/tutorials/asset-tracking/tracker-sleep/#cloud-settings>

This settings can be configured across your whole device fleet, or for individual devices that are marked as development devices. These settings include location, publish on motion, motion sensitivity and many others. For example, **if enhanced location setting is disabled**, such information will not be published to your events logs.
  
  
## Extra Information on Supported Commands

This wiki from the internal tracker repo documents the commands that you can enter from the console to override or perform other tasks that are not visible through the settings pages.

<https://github.com/particle-iot/asset-tracker-fw-private/wiki/Various-Console-Commands>
  
  
## Application Notes

If you like to dive deeper, we have many application tutorials:

<https://docs.particle.io/datasheets/app-notes/an012-tracker-1wire/>

<https://docs.particle.io/datasheets/app-notes/an013-tracker-gpio/>

<https://docs.particle.io/datasheets/app-notes/an014-tracker-i2c-scanner/>

<https://docs.particle.io/datasheets/app-notes/an015-tracker-breakout/>

<https://docs.particle.io/datasheets/app-notes/an016-tracker-keypad-lcd/>

<https://docs.particle.io/datasheets/app-notes/an017-tracker-can/>

<https://docs.particle.io/datasheets/app-notes/an018-tracker-level/>

<https://docs.particle.io/datasheets/app-notes/an019-tracker-prototype/>

<https://docs.particle.io/datasheets/app-notes/an020-tracker-4-20ma/>

<https://docs.particle.io/datasheets/app-notes/an021-tracker-4-20ma-quad/>

<https://docs.particle.io/datasheets/app-notes/an022-tracker-sht3x-temperature-humidity/>

<https://docs.particle.io/datasheets/app-notes/an024-tracker-rel>

<https://docs.particle.io/datasheets/app-notes/an025-tracker-som-first-board/>

<https://docs.particle.io/datasheets/app-notes/an026-tracker-current-solutions-accelerator/>

<https://docs.particle.io/datasheets/app-notes/an027-tracker-buttons-leds/>
