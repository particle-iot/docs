$(document).ready(function () {
    // auth not required

    const urlParams = new URLSearchParams(window.location.search);

    // File structure:
    // object
    //   devices: object key = SKU, value = object
    //     .sku: same as key
    //     .modes: object key = symbol, value = object
    //       .min, .typ, .max, .unit
    let powerConsumption;

    let deviceSelectElem;
    let sleepModeElem;
    let parameters = [];
    let parameterValues = {};

    const setResult = function(s) {
        $('.calculatorResult').text(s);
    }

    const getValue_ma = function(symbolValue, options = {}) {
        let result = symbolValue.typ;
        if (options.avgTypMax) {
            result = (symbolValue.typ + symbolValue.max) / 2;
        }
        else
        if (options.useMax) {
            result = symbolValue.max;
        }

        switch(symbolValue.unit) {
            case 'uA':
                result /= 1000;
                break;

            default:
                // mA
                break;
        }
        return result;
    }

    const recalculate = async function(options = {}) {
        console.log('recalculate', options);

        if (!powerConsumption || !deviceSelectElem) {
            return;
        }

        let urlConfig = {};
        
        const dev = $(deviceSelectElem).val();
        urlConfig.dev = dev;

        if (!powerConsumption.devices[dev]) {
            console.log('invalid dev in deviceSelect');
            return;
        }

        let skus = [];

        const carriers = await apiHelper.getCarriersJson();    
        if (!carriers) {
            return null;
        }
        for(const skuObj of carriers.skus) {
            if (skuObj.name.startsWith(dev)) {
                skus.push(skuObj);
            }
        }
        if (skus.length == 0) {
            console.log('dev not in carriers.json');
            return;
        }
        console.log('skus', skus);

        const family = skus[0].family;
        
        $('.apiHelperContentGuard').each(function() {
            const guardElem = $(this);
            const mode = $(guardElem).data('mode');
            const modes = mode.split(' ');

            let showItem = false;

            if (modes.includes('family-' + family)) {
                showItem = true;
            }
            else
            if (dev.includes('ONE') && family == 'tracker' && modes.includes('family-' + family + '-one')) {
                showItem = true;
            }

            if (showItem) {
                $(guardElem).show();
            }
            else {
                $(guardElem).hide();
            }

            const elseElem = $(guardElem).next();
            if ($(elseElem).hasClass('apiHelperContentGuardElse')) {
                if (showItem) {
                    $(elseElem).hide();
                }
                else {
                    $(elseElem).show();
                }
                    
            }
        });

        if (options.changeDevice) {
            let batterySize;
            if (family == 'tracker') {
                batterySize = 2000;
            }
            else {
                batterySize = 1800;
            }
            $(parameters.find(e => e.parameter == 'batterySize').inputElem).val(batterySize.toString());

            if (family != 'tracker' && $(sleepModeElem).val() == 'ulp,Iulp_imu') {
                $(sleepModeElem).val('ulp,Iulp_imu');
            }
            $(sleepModeElem).find('option[value="ulp,Iulp_imu"]').prop('disabled', family != 'tracker');
        }

        urlConfig.mode = $(sleepModeElem).val();

        const modeParts = urlConfig.mode.split(',');
        const mode = modeParts[0];
        const modeKey = modeParts[1];

        urlConfig.countMode = $('input[name="countMode"]:checked').val();
        switch(urlConfig.countMode) {
            case 'everyMinutes':
                urlConfig.count = $('input.everyMinutes').val();
                break;

            case 'perDay':
                urlConfig.count = $('input.perDay').val();
                break;
        }

        for(const p of parameters) {
            urlConfig[p.parameter] = $(p.inputElem).val();

            parameterValues[p.parameter] = parseFloat($(p.inputElem).val());
        }

        const modes = powerConsumption.devices[dev].modes;
        console.log('modes', modes);

        // Update URL
        const searchStr = $.param(urlConfig);
        history.pushState(null, '', '?' + searchStr);     

        // Calculate power per publish

        parameterValues.countMode = urlConfig.countMode;
        switch(urlConfig.countMode) {
            case 'everyMinutes':
                parameterValues.numPublishes = 60.0 / parseFloat($('input.everyMinutes').val()) * 24;
                break;

            case 'perDay':
                parameterValues.numPublishes = parseFloat($('input.perDay').val());
                break;
        }

        console.log('parameterValues', parameterValues);

        let calculations = {};
        
        // console.log('Icell_conn_twr='+ getValue_ma(modes.normal.Icell_conn_twr));
        // console.log('Icell_cloud_idle='+ getValue_ma(modes.normal.Icell_conn_twr));
        // console.log('sleep mA='+ getValue_ma(modes[mode][modeKey]));

        calculations.connectPower = parameterValues.connectTime * getValue_ma(modes.normal.Icell_conn_twr, {avgTypMax:true}) / 3600.0; // mAh per connection
 
        calculations.postPublishPower = parameterValues.afterPublish * getValue_ma(modes.normal.Icell_cloud_idle) / 3600.0; // mAh per connection
 
        calculations.connectTimePerDay = (parameterValues.connectTime + parameterValues.afterPublish) * parameterValues.numPublishes; // sec per day

        calculations.sleepTimePerDay = 86400 - calculations.connectTimePerDay; // sec per day

        calculations.sleepPower = getValue_ma(modes[mode][modeKey]) * calculations.sleepTimePerDay / 3600.0;  // mAh per day

        calculations.powerPerDay = (calculations.connectPower + calculations.postPublishPower) * parameterValues.numPublishes + calculations.sleepPower;  // mAh

        calculations.batteryPower = parameterValues.batterySize * ((100 - parameterValues.reservePct) / 100); // mAh

        calculations.days = calculations.batteryPower / calculations.powerPerDay;

        console.log('calculations', calculations);

        let result = 'Estimated runtime: ';
        if (calculations.days < 2) {
            // Show in hours
            result += Math.floor(calculations.days * 24) + ' hours';
        }
        else
        if (calculations.days < 14) {
            // Show in days only
            result += Math.floor(calculations.days * 10) / 10 + ' days';
        }
        else {
            // Show in days and weeks
            const weeks = Math.floor(calculations.days / 7 * 10) / 10;
            result += Math.floor(calculations.days) + ' days (' + weeks + ' weeks)';
        }
        setResult(result);
                    
    };

    $('.batteryCalculatorDeviceSelect').each(function() {
        const thisElem = $(this);
        
        deviceSelectElem = $(thisElem).find('.deviceSelect');

        const devOption = urlParams.get('dev');
        if (devOption) {
            $(deviceSelectElem).val(devOption);
        }

        $(deviceSelectElem).on('change', function() {
            recalculate({changeDevice:true});
        });        
    });

    $('.batteryCalculatorSleepMode').each(function() {
        const thisElem = $(this);

        sleepModeElem = $(thisElem).find('.sleepMode');

        const modeOption = urlParams.get('mode');
        if (modeOption) {
            $(sleepModeElem).val(modeOption);
        }

        $(sleepModeElem).on('change', recalculate);        

    })

    $('.numPublishes').each(function() {
        const thisElem = $(this);

        const optionCountMode = urlParams.get('countMode');
        if (optionCountMode) {
            $(thisElem).find('input').prop('checked', false);
            $(thisElem).find('input[value="' + optionCountMode + '"]').prop('checked', true);

            const optionCount = urlParams.get('count');
            if (optionCount) {
                switch(optionCount) {
                    case 'everyMinutes':
                        $(thisElem).find('input.everyMinutes').val(optionCount);
                        break;
    
                    case 'perDay':                    
                        $(thisElem).find('input.perDay').val(optionCount);
                        break;
                }    
            }
        }

        $(thisElem).find('input[type="radio"]').on('change', recalculate);        

        $(thisElem).find('input.everyMinutes').on('input', function() {
            $(thisElem).find('input').prop('checked', false);
            $(thisElem).find('input[value="everyMinutes"]').prop('checked', true);            
            recalculate();
        });        
        $(thisElem).find('input.perDay').on('input', function() {
            $(thisElem).find('input').prop('checked', false);
            $(thisElem).find('input[value="perDay"]').prop('checked', true);            
            recalculate();
        });        

    });
    

    $('.batteryCalculatorParameter').each(function() {
        const thisElem = $(this);

        const parameter = $(thisElem).data('parameter');

        const inputElem = $(thisElem).find('input');

        $(inputElem).on('input', recalculate);        

        const option = urlParams.get(parameter);
        if (option) {
            $(inputElem).val(option);
        }

        parameters.push({
            parameter,
            inputElem,
        });
    });

    // Load the power consumption table (it's about 100K currently)
    fetch('/assets/files/power.json')
        .then(response => response.json())
        .then(function(res) {
            powerConsumption = res;       
            recalculate({changeDevice:true});     
        });

    // Preload carriers.json as well
    apiHelper.getCarriersJson();
});



