

$(document).ready(function () {
    // auth not required

    const noWebUsbError = 'Your web browser does not support WebUSB and cannot access Particle devices using USB.<br/>' +
        'One alternative is to use the <a href="/tutorials/developer-tools/cli/">Particle CLI</a>.';

    let deviceRestoreInfo;

    if ($('.apiHelperUsbRestoreDevice').each(function() {
        const thisPartial = $(this);

        const selectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelect');
        const versionElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion');
        const restoreElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceRestore');

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbRestoreDeviceStatus').html(str);
        }

        if (!navigator.usb) {
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        let usbDevice;
        let platformObj;

        if ($(selectElem).on('click', async function () {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
            try {
                $(selectElem).prop('disabled', false);
                $(versionElem).prop('disabled', true);
                $(restoreElem).prop('disabled', true);
        
                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
                console.log('nativeUsbDevice', nativeUsbDevice);
        
                usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});
                console.log('usbDevice', usbDevice);
        
                // Find available versions for this device
                let versionArray;

                for(let tempPlatformObj of deviceRestoreInfo.platforms) {
                    if (tempPlatformObj.id == usbDevice.platformId) {
                        if (deviceRestoreInfo.versionsZipByPlatform[tempPlatformObj.name]) {
                            versionArray = deviceRestoreInfo.versionsZipByPlatform[tempPlatformObj.name];
                            platformObj = tempPlatformObj;
                            break;
                        }
                    }
                }
                
                if (!versionArray) {
                    setStatus('No device restore images found for this device');
                    return;
                }
                $(versionElem).html('');
                for(let ver of versionArray) {
                    versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                }
                
                $(versionElem).prop('disabled', false);
                $(restoreElem).prop('disabled', false);
        
            }
            catch(e) {
                console.log('no device selected', e);
            }        
        }));

        const getDFUDescriptorProperties = function(device) {
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


        const hexAddr8 = function(n) {
            let s = n.toString(16)
            while (s.length < 8) {
                s = '0' + s;
            }
            return "0x" + s;
        };


        if ($(restoreElem).on('click', async function () {
            const version = $(versionElem).val();

            let moduleInfo;

            setStatus('Downloading module info...');

            await new Promise(function(resolve, reject) {
                fetch('/assets/files/device-restore/' + version + '/' + platformObj.name + '.json')
                .then(response => response.json())
                .then(function(res) {
                    moduleInfo = res;
                    console.log('moduleInfo', moduleInfo);
                    resolve();
                });
            });

            setStatus('Downloading restore image...');

            const zipUrl = '/assets/files/device-restore/' + version + '/' + platformObj.name + '.zip';

            const zipFs = new zip.fs.FS();

            await zipFs.importHttpContent(zipUrl);
        
            console.log('zipFs', zipFs);

            // const productId = usbDevice.productId;
            const deviceId = usbDevice.id;
            
            if (!usbDevice.isInDfuMode) {
                setStatus('Putting device into DFU mode...');
                await usbDevice.enterDfuMode({noReconnectWait:true});

                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve();
                    }, 2000);
                });
            }

            const nativeUsbDevices = await navigator.usb.getDevices()
            console.log('nativeUsbDevice', nativeUsbDevices);

            let nativeUsbDevice;
            if (nativeUsbDevices.length > 0) {
                for(let dev of nativeUsbDevices) {
                    if (dev.serialNumber == deviceId) {
                        nativeUsbDevice = dev;
                        break;
                    }
                }
            }
            if (!nativeUsbDevice) {
                setStatus('Unable to find device in DFU mode...');
                // TODO: If the browser has never paired with the device in DFU mode,
                // I think we need to prompt for that here
                return;
            }

            const interfaces = dfu.findDeviceDfuInterfaces(nativeUsbDevice);
            if (interfaces.length == 0 || interfaces[0].alternate.alternateSetting != 0) {
                setStatus('Device did not respond with a valid DFU configuration...');
                return;
            }
            const interface = interfaces[0];
            

            const dfuDevice = new dfu.Device(nativeUsbDevice, interface);

            await dfuDevice.open();

            const interfaceNames = await dfuDevice.readInterfaceNames();
            console.log('interfaceNames', interfaceNames);
            if (interface.name === null) {
                let configIndex = interface.configuration.configurationValue;
                let intfNumber = interface["interface"].interfaceNumber;
                let alt = interface.alternate.alternateSetting;
                interface.name = interfaceNames[configIndex][intfNumber][alt];
            }

            console.log('interface', interface);

            // Both Gen 2 and Gen 3 devices always have these settings, so we don't need to retrieve them
            // CanDnload: true, CanUpload: true, DFUVersion: 282 (0x11a), DetachTimeOut: 255, ManifestationTolerant: false, TransferSize: 4096, WillDetach: true
            const desc = await getDFUDescriptorProperties(dfuDevice);

            console.log('desc', desc);

            dfuDevice.properties = desc;

            if (desc.DFUVersion != 0x011a || dfuDevice.settings.alternate.interfaceProtocol != 0x02) {
                setStatus('Device missing dfuse protocol');
                return;
            }

            const dfuseDevice = new dfuse.Device(dfuDevice.device_, dfuDevice.settings);
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
            console.log('dfuseDevice', dfuseDevice);

            // 

            // System parts
            
            for(let ii = 1; ii <= 3; ii++) {
                const zipEntry = zipFs.find('system-part' + ii + '.bin');
                if (!zipEntry) {
                    break;
                }
                console.log('found system part ' + ii);

                setStatus('Updating System Part ' + ii + '...');

                const part = await zipEntry.getUint8Array();

                try {
                    await dfuseDevice.do_download(4096, part, false);
                }
                catch(e) {
                    console.log('download failed', e);
                }

                // await usbDevice.updateFirmware(part, {});

                console.log('complete!');
            }
            
            
            // softdevice

            // user firmware

            // bootloader - requires listening mode

            /*
            const hexTextResp = await fetch(hexUrl);
            const hexText = await hexTextResp.text();
    
            setStatus('Processing restore image...');

            let baseAddr = 0;
        
            let fullMemoryMap = new Uint8Array(1024 * 1024);

            hexText.split(/[\r\n]/).forEach(function(lineData) {        
                lineData = lineData.trim();
                if (lineData.length == 0) {
                    return;
                }
                if (lineData.charAt(0) != ':') {
                    return;
                }
        
                const buf = new Uint8Array(lineData.substr(1).match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
               
                const len = buf[0]; 
                const addr = (buf[1] << 8) | buf[2]; // Big Endian 16-bit
                const recType = buf[3];
                // data begins at 4
                // checksum is last byte
                const checksum = buf[4 + len];
                
                const calcChecksum = calculateBufferChecksum(buf);
        
                if (calcChecksum == checksum) {
                    if (recType == 4 && len == 2) {
                        // Extended linear address
                        baseAddr = (buf[4] << 8) | buf[5]; // Big Endian 16-bit
                        baseAddr <<= 16;
                        // console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
                    }

                    // STM32 devices have 0x8000000 as the address of flash, and we want to ignore that
                    baseAddr &= 0x07ffffff; 

                    if (baseAddr < fullMemoryMap.byteLength) {
                        for(let ii = 0; ii < len; ii++) {
                            fullMemoryMap[baseAddr + addr + ii] = buf[4 + ii];
                        }                
                    }
                    else {
                        console.log('ignoring '+ (baseAddr + addr));
                    }
                    
                    // console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
                }
                else {
                    // console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
                }
            });
        
            setStatus('Preparing to flash...');

            if (platformObj.id == 6 || platformObj.id == 8) {
                // Photon/P1
                let part;

                // System Part 1	0x8020000	0x8060000	256 KB
                setStatus('Flashing system part 1...');
                part = new Uint8Array(256 * 1024);
                for(let ii = 0; ii < 256 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0x20000 + ii];
                }
                try {
                    await usbDevice.updateFirmware(part, {});
                }
                catch(e) {
                    console.log('exception', e);
                }

                // System Part 2	0x8060000	0x80A0000	256 KB
                part = new Uint8Array(256 * 1024);
                for(let ii = 0; ii < 256 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0x60000 + ii];
                }
                await usbDevice.updateFirmware(part, {});

                // Bootloader	0x8000000	0x8004000	16 KB

                // User Part	0x80A0000	0x80C0000	128 KB
                part = new Uint8Array(128 * 1024);
                for(let ii = 0; ii < 128 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0xa0000 + ii];
                }
                await usbDevice.updateFirmware(part, {});
            }
            else
            if (platformObj.id == 10) {
                // Electron/E Series
            }
            else {
                // Gen 3

            }
            */

        }));
    }));

    if ($('.apiHelperUsbSetupDone').each(function () {
        const thisPartial = $(this);

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbSetupDoneStatus').html(str);
        }
        
        const selectElem = $(thisPartial).find('.apiHelperUsbSetupDoneSelect');

        if (!navigator.usb) {
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        if ($(selectElem).on('click', async function () {
            const gen3platforms = [
                0x0c, // argon
                0x0d, // boron
                0x17, // bsom
                0x19, // b5som
                0x1a, // tracker
            ];
        
            let filters = [];
            for(platform of gen3platforms) {
                filters.push({vendorId: 0x2b04, productId: (platform | 0xc000)});
                filters.push({vendorId: 0x2b04, productId: (platform | 0xd000)});
            }
        
            try {
                const usbDevice = await navigator.usb.requestDevice({ filters: filters })
                // console.log('device', usbDevice);
        
                const dev = await ParticleUsb.openDeviceById(usbDevice, {});
                // console.log('dev', dev);
        
                const typeIdStr = dev.type + ' ' + dev.id;
        
                if (!dev.isInDfuMode) {
                    setStatus('Marking setup done for ' + typeIdStr + '...');
            
                    await dev.setSetupDone(true);
            
                    setStatus('Marked setup done for ' + typeIdStr + '!');    
                }
                else {
                    setStatus(typeIdStr + ' is in DFU mode.<br/>Put in normal operating mode, listening mode, or safe mode to mark setup done.');
                }
        
            }
            catch(e) {
                console.log('no device selected', e);
            }        
        }));
    }));


    if ($('.apiHelperUsbTest').each(function () {
        const thisPartial = $(this);

        const findElem = $(thisPartial).find('.apiHelperUsbTestFind');

        if (!navigator.usb) {
            $(findElem).prop('disabled', true);
            return;
        }

        if ($(findElem).on('click', async function () {
            const devices = await ParticleUsb.getDevices();
            for (let device of devices) {
                console.log('device', device); // Prints device type, e.g. "Photon"
            }        
        }));
    }));

    fetch('/assets/files/deviceRestore.json')
    .then(response => response.json())
    .then(function(res) {
        deviceRestoreInfo = res;
        // console.log('deviceRestoreInfo', deviceRestoreInfo);
    });


});

