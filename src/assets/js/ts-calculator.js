
$(document).ready(function () {
    if ($('.apiHelper').length == 0) {
        return;
    }

    $('.tsCalculator').each(function() {
        const thisPartial = $(this);

        let lastResistanceParam;

        const thermistorResistance = [
            {
                temp: -50,
                value: 329500,
            },
            {
                temp: -40,
                value: 188500,
            },
            {
                temp: -30,
                value: 111300,
            },
            {
                temp: -20,
                value: 67770,
            },
            {
                temp: -10,
                value: 42470,
            },
            {
                temp: 0,
                value: 27280,
            },
            {
                temp: 10,
                value: 17960,
            },
            {
                temp: 20,
                value: 12090,
            },
            {
                temp: 25,
                value: 10000,
            },
            {
                temp: 30,
                value: 8313,
            },
            {
                temp: 40,
                value: 5827,
            },
            {
                temp: 50,
                value: 4160,
            },
            {
                temp: 60,
                value: 3020,
            },
            {
                temp: 70,
                value: 2228,
            },
            {
                temp: 80,
                value: 1668,
            },
            {
                temp: 85,
                value: 1451,
            },
            {
                temp: 90,
                value: 1266,
            },
            {
                temp: 100,
                value: 973.1,
            },
            {
                temp: 110,
                value: 757.6,
            },
        ];
    
        const resistanceForTemperature = function(degC) {
            for(let ii = 0; ii < thermistorResistance.length - 1; ii++) {
                if (degC >= thermistorResistance[ii].temp && degC < thermistorResistance[ii+1].temp) {
                    let calc = {degC};
    
                    calc.v1 = calc.degC - thermistorResistance[ii].temp;
                    calc.d1 = thermistorResistance[ii+1].temp - thermistorResistance[ii].temp;
                    calc.d2 = thermistorResistance[ii+1].value - thermistorResistance[ii].value;
    
                    calc.result = calc.v1 * calc.d2 / calc.d1 + thermistorResistance[ii].value;
    
                    // console.log('calc', calc);
    
                    return calc.result;
                }
            }
            return NaN;
        }
    

        let updateFieldsInternal;
        updateFieldsInternal = function(obj, parts, parentElem) {
            for(const key in obj) {
                let value = obj[key];
                parts.push(key);
    
                if (typeof value == 'object') {
                    updateFieldsInternal(value, parts, parentElem);
                }
                else {
                    if (typeof value == 'number') {
                        value = Math.round(value * 100) / 100;
                    }
                    $(parentElem).find('span[data-key="' + parts.join('.') + '"').text(value);    
                }
    
                parts.pop();
            }
        }
    
    
        const updateFields = function(obj, parentElem) {
            updateFieldsInternal(obj, [], parentElem)
        }

        const calculate = function() {
            const param = {
                rt1mod: 27400,
                rt2mod: 49900,
            };

            param.vref = parseFloat($(thisPartial).find('.vrefInput').val());
            param.vltf = 0.735 * param.vref;
            param.vhtf = 0.472 * param.vref;
            param.vtco = 0.447 * param.vref;

            param.which = $(thisPartial).find('input[name="calculateWhich"]:checked').val();
            switch(param.which) {
                case 'Resistance':
                    param.tempLow = parseFloat($(thisPartial).find('.minTempInput').val());
                    param.tempHigh = parseFloat($(thisPartial).find('.maxTempInput').val());
    
                    param.rthcold = resistanceForTemperature(param.tempLow);
                    param.rthhot = resistanceForTemperature(param.tempHigh);
        
                    param.rt2 = (param.vref * param.rthcold * param.rthhot * (1/param.vltf - 1/param.vtco)) / 
                        (param.rthhot * (param.vref / param.vtco - 1) - param.rthcold * (param.vref/param.vltf - 1));
    
                    param.rt1 = (param.vref/param.vltf - 1) / (1/param.rt2 + 1/param.rthcold);

                    param.rt1p = 1 / (1/param.rt1 - 1/param.rt1mod);
                    param.rt2p = 1 / (1/param.rt2 - 1/param.rt2mod);

                    for(const key of ['rt1p', 'rt2p']) {
                        if (typeof param[key] != 'number' || isNaN(param[key]) || param[key] < 0) {
                            param[key] = 'not possible';
                        }
                    }
                    param.resTestTemperature = parseFloat($(thisPartial).find('.testTemperature').val());
                    param.resTestResistance = resistanceForTemperature(param.resTestTemperature);
                    param.resTestLow = 1 / (1/param.rt2p + 1/param.rt2mod + 1/param.resTestResistance);
                    param.resTestVoltage = (param.vref * param.resTestLow) / (param.rt1 + param.resTestLow);
    
                    if (param.vtco < param.resTestVoltage && param.resTestVoltage < param.vhtf) { 
                        param.resTestStatus = 'Charging enabled (between TCO and HTF)';
                    }
                    else
                    if (param.vhtf <= param.resTestVoltage && param.resTestVoltage < param.vltf) {
                        param.resTestStatus = 'Charging enabled';
                    }
                    else {
                        param.resTestStatus = 'Charging disabled';
                    }

                    lastResistanceParam = param;
                    break;

                case 'Temperature':
                    param.rt1p = parseFloat($(thisPartial).find('.rt1pinput').val());
                    param.rt2p = parseFloat($(thisPartial).find('.rt2pinput').val());

                    param.rt1 = 1 / (1/param.rt1mod + 1/param.rt1p);
                    param.rt2 = 1 / (1/param.rt2mod + 1/param.rt2p); 

                    for(param.resTestTemperature = thermistorResistance[0].temp; param.resTestTemperature <= thermistorResistance[thermistorResistance.length - 1].temp; param.resTestTemperature++) {
                        param.resTestResistance = resistanceForTemperature(param.resTestTemperature);
                        param.resTestLow = 1 / (1/param.rt2p + 1/param.rt2mod + 1/param.resTestResistance);
                        param.resTestVoltage = (param.vref * param.resTestLow) / (param.rt1 + param.resTestLow);
        
                        if (param.vtco < param.resTestVoltage && param.resTestVoltage < param.vhtf) { 
                            param.maxTempTCO = param.resTestTemperature;
                        }
                        else
                        if (param.vhtf <= param.resTestVoltage && param.resTestVoltage < param.vltf) {
                            if (typeof param.minTemp == 'undefined') {
                                param.minTemp = param.resTestTemperature;
                            }
                            param.maxTemp = param.resTestTemperature;
                        }
                    }

                    for(const which of [{key:'min', temp:'minTemp'}, {key:'max', temp:'maxTemp'}, {key:'tco', temp:'maxTempTCO'}]) {
                        const param2 = param[which.key] = {};
                        param2.resTestResistance = param[which.temp];

                        param2.resTestResistance = resistanceForTemperature(param2.resTestResistance);
                        param2.resTestLow = 1 / (1/param.rt2p + 1/param.rt2mod + 1/param2.resTestResistance);
                        param2.resTestVoltage = (param.vref * param2.resTestLow) / (param.rt1 + param2.resTestLow);
                    }
                    
                    break;
            }

            $(thisPartial).find('.calculateShowHide').hide();
            $(thisPartial).find('.calculate' + param.which).show();


            $(thisPartial).find('.copyResistor').on('click', function() {
                if (lastResistanceParam) {
                    $(thisPartial).find('.rt1pinput').val(Math.round(lastResistanceParam.rt1p).toString());
                    $(thisPartial).find('.rt2pinput').val(Math.round(lastResistanceParam.rt2p).toString());
                    calculate();    
                }
            });

            updateFields(param, thisPartial);

            $(thisPartial).find('.calculateOutput').show();
        }

        $(thisPartial).find('input[name="calculateWhich"]').on('click', calculate);

        $(thisPartial).find('input[type="text"]').on('input blur', calculate);

        calculate();
    });

});
