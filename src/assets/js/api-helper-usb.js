

$(document).ready(function () {
    // auth not required

    const noWebUsbError = 'Your web browser does not support WebUSB and cannot access Particle devices using USB.<br/>' +
        'One alternative is to use the <a href="/tutorials/developer-tools/cli/">Particle CLI</a>.';

    let deviceRestoreInfo;
    let versionInfo;

    apiHelper.systemVersionToSemVer = function(sysVer) {
        for(let obj of versionInfo.versions) {
            if (obj.sys == sysVer) {
                return obj.semVer;
            }
        }
        return null;
    };

    apiHelper.semVerToSystemVersion = function(semVer) {
        for(let obj of versionInfo.versions) {
            if (obj.semVer == semVer) {
                return obj.sys;
            }
        }
        return 0;
    };

    apiHelper.platformIdToName = function(platformId) {
        for(let tempPlatformObj of deviceRestoreInfo.platforms) {
            if (tempPlatformObj.id == platformId) {
                return tempPlatformObj.name;
            }
        }
        return null;
    };

    apiHelper.findRestoreSemVer = function(platformId, sysVer) {
        const platformName = apiHelper.platformIdToName(platformId);

        const versionArray = deviceRestoreInfo.versionsZipByPlatform[platformName];
        if (!versionArray) {
            return null;
        }

        for(let ii = versionArray.length - 1; ii >= 0; ii--) {
            if (apiHelper.semVerToSystemVersion(versionArray[ii]) >= sysVer) {
                return versionArray[ii];
            }
        }
        return null;
    };

    if ($('.apiHelperUsbRestoreDevice').each(function() {
        const thisPartial = $(this);
        const eventCategory = 'Device Restore USB';

        const selectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelect'); // button
        const selectInfoElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelectInfo'); // status area
        const versionElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion'); // 
        const restoreElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceRestore');
        const progressElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceProgressTr');
        const modeSelectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceModeSelect');

        // Tabs
        const versionTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersionTr');
        const fileTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceFileTr');
        const urlTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceUrlTr');

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbRestoreDeviceStatus').html(str);
        }

        if (!navigator.usb) {
			ga('send', 'event', eventCategory, 'No WebUSB', navigator.userAgent);
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        let usbDevice;
        let platformObj;
        let userFirmwareBinary;

        const resetRestorePanel = function() {
            $(selectElem).text('Select Device');
            $(selectInfoElem).html('');
            $(progressElem).hide();
            $(selectElem).prop('disabled', false);
            $(versionElem).prop('disabled', true);
            $(restoreElem).prop('disabled', true);
        };

        const checkRestoreButtonEnable = function() {
            let disabled = true;

            if (usbDevice) {
                const mode = $(modeSelectElem).val();
                switch(mode) {
                    case 'tinker':
                        disabled = !$(versionElem).val();
                        if (disabled) {
                            setStatus('Select version to restore');
                        }
                        break;
    
                    case 'upload':
                        disabled = !$(fileTrElem).find('td > input')[0].files.length;
                        if (disabled) {
                            setStatus('Select user firmware binary to use');
                        }
                        break;
                    
                    case 'customUrl':
                    case 'url':
                        disabled = !$(urlTrElem).find('td > input').val();
                        if (disabled) {
                            setStatus('Enter user firmware binary URL');
                        }
                        break;
                }    
                if (!disabled) {
                    setStatus('Ready to restore');
                }
            }

            $(restoreElem).prop('disabled', disabled);
        };

        const updateTabs = function() {
            const mode = $(modeSelectElem).val();
            $(versionTrElem).hide();
            $(fileTrElem).hide();
            $(urlTrElem).hide();

            switch(mode) {
                case 'tinker':
                    $(versionTrElem).show();
                    break;

                case 'upload':
                    $(fileTrElem).show();
                    break;

                case 'url':
                    $(urlTrElem).show();
                    break;

                case 'customUrl':
                    break;
            }
            checkRestoreButtonEnable();
        }

        $(modeSelectElem).on('change', updateTabs);

        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('url')) {
            let optionElem = document.createElement('option');
            $(optionElem).text('Custom URL');
            $(optionElem).prop('selected', true);
            $(optionElem).prop('value', 'customUrl');
            $(modeSelectElem).append(optionElem);

            $(urlTrElem).find('td > input').val(urlParams.get('url'));
            updateTabs();
        }

        $(urlTrElem).find('td > input').on('input', function() {
            checkRestoreButtonEnable();
        });

        $(fileTrElem).find('td > input').on('change', function() {
            if (this.files.length == 1) {
                const file = this.files[0];

                checkRestoreButtonEnable();
                
                let fileReader = new FileReader();
                fileReader.onload = function() {
                    userFirmwareBinary = fileReader.result;
                };
                fileReader.readAsArrayBuffer(file);
            
            }
        });

 
    
        if ($(selectElem).on('click', async function () {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
            try {
                $(selectElem).prop('disabled', false);
                $(versionElem).prop('disabled', true);
                $(restoreElem).prop('disabled', true);
        
                if (usbDevice) {
                    $(selectInfoElem).html('');
                    await usbDevice.close();
                    usbDevice = null;
                }

                setStatus('Select device to restore...');

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});
        
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
                    await usbDevice.close();
                    usbDevice = null;
                    return;
                }
                $(selectInfoElem).text(usbDevice.type + ' ' + usbDevice.id);
                $(selectElem).text('Select a Different Device');

                const lastVersion = $(versionElem).val();
                $(versionElem).html('');
                for(let ver of versionArray) {
                    versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                }
                if (lastVersion && !lastVersion.startsWith('Select')) {
                    $(versionElem).val(lastVersion);
                }
                
                $(versionElem).prop('disabled', false);
                checkRestoreButtonEnable();
            }
            catch(e) {
                ga('send', 'event', eventCategory, 'No WebUSB Device Selected');
                setStatus('USB device not selected');                
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

            let version = $(versionElem).val();

            if ($(modeSelectElem).val() == 'url' || $(modeSelectElem).val() == 'customUrl') {
                setStatus('Downloading user firmware binary...');
                const url = $(urlTrElem).find('td > input').val();
                try {
                    await new Promise(function(resolve, reject) {
                        fetch(url)
                            .then(response => response.arrayBuffer())
                            .then(function(res) {
                                userFirmwareBinary = res;
                                resolve();
                            })
                            .catch(function(err) {
                                console.log('error', err);
                                setStatus('Unable to retrieve the user firmware binary URL');
                                reject();
                            });
                    });    
                }
                catch(e) {
                    return;
                }
                history.pushState(null, '', '?url=' + encodeURIComponent(url));
            } 
            else {
                if (urlParams.has('url')) {
                    history.pushState(null, '', '?');
                }
            }
    
            if (userFirmwareBinary) {
                setStatus('Validating user firmware binary...');

                let dv = new DataView(userFirmwareBinary);
                    
                const startAddr = dv.getUint32(0, true);
                // console.log('startAddr=0x' + startAddr.toString(16));

                const platformId = dv.getUint16(12, true);
                const platformName = apiHelper.platformIdToName(platformId);
                // console.log('platformId=' + platformId + ' platformName=' + platformName);
                if (usbDevice.platformId != platformId) {
                    setStatus('User firmware is for ' + platformName + ' but selected device is ' + apiHelper.platformIdToName(usbDevice.platformId));
                    return;
                }

                const moduleFunction = dv.getUint8(14);
                // console.log('moduleFunction=' + moduleFunction + ' (must be 5)');
                const moduleIndex = dv.getUint8(15);
                // console.log('moduleIndex=' + moduleIndex + ' (must be 1)');

                if (moduleFunction != 5 || moduleIndex != 1) {
                    setStatus('Selected binary file does not appear to contain user firmware');
                    return;
                }


                const systemVersion = dv.getUint16(18, true);
                // console.log('systemVersion=' + systemVersion);
                const systemVersionSemVer = apiHelper.systemVersionToSemVer(systemVersion);

                const restoreSemVer = apiHelper.findRestoreSemVer(platformId, systemVersion);
                // console.log('restoreSemVer=' + restoreSemVer);

                if (systemVersionSemVer != restoreSemVer) {
                    // console.log('not an exact system match');
                }
                version = restoreSemVer;
            }


            $(restoreElem).prop('disabled', true);
            $(selectElem).prop('disabled', true);
            $(versionElem).prop('disabled', true);

            let moduleInfo;

            ga('send', 'event', eventCategory, 'DFU Restore Started', version + '/' + platformObj.name);

            setStatus('Downloading module info...');

            await new Promise(function(resolve, reject) {
                fetch('/assets/files/device-restore/' + version + '/' + platformObj.name + '.json')
                .then(response => response.json())
                .then(function(res) {
                    moduleInfo = res;
                    resolve();
                });
            });

            setStatus('Downloading restore image...');

            const zipUrl = '/assets/files/device-restore/' + version + '/' + platformObj.name + '.zip';

            const zipFs = new zip.fs.FS();

            await zipFs.importHttpContent(zipUrl);
        
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

                // Close connection to the CDC mode device
                await usbDevice.close();
                usbDevice = null;
            }

            let nativeUsbDevice;

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
                
                const filters = [
                    {vendorId: 0x2b04, productId:(productId | 0xd000)}
                ];
                        
                nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
            }

            if (!nativeUsbDevice) {
                ga('send', 'event', eventCategory, 'No USB Device Found');
                setStatus('Unable to find device in DFU mode');
                resetRestorePanel();
                return;
            }

            const interfaces = dfu.findDeviceDfuInterfaces(nativeUsbDevice);

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
                setStatus('Device did not respond to DFU mode. It may work if you try again or manually enter DFU mode.');
                resetRestorePanel();
                return;
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


            let partName;
            let genericPartName;
            let extPart;

            // 
            dfuseDevice.logProgress = function(done, total, func) {
                if (func == 'erase') {
                    $(progressElem).find('td > span').text('Erasing ' + genericPartName);
                }
                else {
                    $(progressElem).find('td > span').text('Programming ' + genericPartName);
                }
                const pct = (total != 0) ? (done * 100 / total) : 0;
                $(progressElem).find('td > progress').val(pct);
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

                if (userFirmwareBinary && (partName == 'tinker' || partName == 'tracker-edge')) {
                    genericPartName = 'custom user firmware';     
                } else {
                    genericPartName = partName;
                }

                setStatus('Updating ' + genericPartName + '...');

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
                    else
                    if (userFirmwareBinary && (partName == 'tinker' || partName == 'tracker-edge')) {
                        await dfuseDevice.do_download(4096, userFirmwareBinary, {});
                    }
                    else {
                        await dfuseDevice.do_download(4096, part, {});
                    }
                    setStatus('Downloading ' + genericPartName + ' complete!');
                }
                catch(e) {
                    setStatus('Downloading ' + genericPartName + ' failed');
                }

            }
            
            $(progressElem).hide();

            await dfuseDevice.close();

            {
                if (extInterface && extPart) {
                    partName = 'bootloader';

                    // Gen 3
                    const dfuseExtDevice =  await createDfuseDevice(extInterface);

                    dfuseExtDevice.startAddress = 0x80289000;
                    await dfuseExtDevice.do_download(4096, extPart, {});

                    await dfuseExtDevice.close();
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

                    setStatus('Resetting device...');

                    setTimeout(function() {
                        setStatus('');
                    }, 2000);        
                }
                catch(e) {
                    setStatus('Error setting device flags, manually reset device');
                }

                await dfuseAltDevice.close();
            }
            
            if (usbDevice) {
                await usbDevice.close();
                usbDevice = null;
            }
            ga('send', 'event', eventCategory, 'DFU Restore Success', version + '/' + platformObj.name);

            resetRestorePanel();

        }));
    }));

    if ($('.apiHelperUsbSetupDone').each(function () {
        const thisPartial = $(this);
        const eventCategory = 'Setup Done USB';

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbSetupDoneStatus').html(str);
        }
        
        const selectElem = $(thisPartial).find('.apiHelperUsbSetupDoneSelect');

        if (!navigator.usb) {
			ga('send', 'event', eventCategory, 'No WebUSB', navigator.userAgent);
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
                    ga('send', 'event', eventCategory, 'Setup Done Success');
                }
                else {
                    setStatus(typeIdStr + ' is in DFU mode.<br/>Put in normal operating mode, listening mode, or safe mode to mark setup done.');
                }

                await dev.close();
        
            }
            catch(e) {
                ga('send', 'event', eventCategory, 'No WebUSB Device Selected');
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

    // Download the module version to semver mapping table
    fetch('/assets/files/versionInfo.json')
        .then(response => response.json())
        .then(function(res) {
            versionInfo = res;
        });

});

