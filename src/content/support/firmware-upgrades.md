---
title: Firmware Upgrades
template: support.hbs
columns: two
devices: [ photon, core ]
order: 4
---

{{#if photon}}

# Firmware Upgrades 

## Proper Firmware Upgrade on a Mac

With any good product you will need to upgrade the firmware periodically to keep your device up to date with the newest features, bug fixes, and optimizations. If you're reading this, that is probably why you're here now and that's a good thing.

With a lot of resources out on our [community](https://community.particle.io/), [firmware github repo](https://github.com/spark/firmware/releases), and [the web in general](http://lmgtfy.com/?q=particle) we just wanted to make it simpler for our users to upgrade their devices to our newest firmware. Please find the corresponding section below that best meets the circumstance that your device may be under to ensure a successful firmware upgrade.

**Prerequisites:**
- [Node.JS installed](https://nodejs.org/)
- [Particle CLI](https://github.com/spark/particle-cli) installed--for quick installation issue ```npm install -g particle-cli```
- [DFU-util](http://webcache.googleusercontent.com/search?q=cache:_XtenAD0iaIJ:brewformulas.org/DfuUtil+&cd=1&hl=en&ct=clnk&gl=us) for mac installed--for quick installation issue ```brew install dfu-util``` with [Homebrew](http://brew.sh/) installed as well


###My Photon is Breathing Cyan (Connected to Internet)
If you're photon is breathing cyan that is always a great thing to see in regards to our our [Device modes](/guide/getting-started/modes/photon). This means you've previously setup your device or you've at least got the Photon connected to the internet and our cloud. 

To upgrade to our newest set of firmware, it usually good to check our github firmware releases page [here](https://github.com/spark/firmware/releases).
Whichever firmware you feel safe upgrading to or, in some cases, downgrading to will be listed on the [releases page](https://github.com/spark/firmware/releases). 

If your device is connected to the internet then you should be able to perform a firmware upgrade via OTA (over the air) method.

**Instructions for OTA method:**

1. In the firmware release version you plan to switch to, download the both system parts (2) from the [releases page](https://github.com/spark/firmware/releases) for the Photon. Make sure not download the firmware binaries for the wrong device.
2. Once you have both *.bin* files downloaded switch to the directory where you dowloaded those files via terminal on your Mac
3. Assuming your device is connected to the internet issue ```particle list``` to get the device name--copy and save it for use.
4. Next, to   


{{/if}}