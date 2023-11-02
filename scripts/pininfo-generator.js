const fs = require('fs');
const path = require('path');


function sortKeys(obj) {
    let newObj = {};

    let keys = Object.keys(obj).sort();
    
    for(const key of keys) {
        newObj[key] = obj[key];
    }
}

function verifyPinInfo(dir) {
    for(const dirEntry of fs.readdirSync(dir, { withFileTypes: true })) {
        const lastDotIndex = dirEntry.name.lastIndexOf('.');
        const baseName = (lastDotIndex > 0) ? dirEntry.name.substring(0, lastDotIndex) : dirEntry.name;

        if (dirEntry.isDirectory()) {
            if (dirEntry.name == 'platforms') {
                // Process platforms                
                for(const dirEntry2 of fs.readdirSync(path.join(dir, dirEntry.name), { withFileTypes: true })) {

                    const thisPlatformJsonPath = path.join(dir, dirEntry.name, dirEntry2.name);

                    const obj = JSON.parse(fs.readFileSync(thisPlatformJsonPath, 'utf8'));

                    let newObj = {};

                    // obj
                    // .id (platform ID, may be 0)
                    // .name
                    // .pins
                    // .diagram
                    const topKeys = ['id', 'name', 'pins', 'diagram'];

                    const pinTopKeys = ['num', 'name', 'altName', 'desc' ];

                    const lastDotIndex2 = dirEntry2.name.lastIndexOf('.');

                    let info = {
                        baseName: (lastDotIndex2 > 0) ? dirEntry2.name.substring(0, lastDotIndex2) : dirEntry2.name,
                        hasPinNumbers: false,
                        pinsSeen: [],
                        hardwarePins: [],
                    };

                    for(const topKey of topKeys) {
                        if (topKey == 'pins') {
                            newObj.pins = [];

                            if (obj.pins.length > 0) {
                                info.hasPinNumbers = typeof obj.pins[0].num != 'undefined';

                                for(const innerObj of obj.pins) {
                                    if (innerObj.hardwarePin) {
                                        info.hardwarePins.push(innerObj.hardwarePin);
                                    }
                                    // Clean up inner object
                                    let newInnerObj = {};

                                    for(const key of pinTopKeys) {
                                        if (innerObj[key]) {
                                            newInnerObj[key] = innerObj[key];
                                        }                                        
                                    }
                                    const moreKeys = [];
                                    for(const key in innerObj) {
                                        if (!pinTopKeys.includes(key)) {
                                            moreKeys.push(key);
                                        }
                                    }
                                    moreKeys.sort();
                                    for(const key of moreKeys) {
                                        newInnerObj[key] = innerObj[key];
                                    }

                                    if (info.hasPinNumbers) {
                                        info.pinsSeen.push(innerObj.num);
                                        if (innerObj.morePins) {
                                            for(const p of innerObj.morePins) {
                                                info.pinsSeen.push(p);
                                            }
                                        }
                                    }

                                    newObj.pins.push(newInnerObj);
                                }

                                if (info.hasPinNumbers) {
                                    newObj.pins.sort(function(a, b) {
                                        return a.num - b.num;
                                    });
                                }
                                else {
                                    newObj.pins.sort(function(a, b) {
                                        return a.name.localeCompare(b.name);
                                    });
                                }

                            }
                            else {
                                console.log('pins is empty ' + info.baseName);
                            }
                        }
                        else {
                            newObj[topKey] = obj[topKey];
                        }
                    }
                    let moreKeys = [];

                    for(const key in obj) {
                        if (!topKeys.includes(key)) {
                            moreKeys.push(key);
                        }
                    }
                    moreKeys.sort();

                    for(const key of moreKeys) {
                        newObj[key] = obj[key];
                    }

                    // Check for duplicate or missed pin numbers
                    if (info.pinsSeen.length) {
                        info.pinsSeen.sort(function(a, b) {
                            return a - b;
                        });              
                        
                        info.minPin = info.pinsSeen[0];
                        info.maxPin = info.pinsSeen[info.pinsSeen.length - 1];

                        if (obj.ignorePins !== true) {
                            for(let ii = 1; ii < info.pinsSeen.length; ii++) {
                                if (info.pinsSeen[ii - 1] == info.pinsSeen[ii]) {
                                    console.log('duplicate pin ' + info.pinsSeen[ii] + ' in ' + info.baseName);
                                }
                            }
                            let missing = [];
                            for(let pin = info.minPin; pin <= info.maxPin; pin++) {
                                if (!info.pinsSeen.includes(pin)) {
                                    if (!Array.isArray(obj.ignorePins) || !obj.ignorePins.includes(pin)) {
                                        missing.push(pin);
                                    }
                                }
                            }
                            if (missing.length) {
                                console.log('missing pins ' + missing.join(', ') + ' in ' + info.baseName);
                            }
                        }
                    }
                    // console.log(info.baseName, info);
                    // Check for required keys in pins like either num or name, plus desc?

                    // Check for duplicate hardware pins
                    info.hardwarePins.sort();
                    for(let ii = 1; ii < info.hardwarePins.length; ii++) {
                        if (info.hardwarePins[ii - 1] == info.hardwarePins[ii]) {
                            if (!obj.ignoreHardwarePin || !obj.ignoreHardwarePin.includes(info.hardwarePins[ii])) {
                                console.log('duplicate hardware pin ' + info.hardwarePins[ii] + ' in ' + info.baseName);
                            }
                        }
                    }


                    // console.log(dirEntry.name, newObj);

                    // Write cleaned source
                    fs.writeFileSync(thisPlatformJsonPath, JSON.stringify(newObj, null, 4));
                }
            }
        }
        else {
            // console.log('processing ' + dir + '/' + dirEntry.name);
            const obj = JSON.parse(fs.readFileSync(path.join(dir, dirEntry.name), 'utf8'));

            // This is details.json, leave unchanged for now
        }
    }

}

function generatePinInfo(dir, output) {
    for(const dirEntry of fs.readdirSync(dir, { withFileTypes: true })) {
        const lastDotIndex = dirEntry.name.lastIndexOf('.');
        const baseName = (lastDotIndex > 0) ? dirEntry.name.substring(0, lastDotIndex) : dirEntry.name;

        if (dirEntry.isDirectory()) {
            if (dirEntry.name == 'platforms') {
                // Process platforms
                output.platforms = [];
                for(const dirEntry2 of fs.readdirSync(path.join(dir, dirEntry.name), { withFileTypes: true })) {
                    const obj = JSON.parse(fs.readFileSync(path.join(dir, dirEntry.name, dirEntry2.name), 'utf8'));
                    output.platforms.push(obj);
                }
            }
        }
        else {
            const obj = JSON.parse(fs.readFileSync(path.join(dir, dirEntry.name), 'utf8'));
            output[baseName] = obj;
        }
    }
}


/*
// This was only used once to convert the single file into multiple files
function oneTimeConvert(metalsmith, pinInfoDir) {
    const pinInfoJsonPath = metalsmith.path('../src/assets/files/pinInfo.json');

    const pinInfoJson = JSON.parse(fs.readFileSync(pinInfoJsonPath, 'utf8'));
    
    for(const key in pinInfoJson) {
        if (key == 'platforms') {
            for(const obj of pinInfoJson[key]) {
                const nameSanitized = obj.name.replace(' ', '_').toLowerCase();

                fs.writeFileSync(path.join(pinInfoDir, 'platforms', nameSanitized + '.json'), JSON.stringify(obj, null, 4));                
            }
        }
        else {
            // details
            fs.writeFileSync(path.join(pinInfoDir, key + '.json'), JSON.stringify(pinInfoJson[key], null, 4));
        }
    }
}
*/


function metalsmith(options) {
    return function (files, metalsmith, done) {
        if (!files['assets/files/pinInfo.json']) {
            done();
            return;
        }

        const pinInfoJsonPath = metalsmith.path('../src/assets/files/pinInfo.json');
        const pinInfoDir = metalsmith.path('../src/pinInfo');

        // oneTimeConvert(metalsmith, pinInfoDir);

        let output = {
            "warning": "do not edit this file directly, it is generated",
        };

        verifyPinInfo(pinInfoDir);

        generatePinInfo(pinInfoDir, output);

        const origFile = fs.readFileSync(pinInfoJsonPath, 'utf8');
        const newFile = JSON.stringify(output, null, 4);

        if (origFile != newFile) {
            files['assets/files/pinInfo.json'].contents = Buffer.from(newFile, 'utf8');
    
            fs.writeFileSync(pinInfoJsonPath, newFile);    
        }

        done();
    };
}

module.exports = {
    metalsmith,
};
