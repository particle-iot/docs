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
const mdOutputPath = path.join(__dirname, 'power.md');

async function run() {
    try {
        const html = fs.readFileSync('power.html', 'utf8');
    
        const $ = cheerio.load(html);   
    
        // TODO: These are also in power.json now, and should be retrieved from there instead

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
            'Photon 2': 'PHN2',
            'MSoM (EG91, EVT)': 'M524',
            'MSoM (BG95 (2G/CAT-M1), EVT)': 'M404',
        };

        const modeStrings = {
            'STOP Mode': 'stop',
            'ULP Mode': 'ulp',
            'Hibernate Mode': 'hibernate',
            'Normal Mode': 'normal',
            'Normal Mode @200MHz': 'normal',
            'Normal Mode @50MHz': '',
        };
        const mdLabels = {
            'Iidle': 'Operating current (uC on, peripherals and radio disabled)',
            'Ible_adv': 'Operating current (uC on, BLE advertising)',
            'Ible_conn_idle': 'Operating current (uC on, BLE connected but idle)',
            'Ible_scan': 'Operating current (uC on, BLE scanning)',
            'Icell_idle': 'Operating current (uC on, cellular on but not connected)',
            'Icell_conn_twr': 'Operating current (uC on, cellular connecting to tower)',
            'Icell_conn_cloud': 'Operating current (uC on, cellular connecting to cloud)',
            'Icell_cloud_idle': 'Operating current (uC on, cellular connected but idle)',
            'Icell_cloud_tx': 'Operating current (uC on, cellular connected and transmitting)',
            'Icell_idle_catm1': 'Operating current (uC on, cellular on but not connected using LTE Cat M1)',
            'Icell_conn_twr_catm1': 'Operating current (uC on, cellular connecting to tower using LTE Cat M1)',
            'Icell_conn_cloud_catm1': 'Operating current (uC on, cellular connecting to cloud using LTE Cat M1)',
            'Icell_cloud_idle_catm1': 'Operating current (uC on, cellular connected but idle using LTE Cat M1)',
            'Icell_cloud_tx_catm1': 'Operating current (uC on, cellular connected and transmitting using LTE Cat M1)',
            'Icell_idle_2g': 'Operating current (uC on, cellular on but not connected using 2G)',
            'Icell_conn_twr_2g': 'Operating current (uC on, cellular connecting to tower using 2G)',
            'Icell_conn_cloud_2g': 'Operating current (uC on, cellular connecting to cloud using 2G)',
            'Icell_cloud_idle_2g': 'Operating current (uC on, cellular connected but idle using 2G)',
            'Icell_cloud_tx_2g': 'Operating current (uC on, cellular connected and transmitting using 2G)',
            'Iwifi_idle': 'Operating current (uC on, Wi-Fi on but not connected)',
            'Iwifi_conn_ap': 'Operating current (uC on, Wi-Fi connecting to access point)',
            'Iwifi_conn_cloud': 'Operating current (uC on, Wi-Fi connecting to cloud)',
            'Iwifi_cloud_idle': 'Operating current (uC on, Wi-Fi connected but idle)',
            'Iwifi_cloud_tx': 'Operating current (uC on, Wi-Fi connected and transmitting)',
            'Istop_gpio': 'STOP mode sleep, GPIO wake-up',
            'Istop_intrtc': 'STOP mode sleep, RTC wake-up',
            'Iulp_gpio': 'ULP mode sleep, GPIO wake-up',
            'Iulp_intrtc': 'ULP mode sleep, RTC wake-up',
            'Ihib_gpio': 'HIBERNATE mode sleep, GPIO wake-up',
            'Ihib_intrtc': 'HIBERNATE mode sleep, RTC wake-up'
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
            return parseFloat(s);
        }

        const processRow = function() {
            if (!curDevice || !curMode || !curRow || curRow.length < 6) {
                return;
            }

            if (curRow[1].trim().length == 0) {
                // Workaround for empty duplicated fields in MSoM (BG95 (2G/CAT-M1), EVT)
                // console.log('skip row', curRow);
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

                curRow = [];
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
                processRow();
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
                        curMode = null;
                        for(const key in modeStrings) {
                            if (curDevice && headingText.startsWith(key)) {
                                curMode = modeStrings[key];
                                // console.log('curMode=' + curMode + ' curDevice=' + curDevice);
                            }                                
                        }
                        if (curDevice && !curMode) {
                            console.log('unknown h3 for ' + curDevice, headingText);
                        }
                        break;

                    default:
                        console.log('headingText ' + elem1.tagName + ': ' + headingText);
                        break;
                }

            }
        }

        // Data cleanup code is duplicated in src/assets/js/power-consumption.js, should fix that

        // Fix missing data
        for(const key in data.devices.T402.modes.normal) {
            if (!data.devices.ONE402.modes.normal[key]) {
                data.devices.ONE402.modes.normal[key] = data.devices.T402.modes.normal[key]; 
            }
        }
        for(const key in data.devices.T523.modes.normal) {
            if (!data.devices.ONE523.modes.normal[key]) {
                data.devices.ONE523.modes.normal[key] = data.devices.T523.modes.normal[key]; 
            }
        }

        // Stop and ULP modes are the same on these devices
        for(const dev of ['M524', 'M404', 'PHN2', 'P2']) {
            data.devices[dev].modes.ulp = {};

            for(const key in data.devices[dev].modes.stop) {
                data.devices[dev].modes.ulp[key.replace('stop', 'ulp')] = data.devices[dev].modes.stop[key];
            }
        }

        /*
        if (data.devices.ONE402.modes.normal.Iconn_cloud.unit == 'TBD') {
            data.devices.ONE402.modes.normal = data.devices.ONE523.modes.normal;
        }
        */


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

        let md = '';
        for(const device in data.devices) {
            md += '\n\n## ' + device + '\n\n';

            md += '| Parameter | Symbol | Min | Typ | Peak | Unit |\n';
            md += '| :---|:---|:---:|:---:|:---:|:---:\n';
            
            for(const key in mdLabels) {
                let value;
                for(const mode in data.devices[device].modes) {
                    value = data.devices[device].modes[mode][key];
                    if (value) {
                        break;
                    }
                }
                if (value) {
                    // console.log('device ' + device + ' key=' + key, value);

                    let mdTemp = '';
                    mdTemp += '| ' + mdLabels[key] + ' ';
                    mdTemp += '| I<sub>' + key.substring(1) + '</sub> ';

                    let hasValue = false;

                    for(const valueKind of ['min', 'typ', 'max']) {
                        let val = value[valueKind];
                        // console.log('checking', {valueKind, val});
                        if (typeof val == 'number') {
                            if (val <= 0 || Number.isNaN(val)) {
                                val = '';
                            }
                            else {
                                hasValue = true;
                            }
                        }
                        else {
                            val = '';
                        }
                        mdTemp += '| ' + val + ' ';
                    }
                    mdTemp += '| ' + value.unit + ' |\n';

                    if (hasValue) {
                        md += mdTemp;
                    }

                }
            }
        }

        fs.writeFileSync(mdOutputPath, md);
    }
    catch(e) {
        console.log('exception', e);
    }
}

run();
