$(document).ready(function () {
    // auth not required

    const cellPowerDefaultOptions = {
        connTower: 'Icell_conn_twr',
        cloudIdle: 'Icell_cloud_idle',
        cloudTx: 'Icell_cloud_tx',
    }

    const wifiPowerDefaultOptions = {
        connTower: 'Iwifi_conn_ap',
        cloudIdle: 'Iwifi_cloud_idle',
        cloudTx: 'Iwifi_cloud_tx',
    }

    const deviceOptions = [
        {
            key: 'ONE402',
            value: 'ONE402',
            title: 'Tracker One ONE404, ONE402 (North America)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'ONE523',
            value: 'ONE523',
            title: 'Tracker One ONE524, ONE523 (EMEAA)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'M524',
            value: 'M524',
            title: 'M-SoM M523 (EMEAA)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'M524',
            value: 'M524_WiFi',
            title: 'M-SoM M523 (EMEAA) (Wi-Fi)',
            power: wifiPowerDefaultOptions,
        },
        {
            key: 'M404',
            value: 'M404_M1',
            title: 'M-SoM M404 (Global) (LTE Cat M1)',
            power: {
                connTower: 'Icell_conn_twr_catm1',
                cloudIdle: 'Icell_cloud_idle_catm1',
                cloudTx: 'Icell_cloud_tx_catm1',            
            },
        },
        {
            key: 'M404',
            value: 'M404_2G',
            title: 'M-SoM M404 (Global) (2G)',
            power: {
                connTower: 'Icell_conn_twr_2g',
                cloudIdle: 'Icell_cloud_idle_2g',
                cloudTx: 'Icell_cloud_tx_2g',            
            },
        },
        {
            key: 'M404',
            value: 'M404_WiFi',
            title: 'M-SoM M404 (Global) (Wi-Fi)',
            power: wifiPowerDefaultOptions,
        },
        {
            key: 'B402',
            value: 'B402',
            title: 'B-SoM B404, B402 (North America)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'B523',
            value: 'B523',
            title: 'B-SoM B524, B523 (EMEAA)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'BRN402',
            value: 'BRN402',
            title: 'Boron BRN404, BRN402 (North America)',
            power: cellPowerDefaultOptions,
        },
        {
            key: 'BRN310',
            value: 'BRN310',
            title: 'Boron 2G/3G',
            power: cellPowerDefaultOptions,
        },
    ];

    $('.batteryCalculator').each(function() {
        const thisElem = $(this);

        const urlParams = new URLSearchParams(window.location.search);

        $('.deviceSelect').empty();
        for(const deviceOption of deviceOptions) {
            const optionElem = document.createElement('option');
            $(optionElem).attr('value', deviceOption.value);
            $(optionElem).text(deviceOption.title);
            $('.deviceSelect').append(optionElem);
        }
        
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
            if (typeof symbolValue == 'undefined') {
                return 0;
            }

            let result = symbolValue.typ;
            if (typeof result != 'number' || Number.isNaN(result)) {
                return 0;
            }

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
            
            const devValue = $(deviceSelectElem).val();
            if (!devValue) {
                return;
            }
            urlConfig.dev = devValue;

            const devObj = deviceOptions.find(e => e.value == devValue);
            if (!devObj) {
                return;
            }
        

            if (!powerConsumption.devices[devObj.key]) {
                // console.log('invalid dev ' + devObj.key + ' in deviceSelect');
                return;
            }

            urlConfig.mode = $(sleepModeElem).val();

            const modeParts = urlConfig.mode.split(',');
            const mode = modeParts[0];
            const modeKey = modeParts.length > 1 ? modeParts[1] : '';

            const modes = powerConsumption.devices[devObj.key].modes;
            // console.log('modes', modes);

            if (!getValue_ma(modes.normal.Icell_conn_twr)) {
                // This is missing for M524
                modes.normal.Icell_conn_twr = modes.normal.Icell_conn_cloud;
            }



            let skus = [];

            const carriers = await apiHelper.getCarriersJson();    
            if (!carriers) {
                return null;
            }
            for(const skuObj of carriers.skus) {
                if (skuObj.name.startsWith(devObj.key)) {
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
            const isTrackerOne = devObj.key.includes('ONE') && family == 'tracker';

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

                $(sleepModeElem).find('option[value="ulp,Iulp_cell"]').prop('disabled', family == 'tracker' || !modes.ulp.Iulp_cell);
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

            // Check required values



            let calculations = {
                mode,
            };
            
            calculations.required = {
                normal: [],
            }
            calculations.required[mode] = [];



            if (mode != 'none') {
                calculations.connectPower = parameterValues.connectTime * getValue_ma(modes.normal[devObj.power.connTower], {avgTypMax:true}) / 3600.0; // mAh per connection
                calculations.required.normal.push(devObj.power.connTower);

                calculations.postPublishPower = parameterValues.afterPublish * getValue_ma(modes.normal[devObj.power.cloudIdle]) / 3600.0; // mAh per connection
                calculations.required.normal.push(devObj.power.cloudIdle);
        
                calculations.connectTimePerDay = (parameterValues.connectTime + parameterValues.afterPublish) * parameterValues.publishesPerDay; // sec per day

                calculations.sleepTimePerDay = 86400 - calculations.connectTimePerDay; // sec per day

                calculations.sleepPower = getValue_ma(modes[mode][modeKey]) * calculations.sleepTimePerDay / 3600.0;  // mAh per day
                calculations.required[mode].push(modeKey);

                calculations.powerPerDay = (calculations.connectPower + calculations.postPublishPower) * parameterValues.publishesPerDay + calculations.sleepPower;  // mAh
            }
            else {
                // Assume 10 seconds to publish
                calculations.publishPower = 10 * getValue_ma(modes.normal[devObj.power.cloudTx]) / 3600.0 ;  // mAh
                calculations.required.normal.push(devObj.power.cloudTx);

                calculations.idlePower = 24 * getValue_ma(modes.normal[devObj.power.cloudIdle], {avgTypMax90_10:true});  // mAh
                calculations.required.normal.push(devObj.power.cloudIdle);

                calculations.powerPerDay = calculations.publishPower + calculations.idlePower;  // mAh
            }

            calculations.batteryPower = parameterValues.batterySize * ((100 - parameterValues.reservePct) / 100); // mAh

            calculations.days = calculations.batteryPower / calculations.powerPerDay;



            clearResult();

            calculations.values = {};
            calculations.missingValues = [];

            for(const topKey in calculations.required) {
                calculations.values[topKey] = {};

                for(const innerKey of calculations.required[topKey]) {
                    const ma = getValue_ma(modes[topKey][innerKey]);
                    if (ma) {
                        calculations.values[topKey][innerKey] = ma;
                    }
                    else {
                        calculations.missingValues.push(topKey + '.' + innerKey);
                    }
                }
            }

            console.log('calculations', calculations);

            if (calculations.missingValues.length == 0) {
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
            }
            else {
                appendResult('Internal error (missing ' + calculations.missingValues.join(', ') + ')')
            }

                            
        };

        {
            // deviceSelect 
            const devOption = urlParams.get('dev');
            console.log('loading devOption=' + devOption);
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



