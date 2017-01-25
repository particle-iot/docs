---
word: Firmware Libraries
title: Firmware Libraries
order: 9
columns: two
template: guide.hbs
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

### Official Libraries<img class="inline-header-image -small" src="/assets/images/particle-mark.png">

Official libraries are libraries that were created _by members of the Particle team_ and are designed to be used with Particle hardware. Examples of Official Particle libraries include:

- `internetbutton` for the Internet Button, our kit for quickly prototyping simple IoT projects and experiences
- `makerkit` for our Maker Kit, our kit for beginners to learn how to build IoT projects
- `relayshield` for the Relay Shield, our shield for switching high and low voltage electronics.
- `assettracker` for the Asset Tracker Shield, our kit for tracking and locating valuable possessions

All Particle libraries meet the same quality standards as [Verified](#verified-libraries) libraries, and appear in the library list with the Particle logo next to them.

### Verified Libraries<img class="inline-header-image -small" src="/assets/images/verified.png">

Verified libraries are community-contributed libraries that have been reviewed and confirmed by members of the Particle team to meet the following criteria:

1. **The library is well documented.** It contains in-line comments that document proper usage of the library and contains example applications that demonstrate how to use each of the included functions.

2. **The library has been reviewed for quality.** The library compiles on all  relevant hardware platforms and performs as intended. The library includes testing instructions (`verification.txt`) that anyone can follow to independently verify that the library is working as expected.

3. **The library has improved visibility.** Verified libraries float to the top of library searches, improving the visibility of the library within the Particle ecosystem.

### Private Libraries<img class="inline-header-image -small" src="/assets/images/private.png">

Private libraries are libraries that have been uploaded to the Particle Cloud for reuse with many projects, but are _only_ visible to the individual who created and submitted the library. Private libraries can be published as public libraries at any time by the author of the library using the `particle library publish` command.

## Library file structure

### Overview

Every Particle library complies with the following file structure that will be automatically generated when a new library is initialized:

- `examples`
  - `usage`
    - `usage.ino`
- `src`
  - `mylibrary.cpp`
  - `mylibrary.h`
- `library.properties`
- `README.md`
- `LICENSE.txt`

`examples` is the folder that contains the example applications that reference your library with one example per directory. If your library controls LEDs, for example, you should include an example called `examples/control/control.ino` that demonstrates how someone could use the library in a typical application.

`src` is the folder that contains the actual library files (`.cpp` and `.h` files) that define the library's behavior. Everything in the `src` folder will be compiled when a user adds the library to their project and compiles it. You can add subfolders to `src` if you have many files in your library.

`library.properties` includes descriptive information about your library (title, description, version, author, license), and also specifies any other libraries that your library depends on. Libraries dependencies can be tagged at a particular version in this file.

`README.md` provides instructions for library creators on creation and usage.

`LICENSE.txt` is the file that defines the license that the public library is distributed with. All libraries in Particle's library ecosystem must include an associated license.

### library.properties fields

- **name** A short name for the library. The name must be unique, so there aren't 2 libraries with the same name. It will be the name of main `.cpp` and `.h` file.

- **version** A [Semantic Versioning](http://semver.org/) version number like 1.0.0

- **author** Your name and email like `The Author <author@example.com>`.  If there are several authors, separate them with commas.

- **license** The acronym for the license this library is released under, such as GPL, MIT, Apache-2.

- **sentence** A one sentece description of the library that will be shown in the library browser.

- **paragraph** A longer description to be shown in the details page of the library.

- **url** The web page that a user wanting more information would visit like a GitHub URL.

- **repository** The git repositiory like `http://github.com/user/project.git`, if available.

- **architectures** A comma-separated list of supported hardware boards that are compatible with your library like `particle-core`, `particle-photon`, `particle-electron`. If missing, the library will be available for all architectures.

- **dependencies.<lib>** Other library that this library depends on, one line per library dependency. The value is the desired version number of the library dependency.

## Using libraries

Libraries consumption is supported in each of our three primary development tools. Instructions for using libraries can be found in the documentation for each of those tools, linked below:

- [Using libraries with the Web IDE](/guide/getting-started/build/#using-libraries)
- [Using libraries with the Desktop IDE](/guide/tools-and-features/dev/#using-community-libraries)
- [Using libraries with the Command Line Interface (CLI)](/reference/cli/#particle-library)

## Contributing libraries

The main steps for contributing a library are preparing the structure,
writing the code, testing the examples, uploading a private version and
publishing to the public.

Library contribution is currently supported in our Desktop IDE and via our Command Line Interface (CLI).

- [Contributing libraries with the Desktop IDE](#) - _Coming soon!_
- [Contributing libraries with the Command Line Interface (CLI)](/reference/cli/#particle-library-upload)


### Preparing the structure

There are several ways to start contributing a Particle library.

You can start a brand new library by generating the file structure with the Command Line Interface (CLI) using the [`particle library create`](/reference/cli/#particle-library-create) or downloading the [example library](https://github.com/spark/uber-library-example) and editing it.

If you made a library in the past, you can migrate it to the new format with `particle library migrate`.

You can modify an existing library by forking the code from GitHub. You can also download an existing library through the CLI with `particle library view <library_name>`. Make sure you move the library to a new folder before modifying it in that case.

You can also start with an existing Arduino library from GitHub.  Particle libraries have the same structure as Arduino libraries.

### Writing the code

The main sources of the library go into `src/lib_name.cpp` and `src/lib_name.h`.

Create at least one example `.ino` file inside a subfolder of `examples` to show people how to use the library.

If your library depends on other libraries you can add those dependencies to `library.properties` with `particle library add`. For example, since the [Internet Button](/datasheets/kits/#internet-button) contains NeoPixel LEDs, the `InternetButton` library has the line `dependencies.neopixel=0.0.10` in `library.properties` to indicate this.

Review the `library.properties` and `README.md` and fill in as much information as possible.

### Testing the examples

The best way to ensure people will use your library is to provide good examples.

Once you've written the first draft of the library you can test the examples on hardware you own in the CLI with `particle flash <my_device> examples/<example_name>` from the library folder or in the Desktop IDE by right-clicking on the example and selecting "Flash this example".

### Uploading a private version

Once your library is ready to go, you can upload it to Particle in the CLI with `particle library upload` from the library folder or in the Desktop IDE with "Upload library".

When you upload a new private version you can use the library as usual from your own account in the Web IDE, Desktop IDE or CLI.

If you find issues, you can upload another private version with the same version number.

When you want to modify an existing library for your own projects only, you can stop after uploading a private version. However if you want other people to be able to use the library go on to publishing it.

### Publish to the public

When a version is ready for prime time, simply type `particle library publish <my_lib>` in the CLI and it will make the latest private version available to the public. You can also publish through the Desktop IDE.

After this, anybody with a Particle account will be able to use your library!
Thank you!
