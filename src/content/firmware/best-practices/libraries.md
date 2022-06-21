---
title: Libraries
layout: commonTwo.hbs
columns: two
---

# {{title}}

This application note includes information on using libraries effectively in Particle projects.

## About libraries

- Libraries are packages of code to add functionality to your application firmware.

- Many peripheral devices like sensors, displays, etc. include a library to access the peripheral.

- Most libraries are community maintained.

## Finding libraries

The web-based library search tool is often the best option:

<a href="/reference/device-os/libraries/search/" class="button">Search and browse libraries</a>

However, you can also use:

- The [Web IDE](/getting-started/developer-tools/build/#using-libraries) libraries icon.

- The [Particle CLI library search](/getting-started/developer-tools/cli/#using-libraries).

- If you are using a Sparkfun Qwiic sensor (I2C), there is a list of sensors and their libraries in the [Qwiic reference](/hardware/expansion/qwiic/).

- If you have the source to a library, see [Using non-libraries](#using-non-libraries) and Using GitHub libraries, below, for using it with Particle Workbench.


## Libraries and Workbench

### Workbench project structure

Workbench projects start out with this structure:

- `project.properties`
- `src/`
  - `discombobulator.cpp`

Your application source resides in `src` as .ino, .cpp, and .h files. In this example, we have the made-up application file `discombobulator.cpp`.


### Particle: Install Library

To install a library, you typically use the Command Palette (Ctrl-Shift-P on Windows and Linux and Command-Shift-P on the Mac) and select **Particle: Install Library** and enter the library name. In this example, the [CellularHelper](/reference/device-os/libraries/c/CellularHelper/) library has been added. This will update two things in your project:

- `lib/`
  - `CellularHelper/`
    - `examples/`
    - `library.properties`
    - `LICENSE`
    - `README.md`
    - `src/`
      - `CellularHelper.cpp`
      - `CellularHelper.h`
- `project.properties`
- `src/`
  - `discombobulator.cpp`

The `project.properties` file is updated with the library that you installed. For example:

```
name=discombobulator
dependencies.CellularHelper=0.2.5
```

This states that the project uses the library `CellularHelper` version 0.2.5.

The other thing it does is make a local copy of the library in the `lib` directory. This is handy because you can view the README file, as well as browse the library source easily.


### Cloud vs. local compiles

Libraries work slightly differently for local vs. cloud compiles, which can cause some confusion.

For cloud compiles, libraries in `project.properties` are used even if there is a local copy downloaded in your project. This also applies to using the Particle CLI `particle compile` command.

For local compiles, you must have a local copy of the library in the `lib` directory. This is done automatically by **Particle: Install Library** in the command palette, or by using `particle library copy` from the CLI. 

### Customizing libraries

If you are modifying a community library that you previously installed using **Particle: Install Library** in the command palette, or by using `particle library copy` from the CLI, you should remove the dependencies entry in `project.properties` in the dependency section. If you do not do this, cloud compiles will pick up the official version instead of your modified version. Even if you normally use local compiles, it's good practice to do this to prevent future confusion.

Most libraries have open source licenses that allow you to use a modified version in your project, however see [Libraries and software licenses](#libraries-and-software-licenses), below, for more information.

### Using private libraries

Most libraries are public, which is to say any user can use and download the library source. 

It is possible to make a private library by doing the `particle library upload` step and not doing `particle library publish`. 

However, this library will be private to the account that uploaded it. There is no feature for sharing a library with a team, product, or organization. However, in  Workbench there are other techniques that may be helpful in the next sections.

### Using non-libraries

When using Workbench the `lib` directory can contain things that are not actually Particle libraries, as long as they have the correct directory structure:

- `lib/`
  - `SharedUtilities/`
    - `src/`
      - `SharedUtilities.cpp`
      - `SharedUtilities.h`
- `project.properties`
- `src/`
  - `discombobulator.cpp`

In this example, there is a "non-library" called `SharedUtilities` in the `lib` directory. That further contains a `src` directory, which contains the actual library source.

The fake library can contain multiple files, but it should only contain .cpp and .h files. It should not have .ino files!

### Using GitHub libraries

You can commit your entire project to GitHub (private or public), including the `lib` directory. You can reduce code duplication and make updates easier by using Git **submodules**.

```
cd lib
git submodule add https://github.com/particle-iot/CellularHelper
```

In this example, instead of cloning the repository, we use `git submodule add`. This makes a copy of it locally, however when you commit your project to GitHub, it only contains a reference to the external project, not the contents of it.

If you've used Tracker Edge firmware, you've probably noticed that when you clone Tracker Edge you need to run the following command:

```
git submodule update --init --recursive
```

This is what retrieves all of the submodules in its `lib` directory.

This technique is great for working on shared code across teams and projects. You have the full power of GitHub teams and organizations to safely and securely manage access to your code.

Submodules can also be used with a fork of a repository. This allows you to easily modify an existing GitHub-based library in a fork and merge an updated original version with your changes.

See also [Working with GitHub](/getting-started/developer-tools/workbench/#working-with-github) for more tips for using it with Workbench.

### Upgrading libraries

Particle libraries are not automatically updated when new versions come out. The easiest way to update is to delete the line for the library you want to update from project.properties and then **Particle: Install Library** to update the project.properties file and copy a local version.

If you are are using GitHub to manage libraries using submodules, to get the latest main (or master), you use:

```
git submodule update --remote
```

## Creating public libraries

To create a new library, see [contributing libraries](/getting-started/device-os/firmware-libraries/#contributing-libraries).

If you are using Workbench, there are a few special technique that are required. See
[Developing libraries in Workbench](/getting-started/developer-tools/workbench/#developing-particle-libraries) for more information.

### Library naming

You should only use letters A-Z and a-z, numbers, underscore, and dash. You cannot use spaces or accented characters in library names! Case is preserved, but when looking up library names, the search is case insensitive.

Library names are globally unique, even for private libraries. This sometimes causes confusion if you try to upload a new library and it fails with a permission error. Even if a library search does not show anyone using that name, if someone else has uploaded a private library with that name, you will not be able to use it.


## Porting Arduino libraries

### Set up file structure

Most Arduino libraries already have the correct structure, but if not you will need to move files around to make:

- `examples/`
- `library.properties`
- `src/`

Additionally:

- The `src` directory should contain .cpp and .h files. 
- The examples directory should contain zero or more example projects, with each example in a separate folder in examples.
- Example projects can only be one level deep. If there is a directory in examples with more examples, you'll need to flatten out the directory structure.
- Example source can have a single `ino` file in each example project directory, or they can use `.cpp` files.

### Edit library.properties

Most Arduino libraries should already have a library.properties file, but if not, you will need to create one.

Note that the name (library name) in `library.properties` must match the directory name of the library. This is not a requirement for Arduino libraries, and some libraries may have a descriptive name (with spaces) in this field, and you must edit this to match.

### Fix compile errors

Some libraries are easier to port than others. Many will require no modifications at all. Some common problems:

- Unnecessary includes. Things like `#include "Wire.h"` are not used on the Particle platform and can be removed.
- Naming conflicts. Occasionally libraries will use variables that conflict with names that are not used in Arduino, but may be used on the Particle platform. 
- If the library has large amounts of test code or code for other platforms, you may need to remove it. Otherwise it may be included in the uploaded library, and very large libraries will not load in the Web IDE.

### Making modifications for inclusion in the original source

Sometimes you'll make changes to the original library and publish it. Other times, you may want your changes incorporated in the original library, typically by using a GitHub pull request. The most common way is to isolate any Particle-specific code in a `#ifdef` or `#ifndef`.

```
#ifdef PARTICLE
// Particle-specific code
#endif
```

## Libraries and software licenses

There is no standard for software licenses for library code, and it is up to the library creator to assign one. Most libraries have a LICENSE file, or include the license information in the README or in the source code files.

### With proprietary projects

If your application is proprietary, you must make sure that any libraries you use have a **permissive** license. This allows proprietization, even if the library is open source. Common permissive licenses includes:

- BSD (2 or 3-clause)
- MIT
- Apache
- Public Domain
- CC0 (Creative Commons, Level 0)

In particular, GPL and LGPL libraries cannot be used in proprietary user applications! This is even true for LGPL because of the dynamic linking rule. Since Particle libraries are statically linked to the user application, the allowance for LGPL libraries to be used in dynamically linked proprietary applications does not apply.

### With open source projects

You can generally use any of the popular licenses in open source projects. 

Note, however, that if you use a library that has a **copyleft** license, such as GPL or CC-BY-SA, then your application must generally have a similar copyleft license.

However, if you use a library with a permissive license such as MIT, you are free to release your application with permissive licenses (such as MIT, Apache, or BSD), or a copyleft license (such as GPL).

Though rare, a library with a JRL (Java Research License), AFPL (Aladdin Free Public License), or CC-BY-NC license cannot be used in a commercial product, even if open source.

Additionally, there may be a requirement to for attribution for CC-BY and some other licenses.


## Less common scenarios

### Libraries with a static library

It is not currently possible to create a Particle library that includes a static library of proprietary code. For example, the Bosch Sensortec BSEC library for the BME680 is not open source, but rather a closed-source library .a file that can be linked with an application. There is currently no way to include this in a cloud compile.

