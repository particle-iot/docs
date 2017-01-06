---
title: Libraries
template: reference.hbs
columns: two
order: 10
---

# {{title}}

## Overview

Libraries are a central part of project development on the Particle platform leveraged by thousands of engineers in our community. Simply stated, a Particle library is _a collection of reusable firmware code that can be easily added to one or many Particle projects._

Leveraging high quality libraries to build Internet-connected projects and applications can significantly reduce the risk, time, and cost associated with creating IoT product or device. Libraries also make it possible to easily maintain and reuse common code blocks, as well as incorporate and leverage existing third party libraries from the Particle ecosystem.

In general, libraries in the Particle ecosystem have the following features:

1. **Most Arduino libraries are compatible with Particle.** We've worked hard to ensure that our [firmware API](https://docs.particle.io/reference/firmware) contains all of the most commonly used Arduino functions and firmware commands so that many Arduino libraries can be submitted into the Particle library ecosystem without modification. All of the most popular Arduino libraries are already available through our libraries system, and many others can be easily modified for compatibility.

2. **Particle libraries can include and depend on other Particle libraries.** If your library requires another external library as a dependency, it is easy to specify the particular library and even version of the library that your library depends on. A good example is our `internet-button` library, which depends on the popular `neopixel` library for controlling neopixel LEDs. You can learn more about libraries with dependencies in the `Library file structure` section below.

3. **Particle libraries are reliable.** In addition to building and sharing our own high quality libraries, Particle verifies and promotes high quality community libraries that are fully documented, perform reliably, and include a variety of usage examples. Using our official and verified libraries means you'll spend less time debugging and more time building your project.

## Kinds of libraries

### Public Libraries

The vast majority of Particle libraries are developed and maintained by the Particle community and made available for broader use via the Particle libraries ecosystem. All public libraries are made available for public consumption through our development tools and via our `Libraries API` <LINK>, described in more detail below. The availability of such a large number of libraries in a single place makes developing IoT products on the Particle platform fast and simple.

Note that a library may have its own associated open source license that limits or restricts redistribution or commercialization of the library.

### Official Libraries <img class="inline-header-image" src="/assets/images/particle-mark.png">

Official libraries are libraries that were created _by members of the Particle team_ and are designed to be used with Particle hardware. Examples of Official Particle libraries include:

- `internetbutton` for the Internet Button, our kit for quickly prototyping simple IoT projects and experiences
- `makerkit` for our Maker Kit, our kit for beginners to learn how to build IoT projects
- `relayshield` for the Relay Shield, our shield for switching high and low voltage electronics.
- `assettracker` for the Asset Tracker Shield, our kit for tracking and locating valuable possessions

All Particle libraries meet the same quality standards as `Verified` libraries, and appear in the library list with a Particle start next to them.

### Verified Libraries <img class="inline-header-image" src="/assets/images/verified.png">

Some stuff about verified libraries.

### Private Libraries <img class="inline-header-image" src="/assets/images/private.png">

Some stuff about private libraries.

## Library file structure

## Using libraries
This is links to the other sections about using libraries.

## Libraries API

```cpp
// EXAMPLE USAGE
// Using SEMI_AUTOMATIC mode to get the lowest possible data usage by
// registering functions and variables BEFORE connecting to the cloud.
SYSTEM_MODE(SEMI_AUTOMATIC);

void setup() {
    // register cloudy things
    Particle.function(....);
    Particle.variable(....);
    Particle.subscribe(....);
    // etc...
    // then connect
    Particle.connect();
}
```
