# pico-flashloader

The RP2040 provides a built-in bootloader in its ROM that allows the device to be very easily updated by presenting a USB mass-storage device into which the new firmware can be copied.
Alternatively there is also a separate USB interface which can be used programmatically to transfer new firmware (e.g. using [`pico-tool`](https://github.com/raspberrypi/picotool)).

These are very useful interfaces to have and for many projects will be sufficient but they have a couple of downsides:
* The RP2040 must be connected to USB to perform the update
* The separate USB interface mentioned above and used by `pico-tool` requires drivers to be installed on Windows and usually special rights on Linux.  This requires a potentially not insignificant level of support for end-users for a feature that may be rarely necessary.

Assuming that _some_ interface (e.g. UART, SPI, I<sup>2</sup>C) exists for getting a new application image onto the chip, it _is_ possible for the existing application to overwrite itself with the new one but this is not power-fail safe.  If anything goes wrong before the new application has been completely written, you may be left with a bricked module until it can be connected to USB and forced
into the bootloader (or the debug interface is used to recover it).

The flashloader presented here overcomes this problem by allowing the new application to be flashed before the existing application is started.  If flashing fails (e.g. due to an inopportune power loss), the flashloader itself will still be functional and will be able to retry on the next start.  If all else fails, the bootrom bootloader is started.

The flashloader uses the first 4k of flash.  This means any application has to be configured to be run from a different location than normal.  This is done by a linker script ([`memmap_default.ld`](memmap_default.ld)), which has been copied from the SDK and adjusted accordingly (described in more detail in [`Using in your own project`](#using-in-your-own-project)) below.

In normal circumstances, the flashloader will simply jump to the normal application.  The flash functionality is only used if the watchdog scratch registers are correctly set or the normal application is invalid.

The boot sequence is as follows (falling through to the next step if the current step fails):
1. If watchdog scratch register 0 contains the magic number, and scratch register 1 contains a valid start address in flash for the new application image, flash it and restart
1. If the normal application is valid, start it
1. Look for a new application image by checking each erase block for a valid image header.  If one is found, flash it and restart
1. Start bootrom bootloader

The watchdog is started before flashing so that if something causes the processor to take too long for a single step of the flash process, the processor will be automatically restarted.  The number of times the flashloader will try to reflash the application is set by the `sMaxRetries` constant in [`flashloader.c`](flashloader.c).

## What it won't do
The flashloader has several features to ensure it doesn't accidentally overwrite the application with nonsense but if the new application has a bug that (for example) causes the processor to lock up, the flashloader will not be help (although see ['Possible extensions'](#possible-extensions) below)

## Implementation
The aim was to make the flashloader small enough to fit in a single erase block (4k).  Normally this would be no problem as the actual code content of the flashloader is not that great but the SDK pulls in a lot of stuff that is not required by the flashloader, or is designed to handle scenarios that don't apply to the flashloader, so is larger.  That makes it fairly quick and easy to start implementing an application but means a binary of around 7k before `main` is called.

Going full-on bare-metal and bypassing the SDK start-up code completely is certainly possible but it's a lot more involved and in the end, nothing is gained by having a flashloader that is, say, just 512 bytes in size when an erase block is 4k.  The argument could also be made that even a 12k flashloader is probably not going to be much of an issue if you have 2MB of flash anyway.  So a compromise seems appropriate.

The SDK is used but the standard start-up code is not.  This means that the flashloader takes care of switching the main clock source to the external oscillator (not actually necessary but speeds things up) and enabling the required hardware modules (and only those).

At the moment, the flashloader comes in at about 2.9k

# Demo application
The demo application included here is just to show how everything works.  It is not designed to be incredibly robust.

Two versions of the same application are built which flash the on-board LED at different rates and wait for a new application to be sent over UART.

## Building
This project has been built and tested using Linux and the Pico SDK v1.3.0 but it should work with any supported build environment
```
mkdir build
cd build
cmake ..
make -j8
```
(depending on your machine, you may wish to increase or decrease the `-j8` parameter to change the number of simultaneous threads to make best use of however many cores your build machine has)


## Testing
Once everything has been built, you'll have the following files in the build directory (there'll be plenty of others but these are the important ones):
```
app250.hex
app800.hex
FLASH_ME.uf2
```
Use the bootrom bootloader to install the `FLASH_ME.uf2` image on the device.  The LED should start turning on and off every 250ms and the message
```
Flashing LED every 250 milliseconds
```
will appear on the UART (make sure you have a terminal connected!)

Open the `app800.hex` file in a text editor, select everything and copy it to the clipboard.
Now paste it into the terminal.  It's quite large and depending on your terminal you may have to confirm you wish to paste so much.
The message `Received block` will be shown for every 1k of payload data that is received:
```
Received block
Received block
Received block
Received block
Received block
Received block
Received block
Received block
Received block
Storing new image in flash and then rebooting
Rebooting into flashloader in 1 second
Application just updated!
Flashing LED every 800 milliseconds
```
The 'Application just updated!' message shows the application has recognised that this is the first start after an update.  This is done by the flashloader writing `FLASH_APP_UPDATED` (defined in [`flashloader.h`](flashloader.h)) into the first scratch register.  The application should write a different value to the register once it has finished any processing it might need/want to perform to avoid being retriggered the next time it is started (unless it's via a hard reset in which case the scratch register will automatically be reset).

The final message shows the new application is active.  The LED should now be blinking much slower.


You can repeat the procedure with the `app250.hex` file.

# Using in your own project
It should be fairly straightforward to add the flashloader to your own project using this example as a basis.

The [`CMakeLists.txt`](CMakeLists.txt) file is separated into fairly obvious sections to build the flashloader, the application (twice in this case) and then generate a combined UF2 file for initial bring-up.  The Python [script](uf2tool.py) to combine the UF2 files also performs various checks to try to catch any potential issues at build time.

You can take pretty much everything in this directory and just replace the `app.c` file with your own application file(s) (obviously with the necessary changes to `CMakeLists.txt`).

The [`memmap_default.ld`](memmap_default.ld) linker script from the SDK has been copied here and tweaked slightly to allow the start address in flash and the length of the flashloader/application to be overridden by defining `__FLASH_OFFSET` and `__FLASH_LENGTH`.  If the length is not defined, whatever flash is left will be used.

These values for the flashloader and application are defined in [`memmap_defines.ld`](memmap_defines.ld), which is then included and used by [`memmap_flashloader.ld`](memmap_flashloader.ld) and [`memmap_application.ld`](memmap_application.ld).  Defining the values centrally makes it easy for them to be changed where required.  They can also be referenced in the code if required (see the definition of `sStart` in [`flashloader.c`](flashloader.c))

If you already use your own linker script, I would suggest making the same modifications as made here, but if you're in that position, you probably already know what needs to be done!

How a new application image is transferred to your project is down to you but at a minimum you should make sure you can detect accidental corruption during transmission (e.g. using a CRC).  The other important thing to remember is that only the raw data of the new application (with header) should be passed to the flashloader.  You may wish to turn on generation of binary images during the build process (either directly with `pico_add_bin_output` or indirectly via `pico_add_extra_outputs`).

The `flashImage()` function in [`app.c`](app.c) shows how to set up the header and store the new image in flash before using the watchdog to restart the processor and trigger the flashloader.  In the example, the entire new image is in a large RAM buffer so the flash can be erased and programmed in one go.  If this is not feasible in your project, you will have to erase and program flash in chunks but the overall process will be much the same.

You should decide on a suitable location in flash to store your new image.  This address is passed to the flashloader so does not need to be completely set it stone but make sure it is far enough away from the existing application to allow for growth (i.e. if the existing application is 20k and the new one is 30k, the update image must be stored at least 30k away from the start of the existing application or it would be partially erased before it can be written if the flashloader didn't already check for that scenario!).

# Possible extensions
There are several different ways the flashloader could be extended if required:
* Use two stages - the first stage is absolute minimal code that just tries to start the second and if that fails, starts the application.  This would allow the application to update the flashloader at the cost of a second 4k erase block. (see the [urloader](https://github.com/rhulme/pico-flashloader/tree/urloader) branch)

* Start the watchdog before booting into a new application.  If the application does not stop or service the watchdog after startup, the flashloader would be re-triggered and could try to recover the system.
  * Recovering the system can get complicated very quickly as it means maintaining at least one other copy of the main application (possibly saved somewhere before it was overwritten) or providing the flashloader the means to receive a new image.  It may also be tricky to work out how the new application should decide when everything is OK but that will vary greatly from project to project.

* Support a more compilicated format which allows gaps.  At the moment, the flashloader expects pure binary data and writes it to the area immediately following the flashloader itself.  Gaps are not allowed.  If control is needed over what data is written where, support for a more complicated format will be needed.  This will have an effect on the image size that then has to be transferred to and stored on the device.
