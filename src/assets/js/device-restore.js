$(document).ready(function() {

    if (navigator.usb) {
        $('#errorDiv').hide();
        $('#progressDiv').hide();            
    }
    else {
        $('#deviceRestoreTable').hide();

        let html = '<p>Your web browser does not support WebUSB and cannot access the Particle debugger and cannot use Device Restore.</p>';
        html += '<p>You can download restore images and use an alternate flashing method from the <a href="/reference/developer-tools/jtag/">JTAG Reference</a>.</p>';

        $('#errorDiv').html(html);
        $('#errorDiv').show();
        $('#progressDiv').hide();    

        analytics.track('No WebUSB', {category:'Device Restore JTAG', label:navigator.userAgent});
    }

    if ($('#hexGeneratorForm').length > 0) {
        const buttonEnable = function() {
            const imageFile = $('input[name="imageFile"]:checked').val();
            const userBinFiles = $('#userBinFile').prop('files');
            if (!imageFile || !userBinFiles || userBinFiles.length != 1) {
                // Not valid settings
                $('#hexGeneratorForm').find('button').attr('disabled', 'disabled');
            }
            else {
                $('#hexGeneratorForm').find('button').removeAttr('disabled');
            }
        };
        
        $('input').on('change', buttonEnable);

        buttonEnable();
    }
});


async function startFlash(platform, version) {
    $('#deviceRestoreTable').hide();
    $('#progressDiv').hide();

    $('#errorDiv').text('Select the Particle Debugger to use to flash your device');
    $('#errorDiv').show();

    try {
        const debuggerDevice = await navigator.usb.requestDevice({
            filters: [{vendorId: 0xD28}]
        });
        getBinary(debuggerDevice, platform, version);
    } catch (error) {
        $('#deviceRestoreTable').show();
        $('#progressDiv').hide();
        $('#errorDiv').text('Error opening debugger (' + error + ')');
        analytics.track('No Debugger Selected', {category:'Device Restore JTAG'});
    }
}

function getBinary(debuggerDevice, platform, version) {
    $.ajax({
        type: 'GET',
        url: '/assets/files/device-restore/' + version + '/' + platform + '.hex',
        dataType: 'text',
        success: function(data) {
            analytics.track('JTAG Restore Started', {category:'Device Restore JTAG', label:platform + '/' + version});
            updateDevice(debuggerDevice, data);
        },
        error: function() {
            $('#deviceRestoreTable').show();
            $('#progressDiv').hide();
            $('#errorDiv').text('Failed to download binary for ' + platform + ' version ' + version);
            analytics.track('Download Failed', {category:'Device Restore JTAG', label:platform + '/' + version});
        }
    });	
}

async function updateDevice(debuggerDevice, data) {
    const transport = new DAPjs.WebUSB(debuggerDevice);
    const target = new DAPjs.DAPLink(transport);


    $('#progressDiv').show();

    let nextProgress = 0;
    target.on(DAPjs.DAPLink.EVENT_PROGRESS, function(progress) {
        // setTransfer(progress);
        if (progress >= nextProgress) {
            nextProgress += 0.02;
            $('#progressBar').val(progress * 100);
        }
    });

    try {
        // Push binary to board
        $('#errorDiv').text('Flashing file...');
        await target.connect();

        let arrayBuf = new ArrayBuffer(data.length);
        let bufView = new Uint8Array(arrayBuf);
        for(let ii = 0; ii < data.length; ii++) {
            bufView[ii] = data.charCodeAt(ii);
        }
        await target.flash(arrayBuf);

        await target.disconnect();


        $('#progressDiv').hide();
        $('#deviceRestoreTable').show();
        $('#errorDiv').text('Flash complete!');
        analytics.track('JTAG Restore Success', {category:'Device Restore JTAG'});
    } catch (error) {
        $('#progressDiv').hide();
        $('#deviceRestoreTable').show();
        $('#errorDiv').text('Error flashing (' + error + ')');
        analytics.track('JTAG Restore Error', {category:'Device Restore JTAG', label:error});
    }
}

function downloadHex() {
    // Used from hex-generator.md

    $('#errorDiv').text('');
    $('#errorDiv').show();

    const imageFile = $('input[name="imageFile"]:checked').val();
    if (!imageFile) {
        $('#errorDiv').text('You must select the device platform and version to base your image on.');
        return;
    }

    const userBinFiles = $('#userBinFile').prop('files');
    if (!userBinFiles || userBinFiles.length != 1) {
        $('#errorDiv').text('You must select a user firmware binary file.');
        return;
    }

    $.ajax({
        type: 'GET',
        url: '/assets/files/device-restore/' + imageFile,
        dataType: 'text',
        success: function(data) {
            generateHex(userBinFiles[0], data);
        },
        error: function() {
            $('#errorDiv').text('Failed to download binary ' + imageFile);
        }
      });	
}

function calculateBufferChecksum(buf) {
    // Last byte of buf is the checksum, so don't include that in
    // the checksum (buf.length - 1)
    let sum = 0;
    for(let ii = 0; ii < (buf.length - 1); ii++) {
        sum += buf[ii];
    }

    // Checksum is sum of all bytes, then two's complement
    // (invert all of the bits and add 1)
    return (~sum + 1) & 0xff;
}

function generateHex(userBinFile, hexData) {
    let hexDataOffset = 0;
    let baseAddr = 0;
    let startUserPartAddr = -1;
    let hexDataUserPartStart = -1;
    let hexDataUserPartEnd = -1;
    let hexDataBaseAddrStart = -1;
    let inUserPart = false;

    hexData.split(/[\r\n]/).forEach(function(lineData) {
        const lineStartOffset = hexDataOffset;
        hexDataOffset += lineData.length + 1;

        lineData = lineData.trim();
        if (lineData.length == 0) {
            return;
        }
        if (lineData.charAt(0) != ':') {
            return;
        }

        // https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
        const buf = new Uint8Array(lineData.substr(1).match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
       
        const len = buf[0]; 
        const addr = (buf[1] << 8) | buf[2]; // Big Endian 16-bit
        const recType = buf[3];
        // data begins at 4
        // checksum is last byte
        const checksum = buf[4 + len];

        // User firmware binary locations:
        // 0x00b4000 Gen 3 (256K)
        // 0x00d4000 Gen 3 (128K)
        // 0x8080000 Electron/E Series
        // 0x80a0000 Photon/P1


        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 4 && len == 2) {
                // Extended linear address
                baseAddr = (buf[4] << 8) | buf[5]; // Big Endian 16-bit
                baseAddr <<= 16;
                // console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
                hexDataBaseAddrStart = lineStartOffset;
            }
            if (inUserPart) {
                if (recType == 0x01) {
                    // Leaving user part
                    // console.log('end user part at ' + lineStartOffset);
                    hexDataUserPartEnd = lineStartOffset;
                    inUserPart = false;
                }
            }

            if (recType == 0) {
                if (hexDataBaseAddrStart >= 0) {

                    if (baseAddr == 0xb0000 && addr == 0x4000) {
                        // console.log('start of gen 3 256K user part ' + hexDataOffset);
                    }
                    else
                    if (baseAddr == 0xd0000 && addr == 0x4000) {
                        // console.log('start of gen 3 128K user part ' + hexDataOffset);
                    }
                    else
                    if (baseAddr == 0x8080000 && addr == 0) {
                        // console.log('maybe start of electron user part ' + hexDataOffset);
                    }
                    else
                    if (baseAddr == 0x80a0000 && addr == 0) {
                        // console.log('start of photon/p1 user part ' + hexDataOffset);
                    }
                    else {
                        // Nothing else to do
                        return;
                    }
                    hexDataUserPartStart = hexDataBaseAddrStart;
                    hexDataBaseAddrStart = -1;

                    startUserPartAddr = baseAddr + addr;
                    inUserPart = true;
                }
            }
    
            // console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
        }
        else {
            // console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
    });

    if (hexDataUserPartStart < 0 || hexDataUserPartEnd < 0) {
        $('#errorDiv').text('Failed to decode base image hex file, could not generate new file');
        return;
    }
    
    // We now know the starting and ending offset of the user 

    let reader = new FileReader();

    reader.readAsArrayBuffer(userBinFile);

    reader.onload = function() {
        // console.log('user binary', reader.result);
        const userHex = arrayBufferToHex(reader.result, startUserPartAddr);

        // console.log('hexDataUserPartStart=' + hexDataUserPartStart + ' hexDataUserPartEnd=' + hexDataUserPartEnd);
        // console.log('start ' + hexData.substr(hexDataUserPartStart, 50));
        // console.log('end ' + hexData.substr(hexDataUserPartEnd, 50));

        const fullHex = hexData.substr(0, hexDataUserPartStart) + userHex + hexData.substr(hexDataUserPartEnd);

        // console.log('fullHex', fullHex);

        const blob = new Blob([fullHex], {type:'application/octet-stream'});

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'image.hex';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

    };

}

// https://stackoverflow.com/questions/38987784/how-to-convert-a-hexadecimal-string-to-uint8array-and-back-in-javascript
function arrayToHexString(array) {
    return array.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}

// The baseAddr passed to this function is the 16-bit base address, not the actual base address of the file!
function baseAddrToHex(baseAddr) {
    // Len (1) + Addr (2) + Type (1) + Data (2) + Checksum (1) = 7

    let array = new Uint8Array([0x02, 0x00, 0x00, 0x04, baseAddr >> 8, baseAddr & 0xff, 0x00]);

    array[array.byteLength - 1] = calculateBufferChecksum(array);

    // console.log('array', array);

    return arrayToHexString(array);
}

function arrayBufferToHex(arrayBuffer, loadAddress) {
    // 
    const userBinaryArray = new Uint8Array(arrayBuffer);

    let hex = '';

    // loadAddress is the address in the target memory space to load the file
    // This requires updating both the baseAddress record (4) and the address.
    // Both the baseAddress and address in the data record are 16-bit, and
    // are combined to make a 32-bit address. However, when loading a binary
    // file it's not always loaded on a 16-bit boundary! 
    // For example, a Gen 3 user binary is loaded at 0xD4000 (128K) or 
    // 0xb4000 (256K) with Device OS 3.1 and later.
    // It does need to be an even multiple of the chunk size, but that's 16
    // bytes and should not be an issue.
    
    // Base address
    let lastBaseAddr = -1;

    let userBinaryOffset = 0;
    while(userBinaryOffset < userBinaryArray.byteLength) {
        let baseAddr = loadAddress & 0xffff0000;
        let curAddr = loadAddress - baseAddr;
        if (lastBaseAddr != baseAddr) {
            lastBaseAddr = baseAddr;
            hex += ':' + baseAddrToHex(baseAddr >> 16) + '\n';
        }

        let chunkSize = userBinaryArray.byteLength - userBinaryOffset;
        if (chunkSize > 16) {
            chunkSize = 16;
        }

        // Len (1) + Addr (2) + Type (1) + Data (chunkSize) + Checksum (1) = 5 + chunkSize
        let chunkArray = new Uint8Array(5 + chunkSize);
        chunkArray[0] = chunkSize;
        chunkArray[1] = curAddr >> 8;
        chunkArray[2] = curAddr & 0xff;
        chunkArray[3] = 0x00; // Record type 0 (data)
        
        for(let ii = 0; ii < chunkSize; ii++) {
            chunkArray[4 + ii] = userBinaryArray[userBinaryOffset + ii];
        }

        chunkArray[chunkArray.byteLength - 1] = calculateBufferChecksum(chunkArray);

        hex += ':' + arrayToHexString(chunkArray) + '\n';

        userBinaryOffset += chunkSize;
        loadAddress += chunkSize;
    }

    // console.log('hex', hex);

    return hex;
}
