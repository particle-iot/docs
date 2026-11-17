---
title: Test
columns: two
layout: commonTwo.hbs
description: Testing devices during manufacturing
guide-custom-images: default
---

# {{title}}

{{section-nav}}


{{content-nav}}

## Manufacturing test

A common step is to run specialized firmware designed to test all of the feature of your hardware, without requiring a cloud connection.


## Onboard your device to the Particle platform (if not already done)

If you did not import all of your devices into the Particle cloud at the beginning, you could do it now, one device at a time.


## End-to-end test

You may want to do a full end-to-end test, making a full connection to the Particle cloud over cellular. This provides the best assurance that everything will work properly when your customer receives their device.

There are a few reasons why you may not be able to do this, however:

If your CM is doing testing, and are out of the service area for your device, it may not be practical. For example, if you are based on the B404X B-SoM, but your CM is based in China, they will be unable to make a cellular connection using the B404X. 

In the basic plan, billing starts as soon as the device connects to the Particle cloud the first time. You can program the device offline (by USB or SWD/JTAG) without starting billing. In the enterprise plan, there is a manufacturing grace period that allows billing to be stopped after manufacturing.


{{section-nav}}


