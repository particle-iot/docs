
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

        const activateSim = async function() {
            try {
                setSetupStep('setupStepActivateSim');

                setStatus('Activating SIM...');
            }
            catch(e) {
                console.log('exception', e);
            }

            
        };

        const flashDevice = async function() {
            try {
                setSetupStep('setupStepFlashDevice');

                setStatus('Flashing device...');
                
            }
            catch(e) {
                console.log('exception', e);
            }
        };
    });

});
