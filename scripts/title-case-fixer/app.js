// Open the Particle Device Power Consumption Reference Manual (internal)
// Export as HTML
// Copy the html file to power.html in this directory
// Run the script:
//  node app.js
// This will update src/assets/files/power.json if the file has changed

// File structure:
// object
//   devices: object key = SKU, value = object
//     .sku: same as key
//     .modes: object key = symbol, value = object
//       .min, .typ, .max, .unit

const fs = require('fs');
const path = require('path');

const topPath = path.join(__dirname, '..', '..');
const dictionaryPath = path.join(topPath, '.spelling');
const contentPath = path.join(topPath, 'src', 'content');

let dictionary = {};

// Additional exceptions not in the dictionary. Mostly multi-word combinations that need
// to be handled specially
const exceptionStrings = [
    '(USB/VUSB/VIN-powered)',
    '(Atom IDE)',
    '(Web IDE)',
    '2FA',
    'Android',
    'Atom IDE',
    'API',
    'B Series',
    'Device ID',
    'Electron',
    'E Series',
    'Gen 2',
    'Gen 3',
    'Gen 4',
    'G350',
    'ID',
    'IDE',
    'JTAG',
    'LED',
    'Linux',
    'LTE Cat M1',
    'Mac',
    'MFA',
    'MVP',
    'MVPs',
    'non-US',
    'P Series',
    'Photon',
    'Photon\'s',
    'PINs',
    'RF',
    'SIM',
    'SOS',
    'SoM',
    'SWD',
    'SWD/JTAG',
    'U260',
    'U270',
    'US',
    'USB',
    'VIN',
    'VUSB',
    'Web IDE',
    'Windows',
];
let exceptionDictionary = {};

let punctuationArray = ['.', '?', '!', ':', ',', ];

function updateHeading(line, options) {
    const partsArray = line.split(' ');
    const newPartsArray = [...partsArray];

    let firstWord = true;
    let lastWord;

    for(let ii = 0; ii < partsArray.length; ii++) {
        const partOrig = partsArray[ii];
        let part = partOrig;

        if (lastWord) {
            let lastWordPunctuation = false;
            for(const s of punctuationArray) {
                if (lastWord.endsWith(s)) {
                    lastWordPunctuation = true;
                    break;
                }
            }
            if (lastWordPunctuation) {
                continue;
            }
        }

        const partLower = partOrig.toLocaleLowerCase();
        if (partLower != part) {
            // Case changed
            let isException = false;

            if (exceptionDictionary.hasOwnProperty(partLower)) {
                isException = true;
                for(let jj = 1; jj < exceptionDictionary[partLower].length; jj++) {
                    if ((ii + jj) >= partsArray.length) {
                        isException = false;
                        break;
                    }
                    if (partsArray[ii + jj].toLocaleLowerCase() != exceptionDictionary[partLower][jj].toLocaleLowerCase()) {
                        isException = false;
                        break;
                    }
                }
            }

            if (isException) {
                for(let jj = 0; jj < exceptionDictionary[partLower].length; jj++) {
                    newPartsArray[ii + jj] = exceptionDictionary[partLower][jj];
                }
                ii += exceptionDictionary[partLower].length - 1;
            }
            else
            if (dictionary[partLower]) {
                // console.log('skipping ' + part + ', is in dictionary');
            }
            else if (!firstWord) {                
                newPartsArray[ii] = partLower;
            }
            else {
                if (partLower.length > 0) {
                    const firstChar = partLower.charCodeAt(0);
                    if (firstChar >= 97 && firstChar <= 122) {
                        firstWord = false;
                    }
                }
            }
        }

        lastWord = partOrig;
    }


    const newLine = newPartsArray.join(' ');

    if (newLine != line) {
        console.log(options.mdFile, ': line ' + options.lineNum + ':');
        console.log('old: ' + line);
        console.log('new: ' + newLine);
        line = newLine;
    }

    return line;
}

async function processFile(mdFile) {
    // console.log('processFile ' + mdFile);
    const origText = fs.readFileSync(mdFile, 'utf8');
    let newTextArray = [];

    let lineNum = 1;
    for(let line of origText.split('\n')) {
        if (line.startsWith('#')) {
            // A heading
            line = updateHeading(line, {
                lineNum,
                mdFile,
            });
        }
        newTextArray.push(line);
        lineNum++;
    }

    const newText = newTextArray.join('\n');
    if (newText != origText) {
        console.log('file changed ' + mdFile);
        fs.writeFileSync(mdFile, newText);
    }
}

async function processDir(dir) {
    // console.log('processDir ' + dir);
    for(const dirEntry of fs.readdirSync(dir, {withFileTypes: true})) {
        const newPath = path.join(dir, dirEntry.name);
        if (dirEntry.isFile()) {
            if (dirEntry.name.endsWith('.md')) {
                await processFile(newPath);
            }
        }
        else
        if (dirEntry.isDirectory()) {
            await processDir(newPath);
        }
    }
}


async function run() {
    try {
        // Load spelling dictionary
        for(let line of fs.readFileSync(dictionaryPath, 'utf8').split('\n')) {
            line = line.trim();
            if (!line.startsWith('- ')) {
                const lowercaseEntry = line.toLocaleLowerCase();
                if (lowercaseEntry != line) {
                    dictionary[lowercaseEntry] = line;
                }
            }
        }
        // console.log('dictionary', dictionary);

        for(const string of exceptionStrings) {
            const parts = string.split(' ');
            exceptionDictionary[parts[0].toLocaleLowerCase()] = parts;
        }        
        // console.log('exceptionDictionary', exceptionDictionary);

        await processDir(contentPath);
    }
    catch(e) {
        console.log('exception', e);
    }
}

run();
