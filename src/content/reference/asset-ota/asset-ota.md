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

Including assets is as easy as including an directory in your project, specifying it in the `project.properties` and building and flashing using Particle Workbench, the Particle CLI, or fleet-wide OTA for a product. Bundled assets can be up to 1 MB to 1.5 MB in size, after compression, depending on the platform, and do not use additional data operations.

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

The application can register a callback using [`System.onAssetOta()`](/reference/device-os/api/system-calls/onassetota-system/) that will be called by Device OS when the device has received all the bundled assets. For more information, see the [Asset OTA Device OS API](/reference/device-os/api/asset-ota/asset-ota/).

### Maximum asset sizes

{{!-- BEGIN shared-blurb 3c7973be-f602-477f-bc14-bd510c13fdbd --}}
| Platforms | Total asset storage | Maximum single asset size |
| :--- | :--- | :--- |
| tracker, b5som, esomx | 2 MB | 1.5 MB |
| boron, bsom, argon | 1.125 MB | 592 KB |
| p2 (and Photon 2) | 1.125 MB | 1.09 MB |
{{!-- END shared-blurb --}}

There isn't a strict limit on the number of assets in your bundle, however each asset file is stored as a separate file in a flash file system, and each file takes a minimum of 4K bytes, even if the file is smaller than that. Thus if you have a large number of very small assets, you may want to consider concatenating them into a single larger asset.

Note that the asset storage file system is separate from the user file system and does not count against the 2 MB (4 MB on Tracker) available for your use.

## Asset OTA Example

The rest of this document shows how to add OTA assets to your project. This example just saves the files to the flash file system so you can run it without any additional hardware beyond a compatible Particle cellular or Wi-Fi device. Additional examples of using Asset OTA can be found on [the GitHub repository asset-ota-examples](https://github.com/particle-iot/asset-ota-examples).

Instead of saving the assets to the flash file system, you could:

- Directly flash an external coprocessor, such as by UART serial.
- Directly write to an external display connected by SPI.

If you call [`System.assetsHandled(false)`](/reference/device-os/api/system-calls/onassetota-system/) the assets will be presented on every boot, which is often more space-efficient than storing a separate copy in the file system. You still may want to store it in a file if you need random access to the asset, or need it later, after boot. For example, if you have multiple sound file assets and you want to be able to choose one to play, the file system would be a good choice.

### Example firmware

{{> project-browser project="FileAssetExample" default-file="src/FileAssetExample.cpp" height="400" flash="true" options="gen3" target=">=5.5.0"}}

This example stores assets in the user portion of flash file system, but this done for illustration only because it does not require external hardware and the example is easy to follow. Because assets are stored by the system even after you mark them as handled, you can always start reading the assets again using `System.assetsAvailable()` and reading the assets again. This is often more efficient.

#### onAssetOTA or assetsAvailable

There are two ways to handle assets. A common way is to use [`System.onAssetOta()`](/reference/device-os/api/system-calls/onassetota-system/):

```cpp
STARTUP(System.onAssetOta(handleAssets));
```

This example uses a call from `setup()` and [`System.assetsAvailable()`](/reference/device-os/api/system-calls/assetshandled-system/) instead, otherwise the debug log messages may occur so early at boot that you don't see them.

```cpp
handleAssets(System.assetsAvailable());
```

#### Processing Assets

In `handleAssets()` the code iterates through all of the assets. This is typical.

```cpp
for (auto &asset : assets)
{
    // Put code here to handle asset
}
```

For each asset, the example creates a file on the flash file system with the same name. It then reads the data out of the asset and writes it to the file.


#### project.properties

You must specify the `assetOtaDir` in your project.properties file for assets to be generated.

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
% particle compile p2 . --saveTo firmware.zip --target 5.5.0

Compiling code for p2
Targeting version: 5.5.0

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

When you flash a device with assets, the process is as follows:

- The .zip file is uploaded to the cloud.
- The cloud extracts the zip file, verifies the contents, and makes sure the bundle will fit on the target device.
- The firmware .bin is flashed to the device OTA.
- Normal checks are done to make sure system dependencies are met. If the device needs a Device OS upgrade, it goes into safe mode (breathing magenta) and these updates are flashed and the device rebooted.
- If the firmware has assets, the local asset storage on the device is checked to see if the file and hash match an existing assets. If not, the device will go into safe mode and the assets(s) downloaded. Only new or changed assets are downloaded.
- The device will now run the user firmware.
- The `onAssetOta` handler function will be called (if used), and all assets will be available to the user firmware via the `System.assetsAvailable()` function.

If you want to flash by USB, you can use:

```sh
% particle flash --local firmware.zip
```

### From Workbench

You can also use the local and cloud compile options in Particle Workbench to create an asset binary, directly flash the device OTA, or flash the device over USB.


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

### Cleaning up

This example will leave the files on the flash file system, which will be preserved even when you flash new firmware. To clean up these 
files, change the `checkAssets()` function to this and flash the firmware to your device to clean up the files in the `assetsDir`.

```cpp
void checkAssets()
{
    // This is just for demonstration purposes for reading assets
    DIR *dirp = opendir(assetsDir);
    if (dirp)
    {
        while (true)
        {
            struct dirent *de = readdir(dirp);
            if (!de)
            {
                break;
            }
            if (de->d_type != DT_REG)
            {
                // Not a file
                continue;
            }
            String path = String::format("%s/%s", assetsDir, de->d_name);
            unlink(path);
        }
    }
}
```

## FAQ

### Should I include all assets in every firmware build?

Yes, you should include your assets in every firmware build.

### Doesn't that use a lot of data?

No. Even though your asset bundle is uploaded to the cloud as a .zip file, it's unzipped and verified in the cloud. Each asset it mapped by its name and hash. If the contents of an asset binary do not change, the assets will not be downloaded to the device again, even if bundled with a different version of the firmware.

### My external MCU doesn't have flash memory and I need to program it on every boot. Is this supported?

Yes. Instead of using the `System.onAssetOta()` hook, you may prefer to use `System.assetsAvailable()`. The assets are stored on device even if you call `System.assetsHandled()` so you can always use them again.

### I need my assets later on, not at boot. Can I access them later?

Yes. `System.assetsAvailable()` is available at runtime. You can call this any time you want to access your assets.

For example, if you want to store a specific bitmap to a display, or play a sound asset, you can call `System.assetsAvailable()`, iterate the results until you find the one you want, then stream the contents. 

### What if I accidentally flash a firmware version that did not contain assets?

You can flash a new version of firmware that contains the same assets (same name, same hash) and the assets will be available again without having to download them to the device again.

### If I add a new asset, do the older ones need to be downloaded again?

No. Assets download is determined on a per-file basis based on name and hash, so if those do not change the file will not be downloaded to the device again.

### Is there a cloud API to create a bundle?

No, the bundle creation is done entirely within the Particle CLI, not in the cloud. Particle Workbench uses the CLI as well.

### Can I modify the zip file without the CLI?

This is not recommended. When a bundle is created, information about each asset file is inserted into the firmware .bin file, including its name and hash.

If the hash in the .bin file does not match the hash of the asset file, it will be rejected, both by the CLI if you attempt to flash it from the CLI, but also via the cloud API.

If you want to create a bundle from an existing .bin file, use the `particle bundle` CLI command.

