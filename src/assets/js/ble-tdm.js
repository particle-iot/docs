let calc = {};

$(document).ready(function() {

    $('.bleTdmCalculator').each(function() {
        const thisPartial = calc.partial = $(this);

        calc.urlParams = new URLSearchParams(window.location.search);


        calc.inputValues = {};
        calc.inputUrlParams = {};

        calc.canvasElem = $('#bleTdmCanvas');  

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

                const sensorIndex = parseInt($(sensorDivElem).data('sensor'));

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

        };

        /*
        calc.updateInput = function() {
            $(thisPartial).find('.inputParam').each(function() {
                const inputElem = $(this);
    
                const key = calc.parseKey($(inputElem).data('key'));
                if (key) {
                    if (typeof calc.inputValues[key] != 'undefined') {
                        $(inputElem).val(calc.inputValues[key.key]);
                    }    
                }
            });
        };
        */

        calc.saveUrlParams = function() {                            
            const searchStr = $.param(calc.inputUrlParams);
            history.pushState(null, '', '?' + searchStr);     
        };

        calc.inputHandler = function() {
            const inputElem = $(this);
            const key = calc.parseKey($(inputElem).data('key'));
            if (key) {
                // TODO: Handle radio buttons, etc.
                const inputType = $(inputElem).prop('type');
                                
                $(inputElem).on('input', function() {
                    calc.readInput();
                    calc.saveUrlParams();
                });
            }
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

        $(thisPartial).find('.inputParam,.sensorInputElem').each(calc.inputHandler);

        calc.addSensor = function() {
            const sensorElem = calc.sensorDivTemplateElem.cloneNode(true);
            $(sensorElem).data('sensor', calc.inputValues.sensors.length);
            $(sensorElem).find('h3').text('Sensor ' + (calc.inputValues.sensors.length + 1));
            $(sensorElem).find('.sensorInputElem').each(calc.inputHandler);
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

            for(const keyObj of calc.sensorKeys) {
                for(let sensorIndex = 0; true; sensorIndex++) {
                    const value = calc.urlParams.get(keyObj.key.urlParam + sensorIndex);
                    if (!value) {
                        break;
                    }

                    let sensorDivElem;

                    for(let tries = 0; tries < 10; tries++) {
                        sensorDivElem = $(thisPartial).find('sensorDiv[data-index=' + sensorIndex + ']');
                        if (sensorDivElem.length) {
                            break;
                        }
                        calc.addSensor();
                    }

                }
            }

            /*
            $(thisPartial).find('.sensorDiv').each(function() {
                const sensorDivElem = $(this);

                let sensorObj = {};
                const sensorIndex = parseInt($(sensorDivElem).data('sensor'));


                $(sensorDivElem).find('.sensorInputParam').each(function() {
                    const inputElem = $(this);
    
                    // TODO: Handle radio buttons, etc.
                    const inputType = $(inputElem).prop('type');
                        
                    const key = calc.parseKey($(inputElem).data('key'));
                    if (key) {
                        const value = calc.urlParams.get(key.urlParam + calc.inputValues.sensors.length);
                        if (value) {
                            sensorObj[key.key] = value;                    
                            calc.inputUrlParams[key.urlParam + inputValues.sensors.length] = value;
                        }
                    }
    
                });

                calc.inputValues.sensors.push(sensorObj);
            });
            */
        }    

        console.log('loaded ble-tdm');

    })
});
