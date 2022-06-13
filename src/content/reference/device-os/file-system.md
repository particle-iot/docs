---
title: File system
layout: commonTwo.hbs
columns: two
---

# {{title}}

Gen 3 devices, including the Boron, Argon, B Series SoM, Tracker SoM, and Tracker One all include a flash memory file system available for user use.

| Device | Size |
| :--- | ---: |
| Boron | 2 MB |
| Argon | 2 MB |
| B Series SoM | 2 MB |
| Tracker SoM | 4 MB |
| Tracker One | 4 MB |

It's accessible from user firmware using the [POSIX file system API](/reference/device-os/api/file-system/file-system/).

## Quick Facts

The file system is based on the open-source [LittleFS](https://github.com/littlefs-project/littlefs) project. From their GitHub, the features include:

- Power-loss resilience - LittleFS is designed to handle random power failures. All file operations have strong copy-on-write guarantees and if power is lost the filesystem will fall back to the last known good state.
- Dynamic wear leveling - LittleFS is designed with flash in mind, and provides wear leveling over dynamic blocks. Additionally, LittleFS can detect bad blocks and work around them.

On most devices, the flash memory is MX25L1606 4 MB QSPI NOR flash. It's the 8 MB version on the Tracker SoM. Only half of the flash memory is devoted to the file system, the rest is reserved for other purposes including holding the temporary data during over-the-air (OTA) updates. The reserved space is not available to user applications.

The flash memory is connected by QSPI (quad-speed SPI) to the nRF52840 MCU. It is accessible from DFU mode (blinking yellow) over USB using alternate bank 2. It is not accessible by SWD/JTAG.

The flash memory uses 4K (4096 byte) sectors. For a 2 MB file system, this is 512 sectors.

Each file requires a minimum of 2 sectors, one for file metadata, and another for the actual file data, which will grow with the file size. Thus you'll be limited to at most around 200 files on the file system, even if your files are very small.

It's best to not fill the entire file system. It uses a copy-on-write (COW) algorithm, which becomes significantly less efficient when full. For best results, you should not use more than 80% of the file system.

Because the file system supports wear leveling, you will not generally need to be overly concerned with wearing out the flash memory. Note, however, that wear leveling occurs only on free sectors on writes. If you have a large amount of unchanging data that mostly fills the flash memory, then frequently write a small amount of data, you can wear out the flash. The reason is that the wear will occur only on the frequently changing sectors, not on the data that does not ever change.

NOR flash has a unique property: Any 1 bit can be turned into a 0 bit. However, in order to turn a 0 bit back into a 1 bit, the entire sector needs to be erased. Only the erasing of the sectors affects wear, and it's also a relatively slow operation.

This necessarily means that in order to modify a sector of a file where a 0 bit needs to be changed to a 1 bit anywhere in the sector, the entire sector must be copied to a new sector and the old sector is erased. LittleFS does this automatically for you. Likewise, if a modification can be made without copying (because it only changed 1 bits to 0 bits), it's done in place without copying.

Device OS uses a small amount of the file system space for its own use. This includes configuration data and the emulated EEPROM, which is really just a 4K file on the file system. The Tracker uses more of the flash as it also stores the cloud configuration data, but the flash is also twice the size.

The DCT (alt bank 1) is also a file on the flash file system. This includes device keys.

It is not possible to use the LittleFS implementation on your own external SPI flash device.

While the file system not built into Device OS on Gen 2 devices, there is a [3rd-party library](https://github.com/rickkas7/LittleFS-RK) that provides these same POSIX API as on Gen 3 on Gen 2 devices with an external SPI NOR flash chip.

## Erasing the QSPI flash

Under normal circumstances you should never need to erase the QSPI flash. If you've somehow managed to corrupt it and the device will not boot Device OS, but can boot into DFU mode (blinking yellow), you can erase it with the following instructions.

The file system will be recreated if the flash is empty. This should only be done in extreme cases because:

- Emulated EEPROM will be erased
- DCT values will be set to default values
- Some configuration data, such as antenna selection and setup-done will be reset
- Device keys will be reset
- All files on the file system will be deleted

Because the device keys are reset, you will need to use `particle keys doctor` in order to synchronize your device keys with the cloud after erasing the flash. 

- Download the [FOUR_MB_BLANK.bin](/assets/files/FOUR_MB_BLANK.bin) file, which is an image of the blank flash.

- Connect the device by USB to your computer.

- Put the device in DFU mode (blinking yellow) by holding down the MODE button and tapping reset. Continue to hold down the MODE button while the status LED blinks magenta (red and blue at the same time) until it blinks yellow, then release.

- Execute the appropriate command for your device:

```
cd Downloads
dfu-util -d 2b04:d00c -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin
```

Replace `2b04:d00c` with the value for your device type. Note that the B4 and B5 SoM devices have different IDs.

| Name | Device | 
| :--- | :--- |
| Argon | 2b04:d00c | 
| Boron | 2b04:d00d | 
| B Series SoM (B4xx) | 2b04:d017 | 
| B Series SoM (B5xx) | 2b04:d019 | 
| Tracker SoM | 2b04:d01a | 

```
# Argon
dfu-util -d 2b04:d00c -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin

# Boron
dfu-util -d 2b04:d00d -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin

# B Series SoM (B4xx)
dfu-util -d 2b04:d017 -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin

# B Series SoM (B5xx)
dfu-util -d 2b04:d019 -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin

# Tracker SoM
dfu-util -d 2b04:d01a -a 2 -s 0x80000000:0x200000 -D FOUR_MB_BLANK.bin
```

On the Tracker SoM/Tracker One this will only erase the file system part, not the whole flash as on other devices.
