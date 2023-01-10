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

const cheerio = require("cheerio");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', '..', 'src', 'assets', 'files', 'power.json');

async function run() {
    try {
        const html = fs.readFileSync('power.html', 'utf8');
    
        const $ = cheerio.load(html);   
    
        const deviceStrings = {
            'Tracker EVB T523M (EG91-EX)': 'T523',
            'Tracker EVB T402M (BG96-NA)': 'T402',
            'TrackerOne (T523M)': 'ONE523',
            'TrackerOne (T402M)': 'ONE402',
            'Boron 2G/3G': 'BRN310',
            'Boron LTE': 'BRN402',
            'Boron LTE (BRN404X)': 'BRN404X',
            'B402 SoM': 'B402',
            'B404X': 'B404X',
            'B523 SoM': 'B523',
            'E404X': 'E404X',
            'Argon': 'ARGN-H',
            'P2': 'P2',
        };

        const modeStrings = {
            'STOP Mode': 'stop',
            'ULP Mode': 'ulp',
            'Hibernate Mode': 'hibernate',
            'Normal Mode': 'normal',
        };

        let curDevice;
        let curMode;
        let curRow;

        let data = {
            devices: {},
        };

        const stripNotes = function(s) {
            const offset = s.indexOf('[');
            if (offset > 0) {
                s = s.substring(0, offset);
            }
            return s.trim();
        }

        const normalizeValue = function(s) {
            const parts = s.split(' ');
            if (parts.length > 1) {
                s = parts[0];
            }
            return s.trim();
        }

        const processRow = function() {
            if (!curDevice || !curMode || !curRow || curRow.length < 6) {
                return;
            }
            if (curRow[0].startsWith('I')) {
                // console.log('row', curRow);
                const symbol = stripNotes(curRow[0]);

                if (!data.devices[curDevice]) {
                    data.devices[curDevice] = {
                        sku: curDevice,
                        modes: {},
                    }
                }
                if (!data.devices[curDevice].modes[curMode]) {
                    data.devices[curDevice].modes[curMode] = {};
                }
                data.devices[curDevice].modes[curMode][symbol] = {
                    min: normalizeValue(curRow[2]),
                    typ: normalizeValue(curRow[3]),
                    max: normalizeValue(curRow[4]),
                    unit: curRow[5],
                };
            }
        }

        for(const elem1 of $('h1,h2,h3,table')) {
            if (elem1.tagName == 'table') {
                for(const elem2 of $(elem1).find('tr,td')) {
                    if (elem2.tagName == 'tr') {
                        processRow();
                        curRow = [];
                    }
                    else {
                        curRow.push($(elem2).text().replaceAll('\n', ' ').replace(/ [ ]+/g, ' ').trim());
                    }
                }
            }
            else {
                let headingText = $(elem1).text().trim();

                switch(elem1.tagName) {
                    case 'h1':
                        headingText = stripNotes(headingText);
                        if (deviceStrings[headingText]) {
                            curDevice = deviceStrings[headingText];
                            // console.log('curDevice=' + curDevice);
                        }
                        else {
                            // console.log('unknown device ' + headingText);
                            curDevice = null;
                        }
                        break;

                    case 'h2':
                        break;

                    case 'h3':
                        if (curDevice && modeStrings[headingText]) {
                            curMode = modeStrings[headingText];
                            // console.log('curMode=' + curMode + ' curDevice=' + curDevice);
                        }
                        else {
                            curMode = null;
                        }
                        break;

                    default:
                        console.log('headingText ' + elem1.tagName + ': ' + headingText);
                        break;
                }

            }
        }


        let oldString;
        try {
            oldString = fs.readFileSync(outputPath, 'utf8');
        }
        catch(e) {            
        }
        
        const newString = JSON.stringify(data, null, 4);
        if (oldString != newString) {
            console.log('updated ' + outputPath);
            fs.writeFileSync(outputPath, newString);
        }
    }
    catch(e) {
        console.log('exception', e);
    }
}

run();
