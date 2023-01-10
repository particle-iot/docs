---
title: Battery calculator
columns: two
layout: commonTwo.hbs
description: Battery calculator
includeDefinitions: [api-helper, api-helper-extras, battery-calculator]
---

# {{title}}

This tool provides a rough estimate of how long your device will run on a battery given various sleep parameters. This is only a rough estimate and you should always confirm the calculations with actual devices in your intended environment.


Select the type of device you wish to calculate for:

{{> battery-calculator deviceSelect="1"}}

{{content-guard op="start" mode="family-tracker"}}
Tracker content goes here
{{content-guard op="else"}}
Non-Tracker content goes here
{{content-guard op="end"}}

{{> battery-calculator sleepMode="1"}}


{{content-guard op="start" mode="family-tracker-one"}}
The Tracker One has a built-in 2000 mAh LiPo battery. You should leave the battery size set at 2000.
{{content-guard op="else"}}
The standard Particle battery for this device is 1800 mAh, however you can use a larger battery. Common sizes include: xxx.
{{content-guard op="end"}}

{{> battery-calculator parameter="batterySize" label="Battery size" default="mAh"}}

Number of publishes per day:

{{> battery-calculator parameter="numPublishes" label="Publishes per day" default="24"}}


{{> battery-calculator parameter="connectTime" label="Time to connect and publish" default="15" labelAfter="seconds"}}


{{> battery-calculator parameter="afterPublish" label="Time to stay awake after publish" default="10" labelAfter="seconds"}}


{{> battery-calculator parameter="numPartialWake" label="Partial wakes" default="0"}}

{{> battery-calculator parameter="partialWakeTime" label="Partial wake duration" default="10" labelAfter="seconds"}}

{{> battery-calculator parameter="reservePct" label="Battery percentage to reserve" default="10" labelAfter="%"}}
