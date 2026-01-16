#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const querystring = require("querystring");

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const fetch = require("node-fetch"); // node-fetch@2 required for CommonJS

const Handlebars = require("handlebars");

var JSZip = require("jszip");

const { HalModuleParser, ModuleInfo } = require('binary-version-reader');
const { platform } = require('os');

const argv = require('yargs').argv;

const topDir = path.normalize(path.join('..', '..'));
const configDir = path.join(topDir, 'config');
const releasesJsonPath = path.join(configDir, 'releases.json');

const filesDir = path.join(topDir, 'src', 'assets', 'files');

const releaseNotesPath = path.join(filesDir, 'releaseNotes.json');

const deviceRestoreJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'deviceRestore.json'), 'utf8'));

const deviceOsVersionsJsonPath = path.join(filesDir, 'deviceOsVersions.json');

// deviceRestoreDir has a directory for each version name (semver) with no 'v'
const deviceRestoreDir = path.join(filesDir, 'device-restore');

const trackerDir = path.join(filesDir, 'tracker');

let trackerEdgeVersionsJson; // Loaded after file is updated
let monitorEdgeVersionsJson; // Loaded after file is updated


/*
{
    "versions":[
        {
            "platforms": [26],
            "versionMin": "3.0.0",
            "file": "tracker-esp32-ncp@0.0.7.bin"
        }
    ]
}
*/
const ncpDir = path.join(filesDir, 'ncp');

const ncpJson = JSON.parse(fs.readFileSync(path.join(ncpDir, 'ncp.json'), 'utf8'));

let hexFiles = {};
const hexDir = path.join(filesDir, 'hex');
for(const de of fs.readdirSync(hexDir, {withFileTypes:true})) {
    if (de.isFile()) {
        hexFiles[de.name] = fs.readFileSync(path.join(hexDir, de.name), 'utf8');
    }
}
// console.log('hexFiles', hexFiles);

/*
  "versions": [
    {
      "boot": 7,
      "sys": 11,
      "semVer": "0.4.9"
    },
*/
const versionInfoJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'versionInfo.json'), 'utf8'));

function systemVersionToSemver(sysver) {
    for(const v of versionInfoJson.versions) {
        if (v.sys == sysver) {
            return v.semVer;
        }
    }
    return null;
}

// This contains an abundance of information, including
// deviceConstants - The JSON data from device constants
const carriersJson = JSON.parse(fs.readFileSync(path.join(filesDir, 'carriers.json'), 'utf8'));

function getPlatformInfoById(id) {
    if (typeof id == 'string') {
        id = parseInt(id);
    }
    for(const key in carriersJson.deviceConstants) {
        const obj = carriersJson.deviceConstants[key];
        if (obj.id == id) {
            return obj;
        }
    }    
    return null;
}

// config.json must contain an accessToken
let config = {};
try {
    config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
}
catch(e) {
    console.log('failed to read config.json');
    process.exit(1);
}
if (!config.accessToken) {
    console.log('config.json did not contain accessToken');
    process.exit(1);
}

// Create a new empty tempDir if necessary
const tempDir = path.join(__dirname, 'temp');
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, {recursive:true});
}
fs.mkdirSync(tempDir);


let releasesJson;
try {
    releasesJson = JSON.parse(fs.readFileSync(releasesJsonPath, 'utf8'));
}
catch(e) {
    releasesJson = {};
}

let releaseNotesOrig = '';
let releaseNotesJson;
try {
    releaseNotesOrig = fs.readFileSync(releaseNotesPath, 'utf8');
    releaseNotesJson = JSON.parse(releaseNotesOrig);
}
catch(e) {
    releaseNotesJson = {};
}

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


async function fetchReleases(options) {
    // options.old, .repository

    // https://docs.github.com/en/rest/releases/releases

    let readMore = true;

    let newReleases = [];

    for(let page = 1; page <= 3 && readMore; page++) {
        const cmd = 'gh api -H "Accept: application/vnd.github+json" "/repos/' + options.repository + '/releases?page=' + page + '"';

        console.log('retrieving releases page ' + page + ' ' + options.repository);

        const { stdout, stderr } = await exec(cmd, {maxBuffer: 1024 * 1024 * 5});                

        const releaseArray = JSON.parse(stdout);
        if (releaseArray.length == 0) {
            break;
        }

        for(const release of releaseArray) {
            if (release.draft) {
                continue;
            }

            // Check our temporary downloads
            if (options.old) {
                const releaseExists = options.old.find(e => e.tag_name == release.tag_name);
                if (releaseExists) {
                    console.log('releaseExists ' + release.tag_name);
                    readMore = false;
                    break;
                }    
            }

            newReleases.push(release);
        }        
    }
    return newReleases;
}

async function fetchPulls() {
    if (!releasesJson.pulls) {
        releasesJson.pulls = [];
    }

    let readMore = true;

    let newPulls = [];

    for(let page = 1; page <= 100 && readMore; page++) {
        const cmd = 'gh api -H "Accept: application/vnd.github+json" "/repos/particle-iot/device-os/pulls?state=all&sort=created&direction=desc&page=' + page + '"';

        // console.log('cmd=' + cmd);

        const { stdout, stderr } = await exec(cmd, {maxBuffer: 1024 * 1024 * 5});                

        const pullsArray = JSON.parse(stdout);
        if (pullsArray.length == 0) {
            break;
        }

        console.log('retrieved pulls page ' + page + ' count=' + pullsArray.length);

        let numbers = [];

        for(const pull of pullsArray) {

            // Check our temporary downloads
            const pullExists = releasesJson.pulls.find(e => e.number == pull.number); 
            if (pullExists) {
                console.log('pullExists ' + pull.number);
                readMore = false;
                break;
            }
            numbers.push(pull.number);

            newPulls.push(pull);
        }        
        // console.log('numbers', numbers);

        // We need to read over 100 pages to get all of the PRs, so slow this down to avoid getting blocked by the API
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 10000);
        });        
    }

    if (newPulls.length) {
        console.log('added ' + newPulls.length + ' pull requests');
        
        releasesJson.pulls = newPulls.concat(releasesJson.pulls);
    }

    releasesJson.updated = now;

    // Save releases file
    fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
}

async function processReleases() {

    for(const release of releasesJson.releases) {
        // console.log('name=' + release.name + ' tag_name=' + release.tag_name);
        // console.log('body', release.body);
    
        let section2 = '', section3;
    
        if (!releaseNotesJson.releases) {
            releaseNotesJson.releases = {};
        }
    
        const releaseObj = {
            url: release.html_url,
            tag_name: release.tag_name,
            name: release.name,
            prerelease: release.prerelease,
            created_at: release.created_at,
            published_at: release.published_at,
            entries: [],
            prs: [],
        };
    
        for(let line of release.body.split('\n')) {
            if (line.startsWith('- ')) {
                let tags = [];
                let prs = [];
                let issues;
            
                const processLinks = function(re) {
                    for(const match of line.matchAll(re)) {
                        const kind = match[3];
                        const id = parseInt(match[4]);
                        if (kind == 'pull') {
                            if (!prs.includes(id)) {
                                prs.push(id);
                            }
                            if (!releaseObj.prs.includes(id)) {
                                releaseObj.prs.push(id)
                            }    
                        }
                        else
                        if (kind == 'issues') {
                            if (!issues) {
                                issues = [];                                
                            }
                            if (!issues.includes(id)) {
                                issues.push(id);
                            }
                        }
                    }
                    line = line.replace(re, '');
                }


                // 
                processLinks(/\[[A-Za-z ]*[#[0-9]+\]\(https:\/\/github\.com\/(particle-iot|spark)\/(device-os|firmware)\/(pull|issue)\/([0-9]+)\)/g);

                processLinks(/\[`[^`]*`\]\(https:\/\/github\.com\/(particle-iot|spark)\/(device-os|firmware)\/(pull|issues)\/([0-9]+)\)/g);

                
                let entry = line.substring(2).trim();
                while(entry.length) {
                    if (entry.startsWith('[')) {
                        const endIndex = entry.indexOf(']');
                        if (endIndex > 0) {
                            const tag = entry.substring(1, endIndex);
                            // console.log('tag=' + tag);
                            if (tag.length < 15 && tag.indexOf('**') < 0) {
                                tags.push(tag);
                            }
    
                            entry = entry.substring(endIndex + 1).trim();
                        }
                        else {
                            break;
                        }
                    }
                    else {                                            
                        if (section3 && !section2.startsWith('Upgrading')) {
                            // console.log('msg=' + entry);
                            const entryObj = {
                                tags,
                                prs,
                                issues,
                                section: section3,
                                text: entry,
                            };
                            releaseObj.entries.push(entryObj);
                        }
                        break;
                    }
                }    
            }
            else
            if (line.startsWith('### ')) {
                section3 = line.substring(4).trim();
                // console.log('section=' + section3);
            }
            else
            if (line.startsWith('## ')) {
                section2 = line.substring(3).trim();
            }
        }
        releaseObj.prs.sort();

        releaseNotesJson.releases[release.tag_name] = releaseObj;
    }
}

async function processPulls() {
    
    
    if (!releaseNotesJson.pulls) {
        releaseNotesJson.pulls = {};
    }

    let sectionKeys = [];

    for(const pull of releasesJson.pulls) {

        let pullsObj = {
            url: pull.html_url,
            number: pull.number,
            title: pull.title,
            state: pull.state,
            created_at: pull.created_at,
            published_at: pull.published_at,
        };
        // console.log('pullsObj', pullsObj);

        let sectionData = {};
        let sectionKey = 'none';

        if (pull.body) {
            for(let line of pull.body.split('\n')) {
                line = line.replace(/[\r]/g, '');
    
                if (line.startsWith('### ')) {
                    sectionKey = line.substring(3).trim().toLowerCase();
                    if (!sectionKeys.includes(sectionKey)) {
                        sectionKeys.push(sectionKey);
                    }
                }
                else
                if (!line.startsWith('#')) {            
                    if (!sectionData[sectionKey]) {
                        sectionData[sectionKey] = '';
                    }
                    sectionData[sectionKey] += line + '\n';
                }
            }
    
            for(const field of ['problem', 'description']) {
                if (sectionData[field]) {
                    pullsObj.detail = sectionData[field].trim();
                    break;
                }
            }
        }

        //console.log('saving ' + pull.number);
        releaseNotesJson.pulls[pull.number.toString()] = pullsObj;
    }

    sectionKeys.sort();
    // console.log('sectionKeys', sectionKeys);

}

async function fetchDeviceOsVersions() {
    let deviceOsVersions = [];


    for(let page = 1; ; page++) {
        const queryOptions = {
            access_token: config.accessToken,
            page,
        };

        const url = 'https://api.particle.io/v1/device-os/versions?' + querystring.stringify(queryOptions);

        const result = await new Promise(function(resolve, reject) {
            const fetchRes = fetch(url)
            .then(response => response.json())
            .then(function(result) {
                resolve(result);
            });
        });
        console.log('result', result);
        for(const v of result.versions) {
            deviceOsVersions.push(v);
        }
        if (deviceOsVersions.length >= result.meta.total || result.versions.length == 0) {
            break;
        }
    }

    // console.log('deviceOsVersions', deviceOsVersions);

    // Array of:
    // {
    //     version: '5.2.0',
    //     internal_version: 5200,
    //     state: 'pre_release',
    //     base_url: 'https://api.particle.io/v1/firmware/device-os/v5.2.0',
    //     supported_platforms: [Array]
    // },
    return deviceOsVersions;
}

async function fetchVersionDetails(options) {
    // options.platformId .version
    const queryOptions = {
        access_token: config.accessToken,
        platform_id: options.platformId,
    };

    const url = 'https://api.particle.io/v1/device-os/versions/' + options.version + '?' + querystring.stringify(queryOptions);
    // console.log('url=' + url);
    
    const result = await new Promise(function(resolve, reject) {
        const fetchRes = fetch(url)
        .then(response => response.json())
        .then(function(result) {
            resolve(result);
        });
    });

    /*
    Returned object:
    {
        version: '5.5.0-rc.1',
        internal_version: 5500,
        state: 'pre_release',
        base_url: 'https://api.particle.io/v1/firmware/device-os/v5.5.0-rc.1',
        supported_platforms: [
            12, 25, 13, 23, 15,
            35, 32, 26, 28
        ],
        modules: [
            {
            filename: 'trackerm-bootloader@5.5.0-rc.1.bin',
            crc: [Object],
            prefixInfo: [Object],
            suffixInfo: [Object]
            },
            {
            filename: 'trackerm-prebootloader-mbr@5.5.0-rc.1.bin',
            crc: [Object],
            prefixInfo: [Object],
            suffixInfo: [Object]
            },
    */

    // Append the filename to the base_url with a / separator
    // https://api.particle.io/v1/firmware/device-os/v3.3.1/photon-system-part1@3.3.1.bin

    return result;
}

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


async function runDeviceOs() {
    const ignoreVersions = ['3.2.1-p2.1', '3.0.1-p2.4', '3.0.1-p2.5'];

    const deviceOsVersions = await fetchDeviceOsVersions();

    {
        for(const verObj of deviceOsVersions) {
            const releaseObj = releaseNotesJson.releases['v' + verObj.version];
            if (releaseObj) {
                verObj.publishedAt = releaseObj.published_at;
            }
        }
        fs.writeFileSync(deviceOsVersionsJsonPath, JSON.stringify(deviceOsVersions, null, 2));
    }

    for(const ver of deviceOsVersions) {
        if (ver.internal_version < 2100) {
            // Ignore versions older than 2.1.0
            continue;
        }
        if (ver.internal_version < 4000 && (ver.version.includes('rc') || ver.version.includes('beta'))) {
            // Ignore rc and beta versions before 4.0.0
            continue;
        }
        if (ignoreVersions.includes(ver.version)) {
            // Manually excluded version
            continue;
        }

        if (deviceRestoreJson.versionNames.includes(ver.version)) { //  && !ver.version.startsWith('5.5.0')
            // Already in deviceRestore.json
            continue;
        }   

        console.log('processing version', ver);

        for(const platformId of ver.supported_platforms) {
            const details = await fetchVersionDetails({
                version: ver.version,
                platformId,
            });
            // console.log('details', details);


            let modules = [];
            let userPart;

            var zip = new JSZip();

            let moduleInfo = {};

            let hex = '';

            // Get information about the platform from deviceConstants
            const platformInfo = getPlatformInfoById(platformId);
            if (!platformInfo) {
                console.log('no platform info for ' + platformId);
            }

            console.log('processing platform=' + platformInfo.name + ' (' + platformId + ')');
            // console.log('platformInfo', platformInfo);

            // This is needed so we can tell whether to insert 128K compatibility in hex file
            const isNRF52 = platformInfo.baseMcu.startsWith('nrf52');

            // versionSort sorts descending, so this test looks backwards
            const add128Kcompatibility = isNRF52 && apiHelper.versionSort(ver.version, '3.1.0') <= 0;

            // Should find a better way to determine this. Is used to determine whether to include tracker-edge and monitor-edge firmware
            const isTrackerOrMonitor = (platformId == 26); 

            // This is used to handle the multiple bootloaders on the RTL872x
            const isRTL872x = platformInfo.baseMcu == 'rtl872x';

            // Pass 1: Download binaries
            for(const module of details.modules) {
                const url = details.base_url + '/' + module.filename;

                module.binaryFile = path.join(tempDir, module.filename);

                if (module.filename.includes('prebootloader-mbr')) {
                    // Skip P2 prebootloader-mbr as it must never be flashed to a device
                    continue;
                }

                if (module.prefixInfo.moduleFunction == 'user_part') {
                    userPart = module;
                }
                else {
                    modules.push(module);
                }

                if (!fs.existsSync(module.binaryFile)) {
                    console.log('downloading ' + module.filename);
                    const binary = await new Promise(function(resolve, reject) {
                        const fetchRes = fetch(url)
                        .then(response => response.arrayBuffer())
                        .then(function(response) {
                            resolve(Buffer.from(response));
                        });
                    });
    
                    // console.log('binary', binary);
                    fs.writeFileSync(module.binaryFile, binary);    
                }    
            }

            // The hex generator requires the user part be the last thing in the file so it can be replaced
            // by a custom binary easily. This code handles that.
            if (userPart) {
                modules.push(userPart);
            }
            
            const outputDir = path.join(deviceRestoreDir, ver.version);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            if (isNRF52 && !isTrackerOrMonitor) {
                // Add UICR bytes, except on tracker because TrackerOne and MonitorOne have different UICR bytes
                // but the same platformId
                const uicrFilename = 'uicr_no_eof.hex';
                const platformUicrFilename = platformInfo.name + '_' + uicrFilename;

                if (hexFiles[platformUicrFilename]) {
                    hex += hexFileText(hexFiles[platformUicrFilename]);
                }
                else {
                    hex += hexFileText(hexFiles[uicrFilename]);
                }   
            }

            // console.log('modules', modules);

            // Pass 2: Process files as done in HexTool
            // modules is like details.modules except it is already filtered to remove prebootloader-mbr and put user-part last
            for(let module of modules) {
                // Map modules 
                // modules: .filename, .prefixInfo, .suffixInfo

                console.log('processing module filename=' + module.filename);

                // console.log('module', {filename:module.filename, prefixInfo:module.prefixInfo});

                // prefixInfo:
                // .moduleFlags (string), .moduleVersion, .platformID, moduleFunction, moduleIndex, 


                // moduleFunction: user_part, system_part, bootloader, 
                // P2 bootloader is index 0, prebootloader-part 1 is index 2, and prebootloader-mbr is index 1
                // system_part is typically 1, except for older Gen 2 devices where there may be more than one
                // radio_stack has flag drop_module_info
                switch(module.prefixInfo.moduleFunction) {
                    case 'bootloader':
                        if (isRTL872x) {
                            switch(module.prefixInfo.moduleIndex) {
                                case 2:
                                    module.hexToolName = 'prebootloader-part1';
                                    break;

                                // 1 is prebootloader-mbr, which is filtered out above

                                case 0:
                                    module.hexToolName = 'bootloader';
                                    break;
                            }
                        }
                        else {
                            module.hexToolName = 'bootloader';
                        }
                        break;

                    case 'system_part':
                        module.hexToolName = "system-part" + module.prefixInfo.moduleIndex;
                        break;

                    case 'user_part':
                        if (isTrackerOrMonitor) {
                            module.hexToolName = 'tracker-edge';
                        }
                        else {
                            module.hexToolName = 'tinker';
                        }
                        break;

                    case 'radio_stack':
                        module.hexToolName = 'softdevice';
                        break;

                    default:
                        console.log('unknown moduleFunction ' + module.prefixInfo.moduleFunction);
                        break;
                }
                if (!module.hexToolName) {
                    console.log('unknown module', module);
                }

                if (module.prefixInfo.moduleFunction == 'user_part' && add128Kcompatibility) {
                    // Add 128K binary clearing here if Gen 3 and 3.1.0 or later
                    
                    let b = Buffer.alloc(1024, 0xff);
                    // console.log('inserting 1K at 0xd4000');
                    hex += fileBufferToHex(b, 0xd4000);                    
                }


                if (module.prefixInfo.moduleFunction == 'radio_stack') {
                    hex += hexFileText(hexFiles['radio_stack_prefix.hex']);
                }

                if (module.prefixInfo.moduleFunction == 'user_part' && isTrackerOrMonitor) {
                    for(let v of trackerEdgeVersionsJson.versions) {
                        // versionSort sorts descending, so this test looks backwards
                        if (v.target && apiHelper.versionSort(ver.version, v.target) <= 0) {
                            //console.log('using tracker', v);
                            module.binaryFile = path.join(trackerDir, v.bin);
                            break;
                        }
                    }               
                }

                // Generate module info JSON
                await new Promise(function(resolve, reject) {
                    const reader = new HalModuleParser();
                    reader.parseFile(module.binaryFile, function(fileInfo, err) {
                        if (err) {
                            console.log("error processing file " + path.join(inputDir, part.path), err);
                            reject(err);
                        }
                        
                        moduleInfo[module.hexToolName] = {
                            prefixInfo: fileInfo.prefixInfo,
                            suffixInfo: fileInfo.suffixInfo
                        };
                        resolve();
                    });
                });

                // Generate hex
                hex += await binFilePathToHex(module.binaryFile);

                // Add to zip
                const content = fs.readFileSync(module.binaryFile);
                zip.file(module.hexToolName + '.bin', content);

                if (module.prefixInfo.moduleFunction == 'user_part' && isTrackerOrMonitor) {
                    // Add monitor edge to zip
                    for(let v of monitorEdgeVersionsJson.versions) {
                        // versionSort sorts descending, so this test looks backwards
                        if (apiHelper.versionSort(ver.version, v.target) <= 0) {
                            //console.log('using monitor edge', v);
                            const content = fs.readFileSync(path.join(trackerDir, v.bin));
                            zip.file(v.bin, content);
                            break;
                        }
                    }
                }
            }


            for(const obj of ncpJson.versions) {
                // obj.platforms array of platform IDs
                // .versionMin Minimum semver inclusive
                // .versionMax Maximum semver exclusive
                // .file filename (in /assets/files/ncp)
                if (obj.platforms.includes(platformId)) {
                    //console.log('adding ncp', obj);
                    const ncpFile = path.join(ncpDir, obj.file);
                    const content = fs.readFileSync(ncpFile);
                    zip.file(obj.file, content);

                    await new Promise(function(resolve, reject) {
                        const reader = new HalModuleParser();
                        reader.parseFile(ncpFile, function(fileInfo, err) {
                            if (err) {
                                console.log("error processing file " + path.join(inputDir, part.path), err);
                                reject(err);
                            }
                            
                            moduleInfo['ncp'] = {
                                prefixInfo: fileInfo.prefixInfo,
                                suffixInfo: fileInfo.suffixInfo
                            };
                            resolve();
                        });
                    });
    
                }                
            }


            // Generate module info 
            fs.writeFileSync(path.join(outputDir, platformInfo.name + '.json'), JSON.stringify(moduleInfo, null, 2));

            // Generate zip
            await new Promise(function(resolve, reject) {
                zip.generateNodeStream({type:'nodebuffer', streamFiles:true})
                .pipe(fs.createWriteStream(path.join(outputDir, platformInfo.name + '.zip')))
                .on('finish', function () {
                    resolve();
                });
            });

            // Generate hex
            const outputHexFile = path.join(outputDir, platformInfo.name + '.hex');
            hex += endOfFileHex();
            fs.writeFileSync(outputHexFile, hex);

            // await analyzeHexFile(outputHexFile);

            // For comparison testing of orig and new
            /*
            {
                const origDir = path.join(deviceRestoreDir, ver.version + '-orig');

                let skip = false;

                // Compare hex
                const origFile = path.join(origDir, platformInfo.name + '.hex');
                if (fs.existsSync(origFile)) {
                    const imgOld = await imageFromHexFile(origFile);
                    const imgNew = await imageFromHexFile(outputHexFile);
                    if (imgOld.length != imgNew.length) {
                        console.log('hex image size differs old=' + imgOld.length + ' new=' + imgNew.length);
                        for(let ii = 0; ii < imgOld.length && ii < imgNew.length; ii++) {
                            if (imgOld.readUInt8(ii) != imgNew.readUInt8(ii)) {
                                console.log('image differs at offset=' + ii + ' old=' + imgOld.readUInt8(ii) + ' new=' + imgNew.readUInt8(ii))
                            }
                        }
                    }
    
                }
                else {
                    console.log('orig file does not exist ' + origFile);
                    skip = true;
                }

                if (!skip) {
                    // Compare JSON
                    const oldJson = JSON.parse(fs.readFileSync(path.join(origDir, platformInfo.name + '.json'), 'utf8'));
                    const newJson = JSON.parse(fs.readFileSync(path.join(outputDir, platformInfo.name + '.json'), 'utf8'));
                    
                    const compareJson = function(a, b, nest) {
                        if (Array.isArray(a) && Array.isArray(b)) {
                            if (a.length == b.length) {
                                for(let ii = 0; ii < a.length; ii++) {
                                    compareJson(a[ii], b[ii], nest.concat('[' + ii + ']'));
                                }
                            }
                            else {
                                console.log('length differs a=' + a.length + ' b=' + b.length);
                            }
                        }
                        else
                        if (typeof a == 'object' && typeof b == 'object') {
                            for(const key in a) {
                                if (typeof b[key] != undefined) {
                                    compareJson(a[key], b[key], nest.concat(key));                                
                                }
                                else {
                                    console.log('in a not b key=' + key + ' in ' + nest.join('.'));
                                }
                            }
                            for(const key in b) {
                                if (typeof a[key] == 'undefined') {
                                    const prefix = '';
                                    if (key == 'prefixSize' || key == 'extensions') {
                                        // Ignore these as they always occur with older versions
                                    } 
                                    else {
                                        console.log('in b not a key=' + key + ' in ' + nest.join('.'));
                                    }
                                }
                            }    
                        }
                        else
                        if (typeof a == 'undefined') {
                            console.log('missing a in ' + nest.join('.'));
                        }
                        else
                        if (typeof b == 'undefined') {
                            console.log('missing b in ' + nest.join('.'));
                        }
                        else {
                            if (a != b) {
                                console.log('value mismatch a=' + a + ' b=' + b + ' in ' + nest.join('.'))
                            }
                        }
                    }
                    compareJson(oldJson, newJson, []);
                }


                // Compare zip

            }
            */

        }


    }

    // Clean up tempDir
    // fs.rmSync(tempDir, {recursive:true});
}


async function runTrackerEdgeSource(version, zipFile) { // Version without the v
    // This used to be in the add-tracker-edge-version script
    // This is not needed for Monitor Edge because it doesn't use submodules
    const repo = 'https://github.com/particle-iot/tracker-edge';

    const stageDir = 'temp';
    const edgeDir = stageDir + '/tracker-edge';

    const stagePath = path.join(__dirname, stageDir);
    if (!fs.existsSync(stagePath)) {
        fs.mkdirSync(stagePath);
    }

    var zip = new JSZip();

    if (!fs.existsSync(path.join(__dirname, edgeDir))) {
        const cmd = 'cd ' + stageDir + ' && git clone ' + repo;
        const { stdout, stderr } = await exec(cmd);        
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git fetch';
        const { stdout, stderr } = await exec(cmd);
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git checkout v' + version; // was: git checkout release/v' + version;
        const { stdout, stderr } = await exec(cmd);
    }
    {
        const cmd = 'cd ' + edgeDir + ' && git submodule update --init --recursive';
        const { stdout, stderr } = await exec(cmd);
    }
    
    const addDir = function(dir, parentDir) {
        const base = path.basename(dir);
        const zipDir = parentDir.folder(base);

        for(const dirent of fs.readdirSync(dir, {withFileTypes: true})) {
            let skip = false;
            switch(dirent.name) {
                case '.':
                case '..':
                case '.DS_Store':
                case '.git':
                    skip = true;
                    break;
            }
            if (skip) {
                continue;
            }

            const newPath = path.join(dir, dirent.name);
            if (dirent.isDirectory()) {
                addDir(newPath, zipDir);
            }
            else {
                zipDir.file(dirent.name, fs.readFileSync(newPath));
            }
        }

    };
    addDir(edgeDir, zip);
    
    await new Promise(function(resolve, reject) {

        zip.generateNodeStream({streamFiles:true})
        .pipe(fs.createWriteStream(zipFile))
        .on('finish', function () {
            resolve();
        });
    });    

};


async function runEdgeVersion(options) {
    // options.repository, .kind, .zipName

    if (!releasesJson.edge) {
        releasesJson.edge = {};
    }
    if (!releasesJson.edge[options.kind]) {
        releasesJson.edge[options.kind] = {};
    }
    if (!releasesJson.edge[options.kind].releases) {
        releasesJson.edge[options.kind].releases = [];
    }


    // .kind is 'tracker-edge' or 'monitor-edge'

    const newReleases = await fetchReleases({
        repository: options.repository,
        old: releasesJson.edge[options.kind].releases,
    });

    if (newReleases.length) {
        console.log('added ' + newReleases.length + ' ' + options.kind + ' releases');
        
        releasesJson.edge[options.kind].releases = newReleases.concat(releasesJson.edge[options.kind].releases);

        // Each release in the .releases array:
        // tag_name, name, body, draft, prerelease, published_at
        // assets is an array of objects
        //   .name, .browser_download_url

        // Save releases file
        fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
    }

    // indexJson is the file like trackerEdgeVersions, and is only an array (no top level object!)
    const indexJsonFile = path.join(trackerDir, options.indexJson);
    let indexJson = {};
    try {
        indexJson = JSON.parse(fs.readFileSync(indexJsonFile, 'utf8'));
    }
    catch(e) {
    }

    // Check downloads - this does all releases so start with an empty versions array
    indexJson.versions = [];

    for(const rel of releasesJson.edge[options.kind].releases) {

        if (rel.draft || rel.prerelease) {
            // Skip draft releases (possibly allow prerelease in the future)
            continue;
        }

        let templateParam = {
            v: rel.tag_name, // begins with v
            title: rel.name,
            releaseNotes: rel.body,
            // version is just the number, as a number
        };

        let binaryFile;

        for(const relAsset of rel.assets) {
            if (relAsset.name.endsWith('.bin')) {
                // This is the user firmware binary
                binaryFile = path.join(trackerDir, relAsset.name);
                templateParam.bin = relAsset.name;

                if (!fs.existsSync(binaryFile)) {
                    console.log('no binary for ' + relAsset.name + ', downloading');

                    const binary = await new Promise(function(resolve, reject) {
                        const fetchRes = fetch(relAsset.browser_download_url)
                        .then(response => response.arrayBuffer())
                        .then(function(response) {
                            resolve(Buffer.from(response));
                        });
                    });
    
                    // console.log('binary', binary);
                    fs.writeFileSync(binaryFile, binary);   
                }
            }
        }

        if (rel.tag_name.startsWith('v')) {
            templateParam.version = parseInt(rel.tag_name.substring(1));
        }
        else {
            console.log('unknown tag format ' + rel.tag_name);
        }

        // Project source zip
        const zipFilename = templateParam.zip = Handlebars.compile(options.zipName)(templateParam);

        const zipFile = path.join(trackerDir, zipFilename);
    
        if (!fs.existsSync(zipFile)) {
            console.log('no binary for ' + zipFilename + ', downloading');

            if (options.kind == 'tracker-edge') {
                // Do this the old way because we need to populate git submodules
                await runTrackerEdgeSource(templateParam.version, zipFile);
            }
            else {
                // Just get the source zip, unchanged
                const binary = await new Promise(function(resolve, reject) {
                    const fetchRes = fetch(rel.zipball_url)
                    .then(response => response.arrayBuffer())
                    .then(function(response) {
                        resolve(Buffer.from(response));
                    });
                });
    
                // console.log('binary', binary);
                fs.writeFileSync(zipFile, binary);           
            }
        }

        if (binaryFile) {
            const reader = new HalModuleParser();
            const fileInfo = await reader.parseFile(binaryFile);
            // console.log('fileInfo', fileInfo);

            //console.log('fileInfo.prefixInfo.depModuleVersion', fileInfo.prefixInfo.depModuleVersion);
            templateParam.target = systemVersionToSemver(fileInfo.prefixInfo.depModuleVersion);
        }

        /*
          {
                "version": 18,
                "bin": "tracker-edge-18@3.3.0.bin",
                "target": "3.3.0",
                "zip": "v18.zip",
                "v": "v18",
                "title": "Tracker Edge v18 (Device OS 3.3.0)"
            },
        */


        // Check for a schema update
        {
            const zipData = fs.readFileSync(zipFile); 

            // zipData is Buffer

            var zip = new JSZip();

            await zip.loadAsync(zipData);

            const matches = await zip.file(/config-schema.json$/);
            if (matches.length == 1) {
                const schemaData = await matches[0].async('string');

                // console.log('schemaData', schemaData);
                const schemaJson = JSON.parse(schemaData);

                let templateParam2 = {};

                templateParam2.schemaId = schemaJson['$id'];
                templateParam2.schemaTag = templateParam2.schemaId.match(/\/(v[0-9]+)/);
                templateParam2.schemaVersion = templateParam.schemaVersion = parseInt(templateParam2.schemaTag[1].substring(1));

                templateParam2.filename = templateParam.filename = templateParam2.zip = Handlebars.compile(options.schemaName)(templateParam2);

                const schemaPath = path.join(trackerDir, templateParam2.filename);
                if (!fs.existsSync()) {
                    console.log('saving config schema ' + templateParam2.filename);
                    fs.writeFileSync(schemaPath, schemaData);                    
                }
            }
        }

        indexJson.versions.push(templateParam);
    }   
    
    fs.writeFileSync(indexJsonFile, JSON.stringify(indexJson, null, 4));


}


async function run() {
    let releaseNotesUpdated = false;

    // Disable release notes using --no-release-notes
    if (argv.releaseNotes !== false) {
        // Release notes
        if (argv.forceFetch || !releasesJson.updated || releasesJson.updated < (now - 86400)) {
            // Fetch releases
            if (!releasesJson.releases) {
                releasesJson.releases = [];
            }
        
            const newReleases = await fetchReleases({
                old: releasesJson.releases,
                repository: 'particle-iot/device-os',
            });
        
        
            if (newReleases.length) {
                console.log('added ' + newReleases.length + ' releases');
                
                releasesJson.releases = newReleases.concat(releasesJson.releases);
            }
        
            releasesJson.updated = now;

            // Remove the download_count as it changes frequently and is not needed
            for(const rel of releasesJson.releases) {
                if (rel.assets) {
                    for(const asset of rel.assets) {
                        delete asset.download_count;
                    }
                }
            }
        
            // Save releases file
            fs.writeFileSync(releasesJsonPath, JSON.stringify(releasesJson, null, 4));
        

            await fetchPulls();
        }
        
        if (!argv.noProcess) {
            await processReleases();
            await processPulls();
    
            // Save JSON if changed
            const releaseNotesNew = JSON.stringify(releaseNotesJson, null, 4);
            if (releaseNotesNew != releaseNotesOrig) {
                console.log('updated ' + releaseNotesPath);
                fs.writeFileSync(releaseNotesPath, releaseNotesNew);
                releaseNotesUpdated = true;    
            }
        }    
    }

    // Process Tracker Edge versions. Disable with --no-tracker-edge or --no-edge
    if (argv.trackerEdge !== false && argv.edge !== false) {
        await runEdgeVersion({
            kind: 'tracker-edge',
            repository: 'particle-iot/tracker-edge',
            zipName: 'v{{version}}.zip',
            schemaName: 'tracker-config-schema-{{schemaVersion}}.json',
            indexJson: 'trackerEdgeVersions.json',
        });
    }
    // Process Monitor Edge versions. Disable with --no-monitor-edge or --no-edge
    if (argv.trackerEdge !== false && argv.edge !== false) {
        await runEdgeVersion({
            kind: 'monitor-edge',
            repository: 'particle-iot/monitor-edge',
            zipName: 'monitor-edge-{{version}}.zip',
            schemaName: 'monitor-config-schema-{{schemaVersion}}.json',
            indexJson: 'monitorEdgeVersions.json',
        });
    }

    // Tracker and Monitor Edge must be done before Device OS
    trackerEdgeVersionsJson = JSON.parse(fs.readFileSync(path.join(trackerDir, 'trackerEdgeVersions.json'), 'utf8'));
    monitorEdgeVersionsJson = JSON.parse(fs.readFileSync(path.join(trackerDir, 'monitorEdgeVersions.json'), 'utf8'));

    // Process Device OS versions. Disable with --no-device-os
    if (argv.deviceOs !== false) {
        await runDeviceOs();
    }
    

    if (argv.clearVersionUpdate || releaseNotesUpdated) {
        // Clear version Update
        try {
            const versionUpdatePath = path.join(configDir, 'versionUpdate.json');

            let json = JSON.parse(fs.readFileSync(versionUpdatePath, 'utf8'));
            delete json.updated;
            fs.writeFileSync(versionUpdatePath, JSON.stringify(json, null, 4));
        }
        catch(e) {
            console.log('exception updating versionUpdate.json', e);
        }
    }


}


run();

