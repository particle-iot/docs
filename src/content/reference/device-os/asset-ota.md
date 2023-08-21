---
title: Asset OTA
columns: two
layout: commonTwo.hbs
description: Asset OTA
includeDefinitions: [api-helper,api-helper-extras,api-helper-projects,zip]
---

# {{title}}

{{!-- BEGIN shared-blurb e724be96-469f-4bf2-bead-c8c962accad8 --}}
Asset OTA (available in Device OS 5.5.0 and later), makes it easy to include bundled assets that can be delivered to other processors and components in your system, such as:

- Coprocessors
- Graphics and fonts for external displays
- Sound samples for device with audio output capabilities

Including assets is as easy as including an directory in your project, specifying it in the `project.properties` and building and flashing using Particle Workbench, the Particle CLI, or fleet-wide OTA for a product. Bundled assets can be up to 1 MB in size (after compression) and do not use additional data operations.

The compression algorithm is similar to gzip, so using a gzip program on the assets folder on your computer will yield the approximate size after compression.
{{!-- END shared-blurb --}}

- Particle Workbench and the Particle CLI will automatically generated bundled assets when the `project.properties` file contains an `assetOtaDir` key and a value containing a valid directory.

```
assetOtaDir=assets
```

- When using **Particle: Compile Application** or `particle compile` projects with bundled assets are built into a .zip file. This file contains both the firmware binary (.bin) as well as the assets. 
- The asset bundle .zip can be uploaded to the console as product firmware binary.
- When using **Particle: Flash application** or `particle flash` the same process is followed, except the device is flashed.
- When flashing OTA, the asset bundle is transmitted using resumable OTA and compression for efficient data use.
- You will need to include code in your application firmware to process the additional assets, such as sending them to a coprocessor or saving them to the file system.
- Creating bundled assets will not be not possible in the Web IDE. Particle Workbench is recommended.

The application can register a callback using `System.onAssetOta(handler)` that will be called by Device OS when the device has received all the bundled assets. For more information, see the [Asset OTA Device OS API](/reference/device-os/api/asset-ota/asset-ota/).


## Asset OTA Example

The rest of this document shows how to add OTA assets to your project. This example just saves the files to the flash file system so you can run it without any additional hardware beyond a compatible Particle cellular or Wi-Fi device. Additional examples of using Asset OTA can be found on [the GitHub repository asset-ota-examples](https://github.com/particle-iot/asset-ota-examples).

Instead of saving the assets to the flash file system, you could:

- Directly flash an external coprocessor, such as by UART serial.
- Directly write to an external display connected by SPI.

If you call `System.assetsHandled(false);` the assets will be presented on every boot, which is often more space-efficient than storing a separate copy in the file system. You still may want to store it in a file if you need random access to the asset, or need it later, after boot. For example, if you have multiple sound file assets and you want to be able to choose one to play, the file system would be a good choice.

### Example firmware

{{> project-browser project="FileAssetExample" default-file="src/FileAssetExample.cpp" height="400" flash="true" options="gen3" target=">=5.5.0"}}

#### onAssetOTA or assetsAvailable

There are two ways to handle assets. A common way is to use:

```cpp
STARTUP(System.onAssetOta(handleAssets));
```

This example uses a call from `setup()` instead, otherwise the debug log messages may occur so early at boot that you don't see them.

```cpp
handleAssets(System.assetsAvailable());
```

#### Processing Assets

In `handleAssets()` the code iterates through all of the assets. This is typical.

```cpp
for (auto &asset : assets)
```

For each asset, the example creates a file on the flash file system with the same name. It then reads the data out of the asset and writes it to the file.


#### project.properties

You must specify the `assetOtaDir` in your project.properties file for assets to be generated. The name matches the directory name.

```
name=FileAssetExample
assetOtaDir=assets
```

#### assets directory

You specify the name of the directory containing assets using `assetOtaDir` so it doesn't need to be called `assets` but that is what is used in the example.

There are two files in the example:

- assets/logo.png: A small Particle logo png image file
- assets/test1.json: A small JSON file to demonstrate using Asset OTA for distributing JSON configuration files


### Creating a zip binary

One common option for creating a binary is to use the Particle CLI. The main difference is that you must specify a .zip file instead of a .bin file if you specify the filename using `--saveTo`.

```sh
% cd FileAssetExample
% particle compile p2 . --saveTo firmware.zip --target 5.5.0-rc.1

Compiling code for p2
Targeting version: 5.5.0-rc.1

Including:
    project.properties
    src/FileAssetExample.cpp
    assets/logo.png
    assets/test1.json

attempting to compile firmware
downloading binary from: /v1/binaries/64e377e11067c0b8a0d11471
Memory use:
   text    data     bss     dec     hex filename
  17518     124    3254   20896    51a0 /workspace/target/workspace.elf

Compile succeeded and bundle created.
Saved bundle to: /Users/rick/Downloads/FileAssetExample/firmware.zip
```

You can see the files that are added to the bundle listed in the `Including:` section.

If you extract this zip file, you'll find that it contains `firmware.bin`, the compiled binary, and the `assets` directory containing your assets.


### Flashing a device

You can then flash the zip file to the device using the Particle CLI or upload it to a product.

```sh
% particle flash test-photon2 firmware.zip
```

### Observing the debug output

At boot, you'll see output similar to this. This shows the data being copied to the flash file system.

```
0000003378 [app] INFO: handleAssets called
0000003383 [app] INFO: asset path=/usr/assets/logo.png size=2466
0000003434 [app] INFO: wrote 512 bytes to file
0000003442 [app] INFO: wrote 512 bytes to file
0000003454 [app] INFO: wrote 512 bytes to file
0000003463 [app] INFO: wrote 512 bytes to file
0000003470 [app] INFO: wrote 418 bytes to file
0000003518 [app] INFO: asset path=/usr/assets/test1.json size=44
0000003566 [app] INFO: wrote 44 bytes to file
0000003783 [app] INFO: set assetsHandled to true
```

Every 10 seconds, the example prints out the asset files. The logo.png file is printed in hex, and the data should be as it is below.

The top level keys of the test1.json file are printed out. You can edit the file, compile, and flash it and see the values change.

```
0000010001 [app] INFO: found asset /usr/assets/logo.png size=2466
89504e470d0a1a0a0000000d4948445200000040000000400806000000aa6971de000004b069545874584d4c3a636f6d2e61646f62652e786d7000000000003c3f787061636b657420626567696e3d22efbbbf222069643d2257354d304d7043656869487a7265537a4e54637a6b633964223f3e0a3c783a786d706d65746120786d6c6e733a783d2261646f62653a6e733a6d6574612f2220783a786d70746b3d22584d5020436f726520352e352e30223e0a203c7264663a52444620786d6c6e733a7264663d22687474703a2f2f7777772e77332e6f72672f313939392f30322f32322d7264662d73796e7461782d6e7323223e0a20203c7264663a446573
0000010126 [app] INFO: found asset /usr/assets/test1.json size=44
0000010132 [app] INFO: key=a value=JSON example
0000010135 [app] INFO: key=b value=12345
```

### In the console

In the [Particle console](https://console.particle.io/), if you view a device, you can see the assets that were flashed just below the functions and variables:

![Console device view](/assets/images/fileassetexample.png)

