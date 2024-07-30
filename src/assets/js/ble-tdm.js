let calc = {};

$(document).ready(function() {

    $('.bleTdmCalculator').each(function() {
        const thisPartial = calc.partial = $(this);

        calc.urlParams = new URLSearchParams(window.location.search);


        calc.inputValues = {};
        calc.inputUrlParams = {};

        calc.canvasElem = $('#bleTdmCanvas');  

        calc.timeSliderElem = $(thisPartial).find('timeSlider');
        calc.zoomSliderElem = $(thisPartial).find('zoomSlider');

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

        calc.render = function() {
            let renderParam = {
                time: $(calc.timeSliderElem).val(),
                zoom: $(calc.zoomSliderElem).val(),
            };
            console.log('render' , renderParam);

            const ctx = calc.canvasElem[0].getContext('2d');                

            ctx.moveTo(0, 0);
            ctx.lineTo(200, 100);
            ctx.stroke();

        }
        $(calc.timeSliderElem).on('change', calc.render);
        $(calc.zoomSliderElem).on('change', calc.render);

        calc.readInput = function() {
            $(thisPartial).find('.inputParam').each(function() {
                const inputElem = $(this);

                // TODO: Handle radio buttons, etc.
                const inputType = $(inputElem).prop('type');

                const key = calc.parseKey($(inputElem).data('key'));
                if (key) {
                    calc.inputValues[key.key] = $(inputElem).val();                    

                    calc.inputUrlParams[key.urlParam] = calc.inputValues[key.key];
                }
            });

            calc.inputValues.sensors = [];
            $(thisPartial).find('.sensorDiv').each(function() {
                const sensorDivElem = $(this);

                const sensorIndex = calc.inputValues.sensors.length;

                let sensorObj = {};

                $(sensorDivElem).find('.sensorInputParam').each(function() {
                    const inputElem = $(this);
    
                    // TODO: Handle radio buttons, etc.
                    const inputType = $(inputElem).prop('type');
    
                    const key = calc.parseKey($(inputElem).data('key'));
                    if (key) {
                        sensorObj[key.key] = $(inputElem).val();                    
    
                        calc.inputUrlParams[key.urlParam + sensorIndex] = sensorObj[key.key];
                    }
    
                });

                calc.inputValues.sensors[sensorIndex] = sensorObj;
            });

            calc.render();
            console.log('readInput', {inputValues:calc.inputValues, inputUrlParams:calc.inputUrlParams});

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
                    console.log('addInputHandlers', {inputType, eventTrigger});
                    
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

            $(thisPartial).find('.sensorsDiv').append(sensorElem);

        }

        $(thisPartial).find('.addSensor').on('click', calc.addSensor);

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
            
            console.log('calc.inputValues.sensors', calc.inputValues.sensors);

            for(let ii = $(thisPartial).find('.sensorDiv').length; ii < calc.inputValues.sensors.length; ii++) {
                calc.addSensor();   
            }

            let sensorIndex = 0;
            $(thisPartial).find('.sensorDiv').each(function() {
                const sensorDivElem = $(this);

                $(sensorDivElem).find('.sensorInputParam').each(function() {
                    const inputElem = $(this);
        
                    const key = calc.parseKey($(inputElem).data('key'));
                    if (key) {
                        $(inputElem).val(calc.inputValues.sensors[sensorIndex][key.key]);
                    }
                });    

                sensorIndex++;
            })

        }    

    })
});
