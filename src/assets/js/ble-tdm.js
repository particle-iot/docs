let calc = {};

$(document).ready(function() {

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
        

        calc.parseKey = function(key) {
            if (typeof key != 'string') {
                return null;
            }

            let result = {};

            const parts = key.split(',');
            if (parts.length == 1) {
                result.key = result.urlParam = parts[0].trim();
            }
            else {
                result.key = parts[0].trim();
                result.urlParam = parts[1].trim();                
            }
            return result;
        }

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

            result.windowStartBle = calc.inputValues.tdmaOffset;
            result.windowStartWiFi = result.windowStartBle + (calc.inputValues.windowSize * calc.inputValues.blePct / 100);
            result.windowEnd = result.windowStartBle + calc.inputValues.windowSize;

            const numWindowsBefore = Math.floor((ms - result.windowStartBle) / calc.inputValues.windowSize);
            result.windowStartBle += numWindowsBefore * calc.inputValues.windowSize;
            result.windowStartWiFi += numWindowsBefore * calc.inputValues.windowSize;
            result.windowEnd += numWindowsBefore * calc.inputValues.windowSize;

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

            calc.setStatus('');
            $(thisPartial).find('.bleTdmTimeline').show();
            
            const testDurationMs = calc.inputValues.duration * 1000;

            calc.packetTimes = [];
            
            for(const sensorObj of calc.inputValues.sensors) {
                sensorObj.packets = [];

                ms = sensorObj.offset;
                sensorObj.successCount = 0;

                while(ms < testDurationMs) {
                    const intervals = calc.getIntervals(ms);

                    let packet = {
                        startMs: ms,
                        endMs: ms + sensorObj.length,                        
                        windowStartBle: intervals.windowStartBle,
                        windowEndBle: intervals.windowEndBle,
                    };

                    packet.success = (packet.startMs >= intervals.windowStartBle && packet.endMs <= intervals.windowEndBle);
                    if (packet.success) {
                        sensorObj.successCount++;
                    }

                    sensorObj.packets.push(packet);

                    if (!calc.packetTimes.includes(ms)) {
                        calc.packetTimes.push(ms);
                    }

                    ms += sensorObj.rate;
                }

                sensorObj.numSamples = sensorObj.packets.length;

                if (sensorObj.numSamples > 0) {
                    sensorObj.successPct = Math.round(sensorObj.successCount * 100 / sensorObj.numSamples);
                }
                else {
                    sensorObj.successPct = 0;
                }
                sensorObj.failurePct = 100 - sensorObj.successPct;
            }

            for(const sensorObj of calc.inputValues.sensors) {
                sensorObj.latency1 = 0;
                sensorObj.latency2 = 0;
                sensorObj.latency3 = 0;
                sensorObj.latencyMore = 0;
                sensorObj.latencyCount = 0;
                sensorObj.latencyMeanStr = '';
                sensorObj.latencyMin = undefined;
                sensorObj.latencyMax = undefined;

                let latencySum = 0;

                for(let ii = 0; ii < sensorObj.packets.length - 1; ii++) {
                    let thisPacketLatency;
                    for(let jj = ii + 1; jj < sensorObj.packets.length; jj++) {
                        if (sensorObj.packets[jj].success) {
                            thisPacketLatency = jj - ii;
                            break;
                        }
                    }
                    if (thisPacketLatency) {
                        const thisPacketLatencyMs = thisPacketLatency * sensorObj.rate;
                        sensorObj.packets[ii].latency = thisPacketLatency;
                        latencySum += thisPacketLatencyMs;
                        sensorObj.latencyCount++;

                        if (sensorObj.latencyMin == undefined || sensorObj.latencyMin > thisPacketLatencyMs) {
                            sensorObj.latencyMin = thisPacketLatencyMs;
                        }
                        if (sensorObj.latencyMax == undefined || sensorObj.latencyMax < thisPacketLatencyMs) {
                            sensorObj.latencyMax = thisPacketLatencyMs;
                        }
                        
                        switch(thisPacketLatency) {
                            case 1:
                                sensorObj.latency1++;
                                break;

                            case 2:
                                sensorObj.latency2++;
                                break;

                            case 3:
                                sensorObj.latency3++;
                                break;

                            default:
                                sensorObj.latencyMore++;
                                break;
                        }                    
                    }
                }

                if (sensorObj.latencyCount > 0) {
                    sensorObj.latencyMeanStr = Math.round(latencySum / sensorObj.latencyCount) + ' ms';
                }

                sensorObj.latencyMinStr = (sensorObj.latencyMin != undefined) ? (sensorObj.latencyMin + ' ms') : '';
                sensorObj.latencyMaxStr = (sensorObj.latencyMax != undefined) ? (sensorObj.latencyMax + ' ms') : '';

            }

            for(const sensorObj of calc.inputValues.sensors) {
                let total = sensorObj.latency1 + sensorObj.latency2 + sensorObj.latency3 + sensorObj.latencyMore;
                if (!total) {
                    total = 1;
                }

                sensorObj.latency1Pct = Math.round(sensorObj.latency1 * 100 / total);
                sensorObj.latency2Pct = Math.round(sensorObj.latency2 * 100 / total);
                sensorObj.latency3Pct = Math.round(sensorObj.latency3 * 100 / total);
                sensorObj.latencyMorePct = Math.round(sensorObj.latencyMore * 100 / total);

                sensorObj.latency1Time = calc.msToText(sensorObj.rate);
                sensorObj.latency2Time = calc.msToText(sensorObj.rate * 2);
                sensorObj.latency3Time = calc.msToText(sensorObj.rate * 3);
            }

            for(const sensorObj of calc.inputValues.sensors) {
                $(sensorObj.sensorDivElem).find('.sensorResult').each(function() {
                    const sensorResultElem = $(this);
                    const key = $(sensorResultElem).data('key');
                    if (key && typeof sensorObj[key] != 'undefined') {
                        $(sensorResultElem).text(sensorObj[key]);
                    }
                    else {
                        $(sensorResultElem).text('');
                    }
                });
            }        
        
            // console.log('sensors', calc.inputValues.sensors);

            calc.packetTimes.sort(function(a, b) {
                return a - b;
            });

            // Build table
            const theadElem = $(thisPartial).find('.bleTdmTimeline > table > thead');
            $(theadElem).empty();

            {
                const trElem = document.createElement('tr');
                
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('Advertising Start');
                    $(trElem).append(thElem);
                }
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('BLE Interval Start');
                    $(trElem).append(thElem);    
                }                    
                {
                    const thElem = document.createElement('th');
                    $(thElem).text('BLE Interval End');
                    $(trElem).append(thElem);    
                }                    
                {
                    // Spacer between left columns and sensors
                    const thElem = document.createElement('th');
                    $(thElem).css('width', '5px');
                    $(trElem).append(thElem);    
                }                    


                for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                    {
                        const thElem = document.createElement('th');
                        $(thElem).text('Sensor ' + (ii + 1));
                        $(trElem).append(thElem);    
                    }                    
                }
                $(theadElem).append(trElem);
            }

            const tbodyElem = $(thisPartial).find('.bleTdmTimeline > table > tbody');
            $(tbodyElem).empty();
            for(const ms of calc.packetTimes) {
                const trElem = document.createElement('tr');

                {
                    const tdElem = document.createElement('td');
                    $(tdElem).css('text-align', 'right');
                    $(tdElem).css('font-family', calc.monospaceFont);
                    $(tdElem).text(calc.msWithDecimal(ms, {places: calc.numDecimalPlaces, commas:true}));
                    $(trElem).append(tdElem);    
                }                    


                let bleStartStr = '';
                let bleEndStr = '';

                for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                    const sensorObj = calc.inputValues.sensors[ii];

                    const packetObj = sensorObj.packets.find(e => e.startMs == ms);
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
                    $(tdElem).text(bleStartStr);
                    $(trElem).append(tdElem);    
                }                    
                {
                    const tdElem = document.createElement('td');
                    $(tdElem).css('text-align', 'right');
                    $(tdElem).css('font-family', calc.monospaceFont);
                    $(tdElem).text(bleEndStr);
                    $(trElem).append(tdElem);    
                }                    
                {
                    // Spacer between left columns and sensors
                    const tdElem = document.createElement('td');
                    $(tdElem).css('width', '5px');
                    $(trElem).append(tdElem);    
                }                    



                for(let ii = 0; ii < calc.inputValues.sensors.length; ii++) {
                    const sensorObj = calc.inputValues.sensors[ii];
                    let packetStr = '';
                    let bleStr = ''

                    const packetObj = sensorObj.packets.find(e => e.startMs == ms);
                    {
                        const tdElem = document.createElement('td');
                        $(tdElem).css('width', '60px');
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
        

        calc.readInput = function() {
            $(thisPartial).find('.inputParam').each(function() {
                const inputElem = $(this);

                // TODO: Handle radio buttons, etc.
                const inputType = $(inputElem).prop('type');

                const key = calc.parseKey($(inputElem).data('key'));
                if (key) {
                    calc.inputValues[key.key] = parseFloat($(inputElem).val());

                    calc.inputUrlParams[key.urlParam] = calc.inputValues[key.key];
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
                    const inputType = $(inputElem).prop('type');
    
                    const key = calc.parseKey($(inputElem).data('key'));
                    if (key) {
                        sensorObj[key.key] = parseFloat($(inputElem).val());
    
                        calc.inputUrlParams[key.urlParam + sensorIndex] = sensorObj[key.key];
                    }
    
                });

                calc.inputValues.sensors[sensorIndex] = sensorObj;
            });

            calc.isValid = true;
            calc.inputError = null;

            if (calc.inputValues.duration < 6) {
                calc.isValid = false;
                calc.inputError = 'duration must be >= 6 seconds';
            }
            if (calc.inputValues.duration > 3600) {
                calc.isValid = false;
                calc.inputError = 'duration must be < 3600 seconds';
            }

            for(const sensorObj of calc.inputValues.sensors) {
                if (sensorObj.rate < 50) {
                    calc.isValid = false;
                    calc.inputError = 'sensor rate must be >= 50';
                }

                if (sensorObj.length < 0.1) {
                    calc.isValid = false;
                    calc.inputError = 'sensor length must be >= 0.1';
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

                const key = calc.parseKey($(inputElem).data('key'));
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
            obj.key = calc.parseKey($(inputElem).data('key'));
            if (obj.key) {
                calc.sensorKeys.push(obj);
            }
        });

        calc.addInputHandlers($(thisPartial).find('.inputParam,.sensorInputParam')); 

        calc.addSensor = function(options = {}) {
            const sensorIndex = $(thisPartial).find('.sensorDiv').length;

            const sensorElem = calc.sensorDivTemplateElem.cloneNode(true);
            $(sensorElem).find('h3').text('Sensor ' + (sensorIndex + 1));
            calc.addInputHandlers($(sensorElem).find('.sensorInputParam')); 

            $(sensorElem).find('.sensorRemoveDiv > a').on('click', function() {
                console.log('remove sensor');
                $(sensorElem).remove();

                // Renumber sensors
                let tempSensorIndex = 0;
                $(thisPartial).find('.sensorsDiv').each(function() {
                    $(this).find('h3').text('Sensor ' + (tempSensorIndex + 1));
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
    
                const key = calc.parseKey($(inputElem).data('key'));
                if (key) {
                    // TODO: Handle radio buttons, etc.
                    const inputType = $(inputElem).prop('type');

                    const value = calc.urlParams.get(key.urlParam);
                    if (value) {
                        calc.inputUrlParams[key.urlParam] = value;

                        calc.inputValues[key.key] = calc.inputUrlParams[key.urlParam];
                        $(inputElem).val(calc.inputValues[key.key]);
                    }    
                }
            });

            calc.inputValues.sensors = [];
            $(thisPartial).find('.sensorsDiv').not(':first').remove();

            for (const [key, value] of calc.urlParams.entries()) {
                const m = key.match(/([A-Za-z]+)([0-9]+)/);
                if (m) {
                    const urlParamKey = m[1];
                    const sensorIndex = parseInt(m[2]);

                    const sensorKeyEntry = calc.sensorKeys.find(e => e.key.urlParam == urlParamKey);
                    // console.log('read urlParams', {sensorKeys: calc.sensorKeys, sensorKeyEntry, urlParamKey, sensorIndex});
                    const valueKey = sensorKeyEntry.key.key;

                    if (typeof calc.inputValues.sensors[sensorIndex] == 'undefined') {
                        calc.inputValues.sensors[sensorIndex] = {};
                    }                    
                    calc.inputValues.sensors[sensorIndex][valueKey] = value;
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
        
                    const key = calc.parseKey($(inputElem).data('key'));
                    if (key && calc.inputValues.sensors && calc.inputValues.sensors[sensorIndex]) {
                        $(inputElem).val(calc.inputValues.sensors[sensorIndex][key.key]);
                    }
                    // console.log('set values', {key, sensorIndex, sensorObj: calc.inputValues.sensors[sensorIndex]});

                });    

                sensorIndex++;
            });    
            

            calc.readInput();
            calc.saveUrlParams();
        }    

        calc.loadParamStr = function(s) {
            calc.urlParams = new URLSearchParams(window.location.search);
            calc.loadUrlParams();
        }


        calc.loadUrlParams();



    })
});
