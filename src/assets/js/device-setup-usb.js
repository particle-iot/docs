
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }

    if (!navigator.usb) {
        ga('send', 'event', eventCategory, 'No WebUSB', navigator.userAgent);
        $('.setupBrowserError').show();
        return;
    }

    const stepClasses = [
        'setupStepSelectDevice'
    ];

    $('.apiHelperDeviceSetupUsb').each(function() {
        const thisElem = $(this);

        const gaCategory = 'USB Device Setup';

        const setupSelectDeviceButtonElem = $(thisElem).find('.setupSelectDeviceButton');
        const setupStepElem = $(thisElem).find('.setupStep');

        let usbDevice;
        let deviceInfo = {};
        let userFirmwareBinary;

        const setStatus = function(status) {
            $(thisElem).find('.setupStatus').text(status);
        }

        const setupSteps = [
            'setupStepSelectDevice',
            'setupStepCheckDevice',
            'setupStepActivateSim',
            'setupStepFlashDevice',
            'setupStepConfigureWiFi',
            'setupStepWaitForOnline',
            'setupStepDone'
        ];
        
        const setSetupStep = function(whichStep) {
            $(setupStepElem).children().each(function() {
                $(this).hide();
            });

            $(setupStepElem).children('.' + whichStep).show();
        };

        setSetupStep('setupStepSelectDevice');

        const selectDevice = async function() {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
            try {
                $(setupSelectDeviceButtonElem).prop('disabled', false);
        
                if (usbDevice) {
                    await usbDevice.close();
                    usbDevice = null;
                }

                setStatus('Select device to set up...');

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
        };
        $(setupSelectDeviceButtonElem).on('click', selectDevice);

        const checkDevice = async function() {
            try {
                setSetupStep('setupStepCheckDevice');

                setStatus('Checking device...');

                // TODO: Add a info pane if this takes longer than ~5 seconds
                // Possibly try resetting the device

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);
                deviceInfo.targetVersion = '2.2.0'; // FIXME: Latest LTS? Or make selectable?
                
                if (usbDevice.isCellularDevice) {
                    deviceInfo.cellular = true;
                    deviceInfo.iccid = await usbDevice.getIccid();

                    console.log('deviceInfo', deviceInfo);
                    activateSim();
                }
                else {
                    deviceInfo.wifi = true;
                    flashDevice();
                }

                

            }
            catch(e) {
                console.log('exception', e);
                // TODO: Handle errors like UsbError here
                // UsbError {jse_shortmsg: 'IN control transfer failed', jse_cause: DOMException: The device was disconnected., jse_info: {…}, message: 'IN control transfer failed: The device was disconnected.', stack: 'VError: IN control transfer failed: The device was…://ParticleUsb/./src/usb-device-webusb.js?:81:10)'}

            }
        };

        const checkSim = async function() {

        };

        const activateSim = async function() {
            setSetupStep('setupStepActivateSim');

            let needToActivate = false;
            let alreadyOwned = false;
            let clockTimer;
            let clockStart;

            const startClock = function() {
                $(thisElem).find('.setupStepActivateSimWaiting').show();

                clockTimer = setInterval(function() {
                    const elapsedMs = new Date().getTime() - clockStart.getTime();

                    $(thisElem).find('.setupStepActivateSimTimer').text(elapsedMs / 1000);
                }, 1000);
            };

            while(true) {
                try {
                    setStatus('Checking SIM...');
    
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
                        flashDevice();
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

                        const result = await apiHelper.particle.activateSIM({ auth: apiHelper.auth.access_token, iccid: deviceInfo.iccid});
        
                        console.log('result', result);
                    }
                    catch(e) {
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

                // Flash device
                setStatus('Flashing device...');
                

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
                        console.log('dfuParts', dfuParts);

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

                console.log('restoreResult', restoreResult);
            
                if (restoreResult.ok) {
                    await reconnectToDevice();

                    // If this is a cellular device, configureWiFi() jumps immediately into waitDeviceOnline()
                    configureWiFi();      
                }
                else {
                    console.log('do something for dfu error');
                }
                
            }
            catch(e) {
                console.log('exception', e);
            }
        };

        const reconnectToDevice = async function() {
            setSetupStep('setupStepReconnecting');

            setStatus('Waiting for device to restart...');

            let nativeUsbDevice;

            for(let tries = 0; tries < 3 && !nativeUsbDevice; tries++) {
                await new Promise(function(resolve) {
                    setTimeout(function() {
                        resolve();
                    }, 8000);
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
                setStatus('Authorize access to the device again');   
                
                console.log('TODO: display UI for to click button to reconnect');
                return;
            }
            
            usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});

            console.log('reconnectToDevice complete');
        };

        const configureWiFi = async function() {
            if (!deviceInfo.wifi) {
                waitDeviceOnline();
                return;
            }
            setSetupStep('setupStepConfigureWiFi');

            $(thisElem).find('.networkTable > tbody').html('');

            setStatus('Scanning for Wi-Fi networks...');


            // Start Wi-Fi scan
            let reqObj = {
                op: 'wifiScan'
            };

            await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

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

            const setCredentials = async function() {
                $(setCredentialsElem).prop('disabled', true);

                setStatus('Setting Wi-Fi credentials...');

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
                    op: 'wifiConnect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                reqObj = {
                    op: 'particleConnect',
                };
                await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));

                waitDeviceOnline();
                return;
            };

            // TODO: Make a Return in the password field set credentials

            $(setCredentialsElem).on('click', setCredentials);

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
                    
                    if (respObj.done) {
                        console.log('done!');
                        break;
                    }

                    if (respObj.ssid) {
                        console.log('respObj', respObj);

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
    
                            // Radio button
                            colElem = document.createElement('td');
                            {
                                const radioElem = document.createElement('input');
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
                                rowElem
                            };
                        }
                        

                    }
                    else {
                        // Wait a bit to try again
                        await new Promise(function(resolve) {
                            setTimeout(function() {
                                resolve();
                            }, 1000);
                        });
                    } 


                }

            }

            setStatus('Waiting for you to select one...');



            // Set Wi-Fi

        };

        const waitDeviceOnline = async function() {
            try {
                setSetupStep('setupStepWaitForOnline');

                console.log('in waitDeviceOnline');
                setStatus('Waiting for device to come online...');   
    
                const waitOnlineStepsElem = $(thisElem).find('.waitOnlineSteps');
    
                // waitOnlineSteps
    
                let networkReady = false;
    
                // Wait for online
                await new Promise(function(resolve, reject) {
                    const timer = setInterval(async function() {
                        let reqObj = {
                            op: 'status'
                        };
        
                        const res = await usbDevice.sendControlRequest(10, JSON.stringify(reqObj));
                        if (res.result == 0 && res.data) {
                            const respObj = JSON.parse(res.data);
        
                            console.log('status', respObj);
        
                            if (respObj.cloudConnected) {
                                clearInterval(timer);
                                $(thisElem).find('.waitOnlineStepCloud > td > img').css('visibility', 'visible');
                                resolve();
                                return;
                            }
                            if (respObj.netReady && !networkReady) {
                                networkReady = true;
                                $(thisElem).find('.waitOnlineStepNetwork > td > img').css('visibility', 'visible');
                            }
                        }
                    }, 2000);
                });
    
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
                    // Wait a second so the green check shows up
                    await new Promise(function(resolve) {
                        setTimeout(function() {
                            resolve();
                        }, 1000);
                    });
                }
    
                nameDevice();
            }
            catch(e) {
                console.log('exception', e);
            }

            
        };

        const nameDevice = async function() {
            setSetupStep('setupStepNameDevice');

            setStatus('Name device...');   
            
        };

        const setupDone = async function() {
            setSetupStep('setupStepDone');
            
            setStatus('Done!.');   


        };
    });

});
