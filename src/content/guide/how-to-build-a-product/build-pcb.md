---
title: Designing your own PCB
columns: 2
---

So you've got a prototype in a breadboard. It's probably a mess of wires, something like this:

**PUT A PICTURE OF A BREADBOARDED PROTOTYPE HERE**

Your first step towards a manufacturable product is to re-design this product into your own printed circuit board (PCB) using our modules (P0 or P1) rather than our development kits (Photon/Core).

### Hardware Requirements

To work with Particle, your hardware must meet a small list of requirements. They are:

- **Your device should use a supported hardware module.** While the firmware stack can be run on a variety of connectivity modules, we provide our own modules (the P0 and P1) as an out-of-the-box solution, and we can support other Broadcom WICED modules easily. You may also choose to port our firmware libraries to another module by implementing our [Hardware Abstraction Layer (HAL)](https://www.github.com/spark/firmware); this is, however, a more involved process. Please contact our [sales team](mailto:sales@particle.io) if you are interested in engaging us to support another hardware solution.
- **Your device must have an RGB LED and a button to enter 'setup mode'**. The RGB LED shows the user the connectivity status, while the 'setup' button lets your customer reconfigure the device. These components should be wired according to the [Photon reference design](https://www.github.com/spark/photon).
- **Your device must have an RF circuit and an antenna.** If you use the Photon or P1, the antenna is included in the hardware. If you use the P0, you must connect your own antenna. Please use the [Photon](https://www.github.com/spark/photon) as a reference design; if you use an antenna of equal or lesser gain, you may use the Photon's FCC/CE/IC modular certification.

### Transitioning from a dev kit to a module

Your first prototype was most likely built with a Core or a Photon in a breadboard. Your final product is likely to take one of four forms:

**Photon in female headers**. You may design female 0.1" headers into your product to provide a "slot" for the Photon. This is common for low-volume hand-soldered production. Please reference the [Photon design files](https://www.github.com/spark/photon) and the [Photon datasheet](#) for design guidelines.

**Surface mounted Photon**. The Photon comes with castellated edges and can be purchased without headers; in this form it can be surface mounted to your PCB. Please reference the [Photon design files](https://www.github.com/spark/photon) and the [Photon datasheet](#) for design guidelines.

**Transition to P0**. The P0 is the module on the Photon, which includes the microcontroller and Wi-Fi chip. The P0 can be purchased individually from our [online store](https://store.particle.io) or in bulk (contact [sales@particle.io](mailto:sales@particle.io)). When you transition from a Photon to the P0, you must reimplement on your board the following subsystems:

- Voltage regulator (depending on your input voltage)
- RGB LED and 'setup' button (see hardware requirements above)
- Antenna and RF circuit (see hardware requirements above)

**Transition to P1**. The P1 is a second module that is nearly identical to the P0 except that it's larger, includes 1MB of external flash, and includes an antenna and u.FL connector on-board. The P1 is slightly more expensive than the P0 ($2 in single units), but this may be a worthwhile trade-off as it helps you avoid any RF design work. When you transition from a Photon to the P0, you must reimplement on your board the following subsystems:

- Voltage regulator (depending on your input voltage)
- RGB LED and 'setup' button (see hardware requirements above)

### PCB design resources

If you have never designed your own circuit boards, there is a wealth of knowledge available online. Here are some great resources that you might find helpful:

**Popular PCB design software packages:**

- [EAGLE](http://www.cadsoftusa.com) from CadSoft. A popular choice for open source projects because it's powerful and cheap (free versions are available for open source projects). We use EAGLE extensively (as do our peers at Arduino, Adafruit, SparkFun, Seeed Studio, etc.), and we also provide [EAGLE libraries](https://www.github.com/spark/photon) for our hardware designs. [SparkFun](https://learn.sparkfun.com/tutorials/using-eagle-schematic) has some great tutorials on EAGLE, and software licenses are available on [Adafruit](https://www.adafruit.com/categories/169).
- [Altium](http://www.altium.com) is the gold standard of PCB design software. A steeper learning curve than some of the other tools, but MASSIVELY powerful. Licenses cost many thousands of dollars, but Altium is the most powerful PCB design software out there.
- [Upverter](https://upverter.com/) is bringing PCB design online with a browser-based design tool. Upverter adds Github-like collaboration to PCB design. If you're learning from scratch, Upverter is worth a look.
- [KiCad](http://www.kicad-pcb.org/) gets a special mention for being open source. If you're all about FOSS (Free and Open Source Software), KiCad is for you.
- [Fritzing](http://fritzing.org/home/) is a beautiful tool for prototyping. It's not necessarily suitable for complex designs, but it's extremely easy to use.

If you don't have strong preferences, we would currently recommend using EAGLE, since you'll be able to use our [parts libraries](https://www.github.com/spark/photon) and use the Photon board design as a reference for your own PCB.

**Popular PCB manufacturers:**

- [Advanced Circuits](http://www.4pcb.com/)
- [Seeed Studio Fusion PCB](https://www.seeedstudio.com/service/)
- [OSH Park](https://oshpark.com/)
- [HQPCB](http://www.hqpcb.com/)

If you would like introductions to high-volume overseas PCB manufacturers, please contact our [sales team](mailto:sales@particle.io).

**Popular PCB assembly (PCBA) solutions:**

- [Tempo Automation](http://tempoautomation.com/)
- [Seeed Studio PCB Assembly](https://www.seeedstudio.com/service/)

#### Next step

Once you've designed your hardware, the next step is to:

[Set up your Particle dashboard >](build-dashboard)
