

$(document).ready(function () {
    // auth not required

    const noWebUsbError = 'Your web browser does not support WebUSB and cannot access Particle devices using USB.<br/>' +
        'One alternative is to use the <a href="/tutorials/developer-tools/cli/">Particle CLI</a>.';


    if ($('.apiHelperUsbRestoreDevice').each(function() {
        const thisPartial = $(this);

        const selectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelect');
        const versionElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion');
        const restoreElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion');

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbRestoreDeviceStatus').html(str);
        }

        if (!navigator.usb) {
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        let usbDevice;

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
                
                $(versionElem).prop('disabled', false);
                $(restoreElem).prop('disabled', false);
        
            }
            catch(e) {
                console.log('no device selected', e);
            }        
        }));

        if ($(restoreElem).on('click', async function () {
            console.log('restore!');

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
            }        }));
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


});

