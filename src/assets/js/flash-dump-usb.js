
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    const gaCategory = 'Flash Dump USB';

    if (!navigator.usb) {
        ga('send', 'event', gaCategory, 'No WebUSB', navigator.userAgent);
        $('.setupBrowserError').show();
        return;
    }

    $('.apiHelperFlashDumpUsb').each(function() {
        const thisElem = $(this);

        const selectDeviceElem = $(thisElem).find('.apiHelperFlashDumpUsbSelect');
        const typeSelectElem = $(thisElem).find('.apiHelperUsbFlashDumpUsbTypeSelect');
        const actionButtonElem = $(thisElem).find('.actionButton');

        let usbDevice;
        let deviceInfo = {};

        $(selectDeviceElem).on('click', async function() {
            const filters = [
                {vendorId: 0x2b04}
            ];
        
            $(actionButtonElem).prop('disabled', true);

            try {
                $(selectDeviceElem).prop('disabled', false);
        
            
                if (usbDevice) {
                    await usbDevice.close();
                    usbDevice = null;
                }

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openDeviceById(nativeUsbDevice, {});

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);
    
                console.log('deviceInfo', deviceInfo);

                $(actionButtonElem).prop('disabled', false);
            }
            catch(e) {
                if (e.message.includes('No device selected')) {
                    return;
                }
                console.log('exception', e);
            }
        });

        $(actionButtonElem).on('click', async function() {
            const typeSelect = $(typeSelectElem).val();

            $(actionButtonElem).prop('disabled', true);
            $(typeSelectElem).prop('disabled', true);
            $(selectDeviceElem).prop('disabled', true);



            console.log('typeSelect ' + typeSelect);


            // Enable when done:
            /*
            $(typeSelectElem).prop('disabled', false);
            $(selectDeviceElem).prop('disabled', false);
            */
        });
    });
});
