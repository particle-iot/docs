// This decoder work on browser and node.js

logDecoder = {
    urlPrefix: '',
    files: {
        carriersJson: {
            url: 'carriers.json',
        },
        mccMncJson: {
            url: 'mccmnc.json',
        },
    },
    decodersForCategory: {},
    decodersForModem: [],
    options: {},
    stateDefault: {
        lines: [],
        lineNum: 1,
        commands: [],        
        jsonData: {},
    },
    state: {},
    lastCommand: null,
    jsonInfo: [
        {
            key: 'deviceInfo',
            uuid: 'e4360a84-c13a-4dad-a516-2d801935ec4e',
            mergeKeys: true,
        },
        {
            key: 'deviceVitals',
            uuid: 'a71f7ea4-defd-407f-83f2-87f7679e8182',
        },
    ],
};

logDecoder.zeroPad = function(n, places) {
    if (typeof n == 'number') {
        n = n.toString();
    }
    if (n.length < places) {
        n = '000000000000'.substring(places - n.length) + n;
    }
    return n;
}

// Call the logDecoder.load() method from document ready (after the DOM has been loaded)
logDecoder.load = async function() { 
    
    logDecoder.state = JSON.parse(JSON.stringify(logDecoder.stateDefault));

    // Load the carriers.json file. Of interest in this file are the top level keys:
    // - deviceConstants: information about platforms
    // - countryCarrier: information about carriers, mcc, and mnc
    // - skus: information about device SKUs and serial number prefixes
    //
    // The test server loads the file locally, but you can override this by setting
    // logDecoder.carriersJsonUrl to a different URL. CORS restrictions may apply.

    const promises = [];

    for(const key in logDecoder.files) {
        if (logDecoder.files[key].url) {
            const prom = new Promise(function(resolve, reject) {
                fetch(logDecoder.urlPrefix + logDecoder.files[key].url)
                    .then(response => response.json())
                    .then(function(result) {
                        logDecoder[key] = result;
                        resolve();
                    });
            });
            promises.push(prom);
        }
    }
    await Promise.all(promises);

    if (typeof logDecoder.ready == 'function') {
        // If there is a ready function, call it now that the carriers.json file has been loaded
        logDecoder.ready();
    }

    // console.log('log-decoder ready', logDecoder);
}

logDecoder.clear = function() {
    logDecoder.state = JSON.parse(JSON.stringify(logDecoder.stateDefault));
    // console.log('logDecoder.clear', {state: logDecoder.state, stateDefault: logDecoder.stateDefault});
}

logDecoder.parseCommaList = function(data) {
    let result = [];

    // Like: 2,5,"57fb","02171306",7

    let inString = false;
    let curPart = '';
    let curPartIsString = false;

    for(let ii = 0; ii < data.length; ii++) {
        if ((!inString && data[ii] == ',') || ((ii + 1) == data.length)) {
            // Is a comma and not in a string
            // or
            // Is at the end of the string
            if ((ii + 1) == data.length) {
                curPart += data[ii];
            }

            const isDecimalRE = /^([0-9]+)$/;
            if (!curPartIsString) {
                const m = curPart.match(isDecimalRE);
                if (m) {
                    curPart = parseInt(m[1]);
                }
            }
            result.push(curPart);
            curPart = '';
            curPartIsString = false;
        }
        else
        if (data[ii] == '"') {
            if (!inString) {
                // Start of string
                curPartIsString = true;
            }
            else {
                // End of string
            }
            inString = !inString;
        }
        else {
            curPart += data[ii];
        }
    }

    if (result.length < 2) {
        // Not a comma separated list, but allow it, so AT+UBANDMASK works if it only has one value (it can have more than one)
    }

    return result;
}

// Parse log messages
//
// data can be an array of lines, or can be a string. If a string, this function will handle buffering partial lines.
logDecoder.parse = async function(data) {

    let lines = [];

    if (typeof data === 'string') {
        // TODO: Normalize end-of-line characters here

        if (typeof logDecoder.state.bufferedData == 'string') {
            data = logDecoder.state.bufferedData + data;            
            logDecoder.state.bufferedData = null;
        }

        lines = data.split('\n');
        if (!data.endsWith('\n') && !logDecoder.options.flushData) {
            // Save partial line for later
            if (lines.length > 0) {
                logDecoder.state.bufferedData = lines[lines.length - 1];
                lines.splice(lines.length - 1, 1);
            }
        }
    }
    else
    if (Array.isArray(data)) {
        lines = data;
    }
    else {
        console.log('data unknown format');
    }

    // Gen 3 and Gen 4:
    // 0000003205 [ncp.at] TRACE: > AT+UMNOPROF?
    // 0000003209 [ncp.at] TRACE: < +UMNOPROF: 90
    // 0000003209 [ncp.at] TRACE: < OK
    // 0000003209 [ncp.at] TRACE: > AT+UBANDMASK?
    // 0000003213 [ncp.at] TRACE: < +UBANDMASK: 0,185473183,1048578
    // 0000003213 [ncp.at] TRACE: < OK
    const lineRE = /([0-9]+) \[(.*)\] ([A-Za-z]+): (.*)/;

    // Gen 2
    // 68.933 AT send       8 "AT+CSQ\r\n"
    // 68.938 AT read  +   14 "\r\n+CSQ: 1,99\r\n"
    // 68.939 AT read OK    6 "\r\nOK\r\n"
    // 68.939 AT send      10 "AT+CREG?\r\n"
    // 68.946 AT read  +   14 "\r\n+CREG: 2,2\r\n"
    // 68.947 AT read OK    6 "\r\nOK\r\n"
    const atGen2RE = /([0-9]+.[0-9]+) AT ([a-z]+) +([^0-9]*)([0-9]+) +"([^"]*)/;

    for(const line of lines) {
        const lineObj = {
            orig: line,
            lineNum: logDecoder.state.lineNum++,
        };
        const m = line.match(lineRE);
        if (m) {
            lineObj.ts = parseInt(m[1]);
            lineObj.category = m[2];
            lineObj.level = m[3];
            lineObj.msg = m[4];

            if (lineObj.category == 'ncp.at') {
                if (lineObj.msg.startsWith('> ') || lineObj.msg.startsWith('< ')) {
                    lineObj.dir = lineObj.msg[0];
                    lineObj.msg = lineObj.msg.substring(2);
                }
            }
        }
        else {
            const m2 = line.match(atGen2RE);
            if (m2) {
                lineObj.ts = (parseFloat(m2[1]) * 1000);
                lineObj.category = 'ncp.at';
                lineObj.level = 'TRACE';

                if (m2[2] == 'send') {
                    lineObj.dir = '>';
                }
                else 
                if (m2[2] == 'read') {
                    lineObj.dir = '<';
                }

                // TODO: Something better with this
                lineObj.atType = m2[3].trim();
                lineObj.atSize = parseInt(m2[4]);
                lineObj.msg = m2[5].replaceAll('\\r', '').replaceAll('\\n', '').trim();
            }
        }

        if (lineObj.category) {
            const decoder1 = logDecoder.decodersForCategory[lineObj.category];
            if (typeof decoder1 != 'undefined') {
                if (Array.isArray(decoder1)) {
                    for(const decoder2 of decoder1) {
                        decoder2(lineObj);
                    }
                }
                else {
                    decoder1(lineObj);
                }
            }
            if (lineObj.category == 'ncp.at') {
                if (lineObj.dir == '>') {
                    logDecoder.lastCommand = {
                        ts: Date.now(),
                        sendObj: lineObj,
                    };

                    const cmdRE = /\+([A-Z]+)/;
                    const m = lineObj.msg.match(cmdRE);
                    if (m) {
                        logDecoder.lastCommand.cmd = m[1];
                    }

                    const equalIndex = lineObj.msg.indexOf('=');

                    if (lineObj.msg.endsWith('=?') > 0) {
                        logDecoder.lastCommand.atKind = 'test';
                    }
                    else 
                    if (lineObj.msg.endsWith('?')) {
                        logDecoder.lastCommand.atKind = 'read';
                    }
                    else 
                    if (equalIndex > 0) {
                        logDecoder.lastCommand.atKind = 'set';

                        logDecoder.lastCommand.sendCommaList = logDecoder.parseCommaList(lineObj.msg.substring(equalIndex + 1));
                    }
                    else {
                        logDecoder.lastCommand.atKind = 'action';
                    }
                }
                else 
                if (lineObj.dir == '<') {

                    if (!lineObj.msg.startsWith('+')) {
                        // Not a plus response
                        const resultRE = /^([A-Z ]+)$/;
                        const m = lineObj.msg.match(resultRE);
                        if (m) {
                            // Probably OK, ERROR, etc.
                            logDecoder.lastCommand.result = lineObj.atResult = m[1];
                            logDecoder.lastCommand.resultObj = lineObj;

                            if (logDecoder.lastCommand.plusData && logDecoder.lastCommand.plusData.length == 1) {
                                // A single line + response

                                // Handle comma separated list (commaList will be null if it's not one)
                                // 0000004578 [ncp.at] TRACE: > AT+CEREG?
                                // 0000004582 [ncp.at] TRACE: < +CEREG: 2,5,"57fb","02171306",7
                                // 0000004583 [ncp.at] TRACE: < OK
                                logDecoder.lastCommand.commaList = logDecoder.parseCommaList(logDecoder.lastCommand.plusData[0]);

                            }
                    
                            for(const decoder1 of logDecoder.decodersForModem) {
                                decoder1(logDecoder.lastCommand)
                            }
                            // TODO: Limit this to some reasonable size
                            logDecoder.state.commands.push(logDecoder.lastCommand);
                            lineObj.command = logDecoder.lastCommand;
                            
                            logDecoder.lastCommand = null;
                        }
                        else {
                            // Could be a non-plus read response like for AT+CIMI
                            // Or multiple non-plus like AT+UGPIOC?
                            if (!logDecoder.lastCommand.nonPlusObj) {
                                logDecoder.lastCommand.nonPlusObj = [];
                            }
                            logDecoder.lastCommand.nonPlusObj.push(lineObj);

                        }

                    }
                    else {
                        const plusRE = /\+([A-Z]+): +(.*)/;
                        const m = lineObj.msg.match(plusRE);
                        if (m) {
                            if (logDecoder.lastCommand && m[1] == logDecoder.lastCommand.cmd) {
                                // + response that matches the previously issued command
                                if (!logDecoder.lastCommand.plusData) {
                                    logDecoder.lastCommand.plusData = [];
                                }
                                logDecoder.lastCommand.plusData.push(m[2]);

                                if (!logDecoder.lastCommand.plusObj) {
                                    logDecoder.lastCommand.plusObj = [];
                                }
                                logDecoder.lastCommand.plusObj.push(lineObj);                                
                            }
                            else {
                                // The + response did not match the command, is probably a URC
                                const commandObj = {
                                    ts: Date.now(),
                                    atKind: 'URC',
                                    urc: m[1],
                                    urcData: m[2],
                                    commaList: logDecoder.parseCommaList(m[2]),
                                    lineObj,
                                };
                                for(const decoder1 of logDecoder.decodersForModem) {
                                    decoder1(commandObj);
                                }
                                logDecoder.state.commands.push(commandObj);

                                lineObj.command = commandObj;
                            }
                        }


                    }
                }
            }
        }
        
        if (logDecoder.state.jsonDataNext) {

            try {
                const json = JSON.parse(line);

                if (logDecoder.state.jsonDataNext.mergeKeys) {
                    if (!logDecoder.state.jsonData[logDecoder.state.jsonDataNext.key]) {
                        logDecoder.state.jsonData[logDecoder.state.jsonDataNext.key] = {};
                    }
                    for(const key in json) {
                        logDecoder.state.jsonData[logDecoder.state.jsonDataNext.key][key] = json[key];
                    }
                }
                else {
                    logDecoder.state.jsonData[logDecoder.state.jsonDataNext.key] = json;
                }

                // Calculated fields
                if (json.mcc && json.mnc) {
                    const mccMncObj = logDecoder.mccMncJson.find(e => e.mcc == json.mcc && e.mnc == json.mnc);
                    if (mccMncObj) {
                        json.Country = mccMncObj.country;
                        json.Carrier = mccMncObj.name;
                        logDecoder.state.mccMncObj = mccMncObj;
                    }

                    if (logDecoder.state.skuObj) {
                        const mccMncStr = logDecoder.zeroPad(json.mcc, 3) + logDecoder.zeroPad(json.mnc, 3);

                        for(const ccObj of logDecoder.carriersJson.countryCarrier) {
                            if (ccObj.mnc && ccObj.mnc[mccMncStr]) {
                                logDecoder.state.simsObj = logDecoder.carriersJson.sims.find(e => e.id == logDecoder.state.skuObj.sim);
                                if (logDecoder.state.simsObj) {
                                    logDecoder.state.planObj = ccObj[logDecoder.state.simsObj.simPlanKey];
                                }
                                logDecoder.state.ccObj = ccObj;
                                // console.log('found', {simsObj: logDecoder.state.simsObj, ccObj: logDecoder.state.ccObj, planObj: logDecoder.state.planObj});
                                break;
                            }
                        }

                    }
                }
                if (json.serial) {
                    const skuObj = logDecoder.carriersJson.skus.find(e => json.serial.startsWith(e.prefix));
                    if (skuObj) {
                        logDecoder.state.skuObj = lineObj.skuObj = skuObj;
                    }
                }

                lineObj.jsonDataKey = logDecoder.state.jsonDataNext.key;
                lineObj.jsonData = json;


                // console.log('updated jsonData ' + logDecoder.state.jsonDataNext.key, logDecoder.state.jsonData[logDecoder.state.jsonDataNext.key]);
            }
            catch(e) {                
            }
            logDecoder.state.jsonDataNext = null;
        }
        else {
            for(const obj of logDecoder.jsonInfo) {
                if (line.indexOf(obj.uuid) >= 0) {
                    logDecoder.state.jsonDataNext = obj;
                    break;
                }
            }
        }



        logDecoder.state.lines.push(lineObj);
    }

    // console.log('parse', logDecoder.state)
}

logDecoder.getRawLogs = function() {
    let result = '';

    for(const lineObj of logDecoder.state.lines) {
        result += lineObj.orig + '\n';
    }

    return result;
}
