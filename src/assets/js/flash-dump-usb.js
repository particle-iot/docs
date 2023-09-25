
$(document).ready(function() {
    if ($('.apiHelper').length == 0) {
        return;
    }
    const gaCategory = 'Flash Dump USB';

    if (!navigator.usb) {
        analytics.track('No WebUSB', {category:gaCategory, label:navigator.userAgent});
        $('.setupBrowserError').show();
        return;
    }

    $('.apiHelperFlashDumpUsb').each(function() {
        const thisElem = $(this);

        const selectDeviceElem = $(thisElem).find('.apiHelperFlashDumpUsbSelect');

        const typeSelectElem = $(thisElem).find('.apiHelperUsbFlashDumpUsbTypeSelect');
        const extFlashOptionElem = $(typeSelectElem).find('option[value="ext"]');

        const actionButtonElem = $(thisElem).find('.actionButton');

        const progressTrElem = $(thisElem).find('.apiHelperFlashDumpUsbProgressTr');
        const progressElem = $(progressTrElem).find('progress');

        const statusElem = $(thisElem).find('.apiHelperFlashDumpUsbStatus');

        const setStatus = function(s) {
            $(statusElem).text(s);
        }

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

                setStatus('Select device...');

                const nativeUsbDevice = await navigator.usb.requestDevice({ filters: filters })
        
                usbDevice = await ParticleUsb.openNativeUsbDevice(nativeUsbDevice, {});

                deviceInfo.deviceId = usbDevice.id;
                deviceInfo.platformId = usbDevice.platformId;
                deviceInfo.firmwareVersion = usbDevice.firmwareVersion;
                deviceInfo.platformVersionInfo = apiHelper.getRestoreVersions(usbDevice);
    
                // platformVersionInfo.name, .title, .id, .gen, .isTracker, .versionArray

                if (deviceInfo.platformVersionInfo.gen == 2) {
                    if ($(typeSelectElem).val() == 'ext') {
                        $(typeSelectElem).val('main');
                    }
                    $(extFlashOptionElem).prop('disabled', true);
                }
                else {
                    $(extFlashOptionElem).prop('disabled', false);
                }
                
                setStatus('');

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



            let deviceRestoreOptions = {
                flashBackup: {
                    type: typeSelect,
                    saveAs: true, // TEMPORARY
                    filename: 'flash.bin' // TEMPORARY
                },
                eventCategory: gaCategory,
                version: '',
                platformVersionInfo: deviceInfo.platformVersionInfo,
                // saveAs, filename
                progressShowHide: function(show) {
                    if (show) {
                        $(progressTrElem).show();
                    }
                    else {
                        $(progressTrElem).hide();
                    }
                },
                progressUpdate: function(msg, pct, obj) {
                    // obj.func, .pct, .partName
                    $(progressElem).val(obj.pct);
                },
                setStatus: function(s) {
                    setStatus(s);
                }
            };
            switch(typeSelect) {
                case 'main':
                    if (deviceInfo.platformVersionInfo.gen == 2) {
                        deviceRestoreOptions.flashBackup.startAddress = 0x08000000;
                    }
                    else {
                        deviceRestoreOptions.flashBackup.startAddress = 0x00000000;
                    }
                    deviceRestoreOptions.flashBackup.maxSize = 0x100000;

                    break;

                case 'ext':
                    deviceRestoreOptions.flashBackup.startAddress = 0x80000000;
                    deviceRestoreOptions.flashBackup.maxSize = 0x400000;
                    if (usbDevice.platformId == 26) {
                        // Tracker
                        deviceRestoreOptions.flashBackup.maxSize = 0x800000;
                    }
                    break;

                case 'dct':
                    deviceRestoreOptions.flashBackup.startAddress = 0;
                    deviceRestoreOptions.flashBackup.maxSize = 4258;
                    break;
            }


            await dfuDeviceRestore(usbDevice, deviceRestoreOptions);

            setStatus('Download complete!');
            
            $(typeSelectElem).prop('disabled', false);
            $(selectDeviceElem).prop('disabled', false);
            
        });
    });
});

