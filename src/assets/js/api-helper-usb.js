

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

    apiHelper.getRestoreVersions = function(usbDevice) {
        let result = null;

        for(let tempPlatformObj of deviceRestoreInfo.platforms) {
            if (tempPlatformObj.id == usbDevice.platformId) {
                if (deviceRestoreInfo.versionsZipByPlatform[tempPlatformObj.name]) {
                    result = Object.assign({}, tempPlatformObj);
                    result.versionArray = deviceRestoreInfo.versionsZipByPlatform[tempPlatformObj.name];
                    result.isTracker = (result.id == 26 || result.id == 28);
                    result.hasNCP = (result.id == 26) || (result.id == 12); // Tracker or Argon
                    result.isRTL872x = (result.mcu.startsWith('RTL872'));
                    result.isnRF52 = (result.mcu.startsWith('nRF52'));
                    result.isSTM32F2xx = (result.mcu.startsWith('STM32F2'));
                    break;
                }
            }
        }
        return result;
    }


    if ($('.apiHelperUsbRestoreDevice').each(function() {
        const thisPartial = $(this);
        const eventCategory = 'Device Restore USB';

        const selectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelect'); // button
        const selectInfoElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelectInfo'); // status area
        const versionElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion'); // 
        const restoreElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceRestore');
        const progressElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceProgressTr');
        const modeSelectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceModeSelect');
        const tinkerOptionElem = $(modeSelectElem).find('option[value="tinker"]');


        // Tabs
        const versionTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersionTr');
        const fileTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceFileTr');
        const urlTrElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceUrlTr');

        // Setup done
        const setupBitTrElem =  $(thisPartial).find('.apiHelperUsbRestoreSetupBitTr');
        const setupBitSelectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSetupBit');

        // Update NCP
        const trackerTrElem = $(thisPartial).find('.apiHelperUsbRestoreTrackerTr');
        const updateNcpCheckboxElem = $(thisPartial).find('.updateNcpCheckbox');
        const shippingModeCheckboxElem = $(thisPartial).find('.shippingModeCheckbox');

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbRestoreDeviceStatus').html(str);
        }

        if (!navigator.usb) {
			analytics.track('No WebUSB', {category:eventCategory, label:navigator.userAgent});
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        let usbDevice;
        let platformVersionInfo;
        let userFirmwareBinary;

        const resetRestorePanel = function() {
            $(selectElem).text('Select Device');
            $(selectInfoElem).html('');
            $(progressElem).hide();
            $(selectElem).prop('disabled', false);
            $(versionElem).prop('disabled', true);
            $(restoreElem).prop('disabled', true);
            $(setupBitTrElem).hide();
            $(trackerTrElem).hide();
            $(tinkerOptionElem).text('Tinker (Factory Default)');
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

                    case 'cloudDebug':
                        disabled = false;
                        break;
                }    
                if (!disabled) {
                    setStatus('Ready to flash device');
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
                
                case 'cloudDebug':
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
                $(setupBitTrElem).hide();
        
                if (usbDevice) {
                    $(selectInfoElem).html('');
                    await usbDevice.close();
                    usbDevice = null;
                }

                setStatus('Select device to restore...');

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});
        
                // Find available versions for this device
                platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);
                if (!platformVersionInfo) {
                    setStatus('No device restore images found for this device');
                    await usbDevice.close();
                    usbDevice = null;
                    return;
                }
                if (platformVersionInfo.isRTL872x) {
                    setStatus('Cloud debug is not available on the P2');
                    await usbDevice.close();
                    usbDevice = null;
                    return;
                }
    
                $(selectInfoElem).text(usbDevice.type + ' ' + usbDevice.id);
                $(selectElem).text('Select a Different Device');

                const lastVersion = $(versionElem).val();
                $(versionElem).html('');
                for(let ver of platformVersionInfo.versionArray) {
                    versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                }
                if (lastVersion && !lastVersion.startsWith('Select')) {
                    $(versionElem).val(lastVersion);
                }

                if (platformVersionInfo.gen == 3) {
                    $(setupBitTrElem).show();
                }
                if (platformVersionInfo.isTracker) {
                    $(trackerTrElem).show();

                    $(tinkerOptionElem).text('Tracker Edge (Factory Default)');
                }
                else {
                    $(tinkerOptionElem).text('Tinker (Factory Default)');
                }
                    
                $(versionElem).prop('disabled', false);
                checkRestoreButtonEnable();
            }
            catch(e) {
                analytics.track('No WebUSB Device Selected', {category:eventCategory});
                setStatus('USB device not selected');                
                console.log('no device selected', e);
            }        
        }));

        if ($(restoreElem).on('click', async function () {
            let baseOptions = {
                eventCategory,
                platformVersionInfo,
                setStatus,
                version: $(versionElem).val(),
                progressUpdate: function(msg, pct) {
                    $(progressElem).find('td > span').text(msg);
                    $(progressElem).find('td > progress').val(pct);
                },
                progressShowHide: function(show) {
                    if (show) {
                        $(progressElem).show();
                    }
                    else {
                        $(progressElem).hide();
                    }
                }
            };
            let options = Object.assign({}, baseOptions);

            options.setupBit = $(setupBitSelectElem).val();

            if (userFirmwareBinary) {
                options.userFirmwareBinary = userFirmwareBinary;
            }


            if ($(modeSelectElem).val() == 'url' || $(modeSelectElem).val() == 'customUrl') {
                setStatus('Confirming...');
                const msg = 'This restore will use a custom binary downloaded from an external server. ' + 
                    'Make sure that it is from a reputable author and stored on a secure server. '
                if (!confirm(msg)) {
                    setStatus('Restore canceled');
                    resetRestorePanel();
                    return;
                } 
                options.downloadUrl = $(urlTrElem).find('td > input').val();
            }
            if ($(modeSelectElem).val() == 'cloudDebug') {

                const platformName = apiHelper.platformIdToName(usbDevice.platformId);

                options.downloadUrl = '/assets/files/cloud-debug/' + platformName + '.bin';
            }

            $(restoreElem).prop('disabled', true);
            $(selectElem).prop('disabled', true);
            $(versionElem).prop('disabled', true);

            const deviceId = usbDevice.id;
    
            let restoreResult = await dfuDeviceRestore(usbDevice, options);

            const waitForUpdates = async function(isLongWait) {
                nativeUsbDevice = null;

                setStatus('Waiting for updates to be applied...');
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve();
                    }, (isLongWait ? 45000 : 10000));
                });        

                for(let tries = 1; tries <= (isLongWait ? 16 : 8); tries++) {
                    setStatus('Attempting to reconnect to the device...');
                    const nativeUsbDevices = await navigator.usb.getDevices()
                
                    if (nativeUsbDevices.length > 0) {
                        for(let dev of nativeUsbDevices) {
                            if (dev.serialNumber == deviceId) {
                                nativeUsbDevice = dev;
                                break;
                            }
                        }
                    }
                    await new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            resolve();
                        }, 1000);
                    });        
                }    
            }

            if (platformVersionInfo.isTracker) {
                if ($(updateNcpCheckboxElem).prop('checked') || $(shippingModeCheckboxElem).prop('checked')) {
                    await waitForUpdates(false);

                    if ($(updateNcpCheckboxElem).prop('checked')) {
                        // Update Tracker NCP
                        let ncpOptions = Object.assign({}, baseOptions);
                        ncpOptions.ncpUpdate = true;
        
                        if (nativeUsbDevice) {
                            setStatus('Updating NCP...');
        
                            usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});
        
                            restoreResult = await dfuDeviceRestore(usbDevice, ncpOptions);
                        }
                        else {
                            setStatus('Failed to reconnect to device to update NCP');
                        }
                        await waitForUpdates(true);
                    }
        
        
                    if ($(shippingModeCheckboxElem).prop('checked')) {

                        if (nativeUsbDevice) {
                            setStatus('Entering shipping mode...');
        
                            usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});
        
                            const reqObj = {
                                cmd: 'enter_shipping'
                            };
                            await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
            
            
                        }
                        else {
                            setStatus('Failed to reconnect to device to enter shipping mode');
                        }
                    }                
                }
            }




            resetRestorePanel();

            // 
            if (platformVersionInfo.isRTL872x) {
                setStatus('If the P2 device is still blinking yellow, press the reset button on the device');
            }
            else {
                setTimeout(function() {
                    setStatus('');
                }, 2000);    
            }                        
            

            if (options.downloadUrl) {
                if ($(modeSelectElem).val() == 'url') {
                    history.pushState(null, '', '?url=' + encodeURIComponent(downloadUrl));
                }
            } 
            else {
                if (urlParams.has('url')) {
                    history.pushState(null, '', '?');
                }
            }
    
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
			analytics.track('No WebUSB', {category:eventCategory, label:navigator.userAgent});
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        if ($(selectElem).on('click', async function () {
            // TODO: Get this from the device-restore.json file
            const gen3platforms = [
                0x0c, // argon
                0x0d, // boron
                0x0f, // esomx
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
        
                const dev = await ParticleUsb.openNativeUsbDevice(usbDevice, {});
                // console.log('dev', dev);
        
                const typeIdStr = dev.type + ' ' + dev.id;
        
                if (!dev.isInDfuMode) {
                    setStatus('Marking setup done for ' + typeIdStr + '...');
            
                    await dev.setSetupDone(true);
            
                    setStatus('Marked setup done for ' + typeIdStr + '!');    
                    analytics.track('Setup Done Success', {category:eventCategory});
                }
                else {
                    setStatus(typeIdStr + ' is in DFU mode.<br/>Put in normal operating mode, listening mode, or safe mode to mark setup done.');
                }

                await dev.close();
        
            }
            catch(e) {
                analytics.track('No WebUSB Device Selected', {category:eventCategory});
                console.log('no device selected', e);
            }        
        }));
    }));

    $('.apiHelperUsbDeviceInfo').each(function() {
        const thisPartial = $(this);
        const gaCategory = 'UsbDeviceInfo';

        const selectDeviceDivElem = $(thisPartial).find('.selectDeviceDiv');
        const selectDeviceButtonElem = $(thisPartial).find('.selectDeviceButton');
        const statusDivElem = $(thisPartial).find('.statusDiv');
        const resultsDivElem = $(thisPartial).find('.resultsDiv');
        const resultsTableBodyElem = $(resultsDivElem).find('table > tbody');
        const browserErrorDivElem = $(thisPartial).find('.browserErrorDiv');
        // const Elem = $(thisPartial).find('.');

        if (!navigator.usb) {
			analytics.track('No WebUSB', {category:gaCategory, label:navigator.userAgent});
            $(selectDeviceButtonElem).prop('disabled', true);
            $(browserErrorDivElem).show();
            return;
        }

        const setStatus = function(s) {
            $(statusDivElem).text(s);
        }

        const addResult = function(left, right) {
            const trElem = document.createElement('tr');

            {
                const tdElem = document.createElement('td');
                $(tdElem).text(left);
                $(trElem).append(tdElem);    
            }
            {
                const tdElem = document.createElement('td');
                $(tdElem).text(right);
                $(trElem).append(tdElem);    
            }

            $(resultsTableBodyElem).append(trElem);
        };

        $(selectDeviceDivElem).show();

        $(selectDeviceButtonElem).on('click', async function() {
            const gen3platforms = [
                0x0c, // argon
                0x0d, // boron
                0x0f, // esomx
                0x17, // bsom
                0x19, // b5som
                0x1a, // tracker
            ];
        
            let filters = [
                {vendorId: 0x2b04},
            ];
        
            try {
                $(resultsTableBodyElem).empty();

                const usbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                const dev = await ParticleUsb.openNativeUsbDevice(usbDevice, {});

                setStatus('Getting device information...');

                let info = {
                    deviceId: dev._id,
                };

                $(resultsDivElem).show();
                addResult('Device ID', info.deviceId);

                
                if (dev.isInDfuMode) {
                    setStatus('When in DFU mode (blinking yellow), only the Device ID can be retrieved.');
                    dev.close();
                    return;
                }

                // dev._id

                info.serial = await dev.getSerialNumber();
                addResult('Serial Number', info.serial);

                const skuObj = await apiHelper.getSkuObjFromSerial(info.serial);
                if (skuObj) {
                    info.sku = skuObj.name;
                    info.skuDesc = skuObj.desc;
                    addResult('SKU', info.sku + ' ' + info.skuDesc);
                }

                const platformObj = await apiHelper.getPlatformInfo(dev.platformId);
                if (platformObj) {
                    info.platformId = dev.platformId;
                    info.platformName = platformObj.name;
                    info.platformDisplayName = platformObj.displayName;
                    
                    addResult('Platform', info.platformDisplayName + ' (' + info.platformId + ')');
                }

                if (dev.isCellularDevice) {
                    info.isCellularDevice = true;
                    info.iccid = await dev.getIccid();
                    addResult('ICCID', info.iccid);
                }

                apiHelper.manualSettings.setKeyObject('deviceSelect', info);

                setStatus('');

                dev.close();
            }
            catch(e) {
                if (e.message.includes('No device selected')) {
                    return;
                }
                setStatus('Failed to retrieve device information');
                console.log('exception', e);
            }
        });

    });


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

    $('.usbControlRequest').each(function() {
        const thisPartial = $(this);

        const connectButtonElem = $(thisPartial).find('.connectButton');
        const disconnectButtonElem = $(thisPartial).find('.disconnectButton');
        const sendButtonElem = $(thisPartial).find('.sendButton');
        const requestJsonLinterElem = $(thisPartial).find('.apiHelperJsonLinterEditor');
        const responseTextElem = $(thisPartial).find('.responseText > textarea');
        const browserErrorDivElem = $(thisPartial).find('.browserErrorDiv');
        // const Elem = $(thisPartial).find('.');

        const defaultRequest = {
            op: 'test',
        };
        apiHelper.jsonLinterSetValue(thisPartial, JSON.stringify(defaultRequest, null, 4));

        let nativeUsbDevice;
        let usbDevice;

        const setStatus = function(s) {
            $(thisPartial).find('.apiHelperStatus').text(s);
        }
        
        if (!navigator.usb) {
			analytics.track('No WebUSB', {category:gaCategory, label:navigator.userAgent});
            $(connectButtonElem).prop('disabled', true);
            $(browserErrorDivElem).show();
            return;
        }

        $(connectButtonElem).on('click', async function() {
            $(connectButtonElem).prop('disabled', true);
            $(responseTextElem).val('');           
                    
            let filters = [
                {vendorId: 0x2b04},
            ];
        
            try {
                nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});

                setStatus('Connected to device');
                $(disconnectButtonElem).prop('disabled', false);
                $(sendButtonElem).prop('disabled', false);
            }
            catch(e) {
                if (e.message.includes('No device selected')) {
                    setStatus('Canceled connecting');
                }
                else {
                    setStatus('Failed to connect to device');
                    console.log('exception', e);
                }
                $(connectButtonElem).prop('disabled', false);
                $(disconnectButtonElem).prop('disabled', true);
                nativeUsbDevice = usbDevice = null;
            }
        });

        $(disconnectButtonElem).on('click', function() {
            $(disconnectButtonElem).prop('disabled', true);
            $(sendButtonElem).prop('disabled', true);

            if (usbDevice) {
                usbDevice.close();
            }
            nativeUsbDevice = usbDevice = null;

            $(connectButtonElem).prop('disabled', false);
        });
        $(sendButtonElem).on('click', async function() {
            $(sendButtonElem).prop('disabled', true);
            $(responseTextElem).val('');           

            const req = apiHelper.jsonLinterGetValue(thisPartial);

            try {
                const res = await usbDevice.sendControlRequest(10, req);
                if (res.result == 0 && res.data) {            
                    $(responseTextElem).val(res.data);
                    setStatus('Send request succeeded');
                }
                else {
                    setStatus('Device returned error ' + res.result);
                }
            
            }
            catch(e) {
                console.log('control request exception', e);
                setStatus('Error sending request');
            }
        
            $(sendButtonElem).prop('disabled', false);

        });



    });

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


