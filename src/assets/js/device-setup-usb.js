
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    const gaCategory = 'USB Device Setup';
    const storageActivateSim = "DeviceSetupActivatingSim";

    if (!navigator.usb) {
        ga('send', 'event', gaCategory, 'No WebUSB', navigator.userAgent);
        $('.setupBrowserError').show();
        return;
    }

    const stepClasses = [
        'setupStepSelectDevice'
    ];

    $('.apiHelperDeviceSetupUsb').each(function() {
        const thisElem = $(this);

        const troubleshootingMode = ($(thisElem).data('troubleshooting') == '1');
        if (troubleshootingMode) {
            $(thisElem).find('.troubleshootingMode').show();
            $(thisElem).find('.setupMode').hide();
        }
        else {
            $(thisElem).find('.troubleshootingMode').hide();
            $(thisElem).find('.setupMode').show();
        }

        const setupSelectDeviceButtonElem = $(thisElem).find('.setupSelectDeviceButton');
        const setupStepElem = $(thisElem).find('.setupStep');

        let usbDevice;
        let deviceInfo = {};
        let userFirmwareBinary;
        let mccmnc;
        let setupOptions = {};

        const minimumDeviceOsVersion = '2.1.0';

        const setStatus = function(status) {
            // $(thisElem).find('.setupStatus').text(status);
        }

        const setSetupStep = function(whichStep) {
            $(setupStepElem).children().each(function() {
                $(this).hide();
            });

            $(setupStepElem).children('.' + whichStep).show();
        };

        setSetupStep('setupStepSelectDevice');


        let infoTableItems = [
            {
                key: 'deviceId',
                label: 'Device ID',
            },
            {
                key: 'iccid',
                label: 'ICCID',
                cellular: true
            },
            {
                key: 'imei',
                label: 'IMEI',
                cellular: true
            },
            {
                key: 'mfg',
                label: 'Modem Manufacturer',
                cellular: true
            },
            {
                key: 'model',
                label: 'Modem Model',
                cellular: true
            },
            {
                key: 'fwvers',
                label: 'Modem Firmware Version',
                cellular: true
            },
            {
                key: 'power',
                label: 'Power Supply',
                power: true
            },
            {
                key: 'battery',
                label: 'Battery',
                power: true
            },
            {
                key: 'soc',
                label: 'Battery SoC',
                power: true
            },
            {
                key: 'country',
                label: 'Country',
                cellular: true
            },
            {
                key: 'name',
                label: 'Carrier',
                cellular: true
            },
            {
                key: 'tech',
                label: 'Access Technology',
                cellular: true
            },
            {
                key: 'band',
                label: 'Band',
                cellular: true
            }            
        ];


        const showInfoTable = function() {
            const tbodyElem = $(thisElem).find('.cellularInfoTable > tbody');

            $(tbodyElem).html('');
            for(const item of infoTableItems) {
                if (item.cellular && !deviceInfo.cellular) {
                    item.hidden = true;
                    continue;
                }
                if (item.wifi && !deviceInfo.wifi) {
                    item.hidden = true;
                    continue;
                }
                if (item.power && !deviceInfo.hasPMIC) {
                    item.hidden = true;
                    continue;
                }

                item.hidden = false;

                const trElem = document.createElement('tr');
                
                const labelElem = document.createElement('td');
                $(labelElem).text(item.label);
                $(trElem).append(labelElem);

                const valueElem = item.elem = document.createElement('td');
                $(trElem).append(valueElem);
                
                $(tbodyElem).append(trElem);
            }

            $(thisElem).find('.cellularInfo').show();
        }

        const setInfoTableItem = function(key, value) {
            if (value) {
                for(const item of infoTableItems) {
                    if (item.key == key) {
                        $(item.elem).text(value);
                    }
                }    
            }
        };

        const setInfoTableItemObj = function(obj) {
            for(const key in obj) {
                setInfoTableItem(key, obj[key]);
            }
        }

        const getInfoTableText = function() {
            let text = '';
            
            if ((thisElem).find('.cellularInfo').prop('display') == 'none') {
                return text;
            }

            for(const item of infoTableItems) {
                if (!item.hidden) {
                    text += item.label + ': ' + $(item.elem).text() + '\n';
                }
            }
            return text;
        };

        $(setupSelectDeviceButtonElem).on('click', async function() {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
            try {
                // Check access token
                const result = await new Promise(function(resolve, reject) {
    
                    const request = {
                        dataType: 'json',
                        error: function (jqXHR) {
                            reject(jqXHR.status);
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'GET',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: 'https://api.particle.io/v1/user'
                    };
        
                    $.ajax(request);            
                });

            }
            catch(e) {
                if (e == 401) {
                    $(thisElem).find('.apiHelperLoggedIn').hide();
                    $(thisElem).find('.accessTokenError').show();

                    $(thisElem).find('.loginAgain').on('click', apiHelper.loginAgain);
                    return;
                }
            }

            try {
                $(setupSelectDeviceButtonElem).prop('disabled', false);
        
            
                if (usbDevice) {
                    await usbDevice.close();
                    usbDevice = null;
                }

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});

                // TODO: Try this with a device with old Device OS, not sure whether this step
                // fails or the next one, but if the Device OS doesn't support control requests
                // we need to update Device OS first, then go back to check device settings.

                checkDevice();
            }
            catch(e) {
                if (e.message.includes('No device selected')) {
                    return;
                }
                console.log('exception', e);
            }
        });

        /*

        */

        const checkDevice = async function() {

            try {
                setSetupStep('setupStepCheckDevice');
                
                // TODO: Add a info pane if this takes longer than ~5 seconds
                // Possibly try resetting the device
                $(thisElem).find('.setupStepCheckDevice').children().each(() => $(this).hide());
                $(thisElem).find('.setupStepCheckDeviceStart').show();

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);

                if (!deviceInfo.targetVersion) {
                    deviceInfo.targetVersion = minimumDeviceOsVersion;
                }

                switch(deviceInfo.platformId) {
                    case 10: // electron (and E Series)
                    case 13: // boron
                    case 23: // bsom
                    case 25: // bsom
                    case 26: // tracker
                        deviceInfo.hasPMIC = true;
                        break;
                }

                $(thisElem).find('.setupStepCheckDeviceStart').hide();

                if (usbDevice.platformId == 26) {
                    $(thisElem).find('.setupStepCheckDeviceTracker').show();
                    return;
                }
                else
                if (!deviceInfo.platformVersionInfo) {
                    $(thisElem).find('.setupStepCheckDeviceUnknown').show();
                    return;
                }
    
                if (usbDevice.isCellularDevice) {                    
                    deviceInfo.cellular = true;

                    // Used to do this, but this does not work on Gen 2 cellular devices
                    // deviceInfo.iccid = await usbDevice.getIccid();

                    // Preload the mccmnc database
                    fetch('/assets/files/mccmnc.json')
                        .then(response => response.json())
                        .then(function(data) {
                            mccmnc = data;
                        })
                        .catch(function() {
                        });

                }
                else {
                    deviceInfo.wifi = true;
                }

                const stor = localStorage.getItem(storageActivateSim);
                if (stor) {
                    try {
                        const storObj = JSON.parse(stor);
                        // TODO: Check date here
                        if (stor.deviceId == deviceInfo.deviceId) {
                            // TODO: Maybe ask user here?
                            activateSim();
                            return;''   
                        }
                    }
                    catch(e) {

                    }
                }

                confirmFlash();
            }
            catch(e) {
                console.log('exception', e);
                // TODO: Handle errors like UsbError here
                // UsbError {jse_shortmsg: 'IN control transfer failed', jse_cause: DOMException: The device was disconnected., jse_info: {…}, message: 'IN control transfer failed: The device was disconnected.', stack: 'VError: IN control transfer failed: The device was…://ParticleUsb/./src/usb-device-webusb.js?:81:10)'}
                
                setSetupStep('setupStepManualDfu');
            }
        };

        const checkSimAndClaiming  = async function() {
            setSetupStep('setupStepCheckSimAndClaiming');

            const showStep = function(step) {
                $(thisElem).find('.setupStepCheckSimAndClaiming').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }

            showStep('setupStepCheckSimAndClaimingOwnership');

            const deviceLookupOutputElem = $(thisElem).find('.apiHelperDeviceLookupOutput');
            $(deviceLookupOutputElem).show();

            let deviceLookup = apiHelper.deviceLookup({
                deviceId: deviceInfo.deviceId,
                deviceLookupElem: deviceLookupOutputElem                
            });

            await deviceLookup.run();

            console.log('deviceLookup', deviceLookup);

            // TODO: Check service agreements to make sure account state == 'active'

            if (!deviceLookup.deviceInfo) {
                showStep('setupStepCheckSimAndClaimingNoDeviceInfo');


                await new Promise(function(resolve) {
                    const buttonElem = $(thisElem).find('.setupContinueSetupButton');
                    $(buttonElem).on('click', function() {
                        resolve();
                    });
                });

            }
            else if (deviceLookup.deviceMine) {

            }
            // deviceLookup.deviceMine

            // deviceLookup.deviceInMyProduct, .deviceProductId, .deviceProductName

            // deviceLookup.deviceInOrgProduct, .deviceProductId, .deviceProductName, .orgId, .orgName

            // if (deviceLookup.)
//            showStep('setupStepCheckSimAndClaimingCheckAccount');

            // Do something with deviceLookup.deviceInfo.isProductDevice here


            if (deviceInfo.wifi) {
                // Check if there are Wi-Fi credentials and ask to use those or reconfigure
                configureWiFi();                              
            } 
            else {
                // showStep('setupStepCheckSimAndClaimingGetIccid');

                // Check ICCID
                // Boron: Is the external SIM slot activated
                // Does this look like a 3rd-party SIM card? Use 3rd-party SIM flow (warn about activation, LTE M1, prompt for APN)
                // If Particle SIM, check if activated
                activateSim();
            }

        };

        const activateSim = async function() {
            setSetupStep('setupStepActivateSim');

            let needToActivate = false;
            let alreadyOwned = false;
            let clockTimer;
            let clockStart;
            let functionStart = new Date();
            let hasResetModem = false;

            const showStep = function(step) {
                $(thisElem).find('.setupStepActivateSim').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }

            showStep('setupStepActivateSimGet');

            const twoDigitString = function(n) {
                let s = n.toString();
                if (s.length >= 2) {
                    return s;
                }
                else {
                    return '0' + s;
                }
            }
            
            const elapsedString = function(secs) {
                let result = '';
            
                const h = Math.floor(secs / 3600);
                if (h > 0) {
                    result += twoDigitString(h) + ':';
                    secs -= h * 3600;
                }
            
                const m = Math.floor(secs / 60);
                secs -= m * 60;
            
                result += twoDigitString(m) + ':';
            
                const s = Math.floor(secs);
                result += twoDigitString(s);            
            
                return result;
            }
            
            const startClock = function() {
                $(thisElem).find('.setupStepActivateSimWaiting').show();

                clockTimer = setInterval(function() {
                    const elapsed = Math.floor((new Date().getTime() - clockStart.getTime()) / 1000);

                    $(thisElem).find('.setupStepActivateSimTimer').text(elapsedString(elapsed));
                }, 1000);
            };

            const nextStep = async function() {
                reqObj = {
                    op: 'connect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
            };

            $(thisElem).find('.continueWithoutActivating').on('click', nextStep);

            
            while(true) {
                try {
                    if (!deviceInfo.iccid) {

                        console.log('getting cellularInfo');

                        let reqObj = {
                            op: 'cellularInfo'
                        } 
                        if (setupOptions.simSelection) {
                            reqObj.simSelection = setupOptions.simSelection;
                        }
    
                        const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                        if (res.result || !res.data) {
                            await new Promise(function(resolve) {
                                setTimeout(function() {
                                    resolve();
                                }, 5000);
                            });
                            continue;
                        }
        
                        const respObj = JSON.parse(res.data);
                        if (!respObj.iccid) {
                            console.log('no iccid in cellularInfo');
                            if (!hasResetModem) {
                                hasResetModem = true;
                                if (((new Date().getTime() - functionStart.getTime()) / 1000) > 50) {
                                    showStep('setupStepActivateSimGetSlow');
        
                                    reqObj = {
                                        op: 'cellularReset'
                                    } 
                                    await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));    
                                }
                            }
    
                            await new Promise(function(resolve) {
                                setTimeout(function() {
                                    resolve();
                                }, 5000);
                            });
                            continue;
                        }
    
                        deviceInfo.iccid = respObj.iccid;
    
                        showInfoTable();
                        setInfoTableItem('deviceId', deviceInfo.deviceId);
                        setInfoTableItemObj(respObj);    

                        $(thisElem).find('.batteryWarning').hide();   
                        if (respObj.model) {
                            if (respObj.model.startsWith('SARA-R') || respObj.model.startsWith('BG9')) {
                                // LTE model, does not require a battery
                            }
                            else {
                                // Non-LTE model 
                                if (respObj.soc <= 0) {
                                    $(thisElem).find('.batteryWarning').show();   
                                }
                            }
        
                        }
    
                        showStep('setupStepActivateSimChecking');
                    }

                    let checkSimUrl;

                    if (setupOptions.addToProduct) {
                        checkSimUrl = 'https://api.particle.io/v1/products/' + setupOptions.productId + '/sims/' + deviceInfo.iccid;
                    }
                    else {
                        checkSimUrl = 'https://api.particle.io/v1/sims/' + deviceInfo.iccid;
                    }

                    // listSIMs doesn't filter on iccid correctly
                    // checkSIM does a HEAD so it doesn't return enough useful information
                    const result = await new Promise(function(resolve, reject) {
    
                        const request = {
                            dataType: 'json',
                            error: function (jqXHR) {
                                console.log('error', jqXHR);
                                reject(jqXHR.status);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json'
                            },
                            method: 'GET',
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: checkSimUrl
                        };
            
                        $.ajax(request);            
                    });
    
                    /*
                    last_status_change_action: "activate"
                    last_status_change_action_error: "no"
                    last_status_change_action_on: "2021-10-31T11:44:01.655Z"
                    state_change_in_progress: false
                    status: "active"
                    */
    
                    alreadyOwned = true;
                    if (result.status != 'active') {
                        if (result.last_status_change_action == 'activate' && result.state_change_in_progress) {
                            setStatus('SIM is being activated...');
                            if (!clockStart) {
                                clockStart = new Date(result.last_status_change_action_on);
                                startClock();
                            }
                        }
                        else {
                            needToActivate = true;
                        }
                    }
                    else {

                        localStorage.removeItem(storageActivateSim);

                        nextStep();
                        break;
                    }                            
    
                    // result.statusCode is 200 if not activated, and 205 if activated? Weird.
                }
                catch(e) {
                    if (e == 404) {
                        needToActivate = true;
                    }
                    else {
                        setSetupStep('setupStepSimActivationFailed');
                        console.log('exception', e);
                        break;    
                    }
                }
                
    
                if (needToActivate) {
                    try {
                        setStatus('Activating SIM...');

                        if (!clockStart) {
                            clockStart = new Date();
                            startClock();    
                        }

                        const stor = {
                            deviceId: deviceInfo.deviceId,
                            start: clockStart.getTime() / 1000
                        };
                        localStorage.setItem(storageActivateSim, JSON.stringify(stor));

                        let activateOptions = {
                            auth: apiHelper.auth.access_token, 
                            iccid: deviceInfo.iccid
                        }

                        if (setupOptions.addToProduct) {
                            activateOptions.product = setupOptions.productId;
                        }

                        const result = await apiHelper.particle.activateSIM(activateOptions);
                        showStep('setupStepActivateSimWaiting');

                    }
                    catch(e) {
                        if (e.message.includes('408')) { 
                            // Activation in progress, check again in 30 seconds
                        }
                        else {
                            setSetupStep('setupStepSimActivationFailed');
                            // 403 if SIM is a product SIM I think
                            console.log('exception', e);
                            break;    
                        }

                    }    
                }

                // Wait a bit to try again
                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 30000);
                });                
            }

            if (clockTimer) {
                clearInterval(clockTimer);
            }
            
        };


        const reconnectToDevice = async function() {

            setSetupStep('setupStepReconnecting');

            let nativeUsbDevice;

            const showStep = function(step) {
                $(thisElem).find('.setupStepReconnecting').children().each(function() {
                    $(this).hide();
                });
                $(thisElem).find('.' + step).show();    
            }
            showStep('setupStepReconnectingWaiting');

            for(let tries = 0; tries < 4 && !nativeUsbDevice; tries++) {
 
                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 3000);
                });
        
                try {                    
                    const nativeUsbDevices = await navigator.usb.getDevices();

                    if (nativeUsbDevices.length > 0) {
                        for(let dev of nativeUsbDevices) {
                            if (dev.serialNumber == deviceInfo.deviceId) {
                                nativeUsbDevice = dev;
                                break;
                            }
                        }
                    }            
                }         
                catch(e) {
                    console.log('exception getting USB devices', e);
                }

            }


            if (!nativeUsbDevice) {
                showStep('setupStepReconnectingNeedReauthorize');

                await new Promise(function(resolve, reject) {
                    const filters = [
                        {vendorId: 0x2b04}
                    ];

                    $(thisElem).find('.reconnectUsb').on('click', async function() {

                        $(thisElem).find('.reconnectUsb').prop('disabled', true);

                        nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
                
                        $(thisElem).find('.reconnectUsb').prop('disabled', false);

                        $(thisElem).find('.reconnectUsb').off('click');
                        resolve();
                    });
            
                });
            }
            
            usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});
            
            
            // In troubleshooting mode, we do try to autoconnect
            reqObj = {
                op: 'noAutoConnect',
            };
            await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));      
            
        };


        const flashDevice = async function() {
            try {
                setSetupStep('setupStepFlashDevice');

                const showStep = function(step) {
                    $(thisElem).find('.setupStepFlashDevice').children().each(function() {
                        $(this).hide();
                    });
                    $(thisElem).find('.' + step).show();    
                }

                showStep('setupStepFlashDeviceDownload');

                // Flash device                

                const resp = await fetch('/assets/files/docs-usb-setup-firmware/' + deviceInfo.platformVersionInfo.name + '.bin');
                userFirmwareBinary = await resp.arrayBuffer();

                let dfuPartTableInfo = {};

                let options = {
                    eventCategory: 'USB Device Setup',
                    platformVersionInfo: deviceInfo.platformVersionInfo,
                    userFirmwareBinary,
                    setStatus,
                    version: deviceInfo.targetVersion, 
                    setupBit: 'done',
                    onEnterDFU: function() {
                        showStep('setupStepFlashDeviceEnterDFU');
                    },
                    onAuthorizeDFU: async function() {
                        showStep('setupStepFlashDeviceAuthorizeDFU');

                        await new Promise(function(resolve, reject) {
                            const filters = [
                                {vendorId: 0x2b04}
                            ];
        
                            $(thisElem).find('.reconnectUsb').on('click', async function() {
        
                                $(thisElem).find('.reconnectUsb').prop('disabled', true);
        
                                try {
                                    nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters });
                        
                                    showStep('setupStepFlashDeviceConnectDFU');
                                    $(thisElem).find('.reconnectUsb').prop('disabled', false);
            
                                    $(thisElem).find('.reconnectUsb').off('click');
                                    resolve(nativeUsbDevice);    
                                }
                                catch(e) {
                                    reject(e);
                                }
                            });                    
                        });
                    },
                    onStartFlash: function() {
                        showStep('setupStepFlashDeviceFlashing');
                    },
                    progressUpdate: function(msg, pct, obj) {
                        // obj.pct
                        // obj.func == 'erase' else programming
                        // obj.partName == system-part1, system-part2, system-part3, bootloader, softdevice, tinker
                        // (obj.partName is tinker even for a custom binary)
                        
                        if (!dfuPartTableInfo[obj.partName]) {
                            return;
                        }

                        if (obj.func != 'erase') {
                            pct += 100;
                        }

                        if (pct >= 200) {
                            $(dfuPartTableInfo[obj.partName].imgElem).css('visibility', 'visible');
                        }
                        $(dfuPartTableInfo[obj.partName].progressElem).val(pct);
                    },
                    progressDfuParts: function(dfuParts) {

                        const flashDeviceStepsElem = $(thisElem).find('.flashDeviceSteps');

                        for(const dfuPart of dfuParts) {
                            const rowElem = document.createElement('tr');

                            let colElem;
                            
                            // Green check when completed
                            colElem = document.createElement('td');
                            const imgElem = document.createElement('img');
                            $(imgElem).attr('src', '/assets/images/device-setup/checkmark-48.png');
                            $(imgElem).css('width', '24px');
                            $(imgElem).css('height', '24px');
                            $(imgElem).css('margin', '2px');
                            $(colElem).append(imgElem);
                            $(rowElem).append(colElem);
                            $(imgElem).css('visibility', 'hidden');

                            // Title
                            colElem = document.createElement('td');
                            $(colElem).text(dfuPart.title);
                            $(rowElem).append(colElem);

                            // Progress
                            colElem = document.createElement('td');
                            const progressElem = document.createElement('progress');
                            $(progressElem).attr('value', '0');
                            $(progressElem).attr('max', '200');
                            $(colElem).append(progressElem);
                            $(rowElem).append(colElem);

                            $(flashDeviceStepsElem).append(rowElem);


                            dfuPartTableInfo[dfuPart.name] = {
                                dfuPart,
                                progressElem,
                                rowElem,
                                imgElem
                            };
                        }
                    }
                };

            
                const restoreResult = await dfuDeviceRestore(usbDevice, options);
            
                if (restoreResult.ok) {
                }
                else {
                    console.log('dfu error', restoreResult);
                }
                
            }
            catch(e) {
                console.log('exception', e);
            }

            // Wait a little extra before trying to reconnect
            await new Promise(function(resolve) {
                setTimeout(function() {
                    resolve();
                }, 3000);
            });

            await reconnectToDevice();

            if (troubleshootingMode) {
                checkSimAndClaiming();
            }
            else
            if (deviceInfo.wifi) {

                configureWiFi();                              
            }
            else {
                activateSim();
            }
        };

        const continueDfuElem = $(thisElem).find('.continueDfu');
        $(continueDfuElem).on('click', flashDevice);

        const addToProduct = async function() {
            setSetupStep('setupStepAddToProduct');

            // Add device into product
            const res = await apiHelper.particle.addDeviceToProduct({ 
                deviceId: deviceInfo.deviceId,
                product: setupOptions.productId,
                auth: apiHelper.auth.access_token 
            });
            if (res.statusCode >= 200 && res.statusCode < 300) {
            }
            else {
                console.log('failed to add to product, do something here');
            }

            if (setupOptions.developmentDevice) {
                await apiHelper.particle.markAsDevelopmentDevice({ 
                    deviceId: deviceInfo.deviceId,
                    product: setupOptions.productId,
                    auth: apiHelper.auth.access_token 
                });                
            }
            
            await flashDevice();

        };


        const confirmFlash = async function() {
            setSetupStep('setupStepConfirm');

            setupOptions = {}; 

            const setupNoClaimElem = $(thisElem).find('.setupNoClaim');
            $(setupNoClaimElem).prop('checked', false);

            const setupAddToProductElem = $(thisElem).find('.setupAddToProduct');
            const setupAddToProductSelectorElem = $(thisElem).find('.setupAddToProductSelector');
            const productDestinationElem = $(thisElem).find('.apiHelperProductDestination');
            const setupSimSelectionRowElem = $(thisElem).find('.setupSimSelectionRow');
            const productSelectElem = $(thisElem).find('.apiHelperProductSelect');
            const setupDevelopmentDeviceRowElem = $(thisElem).find('.setupDevelopmentDeviceRow');
            const setupDevelopmentDeviceElem = $(thisElem).find('.setupDevelopmentDevice');
            const setupDeviceOsVersionElem = $(thisElem).find('.setupDeviceOsVersion');

            $(productDestinationElem).data('filterPlatformId', deviceInfo.platformId);
            $(productDestinationElem).data('updateProductList')();

            const minSysVer = apiHelper.semVerToSystemVersion(minimumDeviceOsVersion);

            for(const ver of deviceInfo.platformVersionInfo.versionArray) {
                if (apiHelper.semVerToSystemVersion(ver) >= minSysVer) {
                    const optionElem = document.createElement('option');
                    $(optionElem).prop('value', ver);
                    $(optionElem).text(ver);
                    if (ver == minimumDeviceOsVersion) {
                        $(optionElem).prop('selected', true);
                    }

                    $(setupDeviceOsVersionElem).append(optionElem);
                }
            }
    


            const showSimSelectionOption = (deviceInfo.platformId == 13);

            if (showSimSelectionOption) { 
                // Boron
                $(setupSimSelectionRowElem).show();
            }
            else {
                $(setupSimSelectionRowElem).hide();
            }

            $(setupAddToProductElem).on('click', function() {
                setupOptions.addToProduct = $(setupAddToProductElem).prop('checked');
                if (setupOptions.addToProduct) {
                    $(setupAddToProductSelectorElem).show();
                    $(setupDevelopmentDeviceRowElem).show()
                }
                else {
                    $(setupAddToProductSelectorElem).hide();
                    $(setupDevelopmentDeviceRowElem).hide();
                }
            });

            $(productSelectElem).on('change', function() {
                // Product changed                
                console.log('product change ' + $(productSelectElem).val());
            });


            $(thisElem).find('.setupSetupDeviceButton').on('click', async function() {
                deviceInfo.targetVersion = $(setupDeviceOsVersionElem).val();

                setupOptions.noClaim = $(setupNoClaimElem).prop('checked');
                setupOptions.developmentDevice = $(setupDevelopmentDeviceElem).prop('checked');

                setupOptions.productId = $(productSelectElem).val();
                if (showSimSelectionOption) {
                    setupOptions.simSelection = parseInt($(thisElem).find('.setupSimSelect').val());
                }

                if (setupOptions.addToProduct) {
                    await addToProduct();
                }
                else {
                    await flashDevice();
                }
            });

        }


        const configureWiFi = async function() {
            if (!deviceInfo.wifi) {
                waitDeviceOnline();
                return;
            }
            setSetupStep('setupStepConfigureWiFi');

            $(thisElem).find('.networkTable > tbody').html('');

            $(thisElem).find('.searchingWiFi').css('visibility', 'visible');

            $(thisElem).find('.scanAgain').prop('disabled', true);

            $(thisElem).find('.useExisting').on('click', async function() {
                setSetupStep('setupStepWaitForOnline');

                reqObj = {
                    op: 'connect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
            });

            // Start Wi-Fi scan
            let reqObj = {
                op: 'wifiScan'
            };

            const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
            if (!res.status && res.data) {
                const respObj = JSON.parse(res.data);
                
                if (respObj.hasCredentials) {
                    // Show option to use existing
                    $(thisElem).find('.showUseExisting').show();
                }
            }

            const passwordInputElem = $(thisElem).find('.passwordInput');
            const setCredentialsElem = $(thisElem).find('.setCredentials');
            const passwordRowElem = $(thisElem).find('.passwordRow');

            let addedNetworks = {};

            const radioSelectionUpdate = function() {
                const checkedItems = $('input[name="selectedNetwork"]:checked');
                if (checkedItems.length > 0) {
                    const ssid = $(checkedItems).val();

                    if (addedNetworks[ssid].respObj.sec != 0) {
                        setStatus('Enter Wi-Fi network password and click Select Wi-Fi Network');
                        $(passwordRowElem).show();

                        $(passwordInputElem).focus();
                        $(passwordInputElem).select();            
                    }
                    else {
                        setStatus('Click Select Wi-Fi Network');
                        $(passwordRowElem).hide();
                    }

                    
                    $(setCredentialsElem).prop('disabled', false);
                }
                else {
                    $(passwordRowElem).hide();
                    $(setCredentialsElem).prop('disabled', true);
                }
            };


            $(passwordInputElem).on('keydown', function(ev) {
                if (ev.key != 'Enter') {
                    return;
                }
    
                ev.preventDefault();
                $(setCredentialsElem).trigger('click');    
            });

            $(setCredentialsElem).on('click', async function() {
                $(setCredentialsElem).prop('disabled', true);
                
                // Setting credentials can take a few seconds, so put up the next step first
                // so it's clear that the button worked
                setSetupStep('setupStepWaitForOnline');

                const ssid = $('input[name="selectedNetwork"]:checked').val();

                let reqObj = {
                    op: 'wifiSetCredentials',
                    ssid,
                    sec: addedNetworks[ssid].respObj.sec,
                    cip: addedNetworks[ssid].respObj.cip,
                    pass: $(passwordInputElem).val()
                };
    
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                reqObj = {
                    op: 'connect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
                return;
            });

            radioSelectionUpdate();

            // Display results
            while(true) {
                reqObj = {
                    op: 'wifiScanResult'
                } 
                const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                if (res.result) {
                    break;
                }

                if (res.data) {
                    // TODO: catch exception here
                    const respObj = JSON.parse(res.data);
                    
                    if (respObj.ssid) {

                        if (!addedNetworks[respObj.ssid]) {
                            let bars = 0;
                            if (respObj.rssi >= -60) {
                                bars = 4;
                            }
                            else    
                            if (respObj.rssi >= -70) {
                                bars = 3;
                            }
                            else
                            if (respObj.rssi >= -80) {
                                bars = 2;
                            }
                            else {
                                bars = 1;
                            }
    
                            const rowElem = document.createElement('tr');
    
                            let colElem;
                            let radioElem;
    
                            // Radio button
                            colElem = document.createElement('td');
                            {
                                radioElem = document.createElement('input');
                                $(radioElem).attr('type', 'radio');
                                $(radioElem).attr('name', 'selectedNetwork');
                                $(radioElem).attr('value', respObj.ssid);
                                $(colElem).append(radioElem);

                                $(radioElem).on('click', radioSelectionUpdate);
                            }
                            $(rowElem).append(colElem);
    
                            // SSID
                            colElem = document.createElement('td');
                            $(colElem).text(respObj.ssid);
                            $(rowElem).append(colElem);
    
                            // Secure
                            colElem = document.createElement('td');
                            if (respObj.sec != 0) {
                                // 56x68
                                const imgElem = document.createElement('img');
                                $(imgElem).attr('src', '/assets/images/device-setup/wifi-lock.png');
                                $(imgElem).css('width', '15px');
                                $(imgElem).css('height', '17px');
                                $(imgElem).css('margin', '2px');
                                $(colElem).append(imgElem);
                            }
                            $(rowElem).append(colElem);
    
                            // Strength
                            colElem = document.createElement('td');
                            {
                                // 86x68
                                const imgElem = document.createElement('img');
                                $(imgElem).attr('src', '/assets/images/device-setup/signal-bars-' + bars + '.png');
                                $(imgElem).css('width', '22px');
                                $(imgElem).css('height', '17px');
                                $(imgElem).css('margin', '2px');
                                $(colElem).append(imgElem);    
                            }
                            $(rowElem).append(colElem);
                            
                            $(thisElem).find('.networkTable > tbody').append(rowElem);

                            addedNetworks[respObj.ssid] = {
                                respObj,
                                rowElem,
                                radioElem
                            };
                        }                        
                    }
                    if (respObj.done) {
                        $(thisElem).find('.searchingWiFi').css('visibility', 'hidden');

                        $(thisElem).find('.scanAgain').prop('disabled', false);

                        const numNetworks = Object.keys(addedNetworks).length;
                        if (numNetworks == 0) {
                            setSetupStep('setupStepNoWiFi');
                        }
                        else
                        if (numNetworks == 1) {
                            const ssid = Object.keys(addedNetworks)[0];
                            $(addedNetworks[ssid].radioElem).trigger('click');
                        }

                        break;
                    }
                    else {
                        // Wait a bit to try again
                        await new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve();
                            }, 500);
                        });
                    }


                }

            }

        };

        $(thisElem).find('.scanAgain').on('click', configureWiFi);

        const deviceLogsElem = $(thisElem).find('.deviceLogs');
        const deviceLogsTextElem = $(thisElem).find('.deviceLogsText');
        const showDebuggingLogsElem = $(thisElem).find('.showDebuggingLogs');
        const deviceLogsTextButtonsElem = $(thisElem).find('.deviceLogsTextButtons');
        const downloadLogsElem = $(thisElem).find('.downloadLogs');

        let deviceLogs = '';
        let checkStatus;

        $(showDebuggingLogsElem).on('click', function() {
            if ($(showDebuggingLogsElem).prop('checked')) {                
                $(deviceLogsTextElem).val(deviceLogs);
                deviceLogsTextElem.scrollTop(deviceLogsTextElem[0].scrollHeight - deviceLogsTextElem.height());    
                $(deviceLogsTextButtonsElem).show();
            }
            else {
                $(deviceLogsTextButtonsElem).hide();
            }
        });

        $(downloadLogsElem).on('click', function() {
            $(downloadLogsElem).prop('disabled', true);

            let blob = new Blob([getInfoTableText(), deviceLogs], {type:'text/plain'});
            saveAs(blob, 'logs.txt');	

            $(downloadLogsElem).prop('disabled', false);
        });



        const waitDeviceOnline = async function() {
            try {
                setSetupStep('setupStepWaitForOnline');
    
                if (setupOptions.noClaim) {
                    $(thisElem).find('.waitOnlineStepClaim').hide();
                }

                $(deviceLogsElem).show();
            
                let timer1;
                let timer2;

                const clearTimers = function() {
                    if (timer1) {
                        clearInterval(timer1);
                        timer1 = null;
                    }
                    if (timer2) {
                        clearInterval(timer2);
                        timer2 = null;
                    }
                }

                timer1 = setInterval(async function() {
                    let reqObj = {
                        op: 'status'
                    };

                    let res;
                    try {
                        res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }
                    catch(e) {
                        if (e.message.includes('The device was disconnected.')) {
                            clearTimers();
                        } else {
                            console.log('control request exception', e);
                        }
                        return;
                    }
                    
                    if (res.result == 0 && res.data) {
                        const respObj = JSON.parse(res.data);

                        if (checkStatus) {
                            checkStatus(respObj);
                        }

                        if (respObj.mcc) {
                            setInfoTableItemObj(respObj);

                            if (mccmnc) {
                                for(const obj of mccmnc) {
                                    if (obj.mcc == respObj.mcc && obj.mnc == respObj.mnc) {
                                        setInfoTableItemObj(obj);                                        
                                    }
                                }
                            }                                          
                        }
                    }
                }, 2000);
                
                timer2 = setInterval(async function() {
                    let reqObj = {
                        op: 'logs'
                    };

                    let res;
                    try {
                        res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }
                    catch(e) {
                        if (e.message.includes('The device was disconnected.')) {
                            clearTimers();
                        } else {
                            console.log('control request exception', e);
                        }
                        return;
                    }
                    
                    if (res.result == 0 && res.data) {
                        if (res.data.length > 0) {
                            deviceLogs += res.data;
                            if ($(showDebuggingLogsElem).prop('checked')) {
                                $(deviceLogsTextElem).val(deviceLogs);
                                deviceLogsTextElem.scrollTop(deviceLogsTextElem[0].scrollHeight - deviceLogsTextElem.height());    
                            }
                        }
                    }
                }, 1000);

                const waitOnlineStepsElem = $(thisElem).find('.waitOnlineSteps');
    
                // waitOnlineSteps
    
                let networkReady = false;
    
                $(thisElem).find('.waitOnlineStepNetwork > td > img').css('visibility', 'visible');

                const doneUrl = '/assets/images/device-setup/ok-48.png';
                
                // Wait for online
                await new Promise(function(resolve, reject) {
                    checkStatus = function(respObj) {
                        if (respObj.netReady && !networkReady) {
                            networkReady = true;
                            $(thisElem).find('.waitOnlineStepNetwork > td > img').attr('src', doneUrl);
                            $(thisElem).find('.waitOnlineStepCloud > td > img').css('visibility', 'visible');
                        }
                        if (respObj.cloudConnected) {
                            // clearInterval(timer);
                            $(thisElem).find('.waitOnlineStepCloud > td > img').attr('src', doneUrl);
                            $(thisElem).find('.waitOnlineStepClaim > td > img').css('visibility', 'visible');
                            resolve();
                            return;
                        }
                    };
                });
    
                cloudConnectedResolve = null;
                checkStatus = null;

                if (!setupOptions.noClaim) {
                    // Claim device
                    const result = await new Promise(function(resolve, reject) {      
                        const requestObj = {
                            id: deviceInfo.deviceId
                        }
                        
                        const request = {
                            contentType: 'application/json',
                            data: JSON.stringify(requestObj),
                            dataType: 'json',
                            error: function (jqXHR) {
                                console.log('error', jqXHR);
                                reject(jqXHR.status);
                            },
                            headers: {
                                'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                                'Accept': 'application/json'
                            },
                            method: 'POST',
                            success: function (resp, textStatus, jqXHR) {
                                resolve(resp);
                            },
                            url: 'https://api.particle.io/v1/devices/'
                        };
            
                        $.ajax(request);            
                    });


                    if (result.ok) {
                        $(thisElem).find('.waitOnlineStepClaim > td > img').attr('src', doneUrl);

                        // Wait a second so the green check shows up
                        await new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve();
                            }, 1000);
                        });
                    }
                    else {
                        // TODO: Handle error. What happens if device is already claimed or 
                        // in a product? This might cause an exception, not an error
                    }
                }

    
                nameDevice();
            }
            catch(e) {
                setSetupStep('setupStepClaimFailed');
                console.log('exception', e);
            }

            
        };

        const nameDevice = async function() {
            setSetupStep('setupStepNameDevice');

            const trochees = [
                'aardvark', 'bacon', 'badger', 'banjo', 'bobcat', 'boomer', 'captain', 'chicken', 'cowboy', 'cracker',
                'cranky', 'crazy', 'dentist', 'doctor', 'dozen', 'easter', 'ferret', 'gerbil', 'hacker', 'hamster', 'hindu',
                'hobo', 'hoosier', 'hunter', 'jester', 'jetpack', 'kitty', 'laser', 'lawyer', 'mighty', 'monkey', 'morphing',
                'mutant', 'narwhal', 'ninja', 'normal', 'penguin', 'pirate', 'pizza', 'plumber', 'power', 'puppy', 'ranger',
                'raptor', 'robot', 'scraper', 'scrapple', 'station', 'tasty', 'trochee', 'turkey', 'turtle', 'vampire',
                'wombat', 'zombie'];
        
        
            const getRandomTrochee = function() {
                const arr = trochees;
                const parts = [];
                for (let i = 0; i < 2; i++) {
                    const a = Math.floor(Math.random() * arr.length);
                    parts.push(arr[a]);
                }
                return parts.join('_');
            };

            const nameInputElem = $(thisElem).find('.nameInput');
            const setNameButtonElem = $(thisElem).find('.setName');

            $(nameInputElem).val(getRandomTrochee());
            $(nameInputElem).focus();
            $(nameInputElem).select();
            
            $(nameInputElem).on('keydown', function(ev) {
                if (ev.key != 'Enter') {
                    return;
                }
    
                ev.preventDefault();
                $(setNameButtonElem).trigger('click');    
            });

            $(setNameButtonElem).on('click', async function() {
                const result = await new Promise(function(resolve, reject) {      
                    const requestObj = {
                        name: $(nameInputElem).val()
                    };
                    
                    let requestUrl;
                    if (setupOptions.addToProduct) {
                        requestUrl = 'https://api.particle.io/v1/products/' + setupOptions.productId + '/devices/' + deviceInfo.deviceId;
                    }
                    else {
                        requestUrl = 'https://api.particle.io/v1/devices/' + deviceInfo.deviceId;
                    }

                    const request = {
                        contentType: 'application/json',
                        data: JSON.stringify(requestObj),
                        dataType: 'json',
                        error: function (jqXHR) {
                            console.log('error', jqXHR);
                            reject(jqXHR.status);
                        },
                        headers: {
                            'Authorization': 'Bearer ' + apiHelper.auth.access_token,
                            'Accept': 'application/json'
                        },
                        method: 'PUT',
                        success: function (resp, textStatus, jqXHR) {
                            resolve(resp);
                        },
                        url: requestUrl
                    };
        
                    $.ajax(request);            
                });

                setupDone();
            });

            
            $(thisElem).find('.skipNaming').on('click', function() {
                setupDone();
            });

            
        };

        $(thisElem).find('.setColorButton').on('click', function() {
            const color =  $(thisElem).find('.colorSelector').val();
            const red = parseInt(color.substr(1, 2), 16);
            const green = parseInt(color.substr(3, 2), 16);
            const blue = parseInt(color.substr(5, 2), 16);

            const cmd = red + ',' + green + ',' + blue;


            apiHelper.particle.callFunction({ deviceId: deviceInfo.deviceId, name: 'setColor', argument: cmd, auth: apiHelper.auth.access_token  }).then(
                function (data) {
                    ga('send', 'event', 'LED Color Test', 'Success');
                    setStatus('Success! (' + data.body.return_value + ')');
                    setTimeout(function() {
                        setStatus('');
                    }, 4000);                
                },
                function (err) {
                    ga('send', 'event', 'LED Color Test', 'Error', err);
                    setStatus('Error: ' + err);
                    setTimeout(function() {
                        setStatus('');
                    }, 10000);                
                }
            );    
        });

        const setupDone = async function() {
            setSetupStep('setupStepDone');

            if (setupOptions.addToProduct) {
                $(thisElem).find('.setupStepDoneNonProduct').hide();
            }
            else {
                $(thisElem).find('.setupStepDoneNonProduct').show();
            }
            

        };
    });

});
