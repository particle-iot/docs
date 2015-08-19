---
title: Designing your own PCB
columns: two
template: guide.hbs
order: 2
---

# Designing your own PCB

So you've got a prototype in a breadboard. It's probably a mess of wires, something like this:

![Project in a breadboard](/assets/images/breadboarded-core.jpg)

Your first step towards a manufacturable product is to re-design your printed circuit board (PCB) using our modules (P0 or P1) rather than our development kits (Photon/Core).  Before you dive in, make sure you read the manual! Hardware datasheets for the Photon (P0) and P1 are located at the links below:

- [Photon (P0) Datasheet](https://docs.particle.io/datasheets/photon-datasheet/)  
- [P1 Datasheet](https://docs.particle.io/datasheets/p1-datasheet/)

Great! Did you actually read them? No? Don't worry--we'll wait for you.

...

Yes? OK--let's move forward on good faith, then :-)

### Hardware Design Requirements

To work with Particle, your hardware must meet a small list of design requirements. They are:

- **Your device should use a supported hardware module.** While the firmware stack can be run on a variety of connectivity modules, we provide our own modules (the P0 and P1) as an out-of-the-box solution, and we can support other Broadcom WICED modules easily. You may also choose to port our firmware libraries to another module by implementing our [Hardware Abstraction Layer (HAL)](https://www.github.com/spark/firmware); this is, however, a more involved process. Please contact our [sales team](mailto:sales@particle.io) if you are interested in engaging us to support another hardware solution.
- **Your device must have an RGB LED and a button to enter 'setup mode'**. The RGB LED shows the user the connectivity status, while the 'setup' button lets your customer reconfigure the device. These components should be wired according to the [Photon reference design](https://www.github.com/spark/photon).
- **Your device must have an RF circuit and an antenna.** If you use the Photon or P1, the antenna is included in the hardware. If you use the P0, you must connect your own antenna. Please use the [Photon](https://www.github.com/spark/photon) as a reference design; if you use an antenna of equal or lesser gain, you may leverage Particle's FCC/CE/IC modular certification for the Photon.
- **Your device must expose JTAG programming pins**. All Particle development kits (Photon/Core) expose JTAG pins by default. Although the Particle platform has been optimized for over-the-air firmware updates, JTAG programming is required for advanced debugging and development, or modifications to the underlying Particle firmware libraries. All product creators working with the P0 or P1 should expose these pins on their PCB. To be specific, if you're integrating the Photon, your test fixture needs to be able to make an electrical connection to the male JTAG pins on the Photon, a female socket connected to those male headers, or to test pads that are electrically connected to those headers on your PCB.  If you're integrating the P0 or P1, you'll need to expose test pads that are routed to the appropriate JTAG solder pads on the P0/P1 module. These pins/pads are identified in the corresponding datasheets for the P0 and P1, [here](http://docs.particle.io/photon/photon-datasheet/) and [here](http://docs.particle.io/photon/p1-datasheet/).
- **Serial Test Pads** (*Recommended*). Although it's not *absolutely* required, it's highly recommended that you expose one hardware serial peripheral (UART) via test pads or pins. As we'll discuss later in the [Manufacturing](../manufacturing) section of this guide, exposing serial will make it easy to leverage Particle's open-source test firmware for capturing basic information about your device on the manufacturing line.

Note that, for additional security and to minimize tampering by customers, you can expose JTAG and serial test pins on a perforated section of your PCB that can be broken off after successful testing. This is a better option than deciding not to expose either JTAG or serial, which is, once again, {{{popup 'a bad decision.' 'img' 'bad-decision.gif'}}}

### Transitioning from a dev kit to a module

Your first prototype was most likely built with a Core or a Photon in a breadboard. Your final product is likely to take one of four forms:

**Photon in female headers**. You may design female 0.1" headers into your product to provide a "slot" for the Photon. This is common for low-volume hand-soldered production. Please reference the [Photon design files](https://www.github.com/spark/photon) and the [Photon datasheet](#) for design guidelines.

**Surface mounted Photon**. The Photon comes with castellated edges and can be purchased without headers; in this form it can be surface mounted directly to your PCB like many other radio modules on the market (see photo below). Please reference the [Photon design files](https://www.github.com/spark/photon) and the [Photon datasheet](#) for design guidelines, including recommended pad sizes and spacing on the host PCB and reflow requirements.

![Surface mounted Photon](/assets/images/castellated-edges.png)

**Transition to PØ**. The PØ is the module on the Photon, which includes a microcontroller and Wi-Fi chip. The PØ can be purchased in packs of 10 from our [online store](https://store.particle.io) or in bulk (contact [sales@particle.io](mailto:sales@particle.io)). When you transition from a Photon to the PØ, you must reimplement on your board the following subsystems:

- Voltage regulator (depending on your input voltage)
- RGB LED and 'setup' button (see hardware requirements above)
- Antenna and RF circuit (see hardware requirements above)

Specifically, the RF circuit requires specialized testing in order to verify effectiveness. Please see the section on "RF Validation" in the "Prototyping early designs" section further down the page.

**Transition to P1**. The P1 is a second module that is nearly identical to the PØ except that it's larger, includes 1MB of external flash, and includes an antenna and u.FL connector on-board. The P1 is slightly more expensive than the P0 ($2 more in single units), but this may be a worthwhile trade-off as it helps you avoid additional RF design work and validation. When you transition from a Photon to the P1, you must reimplement on your board the following subsystems:

- Voltage regulator (depending on your input voltage)
- RGB LED and 'setup' button (see hardware requirements above)

**NOTE: RF Keepouts.  
Transitioning from a dev kit to a module requires that you observe the RF keepouts documented in the datasheets for the Photon (P0) and P1. If you do not observe these keepouts, the RF performance of the Particle hardware and your product may be negatively affected.**


### PCB design resources

If you have never designed your own circuit boards, there is a wealth of knowledge available online. Here are some great resources that you might find helpful:

**Popular PCB design software packages:**

- [EAGLE](http://www.cadsoftusa.com) from CadSoft. A popular choice for open source projects because it's powerful and cheap (free versions are available for open source projects). We use EAGLE extensively (as do our peers at Arduino, Adafruit, SparkFun, Seeed Studio, etc.), and we also provide [EAGLE libraries](https://www.github.com/spark/photon) for our hardware designs. [SparkFun](https://learn.sparkfun.com/tutorials/using-eagle-schematic) has some great tutorials on EAGLE, and software licenses are available on [Adafruit](https://www.adafruit.com/categories/169).
- [Altium](http://www.altium.com) is the gold standard of PCB design software. A steeper learning curve than some of the other tools, but MASSIVELY powerful. Licenses cost many thousands of dollars, but Altium is the most powerful PCB design software out there.
- [Upverter](https://upverter.com/) is bringing PCB design online with a browser-based design tool. Upverter adds Github-like collaboration to PCB design. If you're learning from scratch, Upverter is worth a look.
- [KiCad](https://en.wikipedia.org/wiki/KiCad) gets a special mention for being open source. If you're all about FOSS (Free and Open Source Software), KiCad is for you.
- [Fritzing](http://fritzing.org/home/) is a beautiful tool for prototyping. It's not necessarily suitable for complex designs, but it's extremely easy to use.

If you don't have strong preferences, we would currently recommend using EAGLE, since you'll be able to use our [parts libraries](https://www.github.com/spark/photon) and use the Photon board design as a reference for your own PCB.

**EAGLE Design Libraries** - *Coming soon!* Instructions for including and integrating Particle's EAGLE open-source parts library into your PCB design.

**Best practices for PCB design**.  There are a lot of resources on the web that establish best practices for designing PCBs. [This post](http://www.proto2prod.com/proto2prod/2015/3/18/your-first-prototype-fab-specs-and-gerber-files-13) from our blog, Proto2Prod, focuses specifically on the key fabrication specifications that have a significant impact on mass production. Designing your product with a strategy in mind for mass production is critical, and will save you development time, money, and headaches down the road.

### Prototyping early designs
Before you manufacture thousands of units, it's best to start with just a handful. We've compiled a short list of resources you'll need to get going:

**Purchasing Particle hardware for prototyping**.  The fastest way to get low-volume dev kits and modules for prototyping is to purchase them directly from our [online store](http://store.particle.io). Particle sells both our PØ and P1 modules in cut-tape strips of 10 modules that are perfect for low volume PCB assembly (PCBA) with a pick-and-place or hand assembly.

**Popular PCB manufacturers:**

- [Advanced Circuits](http://www.4pcb.com/)
- [Seeed Studio Fusion PCB](https://www.seeedstudio.com/service/)
- [OSH Park](https://oshpark.com/)
- [HQPCB](http://www.hqpcb.com/)

If you would like introductions to high-volume overseas PCB manufacturers, please contact our [sales team](mailto:sales@particle.io).

**Popular low volume PCB assembly (PCBA) solutions:**

- [Tempo Automation](http://tempoautomation.com/)
- [Seeed Studio PCB Fusion](https://www.seeedstudio.com/service/)

For tips and resources for prototyping PCBs by hand (our preferred prototyping method at Particle), please visit our blog, [Proto2Prod](http://www.proto2prod.com/proto2prod/2015/6/15/your-first-prototype-assembly-tips-and-techniques).

**RF validation** - *Coming soon!*.  You have to validate your RF design with a professional shop and equipment you probably don't have access to. Here's strategies for dealing with that.

### Thinking about mass production
**Reach out to us!** Once you've validated your hardware design with a series of prototypes, it's time to start thinking about how to scale up for mass production.  If you haven't already, [let us know you're building a product on Particle!](mailto:sales@particle.io) Our team has lots of experience bringing Internet-connected devices to market, and can give valuable feedback on a wide variety of topics like manufacturing overseas, Kickstarter, VC funding, and everything in between. If we don't know you exist, it's much harder for us to help :-)

**Preferred Services Partners** *Coming soon!* Our customer success team is hard at work assembling a broad menu of trusted, professional services partners for every step of the product development process. In the meantime, please [email us](mailto:sales@particle.io) for references and recommendations.

### Next step

Once you've designed your hardware, the next step is to:

[Set up your Particle dashboard >](../dashboard)
