let calc = {};

// Requires:
// https://github.com/DomenicoDeFelice/jsrand


$(document).ready(function() {
    $('.bleTdmCalculatorExample').each(function() {
        const thisPartial= $(this);

        const buttonElem = $(thisPartial).find(".bleTdmExample");
        const loadedElem = $(thisPartial).find('.loadedDiv')

        const param = $(buttonElem).data('param');
        if (param && param.length > 0) {            
            $(buttonElem).on('click', function() {
                $(buttonElem).prop('disabled', true);
                calc.loadParamStr(param);
                $(loadedElem).show();
                setTimeout(function() {
                    $(loadedElem).hide();
                    $(buttonElem).prop('disabled', false);
                }, 1000);
            })
        }
    });

    $('.bleTdmCalculator').each(function() {
        const thisPartial = calc.partial = $(this);

        $(thisPartial).data('calc', calc);

        calc.urlParams = new URLSearchParams(window.location.search);

        calc.inputValues = {};
        calc.inputUrlParams = {};

        calc.timeSliderElem = $(thisPartial).find('.timeSlider');
        calc.timePositionElem = $(thisPartial).find('.timePosition');
        calc.zoomSliderElem = $(thisPartial).find('.zoomSlider');

        calc.cssPropertyRoot = getComputedStyle($('html')[0]);
        calc.successColor = calc.cssPropertyRoot.getPropertyValue('--theme-status-success-color');
        calc.failureColor = calc.cssPropertyRoot.getPropertyValue('--theme-status-danger-color');
        calc.monospaceFont = calc.cssPropertyRoot.getPropertyValue('--theme-monospace-font');

        calc.numDecimalPlaces = 0;
        calc.columnWidths = {
            advStart: 65,
            bleStart: 60,
            bleEnd: 60,
            sensorValue: 70,
            sensorResultLabel: (65 + 60 + 60 + (3 * 6)),    
        };


        calc.testRunSensorResultFields = [
            {
                title: 'Sample in period',
                key: 'numSamples',
            },
            {
                title: 'BLE success',
                key: 'successPct',
                append: '%',
            },
            {
                title: 'BLE missed',
                key: 'failurePct',
                append: '%',
            },
            {
                title: 'Latency normal',
                key: 'latency1Pct',
                append: '%',
            },
            {
                title: 'Latency missed 1',
                key: 'latency2Pct',
                append: '%',
            },
            {
                title: 'Latency missed 2',
                key: 'latency3Pct',
                append: '%',
            },
            {
                title: 'Latency missed 3+',
                key: 'latencyMorePct',
                append: '%',
            },
            {
                title: 'Mean latency',
                key: 'latencyMeanStr',
            },
            {
                title: 'Minimim latency',
                key: 'latencyMinStr',
            },
            {
                title: 'Maximum latency',
                key: 'latencyMaxStr',
            },

        ];

        calc.sensorResultElem = $(thisPartial).find('.sensorResultTable')[0].cloneNode(true);

        
        // Empty timeline
        calc.timelineElem = $(thisPartial).find('.bleTdmTimeline')[0].cloneNode(true);

        calc.padNumber = function(n, places) {
            let s = ((typeof n == 'number') ? n.toString() : n);

            if (s.length < places) {
                s = '000000000000000'.substring(0, places - s.length) + s;
            }

            return s;
        }

        calc.msToText = function(msIn) {
            let temp = msIn;
            
            const ms = temp % 1000;
            temp = Math.floor(temp / 1000);

            const sec = temp % 60;
            temp = Math.floor(temp / 60);

            const min = temp;

            return min + ':' + calc.padNumber(sec, 2) + ':' + calc.padNumber(ms, 3);
        }  

        calc.msWithDecimal = function(msIn, options) {
            let msStr = msIn.toString();
            const eOffset = msStr.indexOf('e');
            if (eOffset >= 0) {
                // Probably could do something better with scientific notation here, but it's an edge case
                return msStr;
            }

            let whole;
            let dec;

            const dotOffset = msStr.indexOf('.');
            if (dotOffset >= 0) {
                // Has decimal
                whole = msStr.substring(0, dotOffset);
                dec = msStr.substring(dotOffset + 1) + '000000000000000';
            }
            else {
                whole = msStr;
                dec = '000000000000000';
            }

            if (options.places > 0) {
                return whole + '.' + substring(dec, options.places);
            }
            else {
                return whole;
            }
        }


      
        calc.getIntervals = function(ms) {
            let result = {};

            result.windowStartBle = 0; // Formerly calc.inputValues.o;
            result.windowStartWiFi = result.windowStartBle + (calc.inputValues.ws * calc.inputValues.b / 100);
            result.windowEnd = result.windowStartBle + calc.inputValues.ws;

            const numWindowsBefore = Math.floor((ms - result.windowStartBle) / calc.inputValues.ws);
            result.windowStartBle += numWindowsBefore * calc.inputValues.ws;
            result.windowStartWiFi += numWindowsBefore * calc.inputValues.ws;
            result.windowEnd += numWindowsBefore * calc.inputValues.ws;

            result.windowEndBle = result.windowStartWiFi;
            result.windowEndWiFi = result.windowEnd;

            return result;
        }

        calc.setStatus = function(s) {
            $(thisPartial).find('.bleTdmStatus').text(s);
        }



        calc.calculate = function() {

            if (!calc.isValid) {
                calc.setStatus(calc.inputError);
                $(thisPartial).find('.bleTdmTimeline').hide();
                return;
            }

            // Psuedo random number generator is always seeded on calc so restoring the page with the same
            // parameters always results in the same results. This is intentional!
            calc.rnd = new Srand(10);

            // Calculate offsets
            const offsetIncrement = Math.ceil(calc.inputValues.ws / 5); // Default ws (window size) is 100
            calc.offsets = [];
            for(let ii = 0; ii < calc.inputValues.ws; ii += offsetIncrement) {
                calc.offsets.push(ii);
            }
            // calc.offsets = [calc.offsets[0]]; // TEMPORARY

            calc.testRuns = [];
            calc.results = {};

            // Remove old timelines
            $(thisPartial).find('.bleTdmTimelineContainer').empty();

            for(let ii = 0; ii < calc.offsets.length; ii++) {
                const timelineElem = calc.timelineElem.cloneNode(true);

                $(timelineElem).find('.testRunLabel').text((ii + 1) + ' (' + calc.offsets[ii] + ' ms offset)');

                $(thisPartial).find('.bleTdmTimelineContainer').append(timelineElem);

                calc.testRuns.push({
                    index: ii,
                    offset: calc.offsets[ii],
                    timelineElem,
                });
            }
            
            calc.setStatus('');
            $(thisPartial).find('.bleTdmTimeline').show();
            
            const testDurationMs = calc.inputValues.d * 1000;

            for(const testRunObj of calc.testRuns) {
                testRunObj.packetTimes = [];

                testRunObj.sensors = [];
                for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                    testRunObj.sensors.push({
                        packets: [],
                        results: {},
                        index: ii,
                        sensorObj: calc.inputValues.sensors[ii],
                    });
                }
                
                for(const testRunSensorObj of testRunObj.sensors) {
                    
                    ms = testRunObj.offset; 
                    testRunSensorObj.results.successCount = 0;
    
                    while(ms < testDurationMs) {
                        const advStart = ms;
                        let msNext;

                        if (testRunSensorObj.sensorObj.it == 'f') {
                            // Fixed interval
                            msNext = ms + testRunSensorObj.sensorObj.i;
                        }
                        else {
                            msNext = ms + calc.rnd.intInRange(Math.ceil(testRunSensorObj.sensorObj.rmin), Math.floor(testRunSensorObj.sensorObj.rmax));
                        }

                        // Handle repeats
                        let savePacket;

                        for(let repeatNum = 0; repeatNum <= testRunSensorObj.sensorObj.r; repeatNum++) {
                            if (testRunSensorObj.sensorObj.j > 0) {
                                // Random jitter
                                ms += calc.rnd.intInRange(0, testRunSensorObj.sensorObj.j);
                            }
    
                            const intervals = calc.getIntervals(ms);
        
                            let packet = {
                                startMs: ms,
                                endMs: ms + testRunSensorObj.sensorObj.l,                        
                                windowStartBle: intervals.windowStartBle,
                                windowEndBle: intervals.windowEndBle,
                            };
        
                            packet.success = (packet.startMs >= intervals.windowStartBle && packet.endMs <= intervals.windowEndBle);
                            if (packet.success) {
                                savePacket = packet;
                                break;
                            }
        
                            if (!savePacket) {
                                savePacket = packet;
                            }
                        }

                        if (savePacket) {
                            if (savePacket.success) {
                                testRunSensorObj.results.successCount++;
                            }
                            ms = savePacket.startMs;
                            testRunSensorObj.packets.push(savePacket);

                            if (!testRunObj.packetTimes.includes(ms)) {
                                testRunObj.packetTimes.push(ms);
                            }
                        }
    
                        ms = msNext;
                    }
    
                    testRunSensorObj.results.numSamples = testRunSensorObj.packets.length;
    
                    if (testRunSensorObj.results.numSamples > 0) {
                        testRunSensorObj.results.successPct = Math.round(testRunSensorObj.results.successCount * 100 / testRunSensorObj.results.numSamples);
                    }
                    else {
                        testRunSensorObj.results.successPct = 0;
                    }
                    testRunSensorObj.results.failurePct = 100 - testRunSensorObj.results.successPct;
                }
    
                for(const testRunSensorObj of testRunObj.sensors) {
                    testRunSensorObj.results.latency1 = 0;
                    testRunSensorObj.results.latency2 = 0;
                    testRunSensorObj.results.latency3 = 0;
                    testRunSensorObj.results.latencyMore = 0;
                    testRunSensorObj.results.latencyCount = 0;
                    testRunSensorObj.results.latencyMeanStr = '';
                    testRunSensorObj.results.latencyMin = undefined;
                    testRunSensorObj.results.latencyMax = undefined;
    
                    let latencySum = 0;
    
                    for(let ii = 0; ii < testRunSensorObj.packets.length - 1; ii++) {
                        let thisPacketLatency;
                        let thisPacketLatencyMs;

                        for(let jj = ii + 1; jj < testRunSensorObj.packets.length; jj++) {
                            if (testRunSensorObj.packets[jj].success) {
                                thisPacketLatency = jj - ii;
                                thisPacketLatencyMs = testRunSensorObj.packets[jj].startMs - testRunSensorObj.packets[ii].startMs;
                                break;
                            }
                        }
                        if (thisPacketLatency) {
                            testRunSensorObj.packets[ii].latency = thisPacketLatency;
                            testRunSensorObj.packets[ii].latencyMs = thisPacketLatencyMs;
                            latencySum += thisPacketLatencyMs;
                            testRunSensorObj.results.latencyCount++;
    
                            if (testRunSensorObj.results.latencyMin == undefined || testRunSensorObj.results.latencyMin > thisPacketLatencyMs) {
                                testRunSensorObj.results.latencyMin = thisPacketLatencyMs;
                            }
                            if (testRunSensorObj.results.latencyMax == undefined || testRunSensorObj.results.latencyMax < thisPacketLatencyMs) {
                                testRunSensorObj.results.latencyMax = thisPacketLatencyMs;
                            }
                            
                            switch(thisPacketLatency) {
                                case 1:
                                    testRunSensorObj.results.latency1++;
                                    break;
    
                                case 2:
                                    testRunSensorObj.results.latency2++;
                                    break;
    
                                case 3:
                                    testRunSensorObj.results.latency3++;
                                    break;
    
                                default:
                                    testRunSensorObj.results.latencyMore++;
                                    break;
                            }                    
                        }
                    }
    
                    if (testRunSensorObj.results.latencyCount > 0) {
                        testRunSensorObj.results.latencyMean = Math.round(latencySum / testRunSensorObj.results.latencyCount);
                        testRunSensorObj.results.latencyMeanStr = testRunSensorObj.results.latencyMean + ' ms';
                    }
    
                    testRunSensorObj.results.latencyMinStr = (testRunSensorObj.results.latencyMin != undefined) ? (testRunSensorObj.results.latencyMin + ' ms') : '';
                    testRunSensorObj.results.latencyMaxStr = (testRunSensorObj.results.latencyMax != undefined) ? (testRunSensorObj.results.latencyMax + ' ms') : '';
    
                }
    
                for(const testRunSensorObj of testRunObj.sensors) {
                    let total = testRunSensorObj.results.latency1 + testRunSensorObj.results.latency2 + testRunSensorObj.results.latency3 + testRunSensorObj.results.latencyMore;
                    if (!total) {
                        total = 1;
                    }
    
                    testRunSensorObj.results.latency1Pct = Math.round(testRunSensorObj.results.latency1 * 100 / total);
                    testRunSensorObj.results.latency2Pct = Math.round(testRunSensorObj.results.latency2 * 100 / total);
                    testRunSensorObj.results.latency3Pct = Math.round(testRunSensorObj.results.latency3 * 100 / total);
                    testRunSensorObj.results.latencyMorePct = Math.round(testRunSensorObj.results.latencyMore * 100 / total);    
                }
    

                // console.log('sensors', calc.inputValues.sensors);
    
                testRunObj.packetTimes.sort(function(a, b) {
                    return a - b;
                });
    
                // Build sensor result tables
                {
                    const tableElem = $(testRunObj.timelineElem).find('.sensorResultTable');

                    $(tableElem).css('width', (calc.columnWidths.advStart + calc.columnWidths.bleStart + calc.columnWidths.bleEnd + calc.inputValues.sensors.length * calc.columnWidths.sensorValue + 5) + 'px');

                    const theadElem = $(tableElem).find('thead');
                    $(theadElem).empty();

                    {
                        const trElem = document.createElement('tr');
                        
                        {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'left');
                            $(thElem).text('');
                            $(trElem).append(thElem);
                        }
                        {
                            // Spacer between left columns and sensors
                            const thElem = document.createElement('th');
                            $(thElem).css('width', '5px');
                            $(trElem).append(thElem);    
                        }                                    
        
                        for(const testRunSensorObj of testRunObj.sensors) {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'left');
                            $(thElem).text('Sensor ' + (testRunSensorObj.index + 1));
                            $(trElem).append(thElem);    
                        }
                        $(theadElem).append(trElem);
                    }

                    const tbodyElem = $(tableElem).find('tbody');
                    $(tbodyElem).empty();

                    for(const fieldObj of calc.testRunSensorResultFields) {
                        const trElem = document.createElement('tr');

                        {
                            const tdElem = document.createElement('td');
                            $(tdElem).css('text-align', 'left');
                            $(tdElem).css('width', (calc.columnWidths.sensorResultLabel) + 'px');
                            $(tdElem).text(fieldObj.title);
                            $(trElem).append(tdElem);    
                        }                                

                        {
                            // Spacer between left columns and sensors
                            const tdElem = document.createElement('td');
                            $(tdElem).css('width', '5px');
                            $(trElem).append(tdElem);    
                        }                    

                        for(const testRunSensorObj of testRunObj.sensors) {
                            const tdElem = document.createElement('td');
                            $(tdElem).css('text-align', 'left');
                            $(tdElem).css('width', calc.columnWidths.sensorValue + 'px');
                            let text = '';
                            if (fieldObj.key) {
                                if (typeof testRunSensorObj.results[fieldObj.key] != 'undefined') {
                                    text = testRunSensorObj.results[fieldObj.key];
                                    if (fieldObj.append) {
                                        text += fieldObj.append;
                                    }
                                }
                            }
                            $(tdElem).text(text);
                            $(trElem).append(tdElem);    
                        }                                

                        $(tbodyElem).append(trElem);
                    }

                }

                // Build packet result tables
                {
                    const tableElem = $(testRunObj.timelineElem).find('.testRunResultsTable');
    
                    $(tableElem).css('width', (calc.columnWidths.advStart + calc.columnWidths.bleStart + calc.columnWidths.bleEnd + calc.inputValues.sensors.length * calc.columnWidths.sensorValue + 5) + 'px');
        
                    const theadElem = $(tableElem).find('thead');
                    $(theadElem).empty();
        
                    {
                        const trElem = document.createElement('tr');
                        
                        {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'right');
                            $(thElem).text('Adv. Start');
                            $(trElem).append(thElem);
                        }
                        {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'right');
                            $(thElem).text('BLE Start');
                            $(trElem).append(thElem);    
                        }                    
                        {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'right');
                            $(thElem).text('BLE End');
                            $(trElem).append(thElem);    
                        }                    
                        {
                            // Spacer between left columns and sensors
                            const thElem = document.createElement('th');
                            $(thElem).css('width', '5px');
                            $(trElem).append(thElem);    
                        }                    
                
        
                        for(const testRunSensorObj of testRunObj.sensors) {
                            const thElem = document.createElement('th');
                            $(thElem).css('text-align', 'center');
                            $(thElem).text('Sensor ' + (testRunSensorObj.index + 1));
                            $(trElem).append(thElem);    
                        }
                        $(theadElem).append(trElem);
                    }
        
                    
                    const tbodyElem = $(tableElem).find('tbody');
                    $(tbodyElem).empty();
                    for(const ms of testRunObj.packetTimes) {
                        const trElem = document.createElement('tr');
        
                        {
                            const tdElem = document.createElement('td');
                            $(tdElem).css('text-align', 'right');
                            $(tdElem).css('font-family', calc.monospaceFont);
                            $(tdElem).css('width', calc.columnWidths.advStart + 'px');
                            $(tdElem).text(calc.msWithDecimal(ms, {places: calc.numDecimalPlaces, commas:true}));
                            $(trElem).append(tdElem);    
                        }                    
        
                        let bleStartStr = '';
                        let bleEndStr = '';
        
                        for(const testRunSensorObj of testRunObj.sensors) {
        
                            const packetObj = testRunSensorObj.packets.find(e => e.startMs == ms);
                            if (packetObj) {
                                bleStartStr = calc.msWithDecimal(packetObj.windowStartBle, {places: calc.numDecimalPlaces, commas:true});
                                bleEndStr = calc.msWithDecimal(packetObj.windowEndBle, {places: calc.numDecimalPlaces, commas:true});
                                break;
                            }
                        }
        
                        {
                            const tdElem = document.createElement('td');
                            $(tdElem).css('text-align', 'right');
                            $(tdElem).css('font-family', calc.monospaceFont);
                            $(tdElem).css('width', calc.columnWidths.bleStart + 'px');
                            $(tdElem).text(bleStartStr);
                            $(trElem).append(tdElem);    
                        }                    
                        {
                            const tdElem = document.createElement('td');
                            $(tdElem).css('text-align', 'right');
                            $(tdElem).css('font-family', calc.monospaceFont);
                            $(tdElem).css('width', calc.columnWidths.bleEnd + 'px');
                            $(tdElem).text(bleEndStr);
                            $(trElem).append(tdElem);    
                        }                    
                        {
                            // Spacer between left columns and sensors
                            const tdElem = document.createElement('td');
                            $(tdElem).css('width', '5px');
                            $(trElem).append(tdElem);    
                        }                    
        
        
        
                        for(const testRunSensorObj of testRunObj.sensors) {
                            let packetStr = '';
                            let bleStr = ''
        
                            const packetObj = testRunSensorObj.packets.find(e => e.startMs == ms);
                            {
                                const tdElem = document.createElement('td');
                                $(tdElem).css('width', calc.columnWidths.sensorValue + 'px');
                                $(tdElem).css('text-align', 'center');
                                
                                if (packetObj) {
                                    if (packetObj.success) {
                                        $(tdElem).css('background-color', calc.successColor);
                                        $(tdElem).text('Success');
                                    }
                                    else {
                                        $(tdElem).css('background-color', calc.failureColor);
                                        $(tdElem).text('Missed');
                                    }                
                                }
                                else {
                                    $(tdElem).text('');
                                }
                                $(trElem).append(tdElem);    
                            }                    
                        }
                    
        
                        $(tbodyElem).append(trElem);
                    }
                }


            }

            
            // Aggregate results over test runs
            for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                const sensorObj = calc.inputValues.sensors[ii];

                const fields = ['numSamples', 'successPct', 'failurePct', 'latency1Pct', 'latency2Pct', 'latency3Pct', 'latencyMorePct',
                    'latencyMean', 'latencyMin', 'latencyMax'
                ];

                let sums = {};
                let counts = {};
                for(const f of fields) {
                    sums[f] = counts[f]= 0;
                }
                
                for(const testRunObj of calc.testRuns) {
                    for(const f of fields) {
                        if (typeof testRunObj.sensors[ii].results[f] != 'undefined') {
                            sums[f] += testRunObj.sensors[ii].results[f];
                            counts[f]++;
                        }
                    }
                }

                sensorObj.results = {};
                for(const f of fields) {
                    if (counts[f] > 0) {
                        sensorObj.results[f] = Math.round(sums[f] / counts[f]);
                    }
                }

                const stringFields = ['latencyMean', 'latencyMin', 'latencyMax'];
                for(const f of stringFields) {
                    if (typeof sensorObj.results[f] != 'undefined') {
                        sensorObj.results[f + 'Str'] = Math.round(sensorObj.results[f]) + 'ms';
                    }
                }
            }

            // Update sensor UI
            
            for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                const sensorObj = calc.inputValues.sensors[ii];

                $(sensorObj.sensorDivElem).find('.sensorResult').each(function() {
                    const sensorResultElem = $(this);
                    const key = $(sensorResultElem).data('key');
                    if (key && typeof sensorObj.results[key] != 'undefined') {
                        $(sensorResultElem).text(sensorObj.results[key]);
                    }
                    else {
                        $(sensorResultElem).text('');
                    }
                });
            } 
                
        }
        

        calc.readInput = function() {
            $(thisPartial).find('.inputParam').each(function() {
                const inputElem = $(this);

                // TODO: Handle radio buttons, etc.
                const inputType = $(inputElem).prop('type');
                
                const key = $(inputElem).data('key');
                if (key) {
                    switch(inputType) {           
                    default:
                        // d - test duration seconds (float)
                        // ws - window size ms (float)
                        // b - BLE window percentage (float, 0 - 100)
                        calc.inputValues[key] = parseFloat($(inputElem).val());
    
                        calc.inputUrlParams[key] = calc.inputValues[key];
                        break;
                    }
                }
            });
            

            calc.inputValues.sensors = [];
            $(thisPartial).find('.sensorDiv').each(function() {
                const sensorDivElem = $(this);

                const sensorIndex = calc.inputValues.sensors.length;

                let sensorObj = {
                    sensorDivElem,
                    sensorIndex,
                };

                $(sensorDivElem).find('.sensorInputParam').each(function() {
                    const inputElem = $(this);
    
                    // TODO: Handle radio buttons, etc.
                    const key = $(inputElem).data('key');
                    if (key) {
                        const inputType = $(inputElem).prop('type');

                        switch(inputType) {
                        case 'radio':
                            // it - interval type fixed (f) or random (r)
                            if ($(inputElem).prop('checked')) {
                                sensorObj[key] = $(inputElem).val();
                            }
                            break;
                                    
                        default:
                            // i fixed advertising interval ms (float)
                            // rmin random advertising interval minimum ms (float)
                            // rmax random advertising interval minimum ms (float)
                            // l (ell) - packet length ms (float)
                            // r - retransmit repeats
                            // d - retransmit delay (ms)
                            // j - random transmit jitter (ms)
                            sensorObj[key] = parseFloat($(inputElem).val());
                            break;
                        }

                        if (typeof sensorObj[key] != 'undefined') {
                            calc.inputUrlParams[key + sensorIndex] = sensorObj[key];
                        }
                    }
    
                });

                calc.inputValues.sensors[sensorIndex] = sensorObj;
            });

            calc.isValid = true;
            calc.inputError = null;

            if (calc.inputValues.d < 6) {
                calc.isValid = false;
                calc.inputError = 'duration must be >= 6 seconds';
            }
            if (calc.inputValues.d > 3600) {
                calc.isValid = false;
                calc.inputError = 'duration must be < 3600 seconds';
            }

            for(const sensorObj of calc.inputValues.sensors) {
                if (sensorObj.i < 50) {
                    calc.isValid = false;
                    calc.inputError = 'sensor interval must be >= 50';
                }

                if (sensorObj.l < 0.1) {
                    calc.isValid = false;
                    calc.inputError = 'sensor length must be >= 0.1';
                }            
                if (sensorObj.r < 0 || sensorObj.r > 10) {
                    calc.isValid = false;
                    calc.inputError = 'retransmit repeats must be >= 0 and <= 10';
                }   

                // TODO: Fix this to work with random interval         
                if ((sensorObj.r * sensorObj.d) > sensorObj.i) {
                    calc.isValid = false;
                    calc.inputError = 'retransmit repeats times retransmit delay must be <= advertising interval';
                }

                if (sensorObj.j < 0 || sensorObj.j > 100) {
                    calc.isValid = false;
                    calc.inputError = 'jitter must be >= 0 and <= 100';
                }
            }

            calc.calculate();
            // console.log('readInput', {inputValues:calc.inputValues, inputUrlParams:calc.inputUrlParams});

        };


        calc.saveUrlParams = function() {    
            const searchStr = $.param(calc.inputUrlParams);

            if (calc.lastSearchParam != searchStr) {
                calc.lastSearchParam = searchStr;
                if (calc.saveTimer) {
                    clearTimeout(calc.saveTimer);
                    calc.saveTimer = 0;
                }
                calc.saveTimer = setTimeout(function() {
                    history.pushState(null, '', '?' + searchStr);
                }, 2000);
            }  

        };

        calc.clearInputTimer = function() {
            if (calc.inputTimer) {
                clearInterval(calc.inputTimer);
                calc.inputTimer();
            }
        }

        calc.addInputHandlers = function(inputElems) {
            $(inputElems).each(function() {
                const inputElem = $(this);

                const key = $(inputElem).data('key');
                if (key) {
                    // TODO: Handle radio buttons, etc.
                    const inputType = $(inputElem).prop('type');
                    let eventTrigger;
                    
                    switch(inputType) {
                        case 'range':
                        case 'select':
                            eventTrigger = 'change';
                            break;
                        
                        default:
                            eventTrigger = 'input';
                            break;
                    }
                    // console.log('addInputHandlers', {inputType, eventTrigger});
                    
                    $(inputElem).on(eventTrigger, function() {
                        calc.clearInputTimer();
                        setTimeout(function() {
                            calc.inputTimer = 0;
                            calc.readInput();
                            calc.saveUrlParams();    
                        }, 500);
                    });

                    $(inputElem).on('blur', function() {
                        calc.clearInputTimer();
                        calc.readInput();
                        calc.saveUrlParams();
                    });


                }
            });
        };

        calc.sensorKeys = [];
        calc.sensorDivTemplateElem = $(thisPartial).find('.sensorDiv')[0].cloneNode(true);
        $(thisPartial).find('.sensorInputParam').each(function() {
            const inputElem = $(this);

            let obj = {};
            obj.inputType = $(inputElem).prop('type');
            obj.key = $(inputElem).data('key');
            if (obj.key) {
                calc.sensorKeys.push(obj);
            }
        });

        calc.addInputHandlers($(thisPartial).find('.inputParam,.sensorInputParam')); 

        calc.addSensor = function(options = {}) {
            const sensorIndex = $(thisPartial).find('.sensorDiv').length;
            
            const sensorElem = calc.sensorDivTemplateElem.cloneNode(true);
            $(sensorElem).find('h4').text('Sensor ' + (sensorIndex + 1));
            calc.addInputHandlers($(sensorElem).find('.sensorInputParam')); 

            $(sensorElem).find('.sensorRemoveDiv > a').on('click', function() {
                $(sensorElem).remove();

                // Renumber sensors
                let tempSensorIndex = 0;
                $(thisPartial).find('.sensorsDiv').each(function() {
                    $(this).find('h4').text('Sensor ' + (tempSensorIndex + 1));
                    tempSensorIndex++;
                })
                calc.readInput();
                calc.saveUrlParams();
            });
            $(sensorElem).find('.sensorRemoveDiv').show();
    
            $(thisPartial).find('.sensorsDiv').append(sensorElem);

            if (!options.noReadSave) {
                calc.readInput();
                calc.saveUrlParams();    
            }
        }

        $(thisPartial).find('.addSensor').on('click', function() {
            calc.addSensor();
            calc.calculate();
        });


        calc.loadUrlParams = function() {
            $(thisPartial).find('.inputParam').each(function() {
                const inputElem = $(this);
    
                const key = $(inputElem).data('key');
                if (key) {
                    const value = calc.urlParams.get(key);
                    if (value !== null) {
                        const inputType = $(inputElem).prop('type');
                        switch(inputType) {
                        default:
                            calc.inputValues[key] = calc.inputUrlParams[key] = value;    
                            $(inputElem).val(calc.inputValues[key]);
                            break;
                        }
                    }
                }
            });

            calc.inputValues.sensors = [];
            $(thisPartial).find('.sensorDiv').not(':first').remove();

            for (const [key, value] of calc.urlParams.entries()) {
                const m = key.match(/([A-Za-z]+)([0-9]+)/);
                if (m) {
                    const urlParamKey = m[1];
                    const sensorIndex = parseInt(m[2]);

                    const sensorKeyEntry = calc.sensorKeys.find(e => e.key == urlParamKey);
                    if (sensorKeyEntry) {
                        // console.log('read urlParams', {sensorKeys: calc.sensorKeys, sensorKeyEntry, urlParamKey, sensorIndex});
                        if (typeof calc.inputValues.sensors[sensorIndex] == 'undefined') {
                            calc.inputValues.sensors[sensorIndex] = {};
                        }                    
                        calc.inputValues.sensors[sensorIndex][sensorKeyEntry.key] = value;
                    }
                }

            }
            
            // console.log('calc.inputValues.sensors', calc.inputValues.sensors);

            for(let ii = $(thisPartial).find('.sensorDiv').length; ii < calc.inputValues.sensors.length; ii++) {
                calc.addSensor({noReadSave: true});   
            }

            let sensorIndex = 0;
            $(thisPartial).find('.sensorDiv').each(function() {
                const sensorDivElem = $(this);

                $(sensorDivElem).find('.sensorInputParam').each(function() {
                    const inputElem = $(this);

                    const key = $(inputElem).data('key');
                    if (key && calc.inputValues.sensors && calc.inputValues.sensors[sensorIndex]) {
                        const inputType = $(inputElem).prop('type');
                        switch(inputType) {
                        case 'radio':
                            $(inputElem).prop('checked', $(inputElem).prop('value') == calc.inputValues.sensors[sensorIndex][key]);
                            break;

                        default:
                            $(inputElem).val(calc.inputValues.sensors[sensorIndex][key]);
                            break;
                        }
                    }
                    // console.log('set values', {key, sensorIndex, sensorObj: calc.inputValues.sensors[sensorIndex]});

                });    

                sensorIndex++;
            });    
            

            calc.readInput();
            calc.saveUrlParams();
        }    

        calc.loadParamStr = function(s) {
            calc.urlParams = new URLSearchParams(s);
            calc.loadUrlParams();
        }


        calc.loadUrlParams();



    })
});
