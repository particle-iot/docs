

$(document).ready(function () {
    // auth not required

    if ($('.apiHelperUsbSetupDone').each(function () {
        const thisPartial = $(this);

        const findElem = $(thisPartial).find('.apiHelperUsbSetupDoneSelect');

        if ($(findElem).on('click', function () {
            markSetupDone();
        }));
    }));


    if ($('.apiHelperUsbTest').each(function () {
        const thisPartial = $(this);

        const findElem = $(thisPartial).find('.apiHelperUsbTestFind');

        if ($(findElem).on('click', function () {
            testList();

        }));
    }));


});

async function markSetupDone() {
    console.log('markSetupDone');
    
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
        console.log('device', usbDevice);

        const dev = await ParticleUsb.openDeviceById(usbDevice.serialNumber, {});
        console.log('dev', dev);
    }
    catch(e) {
        console.log('no device selected', e);
    }

}

async function testSelect() {
    const filters = [
        {vendorId: 0x2b04}
    ];

    try {
        const usbDevice = await navigator.usb.requestDevice({ filters: filters })
        console.log('device', usbDevice);

        const dev = await ParticleUsb.openDeviceById(usbDevice.serialNumber, {});
        console.log('dev', dev);
    }
    catch(e) {
        console.log('no device selected', e);
    }
}

async function testList() {
    const devices = await ParticleUsb.getDevices();
    for (let device of devices) {
        console.log('device', device); // Prints device type, e.g. "Photon"
    }
}
