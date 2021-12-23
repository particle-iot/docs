

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
                fetch(options.downloadUrl)
                    .then(response => response.arrayBuffer())
                    .then(function(res) {
                        options.userFirmwareBinary = res;
                        resolve();
                    })
                    .catch(function(err) {
                        console.log('error', err);
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
        options.version = restoreSemVer;
    }

    let moduleInfo;
    let ncpImage;
    let zipFs;

    ga('send', 'event', options.eventCategory, 'DFU Restore Started', options.version + '/' + options.platformVersionInfo.name);

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
        };

        return dfuseDevice;
    }

    const dfuseDevice = await createDfuseDevice(interface);

    const allDfuParts = [
        { name: 'system-part1', title: 'Device OS System Part 1' },
        { name: 'system-part2', title: 'Device OS System Part 2' },
        { name: 'system-part3', title: 'Device OS System Part 3' },
        { name: 'bootloader', title: 'Device OS Bootloader' },
        { name: 'softdevice', title: 'nRF52 Soft Device' },
        { name: 'tinker', reset:true, title: 'User Firmware' },
        { name: 'tracker-edge', reset:true, title: 'Tracker Edge Firmware' }
    ];
    let dfuParts = [];

    if (!options.ncpUpdate) {
        for(const dfuPart of allDfuParts) {
            const zipEntry = zipFs.find(dfuPart.name + '.bin');
            if (zipEntry) {
                dfuParts.push(dfuPart);
            }
        }
    }
    else {
        dfuParts.push({ name: 'ncp', title: 'Network Coprocessor' });
    }
    if (options.progressDfuParts) {
        options.progressDfuParts(dfuParts);
    }
        
    let partName;
    let genericPartName;
    let extPart;
    let extPartName;

    const logProgress = function(done, total, func) {
        if (options.progressUpdate) {
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

    // 
    dfuseDevice.logProgress = logProgress;


    if (options.progressShowHide) {
        options.progressShowHide(true);
    }

    let dfuErrors = [];

    for(const dfuPart of dfuParts) {
        partName = dfuPart.name;

        let zipEntry;
        let part;

        if (partName != 'ncp') {
            zipEntry = zipFs ? zipFs.find(partName + '.bin') : null;
            if (!zipEntry) {
                continue;
            }    

            part = await zipEntry.getUint8Array();

            dfuseDevice.startAddress = parseInt(moduleInfo[partName].prefixInfo.moduleStartAddy, 16);

            if ((moduleInfo[partName].prefixInfo.moduleFlags & 0x01) != 0) { // ModuleInfo.Flags.DROP_MODULE_INFO
                part = part.slice(24); // MODULE_PREFIX_SIZE
            }

        }
        else {
            extPartName = 'ncp';
            part = ncpImage;
        }

        if (options.userFirmwareBinary && (partName == 'tinker' || partName == 'tracker-edge')) {
            genericPartName = 'custom user firmware';     
        } else {
            genericPartName = partName;
        }

        setStatus('Updating ' + genericPartName + '...');


        try {
            if (partName == 'ncp') {
                extPart = part;
            }
            else
            if (partName == 'bootloader') {
                // Flash to OTA region instead of actual location

                if (extInterface) {
                    // Gen 3
                    extPart = part;
                    extPartName = 'bootloader';
                }
                else {
                    // Gen 2
                    dfuseDevice.startAddress = 0x80C0000;
                    await dfuseDevice.do_download(4096, part, {});
                }
                if (options.progressUpdate) {
                    options.progressUpdate('', 100, {
                        func: 'program',
                        pct: 100,
                        partName
                    });
                }
            }
            else
            if (options.userFirmwareBinary && (partName == 'tinker' || partName == 'tracker-edge')) {
                if (dfuseDevice.startAddress == 0xb4000 && options.userFirmwareBinary.byteLength < (129 * 1024)) {
                    // Gen 3 256K binary. Erase the 128K binary slot because the new binary is < 128K
                    // the 128K binary will still be there and have precedence, ignoring the new binary.
                    const savedStart = dfuseDevice.startAddress;

                    dfuseDevice.startAddress = 0xd4000;
                    let emptyArray = new Uint8Array(1024);
                    emptyArray.fill(0xff);
                    await dfuseDevice.do_download(4096, emptyArray, {});

                    dfuseDevice.startAddress = savedStart;
                }

                await dfuseDevice.do_download(4096, options.userFirmwareBinary, {});
            }
            else {
                await dfuseDevice.do_download(4096, part, {});
            }
            setStatus('Downloading ' + genericPartName + ' complete!');
        }
        catch(e) {
            const text = 'Downloading ' + genericPartName + ' failed';
            setStatus(text);
            dfuErrors.push(text);      
        }

    }
    

    await dfuseDevice.close();


    {
        if (extInterface && extPart) {
            partName = genericPartName = extPartName;

            setStatus('Updating ' + partName + '...');

            // Gen 3
            const dfuseExtDevice =  await createDfuseDevice(extInterface);

            dfuseExtDevice.logProgress = logProgress;

            if (options.platformVersionInfo.id != 26) {
                dfuseExtDevice.startAddress = 0x80289000;
            }
            else {
                // Tracker
                dfuseExtDevice.startAddress = 0x80689000;
            }

            await dfuseExtDevice.do_download(4096, extPart, {});

            await dfuseExtDevice.close();
        }
    }

    // Write 0xA5 to offset 1753 in alt 1 (DCT) 
    {

        const dfuseAltDevice = await createDfuseDevice(altInterface);
        
        dfuseAltDevice.logProgress = logProgress;


        if (extInterface && options.setupBit != 'unchanged') {
            // setup done on gen3
            partName = genericPartName = 'setup done';
       
            dfuseAltDevice.startAddress = 0x1fc6;
        
            let flag = new Uint8Array(1);
            flag[0] = (options.setupBit == 'done') ? 0x01 : 0xff;
              
            try {
                await dfuseAltDevice.do_download(4096, flag, {doManifestation:false, noErase:true});                    
            }
            catch(e) {
                const text = 'Error setting setup flag';
                setStatus(text);
                dfuErrors.push(text);
            }

        }

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

        if (options.progressShowHide) {
            options.progressShowHide(false);
        }
    
        await dfuseAltDevice.close();
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

