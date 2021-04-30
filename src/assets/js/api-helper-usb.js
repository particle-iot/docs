

$(document).ready(function () {
    // auth not required

    const noWebUsbError = 'Your web browser does not support WebUSB and cannot access Particle devices using USB.<br/>' +
        'One alternative is to use the <a href="/tutorials/developer-tools/cli/">Particle CLI</a>.';

    let deviceRestoreInfo;

    if ($('.apiHelperUsbRestoreDevice').each(function() {
        const thisPartial = $(this);

        const selectElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceSelect');
        const versionElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceVersion');
        const restoreElem = $(thisPartial).find('.apiHelperUsbRestoreDeviceRestore');

        const setStatus = function(str) {
            $(thisPartial).find('.apiHelperUsbRestoreDeviceStatus').html(str);
        }

        if (!navigator.usb) {
            $(selectElem).prop('disabled', true);
            setStatus(noWebUsbError);
            return;
        }

        let usbDevice;
        let platformObj;

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
                    return;
                }
                $(versionElem).html('');
                for(let ver of versionArray) {
                    versionElem.append('<option name="' + ver + '">' + ver + '</option>');
                }
                
                $(versionElem).prop('disabled', false);
                $(restoreElem).prop('disabled', false);
        
            }
            catch(e) {
                console.log('no device selected', e);
            }        
        }));


        if ($(restoreElem).on('click', async function () {
            const version = $(versionElem).val();

            const zipUrl = '/assets/files/device-restore/' + version + '/' + platformObj.name + '.zip';

            setStatus('Downloading restore image...');

            const zipFs = new zip.fs.FS();

            await zipFs.importHttpContent(zipUrl);
        
            console.log('zipFs', zipFs);

            // System parts
            /*
            for(let ii = 1; ii <= 3; ii++) {
                const zipEntry = zipFs.find('system-part' + ii + '.bin');
                if (!zipEntry) {
                    break;
                }
                console.log('found system part ' + ii);

                setStatus('Updating System Part ' + ii + '...');

                const part = await zipEntry.getUint8Array();

                await usbDevice.updateFirmware(part, {});

                console.log('complete!');
            }
            */

            // bootloader
            
            // softdevice

            // user firmware


            /*
            const hexTextResp = await fetch(hexUrl);
            const hexText = await hexTextResp.text();
    
            setStatus('Processing restore image...');

            let baseAddr = 0;
        
            let fullMemoryMap = new Uint8Array(1024 * 1024);

            hexText.split(/[\r\n]/).forEach(function(lineData) {        
                lineData = lineData.trim();
                if (lineData.length == 0) {
                    return;
                }
                if (lineData.charAt(0) != ':') {
                    return;
                }
        
                const buf = new Uint8Array(lineData.substr(1).match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
               
                const len = buf[0]; 
                const addr = (buf[1] << 8) | buf[2]; // Big Endian 16-bit
                const recType = buf[3];
                // data begins at 4
                // checksum is last byte
                const checksum = buf[4 + len];
                
                const calcChecksum = calculateBufferChecksum(buf);
        
                if (calcChecksum == checksum) {
                    if (recType == 4 && len == 2) {
                        // Extended linear address
                        baseAddr = (buf[4] << 8) | buf[5]; // Big Endian 16-bit
                        baseAddr <<= 16;
                        // console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
                    }

                    // STM32 devices have 0x8000000 as the address of flash, and we want to ignore that
                    baseAddr &= 0x07ffffff; 

                    if (baseAddr < fullMemoryMap.byteLength) {
                        for(let ii = 0; ii < len; ii++) {
                            fullMemoryMap[baseAddr + addr + ii] = buf[4 + ii];
                        }                
                    }
                    else {
                        console.log('ignoring '+ (baseAddr + addr));
                    }
                    
                    // console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
                }
                else {
                    // console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
                }
            });
        
            setStatus('Preparing to flash...');

            if (platformObj.id == 6 || platformObj.id == 8) {
                // Photon/P1
                let part;

                // System Part 1	0x8020000	0x8060000	256 KB
                setStatus('Flashing system part 1...');
                part = new Uint8Array(256 * 1024);
                for(let ii = 0; ii < 256 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0x20000 + ii];
                }
                try {
                    await usbDevice.updateFirmware(part, {});
                }
                catch(e) {
                    console.log('exception', e);
                }

                // System Part 2	0x8060000	0x80A0000	256 KB
                part = new Uint8Array(256 * 1024);
                for(let ii = 0; ii < 256 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0x60000 + ii];
                }
                await usbDevice.updateFirmware(part, {});

                // Bootloader	0x8000000	0x8004000	16 KB

                // User Part	0x80A0000	0x80C0000	128 KB
                part = new Uint8Array(128 * 1024);
                for(let ii = 0; ii < 128 * 1024; ii++) {
                    part[ii] = fullMemoryMap[0xa0000 + ii];
                }
                await usbDevice.updateFirmware(part, {});
            }
            else
            if (platformObj.id == 10) {
                // Electron/E Series
            }
            else {
                // Gen 3

            }
            */

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
        console.log('deviceRestoreInfo', deviceRestoreInfo);
    });


});

