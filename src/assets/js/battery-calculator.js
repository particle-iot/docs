$(document).ready(function () {
    // auth not required

    $('.batteryCalculator').each(function() {
        const thisElem = $(this);

        const urlParams = new URLSearchParams(window.location.search);

        // File structure:
        // object
        //   devices: object key = SKU, value = object
        //     .sku: same as key
        //     .modes: object key = symbol, value = object
        //       .min, .typ, .max, .unit
        let powerConsumption;
    
        let parameters = [];
        let parameterValues = {};

        const deviceSelectElem = $(thisElem).find('.deviceSelect');
        const sleepModeElem = $(thisElem).find('.sleepMode');
        const calculatorResultElem = $(thisElem).find('.calculatorResult');

        const clearResult = function() {
            $(calculatorResultElem).empty();
        }
        const appendResult = function(s) {
            const pElem = document.createElement('p');
            $(pElem).text(s);
            $(calculatorResultElem).append(pElem);
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
            else
            if (options.avgTypMax90_10) {
                result = (symbolValue.typ * 9 + symbolValue.max) / 10;
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

        const showHideSections = function(key, show) {
            if (show) {
                $(thisElem).find('.show' + key).show();
                $(thisElem).find('.showNot' + key).hide();
            }
            else {
                $(thisElem).find('.show' + key).hide();
                $(thisElem).find('.showNot' + key).show();
            }
        }

        const recalculate = async function(options = {}) {
            // console.log('recalculate', options);

            if (!powerConsumption || !deviceSelectElem) {
                return;
            }

            let urlConfig = {};
            
            const dev = $(deviceSelectElem).val();
            if (!dev) {
                return;
            }

            urlConfig.dev = dev;

            if (!powerConsumption.devices[dev]) {
                // console.log('invalid dev ' + dev + ' in deviceSelect');
                return;
            }

            urlConfig.mode = $(sleepModeElem).val();

            const modeParts = urlConfig.mode.split(',');
            const mode = modeParts[0];
            const modeKey = modeParts.length > 1 ? modeParts[1] : '';

            const modes = powerConsumption.devices[dev].modes;
            // console.log('modes', modes);

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
                // console.log('dev not in carriers.json');
                return;
            }
            // console.log('skus', skus);


            const family = skus[0].family;
            const isCellular = !!skus[0].modem;
            const isWiFi = skus[0].wifi;
            const isTrackerOne = dev.includes('ONE') && family == 'tracker';

            showHideSections('TrackerOne', isTrackerOne);
            showHideSections('Tracker', family == 'tracker');
            showHideSections('Cellular', isCellular);
            showHideSections('WiFi', isWiFi);
            
            if (options.changeDevice) {
                let batterySize;
                if (family == 'tracker') {
                    batterySize = 2000;
                }
                else {
                    batterySize = 1800;
                }
                $(parameters.find(e => e.parameter == 'batterySize').inputElem).val(batterySize.toString());

                $(sleepModeElem).find('option[value="ulp,Iulp_cell"]').prop('disabled', family == 'tracker');
                $(sleepModeElem).find('option[value="ulp,Iulp_imu"]').prop('disabled', family != 'tracker');

                const optionElem = $(sleepModeElem).find('option:selected');
                if ($(optionElem).prop('disabled')) {
                    $(sleepModeElem).val('ulp,Iulp_intrtc');
                }

            }

            if (mode == 'none' || modeKey == 'Iulp_cell') {
                $(thisElem).find('.sleepParameter').hide();
            }
            else {
                $(thisElem).find('.sleepParameter').show();
            }

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


            // Update URL
            const searchStr = $.param(urlConfig);
            history.pushState(null, '', '?' + searchStr);     

            // Calculate power per publish

            parameterValues.countMode = urlConfig.countMode;
            switch(urlConfig.countMode) {
                case 'everyMinutes':
                    parameterValues.publishesPerDay = 60.0 / parseFloat($('input.everyMinutes').val()) * 24; // perDay
                    break;

                case 'perDay':
                    parameterValues.publishesPerDay = parseFloat($('input.perDay').val()); // perDay
                    break;
            }

            if (mode == 'none' || modeKey == 'Iulp_cell') {
                // No reconnection
                $(thisElem).find('.warnAggressiveReconnection').hide();
            }
            else
            if (parameterValues.publishesPerDay > (24 * 6)) {
                $(thisElem).find('.warnAggressiveReconnection').show();
            }
            else {
                $(thisElem).find('.warnAggressiveReconnection').hide();
            }

            // console.log('parameterValues', parameterValues);

            let calculations = {};
            
            // console.log('Icell_conn_twr='+ getValue_ma(modes.normal.Icell_conn_twr));
            // console.log('Icell_cloud_idle='+ getValue_ma(modes.normal.Icell_conn_twr));
            // console.log('sleep mA='+ getValue_ma(modes[mode][modeKey]));

            if (mode != 'none') {
                calculations.connectPower = parameterValues.connectTime * getValue_ma(modes.normal.Icell_conn_twr, {avgTypMax:true}) / 3600.0; // mAh per connection
        
                calculations.postPublishPower = parameterValues.afterPublish * getValue_ma(modes.normal.Icell_cloud_idle) / 3600.0; // mAh per connection
        
                calculations.connectTimePerDay = (parameterValues.connectTime + parameterValues.afterPublish) * parameterValues.publishesPerDay; // sec per day

                calculations.sleepTimePerDay = 86400 - calculations.connectTimePerDay; // sec per day

                calculations.sleepPower = getValue_ma(modes[mode][modeKey]) * calculations.sleepTimePerDay / 3600.0;  // mAh per day

                calculations.powerPerDay = (calculations.connectPower + calculations.postPublishPower) * parameterValues.publishesPerDay + calculations.sleepPower;  // mAh
            }
            else {
                // Assume 10 seconds to publish
                calculations.publishPower = 10 * getValue_ma(modes.normal.Icell_cloud_tx) / 3600.0 ;  // mAh

                calculations.idlePower = 24 * getValue_ma(modes.normal.Icell_cloud_idle, {avgTypMax90_10:true});  // mAh

                calculations.powerPerDay = calculations.publishPower + calculations.idlePower;  // mAh
            }

            calculations.batteryPower = parameterValues.batterySize * ((100 - parameterValues.reservePct) / 100); // mAh

            calculations.days = calculations.batteryPower / calculations.powerPerDay;


            // console.log('calculations', calculations);

            clearResult();

            let result = 'Estimated runtime: ';
            if (calculations.days < 2) {
                // Show in hours
                result += Math.floor(calculations.days * 24) + ' hours.';
            }
            else
            if (calculations.days < 14) {
                // Show in days only
                result += Math.floor(calculations.days * 10) / 10 + ' days.';
            }
            else {
                // Show in days and weeks
                const weeks = Math.floor(calculations.days / 7 * 10) / 10;
                result += Math.floor(calculations.days) + ' days (' + weeks + ' weeks).';
            }
            appendResult(result);
                            
        };

        {
            // deviceSelect 
            const devOption = urlParams.get('dev');
            if (devOption) {
                $(deviceSelectElem).val(devOption);
            }
            $(deviceSelectElem).on('change', function() {
                recalculate({changeDevice:true});
            });        
        }

        {
            // sleepMode
            const modeOption = urlParams.get('mode');
            if (modeOption) {
                $(sleepModeElem).val(modeOption);
            }
            $(sleepModeElem).on('change', recalculate);        
        }

        $(thisElem).find('.numPublishes').each(function() {
            const radioGroupElem = $(this);

            const optionCountMode = urlParams.get('countMode');
            if (optionCountMode) {
                $(radioGroupElem).find('input').prop('checked', false);
                $(radioGroupElem).find('input[value="' + optionCountMode + '"]').prop('checked', true);

                const optionCount = urlParams.get('count');
                if (optionCount) {
                    switch(optionCount) {
                        case 'everyMinutes':
                            $(radioGroupElem).find('input.everyMinutes').val(optionCount);
                            break;
        
                        case 'perDay':                    
                            $(radioGroupElem).find('input.perDay').val(optionCount);
                            break;
                    }    
                }
            }

            $(radioGroupElem).find('input[type="radio"]').on('change', recalculate);        

            $(radioGroupElem).find('input.everyMinutes').on('input', function() {
                $(radioGroupElem).find('input').prop('checked', false);
                $(radioGroupElem).find('input[value="everyMinutes"]').prop('checked', true);            
                recalculate();
            });        
            $(radioGroupElem).find('input.perDay').on('input', function() {
                $(radioGroupElem).find('input').prop('checked', false);
                $(radioGroupElem).find('input[value="perDay"]').prop('checked', true);            
                recalculate();
            });        
        });
        

        $(thisElem).find('.batteryCalculatorParameter').each(function() {
            const parameterElem = $(this);

            const parameter = $(parameterElem).data('parameter');

            const inputElem = $(parameterElem).find('input');

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

});



