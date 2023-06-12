---
title: Firmware libraries
columns: two
layout: commonTwo.hbs
description: Introduction to firmware libraries to access other services and hardware from your Particle IoT device firmware
---

# {{title}}

## Overview

Libraries are a central part of project development on the Particle platform leveraged by thousands of engineers in our community. Simply stated, a Particle library is _a collection of reusable firmware code that can be easily added to one or many Particle projects._

Leveraging high quality libraries to build Internet-connected projects and applications can significantly reduce the risk, time, and cost associated with creating IoT product or device. Libraries also make it possible to easily maintain and reuse common code blocks, as well as incorporate and leverage existing third party libraries from the Particle ecosystem.

**Most Arduino libraries are compatible with Particle.** We've worked hard to ensure that our [firmware API](/reference/device-os/firmware/) contains all of the most commonly used Arduino functions and firmware commands so that many Arduino libraries can be submitted into the Particle library ecosystem without modification or minimal modification. All of the most popular Arduino libraries are already available through our libraries system, and many others can be easily modified for compatibility.

**Particle libraries can include and depend on other Particle libraries.** If your library requires another external library as a dependency, it is easy to specify the particular library and even version of the library that your library depends on. A good example is our `internet-button` library, which depends on the popular `neopixel` library for controlling NeoPixel LEDs. You can learn more about libraries with dependencies in the [Library file structure](#library-file-structure) section below.


<a href="/reference/device-os/libraries/search/" class="button">Search and browse libraries</a>


## Kinds of libraries

### Public libraries

The vast majority of Particle libraries are developed and maintained by the Particle community and made available for broader use via the Particle libraries ecosystem. All public libraries are available for public consumption through our development tools and via our [Libraries API](/reference/cloud-apis/api/#libraries). The availability of such a large number of libraries in a single place makes developing IoT products on the Particle platform fast and simple.

Note that a library may have its own associated open source license that limits or restricts redistribution or commercialization of the library.

### Official libraries<img class="inline-header-image -small" src="/assets/images/particle-mark.png">

Official libraries are libraries that were created _by members of the Particle team_ and are designed to be used with Particle hardware. 

All Particle libraries meet the same quality standards as [Verified](#verified-libraries) libraries, and appear in the library list with the Particle logo next to them.

### Verified libraries<img class="inline-header-image -small" src="/assets/images/verified.png">

Verified libraries are community-contributed libraries that have been reviewed and confirmed by members of the Particle team to meet the following criteria:

1. **The library is well documented.** It contains in-line comments that document proper usage of the library and contains example applications that demonstrate how to use each of the included functions.

2. **The library has been reviewed for quality.** The library compiles on all  relevant hardware platforms and performs as intended. The library includes testing instructions (`verification.txt`) that anyone can follow to independently verify that the library is working as expected.

3. **The library has improved visibility.** Verified libraries float to the top of library searches, improving the visibility of the library within the Particle ecosystem.

### Private libraries<img class="inline-header-image -small" src="/assets/images/private.png">

Private libraries are libraries that have been uploaded to the Particle
Device Cloud for reuse with many projects, but are _only_ visible to the individual who created and submitted the library. Private libraries can be published as public libraries at any time by the author of the library using the `particle library publish` command.

### Workbench and CLI pseudo-libraries

If you are using Particle Workbench or the Particle CLI, you may also want to store shared code across firmware or products using pseuo-libraries in a source code control system like Github.

This allows private sharing of code between multiple users (unlike private libraries), along with robust change logging and version control.

This technique is not available in the Web IDE, however we also do not recommend the Web IDE for product development.

See [Workbench pseudo-libraries](#workbench-pseudo-libraries), below, for more information.

## Library file structure

### Overview

Every Particle library complies with the following file structure that will be automatically generated when a new library is initialized:

```
MyLibrary/
  examples/
    usage/
      usage.ino
  src/
    MyLibrary.cpp
    MyLibrary.h
  library.properties
  README.me
  LICENSE
```


`examples` is the folder that contains the example applications that reference your library with one example per directory. If your library controls LEDs, for example, you should include an example called `examples/control/control.ino` that demonstrates how someone could use the library in a typical application.

`src` is the folder that contains the actual library files (`.cpp` and `.h` files) that define the library's behavior. Everything in the `src` folder will be compiled when a user adds the library to their project and compiles it. You can add subfolders to `src` if you have many files in your library.

`library.properties` includes descriptive information about your library (title, description, version, author, license), and also specifies any other libraries that your library depends on. Libraries dependencies can be tagged at a particular version in this file.

`README.md` provides instructions for library creators on creation and usage.

`LICENSE` or `LICENSE.txt` is the file that defines the license that the public library is distributed with. All libraries in Particle's library ecosystem must include an associated license.

### library.properties fields

- **name** Name of the library. The name must be unique, so there aren't 2 libraries with the same name. It will be the name of the directory as well as the name of main `.cpp` and `.h` file. Note that library names must be unique across both public and private libraries. Thus you can get an error uploading a library whose name you cannot see in the community libraries because someone else has created a private library with that name already.

- **version** A [Semantic Versioning](http://semver.org/) version number like 1.0.0

- **author** Your name and email like `The Author <author@example.com>`.  If there are several authors, separate them with commas.

- **license** The acronym for the license this library is released under, such as GPL, MIT, Apache-2.

- **sentence** A one sentence description of the library that will be shown in the library browser.

- **paragraph** A longer description to be shown in the details page of the library. This is always shown after **sentence** so start with the second sentence of the description.

- **url** The web page that a user wanting more information would visit like a GitHub URL.

- **repository** The git repository like `http://github.com/user/project.git`, if available.

- **architectures** A comma-separated list of supported hardware boards that are compatible with your library. If missing or set to `*`, the library will be available for all architectures. 

- **dependencies.<lib>** Other library that this library depends on, one line per library dependency. The value is the desired version number of the library dependency.

- **whitelist** Additional files to include when publishing a library. By default these files are included in a library when publishing: `*.ino`, `*.pde`, `*.cpp`, `*.c`, `*.c++`, `*.h`, `*.h++`, `*.hpp`, `*.ipp`, `*.properties`, `*.md`, `*.txt`, `*.S`, `*.a` and `LICENSE`.


## Project file structure

The extended structure expands on the simple structure, placing all application sources in the `src` folder.

```
myapp/
  project.properties
  src/
    myapp.cpp
```

An extended project has full support for libraries, supporting both `library add` and copied libraries.

An extended project can be created by using the CLI `particle project create` command.

Your main application file can be a .cpp or a .ino file.

### Projects with pseudo-libraries

It's also possible to include library-like files in the `lib` directory. See [Workbench pseudo-libraries](#workbench-pseudo-libraries), below, for more information.

```
myapp/
  project.properties
  src/
    myapp.cpp
  lib/
    library1/
      src/
        library1.cpp
    SharedCode/
      src/
        SharedCode.cpp
```

### particle.include and particle.ignore

The `particle.include` and `particle.ignore` files provide a way to include or exclude additional files from the cloud compiler. Please note that these files are only for special extras and the default files like the source and header files are handled separately and are not affected by the patterns specified in these two files. The include and ignore files can be located either in the project's root directory or in any of its subdirectories.

When the particle.include file is placed in the root directory, files matching the specified patterns are searched recursively from the root directory. On the other hand, if the particle.include file is placed in a subdirectory, the search for matching files is performed recursively starting from that subdirectory as the base. The system automatically handles duplicates, so there is no need to worry about them.

Similarly, the particle.ignore file follows the same behavior, but instead of including files, it excludes files that match the specified patterns from being sent to the cloud compiler.

Example `particle.include` file that includes all `.def` files:

```
**/*.def
```

Example `particle.ignore` file to not upload the `test` and `docs` directories in a library.

```
test
docs
```

### Deprecated file structures

There are some file structure that are no longer supported. They are included here for reference but can no longer be used.

{{collapse op="start" label="Show deprecated file structures"}}
**Legacy structure**

The legacy project structure stores files in the root of the project. There is no project definition file. This is
the structure used by all projects prior to libraries v2.

```
myapp/
  application.ino
```

A legacy project does not support using libraries.

**Simple structure**

The simple project structure is similar to the legacy structure - the project sources are stored in the root. However,
the project also includes a project definition file `project.properties`. Even saving a blank `project.properties` file
is enough to make a simple project.

```
myapp/
  myapp.ino
  project.properties
```

A simple project has standard support for libraries; libraries can be added to the project via the CLI `library add` command.

{{collapse op="end"}}

## Using libraries

Libraries consumption is supported in each of our three primary development tools. Instructions for using libraries can be found in the documentation for each of those tools, linked below:

- [Library Search](/reference/device-os/libraries/search/)
- [Using libraries with the Web IDE](/getting-started/developer-tools/build/)
- [Using libraries with the Particle Workbench](/getting-started/developer-tools/workbench/#particle-install-library)
- [Using libraries with the Command Line Interface (CLI)](/getting-started/developer-tools/cli/)

## Contributing libraries

The main steps for contributing a library are preparing the structure,
writing the code, testing the examples, uploading a private version and
publishing to the public.

Library contribution is currently supported via our Command Line Interface (CLI).

- [Contributing libraries with the Command Line Interface (CLI)](/reference/developer-tools/cli/#particle-library-upload)


### Preparing the structure

There are several ways to start contributing a Particle library.

You can start a brand new library by generating the file structure with the Command Line Interface (CLI) using the [`particle library create`](/reference/developer-tools/cli/#particle-library-create) or downloading the [example library](https://github.com/particle-iot/uber-library-example) and editing it.

If you made a library in the past, you can migrate it to the new format with `particle library migrate`.

You can modify an existing library by forking the code from GitHub. You can also download an existing library through the CLI with `particle library view <library_name>`. Make sure you move the library to a new folder before modifying it in that case.

You can also start with an existing Arduino library from GitHub.  Particle libraries have the same structure as Arduino libraries.

### Writing the code

The main sources of the library go into `src/lib_name.cpp` and `src/lib_name.h`.  More complex libraries may use a nested structure within the `src/` directory.  For example `src/subFolder/subhHeader.h` and referenced as `#include <subFolder/subHeader.h>`.

Create at least one example `.ino` file inside a subfolder of `examples` to show people how to use the library.

If your library depends on other libraries you can add those dependencies to `library.properties` with `particle library add`. For example, since the [Internet Button](/reference/datasheets/accessories/legacy-accessories/#internet-button) contains NeoPixel LEDs, the `InternetButton` library has the line `dependencies.neopixel=0.0.10` in `library.properties` to indicate this.

List the hardware platforms supported by your library supports to the [`architectures` field](#library-properties-fields) in `library.properties`, or use `*` for all current platforms.

Review the `library.properties` and `README.md` and fill in as much information as possible.

If you wish to develop libraries using Particle Workbench, see [Developing Particle Libraries with Workbench](/getting-started/developer-tools/workbench/#developing-particle-libraries).

### Testing the examples

The best way to ensure people will use your library is to provide good examples.

Once you've written the first draft of the library you can test the examples on hardware you own in the CLI with `particle flash <my_device> examples/<example_name>` from the library folder.

### Uploading a private version

Once your library is ready to go, you can upload it to Particle in the CLI with `particle library upload` from the library folder.

When you upload a new private version you can use the library as usual from your own account in the Web IDE, Particle Workbench, or CLI.

If you find issues, you can upload another private version with the same version number.

When you want to modify an existing library for your own projects only, you can stop after uploading a private version. However if you want other people to be able to use the library go on to publishing it.

### Publish to the public

When a version is ready for prime time, simply type `particle library publish <my_lib>` in the CLI and it will make the latest private version available to the public.

After this, anybody with a Particle account will be able to use your library!
Thank you!

## Migrating libraries

On January 23, 2017, Particle introduced a new version of our firmware library manager, requiring that libraries be migrated from the old library structure (v1) to our new library structure (v2).

With our original firmware library manager, libraries could only be contributed and consumed through our Web IDE. We’ve now upgraded the library manager behind the Web IDE, and made those libraries accessible in Particle Workbench and the Particle CLI.

Libraries under the new library format have the following features:

- Every library now has a library.properties file that can be used to specify external library dependencies, library version number, description, and associated open-source license
- Libraries are now accessible via our firmware libraries API
- Libraries can now be added to projects in Particle Workbench and the Particle CLI

All existing Particle applications that included a v1 library have been preserved and will continue to function as before. However, all new library includes will pull from our migrated v2 library list, so all new Particle projects that include a library will use the updated library structure.

For that reason, it may be necessary to migrate a library to the new library structure if the library was originally created as a v1 library.

Instructions for migrating v1 libraries to the new library format using the Particle CLI are included below.

### Using the CLI

Follow these steps to migrate a v1 Particle library to the new v2 structure using the Particle CLI:

- Install the Particle CLI version 1.19 or later.
  - If you do not have the Particle CLI installed on your machine, you can download and install it using our OS-specific instructions, [here](/getting-started/developer-tools/cli/)
  - If you already have the Particle CLI installed, you can update it to the latest version by running `npm update -g particle-cli`

- Run `particle library migrate` in your library directory
- Edit the newly created `library.properties` file to add a GitHub URL to the `url` field (like [https://github.com/particle-iot/internetbutton](https://github.com/particle-iot/internetbutton)) and the git remote to the `repository` field (like [https://github.com/particle-iot/internetbutton.git](https://github.com/particle-iot/internetbutton.git))
- If your library depends on another library, run `particle library add dependency` in your library directory and remove the source files of the other library from your own repository
- Ensure that the example applications for your library compile by running `particle compile photon examples/<name>` in your library directory
- Refresh the `README.md` file for your library with detailed information and instructions for using and interacting with the library. The `README.md` file will be used as the "home page" for your library.
  - See [https://github.com/particle-iot/PowerShield](https://github.com/particle-iot/PowerShield) for a good example.
- Upload a private version of your library by running `particle library upload`
- Try adding the library to a project using the [Web IDE](https://build.particle.io)
- Publish the new public version of the library by running `particle library publish MyLibrary` in the CLI
- Push to GitHub, and go celebrate!


## Common issues with porting libraries

- If you have a library `MyLibrary` be sure to have the file `src/MyLibrary.h`. This should exist, even if it only includes other header files. The Web IDE will automatically add `#include "MyLibrary.h"` to the project .ino file when adding the library.

- When uploading a new version of a library, *all files in the library directory are uploaded.* Be careful in case you have files in there you don’t want to upload like test binaries and large PDFs.

- You can upload a private version multiple times with the same version number, but once you publish a version to the public you won’t be able to upload with the same version number. If you make a small mistake just increase the version number and upload again.

- When porting a library, the library itself must have the source in the `src` directory. If it has files in the top level of the library project, they must be moved into a new `src` directory.

- When porting a library, the `name` field in `library.properties` must match the directory name. This is not enforced on Arduino, so some libraries have a different name here.

- You cannot set `#define` variables outside the project, such as using a `-D` in a Makefile. These external defines will need to be moved into header file instead.

- You also cannot set an alternate search path in a library (equivalent to a `-I` in a Makefile). However, the `src` directory is added recursively, so any files within `src` will be found during compilation.

- It is not possible to include a pre-compiled binary library (`.a` or `.so`) within a Particle library.

- Beware of libraries that contain code for other non-Particle hardware platforms. This code can be picked up in the published library and, if large, can cause a timeout while attempting to compile the library, if not an error.

- If you are porting code that you want to contribute back upstream, you can surround Particle-specific code with `#ifdef PARTICLE`.

- If you need to modify a public library for private modifications or to fix a bug, see also [Workbench pseudo-libraries](#workbench-pseudo-libraries), below.

- Beware of libraries with LGPL licensing. Due to the way the Particle libraries system works, statically linking the library to the application, the library exception in LGPL licensing does not apply! This means that LGPL (or GPL) licensed libraries cannot be used in closed-source commercial projects.

If you're having additional issues with library migration or contribution, please feel free to post a message in the 
[community forums](https://community.particle.io).


## Workbench pseudo-libraries

### Using source control

We highly recommend using a source code control system like Github to manage your projects. This assures that you can see all of the changes made over history, who made them, and also provide secure sharing of code. Github provides private repositories in the free plan; Github private repositories can also grant access to a specific list of Github users.

You will generally commit your entire project, with the following notes:

- `target/` should not be committed, as it contains built binaries and is very large. Include it in your `.gitignore` file.
- `.vscode/` is normally committed as it contains project settings, but in some cases you may want to commit the base settings once and avoid updating it so your team members won't have any of their private settings overwritten in the future.

This technique can also be used to share a complete project publicly, by making your Github repository public.

### Working with public libraries

When you add a library in Workbench using **Particle: Install Library** it does two things:

- Adds to `project.properties` as a dependency.
- Copies the library source into the `lib/` directory at the top of your project.

The local copy in the `lib` directory is used when you compile locally. However, if you remove the dependency from `project.properties`, then the local copy will also be used for cloud compiles.

We recommend that you:

- Include the public library source in your project `lib` directory and store it in source control like Github.

- Remove the dependency entry from `project.properties` so the behavior will be consistent between local and cloud compiles.

### Modifying public libraries

Sometimes you will need to make a small modification to a public library to make it suit your needs, or fix a minor compilation error caused in a new version of the compiler or Device OS. This is easy to do with pseudo-libraries.

- Install the library using **Particle: Install Library**
- Remove the dependency entry for the library from `project.properties`

Now you are free to make modifications to the library in the `lib` directory and these changes will used for local, cloud, and CLI cloud compiles.

### Using a 3rd-party library not in the community libraries

Sometimes you will encounter a library that is available in Github, but not in the Particle libraries system. In this case, download or clone the repo into the `lib` directory of your project.

Make sure all of the .cpp and .h files are in a `src` directory; they cannot be in the top level of the library directory within `lib` or in other directories.

See also [Common porting issues](/#common-issues-with-porting-libraries), above.

### Sharing code

You may want to put shared code in a pseudo-library. This keeps it well-organized and separate from your main application. To do this, you create the structure of a library, but not an actual public or private library in the Particle community library system.

```
MyProject/
  project.properties
  src/
    MyProject.cpp
  lib/
    SharedCode/
      src/
        Shared.cpp
        Shared.h                        
```

In this structure, the pseudo-library `SharedCode` is in the `lib/` directory. The main requirement is that it contain a `src/` directory containing the .cpp and .h files. It can contain subdirectories in `src` if desired, and the subdirectories are added to the include search path automatically.

You then have options:

- Commit your whole project including `SharedCode` to source control. This does not automate the sharing process but still helps with organization.

- Use the [Github submodule](https://github.blog/2016-02-01-working-with-submodules/) system for managing the shared code. If you think you will be modifying the shared code while working on a project then contributing the changes back up to the shared repository to eventually be incorporated into other projects, this is usually the best option. The biggest annoyance with submodules is that after cloning you must do a manual `git submodule update --init --recursive` to obtain the submodules, and this is not possible when downloading the zip file from the web-based Github.

- Using [Github subrepo](https://github.com/ingydotnet/git-subrepo) feature is the best if you have a set of common code that is only ever consumed by your project, or you are sharing your project publicly as it produces a complete project when downloading the project zip file from the web-based Github.

For more examples, see:

- [Tracker Edge](https://github.com/particle-iot/tracker-edge) uses a mix of source included from the project (like Thermistor) and Github submodules.
- [Monitor Edge](https://github.com/particle-iot/monitor-edge) uses the Github subrepo.
