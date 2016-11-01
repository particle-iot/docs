---
word: Libraries
title: Firmware Libraries
template: reference.hbs
columns: two
order: 3
---

# Libraries

The v2 release of libraries on the Particle platform brings some exciting new developments:

- available in all our tools: libraries v2 brings library support to all Particle development tools (Build, Dev and CLI)
giving you more freedom to choose the tool that's right for you
- library dependencies: easily resuse other libraries in your library without having to copy and maintain the source code.
- arduino-compatible: the libraries v2 format is closely aligned with the [Arduino 1.5 library format](https://github.com/arduino/Arduino/wiki/Arduino-IDE-1.5:-Library-specification)
- sources available as a tarball: the sources for the library can be downloaded directly.

All the existing libraries have been moved over to the new v2 format, and all new libraries published should be in the
v2 format. Don't worry if you still have libraries in the older format, 
the changes are straightforward and we have tools that halp migrate your libraries to the new format.


## Main Changes in Libraries V2

### Library v2 Format

The libraries v2 format is closely aligned with the [Arduino 1.5 library format](https://github.com/arduino/Arduino/wiki/Arduino-IDE-1.5:-Library-specification).
These are the main changes:

- the library descriptor is `library.properties` (was previously `spark.json`)
- the library sources are stored under a `src` folder (was previously `firmware`)

### Using a v2 library

Once a library has been added to your project [Dev,CLI], it's ready for use in your application.
To make the library functionality available to your application, you add an include statement to your application source code. 
The include statement names the library header file, which is the library name with a `.h` ending.  

For example, if we were using the
library "UberSensor", it would be included like this
 
 ```
 #include "UberSensor.h"
 ```

The older style v1 includes will continue to work for all v1 libraries that we have migrated to v2 format

```
#include "neopixel/neopixel.h"
```

so if your application was using a v1 library, there is no need to change the library includes - it will compile
 just fine with the old style includes.
Even so, we recommend you do update the includes to the simpler v2 style when it's convenient.


### Library Names
 
To keep to the Arduino library specification, each library must have a unique name. 
This is true for both published and unpublished libraries. This is in contrast to the v1 library system, where
only published libraries needed to have a unique name. 

All published libraries have the same name as they did before. So any published libraries being used by your application
will continue to work. There can only be one published library with a given name so it was fine keeping the 
existing name.

Unpublished v1 libraries are also migrated to the new system. However, to avoid name clashes, the names were changed
slightly. The names were changed by adding an underscore and some letters and numbers to make the name unique. For example,
an unpublished clone of `InternetButton` would have been renamed something like `InternetButton_48fc`. 

Applications using libraries in the v1 system were available in Build. All projects in Build have been automatically 
migrated to use the correct, renamed library in the v2 system, so you can continue compiling and flashing your application without changes. 

When renaming a library, just the library name is changed - the header files themselves are not changed; 
the library is still included using `#include "libraryname.h"` using the
name without the unique suffix. This means application code will continue to compile unchanged when compiled using the
 v2 library system.


## Project Structure

There are 3 kinds of project structure:

- legacy
- simple 
- extended

### Legacy Structure

The legacy project structure stores files in the root of the project. There is no project definition file. This is
the structure used by all projects prior to libraries v2. 

```
    myapp/
    + application.cpp
```

A legacy project does not support using libraries.


### Simple Structure

The simple project structure is similar to the legacy structure - the project sources are stored in the root. However,
the project also includes a project definition file `project.properties`.

```
    myapp/
    + project.properties
    + application.cpp
```

A simple project has standard support for libraries; libraries can be added to the project via the `library add` command. 
[Copied libraries](#copied_libraries) are not supported in simple projects.


### Extended Structure

The extended structure expands on the simple structure, placing all application sources in the `src` folder.

```
   myapp/   
   + project.properties
   + src/
   +- application.cpp
```

An extended project has full support for libraries, supporting both `library add` and copied libraries.



### Copied Libraries

A copied library is a library that is stored inside the project itself, in contrast to being referenced as a dependency in
the `project.properties` file.

A library is copied to the project using the `library copy` command. The library sources are downloaded and stored under
the `lib` directory of the project. For example, after installing the "neopixel" library, the project structure 
looks like this:


```
   myapp/
   |
   +-- project.properties
   +-- src/
   |   +-- application.cpp
   +-- lib/
       +-- neopixel/
           +-- src/
               +-- neopixel.h
               +-- neopixel.cpp
   
```


The main benefit of using a copied library instead of a regular library dependency is that you can make changes to
the library, such as adding new features, or addressing any issues. These changes are avaialble immediately in your
application and are compiled in with your application.


## Create, Contribute and Publish Libraries

When you develop your own library, library development typically follows these main steps:

- create, develop and test the library
- contribute the library
- publish the library


### Create a library

The steps to creating a library are as follows:

- create an extended project for testing and exercising the library
- create a directory `lib/<libraryname>/` and change to that directory
- scaffold a new library structure in that directory via the `library init` command
- code up the library, tests and examples

When it's time to test the library on a device, you compile and flash the enclosing application.


### Contribute a Library

Once the library has been tested and you want to share it, for use within your own projects or sharing with others,
then it's time to contribute the library.

Contributing a library is the process where you make your authored library available in the cloud. 
Initially the library is only visible to you, it's creator. 

You contribute your library using the `library contribute` command. This will validate the library, informing you of
any errors, and if there are none, the library is saved in the cloud. 

It is ok to contribute the same version of a library multiple times. This allows rapid development without 


### Publishing a Library

After a library has been contributed, and you wish to make it available for everyone to use, then it's time to
publish the library.

Library publishing is an optional second step, which makes the library visible to everyone.

To publish a library, use the `library publish` command.  Note that while it's possible to contribute the same library
 version over and over, a given version of a library may be published only once. 


### Uber library example

The [uber library example](https://github.com/spark/uber-library-example) has been updated to the new v2 format.
This library illustrates our recommended best practices when creating a new library, or enhancing an existing library.


## Forking an Existing Library

Most libraries have their sources stored in GitHub. This provides an established workflow for suggesting changes
to a library, and allowing library authors to include those changes in the next release of a library.

If you wish to make changes that are shared amongst your team or to the world, 


