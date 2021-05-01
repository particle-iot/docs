

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
        const progressElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceProgress');

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

            const productId = usbDevice.productId;
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

            let nativeUsbDevice;

            setStatus('Looking for device in DFU mode...');
            const nativeUsbDevices = await navigator.usb.getDevices()
            console.log('nativeUsbDevice', nativeUsbDevices);

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
                
                const filters = [
                    {vendorId: 0x2b04, productId:(productId | 0xd000)}
                ];
                        
                nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
                console.log('nativeUsbDevice', nativeUsbDevice);
            }

            if (!nativeUsbDevice) {
                setStatus('Unable to find device in DFU mode');
                return;
            }

            const interfaces = dfu.findDeviceDfuInterfaces(nativeUsbDevice);

            console.log('interfaces', interfaces);
            let interface;
            let altInterface;
            let extInterface;

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
            if (!interface || !altInterface) {
                setStatus('Device did not respond with a valid DFU configuration...');
                return;
            }
            
            const createDfuseDevice = async function(interface) {
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
                console.log('dfuseDevice', dfuseDevice);
                return dfuseDevice;
            }

            const dfuseDevice = await createDfuseDevice(interface);


            let partName;
            let extPart;

            // 
            dfuseDevice.logProgress = function(done, total, func) {
                if (func == 'erase') {
                    $(progressElem).find('> label').text('Erasing ' + partName);
                }
                else {
                    $(progressElem).find('> label').text('Programming ' + partName);
                }
                const pct = (total != 0) ? (done * 100 / total) : 0;
                $(progressElem).find('> progress').val(pct);
            }

            $(progressElem).show();

            // System parts
            const dfuParts = [
                { name: 'system-part1' },
                { name: 'system-part2' },
                { name: 'system-part3' },
                { name: 'bootloader' },
                { name: 'softdevice' },
                { name: 'tinker', reset:true },
                { name: 'tracker-edge', reset:true }
            ];
            for(const dfuPart of dfuParts) {
                partName = dfuPart.name;

                const zipEntry = zipFs.find(partName + '.bin');
                if (!zipEntry) {
                    continue;
                }

                setStatus('Updating ' + partName + '...');

                let part = await zipEntry.getUint8Array();

                try {
                    dfuseDevice.startAddress = parseInt(moduleInfo[partName].prefixInfo.moduleStartAddy, 16);

                    if ((moduleInfo[partName].prefixInfo.moduleFlags & 0x01) != 0) { // ModuleInfo.Flags.DROP_MODULE_INFO
                        part = part.slice(24); // MODULE_PREFIX_SIZE
                    }

                    if (partName == 'bootloader') {
                        // Flash to OTA region instead of actual location

                        if (extInterface) {
                            // Gen 3
                            extPart = part;
                        }
                        else {
                            // Gen 2
                            dfuseDevice.startAddress = 0x80C0000;
                            await dfuseDevice.do_download(4096, part, {});
                        }
                    }
                    else {
                        await dfuseDevice.do_download(4096, part, {});
                    }
                }
                catch(e) {
                    console.log(partName + 'download failed', e);
                }

                // await usbDevice.updateFirmware(part, {});

                console.log(partName + ' complete!');                
            }
            
            $(progressElem).hide();

            // await dfuseDevice.close();

            {
                if (extInterface && extPart) {
                    partName = 'bootloader';

                    // Gen 3
                    const dfuseExtDevice =  await createDfuseDevice(extInterface);
                    console.log('dfuseExtDevice', dfuseExtDevice);

                    dfuseExtDevice.startAddress = 0x80289000;
                    await dfuseExtDevice.do_download(4096, extPart, {});

                    // await dfuseExtDevice.close();
                }
            }

            // Write 0xA5 to offset 1753 in alt 1 (DCT) 
            {
                partName = 'ota flag';

                const dfuseAltDevice = await createDfuseDevice(altInterface);

                dfuseAltDevice.startAddress = 1753;
                
                let flag = new Uint8Array(1);
                flag[0] = 0xA5;
                  
                try {
                    await dfuseAltDevice.do_download(4096, flag, {doManifestation:true, noErase:true});                    
                }
                catch(e) {
                    console.log('failed to set ota flag', e);
                }

                // await dfuseAltDevice.close();
            }
            
            setStatus('Resetting device...');

            setTimeout(function() {
                setStatus('');
            }, 2000);



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

