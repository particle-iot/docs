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

2. **Particle libraries can include and depend on other Particle libraries.** If your library requires another external library as a dependency, it is easy to specify the particular library and even version of the library that your library depends on. A good example is our `internet-button` library, which depends on the popular `neopixel` library for controlling NeoPixel LEDs. You can learn more about libraries with dependencies in the [Library file structure](#library-file-structure) section below.

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

- **sentence** A one sentence description of the library that will be shown in the library browser.

- **paragraph** A longer description to be shown in the details page of the library. This is always shown after **sentence** so start with the second sentence of the description.

- **url** The web page that a user wanting more information would visit like a GitHub URL.

- **repository** The git repository like `http://github.com/user/project.git`, if available.

- **architectures** A comma-separated list of supported hardware boards that are compatible with your library. If missing or set to `*`, the library will be available for all architectures. Available values for Particle libraries: `spark-core`, `particle-photon`, `particle-electron`, `particle-p1`, `digistump-oak`, `bluz`, `redbear-duo`.

- **dependencies.<lib>** Other library that this library depends on, one line per library dependency. The value is the desired version number of the library dependency.

## Project file structure

There are 3 kinds of project structure:

- legacy
- simple 
- extended

### Legacy Structure

The legacy project structure stores files in the root of the project. There is no project definition file. This is
the structure used by all projects prior to libraries v2. 

- `myapp`
  - `application.ino`

A legacy project does not support using libraries.

### Simple Structure

The simple project structure is similar to the legacy structure - the project sources are stored in the root. However,
the project also includes a project definition file `project.properties`. Even saving a blank `project.properties` file
is enough to make a simple project.

- `myapp`
  - `application.ino`
  - `project.properties`

A simple project has standard support for libraries; libraries can be added to the project via the CLI `library add` command or the Desktop IDE library manager.

### Extended Structure

The extended structure expands on the simple structure, placing all application sources in the `src` folder.

- `myapp`
  - `project.properties`
  - `src`
    - `application.ino`

An extended project has full support for libraries, supporting both `library add` and copied libraries.

An extended project can be created by using the Desktop IDE "Start a new project" or the CLI `particle project create` command.


## Using libraries

Libraries consumption is supported in each of our three primary development tools. Instructions for using libraries can be found in the documentation for each of those tools, linked below:

- [Using libraries with the Web IDE](/guide/getting-started/build/#using-libraries)
- [Using libraries with the Desktop IDE](/guide/tools-and-features/dev/#using-community-libraries)
- [Using libraries with the Command Line Interface (CLI)](/guide/tools-and-features/dev/#working-with-projects-and-libraries)

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

List the hardware platforms supported by your library supports to the [`architectures` field](#library-properties-fields) in `library.properties`. In the code you can compare the current platform constant with [the platform IDs](https://github.com/spark/firmware/blob/develop/platform/shared/inc/platforms.h).

```
#if PLATFORM_ID == 10 // Electron
    #include "cellular_hal.h"
#elif PLATFORM_ID == 6 // Photon
    #include "softap_http.h"
#else
    #error "This library only works on the Electron and Photon"
#endif
```

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

## Migrating Libraries

On January 23, 2017, Particle introduced a new version of our firmware library manager, requiring that libraries be migrated from the old library structure (v1) to our new library structure (v2).

With our original firmware library manager, libraries could only be contributed and consumed through our Web IDE (Build). We’ve now upgraded the library manager behind the Web IDE, and made those libraries accessible in our Desktop IDE (Dev) and CLI.

Libraries under the new library format have the following features:

- Every library now has a library.properties file that can be used to specify external library dependencies, library version number, description, and associated open-source license
- Libraries are now accessible via our firmware libraries API
- Libraries can now be added to projects via our Desktop IDE and CLI

All existing Particle applications that included a v1 library have been preserved and will continue to function as before. However, all new library includes will pull from our migrated v2 library list, so all new Particle projects that include a library will use the updated library structure.

For that reason, it may be necessary to migrate a library to the new library structure if the library was originally created as a v1 library.

Instructions for migrating v1 libraries to the new library format using the CLI and Desktop IDE are included below.

### Using the CLI

Follow these steps to migrate a v1 Particle library to the new v2 structure using the Particle CLI:

- Install the Particle CLI version 1.19 or later.
  - If you do not have the Particle CLI installed on your machine, you can download and install it using our OS-specific instructions, [here](https://www.particle.io/products/development-tools/particle-command-line-interface)
  - If you already have the Particle CLI installed, you can update it to the latest version by running `npm update -g particle-cli`

- Run `particle library migrate` in your library directory
- Edit the newly created `library.properties` file to add a GitHub URL to the `url` field (like [https://github.com/spark/internetbutton](https://github.com/spark/internetbutton)) and the git remote to the `repository` field (like [https://github.com/spark/internetbutton.git](https://github.com/spark/internetbutton.git))
- If your library depends on another library, run `particle library add dependency` in your library directory and remove the source files of the other library from your own repository
- Ensure that the example applications for your library compile by running `particle compile photon examples/<name>` in your library directory
- Refresh the `README.md` file for your library with detailed information and instructions for using and interacting with the library. The `README.md` file will be used as the "home page" for your library.
  - See [https://github.com/spark/PowerShield](https://github.com/spark/PowerShield) for a good example.
- Upload a private version of your library by running `particle library upload`
- Try adding the library to a project using the [Web IDE](https://build.particle.io)
- Publish the new public version of the library by running `particle library publish mylibrary` in the CLI
- Push to GitHub, and go celebrate!


### Using the Desktop IDE

Follow these steps to migrate a v1 Particle library to the new v2 structure using Particle's Desktop IDE:

- Install the Particle Desktop IDE or update it to the latest version
  - You can install the Desktop IDE by visiting our [download page](https://www.particle.io/products/development-tools/particle-desktop-ide) and selecting the appropriate installer for your computer's operating system
  - If you already have Particle's Desktop IDE installed, you can update it using the following instructions
    - Select `Atom > Preferences` from the top menu
    - When the preferences pane opens, navigate to to `Updates`
    - Click the `Check for Updates` button. This will update your `particle-dev-profiles` and `particle-dev-libraries` packages to the most recent version.

- Open your library directory in a new window of the Desktop IDE
- Open the `Library Manager` tab on the left hand navigation bar

![](/assets/images/libraries/migrate-1.png)

- You will be presented with a notification telling you that you need to migrate your library. Click the `Migrate` button

![](/assets/images/libraries/migrate-2.png)

- When migration is complete, you will be notified with a banner alert and presented with new options in the `Library Manager` view

![](/assets/images/libraries/migrate-3.png)

- Edit the newly created `library.properties` file to add a GitHub URL to the `url` field (like [https://github.com/spark/internetbutton](https://github.com/spark/internetbutton)) and the git remote to the `repository` field (like [https://github.com/spark/internetbutton.git](https://github.com/spark/internetbutton.git))

- Add any necessary external library dependencies in the `library.properties` file as new lines using the following format:

`dependencies.library_name=0.0.X`

- Ensure that the example applications for your library compile by opening up an example in the `examples` directory and clicking the compile button
- Refresh the `README.md` file for your library with detailed information and instructions for using and interacting with the library. The `README.md` file will be used as the "home page" for your library.
  - See [https://github.com/spark/PowerShield](https://github.com/spark/PowerShield) for a good example.
- Upload a private version of your library by clicking the `Upload` button at the top of the Library Manager tab
- Try adding the library to a project using the [Web IDE](https://build.particle.io)
- Publish the new public version of the library clicking the `Publish` button at the top of the Library manager tab
- Push to GitHub, and go celebrate!


### Common issues with migration

- **Include statements**: After you have migrated a library, the process will automatically create a file, `mylibrary/mylibrary.h` that is included for compatibility with old projects. New projects and examples should use `#include "mylibrary.h"`

- **`library upload` scope**: When uploading a new version of a library, *all files in the library directory are uploaded.* Be careful in case you have files in there you don’t want to upload like test binaries and large PDFs.

- **Versioning**: You can upload a private version multiple times with the same version number, but once you publish a version to the public you won’t be able to upload with the same version number. If you make a small mistake just increase the version number and upload again. Version numbers are free!

If you're having additional issues with library migration or contribution, please feel free to post a message in the [`libraries`](https://community.particle.io/c/libraries) category of our community forums, or send us a message via our [support portal](http://support.particle.io).
