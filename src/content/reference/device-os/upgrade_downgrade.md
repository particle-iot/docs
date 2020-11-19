


## Upgrading 


#### Using OTA or  Serial (YModem) on Electron

Updating in the proper sequence is essential as you cannot update directly from 
very old versions of Device OS to 2.0.0
>
> 1. First Update to 0.5.5 (if the current version is less than that)
> 2. Then update to 0.6.4 (if the current version is less than that)
> 3. Then update to 0.7.0 (if the current version is less than that)
> 4. Then update to 1.2.1 (if the current version is less than that)
> 5. Then update to 2.0.0
>

Use `particle flash --serial` for locally connected devices.

#### Using DFU over USB on Electron/Photon/P1

These software components may be updated in any order:

- You may update Device OS to 2.0.0 directly first, flash the system firmware parts in order 1,2(,3) to the device using 
	`particle flash --usb <system-part.bin>`. See the notes below about the bootloader if you are offline!


>**Note:** P1/Photon Bootloader
> The Cloud will automatically update the bootloader on P1/Photon devices if your device is online. 
If your device does not connect to the cloud and it is offline, you should flash the bootloader to the device using `particle flash --serial <bootloader.bin>`. 
This should be done *after* upgrading system firmware.  The Electron bootloader is applied automatically from it's own system parts.
>
>**Note:** Argon/Boron/B SoM/B5 SoM
> If your device is offline, the bootloader must be manually updated using `particle flash --serial <bootloader.bin>`. This can be done *before* or *after* upgrading system firmware.
>



### Updating SoftDevice and Bootloader

#### Via OTA

1. Upgrade Device OS to 2.0.0
2. Manually flash 2.0.0 bootloader: `particle flash <deviceId> boron-bootloader@2.0.0.bin`
3. Flash SoftDevice: `particle flash <deviceId> boron-softdevice@2.0.0.bin`

#### Using Serial (YModem)

1. Upgrade Device OS to 2.0.0
2. Put the device into listening mode (blinking blue) by holding MODE button
3. Manually flash 2.0.0 bootloader: `particle flash --serial boron-bootloader@2.0.0.bin`
4. Flash SoftDevice: `particle flash --serial boron-softdevice@2.0.0.bin`

#### Using DFU

This only works for SoftDevice, not for bootloader:

1. Upgrade Device OS to 2.0.0
2. Update the bootloader to 2.0.0 with the OTA or Serial (YModem) process above
3. Put the device into DFU mode (blinking yellow) 
4. Flash the SoftDevice: `particle flash --usb boron-softdevice@2.0.0.bin`



## Downgrading

The downgrade process is generally the reverse of the corresponding process.

###  Electron/Photon/P1 
You may downgrade via OTA or using `particle flash --serial <xxx>` (YModem transfer).
You may downgrade directly from 2.0.0 to 1.5.x. 
Donwgrading to progressively older versions require downgrading in a series of steps: you cannot downgrade
directly from 2.0.0 to 0.6.4, for example. The downgrade sequence supported is:

- From 1.5.x - 2.0.x to 1.2.1 
- to 0.7.0
- to 0.6.4
- to 0.5.5


### LTE Boron and BSoM:
If you need to downgrade, you must downgrade to 1.5.2 first. and let the device attempt a cellular network registration.





