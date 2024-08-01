let calc = {};

$(document).ready(function() {

    $('.bleTdmCalculator').each(function() {
        const thisPartial = calc.partial = $(this);

        calc.urlParams = new URLSearchParams(window.location.search);


        calc.inputValues = {};
        calc.inputUrlParams = {};

        calc.canvasElem = $('#bleTdmCanvas');  

        calc.timeSliderElem = $(thisPartial).find('.timeSlider');
        calc.timePositionElem = $(thisPartial).find('.timePosition');
        calc.zoomSliderElem = $(thisPartial).find('.zoomSlider');

        calc.cssPropertyRoot = getComputedStyle($('html')[0]);
        calc.bleColor = calc.cssPropertyRoot.getPropertyValue('--theme-color-particle-blue-700');
        calc.wifiColor = calc.cssPropertyRoot.getPropertyValue('--theme-color-tangerine-400');
        calc.successColor = calc.cssPropertyRoot.getPropertyValue('--theme-status-success-color');
        calc.failureColor = calc.cssPropertyRoot.getPropertyValue('--theme-status-danger-color');
        calc.labelFont = '12px Arial';
        calc.areaMargin = 5;

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

        calc.updateTimeDisplay = function() {
            // Convert to 0-1 instead of 0-100
            const sliderPct = parseInt($(calc.timeSliderElem).val()) / 100;

            let timeText = '0:00.000';

            const testDurationMs = calc.inputValues.duration * 1000;
            if (testDurationMs > 0) {
                let posTemp = Math.floor(testDurationMs * sliderPct);

                const ms = posTemp % 1000;
                posTemp = Math.floor(posTemp / 1000);

                const sec = posTemp % 60;
                posTemp = Math.floor(posTemp / 60);

                const min = posTemp;

                timeText = min + ':' + calc.padNumber(sec, 2) + ':' + calc.padNumber(ms, 3);
            }
            $(calc.timePositionElem).text(timeText);
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


        calc.calculate = function() {

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

                for(let ii = 0; ii < sensorObj.packets.length - 1; ii++) {
                    let thisPacketLatency;
                    for(let jj = ii + 1; jj < sensorObj.packets.length; jj++) {
                        if (sensorObj.packets[jj].success) {
                            thisPacketLatency = jj - ii;
                            break;
                        }
                    }
                    if (thisPacketLatency) {
                        sensorObj.packets[ii].latency = thisPacketLatency;
                    
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
                                console.log('latencyMore ' + thisPacketLatency);
                                sensorObj.latencyMore++;
                                break;
                        }                    
                    }
                }
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

            calc.packetTimes.sort();
            
        }

        calc.updateCommon = function(p) {
            p.time = parseInt($(calc.timeSliderElem).val()); // 0 - 100
            p.zoom = parseInt($(calc.zoomSliderElem).val()); // 0 - 100
            p.width = $(calc.canvasElem).width();
            p.height = $(calc.canvasElem).height();
            p.testDurationMs = calc.inputValues.duration * 1000;
            p.leftTimeMs = p.testDurationMs * p.time / 100.0;
            p.graphLeft = 70;
            p.graphWidth = p.width - p.graphLeft - calc.areaMargin;

            // The canvas is 680px wide, assume 600 pixels of graphs area with margins and labels
            // 
            // To fit 300 seconds (300,000 milliseconds)
            //   - Each pixel is 0.5 seconds (500 ms per pixel)
            //   - This is maximum zoon out
            //   - Can't show BLE and Wi-Fi intervals at this zoom level
            // At 1 pixel = 9 milliseconds:
            //   - Each BLE and Wi-Fi interval is 1 pixel wide (at 18 ms. window)
            //   - This is the farthest zoom out where BLE and Wi-Fi intervals can be shown
            // At 1 pixel = 1 millisecond (default zoom)
            //   - 0.6 seconds (600 ms) across window
            //   - 33 Wi-Fi and 33 BLE intervals (each 9 pixels wide)
            // At 1 pixel = 1/8 millisecond (1 pixel = 0.125 millisecond)
            //   - Each sensor transit frame is 1px wide
            // At 1 pixel = 0.1 millseconds
            //   - This is a good maximum zoom in
            
            // Since each interval may be only 1 pixel wide it needs to be high enough to see, maybe
            // 10 px high for each sensor?
            
            // Wi-Fi interval will be --theme-color-tangerine-400 
            // BLE interval will be --theme-color-particle-blue-500
            // Only display intervals 

            // BLE received is --theme-status-success-color (Particle blue)
            // BLE missed is --theme-status-danger-color:

            // Zoom range control is 0 - 100 but maps in a somewhat logarithmic fashion
            // to 0.1 ms per pixel to 500 ms per pixel with the middle range around 10 ms per pixels
            // Value 0 - 25: Maps to 0.1 to 1 (default is 25, or 1 ms per pixel)
            // Value 26 - 50: Maps 1 to 10 
            // Value 50 - 75: Maps 10 to 100
            // Value 75 to 100: Maps 100 to 500
            if (p.zoom < 25) {
                p.msPerPixel = p.zoom * 0.9 / 25 + 0.1;
            }
            else
            if (p.zoom < 50) {
                p.msPerPixel = (p.zoom - 25) * 10 / 25 + 1.0;
            }
            else 
            if (p.zoom < 75) {
                p.msPerPixel = (p.zoom - 50) * 100 / 25 + 10.0;
            }
            else {
                p.msPerPixel = (p.zoom - 75) * 500 / 25 + 100.0;
            }

            p.rightTimeMs = p.leftTimeMs + p.graphWidth * p.msPerPixel;

            p.msToPixel = function(ms) {
                let result;

                result = p.graphLeft + (ms - p.leftTimeMs) * p.msPerPixel;

                return result;
            }
        }

        calc.render = function() {
            calc.calculate();

            let p = {                
                backgroundColor: calc.cssPropertyRoot.getPropertyValue('--theme-graphic1-background-color'),
                primaryColor: calc.cssPropertyRoot.getPropertyValue('--theme-graphic1-primary-color'),
                labelLeft: 4,
                labelTop: 5,
                labelOffsetY: 2,      
            };
            calc.updateCommon(p);



            p.showIntervals = true;
            p.intervalsTop = 0;
            p.intervalsBarHeight = 15;
            p.intervalsHeight = 2 * p.intervalsBarHeight + 2 * calc.areaMargin;
            p.sensorsTop = p.intervalsTop + p.intervalsHeight; 
            p.sensorsBottom = p.sensorsTop + (p.intervalsBarHeight + 2 * calc.areaMargin) * calc.inputValues.sensors.length;

            $(calc.canvasElem).prop('height', p.sensorsBottom);

            // console.log('render' , p);

            calc.updateTimeDisplay();

            const ctx = calc.canvasElem[0].getContext('2d');

            ctx.fillStyle = p.backgroundColor; // @COLOR_Gray_200
            ctx.fillRect(0, 0, p.width, p.height);

            ctx.textBaseline = 'top';
            ctx.textAlign = 'right';
            ctx.font = calc.labelFont;
            ctx.fillStyle = p.primaryColor;
            ctx.fillText('Wi-Fi', p.graphLeft - calc.areaMargin, calc.areaMargin + p.intervalsTop + p.labelOffsetY);
            ctx.fillText('BLE', p.graphLeft - calc.areaMargin, calc.areaMargin + p.intervalsTop + p.intervalsBarHeight + p.labelOffsetY);

            let sensorTop = p.sensorsTop + calc.areaMargin;
            for(const sensorObj of calc.inputValues.sensors) {
                ctx.fillStyle = p.primaryColor;
                ctx.fillText('Sensor ' + (sensorObj.sensorIndex + 1), p.graphLeft - calc.areaMargin, sensorTop + p.labelOffsetY);

                for(const packet of sensorObj.packets) {
                    let left = Math.floor(p.msToPixel(packet.startMs));
                    let right = Math.floor(p.msToPixel(packet.startMs));
                    if (left == right) {
                        right++;
                    }
                    if (left < p.graphLeft) {
                        left = p.graphLeft;
                    }


                    if (right >= p.graphLeft && left <= p.width) {
                        // At least partially visible
                        let packetColor = packet.success ? calc.successColor : calc.failureColor;

                        // console.log('packet', {sensorTop, left, right, packetColor, packet, height: p.intervalsBarHeight});

                        ctx.fillStyle = packetColor;
                        ctx.fillRect(left, sensorTop, right - left, p.intervalsBarHeight);
                    }
                }

                sensorTop += p.intervalsBarHeight + 2 * calc.areaMargin;
            }

            let ms = p.leftTimeMs;
            for(let x = p.graphLeft; x < p.width; x++) {
                p.intervals = calc.getIntervals(ms);
                
                if (p.showIntervals) {
                    let intervalColor;
                    let top;

                    if (p.intervals.windowStartBle <= ms && ms < p.intervals.windowEndBle) {
                        top = p.intervalsTop + calc.areaMargin + p.intervalsBarHeight;
                        intervalColor = calc.bleColor;
                    }
                    else
                    if (p.intervals.windowStartWiFi <= ms && ms < p.intervals.windowEndWiFi) {
                        top = p.intervalsTop + calc.areaMargin;
                        intervalColor = calc.wifiColor;
                    }

                    if (intervalColor) {
                        ctx.fillStyle = intervalColor;
                        ctx.fillRect(x, top, 1, p.intervalsBarHeight);
                    }
                    //console.log('interval', {x, intervals:p.intervals});
                }
                            
                ms += p.msPerPixel;
            }
        }

        calc.scrollToMs = function(ms) {
            let p = {};
            calc.updateCommon(p);

            console.log('scrollToMs', {ms, p});

            let pct = Math.floor(ms * 100 / p.testDurationMs);


            $(calc.timeSliderElem).val(pct);
            calc.render();
        }


        $(thisPartial).find('.prevButton').on('click', function() {
            let p = {};
            calc.updateCommon(p);

            for(let ii = calc.packetTimes.length - 1; ii >= 0; ii--) {
                if (calc.packetTimes[ii] < p.leftTimeMs) {
                    calc.scrollToMs(calc.packetTimes[ii]);
                    break;
                }
            }
        });

        $(thisPartial).find('.nextButton').on('click', function() {
            let p = {};
            calc.updateCommon(p);

            for(let ii = 0; ii < calc.packetTimes.length; ii++) {
                if (calc.packetTimes[ii] >= p.rightTimeMs) {
                    calc.scrollToMs(calc.packetTimes[ii]);
                    break;
                }
            }
        });


        $(calc.timeSliderElem).on('change', calc.render);
        $(calc.timeSliderElem).on('input', calc.updateTimeDisplay); // Runs continuously while dragging
        
        $(calc.zoomSliderElem).on('change', calc.render);

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

            if (calc.inputValues.duration < 1) {
                calc.inputValues.duration = 1;
            }

            for(const sensorObj of calc.inputValues.sensors) {
                if (sensorObj.rate < 1) {
                    sensorObj.rate = 1;
                }
                if (sensorObj.length < 0.1) {
                    sensorObj.length = 0.1;
                }            
            }

            calc.render();
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

        calc.addSensor = function() {
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

            calc.readInput();
            calc.saveUrlParams();
        }

        $(thisPartial).find('.addSensor').on('click', function() {
            calc.addSensor();
            calc.render();
        });


        if (calc.urlParams) {
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
                calc.addSensor();   
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
                });    

                sensorIndex++;
            });    
            

            calc.updateTimeDisplay();
            calc.readInput();
            calc.saveUrlParams();
        }    

    })
});
