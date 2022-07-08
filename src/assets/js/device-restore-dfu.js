

function getDFUDescriptorProperties(device) {
    // Attempt to read the DFU functional descriptor
    // TODO: read the selected configuration's descriptor
    return device.readConfigurationDescriptor(0).then(
        data => {
            let configDesc = dfu.parseConfigurationDescriptor(data);
            let funcDesc = null;
            let configValue = device.settings.configuration.configurationValue;
            if (configDesc.bConfigurationValue == configValue) {
                for (let desc of configDesc.descriptors) {
                    if (desc.bDescriptorType == 0x21 && desc.hasOwnProperty("bcdDFUVersion")) {
                        funcDesc = desc;
                        break;
                    }
                }
            }

            if (funcDesc) {
                return {
                    WillDetach:            ((funcDesc.bmAttributes & 0x08) != 0),
                    ManifestationTolerant: ((funcDesc.bmAttributes & 0x04) != 0),
                    CanUpload:             ((funcDesc.bmAttributes & 0x02) != 0),
                    CanDnload:             ((funcDesc.bmAttributes & 0x01) != 0),
                    TransferSize:          funcDesc.wTransferSize,
                    DetachTimeOut:         funcDesc.wDetachTimeOut,
                    DFUVersion:            funcDesc.bcdDFUVersion
                };
            } else {
                return {};
            }
        },
        error => {}
    );
}


function hexAddr8(n) {
    let s = n.toString(16)
    while (s.length < 8) {
        s = '0' + s;
    }
    return "0x" + s;
};


async function dfuDeviceRestore(usbDevice, options) {

    const setStatus = function(s) {
        if (options.setStatus) {
            options.setStatus(s);
        }
    }

    // options.ncpUpdate to update NCP, must be separate from a regular update because 
    // only one module can use the OTA update option at a time and a normal device OS
    // update uses that for the bootloader.

    if (!options.setupBit) {
        options.setupBit = 'unchanged';
    }
    if (!options.eventCategory) {
        options.eventCategory = 'Device Restore USB';
    }

    if (options.downloadUrl) {
        setStatus('Downloading user firmware binary...');
        try {
            await new Promise(function(resolve, reject) {
                fetch(options.downloadUrl, {})
                    .then(response => response.arrayBuffer())
                    .then(function(res) {
                        options.userFirmwareBinary = res;
                        resolve();
                    })
                    .catch(function(err) {
                        setStatus();
                        reject();
                    });
            });        
        }
        catch(e) {
            return { 
                ok: false,
                text: 'Unable to retrieve the user firmware binary URL'
            };
        }
    } 

    let moduleInfo;
    let ncpImage;
    let zipFs;
    let userFirmwareBinaryStartAddr;


    if (options.userFirmwareBinary) {
        setStatus('Validating user firmware binary...');

        let dv = new DataView(options.userFirmwareBinary);
            
        const startAddr = dv.getUint32(0, true);
        //console.log('startAddr=0x' + startAddr.toString(16));

        const platformId = dv.getUint16(12, true);
        const platformName = apiHelper.platformIdToName(platformId);
        //console.log('platformId=' + platformId + ' platformName=' + platformName);
        if (usbDevice.platformId != platformId) {
            const text = 'User firmware is for ' + platformName + ' but selected device is ' + apiHelper.platformIdToName(usbDevice.platformId);
            setStatus(text);
            return { ok: false, text };
        }

        const moduleFunction = dv.getUint8(14);
        //console.log('moduleFunction=' + moduleFunction + ' (must be 5)');
        const moduleIndex = dv.getUint8(15);
        //console.log('moduleIndex=' + moduleIndex + ' (must be 1)');

        if (moduleFunction != 5 || (moduleIndex != 1 && moduleIndex != 2)) {
            const text = 'Selected binary file does not appear to contain user firmware'
            setStatus(text);
            return { ok: false, text };
        }


        const systemVersion = dv.getUint16(18, true);
        // console.log('systemVersion=' + systemVersion);
        const systemVersionSemVer = apiHelper.systemVersionToSemVer(systemVersion);

        const restoreSemVer = apiHelper.findRestoreSemVer(platformId, systemVersion);
        // console.log('restoreSemVer=' + restoreSemVer);
        if (!restoreSemVer) {
            const text = 'Selected user binary file targets a Device OS version not supported by Device Restore';
            setStatus(text);
            return { ok: false, text };
        }

        if (systemVersionSemVer != restoreSemVer) {
            // console.log('not an exact system match');
        }
        userFirmwareBinaryStartAddr = startAddr;
        options.version = restoreSemVer;
    }


    ga('send', 'event', options.eventCategory, 'DFU Restore Started', options.version + '/' + options.platformVersionInfo.name);

    if (options.flashBackup) {

    }
    else
    if (!options.ncpUpdate) {
        setStatus('Downloading module info...');

        try {
            await new Promise(function(resolve, reject) {
                fetch('/assets/files/device-restore/' + options.version + '/' + options.platformVersionInfo.name + '.json')
                .then(response => response.json())
                .then(function(res) {
                    moduleInfo = res;
                    resolve();
                });
            });            
        }
        catch(e) {
            return {
                ok: false,
                text: 'Failed to download module info',
                e
            }
        }
    
        setStatus('Downloading restore image...');
    
        const zipUrl = '/assets/files/device-restore/' + options.version + '/' + options.platformVersionInfo.name + '.zip';
    
        zipFs = new zip.fs.FS();
    
        try {
            await zipFs.importHttpContent(zipUrl);
        }
        catch(e) {
            return {
                ok: false,
                text: 'Failed to download restore image',
                e
            }
        }    
    }
    else {
        // is NCP update

        try {
            await new Promise(function(resolve, reject) {
                // When updating this, be sure to update device-setup-usb.js. Search for:
                // TODO: Get this from the NCP binary
                fetch('/assets/files/tracker/tracker-esp32-ncp@0.0.7.bin')
                .then(response => response.arrayBuffer())
                .then(function(res) {
                    ncpImage = res;
                    resolve();
                });
            });            
        }
        catch(e) {
            return {
                ok: false,
                text: 'Failed to download NCP image',
                e
            }
        }
    }

    const productId = usbDevice.productId;
    const deviceId = usbDevice.id;
    

    if (!usbDevice.isInDfuMode) {
        if (options.onEnterDFU) {
            options.onEnterDFU();
        }
        setStatus('Putting device into DFU mode...');
        await usbDevice.enterDfuMode({noReconnectWait:true});

        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 2000);
        });

        // Close connection to the CDC mode device
        await usbDevice.close();
        usbDevice = null;
    }

    let nativeUsbDevice;
    let interface;
    let altInterface;
    let extInterface;

    for(let tries = 1; tries <= 8; tries++) {
        setStatus('Looking for device in DFU mode...');
        const nativeUsbDevices = await navigator.usb.getDevices()
    
        if (nativeUsbDevices.length > 0) {
            for(let dev of nativeUsbDevices) {
                if (dev.serialNumber == deviceId) {
                    nativeUsbDevice = dev;
                    break;
                }
            }
        }
        if (!nativeUsbDevice) {
            setStatus('Authorize access to the DFU device');   
            if (options.onAuthorizeDFU) {
                nativeUsbDevice = await options.onAuthorizeDFU();
            }
            else {
                const filters = [
                    {vendorId: 0x2b04, productId:(productId | 0xd000)}
                ];
                        
                nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })    
            }
        }
    
        if (nativeUsbDevice) {
            const interfaces = dfu.findDeviceDfuInterfaces(nativeUsbDevice);
    
            for(const tempInterface of interfaces) {
                if (tempInterface.alternate.alternateSetting == 0) {
                    interface = tempInterface;
                }
                else
                if (tempInterface.alternate.alternateSetting == 1) {
                    altInterface = tempInterface;
                }
                else
                if (tempInterface.alternate.alternateSetting == 2) {
                    extInterface = tempInterface;
                }
            }
            if (interface && altInterface) {
                break;
            }
        }

        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 3000);
        });
    
    }     

    if (!interface || !altInterface) {
        const text = 'Device did not respond to DFU mode. It may work if you try again or manually enter DFU mode.';
        setStatus(text);
        return {
            ok: false,
            noDfuDeviceFound: true,
            text
        };
    }

    if (options.onStartFlash) {
        options.onStartFlash();
    }

    const createDfuseDevice = async function(interface) {
        const dfuDevice = new dfu.Device(nativeUsbDevice, interface);

        await dfuDevice.open();

        const interfaceNames = await dfuDevice.readInterfaceNames();
        if (interface.name === null) {
            let configIndex = interface.configuration.configurationValue;
            let intfNumber = interface["interface"].interfaceNumber;
            let alt = interface.alternate.alternateSetting;
            interface.name = interfaceNames[configIndex][intfNumber][alt];
        }


        /*
        // Both Gen 2 and Gen 3 devices always have these settings, so we don't need to retrieve them
        // CanDnload: true, CanUpload: true, DFUVersion: 282 (0x11a), DetachTimeOut: 255, ManifestationTolerant: false, TransferSize: 4096, WillDetach: true
        const desc = await getDFUDescriptorProperties(dfuDevice);

        console.log('desc', desc);

        dfuDevice.properties = desc;

        if (desc.DFUVersion != 0x011a || dfuDevice.settings.alternate.interfaceProtocol != 0x02) {
            setStatus('Device missing dfuse protocol');
            return;
        }
        */

        const dfuseDevice = new dfuse.Device(dfuDevice.device_, dfuDevice.settings);
        
        /*
        if (dfuseDevice.memoryInfo) {
            let totalSize = 0;
            for (let segment of dfuseDevice.memoryInfo.segments) {
                totalSize += segment.end - segment.start;
            }
            memorySummary = `Selected memory region: ${dfuseDevice.memoryInfo.name} ${totalSize}`;
            for (let segment of dfuseDevice.memoryInfo.segments) {
                let properties = [];
                if (segment.readable) {
                    properties.push("readable");
                }
                if (segment.erasable) {
                    properties.push("erasable");
                }
                if (segment.writable) {
                    properties.push("writable");
                }
                let propertySummary = properties.join(", ");
                if (!propertySummary) {
                    propertySummary = "inaccessible";
                }

                memorySummary += `\n${hexAddr8(segment.start)}-${hexAddr8(segment.end-1)} (${propertySummary})`;
            }
            console.log('memorySummary', memorySummary);
            console.log('memoryInfo', dfuseDevice.memoryInfo);
        }
        */
        
        

        dfuseDevice.logInfo = function(msg) {
            // console.log(msg); 
        };

        return dfuseDevice;
    }

    const moduleFromModuleInfo = function(mod) {
        let result = Object.assign({}, mod.prefixInfo);

        if (typeof result.moduleStartAddy == 'string') {
            result.moduleStartAddy = parseInt(result.moduleStartAddy, 16);
        }
        if (typeof result.moduleEndAddy == 'string') {
            result.moduleEndAddy = parseInt(result.moduleEndAddy, 16);
        }

        result.valid = true;

        result.validUserBinary = result.valid && result.moduleFunction == 5 && result.moduleIndex == 1;

        return result;        
    };

    const parseModule = function(array, arrayOffset) {
        let result = {};

        const dv = new DataView(array, arrayOffset);

        let offset = 0;

        // offset 0, 4-bytes: module start address
        result.moduleStartAddy = dv.getUint32(offset, true); // 0
        offset += 4;
        
        // offset 4, 4-bytes: module end address
        result.moduleEndAddy = dv.getUint32(offset, true); // 4
        offset += 4;
        
        // reserved (MCU target on Gen 3)
        result.reserved = dv.getUint8(offset);
        offset++;

        // offset 9, 1-byte: module flags (module_info_flags_t)
        result.moduleFlags = dv.getUint8(offset); // 9
        offset++

        // offset 10, 2-bytes: module version (this is not the same as
		// product version, it relates to the module export functions)
        result.moduleVersion = dv.getUint16(offset, true); // 10
        offset += 2;
        
        // offset 12, 2-bytes: Platform ID (6 for Photon)
        result.platformID = dv.getUint16(offset, true);
        offset += 2;

        // offset 14, 1-byte: module function (5 for user firmware)
        result.moduleFunction = dv.getUint8(offset);
        offset++;

        // offset 15, 1-byte: module index (1 for user firmware)
        result.moduleIndex = dv.getUint8(offset);
        offset++;

		// offset 16, 1-byte: dependency module function (usually system, 4)
		result.depModuleFunction = dv.getUint8(offset);
        offset++;

		// offset 17, 1-byte: dependency module index (usually 2, so
		// dependency is system-part2)
		result.depModuleIndex = dv.getUint8(offset);
        offset++;

		// offset 18, 1-byte: minimum version of system dependency
        result.depModuleVersion = dv.getUint16(offset, true);
        offset += 2;

		// offset 20, 1-byte: dependency module function (usually system, 4)
		result.dep2ModuleFunction = dv.getUint8(offset);
        offset++;

		// offset 21, 1-byte: dependency module index (usually 2, so
		// dependency is system-part2)
		result.dep2ModuleIndex = dv.getUint8(offset);
        offset++;

		// offset 22, 2-byte: minimum version of system dependency
		result.dep2ModuleVersion = dv.getUint16(offset, true);
        offset += 2;

        result.prefixSize = arrayOffset;

        const maxModuleFunction = 10; // Currently 8 but just in case
        const maxModuleIndex = 5; // Currently 3

        result.valid = (result.moduleStartAddy < result.moduleEndAddy) &&
            (result.moduleFunction >= 1 && result.moduleFunction <= maxModuleFunction) &&  // This module must be >= 1
            (result.moduleIndex >= 0 && result.moduleIndex <= maxModuleIndex) &&
            (result.depModuleFunction >= 0 && result.depModuleFunction <= maxModuleFunction) && // Dep and Dep2 can be 0 (no dependency)
            (result.depModuleIndex >= 0 && result.depModuleIndex <= maxModuleIndex) &&
            (result.dep2ModuleFunction >= 0 && result.dep2ModuleFunction <= maxModuleFunction) &&
            (result.dep2ModuleIndex >= 0 && result.dep2ModuleIndex <= maxModuleIndex);

        result.validUserBinary = result.valid && result.moduleFunction == 5 && result.moduleIndex == 1;

        return result;
    }

    // Not currently used
    const findModule = function(array) {
        for(let ii = 0; ii < 256; ii += 4) {
            let m = parseModule(array, ii);
            if (m.valid) {
                m.startOffset = ii;
                return m;
            }
        }        
        return null;
    }


    const fixUserBackup = function(array) {
        let prefixHeader;

        if (options.platformVersionInfo.isRTL872x) {
            // P2 is weird because the binary is right aligned in the buffer. Fix that here to move it to the beginning.
            const dv = new DataView(array);

            for(offset = dv.byteLength - 4096; offset >= 0; offset -= 4096) {
                prefixHeader = parseModule(array, offset);
                if (prefixHeader.validUserBinary) {
                    array = array.slice(offset);
                    break;
                }
            }
        }
        else
        if (options.platformVersionInfo.isnRF52) {
            if (array.byteLength == (256 * 1024)) {
                // Check and see if there's a 128K binary half way into a 256K user binary (Gen 3). If so, use that instead (discard first half)
                prefixHeader = parseModule(array, 128 * 1024);
                if (prefixHeader.validUserBinary) {
                    array = array.slice(128 * 1024);
                }
            }    
        }
        
        prefixHeader = parseModule(array, 0);
        if (!prefixHeader.validUserBinary) {
            return null;
        }

        // Trim the binary to be the actual size of the binary from the prefix header
        const fullSize = prefixHeader.moduleEndAddy  - prefixHeader.moduleStartAddy + 4;
        return array.slice(0, fullSize)
    };

    const flashBackup = async function(dfuseDeviceToBackup, backupOptions) {
        dfuseDeviceToBackup.startAddress = backupOptions.startAddress;

        setStatus('Dumping flash memory from the device...');

        try {
            const userBinaryBlob = await dfuseDeviceToBackup.do_upload(4096, backupOptions.maxSize);

            let userBinaryArrayBuffer = await userBinaryBlob.arrayBuffer();
    
            if (backupOptions.saveAs) {
                let blob = new Blob([userBinaryArrayBuffer], {type:'application/octet-stream'});
                saveAs(blob, backupOptions.filename);	    
            }
            else {
                backupOptions.data = userBinaryArrayBuffer;
            }    
        }
        catch(e) {
            console.log('flashBackup exception', e);            
            const text = 'Dump flash failed';
            setStatus(text);
            dfuErrors.push(text);
        }
    }

    const logProgress = function(done, total, func) {
        if (options.progressUpdate && total) {
            let msg;
            if (func == 'erase') {
                msg = 'Erasing ' + genericPartName;
            }
            else {
                msg = 'Programming ' + genericPartName;
            }
            const pct = (total != 0) ? (done * 100 / total) : 0;

            options.progressUpdate(msg, pct, {
                func,
                pct,
                partName
            });
        }
    };

    if (!options.platformVersionInfo.isnRF52) {
        // No setup bit on Gen 2 or P2. Clear the flag so we don't need to check the platform
        // when we check if we need to set the setup bit.
        options.setupBit = 'unchanged';
    }

    if (options.progressShowHide) {
        options.progressShowHide(true);
    }

    let dfuErrors = [];
    let extPart;
    let extPartName;
    let partName;
    let genericPartName;
    let setOTAFlag = false;

    // options.deviceModuleInfo is the decoded module info control request data if 
    // available. If the device was already in DFU mode this will not be available,
    // and also if the version of Device OS on the device was old it will be missing.
    // If present, it can be used to skip programming some modules.

    // options.platformVersionInfo contains the deviceInfo.platformVersionInfo
    // This is the result from apiHelper.getRestoreVersions(), which contains the
    // information from deviceRestore.json for this platform:
    // name, title, id (platform), gen, mcu, wifi, cellular    
    // Plus:
    // versionArray - the versions for for this platform from deviceRestore.json versionsZipByPlatform
    // isTracker, isRTL872x, isnRF52, isSTM32F2xx


    if (!options.flashBackup || options.flashBackup.type == 'main') {
        const dfuseDevice = await createDfuseDevice(interface);

        const allDfuPartsWithBinaries = [
            { name: 'system-part1', title: 'Device OS System Part 1' },
            { name: 'system-part2', title: 'Device OS System Part 2' },
            { name: 'system-part3', title: 'Device OS System Part 3' },
            { name: 'softdevice', title: 'nRF52 Soft Device' },
            { name: 'tinker', reset:true, title: 'User Firmware' },
            { name: 'tracker-edge', reset:true, title: 'Tracker Edge Firmware' },
            { name: 'bootloader', title: 'Device OS Bootloader' },
        ];
        // Note that other parts that don't necessarily have binaries are added below
        let dfuParts = [];
    
        const getPartBinary = async function(partName) {
            const zipEntry = zipFs ? zipFs.find(partName + '.bin') : null;
            if (!zipEntry) {
                return null;
            }    

            let part = await zipEntry.getUint8Array();

            if ((moduleInfo[partName].prefixInfo.moduleFlags & 0x01) != 0) { // ModuleInfo.Flags.DROP_MODULE_INFO
                part = part.slice(24); // MODULE_PREFIX_SIZE
            }

            return part;
        };

        if (options.flashBackup) {
            dfuParts.push({ name: 'flash-backup', title: 'Flash backup' });
        }
        else {
            if (options.userBackup) {
                dfuParts.push({ name: 'user-backup', title: 'User firmware backup' });
            }
        
            if (!options.ncpUpdate) {
                for(const dfuPart of allDfuPartsWithBinaries) {
                    let obj = Object.assign({}, dfuPart);

                    obj.binary = await getPartBinary(dfuPart.name);
                    if (obj.binary) {
                        // 
                        obj.moduleInfo = moduleFromModuleInfo(moduleInfo[obj.name]);
                        obj.startAddress = parseInt(moduleInfo[dfuPart.name].prefixInfo.moduleStartAddy, 16);

                        dfuParts.push(obj);
                    }
                    
                }
            }
            else {
                dfuParts.push({ name: 'ncp', title: 'Network Coprocessor' });
            }    
        }
        if (options.progressDfuParts) {
            options.progressDfuParts(dfuParts);
        }
        
        // Skip parts that are up-to-date 
        for(let ii = 0; ii < dfuParts.length; ii++) {
            let obj = dfuParts[ii];


            if (options.deviceModuleInfo && obj.moduleInfo) {
                // Modules on device were passed in and we were 
                // TODO: Need to convert obj.moduleInfo value, which is the Device OS value, into the protobuf value!
                const protobufModuleType = options.deviceModuleInfo.moduleTypeSystemToProtobuf(obj.moduleInfo.moduleFunction);

                const m = options.deviceModuleInfo.getByModuleTypeIndex(protobufModuleType, obj.moduleInfo.moduleIndex);

                // Don't do version check on user firmware (moduleFunction = 5)
                if (obj.moduleInfo.moduleFunction != 5 && m.version == obj.moduleInfo.moduleVersion) {
                    // Same version, skip
                    options.progressUpdate('Up to date', 0, {
                        partName: obj.name,
                        skipSameVersion: true
                    });

                    dfuParts.splice(ii, 1);
                    ii--; // Is incremented in for loop
                }
            }
        }

        // If the bootloader is still in the list, we need use the OTA trick (except on the P2)
        for(let ii = 0; ii < dfuParts.length; ii++) {
            let obj = dfuParts[ii];

            if (obj.name == 'bootloader' && !options.platformVersionInfo.isRTL872x) {
                // Bootloader requires OTA trick except on P2
                setOTAFlag = true;
            }
        }

        // 
        dfuseDevice.logProgress = logProgress;
        


        const padPartToSector = function(part) {
            if ((part.length % 4096) != 0) {
                const padLength = 4096 - (part.length % 4096);

                let newPart = new Uint8Array(part.length + padLength);
                newPart.set(part);
                newPart.fill(0xff, part.length);

                return newPart;
            }
            else {
                return part;
            }
        };

        for(const dfuPart of dfuParts) {
            partName = dfuPart.name;
    
            let part;
    
            if (partName == 'user-backup' || partName == 'flash-backup') {
            }
            else
            if (partName != 'ncp') {
                part = dfuPart.binary;
                dfuseDevice.startAddress = dfuPart.startAddress;
            }
            else {
                extPartName = 'ncp';
                part = ncpImage;
            }
    
            if (options.userFirmwareBinary && (partName == 'tinker' || partName == 'tracker-edge')) {
                genericPartName = 'custom user firmware';     
                // If a custom binary, use the address in the module because on the P2 it's different depending on the size of the module
                dfuseDevice.startAddress = userFirmwareBinaryStartAddr;
            } else {
                genericPartName = partName;
            }
    
            setStatus('Updating ' + genericPartName + '...');
    
    
            try {
                if (partName == 'flash-backup') {
                    if (options.flashBackup.type == 'main') {
                        await flashBackup(dfuseDevice, options.flashBackup);
                    }
                }
                else
                if (partName == 'user-backup') {
                    let maxSize = 128 * 1024;

                    if (options.platformVersionInfo.isRTL872x) {
                        maxSize = 2 * 1024 * 1024;
                        dfuseDevice.startAddress = 0x08600000 - maxSize;
                    }
                    else {
                        if (moduleInfo['tinker']) {
                            dfuseDevice.startAddress = parseInt(moduleInfo['tinker'].prefixInfo.moduleStartAddy, 16);
                        }
                        else
                        if (moduleInfo['tracker-edge']) {
                            dfuseDevice.startAddress = parseInt(moduleInfo['tracker-edge'].prefixInfo.moduleStartAddy, 16);
                        }
    
                        if (options.platformVersionInfo.isnRF52) {
                            // Gen 3
                            maxSize = 256 * 1024;
                            dfuseDevice.startAddress = 0xb4000;
                        }
                        else {
                            dfuseDevice.startAddress = parseInt(moduleInfo['tinker'].prefixInfo.moduleStartAddy, 16);
                        }    
                    }

                    const userBinaryBlob = await dfuseDevice.do_upload(4096, maxSize);
    
                    let userBinaryArrayBuffer = await userBinaryBlob.arrayBuffer();
    
                    userBinaryArrayBuffer = fixUserBackup(userBinaryArrayBuffer);
    
                    if (userBinaryArrayBuffer) {
                        let blob = new Blob([userBinaryArrayBuffer], {type:'application/octet-stream'});
                        saveAs(blob, 'firmware_' + deviceId + '.bin');	
                    }
                }
                else
                if (partName == 'ncp') {
                    extPart = part;
                }
                else
                if (partName == 'bootloader') {
                    // Flash to OTA region instead of actual location
                    if (options.platformVersionInfo.isRTL872x) {
                        // P2 appends the bootloader to the system part s
                    }
                    else
                    if (options.platformVersionInfo.isnRF52) {
                        // Gen 3
                        extPart = part;
                        extPartName = 'bootloader';
                    }
                    else {
                        // Gen 2
                        dfuseDevice.startAddress = 0x80C0000;
                        await dfuseDevice.do_download(4096, part, {});
                    }
                }
                else
                if (partName == 'tinker' || partName == 'tracker-edge') {
                    if (dfuseDevice.startAddress == 0xb4000) {
                        // Gen 3 256K binary. Erase the 128K binary slot in case the new binary is < 128K
                        // the 128K binary will still be there and have precedence, ignoring the new binary.
                        const savedStart = dfuseDevice.startAddress;
    
                        dfuseDevice.startAddress = 0xd4000;
                        let emptyArray = new Uint8Array(1024);
                        emptyArray.fill(0xff);
                        await dfuseDevice.do_download(4096, emptyArray, {});
    
                        dfuseDevice.startAddress = savedStart;
                    }
    
                    let dfuOptions = {};

                    if (!setOTAFlag && options.setupBit == 'unchanged') {
                        // If not setting the OTA flag or setup done, do manifestation on the user binary
                        dfuOptions.doManifestation = true;
                    }

                    if (options.userFirmwareBinary) {
                        await dfuseDevice.do_download(4096, options.userFirmwareBinary, dfuOptions);
                    }
                    else {
                        await dfuseDevice.do_download(4096, part, dfuOptions);
                    }
                }
                else
                if (partName == 'system-part1' && options.platformVersionInfo.isRTL872x) {
                    // System part is special on RTL872x because the OTA sector is appended

                    const bootloaderPart = await getPartBinary('bootloader');
                    if (bootloaderPart) {
                        // Pad system-part1 out to a 4K sector alignment
                        part = padPartToSector(part);

                        let newPart = new Uint8Array(part.length + bootloaderPart.length);
                        newPart.set(part);
                        newPart.set(bootloaderPart, part.length);
                        part = newPart;                                                
                        setOTAFlag = true;
                    }

                    // This does not currently work
                    /*
                    const bootloaderPart = await getPartBinary('bootloader');
                    const preBootloaderPart = await getPartBinary('prebootloader-part1');

                    if (bootloaderPart && preBootloaderPart) {
                        // Set the combined flag on the prebootloader part
                        // offset 9, 1-byte: module flags (module_info_flags_t)
                        // It must be first because the bootloader does not have a module header
                        console.log('module flags ' + preBootloaderPart[9]);
                        preBootloaderPart[9] |= 0x4; // MODULE_INFO_FLAG_COMBINED

                        let newPart = new Uint8Array(part.length + preBootloaderPart.length + bootloaderPart.length);
                        newPart.set(part);
                        newPart.set(preBootloaderPart, part.length);
                        newPart.set(bootloaderPart, part.length + preBootloaderPart.length);
                        part = newPart;                                                
                    }
                    */

                    await dfuseDevice.do_download(4096, part, {});

                }
                else {
                    await dfuseDevice.do_download(4096, part, {});
                }
                setStatus('Downloading ' + genericPartName + ' complete!');
            }
            catch(e) {
                console.log('exception downloading', e);
                const text = 'Downloading ' + genericPartName + ' failed';
                setStatus(text);
                dfuErrors.push(text);      
            }
    
        }
        
        await dfuseDevice.close();
    }

    if (options.flashBackup) {
        if (options.flashBackup.type == 'ext') {
            const dfuseExtDevice =  await createDfuseDevice(extInterface);

            dfuseExtDevice.logProgress = logProgress;

            await flashBackup(dfuseExtDevice, options.flashBackup);

            await dfuseExtDevice.close();
        }
    }
    else {
        if (options.platformVersionInfo.isnRF52 && extInterface && extPart) {
            partName = genericPartName = extPartName;

            setStatus('Updating ' + partName + '...');

            // Gen 3
            const dfuseExtDevice =  await createDfuseDevice(extInterface);

            dfuseExtDevice.logProgress = logProgress;

            if (!options.platformVersionInfo.isTracker) {
                // Other Gen 3 (4 MB flash)
                dfuseExtDevice.startAddress = 0x80289000;
            }
            else {
                // Tracker (8 MB flash)
                dfuseExtDevice.startAddress = 0x80689000;
            }

            await dfuseExtDevice.do_download(4096, extPart, {});

            await dfuseExtDevice.close();
        }
    }

    if (options.flashBackup) {
        if (options.flashBackup.type == 'dct') {
        
            const dfuseAltDevice = await createDfuseDevice(altInterface);
            
            dfuseAltDevice.logProgress = logProgress;

            await flashBackup(dfuseAltDevice, options.flashBackup);
            
            await dfuseAltDevice.close();
        }
    }
    else {

        const dfuseAltDevice = await createDfuseDevice(altInterface);
        
        dfuseAltDevice.logProgress = logProgress;

        if (options.platformVersionInfo.isnRF52 && options.setupBit != 'unchanged') {
            // setup done on gen3
            partName = genericPartName = 'setup done';
       
            dfuseAltDevice.startAddress = 0x1fc6;
        
            let flag = new Uint8Array(1);
            flag[0] = (options.setupBit == 'done') ? 0x01 : 0xff;
              
            try {
                let dfuOptions = {
                    doManifestation:false, 
                    noErase:true
                };

                if (!setOTAFlag) {
                    dfuOptions.doManifestation = true;
                }

                await dfuseAltDevice.do_download(4096, flag, dfuOptions);                    
            }
            catch(e) {
                const text = 'Error setting setup done flag';
                setStatus(text);
                dfuErrors.push(text);
            }

        }
        if (setOTAFlag) {
            // Write 0xA5 to offset 1753 in alt 1 (DCT) 
            partName = genericPartName = 'ota flag';

            dfuseAltDevice.startAddress = 1753;
            
            let flag = new Uint8Array(1);
            flag[0] = 0xA5;
              
            try {
                await dfuseAltDevice.do_download(4096, flag, {doManifestation:true, noErase:true});                    
    
                setStatus('Resetting device...');
            }
            catch(e) {
                const text = 'Error setting device flags, manually reset device';
                setStatus(text);
                dfuErrors.push(text);
            }        
        }

        await dfuseAltDevice.close();
    }
    
    if (options.progressShowHide) {
        options.progressShowHide(false);
    }

    if (usbDevice) {
        await usbDevice.close();
        usbDevice = null;
    }

    if (dfuErrors.length) {
        ga('send', 'event', options.eventCategory, 'DFU Flashing Error');

        return {
            ok: false,
            dfuFlashingError: true,
            text: 'DFU flashing error',
            dfuErrors
        }
    }

    ga('send', 'event', options.eventCategory, 'DFU Restore Success', options.version + '/' + options.platformVersionInfo.name);

    return {
        ok: true,
        text: 'Success!'
    }
}

