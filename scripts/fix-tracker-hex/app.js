#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const argv = require('yargs').argv;

const topDir = path.normalize(path.join('..', '..'));

const filesDir = path.join(topDir, 'src', 'assets', 'files');

const deviceRestoreJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'deviceRestore.json'), 'utf8'));

const deviceOsVersionsJsonPath = path.join(filesDir, 'deviceOsVersions.json');

// deviceRestoreDir has a directory for each version name (semver) with no 'v'
const deviceRestoreDir = path.join(filesDir, 'device-restore');


// Copied from api-helper.js
let apiHelper = {};

// Parses a semver (like '3.0.0-rc.1' and returns the broken out parts)
apiHelper.parseVersionStr = function(verStr) {
    let result = {};

    // Remove any leading non-numbers
    while(true) {
        const c = verStr.charAt(0);
        if (c >= '0' && c <= '9') {
            break;
        }
        verStr = verStr.substr(1);
    }

    const parts = verStr.split(/[-\\.]/);
    if (parts.length < 2) {
        return result;
    }
    result.major = parseInt(parts[0]);
    if (parts.length > 1) {
        result.minor = parseInt(parts[1]);
    }
    else {
        result.minor = 0;
    }

    if (parts.length > 2) {
        result.patch = parseInt(parts[2]);
    }
    else {
        result.patch = 0;
    }

    if (parts.length > 4) {
        result.pre = parseInt(parts[4]);
    }

    if (parts.length > 3) {
        switch(parts[3]) {
            case 'rc':
                result.rc = result.pre;
                result.preAdj = result.pre * 400;
                break;

            case 'alpha':
                result.alpha = result.pre;
                result.preAdj = result.pre * 200;
                break;

            case 'beta':
                result.beta = result.pre;
                result.preAdj = result.pre * 300;
                break;

            case 'test':
                result.test = result.pre;
                result.preAdj = result.pre * 100;
                break;
        }
    }

    return result;
};

// Sort by version number (newest/largest first)
apiHelper.versionSort = function(a, b) {
    const aa = apiHelper.parseVersionStr(a);
    const bb = apiHelper.parseVersionStr(b);

    // console.log('a', aa);
    // console.log('b', bb);

    let cmp;

    cmp = bb.major - aa.major;
    if (cmp) {
        return cmp;
    }

    cmp = bb.minor - aa.minor;
    if (cmp) {
        return cmp;
    }

    cmp = bb.patch - aa.patch;
    if (cmp) {
        return cmp;
    }

    if (!aa.pre && !bb.pre) {
        return 0;
    }

    if (aa.pre && !bb.pre) {
        return +1;
    }
    if (!aa.pre && bb.pre) {
        return -1;
    }

    cmp = bb.preAdj - aa.preAdj;

    return cmp;
};



const now = Math.floor(Date.now() / 1000);


const hexFileEol = '\n';

async function analyzeHexFile(f) {
    const hexData = fs.readFileSync(f, 'utf8');
    if (hexData.length == 0 || hexData.charAt(0) != ':') {
        console.log('input file ' + f + ' does not appear to be a hex file');
        return;
    }

    let baseAddr = 0;

    hexData.split(/[\r\n]/).some(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return false;
        }
        if (lineData.charAt(0) != ':') {
            return;
        }
        //console.log('line: ' + lineData);

        const buf = Buffer.from(lineData.substring(1), 'hex');
       
        const len = buf.readUInt8(0);
        const addr = buf.readUInt16BE(1);
        const recType = buf.readUInt8(3);
        // data begins at 4
        // checksum is last byte
        const checksum = buf.readUInt8(4 + len);

        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 4 && len == 2) {
                // Extended linear address
                baseAddr = buf.readUInt16BE(4) << 16;
                console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
            }

            //console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
    });
}

async function imageFromHexFile(f) {
    let result = Buffer.alloc(0);

    const hexData = fs.readFileSync(f, 'utf8');
    if (hexData.length == 0 || hexData.charAt(0) != ':') {
        console.log('input file ' + f + ' does not appear to be a hex file');
        return;
    }

    let baseAddr = 0;

    for(let lineData of hexData.split(/[\r\n]/)) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            break;
        }
        if (lineData.charAt(0) != ':') {
            continue;
        }
        //console.log('line: ' + lineData);

        const buf = Buffer.from(lineData.substring(1), 'hex');
       
        const len = buf.readUInt8(0);
        const addr = buf.readUInt16BE(1);
        const recType = buf.readUInt8(3);
        // data begins at 4
        // checksum is last byte
        const checksum = buf.readUInt8(4 + len);

        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 4 && len == 2) {
                // Extended linear address
                baseAddr = buf.readUInt16BE(4) << 16;
                // console.log('baseAddr=0x' + baseAddr.toString(16) + ' (' + baseAddr + ')');
            }

            const endOfSector = Math.ceil((baseAddr + addr + len) / 4096) * 4096;
            if (result.length < endOfSector) {
                result = Buffer.concat([result, Buffer.alloc(endOfSector - result.length, 255)]);
            }
            for(let ii = 0; ii < len; ii++) {
                result.writeUInt8(buf.readUInt8(4 + ii), baseAddr + addr + ii);
            }

            //console.log('len=0x' + padHex(len, 2) + ' addr=0x' + padHex(addr, 4) + ' recType=' + recType + ' checksum=0x' + padHex(checksum, 2) + ' ' + lineData);
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
    }
    return result;
}


// Reads a file from disk and returns the contents, possibly with the end-of-line updated
// to use hexFileEol
function hexFile(f) {
    let hex = '';

    fs.readFileSync(f, 'utf8').split('\n').forEach(function(line) {
        hex += line.trim() + hexFileEol;
    });

    return hex;
}

function hexFileText(s) {
    let hex = '';

    for(let line of s.split('\n')) {
        hex += line.trim() + hexFileEol;
    }

    return hex;
}

// Return the end-of-file indicator. Must be at the end of the hex file.
function endOfFileHex() {
    return ':00000001FF' + hexFileEol;
}

function hexFileWithoutEof(f) {
    // f is a path to a .hex file
    const hexData = fs.readFileSync(f, 'utf8');
    if (hexData.length == 0 || hexData.charAt(0) != ':') {
        console.log('input file ' + f + ' does not appear to be a hex file');
        return '';
    }

    let baseAddr = 0;
    let hexOut = '';

    hexData.split(/[\r\n]/).some(function(lineData) {
        lineData = lineData.trim();
        if (lineData.length == 0) {
            return false;
        }
        if (lineData.charAt(0) != ':') {
            return false;
        }
        //console.log('line: ' + lineData);

        const buf = Buffer.from(lineData.substring(1), 'hex');
       
        const len = buf.readUInt8(0);
        const addr = buf.readUInt16BE(1);
        const recType = buf.readUInt8(3);
        // data begins at 4
        // checksum is last byte
        const checksum = buf.readUInt8(4 + len);

        const calcChecksum = calculateBufferChecksum(buf);

        if (calcChecksum == checksum) {
            if (recType == 0x00 && len == 0x00) {
                // EOF
                return true;
            }
            hexOut += lineData + hexFileEol;
        }
        else {
            console.log('CHECKSUM ERROR! len=' + len + ' addr=' + addr + ' recType=' + recType + ' checksum=' + checksum + ' calcChecksum=' + calcChecksum);
        }
        return false;
    });    

    return hexOut;
}

function padHex(num, len) {
    let hex = num.toString(16);
    if (hex.length < len) {
        return '00000000'.substring(0, len - hex.length) + hex;
    }
    else {
        return hex;
    }
}

function calculateBufferChecksum(buf) {
    // Last byte of buf is the checksum, so don't include that in
    // the checksum (buf.length - 1)
    let sum = 0;
    for(let ii = 0; ii < (buf.length - 1); ii++) {
        sum += buf.readUInt8(ii);
    }

    // Checksum is sum of all bytes, then two's complement
    // (invert all of the bits and add 1)
    return (~sum + 1) & 0xff;
}

// The baseAddr passed to this function is the 16-bit base address, not the actual base address of the file!
function baseAddrToHex(baseAddr) {
    // Len (1) + Addr (2) + Type (1) + Data (2) + Checksum (1) = 7
    let buf = Buffer.alloc(7);
    buf.writeUInt8(2, 0); // Byte count = 0x02 (offset 0)
    buf.writeUInt16BE(0, 1); // Address = 0x0000 (offset 1)
    buf.writeUInt8(4, 3); // Record type = 0x04 (offset 3)
    buf.writeUInt16BE(baseAddr, 4); // Base addr (offset 4)
    buf.writeUInt8(calculateBufferChecksum(buf), 6); // Checksum (offset 6)
    return buf.toString('hex');
}

async function binFilePathToHex(binFilePath) {
    return new Promise(function(resolve, reject) {
        const reader = new HalModuleParser();
        reader.parseFile(binFilePath, function(fileInfo, err) {
            if (err) {
                console.log("error processing file " + binFilePath, err);
                reject(err);
            }
            
            const loadAddress = parseInt(fileInfo.prefixInfo.moduleStartAddy, 16);
    
            // console.log('fileInfo', fileInfo);

            let hex = '';

            if (fileInfo.prefixInfo.moduleFunction == ModuleInfo.FunctionType.RADIO_STACK) {
                const bufSize = fileInfo.fileBuffer.length - fileInfo.suffixInfo.suffixSize - ModuleInfo.MODULE_PREFIX_SIZE;
                let buf = Buffer.alloc(bufSize);
                fileInfo.fileBuffer.copy(buf, 0, ModuleInfo.MODULE_PREFIX_SIZE, fileInfo.fileBuffer.length - fileInfo.suffixInfo.suffixSize);
                // The load address in the file is 0x1000. I'm not positive this is correct, may need to hardcode 0x0
                // console.log('loadAddress=0x' + loadAddress.toString(16) + ' (softdevice)');
                hex = fileBufferToHex(buf, loadAddress);     
            }
            else {
                // console.log('loadAddress=0x' + loadAddress.toString(16));
                hex = fileBufferToHex(fileInfo.fileBuffer, loadAddress);       
            }
    
            resolve(hex);    
        });
    });
}

function fileBufferToHex(fileBuffer, loadAddress) {
    // 
    let hex = '';

    // loadAddress is the address in the target memory space to load the file
    // This requires updating bot the baseAddress record (4) and the address.
    // Both the baseAddress and address in the data record are 16-bit, and
    // are combined to make a 32-bit address. However, when loading a binary
    // file it's not always loaded on a 16-bit boundary! 
    // For example, a Gen 3 user binary is loaded at 0xD4000 (128K) or 
    // 0xb4000 (256K) with Device OS 3.1 and later.
    // It does need to be an even multiple of the chunk size, but that's 16
    // bytes and should not be an issue.
    
    // Base address
    let lastBaseAddr = -1;

    let fileBufferOffset = 0;
    while(fileBufferOffset < fileBuffer.length) {
        let baseAddr = loadAddress & 0xffff0000;
        let curAddr = loadAddress - baseAddr;
        if (lastBaseAddr != baseAddr) {
            lastBaseAddr = baseAddr;
            hex += ':' + baseAddrToHex(baseAddr >> 16) + hexFileEol;
        }

        let chunkSize = fileBuffer.length - fileBufferOffset;
        if (chunkSize > 16) {
            chunkSize = 16;
        }

        // Len (1) + Addr (2) + Type (1) + Data (chunkSize) + Checksum (1) = 5 + chunkSize
        let buf = Buffer.alloc(5 + chunkSize);

        buf.writeUInt8(chunkSize, 0); // Byte count = chunkSize (offset 0)
        buf.writeUInt16BE(curAddr, 1); // Address = 0x0000 (offset 1)
        buf.writeUInt8(0, 3); // Record type = 0x00 (offset 3)

        fileBuffer.copy(buf, 4, fileBufferOffset,fileBufferOffset + chunkSize);

        buf.writeUInt8(calculateBufferChecksum(buf), 4 + chunkSize); // Checksum (last byte)

        hex += ':' + buf.toString('hex') + hexFileEol;

        fileBufferOffset += chunkSize;
        loadAddress += chunkSize;
    }

    

    return hex;
}



async function run() {

    let b = Buffer.alloc(1024, 0xff);
    const binaryOverwriteHex = fileBufferToHex(b, 0xd4000);                   
    // console.log('binaryOverwriteHex', binaryOverwriteHex);


    for(const de of fs.readdirSync(deviceRestoreDir, {withFileTypes:true})) {
        if (!de.isDirectory() || de.name.startsWith('.')) {
            continue;
        }
        // Test looks backwards because versionSort is newest first
        if (apiHelper.versionSort(de.name, '3.1.0') > 0) {
            continue;
        }

        const versionDir = path.join(deviceRestoreDir, de.name);
    
        let hexFile = path.join(versionDir, 'tracker.hex');
        if (!fs.existsSync(hexFile)) {
            continue;
        }

        const hexData = fs.readFileSync(hexFile, 'utf8');

        const startIndex = hexData.indexOf(binaryOverwriteHex);
        if (startIndex >= 0) {
            console.log('remove hex starting at startIndex=' + startIndex + ', length=' + binaryOverwriteHex.length);
            
            const newHexData = hexData.slice(0, startIndex) + hexData.slice(startIndex + binaryOverwriteHex.length);

            fs.writeFileSync(hexFile, newHexData);
        }
    }

}

run();

