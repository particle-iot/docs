---
title: Designing your own PCB
columns: 2
---

So you've got a prototype in a breadboard. It's probably a mess of wires, something like this:

**PUT A PICTURE OF A BREADBOARDED PROTOTYPE HERE**

Your first step towards a manufacturable product is to re-design this product into your own printed circuit board (PCB) using our modules (P0 or P1) rather than our development kits (Photon/Core).

Here's a quick overview of the steps you'll take:

- Select your PCB design software
- Lay out your schematic
- Route your PCB
- Transition from a dev kit (Photon) to module (P0/P1)
- Spin up your PCB
- Assemble your components (PCBA)
- Program and test your new hardware

### TODO: REFACTOR

- Reduce focus on things you could learn elsewhere
- Increase focus on Particle-specific stuff
- Add a section about hardware requirements (one RGB LED, one button)

### Select PCB design software

The first thing you'll need to do is select a PCB design software package. Here are a few popular choices:

- [EAGLE](http://www.cadsoftusa.com) from CadSoft. A popular choice for open source projects because it's powerful and cheap (free versions are available for open source projects). We use EAGLE extensively (as do our peers at Arduino, Adafruit, SparkFun, Seeed Studio, etc.), and we also provide [EAGLE libraries](https://www.github.com/spark/photon) for our hardware designs. [SparkFun](https://learn.sparkfun.com/tutorials/using-eagle-schematic) has some great tutorials on EAGLE, and software licenses are available on [Adafruit](https://www.adafruit.com/categories/169).
- [Altium](http://www.altium.com) is the gold standard of PCB design software. A steeper learning curve than some of the other tools, but MASSIVELY powerful. Licenses cost many thousands of dollars, but Altium is the most powerful PCB design software out there.
- [Upverter](https://upverter.com/) is bringing PCB design online with a browser-based design tool. Upverter adds Github-like collaboration to PCB design. If you're learning from scratch, Upverter is worth a look.
- [KiCad](http://www.kicad-pcb.org/) gets a special mention for being open source. If you're all about FOSS (Free and Open Source Software), KiCad is for you.
- [Fritzing](http://fritzing.org/home/) is a beautiful tool for prototyping. It's not necessarily suitable for complex designs, but it's extremely easy to use.

If you don't have strong preferences, we would currently recommend using EAGLE, since you'll be able to use our [parts libraries](https://www.github.com/spark/photon) and use the Photon board design as a reference for your own PCB.

### Lay out your schematic

TODO

### Route your PCB

TODO

### Transition from dev kit to module

TODO

### Spin up your PCB

TODO

### Assemble your components (PCBA)

TODO

### Program and test your new hardware

TODO
