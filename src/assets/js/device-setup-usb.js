
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


        const setupSelectDeviceButtonElem = $(thisElem).find('.setupSelectDeviceButton');
        const setupStepElem = $(thisElem).find('.setupStep');

        let usbDevice;
        let deviceInfo = {};
        let userFirmwareBinary;
        let mccmnc;

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

        $(setupSelectDeviceButtonElem).on('click', async function() {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
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
                deviceInfo.targetVersion = '2.2.0'; // FIXME: Latest LTS? Or make selectable?

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

                flashDevice();
            }
            catch(e) {
                console.log('exception', e);
                // TODO: Handle errors like UsbError here
                // UsbError {jse_shortmsg: 'IN control transfer failed', jse_cause: DOMException: The device was disconnected., jse_info: {…}, message: 'IN control transfer failed: The device was disconnected.', stack: 'VError: IN control transfer failed: The device was…://ParticleUsb/./src/usb-device-webusb.js?:81:10)'}
                
                setSetupStep('setupStepManualDfu');
            }
        };

        const activateSim = async function() {
            setSetupStep('setupStepActivateSim');

            let needToActivate = false;
            let alreadyOwned = false;
            let clockTimer;
            let clockStart;

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

            while(true) {
                try {
                    reqObj = {
                        op: 'iccid'
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
                        showStep('setupStepActivateSimGetSlow');

                        reqObj = {
                            op: 'cellularReset'
                        } 
                        await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                        await new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve();
                            }, 5000);
                        });
                        continue;
                    }

                    deviceInfo.iccid = respObj.iccid;

                    console.log('iccid', deviceInfo.iccid);

                    showStep('setupStepActivateSimChecking');


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
                            url: 'https://api.particle.io/v1/sims/' + deviceInfo.iccid
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
                            console.log('activation in progress', result);
                            setStatus('SIM is being activated...');
                            if (!clockStart) {
                                clockStart = new Date(result.last_status_change_action_on);
                                startClock();
                            }
                        }
                        else {
                            console.log('need to activate', result)
                            needToActivate = true;
                        }
                    }
                    else {
                        console.log('active now', result);


                        localStorage.removeItem(storageActivateSim);

                        reqObj = {
                            op: 'connect',
                        };
                        await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                        waitDeviceOnline();
        
                        break;
                    }                            
    
                    // result.statusCode is 200 if not activated, and 205 if activated? Weird.
                }
                catch(e) {
                    if (e == 404) {
                        // 
                        console.log('SIM not active in account, need to activate');
                        needToActivate = true;
                    }
                    else {
                        console.log('exception', e);
                        break;    
                    }
                }
                
    
                if (needToActivate) {
                    try {
                        setStatus('Activating SIM...');

                        clockStart = new Date();
                        startClock();

                        const stor = {
                            deviceId: deviceInfo.deviceId,
                            start: clockStart.getTime() / 1000
                        };
                        localStorage.setItem(storageActivateSim, JSON.stringify(stor));

                        const result = await apiHelper.particle.activateSIM({ auth: apiHelper.auth.access_token, iccid: deviceInfo.iccid});
        
                        console.log('result', result);

                        showStep('setupStepActivateSimWaiting');

                    }
                    catch(e) {
                        // 403 if SIM is a product SIM I think
                        if (e.message.includes('408')) {
                            console.log('408 - activation in progress');
                            continue;
                        }
                        else
                        if (e.message.includes('401')) {
                            console.log('401 error - expired token?');
                        }
                        else {
                            console.log('exception', e);
                        }
                        break;
                    }    
                }
                else {
                    // Wait a bit to try again
                    await new Promise(function(resolve) {
                        setTimeout(function() {
                            resolve();
                        }, 30000);
                    });
                }
                
            }

            if (clockTimer) {
                clearInterval(clockTimer);
            }
            
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
                    onAuthorizeDFU: function() {
                        showStep('setupStepFlashDeviceAuthorizeDFU');
                    },
                    onStartFlash: function() {
                        showStep('setupStepFlashDeviceFlashing');
                    },
                    progressUpdate: function(msg, pct, obj) {
                        // obj.pct
                        // obj.func == 'erase' else programming
                        // obj.partName == system-part1, system-part2, system-part3, bootloader, softdevice, tinker
                        // (obj.partName is tinker even for a custom binary)
                        
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
                    await reconnectToDevice();


                    if (deviceInfo.wifi) {

                        configureWiFi();                              
                    }
                    else {
                        activateSim();
                    }
                }
                else {
                    console.log('do something for dfu error');
                }
                
            }
            catch(e) {
                console.log('exception', e);
            }
        };

        const continueDfuElem = $(thisElem).find('.continueDfu');
        $(continueDfuElem).on('click', flashDevice);

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
                    const nativeUsbDevices = await navigator.usb.getDevices()

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
        };

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
                    console.log('do something for error response', res);
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

            let blob = new Blob([deviceLogs], {type:'text/plain'});
            saveAs(blob, 'logs.txt');	

            $(downloadLogsElem).prop('disabled', false);
        });

        const waitDeviceOnline = async function() {
            try {
                setSetupStep('setupStepWaitForOnline');
    

                $(deviceLogsElem).show();
            
                const timer = setInterval(async function() {
                    let reqObj = {
                        op: 'status'
                    };

                    let res;
                    try {
                        res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                    }
                    catch(e) {
                        clearInterval(timer);
                    }
                    
                    if (res.result == 0 && res.data) {
                        const respObj = JSON.parse(res.data);

                        // console.log('status', respObj);
                        if (checkStatus) {
                            checkStatus(respObj);
                        }

                        if (respObj.logs) {
                            deviceLogs += respObj.logs;
                            if ($(showDebuggingLogsElem).prop('checked')) {
                                $(deviceLogsTextElem).val(deviceLogs);
                                deviceLogsTextElem.scrollTop(deviceLogsTextElem[0].scrollHeight - deviceLogsTextElem.height());    
                            }
                        }
                        if (respObj.mcc) {
                            $(thisElem).find('.cellularInfo').show();

                            console.log('mcc=' + respObj.mcc + ' mnc=' + respObj.mnc + ' tech=' + respObj.tech + ' band=' + respObj.band);
                            $(thisElem).find('.cellularInfoTechnology').text(respObj.tech);
                            $(thisElem).find('.cellularInfoBand').text(respObj.band);

                            if (mccmnc) {
                                for(const obj of mccmnc) {
                                    if (obj.mcc == respObj.mcc && obj.mnc == respObj.mnc) {
                                        console.log('country=' + obj.country + ' carrier=' + obj.name);
                                        $(thisElem).find('.cellularInfoCountry').text(obj.country);
                                        $(thisElem).find('.cellularInfoCarrier').text(obj.name);
                                        
                                    }
                                }
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

                console.log('claim result', result);


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
    
                nameDevice();
            }
            catch(e) {
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
                        url: 'https://api.particle.io/v1/devices/' + deviceInfo.deviceId
                    };
        
                    $.ajax(request);            
                });

                console.log('name result', result);
                setupDone();
            });

            
            $(thisElem).find('.skipNaming').on('click', function() {
                setupDone();
            });

            
        };

        const setupDone = async function() {
            setSetupStep('setupStepDone');
            

        };
    });

});
