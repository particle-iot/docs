
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

        const setupSelectDeviceButtonElem = $(thisElem).find('.setupSelectDeviceButton');
        const setupStepElem = $(thisElem).find('.setupStep');

        let usbDevice;
        let deviceInfo = {};

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

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);

                
                if (usbDevice.isCellularDevice) {
                    deviceInfo.cellular = true;
                    deviceInfo.iccid = await usbDevice.getIccid();

                    console.log('deviceInfo', deviceInfo);
                    activateSim();
                }
                else {
                    deviceInfo.wifi = true;

                }


            }
            catch(e) {
                console.log('exception', e);
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
                        console.log('active already', result);
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

                // Prepare firmware

                // Flash device
                setStatus('Flashing device...');
                        
                let options = {
                    eventCategory: 'USB Device Setup',
                    platformVersionInfo: deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice),
                    setStatus,
                    version: '2.2.0', // FIXME: Latest LTS? Or make selectable?
                    setupBit: 'done',
                    progressUpdate: function(msg, pct) {
                        $(thisElem).find('.setupStepFlashDeviceStatus').text(msg);
                        $(thisElem).find('.setupStepFlashDeviceProgress').val(pct);
                    }
                };

            
                const restoreResult = await dfuDeviceRestore(usbDevice, options);

                console.log('restoreResult', restoreResult);

                if (restoreResult.ok) {
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

        const configureWiFi = async function() {
            if (!deviceInfo.wifi) {
                waitDeviceOnline();
                return;
            }

            setSetupStep('setupStepConfigureWiFi');

            // Start Wi-Fi scan

            // Display results

            // Set Wi-Fi

        };

        const waitDeviceOnline = async function() {
            setSetupStep('setupStepWaitForOnline');

            // Wait for online
            
            
        };

        const claimAndNameDevice = async function() {
            setSetupStep('setupStepClaimAndNameDevice');

            
        };

        const setupDone = async function() {
            setSetupStep('setupStepDone');
            


        };
    });

});
