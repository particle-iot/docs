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

2. **Particle libraries can include and depend on other Particle libraries.** If your library requires another external library as a dependency, it is easy to specify the particular library and even version of the library that your library depends on. A good example is our `internet-button` library, which depends on the popular `neopixel` library for controlling Neopixel LEDs. You can learn more about libraries with dependencies in the [Library file structure](#library-file-structure) section below.

3. **Particle libraries are reliable.** In addition to building and sharing our own high quality libraries, Particle verifies and promotes high quality community libraries that are fully documented, perform reliably, and include a variety of usage examples. Using our official and verified libraries means you'll spend less time debugging and more time building your project.

## Kinds of libraries

### Public Libraries

The vast majority of Particle libraries are developed and maintained by the Particle community and made available for broader use via the Particle libraries ecosystem. All public libraries are available for public consumption through our development tools and via our [Libraries API](/reference/api/#libraries). The availability of such a large number of libraries in a single place makes developing IoT products on the Particle platform fast and simple.

Note that a library may have its own associated open source license that limits or restricts redistribution or commercialization of the library.

### Official Libraries<img class="inline-header-image" src="/assets/images/particle-mark.png" style="width:20px">

Official libraries are libraries that were created _by members of the Particle team_ and are designed to be used with Particle hardware. Examples of Official Particle libraries include:

- `internetbutton` for the Internet Button, our kit for quickly prototyping simple IoT projects and experiences
- `makerkit` for our Maker Kit, our kit for beginners to learn how to build IoT projects
- `relayshield` for the Relay Shield, our shield for switching high and low voltage electronics.
- `assettracker` for the Asset Tracker Shield, our kit for tracking and locating valuable possessions

All Particle libraries meet the same quality standards as `Verified` libraries, and appear in the library list with a Particle start next to them.

### Verified Libraries<img class="inline-header-image" src="/assets/images/verified.png" style="width:20px">

Verified libraries are community-contributed libraries that have been reviewed and confirmed by members of the Particle team to meet the following criteria:

1. **The library is well documented.** It contains in-line comments that document proper usage of the library and contains example applications that demonstrate how to use each of the included functions.

2. **The library has been reviewed for quality.** The library compiles on all  relevant hardware platforms and performs as intended. The library includes testing instructions (`verification.txt`) that anyone can follow to independently verify that the library is working as expected.

3. **The library has improved visibility.** Verified libraries float to the top of library searches, improving the visibility of the library within the Particle ecosystem.

### Private Libraries<img class="inline-header-image" src="/assets/images/private.png" style="width:15px">

Private libraries are libraries that have been uploaded to the Particle Cloud for reuse with many projects, but are _only_ visible to the individual who created and submitted the library. Private libraries can be published as public libraries at any time by the author of the library using the `particle library publish` command.

## Library file structure

Every Particle library complies with the following file structure that will be automatically generated when a new library is initialized:

- examples
  - usage
    - usage.ino
- src
  - mylibrary.cpp
  - mylibrary.h
- library.properties
- README.md
- LICENSE.txt

`examples` is the folder that contains the example applications that reference your library. If your library controls LEDs, for example, you should include examples (`usage.ino`) in the `usage` subdirectory that demonstrates how someone could use the library in a typical application.

`src` is the folder that contains the actual library files (`.cpp` and `.h` files) that define the library's behavior. Everything in the `src` folder will be compiled when a user adds the library to their project and compiles it.

`library.properties` includes descriptive information about your library (title, description, version, author, license), and also specifies any other libraries that your library depends on. Libraries dependencies can be tagged at a particular version in this file.

`README.md` provides instructions for library creators on creation and usage.

`LICENSE.txt` is the file that defines the license that the public library is distributed with. All libraries in Particle's library ecosystem must include an associated license.



## Using libraries [Coming soon!]

Libraries consumption is supported in each of our three primary development tools. Instructions for using libraries can be found in the documentation for each of those tools, linked below:

- [Using libraries with the Web IDE](#)
- [Using libraries with the Desktop IDE](#)
- [Using libraries with the Command Line Interface (CLI)](#)

## Contributing libraries [Coming soon!]

Library contribution is currently supported in our Desktop IDE and via our Command Line Interface (CLI). Instructions for contributing libraries can be found in our [tutorial on library contribution](#), and specific instructions for using each tool can be found in the links below:

- [Contributing libraries with the Desktop IDE](#)
- [Contributing libraries with the Command Line Interface (CLI)](#)


## Libraries API [Coming soon!]

NEED JULIEN's HELP HERE

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
