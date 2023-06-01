---
title: Firmware build options
columns: two
layout: commonTwo.hbs
description: Firmware build options
---

# {{title}}

## Firmware build options

There are numerous options for building your product firmware, with various pros and cons:

### Workbench compile (cloud compile)

- Use a source code control system such as Github
- Build using **Particle: Cloud Compile**
- Upload to your product manually

This is generally the easiest method to set up and run.

### Workbench compile (local)

- Use a source code control system such as Github
- Build using **Particle: Compile Application (local)**
- Upload to your product manually

While this option does not require the cloud compiler, it can take a very long time for your first build to complete, especially on Windows. 

There is a possibility of build artifacts being left behind from a previous build as it's hard to clean the build tree without making subsequent builds take a very long time.

### Particle CLI (cloud compile)

- Use a source code control system such as Github
- Build using `particle compile` in the Particle CLI
- Upload to your product manually

This is essentially the same as Workbench cloud compile, which actually uses the Particle CLI to do the cloud compile.

### Github actions (CI/CD)

- Use a source code control system such as Github
- Create a configuration to build out of [Github actions](/firmware/best-practices/github-actions/)
- If the build is good, tag the release
- It will be automatically uploaded to your product

This is the recommended option for most users in that it's relatively easy to use, highly repeatable, and has little chance of corruption or user error causing a bad binary to be uploaded to a product.

In most cases, you can do this even in the free plan using the Github hosted runner.

### Docker Buildpack

This option is recommended if:

- You want to do builds in an isolated environment (not a desktop build)
- You want to do builds locally and not depend on a cloud service like the Particle cloud compilers or a Github actions runner
- You want to assure that every build is completely clean and does not have any remnants of previous builds

The Docker buildpack is a container image for building user firmware for a specific platform (boron, bsom, p2, etc.) and Device OS version. It contains the compiler, make, and other tools that are necessary and does not depend on any locally installed tools (except Docker). It contains the pre-built Device OS user firmware stubs so it does not need to build all of Device OS from source.

This is actually how the cloud compiler works. When you cloud compile, it spins up a container to run your build, saves the built firmware binary, then deletes the container.

If you use Github Actions and choose to build the firmware binary in the runner, instead of using the Particle cloud compilers, this is also how the build is done. The [compile-action](https://github.com/particle-iot/compile-action/blob/main/src/docker.ts) source is open-source and you can view that to see how it works in Github actions. You could use the same technique to build out of other CI/CD services, like CircleCI.

### Web IDE (not recommended)

We do not recommend using the Web IDE for products. 

There is no version control in the Web IDE, and if multiple users are working on the project, they would have to share a single account, which we do not recommend.

You should instead use a source code control system like Github and one of the build options above.

## Using buildpack

Using a buildpack requires Docker, but does not require other local tools. The gcc compiler, make, and other tools are all included in the container image. The image is set up to build one platform and one Device OS version, but there is a image available for every supported combination. If you use multiple platforms such as bsom and b5som, you'd need to have one image for each.

The parameters to a buildpack build are:

- The `input` volume, containing the source code
- The `output` volume, where the built `firmware.bin` file will be copied
- The `PLATFORM_ID` (numeric)
- The image name (specific to a Device OS version and platform)
- The container name (optional)

**Buildpacks were developed for Particle internal purposes.**

Buildpacks are actively utilized within Particle and are available to be used by Particle customers. There could be changes in the future that may affect your build scripts, however.

### Source preparation

There are two important caveats to building using a buildpack:

- .ino file preprocessing is not done in the container
- library dependencies are not resolved in the container

In general, you should just not use .ino file and instead use .cpp files. It's a simple one-time change as [described here](/reference/device-os/api/preprocessor/preprocessor/). This will also simplify using the source-level debugger.

Since the container is an isolated environment it cannot download libraries. What we recommend is:

When you prepare your source code repository, commit library sources to your Github or other source code repository. This will assure that you have the desired version and does not depend on downloading the library source at build time.

If you are using Particle Workbench, this is easy because `particle library copy` will download the library and extract it to the `lib` directory at the top of the project, and you can commit this as-is. This is also required if you are using a local compile in Workbench.

### Download the container image

Download the container image. For example:

```html
docker pull particle/buildpack-particle-firmware:5.3.1-p2
```

- Replace `5.3.1` with the version you are targeting
- Replace `p2` with the platform name such as boron, bsom, b5som, tracker, p2, etc.

The download will take 30 seconds to a minute or two, and the image is around 2 GB.

This step requires the Internet, of course, but Docker has the ability to save and load these images to your local disk using `docker save` and `docker load` so you can copy the image completely offline, using a USB drive, for example, once you downloaded the container image once.

| Platform | PLATFORM_ID | Notes |
| :--- | :---: | :--- | 
| p2 | 32 | P2 and Photon 2 |
| argon | 12 | |
| boron | 13 | All Boron models including BRN404X |
| esomx | 15 | E404X only |
| bsom | 23 | B Series SoM B404X, B404, and B402 |
| b5som | 25 | B Series SoM B524, B523 |
| tracker | 26 | Tracker SoM, Tracker One, and Monitor One |
| electron | 10 | Electron, E Series, except E404X |
| photon | 6 | |
| p1 | 8 | |

### Build

You use the `docker run` command to start a new container and run the build in it.

| Command Fragment | Description |
| :--- | :--- |
| `docker run` | Create a run a container |
| `--name=`*name* | Name of the container (optional) |
| `-v `*local_path*`:/input` | Path to the source directory, must be an absolute path |
| `-v `*output_path*`:/output` | Path to the output directory, must be an absolute path |
| `-e PLATFORM_ID=`*numeric_platform_id* | The numeric platform ID you are building for |
| *image_name* | The name of the image file |

For example:

```html
docker run --name=compile-0001 -v /Users/rick/Documents/src/BlinkLed:/input -v /Users/rick/Documents/src/build-test/output:/output -e PLATFORM_ID=32 particle/buildpack-particle-firmware:5.3.1-p2
```

- The `--name` is optional, however it makes it easier to keep track of your containers
- Note that `-v` takes the local path, which must be an absolute path, and either `:/input` or `:/output`
- You need to include `PLATFORM_ID` with the numeric platform ID

When the build is complete, you'll find your firmware binary in the output directory as `firmware.bin`.

You'll also find `memory_use.log` which contains output you may be familiar with from the Web IDE.

```html
   text    data     bss     dec     hex filename
   5570     124    2854    8548    2164 /workspace/target/workspace.elf
```

You can now delete the container:

```html
docker rm compile-0001
```

Each build will create a fresh container so you never need to work about artifacts leftover from the last build.

The process is generally fast, though of course dependent on the speed of your computer. Unlike cloud builds, there is no time limit for buildpack builds so you can build much large source bases using a buildpack.

