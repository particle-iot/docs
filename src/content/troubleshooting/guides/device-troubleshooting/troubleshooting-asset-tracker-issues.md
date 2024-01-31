---
title: Troubleshooting Asset Tracker Issues
layout: commonTwo.hbs
columns: two
---

# {{{title}}}

## Introduction

The purpose of this document is to outline troubleshooting steps for the Asset Tracker. As a start, you can read here to know about the Asset Tracker: [here](/getting-started/hardware/tracking-system/). This article is divided into the follow sections:


## Datasheets

Our datasheets are a good reference for any power, connectivity and schematic questions you might have.

- [Tracker SoM](/reference/datasheets/tracker/tracker-som-datasheet/)

- [Evaluation Board](/reference/datasheets/tracker/tracker-som-eval-board/)

- [Tracker One](/reference/datasheets/tracker/tracker-one/)

The Tracker One contains the Tracker SoM so you can find additional information about the heart of the Tracker One in the Tracker SoM datasheet.

## Setup & claim

If you have used other Particle Devices, you will have noticed that the setup flow is different. This is mainly because it requires a Product and GPS / GNSS signal lock. Please read [here]/tutorials/asset-tracking/setup/#setup]

Asset Trackers must first be **claimed to a Product before they can be claimed by a user**, [create a product](/getting-started/tracker/tracker-setup/#create-a-product). Asset Trackers don't operate outside of a Product. 

When moving Asset Trackers across accounts, you have to unclaim both ICCID / SIM and Device ID.

## Common issues and queries you might have

As a best practice, **upgrade the Tracker Edge firmware to the latest version**.

This might mitigate issues with OTA loops, GPS signalling, publishing and also improve stability.

For the 1st time your setup, if you see that the **setup time of GPS / GNSS signal lock** is taking time. Please make a coffee and check back again. The initial setup in certain locations might take up to 20 minutes. This can be due to interference from nearby buildings.

Make sure you use the **Mark As Development Device option** for your Tracker device in your Tracker product. If you don't mark the device as a development device it will be flashed with the default or locked product firmware version immediately after connecting to the cloud, overwriting any application you just flashed.

Is Tracker **officially supported for connectivity in your country**? Do check [here](/tutorials/cellular-connectivity/cellular-carriers/?tab=ByDevice&device=Tracker%20T524%2FONE524%20LTE%20CAT1%2F3G%2F2G%20%28Europe%29%20EtherSIM&region=All).

Since the I2C and Serial1 lines are shared on the M8 connector of the Tracker One, the customer must choose one or the other. The I2C interface on this connector is Wire3 and it is the same interface as Wire but the pins have been rerouted on the MCU to override the Serial1 pins.

To use any IO on the M8 port the user must enable the CAN 5V power. This was done in order keep IO leakage current low when Tracker One is in shipping mode when things may be attached to the port otherwise the battery will get drained quickly. The user may complain that none of the IO lines work or suddenly shut off during sleep. Control over this power line can be managed automatically but using the configuration object passed during init(). Details are [here](/firmware/tracker-edge/tracker-edge-api-reference/#trackerconfiguration)

## Sleep & shipping mode

Sleep modes are listed [here](/reference/tracker/tracker-sleep/)

Shipping mode powers off the device by disconnecting the battery. This allows a Tracker One to be shipped in a way that the battery does not discharge without having to open the case and disconnect the battery. Note that you can easily exit shipping mode by connecting the device to USB power or power by the M8 connector. To enter shipping mode, enter {"cmd":"enter\_shipping"} into the cmd input box at the [web console](/getting-started/console/console/#using-the-cmd-box)

## Tracker Edge firmware is open source

Tracker Edge firmware can be used off the shelf or modified. The Tracker One firmware is customizable making it possible to add new sensors, customize behavior such as the gyrometer settings or create custom applications.

[Read more](/getting-started/tracker/tracker-setup/#device-firmware)

The Tracker Edge firmware can be downloaded from [Github](https://github.com/particle-iot/tracker-edge)

## M8 & CAN bus

The Tracker can be expanded without opening the case by using the [M8 connector](/hardware/tracker/tracker-one-expansion/#tracker-one-m8-connector)

[CAN Specifications](/reference/datasheets/tracker/tracker-som-datasheet/#can-specifications)

The [CAN tutorial](/hardware/tracker/projects/tracker-can/) shows how to use the CAN bus for OBD-II to retrieve engine RPM.


[Explanation on CAN](/reference/tracker/can-bus/)

## Accelerometer gyro

[Tips on customizing the Accelerometer](https://community.particle.io/t/customizing-the-imu-triggers/60169)

## Location & enhance location events

[Explanation on Location Events]()/reference/device-cloud/api/#asset-tracking-events)

## Cloud API

[Tracker API functions](/reference/cloud-apis/api/#asset-tracking)

## Settings

Above all, if you see something amiss, remember to check the [cloud settings](/reference/tracker/tracker-sleep/#cloud-settings).

This settings can be configured across your whole device fleet, or for individual devices that are marked as development devices. These settings include location, publish on motion, motion sensitivity and many others. For example, **if enhanced location setting is disabled**, such information will not be published to your events logs.
  
  
