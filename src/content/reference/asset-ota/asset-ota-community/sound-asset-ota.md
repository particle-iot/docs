---
title: Sound Asset OTA
columns: two
layout: commonTwo.hbs
description: Sound Asset OTA
includeDefinitions: [api-helper, api-helper-extras,api-helper-projects,ble-serial,zip]
---

# {{title}}

 Example application that demonstrates delivering sound samples to Particle devices using Asset OTA.

 ![Overview Image](/assets/images/asset-ota/sound-asset-ota/sounds-example.jpg)

## How It Works
 At a high level, the example does the following:
 * You use Asset OTA to bundle sound samples along with your application binary
 * Upon receiving the samples, the Particle device will copy them to an external SD card
 * Playback control of the audio files is done over the Particle Console

 ## Required Hardware
 To follow along you'll need the following hardware:
 * A Feather-based Particle module (Argon, Boron, Photon 2) 
 * Adafruit Music Maker FeatherWing (pictured is the w/Amp variant)
 * A speaker (can be either 4Ω 3W or 8Ω 1W)
 * A microSD card (FAT16/FAT32 formatted)
 * Optional: a FeatherWing Doubler simplifies wiring (but requires soldering)

 ## Wiring Diagram
 ![Wiring Diagram](/assets/images/asset-ota/sound-asset-ota//wiring-diagram.png)

## Firmware

{{> project-browser project="sound-asset-ota" default-file="src/aota-sounds-example.ino" height="400" flash="false"}}


 ## Additional References
* Getting Started with [Asset OTA](/reference/asset-ota/asset-ota/) 
* Adafruit Music Maker FeatherWing [Tutorial](https://learn.adafruit.com/adafruit-music-maker-featherwing/)



Contributed by Manuel Orduño, Solutions Architect at Particle. Github: [morduno-particle](https://github.com/morduno-particle/aota-sounds-example/).




